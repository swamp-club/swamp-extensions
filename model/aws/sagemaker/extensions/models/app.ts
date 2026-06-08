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

// Auto-generated extension model for @swamp/aws/sagemaker/app
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SageMaker App (AWS::SageMaker::App).
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
  Value: z.string().min(1).max(128),
  Key: z.string().min(1).max(128),
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  AppName: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,62}"),
  ).describe("The name of the app."),
  AppType: z.enum([
    "JupyterServer",
    "KernelGateway",
    "RStudioServerPro",
    "RSessionGateway",
    "Canvas",
  ]).describe("The type of app."),
  DomainId: z.string().min(1).max(63).describe("The domain ID."),
  ResourceSpec: z.object({
    InstanceType: z.enum([
      "system",
      "ml.t3.micro",
      "ml.t3.small",
      "ml.t3.medium",
      "ml.t3.large",
      "ml.t3.xlarge",
      "ml.t3.2xlarge",
      "ml.m5.large",
      "ml.m5.xlarge",
      "ml.m5.2xlarge",
      "ml.m5.4xlarge",
      "ml.m5.8xlarge",
      "ml.m5.12xlarge",
      "ml.m5.16xlarge",
      "ml.m5.24xlarge",
      "ml.m5d.large",
      "ml.m5d.xlarge",
      "ml.m5d.2xlarge",
      "ml.m5d.4xlarge",
      "ml.m5d.8xlarge",
      "ml.m5d.12xlarge",
      "ml.m5d.16xlarge",
      "ml.m5d.24xlarge",
      "ml.c5.large",
      "ml.c5.xlarge",
      "ml.c5.2xlarge",
      "ml.c5.4xlarge",
      "ml.c5.9xlarge",
      "ml.c5.12xlarge",
      "ml.c5.18xlarge",
      "ml.c5.24xlarge",
      "ml.p3.2xlarge",
      "ml.p3.8xlarge",
      "ml.p3.16xlarge",
      "ml.p3dn.24xlarge",
      "ml.g4dn.xlarge",
      "ml.g4dn.2xlarge",
      "ml.g4dn.4xlarge",
      "ml.g4dn.8xlarge",
      "ml.g4dn.12xlarge",
      "ml.g4dn.16xlarge",
      "ml.r5.large",
      "ml.r5.xlarge",
      "ml.r5.2xlarge",
      "ml.r5.4xlarge",
      "ml.r5.8xlarge",
      "ml.r5.12xlarge",
      "ml.r5.16xlarge",
      "ml.r5.24xlarge",
      "ml.g5.xlarge",
      "ml.g5.2xlarge",
      "ml.g5.4xlarge",
      "ml.g5.8xlarge",
      "ml.g5.12xlarge",
      "ml.g5.16xlarge",
      "ml.g5.24xlarge",
      "ml.g5.48xlarge",
      "ml.g6.xlarge",
      "ml.g6.2xlarge",
      "ml.g6.4xlarge",
      "ml.g6.8xlarge",
      "ml.g6.12xlarge",
      "ml.g6.16xlarge",
      "ml.g6.24xlarge",
      "ml.g6.48xlarge",
      "ml.g6e.xlarge",
      "ml.g6e.2xlarge",
      "ml.g6e.4xlarge",
      "ml.g6e.8xlarge",
      "ml.g6e.12xlarge",
      "ml.g6e.16xlarge",
      "ml.g6e.24xlarge",
      "ml.g6e.48xlarge",
      "ml.geospatial.interactive",
      "ml.p4d.24xlarge",
      "ml.p4de.24xlarge",
      "ml.trn1.2xlarge",
      "ml.trn1.32xlarge",
      "ml.trn1n.32xlarge",
      "ml.p5.48xlarge",
      "ml.p5e.48xlarge",
      "ml.p5en.48xlarge",
      "ml.m6i.large",
      "ml.m6i.xlarge",
      "ml.m6i.2xlarge",
      "ml.m6i.4xlarge",
      "ml.m6i.8xlarge",
      "ml.m6i.12xlarge",
      "ml.m6i.16xlarge",
      "ml.m6i.24xlarge",
      "ml.m6i.32xlarge",
      "ml.m7i.large",
      "ml.m7i.xlarge",
      "ml.m7i.2xlarge",
      "ml.m7i.4xlarge",
      "ml.m7i.8xlarge",
      "ml.m7i.12xlarge",
      "ml.m7i.16xlarge",
      "ml.m7i.24xlarge",
      "ml.m7i.48xlarge",
      "ml.c6i.large",
      "ml.c6i.xlarge",
      "ml.c6i.2xlarge",
      "ml.c6i.4xlarge",
      "ml.c6i.8xlarge",
      "ml.c6i.12xlarge",
      "ml.c6i.16xlarge",
      "ml.c6i.24xlarge",
      "ml.c6i.32xlarge",
      "ml.c7i.large",
      "ml.c7i.xlarge",
      "ml.c7i.2xlarge",
      "ml.c7i.4xlarge",
      "ml.c7i.8xlarge",
      "ml.c7i.12xlarge",
      "ml.c7i.16xlarge",
      "ml.c7i.24xlarge",
      "ml.c7i.48xlarge",
      "ml.r6i.large",
      "ml.r6i.xlarge",
      "ml.r6i.2xlarge",
      "ml.r6i.4xlarge",
      "ml.r6i.8xlarge",
      "ml.r6i.12xlarge",
      "ml.r6i.16xlarge",
      "ml.r6i.24xlarge",
      "ml.r6i.32xlarge",
      "ml.r7i.large",
      "ml.r7i.xlarge",
      "ml.r7i.2xlarge",
      "ml.r7i.4xlarge",
      "ml.r7i.8xlarge",
      "ml.r7i.12xlarge",
      "ml.r7i.16xlarge",
      "ml.r7i.24xlarge",
      "ml.r7i.48xlarge",
      "ml.m6id.large",
      "ml.m6id.xlarge",
      "ml.m6id.2xlarge",
      "ml.m6id.4xlarge",
      "ml.m6id.8xlarge",
      "ml.m6id.12xlarge",
      "ml.m6id.16xlarge",
      "ml.m6id.24xlarge",
      "ml.m6id.32xlarge",
      "ml.c6id.large",
      "ml.c6id.xlarge",
      "ml.c6id.2xlarge",
      "ml.c6id.4xlarge",
      "ml.c6id.8xlarge",
      "ml.c6id.12xlarge",
      "ml.c6id.16xlarge",
      "ml.c6id.24xlarge",
      "ml.c6id.32xlarge",
      "ml.r6id.large",
      "ml.r6id.xlarge",
      "ml.r6id.2xlarge",
      "ml.r6id.4xlarge",
      "ml.r6id.8xlarge",
      "ml.r6id.12xlarge",
      "ml.r6id.16xlarge",
      "ml.r6id.24xlarge",
      "ml.r6id.32xlarge",
    ]).describe("The instance type that the image version runs on.").optional(),
    SageMakerImageArn: z.string().min(1).max(256).regex(
      new RegExp(
        "^arn:aws(-[\\w]+)*:sagemaker:.+:[0-9]{12}:image/[a-z0-9]([-.]?[a-z0-9])*$",
      ),
    ).describe(
      "The ARN of the SageMaker image that the image version belongs to.",
    ).optional(),
    SageMakerImageVersionArn: z.string().min(1).max(256).regex(
      new RegExp(
        "^arn:aws(-[\\w]+)*:sagemaker:.+:[0-9]{12}:image-version/[a-z0-9]([-.]?[a-z0-9])*/[0-9]+$",
      ),
    ).describe("The ARN of the image version created on the instance.")
      .optional(),
    LifecycleConfigArn: z.string().max(256).regex(
      new RegExp(
        "^(arn:aws[a-z\\-]*:sagemaker:[a-z0-9\\-]*:[0-9]{12}:studio-lifecycle-config/.*|None)$",
      ),
    ).describe(
      "The Amazon Resource Name (ARN) of the Lifecycle Configuration to attach to the Resource.",
    ).optional(),
  }).describe(
    "The instance type and the Amazon Resource Name (ARN) of the SageMaker image created on the instance.",
  ).optional(),
  Tags: z.array(TagSchema).describe("A list of tags to apply to the app.")
    .optional(),
  UserProfileName: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,62}"),
  ).describe("The user profile name."),
  RecoveryMode: z.boolean().describe(
    "Indicates whether the application is launched in recovery mode.",
  ).optional(),
});

const StateSchema = z.object({
  AppArn: z.string().optional(),
  AppName: z.string(),
  AppType: z.string(),
  DomainId: z.string(),
  ResourceSpec: z.object({
    InstanceType: z.string(),
    SageMakerImageArn: z.string(),
    SageMakerImageVersionArn: z.string(),
    LifecycleConfigArn: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  UserProfileName: z.string(),
  BuiltInLifecycleConfigArn: z.string().optional(),
  RecoveryMode: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AppName: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,62}"),
  ).describe("The name of the app.").optional(),
  AppType: z.enum([
    "JupyterServer",
    "KernelGateway",
    "RStudioServerPro",
    "RSessionGateway",
    "Canvas",
  ]).describe("The type of app.").optional(),
  DomainId: z.string().min(1).max(63).describe("The domain ID.").optional(),
  ResourceSpec: z.object({
    InstanceType: z.enum([
      "system",
      "ml.t3.micro",
      "ml.t3.small",
      "ml.t3.medium",
      "ml.t3.large",
      "ml.t3.xlarge",
      "ml.t3.2xlarge",
      "ml.m5.large",
      "ml.m5.xlarge",
      "ml.m5.2xlarge",
      "ml.m5.4xlarge",
      "ml.m5.8xlarge",
      "ml.m5.12xlarge",
      "ml.m5.16xlarge",
      "ml.m5.24xlarge",
      "ml.m5d.large",
      "ml.m5d.xlarge",
      "ml.m5d.2xlarge",
      "ml.m5d.4xlarge",
      "ml.m5d.8xlarge",
      "ml.m5d.12xlarge",
      "ml.m5d.16xlarge",
      "ml.m5d.24xlarge",
      "ml.c5.large",
      "ml.c5.xlarge",
      "ml.c5.2xlarge",
      "ml.c5.4xlarge",
      "ml.c5.9xlarge",
      "ml.c5.12xlarge",
      "ml.c5.18xlarge",
      "ml.c5.24xlarge",
      "ml.p3.2xlarge",
      "ml.p3.8xlarge",
      "ml.p3.16xlarge",
      "ml.p3dn.24xlarge",
      "ml.g4dn.xlarge",
      "ml.g4dn.2xlarge",
      "ml.g4dn.4xlarge",
      "ml.g4dn.8xlarge",
      "ml.g4dn.12xlarge",
      "ml.g4dn.16xlarge",
      "ml.r5.large",
      "ml.r5.xlarge",
      "ml.r5.2xlarge",
      "ml.r5.4xlarge",
      "ml.r5.8xlarge",
      "ml.r5.12xlarge",
      "ml.r5.16xlarge",
      "ml.r5.24xlarge",
      "ml.g5.xlarge",
      "ml.g5.2xlarge",
      "ml.g5.4xlarge",
      "ml.g5.8xlarge",
      "ml.g5.12xlarge",
      "ml.g5.16xlarge",
      "ml.g5.24xlarge",
      "ml.g5.48xlarge",
      "ml.g6.xlarge",
      "ml.g6.2xlarge",
      "ml.g6.4xlarge",
      "ml.g6.8xlarge",
      "ml.g6.12xlarge",
      "ml.g6.16xlarge",
      "ml.g6.24xlarge",
      "ml.g6.48xlarge",
      "ml.g6e.xlarge",
      "ml.g6e.2xlarge",
      "ml.g6e.4xlarge",
      "ml.g6e.8xlarge",
      "ml.g6e.12xlarge",
      "ml.g6e.16xlarge",
      "ml.g6e.24xlarge",
      "ml.g6e.48xlarge",
      "ml.geospatial.interactive",
      "ml.p4d.24xlarge",
      "ml.p4de.24xlarge",
      "ml.trn1.2xlarge",
      "ml.trn1.32xlarge",
      "ml.trn1n.32xlarge",
      "ml.p5.48xlarge",
      "ml.p5e.48xlarge",
      "ml.p5en.48xlarge",
      "ml.m6i.large",
      "ml.m6i.xlarge",
      "ml.m6i.2xlarge",
      "ml.m6i.4xlarge",
      "ml.m6i.8xlarge",
      "ml.m6i.12xlarge",
      "ml.m6i.16xlarge",
      "ml.m6i.24xlarge",
      "ml.m6i.32xlarge",
      "ml.m7i.large",
      "ml.m7i.xlarge",
      "ml.m7i.2xlarge",
      "ml.m7i.4xlarge",
      "ml.m7i.8xlarge",
      "ml.m7i.12xlarge",
      "ml.m7i.16xlarge",
      "ml.m7i.24xlarge",
      "ml.m7i.48xlarge",
      "ml.c6i.large",
      "ml.c6i.xlarge",
      "ml.c6i.2xlarge",
      "ml.c6i.4xlarge",
      "ml.c6i.8xlarge",
      "ml.c6i.12xlarge",
      "ml.c6i.16xlarge",
      "ml.c6i.24xlarge",
      "ml.c6i.32xlarge",
      "ml.c7i.large",
      "ml.c7i.xlarge",
      "ml.c7i.2xlarge",
      "ml.c7i.4xlarge",
      "ml.c7i.8xlarge",
      "ml.c7i.12xlarge",
      "ml.c7i.16xlarge",
      "ml.c7i.24xlarge",
      "ml.c7i.48xlarge",
      "ml.r6i.large",
      "ml.r6i.xlarge",
      "ml.r6i.2xlarge",
      "ml.r6i.4xlarge",
      "ml.r6i.8xlarge",
      "ml.r6i.12xlarge",
      "ml.r6i.16xlarge",
      "ml.r6i.24xlarge",
      "ml.r6i.32xlarge",
      "ml.r7i.large",
      "ml.r7i.xlarge",
      "ml.r7i.2xlarge",
      "ml.r7i.4xlarge",
      "ml.r7i.8xlarge",
      "ml.r7i.12xlarge",
      "ml.r7i.16xlarge",
      "ml.r7i.24xlarge",
      "ml.r7i.48xlarge",
      "ml.m6id.large",
      "ml.m6id.xlarge",
      "ml.m6id.2xlarge",
      "ml.m6id.4xlarge",
      "ml.m6id.8xlarge",
      "ml.m6id.12xlarge",
      "ml.m6id.16xlarge",
      "ml.m6id.24xlarge",
      "ml.m6id.32xlarge",
      "ml.c6id.large",
      "ml.c6id.xlarge",
      "ml.c6id.2xlarge",
      "ml.c6id.4xlarge",
      "ml.c6id.8xlarge",
      "ml.c6id.12xlarge",
      "ml.c6id.16xlarge",
      "ml.c6id.24xlarge",
      "ml.c6id.32xlarge",
      "ml.r6id.large",
      "ml.r6id.xlarge",
      "ml.r6id.2xlarge",
      "ml.r6id.4xlarge",
      "ml.r6id.8xlarge",
      "ml.r6id.12xlarge",
      "ml.r6id.16xlarge",
      "ml.r6id.24xlarge",
      "ml.r6id.32xlarge",
    ]).describe("The instance type that the image version runs on.").optional(),
    SageMakerImageArn: z.string().min(1).max(256).regex(
      new RegExp(
        "^arn:aws(-[\\w]+)*:sagemaker:.+:[0-9]{12}:image/[a-z0-9]([-.]?[a-z0-9])*$",
      ),
    ).describe(
      "The ARN of the SageMaker image that the image version belongs to.",
    ).optional(),
    SageMakerImageVersionArn: z.string().min(1).max(256).regex(
      new RegExp(
        "^arn:aws(-[\\w]+)*:sagemaker:.+:[0-9]{12}:image-version/[a-z0-9]([-.]?[a-z0-9])*/[0-9]+$",
      ),
    ).describe("The ARN of the image version created on the instance.")
      .optional(),
    LifecycleConfigArn: z.string().max(256).regex(
      new RegExp(
        "^(arn:aws[a-z\\-]*:sagemaker:[a-z0-9\\-]*:[0-9]{12}:studio-lifecycle-config/.*|None)$",
      ),
    ).describe(
      "The Amazon Resource Name (ARN) of the Lifecycle Configuration to attach to the Resource.",
    ).optional(),
  }).describe(
    "The instance type and the Amazon Resource Name (ARN) of the SageMaker image created on the instance.",
  ).optional(),
  Tags: z.array(TagSchema).describe("A list of tags to apply to the app.")
    .optional(),
  UserProfileName: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,62}"),
  ).describe("The user profile name.").optional(),
  RecoveryMode: z.boolean().describe(
    "Indicates whether the application is launched in recovery mode.",
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

/** Swamp extension model for SageMaker App. Registered at `@swamp/aws/sagemaker/app`. */
export const model = {
  type: "@swamp/aws/sagemaker/app",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SageMaker App resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SageMaker App",
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
          "AWS::SageMaker::App",
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
      description: "Get a SageMaker App",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker App",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SageMaker::App",
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
      description: "Update a SageMaker App",
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
          existing.AppName?.toString(),
          existing.AppType?.toString(),
          existing.DomainId?.toString(),
          existing.UserProfileName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::SageMaker::App",
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
          "AWS::SageMaker::App",
          identifier,
          currentState,
          desiredState,
          ["AppName", "AppType", "DomainId", "UserProfileName", "ResourceSpec"],
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
      description: "Delete a SageMaker App",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker App",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SageMaker::App",
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
      description: "Sync SageMaker App state from AWS",
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
          existing.AppName?.toString(),
          existing.AppType?.toString(),
          existing.DomainId?.toString(),
          existing.UserProfileName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::SageMaker::App",
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
