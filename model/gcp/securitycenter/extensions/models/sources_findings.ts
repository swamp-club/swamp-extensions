// Auto-generated extension model for @swamp/gcp/securitycenter/sources-findings
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Security Command Center Sources.Findings.
 *
 * Result containing the Finding and its StateChange.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readViaList,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://securitycenter.googleapis.com/";

const PATCH_CONFIG = {
  "id": "securitycenter.folders.sources.findings.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "securitycenter.folders.sources.findings.list",
  "path": "v1/{+parent}/findings",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "compareDuration": {
      "location": "query",
    },
    "fieldMask": {
      "location": "query",
    },
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
    "readTime": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  access: z.object({
    callerIp: z.string().describe('Caller\'s IP address, such as "1.1.1.1".')
      .optional(),
    callerIpGeo: z.object({
      regionCode: z.string().describe("A CLDR.").optional(),
    }).describe("Represents a geographical location for a given access.")
      .optional(),
    methodName: z.string().describe(
      'The method that the service account called, e.g. "SetIamPolicy".',
    ).optional(),
    principalEmail: z.string().describe(
      'Associated email, such as "foo@google.com". The email address of the authenticated user or a service account acting on behalf of a third party principal making the request. For third party identity callers, the `principal_subject` field is populated instead of this field. For privacy reasons, the principal email address is sometimes redacted. For more information, see [Caller identities in audit logs](https://cloud.google.com/logging/docs/audit#user-id).',
    ).optional(),
    principalSubject: z.string().describe(
      "A string that represents the principal_subject that is associated with the identity. Unlike `principal_email`, `principal_subject` supports principals that aren't associated with email addresses, such as third party principals. For most identities, the format is `principal://iam.googleapis.com/{identity pool name}/subject/{subject}`. Some GKE identities, such as GKE_WORKLOAD, FREEFORM, and GKE_HUB_WORKLOAD, still use the legacy format `serviceAccount:{identity pool name}[{subject}]`.",
    ).optional(),
    serviceAccountDelegationInfo: z.array(z.object({
      principalEmail: z.string().describe(
        "The email address of a Google account.",
      ).optional(),
      principalSubject: z.string().describe(
        "A string representing the principal_subject associated with the identity. As compared to `principal_email`, supports principals that aren't associated with email addresses, such as third party principals. For most identities, the format will be `principal://iam.googleapis.com/{identity pool name}/subjects/{subject}` except for some GKE identities (GKE_WORKLOAD, FREEFORM, GKE_HUB_WORKLOAD) that are still in the legacy format `serviceAccount:{identity pool name}[{subject}]`",
      ).optional(),
    })).describe(
      "The identity delegation history of an authenticated service account that made the request. The `serviceAccountDelegationInfo[]` object contains information about the real authorities that try to access Google Cloud resources by delegating on a service account. When multiple authorities are present, they are guaranteed to be sorted based on the original ordering of the identity delegation events.",
    ).optional(),
    serviceAccountKeyName: z.string().describe(
      'The name of the service account key that was used to create or exchange credentials when authenticating the service account that made the request. This is a scheme-less URI full resource name. For example: "//iam.googleapis.com/projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}/keys/{key}".',
    ).optional(),
    serviceName: z.string().describe(
      'This is the API service that the service account made a call to, e.g. "iam.googleapis.com"',
    ).optional(),
    userAgent: z.string().describe(
      "The caller's user agent string associated with the finding.",
    ).optional(),
    userAgentFamily: z.string().describe(
      "Type of user agent associated with the finding. For example, an operating system shell or an embedded or standalone application.",
    ).optional(),
    userName: z.string().describe(
      "A string that represents a username. The username provided depends on the type of the finding and is likely not an IAM principal. For example, this can be a system username if the finding is related to a virtual machine, or it can be an application login username.",
    ).optional(),
  }).describe("Represents an access event.").optional(),
  affectedResources: z.object({
    count: z.string().describe(
      "The count of resources affected by the finding.",
    ).optional(),
  }).describe("Details about resources affected by this finding.").optional(),
  agentDataAccessEvents: z.array(z.object({
    eventId: z.string().describe("Unique identifier for data access event.")
      .optional(),
    eventTime: z.string().describe("Timestamp of data access event.")
      .optional(),
    operation: z.enum(["OPERATION_UNSPECIFIED", "READ", "MOVE", "COPY"])
      .describe("The operation performed by the principal to access the data.")
      .optional(),
    principalSubject: z.string().describe(
      "The agent principal that accessed the data.",
    ).optional(),
  })).describe("Agent data access events associated with the finding.")
    .optional(),
  aiModel: z.object({
    deploymentPlatform: z.enum([
      "DEPLOYMENT_PLATFORM_UNSPECIFIED",
      "VERTEX_AI",
      "GKE",
      "GCE",
      "FINE_TUNED_MODEL",
    ]).describe("The platform on which the model is deployed.").optional(),
    displayName: z.string().describe(
      "The user defined display name of model. Ex. baseline-classification-model",
    ).optional(),
    domain: z.string().describe(
      "The domain of the model, for example, “image-classification”.",
    ).optional(),
    library: z.string().describe(
      "The name of the model library, for example, “transformers”.",
    ).optional(),
    location: z.string().describe(
      "The region in which the model is used, for example, “us-central1”.",
    ).optional(),
    name: z.string().describe(
      'The name of the AI model, for example, "gemini:1.0.0".',
    ).optional(),
    publisher: z.string().describe(
      "The publisher of the model, for example, “google” or “nvidia”.",
    ).optional(),
    usageCategory: z.string().describe(
      'The purpose of the model, for example, "Inteference" or "Training".',
    ).optional(),
  }).describe(
    "Contains information about the AI model associated with the finding.",
  ).optional(),
  application: z.object({
    baseUri: z.string().describe(
      "The base URI that identifies the network location of the application in which the vulnerability was detected. For example, `http://example.com`.",
    ).optional(),
    fullUri: z.string().describe(
      "The full URI with payload that can be used to reproduce the vulnerability. For example, `http://example.com?p=aMmYgI6H`.",
    ).optional(),
  }).describe("Represents an application associated with a finding.")
    .optional(),
  artifactGuardPolicies: z.object({
    failingPolicies: z.array(z.object({
      failureReason: z.string().describe(
        'The reason for the policy failure, for example, "severity=HIGH AND max_vuln_count=2".',
      ).optional(),
      policyId: z.string().describe(
        'The ID of the failing policy, for example, "organizations/3392779/locations/global/policies/prod-policy".',
      ).optional(),
      type: z.enum(["ARTIFACT_GUARD_POLICY_TYPE_UNSPECIFIED", "VULNERABILITY"])
        .describe("The type of the policy evaluation.").optional(),
    })).describe("A list of failing policies.").optional(),
    resourceId: z.string().describe(
      "The ID of the resource that has policies configured for it.",
    ).optional(),
  }).describe("Represents the result of evaluating artifact guard policies.")
    .optional(),
  attackExposure: z.object({
    attackExposureResult: z.string().describe(
      "The resource name of the attack path simulation result that contains the details regarding this attack exposure score. Example: `organizations/123/simulations/456/attackExposureResults/789`",
    ).optional(),
    exposedHighValueResourcesCount: z.number().int().describe(
      "The number of high value resources that are exposed as a result of this finding.",
    ).optional(),
    exposedLowValueResourcesCount: z.number().int().describe(
      "The number of high value resources that are exposed as a result of this finding.",
    ).optional(),
    exposedMediumValueResourcesCount: z.number().int().describe(
      "The number of medium value resources that are exposed as a result of this finding.",
    ).optional(),
    latestCalculationTime: z.string().describe(
      "The most recent time the attack exposure was updated on this finding.",
    ).optional(),
    score: z.number().describe(
      "A number between 0 (inclusive) and infinity that represents how important this finding is to remediate. The higher the score, the more important it is to remediate.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "CALCULATED", "NOT_CALCULATED"])
      .describe(
        "What state this AttackExposure is in. This captures whether or not an attack exposure has been calculated or not.",
      ).optional(),
  }).describe(
    "An attack exposure contains the results of an attack path simulation run.",
  ).optional(),
  backupDisasterRecovery: z.object({
    appliance: z.string().describe(
      "The name of the Backup and DR appliance that captures, moves, and manages the lifecycle of backup data. For example, `backup-server-57137`.",
    ).optional(),
    applications: z.array(z.string()).describe(
      "The names of Backup and DR applications. An application is a VM, database, or file system on a managed host monitored by a backup and recovery appliance. For example, `centos7-01-vol00`, `centos7-01-vol01`, `centos7-01-vol02`.",
    ).optional(),
    backupCreateTime: z.string().describe(
      "The timestamp at which the Backup and DR backup was created.",
    ).optional(),
    backupTemplate: z.string().describe(
      "The name of a Backup and DR template which comprises one or more backup policies. See the [Backup and DR documentation](https://cloud.google.com/backup-disaster-recovery/docs/concepts/backup-plan#temp) for more information. For example, `snap-ov`.",
    ).optional(),
    backupType: z.string().describe(
      "The backup type of the Backup and DR image. For example, `Snapshot`, `Remote Snapshot`, `OnVault`.",
    ).optional(),
    host: z.string().describe(
      "The name of a Backup and DR host, which is managed by the backup and recovery appliance and known to the management console. The host can be of type Generic (for example, Compute Engine, SQL Server, Oracle DB, SMB file system, etc.), vCenter, or an ESX server. See the [Backup and DR documentation on hosts](https://cloud.google.com/backup-disaster-recovery/docs/configuration/manage-hosts-and-their-applications) for more information. For example, `centos7-01`.",
    ).optional(),
    policies: z.array(z.string()).describe(
      "The names of Backup and DR policies that are associated with a template and that define when to run a backup, how frequently to run a backup, and how long to retain the backup image. For example, `onvaults`.",
    ).optional(),
    policyOptions: z.array(z.string()).describe(
      "The names of Backup and DR advanced policy options of a policy applying to an application. See the [Backup and DR documentation on policy options](https://cloud.google.com/backup-disaster-recovery/docs/create-plan/policy-settings). For example, `skipofflineappsincongrp, nounmap`.",
    ).optional(),
    profile: z.string().describe(
      "The name of the Backup and DR resource profile that specifies the storage media for backups of application and VM data. See the [Backup and DR documentation on profiles](https://cloud.google.com/backup-disaster-recovery/docs/concepts/backup-plan#profile). For example, `GCP`.",
    ).optional(),
    storagePool: z.string().describe(
      "The name of the Backup and DR storage pool that the backup and recovery appliance is storing data in. The storage pool could be of type Cloud, Primary, Snapshot, or OnVault. See the [Backup and DR documentation on storage pools](https://cloud.google.com/backup-disaster-recovery/docs/concepts/storage-pools). For example, `DiskPoolOne`.",
    ).optional(),
  }).describe(
    "Information related to Google Cloud Backup and DR Service findings.",
  ).optional(),
  canonicalName: z.string().describe(
    'The canonical name of the finding. It\'s either "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}", "folders/{folder_id}/sources/{source_id}/findings/{finding_id}" or "projects/{project_number}/sources/{source_id}/findings/{finding_id}", depending on the closest CRM ancestor of the resource associated with the finding.',
  ).optional(),
  category: z.string().describe(
    'The additional taxonomy group within findings from a given source. This field is immutable after creation time. Example: "XSS_FLASH_INJECTION"',
  ).optional(),
  chokepoint: z.object({
    relatedFindings: z.array(z.string()).describe(
      "List of resource names of findings associated with this chokepoint. For example, organizations/123/sources/456/findings/789. This list will have at most 100 findings.",
    ).optional(),
  }).describe(
    "Contains details about a chokepoint, which is a resource or resource group where high-risk attack paths converge, based on [attack path simulations] (https://cloud.google.com/security-command-center/docs/attack-exposure-learn#attack_path_simulations).",
  ).optional(),
  cloudArmor: z.object({
    adaptiveProtection: z.object({
      confidence: z.number().describe(
        "A score of 0 means that there is low confidence that the detected event is an actual attack. A score of 1 means that there is high confidence that the detected event is an attack. See the [Adaptive Protection documentation](https://cloud.google.com/armor/docs/adaptive-protection-overview#configure-alert-tuning) for further explanation.",
      ).optional(),
    }).describe(
      "Information about [Google Cloud Armor Adaptive Protection](https://cloud.google.com/armor/docs/cloud-armor-overview#google-cloud-armor-adaptive-protection).",
    ).optional(),
    attack: z.object({
      classification: z.string().describe(
        "Type of attack, for example, 'SYN-flood', 'NTP-udp', or 'CHARGEN-udp'.",
      ).optional(),
      volumeBps: z.number().int().describe(
        "Total BPS (bytes per second) volume of attack. Deprecated - refer to volume_bps_long instead.",
      ).optional(),
      volumeBpsLong: z.string().describe(
        "Total BPS (bytes per second) volume of attack.",
      ).optional(),
      volumePps: z.number().int().describe(
        "Total PPS (packets per second) volume of attack. Deprecated - refer to volume_pps_long instead.",
      ).optional(),
      volumePpsLong: z.string().describe(
        "Total PPS (packets per second) volume of attack.",
      ).optional(),
    }).describe("Information about DDoS attack volume and classification.")
      .optional(),
    duration: z.string().describe(
      "Duration of attack from the start until the current moment (updated every 5 minutes).",
    ).optional(),
    requests: z.object({
      longTermAllowed: z.number().int().describe(
        "Allowed RPS (requests per second) over the long term.",
      ).optional(),
      longTermDenied: z.number().int().describe(
        "Denied RPS (requests per second) over the long term.",
      ).optional(),
      ratio: z.number().describe(
        "For 'Increasing deny ratio', the ratio is the denied traffic divided by the allowed traffic. For 'Allowed traffic spike', the ratio is the allowed traffic in the short term divided by allowed traffic in the long term.",
      ).optional(),
      shortTermAllowed: z.number().int().describe(
        "Allowed RPS (requests per second) in the short term.",
      ).optional(),
    }).describe("Information about the requests relevant to the finding.")
      .optional(),
    securityPolicy: z.object({
      name: z.string().describe(
        'The name of the Google Cloud Armor security policy, for example, "my-security-policy".',
      ).optional(),
      preview: z.boolean().describe(
        "Whether or not the associated rule or policy is in preview mode.",
      ).optional(),
      type: z.string().describe(
        "The type of Google Cloud Armor security policy for example, 'backend security policy', 'edge security policy', 'network edge security policy', or 'always-on DDoS protection'.",
      ).optional(),
    }).describe(
      "Information about the [Google Cloud Armor security policy](https://cloud.google.com/armor/docs/security-policy-overview) relevant to the finding.",
    ).optional(),
    threatVector: z.string().describe(
      'Distinguish between volumetric & protocol DDoS attack and application layer attacks. For example, "L3_4" for Layer 3 and Layer 4 DDoS attacks, or "L_7" for Layer 7 DDoS attacks.',
    ).optional(),
  }).describe("Fields related to Google Cloud Armor findings.").optional(),
  cloudDlpDataProfile: z.object({
    dataProfile: z.string().describe(
      "Name of the data profile, for example, `projects/123/locations/europe/tableProfiles/8383929`.",
    ).optional(),
    infoTypes: z.array(z.object({
      name: z.string().describe(
        "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
      ).optional(),
      sensitivityScore: z.object({
        score: z.enum([
          "SENSITIVITY_SCORE_LEVEL_UNSPECIFIED",
          "SENSITIVITY_LOW",
          "SENSITIVITY_UNKNOWN",
          "SENSITIVITY_MODERATE",
          "SENSITIVITY_HIGH",
        ]).describe("The sensitivity score applied to the resource.")
          .optional(),
      }).describe(
        "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
      ).optional(),
      version: z.string().describe("Optional version name for this InfoType.")
        .optional(),
    })).describe(
      "Type of information detected by SDP. Info type includes name, version and sensitivity of the detected information type.",
    ).optional(),
    parentType: z.enum(["PARENT_TYPE_UNSPECIFIED", "ORGANIZATION", "PROJECT"])
      .describe(
        "The resource hierarchy level at which the data profile was generated.",
      ).optional(),
  }).describe(
    "The [data profile](https://cloud.google.com/dlp/docs/data-profiles) associated with the finding.",
  ).optional(),
  cloudDlpInspection: z.object({
    fullScan: z.boolean().describe(
      "Whether Cloud DLP scanned the complete resource or a sampled subset.",
    ).optional(),
    infoType: z.string().describe(
      "The type of information (or *[infoType](https://cloud.google.com/dlp/docs/infotypes-reference)*) found, for example, `EMAIL_ADDRESS` or `STREET_ADDRESS`.",
    ).optional(),
    infoTypeCount: z.string().describe(
      "The number of times Cloud DLP found this infoType within this job and resource.",
    ).optional(),
    inspectJob: z.string().describe(
      "Name of the inspection job, for example, `projects/123/locations/europe/dlpJobs/i-8383929`.",
    ).optional(),
  }).describe(
    "Details about the Cloud Data Loss Prevention (Cloud DLP) [inspection job](https://cloud.google.com/dlp/docs/concepts-job-triggers) that produced the finding.",
  ).optional(),
  complianceDetails: z.object({
    cloudControl: z.object({
      cloudControlName: z.string().describe(
        "Name of the CloudControl associated with the finding.",
      ).optional(),
      policyType: z.string().describe("Policy type of the CloudControl")
        .optional(),
      type: z.enum(["CLOUD_CONTROL_TYPE_UNSPECIFIED", "BUILT_IN", "CUSTOM"])
        .describe("Type of cloud control.").optional(),
      version: z.number().int().describe("Version of the Cloud Control")
        .optional(),
    }).describe("CloudControl associated with the finding.").optional(),
    cloudControlDeploymentNames: z.array(z.string()).describe(
      "Cloud Control Deployments associated with the finding. For example, organizations/123/locations/global/cloudControlDeployments/deploymentIdentifier",
    ).optional(),
    frameworks: z.array(z.object({
      category: z.array(
        z.enum([
          "FRAMEWORK_CATEGORY_UNSPECIFIED",
          "SECURITY_BENCHMARKS",
          "ASSURED_WORKLOADS",
          "DATA_SECURITY",
          "GOOGLE_BEST_PRACTICES",
          "CUSTOM_FRAMEWORK",
        ]),
      ).describe(
        "Category of the framework associated with the finding. E.g. Security Benchmark, or Assured Workloads",
      ).optional(),
      controls: z.array(z.object({
        controlName: z.unknown().describe("Name of the Control").optional(),
        displayName: z.unknown().describe(
          "Display name of the control. For example, AU-02.",
        ).optional(),
      })).describe("The controls associated with the framework.").optional(),
      displayName: z.string().describe(
        "Display name of the framework. For a standard framework, this will look like e.g. PCI DSS 3.2.1, whereas for a custom framework it can be a user defined string like MyFramework",
      ).optional(),
      name: z.string().describe(
        "Name of the framework associated with the finding",
      ).optional(),
      type: z.enum([
        "FRAMEWORK_TYPE_UNSPECIFIED",
        "FRAMEWORK_TYPE_BUILT_IN",
        "FRAMEWORK_TYPE_CUSTOM",
      ]).describe(
        "Type of the framework associated with the finding, to specify whether the framework is built-in (pre-defined and immutable) or a custom framework defined by the customer (equivalent to security posture)",
      ).optional(),
    })).describe("Details of Frameworks associated with the finding")
      .optional(),
  }).describe("Compliance Details associated with the finding.").optional(),
  compliances: z.array(z.object({
    ids: z.array(z.string()).describe(
      "Policies within the standard or benchmark, for example, A.12.4.1",
    ).optional(),
    standard: z.string().describe(
      "Industry-wide compliance standards or benchmarks, such as CIS, PCI, and OWASP.",
    ).optional(),
    version: z.string().describe(
      "Version of the standard or benchmark, for example, 1.1",
    ).optional(),
  })).describe(
    "Contains compliance information for security standards associated to the finding.",
  ).optional(),
  connections: z.array(z.object({
    destinationIp: z.string().describe(
      "Destination IP address. Not present for sockets that are listening and not connected.",
    ).optional(),
    destinationPort: z.number().int().describe(
      "Destination port. Not present for sockets that are listening and not connected.",
    ).optional(),
    protocol: z.enum([
      "PROTOCOL_UNSPECIFIED",
      "ICMP",
      "TCP",
      "UDP",
      "GRE",
      "ESP",
    ]).describe("IANA Internet Protocol Number such as TCP(6) and UDP(17).")
      .optional(),
    sourceIp: z.string().describe("Source IP address.").optional(),
    sourcePort: z.number().int().describe("Source port.").optional(),
  })).describe(
    "Contains information about the IP connection associated with the finding.",
  ).optional(),
  contacts: z.record(
    z.string(),
    z.object({
      contacts: z.array(z.object({
        email: z.string().describe(
          'An email address. For example, "`person123@company.com`".',
        ).optional(),
      })).describe("A list of contacts").optional(),
    }),
  ).describe(
    'Output only. Map containing the points of contact for the given finding. The key represents the type of contact, while the value contains a list of all the contacts that pertain. Please refer to: https://cloud.google.com/resource-manager/docs/managing-notification-contacts#notification-categories { "security": { "contacts": [ { "email": "person1@company.com" }, { "email": "person2@company.com" } ] } }',
  ).optional(),
  containers: z.array(z.object({
    createTime: z.string().describe("The time that the container was created.")
      .optional(),
    imageId: z.string().describe(
      "Optional container image ID, if provided by the container runtime. Uniquely identifies the container image launched using a container image digest.",
    ).optional(),
    labels: z.array(z.object({
      name: z.string().describe("Name of the label.").optional(),
      value: z.string().describe("Value that corresponds to the label's name.")
        .optional(),
    })).describe("Container labels, as provided by the container runtime.")
      .optional(),
    name: z.string().describe("Name of the container.").optional(),
    uri: z.string().describe(
      "Container image URI provided when configuring a pod or container. This string can identify a container image version using mutable tags.",
    ).optional(),
  })).describe(
    "Containers associated with the finding. This field provides information for both Kubernetes and non-Kubernetes containers.",
  ).optional(),
  createTime: z.string().describe(
    "The time at which the finding was created in Security Command Center.",
  ).optional(),
  dataAccessEvents: z.array(z.object({
    eventId: z.string().describe("Unique identifier for data access event.")
      .optional(),
    eventTime: z.string().describe("Timestamp of data access event.")
      .optional(),
    operation: z.enum(["OPERATION_UNSPECIFIED", "READ", "MOVE", "COPY"])
      .describe("The operation performed by the principal to access the data.")
      .optional(),
    principalEmail: z.string().describe(
      "The email address of the principal that accessed the data. The principal could be a user account, service account, Google group, or other.",
    ).optional(),
  })).describe("Data access events associated with the finding.").optional(),
  dataFlowEvents: z.array(z.object({
    eventId: z.string().describe("Unique identifier for data flow event.")
      .optional(),
    eventTime: z.string().describe("Timestamp of data flow event.").optional(),
    operation: z.enum(["OPERATION_UNSPECIFIED", "READ", "MOVE", "COPY"])
      .describe(
        "The operation performed by the principal for the data flow event.",
      ).optional(),
    principalEmail: z.string().describe(
      "The email address of the principal that initiated the data flow event. The principal could be a user account, service account, Google group, or other.",
    ).optional(),
    violatedLocation: z.string().describe(
      "Non-compliant location of the principal or the data destination.",
    ).optional(),
  })).describe("Data flow events associated with the finding.").optional(),
  dataRetentionDeletionEvents: z.array(z.object({
    dataObjectCount: z.string().describe(
      "Number of objects that violated the policy for this resource. If the number is less than 1,000, then the value of this field is the exact number. If the number of objects that violated the policy is greater than or equal to 1,000, then the value of this field is 1000.",
    ).optional(),
    eventDetectionTime: z.string().describe(
      "Timestamp indicating when the event was detected.",
    ).optional(),
    eventType: z.enum([
      "EVENT_TYPE_UNSPECIFIED",
      "EVENT_TYPE_MAX_TTL_EXCEEDED",
      "EVENT_TYPE_MAX_TTL_FROM_CREATION",
      "EVENT_TYPE_MAX_TTL_FROM_LAST_MODIFICATION",
      "EVENT_TYPE_MIN_TTL_FROM_CREATION",
    ]).describe("Type of the DRD event.").optional(),
    maxRetentionAllowed: z.string().describe(
      "Maximum duration of retention allowed from the DRD control. This comes from the DRD control where users set a max TTL for their data. For example, suppose that a user sets the max TTL for a Cloud Storage bucket to 90 days. However, an object in that bucket is 100 days old. In this case, a DataRetentionDeletionEvent will be generated for that Cloud Storage bucket, and the max_retention_allowed is 90 days.",
    ).optional(),
    minRetentionAllowed: z.string().describe(
      "Min duration of retention allowed from the DSPM retention control. This field is only populated when event type is set to EVENT_TYPE_MIN_TTL_FROM_CREATION.",
    ).optional(),
  })).describe("Data retention deletion events associated with the finding.")
    .optional(),
  database: z.object({
    displayName: z.string().describe(
      "The human-readable name of the database that the user connected to.",
    ).optional(),
    grantees: z.array(z.string()).describe(
      "The target usernames, roles, or groups of an SQL privilege grant, which is not an IAM policy change.",
    ).optional(),
    name: z.string().describe(
      "Some database resources may not have the [full resource name](https://google.aip.dev/122#full-resource-names) populated because these resource types are not yet supported by Cloud Asset Inventory (e.g. Cloud SQL databases). In these cases only the display name will be provided. The [full resource name](https://google.aip.dev/122#full-resource-names) of the database that the user connected to, if it is supported by Cloud Asset Inventory.",
    ).optional(),
    query: z.string().describe(
      "The SQL statement that is associated with the database access.",
    ).optional(),
    userName: z.string().describe(
      "The username used to connect to the database. The username might not be an IAM principal and does not have a set format.",
    ).optional(),
    version: z.string().describe(
      "The version of the database, for example, POSTGRES_14. See [the complete list](https://cloud.google.com/sql/docs/mysql/admin-api/rest/v1/SqlDatabaseVersion).",
    ).optional(),
  }).describe(
    "Represents database access information, such as queries. A database may be a sub-resource of an instance (as in the case of Cloud SQL instances or Cloud Spanner instances), or the database instance itself. Some database resources might not have the [full resource name](https://google.aip.dev/122#full-resource-names) populated because these resource types, such as Cloud SQL databases, are not yet supported by Cloud Asset Inventory. In these cases only the display name is provided.",
  ).optional(),
  description: z.string().describe("Contains more details about the finding.")
    .optional(),
  discoveredWorkload: z.object({
    confidence: z.enum(["CONFIDENCE_UNSPECIFIED", "CONFIDENCE_HIGH"]).describe(
      "The confidence in detection of this workload.",
    ).optional(),
    detectedRelevantHardware: z.boolean().describe(
      "A boolean flag set to true if associated hardware strongly predicts the workload type.",
    ).optional(),
    detectedRelevantKeywords: z.boolean().describe(
      "A boolean flag set to true if associated keywords strongly predict the workload type.",
    ).optional(),
    detectedRelevantPackages: z.boolean().describe(
      "A boolean flag set to true if installed packages strongly predict the workload type.",
    ).optional(),
    workloadType: z.enum([
      "WORKLOAD_TYPE_UNSPECIFIED",
      "MCP_SERVER",
      "AI_INFERENCE",
      "AGENT",
    ]).describe("The type of workload.").optional(),
  }).describe(
    "Represents discovered, customer managed workload that is not registered with the respective GCP service.",
  ).optional(),
  disk: z.object({
    name: z.string().describe(
      'The name of the disk, for example, "https://www.googleapis.com/compute/v1/projects/{project-id}/zones/{zone-id}/disks/{disk-id}".',
    ).optional(),
  }).describe(
    "Contains information about the disk associated with the finding.",
  ).optional(),
  eventTime: z.string().describe(
    "The time the finding was first detected. If an existing finding is updated, then this is the time the update occurred. For example, if the finding represents an open firewall, this property captures the time the detector believes the firewall became open. The accuracy is determined by the detector. If the finding is later resolved, then this time reflects when the finding was resolved. This must not be set to a value greater than the current timestamp.",
  ).optional(),
  exfiltration: z.object({
    sources: z.array(z.object({
      components: z.array(z.string()).describe(
        "Subcomponents of the asset that was exfiltrated, like URIs used during exfiltration, table names, databases, and filenames. For example, multiple tables might have been exfiltrated from the same Cloud SQL instance, or multiple files might have been exfiltrated from the same Cloud Storage bucket.",
      ).optional(),
      name: z.string().describe(
        "The resource's [full resource name](https://cloud.google.com/apis/design/resource_names#full_resource_name).",
      ).optional(),
    })).describe(
      'If there are multiple sources, then the data is considered "joined" between them. For instance, BigQuery can join multiple tables, and each table would be considered a source.',
    ).optional(),
    targets: z.array(z.object({
      components: z.array(z.string()).describe(
        "Subcomponents of the asset that was exfiltrated, like URIs used during exfiltration, table names, databases, and filenames. For example, multiple tables might have been exfiltrated from the same Cloud SQL instance, or multiple files might have been exfiltrated from the same Cloud Storage bucket.",
      ).optional(),
      name: z.string().describe(
        "The resource's [full resource name](https://cloud.google.com/apis/design/resource_names#full_resource_name).",
      ).optional(),
    })).describe(
      'If there are multiple targets, each target would get a complete copy of the "joined" source data.',
    ).optional(),
    totalExfiltratedBytes: z.string().describe(
      "Total exfiltrated bytes processed for the entire job.",
    ).optional(),
  }).describe(
    "Exfiltration represents a data exfiltration attempt from one or more sources to one or more targets. The `sources` attribute lists the sources of the exfiltrated data. The `targets` attribute lists the destinations the data was copied to.",
  ).optional(),
  externalExposure: z.object({
    backendService: z.string().describe(
      'The full resource name of load balancer backend service, for example, "//compute.googleapis.com/projects/{project-id}/global/backendServices/{name}".',
    ).optional(),
    exposedEndpoint: z.string().describe(
      'The resource which is running the exposed service, for example, "//compute.googleapis.com/projects/{project-id}/zones/{zone}/instances/{instance}.”',
    ).optional(),
    exposedService: z.string().describe(
      'The name and version of the service, for example, "Jupyter Notebook 6.14.0".',
    ).optional(),
    forwardingRule: z.string().describe(
      'The full resource name of the forwarding rule, for example, "//compute.googleapis.com/projects/{project-id}/global/forwardingRules/{forwarding-rule-name}".',
    ).optional(),
    instanceGroup: z.string().describe(
      'The full resource name of the instance group, for example, "//compute.googleapis.com/projects/{project-id}/global/instanceGroups/{name}".',
    ).optional(),
    loadBalancerFirewallPolicy: z.string().describe(
      'The full resource name of the load balancer firewall policy, for example, "//compute.googleapis.com/projects/{project-id}/global/firewallPolicies/{policy-name}".',
    ).optional(),
    networkEndpointGroup: z.string().describe(
      'The full resource name of the network endpoint group, for example, "//compute.googleapis.com/projects/{project-id}/global/networkEndpointGroups/{name}".',
    ).optional(),
    privateIpAddress: z.string().describe(
      "Private IP address of the exposed endpoint.",
    ).optional(),
    privatePort: z.string().describe(
      "Port number associated with private IP address.",
    ).optional(),
    publicIpAddress: z.string().describe(
      "Public IP address of the exposed endpoint.",
    ).optional(),
    publicPort: z.string().describe(
      "Public port number of the exposed endpoint.",
    ).optional(),
    serviceFirewallPolicy: z.string().describe(
      'The full resource name of the firewall policy of the exposed service, for example, "//compute.googleapis.com/projects/{project-id}/global/firewallPolicies/{policy-name}".',
    ).optional(),
  }).describe(
    "Details about the externally exposed resource associated with the finding.",
  ).optional(),
  externalSystems: z.record(
    z.string(),
    z.object({
      assignees: z.array(z.string()).describe(
        "References primary/secondary etc assignees in the external system.",
      ).optional(),
      caseCloseTime: z.string().describe(
        "The time when the case was closed, as reported by the external system.",
      ).optional(),
      caseCreateTime: z.string().describe(
        "The time when the case was created, as reported by the external system.",
      ).optional(),
      casePriority: z.string().describe(
        "The priority of the finding's corresponding case in the external system.",
      ).optional(),
      caseSla: z.string().describe(
        "The SLA of the finding's corresponding case in the external system.",
      ).optional(),
      caseUri: z.string().describe(
        "The link to the finding's corresponding case in the external system.",
      ).optional(),
      externalSystemUpdateTime: z.string().describe(
        "The time when the case was last updated, as reported by the external system.",
      ).optional(),
      externalUid: z.string().describe(
        "The identifier that's used to track the finding's corresponding case in the external system.",
      ).optional(),
      name: z.string().describe(
        'Full resource name of the external system, for example: "organizations/1234/sources/5678/findings/123456/externalSystems/jira", "folders/1234/sources/5678/findings/123456/externalSystems/jira", "projects/1234/sources/5678/findings/123456/externalSystems/jira"',
      ).optional(),
      status: z.string().describe(
        "The most recent status of the finding's corresponding case, as reported by the external system.",
      ).optional(),
      ticketInfo: z.object({
        assignee: z.string().describe(
          "The assignee of the ticket in the ticket system.",
        ).optional(),
        description: z.string().describe(
          "The description of the ticket in the ticket system.",
        ).optional(),
        id: z.string().describe(
          "The identifier of the ticket in the ticket system.",
        ).optional(),
        status: z.string().describe(
          "The latest status of the ticket, as reported by the ticket system.",
        ).optional(),
        updateTime: z.string().describe(
          "The time when the ticket was last updated, as reported by the ticket system.",
        ).optional(),
        uri: z.string().describe("The link to the ticket in the ticket system.")
          .optional(),
      }).describe(
        "Information about the ticket, if any, that is being used to track the resolution of the issue that is identified by this finding.",
      ).optional(),
    }),
  ).describe(
    "Output only. Third party SIEM/SOAR fields within SCC, contains external system information and external system finding fields.",
  ).optional(),
  externalUri: z.string().describe(
    "The URI that, if available, points to a web page outside of Security Command Center where additional information about the finding can be found. This field is guaranteed to be either empty or a well formed URL.",
  ).optional(),
  files: z.array(z.object({
    contents: z.string().describe(
      "Prefix of the file contents as a JSON-encoded string.",
    ).optional(),
    diskPath: z.object({
      partitionUuid: z.string().describe(
        "UUID of the partition (format https://wiki.archlinux.org/title/persistent_block_device_naming#by-uuid)",
      ).optional(),
      relativePath: z.string().describe(
        "Relative path of the file in the partition as a JSON encoded string. Example: /home/user1/executable_file.sh",
      ).optional(),
    }).describe(
      "Path of the file in terms of underlying disk/partition identifiers.",
    ).optional(),
    fileLoadState: z.enum([
      "FILE_LOAD_STATE_UNSPECIFIED",
      "LOADED_BY_PROCESS",
      "NOT_LOADED_BY_PROCESS",
    ]).describe("The load state of the file.").optional(),
    hashedSize: z.string().describe(
      "The length in bytes of the file prefix that was hashed. If hashed_size == size, any hashes reported represent the entire file.",
    ).optional(),
    operations: z.array(z.object({
      type: z.enum([
        "OPERATION_TYPE_UNSPECIFIED",
        "OPEN",
        "READ",
        "RENAME",
        "WRITE",
        "EXECUTE",
      ]).describe("The type of the operation").optional(),
    })).describe("Operation(s) performed on a file.").optional(),
    partiallyHashed: z.boolean().describe(
      "True when the hash covers only a prefix of the file.",
    ).optional(),
    path: z.string().describe(
      "Absolute path of the file as a JSON encoded string.",
    ).optional(),
    sha256: z.string().describe(
      "SHA256 hash of the first hashed_size bytes of the file encoded as a hex string. If hashed_size == size, sha256 represents the SHA256 hash of the entire file.",
    ).optional(),
    size: z.string().describe("Size of the file in bytes.").optional(),
  })).describe("File associated with the finding.").optional(),
  findingClass: z.enum([
    "FINDING_CLASS_UNSPECIFIED",
    "THREAT",
    "VULNERABILITY",
    "MISCONFIGURATION",
    "OBSERVATION",
    "SCC_ERROR",
    "POSTURE_VIOLATION",
    "TOXIC_COMBINATION",
    "SENSITIVE_DATA_RISK",
    "CHOKEPOINT",
    "EXTERNAL_EXPOSURE",
  ]).describe("The class of the finding.").optional(),
  groupMemberships: z.array(z.object({
    groupId: z.string().describe("ID of the group.").optional(),
    groupType: z.enum([
      "GROUP_TYPE_UNSPECIFIED",
      "GROUP_TYPE_TOXIC_COMBINATION",
      "GROUP_TYPE_CHOKEPOINT",
    ]).describe("Type of group.").optional(),
  })).describe(
    "Contains details about groups of which this finding is a member. A group is a collection of findings that are related in some way. This field cannot be updated. Its value is ignored in all update requests.",
  ).optional(),
  iamBindings: z.array(z.object({
    action: z.enum(["ACTION_UNSPECIFIED", "ADD", "REMOVE"]).describe(
      "The action that was performed on a Binding.",
    ).optional(),
    member: z.string().describe(
      'A single identity requesting access for a Cloud Platform resource, for example, "foo@google.com".',
    ).optional(),
    role: z.string().describe(
      'Role that is assigned to "members". For example, "roles/viewer", "roles/editor", or "roles/owner".',
    ).optional(),
  })).describe("Represents IAM bindings associated with the finding.")
    .optional(),
  indicator: z.object({
    domains: z.array(z.string()).describe(
      "List of domains associated to the Finding.",
    ).optional(),
    ipAddresses: z.array(z.string()).describe(
      "The list of IP addresses that are associated with the finding.",
    ).optional(),
    signatures: z.array(z.object({
      memoryHashSignature: z.object({
        binaryFamily: z.string().describe("The binary family.").optional(),
        detections: z.array(z.unknown()).describe(
          "The list of memory hash detections contributing to the binary family match.",
        ).optional(),
      }).describe("A signature corresponding to memory page hashes.")
        .optional(),
      signatureType: z.enum([
        "SIGNATURE_TYPE_UNSPECIFIED",
        "SIGNATURE_TYPE_PROCESS",
        "SIGNATURE_TYPE_FILE",
      ]).describe(
        "Describes the type of resource associated with the signature.",
      ).optional(),
      yaraRuleSignature: z.object({
        yaraRule: z.string().describe("The name of the YARA rule.").optional(),
      }).describe("A signature corresponding to a YARA rule.").optional(),
    })).describe(
      "The list of matched signatures indicating that the given process is present in the environment.",
    ).optional(),
    uris: z.array(z.string()).describe(
      "The list of URIs associated to the Findings.",
    ).optional(),
  }).describe(
    "Represents what's commonly known as an _indicator of compromise_ (IoC) in computer forensics. This is an artifact observed on a network or in an operating system that, with high confidence, indicates a computer intrusion. For more information, see [Indicator of compromise](https://en.wikipedia.org/wiki/Indicator_of_compromise).",
  ).optional(),
  ipRules: z.object({
    allowed: z.object({
      ipRules: z.array(z.object({
        portRanges: z.array(z.unknown()).describe(
          "Optional. An optional list of ports to which this rule applies. This field is only applicable for the UDP or (S)TCP protocols. Each entry must be either an integer or a range including a min and max port number.",
        ).optional(),
        protocol: z.string().describe(
          "The IP protocol this rule applies to. This value can either be one of the following well known protocol strings (TCP, UDP, ICMP, ESP, AH, IPIP, SCTP) or a string representation of the integer value.",
        ).optional(),
      })).describe("Optional. Optional list of allowed IP rules.").optional(),
    }).describe("Allowed IP rule.").optional(),
    denied: z.object({
      ipRules: z.array(z.object({
        portRanges: z.array(z.unknown()).describe(
          "Optional. An optional list of ports to which this rule applies. This field is only applicable for the UDP or (S)TCP protocols. Each entry must be either an integer or a range including a min and max port number.",
        ).optional(),
        protocol: z.string().describe(
          "The IP protocol this rule applies to. This value can either be one of the following well known protocol strings (TCP, UDP, ICMP, ESP, AH, IPIP, SCTP) or a string representation of the integer value.",
        ).optional(),
      })).describe("Optional. Optional list of denied IP rules.").optional(),
    }).describe("Denied IP rule.").optional(),
    destinationIpRanges: z.array(z.string()).describe(
      "If destination IP ranges are specified, the firewall rule applies only to traffic that has a destination IP address in these ranges. These ranges must be expressed in CIDR format. Only supports IPv4.",
    ).optional(),
    direction: z.enum(["DIRECTION_UNSPECIFIED", "INGRESS", "EGRESS"]).describe(
      "The direction that the rule is applicable to, one of ingress or egress.",
    ).optional(),
    exposedServices: z.array(z.string()).describe(
      "Name of the network protocol service, such as FTP, that is exposed by the open port. Follows the naming convention available at: https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml.",
    ).optional(),
    sourceIpRanges: z.array(z.string()).describe(
      "If source IP ranges are specified, the firewall rule applies only to traffic that has a source IP address in these ranges. These ranges must be expressed in CIDR format. Only supports IPv4.",
    ).optional(),
  }).describe("IP rules associated with the finding.").optional(),
  job: z.object({
    errorCode: z.number().int().describe(
      "Optional. If the job did not complete successfully, this field describes why.",
    ).optional(),
    location: z.string().describe(
      "Optional. Gives the location where the job ran, such as `US` or `europe-west1`",
    ).optional(),
    name: z.string().describe(
      "The fully-qualified name for a job. e.g. `projects//jobs/`",
    ).optional(),
    state: z.enum([
      "JOB_STATE_UNSPECIFIED",
      "PENDING",
      "RUNNING",
      "SUCCEEDED",
      "FAILED",
    ]).describe(
      "Output only. State of the job, such as `RUNNING` or `PENDING`.",
    ).optional(),
  }).describe("Describes a job").optional(),
  kernelRootkit: z.object({
    name: z.string().describe("Rootkit name, when available.").optional(),
    unexpectedCodeModification: z.boolean().describe(
      "True if unexpected modifications of kernel code memory are present.",
    ).optional(),
    unexpectedFtraceHandler: z.boolean().describe(
      "True if `ftrace` points are present with callbacks pointing to regions that are not in the expected kernel or module code range.",
    ).optional(),
    unexpectedInterruptHandler: z.boolean().describe(
      "True if interrupt handlers that are are not in the expected kernel or module code regions are present.",
    ).optional(),
    unexpectedKernelCodePages: z.boolean().describe(
      "True if kernel code pages that are not in the expected kernel or module code regions are present.",
    ).optional(),
    unexpectedKprobeHandler: z.boolean().describe(
      "True if `kprobe` points are present with callbacks pointing to regions that are not in the expected kernel or module code range.",
    ).optional(),
    unexpectedProcessesInRunqueue: z.boolean().describe(
      "True if unexpected processes in the scheduler run queue are present. Such processes are in the run queue, but not in the process task list.",
    ).optional(),
    unexpectedReadOnlyDataModification: z.boolean().describe(
      "True if unexpected modifications of kernel read-only data memory are present.",
    ).optional(),
    unexpectedSystemCallHandler: z.boolean().describe(
      "True if system call handlers that are are not in the expected kernel or module code regions are present.",
    ).optional(),
  }).describe("Kernel mode rootkit signatures.").optional(),
  kubernetes: z.object({
    accessReviews: z.array(z.object({
      group: z.string().describe(
        'The API group of the resource. "*" means all.',
      ).optional(),
      name: z.string().describe(
        "The name of the resource being requested. Empty means all.",
      ).optional(),
      ns: z.string().describe(
        'Namespace of the action being requested. Currently, there is no distinction between no namespace and all namespaces. Both are represented by "" (empty).',
      ).optional(),
      resource: z.string().describe(
        'The optional resource type requested. "*" means all.',
      ).optional(),
      subresource: z.string().describe("The optional subresource type.")
        .optional(),
      verb: z.string().describe(
        'A Kubernetes resource API verb, like get, list, watch, create, update, delete, proxy. "*" means all.',
      ).optional(),
      version: z.string().describe(
        'The API version of the resource. "*" means all.',
      ).optional(),
    })).describe(
      "Provides information on any Kubernetes access reviews (privilege checks) relevant to the finding.",
    ).optional(),
    bindings: z.array(z.object({
      name: z.string().describe("Name for the binding.").optional(),
      ns: z.string().describe("Namespace for the binding.").optional(),
      role: z.object({
        kind: z.enum(["KIND_UNSPECIFIED", "ROLE", "CLUSTER_ROLE"]).describe(
          "Role type.",
        ).optional(),
        name: z.string().describe("Role name.").optional(),
        ns: z.string().describe("Role namespace.").optional(),
      }).describe("Kubernetes Role or ClusterRole.").optional(),
      subjects: z.array(z.object({
        kind: z.unknown().describe("Authentication type for the subject.")
          .optional(),
        name: z.unknown().describe("Name for the subject.").optional(),
        ns: z.unknown().describe("Namespace for the subject.").optional(),
      })).describe(
        "Represents one or more subjects that are bound to the role. Not always available for PATCH requests.",
      ).optional(),
    })).describe(
      "Provides Kubernetes role binding information for findings that involve [RoleBindings or ClusterRoleBindings](https://cloud.google.com/kubernetes-engine/docs/how-to/role-based-access-control).",
    ).optional(),
    nodePools: z.array(z.object({
      name: z.string().describe("Kubernetes node pool name.").optional(),
      nodes: z.array(z.object({
        name: z.unknown().describe(
          "[Full resource name](https://google.aip.dev/122#full-resource-names) of the Compute Engine VM running the cluster node.",
        ).optional(),
      })).describe("Nodes associated with the finding.").optional(),
    })).describe(
      "GKE [node pools](https://cloud.google.com/kubernetes-engine/docs/concepts/node-pools) associated with the finding. This field contains node pool information for each node, when it is available.",
    ).optional(),
    nodes: z.array(z.object({
      name: z.string().describe(
        "[Full resource name](https://google.aip.dev/122#full-resource-names) of the Compute Engine VM running the cluster node.",
      ).optional(),
    })).describe(
      "Provides Kubernetes [node](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture#nodes) information.",
    ).optional(),
    objects: z.array(z.object({
      containers: z.array(z.object({
        createTime: z.unknown().describe(
          "The time that the container was created.",
        ).optional(),
        imageId: z.unknown().describe(
          "Optional container image ID, if provided by the container runtime. Uniquely identifies the container image launched using a container image digest.",
        ).optional(),
        labels: z.unknown().describe(
          "Container labels, as provided by the container runtime.",
        ).optional(),
        name: z.unknown().describe("Name of the container.").optional(),
        uri: z.unknown().describe(
          "Container image URI provided when configuring a pod or container. This string can identify a container image version using mutable tags.",
        ).optional(),
      })).describe("Pod containers associated with this finding, if any.")
        .optional(),
      group: z.string().describe(
        'Kubernetes object group, such as "policy.k8s.io/v1".',
      ).optional(),
      kind: z.string().describe('Kubernetes object kind, such as "Namespace".')
        .optional(),
      name: z.string().describe(
        "Kubernetes object name. For details see https://kubernetes.io/docs/concepts/overview/working-with-objects/names/.",
      ).optional(),
      ns: z.string().describe(
        'Kubernetes object namespace. Must be a valid DNS label. Named "ns" to avoid collision with C++ namespace keyword. For details see https://kubernetes.io/docs/tasks/administer-cluster/namespaces/.',
      ).optional(),
    })).describe("Kubernetes objects related to the finding.").optional(),
    pods: z.array(z.object({
      containers: z.array(z.object({
        createTime: z.unknown().describe(
          "The time that the container was created.",
        ).optional(),
        imageId: z.unknown().describe(
          "Optional container image ID, if provided by the container runtime. Uniquely identifies the container image launched using a container image digest.",
        ).optional(),
        labels: z.unknown().describe(
          "Container labels, as provided by the container runtime.",
        ).optional(),
        name: z.unknown().describe("Name of the container.").optional(),
        uri: z.unknown().describe(
          "Container image URI provided when configuring a pod or container. This string can identify a container image version using mutable tags.",
        ).optional(),
      })).describe("Pod containers associated with this finding, if any.")
        .optional(),
      labels: z.array(z.object({
        name: z.unknown().describe("Name of the label.").optional(),
        value: z.unknown().describe(
          "Value that corresponds to the label's name.",
        ).optional(),
      })).describe(
        "Pod labels. For Kubernetes containers, these are applied to the container.",
      ).optional(),
      name: z.string().describe("Kubernetes Pod name.").optional(),
      ns: z.string().describe("Kubernetes Pod namespace.").optional(),
    })).describe(
      "Kubernetes [Pods](https://cloud.google.com/kubernetes-engine/docs/concepts/pod) associated with the finding. This field contains Pod records for each container that is owned by a Pod.",
    ).optional(),
    roles: z.array(z.object({
      kind: z.enum(["KIND_UNSPECIFIED", "ROLE", "CLUSTER_ROLE"]).describe(
        "Role type.",
      ).optional(),
      name: z.string().describe("Role name.").optional(),
      ns: z.string().describe("Role namespace.").optional(),
    })).describe(
      "Provides Kubernetes role information for findings that involve [Roles or ClusterRoles](https://cloud.google.com/kubernetes-engine/docs/how-to/role-based-access-control).",
    ).optional(),
  }).describe("Kubernetes-related attributes.").optional(),
  loadBalancers: z.array(z.object({
    name: z.string().describe(
      "The name of the load balancer associated with the finding.",
    ).optional(),
  })).describe("The load balancers associated with the finding.").optional(),
  logEntries: z.array(z.object({
    cloudLoggingEntry: z.object({
      insertId: z.string().describe("A unique identifier for the log entry.")
        .optional(),
      logId: z.string().describe(
        "The type of the log (part of `log_name`. `log_name` is the resource name of the log to which this log entry belongs). For example: `cloudresourcemanager.googleapis.com/activity`. Note that this field is not URL-encoded, unlike the `LOG_ID` field in `LogEntry`.",
      ).optional(),
      resourceContainer: z.string().describe(
        "The organization, folder, or project of the monitored resource that produced this log entry.",
      ).optional(),
      timestamp: z.string().describe(
        "The time the event described by the log entry occurred.",
      ).optional(),
    }).describe(
      "Metadata taken from a [Cloud Logging LogEntry](https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry)",
    ).optional(),
  })).describe("Log entries that are relevant to the finding.").optional(),
  mitreAttack: z.object({
    additionalTactics: z.array(
      z.enum([
        "TACTIC_UNSPECIFIED",
        "RECONNAISSANCE",
        "RESOURCE_DEVELOPMENT",
        "INITIAL_ACCESS",
        "EXECUTION",
        "PERSISTENCE",
        "PRIVILEGE_ESCALATION",
        "DEFENSE_EVASION",
        "CREDENTIAL_ACCESS",
        "DISCOVERY",
        "LATERAL_MOVEMENT",
        "COLLECTION",
        "COMMAND_AND_CONTROL",
        "EXFILTRATION",
        "IMPACT",
      ]),
    ).describe(
      "Additional MITRE ATT&CK tactics related to this finding, if any.",
    ).optional(),
    additionalTechniques: z.array(
      z.enum([
        "TECHNIQUE_UNSPECIFIED",
        "DATA_OBFUSCATION",
        "DATA_OBFUSCATION_STEGANOGRAPHY",
        "OS_CREDENTIAL_DUMPING",
        "OS_CREDENTIAL_DUMPING_PROC_FILESYSTEM",
        "OS_CREDENTIAL_DUMPING_ETC_PASSWORD_AND_ETC_SHADOW",
        "DATA_FROM_LOCAL_SYSTEM",
        "AUTOMATED_EXFILTRATION",
        "OBFUSCATED_FILES_OR_INFO",
        "STEGANOGRAPHY",
        "COMPILE_AFTER_DELIVERY",
        "COMMAND_OBFUSCATION",
        "SCHEDULED_TRANSFER",
        "SYSTEM_OWNER_USER_DISCOVERY",
        "MASQUERADING",
        "MATCH_LEGITIMATE_NAME_OR_LOCATION",
        "BOOT_OR_LOGON_INITIALIZATION_SCRIPTS",
        "STARTUP_ITEMS",
        "NETWORK_SERVICE_DISCOVERY",
        "SCHEDULED_TASK_JOB",
        "SCHEDULED_TASK_JOB_CRON",
        "CONTAINER_ORCHESTRATION_JOB",
        "PROCESS_INJECTION",
        "INPUT_CAPTURE",
        "INPUT_CAPTURE_KEYLOGGING",
        "PROCESS_DISCOVERY",
        "COMMAND_AND_SCRIPTING_INTERPRETER",
        "UNIX_SHELL",
        "PYTHON",
        "EXPLOITATION_FOR_PRIVILEGE_ESCALATION",
        "PERMISSION_GROUPS_DISCOVERY",
        "CLOUD_GROUPS",
        "INDICATOR_REMOVAL",
        "INDICATOR_REMOVAL_CLEAR_LINUX_OR_MAC_SYSTEM_LOGS",
        "INDICATOR_REMOVAL_CLEAR_COMMAND_HISTORY",
        "INDICATOR_REMOVAL_FILE_DELETION",
        "INDICATOR_REMOVAL_TIMESTOMP",
        "INDICATOR_REMOVAL_CLEAR_MAILBOX_DATA",
        "APPLICATION_LAYER_PROTOCOL",
        "DNS",
        "SOFTWARE_DEPLOYMENT_TOOLS",
        "VALID_ACCOUNTS",
        "DEFAULT_ACCOUNTS",
        "LOCAL_ACCOUNTS",
        "CLOUD_ACCOUNTS",
        "FILE_AND_DIRECTORY_DISCOVERY",
        "ACCOUNT_DISCOVERY_LOCAL_ACCOUNT",
        "PROXY",
        "EXTERNAL_PROXY",
        "MULTI_HOP_PROXY",
        "ACCOUNT_MANIPULATION",
        "ADDITIONAL_CLOUD_CREDENTIALS",
        "ADDITIONAL_CLOUD_ROLES",
        "SSH_AUTHORIZED_KEYS",
        "ADDITIONAL_CONTAINER_CLUSTER_ROLES",
        "MULTI_STAGE_CHANNELS",
        "INGRESS_TOOL_TRANSFER",
        "NATIVE_API",
        "BRUTE_FORCE",
        "AUTOMATED_COLLECTION",
        "SHARED_MODULES",
        "DATA_ENCODING",
        "STANDARD_ENCODING",
        "ACCESS_TOKEN_MANIPULATION",
        "TOKEN_IMPERSONATION_OR_THEFT",
        "CREATE_ACCOUNT",
        "LOCAL_ACCOUNT",
        "DEOBFUSCATE_DECODE_FILES_OR_INFO",
        "EXPLOIT_PUBLIC_FACING_APPLICATION",
        "SUPPLY_CHAIN_COMPROMISE",
        "COMPROMISE_SOFTWARE_DEPENDENCIES_AND_DEVELOPMENT_TOOLS",
        "EXPLOITATION_FOR_CLIENT_EXECUTION",
        "USER_EXECUTION",
        "EXPLOITATION_FOR_CREDENTIAL_ACCESS",
        "LINUX_AND_MAC_FILE_AND_DIRECTORY_PERMISSIONS_MODIFICATION",
        "DOMAIN_POLICY_MODIFICATION",
        "DATA_DESTRUCTION",
        "DATA_ENCRYPTED_FOR_IMPACT",
        "SERVICE_STOP",
        "INHIBIT_SYSTEM_RECOVERY",
        "FIRMWARE_CORRUPTION",
        "RESOURCE_HIJACKING",
        "NETWORK_DENIAL_OF_SERVICE",
        "CLOUD_SERVICE_DISCOVERY",
        "STEAL_APPLICATION_ACCESS_TOKEN",
        "ACCOUNT_ACCESS_REMOVAL",
        "TRANSFER_DATA_TO_CLOUD_ACCOUNT",
        "STEAL_WEB_SESSION_COOKIE",
        "CREATE_OR_MODIFY_SYSTEM_PROCESS",
        "EVENT_TRIGGERED_EXECUTION",
        "BOOT_OR_LOGON_AUTOSTART_EXECUTION",
        "KERNEL_MODULES_AND_EXTENSIONS",
        "SHORTCUT_MODIFICATION",
        "ABUSE_ELEVATION_CONTROL_MECHANISM",
        "ABUSE_ELEVATION_CONTROL_MECHANISM_SETUID_AND_SETGID",
        "ABUSE_ELEVATION_CONTROL_MECHANISM_SUDO_AND_SUDO_CACHING",
        "UNSECURED_CREDENTIALS",
        "CREDENTIALS_IN_FILES",
        "BASH_HISTORY",
        "PRIVATE_KEYS",
        "SUBVERT_TRUST_CONTROL",
        "INSTALL_ROOT_CERTIFICATE",
        "COMPROMISE_HOST_SOFTWARE_BINARY",
        "CREDENTIALS_FROM_PASSWORD_STORES",
        "MODIFY_AUTHENTICATION_PROCESS",
        "PLUGGABLE_AUTHENTICATION_MODULES",
        "MULTI_FACTOR_AUTHENTICATION",
        "IMPAIR_DEFENSES",
        "DISABLE_OR_MODIFY_TOOLS",
        "INDICATOR_BLOCKING",
        "DISABLE_OR_MODIFY_LINUX_AUDIT_SYSTEM",
        "HIDE_ARTIFACTS",
        "HIDDEN_FILES_AND_DIRECTORIES",
        "HIDDEN_USERS",
        "EXFILTRATION_OVER_WEB_SERVICE",
        "EXFILTRATION_TO_CLOUD_STORAGE",
        "DYNAMIC_RESOLUTION",
        "LATERAL_TOOL_TRANSFER",
        "HIJACK_EXECUTION_FLOW",
        "HIJACK_EXECUTION_FLOW_DYNAMIC_LINKER_HIJACKING",
        "MODIFY_CLOUD_COMPUTE_INFRASTRUCTURE",
        "CREATE_SNAPSHOT",
        "CLOUD_INFRASTRUCTURE_DISCOVERY",
        "DEVELOP_CAPABILITIES",
        "DEVELOP_CAPABILITIES_MALWARE",
        "OBTAIN_CAPABILITIES",
        "OBTAIN_CAPABILITIES_MALWARE",
        "OBTAIN_CAPABILITIES_VULNERABILITIES",
        "ACTIVE_SCANNING",
        "SCANNING_IP_BLOCKS",
        "STAGE_CAPABILITIES",
        "UPLOAD_MALWARE",
        "CONTAINER_ADMINISTRATION_COMMAND",
        "DEPLOY_CONTAINER",
        "ESCAPE_TO_HOST",
        "CONTAINER_AND_RESOURCE_DISCOVERY",
        "REFLECTIVE_CODE_LOADING",
        "STEAL_OR_FORGE_AUTHENTICATION_CERTIFICATES",
        "FINANCIAL_THEFT",
      ]),
    ).describe(
      "Additional MITRE ATT&CK techniques related to this finding, if any, along with any of their respective parent techniques.",
    ).optional(),
    primaryTactic: z.enum([
      "TACTIC_UNSPECIFIED",
      "RECONNAISSANCE",
      "RESOURCE_DEVELOPMENT",
      "INITIAL_ACCESS",
      "EXECUTION",
      "PERSISTENCE",
      "PRIVILEGE_ESCALATION",
      "DEFENSE_EVASION",
      "CREDENTIAL_ACCESS",
      "DISCOVERY",
      "LATERAL_MOVEMENT",
      "COLLECTION",
      "COMMAND_AND_CONTROL",
      "EXFILTRATION",
      "IMPACT",
    ]).describe(
      "The MITRE ATT&CK tactic most closely represented by this finding, if any.",
    ).optional(),
    primaryTechniques: z.array(
      z.enum([
        "TECHNIQUE_UNSPECIFIED",
        "DATA_OBFUSCATION",
        "DATA_OBFUSCATION_STEGANOGRAPHY",
        "OS_CREDENTIAL_DUMPING",
        "OS_CREDENTIAL_DUMPING_PROC_FILESYSTEM",
        "OS_CREDENTIAL_DUMPING_ETC_PASSWORD_AND_ETC_SHADOW",
        "DATA_FROM_LOCAL_SYSTEM",
        "AUTOMATED_EXFILTRATION",
        "OBFUSCATED_FILES_OR_INFO",
        "STEGANOGRAPHY",
        "COMPILE_AFTER_DELIVERY",
        "COMMAND_OBFUSCATION",
        "SCHEDULED_TRANSFER",
        "SYSTEM_OWNER_USER_DISCOVERY",
        "MASQUERADING",
        "MATCH_LEGITIMATE_NAME_OR_LOCATION",
        "BOOT_OR_LOGON_INITIALIZATION_SCRIPTS",
        "STARTUP_ITEMS",
        "NETWORK_SERVICE_DISCOVERY",
        "SCHEDULED_TASK_JOB",
        "SCHEDULED_TASK_JOB_CRON",
        "CONTAINER_ORCHESTRATION_JOB",
        "PROCESS_INJECTION",
        "INPUT_CAPTURE",
        "INPUT_CAPTURE_KEYLOGGING",
        "PROCESS_DISCOVERY",
        "COMMAND_AND_SCRIPTING_INTERPRETER",
        "UNIX_SHELL",
        "PYTHON",
        "EXPLOITATION_FOR_PRIVILEGE_ESCALATION",
        "PERMISSION_GROUPS_DISCOVERY",
        "CLOUD_GROUPS",
        "INDICATOR_REMOVAL",
        "INDICATOR_REMOVAL_CLEAR_LINUX_OR_MAC_SYSTEM_LOGS",
        "INDICATOR_REMOVAL_CLEAR_COMMAND_HISTORY",
        "INDICATOR_REMOVAL_FILE_DELETION",
        "INDICATOR_REMOVAL_TIMESTOMP",
        "INDICATOR_REMOVAL_CLEAR_MAILBOX_DATA",
        "APPLICATION_LAYER_PROTOCOL",
        "DNS",
        "SOFTWARE_DEPLOYMENT_TOOLS",
        "VALID_ACCOUNTS",
        "DEFAULT_ACCOUNTS",
        "LOCAL_ACCOUNTS",
        "CLOUD_ACCOUNTS",
        "FILE_AND_DIRECTORY_DISCOVERY",
        "ACCOUNT_DISCOVERY_LOCAL_ACCOUNT",
        "PROXY",
        "EXTERNAL_PROXY",
        "MULTI_HOP_PROXY",
        "ACCOUNT_MANIPULATION",
        "ADDITIONAL_CLOUD_CREDENTIALS",
        "ADDITIONAL_CLOUD_ROLES",
        "SSH_AUTHORIZED_KEYS",
        "ADDITIONAL_CONTAINER_CLUSTER_ROLES",
        "MULTI_STAGE_CHANNELS",
        "INGRESS_TOOL_TRANSFER",
        "NATIVE_API",
        "BRUTE_FORCE",
        "AUTOMATED_COLLECTION",
        "SHARED_MODULES",
        "DATA_ENCODING",
        "STANDARD_ENCODING",
        "ACCESS_TOKEN_MANIPULATION",
        "TOKEN_IMPERSONATION_OR_THEFT",
        "CREATE_ACCOUNT",
        "LOCAL_ACCOUNT",
        "DEOBFUSCATE_DECODE_FILES_OR_INFO",
        "EXPLOIT_PUBLIC_FACING_APPLICATION",
        "SUPPLY_CHAIN_COMPROMISE",
        "COMPROMISE_SOFTWARE_DEPENDENCIES_AND_DEVELOPMENT_TOOLS",
        "EXPLOITATION_FOR_CLIENT_EXECUTION",
        "USER_EXECUTION",
        "EXPLOITATION_FOR_CREDENTIAL_ACCESS",
        "LINUX_AND_MAC_FILE_AND_DIRECTORY_PERMISSIONS_MODIFICATION",
        "DOMAIN_POLICY_MODIFICATION",
        "DATA_DESTRUCTION",
        "DATA_ENCRYPTED_FOR_IMPACT",
        "SERVICE_STOP",
        "INHIBIT_SYSTEM_RECOVERY",
        "FIRMWARE_CORRUPTION",
        "RESOURCE_HIJACKING",
        "NETWORK_DENIAL_OF_SERVICE",
        "CLOUD_SERVICE_DISCOVERY",
        "STEAL_APPLICATION_ACCESS_TOKEN",
        "ACCOUNT_ACCESS_REMOVAL",
        "TRANSFER_DATA_TO_CLOUD_ACCOUNT",
        "STEAL_WEB_SESSION_COOKIE",
        "CREATE_OR_MODIFY_SYSTEM_PROCESS",
        "EVENT_TRIGGERED_EXECUTION",
        "BOOT_OR_LOGON_AUTOSTART_EXECUTION",
        "KERNEL_MODULES_AND_EXTENSIONS",
        "SHORTCUT_MODIFICATION",
        "ABUSE_ELEVATION_CONTROL_MECHANISM",
        "ABUSE_ELEVATION_CONTROL_MECHANISM_SETUID_AND_SETGID",
        "ABUSE_ELEVATION_CONTROL_MECHANISM_SUDO_AND_SUDO_CACHING",
        "UNSECURED_CREDENTIALS",
        "CREDENTIALS_IN_FILES",
        "BASH_HISTORY",
        "PRIVATE_KEYS",
        "SUBVERT_TRUST_CONTROL",
        "INSTALL_ROOT_CERTIFICATE",
        "COMPROMISE_HOST_SOFTWARE_BINARY",
        "CREDENTIALS_FROM_PASSWORD_STORES",
        "MODIFY_AUTHENTICATION_PROCESS",
        "PLUGGABLE_AUTHENTICATION_MODULES",
        "MULTI_FACTOR_AUTHENTICATION",
        "IMPAIR_DEFENSES",
        "DISABLE_OR_MODIFY_TOOLS",
        "INDICATOR_BLOCKING",
        "DISABLE_OR_MODIFY_LINUX_AUDIT_SYSTEM",
        "HIDE_ARTIFACTS",
        "HIDDEN_FILES_AND_DIRECTORIES",
        "HIDDEN_USERS",
        "EXFILTRATION_OVER_WEB_SERVICE",
        "EXFILTRATION_TO_CLOUD_STORAGE",
        "DYNAMIC_RESOLUTION",
        "LATERAL_TOOL_TRANSFER",
        "HIJACK_EXECUTION_FLOW",
        "HIJACK_EXECUTION_FLOW_DYNAMIC_LINKER_HIJACKING",
        "MODIFY_CLOUD_COMPUTE_INFRASTRUCTURE",
        "CREATE_SNAPSHOT",
        "CLOUD_INFRASTRUCTURE_DISCOVERY",
        "DEVELOP_CAPABILITIES",
        "DEVELOP_CAPABILITIES_MALWARE",
        "OBTAIN_CAPABILITIES",
        "OBTAIN_CAPABILITIES_MALWARE",
        "OBTAIN_CAPABILITIES_VULNERABILITIES",
        "ACTIVE_SCANNING",
        "SCANNING_IP_BLOCKS",
        "STAGE_CAPABILITIES",
        "UPLOAD_MALWARE",
        "CONTAINER_ADMINISTRATION_COMMAND",
        "DEPLOY_CONTAINER",
        "ESCAPE_TO_HOST",
        "CONTAINER_AND_RESOURCE_DISCOVERY",
        "REFLECTIVE_CODE_LOADING",
        "STEAL_OR_FORGE_AUTHENTICATION_CERTIFICATES",
        "FINANCIAL_THEFT",
      ]),
    ).describe(
      "The MITRE ATT&CK technique most closely represented by this finding, if any. primary_techniques is a repeated field because there are multiple levels of MITRE ATT&CK techniques. If the technique most closely represented by this finding is a sub-technique (e.g. `SCANNING_IP_BLOCKS`), both the sub-technique and its parent technique(s) will be listed (e.g. `SCANNING_IP_BLOCKS`, `ACTIVE_SCANNING`).",
    ).optional(),
    version: z.string().describe(
      'The MITRE ATT&CK version referenced by the above fields. E.g. "8".',
    ).optional(),
  }).describe(
    "MITRE ATT&CK tactics and techniques related to this finding. See: https://attack.mitre.org",
  ).optional(),
  moduleName: z.string().describe(
    "Unique identifier of the module which generated the finding. Example: folders/598186756061/securityHealthAnalyticsSettings/customModules/56799441161885",
  ).optional(),
  mute: z.enum(["MUTE_UNSPECIFIED", "MUTED", "UNMUTED", "UNDEFINED"]).describe(
    "Indicates the mute state of a finding (either muted, unmuted or undefined). Unlike other attributes of a finding, a finding provider shouldn't set the value of mute.",
  ).optional(),
  muteInfo: z.object({
    dynamicMuteRecords: z.array(z.object({
      matchTime: z.string().describe(
        "When the dynamic mute rule first matched the finding.",
      ).optional(),
      muteConfig: z.string().describe(
        "The relative resource name of the mute rule, represented by a mute config, that created this record, for example `organizations/123/muteConfigs/mymuteconfig` or `organizations/123/locations/global/muteConfigs/mymuteconfig`.",
      ).optional(),
    })).describe(
      "The list of dynamic mute rules that currently match the finding.",
    ).optional(),
    staticMute: z.object({
      applyTime: z.string().describe("When the static mute was applied.")
        .optional(),
      state: z.enum(["MUTE_UNSPECIFIED", "MUTED", "UNMUTED", "UNDEFINED"])
        .describe(
          "The static mute state. If the value is `MUTED` or `UNMUTED`, then the finding's overall mute state will have the same value.",
        ).optional(),
    }).describe(
      "Information about the static mute state. A static mute state overrides any dynamic mute rules that apply to this finding. The static mute state can be set by a static mute rule or by muting the finding directly.",
    ).optional(),
  }).describe(
    "Mute information about the finding, including whether the finding has a static mute or any matching dynamic mute rules.",
  ).optional(),
  muteInitiator: z.string().describe(
    "Records additional information about the mute operation, for example, the [mute configuration](/security-command-center/docs/how-to-mute-findings) that muted the finding and the user who muted the finding.",
  ).optional(),
  muteUpdateTime: z.string().describe(
    "Output only. The most recent time this finding was muted or unmuted.",
  ).optional(),
  name: z.string().describe(
    'The [relative resource name](https://cloud.google.com/apis/design/resource_names#relative_resource_name) of the finding. Example: "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}", "folders/{folder_id}/sources/{source_id}/findings/{finding_id}", "projects/{project_id}/sources/{source_id}/findings/{finding_id}".',
  ).optional(),
  networks: z.array(z.object({
    name: z.string().describe(
      "The name of the VPC network resource, for example, `//compute.googleapis.com/projects/my-project/global/networks/my-network`.",
    ).optional(),
  })).describe("Represents the VPC networks that the resource is attached to.")
    .optional(),
  nextSteps: z.string().describe("Steps to address the finding.").optional(),
  notebook: z.object({
    lastAuthor: z.string().describe(
      "The user ID of the latest author to modify the notebook.",
    ).optional(),
    name: z.string().describe("The name of the notebook.").optional(),
    notebookUpdateTime: z.string().describe(
      "The most recent time the notebook was updated.",
    ).optional(),
    service: z.string().describe(
      'The source notebook service, for example, "Colab Enterprise".',
    ).optional(),
  }).describe(
    "Represents a Jupyter notebook IPYNB file, such as a [Colab Enterprise notebook](https://cloud.google.com/colab/docs/introduction) file, that is associated with a finding.",
  ).optional(),
  orgPolicies: z.array(z.object({
    name: z.string().describe(
      'The resource name of the org policy. Example: "organizations/{organization_id}/policies/{constraint_name}"',
    ).optional(),
  })).describe(
    "Contains information about the org policies associated with the finding.",
  ).optional(),
  parent: z.string().describe(
    'The relative resource name of the source the finding belongs to. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name This field is immutable after creation time. For example: "organizations/{organization_id}/sources/{source_id}"',
  ).optional(),
  parentDisplayName: z.string().describe(
    'Output only. The human readable display name of the finding source such as "Event Threat Detection" or "Security Health Analytics".',
  ).optional(),
  policyViolationSummary: z.object({
    conformantResourcesCount: z.string().describe(
      "Total number of child resources that conform to the policy.",
    ).optional(),
    evaluationErrorsCount: z.string().describe(
      'Number of child resources for which errors during evaluation occurred. The evaluation result for these child resources is effectively "unknown".',
    ).optional(),
    outOfScopeResourcesCount: z.string().describe(
      "Total count of child resources which were not in scope for evaluation.",
    ).optional(),
    policyViolationsCount: z.string().describe(
      "Count of child resources in violation of the policy.",
    ).optional(),
  }).describe(
    "Metadata summarizing policy violations of child resources of the affected resource. `finding_category` and `resource` determine the exact semantics of the counts. For example, when category=DATA_SECURITY_POSTURE_OBJECT_PUBLIC_ACCESS_VIOLATION and resource='storage.googleapis.com/buckets/my-bucket-name' then this counts the number of Cloud Storage objects in my-bucket-name which violate a Public Access control.",
  ).optional(),
  processes: z.array(z.object({
    args: z.array(z.string()).describe(
      "Process arguments as JSON encoded strings.",
    ).optional(),
    argumentsTruncated: z.boolean().describe("True if `args` is incomplete.")
      .optional(),
    binary: z.object({
      contents: z.string().describe(
        "Prefix of the file contents as a JSON-encoded string.",
      ).optional(),
      diskPath: z.object({
        partitionUuid: z.string().describe(
          "UUID of the partition (format https://wiki.archlinux.org/title/persistent_block_device_naming#by-uuid)",
        ).optional(),
        relativePath: z.string().describe(
          "Relative path of the file in the partition as a JSON encoded string. Example: /home/user1/executable_file.sh",
        ).optional(),
      }).describe(
        "Path of the file in terms of underlying disk/partition identifiers.",
      ).optional(),
      fileLoadState: z.enum([
        "FILE_LOAD_STATE_UNSPECIFIED",
        "LOADED_BY_PROCESS",
        "NOT_LOADED_BY_PROCESS",
      ]).describe("The load state of the file.").optional(),
      hashedSize: z.string().describe(
        "The length in bytes of the file prefix that was hashed. If hashed_size == size, any hashes reported represent the entire file.",
      ).optional(),
      operations: z.array(z.object({
        type: z.unknown().describe("The type of the operation").optional(),
      })).describe("Operation(s) performed on a file.").optional(),
      partiallyHashed: z.boolean().describe(
        "True when the hash covers only a prefix of the file.",
      ).optional(),
      path: z.string().describe(
        "Absolute path of the file as a JSON encoded string.",
      ).optional(),
      sha256: z.string().describe(
        "SHA256 hash of the first hashed_size bytes of the file encoded as a hex string. If hashed_size == size, sha256 represents the SHA256 hash of the entire file.",
      ).optional(),
      size: z.string().describe("Size of the file in bytes.").optional(),
    }).describe(
      "File information about the related binary/library used by an executable, or the script used by a script interpreter",
    ).optional(),
    envVariables: z.array(z.object({
      name: z.string().describe(
        "Environment variable name as a JSON encoded string.",
      ).optional(),
      val: z.string().describe(
        "Environment variable value as a JSON encoded string.",
      ).optional(),
    })).describe("Process environment variables.").optional(),
    envVariablesTruncated: z.boolean().describe(
      "True if `env_variables` is incomplete.",
    ).optional(),
    libraries: z.array(z.object({
      contents: z.string().describe(
        "Prefix of the file contents as a JSON-encoded string.",
      ).optional(),
      diskPath: z.object({
        partitionUuid: z.unknown().describe(
          "UUID of the partition (format https://wiki.archlinux.org/title/persistent_block_device_naming#by-uuid)",
        ).optional(),
        relativePath: z.unknown().describe(
          "Relative path of the file in the partition as a JSON encoded string. Example: /home/user1/executable_file.sh",
        ).optional(),
      }).describe(
        "Path of the file in terms of underlying disk/partition identifiers.",
      ).optional(),
      fileLoadState: z.enum([
        "FILE_LOAD_STATE_UNSPECIFIED",
        "LOADED_BY_PROCESS",
        "NOT_LOADED_BY_PROCESS",
      ]).describe("The load state of the file.").optional(),
      hashedSize: z.string().describe(
        "The length in bytes of the file prefix that was hashed. If hashed_size == size, any hashes reported represent the entire file.",
      ).optional(),
      operations: z.array(z.unknown()).describe(
        "Operation(s) performed on a file.",
      ).optional(),
      partiallyHashed: z.boolean().describe(
        "True when the hash covers only a prefix of the file.",
      ).optional(),
      path: z.string().describe(
        "Absolute path of the file as a JSON encoded string.",
      ).optional(),
      sha256: z.string().describe(
        "SHA256 hash of the first hashed_size bytes of the file encoded as a hex string. If hashed_size == size, sha256 represents the SHA256 hash of the entire file.",
      ).optional(),
      size: z.string().describe("Size of the file in bytes.").optional(),
    })).describe("File information for libraries loaded by the process.")
      .optional(),
    name: z.string().describe(
      "The process name, as displayed in utilities like `top` and `ps`. This name can be accessed through `/proc/[pid]/comm` and changed with `prctl(PR_SET_NAME)`.",
    ).optional(),
    parentPid: z.string().describe("The parent process ID.").optional(),
    pid: z.string().describe("The process ID.").optional(),
    script: z.object({
      contents: z.string().describe(
        "Prefix of the file contents as a JSON-encoded string.",
      ).optional(),
      diskPath: z.object({
        partitionUuid: z.string().describe(
          "UUID of the partition (format https://wiki.archlinux.org/title/persistent_block_device_naming#by-uuid)",
        ).optional(),
        relativePath: z.string().describe(
          "Relative path of the file in the partition as a JSON encoded string. Example: /home/user1/executable_file.sh",
        ).optional(),
      }).describe(
        "Path of the file in terms of underlying disk/partition identifiers.",
      ).optional(),
      fileLoadState: z.enum([
        "FILE_LOAD_STATE_UNSPECIFIED",
        "LOADED_BY_PROCESS",
        "NOT_LOADED_BY_PROCESS",
      ]).describe("The load state of the file.").optional(),
      hashedSize: z.string().describe(
        "The length in bytes of the file prefix that was hashed. If hashed_size == size, any hashes reported represent the entire file.",
      ).optional(),
      operations: z.array(z.object({
        type: z.unknown().describe("The type of the operation").optional(),
      })).describe("Operation(s) performed on a file.").optional(),
      partiallyHashed: z.boolean().describe(
        "True when the hash covers only a prefix of the file.",
      ).optional(),
      path: z.string().describe(
        "Absolute path of the file as a JSON encoded string.",
      ).optional(),
      sha256: z.string().describe(
        "SHA256 hash of the first hashed_size bytes of the file encoded as a hex string. If hashed_size == size, sha256 represents the SHA256 hash of the entire file.",
      ).optional(),
      size: z.string().describe("Size of the file in bytes.").optional(),
    }).describe(
      "File information about the related binary/library used by an executable, or the script used by a script interpreter",
    ).optional(),
    userId: z.string().describe(
      "The ID of the user that executed the process. E.g. If this is the root user this will always be 0.",
    ).optional(),
  })).describe(
    "Represents operating system processes associated with the Finding.",
  ).optional(),
  resourceName: z.string().describe(
    "For findings on Google Cloud resources, the full resource name of the Google Cloud resource this finding is for. See: https://cloud.google.com/apis/design/resource_names#full_resource_name When the finding is for a non-Google Cloud resource, the resourceName can be a customer or partner defined string. This field is immutable after creation time.",
  ).optional(),
  secret: z.object({
    environmentVariable: z.object({
      key: z.string().describe(
        "Environment variable name as a JSON encoded string. Note that value is not included since the value contains the secret data, which is sensitive core content.",
      ).optional(),
    }).describe("Environment variable containing the secret.").optional(),
    filePath: z.object({
      path: z.string().describe("Path to the file.").optional(),
    }).describe("File path containing the secret.").optional(),
    status: z.object({
      lastUpdatedTime: z.string().describe("Time that the secret was found.")
        .optional(),
      validity: z.enum([
        "SECRET_VALIDITY_UNSPECIFIED",
        "SECRET_VALIDITY_UNSUPPORTED",
        "SECRET_VALIDITY_FAILED",
        "SECRET_VALIDITY_INVALID",
        "SECRET_VALIDITY_VALID",
      ]).describe("The validity of the secret.").optional(),
    }).describe("The status of the secret.").optional(),
    type: z.string().describe("The type of secret, for example, GCP_API_KEY.")
      .optional(),
  }).describe(
    "Details about a secret or credential associated with the finding.",
  ).optional(),
  securityMarks: z.object({
    canonicalName: z.string().describe(
      'The canonical name of the marks. Examples: "organizations/{organization_id}/assets/{asset_id}/securityMarks" "folders/{folder_id}/assets/{asset_id}/securityMarks" "projects/{project_number}/assets/{asset_id}/securityMarks" "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}/securityMarks" "folders/{folder_id}/sources/{source_id}/findings/{finding_id}/securityMarks" "projects/{project_number}/sources/{source_id}/findings/{finding_id}/securityMarks"',
    ).optional(),
    marks: z.record(z.string(), z.string()).describe(
      "Mutable user specified security marks belonging to the parent resource. Constraints are as follows: * Keys and values are treated as case insensitive * Keys must be between 1 - 256 characters (inclusive) * Keys must be letters, numbers, underscores, or dashes * Values have leading and trailing whitespace trimmed, remaining characters must be between 1 - 4096 characters (inclusive)",
    ).optional(),
    name: z.string().describe(
      'The relative resource name of the SecurityMarks. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Examples: "organizations/{organization_id}/assets/{asset_id}/securityMarks" "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}/securityMarks".',
    ).optional(),
  }).describe(
    "User specified security marks that are attached to the parent Security Command Center resource. Security marks are scoped within a Security Command Center organization -- they can be modified and viewed by all users who have proper permissions on the organization.",
  ).optional(),
  securityPosture: z.object({
    changedPolicy: z.string().describe(
      "The name of the updated policy, for example, `projects/{project_id}/policies/{constraint_name}`.",
    ).optional(),
    name: z.string().describe(
      "Name of the posture, for example, `CIS-Posture`.",
    ).optional(),
    policy: z.string().describe(
      "The ID of the updated policy, for example, `compute-policy-1`.",
    ).optional(),
    policyDriftDetails: z.array(z.object({
      detectedValue: z.string().describe(
        'The detected value that violates the deployed posture, for example, `false` or `allowed_values={"projects/22831892"}`.',
      ).optional(),
      expectedValue: z.string().describe(
        'The value of this field that was configured in a posture, for example, `true` or `allowed_values={"projects/29831892"}`.',
      ).optional(),
      field: z.string().describe(
        "The name of the updated field, for example constraint.implementation.policy_rules[0].enforce",
      ).optional(),
    })).describe(
      "The details about a change in an updated policy that violates the deployed posture.",
    ).optional(),
    policySet: z.string().describe(
      "The name of the updated policyset, for example, `cis-policyset`.",
    ).optional(),
    postureDeployment: z.string().describe(
      "The name of the posture deployment, for example, `organizations/{org_id}/posturedeployments/{posture_deployment_id}`.",
    ).optional(),
    postureDeploymentResource: z.string().describe(
      "The project, folder, or organization on which the posture is deployed, for example, `projects/{project_number}`.",
    ).optional(),
    revisionId: z.string().describe(
      "The version of the posture, for example, `c7cfa2a8`.",
    ).optional(),
  }).describe(
    "Represents a posture that is deployed on Google Cloud by the Security Command Center Posture Management service. A posture contains one or more policy sets. A policy set is a group of policies that enforce a set of security rules on Google Cloud.",
  ).optional(),
  severity: z.enum([
    "SEVERITY_UNSPECIFIED",
    "CRITICAL",
    "HIGH",
    "MEDIUM",
    "LOW",
  ]).describe(
    "The severity of the finding. This field is managed by the source that writes the finding.",
  ).optional(),
  sourceProperties: z.record(z.string(), z.string()).describe(
    "Source specific properties. These properties are managed by the source that writes the finding. The key names in the source_properties map must be between 1 and 255 characters, and must start with a letter and contain alphanumeric characters or underscores only.",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "INACTIVE"]).describe(
    "The state of the finding.",
  ).optional(),
  toxicCombination: z.object({
    attackExposureScore: z.number().describe(
      "The [Attack exposure score](https://cloud.google.com/security-command-center/docs/attack-exposure-learn#attack_exposure_scores) of this toxic combination. The score is a measure of how much this toxic combination exposes one or more high-value resources to potential attack.",
    ).optional(),
    relatedFindings: z.array(z.string()).describe(
      "List of resource names of findings associated with this toxic combination. For example, `organizations/123/sources/456/findings/789`.",
    ).optional(),
  }).describe(
    "Contains details about a group of security issues that, when the issues occur together, represent a greater risk than when the issues occur independently. A group of such issues is referred to as a toxic combination.",
  ).optional(),
  vertexAi: z.object({
    datasets: z.array(z.object({
      displayName: z.string().describe(
        "The user defined display name of dataset, e.g. plants-dataset",
      ).optional(),
      name: z.string().describe(
        "Resource name of the dataset, e.g. projects/{project}/locations/{location}/datasets/2094040236064505856",
      ).optional(),
      source: z.string().describe(
        "Data source, such as BigQuery source URI, e.g. bq://scc-nexus-test.AIPPtest.gsod",
      ).optional(),
    })).describe("Datasets associated with the finding.").optional(),
    pipelines: z.array(z.object({
      displayName: z.string().describe(
        "The user defined display name of pipeline, e.g. plants-classification",
      ).optional(),
      name: z.string().describe(
        "Resource name of the pipeline, e.g. projects/{project}/locations/{location}/trainingPipelines/5253428229225578496",
      ).optional(),
    })).describe("Pipelines associated with the finding.").optional(),
  }).describe("Vertex AI-related information associated with the finding.")
    .optional(),
  vulnerability: z.object({
    cve: z.object({
      cvssv3: z.object({
        attackComplexity: z.enum([
          "ATTACK_COMPLEXITY_UNSPECIFIED",
          "ATTACK_COMPLEXITY_LOW",
          "ATTACK_COMPLEXITY_HIGH",
        ]).describe(
          "This metric describes the conditions beyond the attacker's control that must exist in order to exploit the vulnerability.",
        ).optional(),
        attackVector: z.enum([
          "ATTACK_VECTOR_UNSPECIFIED",
          "ATTACK_VECTOR_NETWORK",
          "ATTACK_VECTOR_ADJACENT",
          "ATTACK_VECTOR_LOCAL",
          "ATTACK_VECTOR_PHYSICAL",
        ]).describe(
          "Base Metrics Represents the intrinsic characteristics of a vulnerability that are constant over time and across user environments. This metric reflects the context by which vulnerability exploitation is possible.",
        ).optional(),
        availabilityImpact: z.enum([
          "IMPACT_UNSPECIFIED",
          "IMPACT_HIGH",
          "IMPACT_LOW",
          "IMPACT_NONE",
        ]).describe(
          "This metric measures the impact to the availability of the impacted component resulting from a successfully exploited vulnerability.",
        ).optional(),
        baseScore: z.number().describe(
          "The base score is a function of the base metric scores.",
        ).optional(),
        confidentialityImpact: z.enum([
          "IMPACT_UNSPECIFIED",
          "IMPACT_HIGH",
          "IMPACT_LOW",
          "IMPACT_NONE",
        ]).describe(
          "This metric measures the impact to the confidentiality of the information resources managed by a software component due to a successfully exploited vulnerability.",
        ).optional(),
        integrityImpact: z.enum([
          "IMPACT_UNSPECIFIED",
          "IMPACT_HIGH",
          "IMPACT_LOW",
          "IMPACT_NONE",
        ]).describe(
          "This metric measures the impact to integrity of a successfully exploited vulnerability.",
        ).optional(),
        privilegesRequired: z.enum([
          "PRIVILEGES_REQUIRED_UNSPECIFIED",
          "PRIVILEGES_REQUIRED_NONE",
          "PRIVILEGES_REQUIRED_LOW",
          "PRIVILEGES_REQUIRED_HIGH",
        ]).describe(
          "This metric describes the level of privileges an attacker must possess before successfully exploiting the vulnerability.",
        ).optional(),
        scope: z.enum(["SCOPE_UNSPECIFIED", "SCOPE_UNCHANGED", "SCOPE_CHANGED"])
          .describe(
            "The Scope metric captures whether a vulnerability in one vulnerable component impacts resources in components beyond its security scope.",
          ).optional(),
        userInteraction: z.enum([
          "USER_INTERACTION_UNSPECIFIED",
          "USER_INTERACTION_NONE",
          "USER_INTERACTION_REQUIRED",
        ]).describe(
          "This metric captures the requirement for a human user, other than the attacker, to participate in the successful compromise of the vulnerable component.",
        ).optional(),
      }).describe("Common Vulnerability Scoring System version 3.").optional(),
      exploitReleaseDate: z.string().describe(
        "Date the first publicly available exploit or PoC was released.",
      ).optional(),
      exploitationActivity: z.enum([
        "EXPLOITATION_ACTIVITY_UNSPECIFIED",
        "WIDE",
        "CONFIRMED",
        "AVAILABLE",
        "ANTICIPATED",
        "NO_KNOWN",
      ]).describe("The exploitation activity of the vulnerability in the wild.")
        .optional(),
      firstExploitationDate: z.string().describe(
        "Date of the earliest known exploitation.",
      ).optional(),
      id: z.string().describe(
        "The unique identifier for the vulnerability. e.g. CVE-2021-34527",
      ).optional(),
      impact: z.enum([
        "RISK_RATING_UNSPECIFIED",
        "LOW",
        "MEDIUM",
        "HIGH",
        "CRITICAL",
      ]).describe(
        "The potential impact of the vulnerability if it was to be exploited.",
      ).optional(),
      observedInTheWild: z.boolean().describe(
        "Whether or not the vulnerability has been observed in the wild.",
      ).optional(),
      references: z.array(z.object({
        source: z.string().describe("Source of the reference e.g. NVD")
          .optional(),
        uri: z.string().describe(
          "Uri for the mentioned source e.g. https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-34527.",
        ).optional(),
      })).describe(
        "Additional information about the CVE. e.g. https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-34527",
      ).optional(),
      upstreamFixAvailable: z.boolean().describe(
        "Whether upstream fix is available for the CVE.",
      ).optional(),
      zeroDay: z.boolean().describe(
        "Whether or not the vulnerability was zero day when the finding was published.",
      ).optional(),
    }).describe(
      "CVE stands for Common Vulnerabilities and Exposures. Information from the [CVE record](https://www.cve.org/ResourcesSupport/Glossary) that describes this vulnerability.",
    ).optional(),
    cwes: z.array(z.object({
      id: z.string().describe("The CWE identifier, e.g. CWE-94").optional(),
      references: z.array(z.object({
        source: z.unknown().describe("Source of the reference e.g. NVD")
          .optional(),
        uri: z.unknown().describe(
          "Uri for the mentioned source e.g. https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-34527.",
        ).optional(),
      })).describe(
        "Any reference to the details on the CWE, for example, https://cwe.mitre.org/data/definitions/94.html",
      ).optional(),
    })).describe(
      "Represents one or more Common Weakness Enumeration (CWE) information on this vulnerability.",
    ).optional(),
    fixedPackage: z.object({
      cpeUri: z.string().describe(
        "The CPE URI where the vulnerability was detected.",
      ).optional(),
      packageName: z.string().describe(
        "The name of the package where the vulnerability was detected.",
      ).optional(),
      packageType: z.string().describe(
        "Type of package, for example, os, maven, or go.",
      ).optional(),
      packageVersion: z.string().describe("The version of the package.")
        .optional(),
    }).describe("Package is a generic definition of a package.").optional(),
    offendingPackage: z.object({
      cpeUri: z.string().describe(
        "The CPE URI where the vulnerability was detected.",
      ).optional(),
      packageName: z.string().describe(
        "The name of the package where the vulnerability was detected.",
      ).optional(),
      packageType: z.string().describe(
        "Type of package, for example, os, maven, or go.",
      ).optional(),
      packageVersion: z.string().describe("The version of the package.")
        .optional(),
    }).describe("Package is a generic definition of a package.").optional(),
    providerRiskScore: z.string().describe(
      "Provider provided risk_score based on multiple factors. The higher the risk score, the more risky the vulnerability is.",
    ).optional(),
    reachable: z.boolean().describe(
      "Represents whether the vulnerability is reachable (detected via static analysis)",
    ).optional(),
    securityBulletin: z.object({
      bulletinId: z.string().describe(
        "ID of the bulletin corresponding to the vulnerability.",
      ).optional(),
      submissionTime: z.string().describe(
        "Submission time of this Security Bulletin.",
      ).optional(),
      suggestedUpgradeVersion: z.string().describe(
        "This represents a version that the cluster receiving this notification should be upgraded to, based on its current version. For example, 1.15.0",
      ).optional(),
    }).describe(
      "SecurityBulletin are notifications of vulnerabilities of Google products.",
    ).optional(),
  }).describe("Refers to common vulnerability fields e.g. cve, cvss, cwe etc.")
    .optional(),
});

const StateSchema = z.object({
  finding: z.object({
    access: z.object({
      callerIp: z.string(),
      callerIpGeo: z.object({
        regionCode: z.string(),
      }),
      methodName: z.string(),
      principalEmail: z.string(),
      principalSubject: z.string(),
      serviceAccountDelegationInfo: z.array(z.object({
        principalEmail: z.string(),
        principalSubject: z.string(),
      })),
      serviceAccountKeyName: z.string(),
      serviceName: z.string(),
      userAgent: z.string(),
      userAgentFamily: z.string(),
      userName: z.string(),
    }),
    affectedResources: z.object({
      count: z.string(),
    }),
    agentDataAccessEvents: z.array(z.object({
      eventId: z.string(),
      eventTime: z.string(),
      operation: z.string(),
      principalSubject: z.string(),
    })),
    aiModel: z.object({
      deploymentPlatform: z.string(),
      displayName: z.string(),
      domain: z.string(),
      library: z.string(),
      location: z.string(),
      name: z.string(),
      publisher: z.string(),
      usageCategory: z.string(),
    }),
    application: z.object({
      baseUri: z.string(),
      fullUri: z.string(),
    }),
    artifactGuardPolicies: z.object({
      failingPolicies: z.array(z.object({
        failureReason: z.string(),
        policyId: z.string(),
        type: z.string(),
      })),
      resourceId: z.string(),
    }),
    attackExposure: z.object({
      attackExposureResult: z.string(),
      exposedHighValueResourcesCount: z.number(),
      exposedLowValueResourcesCount: z.number(),
      exposedMediumValueResourcesCount: z.number(),
      latestCalculationTime: z.string(),
      score: z.number(),
      state: z.string(),
    }),
    backupDisasterRecovery: z.object({
      appliance: z.string(),
      applications: z.array(z.string()),
      backupCreateTime: z.string(),
      backupTemplate: z.string(),
      backupType: z.string(),
      host: z.string(),
      policies: z.array(z.string()),
      policyOptions: z.array(z.string()),
      profile: z.string(),
      storagePool: z.string(),
    }),
    canonicalName: z.string(),
    category: z.string(),
    chokepoint: z.object({
      relatedFindings: z.array(z.string()),
    }),
    cloudArmor: z.object({
      adaptiveProtection: z.object({
        confidence: z.number(),
      }),
      attack: z.object({
        classification: z.string(),
        volumeBps: z.number(),
        volumeBpsLong: z.string(),
        volumePps: z.number(),
        volumePpsLong: z.string(),
      }),
      duration: z.string(),
      requests: z.object({
        longTermAllowed: z.number(),
        longTermDenied: z.number(),
        ratio: z.number(),
        shortTermAllowed: z.number(),
      }),
      securityPolicy: z.object({
        name: z.string(),
        preview: z.boolean(),
        type: z.string(),
      }),
      threatVector: z.string(),
    }),
    cloudDlpDataProfile: z.object({
      dataProfile: z.string(),
      infoTypes: z.array(z.object({
        name: z.string(),
        sensitivityScore: z.object({
          score: z.unknown(),
        }),
        version: z.string(),
      })),
      parentType: z.string(),
    }),
    cloudDlpInspection: z.object({
      fullScan: z.boolean(),
      infoType: z.string(),
      infoTypeCount: z.string(),
      inspectJob: z.string(),
    }),
    complianceDetails: z.object({
      cloudControl: z.object({
        cloudControlName: z.string(),
        policyType: z.string(),
        type: z.string(),
        version: z.number(),
      }),
      cloudControlDeploymentNames: z.array(z.string()),
      frameworks: z.array(z.object({
        category: z.array(z.unknown()),
        controls: z.array(z.unknown()),
        displayName: z.string(),
        name: z.string(),
        type: z.string(),
      })),
    }),
    compliances: z.array(z.object({
      ids: z.array(z.string()),
      standard: z.string(),
      version: z.string(),
    })),
    connections: z.array(z.object({
      destinationIp: z.string(),
      destinationPort: z.number(),
      protocol: z.string(),
      sourceIp: z.string(),
      sourcePort: z.number(),
    })),
    contacts: z.record(z.string(), z.unknown()),
    containers: z.array(z.object({
      createTime: z.string(),
      imageId: z.string(),
      labels: z.array(z.object({
        name: z.unknown(),
        value: z.unknown(),
      })),
      name: z.string(),
      uri: z.string(),
    })),
    createTime: z.string(),
    dataAccessEvents: z.array(z.object({
      eventId: z.string(),
      eventTime: z.string(),
      operation: z.string(),
      principalEmail: z.string(),
    })),
    dataFlowEvents: z.array(z.object({
      eventId: z.string(),
      eventTime: z.string(),
      operation: z.string(),
      principalEmail: z.string(),
      violatedLocation: z.string(),
    })),
    dataRetentionDeletionEvents: z.array(z.object({
      dataObjectCount: z.string(),
      eventDetectionTime: z.string(),
      eventType: z.string(),
      maxRetentionAllowed: z.string(),
      minRetentionAllowed: z.string(),
    })),
    database: z.object({
      displayName: z.string(),
      grantees: z.array(z.string()),
      name: z.string(),
      query: z.string(),
      userName: z.string(),
      version: z.string(),
    }),
    description: z.string(),
    discoveredWorkload: z.object({
      confidence: z.string(),
      detectedRelevantHardware: z.boolean(),
      detectedRelevantKeywords: z.boolean(),
      detectedRelevantPackages: z.boolean(),
      workloadType: z.string(),
    }),
    disk: z.object({
      name: z.string(),
    }),
    eventTime: z.string(),
    exfiltration: z.object({
      sources: z.array(z.object({
        components: z.array(z.unknown()),
        name: z.string(),
      })),
      targets: z.array(z.object({
        components: z.array(z.unknown()),
        name: z.string(),
      })),
      totalExfiltratedBytes: z.string(),
    }),
    externalExposure: z.object({
      backendService: z.string(),
      exposedEndpoint: z.string(),
      exposedService: z.string(),
      forwardingRule: z.string(),
      instanceGroup: z.string(),
      loadBalancerFirewallPolicy: z.string(),
      networkEndpointGroup: z.string(),
      privateIpAddress: z.string(),
      privatePort: z.string(),
      publicIpAddress: z.string(),
      publicPort: z.string(),
      serviceFirewallPolicy: z.string(),
    }),
    externalSystems: z.record(z.string(), z.unknown()),
    externalUri: z.string(),
    files: z.array(z.object({
      contents: z.string(),
      diskPath: z.object({
        partitionUuid: z.string(),
        relativePath: z.string(),
      }),
      fileLoadState: z.string(),
      hashedSize: z.string(),
      operations: z.array(z.object({
        type: z.unknown(),
      })),
      partiallyHashed: z.boolean(),
      path: z.string(),
      sha256: z.string(),
      size: z.string(),
    })),
    findingClass: z.string(),
    groupMemberships: z.array(z.object({
      groupId: z.string(),
      groupType: z.string(),
    })),
    iamBindings: z.array(z.object({
      action: z.string(),
      member: z.string(),
      role: z.string(),
    })),
    indicator: z.object({
      domains: z.array(z.string()),
      ipAddresses: z.array(z.string()),
      signatures: z.array(z.object({
        memoryHashSignature: z.object({
          binaryFamily: z.unknown(),
          detections: z.unknown(),
        }),
        signatureType: z.string(),
        yaraRuleSignature: z.object({
          yaraRule: z.unknown(),
        }),
      })),
      uris: z.array(z.string()),
    }),
    ipRules: z.object({
      allowed: z.object({
        ipRules: z.array(z.object({
          portRanges: z.unknown(),
          protocol: z.unknown(),
        })),
      }),
      denied: z.object({
        ipRules: z.array(z.object({
          portRanges: z.unknown(),
          protocol: z.unknown(),
        })),
      }),
      destinationIpRanges: z.array(z.string()),
      direction: z.string(),
      exposedServices: z.array(z.string()),
      sourceIpRanges: z.array(z.string()),
    }),
    job: z.object({
      errorCode: z.number(),
      location: z.string(),
      name: z.string(),
      state: z.string(),
    }),
    kernelRootkit: z.object({
      name: z.string(),
      unexpectedCodeModification: z.boolean(),
      unexpectedFtraceHandler: z.boolean(),
      unexpectedInterruptHandler: z.boolean(),
      unexpectedKernelCodePages: z.boolean(),
      unexpectedKprobeHandler: z.boolean(),
      unexpectedProcessesInRunqueue: z.boolean(),
      unexpectedReadOnlyDataModification: z.boolean(),
      unexpectedSystemCallHandler: z.boolean(),
    }),
    kubernetes: z.object({
      accessReviews: z.array(z.object({
        group: z.string(),
        name: z.string(),
        ns: z.string(),
        resource: z.string(),
        subresource: z.string(),
        verb: z.string(),
        version: z.string(),
      })),
      bindings: z.array(z.object({
        name: z.string(),
        ns: z.string(),
        role: z.object({
          kind: z.unknown(),
          name: z.unknown(),
          ns: z.unknown(),
        }),
        subjects: z.array(z.unknown()),
      })),
      nodePools: z.array(z.object({
        name: z.string(),
        nodes: z.array(z.unknown()),
      })),
      nodes: z.array(z.object({
        name: z.string(),
      })),
      objects: z.array(z.object({
        containers: z.array(z.unknown()),
        group: z.string(),
        kind: z.string(),
        name: z.string(),
        ns: z.string(),
      })),
      pods: z.array(z.object({
        containers: z.array(z.unknown()),
        labels: z.array(z.unknown()),
        name: z.string(),
        ns: z.string(),
      })),
      roles: z.array(z.object({
        kind: z.string(),
        name: z.string(),
        ns: z.string(),
      })),
    }),
    loadBalancers: z.array(z.object({
      name: z.string(),
    })),
    logEntries: z.array(z.object({
      cloudLoggingEntry: z.object({
        insertId: z.string(),
        logId: z.string(),
        resourceContainer: z.string(),
        timestamp: z.string(),
      }),
    })),
    mitreAttack: z.object({
      additionalTactics: z.array(z.string()),
      additionalTechniques: z.array(z.string()),
      primaryTactic: z.string(),
      primaryTechniques: z.array(z.string()),
      version: z.string(),
    }),
    moduleName: z.string(),
    mute: z.string(),
    muteInfo: z.object({
      dynamicMuteRecords: z.array(z.object({
        matchTime: z.string(),
        muteConfig: z.string(),
      })),
      staticMute: z.object({
        applyTime: z.string(),
        state: z.string(),
      }),
    }),
    muteInitiator: z.string(),
    muteUpdateTime: z.string(),
    name: z.string(),
    networks: z.array(z.object({
      name: z.string(),
    })),
    nextSteps: z.string(),
    notebook: z.object({
      lastAuthor: z.string(),
      name: z.string(),
      notebookUpdateTime: z.string(),
      service: z.string(),
    }),
    orgPolicies: z.array(z.object({
      name: z.string(),
    })),
    parent: z.string(),
    parentDisplayName: z.string(),
    policyViolationSummary: z.object({
      conformantResourcesCount: z.string(),
      evaluationErrorsCount: z.string(),
      outOfScopeResourcesCount: z.string(),
      policyViolationsCount: z.string(),
    }),
    processes: z.array(z.object({
      args: z.array(z.string()),
      argumentsTruncated: z.boolean(),
      binary: z.object({
        contents: z.string(),
        diskPath: z.object({
          partitionUuid: z.unknown(),
          relativePath: z.unknown(),
        }),
        fileLoadState: z.string(),
        hashedSize: z.string(),
        operations: z.array(z.unknown()),
        partiallyHashed: z.boolean(),
        path: z.string(),
        sha256: z.string(),
        size: z.string(),
      }),
      envVariables: z.array(z.object({
        name: z.unknown(),
        val: z.unknown(),
      })),
      envVariablesTruncated: z.boolean(),
      libraries: z.array(z.object({
        contents: z.unknown(),
        diskPath: z.unknown(),
        fileLoadState: z.unknown(),
        hashedSize: z.unknown(),
        operations: z.unknown(),
        partiallyHashed: z.unknown(),
        path: z.unknown(),
        sha256: z.unknown(),
        size: z.unknown(),
      })),
      name: z.string(),
      parentPid: z.string(),
      pid: z.string(),
      script: z.object({
        contents: z.string(),
        diskPath: z.object({
          partitionUuid: z.unknown(),
          relativePath: z.unknown(),
        }),
        fileLoadState: z.string(),
        hashedSize: z.string(),
        operations: z.array(z.unknown()),
        partiallyHashed: z.boolean(),
        path: z.string(),
        sha256: z.string(),
        size: z.string(),
      }),
      userId: z.string(),
    })),
    resourceName: z.string(),
    secret: z.object({
      environmentVariable: z.object({
        key: z.string(),
      }),
      filePath: z.object({
        path: z.string(),
      }),
      status: z.object({
        lastUpdatedTime: z.string(),
        validity: z.string(),
      }),
      type: z.string(),
    }),
    securityMarks: z.object({
      canonicalName: z.string(),
      marks: z.record(z.string(), z.unknown()),
      name: z.string(),
    }),
    securityPosture: z.object({
      changedPolicy: z.string(),
      name: z.string(),
      policy: z.string(),
      policyDriftDetails: z.array(z.object({
        detectedValue: z.string(),
        expectedValue: z.string(),
        field: z.string(),
      })),
      policySet: z.string(),
      postureDeployment: z.string(),
      postureDeploymentResource: z.string(),
      revisionId: z.string(),
    }),
    severity: z.string(),
    sourceProperties: z.record(z.string(), z.unknown()),
    state: z.string(),
    toxicCombination: z.object({
      attackExposureScore: z.number(),
      relatedFindings: z.array(z.string()),
    }),
    vertexAi: z.object({
      datasets: z.array(z.object({
        displayName: z.string(),
        name: z.string(),
        source: z.string(),
      })),
      pipelines: z.array(z.object({
        displayName: z.string(),
        name: z.string(),
      })),
    }),
    vulnerability: z.object({
      cve: z.object({
        cvssv3: z.object({
          attackComplexity: z.string(),
          attackVector: z.string(),
          availabilityImpact: z.string(),
          baseScore: z.number(),
          confidentialityImpact: z.string(),
          integrityImpact: z.string(),
          privilegesRequired: z.string(),
          scope: z.string(),
          userInteraction: z.string(),
        }),
        exploitReleaseDate: z.string(),
        exploitationActivity: z.string(),
        firstExploitationDate: z.string(),
        id: z.string(),
        impact: z.string(),
        observedInTheWild: z.boolean(),
        references: z.array(z.object({
          source: z.unknown(),
          uri: z.unknown(),
        })),
        upstreamFixAvailable: z.boolean(),
        zeroDay: z.boolean(),
      }),
      cwes: z.array(z.object({
        id: z.string(),
        references: z.array(z.unknown()),
      })),
      fixedPackage: z.object({
        cpeUri: z.string(),
        packageName: z.string(),
        packageType: z.string(),
        packageVersion: z.string(),
      }),
      offendingPackage: z.object({
        cpeUri: z.string(),
        packageName: z.string(),
        packageType: z.string(),
        packageVersion: z.string(),
      }),
      providerRiskScore: z.string(),
      reachable: z.boolean(),
      securityBulletin: z.object({
        bulletinId: z.string(),
        submissionTime: z.string(),
        suggestedUpgradeVersion: z.string(),
      }),
    }),
  }).optional(),
  resource: z.object({
    adcApplication: z.object({
      attributes: z.object({
        businessOwners: z.array(z.object({
          email: z.unknown(),
        })),
        criticality: z.object({
          type: z.string(),
        }),
        developerOwners: z.array(z.object({
          email: z.unknown(),
        })),
        environment: z.object({
          type: z.string(),
        }),
        operatorOwners: z.array(z.object({
          email: z.unknown(),
        })),
      }),
      name: z.string(),
    }),
    adcApplicationTemplate: z.object({
      name: z.string(),
    }),
    adcSharedTemplate: z.object({
      name: z.string(),
    }),
    application: z.object({
      attributes: z.object({
        businessOwners: z.array(z.object({
          email: z.unknown(),
        })),
        criticality: z.object({
          type: z.string(),
        }),
        developerOwners: z.array(z.object({
          email: z.unknown(),
        })),
        environment: z.object({
          type: z.string(),
        }),
        operatorOwners: z.array(z.object({
          email: z.unknown(),
        })),
      }),
      name: z.string(),
    }),
    awsMetadata: z.object({
      account: z.object({
        id: z.string(),
        name: z.string(),
      }),
      organization: z.object({
        id: z.string(),
      }),
      organizationalUnits: z.array(z.object({
        id: z.string(),
        name: z.string(),
      })),
    }),
    azureMetadata: z.object({
      managementGroups: z.array(z.object({
        displayName: z.string(),
        id: z.string(),
      })),
      resourceGroup: z.object({
        id: z.string(),
        name: z.string(),
      }),
      subscription: z.object({
        displayName: z.string(),
        id: z.string(),
      }),
      tenant: z.object({
        displayName: z.string(),
        id: z.string(),
      }),
    }),
    cloudProvider: z.string(),
    displayName: z.string(),
    folders: z.array(z.object({
      resourceFolder: z.string(),
      resourceFolderDisplayName: z.string(),
    })),
    location: z.string(),
    name: z.string(),
    organization: z.string(),
    parentDisplayName: z.string(),
    parentName: z.string(),
    projectDisplayName: z.string(),
    projectName: z.string(),
    resourcePath: z.object({
      nodes: z.array(z.object({
        displayName: z.string(),
        id: z.string(),
        nodeType: z.string(),
      })),
    }),
    resourcePathString: z.string(),
    service: z.string(),
    type: z.string(),
  }).optional(),
  stateChange: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  access: z.object({
    callerIp: z.string().describe('Caller\'s IP address, such as "1.1.1.1".')
      .optional(),
    callerIpGeo: z.object({
      regionCode: z.string().describe("A CLDR.").optional(),
    }).describe("Represents a geographical location for a given access.")
      .optional(),
    methodName: z.string().describe(
      'The method that the service account called, e.g. "SetIamPolicy".',
    ).optional(),
    principalEmail: z.string().describe(
      'Associated email, such as "foo@google.com". The email address of the authenticated user or a service account acting on behalf of a third party principal making the request. For third party identity callers, the `principal_subject` field is populated instead of this field. For privacy reasons, the principal email address is sometimes redacted. For more information, see [Caller identities in audit logs](https://cloud.google.com/logging/docs/audit#user-id).',
    ).optional(),
    principalSubject: z.string().describe(
      "A string that represents the principal_subject that is associated with the identity. Unlike `principal_email`, `principal_subject` supports principals that aren't associated with email addresses, such as third party principals. For most identities, the format is `principal://iam.googleapis.com/{identity pool name}/subject/{subject}`. Some GKE identities, such as GKE_WORKLOAD, FREEFORM, and GKE_HUB_WORKLOAD, still use the legacy format `serviceAccount:{identity pool name}[{subject}]`.",
    ).optional(),
    serviceAccountDelegationInfo: z.array(z.object({
      principalEmail: z.string().describe(
        "The email address of a Google account.",
      ).optional(),
      principalSubject: z.string().describe(
        "A string representing the principal_subject associated with the identity. As compared to `principal_email`, supports principals that aren't associated with email addresses, such as third party principals. For most identities, the format will be `principal://iam.googleapis.com/{identity pool name}/subjects/{subject}` except for some GKE identities (GKE_WORKLOAD, FREEFORM, GKE_HUB_WORKLOAD) that are still in the legacy format `serviceAccount:{identity pool name}[{subject}]`",
      ).optional(),
    })).describe(
      "The identity delegation history of an authenticated service account that made the request. The `serviceAccountDelegationInfo[]` object contains information about the real authorities that try to access Google Cloud resources by delegating on a service account. When multiple authorities are present, they are guaranteed to be sorted based on the original ordering of the identity delegation events.",
    ).optional(),
    serviceAccountKeyName: z.string().describe(
      'The name of the service account key that was used to create or exchange credentials when authenticating the service account that made the request. This is a scheme-less URI full resource name. For example: "//iam.googleapis.com/projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}/keys/{key}".',
    ).optional(),
    serviceName: z.string().describe(
      'This is the API service that the service account made a call to, e.g. "iam.googleapis.com"',
    ).optional(),
    userAgent: z.string().describe(
      "The caller's user agent string associated with the finding.",
    ).optional(),
    userAgentFamily: z.string().describe(
      "Type of user agent associated with the finding. For example, an operating system shell or an embedded or standalone application.",
    ).optional(),
    userName: z.string().describe(
      "A string that represents a username. The username provided depends on the type of the finding and is likely not an IAM principal. For example, this can be a system username if the finding is related to a virtual machine, or it can be an application login username.",
    ).optional(),
  }).describe("Represents an access event.").optional(),
  affectedResources: z.object({
    count: z.string().describe(
      "The count of resources affected by the finding.",
    ).optional(),
  }).describe("Details about resources affected by this finding.").optional(),
  agentDataAccessEvents: z.array(z.object({
    eventId: z.string().describe("Unique identifier for data access event.")
      .optional(),
    eventTime: z.string().describe("Timestamp of data access event.")
      .optional(),
    operation: z.enum(["OPERATION_UNSPECIFIED", "READ", "MOVE", "COPY"])
      .describe("The operation performed by the principal to access the data.")
      .optional(),
    principalSubject: z.string().describe(
      "The agent principal that accessed the data.",
    ).optional(),
  })).describe("Agent data access events associated with the finding.")
    .optional(),
  aiModel: z.object({
    deploymentPlatform: z.enum([
      "DEPLOYMENT_PLATFORM_UNSPECIFIED",
      "VERTEX_AI",
      "GKE",
      "GCE",
      "FINE_TUNED_MODEL",
    ]).describe("The platform on which the model is deployed.").optional(),
    displayName: z.string().describe(
      "The user defined display name of model. Ex. baseline-classification-model",
    ).optional(),
    domain: z.string().describe(
      "The domain of the model, for example, “image-classification”.",
    ).optional(),
    library: z.string().describe(
      "The name of the model library, for example, “transformers”.",
    ).optional(),
    location: z.string().describe(
      "The region in which the model is used, for example, “us-central1”.",
    ).optional(),
    name: z.string().describe(
      'The name of the AI model, for example, "gemini:1.0.0".',
    ).optional(),
    publisher: z.string().describe(
      "The publisher of the model, for example, “google” or “nvidia”.",
    ).optional(),
    usageCategory: z.string().describe(
      'The purpose of the model, for example, "Inteference" or "Training".',
    ).optional(),
  }).describe(
    "Contains information about the AI model associated with the finding.",
  ).optional(),
  application: z.object({
    baseUri: z.string().describe(
      "The base URI that identifies the network location of the application in which the vulnerability was detected. For example, `http://example.com`.",
    ).optional(),
    fullUri: z.string().describe(
      "The full URI with payload that can be used to reproduce the vulnerability. For example, `http://example.com?p=aMmYgI6H`.",
    ).optional(),
  }).describe("Represents an application associated with a finding.")
    .optional(),
  artifactGuardPolicies: z.object({
    failingPolicies: z.array(z.object({
      failureReason: z.string().describe(
        'The reason for the policy failure, for example, "severity=HIGH AND max_vuln_count=2".',
      ).optional(),
      policyId: z.string().describe(
        'The ID of the failing policy, for example, "organizations/3392779/locations/global/policies/prod-policy".',
      ).optional(),
      type: z.enum(["ARTIFACT_GUARD_POLICY_TYPE_UNSPECIFIED", "VULNERABILITY"])
        .describe("The type of the policy evaluation.").optional(),
    })).describe("A list of failing policies.").optional(),
    resourceId: z.string().describe(
      "The ID of the resource that has policies configured for it.",
    ).optional(),
  }).describe("Represents the result of evaluating artifact guard policies.")
    .optional(),
  attackExposure: z.object({
    attackExposureResult: z.string().describe(
      "The resource name of the attack path simulation result that contains the details regarding this attack exposure score. Example: `organizations/123/simulations/456/attackExposureResults/789`",
    ).optional(),
    exposedHighValueResourcesCount: z.number().int().describe(
      "The number of high value resources that are exposed as a result of this finding.",
    ).optional(),
    exposedLowValueResourcesCount: z.number().int().describe(
      "The number of high value resources that are exposed as a result of this finding.",
    ).optional(),
    exposedMediumValueResourcesCount: z.number().int().describe(
      "The number of medium value resources that are exposed as a result of this finding.",
    ).optional(),
    latestCalculationTime: z.string().describe(
      "The most recent time the attack exposure was updated on this finding.",
    ).optional(),
    score: z.number().describe(
      "A number between 0 (inclusive) and infinity that represents how important this finding is to remediate. The higher the score, the more important it is to remediate.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "CALCULATED", "NOT_CALCULATED"])
      .describe(
        "What state this AttackExposure is in. This captures whether or not an attack exposure has been calculated or not.",
      ).optional(),
  }).describe(
    "An attack exposure contains the results of an attack path simulation run.",
  ).optional(),
  backupDisasterRecovery: z.object({
    appliance: z.string().describe(
      "The name of the Backup and DR appliance that captures, moves, and manages the lifecycle of backup data. For example, `backup-server-57137`.",
    ).optional(),
    applications: z.array(z.string()).describe(
      "The names of Backup and DR applications. An application is a VM, database, or file system on a managed host monitored by a backup and recovery appliance. For example, `centos7-01-vol00`, `centos7-01-vol01`, `centos7-01-vol02`.",
    ).optional(),
    backupCreateTime: z.string().describe(
      "The timestamp at which the Backup and DR backup was created.",
    ).optional(),
    backupTemplate: z.string().describe(
      "The name of a Backup and DR template which comprises one or more backup policies. See the [Backup and DR documentation](https://cloud.google.com/backup-disaster-recovery/docs/concepts/backup-plan#temp) for more information. For example, `snap-ov`.",
    ).optional(),
    backupType: z.string().describe(
      "The backup type of the Backup and DR image. For example, `Snapshot`, `Remote Snapshot`, `OnVault`.",
    ).optional(),
    host: z.string().describe(
      "The name of a Backup and DR host, which is managed by the backup and recovery appliance and known to the management console. The host can be of type Generic (for example, Compute Engine, SQL Server, Oracle DB, SMB file system, etc.), vCenter, or an ESX server. See the [Backup and DR documentation on hosts](https://cloud.google.com/backup-disaster-recovery/docs/configuration/manage-hosts-and-their-applications) for more information. For example, `centos7-01`.",
    ).optional(),
    policies: z.array(z.string()).describe(
      "The names of Backup and DR policies that are associated with a template and that define when to run a backup, how frequently to run a backup, and how long to retain the backup image. For example, `onvaults`.",
    ).optional(),
    policyOptions: z.array(z.string()).describe(
      "The names of Backup and DR advanced policy options of a policy applying to an application. See the [Backup and DR documentation on policy options](https://cloud.google.com/backup-disaster-recovery/docs/create-plan/policy-settings). For example, `skipofflineappsincongrp, nounmap`.",
    ).optional(),
    profile: z.string().describe(
      "The name of the Backup and DR resource profile that specifies the storage media for backups of application and VM data. See the [Backup and DR documentation on profiles](https://cloud.google.com/backup-disaster-recovery/docs/concepts/backup-plan#profile). For example, `GCP`.",
    ).optional(),
    storagePool: z.string().describe(
      "The name of the Backup and DR storage pool that the backup and recovery appliance is storing data in. The storage pool could be of type Cloud, Primary, Snapshot, or OnVault. See the [Backup and DR documentation on storage pools](https://cloud.google.com/backup-disaster-recovery/docs/concepts/storage-pools). For example, `DiskPoolOne`.",
    ).optional(),
  }).describe(
    "Information related to Google Cloud Backup and DR Service findings.",
  ).optional(),
  canonicalName: z.string().describe(
    'The canonical name of the finding. It\'s either "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}", "folders/{folder_id}/sources/{source_id}/findings/{finding_id}" or "projects/{project_number}/sources/{source_id}/findings/{finding_id}", depending on the closest CRM ancestor of the resource associated with the finding.',
  ).optional(),
  category: z.string().describe(
    'The additional taxonomy group within findings from a given source. This field is immutable after creation time. Example: "XSS_FLASH_INJECTION"',
  ).optional(),
  chokepoint: z.object({
    relatedFindings: z.array(z.string()).describe(
      "List of resource names of findings associated with this chokepoint. For example, organizations/123/sources/456/findings/789. This list will have at most 100 findings.",
    ).optional(),
  }).describe(
    "Contains details about a chokepoint, which is a resource or resource group where high-risk attack paths converge, based on [attack path simulations] (https://cloud.google.com/security-command-center/docs/attack-exposure-learn#attack_path_simulations).",
  ).optional(),
  cloudArmor: z.object({
    adaptiveProtection: z.object({
      confidence: z.number().describe(
        "A score of 0 means that there is low confidence that the detected event is an actual attack. A score of 1 means that there is high confidence that the detected event is an attack. See the [Adaptive Protection documentation](https://cloud.google.com/armor/docs/adaptive-protection-overview#configure-alert-tuning) for further explanation.",
      ).optional(),
    }).describe(
      "Information about [Google Cloud Armor Adaptive Protection](https://cloud.google.com/armor/docs/cloud-armor-overview#google-cloud-armor-adaptive-protection).",
    ).optional(),
    attack: z.object({
      classification: z.string().describe(
        "Type of attack, for example, 'SYN-flood', 'NTP-udp', or 'CHARGEN-udp'.",
      ).optional(),
      volumeBps: z.number().int().describe(
        "Total BPS (bytes per second) volume of attack. Deprecated - refer to volume_bps_long instead.",
      ).optional(),
      volumeBpsLong: z.string().describe(
        "Total BPS (bytes per second) volume of attack.",
      ).optional(),
      volumePps: z.number().int().describe(
        "Total PPS (packets per second) volume of attack. Deprecated - refer to volume_pps_long instead.",
      ).optional(),
      volumePpsLong: z.string().describe(
        "Total PPS (packets per second) volume of attack.",
      ).optional(),
    }).describe("Information about DDoS attack volume and classification.")
      .optional(),
    duration: z.string().describe(
      "Duration of attack from the start until the current moment (updated every 5 minutes).",
    ).optional(),
    requests: z.object({
      longTermAllowed: z.number().int().describe(
        "Allowed RPS (requests per second) over the long term.",
      ).optional(),
      longTermDenied: z.number().int().describe(
        "Denied RPS (requests per second) over the long term.",
      ).optional(),
      ratio: z.number().describe(
        "For 'Increasing deny ratio', the ratio is the denied traffic divided by the allowed traffic. For 'Allowed traffic spike', the ratio is the allowed traffic in the short term divided by allowed traffic in the long term.",
      ).optional(),
      shortTermAllowed: z.number().int().describe(
        "Allowed RPS (requests per second) in the short term.",
      ).optional(),
    }).describe("Information about the requests relevant to the finding.")
      .optional(),
    securityPolicy: z.object({
      name: z.string().describe(
        'The name of the Google Cloud Armor security policy, for example, "my-security-policy".',
      ).optional(),
      preview: z.boolean().describe(
        "Whether or not the associated rule or policy is in preview mode.",
      ).optional(),
      type: z.string().describe(
        "The type of Google Cloud Armor security policy for example, 'backend security policy', 'edge security policy', 'network edge security policy', or 'always-on DDoS protection'.",
      ).optional(),
    }).describe(
      "Information about the [Google Cloud Armor security policy](https://cloud.google.com/armor/docs/security-policy-overview) relevant to the finding.",
    ).optional(),
    threatVector: z.string().describe(
      'Distinguish between volumetric & protocol DDoS attack and application layer attacks. For example, "L3_4" for Layer 3 and Layer 4 DDoS attacks, or "L_7" for Layer 7 DDoS attacks.',
    ).optional(),
  }).describe("Fields related to Google Cloud Armor findings.").optional(),
  cloudDlpDataProfile: z.object({
    dataProfile: z.string().describe(
      "Name of the data profile, for example, `projects/123/locations/europe/tableProfiles/8383929`.",
    ).optional(),
    infoTypes: z.array(z.object({
      name: z.string().describe(
        "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
      ).optional(),
      sensitivityScore: z.object({
        score: z.enum([
          "SENSITIVITY_SCORE_LEVEL_UNSPECIFIED",
          "SENSITIVITY_LOW",
          "SENSITIVITY_UNKNOWN",
          "SENSITIVITY_MODERATE",
          "SENSITIVITY_HIGH",
        ]).describe("The sensitivity score applied to the resource.")
          .optional(),
      }).describe(
        "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
      ).optional(),
      version: z.string().describe("Optional version name for this InfoType.")
        .optional(),
    })).describe(
      "Type of information detected by SDP. Info type includes name, version and sensitivity of the detected information type.",
    ).optional(),
    parentType: z.enum(["PARENT_TYPE_UNSPECIFIED", "ORGANIZATION", "PROJECT"])
      .describe(
        "The resource hierarchy level at which the data profile was generated.",
      ).optional(),
  }).describe(
    "The [data profile](https://cloud.google.com/dlp/docs/data-profiles) associated with the finding.",
  ).optional(),
  cloudDlpInspection: z.object({
    fullScan: z.boolean().describe(
      "Whether Cloud DLP scanned the complete resource or a sampled subset.",
    ).optional(),
    infoType: z.string().describe(
      "The type of information (or *[infoType](https://cloud.google.com/dlp/docs/infotypes-reference)*) found, for example, `EMAIL_ADDRESS` or `STREET_ADDRESS`.",
    ).optional(),
    infoTypeCount: z.string().describe(
      "The number of times Cloud DLP found this infoType within this job and resource.",
    ).optional(),
    inspectJob: z.string().describe(
      "Name of the inspection job, for example, `projects/123/locations/europe/dlpJobs/i-8383929`.",
    ).optional(),
  }).describe(
    "Details about the Cloud Data Loss Prevention (Cloud DLP) [inspection job](https://cloud.google.com/dlp/docs/concepts-job-triggers) that produced the finding.",
  ).optional(),
  complianceDetails: z.object({
    cloudControl: z.object({
      cloudControlName: z.string().describe(
        "Name of the CloudControl associated with the finding.",
      ).optional(),
      policyType: z.string().describe("Policy type of the CloudControl")
        .optional(),
      type: z.enum(["CLOUD_CONTROL_TYPE_UNSPECIFIED", "BUILT_IN", "CUSTOM"])
        .describe("Type of cloud control.").optional(),
      version: z.number().int().describe("Version of the Cloud Control")
        .optional(),
    }).describe("CloudControl associated with the finding.").optional(),
    cloudControlDeploymentNames: z.array(z.string()).describe(
      "Cloud Control Deployments associated with the finding. For example, organizations/123/locations/global/cloudControlDeployments/deploymentIdentifier",
    ).optional(),
    frameworks: z.array(z.object({
      category: z.array(
        z.enum([
          "FRAMEWORK_CATEGORY_UNSPECIFIED",
          "SECURITY_BENCHMARKS",
          "ASSURED_WORKLOADS",
          "DATA_SECURITY",
          "GOOGLE_BEST_PRACTICES",
          "CUSTOM_FRAMEWORK",
        ]),
      ).describe(
        "Category of the framework associated with the finding. E.g. Security Benchmark, or Assured Workloads",
      ).optional(),
      controls: z.array(z.object({
        controlName: z.unknown().describe("Name of the Control").optional(),
        displayName: z.unknown().describe(
          "Display name of the control. For example, AU-02.",
        ).optional(),
      })).describe("The controls associated with the framework.").optional(),
      displayName: z.string().describe(
        "Display name of the framework. For a standard framework, this will look like e.g. PCI DSS 3.2.1, whereas for a custom framework it can be a user defined string like MyFramework",
      ).optional(),
      name: z.string().describe(
        "Name of the framework associated with the finding",
      ).optional(),
      type: z.enum([
        "FRAMEWORK_TYPE_UNSPECIFIED",
        "FRAMEWORK_TYPE_BUILT_IN",
        "FRAMEWORK_TYPE_CUSTOM",
      ]).describe(
        "Type of the framework associated with the finding, to specify whether the framework is built-in (pre-defined and immutable) or a custom framework defined by the customer (equivalent to security posture)",
      ).optional(),
    })).describe("Details of Frameworks associated with the finding")
      .optional(),
  }).describe("Compliance Details associated with the finding.").optional(),
  compliances: z.array(z.object({
    ids: z.array(z.string()).describe(
      "Policies within the standard or benchmark, for example, A.12.4.1",
    ).optional(),
    standard: z.string().describe(
      "Industry-wide compliance standards or benchmarks, such as CIS, PCI, and OWASP.",
    ).optional(),
    version: z.string().describe(
      "Version of the standard or benchmark, for example, 1.1",
    ).optional(),
  })).describe(
    "Contains compliance information for security standards associated to the finding.",
  ).optional(),
  connections: z.array(z.object({
    destinationIp: z.string().describe(
      "Destination IP address. Not present for sockets that are listening and not connected.",
    ).optional(),
    destinationPort: z.number().int().describe(
      "Destination port. Not present for sockets that are listening and not connected.",
    ).optional(),
    protocol: z.enum([
      "PROTOCOL_UNSPECIFIED",
      "ICMP",
      "TCP",
      "UDP",
      "GRE",
      "ESP",
    ]).describe("IANA Internet Protocol Number such as TCP(6) and UDP(17).")
      .optional(),
    sourceIp: z.string().describe("Source IP address.").optional(),
    sourcePort: z.number().int().describe("Source port.").optional(),
  })).describe(
    "Contains information about the IP connection associated with the finding.",
  ).optional(),
  contacts: z.record(
    z.string(),
    z.object({
      contacts: z.array(z.object({
        email: z.string().describe(
          'An email address. For example, "`person123@company.com`".',
        ).optional(),
      })).describe("A list of contacts").optional(),
    }),
  ).describe(
    'Output only. Map containing the points of contact for the given finding. The key represents the type of contact, while the value contains a list of all the contacts that pertain. Please refer to: https://cloud.google.com/resource-manager/docs/managing-notification-contacts#notification-categories { "security": { "contacts": [ { "email": "person1@company.com" }, { "email": "person2@company.com" } ] } }',
  ).optional(),
  containers: z.array(z.object({
    createTime: z.string().describe("The time that the container was created.")
      .optional(),
    imageId: z.string().describe(
      "Optional container image ID, if provided by the container runtime. Uniquely identifies the container image launched using a container image digest.",
    ).optional(),
    labels: z.array(z.object({
      name: z.string().describe("Name of the label.").optional(),
      value: z.string().describe("Value that corresponds to the label's name.")
        .optional(),
    })).describe("Container labels, as provided by the container runtime.")
      .optional(),
    name: z.string().describe("Name of the container.").optional(),
    uri: z.string().describe(
      "Container image URI provided when configuring a pod or container. This string can identify a container image version using mutable tags.",
    ).optional(),
  })).describe(
    "Containers associated with the finding. This field provides information for both Kubernetes and non-Kubernetes containers.",
  ).optional(),
  createTime: z.string().describe(
    "The time at which the finding was created in Security Command Center.",
  ).optional(),
  dataAccessEvents: z.array(z.object({
    eventId: z.string().describe("Unique identifier for data access event.")
      .optional(),
    eventTime: z.string().describe("Timestamp of data access event.")
      .optional(),
    operation: z.enum(["OPERATION_UNSPECIFIED", "READ", "MOVE", "COPY"])
      .describe("The operation performed by the principal to access the data.")
      .optional(),
    principalEmail: z.string().describe(
      "The email address of the principal that accessed the data. The principal could be a user account, service account, Google group, or other.",
    ).optional(),
  })).describe("Data access events associated with the finding.").optional(),
  dataFlowEvents: z.array(z.object({
    eventId: z.string().describe("Unique identifier for data flow event.")
      .optional(),
    eventTime: z.string().describe("Timestamp of data flow event.").optional(),
    operation: z.enum(["OPERATION_UNSPECIFIED", "READ", "MOVE", "COPY"])
      .describe(
        "The operation performed by the principal for the data flow event.",
      ).optional(),
    principalEmail: z.string().describe(
      "The email address of the principal that initiated the data flow event. The principal could be a user account, service account, Google group, or other.",
    ).optional(),
    violatedLocation: z.string().describe(
      "Non-compliant location of the principal or the data destination.",
    ).optional(),
  })).describe("Data flow events associated with the finding.").optional(),
  dataRetentionDeletionEvents: z.array(z.object({
    dataObjectCount: z.string().describe(
      "Number of objects that violated the policy for this resource. If the number is less than 1,000, then the value of this field is the exact number. If the number of objects that violated the policy is greater than or equal to 1,000, then the value of this field is 1000.",
    ).optional(),
    eventDetectionTime: z.string().describe(
      "Timestamp indicating when the event was detected.",
    ).optional(),
    eventType: z.enum([
      "EVENT_TYPE_UNSPECIFIED",
      "EVENT_TYPE_MAX_TTL_EXCEEDED",
      "EVENT_TYPE_MAX_TTL_FROM_CREATION",
      "EVENT_TYPE_MAX_TTL_FROM_LAST_MODIFICATION",
      "EVENT_TYPE_MIN_TTL_FROM_CREATION",
    ]).describe("Type of the DRD event.").optional(),
    maxRetentionAllowed: z.string().describe(
      "Maximum duration of retention allowed from the DRD control. This comes from the DRD control where users set a max TTL for their data. For example, suppose that a user sets the max TTL for a Cloud Storage bucket to 90 days. However, an object in that bucket is 100 days old. In this case, a DataRetentionDeletionEvent will be generated for that Cloud Storage bucket, and the max_retention_allowed is 90 days.",
    ).optional(),
    minRetentionAllowed: z.string().describe(
      "Min duration of retention allowed from the DSPM retention control. This field is only populated when event type is set to EVENT_TYPE_MIN_TTL_FROM_CREATION.",
    ).optional(),
  })).describe("Data retention deletion events associated with the finding.")
    .optional(),
  database: z.object({
    displayName: z.string().describe(
      "The human-readable name of the database that the user connected to.",
    ).optional(),
    grantees: z.array(z.string()).describe(
      "The target usernames, roles, or groups of an SQL privilege grant, which is not an IAM policy change.",
    ).optional(),
    name: z.string().describe(
      "Some database resources may not have the [full resource name](https://google.aip.dev/122#full-resource-names) populated because these resource types are not yet supported by Cloud Asset Inventory (e.g. Cloud SQL databases). In these cases only the display name will be provided. The [full resource name](https://google.aip.dev/122#full-resource-names) of the database that the user connected to, if it is supported by Cloud Asset Inventory.",
    ).optional(),
    query: z.string().describe(
      "The SQL statement that is associated with the database access.",
    ).optional(),
    userName: z.string().describe(
      "The username used to connect to the database. The username might not be an IAM principal and does not have a set format.",
    ).optional(),
    version: z.string().describe(
      "The version of the database, for example, POSTGRES_14. See [the complete list](https://cloud.google.com/sql/docs/mysql/admin-api/rest/v1/SqlDatabaseVersion).",
    ).optional(),
  }).describe(
    "Represents database access information, such as queries. A database may be a sub-resource of an instance (as in the case of Cloud SQL instances or Cloud Spanner instances), or the database instance itself. Some database resources might not have the [full resource name](https://google.aip.dev/122#full-resource-names) populated because these resource types, such as Cloud SQL databases, are not yet supported by Cloud Asset Inventory. In these cases only the display name is provided.",
  ).optional(),
  description: z.string().describe("Contains more details about the finding.")
    .optional(),
  discoveredWorkload: z.object({
    confidence: z.enum(["CONFIDENCE_UNSPECIFIED", "CONFIDENCE_HIGH"]).describe(
      "The confidence in detection of this workload.",
    ).optional(),
    detectedRelevantHardware: z.boolean().describe(
      "A boolean flag set to true if associated hardware strongly predicts the workload type.",
    ).optional(),
    detectedRelevantKeywords: z.boolean().describe(
      "A boolean flag set to true if associated keywords strongly predict the workload type.",
    ).optional(),
    detectedRelevantPackages: z.boolean().describe(
      "A boolean flag set to true if installed packages strongly predict the workload type.",
    ).optional(),
    workloadType: z.enum([
      "WORKLOAD_TYPE_UNSPECIFIED",
      "MCP_SERVER",
      "AI_INFERENCE",
      "AGENT",
    ]).describe("The type of workload.").optional(),
  }).describe(
    "Represents discovered, customer managed workload that is not registered with the respective GCP service.",
  ).optional(),
  disk: z.object({
    name: z.string().describe(
      'The name of the disk, for example, "https://www.googleapis.com/compute/v1/projects/{project-id}/zones/{zone-id}/disks/{disk-id}".',
    ).optional(),
  }).describe(
    "Contains information about the disk associated with the finding.",
  ).optional(),
  eventTime: z.string().describe(
    "The time the finding was first detected. If an existing finding is updated, then this is the time the update occurred. For example, if the finding represents an open firewall, this property captures the time the detector believes the firewall became open. The accuracy is determined by the detector. If the finding is later resolved, then this time reflects when the finding was resolved. This must not be set to a value greater than the current timestamp.",
  ).optional(),
  exfiltration: z.object({
    sources: z.array(z.object({
      components: z.array(z.string()).describe(
        "Subcomponents of the asset that was exfiltrated, like URIs used during exfiltration, table names, databases, and filenames. For example, multiple tables might have been exfiltrated from the same Cloud SQL instance, or multiple files might have been exfiltrated from the same Cloud Storage bucket.",
      ).optional(),
      name: z.string().describe(
        "The resource's [full resource name](https://cloud.google.com/apis/design/resource_names#full_resource_name).",
      ).optional(),
    })).describe(
      'If there are multiple sources, then the data is considered "joined" between them. For instance, BigQuery can join multiple tables, and each table would be considered a source.',
    ).optional(),
    targets: z.array(z.object({
      components: z.array(z.string()).describe(
        "Subcomponents of the asset that was exfiltrated, like URIs used during exfiltration, table names, databases, and filenames. For example, multiple tables might have been exfiltrated from the same Cloud SQL instance, or multiple files might have been exfiltrated from the same Cloud Storage bucket.",
      ).optional(),
      name: z.string().describe(
        "The resource's [full resource name](https://cloud.google.com/apis/design/resource_names#full_resource_name).",
      ).optional(),
    })).describe(
      'If there are multiple targets, each target would get a complete copy of the "joined" source data.',
    ).optional(),
    totalExfiltratedBytes: z.string().describe(
      "Total exfiltrated bytes processed for the entire job.",
    ).optional(),
  }).describe(
    "Exfiltration represents a data exfiltration attempt from one or more sources to one or more targets. The `sources` attribute lists the sources of the exfiltrated data. The `targets` attribute lists the destinations the data was copied to.",
  ).optional(),
  externalExposure: z.object({
    backendService: z.string().describe(
      'The full resource name of load balancer backend service, for example, "//compute.googleapis.com/projects/{project-id}/global/backendServices/{name}".',
    ).optional(),
    exposedEndpoint: z.string().describe(
      'The resource which is running the exposed service, for example, "//compute.googleapis.com/projects/{project-id}/zones/{zone}/instances/{instance}.”',
    ).optional(),
    exposedService: z.string().describe(
      'The name and version of the service, for example, "Jupyter Notebook 6.14.0".',
    ).optional(),
    forwardingRule: z.string().describe(
      'The full resource name of the forwarding rule, for example, "//compute.googleapis.com/projects/{project-id}/global/forwardingRules/{forwarding-rule-name}".',
    ).optional(),
    instanceGroup: z.string().describe(
      'The full resource name of the instance group, for example, "//compute.googleapis.com/projects/{project-id}/global/instanceGroups/{name}".',
    ).optional(),
    loadBalancerFirewallPolicy: z.string().describe(
      'The full resource name of the load balancer firewall policy, for example, "//compute.googleapis.com/projects/{project-id}/global/firewallPolicies/{policy-name}".',
    ).optional(),
    networkEndpointGroup: z.string().describe(
      'The full resource name of the network endpoint group, for example, "//compute.googleapis.com/projects/{project-id}/global/networkEndpointGroups/{name}".',
    ).optional(),
    privateIpAddress: z.string().describe(
      "Private IP address of the exposed endpoint.",
    ).optional(),
    privatePort: z.string().describe(
      "Port number associated with private IP address.",
    ).optional(),
    publicIpAddress: z.string().describe(
      "Public IP address of the exposed endpoint.",
    ).optional(),
    publicPort: z.string().describe(
      "Public port number of the exposed endpoint.",
    ).optional(),
    serviceFirewallPolicy: z.string().describe(
      'The full resource name of the firewall policy of the exposed service, for example, "//compute.googleapis.com/projects/{project-id}/global/firewallPolicies/{policy-name}".',
    ).optional(),
  }).describe(
    "Details about the externally exposed resource associated with the finding.",
  ).optional(),
  externalSystems: z.record(
    z.string(),
    z.object({
      assignees: z.array(z.string()).describe(
        "References primary/secondary etc assignees in the external system.",
      ).optional(),
      caseCloseTime: z.string().describe(
        "The time when the case was closed, as reported by the external system.",
      ).optional(),
      caseCreateTime: z.string().describe(
        "The time when the case was created, as reported by the external system.",
      ).optional(),
      casePriority: z.string().describe(
        "The priority of the finding's corresponding case in the external system.",
      ).optional(),
      caseSla: z.string().describe(
        "The SLA of the finding's corresponding case in the external system.",
      ).optional(),
      caseUri: z.string().describe(
        "The link to the finding's corresponding case in the external system.",
      ).optional(),
      externalSystemUpdateTime: z.string().describe(
        "The time when the case was last updated, as reported by the external system.",
      ).optional(),
      externalUid: z.string().describe(
        "The identifier that's used to track the finding's corresponding case in the external system.",
      ).optional(),
      name: z.string().describe(
        'Full resource name of the external system, for example: "organizations/1234/sources/5678/findings/123456/externalSystems/jira", "folders/1234/sources/5678/findings/123456/externalSystems/jira", "projects/1234/sources/5678/findings/123456/externalSystems/jira"',
      ).optional(),
      status: z.string().describe(
        "The most recent status of the finding's corresponding case, as reported by the external system.",
      ).optional(),
      ticketInfo: z.object({
        assignee: z.string().describe(
          "The assignee of the ticket in the ticket system.",
        ).optional(),
        description: z.string().describe(
          "The description of the ticket in the ticket system.",
        ).optional(),
        id: z.string().describe(
          "The identifier of the ticket in the ticket system.",
        ).optional(),
        status: z.string().describe(
          "The latest status of the ticket, as reported by the ticket system.",
        ).optional(),
        updateTime: z.string().describe(
          "The time when the ticket was last updated, as reported by the ticket system.",
        ).optional(),
        uri: z.string().describe("The link to the ticket in the ticket system.")
          .optional(),
      }).describe(
        "Information about the ticket, if any, that is being used to track the resolution of the issue that is identified by this finding.",
      ).optional(),
    }),
  ).describe(
    "Output only. Third party SIEM/SOAR fields within SCC, contains external system information and external system finding fields.",
  ).optional(),
  externalUri: z.string().describe(
    "The URI that, if available, points to a web page outside of Security Command Center where additional information about the finding can be found. This field is guaranteed to be either empty or a well formed URL.",
  ).optional(),
  files: z.array(z.object({
    contents: z.string().describe(
      "Prefix of the file contents as a JSON-encoded string.",
    ).optional(),
    diskPath: z.object({
      partitionUuid: z.string().describe(
        "UUID of the partition (format https://wiki.archlinux.org/title/persistent_block_device_naming#by-uuid)",
      ).optional(),
      relativePath: z.string().describe(
        "Relative path of the file in the partition as a JSON encoded string. Example: /home/user1/executable_file.sh",
      ).optional(),
    }).describe(
      "Path of the file in terms of underlying disk/partition identifiers.",
    ).optional(),
    fileLoadState: z.enum([
      "FILE_LOAD_STATE_UNSPECIFIED",
      "LOADED_BY_PROCESS",
      "NOT_LOADED_BY_PROCESS",
    ]).describe("The load state of the file.").optional(),
    hashedSize: z.string().describe(
      "The length in bytes of the file prefix that was hashed. If hashed_size == size, any hashes reported represent the entire file.",
    ).optional(),
    operations: z.array(z.object({
      type: z.enum([
        "OPERATION_TYPE_UNSPECIFIED",
        "OPEN",
        "READ",
        "RENAME",
        "WRITE",
        "EXECUTE",
      ]).describe("The type of the operation").optional(),
    })).describe("Operation(s) performed on a file.").optional(),
    partiallyHashed: z.boolean().describe(
      "True when the hash covers only a prefix of the file.",
    ).optional(),
    path: z.string().describe(
      "Absolute path of the file as a JSON encoded string.",
    ).optional(),
    sha256: z.string().describe(
      "SHA256 hash of the first hashed_size bytes of the file encoded as a hex string. If hashed_size == size, sha256 represents the SHA256 hash of the entire file.",
    ).optional(),
    size: z.string().describe("Size of the file in bytes.").optional(),
  })).describe("File associated with the finding.").optional(),
  findingClass: z.enum([
    "FINDING_CLASS_UNSPECIFIED",
    "THREAT",
    "VULNERABILITY",
    "MISCONFIGURATION",
    "OBSERVATION",
    "SCC_ERROR",
    "POSTURE_VIOLATION",
    "TOXIC_COMBINATION",
    "SENSITIVE_DATA_RISK",
    "CHOKEPOINT",
    "EXTERNAL_EXPOSURE",
  ]).describe("The class of the finding.").optional(),
  groupMemberships: z.array(z.object({
    groupId: z.string().describe("ID of the group.").optional(),
    groupType: z.enum([
      "GROUP_TYPE_UNSPECIFIED",
      "GROUP_TYPE_TOXIC_COMBINATION",
      "GROUP_TYPE_CHOKEPOINT",
    ]).describe("Type of group.").optional(),
  })).describe(
    "Contains details about groups of which this finding is a member. A group is a collection of findings that are related in some way. This field cannot be updated. Its value is ignored in all update requests.",
  ).optional(),
  iamBindings: z.array(z.object({
    action: z.enum(["ACTION_UNSPECIFIED", "ADD", "REMOVE"]).describe(
      "The action that was performed on a Binding.",
    ).optional(),
    member: z.string().describe(
      'A single identity requesting access for a Cloud Platform resource, for example, "foo@google.com".',
    ).optional(),
    role: z.string().describe(
      'Role that is assigned to "members". For example, "roles/viewer", "roles/editor", or "roles/owner".',
    ).optional(),
  })).describe("Represents IAM bindings associated with the finding.")
    .optional(),
  indicator: z.object({
    domains: z.array(z.string()).describe(
      "List of domains associated to the Finding.",
    ).optional(),
    ipAddresses: z.array(z.string()).describe(
      "The list of IP addresses that are associated with the finding.",
    ).optional(),
    signatures: z.array(z.object({
      memoryHashSignature: z.object({
        binaryFamily: z.string().describe("The binary family.").optional(),
        detections: z.array(z.unknown()).describe(
          "The list of memory hash detections contributing to the binary family match.",
        ).optional(),
      }).describe("A signature corresponding to memory page hashes.")
        .optional(),
      signatureType: z.enum([
        "SIGNATURE_TYPE_UNSPECIFIED",
        "SIGNATURE_TYPE_PROCESS",
        "SIGNATURE_TYPE_FILE",
      ]).describe(
        "Describes the type of resource associated with the signature.",
      ).optional(),
      yaraRuleSignature: z.object({
        yaraRule: z.string().describe("The name of the YARA rule.").optional(),
      }).describe("A signature corresponding to a YARA rule.").optional(),
    })).describe(
      "The list of matched signatures indicating that the given process is present in the environment.",
    ).optional(),
    uris: z.array(z.string()).describe(
      "The list of URIs associated to the Findings.",
    ).optional(),
  }).describe(
    "Represents what's commonly known as an _indicator of compromise_ (IoC) in computer forensics. This is an artifact observed on a network or in an operating system that, with high confidence, indicates a computer intrusion. For more information, see [Indicator of compromise](https://en.wikipedia.org/wiki/Indicator_of_compromise).",
  ).optional(),
  ipRules: z.object({
    allowed: z.object({
      ipRules: z.array(z.object({
        portRanges: z.array(z.unknown()).describe(
          "Optional. An optional list of ports to which this rule applies. This field is only applicable for the UDP or (S)TCP protocols. Each entry must be either an integer or a range including a min and max port number.",
        ).optional(),
        protocol: z.string().describe(
          "The IP protocol this rule applies to. This value can either be one of the following well known protocol strings (TCP, UDP, ICMP, ESP, AH, IPIP, SCTP) or a string representation of the integer value.",
        ).optional(),
      })).describe("Optional. Optional list of allowed IP rules.").optional(),
    }).describe("Allowed IP rule.").optional(),
    denied: z.object({
      ipRules: z.array(z.object({
        portRanges: z.array(z.unknown()).describe(
          "Optional. An optional list of ports to which this rule applies. This field is only applicable for the UDP or (S)TCP protocols. Each entry must be either an integer or a range including a min and max port number.",
        ).optional(),
        protocol: z.string().describe(
          "The IP protocol this rule applies to. This value can either be one of the following well known protocol strings (TCP, UDP, ICMP, ESP, AH, IPIP, SCTP) or a string representation of the integer value.",
        ).optional(),
      })).describe("Optional. Optional list of denied IP rules.").optional(),
    }).describe("Denied IP rule.").optional(),
    destinationIpRanges: z.array(z.string()).describe(
      "If destination IP ranges are specified, the firewall rule applies only to traffic that has a destination IP address in these ranges. These ranges must be expressed in CIDR format. Only supports IPv4.",
    ).optional(),
    direction: z.enum(["DIRECTION_UNSPECIFIED", "INGRESS", "EGRESS"]).describe(
      "The direction that the rule is applicable to, one of ingress or egress.",
    ).optional(),
    exposedServices: z.array(z.string()).describe(
      "Name of the network protocol service, such as FTP, that is exposed by the open port. Follows the naming convention available at: https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml.",
    ).optional(),
    sourceIpRanges: z.array(z.string()).describe(
      "If source IP ranges are specified, the firewall rule applies only to traffic that has a source IP address in these ranges. These ranges must be expressed in CIDR format. Only supports IPv4.",
    ).optional(),
  }).describe("IP rules associated with the finding.").optional(),
  job: z.object({
    errorCode: z.number().int().describe(
      "Optional. If the job did not complete successfully, this field describes why.",
    ).optional(),
    location: z.string().describe(
      "Optional. Gives the location where the job ran, such as `US` or `europe-west1`",
    ).optional(),
    name: z.string().describe(
      "The fully-qualified name for a job. e.g. `projects//jobs/`",
    ).optional(),
    state: z.enum([
      "JOB_STATE_UNSPECIFIED",
      "PENDING",
      "RUNNING",
      "SUCCEEDED",
      "FAILED",
    ]).describe(
      "Output only. State of the job, such as `RUNNING` or `PENDING`.",
    ).optional(),
  }).describe("Describes a job").optional(),
  kernelRootkit: z.object({
    name: z.string().describe("Rootkit name, when available.").optional(),
    unexpectedCodeModification: z.boolean().describe(
      "True if unexpected modifications of kernel code memory are present.",
    ).optional(),
    unexpectedFtraceHandler: z.boolean().describe(
      "True if `ftrace` points are present with callbacks pointing to regions that are not in the expected kernel or module code range.",
    ).optional(),
    unexpectedInterruptHandler: z.boolean().describe(
      "True if interrupt handlers that are are not in the expected kernel or module code regions are present.",
    ).optional(),
    unexpectedKernelCodePages: z.boolean().describe(
      "True if kernel code pages that are not in the expected kernel or module code regions are present.",
    ).optional(),
    unexpectedKprobeHandler: z.boolean().describe(
      "True if `kprobe` points are present with callbacks pointing to regions that are not in the expected kernel or module code range.",
    ).optional(),
    unexpectedProcessesInRunqueue: z.boolean().describe(
      "True if unexpected processes in the scheduler run queue are present. Such processes are in the run queue, but not in the process task list.",
    ).optional(),
    unexpectedReadOnlyDataModification: z.boolean().describe(
      "True if unexpected modifications of kernel read-only data memory are present.",
    ).optional(),
    unexpectedSystemCallHandler: z.boolean().describe(
      "True if system call handlers that are are not in the expected kernel or module code regions are present.",
    ).optional(),
  }).describe("Kernel mode rootkit signatures.").optional(),
  kubernetes: z.object({
    accessReviews: z.array(z.object({
      group: z.string().describe(
        'The API group of the resource. "*" means all.',
      ).optional(),
      name: z.string().describe(
        "The name of the resource being requested. Empty means all.",
      ).optional(),
      ns: z.string().describe(
        'Namespace of the action being requested. Currently, there is no distinction between no namespace and all namespaces. Both are represented by "" (empty).',
      ).optional(),
      resource: z.string().describe(
        'The optional resource type requested. "*" means all.',
      ).optional(),
      subresource: z.string().describe("The optional subresource type.")
        .optional(),
      verb: z.string().describe(
        'A Kubernetes resource API verb, like get, list, watch, create, update, delete, proxy. "*" means all.',
      ).optional(),
      version: z.string().describe(
        'The API version of the resource. "*" means all.',
      ).optional(),
    })).describe(
      "Provides information on any Kubernetes access reviews (privilege checks) relevant to the finding.",
    ).optional(),
    bindings: z.array(z.object({
      name: z.string().describe("Name for the binding.").optional(),
      ns: z.string().describe("Namespace for the binding.").optional(),
      role: z.object({
        kind: z.enum(["KIND_UNSPECIFIED", "ROLE", "CLUSTER_ROLE"]).describe(
          "Role type.",
        ).optional(),
        name: z.string().describe("Role name.").optional(),
        ns: z.string().describe("Role namespace.").optional(),
      }).describe("Kubernetes Role or ClusterRole.").optional(),
      subjects: z.array(z.object({
        kind: z.unknown().describe("Authentication type for the subject.")
          .optional(),
        name: z.unknown().describe("Name for the subject.").optional(),
        ns: z.unknown().describe("Namespace for the subject.").optional(),
      })).describe(
        "Represents one or more subjects that are bound to the role. Not always available for PATCH requests.",
      ).optional(),
    })).describe(
      "Provides Kubernetes role binding information for findings that involve [RoleBindings or ClusterRoleBindings](https://cloud.google.com/kubernetes-engine/docs/how-to/role-based-access-control).",
    ).optional(),
    nodePools: z.array(z.object({
      name: z.string().describe("Kubernetes node pool name.").optional(),
      nodes: z.array(z.object({
        name: z.unknown().describe(
          "[Full resource name](https://google.aip.dev/122#full-resource-names) of the Compute Engine VM running the cluster node.",
        ).optional(),
      })).describe("Nodes associated with the finding.").optional(),
    })).describe(
      "GKE [node pools](https://cloud.google.com/kubernetes-engine/docs/concepts/node-pools) associated with the finding. This field contains node pool information for each node, when it is available.",
    ).optional(),
    nodes: z.array(z.object({
      name: z.string().describe(
        "[Full resource name](https://google.aip.dev/122#full-resource-names) of the Compute Engine VM running the cluster node.",
      ).optional(),
    })).describe(
      "Provides Kubernetes [node](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture#nodes) information.",
    ).optional(),
    objects: z.array(z.object({
      containers: z.array(z.object({
        createTime: z.unknown().describe(
          "The time that the container was created.",
        ).optional(),
        imageId: z.unknown().describe(
          "Optional container image ID, if provided by the container runtime. Uniquely identifies the container image launched using a container image digest.",
        ).optional(),
        labels: z.unknown().describe(
          "Container labels, as provided by the container runtime.",
        ).optional(),
        name: z.unknown().describe("Name of the container.").optional(),
        uri: z.unknown().describe(
          "Container image URI provided when configuring a pod or container. This string can identify a container image version using mutable tags.",
        ).optional(),
      })).describe("Pod containers associated with this finding, if any.")
        .optional(),
      group: z.string().describe(
        'Kubernetes object group, such as "policy.k8s.io/v1".',
      ).optional(),
      kind: z.string().describe('Kubernetes object kind, such as "Namespace".')
        .optional(),
      name: z.string().describe(
        "Kubernetes object name. For details see https://kubernetes.io/docs/concepts/overview/working-with-objects/names/.",
      ).optional(),
      ns: z.string().describe(
        'Kubernetes object namespace. Must be a valid DNS label. Named "ns" to avoid collision with C++ namespace keyword. For details see https://kubernetes.io/docs/tasks/administer-cluster/namespaces/.',
      ).optional(),
    })).describe("Kubernetes objects related to the finding.").optional(),
    pods: z.array(z.object({
      containers: z.array(z.object({
        createTime: z.unknown().describe(
          "The time that the container was created.",
        ).optional(),
        imageId: z.unknown().describe(
          "Optional container image ID, if provided by the container runtime. Uniquely identifies the container image launched using a container image digest.",
        ).optional(),
        labels: z.unknown().describe(
          "Container labels, as provided by the container runtime.",
        ).optional(),
        name: z.unknown().describe("Name of the container.").optional(),
        uri: z.unknown().describe(
          "Container image URI provided when configuring a pod or container. This string can identify a container image version using mutable tags.",
        ).optional(),
      })).describe("Pod containers associated with this finding, if any.")
        .optional(),
      labels: z.array(z.object({
        name: z.unknown().describe("Name of the label.").optional(),
        value: z.unknown().describe(
          "Value that corresponds to the label's name.",
        ).optional(),
      })).describe(
        "Pod labels. For Kubernetes containers, these are applied to the container.",
      ).optional(),
      name: z.string().describe("Kubernetes Pod name.").optional(),
      ns: z.string().describe("Kubernetes Pod namespace.").optional(),
    })).describe(
      "Kubernetes [Pods](https://cloud.google.com/kubernetes-engine/docs/concepts/pod) associated with the finding. This field contains Pod records for each container that is owned by a Pod.",
    ).optional(),
    roles: z.array(z.object({
      kind: z.enum(["KIND_UNSPECIFIED", "ROLE", "CLUSTER_ROLE"]).describe(
        "Role type.",
      ).optional(),
      name: z.string().describe("Role name.").optional(),
      ns: z.string().describe("Role namespace.").optional(),
    })).describe(
      "Provides Kubernetes role information for findings that involve [Roles or ClusterRoles](https://cloud.google.com/kubernetes-engine/docs/how-to/role-based-access-control).",
    ).optional(),
  }).describe("Kubernetes-related attributes.").optional(),
  loadBalancers: z.array(z.object({
    name: z.string().describe(
      "The name of the load balancer associated with the finding.",
    ).optional(),
  })).describe("The load balancers associated with the finding.").optional(),
  logEntries: z.array(z.object({
    cloudLoggingEntry: z.object({
      insertId: z.string().describe("A unique identifier for the log entry.")
        .optional(),
      logId: z.string().describe(
        "The type of the log (part of `log_name`. `log_name` is the resource name of the log to which this log entry belongs). For example: `cloudresourcemanager.googleapis.com/activity`. Note that this field is not URL-encoded, unlike the `LOG_ID` field in `LogEntry`.",
      ).optional(),
      resourceContainer: z.string().describe(
        "The organization, folder, or project of the monitored resource that produced this log entry.",
      ).optional(),
      timestamp: z.string().describe(
        "The time the event described by the log entry occurred.",
      ).optional(),
    }).describe(
      "Metadata taken from a [Cloud Logging LogEntry](https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry)",
    ).optional(),
  })).describe("Log entries that are relevant to the finding.").optional(),
  mitreAttack: z.object({
    additionalTactics: z.array(
      z.enum([
        "TACTIC_UNSPECIFIED",
        "RECONNAISSANCE",
        "RESOURCE_DEVELOPMENT",
        "INITIAL_ACCESS",
        "EXECUTION",
        "PERSISTENCE",
        "PRIVILEGE_ESCALATION",
        "DEFENSE_EVASION",
        "CREDENTIAL_ACCESS",
        "DISCOVERY",
        "LATERAL_MOVEMENT",
        "COLLECTION",
        "COMMAND_AND_CONTROL",
        "EXFILTRATION",
        "IMPACT",
      ]),
    ).describe(
      "Additional MITRE ATT&CK tactics related to this finding, if any.",
    ).optional(),
    additionalTechniques: z.array(
      z.enum([
        "TECHNIQUE_UNSPECIFIED",
        "DATA_OBFUSCATION",
        "DATA_OBFUSCATION_STEGANOGRAPHY",
        "OS_CREDENTIAL_DUMPING",
        "OS_CREDENTIAL_DUMPING_PROC_FILESYSTEM",
        "OS_CREDENTIAL_DUMPING_ETC_PASSWORD_AND_ETC_SHADOW",
        "DATA_FROM_LOCAL_SYSTEM",
        "AUTOMATED_EXFILTRATION",
        "OBFUSCATED_FILES_OR_INFO",
        "STEGANOGRAPHY",
        "COMPILE_AFTER_DELIVERY",
        "COMMAND_OBFUSCATION",
        "SCHEDULED_TRANSFER",
        "SYSTEM_OWNER_USER_DISCOVERY",
        "MASQUERADING",
        "MATCH_LEGITIMATE_NAME_OR_LOCATION",
        "BOOT_OR_LOGON_INITIALIZATION_SCRIPTS",
        "STARTUP_ITEMS",
        "NETWORK_SERVICE_DISCOVERY",
        "SCHEDULED_TASK_JOB",
        "SCHEDULED_TASK_JOB_CRON",
        "CONTAINER_ORCHESTRATION_JOB",
        "PROCESS_INJECTION",
        "INPUT_CAPTURE",
        "INPUT_CAPTURE_KEYLOGGING",
        "PROCESS_DISCOVERY",
        "COMMAND_AND_SCRIPTING_INTERPRETER",
        "UNIX_SHELL",
        "PYTHON",
        "EXPLOITATION_FOR_PRIVILEGE_ESCALATION",
        "PERMISSION_GROUPS_DISCOVERY",
        "CLOUD_GROUPS",
        "INDICATOR_REMOVAL",
        "INDICATOR_REMOVAL_CLEAR_LINUX_OR_MAC_SYSTEM_LOGS",
        "INDICATOR_REMOVAL_CLEAR_COMMAND_HISTORY",
        "INDICATOR_REMOVAL_FILE_DELETION",
        "INDICATOR_REMOVAL_TIMESTOMP",
        "INDICATOR_REMOVAL_CLEAR_MAILBOX_DATA",
        "APPLICATION_LAYER_PROTOCOL",
        "DNS",
        "SOFTWARE_DEPLOYMENT_TOOLS",
        "VALID_ACCOUNTS",
        "DEFAULT_ACCOUNTS",
        "LOCAL_ACCOUNTS",
        "CLOUD_ACCOUNTS",
        "FILE_AND_DIRECTORY_DISCOVERY",
        "ACCOUNT_DISCOVERY_LOCAL_ACCOUNT",
        "PROXY",
        "EXTERNAL_PROXY",
        "MULTI_HOP_PROXY",
        "ACCOUNT_MANIPULATION",
        "ADDITIONAL_CLOUD_CREDENTIALS",
        "ADDITIONAL_CLOUD_ROLES",
        "SSH_AUTHORIZED_KEYS",
        "ADDITIONAL_CONTAINER_CLUSTER_ROLES",
        "MULTI_STAGE_CHANNELS",
        "INGRESS_TOOL_TRANSFER",
        "NATIVE_API",
        "BRUTE_FORCE",
        "AUTOMATED_COLLECTION",
        "SHARED_MODULES",
        "DATA_ENCODING",
        "STANDARD_ENCODING",
        "ACCESS_TOKEN_MANIPULATION",
        "TOKEN_IMPERSONATION_OR_THEFT",
        "CREATE_ACCOUNT",
        "LOCAL_ACCOUNT",
        "DEOBFUSCATE_DECODE_FILES_OR_INFO",
        "EXPLOIT_PUBLIC_FACING_APPLICATION",
        "SUPPLY_CHAIN_COMPROMISE",
        "COMPROMISE_SOFTWARE_DEPENDENCIES_AND_DEVELOPMENT_TOOLS",
        "EXPLOITATION_FOR_CLIENT_EXECUTION",
        "USER_EXECUTION",
        "EXPLOITATION_FOR_CREDENTIAL_ACCESS",
        "LINUX_AND_MAC_FILE_AND_DIRECTORY_PERMISSIONS_MODIFICATION",
        "DOMAIN_POLICY_MODIFICATION",
        "DATA_DESTRUCTION",
        "DATA_ENCRYPTED_FOR_IMPACT",
        "SERVICE_STOP",
        "INHIBIT_SYSTEM_RECOVERY",
        "FIRMWARE_CORRUPTION",
        "RESOURCE_HIJACKING",
        "NETWORK_DENIAL_OF_SERVICE",
        "CLOUD_SERVICE_DISCOVERY",
        "STEAL_APPLICATION_ACCESS_TOKEN",
        "ACCOUNT_ACCESS_REMOVAL",
        "TRANSFER_DATA_TO_CLOUD_ACCOUNT",
        "STEAL_WEB_SESSION_COOKIE",
        "CREATE_OR_MODIFY_SYSTEM_PROCESS",
        "EVENT_TRIGGERED_EXECUTION",
        "BOOT_OR_LOGON_AUTOSTART_EXECUTION",
        "KERNEL_MODULES_AND_EXTENSIONS",
        "SHORTCUT_MODIFICATION",
        "ABUSE_ELEVATION_CONTROL_MECHANISM",
        "ABUSE_ELEVATION_CONTROL_MECHANISM_SETUID_AND_SETGID",
        "ABUSE_ELEVATION_CONTROL_MECHANISM_SUDO_AND_SUDO_CACHING",
        "UNSECURED_CREDENTIALS",
        "CREDENTIALS_IN_FILES",
        "BASH_HISTORY",
        "PRIVATE_KEYS",
        "SUBVERT_TRUST_CONTROL",
        "INSTALL_ROOT_CERTIFICATE",
        "COMPROMISE_HOST_SOFTWARE_BINARY",
        "CREDENTIALS_FROM_PASSWORD_STORES",
        "MODIFY_AUTHENTICATION_PROCESS",
        "PLUGGABLE_AUTHENTICATION_MODULES",
        "MULTI_FACTOR_AUTHENTICATION",
        "IMPAIR_DEFENSES",
        "DISABLE_OR_MODIFY_TOOLS",
        "INDICATOR_BLOCKING",
        "DISABLE_OR_MODIFY_LINUX_AUDIT_SYSTEM",
        "HIDE_ARTIFACTS",
        "HIDDEN_FILES_AND_DIRECTORIES",
        "HIDDEN_USERS",
        "EXFILTRATION_OVER_WEB_SERVICE",
        "EXFILTRATION_TO_CLOUD_STORAGE",
        "DYNAMIC_RESOLUTION",
        "LATERAL_TOOL_TRANSFER",
        "HIJACK_EXECUTION_FLOW",
        "HIJACK_EXECUTION_FLOW_DYNAMIC_LINKER_HIJACKING",
        "MODIFY_CLOUD_COMPUTE_INFRASTRUCTURE",
        "CREATE_SNAPSHOT",
        "CLOUD_INFRASTRUCTURE_DISCOVERY",
        "DEVELOP_CAPABILITIES",
        "DEVELOP_CAPABILITIES_MALWARE",
        "OBTAIN_CAPABILITIES",
        "OBTAIN_CAPABILITIES_MALWARE",
        "OBTAIN_CAPABILITIES_VULNERABILITIES",
        "ACTIVE_SCANNING",
        "SCANNING_IP_BLOCKS",
        "STAGE_CAPABILITIES",
        "UPLOAD_MALWARE",
        "CONTAINER_ADMINISTRATION_COMMAND",
        "DEPLOY_CONTAINER",
        "ESCAPE_TO_HOST",
        "CONTAINER_AND_RESOURCE_DISCOVERY",
        "REFLECTIVE_CODE_LOADING",
        "STEAL_OR_FORGE_AUTHENTICATION_CERTIFICATES",
        "FINANCIAL_THEFT",
      ]),
    ).describe(
      "Additional MITRE ATT&CK techniques related to this finding, if any, along with any of their respective parent techniques.",
    ).optional(),
    primaryTactic: z.enum([
      "TACTIC_UNSPECIFIED",
      "RECONNAISSANCE",
      "RESOURCE_DEVELOPMENT",
      "INITIAL_ACCESS",
      "EXECUTION",
      "PERSISTENCE",
      "PRIVILEGE_ESCALATION",
      "DEFENSE_EVASION",
      "CREDENTIAL_ACCESS",
      "DISCOVERY",
      "LATERAL_MOVEMENT",
      "COLLECTION",
      "COMMAND_AND_CONTROL",
      "EXFILTRATION",
      "IMPACT",
    ]).describe(
      "The MITRE ATT&CK tactic most closely represented by this finding, if any.",
    ).optional(),
    primaryTechniques: z.array(
      z.enum([
        "TECHNIQUE_UNSPECIFIED",
        "DATA_OBFUSCATION",
        "DATA_OBFUSCATION_STEGANOGRAPHY",
        "OS_CREDENTIAL_DUMPING",
        "OS_CREDENTIAL_DUMPING_PROC_FILESYSTEM",
        "OS_CREDENTIAL_DUMPING_ETC_PASSWORD_AND_ETC_SHADOW",
        "DATA_FROM_LOCAL_SYSTEM",
        "AUTOMATED_EXFILTRATION",
        "OBFUSCATED_FILES_OR_INFO",
        "STEGANOGRAPHY",
        "COMPILE_AFTER_DELIVERY",
        "COMMAND_OBFUSCATION",
        "SCHEDULED_TRANSFER",
        "SYSTEM_OWNER_USER_DISCOVERY",
        "MASQUERADING",
        "MATCH_LEGITIMATE_NAME_OR_LOCATION",
        "BOOT_OR_LOGON_INITIALIZATION_SCRIPTS",
        "STARTUP_ITEMS",
        "NETWORK_SERVICE_DISCOVERY",
        "SCHEDULED_TASK_JOB",
        "SCHEDULED_TASK_JOB_CRON",
        "CONTAINER_ORCHESTRATION_JOB",
        "PROCESS_INJECTION",
        "INPUT_CAPTURE",
        "INPUT_CAPTURE_KEYLOGGING",
        "PROCESS_DISCOVERY",
        "COMMAND_AND_SCRIPTING_INTERPRETER",
        "UNIX_SHELL",
        "PYTHON",
        "EXPLOITATION_FOR_PRIVILEGE_ESCALATION",
        "PERMISSION_GROUPS_DISCOVERY",
        "CLOUD_GROUPS",
        "INDICATOR_REMOVAL",
        "INDICATOR_REMOVAL_CLEAR_LINUX_OR_MAC_SYSTEM_LOGS",
        "INDICATOR_REMOVAL_CLEAR_COMMAND_HISTORY",
        "INDICATOR_REMOVAL_FILE_DELETION",
        "INDICATOR_REMOVAL_TIMESTOMP",
        "INDICATOR_REMOVAL_CLEAR_MAILBOX_DATA",
        "APPLICATION_LAYER_PROTOCOL",
        "DNS",
        "SOFTWARE_DEPLOYMENT_TOOLS",
        "VALID_ACCOUNTS",
        "DEFAULT_ACCOUNTS",
        "LOCAL_ACCOUNTS",
        "CLOUD_ACCOUNTS",
        "FILE_AND_DIRECTORY_DISCOVERY",
        "ACCOUNT_DISCOVERY_LOCAL_ACCOUNT",
        "PROXY",
        "EXTERNAL_PROXY",
        "MULTI_HOP_PROXY",
        "ACCOUNT_MANIPULATION",
        "ADDITIONAL_CLOUD_CREDENTIALS",
        "ADDITIONAL_CLOUD_ROLES",
        "SSH_AUTHORIZED_KEYS",
        "ADDITIONAL_CONTAINER_CLUSTER_ROLES",
        "MULTI_STAGE_CHANNELS",
        "INGRESS_TOOL_TRANSFER",
        "NATIVE_API",
        "BRUTE_FORCE",
        "AUTOMATED_COLLECTION",
        "SHARED_MODULES",
        "DATA_ENCODING",
        "STANDARD_ENCODING",
        "ACCESS_TOKEN_MANIPULATION",
        "TOKEN_IMPERSONATION_OR_THEFT",
        "CREATE_ACCOUNT",
        "LOCAL_ACCOUNT",
        "DEOBFUSCATE_DECODE_FILES_OR_INFO",
        "EXPLOIT_PUBLIC_FACING_APPLICATION",
        "SUPPLY_CHAIN_COMPROMISE",
        "COMPROMISE_SOFTWARE_DEPENDENCIES_AND_DEVELOPMENT_TOOLS",
        "EXPLOITATION_FOR_CLIENT_EXECUTION",
        "USER_EXECUTION",
        "EXPLOITATION_FOR_CREDENTIAL_ACCESS",
        "LINUX_AND_MAC_FILE_AND_DIRECTORY_PERMISSIONS_MODIFICATION",
        "DOMAIN_POLICY_MODIFICATION",
        "DATA_DESTRUCTION",
        "DATA_ENCRYPTED_FOR_IMPACT",
        "SERVICE_STOP",
        "INHIBIT_SYSTEM_RECOVERY",
        "FIRMWARE_CORRUPTION",
        "RESOURCE_HIJACKING",
        "NETWORK_DENIAL_OF_SERVICE",
        "CLOUD_SERVICE_DISCOVERY",
        "STEAL_APPLICATION_ACCESS_TOKEN",
        "ACCOUNT_ACCESS_REMOVAL",
        "TRANSFER_DATA_TO_CLOUD_ACCOUNT",
        "STEAL_WEB_SESSION_COOKIE",
        "CREATE_OR_MODIFY_SYSTEM_PROCESS",
        "EVENT_TRIGGERED_EXECUTION",
        "BOOT_OR_LOGON_AUTOSTART_EXECUTION",
        "KERNEL_MODULES_AND_EXTENSIONS",
        "SHORTCUT_MODIFICATION",
        "ABUSE_ELEVATION_CONTROL_MECHANISM",
        "ABUSE_ELEVATION_CONTROL_MECHANISM_SETUID_AND_SETGID",
        "ABUSE_ELEVATION_CONTROL_MECHANISM_SUDO_AND_SUDO_CACHING",
        "UNSECURED_CREDENTIALS",
        "CREDENTIALS_IN_FILES",
        "BASH_HISTORY",
        "PRIVATE_KEYS",
        "SUBVERT_TRUST_CONTROL",
        "INSTALL_ROOT_CERTIFICATE",
        "COMPROMISE_HOST_SOFTWARE_BINARY",
        "CREDENTIALS_FROM_PASSWORD_STORES",
        "MODIFY_AUTHENTICATION_PROCESS",
        "PLUGGABLE_AUTHENTICATION_MODULES",
        "MULTI_FACTOR_AUTHENTICATION",
        "IMPAIR_DEFENSES",
        "DISABLE_OR_MODIFY_TOOLS",
        "INDICATOR_BLOCKING",
        "DISABLE_OR_MODIFY_LINUX_AUDIT_SYSTEM",
        "HIDE_ARTIFACTS",
        "HIDDEN_FILES_AND_DIRECTORIES",
        "HIDDEN_USERS",
        "EXFILTRATION_OVER_WEB_SERVICE",
        "EXFILTRATION_TO_CLOUD_STORAGE",
        "DYNAMIC_RESOLUTION",
        "LATERAL_TOOL_TRANSFER",
        "HIJACK_EXECUTION_FLOW",
        "HIJACK_EXECUTION_FLOW_DYNAMIC_LINKER_HIJACKING",
        "MODIFY_CLOUD_COMPUTE_INFRASTRUCTURE",
        "CREATE_SNAPSHOT",
        "CLOUD_INFRASTRUCTURE_DISCOVERY",
        "DEVELOP_CAPABILITIES",
        "DEVELOP_CAPABILITIES_MALWARE",
        "OBTAIN_CAPABILITIES",
        "OBTAIN_CAPABILITIES_MALWARE",
        "OBTAIN_CAPABILITIES_VULNERABILITIES",
        "ACTIVE_SCANNING",
        "SCANNING_IP_BLOCKS",
        "STAGE_CAPABILITIES",
        "UPLOAD_MALWARE",
        "CONTAINER_ADMINISTRATION_COMMAND",
        "DEPLOY_CONTAINER",
        "ESCAPE_TO_HOST",
        "CONTAINER_AND_RESOURCE_DISCOVERY",
        "REFLECTIVE_CODE_LOADING",
        "STEAL_OR_FORGE_AUTHENTICATION_CERTIFICATES",
        "FINANCIAL_THEFT",
      ]),
    ).describe(
      "The MITRE ATT&CK technique most closely represented by this finding, if any. primary_techniques is a repeated field because there are multiple levels of MITRE ATT&CK techniques. If the technique most closely represented by this finding is a sub-technique (e.g. `SCANNING_IP_BLOCKS`), both the sub-technique and its parent technique(s) will be listed (e.g. `SCANNING_IP_BLOCKS`, `ACTIVE_SCANNING`).",
    ).optional(),
    version: z.string().describe(
      'The MITRE ATT&CK version referenced by the above fields. E.g. "8".',
    ).optional(),
  }).describe(
    "MITRE ATT&CK tactics and techniques related to this finding. See: https://attack.mitre.org",
  ).optional(),
  moduleName: z.string().describe(
    "Unique identifier of the module which generated the finding. Example: folders/598186756061/securityHealthAnalyticsSettings/customModules/56799441161885",
  ).optional(),
  mute: z.enum(["MUTE_UNSPECIFIED", "MUTED", "UNMUTED", "UNDEFINED"]).describe(
    "Indicates the mute state of a finding (either muted, unmuted or undefined). Unlike other attributes of a finding, a finding provider shouldn't set the value of mute.",
  ).optional(),
  muteInfo: z.object({
    dynamicMuteRecords: z.array(z.object({
      matchTime: z.string().describe(
        "When the dynamic mute rule first matched the finding.",
      ).optional(),
      muteConfig: z.string().describe(
        "The relative resource name of the mute rule, represented by a mute config, that created this record, for example `organizations/123/muteConfigs/mymuteconfig` or `organizations/123/locations/global/muteConfigs/mymuteconfig`.",
      ).optional(),
    })).describe(
      "The list of dynamic mute rules that currently match the finding.",
    ).optional(),
    staticMute: z.object({
      applyTime: z.string().describe("When the static mute was applied.")
        .optional(),
      state: z.enum(["MUTE_UNSPECIFIED", "MUTED", "UNMUTED", "UNDEFINED"])
        .describe(
          "The static mute state. If the value is `MUTED` or `UNMUTED`, then the finding's overall mute state will have the same value.",
        ).optional(),
    }).describe(
      "Information about the static mute state. A static mute state overrides any dynamic mute rules that apply to this finding. The static mute state can be set by a static mute rule or by muting the finding directly.",
    ).optional(),
  }).describe(
    "Mute information about the finding, including whether the finding has a static mute or any matching dynamic mute rules.",
  ).optional(),
  muteInitiator: z.string().describe(
    "Records additional information about the mute operation, for example, the [mute configuration](/security-command-center/docs/how-to-mute-findings) that muted the finding and the user who muted the finding.",
  ).optional(),
  muteUpdateTime: z.string().describe(
    "Output only. The most recent time this finding was muted or unmuted.",
  ).optional(),
  name: z.string().describe(
    'The [relative resource name](https://cloud.google.com/apis/design/resource_names#relative_resource_name) of the finding. Example: "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}", "folders/{folder_id}/sources/{source_id}/findings/{finding_id}", "projects/{project_id}/sources/{source_id}/findings/{finding_id}".',
  ).optional(),
  networks: z.array(z.object({
    name: z.string().describe(
      "The name of the VPC network resource, for example, `//compute.googleapis.com/projects/my-project/global/networks/my-network`.",
    ).optional(),
  })).describe("Represents the VPC networks that the resource is attached to.")
    .optional(),
  nextSteps: z.string().describe("Steps to address the finding.").optional(),
  notebook: z.object({
    lastAuthor: z.string().describe(
      "The user ID of the latest author to modify the notebook.",
    ).optional(),
    name: z.string().describe("The name of the notebook.").optional(),
    notebookUpdateTime: z.string().describe(
      "The most recent time the notebook was updated.",
    ).optional(),
    service: z.string().describe(
      'The source notebook service, for example, "Colab Enterprise".',
    ).optional(),
  }).describe(
    "Represents a Jupyter notebook IPYNB file, such as a [Colab Enterprise notebook](https://cloud.google.com/colab/docs/introduction) file, that is associated with a finding.",
  ).optional(),
  orgPolicies: z.array(z.object({
    name: z.string().describe(
      'The resource name of the org policy. Example: "organizations/{organization_id}/policies/{constraint_name}"',
    ).optional(),
  })).describe(
    "Contains information about the org policies associated with the finding.",
  ).optional(),
  parent: z.string().describe(
    'The relative resource name of the source the finding belongs to. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name This field is immutable after creation time. For example: "organizations/{organization_id}/sources/{source_id}"',
  ).optional(),
  parentDisplayName: z.string().describe(
    'Output only. The human readable display name of the finding source such as "Event Threat Detection" or "Security Health Analytics".',
  ).optional(),
  policyViolationSummary: z.object({
    conformantResourcesCount: z.string().describe(
      "Total number of child resources that conform to the policy.",
    ).optional(),
    evaluationErrorsCount: z.string().describe(
      'Number of child resources for which errors during evaluation occurred. The evaluation result for these child resources is effectively "unknown".',
    ).optional(),
    outOfScopeResourcesCount: z.string().describe(
      "Total count of child resources which were not in scope for evaluation.",
    ).optional(),
    policyViolationsCount: z.string().describe(
      "Count of child resources in violation of the policy.",
    ).optional(),
  }).describe(
    "Metadata summarizing policy violations of child resources of the affected resource. `finding_category` and `resource` determine the exact semantics of the counts. For example, when category=DATA_SECURITY_POSTURE_OBJECT_PUBLIC_ACCESS_VIOLATION and resource='storage.googleapis.com/buckets/my-bucket-name' then this counts the number of Cloud Storage objects in my-bucket-name which violate a Public Access control.",
  ).optional(),
  processes: z.array(z.object({
    args: z.array(z.string()).describe(
      "Process arguments as JSON encoded strings.",
    ).optional(),
    argumentsTruncated: z.boolean().describe("True if `args` is incomplete.")
      .optional(),
    binary: z.object({
      contents: z.string().describe(
        "Prefix of the file contents as a JSON-encoded string.",
      ).optional(),
      diskPath: z.object({
        partitionUuid: z.string().describe(
          "UUID of the partition (format https://wiki.archlinux.org/title/persistent_block_device_naming#by-uuid)",
        ).optional(),
        relativePath: z.string().describe(
          "Relative path of the file in the partition as a JSON encoded string. Example: /home/user1/executable_file.sh",
        ).optional(),
      }).describe(
        "Path of the file in terms of underlying disk/partition identifiers.",
      ).optional(),
      fileLoadState: z.enum([
        "FILE_LOAD_STATE_UNSPECIFIED",
        "LOADED_BY_PROCESS",
        "NOT_LOADED_BY_PROCESS",
      ]).describe("The load state of the file.").optional(),
      hashedSize: z.string().describe(
        "The length in bytes of the file prefix that was hashed. If hashed_size == size, any hashes reported represent the entire file.",
      ).optional(),
      operations: z.array(z.object({
        type: z.unknown().describe("The type of the operation").optional(),
      })).describe("Operation(s) performed on a file.").optional(),
      partiallyHashed: z.boolean().describe(
        "True when the hash covers only a prefix of the file.",
      ).optional(),
      path: z.string().describe(
        "Absolute path of the file as a JSON encoded string.",
      ).optional(),
      sha256: z.string().describe(
        "SHA256 hash of the first hashed_size bytes of the file encoded as a hex string. If hashed_size == size, sha256 represents the SHA256 hash of the entire file.",
      ).optional(),
      size: z.string().describe("Size of the file in bytes.").optional(),
    }).describe(
      "File information about the related binary/library used by an executable, or the script used by a script interpreter",
    ).optional(),
    envVariables: z.array(z.object({
      name: z.string().describe(
        "Environment variable name as a JSON encoded string.",
      ).optional(),
      val: z.string().describe(
        "Environment variable value as a JSON encoded string.",
      ).optional(),
    })).describe("Process environment variables.").optional(),
    envVariablesTruncated: z.boolean().describe(
      "True if `env_variables` is incomplete.",
    ).optional(),
    libraries: z.array(z.object({
      contents: z.string().describe(
        "Prefix of the file contents as a JSON-encoded string.",
      ).optional(),
      diskPath: z.object({
        partitionUuid: z.unknown().describe(
          "UUID of the partition (format https://wiki.archlinux.org/title/persistent_block_device_naming#by-uuid)",
        ).optional(),
        relativePath: z.unknown().describe(
          "Relative path of the file in the partition as a JSON encoded string. Example: /home/user1/executable_file.sh",
        ).optional(),
      }).describe(
        "Path of the file in terms of underlying disk/partition identifiers.",
      ).optional(),
      fileLoadState: z.enum([
        "FILE_LOAD_STATE_UNSPECIFIED",
        "LOADED_BY_PROCESS",
        "NOT_LOADED_BY_PROCESS",
      ]).describe("The load state of the file.").optional(),
      hashedSize: z.string().describe(
        "The length in bytes of the file prefix that was hashed. If hashed_size == size, any hashes reported represent the entire file.",
      ).optional(),
      operations: z.array(z.unknown()).describe(
        "Operation(s) performed on a file.",
      ).optional(),
      partiallyHashed: z.boolean().describe(
        "True when the hash covers only a prefix of the file.",
      ).optional(),
      path: z.string().describe(
        "Absolute path of the file as a JSON encoded string.",
      ).optional(),
      sha256: z.string().describe(
        "SHA256 hash of the first hashed_size bytes of the file encoded as a hex string. If hashed_size == size, sha256 represents the SHA256 hash of the entire file.",
      ).optional(),
      size: z.string().describe("Size of the file in bytes.").optional(),
    })).describe("File information for libraries loaded by the process.")
      .optional(),
    name: z.string().describe(
      "The process name, as displayed in utilities like `top` and `ps`. This name can be accessed through `/proc/[pid]/comm` and changed with `prctl(PR_SET_NAME)`.",
    ).optional(),
    parentPid: z.string().describe("The parent process ID.").optional(),
    pid: z.string().describe("The process ID.").optional(),
    script: z.object({
      contents: z.string().describe(
        "Prefix of the file contents as a JSON-encoded string.",
      ).optional(),
      diskPath: z.object({
        partitionUuid: z.string().describe(
          "UUID of the partition (format https://wiki.archlinux.org/title/persistent_block_device_naming#by-uuid)",
        ).optional(),
        relativePath: z.string().describe(
          "Relative path of the file in the partition as a JSON encoded string. Example: /home/user1/executable_file.sh",
        ).optional(),
      }).describe(
        "Path of the file in terms of underlying disk/partition identifiers.",
      ).optional(),
      fileLoadState: z.enum([
        "FILE_LOAD_STATE_UNSPECIFIED",
        "LOADED_BY_PROCESS",
        "NOT_LOADED_BY_PROCESS",
      ]).describe("The load state of the file.").optional(),
      hashedSize: z.string().describe(
        "The length in bytes of the file prefix that was hashed. If hashed_size == size, any hashes reported represent the entire file.",
      ).optional(),
      operations: z.array(z.object({
        type: z.unknown().describe("The type of the operation").optional(),
      })).describe("Operation(s) performed on a file.").optional(),
      partiallyHashed: z.boolean().describe(
        "True when the hash covers only a prefix of the file.",
      ).optional(),
      path: z.string().describe(
        "Absolute path of the file as a JSON encoded string.",
      ).optional(),
      sha256: z.string().describe(
        "SHA256 hash of the first hashed_size bytes of the file encoded as a hex string. If hashed_size == size, sha256 represents the SHA256 hash of the entire file.",
      ).optional(),
      size: z.string().describe("Size of the file in bytes.").optional(),
    }).describe(
      "File information about the related binary/library used by an executable, or the script used by a script interpreter",
    ).optional(),
    userId: z.string().describe(
      "The ID of the user that executed the process. E.g. If this is the root user this will always be 0.",
    ).optional(),
  })).describe(
    "Represents operating system processes associated with the Finding.",
  ).optional(),
  resourceName: z.string().describe(
    "For findings on Google Cloud resources, the full resource name of the Google Cloud resource this finding is for. See: https://cloud.google.com/apis/design/resource_names#full_resource_name When the finding is for a non-Google Cloud resource, the resourceName can be a customer or partner defined string. This field is immutable after creation time.",
  ).optional(),
  secret: z.object({
    environmentVariable: z.object({
      key: z.string().describe(
        "Environment variable name as a JSON encoded string. Note that value is not included since the value contains the secret data, which is sensitive core content.",
      ).optional(),
    }).describe("Environment variable containing the secret.").optional(),
    filePath: z.object({
      path: z.string().describe("Path to the file.").optional(),
    }).describe("File path containing the secret.").optional(),
    status: z.object({
      lastUpdatedTime: z.string().describe("Time that the secret was found.")
        .optional(),
      validity: z.enum([
        "SECRET_VALIDITY_UNSPECIFIED",
        "SECRET_VALIDITY_UNSUPPORTED",
        "SECRET_VALIDITY_FAILED",
        "SECRET_VALIDITY_INVALID",
        "SECRET_VALIDITY_VALID",
      ]).describe("The validity of the secret.").optional(),
    }).describe("The status of the secret.").optional(),
    type: z.string().describe("The type of secret, for example, GCP_API_KEY.")
      .optional(),
  }).describe(
    "Details about a secret or credential associated with the finding.",
  ).optional(),
  securityMarks: z.object({
    canonicalName: z.string().describe(
      'The canonical name of the marks. Examples: "organizations/{organization_id}/assets/{asset_id}/securityMarks" "folders/{folder_id}/assets/{asset_id}/securityMarks" "projects/{project_number}/assets/{asset_id}/securityMarks" "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}/securityMarks" "folders/{folder_id}/sources/{source_id}/findings/{finding_id}/securityMarks" "projects/{project_number}/sources/{source_id}/findings/{finding_id}/securityMarks"',
    ).optional(),
    marks: z.record(z.string(), z.string()).describe(
      "Mutable user specified security marks belonging to the parent resource. Constraints are as follows: * Keys and values are treated as case insensitive * Keys must be between 1 - 256 characters (inclusive) * Keys must be letters, numbers, underscores, or dashes * Values have leading and trailing whitespace trimmed, remaining characters must be between 1 - 4096 characters (inclusive)",
    ).optional(),
    name: z.string().describe(
      'The relative resource name of the SecurityMarks. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Examples: "organizations/{organization_id}/assets/{asset_id}/securityMarks" "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}/securityMarks".',
    ).optional(),
  }).describe(
    "User specified security marks that are attached to the parent Security Command Center resource. Security marks are scoped within a Security Command Center organization -- they can be modified and viewed by all users who have proper permissions on the organization.",
  ).optional(),
  securityPosture: z.object({
    changedPolicy: z.string().describe(
      "The name of the updated policy, for example, `projects/{project_id}/policies/{constraint_name}`.",
    ).optional(),
    name: z.string().describe(
      "Name of the posture, for example, `CIS-Posture`.",
    ).optional(),
    policy: z.string().describe(
      "The ID of the updated policy, for example, `compute-policy-1`.",
    ).optional(),
    policyDriftDetails: z.array(z.object({
      detectedValue: z.string().describe(
        'The detected value that violates the deployed posture, for example, `false` or `allowed_values={"projects/22831892"}`.',
      ).optional(),
      expectedValue: z.string().describe(
        'The value of this field that was configured in a posture, for example, `true` or `allowed_values={"projects/29831892"}`.',
      ).optional(),
      field: z.string().describe(
        "The name of the updated field, for example constraint.implementation.policy_rules[0].enforce",
      ).optional(),
    })).describe(
      "The details about a change in an updated policy that violates the deployed posture.",
    ).optional(),
    policySet: z.string().describe(
      "The name of the updated policyset, for example, `cis-policyset`.",
    ).optional(),
    postureDeployment: z.string().describe(
      "The name of the posture deployment, for example, `organizations/{org_id}/posturedeployments/{posture_deployment_id}`.",
    ).optional(),
    postureDeploymentResource: z.string().describe(
      "The project, folder, or organization on which the posture is deployed, for example, `projects/{project_number}`.",
    ).optional(),
    revisionId: z.string().describe(
      "The version of the posture, for example, `c7cfa2a8`.",
    ).optional(),
  }).describe(
    "Represents a posture that is deployed on Google Cloud by the Security Command Center Posture Management service. A posture contains one or more policy sets. A policy set is a group of policies that enforce a set of security rules on Google Cloud.",
  ).optional(),
  severity: z.enum([
    "SEVERITY_UNSPECIFIED",
    "CRITICAL",
    "HIGH",
    "MEDIUM",
    "LOW",
  ]).describe(
    "The severity of the finding. This field is managed by the source that writes the finding.",
  ).optional(),
  sourceProperties: z.record(z.string(), z.string()).describe(
    "Source specific properties. These properties are managed by the source that writes the finding. The key names in the source_properties map must be between 1 and 255 characters, and must start with a letter and contain alphanumeric characters or underscores only.",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "INACTIVE"]).describe(
    "The state of the finding.",
  ).optional(),
  toxicCombination: z.object({
    attackExposureScore: z.number().describe(
      "The [Attack exposure score](https://cloud.google.com/security-command-center/docs/attack-exposure-learn#attack_exposure_scores) of this toxic combination. The score is a measure of how much this toxic combination exposes one or more high-value resources to potential attack.",
    ).optional(),
    relatedFindings: z.array(z.string()).describe(
      "List of resource names of findings associated with this toxic combination. For example, `organizations/123/sources/456/findings/789`.",
    ).optional(),
  }).describe(
    "Contains details about a group of security issues that, when the issues occur together, represent a greater risk than when the issues occur independently. A group of such issues is referred to as a toxic combination.",
  ).optional(),
  vertexAi: z.object({
    datasets: z.array(z.object({
      displayName: z.string().describe(
        "The user defined display name of dataset, e.g. plants-dataset",
      ).optional(),
      name: z.string().describe(
        "Resource name of the dataset, e.g. projects/{project}/locations/{location}/datasets/2094040236064505856",
      ).optional(),
      source: z.string().describe(
        "Data source, such as BigQuery source URI, e.g. bq://scc-nexus-test.AIPPtest.gsod",
      ).optional(),
    })).describe("Datasets associated with the finding.").optional(),
    pipelines: z.array(z.object({
      displayName: z.string().describe(
        "The user defined display name of pipeline, e.g. plants-classification",
      ).optional(),
      name: z.string().describe(
        "Resource name of the pipeline, e.g. projects/{project}/locations/{location}/trainingPipelines/5253428229225578496",
      ).optional(),
    })).describe("Pipelines associated with the finding.").optional(),
  }).describe("Vertex AI-related information associated with the finding.")
    .optional(),
  vulnerability: z.object({
    cve: z.object({
      cvssv3: z.object({
        attackComplexity: z.enum([
          "ATTACK_COMPLEXITY_UNSPECIFIED",
          "ATTACK_COMPLEXITY_LOW",
          "ATTACK_COMPLEXITY_HIGH",
        ]).describe(
          "This metric describes the conditions beyond the attacker's control that must exist in order to exploit the vulnerability.",
        ).optional(),
        attackVector: z.enum([
          "ATTACK_VECTOR_UNSPECIFIED",
          "ATTACK_VECTOR_NETWORK",
          "ATTACK_VECTOR_ADJACENT",
          "ATTACK_VECTOR_LOCAL",
          "ATTACK_VECTOR_PHYSICAL",
        ]).describe(
          "Base Metrics Represents the intrinsic characteristics of a vulnerability that are constant over time and across user environments. This metric reflects the context by which vulnerability exploitation is possible.",
        ).optional(),
        availabilityImpact: z.enum([
          "IMPACT_UNSPECIFIED",
          "IMPACT_HIGH",
          "IMPACT_LOW",
          "IMPACT_NONE",
        ]).describe(
          "This metric measures the impact to the availability of the impacted component resulting from a successfully exploited vulnerability.",
        ).optional(),
        baseScore: z.number().describe(
          "The base score is a function of the base metric scores.",
        ).optional(),
        confidentialityImpact: z.enum([
          "IMPACT_UNSPECIFIED",
          "IMPACT_HIGH",
          "IMPACT_LOW",
          "IMPACT_NONE",
        ]).describe(
          "This metric measures the impact to the confidentiality of the information resources managed by a software component due to a successfully exploited vulnerability.",
        ).optional(),
        integrityImpact: z.enum([
          "IMPACT_UNSPECIFIED",
          "IMPACT_HIGH",
          "IMPACT_LOW",
          "IMPACT_NONE",
        ]).describe(
          "This metric measures the impact to integrity of a successfully exploited vulnerability.",
        ).optional(),
        privilegesRequired: z.enum([
          "PRIVILEGES_REQUIRED_UNSPECIFIED",
          "PRIVILEGES_REQUIRED_NONE",
          "PRIVILEGES_REQUIRED_LOW",
          "PRIVILEGES_REQUIRED_HIGH",
        ]).describe(
          "This metric describes the level of privileges an attacker must possess before successfully exploiting the vulnerability.",
        ).optional(),
        scope: z.enum(["SCOPE_UNSPECIFIED", "SCOPE_UNCHANGED", "SCOPE_CHANGED"])
          .describe(
            "The Scope metric captures whether a vulnerability in one vulnerable component impacts resources in components beyond its security scope.",
          ).optional(),
        userInteraction: z.enum([
          "USER_INTERACTION_UNSPECIFIED",
          "USER_INTERACTION_NONE",
          "USER_INTERACTION_REQUIRED",
        ]).describe(
          "This metric captures the requirement for a human user, other than the attacker, to participate in the successful compromise of the vulnerable component.",
        ).optional(),
      }).describe("Common Vulnerability Scoring System version 3.").optional(),
      exploitReleaseDate: z.string().describe(
        "Date the first publicly available exploit or PoC was released.",
      ).optional(),
      exploitationActivity: z.enum([
        "EXPLOITATION_ACTIVITY_UNSPECIFIED",
        "WIDE",
        "CONFIRMED",
        "AVAILABLE",
        "ANTICIPATED",
        "NO_KNOWN",
      ]).describe("The exploitation activity of the vulnerability in the wild.")
        .optional(),
      firstExploitationDate: z.string().describe(
        "Date of the earliest known exploitation.",
      ).optional(),
      id: z.string().describe(
        "The unique identifier for the vulnerability. e.g. CVE-2021-34527",
      ).optional(),
      impact: z.enum([
        "RISK_RATING_UNSPECIFIED",
        "LOW",
        "MEDIUM",
        "HIGH",
        "CRITICAL",
      ]).describe(
        "The potential impact of the vulnerability if it was to be exploited.",
      ).optional(),
      observedInTheWild: z.boolean().describe(
        "Whether or not the vulnerability has been observed in the wild.",
      ).optional(),
      references: z.array(z.object({
        source: z.string().describe("Source of the reference e.g. NVD")
          .optional(),
        uri: z.string().describe(
          "Uri for the mentioned source e.g. https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-34527.",
        ).optional(),
      })).describe(
        "Additional information about the CVE. e.g. https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-34527",
      ).optional(),
      upstreamFixAvailable: z.boolean().describe(
        "Whether upstream fix is available for the CVE.",
      ).optional(),
      zeroDay: z.boolean().describe(
        "Whether or not the vulnerability was zero day when the finding was published.",
      ).optional(),
    }).describe(
      "CVE stands for Common Vulnerabilities and Exposures. Information from the [CVE record](https://www.cve.org/ResourcesSupport/Glossary) that describes this vulnerability.",
    ).optional(),
    cwes: z.array(z.object({
      id: z.string().describe("The CWE identifier, e.g. CWE-94").optional(),
      references: z.array(z.object({
        source: z.unknown().describe("Source of the reference e.g. NVD")
          .optional(),
        uri: z.unknown().describe(
          "Uri for the mentioned source e.g. https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-34527.",
        ).optional(),
      })).describe(
        "Any reference to the details on the CWE, for example, https://cwe.mitre.org/data/definitions/94.html",
      ).optional(),
    })).describe(
      "Represents one or more Common Weakness Enumeration (CWE) information on this vulnerability.",
    ).optional(),
    fixedPackage: z.object({
      cpeUri: z.string().describe(
        "The CPE URI where the vulnerability was detected.",
      ).optional(),
      packageName: z.string().describe(
        "The name of the package where the vulnerability was detected.",
      ).optional(),
      packageType: z.string().describe(
        "Type of package, for example, os, maven, or go.",
      ).optional(),
      packageVersion: z.string().describe("The version of the package.")
        .optional(),
    }).describe("Package is a generic definition of a package.").optional(),
    offendingPackage: z.object({
      cpeUri: z.string().describe(
        "The CPE URI where the vulnerability was detected.",
      ).optional(),
      packageName: z.string().describe(
        "The name of the package where the vulnerability was detected.",
      ).optional(),
      packageType: z.string().describe(
        "Type of package, for example, os, maven, or go.",
      ).optional(),
      packageVersion: z.string().describe("The version of the package.")
        .optional(),
    }).describe("Package is a generic definition of a package.").optional(),
    providerRiskScore: z.string().describe(
      "Provider provided risk_score based on multiple factors. The higher the risk score, the more risky the vulnerability is.",
    ).optional(),
    reachable: z.boolean().describe(
      "Represents whether the vulnerability is reachable (detected via static analysis)",
    ).optional(),
    securityBulletin: z.object({
      bulletinId: z.string().describe(
        "ID of the bulletin corresponding to the vulnerability.",
      ).optional(),
      submissionTime: z.string().describe(
        "Submission time of this Security Bulletin.",
      ).optional(),
      suggestedUpgradeVersion: z.string().describe(
        "This represents a version that the cluster receiving this notification should be upgraded to, based on its current version. For example, 1.15.0",
      ).optional(),
    }).describe(
      "SecurityBulletin are notifications of vulnerabilities of Google products.",
    ).optional(),
  }).describe("Refers to common vulnerability fields e.g. cve, cvss, cwe etc.")
    .optional(),
});

/** Swamp extension model for Google Cloud Security Command Center Sources.Findings. Registered at `@swamp/gcp/securitycenter/sources-findings`. */
export const model = {
  type: "@swamp/gcp/securitycenter/sources-findings",
  version: "2026.05.25.1",
  upgrades: [
    {
      toVersion: "2026.03.31.1",
      description: "Added: agentDataAccessEvents, policyViolationSummary",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.1",
      description: "Added: discoveredWorkload",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.1",
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
      description: "Removed: discoveredWorkload",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { discoveredWorkload: _discoveredWorkload, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.04.03.2",
      description: "Added: discoveredWorkload",
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
      toVersion: "2026.05.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
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
      toVersion: "2026.05.20.1",
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
      toVersion: "2026.05.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Result containing the Finding and its StateChange.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a findings",
      arguments: z.object({
        identifier: z.string().describe("The name of the findings"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
      description: "Update findings attributes",
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
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["access"] !== undefined) body["access"] = g["access"];
        if (g["affectedResources"] !== undefined) {
          body["affectedResources"] = g["affectedResources"];
        }
        if (g["agentDataAccessEvents"] !== undefined) {
          body["agentDataAccessEvents"] = g["agentDataAccessEvents"];
        }
        if (g["aiModel"] !== undefined) body["aiModel"] = g["aiModel"];
        if (g["application"] !== undefined) {
          body["application"] = g["application"];
        }
        if (g["artifactGuardPolicies"] !== undefined) {
          body["artifactGuardPolicies"] = g["artifactGuardPolicies"];
        }
        if (g["attackExposure"] !== undefined) {
          body["attackExposure"] = g["attackExposure"];
        }
        if (g["backupDisasterRecovery"] !== undefined) {
          body["backupDisasterRecovery"] = g["backupDisasterRecovery"];
        }
        if (g["canonicalName"] !== undefined) {
          body["canonicalName"] = g["canonicalName"];
        }
        if (g["category"] !== undefined) body["category"] = g["category"];
        if (g["chokepoint"] !== undefined) body["chokepoint"] = g["chokepoint"];
        if (g["cloudArmor"] !== undefined) body["cloudArmor"] = g["cloudArmor"];
        if (g["cloudDlpDataProfile"] !== undefined) {
          body["cloudDlpDataProfile"] = g["cloudDlpDataProfile"];
        }
        if (g["cloudDlpInspection"] !== undefined) {
          body["cloudDlpInspection"] = g["cloudDlpInspection"];
        }
        if (g["complianceDetails"] !== undefined) {
          body["complianceDetails"] = g["complianceDetails"];
        }
        if (g["compliances"] !== undefined) {
          body["compliances"] = g["compliances"];
        }
        if (g["connections"] !== undefined) {
          body["connections"] = g["connections"];
        }
        if (g["contacts"] !== undefined) body["contacts"] = g["contacts"];
        if (g["containers"] !== undefined) body["containers"] = g["containers"];
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["dataAccessEvents"] !== undefined) {
          body["dataAccessEvents"] = g["dataAccessEvents"];
        }
        if (g["dataFlowEvents"] !== undefined) {
          body["dataFlowEvents"] = g["dataFlowEvents"];
        }
        if (g["dataRetentionDeletionEvents"] !== undefined) {
          body["dataRetentionDeletionEvents"] =
            g["dataRetentionDeletionEvents"];
        }
        if (g["database"] !== undefined) body["database"] = g["database"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["discoveredWorkload"] !== undefined) {
          body["discoveredWorkload"] = g["discoveredWorkload"];
        }
        if (g["disk"] !== undefined) body["disk"] = g["disk"];
        if (g["eventTime"] !== undefined) body["eventTime"] = g["eventTime"];
        if (g["exfiltration"] !== undefined) {
          body["exfiltration"] = g["exfiltration"];
        }
        if (g["externalExposure"] !== undefined) {
          body["externalExposure"] = g["externalExposure"];
        }
        if (g["externalSystems"] !== undefined) {
          body["externalSystems"] = g["externalSystems"];
        }
        if (g["externalUri"] !== undefined) {
          body["externalUri"] = g["externalUri"];
        }
        if (g["files"] !== undefined) body["files"] = g["files"];
        if (g["findingClass"] !== undefined) {
          body["findingClass"] = g["findingClass"];
        }
        if (g["groupMemberships"] !== undefined) {
          body["groupMemberships"] = g["groupMemberships"];
        }
        if (g["iamBindings"] !== undefined) {
          body["iamBindings"] = g["iamBindings"];
        }
        if (g["indicator"] !== undefined) body["indicator"] = g["indicator"];
        if (g["ipRules"] !== undefined) body["ipRules"] = g["ipRules"];
        if (g["job"] !== undefined) body["job"] = g["job"];
        if (g["kernelRootkit"] !== undefined) {
          body["kernelRootkit"] = g["kernelRootkit"];
        }
        if (g["kubernetes"] !== undefined) body["kubernetes"] = g["kubernetes"];
        if (g["loadBalancers"] !== undefined) {
          body["loadBalancers"] = g["loadBalancers"];
        }
        if (g["logEntries"] !== undefined) body["logEntries"] = g["logEntries"];
        if (g["mitreAttack"] !== undefined) {
          body["mitreAttack"] = g["mitreAttack"];
        }
        if (g["moduleName"] !== undefined) body["moduleName"] = g["moduleName"];
        if (g["mute"] !== undefined) body["mute"] = g["mute"];
        if (g["muteInfo"] !== undefined) body["muteInfo"] = g["muteInfo"];
        if (g["muteInitiator"] !== undefined) {
          body["muteInitiator"] = g["muteInitiator"];
        }
        if (g["muteUpdateTime"] !== undefined) {
          body["muteUpdateTime"] = g["muteUpdateTime"];
        }
        if (g["networks"] !== undefined) body["networks"] = g["networks"];
        if (g["nextSteps"] !== undefined) body["nextSteps"] = g["nextSteps"];
        if (g["notebook"] !== undefined) body["notebook"] = g["notebook"];
        if (g["orgPolicies"] !== undefined) {
          body["orgPolicies"] = g["orgPolicies"];
        }
        if (g["parentDisplayName"] !== undefined) {
          body["parentDisplayName"] = g["parentDisplayName"];
        }
        if (g["policyViolationSummary"] !== undefined) {
          body["policyViolationSummary"] = g["policyViolationSummary"];
        }
        if (g["processes"] !== undefined) body["processes"] = g["processes"];
        if (g["resourceName"] !== undefined) {
          body["resourceName"] = g["resourceName"];
        }
        if (g["secret"] !== undefined) body["secret"] = g["secret"];
        if (g["securityMarks"] !== undefined) {
          body["securityMarks"] = g["securityMarks"];
        }
        if (g["securityPosture"] !== undefined) {
          body["securityPosture"] = g["securityPosture"];
        }
        if (g["severity"] !== undefined) body["severity"] = g["severity"];
        if (g["sourceProperties"] !== undefined) {
          body["sourceProperties"] = g["sourceProperties"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["toxicCombination"] !== undefined) {
          body["toxicCombination"] = g["toxicCombination"];
        }
        if (g["vertexAi"] !== undefined) body["vertexAi"] = g["vertexAi"];
        if (g["vulnerability"] !== undefined) {
          body["vulnerability"] = g["vulnerability"];
        }
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
          PATCH_CONFIG,
          params,
          body,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync findings state from GCP",
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
          if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
          else if (existing["parent"]) {
            params["parent"] = String(existing["parent"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          const result = await readViaList(
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
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
      description: "List findings resources",
      arguments: z.object({
        fieldMask: z.string().describe(
          "A field mask to specify the Finding fields to be listed in the response. An empty field mask will list all fields.",
        ).optional(),
        filter: z.string().describe(
          'Expression that defines the filter to apply across findings. The expression is a list of one or more restrictions combined via logical operators `AND` and `OR`. Parentheses are supported, and `OR` has higher precedence than `AND`. Restrictions have the form ` ` and may have a `-` character in front of them to indicate negation. Examples include: * name * source_properties.a_property * security_marks.marks.marka The supported operators are: * `=` for all value types. * `>`, `<`, `>=`, `<=` for integer values. * `:`, meaning substring matching, for strings. The supported value types are: * string literals in quotes. * integer literals without quotes. * boolean literals `true` and `false` without quotes. The following field and operator combinations are supported: * name: `=` * parent: `=`, `:` * resource_name: `=`, `:` * state: `=`, `:` * category: `=`, `:` * external_uri: `=`, `:` * event_time: `=`, `>`, `<`, `>=`, `<=` Usage: This should be milliseconds since epoch or an RFC3339 string. Examples: `event_time = "2019-06-10T16:07:18-07:00"` `event_time = 1560208038000` * severity: `=`, `:` * workflow_state: `=`, `:` * security_marks.marks: `=`, `:` * source_properties: `=`, `:`, `>`, `<`, `>=`, `<=` For example, `source_properties.size = 100` is a valid filter string. Use a partial match on the empty string to filter based on a property existing: `source_properties.my_property : ""` Use a negated partial match on the empty string to filter based on a property not existing: `-source_properties.my_property : ""` * resource: * resource.name: `=`, `:` * resource.parent_name: `=`, `:` * resource.parent_display_name: `=`, `:` * resource.project_name: `=`, `:` * resource.project_display_name: `=`, `:` * resource.type: `=`, `:` * resource.folders.resource_folder: `=`, `:` * resource.display_name: `=`, `:`',
        ).optional(),
        orderBy: z.string().describe(
          'Expression that defines what fields and order to use for sorting. The string value should follow SQL syntax: comma separated list of fields. For example: "name,resource_properties.a_property". The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be appended to the field name. For example: "name desc,source_properties.a_property". Redundant space characters in the syntax are insignificant. "name desc,source_properties.a_property" and " name desc , source_properties.a_property " are equivalent. The following fields are supported: name parent state category resource_name event_time source_properties security_marks.marks',
        ).optional(),
        pageSize: z.number().describe(
          "The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["fieldMask"] !== undefined) {
          params["fieldMask"] = String(args["fieldMask"]);
        }
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
          "listFindingsResults",
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
    group: {
      description: "group",
      arguments: z.object({
        compareDuration: z.any().optional(),
        filter: z.any().optional(),
        groupBy: z.any().optional(),
        pageSize: z.any().optional(),
        pageToken: z.any().optional(),
        readTime: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["compareDuration"] !== undefined) {
          body["compareDuration"] = args["compareDuration"];
        }
        if (args["filter"] !== undefined) body["filter"] = args["filter"];
        if (args["groupBy"] !== undefined) body["groupBy"] = args["groupBy"];
        if (args["pageSize"] !== undefined) body["pageSize"] = args["pageSize"];
        if (args["pageToken"] !== undefined) {
          body["pageToken"] = args["pageToken"];
        }
        if (args["readTime"] !== undefined) body["readTime"] = args["readTime"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "securitycenter.folders.sources.findings.group",
            "path": "v1/{+parent}/findings:group",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_mute: {
      description: "set mute",
      arguments: z.object({
        mute: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["mute"] !== undefined) body["mute"] = args["mute"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "securitycenter.folders.sources.findings.setMute",
            "path": "v1/{+name}:setMute",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_state: {
      description: "set state",
      arguments: z.object({
        startTime: z.any().optional(),
        state: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["startTime"] !== undefined) {
          body["startTime"] = args["startTime"];
        }
        if (args["state"] !== undefined) body["state"] = args["state"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "securitycenter.folders.sources.findings.setState",
            "path": "v1/{+name}:setState",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    update_security_marks: {
      description: "update security marks",
      arguments: z.object({
        canonicalName: z.any().optional(),
        marks: z.any().optional(),
        name: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["canonicalName"] !== undefined) {
          body["canonicalName"] = args["canonicalName"];
        }
        if (args["marks"] !== undefined) body["marks"] = args["marks"];
        if (args["name"] !== undefined) body["name"] = args["name"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "securitycenter.folders.sources.findings.updateSecurityMarks",
            "path": "v1/{+name}",
            "httpMethod": "PATCH",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "startTime": { "location": "query" },
              "updateMask": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
