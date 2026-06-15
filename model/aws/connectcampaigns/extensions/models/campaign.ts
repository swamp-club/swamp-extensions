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

// Auto-generated extension model for @swamp/aws/connectcampaigns/campaign
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ConnectCampaigns Campaign (AWS::ConnectCampaigns::Campaign).
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

const ProgressiveDialerConfigSchema = z.object({
  BandwidthAllocation: z.number().min(0).max(1).describe(
    "The bandwidth allocation of a queue resource.",
  ),
  DialingCapacity: z.number().min(0.01).max(1).describe(
    "Allocates dialing capacity for this campaign between multiple active campaigns.",
  ).optional(),
});

const PredictiveDialerConfigSchema = z.object({
  BandwidthAllocation: z.number().min(0).max(1).describe(
    "The bandwidth allocation of a queue resource.",
  ),
  DialingCapacity: z.number().min(0.01).max(1).describe(
    "Allocates dialing capacity for this campaign between multiple active campaigns.",
  ).optional(),
});

const AgentlessDialerConfigSchema = z.object({
  DialingCapacity: z.number().min(0.01).max(1).describe(
    "Allocates dialing capacity for this campaign between multiple active campaigns.",
  ).optional(),
});

const AnswerMachineDetectionConfigSchema = z.object({
  EnableAnswerMachineDetection: z.boolean().describe(
    "Flag to decided whether outbound calls should have answering machine detection enabled or not",
  ),
  AwaitAnswerMachinePrompt: z.boolean().describe(
    "Enables detection of prompts (e.g., beep after after a voicemail greeting)",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(1).max(256).describe(
    "The value for the tag. You can specify a value that's 1 to 256 characters in length.",
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  ConnectInstanceArn: z.string().min(0).max(256).regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*$",
    ),
  ).describe("Amazon Connect Instance Arn"),
  DialerConfig: z.object({
    ProgressiveDialerConfig: ProgressiveDialerConfigSchema.describe(
      "Progressive Dialer config",
    ).optional(),
    PredictiveDialerConfig: PredictiveDialerConfigSchema.describe(
      "Predictive Dialer config",
    ).optional(),
    AgentlessDialerConfig: AgentlessDialerConfigSchema.describe(
      "Agentless Dialer config",
    ).optional(),
  }).describe("The possible types of dialer config parameters"),
  Name: z.string().min(1).max(127).describe("Amazon Connect Campaign Name"),
  OutboundCallConfig: z.object({
    ConnectContactFlowArn: z.string().max(500).regex(
      new RegExp(
        "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*/contact-flow/[-a-zA-Z0-9]*$",
      ),
    ).describe("The identifier of the contact flow for the outbound call."),
    ConnectSourcePhoneNumber: z.string().max(100).describe(
      "The phone number associated with the Amazon Connect instance, in E.164 format. If you do not specify a source phone number, you must specify a queue.",
    ).optional(),
    ConnectQueueArn: z.string().max(500).regex(
      new RegExp(
        "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*/queue/[-a-zA-Z0-9]*$",
      ),
    ).describe(
      "The queue for the call. If you specify a queue, the phone displayed for caller ID is the phone number specified in the queue. If you do not specify a queue, the queue defined in the contact flow is used. If you do not specify a queue, you must specify a source phone number.",
    ).optional(),
    AnswerMachineDetectionConfig: AnswerMachineDetectionConfigSchema.describe(
      "The configuration used for answering machine detection during outbound calls",
    ).optional(),
  }).describe("The configuration used for outbound calls."),
  Tags: z.array(TagSchema).describe("One or more tags.").optional(),
});

const StateSchema = z.object({
  ConnectInstanceArn: z.string().optional(),
  DialerConfig: z.object({
    ProgressiveDialerConfig: ProgressiveDialerConfigSchema,
    PredictiveDialerConfig: PredictiveDialerConfigSchema,
    AgentlessDialerConfig: AgentlessDialerConfigSchema,
  }).optional(),
  Arn: z.string(),
  Name: z.string().optional(),
  OutboundCallConfig: z.object({
    ConnectContactFlowArn: z.string(),
    ConnectSourcePhoneNumber: z.string(),
    ConnectQueueArn: z.string(),
    AnswerMachineDetectionConfig: AnswerMachineDetectionConfigSchema,
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
  ConnectInstanceArn: z.string().min(0).max(256).regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*$",
    ),
  ).describe("Amazon Connect Instance Arn").optional(),
  DialerConfig: z.object({
    ProgressiveDialerConfig: ProgressiveDialerConfigSchema.describe(
      "Progressive Dialer config",
    ).optional(),
    PredictiveDialerConfig: PredictiveDialerConfigSchema.describe(
      "Predictive Dialer config",
    ).optional(),
    AgentlessDialerConfig: AgentlessDialerConfigSchema.describe(
      "Agentless Dialer config",
    ).optional(),
  }).describe("The possible types of dialer config parameters").optional(),
  Name: z.string().min(1).max(127).describe("Amazon Connect Campaign Name")
    .optional(),
  OutboundCallConfig: z.object({
    ConnectContactFlowArn: z.string().max(500).regex(
      new RegExp(
        "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*/contact-flow/[-a-zA-Z0-9]*$",
      ),
    ).describe("The identifier of the contact flow for the outbound call.")
      .optional(),
    ConnectSourcePhoneNumber: z.string().max(100).describe(
      "The phone number associated with the Amazon Connect instance, in E.164 format. If you do not specify a source phone number, you must specify a queue.",
    ).optional(),
    ConnectQueueArn: z.string().max(500).regex(
      new RegExp(
        "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*/queue/[-a-zA-Z0-9]*$",
      ),
    ).describe(
      "The queue for the call. If you specify a queue, the phone displayed for caller ID is the phone number specified in the queue. If you do not specify a queue, the queue defined in the contact flow is used. If you do not specify a queue, you must specify a source phone number.",
    ).optional(),
    AnswerMachineDetectionConfig: AnswerMachineDetectionConfigSchema.describe(
      "The configuration used for answering machine detection during outbound calls",
    ).optional(),
  }).describe("The configuration used for outbound calls.").optional(),
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

/** Swamp extension model for ConnectCampaigns Campaign. Registered at `@swamp/aws/connectcampaigns/campaign`. */
export const model = {
  type: "@swamp/aws/connectcampaigns/campaign",
  version: "2026.06.15.1",
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
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ConnectCampaigns Campaign resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ConnectCampaigns Campaign",
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
          "AWS::ConnectCampaigns::Campaign",
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
      description: "Get a ConnectCampaigns Campaign",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ConnectCampaigns Campaign",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ConnectCampaigns::Campaign",
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
      description: "Update a ConnectCampaigns Campaign",
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
          "AWS::ConnectCampaigns::Campaign",
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
          "AWS::ConnectCampaigns::Campaign",
          identifier,
          currentState,
          desiredState,
          ["ConnectInstanceArn"],
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
      description: "Delete a ConnectCampaigns Campaign",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ConnectCampaigns Campaign",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ConnectCampaigns::Campaign",
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
      description: "Sync ConnectCampaigns Campaign state from AWS",
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
            "AWS::ConnectCampaigns::Campaign",
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
