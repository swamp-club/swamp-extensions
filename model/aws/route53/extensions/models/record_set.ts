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

// Auto-generated extension model for @swamp/aws/route53/record-set
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Route53 RecordSet (AWS::Route53::RecordSet).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
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
  HealthCheckId: z.string().max(64).describe(
    "If you want Amazon Route 53 to return this resource record set in response to a DNS query only when the status of a health check is healthy, include the HealthCheckId element and specify the ID of the applicable health check.",
  ).optional(),
  AliasTarget: z.object({
    HostedZoneId: z.string().max(44).describe(
      "The value used depends on where you want to route traffic.",
    ),
    DNSName: z.string().max(1024).describe(
      "The value that you specify depends on where you want to route queries.",
    ),
    EvaluateTargetHealth: z.boolean().describe(
      "When EvaluateTargetHealth is true, an alias resource record set inherits the health of the referenced AWS resource, such as an ELB load balancer or another resource record set in the hosted zone.",
    ).optional(),
  }).describe(
    "Alias resource record sets only: Information about the AWS resource, such as a CloudFront distribution or an Amazon S3 bucket, that you want to route traffic to.",
  ).optional(),
  Comment: z.string().max(256).describe(
    "Optional: Any comments you want to include about a change batch request.",
  ).optional(),
  HostedZoneName: z.string().max(256).describe(
    "The name of the hosted zone that you want to create records in. You must include a trailing dot (for example, www.example.com.) as part of the HostedZoneName.",
  ).optional(),
  ResourceRecords: z.array(z.string().max(4000)).describe(
    "One or more values that correspond with the value that you specified for the Type property.",
  ).optional(),
  HostedZoneId: z.string().max(44).describe(
    "The ID of the hosted zone that you want to create records in.",
  ).optional(),
  SetIdentifier: z.string().min(0).max(128).describe(
    "An identifier that differentiates among multiple resource record sets that have the same combination of name and type.",
  ).optional(),
  TTL: z.string().describe(
    "The resource record cache time to live (TTL), in seconds.",
  ).optional(),
  Weight: z.number().int().describe(
    "Among resource record sets that have the same combination of DNS name and type, a value that determines the proportion of DNS queries that Amazon Route 53 responds to using the current resource record set. Route 53 calculates the sum of the weights for the resource record sets that have the same combination of DNS name and type. Route 53 then responds to queries based on the ratio of a resource's weight to the total.",
  ).optional(),
  Name: z.string().max(1024).describe(
    "The name of the record that you want to create, update, or delete.",
  ),
  Type: z.string().describe("The DNS record type."),
  CidrRoutingConfig: z.object({
    CollectionId: z.string().regex(
      new RegExp("^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$"),
    ).describe("The CIDR collection ID."),
    LocationName: z.string().min(1).max(16).regex(
      new RegExp("[0-9A-Za-z_\\-\\*]+"),
    ).describe("The CIDR collection location name."),
  }).describe(
    "The object that is specified in resource record set object when you are linking a resource record set to a CIDR location.",
  ).optional(),
  Failover: z.enum(["PRIMARY", "SECONDARY"]).describe(
    "To configure failover, you add the Failover element to two resource record sets. For one resource record set, you specify PRIMARY as the value for Failover; for the other resource record set, you specify SECONDARY. In addition, you include the HealthCheckId element and specify the health check that you want Amazon Route 53 to perform for each resource record set.",
  ).optional(),
  Region: z.string().describe(
    "The Amazon EC2 Region where you created the resource that this resource record set refers to.",
  ).optional(),
  GeoLocation: z.object({
    ContinentCode: z.string().min(2).max(2).describe(
      "For geolocation resource record sets, a two-letter abbreviation that identifies a continent.",
    ).optional(),
    CountryCode: z.string().min(1).max(2).describe(
      "For geolocation resource record sets, the two-letter code for a country.",
    ).optional(),
    SubdivisionCode: z.string().min(1).max(3).describe(
      "For geolocation resource record sets, the two-letter code for a state of the United States.",
    ).optional(),
  }).describe(
    "A complex type that lets you control how Amazon Route 53 responds to DNS queries based on the geographic origin of the query.",
  ).optional(),
  MultiValueAnswer: z.boolean().describe(
    "To route traffic approximately randomly to multiple resources, such as web servers, create one multivalue answer record for each resource and specify true for MultiValueAnswer.",
  ).optional(),
});

const StateSchema = z.object({
  HealthCheckId: z.string().optional(),
  AliasTarget: z.object({
    HostedZoneId: z.string(),
    DNSName: z.string(),
    EvaluateTargetHealth: z.boolean(),
  }).optional(),
  Comment: z.string().optional(),
  HostedZoneName: z.string().optional(),
  ResourceRecords: z.array(z.string()).optional(),
  HostedZoneId: z.string(),
  SetIdentifier: z.string(),
  TTL: z.string().optional(),
  Weight: z.number().optional(),
  Name: z.string(),
  Type: z.string(),
  CidrRoutingConfig: z.object({
    CollectionId: z.string(),
    LocationName: z.string(),
  }).optional(),
  Failover: z.string().optional(),
  Region: z.string().optional(),
  GeoLocation: z.object({
    ContinentCode: z.string(),
    CountryCode: z.string(),
    SubdivisionCode: z.string(),
  }).optional(),
  MultiValueAnswer: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  HealthCheckId: z.string().max(64).describe(
    "If you want Amazon Route 53 to return this resource record set in response to a DNS query only when the status of a health check is healthy, include the HealthCheckId element and specify the ID of the applicable health check.",
  ).optional(),
  AliasTarget: z.object({
    HostedZoneId: z.string().max(44).describe(
      "The value used depends on where you want to route traffic.",
    ).optional(),
    DNSName: z.string().max(1024).describe(
      "The value that you specify depends on where you want to route queries.",
    ).optional(),
    EvaluateTargetHealth: z.boolean().describe(
      "When EvaluateTargetHealth is true, an alias resource record set inherits the health of the referenced AWS resource, such as an ELB load balancer or another resource record set in the hosted zone.",
    ).optional(),
  }).describe(
    "Alias resource record sets only: Information about the AWS resource, such as a CloudFront distribution or an Amazon S3 bucket, that you want to route traffic to.",
  ).optional(),
  Comment: z.string().max(256).describe(
    "Optional: Any comments you want to include about a change batch request.",
  ).optional(),
  HostedZoneName: z.string().max(256).describe(
    "The name of the hosted zone that you want to create records in. You must include a trailing dot (for example, www.example.com.) as part of the HostedZoneName.",
  ).optional(),
  ResourceRecords: z.array(z.string().max(4000)).describe(
    "One or more values that correspond with the value that you specified for the Type property.",
  ).optional(),
  HostedZoneId: z.string().max(44).describe(
    "The ID of the hosted zone that you want to create records in.",
  ).optional(),
  SetIdentifier: z.string().min(0).max(128).describe(
    "An identifier that differentiates among multiple resource record sets that have the same combination of name and type.",
  ).optional(),
  TTL: z.string().describe(
    "The resource record cache time to live (TTL), in seconds.",
  ).optional(),
  Weight: z.number().int().describe(
    "Among resource record sets that have the same combination of DNS name and type, a value that determines the proportion of DNS queries that Amazon Route 53 responds to using the current resource record set. Route 53 calculates the sum of the weights for the resource record sets that have the same combination of DNS name and type. Route 53 then responds to queries based on the ratio of a resource's weight to the total.",
  ).optional(),
  Name: z.string().max(1024).describe(
    "The name of the record that you want to create, update, or delete.",
  ).optional(),
  Type: z.string().describe("The DNS record type.").optional(),
  CidrRoutingConfig: z.object({
    CollectionId: z.string().regex(
      new RegExp("^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$"),
    ).describe("The CIDR collection ID.").optional(),
    LocationName: z.string().min(1).max(16).regex(
      new RegExp("[0-9A-Za-z_\\-\\*]+"),
    ).describe("The CIDR collection location name.").optional(),
  }).describe(
    "The object that is specified in resource record set object when you are linking a resource record set to a CIDR location.",
  ).optional(),
  Failover: z.enum(["PRIMARY", "SECONDARY"]).describe(
    "To configure failover, you add the Failover element to two resource record sets. For one resource record set, you specify PRIMARY as the value for Failover; for the other resource record set, you specify SECONDARY. In addition, you include the HealthCheckId element and specify the health check that you want Amazon Route 53 to perform for each resource record set.",
  ).optional(),
  Region: z.string().describe(
    "The Amazon EC2 Region where you created the resource that this resource record set refers to.",
  ).optional(),
  GeoLocation: z.object({
    ContinentCode: z.string().min(2).max(2).describe(
      "For geolocation resource record sets, a two-letter abbreviation that identifies a continent.",
    ).optional(),
    CountryCode: z.string().min(1).max(2).describe(
      "For geolocation resource record sets, the two-letter code for a country.",
    ).optional(),
    SubdivisionCode: z.string().min(1).max(3).describe(
      "For geolocation resource record sets, the two-letter code for a state of the United States.",
    ).optional(),
  }).describe(
    "A complex type that lets you control how Amazon Route 53 responds to DNS queries based on the geographic origin of the query.",
  ).optional(),
  MultiValueAnswer: z.boolean().describe(
    "To route traffic approximately randomly to multiple resources, such as web servers, create one multivalue answer record for each resource and specify true for MultiValueAnswer.",
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

/** Swamp extension model for Route53 RecordSet. Registered at `@swamp/aws/route53/record-set`. */
export const model = {
  type: "@swamp/aws/route53/record-set",
  version: "2026.10.23.1",
  upgrades: [
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Route53 RecordSet resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Route53 RecordSet",
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
          "AWS::Route53::RecordSet",
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
      description: "Get a Route53 RecordSet",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Route53 RecordSet",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Route53::RecordSet",
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
      description: "Update a Route53 RecordSet",
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
          existing.Name?.toString(),
          existing.HostedZoneId?.toString(),
          existing.Type?.toString(),
          existing.SetIdentifier?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::Route53::RecordSet",
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
          "AWS::Route53::RecordSet",
          identifier,
          currentState,
          desiredState,
          ["HostedZoneName", "HostedZoneId"],
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
      description: "Delete a Route53 RecordSet",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Route53 RecordSet",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Route53::RecordSet",
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
      description: "Sync Route53 RecordSet state from AWS",
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
          existing.Name?.toString(),
          existing.HostedZoneId?.toString(),
          existing.Type?.toString(),
          existing.SetIdentifier?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::Route53::RecordSet",
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
      description: "List Route53 RecordSet resources",
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
          "AWS::Route53::RecordSet",
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
