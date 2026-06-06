// Auto-generated extension model for @swamp/aws/route53/hosted-zone
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Route53 HostedZone (AWS::Route53::HostedZone).
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

const HostedZoneTagSchema = z.object({
  Value: z.string().max(256).describe(
    "The value of Value depends on the operation that you want to perform: *Add a tag to a health check or hosted zone*: Value is the value that you want to give the new tag. *Edit a tag*: Value is the new value that you want to assign the tag.",
  ),
  Key: z.string().max(128).describe(
    "The value of Key depends on the operation that you want to perform: *Add a tag to a health check or hosted zone*: Key is the name that you want to give the new tag. *Edit a tag*: Key is the name of the tag that you want to change the Value for. *Delete a key*: Key is the name of the tag you want to remove. *Give a name to a health check*: Edit the default Name tag. In the Amazon Route 53 console, the list of your health checks includes a *Name* column that lets you see the name that you've given to each health check.",
  ),
});

const VPCSchema = z.object({
  VPCRegion: z.string().describe(
    "*Private hosted zones only:* The region that an Amazon VPC was created in. For public hosted zones, omit VPCs, VPCId, and VPCRegion.",
  ),
  VPCId: z.string().describe(
    "*Private hosted zones only:* The ID of an Amazon VPC. For public hosted zones, omit VPCs, VPCId, and VPCRegion.",
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
  HostedZoneTags: z.array(HostedZoneTagSchema).describe(
    "Adds, edits, or deletes tags for a health check or a hosted zone. For information about using tags for cost allocation, see [Using Cost Allocation Tags](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html) in the *User Guide*.",
  ).optional(),
  VPCs: z.array(VPCSchema).describe(
    "*Private hosted zones:* A complex type that contains information about the VPCs that are associated with the specified hosted zone. For public hosted zones, omit VPCs, VPCId, and VPCRegion.",
  ).optional(),
  HostedZoneFeatures: z.object({
    EnableAcceleratedRecovery: z.boolean().optional(),
  }).describe(
    "The features configuration for the hosted zone, including accelerated recovery settings and status information.",
  ).optional(),
  HostedZoneConfig: z.object({
    Comment: z.string().max(256).describe(
      "Any comments that you want to include about the hosted zone.",
    ).optional(),
  }).describe(
    "A complex type that contains an optional comment. If you don't want to specify a comment, omit the HostedZoneConfig and Comment elements.",
  ).optional(),
  QueryLoggingConfig: z.object({
    CloudWatchLogsLogGroupArn: z.string().describe(
      "The Amazon Resource Name (ARN) of the CloudWatch Logs log group that Amazon Route 53 is publishing logs to.",
    ),
  }).describe(
    "Creates a configuration for DNS query logging. After you create a query logging configuration, Amazon Route 53 begins to publish log data to an Amazon CloudWatch Logs log group. DNS query logs contain information about the queries that Route 53 receives for a specified public hosted zone, such as the following: Route 53 edge location that responded to the DNS query Domain or subdomain that was requested DNS record type, such as A or AAAA DNS response code, such as NoError or ServFail Log Group and Resource Policy Before you create a query logging configuration, perform the following operations. If you create a query logging configuration using the Route 53 console, Route 53 performs these operations automatically. Create a CloudWatch Logs log group, and make note of the ARN, which you specify when you create a query logging configuration. Note the following: You must create the log group in the us-east-1 region. You must use the same to create the log group and the hosted zone that you want to configure query logging for. When you create log groups for query logging, we recommend that you use a consistent prefix, for example: /aws/route53/hosted zone name In the next step, you'll create a resource policy, which controls access to one or more log groups and the associated resources, such as Route 53 hosted zones. There's a limit on the number of resource policies that you can create, so we recommend that you use a consistent prefix so you can use the same resource policy for all the log groups that you create for query logging. Create a CloudWatch Logs resource policy, and give it the permissions that Route 53 needs to create log streams and to send query logs to log streams. You must create the CloudWatch Logs resource policy in the us-east-1 region. For the value of Resource, specify the ARN for the log group that you created in the previous step. To use the same resource policy for all the CloudWatch Logs log groups that you created for query logging configurations, replace the hosted zone name with *, for example: arn:aws:logs:us-east-1:123412341234:log-group:/aws/route53/* To avoid the confused deputy problem, a security issue where an entity without a permission for an action can coerce a more-privileged entity to perform it, you can optionally limit the permissions that a service has to a resource in a resource-based policy by supplying the following values: For aws:SourceArn, supply the hosted zone ARN used in creating the query logging configuration. For example, aws:SourceArn: arn:aws:route53:::hostedzone/hosted zone ID. For aws:SourceAccount, supply the account ID for the account that creates the query logging configuration. For example, aws:SourceAccount:111111111111. For more information, see The confused deputy problem in the IAM User Guide. You can't use the CloudWatch console to create or edit a resource policy. You must use the CloudWatch API, one of the SDKs, or the. + Log Streams and Edge Locations When Route 53 finishes creating the configuration for DNS query logging, it does the following: Creates a log stream for an edge location the first time that the edge location responds to DNS queries for the specified hosted zone. That log stream is used to log all queries that Route 53 responds to for that edge location. Begins to send query logs to the applicable log stream. The name of each log stream is in the following format: hosted zone ID/edge location code The edge location code is a three-letter code and an arbitrarily assigned number, for example, DFW3. The three-letter code typically corresponds with the International Air Transport Association airport code for an airport near the edge location. (These abbreviations might change in the future.) For a list of edge locations, see \"The Route 53 Global Network\" on the Route 53 Product Details page. + Queries That Are Logged Query logs contain only the queries that DNS resolvers forward to Route 53. If a DNS resolver has already cached the response to a query (such as the IP address for a load balancer for example.com), the resolver will continue to return the cached response. It doesn't forward another query to Route 53 until the TTL for the corresponding resource record set expires. Depending on how many DNS queries are submitted for a resource record set, and depending on the TTL for that resource record set, query logs might contain information about only one query out of every several thousand queries that are submitted to DNS. For more information about how DNS works, see Routing Internet Traffic to Your Website or Web Application in the Amazon Route 53 Developer Guide. + Log File Format For a list of the values in each query log and the format of each value, see Logging DNS Queries in the Amazon Route 53 Developer Guide. + Pricing For information about charges for query logs, see Amazon CloudWatch Pricing. + How to Stop Logging If you want Route 53 to stop sending query logs to CloudWatch Logs, delete the query logging configuration. For more information, see DeleteQueryLoggingConfig.",
  ).optional(),
  Name: z.string().max(1024).describe(
    "The name of the domain. Specify a fully qualified domain name, for example, *www.example.com*. The trailing dot is optional; Amazon Route 53 assumes that the domain name is fully qualified. This means that Route 53 treats *www.example.com* (without a trailing dot) and *www.example.com.* (with a trailing dot) as identical. If you're creating a public hosted zone, this is the name you have registered with your DNS registrar. If your domain name is registered with a registrar other than Route 53, change the name servers for your domain to the set of NameServers that are returned by the Fn::GetAtt intrinsic function.",
  ).optional(),
});

const StateSchema = z.object({
  HostedZoneTags: z.array(HostedZoneTagSchema).optional(),
  VPCs: z.array(VPCSchema).optional(),
  HostedZoneFeatures: z.object({
    EnableAcceleratedRecovery: z.boolean(),
  }).optional(),
  HostedZoneConfig: z.object({
    Comment: z.string(),
  }).optional(),
  Id: z.string(),
  NameServers: z.array(z.string()).optional(),
  QueryLoggingConfig: z.object({
    CloudWatchLogsLogGroupArn: z.string(),
  }).optional(),
  Name: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  HostedZoneTags: z.array(HostedZoneTagSchema).describe(
    "Adds, edits, or deletes tags for a health check or a hosted zone. For information about using tags for cost allocation, see [Using Cost Allocation Tags](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html) in the *User Guide*.",
  ).optional(),
  VPCs: z.array(VPCSchema).describe(
    "*Private hosted zones:* A complex type that contains information about the VPCs that are associated with the specified hosted zone. For public hosted zones, omit VPCs, VPCId, and VPCRegion.",
  ).optional(),
  HostedZoneFeatures: z.object({
    EnableAcceleratedRecovery: z.boolean().optional(),
  }).describe(
    "The features configuration for the hosted zone, including accelerated recovery settings and status information.",
  ).optional(),
  HostedZoneConfig: z.object({
    Comment: z.string().max(256).describe(
      "Any comments that you want to include about the hosted zone.",
    ).optional(),
  }).describe(
    "A complex type that contains an optional comment. If you don't want to specify a comment, omit the HostedZoneConfig and Comment elements.",
  ).optional(),
  QueryLoggingConfig: z.object({
    CloudWatchLogsLogGroupArn: z.string().describe(
      "The Amazon Resource Name (ARN) of the CloudWatch Logs log group that Amazon Route 53 is publishing logs to.",
    ).optional(),
  }).describe(
    "Creates a configuration for DNS query logging. After you create a query logging configuration, Amazon Route 53 begins to publish log data to an Amazon CloudWatch Logs log group. DNS query logs contain information about the queries that Route 53 receives for a specified public hosted zone, such as the following: Route 53 edge location that responded to the DNS query Domain or subdomain that was requested DNS record type, such as A or AAAA DNS response code, such as NoError or ServFail Log Group and Resource Policy Before you create a query logging configuration, perform the following operations. If you create a query logging configuration using the Route 53 console, Route 53 performs these operations automatically. Create a CloudWatch Logs log group, and make note of the ARN, which you specify when you create a query logging configuration. Note the following: You must create the log group in the us-east-1 region. You must use the same to create the log group and the hosted zone that you want to configure query logging for. When you create log groups for query logging, we recommend that you use a consistent prefix, for example: /aws/route53/hosted zone name In the next step, you'll create a resource policy, which controls access to one or more log groups and the associated resources, such as Route 53 hosted zones. There's a limit on the number of resource policies that you can create, so we recommend that you use a consistent prefix so you can use the same resource policy for all the log groups that you create for query logging. Create a CloudWatch Logs resource policy, and give it the permissions that Route 53 needs to create log streams and to send query logs to log streams. You must create the CloudWatch Logs resource policy in the us-east-1 region. For the value of Resource, specify the ARN for the log group that you created in the previous step. To use the same resource policy for all the CloudWatch Logs log groups that you created for query logging configurations, replace the hosted zone name with *, for example: arn:aws:logs:us-east-1:123412341234:log-group:/aws/route53/* To avoid the confused deputy problem, a security issue where an entity without a permission for an action can coerce a more-privileged entity to perform it, you can optionally limit the permissions that a service has to a resource in a resource-based policy by supplying the following values: For aws:SourceArn, supply the hosted zone ARN used in creating the query logging configuration. For example, aws:SourceArn: arn:aws:route53:::hostedzone/hosted zone ID. For aws:SourceAccount, supply the account ID for the account that creates the query logging configuration. For example, aws:SourceAccount:111111111111. For more information, see The confused deputy problem in the IAM User Guide. You can't use the CloudWatch console to create or edit a resource policy. You must use the CloudWatch API, one of the SDKs, or the. + Log Streams and Edge Locations When Route 53 finishes creating the configuration for DNS query logging, it does the following: Creates a log stream for an edge location the first time that the edge location responds to DNS queries for the specified hosted zone. That log stream is used to log all queries that Route 53 responds to for that edge location. Begins to send query logs to the applicable log stream. The name of each log stream is in the following format: hosted zone ID/edge location code The edge location code is a three-letter code and an arbitrarily assigned number, for example, DFW3. The three-letter code typically corresponds with the International Air Transport Association airport code for an airport near the edge location. (These abbreviations might change in the future.) For a list of edge locations, see \"The Route 53 Global Network\" on the Route 53 Product Details page. + Queries That Are Logged Query logs contain only the queries that DNS resolvers forward to Route 53. If a DNS resolver has already cached the response to a query (such as the IP address for a load balancer for example.com), the resolver will continue to return the cached response. It doesn't forward another query to Route 53 until the TTL for the corresponding resource record set expires. Depending on how many DNS queries are submitted for a resource record set, and depending on the TTL for that resource record set, query logs might contain information about only one query out of every several thousand queries that are submitted to DNS. For more information about how DNS works, see Routing Internet Traffic to Your Website or Web Application in the Amazon Route 53 Developer Guide. + Log File Format For a list of the values in each query log and the format of each value, see Logging DNS Queries in the Amazon Route 53 Developer Guide. + Pricing For information about charges for query logs, see Amazon CloudWatch Pricing. + How to Stop Logging If you want Route 53 to stop sending query logs to CloudWatch Logs, delete the query logging configuration. For more information, see DeleteQueryLoggingConfig.",
  ).optional(),
  Name: z.string().max(1024).describe(
    "The name of the domain. Specify a fully qualified domain name, for example, *www.example.com*. The trailing dot is optional; Amazon Route 53 assumes that the domain name is fully qualified. This means that Route 53 treats *www.example.com* (without a trailing dot) and *www.example.com.* (with a trailing dot) as identical. If you're creating a public hosted zone, this is the name you have registered with your DNS registrar. If your domain name is registered with a registrar other than Route 53, change the name servers for your domain to the set of NameServers that are returned by the Fn::GetAtt intrinsic function.",
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

/** Swamp extension model for Route53 HostedZone. Registered at `@swamp/aws/route53/hosted-zone`. */
export const model = {
  type: "@swamp/aws/route53/hosted-zone",
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
      description: "Route53 HostedZone resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Route53 HostedZone",
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
          "AWS::Route53::HostedZone",
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
      description: "Get a Route53 HostedZone",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Route53 HostedZone",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Route53::HostedZone",
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
      description: "Update a Route53 HostedZone",
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
          "AWS::Route53::HostedZone",
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
          "AWS::Route53::HostedZone",
          identifier,
          currentState,
          desiredState,
          ["Name"],
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
      description: "Delete a Route53 HostedZone",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Route53 HostedZone",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Route53::HostedZone",
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
      description: "Sync Route53 HostedZone state from AWS",
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
            "AWS::Route53::HostedZone",
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
