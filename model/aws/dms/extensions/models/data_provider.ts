// Auto-generated extension model for @swamp/aws/dms/data-provider
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for DMS DataProvider (AWS::DMS::DataProvider).
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
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  DataProviderName: z.string().min(1).max(255).describe(
    "The property describes a name to identify the data provider.",
  ).optional(),
  DataProviderIdentifier: z.string().min(1).max(255).describe(
    "The property describes an identifier for the data provider. It is used for describing/deleting/modifying can be name/arn",
  ).optional(),
  Description: z.string().min(1).max(255).describe(
    "The optional description of the data provider.",
  ).optional(),
  Engine: z.enum([
    "aurora",
    "aurora_postgresql",
    "mysql",
    "oracle",
    "postgres",
    "sqlserver",
    "redshift",
    "mariadb",
    "mongodb",
    "docdb",
    "db2",
    "db2_zos",
    "sybase",
  ]).describe("The property describes a data engine for the data provider."),
  ExactSettings: z.boolean().describe(
    "The property describes the exact settings which can be modified",
  ).optional(),
  Settings: z.object({
    PostgreSqlSettings: z.object({
      ServerName: z.string(),
      Port: z.number().int(),
      DatabaseName: z.string(),
      SslMode: z.enum(["none", "require", "verify-ca", "verify-full"]),
      CertificateArn: z.string().optional(),
    }).describe("PostgreSqlSettings property identifier.").optional(),
    MySqlSettings: z.object({
      ServerName: z.string(),
      Port: z.number().int(),
      SslMode: z.enum(["none", "require", "verify-ca", "verify-full"]),
      CertificateArn: z.string().optional(),
    }).describe("MySqlSettings property identifier.").optional(),
    OracleSettings: z.object({
      ServerName: z.string(),
      Port: z.number().int(),
      DatabaseName: z.string(),
      SslMode: z.enum(["none", "require", "verify-ca", "verify-full"]),
      CertificateArn: z.string().optional(),
      AsmServer: z.string().optional(),
      SecretsManagerOracleAsmSecretId: z.string().optional(),
      SecretsManagerOracleAsmAccessRoleArn: z.string().optional(),
      SecretsManagerSecurityDbEncryptionSecretId: z.string().optional(),
      SecretsManagerSecurityDbEncryptionAccessRoleArn: z.string().optional(),
    }).describe("OracleSettings property identifier.").optional(),
    MicrosoftSqlServerSettings: z.object({
      ServerName: z.string(),
      Port: z.number().int(),
      DatabaseName: z.string(),
      SslMode: z.enum(["none", "require", "verify-ca", "verify-full"]),
      CertificateArn: z.string().optional(),
    }).describe("MicrosoftSqlServerSettings property identifier.").optional(),
    RedshiftSettings: z.object({
      ServerName: z.string(),
      Port: z.number().int(),
      DatabaseName: z.string(),
    }).describe("RedshiftSettings property identifier.").optional(),
    MariaDbSettings: z.object({
      ServerName: z.string(),
      Port: z.number().int(),
      SslMode: z.enum(["none", "require", "verify-ca", "verify-full"]),
      CertificateArn: z.string().optional(),
    }).describe("MariaDbSettings property identifier.").optional(),
    DocDbSettings: z.object({
      ServerName: z.string(),
      Port: z.number().int(),
      DatabaseName: z.string(),
      SslMode: z.enum(["none", "require", "verify-full"]).optional(),
      CertificateArn: z.string().optional(),
    }).describe("DocDbSettings property identifier.").optional(),
    MongoDbSettings: z.object({
      ServerName: z.string(),
      Port: z.number().int(),
      DatabaseName: z.string().optional(),
      SslMode: z.enum(["none", "require", "verify-full"]).optional(),
      CertificateArn: z.string().optional(),
      AuthType: z.enum(["no", "password"]).optional(),
      AuthSource: z.string().optional(),
      AuthMechanism: z.enum(["default", "mongodb_cr", "scram_sha_1"])
        .optional(),
    }).describe("MongoDbSettings property identifier.").optional(),
    IbmDb2LuwSettings: z.object({
      ServerName: z.string(),
      Port: z.number().int(),
      DatabaseName: z.string(),
      SslMode: z.enum(["none", "verify-ca"]),
      CertificateArn: z.string().optional(),
    }).describe("IbmDb2LuwSettings property identifier.").optional(),
    IbmDb2zOsSettings: z.object({
      ServerName: z.string(),
      Port: z.number().int(),
      DatabaseName: z.string(),
      SslMode: z.enum(["none", "verify-ca"]),
      CertificateArn: z.string().optional(),
    }).describe("IbmDb2zOsSettings property identifier.").optional(),
    SybaseAseSettings: z.object({
      ServerName: z.string(),
      Port: z.number().int(),
      DatabaseName: z.string().optional(),
      EncryptPassword: z.boolean().optional(),
      SslMode: z.enum(["none", "require", "verify-ca"]),
      CertificateArn: z.string().optional(),
    }).describe("SybaseAseSettings property identifier.").optional(),
  }).describe(
    "The property identifies the exact type of settings for the data provider.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  DataProviderName: z.string().optional(),
  DataProviderIdentifier: z.string().optional(),
  DataProviderArn: z.string(),
  DataProviderCreationTime: z.string().optional(),
  Description: z.string().optional(),
  Engine: z.string().optional(),
  ExactSettings: z.boolean().optional(),
  Settings: z.object({
    PostgreSqlSettings: z.object({
      ServerName: z.string(),
      Port: z.number(),
      DatabaseName: z.string(),
      SslMode: z.string(),
      CertificateArn: z.string(),
    }),
    MySqlSettings: z.object({
      ServerName: z.string(),
      Port: z.number(),
      SslMode: z.string(),
      CertificateArn: z.string(),
    }),
    OracleSettings: z.object({
      ServerName: z.string(),
      Port: z.number(),
      DatabaseName: z.string(),
      SslMode: z.string(),
      CertificateArn: z.string(),
      AsmServer: z.string(),
      SecretsManagerOracleAsmSecretId: z.string(),
      SecretsManagerOracleAsmAccessRoleArn: z.string(),
      SecretsManagerSecurityDbEncryptionSecretId: z.string(),
      SecretsManagerSecurityDbEncryptionAccessRoleArn: z.string(),
    }),
    MicrosoftSqlServerSettings: z.object({
      ServerName: z.string(),
      Port: z.number(),
      DatabaseName: z.string(),
      SslMode: z.string(),
      CertificateArn: z.string(),
    }),
    RedshiftSettings: z.object({
      ServerName: z.string(),
      Port: z.number(),
      DatabaseName: z.string(),
    }),
    MariaDbSettings: z.object({
      ServerName: z.string(),
      Port: z.number(),
      SslMode: z.string(),
      CertificateArn: z.string(),
    }),
    DocDbSettings: z.object({
      ServerName: z.string(),
      Port: z.number(),
      DatabaseName: z.string(),
      SslMode: z.string(),
      CertificateArn: z.string(),
    }),
    MongoDbSettings: z.object({
      ServerName: z.string(),
      Port: z.number(),
      DatabaseName: z.string(),
      SslMode: z.string(),
      CertificateArn: z.string(),
      AuthType: z.string(),
      AuthSource: z.string(),
      AuthMechanism: z.string(),
    }),
    IbmDb2LuwSettings: z.object({
      ServerName: z.string(),
      Port: z.number(),
      DatabaseName: z.string(),
      SslMode: z.string(),
      CertificateArn: z.string(),
    }),
    IbmDb2zOsSettings: z.object({
      ServerName: z.string(),
      Port: z.number(),
      DatabaseName: z.string(),
      SslMode: z.string(),
      CertificateArn: z.string(),
    }),
    SybaseAseSettings: z.object({
      ServerName: z.string(),
      Port: z.number(),
      DatabaseName: z.string(),
      EncryptPassword: z.boolean(),
      SslMode: z.string(),
      CertificateArn: z.string(),
    }),
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
  DataProviderName: z.string().min(1).max(255).describe(
    "The property describes a name to identify the data provider.",
  ).optional(),
  DataProviderIdentifier: z.string().min(1).max(255).describe(
    "The property describes an identifier for the data provider. It is used for describing/deleting/modifying can be name/arn",
  ).optional(),
  Description: z.string().min(1).max(255).describe(
    "The optional description of the data provider.",
  ).optional(),
  Engine: z.enum([
    "aurora",
    "aurora_postgresql",
    "mysql",
    "oracle",
    "postgres",
    "sqlserver",
    "redshift",
    "mariadb",
    "mongodb",
    "docdb",
    "db2",
    "db2_zos",
    "sybase",
  ]).describe("The property describes a data engine for the data provider.")
    .optional(),
  ExactSettings: z.boolean().describe(
    "The property describes the exact settings which can be modified",
  ).optional(),
  Settings: z.object({
    PostgreSqlSettings: z.object({
      ServerName: z.string().optional(),
      Port: z.number().int().optional(),
      DatabaseName: z.string().optional(),
      SslMode: z.enum(["none", "require", "verify-ca", "verify-full"])
        .optional(),
      CertificateArn: z.string().optional(),
    }).describe("PostgreSqlSettings property identifier.").optional(),
    MySqlSettings: z.object({
      ServerName: z.string().optional(),
      Port: z.number().int().optional(),
      SslMode: z.enum(["none", "require", "verify-ca", "verify-full"])
        .optional(),
      CertificateArn: z.string().optional(),
    }).describe("MySqlSettings property identifier.").optional(),
    OracleSettings: z.object({
      ServerName: z.string().optional(),
      Port: z.number().int().optional(),
      DatabaseName: z.string().optional(),
      SslMode: z.enum(["none", "require", "verify-ca", "verify-full"])
        .optional(),
      CertificateArn: z.string().optional(),
      AsmServer: z.string().optional(),
      SecretsManagerOracleAsmSecretId: z.string().optional(),
      SecretsManagerOracleAsmAccessRoleArn: z.string().optional(),
      SecretsManagerSecurityDbEncryptionSecretId: z.string().optional(),
      SecretsManagerSecurityDbEncryptionAccessRoleArn: z.string().optional(),
    }).describe("OracleSettings property identifier.").optional(),
    MicrosoftSqlServerSettings: z.object({
      ServerName: z.string().optional(),
      Port: z.number().int().optional(),
      DatabaseName: z.string().optional(),
      SslMode: z.enum(["none", "require", "verify-ca", "verify-full"])
        .optional(),
      CertificateArn: z.string().optional(),
    }).describe("MicrosoftSqlServerSettings property identifier.").optional(),
    RedshiftSettings: z.object({
      ServerName: z.string().optional(),
      Port: z.number().int().optional(),
      DatabaseName: z.string().optional(),
    }).describe("RedshiftSettings property identifier.").optional(),
    MariaDbSettings: z.object({
      ServerName: z.string().optional(),
      Port: z.number().int().optional(),
      SslMode: z.enum(["none", "require", "verify-ca", "verify-full"])
        .optional(),
      CertificateArn: z.string().optional(),
    }).describe("MariaDbSettings property identifier.").optional(),
    DocDbSettings: z.object({
      ServerName: z.string().optional(),
      Port: z.number().int().optional(),
      DatabaseName: z.string().optional(),
      SslMode: z.enum(["none", "require", "verify-full"]).optional(),
      CertificateArn: z.string().optional(),
    }).describe("DocDbSettings property identifier.").optional(),
    MongoDbSettings: z.object({
      ServerName: z.string().optional(),
      Port: z.number().int().optional(),
      DatabaseName: z.string().optional(),
      SslMode: z.enum(["none", "require", "verify-full"]).optional(),
      CertificateArn: z.string().optional(),
      AuthType: z.enum(["no", "password"]).optional(),
      AuthSource: z.string().optional(),
      AuthMechanism: z.enum(["default", "mongodb_cr", "scram_sha_1"])
        .optional(),
    }).describe("MongoDbSettings property identifier.").optional(),
    IbmDb2LuwSettings: z.object({
      ServerName: z.string().optional(),
      Port: z.number().int().optional(),
      DatabaseName: z.string().optional(),
      SslMode: z.enum(["none", "verify-ca"]).optional(),
      CertificateArn: z.string().optional(),
    }).describe("IbmDb2LuwSettings property identifier.").optional(),
    IbmDb2zOsSettings: z.object({
      ServerName: z.string().optional(),
      Port: z.number().int().optional(),
      DatabaseName: z.string().optional(),
      SslMode: z.enum(["none", "verify-ca"]).optional(),
      CertificateArn: z.string().optional(),
    }).describe("IbmDb2zOsSettings property identifier.").optional(),
    SybaseAseSettings: z.object({
      ServerName: z.string().optional(),
      Port: z.number().int().optional(),
      DatabaseName: z.string().optional(),
      EncryptPassword: z.boolean().optional(),
      SslMode: z.enum(["none", "require", "verify-ca"]).optional(),
      CertificateArn: z.string().optional(),
    }).describe("SybaseAseSettings property identifier.").optional(),
  }).describe(
    "The property identifies the exact type of settings for the data provider.",
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

/** Swamp extension model for DMS DataProvider. Registered at `@swamp/aws/dms/data-provider`. */
export const model = {
  type: "@swamp/aws/dms/data-provider",
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
      description: "DMS DataProvider resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a DMS DataProvider",
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
          "AWS::DMS::DataProvider",
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
      description: "Get a DMS DataProvider",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DMS DataProvider",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::DMS::DataProvider",
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
      description: "Update a DMS DataProvider",
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
        const identifier = existing.DataProviderArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::DMS::DataProvider",
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
          "AWS::DMS::DataProvider",
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
      description: "Delete a DMS DataProvider",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DMS DataProvider",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::DMS::DataProvider",
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
      description: "Sync DMS DataProvider state from AWS",
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
        const identifier = existing.DataProviderArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::DMS::DataProvider",
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
