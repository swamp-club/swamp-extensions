// Auto-generated extension model for @swamp/gcp/calendar/calendars
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Calendar Calendars.
 *
 * Returns metadata for a calendar.
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

const BASE_URL = "https://www.googleapis.com/calendar/v3/";

const GET_CONFIG = {
  "id": "calendar.calendars.get",
  "path": "calendars/{calendarId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "calendarId",
  ],
  "parameters": {
    "calendarId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "calendar.calendars.insert",
  "path": "calendars",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const UPDATE_CONFIG = {
  "id": "calendar.calendars.update",
  "path": "calendars/{calendarId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "calendarId",
  ],
  "parameters": {
    "calendarId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "calendar.calendars.delete",
  "path": "calendars/{calendarId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "calendarId",
  ],
  "parameters": {
    "calendarId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  autoAcceptInvitations: z.boolean().describe(
    "Whether this calendar automatically accepts invitations. Only valid for resource calendars.",
  ).optional(),
  conferenceProperties: z.object({
    allowedConferenceSolutionTypes: z.array(z.string()).describe(
      'The types of conference solutions that are supported for this calendar. The possible values are: - "eventHangout" - "eventNamedHangout" - "hangoutsMeet" Optional.',
    ).optional(),
  }).optional(),
  dataOwner: z.string().describe(
    "The email of the owner of the calendar. Set only for secondary calendars. Read-only.",
  ).optional(),
  description: z.string().describe("Description of the calendar. Optional.")
    .optional(),
  id: z.string().describe(
    "Identifier of the calendar. To retrieve IDs call the calendarList.list() method.",
  ).optional(),
  location: z.string().describe(
    "Geographic location of the calendar as free-form text. Optional.",
  ).optional(),
  summary: z.string().describe("Title of the calendar."),
  timeZone: z.string().describe(
    'The time zone of the calendar. (Formatted as an IANA Time Zone Database name, e.g. "Europe/Zurich".) Optional.',
  ).optional(),
});

const StateSchema = z.object({
  autoAcceptInvitations: z.boolean().optional(),
  conferenceProperties: z.object({
    allowedConferenceSolutionTypes: z.array(z.string()),
  }).optional(),
  dataOwner: z.string().optional(),
  description: z.string().optional(),
  etag: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  location: z.string().optional(),
  summary: z.string().optional(),
  timeZone: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  autoAcceptInvitations: z.boolean().describe(
    "Whether this calendar automatically accepts invitations. Only valid for resource calendars.",
  ).optional(),
  conferenceProperties: z.object({
    allowedConferenceSolutionTypes: z.array(z.string()).describe(
      'The types of conference solutions that are supported for this calendar. The possible values are: - "eventHangout" - "eventNamedHangout" - "hangoutsMeet" Optional.',
    ).optional(),
  }).optional(),
  dataOwner: z.string().describe(
    "The email of the owner of the calendar. Set only for secondary calendars. Read-only.",
  ).optional(),
  description: z.string().describe("Description of the calendar. Optional.")
    .optional(),
  id: z.string().describe(
    "Identifier of the calendar. To retrieve IDs call the calendarList.list() method.",
  ).optional(),
  location: z.string().describe(
    "Geographic location of the calendar as free-form text. Optional.",
  ).optional(),
  summary: z.string().describe("Title of the calendar.").optional(),
  timeZone: z.string().describe(
    'The time zone of the calendar. (Formatted as an IANA Time Zone Database name, e.g. "Europe/Zurich".) Optional.',
  ).optional(),
});

/** Swamp extension model for Google Cloud Calendar Calendars. Registered at `@swamp/gcp/calendar/calendars`. */
export const model = {
  type: "@swamp/gcp/calendar/calendars",
  version: "2026.05.21.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Returns metadata for a calendar.",
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
        const body: Record<string, unknown> = {};
        if (g["autoAcceptInvitations"] !== undefined) {
          body["autoAcceptInvitations"] = g["autoAcceptInvitations"];
        }
        if (g["conferenceProperties"] !== undefined) {
          body["conferenceProperties"] = g["conferenceProperties"];
        }
        if (g["dataOwner"] !== undefined) body["dataOwner"] = g["dataOwner"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["location"] !== undefined) body["location"] = g["location"];
        if (g["summary"] !== undefined) body["summary"] = g["summary"];
        if (g["timeZone"] !== undefined) body["timeZone"] = g["timeZone"];
        if (g["name"] !== undefined) params["calendarId"] = String(g["name"]);
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
      description: "Get a calendars",
      arguments: z.object({
        identifier: z.string().describe("The name of the calendars"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["calendarId"] = args.identifier;
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
        params["calendarId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["autoAcceptInvitations"] !== undefined) {
          body["autoAcceptInvitations"] = g["autoAcceptInvitations"];
        }
        if (g["conferenceProperties"] !== undefined) {
          body["conferenceProperties"] = g["conferenceProperties"];
        }
        if (g["dataOwner"] !== undefined) body["dataOwner"] = g["dataOwner"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["location"] !== undefined) body["location"] = g["location"];
        if (g["summary"] !== undefined) body["summary"] = g["summary"];
        if (g["timeZone"] !== undefined) body["timeZone"] = g["timeZone"];
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
        params["calendarId"] = args.identifier;
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["calendarId"] = identifier;
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
    clear: {
      description: "clear",
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
        params["calendarId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "calendar.calendars.clear",
            "path": "calendars/{calendarId}/clear",
            "httpMethod": "POST",
            "parameterOrder": ["calendarId"],
            "parameters": {
              "calendarId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
