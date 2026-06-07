// Auto-generated extension model for @swamp/gcp/oracledatabase/goldengatedeployments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Oracle Database@Google Cloud GoldengateDeployments.
 *
 * GoldengateDeployment Goldengate Deployment resource model.
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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/goldengateDeployments/${shortName}`;
}

const BASE_URL = "https://oracledatabase.googleapis.com/";

const GET_CONFIG = {
  "id": "oracledatabase.projects.locations.goldengateDeployments.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "oracledatabase.projects.locations.goldengateDeployments.create",
  "path": "v1/{+parent}/goldengateDeployments",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "goldengateDeploymentId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "oracledatabase.projects.locations.goldengateDeployments.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "oracledatabase.projects.locations.goldengateDeployments.list",
  "path": "v1/{+parent}/goldengateDeployments",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name for the GoldengateDeployment.",
  ).optional(),
  gcpOracleZone: z.string().describe(
    "Optional. The GCP Oracle zone where Oracle GoldengateDeployment is hosted. Example: us-east4-b-r2. If not specified, the system will pick a zone based on availability.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels or tags associated with the GoldengateDeployment.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The name of the GoldengateDeployment resource in the following format: projects/{project}/locations/{region}/goldengateDeployments/{goldengate_deployment}",
  ).optional(),
  odbNetwork: z.string().describe(
    "Optional. The name of the OdbNetwork associated with the GoldengateDeployment.",
  ).optional(),
  odbSubnet: z.string().describe(
    "Required. The name of the OdbSubnet associated with the GoldengateDeployment for IP allocation.",
  ).optional(),
  properties: z.object({
    backupSchedule: z.object({
      backupScheduledTime: z.string().describe(
        "Output only. The timestamp of when the backup was scheduled.",
      ).optional(),
      bucket: z.string().describe("Output only. The bucket name.").optional(),
      compartmentId: z.string().describe("Output only. The compartment id.")
        .optional(),
      frequencyBackupScheduled: z.enum([
        "FREQUENCY_BACKUP_SCHEDULED_UNSPECIFIED",
        "DAILY",
        "WEEKLY",
        "MONTHLY",
      ]).describe("Output only. The frequency backup scheduled.").optional(),
      metadataOnly: z.boolean().describe("Output only. If metadata only.")
        .optional(),
      namespace: z.string().describe("Output only. The namespace name.")
        .optional(),
    }).describe("The backup schedule of the GoldengateDeployment.").optional(),
    category: z.enum([
      "GOLDENGATE_DEPLOYMENT_CATEGORY_UNSPECIFIED",
      "DATA_REPLICATION",
      "DATA_TRANSFORMS",
    ]).describe("Output only. The category of the GoldengateDeployment.")
      .optional(),
    cpuCoreCount: z.number().int().describe(
      "Optional. The Minimum number of OCPUs to be made available for this Deployment.",
    ).optional(),
    deploymentBackupId: z.string().describe(
      "Output only. The deployment backup id of the GoldengateDeployment.",
    ).optional(),
    deploymentDiagnosticData: z.object({
      bucket: z.string().describe("Output only. The bucket name.").optional(),
      diagnosticEndTime: z.string().describe(
        "Output only. The time diagnostic end.",
      ).optional(),
      diagnosticStartTime: z.string().describe(
        "Output only. The time diagnostic start.",
      ).optional(),
      diagnosticState: z.enum([
        "DIAGNOSTIC_STATE_UNSPECIFIED",
        "IN_PROGRESS",
        "SUCCEEDED",
        "FAILED",
      ]).describe("Output only. The diagnostic state.").optional(),
      namespace: z.string().describe("Output only. The namespace name.")
        .optional(),
      object: z.string().describe("Output only. The object name.").optional(),
    }).describe("The deployment diagnostic data.").optional(),
    deploymentRole: z.enum([
      "GOLDENGATE_DEPLOYMENT_ROLE_TYPE_UNSPECIFIED",
      "PRIMARY",
      "STANDBY",
    ]).describe("Output only. The deployment role of the GoldengateDeployment.")
      .optional(),
    deploymentType: z.string().describe(
      "Required. A valid Goldengate Deployment type. For a list of supported types, use the `ListGoldengateDeploymentTypes` operation.",
    ).optional(),
    deploymentUrl: z.string().describe(
      "Output only. The deployment url of the GoldengateDeployment.",
    ).optional(),
    description: z.string().describe(
      "Optional. The description of the GoldengateDeployment.",
    ).optional(),
    environmentType: z.string().describe(
      "Optional. The environment type of the GoldengateDeployment.",
    ).optional(),
    fqdn: z.string().describe(
      "Output only. The Fully Qualified Domain Name of the GoldengateDeployment.",
    ).optional(),
    healthy: z.boolean().describe(
      "Output only. Whether the GoldengateDeployment is healthy.",
    ).optional(),
    ingressIps: z.array(z.object({
      ingressIpAddress: z.string().describe("Output only. The ingress IP.")
        .optional(),
    })).describe("Output only. The ingress ips of the GoldengateDeployment.")
      .optional(),
    isAutoScalingEnabled: z.boolean().describe(
      "Optional. Indicates if auto scaling is enabled for the Deployment's CPU core count.",
    ).optional(),
    isLatestVersion: z.boolean().describe(
      "Output only. Whether the GoldengateDeployment is of the latest version.",
    ).optional(),
    isPublic: z.boolean().describe(
      "Output only. Whether the GoldengateDeployment is public.",
    ).optional(),
    isStorageUtilizationLimitExceeded: z.boolean().describe(
      "Output only. Whether storage utilization limit is exceeded of the GoldengateDeployment.",
    ).optional(),
    lastBackupScheduleTime: z.string().describe(
      "Output only. The time last backup scheduled of the GoldengateDeployment.",
    ).optional(),
    licenseModel: z.enum([
      "LICENSE_MODEL_UNSPECIFIED",
      "LICENSE_INCLUDED",
      "BRING_YOUR_OWN_LICENSE",
    ]).describe(
      "Optional. The Oracle license model that applies to a Deployment.",
    ).optional(),
    lifecycleDetails: z.string().describe(
      "Output only. The lifecycle details of the GoldengateDeployment.",
    ).optional(),
    lifecycleState: z.enum([
      "GOLDENGATE_DEPLOYMENT_LIFECYCLE_STATE_UNSPECIFIED",
      "CREATING",
      "UPDATING",
      "ACTIVE",
      "INACTIVE",
      "DELETING",
      "DELETED",
      "FAILED",
      "NEEDS_ATTENTION",
      "IN_PROGRESS",
      "CANCELLING",
      "CANCELLED",
      "SUCCEEDED",
      "WAITING",
    ]).describe("Output only. State of the GoldengateDeployment.").optional(),
    lifecycleSubState: z.enum([
      "GOLDENGATE_DEPLOYMENT_LIFECYCLE_SUB_STATE_UNSPECIFIED",
      "RECOVERING",
      "STARTING",
      "STOPPING",
      "MOVING",
      "UPGRADING",
      "RESTORING",
      "BACKING_UP",
      "ROLLING_BACK",
    ]).describe(
      "Output only. The lifecycle sub-state of the GoldengateDeployment.",
    ).optional(),
    loadBalancerId: z.string().describe(
      "Output only. The load balancer id of the GoldengateDeployment.",
    ).optional(),
    loadBalancerSubnetId: z.string().describe(
      "Output only. The load balancer subnet id of the GoldengateDeployment.",
    ).optional(),
    locks: z.array(z.object({
      compartmentId: z.string().describe("Output only. The compartment id.")
        .optional(),
      createTime: z.string().describe("Output only. The time created.")
        .optional(),
      message: z.string().describe("Output only. The message.").optional(),
      relatedResourceId: z.string().describe(
        "Output only. The related resource id.",
      ).optional(),
      type: z.enum(["LOCK_TYPE_UNSPECIFIED", "FULL", "DELETE"]).describe(
        "Output only. The type of lock.",
      ).optional(),
    })).describe("Output only. The locks of the GoldengateDeployment.")
      .optional(),
    maintenanceConfig: z.object({
      bundleReleaseUpgradePeriodDays: z.number().int().describe(
        "Optional. Defines auto upgrade period for bundle releases. Manually configured period cannot be longer than service defined period for bundle releases. This period must be shorter or equal to major release upgrade period. Not passing this field during create will equate to using the service default.",
      ).optional(),
      interimReleaseUpgradePeriodDays: z.number().int().describe(
        "Optional. Defines auto upgrade period for interim releases. This period must be shorter or equal to bundle release upgrade period.",
      ).optional(),
      isInterimReleaseAutoUpgradeEnabled: z.boolean().describe(
        "Optional. By default auto upgrade for interim releases are not enabled. If auto-upgrade is enabled for interim release, you have to specify interim_release_upgrade_period_days too.",
      ).optional(),
      majorReleaseUpgradePeriodDays: z.number().int().describe(
        "Optional. Defines auto upgrade period for major releases. Manually configured period cannot be longer than service defined period for major releases. Not passing this field during create will equate to using the service default.",
      ).optional(),
      securityPatchUpgradePeriodDays: z.number().int().describe(
        "Optional. Defines auto upgrade period for releases with security fix. Manually configured period cannot be longer than service defined period for security releases. Not passing this field during create will equate to using the service default.",
      ).optional(),
    }).describe("The maintenance configuration of the GoldengateDeployment.")
      .optional(),
    maintenanceWindow: z.object({
      day: z.enum([
        "DAY_OF_WEEK_UNSPECIFIED",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ]).describe("Required. Days of the week.").optional(),
      startHour: z.number().int().describe(
        "Required. Start hour for maintenance period. Hour is in UTC.",
      ).optional(),
    }).describe("The maintenance window of the GoldengateDeployment.")
      .optional(),
    nextBackupScheduleTime: z.string().describe(
      "Output only. The time next backup scheduled of the GoldengateDeployment.",
    ).optional(),
    nextMaintenanceActionType: z.enum([
      "NEXT_MAINTENANCE_ACTION_TYPE_UNSPECIFIED",
      "UPGRADE",
    ]).describe(
      "Output only. The next maintenance action type of the GoldengateDeployment.",
    ).optional(),
    nextMaintenanceDescription: z.string().describe(
      "Output only. The next maintenance description of the GoldengateDeployment.",
    ).optional(),
    nextMaintenanceTime: z.string().describe(
      "Output only. The time of next maintenance of the GoldengateDeployment.",
    ).optional(),
    nsgIds: z.array(z.string()).describe(
      "Output only. The nsg ids of the GoldengateDeployment.",
    ).optional(),
    ocid: z.string().describe("Output only. OCID of the GoldengateDeployment.")
      .optional(),
    oggData: z.object({
      adminPassword: z.string().describe(
        "Optional. The Goldengate deployment console password in plain text.",
      ).optional(),
      adminPasswordSecretVersion: z.string().describe(
        "Optional. Input only. The Goldengate deployment console password secret version.",
      ).optional(),
      adminUsername: z.string().describe(
        "Required. The Goldengate deployment console username.",
      ).optional(),
      certificate: z.string().describe(
        "Output only. The certificate of the GoldengateDeployment.",
      ).optional(),
      credentialStore: z.enum([
        "CREDENTIAL_STORE_UNSPECIFIED",
        "GOLDENGATE",
        "IAM",
      ]).describe(
        "Output only. The credential store of the GoldengateDeployment.",
      ).optional(),
      deployment: z.string().describe(
        "Required. The name given to the Goldengate service deployment. The name must be 1 to 32 characters long, must contain only alphanumeric characters and must start with a letter.",
      ).optional(),
      groupRolesMapping: z.object({
        administratorGroupId: z.string().describe(
          "Output only. The administrator group id.",
        ).optional(),
        operatorGroupId: z.string().describe(
          "Output only. The operator group id.",
        ).optional(),
        securityGroupId: z.string().describe(
          "Output only. The security group id.",
        ).optional(),
        userGroupId: z.string().describe("Output only. The user group id.")
          .optional(),
      }).describe("The group to roles mapping of the GoldengateDeployment.")
        .optional(),
      identityDomainId: z.string().describe(
        "Output only. The identity domain id of the GoldengateDeployment.",
      ).optional(),
      oggVersion: z.string().describe("Optional. Version of OGG").optional(),
      passwordSecretId: z.string().describe(
        "Output only. The password secret id of the GoldengateDeployment.",
      ).optional(),
    }).describe("The Ogg data of the GoldengateDeployment.").optional(),
    oggVersionSupportEndTime: z.string().describe(
      "Output only. The time ogg version supported until of the GoldengateDeployment.",
    ).optional(),
    placements: z.array(z.object({
      availabilityDomain: z.string().describe(
        "Output only. The availability domain.",
      ).optional(),
      faultDomain: z.string().describe("Output only. The fault domain.")
        .optional(),
    })).describe("Output only. The placements of the GoldengateDeployment.")
      .optional(),
    privateIpAddress: z.string().describe(
      "Output only. The private ip address of the GoldengateDeployment.",
    ).optional(),
    publicIpAddress: z.string().describe(
      "Output only. The public ip address of the GoldengateDeployment.",
    ).optional(),
    roleChangeTime: z.string().describe(
      "Output only. The time when the role of the GoldengateDeployment was changed.",
    ).optional(),
    storageUtilizationBytes: z.string().describe(
      "Output only. The storage utilization in bytes of the GoldengateDeployment.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The time the GoldengateDeployment was updated.",
    ).optional(),
    upgradeRequiredTime: z.string().describe(
      "Output only. The time upgrade required of the GoldengateDeployment.",
    ).optional(),
  }).describe("Properties of GoldengateDeployment.").optional(),
  goldengateDeploymentId: z.string().describe(
    "Required. The ID of the GoldengateDeployment to create. This value is restricted to (^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$) and must be a maximum of 63 characters in length. The value must start with a letter and end with a letter or a number.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  entitlementId: z.string().optional(),
  gcpOracleZone: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  ociUrl: z.string().optional(),
  odbNetwork: z.string().optional(),
  odbSubnet: z.string().optional(),
  properties: z.object({
    backupSchedule: z.object({
      backupScheduledTime: z.string(),
      bucket: z.string(),
      compartmentId: z.string(),
      frequencyBackupScheduled: z.string(),
      metadataOnly: z.boolean(),
      namespace: z.string(),
    }),
    category: z.string(),
    cpuCoreCount: z.number(),
    deploymentBackupId: z.string(),
    deploymentDiagnosticData: z.object({
      bucket: z.string(),
      diagnosticEndTime: z.string(),
      diagnosticStartTime: z.string(),
      diagnosticState: z.string(),
      namespace: z.string(),
      object: z.string(),
    }),
    deploymentRole: z.string(),
    deploymentType: z.string(),
    deploymentUrl: z.string(),
    description: z.string(),
    environmentType: z.string(),
    fqdn: z.string(),
    healthy: z.boolean(),
    ingressIps: z.array(z.object({
      ingressIpAddress: z.string(),
    })),
    isAutoScalingEnabled: z.boolean(),
    isLatestVersion: z.boolean(),
    isPublic: z.boolean(),
    isStorageUtilizationLimitExceeded: z.boolean(),
    lastBackupScheduleTime: z.string(),
    licenseModel: z.string(),
    lifecycleDetails: z.string(),
    lifecycleState: z.string(),
    lifecycleSubState: z.string(),
    loadBalancerId: z.string(),
    loadBalancerSubnetId: z.string(),
    locks: z.array(z.object({
      compartmentId: z.string(),
      createTime: z.string(),
      message: z.string(),
      relatedResourceId: z.string(),
      type: z.string(),
    })),
    maintenanceConfig: z.object({
      bundleReleaseUpgradePeriodDays: z.number(),
      interimReleaseUpgradePeriodDays: z.number(),
      isInterimReleaseAutoUpgradeEnabled: z.boolean(),
      majorReleaseUpgradePeriodDays: z.number(),
      securityPatchUpgradePeriodDays: z.number(),
    }),
    maintenanceWindow: z.object({
      day: z.string(),
      startHour: z.number(),
    }),
    nextBackupScheduleTime: z.string(),
    nextMaintenanceActionType: z.string(),
    nextMaintenanceDescription: z.string(),
    nextMaintenanceTime: z.string(),
    nsgIds: z.array(z.string()),
    ocid: z.string(),
    oggData: z.object({
      adminPassword: z.string(),
      adminPasswordSecretVersion: z.string(),
      adminUsername: z.string(),
      certificate: z.string(),
      credentialStore: z.string(),
      deployment: z.string(),
      groupRolesMapping: z.object({
        administratorGroupId: z.string(),
        operatorGroupId: z.string(),
        securityGroupId: z.string(),
        userGroupId: z.string(),
      }),
      identityDomainId: z.string(),
      oggVersion: z.string(),
      passwordSecretId: z.string(),
    }),
    oggVersionSupportEndTime: z.string(),
    placements: z.array(z.object({
      availabilityDomain: z.string(),
      faultDomain: z.string(),
    })),
    privateIpAddress: z.string(),
    publicIpAddress: z.string(),
    roleChangeTime: z.string(),
    storageUtilizationBytes: z.string(),
    updateTime: z.string(),
    upgradeRequiredTime: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  displayName: z.string().describe(
    "Required. The display name for the GoldengateDeployment.",
  ).optional(),
  gcpOracleZone: z.string().describe(
    "Optional. The GCP Oracle zone where Oracle GoldengateDeployment is hosted. Example: us-east4-b-r2. If not specified, the system will pick a zone based on availability.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels or tags associated with the GoldengateDeployment.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The name of the GoldengateDeployment resource in the following format: projects/{project}/locations/{region}/goldengateDeployments/{goldengate_deployment}",
  ).optional(),
  odbNetwork: z.string().describe(
    "Optional. The name of the OdbNetwork associated with the GoldengateDeployment.",
  ).optional(),
  odbSubnet: z.string().describe(
    "Required. The name of the OdbSubnet associated with the GoldengateDeployment for IP allocation.",
  ).optional(),
  properties: z.object({
    backupSchedule: z.object({
      backupScheduledTime: z.string().describe(
        "Output only. The timestamp of when the backup was scheduled.",
      ).optional(),
      bucket: z.string().describe("Output only. The bucket name.").optional(),
      compartmentId: z.string().describe("Output only. The compartment id.")
        .optional(),
      frequencyBackupScheduled: z.enum([
        "FREQUENCY_BACKUP_SCHEDULED_UNSPECIFIED",
        "DAILY",
        "WEEKLY",
        "MONTHLY",
      ]).describe("Output only. The frequency backup scheduled.").optional(),
      metadataOnly: z.boolean().describe("Output only. If metadata only.")
        .optional(),
      namespace: z.string().describe("Output only. The namespace name.")
        .optional(),
    }).describe("The backup schedule of the GoldengateDeployment.").optional(),
    category: z.enum([
      "GOLDENGATE_DEPLOYMENT_CATEGORY_UNSPECIFIED",
      "DATA_REPLICATION",
      "DATA_TRANSFORMS",
    ]).describe("Output only. The category of the GoldengateDeployment.")
      .optional(),
    cpuCoreCount: z.number().int().describe(
      "Optional. The Minimum number of OCPUs to be made available for this Deployment.",
    ).optional(),
    deploymentBackupId: z.string().describe(
      "Output only. The deployment backup id of the GoldengateDeployment.",
    ).optional(),
    deploymentDiagnosticData: z.object({
      bucket: z.string().describe("Output only. The bucket name.").optional(),
      diagnosticEndTime: z.string().describe(
        "Output only. The time diagnostic end.",
      ).optional(),
      diagnosticStartTime: z.string().describe(
        "Output only. The time diagnostic start.",
      ).optional(),
      diagnosticState: z.enum([
        "DIAGNOSTIC_STATE_UNSPECIFIED",
        "IN_PROGRESS",
        "SUCCEEDED",
        "FAILED",
      ]).describe("Output only. The diagnostic state.").optional(),
      namespace: z.string().describe("Output only. The namespace name.")
        .optional(),
      object: z.string().describe("Output only. The object name.").optional(),
    }).describe("The deployment diagnostic data.").optional(),
    deploymentRole: z.enum([
      "GOLDENGATE_DEPLOYMENT_ROLE_TYPE_UNSPECIFIED",
      "PRIMARY",
      "STANDBY",
    ]).describe("Output only. The deployment role of the GoldengateDeployment.")
      .optional(),
    deploymentType: z.string().describe(
      "Required. A valid Goldengate Deployment type. For a list of supported types, use the `ListGoldengateDeploymentTypes` operation.",
    ).optional(),
    deploymentUrl: z.string().describe(
      "Output only. The deployment url of the GoldengateDeployment.",
    ).optional(),
    description: z.string().describe(
      "Optional. The description of the GoldengateDeployment.",
    ).optional(),
    environmentType: z.string().describe(
      "Optional. The environment type of the GoldengateDeployment.",
    ).optional(),
    fqdn: z.string().describe(
      "Output only. The Fully Qualified Domain Name of the GoldengateDeployment.",
    ).optional(),
    healthy: z.boolean().describe(
      "Output only. Whether the GoldengateDeployment is healthy.",
    ).optional(),
    ingressIps: z.array(z.object({
      ingressIpAddress: z.string().describe("Output only. The ingress IP.")
        .optional(),
    })).describe("Output only. The ingress ips of the GoldengateDeployment.")
      .optional(),
    isAutoScalingEnabled: z.boolean().describe(
      "Optional. Indicates if auto scaling is enabled for the Deployment's CPU core count.",
    ).optional(),
    isLatestVersion: z.boolean().describe(
      "Output only. Whether the GoldengateDeployment is of the latest version.",
    ).optional(),
    isPublic: z.boolean().describe(
      "Output only. Whether the GoldengateDeployment is public.",
    ).optional(),
    isStorageUtilizationLimitExceeded: z.boolean().describe(
      "Output only. Whether storage utilization limit is exceeded of the GoldengateDeployment.",
    ).optional(),
    lastBackupScheduleTime: z.string().describe(
      "Output only. The time last backup scheduled of the GoldengateDeployment.",
    ).optional(),
    licenseModel: z.enum([
      "LICENSE_MODEL_UNSPECIFIED",
      "LICENSE_INCLUDED",
      "BRING_YOUR_OWN_LICENSE",
    ]).describe(
      "Optional. The Oracle license model that applies to a Deployment.",
    ).optional(),
    lifecycleDetails: z.string().describe(
      "Output only. The lifecycle details of the GoldengateDeployment.",
    ).optional(),
    lifecycleState: z.enum([
      "GOLDENGATE_DEPLOYMENT_LIFECYCLE_STATE_UNSPECIFIED",
      "CREATING",
      "UPDATING",
      "ACTIVE",
      "INACTIVE",
      "DELETING",
      "DELETED",
      "FAILED",
      "NEEDS_ATTENTION",
      "IN_PROGRESS",
      "CANCELLING",
      "CANCELLED",
      "SUCCEEDED",
      "WAITING",
    ]).describe("Output only. State of the GoldengateDeployment.").optional(),
    lifecycleSubState: z.enum([
      "GOLDENGATE_DEPLOYMENT_LIFECYCLE_SUB_STATE_UNSPECIFIED",
      "RECOVERING",
      "STARTING",
      "STOPPING",
      "MOVING",
      "UPGRADING",
      "RESTORING",
      "BACKING_UP",
      "ROLLING_BACK",
    ]).describe(
      "Output only. The lifecycle sub-state of the GoldengateDeployment.",
    ).optional(),
    loadBalancerId: z.string().describe(
      "Output only. The load balancer id of the GoldengateDeployment.",
    ).optional(),
    loadBalancerSubnetId: z.string().describe(
      "Output only. The load balancer subnet id of the GoldengateDeployment.",
    ).optional(),
    locks: z.array(z.object({
      compartmentId: z.string().describe("Output only. The compartment id.")
        .optional(),
      createTime: z.string().describe("Output only. The time created.")
        .optional(),
      message: z.string().describe("Output only. The message.").optional(),
      relatedResourceId: z.string().describe(
        "Output only. The related resource id.",
      ).optional(),
      type: z.enum(["LOCK_TYPE_UNSPECIFIED", "FULL", "DELETE"]).describe(
        "Output only. The type of lock.",
      ).optional(),
    })).describe("Output only. The locks of the GoldengateDeployment.")
      .optional(),
    maintenanceConfig: z.object({
      bundleReleaseUpgradePeriodDays: z.number().int().describe(
        "Optional. Defines auto upgrade period for bundle releases. Manually configured period cannot be longer than service defined period for bundle releases. This period must be shorter or equal to major release upgrade period. Not passing this field during create will equate to using the service default.",
      ).optional(),
      interimReleaseUpgradePeriodDays: z.number().int().describe(
        "Optional. Defines auto upgrade period for interim releases. This period must be shorter or equal to bundle release upgrade period.",
      ).optional(),
      isInterimReleaseAutoUpgradeEnabled: z.boolean().describe(
        "Optional. By default auto upgrade for interim releases are not enabled. If auto-upgrade is enabled for interim release, you have to specify interim_release_upgrade_period_days too.",
      ).optional(),
      majorReleaseUpgradePeriodDays: z.number().int().describe(
        "Optional. Defines auto upgrade period for major releases. Manually configured period cannot be longer than service defined period for major releases. Not passing this field during create will equate to using the service default.",
      ).optional(),
      securityPatchUpgradePeriodDays: z.number().int().describe(
        "Optional. Defines auto upgrade period for releases with security fix. Manually configured period cannot be longer than service defined period for security releases. Not passing this field during create will equate to using the service default.",
      ).optional(),
    }).describe("The maintenance configuration of the GoldengateDeployment.")
      .optional(),
    maintenanceWindow: z.object({
      day: z.enum([
        "DAY_OF_WEEK_UNSPECIFIED",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ]).describe("Required. Days of the week.").optional(),
      startHour: z.number().int().describe(
        "Required. Start hour for maintenance period. Hour is in UTC.",
      ).optional(),
    }).describe("The maintenance window of the GoldengateDeployment.")
      .optional(),
    nextBackupScheduleTime: z.string().describe(
      "Output only. The time next backup scheduled of the GoldengateDeployment.",
    ).optional(),
    nextMaintenanceActionType: z.enum([
      "NEXT_MAINTENANCE_ACTION_TYPE_UNSPECIFIED",
      "UPGRADE",
    ]).describe(
      "Output only. The next maintenance action type of the GoldengateDeployment.",
    ).optional(),
    nextMaintenanceDescription: z.string().describe(
      "Output only. The next maintenance description of the GoldengateDeployment.",
    ).optional(),
    nextMaintenanceTime: z.string().describe(
      "Output only. The time of next maintenance of the GoldengateDeployment.",
    ).optional(),
    nsgIds: z.array(z.string()).describe(
      "Output only. The nsg ids of the GoldengateDeployment.",
    ).optional(),
    ocid: z.string().describe("Output only. OCID of the GoldengateDeployment.")
      .optional(),
    oggData: z.object({
      adminPassword: z.string().describe(
        "Optional. The Goldengate deployment console password in plain text.",
      ).optional(),
      adminPasswordSecretVersion: z.string().describe(
        "Optional. Input only. The Goldengate deployment console password secret version.",
      ).optional(),
      adminUsername: z.string().describe(
        "Required. The Goldengate deployment console username.",
      ).optional(),
      certificate: z.string().describe(
        "Output only. The certificate of the GoldengateDeployment.",
      ).optional(),
      credentialStore: z.enum([
        "CREDENTIAL_STORE_UNSPECIFIED",
        "GOLDENGATE",
        "IAM",
      ]).describe(
        "Output only. The credential store of the GoldengateDeployment.",
      ).optional(),
      deployment: z.string().describe(
        "Required. The name given to the Goldengate service deployment. The name must be 1 to 32 characters long, must contain only alphanumeric characters and must start with a letter.",
      ).optional(),
      groupRolesMapping: z.object({
        administratorGroupId: z.string().describe(
          "Output only. The administrator group id.",
        ).optional(),
        operatorGroupId: z.string().describe(
          "Output only. The operator group id.",
        ).optional(),
        securityGroupId: z.string().describe(
          "Output only. The security group id.",
        ).optional(),
        userGroupId: z.string().describe("Output only. The user group id.")
          .optional(),
      }).describe("The group to roles mapping of the GoldengateDeployment.")
        .optional(),
      identityDomainId: z.string().describe(
        "Output only. The identity domain id of the GoldengateDeployment.",
      ).optional(),
      oggVersion: z.string().describe("Optional. Version of OGG").optional(),
      passwordSecretId: z.string().describe(
        "Output only. The password secret id of the GoldengateDeployment.",
      ).optional(),
    }).describe("The Ogg data of the GoldengateDeployment.").optional(),
    oggVersionSupportEndTime: z.string().describe(
      "Output only. The time ogg version supported until of the GoldengateDeployment.",
    ).optional(),
    placements: z.array(z.object({
      availabilityDomain: z.string().describe(
        "Output only. The availability domain.",
      ).optional(),
      faultDomain: z.string().describe("Output only. The fault domain.")
        .optional(),
    })).describe("Output only. The placements of the GoldengateDeployment.")
      .optional(),
    privateIpAddress: z.string().describe(
      "Output only. The private ip address of the GoldengateDeployment.",
    ).optional(),
    publicIpAddress: z.string().describe(
      "Output only. The public ip address of the GoldengateDeployment.",
    ).optional(),
    roleChangeTime: z.string().describe(
      "Output only. The time when the role of the GoldengateDeployment was changed.",
    ).optional(),
    storageUtilizationBytes: z.string().describe(
      "Output only. The storage utilization in bytes of the GoldengateDeployment.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The time the GoldengateDeployment was updated.",
    ).optional(),
    upgradeRequiredTime: z.string().describe(
      "Output only. The time upgrade required of the GoldengateDeployment.",
    ).optional(),
  }).describe("Properties of GoldengateDeployment.").optional(),
  goldengateDeploymentId: z.string().describe(
    "Required. The ID of the GoldengateDeployment to create. This value is restricted to (^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$) and must be a maximum of 63 characters in length. The value must start with a letter and end with a letter or a number.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Oracle Database@Google Cloud GoldengateDeployments. Registered at `@swamp/gcp/oracledatabase/goldengatedeployments`. */
export const model = {
  type: "@swamp/gcp/oracledatabase/goldengatedeployments",
  version: "2026.06.07.1",
  upgrades: [
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "GoldengateDeployment Goldengate Deployment resource model.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a goldengateDeployments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["gcpOracleZone"] !== undefined) {
          body["gcpOracleZone"] = g["gcpOracleZone"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["odbNetwork"] !== undefined) body["odbNetwork"] = g["odbNetwork"];
        if (g["odbSubnet"] !== undefined) body["odbSubnet"] = g["odbSubnet"];
        if (g["properties"] !== undefined) body["properties"] = g["properties"];
        if (g["goldengateDeploymentId"] !== undefined) {
          body["goldengateDeploymentId"] = g["goldengateDeploymentId"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
          credentials,
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
      description: "Get a goldengateDeployments",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the goldengateDeployments",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
    delete: {
      description: "Delete the goldengateDeployments",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the goldengateDeployments",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
          credentials,
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
      description: "Sync goldengateDeployments state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            shortName,
          );
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
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
      description: "List goldengateDeployments resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. An expression for filtering the results of the request.",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. An expression for ordering the results of the request.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of items to return. If unspecified, at most 50 GoldengateDeployments will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "goldengateDeployments",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
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
    start: {
      description: "start",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "oracledatabase.projects.locations.goldengateDeployments.start",
            "path": "v1/{+name}:start",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    stop: {
      description: "stop",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "oracledatabase.projects.locations.goldengateDeployments.stop",
            "path": "v1/{+name}:stop",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
