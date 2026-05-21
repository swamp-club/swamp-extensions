// Auto-generated extension model for @swamp/gcp/health/users-datatypes-datapoints
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Health Users.DataTypes.DataPoints.
 *
 * A computed or recorded metric.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/dataPoints/${shortName}`;
}

const BASE_URL = "https://health.googleapis.com/";

const GET_CONFIG = {
  "id": "health.users.dataTypes.dataPoints.get",
  "path": "v4/{+name}",
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
  "id": "health.users.dataTypes.dataPoints.create",
  "path": "v4/{+parent}/dataPoints",
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
  "id": "health.users.dataTypes.dataPoints.patch",
  "path": "v4/{+name}",
  "httpMethod": "PATCH",
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
  "id": "health.users.dataTypes.dataPoints.list",
  "path": "v4/{+parent}/dataPoints",
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
  activeMinutes: z.object({
    activeMinutesByActivityLevel: z.array(z.object({
      activeMinutes: z.string().describe(
        "Required. Number of whole minutes spent in activity.",
      ).optional(),
      activityLevel: z.enum([
        "ACTIVITY_LEVEL_UNSPECIFIED",
        "LIGHT",
        "MODERATE",
        "VIGOROUS",
      ]).describe("Required. The level of activity.").optional(),
    })).describe(
      "Required. Active minutes by activity level. At most one record per activity level is allowed.",
    ).optional(),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      civilStartTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      endTime: z.string().describe("Required. Observed interval end time.")
        .optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe("Required. Observed interval start time.")
        .optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a time interval of an observed data point.")
      .optional(),
  }).describe("Record of active minutes in a given time interval.").optional(),
  activeZoneMinutes: z.object({
    activeZoneMinutes: z.string().describe(
      "Required. Number of Active Zone Minutes earned in the given time interval. Note: active_zone_minutes equals to 1 for low intensity (fat burn) zones or 2 for high intensity zones (cardio, peak).",
    ).optional(),
    heartRateZone: z.enum([
      "HEART_RATE_ZONE_UNSPECIFIED",
      "FAT_BURN",
      "CARDIO",
      "PEAK",
    ]).describe(
      "Required. Heart rate zone in which the active zone minutes have been earned, in the given time interval.",
    ).optional(),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      civilStartTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      endTime: z.string().describe("Required. Observed interval end time.")
        .optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe("Required. Observed interval start time.")
        .optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a time interval of an observed data point.")
      .optional(),
  }).describe("Record of active zone minutes in a given time interval.")
    .optional(),
  activityLevel: z.object({
    activityLevelType: z.enum([
      "ACTIVITY_LEVEL_TYPE_UNSPECIFIED",
      "SEDENTARY",
      "LIGHTLY_ACTIVE",
      "MODERATELY_ACTIVE",
      "VERY_ACTIVE",
    ]).describe("Required. Activity level type in the given time interval.")
      .optional(),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      civilStartTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      endTime: z.string().describe("Required. Observed interval end time.")
        .optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe("Required. Observed interval start time.")
        .optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a time interval of an observed data point.")
      .optional(),
  }).describe(
    "Internal type to capture activity level during a certain time interval.",
  ).optional(),
  altitude: z.object({
    gainMillimeters: z.string().describe(
      "Required. Altitude gain in millimeters over the observed interval.",
    ).optional(),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      civilStartTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      endTime: z.string().describe("Required. Observed interval end time.")
        .optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe("Required. Observed interval start time.")
        .optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a time interval of an observed data point.")
      .optional(),
  }).describe(
    "Captures the altitude gain (i.e. deltas), and not level above sea, for a user in millimeters.",
  ).optional(),
  basalEnergyBurned: z.object({
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      civilStartTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      endTime: z.string().describe("Required. Observed interval end time.")
        .optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe("Required. Observed interval start time.")
        .optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a time interval of an observed data point.")
      .optional(),
    kcal: z.number().describe(
      "Required. Number of calories burned due to basal metabolic rate in kilocalories over the observed interval.",
    ).optional(),
  }).describe(
    "Number of calories burned due to basal metabolic rate (BMR) over a period of time.",
  ).optional(),
  bodyFat: z.object({
    percentage: z.number().describe(
      "Required. Body fat percentage, in range [0, 100].",
    ).optional(),
    sampleTime: z.object({
      civilTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      physicalTime: z.string().describe(
        "Required. The time of the observation.",
      ).optional(),
      utcOffset: z.string().describe(
        "Required. The offset of the user's local time during the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a sample time of an observed data point.")
      .optional(),
  }).describe("Body fat measurement.").optional(),
  dailyHeartRateVariability: z.object({
    averageHeartRateVariabilityMilliseconds: z.number().describe(
      "Optional. A user's average heart rate variability calculated using the root mean square of successive differences (RMSSD) in times between heartbeats.",
    ).optional(),
    date: z.object({
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
    deepSleepRootMeanSquareOfSuccessiveDifferencesMilliseconds: z.number()
      .describe(
        "Optional. The root mean square of successive differences (RMSSD) value during deep sleep.",
      ).optional(),
    entropy: z.number().describe(
      "Optional. The Shanon entropy of heartbeat intervals. Entropy quantifies randomness or disorder in a system. High entropy indicates high HRV. Entropy is measured from the histogram of time interval between successive heart beats values measured during sleep.",
    ).optional(),
    nonRemHeartRateBeatsPerMinute: z.string().describe(
      "Optional. Non-REM heart rate",
    ).optional(),
  }).describe(
    "Represents the daily heart rate variability data type. At least one of the following fields must be set: - `average_heart_rate_variability_milliseconds` - `non_rem_heart_rate_beats_per_minute` - `entropy` - `deep_sleep_root_mean_square_of_successive_differences_milliseconds`",
  ).optional(),
  dailyHeartRateZones: z.object({
    date: z.object({
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
    heartRateZones: z.array(z.object({
      heartRateZoneType: z.enum([
        "HEART_RATE_ZONE_TYPE_UNSPECIFIED",
        "LIGHT",
        "MODERATE",
        "VIGOROUS",
        "PEAK",
      ]).describe("Required. The heart rate zone type.").optional(),
      maxBeatsPerMinute: z.string().describe(
        "Required. Maximum heart rate for this zone in beats per minute.",
      ).optional(),
      minBeatsPerMinute: z.string().describe(
        "Required. Minimum heart rate for this zone in beats per minute.",
      ).optional(),
    })).describe("Required. The heart rate zones.").optional(),
  }).describe(
    "User's heart rate zone thresholds based on the Karvonen algorithm for a specific day.",
  ).optional(),
  dailyOxygenSaturation: z.object({
    averagePercentage: z.number().describe(
      "Required. The average value of the oxygen saturation samples during the sleep.",
    ).optional(),
    date: z.object({
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
    lowerBoundPercentage: z.number().describe(
      "Required. The lower bound of the confidence interval of oxygen saturation samples during sleep.",
    ).optional(),
    standardDeviationPercentage: z.number().describe(
      "Optional. Standard deviation of the daily oxygen saturation averages from the past 7-30 days.",
    ).optional(),
    upperBoundPercentage: z.number().describe(
      "Required. The upper bound of the confidence interval of oxygen saturation samples during sleep.",
    ).optional(),
  }).describe(
    "A daily oxygen saturation (SpO2) record. Represents the user's daily oxygen saturation summary, typically calculated during sleep.",
  ).optional(),
  dailyRespiratoryRate: z.object({
    breathsPerMinute: z.number().describe(
      "Required. The average number of breaths taken per minute.",
    ).optional(),
    date: z.object({
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
  }).describe(
    "A daily average respiratory rate (breaths per minute) for a day of the year. One data point per day calculated for the main sleep.",
  ).optional(),
  dailyRestingHeartRate: z.object({
    beatsPerMinute: z.string().describe(
      "Required. The resting heart rate value in beats per minute.",
    ).optional(),
    dailyRestingHeartRateMetadata: z.object({
      calculationMethod: z.enum([
        "CALCULATION_METHOD_UNSPECIFIED",
        "WITH_SLEEP",
        "ONLY_WITH_AWAKE_DATA",
      ]).describe(
        "Required. The method used to calculate the resting heart rate.",
      ).optional(),
    }).describe("Metadata for the daily resting heart rate.").optional(),
    date: z.object({
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
  }).describe(
    "Measures the daily resting heart rate for a user, calculated using the all day heart rate measurements.",
  ).optional(),
  dailySleepTemperatureDerivations: z.object({
    baselineTemperatureCelsius: z.number().describe(
      "Optional. The user's baseline skin temperature. It is the median of the user's nightly skin temperature over the past 30 days.",
    ).optional(),
    date: z.object({
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
    nightlyTemperatureCelsius: z.number().describe(
      "Required. The user's nightly skin temperature. It is the mean of skin temperature samples taken from the user’s sleep.",
    ).optional(),
    relativeNightlyStddev30dCelsius: z.number().describe(
      "Optional. The standard deviation of the user’s relative nightly skin temperature (temperature - baseline) over the past 30 days.",
    ).optional(),
  }).describe(
    "Provides derived sleep temperature values, calculated from skin or internal device temperature readings during sleep.",
  ).optional(),
  dailyVo2Max: z.object({
    cardioFitnessLevel: z.enum([
      "CARDIO_FITNESS_LEVEL_UNSPECIFIED",
      "POOR",
      "FAIR",
      "AVERAGE",
      "GOOD",
      "VERY_GOOD",
      "EXCELLENT",
    ]).describe(
      "Optional. Represents the user's cardio fitness level based on their VO2 max.",
    ).optional(),
    date: z.object({
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
    estimated: z.boolean().describe(
      "Optional. An estimated field is added to indicate when the confidence has decreased sufficiently to consider the value an estimation.",
    ).optional(),
    vo2Max: z.number().describe(
      "Required. Daily VO2 max value measured as in ml consumed oxygen / kg of body weight / min.",
    ).optional(),
    vo2MaxCovariance: z.number().describe(
      "Optional. The covariance of the VO2 max value.",
    ).optional(),
  }).describe(
    "Contains a daily summary of the user's VO2 max (cardio fitness score), which is the maximum rate of oxygen the body can use during exercise.",
  ).optional(),
  dataSource: z.object({
    application: z.object({
      googleWebClientId: z.string().describe(
        "Output only. The Google OAuth 2.0 client ID of the web application or service that recorded the data. This is the client ID used during the Google OAuth flow to obtain user credentials. This field is system-populated when the data is uploaded from Google Web API.",
      ).optional(),
      packageName: z.string().describe(
        "Output only. A unique identifier for the mobile application that was the source of the data. This is typically the application's package name on Android (e.g., `com.google.fitbit`) or the bundle ID on iOS. This field is informational and helps trace data origin. This field is system-populated when the data is uploaded from the Fitbit mobile application, Health Connect or Health Kit.",
      ).optional(),
      webClientId: z.string().describe(
        "Output only. The client ID of the application that recorded the data. This ID is a legacy Fitbit API client ID, which is different from a Google OAuth client ID. Example format: `ABC123`. This field is system-populated and used for tracing data from legacy Fitbit API integrations. This field is system-populated when the data is uploaded from a legacy Fitbit API integration.",
      ).optional(),
    }).describe(
      "Optional metadata for the application that provided this data.",
    ).optional(),
    device: z.object({
      displayName: z.string().describe(
        "Optional. An optional name for the device.",
      ).optional(),
      formFactor: z.enum([
        "FORM_FACTOR_UNSPECIFIED",
        "FITNESS_BAND",
        "WATCH",
        "PHONE",
        "RING",
        "CHEST_STRAP",
        "SCALE",
        "TABLET",
        "HEAD_MOUNTED",
        "SMART_DISPLAY",
      ]).describe("Optional. Captures the form factor of the device.")
        .optional(),
      manufacturer: z.string().describe(
        "Optional. An optional manufacturer of the device.",
      ).optional(),
    }).describe(
      "Captures metadata about the device that recorded the measurement.",
    ).optional(),
    platform: z.enum([
      "PLATFORM_UNSPECIFIED",
      "FITBIT",
      "HEALTH_CONNECT",
      "HEALTH_KIT",
      "FIT",
      "FITBIT_WEB_API",
      "NEST",
      "GOOGLE_WEB_API",
      "GOOGLE_PARTNER_INTEGRATION",
    ]).describe("Output only. Captures the platform that uploaded the data.")
      .optional(),
    recordingMethod: z.enum([
      "RECORDING_METHOD_UNSPECIFIED",
      "MANUAL",
      "PASSIVELY_MEASURED",
      "DERIVED",
      "ACTIVELY_MEASURED",
      "UNKNOWN",
    ]).describe("Optional. Captures how the data was recorded.").optional(),
  }).describe(
    "Data Source definition to track the origin of data. Each health data point, regardless of the complexity or data model (whether a simple step count or a detailed sleep session) must retain information about its source of origin (e.g. the device or app that collected it).",
  ).optional(),
  distance: z.object({
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      civilStartTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      endTime: z.string().describe("Required. Observed interval end time.")
        .optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe("Required. Observed interval start time.")
        .optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a time interval of an observed data point.")
      .optional(),
    millimeters: z.string().describe(
      "Required. Distance in millimeters over the observed interval.",
    ).optional(),
  }).describe("Distance traveled over an interval of time.").optional(),
  exercise: z.object({
    activeDuration: z.string().describe("Optional. Duration excluding pauses.")
      .optional(),
    createTime: z.string().describe(
      "Output only. Represents the timestamp of the creation of the exercise.",
    ).optional(),
    displayName: z.string().describe("Required. Exercise display name.")
      .optional(),
    exerciseEvents: z.array(z.object({
      eventTime: z.string().describe("Required. Exercise event time")
        .optional(),
      eventUtcOffset: z.string().describe(
        "Required. Exercise event time offset from UTC",
      ).optional(),
      exerciseEventType: z.enum([
        "EXERCISE_EVENT_TYPE_UNSPECIFIED",
        "START",
        "STOP",
        "PAUSE",
        "RESUME",
        "AUTO_PAUSE",
        "AUTO_RESUME",
      ]).describe(
        "Required. The type of the event, such as start, stop, pause, resume.",
      ).optional(),
    })).describe(
      "Optional. Exercise events that happen during an exercise, such as pause & restarts.",
    ).optional(),
    exerciseMetadata: z.object({
      hasGps: z.boolean().describe(
        "Optional. Whether the exercise had GPS tracking.",
      ).optional(),
      poolLengthMillimeters: z.string().describe(
        "Optional. Pool length in millimeters. Only present in the swimming exercises.",
      ).optional(),
    }).describe("Additional exercise metadata.").optional(),
    exerciseType: z.enum([
      "EXERCISE_TYPE_UNSPECIFIED",
      "RUNNING",
      "WALKING",
      "BIKING",
      "SWIMMING",
      "HIKING",
      "YOGA",
      "PILATES",
      "WORKOUT",
      "HIIT",
      "WEIGHTLIFTING",
      "STRENGTH_TRAINING",
      "OTHER",
    ]).describe("Required. The type of activity performed during an exercise.")
      .optional(),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      civilStartTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      endTime: z.string().describe(
        "Required. The end time of the observed session.",
      ).optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the session relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe(
        "Required. The start time of the observed session.",
      ).optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the session relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe(
      "Represents a time interval of session data point, which bundles multiple observed metrics together.",
    ).optional(),
    metricsSummary: z.object({
      activeZoneMinutes: z.string().describe(
        "Optional. Total active zone minutes for the exercise.",
      ).optional(),
      averageHeartRateBeatsPerMinute: z.string().describe(
        "Optional. Average heart rate during the exercise.",
      ).optional(),
      averagePaceSecondsPerMeter: z.number().describe(
        "Optional. Average pace in seconds per meter.",
      ).optional(),
      averageSpeedMillimetersPerSecond: z.number().describe(
        "Optional. Average speed in millimeters per second.",
      ).optional(),
      caloriesKcal: z.number().describe(
        "Optional. Total calories burned by the user during the exercise.",
      ).optional(),
      distanceMillimeters: z.number().describe(
        "Optional. Total distance covered by the user during the exercise.",
      ).optional(),
      elevationGainMillimeters: z.number().describe(
        "Optional. Total elevation gain during the exercise.",
      ).optional(),
      heartRateZoneDurations: z.object({
        lightTime: z.string().describe(
          "Optional. Time spent in light heart rate zone.",
        ).optional(),
        moderateTime: z.string().describe(
          "Optional. Time spent in moderate heart rate zone.",
        ).optional(),
        peakTime: z.string().describe(
          "Optional. Time spent in peak heart rate zone.",
        ).optional(),
        vigorousTime: z.string().describe(
          "Optional. Time spent in vigorous heart rate zone.",
        ).optional(),
      }).describe("Time spent in each heart rate zone.").optional(),
      mobilityMetrics: z.object({
        avgCadenceStepsPerMinute: z.number().describe(
          "Optional. Cadence is a measure of the frequency of your foot strikes. Steps / min in real time during workout.",
        ).optional(),
        avgGroundContactTimeDuration: z.string().describe(
          "Optional. The ground contact time for a particular stride is the amount of time for which the foot was in contact with the ground on that stride",
        ).optional(),
        avgStrideLengthMillimeters: z.string().describe(
          "Optional. Stride length is a measure of the distance covered by a single stride",
        ).optional(),
        avgVerticalOscillationMillimeters: z.string().describe(
          "Optional. Distance off the ground your center of mass moves with each stride while running",
        ).optional(),
        avgVerticalRatio: z.number().describe(
          "Optional. Vertical oscillation/stride length between [5.0, 11.0].",
        ).optional(),
      }).describe("Mobility workouts specific metrics").optional(),
      runVo2Max: z.number().describe(
        "Optional. Run VO2 max value for the exercise. Only present in the running exercises at the top level as in the summary of the whole exercise.",
      ).optional(),
      steps: z.string().describe(
        "Optional. Total steps taken during the exercise.",
      ).optional(),
      totalSwimLengths: z.number().describe(
        "Optional. Number of full pool lengths completed during the exercise. Only present in the swimming exercises at the top level as in the summary of the whole exercise.",
      ).optional(),
    }).describe("Summary metrics for an exercise.").optional(),
    notes: z.string().describe(
      "Optional. Standard free-form notes captured at manual logging.",
    ).optional(),
    splitSummaries: z.array(z.object({
      activeDuration: z.string().describe(
        "Output only. Lap time excluding the pauses.",
      ).optional(),
      endTime: z.string().describe("Required. Lap end time").optional(),
      endUtcOffset: z.string().describe(
        "Required. Lap end time offset from UTC",
      ).optional(),
      metricsSummary: z.object({
        activeZoneMinutes: z.string().describe(
          "Optional. Total active zone minutes for the exercise.",
        ).optional(),
        averageHeartRateBeatsPerMinute: z.string().describe(
          "Optional. Average heart rate during the exercise.",
        ).optional(),
        averagePaceSecondsPerMeter: z.number().describe(
          "Optional. Average pace in seconds per meter.",
        ).optional(),
        averageSpeedMillimetersPerSecond: z.number().describe(
          "Optional. Average speed in millimeters per second.",
        ).optional(),
        caloriesKcal: z.number().describe(
          "Optional. Total calories burned by the user during the exercise.",
        ).optional(),
        distanceMillimeters: z.number().describe(
          "Optional. Total distance covered by the user during the exercise.",
        ).optional(),
        elevationGainMillimeters: z.number().describe(
          "Optional. Total elevation gain during the exercise.",
        ).optional(),
        heartRateZoneDurations: z.object({
          lightTime: z.unknown().describe(
            "Optional. Time spent in light heart rate zone.",
          ).optional(),
          moderateTime: z.unknown().describe(
            "Optional. Time spent in moderate heart rate zone.",
          ).optional(),
          peakTime: z.unknown().describe(
            "Optional. Time spent in peak heart rate zone.",
          ).optional(),
          vigorousTime: z.unknown().describe(
            "Optional. Time spent in vigorous heart rate zone.",
          ).optional(),
        }).describe("Time spent in each heart rate zone.").optional(),
        mobilityMetrics: z.object({
          avgCadenceStepsPerMinute: z.unknown().describe(
            "Optional. Cadence is a measure of the frequency of your foot strikes. Steps / min in real time during workout.",
          ).optional(),
          avgGroundContactTimeDuration: z.unknown().describe(
            "Optional. The ground contact time for a particular stride is the amount of time for which the foot was in contact with the ground on that stride",
          ).optional(),
          avgStrideLengthMillimeters: z.unknown().describe(
            "Optional. Stride length is a measure of the distance covered by a single stride",
          ).optional(),
          avgVerticalOscillationMillimeters: z.unknown().describe(
            "Optional. Distance off the ground your center of mass moves with each stride while running",
          ).optional(),
          avgVerticalRatio: z.unknown().describe(
            "Optional. Vertical oscillation/stride length between [5.0, 11.0].",
          ).optional(),
        }).describe("Mobility workouts specific metrics").optional(),
        runVo2Max: z.number().describe(
          "Optional. Run VO2 max value for the exercise. Only present in the running exercises at the top level as in the summary of the whole exercise.",
        ).optional(),
        steps: z.string().describe(
          "Optional. Total steps taken during the exercise.",
        ).optional(),
        totalSwimLengths: z.number().describe(
          "Optional. Number of full pool lengths completed during the exercise. Only present in the swimming exercises at the top level as in the summary of the whole exercise.",
        ).optional(),
      }).describe("Summary metrics for an exercise.").optional(),
      splitType: z.enum([
        "SPLIT_TYPE_UNSPECIFIED",
        "MANUAL",
        "DURATION",
        "DISTANCE",
        "CALORIES",
      ]).describe(
        "Required. Method used to split the exercise laps. Users may manually mark the lap as complete even if the tracking is automatic.",
      ).optional(),
      startTime: z.string().describe("Required. Lap start time").optional(),
      startUtcOffset: z.string().describe(
        "Required. Lap start time offset from UTC",
      ).optional(),
    })).describe(
      "Optional. Laps or splits recorded within an exercise. Laps could be split based on distance or other criteria (duration, etc.) Laps should not be overlapping with each other.",
    ).optional(),
    splits: z.array(z.object({
      activeDuration: z.string().describe(
        "Output only. Lap time excluding the pauses.",
      ).optional(),
      endTime: z.string().describe("Required. Lap end time").optional(),
      endUtcOffset: z.string().describe(
        "Required. Lap end time offset from UTC",
      ).optional(),
      metricsSummary: z.object({
        activeZoneMinutes: z.string().describe(
          "Optional. Total active zone minutes for the exercise.",
        ).optional(),
        averageHeartRateBeatsPerMinute: z.string().describe(
          "Optional. Average heart rate during the exercise.",
        ).optional(),
        averagePaceSecondsPerMeter: z.number().describe(
          "Optional. Average pace in seconds per meter.",
        ).optional(),
        averageSpeedMillimetersPerSecond: z.number().describe(
          "Optional. Average speed in millimeters per second.",
        ).optional(),
        caloriesKcal: z.number().describe(
          "Optional. Total calories burned by the user during the exercise.",
        ).optional(),
        distanceMillimeters: z.number().describe(
          "Optional. Total distance covered by the user during the exercise.",
        ).optional(),
        elevationGainMillimeters: z.number().describe(
          "Optional. Total elevation gain during the exercise.",
        ).optional(),
        heartRateZoneDurations: z.object({
          lightTime: z.unknown().describe(
            "Optional. Time spent in light heart rate zone.",
          ).optional(),
          moderateTime: z.unknown().describe(
            "Optional. Time spent in moderate heart rate zone.",
          ).optional(),
          peakTime: z.unknown().describe(
            "Optional. Time spent in peak heart rate zone.",
          ).optional(),
          vigorousTime: z.unknown().describe(
            "Optional. Time spent in vigorous heart rate zone.",
          ).optional(),
        }).describe("Time spent in each heart rate zone.").optional(),
        mobilityMetrics: z.object({
          avgCadenceStepsPerMinute: z.unknown().describe(
            "Optional. Cadence is a measure of the frequency of your foot strikes. Steps / min in real time during workout.",
          ).optional(),
          avgGroundContactTimeDuration: z.unknown().describe(
            "Optional. The ground contact time for a particular stride is the amount of time for which the foot was in contact with the ground on that stride",
          ).optional(),
          avgStrideLengthMillimeters: z.unknown().describe(
            "Optional. Stride length is a measure of the distance covered by a single stride",
          ).optional(),
          avgVerticalOscillationMillimeters: z.unknown().describe(
            "Optional. Distance off the ground your center of mass moves with each stride while running",
          ).optional(),
          avgVerticalRatio: z.unknown().describe(
            "Optional. Vertical oscillation/stride length between [5.0, 11.0].",
          ).optional(),
        }).describe("Mobility workouts specific metrics").optional(),
        runVo2Max: z.number().describe(
          "Optional. Run VO2 max value for the exercise. Only present in the running exercises at the top level as in the summary of the whole exercise.",
        ).optional(),
        steps: z.string().describe(
          "Optional. Total steps taken during the exercise.",
        ).optional(),
        totalSwimLengths: z.number().describe(
          "Optional. Number of full pool lengths completed during the exercise. Only present in the swimming exercises at the top level as in the summary of the whole exercise.",
        ).optional(),
      }).describe("Summary metrics for an exercise.").optional(),
      splitType: z.enum([
        "SPLIT_TYPE_UNSPECIFIED",
        "MANUAL",
        "DURATION",
        "DISTANCE",
        "CALORIES",
      ]).describe(
        "Required. Method used to split the exercise laps. Users may manually mark the lap as complete even if the tracking is automatic.",
      ).optional(),
      startTime: z.string().describe("Required. Lap start time").optional(),
      startUtcOffset: z.string().describe(
        "Required. Lap start time offset from UTC",
      ).optional(),
    })).describe(
      "Optional. The default split is 1 km or 1 mile. - if the movement distance is less than the default, then there are no splits - if the movement distance is greater than or equal to the default, then we have splits",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. This is the timestamp of the last update to the exercise.",
    ).optional(),
  }).describe("An exercise that stores information about a physical activity.")
    .optional(),
  floors: z.object({
    count: z.string().describe(
      "Required. Number of floors in the recorded interval",
    ).optional(),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      civilStartTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      endTime: z.string().describe("Required. Observed interval end time.")
        .optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe("Required. Observed interval start time.")
        .optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a time interval of an observed data point.")
      .optional(),
  }).describe("Gained elevation measured in floors over the time interval")
    .optional(),
  heartRate: z.object({
    beatsPerMinute: z.string().describe(
      "Required. The heart rate value in beats per minute.",
    ).optional(),
    metadata: z.object({
      motionContext: z.enum([
        "MOTION_CONTEXT_UNSPECIFIED",
        "ACTIVE",
        "SEDENTARY",
      ]).describe(
        "Optional. Indicates the user’s level of activity when the heart rate sample was measured",
      ).optional(),
      sensorLocation: z.enum([
        "SENSOR_LOCATION_UNSPECIFIED",
        "CHEST",
        "WRIST",
        "FINGER",
        "HAND",
        "EAR_LOBE",
        "FOOT",
      ]).describe(
        "Optional. Indicates the location of the sensor that measured the heart rate.",
      ).optional(),
    }).describe("Heart rate metadata.").optional(),
    sampleTime: z.object({
      civilTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      physicalTime: z.string().describe(
        "Required. The time of the observation.",
      ).optional(),
      utcOffset: z.string().describe(
        "Required. The offset of the user's local time during the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a sample time of an observed data point.")
      .optional(),
  }).describe("A heart rate measurement.").optional(),
  heartRateVariability: z.object({
    rootMeanSquareOfSuccessiveDifferencesMilliseconds: z.number().describe(
      "Optional. The root mean square of successive differences between normal heartbeats. This is a measure of heart rate variability used by Google Health.",
    ).optional(),
    sampleTime: z.object({
      civilTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      physicalTime: z.string().describe(
        "Required. The time of the observation.",
      ).optional(),
      utcOffset: z.string().describe(
        "Required. The offset of the user's local time during the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a sample time of an observed data point.")
      .optional(),
    standardDeviationMilliseconds: z.number().describe(
      "Optional. The standard deviation of the heart rate variability measurement.",
    ).optional(),
  }).describe(
    "Captures user's heart rate variability (HRV) as measured by the root mean square of successive differences (RMSSD) between normal heartbeats or by standard deviation of the inter-beat intervals (SDNN).",
  ).optional(),
  height: z.object({
    heightMillimeters: z.string().describe(
      "Required. Height of the user in millimeters.",
    ).optional(),
    sampleTime: z.object({
      civilTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      physicalTime: z.string().describe(
        "Required. The time of the observation.",
      ).optional(),
      utcOffset: z.string().describe(
        "Required. The offset of the user's local time during the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a sample time of an observed data point.")
      .optional(),
  }).describe("Body height measurement.").optional(),
  hydrationLog: z.object({
    amountConsumed: z.object({
      milliliters: z.number().describe(
        "Required. Value representing the volume in milliliters.",
      ).optional(),
      userProvidedUnit: z.enum([
        "VOLUME_UNIT_UNSPECIFIED",
        "CUP_IMPERIAL",
        "CUP_US",
        "FLUID_OUNCE_IMPERIAL",
        "FLUID_OUNCE_US",
        "LITER",
        "MILLILITER",
        "PINT_IMPERIAL",
        "PINT_US",
      ]).describe(
        "Optional. Value representing the user provided unit, used only for user-facing input and display purposes. In the API format, all volume quantities are converted to milliliters.",
      ).optional(),
    }).describe("Represents the volume quantity.").optional(),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      civilStartTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      endTime: z.string().describe(
        "Required. The end time of the observed session.",
      ).optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the session relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe(
        "Required. The start time of the observed session.",
      ).optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the session relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe(
      "Represents a time interval of session data point, which bundles multiple observed metrics together.",
    ).optional(),
  }).describe("Holds information about a user logged hydration.").optional(),
  name: z.string().describe(
    "Identifier. Data point name, only supported for the subset of identifiable data types. For the majority of the data types, individual data points do not need to be identified and this field would be empty. Format: `users/{user}/dataTypes/{data_type}/dataPoints/{data_point}` Example: `users/abcd1234/dataTypes/sleep/dataPoints/a1b2c3d4-e5f6-7890-1234-567890abcdef` The `{user}` ID is a system-generated identifier, as described in Identity.health_user_id. The `{data_type}` ID corresponds to the kebab-case version of the field names in the DataPoint data union field, e.g. `total-calories` for the `total_calories` field. The `{data_point}` ID can be client-provided or system-generated. If client-provided, it must be a string of 4-63 characters, containing only lowercase letters, numbers, and hyphens.",
  ).optional(),
  oxygenSaturation: z.object({
    percentage: z.number().describe(
      "Required. The oxygen saturation percentage. Valid values are from 0 to 100.",
    ).optional(),
    sampleTime: z.object({
      civilTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      physicalTime: z.string().describe(
        "Required. The time of the observation.",
      ).optional(),
      utcOffset: z.string().describe(
        "Required. The offset of the user's local time during the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a sample time of an observed data point.")
      .optional(),
  }).describe(
    "Captures the user's instantaneous oxygen saturation percentage (SpO2).",
  ).optional(),
  respiratoryRateSleepSummary: z.object({
    deepSleepStats: z.object({
      breathsPerMinute: z.number().describe(
        "Required. Average breaths per minute.",
      ).optional(),
      signalToNoise: z.number().describe(
        "Optional. How trustworthy the data is for the computation.",
      ).optional(),
      standardDeviation: z.number().describe(
        "Optional. Standard deviation of the respiratory rate during sleep.",
      ).optional(),
    }).describe("Respiratory rate statistics for a given sleep stage.")
      .optional(),
    fullSleepStats: z.object({
      breathsPerMinute: z.number().describe(
        "Required. Average breaths per minute.",
      ).optional(),
      signalToNoise: z.number().describe(
        "Optional. How trustworthy the data is for the computation.",
      ).optional(),
      standardDeviation: z.number().describe(
        "Optional. Standard deviation of the respiratory rate during sleep.",
      ).optional(),
    }).describe("Respiratory rate statistics for a given sleep stage.")
      .optional(),
    lightSleepStats: z.object({
      breathsPerMinute: z.number().describe(
        "Required. Average breaths per minute.",
      ).optional(),
      signalToNoise: z.number().describe(
        "Optional. How trustworthy the data is for the computation.",
      ).optional(),
      standardDeviation: z.number().describe(
        "Optional. Standard deviation of the respiratory rate during sleep.",
      ).optional(),
    }).describe("Respiratory rate statistics for a given sleep stage.")
      .optional(),
    remSleepStats: z.object({
      breathsPerMinute: z.number().describe(
        "Required. Average breaths per minute.",
      ).optional(),
      signalToNoise: z.number().describe(
        "Optional. How trustworthy the data is for the computation.",
      ).optional(),
      standardDeviation: z.number().describe(
        "Optional. Standard deviation of the respiratory rate during sleep.",
      ).optional(),
    }).describe("Respiratory rate statistics for a given sleep stage.")
      .optional(),
    sampleTime: z.object({
      civilTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      physicalTime: z.string().describe(
        "Required. The time of the observation.",
      ).optional(),
      utcOffset: z.string().describe(
        "Required. The offset of the user's local time during the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a sample time of an observed data point.")
      .optional(),
  }).describe(
    "Records respiratory rate details during sleep. Can have multiple per day if the user sleeps multiple times.",
  ).optional(),
  runVo2Max: z.object({
    runVo2Max: z.number().describe("Required. Run VO2 max value in ml/kg/min.")
      .optional(),
    sampleTime: z.object({
      civilTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      physicalTime: z.string().describe(
        "Required. The time of the observation.",
      ).optional(),
      utcOffset: z.string().describe(
        "Required. The offset of the user's local time during the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a sample time of an observed data point.")
      .optional(),
  }).describe(
    "VO2 max value calculated based on the user's running activity. Value stored in ml/kg/min.",
  ).optional(),
  sedentaryPeriod: z.object({
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      civilStartTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      endTime: z.string().describe("Required. Observed interval end time.")
        .optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe("Required. Observed interval start time.")
        .optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a time interval of an observed data point.")
      .optional(),
  }).describe(
    "SedentaryPeriod SedentaryPeriod data represents the periods of time that the user was sedentary (i.e. not moving while wearing the device).",
  ).optional(),
  sleep: z.object({
    createTime: z.string().describe(
      "Output only. Creation time of this sleep observation.",
    ).optional(),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      civilStartTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      endTime: z.string().describe(
        "Required. The end time of the observed session.",
      ).optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the session relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe(
        "Required. The start time of the observed session.",
      ).optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the session relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe(
      "Represents a time interval of session data point, which bundles multiple observed metrics together.",
    ).optional(),
    metadata: z.object({
      externalId: z.string().describe(
        "Optional. Sleep identifier relevant in the context of the data source.",
      ).optional(),
      manuallyEdited: z.boolean().describe(
        "Output only. Some sleeps autodetected by algorithms can be manually edited by users.",
      ).optional(),
      nap: z.boolean().describe(
        "Output only. Naps are sleeps without stages and relatively short durations.",
      ).optional(),
      processed: z.boolean().describe(
        "Output only. Sleep and sleep stages algorithms finished processing.",
      ).optional(),
      stagesStatus: z.enum([
        "STAGES_STATE_UNSPECIFIED",
        "REJECTED_COVERAGE",
        "REJECTED_MAX_GAP",
        "REJECTED_START_GAP",
        "REJECTED_END_GAP",
        "REJECTED_NAP",
        "REJECTED_SERVER",
        "TIMEOUT",
        "SUCCEEDED",
        "PROCESSING_INTERNAL_ERROR",
      ]).describe("Output only. Sleep stages algorithm processing status.")
        .optional(),
    }).describe("Additional information about how the sleep was processed.")
      .optional(),
    outOfBedSegments: z.array(z.object({
      endTime: z.string().describe("Required. Segment end time.").optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the segment relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe("Required. Segment tart time.").optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the segment relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    })).describe(
      "Optional. “Out of bed” segments that can overlap with sleep stages.",
    ).optional(),
    stages: z.array(z.object({
      createTime: z.string().describe(
        "Output only. Creation time of this sleep stages segment.",
      ).optional(),
      endTime: z.string().describe("Required. Sleep stage end time.")
        .optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the sleep stage relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe("Required. Sleep stage start time.")
        .optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the sleep stage relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      type: z.enum([
        "SLEEP_STAGE_TYPE_UNSPECIFIED",
        "AWAKE",
        "LIGHT",
        "DEEP",
        "REM",
        "ASLEEP",
        "RESTLESS",
      ]).describe("Required. Sleep stage type: AWAKE, DEEP, REM, LIGHT etc.")
        .optional(),
      updateTime: z.string().describe(
        "Output only. Last update time of this sleep stages segment.",
      ).optional(),
    })).describe(
      "Optional. List of non-overlapping contiguous sleep stage segments that cover the sleep period.",
    ).optional(),
    summary: z.object({
      minutesAfterWakeUp: z.string().describe(
        "Output only. Minutes after wake up calculated by restlessness algorithm.",
      ).optional(),
      minutesAsleep: z.string().describe(
        'Output only. Total number of minutes asleep. For classic sleep it is the sum of ASLEEP stages (excluding AWAKE and RESTLESS). For "stages" sleep it is the sum of LIGHT, REM and DEEP stages (excluding AWAKE).',
      ).optional(),
      minutesAwake: z.string().describe(
        "Output only. Total number of minutes awake. It is a sum of all AWAKE stages.",
      ).optional(),
      minutesInSleepPeriod: z.string().describe(
        "Output only. Delta between wake time and bedtime. It is the sum of all stages.",
      ).optional(),
      minutesToFallAsleep: z.string().describe(
        "Output only. Minutes to fall asleep calculated by restlessness algorithm.",
      ).optional(),
      stagesSummary: z.array(z.object({
        count: z.string().describe(
          "Output only. Number of sleep stages segments.",
        ).optional(),
        minutes: z.string().describe(
          "Output only. Total duration in minutes of a sleep stage.",
        ).optional(),
        type: z.enum([
          "SLEEP_STAGE_TYPE_UNSPECIFIED",
          "AWAKE",
          "LIGHT",
          "DEEP",
          "REM",
          "ASLEEP",
          "RESTLESS",
        ]).describe(
          "Output only. Sleep stage type: AWAKE, DEEP, REM, LIGHT etc.",
        ).optional(),
      })).describe(
        "Output only. List of summaries (total duration and segment count) per each sleep stage type.",
      ).optional(),
    }).describe("Sleep summary: metrics and stages summary.").optional(),
    type: z.enum(["SLEEP_TYPE_UNSPECIFIED", "CLASSIC", "STAGES"]).describe(
      "Optional. SleepType: classic or stages.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. Last update time of this sleep observation.",
    ).optional(),
  }).describe("A sleep session possibly including stages.").optional(),
  steps: z.object({
    count: z.string().describe(
      "Required. Number of steps in the recorded interval.",
    ).optional(),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      civilStartTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      endTime: z.string().describe("Required. Observed interval end time.")
        .optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe("Required. Observed interval start time.")
        .optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a time interval of an observed data point.")
      .optional(),
  }).describe("Step count over the time interval.").optional(),
  swimLengthsData: z.object({
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      civilStartTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      endTime: z.string().describe("Required. Observed interval end time.")
        .optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe("Required. Observed interval start time.")
        .optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a time interval of an observed data point.")
      .optional(),
    strokeCount: z.string().describe("Required. Number of strokes in the lap.")
      .optional(),
    swimStrokeType: z.enum([
      "SWIM_STROKE_TYPE_UNSPECIFIED",
      "FREESTYLE",
      "BACKSTROKE",
      "BREASTSTROKE",
      "BUTTERFLY",
    ]).describe("Required. Swim stroke type.").optional(),
  }).describe("Swim lengths data over the time interval.").optional(),
  timeInHeartRateZone: z.object({
    heartRateZoneType: z.enum([
      "HEART_RATE_ZONE_TYPE_UNSPECIFIED",
      "LIGHT",
      "MODERATE",
      "VIGOROUS",
      "PEAK",
    ]).describe("Required. Heart rate zone type.").optional(),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      civilStartTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      endTime: z.string().describe("Required. Observed interval end time.")
        .optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe("Required. Observed interval start time.")
        .optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a time interval of an observed data point.")
      .optional(),
  }).describe(
    "Time in heart rate zone record. It's an interval spent in specific heart rate zone.",
  ).optional(),
  vo2Max: z.object({
    measurementMethod: z.enum([
      "MEASUREMENT_METHOD_UNSPECIFIED",
      "FITBIT_RUN",
      "GOOGLE_DEMOGRAPHIC",
      "COOPER_TEST",
      "HEART_RATE_RATIO",
      "METABOLIC_CART",
      "MULTISTAGE_FITNESS_TEST",
      "ROCKPORT_FITNESS_TEST",
      "MAX_EXERCISE",
      "PREDICTION_SUB_MAX_EXERCISE",
      "PREDICTION_NON_EXERCISE",
      "OTHER",
    ]).describe("Optional. The method used to measure the VO2 max value.")
      .optional(),
    sampleTime: z.object({
      civilTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      physicalTime: z.string().describe(
        "Required. The time of the observation.",
      ).optional(),
      utcOffset: z.string().describe(
        "Required. The offset of the user's local time during the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a sample time of an observed data point.")
      .optional(),
    vo2Max: z.number().describe(
      "Required. VO2 max value measured as in ml consumed oxygen / kg of body weight / min.",
    ).optional(),
  }).describe("VO2 max measurement.").optional(),
  weight: z.object({
    notes: z.string().describe(
      "Optional. Standard free-form notes captured at manual logging.",
    ).optional(),
    sampleTime: z.object({
      civilTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      physicalTime: z.string().describe(
        "Required. The time of the observation.",
      ).optional(),
      utcOffset: z.string().describe(
        "Required. The offset of the user's local time during the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a sample time of an observed data point.")
      .optional(),
    weightGrams: z.number().describe("Required. Weight of a user in grams.")
      .optional(),
  }).describe("Body weight measurement.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  activeMinutes: z.object({
    activeMinutesByActivityLevel: z.array(z.object({
      activeMinutes: z.string(),
      activityLevel: z.string(),
    })),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      civilStartTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      endTime: z.string(),
      endUtcOffset: z.string(),
      startTime: z.string(),
      startUtcOffset: z.string(),
    }),
  }).optional(),
  activeZoneMinutes: z.object({
    activeZoneMinutes: z.string(),
    heartRateZone: z.string(),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      civilStartTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      endTime: z.string(),
      endUtcOffset: z.string(),
      startTime: z.string(),
      startUtcOffset: z.string(),
    }),
  }).optional(),
  activityLevel: z.object({
    activityLevelType: z.string(),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      civilStartTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      endTime: z.string(),
      endUtcOffset: z.string(),
      startTime: z.string(),
      startUtcOffset: z.string(),
    }),
  }).optional(),
  altitude: z.object({
    gainMillimeters: z.string(),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      civilStartTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      endTime: z.string(),
      endUtcOffset: z.string(),
      startTime: z.string(),
      startUtcOffset: z.string(),
    }),
  }).optional(),
  basalEnergyBurned: z.object({
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      civilStartTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      endTime: z.string(),
      endUtcOffset: z.string(),
      startTime: z.string(),
      startUtcOffset: z.string(),
    }),
    kcal: z.number(),
  }).optional(),
  bodyFat: z.object({
    percentage: z.number(),
    sampleTime: z.object({
      civilTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      physicalTime: z.string(),
      utcOffset: z.string(),
    }),
  }).optional(),
  dailyHeartRateVariability: z.object({
    averageHeartRateVariabilityMilliseconds: z.number(),
    date: z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
    deepSleepRootMeanSquareOfSuccessiveDifferencesMilliseconds: z.number(),
    entropy: z.number(),
    nonRemHeartRateBeatsPerMinute: z.string(),
  }).optional(),
  dailyHeartRateZones: z.object({
    date: z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
    heartRateZones: z.array(z.object({
      heartRateZoneType: z.string(),
      maxBeatsPerMinute: z.string(),
      minBeatsPerMinute: z.string(),
    })),
  }).optional(),
  dailyOxygenSaturation: z.object({
    averagePercentage: z.number(),
    date: z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
    lowerBoundPercentage: z.number(),
    standardDeviationPercentage: z.number(),
    upperBoundPercentage: z.number(),
  }).optional(),
  dailyRespiratoryRate: z.object({
    breathsPerMinute: z.number(),
    date: z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
  }).optional(),
  dailyRestingHeartRate: z.object({
    beatsPerMinute: z.string(),
    dailyRestingHeartRateMetadata: z.object({
      calculationMethod: z.string(),
    }),
    date: z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
  }).optional(),
  dailySleepTemperatureDerivations: z.object({
    baselineTemperatureCelsius: z.number(),
    date: z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
    nightlyTemperatureCelsius: z.number(),
    relativeNightlyStddev30dCelsius: z.number(),
  }).optional(),
  dailyVo2Max: z.object({
    cardioFitnessLevel: z.string(),
    date: z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
    estimated: z.boolean(),
    vo2Max: z.number(),
    vo2MaxCovariance: z.number(),
  }).optional(),
  dataSource: z.object({
    application: z.object({
      googleWebClientId: z.string(),
      packageName: z.string(),
      webClientId: z.string(),
    }),
    device: z.object({
      displayName: z.string(),
      formFactor: z.string(),
      manufacturer: z.string(),
    }),
    platform: z.string(),
    recordingMethod: z.string(),
  }).optional(),
  distance: z.object({
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      civilStartTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      endTime: z.string(),
      endUtcOffset: z.string(),
      startTime: z.string(),
      startUtcOffset: z.string(),
    }),
    millimeters: z.string(),
  }).optional(),
  exercise: z.object({
    activeDuration: z.string(),
    createTime: z.string(),
    displayName: z.string(),
    exerciseEvents: z.array(z.object({
      eventTime: z.string(),
      eventUtcOffset: z.string(),
      exerciseEventType: z.string(),
    })),
    exerciseMetadata: z.object({
      hasGps: z.boolean(),
      poolLengthMillimeters: z.string(),
    }),
    exerciseType: z.string(),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      civilStartTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      endTime: z.string(),
      endUtcOffset: z.string(),
      startTime: z.string(),
      startUtcOffset: z.string(),
    }),
    metricsSummary: z.object({
      activeZoneMinutes: z.string(),
      averageHeartRateBeatsPerMinute: z.string(),
      averagePaceSecondsPerMeter: z.number(),
      averageSpeedMillimetersPerSecond: z.number(),
      caloriesKcal: z.number(),
      distanceMillimeters: z.number(),
      elevationGainMillimeters: z.number(),
      heartRateZoneDurations: z.object({
        lightTime: z.string(),
        moderateTime: z.string(),
        peakTime: z.string(),
        vigorousTime: z.string(),
      }),
      mobilityMetrics: z.object({
        avgCadenceStepsPerMinute: z.number(),
        avgGroundContactTimeDuration: z.string(),
        avgStrideLengthMillimeters: z.string(),
        avgVerticalOscillationMillimeters: z.string(),
        avgVerticalRatio: z.number(),
      }),
      runVo2Max: z.number(),
      steps: z.string(),
      totalSwimLengths: z.number(),
    }),
    notes: z.string(),
    splitSummaries: z.array(z.object({
      activeDuration: z.string(),
      endTime: z.string(),
      endUtcOffset: z.string(),
      metricsSummary: z.object({
        activeZoneMinutes: z.string(),
        averageHeartRateBeatsPerMinute: z.string(),
        averagePaceSecondsPerMeter: z.number(),
        averageSpeedMillimetersPerSecond: z.number(),
        caloriesKcal: z.number(),
        distanceMillimeters: z.number(),
        elevationGainMillimeters: z.number(),
        heartRateZoneDurations: z.object({
          lightTime: z.unknown(),
          moderateTime: z.unknown(),
          peakTime: z.unknown(),
          vigorousTime: z.unknown(),
        }),
        mobilityMetrics: z.object({
          avgCadenceStepsPerMinute: z.unknown(),
          avgGroundContactTimeDuration: z.unknown(),
          avgStrideLengthMillimeters: z.unknown(),
          avgVerticalOscillationMillimeters: z.unknown(),
          avgVerticalRatio: z.unknown(),
        }),
        runVo2Max: z.number(),
        steps: z.string(),
        totalSwimLengths: z.number(),
      }),
      splitType: z.string(),
      startTime: z.string(),
      startUtcOffset: z.string(),
    })),
    splits: z.array(z.object({
      activeDuration: z.string(),
      endTime: z.string(),
      endUtcOffset: z.string(),
      metricsSummary: z.object({
        activeZoneMinutes: z.string(),
        averageHeartRateBeatsPerMinute: z.string(),
        averagePaceSecondsPerMeter: z.number(),
        averageSpeedMillimetersPerSecond: z.number(),
        caloriesKcal: z.number(),
        distanceMillimeters: z.number(),
        elevationGainMillimeters: z.number(),
        heartRateZoneDurations: z.object({
          lightTime: z.unknown(),
          moderateTime: z.unknown(),
          peakTime: z.unknown(),
          vigorousTime: z.unknown(),
        }),
        mobilityMetrics: z.object({
          avgCadenceStepsPerMinute: z.unknown(),
          avgGroundContactTimeDuration: z.unknown(),
          avgStrideLengthMillimeters: z.unknown(),
          avgVerticalOscillationMillimeters: z.unknown(),
          avgVerticalRatio: z.unknown(),
        }),
        runVo2Max: z.number(),
        steps: z.string(),
        totalSwimLengths: z.number(),
      }),
      splitType: z.string(),
      startTime: z.string(),
      startUtcOffset: z.string(),
    })),
    updateTime: z.string(),
  }).optional(),
  floors: z.object({
    count: z.string(),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      civilStartTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      endTime: z.string(),
      endUtcOffset: z.string(),
      startTime: z.string(),
      startUtcOffset: z.string(),
    }),
  }).optional(),
  heartRate: z.object({
    beatsPerMinute: z.string(),
    metadata: z.object({
      motionContext: z.string(),
      sensorLocation: z.string(),
    }),
    sampleTime: z.object({
      civilTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      physicalTime: z.string(),
      utcOffset: z.string(),
    }),
  }).optional(),
  heartRateVariability: z.object({
    rootMeanSquareOfSuccessiveDifferencesMilliseconds: z.number(),
    sampleTime: z.object({
      civilTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      physicalTime: z.string(),
      utcOffset: z.string(),
    }),
    standardDeviationMilliseconds: z.number(),
  }).optional(),
  height: z.object({
    heightMillimeters: z.string(),
    sampleTime: z.object({
      civilTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      physicalTime: z.string(),
      utcOffset: z.string(),
    }),
  }).optional(),
  hydrationLog: z.object({
    amountConsumed: z.object({
      milliliters: z.number(),
      userProvidedUnit: z.string(),
    }),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      civilStartTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      endTime: z.string(),
      endUtcOffset: z.string(),
      startTime: z.string(),
      startUtcOffset: z.string(),
    }),
  }).optional(),
  name: z.string(),
  oxygenSaturation: z.object({
    percentage: z.number(),
    sampleTime: z.object({
      civilTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      physicalTime: z.string(),
      utcOffset: z.string(),
    }),
  }).optional(),
  respiratoryRateSleepSummary: z.object({
    deepSleepStats: z.object({
      breathsPerMinute: z.number(),
      signalToNoise: z.number(),
      standardDeviation: z.number(),
    }),
    fullSleepStats: z.object({
      breathsPerMinute: z.number(),
      signalToNoise: z.number(),
      standardDeviation: z.number(),
    }),
    lightSleepStats: z.object({
      breathsPerMinute: z.number(),
      signalToNoise: z.number(),
      standardDeviation: z.number(),
    }),
    remSleepStats: z.object({
      breathsPerMinute: z.number(),
      signalToNoise: z.number(),
      standardDeviation: z.number(),
    }),
    sampleTime: z.object({
      civilTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      physicalTime: z.string(),
      utcOffset: z.string(),
    }),
  }).optional(),
  runVo2Max: z.object({
    runVo2Max: z.number(),
    sampleTime: z.object({
      civilTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      physicalTime: z.string(),
      utcOffset: z.string(),
    }),
  }).optional(),
  sedentaryPeriod: z.object({
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      civilStartTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      endTime: z.string(),
      endUtcOffset: z.string(),
      startTime: z.string(),
      startUtcOffset: z.string(),
    }),
  }).optional(),
  sleep: z.object({
    createTime: z.string(),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      civilStartTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      endTime: z.string(),
      endUtcOffset: z.string(),
      startTime: z.string(),
      startUtcOffset: z.string(),
    }),
    metadata: z.object({
      externalId: z.string(),
      manuallyEdited: z.boolean(),
      nap: z.boolean(),
      processed: z.boolean(),
      stagesStatus: z.string(),
    }),
    outOfBedSegments: z.array(z.object({
      endTime: z.string(),
      endUtcOffset: z.string(),
      startTime: z.string(),
      startUtcOffset: z.string(),
    })),
    stages: z.array(z.object({
      createTime: z.string(),
      endTime: z.string(),
      endUtcOffset: z.string(),
      startTime: z.string(),
      startUtcOffset: z.string(),
      type: z.string(),
      updateTime: z.string(),
    })),
    summary: z.object({
      minutesAfterWakeUp: z.string(),
      minutesAsleep: z.string(),
      minutesAwake: z.string(),
      minutesInSleepPeriod: z.string(),
      minutesToFallAsleep: z.string(),
      stagesSummary: z.array(z.object({
        count: z.string(),
        minutes: z.string(),
        type: z.string(),
      })),
    }),
    type: z.string(),
    updateTime: z.string(),
  }).optional(),
  steps: z.object({
    count: z.string(),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      civilStartTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      endTime: z.string(),
      endUtcOffset: z.string(),
      startTime: z.string(),
      startUtcOffset: z.string(),
    }),
  }).optional(),
  swimLengthsData: z.object({
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      civilStartTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      endTime: z.string(),
      endUtcOffset: z.string(),
      startTime: z.string(),
      startUtcOffset: z.string(),
    }),
    strokeCount: z.string(),
    swimStrokeType: z.string(),
  }).optional(),
  timeInHeartRateZone: z.object({
    heartRateZoneType: z.string(),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      civilStartTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      endTime: z.string(),
      endUtcOffset: z.string(),
      startTime: z.string(),
      startUtcOffset: z.string(),
    }),
  }).optional(),
  vo2Max: z.object({
    measurementMethod: z.string(),
    sampleTime: z.object({
      civilTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      physicalTime: z.string(),
      utcOffset: z.string(),
    }),
    vo2Max: z.number(),
  }).optional(),
  weight: z.object({
    notes: z.string(),
    sampleTime: z.object({
      civilTime: z.object({
        date: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        time: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      physicalTime: z.string(),
      utcOffset: z.string(),
    }),
    weightGrams: z.number(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  activeMinutes: z.object({
    activeMinutesByActivityLevel: z.array(z.object({
      activeMinutes: z.string().describe(
        "Required. Number of whole minutes spent in activity.",
      ).optional(),
      activityLevel: z.enum([
        "ACTIVITY_LEVEL_UNSPECIFIED",
        "LIGHT",
        "MODERATE",
        "VIGOROUS",
      ]).describe("Required. The level of activity.").optional(),
    })).describe(
      "Required. Active minutes by activity level. At most one record per activity level is allowed.",
    ).optional(),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      civilStartTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      endTime: z.string().describe("Required. Observed interval end time.")
        .optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe("Required. Observed interval start time.")
        .optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a time interval of an observed data point.")
      .optional(),
  }).describe("Record of active minutes in a given time interval.").optional(),
  activeZoneMinutes: z.object({
    activeZoneMinutes: z.string().describe(
      "Required. Number of Active Zone Minutes earned in the given time interval. Note: active_zone_minutes equals to 1 for low intensity (fat burn) zones or 2 for high intensity zones (cardio, peak).",
    ).optional(),
    heartRateZone: z.enum([
      "HEART_RATE_ZONE_UNSPECIFIED",
      "FAT_BURN",
      "CARDIO",
      "PEAK",
    ]).describe(
      "Required. Heart rate zone in which the active zone minutes have been earned, in the given time interval.",
    ).optional(),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      civilStartTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      endTime: z.string().describe("Required. Observed interval end time.")
        .optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe("Required. Observed interval start time.")
        .optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a time interval of an observed data point.")
      .optional(),
  }).describe("Record of active zone minutes in a given time interval.")
    .optional(),
  activityLevel: z.object({
    activityLevelType: z.enum([
      "ACTIVITY_LEVEL_TYPE_UNSPECIFIED",
      "SEDENTARY",
      "LIGHTLY_ACTIVE",
      "MODERATELY_ACTIVE",
      "VERY_ACTIVE",
    ]).describe("Required. Activity level type in the given time interval.")
      .optional(),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      civilStartTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      endTime: z.string().describe("Required. Observed interval end time.")
        .optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe("Required. Observed interval start time.")
        .optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a time interval of an observed data point.")
      .optional(),
  }).describe(
    "Internal type to capture activity level during a certain time interval.",
  ).optional(),
  altitude: z.object({
    gainMillimeters: z.string().describe(
      "Required. Altitude gain in millimeters over the observed interval.",
    ).optional(),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      civilStartTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      endTime: z.string().describe("Required. Observed interval end time.")
        .optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe("Required. Observed interval start time.")
        .optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a time interval of an observed data point.")
      .optional(),
  }).describe(
    "Captures the altitude gain (i.e. deltas), and not level above sea, for a user in millimeters.",
  ).optional(),
  basalEnergyBurned: z.object({
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      civilStartTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      endTime: z.string().describe("Required. Observed interval end time.")
        .optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe("Required. Observed interval start time.")
        .optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a time interval of an observed data point.")
      .optional(),
    kcal: z.number().describe(
      "Required. Number of calories burned due to basal metabolic rate in kilocalories over the observed interval.",
    ).optional(),
  }).describe(
    "Number of calories burned due to basal metabolic rate (BMR) over a period of time.",
  ).optional(),
  bodyFat: z.object({
    percentage: z.number().describe(
      "Required. Body fat percentage, in range [0, 100].",
    ).optional(),
    sampleTime: z.object({
      civilTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      physicalTime: z.string().describe(
        "Required. The time of the observation.",
      ).optional(),
      utcOffset: z.string().describe(
        "Required. The offset of the user's local time during the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a sample time of an observed data point.")
      .optional(),
  }).describe("Body fat measurement.").optional(),
  dailyHeartRateVariability: z.object({
    averageHeartRateVariabilityMilliseconds: z.number().describe(
      "Optional. A user's average heart rate variability calculated using the root mean square of successive differences (RMSSD) in times between heartbeats.",
    ).optional(),
    date: z.object({
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
    deepSleepRootMeanSquareOfSuccessiveDifferencesMilliseconds: z.number()
      .describe(
        "Optional. The root mean square of successive differences (RMSSD) value during deep sleep.",
      ).optional(),
    entropy: z.number().describe(
      "Optional. The Shanon entropy of heartbeat intervals. Entropy quantifies randomness or disorder in a system. High entropy indicates high HRV. Entropy is measured from the histogram of time interval between successive heart beats values measured during sleep.",
    ).optional(),
    nonRemHeartRateBeatsPerMinute: z.string().describe(
      "Optional. Non-REM heart rate",
    ).optional(),
  }).describe(
    "Represents the daily heart rate variability data type. At least one of the following fields must be set: - `average_heart_rate_variability_milliseconds` - `non_rem_heart_rate_beats_per_minute` - `entropy` - `deep_sleep_root_mean_square_of_successive_differences_milliseconds`",
  ).optional(),
  dailyHeartRateZones: z.object({
    date: z.object({
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
    heartRateZones: z.array(z.object({
      heartRateZoneType: z.enum([
        "HEART_RATE_ZONE_TYPE_UNSPECIFIED",
        "LIGHT",
        "MODERATE",
        "VIGOROUS",
        "PEAK",
      ]).describe("Required. The heart rate zone type.").optional(),
      maxBeatsPerMinute: z.string().describe(
        "Required. Maximum heart rate for this zone in beats per minute.",
      ).optional(),
      minBeatsPerMinute: z.string().describe(
        "Required. Minimum heart rate for this zone in beats per minute.",
      ).optional(),
    })).describe("Required. The heart rate zones.").optional(),
  }).describe(
    "User's heart rate zone thresholds based on the Karvonen algorithm for a specific day.",
  ).optional(),
  dailyOxygenSaturation: z.object({
    averagePercentage: z.number().describe(
      "Required. The average value of the oxygen saturation samples during the sleep.",
    ).optional(),
    date: z.object({
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
    lowerBoundPercentage: z.number().describe(
      "Required. The lower bound of the confidence interval of oxygen saturation samples during sleep.",
    ).optional(),
    standardDeviationPercentage: z.number().describe(
      "Optional. Standard deviation of the daily oxygen saturation averages from the past 7-30 days.",
    ).optional(),
    upperBoundPercentage: z.number().describe(
      "Required. The upper bound of the confidence interval of oxygen saturation samples during sleep.",
    ).optional(),
  }).describe(
    "A daily oxygen saturation (SpO2) record. Represents the user's daily oxygen saturation summary, typically calculated during sleep.",
  ).optional(),
  dailyRespiratoryRate: z.object({
    breathsPerMinute: z.number().describe(
      "Required. The average number of breaths taken per minute.",
    ).optional(),
    date: z.object({
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
  }).describe(
    "A daily average respiratory rate (breaths per minute) for a day of the year. One data point per day calculated for the main sleep.",
  ).optional(),
  dailyRestingHeartRate: z.object({
    beatsPerMinute: z.string().describe(
      "Required. The resting heart rate value in beats per minute.",
    ).optional(),
    dailyRestingHeartRateMetadata: z.object({
      calculationMethod: z.enum([
        "CALCULATION_METHOD_UNSPECIFIED",
        "WITH_SLEEP",
        "ONLY_WITH_AWAKE_DATA",
      ]).describe(
        "Required. The method used to calculate the resting heart rate.",
      ).optional(),
    }).describe("Metadata for the daily resting heart rate.").optional(),
    date: z.object({
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
  }).describe(
    "Measures the daily resting heart rate for a user, calculated using the all day heart rate measurements.",
  ).optional(),
  dailySleepTemperatureDerivations: z.object({
    baselineTemperatureCelsius: z.number().describe(
      "Optional. The user's baseline skin temperature. It is the median of the user's nightly skin temperature over the past 30 days.",
    ).optional(),
    date: z.object({
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
    nightlyTemperatureCelsius: z.number().describe(
      "Required. The user's nightly skin temperature. It is the mean of skin temperature samples taken from the user’s sleep.",
    ).optional(),
    relativeNightlyStddev30dCelsius: z.number().describe(
      "Optional. The standard deviation of the user’s relative nightly skin temperature (temperature - baseline) over the past 30 days.",
    ).optional(),
  }).describe(
    "Provides derived sleep temperature values, calculated from skin or internal device temperature readings during sleep.",
  ).optional(),
  dailyVo2Max: z.object({
    cardioFitnessLevel: z.enum([
      "CARDIO_FITNESS_LEVEL_UNSPECIFIED",
      "POOR",
      "FAIR",
      "AVERAGE",
      "GOOD",
      "VERY_GOOD",
      "EXCELLENT",
    ]).describe(
      "Optional. Represents the user's cardio fitness level based on their VO2 max.",
    ).optional(),
    date: z.object({
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
    estimated: z.boolean().describe(
      "Optional. An estimated field is added to indicate when the confidence has decreased sufficiently to consider the value an estimation.",
    ).optional(),
    vo2Max: z.number().describe(
      "Required. Daily VO2 max value measured as in ml consumed oxygen / kg of body weight / min.",
    ).optional(),
    vo2MaxCovariance: z.number().describe(
      "Optional. The covariance of the VO2 max value.",
    ).optional(),
  }).describe(
    "Contains a daily summary of the user's VO2 max (cardio fitness score), which is the maximum rate of oxygen the body can use during exercise.",
  ).optional(),
  dataSource: z.object({
    application: z.object({
      googleWebClientId: z.string().describe(
        "Output only. The Google OAuth 2.0 client ID of the web application or service that recorded the data. This is the client ID used during the Google OAuth flow to obtain user credentials. This field is system-populated when the data is uploaded from Google Web API.",
      ).optional(),
      packageName: z.string().describe(
        "Output only. A unique identifier for the mobile application that was the source of the data. This is typically the application's package name on Android (e.g., `com.google.fitbit`) or the bundle ID on iOS. This field is informational and helps trace data origin. This field is system-populated when the data is uploaded from the Fitbit mobile application, Health Connect or Health Kit.",
      ).optional(),
      webClientId: z.string().describe(
        "Output only. The client ID of the application that recorded the data. This ID is a legacy Fitbit API client ID, which is different from a Google OAuth client ID. Example format: `ABC123`. This field is system-populated and used for tracing data from legacy Fitbit API integrations. This field is system-populated when the data is uploaded from a legacy Fitbit API integration.",
      ).optional(),
    }).describe(
      "Optional metadata for the application that provided this data.",
    ).optional(),
    device: z.object({
      displayName: z.string().describe(
        "Optional. An optional name for the device.",
      ).optional(),
      formFactor: z.enum([
        "FORM_FACTOR_UNSPECIFIED",
        "FITNESS_BAND",
        "WATCH",
        "PHONE",
        "RING",
        "CHEST_STRAP",
        "SCALE",
        "TABLET",
        "HEAD_MOUNTED",
        "SMART_DISPLAY",
      ]).describe("Optional. Captures the form factor of the device.")
        .optional(),
      manufacturer: z.string().describe(
        "Optional. An optional manufacturer of the device.",
      ).optional(),
    }).describe(
      "Captures metadata about the device that recorded the measurement.",
    ).optional(),
    platform: z.enum([
      "PLATFORM_UNSPECIFIED",
      "FITBIT",
      "HEALTH_CONNECT",
      "HEALTH_KIT",
      "FIT",
      "FITBIT_WEB_API",
      "NEST",
      "GOOGLE_WEB_API",
      "GOOGLE_PARTNER_INTEGRATION",
    ]).describe("Output only. Captures the platform that uploaded the data.")
      .optional(),
    recordingMethod: z.enum([
      "RECORDING_METHOD_UNSPECIFIED",
      "MANUAL",
      "PASSIVELY_MEASURED",
      "DERIVED",
      "ACTIVELY_MEASURED",
      "UNKNOWN",
    ]).describe("Optional. Captures how the data was recorded.").optional(),
  }).describe(
    "Data Source definition to track the origin of data. Each health data point, regardless of the complexity or data model (whether a simple step count or a detailed sleep session) must retain information about its source of origin (e.g. the device or app that collected it).",
  ).optional(),
  distance: z.object({
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      civilStartTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      endTime: z.string().describe("Required. Observed interval end time.")
        .optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe("Required. Observed interval start time.")
        .optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a time interval of an observed data point.")
      .optional(),
    millimeters: z.string().describe(
      "Required. Distance in millimeters over the observed interval.",
    ).optional(),
  }).describe("Distance traveled over an interval of time.").optional(),
  exercise: z.object({
    activeDuration: z.string().describe("Optional. Duration excluding pauses.")
      .optional(),
    createTime: z.string().describe(
      "Output only. Represents the timestamp of the creation of the exercise.",
    ).optional(),
    displayName: z.string().describe("Required. Exercise display name.")
      .optional(),
    exerciseEvents: z.array(z.object({
      eventTime: z.string().describe("Required. Exercise event time")
        .optional(),
      eventUtcOffset: z.string().describe(
        "Required. Exercise event time offset from UTC",
      ).optional(),
      exerciseEventType: z.enum([
        "EXERCISE_EVENT_TYPE_UNSPECIFIED",
        "START",
        "STOP",
        "PAUSE",
        "RESUME",
        "AUTO_PAUSE",
        "AUTO_RESUME",
      ]).describe(
        "Required. The type of the event, such as start, stop, pause, resume.",
      ).optional(),
    })).describe(
      "Optional. Exercise events that happen during an exercise, such as pause & restarts.",
    ).optional(),
    exerciseMetadata: z.object({
      hasGps: z.boolean().describe(
        "Optional. Whether the exercise had GPS tracking.",
      ).optional(),
      poolLengthMillimeters: z.string().describe(
        "Optional. Pool length in millimeters. Only present in the swimming exercises.",
      ).optional(),
    }).describe("Additional exercise metadata.").optional(),
    exerciseType: z.enum([
      "EXERCISE_TYPE_UNSPECIFIED",
      "RUNNING",
      "WALKING",
      "BIKING",
      "SWIMMING",
      "HIKING",
      "YOGA",
      "PILATES",
      "WORKOUT",
      "HIIT",
      "WEIGHTLIFTING",
      "STRENGTH_TRAINING",
      "OTHER",
    ]).describe("Required. The type of activity performed during an exercise.")
      .optional(),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      civilStartTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      endTime: z.string().describe(
        "Required. The end time of the observed session.",
      ).optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the session relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe(
        "Required. The start time of the observed session.",
      ).optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the session relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe(
      "Represents a time interval of session data point, which bundles multiple observed metrics together.",
    ).optional(),
    metricsSummary: z.object({
      activeZoneMinutes: z.string().describe(
        "Optional. Total active zone minutes for the exercise.",
      ).optional(),
      averageHeartRateBeatsPerMinute: z.string().describe(
        "Optional. Average heart rate during the exercise.",
      ).optional(),
      averagePaceSecondsPerMeter: z.number().describe(
        "Optional. Average pace in seconds per meter.",
      ).optional(),
      averageSpeedMillimetersPerSecond: z.number().describe(
        "Optional. Average speed in millimeters per second.",
      ).optional(),
      caloriesKcal: z.number().describe(
        "Optional. Total calories burned by the user during the exercise.",
      ).optional(),
      distanceMillimeters: z.number().describe(
        "Optional. Total distance covered by the user during the exercise.",
      ).optional(),
      elevationGainMillimeters: z.number().describe(
        "Optional. Total elevation gain during the exercise.",
      ).optional(),
      heartRateZoneDurations: z.object({
        lightTime: z.string().describe(
          "Optional. Time spent in light heart rate zone.",
        ).optional(),
        moderateTime: z.string().describe(
          "Optional. Time spent in moderate heart rate zone.",
        ).optional(),
        peakTime: z.string().describe(
          "Optional. Time spent in peak heart rate zone.",
        ).optional(),
        vigorousTime: z.string().describe(
          "Optional. Time spent in vigorous heart rate zone.",
        ).optional(),
      }).describe("Time spent in each heart rate zone.").optional(),
      mobilityMetrics: z.object({
        avgCadenceStepsPerMinute: z.number().describe(
          "Optional. Cadence is a measure of the frequency of your foot strikes. Steps / min in real time during workout.",
        ).optional(),
        avgGroundContactTimeDuration: z.string().describe(
          "Optional. The ground contact time for a particular stride is the amount of time for which the foot was in contact with the ground on that stride",
        ).optional(),
        avgStrideLengthMillimeters: z.string().describe(
          "Optional. Stride length is a measure of the distance covered by a single stride",
        ).optional(),
        avgVerticalOscillationMillimeters: z.string().describe(
          "Optional. Distance off the ground your center of mass moves with each stride while running",
        ).optional(),
        avgVerticalRatio: z.number().describe(
          "Optional. Vertical oscillation/stride length between [5.0, 11.0].",
        ).optional(),
      }).describe("Mobility workouts specific metrics").optional(),
      runVo2Max: z.number().describe(
        "Optional. Run VO2 max value for the exercise. Only present in the running exercises at the top level as in the summary of the whole exercise.",
      ).optional(),
      steps: z.string().describe(
        "Optional. Total steps taken during the exercise.",
      ).optional(),
      totalSwimLengths: z.number().describe(
        "Optional. Number of full pool lengths completed during the exercise. Only present in the swimming exercises at the top level as in the summary of the whole exercise.",
      ).optional(),
    }).describe("Summary metrics for an exercise.").optional(),
    notes: z.string().describe(
      "Optional. Standard free-form notes captured at manual logging.",
    ).optional(),
    splitSummaries: z.array(z.object({
      activeDuration: z.string().describe(
        "Output only. Lap time excluding the pauses.",
      ).optional(),
      endTime: z.string().describe("Required. Lap end time").optional(),
      endUtcOffset: z.string().describe(
        "Required. Lap end time offset from UTC",
      ).optional(),
      metricsSummary: z.object({
        activeZoneMinutes: z.string().describe(
          "Optional. Total active zone minutes for the exercise.",
        ).optional(),
        averageHeartRateBeatsPerMinute: z.string().describe(
          "Optional. Average heart rate during the exercise.",
        ).optional(),
        averagePaceSecondsPerMeter: z.number().describe(
          "Optional. Average pace in seconds per meter.",
        ).optional(),
        averageSpeedMillimetersPerSecond: z.number().describe(
          "Optional. Average speed in millimeters per second.",
        ).optional(),
        caloriesKcal: z.number().describe(
          "Optional. Total calories burned by the user during the exercise.",
        ).optional(),
        distanceMillimeters: z.number().describe(
          "Optional. Total distance covered by the user during the exercise.",
        ).optional(),
        elevationGainMillimeters: z.number().describe(
          "Optional. Total elevation gain during the exercise.",
        ).optional(),
        heartRateZoneDurations: z.object({
          lightTime: z.unknown().describe(
            "Optional. Time spent in light heart rate zone.",
          ).optional(),
          moderateTime: z.unknown().describe(
            "Optional. Time spent in moderate heart rate zone.",
          ).optional(),
          peakTime: z.unknown().describe(
            "Optional. Time spent in peak heart rate zone.",
          ).optional(),
          vigorousTime: z.unknown().describe(
            "Optional. Time spent in vigorous heart rate zone.",
          ).optional(),
        }).describe("Time spent in each heart rate zone.").optional(),
        mobilityMetrics: z.object({
          avgCadenceStepsPerMinute: z.unknown().describe(
            "Optional. Cadence is a measure of the frequency of your foot strikes. Steps / min in real time during workout.",
          ).optional(),
          avgGroundContactTimeDuration: z.unknown().describe(
            "Optional. The ground contact time for a particular stride is the amount of time for which the foot was in contact with the ground on that stride",
          ).optional(),
          avgStrideLengthMillimeters: z.unknown().describe(
            "Optional. Stride length is a measure of the distance covered by a single stride",
          ).optional(),
          avgVerticalOscillationMillimeters: z.unknown().describe(
            "Optional. Distance off the ground your center of mass moves with each stride while running",
          ).optional(),
          avgVerticalRatio: z.unknown().describe(
            "Optional. Vertical oscillation/stride length between [5.0, 11.0].",
          ).optional(),
        }).describe("Mobility workouts specific metrics").optional(),
        runVo2Max: z.number().describe(
          "Optional. Run VO2 max value for the exercise. Only present in the running exercises at the top level as in the summary of the whole exercise.",
        ).optional(),
        steps: z.string().describe(
          "Optional. Total steps taken during the exercise.",
        ).optional(),
        totalSwimLengths: z.number().describe(
          "Optional. Number of full pool lengths completed during the exercise. Only present in the swimming exercises at the top level as in the summary of the whole exercise.",
        ).optional(),
      }).describe("Summary metrics for an exercise.").optional(),
      splitType: z.enum([
        "SPLIT_TYPE_UNSPECIFIED",
        "MANUAL",
        "DURATION",
        "DISTANCE",
        "CALORIES",
      ]).describe(
        "Required. Method used to split the exercise laps. Users may manually mark the lap as complete even if the tracking is automatic.",
      ).optional(),
      startTime: z.string().describe("Required. Lap start time").optional(),
      startUtcOffset: z.string().describe(
        "Required. Lap start time offset from UTC",
      ).optional(),
    })).describe(
      "Optional. Laps or splits recorded within an exercise. Laps could be split based on distance or other criteria (duration, etc.) Laps should not be overlapping with each other.",
    ).optional(),
    splits: z.array(z.object({
      activeDuration: z.string().describe(
        "Output only. Lap time excluding the pauses.",
      ).optional(),
      endTime: z.string().describe("Required. Lap end time").optional(),
      endUtcOffset: z.string().describe(
        "Required. Lap end time offset from UTC",
      ).optional(),
      metricsSummary: z.object({
        activeZoneMinutes: z.string().describe(
          "Optional. Total active zone minutes for the exercise.",
        ).optional(),
        averageHeartRateBeatsPerMinute: z.string().describe(
          "Optional. Average heart rate during the exercise.",
        ).optional(),
        averagePaceSecondsPerMeter: z.number().describe(
          "Optional. Average pace in seconds per meter.",
        ).optional(),
        averageSpeedMillimetersPerSecond: z.number().describe(
          "Optional. Average speed in millimeters per second.",
        ).optional(),
        caloriesKcal: z.number().describe(
          "Optional. Total calories burned by the user during the exercise.",
        ).optional(),
        distanceMillimeters: z.number().describe(
          "Optional. Total distance covered by the user during the exercise.",
        ).optional(),
        elevationGainMillimeters: z.number().describe(
          "Optional. Total elevation gain during the exercise.",
        ).optional(),
        heartRateZoneDurations: z.object({
          lightTime: z.unknown().describe(
            "Optional. Time spent in light heart rate zone.",
          ).optional(),
          moderateTime: z.unknown().describe(
            "Optional. Time spent in moderate heart rate zone.",
          ).optional(),
          peakTime: z.unknown().describe(
            "Optional. Time spent in peak heart rate zone.",
          ).optional(),
          vigorousTime: z.unknown().describe(
            "Optional. Time spent in vigorous heart rate zone.",
          ).optional(),
        }).describe("Time spent in each heart rate zone.").optional(),
        mobilityMetrics: z.object({
          avgCadenceStepsPerMinute: z.unknown().describe(
            "Optional. Cadence is a measure of the frequency of your foot strikes. Steps / min in real time during workout.",
          ).optional(),
          avgGroundContactTimeDuration: z.unknown().describe(
            "Optional. The ground contact time for a particular stride is the amount of time for which the foot was in contact with the ground on that stride",
          ).optional(),
          avgStrideLengthMillimeters: z.unknown().describe(
            "Optional. Stride length is a measure of the distance covered by a single stride",
          ).optional(),
          avgVerticalOscillationMillimeters: z.unknown().describe(
            "Optional. Distance off the ground your center of mass moves with each stride while running",
          ).optional(),
          avgVerticalRatio: z.unknown().describe(
            "Optional. Vertical oscillation/stride length between [5.0, 11.0].",
          ).optional(),
        }).describe("Mobility workouts specific metrics").optional(),
        runVo2Max: z.number().describe(
          "Optional. Run VO2 max value for the exercise. Only present in the running exercises at the top level as in the summary of the whole exercise.",
        ).optional(),
        steps: z.string().describe(
          "Optional. Total steps taken during the exercise.",
        ).optional(),
        totalSwimLengths: z.number().describe(
          "Optional. Number of full pool lengths completed during the exercise. Only present in the swimming exercises at the top level as in the summary of the whole exercise.",
        ).optional(),
      }).describe("Summary metrics for an exercise.").optional(),
      splitType: z.enum([
        "SPLIT_TYPE_UNSPECIFIED",
        "MANUAL",
        "DURATION",
        "DISTANCE",
        "CALORIES",
      ]).describe(
        "Required. Method used to split the exercise laps. Users may manually mark the lap as complete even if the tracking is automatic.",
      ).optional(),
      startTime: z.string().describe("Required. Lap start time").optional(),
      startUtcOffset: z.string().describe(
        "Required. Lap start time offset from UTC",
      ).optional(),
    })).describe(
      "Optional. The default split is 1 km or 1 mile. - if the movement distance is less than the default, then there are no splits - if the movement distance is greater than or equal to the default, then we have splits",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. This is the timestamp of the last update to the exercise.",
    ).optional(),
  }).describe("An exercise that stores information about a physical activity.")
    .optional(),
  floors: z.object({
    count: z.string().describe(
      "Required. Number of floors in the recorded interval",
    ).optional(),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      civilStartTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      endTime: z.string().describe("Required. Observed interval end time.")
        .optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe("Required. Observed interval start time.")
        .optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a time interval of an observed data point.")
      .optional(),
  }).describe("Gained elevation measured in floors over the time interval")
    .optional(),
  heartRate: z.object({
    beatsPerMinute: z.string().describe(
      "Required. The heart rate value in beats per minute.",
    ).optional(),
    metadata: z.object({
      motionContext: z.enum([
        "MOTION_CONTEXT_UNSPECIFIED",
        "ACTIVE",
        "SEDENTARY",
      ]).describe(
        "Optional. Indicates the user’s level of activity when the heart rate sample was measured",
      ).optional(),
      sensorLocation: z.enum([
        "SENSOR_LOCATION_UNSPECIFIED",
        "CHEST",
        "WRIST",
        "FINGER",
        "HAND",
        "EAR_LOBE",
        "FOOT",
      ]).describe(
        "Optional. Indicates the location of the sensor that measured the heart rate.",
      ).optional(),
    }).describe("Heart rate metadata.").optional(),
    sampleTime: z.object({
      civilTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      physicalTime: z.string().describe(
        "Required. The time of the observation.",
      ).optional(),
      utcOffset: z.string().describe(
        "Required. The offset of the user's local time during the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a sample time of an observed data point.")
      .optional(),
  }).describe("A heart rate measurement.").optional(),
  heartRateVariability: z.object({
    rootMeanSquareOfSuccessiveDifferencesMilliseconds: z.number().describe(
      "Optional. The root mean square of successive differences between normal heartbeats. This is a measure of heart rate variability used by Google Health.",
    ).optional(),
    sampleTime: z.object({
      civilTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      physicalTime: z.string().describe(
        "Required. The time of the observation.",
      ).optional(),
      utcOffset: z.string().describe(
        "Required. The offset of the user's local time during the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a sample time of an observed data point.")
      .optional(),
    standardDeviationMilliseconds: z.number().describe(
      "Optional. The standard deviation of the heart rate variability measurement.",
    ).optional(),
  }).describe(
    "Captures user's heart rate variability (HRV) as measured by the root mean square of successive differences (RMSSD) between normal heartbeats or by standard deviation of the inter-beat intervals (SDNN).",
  ).optional(),
  height: z.object({
    heightMillimeters: z.string().describe(
      "Required. Height of the user in millimeters.",
    ).optional(),
    sampleTime: z.object({
      civilTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      physicalTime: z.string().describe(
        "Required. The time of the observation.",
      ).optional(),
      utcOffset: z.string().describe(
        "Required. The offset of the user's local time during the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a sample time of an observed data point.")
      .optional(),
  }).describe("Body height measurement.").optional(),
  hydrationLog: z.object({
    amountConsumed: z.object({
      milliliters: z.number().describe(
        "Required. Value representing the volume in milliliters.",
      ).optional(),
      userProvidedUnit: z.enum([
        "VOLUME_UNIT_UNSPECIFIED",
        "CUP_IMPERIAL",
        "CUP_US",
        "FLUID_OUNCE_IMPERIAL",
        "FLUID_OUNCE_US",
        "LITER",
        "MILLILITER",
        "PINT_IMPERIAL",
        "PINT_US",
      ]).describe(
        "Optional. Value representing the user provided unit, used only for user-facing input and display purposes. In the API format, all volume quantities are converted to milliliters.",
      ).optional(),
    }).describe("Represents the volume quantity.").optional(),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      civilStartTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      endTime: z.string().describe(
        "Required. The end time of the observed session.",
      ).optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the session relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe(
        "Required. The start time of the observed session.",
      ).optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the session relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe(
      "Represents a time interval of session data point, which bundles multiple observed metrics together.",
    ).optional(),
  }).describe("Holds information about a user logged hydration.").optional(),
  name: z.string().describe(
    "Identifier. Data point name, only supported for the subset of identifiable data types. For the majority of the data types, individual data points do not need to be identified and this field would be empty. Format: `users/{user}/dataTypes/{data_type}/dataPoints/{data_point}` Example: `users/abcd1234/dataTypes/sleep/dataPoints/a1b2c3d4-e5f6-7890-1234-567890abcdef` The `{user}` ID is a system-generated identifier, as described in Identity.health_user_id. The `{data_type}` ID corresponds to the kebab-case version of the field names in the DataPoint data union field, e.g. `total-calories` for the `total_calories` field. The `{data_point}` ID can be client-provided or system-generated. If client-provided, it must be a string of 4-63 characters, containing only lowercase letters, numbers, and hyphens.",
  ).optional(),
  oxygenSaturation: z.object({
    percentage: z.number().describe(
      "Required. The oxygen saturation percentage. Valid values are from 0 to 100.",
    ).optional(),
    sampleTime: z.object({
      civilTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      physicalTime: z.string().describe(
        "Required. The time of the observation.",
      ).optional(),
      utcOffset: z.string().describe(
        "Required. The offset of the user's local time during the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a sample time of an observed data point.")
      .optional(),
  }).describe(
    "Captures the user's instantaneous oxygen saturation percentage (SpO2).",
  ).optional(),
  respiratoryRateSleepSummary: z.object({
    deepSleepStats: z.object({
      breathsPerMinute: z.number().describe(
        "Required. Average breaths per minute.",
      ).optional(),
      signalToNoise: z.number().describe(
        "Optional. How trustworthy the data is for the computation.",
      ).optional(),
      standardDeviation: z.number().describe(
        "Optional. Standard deviation of the respiratory rate during sleep.",
      ).optional(),
    }).describe("Respiratory rate statistics for a given sleep stage.")
      .optional(),
    fullSleepStats: z.object({
      breathsPerMinute: z.number().describe(
        "Required. Average breaths per minute.",
      ).optional(),
      signalToNoise: z.number().describe(
        "Optional. How trustworthy the data is for the computation.",
      ).optional(),
      standardDeviation: z.number().describe(
        "Optional. Standard deviation of the respiratory rate during sleep.",
      ).optional(),
    }).describe("Respiratory rate statistics for a given sleep stage.")
      .optional(),
    lightSleepStats: z.object({
      breathsPerMinute: z.number().describe(
        "Required. Average breaths per minute.",
      ).optional(),
      signalToNoise: z.number().describe(
        "Optional. How trustworthy the data is for the computation.",
      ).optional(),
      standardDeviation: z.number().describe(
        "Optional. Standard deviation of the respiratory rate during sleep.",
      ).optional(),
    }).describe("Respiratory rate statistics for a given sleep stage.")
      .optional(),
    remSleepStats: z.object({
      breathsPerMinute: z.number().describe(
        "Required. Average breaths per minute.",
      ).optional(),
      signalToNoise: z.number().describe(
        "Optional. How trustworthy the data is for the computation.",
      ).optional(),
      standardDeviation: z.number().describe(
        "Optional. Standard deviation of the respiratory rate during sleep.",
      ).optional(),
    }).describe("Respiratory rate statistics for a given sleep stage.")
      .optional(),
    sampleTime: z.object({
      civilTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      physicalTime: z.string().describe(
        "Required. The time of the observation.",
      ).optional(),
      utcOffset: z.string().describe(
        "Required. The offset of the user's local time during the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a sample time of an observed data point.")
      .optional(),
  }).describe(
    "Records respiratory rate details during sleep. Can have multiple per day if the user sleeps multiple times.",
  ).optional(),
  runVo2Max: z.object({
    runVo2Max: z.number().describe("Required. Run VO2 max value in ml/kg/min.")
      .optional(),
    sampleTime: z.object({
      civilTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      physicalTime: z.string().describe(
        "Required. The time of the observation.",
      ).optional(),
      utcOffset: z.string().describe(
        "Required. The offset of the user's local time during the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a sample time of an observed data point.")
      .optional(),
  }).describe(
    "VO2 max value calculated based on the user's running activity. Value stored in ml/kg/min.",
  ).optional(),
  sedentaryPeriod: z.object({
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      civilStartTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      endTime: z.string().describe("Required. Observed interval end time.")
        .optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe("Required. Observed interval start time.")
        .optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a time interval of an observed data point.")
      .optional(),
  }).describe(
    "SedentaryPeriod SedentaryPeriod data represents the periods of time that the user was sedentary (i.e. not moving while wearing the device).",
  ).optional(),
  sleep: z.object({
    createTime: z.string().describe(
      "Output only. Creation time of this sleep observation.",
    ).optional(),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      civilStartTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      endTime: z.string().describe(
        "Required. The end time of the observed session.",
      ).optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the session relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe(
        "Required. The start time of the observed session.",
      ).optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the session relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe(
      "Represents a time interval of session data point, which bundles multiple observed metrics together.",
    ).optional(),
    metadata: z.object({
      externalId: z.string().describe(
        "Optional. Sleep identifier relevant in the context of the data source.",
      ).optional(),
      manuallyEdited: z.boolean().describe(
        "Output only. Some sleeps autodetected by algorithms can be manually edited by users.",
      ).optional(),
      nap: z.boolean().describe(
        "Output only. Naps are sleeps without stages and relatively short durations.",
      ).optional(),
      processed: z.boolean().describe(
        "Output only. Sleep and sleep stages algorithms finished processing.",
      ).optional(),
      stagesStatus: z.enum([
        "STAGES_STATE_UNSPECIFIED",
        "REJECTED_COVERAGE",
        "REJECTED_MAX_GAP",
        "REJECTED_START_GAP",
        "REJECTED_END_GAP",
        "REJECTED_NAP",
        "REJECTED_SERVER",
        "TIMEOUT",
        "SUCCEEDED",
        "PROCESSING_INTERNAL_ERROR",
      ]).describe("Output only. Sleep stages algorithm processing status.")
        .optional(),
    }).describe("Additional information about how the sleep was processed.")
      .optional(),
    outOfBedSegments: z.array(z.object({
      endTime: z.string().describe("Required. Segment end time.").optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the segment relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe("Required. Segment tart time.").optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the segment relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    })).describe(
      "Optional. “Out of bed” segments that can overlap with sleep stages.",
    ).optional(),
    stages: z.array(z.object({
      createTime: z.string().describe(
        "Output only. Creation time of this sleep stages segment.",
      ).optional(),
      endTime: z.string().describe("Required. Sleep stage end time.")
        .optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the sleep stage relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe("Required. Sleep stage start time.")
        .optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the sleep stage relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      type: z.enum([
        "SLEEP_STAGE_TYPE_UNSPECIFIED",
        "AWAKE",
        "LIGHT",
        "DEEP",
        "REM",
        "ASLEEP",
        "RESTLESS",
      ]).describe("Required. Sleep stage type: AWAKE, DEEP, REM, LIGHT etc.")
        .optional(),
      updateTime: z.string().describe(
        "Output only. Last update time of this sleep stages segment.",
      ).optional(),
    })).describe(
      "Optional. List of non-overlapping contiguous sleep stage segments that cover the sleep period.",
    ).optional(),
    summary: z.object({
      minutesAfterWakeUp: z.string().describe(
        "Output only. Minutes after wake up calculated by restlessness algorithm.",
      ).optional(),
      minutesAsleep: z.string().describe(
        'Output only. Total number of minutes asleep. For classic sleep it is the sum of ASLEEP stages (excluding AWAKE and RESTLESS). For "stages" sleep it is the sum of LIGHT, REM and DEEP stages (excluding AWAKE).',
      ).optional(),
      minutesAwake: z.string().describe(
        "Output only. Total number of minutes awake. It is a sum of all AWAKE stages.",
      ).optional(),
      minutesInSleepPeriod: z.string().describe(
        "Output only. Delta between wake time and bedtime. It is the sum of all stages.",
      ).optional(),
      minutesToFallAsleep: z.string().describe(
        "Output only. Minutes to fall asleep calculated by restlessness algorithm.",
      ).optional(),
      stagesSummary: z.array(z.object({
        count: z.string().describe(
          "Output only. Number of sleep stages segments.",
        ).optional(),
        minutes: z.string().describe(
          "Output only. Total duration in minutes of a sleep stage.",
        ).optional(),
        type: z.enum([
          "SLEEP_STAGE_TYPE_UNSPECIFIED",
          "AWAKE",
          "LIGHT",
          "DEEP",
          "REM",
          "ASLEEP",
          "RESTLESS",
        ]).describe(
          "Output only. Sleep stage type: AWAKE, DEEP, REM, LIGHT etc.",
        ).optional(),
      })).describe(
        "Output only. List of summaries (total duration and segment count) per each sleep stage type.",
      ).optional(),
    }).describe("Sleep summary: metrics and stages summary.").optional(),
    type: z.enum(["SLEEP_TYPE_UNSPECIFIED", "CLASSIC", "STAGES"]).describe(
      "Optional. SleepType: classic or stages.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. Last update time of this sleep observation.",
    ).optional(),
  }).describe("A sleep session possibly including stages.").optional(),
  steps: z.object({
    count: z.string().describe(
      "Required. Number of steps in the recorded interval.",
    ).optional(),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      civilStartTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      endTime: z.string().describe("Required. Observed interval end time.")
        .optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe("Required. Observed interval start time.")
        .optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a time interval of an observed data point.")
      .optional(),
  }).describe("Step count over the time interval.").optional(),
  swimLengthsData: z.object({
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      civilStartTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      endTime: z.string().describe("Required. Observed interval end time.")
        .optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe("Required. Observed interval start time.")
        .optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a time interval of an observed data point.")
      .optional(),
    strokeCount: z.string().describe("Required. Number of strokes in the lap.")
      .optional(),
    swimStrokeType: z.enum([
      "SWIM_STROKE_TYPE_UNSPECIFIED",
      "FREESTYLE",
      "BACKSTROKE",
      "BREASTSTROKE",
      "BUTTERFLY",
    ]).describe("Required. Swim stroke type.").optional(),
  }).describe("Swim lengths data over the time interval.").optional(),
  timeInHeartRateZone: z.object({
    heartRateZoneType: z.enum([
      "HEART_RATE_ZONE_TYPE_UNSPECIFIED",
      "LIGHT",
      "MODERATE",
      "VIGOROUS",
      "PEAK",
    ]).describe("Required. Heart rate zone type.").optional(),
    interval: z.object({
      civilEndTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      civilStartTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      endTime: z.string().describe("Required. Observed interval end time.")
        .optional(),
      endUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the end of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
      startTime: z.string().describe("Required. Observed interval start time.")
        .optional(),
      startUtcOffset: z.string().describe(
        "Required. The offset of the user's local time at the start of the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a time interval of an observed data point.")
      .optional(),
  }).describe(
    "Time in heart rate zone record. It's an interval spent in specific heart rate zone.",
  ).optional(),
  vo2Max: z.object({
    measurementMethod: z.enum([
      "MEASUREMENT_METHOD_UNSPECIFIED",
      "FITBIT_RUN",
      "GOOGLE_DEMOGRAPHIC",
      "COOPER_TEST",
      "HEART_RATE_RATIO",
      "METABOLIC_CART",
      "MULTISTAGE_FITNESS_TEST",
      "ROCKPORT_FITNESS_TEST",
      "MAX_EXERCISE",
      "PREDICTION_SUB_MAX_EXERCISE",
      "PREDICTION_NON_EXERCISE",
      "OTHER",
    ]).describe("Optional. The method used to measure the VO2 max value.")
      .optional(),
    sampleTime: z.object({
      civilTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      physicalTime: z.string().describe(
        "Required. The time of the observation.",
      ).optional(),
      utcOffset: z.string().describe(
        "Required. The offset of the user's local time during the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a sample time of an observed data point.")
      .optional(),
    vo2Max: z.number().describe(
      "Required. VO2 max value measured as in ml consumed oxygen / kg of body weight / min.",
    ).optional(),
  }).describe("VO2 max measurement.").optional(),
  weight: z.object({
    notes: z.string().describe(
      "Optional. Standard free-form notes captured at manual logging.",
    ).optional(),
    sampleTime: z.object({
      civilTime: z.object({
        date: z.object({
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
        time: z.object({
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
      }).describe(
        "Civil time representation similar to google.type.DateTime, but ensures that neither the timezone nor the UTC offset can be set to avoid confusion between civil and physical time queries.",
      ).optional(),
      physicalTime: z.string().describe(
        "Required. The time of the observation.",
      ).optional(),
      utcOffset: z.string().describe(
        "Required. The offset of the user's local time during the observation relative to the Coordinated Universal Time (UTC).",
      ).optional(),
    }).describe("Represents a sample time of an observed data point.")
      .optional(),
    weightGrams: z.number().describe("Required. Weight of a user in grams.")
      .optional(),
  }).describe("Body weight measurement.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Health Users.DataTypes.DataPoints. Registered at `@swamp/gcp/health/users-datatypes-datapoints`. */
export const model = {
  type: "@swamp/gcp/health/users-datatypes-datapoints",
  version: "2026.05.21.2",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
      toVersion: "2026.04.07.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.15.1",
      description: "Added: height, swimLengthsData",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.02.1",
      description: "Added: basalEnergyBurned",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "Removed: basalEnergyBurned, height, swimLengthsData",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          basalEnergyBurned: _basalEnergyBurned,
          height: _height,
          swimLengthsData: _swimLengthsData,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: basalEnergyBurned, height, swimLengthsData",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "Removed: basalEnergyBurned, height, swimLengthsData",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          basalEnergyBurned: _basalEnergyBurned,
          height: _height,
          swimLengthsData: _swimLengthsData,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.20.1",
      description: "Added: basalEnergyBurned, height, swimLengthsData",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A computed or recorded metric.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a dataPoints",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["activeMinutes"] !== undefined) {
          body["activeMinutes"] = g["activeMinutes"];
        }
        if (g["activeZoneMinutes"] !== undefined) {
          body["activeZoneMinutes"] = g["activeZoneMinutes"];
        }
        if (g["activityLevel"] !== undefined) {
          body["activityLevel"] = g["activityLevel"];
        }
        if (g["altitude"] !== undefined) body["altitude"] = g["altitude"];
        if (g["basalEnergyBurned"] !== undefined) {
          body["basalEnergyBurned"] = g["basalEnergyBurned"];
        }
        if (g["bodyFat"] !== undefined) body["bodyFat"] = g["bodyFat"];
        if (g["dailyHeartRateVariability"] !== undefined) {
          body["dailyHeartRateVariability"] = g["dailyHeartRateVariability"];
        }
        if (g["dailyHeartRateZones"] !== undefined) {
          body["dailyHeartRateZones"] = g["dailyHeartRateZones"];
        }
        if (g["dailyOxygenSaturation"] !== undefined) {
          body["dailyOxygenSaturation"] = g["dailyOxygenSaturation"];
        }
        if (g["dailyRespiratoryRate"] !== undefined) {
          body["dailyRespiratoryRate"] = g["dailyRespiratoryRate"];
        }
        if (g["dailyRestingHeartRate"] !== undefined) {
          body["dailyRestingHeartRate"] = g["dailyRestingHeartRate"];
        }
        if (g["dailySleepTemperatureDerivations"] !== undefined) {
          body["dailySleepTemperatureDerivations"] =
            g["dailySleepTemperatureDerivations"];
        }
        if (g["dailyVo2Max"] !== undefined) {
          body["dailyVo2Max"] = g["dailyVo2Max"];
        }
        if (g["dataSource"] !== undefined) body["dataSource"] = g["dataSource"];
        if (g["distance"] !== undefined) body["distance"] = g["distance"];
        if (g["exercise"] !== undefined) body["exercise"] = g["exercise"];
        if (g["floors"] !== undefined) body["floors"] = g["floors"];
        if (g["heartRate"] !== undefined) body["heartRate"] = g["heartRate"];
        if (g["heartRateVariability"] !== undefined) {
          body["heartRateVariability"] = g["heartRateVariability"];
        }
        if (g["height"] !== undefined) body["height"] = g["height"];
        if (g["hydrationLog"] !== undefined) {
          body["hydrationLog"] = g["hydrationLog"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["oxygenSaturation"] !== undefined) {
          body["oxygenSaturation"] = g["oxygenSaturation"];
        }
        if (g["respiratoryRateSleepSummary"] !== undefined) {
          body["respiratoryRateSleepSummary"] =
            g["respiratoryRateSleepSummary"];
        }
        if (g["runVo2Max"] !== undefined) body["runVo2Max"] = g["runVo2Max"];
        if (g["sedentaryPeriod"] !== undefined) {
          body["sedentaryPeriod"] = g["sedentaryPeriod"];
        }
        if (g["sleep"] !== undefined) body["sleep"] = g["sleep"];
        if (g["steps"] !== undefined) body["steps"] = g["steps"];
        if (g["swimLengthsData"] !== undefined) {
          body["swimLengthsData"] = g["swimLengthsData"];
        }
        if (g["timeInHeartRateZone"] !== undefined) {
          body["timeInHeartRateZone"] = g["timeInHeartRateZone"];
        }
        if (g["vo2Max"] !== undefined) body["vo2Max"] = g["vo2Max"];
        if (g["weight"] !== undefined) body["weight"] = g["weight"];
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
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
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
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
      description: "Get a dataPoints",
      arguments: z.object({
        identifier: z.string().describe("The name of the dataPoints"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
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
      description: "Update dataPoints attributes",
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
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["activeMinutes"] !== undefined) {
          body["activeMinutes"] = g["activeMinutes"];
        }
        if (g["activeZoneMinutes"] !== undefined) {
          body["activeZoneMinutes"] = g["activeZoneMinutes"];
        }
        if (g["activityLevel"] !== undefined) {
          body["activityLevel"] = g["activityLevel"];
        }
        if (g["altitude"] !== undefined) body["altitude"] = g["altitude"];
        if (g["basalEnergyBurned"] !== undefined) {
          body["basalEnergyBurned"] = g["basalEnergyBurned"];
        }
        if (g["bodyFat"] !== undefined) body["bodyFat"] = g["bodyFat"];
        if (g["dailyHeartRateVariability"] !== undefined) {
          body["dailyHeartRateVariability"] = g["dailyHeartRateVariability"];
        }
        if (g["dailyHeartRateZones"] !== undefined) {
          body["dailyHeartRateZones"] = g["dailyHeartRateZones"];
        }
        if (g["dailyOxygenSaturation"] !== undefined) {
          body["dailyOxygenSaturation"] = g["dailyOxygenSaturation"];
        }
        if (g["dailyRespiratoryRate"] !== undefined) {
          body["dailyRespiratoryRate"] = g["dailyRespiratoryRate"];
        }
        if (g["dailyRestingHeartRate"] !== undefined) {
          body["dailyRestingHeartRate"] = g["dailyRestingHeartRate"];
        }
        if (g["dailySleepTemperatureDerivations"] !== undefined) {
          body["dailySleepTemperatureDerivations"] =
            g["dailySleepTemperatureDerivations"];
        }
        if (g["dailyVo2Max"] !== undefined) {
          body["dailyVo2Max"] = g["dailyVo2Max"];
        }
        if (g["dataSource"] !== undefined) body["dataSource"] = g["dataSource"];
        if (g["distance"] !== undefined) body["distance"] = g["distance"];
        if (g["exercise"] !== undefined) body["exercise"] = g["exercise"];
        if (g["floors"] !== undefined) body["floors"] = g["floors"];
        if (g["heartRate"] !== undefined) body["heartRate"] = g["heartRate"];
        if (g["heartRateVariability"] !== undefined) {
          body["heartRateVariability"] = g["heartRateVariability"];
        }
        if (g["height"] !== undefined) body["height"] = g["height"];
        if (g["hydrationLog"] !== undefined) {
          body["hydrationLog"] = g["hydrationLog"];
        }
        if (g["oxygenSaturation"] !== undefined) {
          body["oxygenSaturation"] = g["oxygenSaturation"];
        }
        if (g["respiratoryRateSleepSummary"] !== undefined) {
          body["respiratoryRateSleepSummary"] =
            g["respiratoryRateSleepSummary"];
        }
        if (g["runVo2Max"] !== undefined) body["runVo2Max"] = g["runVo2Max"];
        if (g["sedentaryPeriod"] !== undefined) {
          body["sedentaryPeriod"] = g["sedentaryPeriod"];
        }
        if (g["sleep"] !== undefined) body["sleep"] = g["sleep"];
        if (g["steps"] !== undefined) body["steps"] = g["steps"];
        if (g["swimLengthsData"] !== undefined) {
          body["swimLengthsData"] = g["swimLengthsData"];
        }
        if (g["timeInHeartRateZone"] !== undefined) {
          body["timeInHeartRateZone"] = g["timeInHeartRateZone"];
        }
        if (g["vo2Max"] !== undefined) body["vo2Max"] = g["vo2Max"];
        if (g["weight"] !== undefined) body["weight"] = g["weight"];
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
    sync: {
      description: "Sync dataPoints state from GCP",
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
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            shortName,
          );
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
    batch_delete: {
      description: "batch delete",
      arguments: z.object({
        names: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["names"] !== undefined) body["names"] = args["names"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "health.users.dataTypes.dataPoints.batchDelete",
            "path": "v4/{+parent}/dataPoints:batchDelete",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    daily_roll_up: {
      description: "daily roll up",
      arguments: z.object({
        dataSourceFamily: z.any().optional(),
        pageSize: z.any().optional(),
        pageToken: z.any().optional(),
        range: z.any().optional(),
        windowSizeDays: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["dataSourceFamily"] !== undefined) {
          body["dataSourceFamily"] = args["dataSourceFamily"];
        }
        if (args["pageSize"] !== undefined) body["pageSize"] = args["pageSize"];
        if (args["pageToken"] !== undefined) {
          body["pageToken"] = args["pageToken"];
        }
        if (args["range"] !== undefined) body["range"] = args["range"];
        if (args["windowSizeDays"] !== undefined) {
          body["windowSizeDays"] = args["windowSizeDays"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "health.users.dataTypes.dataPoints.dailyRollUp",
            "path": "v4/{+parent}/dataPoints:dailyRollUp",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    export_exercise_tcx: {
      description: "export exercise tcx",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "health.users.dataTypes.dataPoints.exportExerciseTcx",
            "path": "v4/{+name}:exportExerciseTcx",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "partialData": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    reconcile: {
      description: "reconcile",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "health.users.dataTypes.dataPoints.reconcile",
            "path": "v4/{+parent}/dataPoints:reconcile",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "dataSourceFamily": { "location": "query" },
              "filter": { "location": "query" },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    roll_up: {
      description: "roll up",
      arguments: z.object({
        dataSourceFamily: z.any().optional(),
        pageSize: z.any().optional(),
        pageToken: z.any().optional(),
        range: z.any().optional(),
        windowSize: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["dataSourceFamily"] !== undefined) {
          body["dataSourceFamily"] = args["dataSourceFamily"];
        }
        if (args["pageSize"] !== undefined) body["pageSize"] = args["pageSize"];
        if (args["pageToken"] !== undefined) {
          body["pageToken"] = args["pageToken"];
        }
        if (args["range"] !== undefined) body["range"] = args["range"];
        if (args["windowSize"] !== undefined) {
          body["windowSize"] = args["windowSize"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "health.users.dataTypes.dataPoints.rollUp",
            "path": "v4/{+parent}/dataPoints:rollUp",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
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
