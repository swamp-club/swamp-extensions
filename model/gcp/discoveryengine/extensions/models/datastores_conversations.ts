// Auto-generated extension model for @swamp/gcp/discoveryengine/datastores-conversations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Discovery Engine DataStores.Conversations.
 *
 * External conversation proto definition.
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/conversations/${shortName}`;
}

const BASE_URL = "https://discoveryengine.googleapis.com/";

const GET_CONFIG = {
  "id": "discoveryengine.projects.locations.dataStores.conversations.get",
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
  "id": "discoveryengine.projects.locations.dataStores.conversations.create",
  "path": "v1/{+parent}/conversations",
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
  "id": "discoveryengine.projects.locations.dataStores.conversations.patch",
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
  "id": "discoveryengine.projects.locations.dataStores.conversations.delete",
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

const GlobalArgsSchema = z.object({
  messages: z.array(z.object({
    createTime: z.string().describe("Output only. Message creation timestamp.")
      .optional(),
    reply: z.object({
      summary: z.object({
        safetyAttributes: z.object({
          categories: z.unknown().describe(
            "The display names of Safety Attribute categories associated with the generated content. Order matches the Scores.",
          ).optional(),
          scores: z.unknown().describe(
            "The confidence scores of the each category, higher value means higher confidence. Order matches the Categories.",
          ).optional(),
        }).describe(
          "Safety Attribute categories and their associated confidence scores.",
        ).optional(),
        summarySkippedReasons: z.array(z.unknown()).describe(
          "Additional summary-skipped reasons. This provides the reason for ignored cases. If nothing is skipped, this field is not set.",
        ).optional(),
        summaryText: z.string().describe("The summary content.").optional(),
        summaryWithMetadata: z.object({
          citationMetadata: z.unknown().describe("Citation metadata.")
            .optional(),
          references: z.unknown().describe("Document References.").optional(),
          summary: z.unknown().describe(
            "Summary text with no citation information.",
          ).optional(),
        }).describe("Summary with metadata information.").optional(),
      }).describe(
        "Summary of the top N search results specified by the summary spec.",
      ).optional(),
    }).describe("Defines a reply message to user.").optional(),
    userInput: z.object({
      context: z.object({
        activeDocument: z.string().describe(
          "The current active document the user opened. It contains the document resource reference.",
        ).optional(),
        contextDocuments: z.array(z.unknown()).describe(
          "The current list of documents the user is seeing. It contains the document resource references.",
        ).optional(),
      }).describe("Defines context of the conversation").optional(),
      input: z.string().describe("Text input.").optional(),
    }).describe("Defines text input.").optional(),
  })).describe("Conversation messages.").optional(),
  name: z.string().describe(
    "Immutable. Fully qualified name `projects/{project}/locations/global/collections/{collection}/dataStore/*/conversations/*` or `projects/{project}/locations/global/collections/{collection}/engines/*/conversations/*`.",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "IN_PROGRESS", "COMPLETED"]).describe(
    "The state of the Conversation.",
  ).optional(),
  userPseudoId: z.string().describe("A unique identifier for tracking users.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  endTime: z.string().optional(),
  messages: z.array(z.object({
    createTime: z.string(),
    reply: z.object({
      summary: z.object({
        safetyAttributes: z.object({
          categories: z.unknown(),
          scores: z.unknown(),
        }),
        summarySkippedReasons: z.array(z.unknown()),
        summaryText: z.string(),
        summaryWithMetadata: z.object({
          citationMetadata: z.unknown(),
          references: z.unknown(),
          summary: z.unknown(),
        }),
      }),
    }),
    userInput: z.object({
      context: z.object({
        activeDocument: z.string(),
        contextDocuments: z.array(z.unknown()),
      }),
      input: z.string(),
    }),
  })).optional(),
  name: z.string(),
  startTime: z.string().optional(),
  state: z.string().optional(),
  userPseudoId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  messages: z.array(z.object({
    createTime: z.string().describe("Output only. Message creation timestamp.")
      .optional(),
    reply: z.object({
      summary: z.object({
        safetyAttributes: z.object({
          categories: z.unknown().describe(
            "The display names of Safety Attribute categories associated with the generated content. Order matches the Scores.",
          ).optional(),
          scores: z.unknown().describe(
            "The confidence scores of the each category, higher value means higher confidence. Order matches the Categories.",
          ).optional(),
        }).describe(
          "Safety Attribute categories and their associated confidence scores.",
        ).optional(),
        summarySkippedReasons: z.array(z.unknown()).describe(
          "Additional summary-skipped reasons. This provides the reason for ignored cases. If nothing is skipped, this field is not set.",
        ).optional(),
        summaryText: z.string().describe("The summary content.").optional(),
        summaryWithMetadata: z.object({
          citationMetadata: z.unknown().describe("Citation metadata.")
            .optional(),
          references: z.unknown().describe("Document References.").optional(),
          summary: z.unknown().describe(
            "Summary text with no citation information.",
          ).optional(),
        }).describe("Summary with metadata information.").optional(),
      }).describe(
        "Summary of the top N search results specified by the summary spec.",
      ).optional(),
    }).describe("Defines a reply message to user.").optional(),
    userInput: z.object({
      context: z.object({
        activeDocument: z.string().describe(
          "The current active document the user opened. It contains the document resource reference.",
        ).optional(),
        contextDocuments: z.array(z.unknown()).describe(
          "The current list of documents the user is seeing. It contains the document resource references.",
        ).optional(),
      }).describe("Defines context of the conversation").optional(),
      input: z.string().describe("Text input.").optional(),
    }).describe("Defines text input.").optional(),
  })).describe("Conversation messages.").optional(),
  name: z.string().describe(
    "Immutable. Fully qualified name `projects/{project}/locations/global/collections/{collection}/dataStore/*/conversations/*` or `projects/{project}/locations/global/collections/{collection}/engines/*/conversations/*`.",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "IN_PROGRESS", "COMPLETED"]).describe(
    "The state of the Conversation.",
  ).optional(),
  userPseudoId: z.string().describe("A unique identifier for tracking users.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Discovery Engine DataStores.Conversations. Registered at `@swamp/gcp/discoveryengine/datastores-conversations`. */
export const model = {
  type: "@swamp/gcp/discoveryengine/datastores-conversations",
  version: "2026.05.18.1",
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
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "External conversation proto definition.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a conversations",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["messages"] !== undefined) body["messages"] = g["messages"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["userPseudoId"] !== undefined) {
          body["userPseudoId"] = g["userPseudoId"];
        }
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["COMPLETED"],
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
      description: "Get a conversations",
      arguments: z.object({
        identifier: z.string().describe("The name of the conversations"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
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
      description: "Update conversations attributes",
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
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["messages"] !== undefined) body["messages"] = g["messages"];
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["userPseudoId"] !== undefined) {
          body["userPseudoId"] = g["userPseudoId"];
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
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["COMPLETED"],
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
      description: "Delete the conversations",
      arguments: z.object({
        identifier: z.string().describe("The name of the conversations"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
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
      description: "Sync conversations state from GCP",
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
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
    converse: {
      description: "converse",
      arguments: z.object({
        boostSpec: z.any().optional(),
        conversation: z.any().optional(),
        filter: z.any().optional(),
        query: z.any().optional(),
        safeSearch: z.any().optional(),
        servingConfig: z.any().optional(),
        summarySpec: z.any().optional(),
        userLabels: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["boostSpec"] !== undefined) {
          body["boostSpec"] = args["boostSpec"];
        }
        if (args["conversation"] !== undefined) {
          body["conversation"] = args["conversation"];
        }
        if (args["filter"] !== undefined) body["filter"] = args["filter"];
        if (args["query"] !== undefined) body["query"] = args["query"];
        if (args["safeSearch"] !== undefined) {
          body["safeSearch"] = args["safeSearch"];
        }
        if (args["servingConfig"] !== undefined) {
          body["servingConfig"] = args["servingConfig"];
        }
        if (args["summarySpec"] !== undefined) {
          body["summarySpec"] = args["summarySpec"];
        }
        if (args["userLabels"] !== undefined) {
          body["userLabels"] = args["userLabels"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "discoveryengine.projects.locations.dataStores.conversations.converse",
            "path": "v1/{+name}:converse",
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
  },
};
