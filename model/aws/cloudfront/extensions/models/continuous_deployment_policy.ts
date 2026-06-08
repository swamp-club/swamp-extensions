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

// Auto-generated extension model for @swamp/aws/cloudfront/continuous-deployment-policy
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CloudFront ContinuousDeploymentPolicy (AWS::CloudFront::ContinuousDeploymentPolicy).
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

const SessionStickinessConfigSchema = z.object({
  IdleTTL: z.number().int().min(300).max(3600).describe(
    "The amount of time after which you want sessions to cease if no requests are received. Allowed values are 300–3600 seconds (5–60 minutes).",
  ),
  MaximumTTL: z.number().int().min(300).max(3600).describe(
    "The maximum amount of time to consider requests from the viewer as being part of the same session. Allowed values are 300–3600 seconds (5–60 minutes).",
  ),
});

const SingleHeaderConfigSchema = z.object({
  Header: z.string().min(1).max(256).describe(
    "The request header name that you want CloudFront to send to your staging distribution. The header must contain the prefix aws-cf-cd-.",
  ),
  Value: z.string().min(1).max(1783).describe("The request header value."),
});

const SingleWeightConfigSchema = z.object({
  SessionStickinessConfig: SessionStickinessConfigSchema.describe(
    "Session stickiness provides the ability to define multiple requests from a single viewer as a single session. This prevents the potentially inconsistent experience of sending some of a given user's requests to your staging distribution, while others are sent to your primary distribution. Define the session duration using TTL values.",
  ).optional(),
  Weight: z.number().min(0).max(1).describe(
    "The percentage of traffic to send to a staging distribution, expressed as a decimal number between 0 and 0.15. For example, a value of 0.10 means 10% of traffic is sent to the staging distribution.",
  ),
});

const TrafficConfigSchema = z.object({
  SingleHeaderConfig: SingleHeaderConfigSchema.describe(
    "Determines which HTTP requests are sent to the staging distribution.",
  ).optional(),
  SingleWeightConfig: SingleWeightConfigSchema.describe(
    "Contains the percentage of traffic to send to the staging distribution.",
  ).optional(),
  Type: z.enum(["SingleWeight", "SingleHeader"]).describe(
    "The type of traffic configuration.",
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
  ContinuousDeploymentPolicyConfig: z.object({
    Enabled: z.boolean().describe(
      "A Boolean that indicates whether this continuous deployment policy is enabled (in effect). When this value is true, this policy is enabled and in effect. When this value is false, this policy is not enabled and has no effect.",
    ),
    SingleHeaderPolicyConfig: z.object({
      Header: z.string().min(1).max(256),
      Value: z.string().min(1).max(1783),
    }).describe(
      "This configuration determines which HTTP requests are sent to the staging distribution. If the HTTP request contains a header and value that matches what you specify here, the request is sent to the staging distribution. Otherwise the request is sent to the primary distribution.",
    ).optional(),
    SingleWeightPolicyConfig: z.object({
      SessionStickinessConfig: SessionStickinessConfigSchema.describe(
        "Session stickiness provides the ability to define multiple requests from a single viewer as a single session. This prevents the potentially inconsistent experience of sending some of a given user's requests to your staging distribution, while others are sent to your primary distribution. Define the session duration using TTL values.",
      ).optional(),
      Weight: z.number().min(0).max(1),
    }).describe(
      "This configuration determines the percentage of HTTP requests that are sent to the staging distribution.",
    ).optional(),
    StagingDistributionDnsNames: z.array(z.string()).describe(
      "The CloudFront domain name of the staging distribution. For example: d111111abcdef8.cloudfront.net.",
    ),
    TrafficConfig: TrafficConfigSchema.describe(
      "Contains the parameters for routing production traffic from your primary to staging distributions.",
    ).optional(),
    Type: z.enum(["SingleWeight", "SingleHeader"]).describe(
      "The type of traffic configuration.",
    ).optional(),
  }).describe("Contains the configuration for a continuous deployment policy."),
});

const StateSchema = z.object({
  ContinuousDeploymentPolicyConfig: z.object({
    Enabled: z.boolean(),
    SingleHeaderPolicyConfig: z.object({
      Header: z.string(),
      Value: z.string(),
    }),
    SingleWeightPolicyConfig: z.object({
      SessionStickinessConfig: SessionStickinessConfigSchema,
      Weight: z.number(),
    }),
    StagingDistributionDnsNames: z.array(z.string()),
    TrafficConfig: TrafficConfigSchema,
    Type: z.string(),
  }).optional(),
  Id: z.string(),
  LastModifiedTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ContinuousDeploymentPolicyConfig: z.object({
    Enabled: z.boolean().describe(
      "A Boolean that indicates whether this continuous deployment policy is enabled (in effect). When this value is true, this policy is enabled and in effect. When this value is false, this policy is not enabled and has no effect.",
    ).optional(),
    SingleHeaderPolicyConfig: z.object({
      Header: z.string().min(1).max(256).optional(),
      Value: z.string().min(1).max(1783).optional(),
    }).describe(
      "This configuration determines which HTTP requests are sent to the staging distribution. If the HTTP request contains a header and value that matches what you specify here, the request is sent to the staging distribution. Otherwise the request is sent to the primary distribution.",
    ).optional(),
    SingleWeightPolicyConfig: z.object({
      SessionStickinessConfig: SessionStickinessConfigSchema.describe(
        "Session stickiness provides the ability to define multiple requests from a single viewer as a single session. This prevents the potentially inconsistent experience of sending some of a given user's requests to your staging distribution, while others are sent to your primary distribution. Define the session duration using TTL values.",
      ).optional(),
      Weight: z.number().min(0).max(1).optional(),
    }).describe(
      "This configuration determines the percentage of HTTP requests that are sent to the staging distribution.",
    ).optional(),
    StagingDistributionDnsNames: z.array(z.string()).describe(
      "The CloudFront domain name of the staging distribution. For example: d111111abcdef8.cloudfront.net.",
    ).optional(),
    TrafficConfig: TrafficConfigSchema.describe(
      "Contains the parameters for routing production traffic from your primary to staging distributions.",
    ).optional(),
    Type: z.enum(["SingleWeight", "SingleHeader"]).describe(
      "The type of traffic configuration.",
    ).optional(),
  }).describe("Contains the configuration for a continuous deployment policy.")
    .optional(),
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

/** Swamp extension model for CloudFront ContinuousDeploymentPolicy. Registered at `@swamp/aws/cloudfront/continuous-deployment-policy`. */
export const model = {
  type: "@swamp/aws/cloudfront/continuous-deployment-policy",
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
      description: "CloudFront ContinuousDeploymentPolicy resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CloudFront ContinuousDeploymentPolicy",
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
          "AWS::CloudFront::ContinuousDeploymentPolicy",
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
      description: "Get a CloudFront ContinuousDeploymentPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFront ContinuousDeploymentPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CloudFront::ContinuousDeploymentPolicy",
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
      description: "Update a CloudFront ContinuousDeploymentPolicy",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::CloudFront::ContinuousDeploymentPolicy",
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
          "AWS::CloudFront::ContinuousDeploymentPolicy",
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
      description: "Delete a CloudFront ContinuousDeploymentPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFront ContinuousDeploymentPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CloudFront::ContinuousDeploymentPolicy",
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
      description: "Sync CloudFront ContinuousDeploymentPolicy state from AWS",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CloudFront::ContinuousDeploymentPolicy",
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
