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

// Auto-generated extension model for @swamp/aws/refactorspaces/route
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for RefactorSpaces Route (AWS::RefactorSpaces::Route).
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
  Key: z.string().min(1).max(128).regex(new RegExp("^(?!aws:).+")).describe(
    "A string used to identify this tag",
  ),
  Value: z.string().min(0).max(256).describe(
    "A string containing the value for the tag",
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
  ApplicationIdentifier: z.string().min(14).max(14).regex(
    new RegExp("^app-([0-9A-Za-z]{10}$)"),
  ),
  EnvironmentIdentifier: z.string().min(14).max(14).regex(
    new RegExp("^env-([0-9A-Za-z]{10}$)"),
  ),
  RouteType: z.enum(["DEFAULT", "URI_PATH"]),
  ServiceIdentifier: z.string().min(14).max(14).regex(
    new RegExp("^svc-([0-9A-Za-z]{10}$)"),
  ),
  DefaultRoute: z.object({
    ActivationState: z.enum(["INACTIVE", "ACTIVE"]),
  }).optional(),
  UriPathRoute: z.object({
    SourcePath: z.string().min(1).max(2048).regex(
      new RegExp("^(/([a-zA-Z0-9._:-]+|\\{[a-zA-Z0-9._:-]+\\}))+$"),
    ).optional(),
    ActivationState: z.enum(["INACTIVE", "ACTIVE"]),
    Methods: z.array(
      z.enum(["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]),
    ).optional(),
    IncludeChildPaths: z.boolean().optional(),
    AppendSourcePath: z.boolean().optional(),
  }).optional(),
  Tags: z.array(TagSchema).describe(
    "Metadata that you can assign to help organize the frameworks that you create. Each tag is a key-value pair.",
  ).optional(),
});

const StateSchema = z.object({
  PathResourceToId: z.string().optional(),
  Arn: z.string().optional(),
  ApplicationIdentifier: z.string(),
  EnvironmentIdentifier: z.string(),
  RouteIdentifier: z.string(),
  RouteType: z.string().optional(),
  ServiceIdentifier: z.string().optional(),
  DefaultRoute: z.object({
    ActivationState: z.string(),
  }).optional(),
  UriPathRoute: z.object({
    SourcePath: z.string(),
    ActivationState: z.string(),
    Methods: z.array(z.string()),
    IncludeChildPaths: z.boolean(),
    AppendSourcePath: z.boolean(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ApplicationIdentifier: z.string().min(14).max(14).regex(
    new RegExp("^app-([0-9A-Za-z]{10}$)"),
  ).optional(),
  EnvironmentIdentifier: z.string().min(14).max(14).regex(
    new RegExp("^env-([0-9A-Za-z]{10}$)"),
  ).optional(),
  RouteType: z.enum(["DEFAULT", "URI_PATH"]).optional(),
  ServiceIdentifier: z.string().min(14).max(14).regex(
    new RegExp("^svc-([0-9A-Za-z]{10}$)"),
  ).optional(),
  DefaultRoute: z.object({
    ActivationState: z.enum(["INACTIVE", "ACTIVE"]).optional(),
  }).optional(),
  UriPathRoute: z.object({
    SourcePath: z.string().min(1).max(2048).regex(
      new RegExp("^(/([a-zA-Z0-9._:-]+|\\{[a-zA-Z0-9._:-]+\\}))+$"),
    ).optional(),
    ActivationState: z.enum(["INACTIVE", "ACTIVE"]).optional(),
    Methods: z.array(
      z.enum(["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]),
    ).optional(),
    IncludeChildPaths: z.boolean().optional(),
    AppendSourcePath: z.boolean().optional(),
  }).optional(),
  Tags: z.array(TagSchema).describe(
    "Metadata that you can assign to help organize the frameworks that you create. Each tag is a key-value pair.",
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

/** Swamp extension model for RefactorSpaces Route. Registered at `@swamp/aws/refactorspaces/route`. */
export const model = {
  type: "@swamp/aws/refactorspaces/route",
  version: "2026.06.15.1",
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
      description: "RefactorSpaces Route resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a RefactorSpaces Route",
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
          "AWS::RefactorSpaces::Route",
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
      description: "Get a RefactorSpaces Route",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RefactorSpaces Route",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::RefactorSpaces::Route",
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
      description: "Update a RefactorSpaces Route",
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
          existing.EnvironmentIdentifier?.toString(),
          existing.ApplicationIdentifier?.toString(),
          existing.RouteIdentifier?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::RefactorSpaces::Route",
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
          "AWS::RefactorSpaces::Route",
          identifier,
          currentState,
          desiredState,
          [
            "ApplicationIdentifier",
            "EnvironmentIdentifier",
            "RouteType",
            "ServiceIdentifier",
            "SourcePath",
            "Methods",
            "IncludeChildPaths",
            "AppendSourcePath",
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
      description: "Delete a RefactorSpaces Route",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RefactorSpaces Route",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::RefactorSpaces::Route",
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
      description: "Sync RefactorSpaces Route state from AWS",
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
          existing.EnvironmentIdentifier?.toString(),
          existing.ApplicationIdentifier?.toString(),
          existing.RouteIdentifier?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::RefactorSpaces::Route",
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
