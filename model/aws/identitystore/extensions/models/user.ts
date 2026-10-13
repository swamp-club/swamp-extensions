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

// Auto-generated extension model for @swamp/aws/identitystore/user
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for IdentityStore User (AWS::IdentityStore::User).
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
  IdentityStoreId: z.string().min(1).max(36).regex(
    new RegExp(
      "^d-[0-9a-f]{10}$|^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    ),
  ).describe("The globally unique identifier for the identity store."),
  UserName: z.string().min(1).max(128).regex(
    new RegExp("^[\\p{L}\\p{M}\\p{S}\\p{N}\\p{P}]+$", "u"),
  ).describe("A unique string used to identify the user.").optional(),
  Name: z.object({
    Formatted: z.string().min(1).max(1024).describe(
      "A string containing a formatted version of the name for display.",
    ).optional(),
    FamilyName: z.string().min(1).max(1024).describe(
      "The family name of the user.",
    ).optional(),
    GivenName: z.string().min(1).max(1024).describe(
      "The given name of the user.",
    ).optional(),
    MiddleName: z.string().min(1).max(1024).describe(
      "The middle name of the user.",
    ).optional(),
    HonorificPrefix: z.string().min(1).max(1024).describe(
      "The honorific prefix of the user.",
    ).optional(),
    HonorificSuffix: z.string().min(1).max(1024).describe(
      "The honorific suffix of the user.",
    ).optional(),
  }).describe("The name of the user.").optional(),
  DisplayName: z.string().min(1).max(1024).describe(
    "A string containing the name of the user for display.",
  ).optional(),
  NickName: z.string().min(1).max(1024).describe(
    "An alternate name for the user.",
  ).optional(),
  ProfileUrl: z.string().min(1).max(1024).describe(
    "A URL associated with the user.",
  ).optional(),
  Emails: z.array(z.object({
    Value: z.string().min(1).max(1024).describe("The email address.")
      .optional(),
    Type: z.string().min(1).max(1024).describe("The type of email address.")
      .optional(),
    Primary: z.boolean().describe("Whether this is the primary email address.")
      .optional(),
  })).describe("A list of email addresses associated with the user.")
    .optional(),
  Addresses: z.array(z.object({
    StreetAddress: z.string().min(1).max(1024).describe(
      "The street of the address.",
    ).optional(),
    Locality: z.string().min(1).max(1024).describe(
      "A string of the address locality.",
    ).optional(),
    Region: z.string().min(1).max(1024).describe("The region of the address.")
      .optional(),
    PostalCode: z.string().min(1).max(1024).describe(
      "The postal code of the address.",
    ).optional(),
    Country: z.string().min(1).max(1024).describe("The country of the address.")
      .optional(),
    Formatted: z.string().min(1).max(1024).describe(
      "A formatted version of the address for display.",
    ).optional(),
    Type: z.string().min(1).max(1024).describe("The type of address.")
      .optional(),
    Primary: z.boolean().describe("Whether this is the primary address.")
      .optional(),
  })).describe("A list of addresses associated with the user.").optional(),
  PhoneNumbers: z.array(z.object({
    Value: z.string().min(1).max(1024).describe("The phone number.").optional(),
    Type: z.string().min(1).max(1024).describe("The type of phone number.")
      .optional(),
    Primary: z.boolean().describe("Whether this is the primary phone number.")
      .optional(),
  })).describe("A list of phone numbers associated with the user.").optional(),
  UserType: z.string().min(1).max(1024).describe(
    "A string indicating the type of user.",
  ).optional(),
  Title: z.string().min(1).max(1024).describe("The title of the user.")
    .optional(),
  PreferredLanguage: z.string().min(1).max(1024).describe(
    "The preferred language of the user.",
  ).optional(),
  Locale: z.string().min(1).max(1024).describe(
    "The geographical region or location of the user.",
  ).optional(),
  Timezone: z.string().min(1).max(1024).describe("The time zone for the user.")
    .optional(),
  Photos: z.array(z.object({
    Value: z.string().min(1).max(1024).describe("The photo data or URL."),
    Type: z.string().min(1).max(1024).describe("The type of photo.").optional(),
    Display: z.string().min(1).max(1024).describe(
      "A display name for the photo.",
    ).optional(),
    Primary: z.boolean().describe("Whether this is the primary photo.")
      .optional(),
  })).describe("A list of photos associated with the user.").optional(),
  Website: z.string().min(1).max(1024).describe(
    "The user's personal website or blog URL.",
  ).optional(),
  Birthdate: z.string().min(1).max(1024).describe(
    "The user's birthdate in YYYY-MM-DD format.",
  ).optional(),
  Roles: z.array(z.object({
    Value: z.string().min(1).max(1024).describe("The role name.").optional(),
    Type: z.string().min(1).max(1024).describe("The type of role.").optional(),
    Primary: z.boolean().describe("Whether this is the primary role.")
      .optional(),
  })).describe("A list of roles associated with the user.").optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  IdentityStoreId: z.string().optional(),
  UserId: z.string().optional(),
  UserName: z.string().optional(),
  Name: z.object({
    Formatted: z.string(),
    FamilyName: z.string(),
    GivenName: z.string(),
    MiddleName: z.string(),
    HonorificPrefix: z.string(),
    HonorificSuffix: z.string(),
  }).optional(),
  DisplayName: z.string().optional(),
  NickName: z.string().optional(),
  ProfileUrl: z.string().optional(),
  Emails: z.array(z.object({
    Value: z.string(),
    Type: z.string(),
    Primary: z.boolean(),
  })).optional(),
  Addresses: z.array(z.object({
    StreetAddress: z.string(),
    Locality: z.string(),
    Region: z.string(),
    PostalCode: z.string(),
    Country: z.string(),
    Formatted: z.string(),
    Type: z.string(),
    Primary: z.boolean(),
  })).optional(),
  PhoneNumbers: z.array(z.object({
    Value: z.string(),
    Type: z.string(),
    Primary: z.boolean(),
  })).optional(),
  UserType: z.string().optional(),
  Title: z.string().optional(),
  PreferredLanguage: z.string().optional(),
  Locale: z.string().optional(),
  Timezone: z.string().optional(),
  Photos: z.array(z.object({
    Value: z.string(),
    Type: z.string(),
    Display: z.string(),
    Primary: z.boolean(),
  })).optional(),
  Website: z.string().optional(),
  Birthdate: z.string().optional(),
  Roles: z.array(z.object({
    Value: z.string(),
    Type: z.string(),
    Primary: z.boolean(),
  })).optional(),
  UserStatus: z.string().optional(),
  CreatedAt: z.string().optional(),
  CreatedBy: z.string().optional(),
  UpdatedAt: z.string().optional(),
  UpdatedBy: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  IdentityStoreId: z.string().min(1).max(36).regex(
    new RegExp(
      "^d-[0-9a-f]{10}$|^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    ),
  ).describe("The globally unique identifier for the identity store.")
    .optional(),
  UserName: z.string().min(1).max(128).regex(
    new RegExp("^[\\p{L}\\p{M}\\p{S}\\p{N}\\p{P}]+$", "u"),
  ).describe("A unique string used to identify the user.").optional(),
  Name: z.object({
    Formatted: z.string().min(1).max(1024).describe(
      "A string containing a formatted version of the name for display.",
    ).optional(),
    FamilyName: z.string().min(1).max(1024).describe(
      "The family name of the user.",
    ).optional(),
    GivenName: z.string().min(1).max(1024).describe(
      "The given name of the user.",
    ).optional(),
    MiddleName: z.string().min(1).max(1024).describe(
      "The middle name of the user.",
    ).optional(),
    HonorificPrefix: z.string().min(1).max(1024).describe(
      "The honorific prefix of the user.",
    ).optional(),
    HonorificSuffix: z.string().min(1).max(1024).describe(
      "The honorific suffix of the user.",
    ).optional(),
  }).describe("The name of the user.").optional(),
  DisplayName: z.string().min(1).max(1024).describe(
    "A string containing the name of the user for display.",
  ).optional(),
  NickName: z.string().min(1).max(1024).describe(
    "An alternate name for the user.",
  ).optional(),
  ProfileUrl: z.string().min(1).max(1024).describe(
    "A URL associated with the user.",
  ).optional(),
  Emails: z.array(z.object({
    Value: z.string().min(1).max(1024).describe("The email address.")
      .optional(),
    Type: z.string().min(1).max(1024).describe("The type of email address.")
      .optional(),
    Primary: z.boolean().describe("Whether this is the primary email address.")
      .optional(),
  })).describe("A list of email addresses associated with the user.")
    .optional(),
  Addresses: z.array(z.object({
    StreetAddress: z.string().min(1).max(1024).describe(
      "The street of the address.",
    ).optional(),
    Locality: z.string().min(1).max(1024).describe(
      "A string of the address locality.",
    ).optional(),
    Region: z.string().min(1).max(1024).describe("The region of the address.")
      .optional(),
    PostalCode: z.string().min(1).max(1024).describe(
      "The postal code of the address.",
    ).optional(),
    Country: z.string().min(1).max(1024).describe("The country of the address.")
      .optional(),
    Formatted: z.string().min(1).max(1024).describe(
      "A formatted version of the address for display.",
    ).optional(),
    Type: z.string().min(1).max(1024).describe("The type of address.")
      .optional(),
    Primary: z.boolean().describe("Whether this is the primary address.")
      .optional(),
  })).describe("A list of addresses associated with the user.").optional(),
  PhoneNumbers: z.array(z.object({
    Value: z.string().min(1).max(1024).describe("The phone number.").optional(),
    Type: z.string().min(1).max(1024).describe("The type of phone number.")
      .optional(),
    Primary: z.boolean().describe("Whether this is the primary phone number.")
      .optional(),
  })).describe("A list of phone numbers associated with the user.").optional(),
  UserType: z.string().min(1).max(1024).describe(
    "A string indicating the type of user.",
  ).optional(),
  Title: z.string().min(1).max(1024).describe("The title of the user.")
    .optional(),
  PreferredLanguage: z.string().min(1).max(1024).describe(
    "The preferred language of the user.",
  ).optional(),
  Locale: z.string().min(1).max(1024).describe(
    "The geographical region or location of the user.",
  ).optional(),
  Timezone: z.string().min(1).max(1024).describe("The time zone for the user.")
    .optional(),
  Photos: z.array(z.object({
    Value: z.string().min(1).max(1024).describe("The photo data or URL.")
      .optional(),
    Type: z.string().min(1).max(1024).describe("The type of photo.").optional(),
    Display: z.string().min(1).max(1024).describe(
      "A display name for the photo.",
    ).optional(),
    Primary: z.boolean().describe("Whether this is the primary photo.")
      .optional(),
  })).describe("A list of photos associated with the user.").optional(),
  Website: z.string().min(1).max(1024).describe(
    "The user's personal website or blog URL.",
  ).optional(),
  Birthdate: z.string().min(1).max(1024).describe(
    "The user's birthdate in YYYY-MM-DD format.",
  ).optional(),
  Roles: z.array(z.object({
    Value: z.string().min(1).max(1024).describe("The role name.").optional(),
    Type: z.string().min(1).max(1024).describe("The type of role.").optional(),
    Primary: z.boolean().describe("Whether this is the primary role.")
      .optional(),
  })).describe("A list of roles associated with the user.").optional(),
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

/** Swamp extension model for IdentityStore User. Registered at `@swamp/aws/identitystore/user`. */
export const model = {
  type: "@swamp/aws/identitystore/user",
  version: "2026.10.13.1",
  upgrades: [
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "IdentityStore User resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IdentityStore User",
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
          "AWS::IdentityStore::User",
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
      description: "Get a IdentityStore User",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IdentityStore User",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::IdentityStore::User",
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
      description: "Update a IdentityStore User",
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
          "AWS::IdentityStore::User",
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
          "AWS::IdentityStore::User",
          identifier,
          currentState,
          desiredState,
          [
            "IdentityStoreId",
            "UserName",
            "Emails",
            "Addresses",
            "PhoneNumbers",
            "Photos",
            "Roles",
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
      description: "Delete a IdentityStore User",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IdentityStore User",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::IdentityStore::User",
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
      description: "Sync IdentityStore User state from AWS",
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
            "AWS::IdentityStore::User",
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
      description: "List IdentityStore User resources",
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
          "AWS::IdentityStore::User",
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
            (item.properties?.Arn?.toString() ?? item.identifier).replace(
              /[\/\\]/g,
              "_",
            ).replace(/\.\./g, "_").replace(/\0/g, "");
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
