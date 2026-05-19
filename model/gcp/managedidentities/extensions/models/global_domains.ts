// Auto-generated extension model for @swamp/gcp/managedidentities/global-domains
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Managed Service for Microsoft Active Directory Global.Domains.
 *
 * Represents a managed Microsoft Active Directory domain. If the domain is being changed, it will be placed into the UPDATING state, which indicates that the resource is being reconciled. At this point, Get will reflect an intermediate state.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/domains/${shortName}`;
}

const BASE_URL = "https://managedidentities.googleapis.com/";

const GET_CONFIG = {
  "id": "managedidentities.projects.locations.global.domains.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "managedidentities.projects.locations.global.domains.create",
  "path": "v1/{+parent}/domains",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "domainName": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "managedidentities.projects.locations.global.domains.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "managedidentities.projects.locations.global.domains.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  admin: z.string().describe(
    "Optional. The name of delegated administrator account used to perform Active Directory operations. If not specified, `setupadmin` will be used.",
  ).optional(),
  auditLogsEnabled: z.boolean().describe(
    "Optional. Configuration for audit logs. True if audit logs are enabled, else false. Default is audit logs disabled.",
  ).optional(),
  authorizedNetworks: z.array(z.string()).describe(
    "Optional. The full names of the Google Compute Engine [networks](/compute/docs/networks-and-firewalls#networks) the domain instance is connected to. Networks can be added using UpdateDomain. The domain is only available on networks listed in `authorized_networks`. If CIDR subnets overlap between networks, domain creation will fail.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Resource labels that can contain user-provided metadata.",
  ).optional(),
  locations: z.array(z.string()).describe(
    "Required. Locations where domain needs to be provisioned. The locations can be specified according to https://cloud.google.com/compute/docs/regions-zones, such as `us-west1` or `us-east4`. Each domain supports up to 4 locations, separated by commas. Each location will use a /26 block.",
  ).optional(),
  name: z.string().describe(
    "Required. The unique name of the domain using the form: `projects/{project_id}/locations/global/domains/{domain_name}`.",
  ).optional(),
  reservedIpRange: z.string().describe(
    "Required. The CIDR range of internal addresses that are reserved for this domain. Reserved networks must be /24 or larger. Ranges must be unique and non-overlapping with existing subnets in [Domain].[authorized_networks].",
  ).optional(),
  domainName: z.string().describe(
    "Required. The fully qualified domain name. e.g. mydomain.myorganization.com, with the following restrictions: * Must contain only lowercase letters, numbers, periods and hyphens. * Must start with a letter. * Must contain between 2-64 characters. * Must end with a number or a letter. * Must not start with period. * First segment length (mydomain for example above) shouldn't exceed 15 chars. * The last segment cannot be fully numeric. * Must be unique within the customer project.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  admin: z.string().optional(),
  auditLogsEnabled: z.boolean().optional(),
  authorizedNetworks: z.array(z.string()).optional(),
  createTime: z.string().optional(),
  fqdn: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  locations: z.array(z.string()).optional(),
  name: z.string(),
  reservedIpRange: z.string().optional(),
  state: z.string().optional(),
  statusMessage: z.string().optional(),
  trusts: z.array(z.object({
    createTime: z.string(),
    lastTrustHeartbeatTime: z.string(),
    selectiveAuthentication: z.boolean(),
    state: z.string(),
    stateDescription: z.string(),
    targetDnsIpAddresses: z.array(z.string()),
    targetDomainName: z.string(),
    trustDirection: z.string(),
    trustHandshakeSecret: z.string(),
    trustType: z.string(),
    updateTime: z.string(),
  })).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  admin: z.string().describe(
    "Optional. The name of delegated administrator account used to perform Active Directory operations. If not specified, `setupadmin` will be used.",
  ).optional(),
  auditLogsEnabled: z.boolean().describe(
    "Optional. Configuration for audit logs. True if audit logs are enabled, else false. Default is audit logs disabled.",
  ).optional(),
  authorizedNetworks: z.array(z.string()).describe(
    "Optional. The full names of the Google Compute Engine [networks](/compute/docs/networks-and-firewalls#networks) the domain instance is connected to. Networks can be added using UpdateDomain. The domain is only available on networks listed in `authorized_networks`. If CIDR subnets overlap between networks, domain creation will fail.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Resource labels that can contain user-provided metadata.",
  ).optional(),
  locations: z.array(z.string()).describe(
    "Required. Locations where domain needs to be provisioned. The locations can be specified according to https://cloud.google.com/compute/docs/regions-zones, such as `us-west1` or `us-east4`. Each domain supports up to 4 locations, separated by commas. Each location will use a /26 block.",
  ).optional(),
  name: z.string().describe(
    "Required. The unique name of the domain using the form: `projects/{project_id}/locations/global/domains/{domain_name}`.",
  ).optional(),
  reservedIpRange: z.string().describe(
    "Required. The CIDR range of internal addresses that are reserved for this domain. Reserved networks must be /24 or larger. Ranges must be unique and non-overlapping with existing subnets in [Domain].[authorized_networks].",
  ).optional(),
  domainName: z.string().describe(
    "Required. The fully qualified domain name. e.g. mydomain.myorganization.com, with the following restrictions: * Must contain only lowercase letters, numbers, periods and hyphens. * Must start with a letter. * Must contain between 2-64 characters. * Must end with a number or a letter. * Must not start with period. * First segment length (mydomain for example above) shouldn't exceed 15 chars. * The last segment cannot be fully numeric. * Must be unique within the customer project.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Managed Service for Microsoft Active Directory Global.Domains. Registered at `@swamp/gcp/managedidentities/global-domains`. */
export const model = {
  type: "@swamp/gcp/managedidentities/global-domains",
  version: "2026.05.19.2",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a managed Microsoft Active Directory domain. If the domain is bein...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a domains",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["admin"] !== undefined) body["admin"] = g["admin"];
        if (g["auditLogsEnabled"] !== undefined) {
          body["auditLogsEnabled"] = g["auditLogsEnabled"];
        }
        if (g["authorizedNetworks"] !== undefined) {
          body["authorizedNetworks"] = g["authorizedNetworks"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["locations"] !== undefined) body["locations"] = g["locations"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["reservedIpRange"] !== undefined) {
          body["reservedIpRange"] = g["reservedIpRange"];
        }
        if (g["domainName"] !== undefined) body["domainName"] = g["domainName"];
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["READY"],
              "failedValues": [],
            }
            : undefined,
        ) as StateData;
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a domains",
      arguments: z.object({
        identifier: z.string().describe("The name of the domains"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update domains attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["admin"] !== undefined) body["admin"] = g["admin"];
        if (g["auditLogsEnabled"] !== undefined) {
          body["auditLogsEnabled"] = g["auditLogsEnabled"];
        }
        if (g["authorizedNetworks"] !== undefined) {
          body["authorizedNetworks"] = g["authorizedNetworks"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["locations"] !== undefined) body["locations"] = g["locations"];
        if (g["reservedIpRange"] !== undefined) {
          body["reservedIpRange"] = g["reservedIpRange"];
        }
        for (const key of Object.keys(existing)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = existing[key];
          }
        }
        const result = await updateResource(
          BASE_URL,
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["READY"],
              "failedValues": [],
            }
            : undefined,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the domains",
      arguments: z.object({
        identifier: z.string().describe("The name of the domains"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
        );
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          identifier: args.identifier,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync domains state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            shortName,
          );
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
          ) as StateData;
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        } catch (error: unknown) {
          if (isResourceNotFoundError(error)) {
            const handle = await context.writeResource("state", instanceName, {
              status: "not_found",
              syncedAt: new Date().toISOString(),
            });
            return { dataHandles: [handle] };
          }
          throw error;
        }
      },
    },
    attach_trust: {
      description: "attach trust",
      arguments: z.object({
        trust: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["trust"] !== undefined) body["trust"] = args["trust"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "managedidentities.projects.locations.global.domains.attachTrust",
            "path": "v1/{+name}:attachTrust",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    check_migration_permission: {
      description: "check migration permission",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["domain"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "managedidentities.projects.locations.global.domains.checkMigrationPermission",
            "path": "v1/{+domain}:checkMigrationPermission",
            "httpMethod": "POST",
            "parameterOrder": ["domain"],
            "parameters": {
              "domain": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    detach_trust: {
      description: "detach trust",
      arguments: z.object({
        trust: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["trust"] !== undefined) body["trust"] = args["trust"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "managedidentities.projects.locations.global.domains.detachTrust",
            "path": "v1/{+name}:detachTrust",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    disable_migration: {
      description: "disable migration",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["domain"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "managedidentities.projects.locations.global.domains.disableMigration",
            "path": "v1/{+domain}:disableMigration",
            "httpMethod": "POST",
            "parameterOrder": ["domain"],
            "parameters": {
              "domain": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    domain_join_machine: {
      description: "domain join machine",
      arguments: z.object({
        force: z.any().optional(),
        ouName: z.any().optional(),
        vmIdToken: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["domain"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["force"] !== undefined) body["force"] = args["force"];
        if (args["ouName"] !== undefined) body["ouName"] = args["ouName"];
        if (args["vmIdToken"] !== undefined) {
          body["vmIdToken"] = args["vmIdToken"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "managedidentities.projects.locations.global.domains.domainJoinMachine",
            "path": "v1/{+domain}:domainJoinMachine",
            "httpMethod": "POST",
            "parameterOrder": ["domain"],
            "parameters": {
              "domain": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    enable_migration: {
      description: "enable migration",
      arguments: z.object({
        migratingDomains: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["domain"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["migratingDomains"] !== undefined) {
          body["migratingDomains"] = args["migratingDomains"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "managedidentities.projects.locations.global.domains.enableMigration",
            "path": "v1/{+domain}:enableMigration",
            "httpMethod": "POST",
            "parameterOrder": ["domain"],
            "parameters": {
              "domain": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    extend_schema: {
      description: "extend schema",
      arguments: z.object({
        description: z.any().optional(),
        fileContents: z.any().optional(),
        gcsPath: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["domain"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["description"] !== undefined) {
          body["description"] = args["description"];
        }
        if (args["fileContents"] !== undefined) {
          body["fileContents"] = args["fileContents"];
        }
        if (args["gcsPath"] !== undefined) body["gcsPath"] = args["gcsPath"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "managedidentities.projects.locations.global.domains.extendSchema",
            "path": "v1/{+domain}:extendSchema",
            "httpMethod": "POST",
            "parameterOrder": ["domain"],
            "parameters": {
              "domain": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    get_ldapssettings: {
      description: "get ldapssettings",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "managedidentities.projects.locations.global.domains.getLdapssettings",
            "path": "v1/{+name}/ldapssettings",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    reconfigure_trust: {
      description: "reconfigure trust",
      arguments: z.object({
        targetDnsIpAddresses: z.any().optional(),
        targetDomainName: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["targetDnsIpAddresses"] !== undefined) {
          body["targetDnsIpAddresses"] = args["targetDnsIpAddresses"];
        }
        if (args["targetDomainName"] !== undefined) {
          body["targetDomainName"] = args["targetDomainName"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "managedidentities.projects.locations.global.domains.reconfigureTrust",
            "path": "v1/{+name}:reconfigureTrust",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    reset_admin_password: {
      description: "reset admin password",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "managedidentities.projects.locations.global.domains.resetAdminPassword",
            "path": "v1/{+name}:resetAdminPassword",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    restore: {
      description: "restore",
      arguments: z.object({
        backupId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["backupId"] !== undefined) body["backupId"] = args["backupId"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "managedidentities.projects.locations.global.domains.restore",
            "path": "v1/{+name}:restore",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    update_ldapssettings: {
      description: "update ldapssettings",
      arguments: z.object({
        certificate: z.any().optional(),
        certificatePassword: z.any().optional(),
        certificatePfx: z.any().optional(),
        name: z.any().optional(),
        state: z.any().optional(),
        updateTime: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["certificate"] !== undefined) {
          body["certificate"] = args["certificate"];
        }
        if (args["certificatePassword"] !== undefined) {
          body["certificatePassword"] = args["certificatePassword"];
        }
        if (args["certificatePfx"] !== undefined) {
          body["certificatePfx"] = args["certificatePfx"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["state"] !== undefined) body["state"] = args["state"];
        if (args["updateTime"] !== undefined) {
          body["updateTime"] = args["updateTime"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "managedidentities.projects.locations.global.domains.updateLdapssettings",
            "path": "v1/{+name}/ldapssettings",
            "httpMethod": "PATCH",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "updateMask": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    validate_trust: {
      description: "validate trust",
      arguments: z.object({
        trust: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["trust"] !== undefined) body["trust"] = args["trust"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "managedidentities.projects.locations.global.domains.validateTrust",
            "path": "v1/{+name}:validateTrust",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
