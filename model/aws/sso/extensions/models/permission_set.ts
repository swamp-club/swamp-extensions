// Auto-generated extension model for @swamp/aws/sso/permission-set
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any no-control-regex

/**
 * Swamp extension model for SSO PermissionSet (AWS::SSO::PermissionSet).
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

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(new RegExp("[\\w+=,.@-]+")),
  Value: z.string().min(0).max(256).regex(new RegExp("[\\w+=,.@-]+")),
});

const CustomerManagedPolicyReferenceSchema = z.object({
  Name: z.string().min(1).max(128).regex(new RegExp("[\\w+=,.@-]+")),
  Path: z.string().min(1).max(512).regex(
    new RegExp("((/[A-Za-z0-9\\.,\\+@=_-]+)*)/"),
  ).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Name: z.string().min(1).max(32).regex(new RegExp("[\\w+=,.@-]+")).describe(
    "The name you want to assign to this permission set.",
  ),
  Description: z.string().min(1).max(700).regex(
    new RegExp("[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u00A1-\\u00FF]*"),
  ).describe("The permission set description.").optional(),
  InstanceArn: z.string().min(10).max(1224).regex(
    new RegExp(
      "arn:aws(-[a-z]{1,5}){0,3}:sso:::instance/(sso)?ins-[a-zA-Z0-9-.]{16}",
    ),
  ).describe("The sso instance arn that the permission set is owned."),
  SessionDuration: z.string().min(1).max(100).regex(
    new RegExp(
      "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
    ),
  ).describe(
    "The length of time that a user can be signed in to an AWS account.",
  ).optional(),
  RelayStateType: z.string().min(1).max(240).regex(
    new RegExp(
      "[a-zA-Z0-9&amp;$@#\\/%?=~\\-_'&quot;|!:,.;*+\\[\\]\\ \\(\\)\\{\\}]+",
    ),
  ).describe(
    "The relay state URL that redirect links to any service in the AWS Management Console.",
  ).optional(),
  ManagedPolicies: z.array(z.string().min(20).max(2048)).optional(),
  InlinePolicy: z.record(z.string(), z.unknown()).describe(
    "The inline policy to put in permission set.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  CustomerManagedPolicyReferences: z.array(CustomerManagedPolicyReferenceSchema)
    .optional(),
  PermissionsBoundary: z.object({
    CustomerManagedPolicyReference: CustomerManagedPolicyReferenceSchema
      .optional(),
    ManagedPolicyArn: z.string().min(20).max(2048).describe(
      "The managed policy to attach.",
    ).optional(),
  }).optional(),
});

const StateSchema = z.object({
  Name: z.string().optional(),
  PermissionSetArn: z.string(),
  Description: z.string().optional(),
  InstanceArn: z.string(),
  SessionDuration: z.string().optional(),
  RelayStateType: z.string().optional(),
  ManagedPolicies: z.array(z.string()).optional(),
  InlinePolicy: z.union([z.string(), z.record(z.string(), z.unknown())])
    .optional(),
  Tags: z.array(TagSchema).optional(),
  CustomerManagedPolicyReferences: z.array(CustomerManagedPolicyReferenceSchema)
    .optional(),
  PermissionsBoundary: z.object({
    CustomerManagedPolicyReference: CustomerManagedPolicyReferenceSchema,
    ManagedPolicyArn: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Name: z.string().min(1).max(32).regex(new RegExp("[\\w+=,.@-]+")).describe(
    "The name you want to assign to this permission set.",
  ).optional(),
  Description: z.string().min(1).max(700).regex(
    new RegExp("[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u00A1-\\u00FF]*"),
  ).describe("The permission set description.").optional(),
  InstanceArn: z.string().min(10).max(1224).regex(
    new RegExp(
      "arn:aws(-[a-z]{1,5}){0,3}:sso:::instance/(sso)?ins-[a-zA-Z0-9-.]{16}",
    ),
  ).describe("The sso instance arn that the permission set is owned.")
    .optional(),
  SessionDuration: z.string().min(1).max(100).regex(
    new RegExp(
      "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
    ),
  ).describe(
    "The length of time that a user can be signed in to an AWS account.",
  ).optional(),
  RelayStateType: z.string().min(1).max(240).regex(
    new RegExp(
      "[a-zA-Z0-9&amp;$@#\\/%?=~\\-_'&quot;|!:,.;*+\\[\\]\\ \\(\\)\\{\\}]+",
    ),
  ).describe(
    "The relay state URL that redirect links to any service in the AWS Management Console.",
  ).optional(),
  ManagedPolicies: z.array(z.string().min(20).max(2048)).optional(),
  InlinePolicy: z.record(z.string(), z.unknown()).describe(
    "The inline policy to put in permission set.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  CustomerManagedPolicyReferences: z.array(CustomerManagedPolicyReferenceSchema)
    .optional(),
  PermissionsBoundary: z.object({
    CustomerManagedPolicyReference: CustomerManagedPolicyReferenceSchema
      .optional(),
    ManagedPolicyArn: z.string().min(20).max(2048).describe(
      "The managed policy to attach.",
    ).optional(),
  }).optional(),
});

/** Swamp extension model for SSO PermissionSet. Registered at `@swamp/aws/sso/permission-set`. */
export const model = {
  type: "@swamp/aws/sso/permission-set",
  version: "2026.05.27.1",
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
      toVersion: "2026.04.07.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SSO PermissionSet resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SSO PermissionSet",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SSO::PermissionSet",
          desiredState,
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
      description: "Get a SSO PermissionSet",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSO PermissionSet",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SSO::PermissionSet",
          args.identifier,
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
      description: "Update a SSO PermissionSet",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const idParts = [
          existing.InstanceArn?.toString(),
          existing.PermissionSetArn?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::SSO::PermissionSet",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SSO::PermissionSet",
          identifier,
          currentState,
          desiredState,
          ["InstanceArn", "Name"],
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
      description: "Delete a SSO PermissionSet",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSO PermissionSet",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SSO::PermissionSet",
          args.identifier,
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
      description: "Sync SSO PermissionSet state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const idParts = [
          existing.InstanceArn?.toString(),
          existing.PermissionSetArn?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::SSO::PermissionSet",
            identifier,
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
