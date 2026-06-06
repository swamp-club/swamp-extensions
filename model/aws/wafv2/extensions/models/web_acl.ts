// Auto-generated extension model for @swamp/aws/wafv2/web-acl
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for WAFv2 WebACL (AWS::WAFv2::WebACL).
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

const CustomHTTPHeaderSchema = z.object({
  Name: z.string().min(1).max(64).describe("HTTP header name."),
  Value: z.string().min(1).max(255).describe("HTTP header value."),
});

const CustomRequestHandlingSchema = z.object({
  InsertHeaders: z.array(CustomHTTPHeaderSchema).describe(
    "Collection of HTTP headers.",
  ),
});

const AllowActionSchema = z.object({
  CustomRequestHandling: CustomRequestHandlingSchema.describe(
    "Custom request handling.",
  ).optional(),
});

const CustomResponseSchema = z.object({
  ResponseCode: z.number().int().min(200).max(599).describe(
    "Custom response code.",
  ),
  CustomResponseBodyKey: z.string().regex(new RegExp("^[\\w\\-]+$")).describe(
    "Custom response body key.",
  ).optional(),
  ResponseHeaders: z.array(CustomHTTPHeaderSchema).describe(
    "Collection of HTTP headers.",
  ).optional(),
});

const BlockActionSchema = z.object({
  CustomResponse: CustomResponseSchema.describe("Custom response.").optional(),
});

const FieldToProtectSchema = z.object({
  FieldType: z.enum([
    "SINGLE_HEADER",
    "SINGLE_COOKIE",
    "SINGLE_QUERY_ARGUMENT",
    "QUERY_STRING",
    "BODY",
  ]).describe("Field type to protect"),
  FieldKeys: z.array(z.string().min(1).max(64)).describe(
    "List of field keys to protect",
  ).optional(),
});

const DataProtectSchema = z.object({
  Field: FieldToProtectSchema.describe("Field in log to protect."),
  Action: z.enum(["SUBSTITUTION", "HASH"]),
  ExcludeRuleMatchDetails: z.boolean().optional(),
  ExcludeRateBasedDetails: z.boolean().optional(),
});

const ApplicationAttributeSchema = z.object({
  Name: z.string().min(1).max(64).regex(new RegExp("^[\\w\\-]+$")).describe(
    "Specifies the attribute name.",
  ),
  Values: z.array(z.string().min(1).max(64).regex(new RegExp("^[\\w\\-]+$")))
    .describe("Contains a list of values for that attribute"),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).optional(),
  Value: z.string().min(0).max(256).optional(),
});

const CustomResponseBodySchema = z.object({
  ContentType: z.enum(["TEXT_PLAIN", "TEXT_HTML", "APPLICATION_JSON"]).describe(
    "Valid values are TEXT_PLAIN, TEXT_HTML, and APPLICATION_JSON.",
  ),
  Content: z.string().min(1).max(10240).describe("Response content."),
});

const ImmunityTimePropertySchema = z.object({
  ImmunityTime: z.number().int().min(60).max(259200),
});

const RequestBodyAssociatedResourceTypeConfigSchema = z.object({
  DefaultSizeInspectionLimit: z.enum(["KB_16", "KB_32", "KB_48", "KB_64"]),
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
  DefaultAction: z.object({
    Allow: AllowActionSchema.describe("Allow traffic towards application.")
      .optional(),
    Block: BlockActionSchema.describe("Block traffic towards application.")
      .optional(),
  }).describe(
    "Default Action WebACL will take against ingress traffic when there is no matching Rule.",
  ),
  Description: z.string().regex(
    new RegExp(
      "^[a-zA-Z0-9=:#@/\\-,.][a-zA-Z0-9+=:#@/\\-,.\\s]+[a-zA-Z0-9+=:#@/\\-,.]{1,256}$",
    ),
  ).describe("Description of the entity.").optional(),
  Name: z.string().regex(new RegExp("^[0-9A-Za-z_-]{1,128}$")).describe(
    "Name of the WebACL.",
  ).optional(),
  Scope: z.enum(["CLOUDFRONT", "REGIONAL"]).describe(
    "Use CLOUDFRONT for CloudFront WebACL, use REGIONAL for Application Load Balancer and API Gateway.",
  ),
  Rules: z.array(z.string()).describe("Collection of Rules.").optional(),
  VisibilityConfig: z.object({
    SampledRequestsEnabled: z.boolean(),
    CloudWatchMetricsEnabled: z.boolean(),
    MetricName: z.string().min(1).max(128),
  }).describe("Visibility Metric of the WebACL."),
  DataProtectionConfig: z.object({
    DataProtections: z.array(DataProtectSchema),
  }).describe("Collection of dataProtects.").optional(),
  ApplicationConfig: z.object({
    Attributes: z.array(ApplicationAttributeSchema).describe(
      "Contains the attribute name and a list of values for that attribute.",
    ),
  }).describe("Collection of application attributes.").optional(),
  Tags: z.array(TagSchema).optional(),
  CustomResponseBodies: z.record(z.string(), CustomResponseBodySchema).describe(
    "Custom response key and body map.",
  ).optional(),
  CaptchaConfig: z.object({
    ImmunityTimeProperty: ImmunityTimePropertySchema.optional(),
  }).optional(),
  ChallengeConfig: z.object({
    ImmunityTimeProperty: ImmunityTimePropertySchema.optional(),
  }).optional(),
  TokenDomains: z.array(
    z.string().min(1).max(253).regex(new RegExp("^[\\w\\.\\-/]+$")),
  ).describe(
    "List of domains to accept in web request tokens, in addition to the domain of the protected resource.",
  ).optional(),
  AssociationConfig: z.object({
    RequestBody: z.record(
      z.string(),
      RequestBodyAssociatedResourceTypeConfigSchema,
    ).describe(
      "Map of AssociatedResourceType and RequestBodyAssociatedResourceTypeConfig",
    ).optional(),
  }).describe("AssociationConfig for body inspection").optional(),
  OnSourceDDoSProtectionConfig: z.object({
    ALBLowReputationMode: z.enum(["ACTIVE_UNDER_DDOS", "ALWAYS_ON"]),
  }).describe(
    "Configures the options for on-source DDoS protection provided by supported resource type.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  Capacity: z.number().optional(),
  DefaultAction: z.object({
    Allow: AllowActionSchema,
    Block: BlockActionSchema,
  }).optional(),
  Description: z.string().optional(),
  Name: z.string(),
  Id: z.string(),
  Scope: z.string(),
  Rules: z.array(z.string()).optional(),
  VisibilityConfig: z.object({
    SampledRequestsEnabled: z.boolean(),
    CloudWatchMetricsEnabled: z.boolean(),
    MetricName: z.string(),
  }).optional(),
  DataProtectionConfig: z.object({
    DataProtections: z.array(DataProtectSchema),
  }).optional(),
  ApplicationConfig: z.object({
    Attributes: z.array(ApplicationAttributeSchema),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  LabelNamespace: z.string().optional(),
  CustomResponseBodies: z.record(z.string(), z.unknown()).optional(),
  CaptchaConfig: z.object({
    ImmunityTimeProperty: ImmunityTimePropertySchema,
  }).optional(),
  ChallengeConfig: z.object({
    ImmunityTimeProperty: ImmunityTimePropertySchema,
  }).optional(),
  TokenDomains: z.array(z.string()).optional(),
  AssociationConfig: z.object({
    RequestBody: z.record(z.string(), z.unknown()),
  }).optional(),
  OnSourceDDoSProtectionConfig: z.object({
    ALBLowReputationMode: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DefaultAction: z.object({
    Allow: AllowActionSchema.describe("Allow traffic towards application.")
      .optional(),
    Block: BlockActionSchema.describe("Block traffic towards application.")
      .optional(),
  }).describe(
    "Default Action WebACL will take against ingress traffic when there is no matching Rule.",
  ).optional(),
  Description: z.string().regex(
    new RegExp(
      "^[a-zA-Z0-9=:#@/\\-,.][a-zA-Z0-9+=:#@/\\-,.\\s]+[a-zA-Z0-9+=:#@/\\-,.]{1,256}$",
    ),
  ).describe("Description of the entity.").optional(),
  Name: z.string().regex(new RegExp("^[0-9A-Za-z_-]{1,128}$")).describe(
    "Name of the WebACL.",
  ).optional(),
  Scope: z.enum(["CLOUDFRONT", "REGIONAL"]).describe(
    "Use CLOUDFRONT for CloudFront WebACL, use REGIONAL for Application Load Balancer and API Gateway.",
  ).optional(),
  Rules: z.array(z.string()).describe("Collection of Rules.").optional(),
  VisibilityConfig: z.object({
    SampledRequestsEnabled: z.boolean().optional(),
    CloudWatchMetricsEnabled: z.boolean().optional(),
    MetricName: z.string().min(1).max(128).optional(),
  }).describe("Visibility Metric of the WebACL.").optional(),
  DataProtectionConfig: z.object({
    DataProtections: z.array(DataProtectSchema).optional(),
  }).describe("Collection of dataProtects.").optional(),
  ApplicationConfig: z.object({
    Attributes: z.array(ApplicationAttributeSchema).describe(
      "Contains the attribute name and a list of values for that attribute.",
    ).optional(),
  }).describe("Collection of application attributes.").optional(),
  Tags: z.array(TagSchema).optional(),
  CustomResponseBodies: z.record(z.string(), CustomResponseBodySchema).describe(
    "Custom response key and body map.",
  ).optional(),
  CaptchaConfig: z.object({
    ImmunityTimeProperty: ImmunityTimePropertySchema.optional(),
  }).optional(),
  ChallengeConfig: z.object({
    ImmunityTimeProperty: ImmunityTimePropertySchema.optional(),
  }).optional(),
  TokenDomains: z.array(
    z.string().min(1).max(253).regex(new RegExp("^[\\w\\.\\-/]+$")),
  ).describe(
    "List of domains to accept in web request tokens, in addition to the domain of the protected resource.",
  ).optional(),
  AssociationConfig: z.object({
    RequestBody: z.record(
      z.string(),
      RequestBodyAssociatedResourceTypeConfigSchema,
    ).describe(
      "Map of AssociatedResourceType and RequestBodyAssociatedResourceTypeConfig",
    ).optional(),
  }).describe("AssociationConfig for body inspection").optional(),
  OnSourceDDoSProtectionConfig: z.object({
    ALBLowReputationMode: z.enum(["ACTIVE_UNDER_DDOS", "ALWAYS_ON"]).optional(),
  }).describe(
    "Configures the options for on-source DDoS protection provided by supported resource type.",
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

/** Swamp extension model for WAFv2 WebACL. Registered at `@swamp/aws/wafv2/web-acl`. */
export const model = {
  type: "@swamp/aws/wafv2/web-acl",
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
      description: "WAFv2 WebACL resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a WAFv2 WebACL",
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
          "AWS::WAFv2::WebACL",
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
      description: "Get a WAFv2 WebACL",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WAFv2 WebACL",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::WAFv2::WebACL",
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
      description: "Update a WAFv2 WebACL",
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
          existing.Id?.toString(),
          existing.Scope?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::WAFv2::WebACL",
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
          "AWS::WAFv2::WebACL",
          identifier,
          currentState,
          desiredState,
          ["Name", "Scope"],
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
      description: "Delete a WAFv2 WebACL",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WAFv2 WebACL",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::WAFv2::WebACL",
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
      description: "Sync WAFv2 WebACL state from AWS",
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
          existing.Id?.toString(),
          existing.Scope?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::WAFv2::WebACL",
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
