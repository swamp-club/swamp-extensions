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

// Auto-generated extension model for @swamp/aws/redshift/redshift-idc-application
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Redshift RedshiftIdcApplication (AWS::Redshift::RedshiftIdcApplication).
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

const AuthorizedTokenIssuerSchema = z.object({
  TrustedTokenIssuerArn: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z-]*:[a-zA-Z0-9-]+:[a-z0-9-]*:[0-9]*:.+$"),
  ).describe(
    "The ARN for the authorized token issuer for integrating Amazon Redshift with IDC Identity Center.",
  ).optional(),
  AuthorizedAudiencesList: z.array(z.string()).describe(
    "The list of audiences for the authorized token issuer.",
  ).optional(),
});

const LakeFormationQuerySchema = z.object({
  Authorization: z.enum(["Enabled", "Disabled"]).describe(
    "Determines whether the query scope is enabled or disabled.",
  ),
});

const LakeFormationScopeUnionSchema = z.object({
  LakeFormationQuery: LakeFormationQuerySchema.describe(
    "The Lake Formation scope.",
  ).optional(),
});

const ReadWriteAccessSchema = z.object({
  Authorization: z.enum(["Enabled", "Disabled"]).describe(
    "Determines whether the read/write scope is enabled or disabled.",
  ),
});

const S3AccessGrantsScopeUnionSchema = z.object({
  ReadWriteAccess: ReadWriteAccessSchema.describe("The S3 Access Grants scope.")
    .optional(),
});

const ConnectSchema = z.object({
  Authorization: z.enum(["Enabled", "Disabled"]).describe(
    "Determines whether the Amazon Redshift connect integration is enabled or disabled.",
  ),
});

const RedshiftScopeUnionSchema = z.object({
  Connect: ConnectSchema.describe(
    "The Amazon Redshift connect integration scope.",
  ).optional(),
});

const ServiceIntegrationsUnionSchema = z.object({
  LakeFormation: z.array(LakeFormationScopeUnionSchema).describe(
    "A list of scopes set up for Lake Formation integration.",
  ).optional(),
  S3AccessGrants: z.array(S3AccessGrantsScopeUnionSchema).describe(
    "A list of scopes set up for S3 Access Grants integration.",
  ).optional(),
  Redshift: z.array(RedshiftScopeUnionSchema).describe(
    "A list of scopes set up for Amazon Redshift integration.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The key name of the tag."),
  Value: z.string().min(0).max(256).describe("The value for the tag."),
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
  IdcInstanceArn: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z-]*:[a-zA-Z0-9-]+:[a-z0-9-]*:[0-9]*:.+$"),
  ).describe(
    "The Amazon resource name (ARN) of the IAM Identity Center instance where Amazon Redshift creates a new managed application.",
  ),
  RedshiftIdcApplicationName: z.string().min(1).max(63).regex(
    new RegExp("^[a-z][a-z0-9]*(-[a-z0-9]+)*$"),
  ).describe("The name of the Redshift application in IAM Identity Center."),
  IdentityNamespace: z.string().min(1).max(127).regex(
    new RegExp("^[a-zA-Z0-9_+.#@$-]+$"),
  ).describe(
    "The namespace for the Amazon Redshift IAM Identity Center application instance. It determines which managed application verifies the connection token.",
  ).optional(),
  IdcDisplayName: z.string().min(1).max(127).regex(new RegExp("^[\\w+=,.@-]+$"))
    .describe(
      "The display name for the Amazon Redshift IAM Identity Center application instance. It appears in the console.",
    ),
  IamRoleArn: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z-]*:[a-zA-Z0-9-]+:[a-z0-9-]*:[0-9]*:.+$"),
  ).describe(
    "The IAM role ARN for the Amazon Redshift IAM Identity Center application instance. It has the required permissions to be assumed and invoke the IDC Identity Center API.",
  ),
  AuthorizedTokenIssuerList: z.array(AuthorizedTokenIssuerSchema).describe(
    "The token issuer list for the Amazon Redshift IAM Identity Center application instance.",
  ).optional(),
  ServiceIntegrations: z.array(ServiceIntegrationsUnionSchema).describe(
    "A collection of service integrations for the Redshift IAM Identity Center application.",
  ).optional(),
  ApplicationType: z.enum(["None", "Lakehouse"]).describe(
    "The type of application being created.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  SsoTagKeys: z.array(z.string()).describe(
    "A list of tag keys that Redshift Identity Center applications copy to IAM Identity Center.",
  ).optional(),
});

const StateSchema = z.object({
  IdcInstanceArn: z.string().optional(),
  RedshiftIdcApplicationName: z.string().optional(),
  RedshiftIdcApplicationArn: z.string(),
  IdentityNamespace: z.string().optional(),
  IdcDisplayName: z.string().optional(),
  IamRoleArn: z.string().optional(),
  IdcManagedApplicationArn: z.string().optional(),
  IdcOnboardStatus: z.string().optional(),
  AuthorizedTokenIssuerList: z.array(AuthorizedTokenIssuerSchema).optional(),
  ServiceIntegrations: z.array(ServiceIntegrationsUnionSchema).optional(),
  ApplicationType: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  SsoTagKeys: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  IdcInstanceArn: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z-]*:[a-zA-Z0-9-]+:[a-z0-9-]*:[0-9]*:.+$"),
  ).describe(
    "The Amazon resource name (ARN) of the IAM Identity Center instance where Amazon Redshift creates a new managed application.",
  ).optional(),
  RedshiftIdcApplicationName: z.string().min(1).max(63).regex(
    new RegExp("^[a-z][a-z0-9]*(-[a-z0-9]+)*$"),
  ).describe("The name of the Redshift application in IAM Identity Center.")
    .optional(),
  IdentityNamespace: z.string().min(1).max(127).regex(
    new RegExp("^[a-zA-Z0-9_+.#@$-]+$"),
  ).describe(
    "The namespace for the Amazon Redshift IAM Identity Center application instance. It determines which managed application verifies the connection token.",
  ).optional(),
  IdcDisplayName: z.string().min(1).max(127).regex(new RegExp("^[\\w+=,.@-]+$"))
    .describe(
      "The display name for the Amazon Redshift IAM Identity Center application instance. It appears in the console.",
    ).optional(),
  IamRoleArn: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z-]*:[a-zA-Z0-9-]+:[a-z0-9-]*:[0-9]*:.+$"),
  ).describe(
    "The IAM role ARN for the Amazon Redshift IAM Identity Center application instance. It has the required permissions to be assumed and invoke the IDC Identity Center API.",
  ).optional(),
  AuthorizedTokenIssuerList: z.array(AuthorizedTokenIssuerSchema).describe(
    "The token issuer list for the Amazon Redshift IAM Identity Center application instance.",
  ).optional(),
  ServiceIntegrations: z.array(ServiceIntegrationsUnionSchema).describe(
    "A collection of service integrations for the Redshift IAM Identity Center application.",
  ).optional(),
  ApplicationType: z.enum(["None", "Lakehouse"]).describe(
    "The type of application being created.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  SsoTagKeys: z.array(z.string()).describe(
    "A list of tag keys that Redshift Identity Center applications copy to IAM Identity Center.",
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

/** Swamp extension model for Redshift RedshiftIdcApplication. Registered at `@swamp/aws/redshift/redshift-idc-application`. */
export const model = {
  type: "@swamp/aws/redshift/redshift-idc-application",
  version: "2026.09.29.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Redshift RedshiftIdcApplication resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Redshift RedshiftIdcApplication",
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
          "AWS::Redshift::RedshiftIdcApplication",
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
      description: "Get a Redshift RedshiftIdcApplication",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Redshift RedshiftIdcApplication",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Redshift::RedshiftIdcApplication",
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
      description: "Update a Redshift RedshiftIdcApplication",
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
        const identifier = existing.RedshiftIdcApplicationArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Redshift::RedshiftIdcApplication",
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
          "AWS::Redshift::RedshiftIdcApplication",
          identifier,
          currentState,
          desiredState,
          [
            "IdcInstanceArn",
            "RedshiftIdcApplicationName",
            "ApplicationType",
            "SsoTagKeys",
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
      description: "Delete a Redshift RedshiftIdcApplication",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Redshift RedshiftIdcApplication",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Redshift::RedshiftIdcApplication",
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
      description: "Sync Redshift RedshiftIdcApplication state from AWS",
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
        const identifier = existing.RedshiftIdcApplicationArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Redshift::RedshiftIdcApplication",
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
      description: "List Redshift RedshiftIdcApplication resources",
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
          "AWS::Redshift::RedshiftIdcApplication",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName =
            (item.properties?.RedshiftIdcApplicationArn?.toString() ??
              item.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
              .replace(/\0/g, "");
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
