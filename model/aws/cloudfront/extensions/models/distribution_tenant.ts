// Auto-generated extension model for @swamp/aws/cloudfront/distribution-tenant
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CloudFront DistributionTenant (AWS::CloudFront::DistributionTenant).
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
  Key: z.string().describe(
    "A string that contains Tag key. The string length should be between 1 and 128 characters. Valid characters include a-z, A-Z, 0-9, space, and the special characters _ -.: / = + @.",
  ),
  Value: z.string().describe(
    "A string that contains an optional Tag value. The string length should be between 0 and 256 characters. Valid characters include a-z, A-Z, 0-9, space, and the special characters _ -.: / = + @.",
  ),
});

const WebAclCustomizationSchema = z.object({
  Action: z.enum(["override", "disable"]).describe(
    "The action for the WAF web ACL customization. You can specify override to specify a separate WAF web ACL for the distribution tenant. If you specify disable, the distribution tenant won't have WAF web ACL protections and won't inherit from the multi-tenant distribution.",
  ).optional(),
});

const GeoRestrictionCustomizationSchema = z.object({
  RestrictionType: z.enum(["blacklist", "whitelist", "none"]).describe(
    "The method that you want to use to restrict distribution of your content by country: none: No geographic restriction is enabled, meaning access to content is not restricted by client geo location. blacklist: The Location elements specify the countries in which you don't want CloudFront to distribute your content. whitelist: The Location elements specify the countries in which you want CloudFront to distribute your content.",
  ).optional(),
  Locations: z.array(z.string()).describe(
    "The locations for geographic restrictions.",
  ).optional(),
});

const ParameterSchema = z.object({
  Name: z.string().describe("The parameter name.").optional(),
  Value: z.string().describe("The parameter value.").optional(),
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
  DistributionId: z.string().describe(
    "The ID of the multi-tenant distribution.",
  ),
  Name: z.string().describe("The name of the distribution tenant."),
  Tags: z.array(TagSchema).describe(
    "A complex type that contains zero or more Tag elements.",
  ).optional(),
  Customizations: z.object({
    WebAcl: WebAclCustomizationSchema.describe("The WAF web ACL.").optional(),
    GeoRestrictions: GeoRestrictionCustomizationSchema.describe(
      "The geographic restrictions.",
    ).optional(),
  }).describe(
    "Customizations for the distribution tenant. For each distribution tenant, you can specify the geographic restrictions, and the Amazon Resource Names (ARNs) for the ACM certificate and WAF web ACL. These are specific values that you can override or disable from the multi-tenant distribution that was used to create the distribution tenant.",
  ).optional(),
  Parameters: z.array(ParameterSchema).describe(
    "A list of parameter values to add to the resource. A parameter is specified as a key-value pair. A valid parameter value must exist for any parameter that is marked as required in the multi-tenant distribution.",
  ).optional(),
  ConnectionGroupId: z.string().describe(
    "The ID of the connection group for the distribution tenant. If you don't specify a connection group, CloudFront uses the default connection group.",
  ).optional(),
  Enabled: z.boolean().describe(
    "Indicates whether the distribution tenant is in an enabled state. If disabled, the distribution tenant won't serve traffic.",
  ).optional(),
  Domains: z.array(z.string()).describe(
    "The domains associated with the distribution tenant.",
  ),
  ManagedCertificateRequest: z.object({
    ValidationTokenHost: z.enum(["cloudfront", "self-hosted"]).describe(
      "Specify how the HTTP validation token will be served when requesting the CloudFront managed ACM certificate. For cloudfront, CloudFront will automatically serve the validation token. Choose this mode if you can point the domain's DNS to CloudFront immediately. For self-hosted, you serve the validation token from your existing infrastructure. Choose this mode when you need to maintain current traffic flow while your certificate is being issued. You can place the validation token at the well-known path on your existing web server, wait for ACM to validate and issue the certificate, and then update your DNS to point to CloudFront.",
    ).optional(),
    PrimaryDomainName: z.string().describe(
      "The primary domain name associated with the CloudFront managed ACM certificate.",
    ).optional(),
    CertificateTransparencyLoggingPreference: z.enum(["enabled", "disabled"])
      .describe(
        "You can opt out of certificate transparency logging by specifying the disabled option. Opt in by specifying enabled. For more information, see [Certificate Transparency Logging](https://docs.aws.amazon.com/acm/latest/userguide/acm-concepts.html#concept-transparency) in the *User Guide*.",
      ).optional(),
  }).describe(
    "An object that represents the request for the Amazon CloudFront managed ACM certificate.",
  ).optional(),
});

const StateSchema = z.object({
  Id: z.string(),
  DistributionId: z.string().optional(),
  Name: z.string().optional(),
  Arn: z.string().optional(),
  DomainResults: z.array(z.object({
    Domain: z.string(),
    Status: z.string(),
  })).optional(),
  Tags: z.array(TagSchema).optional(),
  Customizations: z.object({
    WebAcl: WebAclCustomizationSchema,
    Certificate: z.object({
      Arn: z.string(),
    }),
    GeoRestrictions: GeoRestrictionCustomizationSchema,
  }).optional(),
  Parameters: z.array(ParameterSchema).optional(),
  ConnectionGroupId: z.string().optional(),
  CreatedTime: z.string().optional(),
  LastModifiedTime: z.string().optional(),
  Enabled: z.boolean().optional(),
  Status: z.string().optional(),
  ETag: z.string().optional(),
  Domains: z.array(z.string()).optional(),
  ManagedCertificateRequest: z.object({
    ValidationTokenHost: z.string(),
    PrimaryDomainName: z.string(),
    CertificateTransparencyLoggingPreference: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DistributionId: z.string().describe(
    "The ID of the multi-tenant distribution.",
  ).optional(),
  Name: z.string().describe("The name of the distribution tenant.").optional(),
  Tags: z.array(TagSchema).describe(
    "A complex type that contains zero or more Tag elements.",
  ).optional(),
  Customizations: z.object({
    WebAcl: WebAclCustomizationSchema.describe("The WAF web ACL.").optional(),
    GeoRestrictions: GeoRestrictionCustomizationSchema.describe(
      "The geographic restrictions.",
    ).optional(),
  }).describe(
    "Customizations for the distribution tenant. For each distribution tenant, you can specify the geographic restrictions, and the Amazon Resource Names (ARNs) for the ACM certificate and WAF web ACL. These are specific values that you can override or disable from the multi-tenant distribution that was used to create the distribution tenant.",
  ).optional(),
  Parameters: z.array(ParameterSchema).describe(
    "A list of parameter values to add to the resource. A parameter is specified as a key-value pair. A valid parameter value must exist for any parameter that is marked as required in the multi-tenant distribution.",
  ).optional(),
  ConnectionGroupId: z.string().describe(
    "The ID of the connection group for the distribution tenant. If you don't specify a connection group, CloudFront uses the default connection group.",
  ).optional(),
  Enabled: z.boolean().describe(
    "Indicates whether the distribution tenant is in an enabled state. If disabled, the distribution tenant won't serve traffic.",
  ).optional(),
  Domains: z.array(z.string()).describe(
    "The domains associated with the distribution tenant.",
  ).optional(),
  ManagedCertificateRequest: z.object({
    ValidationTokenHost: z.enum(["cloudfront", "self-hosted"]).describe(
      "Specify how the HTTP validation token will be served when requesting the CloudFront managed ACM certificate. For cloudfront, CloudFront will automatically serve the validation token. Choose this mode if you can point the domain's DNS to CloudFront immediately. For self-hosted, you serve the validation token from your existing infrastructure. Choose this mode when you need to maintain current traffic flow while your certificate is being issued. You can place the validation token at the well-known path on your existing web server, wait for ACM to validate and issue the certificate, and then update your DNS to point to CloudFront.",
    ).optional(),
    PrimaryDomainName: z.string().describe(
      "The primary domain name associated with the CloudFront managed ACM certificate.",
    ).optional(),
    CertificateTransparencyLoggingPreference: z.enum(["enabled", "disabled"])
      .describe(
        "You can opt out of certificate transparency logging by specifying the disabled option. Opt in by specifying enabled. For more information, see [Certificate Transparency Logging](https://docs.aws.amazon.com/acm/latest/userguide/acm-concepts.html#concept-transparency) in the *User Guide*.",
      ).optional(),
  }).describe(
    "An object that represents the request for the Amazon CloudFront managed ACM certificate.",
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

/** Swamp extension model for CloudFront DistributionTenant. Registered at `@swamp/aws/cloudfront/distribution-tenant`. */
export const model = {
  type: "@swamp/aws/cloudfront/distribution-tenant",
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
      description: "CloudFront DistributionTenant resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CloudFront DistributionTenant",
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
          "AWS::CloudFront::DistributionTenant",
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
      description: "Get a CloudFront DistributionTenant",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFront DistributionTenant",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CloudFront::DistributionTenant",
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
      description: "Update a CloudFront DistributionTenant",
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
          "AWS::CloudFront::DistributionTenant",
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
          "AWS::CloudFront::DistributionTenant",
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
      description: "Delete a CloudFront DistributionTenant",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFront DistributionTenant",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CloudFront::DistributionTenant",
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
      description: "Sync CloudFront DistributionTenant state from AWS",
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
            "AWS::CloudFront::DistributionTenant",
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
