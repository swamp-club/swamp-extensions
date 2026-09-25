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

// Auto-generated extension model for @swamp/aws/mediatailor/function
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for MediaTailor Function (AWS::MediaTailor::Function).
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

const FunctionRefSchema = z.object({
  RunCondition: z.string().describe(
    "An optional expression that evaluates to a boolean. MediaTailor evaluates this expression immediately before running the child function, using the accumulated state at that point. If the expression evaluates to false, MediaTailor skips the child function. If omitted, the child function always runs.",
  ).optional(),
  FunctionId: z.string().describe(
    "The identifier of the child function to execute.",
  ).optional(),
  Alias: z.string().describe(
    "An optional alternate name for the child function within the executor. MediaTailor uses this value as the namespace for the child function's output. If omitted, MediaTailor uses the function identifier. The resolved namespace must be unique across all child functions in the list.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string(),
  Value: z.string(),
});

const GlobalArgsSchema = z.object({
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
  FunctionId: z.string().describe("The unique identifier for the function."),
  FunctionType: z.enum([
    "HTTP_REQUEST",
    "CUSTOM_OUTPUT",
    "CONCURRENT_EXECUTOR",
    "SEQUENTIAL_EXECUTOR",
  ]).describe(
    "The type of the function. Determines which configuration object is used.",
  ),
  Description: z.string().describe("A description of the function.").optional(),
  HttpRequestConfiguration: z.object({
    Runtime: z.enum(["JSONATA"]).describe(
      "The runtime environment for the function expression language.",
    ),
    Output: z.record(z.string(), z.string()).describe(
      "A map of output key-value pairs. Keys must start with session., temp., avail., scte., or be a valid adsRequest directive.",
    ).optional(),
    MethodType: z.enum(["GET", "POST"]).describe(
      "The HTTP method type for the request.",
    ),
    RequestTimeoutMilliseconds: z.number().int().describe(
      "The timeout in milliseconds for the HTTP request. Maximum value is 2000.",
    ),
    Url: z.string().describe("The URL endpoint for the HTTP request."),
    Body: z.string().describe("The body of the HTTP request.").optional(),
    Headers: z.record(z.string(), z.string()).describe(
      "A map of HTTP headers to include in the request.",
    ).optional(),
  }).describe("Configuration for HTTP request functions.").optional(),
  CustomOutputConfiguration: z.object({
    Runtime: z.enum(["JSONATA"]).describe(
      "The runtime environment for the function expression language.",
    ),
    Output: z.record(z.string(), z.string()).describe(
      "A map of output key-value pairs that define the custom output.",
    ).optional(),
  }).describe("Configuration for custom output functions.").optional(),
  ConcurrentExecutorConfiguration: z.object({
    Runtime: z.enum(["JSONATA"]).describe(
      "The expression language used to evaluate expressions in the function configuration. Set this to JSONATA.",
    ),
    Output: z.record(z.string(), z.string()).describe(
      "A map of output bindings that controls which bindings the executor commits to the session state after all child functions complete. Each key is a namespaced output path, and each value is an expression that MediaTailor evaluates against the combined results of the child functions.",
    ),
    FunctionList: z.array(FunctionRefSchema).describe(
      "The list of 1 to 10 child functions that MediaTailor runs in parallel. Each entry specifies a child function to execute and an optional run condition expression that controls whether the function runs. Child functions cannot themselves be executors, and each child function's resolved namespace must be unique across the list.",
    ),
    TimeoutMilliseconds: z.number().int().min(100).max(2000).describe(
      "The maximum time, in milliseconds, for all child functions to complete. This timeout covers every function in the list, including any HTTP calls the child functions make. If the executor exceeds this timeout, MediaTailor discards all output from the executor and proceeds with default behavior. Valid values are 100 to 2000.",
    ),
    MaxConcurrency: z.number().int().min(1).max(2).describe(
      "The maximum number of child functions that MediaTailor runs simultaneously. When the list contains more functions than MaxConcurrency, MediaTailor starts additional functions as running ones complete, so that no more than MaxConcurrency functions run at the same time. Valid values are 1 to 2.",
    ),
  }).describe(
    "The configuration for a CONCURRENT_EXECUTOR function. Required when FunctionType is CONCURRENT_EXECUTOR.",
  ).optional(),
  SequentialExecutorConfiguration: z.object({
    Runtime: z.enum(["JSONATA"]).describe(
      "The expression language used to evaluate expressions in the function configuration. Set this to JSONATA.",
    ),
    Output: z.record(z.string(), z.string()).describe(
      "A map of output bindings that controls which bindings the sequence commits to the session state after all steps complete. Each key is a namespaced output path, and each value is an expression that MediaTailor evaluates against the accumulated results of the steps.",
    ).optional(),
    FunctionList: z.array(FunctionRefSchema).describe(
      "An ordered list of 1 to 10 steps. Each step specifies a child function to execute and an optional run condition expression that controls whether the step runs. MediaTailor executes the steps in order, passing data between steps through temporary data. Each step's resolved namespace must be unique across the list.",
    ),
    TimeoutMilliseconds: z.number().int().describe(
      "The maximum time, in milliseconds, for the entire sequence to complete. This timeout covers all steps, including any HTTP calls made by child functions. If the sequence exceeds this timeout, MediaTailor discards all output from the sequence and proceeds with default behavior. Valid values are 100 to 2000.",
    ),
  }).describe(
    "The configuration for a SEQUENTIAL_EXECUTOR function. A SEQUENTIAL_EXECUTOR runs an ordered list of child functions one at a time, passing data between them. For more information about functions, see Working with functions (https://docs.aws.amazon.com/mediatailor/latest/ug/monetization-functions.html) in the MediaTailor User Guide.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags to assign to the function resource.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  FunctionId: z.string(),
  FunctionType: z.string().optional(),
  Description: z.string().optional(),
  HttpRequestConfiguration: z.object({
    Runtime: z.string(),
    Output: z.record(z.string(), z.unknown()),
    MethodType: z.string(),
    RequestTimeoutMilliseconds: z.number(),
    Url: z.string(),
    Body: z.string(),
    Headers: z.record(z.string(), z.unknown()),
  }).optional(),
  CustomOutputConfiguration: z.object({
    Runtime: z.string(),
    Output: z.record(z.string(), z.unknown()),
  }).optional(),
  ConcurrentExecutorConfiguration: z.object({
    Runtime: z.string(),
    Output: z.record(z.string(), z.unknown()),
    FunctionList: z.array(FunctionRefSchema),
    TimeoutMilliseconds: z.number(),
    MaxConcurrency: z.number(),
  }).optional(),
  SequentialExecutorConfiguration: z.object({
    Runtime: z.string(),
    Output: z.record(z.string(), z.unknown()),
    FunctionList: z.array(FunctionRefSchema),
    TimeoutMilliseconds: z.number(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  FunctionId: z.string().describe("The unique identifier for the function.")
    .optional(),
  FunctionType: z.enum([
    "HTTP_REQUEST",
    "CUSTOM_OUTPUT",
    "CONCURRENT_EXECUTOR",
    "SEQUENTIAL_EXECUTOR",
  ]).describe(
    "The type of the function. Determines which configuration object is used.",
  ).optional(),
  Description: z.string().describe("A description of the function.").optional(),
  HttpRequestConfiguration: z.object({
    Runtime: z.enum(["JSONATA"]).describe(
      "The runtime environment for the function expression language.",
    ).optional(),
    Output: z.record(z.string(), z.string()).describe(
      "A map of output key-value pairs. Keys must start with session., temp., avail., scte., or be a valid adsRequest directive.",
    ).optional(),
    MethodType: z.enum(["GET", "POST"]).describe(
      "The HTTP method type for the request.",
    ).optional(),
    RequestTimeoutMilliseconds: z.number().int().describe(
      "The timeout in milliseconds for the HTTP request. Maximum value is 2000.",
    ).optional(),
    Url: z.string().describe("The URL endpoint for the HTTP request.")
      .optional(),
    Body: z.string().describe("The body of the HTTP request.").optional(),
    Headers: z.record(z.string(), z.string()).describe(
      "A map of HTTP headers to include in the request.",
    ).optional(),
  }).describe("Configuration for HTTP request functions.").optional(),
  CustomOutputConfiguration: z.object({
    Runtime: z.enum(["JSONATA"]).describe(
      "The runtime environment for the function expression language.",
    ).optional(),
    Output: z.record(z.string(), z.string()).describe(
      "A map of output key-value pairs that define the custom output.",
    ).optional(),
  }).describe("Configuration for custom output functions.").optional(),
  ConcurrentExecutorConfiguration: z.object({
    Runtime: z.enum(["JSONATA"]).describe(
      "The expression language used to evaluate expressions in the function configuration. Set this to JSONATA.",
    ).optional(),
    Output: z.record(z.string(), z.string()).describe(
      "A map of output bindings that controls which bindings the executor commits to the session state after all child functions complete. Each key is a namespaced output path, and each value is an expression that MediaTailor evaluates against the combined results of the child functions.",
    ).optional(),
    FunctionList: z.array(FunctionRefSchema).describe(
      "The list of 1 to 10 child functions that MediaTailor runs in parallel. Each entry specifies a child function to execute and an optional run condition expression that controls whether the function runs. Child functions cannot themselves be executors, and each child function's resolved namespace must be unique across the list.",
    ).optional(),
    TimeoutMilliseconds: z.number().int().min(100).max(2000).describe(
      "The maximum time, in milliseconds, for all child functions to complete. This timeout covers every function in the list, including any HTTP calls the child functions make. If the executor exceeds this timeout, MediaTailor discards all output from the executor and proceeds with default behavior. Valid values are 100 to 2000.",
    ).optional(),
    MaxConcurrency: z.number().int().min(1).max(2).describe(
      "The maximum number of child functions that MediaTailor runs simultaneously. When the list contains more functions than MaxConcurrency, MediaTailor starts additional functions as running ones complete, so that no more than MaxConcurrency functions run at the same time. Valid values are 1 to 2.",
    ).optional(),
  }).describe(
    "The configuration for a CONCURRENT_EXECUTOR function. Required when FunctionType is CONCURRENT_EXECUTOR.",
  ).optional(),
  SequentialExecutorConfiguration: z.object({
    Runtime: z.enum(["JSONATA"]).describe(
      "The expression language used to evaluate expressions in the function configuration. Set this to JSONATA.",
    ).optional(),
    Output: z.record(z.string(), z.string()).describe(
      "A map of output bindings that controls which bindings the sequence commits to the session state after all steps complete. Each key is a namespaced output path, and each value is an expression that MediaTailor evaluates against the accumulated results of the steps.",
    ).optional(),
    FunctionList: z.array(FunctionRefSchema).describe(
      "An ordered list of 1 to 10 steps. Each step specifies a child function to execute and an optional run condition expression that controls whether the step runs. MediaTailor executes the steps in order, passing data between steps through temporary data. Each step's resolved namespace must be unique across the list.",
    ).optional(),
    TimeoutMilliseconds: z.number().int().describe(
      "The maximum time, in milliseconds, for the entire sequence to complete. This timeout covers all steps, including any HTTP calls made by child functions. If the sequence exceeds this timeout, MediaTailor discards all output from the sequence and proceeds with default behavior. Valid values are 100 to 2000.",
    ).optional(),
  }).describe(
    "The configuration for a SEQUENTIAL_EXECUTOR function. A SEQUENTIAL_EXECUTOR runs an ordered list of child functions one at a time, passing data between them. For more information about functions, see Working with functions (https://docs.aws.amazon.com/mediatailor/latest/ug/monetization-functions.html) in the MediaTailor User Guide.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags to assign to the function resource.",
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

/** Swamp extension model for MediaTailor Function. Registered at `@swamp/aws/mediatailor/function`. */
export const model = {
  type: "@swamp/aws/mediatailor/function",
  version: "2026.09.25.1",
  upgrades: [
    {
      toVersion: "2026.08.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.25.1",
      description: "Added: ConcurrentExecutorConfiguration",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "MediaTailor Function resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MediaTailor Function",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::MediaTailor::Function",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.FunctionId ?? g.FunctionId)?.toString() ?? "current")
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
      description: "Get a MediaTailor Function",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaTailor Function",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::MediaTailor::Function",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.FunctionId ?? context.globalArgs.FunctionId)?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a MediaTailor Function",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.FunctionId?.toString() ?? "current").replace(
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
        const identifier = existing.FunctionId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::MediaTailor::Function",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::MediaTailor::Function",
          identifier,
          currentState,
          desiredState,
          ["FunctionId"],
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
      description: "Delete a MediaTailor Function",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaTailor Function",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::MediaTailor::Function",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.FunctionId?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync MediaTailor Function state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.FunctionId?.toString() ?? "current").replace(
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
        const identifier = existing.FunctionId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::MediaTailor::Function",
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
      description: "List MediaTailor Function resources",
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
          "AWS::MediaTailor::Function",
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
            (item.properties?.FunctionId?.toString() ?? item.identifier)
              .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
