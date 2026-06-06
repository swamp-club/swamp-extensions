// Auto-generated extension model for @swamp/aws/logs/transformer
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Logs Transformer (AWS::Logs::Transformer).
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

const ParseCloudfrontSchema = z.object({
  Source: z.string().regex(new RegExp("^.*[a-zA-Z0-9]+.*$")).optional(),
});

const ParseVPCSchema = z.object({
  Source: z.string().regex(new RegExp("^.*[a-zA-Z0-9]+.*$")).optional(),
});

const ParseWAFSchema = z.object({
  Source: z.string().regex(new RegExp("^.*[a-zA-Z0-9]+.*$")).optional(),
});

const ParseRoute53Schema = z.object({
  Source: z.string().regex(new RegExp("^.*[a-zA-Z0-9]+.*$")).optional(),
});

const ParsePostgresSchema = z.object({
  Source: z.string().regex(new RegExp("^.*[a-zA-Z0-9]+.*$")).optional(),
});

const ParseToOCSFSchema = z.object({
  Source: z.string().regex(new RegExp("^.*[a-zA-Z0-9]+.*$")).optional(),
  EventSource: z.enum([
    "CloudTrail",
    "Route53Resolver",
    "VPCFlow",
    "EKSAudit",
    "AWSWAF",
  ]),
  OcsfVersion: z.enum(["V1.1", "V1.5"]),
  MappingVersion: z.string().min(1).max(10).regex(
    new RegExp("^v\\d+\\.\\d+(\\.\\d+)?$"),
  ).optional(),
});

const CopyValueEntrySchema = z.object({
  Source: z.string().regex(new RegExp("^.*[a-zA-Z0-9]+.*$")),
  Target: z.string().max(128).regex(new RegExp("^.*[a-zA-Z0-9]+.*$")),
  OverwriteIfExists: z.boolean().optional(),
});

const AddKeyEntrySchema = z.object({
  Key: z.string().max(128).regex(new RegExp("^.*[a-zA-Z0-9]+.*$")),
  Value: z.string().min(1).max(256),
  OverwriteIfExists: z.boolean().optional(),
});

const MoveKeyEntrySchema = z.object({
  Source: z.string().regex(new RegExp("^.*[a-zA-Z0-9]+.*$")),
  Target: z.string().regex(new RegExp("^.*[a-zA-Z0-9]+.*$")),
  OverwriteIfExists: z.boolean().optional(),
});

const RenameKeyEntrySchema = z.object({
  Key: z.string().regex(new RegExp("^.*[a-zA-Z0-9]+.*$")),
  RenameTo: z.string().regex(new RegExp("^.*[a-zA-Z0-9]+.*$")),
  OverwriteIfExists: z.boolean().optional(),
});

const SplitStringEntrySchema = z.object({
  Source: z.string().regex(new RegExp("^.*[a-zA-Z0-9]+.*$")),
  Delimiter: z.string().max(128),
});

const SubstituteStringEntrySchema = z.object({
  Source: z.string().regex(new RegExp("^.*[a-zA-Z0-9]+.*$")),
  From: z.string().max(128),
  To: z.string().max(128),
});

const TypeConverterEntrySchema = z.object({
  Key: z.string().regex(new RegExp("^.*[a-zA-Z0-9]+.*$")),
  Type: z.enum(["boolean", "integer", "double", "string"]),
});

const ProcessorSchema = z.object({
  ParseCloudfront: ParseCloudfrontSchema.optional(),
  ParseVPC: ParseVPCSchema.optional(),
  ParseWAF: ParseWAFSchema.optional(),
  ParseJSON: z.object({
    Source: z.string().optional(),
    Destination: z.string().max(128).regex(new RegExp("^.*[a-zA-Z0-9]+.*$"))
      .optional(),
  }).optional(),
  ParseRoute53: ParseRoute53Schema.optional(),
  ParsePostgres: ParsePostgresSchema.optional(),
  ParseToOCSF: ParseToOCSFSchema.optional(),
  ParseKeyValue: z.object({
    Source: z.string().regex(new RegExp("^.*[a-zA-Z0-9]+.*$")).optional(),
    Destination: z.string().regex(new RegExp("^.*[a-zA-Z0-9]+.*$")).optional(),
    FieldDelimiter: z.string().optional(),
    KeyValueDelimiter: z.string().optional(),
    KeyPrefix: z.string().regex(new RegExp("^.*[a-zA-Z0-9]+.*$")).optional(),
    NonMatchValue: z.string().regex(new RegExp("^.*[a-zA-Z0-9]+.*$"))
      .optional(),
    OverwriteIfExists: z.boolean().optional(),
  }).optional(),
  CopyValue: z.object({
    Entries: z.array(CopyValueEntrySchema),
  }).optional(),
  Csv: z.object({
    QuoteCharacter: z.string().max(1).optional(),
    Delimiter: z.string().max(2).optional(),
    Source: z.string().optional(),
    Columns: z.array(
      z.string().max(128).regex(new RegExp("^.*[a-zA-Z0-9]+.*$")),
    ).optional(),
  }).optional(),
  DateTimeConverter: z.object({
    Source: z.string().regex(new RegExp("^.*[a-zA-Z0-9]+.*$")),
    Target: z.string().max(128).regex(new RegExp("^.*[a-zA-Z0-9]+.*$")),
    TargetFormat: z.string().optional(),
    MatchPatterns: z.array(z.string().regex(new RegExp("^.*[a-zA-Z0-9]+.*$"))),
    SourceTimezone: z.string().optional(),
    TargetTimezone: z.string().optional(),
    Locale: z.string().optional(),
  }).optional(),
  DeleteKeys: z.object({
    WithKeys: z.array(z.string().min(1).max(128)),
  }).optional(),
  Grok: z.object({
    Source: z.string().regex(new RegExp("^.*[a-zA-Z0-9]+.*$")).optional(),
    Match: z.string().max(512),
  }).optional(),
  ListToMap: z.object({
    Source: z.string().regex(new RegExp("^.*[a-zA-Z0-9]+.*$")),
    Key: z.string().regex(new RegExp("^.*[a-zA-Z0-9]+.*$")),
    ValueKey: z.string().regex(new RegExp("^.*[a-zA-Z0-9]+.*$")).optional(),
    Target: z.string().max(128).regex(new RegExp("^.*[a-zA-Z0-9]+.*$"))
      .optional(),
    Flatten: z.boolean().optional(),
    FlattenedElement: z.enum(["first", "last"]).optional(),
  }).optional(),
  AddKeys: z.object({
    Entries: z.array(AddKeyEntrySchema),
  }).optional(),
  MoveKeys: z.object({
    Entries: z.array(MoveKeyEntrySchema),
  }).optional(),
  RenameKeys: z.object({
    Entries: z.array(RenameKeyEntrySchema),
  }).optional(),
  LowerCaseString: z.object({
    WithKeys: z.array(z.string().min(1).max(128)),
  }).optional(),
  SplitString: z.object({
    Entries: z.array(SplitStringEntrySchema),
  }).optional(),
  SubstituteString: z.object({
    Entries: z.array(SubstituteStringEntrySchema),
  }).optional(),
  TrimString: z.object({
    WithKeys: z.array(z.string().min(1).max(128)),
  }).optional(),
  UpperCaseString: z.object({
    WithKeys: z.array(z.string().min(1).max(128)),
  }).optional(),
  TypeConverter: z.object({
    Entries: z.array(TypeConverterEntrySchema),
  }).optional(),
});

const GlobalArgsSchema = z.object({
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
  LogGroupIdentifier: z.string().min(1).max(2048).regex(
    new RegExp("[\\w#+=/:,.@-]*"),
  ).describe(
    "Existing log group that you want to associate with this transformer.",
  ),
  TransformerConfig: z.array(ProcessorSchema).describe(
    "List of processors in a transformer",
  ),
});

const StateSchema = z.object({
  LogGroupIdentifier: z.string(),
  TransformerConfig: z.array(ProcessorSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  LogGroupIdentifier: z.string().min(1).max(2048).regex(
    new RegExp("[\\w#+=/:,.@-]*"),
  ).describe(
    "Existing log group that you want to associate with this transformer.",
  ).optional(),
  TransformerConfig: z.array(ProcessorSchema).describe(
    "List of processors in a transformer",
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

/** Swamp extension model for Logs Transformer. Registered at `@swamp/aws/logs/transformer`. */
export const model = {
  type: "@swamp/aws/logs/transformer",
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
      description: "Logs Transformer resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Logs Transformer",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Logs::Transformer",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.LogGroupIdentifier ?? g.LogGroupIdentifier)?.toString() ??
            "current").replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(
              /\0/g,
              "",
            );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a Logs Transformer",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Logs Transformer",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Logs::Transformer",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.LogGroupIdentifier ?? context.globalArgs.LogGroupIdentifier)
            ?.toString() ?? args.identifier).replace(/[\/\\]/g, "_").replace(
              /\.\./g,
              "_",
            ).replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a Logs Transformer",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.LogGroupIdentifier?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.LogGroupIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Logs::Transformer",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Logs::Transformer",
          identifier,
          currentState,
          desiredState,
          ["LogGroupIdentifier"],
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
      description: "Delete a Logs Transformer",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Logs Transformer",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Logs::Transformer",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.LogGroupIdentifier?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync Logs Transformer state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.LogGroupIdentifier?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.LogGroupIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Logs::Transformer",
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
