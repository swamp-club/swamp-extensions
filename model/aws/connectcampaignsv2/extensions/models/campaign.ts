// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/connectcampaignsv2/campaign
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ConnectCampaignsV2 Campaign (AWS::ConnectCampaignsV2::Campaign).
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

const ProgressiveConfigSchema = z.object({
  BandwidthAllocation: z.number().min(0).max(1).describe(
    "The bandwidth allocation of a queue resource.",
  ),
});

const PredictiveConfigSchema = z.object({
  BandwidthAllocation: z.number().min(0).max(1).describe(
    "The bandwidth allocation of a queue resource.",
  ),
});

const TimeoutConfigSchema = z.object({
  DurationInSeconds: z.number().int().min(1).max(300).describe(
    "Timeout duration for a preview contact in seconds",
  ).optional(),
});

const PreviewConfigSchema = z.object({
  BandwidthAllocation: z.number().min(0).max(1).describe(
    "The bandwidth allocation of a queue resource.",
  ),
  TimeoutConfig: TimeoutConfigSchema.describe(
    "Timeout Config for preview contacts",
  ),
  AgentActions: z.array(z.enum(["DISCARD"])).describe(
    "Actions that can be performed by agent during preview phase",
  ).optional(),
});

const TelephonyOutboundModeSchema = z.object({
  ProgressiveConfig: ProgressiveConfigSchema.describe("Progressive config")
    .optional(),
  PredictiveConfig: PredictiveConfigSchema.describe("Predictive config")
    .optional(),
  AgentlessConfig: z.record(z.string(), z.unknown()).describe(
    "Agentless config",
  ).optional(),
  PreviewConfig: PreviewConfigSchema.describe("Preview config").optional(),
});

const AnswerMachineDetectionConfigSchema = z.object({
  EnableAnswerMachineDetection: z.boolean().describe(
    "Flag to decided whether outbound calls should have answering machine detection enabled or not",
  ),
  AwaitAnswerMachinePrompt: z.boolean().describe(
    "Enables detection of prompts (e.g., beep after after a voicemail greeting)",
  ).optional(),
});

const TelephonyOutboundConfigSchema = z.object({
  ConnectContactFlowId: z.string().max(500).describe(
    "The identifier of the contact flow for the outbound call",
  ),
  ConnectSourcePhoneNumber: z.string().max(100).describe(
    "The phone number associated with the Amazon Connect instance, in E.164 format. If you do not specify a source phone number, you must specify a queue.",
  ).optional(),
  AnswerMachineDetectionConfig: AnswerMachineDetectionConfigSchema.describe(
    "The configuration used for answering machine detection during outbound calls",
  ).optional(),
  RingTimeout: z.number().int().min(15).max(60).describe(
    "Maximum ring time for outbound calls in seconds",
  ).optional(),
});

const TelephonyChannelSubtypeConfigSchema = z.object({
  Capacity: z.number().min(0.01).max(1).describe(
    "Allocates outbound capacity for the specific channel of this campaign between multiple active campaigns",
  ).optional(),
  ConnectQueueId: z.string().max(500).describe("The queue for the call")
    .optional(),
  OutboundMode: TelephonyOutboundModeSchema.describe("Telephony Outbound Mode"),
  DefaultOutboundConfig: TelephonyOutboundConfigSchema.describe(
    "Default Telephone Outbound config",
  ),
});

const SmsOutboundModeSchema = z.object({
  AgentlessConfig: z.record(z.string(), z.unknown()).describe(
    "Agentless config",
  ).optional(),
});

const SmsOutboundConfigSchema = z.object({
  ConnectSourcePhoneNumberArn: z.string().min(20).max(500).regex(
    new RegExp("^arn:.*$"),
  ).describe("Arn"),
  WisdomTemplateArn: z.string().min(20).max(500).regex(new RegExp("^arn:.*$"))
    .describe("Arn"),
});

const SmsChannelSubtypeConfigSchema = z.object({
  Capacity: z.number().min(0.01).max(1).describe(
    "Allocates outbound capacity for the specific channel of this campaign between multiple active campaigns",
  ).optional(),
  OutboundMode: SmsOutboundModeSchema.describe("SMS Outbound Mode"),
  DefaultOutboundConfig: SmsOutboundConfigSchema.describe(
    "Default SMS outbound config",
  ),
});

const EmailOutboundModeSchema = z.object({
  AgentlessConfig: z.record(z.string(), z.unknown()).describe(
    "Agentless config",
  ).optional(),
});

const EmailOutboundConfigSchema = z.object({
  ConnectSourceEmailAddress: z.string().min(1).max(255).regex(
    new RegExp("^[\\w-\\.\\+]+@([\\w-]+\\.)+[\\w-]{2,4}$"),
  ).describe("Email address used for Email messages"),
  SourceEmailAddressDisplayName: z.string().min(0).max(256).describe(
    "The name of the source email address display name",
  ).optional(),
  WisdomTemplateArn: z.string().min(20).max(500).regex(new RegExp("^arn:.*$"))
    .describe("Arn"),
});

const EmailChannelSubtypeConfigSchema = z.object({
  Capacity: z.number().min(0.01).max(1).describe(
    "Allocates outbound capacity for the specific channel of this campaign between multiple active campaigns",
  ).optional(),
  OutboundMode: EmailOutboundModeSchema.describe("Email Outbound Mode"),
  DefaultOutboundConfig: EmailOutboundConfigSchema.describe(
    "Default Email outbound config",
  ),
});

const WhatsAppOutboundModeSchema = z.object({
  AgentlessConfig: z.record(z.string(), z.unknown()).describe(
    "Agentless config",
  ).optional(),
});

const WhatsAppOutboundConfigSchema = z.object({
  ConnectSourcePhoneNumberArn: z.string().min(20).max(500).regex(
    new RegExp("^arn:.*$"),
  ).describe("Arn"),
  WisdomTemplateArn: z.string().min(20).max(500).regex(new RegExp("^arn:.*$"))
    .describe("Arn"),
});

const WhatsAppChannelSubtypeConfigSchema = z.object({
  Capacity: z.number().min(0.01).max(1).describe(
    "Allocates outbound capacity for the specific channel of this campaign between multiple active campaigns",
  ).optional(),
  OutboundMode: WhatsAppOutboundModeSchema.describe("WhatsApp Outbound Mode"),
  DefaultOutboundConfig: WhatsAppOutboundConfigSchema.describe(
    "Default WhatsApp outbound config",
  ),
});

const EventTriggerSchema = z.object({
  CustomerProfilesDomainArn: z.string().min(20).max(500).regex(
    new RegExp("^arn:.*$"),
  ).describe("Arn").optional(),
});

const LocalTimeZoneConfigSchema = z.object({
  DefaultTimeZone: z.string().describe("Time Zone Id in the IANA format")
    .optional(),
  LocalTimeZoneDetection: z.array(z.enum(["ZIP_CODE", "AREA_CODE"])).describe(
    "Local TimeZone Detection method list",
  ).optional(),
  LocalTimeZoneDetectionScope: z.enum(["PRIMARY_ONLY", "ALL_AVAILABLE"])
    .describe("Local TimeZone Detection scope").optional(),
});

const TimeRangeSchema = z.object({
  StartTime: z.string().regex(new RegExp("^T\\d{2}:\\d{2}$")).describe(
    "Time in ISO 8601 format, e.g. T23:11",
  ),
  EndTime: z.string().regex(new RegExp("^T\\d{2}:\\d{2}$")).describe(
    "Time in ISO 8601 format, e.g. T23:11",
  ),
});

const DailyHourSchema = z.object({
  Key: z.enum([
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ]).describe("Day of week").optional(),
  Value: z.array(TimeRangeSchema).describe("List of time range").optional(),
});

const OpenHoursSchema = z.object({
  DailyHours: z.array(DailyHourSchema).describe("Daily Hours map"),
});

const RestrictedPeriodSchema = z.object({
  Name: z.string().max(127).describe("The name of a restricted period")
    .optional(),
  StartDate: z.string().regex(new RegExp("^\\d{4}-\\d{2}-\\d{2}$")).describe(
    "Date in ISO 8601 format, e.g. 2024-01-01",
  ),
  EndDate: z.string().regex(new RegExp("^\\d{4}-\\d{2}-\\d{2}$")).describe(
    "Date in ISO 8601 format, e.g. 2024-01-01",
  ),
});

const RestrictedPeriodsSchema = z.object({
  RestrictedPeriodList: z.array(RestrictedPeriodSchema).describe(
    "List of restricted period",
  ).optional(),
});

const TimeWindowSchema = z.object({
  OpenHours: OpenHoursSchema.describe("Open Hours config"),
  RestrictedPeriods: RestrictedPeriodsSchema.describe(
    "Restricted period config",
  ).optional(),
});

const CommunicationLimitSchema = z.object({
  MaxCountPerRecipient: z.number().int().min(1),
  Frequency: z.number().int().min(1),
  Unit: z.enum(["DAY"]).describe("The communication limit time unit"),
});

const CommunicationLimitsSchema = z.object({
  CommunicationLimitList: z.array(CommunicationLimitSchema).describe(
    "List of communication limit",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().describe("The key name of the tag."),
  Value: z.string().describe("The value for the tag."),
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
  Name: z.string().min(1).max(127).describe("Campaign name"),
  Type: z.enum(["MANAGED", "JOURNEY"]).describe("Campaign type").optional(),
  ConnectInstanceId: z.string().min(0).max(256).regex(
    new RegExp("^[a-zA-Z0-9_\\-.]*$"),
  ).describe("Amazon Connect Instance Id"),
  ChannelSubtypeConfig: z.object({
    Telephony: TelephonyChannelSubtypeConfigSchema.describe(
      "Telephony Channel Subtype config",
    ).optional(),
    Sms: SmsChannelSubtypeConfigSchema.describe("SMS Channel Subtype config")
      .optional(),
    Email: EmailChannelSubtypeConfigSchema.describe(
      "Email Channel Subtype config",
    ).optional(),
    WhatsApp: WhatsAppChannelSubtypeConfigSchema.describe(
      "WhatsApp Channel Subtype config",
    ).optional(),
  }).describe("The possible types of channel subtype config parameters")
    .optional(),
  Source: z.object({
    CustomerProfilesSegmentArn: z.string().min(20).max(500).regex(
      new RegExp("^arn:.*$"),
    ).describe("Arn").optional(),
    EventTrigger: EventTriggerSchema.describe(
      "The event trigger of the campaign",
    ).optional(),
  }).describe("The possible source of the campaign").optional(),
  ConnectCampaignFlowArn: z.string().min(20).max(500).regex(
    new RegExp("^arn:.*$"),
  ).describe("Arn").optional(),
  Schedule: z.object({
    StartTime: z.string().max(100).describe(
      "Timestamp with no UTC offset or timezone",
    ),
    EndTime: z.string().max(100).describe(
      "Timestamp with no UTC offset or timezone",
    ),
    RefreshFrequency: z.string().min(0).max(50).regex(
      new RegExp(
        "^P(?:([-+]?[0-9]+)D)?(T(?:([-+]?[0-9]+)H)?(?:([-+]?[0-9]+)M)?(?:([-+]?[0-9]+)(?:[.,]([0-9]{0,9}))?S)?)?$",
      ),
    ).describe("Time duration in ISO 8601 format").optional(),
  }).describe("Campaign schedule").optional(),
  CommunicationTimeConfig: z.object({
    LocalTimeZoneConfig: LocalTimeZoneConfigSchema.describe(
      "Local time zone config",
    ),
    Telephony: TimeWindowSchema.describe("Time window config").optional(),
    Sms: TimeWindowSchema.describe("Time window config").optional(),
    Email: TimeWindowSchema.describe("Time window config").optional(),
    WhatsApp: TimeWindowSchema.describe("Time window config").optional(),
  }).describe("Campaign communication time config").optional(),
  CommunicationLimitsOverride: z.object({
    AllChannelsSubtypes: CommunicationLimitsSchema.describe(
      "Communication limits",
    ).optional(),
    InstanceLimitsHandling: z.enum(["OPT_IN", "OPT_OUT"]).describe(
      "Enumeration of Instance Limits handling in a Campaign",
    ).optional(),
  }).describe("Communication limits config").optional(),
  EntryLimitsConfig: z.object({
    MaxEntryCount: z.number().int().min(0).describe(
      "Maximum number of entries per participant. 0 indicates unlimited entries.",
    ),
    MinEntryInterval: z.string().min(0).max(50).regex(
      new RegExp(
        "^P(?:([-+]?[0-9]+)D)?(T(?:([-+]?[0-9]+)H)?(?:([-+]?[0-9]+)M)?(?:([-+]?[0-9]+)(?:[.,]([0-9]{0,9}))?S)?)?$",
      ),
    ).describe(
      "Minimum time interval between entries for the same participant in ISO 8601 duration format",
    ),
  }).describe("Entry limits config for a campaign").optional(),
  Tags: z.array(TagSchema).describe("One or more tags.").optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Name: z.string().optional(),
  Type: z.string().optional(),
  ConnectInstanceId: z.string().optional(),
  ChannelSubtypeConfig: z.object({
    Telephony: TelephonyChannelSubtypeConfigSchema,
    Sms: SmsChannelSubtypeConfigSchema,
    Email: EmailChannelSubtypeConfigSchema,
    WhatsApp: WhatsAppChannelSubtypeConfigSchema,
  }).optional(),
  Source: z.object({
    CustomerProfilesSegmentArn: z.string(),
    EventTrigger: EventTriggerSchema,
  }).optional(),
  ConnectCampaignFlowArn: z.string().optional(),
  Schedule: z.object({
    StartTime: z.string(),
    EndTime: z.string(),
    RefreshFrequency: z.string(),
  }).optional(),
  CommunicationTimeConfig: z.object({
    LocalTimeZoneConfig: LocalTimeZoneConfigSchema,
    Telephony: TimeWindowSchema,
    Sms: TimeWindowSchema,
    Email: TimeWindowSchema,
    WhatsApp: TimeWindowSchema,
  }).optional(),
  CommunicationLimitsOverride: z.object({
    AllChannelsSubtypes: CommunicationLimitsSchema,
    InstanceLimitsHandling: z.string(),
  }).optional(),
  EntryLimitsConfig: z.object({
    MaxEntryCount: z.number(),
    MinEntryInterval: z.string(),
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
  Name: z.string().min(1).max(127).describe("Campaign name").optional(),
  Type: z.enum(["MANAGED", "JOURNEY"]).describe("Campaign type").optional(),
  ConnectInstanceId: z.string().min(0).max(256).regex(
    new RegExp("^[a-zA-Z0-9_\\-.]*$"),
  ).describe("Amazon Connect Instance Id").optional(),
  ChannelSubtypeConfig: z.object({
    Telephony: TelephonyChannelSubtypeConfigSchema.describe(
      "Telephony Channel Subtype config",
    ).optional(),
    Sms: SmsChannelSubtypeConfigSchema.describe("SMS Channel Subtype config")
      .optional(),
    Email: EmailChannelSubtypeConfigSchema.describe(
      "Email Channel Subtype config",
    ).optional(),
    WhatsApp: WhatsAppChannelSubtypeConfigSchema.describe(
      "WhatsApp Channel Subtype config",
    ).optional(),
  }).describe("The possible types of channel subtype config parameters")
    .optional(),
  Source: z.object({
    CustomerProfilesSegmentArn: z.string().min(20).max(500).regex(
      new RegExp("^arn:.*$"),
    ).describe("Arn").optional(),
    EventTrigger: EventTriggerSchema.describe(
      "The event trigger of the campaign",
    ).optional(),
  }).describe("The possible source of the campaign").optional(),
  ConnectCampaignFlowArn: z.string().min(20).max(500).regex(
    new RegExp("^arn:.*$"),
  ).describe("Arn").optional(),
  Schedule: z.object({
    StartTime: z.string().max(100).describe(
      "Timestamp with no UTC offset or timezone",
    ).optional(),
    EndTime: z.string().max(100).describe(
      "Timestamp with no UTC offset or timezone",
    ).optional(),
    RefreshFrequency: z.string().min(0).max(50).regex(
      new RegExp(
        "^P(?:([-+]?[0-9]+)D)?(T(?:([-+]?[0-9]+)H)?(?:([-+]?[0-9]+)M)?(?:([-+]?[0-9]+)(?:[.,]([0-9]{0,9}))?S)?)?$",
      ),
    ).describe("Time duration in ISO 8601 format").optional(),
  }).describe("Campaign schedule").optional(),
  CommunicationTimeConfig: z.object({
    LocalTimeZoneConfig: LocalTimeZoneConfigSchema.describe(
      "Local time zone config",
    ).optional(),
    Telephony: TimeWindowSchema.describe("Time window config").optional(),
    Sms: TimeWindowSchema.describe("Time window config").optional(),
    Email: TimeWindowSchema.describe("Time window config").optional(),
    WhatsApp: TimeWindowSchema.describe("Time window config").optional(),
  }).describe("Campaign communication time config").optional(),
  CommunicationLimitsOverride: z.object({
    AllChannelsSubtypes: CommunicationLimitsSchema.describe(
      "Communication limits",
    ).optional(),
    InstanceLimitsHandling: z.enum(["OPT_IN", "OPT_OUT"]).describe(
      "Enumeration of Instance Limits handling in a Campaign",
    ).optional(),
  }).describe("Communication limits config").optional(),
  EntryLimitsConfig: z.object({
    MaxEntryCount: z.number().int().min(0).describe(
      "Maximum number of entries per participant. 0 indicates unlimited entries.",
    ).optional(),
    MinEntryInterval: z.string().min(0).max(50).regex(
      new RegExp(
        "^P(?:([-+]?[0-9]+)D)?(T(?:([-+]?[0-9]+)H)?(?:([-+]?[0-9]+)M)?(?:([-+]?[0-9]+)(?:[.,]([0-9]{0,9}))?S)?)?$",
      ),
    ).describe(
      "Minimum time interval between entries for the same participant in ISO 8601 duration format",
    ).optional(),
  }).describe("Entry limits config for a campaign").optional(),
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

/** Swamp extension model for ConnectCampaignsV2 Campaign. Registered at `@swamp/aws/connectcampaignsv2/campaign`. */
export const model = {
  type: "@swamp/aws/connectcampaignsv2/campaign",
  version: "2026.06.08.1",
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
      toVersion: "2026.04.09.1",
      description: "Added: EntryLimitsConfig",
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
    {
      toVersion: "2026.06.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.06.1",
      description: "Added: accessKeyId, secretAccessKey, sessionToken, region",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ConnectCampaignsV2 Campaign resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ConnectCampaignsV2 Campaign",
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
          "AWS::ConnectCampaignsV2::Campaign",
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
      description: "Get a ConnectCampaignsV2 Campaign",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ConnectCampaignsV2 Campaign",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ConnectCampaignsV2::Campaign",
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
      description: "Update a ConnectCampaignsV2 Campaign",
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
          "AWS::ConnectCampaignsV2::Campaign",
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
          "AWS::ConnectCampaignsV2::Campaign",
          identifier,
          currentState,
          desiredState,
          ["ConnectInstanceId"],
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
      description: "Delete a ConnectCampaignsV2 Campaign",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ConnectCampaignsV2 Campaign",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ConnectCampaignsV2::Campaign",
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
      description: "Sync ConnectCampaignsV2 Campaign state from AWS",
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
            "AWS::ConnectCampaignsV2::Campaign",
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
