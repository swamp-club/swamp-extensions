// Auto-generated extension model for @swamp/aws/config/config-rule
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Config ConfigRule (AWS::Config::ConfigRule).
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

const CustomPolicyDetailsSchema = z.object({
  EnableDebugLogDelivery: z.boolean().describe(
    "The boolean expression for enabling debug logging for your CC Custom Policy rule. The default value is false.",
  ).optional(),
  PolicyText: z.string().describe(
    "The policy definition containing the logic for your CC Custom Policy rule.",
  ).optional(),
  PolicyRuntime: z.string().describe(
    "The runtime system for your CC Custom Policy rule. Guard is a policy-as-code language that allows you to write policies that are enforced by CC Custom Policy rules. For more information about Guard, see the [Guard GitHub Repository](https://docs.aws.amazon.com/https://github.com/aws-cloudformation/cloudformation-guard).",
  ).optional(),
});

const SourceDetailSchema = z.object({
  EventSource: z.string().describe(
    "The source of the event, such as an AWS service, that triggers CC to evaluate your AWS resources.",
  ),
  MaximumExecutionFrequency: z.string().describe(
    "The frequency at which you want CC to run evaluations for a custom rule with a periodic trigger. If you specify a value for MaximumExecutionFrequency, then MessageType must use the ScheduledNotification value. By default, rules with a periodic trigger are evaluated every 24 hours. To change the frequency, specify a valid value for the MaximumExecutionFrequency parameter. Based on the valid value you choose, CC runs evaluations once for each valid value. For example, if you choose Three_Hours, CC runs evaluations once every three hours. In this case, Three_Hours is the frequency of this rule.",
  ).optional(),
  MessageType: z.string().describe(
    "The type of notification that triggers CC to run an evaluation for a rule. You can specify the following notification types: ConfigurationItemChangeNotification - Triggers an evaluation when CC delivers a configuration item as a result of a resource change. OversizedConfigurationItemChangeNotification - Triggers an evaluation when CC delivers an oversized configuration item. CC may generate this notification type when a resource changes and the notification exceeds the maximum size allowed by Amazon SNS. ScheduledNotification - Triggers a periodic evaluation at the frequency specified for MaximumExecutionFrequency. ConfigurationSnapshotDeliveryCompleted - Triggers a periodic evaluation when CC delivers a configuration snapshot. If you want your custom rule to be triggered by configuration changes, specify two SourceDetail objects, one for ConfigurationItemChangeNotification and one for OversizedConfigurationItemChangeNotification.",
  ),
});

const EvaluationModeConfigurationSchema = z.object({
  Mode: z.string().describe(
    "The mode of an evaluation. The valid values are Detective or Proactive.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
  Description: z.string().describe(
    "The description that you provide for the CC rule.",
  ).optional(),
  Scope: z.object({
    TagKey: z.string().describe(
      "The tag key that is applied to only those AWS resources that you want to trigger an evaluation for the rule.",
    ).optional(),
    ComplianceResourceTypes: z.array(z.string()).describe(
      "The resource types of only those AWS resources that you want to trigger an evaluation for the rule. You can only specify one type if you also specify a resource ID for ComplianceResourceId.",
    ).optional(),
    TagValue: z.string().describe(
      "The tag value applied to only those AWS resources that you want to trigger an evaluation for the rule. If you specify a value for TagValue, you must also specify a value for TagKey.",
    ).optional(),
    ComplianceResourceId: z.string().describe(
      "The ID of the only AWS resource that you want to trigger an evaluation for the rule. If you specify a resource ID, you must specify one resource type for ComplianceResourceTypes.",
    ).optional(),
  }).describe(
    "Defines which resources can trigger an evaluation for the rule. The scope can include one or more resource types, a combination of one resource type and one resource ID, or a combination of a tag key and value. Specify a scope to constrain the resources that can trigger an evaluation for the rule. If you do not specify a scope, evaluations are triggered when any resource in the recording group changes. The scope can be empty.",
  ).optional(),
  ConfigRuleName: z.string().describe(
    "A name for the CC rule. If you don't specify a name, CFN generates a unique physical ID and uses that ID for the rule name. For more information, see [Name Type](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-name.html).",
  ).optional(),
  MaximumExecutionFrequency: z.string().describe(
    "The maximum frequency with which CC runs evaluations for a rule. You can specify a value for MaximumExecutionFrequency when: You are using an AWS managed rule that is triggered at a periodic frequency. Your custom rule is triggered when CC delivers the configuration snapshot. For more information, see [ConfigSnapshotDeliveryProperties](https://docs.aws.amazon.com/config/latest/APIReference/API_ConfigSnapshotDeliveryProperties.html). By default, rules with a periodic trigger are evaluated every 24 hours. To change the frequency, specify a valid value for the MaximumExecutionFrequency parameter.",
  ).optional(),
  Source: z.object({
    CustomPolicyDetails: CustomPolicyDetailsSchema.describe(
      "Provides the runtime system, policy definition, and whether debug logging is enabled. Required when owner is set to CUSTOM_POLICY.",
    ).optional(),
    SourceIdentifier: z.string().describe(
      "For CC Managed rules, a predefined identifier from a list. For example, IAM_PASSWORD_POLICY is a managed rule. To reference a managed rule, see [List of Managed Rules](https://docs.aws.amazon.com/config/latest/developerguide/managed-rules-by-aws-config.html). For CC Custom Lambda rules, the identifier is the Amazon Resource Name (ARN) of the rule's LAMlong function, such as arn:aws:lambda:us-east-2:123456789012:function:custom_rule_name. For CC Custom Policy rules, this field will be ignored.",
    ).optional(),
    Owner: z.string().describe(
      "Indicates whether AWS or the customer owns and manages the CC rule. CC Managed Rules are predefined rules owned by AWS. For more information, see [Managed Rules](https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_use-managed-rules.html) in the *developer guide*. CC Custom Rules are rules that you can develop either with Guard ( CUSTOM_POLICY) or LAMlong ( CUSTOM_LAMBDA). For more information, see [Custom Rules](https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_develop-rules.html) in the *developer guide*.",
    ),
    SourceDetails: z.array(SourceDetailSchema).describe(
      "Provides the source and the message types that cause CC to evaluate your AWS resources against a rule. It also provides the frequency with which you want CC to run evaluations for the rule if the trigger type is periodic. If the owner is set to CUSTOM_POLICY, the only acceptable values for the CC rule trigger message type are ConfigurationItemChangeNotification and OversizedConfigurationItemChangeNotification.",
    ).optional(),
  }).describe(
    "Provides the rule owner (`` for managed rules, CUSTOM_POLICY for Custom Policy rules, and CUSTOM_LAMBDA`` for Custom Lambda rules), the rule identifier, and the notifications that cause the function to evaluate your AWS resources.",
  ),
  InputParameters: z.record(z.string(), z.unknown()).describe(
    "A string, in JSON format, that is passed to the CC rule Lambda function.",
  ).optional(),
  EvaluationModes: z.array(EvaluationModeConfigurationSchema).describe(
    "The modes the CC rule can be evaluated in. The valid values are distinct objects. By default, the value is Detective evaluation mode only.",
  ).optional(),
});

const StateSchema = z.object({
  ConfigRuleId: z.string().optional(),
  Description: z.string().optional(),
  Scope: z.object({
    TagKey: z.string(),
    ComplianceResourceTypes: z.array(z.string()),
    TagValue: z.string(),
    ComplianceResourceId: z.string(),
  }).optional(),
  ConfigRuleName: z.string(),
  Arn: z.string().optional(),
  Compliance: z.object({
    Type: z.string(),
  }).optional(),
  MaximumExecutionFrequency: z.string().optional(),
  Source: z.object({
    CustomPolicyDetails: CustomPolicyDetailsSchema,
    SourceIdentifier: z.string(),
    Owner: z.string(),
    SourceDetails: z.array(SourceDetailSchema),
  }).optional(),
  InputParameters: z.union([z.string(), z.record(z.string(), z.unknown())])
    .optional(),
  EvaluationModes: z.array(EvaluationModeConfigurationSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  Description: z.string().describe(
    "The description that you provide for the CC rule.",
  ).optional(),
  Scope: z.object({
    TagKey: z.string().describe(
      "The tag key that is applied to only those AWS resources that you want to trigger an evaluation for the rule.",
    ).optional(),
    ComplianceResourceTypes: z.array(z.string()).describe(
      "The resource types of only those AWS resources that you want to trigger an evaluation for the rule. You can only specify one type if you also specify a resource ID for ComplianceResourceId.",
    ).optional(),
    TagValue: z.string().describe(
      "The tag value applied to only those AWS resources that you want to trigger an evaluation for the rule. If you specify a value for TagValue, you must also specify a value for TagKey.",
    ).optional(),
    ComplianceResourceId: z.string().describe(
      "The ID of the only AWS resource that you want to trigger an evaluation for the rule. If you specify a resource ID, you must specify one resource type for ComplianceResourceTypes.",
    ).optional(),
  }).describe(
    "Defines which resources can trigger an evaluation for the rule. The scope can include one or more resource types, a combination of one resource type and one resource ID, or a combination of a tag key and value. Specify a scope to constrain the resources that can trigger an evaluation for the rule. If you do not specify a scope, evaluations are triggered when any resource in the recording group changes. The scope can be empty.",
  ).optional(),
  ConfigRuleName: z.string().describe(
    "A name for the CC rule. If you don't specify a name, CFN generates a unique physical ID and uses that ID for the rule name. For more information, see [Name Type](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-name.html).",
  ).optional(),
  MaximumExecutionFrequency: z.string().describe(
    "The maximum frequency with which CC runs evaluations for a rule. You can specify a value for MaximumExecutionFrequency when: You are using an AWS managed rule that is triggered at a periodic frequency. Your custom rule is triggered when CC delivers the configuration snapshot. For more information, see [ConfigSnapshotDeliveryProperties](https://docs.aws.amazon.com/config/latest/APIReference/API_ConfigSnapshotDeliveryProperties.html). By default, rules with a periodic trigger are evaluated every 24 hours. To change the frequency, specify a valid value for the MaximumExecutionFrequency parameter.",
  ).optional(),
  Source: z.object({
    CustomPolicyDetails: CustomPolicyDetailsSchema.describe(
      "Provides the runtime system, policy definition, and whether debug logging is enabled. Required when owner is set to CUSTOM_POLICY.",
    ).optional(),
    SourceIdentifier: z.string().describe(
      "For CC Managed rules, a predefined identifier from a list. For example, IAM_PASSWORD_POLICY is a managed rule. To reference a managed rule, see [List of Managed Rules](https://docs.aws.amazon.com/config/latest/developerguide/managed-rules-by-aws-config.html). For CC Custom Lambda rules, the identifier is the Amazon Resource Name (ARN) of the rule's LAMlong function, such as arn:aws:lambda:us-east-2:123456789012:function:custom_rule_name. For CC Custom Policy rules, this field will be ignored.",
    ).optional(),
    Owner: z.string().describe(
      "Indicates whether AWS or the customer owns and manages the CC rule. CC Managed Rules are predefined rules owned by AWS. For more information, see [Managed Rules](https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_use-managed-rules.html) in the *developer guide*. CC Custom Rules are rules that you can develop either with Guard ( CUSTOM_POLICY) or LAMlong ( CUSTOM_LAMBDA). For more information, see [Custom Rules](https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_develop-rules.html) in the *developer guide*.",
    ).optional(),
    SourceDetails: z.array(SourceDetailSchema).describe(
      "Provides the source and the message types that cause CC to evaluate your AWS resources against a rule. It also provides the frequency with which you want CC to run evaluations for the rule if the trigger type is periodic. If the owner is set to CUSTOM_POLICY, the only acceptable values for the CC rule trigger message type are ConfigurationItemChangeNotification and OversizedConfigurationItemChangeNotification.",
    ).optional(),
  }).describe(
    "Provides the rule owner (`` for managed rules, CUSTOM_POLICY for Custom Policy rules, and CUSTOM_LAMBDA`` for Custom Lambda rules), the rule identifier, and the notifications that cause the function to evaluate your AWS resources.",
  ).optional(),
  InputParameters: z.record(z.string(), z.unknown()).describe(
    "A string, in JSON format, that is passed to the CC rule Lambda function.",
  ).optional(),
  EvaluationModes: z.array(EvaluationModeConfigurationSchema).describe(
    "The modes the CC rule can be evaluated in. The valid values are distinct objects. By default, the value is Detective evaluation mode only.",
  ).optional(),
});

/** Swamp extension model for Config ConfigRule. Registered at `@swamp/aws/config/config-rule`. */
export const model = {
  type: "@swamp/aws/config/config-rule",
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
      description: "Config ConfigRule resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Config ConfigRule",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Config::ConfigRule",
          desiredState,
        ) as StateData;
        const instanceName =
          ((result.ConfigRuleName ?? g.ConfigRuleName)?.toString() ?? "current")
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
      description: "Get a Config ConfigRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Config ConfigRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Config::ConfigRule",
          args.identifier,
        ) as StateData;
        const instanceName =
          ((result.ConfigRuleName ?? context.globalArgs.ConfigRuleName)
            ?.toString() ?? args.identifier).replace(/[\/\\]/g, "_").replace(
              /\.\./g,
              "_",
            ).replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a Config ConfigRule",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.ConfigRuleName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ConfigRuleName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Config::ConfigRule",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Config::ConfigRule",
          identifier,
          currentState,
          desiredState,
          ["ConfigRuleName"],
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
      description: "Delete a Config ConfigRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Config ConfigRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Config::ConfigRule",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.ConfigRuleName?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync Config ConfigRule state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.ConfigRuleName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ConfigRuleName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Config::ConfigRule",
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
