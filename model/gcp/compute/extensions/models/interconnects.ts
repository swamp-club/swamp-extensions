// Auto-generated extension model for @swamp/gcp/compute/interconnects
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine Interconnects.
 *
 * Represents an Interconnect resource. An Interconnect resource is a dedicated connection between the Google Cloud network and your on-premises network. For more information, read the Dedicated Interconnect Overview.
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.interconnects.get",
  "path": "projects/{project}/global/interconnects/{interconnect}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "interconnect",
  ],
  "parameters": {
    "interconnect": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.interconnects.insert",
  "path": "projects/{project}/global/interconnects",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "compute.interconnects.patch",
  "path": "projects/{project}/global/interconnects/{interconnect}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "project",
    "interconnect",
  ],
  "parameters": {
    "interconnect": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.interconnects.delete",
  "path": "projects/{project}/global/interconnects/{interconnect}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "interconnect",
  ],
  "parameters": {
    "interconnect": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  aaiEnabled: z.boolean().describe(
    "Enable or disable the application awareness feature on this Cloud Interconnect.",
  ).optional(),
  adminEnabled: z.boolean().describe(
    "Administrative status of the interconnect. When this is set to true, the Interconnect is functional and can carry traffic. When set to false, no packets can be carried over the interconnect and no BGP routes are exchanged over it. By default, the status is set to true.",
  ).optional(),
  applicationAwareInterconnect: z.object({
    bandwidthPercentagePolicy: z.object({
      bandwidthPercentages: z.array(z.object({
        percentage: z.number().int().describe(
          "Bandwidth percentage for a specific traffic class.",
        ).optional(),
        trafficClass: z.enum(["TC1", "TC2", "TC3", "TC4", "TC5", "TC6"])
          .describe(
            "TrafficClass whose bandwidth percentage is being specified.",
          ).optional(),
      })).describe(
        "Specify bandwidth percentages for various traffic classes for queuing type Bandwidth Percent.",
      ).optional(),
    }).optional(),
    profileDescription: z.string().describe(
      "Description for the application awareness profile on this Cloud Interconnect.",
    ).optional(),
    shapeAveragePercentages: z.array(z.object({
      percentage: z.number().int().describe(
        "Bandwidth percentage for a specific traffic class.",
      ).optional(),
      trafficClass: z.enum(["TC1", "TC2", "TC3", "TC4", "TC5", "TC6"]).describe(
        "TrafficClass whose bandwidth percentage is being specified.",
      ).optional(),
    })).describe(
      "Optional field to specify a list of shape average percentages to be applied in conjunction with StrictPriorityPolicy or BandwidthPercentagePolicy.",
    ).optional(),
    strictPriorityPolicy: z.object({}).describe(
      "Specify configuration for StrictPriorityPolicy.",
    ).optional(),
  }).describe(
    "Configuration information for application awareness on this Cloud Interconnect.",
  ).optional(),
  customerName: z.string().describe(
    "Customer name, to put in the Letter of Authorization as the party authorized to request a crossconnect.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  interconnectType: z.enum(["DEDICATED", "IT_PRIVATE", "PARTNER"]).describe(
    "Type of interconnect, which can take one of the following values: - PARTNER: A partner-managed interconnection shared between customers though a partner. - DEDICATED: A dedicated physical interconnection with the customer. Note that a value IT_PRIVATE has been deprecated in favor of DEDICATED.",
  ).optional(),
  labelFingerprint: z.string().describe(
    "A fingerprint for the labels being applied to this Interconnect, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve an Interconnect.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels for this resource. These can only be added or modified by thesetLabels method. Each label key/value pair must comply withRFC1035. Label values may be empty.",
  ).optional(),
  linkType: z.enum([
    "LINK_TYPE_ETHERNET_100G_LR",
    "LINK_TYPE_ETHERNET_10G_LR",
    "LINK_TYPE_ETHERNET_400G_LR4",
  ]).describe(
    "Type of link requested, which can take one of the following values: - LINK_TYPE_ETHERNET_10G_LR: A 10G Ethernet with LR optics - LINK_TYPE_ETHERNET_100G_LR: A 100G Ethernet with LR optics. - LINK_TYPE_ETHERNET_400G_LR4: A 400G Ethernet with LR4 optics. Note that this field indicates the speed of each of the links in the bundle, not the speed of the entire bundle.",
  ).optional(),
  location: z.string().describe(
    "URL of the InterconnectLocation object that represents where this connection is to be provisioned.",
  ).optional(),
  macsec: z.object({
    failOpen: z.boolean().describe(
      "If set to true, the Interconnect connection is configured with ashould-secure MACsec security policy, that allows the Google router to fallback to cleartext traffic if the MKA session cannot be established. By default, the Interconnect connection is configured with amust-secure security policy that drops all traffic if the MKA session cannot be established with your router.",
    ).optional(),
    preSharedKeys: z.array(z.object({
      name: z.string().describe(
        "Required. A name for this pre-shared key. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
      ).optional(),
      startTime: z.string().describe(
        "A RFC3339 timestamp on or after which the key is valid. startTime can be in the future. If the keychain has a single key, startTime can be omitted. If the keychain has multiple keys, startTime is mandatory for each key. The start times of keys must be in increasing order. The start times of two consecutive keys must be at least 6 hours apart.",
      ).optional(),
    })).describe(
      "Required. A keychain placeholder describing a set of named key objects along with their start times. A MACsec CKN/CAK is generated for each key in the key chain. Google router automatically picks the key with the most recent startTime when establishing or re-establishing a MACsec secure link.",
    ).optional(),
  }).describe(
    "Configuration information for enabling Media Access Control security (MACsec) on this Cloud Interconnect connection between Google and your on-premises router.",
  ).optional(),
  macsecEnabled: z.boolean().describe(
    "Enable or disable MACsec on this Interconnect connection. MACsec enablement fails if the MACsec object is not specified.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ),
  nocContactEmail: z.string().describe(
    "Email address to contact the customer NOC for operations and maintenance notifications regarding this Interconnect. If specified, this will be used for notifications in addition to all other forms described, such as Cloud Monitoring logs alerting and Cloud Notifications. This field is required for users who sign up for Cloud Interconnect using workforce identity federation.",
  ).optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      'Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID {: } or Namespaced format {: }. For example the following are valid inputs: * {"tagKeys/333": "tagValues/444", "tagKeys/123": "tagValues/456"} * {"123/environment": "production", "345/abc": "xyz"} Note: * Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment": "tagValues/444"} is invalid. * Inconsistent format is not supported. For instance: {"tagKeys/333": "tagValues/444", "123/env": "prod"} is invalid.',
    ).optional(),
  }).describe("Additional interconnect parameters.").optional(),
  remoteLocation: z.string().describe(
    "Indicates that this is a Cross-Cloud Interconnect. This field specifies the location outside of Google's network that the interconnect is connected to.",
  ).optional(),
  requestedFeatures: z.array(
    z.enum(["IF_CROSS_SITE_NETWORK", "IF_L2_FORWARDING", "IF_MACSEC"]),
  ).describe(
    "Optional. This parameter can be provided only with Interconnect INSERT. It isn't valid for Interconnect PATCH. List of features requested for this Interconnect connection, which can take one of the following values: - IF_MACSEC: If specified, then the connection is created on MACsec capable hardware ports. If not specified, non-MACsec capable ports will also be considered. - IF_CROSS_SITE_NETWORK: If specified, then the connection is created exclusively for Cross-Site Networking. The connection can not be used for Cross-Site Networking unless this feature is specified.",
  ).optional(),
  requestedLinkCount: z.number().int().describe(
    "Target number of physical links in the link bundle, as requested by the customer.",
  ).optional(),
  subzone: z.enum(["SUBZONE_A", "SUBZONE_B"]).describe("To be deprecated.")
    .optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  aaiEnabled: z.boolean().optional(),
  adminEnabled: z.boolean().optional(),
  applicationAwareInterconnect: z.object({
    bandwidthPercentagePolicy: z.object({
      bandwidthPercentages: z.array(z.object({
        percentage: z.number(),
        trafficClass: z.string(),
      })),
    }),
    profileDescription: z.string(),
    shapeAveragePercentages: z.array(z.object({
      percentage: z.number(),
      trafficClass: z.string(),
    })),
    strictPriorityPolicy: z.object({}),
  }).optional(),
  availableFeatures: z.array(z.string()).optional(),
  circuitInfos: z.array(z.object({
    customerDemarcId: z.string(),
    googleCircuitId: z.string(),
    googleDemarcId: z.string(),
  })).optional(),
  creationTimestamp: z.string().optional(),
  customerName: z.string().optional(),
  description: z.string().optional(),
  expectedOutages: z.array(z.object({
    affectedCircuits: z.array(z.string()),
    description: z.string(),
    endTime: z.string(),
    issueType: z.string(),
    name: z.string(),
    source: z.string(),
    startTime: z.string(),
    state: z.string(),
  })).optional(),
  googleIpAddress: z.string().optional(),
  googleReferenceId: z.string().optional(),
  id: z.string().optional(),
  interconnectAttachments: z.array(z.string()).optional(),
  interconnectGroups: z.array(z.string()).optional(),
  interconnectType: z.string().optional(),
  kind: z.string().optional(),
  labelFingerprint: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  linkType: z.string().optional(),
  location: z.string().optional(),
  macsec: z.object({
    failOpen: z.boolean(),
    preSharedKeys: z.array(z.object({
      name: z.string(),
      startTime: z.string(),
    })),
  }).optional(),
  macsecEnabled: z.boolean().optional(),
  name: z.string(),
  nocContactEmail: z.string().optional(),
  operationalStatus: z.string().optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.unknown()),
  }).optional(),
  peerIpAddress: z.string().optional(),
  provisionedLinkCount: z.number().optional(),
  remoteLocation: z.string().optional(),
  requestedFeatures: z.array(z.string()).optional(),
  requestedLinkCount: z.number().optional(),
  satisfiesPzs: z.boolean().optional(),
  selfLink: z.string().optional(),
  state: z.string().optional(),
  subzone: z.string().optional(),
  wireGroups: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  aaiEnabled: z.boolean().describe(
    "Enable or disable the application awareness feature on this Cloud Interconnect.",
  ).optional(),
  adminEnabled: z.boolean().describe(
    "Administrative status of the interconnect. When this is set to true, the Interconnect is functional and can carry traffic. When set to false, no packets can be carried over the interconnect and no BGP routes are exchanged over it. By default, the status is set to true.",
  ).optional(),
  applicationAwareInterconnect: z.object({
    bandwidthPercentagePolicy: z.object({
      bandwidthPercentages: z.array(z.object({
        percentage: z.number().int().describe(
          "Bandwidth percentage for a specific traffic class.",
        ).optional(),
        trafficClass: z.enum(["TC1", "TC2", "TC3", "TC4", "TC5", "TC6"])
          .describe(
            "TrafficClass whose bandwidth percentage is being specified.",
          ).optional(),
      })).describe(
        "Specify bandwidth percentages for various traffic classes for queuing type Bandwidth Percent.",
      ).optional(),
    }).optional(),
    profileDescription: z.string().describe(
      "Description for the application awareness profile on this Cloud Interconnect.",
    ).optional(),
    shapeAveragePercentages: z.array(z.object({
      percentage: z.number().int().describe(
        "Bandwidth percentage for a specific traffic class.",
      ).optional(),
      trafficClass: z.enum(["TC1", "TC2", "TC3", "TC4", "TC5", "TC6"]).describe(
        "TrafficClass whose bandwidth percentage is being specified.",
      ).optional(),
    })).describe(
      "Optional field to specify a list of shape average percentages to be applied in conjunction with StrictPriorityPolicy or BandwidthPercentagePolicy.",
    ).optional(),
    strictPriorityPolicy: z.object({}).describe(
      "Specify configuration for StrictPriorityPolicy.",
    ).optional(),
  }).describe(
    "Configuration information for application awareness on this Cloud Interconnect.",
  ).optional(),
  customerName: z.string().describe(
    "Customer name, to put in the Letter of Authorization as the party authorized to request a crossconnect.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  interconnectType: z.enum(["DEDICATED", "IT_PRIVATE", "PARTNER"]).describe(
    "Type of interconnect, which can take one of the following values: - PARTNER: A partner-managed interconnection shared between customers though a partner. - DEDICATED: A dedicated physical interconnection with the customer. Note that a value IT_PRIVATE has been deprecated in favor of DEDICATED.",
  ).optional(),
  labelFingerprint: z.string().describe(
    "A fingerprint for the labels being applied to this Interconnect, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve an Interconnect.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels for this resource. These can only be added or modified by thesetLabels method. Each label key/value pair must comply withRFC1035. Label values may be empty.",
  ).optional(),
  linkType: z.enum([
    "LINK_TYPE_ETHERNET_100G_LR",
    "LINK_TYPE_ETHERNET_10G_LR",
    "LINK_TYPE_ETHERNET_400G_LR4",
  ]).describe(
    "Type of link requested, which can take one of the following values: - LINK_TYPE_ETHERNET_10G_LR: A 10G Ethernet with LR optics - LINK_TYPE_ETHERNET_100G_LR: A 100G Ethernet with LR optics. - LINK_TYPE_ETHERNET_400G_LR4: A 400G Ethernet with LR4 optics. Note that this field indicates the speed of each of the links in the bundle, not the speed of the entire bundle.",
  ).optional(),
  location: z.string().describe(
    "URL of the InterconnectLocation object that represents where this connection is to be provisioned.",
  ).optional(),
  macsec: z.object({
    failOpen: z.boolean().describe(
      "If set to true, the Interconnect connection is configured with ashould-secure MACsec security policy, that allows the Google router to fallback to cleartext traffic if the MKA session cannot be established. By default, the Interconnect connection is configured with amust-secure security policy that drops all traffic if the MKA session cannot be established with your router.",
    ).optional(),
    preSharedKeys: z.array(z.object({
      name: z.string().describe(
        "Required. A name for this pre-shared key. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
      ).optional(),
      startTime: z.string().describe(
        "A RFC3339 timestamp on or after which the key is valid. startTime can be in the future. If the keychain has a single key, startTime can be omitted. If the keychain has multiple keys, startTime is mandatory for each key. The start times of keys must be in increasing order. The start times of two consecutive keys must be at least 6 hours apart.",
      ).optional(),
    })).describe(
      "Required. A keychain placeholder describing a set of named key objects along with their start times. A MACsec CKN/CAK is generated for each key in the key chain. Google router automatically picks the key with the most recent startTime when establishing or re-establishing a MACsec secure link.",
    ).optional(),
  }).describe(
    "Configuration information for enabling Media Access Control security (MACsec) on this Cloud Interconnect connection between Google and your on-premises router.",
  ).optional(),
  macsecEnabled: z.boolean().describe(
    "Enable or disable MACsec on this Interconnect connection. MACsec enablement fails if the MACsec object is not specified.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  nocContactEmail: z.string().describe(
    "Email address to contact the customer NOC for operations and maintenance notifications regarding this Interconnect. If specified, this will be used for notifications in addition to all other forms described, such as Cloud Monitoring logs alerting and Cloud Notifications. This field is required for users who sign up for Cloud Interconnect using workforce identity federation.",
  ).optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      'Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID {: } or Namespaced format {: }. For example the following are valid inputs: * {"tagKeys/333": "tagValues/444", "tagKeys/123": "tagValues/456"} * {"123/environment": "production", "345/abc": "xyz"} Note: * Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment": "tagValues/444"} is invalid. * Inconsistent format is not supported. For instance: {"tagKeys/333": "tagValues/444", "123/env": "prod"} is invalid.',
    ).optional(),
  }).describe("Additional interconnect parameters.").optional(),
  remoteLocation: z.string().describe(
    "Indicates that this is a Cross-Cloud Interconnect. This field specifies the location outside of Google's network that the interconnect is connected to.",
  ).optional(),
  requestedFeatures: z.array(
    z.enum(["IF_CROSS_SITE_NETWORK", "IF_L2_FORWARDING", "IF_MACSEC"]),
  ).describe(
    "Optional. This parameter can be provided only with Interconnect INSERT. It isn't valid for Interconnect PATCH. List of features requested for this Interconnect connection, which can take one of the following values: - IF_MACSEC: If specified, then the connection is created on MACsec capable hardware ports. If not specified, non-MACsec capable ports will also be considered. - IF_CROSS_SITE_NETWORK: If specified, then the connection is created exclusively for Cross-Site Networking. The connection can not be used for Cross-Site Networking unless this feature is specified.",
  ).optional(),
  requestedLinkCount: z.number().int().describe(
    "Target number of physical links in the link bundle, as requested by the customer.",
  ).optional(),
  subzone: z.enum(["SUBZONE_A", "SUBZONE_B"]).describe("To be deprecated.")
    .optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine Interconnects. Registered at `@swamp/gcp/compute/interconnects`. */
export const model = {
  type: "@swamp/gcp/compute/interconnects",
  version: "2026.05.19.1",
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
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents an Interconnect resource. An Interconnect resource is a dedicated ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a interconnects",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["aaiEnabled"] !== undefined) body["aaiEnabled"] = g["aaiEnabled"];
        if (g["adminEnabled"] !== undefined) {
          body["adminEnabled"] = g["adminEnabled"];
        }
        if (g["applicationAwareInterconnect"] !== undefined) {
          body["applicationAwareInterconnect"] =
            g["applicationAwareInterconnect"];
        }
        if (g["customerName"] !== undefined) {
          body["customerName"] = g["customerName"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["interconnectType"] !== undefined) {
          body["interconnectType"] = g["interconnectType"];
        }
        if (g["labelFingerprint"] !== undefined) {
          body["labelFingerprint"] = g["labelFingerprint"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["linkType"] !== undefined) body["linkType"] = g["linkType"];
        if (g["location"] !== undefined) body["location"] = g["location"];
        if (g["macsec"] !== undefined) body["macsec"] = g["macsec"];
        if (g["macsecEnabled"] !== undefined) {
          body["macsecEnabled"] = g["macsecEnabled"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["nocContactEmail"] !== undefined) {
          body["nocContactEmail"] = g["nocContactEmail"];
        }
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["remoteLocation"] !== undefined) {
          body["remoteLocation"] = g["remoteLocation"];
        }
        if (g["requestedFeatures"] !== undefined) {
          body["requestedFeatures"] = g["requestedFeatures"];
        }
        if (g["requestedLinkCount"] !== undefined) {
          body["requestedLinkCount"] = g["requestedLinkCount"];
        }
        if (g["subzone"] !== undefined) body["subzone"] = g["subzone"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) params["interconnect"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Get a interconnects",
      arguments: z.object({
        identifier: z.string().describe("The name of the interconnects"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["interconnect"] = args.identifier;
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
      description: "Update interconnects attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        params["interconnect"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["aaiEnabled"] !== undefined) body["aaiEnabled"] = g["aaiEnabled"];
        if (g["adminEnabled"] !== undefined) {
          body["adminEnabled"] = g["adminEnabled"];
        }
        if (g["applicationAwareInterconnect"] !== undefined) {
          body["applicationAwareInterconnect"] =
            g["applicationAwareInterconnect"];
        }
        if (g["customerName"] !== undefined) {
          body["customerName"] = g["customerName"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["interconnectType"] !== undefined) {
          body["interconnectType"] = g["interconnectType"];
        }
        if (g["labelFingerprint"] !== undefined) {
          body["labelFingerprint"] = g["labelFingerprint"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["linkType"] !== undefined) body["linkType"] = g["linkType"];
        if (g["location"] !== undefined) body["location"] = g["location"];
        if (g["macsec"] !== undefined) body["macsec"] = g["macsec"];
        if (g["macsecEnabled"] !== undefined) {
          body["macsecEnabled"] = g["macsecEnabled"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["nocContactEmail"] !== undefined) {
          body["nocContactEmail"] = g["nocContactEmail"];
        }
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["remoteLocation"] !== undefined) {
          body["remoteLocation"] = g["remoteLocation"];
        }
        if (g["requestedFeatures"] !== undefined) {
          body["requestedFeatures"] = g["requestedFeatures"];
        }
        if (g["requestedLinkCount"] !== undefined) {
          body["requestedLinkCount"] = g["requestedLinkCount"];
        }
        if (g["subzone"] !== undefined) body["subzone"] = g["subzone"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Delete the interconnects",
      arguments: z.object({
        identifier: z.string().describe("The name of the interconnects"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["interconnect"] = args.identifier;
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
      description: "Sync interconnects state from GCP",
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
          params["interconnect"] = identifier;
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
    get_diagnostics: {
      description: "get diagnostics",
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
        params["interconnect"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.interconnects.getDiagnostics",
            "path":
              "projects/{project}/global/interconnects/{interconnect}/getDiagnostics",
            "httpMethod": "GET",
            "parameterOrder": ["project", "interconnect"],
            "parameters": {
              "interconnect": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_macsec_config: {
      description: "get macsec config",
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
        params["interconnect"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.interconnects.getMacsecConfig",
            "path":
              "projects/{project}/global/interconnects/{interconnect}/getMacsecConfig",
            "httpMethod": "GET",
            "parameterOrder": ["project", "interconnect"],
            "parameters": {
              "interconnect": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    set_labels: {
      description: "set labels",
      arguments: z.object({
        labelFingerprint: z.any().optional(),
        labels: z.any().optional(),
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["labelFingerprint"] !== undefined) {
          body["labelFingerprint"] = args["labelFingerprint"];
        }
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.interconnects.setLabels",
            "path":
              "projects/{project}/global/interconnects/{resource}/setLabels",
            "httpMethod": "POST",
            "parameterOrder": ["project", "resource"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "resource": { "location": "path", "required": true },
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
