// Auto-generated extension model for @swamp/aws/bedrockagentcore/payment-connector
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for BedrockAgentCore PaymentConnector (AWS::BedrockAgentCore::PaymentConnector).
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

const PaymentCredentialProviderConfigurationSchema = z.object({
  CredentialProviderArn: z.string().describe(
    "The ARN of the payment credential provider",
  ),
});

const CredentialsProviderConfigurationSchema = z.object({
  CoinbaseCDP: PaymentCredentialProviderConfigurationSchema.optional(),
  StripePrivy: PaymentCredentialProviderConfigurationSchema.optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  PaymentManagerId: z.string().regex(
    new RegExp("^([0-9a-z][-]?){1,100}-[0-9a-z]{10}$"),
  ).describe("The identifier of the parent payment manager"),
  ConnectorName: z.string().regex(new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,47}$"))
    .describe("The name of the payment connector"),
  Description: z.string().min(1).max(4096).regex(
    new RegExp("^[a-zA-Z0-9\\s]+$"),
  ).describe("A description of the payment connector").optional(),
  ConnectorType: z.enum(["CoinbaseCDP", "StripePrivy"]),
  CredentialProviderConfigurations: z.array(
    CredentialsProviderConfigurationSchema,
  ).describe("The credential provider configurations for the connector"),
});

const StateSchema = z.object({
  PaymentManagerId: z.string().optional(),
  PaymentConnectorId: z.string().optional(),
  PaymentConnectorArn: z.string(),
  ConnectorName: z.string().optional(),
  Description: z.string().optional(),
  ConnectorType: z.string().optional(),
  CredentialProviderConfigurations: z.array(
    CredentialsProviderConfigurationSchema,
  ).optional(),
  ConnectorStatus: z.string().optional(),
  ConnectorCreatedAt: z.string().optional(),
  ConnectorLastUpdatedAt: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  PaymentManagerId: z.string().regex(
    new RegExp("^([0-9a-z][-]?){1,100}-[0-9a-z]{10}$"),
  ).describe("The identifier of the parent payment manager").optional(),
  ConnectorName: z.string().regex(new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,47}$"))
    .describe("The name of the payment connector").optional(),
  Description: z.string().min(1).max(4096).regex(
    new RegExp("^[a-zA-Z0-9\\s]+$"),
  ).describe("A description of the payment connector").optional(),
  ConnectorType: z.enum(["CoinbaseCDP", "StripePrivy"]).optional(),
  CredentialProviderConfigurations: z.array(
    CredentialsProviderConfigurationSchema,
  ).describe("The credential provider configurations for the connector")
    .optional(),
});

/** Swamp extension model for BedrockAgentCore PaymentConnector. Registered at `@swamp/aws/bedrockagentcore/payment-connector`. */
export const model = {
  type: "@swamp/aws/bedrockagentcore/payment-connector",
  version: "2026.06.03.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "BedrockAgentCore PaymentConnector resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a BedrockAgentCore PaymentConnector",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::BedrockAgentCore::PaymentConnector",
          desiredState,
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
      description: "Get a BedrockAgentCore PaymentConnector",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore PaymentConnector",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::BedrockAgentCore::PaymentConnector",
          args.identifier,
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
      description: "Update a BedrockAgentCore PaymentConnector",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const identifier = existing.PaymentConnectorArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::BedrockAgentCore::PaymentConnector",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::BedrockAgentCore::PaymentConnector",
          identifier,
          currentState,
          desiredState,
          ["PaymentManagerId", "ConnectorName"],
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
      description: "Delete a BedrockAgentCore PaymentConnector",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore PaymentConnector",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::BedrockAgentCore::PaymentConnector",
          args.identifier,
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
      description: "Sync BedrockAgentCore PaymentConnector state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const identifier = existing.PaymentConnectorArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::BedrockAgentCore::PaymentConnector",
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
