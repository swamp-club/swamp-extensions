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

// Auto-generated extension model for @swamp/aws/controlcatalog/control
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ControlCatalog Control (AWS::ControlCatalog::Control).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { isResourceNotFoundError, readResource } from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

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
  RegionConfiguration: z.object({
    Scope: z.enum(["GLOBAL", "REGIONAL"]).describe("The scope of the control."),
    DeployableRegions: z.array(
      z.string().regex(new RegExp("^[a-zA-Z0-9-]{1,128}$")),
    ).describe("Regions in which the control is available to be deployed.")
      .optional(),
  }).describe("Information about the control's region configuration.")
    .optional(),
  Implementation: z.object({
    Type: z.string().min(7).max(2048).regex(
      new RegExp("^[A-Za-z0-9]+(::[A-Za-z0-9_]+){2,3}$"),
    ).describe("A string that describes a control's implementation type."),
    Identifier: z.string().min(1).max(256).regex(
      new RegExp("^[a-zA-Z0-9_\\.-]+$"),
    ).describe("A service-specific identifier for the control.").optional(),
  }).describe("An object that describes the implementation type for a control.")
    .optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  ControlId: z.string().optional(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  Behavior: z.string().optional(),
  Severity: z.string().optional(),
  RegionConfiguration: z.object({
    Scope: z.string(),
    DeployableRegions: z.array(z.string()),
  }).optional(),
  Implementation: z.object({
    Type: z.string(),
    Identifier: z.string(),
  }).optional(),
  Aliases: z.array(z.string()).optional(),
  CreateTime: z.string().optional(),
  GovernedResources: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  RegionConfiguration: z.object({
    Scope: z.enum(["GLOBAL", "REGIONAL"]).describe("The scope of the control.")
      .optional(),
    DeployableRegions: z.array(
      z.string().regex(new RegExp("^[a-zA-Z0-9-]{1,128}$")),
    ).describe("Regions in which the control is available to be deployed.")
      .optional(),
  }).describe("Information about the control's region configuration.")
    .optional(),
  Implementation: z.object({
    Type: z.string().min(7).max(2048).regex(
      new RegExp("^[A-Za-z0-9]+(::[A-Za-z0-9_]+){2,3}$"),
    ).describe("A string that describes a control's implementation type.")
      .optional(),
    Identifier: z.string().min(1).max(256).regex(
      new RegExp("^[a-zA-Z0-9_\\.-]+$"),
    ).describe("A service-specific identifier for the control.").optional(),
  }).describe("An object that describes the implementation type for a control.")
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

/** Swamp extension model for ControlCatalog Control. Registered at `@swamp/aws/controlcatalog/control`. */
export const model = {
  type: "@swamp/aws/controlcatalog/control",
  version: "2026.06.25.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ControlCatalog Control resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a ControlCatalog Control",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ControlCatalog Control",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ControlCatalog::Control",
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
    sync: {
      description: "Sync ControlCatalog Control state from AWS",
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
            "AWS::ControlCatalog::Control",
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
