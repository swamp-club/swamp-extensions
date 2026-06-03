import { z } from "npm:zod@4.3.6";
import type {
  V1NetworkPolicy,
  V1NetworkPolicyPeer,
  V1NetworkPolicyPort,
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

const NetPolSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  uid: z.string(),
  podSelector: z.record(z.string(), z.string()),
  policyTypes: z.array(z.string()),
  ingressRules: z.array(z.object({
    from: z.array(z.object({
      kind: z.string(),
      selector: z.record(z.string(), z.string()),
      cidr: z.string(),
      except: z.array(z.string()),
    })),
    ports: z.array(z.object({
      protocol: z.string(),
      port: z.string(),
      endPort: z.number(),
    })),
  })),
  egressRules: z.array(z.object({
    to: z.array(z.object({
      kind: z.string(),
      selector: z.record(z.string(), z.string()),
      cidr: z.string(),
      except: z.array(z.string()),
    })),
    ports: z.array(z.object({
      protocol: z.string(),
      port: z.string(),
      endPort: z.number(),
    })),
  })),
  labels: z.record(z.string(), z.string()),
  annotations: z.record(z.string(), z.string()),
  createdAt: z.string(),
}).passthrough();

// --- Method Arg Schemas ---

const ListArgsSchema = z.object({ namespace: z.string().optional() });
const GetArgsSchema = z.object({
  policyName: z.string(),
  namespace: z.string().optional(),
});

const PeerInput = z.object({
  podSelector: z.record(z.string(), z.string()).optional(),
  namespaceSelector: z.record(z.string(), z.string()).optional(),
  ipBlock: z.object({
    cidr: z.string(),
    except: z.array(z.string()).optional(),
  }).optional(),
});

const PortInput = z.object({
  protocol: z.string().default("TCP"),
  port: z.number(),
});

const CreateArgsSchema = z.object({
  policyName: z.string(),
  podSelector: z.record(z.string(), z.string()).default({}),
  policyTypes: z.array(z.enum(["Ingress", "Egress"])).default([
    "Ingress",
  ]),
  ingress: z.array(z.object({
    from: z.array(PeerInput).optional(),
    ports: z.array(PortInput).optional(),
  })).optional(),
  egress: z.array(z.object({
    to: z.array(PeerInput).optional(),
    ports: z.array(PortInput).optional(),
  })).optional(),
  namespace: z.string().optional(),
});
const DeleteArgsSchema = z.object({
  policyName: z.string(),
  namespace: z.string().optional(),
});

// --- Helpers ---

function normalizePeer(peer: V1NetworkPolicyPeer) {
  if (peer.podSelector) {
    return {
      kind: "podSelector",
      selector: peer.podSelector.matchLabels || {},
      cidr: "",
      except: [],
    };
  }
  if (peer.namespaceSelector) {
    return {
      kind: "namespaceSelector",
      selector: peer.namespaceSelector.matchLabels || {},
      cidr: "",
      except: [],
    };
  }
  if (peer.ipBlock) {
    return {
      kind: "ipBlock",
      selector: {},
      cidr: peer.ipBlock.cidr || "",
      except: peer.ipBlock.except || [],
    };
  }
  return { kind: "unknown", selector: {}, cidr: "", except: [] };
}

function normalizePort(port: V1NetworkPolicyPort) {
  return {
    protocol: port.protocol || "TCP",
    port: String(port.port || ""),
    endPort: port.endPort || 0,
  };
}

function normalizeNetPol(raw: V1NetworkPolicy) {
  const meta = normalizeMeta(raw);

  const ingressRules = (raw.spec?.ingress || []).map((rule) => ({
    from: (rule._from || []).map(normalizePeer),
    ports: (rule.ports || []).map(normalizePort),
  }));

  const egressRules = (raw.spec?.egress || []).map((rule) => ({
    to: (rule.to || []).map(normalizePeer),
    ports: (rule.ports || []).map(normalizePort),
  }));

  return {
    ...meta,
    podSelector: raw.spec?.podSelector?.matchLabels || {},
    policyTypes: raw.spec?.policyTypes || [],
    ingressRules,
    egressRules,
  };
}

type PeerInputType = z.infer<typeof PeerInput>;

function buildPeer(peer: PeerInputType) {
  const p: Record<string, unknown> = {};
  if (peer.podSelector) {
    p.podSelector = { matchLabels: peer.podSelector };
  }
  if (peer.namespaceSelector) {
    p.namespaceSelector = { matchLabels: peer.namespaceSelector };
  }
  if (peer.ipBlock) p.ipBlock = peer.ipBlock;
  return p;
}

// --- Model ---

/** Kubernetes NetworkPolicy model. */
export const model = {
  type: "@swamp/kubernetes/netpol",
  version: "2026.06.04.1",
  globalArguments: K8sGlobalArgsSchema,
  upgrades: [
    {
      toVersion: "2026.05.27.2",
      description:
        "Version bump for extension-wide security fix in pod exec method",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  resources: {
    netpol: {
      description:
        "NetworkPolicy with pod selector, ingress/egress rules, peer selectors, and CIDR blocks",
      schema: NetPolSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    list: {
      description:
        "List all NetworkPolicies in the namespace with pod selectors, policy types, and rule counts",
      arguments: ListArgsSchema,
      execute: async (
        args: z.infer<typeof ListArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { networkingApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;
        const labels = context.globalArgs.labels;

        const resp = await networkingApi.listNamespacedNetworkPolicy({
          namespace: ns,
          labelSelector: labels,
        });
        const policies = resp.items || [];

        context.logger.info("Found {count} NetworkPolicies in {ns}", {
          count: policies.length,
          ns,
        });

        const handles: DataHandle[] = [];
        for (const pol of policies) {
          const normalized = normalizeNetPol(pol);
          const handle = await context.writeResource(
            "netpol",
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
        "Get a NetworkPolicy's full spec with pod selector, ingress/egress rules, peer selectors, and CIDR blocks",
      arguments: GetArgsSchema,
      execute: async (
        args: z.infer<typeof GetArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { networkingApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const pol = await networkingApi.readNamespacedNetworkPolicy({
          name: args.policyName,
          namespace: ns,
        });
        const normalized = normalizeNetPol(pol);

        const handle = await context.writeResource(
          "netpol",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    create: {
      description:
        "Create a NetworkPolicy with pod selector and ingress/egress rules",
      arguments: CreateArgsSchema,
      execute: async (
        args: z.infer<typeof CreateArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { networkingApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const spec: Record<string, unknown> = {
          podSelector: { matchLabels: args.podSelector },
          policyTypes: args.policyTypes,
        };

        if (args.ingress) {
          spec.ingress = args.ingress.map((rule) => {
            const r: Record<string, unknown> = {};
            if (rule.from) {
              r.from = rule.from.map(buildPeer);
            }
            if (rule.ports) r.ports = rule.ports;
            return r;
          });
        }

        if (args.egress) {
          spec.egress = args.egress.map((rule) => {
            const r: Record<string, unknown> = {};
            if (rule.to) {
              r.to = rule.to.map(buildPeer);
            }
            if (rule.ports) r.ports = rule.ports;
            return r;
          });
        }

        const body = {
          metadata: { name: args.policyName, namespace: ns },
          spec,
        };

        const created = await networkingApi.createNamespacedNetworkPolicy({
          namespace: ns,
          body: body as unknown as Parameters<
            typeof networkingApi.createNamespacedNetworkPolicy
          >[0]["body"],
        });
        const normalized = normalizeNetPol(created);

        context.logger.info("Created NetworkPolicy {name} in {ns}", {
          name: args.policyName,
          ns,
        });

        const handle = await context.writeResource(
          "netpol",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    delete: {
      description: "Delete a NetworkPolicy",
      arguments: DeleteArgsSchema,
      execute: async (
        args: z.infer<typeof DeleteArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { networkingApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        await networkingApi.deleteNamespacedNetworkPolicy({
          name: args.policyName,
          namespace: ns,
        });

        context.logger.info("Deleted NetworkPolicy {name} in {ns}", {
          name: args.policyName,
          ns,
        });
        return { dataHandles: [] };
      },
    },
  },
};
