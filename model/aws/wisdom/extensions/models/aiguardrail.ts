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

// Auto-generated extension model for @swamp/aws/wisdom/aiguardrail
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Wisdom AIGuardrail (AWS::Wisdom::AIGuardrail).
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

const GuardrailTopicConfigSchema = z.object({
  Name: z.string().min(1).max(100).regex(new RegExp("^[0-9a-zA-Z-_ !?.]+$"))
    .describe("Name of topic in topic policy"),
  Definition: z.string().min(1).max(200).describe(
    "Definition of topic in topic policy",
  ),
  Examples: z.array(z.string().min(1).max(100)).describe(
    "List of text examples",
  ).optional(),
  Type: z.enum(["DENY"]).describe("Type of topic in a policy"),
});

const GuardrailContentFilterConfigSchema = z.object({
  Type: z.enum([
    "SEXUAL",
    "VIOLENCE",
    "HATE",
    "INSULTS",
    "MISCONDUCT",
    "PROMPT_ATTACK",
  ]).describe("Type of text to text filter in content policy"),
  InputStrength: z.enum(["NONE", "LOW", "MEDIUM", "HIGH"]).describe(
    "Strength for filters",
  ),
  OutputStrength: z.enum(["NONE", "LOW", "MEDIUM", "HIGH"]).describe(
    "Strength for filters",
  ),
});

const GuardrailWordConfigSchema = z.object({
  Text: z.string().min(1).describe("The custom word text."),
});

const GuardrailManagedWordsConfigSchema = z.object({
  Type: z.enum(["PROFANITY"]).describe("Options for managed words."),
});

const GuardrailPiiEntityConfigSchema = z.object({
  Type: z.enum([
    "ADDRESS",
    "AGE",
    "AWS_ACCESS_KEY",
    "AWS_SECRET_KEY",
    "CA_HEALTH_NUMBER",
    "CA_SOCIAL_INSURANCE_NUMBER",
    "CREDIT_DEBIT_CARD_CVV",
    "CREDIT_DEBIT_CARD_EXPIRY",
    "CREDIT_DEBIT_CARD_NUMBER",
    "DRIVER_ID",
    "EMAIL",
    "INTERNATIONAL_BANK_ACCOUNT_NUMBER",
    "IP_ADDRESS",
    "LICENSE_PLATE",
    "MAC_ADDRESS",
    "NAME",
    "PASSWORD",
    "PHONE",
    "PIN",
    "SWIFT_CODE",
    "UK_NATIONAL_HEALTH_SERVICE_NUMBER",
    "UK_NATIONAL_INSURANCE_NUMBER",
    "UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER",
    "URL",
    "USERNAME",
    "US_BANK_ACCOUNT_NUMBER",
    "US_BANK_ROUTING_NUMBER",
    "US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER",
    "US_PASSPORT_NUMBER",
    "US_SOCIAL_SECURITY_NUMBER",
    "VEHICLE_IDENTIFICATION_NUMBER",
  ]).describe("The currently supported PII entities"),
  Action: z.enum(["BLOCK", "ANONYMIZE"]).describe(
    "Options for sensitive information action.",
  ),
});

const GuardrailRegexConfigSchema = z.object({
  Name: z.string().min(1).max(100).describe("The regex name."),
  Description: z.string().min(1).max(1000).describe("The regex description.")
    .optional(),
  Pattern: z.string().min(1).describe("The regex pattern."),
  Action: z.enum(["BLOCK", "ANONYMIZE"]).describe(
    "Options for sensitive information action.",
  ),
});

const GuardrailContextualGroundingFilterConfigSchema = z.object({
  Type: z.enum(["GROUNDING", "RELEVANCE"]).describe(
    "Type of contextual grounding filter",
  ),
  Threshold: z.number().min(0).describe("The threshold for this filter."),
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
  AssistantId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$|^arn:[a-z-]*?:wisdom:[a-z0-9-]*?:[0-9]{12}:[a-z-]*?/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(?:/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}){0,2}$",
    ),
  ),
  Name: z.string().min(1).max(255).regex(new RegExp("^[a-zA-Z0-9\\s_.,-]+"))
    .optional(),
  BlockedInputMessaging: z.string().min(1).max(500).describe(
    "Messaging for when violations are detected in text",
  ),
  BlockedOutputsMessaging: z.string().min(1).max(500).describe(
    "Messaging for when violations are detected in text",
  ),
  Description: z.string().min(1).max(200).describe(
    "Description of the guardrail or its version",
  ).optional(),
  TopicPolicyConfig: z.object({
    TopicsConfig: z.array(GuardrailTopicConfigSchema).describe(
      "List of topic configs in topic policy.",
    ),
  }).describe("Topic policy config for a guardrail.").optional(),
  ContentPolicyConfig: z.object({
    FiltersConfig: z.array(GuardrailContentFilterConfigSchema).describe(
      "List of content filter configs in content policy.",
    ),
  }).describe("Content policy config for a guardrail.").optional(),
  WordPolicyConfig: z.object({
    WordsConfig: z.array(GuardrailWordConfigSchema).describe(
      "List of custom word configs.",
    ).optional(),
    ManagedWordListsConfig: z.array(GuardrailManagedWordsConfigSchema).describe(
      "A config for the list of managed words.",
    ).optional(),
  }).describe("Word policy config for a guardrail.").optional(),
  SensitiveInformationPolicyConfig: z.object({
    PiiEntitiesConfig: z.array(GuardrailPiiEntityConfigSchema).describe(
      "List of entities.",
    ).optional(),
    RegexesConfig: z.array(GuardrailRegexConfigSchema).describe(
      "List of regex.",
    ).optional(),
  }).describe("Sensitive information policy config for a guardrail.")
    .optional(),
  ContextualGroundingPolicyConfig: z.object({
    FiltersConfig: z.array(GuardrailContextualGroundingFilterConfigSchema)
      .describe("List of contextual grounding filter configs."),
  }).describe("Contextual grounding policy config for a guardrail.").optional(),
  Tags: z.record(z.string(), z.string().min(1).max(256)).optional(),
});

const StateSchema = z.object({
  AssistantId: z.string(),
  AssistantArn: z.string().optional(),
  AIGuardrailArn: z.string().optional(),
  AIGuardrailId: z.string(),
  Name: z.string().optional(),
  BlockedInputMessaging: z.string().optional(),
  BlockedOutputsMessaging: z.string().optional(),
  Description: z.string().optional(),
  TopicPolicyConfig: z.object({
    TopicsConfig: z.array(GuardrailTopicConfigSchema),
  }).optional(),
  ContentPolicyConfig: z.object({
    FiltersConfig: z.array(GuardrailContentFilterConfigSchema),
  }).optional(),
  WordPolicyConfig: z.object({
    WordsConfig: z.array(GuardrailWordConfigSchema),
    ManagedWordListsConfig: z.array(GuardrailManagedWordsConfigSchema),
  }).optional(),
  SensitiveInformationPolicyConfig: z.object({
    PiiEntitiesConfig: z.array(GuardrailPiiEntityConfigSchema),
    RegexesConfig: z.array(GuardrailRegexConfigSchema),
  }).optional(),
  ContextualGroundingPolicyConfig: z.object({
    FiltersConfig: z.array(GuardrailContextualGroundingFilterConfigSchema),
  }).optional(),
  ModifiedTimeSeconds: z.number().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AssistantId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$|^arn:[a-z-]*?:wisdom:[a-z0-9-]*?:[0-9]{12}:[a-z-]*?/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(?:/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}){0,2}$",
    ),
  ).optional(),
  Name: z.string().min(1).max(255).regex(new RegExp("^[a-zA-Z0-9\\s_.,-]+"))
    .optional(),
  BlockedInputMessaging: z.string().min(1).max(500).describe(
    "Messaging for when violations are detected in text",
  ).optional(),
  BlockedOutputsMessaging: z.string().min(1).max(500).describe(
    "Messaging for when violations are detected in text",
  ).optional(),
  Description: z.string().min(1).max(200).describe(
    "Description of the guardrail or its version",
  ).optional(),
  TopicPolicyConfig: z.object({
    TopicsConfig: z.array(GuardrailTopicConfigSchema).describe(
      "List of topic configs in topic policy.",
    ).optional(),
  }).describe("Topic policy config for a guardrail.").optional(),
  ContentPolicyConfig: z.object({
    FiltersConfig: z.array(GuardrailContentFilterConfigSchema).describe(
      "List of content filter configs in content policy.",
    ).optional(),
  }).describe("Content policy config for a guardrail.").optional(),
  WordPolicyConfig: z.object({
    WordsConfig: z.array(GuardrailWordConfigSchema).describe(
      "List of custom word configs.",
    ).optional(),
    ManagedWordListsConfig: z.array(GuardrailManagedWordsConfigSchema).describe(
      "A config for the list of managed words.",
    ).optional(),
  }).describe("Word policy config for a guardrail.").optional(),
  SensitiveInformationPolicyConfig: z.object({
    PiiEntitiesConfig: z.array(GuardrailPiiEntityConfigSchema).describe(
      "List of entities.",
    ).optional(),
    RegexesConfig: z.array(GuardrailRegexConfigSchema).describe(
      "List of regex.",
    ).optional(),
  }).describe("Sensitive information policy config for a guardrail.")
    .optional(),
  ContextualGroundingPolicyConfig: z.object({
    FiltersConfig: z.array(GuardrailContextualGroundingFilterConfigSchema)
      .describe("List of contextual grounding filter configs.").optional(),
  }).describe("Contextual grounding policy config for a guardrail.").optional(),
  Tags: z.record(z.string(), z.string().min(1).max(256)).optional(),
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

/** Swamp extension model for Wisdom AIGuardrail. Registered at `@swamp/aws/wisdom/aiguardrail`. */
export const model = {
  type: "@swamp/aws/wisdom/aiguardrail",
  version: "2026.06.15.2",
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
    {
      toVersion: "2026.06.15.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Wisdom AIGuardrail resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Wisdom AIGuardrail",
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
          "AWS::Wisdom::AIGuardrail",
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
      description: "Get a Wisdom AIGuardrail",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Wisdom AIGuardrail",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Wisdom::AIGuardrail",
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
      description: "Update a Wisdom AIGuardrail",
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
        const idParts = [
          existing.AIGuardrailId?.toString(),
          existing.AssistantId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::Wisdom::AIGuardrail",
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
          "AWS::Wisdom::AIGuardrail",
          identifier,
          currentState,
          desiredState,
          ["AssistantId", "Name", "Tags"],
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
      description: "Delete a Wisdom AIGuardrail",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Wisdom AIGuardrail",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Wisdom::AIGuardrail",
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
      description: "Sync Wisdom AIGuardrail state from AWS",
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
        const idParts = [
          existing.AIGuardrailId?.toString(),
          existing.AssistantId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::Wisdom::AIGuardrail",
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
