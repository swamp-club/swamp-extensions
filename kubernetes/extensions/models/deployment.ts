import { z } from "npm:zod@4.3.6";
import type {
  V1Container,
  V1Deployment,
  V1ReplicaSet,
  V1Volume,
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

const ContainerSchema = z.object({
  name: z.string(),
  image: z.string(),
  ports: z.array(z.object({
    containerPort: z.number(),
    protocol: z.string(),
  })),
  env: z.array(z.object({
    name: z.string(),
    value: z.string(),
  })),
  requestsCpu: z.string(),
  requestsMemory: z.string(),
  limitsCpu: z.string(),
  limitsMemory: z.string(),
  volumeMounts: z.array(z.object({
    name: z.string(),
    mountPath: z.string(),
    readOnly: z.boolean(),
  })),
  runAsNonRoot: z.boolean(),
  readOnlyRootFilesystem: z.boolean(),
  runAsUser: z.number(),
});

const VolumeSchema = z.object({
  name: z.string(),
  kind: z.string(),
  source: z.string(),
});

const DeploymentSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  uid: z.string(),
  replicas: z.number(),
  readyReplicas: z.number(),
  updatedReplicas: z.number(),
  availableReplicas: z.number(),
  strategyType: z.string(),
  maxUnavailable: z.string(),
  maxSurge: z.string(),
  conditions: z.array(z.object({
    type: z.string(),
    status: z.string(),
    reason: z.string(),
    message: z.string(),
    lastTransitionTime: z.string(),
  })),
  containers: z.array(ContainerSchema),
  volumes: z.array(VolumeSchema),
  podTemplateLabels: z.record(z.string(), z.string()),
  selector: z.record(z.string(), z.string()),
  labels: z.record(z.string(), z.string()),
  annotations: z.record(z.string(), z.string()),
  createdAt: z.string(),
}).passthrough();

const ReplicaSetSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  uid: z.string(),
  replicas: z.number(),
  readyReplicas: z.number(),
  ownerDeployment: z.string(),
  revision: z.string(),
  labels: z.record(z.string(), z.string()),
  createdAt: z.string(),
}).passthrough();

// --- Method Arg Schemas ---

const ListArgsSchema = z.object({ namespace: z.string().optional() });
const GetArgsSchema = z.object({
  deploymentName: z.string(),
  namespace: z.string().optional(),
});
const CreateArgsSchema = z.object({
  deploymentName: z.string(),
  image: z.string().optional(),
  replicas: z.number().default(1),
  spec: z.record(z.string(), z.unknown()).optional(),
  namespace: z.string().optional(),
});
const UpdateArgsSchema = z.object({
  deploymentName: z.string(),
  image: z.string().optional(),
  replicas: z.number().optional(),
  namespace: z.string().optional(),
});
const DeleteArgsSchema = z.object({
  deploymentName: z.string(),
  namespace: z.string().optional(),
});
const ScaleArgsSchema = z.object({
  deploymentName: z.string(),
  replicas: z.number(),
  namespace: z.string().optional(),
});
const RestartArgsSchema = z.object({
  deploymentName: z.string(),
  namespace: z.string().optional(),
});
const PauseArgsSchema = z.object({
  deploymentName: z.string(),
  namespace: z.string().optional(),
});
const ResumeArgsSchema = z.object({
  deploymentName: z.string(),
  namespace: z.string().optional(),
});
const GetRolloutStatusArgsSchema = z.object({
  deploymentName: z.string(),
  namespace: z.string().optional(),
});
const GetReplicaSetsArgsSchema = z.object({
  deploymentName: z.string(),
  namespace: z.string().optional(),
});

// --- Helpers ---

function normalizeVolume(vol: V1Volume) {
  if (vol.configMap) {
    return {
      name: vol.name,
      kind: "configMap",
      source: vol.configMap.name || "",
    };
  }
  if (vol.secret) {
    return {
      name: vol.name,
      kind: "secret",
      source: vol.secret.secretName || "",
    };
  }
  if (vol.emptyDir) return { name: vol.name, kind: "emptyDir", source: "" };
  if (vol.persistentVolumeClaim) {
    return {
      name: vol.name,
      kind: "pvc",
      source: vol.persistentVolumeClaim.claimName || "",
    };
  }
  if (vol.hostPath) {
    return {
      name: vol.name,
      kind: "hostPath",
      source: vol.hostPath.path || "",
    };
  }
  return { name: vol.name, kind: "unknown", source: "" };
}

function normalizeContainer(c: V1Container) {
  return {
    name: c.name || "",
    image: c.image || "",
    ports: (c.ports || []).map((p) => ({
      containerPort: p.containerPort || 0,
      protocol: p.protocol || "TCP",
    })),
    env: (c.env || []).map((e) => ({
      name: e.name || "",
      value: e.value || (e.valueFrom ? JSON.stringify(e.valueFrom) : ""),
    })),
    requestsCpu: c.resources?.requests?.["cpu"] as string || "",
    requestsMemory: c.resources?.requests?.["memory"] as string || "",
    limitsCpu: c.resources?.limits?.["cpu"] as string || "",
    limitsMemory: c.resources?.limits?.["memory"] as string || "",
    volumeMounts: (c.volumeMounts || []).map((vm) => ({
      name: vm.name || "",
      mountPath: vm.mountPath || "",
      readOnly: vm.readOnly || false,
    })),
    runAsNonRoot: c.securityContext?.runAsNonRoot || false,
    readOnlyRootFilesystem: c.securityContext?.readOnlyRootFilesystem || false,
    runAsUser: c.securityContext?.runAsUser ?? -1,
  };
}

function normalizeDeployment(raw: V1Deployment) {
  const meta = normalizeMeta(raw);

  return {
    ...meta,
    replicas: raw.spec?.replicas ?? 0,
    readyReplicas: raw.status?.readyReplicas ?? 0,
    updatedReplicas: raw.status?.updatedReplicas ?? 0,
    availableReplicas: raw.status?.availableReplicas ?? 0,
    strategyType: raw.spec?.strategy?.type || "RollingUpdate",
    maxUnavailable: String(
      raw.spec?.strategy?.rollingUpdate?.maxUnavailable ?? "25%",
    ),
    maxSurge: String(raw.spec?.strategy?.rollingUpdate?.maxSurge ?? "25%"),
    conditions: (raw.status?.conditions || []).map((c) => ({
      type: c.type || "",
      status: c.status || "",
      reason: c.reason || "",
      message: c.message || "",
      lastTransitionTime: c.lastTransitionTime
        ? new Date(c.lastTransitionTime).toISOString()
        : "",
    })),
    containers: (raw.spec?.template?.spec?.containers || []).map(
      normalizeContainer,
    ),
    volumes: (raw.spec?.template?.spec?.volumes || []).map(normalizeVolume),
    podTemplateLabels: raw.spec?.template?.metadata?.labels || {},
    selector: raw.spec?.selector?.matchLabels || {},
  };
}

function normalizeReplicaSet(raw: V1ReplicaSet) {
  const meta = normalizeMeta(raw);
  const ownerRefs = raw.metadata?.ownerReferences || [];
  const deployOwner = ownerRefs.find((o) => o.kind === "Deployment");

  return {
    ...meta,
    replicas: raw.status?.replicas ?? 0,
    readyReplicas: raw.status?.readyReplicas ?? 0,
    ownerDeployment: deployOwner?.name || "",
    revision: meta.annotations["deployment.kubernetes.io/revision"] || "",
  };
}

// --- Model ---

/** Kubernetes Deployment model. */
export const model = {
  type: "@swamp/kubernetes/deployment",
  version: "2026.06.04.1",
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
  ],
  resources: {
    deployment: {
      description:
        "Deployment spec with replicas, strategy, containers, volumes, security contexts, and rollout conditions",
      schema: DeploymentSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    replicaSet: {
      description:
        "ReplicaSet showing replica counts, owner deployment, and revision number",
      schema: ReplicaSetSchema,
      lifetime: "1h",
      garbageCollection: 10,
    },
  },
  methods: {
    list: {
      description:
        "List all deployments in the configured namespace with replicas, strategy, containers, and conditions",
      arguments: ListArgsSchema,
      execute: async (
        args: z.infer<typeof ListArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { appsApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;
        const labels = context.globalArgs.labels;

        const resp = await appsApi.listNamespacedDeployment({
          namespace: ns,
          labelSelector: labels,
        });
        const deployments = resp.items || [];

        context.logger.info("Found {count} deployments in {ns}", {
          count: deployments.length,
          ns,
        });

        const handles: DataHandle[] = [];
        for (const dep of deployments) {
          const normalized = normalizeDeployment(dep);
          const handle = await context.writeResource(
            "deployment",
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
        "Get a deployment's full spec including containers, volumes, security contexts, and rollout conditions",
      arguments: GetArgsSchema,
      execute: async (
        args: z.infer<typeof GetArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { appsApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const dep = await appsApi.readNamespacedDeployment({
          name: args.deploymentName,
          namespace: ns,
        });
        const normalized = normalizeDeployment(dep);

        const handle = await context.writeResource(
          "deployment",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    create: {
      description:
        "Create a deployment from a container image or full spec object",
      arguments: CreateArgsSchema,
      execute: async (
        args: z.infer<typeof CreateArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { appsApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        let body;
        if (args.spec) {
          body = args.spec;
        } else if (args.image) {
          body = {
            metadata: { name: args.deploymentName, namespace: ns },
            spec: {
              replicas: args.replicas,
              selector: { matchLabels: { app: args.deploymentName } },
              template: {
                metadata: { labels: { app: args.deploymentName } },
                spec: {
                  containers: [{
                    name: args.deploymentName,
                    image: args.image,
                  }],
                },
              },
            },
          };
        } else {
          throw new Error("Either 'image' or 'spec' must be provided");
        }

        const created = await appsApi.createNamespacedDeployment({
          namespace: ns,
          body,
        });
        const normalized = normalizeDeployment(created);

        context.logger.info("Created deployment {name} in {ns}", {
          name: args.deploymentName,
          ns,
        });

        const handle = await context.writeResource(
          "deployment",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    update: {
      description:
        "Update a deployment's container image and/or replica count via read-then-replace",
      arguments: UpdateArgsSchema,
      execute: async (
        args: z.infer<typeof UpdateArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { appsApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const current = await appsApi.readNamespacedDeployment({
          name: args.deploymentName,
          namespace: ns,
        });

        if (args.replicas !== undefined) {
          current.spec!.replicas = args.replicas;
        }
        if (args.image && current.spec!.template!.spec!.containers.length > 0) {
          current.spec!.template!.spec!.containers[0].image = args.image;
        }

        const replaced = await appsApi.replaceNamespacedDeployment({
          name: args.deploymentName,
          namespace: ns,
          body: current,
        });
        const normalized = normalizeDeployment(replaced);

        context.logger.info("Updated deployment {name} in {ns}", {
          name: args.deploymentName,
          ns,
        });

        const handle = await context.writeResource(
          "deployment",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    delete: {
      description: "Delete a deployment",
      arguments: DeleteArgsSchema,
      execute: async (
        args: z.infer<typeof DeleteArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { appsApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        await appsApi.deleteNamespacedDeployment({
          name: args.deploymentName,
          namespace: ns,
        });

        context.logger.info("Deleted deployment {name} in {ns}", {
          name: args.deploymentName,
          ns,
        });
        return { dataHandles: [] };
      },
    },

    scale: {
      description: "Scale a deployment to the specified replica count",
      arguments: ScaleArgsSchema,
      execute: async (
        args: z.infer<typeof ScaleArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { appsApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const current = await appsApi.readNamespacedDeployment({
          name: args.deploymentName,
          namespace: ns,
        });
        current.spec!.replicas = args.replicas;

        const replaced = await appsApi.replaceNamespacedDeployment({
          name: args.deploymentName,
          namespace: ns,
          body: current,
        });
        const normalized = normalizeDeployment(replaced);

        context.logger.info("Scaled deployment {name} to {replicas} replicas", {
          name: args.deploymentName,
          replicas: args.replicas,
        });

        const handle = await context.writeResource(
          "deployment",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    restart: {
      description:
        "Trigger a rolling restart by setting the restartedAt annotation on the pod template",
      arguments: RestartArgsSchema,
      execute: async (
        args: z.infer<typeof RestartArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { appsApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const current = await appsApi.readNamespacedDeployment({
          name: args.deploymentName,
          namespace: ns,
        });

        if (!current.spec!.template!.metadata) {
          current.spec!.template!.metadata = {};
        }
        if (!current.spec!.template!.metadata.annotations) {
          current.spec!.template!.metadata.annotations = {};
        }
        current.spec!.template!.metadata
          .annotations!["kubectl.kubernetes.io/restartedAt"] = new Date()
            .toISOString();

        const replaced = await appsApi.replaceNamespacedDeployment({
          name: args.deploymentName,
          namespace: ns,
          body: current,
        });
        const normalized = normalizeDeployment(replaced);

        context.logger.info("Triggered rolling restart for deployment {name}", {
          name: args.deploymentName,
        });

        const handle = await context.writeResource(
          "deployment",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    pause: {
      description: "Pause a deployment's rollout by setting spec.paused = true",
      arguments: PauseArgsSchema,
      execute: async (
        args: z.infer<typeof PauseArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { appsApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const current = await appsApi.readNamespacedDeployment({
          name: args.deploymentName,
          namespace: ns,
        });
        current.spec!.paused = true;

        const replaced = await appsApi.replaceNamespacedDeployment({
          name: args.deploymentName,
          namespace: ns,
          body: current,
        });
        const normalized = normalizeDeployment(replaced);

        context.logger.info("Paused deployment {name}", {
          name: args.deploymentName,
        });

        const handle = await context.writeResource(
          "deployment",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    resume: {
      description:
        "Resume a paused deployment's rollout by setting spec.paused = false",
      arguments: ResumeArgsSchema,
      execute: async (
        args: z.infer<typeof ResumeArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { appsApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const current = await appsApi.readNamespacedDeployment({
          name: args.deploymentName,
          namespace: ns,
        });
        current.spec!.paused = false;

        const replaced = await appsApi.replaceNamespacedDeployment({
          name: args.deploymentName,
          namespace: ns,
          body: current,
        });
        const normalized = normalizeDeployment(replaced);

        context.logger.info("Resumed deployment {name}", {
          name: args.deploymentName,
        });

        const handle = await context.writeResource(
          "deployment",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    getRolloutStatus: {
      description:
        "Get a deployment's rollout status with Available, Progressing, and ReplicaFailure conditions",
      arguments: GetRolloutStatusArgsSchema,
      execute: async (
        args: z.infer<typeof GetRolloutStatusArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { appsApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const dep = await appsApi.readNamespacedDeployment({
          name: args.deploymentName,
          namespace: ns,
        });
        const normalized = normalizeDeployment(dep);

        context.logger.info("Rollout status for {name}: {conditions}", {
          name: args.deploymentName,
          conditions: normalized.conditions.map((c) => `${c.type}=${c.status}`)
            .join(", "),
        });

        const handle = await context.writeResource(
          "deployment",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    getReplicaSets: {
      description:
        "List ReplicaSets owned by a deployment, showing rollout history and revisions",
      arguments: GetReplicaSetsArgsSchema,
      execute: async (
        args: z.infer<typeof GetReplicaSetsArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { appsApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const resp = await appsApi.listNamespacedReplicaSet({ namespace: ns });
        const allRs = resp.items || [];

        // Filter to ReplicaSets owned by this deployment
        const owned = allRs.filter((rs) => {
          const owners = rs.metadata?.ownerReferences || [];
          return owners.some((o) =>
            o.kind === "Deployment" && o.name === args.deploymentName
          );
        });

        context.logger.info("Found {count} ReplicaSets for deployment {name}", {
          count: owned.length,
          name: args.deploymentName,
        });

        const handles: DataHandle[] = [];
        for (const rs of owned) {
          const normalized = normalizeReplicaSet(rs);
          const handle = await context.writeResource(
            "replicaSet",
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
