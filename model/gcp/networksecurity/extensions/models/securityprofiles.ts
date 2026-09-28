// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/networksecurity/securityprofiles
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Network Security SecurityProfiles.
 *
 * SecurityProfile is a resource that defines the behavior for one of many ProfileTypes.
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
  return `${parent}/securityProfiles/${shortName}`;
}

const BASE_URL = "https://networksecurity.googleapis.com/";

const GET_CONFIG = {
  "id": "networksecurity.organizations.locations.securityProfiles.get",
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
  "id": "networksecurity.organizations.locations.securityProfiles.create",
  "path": "v1/{+parent}/securityProfiles",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "securityProfileId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "networksecurity.organizations.locations.securityProfiles.patch",
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
  "id": "networksecurity.organizations.locations.securityProfiles.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "networksecurity.organizations.locations.securityProfiles.list",
  "path": "v1/{+parent}/securityProfiles",
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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  customInterceptProfile: z.object({
    interceptEndpointGroup: z.string().describe(
      "Required. The target InterceptEndpointGroup. When a firewall rule with this security profile attached matches a packet, the packet will be intercepted to the location-local target in this group.",
    ).optional(),
  }).describe("The custom TPPI configuration for the SecurityProfile.")
    .optional(),
  customMirroringProfile: z.object({
    mirroringEndpointGroup: z.string().describe(
      "Required. Immutable. The target MirroringEndpointGroup. When a mirroring rule with this security profile attached matches a packet, a replica will be mirrored to the location-local target in this group.",
    ).optional(),
  }).describe(
    "The custom Packet Mirroring v2 configuration for the SecurityProfile.",
  ).optional(),
  description: z.string().describe(
    "Optional. An optional description of the profile. Max length 512 characters.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels as key value pairs.",
  ).optional(),
  name: z.string().describe(
    "Immutable. Identifier. Name of the SecurityProfile resource. It matches pattern `projects|organizations/*/locations/{location}/securityProfiles/{security_profile}`.",
  ).optional(),
  threatPreventionProfile: z.object({
    antivirusOverrides: z.array(z.object({
      action: z.enum([
        "THREAT_ACTION_UNSPECIFIED",
        "DEFAULT_ACTION",
        "ALLOW",
        "ALERT",
        "DENY",
      ]).describe(
        "Required. Threat action override. For some threat types, only a subset of actions applies.",
      ).optional(),
      protocol: z.enum([
        "PROTOCOL_UNSPECIFIED",
        "SMTP",
        "SMB",
        "POP3",
        "IMAP",
        "HTTP2",
        "HTTP",
        "FTP",
      ]).describe("Required. Protocol to match.").optional(),
    })).describe(
      "Optional. Configuration for overriding antivirus actions per protocol.",
    ).optional(),
    severityOverrides: z.array(z.object({
      action: z.enum([
        "THREAT_ACTION_UNSPECIFIED",
        "DEFAULT_ACTION",
        "ALLOW",
        "ALERT",
        "DENY",
      ]).describe("Required. Threat action override.").optional(),
      severity: z.enum([
        "SEVERITY_UNSPECIFIED",
        "INFORMATIONAL",
        "LOW",
        "MEDIUM",
        "HIGH",
        "CRITICAL",
      ]).describe("Required. Severity level to match.").optional(),
    })).describe(
      "Optional. Configuration for overriding threats actions by severity match.",
    ).optional(),
    threatOverrides: z.array(z.object({
      action: z.enum([
        "THREAT_ACTION_UNSPECIFIED",
        "DEFAULT_ACTION",
        "ALLOW",
        "ALERT",
        "DENY",
      ]).describe(
        "Required. Threat action override. For some threat types, only a subset of actions applies.",
      ).optional(),
      threatId: z.string().describe(
        "Required. Vendor-specific ID of a threat to override.",
      ).optional(),
      type: z.enum([
        "THREAT_TYPE_UNSPECIFIED",
        "UNKNOWN",
        "VULNERABILITY",
        "ANTIVIRUS",
        "SPYWARE",
        "DNS",
      ]).describe("Output only. Type of the threat (read only).").optional(),
    })).describe(
      "Optional. Configuration for overriding threats actions by threat_id match. If a threat is matched both by configuration provided in severity_overrides and threat_overrides, the threat_overrides action is applied.",
    ).optional(),
  }).describe("The threat prevention configuration for the SecurityProfile.")
    .optional(),
  type: z.enum([
    "PROFILE_TYPE_UNSPECIFIED",
    "THREAT_PREVENTION",
    "CUSTOM_MIRRORING",
    "CUSTOM_INTERCEPT",
    "URL_FILTERING",
    "WILDFIRE_ANALYSIS",
  ]).describe(
    "Immutable. The single ProfileType that the SecurityProfile resource configures.",
  ).optional(),
  urlFilteringProfile: z.object({
    urlFilters: z.array(z.object({
      filteringAction: z.enum([
        "URL_FILTERING_ACTION_UNSPECIFIED",
        "ALLOW",
        "DENY",
      ]).describe("Required. The action taken when this filter is applied.")
        .optional(),
      priority: z.number().int().describe(
        "Required. The priority of this filter within the URL Filtering Profile. Lower integers indicate higher priorities. The priority of a filter must be unique within a URL Filtering Profile.",
      ).optional(),
      urls: z.array(z.string()).describe(
        "Required. The list of strings that a URL must match with for this filter to be applied.",
      ).optional(),
    })).describe(
      "Optional. The list of filtering configs in which each config defines an action to take for some URL match.",
    ).optional(),
  }).describe("The URL filtering configuration for the SecurityProfile.")
    .optional(),
  wildfireAnalysisProfile: z.object({
    wildfireInlineCloudAnalysisRules: z.array(z.object({
      action: z.enum([
        "WILDFIRE_INLINE_CLOUD_ANALYSIS_ACTION_UNSPECIFIED",
        "ALLOW",
        "DENY",
        "ALERT",
      ]).describe(
        "Required. Action to take when a threat is detected using WildFire Inline Cloud Analysis. The default Value is DENY.",
      ).optional(),
      customFileTypes: z.object({
        fileTypes: z.array(z.unknown()).describe(
          "Required. File types to be submitted for WildFire inline cloud analysis.",
        ).optional(),
      }).describe("Submit a custom list of file types for WildFire analysis.")
        .optional(),
      direction: z.enum(["DIRECTION_UNSPECIFIED", "UPLOAD", "DOWNLOAD", "BOTH"])
        .describe(
          "Required. Direction for the file to be analyzed by WildFire Inline Cloud Analysis.",
        ).optional(),
      fileSelectionMode: z.enum([
        "FILE_SELECTION_MODE_UNSPECIFIED",
        "ALL_FILE_TYPES",
        "CUSTOM_FILE_TYPES",
      ]).describe(
        "Required. File selection mode for WildFire inline cloud analysis.",
      ).optional(),
    })).describe("Optional. Configuration for WildFire inline cloud analysis.")
      .optional(),
    wildfireInlineMlOverrides: z.array(z.object({
      action: z.enum([
        "WILDFIRE_THREAT_ACTION_UNSPECIFIED",
        "WILDFIRE_DEFAULT_ACTION",
        "WILDFIRE_ALLOW",
        "WILDFIRE_ALERT",
        "WILDFIRE_DENY",
      ]).describe(
        "Required. The action to take for WildFire Inline ML override.",
      ).optional(),
      protocol: z.enum([
        "WILDFIRE_PROTOCOL_UNSPECIFIED",
        "WILDFIRE_SMTP",
        "WILDFIRE_SMB",
        "WILDFIRE_POP3",
        "WILDFIRE_IMAP",
        "WILDFIRE_HTTP2",
        "WILDFIRE_HTTP",
        "WILDFIRE_FTP",
      ]).describe(
        "Required. Protocol to match for WildFire Inline ML override.",
      ).optional(),
    })).describe(
      "Optional. Configuration for overriding inline ML WildFire actions per protocol.",
    ).optional(),
    wildfireInlineMlSetting: z.object({
      fileExceptions: z.array(z.object({
        filename: z.string().describe(
          "Optional. Name of the file to exclude from WildFire Inline ML analysis.",
        ).optional(),
        partialHash: z.string().describe(
          "Required. Machine learning partial hash of the file to exclude from WildFire Inline ML analysis.",
        ).optional(),
      })).describe(
        "Optional. List of files to exclude from WildFire Inline ML analysis.",
      ).optional(),
      inlineMlConfigs: z.array(z.object({
        action: z.enum([
          "INLINE_ML_ACTION_UNSPECIFIED",
          "DISABLE",
          "ALERT",
          "ENABLE",
        ]).describe(
          "Required. Action to take when a threat is detected using Inline ML.",
        ).optional(),
        fileType: z.enum([
          "INLINE_ML_CONFIG_UNSPECIFIED",
          "WINDOWS_EXECUTABLE",
          "POWERSHELL_SCRIPT1",
          "POWERSHELL_SCRIPT2",
          "ELF",
          "MS_OFFICE",
          "SHELL",
          "OOXML",
          "MACHO",
        ]).describe("Required. File type to configure Inline ML for.")
          .optional(),
      })).describe(
        "Optional. List of Inline ML configs to enable in WildFire Inline ML analysis.",
      ).optional(),
    }).describe("Optional. Settings for WildFire Inline ML analysis.")
      .optional(),
    wildfireInlineMlSettings: z.array(z.object({
      fileExceptions: z.array(z.object({
        filename: z.unknown().describe(
          "Optional. Name of the file to exclude from WildFire Inline ML analysis.",
        ).optional(),
        partialHash: z.unknown().describe(
          "Required. Machine learning partial hash of the file to exclude from WildFire Inline ML analysis.",
        ).optional(),
      })).describe(
        "Optional. List of files to exclude from WildFire Inline ML analysis.",
      ).optional(),
      inlineMlConfigs: z.array(z.object({
        action: z.unknown().describe(
          "Required. Action to take when a threat is detected using Inline ML.",
        ).optional(),
        fileType: z.unknown().describe(
          "Required. File type to configure Inline ML for.",
        ).optional(),
      })).describe(
        "Optional. List of Inline ML configs to enable in WildFire Inline ML analysis.",
      ).optional(),
    })).describe("Optional. Settings for WildFire Inline ML analysis.")
      .optional(),
    wildfireOverrides: z.array(z.object({
      action: z.enum([
        "WILDFIRE_THREAT_ACTION_UNSPECIFIED",
        "WILDFIRE_DEFAULT_ACTION",
        "WILDFIRE_ALLOW",
        "WILDFIRE_ALERT",
        "WILDFIRE_DENY",
      ]).describe(
        "Required. Threat action override. For some threat types, only a subset of actions applies.",
      ).optional(),
      protocol: z.enum([
        "WILDFIRE_PROTOCOL_UNSPECIFIED",
        "WILDFIRE_SMTP",
        "WILDFIRE_SMB",
        "WILDFIRE_POP3",
        "WILDFIRE_IMAP",
        "WILDFIRE_HTTP2",
        "WILDFIRE_HTTP",
        "WILDFIRE_FTP",
      ]).describe("Required. Protocol to match.").optional(),
    })).describe(
      "Optional. Configuration for overriding WildFire actions per protocol.",
    ).optional(),
    wildfireRealtimeLookup: z.boolean().describe(
      "Optional. Whether to hold the transfer of a file while the WildFire real-time signature cloud performs a signature lookup. Default value is false.",
    ).optional(),
    wildfireSubmissionRules: z.array(z.object({
      customFileTypes: z.object({
        fileTypes: z.array(z.unknown()).describe(
          "Required. File types to be submitted for WildFire analysis.",
        ).optional(),
      }).describe("Submit a custom list of file types for WildFire analysis.")
        .optional(),
      direction: z.enum(["DIRECTION_UNSPECIFIED", "UPLOAD", "DOWNLOAD", "BOTH"])
        .describe(
          "Required. Direction for the files to be analyzed by WildFire.",
        ).optional(),
      fileSelectionMode: z.enum([
        "FILE_SELECTION_MODE_UNSPECIFIED",
        "ALL_FILE_TYPES",
        "CUSTOM_FILE_TYPES",
      ]).describe("Required. File selection mode for WildFire analysis.")
        .optional(),
    })).describe("Optional. Configurations for WildFire file submissions.")
      .optional(),
    wildfireThreatOverrides: z.array(z.object({
      action: z.enum([
        "WILDFIRE_THREAT_ACTION_UNSPECIFIED",
        "WILDFIRE_DEFAULT_ACTION",
        "WILDFIRE_ALLOW",
        "WILDFIRE_ALERT",
        "WILDFIRE_DENY",
      ]).describe("Required. Threat action override.").optional(),
      threatId: z.string().describe("Required. Threat ID to match.").optional(),
    })).describe(
      "Optional. Configuration for overriding WildFire threats action by threat_id match.",
    ).optional(),
  }).describe("The WildFire Analysis configurations for SecurityProfile.")
    .optional(),
  securityProfileId: z.string().describe(
    'Required. Short name of the SecurityProfile resource to be created. This value should be 1-63 characters long, containing only letters, numbers, hyphens, and underscores, and should not start with a number. E.g. "security_profile1".',
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  customInterceptProfile: z.object({
    interceptEndpointGroup: z.string(),
  }).optional(),
  customMirroringProfile: z.object({
    mirroringEndpointGroup: z.string(),
  }).optional(),
  description: z.string().optional(),
  etag: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  threatPreventionProfile: z.object({
    antivirusOverrides: z.array(z.object({
      action: z.string(),
      protocol: z.string(),
    })),
    severityOverrides: z.array(z.object({
      action: z.string(),
      severity: z.string(),
    })),
    threatOverrides: z.array(z.object({
      action: z.string(),
      threatId: z.string(),
      type: z.string(),
    })),
  }).optional(),
  type: z.string().optional(),
  updateTime: z.string().optional(),
  urlFilteringProfile: z.object({
    urlFilters: z.array(z.object({
      filteringAction: z.string(),
      priority: z.number(),
      urls: z.array(z.string()),
    })),
  }).optional(),
  wildfireAnalysisProfile: z.object({
    wildfireInlineCloudAnalysisRules: z.array(z.object({
      action: z.string(),
      customFileTypes: z.object({
        fileTypes: z.array(z.unknown()),
      }),
      direction: z.string(),
      fileSelectionMode: z.string(),
    })),
    wildfireInlineMlOverrides: z.array(z.object({
      action: z.string(),
      protocol: z.string(),
    })),
    wildfireInlineMlSetting: z.object({
      fileExceptions: z.array(z.object({
        filename: z.string(),
        partialHash: z.string(),
      })),
      inlineMlConfigs: z.array(z.object({
        action: z.string(),
        fileType: z.string(),
      })),
    }),
    wildfireInlineMlSettings: z.array(z.object({
      fileExceptions: z.array(z.object({
        filename: z.unknown(),
        partialHash: z.unknown(),
      })),
      inlineMlConfigs: z.array(z.object({
        action: z.unknown(),
        fileType: z.unknown(),
      })),
    })),
    wildfireOverrides: z.array(z.object({
      action: z.string(),
      protocol: z.string(),
    })),
    wildfireRealtimeLookup: z.boolean(),
    wildfireSubmissionRules: z.array(z.object({
      customFileTypes: z.object({
        fileTypes: z.array(z.unknown()),
      }),
      direction: z.string(),
      fileSelectionMode: z.string(),
    })),
    wildfireThreatOverrides: z.array(z.object({
      action: z.string(),
      threatId: z.string(),
    })),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  customInterceptProfile: z.object({
    interceptEndpointGroup: z.string().describe(
      "Required. The target InterceptEndpointGroup. When a firewall rule with this security profile attached matches a packet, the packet will be intercepted to the location-local target in this group.",
    ).optional(),
  }).describe("The custom TPPI configuration for the SecurityProfile.")
    .optional(),
  customMirroringProfile: z.object({
    mirroringEndpointGroup: z.string().describe(
      "Required. Immutable. The target MirroringEndpointGroup. When a mirroring rule with this security profile attached matches a packet, a replica will be mirrored to the location-local target in this group.",
    ).optional(),
  }).describe(
    "The custom Packet Mirroring v2 configuration for the SecurityProfile.",
  ).optional(),
  description: z.string().describe(
    "Optional. An optional description of the profile. Max length 512 characters.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels as key value pairs.",
  ).optional(),
  name: z.string().describe(
    "Immutable. Identifier. Name of the SecurityProfile resource. It matches pattern `projects|organizations/*/locations/{location}/securityProfiles/{security_profile}`.",
  ).optional(),
  threatPreventionProfile: z.object({
    antivirusOverrides: z.array(z.object({
      action: z.enum([
        "THREAT_ACTION_UNSPECIFIED",
        "DEFAULT_ACTION",
        "ALLOW",
        "ALERT",
        "DENY",
      ]).describe(
        "Required. Threat action override. For some threat types, only a subset of actions applies.",
      ).optional(),
      protocol: z.enum([
        "PROTOCOL_UNSPECIFIED",
        "SMTP",
        "SMB",
        "POP3",
        "IMAP",
        "HTTP2",
        "HTTP",
        "FTP",
      ]).describe("Required. Protocol to match.").optional(),
    })).describe(
      "Optional. Configuration for overriding antivirus actions per protocol.",
    ).optional(),
    severityOverrides: z.array(z.object({
      action: z.enum([
        "THREAT_ACTION_UNSPECIFIED",
        "DEFAULT_ACTION",
        "ALLOW",
        "ALERT",
        "DENY",
      ]).describe("Required. Threat action override.").optional(),
      severity: z.enum([
        "SEVERITY_UNSPECIFIED",
        "INFORMATIONAL",
        "LOW",
        "MEDIUM",
        "HIGH",
        "CRITICAL",
      ]).describe("Required. Severity level to match.").optional(),
    })).describe(
      "Optional. Configuration for overriding threats actions by severity match.",
    ).optional(),
    threatOverrides: z.array(z.object({
      action: z.enum([
        "THREAT_ACTION_UNSPECIFIED",
        "DEFAULT_ACTION",
        "ALLOW",
        "ALERT",
        "DENY",
      ]).describe(
        "Required. Threat action override. For some threat types, only a subset of actions applies.",
      ).optional(),
      threatId: z.string().describe(
        "Required. Vendor-specific ID of a threat to override.",
      ).optional(),
      type: z.enum([
        "THREAT_TYPE_UNSPECIFIED",
        "UNKNOWN",
        "VULNERABILITY",
        "ANTIVIRUS",
        "SPYWARE",
        "DNS",
      ]).describe("Output only. Type of the threat (read only).").optional(),
    })).describe(
      "Optional. Configuration for overriding threats actions by threat_id match. If a threat is matched both by configuration provided in severity_overrides and threat_overrides, the threat_overrides action is applied.",
    ).optional(),
  }).describe("The threat prevention configuration for the SecurityProfile.")
    .optional(),
  type: z.enum([
    "PROFILE_TYPE_UNSPECIFIED",
    "THREAT_PREVENTION",
    "CUSTOM_MIRRORING",
    "CUSTOM_INTERCEPT",
    "URL_FILTERING",
    "WILDFIRE_ANALYSIS",
  ]).describe(
    "Immutable. The single ProfileType that the SecurityProfile resource configures.",
  ).optional(),
  urlFilteringProfile: z.object({
    urlFilters: z.array(z.object({
      filteringAction: z.enum([
        "URL_FILTERING_ACTION_UNSPECIFIED",
        "ALLOW",
        "DENY",
      ]).describe("Required. The action taken when this filter is applied.")
        .optional(),
      priority: z.number().int().describe(
        "Required. The priority of this filter within the URL Filtering Profile. Lower integers indicate higher priorities. The priority of a filter must be unique within a URL Filtering Profile.",
      ).optional(),
      urls: z.array(z.string()).describe(
        "Required. The list of strings that a URL must match with for this filter to be applied.",
      ).optional(),
    })).describe(
      "Optional. The list of filtering configs in which each config defines an action to take for some URL match.",
    ).optional(),
  }).describe("The URL filtering configuration for the SecurityProfile.")
    .optional(),
  wildfireAnalysisProfile: z.object({
    wildfireInlineCloudAnalysisRules: z.array(z.object({
      action: z.enum([
        "WILDFIRE_INLINE_CLOUD_ANALYSIS_ACTION_UNSPECIFIED",
        "ALLOW",
        "DENY",
        "ALERT",
      ]).describe(
        "Required. Action to take when a threat is detected using WildFire Inline Cloud Analysis. The default Value is DENY.",
      ).optional(),
      customFileTypes: z.object({
        fileTypes: z.array(z.unknown()).describe(
          "Required. File types to be submitted for WildFire inline cloud analysis.",
        ).optional(),
      }).describe("Submit a custom list of file types for WildFire analysis.")
        .optional(),
      direction: z.enum(["DIRECTION_UNSPECIFIED", "UPLOAD", "DOWNLOAD", "BOTH"])
        .describe(
          "Required. Direction for the file to be analyzed by WildFire Inline Cloud Analysis.",
        ).optional(),
      fileSelectionMode: z.enum([
        "FILE_SELECTION_MODE_UNSPECIFIED",
        "ALL_FILE_TYPES",
        "CUSTOM_FILE_TYPES",
      ]).describe(
        "Required. File selection mode for WildFire inline cloud analysis.",
      ).optional(),
    })).describe("Optional. Configuration for WildFire inline cloud analysis.")
      .optional(),
    wildfireInlineMlOverrides: z.array(z.object({
      action: z.enum([
        "WILDFIRE_THREAT_ACTION_UNSPECIFIED",
        "WILDFIRE_DEFAULT_ACTION",
        "WILDFIRE_ALLOW",
        "WILDFIRE_ALERT",
        "WILDFIRE_DENY",
      ]).describe(
        "Required. The action to take for WildFire Inline ML override.",
      ).optional(),
      protocol: z.enum([
        "WILDFIRE_PROTOCOL_UNSPECIFIED",
        "WILDFIRE_SMTP",
        "WILDFIRE_SMB",
        "WILDFIRE_POP3",
        "WILDFIRE_IMAP",
        "WILDFIRE_HTTP2",
        "WILDFIRE_HTTP",
        "WILDFIRE_FTP",
      ]).describe(
        "Required. Protocol to match for WildFire Inline ML override.",
      ).optional(),
    })).describe(
      "Optional. Configuration for overriding inline ML WildFire actions per protocol.",
    ).optional(),
    wildfireInlineMlSetting: z.object({
      fileExceptions: z.array(z.object({
        filename: z.string().describe(
          "Optional. Name of the file to exclude from WildFire Inline ML analysis.",
        ).optional(),
        partialHash: z.string().describe(
          "Required. Machine learning partial hash of the file to exclude from WildFire Inline ML analysis.",
        ).optional(),
      })).describe(
        "Optional. List of files to exclude from WildFire Inline ML analysis.",
      ).optional(),
      inlineMlConfigs: z.array(z.object({
        action: z.enum([
          "INLINE_ML_ACTION_UNSPECIFIED",
          "DISABLE",
          "ALERT",
          "ENABLE",
        ]).describe(
          "Required. Action to take when a threat is detected using Inline ML.",
        ).optional(),
        fileType: z.enum([
          "INLINE_ML_CONFIG_UNSPECIFIED",
          "WINDOWS_EXECUTABLE",
          "POWERSHELL_SCRIPT1",
          "POWERSHELL_SCRIPT2",
          "ELF",
          "MS_OFFICE",
          "SHELL",
          "OOXML",
          "MACHO",
        ]).describe("Required. File type to configure Inline ML for.")
          .optional(),
      })).describe(
        "Optional. List of Inline ML configs to enable in WildFire Inline ML analysis.",
      ).optional(),
    }).describe("Optional. Settings for WildFire Inline ML analysis.")
      .optional(),
    wildfireInlineMlSettings: z.array(z.object({
      fileExceptions: z.array(z.object({
        filename: z.unknown().describe(
          "Optional. Name of the file to exclude from WildFire Inline ML analysis.",
        ).optional(),
        partialHash: z.unknown().describe(
          "Required. Machine learning partial hash of the file to exclude from WildFire Inline ML analysis.",
        ).optional(),
      })).describe(
        "Optional. List of files to exclude from WildFire Inline ML analysis.",
      ).optional(),
      inlineMlConfigs: z.array(z.object({
        action: z.unknown().describe(
          "Required. Action to take when a threat is detected using Inline ML.",
        ).optional(),
        fileType: z.unknown().describe(
          "Required. File type to configure Inline ML for.",
        ).optional(),
      })).describe(
        "Optional. List of Inline ML configs to enable in WildFire Inline ML analysis.",
      ).optional(),
    })).describe("Optional. Settings for WildFire Inline ML analysis.")
      .optional(),
    wildfireOverrides: z.array(z.object({
      action: z.enum([
        "WILDFIRE_THREAT_ACTION_UNSPECIFIED",
        "WILDFIRE_DEFAULT_ACTION",
        "WILDFIRE_ALLOW",
        "WILDFIRE_ALERT",
        "WILDFIRE_DENY",
      ]).describe(
        "Required. Threat action override. For some threat types, only a subset of actions applies.",
      ).optional(),
      protocol: z.enum([
        "WILDFIRE_PROTOCOL_UNSPECIFIED",
        "WILDFIRE_SMTP",
        "WILDFIRE_SMB",
        "WILDFIRE_POP3",
        "WILDFIRE_IMAP",
        "WILDFIRE_HTTP2",
        "WILDFIRE_HTTP",
        "WILDFIRE_FTP",
      ]).describe("Required. Protocol to match.").optional(),
    })).describe(
      "Optional. Configuration for overriding WildFire actions per protocol.",
    ).optional(),
    wildfireRealtimeLookup: z.boolean().describe(
      "Optional. Whether to hold the transfer of a file while the WildFire real-time signature cloud performs a signature lookup. Default value is false.",
    ).optional(),
    wildfireSubmissionRules: z.array(z.object({
      customFileTypes: z.object({
        fileTypes: z.array(z.unknown()).describe(
          "Required. File types to be submitted for WildFire analysis.",
        ).optional(),
      }).describe("Submit a custom list of file types for WildFire analysis.")
        .optional(),
      direction: z.enum(["DIRECTION_UNSPECIFIED", "UPLOAD", "DOWNLOAD", "BOTH"])
        .describe(
          "Required. Direction for the files to be analyzed by WildFire.",
        ).optional(),
      fileSelectionMode: z.enum([
        "FILE_SELECTION_MODE_UNSPECIFIED",
        "ALL_FILE_TYPES",
        "CUSTOM_FILE_TYPES",
      ]).describe("Required. File selection mode for WildFire analysis.")
        .optional(),
    })).describe("Optional. Configurations for WildFire file submissions.")
      .optional(),
    wildfireThreatOverrides: z.array(z.object({
      action: z.enum([
        "WILDFIRE_THREAT_ACTION_UNSPECIFIED",
        "WILDFIRE_DEFAULT_ACTION",
        "WILDFIRE_ALLOW",
        "WILDFIRE_ALERT",
        "WILDFIRE_DENY",
      ]).describe("Required. Threat action override.").optional(),
      threatId: z.string().describe("Required. Threat ID to match.").optional(),
    })).describe(
      "Optional. Configuration for overriding WildFire threats action by threat_id match.",
    ).optional(),
  }).describe("The WildFire Analysis configurations for SecurityProfile.")
    .optional(),
  securityProfileId: z.string().describe(
    'Required. Short name of the SecurityProfile resource to be created. This value should be 1-63 characters long, containing only letters, numbers, hyphens, and underscores, and should not start with a number. E.g. "security_profile1".',
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessToken",
  "credentialsJson",
  "project",
  "scopes",
  "quotaProject",
  "apiEndpoint",
]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
    scopes: typeof g.scopes === "string"
      ? g.scopes.split(",").map((s: string) => s.trim())
      : undefined,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Network Security SecurityProfiles. Registered at `@swamp/gcp/networksecurity/securityprofiles`. */
export const model = {
  type: "@swamp/gcp/networksecurity/securityprofiles",
  version: "2026.09.28.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.12.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.28.1",
      description: "Added: wildfireAnalysisProfile",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "SecurityProfile is a resource that defines the behavior for one of many Profi...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a securityProfiles",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["customInterceptProfile"] !== undefined) {
          body["customInterceptProfile"] = g["customInterceptProfile"];
        }
        if (g["customMirroringProfile"] !== undefined) {
          body["customMirroringProfile"] = g["customMirroringProfile"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["threatPreventionProfile"] !== undefined) {
          body["threatPreventionProfile"] = g["threatPreventionProfile"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["urlFilteringProfile"] !== undefined) {
          body["urlFilteringProfile"] = g["urlFilteringProfile"];
        }
        if (g["wildfireAnalysisProfile"] !== undefined) {
          body["wildfireAnalysisProfile"] = g["wildfireAnalysisProfile"];
        }
        if (g["securityProfileId"] !== undefined) {
          params["securityProfileId"] = String(g["securityProfileId"]);
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
          credentials,
        ) as StateData;
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
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
      description: "Get a securityProfiles",
      arguments: z.object({
        identifier: z.string().describe("The name of the securityProfiles"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((g.name ?? result.name)?.toString() ?? args.identifier).replace(
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
      description: "Update securityProfiles attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific securityProfiles by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const params: Record<string, string> = { project: projectId };
        const existingName = existing["name"]?.toString();
        if (existingName && existingName.includes("/")) {
          params["name"] = existingName;
        } else {
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["customInterceptProfile"] !== undefined) {
          body["customInterceptProfile"] = g["customInterceptProfile"];
        }
        if (g["customMirroringProfile"] !== undefined) {
          body["customMirroringProfile"] = g["customMirroringProfile"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["threatPreventionProfile"] !== undefined) {
          body["threatPreventionProfile"] = g["threatPreventionProfile"];
        }
        if (g["urlFilteringProfile"] !== undefined) {
          body["urlFilteringProfile"] = g["urlFilteringProfile"];
        }
        if (g["wildfireAnalysisProfile"] !== undefined) {
          body["wildfireAnalysisProfile"] = g["wildfireAnalysisProfile"];
        }
        const updateMaskKeys = Object.keys(body);
        if (updateMaskKeys.length > 0) {
          params["updateMask"] = updateMaskKeys.join(",");
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
          baseUrl,
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
      description: "Delete the securityProfiles",
      arguments: z.object({
        identifier: z.string().describe("The name of the securityProfiles"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const { existed } = await deleteResource(
          baseUrl,
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
      description: "Sync securityProfiles state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific securityProfiles by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          const existingName = existing.name?.toString();
          if (existingName && existingName.includes("/")) {
            params["name"] = existingName;
          } else {
            const shortName = existingName ?? g["name"]?.toString();
            if (!shortName) throw new Error("No identifier found");
            params["name"] = buildResourceName(
              String(g["parent"] ?? ""),
              shortName,
            );
          }
          const result = await readResource(
            baseUrl,
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
      description: "List securityProfiles resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Optional. Maximum number of SecurityProfiles to return per call.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "securityProfiles",
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
  },
};
