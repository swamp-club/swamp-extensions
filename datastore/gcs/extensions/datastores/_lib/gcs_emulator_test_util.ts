// Copyright (C) 2026 Elder Swamp Club, Inc.
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
 * Test-only: a stateful GCS JSON API endpoint, enough of it for the cache
 * sync, the datastore-wide control plane and chunk storage to run against
 * end to end. It honours generation preconditions, which fake-gcs-server
 * before 1.56.0 does not, keeps a server-side `updated` per object, and
 * counts every request. Not imported by gcs.ts, so it is never bundled.
 */

import { GcsClient } from "./gcs_client.ts";

export interface GcsEmulatorOptions {
  /** Answers an object request with this response, when it returns one. */
  respondTo?: (method: string, name: string) => Response | undefined;
  /**
   * A media upload waits for the returned promise before reading its body.
   * A request the client gave up on in the meantime commits nothing, as GCS
   * does for a simple upload.
   */
  holdUpload?: (name: string) => Promise<void> | undefined;
  /** Every request answers as for a bucket that does not exist. */
  missingBucket?: boolean;
  /** Most items a list page holds. Default: 1000. */
  maxResults?: number;
  /** Calls a rewrite takes before it reports done. Default: 1. */
  rewriteCalls?: number;
}

export interface GcsEmulatorRequest {
  method: string;
  kind:
    | "bucket"
    | "list"
    | "media"
    | "metadata"
    | "upload"
    | "delete"
    | "rewrite";
  /** The object name, or the list prefix for a list. */
  name: string;
  status: number;
}

export interface GcsEmulatorObject {
  body: Uint8Array;
  generation: number;
  /** Server-side modification time; a test may change it to backdate. */
  updated: Date;
  metadata?: Record<string, string>;
}

export interface GcsEmulatorState {
  objects: Map<string, GcsEmulatorObject>;
  requests: GcsEmulatorRequest[];
  /** Mutable, so a test can change behaviour between calls. */
  options: GcsEmulatorOptions;
}

function jsonError(code: number, message: string): Response {
  return new Response(JSON.stringify({ error: { code, message } }), {
    status: code,
    headers: { "content-type": "application/json" },
  });
}

function resource(name: string, o: GcsEmulatorObject) {
  return {
    name,
    size: String(o.body.length),
    generation: String(o.generation),
    updated: o.updated.toISOString(),
    metadata: o.metadata,
  };
}

/** Builds the request handler; the state is live and inspectable. */
export function createGcsEmulatorHandler(
  options: GcsEmulatorOptions = {},
): { handler: (req: Request) => Promise<Response>; state: GcsEmulatorState } {
  const state: GcsEmulatorState = { objects: new Map(), requests: [], options };
  let nextGeneration = 1000;
  const rewriteProgress = new Map<string, number>();

  // Does an ifGenerationMatch precondition hold for the current object?
  const holds = (
    current: GcsEmulatorObject | undefined,
    match: string | null,
  ) =>
    match === null ||
    (match === "0"
      ? current === undefined
      : current?.generation === Number(match));

  const respond = async (
    req: Request,
    url: URL,
    record: (kind: GcsEmulatorRequest["kind"], name: string) => void,
  ): Promise<Response> => {
    const raw = url.pathname;
    const upload = raw.match(/^\/upload\/storage\/v1\/b\/[^/]+\/o$/);
    const rewrite = raw.match(
      /^\/storage\/v1\/b\/[^/]+\/o\/([^/]+)\/rewriteTo\/b\/[^/]+\/o\/([^/]+)$/,
    );
    const object = raw.match(/^\/storage\/v1\/b\/[^/]+\/o\/([^/]+)$/);
    const list = raw.match(/^\/storage\/v1\/b\/[^/]+\/o$/);
    const bucket = raw.match(/^\/storage\/v1\/b\/[^/]+$/);

    if (upload && req.method === "POST") {
      const name = url.searchParams.get("name") ?? "";
      record("upload", name);
      if (state.options.missingBucket) return jsonError(404, "No such bucket");
      const override = state.options.respondTo?.("POST", name);
      if (override) return override;
      // Only simple uploads are emulated; a resumable or multipart one is
      // refused, so a test sees it.
      if (url.searchParams.get("uploadType") !== "media") {
        return jsonError(400, "only uploadType=media is emulated");
      }
      // Held before the body is read, so the upload is still in flight. A
      // request the client gave up on in the meantime commits nothing, as
      // GCS does with a simple upload it never received whole.
      const hold = state.options.holdUpload?.(name);
      if (hold) await hold;
      let body: Uint8Array;
      try {
        body = new Uint8Array(await req.arrayBuffer());
      } catch {
        return new Response(null, { status: 499 });
      }
      if (req.signal.aborted) return new Response(null, { status: 499 });
      if (
        !holds(
          state.objects.get(name),
          url.searchParams.get("ifGenerationMatch"),
        )
      ) {
        return jsonError(412, "Precondition Failed");
      }
      const o = { body, generation: nextGeneration++, updated: new Date() };
      state.objects.set(name, o);
      return Response.json(resource(name, o));
    }

    if (rewrite && req.method === "POST") {
      const source = decodeURIComponent(rewrite[1]);
      const dest = decodeURIComponent(rewrite[2]);
      record("rewrite", source);
      if (state.options.missingBucket) return jsonError(404, "No such bucket");
      const override = state.options.respondTo?.("POST", source);
      if (override) return override;
      const current = state.objects.get(source);
      if (!current) return jsonError(404, "No such object");
      const calls = (rewriteProgress.get(source) ?? 0) + 1;
      if (calls < (state.options.rewriteCalls ?? 1)) {
        rewriteProgress.set(source, calls);
        return Response.json({ done: false, rewriteToken: `token-${calls}` });
      }
      rewriteProgress.delete(source);
      const text = await req.text();
      const patch = text
        ? JSON.parse(text) as { metadata?: Record<string, string> }
        : {};
      const o = {
        body: current.body,
        generation: nextGeneration++,
        updated: new Date(),
        metadata: patch.metadata ?? current.metadata,
      };
      state.objects.set(dest, o);
      return Response.json({ done: true, resource: resource(dest, o) });
    }

    if (object) {
      const name = decodeURIComponent(object[1]);
      const media = url.searchParams.get("alt") === "media";
      const kind = req.method === "DELETE"
        ? "delete"
        : media
        ? "media"
        : "metadata";
      record(kind, name);
      if (state.options.missingBucket) return jsonError(404, "No such bucket");
      const override = state.options.respondTo?.(req.method, name);
      if (override) return override;
      const current = state.objects.get(name);
      if (req.method === "DELETE") {
        if (!current) return jsonError(404, "No such object");
        if (!holds(current, url.searchParams.get("ifGenerationMatch"))) {
          return jsonError(412, "Precondition Failed");
        }
        state.objects.delete(name);
        return new Response(null, { status: 204 });
      }
      if (req.method === "GET") {
        if (!current) return jsonError(404, "No such object");
        if (media) {
          return new Response(current.body.slice().buffer, {
            status: 200,
            headers: { "x-goog-generation": String(current.generation) },
          });
        }
        return Response.json(resource(name, current));
      }
    }

    if (list && req.method === "GET") {
      const prefix = url.searchParams.get("prefix") ?? "";
      record("list", prefix);
      if (state.options.missingBucket) return jsonError(404, "No such bucket");
      // The page token is the last name of the previous page.
      const after = url.searchParams.get("pageToken") ?? "";
      const max = state.options.maxResults ?? 1000;
      const all = [...state.objects.entries()]
        .filter(([k]) => k.startsWith(prefix) && k > after)
        .sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0);
      const page = all.slice(0, max);
      return Response.json({
        items: page.map(([k, o]) => resource(k, o)),
        nextPageToken: all.length > page.length
          ? page[page.length - 1][0]
          : undefined,
      });
    }

    if (bucket && req.method === "GET") {
      record("bucket", "");
      if (state.options.missingBucket) return jsonError(404, "No such bucket");
      return Response.json({ name: "test-bucket" });
    }

    return new Response(null, { status: 405 });
  };

  const handler = async (req: Request): Promise<Response> => {
    const url = new URL(req.url);
    let entry: GcsEmulatorRequest | undefined;
    const response = await respond(req, url, (kind, name) => {
      entry = { method: req.method, kind, name, status: 0 };
    });
    if (entry) {
      entry.status = response.status;
      state.requests.push(entry);
    }
    return response;
  };

  return { handler, state };
}

/**
 * Runs `fn` with a `GcsClient` wired to a fresh emulator. The client is in
 * emulator mode (an `apiEndpoint`), so it sends no credentials. `fn` also
 * gets the endpoint, for a test that needs a provider of its own.
 */
export async function withGcsEmulator(
  options: GcsEmulatorOptions,
  fn: (
    gcs: GcsClient,
    state: GcsEmulatorState,
    endpoint: string,
  ) => Promise<void>,
): Promise<void> {
  const { handler, state } = createGcsEmulatorHandler(options);
  const server = Deno.serve({ port: 0, onListen() {} }, handler);
  const { port } = server.addr as Deno.NetAddr;
  try {
    const endpoint = `http://127.0.0.1:${port}`;
    const gcs = new GcsClient({ bucket: "test-bucket", apiEndpoint: endpoint });
    await fn(gcs, state, endpoint);
  } finally {
    await server.shutdown();
  }
}
