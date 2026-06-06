// Auto-generated extension model for @swamp/aws/appsync/domain-name
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for AppSync DomainName (AWS::AppSync::DomainName).
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

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[ a-zA-Z+-=._:/]+$"),
  ).describe(
    "A string used to identify this tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).regex(new RegExp("^[\\s\\w+-=\\.:/@]*$"))
    .describe(
      "A string containing the value for this tag. You can specify a maximum of 256 characters for a tag value.",
    ),
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
  DomainName: z.string().min(1).max(253).regex(
    new RegExp("^(\\*[a-z\\d-]*\\.)?([a-z\\d-]+\\.)+[a-z\\d-]+$"),
  ),
  Description: z.string().min(0).max(255).optional(),
  CertificateArn: z.string().min(3).max(2048).regex(
    new RegExp(
      "^arn:[a-z-]*:acm:[a-z0-9-]*:\\d{12}:certificate/[0-9A-Za-z_/-]*$",
    ),
  ),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this Domain Name.",
  ).optional(),
});

const StateSchema = z.object({
  DomainName: z.string(),
  Description: z.string().optional(),
  CertificateArn: z.string().optional(),
  AppSyncDomainName: z.string().optional(),
  HostedZoneId: z.string().optional(),
  DomainNameArn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DomainName: z.string().min(1).max(253).regex(
    new RegExp("^(\\*[a-z\\d-]*\\.)?([a-z\\d-]+\\.)+[a-z\\d-]+$"),
  ).optional(),
  Description: z.string().min(0).max(255).optional(),
  CertificateArn: z.string().min(3).max(2048).regex(
    new RegExp(
      "^arn:[a-z-]*:acm:[a-z0-9-]*:\\d{12}:certificate/[0-9A-Za-z_/-]*$",
    ),
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this Domain Name.",
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

/** Swamp extension model for AppSync DomainName. Registered at `@swamp/aws/appsync/domain-name`. */
export const model = {
  type: "@swamp/aws/appsync/domain-name",
  version: "2026.06.06.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
      description: "AppSync DomainName resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AppSync DomainName",
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
          "AWS::AppSync::DomainName",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.DomainName ?? g.DomainName)?.toString() ?? "current")
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a AppSync DomainName",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppSync DomainName",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::AppSync::DomainName",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.DomainName ?? context.globalArgs.DomainName)?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a AppSync DomainName",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.DomainName?.toString() ?? "current").replace(
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
        const identifier = existing.DomainName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::AppSync::DomainName",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::AppSync::DomainName",
          identifier,
          currentState,
          desiredState,
          ["DomainName", "CertificateArn"],
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
      description: "Delete a AppSync DomainName",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppSync DomainName",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::AppSync::DomainName",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.DomainName?.toString() ?? args.identifier)
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
      description: "Sync AppSync DomainName state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.DomainName?.toString() ?? "current").replace(
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
        const identifier = existing.DomainName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::AppSync::DomainName",
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
