// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/cloudwatch/access-grant
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CloudWatch AccessGrant (AWS::CloudWatch::AccessGrant).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const AccessGrantPrincipalAttributeSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The Identity Center user attribute to match on. One of userName, active, userStatus, displayName, email, name.givenName, name.familyName, enterprise.department, enterprise.division, enterprise.organization, enterprise.costCenter, or enterprise.employeeNumber.",
  ),
  Value: z.string().min(1).max(512).describe("The attribute value."),
});

const RowScopeSchema = z.object({
  Field: z.string().min(1).max(256).describe(
    "The field the allowlist applies to, for example serviceName or accountId.",
  ),
  Operator: z.enum(["IN"]).describe(
    "Match operator applied to this filter's values.",
  ),
  Values: z.array(z.string().min(1).max(256)).describe(
    "The values the field is matched against.",
  ),
});

const ResourceScopeSchema = z.object({
  ResourceType: z.string().describe(
    "The resource type name, for example DataSet or OmniDashboard.",
  ),
  ResourceArns: z.array(z.string()).describe(
    "Specific resource ARNs or ARN patterns. When set, actions are limited to these resources. When absent, defaults to all resources of the type.",
  ).optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "Tag-based conditions for dynamic resource scoping. Access applies only to resources carrying all of the specified tag key-value pairs.",
  ).optional(),
  SignalTypes: z.array(z.enum(["LOGS", "TRACES"])).describe(
    "Signal types this scope's row filtering applies to. Required when RowScopeGroups is set.",
  ).optional(),
  RowScopeGroups: z.array(z.array(RowScopeSchema)).describe(
    "Row-level filters for this scope, as an OR of AND-groups: a row is visible when it matches every filter in any one group. Requires SignalTypes.",
  ).optional(),
});

const ScopedActionsSchema = z.object({
  Actions: z.array(
    z.string().min(3).max(256).regex(
      new RegExp("^[a-z0-9][a-z0-9-]*:[A-Za-z][A-Za-z0-9]*$"),
    ),
  ).describe(
    "The actions this group applies to, each in vendor-code:Action form.",
  ),
  Resources: z.array(ResourceScopeSchema).describe(
    "Resource scopes constraining these actions to specific resources.",
  ).optional(),
  ContextConditions: z.record(z.string(), z.array(z.string())).describe(
    "Context conditions for fine-grained access control on these actions, as a map of condition keys to lists of allowed values.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The key name of the tag."),
  Value: z.string().min(0).max(256).describe("The value for the tag."),
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  Name: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe("A name that identifies the access grant."),
  DomainId: z.string().regex(new RegExp("^d-[0-9a-z]{1,25}$")).describe(
    "The unique identifier of the domain that contains the space.",
  ),
  SpaceId: z.string().regex(
    new RegExp(
      "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    ),
  ).describe(
    "The unique identifier of the space the access grant is scoped to.",
  ),
  Principal: z.object({
    PrincipalType: z.enum([
      "IDC_USER",
      "IDC_GROUP",
      "IAM_USER",
      "IAM_ROLE",
      "IAM_ROOT",
      "ACCESS_PROFILE",
      "ALERT",
      "AGENT",
    ]).describe("The type of principal receiving the grant."),
    PrincipalId: z.string().min(1).max(2048).regex(
      new RegExp("^[a-zA-Z0-9][a-zA-Z0-9:/_+=,.@-]*$"),
    ).describe(
      "The ID of the principal receiving the grant. An IAM principal ARN, an Identity Center UUID, or a service-defined identifier.",
    ).optional(),
    PrincipalAttributes: z.array(AccessGrantPrincipalAttributeSchema).describe(
      "Attribute conditions for attribute-based access. When provided, the grant targets any principal matching all specified conditions. Supported only for IDC_USER principals.",
    ).optional(),
  }).describe("The principal receiving the grant."),
  Permission: z.enum(["SPACE_ADMIN", "READ", "READ_WRITE_DELETE", "CUSTOM"])
    .describe(
      "The permission granted. Exactly one permission is granted per access grant.",
    ),
  ScopedActions: z.array(ScopedActionsSchema).describe(
    "Groups of actions to allow, each with the resource scopes and conditions that limit those actions.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  GrantId: z.string().optional(),
  Name: z.string().optional(),
  DomainId: z.string().optional(),
  SpaceId: z.string().optional(),
  Principal: z.object({
    PrincipalType: z.string(),
    PrincipalId: z.string(),
    PrincipalAttributes: z.array(AccessGrantPrincipalAttributeSchema),
  }).optional(),
  Permission: z.string().optional(),
  ScopedActions: z.array(ScopedActionsSchema).optional(),
  AccountId: z.string().optional(),
  GrantType: z.string().optional(),
  CreatedBy: z.string().optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe("A name that identifies the access grant.").optional(),
  DomainId: z.string().regex(new RegExp("^d-[0-9a-z]{1,25}$")).describe(
    "The unique identifier of the domain that contains the space.",
  ).optional(),
  SpaceId: z.string().regex(
    new RegExp(
      "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    ),
  ).describe(
    "The unique identifier of the space the access grant is scoped to.",
  ).optional(),
  Principal: z.object({
    PrincipalType: z.enum([
      "IDC_USER",
      "IDC_GROUP",
      "IAM_USER",
      "IAM_ROLE",
      "IAM_ROOT",
      "ACCESS_PROFILE",
      "ALERT",
      "AGENT",
    ]).describe("The type of principal receiving the grant.").optional(),
    PrincipalId: z.string().min(1).max(2048).regex(
      new RegExp("^[a-zA-Z0-9][a-zA-Z0-9:/_+=,.@-]*$"),
    ).describe(
      "The ID of the principal receiving the grant. An IAM principal ARN, an Identity Center UUID, or a service-defined identifier.",
    ).optional(),
    PrincipalAttributes: z.array(AccessGrantPrincipalAttributeSchema).describe(
      "Attribute conditions for attribute-based access. When provided, the grant targets any principal matching all specified conditions. Supported only for IDC_USER principals.",
    ).optional(),
  }).describe("The principal receiving the grant.").optional(),
  Permission: z.enum(["SPACE_ADMIN", "READ", "READ_WRITE_DELETE", "CUSTOM"])
    .describe(
      "The permission granted. Exactly one permission is granted per access grant.",
    ).optional(),
  ScopedActions: z.array(ScopedActionsSchema).describe(
    "Groups of actions to allow, each with the resource scopes and conditions that limit those actions.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
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

/** Swamp extension model for CloudWatch AccessGrant. Registered at `@swamp/aws/cloudwatch/access-grant`. */
export const model = {
  type: "@swamp/aws/cloudwatch/access-grant",
  version: "2026.10.30.1",
  upgrades: [
    {
      toVersion: "2026.10.30.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "CloudWatch AccessGrant resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CloudWatch AccessGrant",
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
          "AWS::CloudWatch::AccessGrant",
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
      description: "Get a CloudWatch AccessGrant",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudWatch AccessGrant",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CloudWatch::AccessGrant",
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
    delete: {
      description: "Delete a CloudWatch AccessGrant",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudWatch AccessGrant",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CloudWatch::AccessGrant",
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
      description: "Sync CloudWatch AccessGrant state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CloudWatch::AccessGrant",
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
    list: {
      description: "List CloudWatch AccessGrant resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
        resourceModel: z.string().describe(
          "JSON resource model for parent-scoped listing (e.g. parent identifier)",
        ).optional(),
      }),
      execute: async (
        args: { maxPages?: number; resourceModel?: string },
        context: any,
      ) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { items, nextToken } = await listResources(
          "AWS::CloudWatch::AccessGrant",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName =
            (item.properties?.Arn?.toString() ?? item.identifier).replace(
              /[\/\\]/g,
              "_",
            ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource("state", instanceName, {
            ...item.properties,
            _identifier: item.identifier,
          });
          dataHandles.push(handle);
        }
        return {
          dataHandles,
          result: { count: items.length, nextPageToken: nextToken },
        };
      },
    },
  },
};
