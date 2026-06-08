// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/fms/policy
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for FMS Policy (AWS::FMS::Policy).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const ResourceTagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().max(256).optional(),
});

const NetworkFirewallPolicySchema = z.object({
  FirewallDeploymentModel: z.enum(["DISTRIBUTED", "CENTRALIZED"]).describe(
    "Firewall deployment mode.",
  ),
});

const ThirdPartyFirewallPolicySchema = z.object({
  FirewallDeploymentModel: z.enum(["DISTRIBUTED", "CENTRALIZED"]).describe(
    "Firewall deployment mode.",
  ),
});

const NetworkAclEntrySchema = z.object({
  CidrBlock: z.string().regex(
    new RegExp(
      "^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\\/([0-9]|[1-2][0-9]|3[0-2]))$",
    ),
  ).describe("CIDR block.").optional(),
  Egress: z.boolean().describe("Whether the entry is an egress entry."),
  IcmpTypeCode: z.object({
    Code: z.number().int().min(0).max(255).describe("Code."),
    Type: z.number().int().min(0).max(255).describe("Type."),
  }).describe("ICMP type and code.").optional(),
  Ipv6CidrBlock: z.string().regex(
    new RegExp(
      "^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))(/(1[0-2]|[0-9]))?$",
    ),
  ).describe("IPv6 CIDR block.").optional(),
  PortRange: z.object({
    From: z.number().int().min(0).max(65535).describe("From Port."),
    To: z.number().int().min(0).max(65535).describe("To Port."),
  }).describe("Port range.").optional(),
  Protocol: z.string().regex(
    new RegExp(
      "^(tcp|udp|icmp|-1|([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))$",
    ),
  ).describe("Protocol."),
  RuleAction: z.enum(["allow", "deny"]).describe("Rule Action."),
});

const NetworkAclEntrySetSchema = z.object({
  FirstEntries: z.array(NetworkAclEntrySchema).describe(
    "NetworkAcl entry list.",
  ).optional(),
  ForceRemediateForFirstEntries: z.boolean(),
  LastEntries: z.array(NetworkAclEntrySchema).describe("NetworkAcl entry list.")
    .optional(),
  ForceRemediateForLastEntries: z.boolean(),
});

const NetworkAclCommonPolicySchema = z.object({
  NetworkAclEntrySet: NetworkAclEntrySetSchema.describe(
    "Network ACL entry set.",
  ),
});

const PolicyOptionSchema = z.object({
  NetworkFirewallPolicy: NetworkFirewallPolicySchema.describe(
    "Network firewall policy.",
  ).optional(),
  ThirdPartyFirewallPolicy: ThirdPartyFirewallPolicySchema.describe(
    "Third party firewall policy.",
  ).optional(),
  NetworkAclCommonPolicy: NetworkAclCommonPolicySchema.describe(
    "Network ACL common policy.",
  ).optional(),
});

const PolicyTagSchema = z.object({
  Key: z.string().min(1).max(128).regex(new RegExp("^([^\\s]*)$")),
  Value: z.string().max(256).regex(new RegExp("^([^\\s]*)$")),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessKeyId: z.string().meta({ sensitive: true }).describe(
    "AWS access key ID; overrides AWS_ACCESS_KEY_ID environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).describe(
    "AWS secret access key; overrides AWS_SECRET_ACCESS_KEY environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  sessionToken: z.string().meta({ sensitive: true }).describe(
    "AWS session token for temporary credentials; overrides AWS_SESSION_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  region: z.string().describe(
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  ExcludeMap: z.object({
    ACCOUNT: z.array(z.string().min(12).max(12).regex(new RegExp("^([0-9]*)$")))
      .optional(),
    ORGUNIT: z.array(
      z.string().min(16).max(68).regex(
        new RegExp("^(ou-[0-9a-z]{4,32}-[a-z0-9]{8,32})$"),
      ),
    ).optional(),
  }).describe("An FMS includeMap or excludeMap.").optional(),
  ExcludeResourceTags: z.boolean(),
  IncludeMap: z.object({
    ACCOUNT: z.array(z.string().min(12).max(12).regex(new RegExp("^([0-9]*)$")))
      .optional(),
    ORGUNIT: z.array(
      z.string().min(16).max(68).regex(
        new RegExp("^(ou-[0-9a-z]{4,32}-[a-z0-9]{8,32})$"),
      ),
    ).optional(),
  }).describe("An FMS includeMap or excludeMap.").optional(),
  PolicyName: z.string().min(1).max(1024).regex(
    new RegExp("^([a-zA-Z0-9_.:/=+\\-@\\s]+)$"),
  ),
  PolicyDescription: z.string().max(256).regex(
    new RegExp("^([a-zA-Z0-9_.:/=+\\-@\\s]+)$"),
  ).optional(),
  RemediationEnabled: z.boolean(),
  ResourceTags: z.array(ResourceTagSchema).optional(),
  ResourceTagLogicalOperator: z.enum(["AND", "OR"]).optional(),
  ResourceType: z.string().min(1).max(128).regex(new RegExp("^([^\\s]*)$"))
    .describe("An AWS resource type").optional(),
  ResourceTypeList: z.array(
    z.string().min(1).max(128).regex(new RegExp("^([^\\s]*)$")),
  ).optional(),
  ResourceSetIds: z.array(
    z.string().min(22).max(22).regex(new RegExp("^[a-z0-9A-Z]{22}$")),
  ).optional(),
  SecurityServicePolicyData: z.object({
    ManagedServiceData: z.string().min(1).max(30000).describe(
      "Firewall managed service data.",
    ).optional(),
    Type: z.enum([
      "WAF",
      "WAFV2",
      "SHIELD_ADVANCED",
      "SECURITY_GROUPS_COMMON",
      "SECURITY_GROUPS_CONTENT_AUDIT",
      "SECURITY_GROUPS_USAGE_AUDIT",
      "NETWORK_FIREWALL",
      "THIRD_PARTY_FIREWALL",
      "DNS_FIREWALL",
      "IMPORT_NETWORK_FIREWALL",
      "NETWORK_ACL_COMMON",
    ]).describe("Firewall policy type."),
    PolicyOption: PolicyOptionSchema.describe("Firewall policy option.")
      .optional(),
  }).describe("Firewall security service policy data."),
  DeleteAllPolicyResources: z.boolean().optional(),
  ResourcesCleanUp: z.boolean().optional(),
  Tags: z.array(PolicyTagSchema).optional(),
});

const StateSchema = z.object({
  ExcludeMap: z.object({
    ACCOUNT: z.array(z.string()),
    ORGUNIT: z.array(z.string()),
  }).optional(),
  ExcludeResourceTags: z.boolean().optional(),
  IncludeMap: z.object({
    ACCOUNT: z.array(z.string()),
    ORGUNIT: z.array(z.string()),
  }).optional(),
  Id: z.string(),
  PolicyName: z.string().optional(),
  PolicyDescription: z.string().optional(),
  RemediationEnabled: z.boolean().optional(),
  ResourceTags: z.array(ResourceTagSchema).optional(),
  ResourceTagLogicalOperator: z.string().optional(),
  ResourceType: z.string().optional(),
  ResourceTypeList: z.array(z.string()).optional(),
  ResourceSetIds: z.array(z.string()).optional(),
  SecurityServicePolicyData: z.object({
    ManagedServiceData: z.string(),
    Type: z.string(),
    PolicyOption: PolicyOptionSchema,
  }).optional(),
  Arn: z.string().optional(),
  DeleteAllPolicyResources: z.boolean().optional(),
  ResourcesCleanUp: z.boolean().optional(),
  Tags: z.array(PolicyTagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ExcludeMap: z.object({
    ACCOUNT: z.array(z.string().min(12).max(12).regex(new RegExp("^([0-9]*)$")))
      .optional(),
    ORGUNIT: z.array(
      z.string().min(16).max(68).regex(
        new RegExp("^(ou-[0-9a-z]{4,32}-[a-z0-9]{8,32})$"),
      ),
    ).optional(),
  }).describe("An FMS includeMap or excludeMap.").optional(),
  ExcludeResourceTags: z.boolean().optional(),
  IncludeMap: z.object({
    ACCOUNT: z.array(z.string().min(12).max(12).regex(new RegExp("^([0-9]*)$")))
      .optional(),
    ORGUNIT: z.array(
      z.string().min(16).max(68).regex(
        new RegExp("^(ou-[0-9a-z]{4,32}-[a-z0-9]{8,32})$"),
      ),
    ).optional(),
  }).describe("An FMS includeMap or excludeMap.").optional(),
  PolicyName: z.string().min(1).max(1024).regex(
    new RegExp("^([a-zA-Z0-9_.:/=+\\-@\\s]+)$"),
  ).optional(),
  PolicyDescription: z.string().max(256).regex(
    new RegExp("^([a-zA-Z0-9_.:/=+\\-@\\s]+)$"),
  ).optional(),
  RemediationEnabled: z.boolean().optional(),
  ResourceTags: z.array(ResourceTagSchema).optional(),
  ResourceTagLogicalOperator: z.enum(["AND", "OR"]).optional(),
  ResourceType: z.string().min(1).max(128).regex(new RegExp("^([^\\s]*)$"))
    .describe("An AWS resource type").optional(),
  ResourceTypeList: z.array(
    z.string().min(1).max(128).regex(new RegExp("^([^\\s]*)$")),
  ).optional(),
  ResourceSetIds: z.array(
    z.string().min(22).max(22).regex(new RegExp("^[a-z0-9A-Z]{22}$")),
  ).optional(),
  SecurityServicePolicyData: z.object({
    ManagedServiceData: z.string().min(1).max(30000).describe(
      "Firewall managed service data.",
    ).optional(),
    Type: z.enum([
      "WAF",
      "WAFV2",
      "SHIELD_ADVANCED",
      "SECURITY_GROUPS_COMMON",
      "SECURITY_GROUPS_CONTENT_AUDIT",
      "SECURITY_GROUPS_USAGE_AUDIT",
      "NETWORK_FIREWALL",
      "THIRD_PARTY_FIREWALL",
      "DNS_FIREWALL",
      "IMPORT_NETWORK_FIREWALL",
      "NETWORK_ACL_COMMON",
    ]).describe("Firewall policy type.").optional(),
    PolicyOption: PolicyOptionSchema.describe("Firewall policy option.")
      .optional(),
  }).describe("Firewall security service policy data.").optional(),
  DeleteAllPolicyResources: z.boolean().optional(),
  ResourcesCleanUp: z.boolean().optional(),
  Tags: z.array(PolicyTagSchema).optional(),
});

const _credentialKeys = new Set([
  "accessKeyId",
  "secretAccessKey",
  "sessionToken",
  "region",
]);

function _buildCredentials(g: Record<string, unknown>): AwsCredentials {
  return {
    accessKeyId: g.accessKeyId as string | undefined,
    secretAccessKey: g.secretAccessKey as string | undefined,
    sessionToken: g.sessionToken as string | undefined,
    region: g.region as string | undefined,
  };
}

/** Swamp extension model for FMS Policy. Registered at `@swamp/aws/fms/policy`. */
export const model = {
  type: "@swamp/aws/fms/policy",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
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
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.06.1",
      description: "Added: accessKeyId, secretAccessKey, sessionToken, region",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "FMS Policy resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a FMS Policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::FMS::Policy",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
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
    get: {
      description: "Get a FMS Policy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the FMS Policy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::FMS::Policy",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
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
      description: "Update a FMS Policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::FMS::Policy",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::FMS::Policy",
          identifier,
          currentState,
          desiredState,
          undefined,
          credentials,
        );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a FMS Policy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the FMS Policy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::FMS::Policy",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
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
      description: "Sync FMS Policy state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::FMS::Policy",
            identifier,
            credentials,
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
              identifier,
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
