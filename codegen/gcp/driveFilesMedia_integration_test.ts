// Integration test for the drive.files media enrichment (swamp-club#4449).
//
// Exercises the generated, checked-in model/gcp/drive files model (the code
// that ships) against a stateful mock Drive server on Deno.serve({ port: 0 }):
// resumable chunked upload with 308/Range, retry with session-status resume,
// expiry, malformed responses, streamed alt=media download with byte bounds,
// data-name sanitization, and redaction of credentials from errors.
//
// A drift guard first asserts the generated file contains the current
// enrichment body, so this test cannot pass against stale generated output.

import {
  assert,
  assertEquals,
  assertRejects,
  assertStringIncludes,
} from "@std/assert";
import { createModelTestContext } from "@swamp-club/swamp-testing";
import { parseEnrichmentSource } from "./enrichments/parser.ts";
import { formatCode } from "../shared/version.ts";

const GENERATED_MODEL = new URL(
  "../../model/gcp/drive/extensions/models/files.ts",
  import.meta.url,
);
const ENRICHMENT_SOURCE = new URL(
  "./enrichments/drive-files.enrich.ts",
  import.meta.url,
);

const QUANTUM = 256 * 1024;
const ACCESS_TOKEN = "ya29.test-SECRET-token-abcdef";
const SESSION_SECRET = "SESSION-SECRET-0123456789";

// ---------------------------------------------------------------------------
// Mock Drive server
// ---------------------------------------------------------------------------

interface StoredFile {
  id: string;
  name?: string;
  mimeType: string;
  parents?: string[];
  content: Uint8Array;
}

interface Session {
  fileId?: string;
  metadata: Record<string, unknown>;
  committed: Uint8Array[];
  committedBytes: number;
}

interface RecordedRequest {
  method: string;
  path: string;
  query: URLSearchParams;
  headers: Headers;
  body?: unknown;
}

/** A fault returns a Response to send instead of the normal handling. */
type Fault = (req: Request, session: Session) => Response | undefined;

interface MockDrive {
  baseUrl: string;
  files: Map<string, StoredFile>;
  requests: RecordedRequest[];
  /** Faults applied to session PUTs in order (index = PUT number, 0-based). */
  putFaults: Map<number, Fault>;
  /** Override the session-start response. */
  initOverride?: () => Response;
  /** Rewrite the session URI's origin (to route chunk PUTs via a proxy). */
  sessionOrigin?: string;
  putCount: () => number;
  close: () => Promise<void>;
}

function committedRange(bytes: number): HeadersInit {
  return bytes > 0 ? { Range: `bytes=0-${bytes - 1}` } : {};
}

function concat(parts: Uint8Array[]): Uint8Array<ArrayBuffer> {
  const total = parts.reduce((n, p) => n + p.byteLength, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const p of parts) {
    out.set(p, offset);
    offset += p.byteLength;
  }
  return out;
}

function startMockDrive(): MockDrive {
  const files = new Map<string, StoredFile>();
  const sessions = new Map<string, Session>();
  const requests: RecordedRequest[] = [];
  const putFaults = new Map<number, Fault>();
  let puts = 0;
  let nextFile = 1;
  let nextSession = 1;

  const mock: Partial<MockDrive> = { files, requests, putFaults };

  const finish = (session: Session): Response => {
    const content = concat(session.committed);
    const id = session.fileId ?? `file-${nextFile++}`;
    const prior = files.get(id);
    const stored: StoredFile = {
      id,
      name: (session.metadata["name"] as string | undefined) ?? prior?.name,
      mimeType: (session.metadata["mimeType"] as string | undefined) ??
        prior?.mimeType ?? "application/octet-stream",
      parents: (session.metadata["parents"] as string[] | undefined) ??
        prior?.parents,
      content,
    };
    files.set(id, stored);
    // Later status queries on a finished session return the same file.
    session.fileId = id;
    return Response.json({
      kind: "drive#file",
      id,
      name: stored.name,
      mimeType: stored.mimeType,
      parents: stored.parents,
      size: String(content.byteLength),
    }, { status: session.fileId ? 200 : 201 });
  };

  const server = Deno.serve(
    { port: 0, hostname: "127.0.0.1", onListen: () => {} },
    async (req) => {
      const url = new URL(req.url);
      const recorded: RecordedRequest = {
        method: req.method,
        path: url.pathname,
        query: url.searchParams,
        headers: req.headers,
      };
      requests.push(recorded);

      // Session start: POST (create) or PATCH (new revision).
      const startMatch = /^\/upload\/drive\/v3\/files(?:\/([^/]+))?$/.exec(
        url.pathname,
      );
      if (
        startMatch && url.searchParams.get("uploadType") === "resumable" &&
        !url.searchParams.has("upload_id")
      ) {
        recorded.body = await req.json();
        if (mock.initOverride) return mock.initOverride();
        const sessionId = `${SESSION_SECRET}-${nextSession++}`;
        sessions.set(sessionId, {
          fileId: startMatch[1] ? decodeURIComponent(startMatch[1]) : undefined,
          metadata: recorded.body as Record<string, unknown>,
          committed: [],
          committedBytes: 0,
        });
        const origin = mock.sessionOrigin ?? url.origin;
        return new Response(null, {
          status: 200,
          headers: {
            Location:
              `${origin}/upload/drive/v3/files?uploadType=resumable&upload_id=${sessionId}`,
          },
        });
      }

      // Session PUT: a chunk or a status query.
      if (req.method === "PUT" && url.searchParams.has("upload_id")) {
        const index = puts++;
        const session = sessions.get(url.searchParams.get("upload_id")!);
        const body = new Uint8Array(await req.arrayBuffer());
        if (!session) return new Response("no such session", { status: 404 });
        const fault = putFaults.get(index)?.(req, session);
        if (fault) return fault;

        const range = req.headers.get("Content-Range") ?? "";
        const status = /^bytes \*\/(\d+)$/.exec(range);
        if (status) {
          const total = Number(status[1]);
          if (session.committedBytes === total) return finish(session);
          return new Response(null, {
            status: 308,
            headers: committedRange(session.committedBytes),
          });
        }
        const m = /^bytes (\d+)-(\d+)\/(\d+)$/.exec(range);
        if (!m) return new Response("bad Content-Range", { status: 400 });
        const [start, end, total] = [Number(m[1]), Number(m[2]), Number(m[3])];
        if (start !== session.committedBytes) {
          return new Response("chunk does not start at committed offset", {
            status: 400,
          });
        }
        if (body.byteLength !== end - start + 1) {
          return new Response("length mismatch", { status: 400 });
        }
        session.committed.push(body);
        session.committedBytes = end + 1;
        if (session.committedBytes === total) return finish(session);
        return new Response(null, {
          status: 308,
          headers: committedRange(session.committedBytes),
        });
      }

      // Metadata or media read.
      const getMatch = /^\/drive\/v3\/files\/([^/]+)$/.exec(url.pathname);
      if (req.method === "GET" && getMatch) {
        const file = files.get(decodeURIComponent(getMatch[1]));
        if (!file) {
          return Response.json({ error: { code: 404, message: "not found" } }, {
            status: 404,
          });
        }
        if (url.searchParams.get("alt") === "media") {
          return new Response(file.content as Uint8Array<ArrayBuffer>, {
            headers: { "Content-Type": file.mimeType },
          });
        }
        const meta: Record<string, unknown> = {
          id: file.id,
          name: file.name,
          mimeType: file.mimeType,
        };
        if (!file.mimeType.startsWith("application/vnd.google-apps.")) {
          meta["size"] = String(file.content.byteLength);
        }
        return Response.json(meta);
      }

      return new Response("unhandled", { status: 500 });
    },
  );

  mock.baseUrl = `http://127.0.0.1:${server.addr.port}/drive/v3/`;
  mock.putCount = () => puts;
  mock.close = () => server.shutdown();
  return mock as MockDrive;
}

/**
 * A raw TCP proxy that drops selected connections (1-based) before
 * responding, and forwards the rest to the mock. Used to simulate a network
 * failure mid-upload, which Deno.serve cannot produce on its own.
 */
function startDroppingProxy(
  targetOrigin: string,
  drop: Set<number>,
): { origin: string; close: () => void } {
  const listener = Deno.listen({ hostname: "127.0.0.1", port: 0 });
  let count = 0;
  const decoder = new TextDecoder();

  const readRequest = async (conn: Deno.Conn) => {
    let buf: Uint8Array = new Uint8Array(0);
    const chunk = new Uint8Array(64 * 1024);
    let headerEnd = -1;
    while (headerEnd < 0) {
      const n = await conn.read(chunk);
      if (n === null) return null;
      buf = concat([buf, chunk.subarray(0, n)]);
      headerEnd = decoder.decode(buf).indexOf("\r\n\r\n");
    }
    const head = decoder.decode(buf.subarray(0, headerEnd));
    const [requestLine, ...headerLines] = head.split("\r\n");
    const headers = new Headers();
    for (const line of headerLines) {
      const i = line.indexOf(":");
      headers.set(line.slice(0, i).trim(), line.slice(i + 1).trim());
    }
    const length = Number(headers.get("content-length") ?? "0");
    let body: Uint8Array = buf.subarray(headerEnd + 4);
    while (body.byteLength < length) {
      const n = await conn.read(chunk);
      if (n === null) break;
      body = concat([body, chunk.subarray(0, n)]);
    }
    const [method, path] = requestLine.split(" ");
    return { method, path, headers, body };
  };

  (async () => {
    for await (const conn of listener) {
      count++;
      const current = count;
      (async () => {
        try {
          const parsed = await readRequest(conn);
          if (!parsed || drop.has(current)) return;
          const fwdHeaders = new Headers(parsed.headers);
          fwdHeaders.delete("host");
          fwdHeaders.delete("connection");
          fwdHeaders.delete("content-length");
          const resp = await fetch(`${targetOrigin}${parsed.path}`, {
            method: parsed.method,
            headers: fwdHeaders,
            body: parsed.body.byteLength > 0
              ? parsed.body as Uint8Array<ArrayBuffer>
              : parsed.method === "PUT"
              ? new Uint8Array(0)
              : undefined,
          });
          const respBody = new Uint8Array(await resp.arrayBuffer());
          let head = `HTTP/1.1 ${resp.status} X\r\n`;
          resp.headers.forEach((v, k) => {
            if (k !== "content-length" && k !== "connection") {
              head += `${k}: ${v}\r\n`;
            }
          });
          head +=
            `content-length: ${respBody.byteLength}\r\nconnection: close\r\n\r\n`;
          const out = concat([new TextEncoder().encode(head), respBody]);
          let written = 0;
          while (written < out.byteLength) {
            written += await conn.write(out.subarray(written));
          }
        } catch {
          // Connection errors are expected for dropped connections.
        } finally {
          try {
            conn.close();
          } catch { /* already closed */ }
        }
      })();
    }
  })();

  return {
    origin: `http://127.0.0.1:${(listener.addr as Deno.NetAddr).port}`,
    close: () => listener.close(),
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type MethodDef = {
  arguments: { parse: (v: unknown) => unknown };
  execute: (args: unknown, context: unknown) => Promise<unknown>;
};

async function loadModel(): Promise<{
  upload: MethodDef;
  download: MethodDef;
  files: Record<string, unknown>;
}> {
  const mod = await import(GENERATED_MODEL.href);
  const methods = mod.model.methods as Record<string, MethodDef>;
  return {
    upload: methods["upload"],
    download: methods["download_content"],
    files: mod.model.files as Record<string, unknown>,
  };
}

function randomBytes(n: number): Uint8Array {
  const out = new Uint8Array(n);
  for (let i = 0; i < n; i += 65536) {
    crypto.getRandomValues(out.subarray(i, Math.min(i + 65536, n)));
  }
  return out;
}

async function withSourceFile<T>(
  content: Uint8Array,
  fn: (path: string) => Promise<T>,
): Promise<T> {
  const path = await Deno.makeTempFile({ suffix: ".bin" });
  try {
    await Deno.writeFile(path, content);
    return await fn(path);
  } finally {
    await Deno.remove(path);
  }
}

function globalArgs(mock: MockDrive, extra: Record<string, unknown> = {}) {
  return {
    apiEndpoint: mock.baseUrl,
    accessToken: ACCESS_TOKEN,
    project: "test-project",
    ...extra,
  };
}

async function runUpload(
  mock: MockDrive,
  args: Record<string, unknown>,
  extraGlobalArgs: Record<string, unknown> = {},
) {
  const { upload } = await loadModel();
  const t = createModelTestContext({
    globalArgs: globalArgs(mock, extraGlobalArgs),
  });
  await upload.execute(
    upload.arguments.parse({ retryDelayMs: 1, ...args }),
    t.context,
  );
  return t;
}

async function runDownload(
  mock: MockDrive,
  args: Record<string, unknown>,
  options: {
    globalArgs?: Record<string, unknown>;
    storedResources?: Record<string, Record<string, unknown>>;
  } = {},
) {
  const { download } = await loadModel();
  const t = createModelTestContext({
    globalArgs: globalArgs(mock, options.globalArgs),
    storedResources: options.storedResources,
  });
  await download.execute(download.arguments.parse(args), t.context);
  return t;
}

function sessionPuts(mock: MockDrive): RecordedRequest[] {
  return mock.requests.filter((r) =>
    r.method === "PUT" && r.query.has("upload_id")
  );
}

function sessionStarts(mock: MockDrive): RecordedRequest[] {
  return mock.requests.filter((r) =>
    r.path.startsWith("/upload/") && !r.query.has("upload_id")
  );
}

/** Run a test body against a fresh mock, always shutting it down. */
async function withMock(fn: (mock: MockDrive) => Promise<void>) {
  const mock = startMockDrive();
  try {
    await fn(mock);
  } finally {
    await mock.close();
  }
}

// ---------------------------------------------------------------------------
// Drift guard and model shape
// ---------------------------------------------------------------------------

Deno.test("drive files model: generated output contains the current enrichment", async () => {
  const generated = await Deno.readTextFile(GENERATED_MODEL);
  const parsed = await parseEnrichmentSource(ENRICHMENT_SOURCE.pathname);
  // The generator formats the model after inlining; the body is top-level
  // code, so formatting it standalone yields the same text.
  const formattedBody = (await formatCode(parsed.body)).trim();
  assert(
    generated.includes(formattedBody),
    "model/gcp/drive is stale: run `deno task generate:gcp drive`",
  );
  const { files, upload, download } = await loadModel();
  assert(upload, "upload method present");
  assert(download, "download_content method present");
  assert(files["content"], "content file spec present");
});

// ---------------------------------------------------------------------------
// Upload
// ---------------------------------------------------------------------------

Deno.test("upload: zero-byte file sends a single empty PUT", async () => {
  await withMock(async (mock) => {
    await withSourceFile(new Uint8Array(0), async (path) => {
      const t = await runUpload(mock, { sourcePath: path, name: "empty" });
      const puts = sessionPuts(mock);
      assertEquals(puts.length, 1);
      assertEquals(puts[0].headers.get("Content-Range"), "bytes */0");
      const [written] = t.getWrittenResources();
      assertEquals(written.specName, "state");
      assertEquals((written.data as { size: string }).size, "0");
    });
  });
});

Deno.test("upload: single chunk creates a file and writes full state", async () => {
  await withMock(async (mock) => {
    const content = randomBytes(1000);
    await withSourceFile(content, async (path) => {
      const t = await runUpload(mock, {
        sourcePath: path,
        name: "one.bin",
        mimeType: "application/octet-stream",
      });
      assertEquals(sessionPuts(mock).length, 1);
      const [written] = t.getWrittenResources();
      const data = written.data as { id: string; name: string };
      assertEquals(written.name, data.id);
      assertEquals(data.name, "one.bin");
      assertEquals(mock.files.get(data.id)!.content, content);
    });
  });
});

Deno.test("upload: multi-chunk transfer with 308 Range; Shared Drive params and parents on session start; no auth on chunks", async () => {
  await withMock(async (mock) => {
    const content = randomBytes(4 * QUANTUM + 123);
    await withSourceFile(content, async (path) => {
      const t = await runUpload(mock, {
        sourcePath: path,
        parents: ["shared-folder-1"],
        chunkSizeBytes: QUANTUM,
      });
      const [start] = sessionStarts(mock);
      assertEquals(start.method, "POST");
      assertEquals(start.query.get("supportsAllDrives"), "true");
      assertEquals(start.query.get("fields"), "*");
      assertEquals(
        start.headers.get("Authorization"),
        `Bearer ${ACCESS_TOKEN}`,
      );
      const body = start.body as { name: string; parents: string[] };
      assertEquals(body.parents, ["shared-folder-1"]);
      assert(body.name.endsWith(".bin"), "defaults name to source base name");

      const puts = sessionPuts(mock);
      assertEquals(puts.length, 5);
      for (const put of puts) {
        assertEquals(put.headers.get("Authorization"), null);
      }
      const id = (t.getWrittenResources()[0].data as { id: string }).id;
      assertEquals(mock.files.get(id)!.content, content);
    });
  });
});

Deno.test("upload: short commit resumes from the server's committed offset", async () => {
  await withMock(async (mock) => {
    const content = randomBytes(3 * QUANTUM);
    // First PUT: server keeps only the first half of the chunk.
    mock.putFaults.set(0, (_req, session) => {
      session.committed.push(content.subarray(0, QUANTUM / 2));
      session.committedBytes = QUANTUM / 2;
      return new Response(null, {
        status: 308,
        headers: { Range: `bytes=0-${QUANTUM / 2 - 1}` },
      });
    });
    await withSourceFile(content, async (path) => {
      const t = await runUpload(mock, {
        sourcePath: path,
        name: "short",
        chunkSizeBytes: QUANTUM,
      });
      const puts = sessionPuts(mock);
      assertEquals(
        puts[1].headers.get("Content-Range"),
        `bytes ${QUANTUM / 2}-${QUANTUM / 2 + QUANTUM - 1}/${3 * QUANTUM}`,
      );
      const id = (t.getWrittenResources()[0].data as { id: string }).id;
      assertEquals(mock.files.get(id)!.content, content);
    });
  });
});

Deno.test("upload: 503 mid-upload queries session status and resumes byte-exact", async () => {
  await withMock(async (mock) => {
    const content = randomBytes(3 * QUANTUM + 7);
    mock.putFaults.set(
      1,
      () => new Response("backend unavailable", { status: 503 }),
    );
    await withSourceFile(content, async (path) => {
      const t = await runUpload(mock, {
        sourcePath: path,
        name: "retry",
        chunkSizeBytes: QUANTUM,
      });
      const puts = sessionPuts(mock);
      assertEquals(
        puts[2].headers.get("Content-Range"),
        `bytes */${content.byteLength}`,
      );
      assertEquals(
        puts[3].headers.get("Content-Range"),
        `bytes ${QUANTUM}-${2 * QUANTUM - 1}/${content.byteLength}`,
      );
      const id = (t.getWrittenResources()[0].data as { id: string }).id;
      assertEquals(mock.files.get(id)!.content, content);
    });
  });
});

Deno.test("upload: dropped connection mid-upload is retried and resumed", async () => {
  await withMock(async (mock) => {
    const target = new URL(mock.baseUrl).origin;
    // Connection 2 is the second chunk PUT.
    const proxy = startDroppingProxy(target, new Set([2]));
    mock.sessionOrigin = proxy.origin;
    try {
      const content = randomBytes(3 * QUANTUM);
      await withSourceFile(content, async (path) => {
        const t = await runUpload(mock, {
          sourcePath: path,
          name: "drop",
          chunkSizeBytes: QUANTUM,
        });
        const id = (t.getWrittenResources()[0].data as { id: string }).id;
        assertEquals(mock.files.get(id)!.content, content);
      });
    } finally {
      proxy.close();
    }
  });
});

Deno.test("upload: retries exhausted fails with a clear error", async () => {
  await withMock(async (mock) => {
    for (let i = 0; i < 10; i++) {
      mock.putFaults.set(i, () => new Response("down", { status: 503 }));
    }
    await withSourceFile(randomBytes(10), async (path) => {
      const err = await assertRejects(
        () => runUpload(mock, { sourcePath: path, maxRetries: 2 }),
        Error,
        "gave up after 2 retries",
      );
      assertStringIncludes(err.message, "HTTP 503");
      assertEquals(sessionPuts(mock).length, 3);
    });
  });
});

Deno.test("upload: a chunk that keeps failing while status queries succeed exhausts the retry budget", async () => {
  await withMock(async (mock) => {
    const content = randomBytes(2 * QUANTUM);
    // After the first chunk lands, every data PUT fails with 503 while the
    // status query (handled normally) keeps answering 308 with the same
    // committed offset. Before the fix this looped forever.
    for (let i = 1; i < 40; i++) {
      mock.putFaults.set(
        i,
        (req) =>
          req.headers.get("Content-Range")?.startsWith("bytes */")
            ? undefined
            : new Response("bad gateway", { status: 502 }),
      );
    }
    await withSourceFile(content, async (path) => {
      await assertRejects(
        () =>
          runUpload(mock, {
            sourcePath: path,
            chunkSizeBytes: QUANTUM,
            maxRetries: 3,
          }),
        Error,
        "gave up after 3 retries",
      );
      const dataPuts = sessionPuts(mock).filter((r) =>
        !r.headers.get("Content-Range")?.startsWith("bytes */")
      );
      // First chunk, then the initial failing attempt plus 3 retries.
      assertEquals(dataPuts.length, 5);
    });
  });
});

Deno.test("upload: a session that keeps answering 308 without progress exhausts the retry budget", async () => {
  await withMock(async (mock) => {
    for (let i = 0; i < 40; i++) {
      mock.putFaults.set(i, () => new Response(null, { status: 308 }));
    }
    await withSourceFile(randomBytes(100), async (path) => {
      await assertRejects(
        () => runUpload(mock, { sourcePath: path, maxRetries: 2 }),
        Error,
        "made no progress",
      );
    });
  });
});

Deno.test("upload: 429 Retry-After takes precedence over the configured backoff", async () => {
  await withMock(async (mock) => {
    mock.putFaults.set(
      0,
      () =>
        new Response("slow down", {
          status: 429,
          headers: { "Retry-After": "0" },
        }),
    );
    const content = randomBytes(100);
    await withSourceFile(content, async (path) => {
      const started = Date.now();
      // A 60s configured backoff would time the test out if it were used.
      const t = await runUpload(mock, {
        sourcePath: path,
        retryDelayMs: 60_000,
      });
      assert(Date.now() - started < 10_000, "Retry-After: 0 was honored");
      const id = (t.getWrittenResources()[0].data as { id: string }).id;
      assertEquals(mock.files.get(id)!.content, content);
    });
  });
});

Deno.test("upload: an unreadable final response is retried via status query", async () => {
  await withMock(async (mock) => {
    const content = randomBytes(100);
    // The chunk lands and the file is finalized, but the 200 body is not
    // JSON (as with a proxy page or a reset mid-body).
    mock.putFaults.set(0, (_req, session) => {
      session.committed.push(content);
      session.committedBytes = content.byteLength;
      return new Response("<html>gateway</html>", { status: 200 });
    });
    await withSourceFile(content, async (path) => {
      const t = await runUpload(mock, { sourcePath: path });
      const puts = sessionPuts(mock);
      assertEquals(puts.length, 2);
      assertEquals(puts[1].headers.get("Content-Range"), "bytes */100");
      const id = (t.getWrittenResources()[0].data as { id: string }).id;
      assertEquals(mock.files.get(id)!.content, content);
    });
  });
});

Deno.test("upload: 410 session expired fails without retrying", async () => {
  await withMock(async (mock) => {
    mock.putFaults.set(0, () => new Response("gone", { status: 410 }));
    await withSourceFile(randomBytes(10), async (path) => {
      await assertRejects(
        () => runUpload(mock, { sourcePath: path }),
        Error,
        "session expired",
      );
      assertEquals(sessionPuts(mock).length, 1);
    });
  });
});

Deno.test("upload: fileId uploads a new revision via PATCH", async () => {
  await withMock(async (mock) => {
    mock.files.set("existing-1", {
      id: "existing-1",
      name: "report.bin",
      mimeType: "application/octet-stream",
      content: new Uint8Array([1, 2, 3]),
    });
    const content = randomBytes(500);
    await withSourceFile(content, async (path) => {
      const t = await runUpload(mock, {
        sourcePath: path,
        fileId: "existing-1",
      });
      const [start] = sessionStarts(mock);
      assertEquals(start.method, "PATCH");
      assertEquals(start.path, "/upload/drive/v3/files/existing-1");
      assertEquals(start.body, {}, "no name defaulted for a revision");
      assertEquals(mock.files.get("existing-1")!.content, content);
      assertEquals(t.getWrittenResources()[0].name, "existing-1");
    });
  });
});

Deno.test("upload: parents with fileId is rejected before any request", async () => {
  await withMock(async (mock) => {
    await withSourceFile(randomBytes(10), async (path) => {
      await assertRejects(
        () =>
          runUpload(mock, {
            sourcePath: path,
            fileId: "existing-1",
            parents: ["p"],
          }),
        Error,
        "parents can only be set when creating",
      );
      assertEquals(mock.requests.length, 0);
    });
  });
});

Deno.test("upload: invalid chunk size and oversize source are rejected before any request", async () => {
  await withMock(async (mock) => {
    await withSourceFile(randomBytes(1000), async (path) => {
      await assertRejects(
        () => runUpload(mock, { sourcePath: path, chunkSizeBytes: 1000 }),
        Error,
        "multiple of 262144",
      );
      await assertRejects(
        () => runUpload(mock, { sourcePath: path, maxBytes: 999 }),
        Error,
        "over maxBytes 999",
      );
      assertEquals(mock.requests.length, 0);
    });
  });
});

Deno.test("upload: outputName is sanitized into a safe data name", async () => {
  await withMock(async (mock) => {
    await withSourceFile(randomBytes(10), async (path) => {
      const t = await runUpload(mock, {
        sourcePath: path,
        outputName: "../backups/nightly",
      });
      const name = t.getWrittenResources()[0].name;
      assert(!name.includes("/") && !name.includes(".."), name);
    });
  });
});

// ---------------------------------------------------------------------------
// Upload: malformed responses and redaction
// ---------------------------------------------------------------------------

Deno.test("upload: HTML error page on session start yields a redacted, capped error", async () => {
  await withMock(async (mock) => {
    mock.initOverride = () =>
      new Response(
        `<html><body>Internal error. Authorization: Bearer ${ACCESS_TOKEN} ${
          "x".repeat(2000)
        }</body></html>`,
        { status: 500, headers: { "Content-Type": "text/html" } },
      );
    await withSourceFile(randomBytes(10), async (path) => {
      const err = await assertRejects(
        () => runUpload(mock, { sourcePath: path }),
        Error,
        "HTTP 500",
      );
      assert(!err.message.includes("SECRET"), err.message);
      assert(err.message.length < 700, "error body is length-capped");
    });
  });
});

Deno.test("upload: session start without a Location header fails clearly", async () => {
  await withMock(async (mock) => {
    mock.initOverride = () => new Response(null, { status: 200 });
    await withSourceFile(randomBytes(10), async (path) => {
      await assertRejects(
        () => runUpload(mock, { sourcePath: path }),
        Error,
        "without a Location header",
      );
    });
  });
});

Deno.test("upload: 308 without Range means nothing committed; resend from 0", async () => {
  await withMock(async (mock) => {
    mock.putFaults.set(0, () => new Response(null, { status: 308 }));
    const content = randomBytes(100);
    await withSourceFile(content, async (path) => {
      const t = await runUpload(mock, { sourcePath: path });
      const puts = sessionPuts(mock);
      // A no-progress 308 counts as a failure: back off, query, resend.
      assertEquals(puts.length, 3);
      assertEquals(puts[1].headers.get("Content-Range"), "bytes */100");
      assertEquals(puts[2].headers.get("Content-Range"), "bytes 0-99/100");
      const id = (t.getWrittenResources()[0].data as { id: string }).id;
      assertEquals(mock.files.get(id)!.content, content);
    });
  });
});

Deno.test("upload: 308 reporting every byte committed triggers a status query, not an empty chunk", async () => {
  await withMock(async (mock) => {
    const content = randomBytes(100);
    mock.putFaults.set(0, (_req, session) => {
      session.committed.push(content);
      session.committedBytes = content.byteLength;
      return new Response(null, {
        status: 308,
        headers: { Range: `bytes=0-${content.byteLength - 1}` },
      });
    });
    await withSourceFile(content, async (path) => {
      const t = await runUpload(mock, { sourcePath: path });
      const puts = sessionPuts(mock);
      assertEquals(puts.length, 2);
      assertEquals(puts[1].headers.get("Content-Range"), "bytes */100");
      const id = (t.getWrittenResources()[0].data as { id: string }).id;
      assertEquals(mock.files.get(id)!.content, content);
    });
  });
});

Deno.test("upload: unparseable Range header fails clearly", async () => {
  await withMock(async (mock) => {
    mock.putFaults.set(
      0,
      () => new Response(null, { status: 308, headers: { Range: "garbage" } }),
    );
    await withSourceFile(randomBytes(100), async (path) => {
      await assertRejects(
        () => runUpload(mock, { sourcePath: path }),
        Error,
        "unparseable Range header",
      );
    });
  });
});

Deno.test("upload: error bodies echoing the token and upload_id are redacted", async () => {
  await withMock(async (mock) => {
    mock.putFaults.set(0, (req) =>
      new Response(
        JSON.stringify({
          error:
            `forbidden for ${req.url} with Authorization: Bearer ${ACCESS_TOKEN}`,
        }),
        { status: 403 },
      ));
    await withSourceFile(randomBytes(10), async (path) => {
      const err = await assertRejects(
        () => runUpload(mock, { sourcePath: path }),
        Error,
        "HTTP 403",
      );
      assert(!err.message.includes("SECRET"), err.message);
    });
  });
});

// ---------------------------------------------------------------------------
// Download
// ---------------------------------------------------------------------------

Deno.test("download_content: multi-MiB round trip is byte-equal and uses the file's MIME type", async () => {
  await withMock(async (mock) => {
    const content = randomBytes(3 * 1024 * 1024 + 11);
    await withSourceFile(content, async (path) => {
      const up = await runUpload(mock, {
        sourcePath: path,
        name: "backup.tar",
        mimeType: "application/x-tar",
        chunkSizeBytes: 4 * QUANTUM,
      });
      const id = (up.getWrittenResources()[0].data as { id: string }).id;
      const down = await runDownload(mock, { fileId: id });
      const [file] = down.getWrittenFiles();
      assertEquals(file.specName, "content");
      assertEquals(file.name, id);
      assertEquals(file.content, content);

      const media = mock.requests.find((r) => r.query.get("alt") === "media")!;
      assertEquals(media.query.get("supportsAllDrives"), "true");
      assertEquals(
        media.headers.get("Authorization"),
        `Bearer ${ACCESS_TOKEN}`,
      );
    });
  });
});

Deno.test("download_content: falls back to the stored state id", async () => {
  await withMock(async (mock) => {
    mock.files.set("stored-1", {
      id: "stored-1",
      mimeType: "text/plain",
      content: new TextEncoder().encode("hello"),
    });
    const t = await runDownload(mock, {}, {
      globalArgs: { name: "my-file" },
      storedResources: { "my-file": { id: "stored-1" } },
    });
    const [file] = t.getWrittenFiles();
    assertEquals(new TextDecoder().decode(file.content), "hello");
  });
});

Deno.test("upload then download_content round-trips through the model's name", async () => {
  await withMock(async (mock) => {
    const content = randomBytes(1234);
    await withSourceFile(content, async (path) => {
      const up = await runUpload(mock, { sourcePath: path }, {
        name: "report",
      });
      const [written] = up.getWrittenResources();
      assertEquals(written.name, "report");
      const down = await runDownload(mock, {}, {
        globalArgs: { name: "report" },
        storedResources: {
          report: written.data as Record<string, unknown>,
        },
      });
      assertEquals(down.getWrittenFiles()[0].content, content);
    });
  });
});

Deno.test("download_content: no fileId and no stored state fails clearly without requests", async () => {
  await withMock(async (mock) => {
    await assertRejects(
      () => runDownload(mock, {}, { globalArgs: { name: "report.pdf" } }),
      Error,
      "pass fileId",
    );
    assertEquals(mock.requests.length, 0);
  });
});

Deno.test("download_content: maxBytes over the declared size fails before transferring", async () => {
  await withMock(async (mock) => {
    mock.files.set("big", {
      id: "big",
      mimeType: "application/octet-stream",
      content: randomBytes(5000),
    });
    await assertRejects(
      () => runDownload(mock, { fileId: "big", maxBytes: 4999 }),
      Error,
      "over maxBytes 4999",
    );
    assert(!mock.requests.some((r) => r.query.get("alt") === "media"));
  });
});

Deno.test("download_content: maxBytes exceeded mid-stream fails rather than truncating", async () => {
  await withMock(async (mock) => {
    const content = randomBytes(5000);
    mock.files.set("unsized", {
      id: "unsized",
      mimeType: "application/octet-stream",
      content,
    });
    // Hide the size from the preflight so only the stream bound can catch it.
    const realFetch = globalThis.fetch;
    globalThis.fetch = async (input, init) => {
      const resp = await realFetch(input, init);
      const url = new URL(input instanceof Request ? input.url : input);
      if (url.searchParams.get("fields") === "id,name,mimeType,size") {
        const meta = await resp.json();
        delete meta.size;
        return Response.json(meta);
      }
      return resp;
    };
    try {
      await assertRejects(
        () => runDownload(mock, { fileId: "unsized", maxBytes: 1000 }),
        Error,
        "exceeded maxBytes 1000",
      );
    } finally {
      globalThis.fetch = realFetch;
    }
  });
});

Deno.test("download_content: Google Workspace native files are rejected with an export hint", async () => {
  await withMock(async (mock) => {
    mock.files.set("doc-1", {
      id: "doc-1",
      mimeType: "application/vnd.google-apps.document",
      content: new Uint8Array(0),
    });
    await assertRejects(
      () => runDownload(mock, { fileId: "doc-1" }),
      Error,
      "files.export",
    );
    assert(!mock.requests.some((r) => r.query.get("alt") === "media"));
  });
});

Deno.test("download_content: outputName is sanitized into a safe data name", async () => {
  await withMock(async (mock) => {
    mock.files.set("f", {
      id: "f",
      mimeType: "application/octet-stream",
      content: new Uint8Array([9]),
    });
    const t = await runDownload(mock, {
      fileId: "f",
      outputName: "../../etc/passwd",
    });
    const name = t.getWrittenFiles()[0].name;
    assert(!name.includes("/") && !name.includes(".."), name);
  });
});

Deno.test("download_content: HTTP errors are redacted", async () => {
  await withMock(async (mock) => {
    const err = await assertRejects(
      () => runDownload(mock, { fileId: "missing" }),
      Error,
      "HTTP 404",
    );
    assert(!err.message.includes("SECRET"), err.message);
  });
});
