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

// Auto-generated extension model for @swamp/aws/glue/session
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Glue Session (AWS::Glue::Session).
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
  Id: z.string().min(1).max(255).regex(
    new RegExp(
      "^[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDC00-\\uDBFF\\uDFFF\\t]*$",
    ),
  ).describe("The ID of the session."),
  Description: z.string().min(0).max(2048).regex(
    new RegExp(
      "^[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDC00-\\uDBFF\\uDFFF\\r\\n\\t]*$",
    ),
  ).describe("The description of the session.").optional(),
  Role: z.string().min(20).max(2048).regex(
    new RegExp("^arn:aws[^:]*:iam::[0-9]*:role/.+$"),
  ).describe("The IAM Role ARN."),
  Command: z.object({
    Name: z.string().min(1).max(255).regex(
      new RegExp(
        "^[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDC00-\\uDBFF\\uDFFF\\t]*$",
      ),
    ).describe(
      "Specifies the name of the SessionCommand. Can be 'glueetl' or 'gluestreaming'.",
    ).optional(),
    PythonVersion: z.string().regex(new RegExp("^([2-3]|3[.]9)$")).describe(
      "Specifies the Python version. The Python version indicates the version supported for jobs of type Spark.",
    ).optional(),
  }).describe("The SessionCommand that runs the job."),
  Timeout: z.number().int().min(1).describe(
    "The number of minutes before session times out.",
  ).optional(),
  IdleTimeout: z.number().int().describe(
    "The number of minutes when idle before session times out. Default is the value of Timeout.",
  ).optional(),
  DefaultArguments: z.record(
    z.string(),
    z.string().min(0).max(4096).regex(
      new RegExp(
        "^[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDC00-\\uDBFF\\uDFFF\\r\\n\\t]*$",
      ),
    ),
  ).describe("A map array of key-value pairs. Max is 75 pairs.").optional(),
  Connections: z.object({
    Connections: z.array(z.string().min(0).max(255)).describe(
      "A list of connection names used by the session.",
    ).optional(),
  }).describe("Specifies the connections used by the session.").optional(),
  MaxCapacity: z.number().describe(
    "The number of Glue data processing units (DPUs) that can be allocated when the job runs.",
  ).optional(),
  NumberOfWorkers: z.number().int().describe(
    "The number of workers of a defined WorkerType to use for the session.",
  ).optional(),
  WorkerType: z.enum([
    "Standard",
    "G.1X",
    "G.2X",
    "G.025X",
    "G.4X",
    "G.8X",
    "Z.2X",
  ]).describe(
    "The type of predefined worker that is allocated when a session runs.",
  ).optional(),
  SecurityConfiguration: z.string().min(1).max(255).regex(
    new RegExp(
      "^[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDC00-\\uDBFF\\uDFFF\\t]*$",
    ),
  ).describe(
    "The name of the SecurityConfiguration structure to be used with the session.",
  ).optional(),
  GlueVersion: z.string().min(1).max(255).regex(new RegExp("^(\\w+\\.)+\\w+$"))
    .describe(
      "The Glue version determines the versions of Apache Spark and Python that Glue supports. The GlueVersion must be greater than 2.0.",
    ).optional(),
  Tags: z.array(TagSchema).describe("The tags belonging to the session.")
    .optional(),
  RequestOrigin: z.string().min(1).max(128).regex(
    new RegExp("^[.\\-_A-Za-z0-9]+$"),
  ).describe("The origin of the request.").optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Id: z.string().optional(),
  Description: z.string().optional(),
  Role: z.string().optional(),
  Command: z.object({
    Name: z.string(),
    PythonVersion: z.string(),
  }).optional(),
  Timeout: z.number().optional(),
  IdleTimeout: z.number().optional(),
  DefaultArguments: z.record(z.string(), z.unknown()).optional(),
  Connections: z.object({
    Connections: z.array(z.string()),
  }).optional(),
  MaxCapacity: z.number().optional(),
  NumberOfWorkers: z.number().optional(),
  WorkerType: z.string().optional(),
  SecurityConfiguration: z.string().optional(),
  GlueVersion: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  RequestOrigin: z.string().optional(),
  CreatedOn: z.string().optional(),
  Status: z.string().optional(),
  Progress: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Id: z.string().min(1).max(255).regex(
    new RegExp(
      "^[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDC00-\\uDBFF\\uDFFF\\t]*$",
    ),
  ).describe("The ID of the session.").optional(),
  Description: z.string().min(0).max(2048).regex(
    new RegExp(
      "^[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDC00-\\uDBFF\\uDFFF\\r\\n\\t]*$",
    ),
  ).describe("The description of the session.").optional(),
  Role: z.string().min(20).max(2048).regex(
    new RegExp("^arn:aws[^:]*:iam::[0-9]*:role/.+$"),
  ).describe("The IAM Role ARN.").optional(),
  Command: z.object({
    Name: z.string().min(1).max(255).regex(
      new RegExp(
        "^[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDC00-\\uDBFF\\uDFFF\\t]*$",
      ),
    ).describe(
      "Specifies the name of the SessionCommand. Can be 'glueetl' or 'gluestreaming'.",
    ).optional(),
    PythonVersion: z.string().regex(new RegExp("^([2-3]|3[.]9)$")).describe(
      "Specifies the Python version. The Python version indicates the version supported for jobs of type Spark.",
    ).optional(),
  }).describe("The SessionCommand that runs the job.").optional(),
  Timeout: z.number().int().min(1).describe(
    "The number of minutes before session times out.",
  ).optional(),
  IdleTimeout: z.number().int().describe(
    "The number of minutes when idle before session times out. Default is the value of Timeout.",
  ).optional(),
  DefaultArguments: z.record(
    z.string(),
    z.string().min(0).max(4096).regex(
      new RegExp(
        "^[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDC00-\\uDBFF\\uDFFF\\r\\n\\t]*$",
      ),
    ),
  ).describe("A map array of key-value pairs. Max is 75 pairs.").optional(),
  Connections: z.object({
    Connections: z.array(z.string().min(0).max(255)).describe(
      "A list of connection names used by the session.",
    ).optional(),
  }).describe("Specifies the connections used by the session.").optional(),
  MaxCapacity: z.number().describe(
    "The number of Glue data processing units (DPUs) that can be allocated when the job runs.",
  ).optional(),
  NumberOfWorkers: z.number().int().describe(
    "The number of workers of a defined WorkerType to use for the session.",
  ).optional(),
  WorkerType: z.enum([
    "Standard",
    "G.1X",
    "G.2X",
    "G.025X",
    "G.4X",
    "G.8X",
    "Z.2X",
  ]).describe(
    "The type of predefined worker that is allocated when a session runs.",
  ).optional(),
  SecurityConfiguration: z.string().min(1).max(255).regex(
    new RegExp(
      "^[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDC00-\\uDBFF\\uDFFF\\t]*$",
    ),
  ).describe(
    "The name of the SecurityConfiguration structure to be used with the session.",
  ).optional(),
  GlueVersion: z.string().min(1).max(255).regex(new RegExp("^(\\w+\\.)+\\w+$"))
    .describe(
      "The Glue version determines the versions of Apache Spark and Python that Glue supports. The GlueVersion must be greater than 2.0.",
    ).optional(),
  Tags: z.array(TagSchema).describe("The tags belonging to the session.")
    .optional(),
  RequestOrigin: z.string().min(1).max(128).regex(
    new RegExp("^[.\\-_A-Za-z0-9]+$"),
  ).describe("The origin of the request.").optional(),
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

/** Swamp extension model for Glue Session. Registered at `@swamp/aws/glue/session`. */
export const model = {
  type: "@swamp/aws/glue/session",
  version: "2026.06.25.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Glue Session resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Glue Session",
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
          "AWS::Glue::Session",
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
      description: "Get a Glue Session",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue Session",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Glue::Session",
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
      description: "Update a Glue Session",
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
          "AWS::Glue::Session",
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
          "AWS::Glue::Session",
          identifier,
          currentState,
          desiredState,
          [
            "Id",
            "Description",
            "Role",
            "Command",
            "Timeout",
            "IdleTimeout",
            "DefaultArguments",
            "Connections",
            "MaxCapacity",
            "NumberOfWorkers",
            "WorkerType",
            "SecurityConfiguration",
            "GlueVersion",
            "RequestOrigin",
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
      description: "Delete a Glue Session",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue Session",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Glue::Session",
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
      description: "Sync Glue Session state from AWS",
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
            "AWS::Glue::Session",
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
