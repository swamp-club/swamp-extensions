// Auto-generated extension model for @swamp/gcp/spanner/instances-databases
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Spanner Instances.Databases.
 *
 * A Cloud Spanner database.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/databases/${shortName}`;
}

const BASE_URL = "https://spanner.googleapis.com/";

const GET_CONFIG = {
  "id": "spanner.projects.instances.databases.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "spanner.projects.instances.databases.create",
  "path": "v1/{+parent}/databases",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "spanner.projects.instances.databases.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "spanner.projects.instances.databases.list",
  "path": "v1/{+parent}/databases",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  createStatement: z.string().describe(
    "Required. A `CREATE DATABASE` statement, which specifies the ID of the new database. The database ID must conform to the regular expression `a-z*[a-z0-9]` and be between 2 and 30 characters in length. If the database ID is a reserved word or if it contains a hyphen, the database ID must be enclosed in backticks (`` ` ``).",
  ).optional(),
  databaseDialect: z.enum([
    "DATABASE_DIALECT_UNSPECIFIED",
    "GOOGLE_STANDARD_SQL",
    "POSTGRESQL",
  ]).describe("Output only. The dialect of the Cloud Spanner Database.")
    .optional(),
  encryptionConfig: z.object({
    kmsKeyName: z.string().describe(
      "The Cloud KMS key to be used for encrypting and decrypting the database. Values are of the form `projects//locations//keyRings//cryptoKeys/`.",
    ).optional(),
    kmsKeyNames: z.array(z.string()).describe(
      "Specifies the KMS configuration for one or more keys used to encrypt the database. Values are of the form `projects//locations//keyRings//cryptoKeys/`. The keys referenced by `kms_key_names` must fully cover all regions of the database's instance configuration. Some examples: * For regional (single-region) instance configurations, specify a regional location KMS key. * For multi-region instance configurations of type `GOOGLE_MANAGED`, either specify a multi-region location KMS key or multiple regional location KMS keys that cover all regions in the instance configuration. * For an instance configuration of type `USER_MANAGED`, specify only regional location KMS keys to cover each region in the instance configuration. Multi-region location KMS keys aren't supported for `USER_MANAGED` type instance configurations.",
    ).optional(),
  }).describe("Encryption configuration for a Cloud Spanner database.")
    .optional(),
  extraStatements: z.array(z.string()).describe(
    "Optional. A list of DDL statements to run inside the newly created database. Statements can create tables, indexes, etc. These statements execute atomically with the creation of the database: if there is an error in any statement, the database is not created.",
  ).optional(),
  protoDescriptors: z.string().describe(
    "Optional. Proto descriptors used by `CREATE/ALTER PROTO BUNDLE` statements in 'extra_statements'. Contains a protobuf-serialized [`google.protobuf.FileDescriptorSet`](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/descriptor.proto) descriptor set. To generate it, [install](https://grpc.io/docs/protoc-installation/) and run `protoc` with --include_imports and --descriptor_set_out. For example, to generate for moon/shot/app.proto, run ` $protoc --proto_path=/app_path --proto_path=/lib_path \\ --include_imports \\ --descriptor_set_out=descriptors.data \\ moon/shot/app.proto ` For more details, see protobuffer [self description](https://developers.google.com/protocol-buffers/docs/techniques#self-description).",
  ).optional(),
  createTime: z.string().describe(
    "Output only. If exists, the time at which the database creation started.",
  ).optional(),
  defaultLeader: z.string().describe(
    "Output only. The read-write region which contains the database's leader replicas. This is the same as the value of default_leader database option set using DatabaseAdmin.CreateDatabase or DatabaseAdmin.UpdateDatabaseDdl. If not explicitly set, this is empty.",
  ).optional(),
  earliestVersionTime: z.string().describe(
    "Output only. Earliest timestamp at which older versions of the data can be read. This value is continuously updated by Cloud Spanner and becomes stale the moment it is queried. If you are using this value to recover data, make sure to account for the time from the moment when the value is queried to the moment when you initiate the recovery.",
  ).optional(),
  enableDropProtection: z.boolean().describe(
    "Optional. Whether drop protection is enabled for this database. Defaults to false, if not set. For more details, please see how to [prevent accidental database deletion](https://cloud.google.com/spanner/docs/prevent-database-deletion).",
  ).optional(),
  encryptionInfo: z.array(z.object({
    encryptionStatus: z.object({
      code: z.number().int().describe(
        "The status code, which should be an enum value of google.rpc.Code.",
      ).optional(),
      details: z.array(z.record(z.string(), z.unknown())).describe(
        "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
      ).optional(),
      message: z.string().describe(
        "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
      ).optional(),
    }).describe(
      "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
    ).optional(),
    encryptionType: z.enum([
      "TYPE_UNSPECIFIED",
      "GOOGLE_DEFAULT_ENCRYPTION",
      "CUSTOMER_MANAGED_ENCRYPTION",
    ]).describe("Output only. The type of encryption.").optional(),
    kmsKeyVersion: z.string().describe(
      "Output only. A Cloud KMS key version that is being used to protect the database or backup.",
    ).optional(),
  })).describe(
    "Output only. For databases that are using customer managed encryption, this field contains the encryption information for the database, such as all Cloud KMS key versions that are in use. The `encryption_status` field inside of each `EncryptionInfo` is not populated. For databases that are using Google default or other types of encryption, this field is empty. This field is propagated lazily from the backend. There might be a delay from when a key version is being used and when it appears in this field.",
  ).optional(),
  name: z.string().describe(
    "Required. The name of the database. Values are of the form `projects//instances//databases/`, where `` is as specified in the `CREATE DATABASE` statement. This name can be passed to other API methods to identify the database.",
  ).optional(),
  quorumInfo: z.object({
    etag: z.string().describe(
      "Output only. The etag is used for optimistic concurrency control as a way to help prevent simultaneous `ChangeQuorum` requests that might create a race condition.",
    ).optional(),
    initiator: z.enum(["INITIATOR_UNSPECIFIED", "GOOGLE", "USER"]).describe(
      "Output only. Whether this `ChangeQuorum` is Google or User initiated.",
    ).optional(),
    quorumType: z.object({
      dualRegion: z.object({}).describe(
        "Message type for a dual-region quorum. Currently this type has no options.",
      ).optional(),
      singleRegion: z.object({
        servingLocation: z.string().describe(
          'Required. The location of the serving region, for example, "us-central1". The location must be one of the regions within the dual-region instance configuration of your database. The list of valid locations is available using the GetInstanceConfig API. This should only be used if you plan to change quorum to the single-region quorum type.',
        ).optional(),
      }).describe("Message type for a single-region quorum.").optional(),
    }).describe(
      "Information about the database quorum type. This only applies to dual-region instance configs.",
    ).optional(),
    startTime: z.string().describe(
      "Output only. The timestamp when the request was triggered.",
    ).optional(),
  }).describe("Information about the dual-region quorum.").optional(),
  reconciling: z.boolean().describe(
    "Output only. If true, the database is being updated. If false, there are no ongoing update operations for the database.",
  ).optional(),
  restoreInfo: z.object({
    backupInfo: z.object({
      backup: z.string().describe("Name of the backup.").optional(),
      createTime: z.string().describe(
        "The time the CreateBackup request was received.",
      ).optional(),
      sourceDatabase: z.string().describe(
        "Name of the database the backup was created from.",
      ).optional(),
      versionTime: z.string().describe(
        "The backup contains an externally consistent copy of `source_database` at the timestamp specified by `version_time`. If the CreateBackup request did not specify `version_time`, the `version_time` of the backup is equivalent to the `create_time`.",
      ).optional(),
    }).describe("Information about a backup.").optional(),
    sourceType: z.enum(["TYPE_UNSPECIFIED", "BACKUP"]).describe(
      "The type of the restore source.",
    ).optional(),
  }).describe("Information about the database restore.").optional(),
  state: z.enum(["STATE_UNSPECIFIED", "CREATING", "READY", "READY_OPTIMIZING"])
    .describe("Output only. The current database state.").optional(),
  versionRetentionPeriod: z.string().describe(
    "Output only. The period in which Cloud Spanner retains all versions of data for the database. This is the same as the value of version_retention_period database option set using UpdateDatabaseDdl. Defaults to 1 hour, if not set.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  databaseDialect: z.string().optional(),
  defaultLeader: z.string().optional(),
  earliestVersionTime: z.string().optional(),
  enableDropProtection: z.boolean().optional(),
  encryptionConfig: z.object({
    kmsKeyName: z.string(),
    kmsKeyNames: z.array(z.string()),
  }).optional(),
  encryptionInfo: z.array(z.object({
    encryptionStatus: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    encryptionType: z.string(),
    kmsKeyVersion: z.string(),
  })).optional(),
  name: z.string(),
  quorumInfo: z.object({
    etag: z.string(),
    initiator: z.string(),
    quorumType: z.object({
      dualRegion: z.object({}),
      singleRegion: z.object({
        servingLocation: z.string(),
      }),
    }),
    startTime: z.string(),
  }).optional(),
  reconciling: z.boolean().optional(),
  restoreInfo: z.object({
    backupInfo: z.object({
      backup: z.string(),
      createTime: z.string(),
      sourceDatabase: z.string(),
      versionTime: z.string(),
    }),
    sourceType: z.string(),
  }).optional(),
  state: z.string().optional(),
  versionRetentionPeriod: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  createStatement: z.string().describe(
    "Required. A `CREATE DATABASE` statement, which specifies the ID of the new database. The database ID must conform to the regular expression `a-z*[a-z0-9]` and be between 2 and 30 characters in length. If the database ID is a reserved word or if it contains a hyphen, the database ID must be enclosed in backticks (`` ` ``).",
  ).optional(),
  databaseDialect: z.enum([
    "DATABASE_DIALECT_UNSPECIFIED",
    "GOOGLE_STANDARD_SQL",
    "POSTGRESQL",
  ]).describe("Output only. The dialect of the Cloud Spanner Database.")
    .optional(),
  encryptionConfig: z.object({
    kmsKeyName: z.string().describe(
      "The Cloud KMS key to be used for encrypting and decrypting the database. Values are of the form `projects//locations//keyRings//cryptoKeys/`.",
    ).optional(),
    kmsKeyNames: z.array(z.string()).describe(
      "Specifies the KMS configuration for one or more keys used to encrypt the database. Values are of the form `projects//locations//keyRings//cryptoKeys/`. The keys referenced by `kms_key_names` must fully cover all regions of the database's instance configuration. Some examples: * For regional (single-region) instance configurations, specify a regional location KMS key. * For multi-region instance configurations of type `GOOGLE_MANAGED`, either specify a multi-region location KMS key or multiple regional location KMS keys that cover all regions in the instance configuration. * For an instance configuration of type `USER_MANAGED`, specify only regional location KMS keys to cover each region in the instance configuration. Multi-region location KMS keys aren't supported for `USER_MANAGED` type instance configurations.",
    ).optional(),
  }).describe("Encryption configuration for a Cloud Spanner database.")
    .optional(),
  extraStatements: z.array(z.string()).describe(
    "Optional. A list of DDL statements to run inside the newly created database. Statements can create tables, indexes, etc. These statements execute atomically with the creation of the database: if there is an error in any statement, the database is not created.",
  ).optional(),
  protoDescriptors: z.string().describe(
    "Optional. Proto descriptors used by `CREATE/ALTER PROTO BUNDLE` statements in 'extra_statements'. Contains a protobuf-serialized [`google.protobuf.FileDescriptorSet`](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/descriptor.proto) descriptor set. To generate it, [install](https://grpc.io/docs/protoc-installation/) and run `protoc` with --include_imports and --descriptor_set_out. For example, to generate for moon/shot/app.proto, run ` $protoc --proto_path=/app_path --proto_path=/lib_path \\ --include_imports \\ --descriptor_set_out=descriptors.data \\ moon/shot/app.proto ` For more details, see protobuffer [self description](https://developers.google.com/protocol-buffers/docs/techniques#self-description).",
  ).optional(),
  createTime: z.string().describe(
    "Output only. If exists, the time at which the database creation started.",
  ).optional(),
  defaultLeader: z.string().describe(
    "Output only. The read-write region which contains the database's leader replicas. This is the same as the value of default_leader database option set using DatabaseAdmin.CreateDatabase or DatabaseAdmin.UpdateDatabaseDdl. If not explicitly set, this is empty.",
  ).optional(),
  earliestVersionTime: z.string().describe(
    "Output only. Earliest timestamp at which older versions of the data can be read. This value is continuously updated by Cloud Spanner and becomes stale the moment it is queried. If you are using this value to recover data, make sure to account for the time from the moment when the value is queried to the moment when you initiate the recovery.",
  ).optional(),
  enableDropProtection: z.boolean().describe(
    "Optional. Whether drop protection is enabled for this database. Defaults to false, if not set. For more details, please see how to [prevent accidental database deletion](https://cloud.google.com/spanner/docs/prevent-database-deletion).",
  ).optional(),
  encryptionInfo: z.array(z.object({
    encryptionStatus: z.object({
      code: z.number().int().describe(
        "The status code, which should be an enum value of google.rpc.Code.",
      ).optional(),
      details: z.array(z.record(z.string(), z.unknown())).describe(
        "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
      ).optional(),
      message: z.string().describe(
        "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
      ).optional(),
    }).describe(
      "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
    ).optional(),
    encryptionType: z.enum([
      "TYPE_UNSPECIFIED",
      "GOOGLE_DEFAULT_ENCRYPTION",
      "CUSTOMER_MANAGED_ENCRYPTION",
    ]).describe("Output only. The type of encryption.").optional(),
    kmsKeyVersion: z.string().describe(
      "Output only. A Cloud KMS key version that is being used to protect the database or backup.",
    ).optional(),
  })).describe(
    "Output only. For databases that are using customer managed encryption, this field contains the encryption information for the database, such as all Cloud KMS key versions that are in use. The `encryption_status` field inside of each `EncryptionInfo` is not populated. For databases that are using Google default or other types of encryption, this field is empty. This field is propagated lazily from the backend. There might be a delay from when a key version is being used and when it appears in this field.",
  ).optional(),
  name: z.string().describe(
    "Required. The name of the database. Values are of the form `projects//instances//databases/`, where `` is as specified in the `CREATE DATABASE` statement. This name can be passed to other API methods to identify the database.",
  ).optional(),
  quorumInfo: z.object({
    etag: z.string().describe(
      "Output only. The etag is used for optimistic concurrency control as a way to help prevent simultaneous `ChangeQuorum` requests that might create a race condition.",
    ).optional(),
    initiator: z.enum(["INITIATOR_UNSPECIFIED", "GOOGLE", "USER"]).describe(
      "Output only. Whether this `ChangeQuorum` is Google or User initiated.",
    ).optional(),
    quorumType: z.object({
      dualRegion: z.object({}).describe(
        "Message type for a dual-region quorum. Currently this type has no options.",
      ).optional(),
      singleRegion: z.object({
        servingLocation: z.string().describe(
          'Required. The location of the serving region, for example, "us-central1". The location must be one of the regions within the dual-region instance configuration of your database. The list of valid locations is available using the GetInstanceConfig API. This should only be used if you plan to change quorum to the single-region quorum type.',
        ).optional(),
      }).describe("Message type for a single-region quorum.").optional(),
    }).describe(
      "Information about the database quorum type. This only applies to dual-region instance configs.",
    ).optional(),
    startTime: z.string().describe(
      "Output only. The timestamp when the request was triggered.",
    ).optional(),
  }).describe("Information about the dual-region quorum.").optional(),
  reconciling: z.boolean().describe(
    "Output only. If true, the database is being updated. If false, there are no ongoing update operations for the database.",
  ).optional(),
  restoreInfo: z.object({
    backupInfo: z.object({
      backup: z.string().describe("Name of the backup.").optional(),
      createTime: z.string().describe(
        "The time the CreateBackup request was received.",
      ).optional(),
      sourceDatabase: z.string().describe(
        "Name of the database the backup was created from.",
      ).optional(),
      versionTime: z.string().describe(
        "The backup contains an externally consistent copy of `source_database` at the timestamp specified by `version_time`. If the CreateBackup request did not specify `version_time`, the `version_time` of the backup is equivalent to the `create_time`.",
      ).optional(),
    }).describe("Information about a backup.").optional(),
    sourceType: z.enum(["TYPE_UNSPECIFIED", "BACKUP"]).describe(
      "The type of the restore source.",
    ).optional(),
  }).describe("Information about the database restore.").optional(),
  state: z.enum(["STATE_UNSPECIFIED", "CREATING", "READY", "READY_OPTIMIZING"])
    .describe("Output only. The current database state.").optional(),
  versionRetentionPeriod: z.string().describe(
    "Output only. The period in which Cloud Spanner retains all versions of data for the database. This is the same as the value of version_retention_period database option set using UpdateDatabaseDdl. Defaults to 1 hour, if not set.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Spanner Instances.Databases. Registered at `@swamp/gcp/spanner/instances-databases`. */
export const model = {
  type: "@swamp/gcp/spanner/instances-databases",
  version: "2026.06.07.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.2",
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
      toVersion: "2026.04.03.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A Cloud Spanner database.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a databases",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["createStatement"] !== undefined) {
          body["createStatement"] = g["createStatement"];
        }
        if (g["databaseDialect"] !== undefined) {
          body["databaseDialect"] = g["databaseDialect"];
        }
        if (g["encryptionConfig"] !== undefined) {
          body["encryptionConfig"] = g["encryptionConfig"];
        }
        if (g["extraStatements"] !== undefined) {
          body["extraStatements"] = g["extraStatements"];
        }
        if (g["protoDescriptors"] !== undefined) {
          body["protoDescriptors"] = g["protoDescriptors"];
        }
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["READY"],
              "failedValues": [],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
          credentials,
        ) as StateData;
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
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
      description: "Get a databases",
      arguments: z.object({
        identifier: z.string().describe("The name of the databases"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
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
      description: "Update databases attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["databaseDialect"] !== undefined) {
          body["databaseDialect"] = g["databaseDialect"];
        }
        if (g["encryptionConfig"] !== undefined) {
          body["encryptionConfig"] = g["encryptionConfig"];
        }
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["defaultLeader"] !== undefined) {
          body["defaultLeader"] = g["defaultLeader"];
        }
        if (g["earliestVersionTime"] !== undefined) {
          body["earliestVersionTime"] = g["earliestVersionTime"];
        }
        if (g["enableDropProtection"] !== undefined) {
          body["enableDropProtection"] = g["enableDropProtection"];
        }
        if (g["encryptionInfo"] !== undefined) {
          body["encryptionInfo"] = g["encryptionInfo"];
        }
        if (g["quorumInfo"] !== undefined) body["quorumInfo"] = g["quorumInfo"];
        if (g["reconciling"] !== undefined) {
          body["reconciling"] = g["reconciling"];
        }
        if (g["restoreInfo"] !== undefined) {
          body["restoreInfo"] = g["restoreInfo"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["versionRetentionPeriod"] !== undefined) {
          body["versionRetentionPeriod"] = g["versionRetentionPeriod"];
        }
        for (const key of Object.keys(existing)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = existing[key];
          }
        }
        const result = await updateResource(
          BASE_URL,
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["READY"],
              "failedValues": [],
            }
            : undefined,
          credentials,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync databases state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        try {
          const params: Record<string, string> = { project: projectId };
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            shortName,
          );
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
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
      description: "List databases resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Number of databases to be returned in the response. If 0 or less, defaults to the server's maximum allowed page size.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "databases",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.name?.toString() ?? String(i)).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource(
            "state",
            instanceName,
            item,
          );
          dataHandles.push(handle);
        }
        return { dataHandles, result: { count: items.length, nextPageToken } };
      },
    },
    add_split_points: {
      description: "add split points",
      arguments: z.object({
        initiator: z.any().optional(),
        splitPoints: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["database"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["initiator"] !== undefined) {
          body["initiator"] = args["initiator"];
        }
        if (args["splitPoints"] !== undefined) {
          body["splitPoints"] = args["splitPoints"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "spanner.projects.instances.databases.addSplitPoints",
            "path": "v1/{+database}:addSplitPoints",
            "httpMethod": "POST",
            "parameterOrder": ["database"],
            "parameters": {
              "database": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    changequorum: {
      description: "changequorum",
      arguments: z.object({
        etag: z.any().optional(),
        name: z.any().optional(),
        quorumType: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["quorumType"] !== undefined) {
          body["quorumType"] = args["quorumType"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "spanner.projects.instances.databases.changequorum",
            "path": "v1/{+name}:changequorum",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    drop_database: {
      description: "drop database",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["database"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "spanner.projects.instances.databases.dropDatabase",
            "path": "v1/{+database}",
            "httpMethod": "DELETE",
            "parameterOrder": ["database"],
            "parameters": {
              "database": { "location": "path", "required": true },
            },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    get_ddl: {
      description: "get ddl",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["database"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "spanner.projects.instances.databases.getDdl",
            "path": "v1/{+database}/ddl",
            "httpMethod": "GET",
            "parameterOrder": ["database"],
            "parameters": {
              "database": { "location": "path", "required": true },
            },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({
        options: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["options"] !== undefined) body["options"] = args["options"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "spanner.projects.instances.databases.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    get_scans: {
      description: "get scans",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "spanner.projects.instances.databases.getScans",
            "path": "v1/{+name}/scans",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "endTime": { "location": "query" },
              "name": { "location": "path", "required": true },
              "startTime": { "location": "query" },
              "view": { "location": "query" },
            },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    restore: {
      description: "restore",
      arguments: z.object({
        backup: z.any().optional(),
        databaseId: z.any().optional(),
        encryptionConfig: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["backup"] !== undefined) body["backup"] = args["backup"];
        if (args["databaseId"] !== undefined) {
          body["databaseId"] = args["databaseId"];
        }
        if (args["encryptionConfig"] !== undefined) {
          body["encryptionConfig"] = args["encryptionConfig"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "spanner.projects.instances.databases.restore",
            "path": "v1/{+parent}/databases:restore",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "spanner.projects.instances.databases.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        permissions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "spanner.projects.instances.databases.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    update_ddl: {
      description: "update ddl",
      arguments: z.object({
        operationId: z.any().optional(),
        protoDescriptors: z.any().optional(),
        statements: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["database"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["operationId"] !== undefined) {
          body["operationId"] = args["operationId"];
        }
        if (args["protoDescriptors"] !== undefined) {
          body["protoDescriptors"] = args["protoDescriptors"];
        }
        if (args["statements"] !== undefined) {
          body["statements"] = args["statements"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "spanner.projects.instances.databases.updateDdl",
            "path": "v1/{+database}/ddl",
            "httpMethod": "PATCH",
            "parameterOrder": ["database"],
            "parameters": {
              "database": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
