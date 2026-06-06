// Auto-generated extension model for @swamp/aws/b2bi/partnership
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for B2BI Partnership (AWS::B2BI::Partnership).
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

const X12InterchangeControlHeadersSchema = z.object({
  SenderIdQualifier: z.string().min(2).max(2).regex(
    new RegExp("^[a-zA-Z0-9]*$"),
  ).optional(),
  SenderId: z.string().min(15).max(15).regex(new RegExp("^[a-zA-Z0-9 ]*$"))
    .optional(),
  ReceiverIdQualifier: z.string().min(2).max(2).regex(
    new RegExp("^[a-zA-Z0-9]*$"),
  ).optional(),
  ReceiverId: z.string().min(15).max(15).regex(new RegExp("^[a-zA-Z0-9 ]*$"))
    .optional(),
  RepetitionSeparator: z.string().min(1).max(1).optional(),
  AcknowledgmentRequestedCode: z.string().min(1).max(1).regex(
    new RegExp("^[a-zA-Z0-9]*$"),
  ).optional(),
  UsageIndicatorCode: z.string().min(1).max(1).regex(
    new RegExp("^[a-zA-Z0-9]*$"),
  ).optional(),
});

const X12FunctionalGroupHeadersSchema = z.object({
  ApplicationSenderCode: z.string().min(2).max(15).regex(
    new RegExp("^[a-zA-Z0-9 ]*$"),
  ).optional(),
  ApplicationReceiverCode: z.string().min(2).max(15).regex(
    new RegExp("^[a-zA-Z0-9 ]*$"),
  ).optional(),
  ResponsibleAgencyCode: z.string().min(1).max(2).regex(
    new RegExp("^[a-zA-Z0-9]*$"),
  ).optional(),
});

const X12DelimitersSchema = z.object({
  ComponentSeparator: z.string().min(1).max(1).regex(
    new RegExp("^[!&'()*+,\\-./:;?=%@\\[\\]_{}|<>~^`\"]$"),
  ).optional(),
  DataElementSeparator: z.string().min(1).max(1).regex(
    new RegExp("^[!&'()*+,\\-./:;?=%@\\[\\]_{}|<>~^`\"]$"),
  ).optional(),
  SegmentTerminator: z.string().min(1).max(1).regex(
    new RegExp("^[!&'()*+,\\-./:;?=%@\\[\\]_{}|<>~^`\"]$"),
  ).optional(),
});

const X12ControlNumbersSchema = z.object({
  StartingInterchangeControlNumber: z.number().min(1).max(999999999).optional(),
  StartingFunctionalGroupControlNumber: z.number().min(1).max(999999999)
    .optional(),
  StartingTransactionSetControlNumber: z.number().min(1).max(999999999)
    .optional(),
});

const X12OutboundEdiHeadersSchema = z.object({
  InterchangeControlHeaders: X12InterchangeControlHeadersSchema.optional(),
  FunctionalGroupHeaders: X12FunctionalGroupHeadersSchema.optional(),
  Delimiters: X12DelimitersSchema.optional(),
  ValidateEdi: z.boolean().optional(),
  ControlNumbers: X12ControlNumbersSchema.optional(),
  Gs05TimeFormat: z.enum(["HHMM", "HHMMSS", "HHMMSSDD"]).optional(),
});

const WrapOptionsSchema = z.object({
  WrapBy: z.enum(["SEGMENT", "ONE_LINE", "LINE_LENGTH"]).optional(),
  LineTerminator: z.enum(["CRLF", "LF", "CR"]).optional(),
  LineLength: z.number().min(1).optional(),
});

const X12EnvelopeSchema = z.object({
  Common: X12OutboundEdiHeadersSchema.optional(),
  WrapOptions: WrapOptionsSchema.optional(),
});

const X12AcknowledgmentOptionsSchema = z.object({
  FunctionalAcknowledgment: z.enum([
    "DO_NOT_GENERATE",
    "GENERATE_ALL_SEGMENTS",
    "GENERATE_WITHOUT_TRANSACTION_SET_RESPONSE_LOOP",
  ]),
  TechnicalAcknowledgment: z.enum(["DO_NOT_GENERATE", "GENERATE_ALL_SEGMENTS"]),
});

const X12InboundEdiOptionsSchema = z.object({
  AcknowledgmentOptions: X12AcknowledgmentOptionsSchema.optional(),
});

const InboundEdiOptionsSchema = z.object({
  X12: X12InboundEdiOptionsSchema.optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
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
  Capabilities: z.array(
    z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$")),
  ),
  CapabilityOptions: z.object({
    OutboundEdi: z.object({
      X12: X12EnvelopeSchema.optional(),
    }).optional(),
    InboundEdi: InboundEdiOptionsSchema.optional(),
  }).optional(),
  Email: z.string().min(5).max(254).regex(
    new RegExp("^[\\w\\.\\-]+@[\\w\\.\\-]+$"),
  ),
  Name: z.string().min(1).max(254),
  Phone: z.string().min(7).max(22).regex(
    new RegExp(
      "^\\+?([0-9 \\t\\-()\\/]{7,})(?:\\s*(?:#|x\\.?|ext\\.?|extension) \\t*(\\d+))?$",
    ),
  ).optional(),
  ProfileId: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$")),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  Capabilities: z.array(z.string()).optional(),
  CapabilityOptions: z.object({
    OutboundEdi: z.object({
      X12: X12EnvelopeSchema,
    }),
    InboundEdi: InboundEdiOptionsSchema,
  }).optional(),
  CreatedAt: z.string().optional(),
  Email: z.string().optional(),
  ModifiedAt: z.string().optional(),
  Name: z.string().optional(),
  PartnershipArn: z.string().optional(),
  PartnershipId: z.string(),
  Phone: z.string().optional(),
  ProfileId: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  TradingPartnerId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Capabilities: z.array(
    z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$")),
  ).optional(),
  CapabilityOptions: z.object({
    OutboundEdi: z.object({
      X12: X12EnvelopeSchema.optional(),
    }).optional(),
    InboundEdi: InboundEdiOptionsSchema.optional(),
  }).optional(),
  Email: z.string().min(5).max(254).regex(
    new RegExp("^[\\w\\.\\-]+@[\\w\\.\\-]+$"),
  ).optional(),
  Name: z.string().min(1).max(254).optional(),
  Phone: z.string().min(7).max(22).regex(
    new RegExp(
      "^\\+?([0-9 \\t\\-()\\/]{7,})(?:\\s*(?:#|x\\.?|ext\\.?|extension) \\t*(\\d+))?$",
    ),
  ).optional(),
  ProfileId: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .optional(),
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

/** Swamp extension model for B2BI Partnership. Registered at `@swamp/aws/b2bi/partnership`. */
export const model = {
  type: "@swamp/aws/b2bi/partnership",
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
      description: "B2BI Partnership resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a B2BI Partnership",
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
          "AWS::B2BI::Partnership",
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
      description: "Get a B2BI Partnership",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the B2BI Partnership",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::B2BI::Partnership",
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
      description: "Update a B2BI Partnership",
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
        const identifier = existing.PartnershipId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::B2BI::Partnership",
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
          "AWS::B2BI::Partnership",
          identifier,
          currentState,
          desiredState,
          ["Email", "Phone", "ProfileId"],
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
      description: "Delete a B2BI Partnership",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the B2BI Partnership",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::B2BI::Partnership",
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
      description: "Sync B2BI Partnership state from AWS",
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
        const identifier = existing.PartnershipId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::B2BI::Partnership",
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
