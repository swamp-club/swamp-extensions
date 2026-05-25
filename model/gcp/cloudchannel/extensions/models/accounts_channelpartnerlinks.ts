// Auto-generated extension model for @swamp/gcp/cloudchannel/accounts-channelpartnerlinks
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Channel Accounts.ChannelPartnerLinks.
 *
 * Entity representing a link between distributors and their indirect resellers in an n-tier resale channel.
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/channelPartnerLinks/${shortName}`;
}

const BASE_URL = "https://cloudchannel.googleapis.com/";

const GET_CONFIG = {
  "id": "cloudchannel.accounts.channelPartnerLinks.get",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "cloudchannel.accounts.channelPartnerLinks.create",
  "path": "v1/{+parent}/channelPartnerLinks",
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
  "id": "cloudchannel.accounts.channelPartnerLinks.patch",
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
  },
} as const;

const LIST_CONFIG = {
  "id": "cloudchannel.accounts.channelPartnerLinks.list",
  "path": "v1/{+parent}/channelPartnerLinks",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  channelPartnerCloudIdentityInfo: z.object({
    adminConsoleUri: z.string().describe(
      "Output only. URI of Customer's Admin console dashboard.",
    ).optional(),
    alternateEmail: z.string().describe("The alternate email.").optional(),
    customerType: z.enum(["CUSTOMER_TYPE_UNSPECIFIED", "DOMAIN", "TEAM"])
      .describe(
        "CustomerType indicates verification type needed for using services.",
      ).optional(),
    eduData: z.object({
      instituteSize: z.enum([
        "INSTITUTE_SIZE_UNSPECIFIED",
        "SIZE_1_100",
        "SIZE_101_500",
        "SIZE_501_1000",
        "SIZE_1001_2000",
        "SIZE_2001_5000",
        "SIZE_5001_10000",
        "SIZE_10001_OR_MORE",
      ]).describe("Size of the institute.").optional(),
      instituteType: z.enum(["INSTITUTE_TYPE_UNSPECIFIED", "K12", "UNIVERSITY"])
        .describe("Designated institute type of customer.").optional(),
      website: z.string().describe(
        "Web address for the edu customer's institution.",
      ).optional(),
    }).describe("Required Edu Attributes").optional(),
    isDomainVerified: z.boolean().describe(
      "Output only. Whether the domain is verified. This field is not returned for a Customer's cloud_identity_info resource. Partners can use the domains.get() method of the Workspace SDK's Directory API, or listen to the PRIMARY_DOMAIN_VERIFIED Pub/Sub event in to track domain verification of their resolve Workspace customers.",
    ).optional(),
    languageCode: z.string().describe("Language code.").optional(),
    phoneNumber: z.string().describe(
      "Phone number associated with the Cloud Identity.",
    ).optional(),
    primaryDomain: z.string().describe("Output only. The primary domain name.")
      .optional(),
  }).describe("Cloud Identity information for the Cloud Channel Customer.")
    .optional(),
  linkState: z.enum([
    "CHANNEL_PARTNER_LINK_STATE_UNSPECIFIED",
    "INVITED",
    "ACTIVE",
    "REVOKED",
    "SUSPENDED",
  ]).describe("Required. State of the channel partner link.").optional(),
  resellerCloudIdentityId: z.string().describe(
    "Required. Cloud Identity ID of the linked reseller.",
  ).optional(),
  channelPartnerLink: z.object({
    channelPartnerCloudIdentityInfo: z.object({
      adminConsoleUri: z.string().describe(
        "Output only. URI of Customer's Admin console dashboard.",
      ).optional(),
      alternateEmail: z.string().describe("The alternate email.").optional(),
      customerType: z.enum(["CUSTOMER_TYPE_UNSPECIFIED", "DOMAIN", "TEAM"])
        .describe(
          "CustomerType indicates verification type needed for using services.",
        ).optional(),
      eduData: z.object({
        instituteSize: z.enum([
          "INSTITUTE_SIZE_UNSPECIFIED",
          "SIZE_1_100",
          "SIZE_101_500",
          "SIZE_501_1000",
          "SIZE_1001_2000",
          "SIZE_2001_5000",
          "SIZE_5001_10000",
          "SIZE_10001_OR_MORE",
        ]).describe("Size of the institute.").optional(),
        instituteType: z.enum([
          "INSTITUTE_TYPE_UNSPECIFIED",
          "K12",
          "UNIVERSITY",
        ]).describe("Designated institute type of customer.").optional(),
        website: z.string().describe(
          "Web address for the edu customer's institution.",
        ).optional(),
      }).describe("Required Edu Attributes").optional(),
      isDomainVerified: z.boolean().describe(
        "Output only. Whether the domain is verified. This field is not returned for a Customer's cloud_identity_info resource. Partners can use the domains.get() method of the Workspace SDK's Directory API, or listen to the PRIMARY_DOMAIN_VERIFIED Pub/Sub event in to track domain verification of their resolve Workspace customers.",
      ).optional(),
      languageCode: z.string().describe("Language code.").optional(),
      phoneNumber: z.string().describe(
        "Phone number associated with the Cloud Identity.",
      ).optional(),
      primaryDomain: z.string().describe(
        "Output only. The primary domain name.",
      ).optional(),
    }).describe("Cloud Identity information for the Cloud Channel Customer.")
      .optional(),
    createTime: z.string().describe(
      "Output only. Timestamp of when the channel partner link is created.",
    ).optional(),
    inviteLinkUri: z.string().describe(
      "Output only. URI of the web page where partner accepts the link invitation.",
    ).optional(),
    linkState: z.enum([
      "CHANNEL_PARTNER_LINK_STATE_UNSPECIFIED",
      "INVITED",
      "ACTIVE",
      "REVOKED",
      "SUSPENDED",
    ]).describe("Required. State of the channel partner link.").optional(),
    name: z.string().describe(
      "Output only. Resource name for the channel partner link, in the format accounts/{account_id}/channelPartnerLinks/{id}.",
    ).optional(),
    publicId: z.string().describe(
      "Output only. Public identifier that a customer must use to generate a transfer token to move to this distributor-reseller combination.",
    ).optional(),
    resellerCloudIdentityId: z.string().describe(
      "Required. Cloud Identity ID of the linked reseller.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. Timestamp of when the channel partner link is updated.",
    ).optional(),
  }).describe(
    "Entity representing a link between distributors and their indirect resellers in an n-tier resale channel.",
  ).optional(),
  updateMask: z.string().describe(
    "Required. The update mask that applies to the resource. The only allowable value for an update mask is channel_partner_link.link_state.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  channelPartnerCloudIdentityInfo: z.object({
    adminConsoleUri: z.string(),
    alternateEmail: z.string(),
    customerType: z.string(),
    eduData: z.object({
      instituteSize: z.string(),
      instituteType: z.string(),
      website: z.string(),
    }),
    isDomainVerified: z.boolean(),
    languageCode: z.string(),
    phoneNumber: z.string(),
    primaryDomain: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  inviteLinkUri: z.string().optional(),
  linkState: z.string().optional(),
  name: z.string(),
  publicId: z.string().optional(),
  resellerCloudIdentityId: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  channelPartnerCloudIdentityInfo: z.object({
    adminConsoleUri: z.string().describe(
      "Output only. URI of Customer's Admin console dashboard.",
    ).optional(),
    alternateEmail: z.string().describe("The alternate email.").optional(),
    customerType: z.enum(["CUSTOMER_TYPE_UNSPECIFIED", "DOMAIN", "TEAM"])
      .describe(
        "CustomerType indicates verification type needed for using services.",
      ).optional(),
    eduData: z.object({
      instituteSize: z.enum([
        "INSTITUTE_SIZE_UNSPECIFIED",
        "SIZE_1_100",
        "SIZE_101_500",
        "SIZE_501_1000",
        "SIZE_1001_2000",
        "SIZE_2001_5000",
        "SIZE_5001_10000",
        "SIZE_10001_OR_MORE",
      ]).describe("Size of the institute.").optional(),
      instituteType: z.enum(["INSTITUTE_TYPE_UNSPECIFIED", "K12", "UNIVERSITY"])
        .describe("Designated institute type of customer.").optional(),
      website: z.string().describe(
        "Web address for the edu customer's institution.",
      ).optional(),
    }).describe("Required Edu Attributes").optional(),
    isDomainVerified: z.boolean().describe(
      "Output only. Whether the domain is verified. This field is not returned for a Customer's cloud_identity_info resource. Partners can use the domains.get() method of the Workspace SDK's Directory API, or listen to the PRIMARY_DOMAIN_VERIFIED Pub/Sub event in to track domain verification of their resolve Workspace customers.",
    ).optional(),
    languageCode: z.string().describe("Language code.").optional(),
    phoneNumber: z.string().describe(
      "Phone number associated with the Cloud Identity.",
    ).optional(),
    primaryDomain: z.string().describe("Output only. The primary domain name.")
      .optional(),
  }).describe("Cloud Identity information for the Cloud Channel Customer.")
    .optional(),
  linkState: z.enum([
    "CHANNEL_PARTNER_LINK_STATE_UNSPECIFIED",
    "INVITED",
    "ACTIVE",
    "REVOKED",
    "SUSPENDED",
  ]).describe("Required. State of the channel partner link.").optional(),
  resellerCloudIdentityId: z.string().describe(
    "Required. Cloud Identity ID of the linked reseller.",
  ).optional(),
  channelPartnerLink: z.object({
    channelPartnerCloudIdentityInfo: z.object({
      adminConsoleUri: z.string().describe(
        "Output only. URI of Customer's Admin console dashboard.",
      ).optional(),
      alternateEmail: z.string().describe("The alternate email.").optional(),
      customerType: z.enum(["CUSTOMER_TYPE_UNSPECIFIED", "DOMAIN", "TEAM"])
        .describe(
          "CustomerType indicates verification type needed for using services.",
        ).optional(),
      eduData: z.object({
        instituteSize: z.enum([
          "INSTITUTE_SIZE_UNSPECIFIED",
          "SIZE_1_100",
          "SIZE_101_500",
          "SIZE_501_1000",
          "SIZE_1001_2000",
          "SIZE_2001_5000",
          "SIZE_5001_10000",
          "SIZE_10001_OR_MORE",
        ]).describe("Size of the institute.").optional(),
        instituteType: z.enum([
          "INSTITUTE_TYPE_UNSPECIFIED",
          "K12",
          "UNIVERSITY",
        ]).describe("Designated institute type of customer.").optional(),
        website: z.string().describe(
          "Web address for the edu customer's institution.",
        ).optional(),
      }).describe("Required Edu Attributes").optional(),
      isDomainVerified: z.boolean().describe(
        "Output only. Whether the domain is verified. This field is not returned for a Customer's cloud_identity_info resource. Partners can use the domains.get() method of the Workspace SDK's Directory API, or listen to the PRIMARY_DOMAIN_VERIFIED Pub/Sub event in to track domain verification of their resolve Workspace customers.",
      ).optional(),
      languageCode: z.string().describe("Language code.").optional(),
      phoneNumber: z.string().describe(
        "Phone number associated with the Cloud Identity.",
      ).optional(),
      primaryDomain: z.string().describe(
        "Output only. The primary domain name.",
      ).optional(),
    }).describe("Cloud Identity information for the Cloud Channel Customer.")
      .optional(),
    createTime: z.string().describe(
      "Output only. Timestamp of when the channel partner link is created.",
    ).optional(),
    inviteLinkUri: z.string().describe(
      "Output only. URI of the web page where partner accepts the link invitation.",
    ).optional(),
    linkState: z.enum([
      "CHANNEL_PARTNER_LINK_STATE_UNSPECIFIED",
      "INVITED",
      "ACTIVE",
      "REVOKED",
      "SUSPENDED",
    ]).describe("Required. State of the channel partner link.").optional(),
    name: z.string().describe(
      "Output only. Resource name for the channel partner link, in the format accounts/{account_id}/channelPartnerLinks/{id}.",
    ).optional(),
    publicId: z.string().describe(
      "Output only. Public identifier that a customer must use to generate a transfer token to move to this distributor-reseller combination.",
    ).optional(),
    resellerCloudIdentityId: z.string().describe(
      "Required. Cloud Identity ID of the linked reseller.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. Timestamp of when the channel partner link is updated.",
    ).optional(),
  }).describe(
    "Entity representing a link between distributors and their indirect resellers in an n-tier resale channel.",
  ).optional(),
  updateMask: z.string().describe(
    "Required. The update mask that applies to the resource. The only allowable value for an update mask is channel_partner_link.link_state.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Channel Accounts.ChannelPartnerLinks. Registered at `@swamp/gcp/cloudchannel/accounts-channelpartnerlinks`. */
export const model = {
  type: "@swamp/gcp/cloudchannel/accounts-channelpartnerlinks",
  version: "2026.05.25.1",
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
      description:
        "Entity representing a link between distributors and their indirect resellers ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a channelPartnerLinks",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["channelPartnerCloudIdentityInfo"] !== undefined) {
          body["channelPartnerCloudIdentityInfo"] =
            g["channelPartnerCloudIdentityInfo"];
        }
        if (g["linkState"] !== undefined) body["linkState"] = g["linkState"];
        if (g["resellerCloudIdentityId"] !== undefined) {
          body["resellerCloudIdentityId"] = g["resellerCloudIdentityId"];
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
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
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a channelPartnerLinks",
      arguments: z.object({
        identifier: z.string().describe("The name of the channelPartnerLinks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
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
      description: "Update channelPartnerLinks attributes",
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
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["channelPartnerLink"] !== undefined) {
          body["channelPartnerLink"] = g["channelPartnerLink"];
        }
        if (g["updateMask"] !== undefined) body["updateMask"] = g["updateMask"];
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
      description: "Sync channelPartnerLinks state from GCP",
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
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            shortName,
          );
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
      description: "List channelPartnerLinks resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Optional. Requested page size. Server might return fewer results than requested. If unspecified, server will pick a default size (25). The maximum value is 200; the server will coerce values above 200.",
        ).optional(),
        view: z.string().describe(
          "Optional. The level of granularity the ChannelPartnerLink will display.",
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "channelPartnerLinks",
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
  },
};
