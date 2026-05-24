// Auto-generated extension model for @swamp/gcp/dialogflow/agents-flows-pages
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dialogflow Agents.Flows.Pages.
 *
 * GCP dialogflow Agents.Flows.Pages resource
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
  return `${parent}/pages/${shortName}`;
}

const BASE_URL = "https://dialogflow.googleapis.com/";

const GET_CONFIG = {
  "id": "dialogflow.projects.locations.agents.flows.pages.get",
  "path": "v3/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "languageCode": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "dialogflow.projects.locations.agents.flows.pages.create",
  "path": "v3/{+parent}/pages",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "languageCode": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "dialogflow.projects.locations.agents.flows.pages.patch",
  "path": "v3/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "languageCode": {
      "location": "query",
    },
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
  "id": "dialogflow.projects.locations.agents.flows.pages.delete",
  "path": "v3/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "force": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "dialogflow.projects.locations.agents.flows.pages.list",
  "path": "v3/{+parent}/pages",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "languageCode": {
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
  advancedSettings: z.object({
    audioExportGcsDestination: z.object({
      uri: z.string().optional(),
    }).optional(),
    dtmfSettings: z.object({
      enabled: z.boolean().optional(),
      endpointingTimeoutDuration: z.string().optional(),
      finishDigit: z.string().optional(),
      interdigitTimeoutDuration: z.string().optional(),
      maxDigits: z.number().int().optional(),
    }).optional(),
    loggingSettings: z.object({
      enableConsentBasedRedaction: z.boolean().optional(),
      enableInteractionLogging: z.boolean().optional(),
      enableStackdriverLogging: z.boolean().optional(),
    }).optional(),
    speechSettings: z.object({
      endpointerSensitivity: z.number().int().optional(),
      models: z.record(z.string(), z.string()).optional(),
      noSpeechTimeout: z.string().optional(),
      useTimeoutBasedEndpointing: z.boolean().optional(),
    }).optional(),
  }).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  entryFulfillment: z.object({
    advancedSettings: z.object({
      audioExportGcsDestination: z.object({
        uri: z.string().optional(),
      }).optional(),
      dtmfSettings: z.object({
        enabled: z.boolean().optional(),
        endpointingTimeoutDuration: z.string().optional(),
        finishDigit: z.string().optional(),
        interdigitTimeoutDuration: z.string().optional(),
        maxDigits: z.number().int().optional(),
      }).optional(),
      loggingSettings: z.object({
        enableConsentBasedRedaction: z.boolean().optional(),
        enableInteractionLogging: z.boolean().optional(),
        enableStackdriverLogging: z.boolean().optional(),
      }).optional(),
      speechSettings: z.object({
        endpointerSensitivity: z.number().int().optional(),
        models: z.record(z.string(), z.string()).optional(),
        noSpeechTimeout: z.string().optional(),
        useTimeoutBasedEndpointing: z.boolean().optional(),
      }).optional(),
    }).optional(),
    conditionalCases: z.array(z.object({
      cases: z.array(z.object({
        caseContent: z.unknown().optional(),
        condition: z.unknown().optional(),
      })).optional(),
    })).optional(),
    enableGenerativeFallback: z.boolean().optional(),
    generators: z.array(z.object({
      generator: z.string().optional(),
      inputParameters: z.record(z.string(), z.string()).optional(),
      outputParameter: z.string().optional(),
    })).optional(),
    messages: z.array(z.object({
      channel: z.string().optional(),
      conversationSuccess: z.object({
        metadata: z.record(z.string(), z.unknown()).optional(),
      }).optional(),
      endInteraction: z.object({}).optional(),
      knowledgeInfoCard: z.object({}).optional(),
      liveAgentHandoff: z.object({
        metadata: z.record(z.string(), z.unknown()).optional(),
      }).optional(),
      mixedAudio: z.object({
        segments: z.array(z.unknown()).optional(),
      }).optional(),
      outputAudioText: z.object({
        allowPlaybackInterruption: z.boolean().optional(),
        ssml: z.string().optional(),
        text: z.string().optional(),
      }).optional(),
      payload: z.record(z.string(), z.string()).optional(),
      playAudio: z.object({
        allowPlaybackInterruption: z.boolean().optional(),
        audioUri: z.string().optional(),
      }).optional(),
      responseType: z.enum([
        "RESPONSE_TYPE_UNSPECIFIED",
        "ENTRY_PROMPT",
        "PARAMETER_PROMPT",
        "HANDLER_PROMPT",
      ]).optional(),
      telephonyTransferCall: z.object({
        phoneNumber: z.string().optional(),
      }).optional(),
      text: z.object({
        allowPlaybackInterruption: z.boolean().optional(),
        text: z.array(z.unknown()).optional(),
      }).optional(),
      toolCall: z.object({
        action: z.string().optional(),
        inputParameters: z.record(z.string(), z.unknown()).optional(),
        tool: z.string().optional(),
      }).optional(),
    })).optional(),
    returnPartialResponses: z.boolean().optional(),
    setParameterActions: z.array(z.object({
      parameter: z.string().optional(),
      value: z.string().optional(),
    })).optional(),
    tag: z.string().optional(),
    webhook: z.string().optional(),
  }).optional(),
  eventHandlers: z.array(z.object({
    event: z.string().optional(),
    name: z.string().optional(),
    targetFlow: z.string().optional(),
    targetPage: z.string().optional(),
    targetPlaybook: z.string().optional(),
    triggerFulfillment: z.object({
      advancedSettings: z.object({
        audioExportGcsDestination: z.object({
          uri: z.unknown().optional(),
        }).optional(),
        dtmfSettings: z.object({
          enabled: z.unknown().optional(),
          endpointingTimeoutDuration: z.unknown().optional(),
          finishDigit: z.unknown().optional(),
          interdigitTimeoutDuration: z.unknown().optional(),
          maxDigits: z.unknown().optional(),
        }).optional(),
        loggingSettings: z.object({
          enableConsentBasedRedaction: z.unknown().optional(),
          enableInteractionLogging: z.unknown().optional(),
          enableStackdriverLogging: z.unknown().optional(),
        }).optional(),
        speechSettings: z.object({
          endpointerSensitivity: z.unknown().optional(),
          models: z.unknown().optional(),
          noSpeechTimeout: z.unknown().optional(),
          useTimeoutBasedEndpointing: z.unknown().optional(),
        }).optional(),
      }).optional(),
      conditionalCases: z.array(z.object({
        cases: z.unknown().optional(),
      })).optional(),
      enableGenerativeFallback: z.boolean().optional(),
      generators: z.array(z.object({
        generator: z.unknown().optional(),
        inputParameters: z.unknown().optional(),
        outputParameter: z.unknown().optional(),
      })).optional(),
      messages: z.array(z.object({
        channel: z.unknown().optional(),
        conversationSuccess: z.unknown().optional(),
        endInteraction: z.unknown().optional(),
        knowledgeInfoCard: z.unknown().optional(),
        liveAgentHandoff: z.unknown().optional(),
        mixedAudio: z.unknown().optional(),
        outputAudioText: z.unknown().optional(),
        payload: z.unknown().optional(),
        playAudio: z.unknown().optional(),
        responseType: z.unknown().optional(),
        telephonyTransferCall: z.unknown().optional(),
        text: z.unknown().optional(),
        toolCall: z.unknown().optional(),
      })).optional(),
      returnPartialResponses: z.boolean().optional(),
      setParameterActions: z.array(z.object({
        parameter: z.unknown().optional(),
        value: z.unknown().optional(),
      })).optional(),
      tag: z.string().optional(),
      webhook: z.string().optional(),
    }).optional(),
  })).optional(),
  form: z.object({
    parameters: z.array(z.object({
      advancedSettings: z.object({
        audioExportGcsDestination: z.object({
          uri: z.unknown().optional(),
        }).optional(),
        dtmfSettings: z.object({
          enabled: z.unknown().optional(),
          endpointingTimeoutDuration: z.unknown().optional(),
          finishDigit: z.unknown().optional(),
          interdigitTimeoutDuration: z.unknown().optional(),
          maxDigits: z.unknown().optional(),
        }).optional(),
        loggingSettings: z.object({
          enableConsentBasedRedaction: z.unknown().optional(),
          enableInteractionLogging: z.unknown().optional(),
          enableStackdriverLogging: z.unknown().optional(),
        }).optional(),
        speechSettings: z.object({
          endpointerSensitivity: z.unknown().optional(),
          models: z.unknown().optional(),
          noSpeechTimeout: z.unknown().optional(),
          useTimeoutBasedEndpointing: z.unknown().optional(),
        }).optional(),
      }).optional(),
      defaultValue: z.string().optional(),
      displayName: z.string().optional(),
      entityType: z.string().optional(),
      fillBehavior: z.object({
        initialPromptFulfillment: z.object({
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
        repromptEventHandlers: z.array(z.unknown()).optional(),
      }).optional(),
      isList: z.boolean().optional(),
      redact: z.boolean().optional(),
      required: z.boolean().optional(),
    })).optional(),
  }).optional(),
  knowledgeConnectorSettings: z.object({
    dataStoreConnections: z.array(z.object({
      dataStore: z.string().optional(),
      dataStoreType: z.enum([
        "DATA_STORE_TYPE_UNSPECIFIED",
        "PUBLIC_WEB",
        "UNSTRUCTURED",
        "STRUCTURED",
      ]).optional(),
      documentProcessingMode: z.enum([
        "DOCUMENT_PROCESSING_MODE_UNSPECIFIED",
        "DOCUMENTS",
        "CHUNKS",
      ]).optional(),
    })).optional(),
    enabled: z.boolean().optional(),
    targetFlow: z.string().optional(),
    targetPage: z.string().optional(),
    triggerFulfillment: z.object({
      advancedSettings: z.object({
        audioExportGcsDestination: z.object({
          uri: z.string().optional(),
        }).optional(),
        dtmfSettings: z.object({
          enabled: z.boolean().optional(),
          endpointingTimeoutDuration: z.string().optional(),
          finishDigit: z.string().optional(),
          interdigitTimeoutDuration: z.string().optional(),
          maxDigits: z.number().int().optional(),
        }).optional(),
        loggingSettings: z.object({
          enableConsentBasedRedaction: z.boolean().optional(),
          enableInteractionLogging: z.boolean().optional(),
          enableStackdriverLogging: z.boolean().optional(),
        }).optional(),
        speechSettings: z.object({
          endpointerSensitivity: z.number().int().optional(),
          models: z.record(z.string(), z.unknown()).optional(),
          noSpeechTimeout: z.string().optional(),
          useTimeoutBasedEndpointing: z.boolean().optional(),
        }).optional(),
      }).optional(),
      conditionalCases: z.array(z.object({
        cases: z.array(z.unknown()).optional(),
      })).optional(),
      enableGenerativeFallback: z.boolean().optional(),
      generators: z.array(z.object({
        generator: z.string().optional(),
        inputParameters: z.record(z.string(), z.unknown()).optional(),
        outputParameter: z.string().optional(),
      })).optional(),
      messages: z.array(z.object({
        channel: z.string().optional(),
        conversationSuccess: z.object({
          metadata: z.unknown().optional(),
        }).optional(),
        endInteraction: z.object({}).optional(),
        knowledgeInfoCard: z.object({}).optional(),
        liveAgentHandoff: z.object({
          metadata: z.unknown().optional(),
        }).optional(),
        mixedAudio: z.object({
          segments: z.unknown().optional(),
        }).optional(),
        outputAudioText: z.object({
          allowPlaybackInterruption: z.unknown().optional(),
          ssml: z.unknown().optional(),
          text: z.unknown().optional(),
        }).optional(),
        payload: z.record(z.string(), z.unknown()).optional(),
        playAudio: z.object({
          allowPlaybackInterruption: z.unknown().optional(),
          audioUri: z.unknown().optional(),
        }).optional(),
        responseType: z.enum([
          "RESPONSE_TYPE_UNSPECIFIED",
          "ENTRY_PROMPT",
          "PARAMETER_PROMPT",
          "HANDLER_PROMPT",
        ]).optional(),
        telephonyTransferCall: z.object({
          phoneNumber: z.unknown().optional(),
        }).optional(),
        text: z.object({
          allowPlaybackInterruption: z.unknown().optional(),
          text: z.unknown().optional(),
        }).optional(),
        toolCall: z.object({
          action: z.unknown().optional(),
          inputParameters: z.unknown().optional(),
          tool: z.unknown().optional(),
        }).optional(),
      })).optional(),
      returnPartialResponses: z.boolean().optional(),
      setParameterActions: z.array(z.object({
        parameter: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      tag: z.string().optional(),
      webhook: z.string().optional(),
    }).optional(),
  }).optional(),
  name: z.string().optional(),
  transitionRouteGroups: z.array(z.string()).optional(),
  transitionRoutes: z.array(z.object({
    condition: z.string().optional(),
    description: z.string().optional(),
    intent: z.string().optional(),
    name: z.string().optional(),
    targetFlow: z.string().optional(),
    targetPage: z.string().optional(),
    triggerFulfillment: z.object({
      advancedSettings: z.object({
        audioExportGcsDestination: z.object({
          uri: z.unknown().optional(),
        }).optional(),
        dtmfSettings: z.object({
          enabled: z.unknown().optional(),
          endpointingTimeoutDuration: z.unknown().optional(),
          finishDigit: z.unknown().optional(),
          interdigitTimeoutDuration: z.unknown().optional(),
          maxDigits: z.unknown().optional(),
        }).optional(),
        loggingSettings: z.object({
          enableConsentBasedRedaction: z.unknown().optional(),
          enableInteractionLogging: z.unknown().optional(),
          enableStackdriverLogging: z.unknown().optional(),
        }).optional(),
        speechSettings: z.object({
          endpointerSensitivity: z.unknown().optional(),
          models: z.unknown().optional(),
          noSpeechTimeout: z.unknown().optional(),
          useTimeoutBasedEndpointing: z.unknown().optional(),
        }).optional(),
      }).optional(),
      conditionalCases: z.array(z.object({
        cases: z.unknown().optional(),
      })).optional(),
      enableGenerativeFallback: z.boolean().optional(),
      generators: z.array(z.object({
        generator: z.unknown().optional(),
        inputParameters: z.unknown().optional(),
        outputParameter: z.unknown().optional(),
      })).optional(),
      messages: z.array(z.object({
        channel: z.unknown().optional(),
        conversationSuccess: z.unknown().optional(),
        endInteraction: z.unknown().optional(),
        knowledgeInfoCard: z.unknown().optional(),
        liveAgentHandoff: z.unknown().optional(),
        mixedAudio: z.unknown().optional(),
        outputAudioText: z.unknown().optional(),
        payload: z.unknown().optional(),
        playAudio: z.unknown().optional(),
        responseType: z.unknown().optional(),
        telephonyTransferCall: z.unknown().optional(),
        text: z.unknown().optional(),
        toolCall: z.unknown().optional(),
      })).optional(),
      returnPartialResponses: z.boolean().optional(),
      setParameterActions: z.array(z.object({
        parameter: z.unknown().optional(),
        value: z.unknown().optional(),
      })).optional(),
      tag: z.string().optional(),
      webhook: z.string().optional(),
    }).optional(),
  })).optional(),
  languageCode: z.string().describe("The languageCode for this resource")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  advancedSettings: z.object({
    audioExportGcsDestination: z.object({
      uri: z.string(),
    }),
    dtmfSettings: z.object({
      enabled: z.boolean(),
      endpointingTimeoutDuration: z.string(),
      finishDigit: z.string(),
      interdigitTimeoutDuration: z.string(),
      maxDigits: z.number(),
    }),
    loggingSettings: z.object({
      enableConsentBasedRedaction: z.boolean(),
      enableInteractionLogging: z.boolean(),
      enableStackdriverLogging: z.boolean(),
    }),
    speechSettings: z.object({
      endpointerSensitivity: z.number(),
      models: z.record(z.string(), z.unknown()),
      noSpeechTimeout: z.string(),
      useTimeoutBasedEndpointing: z.boolean(),
    }),
  }).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  entryFulfillment: z.object({
    advancedSettings: z.object({
      audioExportGcsDestination: z.object({
        uri: z.string(),
      }),
      dtmfSettings: z.object({
        enabled: z.boolean(),
        endpointingTimeoutDuration: z.string(),
        finishDigit: z.string(),
        interdigitTimeoutDuration: z.string(),
        maxDigits: z.number(),
      }),
      loggingSettings: z.object({
        enableConsentBasedRedaction: z.boolean(),
        enableInteractionLogging: z.boolean(),
        enableStackdriverLogging: z.boolean(),
      }),
      speechSettings: z.object({
        endpointerSensitivity: z.number(),
        models: z.record(z.string(), z.unknown()),
        noSpeechTimeout: z.string(),
        useTimeoutBasedEndpointing: z.boolean(),
      }),
    }),
    conditionalCases: z.array(z.object({
      cases: z.array(z.object({
        caseContent: z.unknown(),
        condition: z.unknown(),
      })),
    })),
    enableGenerativeFallback: z.boolean(),
    generators: z.array(z.object({
      generator: z.string(),
      inputParameters: z.record(z.string(), z.unknown()),
      outputParameter: z.string(),
    })),
    messages: z.array(z.object({
      channel: z.string(),
      conversationSuccess: z.object({
        metadata: z.record(z.string(), z.unknown()),
      }),
      endInteraction: z.object({}),
      knowledgeInfoCard: z.object({}),
      liveAgentHandoff: z.object({
        metadata: z.record(z.string(), z.unknown()),
      }),
      mixedAudio: z.object({
        segments: z.array(z.unknown()),
      }),
      outputAudioText: z.object({
        allowPlaybackInterruption: z.boolean(),
        ssml: z.string(),
        text: z.string(),
      }),
      payload: z.record(z.string(), z.unknown()),
      playAudio: z.object({
        allowPlaybackInterruption: z.boolean(),
        audioUri: z.string(),
      }),
      responseType: z.string(),
      telephonyTransferCall: z.object({
        phoneNumber: z.string(),
      }),
      text: z.object({
        allowPlaybackInterruption: z.boolean(),
        text: z.array(z.unknown()),
      }),
      toolCall: z.object({
        action: z.string(),
        inputParameters: z.record(z.string(), z.unknown()),
        tool: z.string(),
      }),
    })),
    returnPartialResponses: z.boolean(),
    setParameterActions: z.array(z.object({
      parameter: z.string(),
      value: z.string(),
    })),
    tag: z.string(),
    webhook: z.string(),
  }).optional(),
  eventHandlers: z.array(z.object({
    event: z.string(),
    name: z.string(),
    targetFlow: z.string(),
    targetPage: z.string(),
    targetPlaybook: z.string(),
    triggerFulfillment: z.object({
      advancedSettings: z.object({
        audioExportGcsDestination: z.object({
          uri: z.unknown(),
        }),
        dtmfSettings: z.object({
          enabled: z.unknown(),
          endpointingTimeoutDuration: z.unknown(),
          finishDigit: z.unknown(),
          interdigitTimeoutDuration: z.unknown(),
          maxDigits: z.unknown(),
        }),
        loggingSettings: z.object({
          enableConsentBasedRedaction: z.unknown(),
          enableInteractionLogging: z.unknown(),
          enableStackdriverLogging: z.unknown(),
        }),
        speechSettings: z.object({
          endpointerSensitivity: z.unknown(),
          models: z.unknown(),
          noSpeechTimeout: z.unknown(),
          useTimeoutBasedEndpointing: z.unknown(),
        }),
      }),
      conditionalCases: z.array(z.object({
        cases: z.unknown(),
      })),
      enableGenerativeFallback: z.boolean(),
      generators: z.array(z.object({
        generator: z.unknown(),
        inputParameters: z.unknown(),
        outputParameter: z.unknown(),
      })),
      messages: z.array(z.object({
        channel: z.unknown(),
        conversationSuccess: z.unknown(),
        endInteraction: z.unknown(),
        knowledgeInfoCard: z.unknown(),
        liveAgentHandoff: z.unknown(),
        mixedAudio: z.unknown(),
        outputAudioText: z.unknown(),
        payload: z.unknown(),
        playAudio: z.unknown(),
        responseType: z.unknown(),
        telephonyTransferCall: z.unknown(),
        text: z.unknown(),
        toolCall: z.unknown(),
      })),
      returnPartialResponses: z.boolean(),
      setParameterActions: z.array(z.object({
        parameter: z.unknown(),
        value: z.unknown(),
      })),
      tag: z.string(),
      webhook: z.string(),
    }),
  })).optional(),
  form: z.object({
    parameters: z.array(z.object({
      advancedSettings: z.object({
        audioExportGcsDestination: z.object({
          uri: z.unknown(),
        }),
        dtmfSettings: z.object({
          enabled: z.unknown(),
          endpointingTimeoutDuration: z.unknown(),
          finishDigit: z.unknown(),
          interdigitTimeoutDuration: z.unknown(),
          maxDigits: z.unknown(),
        }),
        loggingSettings: z.object({
          enableConsentBasedRedaction: z.unknown(),
          enableInteractionLogging: z.unknown(),
          enableStackdriverLogging: z.unknown(),
        }),
        speechSettings: z.object({
          endpointerSensitivity: z.unknown(),
          models: z.unknown(),
          noSpeechTimeout: z.unknown(),
          useTimeoutBasedEndpointing: z.unknown(),
        }),
      }),
      defaultValue: z.string(),
      displayName: z.string(),
      entityType: z.string(),
      fillBehavior: z.object({
        initialPromptFulfillment: z.object({
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
        repromptEventHandlers: z.array(z.unknown()),
      }),
      isList: z.boolean(),
      redact: z.boolean(),
      required: z.boolean(),
    })),
  }).optional(),
  knowledgeConnectorSettings: z.object({
    dataStoreConnections: z.array(z.object({
      dataStore: z.string(),
      dataStoreType: z.string(),
      documentProcessingMode: z.string(),
    })),
    enabled: z.boolean(),
    targetFlow: z.string(),
    targetPage: z.string(),
    triggerFulfillment: z.object({
      advancedSettings: z.object({
        audioExportGcsDestination: z.object({
          uri: z.string(),
        }),
        dtmfSettings: z.object({
          enabled: z.boolean(),
          endpointingTimeoutDuration: z.string(),
          finishDigit: z.string(),
          interdigitTimeoutDuration: z.string(),
          maxDigits: z.number(),
        }),
        loggingSettings: z.object({
          enableConsentBasedRedaction: z.boolean(),
          enableInteractionLogging: z.boolean(),
          enableStackdriverLogging: z.boolean(),
        }),
        speechSettings: z.object({
          endpointerSensitivity: z.number(),
          models: z.record(z.string(), z.unknown()),
          noSpeechTimeout: z.string(),
          useTimeoutBasedEndpointing: z.boolean(),
        }),
      }),
      conditionalCases: z.array(z.object({
        cases: z.array(z.unknown()),
      })),
      enableGenerativeFallback: z.boolean(),
      generators: z.array(z.object({
        generator: z.string(),
        inputParameters: z.record(z.string(), z.unknown()),
        outputParameter: z.string(),
      })),
      messages: z.array(z.object({
        channel: z.string(),
        conversationSuccess: z.object({
          metadata: z.unknown(),
        }),
        endInteraction: z.object({}),
        knowledgeInfoCard: z.object({}),
        liveAgentHandoff: z.object({
          metadata: z.unknown(),
        }),
        mixedAudio: z.object({
          segments: z.unknown(),
        }),
        outputAudioText: z.object({
          allowPlaybackInterruption: z.unknown(),
          ssml: z.unknown(),
          text: z.unknown(),
        }),
        payload: z.record(z.string(), z.unknown()),
        playAudio: z.object({
          allowPlaybackInterruption: z.unknown(),
          audioUri: z.unknown(),
        }),
        responseType: z.string(),
        telephonyTransferCall: z.object({
          phoneNumber: z.unknown(),
        }),
        text: z.object({
          allowPlaybackInterruption: z.unknown(),
          text: z.unknown(),
        }),
        toolCall: z.object({
          action: z.unknown(),
          inputParameters: z.unknown(),
          tool: z.unknown(),
        }),
      })),
      returnPartialResponses: z.boolean(),
      setParameterActions: z.array(z.object({
        parameter: z.string(),
        value: z.string(),
      })),
      tag: z.string(),
      webhook: z.string(),
    }),
  }).optional(),
  name: z.string(),
  transitionRouteGroups: z.array(z.string()).optional(),
  transitionRoutes: z.array(z.object({
    condition: z.string(),
    description: z.string(),
    intent: z.string(),
    name: z.string(),
    targetFlow: z.string(),
    targetPage: z.string(),
    triggerFulfillment: z.object({
      advancedSettings: z.object({
        audioExportGcsDestination: z.object({
          uri: z.unknown(),
        }),
        dtmfSettings: z.object({
          enabled: z.unknown(),
          endpointingTimeoutDuration: z.unknown(),
          finishDigit: z.unknown(),
          interdigitTimeoutDuration: z.unknown(),
          maxDigits: z.unknown(),
        }),
        loggingSettings: z.object({
          enableConsentBasedRedaction: z.unknown(),
          enableInteractionLogging: z.unknown(),
          enableStackdriverLogging: z.unknown(),
        }),
        speechSettings: z.object({
          endpointerSensitivity: z.unknown(),
          models: z.unknown(),
          noSpeechTimeout: z.unknown(),
          useTimeoutBasedEndpointing: z.unknown(),
        }),
      }),
      conditionalCases: z.array(z.object({
        cases: z.unknown(),
      })),
      enableGenerativeFallback: z.boolean(),
      generators: z.array(z.object({
        generator: z.unknown(),
        inputParameters: z.unknown(),
        outputParameter: z.unknown(),
      })),
      messages: z.array(z.object({
        channel: z.unknown(),
        conversationSuccess: z.unknown(),
        endInteraction: z.unknown(),
        knowledgeInfoCard: z.unknown(),
        liveAgentHandoff: z.unknown(),
        mixedAudio: z.unknown(),
        outputAudioText: z.unknown(),
        payload: z.unknown(),
        playAudio: z.unknown(),
        responseType: z.unknown(),
        telephonyTransferCall: z.unknown(),
        text: z.unknown(),
        toolCall: z.unknown(),
      })),
      returnPartialResponses: z.boolean(),
      setParameterActions: z.array(z.object({
        parameter: z.unknown(),
        value: z.unknown(),
      })),
      tag: z.string(),
      webhook: z.string(),
    }),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  advancedSettings: z.object({
    audioExportGcsDestination: z.object({
      uri: z.string().optional(),
    }).optional(),
    dtmfSettings: z.object({
      enabled: z.boolean().optional(),
      endpointingTimeoutDuration: z.string().optional(),
      finishDigit: z.string().optional(),
      interdigitTimeoutDuration: z.string().optional(),
      maxDigits: z.number().int().optional(),
    }).optional(),
    loggingSettings: z.object({
      enableConsentBasedRedaction: z.boolean().optional(),
      enableInteractionLogging: z.boolean().optional(),
      enableStackdriverLogging: z.boolean().optional(),
    }).optional(),
    speechSettings: z.object({
      endpointerSensitivity: z.number().int().optional(),
      models: z.record(z.string(), z.string()).optional(),
      noSpeechTimeout: z.string().optional(),
      useTimeoutBasedEndpointing: z.boolean().optional(),
    }).optional(),
  }).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  entryFulfillment: z.object({
    advancedSettings: z.object({
      audioExportGcsDestination: z.object({
        uri: z.string().optional(),
      }).optional(),
      dtmfSettings: z.object({
        enabled: z.boolean().optional(),
        endpointingTimeoutDuration: z.string().optional(),
        finishDigit: z.string().optional(),
        interdigitTimeoutDuration: z.string().optional(),
        maxDigits: z.number().int().optional(),
      }).optional(),
      loggingSettings: z.object({
        enableConsentBasedRedaction: z.boolean().optional(),
        enableInteractionLogging: z.boolean().optional(),
        enableStackdriverLogging: z.boolean().optional(),
      }).optional(),
      speechSettings: z.object({
        endpointerSensitivity: z.number().int().optional(),
        models: z.record(z.string(), z.string()).optional(),
        noSpeechTimeout: z.string().optional(),
        useTimeoutBasedEndpointing: z.boolean().optional(),
      }).optional(),
    }).optional(),
    conditionalCases: z.array(z.object({
      cases: z.array(z.object({
        caseContent: z.unknown().optional(),
        condition: z.unknown().optional(),
      })).optional(),
    })).optional(),
    enableGenerativeFallback: z.boolean().optional(),
    generators: z.array(z.object({
      generator: z.string().optional(),
      inputParameters: z.record(z.string(), z.string()).optional(),
      outputParameter: z.string().optional(),
    })).optional(),
    messages: z.array(z.object({
      channel: z.string().optional(),
      conversationSuccess: z.object({
        metadata: z.record(z.string(), z.unknown()).optional(),
      }).optional(),
      endInteraction: z.object({}).optional(),
      knowledgeInfoCard: z.object({}).optional(),
      liveAgentHandoff: z.object({
        metadata: z.record(z.string(), z.unknown()).optional(),
      }).optional(),
      mixedAudio: z.object({
        segments: z.array(z.unknown()).optional(),
      }).optional(),
      outputAudioText: z.object({
        allowPlaybackInterruption: z.boolean().optional(),
        ssml: z.string().optional(),
        text: z.string().optional(),
      }).optional(),
      payload: z.record(z.string(), z.string()).optional(),
      playAudio: z.object({
        allowPlaybackInterruption: z.boolean().optional(),
        audioUri: z.string().optional(),
      }).optional(),
      responseType: z.enum([
        "RESPONSE_TYPE_UNSPECIFIED",
        "ENTRY_PROMPT",
        "PARAMETER_PROMPT",
        "HANDLER_PROMPT",
      ]).optional(),
      telephonyTransferCall: z.object({
        phoneNumber: z.string().optional(),
      }).optional(),
      text: z.object({
        allowPlaybackInterruption: z.boolean().optional(),
        text: z.array(z.unknown()).optional(),
      }).optional(),
      toolCall: z.object({
        action: z.string().optional(),
        inputParameters: z.record(z.string(), z.unknown()).optional(),
        tool: z.string().optional(),
      }).optional(),
    })).optional(),
    returnPartialResponses: z.boolean().optional(),
    setParameterActions: z.array(z.object({
      parameter: z.string().optional(),
      value: z.string().optional(),
    })).optional(),
    tag: z.string().optional(),
    webhook: z.string().optional(),
  }).optional(),
  eventHandlers: z.array(z.object({
    event: z.string().optional(),
    name: z.string().optional(),
    targetFlow: z.string().optional(),
    targetPage: z.string().optional(),
    targetPlaybook: z.string().optional(),
    triggerFulfillment: z.object({
      advancedSettings: z.object({
        audioExportGcsDestination: z.object({
          uri: z.unknown().optional(),
        }).optional(),
        dtmfSettings: z.object({
          enabled: z.unknown().optional(),
          endpointingTimeoutDuration: z.unknown().optional(),
          finishDigit: z.unknown().optional(),
          interdigitTimeoutDuration: z.unknown().optional(),
          maxDigits: z.unknown().optional(),
        }).optional(),
        loggingSettings: z.object({
          enableConsentBasedRedaction: z.unknown().optional(),
          enableInteractionLogging: z.unknown().optional(),
          enableStackdriverLogging: z.unknown().optional(),
        }).optional(),
        speechSettings: z.object({
          endpointerSensitivity: z.unknown().optional(),
          models: z.unknown().optional(),
          noSpeechTimeout: z.unknown().optional(),
          useTimeoutBasedEndpointing: z.unknown().optional(),
        }).optional(),
      }).optional(),
      conditionalCases: z.array(z.object({
        cases: z.unknown().optional(),
      })).optional(),
      enableGenerativeFallback: z.boolean().optional(),
      generators: z.array(z.object({
        generator: z.unknown().optional(),
        inputParameters: z.unknown().optional(),
        outputParameter: z.unknown().optional(),
      })).optional(),
      messages: z.array(z.object({
        channel: z.unknown().optional(),
        conversationSuccess: z.unknown().optional(),
        endInteraction: z.unknown().optional(),
        knowledgeInfoCard: z.unknown().optional(),
        liveAgentHandoff: z.unknown().optional(),
        mixedAudio: z.unknown().optional(),
        outputAudioText: z.unknown().optional(),
        payload: z.unknown().optional(),
        playAudio: z.unknown().optional(),
        responseType: z.unknown().optional(),
        telephonyTransferCall: z.unknown().optional(),
        text: z.unknown().optional(),
        toolCall: z.unknown().optional(),
      })).optional(),
      returnPartialResponses: z.boolean().optional(),
      setParameterActions: z.array(z.object({
        parameter: z.unknown().optional(),
        value: z.unknown().optional(),
      })).optional(),
      tag: z.string().optional(),
      webhook: z.string().optional(),
    }).optional(),
  })).optional(),
  form: z.object({
    parameters: z.array(z.object({
      advancedSettings: z.object({
        audioExportGcsDestination: z.object({
          uri: z.unknown().optional(),
        }).optional(),
        dtmfSettings: z.object({
          enabled: z.unknown().optional(),
          endpointingTimeoutDuration: z.unknown().optional(),
          finishDigit: z.unknown().optional(),
          interdigitTimeoutDuration: z.unknown().optional(),
          maxDigits: z.unknown().optional(),
        }).optional(),
        loggingSettings: z.object({
          enableConsentBasedRedaction: z.unknown().optional(),
          enableInteractionLogging: z.unknown().optional(),
          enableStackdriverLogging: z.unknown().optional(),
        }).optional(),
        speechSettings: z.object({
          endpointerSensitivity: z.unknown().optional(),
          models: z.unknown().optional(),
          noSpeechTimeout: z.unknown().optional(),
          useTimeoutBasedEndpointing: z.unknown().optional(),
        }).optional(),
      }).optional(),
      defaultValue: z.string().optional(),
      displayName: z.string().optional(),
      entityType: z.string().optional(),
      fillBehavior: z.object({
        initialPromptFulfillment: z.object({
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
        repromptEventHandlers: z.array(z.unknown()).optional(),
      }).optional(),
      isList: z.boolean().optional(),
      redact: z.boolean().optional(),
      required: z.boolean().optional(),
    })).optional(),
  }).optional(),
  knowledgeConnectorSettings: z.object({
    dataStoreConnections: z.array(z.object({
      dataStore: z.string().optional(),
      dataStoreType: z.enum([
        "DATA_STORE_TYPE_UNSPECIFIED",
        "PUBLIC_WEB",
        "UNSTRUCTURED",
        "STRUCTURED",
      ]).optional(),
      documentProcessingMode: z.enum([
        "DOCUMENT_PROCESSING_MODE_UNSPECIFIED",
        "DOCUMENTS",
        "CHUNKS",
      ]).optional(),
    })).optional(),
    enabled: z.boolean().optional(),
    targetFlow: z.string().optional(),
    targetPage: z.string().optional(),
    triggerFulfillment: z.object({
      advancedSettings: z.object({
        audioExportGcsDestination: z.object({
          uri: z.string().optional(),
        }).optional(),
        dtmfSettings: z.object({
          enabled: z.boolean().optional(),
          endpointingTimeoutDuration: z.string().optional(),
          finishDigit: z.string().optional(),
          interdigitTimeoutDuration: z.string().optional(),
          maxDigits: z.number().int().optional(),
        }).optional(),
        loggingSettings: z.object({
          enableConsentBasedRedaction: z.boolean().optional(),
          enableInteractionLogging: z.boolean().optional(),
          enableStackdriverLogging: z.boolean().optional(),
        }).optional(),
        speechSettings: z.object({
          endpointerSensitivity: z.number().int().optional(),
          models: z.record(z.string(), z.unknown()).optional(),
          noSpeechTimeout: z.string().optional(),
          useTimeoutBasedEndpointing: z.boolean().optional(),
        }).optional(),
      }).optional(),
      conditionalCases: z.array(z.object({
        cases: z.array(z.unknown()).optional(),
      })).optional(),
      enableGenerativeFallback: z.boolean().optional(),
      generators: z.array(z.object({
        generator: z.string().optional(),
        inputParameters: z.record(z.string(), z.unknown()).optional(),
        outputParameter: z.string().optional(),
      })).optional(),
      messages: z.array(z.object({
        channel: z.string().optional(),
        conversationSuccess: z.object({
          metadata: z.unknown().optional(),
        }).optional(),
        endInteraction: z.object({}).optional(),
        knowledgeInfoCard: z.object({}).optional(),
        liveAgentHandoff: z.object({
          metadata: z.unknown().optional(),
        }).optional(),
        mixedAudio: z.object({
          segments: z.unknown().optional(),
        }).optional(),
        outputAudioText: z.object({
          allowPlaybackInterruption: z.unknown().optional(),
          ssml: z.unknown().optional(),
          text: z.unknown().optional(),
        }).optional(),
        payload: z.record(z.string(), z.unknown()).optional(),
        playAudio: z.object({
          allowPlaybackInterruption: z.unknown().optional(),
          audioUri: z.unknown().optional(),
        }).optional(),
        responseType: z.enum([
          "RESPONSE_TYPE_UNSPECIFIED",
          "ENTRY_PROMPT",
          "PARAMETER_PROMPT",
          "HANDLER_PROMPT",
        ]).optional(),
        telephonyTransferCall: z.object({
          phoneNumber: z.unknown().optional(),
        }).optional(),
        text: z.object({
          allowPlaybackInterruption: z.unknown().optional(),
          text: z.unknown().optional(),
        }).optional(),
        toolCall: z.object({
          action: z.unknown().optional(),
          inputParameters: z.unknown().optional(),
          tool: z.unknown().optional(),
        }).optional(),
      })).optional(),
      returnPartialResponses: z.boolean().optional(),
      setParameterActions: z.array(z.object({
        parameter: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      tag: z.string().optional(),
      webhook: z.string().optional(),
    }).optional(),
  }).optional(),
  name: z.string().optional(),
  transitionRouteGroups: z.array(z.string()).optional(),
  transitionRoutes: z.array(z.object({
    condition: z.string().optional(),
    description: z.string().optional(),
    intent: z.string().optional(),
    name: z.string().optional(),
    targetFlow: z.string().optional(),
    targetPage: z.string().optional(),
    triggerFulfillment: z.object({
      advancedSettings: z.object({
        audioExportGcsDestination: z.object({
          uri: z.unknown().optional(),
        }).optional(),
        dtmfSettings: z.object({
          enabled: z.unknown().optional(),
          endpointingTimeoutDuration: z.unknown().optional(),
          finishDigit: z.unknown().optional(),
          interdigitTimeoutDuration: z.unknown().optional(),
          maxDigits: z.unknown().optional(),
        }).optional(),
        loggingSettings: z.object({
          enableConsentBasedRedaction: z.unknown().optional(),
          enableInteractionLogging: z.unknown().optional(),
          enableStackdriverLogging: z.unknown().optional(),
        }).optional(),
        speechSettings: z.object({
          endpointerSensitivity: z.unknown().optional(),
          models: z.unknown().optional(),
          noSpeechTimeout: z.unknown().optional(),
          useTimeoutBasedEndpointing: z.unknown().optional(),
        }).optional(),
      }).optional(),
      conditionalCases: z.array(z.object({
        cases: z.unknown().optional(),
      })).optional(),
      enableGenerativeFallback: z.boolean().optional(),
      generators: z.array(z.object({
        generator: z.unknown().optional(),
        inputParameters: z.unknown().optional(),
        outputParameter: z.unknown().optional(),
      })).optional(),
      messages: z.array(z.object({
        channel: z.unknown().optional(),
        conversationSuccess: z.unknown().optional(),
        endInteraction: z.unknown().optional(),
        knowledgeInfoCard: z.unknown().optional(),
        liveAgentHandoff: z.unknown().optional(),
        mixedAudio: z.unknown().optional(),
        outputAudioText: z.unknown().optional(),
        payload: z.unknown().optional(),
        playAudio: z.unknown().optional(),
        responseType: z.unknown().optional(),
        telephonyTransferCall: z.unknown().optional(),
        text: z.unknown().optional(),
        toolCall: z.unknown().optional(),
      })).optional(),
      returnPartialResponses: z.boolean().optional(),
      setParameterActions: z.array(z.object({
        parameter: z.unknown().optional(),
        value: z.unknown().optional(),
      })).optional(),
      tag: z.string().optional(),
      webhook: z.string().optional(),
    }).optional(),
  })).optional(),
  languageCode: z.string().describe("The languageCode for this resource")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dialogflow Agents.Flows.Pages. Registered at `@swamp/gcp/dialogflow/agents-flows-pages`. */
export const model = {
  type: "@swamp/gcp/dialogflow/agents-flows-pages",
  version: "2026.05.24.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "GCP dialogflow Agents.Flows.Pages resource",
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
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["advancedSettings"] !== undefined) {
          body["advancedSettings"] = g["advancedSettings"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["entryFulfillment"] !== undefined) {
          body["entryFulfillment"] = g["entryFulfillment"];
        }
        if (g["eventHandlers"] !== undefined) {
          body["eventHandlers"] = g["eventHandlers"];
        }
        if (g["form"] !== undefined) body["form"] = g["form"];
        if (g["knowledgeConnectorSettings"] !== undefined) {
          body["knowledgeConnectorSettings"] = g["knowledgeConnectorSettings"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["transitionRouteGroups"] !== undefined) {
          body["transitionRouteGroups"] = g["transitionRouteGroups"];
        }
        if (g["transitionRoutes"] !== undefined) {
          body["transitionRoutes"] = g["transitionRoutes"];
        }
        if (g["languageCode"] !== undefined) {
          body["languageCode"] = g["languageCode"];
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
      description: "Get a pages",
      arguments: z.object({
        identifier: z.string().describe("The name of the pages"),
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
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["advancedSettings"] !== undefined) {
          body["advancedSettings"] = g["advancedSettings"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["entryFulfillment"] !== undefined) {
          body["entryFulfillment"] = g["entryFulfillment"];
        }
        if (g["eventHandlers"] !== undefined) {
          body["eventHandlers"] = g["eventHandlers"];
        }
        if (g["form"] !== undefined) body["form"] = g["form"];
        if (g["knowledgeConnectorSettings"] !== undefined) {
          body["knowledgeConnectorSettings"] = g["knowledgeConnectorSettings"];
        }
        if (g["transitionRouteGroups"] !== undefined) {
          body["transitionRouteGroups"] = g["transitionRouteGroups"];
        }
        if (g["transitionRoutes"] !== undefined) {
          body["transitionRoutes"] = g["transitionRoutes"];
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
  },
};
