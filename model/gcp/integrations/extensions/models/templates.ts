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

// Auto-generated extension model for @swamp/gcp/integrations/templates
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Application Integration Templates.
 *
 * Defines the template for Application Integration
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/templates/${shortName}`;
}

const BASE_URL = "https://integrations.googleapis.com/";

const GET_CONFIG = {
  "id": "integrations.projects.locations.templates.get",
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
  "id": "integrations.projects.locations.templates.create",
  "path": "v1/{+parent}/templates",
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
  "id": "integrations.projects.locations.templates.patch",
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
  "id": "integrations.projects.locations.templates.delete",
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

const LIST_CONFIG = {
  "id": "integrations.projects.locations.templates.list",
  "path": "v1/{+parent}/templates",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
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
    "readMask": {
      "location": "query",
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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  author: z.string().describe("Optional. Creator of the template.").optional(),
  categories: z.array(
    z.enum([
      "CATEGORY_UNSPECIFIED",
      "AI_MACHINE_LEARNING",
      "BUSINESS_INTELLIGENCE",
      "COLLABORATION",
      "CUSTOMER_SERVICE",
      "DATABASES",
      "DEVOPS_IT",
      "CONTENT_AND_FILES",
      "FINANCE_AND_ACCOUNTING",
      "HUMAN_RESOURCES",
      "OPERATIONS",
      "PRODUCT_PROJECT_MANAGEMENT",
      "PRODUCTIVITY",
      "SALES_AND_MARKETING",
      "UNIVERSAL_CONNECTORS",
      "UTILITY",
      "OTHERS",
    ]),
  ).describe(
    "Required. Categories associated with the Template. The categories listed below will be utilized for the Template listing.",
  ).optional(),
  components: z.array(z.object({
    name: z.string().describe("Optional. Name of the component.").optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "TRIGGER", "TASK", "CONNECTOR"]).describe(
      "Optional. Type of the component.",
    ).optional(),
  })).describe(
    "Optional. Components being used in the template. This could be used to categorize and filter.",
  ).optional(),
  description: z.string().describe(
    "Optional. Description of the template. The length should not be more than 255 characters",
  ).optional(),
  displayName: z.string().describe("Required. The name of the template")
    .optional(),
  docLink: z.string().describe("Optional. Link to template documentation.")
    .optional(),
  lastUsedTime: z.string().describe(
    "Optional. Time the template was last used.",
  ).optional(),
  name: z.string().describe("Identifier. Resource name of the template.")
    .optional(),
  sharedWith: z.array(z.string()).describe(
    "Required. Resource names with which the template is shared for example ProjectNumber/Ord id",
  ).optional(),
  tags: z.array(z.string()).describe(
    "Required. Tags which are used to identify templates. These tags could be for business use case, connectors etc.",
  ).optional(),
  templateBundle: z.object({
    integrationVersionTemplate: z.object({
      integrationVersion: z.object({
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
        }).describe(
          "Optional. Cloud Logging details for the integration version",
        ).optional(),
        createTime: z.string().describe("Output only. Auto-generated.")
          .optional(),
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
        description: z.string().describe(
          "Optional. The integration description.",
        ).optional(),
        enableVariableMasking: z.boolean().describe(
          "Optional. True if variable masking feature should be turned on for this version",
        ).optional(),
        errorCatcherConfigs: z.array(z.object({
          description: z.unknown().describe(
            "Optional. User-provided description intended to give more business context about the error catcher config.",
          ).optional(),
          errorCatcherId: z.unknown().describe(
            "Required. An error catcher id is string representation for the error catcher config. Within a workflow, error_catcher_id uniquely identifies an error catcher config among all error catcher configs for the workflow",
          ).optional(),
          errorCatcherNumber: z.unknown().describe(
            "Required. A number to uniquely identify each error catcher config within the workflow on UI.",
          ).optional(),
          label: z.unknown().describe(
            "Optional. The user created label for a particular error catcher. Optional.",
          ).optional(),
          position: z.unknown().describe(
            "Optional. Informs the front-end application where to draw this error catcher config on the UI.",
          ).optional(),
          startErrorTasks: z.unknown().describe(
            "Required. The set of start tasks that are to be executed for the error catch flow",
          ).optional(),
        })).describe(
          "Optional. Error Catch Task configuration for the integration. It's optional.",
        ).optional(),
        integrationConfigParameters: z.array(z.object({
          parameter: z.unknown().describe(
            "Optional. Integration Parameter to provide the default value, data type and attributes required for the Integration config variables.",
          ).optional(),
          value: z.unknown().describe(
            "Values for the defined keys. Each value can either be string, int, double or any proto message or a serialized object.",
          ).optional(),
        })).describe(
          "Optional. Config Parameters that are expected to be passed to the integration when an integration is published. This consists of all the parameters that are expected to provide configuration in the integration execution. This gives the user the ability to provide default values, value, add information like connection url, project based configuration value and also provide data types of each parameter.",
        ).optional(),
        integrationParameters: z.array(z.object({
          containsLargeData: z.unknown().describe(
            "Indicates whether this variable contains large data and need to be uploaded to Cloud Storage.",
          ).optional(),
          dataType: z.unknown().describe("Type of the parameter.").optional(),
          defaultValue: z.unknown().describe(
            "Default values for the defined keys. Each value can either be string, int, double or any proto message or a serialized object.",
          ).optional(),
          description: z.unknown().describe(
            "Optional. Description of the parameter.",
          ).optional(),
          displayName: z.unknown().describe(
            'The name (without prefix) to be displayed in the UI for this parameter. E.g. if the key is "foo.bar.myName", then the name would be "myName".',
          ).optional(),
          inputOutputType: z.unknown().describe(
            "Specifies the input/output type for the parameter.",
          ).optional(),
          isTransient: z.unknown().describe(
            "Whether this parameter is a transient parameter.",
          ).optional(),
          jsonSchema: z.unknown().describe(
            "This schema will be used to validate runtime JSON-typed values of this parameter.",
          ).optional(),
          key: z.unknown().describe(
            "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
          ).optional(),
          masked: z.unknown().describe(
            "True if this parameter should be masked in the logs",
          ).optional(),
          producer: z.unknown().describe(
            "The identifier of the node (TaskConfig/TriggerConfig) this parameter was produced by, if it is a transient param or a copy of an input param.",
          ).optional(),
          searchable: z.unknown().describe(
            "Searchable in the execution log or not.",
          ).optional(),
        })).describe(
          "Optional. Parameters that are expected to be passed to the integration when an event is triggered. This consists of all the parameters that are expected in the integration execution. This gives the user the ability to provide default values, add information like PII and also provide data types of each parameter.",
        ).optional(),
        integrationParametersInternal: z.object({
          parameters: z.array(z.unknown()).describe(
            "Parameters are a part of Event and can be used to communiticate between different tasks that are part of the same workflow execution.",
          ).optional(),
        }).describe(
          "Optional. Deprecated: Use `integration_parameters` instead. Parameters that are expected to be passed to the integration when an event is triggered. This consists of all the parameters that are expected in the integration execution. This gives the user the ability to provide default values, add information like PII and also provide data types of each parameter.",
        ).optional(),
        lastModifierEmail: z.string().describe(
          "Optional. The last modifier's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
        ).optional(),
        lockHolder: z.string().describe(
          "Optional. The edit lock holder's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
        ).optional(),
        name: z.string().describe("Output only. Auto-generated primary key.")
          .optional(),
        origin: z.enum([
          "UNSPECIFIED",
          "UI",
          "PIPER_V2",
          "PIPER_V3",
          "APPLICATION_IP_PROVISIONING",
          "TEST_CASE",
        ]).describe(
          "Optional. The origin that indicates where this integration is coming from.",
        ).optional(),
        parentTemplateId: z.string().describe(
          "Optional. The id of the template which was used to create this integration_version.",
        ).optional(),
        runAsServiceAccount: z.string().describe(
          "Optional. The run-as service account email, if set and auth config is not configured, that will be used to generate auth token to be used in Connector task, Rest caller task and Cloud function task.",
        ).optional(),
        snapshotNumber: z.string().describe(
          'Output only. An increasing sequence that is set when a new snapshot is created. The last created snapshot can be identified by [workflow_name, org_id latest(snapshot_number)]. However, last created snapshot need not be same as the HEAD. So users should always use "HEAD" tag to identify the head.',
        ).optional(),
        state: z.enum([
          "INTEGRATION_STATE_UNSPECIFIED",
          "DRAFT",
          "ACTIVE",
          "ARCHIVED",
          "SNAPSHOT",
        ]).describe("Output only. User should not set it as an input.")
          .optional(),
        status: z.enum(["UNKNOWN", "DRAFT", "ACTIVE", "ARCHIVED", "SNAPSHOT"])
          .describe(
            "Output only. Generated by eventbus. User should not set it as an input.",
          ).optional(),
        taskConfigs: z.array(z.object({
          conditionalFailurePolicies: z.unknown().describe(
            "Optional. The list of conditional failure policies that will be applied to the task in order.",
          ).optional(),
          description: z.unknown().describe(
            "Optional. User-provided description intended to give additional business context about the task.",
          ).optional(),
          displayName: z.unknown().describe(
            "Optional. User-provided label that is attached to this TaskConfig in the UI.",
          ).optional(),
          errorCatcherId: z.unknown().describe(
            "Optional. Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task",
          ).optional(),
          externalTaskType: z.unknown().describe(
            "Optional. External task type of the task",
          ).optional(),
          failurePolicy: z.unknown().describe(
            "Optional. Determines the number of times the task will be retried on failure and with what retry strategy. This is applicable for asynchronous calls to Eventbus alone (Post To Queue, Schedule etc.).",
          ).optional(),
          jsonValidationOption: z.unknown().describe(
            "Optional. If set, overrides the option configured in the Task implementation class.",
          ).optional(),
          nextTasks: z.unknown().describe(
            "Optional. The set of tasks that are next in line to be executed as per the execution graph defined for the parent event, specified by `event_config_id`. Each of these next tasks are executed only if the condition associated with them evaluates to true.",
          ).optional(),
          nextTasksExecutionPolicy: z.unknown().describe(
            "Optional. The policy dictating the execution of the next set of tasks for the current task.",
          ).optional(),
          parameters: z.unknown().describe(
            "Optional. The customized parameters the user can pass to this task.",
          ).optional(),
          position: z.unknown().describe(
            "Optional. Informs the front-end application where to draw this error catcher config on the UI.",
          ).optional(),
          successPolicy: z.unknown().describe(
            "Optional. Determines what action to take upon successful task completion.",
          ).optional(),
          synchronousCallFailurePolicy: z.unknown().describe(
            "Optional. Determines the number of times the task will be retried on failure and with what retry strategy. This is applicable for synchronous calls to Eventbus alone (Post).",
          ).optional(),
          task: z.unknown().describe("Optional. The name for the task.")
            .optional(),
          taskExecutionStrategy: z.unknown().describe(
            "Optional. The policy dictating the execution strategy of this task.",
          ).optional(),
          taskId: z.unknown().describe(
            "Required. The identifier of this task within its parent event config, specified by the client. This should be unique among all the tasks belong to the same event config. We use this field as the identifier to find next tasks (via field `next_tasks.task_id`).",
          ).optional(),
          taskTemplate: z.unknown().describe(
            "Optional. Used to define task-template name if task is of type task-template",
          ).optional(),
        })).describe(
          "Optional. Task configuration for the integration. It's optional, but the integration doesn't do anything without task_configs.",
        ).optional(),
        taskConfigsInternal: z.array(z.object({
          alertConfigs: z.unknown().describe(
            "Alert configurations on error rate, warning rate, number of runs, durations, etc.",
          ).optional(),
          conditionalFailurePolicies: z.unknown().describe(
            "Optional. Determines the number of times the task will be retried on failure and with what retry strategy. This is applicable for synchronous calls to Eventbus alone (Post).",
          ).optional(),
          createTime: z.unknown().describe("Auto-generated.").optional(),
          creatorEmail: z.unknown().describe(
            "The creator's email address. Auto-generated from the user's email.",
          ).optional(),
          description: z.unknown().describe(
            "User-provided description intended to give more business context about the task.",
          ).optional(),
          disableStrictTypeValidation: z.unknown().describe(
            "If this config contains a TypedTask, allow validation to succeed if an input is read from the output of another TypedTask whose output type is declared as a superclass of the requested input type. For instance, if the previous task declares an output of type Message, any task with this flag enabled will pass validation when attempting to read any proto Message type from the resultant Event parameter.",
          ).optional(),
          errorCatcherId: z.unknown().describe(
            "Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task",
          ).optional(),
          externalTaskType: z.unknown().optional(),
          failurePolicy: z.unknown().describe(
            "Optional. Determines the number of times the task will be retried on failure and with what retry strategy. This is applicable for asynchronous calls to Eventbus alone (Post To Queue, Schedule etc.).",
          ).optional(),
          incomingEdgeCount: z.unknown().describe(
            "The number of edges leading into this TaskConfig.",
          ).optional(),
          jsonValidationOption: z.unknown().describe(
            "If set, overrides the option configured in the Task implementation class.",
          ).optional(),
          label: z.unknown().describe(
            "User-provided label that is attached to this TaskConfig in the UI.",
          ).optional(),
          lastModifiedTime: z.unknown().describe("Auto-generated.").optional(),
          nextTasks: z.unknown().describe(
            "The set of tasks that are next in line to be executed as per the execution graph defined for the parent event, specified by `event_config_id`. Each of these next tasks are executed only if the condition associated with them evaluates to true.",
          ).optional(),
          nextTasksExecutionPolicy: z.unknown().describe(
            "The policy dictating the execution of the next set of tasks for the current task.",
          ).optional(),
          parameters: z.unknown().describe(
            "The customized parameters the user can pass to this task.",
          ).optional(),
          position: z.unknown().describe(
            "Optional. Informs the front-end application where to draw this task config on the UI.",
          ).optional(),
          precondition: z.unknown().describe(
            'Optional. Standard filter expression evaluated before execution. Independent of other conditions and tasks. Can be used to enable rollout. e.g. "rollout(5)" will only allow 5% of incoming traffic to task.',
          ).optional(),
          preconditionLabel: z.unknown().describe(
            "Optional. User-provided label that is attached to precondition in the UI.",
          ).optional(),
          rollbackStrategy: z.unknown().describe(
            "Optional. Contains information about what needs to be done upon failure (either a permanent error or after it has been retried too many times).",
          ).optional(),
          successPolicy: z.unknown().describe(
            "Determines what action to take upon successful task completion.",
          ).optional(),
          synchronousCallFailurePolicy: z.unknown().describe(
            "Optional. Determines the number of times the task will be retried on failure and with what retry strategy. This is applicable for synchronous calls to Eventbus alone (Post).",
          ).optional(),
          taskEntity: z.unknown().describe(
            "Copy of the task entity that this task config is an instance of.",
          ).optional(),
          taskExecutionStrategy: z.unknown().describe(
            "The policy dictating the execution strategy of this task.",
          ).optional(),
          taskName: z.unknown().describe("The name for the task.").optional(),
          taskNumber: z.unknown().describe(
            "REQUIRED: the identifier of this task within its parent event config, specified by the client. This should be unique among all the tasks belong to the same event config. We use this field as the identifier to find next tasks (via field `next_tasks.task_number`).",
          ).optional(),
          taskSpec: z.unknown().describe(
            'A string template that allows user to configure task parameters (with either literal default values or tokens which will be resolved at execution time) for the task. It will eventually replace the old "parameters" field.',
          ).optional(),
          taskTemplateName: z.unknown().describe(
            "Used to define task-template name if task is of type task-template",
          ).optional(),
          taskType: z.unknown().describe("Defines the type of the task")
            .optional(),
        })).describe(
          "Optional. Deprecated: Use `task_configs` instead. Task configuration for the integration. It's optional, but the integration doesn't do anything without task_configs.",
        ).optional(),
        teardown: z.object({
          teardownTaskConfigs: z.array(z.unknown()).describe("Required.")
            .optional(),
        }).describe(
          'Optional. Contains a graph of tasks that will be executed before putting the event in a terminal state (SUCCEEDED/FAILED/FATAL), regardless of success or failure, similar to "finally" in code.',
        ).optional(),
        triggerConfigs: z.array(z.object({
          alertConfig: z.unknown().describe(
            "Optional. An alert threshold configuration for the [trigger + client + integration] tuple. If these values are not specified in the trigger config, default values will be populated by the system. Note that there must be exactly one alert threshold configured per [client + trigger + integration] when published.",
          ).optional(),
          cloudSchedulerConfig: z.unknown().describe(
            "Optional. Cloud Scheduler Trigger related metadata",
          ).optional(),
          description: z.unknown().describe(
            "Optional. User-provided description intended to give additional business context about the task.",
          ).optional(),
          errorCatcherId: z.unknown().describe(
            "Optional. Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task",
          ).optional(),
          inputVariables: z.unknown().describe(
            "Optional. List of input variables for the api trigger.",
          ).optional(),
          label: z.unknown().describe(
            "Optional. The user created label for a particular trigger.",
          ).optional(),
          nextTasksExecutionPolicy: z.unknown().describe(
            "Optional. Dictates how next tasks will be executed.",
          ).optional(),
          outputVariables: z.unknown().describe(
            "Optional. List of output variables for the api trigger.",
          ).optional(),
          position: z.unknown().describe(
            "Optional. Informs the front-end application where to draw this error catcher config on the UI.",
          ).optional(),
          properties: z.unknown().describe(
            'Optional. Configurable properties of the trigger, not to be confused with integration parameters. E.g. "name" is a property for API triggers and "subscription" is a property for Pub/sub triggers.',
          ).optional(),
          startTasks: z.unknown().describe(
            "Optional. Set of tasks numbers from where the integration execution is started by this trigger. If this is empty, then integration is executed with default start tasks. In the list of start tasks, none of two tasks can have direct ancestor-descendant relationships (i.e. in a same integration execution graph).",
          ).optional(),
          trigger: z.unknown().describe(
            'Optional. Name of the trigger. Example: "API Trigger", "Cloud Pub Sub Trigger" When set will be sent out to monitoring dashabord for tracking purpose.',
          ).optional(),
          triggerId: z.unknown().describe(
            'Optional. Auto-generated trigger ID. The ID is based on the properties that you define in the trigger config. For example, for an API trigger, the trigger ID follows the format: api_trigger/TRIGGER_NAME Where trigger config has properties with value {"Trigger name": TRIGGER_NAME}',
          ).optional(),
          triggerNumber: z.unknown().describe(
            "Required. A number to uniquely identify each trigger config within the integration on UI.",
          ).optional(),
          triggerType: z.unknown().describe("Optional. Type of trigger")
            .optional(),
        })).describe("Optional. Trigger configurations.").optional(),
        triggerConfigsInternal: z.array(z.object({
          alertConfig: z.unknown().describe(
            "An alert threshold configuration for the [trigger + client + workflow] tuple. If these values are not specified in the trigger config, default values will be populated by the system. Note that there must be exactly one alert threshold configured per [client + trigger + workflow] when published.",
          ).optional(),
          cloudSchedulerConfig: z.unknown().describe(
            "Cloud Scheduler Trigger configuration",
          ).optional(),
          description: z.unknown().describe(
            "User-provided description intended to give more business context about the task.",
          ).optional(),
          enabledClients: z.unknown().describe(
            "Required. The list of client ids which are enabled to execute the workflow using this trigger. In other words, these clients have the workflow execution privledges for this trigger. For API trigger, the client id in the incoming request is validated against the list of enabled clients. For non-API triggers, one workflow execution is triggered on behalf of each enabled client.",
          ).optional(),
          errorCatcherId: z.unknown().describe(
            "Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task",
          ).optional(),
          inputVariables: z.unknown().describe(
            "Optional. List of input variables for the api trigger.",
          ).optional(),
          label: z.unknown().describe(
            "The user created label for a particular trigger.",
          ).optional(),
          nextTasksExecutionPolicy: z.unknown().describe(
            "Dictates how next tasks will be executed.",
          ).optional(),
          outputVariables: z.unknown().describe(
            "Optional. List of output variables for the api trigger.",
          ).optional(),
          pauseWorkflowExecutions: z.unknown().describe(
            "Optional. If set to true, any upcoming requests for this trigger config will be paused and the executions will be resumed later when the flag is reset. The workflow to which this trigger config belongs has to be in ACTIVE status for the executions to be paused or resumed.",
          ).optional(),
          position: z.unknown().describe(
            "Optional. Informs the front-end application where to draw this trigger config on the UI.",
          ).optional(),
          properties: z.unknown().describe(
            'Configurable properties of the trigger, not to be confused with workflow parameters. E.g. "name" is a property for API triggers and "subscription" is a property for Cloud Pubsub triggers.',
          ).optional(),
          startTasks: z.unknown().describe(
            "Set of tasks numbers from where the workflow execution is started by this trigger. If this is empty, then workflow is executed with default start tasks. In the list of start tasks, none of two tasks can have direct ancestor-descendant relationships (i.e. in a same workflow execution graph).",
          ).optional(),
          triggerCriteria: z.unknown().describe(
            "Optional. When set, Eventbus will run the task specified in the trigger_criteria and validate the result using the trigger_criteria.condition, and only execute the workflow when result is true.",
          ).optional(),
          triggerId: z.unknown().describe("The backend trigger ID.").optional(),
          triggerName: z.unknown().describe(
            "Optional. Name of the trigger This is added to identify the type of trigger. This is avoid the logic on triggerId to identify the trigger_type and push the same to monitoring.",
          ).optional(),
          triggerNumber: z.unknown().describe(
            "Required. A number to uniquely identify each trigger config within the workflow on UI.",
          ).optional(),
          triggerType: z.unknown().optional(),
        })).describe(
          "Optional. Deprecated: Use `trigger_configs` instead. Trigger configurations.",
        ).optional(),
        updateTime: z.string().describe("Output only. Auto-generated.")
          .optional(),
        userLabel: z.string().describe(
          "Optional. A user-defined label that annotates an integration version. Typically, this is only set when the integration version is created.",
        ).optional(),
      }).describe("Required. Templatized version of integration.").optional(),
      key: z.string().describe(
        "Required. Unique Key of the IntegrationVersion.",
      ).optional(),
    }).describe("Required. Main integration templates of the template bundle.")
      .optional(),
    subIntegrationVersionTemplates: z.array(z.object({
      integrationVersion: z.object({
        cloudKmsKey: z.string().describe(
          "Optional. Cloud KMS resource name for the CMEK encryption key.",
        ).optional(),
        cloudLoggingDetails: z.object({
          cloudLoggingSeverity: z.unknown().describe(
            "Optional. Severity selected by the customer for the logs to be sent to Cloud Logging, for the integration version getting executed.",
          ).optional(),
          enableCloudLogging: z.unknown().describe(
            "Optional. Status of whether Cloud Logging is enabled or not for the integration version getting executed.",
          ).optional(),
        }).describe(
          "Optional. Cloud Logging details for the integration version",
        ).optional(),
        createTime: z.string().describe("Output only. Auto-generated.")
          .optional(),
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
        description: z.string().describe(
          "Optional. The integration description.",
        ).optional(),
        enableVariableMasking: z.boolean().describe(
          "Optional. True if variable masking feature should be turned on for this version",
        ).optional(),
        errorCatcherConfigs: z.array(z.unknown()).describe(
          "Optional. Error Catch Task configuration for the integration. It's optional.",
        ).optional(),
        integrationConfigParameters: z.array(z.unknown()).describe(
          "Optional. Config Parameters that are expected to be passed to the integration when an integration is published. This consists of all the parameters that are expected to provide configuration in the integration execution. This gives the user the ability to provide default values, value, add information like connection url, project based configuration value and also provide data types of each parameter.",
        ).optional(),
        integrationParameters: z.array(z.unknown()).describe(
          "Optional. Parameters that are expected to be passed to the integration when an event is triggered. This consists of all the parameters that are expected in the integration execution. This gives the user the ability to provide default values, add information like PII and also provide data types of each parameter.",
        ).optional(),
        integrationParametersInternal: z.object({
          parameters: z.unknown().describe(
            "Parameters are a part of Event and can be used to communiticate between different tasks that are part of the same workflow execution.",
          ).optional(),
        }).describe(
          "Optional. Deprecated: Use `integration_parameters` instead. Parameters that are expected to be passed to the integration when an event is triggered. This consists of all the parameters that are expected in the integration execution. This gives the user the ability to provide default values, add information like PII and also provide data types of each parameter.",
        ).optional(),
        lastModifierEmail: z.string().describe(
          "Optional. The last modifier's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
        ).optional(),
        lockHolder: z.string().describe(
          "Optional. The edit lock holder's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
        ).optional(),
        name: z.string().describe("Output only. Auto-generated primary key.")
          .optional(),
        origin: z.enum([
          "UNSPECIFIED",
          "UI",
          "PIPER_V2",
          "PIPER_V3",
          "APPLICATION_IP_PROVISIONING",
          "TEST_CASE",
        ]).describe(
          "Optional. The origin that indicates where this integration is coming from.",
        ).optional(),
        parentTemplateId: z.string().describe(
          "Optional. The id of the template which was used to create this integration_version.",
        ).optional(),
        runAsServiceAccount: z.string().describe(
          "Optional. The run-as service account email, if set and auth config is not configured, that will be used to generate auth token to be used in Connector task, Rest caller task and Cloud function task.",
        ).optional(),
        snapshotNumber: z.string().describe(
          'Output only. An increasing sequence that is set when a new snapshot is created. The last created snapshot can be identified by [workflow_name, org_id latest(snapshot_number)]. However, last created snapshot need not be same as the HEAD. So users should always use "HEAD" tag to identify the head.',
        ).optional(),
        state: z.enum([
          "INTEGRATION_STATE_UNSPECIFIED",
          "DRAFT",
          "ACTIVE",
          "ARCHIVED",
          "SNAPSHOT",
        ]).describe("Output only. User should not set it as an input.")
          .optional(),
        status: z.enum(["UNKNOWN", "DRAFT", "ACTIVE", "ARCHIVED", "SNAPSHOT"])
          .describe(
            "Output only. Generated by eventbus. User should not set it as an input.",
          ).optional(),
        taskConfigs: z.array(z.unknown()).describe(
          "Optional. Task configuration for the integration. It's optional, but the integration doesn't do anything without task_configs.",
        ).optional(),
        taskConfigsInternal: z.array(z.unknown()).describe(
          "Optional. Deprecated: Use `task_configs` instead. Task configuration for the integration. It's optional, but the integration doesn't do anything without task_configs.",
        ).optional(),
        teardown: z.object({
          teardownTaskConfigs: z.unknown().describe("Required.").optional(),
        }).describe(
          'Optional. Contains a graph of tasks that will be executed before putting the event in a terminal state (SUCCEEDED/FAILED/FATAL), regardless of success or failure, similar to "finally" in code.',
        ).optional(),
        triggerConfigs: z.array(z.unknown()).describe(
          "Optional. Trigger configurations.",
        ).optional(),
        triggerConfigsInternal: z.array(z.unknown()).describe(
          "Optional. Deprecated: Use `trigger_configs` instead. Trigger configurations.",
        ).optional(),
        updateTime: z.string().describe("Output only. Auto-generated.")
          .optional(),
        userLabel: z.string().describe(
          "Optional. A user-defined label that annotates an integration version. Typically, this is only set when the integration version is created.",
        ).optional(),
      }).describe("Required. Templatized version of integration.").optional(),
      key: z.string().describe(
        "Required. Unique Key of the IntegrationVersion.",
      ).optional(),
    })).describe(
      "Optional. Sub integration templates which would be added along with main integration.",
    ).optional(),
  }).describe(
    "Required. Bundle which is part of the templates. The template entities in the bundle would be converted to an actual entity.",
  ).optional(),
  usageCount: z.string().describe("Optional. Number of template usages.")
    .optional(),
  usageInfo: z.string().describe(
    "Optional. Information on how to use the template. This should contain detailed information about usage of the template.",
  ).optional(),
  visibility: z.enum(["VISIBILITY_UNSPECIFIED", "PRIVATE", "SHARED", "PUBLIC"])
    .describe("Required. Visibility of the template.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  author: z.string().optional(),
  categories: z.array(z.string()).optional(),
  components: z.array(z.object({
    name: z.string(),
    type: z.string(),
  })).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  docLink: z.string().optional(),
  lastUsedTime: z.string().optional(),
  name: z.string(),
  sharedWith: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  templateBundle: z.object({
    integrationVersionTemplate: z.object({
      integrationVersion: z.object({
        cloudKmsKey: z.string(),
        cloudLoggingDetails: z.object({
          cloudLoggingSeverity: z.string(),
          enableCloudLogging: z.boolean(),
        }),
        createTime: z.string(),
        createdFromTemplate: z.string(),
        databasePersistencePolicy: z.string(),
        description: z.string(),
        enableVariableMasking: z.boolean(),
        errorCatcherConfigs: z.array(z.object({
          description: z.unknown(),
          errorCatcherId: z.unknown(),
          errorCatcherNumber: z.unknown(),
          label: z.unknown(),
          position: z.unknown(),
          startErrorTasks: z.unknown(),
        })),
        integrationConfigParameters: z.array(z.object({
          parameter: z.unknown(),
          value: z.unknown(),
        })),
        integrationParameters: z.array(z.object({
          containsLargeData: z.unknown(),
          dataType: z.unknown(),
          defaultValue: z.unknown(),
          description: z.unknown(),
          displayName: z.unknown(),
          inputOutputType: z.unknown(),
          isTransient: z.unknown(),
          jsonSchema: z.unknown(),
          key: z.unknown(),
          masked: z.unknown(),
          producer: z.unknown(),
          searchable: z.unknown(),
        })),
        integrationParametersInternal: z.object({
          parameters: z.array(z.unknown()),
        }),
        lastModifierEmail: z.string(),
        lockHolder: z.string(),
        name: z.string(),
        origin: z.string(),
        parentTemplateId: z.string(),
        runAsServiceAccount: z.string(),
        snapshotNumber: z.string(),
        state: z.string(),
        status: z.string(),
        taskConfigs: z.array(z.object({
          conditionalFailurePolicies: z.unknown(),
          description: z.unknown(),
          displayName: z.unknown(),
          errorCatcherId: z.unknown(),
          externalTaskType: z.unknown(),
          failurePolicy: z.unknown(),
          jsonValidationOption: z.unknown(),
          nextTasks: z.unknown(),
          nextTasksExecutionPolicy: z.unknown(),
          parameters: z.unknown(),
          position: z.unknown(),
          successPolicy: z.unknown(),
          synchronousCallFailurePolicy: z.unknown(),
          task: z.unknown(),
          taskExecutionStrategy: z.unknown(),
          taskId: z.unknown(),
          taskTemplate: z.unknown(),
        })),
        taskConfigsInternal: z.array(z.object({
          alertConfigs: z.unknown(),
          conditionalFailurePolicies: z.unknown(),
          createTime: z.unknown(),
          creatorEmail: z.unknown(),
          description: z.unknown(),
          disableStrictTypeValidation: z.unknown(),
          errorCatcherId: z.unknown(),
          externalTaskType: z.unknown(),
          failurePolicy: z.unknown(),
          incomingEdgeCount: z.unknown(),
          jsonValidationOption: z.unknown(),
          label: z.unknown(),
          lastModifiedTime: z.unknown(),
          nextTasks: z.unknown(),
          nextTasksExecutionPolicy: z.unknown(),
          parameters: z.unknown(),
          position: z.unknown(),
          precondition: z.unknown(),
          preconditionLabel: z.unknown(),
          rollbackStrategy: z.unknown(),
          successPolicy: z.unknown(),
          synchronousCallFailurePolicy: z.unknown(),
          taskEntity: z.unknown(),
          taskExecutionStrategy: z.unknown(),
          taskName: z.unknown(),
          taskNumber: z.unknown(),
          taskSpec: z.unknown(),
          taskTemplateName: z.unknown(),
          taskType: z.unknown(),
        })),
        teardown: z.object({
          teardownTaskConfigs: z.array(z.unknown()),
        }),
        triggerConfigs: z.array(z.object({
          alertConfig: z.unknown(),
          cloudSchedulerConfig: z.unknown(),
          description: z.unknown(),
          errorCatcherId: z.unknown(),
          inputVariables: z.unknown(),
          label: z.unknown(),
          nextTasksExecutionPolicy: z.unknown(),
          outputVariables: z.unknown(),
          position: z.unknown(),
          properties: z.unknown(),
          startTasks: z.unknown(),
          trigger: z.unknown(),
          triggerId: z.unknown(),
          triggerNumber: z.unknown(),
          triggerType: z.unknown(),
        })),
        triggerConfigsInternal: z.array(z.object({
          alertConfig: z.unknown(),
          cloudSchedulerConfig: z.unknown(),
          description: z.unknown(),
          enabledClients: z.unknown(),
          errorCatcherId: z.unknown(),
          inputVariables: z.unknown(),
          label: z.unknown(),
          nextTasksExecutionPolicy: z.unknown(),
          outputVariables: z.unknown(),
          pauseWorkflowExecutions: z.unknown(),
          position: z.unknown(),
          properties: z.unknown(),
          startTasks: z.unknown(),
          triggerCriteria: z.unknown(),
          triggerId: z.unknown(),
          triggerName: z.unknown(),
          triggerNumber: z.unknown(),
          triggerType: z.unknown(),
        })),
        updateTime: z.string(),
        userLabel: z.string(),
      }),
      key: z.string(),
    }),
    subIntegrationVersionTemplates: z.array(z.object({
      integrationVersion: z.object({
        cloudKmsKey: z.string(),
        cloudLoggingDetails: z.object({
          cloudLoggingSeverity: z.unknown(),
          enableCloudLogging: z.unknown(),
        }),
        createTime: z.string(),
        createdFromTemplate: z.string(),
        databasePersistencePolicy: z.string(),
        description: z.string(),
        enableVariableMasking: z.boolean(),
        errorCatcherConfigs: z.array(z.unknown()),
        integrationConfigParameters: z.array(z.unknown()),
        integrationParameters: z.array(z.unknown()),
        integrationParametersInternal: z.object({
          parameters: z.unknown(),
        }),
        lastModifierEmail: z.string(),
        lockHolder: z.string(),
        name: z.string(),
        origin: z.string(),
        parentTemplateId: z.string(),
        runAsServiceAccount: z.string(),
        snapshotNumber: z.string(),
        state: z.string(),
        status: z.string(),
        taskConfigs: z.array(z.unknown()),
        taskConfigsInternal: z.array(z.unknown()),
        teardown: z.object({
          teardownTaskConfigs: z.unknown(),
        }),
        triggerConfigs: z.array(z.unknown()),
        triggerConfigsInternal: z.array(z.unknown()),
        updateTime: z.string(),
        userLabel: z.string(),
      }),
      key: z.string(),
    })),
  }).optional(),
  updateTime: z.string().optional(),
  usageCount: z.string().optional(),
  usageInfo: z.string().optional(),
  visibility: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  author: z.string().describe("Optional. Creator of the template.").optional(),
  categories: z.array(
    z.enum([
      "CATEGORY_UNSPECIFIED",
      "AI_MACHINE_LEARNING",
      "BUSINESS_INTELLIGENCE",
      "COLLABORATION",
      "CUSTOMER_SERVICE",
      "DATABASES",
      "DEVOPS_IT",
      "CONTENT_AND_FILES",
      "FINANCE_AND_ACCOUNTING",
      "HUMAN_RESOURCES",
      "OPERATIONS",
      "PRODUCT_PROJECT_MANAGEMENT",
      "PRODUCTIVITY",
      "SALES_AND_MARKETING",
      "UNIVERSAL_CONNECTORS",
      "UTILITY",
      "OTHERS",
    ]),
  ).describe(
    "Required. Categories associated with the Template. The categories listed below will be utilized for the Template listing.",
  ).optional(),
  components: z.array(z.object({
    name: z.string().describe("Optional. Name of the component.").optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "TRIGGER", "TASK", "CONNECTOR"]).describe(
      "Optional. Type of the component.",
    ).optional(),
  })).describe(
    "Optional. Components being used in the template. This could be used to categorize and filter.",
  ).optional(),
  description: z.string().describe(
    "Optional. Description of the template. The length should not be more than 255 characters",
  ).optional(),
  displayName: z.string().describe("Required. The name of the template")
    .optional(),
  docLink: z.string().describe("Optional. Link to template documentation.")
    .optional(),
  lastUsedTime: z.string().describe(
    "Optional. Time the template was last used.",
  ).optional(),
  name: z.string().describe("Identifier. Resource name of the template.")
    .optional(),
  sharedWith: z.array(z.string()).describe(
    "Required. Resource names with which the template is shared for example ProjectNumber/Ord id",
  ).optional(),
  tags: z.array(z.string()).describe(
    "Required. Tags which are used to identify templates. These tags could be for business use case, connectors etc.",
  ).optional(),
  templateBundle: z.object({
    integrationVersionTemplate: z.object({
      integrationVersion: z.object({
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
        }).describe(
          "Optional. Cloud Logging details for the integration version",
        ).optional(),
        createTime: z.string().describe("Output only. Auto-generated.")
          .optional(),
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
        description: z.string().describe(
          "Optional. The integration description.",
        ).optional(),
        enableVariableMasking: z.boolean().describe(
          "Optional. True if variable masking feature should be turned on for this version",
        ).optional(),
        errorCatcherConfigs: z.array(z.object({
          description: z.unknown().describe(
            "Optional. User-provided description intended to give more business context about the error catcher config.",
          ).optional(),
          errorCatcherId: z.unknown().describe(
            "Required. An error catcher id is string representation for the error catcher config. Within a workflow, error_catcher_id uniquely identifies an error catcher config among all error catcher configs for the workflow",
          ).optional(),
          errorCatcherNumber: z.unknown().describe(
            "Required. A number to uniquely identify each error catcher config within the workflow on UI.",
          ).optional(),
          label: z.unknown().describe(
            "Optional. The user created label for a particular error catcher. Optional.",
          ).optional(),
          position: z.unknown().describe(
            "Optional. Informs the front-end application where to draw this error catcher config on the UI.",
          ).optional(),
          startErrorTasks: z.unknown().describe(
            "Required. The set of start tasks that are to be executed for the error catch flow",
          ).optional(),
        })).describe(
          "Optional. Error Catch Task configuration for the integration. It's optional.",
        ).optional(),
        integrationConfigParameters: z.array(z.object({
          parameter: z.unknown().describe(
            "Optional. Integration Parameter to provide the default value, data type and attributes required for the Integration config variables.",
          ).optional(),
          value: z.unknown().describe(
            "Values for the defined keys. Each value can either be string, int, double or any proto message or a serialized object.",
          ).optional(),
        })).describe(
          "Optional. Config Parameters that are expected to be passed to the integration when an integration is published. This consists of all the parameters that are expected to provide configuration in the integration execution. This gives the user the ability to provide default values, value, add information like connection url, project based configuration value and also provide data types of each parameter.",
        ).optional(),
        integrationParameters: z.array(z.object({
          containsLargeData: z.unknown().describe(
            "Indicates whether this variable contains large data and need to be uploaded to Cloud Storage.",
          ).optional(),
          dataType: z.unknown().describe("Type of the parameter.").optional(),
          defaultValue: z.unknown().describe(
            "Default values for the defined keys. Each value can either be string, int, double or any proto message or a serialized object.",
          ).optional(),
          description: z.unknown().describe(
            "Optional. Description of the parameter.",
          ).optional(),
          displayName: z.unknown().describe(
            'The name (without prefix) to be displayed in the UI for this parameter. E.g. if the key is "foo.bar.myName", then the name would be "myName".',
          ).optional(),
          inputOutputType: z.unknown().describe(
            "Specifies the input/output type for the parameter.",
          ).optional(),
          isTransient: z.unknown().describe(
            "Whether this parameter is a transient parameter.",
          ).optional(),
          jsonSchema: z.unknown().describe(
            "This schema will be used to validate runtime JSON-typed values of this parameter.",
          ).optional(),
          key: z.unknown().describe(
            "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
          ).optional(),
          masked: z.unknown().describe(
            "True if this parameter should be masked in the logs",
          ).optional(),
          producer: z.unknown().describe(
            "The identifier of the node (TaskConfig/TriggerConfig) this parameter was produced by, if it is a transient param or a copy of an input param.",
          ).optional(),
          searchable: z.unknown().describe(
            "Searchable in the execution log or not.",
          ).optional(),
        })).describe(
          "Optional. Parameters that are expected to be passed to the integration when an event is triggered. This consists of all the parameters that are expected in the integration execution. This gives the user the ability to provide default values, add information like PII and also provide data types of each parameter.",
        ).optional(),
        integrationParametersInternal: z.object({
          parameters: z.array(z.unknown()).describe(
            "Parameters are a part of Event and can be used to communiticate between different tasks that are part of the same workflow execution.",
          ).optional(),
        }).describe(
          "Optional. Deprecated: Use `integration_parameters` instead. Parameters that are expected to be passed to the integration when an event is triggered. This consists of all the parameters that are expected in the integration execution. This gives the user the ability to provide default values, add information like PII and also provide data types of each parameter.",
        ).optional(),
        lastModifierEmail: z.string().describe(
          "Optional. The last modifier's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
        ).optional(),
        lockHolder: z.string().describe(
          "Optional. The edit lock holder's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
        ).optional(),
        name: z.string().describe("Output only. Auto-generated primary key.")
          .optional(),
        origin: z.enum([
          "UNSPECIFIED",
          "UI",
          "PIPER_V2",
          "PIPER_V3",
          "APPLICATION_IP_PROVISIONING",
          "TEST_CASE",
        ]).describe(
          "Optional. The origin that indicates where this integration is coming from.",
        ).optional(),
        parentTemplateId: z.string().describe(
          "Optional. The id of the template which was used to create this integration_version.",
        ).optional(),
        runAsServiceAccount: z.string().describe(
          "Optional. The run-as service account email, if set and auth config is not configured, that will be used to generate auth token to be used in Connector task, Rest caller task and Cloud function task.",
        ).optional(),
        snapshotNumber: z.string().describe(
          'Output only. An increasing sequence that is set when a new snapshot is created. The last created snapshot can be identified by [workflow_name, org_id latest(snapshot_number)]. However, last created snapshot need not be same as the HEAD. So users should always use "HEAD" tag to identify the head.',
        ).optional(),
        state: z.enum([
          "INTEGRATION_STATE_UNSPECIFIED",
          "DRAFT",
          "ACTIVE",
          "ARCHIVED",
          "SNAPSHOT",
        ]).describe("Output only. User should not set it as an input.")
          .optional(),
        status: z.enum(["UNKNOWN", "DRAFT", "ACTIVE", "ARCHIVED", "SNAPSHOT"])
          .describe(
            "Output only. Generated by eventbus. User should not set it as an input.",
          ).optional(),
        taskConfigs: z.array(z.object({
          conditionalFailurePolicies: z.unknown().describe(
            "Optional. The list of conditional failure policies that will be applied to the task in order.",
          ).optional(),
          description: z.unknown().describe(
            "Optional. User-provided description intended to give additional business context about the task.",
          ).optional(),
          displayName: z.unknown().describe(
            "Optional. User-provided label that is attached to this TaskConfig in the UI.",
          ).optional(),
          errorCatcherId: z.unknown().describe(
            "Optional. Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task",
          ).optional(),
          externalTaskType: z.unknown().describe(
            "Optional. External task type of the task",
          ).optional(),
          failurePolicy: z.unknown().describe(
            "Optional. Determines the number of times the task will be retried on failure and with what retry strategy. This is applicable for asynchronous calls to Eventbus alone (Post To Queue, Schedule etc.).",
          ).optional(),
          jsonValidationOption: z.unknown().describe(
            "Optional. If set, overrides the option configured in the Task implementation class.",
          ).optional(),
          nextTasks: z.unknown().describe(
            "Optional. The set of tasks that are next in line to be executed as per the execution graph defined for the parent event, specified by `event_config_id`. Each of these next tasks are executed only if the condition associated with them evaluates to true.",
          ).optional(),
          nextTasksExecutionPolicy: z.unknown().describe(
            "Optional. The policy dictating the execution of the next set of tasks for the current task.",
          ).optional(),
          parameters: z.unknown().describe(
            "Optional. The customized parameters the user can pass to this task.",
          ).optional(),
          position: z.unknown().describe(
            "Optional. Informs the front-end application where to draw this error catcher config on the UI.",
          ).optional(),
          successPolicy: z.unknown().describe(
            "Optional. Determines what action to take upon successful task completion.",
          ).optional(),
          synchronousCallFailurePolicy: z.unknown().describe(
            "Optional. Determines the number of times the task will be retried on failure and with what retry strategy. This is applicable for synchronous calls to Eventbus alone (Post).",
          ).optional(),
          task: z.unknown().describe("Optional. The name for the task.")
            .optional(),
          taskExecutionStrategy: z.unknown().describe(
            "Optional. The policy dictating the execution strategy of this task.",
          ).optional(),
          taskId: z.unknown().describe(
            "Required. The identifier of this task within its parent event config, specified by the client. This should be unique among all the tasks belong to the same event config. We use this field as the identifier to find next tasks (via field `next_tasks.task_id`).",
          ).optional(),
          taskTemplate: z.unknown().describe(
            "Optional. Used to define task-template name if task is of type task-template",
          ).optional(),
        })).describe(
          "Optional. Task configuration for the integration. It's optional, but the integration doesn't do anything without task_configs.",
        ).optional(),
        taskConfigsInternal: z.array(z.object({
          alertConfigs: z.unknown().describe(
            "Alert configurations on error rate, warning rate, number of runs, durations, etc.",
          ).optional(),
          conditionalFailurePolicies: z.unknown().describe(
            "Optional. Determines the number of times the task will be retried on failure and with what retry strategy. This is applicable for synchronous calls to Eventbus alone (Post).",
          ).optional(),
          createTime: z.unknown().describe("Auto-generated.").optional(),
          creatorEmail: z.unknown().describe(
            "The creator's email address. Auto-generated from the user's email.",
          ).optional(),
          description: z.unknown().describe(
            "User-provided description intended to give more business context about the task.",
          ).optional(),
          disableStrictTypeValidation: z.unknown().describe(
            "If this config contains a TypedTask, allow validation to succeed if an input is read from the output of another TypedTask whose output type is declared as a superclass of the requested input type. For instance, if the previous task declares an output of type Message, any task with this flag enabled will pass validation when attempting to read any proto Message type from the resultant Event parameter.",
          ).optional(),
          errorCatcherId: z.unknown().describe(
            "Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task",
          ).optional(),
          externalTaskType: z.unknown().optional(),
          failurePolicy: z.unknown().describe(
            "Optional. Determines the number of times the task will be retried on failure and with what retry strategy. This is applicable for asynchronous calls to Eventbus alone (Post To Queue, Schedule etc.).",
          ).optional(),
          incomingEdgeCount: z.unknown().describe(
            "The number of edges leading into this TaskConfig.",
          ).optional(),
          jsonValidationOption: z.unknown().describe(
            "If set, overrides the option configured in the Task implementation class.",
          ).optional(),
          label: z.unknown().describe(
            "User-provided label that is attached to this TaskConfig in the UI.",
          ).optional(),
          lastModifiedTime: z.unknown().describe("Auto-generated.").optional(),
          nextTasks: z.unknown().describe(
            "The set of tasks that are next in line to be executed as per the execution graph defined for the parent event, specified by `event_config_id`. Each of these next tasks are executed only if the condition associated with them evaluates to true.",
          ).optional(),
          nextTasksExecutionPolicy: z.unknown().describe(
            "The policy dictating the execution of the next set of tasks for the current task.",
          ).optional(),
          parameters: z.unknown().describe(
            "The customized parameters the user can pass to this task.",
          ).optional(),
          position: z.unknown().describe(
            "Optional. Informs the front-end application where to draw this task config on the UI.",
          ).optional(),
          precondition: z.unknown().describe(
            'Optional. Standard filter expression evaluated before execution. Independent of other conditions and tasks. Can be used to enable rollout. e.g. "rollout(5)" will only allow 5% of incoming traffic to task.',
          ).optional(),
          preconditionLabel: z.unknown().describe(
            "Optional. User-provided label that is attached to precondition in the UI.",
          ).optional(),
          rollbackStrategy: z.unknown().describe(
            "Optional. Contains information about what needs to be done upon failure (either a permanent error or after it has been retried too many times).",
          ).optional(),
          successPolicy: z.unknown().describe(
            "Determines what action to take upon successful task completion.",
          ).optional(),
          synchronousCallFailurePolicy: z.unknown().describe(
            "Optional. Determines the number of times the task will be retried on failure and with what retry strategy. This is applicable for synchronous calls to Eventbus alone (Post).",
          ).optional(),
          taskEntity: z.unknown().describe(
            "Copy of the task entity that this task config is an instance of.",
          ).optional(),
          taskExecutionStrategy: z.unknown().describe(
            "The policy dictating the execution strategy of this task.",
          ).optional(),
          taskName: z.unknown().describe("The name for the task.").optional(),
          taskNumber: z.unknown().describe(
            "REQUIRED: the identifier of this task within its parent event config, specified by the client. This should be unique among all the tasks belong to the same event config. We use this field as the identifier to find next tasks (via field `next_tasks.task_number`).",
          ).optional(),
          taskSpec: z.unknown().describe(
            'A string template that allows user to configure task parameters (with either literal default values or tokens which will be resolved at execution time) for the task. It will eventually replace the old "parameters" field.',
          ).optional(),
          taskTemplateName: z.unknown().describe(
            "Used to define task-template name if task is of type task-template",
          ).optional(),
          taskType: z.unknown().describe("Defines the type of the task")
            .optional(),
        })).describe(
          "Optional. Deprecated: Use `task_configs` instead. Task configuration for the integration. It's optional, but the integration doesn't do anything without task_configs.",
        ).optional(),
        teardown: z.object({
          teardownTaskConfigs: z.array(z.unknown()).describe("Required.")
            .optional(),
        }).describe(
          'Optional. Contains a graph of tasks that will be executed before putting the event in a terminal state (SUCCEEDED/FAILED/FATAL), regardless of success or failure, similar to "finally" in code.',
        ).optional(),
        triggerConfigs: z.array(z.object({
          alertConfig: z.unknown().describe(
            "Optional. An alert threshold configuration for the [trigger + client + integration] tuple. If these values are not specified in the trigger config, default values will be populated by the system. Note that there must be exactly one alert threshold configured per [client + trigger + integration] when published.",
          ).optional(),
          cloudSchedulerConfig: z.unknown().describe(
            "Optional. Cloud Scheduler Trigger related metadata",
          ).optional(),
          description: z.unknown().describe(
            "Optional. User-provided description intended to give additional business context about the task.",
          ).optional(),
          errorCatcherId: z.unknown().describe(
            "Optional. Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task",
          ).optional(),
          inputVariables: z.unknown().describe(
            "Optional. List of input variables for the api trigger.",
          ).optional(),
          label: z.unknown().describe(
            "Optional. The user created label for a particular trigger.",
          ).optional(),
          nextTasksExecutionPolicy: z.unknown().describe(
            "Optional. Dictates how next tasks will be executed.",
          ).optional(),
          outputVariables: z.unknown().describe(
            "Optional. List of output variables for the api trigger.",
          ).optional(),
          position: z.unknown().describe(
            "Optional. Informs the front-end application where to draw this error catcher config on the UI.",
          ).optional(),
          properties: z.unknown().describe(
            'Optional. Configurable properties of the trigger, not to be confused with integration parameters. E.g. "name" is a property for API triggers and "subscription" is a property for Pub/sub triggers.',
          ).optional(),
          startTasks: z.unknown().describe(
            "Optional. Set of tasks numbers from where the integration execution is started by this trigger. If this is empty, then integration is executed with default start tasks. In the list of start tasks, none of two tasks can have direct ancestor-descendant relationships (i.e. in a same integration execution graph).",
          ).optional(),
          trigger: z.unknown().describe(
            'Optional. Name of the trigger. Example: "API Trigger", "Cloud Pub Sub Trigger" When set will be sent out to monitoring dashabord for tracking purpose.',
          ).optional(),
          triggerId: z.unknown().describe(
            'Optional. Auto-generated trigger ID. The ID is based on the properties that you define in the trigger config. For example, for an API trigger, the trigger ID follows the format: api_trigger/TRIGGER_NAME Where trigger config has properties with value {"Trigger name": TRIGGER_NAME}',
          ).optional(),
          triggerNumber: z.unknown().describe(
            "Required. A number to uniquely identify each trigger config within the integration on UI.",
          ).optional(),
          triggerType: z.unknown().describe("Optional. Type of trigger")
            .optional(),
        })).describe("Optional. Trigger configurations.").optional(),
        triggerConfigsInternal: z.array(z.object({
          alertConfig: z.unknown().describe(
            "An alert threshold configuration for the [trigger + client + workflow] tuple. If these values are not specified in the trigger config, default values will be populated by the system. Note that there must be exactly one alert threshold configured per [client + trigger + workflow] when published.",
          ).optional(),
          cloudSchedulerConfig: z.unknown().describe(
            "Cloud Scheduler Trigger configuration",
          ).optional(),
          description: z.unknown().describe(
            "User-provided description intended to give more business context about the task.",
          ).optional(),
          enabledClients: z.unknown().describe(
            "Required. The list of client ids which are enabled to execute the workflow using this trigger. In other words, these clients have the workflow execution privledges for this trigger. For API trigger, the client id in the incoming request is validated against the list of enabled clients. For non-API triggers, one workflow execution is triggered on behalf of each enabled client.",
          ).optional(),
          errorCatcherId: z.unknown().describe(
            "Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task",
          ).optional(),
          inputVariables: z.unknown().describe(
            "Optional. List of input variables for the api trigger.",
          ).optional(),
          label: z.unknown().describe(
            "The user created label for a particular trigger.",
          ).optional(),
          nextTasksExecutionPolicy: z.unknown().describe(
            "Dictates how next tasks will be executed.",
          ).optional(),
          outputVariables: z.unknown().describe(
            "Optional. List of output variables for the api trigger.",
          ).optional(),
          pauseWorkflowExecutions: z.unknown().describe(
            "Optional. If set to true, any upcoming requests for this trigger config will be paused and the executions will be resumed later when the flag is reset. The workflow to which this trigger config belongs has to be in ACTIVE status for the executions to be paused or resumed.",
          ).optional(),
          position: z.unknown().describe(
            "Optional. Informs the front-end application where to draw this trigger config on the UI.",
          ).optional(),
          properties: z.unknown().describe(
            'Configurable properties of the trigger, not to be confused with workflow parameters. E.g. "name" is a property for API triggers and "subscription" is a property for Cloud Pubsub triggers.',
          ).optional(),
          startTasks: z.unknown().describe(
            "Set of tasks numbers from where the workflow execution is started by this trigger. If this is empty, then workflow is executed with default start tasks. In the list of start tasks, none of two tasks can have direct ancestor-descendant relationships (i.e. in a same workflow execution graph).",
          ).optional(),
          triggerCriteria: z.unknown().describe(
            "Optional. When set, Eventbus will run the task specified in the trigger_criteria and validate the result using the trigger_criteria.condition, and only execute the workflow when result is true.",
          ).optional(),
          triggerId: z.unknown().describe("The backend trigger ID.").optional(),
          triggerName: z.unknown().describe(
            "Optional. Name of the trigger This is added to identify the type of trigger. This is avoid the logic on triggerId to identify the trigger_type and push the same to monitoring.",
          ).optional(),
          triggerNumber: z.unknown().describe(
            "Required. A number to uniquely identify each trigger config within the workflow on UI.",
          ).optional(),
          triggerType: z.unknown().optional(),
        })).describe(
          "Optional. Deprecated: Use `trigger_configs` instead. Trigger configurations.",
        ).optional(),
        updateTime: z.string().describe("Output only. Auto-generated.")
          .optional(),
        userLabel: z.string().describe(
          "Optional. A user-defined label that annotates an integration version. Typically, this is only set when the integration version is created.",
        ).optional(),
      }).describe("Required. Templatized version of integration.").optional(),
      key: z.string().describe(
        "Required. Unique Key of the IntegrationVersion.",
      ).optional(),
    }).describe("Required. Main integration templates of the template bundle.")
      .optional(),
    subIntegrationVersionTemplates: z.array(z.object({
      integrationVersion: z.object({
        cloudKmsKey: z.string().describe(
          "Optional. Cloud KMS resource name for the CMEK encryption key.",
        ).optional(),
        cloudLoggingDetails: z.object({
          cloudLoggingSeverity: z.unknown().describe(
            "Optional. Severity selected by the customer for the logs to be sent to Cloud Logging, for the integration version getting executed.",
          ).optional(),
          enableCloudLogging: z.unknown().describe(
            "Optional. Status of whether Cloud Logging is enabled or not for the integration version getting executed.",
          ).optional(),
        }).describe(
          "Optional. Cloud Logging details for the integration version",
        ).optional(),
        createTime: z.string().describe("Output only. Auto-generated.")
          .optional(),
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
        description: z.string().describe(
          "Optional. The integration description.",
        ).optional(),
        enableVariableMasking: z.boolean().describe(
          "Optional. True if variable masking feature should be turned on for this version",
        ).optional(),
        errorCatcherConfigs: z.array(z.unknown()).describe(
          "Optional. Error Catch Task configuration for the integration. It's optional.",
        ).optional(),
        integrationConfigParameters: z.array(z.unknown()).describe(
          "Optional. Config Parameters that are expected to be passed to the integration when an integration is published. This consists of all the parameters that are expected to provide configuration in the integration execution. This gives the user the ability to provide default values, value, add information like connection url, project based configuration value and also provide data types of each parameter.",
        ).optional(),
        integrationParameters: z.array(z.unknown()).describe(
          "Optional. Parameters that are expected to be passed to the integration when an event is triggered. This consists of all the parameters that are expected in the integration execution. This gives the user the ability to provide default values, add information like PII and also provide data types of each parameter.",
        ).optional(),
        integrationParametersInternal: z.object({
          parameters: z.unknown().describe(
            "Parameters are a part of Event and can be used to communiticate between different tasks that are part of the same workflow execution.",
          ).optional(),
        }).describe(
          "Optional. Deprecated: Use `integration_parameters` instead. Parameters that are expected to be passed to the integration when an event is triggered. This consists of all the parameters that are expected in the integration execution. This gives the user the ability to provide default values, add information like PII and also provide data types of each parameter.",
        ).optional(),
        lastModifierEmail: z.string().describe(
          "Optional. The last modifier's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
        ).optional(),
        lockHolder: z.string().describe(
          "Optional. The edit lock holder's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
        ).optional(),
        name: z.string().describe("Output only. Auto-generated primary key.")
          .optional(),
        origin: z.enum([
          "UNSPECIFIED",
          "UI",
          "PIPER_V2",
          "PIPER_V3",
          "APPLICATION_IP_PROVISIONING",
          "TEST_CASE",
        ]).describe(
          "Optional. The origin that indicates where this integration is coming from.",
        ).optional(),
        parentTemplateId: z.string().describe(
          "Optional. The id of the template which was used to create this integration_version.",
        ).optional(),
        runAsServiceAccount: z.string().describe(
          "Optional. The run-as service account email, if set and auth config is not configured, that will be used to generate auth token to be used in Connector task, Rest caller task and Cloud function task.",
        ).optional(),
        snapshotNumber: z.string().describe(
          'Output only. An increasing sequence that is set when a new snapshot is created. The last created snapshot can be identified by [workflow_name, org_id latest(snapshot_number)]. However, last created snapshot need not be same as the HEAD. So users should always use "HEAD" tag to identify the head.',
        ).optional(),
        state: z.enum([
          "INTEGRATION_STATE_UNSPECIFIED",
          "DRAFT",
          "ACTIVE",
          "ARCHIVED",
          "SNAPSHOT",
        ]).describe("Output only. User should not set it as an input.")
          .optional(),
        status: z.enum(["UNKNOWN", "DRAFT", "ACTIVE", "ARCHIVED", "SNAPSHOT"])
          .describe(
            "Output only. Generated by eventbus. User should not set it as an input.",
          ).optional(),
        taskConfigs: z.array(z.unknown()).describe(
          "Optional. Task configuration for the integration. It's optional, but the integration doesn't do anything without task_configs.",
        ).optional(),
        taskConfigsInternal: z.array(z.unknown()).describe(
          "Optional. Deprecated: Use `task_configs` instead. Task configuration for the integration. It's optional, but the integration doesn't do anything without task_configs.",
        ).optional(),
        teardown: z.object({
          teardownTaskConfigs: z.unknown().describe("Required.").optional(),
        }).describe(
          'Optional. Contains a graph of tasks that will be executed before putting the event in a terminal state (SUCCEEDED/FAILED/FATAL), regardless of success or failure, similar to "finally" in code.',
        ).optional(),
        triggerConfigs: z.array(z.unknown()).describe(
          "Optional. Trigger configurations.",
        ).optional(),
        triggerConfigsInternal: z.array(z.unknown()).describe(
          "Optional. Deprecated: Use `trigger_configs` instead. Trigger configurations.",
        ).optional(),
        updateTime: z.string().describe("Output only. Auto-generated.")
          .optional(),
        userLabel: z.string().describe(
          "Optional. A user-defined label that annotates an integration version. Typically, this is only set when the integration version is created.",
        ).optional(),
      }).describe("Required. Templatized version of integration.").optional(),
      key: z.string().describe(
        "Required. Unique Key of the IntegrationVersion.",
      ).optional(),
    })).describe(
      "Optional. Sub integration templates which would be added along with main integration.",
    ).optional(),
  }).describe(
    "Required. Bundle which is part of the templates. The template entities in the bundle would be converted to an actual entity.",
  ).optional(),
  usageCount: z.string().describe("Optional. Number of template usages.")
    .optional(),
  usageInfo: z.string().describe(
    "Optional. Information on how to use the template. This should contain detailed information about usage of the template.",
  ).optional(),
  visibility: z.enum(["VISIBILITY_UNSPECIFIED", "PRIVATE", "SHARED", "PUBLIC"])
    .describe("Required. Visibility of the template.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
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
      : undefined,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Application Integration Templates. Registered at `@swamp/gcp/integrations/templates`. */
export const model = {
  type: "@swamp/gcp/integrations/templates",
  version: "2026.10.01.1",
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
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
      description: "Added: accessToken, credentialsJson, project, scopes",
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
      toVersion: "2026.10.01.1",
      description: "Added: quotaProject, apiEndpoint",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Defines the template for Application Integration",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a templates",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["author"] !== undefined) body["author"] = g["author"];
        if (g["categories"] !== undefined) body["categories"] = g["categories"];
        if (g["components"] !== undefined) body["components"] = g["components"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["docLink"] !== undefined) body["docLink"] = g["docLink"];
        if (g["lastUsedTime"] !== undefined) {
          body["lastUsedTime"] = g["lastUsedTime"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["sharedWith"] !== undefined) body["sharedWith"] = g["sharedWith"];
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["templateBundle"] !== undefined) {
          body["templateBundle"] = g["templateBundle"];
        }
        if (g["usageCount"] !== undefined) body["usageCount"] = g["usageCount"];
        if (g["usageInfo"] !== undefined) body["usageInfo"] = g["usageInfo"];
        if (g["visibility"] !== undefined) body["visibility"] = g["visibility"];
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
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
          credentials,
        ) as StateData;
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
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
      description: "Get a templates",
      arguments: z.object({
        identifier: z.string().describe("The name of the templates"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((g.name ?? result.name)?.toString() ?? args.identifier).replace(
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
      description: "Update templates attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific templates by name (e.g. one discovered by list)",
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
        const existingName = existing["name"]?.toString();
        if (existingName && existingName.includes("/")) {
          params["name"] = existingName;
        } else {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["author"] !== undefined) body["author"] = g["author"];
        if (g["categories"] !== undefined) body["categories"] = g["categories"];
        if (g["components"] !== undefined) body["components"] = g["components"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["docLink"] !== undefined) body["docLink"] = g["docLink"];
        if (g["lastUsedTime"] !== undefined) {
          body["lastUsedTime"] = g["lastUsedTime"];
        }
        if (g["sharedWith"] !== undefined) body["sharedWith"] = g["sharedWith"];
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["templateBundle"] !== undefined) {
          body["templateBundle"] = g["templateBundle"];
        }
        if (g["usageCount"] !== undefined) body["usageCount"] = g["usageCount"];
        if (g["usageInfo"] !== undefined) body["usageInfo"] = g["usageInfo"];
        if (g["visibility"] !== undefined) body["visibility"] = g["visibility"];
        const updateMaskKeys = Object.keys(body);
        if (updateMaskKeys.length > 0) {
          params["updateMask"] = updateMaskKeys.join(",");
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
          baseUrl,
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
    delete: {
      description: "Delete the templates",
      arguments: z.object({
        identifier: z.string().describe("The name of the templates"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
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
      description: "Sync templates state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific templates by name (e.g. one discovered by list)",
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
          const existingName = existing.name?.toString();
          if (existingName && existingName.includes("/")) {
            params["name"] = existingName;
          } else {
            const shortName = existingName ?? g["name"]?.toString();
            if (!shortName) throw new Error("No identifier found");
            params["name"] = buildResourceName(
              `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
              shortName,
            );
          }
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
      description: "List templates resources",
      arguments: z.object({
        filter: z.string().describe(
          'Optional. Standard filter field to filter templates. client_id filter won\'t be supported and will restrict to templates belonging to the current client only. Return all templates of the current client if the filter is empty. Also supports operators like AND, OR, NOT For example, "status=\\"ACTIVE\\"',
        ).optional(),
        orderBy: z.string().describe(
          "Optional. The results would be returned in the order you specified here.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The size of the response entries. If unspecified, defaults to 100. The maximum value is 1000; values above 1000 will be coerced to 1000.",
        ).optional(),
        readMask: z.string().describe(
          "Optional. The mask which specifies fields that need to be returned in the template's response.",
        ).optional(),
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
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["readMask"] !== undefined) {
          params["readMask"] = String(args["readMask"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "templates",
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
    download: {
      description: "download",
      arguments: z.object({
        fileFormat: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        if (args["fileFormat"] !== undefined) {
          params["fileFormat"] = String(args["fileFormat"]);
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "integrations.projects.locations.templates.download",
            "path": "v1/{+name}:download",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "fileFormat": { "location": "query" },
              "name": { "location": "path", "required": true },
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
    import: {
      description: "import",
      arguments: z.object({
        integration: z.any().optional(),
        subIntegrations: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["integration"] !== undefined) {
          body["integration"] = args["integration"];
        }
        if (args["subIntegrations"] !== undefined) {
          body["subIntegrations"] = args["subIntegrations"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "integrations.projects.locations.templates.import",
            "path": "v1/{+name}:import",
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
    search: {
      description: "search",
      arguments: z.object({
        enableNaturalLanguageQueryUnderstanding: z.any().optional(),
        filter: z.any().optional(),
        orderBy: z.any().optional(),
        pageSize: z.any().optional(),
        pageToken: z.any().optional(),
        query: z.any().optional(),
        readMask: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["enableNaturalLanguageQueryUnderstanding"] !== undefined) {
          params["enableNaturalLanguageQueryUnderstanding"] = String(
            args["enableNaturalLanguageQueryUnderstanding"],
          );
        }
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["pageToken"] !== undefined) {
          params["pageToken"] = String(args["pageToken"]);
        }
        if (args["query"] !== undefined) {
          params["query"] = String(args["query"]);
        }
        if (args["readMask"] !== undefined) {
          params["readMask"] = String(args["readMask"]);
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "integrations.projects.locations.templates.search",
            "path": "v1/{+parent}/templates:search",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "enableNaturalLanguageQueryUnderstanding": {
                "location": "query",
              },
              "filter": { "location": "query" },
              "orderBy": { "location": "query" },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "parent": { "location": "path", "required": true },
              "query": { "location": "query" },
              "readMask": { "location": "query" },
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
    share: {
      description: "share",
      arguments: z.object({
        resourceNames: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["resourceNames"] !== undefined) {
          body["resourceNames"] = args["resourceNames"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "integrations.projects.locations.templates.share",
            "path": "v1/{+name}:share",
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
    unshare: {
      description: "unshare",
      arguments: z.object({
        resourceNames: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["resourceNames"] !== undefined) {
          body["resourceNames"] = args["resourceNames"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "integrations.projects.locations.templates.unshare",
            "path": "v1/{+name}:unshare",
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
    upload: {
      description: "upload",
      arguments: z.object({
        content: z.any().optional(),
        fileFormat: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          baseUrl,
          {
            "id": "integrations.projects.locations.templates.upload",
            "path": "v1/{+parent}/templates:upload",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
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
    use: {
      description: "use",
      arguments: z.object({
        integrationDetails: z.any().optional(),
        integrationRegion: z.any().optional(),
        subIntegrations: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["integrationDetails"] !== undefined) {
          body["integrationDetails"] = args["integrationDetails"];
        }
        if (args["integrationRegion"] !== undefined) {
          body["integrationRegion"] = args["integrationRegion"];
        }
        if (args["subIntegrations"] !== undefined) {
          body["subIntegrations"] = args["subIntegrations"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "integrations.projects.locations.templates.use",
            "path": "v1/{+name}:use",
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
  },
};
