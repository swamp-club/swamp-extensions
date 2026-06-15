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

// Auto-generated extension model for @swamp/aws/finspace/environment
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for FinSpace Environment (AWS::FinSpace::Environment).
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
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
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
  Name: z.string().regex(
    new RegExp("^[a-zA-Z0-9]+[a-zA-Z0-9-]*[a-zA-Z0-9]{1,255}$"),
  ).describe("Name of the Environment"),
  Description: z.string().regex(new RegExp("^[a-zA-Z0-9. ]{1,1000}$")).describe(
    "Description of the Environment",
  ).optional(),
  KmsKeyId: z.string().regex(new RegExp("^[a-zA-Z-0-9-:\\/]{1,1000}$"))
    .describe(
      "KMS key used to encrypt customer data within FinSpace Environment infrastructure",
    ).optional(),
  FederationMode: z.enum(["LOCAL", "FEDERATED"]).describe(
    "Federation mode used with the Environment",
  ).optional(),
  FederationParameters: z.object({
    SamlMetadataURL: z.string().regex(
      new RegExp(
        "^https?://[-a-zA-Z0-9+&amp;@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&amp;@#/%=~_|]{1,1000}",
      ),
    ).describe("SAML metadata URL to link with the Environment").optional(),
    FederationProviderName: z.string().min(1).max(32).regex(
      new RegExp("[^_\\p{Z}][\\p{L}\\p{M}\\p{S}\\p{N}\\p{P}][^_\\p{Z}]+", "u"),
    ).describe("Federation provider name to link with the Environment")
      .optional(),
    SamlMetadataDocument: z.string().min(1000).max(10000000).regex(
      new RegExp(".*"),
    ).describe(
      "SAML metadata document to link the federation provider to the Environment",
    ).optional(),
    ApplicationCallBackURL: z.string().regex(
      new RegExp(
        "^https?://[-a-zA-Z0-9+&amp;@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&amp;@#/%=~_|]{1,1000}",
      ),
    ).describe("SAML metadata URL to link with the Environment").optional(),
    FederationURN: z.string().describe(
      "SAML metadata URL to link with the Environment",
    ).optional(),
    AttributeMap: z.array(z.object({
      Key: z.string().min(1).max(128).describe(
        "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
      ).optional(),
      Value: z.string().min(0).max(256).describe(
        "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
      ).optional(),
    })).describe("Attribute map for SAML configuration").optional(),
  }).describe("Additional parameters to identify Federation mode").optional(),
  SuperuserParameters: z.object({
    FirstName: z.string().min(1).max(50).regex(
      new RegExp("^[a-zA-Z0-9]{1,50}$"),
    ).describe("First name").optional(),
    LastName: z.string().min(1).max(50).regex(new RegExp("^[a-zA-Z0-9]{1,50}$"))
      .describe("Last name").optional(),
    EmailAddress: z.string().min(1).max(128).regex(
      new RegExp("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+[.]+[A-Za-z]+"),
    ).describe("Email address").optional(),
  }).describe("Parameters of the first Superuser for the FinSpace Environment")
    .optional(),
  DataBundles: z.array(
    z.string().regex(
      new RegExp(
        "^arn:aws:finspace:[A-Za-z0-9_/.-]{0,63}:\\d*:data-bundle/[0-9A-Za-z_-]{1,128}$",
      ),
    ),
  ).describe("ARNs of FinSpace Data Bundles to install").optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  EnvironmentId: z.string(),
  Name: z.string().optional(),
  AwsAccountId: z.string().optional(),
  Description: z.string().optional(),
  Status: z.string().optional(),
  EnvironmentUrl: z.string().optional(),
  EnvironmentArn: z.string().optional(),
  SageMakerStudioDomainUrl: z.string().optional(),
  KmsKeyId: z.string().optional(),
  DedicatedServiceAccountId: z.string().optional(),
  FederationMode: z.string().optional(),
  FederationParameters: z.object({
    SamlMetadataURL: z.string(),
    FederationProviderName: z.string(),
    SamlMetadataDocument: z.string(),
    ApplicationCallBackURL: z.string(),
    FederationURN: z.string(),
    AttributeMap: z.array(z.object({
      Key: z.string(),
      Value: z.string(),
    })),
  }).optional(),
  SuperuserParameters: z.object({
    FirstName: z.string(),
    LastName: z.string(),
    EmailAddress: z.string(),
  }).optional(),
  DataBundles: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().regex(
    new RegExp("^[a-zA-Z0-9]+[a-zA-Z0-9-]*[a-zA-Z0-9]{1,255}$"),
  ).describe("Name of the Environment").optional(),
  Description: z.string().regex(new RegExp("^[a-zA-Z0-9. ]{1,1000}$")).describe(
    "Description of the Environment",
  ).optional(),
  KmsKeyId: z.string().regex(new RegExp("^[a-zA-Z-0-9-:\\/]{1,1000}$"))
    .describe(
      "KMS key used to encrypt customer data within FinSpace Environment infrastructure",
    ).optional(),
  FederationMode: z.enum(["LOCAL", "FEDERATED"]).describe(
    "Federation mode used with the Environment",
  ).optional(),
  FederationParameters: z.object({
    SamlMetadataURL: z.string().regex(
      new RegExp(
        "^https?://[-a-zA-Z0-9+&amp;@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&amp;@#/%=~_|]{1,1000}",
      ),
    ).describe("SAML metadata URL to link with the Environment").optional(),
    FederationProviderName: z.string().min(1).max(32).regex(
      new RegExp("[^_\\p{Z}][\\p{L}\\p{M}\\p{S}\\p{N}\\p{P}][^_\\p{Z}]+", "u"),
    ).describe("Federation provider name to link with the Environment")
      .optional(),
    SamlMetadataDocument: z.string().min(1000).max(10000000).regex(
      new RegExp(".*"),
    ).describe(
      "SAML metadata document to link the federation provider to the Environment",
    ).optional(),
    ApplicationCallBackURL: z.string().regex(
      new RegExp(
        "^https?://[-a-zA-Z0-9+&amp;@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&amp;@#/%=~_|]{1,1000}",
      ),
    ).describe("SAML metadata URL to link with the Environment").optional(),
    FederationURN: z.string().describe(
      "SAML metadata URL to link with the Environment",
    ).optional(),
    AttributeMap: z.array(z.object({
      Key: z.string().min(1).max(128).describe(
        "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
      ).optional(),
      Value: z.string().min(0).max(256).describe(
        "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
      ).optional(),
    })).describe("Attribute map for SAML configuration").optional(),
  }).describe("Additional parameters to identify Federation mode").optional(),
  SuperuserParameters: z.object({
    FirstName: z.string().min(1).max(50).regex(
      new RegExp("^[a-zA-Z0-9]{1,50}$"),
    ).describe("First name").optional(),
    LastName: z.string().min(1).max(50).regex(new RegExp("^[a-zA-Z0-9]{1,50}$"))
      .describe("Last name").optional(),
    EmailAddress: z.string().min(1).max(128).regex(
      new RegExp("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+[.]+[A-Za-z]+"),
    ).describe("Email address").optional(),
  }).describe("Parameters of the first Superuser for the FinSpace Environment")
    .optional(),
  DataBundles: z.array(
    z.string().regex(
      new RegExp(
        "^arn:aws:finspace:[A-Za-z0-9_/.-]{0,63}:\\d*:data-bundle/[0-9A-Za-z_-]{1,128}$",
      ),
    ),
  ).describe("ARNs of FinSpace Data Bundles to install").optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
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

/** Swamp extension model for FinSpace Environment. Registered at `@swamp/aws/finspace/environment`. */
export const model = {
  type: "@swamp/aws/finspace/environment",
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
      description: "FinSpace Environment resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a FinSpace Environment",
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
          "AWS::FinSpace::Environment",
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
      description: "Get a FinSpace Environment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the FinSpace Environment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::FinSpace::Environment",
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
      description: "Update a FinSpace Environment",
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
        const identifier = existing.EnvironmentId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::FinSpace::Environment",
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
          "AWS::FinSpace::Environment",
          identifier,
          currentState,
          desiredState,
          [
            "KmsKeyId",
            "SuperuserParameters",
            "FederationParameters",
            "DataBundles",
            "Tags",
          ],
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
      description: "Delete a FinSpace Environment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the FinSpace Environment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::FinSpace::Environment",
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
      description: "Sync FinSpace Environment state from AWS",
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
        const identifier = existing.EnvironmentId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::FinSpace::Environment",
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
