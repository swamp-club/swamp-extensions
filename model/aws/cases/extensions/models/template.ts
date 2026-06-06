// Auto-generated extension model for @swamp/aws/cases/template
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Cases Template (AWS::Cases::Template).
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

const RequiredFieldSchema = z.object({
  FieldId: z.string().min(1).max(500).describe(
    "The unique identifier of a field.",
  ),
});

const TemplateRuleSchema = z.object({
  CaseRuleId: z.string().min(1).max(500).describe(
    "The unique identifier of a case rule.",
  ),
  FieldId: z.string().min(1).max(500).describe(
    "The ID of the field that this rule applies to.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ).describe(
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
  DomainId: z.string().min(1).max(500).describe(
    "The unique identifier of the Cases domain.",
  ).optional(),
  Name: z.string().min(1).max(100).regex(new RegExp("^.*[\\S]$")).describe(
    "A name for the template. It must be unique per domain.",
  ),
  Description: z.string().max(255).describe(
    "A description explaining the purpose and use case for this template. Should indicate what types of cases this template is designed for and any specific workflow it supports.",
  ).optional(),
  LayoutConfiguration: z.object({
    DefaultLayout: z.string().min(1).max(500).describe(
      "The unique identifier of a layout.",
    ).optional(),
  }).describe(
    "Specifies the default layout to use when displaying cases created from this template. The layout determines which fields are visible and their arrangement in the agent interface.",
  ).optional(),
  RequiredFields: z.array(RequiredFieldSchema).describe(
    "A list of fields that must contain a value for a case to be successfully created with this template.",
  ).optional(),
  Rules: z.array(TemplateRuleSchema).describe(
    "A list of case rules (also known as case field conditions) on a template.",
  ).optional(),
  Status: z.enum(["Active", "Inactive"]).describe(
    "The current status of the template. Active templates can be used to create new cases, while Inactive templates are disabled but preserved for existing cases.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags that you attach to this template.",
  ).optional(),
});

const StateSchema = z.object({
  DomainId: z.string().optional(),
  TemplateArn: z.string(),
  TemplateId: z.string().optional(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  LayoutConfiguration: z.object({
    DefaultLayout: z.string(),
  }).optional(),
  RequiredFields: z.array(RequiredFieldSchema).optional(),
  Rules: z.array(TemplateRuleSchema).optional(),
  Status: z.string().optional(),
  CreatedTime: z.string().optional(),
  LastModifiedTime: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DomainId: z.string().min(1).max(500).describe(
    "The unique identifier of the Cases domain.",
  ).optional(),
  Name: z.string().min(1).max(100).regex(new RegExp("^.*[\\S]$")).describe(
    "A name for the template. It must be unique per domain.",
  ).optional(),
  Description: z.string().max(255).describe(
    "A description explaining the purpose and use case for this template. Should indicate what types of cases this template is designed for and any specific workflow it supports.",
  ).optional(),
  LayoutConfiguration: z.object({
    DefaultLayout: z.string().min(1).max(500).describe(
      "The unique identifier of a layout.",
    ).optional(),
  }).describe(
    "Specifies the default layout to use when displaying cases created from this template. The layout determines which fields are visible and their arrangement in the agent interface.",
  ).optional(),
  RequiredFields: z.array(RequiredFieldSchema).describe(
    "A list of fields that must contain a value for a case to be successfully created with this template.",
  ).optional(),
  Rules: z.array(TemplateRuleSchema).describe(
    "A list of case rules (also known as case field conditions) on a template.",
  ).optional(),
  Status: z.enum(["Active", "Inactive"]).describe(
    "The current status of the template. Active templates can be used to create new cases, while Inactive templates are disabled but preserved for existing cases.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags that you attach to this template.",
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

/** Swamp extension model for Cases Template. Registered at `@swamp/aws/cases/template`. */
export const model = {
  type: "@swamp/aws/cases/template",
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
      description: "Cases Template resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Cases Template",
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
          "AWS::Cases::Template",
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
      description: "Get a Cases Template",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Cases Template",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Cases::Template",
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
      description: "Update a Cases Template",
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
        const identifier = existing.TemplateArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Cases::Template",
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
          "AWS::Cases::Template",
          identifier,
          currentState,
          desiredState,
          ["DomainId"],
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
      description: "Delete a Cases Template",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Cases Template",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Cases::Template",
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
      description: "Sync Cases Template state from AWS",
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
        const identifier = existing.TemplateArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Cases::Template",
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
