// Auto-generated extension model for @swamp/gcp/cloudsupport/cases-comments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Cloud Support Cases.Comments.
 *
 * A comment associated with a support case. Case comments are the primary way for Google Support to communicate with a user who has opened a case. When a user responds to Google Support, the user's responses also appear as comments.
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
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/comments/${shortName}`;
}

const BASE_URL = "https://cloudsupport.googleapis.com/";

const GET_CONFIG = {
  "id": "cloudsupport.cases.comments.get",
  "path": "v2/{+name}",
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
  "id": "cloudsupport.cases.comments.create",
  "path": "v2/{+parent}/comments",
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  body: z.string().describe(
    "The full comment body. Maximum of 12800 characters.",
  ).optional(),
  creator: z.object({
    displayName: z.string().describe(
      "The name to display for the actor. If not provided, it is inferred from credentials supplied during case creation. When an email is provided, a display name must also be provided. This will be obfuscated if the user is a Google Support agent.",
    ).optional(),
    email: z.string().describe(
      "The email address of the actor. If not provided, it is inferred from the credentials supplied during case creation. When a name is provided, an email must also be provided. If the user is a Google Support agent, this is obfuscated. This field is deprecated. Use `username` instead.",
    ).optional(),
    googleSupport: z.boolean().describe(
      "Output only. Whether the actor is a Google support actor.",
    ).optional(),
    username: z.string().describe(
      "Output only. The username of the actor. It may look like an email or other format provided by the identity provider. If not provided, it is inferred from the credentials supplied. When a name is provided, a username must also be provided. If the user is a Google Support agent, this will not be set.",
    ).optional(),
  }).describe(
    "An Actor represents an entity that performed an action. For example, an actor could be a user who posted a comment on a support case, a user who uploaded an attachment, or a service account that created a support case.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  body: z.string().optional(),
  createTime: z.string().optional(),
  creator: z.object({
    displayName: z.string(),
    email: z.string(),
    googleSupport: z.boolean(),
    username: z.string(),
  }).optional(),
  name: z.string(),
  plainTextBody: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  body: z.string().describe(
    "The full comment body. Maximum of 12800 characters.",
  ).optional(),
  creator: z.object({
    displayName: z.string().describe(
      "The name to display for the actor. If not provided, it is inferred from credentials supplied during case creation. When an email is provided, a display name must also be provided. This will be obfuscated if the user is a Google Support agent.",
    ).optional(),
    email: z.string().describe(
      "The email address of the actor. If not provided, it is inferred from the credentials supplied during case creation. When a name is provided, an email must also be provided. If the user is a Google Support agent, this is obfuscated. This field is deprecated. Use `username` instead.",
    ).optional(),
    googleSupport: z.boolean().describe(
      "Output only. Whether the actor is a Google support actor.",
    ).optional(),
    username: z.string().describe(
      "Output only. The username of the actor. It may look like an email or other format provided by the identity provider. If not provided, it is inferred from the credentials supplied. When a name is provided, a username must also be provided. If the user is a Google Support agent, this will not be set.",
    ).optional(),
  }).describe(
    "An Actor represents an entity that performed an action. For example, an actor could be a user who posted a comment on a support case, a user who uploaded an attachment, or a service account that created a support case.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Cloud Support Cases.Comments. Registered at `@swamp/gcp/cloudsupport/cases-comments`. */
export const model = {
  type: "@swamp/gcp/cloudsupport/cases-comments",
  version: "2026.05.21.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A comment associated with a support case. Case comments are the primary way f...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a comments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["body"] !== undefined) body["body"] = g["body"];
        if (g["creator"] !== undefined) body["creator"] = g["creator"];
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
      description: "Get a comments",
      arguments: z.object({
        identifier: z.string().describe("The name of the comments"),
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
    sync: {
      description: "Sync comments state from GCP",
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
  },
};
