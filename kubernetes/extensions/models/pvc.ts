import { z } from "npm:zod@4.3.6";
import type {
  V1PersistentVolume,
  V1PersistentVolumeClaim,
} from "npm:@kubernetes/client-node@1.0.0";
import {
  buildClient,
  type DataHandle,
  type K8sContext,
  K8sGlobalArgsSchema,
  normalizeMeta,
  sanitizeInstanceName,
} from "./_lib/helpers.ts";

// --- Schemas ---

const PvcSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  uid: z.string(),
  phase: z.string(),
  storageClassName: z.string(),
  volumeName: z.string(),
  requestedStorage: z.string(),
  capacityStorage: z.string(),
  accessModes: z.array(z.string()),
  volumeMode: z.string(),
  labels: z.record(z.string(), z.string()),
  annotations: z.record(z.string(), z.string()),
  createdAt: z.string(),
}).passthrough();

const PvSchema = z.object({
  name: z.string(),
  uid: z.string(),
  phase: z.string(),
  storageClassName: z.string(),
  capacity: z.string(),
  accessModes: z.array(z.string()),
  reclaimPolicy: z.string(),
  volumeMode: z.string(),
  claimRef: z.string(),
  source: z.string(),
  createdAt: z.string(),
}).passthrough();

// --- Method Arg Schemas ---

const ListArgsSchema = z.object({ namespace: z.string().optional() });
const GetArgsSchema = z.object({
  pvcName: z.string(),
  namespace: z.string().optional(),
});
const CreateArgsSchema = z.object({
  pvcName: z.string(),
  storageClassName: z.string(),
  storage: z.string(),
  accessModes: z.array(z.string()).default(["ReadWriteOnce"]),
  namespace: z.string().optional(),
});
const DeleteArgsSchema = z.object({
  pvcName: z.string(),
  namespace: z.string().optional(),
});
const ListVolumesArgsSchema = z.object({});

// --- Helpers ---

function normalizePvc(raw: V1PersistentVolumeClaim) {
  const meta = normalizeMeta(raw);

  return {
    ...meta,
    phase: raw.status?.phase || "Pending",
    storageClassName: raw.spec?.storageClassName || "",
    volumeName: raw.spec?.volumeName || "",
    requestedStorage: raw.spec?.resources?.requests?.storage || "",
    capacityStorage: raw.status?.capacity?.storage || "",
    accessModes: raw.spec?.accessModes || [],
    volumeMode: raw.spec?.volumeMode || "Filesystem",
  };
}

function normalizePv(raw: V1PersistentVolume) {
  const meta = normalizeMeta(raw);

  // Determine volume source type
  let source = "unknown";
  if (raw.spec?.hostPath) source = `hostPath:${raw.spec.hostPath.path}`;
  else if (raw.spec?.nfs) {
    source = `nfs:${raw.spec.nfs.server}:${raw.spec.nfs.path}`;
  } else if (raw.spec?.csi) source = `csi:${raw.spec.csi.driver}`;
  else if (raw.spec?.local) source = `local:${raw.spec.local.path}`;
  else if (raw.spec?.awsElasticBlockStore) {
    source = `ebs:${raw.spec.awsElasticBlockStore.volumeID}`;
  } else if (raw.spec?.gcePersistentDisk) {
    source = `gce-pd:${raw.spec.gcePersistentDisk.pdName}`;
  }

  return {
    name: meta.name,
    uid: meta.uid,
    phase: raw.status?.phase || "Available",
    storageClassName: raw.spec?.storageClassName || "",
    capacity: raw.spec?.capacity?.storage || "",
    accessModes: raw.spec?.accessModes || [],
    reclaimPolicy: raw.spec?.persistentVolumeReclaimPolicy || "Retain",
    volumeMode: raw.spec?.volumeMode || "Filesystem",
    claimRef: raw.spec?.claimRef?.name
      ? `${raw.spec.claimRef.namespace}/${raw.spec.claimRef.name}`
      : "",
    source,
    labels: meta.labels,
    annotations: meta.annotations,
    createdAt: meta.createdAt,
  };
}

// --- Model ---

/** Kubernetes PersistentVolumeClaim model. */
export const model = {
  type: "@swamp/kubernetes/pvc",
  version: "2026.06.05.1",
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
  ],
  resources: {
    pvc: {
      description:
        "PersistentVolumeClaim with phase, storage class, capacity, access modes, and bound volume",
      schema: PvcSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    pv: {
      description:
        "PersistentVolume with phase, capacity, reclaim policy, and volume source",
      schema: PvSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    list: {
      description:
        "List all PersistentVolumeClaims in the namespace with binding status, storage class, and capacity",
      arguments: ListArgsSchema,
      execute: async (
        args: z.infer<typeof ListArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;
        const labels = context.globalArgs.labels;

        const resp = await coreApi.listNamespacedPersistentVolumeClaim({
          namespace: ns,
          labelSelector: labels,
        });
        const pvcs = resp.items || [];

        context.logger.info("Found {count} PVCs in {ns}", {
          count: pvcs.length,
          ns,
        });

        const handles: DataHandle[] = [];
        for (const pvc of pvcs) {
          const normalized = normalizePvc(pvc);
          const handle = await context.writeResource(
            "pvc",
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
        "Get a PVC's binding status, storage class, requested vs actual capacity, and access modes",
      arguments: GetArgsSchema,
      execute: async (
        args: z.infer<typeof GetArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const pvc = await coreApi.readNamespacedPersistentVolumeClaim({
          name: args.pvcName,
          namespace: ns,
        });
        const normalized = normalizePvc(pvc);

        const handle = await context.writeResource(
          "pvc",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    create: {
      description:
        "Create a PVC with storage class, access mode, and requested capacity",
      arguments: CreateArgsSchema,
      execute: async (
        args: z.infer<typeof CreateArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const body = {
          metadata: { name: args.pvcName, namespace: ns },
          spec: {
            storageClassName: args.storageClassName,
            accessModes: args.accessModes,
            resources: { requests: { storage: args.storage } },
          },
        };

        const created = await coreApi.createNamespacedPersistentVolumeClaim({
          namespace: ns,
          body,
        });
        const normalized = normalizePvc(created);

        context.logger.info("Created PVC {name} in {ns}", {
          name: args.pvcName,
          ns,
        });

        const handle = await context.writeResource(
          "pvc",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    delete: {
      description: "Delete a PersistentVolumeClaim",
      arguments: DeleteArgsSchema,
      execute: async (
        args: z.infer<typeof DeleteArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        await coreApi.deleteNamespacedPersistentVolumeClaim({
          name: args.pvcName,
          namespace: ns,
        });

        context.logger.info("Deleted PVC {name} in {ns}", {
          name: args.pvcName,
          ns,
        });
        return { dataHandles: [] };
      },
    },

    listVolumes: {
      description:
        "List all PersistentVolumes in the cluster with phase, capacity, reclaim policy, and source",
      arguments: ListVolumesArgsSchema,
      execute: async (
        _args: Record<string, never>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(context.globalArgs);

        const resp = await coreApi.listPersistentVolume();
        const pvs = resp.items || [];

        context.logger.info("Found {count} PersistentVolumes", {
          count: pvs.length,
        });

        const handles: DataHandle[] = [];
        for (const pv of pvs) {
          const normalized = normalizePv(pv);
          const handle = await context.writeResource(
            "pv",
            sanitizeInstanceName(normalized.name),
            normalized,
          );
          handles.push(handle);
        }
        return { dataHandles: handles };
      },
    },
  },
};
