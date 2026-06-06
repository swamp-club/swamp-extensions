// Auto-generated extension model for @swamp/aws/glue/catalog
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Glue Catalog (AWS::Glue::Catalog).
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

const DataLakeAccessPropertiesSchema = z.object({
  DataLakeAccess: z.boolean().describe(
    "Turns on or off data lake access for Apache Spark applications that access Amazon Redshift databases in the Data Catalog from any non-Redshift engine.",
  ).optional(),
  DataTransferRole: z.string().describe(
    "A role that will be assumed by Glue for transferring data into/out of the staging bucket during a query.",
  ).optional(),
  KmsKey: z.string().describe(
    "An encryption key that will be used for the staging bucket that will be created along with the catalog.",
  ).optional(),
  CatalogType: z.string().describe(
    "Specifies a federated catalog type for the native catalog resource.",
  ).optional(),
  AllowFullTableExternalDataAccess: z.enum(["True", "False"]).describe(
    "Allows third-party engines to access data in Amazon S3 locations that are registered with Lake Formation.",
  ).optional(),
});

const DataLakePrincipalSchema = z.object({
  DataLakePrincipalIdentifier: z.string().min(1).max(255).describe(
    "An identifier for the Lake Formation principal.",
  ).optional(),
});

const PrincipalPermissionsSchema = z.object({
  Principal: DataLakePrincipalSchema.describe("The Lake Formation principal.")
    .optional(),
  Permissions: z.array(
    z.enum([
      "ALL",
      "SELECT",
      "ALTER",
      "DROP",
      "DELETE",
      "INSERT",
      "CREATE_DATABASE",
      "CREATE_TABLE",
      "DATA_LOCATION_ACCESS",
    ]),
  ).describe("The permissions that are granted to the principal.").optional(),
});

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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  Name: z.string().min(1).max(255).describe(
    "The name of the catalog to create.",
  ),
  Description: z.string().max(2048).describe("A description of the catalog.")
    .optional(),
  Parameters: z.record(z.string(), z.string()).describe(
    "A map of key-value pairs that define parameters and properties of the catalog.",
  ).optional(),
  FederatedCatalog: z.object({
    Identifier: z.string().describe(
      "A unique identifier for the federated catalog.",
    ).optional(),
    ConnectionName: z.string().describe(
      "The name of the connection to an external data source.",
    ).optional(),
  }).describe(
    "A FederatedCatalog structure that references an entity outside the Glue Data Catalog.",
  ).optional(),
  TargetRedshiftCatalog: z.object({
    CatalogArn: z.string().describe(
      "The Amazon Resource Name (ARN) of the catalog resource.",
    ),
  }).describe(
    "A structure that describes a target catalog for resource linking.",
  ).optional(),
  CatalogProperties: z.object({
    DataLakeAccessProperties: DataLakeAccessPropertiesSchema.describe(
      "Data lake access properties for the catalog.",
    ).optional(),
  }).describe(
    "A structure that specifies data lake access properties and other custom properties.",
  ).optional(),
  CreateTableDefaultPermissions: z.array(PrincipalPermissionsSchema).describe(
    "An array of PrincipalPermissions objects for default table permissions.",
  ).optional(),
  CreateDatabaseDefaultPermissions: z.array(PrincipalPermissionsSchema)
    .describe(
      "An array of PrincipalPermissions objects for default database permissions.",
    ).optional(),
  AllowFullTableExternalDataAccess: z.enum(["True", "False"]).describe(
    "Allows third-party engines to access data in Amazon S3 locations that are registered with Lake Formation.",
  ).optional(),
  OverwriteChildResourcePermissionsWithDefault: z.enum(["Accept", "Deny"])
    .describe(
      "Specifies whether to overwrite child resource permissions with the default permissions.",
    ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  CatalogId: z.string().optional(),
  ResourceArn: z.string(),
  CreateTime: z.number().optional(),
  UpdateTime: z.number().optional(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  Parameters: z.record(z.string(), z.unknown()).optional(),
  FederatedCatalog: z.object({
    Identifier: z.string(),
    ConnectionName: z.string(),
  }).optional(),
  TargetRedshiftCatalog: z.object({
    CatalogArn: z.string(),
  }).optional(),
  CatalogProperties: z.object({
    DataLakeAccessProperties: DataLakeAccessPropertiesSchema,
    CustomProperties: z.record(z.string(), z.unknown()),
  }).optional(),
  CreateTableDefaultPermissions: z.array(PrincipalPermissionsSchema).optional(),
  CreateDatabaseDefaultPermissions: z.array(PrincipalPermissionsSchema)
    .optional(),
  AllowFullTableExternalDataAccess: z.string().optional(),
  OverwriteChildResourcePermissionsWithDefault: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(255).describe(
    "The name of the catalog to create.",
  ).optional(),
  Description: z.string().max(2048).describe("A description of the catalog.")
    .optional(),
  Parameters: z.record(z.string(), z.string()).describe(
    "A map of key-value pairs that define parameters and properties of the catalog.",
  ).optional(),
  FederatedCatalog: z.object({
    Identifier: z.string().describe(
      "A unique identifier for the federated catalog.",
    ).optional(),
    ConnectionName: z.string().describe(
      "The name of the connection to an external data source.",
    ).optional(),
  }).describe(
    "A FederatedCatalog structure that references an entity outside the Glue Data Catalog.",
  ).optional(),
  TargetRedshiftCatalog: z.object({
    CatalogArn: z.string().describe(
      "The Amazon Resource Name (ARN) of the catalog resource.",
    ).optional(),
  }).describe(
    "A structure that describes a target catalog for resource linking.",
  ).optional(),
  CatalogProperties: z.object({
    DataLakeAccessProperties: DataLakeAccessPropertiesSchema.describe(
      "Data lake access properties for the catalog.",
    ).optional(),
  }).describe(
    "A structure that specifies data lake access properties and other custom properties.",
  ).optional(),
  CreateTableDefaultPermissions: z.array(PrincipalPermissionsSchema).describe(
    "An array of PrincipalPermissions objects for default table permissions.",
  ).optional(),
  CreateDatabaseDefaultPermissions: z.array(PrincipalPermissionsSchema)
    .describe(
      "An array of PrincipalPermissions objects for default database permissions.",
    ).optional(),
  AllowFullTableExternalDataAccess: z.enum(["True", "False"]).describe(
    "Allows third-party engines to access data in Amazon S3 locations that are registered with Lake Formation.",
  ).optional(),
  OverwriteChildResourcePermissionsWithDefault: z.enum(["Accept", "Deny"])
    .describe(
      "Specifies whether to overwrite child resource permissions with the default permissions.",
    ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
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

/** Swamp extension model for Glue Catalog. Registered at `@swamp/aws/glue/catalog`. */
export const model = {
  type: "@swamp/aws/glue/catalog",
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
      description: "Glue Catalog resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Glue Catalog",
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
          "AWS::Glue::Catalog",
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
      description: "Get a Glue Catalog",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue Catalog",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Glue::Catalog",
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
      description: "Update a Glue Catalog",
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
        const identifier = existing.ResourceArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Glue::Catalog",
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
          "AWS::Glue::Catalog",
          identifier,
          currentState,
          desiredState,
          ["Name"],
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
      description: "Delete a Glue Catalog",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue Catalog",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Glue::Catalog",
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
      description: "Sync Glue Catalog state from AWS",
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
        const identifier = existing.ResourceArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Glue::Catalog",
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
