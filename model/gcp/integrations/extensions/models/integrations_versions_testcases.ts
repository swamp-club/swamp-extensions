// Auto-generated extension model for @swamp/gcp/integrations/integrations-versions-testcases
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Application Integration Integrations.Versions.TestCases.
 *
 * Defines the functional test case for Application Integration. Next available id: 15
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
  return `${parent}/testCases/${shortName}`;
}

const BASE_URL = "https://integrations.googleapis.com/";

const GET_CONFIG = {
  "id": "integrations.projects.locations.integrations.versions.testCases.get",
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
  "id":
    "integrations.projects.locations.integrations.versions.testCases.create",
  "path": "v1/{+parent}/testCases",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "testCaseId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "integrations.projects.locations.integrations.versions.testCases.patch",
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
  "id":
    "integrations.projects.locations.integrations.versions.testCases.delete",
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
  createTime: z.string().describe("Auto-generated.").optional(),
  creatorEmail: z.string().describe(
    "Optional. The creator's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
  ).optional(),
  databasePersistencePolicy: z.enum([
    "DATABASE_PERSISTENCE_POLICY_UNSPECIFIED",
    "DATABASE_PERSISTENCE_DISABLED",
    "DATABASE_PERSISTENCE_ASYNC",
  ]).describe(
    "Optional. Various policies for how to persist the test execution info including execution info, execution export info, execution metadata index and execution param index..",
  ).optional(),
  description: z.string().describe("Optional. Description of the test case.")
    .optional(),
  displayName: z.string().describe("Required. The display name of test case.")
    .optional(),
  lastModifierEmail: z.string().describe(
    "The last modifier's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
  ).optional(),
  lockHolderEmail: z.string().describe(
    "Optional. The edit lock holder's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
  ).optional(),
  testInputParameters: z.array(z.object({
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
    "Optional. Parameters that are expected to be passed to the test case when the test case is triggered. This gives the user the ability to provide default values. This should include all the output variables of the trigger as input variables.",
  ).optional(),
  testTaskConfigs: z.array(z.object({
    assertions: z.array(z.object({
      assertionStrategy: z.enum([
        "ASSERTION_STRATEGY_UNSPECIFIED",
        "ASSERT_SUCCESSFUL_EXECUTION",
        "ASSERT_FAILED_EXECUTION",
        "ASSERT_NO_EXECUTION",
        "ASSERT_EQUALS",
        "ASSERT_NOT_EQUALS",
        "ASSERT_CONTAINS",
        "ASSERT_CONDITION",
      ]).describe("Optional. The type of assertion to perform.").optional(),
      condition: z.string().describe(
        "Optional. Standard filter expression for ASSERT_CONDITION to succeed",
      ).optional(),
      parameter: z.object({
        key: z.unknown().describe(
          "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
        ).optional(),
        masked: z.unknown().describe(
          "True if this parameter should be masked in the logs",
        ).optional(),
        value: z.unknown().describe("The type of the parameter.").optional(),
      }).describe(
        "This message is used for processing and persisting (when applicable) key value pair parameters for each event in the event bus. Next available id: 4",
      ).optional(),
      retryCount: z.number().int().describe(
        "Number of times given task should be retried in case of ASSERT_FAILED_EXECUTION",
      ).optional(),
    })).describe(
      "Optional. List of conditions or expressions which should be evaluated to true unless there is a bug/problem in the integration. These are evaluated one the task execution is completed as per the mock strategy in test case",
    ).optional(),
    mockConfig: z.object({
      failedExecutions: z.string().describe(
        "Optional. Number of times the given task should fail for failure mock strategy",
      ).optional(),
      mockStrategy: z.enum([
        "MOCK_STRATEGY_UNSPECIFIED",
        "NO_MOCK_STRATEGY",
        "SPECIFIC_MOCK_STRATEGY",
        "FAILURE_MOCK_STRATEGY",
        "SKIP_MOCK_STRATEGY",
      ]).describe(
        "Mockstrategy defines how the particular task should be mocked during test execution",
      ).optional(),
      parameters: z.array(z.object({
        key: z.unknown().describe(
          "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
        ).optional(),
        masked: z.unknown().describe(
          "True if this parameter should be masked in the logs",
        ).optional(),
        value: z.unknown().describe("The type of the parameter.").optional(),
      })).describe(
        "Optional. List of key-value pairs for specific mock strategy",
      ).optional(),
    }).describe(
      "The configuration for mocking of a task during test execution Next available id: 4",
    ).optional(),
    task: z.string().describe(
      "Required. This defines in the test case, the task name in integration which will be mocked by this test task config",
    ).optional(),
    taskConfig: z.object({
      conditionalFailurePolicies: z.object({
        defaultFailurePolicy: z.object({
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
        }).describe(
          "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
        ).optional(),
        failurePolicies: z.array(z.unknown()).describe(
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
        ]).describe("Defines what happens to the task upon failure.")
          .optional(),
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
        condition: z.unknown().describe(
          "Standard filter expression for this task to become an eligible next task.",
        ).optional(),
        description: z.unknown().describe(
          "User-provided description intended to give additional business context about the task.",
        ).optional(),
        displayName: z.unknown().describe(
          "User-provided label that is attached to this edge in the UI.",
        ).optional(),
        taskConfigId: z.unknown().describe("ID of the next task.").optional(),
        taskId: z.unknown().describe("Task number of the next task.")
          .optional(),
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
          key: z.unknown().describe(
            "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
          ).optional(),
          masked: z.unknown().describe(
            "True if this parameter should be masked in the logs",
          ).optional(),
          value: z.unknown().describe("The type of the parameter.").optional(),
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
        finalState: z.enum([
          "FINAL_STATE_UNSPECIFIED",
          "SUCCEEDED",
          "SUSPENDED",
        ]).describe(
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
        ]).describe("Defines what happens to the task upon failure.")
          .optional(),
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
    }).describe(
      "The task configuration details. This is not the implementation of Task. There might be multiple TaskConfigs for the same Task.",
    ).optional(),
    taskNumber: z.string().describe(
      "Required. This defines in the test case, the task in integration which will be mocked by this test task config",
    ).optional(),
  })).describe(
    "Optional. However, the test case doesn't mock or assert anything without test_task_configs.",
  ).optional(),
  triggerConfig: z.object({
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
        absolute: z.string().describe("Absolute value threshold.").optional(),
        percentage: z.number().int().describe("Percentage threshold.")
          .optional(),
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
  }).describe("Configuration detail of a trigger.").optional(),
  triggerId: z.string().describe(
    "Required. This defines the trigger ID in workflow which is considered to be executed as starting point of the test case",
  ).optional(),
  updateTime: z.string().describe("Auto-generated.").optional(),
  testCaseId: z.string().describe("Required. Required").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  creatorEmail: z.string().optional(),
  databasePersistencePolicy: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  lastModifierEmail: z.string().optional(),
  lockHolderEmail: z.string().optional(),
  name: z.string(),
  testInputParameters: z.array(z.object({
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
  testTaskConfigs: z.array(z.object({
    assertions: z.array(z.object({
      assertionStrategy: z.string(),
      condition: z.string(),
      parameter: z.object({
        key: z.unknown(),
        masked: z.unknown(),
        value: z.unknown(),
      }),
      retryCount: z.number(),
    })),
    mockConfig: z.object({
      failedExecutions: z.string(),
      mockStrategy: z.string(),
      parameters: z.array(z.object({
        key: z.unknown(),
        masked: z.unknown(),
        value: z.unknown(),
      })),
    }),
    task: z.string(),
    taskConfig: z.object({
      conditionalFailurePolicies: z.object({
        defaultFailurePolicy: z.object({
          condition: z.unknown(),
          intervalTime: z.unknown(),
          maxRetries: z.unknown(),
          retryStrategy: z.unknown(),
        }),
        failurePolicies: z.array(z.unknown()),
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
        condition: z.unknown(),
        description: z.unknown(),
        displayName: z.unknown(),
        taskConfigId: z.unknown(),
        taskId: z.unknown(),
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
    }),
    taskNumber: z.string(),
  })).optional(),
  triggerConfig: z.object({
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
        absolute: z.string(),
        percentage: z.number(),
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
  }).optional(),
  triggerId: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  createTime: z.string().describe("Auto-generated.").optional(),
  creatorEmail: z.string().describe(
    "Optional. The creator's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
  ).optional(),
  databasePersistencePolicy: z.enum([
    "DATABASE_PERSISTENCE_POLICY_UNSPECIFIED",
    "DATABASE_PERSISTENCE_DISABLED",
    "DATABASE_PERSISTENCE_ASYNC",
  ]).describe(
    "Optional. Various policies for how to persist the test execution info including execution info, execution export info, execution metadata index and execution param index..",
  ).optional(),
  description: z.string().describe("Optional. Description of the test case.")
    .optional(),
  displayName: z.string().describe("Required. The display name of test case.")
    .optional(),
  lastModifierEmail: z.string().describe(
    "The last modifier's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
  ).optional(),
  lockHolderEmail: z.string().describe(
    "Optional. The edit lock holder's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
  ).optional(),
  testInputParameters: z.array(z.object({
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
    "Optional. Parameters that are expected to be passed to the test case when the test case is triggered. This gives the user the ability to provide default values. This should include all the output variables of the trigger as input variables.",
  ).optional(),
  testTaskConfigs: z.array(z.object({
    assertions: z.array(z.object({
      assertionStrategy: z.enum([
        "ASSERTION_STRATEGY_UNSPECIFIED",
        "ASSERT_SUCCESSFUL_EXECUTION",
        "ASSERT_FAILED_EXECUTION",
        "ASSERT_NO_EXECUTION",
        "ASSERT_EQUALS",
        "ASSERT_NOT_EQUALS",
        "ASSERT_CONTAINS",
        "ASSERT_CONDITION",
      ]).describe("Optional. The type of assertion to perform.").optional(),
      condition: z.string().describe(
        "Optional. Standard filter expression for ASSERT_CONDITION to succeed",
      ).optional(),
      parameter: z.object({
        key: z.unknown().describe(
          "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
        ).optional(),
        masked: z.unknown().describe(
          "True if this parameter should be masked in the logs",
        ).optional(),
        value: z.unknown().describe("The type of the parameter.").optional(),
      }).describe(
        "This message is used for processing and persisting (when applicable) key value pair parameters for each event in the event bus. Next available id: 4",
      ).optional(),
      retryCount: z.number().int().describe(
        "Number of times given task should be retried in case of ASSERT_FAILED_EXECUTION",
      ).optional(),
    })).describe(
      "Optional. List of conditions or expressions which should be evaluated to true unless there is a bug/problem in the integration. These are evaluated one the task execution is completed as per the mock strategy in test case",
    ).optional(),
    mockConfig: z.object({
      failedExecutions: z.string().describe(
        "Optional. Number of times the given task should fail for failure mock strategy",
      ).optional(),
      mockStrategy: z.enum([
        "MOCK_STRATEGY_UNSPECIFIED",
        "NO_MOCK_STRATEGY",
        "SPECIFIC_MOCK_STRATEGY",
        "FAILURE_MOCK_STRATEGY",
        "SKIP_MOCK_STRATEGY",
      ]).describe(
        "Mockstrategy defines how the particular task should be mocked during test execution",
      ).optional(),
      parameters: z.array(z.object({
        key: z.unknown().describe(
          "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
        ).optional(),
        masked: z.unknown().describe(
          "True if this parameter should be masked in the logs",
        ).optional(),
        value: z.unknown().describe("The type of the parameter.").optional(),
      })).describe(
        "Optional. List of key-value pairs for specific mock strategy",
      ).optional(),
    }).describe(
      "The configuration for mocking of a task during test execution Next available id: 4",
    ).optional(),
    task: z.string().describe(
      "Required. This defines in the test case, the task name in integration which will be mocked by this test task config",
    ).optional(),
    taskConfig: z.object({
      conditionalFailurePolicies: z.object({
        defaultFailurePolicy: z.object({
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
        }).describe(
          "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
        ).optional(),
        failurePolicies: z.array(z.unknown()).describe(
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
        ]).describe("Defines what happens to the task upon failure.")
          .optional(),
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
        condition: z.unknown().describe(
          "Standard filter expression for this task to become an eligible next task.",
        ).optional(),
        description: z.unknown().describe(
          "User-provided description intended to give additional business context about the task.",
        ).optional(),
        displayName: z.unknown().describe(
          "User-provided label that is attached to this edge in the UI.",
        ).optional(),
        taskConfigId: z.unknown().describe("ID of the next task.").optional(),
        taskId: z.unknown().describe("Task number of the next task.")
          .optional(),
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
          key: z.unknown().describe(
            "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
          ).optional(),
          masked: z.unknown().describe(
            "True if this parameter should be masked in the logs",
          ).optional(),
          value: z.unknown().describe("The type of the parameter.").optional(),
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
        finalState: z.enum([
          "FINAL_STATE_UNSPECIFIED",
          "SUCCEEDED",
          "SUSPENDED",
        ]).describe(
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
        ]).describe("Defines what happens to the task upon failure.")
          .optional(),
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
    }).describe(
      "The task configuration details. This is not the implementation of Task. There might be multiple TaskConfigs for the same Task.",
    ).optional(),
    taskNumber: z.string().describe(
      "Required. This defines in the test case, the task in integration which will be mocked by this test task config",
    ).optional(),
  })).describe(
    "Optional. However, the test case doesn't mock or assert anything without test_task_configs.",
  ).optional(),
  triggerConfig: z.object({
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
        absolute: z.string().describe("Absolute value threshold.").optional(),
        percentage: z.number().int().describe("Percentage threshold.")
          .optional(),
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
  }).describe("Configuration detail of a trigger.").optional(),
  triggerId: z.string().describe(
    "Required. This defines the trigger ID in workflow which is considered to be executed as starting point of the test case",
  ).optional(),
  updateTime: z.string().describe("Auto-generated.").optional(),
  testCaseId: z.string().describe("Required. Required").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Application Integration Integrations.Versions.TestCases. Registered at `@swamp/gcp/integrations/integrations-versions-testcases`. */
export const model = {
  type: "@swamp/gcp/integrations/integrations-versions-testcases",
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
      description:
        "Defines the functional test case for Application Integration. Next available ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a testCases",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["creatorEmail"] !== undefined) {
          body["creatorEmail"] = g["creatorEmail"];
        }
        if (g["databasePersistencePolicy"] !== undefined) {
          body["databasePersistencePolicy"] = g["databasePersistencePolicy"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["lastModifierEmail"] !== undefined) {
          body["lastModifierEmail"] = g["lastModifierEmail"];
        }
        if (g["lockHolderEmail"] !== undefined) {
          body["lockHolderEmail"] = g["lockHolderEmail"];
        }
        if (g["testInputParameters"] !== undefined) {
          body["testInputParameters"] = g["testInputParameters"];
        }
        if (g["testTaskConfigs"] !== undefined) {
          body["testTaskConfigs"] = g["testTaskConfigs"];
        }
        if (g["triggerConfig"] !== undefined) {
          body["triggerConfig"] = g["triggerConfig"];
        }
        if (g["triggerId"] !== undefined) body["triggerId"] = g["triggerId"];
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
        if (g["testCaseId"] !== undefined) body["testCaseId"] = g["testCaseId"];
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
      description: "Get a testCases",
      arguments: z.object({
        identifier: z.string().describe("The name of the testCases"),
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
      description: "Update testCases attributes",
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
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["creatorEmail"] !== undefined) {
          body["creatorEmail"] = g["creatorEmail"];
        }
        if (g["databasePersistencePolicy"] !== undefined) {
          body["databasePersistencePolicy"] = g["databasePersistencePolicy"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["lastModifierEmail"] !== undefined) {
          body["lastModifierEmail"] = g["lastModifierEmail"];
        }
        if (g["lockHolderEmail"] !== undefined) {
          body["lockHolderEmail"] = g["lockHolderEmail"];
        }
        if (g["testInputParameters"] !== undefined) {
          body["testInputParameters"] = g["testInputParameters"];
        }
        if (g["testTaskConfigs"] !== undefined) {
          body["testTaskConfigs"] = g["testTaskConfigs"];
        }
        if (g["triggerConfig"] !== undefined) {
          body["triggerConfig"] = g["triggerConfig"];
        }
        if (g["triggerId"] !== undefined) body["triggerId"] = g["triggerId"];
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
      description: "Delete the testCases",
      arguments: z.object({
        identifier: z.string().describe("The name of the testCases"),
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
      description: "Sync testCases state from GCP",
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
              "integrations.projects.locations.integrations.versions.testCases.download",
            "path": "v1/{+name}:download",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "fileFormat": { "location": "query" },
              "name": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    execute: {
      description: "execute",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "integrations.projects.locations.integrations.versions.testCases.execute",
            "path": "v1/{+parent}/testCases:execute",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    execute_test: {
      description: "execute test",
      arguments: z.object({
        inputParameters: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        params["testCaseName"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["inputParameters"] !== undefined) {
          body["inputParameters"] = args["inputParameters"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "integrations.projects.locations.integrations.versions.testCases.executeTest",
            "path": "v1/{+testCaseName}:executeTest",
            "httpMethod": "POST",
            "parameterOrder": ["testCaseName"],
            "parameters": {
              "testCaseName": { "location": "path", "required": true },
            },
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
              "integrations.projects.locations.integrations.versions.testCases.takeoverEditLock",
            "path": "v1/{+name}:takeoverEditLock",
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
              "integrations.projects.locations.integrations.versions.testCases.upload",
            "path": "v1/{+parent}/testCases:upload",
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
