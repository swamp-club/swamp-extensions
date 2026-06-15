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

// Auto-generated extension model for @swamp/aws/sagemaker/project
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SageMaker Project (AWS::SageMaker::Project).
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
  Key: z.string().min(1).max(128).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
  ).describe(
    "The key name of the tag. You can specify a value that is 1 to 127 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().max(256).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
  ).describe(
    "The value for the tag. You can specify a value that is 1 to 255 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const ProvisioningParameterSchema = z.object({
  Key: z.string().min(1).max(1000).regex(new RegExp(".*")).describe(
    "The parameter key.",
  ),
  Value: z.string().max(4096).regex(new RegExp(".*")).describe(
    "The parameter value.",
  ),
});

const CfnStackParameterSchema = z.object({
  Key: z.string().min(1).max(255).describe("The key of the parameter."),
  Value: z.string().max(4096).describe("The value of the parameter."),
});

const CfnTemplateProviderDetailSchema = z.object({
  Parameters: z.array(CfnStackParameterSchema).describe(
    "A list of parameters used in the CloudFormation template.",
  ).optional(),
  RoleARN: z.string().min(20).max(2048).regex(
    new RegExp("arn:aws[a-z\\-]*:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+"),
  ).describe(
    "The Amazon Resource Name (ARN) of the IAM role used by the template provider.",
  ).optional(),
  TemplateName: z.string().min(1).max(32).regex(
    new RegExp("(?=.{1,32}$)[a-zA-Z0-9](-*[a-zA-Z0-9])*"),
  ).describe("The name of the template used for the project."),
  TemplateURL: z.string().min(1).max(1024).regex(
    new RegExp("(?=.{1,1024}$)(https)://([^/]+)/(.+)"),
  ).describe("The URL of the CloudFormation template."),
});

const TemplateProviderDetailSchema = z.object({
  CfnTemplateProviderDetail: CfnTemplateProviderDetailSchema.describe(
    "CloudFormation template provider details for a SageMaker project.",
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
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  ProjectName: z.string().min(1).max(32).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
  ).describe("The name of the project."),
  ProjectDescription: z.string().max(1024).regex(new RegExp(".*")).describe(
    "The description of the project.",
  ).optional(),
  ServiceCatalogProvisioningDetails: z.object({
    ProductId: z.string().max(100).regex(
      new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
    ).describe("Service Catalog product identifier."),
    ProvisioningArtifactId: z.string().max(100).regex(
      new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
    ).describe(
      "The identifier of the provisioning artifact (also known as a version).",
    ).optional(),
    PathId: z.string().max(100).regex(
      new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
    ).describe("The path identifier of the product.").optional(),
    ProvisioningParameters: z.array(ProvisioningParameterSchema).describe(
      "Parameters specified by the administrator that are required for provisioning the product.",
    ).optional(),
  }).describe("Input ServiceCatalog Provisioning Details").optional(),
  ServiceCatalogProvisionedProductDetails: z.object({
    ProvisionedProductId: z.string().max(100).regex(
      new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
    ).describe(
      "The identifier of the provisioning artifact (also known as a version).",
    ).optional(),
    ProvisionedProductStatusMessage: z.string().describe(
      "Provisioned Product Status Message",
    ).optional(),
  }).describe("Provisioned ServiceCatalog Details").optional(),
  TemplateProviderDetails: z.array(TemplateProviderDetailSchema).describe(
    "An array of template providers associated with the project.",
  ).optional(),
});

const StateSchema = z.object({
  Tags: z.array(TagSchema).optional(),
  ProjectArn: z.string(),
  ProjectId: z.string().optional(),
  ProjectName: z.string().optional(),
  ProjectDescription: z.string().optional(),
  CreationTime: z.string().optional(),
  ServiceCatalogProvisioningDetails: z.object({
    ProductId: z.string(),
    ProvisioningArtifactId: z.string(),
    PathId: z.string(),
    ProvisioningParameters: z.array(ProvisioningParameterSchema),
  }).optional(),
  ServiceCatalogProvisionedProductDetails: z.object({
    ProvisionedProductId: z.string(),
    ProvisionedProductStatusMessage: z.string(),
  }).optional(),
  TemplateProviderDetails: z.array(TemplateProviderDetailSchema).optional(),
  ProjectStatus: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  ProjectName: z.string().min(1).max(32).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
  ).describe("The name of the project.").optional(),
  ProjectDescription: z.string().max(1024).regex(new RegExp(".*")).describe(
    "The description of the project.",
  ).optional(),
  ServiceCatalogProvisioningDetails: z.object({
    ProductId: z.string().max(100).regex(
      new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
    ).describe("Service Catalog product identifier.").optional(),
    ProvisioningArtifactId: z.string().max(100).regex(
      new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
    ).describe(
      "The identifier of the provisioning artifact (also known as a version).",
    ).optional(),
    PathId: z.string().max(100).regex(
      new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
    ).describe("The path identifier of the product.").optional(),
    ProvisioningParameters: z.array(ProvisioningParameterSchema).describe(
      "Parameters specified by the administrator that are required for provisioning the product.",
    ).optional(),
  }).describe("Input ServiceCatalog Provisioning Details").optional(),
  ServiceCatalogProvisionedProductDetails: z.object({
    ProvisionedProductId: z.string().max(100).regex(
      new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
    ).describe(
      "The identifier of the provisioning artifact (also known as a version).",
    ).optional(),
    ProvisionedProductStatusMessage: z.string().describe(
      "Provisioned Product Status Message",
    ).optional(),
  }).describe("Provisioned ServiceCatalog Details").optional(),
  TemplateProviderDetails: z.array(TemplateProviderDetailSchema).describe(
    "An array of template providers associated with the project.",
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

/** Swamp extension model for SageMaker Project. Registered at `@swamp/aws/sagemaker/project`. */
export const model = {
  type: "@swamp/aws/sagemaker/project",
  version: "2026.06.15.1",
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
      description: "SageMaker Project resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SageMaker Project",
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
          "AWS::SageMaker::Project",
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
      description: "Get a SageMaker Project",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker Project",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SageMaker::Project",
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
      description: "Update a SageMaker Project",
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
        const identifier = existing.ProjectArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SageMaker::Project",
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
          "AWS::SageMaker::Project",
          identifier,
          currentState,
          desiredState,
          [
            "ProjectName",
            "ProjectDescription",
            "ServiceCatalogProvisioningDetails",
            "TemplateProviderDetails",
            "Tags",
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
      description: "Delete a SageMaker Project",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker Project",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SageMaker::Project",
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
      description: "Sync SageMaker Project state from AWS",
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
        const identifier = existing.ProjectArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SageMaker::Project",
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
