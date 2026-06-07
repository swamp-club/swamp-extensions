// Auto-generated extension model for @swamp/gcp/dialogflow/agents-playbooks-versions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dialogflow Agents.Playbooks.Versions.
 *
 * GCP dialogflow Agents.Playbooks.Versions resource
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/versions/${shortName}`;
}

const BASE_URL = "https://dialogflow.googleapis.com/";

const GET_CONFIG = {
  "id": "dialogflow.projects.locations.agents.playbooks.versions.get",
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
  "id": "dialogflow.projects.locations.agents.playbooks.versions.create",
  "path": "v3/{+parent}/versions",
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

const DELETE_CONFIG = {
  "id": "dialogflow.projects.locations.agents.playbooks.versions.delete",
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
  "id": "dialogflow.projects.locations.agents.playbooks.versions.list",
  "path": "v3/{+parent}/versions",
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
  description: z.string().optional(),
  examples: z.array(z.object({
    actions: z.array(z.object({
      agentUtterance: z.object({
        text: z.unknown().optional(),
      }).optional(),
      flowInvocation: z.object({
        displayName: z.unknown().optional(),
        flow: z.unknown().optional(),
        flowState: z.unknown().optional(),
      }).optional(),
      flowTransition: z.object({
        displayName: z.unknown().optional(),
        flow: z.unknown().optional(),
      }).optional(),
      playbookInvocation: z.object({
        displayName: z.unknown().optional(),
        playbook: z.unknown().optional(),
        playbookInput: z.unknown().optional(),
        playbookOutput: z.unknown().optional(),
        playbookState: z.unknown().optional(),
      }).optional(),
      playbookTransition: z.object({
        displayName: z.unknown().optional(),
        playbook: z.unknown().optional(),
      }).optional(),
      toolUse: z.object({
        action: z.unknown().optional(),
        displayName: z.unknown().optional(),
        inputActionParameters: z.unknown().optional(),
        outputActionParameters: z.unknown().optional(),
        tool: z.unknown().optional(),
      }).optional(),
      userUtterance: z.object({
        text: z.unknown().optional(),
      }).optional(),
    })).optional(),
    conversationState: z.enum([
      "OUTPUT_STATE_UNSPECIFIED",
      "OUTPUT_STATE_OK",
      "OUTPUT_STATE_CANCELLED",
      "OUTPUT_STATE_FAILED",
      "OUTPUT_STATE_ESCALATED",
      "OUTPUT_STATE_PENDING",
    ]).optional(),
    createTime: z.string().optional(),
    description: z.string().optional(),
    displayName: z.string().optional(),
    languageCode: z.string().optional(),
    name: z.string().optional(),
    playbookInput: z.object({
      precedingConversationSummary: z.string().optional(),
    }).optional(),
    playbookOutput: z.object({
      executionSummary: z.string().optional(),
    }).optional(),
    tokenCount: z.string().optional(),
    updateTime: z.string().optional(),
  })).optional(),
  name: z.string().optional(),
  playbook: z.object({
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
          advancedSettings: z.unknown().optional(),
          conditionalCases: z.unknown().optional(),
          enableGenerativeFallback: z.unknown().optional(),
          generators: z.unknown().optional(),
          messages: z.unknown().optional(),
          returnPartialResponses: z.unknown().optional(),
          setParameterActions: z.unknown().optional(),
          tag: z.unknown().optional(),
          webhook: z.unknown().optional(),
        }).optional(),
      }).optional(),
      lifecycleHandler: z.object({
        condition: z.string().optional(),
        fulfillment: z.object({
          advancedSettings: z.unknown().optional(),
          conditionalCases: z.unknown().optional(),
          enableGenerativeFallback: z.unknown().optional(),
          generators: z.unknown().optional(),
          messages: z.unknown().optional(),
          returnPartialResponses: z.unknown().optional(),
          setParameterActions: z.unknown().optional(),
          tag: z.unknown().optional(),
          webhook: z.unknown().optional(),
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
          items: z.unknown().describe(
            "Circular reference to GoogleCloudDialogflowCxV3TypeSchema",
          ).optional(),
          type: z.unknown().optional(),
        }).optional(),
        schemaReference: z.object({
          schema: z.unknown().optional(),
          tool: z.unknown().optional(),
        }).optional(),
      }).optional(),
    })).optional(),
    instruction: z.object({
      guidelines: z.string().optional(),
      steps: z.array(z.object({
        steps: z.array(z.unknown()).optional(),
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
          items: z.unknown().describe(
            "Circular reference to GoogleCloudDialogflowCxV3TypeSchema",
          ).optional(),
          type: z.unknown().optional(),
        }).optional(),
        schemaReference: z.object({
          schema: z.unknown().optional(),
          tool: z.unknown().optional(),
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
  }).optional(),
  updateTime: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  description: z.string().optional(),
  examples: z.array(z.object({
    actions: z.array(z.object({
      agentUtterance: z.object({
        text: z.unknown(),
      }),
      flowInvocation: z.object({
        displayName: z.unknown(),
        flow: z.unknown(),
        flowState: z.unknown(),
      }),
      flowTransition: z.object({
        displayName: z.unknown(),
        flow: z.unknown(),
      }),
      playbookInvocation: z.object({
        displayName: z.unknown(),
        playbook: z.unknown(),
        playbookInput: z.unknown(),
        playbookOutput: z.unknown(),
        playbookState: z.unknown(),
      }),
      playbookTransition: z.object({
        displayName: z.unknown(),
        playbook: z.unknown(),
      }),
      toolUse: z.object({
        action: z.unknown(),
        displayName: z.unknown(),
        inputActionParameters: z.unknown(),
        outputActionParameters: z.unknown(),
        tool: z.unknown(),
      }),
      userUtterance: z.object({
        text: z.unknown(),
      }),
    })),
    conversationState: z.string(),
    createTime: z.string(),
    description: z.string(),
    displayName: z.string(),
    languageCode: z.string(),
    name: z.string(),
    playbookInput: z.object({
      precedingConversationSummary: z.string(),
    }),
    playbookOutput: z.object({
      executionSummary: z.string(),
    }),
    tokenCount: z.string(),
    updateTime: z.string(),
  })).optional(),
  name: z.string(),
  playbook: z.object({
    codeBlock: z.object({
      code: z.string(),
    }),
    createTime: z.string(),
    displayName: z.string(),
    goal: z.string(),
    handlers: z.array(z.object({
      eventHandler: z.object({
        condition: z.string(),
        event: z.string(),
        fulfillment: z.object({
          advancedSettings: z.unknown(),
          conditionalCases: z.unknown(),
          enableGenerativeFallback: z.unknown(),
          generators: z.unknown(),
          messages: z.unknown(),
          returnPartialResponses: z.unknown(),
          setParameterActions: z.unknown(),
          tag: z.unknown(),
          webhook: z.unknown(),
        }),
      }),
      lifecycleHandler: z.object({
        condition: z.string(),
        fulfillment: z.object({
          advancedSettings: z.unknown(),
          conditionalCases: z.unknown(),
          enableGenerativeFallback: z.unknown(),
          generators: z.unknown(),
          messages: z.unknown(),
          returnPartialResponses: z.unknown(),
          setParameterActions: z.unknown(),
          tag: z.unknown(),
          webhook: z.unknown(),
        }),
        lifecycleStage: z.string(),
      }),
    })),
    inlineActions: z.array(z.string()),
    inputParameterDefinitions: z.array(z.object({
      description: z.string(),
      name: z.string(),
      type: z.string(),
      typeSchema: z.object({
        inlineSchema: z.object({
          items: z.unknown(),
          type: z.unknown(),
        }),
        schemaReference: z.object({
          schema: z.unknown(),
          tool: z.unknown(),
        }),
      }),
    })),
    instruction: z.object({
      guidelines: z.string(),
      steps: z.array(z.object({
        steps: z.array(z.unknown()),
        text: z.string(),
      })),
    }),
    llmModelSettings: z.object({
      model: z.string(),
      promptText: z.string(),
    }),
    name: z.string(),
    outputParameterDefinitions: z.array(z.object({
      description: z.string(),
      name: z.string(),
      type: z.string(),
      typeSchema: z.object({
        inlineSchema: z.object({
          items: z.unknown(),
          type: z.unknown(),
        }),
        schemaReference: z.object({
          schema: z.unknown(),
          tool: z.unknown(),
        }),
      }),
    })),
    playbookType: z.string(),
    referencedFlows: z.array(z.string()),
    referencedPlaybooks: z.array(z.string()),
    referencedTools: z.array(z.string()),
    tokenCount: z.string(),
    updateTime: z.string(),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  description: z.string().optional(),
  examples: z.array(z.object({
    actions: z.array(z.object({
      agentUtterance: z.object({
        text: z.unknown().optional(),
      }).optional(),
      flowInvocation: z.object({
        displayName: z.unknown().optional(),
        flow: z.unknown().optional(),
        flowState: z.unknown().optional(),
      }).optional(),
      flowTransition: z.object({
        displayName: z.unknown().optional(),
        flow: z.unknown().optional(),
      }).optional(),
      playbookInvocation: z.object({
        displayName: z.unknown().optional(),
        playbook: z.unknown().optional(),
        playbookInput: z.unknown().optional(),
        playbookOutput: z.unknown().optional(),
        playbookState: z.unknown().optional(),
      }).optional(),
      playbookTransition: z.object({
        displayName: z.unknown().optional(),
        playbook: z.unknown().optional(),
      }).optional(),
      toolUse: z.object({
        action: z.unknown().optional(),
        displayName: z.unknown().optional(),
        inputActionParameters: z.unknown().optional(),
        outputActionParameters: z.unknown().optional(),
        tool: z.unknown().optional(),
      }).optional(),
      userUtterance: z.object({
        text: z.unknown().optional(),
      }).optional(),
    })).optional(),
    conversationState: z.enum([
      "OUTPUT_STATE_UNSPECIFIED",
      "OUTPUT_STATE_OK",
      "OUTPUT_STATE_CANCELLED",
      "OUTPUT_STATE_FAILED",
      "OUTPUT_STATE_ESCALATED",
      "OUTPUT_STATE_PENDING",
    ]).optional(),
    createTime: z.string().optional(),
    description: z.string().optional(),
    displayName: z.string().optional(),
    languageCode: z.string().optional(),
    name: z.string().optional(),
    playbookInput: z.object({
      precedingConversationSummary: z.string().optional(),
    }).optional(),
    playbookOutput: z.object({
      executionSummary: z.string().optional(),
    }).optional(),
    tokenCount: z.string().optional(),
    updateTime: z.string().optional(),
  })).optional(),
  name: z.string().optional(),
  playbook: z.object({
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
          advancedSettings: z.unknown().optional(),
          conditionalCases: z.unknown().optional(),
          enableGenerativeFallback: z.unknown().optional(),
          generators: z.unknown().optional(),
          messages: z.unknown().optional(),
          returnPartialResponses: z.unknown().optional(),
          setParameterActions: z.unknown().optional(),
          tag: z.unknown().optional(),
          webhook: z.unknown().optional(),
        }).optional(),
      }).optional(),
      lifecycleHandler: z.object({
        condition: z.string().optional(),
        fulfillment: z.object({
          advancedSettings: z.unknown().optional(),
          conditionalCases: z.unknown().optional(),
          enableGenerativeFallback: z.unknown().optional(),
          generators: z.unknown().optional(),
          messages: z.unknown().optional(),
          returnPartialResponses: z.unknown().optional(),
          setParameterActions: z.unknown().optional(),
          tag: z.unknown().optional(),
          webhook: z.unknown().optional(),
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
          items: z.unknown().describe(
            "Circular reference to GoogleCloudDialogflowCxV3TypeSchema",
          ).optional(),
          type: z.unknown().optional(),
        }).optional(),
        schemaReference: z.object({
          schema: z.unknown().optional(),
          tool: z.unknown().optional(),
        }).optional(),
      }).optional(),
    })).optional(),
    instruction: z.object({
      guidelines: z.string().optional(),
      steps: z.array(z.object({
        steps: z.array(z.unknown()).optional(),
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
          items: z.unknown().describe(
            "Circular reference to GoogleCloudDialogflowCxV3TypeSchema",
          ).optional(),
          type: z.unknown().optional(),
        }).optional(),
        schemaReference: z.object({
          schema: z.unknown().optional(),
          tool: z.unknown().optional(),
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
  }).optional(),
  updateTime: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
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

/** Swamp extension model for Google Cloud Dialogflow Agents.Playbooks.Versions. Registered at `@swamp/gcp/dialogflow/agents-playbooks-versions`. */
export const model = {
  type: "@swamp/gcp/dialogflow/agents-playbooks-versions",
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
      description: "GCP dialogflow Agents.Playbooks.Versions resource",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a versions",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["examples"] !== undefined) body["examples"] = g["examples"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["playbook"] !== undefined) body["playbook"] = g["playbook"];
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
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
          credentials,
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
      description: "Get a versions",
      arguments: z.object({
        identifier: z.string().describe("The name of the versions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
    delete: {
      description: "Delete the versions",
      arguments: z.object({
        identifier: z.string().describe("The name of the versions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
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
      description: "Sync versions state from GCP",
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
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "List versions resources",
      arguments: z.object({
        pageSize: z.number().optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          "playbookVersions",
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
    restore: {
      description: "restore",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "dialogflow.projects.locations.agents.playbooks.versions.restore",
            "path": "v3/{+name}:restore",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
  },
};
