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

// Auto-generated extension model for @swamp/aws/ses/mail-manager-ingress-point
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SES MailManagerIngressPoint (AWS::SES::MailManagerIngressPoint).
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

const TrustStoreSchema = z.object({
  CAContent: z.string().min(1).max(500000).regex(new RegExp("^[\\P{C}\\s]*$")),
  CrlContent: z.string().min(1).max(500000).regex(new RegExp("^[\\P{C}\\s]*$"))
    .optional(),
  KmsKeyArn: z.string().regex(
    new RegExp(
      "^arn:(aws|aws-cn|aws-us-gov|aws-eusc):kms:[a-z0-9-]+:\\d{12}:(key|alias)/[a-zA-Z0-9/_-]+$",
    ),
  ).optional(),
});

const TlsAuthConfigurationSchema = z.object({
  TrustStore: TrustStoreSchema,
});

const PublicNetworkConfigurationSchema = z.object({
  IpType: z.unknown(),
});

const PrivateNetworkConfigurationSchema = z.object({
  VpcEndpointId: z.string().regex(new RegExp("^vpce-[a-zA-Z0-9]{17}$")),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^[a-zA-Z0-9/_\\+=\\.:@\\-]+$"),
  ),
  Value: z.string().min(0).max(256).regex(
    new RegExp("^[a-zA-Z0-9/_\\+=\\.:@\\-]*$"),
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
  TrafficPolicyId: z.string().min(1).max(100),
  IngressPointConfiguration: z.object({
    SmtpPassword: z.string().min(8).max(64).regex(
      new RegExp("^[A-Za-z0-9!@#$%^&*()_+\\-=\\[\\]{}|.,?]+$"),
    ).optional(),
    SecretArn: z.string().regex(
      new RegExp(
        "^arn:(aws|aws-cn|aws-us-gov|aws-eusc):secretsmanager:[a-z0-9-]+:\\d{12}:secret:[a-zA-Z0-9/_+=,.@-]+$",
      ),
    ).optional(),
    TlsAuthConfiguration: TlsAuthConfigurationSchema.optional(),
  }).optional(),
  IngressPointName: z.string().min(3).max(63).regex(
    new RegExp("^[A-Za-z0-9_\\-]+$"),
  ).optional(),
  NetworkConfiguration: z.object({
    PublicNetworkConfiguration: PublicNetworkConfigurationSchema.optional(),
    PrivateNetworkConfiguration: PrivateNetworkConfigurationSchema.optional(),
  }).optional(),
  RuleSetId: z.string().min(1).max(100),
  StatusToUpdate: z.enum(["ACTIVE", "CLOSED"]).optional(),
  Tags: z.array(TagSchema).optional(),
  TlsPolicy: z.enum(["REQUIRED", "OPTIONAL", "FIPS"]).optional(),
  Type: z.enum(["OPEN", "AUTH", "MTLS"]),
});

const StateSchema = z.object({
  ARecord: z.string().optional(),
  TrafficPolicyId: z.string().optional(),
  IngressPointConfiguration: z.object({
    SmtpPassword: z.string(),
    SecretArn: z.string(),
    TlsAuthConfiguration: TlsAuthConfigurationSchema,
  }).optional(),
  IngressPointArn: z.string().optional(),
  IngressPointId: z.string(),
  IngressPointName: z.string().optional(),
  NetworkConfiguration: z.object({
    PublicNetworkConfiguration: PublicNetworkConfigurationSchema,
    PrivateNetworkConfiguration: PrivateNetworkConfigurationSchema,
  }).optional(),
  RuleSetId: z.string().optional(),
  Status: z.string().optional(),
  StatusToUpdate: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  TlsPolicy: z.string().optional(),
  Type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  TrafficPolicyId: z.string().min(1).max(100).optional(),
  IngressPointConfiguration: z.object({
    SmtpPassword: z.string().min(8).max(64).regex(
      new RegExp("^[A-Za-z0-9!@#$%^&*()_+\\-=\\[\\]{}|.,?]+$"),
    ).optional(),
    SecretArn: z.string().regex(
      new RegExp(
        "^arn:(aws|aws-cn|aws-us-gov|aws-eusc):secretsmanager:[a-z0-9-]+:\\d{12}:secret:[a-zA-Z0-9/_+=,.@-]+$",
      ),
    ).optional(),
    TlsAuthConfiguration: TlsAuthConfigurationSchema.optional(),
  }).optional(),
  IngressPointName: z.string().min(3).max(63).regex(
    new RegExp("^[A-Za-z0-9_\\-]+$"),
  ).optional(),
  NetworkConfiguration: z.object({
    PublicNetworkConfiguration: PublicNetworkConfigurationSchema.optional(),
    PrivateNetworkConfiguration: PrivateNetworkConfigurationSchema.optional(),
  }).optional(),
  RuleSetId: z.string().min(1).max(100).optional(),
  StatusToUpdate: z.enum(["ACTIVE", "CLOSED"]).optional(),
  Tags: z.array(TagSchema).optional(),
  TlsPolicy: z.enum(["REQUIRED", "OPTIONAL", "FIPS"]).optional(),
  Type: z.enum(["OPEN", "AUTH", "MTLS"]).optional(),
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

/** Swamp extension model for SES MailManagerIngressPoint. Registered at `@swamp/aws/ses/mail-manager-ingress-point`. */
export const model = {
  type: "@swamp/aws/ses/mail-manager-ingress-point",
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
      toVersion: "2026.04.11.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.19.1",
      description: "Added: TlsPolicy",
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
      description: "SES MailManagerIngressPoint resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SES MailManagerIngressPoint",
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
          "AWS::SES::MailManagerIngressPoint",
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
      description: "Get a SES MailManagerIngressPoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SES MailManagerIngressPoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SES::MailManagerIngressPoint",
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
      description: "Update a SES MailManagerIngressPoint",
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
        const identifier = existing.IngressPointId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SES::MailManagerIngressPoint",
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
          "AWS::SES::MailManagerIngressPoint",
          identifier,
          currentState,
          desiredState,
          ["NetworkConfiguration", "Type"],
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
      description: "Delete a SES MailManagerIngressPoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SES MailManagerIngressPoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SES::MailManagerIngressPoint",
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
      description: "Sync SES MailManagerIngressPoint state from AWS",
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
        const identifier = existing.IngressPointId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SES::MailManagerIngressPoint",
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
