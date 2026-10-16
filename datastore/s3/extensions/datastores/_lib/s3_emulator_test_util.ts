// Copyright (C) 2026 System Initiative, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Test-only: a stateful, path-style S3 endpoint for driving the real AWS SDK
 * through conditional writes. Shared by the client, cache-sync, lock and
 * verifier tests because each needs the same per-key ETag bookkeeping, and
 * the ways S3-compatible stores bend If-Match (swamp-club #2337) are only
 * worth encoding once. Not imported by s3.ts, so it is never bundled.
 */

import { S3Client } from "./s3_client.ts";

export interface S3EmulatorOptions {
  /**
   * PutObject with a quoted `If-Match` ETag. "reject" answers 412 even when
   * it matches — Ceph RGW Squid 19.2.x's behaviour.
   */
  quotedIfMatch?: "honour" | "reject";
  /** PutObject with an unquoted `If-Match` ETag. "ignore" always writes. */
  unquotedIfMatch?: "honour" | "reject" | "ignore";
  /** Precondition failures carry a text/plain body instead of XML. */
  nonXmlPreconditionBody?: boolean;
  /** HeadObject omits the ETag header. */
  omitHeadETag?: boolean;
  /** PutObject answers 403 AccessDenied for keys this matches. */
  denyPut?: (key: string) => boolean;
  /** GetObject answers with this response for keys it returns one for. */
  respondToGet?: (key: string) => Response | undefined;
  /** Called as each object request arrives, before it is handled. */
  onRequest?: (method: string, key: string) => void;
  /**
   * Answers an object request with this response for requests it returns
   * one for, before anything else is done.
   */
  respondTo?: (method: string, key: string) => Response | undefined;
  /**
   * PutObject waits for the returned promise before committing. A request
   * the client gave up on in the meantime commits nothing, as S3 does.
   */
  holdPut?: (key: string) => Promise<void> | undefined;
  /** Every request answers as for a bucket that does not exist. */
  missingBucket?: boolean;
  /** Most keys a ListObjectsV2 page holds. Default: 1000. */
  maxKeys?: number;
}

export interface S3EmulatorRequest {
  method: string;
  key: string | null;
  /** The ListObjectsV2 prefix, for a list request; otherwise null. */
  listPrefix: string | null;
  /** The x-amz-copy-source of a CopyObject; otherwise null. */
  copySource: string | null;
  ifMatch: string | null;
  ifNoneMatch: string | null;
  status: number;
}

export interface S3EmulatorState {
  /**
   * Stored objects by key; ETags are kept unquoted. `lastModified` is set on
   * every write and copy; a test may change it to backdate an object.
   */
  objects: Map<
    string,
    { body: Uint8Array; etag: string; lastModified?: Date }
  >;
  requests: S3EmulatorRequest[];
  /** Mutable, so a test can change behaviour between calls. */
  options: S3EmulatorOptions;
}

function xmlError(code: string, status: number): Response {
  return new Response(
    `<?xml version="1.0"?><Error><Code>${code}</Code><Message>${code}</Message></Error>`,
    { status, headers: { "content-type": "application/xml" } },
  );
}

function xmlEscape(s: string): string {
  return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(
    ">",
    "&gt;",
  );
}

/** Builds the request handler; the state is live and inspectable. */
export function createS3EmulatorHandler(
  options: S3EmulatorOptions = {},
): { handler: (req: Request) => Promise<Response>; state: S3EmulatorState } {
  const state: S3EmulatorState = { objects: new Map(), requests: [], options };

  const precondition = () =>
    state.options.nonXmlPreconditionBody
      ? new Response("precondition failed", {
        status: 412,
        headers: { "content-type": "text/plain" },
      })
      : xmlError("PreconditionFailed", 412);

  // Would a PutObject carrying these headers be allowed to write?
  const allowed = (
    current: { etag: string } | undefined,
    ifMatch: string | null,
    ifNoneMatch: string | null,
  ): boolean => {
    if (ifNoneMatch === "*" && current) return false;
    if (ifMatch === null) return true;
    if (ifMatch === "*") return current !== undefined;
    if (ifMatch.startsWith('"')) {
      if (state.options.quotedIfMatch === "reject") return false;
      return current !== undefined && `"${current.etag}"` === ifMatch;
    }
    if (state.options.unquotedIfMatch === "reject") return false;
    if (state.options.unquotedIfMatch === "ignore") return true;
    return current !== undefined && current.etag === ifMatch;
  };

  const respond = async (req: Request): Promise<Response> => {
    const url = new URL(req.url);
    const key = decodeURIComponent(url.pathname).match(/^\/[^/]+\/(.+)$/)
      ?.[1] ?? null;

    if (state.options.missingBucket) {
      return req.method === "HEAD"
        ? new Response(null, { status: 404 })
        : xmlError("NoSuchBucket", 404);
    }

    if (req.method === "GET" && url.searchParams.has("list-type")) {
      const prefix = url.searchParams.get("prefix") ?? "";
      // The continuation token is the last key of the previous page.
      const after = url.searchParams.get("continuation-token") ?? "";
      const maxKeys = state.options.maxKeys ?? 1000;
      const delimiter = url.searchParams.get("delimiter");
      if (delimiter) {
        // Directories (CommonPrefixes) and the objects directly under the
        // prefix, merged in key order and paged together, as S3 does. A
        // token naming a directory skips everything under it.
        const items = new Map<string, "dir" | "key">();
        for (const k of state.objects.keys()) {
          if (!k.startsWith(prefix)) continue;
          const at = k.indexOf(delimiter, prefix.length);
          if (at >= 0) items.set(k.slice(0, at + delimiter.length), "dir");
          else items.set(k, "key");
        }
        const ordered = [...items.entries()]
          .filter(([k]) =>
            k > after && !(after.endsWith(delimiter) && k.startsWith(after))
          )
          .sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0);
        const pageItems = ordered.slice(0, maxKeys);
        const pageTruncated = ordered.length > pageItems.length;
        const body = pageItems.map(([k, kind]) =>
          kind === "dir"
            ? `<CommonPrefixes><Prefix>${
              xmlEscape(k)
            }</Prefix></CommonPrefixes>`
            : `<Contents><Key>${xmlEscape(k)}</Key><Size>${
              state.objects.get(k)!.body.length
            }</Size></Contents>`
        ).join("");
        const nextToken = pageTruncated
          ? `<NextContinuationToken>${
            xmlEscape(pageItems[pageItems.length - 1][0])
          }</NextContinuationToken>`
          : "";
        return new Response(
          `<?xml version="1.0"?><ListBucketResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Name>test-bucket</Name><KeyCount>${pageItems.length}</KeyCount><MaxKeys>${maxKeys}</MaxKeys><IsTruncated>${pageTruncated}</IsTruncated>${body}${nextToken}</ListBucketResult>`,
          { status: 200, headers: { "content-type": "application/xml" } },
        );
      }
      const all = [...state.objects.entries()]
        .filter(([k]) => k.startsWith(prefix) && k > after)
        .sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0);
      const matching = all.slice(0, maxKeys);
      const truncated = all.length > matching.length;
      const contents = matching.map(([k, v]) =>
        `<Contents><Key>${
          xmlEscape(k)
        }</Key><Size>${v.body.length}</Size><ETag>&quot;${v.etag}&quot;</ETag><LastModified>${
          (v.lastModified ?? new Date()).toISOString()
        }</LastModified></Contents>`
      ).join("");
      const next = truncated
        ? `<NextContinuationToken>${
          xmlEscape(matching[matching.length - 1][0])
        }</NextContinuationToken>`
        : "";
      return new Response(
        `<?xml version="1.0"?><ListBucketResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Name>test-bucket</Name><KeyCount>${matching.length}</KeyCount><MaxKeys>${maxKeys}</MaxKeys><IsTruncated>${truncated}</IsTruncated>${contents}${next}</ListBucketResult>`,
        { status: 200, headers: { "content-type": "application/xml" } },
      );
    }
    if (key === null) return new Response(null, { status: 200 });

    state.options.onRequest?.(req.method, key);
    const override = state.options.respondTo?.(req.method, key);
    if (override) return override;
    const current = state.objects.get(key);

    if (req.method === "GET") {
      const override = state.options.respondToGet?.(key);
      if (override) return override;
    }

    if (req.method === "GET" || req.method === "HEAD") {
      if (!current) {
        return req.method === "HEAD"
          ? new Response(null, { status: 404 })
          : xmlError("NoSuchKey", 404);
      }
      const headers: Record<string, string> = {
        "content-length": String(current.body.length),
        "last-modified": (current.lastModified ?? new Date()).toUTCString(),
      };
      if (req.method === "GET" || !state.options.omitHeadETag) {
        headers.etag = `"${current.etag}"`;
      }
      return req.method === "HEAD"
        ? new Response(null, { status: 200, headers })
        : new Response(current.body.slice().buffer, { status: 200, headers });
    }

    const copySource = req.headers.get("x-amz-copy-source");
    if (req.method === "PUT" && copySource !== null) {
      const sourceKey = decodeURIComponent(copySource).replace(
        /^\/?[^/]+\//,
        "",
      );
      const source = state.objects.get(sourceKey);
      if (!source) return xmlError("NoSuchKey", 404);
      if (
        sourceKey === key &&
        req.headers.get("x-amz-metadata-directive") !== "REPLACE"
      ) {
        // S3 refuses a copy onto itself that changes nothing.
        return xmlError("InvalidRequest", 400);
      }
      const etag = crypto.randomUUID().replaceAll("-", "");
      const lastModified = new Date();
      state.objects.set(key, { body: source.body, etag, lastModified });
      return new Response(
        `<?xml version="1.0"?><CopyObjectResult><ETag>&quot;${etag}&quot;</ETag><LastModified>${lastModified.toISOString()}</LastModified></CopyObjectResult>`,
        { status: 200, headers: { "content-type": "application/xml" } },
      );
    }

    if (req.method === "PUT") {
      // Held before the body is read, so the upload is still in flight. A
      // request the client gave up on in the meantime commits nothing, as S3
      // does with a body it never received whole.
      const hold = state.options.holdPut?.(key);
      if (hold) await hold;
      let body: Uint8Array;
      try {
        body = new Uint8Array(await req.arrayBuffer());
      } catch {
        return new Response(null, { status: 499 });
      }
      if (req.signal.aborted) return new Response(null, { status: 499 });
      if (state.options.denyPut?.(key)) return xmlError("AccessDenied", 403);
      if (
        !allowed(
          current,
          req.headers.get("if-match"),
          req.headers.get("if-none-match"),
        )
      ) {
        return precondition();
      }
      // A fresh ETag per write, whatever the content, so nothing can pass
      // by accidentally reusing a stale one.
      const etag = crypto.randomUUID().replaceAll("-", "");
      state.objects.set(key, { body, etag, lastModified: new Date() });
      return new Response(null, {
        status: 200,
        headers: { etag: `"${etag}"` },
      });
    }

    if (req.method === "DELETE") {
      state.objects.delete(key);
      return new Response(null, { status: 204 });
    }

    return new Response(null, { status: 405 });
  };

  const handler = async (req: Request): Promise<Response> => {
    const url = new URL(req.url);
    const key = decodeURIComponent(url.pathname).match(/^\/[^/]+\/(.+)$/)
      ?.[1] ?? null;
    const ifMatch = req.headers.get("if-match");
    const ifNoneMatch = req.headers.get("if-none-match");
    const listPrefix = url.searchParams.has("list-type")
      ? url.searchParams.get("prefix") ?? ""
      : null;
    const copySource = req.headers.get("x-amz-copy-source");
    const response = await respond(req);
    state.requests.push({
      method: req.method,
      key,
      listPrefix,
      copySource,
      ifMatch,
      ifNoneMatch,
      status: response.status,
    });
    return response;
  };

  return { handler, state };
}

/**
 * Runs `fn` with an `S3Client` wired to a fresh emulator. Sets dummy AWS
 * credentials for the SDK and restores the prior env in `finally`. `fn`
 * also gets the endpoint, for a test that needs a client of its own.
 */
export async function withS3Emulator(
  options: S3EmulatorOptions,
  fn: (
    s3: S3Client,
    state: S3EmulatorState,
    endpoint: string,
  ) => Promise<void>,
): Promise<void> {
  const { handler, state } = createS3EmulatorHandler(options);
  const server = Deno.serve({ port: 0, onListen() {} }, handler);
  const { port } = server.addr as Deno.NetAddr;

  const priorKey = Deno.env.get("AWS_ACCESS_KEY_ID");
  const priorSecret = Deno.env.get("AWS_SECRET_ACCESS_KEY");
  Deno.env.set("AWS_ACCESS_KEY_ID", "test");
  Deno.env.set("AWS_SECRET_ACCESS_KEY", "test");
  try {
    const endpoint = `http://127.0.0.1:${port}`;
    const s3 = new S3Client({
      bucket: "test-bucket",
      region: "us-east-1",
      endpoint,
      forcePathStyle: true,
    });
    await fn(s3, state, endpoint);
  } finally {
    if (priorKey !== undefined) Deno.env.set("AWS_ACCESS_KEY_ID", priorKey);
    else Deno.env.delete("AWS_ACCESS_KEY_ID");
    if (priorSecret !== undefined) {
      Deno.env.set("AWS_SECRET_ACCESS_KEY", priorSecret);
    } else Deno.env.delete("AWS_SECRET_ACCESS_KEY");
    await server.shutdown();
  }
}
