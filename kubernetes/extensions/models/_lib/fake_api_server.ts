// Test-only in-memory fake of the core/v1 namespaced object endpoints
// (GET/POST/PUT /api/v1/namespaces/{ns}/{plural}[/{name}]). It mirrors the
// API server's Status responses: 404 on a missing object, 409 on create of an
// existing object or on a stale resourceVersion, 422 on a Secret type change.

interface StoredObject {
  metadata: Record<string, unknown> & { resourceVersion: string };
  [key: string]: unknown;
}

export interface RecordedRequest {
  method: string;
  path: string;
  body?: Record<string, unknown>;
}

export interface FakeApiServer {
  kubeconfig: string;
  requests: RecordedRequest[];
  objects: Map<string, StoredObject>;
  /** Seed an object; returns the stored copy. */
  put(plural: string, obj: Record<string, unknown>): StoredObject;
  /** Simulate a concurrent writer bumping resourceVersion after each GET. */
  bumpAfterRead: boolean;
  close(): Promise<void>;
}

function status(code: number, reason: string, message: string): Response {
  return Response.json(
    {
      kind: "Status",
      apiVersion: "v1",
      metadata: {},
      status: "Failure",
      message,
      reason,
      code,
    },
    { status: code },
  );
}

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
      const body = req.method === "POST" || req.method === "PUT"
        ? await req.json() as Record<string, unknown>
        : undefined;
      requests.push({ method: req.method, path: url.pathname, body });

      const m = url.pathname.match(
        /^\/api\/v1\/namespaces\/([^/]+)\/([^/]+)(?:\/([^/]+))?$/,
      );
      if (!m) return status(404, "NotFound", `no route ${url.pathname}`);
      const [, ns, plural, pathName] = m;

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
        return status(404, "NotFound", `${plural} "${pathName}" not found`);
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
