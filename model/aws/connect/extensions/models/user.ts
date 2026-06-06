// Auto-generated extension model for @swamp/aws/connect/user
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Connect User (AWS::Connect::User).
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
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().max(256).describe(
    "The value for the tag. You can specify a value that is maximum of 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const UserProficiencySchema = z.object({
  AttributeName: z.string().min(1).max(64).describe(
    "The name of user's proficiency. You must use name of predefined attribute present in the Amazon Connect instance.",
  ),
  AttributeValue: z.string().min(1).max(64).describe(
    "The value of user's proficiency. You must use value of predefined attribute present in the Amazon Connect instance.",
  ),
  Level: z.number().min(1).max(5).describe(
    "The level of the proficiency. The valid values are 1, 2, 3, 4 and 5.",
  ),
});

const AutoAcceptConfigSchema = z.object({
  Channel: z.enum(["VOICE", "CHAT", "TASK", "EMAIL"]).describe(
    "The channels that agents can handle in the Contact Control Panel (CCP).",
  ),
  AutoAccept: z.boolean().describe("The Auto accept setting."),
  AgentFirstCallbackAutoAccept: z.boolean().describe(
    "The agent first callback auto accept setting.",
  ).optional(),
});

const AfterContactWorkConfigSchema = z.object({
  AfterContactWorkTimeLimit: z.number().int().min(0).describe(
    "The After Call Work (ACW) timeout setting, in seconds.",
  ).optional(),
});

const AfterContactWorkConfigPerChannelSchema = z.object({
  Channel: z.enum(["VOICE", "CHAT", "TASK", "EMAIL"]).describe(
    "The channels that agents can handle in the Contact Control Panel (CCP).",
  ),
  AfterContactWorkConfig: AfterContactWorkConfigSchema.describe(
    "After Contact Work configuration.",
  ),
  AgentFirstCallbackAfterContactWorkConfig: AfterContactWorkConfigSchema
    .describe("After Contact Work configuration.").optional(),
});

const PhoneNumberConfigSchema = z.object({
  Channel: z.enum(["VOICE", "CHAT", "TASK", "EMAIL"]).describe(
    "The channels that agents can handle in the Contact Control Panel (CCP).",
  ),
  PhoneType: z.enum(["SOFT_PHONE", "DESK_PHONE"]).describe("The phone type."),
  PhoneNumber: z.string().describe(
    "The phone number for the user's desk phone.",
  ).optional(),
});

const PersistentConnectionConfigSchema = z.object({
  Channel: z.enum(["VOICE", "CHAT", "TASK", "EMAIL"]).describe(
    "The channels that agents can handle in the Contact Control Panel (CCP).",
  ),
  PersistentConnection: z.boolean().describe(
    "The Persistent Connection setting.",
  ),
});

const VoiceEnhancementConfigSchema = z.object({
  Channel: z.enum(["VOICE", "CHAT", "TASK", "EMAIL"]).describe(
    "The channels that agents can handle in the Contact Control Panel (CCP).",
  ),
  VoiceEnhancementMode: z.enum(["NONE", "VOICE_ISOLATION", "NOISE_SUPPRESSION"])
    .describe("The Voice Enhancement Mode setting."),
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
  InstanceArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*$",
    ),
  ).describe("The identifier of the Amazon Connect instance."),
  DirectoryUserId: z.string().describe(
    "The identifier of the user account in the directory used for identity management.",
  ).optional(),
  HierarchyGroupArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*/agent-group/[-a-zA-Z0-9]*$",
    ),
  ).describe("The identifier of the hierarchy group for the user.").optional(),
  Username: z.string().min(1).max(64).regex(
    new RegExp("[a-zA-Z0-9\\_\\-\\.\\@]+"),
  ).describe("The user name for the account."),
  Password: z.string().regex(
    new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\S]{8,64}$"),
  ).describe(
    "The password for the user account. A password is required if you are using Amazon Connect for identity management. Otherwise, it is an error to include a password.",
  ).optional(),
  RoutingProfileArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*/routing-profile/[-a-zA-Z0-9]*$",
    ),
  ).describe("The identifier of the routing profile for the user."),
  IdentityInfo: z.object({
    FirstName: z.string().describe(
      "The first name. This is required if you are using Amazon Connect or SAML for identity management.",
    ).optional(),
    LastName: z.string().describe(
      "The last name. This is required if you are using Amazon Connect or SAML for identity management.",
    ).optional(),
    Email: z.string().describe(
      "The email address. If you are using SAML for identity management and include this parameter, an error is returned.",
    ).optional(),
    SecondaryEmail: z.string().regex(
      new RegExp(
        "(?=^.{0,265}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,63}",
      ),
    ).describe(
      "The secondary email address. If you provide a secondary email, the user receives email notifications -- other than password reset notifications -- to this email address instead of to their primary email address.",
    ).optional(),
    Mobile: z.string().regex(new RegExp("^\\+[1-9]\\d{1,14}$")).describe(
      "The mobile phone number.",
    ).optional(),
  }).describe("The information about the identity of the user.").optional(),
  PhoneConfig: z.object({
    AfterContactWorkTimeLimit: z.number().int().min(0).describe(
      "The After Call Work (ACW) timeout setting, in seconds.",
    ).optional(),
    AutoAccept: z.boolean().describe("The Auto accept setting.").optional(),
    DeskPhoneNumber: z.string().describe(
      "The phone number for the user's desk phone.",
    ).optional(),
    PhoneType: z.enum(["SOFT_PHONE", "DESK_PHONE"]).describe("The phone type.")
      .optional(),
    PersistentConnection: z.boolean().describe(
      "The Persistent Connection setting.",
    ).optional(),
  }).describe("The phone settings for the user.").optional(),
  SecurityProfileArns: z.array(
    z.string().regex(
      new RegExp(
        "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*/security-profile/[-a-zA-Z0-9]*$",
      ),
    ),
  ).describe("One or more security profile arns for the user"),
  Tags: z.array(TagSchema).describe("One or more tags.").optional(),
  UserProficiencies: z.array(UserProficiencySchema).describe(
    "One or more predefined attributes assigned to a user, with a level that indicates how skilled they are.",
  ).optional(),
  AutoAcceptConfigs: z.array(AutoAcceptConfigSchema).describe(
    "Auto-accept configurations of a user.",
  ).optional(),
  AfterContactWorkConfigs: z.array(AfterContactWorkConfigPerChannelSchema)
    .describe("After Contact Work configurations of a user.").optional(),
  PhoneNumberConfigs: z.array(PhoneNumberConfigSchema).describe(
    "Phone Number configurations of a user.",
  ).optional(),
  PersistentConnectionConfigs: z.array(PersistentConnectionConfigSchema)
    .describe("Persistent Connection configurations of a user.").optional(),
  VoiceEnhancementConfigs: z.array(VoiceEnhancementConfigSchema).describe(
    "Voice Enhancement configurations of a user.",
  ).optional(),
});

const StateSchema = z.object({
  InstanceArn: z.string().optional(),
  DirectoryUserId: z.string().optional(),
  HierarchyGroupArn: z.string().optional(),
  Username: z.string().optional(),
  Password: z.string().optional(),
  RoutingProfileArn: z.string().optional(),
  IdentityInfo: z.object({
    FirstName: z.string(),
    LastName: z.string(),
    Email: z.string(),
    SecondaryEmail: z.string(),
    Mobile: z.string(),
  }).optional(),
  PhoneConfig: z.object({
    AfterContactWorkTimeLimit: z.number(),
    AutoAccept: z.boolean(),
    DeskPhoneNumber: z.string(),
    PhoneType: z.string(),
    PersistentConnection: z.boolean(),
  }).optional(),
  SecurityProfileArns: z.array(z.string()).optional(),
  UserArn: z.string(),
  Tags: z.array(TagSchema).optional(),
  UserProficiencies: z.array(UserProficiencySchema).optional(),
  AutoAcceptConfigs: z.array(AutoAcceptConfigSchema).optional(),
  AfterContactWorkConfigs: z.array(AfterContactWorkConfigPerChannelSchema)
    .optional(),
  PhoneNumberConfigs: z.array(PhoneNumberConfigSchema).optional(),
  PersistentConnectionConfigs: z.array(PersistentConnectionConfigSchema)
    .optional(),
  VoiceEnhancementConfigs: z.array(VoiceEnhancementConfigSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  InstanceArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*$",
    ),
  ).describe("The identifier of the Amazon Connect instance.").optional(),
  DirectoryUserId: z.string().describe(
    "The identifier of the user account in the directory used for identity management.",
  ).optional(),
  HierarchyGroupArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*/agent-group/[-a-zA-Z0-9]*$",
    ),
  ).describe("The identifier of the hierarchy group for the user.").optional(),
  Username: z.string().min(1).max(64).regex(
    new RegExp("[a-zA-Z0-9\\_\\-\\.\\@]+"),
  ).describe("The user name for the account.").optional(),
  Password: z.string().regex(
    new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\S]{8,64}$"),
  ).describe(
    "The password for the user account. A password is required if you are using Amazon Connect for identity management. Otherwise, it is an error to include a password.",
  ).optional(),
  RoutingProfileArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*/routing-profile/[-a-zA-Z0-9]*$",
    ),
  ).describe("The identifier of the routing profile for the user.").optional(),
  IdentityInfo: z.object({
    FirstName: z.string().describe(
      "The first name. This is required if you are using Amazon Connect or SAML for identity management.",
    ).optional(),
    LastName: z.string().describe(
      "The last name. This is required if you are using Amazon Connect or SAML for identity management.",
    ).optional(),
    Email: z.string().describe(
      "The email address. If you are using SAML for identity management and include this parameter, an error is returned.",
    ).optional(),
    SecondaryEmail: z.string().regex(
      new RegExp(
        "(?=^.{0,265}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,63}",
      ),
    ).describe(
      "The secondary email address. If you provide a secondary email, the user receives email notifications -- other than password reset notifications -- to this email address instead of to their primary email address.",
    ).optional(),
    Mobile: z.string().regex(new RegExp("^\\+[1-9]\\d{1,14}$")).describe(
      "The mobile phone number.",
    ).optional(),
  }).describe("The information about the identity of the user.").optional(),
  PhoneConfig: z.object({
    AfterContactWorkTimeLimit: z.number().int().min(0).describe(
      "The After Call Work (ACW) timeout setting, in seconds.",
    ).optional(),
    AutoAccept: z.boolean().describe("The Auto accept setting.").optional(),
    DeskPhoneNumber: z.string().describe(
      "The phone number for the user's desk phone.",
    ).optional(),
    PhoneType: z.enum(["SOFT_PHONE", "DESK_PHONE"]).describe("The phone type.")
      .optional(),
    PersistentConnection: z.boolean().describe(
      "The Persistent Connection setting.",
    ).optional(),
  }).describe("The phone settings for the user.").optional(),
  SecurityProfileArns: z.array(
    z.string().regex(
      new RegExp(
        "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*/security-profile/[-a-zA-Z0-9]*$",
      ),
    ),
  ).describe("One or more security profile arns for the user").optional(),
  Tags: z.array(TagSchema).describe("One or more tags.").optional(),
  UserProficiencies: z.array(UserProficiencySchema).describe(
    "One or more predefined attributes assigned to a user, with a level that indicates how skilled they are.",
  ).optional(),
  AutoAcceptConfigs: z.array(AutoAcceptConfigSchema).describe(
    "Auto-accept configurations of a user.",
  ).optional(),
  AfterContactWorkConfigs: z.array(AfterContactWorkConfigPerChannelSchema)
    .describe("After Contact Work configurations of a user.").optional(),
  PhoneNumberConfigs: z.array(PhoneNumberConfigSchema).describe(
    "Phone Number configurations of a user.",
  ).optional(),
  PersistentConnectionConfigs: z.array(PersistentConnectionConfigSchema)
    .describe("Persistent Connection configurations of a user.").optional(),
  VoiceEnhancementConfigs: z.array(VoiceEnhancementConfigSchema).describe(
    "Voice Enhancement configurations of a user.",
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

/** Swamp extension model for Connect User. Registered at `@swamp/aws/connect/user`. */
export const model = {
  type: "@swamp/aws/connect/user",
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
      description: "Connect User resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Connect User",
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
          "AWS::Connect::User",
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
      description: "Get a Connect User",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Connect User",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Connect::User",
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
      description: "Update a Connect User",
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
        const identifier = existing.UserArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Connect::User",
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
          "AWS::Connect::User",
          identifier,
          currentState,
          desiredState,
          undefined,
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
      description: "Delete a Connect User",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Connect User",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Connect::User",
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
      description: "Sync Connect User state from AWS",
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
        const identifier = existing.UserArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Connect::User",
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
