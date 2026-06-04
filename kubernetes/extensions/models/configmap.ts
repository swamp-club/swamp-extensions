import { z } from "npm:zod@4.3.6";
import type { V1ConfigMap } from "npm:@kubernetes/client-node@1.0.0";
import {
  buildClient,
  type DataHandle,
  type K8sContext,
  K8sGlobalArgsSchema,
  normalizeMeta,
  sanitizeInstanceName,
} from "./_lib/helpers.ts";

// --- Schemas ---

const ConfigMapSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  uid: z.string(),
  data: z.record(z.string(), z.string()),
  dataKeys: z.array(z.string()),
  labels: z.record(z.string(), z.string()),
  annotations: z.record(z.string(), z.string()),
  createdAt: z.string(),
}).passthrough();

// --- Method Arg Schemas ---

const ListArgsSchema = z.object({ namespace: z.string().optional() });
const GetArgsSchema = z.object({
  configMapName: z.string(),
  namespace: z.string().optional(),
});
const CreateArgsSchema = z.object({
  configMapName: z.string(),
  data: z.record(z.string(), z.string()),
  labels: z.record(z.string(), z.string()).optional(),
  namespace: z.string().optional(),
});
const UpdateArgsSchema = z.object({
  configMapName: z.string(),
  data: z.record(z.string(), z.string()),
  namespace: z.string().optional(),
});
const DeleteArgsSchema = z.object({
  configMapName: z.string(),
  namespace: z.string().optional(),
});

// --- Helpers ---

function normalizeConfigMap(raw: V1ConfigMap) {
  const meta = normalizeMeta(raw);

  return {
    ...meta,
    data: raw.data || {},
    dataKeys: Object.keys(raw.data || {}),
  };
}

// --- Model ---

/** Kubernetes ConfigMap model. */
export const model = {
  type: "@swamp/kubernetes/configmap",
  version: "2026.06.04.2",
  globalArguments: K8sGlobalArgsSchema,
  upgrades: [
    {
      toVersion: "2026.05.27.2",
      description:
        "Version bump for extension-wide security fix in pod exec method",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.04.1",
      description: "Copyright and branding update to Elder Swamp Club, Inc. " +
        "No code, schema, or behavior change.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.04.2",
      description: "Version bump to publish missing upgrade entries from " +
        "2026.06.04.1. No code, schema, or behavior change.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  resources: {
    configmap: {
      description:
        "ConfigMap with key-value data, data keys list, labels, and annotations",
      schema: ConfigMapSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    list: {
      description: "List all configmaps in the configured namespace",
      arguments: ListArgsSchema,
      execute: async (
        args: z.infer<typeof ListArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;
        const labels = context.globalArgs.labels;

        const resp = await coreApi.listNamespacedConfigMap({
          namespace: ns,
          labelSelector: labels,
        });
        const configmaps = resp.items || [];

        context.logger.info("Found {count} configmaps in {ns}", {
          count: configmaps.length,
          ns,
        });

        const handles: DataHandle[] = [];
        for (const cm of configmaps) {
          const normalized = normalizeConfigMap(cm);
          const handle = await context.writeResource(
            "configmap",
            sanitizeInstanceName(normalized.name),
            normalized,
          );
          handles.push(handle);
        }
        return { dataHandles: handles };
      },
    },

    get: {
      description: "Get a single configmap's data and metadata",
      arguments: GetArgsSchema,
      execute: async (
        args: z.infer<typeof GetArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const cm = await coreApi.readNamespacedConfigMap({
          name: args.configMapName,
          namespace: ns,
        });
        const normalized = normalizeConfigMap(cm);

        const handle = await context.writeResource(
          "configmap",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    create: {
      description:
        "Create a configmap from key-value data pairs with optional labels",
      arguments: CreateArgsSchema,
      execute: async (
        args: z.infer<typeof CreateArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const body = {
          metadata: {
            name: args.configMapName,
            namespace: ns,
            ...(args.labels && { labels: args.labels }),
          },
          data: args.data,
        };

        const created = await coreApi.createNamespacedConfigMap({
          namespace: ns,
          body,
        });
        const normalized = normalizeConfigMap(created);

        context.logger.info("Created configmap {name} in {ns}", {
          name: args.configMapName,
          ns,
        });

        const handle = await context.writeResource(
          "configmap",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    update: {
      description:
        "Merge new keys into an existing configmap via read-then-replace",
      arguments: UpdateArgsSchema,
      execute: async (
        args: z.infer<typeof UpdateArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const current = await coreApi.readNamespacedConfigMap({
          name: args.configMapName,
          namespace: ns,
        });
        current.data = { ...(current.data || {}), ...args.data };

        const replaced = await coreApi.replaceNamespacedConfigMap({
          name: args.configMapName,
          namespace: ns,
          body: current,
        });
        const normalized = normalizeConfigMap(replaced);

        context.logger.info("Updated configmap {name} in {ns}", {
          name: args.configMapName,
          ns,
        });

        const handle = await context.writeResource(
          "configmap",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    delete: {
      description: "Delete a configmap",
      arguments: DeleteArgsSchema,
      execute: async (
        args: z.infer<typeof DeleteArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        await coreApi.deleteNamespacedConfigMap({
          name: args.configMapName,
          namespace: ns,
        });

        context.logger.info("Deleted configmap {name} in {ns}", {
          name: args.configMapName,
          ns,
        });
        return { dataHandles: [] };
      },
    },
  },
};
