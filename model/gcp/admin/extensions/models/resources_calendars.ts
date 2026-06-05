// Auto-generated extension model for @swamp/gcp/admin/resources-calendars
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Admin SDK Resources.Calendars.
 *
 * Public API: Resources.calendars
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

const BASE_URL = "https://admin.googleapis.com/";

const GET_CONFIG = {
  "id": "directory.resources.calendars.get",
  "path":
    "admin/directory/v1/customer/{customer}/resources/calendars/{calendarResourceId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "customer",
    "calendarResourceId",
  ],
  "parameters": {
    "calendarResourceId": {
      "location": "path",
      "required": true,
    },
    "customer": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "directory.resources.calendars.insert",
  "path": "admin/directory/v1/customer/{customer}/resources/calendars",
  "httpMethod": "POST",
  "parameterOrder": [
    "customer",
  ],
  "parameters": {
    "customer": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "directory.resources.calendars.update",
  "path":
    "admin/directory/v1/customer/{customer}/resources/calendars/{calendarResourceId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "customer",
    "calendarResourceId",
  ],
  "parameters": {
    "calendarResourceId": {
      "location": "path",
      "required": true,
    },
    "customer": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "directory.resources.calendars.delete",
  "path":
    "admin/directory/v1/customer/{customer}/resources/calendars/{calendarResourceId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "customer",
    "calendarResourceId",
  ],
  "parameters": {
    "calendarResourceId": {
      "location": "path",
      "required": true,
    },
    "customer": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "directory.resources.calendars.list",
  "path": "admin/directory/v1/customer/{customer}/resources/calendars",
  "httpMethod": "GET",
  "parameterOrder": [
    "customer",
  ],
  "parameters": {
    "customer": {
      "location": "path",
      "required": true,
    },
    "maxResults": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "query": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  buildingId: z.string().describe(
    "Unique ID for the building a resource is located in.",
  ).optional(),
  capacity: z.number().int().describe(
    "Capacity of a resource, number of seats in a room.",
  ).optional(),
  etags: z.string().describe("ETag of the resource.").optional(),
  featureInstances: z.string().describe(
    "Instances of features for the calendar resource.",
  ).optional(),
  floorName: z.string().describe("Name of the floor a resource is located on.")
    .optional(),
  floorSection: z.string().describe(
    "Name of the section within a floor a resource is located in.",
  ).optional(),
  generatedResourceName: z.string().describe(
    'The read-only auto-generated name of the calendar resource which includes metadata about the resource such as building name, floor, capacity, etc. For example, "NYC-2-Training Room 1A (16)".',
  ).optional(),
  resourceCategory: z.string().describe(
    "The category of the calendar resource. Either CONFERENCE_ROOM or OTHER. Legacy data is set to CATEGORY_UNKNOWN.",
  ).optional(),
  resourceDescription: z.string().describe(
    "Description of the resource, visible only to admins.",
  ).optional(),
  resourceEmail: z.string().describe(
    "The read-only email for the calendar resource. Generated as part of creating a new calendar resource.",
  ).optional(),
  resourceId: z.string().describe("The unique ID for the calendar resource."),
  resourceName: z.string().describe(
    'The name of the calendar resource. For example, "Training Room 1A".',
  ),
  resourceType: z.string().describe(
    "The type of the calendar resource, intended for non-room resources.",
  ).optional(),
  userVisibleDescription: z.string().describe(
    "Description of the resource, visible to users and admins.",
  ).optional(),
  customer: z.string().describe(
    "The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's customer ID.",
  ),
});

const StateSchema = z.object({
  buildingId: z.string().optional(),
  capacity: z.number().optional(),
  etags: z.string().optional(),
  featureInstances: z.string().optional(),
  floorName: z.string().optional(),
  floorSection: z.string().optional(),
  generatedResourceName: z.string().optional(),
  kind: z.string().optional(),
  resourceCategory: z.string().optional(),
  resourceDescription: z.string().optional(),
  resourceEmail: z.string().optional(),
  resourceId: z.string().optional(),
  resourceName: z.string().optional(),
  resourceType: z.string().optional(),
  userVisibleDescription: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  buildingId: z.string().describe(
    "Unique ID for the building a resource is located in.",
  ).optional(),
  capacity: z.number().int().describe(
    "Capacity of a resource, number of seats in a room.",
  ).optional(),
  etags: z.string().describe("ETag of the resource.").optional(),
  featureInstances: z.string().describe(
    "Instances of features for the calendar resource.",
  ).optional(),
  floorName: z.string().describe("Name of the floor a resource is located on.")
    .optional(),
  floorSection: z.string().describe(
    "Name of the section within a floor a resource is located in.",
  ).optional(),
  generatedResourceName: z.string().describe(
    'The read-only auto-generated name of the calendar resource which includes metadata about the resource such as building name, floor, capacity, etc. For example, "NYC-2-Training Room 1A (16)".',
  ).optional(),
  resourceCategory: z.string().describe(
    "The category of the calendar resource. Either CONFERENCE_ROOM or OTHER. Legacy data is set to CATEGORY_UNKNOWN.",
  ).optional(),
  resourceDescription: z.string().describe(
    "Description of the resource, visible only to admins.",
  ).optional(),
  resourceEmail: z.string().describe(
    "The read-only email for the calendar resource. Generated as part of creating a new calendar resource.",
  ).optional(),
  resourceId: z.string().describe("The unique ID for the calendar resource.")
    .optional(),
  resourceName: z.string().describe(
    'The name of the calendar resource. For example, "Training Room 1A".',
  ).optional(),
  resourceType: z.string().describe(
    "The type of the calendar resource, intended for non-room resources.",
  ).optional(),
  userVisibleDescription: z.string().describe(
    "Description of the resource, visible to users and admins.",
  ).optional(),
  customer: z.string().describe(
    "The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's customer ID.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Admin SDK Resources.Calendars. Registered at `@swamp/gcp/admin/resources-calendars`. */
export const model = {
  type: "@swamp/gcp/admin/resources-calendars",
  version: "2026.06.05.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Public API: Resources.calendars",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a calendars",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["customer"] !== undefined) {
          params["customer"] = String(g["customer"]);
        }
        const body: Record<string, unknown> = {};
        if (g["buildingId"] !== undefined) body["buildingId"] = g["buildingId"];
        if (g["capacity"] !== undefined) body["capacity"] = g["capacity"];
        if (g["etags"] !== undefined) body["etags"] = g["etags"];
        if (g["featureInstances"] !== undefined) {
          body["featureInstances"] = g["featureInstances"];
        }
        if (g["floorName"] !== undefined) body["floorName"] = g["floorName"];
        if (g["floorSection"] !== undefined) {
          body["floorSection"] = g["floorSection"];
        }
        if (g["generatedResourceName"] !== undefined) {
          body["generatedResourceName"] = g["generatedResourceName"];
        }
        if (g["resourceCategory"] !== undefined) {
          body["resourceCategory"] = g["resourceCategory"];
        }
        if (g["resourceDescription"] !== undefined) {
          body["resourceDescription"] = g["resourceDescription"];
        }
        if (g["resourceEmail"] !== undefined) {
          body["resourceEmail"] = g["resourceEmail"];
        }
        if (g["resourceId"] !== undefined) body["resourceId"] = g["resourceId"];
        if (g["resourceName"] !== undefined) {
          body["resourceName"] = g["resourceName"];
        }
        if (g["resourceType"] !== undefined) {
          body["resourceType"] = g["resourceType"];
        }
        if (g["userVisibleDescription"] !== undefined) {
          body["userVisibleDescription"] = g["userVisibleDescription"];
        }
        if (g["name"] !== undefined) {
          params["calendarResourceId"] = String(g["name"]);
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
            listParams: { "customer": String(g["customer"] ?? "") },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
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
      description: "Get a calendars",
      arguments: z.object({
        identifier: z.string().describe("The name of the calendars"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["customer"] !== undefined) {
          params["customer"] = String(g["customer"]);
        }
        params["calendarResourceId"] = args.identifier;
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
      description: "Update calendars attributes",
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
        if (g["customer"] !== undefined) {
          params["customer"] = String(g["customer"]);
        } else if (existing["customer"]) {
          params["customer"] = String(existing["customer"]);
        }
        params["calendarResourceId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["buildingId"] !== undefined) body["buildingId"] = g["buildingId"];
        if (g["capacity"] !== undefined) body["capacity"] = g["capacity"];
        if (g["etags"] !== undefined) body["etags"] = g["etags"];
        if (g["featureInstances"] !== undefined) {
          body["featureInstances"] = g["featureInstances"];
        }
        if (g["floorName"] !== undefined) body["floorName"] = g["floorName"];
        if (g["floorSection"] !== undefined) {
          body["floorSection"] = g["floorSection"];
        }
        if (g["generatedResourceName"] !== undefined) {
          body["generatedResourceName"] = g["generatedResourceName"];
        }
        if (g["resourceCategory"] !== undefined) {
          body["resourceCategory"] = g["resourceCategory"];
        }
        if (g["resourceDescription"] !== undefined) {
          body["resourceDescription"] = g["resourceDescription"];
        }
        if (g["resourceEmail"] !== undefined) {
          body["resourceEmail"] = g["resourceEmail"];
        }
        if (g["resourceId"] !== undefined) body["resourceId"] = g["resourceId"];
        if (g["resourceName"] !== undefined) {
          body["resourceName"] = g["resourceName"];
        }
        if (g["resourceType"] !== undefined) {
          body["resourceType"] = g["resourceType"];
        }
        if (g["userVisibleDescription"] !== undefined) {
          body["userVisibleDescription"] = g["userVisibleDescription"];
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
          UPDATE_CONFIG,
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
      description: "Delete the calendars",
      arguments: z.object({
        identifier: z.string().describe("The name of the calendars"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["customer"] !== undefined) {
          params["customer"] = String(g["customer"]);
        }
        params["calendarResourceId"] = args.identifier;
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
      description: "Sync calendars state from GCP",
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
          if (g["customer"] !== undefined) {
            params["customer"] = String(g["customer"]);
          } else if (existing["customer"]) {
            params["customer"] = String(existing["customer"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["calendarResourceId"] = identifier;
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
      description: "List calendars resources",
      arguments: z.object({
        maxResults: z.number().describe("Maximum number of results to return.")
          .optional(),
        orderBy: z.string().describe(
          'Field(s) to sort results by in either ascending or descending order. Supported fields include `resourceId`, `resourceName`, `capacity`, `buildingId`, and `floorName`. If no order is specified, defaults to ascending. Should be of the form "field [asc|desc], field [asc|desc], ...". For example `buildingId, capacity desc` would return results sorted first by `buildingId` in ascending order then by `capacity` in descending order.',
        ).optional(),
        query: z.string().describe(
          "String query used to filter results. Contains one or more search clauses, each with a field, operator, and value. A field can be any of supported fields and operators can be any of supported operations. Operators include '=' for exact match, '!=' for mismatch and ':' for prefix match or HAS match where applicable. For prefix match, the value should always be followed by a *. Logical operators NOT and AND are supported (in this order of precedence). Supported fields include `generatedResourceName`, `name`, `buildingId`, `floor_name`, `capacity`, `featureInstances.feature.name`, `resourceEmail`, `resourceCategory`. For example `buildingId=US-NYC-9TH AND featureInstances.feature.name:Phone`.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["customer"] !== undefined) {
          params["customer"] = String(g["customer"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["query"] !== undefined) {
          params["query"] = String(args["query"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "items",
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
  },
};
