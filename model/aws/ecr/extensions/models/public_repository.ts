// Auto-generated extension model for @swamp/aws/ecr/public-repository
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ECR PublicRepository (AWS::ECR::PublicRepository).
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

const TagSchema = z.object({
  Key: z.string().min(1).max(127).describe(
    "One part of a key-value pair that make up a tag. A key is a general label that acts like a category for more specific tag values.",
  ),
  Value: z.string().min(1).max(255).describe(
    "A value acts as a descriptor within a tag category (key).",
  ),
});

const GlobalArgsSchema = z.object({
  RepositoryName: z.string().min(2).max(256).regex(
    new RegExp(
      "^(?=.{2,256}$)((?:[a-z0-9]+(?:[._-][a-z0-9]+)*/)*[a-z0-9]+(?:[._-][a-z0-9]+)*)$",
    ),
  ).describe(
    "The name to use for the public repository. The repository name may be specified on its own (such as nginx-web-app) or it can be prepended with a namespace to group the repository into a category (such as project-a/nginx-web-app). If you don't specify a name, CFNlong generates a unique physical ID and uses that ID for the repository name. For more information, see [Name Type](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-name.html). If you specify a name, you cannot perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.",
  ).optional(),
  RepositoryPolicyText: z.string().describe(
    "The JSON repository policy text to apply to the public repository. For more information, see [Amazon ECR Public repository policies](https://docs.aws.amazon.com/AmazonECR/latest/public/public-repository-policies.html) in the *Amazon ECR Public User Guide*.",
  ).optional(),
  RepositoryCatalogData: z.object({
    RepositoryDescription: z.string().max(1024).describe(
      "The description of the public repository.",
    ).optional(),
    Architectures: z.array(z.string().min(1).max(50)).describe(
      "Select the system architectures that the images in your repository are compatible with.",
    ).optional(),
    OperatingSystems: z.array(z.string().min(1).max(50)).describe(
      "Select the operating systems that the images in your repository are compatible with.",
    ).optional(),
    AboutText: z.string().max(10240).describe(
      "Provide a detailed description of the repository. Identify what is included in the repository, any licensing details, or other relevant information.",
    ).optional(),
    UsageText: z.string().max(10240).describe(
      "Provide detailed information about how to use the images in the repository. This provides context, support information, and additional usage details for users of the repository.",
    ).optional(),
  }).describe(
    "The details about the repository that are publicly visible in the Amazon ECR Public Gallery. For more information, see [Amazon ECR Public repository catalog data](https://docs.aws.amazon.com/AmazonECR/latest/public/public-repository-catalog-data.html) in the *Amazon ECR Public User Guide*.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  RepositoryName: z.string(),
  RepositoryPolicyText: z.union([z.string(), z.record(z.string(), z.unknown())])
    .optional(),
  Arn: z.string().optional(),
  RepositoryCatalogData: z.object({
    RepositoryDescription: z.string(),
    Architectures: z.array(z.string()),
    OperatingSystems: z.array(z.string()),
    AboutText: z.string(),
    UsageText: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  RepositoryName: z.string().min(2).max(256).regex(
    new RegExp(
      "^(?=.{2,256}$)((?:[a-z0-9]+(?:[._-][a-z0-9]+)*/)*[a-z0-9]+(?:[._-][a-z0-9]+)*)$",
    ),
  ).describe(
    "The name to use for the public repository. The repository name may be specified on its own (such as nginx-web-app) or it can be prepended with a namespace to group the repository into a category (such as project-a/nginx-web-app). If you don't specify a name, CFNlong generates a unique physical ID and uses that ID for the repository name. For more information, see [Name Type](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-name.html). If you specify a name, you cannot perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.",
  ).optional(),
  RepositoryPolicyText: z.string().describe(
    "The JSON repository policy text to apply to the public repository. For more information, see [Amazon ECR Public repository policies](https://docs.aws.amazon.com/AmazonECR/latest/public/public-repository-policies.html) in the *Amazon ECR Public User Guide*.",
  ).optional(),
  RepositoryCatalogData: z.object({
    RepositoryDescription: z.string().max(1024).describe(
      "The description of the public repository.",
    ).optional(),
    Architectures: z.array(z.string().min(1).max(50)).describe(
      "Select the system architectures that the images in your repository are compatible with.",
    ).optional(),
    OperatingSystems: z.array(z.string().min(1).max(50)).describe(
      "Select the operating systems that the images in your repository are compatible with.",
    ).optional(),
    AboutText: z.string().max(10240).describe(
      "Provide a detailed description of the repository. Identify what is included in the repository, any licensing details, or other relevant information.",
    ).optional(),
    UsageText: z.string().max(10240).describe(
      "Provide detailed information about how to use the images in the repository. This provides context, support information, and additional usage details for users of the repository.",
    ).optional(),
  }).describe(
    "The details about the repository that are publicly visible in the Amazon ECR Public Gallery. For more information, see [Amazon ECR Public repository catalog data](https://docs.aws.amazon.com/AmazonECR/latest/public/public-repository-catalog-data.html) in the *Amazon ECR Public User Guide*.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

/** Swamp extension model for ECR PublicRepository. Registered at `@swamp/aws/ecr/public-repository`. */
export const model = {
  type: "@swamp/aws/ecr/public-repository",
  version: "2026.05.19.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ECR PublicRepository resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ECR PublicRepository",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::ECR::PublicRepository",
          desiredState,
        ) as StateData;
        const instanceName =
          ((result.RepositoryName ?? g.RepositoryName)?.toString() ?? "current")
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
      description: "Get a ECR PublicRepository",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ECR PublicRepository",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::ECR::PublicRepository",
          args.identifier,
        ) as StateData;
        const instanceName =
          ((result.RepositoryName ?? context.globalArgs.RepositoryName)
            ?.toString() ?? args.identifier).replace(/[\/\\]/g, "_").replace(
              /\.\./g,
              "_",
            ).replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a ECR PublicRepository",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.RepositoryName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.RepositoryName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ECR::PublicRepository",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::ECR::PublicRepository",
          identifier,
          currentState,
          desiredState,
          ["RepositoryName"],
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
      description: "Delete a ECR PublicRepository",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ECR PublicRepository",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::ECR::PublicRepository",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.RepositoryName?.toString() ?? args.identifier)
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
      description: "Sync ECR PublicRepository state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.RepositoryName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.RepositoryName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ECR::PublicRepository",
            identifier,
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
