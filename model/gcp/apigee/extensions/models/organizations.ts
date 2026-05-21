// Auto-generated extension model for @swamp/gcp/apigee/organizations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Apigee Organizations.
 *
 * Gets the profile for an Apigee organization. See [Understanding organizations](https://cloud.google.com/apigee/docs/api-platform/fundamentals/organization-structure).
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

const BASE_URL = "https://apigee.googleapis.com/";

const GET_CONFIG = {
  "id": "apigee.organizations.get",
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
  "id": "apigee.organizations.create",
  "path": "v1/organizations",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {
    "parent": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "apigee.organizations.update",
  "path": "v1/{+name}",
  "httpMethod": "PUT",
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

const DELETE_CONFIG = {
  "id": "apigee.organizations.delete",
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
    "retention": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "apigee.organizations.list",
  "path": "v1/{+parent}",
  "httpMethod": "GET",
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  addonsConfig: z.object({
    advancedApiOpsConfig: z.object({
      enabled: z.boolean().describe(
        "Flag that specifies whether the Advanced API Ops add-on is enabled.",
      ).optional(),
    }).describe("Configuration for the Advanced API Ops add-on.").optional(),
    analyticsConfig: z.object({
      enabled: z.boolean().describe("Whether the Analytics add-on is enabled.")
        .optional(),
      expireTimeMillis: z.string().describe(
        "Output only. Time at which the Analytics add-on expires in milliseconds since epoch. If unspecified, the add-on will never expire.",
      ).optional(),
      state: z.enum([
        "ADDON_STATE_UNSPECIFIED",
        "ENABLING",
        "ENABLED",
        "DISABLING",
        "DISABLED",
      ]).describe("Output only. The state of the Analytics add-on.").optional(),
      updateTime: z.string().describe("Output only. The latest update time.")
        .optional(),
    }).describe("Configuration for the Analytics add-on.").optional(),
    apiSecurityConfig: z.object({
      enabled: z.boolean().describe(
        "Flag that specifies whether the API security add-on is enabled.",
      ).optional(),
      expiresAt: z.string().describe(
        "Output only. Time at which the API Security add-on expires in milliseconds since epoch. If unspecified, the add-on will never expire.",
      ).optional(),
    }).describe("Configurations of the API Security add-on.").optional(),
    connectorsPlatformConfig: z.object({
      enabled: z.boolean().describe(
        "Flag that specifies whether the Connectors Platform add-on is enabled.",
      ).optional(),
      expiresAt: z.string().describe(
        "Output only. Time at which the Connectors Platform add-on expires in milliseconds since epoch. If unspecified, the add-on will never expire.",
      ).optional(),
    }).describe("Configuration for the Connectors Platform add-on.").optional(),
    integrationConfig: z.object({
      enabled: z.boolean().describe(
        "Flag that specifies whether the Integration add-on is enabled.",
      ).optional(),
    }).describe("Configuration for the Integration add-on.").optional(),
    monetizationConfig: z.object({
      enabled: z.boolean().describe(
        "Flag that specifies whether the Monetization add-on is enabled.",
      ).optional(),
    }).describe("Configuration for the Monetization add-on.").optional(),
  }).describe("Add-on configurations for the Apigee organization.").optional(),
  apiConsumerDataEncryptionKeyName: z.string().describe(
    "Optional. Cloud KMS key name used for encrypting API consumer data. If not specified or [BillingType](#BillingType) is `EVALUATION`, a Google-Managed encryption key will be used. Format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`",
  ).optional(),
  apiConsumerDataLocation: z.string().describe(
    'Optional. This field is needed only for customers using non-default data residency regions. Apigee stores some control plane data only in single region. This field determines which single region Apigee should use. For example: "us-west1" when control plane is in US or "europe-west2" when control plane is in EU.',
  ).optional(),
  attributes: z.array(z.string()).describe("Not used by Apigee.").optional(),
  authorizedNetwork: z.string().describe(
    "Optional. Compute Engine network used for Service Networking to be peered with Apigee runtime instances. See [Getting started with the Service Networking API](https://cloud.google.com/service-infrastructure/docs/service-networking/getting-started). Valid only when [RuntimeType](#RuntimeType) is set to `CLOUD`. The value must be set before the creation of a runtime instance and can be updated only when there are no runtime instances. For example: `default`. When changing authorizedNetwork, you must reconfigure VPC peering. After VPC peering with previous network is deleted, [run the following command](https://cloud.google.com/sdk/gcloud/reference/services/vpc-peerings/delete): `gcloud services vpc-peerings delete --network=NETWORK`, where `NETWORK` is the name of the previous network. This will delete the previous Service Networking. Otherwise, you will get the following error: `The resource 'projects/...-tp' is already linked to another shared VPC host 'projects/...-tp`. Apigee also supports shared VPC (that is, the host network project is not the same as the one that is peering with Apigee). See [Shared VPC overview](https://cloud.google.com/vpc/docs/shared-vpc). To use a shared VPC network, use the following format: `projects/{host-project-id}/{region}/networks/{network-name}`. For example: `projects/my-sharedvpc-host/global/networks/mynetwork` **Note:** Not supported for Apigee hybrid.",
  ).optional(),
  billingType: z.enum([
    "BILLING_TYPE_UNSPECIFIED",
    "SUBSCRIPTION",
    "EVALUATION",
    "PAYG",
  ]).describe(
    "Optional. Billing type of the Apigee organization. See [Apigee pricing](https://cloud.google.com/apigee/pricing).",
  ).optional(),
  controlPlaneEncryptionKeyName: z.string().describe(
    'Optional. Cloud KMS key name used for encrypting control plane data that is stored in a multi region. Only used for the data residency region "US" or "EU". If not specified or [BillingType](#BillingType) is `EVALUATION`, a Google-Managed encryption key will be used. Format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`',
  ).optional(),
  customerName: z.string().describe("Not used by Apigee.").optional(),
  description: z.string().describe(
    "Optional. Description of the Apigee organization.",
  ).optional(),
  disableVpcPeering: z.boolean().describe(
    "Optional. Flag that specifies whether the VPC Peering through Private Google Access should be disabled between the consumer network and Apigee. Valid only when RuntimeType is set to CLOUD. Required if an authorizedNetwork on the consumer project is not provided, in which case the flag should be set to true. The value must be set before the creation of any Apigee runtime instance and can be updated only when there are no runtime instances. **Note:** Apigee will be deprecating the vpc peering model that requires you to provide 'authorizedNetwork', by making the non-peering model as the default way of provisioning Apigee organization in future. So, this will be a temporary flag to enable the transition. Not supported for Apigee hybrid.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. Display name for the Apigee organization. Unused, but reserved for future use.",
  ).optional(),
  networkEgressRestricted: z.boolean().describe(
    "Optional. Flag that specifies if internet egress is restricted for VPC Service Controls. Valid only when runtime_type is `CLOUD` and disable_vpc_peering is `true`.",
  ).optional(),
  portalDisabled: z.boolean().describe(
    "Optional. Configuration for the Portals settings.",
  ).optional(),
  properties: z.object({
    property: z.array(z.object({
      name: z.string().describe("The property key").optional(),
      value: z.string().describe("The property value").optional(),
    })).describe("List of all properties in the object").optional(),
  }).describe(
    "Message for compatibility with legacy Edge specification for Java Properties object in JSON.",
  ).optional(),
  runtimeDatabaseEncryptionKeyName: z.string().describe(
    'Optional. Cloud KMS key name used for encrypting the data that is stored and replicated across runtime instances. Update is not allowed after the organization is created. If not specified or [RuntimeType](#RuntimeType) is `TRIAL`, a Google-Managed encryption key will be used. For example: "projects/foo/locations/us/keyRings/bar/cryptoKeys/baz". **Note:** Not supported for Apigee hybrid.',
  ).optional(),
  runtimeType: z.enum(["RUNTIME_TYPE_UNSPECIFIED", "CLOUD", "HYBRID"]).describe(
    "Required. Runtime type of the Apigee organization based on the Apigee subscription purchased.",
  ).optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "TYPE_TRIAL", "TYPE_PAID", "TYPE_INTERNAL"])
    .describe("Not used by Apigee.").optional(),
  parent: z.string().describe(
    "Required. Name of the Google Cloud project in which to associate the Apigee organization. Pass the information as a query parameter using the following structure in your request: `projects/`",
  ).optional(),
});

const StateSchema = z.object({
  addonsConfig: z.object({
    advancedApiOpsConfig: z.object({
      enabled: z.boolean(),
    }),
    analyticsConfig: z.object({
      enabled: z.boolean(),
      expireTimeMillis: z.string(),
      state: z.string(),
      updateTime: z.string(),
    }),
    apiSecurityConfig: z.object({
      enabled: z.boolean(),
      expiresAt: z.string(),
    }),
    connectorsPlatformConfig: z.object({
      enabled: z.boolean(),
      expiresAt: z.string(),
    }),
    integrationConfig: z.object({
      enabled: z.boolean(),
    }),
    monetizationConfig: z.object({
      enabled: z.boolean(),
    }),
  }).optional(),
  analyticsRegion: z.string().optional(),
  apiConsumerDataEncryptionKeyName: z.string().optional(),
  apiConsumerDataLocation: z.string().optional(),
  apigeeProjectId: z.string().optional(),
  attributes: z.array(z.string()).optional(),
  authorizedNetwork: z.string().optional(),
  billingType: z.string().optional(),
  caCertificate: z.string().optional(),
  caCertificates: z.array(z.string()).optional(),
  controlPlaneEncryptionKeyName: z.string().optional(),
  createdAt: z.string().optional(),
  customerName: z.string().optional(),
  description: z.string().optional(),
  disableVpcPeering: z.boolean().optional(),
  displayName: z.string().optional(),
  environments: z.array(z.string()).optional(),
  expiresAt: z.string().optional(),
  lastModifiedAt: z.string().optional(),
  name: z.string(),
  networkEgressRestricted: z.boolean().optional(),
  portalDisabled: z.boolean().optional(),
  projectId: z.string().optional(),
  properties: z.object({
    property: z.array(z.object({
      name: z.string(),
      value: z.string(),
    })),
  }).optional(),
  runtimeDatabaseEncryptionKeyName: z.string().optional(),
  runtimeType: z.string().optional(),
  state: z.string().optional(),
  subscriptionPlan: z.string().optional(),
  subscriptionType: z.string().optional(),
  type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  addonsConfig: z.object({
    advancedApiOpsConfig: z.object({
      enabled: z.boolean().describe(
        "Flag that specifies whether the Advanced API Ops add-on is enabled.",
      ).optional(),
    }).describe("Configuration for the Advanced API Ops add-on.").optional(),
    analyticsConfig: z.object({
      enabled: z.boolean().describe("Whether the Analytics add-on is enabled.")
        .optional(),
      expireTimeMillis: z.string().describe(
        "Output only. Time at which the Analytics add-on expires in milliseconds since epoch. If unspecified, the add-on will never expire.",
      ).optional(),
      state: z.enum([
        "ADDON_STATE_UNSPECIFIED",
        "ENABLING",
        "ENABLED",
        "DISABLING",
        "DISABLED",
      ]).describe("Output only. The state of the Analytics add-on.").optional(),
      updateTime: z.string().describe("Output only. The latest update time.")
        .optional(),
    }).describe("Configuration for the Analytics add-on.").optional(),
    apiSecurityConfig: z.object({
      enabled: z.boolean().describe(
        "Flag that specifies whether the API security add-on is enabled.",
      ).optional(),
      expiresAt: z.string().describe(
        "Output only. Time at which the API Security add-on expires in milliseconds since epoch. If unspecified, the add-on will never expire.",
      ).optional(),
    }).describe("Configurations of the API Security add-on.").optional(),
    connectorsPlatformConfig: z.object({
      enabled: z.boolean().describe(
        "Flag that specifies whether the Connectors Platform add-on is enabled.",
      ).optional(),
      expiresAt: z.string().describe(
        "Output only. Time at which the Connectors Platform add-on expires in milliseconds since epoch. If unspecified, the add-on will never expire.",
      ).optional(),
    }).describe("Configuration for the Connectors Platform add-on.").optional(),
    integrationConfig: z.object({
      enabled: z.boolean().describe(
        "Flag that specifies whether the Integration add-on is enabled.",
      ).optional(),
    }).describe("Configuration for the Integration add-on.").optional(),
    monetizationConfig: z.object({
      enabled: z.boolean().describe(
        "Flag that specifies whether the Monetization add-on is enabled.",
      ).optional(),
    }).describe("Configuration for the Monetization add-on.").optional(),
  }).describe("Add-on configurations for the Apigee organization.").optional(),
  apiConsumerDataEncryptionKeyName: z.string().describe(
    "Optional. Cloud KMS key name used for encrypting API consumer data. If not specified or [BillingType](#BillingType) is `EVALUATION`, a Google-Managed encryption key will be used. Format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`",
  ).optional(),
  apiConsumerDataLocation: z.string().describe(
    'Optional. This field is needed only for customers using non-default data residency regions. Apigee stores some control plane data only in single region. This field determines which single region Apigee should use. For example: "us-west1" when control plane is in US or "europe-west2" when control plane is in EU.',
  ).optional(),
  attributes: z.array(z.string()).describe("Not used by Apigee.").optional(),
  authorizedNetwork: z.string().describe(
    "Optional. Compute Engine network used for Service Networking to be peered with Apigee runtime instances. See [Getting started with the Service Networking API](https://cloud.google.com/service-infrastructure/docs/service-networking/getting-started). Valid only when [RuntimeType](#RuntimeType) is set to `CLOUD`. The value must be set before the creation of a runtime instance and can be updated only when there are no runtime instances. For example: `default`. When changing authorizedNetwork, you must reconfigure VPC peering. After VPC peering with previous network is deleted, [run the following command](https://cloud.google.com/sdk/gcloud/reference/services/vpc-peerings/delete): `gcloud services vpc-peerings delete --network=NETWORK`, where `NETWORK` is the name of the previous network. This will delete the previous Service Networking. Otherwise, you will get the following error: `The resource 'projects/...-tp' is already linked to another shared VPC host 'projects/...-tp`. Apigee also supports shared VPC (that is, the host network project is not the same as the one that is peering with Apigee). See [Shared VPC overview](https://cloud.google.com/vpc/docs/shared-vpc). To use a shared VPC network, use the following format: `projects/{host-project-id}/{region}/networks/{network-name}`. For example: `projects/my-sharedvpc-host/global/networks/mynetwork` **Note:** Not supported for Apigee hybrid.",
  ).optional(),
  billingType: z.enum([
    "BILLING_TYPE_UNSPECIFIED",
    "SUBSCRIPTION",
    "EVALUATION",
    "PAYG",
  ]).describe(
    "Optional. Billing type of the Apigee organization. See [Apigee pricing](https://cloud.google.com/apigee/pricing).",
  ).optional(),
  controlPlaneEncryptionKeyName: z.string().describe(
    'Optional. Cloud KMS key name used for encrypting control plane data that is stored in a multi region. Only used for the data residency region "US" or "EU". If not specified or [BillingType](#BillingType) is `EVALUATION`, a Google-Managed encryption key will be used. Format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`',
  ).optional(),
  customerName: z.string().describe("Not used by Apigee.").optional(),
  description: z.string().describe(
    "Optional. Description of the Apigee organization.",
  ).optional(),
  disableVpcPeering: z.boolean().describe(
    "Optional. Flag that specifies whether the VPC Peering through Private Google Access should be disabled between the consumer network and Apigee. Valid only when RuntimeType is set to CLOUD. Required if an authorizedNetwork on the consumer project is not provided, in which case the flag should be set to true. The value must be set before the creation of any Apigee runtime instance and can be updated only when there are no runtime instances. **Note:** Apigee will be deprecating the vpc peering model that requires you to provide 'authorizedNetwork', by making the non-peering model as the default way of provisioning Apigee organization in future. So, this will be a temporary flag to enable the transition. Not supported for Apigee hybrid.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. Display name for the Apigee organization. Unused, but reserved for future use.",
  ).optional(),
  networkEgressRestricted: z.boolean().describe(
    "Optional. Flag that specifies if internet egress is restricted for VPC Service Controls. Valid only when runtime_type is `CLOUD` and disable_vpc_peering is `true`.",
  ).optional(),
  portalDisabled: z.boolean().describe(
    "Optional. Configuration for the Portals settings.",
  ).optional(),
  properties: z.object({
    property: z.array(z.object({
      name: z.string().describe("The property key").optional(),
      value: z.string().describe("The property value").optional(),
    })).describe("List of all properties in the object").optional(),
  }).describe(
    "Message for compatibility with legacy Edge specification for Java Properties object in JSON.",
  ).optional(),
  runtimeDatabaseEncryptionKeyName: z.string().describe(
    'Optional. Cloud KMS key name used for encrypting the data that is stored and replicated across runtime instances. Update is not allowed after the organization is created. If not specified or [RuntimeType](#RuntimeType) is `TRIAL`, a Google-Managed encryption key will be used. For example: "projects/foo/locations/us/keyRings/bar/cryptoKeys/baz". **Note:** Not supported for Apigee hybrid.',
  ).optional(),
  runtimeType: z.enum(["RUNTIME_TYPE_UNSPECIFIED", "CLOUD", "HYBRID"]).describe(
    "Required. Runtime type of the Apigee organization based on the Apigee subscription purchased.",
  ).optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "TYPE_TRIAL", "TYPE_PAID", "TYPE_INTERNAL"])
    .describe("Not used by Apigee.").optional(),
  parent: z.string().describe(
    "Required. Name of the Google Cloud project in which to associate the Apigee organization. Pass the information as a query parameter using the following structure in your request: `projects/`",
  ).optional(),
});

/** Swamp extension model for Google Cloud Apigee Organizations. Registered at `@swamp/gcp/apigee/organizations`. */
export const model = {
  type: "@swamp/gcp/apigee/organizations",
  version: "2026.05.21.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Gets the profile for an Apigee organization. See [Understanding organizations...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a organizations",
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
        if (g["addonsConfig"] !== undefined) {
          body["addonsConfig"] = g["addonsConfig"];
        }
        if (g["apiConsumerDataEncryptionKeyName"] !== undefined) {
          body["apiConsumerDataEncryptionKeyName"] =
            g["apiConsumerDataEncryptionKeyName"];
        }
        if (g["apiConsumerDataLocation"] !== undefined) {
          body["apiConsumerDataLocation"] = g["apiConsumerDataLocation"];
        }
        if (g["attributes"] !== undefined) body["attributes"] = g["attributes"];
        if (g["authorizedNetwork"] !== undefined) {
          body["authorizedNetwork"] = g["authorizedNetwork"];
        }
        if (g["billingType"] !== undefined) {
          body["billingType"] = g["billingType"];
        }
        if (g["controlPlaneEncryptionKeyName"] !== undefined) {
          body["controlPlaneEncryptionKeyName"] =
            g["controlPlaneEncryptionKeyName"];
        }
        if (g["customerName"] !== undefined) {
          body["customerName"] = g["customerName"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["disableVpcPeering"] !== undefined) {
          body["disableVpcPeering"] = g["disableVpcPeering"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["networkEgressRestricted"] !== undefined) {
          body["networkEgressRestricted"] = g["networkEgressRestricted"];
        }
        if (g["portalDisabled"] !== undefined) {
          body["portalDisabled"] = g["portalDisabled"];
        }
        if (g["properties"] !== undefined) body["properties"] = g["properties"];
        if (g["runtimeDatabaseEncryptionKeyName"] !== undefined) {
          body["runtimeDatabaseEncryptionKeyName"] =
            g["runtimeDatabaseEncryptionKeyName"];
        }
        if (g["runtimeType"] !== undefined) {
          body["runtimeType"] = g["runtimeType"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["parent"] !== undefined) body["parent"] = g["parent"];
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
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
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
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
      description: "Get a organizations",
      arguments: z.object({
        identifier: z.string().describe("The name of the organizations"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
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
      description: "Update organizations attributes",
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
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["addonsConfig"] !== undefined) {
          body["addonsConfig"] = g["addonsConfig"];
        }
        if (g["apiConsumerDataEncryptionKeyName"] !== undefined) {
          body["apiConsumerDataEncryptionKeyName"] =
            g["apiConsumerDataEncryptionKeyName"];
        }
        if (g["apiConsumerDataLocation"] !== undefined) {
          body["apiConsumerDataLocation"] = g["apiConsumerDataLocation"];
        }
        if (g["attributes"] !== undefined) body["attributes"] = g["attributes"];
        if (g["authorizedNetwork"] !== undefined) {
          body["authorizedNetwork"] = g["authorizedNetwork"];
        }
        if (g["billingType"] !== undefined) {
          body["billingType"] = g["billingType"];
        }
        if (g["controlPlaneEncryptionKeyName"] !== undefined) {
          body["controlPlaneEncryptionKeyName"] =
            g["controlPlaneEncryptionKeyName"];
        }
        if (g["customerName"] !== undefined) {
          body["customerName"] = g["customerName"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["disableVpcPeering"] !== undefined) {
          body["disableVpcPeering"] = g["disableVpcPeering"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["networkEgressRestricted"] !== undefined) {
          body["networkEgressRestricted"] = g["networkEgressRestricted"];
        }
        if (g["portalDisabled"] !== undefined) {
          body["portalDisabled"] = g["portalDisabled"];
        }
        if (g["properties"] !== undefined) body["properties"] = g["properties"];
        if (g["runtimeDatabaseEncryptionKeyName"] !== undefined) {
          body["runtimeDatabaseEncryptionKeyName"] =
            g["runtimeDatabaseEncryptionKeyName"];
        }
        if (g["runtimeType"] !== undefined) {
          body["runtimeType"] = g["runtimeType"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
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
      description: "Delete the organizations",
      arguments: z.object({
        identifier: z.string().describe("The name of the organizations"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
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
      description: "Sync organizations state from GCP",
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
          params["name"] = identifier;
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
    get_control_plane_access: {
      description: "get control plane access",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "apigee.organizations.getControlPlaneAccess",
            "path": "v1/{+name}",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_deployed_ingress_config: {
      description: "get deployed ingress config",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "apigee.organizations.getDeployedIngressConfig",
            "path": "v1/{+name}",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "view": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_project_mapping: {
      description: "get project mapping",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "apigee.organizations.getProjectMapping",
            "path": "v1/{+name}:getProjectMapping",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_runtime_config: {
      description: "get runtime config",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "apigee.organizations.getRuntimeConfig",
            "path": "v1/{+name}",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_security_settings: {
      description: "get security settings",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "apigee.organizations.getSecuritySettings",
            "path": "v1/{+name}",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_sync_authorization: {
      description: "get sync authorization",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "apigee.organizations.getSyncAuthorization",
            "path": "v1/{+name}:getSyncAuthorization",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    set_addons: {
      description: "set addons",
      arguments: z.object({
        addonsConfig: z.any().optional(),
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
        params["org"] = existing["name"]?.toString() ?? g["name"]?.toString() ??
          "";
        const body: Record<string, unknown> = {};
        if (args["addonsConfig"] !== undefined) {
          body["addonsConfig"] = args["addonsConfig"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "apigee.organizations.setAddons",
            "path": "v1/{+org}:setAddons",
            "httpMethod": "POST",
            "parameterOrder": ["org"],
            "parameters": { "org": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_sync_authorization: {
      description: "set sync authorization",
      arguments: z.object({
        etag: z.any().optional(),
        identities: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["identities"] !== undefined) {
          body["identities"] = args["identities"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "apigee.organizations.setSyncAuthorization",
            "path": "v1/{+name}:setSyncAuthorization",
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
    update_control_plane_access: {
      description: "update control plane access",
      arguments: z.object({
        analyticsPublisherIdentities: z.any().optional(),
        name: z.any().optional(),
        synchronizerIdentities: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["analyticsPublisherIdentities"] !== undefined) {
          body["analyticsPublisherIdentities"] =
            args["analyticsPublisherIdentities"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["synchronizerIdentities"] !== undefined) {
          body["synchronizerIdentities"] = args["synchronizerIdentities"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "apigee.organizations.updateControlPlaneAccess",
            "path": "v1/{+name}",
            "httpMethod": "PATCH",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "updateMask": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    update_security_settings: {
      description: "update security settings",
      arguments: z.object({
        mlRetrainingFeedbackEnabled: z.any().optional(),
        name: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["mlRetrainingFeedbackEnabled"] !== undefined) {
          body["mlRetrainingFeedbackEnabled"] =
            args["mlRetrainingFeedbackEnabled"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "apigee.organizations.updateSecuritySettings",
            "path": "v1/{+name}",
            "httpMethod": "PATCH",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
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
