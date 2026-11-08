// Test-only in-memory fake of the namespaced object endpoints, for both the
// core group (/api/v1/namespaces/{ns}/{plural}[/{name}]) and named groups
// (/apis/{group}/{version}/namespaces/{ns}/{plural}[/{name}]). It mirrors the
// API server's Status responses: 404 on a missing object or an unserved
// group/version, 409 on create of an existing object or on a stale
// resourceVersion, 422 on a Secret type change. PATCH applies an RFC 7386
// JSON merge patch or an RFC 6902 JSON Patch. A strategic merge patch is
// applied as a merge patch: tests prove the Content-Type and body a model
// sends, not the API server's list-merge-by-key semantics.
//
// Beyond plain objects it serves the subresources and cluster-scoped
// endpoints the models call: serviceaccounts/{name}/token (TokenRequest),
// pods/{name}/log, namespaces/{name}, and SubjectAccessReview.

interface StoredObject {
  metadata: Record<string, unknown> & { resourceVersion: string };
  [key: string]: unknown;
}

export interface RecordedRequest {
  method: string;
  path: string;
  query: Record<string, string>;
  contentType?: string;
  body?: Record<string, unknown>;
}

export interface FakeApiServer {
  kubeconfig: string;
  requests: RecordedRequest[];
  /**
   * Keyed by `${plural}/${namespace}/${name}`, whatever the group/version;
   * the namespace is empty for cluster-scoped objects.
   */
  objects: Map<string, StoredObject>;
  /** Seed an object; returns the stored copy. */
  put(plural: string, obj: Record<string, unknown>): StoredObject;
  /** Simulate a concurrent writer bumping resourceVersion after each GET. */
  bumpAfterRead: boolean;
  /** `group/version` pairs that answer 404, as if the CRD did not serve them. */
  unserved: Set<string>;
  /** HTTP methods that answer 403, as if RBAC denied the verb. */
  forbidden: Set<string>;
  /** Path prefixes that answer 403 for every method. */
  forbiddenPaths: Set<string>;
  /** Pod log text keyed by `${namespace}/${pod}/${container}`. */
  logs: Map<string, string>;
  /** Longest token lifetime the fake issues, like the API server's cap. */
  maxTokenSeconds: number;
  /** Epoch ms that issued tokens count their expiry from. */
  tokenIssuedAt: number;
  /** Grants that SubjectAccessReview answers allowed for; all else denied. */
  grants: AccessGrant[];
  /** Set on SubjectAccessReview answers that no grant allows. */
  evaluationError: string;
  /** Answer denied: true (an explicit deny) when no grant allows. */
  explicitDeny: boolean;
  close(): Promise<void>;
}

export interface AccessGrant {
  user: string;
  verb: string;
  resource: string;
  group?: string;
  /** Omitted: the grant applies in every namespace and cluster-wide. */
  namespace?: string;
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
  /^\/(?:api\/v1|apis\/([^/]+)\/([^/]+))\/namespaces\/([^/]+)\/([^/]+)(?:\/([^/]+))?(?:\/([^/]+))?$/;
const NAMESPACE_ROUTE = /^\/api\/v1\/namespaces\/([^/]+)$/;
const SAR_PATH = "/apis/authorization.k8s.io/v1/subjectaccessreviews";

function decodePointer(path: string): string[] {
  if (path === "") return [];
  if (!path.startsWith("/")) throw new Error(`bad JSON pointer ${path}`);
  return path.slice(1).split("/").map((t) =>
    t.replace(/~1/g, "/").replace(/~0/g, "~")
  );
}

function parentOf(doc: unknown, tokens: string[]): [unknown, string] {
  let cur = doc;
  for (const t of tokens.slice(0, -1)) {
    if (Array.isArray(cur)) cur = cur[Number(t)];
    else if (isObject(cur)) cur = cur[t];
    else throw new Error(`path not found at ${t}`);
    if (cur === undefined) throw new Error(`path not found at ${t}`);
  }
  return [cur, tokens[tokens.length - 1]];
}

function getAt(doc: unknown, tokens: string[]): unknown {
  let cur = doc;
  for (const t of tokens) {
    if (Array.isArray(cur)) cur = cur[Number(t)];
    else if (isObject(cur)) cur = cur[t];
    else return undefined;
  }
  return cur;
}

/** An RFC 6901 array index: digits, no leading zero. */
function arrayIndex(token: string): number {
  if (!/^(0|[1-9][0-9]*)$/.test(token)) {
    throw new Error(`bad array index ${token}`);
  }
  return Number(token);
}

function setAt(
  doc: unknown,
  tokens: string[],
  value: unknown,
  insert: boolean,
) {
  const [parent, key] = parentOf(doc, tokens);
  if (Array.isArray(parent)) {
    const i = key === "-" ? parent.length : arrayIndex(key);
    // add may append at length; replace needs an existing element.
    if (i > parent.length || (!insert && i >= parent.length)) {
      throw new Error(`index ${key} out of range`);
    }
    if (insert) parent.splice(i, 0, value);
    else parent[i] = value;
  } else if (isObject(parent)) {
    if (!insert && !(key in parent)) throw new Error(`no value at ${key}`);
    parent[key] = value;
  } else {
    throw new Error(`cannot set ${key}`);
  }
}

function removeAt(doc: unknown, tokens: string[]): unknown {
  const [parent, key] = parentOf(doc, tokens);
  if (Array.isArray(parent)) {
    const i = arrayIndex(key);
    if (i >= parent.length) throw new Error(`index ${key} out of range`);
    return parent.splice(i, 1)[0];
  }
  if (isObject(parent) && key in parent) {
    const v = parent[key];
    delete parent[key];
    return v;
  }
  throw new Error(`no value at ${key}`);
}

interface JsonPatchOp {
  op: string;
  path: string;
  value?: unknown;
  from?: string;
}

/** RFC 6902. Throws on a failed test or a missing path. */
function jsonPatch(target: unknown, ops: JsonPatchOp[]): unknown {
  const doc = structuredClone(target);
  for (const op of ops) {
    const tokens = decodePointer(op.path);
    switch (op.op) {
      case "add":
        setAt(doc, tokens, structuredClone(op.value), true);
        break;
      case "replace":
        setAt(doc, tokens, structuredClone(op.value), false);
        break;
      case "remove":
        removeAt(doc, tokens);
        break;
      case "move":
        setAt(doc, tokens, removeAt(doc, decodePointer(op.from!)), true);
        break;
      case "copy":
        setAt(
          doc,
          tokens,
          structuredClone(getAt(doc, decodePointer(op.from!))),
          true,
        );
        break;
      case "test":
        if (
          JSON.stringify(getAt(doc, tokens)) !== JSON.stringify(op.value)
        ) {
          throw new Error(`test operation failed at ${op.path}`);
        }
        break;
      default:
        throw new Error(`unknown op ${op.op}`);
    }
  }
  return doc;
}

/** Split a label selector on the commas outside `in (...)` value lists. */
function selectorTerms(selector: string): string[] {
  const terms: string[] = [];
  let depth = 0;
  let cur = "";
  for (const ch of selector) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === "," && depth === 0) {
      terms.push(cur.trim());
      cur = "";
    } else {
      cur += ch;
    }
  }
  if (cur.trim()) terms.push(cur.trim());
  return terms;
}

/** Equality (`k=v`) and set-based (`k in (a,b)`, `k notin (a)`, `k`, `!k`). */
function matchesSelector(
  obj: StoredObject,
  selector: string | undefined,
): boolean {
  if (!selector) return true;
  const labels = (obj.metadata.labels ?? {}) as Record<string, string>;
  return selectorTerms(selector).every((term) => {
    const set = term.match(/^(\S+)\s+(in|notin)\s+\((.*)\)$/);
    if (set) {
      const values = set[3].split(",").map((v) => v.trim());
      const has = set[1] in labels && values.includes(labels[set[1]]);
      return set[2] === "in" ? has : !has;
    }
    if (term.startsWith("!")) return !(term.slice(1) in labels);
    if (!term.includes("=")) return term in labels;
    const [k, v] = term.split("=");
    return labels[k] === v;
  });
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
          meta.creationTimestamp ?? "2026-01-01T00:00:00Z",
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
    forbiddenPaths: new Set(),
    logs: new Map(),
    maxTokenSeconds: 48 * 3600,
    tokenIssuedAt: Date.UTC(2026, 0, 1),
    grants: [],
    evaluationError: "",
    explicitDeny: false,
    put(plural, obj) {
      const meta = obj.metadata as { name: string; namespace?: string };
      return store(`${plural}/${meta.namespace ?? ""}/${meta.name}`, obj);
    },
    close: () => Promise.resolve(),
  };

  function objectRequest(
    req: Request,
    body: Record<string, unknown> | undefined,
    plural: string,
    key: string,
  ): Response {
    const name = key.split("/").pop()!;
    const existing = objects.get(key);
    if (!existing) {
      // Like the real API server, only a missing object names itself in
      // details; an unserved group/version 404 carries no details.
      return status(404, "NotFound", `${plural} "${name}" not found`, {
        name,
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
      // Merge, strategic merge (applied as merge) and JSON Patch are
      // emulated; any other Content-Type answers 415.
      const contentType = req.headers.get("content-type");
      if (contentType === "application/json-patch+json") {
        try {
          const patched = jsonPatch(
            existing,
            body as unknown as JsonPatchOp[],
          ) as Record<string, unknown>;
          return Response.json(store(key, patched));
        } catch (err) {
          return status(422, "Invalid", (err as Error).message);
        }
      }
      if (
        contentType !== "application/merge-patch+json" &&
        contentType !== "application/strategic-merge-patch+json"
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

    if (req.method === "DELETE") {
      objects.delete(key);
      return Response.json({
        kind: "Status",
        apiVersion: "v1",
        metadata: {},
        status: "Success",
        details: { name, kind: plural },
      });
    }

    return status(405, "MethodNotAllowed", req.method);
  }

  function subresource(
    req: Request,
    body: Record<string, unknown> | undefined,
    query: Record<string, string>,
    plural: string,
    ns: string,
    name: string,
    sub: string,
  ): Response {
    const existing = objects.get(`${plural}/${ns}/${name}`);
    if (!existing) {
      return status(404, "NotFound", `${plural} "${name}" not found`, {
        name,
        kind: plural,
      });
    }
    if (
      plural === "serviceaccounts" && sub === "token" && req.method === "POST"
    ) {
      const spec = (body?.spec ?? {}) as {
        expirationSeconds?: number;
        audiences?: string[];
      };
      const seconds = Math.min(
        spec.expirationSeconds ?? 3600,
        fake.maxTokenSeconds,
      );
      return Response.json({
        kind: "TokenRequest",
        apiVersion: "authentication.k8s.io/v1",
        metadata: { name, namespace: ns },
        spec: {
          ...spec,
          // Like the API server, an empty list means its own audience.
          audiences: spec.audiences?.length
            ? spec.audiences
            : ["https://kubernetes.default.svc"],
        },
        status: {
          token: `fake-token-${ns}-${name}-${nextVersion++}`,
          expirationTimestamp: new Date(fake.tokenIssuedAt + seconds * 1000)
            .toISOString().replace(/\.\d{3}Z$/, "Z"),
        },
      }, { status: 201 });
    }
    if (plural === "pods" && sub === "log" && req.method === "GET") {
      const containers = ((existing.spec as { containers?: { name: string }[] })
        ?.containers ?? []).map((c) => c.name);
      const container = query.container ??
        (containers.length === 1 ? containers[0] : undefined);
      if (!container) {
        return status(
          400,
          "BadRequest",
          `a container name must be specified for pod ${name}, choose one of: [${
            containers.join(" ")
          }]`,
        );
      }
      if (!containers.includes(container)) {
        return status(
          400,
          "BadRequest",
          `container ${container} is not valid for pod ${name}`,
        );
      }
      let text = fake.logs.get(`${ns}/${name}/${container}`) ?? "";
      if (query.tailLines) {
        const lines = text.split("\n").filter((l) => l !== "");
        text = lines.slice(-Number(query.tailLines)).join("\n");
      }
      return new Response(text, { headers: { "content-type": "text/plain" } });
    }
    return status(404, "NotFound", `no subresource ${plural}/${sub}`);
  }

  function subjectAccessReview(body: Record<string, unknown>): Response {
    const spec = body.spec as {
      user: string;
      groups?: string[];
      resourceAttributes: {
        verb: string;
        resource: string;
        group?: string;
        namespace?: string;
      };
    };
    const ra = spec.resourceAttributes;
    const grant = fake.grants.find((g) =>
      g.user === spec.user && g.verb === ra.verb &&
      g.resource === ra.resource && (g.group ?? "") === (ra.group ?? "") &&
      (g.namespace === undefined || g.namespace === ra.namespace)
    );
    return Response.json({
      ...body,
      status: grant ? { allowed: true, reason: "granted by fake" } : {
        allowed: false,
        reason: "no fake grant",
        ...(fake.explicitDeny && { denied: true }),
        ...(fake.evaluationError &&
          { evaluationError: fake.evaluationError }),
      },
    }, { status: 201 });
  }

  const server = Deno.serve(
    { hostname: "127.0.0.1", port: 0, onListen() {} },
    async (req) => {
      const url = new URL(req.url);
      const body = ["POST", "PUT", "PATCH"].includes(req.method)
        ? await req.json() as Record<string, unknown>
        : undefined;
      const query = Object.fromEntries(url.searchParams);
      requests.push({
        method: req.method,
        path: url.pathname,
        query,
        contentType: req.headers.get("content-type") ?? undefined,
        body,
      });

      for (const prefix of fake.forbiddenPaths) {
        if (url.pathname.startsWith(prefix)) {
          return status(403, "Forbidden", `${url.pathname} is forbidden`);
        }
      }

      if (url.pathname === SAR_PATH && req.method === "POST") {
        return subjectAccessReview(body!);
      }

      const nsMatch = url.pathname.match(NAMESPACE_ROUTE);
      if (nsMatch) {
        return objectRequest(
          req,
          body,
          "namespaces",
          `namespaces//${nsMatch[1]}`,
        );
      }

      const m = url.pathname.match(ROUTE);
      if (!m) return status(404, "NotFound", `no route ${url.pathname}`);
      const [, group, version, ns, plural, pathName, sub] = m;

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
          .filter(([k, v]) =>
            k.startsWith(prefix) && matchesSelector(v, query.labelSelector)
          )
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
      if (sub) return subresource(req, body, query, plural, ns, pathName!, sub);
      return objectRequest(req, body, plural, key);
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
