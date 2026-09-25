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

// Auto-generated extension model for @swamp/gcp/firebasecrashlytics/apps-events
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Firebase Crashlytics Apps.Events.
 *
 * The message describing a single Crashlytics event. Related to BigQuery export schema, which can be found at [Export Crashlytics data to BigQuery](https://firebase.google.com/docs/crashlytics/bigquery-export#dataset-schema-crashlytics)
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://firebasecrashlytics.googleapis.com/";

const LIST_CONFIG = {
  "id": "firebasecrashlytics.projects.apps.events.list",
  "path": "v1alpha/{+parent}/events",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter.browser.displayNames": {
      "location": "query",
    },
    "filter.device.displayNames": {
      "location": "query",
    },
    "filter.device.formFactors": {
      "location": "query",
    },
    "filter.interval.endTime": {
      "location": "query",
    },
    "filter.interval.startTime": {
      "location": "query",
    },
    "filter.issue.content": {
      "location": "query",
    },
    "filter.issue.errorTypes": {
      "location": "query",
    },
    "filter.issue.id": {
      "location": "query",
    },
    "filter.issue.signals": {
      "location": "query",
    },
    "filter.issue.state": {
      "location": "query",
    },
    "filter.issue.states": {
      "location": "query",
    },
    "filter.issue.variantId": {
      "location": "query",
    },
    "filter.operatingSystem.displayNames": {
      "location": "query",
    },
    "filter.version.displayNames": {
      "location": "query",
    },
    "filterExpression": {
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
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  appOrientation: z.string().optional(),
  blameFrame: z.object({
    address: z.string(),
    blamed: z.boolean(),
    column: z.string(),
    file: z.string(),
    library: z.string(),
    line: z.string(),
    offset: z.string(),
    owner: z.string(),
    symbol: z.string(),
  }).optional(),
  breadcrumbs: z.array(z.object({
    eventTime: z.string(),
    params: z.record(z.string(), z.unknown()),
    title: z.string(),
  })).optional(),
  browser: z.object({
    browser: z.string(),
    displayName: z.string(),
    displayVersion: z.string(),
  }).optional(),
  buildStamp: z.string().optional(),
  bundleOrPackage: z.string().optional(),
  crashlyticsSdkVersion: z.string().optional(),
  customKeys: z.record(z.string(), z.unknown()).optional(),
  device: z.object({
    architecture: z.string(),
    companyName: z.string(),
    displayName: z.string(),
    formFactor: z.string(),
    manufacturer: z.string(),
    marketingName: z.string(),
    model: z.string(),
  }).optional(),
  deviceOrientation: z.string().optional(),
  errors: z.array(z.object({
    blamed: z.boolean(),
    code: z.string(),
    frames: z.array(z.object({
      address: z.string(),
      blamed: z.boolean(),
      column: z.string(),
      file: z.string(),
      library: z.string(),
      line: z.string(),
      offset: z.string(),
      owner: z.string(),
      symbol: z.string(),
    })),
    queue: z.string(),
    subtitle: z.string(),
    title: z.string(),
  })).optional(),
  eventId: z.string().optional(),
  eventTime: z.string().optional(),
  exceptions: z.array(z.object({
    blamed: z.boolean(),
    exceptionMessage: z.string(),
    frames: z.array(z.object({
      address: z.string(),
      blamed: z.boolean(),
      column: z.string(),
      file: z.string(),
      library: z.string(),
      line: z.string(),
      offset: z.string(),
      owner: z.string(),
      symbol: z.string(),
    })),
    nested: z.boolean(),
    subtitle: z.string(),
    title: z.string(),
    type: z.string(),
  })).optional(),
  installationUuid: z.string().optional(),
  issue: z.object({
    errorType: z.string(),
    firstSeenTime: z.string(),
    firstSeenVersion: z.string(),
    id: z.string(),
    lastSeenTime: z.string(),
    lastSeenVersion: z.string(),
    name: z.string(),
    notesCount: z.string(),
    sampleEvent: z.string(),
    signals: z.array(z.object({
      description: z.string(),
      signal: z.string(),
    })),
    state: z.string(),
    stateUpdateTime: z.string(),
    subtitle: z.string(),
    title: z.string(),
    uri: z.string(),
    variants: z.array(z.object({
      id: z.string(),
      sampleEvent: z.string(),
      uri: z.string(),
    })),
  }).optional(),
  issueSubtitle: z.string().optional(),
  issueTitle: z.string().optional(),
  issueVariant: z.object({
    id: z.string(),
    sampleEvent: z.string(),
    uri: z.string(),
  }).optional(),
  logs: z.array(z.object({
    logTime: z.string(),
    message: z.string(),
  })).optional(),
  memory: z.object({
    free: z.string(),
    used: z.string(),
  }).optional(),
  name: z.string(),
  operatingSystem: z.object({
    deviceType: z.string(),
    displayName: z.string(),
    displayVersion: z.string(),
    modificationState: z.string(),
    os: z.string(),
    type: z.string(),
  }).optional(),
  platform: z.string().optional(),
  processState: z.string().optional(),
  receivedTime: z.string().optional(),
  routePath: z.string().optional(),
  sessionId: z.string().optional(),
  storage: z.object({
    free: z.string(),
    used: z.string(),
  }).optional(),
  threads: z.array(z.object({
    blamed: z.boolean(),
    crashAddress: z.string(),
    crashed: z.boolean(),
    frames: z.array(z.object({
      address: z.string(),
      blamed: z.boolean(),
      column: z.string(),
      file: z.string(),
      library: z.string(),
      line: z.string(),
      offset: z.string(),
      owner: z.string(),
      symbol: z.string(),
    })),
    name: z.string(),
    queue: z.string(),
    signal: z.string(),
    signalCode: z.string(),
    subtitle: z.string(),
    sysThreadId: z.string(),
    threadId: z.string(),
    threadState: z.string(),
    title: z.string(),
  })).optional(),
  user: z.object({
    id: z.string(),
  }).optional(),
  version: z.object({
    buildVersion: z.string(),
    displayName: z.string(),
    displayVersion: z.string(),
    tracks: z.array(z.object({
      title: z.string(),
      type: z.string(),
    })),
  }).optional(),
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
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
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

/** Swamp extension model for Google Cloud Firebase Crashlytics Apps.Events. Registered at `@swamp/gcp/firebasecrashlytics/apps-events`. */
export const model = {
  type: "@swamp/gcp/firebasecrashlytics/apps-events",
  version: "2026.09.25.1",
  upgrades: [
    {
      toVersion: "2026.07.17.1",
      description: "Added: parent",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.2",
      description: "No schema changes",
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
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "The message describing a single Crashlytics event. Related to BigQuery export...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a events",
      arguments: z.object({
        identifier: z.string().describe("The name of the events"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await readViaList(
          baseUrl,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
    sync: {
      description: "Sync events state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific events by name (e.g. one discovered by list)",
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
          if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
          else if (existing["parent"]) {
            params["parent"] = String(existing["parent"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          const result = await readViaList(
            baseUrl,
            LIST_CONFIG,
            params,
            "name",
            identifier,
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
      description: "List events resources",
      arguments: z.object({
        filter_browser_displayNames: z.string().describe(
          'Optional. Only count events from the given browser. This string matches Browser.display_name. Format: "name (display_version)" e.g. "Chrome (123)", or just "name" for all possible versions, e.g. simply "Chrome".',
        ).optional(),
        filter_device_displayNames: z.string().describe(
          'Only counts events from the given Device model. This string matches Device.display_name. Format: "manufacturer (model)" e.g. "Google (Pixel 6)", or just "manufacturer" for all possible models, e.g. simply "Google". Note that a device\'s marketing_name field can not be used for filtering.',
        ).optional(),
        filter_device_formFactors: z.string().describe(
          "Only counts events from devices with the given form factor (e.g. phone or tablet).",
        ).optional(),
        filter_interval_endTime: z.string().describe(
          "Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end.",
        ).optional(),
        filter_interval_startTime: z.string().describe(
          "Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start.",
        ).optional(),
        filter_issue_content: z.string().describe(
          'Optional. A space separated list of filter terms matched against the contents of the issue. Contents include the title and the stack trace. Matches must begin at alphanumeric tokens, i.e., \'util.Sorted\' matches \'java.util.SortedSet\' but not \'myutil.SortedArray\'. The filter matches if all filter terms match. All non-alphanumeric characters are ignored for matching. Filtering is assumed to be prefix-search and order-independent unless phrases are surrounded by "". Any terms contained in quotes are searched using exact-match (given filter term "foo", we will not return "foobar"), and must appear in the order given exactly. To get order-dependence but prefix-search, use a * within the quotes ("abc foo*" will match "abc foobar", but not "foo abc" "abcd foobar", or "abc xyz foobar").',
        ).optional(),
        filter_issue_errorTypes: z.string().describe(
          "Optional. Only counts events of the given error types. This field matches [Issue.error_type].",
        ).optional(),
        filter_issue_id: z.string().describe(
          "Optional. Only counts events in the given issue ID. This field matches [Issue.id].",
        ).optional(),
        filter_issue_signals: z.string().describe(
          "Optional. Only returns issues currently marked with the given signals. This field matches [Issue.signals.signal].",
        ).optional(),
        filter_issue_states: z.string().describe(
          "Optional. Only includes events for issues with the given issue states. Only available for `topIssues` reports.",
        ).optional(),
        filter_issue_variantId: z.string().describe(
          "Optional. Only counts events for the given issue variant ID. This field matches [IssueVariant.id].",
        ).optional(),
        filter_operatingSystem_displayNames: z.string().describe(
          'Only counts events in the given operating system and version. This string matches OperatingSystem.display_name. Format: "osName (osVersion)" e.g. "Android (11)". or just "osName" for all versions, e.g. simply "iPadOS".',
        ).optional(),
        filter_version_displayNames: z.string().describe(
          'Only counts events in the given app version. This string matches Version.display_name. Format: "display_version (build_version)" e.g. "1.2.3 (456)".',
        ).optional(),
        filterExpression: z.string().describe(
          'Optional. Filters events by custom keys (https://firebase.google.com/docs/crashlytics/customize-crash-reports#add-keys). Supported forms: * Equality: `custom_keys.level = "vip"` or `custom_keys.level:"vip"` * Presence: `custom_keys.level:*` * OR across values of one key: `custom_keys.level = "vip" OR custom_keys.level = "enterprise"` * AND across different keys: `custom_keys.level = "vip" AND custom_keys.region = "us"` Keys are case-sensitive. Keys and values containing spaces must be double-quoted, for example `custom_keys."app state" = "background"`. OR across different keys, repeating a key within an AND, NOT, and comparators other than `=` and `:` are rejected with INVALID_ARGUMENT. Wildcards are not supported in values; use `custom_keys.:*` to match events that set a key to any value. Only supported for Android and iOS. This filter expression applies in addition to the `filter` field above. The syntax is a subset of AIP-160 (https://google.aip.dev/160).',
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of events per page. If omitted, defaults to 10.",
        ).optional(),
        readMask: z.string().describe(
          "Optional. The list of Event fields to include in the response. If omitted, the full event is returned.",
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["filter_browser_displayNames"] !== undefined) {
          params["filter.browser.displayNames"] = String(
            args["filter_browser_displayNames"],
          );
        }
        if (args["filter_device_displayNames"] !== undefined) {
          params["filter.device.displayNames"] = String(
            args["filter_device_displayNames"],
          );
        }
        if (args["filter_device_formFactors"] !== undefined) {
          params["filter.device.formFactors"] = String(
            args["filter_device_formFactors"],
          );
        }
        if (args["filter_interval_endTime"] !== undefined) {
          params["filter.interval.endTime"] = String(
            args["filter_interval_endTime"],
          );
        }
        if (args["filter_interval_startTime"] !== undefined) {
          params["filter.interval.startTime"] = String(
            args["filter_interval_startTime"],
          );
        }
        if (args["filter_issue_content"] !== undefined) {
          params["filter.issue.content"] = String(args["filter_issue_content"]);
        }
        if (args["filter_issue_errorTypes"] !== undefined) {
          params["filter.issue.errorTypes"] = String(
            args["filter_issue_errorTypes"],
          );
        }
        if (args["filter_issue_id"] !== undefined) {
          params["filter.issue.id"] = String(args["filter_issue_id"]);
        }
        if (args["filter_issue_signals"] !== undefined) {
          params["filter.issue.signals"] = String(args["filter_issue_signals"]);
        }
        if (args["filter_issue_states"] !== undefined) {
          params["filter.issue.states"] = String(args["filter_issue_states"]);
        }
        if (args["filter_issue_variantId"] !== undefined) {
          params["filter.issue.variantId"] = String(
            args["filter_issue_variantId"],
          );
        }
        if (args["filter_operatingSystem_displayNames"] !== undefined) {
          params["filter.operatingSystem.displayNames"] = String(
            args["filter_operatingSystem_displayNames"],
          );
        }
        if (args["filter_version_displayNames"] !== undefined) {
          params["filter.version.displayNames"] = String(
            args["filter_version_displayNames"],
          );
        }
        if (args["filterExpression"] !== undefined) {
          params["filterExpression"] = String(args["filterExpression"]);
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
          "events",
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
    batch_get: {
      description: "batch get",
      arguments: z.object({
        names: z.any().optional(),
        readMask: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["names"] !== undefined) {
          params["names"] = String(args["names"]);
        }
        if (args["readMask"] !== undefined) {
          params["readMask"] = String(args["readMask"]);
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "firebasecrashlytics.projects.apps.events.batchGet",
            "path": "v1alpha/{+parent}/events:batchGet",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "names": { "location": "query" },
              "parent": { "location": "path", "required": true },
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
  },
};
