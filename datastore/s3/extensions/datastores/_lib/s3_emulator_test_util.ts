// Swamp, an Automation Framework
// Copyright (C) 2026 System Initiative, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

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
  /** Called as each object request arrives, before it is handled. */
  onRequest?: (method: string, key: string) => void;
}

export interface S3EmulatorRequest {
  method: string;
  key: string | null;
  ifMatch: string | null;
  ifNoneMatch: string | null;
  status: number;
}

export interface S3EmulatorState {
  /** Stored objects by key; ETags are kept unquoted. */
  objects: Map<string, { body: Uint8Array; etag: string }>;
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

    if (req.method === "GET" && url.searchParams.has("list-type")) {
      const prefix = url.searchParams.get("prefix") ?? "";
      const matching = [...state.objects.entries()].filter(([k]) =>
        k.startsWith(prefix)
      );
      const contents = matching.map(([k, v]) =>
        `<Contents><Key>${
          xmlEscape(k)
        }</Key><Size>${v.body.length}</Size><ETag>&quot;${v.etag}&quot;</ETag><LastModified>${
          new Date().toISOString()
        }</LastModified></Contents>`
      ).join("");
      return new Response(
        `<?xml version="1.0"?><ListBucketResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Name>test-bucket</Name><KeyCount>${matching.length}</KeyCount><MaxKeys>1000</MaxKeys><IsTruncated>false</IsTruncated>${contents}</ListBucketResult>`,
        { status: 200, headers: { "content-type": "application/xml" } },
      );
    }
    if (key === null) return new Response(null, { status: 200 });

    state.options.onRequest?.(req.method, key);
    const current = state.objects.get(key);

    if (req.method === "GET" || req.method === "HEAD") {
      if (!current) {
        return req.method === "HEAD"
          ? new Response(null, { status: 404 })
          : xmlError("NoSuchKey", 404);
      }
      const headers: Record<string, string> = {
        "content-length": String(current.body.length),
        "last-modified": new Date().toUTCString(),
      };
      if (req.method === "GET" || !state.options.omitHeadETag) {
        headers.etag = `"${current.etag}"`;
      }
      return req.method === "HEAD"
        ? new Response(null, { status: 200, headers })
        : new Response(current.body.slice().buffer, { status: 200, headers });
    }

    if (req.method === "PUT") {
      const body = new Uint8Array(await req.arrayBuffer());
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
      state.objects.set(key, { body, etag });
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
    const response = await respond(req);
    state.requests.push({
      method: req.method,
      key,
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
 * credentials for the SDK and restores the prior env in `finally`.
 */
export async function withS3Emulator(
  options: S3EmulatorOptions,
  fn: (s3: S3Client, state: S3EmulatorState) => Promise<void>,
): Promise<void> {
  const { handler, state } = createS3EmulatorHandler(options);
  const server = Deno.serve({ port: 0, onListen() {} }, handler);
  const { port } = server.addr as Deno.NetAddr;

  const priorKey = Deno.env.get("AWS_ACCESS_KEY_ID");
  const priorSecret = Deno.env.get("AWS_SECRET_ACCESS_KEY");
  Deno.env.set("AWS_ACCESS_KEY_ID", "test");
  Deno.env.set("AWS_SECRET_ACCESS_KEY", "test");
  try {
    const s3 = new S3Client({
      bucket: "test-bucket",
      region: "us-east-1",
      endpoint: `http://127.0.0.1:${port}`,
      forcePathStyle: true,
    });
    await fn(s3, state);
  } finally {
    if (priorKey !== undefined) Deno.env.set("AWS_ACCESS_KEY_ID", priorKey);
    else Deno.env.delete("AWS_ACCESS_KEY_ID");
    if (priorSecret !== undefined) {
      Deno.env.set("AWS_SECRET_ACCESS_KEY", priorSecret);
    } else Deno.env.delete("AWS_SECRET_ACCESS_KEY");
    await server.shutdown();
  }
}
