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

// Auto-generated extension model for @swamp/aws/amplify/domain
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Amplify Domain (AWS::Amplify::Domain).
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

const SubDomainSettingSchema = z.object({
  Prefix: z.string().max(255).regex(new RegExp(".*", "s")),
  BranchName: z.string().min(1).max(255).regex(new RegExp(".+", "s")),
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
  AppId: z.string().min(1).max(20).regex(new RegExp("d[a-z0-9]+")),
  AutoSubDomainCreationPatterns: z.array(
    z.string().min(1).max(2048).regex(new RegExp(".+", "s")),
  ).optional(),
  AutoSubDomainIAMRole: z.string().max(1000).regex(
    new RegExp("^$|^arn:.+:iam::\\d{12}:role.+"),
  ).optional(),
  Certificate: z.object({
    CertificateType: z.enum(["AMPLIFY_MANAGED", "CUSTOM"]).optional(),
    CertificateArn: z.string().regex(
      new RegExp('"^arn:aws:acm:[a-z0-9-]+:\\d{12}:certificate\\/.+$"'),
    ).optional(),
    CertificateVerificationDNSRecord: z.string().max(1000).optional(),
  }).optional(),
  CertificateSettings: z.object({
    CertificateType: z.enum(["AMPLIFY_MANAGED", "CUSTOM"]).optional(),
    CustomCertificateArn: z.string().regex(
      new RegExp("^arn:aws:acm:[a-z0-9-]+:\\d{12}:certificate\\/.+$"),
    ).optional(),
  }).optional(),
  DomainName: z.string().max(255).regex(
    new RegExp(
      "^(((?!-)[A-Za-z0-9-]{0,62}[A-Za-z0-9])\\.)+((?!-)[A-Za-z0-9-]{1,62}[A-Za-z0-9])(\\.)?$",
    ),
  ),
  EnableAutoSubDomain: z.boolean().optional(),
  SubDomainSettings: z.array(SubDomainSettingSchema),
});

const StateSchema = z.object({
  AppId: z.string().optional(),
  Arn: z.string(),
  AutoSubDomainCreationPatterns: z.array(z.string()).optional(),
  AutoSubDomainIAMRole: z.string().optional(),
  CertificateRecord: z.string().optional(),
  Certificate: z.object({
    CertificateType: z.string(),
    CertificateArn: z.string(),
    CertificateVerificationDNSRecord: z.string(),
  }).optional(),
  CertificateSettings: z.object({
    CertificateType: z.string(),
    CustomCertificateArn: z.string(),
  }).optional(),
  DomainName: z.string().optional(),
  DomainStatus: z.string().optional(),
  UpdateStatus: z.string().optional(),
  EnableAutoSubDomain: z.boolean().optional(),
  StatusReason: z.string().optional(),
  SubDomainSettings: z.array(SubDomainSettingSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AppId: z.string().min(1).max(20).regex(new RegExp("d[a-z0-9]+")).optional(),
  AutoSubDomainCreationPatterns: z.array(
    z.string().min(1).max(2048).regex(new RegExp(".+", "s")),
  ).optional(),
  AutoSubDomainIAMRole: z.string().max(1000).regex(
    new RegExp("^$|^arn:.+:iam::\\d{12}:role.+"),
  ).optional(),
  Certificate: z.object({
    CertificateType: z.enum(["AMPLIFY_MANAGED", "CUSTOM"]).optional(),
    CertificateArn: z.string().regex(
      new RegExp('"^arn:aws:acm:[a-z0-9-]+:\\d{12}:certificate\\/.+$"'),
    ).optional(),
    CertificateVerificationDNSRecord: z.string().max(1000).optional(),
  }).optional(),
  CertificateSettings: z.object({
    CertificateType: z.enum(["AMPLIFY_MANAGED", "CUSTOM"]).optional(),
    CustomCertificateArn: z.string().regex(
      new RegExp("^arn:aws:acm:[a-z0-9-]+:\\d{12}:certificate\\/.+$"),
    ).optional(),
  }).optional(),
  DomainName: z.string().max(255).regex(
    new RegExp(
      "^(((?!-)[A-Za-z0-9-]{0,62}[A-Za-z0-9])\\.)+((?!-)[A-Za-z0-9-]{1,62}[A-Za-z0-9])(\\.)?$",
    ),
  ).optional(),
  EnableAutoSubDomain: z.boolean().optional(),
  SubDomainSettings: z.array(SubDomainSettingSchema).optional(),
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

/** Swamp extension model for Amplify Domain. Registered at `@swamp/aws/amplify/domain`. */
export const model = {
  type: "@swamp/aws/amplify/domain",
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
      description: "Amplify Domain resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Amplify Domain",
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
          "AWS::Amplify::Domain",
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
      description: "Get a Amplify Domain",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Amplify Domain",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Amplify::Domain",
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
      description: "Update a Amplify Domain",
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
          "AWS::Amplify::Domain",
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
          "AWS::Amplify::Domain",
          identifier,
          currentState,
          desiredState,
          ["AppId", "DomainName"],
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
      description: "Delete a Amplify Domain",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Amplify Domain",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Amplify::Domain",
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
      description: "Sync Amplify Domain state from AWS",
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
            "AWS::Amplify::Domain",
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
