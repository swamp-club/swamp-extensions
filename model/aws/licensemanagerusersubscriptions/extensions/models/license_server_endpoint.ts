// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/licensemanagerusersubscriptions/license-server-endpoint
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for LicenseManagerUserSubscriptions LicenseServerEndpoint (AWS::LicenseManagerUserSubscriptions::LicenseServerEndpoint).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const SecretsManagerCredentialsProviderSchema = z.object({
  SecretId: z.string().min(1).describe(
    "The identifier of the Secrets Manager secret that holds the license server administrator credentials. The name of the secret must begin with the prefix license-manager-user-.",
  ),
});

const CredentialsProviderSchema = z.object({
  SecretsManagerCredentialsProvider: SecretsManagerCredentialsProviderSchema
    .describe("Credentials held in AWS Secrets Manager."),
});

const RdsSalSettingsSchema = z.object({
  RdsSalCredentialsProvider: CredentialsProviderSchema.describe(
    "The source of the credentials that License Manager uses to reach the license server.",
  ),
});

const ServerSettingsSchema = z.object({
  RdsSalSettings: RdsSalSettingsSchema.describe(
    "The settings of a Remote Desktop Services Subscriber Access License server.",
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The tag key."),
  Value: z.string().min(0).max(256).describe("The tag value."),
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
  IdentityProviderArn: z.string().regex(
    new RegExp(
      "^arn:[a-z0-9-\\.]{1,63}:license-manager-user-subscriptions:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{1,63}:[a-zA-Z0-9-\\.]{1,510}/[a-zA-Z0-9-\\.]{1,510}$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) that identifies the registered identity provider the license server endpoint is created for. For Active Directory, that can be a self-managed Active Directory or an AWS Managed Microsoft AD.",
  ),
  LicenseServerSettings: z.object({
    ServerSettings: ServerSettingsSchema.describe(
      "The settings of a license server, by server type.",
    ),
  }).describe(
    "The settings of the RDS license server to create the endpoint for.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags that apply for the license server endpoint. A maximum of 50 tags.",
  ).optional(),
  ServerEndpoint: z.object({
    Endpoint: z.string().describe("The network address of the endpoint.")
      .optional(),
  }).describe("The network address of a license server endpoint.").optional(),
});

const StateSchema = z.object({
  IdentityProviderArn: z.string(),
  LicenseServerSettings: z.object({
    ServerType: z.string(),
    ServerSettings: ServerSettingsSchema,
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  LicenseServerEndpointArn: z.string(),
  LicenseServerEndpointId: z.string().optional(),
  LicenseServerEndpointProvisioningStatus: z.string().optional(),
  ServerType: z.string().optional(),
  ServerEndpoint: z.object({
    Endpoint: z.string(),
  }).optional(),
  LicenseServers: z.array(z.object({
    ProvisioningStatus: z.string(),
    HealthStatus: z.string(),
    Ipv4Address: z.string(),
    Ipv6Address: z.string(),
  })).optional(),
  CreationTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  IdentityProviderArn: z.string().regex(
    new RegExp(
      "^arn:[a-z0-9-\\.]{1,63}:license-manager-user-subscriptions:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{1,63}:[a-zA-Z0-9-\\.]{1,510}/[a-zA-Z0-9-\\.]{1,510}$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) that identifies the registered identity provider the license server endpoint is created for. For Active Directory, that can be a self-managed Active Directory or an AWS Managed Microsoft AD.",
  ).optional(),
  LicenseServerSettings: z.object({
    ServerSettings: ServerSettingsSchema.describe(
      "The settings of a license server, by server type.",
    ).optional(),
  }).describe(
    "The settings of the RDS license server to create the endpoint for.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags that apply for the license server endpoint. A maximum of 50 tags.",
  ).optional(),
  ServerEndpoint: z.object({
    Endpoint: z.string().describe("The network address of the endpoint.")
      .optional(),
  }).describe("The network address of a license server endpoint.").optional(),
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

/** Swamp extension model for LicenseManagerUserSubscriptions LicenseServerEndpoint. Registered at `@swamp/aws/licensemanagerusersubscriptions/license-server-endpoint`. */
export const model = {
  type: "@swamp/aws/licensemanagerusersubscriptions/license-server-endpoint",
  version: "2026.10.15.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "LicenseManagerUserSubscriptions LicenseServerEndpoint resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description:
        "Create a LicenseManagerUserSubscriptions LicenseServerEndpoint",
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
          "AWS::LicenseManagerUserSubscriptions::LicenseServerEndpoint",
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
      description:
        "Get a LicenseManagerUserSubscriptions LicenseServerEndpoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the LicenseManagerUserSubscriptions LicenseServerEndpoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::LicenseManagerUserSubscriptions::LicenseServerEndpoint",
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
      description:
        "Update a LicenseManagerUserSubscriptions LicenseServerEndpoint",
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
          existing.IdentityProviderArn?.toString(),
          existing.LicenseServerEndpointArn?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::LicenseManagerUserSubscriptions::LicenseServerEndpoint",
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
          "AWS::LicenseManagerUserSubscriptions::LicenseServerEndpoint",
          identifier,
          currentState,
          desiredState,
          ["IdentityProviderArn", "LicenseServerSettings"],
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
      description:
        "Delete a LicenseManagerUserSubscriptions LicenseServerEndpoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the LicenseManagerUserSubscriptions LicenseServerEndpoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::LicenseManagerUserSubscriptions::LicenseServerEndpoint",
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
      description:
        "Sync LicenseManagerUserSubscriptions LicenseServerEndpoint state from AWS",
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
          existing.IdentityProviderArn?.toString(),
          existing.LicenseServerEndpointArn?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::LicenseManagerUserSubscriptions::LicenseServerEndpoint",
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
    list: {
      description:
        "List LicenseManagerUserSubscriptions LicenseServerEndpoint resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
        resourceModel: z.string().describe(
          "JSON resource model for parent-scoped listing (e.g. parent identifier)",
        ).optional(),
      }),
      execute: async (
        args: { maxPages?: number; resourceModel?: string },
        context: any,
      ) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { items, nextToken } = await listResources(
          "AWS::LicenseManagerUserSubscriptions::LicenseServerEndpoint",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName = item.identifier.replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, "");
          const handle = await context.writeResource("state", instanceName, {
            ...item.properties,
            _identifier: item.identifier,
          });
          dataHandles.push(handle);
        }
        return {
          dataHandles,
          result: { count: items.length, nextPageToken: nextToken },
        };
      },
    },
  },
};
