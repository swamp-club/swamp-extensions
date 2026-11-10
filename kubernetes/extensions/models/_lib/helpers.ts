import { z } from "npm:zod@4.6.7";
import * as k8s from "npm:@kubernetes/client-node@2.0.1";
import process from "node:process";
import type { AgentOptions } from "node:https";
import { isIP } from "node:net";
import { checkServerIdentity, type PeerCertificate } from "node:tls";

// Suppress MaxListeners warning — @kubernetes/client-node registers multiple
// listeners per API client, which is expected across 17 model types.
process.setMaxListeners(32);

// Shared global arguments for all @swamp/kubernetes/* models
export const K8sGlobalArgsSchema = z.object({
  namespace: z.string().default("default"),
  context: z.string().optional(),
  kubeconfig: z.string().optional(),
  labels: z.string().optional(),
});

export type K8sGlobalArgs = z.infer<typeof K8sGlobalArgsSchema>;

export interface DataHandle {
  name: string;
}

interface Logger {
  info(msg: string, props?: Record<string, unknown>): void;
  warning(msg: string, props?: Record<string, unknown>): void;
  error(msg: string, props?: Record<string, unknown>): void;
}

export interface K8sContext {
  globalArgs: K8sGlobalArgs;
  logger: Logger;
  writeResource(
    specName: string,
    instanceName: string,
    data: Record<string, unknown>,
    overrides?: { lifetime?: string },
  ): Promise<DataHandle>;
  deleteResource?(instanceName: string): Promise<void>;
  readModelData?(
    modelName: string,
    specName?: string,
  ): Promise<{ name: string }[]>;
  createFileWriter(
    specName: string,
    instanceName: string,
  ): { writeText(text: string): Promise<DataHandle> };
}

export function toBase64(value: string): string {
  return btoa(
    Array.from(new TextEncoder().encode(value), (b) => String.fromCharCode(b))
      .join(""),
  );
}

export function fromBase64(value: string): string {
  return new TextDecoder().decode(
    Uint8Array.from(atob(value), (c) => c.charCodeAt(0)),
  );
}

// Schema for kubeconfig context info
export const ContextInfoSchema = z.object({
  name: z.string(),
  cluster: z.string(),
  user: z.string(),
  namespace: z.string(),
  isCurrentContext: z.boolean(),
}).passthrough();

const TLS_ERROR_PATTERNS = [
  "self-signed certificate",
  "unable to verify the first certificate",
  "certificate has expired",
  "CERT_HAS_EXPIRED",
  "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
  "DEPTH_ZERO_SELF_SIGNED_CERT",
  "ERR_TLS_CERT_ALTNAME_INVALID",
];

// client-node 2.x sends requests with undici fetch, which reports every
// network failure as TypeError "fetch failed" and puts the real error (TLS,
// connection refused, DNS) in cause. The chain is short; the bound only
// guards against a pathological or cyclic cause.
const MAX_CAUSE_DEPTH = 5;
const FETCH_FAILED = "fetch failed";

function causeChain(err: unknown): unknown[] {
  const chain: unknown[] = [];
  let current: unknown = err;
  while (
    current !== undefined && current !== null &&
    chain.length < MAX_CAUSE_DEPTH && !chain.includes(current)
  ) {
    chain.push(current);
    current = current instanceof Error ? current.cause : undefined;
  }
  return chain;
}

function messageOf(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

/** Every distinct message in the cause chain, outermost first. */
function describeError(err: unknown): string {
  const messages: string[] = [];
  for (const e of causeChain(err)) {
    const msg = messageOf(e);
    if (msg && !messages.includes(msg)) messages.push(msg);
  }
  return messages.join(": ");
}

function isTlsError(err: unknown): boolean {
  return causeChain(err).some((e) => {
    const msg = messageOf(e);
    const code = e instanceof Error ? (e as { code?: unknown }).code : "";
    return TLS_ERROR_PATTERNS.some((p) => msg.includes(p) || code === p);
  });
}

/** A bare "fetch failed" whose cause says what actually went wrong. */
function isOpaqueFetchError(err: unknown): boolean {
  return err instanceof Error && err.message === FETCH_FAILED &&
    err.cause !== undefined;
}

/**
 * A KubeConfig that accepts an IP address as the cluster's tls-server-name,
 * as kubectl does. client-node passes tls-server-name to TLS as servername,
 * which Node refuses for an IP because SNI carries host names only. For an IP
 * this drops servername and checks the server certificate against that IP's
 * SAN instead. A DNS name is passed through unchanged. Without servername, TLS
 * falls back to the server URL's host for SNI: none when it is an IP (the
 * tunnel case), the host name when it is one. client-node's SOCKS connector
 * passes that host as servername itself; for an IP Node ignores it with a
 * warning. Either way the certificate is checked against the configured IP.
 *
 * In client-node 2.x every typed API client and the Metrics client build their
 * connection through createDispatcherOptions, so this one override covers
 * every model. client-node's WebSocket path (exec, attach, port-forward) sets
 * servername elsewhere and is not covered; no model uses it — pod exec shells
 * out to kubectl.
 */
class IpServerNameKubeConfig extends k8s.KubeConfig {
  override createDispatcherOptions(
    cluster: k8s.Cluster | null,
    agentOptions: AgentOptions,
  ): ReturnType<k8s.KubeConfig["createDispatcherOptions"]> {
    const serverName = agentOptions.servername;
    if (typeof serverName !== "string" || isIP(serverName) === 0) {
      return super.createDispatcherOptions(cluster, agentOptions);
    }
    const { servername: _ip, ...withoutServerName } = agentOptions;
    const options = super.createDispatcherOptions(cluster, withoutServerName);
    const verifyIp = (_host: string, cert: PeerCertificate) =>
      checkServerIdentity(serverName, cert);
    switch (options.type) {
      case "agent":
        options.connect = { ...options.connect, checkServerIdentity: verifyIp };
        return options;
      case "none":
        // servername was the only TLS option (a publicly trusted cert, no
        // client cert), so client-node would fall back to the default
        // dispatcher and check the cert against the server's host instead.
        // Build the agent it would have built, with its keep-alive settings.
        return {
          type: "agent",
          connect: {
            checkServerIdentity: verifyIp,
            keepAlive: true,
            keepAliveInitialDelay: 30000,
          },
        };
      default:
        options.requestTls = {
          ...options.requestTls,
          checkServerIdentity: verifyIp,
        };
        return options;
    }
  }
}

function wrapApiClient<T extends object>(
  client: T,
  clusterInfo: { server: string; context: string },
): T {
  const wrappedMethods = new Map<string | symbol, unknown>();
  return new Proxy(client, {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);
      if (typeof value !== "function") return value;
      if (wrappedMethods.has(prop)) return wrappedMethods.get(prop);
      const wrapped = (...args: unknown[]) => {
        const result = value.apply(target, args);
        if (result instanceof Promise) {
          return result.catch((err: unknown) => {
            if (isTlsError(err)) {
              const orig = describeError(err);
              throw new Error(
                `TLS verification failed for cluster "${clusterInfo.context}" ` +
                  `(${clusterInfo.server}): ${orig}. ` +
                  `Your kubeconfig credentials may be stale — the cluster CA ` +
                  `may have rotated (e.g. cluster reprovisioned). Verify with: ` +
                  `kubectl cluster-info --context "${clusterInfo.context}"`,
                { cause: err },
              );
            }
            if (isOpaqueFetchError(err)) {
              throw new Error(describeError(err), { cause: err });
            }
            throw err;
          });
        }
        return result;
      };
      wrappedMethods.set(prop, wrapped);
      return wrapped;
    },
  });
}

export function buildClient(globalArgs: K8sGlobalArgs) {
  const kc = new IpServerNameKubeConfig();

  if (globalArgs.kubeconfig) {
    kc.loadFromFile(globalArgs.kubeconfig);
  } else {
    kc.loadFromDefault();
  }

  if (globalArgs.context) {
    kc.setCurrentContext(globalArgs.context);
  }

  const currentContext = kc.getCurrentContext();
  const cluster = kc.getCurrentCluster();
  const clusterInfo = {
    server: cluster?.server ?? "unknown",
    context: currentContext ?? "unknown",
  };

  const coreApi = wrapApiClient(
    kc.makeApiClient(k8s.CoreV1Api),
    clusterInfo,
  );
  const appsApi = wrapApiClient(
    kc.makeApiClient(k8s.AppsV1Api),
    clusterInfo,
  );
  const batchApi = wrapApiClient(
    kc.makeApiClient(k8s.BatchV1Api),
    clusterInfo,
  );
  const networkingApi = wrapApiClient(
    kc.makeApiClient(k8s.NetworkingV1Api),
    clusterInfo,
  );
  const autoscalingApi = wrapApiClient(
    kc.makeApiClient(k8s.AutoscalingV2Api),
    clusterInfo,
  );
  const rbacApi = wrapApiClient(
    kc.makeApiClient(k8s.RbacAuthorizationV1Api),
    clusterInfo,
  );
  const authorizationApi = wrapApiClient(
    kc.makeApiClient(k8s.AuthorizationV1Api),
    clusterInfo,
  );
  const customApi = wrapApiClient(
    kc.makeApiClient(k8s.CustomObjectsApi),
    clusterInfo,
  );
  const metricsClient = wrapApiClient(
    new k8s.Metrics(kc),
    clusterInfo,
  );

  return {
    kc,
    coreApi,
    appsApi,
    batchApi,
    networkingApi,
    autoscalingApi,
    rbacApi,
    authorizationApi,
    customApi,
    metricsClient,
  };
}

// kubectl apply copies the whole object into this annotation, so for a Secret
// it holds the values in plain text. It is never written to swamp data.
const LAST_APPLIED_ANNOTATION =
  "kubectl.kubernetes.io/last-applied-configuration";

export function normalizeMeta(raw: { metadata?: k8s.V1ObjectMeta }) {
  const meta = raw.metadata ?? {};
  const { [LAST_APPLIED_ANNOTATION]: _lastApplied, ...annotations } =
    meta.annotations ?? {};
  return {
    name: meta.name ?? "",
    namespace: meta.namespace ?? "",
    uid: meta.uid ?? "",
    labels: meta.labels ?? {},
    annotations,
    createdAt: meta.creationTimestamp
      ? new Date(meta.creationTimestamp).toISOString()
      : "",
  };
}

/**
 * True when err is a Kubernetes API 404. @kubernetes/client-node 1.x reports
 * the HTTP status on ApiException.code; a legacy statusCode is also accepted.
 */
export function isNotFound(err: unknown): boolean {
  if (typeof err !== "object" || err === null) return false;
  const e = err as { code?: unknown; statusCode?: unknown };
  return e.code === 404 || e.statusCode === 404;
}

export function sanitizeInstanceName(name: string) {
  return name
    .replace(/\.\./g, "--")
    .replace(/[/\\]/g, "-")
    .replace(/\0/g, "");
}

export function listKubeContexts(kc: k8s.KubeConfig) {
  const currentContext = kc.getCurrentContext();
  return kc.getContexts().map((ctx) => {
    const cluster = kc.getCluster(ctx.cluster);
    const user = kc.getUser(ctx.user);
    return {
      name: ctx.name,
      cluster: cluster?.name || ctx.cluster || "",
      user: user?.name || ctx.user || "",
      namespace: ctx.namespace || "default",
      isCurrentContext: ctx.name === currentContext,
    };
  });
}

// --- Generic patch ---

const JsonPatchOpSchema = z.object({
  op: z.enum(["add", "remove", "replace", "move", "copy", "test"]),
  path: z.string(),
  value: z.unknown().optional(),
  from: z.string().optional(),
});

/** JSON text becomes its value; anything else, or invalid JSON, is unchanged. */
function parseJsonText(value: unknown): unknown {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

/**
 * Argument fields shared by every model's patch method. Merge and strategic
 * patches take an object; a JSON Patch takes an array of RFC 6902 operations.
 * Wrap the model's schema with refinePatchArgs so the shapes are checked.
 */
export const PatchFields = {
  patchType: z.enum(["merge", "strategic", "json"]).default("merge")
    .describe(
      "merge (RFC 7386), strategic (Kubernetes strategic merge patch, " +
        "merges lists by key such as containers by name) or json " +
        "(RFC 6902 operations)",
    ),
  // The CLI parses --input JSON only for plain object and array fields, so a
  // union arrives as a string: accept JSON text and parse it here.
  patch: z.preprocess(
    parseJsonText,
    z.union([
      z.record(z.string(), z.unknown()),
      z.array(JsonPatchOpSchema).min(1),
    ]),
  ).describe(
    "The patch body: an object for merge and strategic, an array of " +
      "operations for json",
  ),
};

export type PatchType = "merge" | "strategic" | "json";

export function refinePatchArgs<
  T extends z.ZodType<{ patchType: PatchType; patch: unknown }>,
>(schema: T): T {
  return schema.superRefine((args, ctx) => {
    const isOps = Array.isArray(args.patch);
    if (args.patchType === "json" && !isOps) {
      ctx.addIssue({
        code: "custom",
        path: ["patch"],
        message: "patchType json needs an array of JSON Patch operations",
      });
    } else if (args.patchType !== "json" && isOps) {
      ctx.addIssue({
        code: "custom",
        path: ["patch"],
        message:
          `patchType ${args.patchType} needs an object; use patchType json ` +
          "for an array of operations",
      });
    }
  }) as unknown as T;
}

const PATCH_CONTENT_TYPES: Record<PatchType, k8s.PatchStrategy> = {
  merge: k8s.PatchStrategy.MergePatch,
  strategic: k8s.PatchStrategy.StrategicMergePatch,
  json: k8s.PatchStrategy.JsonPatch,
};

/**
 * Request options that set the patch Content-Type. client-node defaults
 * every patch to JSON Patch, so a patch call must always pass these.
 */
export function patchOptions(patchType: PatchType) {
  return k8s.setHeaderOptions("Content-Type", PATCH_CONTENT_TYPES[patchType]);
}

/** The API server's Status message from a client-node ApiException. */
export function apiErrorMessage(err: unknown): string {
  let body = (err as { body?: unknown }).body;
  if (typeof body === "string") {
    const text = body;
    try {
      body = JSON.parse(text);
    } catch {
      return text;
    }
  }
  if (
    typeof body === "object" && body !== null &&
    typeof (body as { message?: unknown }).message === "string"
  ) {
    return (body as { message: string }).message;
  }
  return err instanceof Error ? err.message : String(err);
}

/** The HTTP status of a client-node ApiException, if err is one. */
export function apiErrorCode(err: unknown): number | undefined {
  if (typeof err !== "object" || err === null) return undefined;
  const code = (err as { code?: unknown }).code;
  return typeof code === "number" ? code : undefined;
}

/** Attempts retryOnConflict makes before it lets a 409 through. */
export const CONFLICT_ATTEMPTS = 5;

/**
 * Run a read-modify-replace again when the replace answers 409 Conflict.
 *
 * A replace sends the resourceVersion it read, so the API server refuses it
 * when anyone wrote the object in between: a controller updating a
 * Deployment's or StatefulSet's status, the kubelet updating its Node. attempt
 * must do the read as well as the replace, so each retry applies the change
 * to the object as it now is. Any other error, and a 409 on the last attempt,
 * is thrown as it came.
 */
export async function retryOnConflict<T>(
  attempt: () => Promise<T>,
  attempts = CONFLICT_ATTEMPTS,
): Promise<T> {
  for (let i = 1;; i++) {
    try {
      return await attempt();
    } catch (err: unknown) {
      if (apiErrorCode(err) !== 409 || i >= attempts) throw err;
      await new Promise((resolve) => setTimeout(resolve, 50 * i));
    }
  }
}

/**
 * Describe the object a call targets, for error messages: `Deployment
 * "web" in namespace "default"`, or without a namespace when cluster-scoped.
 */
export function describeTarget(
  kind: string,
  name: string,
  namespace?: string,
): string {
  return namespace
    ? `${kind} "${name}" in namespace "${namespace}"`
    : `${kind} "${name}"`;
}

/**
 * Run a call against one named object, turning API errors into messages that
 * name the object: a 404 says it was not found, anything else carries the
 * API server's own reason.
 */
export async function callForObject<T>(
  action: string,
  target: string,
  call: () => Promise<T>,
): Promise<T> {
  try {
    return await call();
  } catch (err) {
    const code = apiErrorCode(err);
    if (code === undefined) throw err;
    if (code === 404) {
      throw new Error(`${target} not found`, { cause: err });
    }
    throw new Error(
      `${action} ${target} failed (HTTP ${code}): ${apiErrorMessage(err)}`,
      { cause: err },
    );
  }
}
