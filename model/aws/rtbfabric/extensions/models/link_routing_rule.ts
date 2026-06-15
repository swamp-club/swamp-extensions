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

// Auto-generated extension model for @swamp/aws/rtbfabric/link-routing-rule
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for RTBFabric LinkRoutingRule (AWS::RTBFabric::LinkRoutingRule).
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

const QueryStringKeyValuePairSchema = z.object({
  Key: z.string().min(1).max(128).regex(new RegExp("^[A-Za-z0-9._~-]+$"))
    .describe("Query string key — RFC 3986 unreserved characters."),
  Value: z.string().min(1).max(128).regex(new RegExp("^[A-Za-z0-9._~-]+$"))
    .describe("Query string value — RFC 3986 unreserved characters."),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ).optional(),
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
  GatewayId: z.string().regex(new RegExp("^rtb-gw-[a-z0-9-]{1,25}$")),
  LinkId: z.string().regex(new RegExp("^link-[a-z0-9-]{1,25}$")),
  Priority: z.number().int().min(1).max(1000),
  Conditions: z.object({
    HostHeader: z.string().min(1).max(255).regex(
      new RegExp("^[A-Za-z0-9._~-]+$"),
    ).describe(
      "Exact host match — RFC 3986 unreserved characters. Mutually exclusive with HostHeaderWildcard.",
    ).optional(),
    HostHeaderWildcard: z.string().min(3).max(255).regex(
      new RegExp("^[A-Za-z0-9._~*-]+$"),
    ).describe(
      "Wildcard host pattern (e.g., *.example.com) — RFC 3986 unreserved characters plus *. Mutually exclusive with HostHeader.",
    ).optional(),
    PathPrefix: z.string().min(1).max(128).regex(
      new RegExp("^/[A-Za-z0-9._~/-]*$"),
    ).describe(
      "Path prefix matching — strict starts-with, must start with /. Mutually exclusive with PathExact.",
    ).optional(),
    PathExact: z.string().min(1).max(128).regex(
      new RegExp("^/[A-Za-z0-9._~/-]*$"),
    ).describe(
      "Exact path match — must start with /. Mutually exclusive with PathPrefix.",
    ).optional(),
    QueryStringEquals: QueryStringKeyValuePairSchema.describe(
      "Query string key=value pair match (single pair).",
    ).optional(),
    QueryStringExists: z.string().min(1).max(128).regex(
      new RegExp("^[A-Za-z0-9._~-]+$"),
    ).describe("Query string key presence check (any value accepted).")
      .optional(),
  }).describe(
    "Conditions for a routing rule. All non-null fields must match (AND logic). At least one field must be set. HostHeader and HostHeaderWildcard are mutually exclusive. PathPrefix and PathExact are mutually exclusive.",
  ),
  Tags: z.array(TagSchema).describe("Tags to assign to the LinkRoutingRule.")
    .optional(),
});

const StateSchema = z.object({
  GatewayId: z.string().optional(),
  LinkId: z.string().optional(),
  RuleId: z.string().optional(),
  Priority: z.number().optional(),
  Conditions: z.object({
    HostHeader: z.string(),
    HostHeaderWildcard: z.string(),
    PathPrefix: z.string(),
    PathExact: z.string(),
    QueryStringEquals: QueryStringKeyValuePairSchema,
    QueryStringExists: z.string(),
  }).optional(),
  Status: z.string().optional(),
  CreatedTimestamp: z.string().optional(),
  UpdatedTimestamp: z.string().optional(),
  Arn: z.string(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  GatewayId: z.string().regex(new RegExp("^rtb-gw-[a-z0-9-]{1,25}$"))
    .optional(),
  LinkId: z.string().regex(new RegExp("^link-[a-z0-9-]{1,25}$")).optional(),
  Priority: z.number().int().min(1).max(1000).optional(),
  Conditions: z.object({
    HostHeader: z.string().min(1).max(255).regex(
      new RegExp("^[A-Za-z0-9._~-]+$"),
    ).describe(
      "Exact host match — RFC 3986 unreserved characters. Mutually exclusive with HostHeaderWildcard.",
    ).optional(),
    HostHeaderWildcard: z.string().min(3).max(255).regex(
      new RegExp("^[A-Za-z0-9._~*-]+$"),
    ).describe(
      "Wildcard host pattern (e.g., *.example.com) — RFC 3986 unreserved characters plus *. Mutually exclusive with HostHeader.",
    ).optional(),
    PathPrefix: z.string().min(1).max(128).regex(
      new RegExp("^/[A-Za-z0-9._~/-]*$"),
    ).describe(
      "Path prefix matching — strict starts-with, must start with /. Mutually exclusive with PathExact.",
    ).optional(),
    PathExact: z.string().min(1).max(128).regex(
      new RegExp("^/[A-Za-z0-9._~/-]*$"),
    ).describe(
      "Exact path match — must start with /. Mutually exclusive with PathPrefix.",
    ).optional(),
    QueryStringEquals: QueryStringKeyValuePairSchema.describe(
      "Query string key=value pair match (single pair).",
    ).optional(),
    QueryStringExists: z.string().min(1).max(128).regex(
      new RegExp("^[A-Za-z0-9._~-]+$"),
    ).describe("Query string key presence check (any value accepted).")
      .optional(),
  }).describe(
    "Conditions for a routing rule. All non-null fields must match (AND logic). At least one field must be set. HostHeader and HostHeaderWildcard are mutually exclusive. PathPrefix and PathExact are mutually exclusive.",
  ).optional(),
  Tags: z.array(TagSchema).describe("Tags to assign to the LinkRoutingRule.")
    .optional(),
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

/** Swamp extension model for RTBFabric LinkRoutingRule. Registered at `@swamp/aws/rtbfabric/link-routing-rule`. */
export const model = {
  type: "@swamp/aws/rtbfabric/link-routing-rule",
  version: "2026.06.15.1",
  upgrades: [
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
    {
      toVersion: "2026.06.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "RTBFabric LinkRoutingRule resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a RTBFabric LinkRoutingRule",
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
          "AWS::RTBFabric::LinkRoutingRule",
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
      description: "Get a RTBFabric LinkRoutingRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RTBFabric LinkRoutingRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::RTBFabric::LinkRoutingRule",
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
      description: "Update a RTBFabric LinkRoutingRule",
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
          "AWS::RTBFabric::LinkRoutingRule",
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
          "AWS::RTBFabric::LinkRoutingRule",
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
      description: "Delete a RTBFabric LinkRoutingRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RTBFabric LinkRoutingRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::RTBFabric::LinkRoutingRule",
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
      description: "Sync RTBFabric LinkRoutingRule state from AWS",
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
            "AWS::RTBFabric::LinkRoutingRule",
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
