// Auto-generated extension model for @swamp/gcp/classroom/courses-coursework
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Classroom Courses.CourseWork.
 *
 * Course work created by a teacher for students of the course.
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

const BASE_URL = "https://classroom.googleapis.com/";

const GET_CONFIG = {
  "id": "classroom.courses.courseWork.get",
  "path": "v1/courses/{courseId}/courseWork/{id}",
  "httpMethod": "GET",
  "parameterOrder": [
    "courseId",
    "id",
  ],
  "parameters": {
    "courseId": {
      "location": "path",
      "required": true,
    },
    "id": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "classroom.courses.courseWork.create",
  "path": "v1/courses/{courseId}/courseWork",
  "httpMethod": "POST",
  "parameterOrder": [
    "courseId",
  ],
  "parameters": {
    "courseId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "classroom.courses.courseWork.patch",
  "path": "v1/courses/{courseId}/courseWork/{id}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "courseId",
    "id",
  ],
  "parameters": {
    "courseId": {
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

const DELETE_CONFIG = {
  "id": "classroom.courses.courseWork.delete",
  "path": "v1/courses/{courseId}/courseWork/{id}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "courseId",
    "id",
  ],
  "parameters": {
    "courseId": {
      "location": "path",
      "required": true,
    },
    "id": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "classroom.courses.courseWork.list",
  "path": "v1/courses/{courseId}/courseWork",
  "httpMethod": "GET",
  "parameterOrder": [
    "courseId",
  ],
  "parameters": {
    "courseId": {
      "location": "path",
      "required": true,
    },
    "courseWorkStates": {
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
  },
} as const;

const GlobalArgsSchema = z.object({
  alternateLink: z.string().describe(
    "Absolute link to this course work in the Classroom web UI. This is only populated if `state` is `PUBLISHED`. Read-only.",
  ).optional(),
  assigneeMode: z.enum([
    "ASSIGNEE_MODE_UNSPECIFIED",
    "ALL_STUDENTS",
    "INDIVIDUAL_STUDENTS",
  ]).describe(
    "Assignee mode of the coursework. If unspecified, the default value is `ALL_STUDENTS`.",
  ).optional(),
  assignment: z.object({
    studentWorkFolder: z.object({
      alternateLink: z.string().describe(
        "URL that can be used to access the Drive folder. Read-only.",
      ).optional(),
      id: z.string().describe("Drive API resource ID.").optional(),
      title: z.string().describe("Title of the Drive folder. Read-only.")
        .optional(),
    }).describe("Representation of a Google Drive folder.").optional(),
  }).describe("Additional details for assignments.").optional(),
  associatedWithDeveloper: z.boolean().describe(
    "Whether this course work item is associated with the Developer Console project making the request. See CreateCourseWork for more details. Read-only.",
  ).optional(),
  courseId: z.string().describe("Identifier of the course. Read-only.")
    .optional(),
  creationTime: z.string().describe(
    "Timestamp when this course work was created. Read-only.",
  ).optional(),
  creatorUserId: z.string().describe(
    "Identifier for the user that created the coursework. Read-only.",
  ).optional(),
  description: z.string().describe(
    "Optional description of this course work. If set, the description must be a valid UTF-8 string containing no more than 30,000 characters.",
  ).optional(),
  dueDate: z.object({
    day: z.number().int().describe(
      "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
    ).optional(),
    month: z.number().int().describe(
      "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
    ).optional(),
    year: z.number().int().describe(
      "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
    ).optional(),
  }).describe(
    "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
  ).optional(),
  dueTime: z.object({
    hours: z.number().int().describe(
      'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
    ).optional(),
    minutes: z.number().int().describe(
      "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
    ).optional(),
    nanos: z.number().int().describe(
      "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
    ).optional(),
    seconds: z.number().int().describe(
      "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
    ).optional(),
  }).describe(
    "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
  ).optional(),
  gradeCategory: z.object({
    defaultGradeDenominator: z.number().int().describe(
      "Default value of denominator. Only applicable when grade calculation type is TOTAL_POINTS.",
    ).optional(),
    id: z.string().describe("ID of the grade category.").optional(),
    name: z.string().describe("Name of the grade category.").optional(),
    weight: z.number().int().describe(
      "The weight of the category average as part of overall average. A weight of 12.34% is represented as 123400 (100% is 1,000,000). The last two digits should always be zero since we use two decimal precision. Only applicable when grade calculation type is WEIGHTED_CATEGORIES.",
    ).optional(),
  }).describe(
    "Details for a grade category in a course. Coursework may have zero or one grade category, and the category may be used in computing the overall grade. See the [help center article](https://support.google.com/edu/classroom/answer/9184995) for details.",
  ).optional(),
  gradingPeriodId: z.string().describe(
    'Identifier of the grading period associated with the coursework. * At creation, if unspecified, the grading period ID will be set based on the `dueDate` (or `scheduledTime` if no `dueDate` is set). * To indicate no association to any grading period, set this field to an empty string (""). * If specified, it must match an existing grading period ID in the course.',
  ).optional(),
  id: z.string().describe(
    "Classroom-assigned identifier of this course work, unique per course. Read-only.",
  ).optional(),
  individualStudentsOptions: z.object({
    studentIds: z.array(z.string()).describe(
      "Identifiers for the students that have access to the coursework/announcement.",
    ).optional(),
  }).describe(
    "Assignee details about a coursework/announcement. This field is set if and only if `assigneeMode` is `INDIVIDUAL_STUDENTS`.",
  ).optional(),
  materials: z.array(z.object({
    driveFile: z.object({
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
      shareMode: z.enum(["UNKNOWN_SHARE_MODE", "VIEW", "EDIT", "STUDENT_COPY"])
        .describe("Mechanism by which students access the Drive item.")
        .optional(),
    }).describe("Drive file that is used as material for course work.")
      .optional(),
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
    gem: z.object({
      id: z.string().describe("Gems resource id.").optional(),
      title: z.string().describe("Title of the Gem.").optional(),
      url: z.string().describe("URL that can be used to access the Gem.")
        .optional(),
    }).describe("Gemini Gem link.").optional(),
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
    notebook: z.object({
      id: z.string().describe("Notebook resource id.").optional(),
      title: z.string().describe("Title of the Notebook.").optional(),
      url: z.string().describe("URL that can be used to access the Notebook.")
        .optional(),
    }).describe("NotebookLM Notebook link.").optional(),
    youtubeVideo: z.object({
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
    "Additional materials. CourseWork must have no more than 20 material items.",
  ).optional(),
  maxPoints: z.number().describe(
    "Maximum grade for this course work. If zero or unspecified, this assignment is considered ungraded. This must be a non-negative integer value.",
  ).optional(),
  multipleChoiceQuestion: z.object({
    choices: z.array(z.string()).describe("Possible choices.").optional(),
  }).describe("Additional details for multiple-choice questions.").optional(),
  scheduledTime: z.string().describe(
    "Optional timestamp when this course work is scheduled to be published.",
  ).optional(),
  state: z.enum([
    "COURSE_WORK_STATE_UNSPECIFIED",
    "PUBLISHED",
    "DRAFT",
    "DELETED",
  ]).describe(
    "Status of this course work. If unspecified, the default state is `DRAFT`.",
  ).optional(),
  submissionModificationMode: z.enum([
    "SUBMISSION_MODIFICATION_MODE_UNSPECIFIED",
    "MODIFIABLE_UNTIL_TURNED_IN",
    "MODIFIABLE",
  ]).describe(
    "Setting to determine when students are allowed to modify submissions. If unspecified, the default value is `MODIFIABLE_UNTIL_TURNED_IN`.",
  ).optional(),
  title: z.string().describe(
    "Title of this course work. The title must be a valid UTF-8 string containing between 1 and 3000 characters.",
  ).optional(),
  topicId: z.string().describe(
    "Identifier for the topic that this coursework is associated with. Must match an existing topic in the course.",
  ).optional(),
  updateTime: z.string().describe(
    "Timestamp of the most recent change to this course work. Read-only.",
  ).optional(),
  workType: z.enum([
    "COURSE_WORK_TYPE_UNSPECIFIED",
    "ASSIGNMENT",
    "SHORT_ANSWER_QUESTION",
    "MULTIPLE_CHOICE_QUESTION",
  ]).describe(
    "Type of this course work. The type is set when the course work is created and cannot be changed.",
  ).optional(),
});

const StateSchema = z.object({
  alternateLink: z.string().optional(),
  assigneeMode: z.string().optional(),
  assignment: z.object({
    studentWorkFolder: z.object({
      alternateLink: z.string(),
      id: z.string(),
      title: z.string(),
    }),
  }).optional(),
  associatedWithDeveloper: z.boolean().optional(),
  courseId: z.string().optional(),
  creationTime: z.string().optional(),
  creatorUserId: z.string().optional(),
  description: z.string().optional(),
  dueDate: z.object({
    day: z.number(),
    month: z.number(),
    year: z.number(),
  }).optional(),
  dueTime: z.object({
    hours: z.number(),
    minutes: z.number(),
    nanos: z.number(),
    seconds: z.number(),
  }).optional(),
  gradeCategory: z.object({
    defaultGradeDenominator: z.number(),
    id: z.string(),
    name: z.string(),
    weight: z.number(),
  }).optional(),
  gradingPeriodId: z.string().optional(),
  id: z.string(),
  individualStudentsOptions: z.object({
    studentIds: z.array(z.string()),
  }).optional(),
  materials: z.array(z.object({
    driveFile: z.object({
      driveFile: z.object({
        alternateLink: z.string(),
        id: z.string(),
        thumbnailUrl: z.string(),
        title: z.string(),
      }),
      shareMode: z.string(),
    }),
    form: z.object({
      formUrl: z.string(),
      responseUrl: z.string(),
      thumbnailUrl: z.string(),
      title: z.string(),
    }),
    gem: z.object({
      id: z.string(),
      title: z.string(),
      url: z.string(),
    }),
    link: z.object({
      thumbnailUrl: z.string(),
      title: z.string(),
      url: z.string(),
    }),
    notebook: z.object({
      id: z.string(),
      title: z.string(),
      url: z.string(),
    }),
    youtubeVideo: z.object({
      alternateLink: z.string(),
      id: z.string(),
      thumbnailUrl: z.string(),
      title: z.string(),
    }),
  })).optional(),
  maxPoints: z.number().optional(),
  multipleChoiceQuestion: z.object({
    choices: z.array(z.string()),
  }).optional(),
  scheduledTime: z.string().optional(),
  state: z.string().optional(),
  submissionModificationMode: z.string().optional(),
  title: z.string().optional(),
  topicId: z.string().optional(),
  updateTime: z.string().optional(),
  workType: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  alternateLink: z.string().describe(
    "Absolute link to this course work in the Classroom web UI. This is only populated if `state` is `PUBLISHED`. Read-only.",
  ).optional(),
  assigneeMode: z.enum([
    "ASSIGNEE_MODE_UNSPECIFIED",
    "ALL_STUDENTS",
    "INDIVIDUAL_STUDENTS",
  ]).describe(
    "Assignee mode of the coursework. If unspecified, the default value is `ALL_STUDENTS`.",
  ).optional(),
  assignment: z.object({
    studentWorkFolder: z.object({
      alternateLink: z.string().describe(
        "URL that can be used to access the Drive folder. Read-only.",
      ).optional(),
      id: z.string().describe("Drive API resource ID.").optional(),
      title: z.string().describe("Title of the Drive folder. Read-only.")
        .optional(),
    }).describe("Representation of a Google Drive folder.").optional(),
  }).describe("Additional details for assignments.").optional(),
  associatedWithDeveloper: z.boolean().describe(
    "Whether this course work item is associated with the Developer Console project making the request. See CreateCourseWork for more details. Read-only.",
  ).optional(),
  courseId: z.string().describe("Identifier of the course. Read-only.")
    .optional(),
  creationTime: z.string().describe(
    "Timestamp when this course work was created. Read-only.",
  ).optional(),
  creatorUserId: z.string().describe(
    "Identifier for the user that created the coursework. Read-only.",
  ).optional(),
  description: z.string().describe(
    "Optional description of this course work. If set, the description must be a valid UTF-8 string containing no more than 30,000 characters.",
  ).optional(),
  dueDate: z.object({
    day: z.number().int().describe(
      "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
    ).optional(),
    month: z.number().int().describe(
      "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
    ).optional(),
    year: z.number().int().describe(
      "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
    ).optional(),
  }).describe(
    "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
  ).optional(),
  dueTime: z.object({
    hours: z.number().int().describe(
      'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
    ).optional(),
    minutes: z.number().int().describe(
      "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
    ).optional(),
    nanos: z.number().int().describe(
      "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
    ).optional(),
    seconds: z.number().int().describe(
      "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
    ).optional(),
  }).describe(
    "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
  ).optional(),
  gradeCategory: z.object({
    defaultGradeDenominator: z.number().int().describe(
      "Default value of denominator. Only applicable when grade calculation type is TOTAL_POINTS.",
    ).optional(),
    id: z.string().describe("ID of the grade category.").optional(),
    name: z.string().describe("Name of the grade category.").optional(),
    weight: z.number().int().describe(
      "The weight of the category average as part of overall average. A weight of 12.34% is represented as 123400 (100% is 1,000,000). The last two digits should always be zero since we use two decimal precision. Only applicable when grade calculation type is WEIGHTED_CATEGORIES.",
    ).optional(),
  }).describe(
    "Details for a grade category in a course. Coursework may have zero or one grade category, and the category may be used in computing the overall grade. See the [help center article](https://support.google.com/edu/classroom/answer/9184995) for details.",
  ).optional(),
  gradingPeriodId: z.string().describe(
    'Identifier of the grading period associated with the coursework. * At creation, if unspecified, the grading period ID will be set based on the `dueDate` (or `scheduledTime` if no `dueDate` is set). * To indicate no association to any grading period, set this field to an empty string (""). * If specified, it must match an existing grading period ID in the course.',
  ).optional(),
  id: z.string().describe(
    "Classroom-assigned identifier of this course work, unique per course. Read-only.",
  ).optional(),
  individualStudentsOptions: z.object({
    studentIds: z.array(z.string()).describe(
      "Identifiers for the students that have access to the coursework/announcement.",
    ).optional(),
  }).describe(
    "Assignee details about a coursework/announcement. This field is set if and only if `assigneeMode` is `INDIVIDUAL_STUDENTS`.",
  ).optional(),
  materials: z.array(z.object({
    driveFile: z.object({
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
      shareMode: z.enum(["UNKNOWN_SHARE_MODE", "VIEW", "EDIT", "STUDENT_COPY"])
        .describe("Mechanism by which students access the Drive item.")
        .optional(),
    }).describe("Drive file that is used as material for course work.")
      .optional(),
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
    gem: z.object({
      id: z.string().describe("Gems resource id.").optional(),
      title: z.string().describe("Title of the Gem.").optional(),
      url: z.string().describe("URL that can be used to access the Gem.")
        .optional(),
    }).describe("Gemini Gem link.").optional(),
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
    notebook: z.object({
      id: z.string().describe("Notebook resource id.").optional(),
      title: z.string().describe("Title of the Notebook.").optional(),
      url: z.string().describe("URL that can be used to access the Notebook.")
        .optional(),
    }).describe("NotebookLM Notebook link.").optional(),
    youtubeVideo: z.object({
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
    "Additional materials. CourseWork must have no more than 20 material items.",
  ).optional(),
  maxPoints: z.number().describe(
    "Maximum grade for this course work. If zero or unspecified, this assignment is considered ungraded. This must be a non-negative integer value.",
  ).optional(),
  multipleChoiceQuestion: z.object({
    choices: z.array(z.string()).describe("Possible choices.").optional(),
  }).describe("Additional details for multiple-choice questions.").optional(),
  scheduledTime: z.string().describe(
    "Optional timestamp when this course work is scheduled to be published.",
  ).optional(),
  state: z.enum([
    "COURSE_WORK_STATE_UNSPECIFIED",
    "PUBLISHED",
    "DRAFT",
    "DELETED",
  ]).describe(
    "Status of this course work. If unspecified, the default state is `DRAFT`.",
  ).optional(),
  submissionModificationMode: z.enum([
    "SUBMISSION_MODIFICATION_MODE_UNSPECIFIED",
    "MODIFIABLE_UNTIL_TURNED_IN",
    "MODIFIABLE",
  ]).describe(
    "Setting to determine when students are allowed to modify submissions. If unspecified, the default value is `MODIFIABLE_UNTIL_TURNED_IN`.",
  ).optional(),
  title: z.string().describe(
    "Title of this course work. The title must be a valid UTF-8 string containing between 1 and 3000 characters.",
  ).optional(),
  topicId: z.string().describe(
    "Identifier for the topic that this coursework is associated with. Must match an existing topic in the course.",
  ).optional(),
  updateTime: z.string().describe(
    "Timestamp of the most recent change to this course work. Read-only.",
  ).optional(),
  workType: z.enum([
    "COURSE_WORK_TYPE_UNSPECIFIED",
    "ASSIGNMENT",
    "SHORT_ANSWER_QUESTION",
    "MULTIPLE_CHOICE_QUESTION",
  ]).describe(
    "Type of this course work. The type is set when the course work is created and cannot be changed.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Classroom Courses.CourseWork. Registered at `@swamp/gcp/classroom/courses-coursework`. */
export const model = {
  type: "@swamp/gcp/classroom/courses-coursework",
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
      description:
        "Course work created by a teacher for students of the course.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a courseWork",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["alternateLink"] !== undefined) {
          body["alternateLink"] = g["alternateLink"];
        }
        if (g["assigneeMode"] !== undefined) {
          body["assigneeMode"] = g["assigneeMode"];
        }
        if (g["assignment"] !== undefined) body["assignment"] = g["assignment"];
        if (g["associatedWithDeveloper"] !== undefined) {
          body["associatedWithDeveloper"] = g["associatedWithDeveloper"];
        }
        if (g["creationTime"] !== undefined) {
          body["creationTime"] = g["creationTime"];
        }
        if (g["creatorUserId"] !== undefined) {
          body["creatorUserId"] = g["creatorUserId"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["dueDate"] !== undefined) body["dueDate"] = g["dueDate"];
        if (g["dueTime"] !== undefined) body["dueTime"] = g["dueTime"];
        if (g["gradeCategory"] !== undefined) {
          body["gradeCategory"] = g["gradeCategory"];
        }
        if (g["gradingPeriodId"] !== undefined) {
          body["gradingPeriodId"] = g["gradingPeriodId"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["individualStudentsOptions"] !== undefined) {
          body["individualStudentsOptions"] = g["individualStudentsOptions"];
        }
        if (g["materials"] !== undefined) body["materials"] = g["materials"];
        if (g["maxPoints"] !== undefined) body["maxPoints"] = g["maxPoints"];
        if (g["multipleChoiceQuestion"] !== undefined) {
          body["multipleChoiceQuestion"] = g["multipleChoiceQuestion"];
        }
        if (g["scheduledTime"] !== undefined) {
          body["scheduledTime"] = g["scheduledTime"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["submissionModificationMode"] !== undefined) {
          body["submissionModificationMode"] = g["submissionModificationMode"];
        }
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["topicId"] !== undefined) body["topicId"] = g["topicId"];
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
        if (g["workType"] !== undefined) body["workType"] = g["workType"];
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
            listParams: { "courseId": String(g["courseId"] ?? "") },
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
      description: "Get a courseWork",
      arguments: z.object({
        identifier: z.string().describe("The id of the courseWork"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        }
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
      description: "Update courseWork attributes",
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
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        } else if (existing["courseId"]) {
          params["courseId"] = String(existing["courseId"]);
        }
        params["id"] = existing["id"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["alternateLink"] !== undefined) {
          body["alternateLink"] = g["alternateLink"];
        }
        if (g["assigneeMode"] !== undefined) {
          body["assigneeMode"] = g["assigneeMode"];
        }
        if (g["assignment"] !== undefined) body["assignment"] = g["assignment"];
        if (g["associatedWithDeveloper"] !== undefined) {
          body["associatedWithDeveloper"] = g["associatedWithDeveloper"];
        }
        if (g["creationTime"] !== undefined) {
          body["creationTime"] = g["creationTime"];
        }
        if (g["creatorUserId"] !== undefined) {
          body["creatorUserId"] = g["creatorUserId"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["dueDate"] !== undefined) body["dueDate"] = g["dueDate"];
        if (g["dueTime"] !== undefined) body["dueTime"] = g["dueTime"];
        if (g["gradeCategory"] !== undefined) {
          body["gradeCategory"] = g["gradeCategory"];
        }
        if (g["gradingPeriodId"] !== undefined) {
          body["gradingPeriodId"] = g["gradingPeriodId"];
        }
        if (g["individualStudentsOptions"] !== undefined) {
          body["individualStudentsOptions"] = g["individualStudentsOptions"];
        }
        if (g["materials"] !== undefined) body["materials"] = g["materials"];
        if (g["maxPoints"] !== undefined) body["maxPoints"] = g["maxPoints"];
        if (g["multipleChoiceQuestion"] !== undefined) {
          body["multipleChoiceQuestion"] = g["multipleChoiceQuestion"];
        }
        if (g["scheduledTime"] !== undefined) {
          body["scheduledTime"] = g["scheduledTime"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["submissionModificationMode"] !== undefined) {
          body["submissionModificationMode"] = g["submissionModificationMode"];
        }
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["topicId"] !== undefined) body["topicId"] = g["topicId"];
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
      description: "Delete the courseWork",
      arguments: z.object({
        identifier: z.string().describe("The id of the courseWork"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        }
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
      description: "Sync courseWork state from GCP",
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
          if (g["courseId"] !== undefined) {
            params["courseId"] = String(g["courseId"]);
          } else if (existing["courseId"]) {
            params["courseId"] = String(existing["courseId"]);
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
    get_add_on_context: {
      description: "get add on context",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        }
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
        params["itemId"] = existing["id"]?.toString() ?? g["id"]?.toString() ??
          "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "classroom.courses.courseWork.getAddOnContext",
            "path": "v1/courses/{courseId}/courseWork/{itemId}/addOnContext",
            "httpMethod": "GET",
            "parameterOrder": ["courseId", "itemId"],
            "parameters": {
              "addOnToken": { "location": "query" },
              "attachmentId": { "location": "query" },
              "courseId": { "location": "path", "required": true },
              "itemId": { "location": "path", "required": true },
              "postId": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    modify_assignees: {
      description: "modify assignees",
      arguments: z.object({
        assigneeMode: z.any().optional(),
        modifyIndividualStudentsOptions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        }
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
        const body: Record<string, unknown> = {};
        if (args["assigneeMode"] !== undefined) {
          body["assigneeMode"] = args["assigneeMode"];
        }
        if (args["modifyIndividualStudentsOptions"] !== undefined) {
          body["modifyIndividualStudentsOptions"] =
            args["modifyIndividualStudentsOptions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "classroom.courses.courseWork.modifyAssignees",
            "path": "v1/courses/{courseId}/courseWork/{id}:modifyAssignees",
            "httpMethod": "POST",
            "parameterOrder": ["courseId", "id"],
            "parameters": {
              "courseId": { "location": "path", "required": true },
              "id": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    update_rubric: {
      description: "update rubric",
      arguments: z.object({
        courseId: z.any().optional(),
        courseWorkId: z.any().optional(),
        creationTime: z.any().optional(),
        criteria: z.any().optional(),
        id: z.any().optional(),
        sourceSpreadsheetId: z.any().optional(),
        updateTime: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        }
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
        params["courseWorkId"] = existing["id"]?.toString() ??
          g["id"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["courseId"] !== undefined) body["courseId"] = args["courseId"];
        if (args["courseWorkId"] !== undefined) {
          body["courseWorkId"] = args["courseWorkId"];
        }
        if (args["creationTime"] !== undefined) {
          body["creationTime"] = args["creationTime"];
        }
        if (args["criteria"] !== undefined) body["criteria"] = args["criteria"];
        if (args["id"] !== undefined) body["id"] = args["id"];
        if (args["sourceSpreadsheetId"] !== undefined) {
          body["sourceSpreadsheetId"] = args["sourceSpreadsheetId"];
        }
        if (args["updateTime"] !== undefined) {
          body["updateTime"] = args["updateTime"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "classroom.courses.courseWork.updateRubric",
            "path": "v1/courses/{courseId}/courseWork/{courseWorkId}/rubric",
            "httpMethod": "PATCH",
            "parameterOrder": ["courseId", "courseWorkId"],
            "parameters": {
              "courseId": { "location": "path", "required": true },
              "courseWorkId": { "location": "path", "required": true },
              "id": { "location": "query" },
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
