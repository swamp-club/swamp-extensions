// Auto-generated extension model for @swamp/aws/grafana/workspace
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Grafana Workspace (AWS::Grafana::Workspace).
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

const IdpMetadataSchema = z.object({
  Url: z.string().min(1).max(2048).describe("URL that vends the IdPs metadata.")
    .optional(),
  Xml: z.string().describe("XML blob of the IdPs metadata.").optional(),
});

const AssertionAttributesSchema = z.object({
  Name: z.string().min(1).max(256).describe(
    "Name of the attribute within the SAML assert to use as the users name in Grafana.",
  ).optional(),
  Login: z.string().min(1).max(256).describe(
    "Name of the attribute within the SAML assert to use as the users login handle in Grafana.",
  ).optional(),
  Email: z.string().min(1).max(256).describe(
    "Name of the attribute within the SAML assert to use as the users email in Grafana.",
  ).optional(),
  Groups: z.string().min(1).max(256).describe(
    "Name of the attribute within the SAML assert to use as the users groups in Grafana.",
  ).optional(),
  Role: z.string().min(1).max(256).describe(
    "Name of the attribute within the SAML assert to use as the users roles in Grafana.",
  ).optional(),
  Org: z.string().min(1).max(256).describe(
    "Name of the attribute within the SAML assert to use as the users organizations in Grafana.",
  ).optional(),
});

const RoleValuesSchema = z.object({
  Editor: z.array(z.string().min(1).max(256)).describe(
    "List of SAML roles which will be mapped into the Grafana Editor role.",
  ).optional(),
  Admin: z.array(z.string().min(1).max(256)).describe(
    "List of SAML roles which will be mapped into the Grafana Admin role.",
  ).optional(),
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
  AuthenticationProviders: z.array(z.enum(["AWS_SSO", "SAML"])).describe(
    "List of authentication providers to enable.",
  ),
  SamlConfiguration: z.object({
    IdpMetadata: IdpMetadataSchema.describe(
      "IdP Metadata used to configure SAML authentication in Grafana.",
    ),
    AssertionAttributes: AssertionAttributesSchema.describe(
      "Maps Grafana friendly names to the IdPs SAML attributes.",
    ).optional(),
    RoleValues: RoleValuesSchema.describe(
      "Maps SAML roles to the Grafana Editor and Admin roles.",
    ).optional(),
    AllowedOrganizations: z.array(z.string().min(1).max(256)).describe(
      "List of SAML organizations allowed to access Grafana.",
    ).optional(),
    LoginValidityDuration: z.number().describe(
      "The maximum lifetime an authenticated user can be logged in (in minutes) before being required to re-authenticate.",
    ).optional(),
  }).describe("SAML configuration data associated with an AMG workspace.")
    .optional(),
  NetworkAccessControl: z.object({
    PrefixListIds: z.array(z.string().min(1)).describe(
      "The list of prefix list IDs. A prefix list is a list of CIDR ranges of IP addresses. The IP addresses specified are allowed to access your workspace. If the list is not included in the configuration then no IP addresses will be allowed to access the workspace.",
    ).optional(),
    VpceIds: z.array(z.string().min(1)).describe(
      "The list of Amazon VPC endpoint IDs for the workspace. If a NetworkAccessConfiguration is specified then only VPC endpoints specified here will be allowed to access the workspace.",
    ).optional(),
  }).describe("The configuration settings for Network Access Control.")
    .optional(),
  VpcConfiguration: z.object({
    SecurityGroupIds: z.array(z.string().min(1).max(255)).describe(
      "The list of Amazon EC2 security group IDs attached to the Amazon VPC for your Grafana workspace to connect.",
    ),
    SubnetIds: z.array(z.string().min(1).max(255)).describe(
      "The list of Amazon EC2 subnet IDs created in the Amazon VPC for your Grafana workspace to connect.",
    ),
  }).describe(
    "The configuration settings for an Amazon VPC that contains data sources for your Grafana workspace to connect to.",
  ).optional(),
  ClientToken: z.string().regex(new RegExp("^[!-~]{1,64}$")).describe(
    "A unique, case-sensitive, user-provided identifier to ensure the idempotency of the request.",
  ).optional(),
  GrafanaVersion: z.string().min(1).max(255).describe(
    "The version of Grafana to support in your workspace.",
  ).optional(),
  AccountAccessType: z.enum(["CURRENT_ACCOUNT", "ORGANIZATION"]).describe(
    "These enums represent valid account access types. Specifically these enums determine whether the workspace can access AWS resources in the AWS account only, or whether it can also access resources in other accounts in the same organization. If the value CURRENT_ACCOUNT is used, a workspace role ARN must be provided. If the value is ORGANIZATION, a list of organizational units must be provided.",
  ),
  OrganizationRoleName: z.string().min(1).max(2048).describe(
    "The name of an IAM role that already exists to use with AWS Organizations to access AWS data sources and notification channels in other accounts in an organization.",
  ).optional(),
  PermissionType: z.enum(["CUSTOMER_MANAGED", "SERVICE_MANAGED"]).describe(
    "These enums represent valid permission types to use when creating or configuring a Grafana workspace. The SERVICE_MANAGED permission type means the Managed Grafana service will create a workspace IAM role on your behalf. The CUSTOMER_MANAGED permission type means that the customer is expected to provide an IAM role that the Grafana workspace can use to query data sources.",
  ),
  StackSetName: z.string().describe(
    "The name of the AWS CloudFormation stack set to use to generate IAM roles to be used for this workspace.",
  ).optional(),
  DataSources: z.array(
    z.enum([
      "AMAZON_OPENSEARCH_SERVICE",
      "CLOUDWATCH",
      "PROMETHEUS",
      "XRAY",
      "TIMESTREAM",
      "SITEWISE",
      "ATHENA",
      "REDSHIFT",
    ]),
  ).describe("List of data sources on the service managed IAM role.")
    .optional(),
  Description: z.string().min(0).max(2048).describe(
    "Description of a workspace.",
  ).optional(),
  Name: z.string().regex(new RegExp("^[a-zA-Z0-9-._~]{1,255}$")).describe(
    "The user friendly name of a workspace.",
  ).optional(),
  NotificationDestinations: z.array(z.enum(["SNS"])).describe(
    "List of notification destinations on the customers service managed IAM role that the Grafana workspace can query.",
  ).optional(),
  OrganizationalUnits: z.array(z.string()).describe(
    "List of Organizational Units containing AWS accounts the Grafana workspace can pull data from.",
  ).optional(),
  RoleArn: z.string().min(1).max(2048).describe(
    "IAM Role that will be used to grant the Grafana workspace access to a customers AWS resources.",
  ).optional(),
  PluginAdminEnabled: z.boolean().describe(
    "Allow workspace admins to install plugins",
  ).optional(),
});

const StateSchema = z.object({
  AuthenticationProviders: z.array(z.string()).optional(),
  SsoClientId: z.string().optional(),
  SamlConfiguration: z.object({
    IdpMetadata: IdpMetadataSchema,
    AssertionAttributes: AssertionAttributesSchema,
    RoleValues: RoleValuesSchema,
    AllowedOrganizations: z.array(z.string()),
    LoginValidityDuration: z.number(),
  }).optional(),
  NetworkAccessControl: z.object({
    PrefixListIds: z.array(z.string()),
    VpceIds: z.array(z.string()),
  }).optional(),
  VpcConfiguration: z.object({
    SecurityGroupIds: z.array(z.string()),
    SubnetIds: z.array(z.string()),
  }).optional(),
  SamlConfigurationStatus: z.string().optional(),
  ClientToken: z.string().optional(),
  Status: z.string().optional(),
  CreationTimestamp: z.string().optional(),
  ModificationTimestamp: z.string().optional(),
  GrafanaVersion: z.string().optional(),
  Endpoint: z.string().optional(),
  AccountAccessType: z.string().optional(),
  OrganizationRoleName: z.string().optional(),
  PermissionType: z.string().optional(),
  StackSetName: z.string().optional(),
  DataSources: z.array(z.string()).optional(),
  Description: z.string().optional(),
  Id: z.string(),
  Name: z.string().optional(),
  NotificationDestinations: z.array(z.string()).optional(),
  OrganizationalUnits: z.array(z.string()).optional(),
  RoleArn: z.string().optional(),
  PluginAdminEnabled: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AuthenticationProviders: z.array(z.enum(["AWS_SSO", "SAML"])).describe(
    "List of authentication providers to enable.",
  ).optional(),
  SamlConfiguration: z.object({
    IdpMetadata: IdpMetadataSchema.describe(
      "IdP Metadata used to configure SAML authentication in Grafana.",
    ).optional(),
    AssertionAttributes: AssertionAttributesSchema.describe(
      "Maps Grafana friendly names to the IdPs SAML attributes.",
    ).optional(),
    RoleValues: RoleValuesSchema.describe(
      "Maps SAML roles to the Grafana Editor and Admin roles.",
    ).optional(),
    AllowedOrganizations: z.array(z.string().min(1).max(256)).describe(
      "List of SAML organizations allowed to access Grafana.",
    ).optional(),
    LoginValidityDuration: z.number().describe(
      "The maximum lifetime an authenticated user can be logged in (in minutes) before being required to re-authenticate.",
    ).optional(),
  }).describe("SAML configuration data associated with an AMG workspace.")
    .optional(),
  NetworkAccessControl: z.object({
    PrefixListIds: z.array(z.string().min(1)).describe(
      "The list of prefix list IDs. A prefix list is a list of CIDR ranges of IP addresses. The IP addresses specified are allowed to access your workspace. If the list is not included in the configuration then no IP addresses will be allowed to access the workspace.",
    ).optional(),
    VpceIds: z.array(z.string().min(1)).describe(
      "The list of Amazon VPC endpoint IDs for the workspace. If a NetworkAccessConfiguration is specified then only VPC endpoints specified here will be allowed to access the workspace.",
    ).optional(),
  }).describe("The configuration settings for Network Access Control.")
    .optional(),
  VpcConfiguration: z.object({
    SecurityGroupIds: z.array(z.string().min(1).max(255)).describe(
      "The list of Amazon EC2 security group IDs attached to the Amazon VPC for your Grafana workspace to connect.",
    ).optional(),
    SubnetIds: z.array(z.string().min(1).max(255)).describe(
      "The list of Amazon EC2 subnet IDs created in the Amazon VPC for your Grafana workspace to connect.",
    ).optional(),
  }).describe(
    "The configuration settings for an Amazon VPC that contains data sources for your Grafana workspace to connect to.",
  ).optional(),
  ClientToken: z.string().regex(new RegExp("^[!-~]{1,64}$")).describe(
    "A unique, case-sensitive, user-provided identifier to ensure the idempotency of the request.",
  ).optional(),
  GrafanaVersion: z.string().min(1).max(255).describe(
    "The version of Grafana to support in your workspace.",
  ).optional(),
  AccountAccessType: z.enum(["CURRENT_ACCOUNT", "ORGANIZATION"]).describe(
    "These enums represent valid account access types. Specifically these enums determine whether the workspace can access AWS resources in the AWS account only, or whether it can also access resources in other accounts in the same organization. If the value CURRENT_ACCOUNT is used, a workspace role ARN must be provided. If the value is ORGANIZATION, a list of organizational units must be provided.",
  ).optional(),
  OrganizationRoleName: z.string().min(1).max(2048).describe(
    "The name of an IAM role that already exists to use with AWS Organizations to access AWS data sources and notification channels in other accounts in an organization.",
  ).optional(),
  PermissionType: z.enum(["CUSTOMER_MANAGED", "SERVICE_MANAGED"]).describe(
    "These enums represent valid permission types to use when creating or configuring a Grafana workspace. The SERVICE_MANAGED permission type means the Managed Grafana service will create a workspace IAM role on your behalf. The CUSTOMER_MANAGED permission type means that the customer is expected to provide an IAM role that the Grafana workspace can use to query data sources.",
  ).optional(),
  StackSetName: z.string().describe(
    "The name of the AWS CloudFormation stack set to use to generate IAM roles to be used for this workspace.",
  ).optional(),
  DataSources: z.array(
    z.enum([
      "AMAZON_OPENSEARCH_SERVICE",
      "CLOUDWATCH",
      "PROMETHEUS",
      "XRAY",
      "TIMESTREAM",
      "SITEWISE",
      "ATHENA",
      "REDSHIFT",
    ]),
  ).describe("List of data sources on the service managed IAM role.")
    .optional(),
  Description: z.string().min(0).max(2048).describe(
    "Description of a workspace.",
  ).optional(),
  Name: z.string().regex(new RegExp("^[a-zA-Z0-9-._~]{1,255}$")).describe(
    "The user friendly name of a workspace.",
  ).optional(),
  NotificationDestinations: z.array(z.enum(["SNS"])).describe(
    "List of notification destinations on the customers service managed IAM role that the Grafana workspace can query.",
  ).optional(),
  OrganizationalUnits: z.array(z.string()).describe(
    "List of Organizational Units containing AWS accounts the Grafana workspace can pull data from.",
  ).optional(),
  RoleArn: z.string().min(1).max(2048).describe(
    "IAM Role that will be used to grant the Grafana workspace access to a customers AWS resources.",
  ).optional(),
  PluginAdminEnabled: z.boolean().describe(
    "Allow workspace admins to install plugins",
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

/** Swamp extension model for Grafana Workspace. Registered at `@swamp/aws/grafana/workspace`. */
export const model = {
  type: "@swamp/aws/grafana/workspace",
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
      description: "Grafana Workspace resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Grafana Workspace",
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
          "AWS::Grafana::Workspace",
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
      description: "Get a Grafana Workspace",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Grafana Workspace",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Grafana::Workspace",
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
      description: "Update a Grafana Workspace",
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
          "AWS::Grafana::Workspace",
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
          "AWS::Grafana::Workspace",
          identifier,
          currentState,
          desiredState,
          ["ClientToken"],
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
      description: "Delete a Grafana Workspace",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Grafana Workspace",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Grafana::Workspace",
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
      description: "Sync Grafana Workspace state from AWS",
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
            "AWS::Grafana::Workspace",
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
