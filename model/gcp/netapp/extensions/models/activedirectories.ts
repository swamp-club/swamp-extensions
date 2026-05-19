// Auto-generated extension model for @swamp/gcp/netapp/activedirectories
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud NetApp ActiveDirectories.
 *
 * ActiveDirectory is the public representation of the active directory config.
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
  return `${parent}/activeDirectories/${shortName}`;
}

const BASE_URL = "https://netapp.googleapis.com/";

const GET_CONFIG = {
  "id": "netapp.projects.locations.activeDirectories.get",
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
  "id": "netapp.projects.locations.activeDirectories.create",
  "path": "v1/{+parent}/activeDirectories",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "activeDirectoryId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "netapp.projects.locations.activeDirectories.patch",
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
  "id": "netapp.projects.locations.activeDirectories.delete",
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
  administrators: z.array(z.string()).describe(
    "Optional. Users to be added to the Built-in Admininstrators group.",
  ).optional(),
  aesEncryption: z.boolean().describe(
    "If enabled, AES encryption will be enabled for SMB communication.",
  ).optional(),
  backupOperators: z.array(z.string()).describe(
    "Optional. Users to be added to the Built-in Backup Operator active directory group.",
  ).optional(),
  description: z.string().describe("Description of the active directory.")
    .optional(),
  dns: z.string().describe(
    "Required. Comma separated list of DNS server IP addresses for the Active Directory domain.",
  ).optional(),
  domain: z.string().describe("Required. Name of the Active Directory domain")
    .optional(),
  encryptDcConnections: z.boolean().describe(
    "If enabled, traffic between the SMB server to Domain Controller (DC) will be encrypted.",
  ).optional(),
  kdcHostname: z.string().describe(
    "Name of the active directory machine. This optional parameter is used only while creating kerberos volume",
  ).optional(),
  kdcIp: z.string().describe(
    "KDC server IP address for the active directory machine.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels for the active directory.",
  ).optional(),
  ldapSigning: z.boolean().describe(
    "Specifies whether or not the LDAP traffic needs to be signed.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the active directory. Format: `projects/{project_number}/locations/{location_id}/activeDirectories/{active_directory_id}`.",
  ).optional(),
  netBiosPrefix: z.string().describe(
    "Required. NetBIOSPrefix is used as a prefix for SMB server name.",
  ).optional(),
  nfsUsersWithLdap: z.boolean().describe(
    "If enabled, will allow access to local users and LDAP users. If access is needed for only LDAP users, it has to be disabled.",
  ).optional(),
  organizationalUnit: z.string().describe(
    "The Organizational Unit (OU) within the Windows Active Directory the user belongs to.",
  ).optional(),
  password: z.string().describe(
    "Required. Password of the Active Directory domain administrator.",
  ).optional(),
  securityOperators: z.array(z.string()).describe(
    "Optional. Domain users to be given the SeSecurityPrivilege.",
  ).optional(),
  site: z.string().describe(
    "The Active Directory site the service will limit Domain Controller discovery too.",
  ).optional(),
  username: z.string().describe(
    "Required. Username of the Active Directory domain administrator.",
  ).optional(),
  activeDirectoryId: z.string().describe(
    "Required. ID of the active directory to create. Must be unique within the parent resource. Must contain only letters, numbers and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  administrators: z.array(z.string()).optional(),
  aesEncryption: z.boolean().optional(),
  backupOperators: z.array(z.string()).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  dns: z.string().optional(),
  domain: z.string().optional(),
  encryptDcConnections: z.boolean().optional(),
  kdcHostname: z.string().optional(),
  kdcIp: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  ldapSigning: z.boolean().optional(),
  name: z.string(),
  netBiosPrefix: z.string().optional(),
  nfsUsersWithLdap: z.boolean().optional(),
  organizationalUnit: z.string().optional(),
  password: z.string().optional(),
  securityOperators: z.array(z.string()).optional(),
  site: z.string().optional(),
  state: z.string().optional(),
  stateDetails: z.string().optional(),
  username: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  administrators: z.array(z.string()).describe(
    "Optional. Users to be added to the Built-in Admininstrators group.",
  ).optional(),
  aesEncryption: z.boolean().describe(
    "If enabled, AES encryption will be enabled for SMB communication.",
  ).optional(),
  backupOperators: z.array(z.string()).describe(
    "Optional. Users to be added to the Built-in Backup Operator active directory group.",
  ).optional(),
  description: z.string().describe("Description of the active directory.")
    .optional(),
  dns: z.string().describe(
    "Required. Comma separated list of DNS server IP addresses for the Active Directory domain.",
  ).optional(),
  domain: z.string().describe("Required. Name of the Active Directory domain")
    .optional(),
  encryptDcConnections: z.boolean().describe(
    "If enabled, traffic between the SMB server to Domain Controller (DC) will be encrypted.",
  ).optional(),
  kdcHostname: z.string().describe(
    "Name of the active directory machine. This optional parameter is used only while creating kerberos volume",
  ).optional(),
  kdcIp: z.string().describe(
    "KDC server IP address for the active directory machine.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels for the active directory.",
  ).optional(),
  ldapSigning: z.boolean().describe(
    "Specifies whether or not the LDAP traffic needs to be signed.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the active directory. Format: `projects/{project_number}/locations/{location_id}/activeDirectories/{active_directory_id}`.",
  ).optional(),
  netBiosPrefix: z.string().describe(
    "Required. NetBIOSPrefix is used as a prefix for SMB server name.",
  ).optional(),
  nfsUsersWithLdap: z.boolean().describe(
    "If enabled, will allow access to local users and LDAP users. If access is needed for only LDAP users, it has to be disabled.",
  ).optional(),
  organizationalUnit: z.string().describe(
    "The Organizational Unit (OU) within the Windows Active Directory the user belongs to.",
  ).optional(),
  password: z.string().describe(
    "Required. Password of the Active Directory domain administrator.",
  ).optional(),
  securityOperators: z.array(z.string()).describe(
    "Optional. Domain users to be given the SeSecurityPrivilege.",
  ).optional(),
  site: z.string().describe(
    "The Active Directory site the service will limit Domain Controller discovery too.",
  ).optional(),
  username: z.string().describe(
    "Required. Username of the Active Directory domain administrator.",
  ).optional(),
  activeDirectoryId: z.string().describe(
    "Required. ID of the active directory to create. Must be unique within the parent resource. Must contain only letters, numbers and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud NetApp ActiveDirectories. Registered at `@swamp/gcp/netapp/activedirectories`. */
export const model = {
  type: "@swamp/gcp/netapp/activedirectories",
  version: "2026.05.19.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "ActiveDirectory is the public representation of the active directory config.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a activeDirectories",
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
        if (g["administrators"] !== undefined) {
          body["administrators"] = g["administrators"];
        }
        if (g["aesEncryption"] !== undefined) {
          body["aesEncryption"] = g["aesEncryption"];
        }
        if (g["backupOperators"] !== undefined) {
          body["backupOperators"] = g["backupOperators"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["dns"] !== undefined) body["dns"] = g["dns"];
        if (g["domain"] !== undefined) body["domain"] = g["domain"];
        if (g["encryptDcConnections"] !== undefined) {
          body["encryptDcConnections"] = g["encryptDcConnections"];
        }
        if (g["kdcHostname"] !== undefined) {
          body["kdcHostname"] = g["kdcHostname"];
        }
        if (g["kdcIp"] !== undefined) body["kdcIp"] = g["kdcIp"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["ldapSigning"] !== undefined) {
          body["ldapSigning"] = g["ldapSigning"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["netBiosPrefix"] !== undefined) {
          body["netBiosPrefix"] = g["netBiosPrefix"];
        }
        if (g["nfsUsersWithLdap"] !== undefined) {
          body["nfsUsersWithLdap"] = g["nfsUsersWithLdap"];
        }
        if (g["organizationalUnit"] !== undefined) {
          body["organizationalUnit"] = g["organizationalUnit"];
        }
        if (g["password"] !== undefined) body["password"] = g["password"];
        if (g["securityOperators"] !== undefined) {
          body["securityOperators"] = g["securityOperators"];
        }
        if (g["site"] !== undefined) body["site"] = g["site"];
        if (g["username"] !== undefined) body["username"] = g["username"];
        if (g["activeDirectoryId"] !== undefined) {
          body["activeDirectoryId"] = g["activeDirectoryId"];
        }
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
              "failedValues": ["ERROR"],
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
      description: "Get a activeDirectories",
      arguments: z.object({
        identifier: z.string().describe("The name of the activeDirectories"),
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
      description: "Update activeDirectories attributes",
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
        if (g["administrators"] !== undefined) {
          body["administrators"] = g["administrators"];
        }
        if (g["aesEncryption"] !== undefined) {
          body["aesEncryption"] = g["aesEncryption"];
        }
        if (g["backupOperators"] !== undefined) {
          body["backupOperators"] = g["backupOperators"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["dns"] !== undefined) body["dns"] = g["dns"];
        if (g["domain"] !== undefined) body["domain"] = g["domain"];
        if (g["encryptDcConnections"] !== undefined) {
          body["encryptDcConnections"] = g["encryptDcConnections"];
        }
        if (g["kdcHostname"] !== undefined) {
          body["kdcHostname"] = g["kdcHostname"];
        }
        if (g["kdcIp"] !== undefined) body["kdcIp"] = g["kdcIp"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["ldapSigning"] !== undefined) {
          body["ldapSigning"] = g["ldapSigning"];
        }
        if (g["netBiosPrefix"] !== undefined) {
          body["netBiosPrefix"] = g["netBiosPrefix"];
        }
        if (g["nfsUsersWithLdap"] !== undefined) {
          body["nfsUsersWithLdap"] = g["nfsUsersWithLdap"];
        }
        if (g["organizationalUnit"] !== undefined) {
          body["organizationalUnit"] = g["organizationalUnit"];
        }
        if (g["password"] !== undefined) body["password"] = g["password"];
        if (g["securityOperators"] !== undefined) {
          body["securityOperators"] = g["securityOperators"];
        }
        if (g["site"] !== undefined) body["site"] = g["site"];
        if (g["username"] !== undefined) body["username"] = g["username"];
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
              "failedValues": ["ERROR"],
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
      description: "Delete the activeDirectories",
      arguments: z.object({
        identifier: z.string().describe("The name of the activeDirectories"),
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
      description: "Sync activeDirectories state from GCP",
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
  },
};
