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

// Auto-generated extension model for @swamp/gcp/classroom/courses-coursework-studentsubmissions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Classroom Courses.CourseWork.StudentSubmissions.
 *
 * Student submission for course work. `StudentSubmission` items are generated when a `CourseWork` item is created. Student submissions that have never been accessed (i.e. with `state` = NEW) may not have a creation time or update time.
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://classroom.googleapis.com/";

const GET_CONFIG = {
  "id": "classroom.courses.courseWork.studentSubmissions.get",
  "path":
    "v1/courses/{courseId}/courseWork/{courseWorkId}/studentSubmissions/{id}",
  "httpMethod": "GET",
  "parameterOrder": [
    "courseId",
    "courseWorkId",
    "id",
  ],
  "parameters": {
    "courseId": {
      "location": "path",
      "required": true,
    },
    "courseWorkId": {
      "location": "path",
      "required": true,
    },
    "id": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "classroom.courses.courseWork.studentSubmissions.patch",
  "path":
    "v1/courses/{courseId}/courseWork/{courseWorkId}/studentSubmissions/{id}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "courseId",
    "courseWorkId",
    "id",
  ],
  "parameters": {
    "courseId": {
      "location": "path",
      "required": true,
    },
    "courseWorkId": {
      "location": "path",
      "required": true,
    },
    "id": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "classroom.courses.courseWork.studentSubmissions.list",
  "path": "v1/courses/{courseId}/courseWork/{courseWorkId}/studentSubmissions",
  "httpMethod": "GET",
  "parameterOrder": [
    "courseId",
    "courseWorkId",
  ],
  "parameters": {
    "courseId": {
      "location": "path",
      "required": true,
    },
    "courseWorkId": {
      "location": "path",
      "required": true,
    },
    "late": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "states": {
      "location": "query",
    },
    "userId": {
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
  alternateLink: z.string().describe(
    "Absolute link to the submission in the Classroom web UI. Read-only.",
  ).optional(),
  assignedGrade: z.number().describe(
    "Optional grade. If unset, no grade was set. This value must be non-negative. Decimal (that is, non-integer) values are allowed, but are rounded to two decimal places. This may be modified only by course teachers.",
  ).optional(),
  assignedRubricGrades: z.record(
    z.string(),
    z.object({
      criterionId: z.string().describe("Optional. Criterion ID.").optional(),
      levelId: z.string().describe(
        "Optional. Optional level ID of the selected level. If empty, no level was selected.",
      ).optional(),
      points: z.number().describe(
        "Optional. Optional points assigned for this criterion, typically based on the level. Levels might or might not have points. If unset, no points were set for this criterion.",
      ).optional(),
    }),
  ).describe(
    "Assigned rubric grades based on the rubric's Criteria. This map is empty if there is no rubric attached to this course work or if a rubric is attached, but no grades have been set on any Criteria. Entries are only populated for grades that have been set. Key: The rubric's criterion ID. Read-only.",
  ).optional(),
  assignmentSubmission: z.object({
    attachments: z.array(z.object({
      driveFile: z.object({
        alternateLink: z.string().describe(
          "URL that can be used to access the Drive item. Read-only.",
        ).optional(),
        id: z.string().describe("Drive API resource ID.").optional(),
        thumbnailUrl: z.string().describe(
          "URL of a thumbnail image of the Drive item. Read-only.",
        ).optional(),
        title: z.string().describe("Title of the Drive item. Read-only.")
          .optional(),
      }).describe("Representation of a Google Drive file.").optional(),
      form: z.object({
        formUrl: z.string().describe("URL of the form.").optional(),
        responseUrl: z.string().describe(
          "URL of the form responses document. Only set if responses have been recorded and only when the requesting user is an editor of the form. Read-only.",
        ).optional(),
        thumbnailUrl: z.string().describe(
          "URL of a thumbnail image of the Form. Read-only.",
        ).optional(),
        title: z.string().describe("Title of the Form. Read-only.").optional(),
      }).describe("Google Forms item.").optional(),
      link: z.object({
        thumbnailUrl: z.string().describe(
          "URL of a thumbnail image of the target URL. Read-only.",
        ).optional(),
        title: z.string().describe("Title of the target of the URL. Read-only.")
          .optional(),
        url: z.string().describe(
          "URL to link to. This must be a valid UTF-8 string containing between 1 and 2024 characters.",
        ).optional(),
      }).describe("URL item.").optional(),
      youTubeVideo: z.object({
        alternateLink: z.string().describe(
          "URL that can be used to view the YouTube video. Read-only.",
        ).optional(),
        id: z.string().describe("YouTube API resource ID.").optional(),
        thumbnailUrl: z.string().describe(
          "URL of a thumbnail image of the YouTube video. Read-only.",
        ).optional(),
        title: z.string().describe("Title of the YouTube video. Read-only.")
          .optional(),
      }).describe("YouTube video item.").optional(),
    })).describe(
      "Attachments added by the student. Drive files that correspond to materials with a share mode of STUDENT_COPY may not exist yet if the student has not accessed the assignment in Classroom. Some attachment metadata is only populated if the requesting user has permission to access it. Identifier and alternate_link fields are always available, but others (for example, title) may not be.",
    ).optional(),
  }).describe("Student work for an assignment.").optional(),
  associatedWithDeveloper: z.boolean().describe(
    "Whether this student submission is associated with the Developer Console project making the request. See CreateCourseWork for more details. Read-only.",
  ).optional(),
  courseId: z.string().describe("Identifier of the course. Read-only.")
    .optional(),
  courseWorkId: z.string().describe(
    "Identifier for the course work this corresponds to. Read-only.",
  ).optional(),
  courseWorkType: z.enum([
    "COURSE_WORK_TYPE_UNSPECIFIED",
    "ASSIGNMENT",
    "SHORT_ANSWER_QUESTION",
    "MULTIPLE_CHOICE_QUESTION",
  ]).describe("Type of course work this submission is for. Read-only.")
    .optional(),
  creationTime: z.string().describe(
    "Creation time of this submission. This may be unset if the student has not accessed this item. Read-only.",
  ).optional(),
  draftGrade: z.number().describe(
    "Optional pending grade. If unset, no grade was set. This value must be non-negative. Decimal (that is, non-integer) values are allowed, but are rounded to two decimal places. This is only visible to and modifiable by course teachers.",
  ).optional(),
  draftRubricGrades: z.record(
    z.string(),
    z.object({
      criterionId: z.string().describe("Optional. Criterion ID.").optional(),
      levelId: z.string().describe(
        "Optional. Optional level ID of the selected level. If empty, no level was selected.",
      ).optional(),
      points: z.number().describe(
        "Optional. Optional points assigned for this criterion, typically based on the level. Levels might or might not have points. If unset, no points were set for this criterion.",
      ).optional(),
    }),
  ).describe(
    "Pending rubric grades based on the rubric's criteria. This map is empty if there is no rubric attached to this course work or if a rubric is attached, but no grades have been set on any criteria. Entries are only populated for grades that have been set. Key: The rubric's criterion ID. Read-only.",
  ).optional(),
  id: z.string().describe(
    "Classroom-assigned Identifier for the student submission. This is unique among submissions for the relevant course work. Read-only.",
  ).optional(),
  late: z.boolean().describe("Whether this submission is late. Read-only.")
    .optional(),
  multipleChoiceSubmission: z.object({
    answer: z.string().describe("Student's select choice.").optional(),
  }).describe("Student work for a multiple-choice question.").optional(),
  shortAnswerSubmission: z.object({
    answer: z.string().describe("Student response to a short-answer question.")
      .optional(),
  }).describe("Student work for a short answer question.").optional(),
  state: z.enum([
    "SUBMISSION_STATE_UNSPECIFIED",
    "NEW",
    "CREATED",
    "TURNED_IN",
    "RETURNED",
    "RECLAIMED_BY_STUDENT",
  ]).describe("State of this submission. Read-only.").optional(),
  submissionHistory: z.array(z.object({
    gradeHistory: z.object({
      actorUserId: z.string().describe("The teacher who made the grade change.")
        .optional(),
      gradeChangeType: z.enum([
        "UNKNOWN_GRADE_CHANGE_TYPE",
        "DRAFT_GRADE_POINTS_EARNED_CHANGE",
        "ASSIGNED_GRADE_POINTS_EARNED_CHANGE",
        "MAX_POINTS_CHANGE",
      ]).describe(
        "The type of grade change at this time in the submission grade history.",
      ).optional(),
      gradeTimestamp: z.string().describe(
        "When the grade of the submission was changed.",
      ).optional(),
      maxPoints: z.number().describe(
        "The denominator of the grade at this time in the submission grade history.",
      ).optional(),
      pointsEarned: z.number().describe(
        "The numerator of the grade at this time in the submission grade history.",
      ).optional(),
    }).describe("The history of each grade on this submission.").optional(),
    stateHistory: z.object({
      actorUserId: z.string().describe(
        "The teacher or student who made the change.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "CREATED",
        "TURNED_IN",
        "RETURNED",
        "RECLAIMED_BY_STUDENT",
        "STUDENT_EDITED_AFTER_TURN_IN",
      ]).describe("The workflow pipeline stage.").optional(),
      stateTimestamp: z.string().describe(
        "When the submission entered this state.",
      ).optional(),
    }).describe("The history of each state this submission has been in.")
      .optional(),
  })).describe(
    "The history of the submission (includes state and grade histories). Read-only.",
  ).optional(),
  updateTime: z.string().describe(
    "Last update time of this submission. This may be unset if the student has not accessed this item. Read-only.",
  ).optional(),
  userId: z.string().describe(
    "Identifier for the student that owns this submission. Read-only.",
  ).optional(),
});

const StateSchema = z.object({
  alternateLink: z.string().optional(),
  assignedGrade: z.number().optional(),
  assignedRubricGrades: z.record(z.string(), z.unknown()).optional(),
  assignmentSubmission: z.object({
    attachments: z.array(z.object({
      driveFile: z.object({
        alternateLink: z.string(),
        id: z.string(),
        thumbnailUrl: z.string(),
        title: z.string(),
      }),
      form: z.object({
        formUrl: z.string(),
        responseUrl: z.string(),
        thumbnailUrl: z.string(),
        title: z.string(),
      }),
      link: z.object({
        thumbnailUrl: z.string(),
        title: z.string(),
        url: z.string(),
      }),
      youTubeVideo: z.object({
        alternateLink: z.string(),
        id: z.string(),
        thumbnailUrl: z.string(),
        title: z.string(),
      }),
    })),
  }).optional(),
  associatedWithDeveloper: z.boolean().optional(),
  courseId: z.string().optional(),
  courseWorkId: z.string().optional(),
  courseWorkType: z.string().optional(),
  creationTime: z.string().optional(),
  draftGrade: z.number().optional(),
  draftRubricGrades: z.record(z.string(), z.unknown()).optional(),
  id: z.string(),
  late: z.boolean().optional(),
  multipleChoiceSubmission: z.object({
    answer: z.string(),
  }).optional(),
  shortAnswerSubmission: z.object({
    answer: z.string(),
  }).optional(),
  state: z.string().optional(),
  submissionHistory: z.array(z.object({
    gradeHistory: z.object({
      actorUserId: z.string(),
      gradeChangeType: z.string(),
      gradeTimestamp: z.string(),
      maxPoints: z.number(),
      pointsEarned: z.number(),
    }),
    stateHistory: z.object({
      actorUserId: z.string(),
      state: z.string(),
      stateTimestamp: z.string(),
    }),
  })).optional(),
  updateTime: z.string().optional(),
  userId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  alternateLink: z.string().describe(
    "Absolute link to the submission in the Classroom web UI. Read-only.",
  ).optional(),
  assignedGrade: z.number().describe(
    "Optional grade. If unset, no grade was set. This value must be non-negative. Decimal (that is, non-integer) values are allowed, but are rounded to two decimal places. This may be modified only by course teachers.",
  ).optional(),
  assignedRubricGrades: z.record(
    z.string(),
    z.object({
      criterionId: z.string().describe("Optional. Criterion ID.").optional(),
      levelId: z.string().describe(
        "Optional. Optional level ID of the selected level. If empty, no level was selected.",
      ).optional(),
      points: z.number().describe(
        "Optional. Optional points assigned for this criterion, typically based on the level. Levels might or might not have points. If unset, no points were set for this criterion.",
      ).optional(),
    }),
  ).describe(
    "Assigned rubric grades based on the rubric's Criteria. This map is empty if there is no rubric attached to this course work or if a rubric is attached, but no grades have been set on any Criteria. Entries are only populated for grades that have been set. Key: The rubric's criterion ID. Read-only.",
  ).optional(),
  assignmentSubmission: z.object({
    attachments: z.array(z.object({
      driveFile: z.object({
        alternateLink: z.string().describe(
          "URL that can be used to access the Drive item. Read-only.",
        ).optional(),
        id: z.string().describe("Drive API resource ID.").optional(),
        thumbnailUrl: z.string().describe(
          "URL of a thumbnail image of the Drive item. Read-only.",
        ).optional(),
        title: z.string().describe("Title of the Drive item. Read-only.")
          .optional(),
      }).describe("Representation of a Google Drive file.").optional(),
      form: z.object({
        formUrl: z.string().describe("URL of the form.").optional(),
        responseUrl: z.string().describe(
          "URL of the form responses document. Only set if responses have been recorded and only when the requesting user is an editor of the form. Read-only.",
        ).optional(),
        thumbnailUrl: z.string().describe(
          "URL of a thumbnail image of the Form. Read-only.",
        ).optional(),
        title: z.string().describe("Title of the Form. Read-only.").optional(),
      }).describe("Google Forms item.").optional(),
      link: z.object({
        thumbnailUrl: z.string().describe(
          "URL of a thumbnail image of the target URL. Read-only.",
        ).optional(),
        title: z.string().describe("Title of the target of the URL. Read-only.")
          .optional(),
        url: z.string().describe(
          "URL to link to. This must be a valid UTF-8 string containing between 1 and 2024 characters.",
        ).optional(),
      }).describe("URL item.").optional(),
      youTubeVideo: z.object({
        alternateLink: z.string().describe(
          "URL that can be used to view the YouTube video. Read-only.",
        ).optional(),
        id: z.string().describe("YouTube API resource ID.").optional(),
        thumbnailUrl: z.string().describe(
          "URL of a thumbnail image of the YouTube video. Read-only.",
        ).optional(),
        title: z.string().describe("Title of the YouTube video. Read-only.")
          .optional(),
      }).describe("YouTube video item.").optional(),
    })).describe(
      "Attachments added by the student. Drive files that correspond to materials with a share mode of STUDENT_COPY may not exist yet if the student has not accessed the assignment in Classroom. Some attachment metadata is only populated if the requesting user has permission to access it. Identifier and alternate_link fields are always available, but others (for example, title) may not be.",
    ).optional(),
  }).describe("Student work for an assignment.").optional(),
  associatedWithDeveloper: z.boolean().describe(
    "Whether this student submission is associated with the Developer Console project making the request. See CreateCourseWork for more details. Read-only.",
  ).optional(),
  courseId: z.string().describe("Identifier of the course. Read-only.")
    .optional(),
  courseWorkId: z.string().describe(
    "Identifier for the course work this corresponds to. Read-only.",
  ).optional(),
  courseWorkType: z.enum([
    "COURSE_WORK_TYPE_UNSPECIFIED",
    "ASSIGNMENT",
    "SHORT_ANSWER_QUESTION",
    "MULTIPLE_CHOICE_QUESTION",
  ]).describe("Type of course work this submission is for. Read-only.")
    .optional(),
  creationTime: z.string().describe(
    "Creation time of this submission. This may be unset if the student has not accessed this item. Read-only.",
  ).optional(),
  draftGrade: z.number().describe(
    "Optional pending grade. If unset, no grade was set. This value must be non-negative. Decimal (that is, non-integer) values are allowed, but are rounded to two decimal places. This is only visible to and modifiable by course teachers.",
  ).optional(),
  draftRubricGrades: z.record(
    z.string(),
    z.object({
      criterionId: z.string().describe("Optional. Criterion ID.").optional(),
      levelId: z.string().describe(
        "Optional. Optional level ID of the selected level. If empty, no level was selected.",
      ).optional(),
      points: z.number().describe(
        "Optional. Optional points assigned for this criterion, typically based on the level. Levels might or might not have points. If unset, no points were set for this criterion.",
      ).optional(),
    }),
  ).describe(
    "Pending rubric grades based on the rubric's criteria. This map is empty if there is no rubric attached to this course work or if a rubric is attached, but no grades have been set on any criteria. Entries are only populated for grades that have been set. Key: The rubric's criterion ID. Read-only.",
  ).optional(),
  id: z.string().describe(
    "Classroom-assigned Identifier for the student submission. This is unique among submissions for the relevant course work. Read-only.",
  ).optional(),
  late: z.boolean().describe("Whether this submission is late. Read-only.")
    .optional(),
  multipleChoiceSubmission: z.object({
    answer: z.string().describe("Student's select choice.").optional(),
  }).describe("Student work for a multiple-choice question.").optional(),
  shortAnswerSubmission: z.object({
    answer: z.string().describe("Student response to a short-answer question.")
      .optional(),
  }).describe("Student work for a short answer question.").optional(),
  state: z.enum([
    "SUBMISSION_STATE_UNSPECIFIED",
    "NEW",
    "CREATED",
    "TURNED_IN",
    "RETURNED",
    "RECLAIMED_BY_STUDENT",
  ]).describe("State of this submission. Read-only.").optional(),
  submissionHistory: z.array(z.object({
    gradeHistory: z.object({
      actorUserId: z.string().describe("The teacher who made the grade change.")
        .optional(),
      gradeChangeType: z.enum([
        "UNKNOWN_GRADE_CHANGE_TYPE",
        "DRAFT_GRADE_POINTS_EARNED_CHANGE",
        "ASSIGNED_GRADE_POINTS_EARNED_CHANGE",
        "MAX_POINTS_CHANGE",
      ]).describe(
        "The type of grade change at this time in the submission grade history.",
      ).optional(),
      gradeTimestamp: z.string().describe(
        "When the grade of the submission was changed.",
      ).optional(),
      maxPoints: z.number().describe(
        "The denominator of the grade at this time in the submission grade history.",
      ).optional(),
      pointsEarned: z.number().describe(
        "The numerator of the grade at this time in the submission grade history.",
      ).optional(),
    }).describe("The history of each grade on this submission.").optional(),
    stateHistory: z.object({
      actorUserId: z.string().describe(
        "The teacher or student who made the change.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "CREATED",
        "TURNED_IN",
        "RETURNED",
        "RECLAIMED_BY_STUDENT",
        "STUDENT_EDITED_AFTER_TURN_IN",
      ]).describe("The workflow pipeline stage.").optional(),
      stateTimestamp: z.string().describe(
        "When the submission entered this state.",
      ).optional(),
    }).describe("The history of each state this submission has been in.")
      .optional(),
  })).describe(
    "The history of the submission (includes state and grade histories). Read-only.",
  ).optional(),
  updateTime: z.string().describe(
    "Last update time of this submission. This may be unset if the student has not accessed this item. Read-only.",
  ).optional(),
  userId: z.string().describe(
    "Identifier for the student that owns this submission. Read-only.",
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

/** Swamp extension model for Google Cloud Google Classroom Courses.CourseWork.StudentSubmissions. Registered at `@swamp/gcp/classroom/courses-coursework-studentsubmissions`. */
export const model = {
  type: "@swamp/gcp/classroom/courses-coursework-studentsubmissions",
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
        "Student submission for course work. `StudentSubmission` items are generated w...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a studentSubmissions",
      arguments: z.object({
        identifier: z.string().describe("The id of the studentSubmissions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        }
        if (g["courseWorkId"] !== undefined) {
          params["courseWorkId"] = String(g["courseWorkId"]);
        }
        params["id"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Update studentSubmissions attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        } else if (existing["courseId"]) {
          params["courseId"] = String(existing["courseId"]);
        }
        if (g["courseWorkId"] !== undefined) {
          params["courseWorkId"] = String(g["courseWorkId"]);
        } else if (existing["courseWorkId"]) {
          params["courseWorkId"] = String(existing["courseWorkId"]);
        }
        params["id"] = existing["id"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["alternateLink"] !== undefined) {
          body["alternateLink"] = g["alternateLink"];
        }
        if (g["assignedGrade"] !== undefined) {
          body["assignedGrade"] = g["assignedGrade"];
        }
        if (g["assignedRubricGrades"] !== undefined) {
          body["assignedRubricGrades"] = g["assignedRubricGrades"];
        }
        if (g["assignmentSubmission"] !== undefined) {
          body["assignmentSubmission"] = g["assignmentSubmission"];
        }
        if (g["associatedWithDeveloper"] !== undefined) {
          body["associatedWithDeveloper"] = g["associatedWithDeveloper"];
        }
        if (g["courseWorkType"] !== undefined) {
          body["courseWorkType"] = g["courseWorkType"];
        }
        if (g["creationTime"] !== undefined) {
          body["creationTime"] = g["creationTime"];
        }
        if (g["draftGrade"] !== undefined) body["draftGrade"] = g["draftGrade"];
        if (g["draftRubricGrades"] !== undefined) {
          body["draftRubricGrades"] = g["draftRubricGrades"];
        }
        if (g["late"] !== undefined) body["late"] = g["late"];
        if (g["multipleChoiceSubmission"] !== undefined) {
          body["multipleChoiceSubmission"] = g["multipleChoiceSubmission"];
        }
        if (g["shortAnswerSubmission"] !== undefined) {
          body["shortAnswerSubmission"] = g["shortAnswerSubmission"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["submissionHistory"] !== undefined) {
          body["submissionHistory"] = g["submissionHistory"];
        }
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
        if (g["userId"] !== undefined) body["userId"] = g["userId"];
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
    sync: {
      description: "Sync studentSubmissions state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          if (g["courseId"] !== undefined) {
            params["courseId"] = String(g["courseId"]);
          } else if (existing["courseId"]) {
            params["courseId"] = String(existing["courseId"]);
          }
          if (g["courseWorkId"] !== undefined) {
            params["courseWorkId"] = String(g["courseWorkId"]);
          } else if (existing["courseWorkId"]) {
            params["courseWorkId"] = String(existing["courseWorkId"]);
          }
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
      description: "List studentSubmissions resources",
      arguments: z.object({
        late: z.string().describe(
          "Requested lateness value. If specified, returned student submissions are restricted by the requested value. If unspecified, submissions are returned regardless of `late` value.",
        ).optional(),
        pageSize: z.number().describe(
          "Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum. The server may return fewer than the specified number of results.",
        ).optional(),
        states: z.string().describe(
          "Requested submission states. If specified, returned student submissions match one of the specified submission states.",
        ).optional(),
        userId: z.string().describe(
          'Optional argument to restrict returned student work to those owned by the student with the specified identifier. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user',
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
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        }
        if (g["courseWorkId"] !== undefined) {
          params["courseWorkId"] = String(g["courseWorkId"]);
        }
        if (args["late"] !== undefined) params["late"] = String(args["late"]);
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["states"] !== undefined) {
          params["states"] = String(args["states"]);
        }
        if (args["userId"] !== undefined) {
          params["userId"] = String(args["userId"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "studentSubmissions",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
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
    modify_attachments: {
      description: "modify attachments",
      arguments: z.object({
        addAttachments: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        }
        if (g["courseWorkId"] !== undefined) {
          params["courseWorkId"] = String(g["courseWorkId"]);
        }
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
        const body: Record<string, unknown> = {};
        if (args["addAttachments"] !== undefined) {
          body["addAttachments"] = args["addAttachments"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "classroom.courses.courseWork.studentSubmissions.modifyAttachments",
            "path":
              "v1/courses/{courseId}/courseWork/{courseWorkId}/studentSubmissions/{id}:modifyAttachments",
            "httpMethod": "POST",
            "parameterOrder": ["courseId", "courseWorkId", "id"],
            "parameters": {
              "courseId": { "location": "path", "required": true },
              "courseWorkId": { "location": "path", "required": true },
              "id": { "location": "path", "required": true },
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
    reclaim: {
      description: "reclaim",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        }
        if (g["courseWorkId"] !== undefined) {
          params["courseWorkId"] = String(g["courseWorkId"]);
        }
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "classroom.courses.courseWork.studentSubmissions.reclaim",
            "path":
              "v1/courses/{courseId}/courseWork/{courseWorkId}/studentSubmissions/{id}:reclaim",
            "httpMethod": "POST",
            "parameterOrder": ["courseId", "courseWorkId", "id"],
            "parameters": {
              "courseId": { "location": "path", "required": true },
              "courseWorkId": { "location": "path", "required": true },
              "id": { "location": "path", "required": true },
            },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    return: {
      description: "return",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        }
        if (g["courseWorkId"] !== undefined) {
          params["courseWorkId"] = String(g["courseWorkId"]);
        }
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "classroom.courses.courseWork.studentSubmissions.return",
            "path":
              "v1/courses/{courseId}/courseWork/{courseWorkId}/studentSubmissions/{id}:return",
            "httpMethod": "POST",
            "parameterOrder": ["courseId", "courseWorkId", "id"],
            "parameters": {
              "courseId": { "location": "path", "required": true },
              "courseWorkId": { "location": "path", "required": true },
              "id": { "location": "path", "required": true },
            },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    turn_in: {
      description: "turn in",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        }
        if (g["courseWorkId"] !== undefined) {
          params["courseWorkId"] = String(g["courseWorkId"]);
        }
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "classroom.courses.courseWork.studentSubmissions.turnIn",
            "path":
              "v1/courses/{courseId}/courseWork/{courseWorkId}/studentSubmissions/{id}:turnIn",
            "httpMethod": "POST",
            "parameterOrder": ["courseId", "courseWorkId", "id"],
            "parameters": {
              "courseId": { "location": "path", "required": true },
              "courseWorkId": { "location": "path", "required": true },
              "id": { "location": "path", "required": true },
            },
          },
          params,
          {},
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
