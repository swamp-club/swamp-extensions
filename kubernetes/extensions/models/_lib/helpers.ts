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

  const coreApi = kc.makeApiClient(k8s.CoreV1Api);
  const appsApi = kc.makeApiClient(k8s.AppsV1Api);
  const batchApi = kc.makeApiClient(k8s.BatchV1Api);
  const networkingApi = kc.makeApiClient(k8s.NetworkingV1Api);
  const autoscalingApi = kc.makeApiClient(k8s.AutoscalingV2Api);
  const rbacApi = kc.makeApiClient(k8s.RbacAuthorizationV1Api);
  const metricsClient = new k8s.Metrics(kc);

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
