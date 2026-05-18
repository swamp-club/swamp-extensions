// Auto-generated extension model for @swamp/gcp/integrations/products-integrations-versions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Application Integration Products.Integrations.Versions.
 *
 * The integration version definition.
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
  return `${parent}/versions/${shortName}`;
}

const BASE_URL = "https://integrations.googleapis.com/";

const GET_CONFIG = {
  "id": "integrations.projects.locations.products.integrations.versions.get",
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
  "id": "integrations.projects.locations.products.integrations.versions.create",
  "path": "v1/{+parent}/versions",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "createSampleIntegrations": {
      "location": "query",
    },
    "newIntegration": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "integrations.projects.locations.products.integrations.versions.patch",
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
  "id": "integrations.projects.locations.products.integrations.versions.delete",
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  cloudKmsKey: z.string().describe(
    "Optional. Cloud KMS resource name for the CMEK encryption key.",
  ).optional(),
  cloudLoggingDetails: z.object({
    cloudLoggingSeverity: z.enum([
      "CLOUD_LOGGING_SEVERITY_UNSPECIFIED",
      "INFO",
      "ERROR",
      "WARNING",
    ]).describe(
      "Optional. Severity selected by the customer for the logs to be sent to Cloud Logging, for the integration version getting executed.",
    ).optional(),
    enableCloudLogging: z.boolean().describe(
      "Optional. Status of whether Cloud Logging is enabled or not for the integration version getting executed.",
    ).optional(),
  }).describe("Cloud Logging details for execution info").optional(),
  createdFromTemplate: z.string().describe(
    "Optional. Optional. The resource name of the template from which the integration is created.",
  ).optional(),
  databasePersistencePolicy: z.enum([
    "DATABASE_PERSISTENCE_POLICY_UNSPECIFIED",
    "DATABASE_PERSISTENCE_DISABLED",
    "DATABASE_PERSISTENCE_ASYNC",
  ]).describe(
    "Optional. Flag to disable database persistence for execution data, including event execution info, execution export info, execution metadata index and execution param index.",
  ).optional(),
  description: z.string().describe("Optional. The integration description.")
    .optional(),
  enableVariableMasking: z.boolean().describe(
    "Optional. True if variable masking feature should be turned on for this version",
  ).optional(),
  errorCatcherConfigs: z.array(z.object({
    description: z.string().describe(
      "Optional. User-provided description intended to give more business context about the error catcher config.",
    ).optional(),
    errorCatcherId: z.string().describe(
      "Required. An error catcher id is string representation for the error catcher config. Within a workflow, error_catcher_id uniquely identifies an error catcher config among all error catcher configs for the workflow",
    ).optional(),
    errorCatcherNumber: z.string().describe(
      "Required. A number to uniquely identify each error catcher config within the workflow on UI.",
    ).optional(),
    label: z.string().describe(
      "Optional. The user created label for a particular error catcher. Optional.",
    ).optional(),
    position: z.object({
      x: z.number().int().describe("Required. X axis of the coordinate")
        .optional(),
      y: z.number().int().describe("Required. Y axis of the coordinate")
        .optional(),
    }).describe("Configuration detail of coordinate, it used for UI")
      .optional(),
    startErrorTasks: z.array(z.object({
      condition: z.string().describe(
        "Standard filter expression for this task to become an eligible next task.",
      ).optional(),
      description: z.string().describe(
        "User-provided description intended to give additional business context about the task.",
      ).optional(),
      displayName: z.string().describe(
        "User-provided label that is attached to this edge in the UI.",
      ).optional(),
      taskConfigId: z.string().describe("ID of the next task.").optional(),
      taskId: z.string().describe("Task number of the next task.").optional(),
    })).describe(
      "Required. The set of start tasks that are to be executed for the error catch flow",
    ).optional(),
  })).describe(
    "Optional. Error Catch Task configuration for the integration. It's optional.",
  ).optional(),
  integrationConfigParameters: z.array(z.object({
    parameter: z.object({
      containsLargeData: z.boolean().describe(
        "Indicates whether this variable contains large data and need to be uploaded to Cloud Storage.",
      ).optional(),
      dataType: z.enum([
        "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED",
        "STRING_VALUE",
        "INT_VALUE",
        "DOUBLE_VALUE",
        "BOOLEAN_VALUE",
        "STRING_ARRAY",
        "INT_ARRAY",
        "DOUBLE_ARRAY",
        "BOOLEAN_ARRAY",
        "JSON_VALUE",
        "PROTO_VALUE",
        "PROTO_ARRAY",
        "NON_SERIALIZABLE_OBJECT",
        "PROTO_ENUM",
        "SERIALIZED_OBJECT_VALUE",
        "PROTO_ENUM_ARRAY",
        "BYTES",
        "BYTES_ARRAY",
      ]).describe("Type of the parameter.").optional(),
      defaultValue: z.object({
        booleanArray: z.object({
          booleanValues: z.unknown().describe("Boolean array.").optional(),
        }).describe("This message only contains a field of boolean array.")
          .optional(),
        booleanValue: z.boolean().describe("Boolean.").optional(),
        doubleArray: z.object({
          doubleValues: z.unknown().describe("Double number array.").optional(),
        }).describe(
          "This message only contains a field of double number array.",
        ).optional(),
        doubleValue: z.number().describe("Double Number.").optional(),
        intArray: z.object({
          intValues: z.unknown().describe("Integer array.").optional(),
        }).describe("This message only contains a field of integer array.")
          .optional(),
        intValue: z.string().describe("Integer.").optional(),
        jsonValue: z.string().describe("Json.").optional(),
        stringArray: z.object({
          stringValues: z.unknown().describe("String array.").optional(),
        }).describe("This message only contains a field of string array.")
          .optional(),
        stringValue: z.string().describe("String.").optional(),
      }).describe("The type of the parameter.").optional(),
      description: z.string().describe(
        "Optional. Description of the parameter.",
      ).optional(),
      displayName: z.string().describe(
        'The name (without prefix) to be displayed in the UI for this parameter. E.g. if the key is "foo.bar.myName", then the name would be "myName".',
      ).optional(),
      inputOutputType: z.enum([
        "IN_OUT_TYPE_UNSPECIFIED",
        "IN",
        "OUT",
        "IN_OUT",
      ]).describe("Specifies the input/output type for the parameter.")
        .optional(),
      isTransient: z.boolean().describe(
        "Whether this parameter is a transient parameter.",
      ).optional(),
      jsonSchema: z.string().describe(
        "This schema will be used to validate runtime JSON-typed values of this parameter.",
      ).optional(),
      key: z.string().describe(
        "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
      ).optional(),
      masked: z.boolean().describe(
        "True if this parameter should be masked in the logs",
      ).optional(),
      producer: z.string().describe(
        "The identifier of the node (TaskConfig/TriggerConfig) this parameter was produced by, if it is a transient param or a copy of an input param.",
      ).optional(),
      searchable: z.boolean().describe(
        "Searchable in the execution log or not.",
      ).optional(),
    }).describe(
      "Integration Parameter is defined in the integration config and are used to provide information about data types of the expected parameters and provide any default values if needed. They can also be used to add custom attributes. These are static in nature and should not be used for dynamic event definition.",
    ).optional(),
    value: z.object({
      booleanArray: z.object({
        booleanValues: z.array(z.unknown()).describe("Boolean array.")
          .optional(),
      }).describe("This message only contains a field of boolean array.")
        .optional(),
      booleanValue: z.boolean().describe("Boolean.").optional(),
      doubleArray: z.object({
        doubleValues: z.array(z.unknown()).describe("Double number array.")
          .optional(),
      }).describe("This message only contains a field of double number array.")
        .optional(),
      doubleValue: z.number().describe("Double Number.").optional(),
      intArray: z.object({
        intValues: z.array(z.unknown()).describe("Integer array.").optional(),
      }).describe("This message only contains a field of integer array.")
        .optional(),
      intValue: z.string().describe("Integer.").optional(),
      jsonValue: z.string().describe("Json.").optional(),
      stringArray: z.object({
        stringValues: z.array(z.unknown()).describe("String array.").optional(),
      }).describe("This message only contains a field of string array.")
        .optional(),
      stringValue: z.string().describe("String.").optional(),
    }).describe("The type of the parameter.").optional(),
  })).describe(
    "Optional. Config Parameters that are expected to be passed to the integration when an integration is published. This consists of all the parameters that are expected to provide configuration in the integration execution. This gives the user the ability to provide default values, value, add information like connection url, project based configuration value and also provide data types of each parameter.",
  ).optional(),
  integrationParameters: z.array(z.object({
    containsLargeData: z.boolean().describe(
      "Indicates whether this variable contains large data and need to be uploaded to Cloud Storage.",
    ).optional(),
    dataType: z.enum([
      "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED",
      "STRING_VALUE",
      "INT_VALUE",
      "DOUBLE_VALUE",
      "BOOLEAN_VALUE",
      "STRING_ARRAY",
      "INT_ARRAY",
      "DOUBLE_ARRAY",
      "BOOLEAN_ARRAY",
      "JSON_VALUE",
      "PROTO_VALUE",
      "PROTO_ARRAY",
      "NON_SERIALIZABLE_OBJECT",
      "PROTO_ENUM",
      "SERIALIZED_OBJECT_VALUE",
      "PROTO_ENUM_ARRAY",
      "BYTES",
      "BYTES_ARRAY",
    ]).describe("Type of the parameter.").optional(),
    defaultValue: z.object({
      booleanArray: z.object({
        booleanValues: z.array(z.unknown()).describe("Boolean array.")
          .optional(),
      }).describe("This message only contains a field of boolean array.")
        .optional(),
      booleanValue: z.boolean().describe("Boolean.").optional(),
      doubleArray: z.object({
        doubleValues: z.array(z.unknown()).describe("Double number array.")
          .optional(),
      }).describe("This message only contains a field of double number array.")
        .optional(),
      doubleValue: z.number().describe("Double Number.").optional(),
      intArray: z.object({
        intValues: z.array(z.unknown()).describe("Integer array.").optional(),
      }).describe("This message only contains a field of integer array.")
        .optional(),
      intValue: z.string().describe("Integer.").optional(),
      jsonValue: z.string().describe("Json.").optional(),
      stringArray: z.object({
        stringValues: z.array(z.unknown()).describe("String array.").optional(),
      }).describe("This message only contains a field of string array.")
        .optional(),
      stringValue: z.string().describe("String.").optional(),
    }).describe("The type of the parameter.").optional(),
    description: z.string().describe("Optional. Description of the parameter.")
      .optional(),
    displayName: z.string().describe(
      'The name (without prefix) to be displayed in the UI for this parameter. E.g. if the key is "foo.bar.myName", then the name would be "myName".',
    ).optional(),
    inputOutputType: z.enum(["IN_OUT_TYPE_UNSPECIFIED", "IN", "OUT", "IN_OUT"])
      .describe("Specifies the input/output type for the parameter.")
      .optional(),
    isTransient: z.boolean().describe(
      "Whether this parameter is a transient parameter.",
    ).optional(),
    jsonSchema: z.string().describe(
      "This schema will be used to validate runtime JSON-typed values of this parameter.",
    ).optional(),
    key: z.string().describe(
      "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
    ).optional(),
    masked: z.boolean().describe(
      "True if this parameter should be masked in the logs",
    ).optional(),
    producer: z.string().describe(
      "The identifier of the node (TaskConfig/TriggerConfig) this parameter was produced by, if it is a transient param or a copy of an input param.",
    ).optional(),
    searchable: z.boolean().describe("Searchable in the execution log or not.")
      .optional(),
  })).describe(
    "Optional. Parameters that are expected to be passed to the integration when an event is triggered. This consists of all the parameters that are expected in the integration execution. This gives the user the ability to provide default values, add information like PII and also provide data types of each parameter.",
  ).optional(),
  integrationParametersInternal: z.object({
    parameters: z.array(z.object({
      attributes: z.object({
        dataType: z.enum([
          "DATA_TYPE_UNSPECIFIED",
          "EMAIL",
          "URL",
          "CURRENCY",
          "TIMESTAMP",
          "DOMAIN_NAME",
        ]).describe(
          "Things like URL, Email, Currency, Timestamp (rather than string, int64...)",
        ).optional(),
        defaultValue: z.object({
          booleanValue: z.unknown().optional(),
          doubleArray: z.unknown().optional(),
          doubleValue: z.unknown().optional(),
          intArray: z.unknown().optional(),
          intValue: z.unknown().optional(),
          protoValue: z.unknown().optional(),
          stringArray: z.unknown().optional(),
          stringValue: z.unknown().optional(),
        }).describe(
          "Used for define type for values. Currently supported value types include int, string, double, array, and any proto message.",
        ).optional(),
        isRequired: z.boolean().describe(
          "Required for event execution. The validation will be done by the event bus when the event is triggered.",
        ).optional(),
        isSearchable: z.boolean().describe(
          "Used to indicate if a ParameterEntry should be converted to ParamIndexes for ST-Spanner full-text search. DEPRECATED: use searchable.",
        ).optional(),
        logSettings: z.object({
          logFieldName: z.unknown().describe(
            "The name of corresponding logging field of the event property. If omitted, assumes the same name as the event property key.",
          ).optional(),
          seedPeriod: z.unknown().optional(),
          seedScope: z.unknown().optional(),
        }).describe(
          "The LogSettings define the logging attributes for an event property. These attributes are used to map the property to the parameter in the log proto. Also used to define scrubbing/truncation behavior and PII information.",
        ).optional(),
        masked: z.boolean().describe(
          "True if this workflow parameter should be masked in the logs",
        ).optional(),
        readOnly: z.boolean().describe(
          "Used to indicate if the ParameterEntry is a read only field or not.",
        ).optional(),
        searchable: z.enum(["UNSPECIFIED", "YES", "NO"]).optional(),
        taskVisibility: z.array(z.unknown()).describe(
          "List of tasks that can view this property, if empty then all.",
        ).optional(),
      }).describe(
        "Attributes are additional options that can be associated with each event property. For more information, see",
      ).optional(),
      children: z.array(z.string()).describe(
        "Child parameters nested within this parameter. This field only applies to protobuf parameters",
      ).optional(),
      containsLargeData: z.boolean().describe(
        "Indicates whether this variable contains large data and need to be uploaded to Cloud Storage.",
      ).optional(),
      dataType: z.enum([
        "DATA_TYPE_UNSPECIFIED",
        "STRING_VALUE",
        "INT_VALUE",
        "DOUBLE_VALUE",
        "BOOLEAN_VALUE",
        "PROTO_VALUE",
        "SERIALIZED_OBJECT_VALUE",
        "STRING_ARRAY",
        "INT_ARRAY",
        "DOUBLE_ARRAY",
        "PROTO_ARRAY",
        "PROTO_ENUM",
        "BOOLEAN_ARRAY",
        "PROTO_ENUM_ARRAY",
        "BYTES",
        "BYTES_ARRAY",
        "NON_SERIALIZABLE_OBJECT",
        "JSON_VALUE",
      ]).describe("The data type of the parameter.").optional(),
      defaultValue: z.object({
        booleanArray: z.object({
          booleanValues: z.unknown().optional(),
        }).optional(),
        booleanValue: z.boolean().optional(),
        doubleArray: z.object({
          doubleValues: z.unknown().optional(),
        }).optional(),
        doubleValue: z.number().optional(),
        intArray: z.object({
          intValues: z.unknown().optional(),
        }).optional(),
        intValue: z.string().optional(),
        jsonValue: z.string().optional(),
        protoArray: z.object({
          protoValues: z.unknown().optional(),
        }).optional(),
        protoValue: z.record(z.string(), z.unknown()).optional(),
        serializedObjectValue: z.object({
          objectValue: z.unknown().optional(),
        }).optional(),
        stringArray: z.object({
          stringValues: z.unknown().optional(),
        }).optional(),
        stringValue: z.string().optional(),
      }).describe(
        "To support various types of parameter values. Next available id: 14",
      ).optional(),
      description: z.string().describe(
        "Optional. The description about the parameter",
      ).optional(),
      inOutType: z.enum(["IN_OUT_TYPE_UNSPECIFIED", "IN", "OUT", "IN_OUT"])
        .describe("Specifies the input/output type for the parameter.")
        .optional(),
      isTransient: z.boolean().describe(
        "Whether this parameter is a transient parameter.",
      ).optional(),
      jsonSchema: z.string().describe(
        "This schema will be used to validate runtime JSON-typed values of this parameter.",
      ).optional(),
      key: z.string().describe(
        "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the workflow definition.",
      ).optional(),
      name: z.string().describe(
        'The name (without prefix) to be displayed in the UI for this parameter. E.g. if the key is "foo.bar.myName", then the name would be "myName".',
      ).optional(),
      producedBy: z.object({
        elementIdentifier: z.string().describe("Configuration of the edge.")
          .optional(),
        elementType: z.enum(["UNKNOWN_TYPE", "TASK_CONFIG", "TRIGGER_CONFIG"])
          .describe(
            "Destination node where the edge ends. It can only be a task config.",
          ).optional(),
      }).describe(
        "Represents a node identifier (type + id). Next highest id: 3",
      ).optional(),
      producer: z.string().optional(),
      protoDefName: z.string().describe(
        "The name of the protobuf type if the parameter has a protobuf data type.",
      ).optional(),
      protoDefPath: z.string().describe(
        'If the data type is of type proto or proto array, this field needs to be populated with the fully qualified proto name. This message, for example, would be "enterprise.crm.frontends.eventbus.proto.WorkflowParameterEntry".',
      ).optional(),
      required: z.boolean().optional(),
    })).describe(
      "Parameters are a part of Event and can be used to communiticate between different tasks that are part of the same workflow execution.",
    ).optional(),
  }).describe(
    "LINT.IfChange This is the frontend version of WorkflowParameters. It's exactly like the backend version except that instead of flattening protobuf parameters and treating every field and subfield of a protobuf parameter as a separate parameter, the fields/subfields of a protobuf parameter will be nested as \"children\" (see 'children' field below) parameters of the parent parameter. Please refer to enterprise/crm/eventbus/proto/workflow_parameters.proto for more information about WorkflowParameters.",
  ).optional(),
  lastModifierEmail: z.string().describe(
    "Optional. The last modifier's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
  ).optional(),
  lockHolder: z.string().describe(
    "Optional. The edit lock holder's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
  ).optional(),
  parentTemplateId: z.string().describe(
    "Optional. The id of the template which was used to create this integration_version.",
  ).optional(),
  runAsServiceAccount: z.string().describe(
    "Optional. The run-as service account email, if set and auth config is not configured, that will be used to generate auth token to be used in Connector task, Rest caller task and Cloud function task.",
  ).optional(),
  taskConfigs: z.array(z.object({
    conditionalFailurePolicies: z.object({
      defaultFailurePolicy: z.object({
        condition: z.string().describe(
          "Optional. The string condition that will be evaluated to determine if the task should be retried with this failure policy.",
        ).optional(),
        intervalTime: z.string().describe(
          "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the initial interval in seconds for backoff.",
        ).optional(),
        maxRetries: z.number().int().describe(
          "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
        ).optional(),
        retryStrategy: z.enum([
          "RETRY_STRATEGY_UNSPECIFIED",
          "IGNORE",
          "NONE",
          "FATAL",
          "FIXED_INTERVAL",
          "LINEAR_BACKOFF",
          "EXPONENTIAL_BACKOFF",
          "RESTART_INTEGRATION_WITH_BACKOFF",
        ]).describe("Defines what happens to the task upon failure.")
          .optional(),
      }).describe(
        "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
      ).optional(),
      failurePolicies: z.array(z.object({
        condition: z.unknown().describe(
          "Optional. The string condition that will be evaluated to determine if the task should be retried with this failure policy.",
        ).optional(),
        intervalTime: z.unknown().describe(
          "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the initial interval in seconds for backoff.",
        ).optional(),
        maxRetries: z.unknown().describe(
          "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
        ).optional(),
        retryStrategy: z.unknown().describe(
          "Defines what happens to the task upon failure.",
        ).optional(),
      })).describe(
        "The list of failure policies that will be applied to the task in order.",
      ).optional(),
    }).describe("Conditional task failur retry strategies").optional(),
    description: z.string().describe(
      "Optional. User-provided description intended to give additional business context about the task.",
    ).optional(),
    displayName: z.string().describe(
      "Optional. User-provided label that is attached to this TaskConfig in the UI.",
    ).optional(),
    errorCatcherId: z.string().describe(
      "Optional. Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task",
    ).optional(),
    externalTaskType: z.enum([
      "EXTERNAL_TASK_TYPE_UNSPECIFIED",
      "NORMAL_TASK",
      "ERROR_TASK",
    ]).describe("Optional. External task type of the task").optional(),
    failurePolicy: z.object({
      condition: z.string().describe(
        "Optional. The string condition that will be evaluated to determine if the task should be retried with this failure policy.",
      ).optional(),
      intervalTime: z.string().describe(
        "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the initial interval in seconds for backoff.",
      ).optional(),
      maxRetries: z.number().int().describe(
        "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
      ).optional(),
      retryStrategy: z.enum([
        "RETRY_STRATEGY_UNSPECIFIED",
        "IGNORE",
        "NONE",
        "FATAL",
        "FIXED_INTERVAL",
        "LINEAR_BACKOFF",
        "EXPONENTIAL_BACKOFF",
        "RESTART_INTEGRATION_WITH_BACKOFF",
      ]).describe("Defines what happens to the task upon failure.").optional(),
    }).describe(
      "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
    ).optional(),
    jsonValidationOption: z.enum([
      "JSON_VALIDATION_OPTION_UNSPECIFIED",
      "SKIP",
      "PRE_EXECUTION",
      "POST_EXECUTION",
      "PRE_POST_EXECUTION",
    ]).describe(
      "Optional. If set, overrides the option configured in the Task implementation class.",
    ).optional(),
    nextTasks: z.array(z.object({
      condition: z.string().describe(
        "Standard filter expression for this task to become an eligible next task.",
      ).optional(),
      description: z.string().describe(
        "User-provided description intended to give additional business context about the task.",
      ).optional(),
      displayName: z.string().describe(
        "User-provided label that is attached to this edge in the UI.",
      ).optional(),
      taskConfigId: z.string().describe("ID of the next task.").optional(),
      taskId: z.string().describe("Task number of the next task.").optional(),
    })).describe(
      "Optional. The set of tasks that are next in line to be executed as per the execution graph defined for the parent event, specified by `event_config_id`. Each of these next tasks are executed only if the condition associated with them evaluates to true.",
    ).optional(),
    nextTasksExecutionPolicy: z.enum([
      "NEXT_TASKS_EXECUTION_POLICY_UNSPECIFIED",
      "RUN_ALL_MATCH",
      "RUN_FIRST_MATCH",
    ]).describe(
      "Optional. The policy dictating the execution of the next set of tasks for the current task.",
    ).optional(),
    parameters: z.record(
      z.string(),
      z.object({
        key: z.string().describe(
          "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
        ).optional(),
        masked: z.boolean().describe(
          "True if this parameter should be masked in the logs",
        ).optional(),
        value: z.object({
          booleanArray: z.unknown().describe(
            "This message only contains a field of boolean array.",
          ).optional(),
          booleanValue: z.unknown().describe("Boolean.").optional(),
          doubleArray: z.unknown().describe(
            "This message only contains a field of double number array.",
          ).optional(),
          doubleValue: z.unknown().describe("Double Number.").optional(),
          intArray: z.unknown().describe(
            "This message only contains a field of integer array.",
          ).optional(),
          intValue: z.unknown().describe("Integer.").optional(),
          jsonValue: z.unknown().describe("Json.").optional(),
          stringArray: z.unknown().describe(
            "This message only contains a field of string array.",
          ).optional(),
          stringValue: z.unknown().describe("String.").optional(),
        }).describe("The type of the parameter.").optional(),
      }),
    ).describe(
      "Optional. The customized parameters the user can pass to this task.",
    ).optional(),
    position: z.object({
      x: z.number().int().describe("Required. X axis of the coordinate")
        .optional(),
      y: z.number().int().describe("Required. Y axis of the coordinate")
        .optional(),
    }).describe("Configuration detail of coordinate, it used for UI")
      .optional(),
    successPolicy: z.object({
      finalState: z.enum(["FINAL_STATE_UNSPECIFIED", "SUCCEEDED", "SUSPENDED"])
        .describe(
          "State to which the execution snapshot status will be set if the task succeeds.",
        ).optional(),
    }).describe(
      "Policy that dictates the behavior for the task after it completes successfully.",
    ).optional(),
    synchronousCallFailurePolicy: z.object({
      condition: z.string().describe(
        "Optional. The string condition that will be evaluated to determine if the task should be retried with this failure policy.",
      ).optional(),
      intervalTime: z.string().describe(
        "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the initial interval in seconds for backoff.",
      ).optional(),
      maxRetries: z.number().int().describe(
        "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
      ).optional(),
      retryStrategy: z.enum([
        "RETRY_STRATEGY_UNSPECIFIED",
        "IGNORE",
        "NONE",
        "FATAL",
        "FIXED_INTERVAL",
        "LINEAR_BACKOFF",
        "EXPONENTIAL_BACKOFF",
        "RESTART_INTEGRATION_WITH_BACKOFF",
      ]).describe("Defines what happens to the task upon failure.").optional(),
    }).describe(
      "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
    ).optional(),
    task: z.string().describe("Optional. The name for the task.").optional(),
    taskExecutionStrategy: z.enum([
      "TASK_EXECUTION_STRATEGY_UNSPECIFIED",
      "WHEN_ALL_SUCCEED",
      "WHEN_ANY_SUCCEED",
      "WHEN_ALL_TASKS_AND_CONDITIONS_SUCCEED",
    ]).describe(
      "Optional. The policy dictating the execution strategy of this task.",
    ).optional(),
    taskId: z.string().describe(
      "Required. The identifier of this task within its parent event config, specified by the client. This should be unique among all the tasks belong to the same event config. We use this field as the identifier to find next tasks (via field `next_tasks.task_id`).",
    ).optional(),
    taskTemplate: z.string().describe(
      "Optional. Used to define task-template name if task is of type task-template",
    ).optional(),
  })).describe(
    "Optional. Task configuration for the integration. It's optional, but the integration doesn't do anything without task_configs.",
  ).optional(),
  teardown: z.object({
    teardownTaskConfigs: z.array(z.object({
      creatorEmail: z.string().describe("The creator's email address.")
        .optional(),
      name: z.string().describe(
        "Required. Unique identifier of the teardown task within this Config. We use this field as the identifier to find next teardown tasks.",
      ).optional(),
      nextTeardownTask: z.object({
        name: z.string().describe("Required. Name of the next teardown task.")
          .optional(),
      }).describe(
        "The teardown task that is next in line to be executed. We support only sequential execution of teardown tasks (i.e. no branching).",
      ).optional(),
      parameters: z.object({
        parameters: z.array(z.unknown()).describe(
          "Parameters are a part of Event and can be used to communicate between different tasks that are part of the same integration execution.",
        ).optional(),
      }).describe(
        "LINT.IfChange This message is used for processing and persisting (when applicable) key value pair parameters for each event in the event bus. Please see",
      ).optional(),
      properties: z.object({
        properties: z.array(z.unknown()).describe(
          "An unordered list of property entries.",
        ).optional(),
      }).describe(
        "LINT.IfChange This message is used for storing key value pair properties for each Event / Task in the EventBus.",
      ).optional(),
      teardownTaskImplementationClassName: z.string().describe(
        "Required. Implementation class name.",
      ).optional(),
    })).describe("Required.").optional(),
  }).optional(),
  triggerConfigs: z.array(z.object({
    alertConfig: z.array(z.object({
      aggregationPeriod: z.string().describe(
        "The period over which the metric value should be aggregated and evaluated. Format is, where integer should be a positive integer and unit should be one of (s,m,h,d,w) meaning (second, minute, hour, day, week). For an EXPECTED_MIN threshold, this aggregation_period must be lesser than 24 hours.",
      ).optional(),
      alertThreshold: z.number().int().describe(
        "For how many contiguous aggregation periods should the expected min or max be violated for the alert to be fired.",
      ).optional(),
      disableAlert: z.boolean().describe(
        "Set to false by default. When set to true, the metrics are not aggregated or pushed to Monarch for this integration alert.",
      ).optional(),
      displayName: z.string().describe(
        "Name of the alert. This will be displayed in the alert subject. If set, this name should be unique within the scope of the integration.",
      ).optional(),
      durationThreshold: z.string().describe(
        "Should be specified only for *AVERAGE_DURATION and *PERCENTILE_DURATION metrics. This member should be used to specify what duration value the metrics should exceed for the alert to trigger.",
      ).optional(),
      metricType: z.enum([
        "METRIC_TYPE_UNSPECIFIED",
        "EVENT_ERROR_RATE",
        "EVENT_WARNING_RATE",
        "TASK_ERROR_RATE",
        "TASK_WARNING_RATE",
        "TASK_RATE",
        "EVENT_RATE",
        "EVENT_AVERAGE_DURATION",
        "EVENT_PERCENTILE_DURATION",
        "TASK_AVERAGE_DURATION",
        "TASK_PERCENTILE_DURATION",
      ]).describe("The type of metric.").optional(),
      onlyFinalAttempt: z.boolean().describe(
        "For either events or tasks, depending on the type of alert, count only final attempts, not retries.",
      ).optional(),
      thresholdType: z.enum([
        "THRESHOLD_TYPE_UNSPECIFIED",
        "EXPECTED_MIN",
        "EXPECTED_MAX",
      ]).describe(
        "The threshold type, whether lower(expected_min) or upper(expected_max), for which this alert is being configured. If value falls below expected_min or exceeds expected_max, an alert will be fired.",
      ).optional(),
      thresholdValue: z.object({
        absolute: z.unknown().describe("Absolute value threshold.").optional(),
        percentage: z.unknown().describe("Percentage threshold.").optional(),
      }).describe(
        "The threshold value of the metric, above or below which the alert should be triggered. See EventAlertConfig or TaskAlertConfig for the different alert metric types in each case. For the *RATE metrics, one or both of these fields may be set. Zero is the default value and can be left at that. For *PERCENTILE_DURATION metrics, one or both of these fields may be set, and also, the duration threshold value should be specified in the threshold_duration_ms member below. For *AVERAGE_DURATION metrics, these fields should not be set at all. A different member, threshold_duration_ms, must be set in the EventAlertConfig or the TaskAlertConfig.",
      ).optional(),
    })).describe(
      "Optional. An alert threshold configuration for the [trigger + client + integration] tuple. If these values are not specified in the trigger config, default values will be populated by the system. Note that there must be exactly one alert threshold configured per [client + trigger + integration] when published.",
    ).optional(),
    cloudSchedulerConfig: z.object({
      cronTab: z.string().describe(
        "Required. The cron tab of cloud scheduler trigger.",
      ).optional(),
      errorMessage: z.string().describe(
        "Optional. When the job was deleted from Pantheon UI, error_message will be populated when Get/List integrations",
      ).optional(),
      location: z.string().describe(
        "Required. The location where associated cloud scheduler job will be created",
      ).optional(),
      serviceAccountEmail: z.string().describe(
        "Required. Service account used by Cloud Scheduler to trigger the integration at scheduled time",
      ).optional(),
    }).describe("Cloud Scheduler Trigger configuration").optional(),
    description: z.string().describe(
      "Optional. User-provided description intended to give additional business context about the task.",
    ).optional(),
    errorCatcherId: z.string().describe(
      "Optional. Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task",
    ).optional(),
    inputVariables: z.object({
      names: z.array(z.string()).describe("Optional. List of variable names.")
        .optional(),
    }).describe("Variables names mapped to api trigger.").optional(),
    label: z.string().describe(
      "Optional. The user created label for a particular trigger.",
    ).optional(),
    nextTasksExecutionPolicy: z.enum([
      "NEXT_TASKS_EXECUTION_POLICY_UNSPECIFIED",
      "RUN_ALL_MATCH",
      "RUN_FIRST_MATCH",
    ]).describe("Optional. Dictates how next tasks will be executed.")
      .optional(),
    outputVariables: z.object({
      names: z.array(z.string()).describe("Optional. List of variable names.")
        .optional(),
    }).describe("Variables names mapped to api trigger.").optional(),
    position: z.object({
      x: z.number().int().describe("Required. X axis of the coordinate")
        .optional(),
      y: z.number().int().describe("Required. Y axis of the coordinate")
        .optional(),
    }).describe("Configuration detail of coordinate, it used for UI")
      .optional(),
    properties: z.record(z.string(), z.string()).describe(
      'Optional. Configurable properties of the trigger, not to be confused with integration parameters. E.g. "name" is a property for API triggers and "subscription" is a property for Pub/sub triggers.',
    ).optional(),
    startTasks: z.array(z.object({
      condition: z.string().describe(
        "Standard filter expression for this task to become an eligible next task.",
      ).optional(),
      description: z.string().describe(
        "User-provided description intended to give additional business context about the task.",
      ).optional(),
      displayName: z.string().describe(
        "User-provided label that is attached to this edge in the UI.",
      ).optional(),
      taskConfigId: z.string().describe("ID of the next task.").optional(),
      taskId: z.string().describe("Task number of the next task.").optional(),
    })).describe(
      "Optional. Set of tasks numbers from where the integration execution is started by this trigger. If this is empty, then integration is executed with default start tasks. In the list of start tasks, none of two tasks can have direct ancestor-descendant relationships (i.e. in a same integration execution graph).",
    ).optional(),
    trigger: z.string().describe(
      'Optional. Name of the trigger. Example: "API Trigger", "Cloud Pub Sub Trigger" When set will be sent out to monitoring dashabord for tracking purpose.',
    ).optional(),
    triggerId: z.string().describe(
      'Optional. Auto-generated trigger ID. The ID is based on the properties that you define in the trigger config. For example, for an API trigger, the trigger ID follows the format: api_trigger/TRIGGER_NAME Where trigger config has properties with value {"Trigger name": TRIGGER_NAME}',
    ).optional(),
    triggerNumber: z.string().describe(
      "Required. A number to uniquely identify each trigger config within the integration on UI.",
    ).optional(),
    triggerType: z.enum([
      "TRIGGER_TYPE_UNSPECIFIED",
      "CRON",
      "API",
      "SFDC_CHANNEL",
      "CLOUD_PUBSUB_EXTERNAL",
      "SFDC_CDC_CHANNEL",
      "CLOUD_SCHEDULER",
      "INTEGRATION_CONNECTOR_TRIGGER",
      "PRIVATE_TRIGGER",
      "CLOUD_PUBSUB",
      "EVENTARC_TRIGGER",
    ]).describe("Optional. Type of trigger").optional(),
  })).describe("Optional. Trigger configurations.").optional(),
  userLabel: z.string().describe(
    "Optional. A user-defined label that annotates an integration version. Typically, this is only set when the integration version is created.",
  ).optional(),
  createSampleIntegrations: z.string().describe(
    "Optional. Optional. Indicates if sample workflow should be created.",
  ).optional(),
  newIntegration: z.string().describe(
    "Set this flag to true, if draft version is to be created for a brand new integration. False, if the request is for an existing integration. For backward compatibility reasons, even if this flag is set to `false` and no existing integration is found, a new draft integration will still be created.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  cloudKmsKey: z.string().optional(),
  cloudLoggingDetails: z.object({
    cloudLoggingSeverity: z.string(),
    enableCloudLogging: z.boolean(),
  }).optional(),
  createTime: z.string().optional(),
  createdFromTemplate: z.string().optional(),
  databasePersistencePolicy: z.string().optional(),
  description: z.string().optional(),
  enableVariableMasking: z.boolean().optional(),
  errorCatcherConfigs: z.array(z.object({
    description: z.string(),
    errorCatcherId: z.string(),
    errorCatcherNumber: z.string(),
    label: z.string(),
    position: z.object({
      x: z.number(),
      y: z.number(),
    }),
    startErrorTasks: z.array(z.object({
      condition: z.string(),
      description: z.string(),
      displayName: z.string(),
      taskConfigId: z.string(),
      taskId: z.string(),
    })),
  })).optional(),
  integrationConfigParameters: z.array(z.object({
    parameter: z.object({
      containsLargeData: z.boolean(),
      dataType: z.string(),
      defaultValue: z.object({
        booleanArray: z.object({
          booleanValues: z.unknown(),
        }),
        booleanValue: z.boolean(),
        doubleArray: z.object({
          doubleValues: z.unknown(),
        }),
        doubleValue: z.number(),
        intArray: z.object({
          intValues: z.unknown(),
        }),
        intValue: z.string(),
        jsonValue: z.string(),
        stringArray: z.object({
          stringValues: z.unknown(),
        }),
        stringValue: z.string(),
      }),
      description: z.string(),
      displayName: z.string(),
      inputOutputType: z.string(),
      isTransient: z.boolean(),
      jsonSchema: z.string(),
      key: z.string(),
      masked: z.boolean(),
      producer: z.string(),
      searchable: z.boolean(),
    }),
    value: z.object({
      booleanArray: z.object({
        booleanValues: z.array(z.unknown()),
      }),
      booleanValue: z.boolean(),
      doubleArray: z.object({
        doubleValues: z.array(z.unknown()),
      }),
      doubleValue: z.number(),
      intArray: z.object({
        intValues: z.array(z.unknown()),
      }),
      intValue: z.string(),
      jsonValue: z.string(),
      stringArray: z.object({
        stringValues: z.array(z.unknown()),
      }),
      stringValue: z.string(),
    }),
  })).optional(),
  integrationParameters: z.array(z.object({
    containsLargeData: z.boolean(),
    dataType: z.string(),
    defaultValue: z.object({
      booleanArray: z.object({
        booleanValues: z.array(z.unknown()),
      }),
      booleanValue: z.boolean(),
      doubleArray: z.object({
        doubleValues: z.array(z.unknown()),
      }),
      doubleValue: z.number(),
      intArray: z.object({
        intValues: z.array(z.unknown()),
      }),
      intValue: z.string(),
      jsonValue: z.string(),
      stringArray: z.object({
        stringValues: z.array(z.unknown()),
      }),
      stringValue: z.string(),
    }),
    description: z.string(),
    displayName: z.string(),
    inputOutputType: z.string(),
    isTransient: z.boolean(),
    jsonSchema: z.string(),
    key: z.string(),
    masked: z.boolean(),
    producer: z.string(),
    searchable: z.boolean(),
  })).optional(),
  integrationParametersInternal: z.object({
    parameters: z.array(z.object({
      attributes: z.object({
        dataType: z.string(),
        defaultValue: z.object({
          booleanValue: z.unknown(),
          doubleArray: z.unknown(),
          doubleValue: z.unknown(),
          intArray: z.unknown(),
          intValue: z.unknown(),
          protoValue: z.unknown(),
          stringArray: z.unknown(),
          stringValue: z.unknown(),
        }),
        isRequired: z.boolean(),
        isSearchable: z.boolean(),
        logSettings: z.object({
          logFieldName: z.unknown(),
          seedPeriod: z.unknown(),
          seedScope: z.unknown(),
        }),
        masked: z.boolean(),
        readOnly: z.boolean(),
        searchable: z.string(),
        taskVisibility: z.array(z.unknown()),
      }),
      children: z.array(z.string()),
      containsLargeData: z.boolean(),
      dataType: z.string(),
      defaultValue: z.object({
        booleanArray: z.object({
          booleanValues: z.unknown(),
        }),
        booleanValue: z.boolean(),
        doubleArray: z.object({
          doubleValues: z.unknown(),
        }),
        doubleValue: z.number(),
        intArray: z.object({
          intValues: z.unknown(),
        }),
        intValue: z.string(),
        jsonValue: z.string(),
        protoArray: z.object({
          protoValues: z.unknown(),
        }),
        protoValue: z.record(z.string(), z.unknown()),
        serializedObjectValue: z.object({
          objectValue: z.unknown(),
        }),
        stringArray: z.object({
          stringValues: z.unknown(),
        }),
        stringValue: z.string(),
      }),
      description: z.string(),
      inOutType: z.string(),
      isTransient: z.boolean(),
      jsonSchema: z.string(),
      key: z.string(),
      name: z.string(),
      producedBy: z.object({
        elementIdentifier: z.string(),
        elementType: z.string(),
      }),
      producer: z.string(),
      protoDefName: z.string(),
      protoDefPath: z.string(),
      required: z.boolean(),
    })),
  }).optional(),
  lastModifierEmail: z.string().optional(),
  lockHolder: z.string().optional(),
  name: z.string(),
  origin: z.string().optional(),
  parentTemplateId: z.string().optional(),
  runAsServiceAccount: z.string().optional(),
  snapshotNumber: z.string().optional(),
  state: z.string().optional(),
  status: z.string().optional(),
  taskConfigs: z.array(z.object({
    conditionalFailurePolicies: z.object({
      defaultFailurePolicy: z.object({
        condition: z.string(),
        intervalTime: z.string(),
        maxRetries: z.number(),
        retryStrategy: z.string(),
      }),
      failurePolicies: z.array(z.object({
        condition: z.unknown(),
        intervalTime: z.unknown(),
        maxRetries: z.unknown(),
        retryStrategy: z.unknown(),
      })),
    }),
    description: z.string(),
    displayName: z.string(),
    errorCatcherId: z.string(),
    externalTaskType: z.string(),
    failurePolicy: z.object({
      condition: z.string(),
      intervalTime: z.string(),
      maxRetries: z.number(),
      retryStrategy: z.string(),
    }),
    jsonValidationOption: z.string(),
    nextTasks: z.array(z.object({
      condition: z.string(),
      description: z.string(),
      displayName: z.string(),
      taskConfigId: z.string(),
      taskId: z.string(),
    })),
    nextTasksExecutionPolicy: z.string(),
    parameters: z.record(z.string(), z.unknown()),
    position: z.object({
      x: z.number(),
      y: z.number(),
    }),
    successPolicy: z.object({
      finalState: z.string(),
    }),
    synchronousCallFailurePolicy: z.object({
      condition: z.string(),
      intervalTime: z.string(),
      maxRetries: z.number(),
      retryStrategy: z.string(),
    }),
    task: z.string(),
    taskExecutionStrategy: z.string(),
    taskId: z.string(),
    taskTemplate: z.string(),
  })).optional(),
  taskConfigsInternal: z.array(z.object({
    alertConfigs: z.array(z.object({
      aggregationPeriod: z.string(),
      alertDisabled: z.boolean(),
      alertName: z.string(),
      clientId: z.string(),
      durationThresholdMs: z.string(),
      errorEnumList: z.object({
        enumStrings: z.unknown(),
        filterType: z.unknown(),
      }),
      metricType: z.string(),
      numAggregationPeriods: z.number(),
      onlyFinalAttempt: z.boolean(),
      playbookUrl: z.string(),
      thresholdType: z.string(),
      thresholdValue: z.object({
        absolute: z.unknown(),
        percentage: z.unknown(),
      }),
      warningEnumList: z.object({
        enumStrings: z.unknown(),
        filterType: z.unknown(),
      }),
    })),
    conditionalFailurePolicies: z.object({
      defaultFailurePolicy: z.object({
        intervalInSeconds: z.string(),
        maxNumRetries: z.number(),
        retryCondition: z.string(),
        retryStrategy: z.string(),
      }),
      failurePolicies: z.array(z.object({
        intervalInSeconds: z.unknown(),
        maxNumRetries: z.unknown(),
        retryCondition: z.unknown(),
        retryStrategy: z.unknown(),
      })),
    }),
    createTime: z.string(),
    creatorEmail: z.string(),
    description: z.string(),
    disableStrictTypeValidation: z.boolean(),
    errorCatcherId: z.string(),
    externalTaskType: z.string(),
    failurePolicy: z.object({
      intervalInSeconds: z.string(),
      maxNumRetries: z.number(),
      retryCondition: z.string(),
      retryStrategy: z.string(),
    }),
    incomingEdgeCount: z.number(),
    jsonValidationOption: z.string(),
    label: z.string(),
    lastModifiedTime: z.string(),
    nextTasks: z.array(z.object({
      combinedConditions: z.array(z.unknown()),
      condition: z.string(),
      description: z.string(),
      label: z.string(),
      taskConfigId: z.string(),
      taskNumber: z.string(),
    })),
    nextTasksExecutionPolicy: z.string(),
    parameters: z.record(z.string(), z.unknown()),
    position: z.object({
      x: z.number(),
      y: z.number(),
    }),
    precondition: z.string(),
    preconditionLabel: z.string(),
    rollbackStrategy: z.object({
      parameters: z.object({
        parameters: z.array(z.unknown()),
      }),
      rollbackTaskImplementationClassName: z.string(),
      taskNumbersToRollback: z.array(z.string()),
    }),
    successPolicy: z.object({
      finalState: z.string(),
    }),
    synchronousCallFailurePolicy: z.object({
      intervalInSeconds: z.string(),
      maxNumRetries: z.number(),
      retryCondition: z.string(),
      retryStrategy: z.string(),
    }),
    taskEntity: z.object({
      disabledForVpcSc: z.boolean(),
      metadata: z.object({
        activeTaskName: z.string(),
        admins: z.array(z.unknown()),
        category: z.string(),
        codeSearchLink: z.string(),
        defaultJsonValidationOption: z.string(),
        defaultSpec: z.string(),
        description: z.string(),
        descriptiveName: z.string(),
        docMarkdown: z.string(),
        externalCategory: z.string(),
        externalCategorySequence: z.number(),
        externalDocHtml: z.string(),
        externalDocLink: z.string(),
        externalDocMarkdown: z.string(),
        g3DocLink: z.string(),
        iconLink: z.string(),
        isDeprecated: z.boolean(),
        name: z.string(),
        standaloneExternalDocHtml: z.string(),
        status: z.string(),
        system: z.string(),
        tags: z.array(z.unknown()),
      }),
      paramSpecs: z.object({
        parameters: z.array(z.unknown()),
      }),
      stats: z.object({
        dimensions: z.object({
          clientId: z.unknown(),
          enumFilterType: z.unknown(),
          errorEnumString: z.unknown(),
          retryAttempt: z.unknown(),
          taskName: z.unknown(),
          taskNumber: z.unknown(),
          triggerId: z.unknown(),
          warningEnumString: z.unknown(),
          workflowId: z.unknown(),
          workflowName: z.unknown(),
        }),
        durationInSeconds: z.number(),
        errorRate: z.number(),
        qps: z.number(),
        warningRate: z.number(),
      }),
      taskType: z.string(),
      uiConfig: z.object({
        taskUiModuleConfigs: z.array(z.unknown()),
      }),
    }),
    taskExecutionStrategy: z.string(),
    taskName: z.string(),
    taskNumber: z.string(),
    taskSpec: z.string(),
    taskTemplateName: z.string(),
    taskType: z.string(),
  })).optional(),
  teardown: z.object({
    teardownTaskConfigs: z.array(z.object({
      creatorEmail: z.string(),
      name: z.string(),
      nextTeardownTask: z.object({
        name: z.string(),
      }),
      parameters: z.object({
        parameters: z.array(z.unknown()),
      }),
      properties: z.object({
        properties: z.array(z.unknown()),
      }),
      teardownTaskImplementationClassName: z.string(),
    })),
  }).optional(),
  triggerConfigs: z.array(z.object({
    alertConfig: z.array(z.object({
      aggregationPeriod: z.string(),
      alertThreshold: z.number(),
      disableAlert: z.boolean(),
      displayName: z.string(),
      durationThreshold: z.string(),
      metricType: z.string(),
      onlyFinalAttempt: z.boolean(),
      thresholdType: z.string(),
      thresholdValue: z.object({
        absolute: z.unknown(),
        percentage: z.unknown(),
      }),
    })),
    cloudSchedulerConfig: z.object({
      cronTab: z.string(),
      errorMessage: z.string(),
      location: z.string(),
      serviceAccountEmail: z.string(),
    }),
    description: z.string(),
    errorCatcherId: z.string(),
    inputVariables: z.object({
      names: z.array(z.string()),
    }),
    label: z.string(),
    nextTasksExecutionPolicy: z.string(),
    outputVariables: z.object({
      names: z.array(z.string()),
    }),
    position: z.object({
      x: z.number(),
      y: z.number(),
    }),
    properties: z.record(z.string(), z.unknown()),
    startTasks: z.array(z.object({
      condition: z.string(),
      description: z.string(),
      displayName: z.string(),
      taskConfigId: z.string(),
      taskId: z.string(),
    })),
    trigger: z.string(),
    triggerId: z.string(),
    triggerNumber: z.string(),
    triggerType: z.string(),
  })).optional(),
  triggerConfigsInternal: z.array(z.object({
    alertConfig: z.array(z.object({
      aggregationPeriod: z.string(),
      alertDisabled: z.boolean(),
      alertName: z.string(),
      clientId: z.string(),
      durationThresholdMs: z.string(),
      errorEnumList: z.object({
        enumStrings: z.unknown(),
        filterType: z.unknown(),
      }),
      metricType: z.string(),
      numAggregationPeriods: z.number(),
      onlyFinalAttempt: z.boolean(),
      playbookUrl: z.string(),
      thresholdType: z.string(),
      thresholdValue: z.object({
        absolute: z.unknown(),
        percentage: z.unknown(),
      }),
      warningEnumList: z.object({
        enumStrings: z.unknown(),
        filterType: z.unknown(),
      }),
    })),
    cloudSchedulerConfig: z.object({
      cronTab: z.string(),
      errorMessage: z.string(),
      location: z.string(),
      serviceAccountEmail: z.string(),
    }),
    description: z.string(),
    enabledClients: z.array(z.string()),
    errorCatcherId: z.string(),
    inputVariables: z.object({
      names: z.array(z.string()),
    }),
    label: z.string(),
    nextTasksExecutionPolicy: z.string(),
    outputVariables: z.object({
      names: z.array(z.string()),
    }),
    pauseWorkflowExecutions: z.boolean(),
    position: z.object({
      x: z.number(),
      y: z.number(),
    }),
    properties: z.record(z.string(), z.unknown()),
    startTasks: z.array(z.object({
      combinedConditions: z.array(z.unknown()),
      condition: z.string(),
      description: z.string(),
      label: z.string(),
      taskConfigId: z.string(),
      taskNumber: z.string(),
    })),
    triggerCriteria: z.object({
      condition: z.string(),
      parameters: z.object({
        parameters: z.array(z.unknown()),
      }),
      triggerCriteriaTaskImplementationClassName: z.string(),
    }),
    triggerId: z.string(),
    triggerName: z.string(),
    triggerNumber: z.string(),
    triggerType: z.string(),
  })).optional(),
  updateTime: z.string().optional(),
  userLabel: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  cloudKmsKey: z.string().describe(
    "Optional. Cloud KMS resource name for the CMEK encryption key.",
  ).optional(),
  cloudLoggingDetails: z.object({
    cloudLoggingSeverity: z.enum([
      "CLOUD_LOGGING_SEVERITY_UNSPECIFIED",
      "INFO",
      "ERROR",
      "WARNING",
    ]).describe(
      "Optional. Severity selected by the customer for the logs to be sent to Cloud Logging, for the integration version getting executed.",
    ).optional(),
    enableCloudLogging: z.boolean().describe(
      "Optional. Status of whether Cloud Logging is enabled or not for the integration version getting executed.",
    ).optional(),
  }).describe("Cloud Logging details for execution info").optional(),
  createdFromTemplate: z.string().describe(
    "Optional. Optional. The resource name of the template from which the integration is created.",
  ).optional(),
  databasePersistencePolicy: z.enum([
    "DATABASE_PERSISTENCE_POLICY_UNSPECIFIED",
    "DATABASE_PERSISTENCE_DISABLED",
    "DATABASE_PERSISTENCE_ASYNC",
  ]).describe(
    "Optional. Flag to disable database persistence for execution data, including event execution info, execution export info, execution metadata index and execution param index.",
  ).optional(),
  description: z.string().describe("Optional. The integration description.")
    .optional(),
  enableVariableMasking: z.boolean().describe(
    "Optional. True if variable masking feature should be turned on for this version",
  ).optional(),
  errorCatcherConfigs: z.array(z.object({
    description: z.string().describe(
      "Optional. User-provided description intended to give more business context about the error catcher config.",
    ).optional(),
    errorCatcherId: z.string().describe(
      "Required. An error catcher id is string representation for the error catcher config. Within a workflow, error_catcher_id uniquely identifies an error catcher config among all error catcher configs for the workflow",
    ).optional(),
    errorCatcherNumber: z.string().describe(
      "Required. A number to uniquely identify each error catcher config within the workflow on UI.",
    ).optional(),
    label: z.string().describe(
      "Optional. The user created label for a particular error catcher. Optional.",
    ).optional(),
    position: z.object({
      x: z.number().int().describe("Required. X axis of the coordinate")
        .optional(),
      y: z.number().int().describe("Required. Y axis of the coordinate")
        .optional(),
    }).describe("Configuration detail of coordinate, it used for UI")
      .optional(),
    startErrorTasks: z.array(z.object({
      condition: z.string().describe(
        "Standard filter expression for this task to become an eligible next task.",
      ).optional(),
      description: z.string().describe(
        "User-provided description intended to give additional business context about the task.",
      ).optional(),
      displayName: z.string().describe(
        "User-provided label that is attached to this edge in the UI.",
      ).optional(),
      taskConfigId: z.string().describe("ID of the next task.").optional(),
      taskId: z.string().describe("Task number of the next task.").optional(),
    })).describe(
      "Required. The set of start tasks that are to be executed for the error catch flow",
    ).optional(),
  })).describe(
    "Optional. Error Catch Task configuration for the integration. It's optional.",
  ).optional(),
  integrationConfigParameters: z.array(z.object({
    parameter: z.object({
      containsLargeData: z.boolean().describe(
        "Indicates whether this variable contains large data and need to be uploaded to Cloud Storage.",
      ).optional(),
      dataType: z.enum([
        "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED",
        "STRING_VALUE",
        "INT_VALUE",
        "DOUBLE_VALUE",
        "BOOLEAN_VALUE",
        "STRING_ARRAY",
        "INT_ARRAY",
        "DOUBLE_ARRAY",
        "BOOLEAN_ARRAY",
        "JSON_VALUE",
        "PROTO_VALUE",
        "PROTO_ARRAY",
        "NON_SERIALIZABLE_OBJECT",
        "PROTO_ENUM",
        "SERIALIZED_OBJECT_VALUE",
        "PROTO_ENUM_ARRAY",
        "BYTES",
        "BYTES_ARRAY",
      ]).describe("Type of the parameter.").optional(),
      defaultValue: z.object({
        booleanArray: z.object({
          booleanValues: z.unknown().describe("Boolean array.").optional(),
        }).describe("This message only contains a field of boolean array.")
          .optional(),
        booleanValue: z.boolean().describe("Boolean.").optional(),
        doubleArray: z.object({
          doubleValues: z.unknown().describe("Double number array.").optional(),
        }).describe(
          "This message only contains a field of double number array.",
        ).optional(),
        doubleValue: z.number().describe("Double Number.").optional(),
        intArray: z.object({
          intValues: z.unknown().describe("Integer array.").optional(),
        }).describe("This message only contains a field of integer array.")
          .optional(),
        intValue: z.string().describe("Integer.").optional(),
        jsonValue: z.string().describe("Json.").optional(),
        stringArray: z.object({
          stringValues: z.unknown().describe("String array.").optional(),
        }).describe("This message only contains a field of string array.")
          .optional(),
        stringValue: z.string().describe("String.").optional(),
      }).describe("The type of the parameter.").optional(),
      description: z.string().describe(
        "Optional. Description of the parameter.",
      ).optional(),
      displayName: z.string().describe(
        'The name (without prefix) to be displayed in the UI for this parameter. E.g. if the key is "foo.bar.myName", then the name would be "myName".',
      ).optional(),
      inputOutputType: z.enum([
        "IN_OUT_TYPE_UNSPECIFIED",
        "IN",
        "OUT",
        "IN_OUT",
      ]).describe("Specifies the input/output type for the parameter.")
        .optional(),
      isTransient: z.boolean().describe(
        "Whether this parameter is a transient parameter.",
      ).optional(),
      jsonSchema: z.string().describe(
        "This schema will be used to validate runtime JSON-typed values of this parameter.",
      ).optional(),
      key: z.string().describe(
        "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
      ).optional(),
      masked: z.boolean().describe(
        "True if this parameter should be masked in the logs",
      ).optional(),
      producer: z.string().describe(
        "The identifier of the node (TaskConfig/TriggerConfig) this parameter was produced by, if it is a transient param or a copy of an input param.",
      ).optional(),
      searchable: z.boolean().describe(
        "Searchable in the execution log or not.",
      ).optional(),
    }).describe(
      "Integration Parameter is defined in the integration config and are used to provide information about data types of the expected parameters and provide any default values if needed. They can also be used to add custom attributes. These are static in nature and should not be used for dynamic event definition.",
    ).optional(),
    value: z.object({
      booleanArray: z.object({
        booleanValues: z.array(z.unknown()).describe("Boolean array.")
          .optional(),
      }).describe("This message only contains a field of boolean array.")
        .optional(),
      booleanValue: z.boolean().describe("Boolean.").optional(),
      doubleArray: z.object({
        doubleValues: z.array(z.unknown()).describe("Double number array.")
          .optional(),
      }).describe("This message only contains a field of double number array.")
        .optional(),
      doubleValue: z.number().describe("Double Number.").optional(),
      intArray: z.object({
        intValues: z.array(z.unknown()).describe("Integer array.").optional(),
      }).describe("This message only contains a field of integer array.")
        .optional(),
      intValue: z.string().describe("Integer.").optional(),
      jsonValue: z.string().describe("Json.").optional(),
      stringArray: z.object({
        stringValues: z.array(z.unknown()).describe("String array.").optional(),
      }).describe("This message only contains a field of string array.")
        .optional(),
      stringValue: z.string().describe("String.").optional(),
    }).describe("The type of the parameter.").optional(),
  })).describe(
    "Optional. Config Parameters that are expected to be passed to the integration when an integration is published. This consists of all the parameters that are expected to provide configuration in the integration execution. This gives the user the ability to provide default values, value, add information like connection url, project based configuration value and also provide data types of each parameter.",
  ).optional(),
  integrationParameters: z.array(z.object({
    containsLargeData: z.boolean().describe(
      "Indicates whether this variable contains large data and need to be uploaded to Cloud Storage.",
    ).optional(),
    dataType: z.enum([
      "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED",
      "STRING_VALUE",
      "INT_VALUE",
      "DOUBLE_VALUE",
      "BOOLEAN_VALUE",
      "STRING_ARRAY",
      "INT_ARRAY",
      "DOUBLE_ARRAY",
      "BOOLEAN_ARRAY",
      "JSON_VALUE",
      "PROTO_VALUE",
      "PROTO_ARRAY",
      "NON_SERIALIZABLE_OBJECT",
      "PROTO_ENUM",
      "SERIALIZED_OBJECT_VALUE",
      "PROTO_ENUM_ARRAY",
      "BYTES",
      "BYTES_ARRAY",
    ]).describe("Type of the parameter.").optional(),
    defaultValue: z.object({
      booleanArray: z.object({
        booleanValues: z.array(z.unknown()).describe("Boolean array.")
          .optional(),
      }).describe("This message only contains a field of boolean array.")
        .optional(),
      booleanValue: z.boolean().describe("Boolean.").optional(),
      doubleArray: z.object({
        doubleValues: z.array(z.unknown()).describe("Double number array.")
          .optional(),
      }).describe("This message only contains a field of double number array.")
        .optional(),
      doubleValue: z.number().describe("Double Number.").optional(),
      intArray: z.object({
        intValues: z.array(z.unknown()).describe("Integer array.").optional(),
      }).describe("This message only contains a field of integer array.")
        .optional(),
      intValue: z.string().describe("Integer.").optional(),
      jsonValue: z.string().describe("Json.").optional(),
      stringArray: z.object({
        stringValues: z.array(z.unknown()).describe("String array.").optional(),
      }).describe("This message only contains a field of string array.")
        .optional(),
      stringValue: z.string().describe("String.").optional(),
    }).describe("The type of the parameter.").optional(),
    description: z.string().describe("Optional. Description of the parameter.")
      .optional(),
    displayName: z.string().describe(
      'The name (without prefix) to be displayed in the UI for this parameter. E.g. if the key is "foo.bar.myName", then the name would be "myName".',
    ).optional(),
    inputOutputType: z.enum(["IN_OUT_TYPE_UNSPECIFIED", "IN", "OUT", "IN_OUT"])
      .describe("Specifies the input/output type for the parameter.")
      .optional(),
    isTransient: z.boolean().describe(
      "Whether this parameter is a transient parameter.",
    ).optional(),
    jsonSchema: z.string().describe(
      "This schema will be used to validate runtime JSON-typed values of this parameter.",
    ).optional(),
    key: z.string().describe(
      "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
    ).optional(),
    masked: z.boolean().describe(
      "True if this parameter should be masked in the logs",
    ).optional(),
    producer: z.string().describe(
      "The identifier of the node (TaskConfig/TriggerConfig) this parameter was produced by, if it is a transient param or a copy of an input param.",
    ).optional(),
    searchable: z.boolean().describe("Searchable in the execution log or not.")
      .optional(),
  })).describe(
    "Optional. Parameters that are expected to be passed to the integration when an event is triggered. This consists of all the parameters that are expected in the integration execution. This gives the user the ability to provide default values, add information like PII and also provide data types of each parameter.",
  ).optional(),
  integrationParametersInternal: z.object({
    parameters: z.array(z.object({
      attributes: z.object({
        dataType: z.enum([
          "DATA_TYPE_UNSPECIFIED",
          "EMAIL",
          "URL",
          "CURRENCY",
          "TIMESTAMP",
          "DOMAIN_NAME",
        ]).describe(
          "Things like URL, Email, Currency, Timestamp (rather than string, int64...)",
        ).optional(),
        defaultValue: z.object({
          booleanValue: z.unknown().optional(),
          doubleArray: z.unknown().optional(),
          doubleValue: z.unknown().optional(),
          intArray: z.unknown().optional(),
          intValue: z.unknown().optional(),
          protoValue: z.unknown().optional(),
          stringArray: z.unknown().optional(),
          stringValue: z.unknown().optional(),
        }).describe(
          "Used for define type for values. Currently supported value types include int, string, double, array, and any proto message.",
        ).optional(),
        isRequired: z.boolean().describe(
          "Required for event execution. The validation will be done by the event bus when the event is triggered.",
        ).optional(),
        isSearchable: z.boolean().describe(
          "Used to indicate if a ParameterEntry should be converted to ParamIndexes for ST-Spanner full-text search. DEPRECATED: use searchable.",
        ).optional(),
        logSettings: z.object({
          logFieldName: z.unknown().describe(
            "The name of corresponding logging field of the event property. If omitted, assumes the same name as the event property key.",
          ).optional(),
          seedPeriod: z.unknown().optional(),
          seedScope: z.unknown().optional(),
        }).describe(
          "The LogSettings define the logging attributes for an event property. These attributes are used to map the property to the parameter in the log proto. Also used to define scrubbing/truncation behavior and PII information.",
        ).optional(),
        masked: z.boolean().describe(
          "True if this workflow parameter should be masked in the logs",
        ).optional(),
        readOnly: z.boolean().describe(
          "Used to indicate if the ParameterEntry is a read only field or not.",
        ).optional(),
        searchable: z.enum(["UNSPECIFIED", "YES", "NO"]).optional(),
        taskVisibility: z.array(z.unknown()).describe(
          "List of tasks that can view this property, if empty then all.",
        ).optional(),
      }).describe(
        "Attributes are additional options that can be associated with each event property. For more information, see",
      ).optional(),
      children: z.array(z.string()).describe(
        "Child parameters nested within this parameter. This field only applies to protobuf parameters",
      ).optional(),
      containsLargeData: z.boolean().describe(
        "Indicates whether this variable contains large data and need to be uploaded to Cloud Storage.",
      ).optional(),
      dataType: z.enum([
        "DATA_TYPE_UNSPECIFIED",
        "STRING_VALUE",
        "INT_VALUE",
        "DOUBLE_VALUE",
        "BOOLEAN_VALUE",
        "PROTO_VALUE",
        "SERIALIZED_OBJECT_VALUE",
        "STRING_ARRAY",
        "INT_ARRAY",
        "DOUBLE_ARRAY",
        "PROTO_ARRAY",
        "PROTO_ENUM",
        "BOOLEAN_ARRAY",
        "PROTO_ENUM_ARRAY",
        "BYTES",
        "BYTES_ARRAY",
        "NON_SERIALIZABLE_OBJECT",
        "JSON_VALUE",
      ]).describe("The data type of the parameter.").optional(),
      defaultValue: z.object({
        booleanArray: z.object({
          booleanValues: z.unknown().optional(),
        }).optional(),
        booleanValue: z.boolean().optional(),
        doubleArray: z.object({
          doubleValues: z.unknown().optional(),
        }).optional(),
        doubleValue: z.number().optional(),
        intArray: z.object({
          intValues: z.unknown().optional(),
        }).optional(),
        intValue: z.string().optional(),
        jsonValue: z.string().optional(),
        protoArray: z.object({
          protoValues: z.unknown().optional(),
        }).optional(),
        protoValue: z.record(z.string(), z.unknown()).optional(),
        serializedObjectValue: z.object({
          objectValue: z.unknown().optional(),
        }).optional(),
        stringArray: z.object({
          stringValues: z.unknown().optional(),
        }).optional(),
        stringValue: z.string().optional(),
      }).describe(
        "To support various types of parameter values. Next available id: 14",
      ).optional(),
      description: z.string().describe(
        "Optional. The description about the parameter",
      ).optional(),
      inOutType: z.enum(["IN_OUT_TYPE_UNSPECIFIED", "IN", "OUT", "IN_OUT"])
        .describe("Specifies the input/output type for the parameter.")
        .optional(),
      isTransient: z.boolean().describe(
        "Whether this parameter is a transient parameter.",
      ).optional(),
      jsonSchema: z.string().describe(
        "This schema will be used to validate runtime JSON-typed values of this parameter.",
      ).optional(),
      key: z.string().describe(
        "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the workflow definition.",
      ).optional(),
      name: z.string().describe(
        'The name (without prefix) to be displayed in the UI for this parameter. E.g. if the key is "foo.bar.myName", then the name would be "myName".',
      ).optional(),
      producedBy: z.object({
        elementIdentifier: z.string().describe("Configuration of the edge.")
          .optional(),
        elementType: z.enum(["UNKNOWN_TYPE", "TASK_CONFIG", "TRIGGER_CONFIG"])
          .describe(
            "Destination node where the edge ends. It can only be a task config.",
          ).optional(),
      }).describe(
        "Represents a node identifier (type + id). Next highest id: 3",
      ).optional(),
      producer: z.string().optional(),
      protoDefName: z.string().describe(
        "The name of the protobuf type if the parameter has a protobuf data type.",
      ).optional(),
      protoDefPath: z.string().describe(
        'If the data type is of type proto or proto array, this field needs to be populated with the fully qualified proto name. This message, for example, would be "enterprise.crm.frontends.eventbus.proto.WorkflowParameterEntry".',
      ).optional(),
      required: z.boolean().optional(),
    })).describe(
      "Parameters are a part of Event and can be used to communiticate between different tasks that are part of the same workflow execution.",
    ).optional(),
  }).describe(
    "LINT.IfChange This is the frontend version of WorkflowParameters. It's exactly like the backend version except that instead of flattening protobuf parameters and treating every field and subfield of a protobuf parameter as a separate parameter, the fields/subfields of a protobuf parameter will be nested as \"children\" (see 'children' field below) parameters of the parent parameter. Please refer to enterprise/crm/eventbus/proto/workflow_parameters.proto for more information about WorkflowParameters.",
  ).optional(),
  lastModifierEmail: z.string().describe(
    "Optional. The last modifier's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
  ).optional(),
  lockHolder: z.string().describe(
    "Optional. The edit lock holder's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
  ).optional(),
  parentTemplateId: z.string().describe(
    "Optional. The id of the template which was used to create this integration_version.",
  ).optional(),
  runAsServiceAccount: z.string().describe(
    "Optional. The run-as service account email, if set and auth config is not configured, that will be used to generate auth token to be used in Connector task, Rest caller task and Cloud function task.",
  ).optional(),
  taskConfigs: z.array(z.object({
    conditionalFailurePolicies: z.object({
      defaultFailurePolicy: z.object({
        condition: z.string().describe(
          "Optional. The string condition that will be evaluated to determine if the task should be retried with this failure policy.",
        ).optional(),
        intervalTime: z.string().describe(
          "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the initial interval in seconds for backoff.",
        ).optional(),
        maxRetries: z.number().int().describe(
          "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
        ).optional(),
        retryStrategy: z.enum([
          "RETRY_STRATEGY_UNSPECIFIED",
          "IGNORE",
          "NONE",
          "FATAL",
          "FIXED_INTERVAL",
          "LINEAR_BACKOFF",
          "EXPONENTIAL_BACKOFF",
          "RESTART_INTEGRATION_WITH_BACKOFF",
        ]).describe("Defines what happens to the task upon failure.")
          .optional(),
      }).describe(
        "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
      ).optional(),
      failurePolicies: z.array(z.object({
        condition: z.unknown().describe(
          "Optional. The string condition that will be evaluated to determine if the task should be retried with this failure policy.",
        ).optional(),
        intervalTime: z.unknown().describe(
          "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the initial interval in seconds for backoff.",
        ).optional(),
        maxRetries: z.unknown().describe(
          "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
        ).optional(),
        retryStrategy: z.unknown().describe(
          "Defines what happens to the task upon failure.",
        ).optional(),
      })).describe(
        "The list of failure policies that will be applied to the task in order.",
      ).optional(),
    }).describe("Conditional task failur retry strategies").optional(),
    description: z.string().describe(
      "Optional. User-provided description intended to give additional business context about the task.",
    ).optional(),
    displayName: z.string().describe(
      "Optional. User-provided label that is attached to this TaskConfig in the UI.",
    ).optional(),
    errorCatcherId: z.string().describe(
      "Optional. Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task",
    ).optional(),
    externalTaskType: z.enum([
      "EXTERNAL_TASK_TYPE_UNSPECIFIED",
      "NORMAL_TASK",
      "ERROR_TASK",
    ]).describe("Optional. External task type of the task").optional(),
    failurePolicy: z.object({
      condition: z.string().describe(
        "Optional. The string condition that will be evaluated to determine if the task should be retried with this failure policy.",
      ).optional(),
      intervalTime: z.string().describe(
        "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the initial interval in seconds for backoff.",
      ).optional(),
      maxRetries: z.number().int().describe(
        "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
      ).optional(),
      retryStrategy: z.enum([
        "RETRY_STRATEGY_UNSPECIFIED",
        "IGNORE",
        "NONE",
        "FATAL",
        "FIXED_INTERVAL",
        "LINEAR_BACKOFF",
        "EXPONENTIAL_BACKOFF",
        "RESTART_INTEGRATION_WITH_BACKOFF",
      ]).describe("Defines what happens to the task upon failure.").optional(),
    }).describe(
      "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
    ).optional(),
    jsonValidationOption: z.enum([
      "JSON_VALIDATION_OPTION_UNSPECIFIED",
      "SKIP",
      "PRE_EXECUTION",
      "POST_EXECUTION",
      "PRE_POST_EXECUTION",
    ]).describe(
      "Optional. If set, overrides the option configured in the Task implementation class.",
    ).optional(),
    nextTasks: z.array(z.object({
      condition: z.string().describe(
        "Standard filter expression for this task to become an eligible next task.",
      ).optional(),
      description: z.string().describe(
        "User-provided description intended to give additional business context about the task.",
      ).optional(),
      displayName: z.string().describe(
        "User-provided label that is attached to this edge in the UI.",
      ).optional(),
      taskConfigId: z.string().describe("ID of the next task.").optional(),
      taskId: z.string().describe("Task number of the next task.").optional(),
    })).describe(
      "Optional. The set of tasks that are next in line to be executed as per the execution graph defined for the parent event, specified by `event_config_id`. Each of these next tasks are executed only if the condition associated with them evaluates to true.",
    ).optional(),
    nextTasksExecutionPolicy: z.enum([
      "NEXT_TASKS_EXECUTION_POLICY_UNSPECIFIED",
      "RUN_ALL_MATCH",
      "RUN_FIRST_MATCH",
    ]).describe(
      "Optional. The policy dictating the execution of the next set of tasks for the current task.",
    ).optional(),
    parameters: z.record(
      z.string(),
      z.object({
        key: z.string().describe(
          "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
        ).optional(),
        masked: z.boolean().describe(
          "True if this parameter should be masked in the logs",
        ).optional(),
        value: z.object({
          booleanArray: z.unknown().describe(
            "This message only contains a field of boolean array.",
          ).optional(),
          booleanValue: z.unknown().describe("Boolean.").optional(),
          doubleArray: z.unknown().describe(
            "This message only contains a field of double number array.",
          ).optional(),
          doubleValue: z.unknown().describe("Double Number.").optional(),
          intArray: z.unknown().describe(
            "This message only contains a field of integer array.",
          ).optional(),
          intValue: z.unknown().describe("Integer.").optional(),
          jsonValue: z.unknown().describe("Json.").optional(),
          stringArray: z.unknown().describe(
            "This message only contains a field of string array.",
          ).optional(),
          stringValue: z.unknown().describe("String.").optional(),
        }).describe("The type of the parameter.").optional(),
      }),
    ).describe(
      "Optional. The customized parameters the user can pass to this task.",
    ).optional(),
    position: z.object({
      x: z.number().int().describe("Required. X axis of the coordinate")
        .optional(),
      y: z.number().int().describe("Required. Y axis of the coordinate")
        .optional(),
    }).describe("Configuration detail of coordinate, it used for UI")
      .optional(),
    successPolicy: z.object({
      finalState: z.enum(["FINAL_STATE_UNSPECIFIED", "SUCCEEDED", "SUSPENDED"])
        .describe(
          "State to which the execution snapshot status will be set if the task succeeds.",
        ).optional(),
    }).describe(
      "Policy that dictates the behavior for the task after it completes successfully.",
    ).optional(),
    synchronousCallFailurePolicy: z.object({
      condition: z.string().describe(
        "Optional. The string condition that will be evaluated to determine if the task should be retried with this failure policy.",
      ).optional(),
      intervalTime: z.string().describe(
        "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the initial interval in seconds for backoff.",
      ).optional(),
      maxRetries: z.number().int().describe(
        "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
      ).optional(),
      retryStrategy: z.enum([
        "RETRY_STRATEGY_UNSPECIFIED",
        "IGNORE",
        "NONE",
        "FATAL",
        "FIXED_INTERVAL",
        "LINEAR_BACKOFF",
        "EXPONENTIAL_BACKOFF",
        "RESTART_INTEGRATION_WITH_BACKOFF",
      ]).describe("Defines what happens to the task upon failure.").optional(),
    }).describe(
      "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
    ).optional(),
    task: z.string().describe("Optional. The name for the task.").optional(),
    taskExecutionStrategy: z.enum([
      "TASK_EXECUTION_STRATEGY_UNSPECIFIED",
      "WHEN_ALL_SUCCEED",
      "WHEN_ANY_SUCCEED",
      "WHEN_ALL_TASKS_AND_CONDITIONS_SUCCEED",
    ]).describe(
      "Optional. The policy dictating the execution strategy of this task.",
    ).optional(),
    taskId: z.string().describe(
      "Required. The identifier of this task within its parent event config, specified by the client. This should be unique among all the tasks belong to the same event config. We use this field as the identifier to find next tasks (via field `next_tasks.task_id`).",
    ).optional(),
    taskTemplate: z.string().describe(
      "Optional. Used to define task-template name if task is of type task-template",
    ).optional(),
  })).describe(
    "Optional. Task configuration for the integration. It's optional, but the integration doesn't do anything without task_configs.",
  ).optional(),
  teardown: z.object({
    teardownTaskConfigs: z.array(z.object({
      creatorEmail: z.string().describe("The creator's email address.")
        .optional(),
      name: z.string().describe(
        "Required. Unique identifier of the teardown task within this Config. We use this field as the identifier to find next teardown tasks.",
      ).optional(),
      nextTeardownTask: z.object({
        name: z.string().describe("Required. Name of the next teardown task.")
          .optional(),
      }).describe(
        "The teardown task that is next in line to be executed. We support only sequential execution of teardown tasks (i.e. no branching).",
      ).optional(),
      parameters: z.object({
        parameters: z.array(z.unknown()).describe(
          "Parameters are a part of Event and can be used to communicate between different tasks that are part of the same integration execution.",
        ).optional(),
      }).describe(
        "LINT.IfChange This message is used for processing and persisting (when applicable) key value pair parameters for each event in the event bus. Please see",
      ).optional(),
      properties: z.object({
        properties: z.array(z.unknown()).describe(
          "An unordered list of property entries.",
        ).optional(),
      }).describe(
        "LINT.IfChange This message is used for storing key value pair properties for each Event / Task in the EventBus.",
      ).optional(),
      teardownTaskImplementationClassName: z.string().describe(
        "Required. Implementation class name.",
      ).optional(),
    })).describe("Required.").optional(),
  }).optional(),
  triggerConfigs: z.array(z.object({
    alertConfig: z.array(z.object({
      aggregationPeriod: z.string().describe(
        "The period over which the metric value should be aggregated and evaluated. Format is, where integer should be a positive integer and unit should be one of (s,m,h,d,w) meaning (second, minute, hour, day, week). For an EXPECTED_MIN threshold, this aggregation_period must be lesser than 24 hours.",
      ).optional(),
      alertThreshold: z.number().int().describe(
        "For how many contiguous aggregation periods should the expected min or max be violated for the alert to be fired.",
      ).optional(),
      disableAlert: z.boolean().describe(
        "Set to false by default. When set to true, the metrics are not aggregated or pushed to Monarch for this integration alert.",
      ).optional(),
      displayName: z.string().describe(
        "Name of the alert. This will be displayed in the alert subject. If set, this name should be unique within the scope of the integration.",
      ).optional(),
      durationThreshold: z.string().describe(
        "Should be specified only for *AVERAGE_DURATION and *PERCENTILE_DURATION metrics. This member should be used to specify what duration value the metrics should exceed for the alert to trigger.",
      ).optional(),
      metricType: z.enum([
        "METRIC_TYPE_UNSPECIFIED",
        "EVENT_ERROR_RATE",
        "EVENT_WARNING_RATE",
        "TASK_ERROR_RATE",
        "TASK_WARNING_RATE",
        "TASK_RATE",
        "EVENT_RATE",
        "EVENT_AVERAGE_DURATION",
        "EVENT_PERCENTILE_DURATION",
        "TASK_AVERAGE_DURATION",
        "TASK_PERCENTILE_DURATION",
      ]).describe("The type of metric.").optional(),
      onlyFinalAttempt: z.boolean().describe(
        "For either events or tasks, depending on the type of alert, count only final attempts, not retries.",
      ).optional(),
      thresholdType: z.enum([
        "THRESHOLD_TYPE_UNSPECIFIED",
        "EXPECTED_MIN",
        "EXPECTED_MAX",
      ]).describe(
        "The threshold type, whether lower(expected_min) or upper(expected_max), for which this alert is being configured. If value falls below expected_min or exceeds expected_max, an alert will be fired.",
      ).optional(),
      thresholdValue: z.object({
        absolute: z.unknown().describe("Absolute value threshold.").optional(),
        percentage: z.unknown().describe("Percentage threshold.").optional(),
      }).describe(
        "The threshold value of the metric, above or below which the alert should be triggered. See EventAlertConfig or TaskAlertConfig for the different alert metric types in each case. For the *RATE metrics, one or both of these fields may be set. Zero is the default value and can be left at that. For *PERCENTILE_DURATION metrics, one or both of these fields may be set, and also, the duration threshold value should be specified in the threshold_duration_ms member below. For *AVERAGE_DURATION metrics, these fields should not be set at all. A different member, threshold_duration_ms, must be set in the EventAlertConfig or the TaskAlertConfig.",
      ).optional(),
    })).describe(
      "Optional. An alert threshold configuration for the [trigger + client + integration] tuple. If these values are not specified in the trigger config, default values will be populated by the system. Note that there must be exactly one alert threshold configured per [client + trigger + integration] when published.",
    ).optional(),
    cloudSchedulerConfig: z.object({
      cronTab: z.string().describe(
        "Required. The cron tab of cloud scheduler trigger.",
      ).optional(),
      errorMessage: z.string().describe(
        "Optional. When the job was deleted from Pantheon UI, error_message will be populated when Get/List integrations",
      ).optional(),
      location: z.string().describe(
        "Required. The location where associated cloud scheduler job will be created",
      ).optional(),
      serviceAccountEmail: z.string().describe(
        "Required. Service account used by Cloud Scheduler to trigger the integration at scheduled time",
      ).optional(),
    }).describe("Cloud Scheduler Trigger configuration").optional(),
    description: z.string().describe(
      "Optional. User-provided description intended to give additional business context about the task.",
    ).optional(),
    errorCatcherId: z.string().describe(
      "Optional. Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task",
    ).optional(),
    inputVariables: z.object({
      names: z.array(z.string()).describe("Optional. List of variable names.")
        .optional(),
    }).describe("Variables names mapped to api trigger.").optional(),
    label: z.string().describe(
      "Optional. The user created label for a particular trigger.",
    ).optional(),
    nextTasksExecutionPolicy: z.enum([
      "NEXT_TASKS_EXECUTION_POLICY_UNSPECIFIED",
      "RUN_ALL_MATCH",
      "RUN_FIRST_MATCH",
    ]).describe("Optional. Dictates how next tasks will be executed.")
      .optional(),
    outputVariables: z.object({
      names: z.array(z.string()).describe("Optional. List of variable names.")
        .optional(),
    }).describe("Variables names mapped to api trigger.").optional(),
    position: z.object({
      x: z.number().int().describe("Required. X axis of the coordinate")
        .optional(),
      y: z.number().int().describe("Required. Y axis of the coordinate")
        .optional(),
    }).describe("Configuration detail of coordinate, it used for UI")
      .optional(),
    properties: z.record(z.string(), z.string()).describe(
      'Optional. Configurable properties of the trigger, not to be confused with integration parameters. E.g. "name" is a property for API triggers and "subscription" is a property for Pub/sub triggers.',
    ).optional(),
    startTasks: z.array(z.object({
      condition: z.string().describe(
        "Standard filter expression for this task to become an eligible next task.",
      ).optional(),
      description: z.string().describe(
        "User-provided description intended to give additional business context about the task.",
      ).optional(),
      displayName: z.string().describe(
        "User-provided label that is attached to this edge in the UI.",
      ).optional(),
      taskConfigId: z.string().describe("ID of the next task.").optional(),
      taskId: z.string().describe("Task number of the next task.").optional(),
    })).describe(
      "Optional. Set of tasks numbers from where the integration execution is started by this trigger. If this is empty, then integration is executed with default start tasks. In the list of start tasks, none of two tasks can have direct ancestor-descendant relationships (i.e. in a same integration execution graph).",
    ).optional(),
    trigger: z.string().describe(
      'Optional. Name of the trigger. Example: "API Trigger", "Cloud Pub Sub Trigger" When set will be sent out to monitoring dashabord for tracking purpose.',
    ).optional(),
    triggerId: z.string().describe(
      'Optional. Auto-generated trigger ID. The ID is based on the properties that you define in the trigger config. For example, for an API trigger, the trigger ID follows the format: api_trigger/TRIGGER_NAME Where trigger config has properties with value {"Trigger name": TRIGGER_NAME}',
    ).optional(),
    triggerNumber: z.string().describe(
      "Required. A number to uniquely identify each trigger config within the integration on UI.",
    ).optional(),
    triggerType: z.enum([
      "TRIGGER_TYPE_UNSPECIFIED",
      "CRON",
      "API",
      "SFDC_CHANNEL",
      "CLOUD_PUBSUB_EXTERNAL",
      "SFDC_CDC_CHANNEL",
      "CLOUD_SCHEDULER",
      "INTEGRATION_CONNECTOR_TRIGGER",
      "PRIVATE_TRIGGER",
      "CLOUD_PUBSUB",
      "EVENTARC_TRIGGER",
    ]).describe("Optional. Type of trigger").optional(),
  })).describe("Optional. Trigger configurations.").optional(),
  userLabel: z.string().describe(
    "Optional. A user-defined label that annotates an integration version. Typically, this is only set when the integration version is created.",
  ).optional(),
  createSampleIntegrations: z.string().describe(
    "Optional. Optional. Indicates if sample workflow should be created.",
  ).optional(),
  newIntegration: z.string().describe(
    "Set this flag to true, if draft version is to be created for a brand new integration. False, if the request is for an existing integration. For backward compatibility reasons, even if this flag is set to `false` and no existing integration is found, a new draft integration will still be created.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Application Integration Products.Integrations.Versions. Registered at `@swamp/gcp/integrations/products-integrations-versions`. */
export const model = {
  type: "@swamp/gcp/integrations/products-integrations-versions",
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
      description: "The integration version definition.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a versions",
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
        if (g["cloudKmsKey"] !== undefined) {
          body["cloudKmsKey"] = g["cloudKmsKey"];
        }
        if (g["cloudLoggingDetails"] !== undefined) {
          body["cloudLoggingDetails"] = g["cloudLoggingDetails"];
        }
        if (g["createdFromTemplate"] !== undefined) {
          body["createdFromTemplate"] = g["createdFromTemplate"];
        }
        if (g["databasePersistencePolicy"] !== undefined) {
          body["databasePersistencePolicy"] = g["databasePersistencePolicy"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["enableVariableMasking"] !== undefined) {
          body["enableVariableMasking"] = g["enableVariableMasking"];
        }
        if (g["errorCatcherConfigs"] !== undefined) {
          body["errorCatcherConfigs"] = g["errorCatcherConfigs"];
        }
        if (g["integrationConfigParameters"] !== undefined) {
          body["integrationConfigParameters"] =
            g["integrationConfigParameters"];
        }
        if (g["integrationParameters"] !== undefined) {
          body["integrationParameters"] = g["integrationParameters"];
        }
        if (g["integrationParametersInternal"] !== undefined) {
          body["integrationParametersInternal"] =
            g["integrationParametersInternal"];
        }
        if (g["lastModifierEmail"] !== undefined) {
          body["lastModifierEmail"] = g["lastModifierEmail"];
        }
        if (g["lockHolder"] !== undefined) body["lockHolder"] = g["lockHolder"];
        if (g["parentTemplateId"] !== undefined) {
          body["parentTemplateId"] = g["parentTemplateId"];
        }
        if (g["runAsServiceAccount"] !== undefined) {
          body["runAsServiceAccount"] = g["runAsServiceAccount"];
        }
        if (g["taskConfigs"] !== undefined) {
          body["taskConfigs"] = g["taskConfigs"];
        }
        if (g["teardown"] !== undefined) body["teardown"] = g["teardown"];
        if (g["triggerConfigs"] !== undefined) {
          body["triggerConfigs"] = g["triggerConfigs"];
        }
        if (g["userLabel"] !== undefined) body["userLabel"] = g["userLabel"];
        if (g["createSampleIntegrations"] !== undefined) {
          body["createSampleIntegrations"] = g["createSampleIntegrations"];
        }
        if (g["newIntegration"] !== undefined) {
          body["newIntegration"] = g["newIntegration"];
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
              "statusField": "status",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Get a versions",
      arguments: z.object({
        identifier: z.string().describe("The name of the versions"),
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
      description: "Update versions attributes",
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
        if (g["cloudKmsKey"] !== undefined) {
          body["cloudKmsKey"] = g["cloudKmsKey"];
        }
        if (g["cloudLoggingDetails"] !== undefined) {
          body["cloudLoggingDetails"] = g["cloudLoggingDetails"];
        }
        if (g["createdFromTemplate"] !== undefined) {
          body["createdFromTemplate"] = g["createdFromTemplate"];
        }
        if (g["databasePersistencePolicy"] !== undefined) {
          body["databasePersistencePolicy"] = g["databasePersistencePolicy"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["enableVariableMasking"] !== undefined) {
          body["enableVariableMasking"] = g["enableVariableMasking"];
        }
        if (g["errorCatcherConfigs"] !== undefined) {
          body["errorCatcherConfigs"] = g["errorCatcherConfigs"];
        }
        if (g["integrationConfigParameters"] !== undefined) {
          body["integrationConfigParameters"] =
            g["integrationConfigParameters"];
        }
        if (g["integrationParameters"] !== undefined) {
          body["integrationParameters"] = g["integrationParameters"];
        }
        if (g["integrationParametersInternal"] !== undefined) {
          body["integrationParametersInternal"] =
            g["integrationParametersInternal"];
        }
        if (g["lastModifierEmail"] !== undefined) {
          body["lastModifierEmail"] = g["lastModifierEmail"];
        }
        if (g["lockHolder"] !== undefined) body["lockHolder"] = g["lockHolder"];
        if (g["parentTemplateId"] !== undefined) {
          body["parentTemplateId"] = g["parentTemplateId"];
        }
        if (g["runAsServiceAccount"] !== undefined) {
          body["runAsServiceAccount"] = g["runAsServiceAccount"];
        }
        if (g["taskConfigs"] !== undefined) {
          body["taskConfigs"] = g["taskConfigs"];
        }
        if (g["teardown"] !== undefined) body["teardown"] = g["teardown"];
        if (g["triggerConfigs"] !== undefined) {
          body["triggerConfigs"] = g["triggerConfigs"];
        }
        if (g["userLabel"] !== undefined) body["userLabel"] = g["userLabel"];
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
              "statusField": "status",
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
      description: "Delete the versions",
      arguments: z.object({
        identifier: z.string().describe("The name of the versions"),
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
      description: "Sync versions state from GCP",
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
    download: {
      description: "download",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
              "integrations.projects.locations.products.integrations.versions.download",
            "path": "v1/{+name}:download",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "fileFormat": { "location": "query" },
              "files": { "location": "query" },
              "name": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    publish: {
      description: "publish",
      arguments: z.object({
        configParameters: z.any().optional(),
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
        if (args["configParameters"] !== undefined) {
          body["configParameters"] = args["configParameters"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "integrations.projects.locations.products.integrations.versions.publish",
            "path": "v1/{+name}:publish",
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
    takeover_edit_lock: {
      description: "takeover edit lock",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        params["integrationVersion"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "integrations.projects.locations.products.integrations.versions.takeoverEditLock",
            "path": "v1/{+integrationVersion}:takeoverEditLock",
            "httpMethod": "POST",
            "parameterOrder": ["integrationVersion"],
            "parameters": {
              "integrationVersion": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    unpublish: {
      description: "unpublish",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
              "integrations.projects.locations.products.integrations.versions.unpublish",
            "path": "v1/{+name}:unpublish",
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
    upload: {
      description: "upload",
      arguments: z.object({
        content: z.any().optional(),
        fileFormat: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["content"] !== undefined) body["content"] = args["content"];
        if (args["fileFormat"] !== undefined) {
          body["fileFormat"] = args["fileFormat"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "integrations.projects.locations.products.integrations.versions.upload",
            "path": "v1/{+parent}/versions:upload",
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
