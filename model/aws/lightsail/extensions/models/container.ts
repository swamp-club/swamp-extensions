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

// Auto-generated extension model for @swamp/aws/lightsail/container
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Lightsail Container (AWS::Lightsail::Container).
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

const PublicDomainNameSchema = z.object({
  CertificateName: z.string().optional(),
  DomainNames: z.array(z.string()).describe(
    "An object that describes the configuration for the containers of the deployment.",
  ).optional(),
});

const EnvironmentVariableSchema = z.object({
  Variable: z.string().optional(),
  Value: z.string().optional(),
});

const PortInfoSchema = z.object({
  Port: z.string().optional(),
  Protocol: z.string().optional(),
});

const ContainerSchema = z.object({
  ContainerName: z.string().describe("The name of the container.").optional(),
  Command: z.array(z.string()).describe("The launch command for the container.")
    .optional(),
  Environment: z.array(EnvironmentVariableSchema).describe(
    "The environment variables of the container.",
  ).optional(),
  Image: z.string().describe("The name of the image used for the container.")
    .optional(),
  Ports: z.array(PortInfoSchema).describe(
    "The open firewall ports of the container.",
  ).optional(),
});

const HealthCheckConfigSchema = z.object({
  HealthyThreshold: z.number().int().describe(
    "The number of consecutive health checks successes required before moving the container to the Healthy state. The default value is 2.",
  ).optional(),
  IntervalSeconds: z.number().int().describe(
    "The approximate interval, in seconds, between health checks of an individual container. You can specify between 5 and 300 seconds. The default value is 5.",
  ).optional(),
  Path: z.string().describe(
    "The path on the container on which to perform the health check. The default value is /.",
  ).optional(),
  SuccessCodes: z.string().describe(
    "The HTTP codes to use when checking for a successful response from a container. You can specify values between 200 and 499. You can specify multiple values (for example, 200,202) or a range of values (for example, 200-299).",
  ).optional(),
  TimeoutSeconds: z.number().int().describe(
    "The amount of time, in seconds, during which no response means a failed health check. You can specify between 2 and 60 seconds. The default value is 2.",
  ).optional(),
  UnhealthyThreshold: z.number().int().describe(
    "The number of consecutive health check failures required before moving the container to the Unhealthy state. The default value is 2.",
  ).optional(),
});

const PublicEndpointSchema = z.object({
  ContainerName: z.string().describe(
    "The name of the container for the endpoint.",
  ).optional(),
  ContainerPort: z.number().int().describe(
    "The port of the container to which traffic is forwarded to.",
  ).optional(),
  HealthCheckConfig: HealthCheckConfigSchema.describe(
    "An object that describes the health check configuration of the container.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ).optional(),
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
  ServiceName: z.string().min(1).max(63).regex(
    new RegExp("^[a-z0-9]{1,2}|[a-z0-9][a-z0-9-]+[a-z0-9]$"),
  ).describe("The name for the container service."),
  Power: z.string().describe(
    "The power specification for the container service.",
  ),
  Scale: z.number().int().min(1).max(20).describe(
    "The scale specification for the container service.",
  ),
  PublicDomainNames: z.array(PublicDomainNameSchema).describe(
    "The public domain names to use with the container service, such as example.com and www.example.com.",
  ).optional(),
  ContainerServiceDeployment: z.object({
    Containers: z.array(ContainerSchema).describe(
      "An object that describes the configuration for the containers of the deployment.",
    ).optional(),
    PublicEndpoint: PublicEndpointSchema.describe(
      "An object that describes the endpoint of the deployment.",
    ).optional(),
  }).describe(
    "Describes a container deployment configuration of an Amazon Lightsail container service.",
  ).optional(),
  IsDisabled: z.boolean().describe(
    "A Boolean value to indicate whether the container service is disabled.",
  ).optional(),
  PrivateRegistryAccess: z.object({
    EcrImagePullerRole: z.object({
      IsActive: z.boolean().describe(
        "A Boolean value that indicates whether to activate the role.",
      ).optional(),
    }).describe(
      "An object to describe a request to activate or deactivate the role that you can use to grant an Amazon Lightsail container service access to Amazon Elastic Container Registry (Amazon ECR) private repositories.",
    ).optional(),
  }).describe(
    "A Boolean value to indicate whether the container service has access to private container image repositories, such as Amazon Elastic Container Registry (Amazon ECR) private repositories.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  ServiceName: z.string(),
  Power: z.string().optional(),
  ContainerArn: z.string().optional(),
  Scale: z.number().optional(),
  PublicDomainNames: z.array(PublicDomainNameSchema).optional(),
  ContainerServiceDeployment: z.object({
    Containers: z.array(ContainerSchema),
    PublicEndpoint: PublicEndpointSchema,
  }).optional(),
  IsDisabled: z.boolean().optional(),
  PrivateRegistryAccess: z.object({
    EcrImagePullerRole: z.object({
      IsActive: z.boolean(),
      PrincipalArn: z.string(),
    }),
  }).optional(),
  Url: z.string().optional(),
  PrincipalArn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ServiceName: z.string().min(1).max(63).regex(
    new RegExp("^[a-z0-9]{1,2}|[a-z0-9][a-z0-9-]+[a-z0-9]$"),
  ).describe("The name for the container service.").optional(),
  Power: z.string().describe(
    "The power specification for the container service.",
  ).optional(),
  Scale: z.number().int().min(1).max(20).describe(
    "The scale specification for the container service.",
  ).optional(),
  PublicDomainNames: z.array(PublicDomainNameSchema).describe(
    "The public domain names to use with the container service, such as example.com and www.example.com.",
  ).optional(),
  ContainerServiceDeployment: z.object({
    Containers: z.array(ContainerSchema).describe(
      "An object that describes the configuration for the containers of the deployment.",
    ).optional(),
    PublicEndpoint: PublicEndpointSchema.describe(
      "An object that describes the endpoint of the deployment.",
    ).optional(),
  }).describe(
    "Describes a container deployment configuration of an Amazon Lightsail container service.",
  ).optional(),
  IsDisabled: z.boolean().describe(
    "A Boolean value to indicate whether the container service is disabled.",
  ).optional(),
  PrivateRegistryAccess: z.object({
    EcrImagePullerRole: z.object({
      IsActive: z.boolean().describe(
        "A Boolean value that indicates whether to activate the role.",
      ).optional(),
    }).describe(
      "An object to describe a request to activate or deactivate the role that you can use to grant an Amazon Lightsail container service access to Amazon Elastic Container Registry (Amazon ECR) private repositories.",
    ).optional(),
  }).describe(
    "A Boolean value to indicate whether the container service has access to private container image repositories, such as Amazon Elastic Container Registry (Amazon ECR) private repositories.",
  ).optional(),
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

/** Swamp extension model for Lightsail Container. Registered at `@swamp/aws/lightsail/container`. */
export const model = {
  type: "@swamp/aws/lightsail/container",
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
      description: "Lightsail Container resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Lightsail Container",
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
          "AWS::Lightsail::Container",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.ServiceName ?? g.ServiceName)?.toString() ?? "current")
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a Lightsail Container",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lightsail Container",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Lightsail::Container",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.ServiceName ?? context.globalArgs.ServiceName)?.toString() ??
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
      description: "Update a Lightsail Container",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.ServiceName?.toString() ?? "current").replace(
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
        const identifier = existing.ServiceName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Lightsail::Container",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Lightsail::Container",
          identifier,
          currentState,
          desiredState,
          ["ServiceName"],
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
      description: "Delete a Lightsail Container",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lightsail Container",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Lightsail::Container",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.ServiceName?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync Lightsail Container state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.ServiceName?.toString() ?? "current").replace(
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
        const identifier = existing.ServiceName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Lightsail::Container",
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
