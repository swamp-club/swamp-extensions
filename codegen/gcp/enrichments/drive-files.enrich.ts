// deno-lint-ignore-file no-import-prefix

import { z } from "npm:zod@4.6.7";

// Binary media upload/download for Google Drive files (swamp-club#4449).
//
// The generated drive.files model is JSON-only: Discovery's mediaUpload and
// supportsMediaDownload fields are not modelled by the GCP codegen. These
// methods add first-class binary transfer on top of it:
//
// - upload: Drive resumable upload protocol, streamed from a local file in
//   fixed-size chunks (one chunk in memory at a time), with bounded retries
//   that query the session status and resume from the committed offset.
// - download_content: alt=media download streamed into a swamp file artifact,
//   with a byte bound that fails rather than truncates.
//
// This body is inlined into the generated model, where BASE_URL,
// _buildGcpCredentials and request() are in scope. Every helper here is
// prefixed with driveMedia to avoid colliding with generated identifiers.
//
// Secret safety: the resumable session URI carries an upload_id that acts as
// a bearer credential for the upload, so it is never logged, persisted or
// included in an error. Error text is redacted and length-capped.

/** Drive requires resumable chunks to be a multiple of 256 KiB. */
const DRIVE_MEDIA_CHUNK_QUANTUM = 256 * 1024;
const DRIVE_MEDIA_DEFAULT_CHUNK = 8 * 1024 * 1024;
const DRIVE_MEDIA_DEFAULT_RETRIES = 5;
const DRIVE_MEDIA_DEFAULT_RETRY_DELAY_MS = 1000;
const DRIVE_MEDIA_MAX_RETRY_DELAY_MS = 32_000;
const DRIVE_MEDIA_ERROR_BODY_LIMIT = 500;
const DRIVE_MEDIA_WORKSPACE_PREFIX = "application/vnd.google-apps.";

type DriveMediaDataWriter = {
  writeStream: (stream: ReadableStream<Uint8Array>) => Promise<unknown>;
};

type DriveMediaContext = {
  globalArgs: Record<string, unknown>;
  writeResource: (
    specName: string,
    instanceName: string,
    data: unknown,
  ) => Promise<unknown>;
  readResource?: (
    instanceName: string,
    version?: number,
  ) => Promise<Record<string, unknown> | null>;
  createFileWriter: (
    specName: string,
    instanceName: string,
    overrides?: { contentType?: string },
  ) => DriveMediaDataWriter;
};

/** Same sanitize chain the generated methods use for data instance names. */
function driveMediaInstanceName(raw: string): string {
  const name = raw.replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(
    /\0/g,
    "",
  );
  if (name === "") throw new Error("Data instance name is empty");
  return name;
}

/**
 * Remove credentials from text bound for an error message: upload_id values,
 * bearer tokens, OAuth access tokens, and any explicitly known secret (the
 * session URI, the configured access token). The result is length-capped.
 */
function driveMediaRedact(text: string, secrets: string[]): string {
  let out = text;
  for (const secret of secrets) {
    if (secret && secret.length >= 8) {
      out = out.split(secret).join("[REDACTED]");
    }
  }
  out = out
    .replace(/upload_id=[^&\s"'<>)]+/gi, "upload_id=[REDACTED]")
    .replace(/Bearer\s+[A-Za-z0-9._~+\/=-]+/gi, "Bearer [REDACTED]")
    .replace(/ya29\.[A-Za-z0-9._-]+/g, "[REDACTED]")
    .replace(/\s+/g, " ")
    .trim();
  if (out.length > DRIVE_MEDIA_ERROR_BODY_LIMIT) {
    out = `${out.slice(0, DRIVE_MEDIA_ERROR_BODY_LIMIT)}... (truncated)`;
  }
  return out;
}

async function driveMediaHttpError(
  operation: string,
  resp: Response,
  secrets: string[],
): Promise<Error> {
  let body: string;
  try {
    body = await resp.text();
  } catch {
    body = "(could not read response body)";
  }
  const detail = driveMediaRedact(body, secrets);
  return new Error(
    `Drive ${operation} failed (HTTP ${resp.status})${
      detail ? `: ${detail}` : ""
    }`,
  );
}

function driveMediaNetworkError(
  operation: string,
  error: unknown,
  secrets: string[],
): Error {
  const message = error instanceof Error ? error.message : String(error);
  // Covers network failures and credential resolution (request() fetches a
  // token first), so the label stays neutral.
  return new Error(
    `Drive ${operation} failed before a response was received: ${
      driveMediaRedact(message, secrets)
    }`,
  );
}

/** Secrets that must never appear in error text for this run. */
function driveMediaSecrets(g: Record<string, unknown>): string[] {
  const secrets: string[] = [];
  const token = g["accessToken"];
  if (typeof token === "string") secrets.push(token);
  const envToken = Deno.env.get("GCP_ACCESS_TOKEN");
  if (envToken) secrets.push(envToken);
  return secrets;
}

/** Base URL for the media upload endpoint, honoring apiEndpoint overrides. */
function driveMediaUploadUrl(baseUrl: string, fileId?: string): string {
  const url = new URL(baseUrl);
  const basePath = url.pathname.replace(/\/+$/, "");
  const target = fileId ? `/files/${encodeURIComponent(fileId)}` : "/files";
  return `${url.origin}/upload${basePath}${target}`;
}

/**
 * Parse a resumable-upload Range header ("bytes=0-524287") into the number of
 * bytes the server has committed. No header means nothing is committed yet.
 */
function driveMediaCommittedBytes(range: string | null): number {
  if (range === null || range.trim() === "") return 0;
  const match = /^bytes=0-(\d+)$/.exec(range.trim());
  if (!match) {
    throw new Error(
      `Drive upload returned an unparseable Range header: ${
        driveMediaRedact(range, [])
      }`,
    );
  }
  return Number(match[1]) + 1;
}

function driveMediaSleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function driveMediaIsRetryableStatus(status: number): boolean {
  return status === 429 || status >= 500;
}

/** Read exactly `length` bytes at `offset`, failing if the file shrank. */
async function driveMediaReadChunk(
  file: Deno.FsFile,
  offset: number,
  length: number,
): Promise<Uint8Array<ArrayBuffer>> {
  const buf = new Uint8Array(length);
  await file.seek(offset, Deno.SeekMode.Start);
  let filled = 0;
  while (filled < length) {
    const n = await file.read(buf.subarray(filled));
    if (n === null) {
      throw new Error(
        "Source file shrank during upload; re-run the upload once it is stable",
      );
    }
    filled += n;
  }
  return buf;
}

type DriveMediaChunkResult =
  | { kind: "done"; file: Record<string, unknown> }
  | { kind: "incomplete"; committed: number }
  | { kind: "retry"; error: Error; retryAfterMs?: number };

/** Parse a Retry-After header (delta-seconds or HTTP-date) into milliseconds. */
function driveMediaRetryAfterMs(header: string | null): number | undefined {
  if (header === null) return undefined;
  const value = header.trim();
  if (/^\d+$/.test(value)) return Number(value) * 1000;
  const date = Date.parse(value);
  if (Number.isNaN(date)) return undefined;
  return Math.max(0, date - Date.now());
}

/**
 * Interpret one response from the upload session. Throws on fatal errors;
 * returns "retry" for transient ones.
 */
async function driveMediaChunkOutcome(
  resp: Response,
  secrets: string[],
): Promise<DriveMediaChunkResult> {
  if (resp.status === 200 || resp.status === 201) {
    // Drive may have finalized the file even if reading this body fails
    // (connection reset mid-body, or a proxy's non-JSON page). Retrying
    // queries the session status, which returns the finished file.
    try {
      return { kind: "done", file: await resp.json() };
    } catch (error) {
      return {
        kind: "retry",
        error: driveMediaNetworkError(
          "upload final response read",
          error,
          secrets,
        ),
      };
    }
  }
  if (resp.status === 308) {
    const committed = driveMediaCommittedBytes(resp.headers.get("Range"));
    await resp.body?.cancel();
    return { kind: "incomplete", committed };
  }
  if (resp.status === 404 || resp.status === 410) {
    throw await driveMediaHttpError(
      "upload (session expired; start the upload again)",
      resp,
      secrets,
    );
  }
  if (driveMediaIsRetryableStatus(resp.status)) {
    const retryAfterMs = driveMediaRetryAfterMs(
      resp.headers.get("Retry-After"),
    );
    return {
      kind: "retry",
      error: await driveMediaHttpError("upload chunk", resp, secrets),
      retryAfterMs,
    };
  }
  throw await driveMediaHttpError("upload chunk", resp, secrets);
}

/** Send a PUT to the session URI, mapping network failures to "retry". */
async function driveMediaPut(
  sessionUri: string,
  headers: Record<string, string>,
  body: Uint8Array<ArrayBuffer> | undefined,
  secrets: string[],
): Promise<DriveMediaChunkResult> {
  let resp: Response;
  try {
    resp = await fetch(sessionUri, { method: "PUT", headers, body });
  } catch (error) {
    return {
      kind: "retry",
      error: driveMediaNetworkError("upload chunk", error, secrets),
    };
  }
  return await driveMediaChunkOutcome(resp, secrets);
}

/**
 * Stream a local file to a resumable upload session. Holds at most one chunk
 * in memory. On transient failure, waits with exponential backoff (or the
 * server's Retry-After), asks the session how many bytes it committed, and
 * resumes from there.
 *
 * The retry budget resets only when the committed offset moves forward, so a
 * chunk that keeps failing, or a session that keeps answering 308 without
 * progress, exhausts maxRetries instead of looping forever.
 */
async function driveMediaResumableUpload(
  sessionUri: string,
  file: Deno.FsFile,
  total: number,
  chunkSize: number,
  maxRetries: number,
  retryDelayMs: number,
  secrets: string[],
): Promise<Record<string, unknown>> {
  const allSecrets = [sessionUri, ...secrets];
  let offset = 0;
  let progress = 0;
  let failures = 0;
  let pendingStatusQuery = false;

  while (true) {
    const wasStatusQuery = pendingStatusQuery;
    let outcome: DriveMediaChunkResult;
    if (pendingStatusQuery) {
      // Ask how much the server committed: empty body, unknown range.
      outcome = await driveMediaPut(
        sessionUri,
        { "Content-Range": `bytes */${total}` },
        undefined,
        allSecrets,
      );
    } else if (total === 0) {
      outcome = await driveMediaPut(
        sessionUri,
        { "Content-Range": "bytes */0" },
        new Uint8Array(0),
        allSecrets,
      );
    } else {
      const end = Math.min(offset + chunkSize, total);
      const chunk = await driveMediaReadChunk(file, offset, end - offset);
      outcome = await driveMediaPut(
        sessionUri,
        { "Content-Range": `bytes ${offset}-${end - 1}/${total}` },
        chunk,
        allSecrets,
      );
    }

    if (outcome.kind === "done") return outcome.file;

    let failure: Error;
    let retryAfterMs: number | undefined;
    if (outcome.kind === "incomplete") {
      if (outcome.committed > total) {
        throw new Error(
          `Drive upload session reports ${outcome.committed} bytes committed for a ${total}-byte file`,
        );
      }
      offset = outcome.committed;
      if (outcome.committed > progress) {
        progress = outcome.committed;
        failures = 0;
        // Every byte committed but not finalized: ask for the final status
        // rather than sending an empty, invalid range.
        pendingStatusQuery = total > 0 && offset >= total;
        continue;
      }
      if (wasStatusQuery && offset < total) {
        // The status query answered; resend from the committed offset. The
        // retry budget is not reset, because nothing moved forward.
        pendingStatusQuery = false;
        continue;
      }
      failure = new Error(
        `Drive upload made no progress at byte ${offset} of ${total}`,
      );
    } else {
      failure = outcome.error;
      retryAfterMs = outcome.retryAfterMs;
    }

    failures++;
    if (failures > maxRetries) {
      throw new Error(
        `Drive upload gave up after ${maxRetries} retries at byte ${offset} of ${total}. Last error: ${failure.message}`,
      );
    }
    const backoff = retryDelayMs * 2 ** (failures - 1);
    await driveMediaSleep(
      Math.min(retryAfterMs ?? backoff, DRIVE_MEDIA_MAX_RETRY_DELAY_MS),
    );
    pendingStatusQuery = true;
  }
}

const DriveMediaUploadArgs = z.object({
  sourcePath: z.string().min(1).describe(
    "Path to the local file to upload. It is streamed in chunks, never read into memory whole.",
  ),
  fileId: z.string().optional().describe(
    "Existing Drive file ID. When set, the content is uploaded as a new revision of that file instead of creating a new file.",
  ),
  name: z.string().optional().describe(
    "File name in Drive. Defaults to the source file's base name when creating.",
  ),
  mimeType: z.string().optional().describe(
    "MIME type of the content. Drive detects it when omitted.",
  ),
  parents: z.array(z.string()).optional().describe(
    "Parent folder IDs (for a Shared Drive, a folder in it or the drive ID). Only valid when creating a new file.",
  ),
  description: z.string().optional().describe("File description"),
  supportsAllDrives: z.boolean().default(true).describe(
    "Whether the request supports both My Drives and Shared Drives",
  ),
  chunkSizeBytes: z.number().int().positive().default(
    DRIVE_MEDIA_DEFAULT_CHUNK,
  ).describe(
    "Bytes sent per request; a multiple of 262144 (256 KiB). Also the upper bound on memory used for the transfer.",
  ),
  maxBytes: z.number().int().positive().optional().describe(
    "Refuse to upload a source larger than this many bytes",
  ),
  maxRetries: z.number().int().min(0).default(DRIVE_MEDIA_DEFAULT_RETRIES)
    .describe(
      "Retries without progress (HTTP 429/5xx, network error, or a 308 that commits nothing new) before giving up; the count resets whenever more bytes are committed",
    ),
  retryDelayMs: z.number().int().min(0).default(
    DRIVE_MEDIA_DEFAULT_RETRY_DELAY_MS,
  ).describe(
    "Initial backoff before a retry; doubles on each consecutive failure, capped at 32s. A 429 Retry-After header takes precedence.",
  ),
  outputName: z.string().optional().describe(
    "Data instance name for the stored file metadata. Defaults to the model's name global argument, then the Drive file ID.",
  ),
});

const DriveMediaDownloadArgs = z.object({
  fileId: z.string().optional().describe(
    "Drive file ID. Defaults to the id in this model's stored state.",
  ),
  supportsAllDrives: z.boolean().default(true).describe(
    "Whether the request supports both My Drives and Shared Drives",
  ),
  acknowledgeAbuse: z.boolean().optional().describe(
    "Acknowledge the risk of downloading a file Drive flagged as abusive",
  ),
  maxBytes: z.number().int().positive().optional().describe(
    "Fail, rather than truncate, if the content is larger than this many bytes",
  ),
  outputName: z.string().optional().describe(
    "Data instance name for the downloaded content. Defaults to the Drive file ID.",
  ),
});

export const driveFilesContentFiles = {
  content: {
    description: "Binary file content downloaded from Google Drive",
    contentType: "application/octet-stream",
    lifetime: "infinite",
    garbageCollection: 5,
    streaming: false,
  },
};

export const driveFilesMediaMethods = {
  upload: {
    description:
      "upload a local file's bytes to Drive (resumable, chunked, retrying); creates a file or adds a revision; supports Shared Drives",
    arguments: DriveMediaUploadArgs,
    execute: async (
      args: z.infer<typeof DriveMediaUploadArgs>,
      context: DriveMediaContext,
    ) => {
      const g = context.globalArgs;
      const baseUrl = g["apiEndpoint"]?.toString() ??
        Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
      const credentials = _buildGcpCredentials(g);
      const secrets = driveMediaSecrets(g);

      const chunkSize = args.chunkSizeBytes ?? DRIVE_MEDIA_DEFAULT_CHUNK;
      if (chunkSize % DRIVE_MEDIA_CHUNK_QUANTUM !== 0) {
        throw new Error(
          `chunkSizeBytes must be a multiple of ${DRIVE_MEDIA_CHUNK_QUANTUM} (256 KiB); got ${chunkSize}`,
        );
      }
      if (args.fileId && args.parents) {
        throw new Error(
          "parents can only be set when creating a file; omit fileId to create, or move the file with the update method",
        );
      }

      const file = await Deno.open(args.sourcePath, { read: true });
      try {
        const stat = await file.stat();
        if (!stat.isFile) {
          throw new Error(`sourcePath is not a regular file`);
        }
        const total = stat.size;
        if (args.maxBytes !== undefined && total > args.maxBytes) {
          throw new Error(
            `Source is ${total} bytes, over maxBytes ${args.maxBytes}; nothing was uploaded`,
          );
        }

        const metadata: Record<string, unknown> = {};
        const defaultName = args.fileId
          ? undefined
          : args.sourcePath.split(/[\/\\]/).pop();
        const name = args.name ?? defaultName;
        if (name) metadata["name"] = name;
        if (args.mimeType) metadata["mimeType"] = args.mimeType;
        if (args.parents) metadata["parents"] = args.parents;
        if (args.description !== undefined) {
          metadata["description"] = args.description;
        }

        const query = new URLSearchParams({
          uploadType: "resumable",
          supportsAllDrives: String(args.supportsAllDrives ?? true),
          fields: "*",
        });
        const initUrl = `${driveMediaUploadUrl(baseUrl, args.fileId)}?${query}`;
        let initResp: Response;
        try {
          initResp = await request(
            args.fileId ? "PATCH" : "POST",
            initUrl,
            metadata,
            credentials,
          );
        } catch (error) {
          throw driveMediaNetworkError("upload session start", error, secrets);
        }
        if (!initResp.ok) {
          throw await driveMediaHttpError(
            "upload session start",
            initResp,
            secrets,
          );
        }
        await initResp.body?.cancel();
        const sessionUri = initResp.headers.get("Location");
        if (!sessionUri) {
          throw new Error(
            `Drive upload session start returned HTTP ${initResp.status} without a Location header`,
          );
        }

        const result = await driveMediaResumableUpload(
          sessionUri,
          file,
          total,
          chunkSize,
          args.maxRetries ?? DRIVE_MEDIA_DEFAULT_RETRIES,
          args.retryDelayMs ?? DRIVE_MEDIA_DEFAULT_RETRY_DELAY_MS,
          secrets,
        );

        // Same default as the generated create (globalArgs.name), so get,
        // sync and download_content find the uploaded file's state.
        const instanceName = driveMediaInstanceName(
          args.outputName ?? g["name"]?.toString() ??
            result["id"]?.toString() ?? "",
        );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      } finally {
        file.close();
      }
    },
  },
  download_content: {
    description:
      "download a Drive file's bytes (alt=media) into a binary data artifact, streamed, with an optional size bound; supports Shared Drives",
    arguments: DriveMediaDownloadArgs,
    execute: async (
      args: z.infer<typeof DriveMediaDownloadArgs>,
      context: DriveMediaContext,
    ) => {
      const g = context.globalArgs;
      const baseUrl = g["apiEndpoint"]?.toString() ??
        Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
      const credentials = _buildGcpCredentials(g);
      const secrets = driveMediaSecrets(g);

      let fileId = args.fileId;
      if (!fileId) {
        const stateName = driveMediaInstanceName(
          g["name"]?.toString() ?? "current",
        );
        const existing = context.readResource
          ? await context.readResource(stateName)
          : null;
        fileId = existing?.["id"]?.toString();
        if (!fileId) {
          throw new Error(
            `No fileId given and no stored state with an id under "${stateName}"; pass fileId, or run get or upload first`,
          );
        }
      }

      const supportsAllDrives = String(args.supportsAllDrives ?? true);
      const fileUrl = `${baseUrl}files/${encodeURIComponent(fileId)}`;

      // Preflight: learn the MIME type and size before transferring bytes.
      const metaQuery = new URLSearchParams({
        fields: "id,name,mimeType,size",
        supportsAllDrives,
      });
      let metaResp: Response;
      try {
        metaResp = await request(
          "GET",
          `${fileUrl}?${metaQuery}`,
          undefined,
          credentials,
        );
      } catch (error) {
        throw driveMediaNetworkError("file metadata read", error, secrets);
      }
      if (!metaResp.ok) {
        throw await driveMediaHttpError(
          "file metadata read",
          metaResp,
          secrets,
        );
      }
      const meta = await metaResp.json() as {
        id?: string;
        mimeType?: string;
        size?: string;
      };
      const mimeType = meta.mimeType ?? "application/octet-stream";
      if (mimeType.startsWith(DRIVE_MEDIA_WORKSPACE_PREFIX)) {
        throw new Error(
          `File has Google Workspace type ${mimeType}, which has no binary content to download; use files.export with an export MIME type instead`,
        );
      }
      const expectedSize = meta.size !== undefined
        ? Number(meta.size)
        : undefined;
      if (
        args.maxBytes !== undefined && expectedSize !== undefined &&
        expectedSize > args.maxBytes
      ) {
        throw new Error(
          `File is ${expectedSize} bytes, over maxBytes ${args.maxBytes}; nothing was downloaded`,
        );
      }

      const mediaQuery = new URLSearchParams({
        alt: "media",
        supportsAllDrives,
      });
      if (args.acknowledgeAbuse) mediaQuery.set("acknowledgeAbuse", "true");
      let mediaResp: Response;
      try {
        mediaResp = await request(
          "GET",
          `${fileUrl}?${mediaQuery}`,
          undefined,
          credentials,
        );
      } catch (error) {
        throw driveMediaNetworkError("content download", error, secrets);
      }
      if (!mediaResp.ok) {
        throw await driveMediaHttpError("content download", mediaResp, secrets);
      }
      if (!mediaResp.body) {
        throw new Error("Drive content download returned no body");
      }

      const maxBytes = args.maxBytes;
      let received = 0;
      const bounded = mediaResp.body.pipeThrough(
        new TransformStream<Uint8Array, Uint8Array>({
          transform(chunk, controller) {
            received += chunk.byteLength;
            if (maxBytes !== undefined && received > maxBytes) {
              throw new Error(
                `Download exceeded maxBytes ${maxBytes}; aborted rather than truncated`,
              );
            }
            controller.enqueue(chunk);
          },
          flush() {
            if (expectedSize !== undefined && received !== expectedSize) {
              throw new Error(
                `Download ended after ${received} of ${expectedSize} bytes`,
              );
            }
          },
        }),
      );

      const instanceName = driveMediaInstanceName(
        args.outputName ?? meta.id ?? fileId,
      );
      const handle = await context
        .createFileWriter("content", instanceName, { contentType: mimeType })
        .writeStream(bounded);
      return { dataHandles: [handle] };
    },
  },
};
