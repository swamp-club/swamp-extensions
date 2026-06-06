// Auto-generated extension model for @swamp/aws/secretsmanager/secret
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SecretsManager Secret (AWS::SecretsManager::Secret).
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

const ReplicaRegionSchema = z.object({
  KmsKeyId: z.string().describe(
    "The ARN, key ID, or alias of the KMS key to encrypt the secret. If you don't include this field, Secrets Manager uses aws/secretsmanager.",
  ).optional(),
  Region: z.string().describe(
    'A string that represents a Region, for example "us-east-1".',
  ),
});

const TagSchema = z.object({
  Value: z.string().describe(
    "The string value associated with the key of the tag.",
  ),
  Key: z.string().describe("The key identifier, or name, of the tag."),
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
  Description: z.string().describe("The description of the secret.").optional(),
  KmsKeyId: z.string().describe(
    "The ARN, key ID, or alias of the KMS key that Secrets Manager uses to encrypt the secret value in the secret. An alias is always prefixed by alias/, for example alias/aws/secretsmanager. For more information, see [About aliases](https://docs.aws.amazon.com/kms/latest/developerguide/alias-about.html). To use a KMS key in a different account, use the key ARN or the alias ARN. If you don't specify this value, then Secrets Manager uses the key aws/secretsmanager. If that key doesn't yet exist, then Secrets Manager creates it for you automatically the first time it encrypts the secret value. If the secret is in a different AWS account from the credentials calling the API, then you can't use aws/secretsmanager to encrypt the secret, and you must create and use a customer managed KMS key.",
  ).optional(),
  SecretString: z.string().describe(
    "The text to encrypt and store in the secret. We recommend you use a JSON structure of key/value pairs for your secret value. To generate a random password, use GenerateSecretString instead. If you omit both GenerateSecretString and SecretString, you create an empty secret. When you make a change to this property, a new secret version is created.",
  ).optional(),
  GenerateSecretString: z.object({
    ExcludeUppercase: z.boolean().describe(
      "Specifies whether to exclude uppercase letters from the password. If you don't include this switch, the password can contain uppercase letters.",
    ).optional(),
    RequireEachIncludedType: z.boolean().describe(
      "Specifies whether to include at least one upper and lowercase letter, one number, and one punctuation. If you don't include this switch, the password contains at least one of every character type.",
    ).optional(),
    IncludeSpace: z.boolean().describe(
      "Specifies whether to include the space character. If you include this switch, the password can contain space characters.",
    ).optional(),
    ExcludeCharacters: z.string().describe(
      "A string of the characters that you don't want in the password.",
    ).optional(),
    GenerateStringKey: z.string().describe(
      "The JSON key name for the key/value pair, where the value is the generated password. This pair is added to the JSON structure specified by the SecretStringTemplate parameter. If you specify this parameter, then you must also specify SecretStringTemplate.",
    ).optional(),
    PasswordLength: z.number().int().describe(
      "The length of the password. If you don't include this parameter, the default length is 32 characters.",
    ).optional(),
    ExcludePunctuation: z.boolean().describe(
      "Specifies whether to exclude the following punctuation characters from the password: ``! \" # $ % & ' () * +, -. /:; ? @ [ \\ ] ^ _ ` { | } ~``. If you don't include this switch, the password can contain punctuation.",
    ).optional(),
    ExcludeLowercase: z.boolean().describe(
      "Specifies whether to exclude lowercase letters from the password. If you don't include this switch, the password can contain lowercase letters.",
    ).optional(),
    SecretStringTemplate: z.string().describe(
      "A template that the generated string must match. When you make a change to this property, a new secret version is created.",
    ).optional(),
    ExcludeNumbers: z.boolean().describe(
      "Specifies whether to exclude numbers from the password. If you don't include this switch, the password can contain numbers.",
    ).optional(),
  }).describe(
    "A structure that specifies how to generate a password to encrypt and store in the secret. To include a specific string in the secret, use SecretString instead. If you omit both GenerateSecretString and SecretString, you create an empty secret. When you make a change to this property, a new secret version is created. We recommend that you specify the maximum length and include every character type that the system you are generating a password for can support.",
  ).optional(),
  ReplicaRegions: z.array(ReplicaRegionSchema).describe(
    "A custom type that specifies a Region and the KmsKeyId for a replica secret.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    'A list of tags to attach to the secret. Each tag is a key and value pair of strings in a JSON text string, for example: [{"Key":"CostCenter","Value":"12345"},{"Key":"environment","Value":"production"}] Secrets Manager tag key names are case sensitive. A tag with the key "ABC" is a different tag from one with key "abc". Stack-level tags, tags you apply to the CloudFormation stack, are also attached to the secret. If you check tags in permissions policies as part of your security strategy, then adding or removing a tag can change permissions. If the completion of this operation would result in you losing your permissions for this secret, then Secrets Manager blocks the operation and returns an Access Denied error. For more information, see [Control access to secrets using tags](https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_examples.html#tag-secrets-abac) and [Limit access to identities with tags that match secrets\' tags](https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_examples.html#auth-and-access_tags2). For information about how to format a JSON parameter for the various command line tool environments, see [Using JSON for Parameters](https://docs.aws.amazon.com/cli/latest/userguide/cli-using-param.html#cli-using-param-json). If your command-line tool or SDK requires quotation marks around the parameter, you should use single quotes to avoid confusion with the double quotes required in the JSON text. The following restrictions apply to tags: Maximum number of tags per secret: 50 Maximum key length: 127 Unicode characters in UTF-8 Maximum value length: 255 Unicode characters in UTF-8 Tag keys and values are case sensitive. Do not use the aws: prefix in your tag names or values because AWS reserves it for AWS use. You can\'t edit or delete tag names or values with this prefix. Tags with this prefix do not count against your tags per secret limit. If you use your tagging schema across multiple services and resources, other services might have restrictions on allowed characters. Generally allowed characters: letters, spaces, and numbers representable in UTF-8, plus the following special characters: + - =. _: / @.',
  ).optional(),
  Name: z.string().describe(
    "The name of the new secret. The secret name can contain ASCII letters, numbers, and the following characters: /_+=.@- Do not end your secret name with a hyphen followed by six characters. If you do so, you risk confusion and unexpected results when searching for a secret by partial ARN. Secrets Manager automatically adds a hyphen and six random characters after the secret name at the end of the ARN.",
  ).optional(),
  Type: z.string().describe(
    "The exact string that identifies the third-party partner that holds the external secret. For more information, see [Managed external secret partners](https://docs.aws.amazon.com/secretsmanager/latest/userguide/mes-partners.html).",
  ).optional(),
});

const StateSchema = z.object({
  Description: z.string().optional(),
  KmsKeyId: z.string().optional(),
  SecretString: z.string().optional(),
  GenerateSecretString: z.object({
    ExcludeUppercase: z.boolean(),
    RequireEachIncludedType: z.boolean(),
    IncludeSpace: z.boolean(),
    ExcludeCharacters: z.string(),
    GenerateStringKey: z.string(),
    PasswordLength: z.number(),
    ExcludePunctuation: z.boolean(),
    ExcludeLowercase: z.boolean(),
    SecretStringTemplate: z.string(),
    ExcludeNumbers: z.boolean(),
  }).optional(),
  ReplicaRegions: z.array(ReplicaRegionSchema).optional(),
  Id: z.string(),
  Tags: z.array(TagSchema).optional(),
  Name: z.string().optional(),
  Type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Description: z.string().describe("The description of the secret.").optional(),
  KmsKeyId: z.string().describe(
    "The ARN, key ID, or alias of the KMS key that Secrets Manager uses to encrypt the secret value in the secret. An alias is always prefixed by alias/, for example alias/aws/secretsmanager. For more information, see [About aliases](https://docs.aws.amazon.com/kms/latest/developerguide/alias-about.html). To use a KMS key in a different account, use the key ARN or the alias ARN. If you don't specify this value, then Secrets Manager uses the key aws/secretsmanager. If that key doesn't yet exist, then Secrets Manager creates it for you automatically the first time it encrypts the secret value. If the secret is in a different AWS account from the credentials calling the API, then you can't use aws/secretsmanager to encrypt the secret, and you must create and use a customer managed KMS key.",
  ).optional(),
  SecretString: z.string().describe(
    "The text to encrypt and store in the secret. We recommend you use a JSON structure of key/value pairs for your secret value. To generate a random password, use GenerateSecretString instead. If you omit both GenerateSecretString and SecretString, you create an empty secret. When you make a change to this property, a new secret version is created.",
  ).optional(),
  GenerateSecretString: z.object({
    ExcludeUppercase: z.boolean().describe(
      "Specifies whether to exclude uppercase letters from the password. If you don't include this switch, the password can contain uppercase letters.",
    ).optional(),
    RequireEachIncludedType: z.boolean().describe(
      "Specifies whether to include at least one upper and lowercase letter, one number, and one punctuation. If you don't include this switch, the password contains at least one of every character type.",
    ).optional(),
    IncludeSpace: z.boolean().describe(
      "Specifies whether to include the space character. If you include this switch, the password can contain space characters.",
    ).optional(),
    ExcludeCharacters: z.string().describe(
      "A string of the characters that you don't want in the password.",
    ).optional(),
    GenerateStringKey: z.string().describe(
      "The JSON key name for the key/value pair, where the value is the generated password. This pair is added to the JSON structure specified by the SecretStringTemplate parameter. If you specify this parameter, then you must also specify SecretStringTemplate.",
    ).optional(),
    PasswordLength: z.number().int().describe(
      "The length of the password. If you don't include this parameter, the default length is 32 characters.",
    ).optional(),
    ExcludePunctuation: z.boolean().describe(
      "Specifies whether to exclude the following punctuation characters from the password: ``! \" # $ % & ' () * +, -. /:; ? @ [ \\ ] ^ _ ` { | } ~``. If you don't include this switch, the password can contain punctuation.",
    ).optional(),
    ExcludeLowercase: z.boolean().describe(
      "Specifies whether to exclude lowercase letters from the password. If you don't include this switch, the password can contain lowercase letters.",
    ).optional(),
    SecretStringTemplate: z.string().describe(
      "A template that the generated string must match. When you make a change to this property, a new secret version is created.",
    ).optional(),
    ExcludeNumbers: z.boolean().describe(
      "Specifies whether to exclude numbers from the password. If you don't include this switch, the password can contain numbers.",
    ).optional(),
  }).describe(
    "A structure that specifies how to generate a password to encrypt and store in the secret. To include a specific string in the secret, use SecretString instead. If you omit both GenerateSecretString and SecretString, you create an empty secret. When you make a change to this property, a new secret version is created. We recommend that you specify the maximum length and include every character type that the system you are generating a password for can support.",
  ).optional(),
  ReplicaRegions: z.array(ReplicaRegionSchema).describe(
    "A custom type that specifies a Region and the KmsKeyId for a replica secret.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    'A list of tags to attach to the secret. Each tag is a key and value pair of strings in a JSON text string, for example: [{"Key":"CostCenter","Value":"12345"},{"Key":"environment","Value":"production"}] Secrets Manager tag key names are case sensitive. A tag with the key "ABC" is a different tag from one with key "abc". Stack-level tags, tags you apply to the CloudFormation stack, are also attached to the secret. If you check tags in permissions policies as part of your security strategy, then adding or removing a tag can change permissions. If the completion of this operation would result in you losing your permissions for this secret, then Secrets Manager blocks the operation and returns an Access Denied error. For more information, see [Control access to secrets using tags](https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_examples.html#tag-secrets-abac) and [Limit access to identities with tags that match secrets\' tags](https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_examples.html#auth-and-access_tags2). For information about how to format a JSON parameter for the various command line tool environments, see [Using JSON for Parameters](https://docs.aws.amazon.com/cli/latest/userguide/cli-using-param.html#cli-using-param-json). If your command-line tool or SDK requires quotation marks around the parameter, you should use single quotes to avoid confusion with the double quotes required in the JSON text. The following restrictions apply to tags: Maximum number of tags per secret: 50 Maximum key length: 127 Unicode characters in UTF-8 Maximum value length: 255 Unicode characters in UTF-8 Tag keys and values are case sensitive. Do not use the aws: prefix in your tag names or values because AWS reserves it for AWS use. You can\'t edit or delete tag names or values with this prefix. Tags with this prefix do not count against your tags per secret limit. If you use your tagging schema across multiple services and resources, other services might have restrictions on allowed characters. Generally allowed characters: letters, spaces, and numbers representable in UTF-8, plus the following special characters: + - =. _: / @.',
  ).optional(),
  Name: z.string().describe(
    "The name of the new secret. The secret name can contain ASCII letters, numbers, and the following characters: /_+=.@- Do not end your secret name with a hyphen followed by six characters. If you do so, you risk confusion and unexpected results when searching for a secret by partial ARN. Secrets Manager automatically adds a hyphen and six random characters after the secret name at the end of the ARN.",
  ).optional(),
  Type: z.string().describe(
    "The exact string that identifies the third-party partner that holds the external secret. For more information, see [Managed external secret partners](https://docs.aws.amazon.com/secretsmanager/latest/userguide/mes-partners.html).",
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

/** Swamp extension model for SecretsManager Secret. Registered at `@swamp/aws/secretsmanager/secret`. */
export const model = {
  type: "@swamp/aws/secretsmanager/secret",
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
      description: "SecretsManager Secret resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SecretsManager Secret",
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
          "AWS::SecretsManager::Secret",
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
      description: "Get a SecretsManager Secret",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SecretsManager Secret",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SecretsManager::Secret",
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
      description: "Update a SecretsManager Secret",
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
          "AWS::SecretsManager::Secret",
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
          "AWS::SecretsManager::Secret",
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
      description: "Delete a SecretsManager Secret",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SecretsManager Secret",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SecretsManager::Secret",
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
      description: "Sync SecretsManager Secret state from AWS",
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
            "AWS::SecretsManager::Secret",
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
