import { z } from "npm:zod@4.6.7";
import {
  PatchStrategy,
  setHeaderOptions,
  type V1ObjectMeta,
} from "npm:@kubernetes/client-node@1.4.0";
import {
  buildClient,
  type DataHandle,
  isNotFound,
  type K8sContext,
  K8sGlobalArgsSchema,
  normalizeMeta,
  sanitizeInstanceName,
} from "./_lib/helpers.ts";

const GROUP = "external-secrets.io";
const PLURAL = "externalsecrets";
const FORCE_SYNC_ANNOTATION = "force-sync";
const VERSIONS = ["v1", "v1beta1"] as const;

// --- Schemas ---

const ExternalSecretSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  uid: z.string(),
  apiVersion: z.string(),
  secretStoreName: z.string(),
  secretStoreKind: z.string(),
  targetSecretName: z.string(),
  refreshInterval: z.string(),
  forceSyncValue: z.string(),
  ready: z.string(),
  readyReason: z.string(),
  readyMessage: z.string(),
  refreshTime: z.string(),
  syncedResourceVersion: z.string(),
  labels: z.record(z.string(), z.string()),
  annotations: z.record(z.string(), z.string()),
  createdAt: z.string(),
}).passthrough();

// --- Method Arg Schemas ---

const ApiVersionSchema = z.enum(VERSIONS).optional().describe(
  "external-secrets.io API version. Omit to try v1, then v1beta1.",
);

const ListArgsSchema = z.object({
  namespace: z.string().optional(),
  apiVersion: ApiVersionSchema,
});
const GetArgsSchema = z.object({
  externalSecretName: z.string(),
  namespace: z.string().optional(),
  apiVersion: ApiVersionSchema,
});
const ForceSyncArgsSchema = z.object({
  externalSecretName: z.string(),
  namespace: z.string().optional(),
  apiVersion: ApiVersionSchema,
});

// --- Helpers ---

interface RawExternalSecret {
  apiVersion?: string;
  // Custom objects are not deserialized, so creationTimestamp arrives as a
  // string; normalizeMeta passes it through new Date() either way.
  metadata?: V1ObjectMeta;
  spec?: {
    secretStoreRef?: { name?: string; kind?: string };
    target?: { name?: string };
    refreshInterval?: string;
  };
  status?: {
    refreshTime?: string;
    syncedResourceVersion?: string;
    conditions?: {
      type?: string;
      status?: string;
      reason?: string;
      message?: string;
    }[];
  };
}

function normalizeExternalSecret(raw: RawExternalSecret) {
  const meta = normalizeMeta(raw);
  const ready = (raw.status?.conditions ?? []).find((c) => c.type === "Ready");
  return {
    ...meta,
    apiVersion: raw.apiVersion ?? "",
    secretStoreName: raw.spec?.secretStoreRef?.name ?? "",
    secretStoreKind: raw.spec?.secretStoreRef?.kind ?? "SecretStore",
    targetSecretName: raw.spec?.target?.name || meta.name,
    refreshInterval: raw.spec?.refreshInterval ?? "",
    forceSyncValue: meta.annotations[FORCE_SYNC_ANNOTATION] ?? "",
    ready: ready?.status ?? "Unknown",
    readyReason: ready?.reason ?? "",
    readyMessage: ready?.message ?? "",
    refreshTime: raw.status?.refreshTime ?? "",
    syncedResourceVersion: raw.status?.syncedResourceVersion ?? "",
  };
}

/**
 * Run call against the requested version, or, when none is given, against
 * v1 and then v1beta1 on a 404. The API server answers 404 both for an
 * unserved version and for a missing object, so the two are not told apart:
 * if every version 404s, the v1 error is rethrown.
 */
async function withVersion<T>(
  pinned: typeof VERSIONS[number] | undefined,
  call: (version: string) => Promise<T>,
): Promise<T> {
  if (pinned) return await call(pinned);
  let firstErr: unknown;
  for (const version of VERSIONS) {
    try {
      return await call(version);
    } catch (err) {
      if (!isNotFound(err)) throw err;
      firstErr ??= err;
    }
  }
  throw firstErr;
}

// --- Model ---

export const model = {
  type: "@swamp/kubernetes/externalsecret",
  version: "2026.10.25.1",
  globalArguments: K8sGlobalArgsSchema,
  upgrades: [],
  resources: {
    externalSecret: {
      description:
        "External Secrets Operator ExternalSecret: store reference, target Secret, refresh interval, force-sync value, and Ready status. Never holds secret values.",
      schema: ExternalSecretSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    list: {
      description:
        "List ExternalSecrets in the configured namespace with store reference, target Secret, and sync status",
      arguments: ListArgsSchema,
      execute: async (
        args: z.infer<typeof ListArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { customApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const resp = await withVersion(
          args.apiVersion,
          (version) =>
            customApi.listNamespacedCustomObject({
              group: GROUP,
              version,
              namespace: ns,
              plural: PLURAL,
              labelSelector: context.globalArgs.labels,
            }),
        ) as { items?: RawExternalSecret[] };
        const items = resp.items ?? [];

        context.logger.info("Found {count} ExternalSecrets in {ns}", {
          count: items.length,
          ns,
        });

        const handles: DataHandle[] = [];
        for (const item of items) {
          const normalized = normalizeExternalSecret(item);
          handles.push(
            await context.writeResource(
              "externalSecret",
              sanitizeInstanceName(normalized.name),
              normalized,
            ),
          );
        }
        return { dataHandles: handles };
      },
    },

    get: {
      description:
        "Get an ExternalSecret's store reference, target Secret, refresh interval, and Ready status",
      arguments: GetArgsSchema,
      execute: async (
        args: z.infer<typeof GetArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { customApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const raw = await withVersion(
          args.apiVersion,
          (version) =>
            customApi.getNamespacedCustomObject({
              group: GROUP,
              version,
              namespace: ns,
              plural: PLURAL,
              name: args.externalSecretName,
            }),
        ) as RawExternalSecret;
        const normalized = normalizeExternalSecret(raw);

        const handle = await context.writeResource(
          "externalSecret",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    forceSync: {
      description:
        "Ask External Secrets Operator to resync now by setting the force-sync annotation to the current time. Does not wait for the sync; use get to check refreshTime and Ready.",
      arguments: ForceSyncArgsSchema,
      execute: async (
        args: z.infer<typeof ForceSyncArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { customApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;
        const value = new Date().toISOString();

        // A merge patch touches only this annotation, so there is no
        // read-modify-write race with the controller's status updates.
        // client-node defaults custom-object patches to JSON Patch.
        const raw = await withVersion(
          args.apiVersion,
          (version) =>
            customApi.patchNamespacedCustomObject(
              {
                group: GROUP,
                version,
                namespace: ns,
                plural: PLURAL,
                name: args.externalSecretName,
                body: {
                  metadata: {
                    annotations: { [FORCE_SYNC_ANNOTATION]: value },
                  },
                },
              },
              setHeaderOptions("Content-Type", PatchStrategy.MergePatch),
            ),
        ) as RawExternalSecret;
        const normalized = normalizeExternalSecret(raw);

        context.logger.info(
          "Requested resync of ExternalSecret {name} in {ns} (force-sync={value})",
          { name: args.externalSecretName, ns, value },
        );

        const handle = await context.writeResource(
          "externalSecret",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },
  },
};
