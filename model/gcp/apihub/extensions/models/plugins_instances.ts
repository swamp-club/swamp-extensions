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

// Auto-generated extension model for @swamp/gcp/apihub/plugins-instances
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud API hub Plugins.Instances.
 *
 * Represents a plugin instance resource in the API Hub. A PluginInstance is a specific instance of a hub plugin with its own configuration, state, and execution details.
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
  return `${parent}/instances/${shortName}`;
}

const BASE_URL = "https://apihub.googleapis.com/";

const GET_CONFIG = {
  "id": "apihub.projects.locations.plugins.instances.get",
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
  "id": "apihub.projects.locations.plugins.instances.create",
  "path": "v1/{+parent}/instances",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "pluginInstanceId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "apihub.projects.locations.plugins.instances.patch",
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
  "id": "apihub.projects.locations.plugins.instances.delete",
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
  "id": "apihub.projects.locations.plugins.instances.list",
  "path": "v1/{+parent}/instances",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  actions: z.array(z.object({
    actionId: z.string().describe(
      "Required. This should map to one of the action id specified in actions_config in the plugin.",
    ).optional(),
    curationConfig: z.object({
      curationType: z.enum([
        "CURATION_TYPE_UNSPECIFIED",
        "DEFAULT_CURATION_FOR_API_METADATA",
        "CUSTOM_CURATION_FOR_API_METADATA",
      ]).describe("Required. The curation type for this plugin instance.")
        .optional(),
      customCuration: z.object({
        curation: z.string().describe(
          "Required. The unique name of the curation resource. This will be the name of the curation resource in the format: `projects/{project}/locations/{location}/curations/{curation}`",
        ).optional(),
      }).describe("Custom curation information for this plugin instance.")
        .optional(),
    }).describe("The curation information for this plugin instance.")
      .optional(),
    hubInstanceAction: z.object({
      currentExecutionState: z.enum([
        "CURRENT_EXECUTION_STATE_UNSPECIFIED",
        "RUNNING",
        "NOT_RUNNING",
      ]).describe("Output only. The current state of the execution.")
        .optional(),
      lastExecution: z.object({
        endTime: z.string().describe(
          "Output only. The last execution end time of the plugin instance.",
        ).optional(),
        errorMessage: z.string().describe(
          "Output only. Error message describing the failure, if any, during the last execution.",
        ).optional(),
        result: z.enum(["RESULT_UNSPECIFIED", "SUCCEEDED", "FAILED"]).describe(
          "Output only. The result of the last execution of the plugin instance.",
        ).optional(),
        resultMetadata: z.string().describe(
          "Output only. The result metadata of the last execution of the plugin instance. This will be a string representation of a JSON object and will be available on successful execution.",
        ).optional(),
        startTime: z.string().describe(
          "Output only. The last execution start time of the plugin instance.",
        ).optional(),
      }).describe("The result of the last execution of the plugin instance.")
        .optional(),
    }).describe("The execution status for the plugin instance.").optional(),
    resourceConfig: z.object({
      actionType: z.enum([
        "ACTION_TYPE_UNSPECIFIED",
        "SYNC_METADATA",
        "SYNC_RUNTIME_DATA",
      ]).describe("Output only. The type of the action.").optional(),
      pubsubTopic: z.string().describe(
        "Output only. The pubsub topic to publish the data to. Format is projects/{project}/topics/{topic}",
      ).optional(),
    }).describe(
      "The configuration of resources created for a given plugin instance action.",
    ).optional(),
    scheduleCronExpression: z.string().describe(
      "Optional. The schedule for this plugin instance action. This can only be set if the plugin supports API_HUB_SCHEDULE_TRIGGER mode for this action.",
    ).optional(),
    scheduleTimeZone: z.string().describe(
      "Optional. The time zone for the schedule cron expression. If not provided, UTC will be used.",
    ).optional(),
    serviceAccount: z.string().describe(
      "Optional. The service account used to publish data. Note, the service account will only be accepted for non-Google Cloud plugins like OPDK.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "ENABLED",
      "DISABLED",
      "ENABLING",
      "DISABLING",
      "ERROR",
    ]).describe(
      "Output only. The current state of the plugin action in the plugin instance.",
    ).optional(),
  })).describe("Required. The action status for the plugin instance.")
    .optional(),
  additionalConfig: z.record(
    z.string(),
    z.object({
      boolValue: z.boolean().describe(
        "Optional. The config variable value in case of config variable of type boolean.",
      ).optional(),
      enumValue: z.object({
        description: z.string().describe("Optional. Description of the option.")
          .optional(),
        displayName: z.string().describe(
          "Required. Display name of the option.",
        ).optional(),
        id: z.string().describe("Required. Id of the option.").optional(),
      }).describe(
        "ConfigValueOption represents an option for a config variable of type enum or multi select.",
      ).optional(),
      intValue: z.string().describe(
        "Optional. The config variable value in case of config variable of type integer.",
      ).optional(),
      key: z.string().describe(
        "Output only. Key will be the id to uniquely identify the config variable.",
      ).optional(),
      multiIntValues: z.object({
        values: z.array(z.number().int()).describe(
          "Optional. The config variable value of data type multi int.",
        ).optional(),
      }).describe("The config variable value of data type multi int.")
        .optional(),
      multiSelectValues: z.object({
        values: z.array(z.object({
          description: z.unknown().describe(
            "Optional. Description of the option.",
          ).optional(),
          displayName: z.unknown().describe(
            "Required. Display name of the option.",
          ).optional(),
          id: z.unknown().describe("Required. Id of the option.").optional(),
        })).describe(
          "Optional. The config variable value of data type multi select.",
        ).optional(),
      }).describe("The config variable value of data type multi select.")
        .optional(),
      multiStringValues: z.object({
        values: z.array(z.string()).describe(
          "Optional. The config variable value of data type multi string.",
        ).optional(),
      }).describe("The config variable value of data type multi string.")
        .optional(),
      secretValue: z.object({
        secretVersion: z.string().describe(
          "Required. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Secret provides a reference to entries in Secret Manager.")
        .optional(),
      stringValue: z.string().describe(
        "Optional. The config variable value in case of config variable of type string.",
      ).optional(),
    }),
  ).describe(
    "Optional. The additional information for this plugin instance corresponding to the additional config template of the plugin. This information will be sent to plugin hosting service on each call to plugin hosted service. The key will be the config_variable_template.display_name to uniquely identify the config variable.",
  ).optional(),
  authConfig: z.object({
    apiKeyConfig: z.object({
      apiKey: z.object({
        secretVersion: z.string().describe(
          "Required. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Secret provides a reference to entries in Secret Manager.")
        .optional(),
      httpElementLocation: z.enum([
        "HTTP_ELEMENT_LOCATION_UNSPECIFIED",
        "QUERY",
        "HEADER",
        "PATH",
        "BODY",
        "COOKIE",
      ]).describe(
        "Required. The location of the API key. The default value is QUERY.",
      ).optional(),
      name: z.string().describe(
        'Required. The parameter name of the API key. E.g. If the API request is "https://example.com/act?api_key=", "api_key" would be the parameter name.',
      ).optional(),
    }).describe("Config for authentication with API key.").optional(),
    authType: z.enum([
      "AUTH_TYPE_UNSPECIFIED",
      "NO_AUTH",
      "GOOGLE_SERVICE_ACCOUNT",
      "USER_PASSWORD",
      "API_KEY",
      "OAUTH2_CLIENT_CREDENTIALS",
    ]).describe("Required. The authentication type.").optional(),
    googleServiceAccountConfig: z.object({
      serviceAccount: z.string().describe(
        "Required. The service account to be used for authenticating request. The `iam.serviceAccounts.getAccessToken` permission should be granted on this service account to the impersonator service account.",
      ).optional(),
    }).describe("Config for Google service account authentication.").optional(),
    oauth2ClientCredentialsConfig: z.object({
      clientId: z.string().describe("Required. The client identifier.")
        .optional(),
      clientSecret: z.object({
        secretVersion: z.string().describe(
          "Required. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Secret provides a reference to entries in Secret Manager.")
        .optional(),
    }).describe(
      "Parameters to support Oauth 2.0 client credentials grant authentication. See https://tools.ietf.org/html/rfc6749#section-1.3.4 for more details.",
    ).optional(),
    userPasswordConfig: z.object({
      password: z.object({
        secretVersion: z.string().describe(
          "Required. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Secret provides a reference to entries in Secret Manager.")
        .optional(),
      username: z.string().describe("Required. Username.").optional(),
    }).describe("Parameters to support Username and Password Authentication.")
      .optional(),
  }).describe("AuthConfig represents the authentication information.")
    .optional(),
  displayName: z.string().describe(
    "Required. The display name for this plugin instance. Max length is 255 characters.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The unique name of the plugin instance resource. Format: `projects/{project}/locations/{location}/plugins/{plugin}/instances/{instance}`",
  ).optional(),
  sourceEnvironmentsConfig: z.record(
    z.string(),
    z.object({
      createTime: z.string().describe(
        "Optional. The time at which the environment was created at the source.",
      ).optional(),
      sourceEnvironment: z.string().describe(
        "Required. The name of the environment at the source. This should map to Deployment.",
      ).optional(),
      sourceEnvironmentUri: z.string().describe(
        "The location where additional information about source environments can be found. The location should be relative path of the environment manifest with respect to a plugin instance.",
      ).optional(),
      updateTime: z.string().describe(
        "Optional. The time at which the environment was last updated at the source.",
      ).optional(),
    }),
  ).describe(
    "Optional. The source environment's config present in the gateway instance linked to the plugin instance. The key is the `source_environment` name from the SourceEnvironment message.",
  ).optional(),
  sourceProjectId: z.string().describe(
    "Optional. The source project id of the plugin instance. This will be the id of runtime project in case of Google Cloud based plugins and org id in case of non-Google Cloud based plugins. This field will be a required field for Google provided on-ramp plugins.",
  ).optional(),
  pluginInstanceId: z.string().describe(
    "Optional. The ID to use for the plugin instance, which will become the final component of the plugin instance's resource name. This field is optional. * If provided, the same will be used. The service will throw an error if the specified id is already used by another plugin instance in the plugin resource. * If not provided, a system generated id will be used. This value should be 4-63 characters, and valid characters are /a-z[0-9]-_/.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  actions: z.array(z.object({
    actionId: z.string(),
    curationConfig: z.object({
      curationType: z.string(),
      customCuration: z.object({
        curation: z.string(),
      }),
    }),
    hubInstanceAction: z.object({
      currentExecutionState: z.string(),
      lastExecution: z.object({
        endTime: z.string(),
        errorMessage: z.string(),
        result: z.string(),
        resultMetadata: z.string(),
        startTime: z.string(),
      }),
    }),
    resourceConfig: z.object({
      actionType: z.string(),
      pubsubTopic: z.string(),
    }),
    scheduleCronExpression: z.string(),
    scheduleTimeZone: z.string(),
    serviceAccount: z.string(),
    state: z.string(),
  })).optional(),
  additionalConfig: z.record(z.string(), z.unknown()).optional(),
  authConfig: z.object({
    apiKeyConfig: z.object({
      apiKey: z.object({
        secretVersion: z.string(),
      }),
      httpElementLocation: z.string(),
      name: z.string(),
    }),
    authType: z.string(),
    googleServiceAccountConfig: z.object({
      serviceAccount: z.string(),
    }),
    oauth2ClientCredentialsConfig: z.object({
      clientId: z.string(),
      clientSecret: z.object({
        secretVersion: z.string(),
      }),
    }),
    userPasswordConfig: z.object({
      password: z.object({
        secretVersion: z.string(),
      }),
      username: z.string(),
    }),
  }).optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  errorMessage: z.string().optional(),
  name: z.string(),
  sourceEnvironmentsConfig: z.record(z.string(), z.unknown()).optional(),
  sourceProjectId: z.string().optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  actions: z.array(z.object({
    actionId: z.string().describe(
      "Required. This should map to one of the action id specified in actions_config in the plugin.",
    ).optional(),
    curationConfig: z.object({
      curationType: z.enum([
        "CURATION_TYPE_UNSPECIFIED",
        "DEFAULT_CURATION_FOR_API_METADATA",
        "CUSTOM_CURATION_FOR_API_METADATA",
      ]).describe("Required. The curation type for this plugin instance.")
        .optional(),
      customCuration: z.object({
        curation: z.string().describe(
          "Required. The unique name of the curation resource. This will be the name of the curation resource in the format: `projects/{project}/locations/{location}/curations/{curation}`",
        ).optional(),
      }).describe("Custom curation information for this plugin instance.")
        .optional(),
    }).describe("The curation information for this plugin instance.")
      .optional(),
    hubInstanceAction: z.object({
      currentExecutionState: z.enum([
        "CURRENT_EXECUTION_STATE_UNSPECIFIED",
        "RUNNING",
        "NOT_RUNNING",
      ]).describe("Output only. The current state of the execution.")
        .optional(),
      lastExecution: z.object({
        endTime: z.string().describe(
          "Output only. The last execution end time of the plugin instance.",
        ).optional(),
        errorMessage: z.string().describe(
          "Output only. Error message describing the failure, if any, during the last execution.",
        ).optional(),
        result: z.enum(["RESULT_UNSPECIFIED", "SUCCEEDED", "FAILED"]).describe(
          "Output only. The result of the last execution of the plugin instance.",
        ).optional(),
        resultMetadata: z.string().describe(
          "Output only. The result metadata of the last execution of the plugin instance. This will be a string representation of a JSON object and will be available on successful execution.",
        ).optional(),
        startTime: z.string().describe(
          "Output only. The last execution start time of the plugin instance.",
        ).optional(),
      }).describe("The result of the last execution of the plugin instance.")
        .optional(),
    }).describe("The execution status for the plugin instance.").optional(),
    resourceConfig: z.object({
      actionType: z.enum([
        "ACTION_TYPE_UNSPECIFIED",
        "SYNC_METADATA",
        "SYNC_RUNTIME_DATA",
      ]).describe("Output only. The type of the action.").optional(),
      pubsubTopic: z.string().describe(
        "Output only. The pubsub topic to publish the data to. Format is projects/{project}/topics/{topic}",
      ).optional(),
    }).describe(
      "The configuration of resources created for a given plugin instance action.",
    ).optional(),
    scheduleCronExpression: z.string().describe(
      "Optional. The schedule for this plugin instance action. This can only be set if the plugin supports API_HUB_SCHEDULE_TRIGGER mode for this action.",
    ).optional(),
    scheduleTimeZone: z.string().describe(
      "Optional. The time zone for the schedule cron expression. If not provided, UTC will be used.",
    ).optional(),
    serviceAccount: z.string().describe(
      "Optional. The service account used to publish data. Note, the service account will only be accepted for non-Google Cloud plugins like OPDK.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "ENABLED",
      "DISABLED",
      "ENABLING",
      "DISABLING",
      "ERROR",
    ]).describe(
      "Output only. The current state of the plugin action in the plugin instance.",
    ).optional(),
  })).describe("Required. The action status for the plugin instance.")
    .optional(),
  additionalConfig: z.record(
    z.string(),
    z.object({
      boolValue: z.boolean().describe(
        "Optional. The config variable value in case of config variable of type boolean.",
      ).optional(),
      enumValue: z.object({
        description: z.string().describe("Optional. Description of the option.")
          .optional(),
        displayName: z.string().describe(
          "Required. Display name of the option.",
        ).optional(),
        id: z.string().describe("Required. Id of the option.").optional(),
      }).describe(
        "ConfigValueOption represents an option for a config variable of type enum or multi select.",
      ).optional(),
      intValue: z.string().describe(
        "Optional. The config variable value in case of config variable of type integer.",
      ).optional(),
      key: z.string().describe(
        "Output only. Key will be the id to uniquely identify the config variable.",
      ).optional(),
      multiIntValues: z.object({
        values: z.array(z.number().int()).describe(
          "Optional. The config variable value of data type multi int.",
        ).optional(),
      }).describe("The config variable value of data type multi int.")
        .optional(),
      multiSelectValues: z.object({
        values: z.array(z.object({
          description: z.unknown().describe(
            "Optional. Description of the option.",
          ).optional(),
          displayName: z.unknown().describe(
            "Required. Display name of the option.",
          ).optional(),
          id: z.unknown().describe("Required. Id of the option.").optional(),
        })).describe(
          "Optional. The config variable value of data type multi select.",
        ).optional(),
      }).describe("The config variable value of data type multi select.")
        .optional(),
      multiStringValues: z.object({
        values: z.array(z.string()).describe(
          "Optional. The config variable value of data type multi string.",
        ).optional(),
      }).describe("The config variable value of data type multi string.")
        .optional(),
      secretValue: z.object({
        secretVersion: z.string().describe(
          "Required. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Secret provides a reference to entries in Secret Manager.")
        .optional(),
      stringValue: z.string().describe(
        "Optional. The config variable value in case of config variable of type string.",
      ).optional(),
    }),
  ).describe(
    "Optional. The additional information for this plugin instance corresponding to the additional config template of the plugin. This information will be sent to plugin hosting service on each call to plugin hosted service. The key will be the config_variable_template.display_name to uniquely identify the config variable.",
  ).optional(),
  authConfig: z.object({
    apiKeyConfig: z.object({
      apiKey: z.object({
        secretVersion: z.string().describe(
          "Required. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Secret provides a reference to entries in Secret Manager.")
        .optional(),
      httpElementLocation: z.enum([
        "HTTP_ELEMENT_LOCATION_UNSPECIFIED",
        "QUERY",
        "HEADER",
        "PATH",
        "BODY",
        "COOKIE",
      ]).describe(
        "Required. The location of the API key. The default value is QUERY.",
      ).optional(),
      name: z.string().describe(
        'Required. The parameter name of the API key. E.g. If the API request is "https://example.com/act?api_key=", "api_key" would be the parameter name.',
      ).optional(),
    }).describe("Config for authentication with API key.").optional(),
    authType: z.enum([
      "AUTH_TYPE_UNSPECIFIED",
      "NO_AUTH",
      "GOOGLE_SERVICE_ACCOUNT",
      "USER_PASSWORD",
      "API_KEY",
      "OAUTH2_CLIENT_CREDENTIALS",
    ]).describe("Required. The authentication type.").optional(),
    googleServiceAccountConfig: z.object({
      serviceAccount: z.string().describe(
        "Required. The service account to be used for authenticating request. The `iam.serviceAccounts.getAccessToken` permission should be granted on this service account to the impersonator service account.",
      ).optional(),
    }).describe("Config for Google service account authentication.").optional(),
    oauth2ClientCredentialsConfig: z.object({
      clientId: z.string().describe("Required. The client identifier.")
        .optional(),
      clientSecret: z.object({
        secretVersion: z.string().describe(
          "Required. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Secret provides a reference to entries in Secret Manager.")
        .optional(),
    }).describe(
      "Parameters to support Oauth 2.0 client credentials grant authentication. See https://tools.ietf.org/html/rfc6749#section-1.3.4 for more details.",
    ).optional(),
    userPasswordConfig: z.object({
      password: z.object({
        secretVersion: z.string().describe(
          "Required. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Secret provides a reference to entries in Secret Manager.")
        .optional(),
      username: z.string().describe("Required. Username.").optional(),
    }).describe("Parameters to support Username and Password Authentication.")
      .optional(),
  }).describe("AuthConfig represents the authentication information.")
    .optional(),
  displayName: z.string().describe(
    "Required. The display name for this plugin instance. Max length is 255 characters.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The unique name of the plugin instance resource. Format: `projects/{project}/locations/{location}/plugins/{plugin}/instances/{instance}`",
  ).optional(),
  sourceEnvironmentsConfig: z.record(
    z.string(),
    z.object({
      createTime: z.string().describe(
        "Optional. The time at which the environment was created at the source.",
      ).optional(),
      sourceEnvironment: z.string().describe(
        "Required. The name of the environment at the source. This should map to Deployment.",
      ).optional(),
      sourceEnvironmentUri: z.string().describe(
        "The location where additional information about source environments can be found. The location should be relative path of the environment manifest with respect to a plugin instance.",
      ).optional(),
      updateTime: z.string().describe(
        "Optional. The time at which the environment was last updated at the source.",
      ).optional(),
    }),
  ).describe(
    "Optional. The source environment's config present in the gateway instance linked to the plugin instance. The key is the `source_environment` name from the SourceEnvironment message.",
  ).optional(),
  sourceProjectId: z.string().describe(
    "Optional. The source project id of the plugin instance. This will be the id of runtime project in case of Google Cloud based plugins and org id in case of non-Google Cloud based plugins. This field will be a required field for Google provided on-ramp plugins.",
  ).optional(),
  pluginInstanceId: z.string().describe(
    "Optional. The ID to use for the plugin instance, which will become the final component of the plugin instance's resource name. This field is optional. * If provided, the same will be used. The service will throw an error if the specified id is already used by another plugin instance in the plugin resource. * If not provided, a system generated id will be used. This value should be 4-63 characters, and valid characters are /a-z[0-9]-_/.",
  ).optional(),
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

/** Swamp extension model for Google Cloud API hub Plugins.Instances. Registered at `@swamp/gcp/apihub/plugins-instances`. */
export const model = {
  type: "@swamp/gcp/apihub/plugins-instances",
  version: "2026.06.08.1",
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
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a plugin instance resource in the API Hub. A PluginInstance is a s...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a instances",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["actions"] !== undefined) body["actions"] = g["actions"];
        if (g["additionalConfig"] !== undefined) {
          body["additionalConfig"] = g["additionalConfig"];
        }
        if (g["authConfig"] !== undefined) body["authConfig"] = g["authConfig"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["sourceEnvironmentsConfig"] !== undefined) {
          body["sourceEnvironmentsConfig"] = g["sourceEnvironmentsConfig"];
        }
        if (g["sourceProjectId"] !== undefined) {
          body["sourceProjectId"] = g["sourceProjectId"];
        }
        if (g["pluginInstanceId"] !== undefined) {
          body["pluginInstanceId"] = g["pluginInstanceId"];
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
              "readyValues": ["ACTIVE"],
              "failedValues": ["ERROR", "FAILED"],
            }
            : undefined,
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
      description: "Get a instances",
      arguments: z.object({
        identifier: z.string().describe("The name of the instances"),
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
    update: {
      description: "Update instances attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["actions"] !== undefined) body["actions"] = g["actions"];
        if (g["additionalConfig"] !== undefined) {
          body["additionalConfig"] = g["additionalConfig"];
        }
        if (g["authConfig"] !== undefined) body["authConfig"] = g["authConfig"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["sourceEnvironmentsConfig"] !== undefined) {
          body["sourceEnvironmentsConfig"] = g["sourceEnvironmentsConfig"];
        }
        if (g["sourceProjectId"] !== undefined) {
          body["sourceProjectId"] = g["sourceProjectId"];
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
              "readyValues": ["ACTIVE"],
              "failedValues": ["ERROR", "FAILED"],
            }
            : undefined,
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
      description: "Delete the instances",
      arguments: z.object({
        identifier: z.string().describe("The name of the instances"),
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
      description: "Sync instances state from GCP",
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
      description: "List instances resources",
      arguments: z.object({
        filter: z.string().describe(
          'Optional. An expression that filters the list of plugin instances. A filter expression consists of a field name, a comparison operator, and a value for filtering. The value must be a string. The comparison operator must be one of: `<`, `>` or `=`. Filters are not case sensitive. The following fields in the `PluginInstances` are eligible for filtering: * `state` - The state of the Plugin Instance. Allowed comparison operators: `=`. * `source_project_id` - The source project id of the Plugin Instance. Allowed comparison operators: `=`. A filter function is also supported in the filter string. The filter function is `id(name)`. The `id(name)` function returns the id of the resource name. For example, `id(name) = \\"plugin-instance-1\\"` is equivalent to `name = \\"projects/test-project-id/locations/test-location-id/plugins/plugin-1/instances/plugin-instance-1\\"` provided the parent is `projects/test-project-id/locations/test-location-id/plugins/plugin-1`. Expressions are combined with either `AND` logic operator or `OR` logical operator but not both of them together i.e. only one of the `AND` or `OR` operator can be used throughout the filter string and both the operators cannot be used together. No other logical operators are supported. At most three filter fields are allowed in the filter string and if provided more than that then `INVALID_ARGUMENT` error is returned by the API. Here are a few examples: * `state = ENABLED` - The plugin instance is in enabled state.',
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of hub plugins to return. The service may return fewer than this value. If unspecified, at most 50 hub plugins will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
        ).optional(),
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
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "pluginInstances",
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
    disable_action: {
      description: "disable action",
      arguments: z.object({
        actionId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        const body: Record<string, unknown> = {};
        if (args["actionId"] !== undefined) body["actionId"] = args["actionId"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "apihub.projects.locations.plugins.instances.disableAction",
            "path": "v1/{+name}:disableAction",
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
    enable_action: {
      description: "enable action",
      arguments: z.object({
        actionId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        const body: Record<string, unknown> = {};
        if (args["actionId"] !== undefined) body["actionId"] = args["actionId"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "apihub.projects.locations.plugins.instances.enableAction",
            "path": "v1/{+name}:enableAction",
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
    execute_action: {
      description: "execute action",
      arguments: z.object({
        actionExecutionDetail: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        const body: Record<string, unknown> = {};
        if (args["actionExecutionDetail"] !== undefined) {
          body["actionExecutionDetail"] = args["actionExecutionDetail"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "apihub.projects.locations.plugins.instances.executeAction",
            "path": "v1/{+name}:executeAction",
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
    manage_source_data: {
      description: "manage source data",
      arguments: z.object({
        action: z.any().optional(),
        data: z.any().optional(),
        dataType: z.any().optional(),
        relativePath: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        const body: Record<string, unknown> = {};
        if (args["action"] !== undefined) body["action"] = args["action"];
        if (args["data"] !== undefined) body["data"] = args["data"];
        if (args["dataType"] !== undefined) body["dataType"] = args["dataType"];
        if (args["relativePath"] !== undefined) {
          body["relativePath"] = args["relativePath"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "apihub.projects.locations.plugins.instances.manageSourceData",
            "path": "v1/{+name}:manageSourceData",
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
