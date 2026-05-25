// Auto-generated extension model for @swamp/gcp/calendar/calendarlist
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Calendar CalendarList.
 *
 * Returns a calendar from the user's calendar list.
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

const BASE_URL = "https://www.googleapis.com/calendar/v3/";

const GET_CONFIG = {
  "id": "calendar.calendarList.get",
  "path": "users/me/calendarList/{calendarId}",
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
  "id": "calendar.calendarList.insert",
  "path": "users/me/calendarList",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {
    "colorRgbFormat": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "calendar.calendarList.update",
  "path": "users/me/calendarList/{calendarId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "calendarId",
  ],
  "parameters": {
    "calendarId": {
      "location": "path",
      "required": true,
    },
    "colorRgbFormat": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "calendar.calendarList.delete",
  "path": "users/me/calendarList/{calendarId}",
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

const LIST_CONFIG = {
  "id": "calendar.calendarList.list",
  "path": "users/me/calendarList",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "maxResults": {
      "location": "query",
    },
    "minAccessRole": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "showDeleted": {
      "location": "query",
    },
    "showHidden": {
      "location": "query",
    },
    "syncToken": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessRole: z.string().describe(
    'The effective access role that the authenticated user has on the calendar. Read-only. Possible values are: - "freeBusyReader" - Provides read access to free/busy information. - "reader" - Provides read access to the calendar. Private events will appear to users with reader access, but event details will be hidden. - "writer" - Provides read and write access to the calendar. Private events will appear to users with writer access, and event details will be visible. - "owner" - Provides manager access to the calendar. This role has all of the permissions of the writer role with the additional ability to see and modify access levels of other users. Important: the owner role is different from the calendar\'s data owner. A calendar has a single data owner, but can have multiple users with owner role.',
  ).optional(),
  autoAcceptInvitations: z.boolean().describe(
    "Whether this calendar automatically accepts invitations. Only valid for resource calendars. Read-only.",
  ).optional(),
  backgroundColor: z.string().describe(
    'The main color of the calendar in the hexadecimal format "#0088aa". This property supersedes the index-based colorId property. To set or change this property, you need to specify colorRgbFormat=true in the parameters of the insert, update and patch methods. Optional.',
  ).optional(),
  colorId: z.string().describe(
    "The color of the calendar. This is an ID referring to an entry in the calendar section of the colors definition (see the colors endpoint). This property is superseded by the backgroundColor and foregroundColor properties and can be ignored when using these properties. Optional.",
  ).optional(),
  conferenceProperties: z.object({
    allowedConferenceSolutionTypes: z.array(z.string()).describe(
      'The types of conference solutions that are supported for this calendar. The possible values are: - "eventHangout" - "eventNamedHangout" - "hangoutsMeet" Optional.',
    ).optional(),
  }).optional(),
  dataOwner: z.string().describe(
    "The email of the owner of the calendar. Set only for secondary calendars. Read-only.",
  ).optional(),
  defaultReminders: z.array(z.object({
    method: z.string().describe(
      'The method used by this reminder. Possible values are: - "email" - Reminders are sent via email. - "popup" - Reminders are sent via a UI popup. Required when adding a reminder.',
    ).optional(),
    minutes: z.number().int().describe(
      "Number of minutes before the start of the event when the reminder should trigger. Valid values are between 0 and 40320 (4 weeks in minutes). Required when adding a reminder.",
    ).optional(),
  })).describe(
    "The default reminders that the authenticated user has for this calendar.",
  ).optional(),
  deleted: z.boolean().describe(
    "Whether this calendar list entry has been deleted from the calendar list. Read-only. Optional. The default is False.",
  ).optional(),
  description: z.string().describe(
    "Description of the calendar. Optional. Read-only.",
  ).optional(),
  foregroundColor: z.string().describe(
    'The foreground color of the calendar in the hexadecimal format "#ffffff". This property supersedes the index-based colorId property. To set or change this property, you need to specify colorRgbFormat=true in the parameters of the insert, update and patch methods. Optional.',
  ).optional(),
  hidden: z.boolean().describe(
    "Whether the calendar has been hidden from the list. Optional. The attribute is only returned when the calendar is hidden, in which case the value is true.",
  ).optional(),
  id: z.string().describe("Identifier of the calendar."),
  location: z.string().describe(
    "Geographic location of the calendar as free-form text. Optional. Read-only.",
  ).optional(),
  notificationSettings: z.object({
    notifications: z.array(z.object({
      method: z.string().describe(
        'The method used to deliver the notification. The possible value is: - "email" - Notifications are sent via email. Required when adding a notification.',
      ).optional(),
      type: z.string().describe(
        'The type of notification. Possible values are: - "eventCreation" - Notification sent when a new event is put on the calendar. - "eventChange" - Notification sent when an event is changed. - "eventCancellation" - Notification sent when an event is cancelled. - "eventResponse" - Notification sent when an attendee responds to the event invitation. - "agenda" - An agenda with the events of the day (sent out in the morning). Required when adding a notification.',
      ).optional(),
    })).describe("The list of notifications set for this calendar.").optional(),
  }).describe(
    "The notifications that the authenticated user is receiving for this calendar.",
  ).optional(),
  primary: z.boolean().describe(
    "Whether the calendar is the primary calendar of the authenticated user. Read-only. Optional. The default is False.",
  ).optional(),
  selected: z.boolean().describe(
    "Whether the calendar content shows up in the calendar UI. Optional. The default is False.",
  ).optional(),
  summary: z.string().describe("Title of the calendar. Read-only.").optional(),
  summaryOverride: z.string().describe(
    "The summary that the authenticated user has set for this calendar. Optional.",
  ).optional(),
  timeZone: z.string().describe(
    "The time zone of the calendar. Optional. Read-only.",
  ).optional(),
  colorRgbFormat: z.string().describe(
    "Whether to use the foregroundColor and backgroundColor fields to write the calendar colors (RGB). If this feature is used, the index-based colorId field will be set to the best matching option automatically. Optional. The default is False.",
  ).optional(),
});

const StateSchema = z.object({
  accessRole: z.string().optional(),
  autoAcceptInvitations: z.boolean().optional(),
  backgroundColor: z.string().optional(),
  colorId: z.string().optional(),
  conferenceProperties: z.object({
    allowedConferenceSolutionTypes: z.array(z.string()),
  }).optional(),
  dataOwner: z.string().optional(),
  defaultReminders: z.array(z.object({
    method: z.string(),
    minutes: z.number(),
  })).optional(),
  deleted: z.boolean().optional(),
  description: z.string().optional(),
  etag: z.string().optional(),
  foregroundColor: z.string().optional(),
  hidden: z.boolean().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  location: z.string().optional(),
  notificationSettings: z.object({
    notifications: z.array(z.object({
      method: z.string(),
      type: z.string(),
    })),
  }).optional(),
  primary: z.boolean().optional(),
  selected: z.boolean().optional(),
  summary: z.string().optional(),
  summaryOverride: z.string().optional(),
  timeZone: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessRole: z.string().describe(
    'The effective access role that the authenticated user has on the calendar. Read-only. Possible values are: - "freeBusyReader" - Provides read access to free/busy information. - "reader" - Provides read access to the calendar. Private events will appear to users with reader access, but event details will be hidden. - "writer" - Provides read and write access to the calendar. Private events will appear to users with writer access, and event details will be visible. - "owner" - Provides manager access to the calendar. This role has all of the permissions of the writer role with the additional ability to see and modify access levels of other users. Important: the owner role is different from the calendar\'s data owner. A calendar has a single data owner, but can have multiple users with owner role.',
  ).optional(),
  autoAcceptInvitations: z.boolean().describe(
    "Whether this calendar automatically accepts invitations. Only valid for resource calendars. Read-only.",
  ).optional(),
  backgroundColor: z.string().describe(
    'The main color of the calendar in the hexadecimal format "#0088aa". This property supersedes the index-based colorId property. To set or change this property, you need to specify colorRgbFormat=true in the parameters of the insert, update and patch methods. Optional.',
  ).optional(),
  colorId: z.string().describe(
    "The color of the calendar. This is an ID referring to an entry in the calendar section of the colors definition (see the colors endpoint). This property is superseded by the backgroundColor and foregroundColor properties and can be ignored when using these properties. Optional.",
  ).optional(),
  conferenceProperties: z.object({
    allowedConferenceSolutionTypes: z.array(z.string()).describe(
      'The types of conference solutions that are supported for this calendar. The possible values are: - "eventHangout" - "eventNamedHangout" - "hangoutsMeet" Optional.',
    ).optional(),
  }).optional(),
  dataOwner: z.string().describe(
    "The email of the owner of the calendar. Set only for secondary calendars. Read-only.",
  ).optional(),
  defaultReminders: z.array(z.object({
    method: z.string().describe(
      'The method used by this reminder. Possible values are: - "email" - Reminders are sent via email. - "popup" - Reminders are sent via a UI popup. Required when adding a reminder.',
    ).optional(),
    minutes: z.number().int().describe(
      "Number of minutes before the start of the event when the reminder should trigger. Valid values are between 0 and 40320 (4 weeks in minutes). Required when adding a reminder.",
    ).optional(),
  })).describe(
    "The default reminders that the authenticated user has for this calendar.",
  ).optional(),
  deleted: z.boolean().describe(
    "Whether this calendar list entry has been deleted from the calendar list. Read-only. Optional. The default is False.",
  ).optional(),
  description: z.string().describe(
    "Description of the calendar. Optional. Read-only.",
  ).optional(),
  foregroundColor: z.string().describe(
    'The foreground color of the calendar in the hexadecimal format "#ffffff". This property supersedes the index-based colorId property. To set or change this property, you need to specify colorRgbFormat=true in the parameters of the insert, update and patch methods. Optional.',
  ).optional(),
  hidden: z.boolean().describe(
    "Whether the calendar has been hidden from the list. Optional. The attribute is only returned when the calendar is hidden, in which case the value is true.",
  ).optional(),
  id: z.string().describe("Identifier of the calendar.").optional(),
  location: z.string().describe(
    "Geographic location of the calendar as free-form text. Optional. Read-only.",
  ).optional(),
  notificationSettings: z.object({
    notifications: z.array(z.object({
      method: z.string().describe(
        'The method used to deliver the notification. The possible value is: - "email" - Notifications are sent via email. Required when adding a notification.',
      ).optional(),
      type: z.string().describe(
        'The type of notification. Possible values are: - "eventCreation" - Notification sent when a new event is put on the calendar. - "eventChange" - Notification sent when an event is changed. - "eventCancellation" - Notification sent when an event is cancelled. - "eventResponse" - Notification sent when an attendee responds to the event invitation. - "agenda" - An agenda with the events of the day (sent out in the morning). Required when adding a notification.',
      ).optional(),
    })).describe("The list of notifications set for this calendar.").optional(),
  }).describe(
    "The notifications that the authenticated user is receiving for this calendar.",
  ).optional(),
  primary: z.boolean().describe(
    "Whether the calendar is the primary calendar of the authenticated user. Read-only. Optional. The default is False.",
  ).optional(),
  selected: z.boolean().describe(
    "Whether the calendar content shows up in the calendar UI. Optional. The default is False.",
  ).optional(),
  summary: z.string().describe("Title of the calendar. Read-only.").optional(),
  summaryOverride: z.string().describe(
    "The summary that the authenticated user has set for this calendar. Optional.",
  ).optional(),
  timeZone: z.string().describe(
    "The time zone of the calendar. Optional. Read-only.",
  ).optional(),
  colorRgbFormat: z.string().describe(
    "Whether to use the foregroundColor and backgroundColor fields to write the calendar colors (RGB). If this feature is used, the index-based colorId field will be set to the best matching option automatically. Optional. The default is False.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Calendar CalendarList. Registered at `@swamp/gcp/calendar/calendarlist`. */
export const model = {
  type: "@swamp/gcp/calendar/calendarlist",
  version: "2026.05.25.2",
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
      toVersion: "2026.05.25.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Returns a calendar from the user's calendar list.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a calendarList",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["accessRole"] !== undefined) body["accessRole"] = g["accessRole"];
        if (g["autoAcceptInvitations"] !== undefined) {
          body["autoAcceptInvitations"] = g["autoAcceptInvitations"];
        }
        if (g["backgroundColor"] !== undefined) {
          body["backgroundColor"] = g["backgroundColor"];
        }
        if (g["colorId"] !== undefined) body["colorId"] = g["colorId"];
        if (g["conferenceProperties"] !== undefined) {
          body["conferenceProperties"] = g["conferenceProperties"];
        }
        if (g["dataOwner"] !== undefined) body["dataOwner"] = g["dataOwner"];
        if (g["defaultReminders"] !== undefined) {
          body["defaultReminders"] = g["defaultReminders"];
        }
        if (g["deleted"] !== undefined) body["deleted"] = g["deleted"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["foregroundColor"] !== undefined) {
          body["foregroundColor"] = g["foregroundColor"];
        }
        if (g["hidden"] !== undefined) body["hidden"] = g["hidden"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["location"] !== undefined) body["location"] = g["location"];
        if (g["notificationSettings"] !== undefined) {
          body["notificationSettings"] = g["notificationSettings"];
        }
        if (g["primary"] !== undefined) body["primary"] = g["primary"];
        if (g["selected"] !== undefined) body["selected"] = g["selected"];
        if (g["summary"] !== undefined) body["summary"] = g["summary"];
        if (g["summaryOverride"] !== undefined) {
          body["summaryOverride"] = g["summaryOverride"];
        }
        if (g["timeZone"] !== undefined) body["timeZone"] = g["timeZone"];
        if (g["colorRgbFormat"] !== undefined) {
          body["colorRgbFormat"] = g["colorRgbFormat"];
        }
        if (g["name"] !== undefined) params["calendarId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {},
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
      description: "Get a calendarList",
      arguments: z.object({
        identifier: z.string().describe("The name of the calendarList"),
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
      description: "Update calendarList attributes",
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
        if (g["accessRole"] !== undefined) body["accessRole"] = g["accessRole"];
        if (g["autoAcceptInvitations"] !== undefined) {
          body["autoAcceptInvitations"] = g["autoAcceptInvitations"];
        }
        if (g["backgroundColor"] !== undefined) {
          body["backgroundColor"] = g["backgroundColor"];
        }
        if (g["colorId"] !== undefined) body["colorId"] = g["colorId"];
        if (g["conferenceProperties"] !== undefined) {
          body["conferenceProperties"] = g["conferenceProperties"];
        }
        if (g["dataOwner"] !== undefined) body["dataOwner"] = g["dataOwner"];
        if (g["defaultReminders"] !== undefined) {
          body["defaultReminders"] = g["defaultReminders"];
        }
        if (g["deleted"] !== undefined) body["deleted"] = g["deleted"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["foregroundColor"] !== undefined) {
          body["foregroundColor"] = g["foregroundColor"];
        }
        if (g["hidden"] !== undefined) body["hidden"] = g["hidden"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["location"] !== undefined) body["location"] = g["location"];
        if (g["notificationSettings"] !== undefined) {
          body["notificationSettings"] = g["notificationSettings"];
        }
        if (g["primary"] !== undefined) body["primary"] = g["primary"];
        if (g["selected"] !== undefined) body["selected"] = g["selected"];
        if (g["summary"] !== undefined) body["summary"] = g["summary"];
        if (g["summaryOverride"] !== undefined) {
          body["summaryOverride"] = g["summaryOverride"];
        }
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
      description: "Delete the calendarList",
      arguments: z.object({
        identifier: z.string().describe("The name of the calendarList"),
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
      description: "Sync calendarList state from GCP",
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
    list: {
      description: "List calendarList resources",
      arguments: z.object({
        maxResults: z.number().describe(
          "Maximum number of entries returned on one result page. By default the value is 100 entries. The page size can never be larger than 250 entries. Optional.",
        ).optional(),
        minAccessRole: z.string().describe(
          "The minimum access role for the user in the returned entries. Optional. The default is no restriction.",
        ).optional(),
        showDeleted: z.boolean().describe(
          "Whether to include deleted calendar list entries in the result. Optional. The default is False.",
        ).optional(),
        showHidden: z.boolean().describe(
          "Whether to show hidden entries. Optional. The default is False.",
        ).optional(),
        syncToken: z.string().describe(
          "Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. If only read-only fields such as calendar properties or ACLs have changed, the entry won't be returned. All entries deleted and hidden since the previous list request will always be in the result set and it is not allowed to set showDeleted neither showHidden to False.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["minAccessRole"] !== undefined) {
          params["minAccessRole"] = String(args["minAccessRole"]);
        }
        if (args["showDeleted"] !== undefined) {
          params["showDeleted"] = String(args["showDeleted"]);
        }
        if (args["showHidden"] !== undefined) {
          params["showHidden"] = String(args["showHidden"]);
        }
        if (args["syncToken"] !== undefined) {
          params["syncToken"] = String(args["syncToken"]);
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
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
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
            "id": "calendar.calendarList.watch",
            "path": "users/me/calendarList/watch",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {
              "maxResults": { "location": "query" },
              "minAccessRole": { "location": "query" },
              "pageToken": { "location": "query" },
              "showDeleted": { "location": "query" },
              "showHidden": { "location": "query" },
              "syncToken": { "location": "query" },
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
