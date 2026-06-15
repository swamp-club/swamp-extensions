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

// Auto-generated extension model for @swamp/aws/ssm/document
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SSM Document (AWS::SSM::Document).
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

const DocumentRequiresSchema = z.object({
  Version: z.string().max(8).regex(
    new RegExp("([$]LATEST|[$]DEFAULT|^[1-9][0-9]*$)"),
  ).describe("The document version required by the current document.")
    .optional(),
  Name: z.string().max(200).regex(new RegExp("^[a-zA-Z0-9_\\-.:/]{3,200}$"))
    .describe(
      "The name of the required SSM document. The name can be an Amazon Resource Name (ARN).",
    ).optional(),
});

const AttachmentsSourceSchema = z.object({
  Values: z.array(z.string().min(1).max(100000)).describe(
    "The value of a key-value pair that identifies the location of an attachment to a document. The format for Value depends on the type of key you specify.",
  ).optional(),
  Key: z.enum(["SourceUrl", "S3FileUrl", "AttachmentReference"]).describe(
    "The key of a key-value pair that identifies the location of an attachment to a document.",
  ).optional(),
  Name: z.string().min(1).max(128).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
  ).describe("The name of the document attachment file.").optional(),
});

const TagSchema = z.object({
  Value: z.string().min(1).max(256).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
  ).describe("The value of the tag.").optional(),
  Key: z.string().min(1).max(128).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
  ).describe("The name of the tag.").optional(),
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
  DocumentFormat: z.enum(["YAML", "JSON", "TEXT"]).describe(
    "Specify the document format for the request. The document format can be either JSON or YAML. JSON is the default format.",
  ).optional(),
  Requires: z.array(DocumentRequiresSchema).describe(
    "A list of SSM documents required by a document. For example, an ApplicationConfiguration document requires an ApplicationConfigurationSchema document.",
  ).optional(),
  Content: z.record(z.string(), z.unknown()).describe(
    "The content for the Systems Manager document in JSON, YAML or String format.",
  ),
  TargetType: z.string().regex(new RegExp("^\\/[\\w\\.\\-\\:\\/]*$")).describe(
    "Specify a target type to define the kinds of resources the document can run on.",
  ).optional(),
  DocumentType: z.enum([
    "ApplicationConfiguration",
    "ApplicationConfigurationSchema",
    "Automation",
    "Automation.ChangeTemplate",
    "AutoApprovalPolicy",
    "ChangeCalendar",
    "CloudFormation",
    "Command",
    "DeploymentStrategy",
    "ManualApprovalPolicy",
    "Package",
    "Policy",
    "ProblemAnalysis",
    "ProblemAnalysisTemplate",
    "Session",
  ]).describe("The type of document to create.").optional(),
  VersionName: z.string().regex(new RegExp("^[a-zA-Z0-9_\\-.]{1,128}$"))
    .describe(
      "An optional field specifying the version of the artifact you are creating with the document. This value is unique across all versions of a document, and cannot be changed.",
    ).optional(),
  UpdateMethod: z.enum(["Replace", "NewVersion"]).describe(
    "Update method - when set to 'Replace', the update will replace the existing document; when set to 'NewVersion', the update will create a new version.",
  ).optional(),
  Attachments: z.array(AttachmentsSourceSchema).describe(
    "A list of key and value pairs that describe attachments to a version of a document.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Optional metadata that you assign to a resource. Tags enable you to categorize a resource in different ways, such as by purpose, owner, or environment.",
  ).optional(),
  Name: z.string().regex(new RegExp("^[a-zA-Z0-9_\\-.]{3,128}$")).describe(
    "A name for the Systems Manager document.",
  ).optional(),
});

const StateSchema = z.object({
  DocumentFormat: z.string().optional(),
  Requires: z.array(DocumentRequiresSchema).optional(),
  Content: z.union([z.string(), z.record(z.string(), z.unknown())]).optional(),
  TargetType: z.string().optional(),
  DocumentType: z.string().optional(),
  VersionName: z.string().optional(),
  UpdateMethod: z.string().optional(),
  Attachments: z.array(AttachmentsSourceSchema).optional(),
  Tags: z.array(TagSchema).optional(),
  Name: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DocumentFormat: z.enum(["YAML", "JSON", "TEXT"]).describe(
    "Specify the document format for the request. The document format can be either JSON or YAML. JSON is the default format.",
  ).optional(),
  Requires: z.array(DocumentRequiresSchema).describe(
    "A list of SSM documents required by a document. For example, an ApplicationConfiguration document requires an ApplicationConfigurationSchema document.",
  ).optional(),
  Content: z.record(z.string(), z.unknown()).describe(
    "The content for the Systems Manager document in JSON, YAML or String format.",
  ).optional(),
  TargetType: z.string().regex(new RegExp("^\\/[\\w\\.\\-\\:\\/]*$")).describe(
    "Specify a target type to define the kinds of resources the document can run on.",
  ).optional(),
  DocumentType: z.enum([
    "ApplicationConfiguration",
    "ApplicationConfigurationSchema",
    "Automation",
    "Automation.ChangeTemplate",
    "AutoApprovalPolicy",
    "ChangeCalendar",
    "CloudFormation",
    "Command",
    "DeploymentStrategy",
    "ManualApprovalPolicy",
    "Package",
    "Policy",
    "ProblemAnalysis",
    "ProblemAnalysisTemplate",
    "Session",
  ]).describe("The type of document to create.").optional(),
  VersionName: z.string().regex(new RegExp("^[a-zA-Z0-9_\\-.]{1,128}$"))
    .describe(
      "An optional field specifying the version of the artifact you are creating with the document. This value is unique across all versions of a document, and cannot be changed.",
    ).optional(),
  UpdateMethod: z.enum(["Replace", "NewVersion"]).describe(
    "Update method - when set to 'Replace', the update will replace the existing document; when set to 'NewVersion', the update will create a new version.",
  ).optional(),
  Attachments: z.array(AttachmentsSourceSchema).describe(
    "A list of key and value pairs that describe attachments to a version of a document.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Optional metadata that you assign to a resource. Tags enable you to categorize a resource in different ways, such as by purpose, owner, or environment.",
  ).optional(),
  Name: z.string().regex(new RegExp("^[a-zA-Z0-9_\\-.]{3,128}$")).describe(
    "A name for the Systems Manager document.",
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

/** Swamp extension model for SSM Document. Registered at `@swamp/aws/ssm/document`. */
export const model = {
  type: "@swamp/aws/ssm/document",
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
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.27.1",
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
      description: "SSM Document resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SSM Document",
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
          "AWS::SSM::Document",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName = ((result.Name ?? g.Name)?.toString() ?? "current")
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
      description: "Get a SSM Document",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSM Document",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SSM::Document",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.Name ?? context.globalArgs.Name)?.toString() ??
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
      description: "Update a SSM Document",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SSM::Document",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SSM::Document",
          identifier,
          currentState,
          desiredState,
          ["Name", "DocumentType"],
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
      description: "Delete a SSM Document",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSM Document",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SSM::Document",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.Name?.toString() ?? args.identifier).replace(
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
      description: "Sync SSM Document state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SSM::Document",
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
