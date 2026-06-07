// Auto-generated extension model for @swamp/gcp/admin/activities
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Admin SDK Activities.
 *
 * JSON template for the activity resource.
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

const BASE_URL = "https://admin.googleapis.com/";

const LIST_CONFIG = {
  "id": "reports.activities.list",
  "path":
    "admin/reports/v1/activity/users/{userKey}/applications/{applicationName}",
  "httpMethod": "GET",
  "parameterOrder": [
    "userKey",
    "applicationName",
  ],
  "parameters": {
    "actorIpAddress": {
      "location": "query",
    },
    "applicationInfoFilter": {
      "location": "query",
    },
    "applicationName": {
      "location": "path",
      "required": true,
    },
    "customerId": {
      "location": "query",
    },
    "endTime": {
      "location": "query",
    },
    "eventName": {
      "location": "query",
    },
    "filters": {
      "location": "query",
    },
    "groupIdFilter": {
      "location": "query",
    },
    "includeSensitiveData": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "networkInfoFilter": {
      "location": "query",
    },
    "orgUnitID": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "resourceDetailsFilter": {
      "location": "query",
    },
    "startTime": {
      "location": "query",
    },
    "statusFilter": {
      "location": "query",
    },
    "userKey": {
      "location": "path",
      "required": true,
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
});

const StateSchema = z.object({
  actor: z.object({
    applicationInfo: z.object({
      applicationName: z.string(),
      impersonation: z.boolean(),
      oauthClientId: z.string(),
    }),
    callerType: z.string(),
    email: z.string(),
    key: z.string(),
    profileId: z.string(),
  }).optional(),
  etag: z.string().optional(),
  events: z.array(z.object({
    name: z.string(),
    parameters: z.array(z.object({
      boolValue: z.boolean(),
      intValue: z.string(),
      messageValue: z.object({
        parameter: z.unknown(),
      }),
      multiIntValue: z.array(z.unknown()),
      multiMessageValue: z.array(z.unknown()),
      multiValue: z.array(z.unknown()),
      name: z.string(),
      value: z.string(),
    })),
    resourceIds: z.array(z.string()),
    sensitiveParameters: z.array(z.object({
      boolValue: z.boolean(),
      intValue: z.string(),
      messageValue: z.object({
        parameter: z.unknown(),
      }),
      multiIntValue: z.array(z.unknown()),
      multiMessageValue: z.array(z.unknown()),
      multiValue: z.array(z.unknown()),
      name: z.string(),
      value: z.string(),
    })),
    status: z.object({
      errorCode: z.string(),
      errorMessage: z.string(),
      eventStatus: z.string(),
      httpStatusCode: z.number(),
    }),
    type: z.string(),
  })).optional(),
  id: z.object({
    applicationName: z.string(),
    customerId: z.string(),
    time: z.string(),
    uniqueQualifier: z.string(),
  }).optional(),
  ipAddress: z.string().optional(),
  kind: z.string().optional(),
  networkInfo: z.object({
    ipAsn: z.array(z.number()),
    regionCode: z.string(),
    subdivisionCode: z.string(),
  }).optional(),
  ownerDomain: z.string().optional(),
  resourceDetails: z.array(z.object({
    appliedLabels: z.array(z.object({
      fieldValues: z.array(z.unknown()),
      id: z.string(),
      reason: z.object({
        reasonType: z.unknown(),
      }),
      title: z.string(),
    })),
    id: z.string(),
    ownerDetails: z.object({
      ownerIdentity: z.array(z.object({
        customerIdentity: z.unknown(),
        groupIdentity: z.unknown(),
        userIdentity: z.unknown(),
      })),
      ownerType: z.string(),
    }),
    relation: z.string(),
    title: z.string(),
    type: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
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

/** Swamp extension model for Google Cloud Admin SDK Activities. Registered at `@swamp/gcp/admin/activities`. */
export const model = {
  type: "@swamp/gcp/admin/activities",
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
      description: "JSON template for the activity resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a activities",
      arguments: z.object({
        identifier: z.string().describe("The name of the activities"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["userKey"] !== undefined) {
          params["userKey"] = String(g["userKey"]);
        }
        if (g["applicationName"] !== undefined) {
          params["applicationName"] = String(g["applicationName"]);
        }
        const result = await readViaList(
          BASE_URL,
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
      description: "Sync activities state from GCP",
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
          if (g["userKey"] !== undefined) {
            params["userKey"] = String(g["userKey"]);
          } else if (existing["userKey"]) {
            params["userKey"] = String(existing["userKey"]);
          }
          if (g["applicationName"] !== undefined) {
            params["applicationName"] = String(g["applicationName"]);
          } else if (existing["applicationName"]) {
            params["applicationName"] = String(existing["applicationName"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          const result = await readViaList(
            BASE_URL,
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
      description: "List activities resources",
      arguments: z.object({
        actorIpAddress: z.string().describe(
          "The Internet Protocol (IP) Address of host where the event was performed. This is an additional way to filter a report's summary using the IP address of the user whose activity is being reported. This IP address may or may not reflect the user's physical location. For example, the IP address can be the user's proxy server's address or a virtual private network (VPN) address. This parameter supports both IPv4 and IPv6 address versions.",
        ).optional(),
        applicationInfoFilter: z.string().describe(
          'Optional. Used to filter on the `oAuthClientId` field present in [`ApplicationInfo`](#applicationinfo) message. **Usage** ``` GET...&applicationInfoFilter=oAuthClientId="clientId" GET...&applicationInfoFilter=oAuthClientId=%22clientId%22 ```',
        ).optional(),
        customerId: z.string().describe(
          "The unique ID of the customer to retrieve data for.",
        ).optional(),
        endTime: z.string().describe(
          "Sets the end of the range of time shown in the report. The date is in the RFC 3339 format, for example 2010-10-28T10:26:35.000Z. The default value is the approximate time of the API request. An API report has three basic time concepts: - *Date of the API's request for a report*: When the API created and retrieved the report. - *Report's start time*: The beginning of the timespan shown in the report. The `startTime` must be before the `endTime` (if specified) and the current time when the request is made, or the API returns an error. - *Report's end time*: The end of the timespan shown in the report. For example, the timespan of events summarized in a report can start in April and end in May. The report itself can be requested in August. If the `endTime` is not specified, the report returns all activities from the `startTime` until the current time or the most recent 180 days if the `startTime` is more than 180 days in the past. For Gmail requests, `startTime` and `endTime` must be provided and the difference must not be greater than 30 days.",
        ).optional(),
        eventName: z.string().describe(
          "The name of the event being queried by the API. Each `eventName` is related to a specific Google Workspace service or feature which the API organizes into types of events. An example is the Google Calendar events in the Admin console application's reports. The Calendar Settings `type` structure has all of the Calendar `eventName` activities reported by the API. When an administrator changes a Calendar setting, the API reports this activity in the Calendar Settings `type` and `eventName` parameters. For more information about `eventName` query strings and parameters, see the list of event names for various applications above in `applicationName`.",
        ).optional(),
        filters: z.string().describe(
          "The `filters` query string is a comma-separated list composed of event parameters manipulated by relational operators. Event parameters are in the form `{parameter1 name}{relational operator}{parameter1 value},{parameter2 name}{relational operator}{parameter2 value},...` These event parameters are associated with a specific `eventName`. An empty report is returned if the request's parameter doesn't belong to the `eventName`. For more information about the available `eventName` fields for each application and their associated parameters, go to the [ApplicationName](#applicationname) table, then click through to the Activity Events page in the Appendix for the application you want. In the following Drive activity examples, the returned list consists of all `edit` events where the `doc_id` parameter value matches the conditions defined by the relational operator. In the first example, the request returns all edited documents with a `doc_id` value equal to `12345`. In the second example, the report returns any edited documents where the `doc_id` value is not equal to `98765`. The `<>` operator is URL-encoded in the request's query string (`%3C%3E`): ``` GET...&eventName=edit&filters=doc_id==12345 GET...&eventName=edit&filters=doc_id%3C%3E98765 ``` A `filters` query supports these relational operators: * `==`—'equal to'. * `<>`—'not equal to'. Must be URL-encoded (%3C%3E). * `<`—'less than'. Must be URL-encoded (%3C). * `<=`—'less than or equal to'. Must be URL-encoded (%3C=). * `>`—'greater than'. Must be URL-encoded (%3E). * `>=`—'greater than or equal to'. Must be URL-encoded (%3E=). **Note:** The API doesn't accept multiple values of the same parameter. If a parameter is supplied more than once in the API request, the API only accepts the last value of that parameter. In addition, if an invalid parameter is supplied in the API request, the API ignores that parameter and returns the response corresponding to the remaining valid parameters. If no parameters are requested, all parameters are returned.",
        ).optional(),
        groupIdFilter: z.string().describe(
          'Comma separated group ids (obfuscated) on which user activities are filtered, i.e. the response will contain activities for only those users that are a part of at least one of the group ids mentioned here. Format: "id:abc123,id:xyz456" *Important:* To filter by groups, you must explicitly add the groups to your filtering groups allowlist. For more information about adding groups to filtering groups allowlist, see [Filter results by Google Group](https://support.google.com/a/answer/11482175)',
        ).optional(),
        includeSensitiveData: z.boolean().describe(
          "Optional. When set to `true`, this field allows sensitive user-generated content to be included in the returned audit logs. This parameter is supported only for Rules (DLP) and Chat applications; using it with any other application will result in a permission error.",
        ).optional(),
        maxResults: z.number().describe(
          "Determines how many activity records are shown on each response page. For example, if the request sets `maxResults=1` and the report has two activities, the report has two pages. The response's `nextPageToken` property has the token to the second page. The `maxResults` query string is optional in the request. The default value is 1000.",
        ).optional(),
        networkInfoFilter: z.string().describe(
          'Optional. Used to filter on the `regionCode` field present in [`NetworkInfo`](#networkinfo) message. **Usage** ``` GET...&networkInfoFilter=regionCode="IN" GET...&networkInfoFilter=regionCode=%22IN%22 ```',
        ).optional(),
        orgUnitID: z.string().describe(
          "ID of the organizational unit to report on. Activity records will be shown only for users who belong to the specified organizational unit. Data before Dec 17, 2018 doesn't appear in the filtered results.",
        ).optional(),
        resourceDetailsFilter: z.string().describe(
          'Optional. The `resourceDetailsFilter` query string is an AND separated list composed of [Resource Details](#resourcedetails) fields manipulated by relational operators. Resource Details Filters are in the form `{resourceDetails.field1}{relational operator}{field1 value} AND {resourceDetails.field2}{relational operator}{field2 value}...` All the inner fields are traversed using the `.` operator, as shown in the following example: ``` resourceDetails.id = "resourceId" AND resourceDetails.appliedLabels.id = "appliedLabelId" AND resourceDetails.appliedLabels.fieldValue.id = "fieldValueId" ``` `resourceDetailsFilter` query supports these relational operators: * `=`—\'equal to\'. * `!=`—\'not equal to\'. * `:`—\'exists\'. This is used for filtering on repeated fields. [`FieldValue`](#fieldvalue) types that are repeated in nature uses `exists` operator for filtering. The following [`FieldValue`](#fieldvalue) types are repeated: * [`TextListValue`](#textlistvalue) * [`SelectionListValue`](#selectionlistvalue) * [`UserListValue`](#userlistvalue) For example, in the following filter, [`SelectionListValue`](#selectionlistvalue), is a repeated field. The filter checks whether [`SelectionListValue`](#selectionlistvalue) contains `selection_id`: ``` resourceDetails.id = "resourceId" AND resourceDetails.appliedLabels.id = "appliedLabelId" AND resourceDetails.appliedLabels.fieldValue.id = "fieldValueId" AND resourceDetails.appliedLabels.fieldValue.type = "SELECTION_LIST_VALUE" AND resourceDetails.appliedLabels.fieldValue.selectionListValue.id: "id" ``` **Usage** ``` GET...&resourceDetailsFilter=resourceDetails.id = "resourceId" AND resourceDetails.appliedLabels.id = "appliedLabelId" GET...&resourceDetailsFilter=resourceDetails.id=%22resourceId%22%20AND%20resourceDetails.appliedLabels.id=%22appliedLabelId%22 ``` **Note the following**: * You must URL encode the query string before sending the request. * The API supports a maximum of 5 fields separated by the AND operator. - When filtering on deeper levels (e.g., [`AppliedLabel`](#appliedlabel), [`FieldValue`](#fieldvalue)), the IDs of all preceding levels in the hierarchy must be included in the filter. For example: Filtering on [`FieldValue`](#fieldvalue) requires [`AppliedLabel`](#appliedlabel) ID and resourceDetails ID to be present. *Sample Query*: ``` resourceDetails.id = "resourceId" AND resourceDetails.appliedLabels.id = "appliedLabelId" AND resourceDetails.appliedLabels.fieldValue.id = "fieldValueId" ``` * Filtering on inner [`FieldValue`](#fieldvalue) types like `longTextValue` and `textValue` requires `resourceDetails.appliedLabels.fieldValue.type` to be present. * Only Filtering on a single [`AppliedLabel`](#appliedlabel) id and [`FieldValue`](#fieldvalue) id is supported.',
        ).optional(),
        startTime: z.string().describe(
          "Sets the beginning of the range of time shown in the report. The date is in the RFC 3339 format, for example 2010-10-28T10:26:35.000Z. The report returns all activities from `startTime` until `endTime`. The `startTime` must be before the `endTime` (if specified) and the current time when the request is made, or the API returns an error. For Gmail requests, `startTime` and `endTime` must be provided and the difference must not be greater than 30 days.",
        ).optional(),
        statusFilter: z.string().describe(
          'Optional. Used to filter on the `statusCode` field present in [`Status`](#status) message. **Usage** ``` GET...&statusFilter=statusCode="200" GET...&statusFilter=statusCode=%22200%22 ```',
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
        if (g["userKey"] !== undefined) {
          params["userKey"] = String(g["userKey"]);
        }
        if (g["applicationName"] !== undefined) {
          params["applicationName"] = String(g["applicationName"]);
        }
        if (args["actorIpAddress"] !== undefined) {
          params["actorIpAddress"] = String(args["actorIpAddress"]);
        }
        if (args["applicationInfoFilter"] !== undefined) {
          params["applicationInfoFilter"] = String(
            args["applicationInfoFilter"],
          );
        }
        if (args["customerId"] !== undefined) {
          params["customerId"] = String(args["customerId"]);
        }
        if (args["endTime"] !== undefined) {
          params["endTime"] = String(args["endTime"]);
        }
        if (args["eventName"] !== undefined) {
          params["eventName"] = String(args["eventName"]);
        }
        if (args["filters"] !== undefined) {
          params["filters"] = String(args["filters"]);
        }
        if (args["groupIdFilter"] !== undefined) {
          params["groupIdFilter"] = String(args["groupIdFilter"]);
        }
        if (args["includeSensitiveData"] !== undefined) {
          params["includeSensitiveData"] = String(args["includeSensitiveData"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["networkInfoFilter"] !== undefined) {
          params["networkInfoFilter"] = String(args["networkInfoFilter"]);
        }
        if (args["orgUnitID"] !== undefined) {
          params["orgUnitID"] = String(args["orgUnitID"]);
        }
        if (args["resourceDetailsFilter"] !== undefined) {
          params["resourceDetailsFilter"] = String(
            args["resourceDetailsFilter"],
          );
        }
        if (args["startTime"] !== undefined) {
          params["startTime"] = String(args["startTime"]);
        }
        if (args["statusFilter"] !== undefined) {
          params["statusFilter"] = String(args["statusFilter"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "items",
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
    watch: {
      description: "watch",
      arguments: z.object({
        address: z.any().optional(),
        expiration: z.any().optional(),
        id: z.any().optional(),
        kind: z.any().optional(),
        params: z.any().optional(),
        payload: z.any().optional(),
        resourceId: z.any().optional(),
        resourceUri: z.any().optional(),
        token: z.any().optional(),
        type: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        params["userKey"] = existing["userKey"]?.toString() ??
          g["userKey"]?.toString() ?? "";
        params["applicationName"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["address"] !== undefined) body["address"] = args["address"];
        if (args["expiration"] !== undefined) {
          body["expiration"] = args["expiration"];
        }
        if (args["id"] !== undefined) body["id"] = args["id"];
        if (args["kind"] !== undefined) body["kind"] = args["kind"];
        if (args["params"] !== undefined) body["params"] = args["params"];
        if (args["payload"] !== undefined) body["payload"] = args["payload"];
        if (args["resourceId"] !== undefined) {
          body["resourceId"] = args["resourceId"];
        }
        if (args["resourceUri"] !== undefined) {
          body["resourceUri"] = args["resourceUri"];
        }
        if (args["token"] !== undefined) body["token"] = args["token"];
        if (args["type"] !== undefined) body["type"] = args["type"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "reports.activities.watch",
            "path":
              "admin/reports/v1/activity/users/{userKey}/applications/{applicationName}/watch",
            "httpMethod": "POST",
            "parameterOrder": ["userKey", "applicationName"],
            "parameters": {
              "actorIpAddress": { "location": "query" },
              "applicationName": { "location": "path", "required": true },
              "customerId": { "location": "query" },
              "endTime": { "location": "query" },
              "eventName": { "location": "query" },
              "filters": { "location": "query" },
              "groupIdFilter": { "location": "query" },
              "maxResults": { "location": "query" },
              "orgUnitID": { "location": "query" },
              "pageToken": { "location": "query" },
              "startTime": { "location": "query" },
              "userKey": { "location": "path", "required": true },
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
  },
};
