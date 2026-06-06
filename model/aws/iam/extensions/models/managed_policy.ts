// Auto-generated extension model for @swamp/aws/iam/managed-policy
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for IAM ManagedPolicy (AWS::IAM::ManagedPolicy).
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
  Description: z.string().describe(
    'A friendly description of the policy. Typically used to store information about the permissions defined in the policy. For example, "Grants access to production DynamoDB tables." The policy description is immutable. After a value is assigned, it cannot be changed.',
  ).optional(),
  Groups: z.array(z.string()).describe(
    "The name (friendly name, not ARN) of the group to attach the policy to. This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
  ).optional(),
  ManagedPolicyName: z.string().describe(
    'The friendly name of the policy. If you specify a name, you cannot perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name. If you specify a name, you must specify the CAPABILITY_NAMED_IAM value to acknowledge your template\'s capabilities. For more information, see [Acknowledging Resources in Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#using-iam-capabilities). Naming an IAM resource can cause an unrecoverable error if you reuse the same template in multiple Regions. To prevent this, we recommend using Fn::Join and AWS::Region to create a Region-specific name, as in the following example: {"Fn::Join": ["", [{"Ref": "AWS::Region"}, {"Ref": "MyResourceName"}]]}.',
  ).optional(),
  Path: z.string().describe(
    "The path for the policy. For more information about paths, see [IAM identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the *IAM User Guide*. This parameter is optional. If it is not included, it defaults to a slash (/). This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of either a forward slash (/) by itself or a string that must begin and end with forward slashes. In addition, it can contain any ASCII character from the! ( \\u0021) through the DEL character ( \\u007F), including most punctuation characters, digits, and upper and lowercased letters. You cannot use an asterisk (*) in the path name.",
  ).optional(),
  PolicyDocument: z.record(z.string(), z.unknown()).describe(
    "The JSON policy document that you want to use as the content for the new policy. You must provide policies in JSON format in IAM. However, for CFN templates formatted in YAML, you can provide the policy in JSON or YAML format. CFN always converts a YAML policy to JSON format before submitting it to IAM. The maximum length of the policy document that you can pass in this operation, including whitespace, is listed below. To view the maximum character counts of a managed policy with no whitespaces, see [IAM and character quotas](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-quotas.html#reference_iam-quotas-entity-length). To learn more about JSON policy grammar, see [Grammar of the IAM JSON policy language](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_grammar.html) in the *IAM User Guide*. The [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) used to validate this parameter is a string of characters consisting of the following: Any printable ASCII character ranging from the space character ( \\u0020) through the end of the ASCII character range The printable characters in the Basic Latin and Latin-1 Supplement character set (through \\u00FF) The special characters tab ( \\u0009), line feed ( \\u000A), and carriage return ( \\u000D)",
  ),
  Roles: z.array(z.string()).describe(
    "The name (friendly name, not ARN) of the role to attach the policy to. This parameter allows (per its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@- If an external policy (such as AWS::IAM::Policy or AWS::IAM::ManagedPolicy) has a Ref to a role and if a resource (such as AWS::ECS::Service) also has a Ref to the same role, add a DependsOn attribute to the resource to make the resource depend on the external policy. This dependency ensures that the role's policy is available throughout the resource's lifecycle. For example, when you delete a stack with an AWS::ECS::Service resource, the DependsOn attribute ensures that CFN deletes the AWS::ECS::Service resource before deleting its role's policy.",
  ).optional(),
  Users: z.array(z.string()).describe(
    "The name (friendly name, not ARN) of the IAM user to attach the policy to. This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
  ).optional(),
});

const StateSchema = z.object({
  Description: z.string().optional(),
  Groups: z.array(z.string()).optional(),
  ManagedPolicyName: z.string().optional(),
  Path: z.string().optional(),
  PolicyDocument: z.union([z.string(), z.record(z.string(), z.unknown())])
    .optional(),
  Roles: z.array(z.string()).optional(),
  Users: z.array(z.string()).optional(),
  PolicyArn: z.string(),
  AttachmentCount: z.number().optional(),
  CreateDate: z.string().optional(),
  UpdateDate: z.string().optional(),
  DefaultVersionId: z.string().optional(),
  IsAttachable: z.boolean().optional(),
  PermissionsBoundaryUsageCount: z.number().optional(),
  PolicyId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Description: z.string().describe(
    'A friendly description of the policy. Typically used to store information about the permissions defined in the policy. For example, "Grants access to production DynamoDB tables." The policy description is immutable. After a value is assigned, it cannot be changed.',
  ).optional(),
  Groups: z.array(z.string()).describe(
    "The name (friendly name, not ARN) of the group to attach the policy to. This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
  ).optional(),
  ManagedPolicyName: z.string().describe(
    'The friendly name of the policy. If you specify a name, you cannot perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name. If you specify a name, you must specify the CAPABILITY_NAMED_IAM value to acknowledge your template\'s capabilities. For more information, see [Acknowledging Resources in Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#using-iam-capabilities). Naming an IAM resource can cause an unrecoverable error if you reuse the same template in multiple Regions. To prevent this, we recommend using Fn::Join and AWS::Region to create a Region-specific name, as in the following example: {"Fn::Join": ["", [{"Ref": "AWS::Region"}, {"Ref": "MyResourceName"}]]}.',
  ).optional(),
  Path: z.string().describe(
    "The path for the policy. For more information about paths, see [IAM identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the *IAM User Guide*. This parameter is optional. If it is not included, it defaults to a slash (/). This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of either a forward slash (/) by itself or a string that must begin and end with forward slashes. In addition, it can contain any ASCII character from the! ( \\u0021) through the DEL character ( \\u007F), including most punctuation characters, digits, and upper and lowercased letters. You cannot use an asterisk (*) in the path name.",
  ).optional(),
  PolicyDocument: z.record(z.string(), z.unknown()).describe(
    "The JSON policy document that you want to use as the content for the new policy. You must provide policies in JSON format in IAM. However, for CFN templates formatted in YAML, you can provide the policy in JSON or YAML format. CFN always converts a YAML policy to JSON format before submitting it to IAM. The maximum length of the policy document that you can pass in this operation, including whitespace, is listed below. To view the maximum character counts of a managed policy with no whitespaces, see [IAM and character quotas](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-quotas.html#reference_iam-quotas-entity-length). To learn more about JSON policy grammar, see [Grammar of the IAM JSON policy language](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_grammar.html) in the *IAM User Guide*. The [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) used to validate this parameter is a string of characters consisting of the following: Any printable ASCII character ranging from the space character ( \\u0020) through the end of the ASCII character range The printable characters in the Basic Latin and Latin-1 Supplement character set (through \\u00FF) The special characters tab ( \\u0009), line feed ( \\u000A), and carriage return ( \\u000D)",
  ).optional(),
  Roles: z.array(z.string()).describe(
    "The name (friendly name, not ARN) of the role to attach the policy to. This parameter allows (per its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@- If an external policy (such as AWS::IAM::Policy or AWS::IAM::ManagedPolicy) has a Ref to a role and if a resource (such as AWS::ECS::Service) also has a Ref to the same role, add a DependsOn attribute to the resource to make the resource depend on the external policy. This dependency ensures that the role's policy is available throughout the resource's lifecycle. For example, when you delete a stack with an AWS::ECS::Service resource, the DependsOn attribute ensures that CFN deletes the AWS::ECS::Service resource before deleting its role's policy.",
  ).optional(),
  Users: z.array(z.string()).describe(
    "The name (friendly name, not ARN) of the IAM user to attach the policy to. This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
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

/** Swamp extension model for IAM ManagedPolicy. Registered at `@swamp/aws/iam/managed-policy`. */
export const model = {
  type: "@swamp/aws/iam/managed-policy",
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
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.27.1",
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
      description: "IAM ManagedPolicy resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IAM ManagedPolicy",
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
          "AWS::IAM::ManagedPolicy",
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
      description: "Get a IAM ManagedPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IAM ManagedPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::IAM::ManagedPolicy",
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
      description: "Update a IAM ManagedPolicy",
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
        const identifier = existing.PolicyArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IAM::ManagedPolicy",
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
          "AWS::IAM::ManagedPolicy",
          identifier,
          currentState,
          desiredState,
          ["ManagedPolicyName", "Description", "Path"],
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
      description: "Delete a IAM ManagedPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IAM ManagedPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::IAM::ManagedPolicy",
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
      description: "Sync IAM ManagedPolicy state from AWS",
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
        const identifier = existing.PolicyArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IAM::ManagedPolicy",
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
