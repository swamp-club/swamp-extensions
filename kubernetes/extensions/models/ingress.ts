import { z } from "npm:zod@4.3.6";
import type { V1Ingress } from "npm:@kubernetes/client-node@1.0.0";
import {
  buildClient,
  type DataHandle,
  type K8sContext,
  K8sGlobalArgsSchema,
  normalizeMeta,
  sanitizeInstanceName,
} from "./_lib/helpers.ts";

// --- Schemas ---

const IngressSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  uid: z.string(),
  ingressClassName: z.string(),
  rules: z.array(z.object({
    host: z.string(),
    paths: z.array(z.object({
      path: z.string(),
      pathType: z.string(),
      serviceName: z.string(),
      servicePort: z.string(),
    })),
  })),
  tls: z.array(z.object({
    hosts: z.array(z.string()),
    secretName: z.string(),
  })),
  defaultBackendService: z.string(),
  defaultBackendPort: z.string(),
  loadBalancerIPs: z.array(z.string()),
  labels: z.record(z.string(), z.string()),
  annotations: z.record(z.string(), z.string()),
  createdAt: z.string(),
}).passthrough();

// --- Method Arg Schemas ---

const ListArgsSchema = z.object({ namespace: z.string().optional() });
const GetArgsSchema = z.object({
  ingressName: z.string(),
  namespace: z.string().optional(),
});

const IngressRuleInput = z.object({
  host: z.string().optional(),
  paths: z.array(z.object({
    path: z.string().default("/"),
    pathType: z.string().default("Prefix"),
    serviceName: z.string(),
    servicePort: z.number(),
  })),
});

const TlsInput = z.object({
  hosts: z.array(z.string()),
  secretName: z.string(),
});

const CreateArgsSchema = z.object({
  ingressName: z.string(),
  rules: z.array(IngressRuleInput),
  ingressClassName: z.string().optional(),
  tls: z.array(TlsInput).optional(),
  annotations: z.record(z.string(), z.string()).optional(),
  namespace: z.string().optional(),
});
const UpdateArgsSchema = z.object({
  ingressName: z.string(),
  rules: z.array(IngressRuleInput).optional(),
  tls: z.array(TlsInput).optional(),
  annotations: z.record(z.string(), z.string()).optional(),
  namespace: z.string().optional(),
});
const DeleteArgsSchema = z.object({
  ingressName: z.string(),
  namespace: z.string().optional(),
});

// --- Helpers ---

function normalizeIngress(raw: V1Ingress) {
  const meta = normalizeMeta(raw);

  const rules = (raw.spec?.rules || []).map((rule) => ({
    host: rule.host || "*",
    paths: (rule.http?.paths || []).map((p) => ({
      path: p.path || "/",
      pathType: p.pathType || "ImplementationSpecific",
      serviceName: p.backend?.service?.name || "",
      servicePort: String(
        p.backend?.service?.port?.number ||
          p.backend?.service?.port?.name || "",
      ),
    })),
  }));

  const tls = (raw.spec?.tls || []).map((t) => ({
    hosts: t.hosts || [],
    secretName: t.secretName || "",
  }));

  const loadBalancerIPs = (raw.status?.loadBalancer?.ingress || []).map((i) =>
    i.ip || i.hostname || ""
  );

  return {
    ...meta,
    ingressClassName: raw.spec?.ingressClassName || "",
    rules,
    tls,
    defaultBackendService: raw.spec?.defaultBackend?.service?.name || "",
    defaultBackendPort: String(
      raw.spec?.defaultBackend?.service?.port?.number ||
        raw.spec?.defaultBackend?.service?.port?.name || "",
    ),
    loadBalancerIPs,
  };
}

type IngressRule = z.infer<typeof IngressRuleInput>;

function mapRuleToK8s(rule: IngressRule) {
  return {
    ...(rule.host && { host: rule.host }),
    http: {
      paths: rule.paths.map((p) => ({
        path: p.path,
        pathType: p.pathType,
        backend: {
          service: {
            name: p.serviceName,
            port: { number: p.servicePort },
          },
        },
      })),
    },
  };
}

// --- Model ---

/** Kubernetes Ingress model. */
export const model = {
  type: "@swamp/kubernetes/ingress",
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
    ingress: {
      description:
        "Ingress with rules, TLS config, default backend, and load balancer IPs",
      schema: IngressSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    list: {
      description: "List all ingresses in the configured namespace",
      arguments: ListArgsSchema,
      execute: async (
        args: z.infer<typeof ListArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { networkingApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;
        const labels = context.globalArgs.labels;

        const resp = await networkingApi.listNamespacedIngress({
          namespace: ns,
          labelSelector: labels,
        });
        const ingresses = resp.items || [];

        context.logger.info("Found {count} ingresses in {ns}", {
          count: ingresses.length,
          ns,
        });

        const handles: DataHandle[] = [];
        for (const ing of ingresses) {
          const normalized = normalizeIngress(ing);
          const handle = await context.writeResource(
            "ingress",
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
        "Get an ingress's spec with rules, TLS config, and load balancer status",
      arguments: GetArgsSchema,
      execute: async (
        args: z.infer<typeof GetArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { networkingApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const ing = await networkingApi.readNamespacedIngress({
          name: args.ingressName,
          namespace: ns,
        });
        const normalized = normalizeIngress(ing);

        const handle = await context.writeResource(
          "ingress",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    create: {
      description:
        "Create an ingress from rules with optional TLS config and ingress class",
      arguments: CreateArgsSchema,
      execute: async (
        args: z.infer<typeof CreateArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { networkingApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const body = {
          metadata: {
            name: args.ingressName,
            namespace: ns,
            ...(args.annotations && { annotations: args.annotations }),
          },
          spec: {
            ...(args.ingressClassName &&
              { ingressClassName: args.ingressClassName }),
            rules: args.rules.map(mapRuleToK8s),
            ...(args.tls && { tls: args.tls }),
          },
        };

        const created = await networkingApi.createNamespacedIngress({
          namespace: ns,
          body,
        });
        const normalized = normalizeIngress(created);

        context.logger.info("Created ingress {name} in {ns}", {
          name: args.ingressName,
          ns,
        });

        const handle = await context.writeResource(
          "ingress",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    update: {
      description:
        "Update an ingress's rules, TLS config, or annotations via read-then-replace",
      arguments: UpdateArgsSchema,
      execute: async (
        args: z.infer<typeof UpdateArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { networkingApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const current = await networkingApi.readNamespacedIngress({
          name: args.ingressName,
          namespace: ns,
        });

        if (args.rules) {
          current.spec!.rules = args.rules.map(mapRuleToK8s);
        }
        if (args.tls) {
          current.spec!.tls = args.tls;
        }
        if (args.annotations) {
          current.metadata!.annotations = {
            ...(current.metadata!.annotations || {}),
            ...args.annotations,
          };
        }

        const replaced = await networkingApi.replaceNamespacedIngress({
          name: args.ingressName,
          namespace: ns,
          body: current,
        });
        const normalized = normalizeIngress(replaced);

        context.logger.info("Updated ingress {name} in {ns}", {
          name: args.ingressName,
          ns,
        });

        const handle = await context.writeResource(
          "ingress",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    delete: {
      description: "Delete an ingress",
      arguments: DeleteArgsSchema,
      execute: async (
        args: z.infer<typeof DeleteArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { networkingApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        await networkingApi.deleteNamespacedIngress({
          name: args.ingressName,
          namespace: ns,
        });

        context.logger.info("Deleted ingress {name} in {ns}", {
          name: args.ingressName,
          ns,
        });
        return { dataHandles: [] };
      },
    },
  },
};
