// Auto-generated extension model for @swamp/aws/licensemanager/license
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for LicenseManager License (AWS::LicenseManager::License).
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

const EntitlementSchema = z.object({
  Name: z.string(),
  Value: z.string().optional(),
  MaxCount: z.number().int().optional(),
  Overage: z.boolean().optional(),
  Unit: z.string(),
  AllowCheckIn: z.boolean().optional(),
});

const ProvisionalConfigurationSchema = z.object({
  MaxTimeToLiveInMinutes: z.number().int(),
});

const BorrowConfigurationSchema = z.object({
  MaxTimeToLiveInMinutes: z.number().int(),
  AllowEarlyCheckIn: z.boolean(),
});

const MetadataSchema = z.object({
  Name: z.string(),
  Value: z.string(),
});

const TagSchema = z.object({
  Key: z.string().describe("The key name of the tag."),
  Value: z.string().describe("The value for the tag."),
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
  ProductSKU: z.string().min(1).max(1024).describe(
    "ProductSKU of the license.",
  ),
  Issuer: z.object({
    Name: z.string(),
    SignKey: z.string().optional(),
  }),
  LicenseName: z.string().describe("Name for the created license."),
  ProductName: z.string().describe("Product name for the created license."),
  HomeRegion: z.string().describe("Home region for the created license."),
  Validity: z.object({
    Begin: z.string().describe("Validity begin date for the license."),
    End: z.string().describe("Validity begin date for the license."),
  }),
  Entitlements: z.array(EntitlementSchema),
  Beneficiary: z.string().describe("Beneficiary of the license."),
  ConsumptionConfiguration: z.object({
    RenewType: z.string().optional(),
    ProvisionalConfiguration: ProvisionalConfigurationSchema.optional(),
    BorrowConfiguration: BorrowConfigurationSchema.optional(),
  }),
  LicenseMetadata: z.array(MetadataSchema).optional(),
  Status: z.string().optional(),
  Tags: z.array(TagSchema).describe("A list of tags to attach.").optional(),
});

const StateSchema = z.object({
  ProductSKU: z.string().optional(),
  Issuer: z.object({
    Name: z.string(),
    SignKey: z.string(),
  }).optional(),
  LicenseName: z.string().optional(),
  ProductName: z.string().optional(),
  HomeRegion: z.string().optional(),
  Validity: z.object({
    Begin: z.string(),
    End: z.string(),
  }).optional(),
  Entitlements: z.array(EntitlementSchema).optional(),
  Beneficiary: z.string().optional(),
  ConsumptionConfiguration: z.object({
    RenewType: z.string(),
    ProvisionalConfiguration: ProvisionalConfigurationSchema,
    BorrowConfiguration: BorrowConfigurationSchema,
  }).optional(),
  LicenseMetadata: z.array(MetadataSchema).optional(),
  LicenseArn: z.string(),
  Status: z.string().optional(),
  Version: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ProductSKU: z.string().min(1).max(1024).describe("ProductSKU of the license.")
    .optional(),
  Issuer: z.object({
    Name: z.string().optional(),
    SignKey: z.string().optional(),
  }).optional(),
  LicenseName: z.string().describe("Name for the created license.").optional(),
  ProductName: z.string().describe("Product name for the created license.")
    .optional(),
  HomeRegion: z.string().describe("Home region for the created license.")
    .optional(),
  Validity: z.object({
    Begin: z.string().describe("Validity begin date for the license.")
      .optional(),
    End: z.string().describe("Validity begin date for the license.").optional(),
  }).optional(),
  Entitlements: z.array(EntitlementSchema).optional(),
  Beneficiary: z.string().describe("Beneficiary of the license.").optional(),
  ConsumptionConfiguration: z.object({
    RenewType: z.string().optional(),
    ProvisionalConfiguration: ProvisionalConfigurationSchema.optional(),
    BorrowConfiguration: BorrowConfigurationSchema.optional(),
  }).optional(),
  LicenseMetadata: z.array(MetadataSchema).optional(),
  Status: z.string().optional(),
  Tags: z.array(TagSchema).describe("A list of tags to attach.").optional(),
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

/** Swamp extension model for LicenseManager License. Registered at `@swamp/aws/licensemanager/license`. */
export const model = {
  type: "@swamp/aws/licensemanager/license",
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
      description: "LicenseManager License resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a LicenseManager License",
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
          "AWS::LicenseManager::License",
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
      description: "Get a LicenseManager License",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the LicenseManager License",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::LicenseManager::License",
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
      description: "Update a LicenseManager License",
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
        const identifier = existing.LicenseArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::LicenseManager::License",
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
          "AWS::LicenseManager::License",
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
      description: "Delete a LicenseManager License",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the LicenseManager License",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::LicenseManager::License",
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
      description: "Sync LicenseManager License state from AWS",
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
        const identifier = existing.LicenseArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::LicenseManager::License",
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
