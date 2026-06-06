// Auto-generated extension model for @swamp/aws/networkfirewall/rule-group
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for NetworkFirewall RuleGroup (AWS::NetworkFirewall::RuleGroup).
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

const IPSetSchema = z.object({
  Definition: z.array(z.string().min(1).regex(new RegExp("^.*$"))).optional(),
});

const PortSetSchema = z.object({
  Definition: z.array(z.string().min(1).regex(new RegExp("^.*$"))).optional(),
});

const RuleVariablesSchema = z.object({
  IPSets: z.record(z.string(), IPSetSchema).optional(),
  PortSets: z.record(z.string(), PortSetSchema).optional(),
});

const IPSetReferenceSchema = z.object({
  ReferenceArn: z.string().min(1).max(256).regex(new RegExp("^(arn:aws.*)$"))
    .describe("A resource ARN.").optional(),
});

const ReferenceSetsSchema = z.object({
  IPSetReferences: z.record(z.string(), IPSetReferenceSchema).optional(),
});

const RulesSourceListSchema = z.object({
  Targets: z.array(z.string()),
  TargetTypes: z.array(z.enum(["TLS_SNI", "HTTP_HOST"])),
  GeneratedRulesType: z.enum([
    "ALLOWLIST",
    "DENYLIST",
    "ALERTLIST",
    "REJECTLIST",
  ]),
});

const HeaderSchema = z.object({
  Protocol: z.enum([
    "IP",
    "TCP",
    "UDP",
    "ICMP",
    "HTTP",
    "FTP",
    "TLS",
    "SMB",
    "DNS",
    "DCERPC",
    "SSH",
    "SMTP",
    "IMAP",
    "MSN",
    "KRB5",
    "IKEV2",
    "TFTP",
    "NTP",
    "DHCP",
  ]),
  Source: z.string().min(1).max(1024).regex(new RegExp("^.*$")),
  SourcePort: z.string().min(1).max(1024).regex(new RegExp("^.*$")),
  Direction: z.enum(["FORWARD", "ANY"]),
  Destination: z.string().min(1).max(1024).regex(new RegExp("^.*$")),
  DestinationPort: z.string().min(1).max(1024).regex(new RegExp("^.*$")),
});

const RuleOptionSchema = z.object({
  Keyword: z.string().min(1).max(128).regex(new RegExp("^.*$")),
  Settings: z.array(z.string().min(1).max(8192).regex(new RegExp("^.*$")))
    .optional(),
});

const StatefulRuleSchema = z.object({
  Action: z.enum(["PASS", "DROP", "ALERT", "REJECT"]),
  Header: HeaderSchema,
  RuleOptions: z.array(RuleOptionSchema),
});

const AddressSchema = z.object({
  AddressDefinition: z.string().min(1).max(255).regex(
    new RegExp("^([a-fA-F\\d:\\.]+/\\d{1,3})$"),
  ),
});

const PortRangeSchema = z.object({
  FromPort: z.number().int().min(0).max(65535),
  ToPort: z.number().int().min(0).max(65535),
});

const TCPFlagFieldSchema = z.object({
  Flags: z.array(
    z.enum(["FIN", "SYN", "RST", "PSH", "ACK", "URG", "ECE", "CWR"]),
  ),
  Masks: z.array(
    z.enum(["FIN", "SYN", "RST", "PSH", "ACK", "URG", "ECE", "CWR"]),
  ).optional(),
});

const MatchAttributesSchema = z.object({
  Sources: z.array(AddressSchema).optional(),
  Destinations: z.array(AddressSchema).optional(),
  SourcePorts: z.array(PortRangeSchema).optional(),
  DestinationPorts: z.array(PortRangeSchema).optional(),
  Protocols: z.array(z.number().int().min(0).max(255)).optional(),
  TCPFlags: z.array(TCPFlagFieldSchema).optional(),
});

const RuleDefinitionSchema = z.object({
  MatchAttributes: MatchAttributesSchema,
  Actions: z.array(z.string()),
});

const StatelessRuleSchema = z.object({
  RuleDefinition: RuleDefinitionSchema,
  Priority: z.number().int().min(1).max(65535),
});

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

const StatelessRulesAndCustomActionsSchema = z.object({
  StatelessRules: z.array(StatelessRuleSchema),
  CustomActions: z.array(CustomActionSchema).optional(),
});

const RulesSourceSchema = z.object({
  RulesString: z.string().min(0).max(1000000).optional(),
  RulesSourceList: RulesSourceListSchema.optional(),
  StatefulRules: z.array(StatefulRuleSchema).optional(),
  StatelessRulesAndCustomActions: StatelessRulesAndCustomActionsSchema
    .optional(),
});

const StatefulRuleOptionsSchema = z.object({
  RuleOrder: z.enum(["DEFAULT_ACTION_ORDER", "STRICT_ORDER"]).optional(),
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
  RuleGroupName: z.string().min(1).max(128).regex(
    new RegExp("^[a-zA-Z0-9-]+$"),
  ),
  RuleGroup: z.object({
    RuleVariables: RuleVariablesSchema.optional(),
    ReferenceSets: ReferenceSetsSchema.optional(),
    RulesSource: RulesSourceSchema,
    StatefulRuleOptions: StatefulRuleOptionsSchema.optional(),
  }).optional(),
  Type: z.enum(["STATELESS", "STATEFUL"]),
  Capacity: z.number().int(),
  SummaryConfiguration: z.object({
    RuleOptions: z.array(z.enum(["SID", "MSG", "METADATA"])).optional(),
  }).optional(),
  Description: z.string().min(1).max(512).regex(new RegExp("^.*$")).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  RuleGroupName: z.string().optional(),
  RuleGroupArn: z.string(),
  RuleGroupId: z.string().optional(),
  RuleGroup: z.object({
    RuleVariables: RuleVariablesSchema,
    ReferenceSets: ReferenceSetsSchema,
    RulesSource: RulesSourceSchema,
    StatefulRuleOptions: StatefulRuleOptionsSchema,
  }).optional(),
  Type: z.string().optional(),
  Capacity: z.number().optional(),
  SummaryConfiguration: z.object({
    RuleOptions: z.array(z.string()),
  }).optional(),
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
  RuleGroupName: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9-]+$"))
    .optional(),
  RuleGroup: z.object({
    RuleVariables: RuleVariablesSchema.optional(),
    ReferenceSets: ReferenceSetsSchema.optional(),
    RulesSource: RulesSourceSchema.optional(),
    StatefulRuleOptions: StatefulRuleOptionsSchema.optional(),
  }).optional(),
  Type: z.enum(["STATELESS", "STATEFUL"]).optional(),
  Capacity: z.number().int().optional(),
  SummaryConfiguration: z.object({
    RuleOptions: z.array(z.enum(["SID", "MSG", "METADATA"])).optional(),
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

/** Swamp extension model for NetworkFirewall RuleGroup. Registered at `@swamp/aws/networkfirewall/rule-group`. */
export const model = {
  type: "@swamp/aws/networkfirewall/rule-group",
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
      description: "NetworkFirewall RuleGroup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a NetworkFirewall RuleGroup",
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
          "AWS::NetworkFirewall::RuleGroup",
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
      description: "Get a NetworkFirewall RuleGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the NetworkFirewall RuleGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::NetworkFirewall::RuleGroup",
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
      description: "Update a NetworkFirewall RuleGroup",
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
        const identifier = existing.RuleGroupArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::NetworkFirewall::RuleGroup",
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
          "AWS::NetworkFirewall::RuleGroup",
          identifier,
          currentState,
          desiredState,
          ["RuleGroupName", "Capacity", "Type"],
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
      description: "Delete a NetworkFirewall RuleGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the NetworkFirewall RuleGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::NetworkFirewall::RuleGroup",
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
      description: "Sync NetworkFirewall RuleGroup state from AWS",
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
        const identifier = existing.RuleGroupArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::NetworkFirewall::RuleGroup",
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
