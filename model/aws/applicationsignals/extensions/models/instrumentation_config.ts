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

// Auto-generated extension model for @swamp/aws/applicationsignals/instrumentation-config
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ApplicationSignals InstrumentationConfig (AWS::ApplicationSignals::InstrumentationConfig).
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

const CodeLocationSchema = z.object({
  Language: z.enum(["Java", "Python", "Javascript"]).describe(
    "The programming language for this instrumentation point.",
  ),
  CodeUnit: z.string().min(1).max(128).describe(
    "The package, module, or namespace that contains the target code.",
  ).optional(),
  ClassName: z.string().min(1).max(128).describe(
    "The class or type name that contains the method.",
  ).optional(),
  MethodName: z.string().min(1).max(80).describe(
    "The method or function name to instrument.",
  ).optional(),
  FilePath: z.string().min(1).max(1024).describe(
    "The source file path relative to the project or source root.",
  ),
  LineNumber: z.number().int().min(1).describe("The line number to instrument.")
    .optional(),
});

const CaptureLimitsConfigSchema = z.object({
  MaxHits: z.number().int().min(1).max(1000).describe(
    "Maximum number of times the instrumentation point can be hit before disabled.",
  ).optional(),
  MaxStringLength: z.number().int().min(1).max(255).describe(
    "Maximum length of captured string values in characters.",
  ).optional(),
  MaxCollectionWidth: z.number().int().min(1).max(20).describe(
    "Maximum number of items to capture from any collection.",
  ).optional(),
  MaxCollectionDepth: z.number().int().min(1).max(5).describe(
    "Maximum nesting depth to traverse inside collections.",
  ).optional(),
  MaxStackFrames: z.number().int().min(1).max(20).describe(
    "Maximum number of stack frames to capture.",
  ).optional(),
  MaxStackTraceSize: z.number().int().min(1).max(1000).describe(
    "Maximum total size in bytes of a captured stack trace.",
  ).optional(),
  MaxObjectDepth: z.number().int().min(1).max(5).describe(
    "Maximum depth for nested object traversal.",
  ).optional(),
  MaxFieldsPerObject: z.number().int().min(1).max(20).describe(
    "Maximum number of fields to capture for any object.",
  ).optional(),
});

const CodeCaptureConfigurationSchema = z.object({
  CaptureArguments: z.array(z.string().min(1).max(80)).describe(
    "The function arguments to capture.",
  ).optional(),
  CaptureReturn: z.boolean().describe(
    "Whether to capture the return value. Defaults to false.",
  ).optional(),
  CaptureStackTrace: z.boolean().describe(
    "Whether to capture a stack trace. Defaults to true.",
  ).optional(),
  CaptureLocals: z.array(z.string().min(1).max(80)).describe(
    "The local variables to capture by name.",
  ).optional(),
  CaptureLimits: CaptureLimitsConfigSchema.describe(
    "Safety limits that bound what is captured.",
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The tag key."),
  Value: z.string().min(0).max(256).describe("The tag value."),
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
  InstrumentationType: z.enum(["BREAKPOINT", "PROBE"]).describe(
    "Type of instrumentation: BREAKPOINT (temporary, expires after 24 hours) or PROBE (permanent, persists until deleted).",
  ),
  Service: z.string().min(1).max(255).regex(
    new RegExp("^[A-Za-z0-9:/+=,.@_-]+$"),
  ).describe(
    "The name of the service to instrument. This should match the service.name resource attribute reported by the application.",
  ),
  Environment: z.string().min(1).max(255).regex(
    new RegExp("^[A-Za-z0-9:/+=,.@_-]+$"),
  ).describe("The environment that the service is running in."),
  SignalType: z.enum(["SNAPSHOT"]).describe(
    "The telemetry signal type to emit for this instrumentation. The supported value is SNAPSHOT.",
  ),
  Location: z.object({
    CodeLocation: CodeLocationSchema.describe(
      "Identifies a code location to instrument.",
    ),
  }).describe("The location where instrumentation should be applied."),
  Description: z.string().min(1).max(50).describe(
    "An optional short description that explains the purpose of this instrumentation.",
  ).optional(),
  ExpiresAt: z.string().describe(
    "The timestamp after which this configuration is no longer served. For BREAKPOINT only; defaults to 24 hours.",
  ).optional(),
  AttributeFilters: z.array(z.record(z.string(), z.string().min(1).max(100)))
    .describe(
      "Client-side filters that target specific instances. Each object is AND-matched on keys, multiple objects are OR-matched.",
    ).optional(),
  CaptureConfiguration: z.object({
    CodeCapture: CodeCaptureConfigurationSchema.describe(
      "Defines what data to capture for code-level instrumentation.",
    ),
  }).describe(
    "Specifies what to capture when the instrumentation point is hit.",
  ),
  Tags: z.array(TagSchema).describe(
    "An optional list of key-value pairs to associate with the instrumentation configuration.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  InstrumentationType: z.string(),
  Service: z.string(),
  Environment: z.string(),
  SignalType: z.string(),
  Location: z.object({
    CodeLocation: CodeLocationSchema,
  }).optional(),
  LocationHash: z.string(),
  Description: z.string().optional(),
  ExpiresAt: z.string().optional(),
  AttributeFilters: z.array(z.record(z.string(), z.unknown())).optional(),
  CaptureConfiguration: z.object({
    CodeCapture: CodeCaptureConfigurationSchema,
  }).optional(),
  CreatedAt: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  InstrumentationType: z.enum(["BREAKPOINT", "PROBE"]).describe(
    "Type of instrumentation: BREAKPOINT (temporary, expires after 24 hours) or PROBE (permanent, persists until deleted).",
  ).optional(),
  Service: z.string().min(1).max(255).regex(
    new RegExp("^[A-Za-z0-9:/+=,.@_-]+$"),
  ).describe(
    "The name of the service to instrument. This should match the service.name resource attribute reported by the application.",
  ).optional(),
  Environment: z.string().min(1).max(255).regex(
    new RegExp("^[A-Za-z0-9:/+=,.@_-]+$"),
  ).describe("The environment that the service is running in.").optional(),
  SignalType: z.enum(["SNAPSHOT"]).describe(
    "The telemetry signal type to emit for this instrumentation. The supported value is SNAPSHOT.",
  ).optional(),
  Location: z.object({
    CodeLocation: CodeLocationSchema.describe(
      "Identifies a code location to instrument.",
    ).optional(),
  }).describe("The location where instrumentation should be applied.")
    .optional(),
  Description: z.string().min(1).max(50).describe(
    "An optional short description that explains the purpose of this instrumentation.",
  ).optional(),
  ExpiresAt: z.string().describe(
    "The timestamp after which this configuration is no longer served. For BREAKPOINT only; defaults to 24 hours.",
  ).optional(),
  AttributeFilters: z.array(z.record(z.string(), z.string().min(1).max(100)))
    .describe(
      "Client-side filters that target specific instances. Each object is AND-matched on keys, multiple objects are OR-matched.",
    ).optional(),
  CaptureConfiguration: z.object({
    CodeCapture: CodeCaptureConfigurationSchema.describe(
      "Defines what data to capture for code-level instrumentation.",
    ).optional(),
  }).describe(
    "Specifies what to capture when the instrumentation point is hit.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An optional list of key-value pairs to associate with the instrumentation configuration.",
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

/** Swamp extension model for ApplicationSignals InstrumentationConfig. Registered at `@swamp/aws/applicationsignals/instrumentation-config`. */
export const model = {
  type: "@swamp/aws/applicationsignals/instrumentation-config",
  version: "2026.10.06.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ApplicationSignals InstrumentationConfig resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ApplicationSignals InstrumentationConfig",
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
          "AWS::ApplicationSignals::InstrumentationConfig",
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
      description: "Get a ApplicationSignals InstrumentationConfig",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApplicationSignals InstrumentationConfig",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ApplicationSignals::InstrumentationConfig",
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
      description: "Update a ApplicationSignals InstrumentationConfig",
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
        const idParts = [
          existing.InstrumentationType?.toString(),
          existing.Service?.toString(),
          existing.Environment?.toString(),
          existing.SignalType?.toString(),
          existing.LocationHash?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::ApplicationSignals::InstrumentationConfig",
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
          "AWS::ApplicationSignals::InstrumentationConfig",
          identifier,
          currentState,
          desiredState,
          [
            "InstrumentationType",
            "Service",
            "Environment",
            "SignalType",
            "Location",
            "Description",
            "ExpiresAt",
            "AttributeFilters",
            "CaptureConfiguration",
          ],
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
      description: "Delete a ApplicationSignals InstrumentationConfig",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApplicationSignals InstrumentationConfig",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ApplicationSignals::InstrumentationConfig",
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
        "Sync ApplicationSignals InstrumentationConfig state from AWS",
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
        const idParts = [
          existing.InstrumentationType?.toString(),
          existing.Service?.toString(),
          existing.Environment?.toString(),
          existing.SignalType?.toString(),
          existing.LocationHash?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::ApplicationSignals::InstrumentationConfig",
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
      description: "List ApplicationSignals InstrumentationConfig resources",
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
          "AWS::ApplicationSignals::InstrumentationConfig",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName = item.identifier.replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, "");
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
