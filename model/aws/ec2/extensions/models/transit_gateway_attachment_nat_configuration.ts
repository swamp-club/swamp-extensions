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

// Auto-generated extension model for @swamp/aws/ec2/transit-gateway-attachment-nat-configuration
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EC2 TransitGatewayAttachmentNatConfiguration (AWS::EC2::TransitGatewayAttachmentNatConfiguration).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const NatRuleSchema = z.object({
  RuleNumber: z.number().int().min(1).max(32766).describe("The rule number."),
  MatchSourceCidr: z.string().min(1).max(18).describe(
    "The source CIDR that the rule matches on.",
  ),
  NatCidr: z.string().min(1).max(18).describe(
    "The CIDR that the matched source addresses are translated to.",
  ),
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
  TransitGatewayAttachmentId: z.string().regex(
    new RegExp("^tgw-attach-[0-9a-f]{8,34}$"),
  ).describe("The ID of the transit gateway attachment to configure NAT on."),
  NatGatewayRules: z.array(NatRuleSchema).describe(
    "The complete set of NAT rules for the attachment. Updating this property replaces the entire rule set: rules omitted from the new value are removed.",
  ),
  NatGatewaySupport: z.enum(["enable", "disable"]).describe(
    "Whether NAT gateway support is enabled on the attachment. Set to disable to stage NAT rules without activating them; the rules are retained and become active when this is later set to enable.",
  ),
  NatSystemRouteSupport: z.enum(["enable", "disable"]).describe(
    "Whether routes for the NAT CIDRs are installed into the transit gateway route tables associated with the attachment. Whether this is configurable depends on the attachment; where the value is forced, supplying the opposite value is rejected. Omitting this property leaves the setting to the service: on a new configuration the service applies the attachment's default, but on an attachment where the value is configurable it keeps the value already in effect rather than reverting to that default. Removing this property from a template, or deleting this resource, therefore leaves the setting at its last value rather than restoring the default, and a resource later created on the same attachment without this property inherits that value.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  TransitGatewayAttachmentId: z.string().optional(),
  NatGatewayRules: z.array(NatRuleSchema).optional(),
  NatGatewaySupport: z.string().optional(),
  NatSystemRouteSupport: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  TransitGatewayAttachmentId: z.string().regex(
    new RegExp("^tgw-attach-[0-9a-f]{8,34}$"),
  ).describe("The ID of the transit gateway attachment to configure NAT on.")
    .optional(),
  NatGatewayRules: z.array(NatRuleSchema).describe(
    "The complete set of NAT rules for the attachment. Updating this property replaces the entire rule set: rules omitted from the new value are removed.",
  ).optional(),
  NatGatewaySupport: z.enum(["enable", "disable"]).describe(
    "Whether NAT gateway support is enabled on the attachment. Set to disable to stage NAT rules without activating them; the rules are retained and become active when this is later set to enable.",
  ).optional(),
  NatSystemRouteSupport: z.enum(["enable", "disable"]).describe(
    "Whether routes for the NAT CIDRs are installed into the transit gateway route tables associated with the attachment. Whether this is configurable depends on the attachment; where the value is forced, supplying the opposite value is rejected. Omitting this property leaves the setting to the service: on a new configuration the service applies the attachment's default, but on an attachment where the value is configurable it keeps the value already in effect rather than reverting to that default. Removing this property from a template, or deleting this resource, therefore leaves the setting at its last value rather than restoring the default, and a resource later created on the same attachment without this property inherits that value.",
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

/** Swamp extension model for EC2 TransitGatewayAttachmentNatConfiguration. Registered at `@swamp/aws/ec2/transit-gateway-attachment-nat-configuration`. */
export const model = {
  type: "@swamp/aws/ec2/transit-gateway-attachment-nat-configuration",
  version: "2026.10.23.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "EC2 TransitGatewayAttachmentNatConfiguration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 TransitGatewayAttachmentNatConfiguration",
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
          "AWS::EC2::TransitGatewayAttachmentNatConfiguration",
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
      description: "Get a EC2 TransitGatewayAttachmentNatConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 TransitGatewayAttachmentNatConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EC2::TransitGatewayAttachmentNatConfiguration",
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
      description: "Update a EC2 TransitGatewayAttachmentNatConfiguration",
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
        const currentState = await readResource(
          "AWS::EC2::TransitGatewayAttachmentNatConfiguration",
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
          "AWS::EC2::TransitGatewayAttachmentNatConfiguration",
          identifier,
          currentState,
          desiredState,
          ["TransitGatewayAttachmentId"],
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
      description: "Delete a EC2 TransitGatewayAttachmentNatConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 TransitGatewayAttachmentNatConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EC2::TransitGatewayAttachmentNatConfiguration",
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
        "Sync EC2 TransitGatewayAttachmentNatConfiguration state from AWS",
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
            "AWS::EC2::TransitGatewayAttachmentNatConfiguration",
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
      description:
        "List EC2 TransitGatewayAttachmentNatConfiguration resources",
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
          "AWS::EC2::TransitGatewayAttachmentNatConfiguration",
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
