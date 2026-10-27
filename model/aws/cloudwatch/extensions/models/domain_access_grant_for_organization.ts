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

// Auto-generated extension model for @swamp/aws/cloudwatch/domain-access-grant-for-organization
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CloudWatch DomainAccessGrantForOrganization (AWS::CloudWatch::DomainAccessGrantForOrganization).
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

const PrincipalAttributeSchema = z.object({
  Key: z.string().min(1).max(128).describe("The attribute name."),
  Value: z.string().min(1).max(512).describe("The attribute value."),
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
    .describe("The name of the grant."),
  DomainId: z.string().regex(new RegExp("^d-[0-9a-z]{1,25}$")).describe(
    "The unique identifier of the organization domain the grant applies to.",
  ),
  Principal: z.object({
    PrincipalType: z.enum([
      "IDC_USER",
      "IDC_GROUP",
      "IAM_USER",
      "IAM_ROLE",
      "IAM_ROOT",
    ]).describe("The type of principal the grant is issued to."),
    PrincipalId: z.string().min(1).max(2048).regex(
      new RegExp("^[a-zA-Z0-9][a-zA-Z0-9:/_+=,.@-]*$"),
    ).describe(
      "The identifier of the principal, such as an IAM role ARN or an Identity Center user ID.",
    ).optional(),
    PrincipalAttributes: z.array(PrincipalAttributeSchema).describe(
      "Attribute key-value pairs that select the principals the grant applies to.",
    ).optional(),
  }).describe(
    "The principal the grant is issued to. Supply PrincipalId, or PrincipalAttributes for an attribute-based grant.",
  ),
  Permission: z.enum(["ADMIN"]).describe(
    "The permission level the grant confers. Organization grants are administrative only.",
  ),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  GrantId: z.string().optional(),
  Name: z.string().optional(),
  DomainId: z.string().optional(),
  Principal: z.object({
    PrincipalType: z.string(),
    PrincipalId: z.string(),
    PrincipalAttributes: z.array(PrincipalAttributeSchema),
  }).optional(),
  Permission: z.string().optional(),
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
    .describe("The name of the grant.").optional(),
  DomainId: z.string().regex(new RegExp("^d-[0-9a-z]{1,25}$")).describe(
    "The unique identifier of the organization domain the grant applies to.",
  ).optional(),
  Principal: z.object({
    PrincipalType: z.enum([
      "IDC_USER",
      "IDC_GROUP",
      "IAM_USER",
      "IAM_ROLE",
      "IAM_ROOT",
    ]).describe("The type of principal the grant is issued to.").optional(),
    PrincipalId: z.string().min(1).max(2048).regex(
      new RegExp("^[a-zA-Z0-9][a-zA-Z0-9:/_+=,.@-]*$"),
    ).describe(
      "The identifier of the principal, such as an IAM role ARN or an Identity Center user ID.",
    ).optional(),
    PrincipalAttributes: z.array(PrincipalAttributeSchema).describe(
      "Attribute key-value pairs that select the principals the grant applies to.",
    ).optional(),
  }).describe(
    "The principal the grant is issued to. Supply PrincipalId, or PrincipalAttributes for an attribute-based grant.",
  ).optional(),
  Permission: z.enum(["ADMIN"]).describe(
    "The permission level the grant confers. Organization grants are administrative only.",
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

/** Swamp extension model for CloudWatch DomainAccessGrantForOrganization. Registered at `@swamp/aws/cloudwatch/domain-access-grant-for-organization`. */
export const model = {
  type: "@swamp/aws/cloudwatch/domain-access-grant-for-organization",
  version: "2026.10.27.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "CloudWatch DomainAccessGrantForOrganization resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CloudWatch DomainAccessGrantForOrganization",
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
          "AWS::CloudWatch::DomainAccessGrantForOrganization",
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
      description: "Get a CloudWatch DomainAccessGrantForOrganization",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudWatch DomainAccessGrantForOrganization",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CloudWatch::DomainAccessGrantForOrganization",
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
      description: "Delete a CloudWatch DomainAccessGrantForOrganization",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudWatch DomainAccessGrantForOrganization",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CloudWatch::DomainAccessGrantForOrganization",
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
      description:
        "Sync CloudWatch DomainAccessGrantForOrganization state from AWS",
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
            "AWS::CloudWatch::DomainAccessGrantForOrganization",
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
      description: "List CloudWatch DomainAccessGrantForOrganization resources",
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
          "AWS::CloudWatch::DomainAccessGrantForOrganization",
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
