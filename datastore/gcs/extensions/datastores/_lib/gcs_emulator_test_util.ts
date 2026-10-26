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
  /** Called with each request once the emulator has answered it. */
  onRecorded?: (request: GcsEmulatorRequest) => void;
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
      // A body that ends early commits nothing, as GCS does with a simple
      // upload it never received whole.
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
      const delimiter = url.searchParams.get("delimiter");
      if (delimiter) {
        // Directories (`prefixes`) and the objects directly under the
        // prefix, merged in name order and paged together, as GCS does. A
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
        const pageItems = ordered.slice(0, max);
        const prefixes = pageItems.filter(([, kind]) => kind === "dir").map((
          [k],
        ) => k);
        const objects = pageItems.filter(([, kind]) => kind === "key");
        return Response.json({
          ...(prefixes.length > 0 ? { prefixes } : {}),
          items: objects.map(([k]) => resource(k, state.objects.get(k)!)),
          nextPageToken: ordered.length > pageItems.length
            ? pageItems[pageItems.length - 1][0]
            : undefined,
        });
      }
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
      state.options.onRecorded?.(entry);
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
  const server = Deno.serve(
    { port: 0, hostname: "127.0.0.1", onListen() {} },
    handler,
  );
  const { port } = server.addr as Deno.NetAddr;
  try {
    const endpoint = `http://127.0.0.1:${port}`;
    const gcs = new GcsClient({ bucket: "test-bucket", apiEndpoint: endpoint });
    await fn(gcs, state, endpoint);
  } finally {
    await server.shutdown();
  }
}

/**
 * Bytes a stalling relay forwards before it stops: enough for the request
 * headers, far short of a 16 MiB chunk.
 */
export const RELAY_FORWARD_BYTES = 256 * 1024;

/** A TCP relay in front of an emulator; see `startStallingRelay`. */
export interface StallingRelay {
  /** Base URL to send requests through the relay. */
  endpoint: string;
  /**
   * Resolves once the relay has forwarded its limit. Rejects if that takes
   * longer than 30 s, so a client that never sends its body fails the test
   * instead of hanging it.
   */
  stalled: Promise<void>;
  /** Closes every socket and waits for the relay to wind down. */
  close(): Promise<void>;
}

/**
 * Starts a TCP relay to `target` that forwards the first `limit` bytes a
 * client sends and drops the rest, passing every response byte back. When
 * the client disconnects, the relay closes its connection to the target, so
 * the target sees a request body that ends early. A test that aborts after
 * `stalled` thereby aborts mid-upload for certain: the target never receives
 * the body whole, however much of it the loopback had already buffered.
 */
export function startStallingRelay(
  target: string,
  limit = RELAY_FORWARD_BYTES,
): StallingRelay {
  const { hostname, port } = new URL(target);
  const listener = Deno.listen({ hostname: "127.0.0.1", port: 0 });
  const open = new Set<Deno.Conn>();
  const relays: Promise<void>[] = [];
  const shut = (conn: Deno.Conn) => {
    if (!open.delete(conn)) return;
    try {
      conn.close();
    } catch {
      // Already closed by the peer.
    }
  };
  const writeAll = async (conn: Deno.Conn, bytes: Uint8Array) => {
    for (let at = 0; at < bytes.length;) {
      at += await conn.write(bytes.subarray(at));
    }
  };

  let markStalled!: () => void;
  let timeout!: (error: Error) => void;
  const stalled = new Promise<void>((resolve, reject) => {
    markStalled = resolve;
    timeout = reject;
  });
  const deadline = setTimeout(
    () => timeout(new Error(`relay never forwarded ${limit} bytes`)),
    30_000,
  );
  stalled.then(() => clearTimeout(deadline), () => {});

  const relay = async (client: Deno.Conn) => {
    let upstream: Deno.Conn;
    try {
      upstream = await Deno.connect({ hostname, port: Number(port) });
    } catch {
      shut(client);
      return;
    }
    open.add(upstream);
    const forward = async () => {
      const buf = new Uint8Array(64 * 1024);
      let sent = 0;
      try {
        for (let n; (n = await client.read(buf)) !== null;) {
          if (sent >= limit) continue;
          const take = Math.min(n, limit - sent);
          await writeAll(upstream, buf.subarray(0, take));
          sent += take;
          if (sent >= limit) markStalled();
        }
      } catch {
        // The client reset the connection.
      }
      shut(upstream);
    };
    const back = async () => {
      const buf = new Uint8Array(64 * 1024);
      try {
        for (let n; (n = await upstream.read(buf)) !== null;) {
          await writeAll(client, buf.subarray(0, n));
        }
      } catch {
        // Either side went away.
      }
      shut(client);
    };
    await Promise.all([forward(), back()]);
  };

  const accepting = (async () => {
    try {
      for await (const client of listener) {
        open.add(client);
        relays.push(relay(client));
      }
    } catch {
      // The listener was closed.
    }
  })();

  return {
    endpoint: `http://127.0.0.1:${(listener.addr as Deno.NetAddr).port}`,
    stalled,
    close: async () => {
      clearTimeout(deadline);
      listener.close();
      for (const conn of [...open]) shut(conn);
      await accepting;
      await Promise.all(relays);
    },
  };
}

/**
 * Settles as `promise` does, or rejects with `message` after `ms`, so a test
 * waiting on an emulator event fails instead of hanging.
 */
export async function within<T>(
  promise: Promise<T>,
  ms: number,
  message: string,
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error(message)), ms);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}
