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

// Auto-generated extension model for @swamp/aws/bedrock/guardrail
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Bedrock Guardrail (AWS::Bedrock::Guardrail).
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

const ContentFilterConfigSchema = z.object({
  Type: z.enum([
    "SEXUAL",
    "VIOLENCE",
    "HATE",
    "INSULTS",
    "MISCONDUCT",
    "PROMPT_ATTACK",
  ]).describe("Type of filter in content policy"),
  InputStrength: z.enum(["NONE", "LOW", "MEDIUM", "HIGH"]).describe(
    "Strength for filters",
  ),
  OutputStrength: z.enum(["NONE", "LOW", "MEDIUM", "HIGH"]).describe(
    "Strength for filters",
  ),
  InputModalities: z.array(z.enum(["TEXT", "IMAGE"])).describe(
    "List of modalities",
  ).optional(),
  OutputModalities: z.array(z.enum(["TEXT", "IMAGE"])).describe(
    "List of modalities",
  ).optional(),
  InputAction: z.enum(["BLOCK", "NONE"]).optional(),
  OutputAction: z.enum(["BLOCK", "NONE"]).optional(),
  InputEnabled: z.boolean().optional(),
  OutputEnabled: z.boolean().optional(),
});

const ContextualGroundingFilterConfigSchema = z.object({
  Type: z.enum(["GROUNDING", "RELEVANCE"]).describe(
    "Type of contextual grounding filter",
  ),
  Threshold: z.number().min(0).describe("The threshold for this filter."),
  Action: z.enum(["BLOCK", "NONE"]).optional(),
  Enabled: z.boolean().optional(),
});

const PiiEntityConfigSchema = z.object({
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
  Action: z.enum(["BLOCK", "ANONYMIZE", "NONE"]).describe(
    "Options for sensitive information action.",
  ),
  InputAction: z.enum(["BLOCK", "ANONYMIZE", "NONE"]).describe(
    "Options for sensitive information action.",
  ).optional(),
  OutputAction: z.enum(["BLOCK", "ANONYMIZE", "NONE"]).describe(
    "Options for sensitive information action.",
  ).optional(),
  InputEnabled: z.boolean().optional(),
  OutputEnabled: z.boolean().optional(),
});

const RegexConfigSchema = z.object({
  Name: z.string().min(1).max(100).describe("The regex name."),
  Description: z.string().min(1).max(1000).describe("The regex description.")
    .optional(),
  Pattern: z.string().min(1).describe("The regex pattern."),
  Action: z.enum(["BLOCK", "ANONYMIZE", "NONE"]).describe(
    "Options for sensitive information action.",
  ),
  InputAction: z.enum(["BLOCK", "ANONYMIZE", "NONE"]).describe(
    "Options for sensitive information action.",
  ).optional(),
  OutputAction: z.enum(["BLOCK", "ANONYMIZE", "NONE"]).describe(
    "Options for sensitive information action.",
  ).optional(),
  InputEnabled: z.boolean().optional(),
  OutputEnabled: z.boolean().optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$"))
    .describe("Tag Key"),
  Value: z.string().min(0).max(256).regex(
    new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$"),
  ).describe("Tag Value"),
});

const TopicConfigSchema = z.object({
  Name: z.string().min(1).max(100).regex(new RegExp("^[0-9a-zA-Z-_ !?.]+$"))
    .describe("Name of topic in topic policy"),
  Definition: z.string().min(1).max(1000).describe(
    "Definition of topic in topic policy",
  ),
  Examples: z.array(z.string().min(1).max(100)).describe(
    "List of text examples",
  ).optional(),
  Type: z.enum(["DENY"]).describe("Type of topic in a policy"),
  InputAction: z.enum(["BLOCK", "NONE"]).optional(),
  OutputAction: z.enum(["BLOCK", "NONE"]).optional(),
  InputEnabled: z.boolean().optional(),
  OutputEnabled: z.boolean().optional(),
});

const WordConfigSchema = z.object({
  Text: z.string().min(1).describe("The custom word text."),
  InputAction: z.enum(["BLOCK", "NONE"]).optional(),
  OutputAction: z.enum(["BLOCK", "NONE"]).optional(),
  InputEnabled: z.boolean().optional(),
  OutputEnabled: z.boolean().optional(),
});

const ManagedWordsConfigSchema = z.object({
  Type: z.enum(["PROFANITY"]).describe("Options for managed words."),
  InputAction: z.enum(["BLOCK", "NONE"]).optional(),
  OutputAction: z.enum(["BLOCK", "NONE"]).optional(),
  InputEnabled: z.boolean().optional(),
  OutputEnabled: z.boolean().optional(),
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
  BlockedInputMessaging: z.string().min(1).max(500).describe(
    "Messaging for when violations are detected in text",
  ),
  BlockedOutputsMessaging: z.string().min(1).max(500).describe(
    "Messaging for when violations are detected in text",
  ),
  AutomatedReasoningPolicyConfig: z.object({
    ConfidenceThreshold: z.number().min(0).max(1).describe(
      "The confidence threshold for triggering guardrail actions based on Automated Reasoning policy violations.",
    ).optional(),
    Policies: z.array(
      z.string().min(15).max(2048).regex(
        new RegExp(
          "^arn:aws(-[^:]+)?:bedrock:[a-z0-9-]{1,20}:[0-9]{12}:automated-reasoning-policy\\/[a-z0-9]{12}(:([1-9][0-9]{0,11}))?$",
        ),
      ),
    ).describe(
      "The list of Automated Reasoning policy ARNs to include in the guardrail configuration",
    ),
  }).describe(
    "Optional configuration for integrating Automated Reasoning policies with the guardrail.",
  ).optional(),
  ContentPolicyConfig: z.object({
    FiltersConfig: z.array(ContentFilterConfigSchema).describe(
      "List of content filter configs in content policy.",
    ),
    ContentFiltersTierConfig: z.object({
      TierName: z.enum(["CLASSIC", "STANDARD"]).describe(
        "Tier name for tier configuration in content filters policy",
      ),
    }).describe("Guardrail tier config for content policy").optional(),
  }).describe("Content policy config for a guardrail.").optional(),
  ContextualGroundingPolicyConfig: z.object({
    FiltersConfig: z.array(ContextualGroundingFilterConfigSchema).describe(
      "List of contextual grounding filter configs.",
    ),
  }).describe("Contextual grounding policy config for a guardrail.").optional(),
  CrossRegionConfig: z.object({
    GuardrailProfileArn: z.string().min(15).max(2048).regex(
      new RegExp(
        "^arn:aws(-[^:]+)?:bedrock:[a-z0-9-]{1,20}:[0-9]{12}:guardrail-profile/[a-z0-9-]+[.]{1}guardrail[.]{1}v[0-9:]+$",
      ),
    ).describe("The Amazon Resource Name (ARN) of the guardrail profile"),
  }).describe(
    "The system-defined guardrail profile that you’re using with your guardrail",
  ).optional(),
  Description: z.string().min(1).max(200).describe(
    "Description of the guardrail or its version",
  ).optional(),
  KmsKeyArn: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:aws(-[^:]+)?:kms:[a-zA-Z0-9-]*:[0-9]{12}:key/[a-zA-Z0-9-]{36}$",
    ),
  ).describe("The KMS key with which the guardrail was encrypted at rest")
    .optional(),
  Name: z.string().min(1).max(50).regex(new RegExp("^[0-9a-zA-Z-_]+$"))
    .describe("Name of the guardrail"),
  SensitiveInformationPolicyConfig: z.object({
    PiiEntitiesConfig: z.array(PiiEntityConfigSchema).describe(
      "List of entities.",
    ).optional(),
    RegexesConfig: z.array(RegexConfigSchema).describe("List of regex.")
      .optional(),
  }).describe("Sensitive information policy config for a guardrail.")
    .optional(),
  Tags: z.array(TagSchema).describe("List of Tags").optional(),
  TopicPolicyConfig: z.object({
    TopicsConfig: z.array(TopicConfigSchema).describe(
      "List of topic configs in topic policy.",
    ),
    TopicsTierConfig: z.object({
      TierName: z.enum(["CLASSIC", "STANDARD"]).describe(
        "Tier name for tier configuration in topic policy",
      ),
    }).describe("Guardrail tier config for topic policy").optional(),
  }).describe("Topic policy config for a guardrail.").optional(),
  WordPolicyConfig: z.object({
    WordsConfig: z.array(WordConfigSchema).describe(
      "List of custom word configs.",
    ).optional(),
    ManagedWordListsConfig: z.array(ManagedWordsConfigSchema).describe(
      "A config for the list of managed words.",
    ).optional(),
  }).describe("Word policy config for a guardrail.").optional(),
});

const StateSchema = z.object({
  BlockedInputMessaging: z.string().optional(),
  BlockedOutputsMessaging: z.string().optional(),
  AutomatedReasoningPolicyConfig: z.object({
    ConfidenceThreshold: z.number(),
    Policies: z.array(z.string()),
  }).optional(),
  ContentPolicyConfig: z.object({
    FiltersConfig: z.array(ContentFilterConfigSchema),
    ContentFiltersTierConfig: z.object({
      TierName: z.string(),
    }),
  }).optional(),
  ContextualGroundingPolicyConfig: z.object({
    FiltersConfig: z.array(ContextualGroundingFilterConfigSchema),
  }).optional(),
  CreatedAt: z.string().optional(),
  CrossRegionConfig: z.object({
    GuardrailProfileArn: z.string(),
  }).optional(),
  Description: z.string().optional(),
  FailureRecommendations: z.array(z.string()).optional(),
  GuardrailArn: z.string(),
  GuardrailId: z.string().optional(),
  KmsKeyArn: z.string().optional(),
  Name: z.string().optional(),
  SensitiveInformationPolicyConfig: z.object({
    PiiEntitiesConfig: z.array(PiiEntityConfigSchema),
    RegexesConfig: z.array(RegexConfigSchema),
  }).optional(),
  Status: z.string().optional(),
  StatusReasons: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).optional(),
  TopicPolicyConfig: z.object({
    TopicsConfig: z.array(TopicConfigSchema),
    TopicsTierConfig: z.object({
      TierName: z.string(),
    }),
  }).optional(),
  UpdatedAt: z.string().optional(),
  Version: z.string().optional(),
  WordPolicyConfig: z.object({
    WordsConfig: z.array(WordConfigSchema),
    ManagedWordListsConfig: z.array(ManagedWordsConfigSchema),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  BlockedInputMessaging: z.string().min(1).max(500).describe(
    "Messaging for when violations are detected in text",
  ).optional(),
  BlockedOutputsMessaging: z.string().min(1).max(500).describe(
    "Messaging for when violations are detected in text",
  ).optional(),
  AutomatedReasoningPolicyConfig: z.object({
    ConfidenceThreshold: z.number().min(0).max(1).describe(
      "The confidence threshold for triggering guardrail actions based on Automated Reasoning policy violations.",
    ).optional(),
    Policies: z.array(
      z.string().min(15).max(2048).regex(
        new RegExp(
          "^arn:aws(-[^:]+)?:bedrock:[a-z0-9-]{1,20}:[0-9]{12}:automated-reasoning-policy\\/[a-z0-9]{12}(:([1-9][0-9]{0,11}))?$",
        ),
      ),
    ).describe(
      "The list of Automated Reasoning policy ARNs to include in the guardrail configuration",
    ).optional(),
  }).describe(
    "Optional configuration for integrating Automated Reasoning policies with the guardrail.",
  ).optional(),
  ContentPolicyConfig: z.object({
    FiltersConfig: z.array(ContentFilterConfigSchema).describe(
      "List of content filter configs in content policy.",
    ).optional(),
    ContentFiltersTierConfig: z.object({
      TierName: z.enum(["CLASSIC", "STANDARD"]).describe(
        "Tier name for tier configuration in content filters policy",
      ).optional(),
    }).describe("Guardrail tier config for content policy").optional(),
  }).describe("Content policy config for a guardrail.").optional(),
  ContextualGroundingPolicyConfig: z.object({
    FiltersConfig: z.array(ContextualGroundingFilterConfigSchema).describe(
      "List of contextual grounding filter configs.",
    ).optional(),
  }).describe("Contextual grounding policy config for a guardrail.").optional(),
  CrossRegionConfig: z.object({
    GuardrailProfileArn: z.string().min(15).max(2048).regex(
      new RegExp(
        "^arn:aws(-[^:]+)?:bedrock:[a-z0-9-]{1,20}:[0-9]{12}:guardrail-profile/[a-z0-9-]+[.]{1}guardrail[.]{1}v[0-9:]+$",
      ),
    ).describe("The Amazon Resource Name (ARN) of the guardrail profile")
      .optional(),
  }).describe(
    "The system-defined guardrail profile that you’re using with your guardrail",
  ).optional(),
  Description: z.string().min(1).max(200).describe(
    "Description of the guardrail or its version",
  ).optional(),
  KmsKeyArn: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:aws(-[^:]+)?:kms:[a-zA-Z0-9-]*:[0-9]{12}:key/[a-zA-Z0-9-]{36}$",
    ),
  ).describe("The KMS key with which the guardrail was encrypted at rest")
    .optional(),
  Name: z.string().min(1).max(50).regex(new RegExp("^[0-9a-zA-Z-_]+$"))
    .describe("Name of the guardrail").optional(),
  SensitiveInformationPolicyConfig: z.object({
    PiiEntitiesConfig: z.array(PiiEntityConfigSchema).describe(
      "List of entities.",
    ).optional(),
    RegexesConfig: z.array(RegexConfigSchema).describe("List of regex.")
      .optional(),
  }).describe("Sensitive information policy config for a guardrail.")
    .optional(),
  Tags: z.array(TagSchema).describe("List of Tags").optional(),
  TopicPolicyConfig: z.object({
    TopicsConfig: z.array(TopicConfigSchema).describe(
      "List of topic configs in topic policy.",
    ).optional(),
    TopicsTierConfig: z.object({
      TierName: z.enum(["CLASSIC", "STANDARD"]).describe(
        "Tier name for tier configuration in topic policy",
      ).optional(),
    }).describe("Guardrail tier config for topic policy").optional(),
  }).describe("Topic policy config for a guardrail.").optional(),
  WordPolicyConfig: z.object({
    WordsConfig: z.array(WordConfigSchema).describe(
      "List of custom word configs.",
    ).optional(),
    ManagedWordListsConfig: z.array(ManagedWordsConfigSchema).describe(
      "A config for the list of managed words.",
    ).optional(),
  }).describe("Word policy config for a guardrail.").optional(),
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

/** Swamp extension model for Bedrock Guardrail. Registered at `@swamp/aws/bedrock/guardrail`. */
export const model = {
  type: "@swamp/aws/bedrock/guardrail",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Bedrock Guardrail resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Bedrock Guardrail",
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
          "AWS::Bedrock::Guardrail",
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
      description: "Get a Bedrock Guardrail",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Bedrock Guardrail",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Bedrock::Guardrail",
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
      description: "Update a Bedrock Guardrail",
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
        const identifier = existing.GuardrailArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Bedrock::Guardrail",
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
          "AWS::Bedrock::Guardrail",
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
      description: "Delete a Bedrock Guardrail",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Bedrock Guardrail",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Bedrock::Guardrail",
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
      description: "Sync Bedrock Guardrail state from AWS",
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
        const identifier = existing.GuardrailArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Bedrock::Guardrail",
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
