// Auto-generated extension model for @swamp/aws/cleanroomsml/configured-model-algorithm-association
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CleanRoomsML ConfiguredModelAlgorithmAssociation (AWS::CleanRoomsML::ConfiguredModelAlgorithmAssociation).
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

const CustomEntityConfigSchema = z.object({
  CustomDataIdentifiers: z.array(
    z.string().min(1).max(200).regex(
      new RegExp(
        "^[a-zA-Z0-9\\_\\#\\=\\@\\/\\;\\,\\-\\ \\^\\$\\?\\[\\]\\{\\}\\|\\\\\\*\\+\\.\\(\\)]+$",
      ),
    ),
  ),
});

const LogRedactionConfigurationSchema = z.object({
  EntitiesToRedact: z.array(
    z.enum(["ALL_PERSONALLY_IDENTIFIABLE_INFORMATION", "NUMBERS", "CUSTOM"]),
  ),
  CustomEntityConfig: CustomEntityConfigSchema.optional(),
});

const LogsConfigurationPolicySchema = z.object({
  AllowedAccountIds: z.array(z.string().regex(new RegExp("^[0-9]{12}$"))),
  FilterPattern: z.string().min(0).max(1024).optional(),
  LogType: z.enum(["ALL", "ERROR_SUMMARY"]).optional(),
  LogRedactionConfiguration: LogRedactionConfigurationSchema.optional(),
});

const MetricsConfigurationPolicySchema = z.object({
  NoiseLevel: z.enum(["HIGH", "MEDIUM", "LOW", "NONE"]),
});

const TrainedModelArtifactMaxSizeSchema = z.object({
  Unit: z.enum(["GB"]),
  Value: z.number().min(0.01).max(10),
});

const TrainedModelsConfigurationPolicySchema = z.object({
  ContainerLogs: z.array(LogsConfigurationPolicySchema).optional(),
  ContainerMetrics: MetricsConfigurationPolicySchema.optional(),
  MaxArtifactSize: TrainedModelArtifactMaxSizeSchema.optional(),
});

const TrainedModelExportsMaxSizeSchema = z.object({
  Unit: z.enum(["GB"]),
  Value: z.number().min(0.01).max(10),
});

const TrainedModelExportsConfigurationPolicySchema = z.object({
  MaxSize: TrainedModelExportsMaxSizeSchema,
  FilesToExport: z.array(z.enum(["MODEL", "OUTPUT"])),
});

const TrainedModelInferenceMaxOutputSizeSchema = z.object({
  Unit: z.enum(["GB"]),
  Value: z.number().min(0.01).max(50),
});

const TrainedModelInferenceJobsConfigurationPolicySchema = z.object({
  ContainerLogs: z.array(LogsConfigurationPolicySchema).optional(),
  MaxOutputSize: TrainedModelInferenceMaxOutputSizeSchema.optional(),
});

const PrivacyConfigurationPoliciesSchema = z.object({
  TrainedModels: TrainedModelsConfigurationPolicySchema.optional(),
  TrainedModelExports: TrainedModelExportsConfigurationPolicySchema.optional(),
  TrainedModelInferenceJobs: TrainedModelInferenceJobsConfigurationPolicySchema
    .optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(1).max(256),
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
  MembershipIdentifier: z.string().min(36).max(36).regex(
    new RegExp(
      "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    ),
  ),
  ConfiguredModelAlgorithmArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:aws[-a-z]*:cleanrooms-ml:[-a-z0-9]+:[0-9]{12}:configured-model-algorithm/[-a-zA-Z0-9_/.]+$",
    ),
  ),
  Name: z.string().min(1).max(63).regex(
    new RegExp(
      "^(?!\\s*$)[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDBFF-\\uDC00\\uDFFF\\t]*$",
    ),
  ),
  Description: z.string().max(255).regex(
    new RegExp(
      "^[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDBFF-\\uDC00\\uDFFF\\t\\r\\n]*$",
    ),
  ).optional(),
  PrivacyConfiguration: z.object({
    Policies: PrivacyConfigurationPoliciesSchema,
  }).optional(),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this cleanrooms-ml configured model algorithm association.",
  ).optional(),
});

const StateSchema = z.object({
  ConfiguredModelAlgorithmAssociationArn: z.string(),
  MembershipIdentifier: z.string().optional(),
  CollaborationIdentifier: z.string().optional(),
  ConfiguredModelAlgorithmArn: z.string().optional(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  PrivacyConfiguration: z.object({
    Policies: PrivacyConfigurationPoliciesSchema,
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
  MembershipIdentifier: z.string().min(36).max(36).regex(
    new RegExp(
      "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    ),
  ).optional(),
  ConfiguredModelAlgorithmArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:aws[-a-z]*:cleanrooms-ml:[-a-z0-9]+:[0-9]{12}:configured-model-algorithm/[-a-zA-Z0-9_/.]+$",
    ),
  ).optional(),
  Name: z.string().min(1).max(63).regex(
    new RegExp(
      "^(?!\\s*$)[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDBFF-\\uDC00\\uDFFF\\t]*$",
    ),
  ).optional(),
  Description: z.string().max(255).regex(
    new RegExp(
      "^[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDBFF-\\uDC00\\uDFFF\\t\\r\\n]*$",
    ),
  ).optional(),
  PrivacyConfiguration: z.object({
    Policies: PrivacyConfigurationPoliciesSchema.optional(),
  }).optional(),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this cleanrooms-ml configured model algorithm association.",
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

/** Swamp extension model for CleanRoomsML ConfiguredModelAlgorithmAssociation. Registered at `@swamp/aws/cleanroomsml/configured-model-algorithm-association`. */
export const model = {
  type: "@swamp/aws/cleanroomsml/configured-model-algorithm-association",
  version: "2026.06.06.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "CleanRoomsML ConfiguredModelAlgorithmAssociation resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CleanRoomsML ConfiguredModelAlgorithmAssociation",
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
          "AWS::CleanRoomsML::ConfiguredModelAlgorithmAssociation",
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
      description: "Get a CleanRoomsML ConfiguredModelAlgorithmAssociation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CleanRoomsML ConfiguredModelAlgorithmAssociation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CleanRoomsML::ConfiguredModelAlgorithmAssociation",
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
      description: "Update a CleanRoomsML ConfiguredModelAlgorithmAssociation",
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
        const identifier = existing.ConfiguredModelAlgorithmAssociationArn
          ?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::CleanRoomsML::ConfiguredModelAlgorithmAssociation",
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
          "AWS::CleanRoomsML::ConfiguredModelAlgorithmAssociation",
          identifier,
          currentState,
          desiredState,
          [
            "MembershipIdentifier",
            "ConfiguredModelAlgorithmArn",
            "Name",
            "Description",
            "PrivacyConfiguration",
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
      description: "Delete a CleanRoomsML ConfiguredModelAlgorithmAssociation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CleanRoomsML ConfiguredModelAlgorithmAssociation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CleanRoomsML::ConfiguredModelAlgorithmAssociation",
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
        "Sync CleanRoomsML ConfiguredModelAlgorithmAssociation state from AWS",
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
        const identifier = existing.ConfiguredModelAlgorithmAssociationArn
          ?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CleanRoomsML::ConfiguredModelAlgorithmAssociation",
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
