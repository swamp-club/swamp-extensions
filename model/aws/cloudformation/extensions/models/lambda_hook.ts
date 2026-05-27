// Auto-generated extension model for @swamp/aws/cloudformation/lambda-hook
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CloudFormation LambdaHook (AWS::CloudFormation::LambdaHook).
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  LambdaFunction: z.string().min(1).max(170).regex(
    new RegExp(
      "(arn:(aws[a-zA-Z-]*)?:lambda:)?([a-z]{2}(-gov)?(-iso([a-z])?)?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_]+)(:(\\$LATEST|[a-zA-Z0-9-_]+))?",
    ),
  ).describe(
    "Amazon Resource Name (ARN), Partial ARN, name, version, or alias of the Lambda function to invoke with this hook.",
  ),
  HookStatus: z.enum(["ENABLED", "DISABLED"]).describe(
    "Attribute to specify which stacks this hook applies to or should get invoked for",
  ),
  TargetOperations: z.array(
    z.enum(["RESOURCE", "STACK", "CHANGE_SET", "CLOUD_CONTROL"]),
  ).describe(
    "Which operations should this Hook run against? Resource changes, stacks or change sets.",
  ),
  FailureMode: z.enum(["FAIL", "WARN"]).describe(
    "Attribute to specify CloudFormation behavior on hook failure.",
  ),
  TargetFilters: z.record(z.string(), z.unknown()).describe(
    "Attribute to specify which targets should invoke the hook",
  ).optional(),
  StackFilters: z.object({
    FilteringCriteria: z.enum(["ALL", "ANY"]).describe(
      "Attribute to specify the filtering behavior. ANY will make the Hook pass if one filter matches. ALL will make the Hook pass if all filters match",
    ),
    StackNames: z.object({
      Include: z.array(
        z.string().max(128).regex(new RegExp("^[a-zA-Z*?][-a-zA-Z0-9*?]*$")),
      ).describe("List of stack names that the hook is going to target")
        .optional(),
      Exclude: z.array(
        z.string().max(128).regex(new RegExp("^[a-zA-Z*?][-a-zA-Z0-9*?]*$")),
      ).describe(
        "List of stack names that the hook is going to be excluded from",
      ).optional(),
    }).describe("List of stack names as filters").optional(),
    StackRoles: z.object({
      Include: z.array(z.string().max(256)).describe(
        "List of stack roles that the hook is going to target",
      ).optional(),
      Exclude: z.array(z.string().max(256)).describe(
        "List of stack roles that the hook is going to be excluded from",
      ).optional(),
    }).describe("List of stack roles that are performing the stack operations.")
      .optional(),
  }).describe("Filters to allow hooks to target specific stack attributes")
    .optional(),
  Alias: z.string().regex(
    new RegExp(
      "^(?!aws)[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}$",
      "i",
    ),
  ).describe("The typename alias for the hook."),
  ExecutionRole: z.string().max(256).regex(
    new RegExp("arn:.+:iam::[0-9]{12}:role/.+"),
  ).describe("The execution role ARN assumed by Hooks to invoke Lambda."),
});

const StateSchema = z.object({
  LambdaFunction: z.string().optional(),
  HookStatus: z.string().optional(),
  TargetOperations: z.array(z.string()).optional(),
  FailureMode: z.string().optional(),
  TargetFilters: z.record(z.string(), z.unknown()).optional(),
  StackFilters: z.object({
    FilteringCriteria: z.string(),
    StackNames: z.object({
      Include: z.array(z.string()),
      Exclude: z.array(z.string()),
    }),
    StackRoles: z.object({
      Include: z.array(z.string()),
      Exclude: z.array(z.string()),
    }),
  }).optional(),
  Alias: z.string().optional(),
  HookArn: z.string(),
  ExecutionRole: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  LambdaFunction: z.string().min(1).max(170).regex(
    new RegExp(
      "(arn:(aws[a-zA-Z-]*)?:lambda:)?([a-z]{2}(-gov)?(-iso([a-z])?)?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_]+)(:(\\$LATEST|[a-zA-Z0-9-_]+))?",
    ),
  ).describe(
    "Amazon Resource Name (ARN), Partial ARN, name, version, or alias of the Lambda function to invoke with this hook.",
  ).optional(),
  HookStatus: z.enum(["ENABLED", "DISABLED"]).describe(
    "Attribute to specify which stacks this hook applies to or should get invoked for",
  ).optional(),
  TargetOperations: z.array(
    z.enum(["RESOURCE", "STACK", "CHANGE_SET", "CLOUD_CONTROL"]),
  ).describe(
    "Which operations should this Hook run against? Resource changes, stacks or change sets.",
  ).optional(),
  FailureMode: z.enum(["FAIL", "WARN"]).describe(
    "Attribute to specify CloudFormation behavior on hook failure.",
  ).optional(),
  TargetFilters: z.record(z.string(), z.unknown()).describe(
    "Attribute to specify which targets should invoke the hook",
  ).optional(),
  StackFilters: z.object({
    FilteringCriteria: z.enum(["ALL", "ANY"]).describe(
      "Attribute to specify the filtering behavior. ANY will make the Hook pass if one filter matches. ALL will make the Hook pass if all filters match",
    ).optional(),
    StackNames: z.object({
      Include: z.array(
        z.string().max(128).regex(new RegExp("^[a-zA-Z*?][-a-zA-Z0-9*?]*$")),
      ).describe("List of stack names that the hook is going to target")
        .optional(),
      Exclude: z.array(
        z.string().max(128).regex(new RegExp("^[a-zA-Z*?][-a-zA-Z0-9*?]*$")),
      ).describe(
        "List of stack names that the hook is going to be excluded from",
      ).optional(),
    }).describe("List of stack names as filters").optional(),
    StackRoles: z.object({
      Include: z.array(z.string().max(256)).describe(
        "List of stack roles that the hook is going to target",
      ).optional(),
      Exclude: z.array(z.string().max(256)).describe(
        "List of stack roles that the hook is going to be excluded from",
      ).optional(),
    }).describe("List of stack roles that are performing the stack operations.")
      .optional(),
  }).describe("Filters to allow hooks to target specific stack attributes")
    .optional(),
  Alias: z.string().regex(
    new RegExp(
      "^(?!aws)[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}$",
      "i",
    ),
  ).describe("The typename alias for the hook.").optional(),
  ExecutionRole: z.string().max(256).regex(
    new RegExp("arn:.+:iam::[0-9]{12}:role/.+"),
  ).describe("The execution role ARN assumed by Hooks to invoke Lambda.")
    .optional(),
});

/** Swamp extension model for CloudFormation LambdaHook. Registered at `@swamp/aws/cloudformation/lambda-hook`. */
export const model = {
  type: "@swamp/aws/cloudformation/lambda-hook",
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
      toVersion: "2026.05.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "CloudFormation LambdaHook resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CloudFormation LambdaHook",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::CloudFormation::LambdaHook",
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
      description: "Get a CloudFormation LambdaHook",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFormation LambdaHook",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::CloudFormation::LambdaHook",
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
      description: "Update a CloudFormation LambdaHook",
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
        const identifier = existing.HookArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::CloudFormation::LambdaHook",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::CloudFormation::LambdaHook",
          identifier,
          currentState,
          desiredState,
          ["Alias"],
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
      description: "Delete a CloudFormation LambdaHook",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFormation LambdaHook",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::CloudFormation::LambdaHook",
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
      description: "Sync CloudFormation LambdaHook state from AWS",
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
        const identifier = existing.HookArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CloudFormation::LambdaHook",
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
