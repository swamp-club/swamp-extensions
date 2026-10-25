// Test-only in-memory fake of the namespaced object endpoints, for both the
// core group (/api/v1/namespaces/{ns}/{plural}[/{name}]) and named groups
// (/apis/{group}/{version}/namespaces/{ns}/{plural}[/{name}]). It mirrors the
// API server's Status responses: 404 on a missing object or an unserved
// group/version, 409 on create of an existing object or on a stale
// resourceVersion, 422 on a Secret type change. PATCH applies an RFC 7386
// JSON merge patch.

interface StoredObject {
  metadata: Record<string, unknown> & { resourceVersion: string };
  [key: string]: unknown;
}

export interface RecordedRequest {
  method: string;
  path: string;
  contentType?: string;
  body?: Record<string, unknown>;
}

export interface FakeApiServer {
  kubeconfig: string;
  requests: RecordedRequest[];
  /** Keyed by `${plural}/${namespace}/${name}`, whatever the group/version. */
  objects: Map<string, StoredObject>;
  /** Seed an object; returns the stored copy. */
  put(plural: string, obj: Record<string, unknown>): StoredObject;
  /** Simulate a concurrent writer bumping resourceVersion after each GET. */
  bumpAfterRead: boolean;
  /** `group/version` pairs that answer 404, as if the CRD did not serve them. */
  unserved: Set<string>;
  /** HTTP methods that answer 403, as if RBAC denied the verb. */
  forbidden: Set<string>;
  close(): Promise<void>;
}

function status(
  code: number,
  reason: string,
  message: string,
  details?: Record<string, string>,
): Response {
  return Response.json(
    {
      kind: "Status",
      apiVersion: "v1",
      metadata: {},
      status: "Failure",
      message,
      reason,
      ...(details && { details }),
      code,
    },
    { status: code },
  );
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function mergePatch(target: unknown, patch: unknown): unknown {
  if (!isObject(patch)) return patch;
  const out: Record<string, unknown> = isObject(target) ? { ...target } : {};
  for (const [k, v] of Object.entries(patch)) {
    if (v === null) delete out[k];
    else out[k] = mergePatch(out[k], v);
  }
  return out;
}

const ROUTE =
  /^\/(?:api\/v1|apis\/([^/]+)\/([^/]+))\/namespaces\/([^/]+)\/([^/]+)(?:\/([^/]+))?$/;

export async function startFakeApiServer(): Promise<FakeApiServer> {
  const objects = new Map<string, StoredObject>();
  const requests: RecordedRequest[] = [];
  let nextVersion = 1;

  const store = (key: string, obj: Record<string, unknown>) => {
    const meta = (obj.metadata ?? {}) as Record<string, unknown>;
    const prev = objects.get(key);
    const stored: StoredObject = {
      ...obj,
      metadata: {
        ...meta,
        uid: prev?.metadata.uid ?? crypto.randomUUID(),
        creationTimestamp: prev?.metadata.creationTimestamp ??
          "2026-01-01T00:00:00Z",
        resourceVersion: String(nextVersion++),
      },
    };
    objects.set(key, stored);
    return stored;
  };

  const fake: FakeApiServer = {
    kubeconfig: "",
    requests,
    objects,
    bumpAfterRead: false,
    unserved: new Set(),
    forbidden: new Set(),
    put(plural, obj) {
      const meta = obj.metadata as { name: string; namespace: string };
      return store(`${plural}/${meta.namespace}/${meta.name}`, obj);
    },
    close: () => Promise.resolve(),
  };

  const server = Deno.serve(
    { hostname: "127.0.0.1", port: 0, onListen() {} },
    async (req) => {
      const url = new URL(req.url);
      const body = ["POST", "PUT", "PATCH"].includes(req.method)
        ? await req.json() as Record<string, unknown>
        : undefined;
      requests.push({
        method: req.method,
        path: url.pathname,
        contentType: req.headers.get("content-type") ?? undefined,
        body,
      });

      const m = url.pathname.match(ROUTE);
      if (!m) return status(404, "NotFound", `no route ${url.pathname}`);
      const [, group, version, ns, plural, pathName] = m;

      if (group && fake.unserved.has(`${group}/${version}`)) {
        return status(
          404,
          "NotFound",
          "the server could not find the requested resource",
        );
      }
      if (fake.forbidden.has(req.method)) {
        return status(403, "Forbidden", `${plural} is forbidden`);
      }

      if (req.method === "GET" && !pathName) {
        const prefix = `${plural}/${ns}/`;
        const items = [...objects.entries()]
          .filter(([k]) => k.startsWith(prefix))
          .map(([, v]) => structuredClone(v));
        return Response.json({ kind: "List", metadata: {}, items });
      }

      if (req.method === "POST" && !pathName) {
        const name = (body?.metadata as { name: string }).name;
        const key = `${plural}/${ns}/${name}`;
        if (objects.has(key)) {
          return status(409, "AlreadyExists", `${plural} "${name}" exists`);
        }
        return Response.json(store(key, body!), { status: 201 });
      }

      const key = `${plural}/${ns}/${pathName}`;
      const existing = objects.get(key);
      if (!existing) {
        // Like the real API server, only a missing object names itself in
        // details; an unserved group/version 404 carries no details.
        return status(404, "NotFound", `${plural} "${pathName}" not found`, {
          name: pathName,
          kind: plural,
        });
      }

      if (req.method === "GET") {
        const snapshot = structuredClone(existing);
        if (fake.bumpAfterRead) store(key, existing);
        return Response.json(snapshot);
      }

      if (req.method === "PUT") {
        const meta = body!.metadata as { resourceVersion?: string };
        if (
          meta.resourceVersion &&
          meta.resourceVersion !== existing.metadata.resourceVersion
        ) {
          return status(
            409,
            "Conflict",
            "the object has been modified; please apply your changes " +
              "to the latest version and try again",
          );
        }
        if (
          plural === "secrets" && (body!.type ?? "Opaque") !==
            (existing.type ?? "Opaque")
        ) {
          return status(422, "Invalid", "type: field is immutable");
        }
        return Response.json(store(key, body!));
      }

      if (req.method === "PATCH") {
        // Only merge patch is emulated. A model that sends JSON Patch or
        // strategic merge patch needs this extended first; the 415 also
        // catches a regression to client-node's JSON Patch default.
        if (
          req.headers.get("content-type") !== "application/merge-patch+json"
        ) {
          return status(
            415,
            "UnsupportedMediaType",
            `fake only supports merge patch, got ${
              req.headers.get("content-type")
            }`,
          );
        }
        const patched = mergePatch(existing, body) as Record<string, unknown>;
        return Response.json(store(key, patched));
      }

      return status(405, "MethodNotAllowed", req.method);
    },
  );

  const kubeconfig = await Deno.makeTempFile({ suffix: ".json" });
  await Deno.writeTextFile(
    kubeconfig,
    JSON.stringify({
      apiVersion: "v1",
      kind: "Config",
      clusters: [{
        name: "fake",
        // client-node only allows plain HTTP with TLS verification off.
        cluster: {
          server: `http://127.0.0.1:${server.addr.port}`,
          "insecure-skip-tls-verify": true,
        },
      }],
      users: [{ name: "fake", user: {} }],
      contexts: [{ name: "fake", context: { cluster: "fake", user: "fake" } }],
      "current-context": "fake",
    }),
  );

  fake.kubeconfig = kubeconfig;
  fake.close = async () => {
    try {
      await Deno.remove(kubeconfig);
    } finally {
      await server.shutdown();
    }
  };
  return fake;
}
