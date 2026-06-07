// Auto-generated extension model for @swamp/gcp/authorizedbuyersmarketplace/buyers-proposals
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Authorized Buyers Marketplace Buyers.Proposals.
 *
 * Represents a proposal in the Marketplace. A proposal is the unit of negotiation between a seller and a buyer.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/proposals/${shortName}`;
}

const BASE_URL = "https://authorizedbuyersmarketplace.googleapis.com/";

const GET_CONFIG = {
  "id": "authorizedbuyersmarketplace.buyers.proposals.get",
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

const PATCH_CONFIG = {
  "id": "authorizedbuyersmarketplace.buyers.proposals.patch",
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
  "id": "authorizedbuyersmarketplace.buyers.proposals.list",
  "path": "v1/{+parent}/proposals",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
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
  billedBuyer: z.string().describe(
    "Output only. When the client field is populated, this field refers to the buyer who creates and manages the client buyer and gets billed on behalf of the client buyer; when the buyer field is populated, this field is the same value as buyer. Format: `buyers/{buyerAccountId}`",
  ).optional(),
  buyer: z.string().describe(
    "Output only. Refers to a buyer in The Realtime-bidding API. Format: `buyers/{buyerAccountId}`",
  ).optional(),
  buyerContacts: z.array(z.object({
    displayName: z.string().describe("The display_name of the contact.")
      .optional(),
    email: z.string().describe("Email address for the contact.").optional(),
  })).describe("Contact information for the buyer.").optional(),
  buyerPrivateData: z.object({
    referenceId: z.string().describe(
      "A buyer specified reference ID. This can be queried in the list operations (max-length: 1024 unicode code units).",
    ).optional(),
  }).describe(
    "Buyers are allowed to store certain types of private data in a proposal.",
  ).optional(),
  client: z.string().describe(
    "Output only. Refers to a Client. Format: `buyers/{buyerAccountId}/clients/{clientAccountid}`",
  ).optional(),
  dealType: z.enum([
    "DEAL_TYPE_UNSPECIFIED",
    "PREFERRED_DEAL",
    "PRIVATE_AUCTION",
    "PROGRAMMATIC_GUARANTEED",
  ]).describe("Output only. Type of deal the proposal contains.").optional(),
  displayName: z.string().describe(
    "Output only. The descriptive name for the proposal. Maximum length of 255 unicode characters is allowed. Control characters are not allowed. Buyers cannot update this field. Note: Not to be confused with name, which is a unique identifier of the proposal.",
  ).optional(),
  isRenegotiating: z.boolean().describe(
    "Output only. True if the proposal was previously finalized and is now being renegotiated.",
  ).optional(),
  lastUpdaterOrCommentorRole: z.enum([
    "BUYER_SELLER_ROLE_UNSPECIFIED",
    "BUYER",
    "SELLER",
  ]).describe(
    "Output only. The role of the last user that either updated the proposal or left a comment.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The name of the proposal serving as a unique identifier. Format: buyers/{accountId}/proposals/{proposalId}",
  ).optional(),
  notes: z.array(z.object({
    createTime: z.string().describe("Output only. When this note was created.")
      .optional(),
    creatorRole: z.enum(["BUYER_SELLER_ROLE_UNSPECIFIED", "BUYER", "SELLER"])
      .describe("Output only. The role who created the note.").optional(),
    note: z.string().describe(
      "The text of the note. Maximum length is 1024 characters.",
    ).optional(),
  })).describe(
    "A list of notes from the buyer and the seller attached to this proposal.",
  ).optional(),
  originatorRole: z.enum(["BUYER_SELLER_ROLE_UNSPECIFIED", "BUYER", "SELLER"])
    .describe(
      "Output only. Indicates whether the buyer/seller created the proposal.",
    ).optional(),
  pausingConsented: z.boolean().describe(
    "Whether pausing is allowed for the proposal. This is a negotiable term between buyers and publishers.",
  ).optional(),
  proposalRevision: z.string().describe(
    "Output only. The revision number for the proposal. Each update to the proposal or deal causes the proposal revision number to auto-increment. The buyer keeps track of the last revision number they know of and pass it in when making an update. If the head revision number on the server has since incremented, then an ABORTED error is returned during the update operation to let the buyer know that a subsequent update was made.",
  ).optional(),
  publisherProfile: z.string().describe(
    "Immutable. Reference to the seller on the proposal. Format: `buyers/{buyerAccountId}/publisherProfiles/{publisherProfileId}` Note: This field may be set only when creating the resource. Modifying this field while updating the resource will result in an error.",
  ).optional(),
  sellerContacts: z.array(z.object({
    displayName: z.string().describe("The display_name of the contact.")
      .optional(),
    email: z.string().describe("Email address for the contact.").optional(),
  })).describe("Output only. Contact information for the seller.").optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "BUYER_REVIEW_REQUESTED",
    "SELLER_REVIEW_REQUESTED",
    "BUYER_ACCEPTANCE_REQUESTED",
    "FINALIZED",
    "TERMINATED",
  ]).describe("Output only. Indicates the state of the proposal.").optional(),
  termsAndConditions: z.string().describe(
    "Output only. The terms and conditions associated with this proposal. Accepting a proposal implies acceptance of this field. This is created by the seller, the buyer can only view it.",
  ).optional(),
  updateTime: z.string().describe(
    "Output only. The time when the proposal was last revised.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  billedBuyer: z.string().optional(),
  buyer: z.string().optional(),
  buyerContacts: z.array(z.object({
    displayName: z.string(),
    email: z.string(),
  })).optional(),
  buyerPrivateData: z.object({
    referenceId: z.string(),
  }).optional(),
  client: z.string().optional(),
  dealType: z.string().optional(),
  displayName: z.string().optional(),
  isRenegotiating: z.boolean().optional(),
  lastUpdaterOrCommentorRole: z.string().optional(),
  name: z.string(),
  notes: z.array(z.object({
    createTime: z.string(),
    creatorRole: z.string(),
    note: z.string(),
  })).optional(),
  originatorRole: z.string().optional(),
  pausingConsented: z.boolean().optional(),
  proposalRevision: z.string().optional(),
  publisherProfile: z.string().optional(),
  sellerContacts: z.array(z.object({
    displayName: z.string(),
    email: z.string(),
  })).optional(),
  state: z.string().optional(),
  termsAndConditions: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  billedBuyer: z.string().describe(
    "Output only. When the client field is populated, this field refers to the buyer who creates and manages the client buyer and gets billed on behalf of the client buyer; when the buyer field is populated, this field is the same value as buyer. Format: `buyers/{buyerAccountId}`",
  ).optional(),
  buyer: z.string().describe(
    "Output only. Refers to a buyer in The Realtime-bidding API. Format: `buyers/{buyerAccountId}`",
  ).optional(),
  buyerContacts: z.array(z.object({
    displayName: z.string().describe("The display_name of the contact.")
      .optional(),
    email: z.string().describe("Email address for the contact.").optional(),
  })).describe("Contact information for the buyer.").optional(),
  buyerPrivateData: z.object({
    referenceId: z.string().describe(
      "A buyer specified reference ID. This can be queried in the list operations (max-length: 1024 unicode code units).",
    ).optional(),
  }).describe(
    "Buyers are allowed to store certain types of private data in a proposal.",
  ).optional(),
  client: z.string().describe(
    "Output only. Refers to a Client. Format: `buyers/{buyerAccountId}/clients/{clientAccountid}`",
  ).optional(),
  dealType: z.enum([
    "DEAL_TYPE_UNSPECIFIED",
    "PREFERRED_DEAL",
    "PRIVATE_AUCTION",
    "PROGRAMMATIC_GUARANTEED",
  ]).describe("Output only. Type of deal the proposal contains.").optional(),
  displayName: z.string().describe(
    "Output only. The descriptive name for the proposal. Maximum length of 255 unicode characters is allowed. Control characters are not allowed. Buyers cannot update this field. Note: Not to be confused with name, which is a unique identifier of the proposal.",
  ).optional(),
  isRenegotiating: z.boolean().describe(
    "Output only. True if the proposal was previously finalized and is now being renegotiated.",
  ).optional(),
  lastUpdaterOrCommentorRole: z.enum([
    "BUYER_SELLER_ROLE_UNSPECIFIED",
    "BUYER",
    "SELLER",
  ]).describe(
    "Output only. The role of the last user that either updated the proposal or left a comment.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The name of the proposal serving as a unique identifier. Format: buyers/{accountId}/proposals/{proposalId}",
  ).optional(),
  notes: z.array(z.object({
    createTime: z.string().describe("Output only. When this note was created.")
      .optional(),
    creatorRole: z.enum(["BUYER_SELLER_ROLE_UNSPECIFIED", "BUYER", "SELLER"])
      .describe("Output only. The role who created the note.").optional(),
    note: z.string().describe(
      "The text of the note. Maximum length is 1024 characters.",
    ).optional(),
  })).describe(
    "A list of notes from the buyer and the seller attached to this proposal.",
  ).optional(),
  originatorRole: z.enum(["BUYER_SELLER_ROLE_UNSPECIFIED", "BUYER", "SELLER"])
    .describe(
      "Output only. Indicates whether the buyer/seller created the proposal.",
    ).optional(),
  pausingConsented: z.boolean().describe(
    "Whether pausing is allowed for the proposal. This is a negotiable term between buyers and publishers.",
  ).optional(),
  proposalRevision: z.string().describe(
    "Output only. The revision number for the proposal. Each update to the proposal or deal causes the proposal revision number to auto-increment. The buyer keeps track of the last revision number they know of and pass it in when making an update. If the head revision number on the server has since incremented, then an ABORTED error is returned during the update operation to let the buyer know that a subsequent update was made.",
  ).optional(),
  publisherProfile: z.string().describe(
    "Immutable. Reference to the seller on the proposal. Format: `buyers/{buyerAccountId}/publisherProfiles/{publisherProfileId}` Note: This field may be set only when creating the resource. Modifying this field while updating the resource will result in an error.",
  ).optional(),
  sellerContacts: z.array(z.object({
    displayName: z.string().describe("The display_name of the contact.")
      .optional(),
    email: z.string().describe("Email address for the contact.").optional(),
  })).describe("Output only. Contact information for the seller.").optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "BUYER_REVIEW_REQUESTED",
    "SELLER_REVIEW_REQUESTED",
    "BUYER_ACCEPTANCE_REQUESTED",
    "FINALIZED",
    "TERMINATED",
  ]).describe("Output only. Indicates the state of the proposal.").optional(),
  termsAndConditions: z.string().describe(
    "Output only. The terms and conditions associated with this proposal. Accepting a proposal implies acceptance of this field. This is created by the seller, the buyer can only view it.",
  ).optional(),
  updateTime: z.string().describe(
    "Output only. The time when the proposal was last revised.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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

/** Swamp extension model for Google Cloud Authorized Buyers Marketplace Buyers.Proposals. Registered at `@swamp/gcp/authorizedbuyersmarketplace/buyers-proposals`. */
export const model = {
  type: "@swamp/gcp/authorizedbuyersmarketplace/buyers-proposals",
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
        "Represents a proposal in the Marketplace. A proposal is the unit of negotiati...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a proposals",
      arguments: z.object({
        identifier: z.string().describe("The name of the proposals"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Update proposals attributes",
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
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["billedBuyer"] !== undefined) {
          body["billedBuyer"] = g["billedBuyer"];
        }
        if (g["buyer"] !== undefined) body["buyer"] = g["buyer"];
        if (g["buyerContacts"] !== undefined) {
          body["buyerContacts"] = g["buyerContacts"];
        }
        if (g["buyerPrivateData"] !== undefined) {
          body["buyerPrivateData"] = g["buyerPrivateData"];
        }
        if (g["client"] !== undefined) body["client"] = g["client"];
        if (g["dealType"] !== undefined) body["dealType"] = g["dealType"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["isRenegotiating"] !== undefined) {
          body["isRenegotiating"] = g["isRenegotiating"];
        }
        if (g["lastUpdaterOrCommentorRole"] !== undefined) {
          body["lastUpdaterOrCommentorRole"] = g["lastUpdaterOrCommentorRole"];
        }
        if (g["notes"] !== undefined) body["notes"] = g["notes"];
        if (g["originatorRole"] !== undefined) {
          body["originatorRole"] = g["originatorRole"];
        }
        if (g["pausingConsented"] !== undefined) {
          body["pausingConsented"] = g["pausingConsented"];
        }
        if (g["proposalRevision"] !== undefined) {
          body["proposalRevision"] = g["proposalRevision"];
        }
        if (g["publisherProfile"] !== undefined) {
          body["publisherProfile"] = g["publisherProfile"];
        }
        if (g["sellerContacts"] !== undefined) {
          body["sellerContacts"] = g["sellerContacts"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["termsAndConditions"] !== undefined) {
          body["termsAndConditions"] = g["termsAndConditions"];
        }
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
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
    sync: {
      description: "Sync proposals state from GCP",
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
            String(g["parent"] ?? ""),
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
      description: "List proposals resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional query string using the [Cloud API list filtering syntax](https://developers.google.com/authorized-buyers/apis/guides/list-filters) Supported columns for filtering are: * displayName * dealType * updateTime * state",
        ).optional(),
        pageSize: z.number().describe(
          "Requested page size. The server may return fewer results than requested. If unspecified, the server will put a size of 500.",
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "proposals",
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
    accept: {
      description: "accept",
      arguments: z.object({
        proposalRevision: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["proposalRevision"] !== undefined) {
          body["proposalRevision"] = args["proposalRevision"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "authorizedbuyersmarketplace.buyers.proposals.accept",
            "path": "v1/{+name}:accept",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    add_note: {
      description: "add note",
      arguments: z.object({
        note: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        params["proposal"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["note"] !== undefined) body["note"] = args["note"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "authorizedbuyersmarketplace.buyers.proposals.addNote",
            "path": "v1/{+proposal}:addNote",
            "httpMethod": "POST",
            "parameterOrder": ["proposal"],
            "parameters": {
              "proposal": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    cancel_negotiation: {
      description: "cancel negotiation",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        params["proposal"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "authorizedbuyersmarketplace.buyers.proposals.cancelNegotiation",
            "path": "v1/{+proposal}:cancelNegotiation",
            "httpMethod": "POST",
            "parameterOrder": ["proposal"],
            "parameters": {
              "proposal": { "location": "path", "required": true },
            },
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
    send_rfp: {
      description: "send rfp",
      arguments: z.object({
        buyerContacts: z.any().optional(),
        client: z.any().optional(),
        displayName: z.any().optional(),
        estimatedGrossSpend: z.any().optional(),
        flightEndTime: z.any().optional(),
        flightStartTime: z.any().optional(),
        geoTargeting: z.any().optional(),
        inventorySizeTargeting: z.any().optional(),
        note: z.any().optional(),
        preferredDealTerms: z.any().optional(),
        programmaticGuaranteedTerms: z.any().optional(),
        publisherProfile: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["buyer"] !== undefined) params["buyer"] = String(g["buyer"]);
        const body: Record<string, unknown> = {};
        if (args["buyerContacts"] !== undefined) {
          body["buyerContacts"] = args["buyerContacts"];
        }
        if (args["client"] !== undefined) body["client"] = args["client"];
        if (args["displayName"] !== undefined) {
          body["displayName"] = args["displayName"];
        }
        if (args["estimatedGrossSpend"] !== undefined) {
          body["estimatedGrossSpend"] = args["estimatedGrossSpend"];
        }
        if (args["flightEndTime"] !== undefined) {
          body["flightEndTime"] = args["flightEndTime"];
        }
        if (args["flightStartTime"] !== undefined) {
          body["flightStartTime"] = args["flightStartTime"];
        }
        if (args["geoTargeting"] !== undefined) {
          body["geoTargeting"] = args["geoTargeting"];
        }
        if (args["inventorySizeTargeting"] !== undefined) {
          body["inventorySizeTargeting"] = args["inventorySizeTargeting"];
        }
        if (args["note"] !== undefined) body["note"] = args["note"];
        if (args["preferredDealTerms"] !== undefined) {
          body["preferredDealTerms"] = args["preferredDealTerms"];
        }
        if (args["programmaticGuaranteedTerms"] !== undefined) {
          body["programmaticGuaranteedTerms"] =
            args["programmaticGuaranteedTerms"];
        }
        if (args["publisherProfile"] !== undefined) {
          body["publisherProfile"] = args["publisherProfile"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "authorizedbuyersmarketplace.buyers.proposals.sendRfp",
            "path": "v1/{+buyer}/proposals:sendRfp",
            "httpMethod": "POST",
            "parameterOrder": ["buyer"],
            "parameters": { "buyer": { "location": "path", "required": true } },
          },
          params,
          body,
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
