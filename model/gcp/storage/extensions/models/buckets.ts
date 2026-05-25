// Auto-generated extension model for @swamp/gcp/storage/buckets
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Storage JSON Buckets.
 *
 * A bucket.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  request,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://storage.googleapis.com/storage/v1/";

const GET_CONFIG = {
  "id": "storage.buckets.get",
  "path": "b/{bucket}",
  "httpMethod": "GET",
  "parameterOrder": [
    "bucket",
  ],
  "parameters": {
    "bucket": {
      "location": "path",
      "required": true,
    },
    "generation": {
      "location": "query",
    },
    "ifMetagenerationMatch": {
      "location": "query",
    },
    "ifMetagenerationNotMatch": {
      "location": "query",
    },
    "projection": {
      "location": "query",
    },
    "softDeleted": {
      "location": "query",
    },
    "userProject": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "storage.buckets.insert",
  "path": "b",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
  ],
  "parameters": {
    "enableObjectRetention": {
      "location": "query",
    },
    "predefinedAcl": {
      "location": "query",
    },
    "predefinedDefaultObjectAcl": {
      "location": "query",
    },
    "project": {
      "location": "query",
      "required": true,
    },
    "projection": {
      "location": "query",
    },
    "userProject": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "storage.buckets.update",
  "path": "b/{bucket}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "bucket",
  ],
  "parameters": {
    "bucket": {
      "location": "path",
      "required": true,
    },
    "ifMetagenerationMatch": {
      "location": "query",
    },
    "ifMetagenerationNotMatch": {
      "location": "query",
    },
    "predefinedAcl": {
      "location": "query",
    },
    "predefinedDefaultObjectAcl": {
      "location": "query",
    },
    "projection": {
      "location": "query",
    },
    "userProject": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "storage.buckets.delete",
  "path": "b/{bucket}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "bucket",
  ],
  "parameters": {
    "bucket": {
      "location": "path",
      "required": true,
    },
    "ifMetagenerationMatch": {
      "location": "query",
    },
    "ifMetagenerationNotMatch": {
      "location": "query",
    },
    "userProject": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "storage.buckets.list",
  "path": "b",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
  ],
  "parameters": {
    "maxResults": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "prefix": {
      "location": "query",
    },
    "project": {
      "location": "query",
      "required": true,
    },
    "projection": {
      "location": "query",
    },
    "returnPartialSuccess": {
      "location": "query",
    },
    "softDeleted": {
      "location": "query",
    },
    "userProject": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  acl: z.array(z.object({
    bucket: z.string().describe("The name of the bucket.").optional(),
    domain: z.string().describe(
      "The domain associated with the entity, if any.",
    ).optional(),
    email: z.string().describe(
      "The email address associated with the entity, if any.",
    ).optional(),
    entity: z.string().describe(
      "The entity holding the permission, in one of the following forms: - user-userId - user-email - group-groupId - group-email - domain-domain - project-team-projectId - allUsers - allAuthenticatedUsers Examples: - The user liz@example.com would be user-liz@example.com. - The group example@googlegroups.com would be group-example@googlegroups.com. - To refer to all members of the Google Apps for Business domain example.com, the entity would be domain-example.com.",
    ).optional(),
    entityId: z.string().describe("The ID for the entity, if any.").optional(),
    etag: z.string().describe(
      "HTTP 1.1 Entity tag for the access-control entry.",
    ).optional(),
    id: z.string().describe("The ID of the access-control entry.").optional(),
    kind: z.string().describe(
      "The kind of item this is. For bucket access control entries, this is always storage#bucketAccessControl.",
    ).optional(),
    projectTeam: z.object({
      projectNumber: z.string().describe("The project number.").optional(),
      team: z.string().describe("The team.").optional(),
    }).describe("The project team associated with the entity, if any.")
      .optional(),
    role: z.string().describe("The access permission for the entity.")
      .optional(),
    selfLink: z.string().describe("The link to this access-control entry.")
      .optional(),
  })).describe("Access controls on the bucket.").optional(),
  autoclass: z.object({
    enabled: z.boolean().describe(
      "Whether or not Autoclass is enabled on this bucket",
    ).optional(),
    terminalStorageClass: z.string().describe(
      "The storage class that objects in the bucket eventually transition to if they are not read for a certain length of time. Valid values are NEARLINE and ARCHIVE.",
    ).optional(),
    terminalStorageClassUpdateTime: z.string().describe(
      'A date and time in RFC 3339 format representing the time of the most recent update to "terminalStorageClass".',
    ).optional(),
    toggleTime: z.string().describe(
      'A date and time in RFC 3339 format representing the instant at which "enabled" was last toggled.',
    ).optional(),
  }).describe("The bucket's Autoclass configuration.").optional(),
  billing: z.object({
    requesterPays: z.boolean().describe(
      "When set to true, Requester Pays is enabled for this bucket.",
    ).optional(),
  }).describe("The bucket's billing configuration.").optional(),
  cors: z.array(z.object({
    maxAgeSeconds: z.number().int().describe(
      "The value, in seconds, to return in the Access-Control-Max-Age header used in preflight responses.",
    ).optional(),
    method: z.array(z.string()).describe(
      'The list of HTTP methods on which to include CORS response headers, (GET, OPTIONS, POST, etc) Note: "*" is permitted in the list of methods, and means "any method".',
    ).optional(),
    origin: z.array(z.string()).describe(
      'The list of Origins eligible to receive CORS response headers. Note: "*" is permitted in the list of origins, and means "any Origin".',
    ).optional(),
    responseHeader: z.array(z.string()).describe(
      "The list of HTTP headers other than the simple response headers to give permission for the user-agent to share across domains.",
    ).optional(),
  })).describe(
    "The bucket's Cross-Origin Resource Sharing (CORS) configuration.",
  ).optional(),
  customPlacementConfig: z.object({
    dataLocations: z.array(z.string()).describe(
      "The list of regional locations in which data is placed.",
    ).optional(),
  }).describe(
    "The bucket's custom placement configuration for Custom Dual Regions.",
  ).optional(),
  defaultEventBasedHold: z.boolean().describe(
    "The default value for event-based hold on newly created objects in this bucket. Event-based hold is a way to retain objects indefinitely until an event occurs, signified by the hold's release. After being released, such objects will be subject to bucket-level retention (if any). One sample use case of this flag is for banks to hold loan documents for at least 3 years after loan is paid in full. Here, bucket-level retention is 3 years and the event is loan being paid in full. In this example, these objects will be held intact for any number of years until the event has occurred (event-based hold on the object is released) and then 3 more years after that. That means retention duration of the objects begins from the moment event-based hold transitioned from true to false. Objects under event-based hold cannot be deleted, overwritten or archived until the hold is removed.",
  ).optional(),
  defaultObjectAcl: z.array(z.object({
    bucket: z.string().describe("The name of the bucket.").optional(),
    domain: z.string().describe(
      "The domain associated with the entity, if any.",
    ).optional(),
    email: z.string().describe(
      "The email address associated with the entity, if any.",
    ).optional(),
    entity: z.string().describe(
      "The entity holding the permission, in one of the following forms: - user-userId - user-email - group-groupId - group-email - domain-domain - project-team-projectId - allUsers - allAuthenticatedUsers Examples: - The user liz@example.com would be user-liz@example.com. - The group example@googlegroups.com would be group-example@googlegroups.com. - To refer to all members of the Google Apps for Business domain example.com, the entity would be domain-example.com.",
    ).optional(),
    entityId: z.string().describe("The ID for the entity, if any.").optional(),
    etag: z.string().describe(
      "HTTP 1.1 Entity tag for the access-control entry.",
    ).optional(),
    generation: z.string().describe(
      "The content generation of the object, if applied to an object.",
    ).optional(),
    id: z.string().describe("The ID of the access-control entry.").optional(),
    kind: z.string().describe(
      "The kind of item this is. For object access control entries, this is always storage#objectAccessControl.",
    ).optional(),
    object: z.string().describe(
      "The name of the object, if applied to an object.",
    ).optional(),
    projectTeam: z.object({
      projectNumber: z.string().describe("The project number.").optional(),
      team: z.string().describe("The team.").optional(),
    }).describe("The project team associated with the entity, if any.")
      .optional(),
    role: z.string().describe("The access permission for the entity.")
      .optional(),
    selfLink: z.string().describe("The link to this access-control entry.")
      .optional(),
  })).describe(
    "Default access controls to apply to new objects when no ACL is provided.",
  ).optional(),
  encryption: z.object({
    customerManagedEncryptionEnforcementConfig: z.object({
      effectiveTime: z.string().describe(
        "Server-determined value that indicates the time from which configuration was enforced and effective. This value is in RFC 3339 format.",
      ).optional(),
      restrictionMode: z.enum(["NotRestricted", "FullyRestricted"]).describe(
        "Restriction mode for Customer-Managed Encryption Keys. Defaults to NotRestricted.",
      ).optional(),
    }).describe(
      "If set, the new objects created in this bucket must comply with this enforcement config. Changing this has no effect on existing objects; it applies to new objects only. If omitted, the new objects are allowed to be encrypted with Customer Managed Encryption type by default.",
    ).optional(),
    customerSuppliedEncryptionEnforcementConfig: z.object({
      effectiveTime: z.string().describe(
        "Server-determined value that indicates the time from which configuration was enforced and effective. This value is in RFC 3339 format.",
      ).optional(),
      restrictionMode: z.enum(["NotRestricted", "FullyRestricted"]).describe(
        "Restriction mode for Customer-Supplied Encryption Keys. Defaults to NotRestricted.",
      ).optional(),
    }).describe(
      "If set, the new objects created in this bucket must comply with this enforcement config. Changing this has no effect on existing objects; it applies to new objects only. If omitted, the new objects are allowed to be encrypted with Customer Supplied Encryption type by default.",
    ).optional(),
    defaultKmsKeyName: z.string().describe(
      "A Cloud KMS key that will be used to encrypt objects inserted into this bucket, if no encryption method is specified.",
    ).optional(),
    googleManagedEncryptionEnforcementConfig: z.object({
      effectiveTime: z.string().describe(
        "Server-determined value that indicates the time from which configuration was enforced and effective. This value is in RFC 3339 format.",
      ).optional(),
      restrictionMode: z.enum(["NotRestricted", "FullyRestricted"]).describe(
        "Restriction mode for Google-Managed Encryption Keys. Defaults to NotRestricted.",
      ).optional(),
    }).describe(
      "If set, the new objects created in this bucket must comply with this enforcement config. Changing this has no effect on existing objects; it applies to new objects only. If omitted, the new objects are allowed to be encrypted with Google Managed Encryption type by default.",
    ).optional(),
  }).describe("Encryption configuration for a bucket.").optional(),
  generation: z.string().describe("The generation of this bucket.").optional(),
  hardDeleteTime: z.string().describe(
    "The hard delete time of the bucket in RFC 3339 format.",
  ).optional(),
  hierarchicalNamespace: z.object({
    enabled: z.boolean().describe(
      "When set to true, hierarchical namespace is enabled for this bucket.",
    ).optional(),
  }).describe("The bucket's hierarchical namespace configuration.").optional(),
  iamConfiguration: z.object({
    bucketPolicyOnly: z.object({
      enabled: z.boolean().describe(
        "If set, access is controlled only by bucket-level or above IAM policies.",
      ).optional(),
      lockedTime: z.string().describe(
        "The deadline for changing iamConfiguration.bucketPolicyOnly.enabled from true to false in RFC 3339 format. iamConfiguration.bucketPolicyOnly.enabled may be changed from true to false until the locked time, after which the field is immutable.",
      ).optional(),
    }).describe(
      "The bucket's uniform bucket-level access configuration. The feature was formerly known as Bucket Policy Only. For backward compatibility, this field will be populated with identical information as the uniformBucketLevelAccess field. We recommend using the uniformBucketLevelAccess field to enable and disable the feature.",
    ).optional(),
    publicAccessPrevention: z.string().describe(
      "The bucket's Public Access Prevention configuration. Currently, 'inherited' and 'enforced' are supported.",
    ).optional(),
    uniformBucketLevelAccess: z.object({
      enabled: z.boolean().describe(
        "If set, access is controlled only by bucket-level or above IAM policies.",
      ).optional(),
      lockedTime: z.string().describe(
        "The deadline for changing iamConfiguration.uniformBucketLevelAccess.enabled from true to false in RFC 3339 format. iamConfiguration.uniformBucketLevelAccess.enabled may be changed from true to false until the locked time, after which the field is immutable.",
      ).optional(),
    }).describe("The bucket's uniform bucket-level access configuration.")
      .optional(),
  }).describe("The bucket's IAM configuration.").optional(),
  id: z.string().describe(
    "The ID of the bucket. For buckets, the id and name properties are the same.",
  ).optional(),
  ipFilter: z.object({
    allowAllServiceAgentAccess: z.boolean().describe(
      "Whether to allow all service agents to access the bucket regardless of the IP filter configuration.",
    ).optional(),
    allowCrossOrgVpcs: z.boolean().describe(
      "Whether to allow cross-org VPCs in the bucket's IP filter configuration.",
    ).optional(),
    mode: z.string().describe(
      "The mode of the IP filter. Valid values are 'Enabled' and 'Disabled'.",
    ).optional(),
    publicNetworkSource: z.object({
      allowedIpCidrRanges: z.array(z.string()).describe(
        "The list of public IPv4, IPv6 cidr ranges that are allowed to access the bucket.",
      ).optional(),
    }).describe("The public network source of the bucket's IP filter.")
      .optional(),
    vpcNetworkSources: z.array(z.object({
      allowedIpCidrRanges: z.array(z.string()).describe(
        "The list of IPv4, IPv6 cidr ranges subnetworks that are allowed to access the bucket.",
      ).optional(),
      network: z.string().describe(
        "Name of the network. Format: projects/{PROJECT_ID}/global/networks/{NETWORK_NAME}",
      ).optional(),
    })).describe(
      "The list of [VPC network](https://cloud.google.com/vpc/docs/vpc) sources of the bucket's IP filter.",
    ).optional(),
  }).describe(
    "The bucket's IP filter configuration. Specifies the network sources that are allowed to access the operations on the bucket, as well as its underlying objects. Only enforced when the mode is set to 'Enabled'.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "User-provided labels, in key/value pairs.",
  ).optional(),
  lifecycle: z.object({
    rule: z.array(z.object({
      action: z.object({
        storageClass: z.string().describe(
          "Target storage class. Required iff the type of the action is SetStorageClass.",
        ).optional(),
        type: z.string().describe(
          "Type of the action. Currently, only Delete, SetStorageClass, and AbortIncompleteMultipartUpload are supported.",
        ).optional(),
      }).describe("The action to take.").optional(),
      condition: z.object({
        age: z.number().int().describe(
          "Age of an object (in days). This condition is satisfied when an object reaches the specified age.",
        ).optional(),
        createdBefore: z.string().describe(
          'A date in RFC 3339 format with only the date part (for instance, "2013-01-15"). This condition is satisfied when an object is created before midnight of the specified date in UTC.',
        ).optional(),
        customTimeBefore: z.string().describe(
          'A date in RFC 3339 format with only the date part (for instance, "2013-01-15"). This condition is satisfied when the custom time on an object is before this date in UTC.',
        ).optional(),
        daysSinceCustomTime: z.number().int().describe(
          "Number of days elapsed since the user-specified timestamp set on an object. The condition is satisfied if the days elapsed is at least this number. If no custom timestamp is specified on an object, the condition does not apply.",
        ).optional(),
        daysSinceNoncurrentTime: z.number().int().describe(
          "Number of days elapsed since the noncurrent timestamp of an object. The condition is satisfied if the days elapsed is at least this number. This condition is relevant only for versioned objects. The value of the field must be a nonnegative integer. If it's zero, the object version will become eligible for Lifecycle action as soon as it becomes noncurrent.",
        ).optional(),
        isLive: z.boolean().describe(
          "Relevant only for versioned objects. If the value is true, this condition matches live objects; if the value is false, it matches archived objects.",
        ).optional(),
        matchesPattern: z.string().describe(
          'A regular expression that satisfies the RE2 syntax. This condition is satisfied when the name of the object matches the RE2 pattern. Note: This feature is currently in the "Early Access" launch stage and is only available to a whitelisted set of users; that means that this feature may be changed in backward-incompatible ways and that it is not guaranteed to be released.',
        ).optional(),
        matchesPrefix: z.array(z.unknown()).describe(
          "List of object name prefixes. This condition will be satisfied when at least one of the prefixes exactly matches the beginning of the object name.",
        ).optional(),
        matchesStorageClass: z.array(z.unknown()).describe(
          "Objects having any of the storage classes specified by this condition will be matched. Values include MULTI_REGIONAL, REGIONAL, NEARLINE, COLDLINE, ARCHIVE, STANDARD, and DURABLE_REDUCED_AVAILABILITY.",
        ).optional(),
        matchesSuffix: z.array(z.unknown()).describe(
          "List of object name suffixes. This condition will be satisfied when at least one of the suffixes exactly matches the end of the object name.",
        ).optional(),
        noncurrentTimeBefore: z.string().describe(
          'A date in RFC 3339 format with only the date part (for instance, "2013-01-15"). This condition is satisfied when the noncurrent time on an object is before this date in UTC. This condition is relevant only for versioned objects.',
        ).optional(),
        numNewerVersions: z.number().int().describe(
          "Relevant only for versioned objects. If the value is N, this condition is satisfied when there are at least N versions (including the live version) newer than this version of the object.",
        ).optional(),
      }).describe("The condition(s) under which the action will be taken.")
        .optional(),
    })).describe(
      "A lifecycle management rule, which is made of an action to take and the condition(s) under which the action will be taken.",
    ).optional(),
  }).describe(
    "The bucket's lifecycle configuration. See [Lifecycle Management](https://cloud.google.com/storage/docs/lifecycle) for more information.",
  ).optional(),
  location: z.string().describe(
    "The location of the bucket. Object data for objects in the bucket resides in physical storage within this region. Defaults to US. See the [Developer's Guide](https://cloud.google.com/storage/docs/locations) for the authoritative list.",
  ).optional(),
  locationType: z.string().describe("The type of the bucket location.")
    .optional(),
  logging: z.object({
    logBucket: z.string().describe(
      "The destination bucket where the current bucket's logs should be placed.",
    ).optional(),
    logObjectPrefix: z.string().describe("A prefix for log object names.")
      .optional(),
  }).describe(
    "The bucket's logging configuration, which defines the destination bucket and optional name prefix for the current bucket's logs.",
  ).optional(),
  metageneration: z.string().describe("The metadata generation of this bucket.")
    .optional(),
  name: z.string().describe("The name of the bucket."),
  objectRetention: z.object({
    mode: z.string().describe(
      "The bucket's object retention mode. Can be Enabled.",
    ).optional(),
  }).describe("The bucket's object retention config.").optional(),
  owner: z.object({
    entity: z.string().describe(
      "The entity, in the form project-owner-projectId.",
    ).optional(),
    entityId: z.string().describe("The ID for the entity.").optional(),
  }).describe(
    "The owner of the bucket. This is always the project team's owner group.",
  ).optional(),
  projectNumber: z.string().describe(
    "The project number of the project the bucket belongs to.",
  ).optional(),
  retentionPolicy: z.object({
    effectiveTime: z.string().describe(
      "Server-determined value that indicates the time from which policy was enforced and effective. This value is in RFC 3339 format.",
    ).optional(),
    isLocked: z.boolean().describe(
      "Once locked, an object retention policy cannot be modified.",
    ).optional(),
    retentionPeriod: z.string().describe(
      "The duration in seconds that objects need to be retained. Retention duration must be greater than zero and less than 100 years. Note that enforcement of retention periods less than a day is not guaranteed. Such periods should only be used for testing purposes.",
    ).optional(),
  }).describe(
    "The bucket's retention policy. The retention policy enforces a minimum retention time for all objects contained in the bucket, based on their creation time. Any attempt to overwrite or delete objects younger than the retention period will result in a PERMISSION_DENIED error. An unlocked retention policy can be modified or removed from the bucket via a storage.buckets.update operation. A locked retention policy cannot be removed or shortened in duration for the lifetime of the bucket. Attempting to remove or decrease period of a locked retention policy will result in a PERMISSION_DENIED error.",
  ).optional(),
  rpo: z.string().describe(
    "The Recovery Point Objective (RPO) of this bucket. Set to ASYNC_TURBO to turn on Turbo Replication on a bucket.",
  ).optional(),
  satisfiesPZI: z.boolean().describe("Reserved for future use.").optional(),
  satisfiesPZS: z.boolean().describe("Reserved for future use.").optional(),
  softDeletePolicy: z.object({
    effectiveTime: z.string().describe(
      "Server-determined value that indicates the time from which the policy, or one with a greater retention, was effective. This value is in RFC 3339 format.",
    ).optional(),
    retentionDurationSeconds: z.string().describe(
      "The duration in seconds that soft-deleted objects in the bucket will be retained and cannot be permanently deleted.",
    ).optional(),
  }).describe(
    "The bucket's soft delete policy, which defines the period of time that soft-deleted objects will be retained, and cannot be permanently deleted.",
  ).optional(),
  softDeleteTime: z.string().describe(
    "The soft delete time of the bucket in RFC 3339 format.",
  ).optional(),
  storageClass: z.string().describe(
    "The bucket's default storage class, used whenever no storageClass is specified for a newly-created object. This defines how objects in the bucket are stored and determines the SLA and the cost of storage. Values include MULTI_REGIONAL, REGIONAL, STANDARD, NEARLINE, COLDLINE, ARCHIVE, and DURABLE_REDUCED_AVAILABILITY. If this value is not specified when the bucket is created, it will default to STANDARD. For more information, see [Storage Classes](https://cloud.google.com/storage/docs/storage-classes).",
  ).optional(),
  timeCreated: z.string().describe(
    "The creation time of the bucket in RFC 3339 format.",
  ).optional(),
  updated: z.string().describe(
    "The modification time of the bucket in RFC 3339 format.",
  ).optional(),
  versioning: z.object({
    enabled: z.boolean().describe(
      "While set to true, versioning is fully enabled for this bucket.",
    ).optional(),
  }).describe("The bucket's versioning configuration.").optional(),
  website: z.object({
    mainPageSuffix: z.string().describe(
      "If the requested object path is missing, the service will ensure the path has a trailing '/', append this suffix, and attempt to retrieve the resulting object. This allows the creation of index.html objects to represent directory pages.",
    ).optional(),
    notFoundPage: z.string().describe(
      "If the requested object path is missing, and any mainPageSuffix object is missing, if applicable, the service will return the named object from this bucket as the content for a 404 Not Found result.",
    ).optional(),
  }).describe(
    "The bucket's website configuration, controlling how the service behaves when accessing bucket contents as a web site. See the [Static Website Examples](https://cloud.google.com/storage/docs/static-website) for more information.",
  ).optional(),
  enableObjectRetention: z.string().describe(
    "When set to true, object retention is enabled for this bucket.",
  ).optional(),
  predefinedAcl: z.string().describe(
    "Apply a predefined set of access controls to this bucket.",
  ).optional(),
  predefinedDefaultObjectAcl: z.string().describe(
    "Apply a predefined set of default object access controls to this bucket.",
  ).optional(),
  project: z.string().describe("A valid API project identifier.").optional(),
  projection: z.string().describe(
    "Set of properties to return. Defaults to noAcl, unless the bucket resource specifies acl or defaultObjectAcl properties, when it defaults to full.",
  ).optional(),
  userProject: z.string().describe("The project to be billed for this request.")
    .optional(),
});

const iamBindingMethods = {
  add_iam_binding: {
    description:
      "add an IAM binding to the bucket (read-modify-write with etag)",
    arguments: z.object({
      role: z.string().describe(
        "IAM role to grant, e.g. roles/storage.objectAdmin",
      ),
      members: z.array(z.string()).describe(
        "Members to bind, e.g. ['user:alice@example.com', 'serviceAccount:sa@project.iam.gserviceaccount.com']",
      ),
      condition: z.object({
        title: z.string(),
        description: z.string().optional(),
        expression: z.string(),
      }).optional().describe("Optional IAM condition for conditional bindings"),
    }),
    execute: async (
      args: Record<string, unknown>,
      context: { globalArgs: Record<string, unknown> },
    ) => {
      const g = context.globalArgs;
      const projectId = await getProjectId();
      const bucketName = g["name"]?.toString() ?? "";
      const userProject = g["userProject"]?.toString() ?? projectId;

      const getResp = await request(
        "GET",
        `${BASE_URL}b/${
          encodeURIComponent(bucketName)
        }/iam?optionsRequestedPolicyVersion=3&userProject=${
          encodeURIComponent(userProject)
        }`,
      );
      if (!getResp.ok) {
        const body = await getResp.text();
        throw new Error(`Failed to get IAM policy: ${getResp.status} ${body}`);
      }
      const policy = await getResp.json() as {
        bindings?: Array<{
          role: string;
          members: string[];
          condition?: {
            title: string;
            description?: string;
            expression: string;
          };
        }>;
        etag: string;
        version?: number;
      };

      const role = args["role"] as string;
      const members = args["members"] as string[];
      const condition = args["condition"] as
        | { title: string; description?: string; expression: string }
        | undefined;

      const bindings = policy.bindings ?? [];
      const existing = bindings.find((b) => {
        if (b.role !== role) return false;
        if (condition && b.condition) {
          return b.condition.title === condition.title &&
            b.condition.expression === condition.expression;
        }
        return !condition && !b.condition;
      });

      if (existing) {
        const memberSet = new Set(existing.members);
        for (const m of members) memberSet.add(m);
        existing.members = [...memberSet];
      } else {
        const newBinding: {
          role: string;
          members: string[];
          condition?: {
            title: string;
            description?: string;
            expression: string;
          };
        } = { role, members: [...new Set(members)] };
        if (condition) newBinding.condition = condition;
        bindings.push(newBinding);
      }

      const setResp = await request(
        "PUT",
        `${BASE_URL}b/${encodeURIComponent(bucketName)}/iam?userProject=${
          encodeURIComponent(userProject)
        }`,
        {
          bindings,
          etag: policy.etag,
          version: 3,
        },
      );
      if (!setResp.ok) {
        const body = await setResp.text();
        throw new Error(`Failed to set IAM policy: ${setResp.status} ${body}`);
      }
      const result = await setResp.json();
      return { result };
    },
  },
  remove_iam_binding: {
    description:
      "remove an IAM binding or specific members from a bucket (read-modify-write with etag)",
    arguments: z.object({
      role: z.string().describe(
        "IAM role to revoke, e.g. roles/storage.objectAdmin",
      ),
      members: z.array(z.string()).optional().describe(
        "Specific members to remove. If omitted, removes the entire binding for this role.",
      ),
      condition: z.object({
        title: z.string(),
        description: z.string().optional(),
        expression: z.string(),
      }).optional().describe(
        "Match condition when removing a conditional binding",
      ),
    }),
    execute: async (
      args: Record<string, unknown>,
      context: { globalArgs: Record<string, unknown> },
    ) => {
      const g = context.globalArgs;
      const projectId = await getProjectId();
      const bucketName = g["name"]?.toString() ?? "";
      const userProject = g["userProject"]?.toString() ?? projectId;

      const getResp = await request(
        "GET",
        `${BASE_URL}b/${
          encodeURIComponent(bucketName)
        }/iam?optionsRequestedPolicyVersion=3&userProject=${
          encodeURIComponent(userProject)
        }`,
      );
      if (!getResp.ok) {
        const body = await getResp.text();
        throw new Error(`Failed to get IAM policy: ${getResp.status} ${body}`);
      }
      const policy = await getResp.json() as {
        bindings?: Array<{
          role: string;
          members: string[];
          condition?: {
            title: string;
            description?: string;
            expression: string;
          };
        }>;
        etag: string;
        version?: number;
      };

      const role = args["role"] as string;
      const members = args["members"] as string[] | undefined;
      const condition = args["condition"] as
        | { title: string; description?: string; expression: string }
        | undefined;

      let bindings = policy.bindings ?? [];
      const idx = bindings.findIndex((b) => {
        if (b.role !== role) return false;
        if (condition && b.condition) {
          return b.condition.title === condition.title &&
            b.condition.expression === condition.expression;
        }
        return !condition && !b.condition;
      });

      if (idx === -1) {
        return { result: { bindings, message: "No matching binding found" } };
      }

      if (members) {
        const removeSet = new Set(members);
        bindings[idx].members = bindings[idx].members.filter((m) =>
          !removeSet.has(m)
        );
        if (bindings[idx].members.length === 0) {
          bindings = bindings.filter((_, i) => i !== idx);
        }
      } else {
        bindings = bindings.filter((_, i) => i !== idx);
      }

      const setResp = await request(
        "PUT",
        `${BASE_URL}b/${encodeURIComponent(bucketName)}/iam?userProject=${
          encodeURIComponent(userProject)
        }`,
        {
          bindings,
          etag: policy.etag,
          version: 3,
        },
      );
      if (!setResp.ok) {
        const body = await setResp.text();
        throw new Error(`Failed to set IAM policy: ${setResp.status} ${body}`);
      }
      const result = await setResp.json();
      return { result };
    },
  },
};

const StateSchema = z.object({
  acl: z.array(z.object({
    bucket: z.string(),
    domain: z.string(),
    email: z.string(),
    entity: z.string(),
    entityId: z.string(),
    etag: z.string(),
    id: z.string(),
    kind: z.string(),
    projectTeam: z.object({
      projectNumber: z.string(),
      team: z.string(),
    }),
    role: z.string(),
    selfLink: z.string(),
  })).optional(),
  autoclass: z.object({
    enabled: z.boolean(),
    terminalStorageClass: z.string(),
    terminalStorageClassUpdateTime: z.string(),
    toggleTime: z.string(),
  }).optional(),
  billing: z.object({
    requesterPays: z.boolean(),
  }).optional(),
  cors: z.array(z.object({
    maxAgeSeconds: z.number(),
    method: z.array(z.string()),
    origin: z.array(z.string()),
    responseHeader: z.array(z.string()),
  })).optional(),
  customPlacementConfig: z.object({
    dataLocations: z.array(z.string()),
  }).optional(),
  defaultEventBasedHold: z.boolean().optional(),
  defaultObjectAcl: z.array(z.object({
    bucket: z.string(),
    domain: z.string(),
    email: z.string(),
    entity: z.string(),
    entityId: z.string(),
    etag: z.string(),
    generation: z.string(),
    id: z.string(),
    kind: z.string(),
    object: z.string(),
    projectTeam: z.object({
      projectNumber: z.string(),
      team: z.string(),
    }),
    role: z.string(),
    selfLink: z.string(),
  })).optional(),
  encryption: z.object({
    customerManagedEncryptionEnforcementConfig: z.object({
      effectiveTime: z.string(),
      restrictionMode: z.string(),
    }),
    customerSuppliedEncryptionEnforcementConfig: z.object({
      effectiveTime: z.string(),
      restrictionMode: z.string(),
    }),
    defaultKmsKeyName: z.string(),
    googleManagedEncryptionEnforcementConfig: z.object({
      effectiveTime: z.string(),
      restrictionMode: z.string(),
    }),
  }).optional(),
  etag: z.string().optional(),
  generation: z.string().optional(),
  hardDeleteTime: z.string().optional(),
  hierarchicalNamespace: z.object({
    enabled: z.boolean(),
  }).optional(),
  iamConfiguration: z.object({
    bucketPolicyOnly: z.object({
      enabled: z.boolean(),
      lockedTime: z.string(),
    }),
    publicAccessPrevention: z.string(),
    uniformBucketLevelAccess: z.object({
      enabled: z.boolean(),
      lockedTime: z.string(),
    }),
  }).optional(),
  id: z.string().optional(),
  ipFilter: z.object({
    allowAllServiceAgentAccess: z.boolean(),
    allowCrossOrgVpcs: z.boolean(),
    mode: z.string(),
    publicNetworkSource: z.object({
      allowedIpCidrRanges: z.array(z.string()),
    }),
    vpcNetworkSources: z.array(z.object({
      allowedIpCidrRanges: z.array(z.string()),
      network: z.string(),
    })),
  }).optional(),
  kind: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  lifecycle: z.object({
    rule: z.array(z.object({
      action: z.object({
        storageClass: z.string(),
        type: z.string(),
      }),
      condition: z.object({
        age: z.number(),
        createdBefore: z.string(),
        customTimeBefore: z.string(),
        daysSinceCustomTime: z.number(),
        daysSinceNoncurrentTime: z.number(),
        isLive: z.boolean(),
        matchesPattern: z.string(),
        matchesPrefix: z.array(z.unknown()),
        matchesStorageClass: z.array(z.unknown()),
        matchesSuffix: z.array(z.unknown()),
        noncurrentTimeBefore: z.string(),
        numNewerVersions: z.number(),
      }),
    })),
  }).optional(),
  location: z.string().optional(),
  locationType: z.string().optional(),
  logging: z.object({
    logBucket: z.string(),
    logObjectPrefix: z.string(),
  }).optional(),
  metageneration: z.string().optional(),
  name: z.string(),
  objectRetention: z.object({
    mode: z.string(),
  }).optional(),
  owner: z.object({
    entity: z.string(),
    entityId: z.string(),
  }).optional(),
  projectNumber: z.string().optional(),
  retentionPolicy: z.object({
    effectiveTime: z.string(),
    isLocked: z.boolean(),
    retentionPeriod: z.string(),
  }).optional(),
  rpo: z.string().optional(),
  satisfiesPZI: z.boolean().optional(),
  satisfiesPZS: z.boolean().optional(),
  selfLink: z.string().optional(),
  softDeletePolicy: z.object({
    effectiveTime: z.string(),
    retentionDurationSeconds: z.string(),
  }).optional(),
  softDeleteTime: z.string().optional(),
  storageClass: z.string().optional(),
  timeCreated: z.string().optional(),
  updated: z.string().optional(),
  versioning: z.object({
    enabled: z.boolean(),
  }).optional(),
  website: z.object({
    mainPageSuffix: z.string(),
    notFoundPage: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  acl: z.array(z.object({
    bucket: z.string().describe("The name of the bucket.").optional(),
    domain: z.string().describe(
      "The domain associated with the entity, if any.",
    ).optional(),
    email: z.string().describe(
      "The email address associated with the entity, if any.",
    ).optional(),
    entity: z.string().describe(
      "The entity holding the permission, in one of the following forms: - user-userId - user-email - group-groupId - group-email - domain-domain - project-team-projectId - allUsers - allAuthenticatedUsers Examples: - The user liz@example.com would be user-liz@example.com. - The group example@googlegroups.com would be group-example@googlegroups.com. - To refer to all members of the Google Apps for Business domain example.com, the entity would be domain-example.com.",
    ).optional(),
    entityId: z.string().describe("The ID for the entity, if any.").optional(),
    etag: z.string().describe(
      "HTTP 1.1 Entity tag for the access-control entry.",
    ).optional(),
    id: z.string().describe("The ID of the access-control entry.").optional(),
    kind: z.string().describe(
      "The kind of item this is. For bucket access control entries, this is always storage#bucketAccessControl.",
    ).optional(),
    projectTeam: z.object({
      projectNumber: z.string().describe("The project number.").optional(),
      team: z.string().describe("The team.").optional(),
    }).describe("The project team associated with the entity, if any.")
      .optional(),
    role: z.string().describe("The access permission for the entity.")
      .optional(),
    selfLink: z.string().describe("The link to this access-control entry.")
      .optional(),
  })).describe("Access controls on the bucket.").optional(),
  autoclass: z.object({
    enabled: z.boolean().describe(
      "Whether or not Autoclass is enabled on this bucket",
    ).optional(),
    terminalStorageClass: z.string().describe(
      "The storage class that objects in the bucket eventually transition to if they are not read for a certain length of time. Valid values are NEARLINE and ARCHIVE.",
    ).optional(),
    terminalStorageClassUpdateTime: z.string().describe(
      'A date and time in RFC 3339 format representing the time of the most recent update to "terminalStorageClass".',
    ).optional(),
    toggleTime: z.string().describe(
      'A date and time in RFC 3339 format representing the instant at which "enabled" was last toggled.',
    ).optional(),
  }).describe("The bucket's Autoclass configuration.").optional(),
  billing: z.object({
    requesterPays: z.boolean().describe(
      "When set to true, Requester Pays is enabled for this bucket.",
    ).optional(),
  }).describe("The bucket's billing configuration.").optional(),
  cors: z.array(z.object({
    maxAgeSeconds: z.number().int().describe(
      "The value, in seconds, to return in the Access-Control-Max-Age header used in preflight responses.",
    ).optional(),
    method: z.array(z.string()).describe(
      'The list of HTTP methods on which to include CORS response headers, (GET, OPTIONS, POST, etc) Note: "*" is permitted in the list of methods, and means "any method".',
    ).optional(),
    origin: z.array(z.string()).describe(
      'The list of Origins eligible to receive CORS response headers. Note: "*" is permitted in the list of origins, and means "any Origin".',
    ).optional(),
    responseHeader: z.array(z.string()).describe(
      "The list of HTTP headers other than the simple response headers to give permission for the user-agent to share across domains.",
    ).optional(),
  })).describe(
    "The bucket's Cross-Origin Resource Sharing (CORS) configuration.",
  ).optional(),
  customPlacementConfig: z.object({
    dataLocations: z.array(z.string()).describe(
      "The list of regional locations in which data is placed.",
    ).optional(),
  }).describe(
    "The bucket's custom placement configuration for Custom Dual Regions.",
  ).optional(),
  defaultEventBasedHold: z.boolean().describe(
    "The default value for event-based hold on newly created objects in this bucket. Event-based hold is a way to retain objects indefinitely until an event occurs, signified by the hold's release. After being released, such objects will be subject to bucket-level retention (if any). One sample use case of this flag is for banks to hold loan documents for at least 3 years after loan is paid in full. Here, bucket-level retention is 3 years and the event is loan being paid in full. In this example, these objects will be held intact for any number of years until the event has occurred (event-based hold on the object is released) and then 3 more years after that. That means retention duration of the objects begins from the moment event-based hold transitioned from true to false. Objects under event-based hold cannot be deleted, overwritten or archived until the hold is removed.",
  ).optional(),
  defaultObjectAcl: z.array(z.object({
    bucket: z.string().describe("The name of the bucket.").optional(),
    domain: z.string().describe(
      "The domain associated with the entity, if any.",
    ).optional(),
    email: z.string().describe(
      "The email address associated with the entity, if any.",
    ).optional(),
    entity: z.string().describe(
      "The entity holding the permission, in one of the following forms: - user-userId - user-email - group-groupId - group-email - domain-domain - project-team-projectId - allUsers - allAuthenticatedUsers Examples: - The user liz@example.com would be user-liz@example.com. - The group example@googlegroups.com would be group-example@googlegroups.com. - To refer to all members of the Google Apps for Business domain example.com, the entity would be domain-example.com.",
    ).optional(),
    entityId: z.string().describe("The ID for the entity, if any.").optional(),
    etag: z.string().describe(
      "HTTP 1.1 Entity tag for the access-control entry.",
    ).optional(),
    generation: z.string().describe(
      "The content generation of the object, if applied to an object.",
    ).optional(),
    id: z.string().describe("The ID of the access-control entry.").optional(),
    kind: z.string().describe(
      "The kind of item this is. For object access control entries, this is always storage#objectAccessControl.",
    ).optional(),
    object: z.string().describe(
      "The name of the object, if applied to an object.",
    ).optional(),
    projectTeam: z.object({
      projectNumber: z.string().describe("The project number.").optional(),
      team: z.string().describe("The team.").optional(),
    }).describe("The project team associated with the entity, if any.")
      .optional(),
    role: z.string().describe("The access permission for the entity.")
      .optional(),
    selfLink: z.string().describe("The link to this access-control entry.")
      .optional(),
  })).describe(
    "Default access controls to apply to new objects when no ACL is provided.",
  ).optional(),
  encryption: z.object({
    customerManagedEncryptionEnforcementConfig: z.object({
      effectiveTime: z.string().describe(
        "Server-determined value that indicates the time from which configuration was enforced and effective. This value is in RFC 3339 format.",
      ).optional(),
      restrictionMode: z.enum(["NotRestricted", "FullyRestricted"]).describe(
        "Restriction mode for Customer-Managed Encryption Keys. Defaults to NotRestricted.",
      ).optional(),
    }).describe(
      "If set, the new objects created in this bucket must comply with this enforcement config. Changing this has no effect on existing objects; it applies to new objects only. If omitted, the new objects are allowed to be encrypted with Customer Managed Encryption type by default.",
    ).optional(),
    customerSuppliedEncryptionEnforcementConfig: z.object({
      effectiveTime: z.string().describe(
        "Server-determined value that indicates the time from which configuration was enforced and effective. This value is in RFC 3339 format.",
      ).optional(),
      restrictionMode: z.enum(["NotRestricted", "FullyRestricted"]).describe(
        "Restriction mode for Customer-Supplied Encryption Keys. Defaults to NotRestricted.",
      ).optional(),
    }).describe(
      "If set, the new objects created in this bucket must comply with this enforcement config. Changing this has no effect on existing objects; it applies to new objects only. If omitted, the new objects are allowed to be encrypted with Customer Supplied Encryption type by default.",
    ).optional(),
    defaultKmsKeyName: z.string().describe(
      "A Cloud KMS key that will be used to encrypt objects inserted into this bucket, if no encryption method is specified.",
    ).optional(),
    googleManagedEncryptionEnforcementConfig: z.object({
      effectiveTime: z.string().describe(
        "Server-determined value that indicates the time from which configuration was enforced and effective. This value is in RFC 3339 format.",
      ).optional(),
      restrictionMode: z.enum(["NotRestricted", "FullyRestricted"]).describe(
        "Restriction mode for Google-Managed Encryption Keys. Defaults to NotRestricted.",
      ).optional(),
    }).describe(
      "If set, the new objects created in this bucket must comply with this enforcement config. Changing this has no effect on existing objects; it applies to new objects only. If omitted, the new objects are allowed to be encrypted with Google Managed Encryption type by default.",
    ).optional(),
  }).describe("Encryption configuration for a bucket.").optional(),
  generation: z.string().describe("The generation of this bucket.").optional(),
  hardDeleteTime: z.string().describe(
    "The hard delete time of the bucket in RFC 3339 format.",
  ).optional(),
  hierarchicalNamespace: z.object({
    enabled: z.boolean().describe(
      "When set to true, hierarchical namespace is enabled for this bucket.",
    ).optional(),
  }).describe("The bucket's hierarchical namespace configuration.").optional(),
  iamConfiguration: z.object({
    bucketPolicyOnly: z.object({
      enabled: z.boolean().describe(
        "If set, access is controlled only by bucket-level or above IAM policies.",
      ).optional(),
      lockedTime: z.string().describe(
        "The deadline for changing iamConfiguration.bucketPolicyOnly.enabled from true to false in RFC 3339 format. iamConfiguration.bucketPolicyOnly.enabled may be changed from true to false until the locked time, after which the field is immutable.",
      ).optional(),
    }).describe(
      "The bucket's uniform bucket-level access configuration. The feature was formerly known as Bucket Policy Only. For backward compatibility, this field will be populated with identical information as the uniformBucketLevelAccess field. We recommend using the uniformBucketLevelAccess field to enable and disable the feature.",
    ).optional(),
    publicAccessPrevention: z.string().describe(
      "The bucket's Public Access Prevention configuration. Currently, 'inherited' and 'enforced' are supported.",
    ).optional(),
    uniformBucketLevelAccess: z.object({
      enabled: z.boolean().describe(
        "If set, access is controlled only by bucket-level or above IAM policies.",
      ).optional(),
      lockedTime: z.string().describe(
        "The deadline for changing iamConfiguration.uniformBucketLevelAccess.enabled from true to false in RFC 3339 format. iamConfiguration.uniformBucketLevelAccess.enabled may be changed from true to false until the locked time, after which the field is immutable.",
      ).optional(),
    }).describe("The bucket's uniform bucket-level access configuration.")
      .optional(),
  }).describe("The bucket's IAM configuration.").optional(),
  id: z.string().describe(
    "The ID of the bucket. For buckets, the id and name properties are the same.",
  ).optional(),
  ipFilter: z.object({
    allowAllServiceAgentAccess: z.boolean().describe(
      "Whether to allow all service agents to access the bucket regardless of the IP filter configuration.",
    ).optional(),
    allowCrossOrgVpcs: z.boolean().describe(
      "Whether to allow cross-org VPCs in the bucket's IP filter configuration.",
    ).optional(),
    mode: z.string().describe(
      "The mode of the IP filter. Valid values are 'Enabled' and 'Disabled'.",
    ).optional(),
    publicNetworkSource: z.object({
      allowedIpCidrRanges: z.array(z.string()).describe(
        "The list of public IPv4, IPv6 cidr ranges that are allowed to access the bucket.",
      ).optional(),
    }).describe("The public network source of the bucket's IP filter.")
      .optional(),
    vpcNetworkSources: z.array(z.object({
      allowedIpCidrRanges: z.array(z.string()).describe(
        "The list of IPv4, IPv6 cidr ranges subnetworks that are allowed to access the bucket.",
      ).optional(),
      network: z.string().describe(
        "Name of the network. Format: projects/{PROJECT_ID}/global/networks/{NETWORK_NAME}",
      ).optional(),
    })).describe(
      "The list of [VPC network](https://cloud.google.com/vpc/docs/vpc) sources of the bucket's IP filter.",
    ).optional(),
  }).describe(
    "The bucket's IP filter configuration. Specifies the network sources that are allowed to access the operations on the bucket, as well as its underlying objects. Only enforced when the mode is set to 'Enabled'.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "User-provided labels, in key/value pairs.",
  ).optional(),
  lifecycle: z.object({
    rule: z.array(z.object({
      action: z.object({
        storageClass: z.string().describe(
          "Target storage class. Required iff the type of the action is SetStorageClass.",
        ).optional(),
        type: z.string().describe(
          "Type of the action. Currently, only Delete, SetStorageClass, and AbortIncompleteMultipartUpload are supported.",
        ).optional(),
      }).describe("The action to take.").optional(),
      condition: z.object({
        age: z.number().int().describe(
          "Age of an object (in days). This condition is satisfied when an object reaches the specified age.",
        ).optional(),
        createdBefore: z.string().describe(
          'A date in RFC 3339 format with only the date part (for instance, "2013-01-15"). This condition is satisfied when an object is created before midnight of the specified date in UTC.',
        ).optional(),
        customTimeBefore: z.string().describe(
          'A date in RFC 3339 format with only the date part (for instance, "2013-01-15"). This condition is satisfied when the custom time on an object is before this date in UTC.',
        ).optional(),
        daysSinceCustomTime: z.number().int().describe(
          "Number of days elapsed since the user-specified timestamp set on an object. The condition is satisfied if the days elapsed is at least this number. If no custom timestamp is specified on an object, the condition does not apply.",
        ).optional(),
        daysSinceNoncurrentTime: z.number().int().describe(
          "Number of days elapsed since the noncurrent timestamp of an object. The condition is satisfied if the days elapsed is at least this number. This condition is relevant only for versioned objects. The value of the field must be a nonnegative integer. If it's zero, the object version will become eligible for Lifecycle action as soon as it becomes noncurrent.",
        ).optional(),
        isLive: z.boolean().describe(
          "Relevant only for versioned objects. If the value is true, this condition matches live objects; if the value is false, it matches archived objects.",
        ).optional(),
        matchesPattern: z.string().describe(
          'A regular expression that satisfies the RE2 syntax. This condition is satisfied when the name of the object matches the RE2 pattern. Note: This feature is currently in the "Early Access" launch stage and is only available to a whitelisted set of users; that means that this feature may be changed in backward-incompatible ways and that it is not guaranteed to be released.',
        ).optional(),
        matchesPrefix: z.array(z.unknown()).describe(
          "List of object name prefixes. This condition will be satisfied when at least one of the prefixes exactly matches the beginning of the object name.",
        ).optional(),
        matchesStorageClass: z.array(z.unknown()).describe(
          "Objects having any of the storage classes specified by this condition will be matched. Values include MULTI_REGIONAL, REGIONAL, NEARLINE, COLDLINE, ARCHIVE, STANDARD, and DURABLE_REDUCED_AVAILABILITY.",
        ).optional(),
        matchesSuffix: z.array(z.unknown()).describe(
          "List of object name suffixes. This condition will be satisfied when at least one of the suffixes exactly matches the end of the object name.",
        ).optional(),
        noncurrentTimeBefore: z.string().describe(
          'A date in RFC 3339 format with only the date part (for instance, "2013-01-15"). This condition is satisfied when the noncurrent time on an object is before this date in UTC. This condition is relevant only for versioned objects.',
        ).optional(),
        numNewerVersions: z.number().int().describe(
          "Relevant only for versioned objects. If the value is N, this condition is satisfied when there are at least N versions (including the live version) newer than this version of the object.",
        ).optional(),
      }).describe("The condition(s) under which the action will be taken.")
        .optional(),
    })).describe(
      "A lifecycle management rule, which is made of an action to take and the condition(s) under which the action will be taken.",
    ).optional(),
  }).describe(
    "The bucket's lifecycle configuration. See [Lifecycle Management](https://cloud.google.com/storage/docs/lifecycle) for more information.",
  ).optional(),
  location: z.string().describe(
    "The location of the bucket. Object data for objects in the bucket resides in physical storage within this region. Defaults to US. See the [Developer's Guide](https://cloud.google.com/storage/docs/locations) for the authoritative list.",
  ).optional(),
  locationType: z.string().describe("The type of the bucket location.")
    .optional(),
  logging: z.object({
    logBucket: z.string().describe(
      "The destination bucket where the current bucket's logs should be placed.",
    ).optional(),
    logObjectPrefix: z.string().describe("A prefix for log object names.")
      .optional(),
  }).describe(
    "The bucket's logging configuration, which defines the destination bucket and optional name prefix for the current bucket's logs.",
  ).optional(),
  metageneration: z.string().describe("The metadata generation of this bucket.")
    .optional(),
  name: z.string().describe("The name of the bucket.").optional(),
  objectRetention: z.object({
    mode: z.string().describe(
      "The bucket's object retention mode. Can be Enabled.",
    ).optional(),
  }).describe("The bucket's object retention config.").optional(),
  owner: z.object({
    entity: z.string().describe(
      "The entity, in the form project-owner-projectId.",
    ).optional(),
    entityId: z.string().describe("The ID for the entity.").optional(),
  }).describe(
    "The owner of the bucket. This is always the project team's owner group.",
  ).optional(),
  projectNumber: z.string().describe(
    "The project number of the project the bucket belongs to.",
  ).optional(),
  retentionPolicy: z.object({
    effectiveTime: z.string().describe(
      "Server-determined value that indicates the time from which policy was enforced and effective. This value is in RFC 3339 format.",
    ).optional(),
    isLocked: z.boolean().describe(
      "Once locked, an object retention policy cannot be modified.",
    ).optional(),
    retentionPeriod: z.string().describe(
      "The duration in seconds that objects need to be retained. Retention duration must be greater than zero and less than 100 years. Note that enforcement of retention periods less than a day is not guaranteed. Such periods should only be used for testing purposes.",
    ).optional(),
  }).describe(
    "The bucket's retention policy. The retention policy enforces a minimum retention time for all objects contained in the bucket, based on their creation time. Any attempt to overwrite or delete objects younger than the retention period will result in a PERMISSION_DENIED error. An unlocked retention policy can be modified or removed from the bucket via a storage.buckets.update operation. A locked retention policy cannot be removed or shortened in duration for the lifetime of the bucket. Attempting to remove or decrease period of a locked retention policy will result in a PERMISSION_DENIED error.",
  ).optional(),
  rpo: z.string().describe(
    "The Recovery Point Objective (RPO) of this bucket. Set to ASYNC_TURBO to turn on Turbo Replication on a bucket.",
  ).optional(),
  satisfiesPZI: z.boolean().describe("Reserved for future use.").optional(),
  satisfiesPZS: z.boolean().describe("Reserved for future use.").optional(),
  softDeletePolicy: z.object({
    effectiveTime: z.string().describe(
      "Server-determined value that indicates the time from which the policy, or one with a greater retention, was effective. This value is in RFC 3339 format.",
    ).optional(),
    retentionDurationSeconds: z.string().describe(
      "The duration in seconds that soft-deleted objects in the bucket will be retained and cannot be permanently deleted.",
    ).optional(),
  }).describe(
    "The bucket's soft delete policy, which defines the period of time that soft-deleted objects will be retained, and cannot be permanently deleted.",
  ).optional(),
  softDeleteTime: z.string().describe(
    "The soft delete time of the bucket in RFC 3339 format.",
  ).optional(),
  storageClass: z.string().describe(
    "The bucket's default storage class, used whenever no storageClass is specified for a newly-created object. This defines how objects in the bucket are stored and determines the SLA and the cost of storage. Values include MULTI_REGIONAL, REGIONAL, STANDARD, NEARLINE, COLDLINE, ARCHIVE, and DURABLE_REDUCED_AVAILABILITY. If this value is not specified when the bucket is created, it will default to STANDARD. For more information, see [Storage Classes](https://cloud.google.com/storage/docs/storage-classes).",
  ).optional(),
  timeCreated: z.string().describe(
    "The creation time of the bucket in RFC 3339 format.",
  ).optional(),
  updated: z.string().describe(
    "The modification time of the bucket in RFC 3339 format.",
  ).optional(),
  versioning: z.object({
    enabled: z.boolean().describe(
      "While set to true, versioning is fully enabled for this bucket.",
    ).optional(),
  }).describe("The bucket's versioning configuration.").optional(),
  website: z.object({
    mainPageSuffix: z.string().describe(
      "If the requested object path is missing, the service will ensure the path has a trailing '/', append this suffix, and attempt to retrieve the resulting object. This allows the creation of index.html objects to represent directory pages.",
    ).optional(),
    notFoundPage: z.string().describe(
      "If the requested object path is missing, and any mainPageSuffix object is missing, if applicable, the service will return the named object from this bucket as the content for a 404 Not Found result.",
    ).optional(),
  }).describe(
    "The bucket's website configuration, controlling how the service behaves when accessing bucket contents as a web site. See the [Static Website Examples](https://cloud.google.com/storage/docs/static-website) for more information.",
  ).optional(),
  enableObjectRetention: z.string().describe(
    "When set to true, object retention is enabled for this bucket.",
  ).optional(),
  predefinedAcl: z.string().describe(
    "Apply a predefined set of access controls to this bucket.",
  ).optional(),
  predefinedDefaultObjectAcl: z.string().describe(
    "Apply a predefined set of default object access controls to this bucket.",
  ).optional(),
  project: z.string().describe("A valid API project identifier.").optional(),
  projection: z.string().describe(
    "Set of properties to return. Defaults to noAcl, unless the bucket resource specifies acl or defaultObjectAcl properties, when it defaults to full.",
  ).optional(),
  userProject: z.string().describe("The project to be billed for this request.")
    .optional(),
});

/** Swamp extension model for Google Cloud Storage JSON Buckets. Registered at `@swamp/gcp/storage/buckets`. */
export const model = {
  type: "@swamp/gcp/storage/buckets",
  version: "2026.05.25.2",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.2",
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
      toVersion: "2026.04.03.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.22.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.22.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.22.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.25.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A bucket.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a buckets",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["acl"] !== undefined) body["acl"] = g["acl"];
        if (g["autoclass"] !== undefined) body["autoclass"] = g["autoclass"];
        if (g["billing"] !== undefined) body["billing"] = g["billing"];
        if (g["cors"] !== undefined) body["cors"] = g["cors"];
        if (g["customPlacementConfig"] !== undefined) {
          body["customPlacementConfig"] = g["customPlacementConfig"];
        }
        if (g["defaultEventBasedHold"] !== undefined) {
          body["defaultEventBasedHold"] = g["defaultEventBasedHold"];
        }
        if (g["defaultObjectAcl"] !== undefined) {
          body["defaultObjectAcl"] = g["defaultObjectAcl"];
        }
        if (g["encryption"] !== undefined) body["encryption"] = g["encryption"];
        if (g["generation"] !== undefined) body["generation"] = g["generation"];
        if (g["hardDeleteTime"] !== undefined) {
          body["hardDeleteTime"] = g["hardDeleteTime"];
        }
        if (g["hierarchicalNamespace"] !== undefined) {
          body["hierarchicalNamespace"] = g["hierarchicalNamespace"];
        }
        if (g["iamConfiguration"] !== undefined) {
          body["iamConfiguration"] = g["iamConfiguration"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["ipFilter"] !== undefined) body["ipFilter"] = g["ipFilter"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["lifecycle"] !== undefined) body["lifecycle"] = g["lifecycle"];
        if (g["location"] !== undefined) body["location"] = g["location"];
        if (g["locationType"] !== undefined) {
          body["locationType"] = g["locationType"];
        }
        if (g["logging"] !== undefined) body["logging"] = g["logging"];
        if (g["metageneration"] !== undefined) {
          body["metageneration"] = g["metageneration"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["objectRetention"] !== undefined) {
          body["objectRetention"] = g["objectRetention"];
        }
        if (g["owner"] !== undefined) body["owner"] = g["owner"];
        if (g["projectNumber"] !== undefined) {
          body["projectNumber"] = g["projectNumber"];
        }
        if (g["retentionPolicy"] !== undefined) {
          body["retentionPolicy"] = g["retentionPolicy"];
        }
        if (g["rpo"] !== undefined) body["rpo"] = g["rpo"];
        if (g["satisfiesPZI"] !== undefined) {
          body["satisfiesPZI"] = g["satisfiesPZI"];
        }
        if (g["satisfiesPZS"] !== undefined) {
          body["satisfiesPZS"] = g["satisfiesPZS"];
        }
        if (g["softDeletePolicy"] !== undefined) {
          body["softDeletePolicy"] = g["softDeletePolicy"];
        }
        if (g["softDeleteTime"] !== undefined) {
          body["softDeleteTime"] = g["softDeleteTime"];
        }
        if (g["storageClass"] !== undefined) {
          body["storageClass"] = g["storageClass"];
        }
        if (g["timeCreated"] !== undefined) {
          body["timeCreated"] = g["timeCreated"];
        }
        if (g["updated"] !== undefined) body["updated"] = g["updated"];
        if (g["versioning"] !== undefined) body["versioning"] = g["versioning"];
        if (g["website"] !== undefined) body["website"] = g["website"];
        if (g["enableObjectRetention"] !== undefined) {
          body["enableObjectRetention"] = g["enableObjectRetention"];
        }
        if (g["predefinedAcl"] !== undefined) {
          body["predefinedAcl"] = g["predefinedAcl"];
        }
        if (g["predefinedDefaultObjectAcl"] !== undefined) {
          body["predefinedDefaultObjectAcl"] = g["predefinedDefaultObjectAcl"];
        }
        if (g["projection"] !== undefined) body["projection"] = g["projection"];
        if (g["userProject"] !== undefined) {
          body["userProject"] = g["userProject"];
        }
        if (g["name"] !== undefined) params["bucket"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "project": projectId },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
        ) as StateData;
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
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
      description: "Get a buckets",
      arguments: z.object({
        identifier: z.string().describe("The name of the buckets"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["bucket"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
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
      description: "Update buckets attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        const params: Record<string, string> = { project: projectId };
        params["bucket"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["acl"] !== undefined) body["acl"] = g["acl"];
        if (g["autoclass"] !== undefined) body["autoclass"] = g["autoclass"];
        if (g["billing"] !== undefined) body["billing"] = g["billing"];
        if (g["cors"] !== undefined) body["cors"] = g["cors"];
        if (g["customPlacementConfig"] !== undefined) {
          body["customPlacementConfig"] = g["customPlacementConfig"];
        }
        if (g["defaultEventBasedHold"] !== undefined) {
          body["defaultEventBasedHold"] = g["defaultEventBasedHold"];
        }
        if (g["defaultObjectAcl"] !== undefined) {
          body["defaultObjectAcl"] = g["defaultObjectAcl"];
        }
        if (g["encryption"] !== undefined) body["encryption"] = g["encryption"];
        if (g["generation"] !== undefined) body["generation"] = g["generation"];
        if (g["hardDeleteTime"] !== undefined) {
          body["hardDeleteTime"] = g["hardDeleteTime"];
        }
        if (g["hierarchicalNamespace"] !== undefined) {
          body["hierarchicalNamespace"] = g["hierarchicalNamespace"];
        }
        if (g["iamConfiguration"] !== undefined) {
          body["iamConfiguration"] = g["iamConfiguration"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["ipFilter"] !== undefined) body["ipFilter"] = g["ipFilter"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["lifecycle"] !== undefined) body["lifecycle"] = g["lifecycle"];
        if (g["location"] !== undefined) body["location"] = g["location"];
        if (g["locationType"] !== undefined) {
          body["locationType"] = g["locationType"];
        }
        if (g["logging"] !== undefined) body["logging"] = g["logging"];
        if (g["metageneration"] !== undefined) {
          body["metageneration"] = g["metageneration"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["objectRetention"] !== undefined) {
          body["objectRetention"] = g["objectRetention"];
        }
        if (g["owner"] !== undefined) body["owner"] = g["owner"];
        if (g["projectNumber"] !== undefined) {
          body["projectNumber"] = g["projectNumber"];
        }
        if (g["retentionPolicy"] !== undefined) {
          body["retentionPolicy"] = g["retentionPolicy"];
        }
        if (g["rpo"] !== undefined) body["rpo"] = g["rpo"];
        if (g["satisfiesPZI"] !== undefined) {
          body["satisfiesPZI"] = g["satisfiesPZI"];
        }
        if (g["satisfiesPZS"] !== undefined) {
          body["satisfiesPZS"] = g["satisfiesPZS"];
        }
        if (g["softDeletePolicy"] !== undefined) {
          body["softDeletePolicy"] = g["softDeletePolicy"];
        }
        if (g["softDeleteTime"] !== undefined) {
          body["softDeleteTime"] = g["softDeleteTime"];
        }
        if (g["storageClass"] !== undefined) {
          body["storageClass"] = g["storageClass"];
        }
        if (g["timeCreated"] !== undefined) {
          body["timeCreated"] = g["timeCreated"];
        }
        if (g["updated"] !== undefined) body["updated"] = g["updated"];
        if (g["versioning"] !== undefined) body["versioning"] = g["versioning"];
        if (g["website"] !== undefined) body["website"] = g["website"];
        for (const key of Object.keys(existing)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = existing[key];
          }
        }
        const result = await updateResource(
          BASE_URL,
          UPDATE_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the buckets",
      arguments: z.object({
        identifier: z.string().describe("The name of the buckets"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["bucket"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
        );
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
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
      description: "Sync buckets state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        try {
          const params: Record<string, string> = { project: projectId };
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["bucket"] = identifier;
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
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
      description: "List buckets resources",
      arguments: z.object({
        maxResults: z.number().describe(
          "Maximum number of buckets to return in a single response. The service will use this parameter or 1,000 items, whichever is smaller.",
        ).optional(),
        prefix: z.string().describe(
          "Filter results to buckets whose names begin with this prefix.",
        ).optional(),
        project: z.string().describe("A valid API project identifier.")
          .optional(),
        projection: z.string().describe(
          "Set of properties to return. Defaults to noAcl.",
        ).optional(),
        returnPartialSuccess: z.boolean().describe(
          "If true, return a list of bucket resource names for buckets that are in unreachable locations.",
        ).optional(),
        softDeleted: z.boolean().describe(
          "If true, only soft-deleted bucket versions will be returned. The default is false. For more information, see [Soft Delete](https://cloud.google.com/storage/docs/soft-delete).",
        ).optional(),
        userProject: z.string().describe(
          "The project to be billed for this request.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["prefix"] !== undefined) {
          params["prefix"] = String(args["prefix"]);
        }
        if (args["project"] !== undefined) {
          params["project"] = String(args["project"]);
        }
        if (args["projection"] !== undefined) {
          params["projection"] = String(args["projection"]);
        }
        if (args["returnPartialSuccess"] !== undefined) {
          params["returnPartialSuccess"] = String(args["returnPartialSuccess"]);
        }
        if (args["softDeleted"] !== undefined) {
          params["softDeleted"] = String(args["softDeleted"]);
        }
        if (args["userProject"] !== undefined) {
          params["userProject"] = String(args["userProject"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "items",
          (args.maxPages as number | undefined) ?? 10,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.name?.toString() ?? String(i)).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource(
            "state",
            instanceName,
            item,
          );
          dataHandles.push(handle);
        }
        return { dataHandles, result: { count: items.length, nextPageToken } };
      },
    },
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["bucket"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "storage.buckets.getIamPolicy",
            "path": "b/{bucket}/iam",
            "httpMethod": "GET",
            "parameterOrder": ["bucket"],
            "parameters": {
              "bucket": { "location": "path", "required": true },
              "optionsRequestedPolicyVersion": { "location": "query" },
              "userProject": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_storage_layout: {
      description: "get storage layout",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["bucket"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "storage.buckets.getStorageLayout",
            "path": "b/{bucket}/storageLayout",
            "httpMethod": "GET",
            "parameterOrder": ["bucket"],
            "parameters": {
              "bucket": { "location": "path", "required": true },
              "prefix": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    lock_retention_policy: {
      description: "lock retention policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["bucket"] = existing["bucket"]?.toString() ??
          g["bucket"]?.toString() ?? "";
        params["ifMetagenerationMatch"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "storage.buckets.lockRetentionPolicy",
            "path": "b/{bucket}/lockRetentionPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["bucket", "ifMetagenerationMatch"],
            "parameters": {
              "bucket": { "location": "path", "required": true },
              "ifMetagenerationMatch": {
                "location": "query",
                "required": true,
              },
              "userProject": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    relocate: {
      description: "relocate",
      arguments: z.object({
        destinationCustomPlacementConfig: z.any().optional(),
        destinationKmsKeyName: z.any().optional(),
        destinationLocation: z.any().optional(),
        validateOnly: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["bucket"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["destinationCustomPlacementConfig"] !== undefined) {
          body["destinationCustomPlacementConfig"] =
            args["destinationCustomPlacementConfig"];
        }
        if (args["destinationKmsKeyName"] !== undefined) {
          body["destinationKmsKeyName"] = args["destinationKmsKeyName"];
        }
        if (args["destinationLocation"] !== undefined) {
          body["destinationLocation"] = args["destinationLocation"];
        }
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "storage.buckets.relocate",
            "path": "b/{bucket}/relocate",
            "httpMethod": "POST",
            "parameterOrder": ["bucket"],
            "parameters": {
              "bucket": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    restore: {
      description: "restore",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["generation"] !== undefined) {
          params["generation"] = String(g["generation"]);
        }
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["bucket"] = existing["bucket"]?.toString() ??
          g["bucket"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "storage.buckets.restore",
            "path": "b/{bucket}/restore",
            "httpMethod": "POST",
            "parameterOrder": ["bucket", "generation"],
            "parameters": {
              "bucket": { "location": "path", "required": true },
              "generation": { "location": "query", "required": true },
              "projection": { "location": "query" },
              "userProject": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        bindings: z.any().optional(),
        etag: z.any().optional(),
        kind: z.any().optional(),
        resourceId: z.any().optional(),
        version: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["bucket"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["bindings"] !== undefined) body["bindings"] = args["bindings"];
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["kind"] !== undefined) body["kind"] = args["kind"];
        if (args["resourceId"] !== undefined) {
          body["resourceId"] = args["resourceId"];
        }
        if (args["version"] !== undefined) body["version"] = args["version"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "storage.buckets.setIamPolicy",
            "path": "b/{bucket}/iam",
            "httpMethod": "PUT",
            "parameterOrder": ["bucket"],
            "parameters": {
              "bucket": { "location": "path", "required": true },
              "userProject": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["bucket"] = existing["bucket"]?.toString() ??
          g["bucket"]?.toString() ?? "";
        params["permissions"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "storage.buckets.testIamPermissions",
            "path": "b/{bucket}/iam/testPermissions",
            "httpMethod": "GET",
            "parameterOrder": ["bucket", "permissions"],
            "parameters": {
              "bucket": { "location": "path", "required": true },
              "permissions": { "location": "query", "required": true },
              "userProject": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    ...iamBindingMethods,
  },
};
