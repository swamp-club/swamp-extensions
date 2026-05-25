// Auto-generated extension model for @swamp/gcp/factchecktools/pages
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Fact Check Tools Pages.
 *
 * Holds one or more instances of `ClaimReview` markup for a webpage.
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
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://factchecktools.googleapis.com/";

const GET_CONFIG = {
  "id": "factchecktools.pages.get",
  "path": "v1alpha1/{+name}",
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
  "id": "factchecktools.pages.create",
  "path": "v1alpha1/pages",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const UPDATE_CONFIG = {
  "id": "factchecktools.pages.update",
  "path": "v1alpha1/{+name}",
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
  "id": "factchecktools.pages.delete",
  "path": "v1alpha1/{+name}",
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
  "id": "factchecktools.pages.list",
  "path": "v1alpha1/pages",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "offset": {
      "location": "query",
    },
    "organization": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "url": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  claimReviewAuthor: z.object({
    imageUrl: z.string().describe("Corresponds to `ClaimReview.author.image`.")
      .optional(),
    name: z.string().describe(
      "Name of the organization that is publishing the fact check. Corresponds to `ClaimReview.author.name`.",
    ).optional(),
  }).describe("Information about the claim review author.").optional(),
  claimReviewMarkups: z.array(z.object({
    claimAppearances: z.array(z.string()).describe(
      "A list of links to works in which this claim appears, aside from the one specified in `claim_first_appearance`. Corresponds to `ClaimReview.itemReviewed[@type=Claim].appearance.url`.",
    ).optional(),
    claimAuthor: z.object({
      imageUrl: z.string().describe(
        "Corresponds to `ClaimReview.itemReviewed.author.image`.",
      ).optional(),
      jobTitle: z.string().describe(
        "Corresponds to `ClaimReview.itemReviewed.author.jobTitle`.",
      ).optional(),
      name: z.string().describe(
        'A person or organization stating the claim. For instance, "John Doe". Corresponds to `ClaimReview.itemReviewed.author.name`.',
      ).optional(),
      sameAs: z.string().describe(
        "Corresponds to `ClaimReview.itemReviewed.author.sameAs`.",
      ).optional(),
    }).describe("Information about the claim author.").optional(),
    claimDate: z.string().describe(
      "The date when the claim was made or entered public discourse. Corresponds to `ClaimReview.itemReviewed.datePublished`.",
    ).optional(),
    claimFirstAppearance: z.string().describe(
      "A link to a work in which this claim first appears. Corresponds to `ClaimReview.itemReviewed[@type=Claim].firstAppearance.url`.",
    ).optional(),
    claimLocation: z.string().describe(
      "The location where this claim was made. Corresponds to `ClaimReview.itemReviewed.name`.",
    ).optional(),
    claimReviewed: z.string().describe(
      "A short summary of the claim being evaluated. Corresponds to `ClaimReview.claimReviewed`.",
    ).optional(),
    rating: z.object({
      bestRating: z.number().int().describe(
        "For numeric ratings, the best value possible in the scale from worst to best. Corresponds to `ClaimReview.reviewRating.bestRating`.",
      ).optional(),
      imageUrl: z.string().describe(
        "Corresponds to `ClaimReview.reviewRating.image`.",
      ).optional(),
      ratingExplanation: z.string().describe(
        "Corresponds to `ClaimReview.reviewRating.ratingExplanation`.",
      ).optional(),
      ratingValue: z.number().int().describe(
        "A numeric rating of this claim, in the range worstRating — bestRating inclusive. Corresponds to `ClaimReview.reviewRating.ratingValue`.",
      ).optional(),
      textualRating: z.string().describe(
        "The truthfulness rating as a human-readible short word or phrase. Corresponds to `ClaimReview.reviewRating.alternateName`.",
      ).optional(),
      worstRating: z.number().int().describe(
        "For numeric ratings, the worst value possible in the scale from worst to best. Corresponds to `ClaimReview.reviewRating.worstRating`.",
      ).optional(),
    }).describe("Information about the claim rating.").optional(),
    url: z.string().describe(
      'This field is optional, and will default to the page URL. We provide this field to allow you the override the default value, but the only permitted override is the page URL plus an optional anchor link ("page jump"). Corresponds to `ClaimReview.url`',
    ).optional(),
  })).describe(
    "A list of individual claim reviews for this page. Each item in the list corresponds to one `ClaimReview` element.",
  ).optional(),
  name: z.string().describe(
    "The name of this `ClaimReview` markup page resource, in the form of `pages/{page_id}`. Except for update requests, this field is output-only and should not be set by the user.",
  ).optional(),
  pageUrl: z.string().describe(
    "The URL of the page associated with this `ClaimReview` markup. While every individual `ClaimReview` has its own URL field, semantically this is a page-level field, and each `ClaimReview` on this page will use this value unless individually overridden. Corresponds to `ClaimReview.url`",
  ).optional(),
  publishDate: z.string().describe(
    "The date when the fact check was published. Similar to the URL, semantically this is a page-level field, and each `ClaimReview` on this page will contain the same value. Corresponds to `ClaimReview.datePublished`",
  ).optional(),
  versionId: z.string().describe(
    "The version ID for this markup. Except for update requests, this field is output-only and should not be set by the user.",
  ).optional(),
});

const StateSchema = z.object({
  claimReviewAuthor: z.object({
    imageUrl: z.string(),
    name: z.string(),
  }).optional(),
  claimReviewMarkups: z.array(z.object({
    claimAppearances: z.array(z.string()),
    claimAuthor: z.object({
      imageUrl: z.string(),
      jobTitle: z.string(),
      name: z.string(),
      sameAs: z.string(),
    }),
    claimDate: z.string(),
    claimFirstAppearance: z.string(),
    claimLocation: z.string(),
    claimReviewed: z.string(),
    rating: z.object({
      bestRating: z.number(),
      imageUrl: z.string(),
      ratingExplanation: z.string(),
      ratingValue: z.number(),
      textualRating: z.string(),
      worstRating: z.number(),
    }),
    url: z.string(),
  })).optional(),
  name: z.string(),
  pageUrl: z.string().optional(),
  publishDate: z.string().optional(),
  versionId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  claimReviewAuthor: z.object({
    imageUrl: z.string().describe("Corresponds to `ClaimReview.author.image`.")
      .optional(),
    name: z.string().describe(
      "Name of the organization that is publishing the fact check. Corresponds to `ClaimReview.author.name`.",
    ).optional(),
  }).describe("Information about the claim review author.").optional(),
  claimReviewMarkups: z.array(z.object({
    claimAppearances: z.array(z.string()).describe(
      "A list of links to works in which this claim appears, aside from the one specified in `claim_first_appearance`. Corresponds to `ClaimReview.itemReviewed[@type=Claim].appearance.url`.",
    ).optional(),
    claimAuthor: z.object({
      imageUrl: z.string().describe(
        "Corresponds to `ClaimReview.itemReviewed.author.image`.",
      ).optional(),
      jobTitle: z.string().describe(
        "Corresponds to `ClaimReview.itemReviewed.author.jobTitle`.",
      ).optional(),
      name: z.string().describe(
        'A person or organization stating the claim. For instance, "John Doe". Corresponds to `ClaimReview.itemReviewed.author.name`.',
      ).optional(),
      sameAs: z.string().describe(
        "Corresponds to `ClaimReview.itemReviewed.author.sameAs`.",
      ).optional(),
    }).describe("Information about the claim author.").optional(),
    claimDate: z.string().describe(
      "The date when the claim was made or entered public discourse. Corresponds to `ClaimReview.itemReviewed.datePublished`.",
    ).optional(),
    claimFirstAppearance: z.string().describe(
      "A link to a work in which this claim first appears. Corresponds to `ClaimReview.itemReviewed[@type=Claim].firstAppearance.url`.",
    ).optional(),
    claimLocation: z.string().describe(
      "The location where this claim was made. Corresponds to `ClaimReview.itemReviewed.name`.",
    ).optional(),
    claimReviewed: z.string().describe(
      "A short summary of the claim being evaluated. Corresponds to `ClaimReview.claimReviewed`.",
    ).optional(),
    rating: z.object({
      bestRating: z.number().int().describe(
        "For numeric ratings, the best value possible in the scale from worst to best. Corresponds to `ClaimReview.reviewRating.bestRating`.",
      ).optional(),
      imageUrl: z.string().describe(
        "Corresponds to `ClaimReview.reviewRating.image`.",
      ).optional(),
      ratingExplanation: z.string().describe(
        "Corresponds to `ClaimReview.reviewRating.ratingExplanation`.",
      ).optional(),
      ratingValue: z.number().int().describe(
        "A numeric rating of this claim, in the range worstRating — bestRating inclusive. Corresponds to `ClaimReview.reviewRating.ratingValue`.",
      ).optional(),
      textualRating: z.string().describe(
        "The truthfulness rating as a human-readible short word or phrase. Corresponds to `ClaimReview.reviewRating.alternateName`.",
      ).optional(),
      worstRating: z.number().int().describe(
        "For numeric ratings, the worst value possible in the scale from worst to best. Corresponds to `ClaimReview.reviewRating.worstRating`.",
      ).optional(),
    }).describe("Information about the claim rating.").optional(),
    url: z.string().describe(
      'This field is optional, and will default to the page URL. We provide this field to allow you the override the default value, but the only permitted override is the page URL plus an optional anchor link ("page jump"). Corresponds to `ClaimReview.url`',
    ).optional(),
  })).describe(
    "A list of individual claim reviews for this page. Each item in the list corresponds to one `ClaimReview` element.",
  ).optional(),
  name: z.string().describe(
    "The name of this `ClaimReview` markup page resource, in the form of `pages/{page_id}`. Except for update requests, this field is output-only and should not be set by the user.",
  ).optional(),
  pageUrl: z.string().describe(
    "The URL of the page associated with this `ClaimReview` markup. While every individual `ClaimReview` has its own URL field, semantically this is a page-level field, and each `ClaimReview` on this page will use this value unless individually overridden. Corresponds to `ClaimReview.url`",
  ).optional(),
  publishDate: z.string().describe(
    "The date when the fact check was published. Similar to the URL, semantically this is a page-level field, and each `ClaimReview` on this page will contain the same value. Corresponds to `ClaimReview.datePublished`",
  ).optional(),
  versionId: z.string().describe(
    "The version ID for this markup. Except for update requests, this field is output-only and should not be set by the user.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Fact Check Tools Pages. Registered at `@swamp/gcp/factchecktools/pages`. */
export const model = {
  type: "@swamp/gcp/factchecktools/pages",
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
        "Holds one or more instances of `ClaimReview` markup for a webpage.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a pages",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["claimReviewAuthor"] !== undefined) {
          body["claimReviewAuthor"] = g["claimReviewAuthor"];
        }
        if (g["claimReviewMarkups"] !== undefined) {
          body["claimReviewMarkups"] = g["claimReviewMarkups"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["pageUrl"] !== undefined) body["pageUrl"] = g["pageUrl"];
        if (g["publishDate"] !== undefined) {
          body["publishDate"] = g["publishDate"];
        }
        if (g["versionId"] !== undefined) body["versionId"] = g["versionId"];
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {},
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
      description: "Get a pages",
      arguments: z.object({
        identifier: z.string().describe("The name of the pages"),
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
      description: "Update pages attributes",
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
        if (g["claimReviewAuthor"] !== undefined) {
          body["claimReviewAuthor"] = g["claimReviewAuthor"];
        }
        if (g["claimReviewMarkups"] !== undefined) {
          body["claimReviewMarkups"] = g["claimReviewMarkups"];
        }
        if (g["pageUrl"] !== undefined) body["pageUrl"] = g["pageUrl"];
        if (g["publishDate"] !== undefined) {
          body["publishDate"] = g["publishDate"];
        }
        if (g["versionId"] !== undefined) body["versionId"] = g["versionId"];
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
      description: "Delete the pages",
      arguments: z.object({
        identifier: z.string().describe("The name of the pages"),
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
      description: "Sync pages state from GCP",
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
    list: {
      description: "List pages resources",
      arguments: z.object({
        offset: z.number().describe(
          "An integer that specifies the current offset (that is, starting result location) in search results. This field is only considered if `page_token` is unset, and if the request is not for a specific URL. For example, 0 means to return results starting from the first matching result, and 10 means to return from the 11th result.",
        ).optional(),
        organization: z.string().describe(
          'The organization for which we want to fetch markups for. For instance, "site.com". Cannot be specified along with an URL.',
        ).optional(),
        pageSize: z.number().describe(
          "The pagination size. We will return up to that many results. Defaults to 10 if not set. Has no effect if a URL is requested.",
        ).optional(),
        url: z.string().describe(
          "The URL from which to get `ClaimReview` markup. There will be at most one result. If markup is associated with a more canonical version of the URL provided, we will return that URL instead. Cannot be specified along with an organization.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (args["offset"] !== undefined) {
          params["offset"] = String(args["offset"]);
        }
        if (args["organization"] !== undefined) {
          params["organization"] = String(args["organization"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["url"] !== undefined) params["url"] = String(args["url"]);
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "claimReviewMarkupPages",
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
