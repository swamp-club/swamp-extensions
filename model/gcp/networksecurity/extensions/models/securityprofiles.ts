// Auto-generated extension model for @swamp/gcp/networksecurity/securityprofiles
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Network Security SecurityProfiles.
 *
 * SecurityProfile is a resource that defines the behavior for one of many ProfileTypes.
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
  return `${parent}/securityProfiles/${shortName}`;
}

const BASE_URL = "https://networksecurity.googleapis.com/";

const GET_CONFIG = {
  "id": "networksecurity.organizations.locations.securityProfiles.get",
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
  "id": "networksecurity.organizations.locations.securityProfiles.create",
  "path": "v1/{+parent}/securityProfiles",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "securityProfileId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "networksecurity.organizations.locations.securityProfiles.patch",
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
  "id": "networksecurity.organizations.locations.securityProfiles.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  customInterceptProfile: z.object({
    interceptEndpointGroup: z.string().describe(
      "Required. The target InterceptEndpointGroup. When a firewall rule with this security profile attached matches a packet, the packet will be intercepted to the location-local target in this group.",
    ).optional(),
  }).describe(
    "CustomInterceptProfile defines in-band integration behavior (intercept). It is used by firewall rules with an APPLY_SECURITY_PROFILE_GROUP action.",
  ).optional(),
  customMirroringProfile: z.object({
    mirroringEndpointGroup: z.string().describe(
      "Required. Immutable. The target MirroringEndpointGroup. When a mirroring rule with this security profile attached matches a packet, a replica will be mirrored to the location-local target in this group.",
    ).optional(),
  }).describe(
    "CustomMirroringProfile defines out-of-band integration behavior (mirroring). It is used by mirroring rules with a MIRROR action.",
  ).optional(),
  description: z.string().describe(
    "Optional. An optional description of the profile. Max length 512 characters.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels as key value pairs.",
  ).optional(),
  name: z.string().describe(
    "Immutable. Identifier. Name of the SecurityProfile resource. It matches pattern `projects|organizations/*/locations/{location}/securityProfiles/{security_profile}`.",
  ).optional(),
  threatPreventionProfile: z.object({
    antivirusOverrides: z.array(z.object({
      action: z.enum([
        "THREAT_ACTION_UNSPECIFIED",
        "DEFAULT_ACTION",
        "ALLOW",
        "ALERT",
        "DENY",
      ]).describe(
        "Required. Threat action override. For some threat types, only a subset of actions applies.",
      ).optional(),
      protocol: z.enum([
        "PROTOCOL_UNSPECIFIED",
        "SMTP",
        "SMB",
        "POP3",
        "IMAP",
        "HTTP2",
        "HTTP",
        "FTP",
      ]).describe("Required. Protocol to match.").optional(),
    })).describe(
      "Optional. Configuration for overriding antivirus actions per protocol.",
    ).optional(),
    severityOverrides: z.array(z.object({
      action: z.enum([
        "THREAT_ACTION_UNSPECIFIED",
        "DEFAULT_ACTION",
        "ALLOW",
        "ALERT",
        "DENY",
      ]).describe("Required. Threat action override.").optional(),
      severity: z.enum([
        "SEVERITY_UNSPECIFIED",
        "INFORMATIONAL",
        "LOW",
        "MEDIUM",
        "HIGH",
        "CRITICAL",
      ]).describe("Required. Severity level to match.").optional(),
    })).describe(
      "Optional. Configuration for overriding threats actions by severity match.",
    ).optional(),
    threatOverrides: z.array(z.object({
      action: z.enum([
        "THREAT_ACTION_UNSPECIFIED",
        "DEFAULT_ACTION",
        "ALLOW",
        "ALERT",
        "DENY",
      ]).describe(
        "Required. Threat action override. For some threat types, only a subset of actions applies.",
      ).optional(),
      threatId: z.string().describe(
        "Required. Vendor-specific ID of a threat to override.",
      ).optional(),
      type: z.enum([
        "THREAT_TYPE_UNSPECIFIED",
        "UNKNOWN",
        "VULNERABILITY",
        "ANTIVIRUS",
        "SPYWARE",
        "DNS",
      ]).describe("Output only. Type of the threat (read only).").optional(),
    })).describe(
      "Optional. Configuration for overriding threats actions by threat_id match. If a threat is matched both by configuration provided in severity_overrides and threat_overrides, the threat_overrides action is applied.",
    ).optional(),
  }).describe(
    "ThreatPreventionProfile defines an action for specific threat signatures or severity levels.",
  ).optional(),
  type: z.enum([
    "PROFILE_TYPE_UNSPECIFIED",
    "THREAT_PREVENTION",
    "CUSTOM_MIRRORING",
    "CUSTOM_INTERCEPT",
    "URL_FILTERING",
  ]).describe(
    "Immutable. The single ProfileType that the SecurityProfile resource configures.",
  ).optional(),
  urlFilteringProfile: z.object({
    urlFilters: z.array(z.object({
      filteringAction: z.enum([
        "URL_FILTERING_ACTION_UNSPECIFIED",
        "ALLOW",
        "DENY",
      ]).describe("Required. The action taken when this filter is applied.")
        .optional(),
      priority: z.number().int().describe(
        "Required. The priority of this filter within the URL Filtering Profile. Lower integers indicate higher priorities. The priority of a filter must be unique within a URL Filtering Profile.",
      ).optional(),
      urls: z.array(z.string()).describe(
        "Required. The list of strings that a URL must match with for this filter to be applied.",
      ).optional(),
    })).describe(
      "Optional. The list of filtering configs in which each config defines an action to take for some URL match.",
    ).optional(),
  }).describe("UrlFilteringProfile defines filters based on URL.").optional(),
  securityProfileId: z.string().describe(
    'Required. Short name of the SecurityProfile resource to be created. This value should be 1-63 characters long, containing only letters, numbers, hyphens, and underscores, and should not start with a number. E.g. "security_profile1".',
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  customInterceptProfile: z.object({
    interceptEndpointGroup: z.string(),
  }).optional(),
  customMirroringProfile: z.object({
    mirroringEndpointGroup: z.string(),
  }).optional(),
  description: z.string().optional(),
  etag: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  threatPreventionProfile: z.object({
    antivirusOverrides: z.array(z.object({
      action: z.string(),
      protocol: z.string(),
    })),
    severityOverrides: z.array(z.object({
      action: z.string(),
      severity: z.string(),
    })),
    threatOverrides: z.array(z.object({
      action: z.string(),
      threatId: z.string(),
      type: z.string(),
    })),
  }).optional(),
  type: z.string().optional(),
  updateTime: z.string().optional(),
  urlFilteringProfile: z.object({
    urlFilters: z.array(z.object({
      filteringAction: z.string(),
      priority: z.number(),
      urls: z.array(z.string()),
    })),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  customInterceptProfile: z.object({
    interceptEndpointGroup: z.string().describe(
      "Required. The target InterceptEndpointGroup. When a firewall rule with this security profile attached matches a packet, the packet will be intercepted to the location-local target in this group.",
    ).optional(),
  }).describe(
    "CustomInterceptProfile defines in-band integration behavior (intercept). It is used by firewall rules with an APPLY_SECURITY_PROFILE_GROUP action.",
  ).optional(),
  customMirroringProfile: z.object({
    mirroringEndpointGroup: z.string().describe(
      "Required. Immutable. The target MirroringEndpointGroup. When a mirroring rule with this security profile attached matches a packet, a replica will be mirrored to the location-local target in this group.",
    ).optional(),
  }).describe(
    "CustomMirroringProfile defines out-of-band integration behavior (mirroring). It is used by mirroring rules with a MIRROR action.",
  ).optional(),
  description: z.string().describe(
    "Optional. An optional description of the profile. Max length 512 characters.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels as key value pairs.",
  ).optional(),
  name: z.string().describe(
    "Immutable. Identifier. Name of the SecurityProfile resource. It matches pattern `projects|organizations/*/locations/{location}/securityProfiles/{security_profile}`.",
  ).optional(),
  threatPreventionProfile: z.object({
    antivirusOverrides: z.array(z.object({
      action: z.enum([
        "THREAT_ACTION_UNSPECIFIED",
        "DEFAULT_ACTION",
        "ALLOW",
        "ALERT",
        "DENY",
      ]).describe(
        "Required. Threat action override. For some threat types, only a subset of actions applies.",
      ).optional(),
      protocol: z.enum([
        "PROTOCOL_UNSPECIFIED",
        "SMTP",
        "SMB",
        "POP3",
        "IMAP",
        "HTTP2",
        "HTTP",
        "FTP",
      ]).describe("Required. Protocol to match.").optional(),
    })).describe(
      "Optional. Configuration for overriding antivirus actions per protocol.",
    ).optional(),
    severityOverrides: z.array(z.object({
      action: z.enum([
        "THREAT_ACTION_UNSPECIFIED",
        "DEFAULT_ACTION",
        "ALLOW",
        "ALERT",
        "DENY",
      ]).describe("Required. Threat action override.").optional(),
      severity: z.enum([
        "SEVERITY_UNSPECIFIED",
        "INFORMATIONAL",
        "LOW",
        "MEDIUM",
        "HIGH",
        "CRITICAL",
      ]).describe("Required. Severity level to match.").optional(),
    })).describe(
      "Optional. Configuration for overriding threats actions by severity match.",
    ).optional(),
    threatOverrides: z.array(z.object({
      action: z.enum([
        "THREAT_ACTION_UNSPECIFIED",
        "DEFAULT_ACTION",
        "ALLOW",
        "ALERT",
        "DENY",
      ]).describe(
        "Required. Threat action override. For some threat types, only a subset of actions applies.",
      ).optional(),
      threatId: z.string().describe(
        "Required. Vendor-specific ID of a threat to override.",
      ).optional(),
      type: z.enum([
        "THREAT_TYPE_UNSPECIFIED",
        "UNKNOWN",
        "VULNERABILITY",
        "ANTIVIRUS",
        "SPYWARE",
        "DNS",
      ]).describe("Output only. Type of the threat (read only).").optional(),
    })).describe(
      "Optional. Configuration for overriding threats actions by threat_id match. If a threat is matched both by configuration provided in severity_overrides and threat_overrides, the threat_overrides action is applied.",
    ).optional(),
  }).describe(
    "ThreatPreventionProfile defines an action for specific threat signatures or severity levels.",
  ).optional(),
  type: z.enum([
    "PROFILE_TYPE_UNSPECIFIED",
    "THREAT_PREVENTION",
    "CUSTOM_MIRRORING",
    "CUSTOM_INTERCEPT",
    "URL_FILTERING",
  ]).describe(
    "Immutable. The single ProfileType that the SecurityProfile resource configures.",
  ).optional(),
  urlFilteringProfile: z.object({
    urlFilters: z.array(z.object({
      filteringAction: z.enum([
        "URL_FILTERING_ACTION_UNSPECIFIED",
        "ALLOW",
        "DENY",
      ]).describe("Required. The action taken when this filter is applied.")
        .optional(),
      priority: z.number().int().describe(
        "Required. The priority of this filter within the URL Filtering Profile. Lower integers indicate higher priorities. The priority of a filter must be unique within a URL Filtering Profile.",
      ).optional(),
      urls: z.array(z.string()).describe(
        "Required. The list of strings that a URL must match with for this filter to be applied.",
      ).optional(),
    })).describe(
      "Optional. The list of filtering configs in which each config defines an action to take for some URL match.",
    ).optional(),
  }).describe("UrlFilteringProfile defines filters based on URL.").optional(),
  securityProfileId: z.string().describe(
    'Required. Short name of the SecurityProfile resource to be created. This value should be 1-63 characters long, containing only letters, numbers, hyphens, and underscores, and should not start with a number. E.g. "security_profile1".',
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Network Security SecurityProfiles. Registered at `@swamp/gcp/networksecurity/securityprofiles`. */
export const model = {
  type: "@swamp/gcp/networksecurity/securityprofiles",
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
        "SecurityProfile is a resource that defines the behavior for one of many Profi...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a securityProfiles",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["customInterceptProfile"] !== undefined) {
          body["customInterceptProfile"] = g["customInterceptProfile"];
        }
        if (g["customMirroringProfile"] !== undefined) {
          body["customMirroringProfile"] = g["customMirroringProfile"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["threatPreventionProfile"] !== undefined) {
          body["threatPreventionProfile"] = g["threatPreventionProfile"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["urlFilteringProfile"] !== undefined) {
          body["urlFilteringProfile"] = g["urlFilteringProfile"];
        }
        if (g["securityProfileId"] !== undefined) {
          body["securityProfileId"] = g["securityProfileId"];
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
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
      description: "Get a securityProfiles",
      arguments: z.object({
        identifier: z.string().describe("The name of the securityProfiles"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Update securityProfiles attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["customInterceptProfile"] !== undefined) {
          body["customInterceptProfile"] = g["customInterceptProfile"];
        }
        if (g["customMirroringProfile"] !== undefined) {
          body["customMirroringProfile"] = g["customMirroringProfile"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["threatPreventionProfile"] !== undefined) {
          body["threatPreventionProfile"] = g["threatPreventionProfile"];
        }
        if (g["urlFilteringProfile"] !== undefined) {
          body["urlFilteringProfile"] = g["urlFilteringProfile"];
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
      description: "Delete the securityProfiles",
      arguments: z.object({
        identifier: z.string().describe("The name of the securityProfiles"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Sync securityProfiles state from GCP",
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
            String(g["parent"] ?? ""),
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
