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

// Auto-generated extension model for @swamp/gcp/blogger/posts
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Blogger Posts.
 *
 * Gets a post by blog id and post id
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

const BASE_URL = "https://blogger.googleapis.com/";

const GET_CONFIG = {
  "id": "blogger.posts.get",
  "path": "v3/blogs/{blogId}/posts/{postId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "blogId",
    "postId",
  ],
  "parameters": {
    "blogId": {
      "location": "path",
      "required": true,
    },
    "fetchBody": {
      "location": "query",
    },
    "fetchImages": {
      "location": "query",
    },
    "maxComments": {
      "location": "query",
    },
    "postId": {
      "location": "path",
      "required": true,
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "blogger.posts.insert",
  "path": "v3/blogs/{blogId}/posts",
  "httpMethod": "POST",
  "parameterOrder": [
    "blogId",
  ],
  "parameters": {
    "blogId": {
      "location": "path",
      "required": true,
    },
    "fetchBody": {
      "location": "query",
    },
    "fetchImages": {
      "location": "query",
    },
    "isDraft": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "blogger.posts.update",
  "path": "v3/blogs/{blogId}/posts/{postId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "blogId",
    "postId",
  ],
  "parameters": {
    "blogId": {
      "location": "path",
      "required": true,
    },
    "fetchBody": {
      "location": "query",
    },
    "fetchImages": {
      "location": "query",
    },
    "maxComments": {
      "location": "query",
    },
    "postId": {
      "location": "path",
      "required": true,
    },
    "publish": {
      "location": "query",
    },
    "revert": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "blogger.posts.delete",
  "path": "v3/blogs/{blogId}/posts/{postId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "blogId",
    "postId",
  ],
  "parameters": {
    "blogId": {
      "location": "path",
      "required": true,
    },
    "postId": {
      "location": "path",
      "required": true,
    },
    "useTrash": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "blogger.posts.list",
  "path": "v3/blogs/{blogId}/posts",
  "httpMethod": "GET",
  "parameterOrder": [
    "blogId",
  ],
  "parameters": {
    "blogId": {
      "location": "path",
      "required": true,
    },
    "endDate": {
      "location": "query",
    },
    "fetchBodies": {
      "location": "query",
    },
    "fetchImages": {
      "location": "query",
    },
    "labels": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "sortOption": {
      "location": "query",
    },
    "startDate": {
      "location": "query",
    },
    "status": {
      "location": "query",
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const _defaultOAuthScopes: string[] = [
  "https://www.googleapis.com/auth/blogger",
  "https://www.googleapis.com/auth/blogger.readonly",
];

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
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
  author: z.object({
    displayName: z.string().describe("The display name.").optional(),
    id: z.string().describe("The identifier of the creator.").optional(),
    image: z.object({
      url: z.string().describe("The creator's avatar URL.").optional(),
    }).describe("The creator's avatar.").optional(),
    url: z.string().describe("The URL of the creator's Profile page.")
      .optional(),
  }).describe("The author of this Post.").optional(),
  blog: z.object({
    id: z.string().describe(
      "The identifier of the Blog that contains this Post.",
    ).optional(),
  }).describe("Data about the blog containing this Post.").optional(),
  content: z.string().describe(
    "The content of the Post. May contain HTML markup.",
  ).optional(),
  id: z.string().describe("The identifier of this Post.").optional(),
  images: z.array(z.object({
    url: z.string().optional(),
  })).describe("Display image for the Post.").optional(),
  labels: z.array(z.string()).describe(
    "The list of labels this Post was tagged with.",
  ).optional(),
  location: z.object({
    lat: z.number().describe("Location's latitude.").optional(),
    lng: z.number().describe("Location's longitude.").optional(),
    name: z.string().describe("Location name.").optional(),
    span: z.string().describe(
      "Location's viewport span. Can be used when rendering a map preview.",
    ).optional(),
  }).describe("The location for geotagged posts.").optional(),
  published: z.string().describe(
    "RFC 3339 date-time when this Post was published.",
  ).optional(),
  readerComments: z.enum([
    "ALLOW",
    "DONT_ALLOW_SHOW_EXISTING",
    "DONT_ALLOW_HIDE_EXISTING",
  ]).describe("Comment control and display setting for readers of this post.")
    .optional(),
  replies: z.object({
    items: z.array(z.object({
      author: z.object({
        displayName: z.string().describe("The display name.").optional(),
        id: z.string().describe("The identifier of the creator.").optional(),
        image: z.object({
          url: z.unknown().describe("The creator's avatar URL.").optional(),
        }).describe("The creator's avatar.").optional(),
        url: z.string().describe("The URL of the creator's Profile page.")
          .optional(),
      }).describe("The author of this Comment.").optional(),
      blog: z.object({
        id: z.string().describe(
          "The identifier of the blog containing this comment.",
        ).optional(),
      }).describe("Data about the blog containing this comment.").optional(),
      content: z.string().describe(
        "The actual content of the comment. May include HTML markup.",
      ).optional(),
      id: z.string().describe("The identifier for this resource.").optional(),
      inReplyTo: z.object({
        id: z.string().describe("The identified of the parent of this comment.")
          .optional(),
      }).describe("Data about the comment this is in reply to.").optional(),
      kind: z.string().describe(
        "The kind of this entry. Always blogger#comment.",
      ).optional(),
      post: z.object({
        id: z.string().describe(
          "The identifier of the post containing this comment.",
        ).optional(),
      }).describe("Data about the post containing this comment.").optional(),
      published: z.string().describe(
        "RFC 3339 date-time when this comment was published.",
      ).optional(),
      selfLink: z.string().describe(
        "The API REST URL to fetch this resource from.",
      ).optional(),
      status: z.enum(["LIVE", "EMPTIED", "PENDING", "SPAM"]).describe(
        "The status of the comment (only populated for admin users).",
      ).optional(),
      updated: z.string().describe(
        "RFC 3339 date-time when this comment was last updated.",
      ).optional(),
    })).describe("The List of Comments for this Post.").optional(),
    selfLink: z.string().describe("The URL of the comments on this post.")
      .optional(),
    totalItems: z.string().describe("The count of comments on this post.")
      .optional(),
  }).describe("The container of comments on this Post.").optional(),
  status: z.enum(["LIVE", "DRAFT", "SCHEDULED", "SOFT_TRASHED"]).describe(
    "Status of the post. Only set for admin-level requests.",
  ).optional(),
  title: z.string().describe("The title of the Post.").optional(),
  titleLink: z.string().describe(
    "The title link URL, similar to atom's related link.",
  ).optional(),
  trashed: z.string().describe(
    "RFC 3339 date-time when this Post was last trashed.",
  ).optional(),
  updated: z.string().describe(
    "RFC 3339 date-time when this Post was last updated.",
  ).optional(),
  url: z.string().describe("The URL where this Post is displayed.").optional(),
  blogId: z.string().describe("The blogId for this resource"),
  fetchBody: z.string().describe("The fetchBody for this resource").optional(),
  fetchImages: z.string().describe("The fetchImages for this resource")
    .optional(),
  isDraft: z.string().describe("The isDraft for this resource").optional(),
  maxComments: z.string().describe("The maxComments for this resource")
    .optional(),
  publish: z.string().describe("The publish for this resource").optional(),
  revert: z.string().describe("The revert for this resource").optional(),
});

const StateSchema = z.object({
  author: z.object({
    displayName: z.string(),
    id: z.string(),
    image: z.object({
      url: z.string(),
    }),
    url: z.string(),
  }).optional(),
  blog: z.object({
    id: z.string(),
  }).optional(),
  content: z.string().optional(),
  customMetaData: z.string().optional(),
  etag: z.string().optional(),
  id: z.string().optional(),
  images: z.array(z.object({
    url: z.string(),
  })).optional(),
  kind: z.string().optional(),
  labels: z.array(z.string()).optional(),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
    name: z.string(),
    span: z.string(),
  }).optional(),
  published: z.string().optional(),
  readerComments: z.string().optional(),
  replies: z.object({
    items: z.array(z.object({
      author: z.object({
        displayName: z.string(),
        id: z.string(),
        image: z.object({
          url: z.unknown(),
        }),
        url: z.string(),
      }),
      blog: z.object({
        id: z.string(),
      }),
      content: z.string(),
      id: z.string(),
      inReplyTo: z.object({
        id: z.string(),
      }),
      kind: z.string(),
      post: z.object({
        id: z.string(),
      }),
      published: z.string(),
      selfLink: z.string(),
      status: z.string(),
      updated: z.string(),
    })),
    selfLink: z.string(),
    totalItems: z.string(),
  }).optional(),
  selfLink: z.string().optional(),
  status: z.string().optional(),
  title: z.string().optional(),
  titleLink: z.string().optional(),
  trashed: z.string().optional(),
  updated: z.string().optional(),
  url: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  author: z.object({
    displayName: z.string().describe("The display name.").optional(),
    id: z.string().describe("The identifier of the creator.").optional(),
    image: z.object({
      url: z.string().describe("The creator's avatar URL.").optional(),
    }).describe("The creator's avatar.").optional(),
    url: z.string().describe("The URL of the creator's Profile page.")
      .optional(),
  }).describe("The author of this Post.").optional(),
  blog: z.object({
    id: z.string().describe(
      "The identifier of the Blog that contains this Post.",
    ).optional(),
  }).describe("Data about the blog containing this Post.").optional(),
  content: z.string().describe(
    "The content of the Post. May contain HTML markup.",
  ).optional(),
  id: z.string().describe("The identifier of this Post.").optional(),
  images: z.array(z.object({
    url: z.string().optional(),
  })).describe("Display image for the Post.").optional(),
  labels: z.array(z.string()).describe(
    "The list of labels this Post was tagged with.",
  ).optional(),
  location: z.object({
    lat: z.number().describe("Location's latitude.").optional(),
    lng: z.number().describe("Location's longitude.").optional(),
    name: z.string().describe("Location name.").optional(),
    span: z.string().describe(
      "Location's viewport span. Can be used when rendering a map preview.",
    ).optional(),
  }).describe("The location for geotagged posts.").optional(),
  published: z.string().describe(
    "RFC 3339 date-time when this Post was published.",
  ).optional(),
  readerComments: z.enum([
    "ALLOW",
    "DONT_ALLOW_SHOW_EXISTING",
    "DONT_ALLOW_HIDE_EXISTING",
  ]).describe("Comment control and display setting for readers of this post.")
    .optional(),
  replies: z.object({
    items: z.array(z.object({
      author: z.object({
        displayName: z.string().describe("The display name.").optional(),
        id: z.string().describe("The identifier of the creator.").optional(),
        image: z.object({
          url: z.unknown().describe("The creator's avatar URL.").optional(),
        }).describe("The creator's avatar.").optional(),
        url: z.string().describe("The URL of the creator's Profile page.")
          .optional(),
      }).describe("The author of this Comment.").optional(),
      blog: z.object({
        id: z.string().describe(
          "The identifier of the blog containing this comment.",
        ).optional(),
      }).describe("Data about the blog containing this comment.").optional(),
      content: z.string().describe(
        "The actual content of the comment. May include HTML markup.",
      ).optional(),
      id: z.string().describe("The identifier for this resource.").optional(),
      inReplyTo: z.object({
        id: z.string().describe("The identified of the parent of this comment.")
          .optional(),
      }).describe("Data about the comment this is in reply to.").optional(),
      kind: z.string().describe(
        "The kind of this entry. Always blogger#comment.",
      ).optional(),
      post: z.object({
        id: z.string().describe(
          "The identifier of the post containing this comment.",
        ).optional(),
      }).describe("Data about the post containing this comment.").optional(),
      published: z.string().describe(
        "RFC 3339 date-time when this comment was published.",
      ).optional(),
      selfLink: z.string().describe(
        "The API REST URL to fetch this resource from.",
      ).optional(),
      status: z.enum(["LIVE", "EMPTIED", "PENDING", "SPAM"]).describe(
        "The status of the comment (only populated for admin users).",
      ).optional(),
      updated: z.string().describe(
        "RFC 3339 date-time when this comment was last updated.",
      ).optional(),
    })).describe("The List of Comments for this Post.").optional(),
    selfLink: z.string().describe("The URL of the comments on this post.")
      .optional(),
    totalItems: z.string().describe("The count of comments on this post.")
      .optional(),
  }).describe("The container of comments on this Post.").optional(),
  status: z.enum(["LIVE", "DRAFT", "SCHEDULED", "SOFT_TRASHED"]).describe(
    "Status of the post. Only set for admin-level requests.",
  ).optional(),
  title: z.string().describe("The title of the Post.").optional(),
  titleLink: z.string().describe(
    "The title link URL, similar to atom's related link.",
  ).optional(),
  trashed: z.string().describe(
    "RFC 3339 date-time when this Post was last trashed.",
  ).optional(),
  updated: z.string().describe(
    "RFC 3339 date-time when this Post was last updated.",
  ).optional(),
  url: z.string().describe("The URL where this Post is displayed.").optional(),
  blogId: z.string().describe("The blogId for this resource").optional(),
  fetchBody: z.string().describe("The fetchBody for this resource").optional(),
  fetchImages: z.string().describe("The fetchImages for this resource")
    .optional(),
  isDraft: z.string().describe("The isDraft for this resource").optional(),
  maxComments: z.string().describe("The maxComments for this resource")
    .optional(),
  publish: z.string().describe("The publish for this resource").optional(),
  revert: z.string().describe("The revert for this resource").optional(),
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
      : _defaultOAuthScopes,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Blogger Posts. Registered at `@swamp/gcp/blogger/posts`. */
export const model = {
  type: "@swamp/gcp/blogger/posts",
  version: "2026.10.06.1",
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
      toVersion: "2026.05.26.1",
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
      toVersion: "2026.07.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
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
      toVersion: "2026.09.07.1",
      description: "Added: maxComments, publish, revert",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.06.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Gets a post by blog id and post id",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a posts",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["blogId"] !== undefined) params["blogId"] = String(g["blogId"]);
        const body: Record<string, unknown> = {};
        if (g["author"] !== undefined) body["author"] = g["author"];
        if (g["blog"] !== undefined) body["blog"] = g["blog"];
        if (g["content"] !== undefined) body["content"] = g["content"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["images"] !== undefined) body["images"] = g["images"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["location"] !== undefined) body["location"] = g["location"];
        if (g["published"] !== undefined) body["published"] = g["published"];
        if (g["readerComments"] !== undefined) {
          body["readerComments"] = g["readerComments"];
        }
        if (g["replies"] !== undefined) body["replies"] = g["replies"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["titleLink"] !== undefined) body["titleLink"] = g["titleLink"];
        if (g["trashed"] !== undefined) body["trashed"] = g["trashed"];
        if (g["updated"] !== undefined) body["updated"] = g["updated"];
        if (g["url"] !== undefined) body["url"] = g["url"];
        if (g["fetchBody"] !== undefined) {
          params["fetchBody"] = String(g["fetchBody"]);
        }
        if (g["fetchImages"] !== undefined) {
          params["fetchImages"] = String(g["fetchImages"]);
        }
        if (g["isDraft"] !== undefined) {
          params["isDraft"] = String(g["isDraft"]);
        }
        if (g["name"] !== undefined) params["postId"] = String(g["name"]);
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          undefined,
          credentials,
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
      description: "Get a posts",
      arguments: z.object({
        identifier: z.string().describe("The name of the posts"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["blogId"] !== undefined) params["blogId"] = String(g["blogId"]);
        params["postId"] = args.identifier;
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Update posts attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific posts by name (e.g. one discovered by list)",
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
        if (g["blogId"] !== undefined) params["blogId"] = String(g["blogId"]);
        else if (existing["blogId"]) {
          params["blogId"] = String(existing["blogId"]);
        }
        const resourceId = existing["id"]?.toString() ?? g["name"]?.toString();
        if (!resourceId) {
          throw new Error(
            "No identifier found in existing state or globalArgs",
          );
        }
        params["postId"] = resourceId;
        const body: Record<string, unknown> = {};
        if (g["author"] !== undefined) body["author"] = g["author"];
        if (g["blog"] !== undefined) body["blog"] = g["blog"];
        if (g["content"] !== undefined) body["content"] = g["content"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["images"] !== undefined) body["images"] = g["images"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["location"] !== undefined) body["location"] = g["location"];
        if (g["published"] !== undefined) body["published"] = g["published"];
        if (g["readerComments"] !== undefined) {
          body["readerComments"] = g["readerComments"];
        }
        if (g["replies"] !== undefined) body["replies"] = g["replies"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["titleLink"] !== undefined) body["titleLink"] = g["titleLink"];
        if (g["trashed"] !== undefined) body["trashed"] = g["trashed"];
        if (g["updated"] !== undefined) body["updated"] = g["updated"];
        if (g["url"] !== undefined) body["url"] = g["url"];
        if (g["maxComments"] !== undefined) {
          params["maxComments"] = String(g["maxComments"]);
        } else if (existing["maxComments"] !== undefined) {
          params["maxComments"] = String(existing["maxComments"]);
        }
        if (g["publish"] !== undefined) {
          params["publish"] = String(g["publish"]);
        } else if (existing["publish"] !== undefined) {
          params["publish"] = String(existing["publish"]);
        }
        if (g["revert"] !== undefined) params["revert"] = String(g["revert"]);
        else if (existing["revert"] !== undefined) {
          params["revert"] = String(existing["revert"]);
        }
        let live: Record<string, unknown> | undefined;
        const unset = [
          "author",
          "blog",
          "content",
          "id",
          "images",
          "labels",
          "location",
          "published",
          "readerComments",
          "replies",
          "status",
          "title",
          "titleLink",
          "trashed",
          "updated",
          "url",
        ].filter((k) => body[k] === undefined);
        if (unset.length > 0) {
          live = await readResource(
            baseUrl,
            GET_CONFIG,
            params,
            credentials,
          ) as Record<string, unknown>;
          for (const k of unset) {
            if (live[k] !== undefined && live[k] !== null) body[k] = live[k];
          }
        }
        const concurrency: Record<string, unknown> = live ?? existing;
        for (const key of Object.keys(concurrency)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = concurrency[key];
          }
        }
        const result = await updateResource(
          baseUrl,
          UPDATE_CONFIG,
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
      description: "Delete the posts",
      arguments: z.object({
        identifier: z.string().describe("The name of the posts"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["blogId"] !== undefined) params["blogId"] = String(g["blogId"]);
        params["postId"] = args.identifier;
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
      description: "Sync posts state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific posts by name (e.g. one discovered by list)",
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
          if (g["blogId"] !== undefined) params["blogId"] = String(g["blogId"]);
          else if (existing["blogId"]) {
            params["blogId"] = String(existing["blogId"]);
          }
          const identifier = existing["id"]?.toString() ??
            g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["postId"] = identifier;
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
      description: "List posts resources",
      arguments: z.object({
        endDate: z.string().optional(),
        fetchBodies: z.boolean().optional(),
        fetchImages: z.boolean().optional(),
        labels: z.string().optional(),
        maxResults: z.number().optional(),
        orderBy: z.string().optional(),
        sortOption: z.string().describe("Sort direction applied to post list.")
          .optional(),
        startDate: z.string().optional(),
        status: z.string().optional(),
        view: z.string().optional(),
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
        if (g["blogId"] !== undefined) params["blogId"] = String(g["blogId"]);
        if (args["endDate"] !== undefined) {
          params["endDate"] = String(args["endDate"]);
        }
        if (args["fetchBodies"] !== undefined) {
          params["fetchBodies"] = String(args["fetchBodies"]);
        }
        if (args["fetchImages"] !== undefined) {
          params["fetchImages"] = String(args["fetchImages"]);
        }
        if (args["labels"] !== undefined) {
          params["labels"] = String(args["labels"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["sortOption"] !== undefined) {
          params["sortOption"] = String(args["sortOption"]);
        }
        if (args["startDate"] !== undefined) {
          params["startDate"] = String(args["startDate"]);
        }
        if (args["status"] !== undefined) {
          params["status"] = String(args["status"]);
        }
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "items",
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
    get_by_path: {
      description: "get by path",
      arguments: z.object({
        maxComments: z.any().optional(),
        view: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["blogId"] !== undefined) params["blogId"] = String(g["blogId"]);
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
        params["path"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        if (args["maxComments"] !== undefined) {
          params["maxComments"] = String(args["maxComments"]);
        }
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
        const result = await createResource(
          baseUrl,
          {
            "id": "blogger.posts.getByPath",
            "path": "v3/blogs/{blogId}/posts/bypath",
            "httpMethod": "GET",
            "parameterOrder": ["blogId", "path"],
            "parameters": {
              "blogId": { "location": "path", "required": true },
              "maxComments": { "location": "query" },
              "path": { "location": "query", "required": true },
              "view": { "location": "query" },
            },
          },
          params,
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    publish: {
      description: "publish",
      arguments: z.object({
        publishDate: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["blogId"] !== undefined) params["blogId"] = String(g["blogId"]);
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
        params["postId"] = existing["id"]?.toString() ??
          g["name"]?.toString() ?? "";
        if (args["publishDate"] !== undefined) {
          params["publishDate"] = String(args["publishDate"]);
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "blogger.posts.publish",
            "path": "v3/blogs/{blogId}/posts/{postId}/publish",
            "httpMethod": "POST",
            "parameterOrder": ["blogId", "postId"],
            "parameters": {
              "blogId": { "location": "path", "required": true },
              "postId": { "location": "path", "required": true },
              "publishDate": { "location": "query" },
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
    revert: {
      description: "revert",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["blogId"] !== undefined) params["blogId"] = String(g["blogId"]);
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
        params["postId"] = existing["id"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          baseUrl,
          {
            "id": "blogger.posts.revert",
            "path": "v3/blogs/{blogId}/posts/{postId}/revert",
            "httpMethod": "POST",
            "parameterOrder": ["blogId", "postId"],
            "parameters": {
              "blogId": { "location": "path", "required": true },
              "postId": { "location": "path", "required": true },
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
    search: {
      description: "search",
      arguments: z.object({
        fetchBodies: z.any().optional(),
        orderBy: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["blogId"] !== undefined) params["blogId"] = String(g["blogId"]);
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
        params["q"] = existing["name"]?.toString() ?? g["name"]?.toString() ??
          "";
        if (args["fetchBodies"] !== undefined) {
          params["fetchBodies"] = String(args["fetchBodies"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "blogger.posts.search",
            "path": "v3/blogs/{blogId}/posts/search",
            "httpMethod": "GET",
            "parameterOrder": ["blogId", "q"],
            "parameters": {
              "blogId": { "location": "path", "required": true },
              "fetchBodies": { "location": "query" },
              "orderBy": { "location": "query" },
              "q": { "location": "query", "required": true },
            },
          },
          params,
          undefined,
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
