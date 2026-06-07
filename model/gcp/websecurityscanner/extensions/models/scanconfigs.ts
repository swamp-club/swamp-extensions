// Auto-generated extension model for @swamp/gcp/websecurityscanner/scanconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Web Security Scanner ScanConfigs.
 *
 * A ScanConfig resource contains the configurations to launch a scan.
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
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/scanConfigs/${shortName}`;
}

const BASE_URL = "https://websecurityscanner.googleapis.com/";

const GET_CONFIG = {
  "id": "websecurityscanner.projects.scanConfigs.get",
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
  "id": "websecurityscanner.projects.scanConfigs.create",
  "path": "v1/{+parent}/scanConfigs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "websecurityscanner.projects.scanConfigs.patch",
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

const DELETE_CONFIG = {
  "id": "websecurityscanner.projects.scanConfigs.delete",
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
  },
} as const;

const LIST_CONFIG = {
  "id": "websecurityscanner.projects.scanConfigs.list",
  "path": "v1/{+parent}/scanConfigs",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  authentication: z.object({
    customAccount: z.object({
      loginUrl: z.string().describe(
        "Required. The login form URL of the website.",
      ).optional(),
      password: z.string().describe(
        "Required. Input only. The password of the custom account. The credential is stored encrypted and not returned in any response nor included in audit logs.",
      ).optional(),
      username: z.string().describe(
        "Required. The user name of the custom account.",
      ).optional(),
    }).describe(
      "Describes authentication configuration that uses a custom account.",
    ).optional(),
    googleAccount: z.object({
      password: z.string().describe(
        "Required. Input only. The password of the Google account. The credential is stored encrypted and not returned in any response nor included in audit logs.",
      ).optional(),
      username: z.string().describe(
        "Required. The user name of the Google account.",
      ).optional(),
    }).describe(
      "Describes authentication configuration that uses a Google account.",
    ).optional(),
    iapCredential: z.object({
      iapTestServiceAccountInfo: z.object({
        targetAudienceClientId: z.string().describe(
          "Required. Describes OAuth2 client id of resources protected by Identity-Aware-Proxy (IAP).",
        ).optional(),
      }).describe(
        "Describes authentication configuration when Web-Security-Scanner service account is added in Identity-Aware-Proxy (IAP) access policies.",
      ).optional(),
    }).describe(
      "Describes authentication configuration for Identity-Aware-Proxy (IAP).",
    ).optional(),
  }).describe("Scan authentication configuration.").optional(),
  blacklistPatterns: z.array(z.string()).describe(
    "The excluded URL patterns as described in https://cloud.google.com/security-command-center/docs/how-to-use-web-security-scanner#excluding_urls",
  ).optional(),
  displayName: z.string().describe(
    "Required. The user provided display name of the ScanConfig.",
  ).optional(),
  exportToSecurityCommandCenter: z.enum([
    "EXPORT_TO_SECURITY_COMMAND_CENTER_UNSPECIFIED",
    "ENABLED",
    "DISABLED",
  ]).describe(
    "Controls export of scan configurations and results to Security Command Center.",
  ).optional(),
  ignoreHttpStatusErrors: z.boolean().describe(
    "Whether to keep scanning even if most requests return HTTP error codes.",
  ).optional(),
  latestRun: z.object({
    endTime: z.string().describe(
      "Output only. The time at which the ScanRun reached termination state - that the ScanRun is either finished or stopped by user.",
    ).optional(),
    errorTrace: z.object({
      code: z.enum([
        "CODE_UNSPECIFIED",
        "INTERNAL_ERROR",
        "SCAN_CONFIG_ISSUE",
        "AUTHENTICATION_CONFIG_ISSUE",
        "TIMED_OUT_WHILE_SCANNING",
        "TOO_MANY_REDIRECTS",
        "TOO_MANY_HTTP_ERRORS",
        "STARTING_URLS_CRAWL_HTTP_ERRORS",
      ]).describe("Output only. Indicates the error reason code.").optional(),
      mostCommonHttpErrorCode: z.number().int().describe(
        "Output only. If the scan encounters TOO_MANY_HTTP_ERRORS, this field indicates the most common HTTP error code, if such is available. For example, if this code is 404, the scan has encountered too many NOT_FOUND responses.",
      ).optional(),
      scanConfigError: z.object({
        code: z.enum([
          "CODE_UNSPECIFIED",
          "OK",
          "INTERNAL_ERROR",
          "APPENGINE_API_BACKEND_ERROR",
          "APPENGINE_API_NOT_ACCESSIBLE",
          "APPENGINE_DEFAULT_HOST_MISSING",
          "CANNOT_USE_GOOGLE_COM_ACCOUNT",
          "CANNOT_USE_OWNER_ACCOUNT",
          "COMPUTE_API_BACKEND_ERROR",
          "COMPUTE_API_NOT_ACCESSIBLE",
          "CUSTOM_LOGIN_URL_DOES_NOT_BELONG_TO_CURRENT_PROJECT",
          "CUSTOM_LOGIN_URL_MALFORMED",
          "CUSTOM_LOGIN_URL_MAPPED_TO_NON_ROUTABLE_ADDRESS",
          "CUSTOM_LOGIN_URL_MAPPED_TO_UNRESERVED_ADDRESS",
          "CUSTOM_LOGIN_URL_HAS_NON_ROUTABLE_IP_ADDRESS",
          "CUSTOM_LOGIN_URL_HAS_UNRESERVED_IP_ADDRESS",
          "DUPLICATE_SCAN_NAME",
          "INVALID_FIELD_VALUE",
          "FAILED_TO_AUTHENTICATE_TO_TARGET",
          "FINDING_TYPE_UNSPECIFIED",
          "FORBIDDEN_TO_SCAN_COMPUTE",
          "FORBIDDEN_UPDATE_TO_MANAGED_SCAN",
          "MALFORMED_FILTER",
          "MALFORMED_RESOURCE_NAME",
          "PROJECT_INACTIVE",
          "REQUIRED_FIELD",
          "RESOURCE_NAME_INCONSISTENT",
          "SCAN_ALREADY_RUNNING",
          "SCAN_NOT_RUNNING",
          "SEED_URL_DOES_NOT_BELONG_TO_CURRENT_PROJECT",
          "SEED_URL_MALFORMED",
          "SEED_URL_MAPPED_TO_NON_ROUTABLE_ADDRESS",
          "SEED_URL_MAPPED_TO_UNRESERVED_ADDRESS",
          "SEED_URL_HAS_NON_ROUTABLE_IP_ADDRESS",
          "SEED_URL_HAS_UNRESERVED_IP_ADDRESS",
          "SERVICE_ACCOUNT_NOT_CONFIGURED",
          "TOO_MANY_SCANS",
          "UNABLE_TO_RESOLVE_PROJECT_INFO",
          "UNSUPPORTED_BLACKLIST_PATTERN_FORMAT",
          "UNSUPPORTED_FILTER",
          "UNSUPPORTED_FINDING_TYPE",
          "UNSUPPORTED_URL_SCHEME",
          "CLOUD_ASSET_INVENTORY_ASSET_NOT_FOUND",
        ]).describe(
          "Output only. Indicates the reason code for a configuration failure.",
        ).optional(),
        fieldName: z.string().describe(
          'Output only. Indicates the full name of the ScanConfig field that triggers this error, for example "scan_config.max_qps". This field is provided for troubleshooting purposes only and its actual value can change in the future.',
        ).optional(),
      }).describe(
        "Defines a custom error message used by CreateScanConfig and UpdateScanConfig APIs when scan configuration validation fails. It is also reported as part of a ScanRunErrorTrace message if scan validation fails due to a scan configuration error.",
      ).optional(),
    }).describe("Output only. Defines an error trace message for a ScanRun.")
      .optional(),
    executionState: z.enum([
      "EXECUTION_STATE_UNSPECIFIED",
      "QUEUED",
      "SCANNING",
      "FINISHED",
    ]).describe("Output only. The execution state of the ScanRun.").optional(),
    hasVulnerabilities: z.boolean().describe(
      "Output only. Whether the scan run has found any vulnerabilities.",
    ).optional(),
    name: z.string().describe(
      "Output only. The resource name of the ScanRun. The name follows the format of 'projects/{projectId}/scanConfigs/{scanConfigId}/scanRuns/{scanRunId}'. The ScanRun IDs are generated by the system.",
    ).optional(),
    progressPercent: z.number().int().describe(
      "Output only. The percentage of total completion ranging from 0 to 100. If the scan is in queue, the value is 0. If the scan is running, the value ranges from 0 to 100. If the scan is finished, the value is 100.",
    ).optional(),
    resultState: z.enum([
      "RESULT_STATE_UNSPECIFIED",
      "SUCCESS",
      "ERROR",
      "KILLED",
    ]).describe(
      'Output only. The result state of the ScanRun. This field is only available after the execution state reaches "FINISHED".',
    ).optional(),
    startTime: z.string().describe(
      "Output only. The time at which the ScanRun started.",
    ).optional(),
    urlsCrawledCount: z.string().describe(
      "Output only. The number of URLs crawled during this ScanRun. If the scan is in progress, the value represents the number of URLs crawled up to now.",
    ).optional(),
    urlsTestedCount: z.string().describe(
      "Output only. The number of URLs tested during this ScanRun. If the scan is in progress, the value represents the number of URLs tested up to now. The number of URLs tested is usually larger than the number URLS crawled because typically a crawled URL is tested with multiple test payloads.",
    ).optional(),
    warningTraces: z.array(z.object({
      code: z.enum([
        "CODE_UNSPECIFIED",
        "INSUFFICIENT_CRAWL_RESULTS",
        "TOO_MANY_CRAWL_RESULTS",
        "TOO_MANY_FUZZ_TASKS",
        "BLOCKED_BY_IAP",
        "NO_STARTING_URL_FOUND_FOR_MANAGED_SCAN",
      ]).describe("Output only. Indicates the warning code.").optional(),
    })).describe(
      "Output only. A list of warnings, if such are encountered during this scan run.",
    ).optional(),
  }).describe(
    "A ScanRun is a output-only resource representing an actual run of the scan. Next id: 12",
  ).optional(),
  maxQps: z.number().int().describe(
    "The maximum QPS during scanning. A valid value ranges from 5 to 20 inclusively. If the field is unspecified or its value is set 0, server will default to 15. Other values outside of [5, 20] range will be rejected with INVALID_ARGUMENT error.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the ScanConfig. The name follows the format of 'projects/{projectId}/scanConfigs/{scanConfigId}'. The ScanConfig IDs are generated by the system.",
  ).optional(),
  riskLevel: z.enum(["RISK_LEVEL_UNSPECIFIED", "NORMAL", "LOW"]).describe(
    "The risk level selected for the scan",
  ).optional(),
  schedule: z.object({
    intervalDurationDays: z.number().int().describe(
      "Required. The duration of time between executions in days.",
    ).optional(),
    scheduleTime: z.string().describe(
      "A timestamp indicates when the next run will be scheduled. The value is refreshed by the server after each run. If unspecified, it will default to current server time, which means the scan will be scheduled to start immediately.",
    ).optional(),
  }).describe("Scan schedule configuration.").optional(),
  startingUrls: z.array(z.string()).describe(
    "Required. The starting URLs from which the scanner finds site pages.",
  ).optional(),
  staticIpScan: z.boolean().describe(
    "Whether the scan configuration has enabled static IP address scan feature. If enabled, the scanner will access applications from static IP addresses.",
  ).optional(),
  targetPlatforms: z.array(
    z.enum([
      "TARGET_PLATFORM_UNSPECIFIED",
      "APP_ENGINE",
      "COMPUTE",
      "CLOUD_RUN",
      "CLOUD_FUNCTIONS",
    ]),
  ).describe(
    "Set of Google Cloud platforms targeted by the scan. If empty, APP_ENGINE will be used as a default.",
  ).optional(),
  userAgent: z.enum([
    "USER_AGENT_UNSPECIFIED",
    "CHROME_LINUX",
    "CHROME_ANDROID",
    "SAFARI_IPHONE",
  ]).describe("The user agent used during scanning.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  authentication: z.object({
    customAccount: z.object({
      loginUrl: z.string(),
      password: z.string(),
      username: z.string(),
    }),
    googleAccount: z.object({
      password: z.string(),
      username: z.string(),
    }),
    iapCredential: z.object({
      iapTestServiceAccountInfo: z.object({
        targetAudienceClientId: z.string(),
      }),
    }),
  }).optional(),
  blacklistPatterns: z.array(z.string()).optional(),
  displayName: z.string().optional(),
  exportToSecurityCommandCenter: z.string().optional(),
  ignoreHttpStatusErrors: z.boolean().optional(),
  latestRun: z.object({
    endTime: z.string(),
    errorTrace: z.object({
      code: z.string(),
      mostCommonHttpErrorCode: z.number(),
      scanConfigError: z.object({
        code: z.string(),
        fieldName: z.string(),
      }),
    }),
    executionState: z.string(),
    hasVulnerabilities: z.boolean(),
    name: z.string(),
    progressPercent: z.number(),
    resultState: z.string(),
    startTime: z.string(),
    urlsCrawledCount: z.string(),
    urlsTestedCount: z.string(),
    warningTraces: z.array(z.object({
      code: z.string(),
    })),
  }).optional(),
  managedScan: z.boolean().optional(),
  maxQps: z.number().optional(),
  name: z.string(),
  riskLevel: z.string().optional(),
  schedule: z.object({
    intervalDurationDays: z.number(),
    scheduleTime: z.string(),
  }).optional(),
  startingUrls: z.array(z.string()).optional(),
  staticIpScan: z.boolean().optional(),
  targetPlatforms: z.array(z.string()).optional(),
  userAgent: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  authentication: z.object({
    customAccount: z.object({
      loginUrl: z.string().describe(
        "Required. The login form URL of the website.",
      ).optional(),
      password: z.string().describe(
        "Required. Input only. The password of the custom account. The credential is stored encrypted and not returned in any response nor included in audit logs.",
      ).optional(),
      username: z.string().describe(
        "Required. The user name of the custom account.",
      ).optional(),
    }).describe(
      "Describes authentication configuration that uses a custom account.",
    ).optional(),
    googleAccount: z.object({
      password: z.string().describe(
        "Required. Input only. The password of the Google account. The credential is stored encrypted and not returned in any response nor included in audit logs.",
      ).optional(),
      username: z.string().describe(
        "Required. The user name of the Google account.",
      ).optional(),
    }).describe(
      "Describes authentication configuration that uses a Google account.",
    ).optional(),
    iapCredential: z.object({
      iapTestServiceAccountInfo: z.object({
        targetAudienceClientId: z.string().describe(
          "Required. Describes OAuth2 client id of resources protected by Identity-Aware-Proxy (IAP).",
        ).optional(),
      }).describe(
        "Describes authentication configuration when Web-Security-Scanner service account is added in Identity-Aware-Proxy (IAP) access policies.",
      ).optional(),
    }).describe(
      "Describes authentication configuration for Identity-Aware-Proxy (IAP).",
    ).optional(),
  }).describe("Scan authentication configuration.").optional(),
  blacklistPatterns: z.array(z.string()).describe(
    "The excluded URL patterns as described in https://cloud.google.com/security-command-center/docs/how-to-use-web-security-scanner#excluding_urls",
  ).optional(),
  displayName: z.string().describe(
    "Required. The user provided display name of the ScanConfig.",
  ).optional(),
  exportToSecurityCommandCenter: z.enum([
    "EXPORT_TO_SECURITY_COMMAND_CENTER_UNSPECIFIED",
    "ENABLED",
    "DISABLED",
  ]).describe(
    "Controls export of scan configurations and results to Security Command Center.",
  ).optional(),
  ignoreHttpStatusErrors: z.boolean().describe(
    "Whether to keep scanning even if most requests return HTTP error codes.",
  ).optional(),
  latestRun: z.object({
    endTime: z.string().describe(
      "Output only. The time at which the ScanRun reached termination state - that the ScanRun is either finished or stopped by user.",
    ).optional(),
    errorTrace: z.object({
      code: z.enum([
        "CODE_UNSPECIFIED",
        "INTERNAL_ERROR",
        "SCAN_CONFIG_ISSUE",
        "AUTHENTICATION_CONFIG_ISSUE",
        "TIMED_OUT_WHILE_SCANNING",
        "TOO_MANY_REDIRECTS",
        "TOO_MANY_HTTP_ERRORS",
        "STARTING_URLS_CRAWL_HTTP_ERRORS",
      ]).describe("Output only. Indicates the error reason code.").optional(),
      mostCommonHttpErrorCode: z.number().int().describe(
        "Output only. If the scan encounters TOO_MANY_HTTP_ERRORS, this field indicates the most common HTTP error code, if such is available. For example, if this code is 404, the scan has encountered too many NOT_FOUND responses.",
      ).optional(),
      scanConfigError: z.object({
        code: z.enum([
          "CODE_UNSPECIFIED",
          "OK",
          "INTERNAL_ERROR",
          "APPENGINE_API_BACKEND_ERROR",
          "APPENGINE_API_NOT_ACCESSIBLE",
          "APPENGINE_DEFAULT_HOST_MISSING",
          "CANNOT_USE_GOOGLE_COM_ACCOUNT",
          "CANNOT_USE_OWNER_ACCOUNT",
          "COMPUTE_API_BACKEND_ERROR",
          "COMPUTE_API_NOT_ACCESSIBLE",
          "CUSTOM_LOGIN_URL_DOES_NOT_BELONG_TO_CURRENT_PROJECT",
          "CUSTOM_LOGIN_URL_MALFORMED",
          "CUSTOM_LOGIN_URL_MAPPED_TO_NON_ROUTABLE_ADDRESS",
          "CUSTOM_LOGIN_URL_MAPPED_TO_UNRESERVED_ADDRESS",
          "CUSTOM_LOGIN_URL_HAS_NON_ROUTABLE_IP_ADDRESS",
          "CUSTOM_LOGIN_URL_HAS_UNRESERVED_IP_ADDRESS",
          "DUPLICATE_SCAN_NAME",
          "INVALID_FIELD_VALUE",
          "FAILED_TO_AUTHENTICATE_TO_TARGET",
          "FINDING_TYPE_UNSPECIFIED",
          "FORBIDDEN_TO_SCAN_COMPUTE",
          "FORBIDDEN_UPDATE_TO_MANAGED_SCAN",
          "MALFORMED_FILTER",
          "MALFORMED_RESOURCE_NAME",
          "PROJECT_INACTIVE",
          "REQUIRED_FIELD",
          "RESOURCE_NAME_INCONSISTENT",
          "SCAN_ALREADY_RUNNING",
          "SCAN_NOT_RUNNING",
          "SEED_URL_DOES_NOT_BELONG_TO_CURRENT_PROJECT",
          "SEED_URL_MALFORMED",
          "SEED_URL_MAPPED_TO_NON_ROUTABLE_ADDRESS",
          "SEED_URL_MAPPED_TO_UNRESERVED_ADDRESS",
          "SEED_URL_HAS_NON_ROUTABLE_IP_ADDRESS",
          "SEED_URL_HAS_UNRESERVED_IP_ADDRESS",
          "SERVICE_ACCOUNT_NOT_CONFIGURED",
          "TOO_MANY_SCANS",
          "UNABLE_TO_RESOLVE_PROJECT_INFO",
          "UNSUPPORTED_BLACKLIST_PATTERN_FORMAT",
          "UNSUPPORTED_FILTER",
          "UNSUPPORTED_FINDING_TYPE",
          "UNSUPPORTED_URL_SCHEME",
          "CLOUD_ASSET_INVENTORY_ASSET_NOT_FOUND",
        ]).describe(
          "Output only. Indicates the reason code for a configuration failure.",
        ).optional(),
        fieldName: z.string().describe(
          'Output only. Indicates the full name of the ScanConfig field that triggers this error, for example "scan_config.max_qps". This field is provided for troubleshooting purposes only and its actual value can change in the future.',
        ).optional(),
      }).describe(
        "Defines a custom error message used by CreateScanConfig and UpdateScanConfig APIs when scan configuration validation fails. It is also reported as part of a ScanRunErrorTrace message if scan validation fails due to a scan configuration error.",
      ).optional(),
    }).describe("Output only. Defines an error trace message for a ScanRun.")
      .optional(),
    executionState: z.enum([
      "EXECUTION_STATE_UNSPECIFIED",
      "QUEUED",
      "SCANNING",
      "FINISHED",
    ]).describe("Output only. The execution state of the ScanRun.").optional(),
    hasVulnerabilities: z.boolean().describe(
      "Output only. Whether the scan run has found any vulnerabilities.",
    ).optional(),
    name: z.string().describe(
      "Output only. The resource name of the ScanRun. The name follows the format of 'projects/{projectId}/scanConfigs/{scanConfigId}/scanRuns/{scanRunId}'. The ScanRun IDs are generated by the system.",
    ).optional(),
    progressPercent: z.number().int().describe(
      "Output only. The percentage of total completion ranging from 0 to 100. If the scan is in queue, the value is 0. If the scan is running, the value ranges from 0 to 100. If the scan is finished, the value is 100.",
    ).optional(),
    resultState: z.enum([
      "RESULT_STATE_UNSPECIFIED",
      "SUCCESS",
      "ERROR",
      "KILLED",
    ]).describe(
      'Output only. The result state of the ScanRun. This field is only available after the execution state reaches "FINISHED".',
    ).optional(),
    startTime: z.string().describe(
      "Output only. The time at which the ScanRun started.",
    ).optional(),
    urlsCrawledCount: z.string().describe(
      "Output only. The number of URLs crawled during this ScanRun. If the scan is in progress, the value represents the number of URLs crawled up to now.",
    ).optional(),
    urlsTestedCount: z.string().describe(
      "Output only. The number of URLs tested during this ScanRun. If the scan is in progress, the value represents the number of URLs tested up to now. The number of URLs tested is usually larger than the number URLS crawled because typically a crawled URL is tested with multiple test payloads.",
    ).optional(),
    warningTraces: z.array(z.object({
      code: z.enum([
        "CODE_UNSPECIFIED",
        "INSUFFICIENT_CRAWL_RESULTS",
        "TOO_MANY_CRAWL_RESULTS",
        "TOO_MANY_FUZZ_TASKS",
        "BLOCKED_BY_IAP",
        "NO_STARTING_URL_FOUND_FOR_MANAGED_SCAN",
      ]).describe("Output only. Indicates the warning code.").optional(),
    })).describe(
      "Output only. A list of warnings, if such are encountered during this scan run.",
    ).optional(),
  }).describe(
    "A ScanRun is a output-only resource representing an actual run of the scan. Next id: 12",
  ).optional(),
  maxQps: z.number().int().describe(
    "The maximum QPS during scanning. A valid value ranges from 5 to 20 inclusively. If the field is unspecified or its value is set 0, server will default to 15. Other values outside of [5, 20] range will be rejected with INVALID_ARGUMENT error.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the ScanConfig. The name follows the format of 'projects/{projectId}/scanConfigs/{scanConfigId}'. The ScanConfig IDs are generated by the system.",
  ).optional(),
  riskLevel: z.enum(["RISK_LEVEL_UNSPECIFIED", "NORMAL", "LOW"]).describe(
    "The risk level selected for the scan",
  ).optional(),
  schedule: z.object({
    intervalDurationDays: z.number().int().describe(
      "Required. The duration of time between executions in days.",
    ).optional(),
    scheduleTime: z.string().describe(
      "A timestamp indicates when the next run will be scheduled. The value is refreshed by the server after each run. If unspecified, it will default to current server time, which means the scan will be scheduled to start immediately.",
    ).optional(),
  }).describe("Scan schedule configuration.").optional(),
  startingUrls: z.array(z.string()).describe(
    "Required. The starting URLs from which the scanner finds site pages.",
  ).optional(),
  staticIpScan: z.boolean().describe(
    "Whether the scan configuration has enabled static IP address scan feature. If enabled, the scanner will access applications from static IP addresses.",
  ).optional(),
  targetPlatforms: z.array(
    z.enum([
      "TARGET_PLATFORM_UNSPECIFIED",
      "APP_ENGINE",
      "COMPUTE",
      "CLOUD_RUN",
      "CLOUD_FUNCTIONS",
    ]),
  ).describe(
    "Set of Google Cloud platforms targeted by the scan. If empty, APP_ENGINE will be used as a default.",
  ).optional(),
  userAgent: z.enum([
    "USER_AGENT_UNSPECIFIED",
    "CHROME_LINUX",
    "CHROME_ANDROID",
    "SAFARI_IPHONE",
  ]).describe("The user agent used during scanning.").optional(),
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

/** Swamp extension model for Google Cloud Web Security Scanner ScanConfigs. Registered at `@swamp/gcp/websecurityscanner/scanconfigs`. */
export const model = {
  type: "@swamp/gcp/websecurityscanner/scanconfigs",
  version: "2026.06.07.1",
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
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
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
      toVersion: "2026.05.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
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
      description:
        "A ScanConfig resource contains the configurations to launch a scan.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a scanConfigs",
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
        if (g["authentication"] !== undefined) {
          body["authentication"] = g["authentication"];
        }
        if (g["blacklistPatterns"] !== undefined) {
          body["blacklistPatterns"] = g["blacklistPatterns"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["exportToSecurityCommandCenter"] !== undefined) {
          body["exportToSecurityCommandCenter"] =
            g["exportToSecurityCommandCenter"];
        }
        if (g["ignoreHttpStatusErrors"] !== undefined) {
          body["ignoreHttpStatusErrors"] = g["ignoreHttpStatusErrors"];
        }
        if (g["latestRun"] !== undefined) body["latestRun"] = g["latestRun"];
        if (g["maxQps"] !== undefined) body["maxQps"] = g["maxQps"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["riskLevel"] !== undefined) body["riskLevel"] = g["riskLevel"];
        if (g["schedule"] !== undefined) body["schedule"] = g["schedule"];
        if (g["startingUrls"] !== undefined) {
          body["startingUrls"] = g["startingUrls"];
        }
        if (g["staticIpScan"] !== undefined) {
          body["staticIpScan"] = g["staticIpScan"];
        }
        if (g["targetPlatforms"] !== undefined) {
          body["targetPlatforms"] = g["targetPlatforms"];
        }
        if (g["userAgent"] !== undefined) body["userAgent"] = g["userAgent"];
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
      description: "Get a scanConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the scanConfigs"),
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
    update: {
      description: "Update scanConfigs attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["authentication"] !== undefined) {
          body["authentication"] = g["authentication"];
        }
        if (g["blacklistPatterns"] !== undefined) {
          body["blacklistPatterns"] = g["blacklistPatterns"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["exportToSecurityCommandCenter"] !== undefined) {
          body["exportToSecurityCommandCenter"] =
            g["exportToSecurityCommandCenter"];
        }
        if (g["ignoreHttpStatusErrors"] !== undefined) {
          body["ignoreHttpStatusErrors"] = g["ignoreHttpStatusErrors"];
        }
        if (g["latestRun"] !== undefined) body["latestRun"] = g["latestRun"];
        if (g["maxQps"] !== undefined) body["maxQps"] = g["maxQps"];
        if (g["riskLevel"] !== undefined) body["riskLevel"] = g["riskLevel"];
        if (g["schedule"] !== undefined) body["schedule"] = g["schedule"];
        if (g["startingUrls"] !== undefined) {
          body["startingUrls"] = g["startingUrls"];
        }
        if (g["staticIpScan"] !== undefined) {
          body["staticIpScan"] = g["staticIpScan"];
        }
        if (g["targetPlatforms"] !== undefined) {
          body["targetPlatforms"] = g["targetPlatforms"];
        }
        if (g["userAgent"] !== undefined) body["userAgent"] = g["userAgent"];
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
          GET_CONFIG,
          undefined,
          credentials,
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
      description: "Delete the scanConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the scanConfigs"),
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
      description: "Sync scanConfigs state from GCP",
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
      description: "List scanConfigs resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The maximum number of ScanConfigs to return, can be limited by server. If not specified or not positive, the implementation will select a reasonable value.",
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "scanConfigs",
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
            "id": "websecurityscanner.projects.scanConfigs.start",
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
  },
};
