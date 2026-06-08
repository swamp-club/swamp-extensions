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

// Auto-generated extension model for @swamp/aws/location/apikey
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Location APIKey (AWS::Location::APIKey).
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

const AndroidAppSchema = z.object({
  Package: z.string().min(1).max(255).regex(
    new RegExp("^([A-Za-z][A-Za-z\\d_]*\\.)+[A-Za-z][A-Za-z\\d_]*$"),
  ),
  CertificateFingerprint: z.string().min(59).max(59).regex(
    new RegExp("^([A-Fa-f0-9]{2}:){19}[A-Fa-f0-9]{2}$"),
  ),
});

const AppleAppSchema = z.object({
  BundleId: z.string().min(1).max(155).regex(
    new RegExp("^[A-Za-z0-9\\-]+(\\.[A-Za-z0-9\\-]+)+$"),
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z+-=._:/]+$"))
    .describe(
      "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
    ),
  Value: z.string().min(0).max(256).regex(new RegExp("^[A-Za-z0-9 _=@:.+-/]*$"))
    .describe(
      "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
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
  Description: z.string().min(0).max(1000).optional(),
  ExpireTime: z.string().regex(
    new RegExp(
      "^([0-2]\\d{3})-(0[0-9]|1[0-2])-([0-2]\\d|3[01])T([01]\\d|2[0-4]):([0-5]\\d):([0-6]\\d)((\\.\\d{3})?)Z$",
    ),
  ).describe(
    "The datetime value in ISO 8601 format. The timezone is always UTC. (YYYY-MM-DDThh:mm:ss.sssZ)",
  ).optional(),
  ForceUpdate: z.boolean().optional(),
  KeyName: z.string().min(1).max(100).regex(new RegExp("^[-._\\w]+$")),
  NoExpiry: z.boolean().optional(),
  Restrictions: z.object({
    AllowActions: z.array(
      z.string().min(5).max(200).regex(
        new RegExp("^(geo|geo-routes|geo-places|geo-maps):\\w*\\*?$"),
      ),
    ),
    AllowResources: z.array(
      z.string().max(1600).regex(
        new RegExp(
          "(^arn(:[a-z0-9]+([.-][a-z0-9]+)*):geo(:([a-z0-9]+([.-][a-z0-9]+)*))(:[0-9]+):((\\*)|([-a-z]+[/][*-._\\w]+))$)|(^arn(:[a-z0-9]+([.-][a-z0-9]+)*):(geo-routes|geo-places|geo-maps)(:((\\*)|([a-z0-9]+([.-][a-z0-9]+)*)))::((provider[\\/][*-._\\w]+))$)",
        ),
      ),
    ),
    AllowReferers: z.array(
      z.string().max(253).regex(
        new RegExp(
          "^([\\w!$&()*+,./:;=?@\\x{60}-]|%([\\dA-Fa-f]{2}|[\\dA-Fa-f]?\\*))+$",
        ),
      ),
    ).optional(),
    AllowAndroidApps: z.array(AndroidAppSchema).optional(),
    AllowAppleApps: z.array(AppleAppSchema).optional(),
  }),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  ForceDelete: z.boolean().optional(),
});

const StateSchema = z.object({
  CreateTime: z.string().optional(),
  Description: z.string().optional(),
  ExpireTime: z.string().optional(),
  ForceUpdate: z.boolean().optional(),
  KeyArn: z.string().optional(),
  KeyName: z.string(),
  NoExpiry: z.boolean().optional(),
  Restrictions: z.object({
    AllowActions: z.array(z.string()),
    AllowResources: z.array(z.string()),
    AllowReferers: z.array(z.string()),
    AllowAndroidApps: z.array(AndroidAppSchema),
    AllowAppleApps: z.array(AppleAppSchema),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  UpdateTime: z.string().optional(),
  ForceDelete: z.boolean().optional(),
  Arn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Description: z.string().min(0).max(1000).optional(),
  ExpireTime: z.string().regex(
    new RegExp(
      "^([0-2]\\d{3})-(0[0-9]|1[0-2])-([0-2]\\d|3[01])T([01]\\d|2[0-4]):([0-5]\\d):([0-6]\\d)((\\.\\d{3})?)Z$",
    ),
  ).describe(
    "The datetime value in ISO 8601 format. The timezone is always UTC. (YYYY-MM-DDThh:mm:ss.sssZ)",
  ).optional(),
  ForceUpdate: z.boolean().optional(),
  KeyName: z.string().min(1).max(100).regex(new RegExp("^[-._\\w]+$"))
    .optional(),
  NoExpiry: z.boolean().optional(),
  Restrictions: z.object({
    AllowActions: z.array(
      z.string().min(5).max(200).regex(
        new RegExp("^(geo|geo-routes|geo-places|geo-maps):\\w*\\*?$"),
      ),
    ).optional(),
    AllowResources: z.array(
      z.string().max(1600).regex(
        new RegExp(
          "(^arn(:[a-z0-9]+([.-][a-z0-9]+)*):geo(:([a-z0-9]+([.-][a-z0-9]+)*))(:[0-9]+):((\\*)|([-a-z]+[/][*-._\\w]+))$)|(^arn(:[a-z0-9]+([.-][a-z0-9]+)*):(geo-routes|geo-places|geo-maps)(:((\\*)|([a-z0-9]+([.-][a-z0-9]+)*)))::((provider[\\/][*-._\\w]+))$)",
        ),
      ),
    ).optional(),
    AllowReferers: z.array(
      z.string().max(253).regex(
        new RegExp(
          "^([\\w!$&()*+,./:;=?@\\x{60}-]|%([\\dA-Fa-f]{2}|[\\dA-Fa-f]?\\*))+$",
        ),
      ),
    ).optional(),
    AllowAndroidApps: z.array(AndroidAppSchema).optional(),
    AllowAppleApps: z.array(AppleAppSchema).optional(),
  }).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  ForceDelete: z.boolean().optional(),
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

/** Swamp extension model for Location APIKey. Registered at `@swamp/aws/location/apikey`. */
export const model = {
  type: "@swamp/aws/location/apikey",
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
      description: "Location APIKey resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Location APIKey",
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
          "AWS::Location::APIKey",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.KeyName ?? g.KeyName)?.toString() ?? "current").replace(
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
      description: "Get a Location APIKey",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Location APIKey",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Location::APIKey",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.KeyName ?? context.globalArgs.KeyName)?.toString() ??
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
      description: "Update a Location APIKey",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.KeyName?.toString() ?? "current").replace(
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
        const identifier = existing.KeyName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Location::APIKey",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Location::APIKey",
          identifier,
          currentState,
          desiredState,
          ["KeyName"],
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
      description: "Delete a Location APIKey",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Location APIKey",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Location::APIKey",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.KeyName?.toString() ?? args.identifier).replace(
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
      description: "Sync Location APIKey state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.KeyName?.toString() ?? "current").replace(
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
        const identifier = existing.KeyName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Location::APIKey",
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
