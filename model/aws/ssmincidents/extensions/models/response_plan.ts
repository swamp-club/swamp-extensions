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

// Auto-generated extension model for @swamp/aws/ssmincidents/response-plan
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SSMIncidents ResponsePlan (AWS::SSMIncidents::ResponsePlan).
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

const SsmParameterSchema = z.object({
  Key: z.string().min(1).max(50),
  Values: z.array(z.string().max(10000)),
});

const DynamicSsmParameterValueSchema = z.object({
  Variable: z.enum(["INCIDENT_RECORD_ARN", "INVOLVED_RESOURCES"]).describe(
    "The variable types used as dynamic parameter value when starting the SSM automation document.",
  ).optional(),
});

const DynamicSsmParameterSchema = z.object({
  Key: z.string().min(1).max(50),
  Value: DynamicSsmParameterValueSchema.describe(
    "Value of the dynamic parameter to set when starting the SSM automation document.",
  ),
});

const SsmAutomationSchema = z.object({
  RoleArn: z.string().max(1000).regex(
    new RegExp(
      "^arn:aws(-(cn|us-gov))?:[a-z-]+:(([a-z]+-)+[0-9])?:([0-9]{12})?:[^.]+$",
    ),
  ).describe("The role ARN to use when starting the SSM automation document."),
  DocumentName: z.string().max(128).describe(
    "The document name to use when starting the SSM automation document.",
  ),
  DocumentVersion: z.string().max(128).describe(
    "The version of the document to use when starting the SSM automation document.",
  ).optional(),
  TargetAccount: z.enum(["IMPACTED_ACCOUNT", "RESPONSE_PLAN_OWNER_ACCOUNT"])
    .describe(
      "The account type to use when starting the SSM automation document.",
    ).optional(),
  Parameters: z.array(SsmParameterSchema).describe(
    "The parameters to set when starting the SSM automation document.",
  ).optional(),
  DynamicParameters: z.array(DynamicSsmParameterSchema).describe(
    "The parameters with dynamic values to set when starting the SSM automation document.",
  ).optional(),
});

const ActionSchema = z.object({
  SsmAutomation: SsmAutomationSchema.describe(
    "The configuration to use when starting the SSM automation document.",
  ).optional(),
});

const PagerDutyIncidentConfigurationSchema = z.object({
  ServiceId: z.string().min(1).max(200).describe("The pagerDuty serviceId."),
});

const PagerDutyConfigurationSchema = z.object({
  Name: z.string().min(1).max(200).describe(
    "The name of the pagerDuty configuration.",
  ),
  SecretId: z.string().min(1).max(512).describe(
    "The AWS secrets manager secretId storing the pagerDuty token.",
  ),
  PagerDutyIncidentConfiguration: PagerDutyIncidentConfigurationSchema.describe(
    "The pagerDuty incident configuration.",
  ),
});

const IntegrationSchema = z.object({
  PagerDutyConfiguration: PagerDutyConfigurationSchema.describe(
    "The pagerDuty configuration to use when starting the incident.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ),
  Value: z.string().min(1).max(256),
});

const NotificationTargetItemSchema = z.object({
  SnsTopicArn: z.string().max(1000).regex(
    new RegExp(
      "^arn:aws(-(cn|us-gov))?:sns:(([a-z]+-)+[0-9])?:([0-9]{12})?:[^.]+$",
    ),
  ).describe("The ARN of the Chatbot SNS topic.").optional(),
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
  Name: z.string().min(1).max(200).regex(new RegExp("^[a-zA-Z0-9_-]*$"))
    .describe("The name of the response plan."),
  DisplayName: z.string().min(1).max(200).describe(
    "The display name of the response plan.",
  ).optional(),
  ChatChannel: z.object({
    ChatbotSns: z.array(
      z.string().max(1000).regex(
        new RegExp(
          "^arn:aws(-(cn|us-gov))?:sns:(([a-z]+-)+[0-9])?:([0-9]{12})?:[^.]+$",
        ),
      ),
    ).optional(),
  }).describe("The chat channel configuration.").optional(),
  Engagements: z.array(
    z.string().max(1000).regex(
      new RegExp(
        "^arn:aws(-(cn|us-gov))?:ssm-contacts:(([a-z]+-)+[0-9])?:([0-9]{12})?:[^.]+$",
      ),
    ),
  ).describe("The list of engagements to use.").optional(),
  Actions: z.array(ActionSchema).describe("The list of actions.").optional(),
  Integrations: z.array(IntegrationSchema).describe("The list of integrations.")
    .optional(),
  Tags: z.array(TagSchema).describe("The tags to apply to the response plan.")
    .optional(),
  IncidentTemplate: z.object({
    DedupeString: z.string().min(1).max(1000).describe(
      "The deduplication string.",
    ).optional(),
    Impact: z.number().int().min(1).max(5).describe("The impact value."),
    NotificationTargets: z.array(NotificationTargetItemSchema).describe(
      "The list of notification targets.",
    ).optional(),
    Summary: z.string().min(1).max(4000).describe("The summary string.")
      .optional(),
    Title: z.string().max(200).describe("The title string."),
    IncidentTags: z.array(TagSchema).describe(
      "Tags that get applied to incidents created by the StartIncident API action.",
    ).optional(),
  }).describe("The incident template configuration."),
});

const StateSchema = z.object({
  Arn: z.string(),
  Name: z.string().optional(),
  DisplayName: z.string().optional(),
  ChatChannel: z.object({
    ChatbotSns: z.array(z.string()),
  }).optional(),
  Engagements: z.array(z.string()).optional(),
  Actions: z.array(ActionSchema).optional(),
  Integrations: z.array(IntegrationSchema).optional(),
  Tags: z.array(TagSchema).optional(),
  IncidentTemplate: z.object({
    DedupeString: z.string(),
    Impact: z.number(),
    NotificationTargets: z.array(NotificationTargetItemSchema),
    Summary: z.string(),
    Title: z.string(),
    IncidentTags: z.array(TagSchema),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(200).regex(new RegExp("^[a-zA-Z0-9_-]*$"))
    .describe("The name of the response plan.").optional(),
  DisplayName: z.string().min(1).max(200).describe(
    "The display name of the response plan.",
  ).optional(),
  ChatChannel: z.object({
    ChatbotSns: z.array(
      z.string().max(1000).regex(
        new RegExp(
          "^arn:aws(-(cn|us-gov))?:sns:(([a-z]+-)+[0-9])?:([0-9]{12})?:[^.]+$",
        ),
      ),
    ).optional(),
  }).describe("The chat channel configuration.").optional(),
  Engagements: z.array(
    z.string().max(1000).regex(
      new RegExp(
        "^arn:aws(-(cn|us-gov))?:ssm-contacts:(([a-z]+-)+[0-9])?:([0-9]{12})?:[^.]+$",
      ),
    ),
  ).describe("The list of engagements to use.").optional(),
  Actions: z.array(ActionSchema).describe("The list of actions.").optional(),
  Integrations: z.array(IntegrationSchema).describe("The list of integrations.")
    .optional(),
  Tags: z.array(TagSchema).describe("The tags to apply to the response plan.")
    .optional(),
  IncidentTemplate: z.object({
    DedupeString: z.string().min(1).max(1000).describe(
      "The deduplication string.",
    ).optional(),
    Impact: z.number().int().min(1).max(5).describe("The impact value.")
      .optional(),
    NotificationTargets: z.array(NotificationTargetItemSchema).describe(
      "The list of notification targets.",
    ).optional(),
    Summary: z.string().min(1).max(4000).describe("The summary string.")
      .optional(),
    Title: z.string().max(200).describe("The title string.").optional(),
    IncidentTags: z.array(TagSchema).describe(
      "Tags that get applied to incidents created by the StartIncident API action.",
    ).optional(),
  }).describe("The incident template configuration.").optional(),
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

/** Swamp extension model for SSMIncidents ResponsePlan. Registered at `@swamp/aws/ssmincidents/response-plan`. */
export const model = {
  type: "@swamp/aws/ssmincidents/response-plan",
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
      description: "SSMIncidents ResponsePlan resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SSMIncidents ResponsePlan",
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
          "AWS::SSMIncidents::ResponsePlan",
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
      description: "Get a SSMIncidents ResponsePlan",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSMIncidents ResponsePlan",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SSMIncidents::ResponsePlan",
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
      description: "Update a SSMIncidents ResponsePlan",
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
          "AWS::SSMIncidents::ResponsePlan",
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
          "AWS::SSMIncidents::ResponsePlan",
          identifier,
          currentState,
          desiredState,
          ["Name"],
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
      description: "Delete a SSMIncidents ResponsePlan",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSMIncidents ResponsePlan",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SSMIncidents::ResponsePlan",
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
      description: "Sync SSMIncidents ResponsePlan state from AWS",
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
            "AWS::SSMIncidents::ResponsePlan",
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
