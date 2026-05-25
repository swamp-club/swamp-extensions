// Auto-generated extension model for @swamp/gcp/dialogflow/agents-playbooks
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dialogflow Agents.Playbooks.
 *
 * GCP dialogflow Agents.Playbooks resource
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/playbooks/${shortName}`;
}

const BASE_URL = "https://dialogflow.googleapis.com/";

const GET_CONFIG = {
  "id": "dialogflow.projects.locations.agents.playbooks.get",
  "path": "v3/{+name}",
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
  "id": "dialogflow.projects.locations.agents.playbooks.create",
  "path": "v3/{+parent}/playbooks",
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
  "id": "dialogflow.projects.locations.agents.playbooks.patch",
  "path": "v3/{+name}",
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
  "id": "dialogflow.projects.locations.agents.playbooks.delete",
  "path": "v3/{+name}",
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
  "id": "dialogflow.projects.locations.agents.playbooks.list",
  "path": "v3/{+parent}/playbooks",
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
  codeBlock: z.object({
    code: z.string().optional(),
  }).optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  goal: z.string().optional(),
  handlers: z.array(z.object({
    eventHandler: z.object({
      condition: z.string().optional(),
      event: z.string().optional(),
      fulfillment: z.object({
        advancedSettings: z.object({
          audioExportGcsDestination: z.unknown().optional(),
          dtmfSettings: z.unknown().optional(),
          loggingSettings: z.unknown().optional(),
          speechSettings: z.unknown().optional(),
        }).optional(),
        conditionalCases: z.array(z.unknown()).optional(),
        enableGenerativeFallback: z.boolean().optional(),
        generators: z.array(z.unknown()).optional(),
        messages: z.array(z.unknown()).optional(),
        returnPartialResponses: z.boolean().optional(),
        setParameterActions: z.array(z.unknown()).optional(),
        tag: z.string().optional(),
        webhook: z.string().optional(),
      }).optional(),
    }).optional(),
    lifecycleHandler: z.object({
      condition: z.string().optional(),
      fulfillment: z.object({
        advancedSettings: z.object({
          audioExportGcsDestination: z.unknown().optional(),
          dtmfSettings: z.unknown().optional(),
          loggingSettings: z.unknown().optional(),
          speechSettings: z.unknown().optional(),
        }).optional(),
        conditionalCases: z.array(z.unknown()).optional(),
        enableGenerativeFallback: z.boolean().optional(),
        generators: z.array(z.unknown()).optional(),
        messages: z.array(z.unknown()).optional(),
        returnPartialResponses: z.boolean().optional(),
        setParameterActions: z.array(z.unknown()).optional(),
        tag: z.string().optional(),
        webhook: z.string().optional(),
      }).optional(),
      lifecycleStage: z.string().optional(),
    }).optional(),
  })).optional(),
  inlineActions: z.array(z.string()).optional(),
  inputParameterDefinitions: z.array(z.object({
    description: z.string().optional(),
    name: z.string().optional(),
    type: z.enum([
      "PARAMETER_TYPE_UNSPECIFIED",
      "STRING",
      "NUMBER",
      "BOOLEAN",
      "NULL",
      "OBJECT",
      "LIST",
    ]).optional(),
    typeSchema: z.object({
      inlineSchema: z.object({
        items: z.string().describe(
          "Circular reference to GoogleCloudDialogflowCxV3TypeSchema",
        ).optional(),
        type: z.enum([
          "DATA_TYPE_UNSPECIFIED",
          "STRING",
          "NUMBER",
          "BOOLEAN",
          "ARRAY",
        ]).optional(),
      }).optional(),
      schemaReference: z.object({
        schema: z.string().optional(),
        tool: z.string().optional(),
      }).optional(),
    }).optional(),
  })).optional(),
  instruction: z.object({
    guidelines: z.string().optional(),
    steps: z.array(z.object({
      steps: z.array(z.string()).optional(),
      text: z.string().optional(),
    })).optional(),
  }).optional(),
  llmModelSettings: z.object({
    model: z.string().optional(),
    promptText: z.string().optional(),
  }).optional(),
  name: z.string().optional(),
  outputParameterDefinitions: z.array(z.object({
    description: z.string().optional(),
    name: z.string().optional(),
    type: z.enum([
      "PARAMETER_TYPE_UNSPECIFIED",
      "STRING",
      "NUMBER",
      "BOOLEAN",
      "NULL",
      "OBJECT",
      "LIST",
    ]).optional(),
    typeSchema: z.object({
      inlineSchema: z.object({
        items: z.string().describe(
          "Circular reference to GoogleCloudDialogflowCxV3TypeSchema",
        ).optional(),
        type: z.enum([
          "DATA_TYPE_UNSPECIFIED",
          "STRING",
          "NUMBER",
          "BOOLEAN",
          "ARRAY",
        ]).optional(),
      }).optional(),
      schemaReference: z.object({
        schema: z.string().optional(),
        tool: z.string().optional(),
      }).optional(),
    }).optional(),
  })).optional(),
  playbookType: z.enum(["PLAYBOOK_TYPE_UNSPECIFIED", "TASK", "ROUTINE"])
    .optional(),
  referencedFlows: z.array(z.string()).optional(),
  referencedPlaybooks: z.array(z.string()).optional(),
  referencedTools: z.array(z.string()).optional(),
  tokenCount: z.string().optional(),
  updateTime: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  codeBlock: z.object({
    code: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  goal: z.string().optional(),
  handlers: z.array(z.object({
    eventHandler: z.object({
      condition: z.string(),
      event: z.string(),
      fulfillment: z.object({
        advancedSettings: z.object({
          audioExportGcsDestination: z.unknown(),
          dtmfSettings: z.unknown(),
          loggingSettings: z.unknown(),
          speechSettings: z.unknown(),
        }),
        conditionalCases: z.array(z.unknown()),
        enableGenerativeFallback: z.boolean(),
        generators: z.array(z.unknown()),
        messages: z.array(z.unknown()),
        returnPartialResponses: z.boolean(),
        setParameterActions: z.array(z.unknown()),
        tag: z.string(),
        webhook: z.string(),
      }),
    }),
    lifecycleHandler: z.object({
      condition: z.string(),
      fulfillment: z.object({
        advancedSettings: z.object({
          audioExportGcsDestination: z.unknown(),
          dtmfSettings: z.unknown(),
          loggingSettings: z.unknown(),
          speechSettings: z.unknown(),
        }),
        conditionalCases: z.array(z.unknown()),
        enableGenerativeFallback: z.boolean(),
        generators: z.array(z.unknown()),
        messages: z.array(z.unknown()),
        returnPartialResponses: z.boolean(),
        setParameterActions: z.array(z.unknown()),
        tag: z.string(),
        webhook: z.string(),
      }),
      lifecycleStage: z.string(),
    }),
  })).optional(),
  inlineActions: z.array(z.string()).optional(),
  inputParameterDefinitions: z.array(z.object({
    description: z.string(),
    name: z.string(),
    type: z.string(),
    typeSchema: z.object({
      inlineSchema: z.object({
        items: z.string(),
        type: z.string(),
      }),
      schemaReference: z.object({
        schema: z.string(),
        tool: z.string(),
      }),
    }),
  })).optional(),
  instruction: z.object({
    guidelines: z.string(),
    steps: z.array(z.object({
      steps: z.array(z.string()),
      text: z.string(),
    })),
  }).optional(),
  llmModelSettings: z.object({
    model: z.string(),
    promptText: z.string(),
  }).optional(),
  name: z.string(),
  outputParameterDefinitions: z.array(z.object({
    description: z.string(),
    name: z.string(),
    type: z.string(),
    typeSchema: z.object({
      inlineSchema: z.object({
        items: z.string(),
        type: z.string(),
      }),
      schemaReference: z.object({
        schema: z.string(),
        tool: z.string(),
      }),
    }),
  })).optional(),
  playbookType: z.string().optional(),
  referencedFlows: z.array(z.string()).optional(),
  referencedPlaybooks: z.array(z.string()).optional(),
  referencedTools: z.array(z.string()).optional(),
  tokenCount: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  codeBlock: z.object({
    code: z.string().optional(),
  }).optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  goal: z.string().optional(),
  handlers: z.array(z.object({
    eventHandler: z.object({
      condition: z.string().optional(),
      event: z.string().optional(),
      fulfillment: z.object({
        advancedSettings: z.object({
          audioExportGcsDestination: z.unknown().optional(),
          dtmfSettings: z.unknown().optional(),
          loggingSettings: z.unknown().optional(),
          speechSettings: z.unknown().optional(),
        }).optional(),
        conditionalCases: z.array(z.unknown()).optional(),
        enableGenerativeFallback: z.boolean().optional(),
        generators: z.array(z.unknown()).optional(),
        messages: z.array(z.unknown()).optional(),
        returnPartialResponses: z.boolean().optional(),
        setParameterActions: z.array(z.unknown()).optional(),
        tag: z.string().optional(),
        webhook: z.string().optional(),
      }).optional(),
    }).optional(),
    lifecycleHandler: z.object({
      condition: z.string().optional(),
      fulfillment: z.object({
        advancedSettings: z.object({
          audioExportGcsDestination: z.unknown().optional(),
          dtmfSettings: z.unknown().optional(),
          loggingSettings: z.unknown().optional(),
          speechSettings: z.unknown().optional(),
        }).optional(),
        conditionalCases: z.array(z.unknown()).optional(),
        enableGenerativeFallback: z.boolean().optional(),
        generators: z.array(z.unknown()).optional(),
        messages: z.array(z.unknown()).optional(),
        returnPartialResponses: z.boolean().optional(),
        setParameterActions: z.array(z.unknown()).optional(),
        tag: z.string().optional(),
        webhook: z.string().optional(),
      }).optional(),
      lifecycleStage: z.string().optional(),
    }).optional(),
  })).optional(),
  inlineActions: z.array(z.string()).optional(),
  inputParameterDefinitions: z.array(z.object({
    description: z.string().optional(),
    name: z.string().optional(),
    type: z.enum([
      "PARAMETER_TYPE_UNSPECIFIED",
      "STRING",
      "NUMBER",
      "BOOLEAN",
      "NULL",
      "OBJECT",
      "LIST",
    ]).optional(),
    typeSchema: z.object({
      inlineSchema: z.object({
        items: z.string().describe(
          "Circular reference to GoogleCloudDialogflowCxV3TypeSchema",
        ).optional(),
        type: z.enum([
          "DATA_TYPE_UNSPECIFIED",
          "STRING",
          "NUMBER",
          "BOOLEAN",
          "ARRAY",
        ]).optional(),
      }).optional(),
      schemaReference: z.object({
        schema: z.string().optional(),
        tool: z.string().optional(),
      }).optional(),
    }).optional(),
  })).optional(),
  instruction: z.object({
    guidelines: z.string().optional(),
    steps: z.array(z.object({
      steps: z.array(z.string()).optional(),
      text: z.string().optional(),
    })).optional(),
  }).optional(),
  llmModelSettings: z.object({
    model: z.string().optional(),
    promptText: z.string().optional(),
  }).optional(),
  name: z.string().optional(),
  outputParameterDefinitions: z.array(z.object({
    description: z.string().optional(),
    name: z.string().optional(),
    type: z.enum([
      "PARAMETER_TYPE_UNSPECIFIED",
      "STRING",
      "NUMBER",
      "BOOLEAN",
      "NULL",
      "OBJECT",
      "LIST",
    ]).optional(),
    typeSchema: z.object({
      inlineSchema: z.object({
        items: z.string().describe(
          "Circular reference to GoogleCloudDialogflowCxV3TypeSchema",
        ).optional(),
        type: z.enum([
          "DATA_TYPE_UNSPECIFIED",
          "STRING",
          "NUMBER",
          "BOOLEAN",
          "ARRAY",
        ]).optional(),
      }).optional(),
      schemaReference: z.object({
        schema: z.string().optional(),
        tool: z.string().optional(),
      }).optional(),
    }).optional(),
  })).optional(),
  playbookType: z.enum(["PLAYBOOK_TYPE_UNSPECIFIED", "TASK", "ROUTINE"])
    .optional(),
  referencedFlows: z.array(z.string()).optional(),
  referencedPlaybooks: z.array(z.string()).optional(),
  referencedTools: z.array(z.string()).optional(),
  tokenCount: z.string().optional(),
  updateTime: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dialogflow Agents.Playbooks. Registered at `@swamp/gcp/dialogflow/agents-playbooks`. */
export const model = {
  type: "@swamp/gcp/dialogflow/agents-playbooks",
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
      description: "GCP dialogflow Agents.Playbooks resource",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a playbooks",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["codeBlock"] !== undefined) body["codeBlock"] = g["codeBlock"];
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["goal"] !== undefined) body["goal"] = g["goal"];
        if (g["handlers"] !== undefined) body["handlers"] = g["handlers"];
        if (g["inlineActions"] !== undefined) {
          body["inlineActions"] = g["inlineActions"];
        }
        if (g["inputParameterDefinitions"] !== undefined) {
          body["inputParameterDefinitions"] = g["inputParameterDefinitions"];
        }
        if (g["instruction"] !== undefined) {
          body["instruction"] = g["instruction"];
        }
        if (g["llmModelSettings"] !== undefined) {
          body["llmModelSettings"] = g["llmModelSettings"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["outputParameterDefinitions"] !== undefined) {
          body["outputParameterDefinitions"] = g["outputParameterDefinitions"];
        }
        if (g["playbookType"] !== undefined) {
          body["playbookType"] = g["playbookType"];
        }
        if (g["referencedFlows"] !== undefined) {
          body["referencedFlows"] = g["referencedFlows"];
        }
        if (g["referencedPlaybooks"] !== undefined) {
          body["referencedPlaybooks"] = g["referencedPlaybooks"];
        }
        if (g["referencedTools"] !== undefined) {
          body["referencedTools"] = g["referencedTools"];
        }
        if (g["tokenCount"] !== undefined) body["tokenCount"] = g["tokenCount"];
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
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
      description: "Get a playbooks",
      arguments: z.object({
        identifier: z.string().describe("The name of the playbooks"),
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
      description: "Update playbooks attributes",
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
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["codeBlock"] !== undefined) body["codeBlock"] = g["codeBlock"];
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["goal"] !== undefined) body["goal"] = g["goal"];
        if (g["handlers"] !== undefined) body["handlers"] = g["handlers"];
        if (g["inlineActions"] !== undefined) {
          body["inlineActions"] = g["inlineActions"];
        }
        if (g["inputParameterDefinitions"] !== undefined) {
          body["inputParameterDefinitions"] = g["inputParameterDefinitions"];
        }
        if (g["instruction"] !== undefined) {
          body["instruction"] = g["instruction"];
        }
        if (g["llmModelSettings"] !== undefined) {
          body["llmModelSettings"] = g["llmModelSettings"];
        }
        if (g["outputParameterDefinitions"] !== undefined) {
          body["outputParameterDefinitions"] = g["outputParameterDefinitions"];
        }
        if (g["playbookType"] !== undefined) {
          body["playbookType"] = g["playbookType"];
        }
        if (g["referencedFlows"] !== undefined) {
          body["referencedFlows"] = g["referencedFlows"];
        }
        if (g["referencedPlaybooks"] !== undefined) {
          body["referencedPlaybooks"] = g["referencedPlaybooks"];
        }
        if (g["referencedTools"] !== undefined) {
          body["referencedTools"] = g["referencedTools"];
        }
        if (g["tokenCount"] !== undefined) body["tokenCount"] = g["tokenCount"];
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
      description: "Delete the playbooks",
      arguments: z.object({
        identifier: z.string().describe("The name of the playbooks"),
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
      description: "Sync playbooks state from GCP",
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
    list: {
      description: "List playbooks resources",
      arguments: z.object({
        pageSize: z.number().optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
          "playbooks",
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
    export: {
      description: "export",
      arguments: z.object({
        dataFormat: z.any().optional(),
        playbookUri: z.any().optional(),
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
        if (args["dataFormat"] !== undefined) {
          body["dataFormat"] = args["dataFormat"];
        }
        if (args["playbookUri"] !== undefined) {
          body["playbookUri"] = args["playbookUri"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dialogflow.projects.locations.agents.playbooks.export",
            "path": "v3/{+name}:export",
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
    import: {
      description: "import",
      arguments: z.object({
        importStrategy: z.any().optional(),
        playbookContent: z.any().optional(),
        playbookUri: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["importStrategy"] !== undefined) {
          body["importStrategy"] = args["importStrategy"];
        }
        if (args["playbookContent"] !== undefined) {
          body["playbookContent"] = args["playbookContent"];
        }
        if (args["playbookUri"] !== undefined) {
          body["playbookUri"] = args["playbookUri"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dialogflow.projects.locations.agents.playbooks.import",
            "path": "v3/{+parent}/playbooks:import",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
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
