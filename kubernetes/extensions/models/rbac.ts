import { z } from "npm:zod@4.6.7";
import type {
  V1ClusterRole,
  V1ClusterRoleBinding,
  V1PolicyRule,
  V1Role,
  V1RoleBinding,
  V1ServiceAccount,
} from "npm:@kubernetes/client-node@1.4.0";
import {
  apiErrorCode,
  apiErrorMessage,
  buildClient,
  callForObject,
  type DataHandle,
  describeTarget,
  type K8sContext,
  K8sGlobalArgsSchema,
  normalizeMeta,
  PatchFields,
  patchOptions,
  refinePatchArgs,
  sanitizeInstanceName,
} from "./_lib/helpers.ts";

// --- Schemas ---

const RuleSchema = z.object({
  apiGroups: z.array(z.string()),
  resources: z.array(z.string()),
  verbs: z.array(z.string()),
  resourceNames: z.array(z.string()),
});

const RoleSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  uid: z.string(),
  rules: z.array(RuleSchema),
  labels: z.record(z.string(), z.string()),
  annotations: z.record(z.string(), z.string()),
  createdAt: z.string(),
}).passthrough();

const ClusterRoleSchema = z.object({
  name: z.string(),
  uid: z.string(),
  rules: z.array(RuleSchema),
  aggregationSelectors: z.array(z.record(z.string(), z.string())),
  labels: z.record(z.string(), z.string()),
  annotations: z.record(z.string(), z.string()),
  createdAt: z.string(),
}).passthrough();

const SubjectSchema = z.object({
  kind: z.string(),
  name: z.string(),
  namespace: z.string(),
  apiGroup: z.string(),
});

const RoleBindingSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  uid: z.string(),
  roleRef: z.string(),
  roleRefKind: z.string(),
  subjects: z.array(SubjectSchema),
  labels: z.record(z.string(), z.string()),
  annotations: z.record(z.string(), z.string()),
  createdAt: z.string(),
}).passthrough();

const ClusterRoleBindingSchema = z.object({
  name: z.string(),
  uid: z.string(),
  roleRef: z.string(),
  roleRefKind: z.string(),
  subjects: z.array(SubjectSchema),
  labels: z.record(z.string(), z.string()),
  annotations: z.record(z.string(), z.string()),
  createdAt: z.string(),
}).passthrough();

const ServiceAccountSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  uid: z.string(),
  automountToken: z.boolean(),
  secretCount: z.number(),
  labels: z.record(z.string(), z.string()),
  annotations: z.record(z.string(), z.string()),
  createdAt: z.string(),
}).passthrough();

const ServiceAccountTokenSchema = z.object({
  serviceAccount: z.string(),
  namespace: z.string(),
  token: z.string().meta({ sensitive: true }),
  audiences: z.array(z.string()),
  requestedExpirationSeconds: z.number(),
  expirationTimestamp: z.string(),
  issuedAt: z.string(),
}).passthrough();

const AccessReviewSchema = z.object({
  serviceAccount: z.string(),
  serviceAccountNamespace: z.string(),
  user: z.string(),
  verb: z.string(),
  group: z.string(),
  resource: z.string(),
  subresource: z.string(),
  name: z.string(),
  namespace: z.string(),
  clusterScoped: z.boolean(),
  allowed: z.boolean(),
  denied: z.boolean(),
  reason: z.string(),
  evaluationError: z.string(),
  checkedAt: z.string(),
}).passthrough();

// --- Method Arg Schemas ---

const ListRolesArgsSchema = z.object({ namespace: z.string().optional() });
const GetRoleArgsSchema = z.object({
  roleName: z.string(),
  namespace: z.string().optional(),
});
const ListClusterRolesArgsSchema = z.object({});
const GetClusterRoleArgsSchema = z.object({
  clusterRoleName: z.string(),
});
const ListRoleBindingsArgsSchema = z.object({
  namespace: z.string().optional(),
});
const GetRoleBindingArgsSchema = z.object({
  roleBindingName: z.string(),
  namespace: z.string().optional(),
});
const ListClusterRoleBindingsArgsSchema = z.object({});
const GetClusterRoleBindingArgsSchema = z.object({
  clusterRoleBindingName: z.string(),
});
const ListServiceAccountsArgsSchema = z.object({
  namespace: z.string().optional(),
});
const GetServiceAccountArgsSchema = z.object({
  serviceAccountName: z.string(),
  namespace: z.string().optional(),
});
const RequestTokenArgsSchema = z.object({
  serviceAccountName: z.string(),
  namespace: z.string().optional(),
  expirationSeconds: z.number().int().min(600).default(3600).describe(
    "Requested token lifetime in seconds (minimum 600, the API floor). The " +
      "API server may issue a shorter one; the stored expirationTimestamp is " +
      "what it actually issued.",
  ),
  audiences: z.array(z.string()).optional().describe(
    "Intended audiences; defaults to the API server's own audience",
  ),
});
const AccessCheckSchema = z.object({
  verb: z.string().describe("get, list, watch, create, update, patch, delete"),
  resource: z.string().describe("Plural resource, e.g. pods or deployments"),
  group: z.string().default("").describe(
    "API group; empty for the core group, e.g. apps for deployments",
  ),
  subresource: z.string().optional(),
  name: z.string().optional().describe("A single object's name"),
  // min(1): an empty namespace would silently ask cluster-wide while the
  // record claims a namespaced check; clusterScoped is the explicit way.
  namespace: z.string().min(1).optional().describe(
    "Namespace to check in; defaults to the service account's namespace",
  ),
  clusterScoped: z.boolean().default(false).describe(
    "Check without a namespace: for cluster-scoped resources such as nodes, " +
      "or to ask whether access holds in every namespace",
  ),
}).refine((c) => !(c.clusterScoped && c.namespace !== undefined), {
  message: "A check takes namespace or clusterScoped, not both",
  path: ["namespace"],
});
const CheckAccessArgsSchema = z.object({
  serviceAccountName: z.string(),
  namespace: z.string().optional(),
  checks: z.array(AccessCheckSchema).min(1).max(100),
});
const CreateServiceAccountArgsSchema = z.object({
  serviceAccountName: z.string(),
  namespace: z.string().optional(),
  annotations: z.record(z.string(), z.string()).optional(),
  labels: z.record(z.string(), z.string()).optional(),
  automountToken: z.boolean().optional(),
});
const UpdateServiceAccountArgsSchema = z.object({
  serviceAccountName: z.string(),
  namespace: z.string().optional(),
  setAnnotations: z.record(z.string(), z.string()).optional(),
  removeAnnotations: z.array(z.string()).optional(),
  setLabels: z.record(z.string(), z.string()).optional(),
  removeLabels: z.array(z.string()).optional(),
  automountToken: z.boolean().optional(),
}).refine(
  (a) =>
    Object.keys(a.setAnnotations ?? {}).length > 0 ||
    (a.removeAnnotations ?? []).length > 0 ||
    Object.keys(a.setLabels ?? {}).length > 0 ||
    (a.removeLabels ?? []).length > 0 ||
    a.automountToken !== undefined,
  {
    message: "Nothing to update: pass at least one annotation or label to " +
      "set or remove, or automountToken",
  },
);
const DeleteServiceAccountArgsSchema = z.object({
  serviceAccountName: z.string(),
  namespace: z.string().optional(),
});
const PatchServiceAccountArgsSchema = refinePatchArgs(z.object({
  serviceAccountName: z.string(),
  namespace: z.string().optional(),
  ...PatchFields,
}));

// --- Helpers ---

function normalizeRule(rule: V1PolicyRule) {
  return {
    apiGroups: rule.apiGroups || [],
    resources: rule.resources || [],
    verbs: rule.verbs || [],
    resourceNames: rule.resourceNames || [],
  };
}

function normalizeRole(raw: V1Role) {
  const meta = normalizeMeta(raw);
  return {
    ...meta,
    rules: (raw.rules || []).map(normalizeRule),
  };
}

function normalizeClusterRole(raw: V1ClusterRole) {
  const meta = normalizeMeta(raw);
  const aggregation = raw.aggregationRule || {};
  const selectors = (aggregation.clusterRoleSelectors || []).map(
    (s) => (s.matchLabels || {}),
  );
  return {
    name: meta.name,
    uid: meta.uid,
    rules: (raw.rules || []).map(normalizeRule),
    aggregationSelectors: selectors,
    labels: meta.labels,
    annotations: meta.annotations,
    createdAt: meta.createdAt,
  };
}

function normalizeSubject(
  subject: {
    kind?: string;
    name?: string;
    namespace?: string;
    apiGroup?: string;
  },
) {
  return {
    kind: subject.kind || "",
    name: subject.name || "",
    namespace: subject.namespace || "",
    apiGroup: subject.apiGroup || "",
  };
}

function normalizeRoleBinding(raw: V1RoleBinding) {
  const meta = normalizeMeta(raw);
  const ref = raw.roleRef || {};
  return {
    ...meta,
    roleRef: ref.name || "",
    roleRefKind: ref.kind || "",
    subjects: (raw.subjects || []).map(normalizeSubject),
  };
}

function normalizeClusterRoleBinding(raw: V1ClusterRoleBinding) {
  const meta = normalizeMeta(raw);
  const ref = raw.roleRef || {};
  return {
    name: meta.name,
    uid: meta.uid,
    roleRef: ref.name || "",
    roleRefKind: ref.kind || "",
    subjects: (raw.subjects || []).map(normalizeSubject),
    labels: meta.labels,
    annotations: meta.annotations,
    createdAt: meta.createdAt,
  };
}

function normalizeServiceAccount(raw: V1ServiceAccount) {
  const meta = normalizeMeta(raw);
  return {
    ...meta,
    automountToken: raw.automountServiceAccountToken !== false,
    secretCount: (raw.secrets || []).length,
  };
}

/** The username the API server authenticates a ServiceAccount token as. */
function serviceAccountUser(namespace: string, name: string) {
  return `system:serviceaccount:${namespace}:${name}`;
}

/** Merge-patch map: set the given keys, null out the removed ones. */
function keyChanges(
  set: Record<string, string> | undefined,
  remove: string[] | undefined,
): Record<string, string | null> | undefined {
  if (!set && !remove) return undefined;
  const out: Record<string, string | null> = {};
  for (const k of remove ?? []) out[k] = null;
  return { ...out, ...(set ?? {}) };
}

async function writeServiceAccount(
  context: K8sContext,
  raw: V1ServiceAccount,
): Promise<DataHandle> {
  const normalized = normalizeServiceAccount(raw);
  return await context.writeResource(
    "serviceAccount",
    sanitizeInstanceName(normalized.name),
    normalized,
  );
}

// --- Model ---

/** Kubernetes RBAC model. */
export const model = {
  type: "@swamp/kubernetes/rbac",
  version: "2026.11.07.1",
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
      toVersion: "2026.11.07.1",
      description:
        "Add requestServiceAccountToken (expiring, vaulted token), " +
        "checkServiceAccountAccess (SubjectAccessReview), and " +
        "create/update/patch/deleteServiceAccount. No change to global " +
        "arguments or existing resources.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  resources: {
    role: {
      description:
        "Namespaced Role with API group/resource/verb permission rules",
      schema: RoleSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    clusterRole: {
      description:
        "Cluster-scoped ClusterRole with permission rules and optional aggregation selectors",
      schema: ClusterRoleSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    roleBinding: {
      description:
        "Namespaced RoleBinding linking subjects (users, groups, service accounts) to a Role or ClusterRole",
      schema: RoleBindingSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    clusterRoleBinding: {
      description:
        "Cluster-scoped ClusterRoleBinding linking subjects to a ClusterRole",
      schema: ClusterRoleBindingSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    serviceAccount: {
      description:
        "ServiceAccount with auto-mount token status and associated secret count",
      schema: ServiceAccountSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    serviceAccountToken: {
      description:
        "Expiring ServiceAccount token from the TokenRequest API (token is " +
        "sensitive, stored in vault)",
      schema: ServiceAccountTokenSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    accessReview: {
      description:
        "SubjectAccessReview result: whether a ServiceAccount may perform " +
        "one verb on one resource",
      schema: AccessReviewSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    listRoles: {
      description:
        "List all Roles in the namespace with their permission rules (apiGroups, resources, verbs)",
      arguments: ListRolesArgsSchema,
      execute: async (
        args: z.infer<typeof ListRolesArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { rbacApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;
        const labels = context.globalArgs.labels;

        const resp = await rbacApi.listNamespacedRole({
          namespace: ns,
          labelSelector: labels,
        });
        const roles = resp.items || [];

        context.logger.info("Found {count} Roles in {ns}", {
          count: roles.length,
          ns,
        });

        const handles: DataHandle[] = [];
        for (const role of roles) {
          const normalized = normalizeRole(role);
          const handle = await context.writeResource(
            "role",
            sanitizeInstanceName(normalized.name),
            normalized,
          );
          handles.push(handle);
        }
        return { dataHandles: handles };
      },
    },

    getRole: {
      description:
        "Get a Role's full permission rules showing which API groups, resources, and verbs are allowed",
      arguments: GetRoleArgsSchema,
      execute: async (
        args: z.infer<typeof GetRoleArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { rbacApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const role = await rbacApi.readNamespacedRole({
          name: args.roleName,
          namespace: ns,
        });
        const normalized = normalizeRole(role);

        const handle = await context.writeResource(
          "role",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    listClusterRoles: {
      description:
        "List all ClusterRoles in the cluster with their permission rules and aggregation selectors",
      arguments: ListClusterRolesArgsSchema,
      execute: async (
        _args: Record<string, never>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { rbacApi } = buildClient(context.globalArgs);
        const labels = context.globalArgs.labels;

        const resp = await rbacApi.listClusterRole({ labelSelector: labels });
        const roles = resp.items || [];

        context.logger.info("Found {count} ClusterRoles", {
          count: roles.length,
        });

        const handles: DataHandle[] = [];
        for (const role of roles) {
          const normalized = normalizeClusterRole(role);
          const handle = await context.writeResource(
            "clusterRole",
            sanitizeInstanceName(normalized.name),
            normalized,
          );
          handles.push(handle);
        }
        return { dataHandles: handles };
      },
    },

    getClusterRole: {
      description:
        "Get a ClusterRole's full permission rules and aggregation configuration",
      arguments: GetClusterRoleArgsSchema,
      execute: async (
        args: z.infer<typeof GetClusterRoleArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { rbacApi } = buildClient(context.globalArgs);

        const role = await rbacApi.readClusterRole({
          name: args.clusterRoleName,
        });
        const normalized = normalizeClusterRole(role);

        const handle = await context.writeResource(
          "clusterRole",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    listRoleBindings: {
      description:
        "List all RoleBindings in the namespace showing which subjects are bound to which roles",
      arguments: ListRoleBindingsArgsSchema,
      execute: async (
        args: z.infer<typeof ListRoleBindingsArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { rbacApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;
        const labels = context.globalArgs.labels;

        const resp = await rbacApi.listNamespacedRoleBinding({
          namespace: ns,
          labelSelector: labels,
        });
        const bindings = resp.items || [];

        context.logger.info("Found {count} RoleBindings in {ns}", {
          count: bindings.length,
          ns,
        });

        const handles: DataHandle[] = [];
        for (const binding of bindings) {
          const normalized = normalizeRoleBinding(binding);
          const handle = await context.writeResource(
            "roleBinding",
            sanitizeInstanceName(normalized.name),
            normalized,
          );
          handles.push(handle);
        }
        return { dataHandles: handles };
      },
    },

    getRoleBinding: {
      description:
        "Get a RoleBinding's subjects (users, groups, service accounts) and the role it references",
      arguments: GetRoleBindingArgsSchema,
      execute: async (
        args: z.infer<typeof GetRoleBindingArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { rbacApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const binding = await rbacApi.readNamespacedRoleBinding({
          name: args.roleBindingName,
          namespace: ns,
        });
        const normalized = normalizeRoleBinding(binding);

        const handle = await context.writeResource(
          "roleBinding",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    listClusterRoleBindings: {
      description:
        "List all ClusterRoleBindings showing which subjects have cluster-wide role assignments",
      arguments: ListClusterRoleBindingsArgsSchema,
      execute: async (
        _args: Record<string, never>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { rbacApi } = buildClient(context.globalArgs);
        const labels = context.globalArgs.labels;

        const resp = await rbacApi.listClusterRoleBinding({
          labelSelector: labels,
        });
        const bindings = resp.items || [];

        context.logger.info("Found {count} ClusterRoleBindings", {
          count: bindings.length,
        });

        const handles: DataHandle[] = [];
        for (const binding of bindings) {
          const normalized = normalizeClusterRoleBinding(binding);
          const handle = await context.writeResource(
            "clusterRoleBinding",
            sanitizeInstanceName(normalized.name),
            normalized,
          );
          handles.push(handle);
        }
        return { dataHandles: handles };
      },
    },

    getClusterRoleBinding: {
      description:
        "Get a ClusterRoleBinding's subjects and the cluster role it references",
      arguments: GetClusterRoleBindingArgsSchema,
      execute: async (
        args: z.infer<typeof GetClusterRoleBindingArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { rbacApi } = buildClient(context.globalArgs);

        const binding = await rbacApi.readClusterRoleBinding({
          name: args.clusterRoleBindingName,
        });
        const normalized = normalizeClusterRoleBinding(binding);

        const handle = await context.writeResource(
          "clusterRoleBinding",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    listServiceAccounts: {
      description:
        "List all ServiceAccounts in the namespace with auto-mount token status and secret counts",
      arguments: ListServiceAccountsArgsSchema,
      execute: async (
        args: z.infer<typeof ListServiceAccountsArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;
        const labels = context.globalArgs.labels;

        const resp = await coreApi.listNamespacedServiceAccount({
          namespace: ns,
          labelSelector: labels,
        });
        const accounts = resp.items || [];

        context.logger.info("Found {count} ServiceAccounts in {ns}", {
          count: accounts.length,
          ns,
        });

        const handles: DataHandle[] = [];
        for (const sa of accounts) {
          const normalized = normalizeServiceAccount(sa);
          const handle = await context.writeResource(
            "serviceAccount",
            sanitizeInstanceName(normalized.name),
            normalized,
          );
          handles.push(handle);
        }
        return { dataHandles: handles };
      },
    },

    getServiceAccount: {
      description:
        "Get a ServiceAccount's auto-mount token setting and associated secrets",
      arguments: GetServiceAccountArgsSchema,
      execute: async (
        args: z.infer<typeof GetServiceAccountArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const sa = await coreApi.readNamespacedServiceAccount({
          name: args.serviceAccountName,
          namespace: ns,
        });
        const normalized = normalizeServiceAccount(sa);

        const handle = await context.writeResource(
          "serviceAccount",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    requestServiceAccountToken: {
      description:
        "Request an expiring token for a ServiceAccount via the TokenRequest " +
        "API. The token is stored as a sensitive field (vaulted), with its " +
        "expiration; no long-lived token Secret is created.",
      arguments: RequestTokenArgsSchema,
      execute: async (
        args: z.infer<typeof RequestTokenArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;
        const target = describeTarget(
          "ServiceAccount",
          args.serviceAccountName,
          ns,
        );

        const resp = await callForObject(
          "Requesting a token for",
          target,
          () =>
            coreApi.createNamespacedServiceAccountToken({
              name: args.serviceAccountName,
              namespace: ns,
              body: {
                spec: {
                  expirationSeconds: args.expirationSeconds,
                  audiences: args.audiences ?? [],
                },
              },
            }),
        );
        const token = resp.status?.token;
        if (!token) {
          throw new Error(`TokenRequest for ${target} returned no token`);
        }
        const expiration = resp.status?.expirationTimestamp;
        const expirationTimestamp = expiration
          ? new Date(expiration).toISOString()
          : "";

        context.logger.info(
          "Issued token for ServiceAccount {name} in {ns}, expires {expires}",
          { name: args.serviceAccountName, ns, expires: expirationTimestamp },
        );

        // The record expires with the token it holds.
        const minutesLeft = expiration
          ? Math.max(
            1,
            Math.ceil((new Date(expiration).getTime() - Date.now()) / 60_000),
          )
          : Math.ceil(args.expirationSeconds / 60);

        // "_" cannot occur in a namespace or ServiceAccount name.
        const handle = await context.writeResource(
          "serviceAccountToken",
          sanitizeInstanceName(`${ns}_${args.serviceAccountName}`),
          {
            serviceAccount: args.serviceAccountName,
            namespace: ns,
            token,
            audiences: resp.spec?.audiences ?? args.audiences ?? [],
            requestedExpirationSeconds: args.expirationSeconds,
            expirationTimestamp,
            issuedAt: new Date().toISOString(),
          },
          { lifetime: `${minutesLeft}m` },
        );
        return { dataHandles: [handle] };
      },
    },

    checkServiceAccountAccess: {
      description:
        "Check what a ServiceAccount may do: one SubjectAccessReview per " +
        "check, one accessReview record each. Fails after recording all " +
        "checks if any check could not be evaluated.",
      arguments: CheckAccessArgsSchema,
      execute: async (
        args: z.infer<typeof CheckAccessArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { authorizationApi } = buildClient(context.globalArgs);
        const saNs = args.namespace ?? context.globalArgs.namespace;
        const user = serviceAccountUser(saNs, args.serviceAccountName);
        const groups = [
          "system:serviceaccounts",
          `system:serviceaccounts:${saNs}`,
          "system:authenticated",
        ];

        const handles: DataHandle[] = [];
        const failures: string[] = [];
        for (const check of args.checks) {
          const targetNs = check.clusterScoped ? "" : check.namespace ?? saNs;
          const label = [
            `${check.verb} `,
            check.group ? `${check.resource}.${check.group}` : check.resource,
            check.subresource ? `/${check.subresource}` : "",
            check.name ? ` ${check.name}` : "",
            targetNs ? ` in ${targetNs}` : " cluster-wide",
          ].join("");

          let allowed = false;
          let denied = false;
          let reason = "";
          let evaluationError = "";
          try {
            const review = await authorizationApi.createSubjectAccessReview({
              body: {
                spec: {
                  user,
                  groups,
                  resourceAttributes: {
                    verb: check.verb,
                    group: check.group,
                    resource: check.resource,
                    ...(check.subresource &&
                      { subresource: check.subresource }),
                    ...(check.name && { name: check.name }),
                    ...(targetNs && { namespace: targetNs }),
                  },
                },
              },
            });
            allowed = review.status?.allowed ?? false;
            denied = review.status?.denied ?? false;
            reason = review.status?.reason ?? "";
            evaluationError = review.status?.evaluationError ?? "";
            // An authorizer that errored (a webhook timeout, a binding to a
            // missing role) answers with evaluationError and no decision:
            // that is an unanswered check. An allow, or an explicit deny from
            // a later authorizer, is a decision and stands.
            if (evaluationError && !allowed && !denied) {
              failures.push(`${label}: ${evaluationError}`);
            }
          } catch (err) {
            evaluationError = apiErrorCode(err) === 403
              ? "Forbidden: the caller needs create on " +
                "subjectaccessreviews.authorization.k8s.io (cluster-wide) " +
                `to check access: ${apiErrorMessage(err)}`
              : apiErrorMessage(err);
            failures.push(`${label}: ${evaluationError}`);
          }

          context.logger.info("{user} {verb}: {result}", {
            user,
            verb: label,
            result: evaluationError ? "error" : allowed ? "allowed" : "denied",
          });

          // "_" cannot occur in Kubernetes names, namespaces, groups or
          // resources, so distinct checks always get distinct names. The
          // core group is an empty segment, so it cannot meet a group "core".
          const instance = [
            saNs,
            args.serviceAccountName,
            check.verb,
            check.group,
            check.subresource
              ? `${check.resource}.${check.subresource}`
              : check.resource,
            check.name ?? "",
            check.clusterScoped ? "" : targetNs,
          ].join("_");

          handles.push(
            await context.writeResource(
              "accessReview",
              sanitizeInstanceName(instance),
              {
                serviceAccount: args.serviceAccountName,
                serviceAccountNamespace: saNs,
                user,
                verb: check.verb,
                group: check.group,
                resource: check.resource,
                subresource: check.subresource ?? "",
                name: check.name ?? "",
                namespace: targetNs,
                clusterScoped: check.clusterScoped,
                allowed,
                denied,
                reason,
                evaluationError,
                checkedAt: new Date().toISOString(),
              },
            ),
          );
        }

        if (failures.length > 0) {
          throw new Error(
            `${failures.length} of ${args.checks.length} access checks for ` +
              `${user} could not be evaluated:\n${failures.join("\n")}`,
          );
        }
        return { dataHandles: handles };
      },
    },

    createServiceAccount: {
      description:
        "Create a ServiceAccount with optional annotations (e.g. an IRSA " +
        "eks.amazonaws.com/role-arn), labels and auto-mount setting",
      arguments: CreateServiceAccountArgsSchema,
      execute: async (
        args: z.infer<typeof CreateServiceAccountArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;
        const target = describeTarget(
          "ServiceAccount",
          args.serviceAccountName,
          ns,
        );

        const created = await callForObject(
          "Creating",
          target,
          () =>
            coreApi.createNamespacedServiceAccount({
              namespace: ns,
              body: {
                metadata: {
                  name: args.serviceAccountName,
                  namespace: ns,
                  ...(args.annotations && { annotations: args.annotations }),
                  ...(args.labels && { labels: args.labels }),
                },
                ...(args.automountToken !== undefined &&
                  { automountServiceAccountToken: args.automountToken }),
              },
            }),
        );

        context.logger.info("Created ServiceAccount {name} in {ns}", {
          name: args.serviceAccountName,
          ns,
        });
        return { dataHandles: [await writeServiceAccount(context, created)] };
      },
    },

    updateServiceAccount: {
      description:
        "Set or remove annotations and labels, or change the auto-mount " +
        "setting, with a merge patch: keys not named are left as they are",
      arguments: UpdateServiceAccountArgsSchema,
      execute: async (
        args: z.infer<typeof UpdateServiceAccountArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;
        const target = describeTarget(
          "ServiceAccount",
          args.serviceAccountName,
          ns,
        );

        const annotations = keyChanges(
          args.setAnnotations,
          args.removeAnnotations,
        );
        const labels = keyChanges(args.setLabels, args.removeLabels);
        const body = {
          ...((annotations || labels) && {
            metadata: {
              ...(annotations && { annotations }),
              ...(labels && { labels }),
            },
          }),
          ...(args.automountToken !== undefined &&
            { automountServiceAccountToken: args.automountToken }),
        };

        const patched = await callForObject(
          "Updating",
          target,
          () =>
            coreApi.patchNamespacedServiceAccount(
              { name: args.serviceAccountName, namespace: ns, body },
              patchOptions("merge"),
            ),
        );

        context.logger.info("Updated ServiceAccount {name} in {ns}", {
          name: args.serviceAccountName,
          ns,
        });
        return { dataHandles: [await writeServiceAccount(context, patched)] };
      },
    },

    patchServiceAccount: {
      description:
        "Patch a ServiceAccount with a merge, strategic merge or JSON patch",
      arguments: PatchServiceAccountArgsSchema,
      execute: async (
        args: z.infer<typeof PatchServiceAccountArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const patched = await callForObject(
          "Patching",
          describeTarget("ServiceAccount", args.serviceAccountName, ns),
          () =>
            coreApi.patchNamespacedServiceAccount(
              {
                name: args.serviceAccountName,
                namespace: ns,
                body: args.patch,
              },
              patchOptions(args.patchType),
            ),
        );

        context.logger.info("Patched ServiceAccount {name} in {ns} ({type})", {
          name: args.serviceAccountName,
          ns,
          type: args.patchType,
        });
        return { dataHandles: [await writeServiceAccount(context, patched)] };
      },
    },

    deleteServiceAccount: {
      description: "Delete a ServiceAccount",
      arguments: DeleteServiceAccountArgsSchema,
      execute: async (
        args: z.infer<typeof DeleteServiceAccountArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        await callForObject(
          "Deleting",
          describeTarget("ServiceAccount", args.serviceAccountName, ns),
          () =>
            coreApi.deleteNamespacedServiceAccount({
              name: args.serviceAccountName,
              namespace: ns,
            }),
        );
        context.logger.info("Deleted ServiceAccount {name} in {ns}", {
          name: args.serviceAccountName,
          ns,
        });
        return { dataHandles: [] };
      },
    },
  },
};
