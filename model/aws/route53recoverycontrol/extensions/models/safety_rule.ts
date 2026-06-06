// Auto-generated extension model for @swamp/aws/route53recoverycontrol/safety-rule
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Route53RecoveryControl SafetyRule (AWS::Route53RecoveryControl::SafetyRule).
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
  Key: z.string().min(1).max(128),
  Value: z.string().max(256),
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
  AssertionRule: z.object({
    WaitPeriodMs: z.number().int().describe(
      'An evaluation period, in milliseconds (ms), during which any request against the target routing controls will fail. This helps prevent "flapping" of state. The wait period is 5000 ms by default, but you can choose a custom value.',
    ),
    AssertedControls: z.array(z.string()).describe(
      "The routing controls that are part of transactions that are evaluated to determine if a request to change a routing control state is allowed. For example, you might include three routing controls, one for each of three AWS Regions.",
    ),
  }).describe(
    "An assertion rule enforces that, when a routing control state is changed, that the criteria set by the rule configuration is met. Otherwise, the change to the routing control is not accepted.",
  ).optional(),
  GatingRule: z.object({
    GatingControls: z.array(z.string()).describe(
      "The gating controls for the gating rule. That is, routing controls that are evaluated by the rule configuration that you specify.",
    ),
    TargetControls: z.array(z.string()).describe(
      "Routing controls that can only be set or unset if the specified RuleConfig evaluates to true for the specified GatingControls. For example, say you have three gating controls, one for each of three AWS Regions. Now you specify AtLeast 2 as your RuleConfig. With these settings, you can only change (set or unset) the routing controls that you have specified as TargetControls if that rule evaluates to true. In other words, your ability to change the routing controls that you have specified as TargetControls is gated by the rule that you set for the routing controls in GatingControls.",
    ),
    WaitPeriodMs: z.number().int().describe(
      'An evaluation period, in milliseconds (ms), during which any request against the target routing controls will fail. This helps prevent "flapping" of state. The wait period is 5000 ms by default, but you can choose a custom value.',
    ),
  }).describe(
    "A gating rule verifies that a set of gating controls evaluates as true, based on a rule configuration that you specify. If the gating rule evaluates to true, Amazon Route 53 Application Recovery Controller allows a set of routing control state changes to run and complete against the set of target controls.",
  ).optional(),
  Name: z.string().describe("The name for the safety rule.").optional(),
  ControlPanelArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the control panel.",
  ).optional(),
  RuleConfig: z.object({
    Type: z.enum(["AND", "OR", "ATLEAST"]).describe(
      "A rule can be one of the following: ATLEAST, AND, or OR.",
    ),
    Threshold: z.number().int().describe(
      "The value of N, when you specify an ATLEAST rule type. That is, Threshold is the number of controls that must be set when you specify an ATLEAST type.",
    ),
    Inverted: z.boolean().describe(
      "Logical negation of the rule. If the rule would usually evaluate true, it's evaluated as false, and vice versa.",
    ),
  }).describe(
    "The rule configuration for an assertion rule or gating rule. This is the criteria that you set for specific assertion controls (routing controls) or gating controls. This configuration specifies how many controls must be enabled after a transaction completes.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A collection of tags associated with a resource",
  ).optional(),
});

const StateSchema = z.object({
  AssertionRule: z.object({
    WaitPeriodMs: z.number(),
    AssertedControls: z.array(z.string()),
  }).optional(),
  GatingRule: z.object({
    GatingControls: z.array(z.string()),
    TargetControls: z.array(z.string()),
    WaitPeriodMs: z.number(),
  }).optional(),
  Name: z.string().optional(),
  SafetyRuleArn: z.string(),
  ControlPanelArn: z.string().optional(),
  Status: z.string().optional(),
  RuleConfig: z.object({
    Type: z.string(),
    Threshold: z.number(),
    Inverted: z.boolean(),
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
  AssertionRule: z.object({
    WaitPeriodMs: z.number().int().describe(
      'An evaluation period, in milliseconds (ms), during which any request against the target routing controls will fail. This helps prevent "flapping" of state. The wait period is 5000 ms by default, but you can choose a custom value.',
    ).optional(),
    AssertedControls: z.array(z.string()).describe(
      "The routing controls that are part of transactions that are evaluated to determine if a request to change a routing control state is allowed. For example, you might include three routing controls, one for each of three AWS Regions.",
    ).optional(),
  }).describe(
    "An assertion rule enforces that, when a routing control state is changed, that the criteria set by the rule configuration is met. Otherwise, the change to the routing control is not accepted.",
  ).optional(),
  GatingRule: z.object({
    GatingControls: z.array(z.string()).describe(
      "The gating controls for the gating rule. That is, routing controls that are evaluated by the rule configuration that you specify.",
    ).optional(),
    TargetControls: z.array(z.string()).describe(
      "Routing controls that can only be set or unset if the specified RuleConfig evaluates to true for the specified GatingControls. For example, say you have three gating controls, one for each of three AWS Regions. Now you specify AtLeast 2 as your RuleConfig. With these settings, you can only change (set or unset) the routing controls that you have specified as TargetControls if that rule evaluates to true. In other words, your ability to change the routing controls that you have specified as TargetControls is gated by the rule that you set for the routing controls in GatingControls.",
    ).optional(),
    WaitPeriodMs: z.number().int().describe(
      'An evaluation period, in milliseconds (ms), during which any request against the target routing controls will fail. This helps prevent "flapping" of state. The wait period is 5000 ms by default, but you can choose a custom value.',
    ).optional(),
  }).describe(
    "A gating rule verifies that a set of gating controls evaluates as true, based on a rule configuration that you specify. If the gating rule evaluates to true, Amazon Route 53 Application Recovery Controller allows a set of routing control state changes to run and complete against the set of target controls.",
  ).optional(),
  Name: z.string().describe("The name for the safety rule.").optional(),
  ControlPanelArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the control panel.",
  ).optional(),
  RuleConfig: z.object({
    Type: z.enum(["AND", "OR", "ATLEAST"]).describe(
      "A rule can be one of the following: ATLEAST, AND, or OR.",
    ).optional(),
    Threshold: z.number().int().describe(
      "The value of N, when you specify an ATLEAST rule type. That is, Threshold is the number of controls that must be set when you specify an ATLEAST type.",
    ).optional(),
    Inverted: z.boolean().describe(
      "Logical negation of the rule. If the rule would usually evaluate true, it's evaluated as false, and vice versa.",
    ).optional(),
  }).describe(
    "The rule configuration for an assertion rule or gating rule. This is the criteria that you set for specific assertion controls (routing controls) or gating controls. This configuration specifies how many controls must be enabled after a transaction completes.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A collection of tags associated with a resource",
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

/** Swamp extension model for Route53RecoveryControl SafetyRule. Registered at `@swamp/aws/route53recoverycontrol/safety-rule`. */
export const model = {
  type: "@swamp/aws/route53recoverycontrol/safety-rule",
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
      description: "Route53RecoveryControl SafetyRule resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Route53RecoveryControl SafetyRule",
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
          "AWS::Route53RecoveryControl::SafetyRule",
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
      description: "Get a Route53RecoveryControl SafetyRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Route53RecoveryControl SafetyRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Route53RecoveryControl::SafetyRule",
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
      description: "Update a Route53RecoveryControl SafetyRule",
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
        const identifier = existing.SafetyRuleArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Route53RecoveryControl::SafetyRule",
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
          "AWS::Route53RecoveryControl::SafetyRule",
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
      description: "Delete a Route53RecoveryControl SafetyRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Route53RecoveryControl SafetyRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Route53RecoveryControl::SafetyRule",
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
      description: "Sync Route53RecoveryControl SafetyRule state from AWS",
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
        const identifier = existing.SafetyRuleArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Route53RecoveryControl::SafetyRule",
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
