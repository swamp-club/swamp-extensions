// Auto-generated extension model for @swamp/aws/connect/task-template
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Connect TaskTemplate (AWS::Connect::TaskTemplate).
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

const FieldIdentifierSchema = z.object({
  Name: z.string().min(1).max(100).describe(
    "The name of the task template field",
  ),
});

const InvisibleFieldInfoSchema = z.object({
  Id: FieldIdentifierSchema.describe(
    "the identifier (name) for the task template field",
  ),
});

const RequiredFieldInfoSchema = z.object({
  Id: FieldIdentifierSchema.describe(
    "the identifier (name) for the task template field",
  ),
});

const ReadOnlyFieldInfoSchema = z.object({
  Id: FieldIdentifierSchema.describe(
    "the identifier (name) for the task template field",
  ),
});

const DefaultFieldValueSchema = z.object({
  Id: FieldIdentifierSchema.describe(
    "the identifier (name) for the task template field",
  ),
  DefaultValue: z.string().min(1).max(4096).describe(
    "the default value for the task template's field",
  ),
});

const FieldSchema = z.object({
  Id: FieldIdentifierSchema.describe(
    "the identifier (name) for the task template field",
  ),
  Description: z.string().min(0).max(255).describe(
    "The description of the task template's field",
  ).optional(),
  Type: z.enum([
    "NAME",
    "DESCRIPTION",
    "SCHEDULED_TIME",
    "QUICK_CONNECT",
    "URL",
    "NUMBER",
    "TEXT",
    "TEXT_AREA",
    "DATE_TIME",
    "BOOLEAN",
    "SINGLE_SELECT",
    "EMAIL",
    "EXPIRY_DURATION",
    "SELF_ASSIGN",
  ]).describe("The type of the task template's field"),
  SingleSelectOptions: z.array(
    z.string().min(1).max(100).regex(
      new RegExp("^[A-Za-z0-9](?:[A-Za-z0-9_.,\\s-]*[A-Za-z0-9_.,-])?$"),
    ),
  ).describe("list of field options to be used with single select").optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().max(256).describe(
    "The value for the tag.. You can specify a value that is maximum of 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
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
  InstanceArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*$",
    ),
  ).describe("The identifier (arn) of the instance."),
  Name: z.string().min(1).max(100).describe("The name of the task template.")
    .optional(),
  Description: z.string().min(0).max(255).describe(
    "The description of the task template.",
  ).optional(),
  ContactFlowArn: z.string().regex(
    new RegExp(
      "^$|arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*/contact-flow/[-a-zA-Z0-9]*$",
    ),
  ).describe("The identifier of the contact flow.").optional(),
  SelfAssignContactFlowArn: z.string().regex(
    new RegExp(
      "^$|arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*/contact-flow/[-a-zA-Z0-9]*$",
    ),
  ).describe("The identifier of the contact flow.").optional(),
  Constraints: z.object({
    InvisibleFields: z.array(InvisibleFieldInfoSchema).describe(
      "The list of the task template's invisible fields",
    ).optional(),
    RequiredFields: z.array(RequiredFieldInfoSchema).describe(
      "The list of the task template's required fields",
    ).optional(),
    ReadOnlyFields: z.array(ReadOnlyFieldInfoSchema).describe(
      "The list of the task template's read only fields",
    ).optional(),
  }).describe("The constraints for the task template").optional(),
  Defaults: z.array(DefaultFieldValueSchema).optional(),
  Fields: z.array(FieldSchema).describe("The list of task template's fields")
    .optional(),
  Status: z.enum(["ACTIVE", "INACTIVE"]).describe(
    "The status of the task template",
  ).optional(),
  ClientToken: z.string().regex(
    new RegExp(
      "^$|[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$",
    ),
  ).describe("the client token string in uuid format").optional(),
  Tags: z.array(TagSchema).describe("One or more tags.").optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  InstanceArn: z.string().optional(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  ContactFlowArn: z.string().optional(),
  SelfAssignContactFlowArn: z.string().optional(),
  Constraints: z.object({
    InvisibleFields: z.array(InvisibleFieldInfoSchema),
    RequiredFields: z.array(RequiredFieldInfoSchema),
    ReadOnlyFields: z.array(ReadOnlyFieldInfoSchema),
  }).optional(),
  Defaults: z.array(DefaultFieldValueSchema).optional(),
  Fields: z.array(FieldSchema).optional(),
  Status: z.string().optional(),
  ClientToken: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  InstanceArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*$",
    ),
  ).describe("The identifier (arn) of the instance.").optional(),
  Name: z.string().min(1).max(100).describe("The name of the task template.")
    .optional(),
  Description: z.string().min(0).max(255).describe(
    "The description of the task template.",
  ).optional(),
  ContactFlowArn: z.string().regex(
    new RegExp(
      "^$|arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*/contact-flow/[-a-zA-Z0-9]*$",
    ),
  ).describe("The identifier of the contact flow.").optional(),
  SelfAssignContactFlowArn: z.string().regex(
    new RegExp(
      "^$|arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*/contact-flow/[-a-zA-Z0-9]*$",
    ),
  ).describe("The identifier of the contact flow.").optional(),
  Constraints: z.object({
    InvisibleFields: z.array(InvisibleFieldInfoSchema).describe(
      "The list of the task template's invisible fields",
    ).optional(),
    RequiredFields: z.array(RequiredFieldInfoSchema).describe(
      "The list of the task template's required fields",
    ).optional(),
    ReadOnlyFields: z.array(ReadOnlyFieldInfoSchema).describe(
      "The list of the task template's read only fields",
    ).optional(),
  }).describe("The constraints for the task template").optional(),
  Defaults: z.array(DefaultFieldValueSchema).optional(),
  Fields: z.array(FieldSchema).describe("The list of task template's fields")
    .optional(),
  Status: z.enum(["ACTIVE", "INACTIVE"]).describe(
    "The status of the task template",
  ).optional(),
  ClientToken: z.string().regex(
    new RegExp(
      "^$|[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$",
    ),
  ).describe("the client token string in uuid format").optional(),
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

/** Swamp extension model for Connect TaskTemplate. Registered at `@swamp/aws/connect/task-template`. */
export const model = {
  type: "@swamp/aws/connect/task-template",
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
      description: "Connect TaskTemplate resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Connect TaskTemplate",
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
          "AWS::Connect::TaskTemplate",
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
      description: "Get a Connect TaskTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Connect TaskTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Connect::TaskTemplate",
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
      description: "Update a Connect TaskTemplate",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Connect::TaskTemplate",
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
          "AWS::Connect::TaskTemplate",
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
      description: "Delete a Connect TaskTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Connect TaskTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Connect::TaskTemplate",
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
      description: "Sync Connect TaskTemplate state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Connect::TaskTemplate",
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
