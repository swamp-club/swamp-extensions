import { z } from "npm:zod@4.3.6";
import * as k8s from "npm:@kubernetes/client-node@1.0.0";
import process from "node:process";

// Suppress MaxListeners warning — @kubernetes/client-node registers multiple
// listeners per API client, which is expected across 15 model types.
process.setMaxListeners(30);

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
  ): Promise<DataHandle>;
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

function isTlsError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return TLS_ERROR_PATTERNS.some((p) => msg.includes(p));
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
              const orig = err instanceof Error ? err.message : String(err);
              throw new Error(
                `TLS verification failed for cluster "${clusterInfo.context}" ` +
                  `(${clusterInfo.server}): ${orig}. ` +
                  `Your kubeconfig credentials may be stale — the cluster CA ` +
                  `may have rotated (e.g. cluster reprovisioned). Verify with: ` +
                  `kubectl cluster-info --context "${clusterInfo.context}"`,
                { cause: err },
              );
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
  const kc = new k8s.KubeConfig();

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
    metricsClient,
  };
}

export function normalizeMeta(raw: { metadata?: k8s.V1ObjectMeta }) {
  const meta = raw.metadata ?? {};
  return {
    name: meta.name ?? "",
    namespace: meta.namespace ?? "",
    uid: meta.uid ?? "",
    labels: meta.labels ?? {},
    annotations: meta.annotations ?? {},
    createdAt: meta.creationTimestamp
      ? new Date(meta.creationTimestamp).toISOString()
      : "",
  };
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
