import { z } from "npm:zod@4.3.6";
import type { V1Secret } from "npm:@kubernetes/client-node@1.4.0";
import {
  buildClient,
  type DataHandle,
  fromBase64,
  isNotFound,
  type K8sContext,
  K8sGlobalArgsSchema,
  normalizeMeta,
  sanitizeInstanceName,
  toBase64,
} from "./_lib/helpers.ts";

// --- Schemas ---

const SecretListSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  uid: z.string(),
  type: z.string(),
  dataKeys: z.array(z.string()),
  labels: z.record(z.string(), z.string()),
  annotations: z.record(z.string(), z.string()),
  createdAt: z.string(),
  resourceVersion: z.string().optional(),
  action: z.enum(["created", "updated", "unchanged"]).optional(),
}).passthrough();

const SecretSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  uid: z.string(),
  type: z.string(),
  data: z.record(z.string(), z.string()).meta({ sensitive: true }),
  dataKeys: z.array(z.string()),
  labels: z.record(z.string(), z.string()),
  annotations: z.record(z.string(), z.string()),
  createdAt: z.string(),
}).passthrough();

// --- Method Arg Schemas ---

const ListArgsSchema = z.object({ namespace: z.string().optional() });
const GetArgsSchema = z.object({
  secretName: z.string(),
  namespace: z.string().optional(),
});
const CreateArgsSchema = z.object({
  secretName: z.string(),
  data: z.record(z.string(), z.string()),
  type: z.string().default("Opaque"),
  labels: z.record(z.string(), z.string()).optional(),
  namespace: z.string().optional(),
});
const UpdateArgsSchema = z.object({
  secretName: z.string(),
  data: z.record(z.string(), z.string()),
  namespace: z.string().optional(),
});
const GetMetaArgsSchema = z.object({
  secretName: z.string(),
  namespace: z.string().optional(),
});
const EnsureArgsSchema = z.object({
  secretName: z.string(),
  data: z.record(z.string(), z.string()),
  // Only checked against an existing Secret when given; Opaque on create.
  type: z.string().optional(),
  labels: z.record(z.string(), z.string()).optional(),
  prune: z.boolean().default(false),
  namespace: z.string().optional(),
});
const DeleteArgsSchema = z.object({
  secretName: z.string(),
  namespace: z.string().optional(),
});

// --- Helpers ---

function decodeSecretData(raw: V1Secret) {
  const decoded: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw.data || {})) {
    try {
      decoded[key] = fromBase64(value);
    } catch {
      decoded[key] = String(value);
    }
  }
  return decoded;
}

function normalizeSecretMeta(raw: V1Secret) {
  const meta = normalizeMeta(raw);
  return {
    ...meta,
    type: raw.type || "Opaque",
    dataKeys: Object.keys(raw.data || {}),
    resourceVersion: raw.metadata?.resourceVersion ?? "",
  };
}

function encodeSecretData(data: Record<string, string>) {
  const encoded: Record<string, string> = {};
  for (const [key, value] of Object.entries(data)) {
    encoded[key] = toBase64(value);
  }
  return encoded;
}

function sameRecord(a: Record<string, string>, b: Record<string, string>) {
  const aKeys = Object.keys(a);
  return aKeys.length === Object.keys(b).length &&
    aKeys.every((key) => Object.hasOwn(b, key) && a[key] === b[key]);
}

// --- Model ---

/** Kubernetes Secret model. */
export const model = {
  type: "@swamp/kubernetes/secret",
  version: "2026.10.20.1",
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
    {
      toVersion: "2026.06.05.1",
      description: "Enrich TLS errors with cluster context and kubeconfig " +
        "guidance when certificate verification fails.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.10.1",
      description: "Version bump to republish with correct upgrade chain. " +
        "No code, schema, or behavior change.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.01.1",
      description: "Bump @kubernetes/client-node from 1.0.0 to 1.4.0 and " +
        "add statefulset model type. No schema or behavior change.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.20.1",
      description: "Add ensure (idempotent create-or-update) and getMeta " +
        "(metadata-only read) methods. secretMeta gains optional " +
        "resourceVersion and action fields.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  resources: {
    secretMeta: {
      description: "Secret metadata with type and data key names (no content)",
      schema: SecretListSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    secret: {
      description:
        "Secret with decoded data values (sensitive, stored in vault)",
      schema: SecretSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    list: {
      description:
        "List all secrets in the namespace showing type and data keys (not content)",
      arguments: ListArgsSchema,
      execute: async (
        args: z.infer<typeof ListArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;
        const labels = context.globalArgs.labels;

        const resp = await coreApi.listNamespacedSecret({
          namespace: ns,
          labelSelector: labels,
        });
        const secrets = resp.items || [];

        context.logger.info("Found {count} secrets in {ns}", {
          count: secrets.length,
          ns,
        });

        const handles: DataHandle[] = [];
        for (const sec of secrets) {
          const normalized = normalizeSecretMeta(sec);
          const handle = await context.writeResource(
            "secretMeta",
            sanitizeInstanceName(normalized.name),
            normalized,
          );
          handles.push(handle);
        }
        return { dataHandles: handles };
      },
    },

    get: {
      description:
        "Get a secret with decoded data values (sensitive, stored in vault)",
      arguments: GetArgsSchema,
      execute: async (
        args: z.infer<typeof GetArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const sec = await coreApi.readNamespacedSecret({
          name: args.secretName,
          namespace: ns,
        });
        const meta = normalizeMeta(sec);
        const decoded = decodeSecretData(sec);

        const normalized = {
          ...meta,
          type: sec.type || "Opaque",
          data: decoded,
          dataKeys: Object.keys(decoded),
        };

        const handle = await context.writeResource(
          "secret",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    getMeta: {
      description:
        "Get a secret's metadata, type and data key names without its values",
      arguments: GetMetaArgsSchema,
      execute: async (
        args: z.infer<typeof GetMetaArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const sec = await coreApi.readNamespacedSecret({
          name: args.secretName,
          namespace: ns,
        });
        const normalized = normalizeSecretMeta(sec);

        const handle = await context.writeResource(
          "secretMeta",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    ensure: {
      description:
        "Create the secret if absent, otherwise replace it only when data or labels differ (values are never stored)",
      arguments: EnsureArgsSchema,
      execute: async (
        args: z.infer<typeof EnsureArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;
        const desiredData = encodeSecretData(args.data);

        let current: V1Secret | undefined;
        try {
          current = await coreApi.readNamespacedSecret({
            name: args.secretName,
            namespace: ns,
          });
        } catch (err: unknown) {
          if (!isNotFound(err)) throw err;
        }

        let result: V1Secret;
        let action: "created" | "updated" | "unchanged";
        if (!current) {
          result = await coreApi.createNamespacedSecret({
            namespace: ns,
            body: {
              metadata: {
                name: args.secretName,
                namespace: ns,
                ...(args.labels && { labels: args.labels }),
              },
              type: args.type ?? "Opaque",
              data: desiredData,
            },
          });
          action = "created";
        } else {
          const currentType = current.type || "Opaque";
          if (args.type !== undefined && currentType !== args.type) {
            throw new Error(
              `Secret ${ns}/${args.secretName} has type "${currentType}" ` +
                `but "${args.type}" was requested; a Secret's type is ` +
                `immutable, so delete and recreate it to change the type`,
            );
          }

          // Compare in base64 form: decoding is lossy for binary values.
          const currentData = current.data || {};
          const nextData = args.prune
            ? desiredData
            : { ...currentData, ...desiredData };
          const currentLabels = current.metadata?.labels || {};
          const nextLabels = { ...currentLabels, ...args.labels };

          if (
            sameRecord(currentData, nextData) &&
            sameRecord(currentLabels, nextLabels)
          ) {
            result = current;
            action = "unchanged";
          } else {
            // The read object keeps metadata.resourceVersion, so a
            // concurrent writer makes this replace fail with a 409.
            current.data = nextData;
            current.metadata = { ...current.metadata, labels: nextLabels };
            result = await coreApi.replaceNamespacedSecret({
              name: args.secretName,
              namespace: ns,
              body: current,
            });
            action = "updated";
          }
        }

        context.logger.info("Ensured secret {name} in {ns}: {action}", {
          name: args.secretName,
          ns,
          action,
        });

        const normalized = { ...normalizeSecretMeta(result), action };
        const handle = await context.writeResource(
          "secretMeta",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    create: {
      description:
        "Create a secret from key-value data pairs (values will be base64-encoded)",
      arguments: CreateArgsSchema,
      execute: async (
        args: z.infer<typeof CreateArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        // Base64-encode the data values
        const encodedData: Record<string, string> = {};
        for (const [key, value] of Object.entries(args.data)) {
          encodedData[key] = toBase64(value);
        }

        const body = {
          metadata: {
            name: args.secretName,
            namespace: ns,
            ...(args.labels && { labels: args.labels }),
          },
          type: args.type,
          data: encodedData,
        };

        const created = await coreApi.createNamespacedSecret({
          namespace: ns,
          body,
        });
        const meta = normalizeMeta(created);
        const decoded = decodeSecretData(created);

        context.logger.info("Created secret {name} in {ns}", {
          name: args.secretName,
          ns,
        });

        const handle = await context.writeResource(
          "secret",
          sanitizeInstanceName(meta.name),
          {
            ...meta,
            type: created.type || "Opaque",
            data: decoded,
            dataKeys: Object.keys(decoded),
          },
        );
        return { dataHandles: [handle] };
      },
    },

    update: {
      description:
        "Merge new keys into an existing secret via read-then-replace (values will be base64-encoded)",
      arguments: UpdateArgsSchema,
      execute: async (
        args: z.infer<typeof UpdateArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const current = await coreApi.readNamespacedSecret({
          name: args.secretName,
          namespace: ns,
        });

        // Merge new base64-encoded values
        const existingData = current.data || {};
        for (const [key, value] of Object.entries(args.data)) {
          existingData[key] = toBase64(value);
        }
        current.data = existingData;

        const replaced = await coreApi.replaceNamespacedSecret({
          name: args.secretName,
          namespace: ns,
          body: current,
        });
        const meta = normalizeMeta(replaced);
        const decoded = decodeSecretData(replaced);

        context.logger.info("Updated secret {name} in {ns}", {
          name: args.secretName,
          ns,
        });

        const handle = await context.writeResource(
          "secret",
          sanitizeInstanceName(meta.name),
          {
            ...meta,
            type: replaced.type || "Opaque",
            data: decoded,
            dataKeys: Object.keys(decoded),
          },
        );
        return { dataHandles: [handle] };
      },
    },

    delete: {
      description: "Delete a secret",
      arguments: DeleteArgsSchema,
      execute: async (
        args: z.infer<typeof DeleteArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        await coreApi.deleteNamespacedSecret({
          name: args.secretName,
          namespace: ns,
        });

        context.logger.info("Deleted secret {name} in {ns}", {
          name: args.secretName,
          ns,
        });
        return { dataHandles: [] };
      },
    },
  },
};
