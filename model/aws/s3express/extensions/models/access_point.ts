// Auto-generated extension model for @swamp/aws/s3express/access-point
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for S3Express AccessPoint (AWS::S3Express::AccessPoint).
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

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:.*)([\\p{L}\\p{Z}\\p{N}_.:=+\\/\\-@%]*)$", "u"),
  ),
  Value: z.string().min(0).max(256).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:=+\\/\\-@%]*)$", "u"),
  ),
});

const GlobalArgsSchema = z.object({
  Name: z.string().min(3).max(50).regex(
    new RegExp("^[a-z0-9]([a-z0-9\\-]*[a-z0-9])?$"),
  ).describe(
    "The name you want to assign to this Access Point. If you don't specify a name, AWS CloudFormation generates a unique ID and uses that ID for the access point name. For directory buckets, the access point name must consist of a base name that you provide and suﬃx that includes the ZoneID (AWS Availability Zone or Local Zone) of your bucket location, followed by --xa-s3.",
  ).optional(),
  Bucket: z.string().min(3).max(255).describe(
    "The name of the bucket that you want to associate this Access Point with.",
  ),
  BucketAccountId: z.string().max(64).regex(new RegExp("^\\d{12}$")).describe(
    "The AWS account ID associated with the S3 bucket associated with this access point.",
  ).optional(),
  VpcConfiguration: z.object({
    VpcId: z.string().min(1).max(1024).describe(
      "If this field is specified, this access point will only allow connections from the specified VPC ID.",
    ).optional(),
  }).describe(
    "If you include this field, Amazon S3 restricts access to this Access Point to requests from the specified Virtual Private Cloud (VPC).",
  ).optional(),
  PublicAccessBlockConfiguration: z.object({
    BlockPublicAcls: z.boolean().describe(
      "Specifies whether Amazon S3 should block public access control lists (ACLs) for buckets in this account. Setting this element to TRUE causes the following behavior: - PUT Bucket acl and PUT Object acl calls fail if the specified ACL is public. - PUT Object calls fail if the request includes a public ACL.. - PUT Bucket calls fail if the request includes a public ACL. Enabling this setting doesn't affect existing policies or ACLs.",
    ).optional(),
    IgnorePublicAcls: z.boolean().describe(
      "Specifies whether Amazon S3 should ignore public ACLs for buckets in this account. Setting this element to TRUE causes Amazon S3 to ignore all public ACLs on buckets in this account and any objects that they contain. Enabling this setting doesn't affect the persistence of any existing ACLs and doesn't prevent new public ACLs from being set.",
    ).optional(),
    BlockPublicPolicy: z.boolean().describe(
      "Specifies whether Amazon S3 should block public bucket policies for buckets in this account. Setting this element to TRUE causes Amazon S3 to reject calls to PUT Bucket policy if the specified bucket policy allows public access. Enabling this setting doesn't affect existing bucket policies.",
    ).optional(),
    RestrictPublicBuckets: z.boolean().describe(
      "Specifies whether Amazon S3 should restrict public bucket policies for this bucket. Setting this element to TRUE restricts access to this bucket to only AWS services and authorized users within this account if the bucket has a public policy. Enabling this setting doesn't affect previously stored bucket policies, except that public and cross-account access within any public bucket policy, including non-public delegation to specific accounts, is blocked.",
    ).optional(),
  }).describe(
    "The PublicAccessBlock configuration that you want to apply to this Access Point.",
  ).optional(),
  Scope: z.object({
    Prefixes: z.array(z.string()).describe(
      "You can specify any amount of preﬁxes, but the total length of characters of all preﬁxes must be less than 256 bytes in size.",
    ).optional(),
    Permissions: z.array(
      z.enum([
        "GetObject",
        "GetObjectAttributes",
        "ListMultipartUploadParts",
        "ListBucket",
        "ListBucketMultipartUploads",
        "PutObject",
        "DeleteObject",
        "AbortMultipartUpload",
      ]),
    ).describe("You can include one or more API operations as permissions")
      .optional(),
  }).describe(
    "For directory buckets, you can ﬁlter access control to speciﬁc preﬁxes, API operations, or a combination of both.",
  ).optional(),
  Policy: z.record(z.string(), z.unknown()).describe(
    "The Access Point Policy you want to apply to this access point.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  Name: z.string(),
  Bucket: z.string().optional(),
  BucketAccountId: z.string().optional(),
  VpcConfiguration: z.object({
    VpcId: z.string(),
  }).optional(),
  PublicAccessBlockConfiguration: z.object({
    BlockPublicAcls: z.boolean(),
    IgnorePublicAcls: z.boolean(),
    BlockPublicPolicy: z.boolean(),
    RestrictPublicBuckets: z.boolean(),
  }).optional(),
  Scope: z.object({
    Prefixes: z.array(z.string()),
    Permissions: z.array(z.string()),
  }).optional(),
  Policy: z.record(z.string(), z.unknown()).optional(),
  NetworkOrigin: z.string().optional(),
  Arn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  Name: z.string().min(3).max(50).regex(
    new RegExp("^[a-z0-9]([a-z0-9\\-]*[a-z0-9])?$"),
  ).describe(
    "The name you want to assign to this Access Point. If you don't specify a name, AWS CloudFormation generates a unique ID and uses that ID for the access point name. For directory buckets, the access point name must consist of a base name that you provide and suﬃx that includes the ZoneID (AWS Availability Zone or Local Zone) of your bucket location, followed by --xa-s3.",
  ).optional(),
  Bucket: z.string().min(3).max(255).describe(
    "The name of the bucket that you want to associate this Access Point with.",
  ).optional(),
  BucketAccountId: z.string().max(64).regex(new RegExp("^\\d{12}$")).describe(
    "The AWS account ID associated with the S3 bucket associated with this access point.",
  ).optional(),
  VpcConfiguration: z.object({
    VpcId: z.string().min(1).max(1024).describe(
      "If this field is specified, this access point will only allow connections from the specified VPC ID.",
    ).optional(),
  }).describe(
    "If you include this field, Amazon S3 restricts access to this Access Point to requests from the specified Virtual Private Cloud (VPC).",
  ).optional(),
  PublicAccessBlockConfiguration: z.object({
    BlockPublicAcls: z.boolean().describe(
      "Specifies whether Amazon S3 should block public access control lists (ACLs) for buckets in this account. Setting this element to TRUE causes the following behavior: - PUT Bucket acl and PUT Object acl calls fail if the specified ACL is public. - PUT Object calls fail if the request includes a public ACL.. - PUT Bucket calls fail if the request includes a public ACL. Enabling this setting doesn't affect existing policies or ACLs.",
    ).optional(),
    IgnorePublicAcls: z.boolean().describe(
      "Specifies whether Amazon S3 should ignore public ACLs for buckets in this account. Setting this element to TRUE causes Amazon S3 to ignore all public ACLs on buckets in this account and any objects that they contain. Enabling this setting doesn't affect the persistence of any existing ACLs and doesn't prevent new public ACLs from being set.",
    ).optional(),
    BlockPublicPolicy: z.boolean().describe(
      "Specifies whether Amazon S3 should block public bucket policies for buckets in this account. Setting this element to TRUE causes Amazon S3 to reject calls to PUT Bucket policy if the specified bucket policy allows public access. Enabling this setting doesn't affect existing bucket policies.",
    ).optional(),
    RestrictPublicBuckets: z.boolean().describe(
      "Specifies whether Amazon S3 should restrict public bucket policies for this bucket. Setting this element to TRUE restricts access to this bucket to only AWS services and authorized users within this account if the bucket has a public policy. Enabling this setting doesn't affect previously stored bucket policies, except that public and cross-account access within any public bucket policy, including non-public delegation to specific accounts, is blocked.",
    ).optional(),
  }).describe(
    "The PublicAccessBlock configuration that you want to apply to this Access Point.",
  ).optional(),
  Scope: z.object({
    Prefixes: z.array(z.string()).describe(
      "You can specify any amount of preﬁxes, but the total length of characters of all preﬁxes must be less than 256 bytes in size.",
    ).optional(),
    Permissions: z.array(
      z.enum([
        "GetObject",
        "GetObjectAttributes",
        "ListMultipartUploadParts",
        "ListBucket",
        "ListBucketMultipartUploads",
        "PutObject",
        "DeleteObject",
        "AbortMultipartUpload",
      ]),
    ).describe("You can include one or more API operations as permissions")
      .optional(),
  }).describe(
    "For directory buckets, you can ﬁlter access control to speciﬁc preﬁxes, API operations, or a combination of both.",
  ).optional(),
  Policy: z.record(z.string(), z.unknown()).describe(
    "The Access Point Policy you want to apply to this access point.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

/** Swamp extension model for S3Express AccessPoint. Registered at `@swamp/aws/s3express/access-point`. */
export const model = {
  type: "@swamp/aws/s3express/access-point",
  version: "2026.05.27.1",
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
      toVersion: "2026.05.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "S3Express AccessPoint resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a S3Express AccessPoint",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::S3Express::AccessPoint",
          desiredState,
        ) as StateData;
        const instanceName = ((result.Name ?? g.Name)?.toString() ?? "current")
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
      description: "Get a S3Express AccessPoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the S3Express AccessPoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::S3Express::AccessPoint",
          args.identifier,
        ) as StateData;
        const instanceName =
          ((result.Name ?? context.globalArgs.Name)?.toString() ??
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
      description: "Update a S3Express AccessPoint",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::S3Express::AccessPoint",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::S3Express::AccessPoint",
          identifier,
          currentState,
          desiredState,
          ["Name", "Bucket", "BucketAccountId", "VpcConfiguration"],
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
      description: "Delete a S3Express AccessPoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the S3Express AccessPoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::S3Express::AccessPoint",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.Name?.toString() ?? args.identifier).replace(
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
      description: "Sync S3Express AccessPoint state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::S3Express::AccessPoint",
            identifier,
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
