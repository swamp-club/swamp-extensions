// Auto-generated extension model for @swamp/gcp/classroom/courses
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Classroom Courses.
 *
 * A Course in Classroom.
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

const BASE_URL = "https://classroom.googleapis.com/";

const GET_CONFIG = {
  "id": "classroom.courses.get",
  "path": "v1/courses/{id}",
  "httpMethod": "GET",
  "parameterOrder": [
    "id",
  ],
  "parameters": {
    "id": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "classroom.courses.create",
  "path": "v1/courses",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const UPDATE_CONFIG = {
  "id": "classroom.courses.update",
  "path": "v1/courses/{id}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "id",
  ],
  "parameters": {
    "id": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "classroom.courses.delete",
  "path": "v1/courses/{id}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "id",
  ],
  "parameters": {
    "id": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "classroom.courses.list",
  "path": "v1/courses",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "courseStates": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "studentId": {
      "location": "query",
    },
    "teacherId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  alternateLink: z.string().describe(
    "Absolute link to this course in the Classroom web UI. Read-only.",
  ).optional(),
  calendarId: z.string().describe(
    "The Calendar ID for a calendar that all course members can see, to which Classroom adds events for course work and announcements in the course. The Calendar for a course is created asynchronously when the course is set to `CourseState.ACTIVE` for the first time (at creation time or when it is updated to `ACTIVE` through the UI or the API). The Calendar ID will not be populated until the creation process is completed. Read-only.",
  ).optional(),
  courseGroupEmail: z.string().describe(
    "The email address of a Google group containing all members of the course. This group does not accept email and can only be used for permissions. Read-only.",
  ).optional(),
  courseState: z.enum([
    "COURSE_STATE_UNSPECIFIED",
    "ACTIVE",
    "ARCHIVED",
    "PROVISIONED",
    "DECLINED",
    "SUSPENDED",
  ]).describe(
    "State of the course. If unspecified, the default state is `PROVISIONED`.",
  ).optional(),
  creationTime: z.string().describe(
    "Creation time of the course. Specifying this field in a course update mask results in an error. Read-only.",
  ).optional(),
  description: z.string().describe(
    'Optional description. For example, "We\'ll be learning about the structure of living creatures from a combination of textbooks, guest lectures, and lab work. Expect to be excited!" If set, this field must be a valid UTF-8 string and no longer than 30,000 characters.',
  ).optional(),
  descriptionHeading: z.string().describe(
    'Optional heading for the description. For example, "Welcome to 10th Grade Biology." If set, this field must be a valid UTF-8 string and no longer than 3600 characters.',
  ).optional(),
  enrollmentCode: z.string().describe(
    "Enrollment code to use when joining this course. Specifying this field in a course update mask results in an error. Read-only.",
  ).optional(),
  gradebookSettings: z.object({
    calculationType: z.enum([
      "CALCULATION_TYPE_UNSPECIFIED",
      "TOTAL_POINTS",
      "WEIGHTED_CATEGORIES",
    ]).describe("Indicates how the overall grade is calculated.").optional(),
    displaySetting: z.enum([
      "DISPLAY_SETTING_UNSPECIFIED",
      "SHOW_OVERALL_GRADE",
      "HIDE_OVERALL_GRADE",
      "SHOW_TEACHERS_ONLY",
    ]).describe("Indicates who can see the overall grade..").optional(),
    gradeCategories: z.array(z.object({
      defaultGradeDenominator: z.number().int().describe(
        "Default value of denominator. Only applicable when grade calculation type is TOTAL_POINTS.",
      ).optional(),
      id: z.string().describe("ID of the grade category.").optional(),
      name: z.string().describe("Name of the grade category.").optional(),
      weight: z.number().int().describe(
        "The weight of the category average as part of overall average. A weight of 12.34% is represented as 123400 (100% is 1,000,000). The last two digits should always be zero since we use two decimal precision. Only applicable when grade calculation type is WEIGHTED_CATEGORIES.",
      ).optional(),
    })).describe(
      "Grade categories that are available for coursework in the course.",
    ).optional(),
  }).describe(
    "The gradebook settings for a course. See the [help center article](https://support.google.com/edu/classroom/answer/9184995) for details.",
  ).optional(),
  guardiansEnabled: z.boolean().describe(
    "Whether or not guardian notifications are enabled for this course. Read-only.",
  ).optional(),
  id: z.string().describe(
    "Identifier for this course assigned by Classroom. When creating a course, you may optionally set this identifier to an alias string in the request to create a corresponding alias. The `id` is still assigned by Classroom and cannot be updated after the course is created. Specifying this field in a course update mask results in an error.",
  ).optional(),
  name: z.string().describe(
    'Name of the course. For example, "10th Grade Biology". The name is required. It must be between 1 and 750 characters and a valid UTF-8 string.',
  ).optional(),
  ownerId: z.string().describe(
    'The identifier of the owner of a course. When specified as a parameter of a create course request, this field is required. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user This must be set in a create request. Admins can also specify this field in a patch course request to transfer ownership. In other contexts, it is read-only.',
  ).optional(),
  room: z.string().describe(
    'Optional room location. For example, "301". If set, this field must be a valid UTF-8 string and no longer than 650 characters.',
  ).optional(),
  section: z.string().describe(
    'Section of the course. For example, "Period 2". If set, this field must be a valid UTF-8 string and no longer than 2800 characters.',
  ).optional(),
  subject: z.string().describe("Optional. The subject of the course.")
    .optional(),
  teacherFolder: z.object({
    alternateLink: z.string().describe(
      "URL that can be used to access the Drive folder. Read-only.",
    ).optional(),
    id: z.string().describe("Drive API resource ID.").optional(),
    title: z.string().describe("Title of the Drive folder. Read-only.")
      .optional(),
  }).describe("Representation of a Google Drive folder.").optional(),
  teacherGroupEmail: z.string().describe(
    "The email address of a Google group containing all teachers of the course. This group does not accept email and can only be used for permissions. Read-only.",
  ).optional(),
  updateTime: z.string().describe(
    "Time of the most recent update to this course. Specifying this field in a course update mask results in an error. Read-only.",
  ).optional(),
});

const StateSchema = z.object({
  alternateLink: z.string().optional(),
  calendarId: z.string().optional(),
  courseGroupEmail: z.string().optional(),
  courseMaterialSets: z.array(z.object({
    materials: z.array(z.object({
      driveFile: z.object({
        alternateLink: z.unknown(),
        id: z.unknown(),
        thumbnailUrl: z.unknown(),
        title: z.unknown(),
      }),
      form: z.object({
        formUrl: z.unknown(),
        responseUrl: z.unknown(),
        thumbnailUrl: z.unknown(),
        title: z.unknown(),
      }),
      link: z.object({
        thumbnailUrl: z.unknown(),
        title: z.unknown(),
        url: z.unknown(),
      }),
      youTubeVideo: z.object({
        alternateLink: z.unknown(),
        id: z.unknown(),
        thumbnailUrl: z.unknown(),
        title: z.unknown(),
      }),
    })),
    title: z.string(),
  })).optional(),
  courseState: z.string().optional(),
  creationTime: z.string().optional(),
  description: z.string().optional(),
  descriptionHeading: z.string().optional(),
  enrollmentCode: z.string().optional(),
  gradebookSettings: z.object({
    calculationType: z.string(),
    displaySetting: z.string(),
    gradeCategories: z.array(z.object({
      defaultGradeDenominator: z.number(),
      id: z.string(),
      name: z.string(),
      weight: z.number(),
    })),
  }).optional(),
  guardiansEnabled: z.boolean().optional(),
  id: z.string(),
  name: z.string().optional(),
  ownerId: z.string().optional(),
  room: z.string().optional(),
  section: z.string().optional(),
  subject: z.string().optional(),
  teacherFolder: z.object({
    alternateLink: z.string(),
    id: z.string(),
    title: z.string(),
  }).optional(),
  teacherGroupEmail: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  alternateLink: z.string().describe(
    "Absolute link to this course in the Classroom web UI. Read-only.",
  ).optional(),
  calendarId: z.string().describe(
    "The Calendar ID for a calendar that all course members can see, to which Classroom adds events for course work and announcements in the course. The Calendar for a course is created asynchronously when the course is set to `CourseState.ACTIVE` for the first time (at creation time or when it is updated to `ACTIVE` through the UI or the API). The Calendar ID will not be populated until the creation process is completed. Read-only.",
  ).optional(),
  courseGroupEmail: z.string().describe(
    "The email address of a Google group containing all members of the course. This group does not accept email and can only be used for permissions. Read-only.",
  ).optional(),
  courseState: z.enum([
    "COURSE_STATE_UNSPECIFIED",
    "ACTIVE",
    "ARCHIVED",
    "PROVISIONED",
    "DECLINED",
    "SUSPENDED",
  ]).describe(
    "State of the course. If unspecified, the default state is `PROVISIONED`.",
  ).optional(),
  creationTime: z.string().describe(
    "Creation time of the course. Specifying this field in a course update mask results in an error. Read-only.",
  ).optional(),
  description: z.string().describe(
    'Optional description. For example, "We\'ll be learning about the structure of living creatures from a combination of textbooks, guest lectures, and lab work. Expect to be excited!" If set, this field must be a valid UTF-8 string and no longer than 30,000 characters.',
  ).optional(),
  descriptionHeading: z.string().describe(
    'Optional heading for the description. For example, "Welcome to 10th Grade Biology." If set, this field must be a valid UTF-8 string and no longer than 3600 characters.',
  ).optional(),
  enrollmentCode: z.string().describe(
    "Enrollment code to use when joining this course. Specifying this field in a course update mask results in an error. Read-only.",
  ).optional(),
  gradebookSettings: z.object({
    calculationType: z.enum([
      "CALCULATION_TYPE_UNSPECIFIED",
      "TOTAL_POINTS",
      "WEIGHTED_CATEGORIES",
    ]).describe("Indicates how the overall grade is calculated.").optional(),
    displaySetting: z.enum([
      "DISPLAY_SETTING_UNSPECIFIED",
      "SHOW_OVERALL_GRADE",
      "HIDE_OVERALL_GRADE",
      "SHOW_TEACHERS_ONLY",
    ]).describe("Indicates who can see the overall grade..").optional(),
    gradeCategories: z.array(z.object({
      defaultGradeDenominator: z.number().int().describe(
        "Default value of denominator. Only applicable when grade calculation type is TOTAL_POINTS.",
      ).optional(),
      id: z.string().describe("ID of the grade category.").optional(),
      name: z.string().describe("Name of the grade category.").optional(),
      weight: z.number().int().describe(
        "The weight of the category average as part of overall average. A weight of 12.34% is represented as 123400 (100% is 1,000,000). The last two digits should always be zero since we use two decimal precision. Only applicable when grade calculation type is WEIGHTED_CATEGORIES.",
      ).optional(),
    })).describe(
      "Grade categories that are available for coursework in the course.",
    ).optional(),
  }).describe(
    "The gradebook settings for a course. See the [help center article](https://support.google.com/edu/classroom/answer/9184995) for details.",
  ).optional(),
  guardiansEnabled: z.boolean().describe(
    "Whether or not guardian notifications are enabled for this course. Read-only.",
  ).optional(),
  id: z.string().describe(
    "Identifier for this course assigned by Classroom. When creating a course, you may optionally set this identifier to an alias string in the request to create a corresponding alias. The `id` is still assigned by Classroom and cannot be updated after the course is created. Specifying this field in a course update mask results in an error.",
  ).optional(),
  name: z.string().describe(
    'Name of the course. For example, "10th Grade Biology". The name is required. It must be between 1 and 750 characters and a valid UTF-8 string.',
  ).optional(),
  ownerId: z.string().describe(
    'The identifier of the owner of a course. When specified as a parameter of a create course request, this field is required. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user This must be set in a create request. Admins can also specify this field in a patch course request to transfer ownership. In other contexts, it is read-only.',
  ).optional(),
  room: z.string().describe(
    'Optional room location. For example, "301". If set, this field must be a valid UTF-8 string and no longer than 650 characters.',
  ).optional(),
  section: z.string().describe(
    'Section of the course. For example, "Period 2". If set, this field must be a valid UTF-8 string and no longer than 2800 characters.',
  ).optional(),
  subject: z.string().describe("Optional. The subject of the course.")
    .optional(),
  teacherFolder: z.object({
    alternateLink: z.string().describe(
      "URL that can be used to access the Drive folder. Read-only.",
    ).optional(),
    id: z.string().describe("Drive API resource ID.").optional(),
    title: z.string().describe("Title of the Drive folder. Read-only.")
      .optional(),
  }).describe("Representation of a Google Drive folder.").optional(),
  teacherGroupEmail: z.string().describe(
    "The email address of a Google group containing all teachers of the course. This group does not accept email and can only be used for permissions. Read-only.",
  ).optional(),
  updateTime: z.string().describe(
    "Time of the most recent update to this course. Specifying this field in a course update mask results in an error. Read-only.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Classroom Courses. Registered at `@swamp/gcp/classroom/courses`. */
export const model = {
  type: "@swamp/gcp/classroom/courses",
  version: "2026.05.25.1",
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
      toVersion: "2026.05.09.1",
      description: "Added: levels",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "Removed: levels",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { levels: _levels, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: levels",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "Removed: levels",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { levels: _levels, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.20.1",
      description: "Added: levels",
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
      description: "Removed: levels",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { levels: _levels, ...rest } = old;
        return rest;
      },
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A Course in Classroom.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a courses",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["alternateLink"] !== undefined) {
          body["alternateLink"] = g["alternateLink"];
        }
        if (g["calendarId"] !== undefined) body["calendarId"] = g["calendarId"];
        if (g["courseGroupEmail"] !== undefined) {
          body["courseGroupEmail"] = g["courseGroupEmail"];
        }
        if (g["courseState"] !== undefined) {
          body["courseState"] = g["courseState"];
        }
        if (g["creationTime"] !== undefined) {
          body["creationTime"] = g["creationTime"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["descriptionHeading"] !== undefined) {
          body["descriptionHeading"] = g["descriptionHeading"];
        }
        if (g["enrollmentCode"] !== undefined) {
          body["enrollmentCode"] = g["enrollmentCode"];
        }
        if (g["gradebookSettings"] !== undefined) {
          body["gradebookSettings"] = g["gradebookSettings"];
        }
        if (g["guardiansEnabled"] !== undefined) {
          body["guardiansEnabled"] = g["guardiansEnabled"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["ownerId"] !== undefined) body["ownerId"] = g["ownerId"];
        if (g["room"] !== undefined) body["room"] = g["room"];
        if (g["section"] !== undefined) body["section"] = g["section"];
        if (g["subject"] !== undefined) body["subject"] = g["subject"];
        if (g["teacherFolder"] !== undefined) {
          body["teacherFolder"] = g["teacherFolder"];
        }
        if (g["teacherGroupEmail"] !== undefined) {
          body["teacherGroupEmail"] = g["teacherGroupEmail"];
        }
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
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
            matchField: "id",
            matchValue: String(g["id"] ?? ""),
          },
        ) as StateData;
        const instanceName = ((result.id ?? g.id)?.toString() ?? "current")
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
      description: "Get a courses",
      arguments: z.object({
        identifier: z.string().describe("The id of the courses"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["id"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName =
          ((result.id ?? g.id)?.toString() ?? args.identifier).replace(
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
      description: "Update courses attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.id?.toString() ?? "current").replace(
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
        params["id"] = existing["id"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["alternateLink"] !== undefined) {
          body["alternateLink"] = g["alternateLink"];
        }
        if (g["calendarId"] !== undefined) body["calendarId"] = g["calendarId"];
        if (g["courseGroupEmail"] !== undefined) {
          body["courseGroupEmail"] = g["courseGroupEmail"];
        }
        if (g["courseState"] !== undefined) {
          body["courseState"] = g["courseState"];
        }
        if (g["creationTime"] !== undefined) {
          body["creationTime"] = g["creationTime"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["descriptionHeading"] !== undefined) {
          body["descriptionHeading"] = g["descriptionHeading"];
        }
        if (g["enrollmentCode"] !== undefined) {
          body["enrollmentCode"] = g["enrollmentCode"];
        }
        if (g["gradebookSettings"] !== undefined) {
          body["gradebookSettings"] = g["gradebookSettings"];
        }
        if (g["guardiansEnabled"] !== undefined) {
          body["guardiansEnabled"] = g["guardiansEnabled"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["ownerId"] !== undefined) body["ownerId"] = g["ownerId"];
        if (g["room"] !== undefined) body["room"] = g["room"];
        if (g["section"] !== undefined) body["section"] = g["section"];
        if (g["subject"] !== undefined) body["subject"] = g["subject"];
        if (g["teacherFolder"] !== undefined) {
          body["teacherFolder"] = g["teacherFolder"];
        }
        if (g["teacherGroupEmail"] !== undefined) {
          body["teacherGroupEmail"] = g["teacherGroupEmail"];
        }
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
      description: "Delete the courses",
      arguments: z.object({
        identifier: z.string().describe("The id of the courses"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["id"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
        );
        const instanceName = (g.id?.toString() ?? args.identifier).replace(
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
      description: "Sync courses state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.id?.toString() ?? "current").replace(
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
          const identifier = existing.id?.toString() ?? g["id"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["id"] = identifier;
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
      description: "List courses resources",
      arguments: z.object({
        courseStates: z.string().describe(
          "Restricts returned courses to those in one of the specified states The default value is ACTIVE, ARCHIVED, PROVISIONED, DECLINED.",
        ).optional(),
        pageSize: z.number().describe(
          "Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum. The server may return fewer than the specified number of results.",
        ).optional(),
        studentId: z.string().describe(
          'Restricts returned courses to those having a student with the specified identifier. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user',
        ).optional(),
        teacherId: z.string().describe(
          'Restricts returned courses to those having a teacher with the specified identifier. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user',
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (args["courseStates"] !== undefined) {
          params["courseStates"] = String(args["courseStates"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["studentId"] !== undefined) {
          params["studentId"] = String(args["studentId"]);
        }
        if (args["teacherId"] !== undefined) {
          params["teacherId"] = String(args["teacherId"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "courses",
          (args.maxPages as number | undefined) ?? 10,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.id?.toString() ?? String(i)).replace(
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
    get_grading_period_settings: {
      description: "get grading period settings",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.id?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["courseId"] = existing["id"]?.toString() ??
          g["id"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "classroom.courses.getGradingPeriodSettings",
            "path": "v1/courses/{courseId}/gradingPeriodSettings",
            "httpMethod": "GET",
            "parameterOrder": ["courseId"],
            "parameters": {
              "courseId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    update_grading_period_settings: {
      description: "update grading period settings",
      arguments: z.object({
        applyToExistingCoursework: z.any().optional(),
        gradingPeriods: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.id?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["courseId"] = existing["id"]?.toString() ??
          g["id"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["applyToExistingCoursework"] !== undefined) {
          body["applyToExistingCoursework"] = args["applyToExistingCoursework"];
        }
        if (args["gradingPeriods"] !== undefined) {
          body["gradingPeriods"] = args["gradingPeriods"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "classroom.courses.updateGradingPeriodSettings",
            "path": "v1/courses/{courseId}/gradingPeriodSettings",
            "httpMethod": "PATCH",
            "parameterOrder": ["courseId"],
            "parameters": {
              "courseId": { "location": "path", "required": true },
              "updateMask": { "location": "query" },
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
