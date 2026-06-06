// Auto-generated extension model for @swamp/aws/datasync/location-smb
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for DataSync LocationSMB (AWS::DataSync::LocationSMB).
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
  Key: z.string().min(1).max(256).regex(new RegExp("^[a-zA-Z0-9\\s+=._:/-]+$"))
    .describe("The key for an AWS resource tag."),
  Value: z.string().min(1).max(256).regex(
    new RegExp("^[a-zA-Z0-9\\s+=._:@/-]+$"),
  ).describe("The value for an AWS resource tag."),
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
  AgentArns: z.array(
    z.string().max(128).regex(
      new RegExp(
        "^arn:(aws|aws-cn|aws-us-gov|aws-eusc|aws-iso|aws-iso-b):datasync:[a-z\\-0-9]+:[0-9]{12}:agent/agent-[0-9a-z]{17}$",
      ),
    ),
  ).describe(
    "The Amazon Resource Names (ARNs) of agents to use for a Simple Message Block (SMB) location.",
  ),
  Domain: z.string().max(253).regex(
    new RegExp("^([A-Za-z0-9]+[A-Za-z0-9-.]*)*[A-Za-z0-9-]*[A-Za-z0-9]$"),
  ).describe("The name of the Windows domain that the SMB server belongs to.")
    .optional(),
  MountOptions: z.object({
    Version: z.enum(["AUTOMATIC", "SMB1", "SMB2_0", "SMB2", "SMB3"]).describe(
      "The specific SMB version that you want DataSync to use to mount your SMB share.",
    ).optional(),
  }).describe("The mount options used by DataSync to access the SMB server.")
    .optional(),
  Password: z.string().max(104).regex(new RegExp("^.{0,104}$")).describe(
    "The password of the user who can mount the share and has the permissions to access files and folders in the SMB share.",
  ).optional(),
  ServerHostname: z.string().max(255).regex(
    new RegExp(
      "^(([a-zA-Z0-9\\-]*[a-zA-Z0-9])\\.)*([A-Za-z0-9\\-]*[A-Za-z0-9])$",
    ),
  ).describe(
    "The name of the SMB server. This value is the IP address or Domain Name Service (DNS) name of the SMB server.",
  ).optional(),
  Subdirectory: z.string().max(4096).regex(
    new RegExp("^[a-zA-Z0-9_\\-\\+\\./\\(\\)\\$\\p{Zs}]+$", "u"),
  ).describe(
    "The subdirectory in the SMB file system that is used to read data from the SMB source location or write data to the SMB destination",
  ).optional(),
  User: z.string().max(104).regex(
    new RegExp("^[^\\x5B\\x5D\\\\/:;|=,+*?]{1,104}$"),
  ).describe(
    "The user who can mount the share, has the permissions to access files and folders in the SMB share.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  AuthenticationType: z.enum(["NTLM", "KERBEROS"]).describe(
    "The authentication mode used to determine identity of user.",
  ).optional(),
  DnsIpAddresses: z.array(
    z.string().min(7).max(15).regex(
      new RegExp(
        "^(25[0-5]|2[0-4]\\d|[0-1]?\\d?\\d)(\\.(25[0-5]|2[0-4]\\d|[0-1]?\\d?\\d)){3}\\z",
      ),
    ),
  ).describe(
    "Specifies the IPv4 addresses for the DNS servers that your SMB file server belongs to. This parameter applies only if AuthenticationType is set to KERBEROS. If you have multiple domains in your environment, configuring this parameter makes sure that DataSync connects to the right SMB file server.",
  ).optional(),
  KerberosPrincipal: z.string().min(1).max(256).regex(new RegExp("^.+$"))
    .describe(
      "Specifies a service principal name (SPN), which is an identity in your Kerberos realm that has permission to access the files, folders, and file metadata in your SMB file server. SPNs are case sensitive and must include a prepended cifs/. For example, an SPN might look like cifs/kerberosuser@EXAMPLE.COM. Your task execution will fail if the SPN that you provide for this parameter doesn't match exactly what's in your keytab or krb5.conf files.",
    ).optional(),
  KerberosKeytab: z.string().max(87384).describe(
    "The Base64 string representation of the Keytab file. Specifies your Kerberos key table (keytab) file, which includes mappings between your service principal name (SPN) and encryption keys. To avoid task execution errors, make sure that the SPN in the keytab file matches exactly what you specify for KerberosPrincipal and in your krb5.conf file.",
  ).optional(),
  KerberosKrb5Conf: z.string().max(174764).describe(
    "The string representation of the Krb5Conf file, or the presigned URL to access the Krb5.conf file within an S3 bucket. Specifies a Kerberos configuration file (krb5.conf) that defines your Kerberos realm configuration. To avoid task execution errors, make sure that the service principal name (SPN) in the krb5.conf file matches exactly what you specify for KerberosPrincipal and in your keytab file.",
  ).optional(),
  CmkSecretConfig: z.object({
    KmsKeyArn: z.string().max(2048).regex(
      new RegExp(
        "^(arn:(aws|aws-cn|aws-us-gov|aws-eusc|aws-iso|aws-iso-b):kms:[a-z-0-9]+:[0-9]{12}:key/.*|)$",
      ),
    ).describe(
      "Specifies the ARN for the customer-managed AWS KMS key used to encrypt the secret specified for SecretArn. DataSync provides this key to AWS Secrets Manager.",
    ).optional(),
  }).describe(
    "Specifies configuration information for a DataSync-managed secret, such as a password or set of credentials that DataSync uses to access a specific transfer location, and a customer-managed AWS KMS key.",
  ).optional(),
  CustomSecretConfig: z.object({
    SecretAccessRoleArn: z.string().max(2048).regex(
      new RegExp(
        "^(arn:(aws|aws-cn|aws-us-gov|aws-eusc|aws-iso|aws-iso-b):iam::[0-9]{12}:role/.*|)$",
      ),
    ).describe(
      "Specifies the ARN for the AWS Identity and Access Management role that DataSync uses to access the secret specified for SecretArn.",
    ),
  }).describe(
    "Specifies configuration information for a customer-managed secret, such as a password or set of credentials that DataSync uses to access a specific transfer location, and an IAM role that DataSync can assume and access the customer-managed secret.",
  ).optional(),
});

const StateSchema = z.object({
  AgentArns: z.array(z.string()).optional(),
  Domain: z.string().optional(),
  MountOptions: z.object({
    Version: z.string(),
  }).optional(),
  Password: z.string().optional(),
  ServerHostname: z.string().optional(),
  Subdirectory: z.string().optional(),
  User: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  LocationArn: z.string(),
  LocationUri: z.string().optional(),
  AuthenticationType: z.string().optional(),
  DnsIpAddresses: z.array(z.string()).optional(),
  KerberosPrincipal: z.string().optional(),
  KerberosKeytab: z.string().optional(),
  KerberosKrb5Conf: z.string().optional(),
  CmkSecretConfig: z.object({
    SecretArn: z.string(),
    KmsKeyArn: z.string(),
  }).optional(),
  CustomSecretConfig: z.object({
    SecretArn: z.string(),
    SecretAccessRoleArn: z.string(),
  }).optional(),
  ManagedSecretConfig: z.object({
    SecretArn: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AgentArns: z.array(
    z.string().max(128).regex(
      new RegExp(
        "^arn:(aws|aws-cn|aws-us-gov|aws-eusc|aws-iso|aws-iso-b):datasync:[a-z\\-0-9]+:[0-9]{12}:agent/agent-[0-9a-z]{17}$",
      ),
    ),
  ).describe(
    "The Amazon Resource Names (ARNs) of agents to use for a Simple Message Block (SMB) location.",
  ).optional(),
  Domain: z.string().max(253).regex(
    new RegExp("^([A-Za-z0-9]+[A-Za-z0-9-.]*)*[A-Za-z0-9-]*[A-Za-z0-9]$"),
  ).describe("The name of the Windows domain that the SMB server belongs to.")
    .optional(),
  MountOptions: z.object({
    Version: z.enum(["AUTOMATIC", "SMB1", "SMB2_0", "SMB2", "SMB3"]).describe(
      "The specific SMB version that you want DataSync to use to mount your SMB share.",
    ).optional(),
  }).describe("The mount options used by DataSync to access the SMB server.")
    .optional(),
  Password: z.string().max(104).regex(new RegExp("^.{0,104}$")).describe(
    "The password of the user who can mount the share and has the permissions to access files and folders in the SMB share.",
  ).optional(),
  ServerHostname: z.string().max(255).regex(
    new RegExp(
      "^(([a-zA-Z0-9\\-]*[a-zA-Z0-9])\\.)*([A-Za-z0-9\\-]*[A-Za-z0-9])$",
    ),
  ).describe(
    "The name of the SMB server. This value is the IP address or Domain Name Service (DNS) name of the SMB server.",
  ).optional(),
  Subdirectory: z.string().max(4096).regex(
    new RegExp("^[a-zA-Z0-9_\\-\\+\\./\\(\\)\\$\\p{Zs}]+$", "u"),
  ).describe(
    "The subdirectory in the SMB file system that is used to read data from the SMB source location or write data to the SMB destination",
  ).optional(),
  User: z.string().max(104).regex(
    new RegExp("^[^\\x5B\\x5D\\\\/:;|=,+*?]{1,104}$"),
  ).describe(
    "The user who can mount the share, has the permissions to access files and folders in the SMB share.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  AuthenticationType: z.enum(["NTLM", "KERBEROS"]).describe(
    "The authentication mode used to determine identity of user.",
  ).optional(),
  DnsIpAddresses: z.array(
    z.string().min(7).max(15).regex(
      new RegExp(
        "^(25[0-5]|2[0-4]\\d|[0-1]?\\d?\\d)(\\.(25[0-5]|2[0-4]\\d|[0-1]?\\d?\\d)){3}\\z",
      ),
    ),
  ).describe(
    "Specifies the IPv4 addresses for the DNS servers that your SMB file server belongs to. This parameter applies only if AuthenticationType is set to KERBEROS. If you have multiple domains in your environment, configuring this parameter makes sure that DataSync connects to the right SMB file server.",
  ).optional(),
  KerberosPrincipal: z.string().min(1).max(256).regex(new RegExp("^.+$"))
    .describe(
      "Specifies a service principal name (SPN), which is an identity in your Kerberos realm that has permission to access the files, folders, and file metadata in your SMB file server. SPNs are case sensitive and must include a prepended cifs/. For example, an SPN might look like cifs/kerberosuser@EXAMPLE.COM. Your task execution will fail if the SPN that you provide for this parameter doesn't match exactly what's in your keytab or krb5.conf files.",
    ).optional(),
  KerberosKeytab: z.string().max(87384).describe(
    "The Base64 string representation of the Keytab file. Specifies your Kerberos key table (keytab) file, which includes mappings between your service principal name (SPN) and encryption keys. To avoid task execution errors, make sure that the SPN in the keytab file matches exactly what you specify for KerberosPrincipal and in your krb5.conf file.",
  ).optional(),
  KerberosKrb5Conf: z.string().max(174764).describe(
    "The string representation of the Krb5Conf file, or the presigned URL to access the Krb5.conf file within an S3 bucket. Specifies a Kerberos configuration file (krb5.conf) that defines your Kerberos realm configuration. To avoid task execution errors, make sure that the service principal name (SPN) in the krb5.conf file matches exactly what you specify for KerberosPrincipal and in your keytab file.",
  ).optional(),
  CmkSecretConfig: z.object({
    KmsKeyArn: z.string().max(2048).regex(
      new RegExp(
        "^(arn:(aws|aws-cn|aws-us-gov|aws-eusc|aws-iso|aws-iso-b):kms:[a-z-0-9]+:[0-9]{12}:key/.*|)$",
      ),
    ).describe(
      "Specifies the ARN for the customer-managed AWS KMS key used to encrypt the secret specified for SecretArn. DataSync provides this key to AWS Secrets Manager.",
    ).optional(),
  }).describe(
    "Specifies configuration information for a DataSync-managed secret, such as a password or set of credentials that DataSync uses to access a specific transfer location, and a customer-managed AWS KMS key.",
  ).optional(),
  CustomSecretConfig: z.object({
    SecretAccessRoleArn: z.string().max(2048).regex(
      new RegExp(
        "^(arn:(aws|aws-cn|aws-us-gov|aws-eusc|aws-iso|aws-iso-b):iam::[0-9]{12}:role/.*|)$",
      ),
    ).describe(
      "Specifies the ARN for the AWS Identity and Access Management role that DataSync uses to access the secret specified for SecretArn.",
    ).optional(),
  }).describe(
    "Specifies configuration information for a customer-managed secret, such as a password or set of credentials that DataSync uses to access a specific transfer location, and an IAM role that DataSync can assume and access the customer-managed secret.",
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

/** Swamp extension model for DataSync LocationSMB. Registered at `@swamp/aws/datasync/location-smb`. */
export const model = {
  type: "@swamp/aws/datasync/location-smb",
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
      description: "DataSync LocationSMB resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a DataSync LocationSMB",
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
          "AWS::DataSync::LocationSMB",
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
      description: "Get a DataSync LocationSMB",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataSync LocationSMB",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::DataSync::LocationSMB",
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
      description: "Update a DataSync LocationSMB",
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
        const identifier = existing.LocationArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::DataSync::LocationSMB",
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
          "AWS::DataSync::LocationSMB",
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
      description: "Delete a DataSync LocationSMB",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataSync LocationSMB",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::DataSync::LocationSMB",
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
      description: "Sync DataSync LocationSMB state from AWS",
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
        const identifier = existing.LocationArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::DataSync::LocationSMB",
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
