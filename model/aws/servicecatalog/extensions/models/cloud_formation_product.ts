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

// Auto-generated extension model for @swamp/aws/servicecatalog/cloud-formation-product
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ServiceCatalog CloudFormationProduct (AWS::ServiceCatalog::CloudFormationProduct).
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

const ProvisioningArtifactPropertiesSchema = z.object({
  Description: z.string().describe(
    "The description of the provisioning artifact, including how it differs from the previous provisioning artifact.",
  ).optional(),
  Info: z.object({
    LoadTemplateFromURL: z.string().describe(
      "The URL of the AWS CloudFormation template in Amazon S3 in JSON format.",
    ).optional(),
    ImportFromPhysicalId: z.string().describe(
      "The physical id of the resource that contains the template. Currently only supports AWS CloudFormation stack arn",
    ).optional(),
  }).describe(
    'Specify the template source with one of the following options, but not both. Keys accepted: [ LoadTemplateFromURL, ImportFromPhysicalId ] The URL of the AWS CloudFormation template in Amazon S3 in JSON format. Specify the URL in JSON format as follows: "LoadTemplateFromURL": "https://s3.amazonaws.com/cf-templates-ozkq9d3hgiq2-us-east-1/..." ImportFromPhysicalId: The physical id of the resource that contains the template. Currently only supports AWS CloudFormation stack arn. Specify the physical id in JSON format as follows: ImportFromPhysicalId: "arn:aws:cloudformation:[us-east-1]:[accountId]:stack/[StackName]/[resourceId]',
  ),
  DisableTemplateValidation: z.boolean().describe(
    "If set to true, AWS Service Catalog stops validating the specified provisioning artifact even if it is invalid.",
  ).optional(),
  Name: z.string().describe(
    "The name of the provisioning artifact (for example, v1 v2beta). No spaces are allowed.",
  ).optional(),
  Type: z.enum([
    "CLOUD_FORMATION_TEMPLATE",
    "MARKETPLACE_AMI",
    "MARKETPLACE_CAR",
    "TERRAFORM_OPEN_SOURCE",
    "TERRAFORM_CLOUD",
    "EXTERNAL",
  ]).describe(
    "The type of provisioning artifact. Valid values are CLOUD_FORMATION_TEMPLATE, TERRAFORM_OPEN_SOURCE, TERRAFORM_CLOUD, EXTERNAL",
  ).optional(),
});

const CodeStarParametersSchema = z.object({
  ArtifactPath: z.string().describe(
    'The absolute path where the artifact resides within the repo and branch, formatted as "folder/file.json".',
  ),
  Branch: z.string().describe(
    "The specific branch where the artifact resides.",
  ),
  ConnectionArn: z.string().describe(
    "The CodeStar ARN, which is the connection between AWS Service Catalog and the external repository.",
  ),
  Repository: z.string().describe(
    'The specific repository where the product\'s artifact-to-be-synced resides, formatted as "Account/Repo."',
  ),
});

const TagSchema = z.object({
  Key: z.string().describe("The tag key."),
  Value: z.string().describe("The tag value"),
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
  Owner: z.string().describe("The owner of the product."),
  Description: z.string().describe("The description of the product.")
    .optional(),
  SupportEmail: z.string().describe("The contact email for product support.")
    .optional(),
  SupportUrl: z.string().describe("The contact URL for product support.")
    .optional(),
  ProductType: z.enum([
    "CLOUD_FORMATION_TEMPLATE",
    "MARKETPLACE_AMI",
    "MARKETPLACE_CAR",
    "TERRAFORM_OPEN_SOURCE",
    "TERRAFORM_CLOUD",
    "EXTERNAL",
  ]).describe("The type of product.").optional(),
  ProvisioningArtifactParameters: z.array(ProvisioningArtifactPropertiesSchema)
    .describe(
      "The configuration of the provisioning artifact (also known as a version).",
    ).optional(),
  Name: z.string().describe("The name of the product."),
  ReplaceProvisioningArtifacts: z.boolean().describe(
    "This property is turned off by default. If turned off, you can update provisioning artifacts or product attributes (such as description, distributor, name, owner, and more) and the associated provisioning artifacts will retain the same unique identifier. Provisioning artifacts are matched within the CloudFormationProduct resource, and only those that have been updated will be changed. Provisioning artifacts are matched by a combinaton of provisioning artifact template URL and name.",
  ).optional(),
  SupportDescription: z.string().describe(
    "The support information about the product.",
  ).optional(),
  Distributor: z.string().describe("The distributor of the product.")
    .optional(),
  AcceptLanguage: z.string().describe("The language code.").optional(),
  SourceConnection: z.object({
    ConnectionParameters: z.object({
      CodeStar: CodeStarParametersSchema.optional(),
    }).describe("The connection details based on the connection Type."),
    Type: z.string().describe(
      "The only supported SourceConnection type is Codestar.",
    ),
  }).describe(
    "A top level ProductViewDetail response containing details about the product's connection. AWS Service Catalog returns this field for the CreateProduct, UpdateProduct, DescribeProductAsAdmin, and SearchProductAsAdmin APIs. This response contains the same fields as the ConnectionParameters request, with the addition of the LastSync response.",
  ).optional(),
  Tags: z.array(TagSchema).describe("One or more tags.").optional(),
});

const StateSchema = z.object({
  Owner: z.string().optional(),
  Description: z.string().optional(),
  SupportEmail: z.string().optional(),
  SupportUrl: z.string().optional(),
  ProductType: z.string().optional(),
  ProvisioningArtifactParameters: z.array(ProvisioningArtifactPropertiesSchema)
    .optional(),
  ProductName: z.string().optional(),
  Name: z.string().optional(),
  ReplaceProvisioningArtifacts: z.boolean().optional(),
  SupportDescription: z.string().optional(),
  Distributor: z.string().optional(),
  ProvisioningArtifactIds: z.string().optional(),
  ProvisioningArtifactNames: z.string().optional(),
  AcceptLanguage: z.string().optional(),
  Id: z.string(),
  SourceConnection: z.object({
    ConnectionParameters: z.object({
      CodeStar: CodeStarParametersSchema,
    }),
    Type: z.string(),
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
  Owner: z.string().describe("The owner of the product.").optional(),
  Description: z.string().describe("The description of the product.")
    .optional(),
  SupportEmail: z.string().describe("The contact email for product support.")
    .optional(),
  SupportUrl: z.string().describe("The contact URL for product support.")
    .optional(),
  ProductType: z.enum([
    "CLOUD_FORMATION_TEMPLATE",
    "MARKETPLACE_AMI",
    "MARKETPLACE_CAR",
    "TERRAFORM_OPEN_SOURCE",
    "TERRAFORM_CLOUD",
    "EXTERNAL",
  ]).describe("The type of product.").optional(),
  ProvisioningArtifactParameters: z.array(ProvisioningArtifactPropertiesSchema)
    .describe(
      "The configuration of the provisioning artifact (also known as a version).",
    ).optional(),
  Name: z.string().describe("The name of the product.").optional(),
  ReplaceProvisioningArtifacts: z.boolean().describe(
    "This property is turned off by default. If turned off, you can update provisioning artifacts or product attributes (such as description, distributor, name, owner, and more) and the associated provisioning artifacts will retain the same unique identifier. Provisioning artifacts are matched within the CloudFormationProduct resource, and only those that have been updated will be changed. Provisioning artifacts are matched by a combinaton of provisioning artifact template URL and name.",
  ).optional(),
  SupportDescription: z.string().describe(
    "The support information about the product.",
  ).optional(),
  Distributor: z.string().describe("The distributor of the product.")
    .optional(),
  AcceptLanguage: z.string().describe("The language code.").optional(),
  SourceConnection: z.object({
    ConnectionParameters: z.object({
      CodeStar: CodeStarParametersSchema.optional(),
    }).describe("The connection details based on the connection Type.")
      .optional(),
    Type: z.string().describe(
      "The only supported SourceConnection type is Codestar.",
    ).optional(),
  }).describe(
    "A top level ProductViewDetail response containing details about the product's connection. AWS Service Catalog returns this field for the CreateProduct, UpdateProduct, DescribeProductAsAdmin, and SearchProductAsAdmin APIs. This response contains the same fields as the ConnectionParameters request, with the addition of the LastSync response.",
  ).optional(),
  Tags: z.array(TagSchema).describe("One or more tags.").optional(),
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

/** Swamp extension model for ServiceCatalog CloudFormationProduct. Registered at `@swamp/aws/servicecatalog/cloud-formation-product`. */
export const model = {
  type: "@swamp/aws/servicecatalog/cloud-formation-product",
  version: "2026.10.13.1",
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
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ServiceCatalog CloudFormationProduct resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ServiceCatalog CloudFormationProduct",
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
          "AWS::ServiceCatalog::CloudFormationProduct",
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
      description: "Get a ServiceCatalog CloudFormationProduct",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ServiceCatalog CloudFormationProduct",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ServiceCatalog::CloudFormationProduct",
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
      description: "Update a ServiceCatalog CloudFormationProduct",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ServiceCatalog::CloudFormationProduct",
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
          "AWS::ServiceCatalog::CloudFormationProduct",
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
      description: "Delete a ServiceCatalog CloudFormationProduct",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ServiceCatalog CloudFormationProduct",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ServiceCatalog::CloudFormationProduct",
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
      description: "Sync ServiceCatalog CloudFormationProduct state from AWS",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ServiceCatalog::CloudFormationProduct",
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
      description: "List ServiceCatalog CloudFormationProduct resources",
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
          "AWS::ServiceCatalog::CloudFormationProduct",
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
            (item.properties?.Id?.toString() ?? item.identifier).replace(
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
