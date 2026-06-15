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

// Auto-generated extension model for @swamp/aws/ses/mail-manager-traffic-policy
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SES MailManagerTrafficPolicy (AWS::SES::MailManagerTrafficPolicy).
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

const IngressAnalysisSchema = z.object({
  Analyzer: z.string().regex(new RegExp("^[a-zA-Z0-9:_/+=,@.#-]+$")),
  ResultField: z.string().min(1).max(256).regex(
    new RegExp("^(addon\\.)?[\\sa-zA-Z0-9_]+$"),
  ),
});

const IngressStringExpressionSchema = z.object({
  Evaluate: z.object({
    Attribute: z.enum(["RECIPIENT"]).optional(),
    Analysis: IngressAnalysisSchema.optional(),
  }),
  Operator: z.enum([
    "EQUALS",
    "NOT_EQUALS",
    "STARTS_WITH",
    "ENDS_WITH",
    "CONTAINS",
  ]),
  Values: z.array(z.string()),
});

const IngressIpv4ExpressionSchema = z.object({
  Evaluate: z.object({
    Attribute: z.enum(["SENDER_IP"]).optional(),
  }),
  Operator: z.enum(["CIDR_MATCHES", "NOT_CIDR_MATCHES"]),
  Values: z.array(
    z.string().regex(
      new RegExp(
        "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/([0-9]|[12][0-9]|3[0-2])$",
      ),
    ),
  ),
});

const IngressIpv6ExpressionSchema = z.object({
  Evaluate: z.object({
    Attribute: z.enum(["SENDER_IPV6"]).optional(),
  }),
  Operator: z.enum(["CIDR_MATCHES", "NOT_CIDR_MATCHES"]),
  Values: z.array(
    z.string().max(49).regex(
      new RegExp(
        "^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\\/(12[0-8]|1[0-1][0-9]|[1-9][0-9]|[0-9])$",
      ),
    ),
  ),
});

const IngressTlsProtocolExpressionSchema = z.object({
  Evaluate: z.object({
    Attribute: z.enum(["TLS_PROTOCOL"]).optional(),
  }),
  Operator: z.enum(["MINIMUM_TLS_VERSION", "IS"]),
  Value: z.enum(["TLS1_2", "TLS1_3"]),
});

const IngressIsInAddressListSchema = z.object({
  Attribute: z.enum(["RECIPIENT"]),
  AddressLists: z.array(z.string()),
});

const IngressBooleanExpressionSchema = z.object({
  Evaluate: z.object({
    Analysis: IngressAnalysisSchema.optional(),
    IsInAddressList: IngressIsInAddressListSchema.optional(),
  }),
  Operator: z.enum(["IS_TRUE", "IS_FALSE"]),
});

const PolicyStatementSchema = z.object({
  Conditions: z.array(z.object({
    StringExpression: IngressStringExpressionSchema.optional(),
    IpExpression: IngressIpv4ExpressionSchema.optional(),
    Ipv6Expression: IngressIpv6ExpressionSchema.optional(),
    TlsExpression: IngressTlsProtocolExpressionSchema.optional(),
    BooleanExpression: IngressBooleanExpressionSchema.optional(),
  })),
  Action: z.enum(["ALLOW", "DENY"]),
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  DefaultAction: z.enum(["ALLOW", "DENY"]),
  MaxMessageSizeBytes: z.number().min(1).optional(),
  PolicyStatements: z.array(PolicyStatementSchema),
  Tags: z.array(TagSchema).optional(),
  TrafficPolicyName: z.string().min(3).max(63).regex(
    new RegExp("^[A-Za-z0-9_\\-]+$"),
  ).optional(),
});

const StateSchema = z.object({
  DefaultAction: z.string().optional(),
  MaxMessageSizeBytes: z.number().optional(),
  PolicyStatements: z.array(PolicyStatementSchema).optional(),
  Tags: z.array(TagSchema).optional(),
  TrafficPolicyArn: z.string().optional(),
  TrafficPolicyId: z.string(),
  TrafficPolicyName: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DefaultAction: z.enum(["ALLOW", "DENY"]).optional(),
  MaxMessageSizeBytes: z.number().min(1).optional(),
  PolicyStatements: z.array(PolicyStatementSchema).optional(),
  Tags: z.array(TagSchema).optional(),
  TrafficPolicyName: z.string().min(3).max(63).regex(
    new RegExp("^[A-Za-z0-9_\\-]+$"),
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

/** Swamp extension model for SES MailManagerTrafficPolicy. Registered at `@swamp/aws/ses/mail-manager-traffic-policy`. */
export const model = {
  type: "@swamp/aws/ses/mail-manager-traffic-policy",
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
      description: "SES MailManagerTrafficPolicy resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SES MailManagerTrafficPolicy",
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
          "AWS::SES::MailManagerTrafficPolicy",
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
      description: "Get a SES MailManagerTrafficPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SES MailManagerTrafficPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SES::MailManagerTrafficPolicy",
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
      description: "Update a SES MailManagerTrafficPolicy",
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
        const identifier = existing.TrafficPolicyId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SES::MailManagerTrafficPolicy",
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
          "AWS::SES::MailManagerTrafficPolicy",
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
      description: "Delete a SES MailManagerTrafficPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SES MailManagerTrafficPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SES::MailManagerTrafficPolicy",
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
      description: "Sync SES MailManagerTrafficPolicy state from AWS",
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
        const identifier = existing.TrafficPolicyId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SES::MailManagerTrafficPolicy",
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
