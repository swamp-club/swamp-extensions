// Auto-generated extension model for @swamp/aws/networkfirewall/firewall-policy
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for NetworkFirewall FirewallPolicy (AWS::NetworkFirewall::FirewallPolicy).
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

const DimensionSchema = z.object({
  Value: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9-_ ]+$")),
});

const PublishMetricActionSchema = z.object({
  Dimensions: z.array(DimensionSchema),
});

const ActionDefinitionSchema = z.object({
  PublishMetricAction: PublishMetricActionSchema.optional(),
});

const CustomActionSchema = z.object({
  ActionName: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9]+$")),
  ActionDefinition: ActionDefinitionSchema,
});

const StatelessRuleGroupReferenceSchema = z.object({
  ResourceArn: z.string().min(1).max(256).regex(new RegExp("^(arn:aws.*)$"))
    .describe("A resource ARN."),
  Priority: z.number().int().min(1).max(65535),
});

const StatefulRuleGroupOverrideSchema = z.object({
  Action: z.enum(["DROP_TO_ALERT"]).optional(),
});

const StatefulRuleGroupReferenceSchema = z.object({
  ResourceArn: z.string().min(1).max(256).regex(new RegExp("^(arn:aws.*)$"))
    .describe("A resource ARN."),
  Priority: z.number().int().min(1).max(65535).optional(),
  Override: StatefulRuleGroupOverrideSchema.optional(),
  DeepThreatInspection: z.boolean().optional(),
});

const StatefulEngineOptionsSchema = z.object({
  RuleOrder: z.enum(["DEFAULT_ACTION_ORDER", "STRICT_ORDER"]).optional(),
  StreamExceptionPolicy: z.enum(["DROP", "CONTINUE", "REJECT"]).optional(),
  FlowTimeouts: z.object({
    TcpIdleTimeoutSeconds: z.number().int().min(60).max(6000).optional(),
  }).optional(),
});

const IPSetSchema = z.object({
  Definition: z.array(z.string().min(1).regex(new RegExp("^.*$"))).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(new RegExp("^.*$")),
  Value: z.string().min(0).max(255).regex(new RegExp("^.*$")),
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
  FirewallPolicyName: z.string().min(1).max(128).regex(
    new RegExp("^[a-zA-Z0-9-]+$"),
  ),
  FirewallPolicy: z.object({
    StatelessDefaultActions: z.array(z.string()),
    StatelessFragmentDefaultActions: z.array(z.string()),
    StatelessCustomActions: z.array(CustomActionSchema).optional(),
    StatelessRuleGroupReferences: z.array(StatelessRuleGroupReferenceSchema)
      .optional(),
    StatefulRuleGroupReferences: z.array(StatefulRuleGroupReferenceSchema)
      .optional(),
    StatefulDefaultActions: z.array(z.string()).optional(),
    StatefulEngineOptions: StatefulEngineOptionsSchema.optional(),
    PolicyVariables: z.object({
      RuleVariables: z.record(z.string(), IPSetSchema).optional(),
    }).optional(),
    TLSInspectionConfigurationArn: z.string().min(1).max(256).regex(
      new RegExp("^(arn:aws.*)$"),
    ).describe("A resource ARN.").optional(),
    EnableTLSSessionHolding: z.boolean().optional(),
  }),
  Description: z.string().min(1).max(512).regex(new RegExp("^.*$")).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  FirewallPolicyName: z.string().optional(),
  FirewallPolicyArn: z.string(),
  FirewallPolicy: z.object({
    StatelessDefaultActions: z.array(z.string()),
    StatelessFragmentDefaultActions: z.array(z.string()),
    StatelessCustomActions: z.array(CustomActionSchema),
    StatelessRuleGroupReferences: z.array(StatelessRuleGroupReferenceSchema),
    StatefulRuleGroupReferences: z.array(StatefulRuleGroupReferenceSchema),
    StatefulDefaultActions: z.array(z.string()),
    StatefulEngineOptions: StatefulEngineOptionsSchema,
    PolicyVariables: z.object({
      RuleVariables: z.record(z.string(), z.unknown()),
    }),
    TLSInspectionConfigurationArn: z.string(),
    EnableTLSSessionHolding: z.boolean(),
  }).optional(),
  FirewallPolicyId: z.string().optional(),
  Description: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  FirewallPolicyName: z.string().min(1).max(128).regex(
    new RegExp("^[a-zA-Z0-9-]+$"),
  ).optional(),
  FirewallPolicy: z.object({
    StatelessDefaultActions: z.array(z.string()).optional(),
    StatelessFragmentDefaultActions: z.array(z.string()).optional(),
    StatelessCustomActions: z.array(CustomActionSchema).optional(),
    StatelessRuleGroupReferences: z.array(StatelessRuleGroupReferenceSchema)
      .optional(),
    StatefulRuleGroupReferences: z.array(StatefulRuleGroupReferenceSchema)
      .optional(),
    StatefulDefaultActions: z.array(z.string()).optional(),
    StatefulEngineOptions: StatefulEngineOptionsSchema.optional(),
    PolicyVariables: z.object({
      RuleVariables: z.record(z.string(), IPSetSchema).optional(),
    }).optional(),
    TLSInspectionConfigurationArn: z.string().min(1).max(256).regex(
      new RegExp("^(arn:aws.*)$"),
    ).describe("A resource ARN.").optional(),
    EnableTLSSessionHolding: z.boolean().optional(),
  }).optional(),
  Description: z.string().min(1).max(512).regex(new RegExp("^.*$")).optional(),
  Tags: z.array(TagSchema).optional(),
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

/** Swamp extension model for NetworkFirewall FirewallPolicy. Registered at `@swamp/aws/networkfirewall/firewall-policy`. */
export const model = {
  type: "@swamp/aws/networkfirewall/firewall-policy",
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
      description: "NetworkFirewall FirewallPolicy resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a NetworkFirewall FirewallPolicy",
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
          "AWS::NetworkFirewall::FirewallPolicy",
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
      description: "Get a NetworkFirewall FirewallPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the NetworkFirewall FirewallPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::NetworkFirewall::FirewallPolicy",
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
      description: "Update a NetworkFirewall FirewallPolicy",
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
        const identifier = existing.FirewallPolicyArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::NetworkFirewall::FirewallPolicy",
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
          "AWS::NetworkFirewall::FirewallPolicy",
          identifier,
          currentState,
          desiredState,
          ["FirewallPolicyName"],
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
      description: "Delete a NetworkFirewall FirewallPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the NetworkFirewall FirewallPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::NetworkFirewall::FirewallPolicy",
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
      description: "Sync NetworkFirewall FirewallPolicy state from AWS",
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
        const identifier = existing.FirewallPolicyArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::NetworkFirewall::FirewallPolicy",
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
