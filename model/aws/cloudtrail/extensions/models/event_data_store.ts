// Auto-generated extension model for @swamp/aws/cloudtrail/event-data-store
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CloudTrail EventDataStore (AWS::CloudTrail::EventDataStore).
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

const AdvancedFieldSelectorSchema = z.object({
  Field: z.string().min(1).max(1000).regex(new RegExp("([\\w|\\d|\\.|_]+)"))
    .describe(
      "A field in an event record on which to filter events to be logged. Supported fields include readOnly, eventCategory, eventSource (for management events), eventName, resources.type, and resources.ARN.",
    ),
  Equals: z.array(z.string().min(1).max(2048).regex(new RegExp("(.+)")))
    .describe(
      "An operator that includes events that match the exact value of the event record field specified as the value of Field. This is the only valid operator that you can use with the readOnly, eventCategory, and resources.type fields.",
    ).optional(),
  StartsWith: z.array(z.string().min(1).max(2048).regex(new RegExp("(.+)")))
    .describe(
      "An operator that includes events that match the first few characters of the event record field specified as the value of Field.",
    ).optional(),
  EndsWith: z.array(z.string().min(1).max(2048).regex(new RegExp("(.+)")))
    .describe(
      "An operator that includes events that match the last few characters of the event record field specified as the value of Field.",
    ).optional(),
  NotEquals: z.array(z.string().min(1).max(2048).regex(new RegExp("(.+)")))
    .describe(
      "An operator that excludes events that match the exact value of the event record field specified as the value of Field.",
    ).optional(),
  NotStartsWith: z.array(z.string().min(1).max(2048).regex(new RegExp("(.+)")))
    .describe(
      "An operator that excludes events that match the first few characters of the event record field specified as the value of Field.",
    ).optional(),
  NotEndsWith: z.array(z.string().min(1).max(2048).regex(new RegExp("(.+)")))
    .describe(
      "An operator that excludes events that match the last few characters of the event record field specified as the value of Field.",
    ).optional(),
});

const AdvancedEventSelectorSchema = z.object({
  Name: z.string().min(1).max(1000).describe(
    'An optional, descriptive name for an advanced event selector, such as "Log data events for only two S3 buckets".',
  ).optional(),
  FieldSelectors: z.array(AdvancedFieldSelectorSchema).describe(
    "Contains all selector statements in an advanced event selector.",
  ),
});

const TagSchema = z.object({
  Key: z.string().describe(
    "The key name of the tag. You can specify a value that is 1 to 127 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().describe(
    "The value for the tag. You can specify a value that is 1 to 255 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const InsightSelectorSchema = z.object({
  InsightType: z.string().describe(
    "The type of Insights to log on an event data store.",
  ).optional(),
});

const ContextKeySelectorSchema = z.object({
  Type: z.enum(["RequestContext", "TagContext"]).describe(
    "Specifies the type of the event record field in ContextKeySelector. Valid values include RequestContext, TagContext.",
  ),
  Equals: z.array(z.string().min(1).max(128).regex(new RegExp("(.+)")))
    .describe(
      "An operator that includes events that match the exact value of the event record field specified in Type.",
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
  AdvancedEventSelectors: z.array(AdvancedEventSelectorSchema).describe(
    "The advanced event selectors that were used to select events for the data store.",
  ).optional(),
  FederationEnabled: z.boolean().describe(
    "Indicates whether federation is enabled on an event data store.",
  ).optional(),
  FederationRoleArn: z.string().describe(
    "The ARN of the role used for event data store federation.",
  ).optional(),
  MultiRegionEnabled: z.boolean().describe(
    "Indicates whether the event data store includes events from all regions, or only from the region in which it was created.",
  ).optional(),
  Name: z.string().describe("The name of the event data store.").optional(),
  OrganizationEnabled: z.boolean().describe(
    "Indicates that an event data store is collecting logged events for an organization.",
  ).optional(),
  BillingMode: z.string().describe(
    "The mode that the event data store will use to charge for event storage.",
  ).optional(),
  RetentionPeriod: z.number().int().describe("The retention period, in days.")
    .optional(),
  TerminationProtectionEnabled: z.boolean().describe(
    "Indicates whether the event data store is protected from termination.",
  ).optional(),
  KmsKeyId: z.string().describe(
    "Specifies the KMS key ID to use to encrypt the events delivered by CloudTrail. The value can be an alias name prefixed by 'alias/', a fully specified ARN to an alias, a fully specified ARN to a key, or a globally unique identifier.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  InsightSelectors: z.array(InsightSelectorSchema).describe(
    "Lets you enable Insights event logging by specifying the Insights selectors that you want to enable on an existing event data store. Both InsightSelectors and InsightsDestination need to have a value in order to enable Insights events on an event data store.",
  ).optional(),
  InsightsDestination: z.string().describe(
    "Specifies the ARN of the event data store that will collect Insights events. Both InsightSelectors and InsightsDestination need to have a value in order to enable Insights events on an event data store",
  ).optional(),
  MaxEventSize: z.enum(["Standard", "Large"]).describe(
    "Specifies the maximum size allowed for the event. Valid values are Standard and Large. If you add ContextKeySelectors, this value must be set to Large.",
  ).optional(),
  ContextKeySelectors: z.array(ContextKeySelectorSchema).describe(
    "An array that enriches event records in an existing event data store by including additional information specified in individual ContexKeySelector entries. If you add ContextKeySelectors, you must set MaxEventSize to Large.",
  ).optional(),
  IngestionEnabled: z.boolean().describe(
    "Indicates whether the event data store is ingesting events.",
  ).optional(),
});

const StateSchema = z.object({
  AdvancedEventSelectors: z.array(AdvancedEventSelectorSchema).optional(),
  CreatedTimestamp: z.string().optional(),
  EventDataStoreArn: z.string(),
  FederationEnabled: z.boolean().optional(),
  FederationRoleArn: z.string().optional(),
  MultiRegionEnabled: z.boolean().optional(),
  Name: z.string().optional(),
  OrganizationEnabled: z.boolean().optional(),
  BillingMode: z.string().optional(),
  RetentionPeriod: z.number().optional(),
  Status: z.string().optional(),
  TerminationProtectionEnabled: z.boolean().optional(),
  UpdatedTimestamp: z.string().optional(),
  KmsKeyId: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  InsightSelectors: z.array(InsightSelectorSchema).optional(),
  InsightsDestination: z.string().optional(),
  MaxEventSize: z.string().optional(),
  ContextKeySelectors: z.array(ContextKeySelectorSchema).optional(),
  IngestionEnabled: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AdvancedEventSelectors: z.array(AdvancedEventSelectorSchema).describe(
    "The advanced event selectors that were used to select events for the data store.",
  ).optional(),
  FederationEnabled: z.boolean().describe(
    "Indicates whether federation is enabled on an event data store.",
  ).optional(),
  FederationRoleArn: z.string().describe(
    "The ARN of the role used for event data store federation.",
  ).optional(),
  MultiRegionEnabled: z.boolean().describe(
    "Indicates whether the event data store includes events from all regions, or only from the region in which it was created.",
  ).optional(),
  Name: z.string().describe("The name of the event data store.").optional(),
  OrganizationEnabled: z.boolean().describe(
    "Indicates that an event data store is collecting logged events for an organization.",
  ).optional(),
  BillingMode: z.string().describe(
    "The mode that the event data store will use to charge for event storage.",
  ).optional(),
  RetentionPeriod: z.number().int().describe("The retention period, in days.")
    .optional(),
  TerminationProtectionEnabled: z.boolean().describe(
    "Indicates whether the event data store is protected from termination.",
  ).optional(),
  KmsKeyId: z.string().describe(
    "Specifies the KMS key ID to use to encrypt the events delivered by CloudTrail. The value can be an alias name prefixed by 'alias/', a fully specified ARN to an alias, a fully specified ARN to a key, or a globally unique identifier.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  InsightSelectors: z.array(InsightSelectorSchema).describe(
    "Lets you enable Insights event logging by specifying the Insights selectors that you want to enable on an existing event data store. Both InsightSelectors and InsightsDestination need to have a value in order to enable Insights events on an event data store.",
  ).optional(),
  InsightsDestination: z.string().describe(
    "Specifies the ARN of the event data store that will collect Insights events. Both InsightSelectors and InsightsDestination need to have a value in order to enable Insights events on an event data store",
  ).optional(),
  MaxEventSize: z.enum(["Standard", "Large"]).describe(
    "Specifies the maximum size allowed for the event. Valid values are Standard and Large. If you add ContextKeySelectors, this value must be set to Large.",
  ).optional(),
  ContextKeySelectors: z.array(ContextKeySelectorSchema).describe(
    "An array that enriches event records in an existing event data store by including additional information specified in individual ContexKeySelector entries. If you add ContextKeySelectors, you must set MaxEventSize to Large.",
  ).optional(),
  IngestionEnabled: z.boolean().describe(
    "Indicates whether the event data store is ingesting events.",
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

/** Swamp extension model for CloudTrail EventDataStore. Registered at `@swamp/aws/cloudtrail/event-data-store`. */
export const model = {
  type: "@swamp/aws/cloudtrail/event-data-store",
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
      description: "CloudTrail EventDataStore resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CloudTrail EventDataStore",
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
          "AWS::CloudTrail::EventDataStore",
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
      description: "Get a CloudTrail EventDataStore",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudTrail EventDataStore",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CloudTrail::EventDataStore",
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
      description: "Update a CloudTrail EventDataStore",
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
        const identifier = existing.EventDataStoreArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::CloudTrail::EventDataStore",
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
          "AWS::CloudTrail::EventDataStore",
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
      description: "Delete a CloudTrail EventDataStore",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudTrail EventDataStore",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CloudTrail::EventDataStore",
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
      description: "Sync CloudTrail EventDataStore state from AWS",
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
        const identifier = existing.EventDataStoreArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CloudTrail::EventDataStore",
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
