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

// Auto-generated extension model for @swamp/gcp/calendar/events
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Calendar Events.
 *
 * Returns an event based on its Google Calendar ID. To retrieve an event using its iCalendar ID, call the events.list method using the iCalUID parameter.
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

const BASE_URL = "https://www.googleapis.com/calendar/v3/";

const GET_CONFIG = {
  "id": "calendar.events.get",
  "path": "calendars/{calendarId}/events/{eventId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "calendarId",
    "eventId",
  ],
  "parameters": {
    "alwaysIncludeEmail": {
      "location": "query",
    },
    "calendarId": {
      "location": "path",
      "required": true,
    },
    "eventId": {
      "location": "path",
      "required": true,
    },
    "maxAttendees": {
      "location": "query",
    },
    "timeZone": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "calendar.events.insert",
  "path": "calendars/{calendarId}/events",
  "httpMethod": "POST",
  "parameterOrder": [
    "calendarId",
  ],
  "parameters": {
    "calendarId": {
      "location": "path",
      "required": true,
    },
    "conferenceDataVersion": {
      "location": "query",
    },
    "maxAttendees": {
      "location": "query",
    },
    "sendNotifications": {
      "location": "query",
    },
    "sendUpdates": {
      "location": "query",
    },
    "supportsAttachments": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "calendar.events.update",
  "path": "calendars/{calendarId}/events/{eventId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "calendarId",
    "eventId",
  ],
  "parameters": {
    "alwaysIncludeEmail": {
      "location": "query",
    },
    "calendarId": {
      "location": "path",
      "required": true,
    },
    "conferenceDataVersion": {
      "location": "query",
    },
    "eventId": {
      "location": "path",
      "required": true,
    },
    "maxAttendees": {
      "location": "query",
    },
    "sendNotifications": {
      "location": "query",
    },
    "sendUpdates": {
      "location": "query",
    },
    "supportsAttachments": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "calendar.events.delete",
  "path": "calendars/{calendarId}/events/{eventId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "calendarId",
    "eventId",
  ],
  "parameters": {
    "calendarId": {
      "location": "path",
      "required": true,
    },
    "eventId": {
      "location": "path",
      "required": true,
    },
    "sendNotifications": {
      "location": "query",
    },
    "sendUpdates": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "calendar.events.list",
  "path": "calendars/{calendarId}/events",
  "httpMethod": "GET",
  "parameterOrder": [
    "calendarId",
  ],
  "parameters": {
    "alwaysIncludeEmail": {
      "location": "query",
    },
    "calendarId": {
      "location": "path",
      "required": true,
    },
    "eventTypes": {
      "location": "query",
    },
    "iCalUID": {
      "location": "query",
    },
    "maxAttendees": {
      "location": "query",
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
    "privateExtendedProperty": {
      "location": "query",
    },
    "q": {
      "location": "query",
    },
    "sharedExtendedProperty": {
      "location": "query",
    },
    "showDeleted": {
      "location": "query",
    },
    "showHiddenInvitations": {
      "location": "query",
    },
    "singleEvents": {
      "location": "query",
    },
    "syncToken": {
      "location": "query",
    },
    "timeMax": {
      "location": "query",
    },
    "timeMin": {
      "location": "query",
    },
    "timeZone": {
      "location": "query",
    },
    "updatedMin": {
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
  anyoneCanAddSelf: z.boolean().describe(
    "Whether anyone can invite themselves to the event (deprecated). Optional. The default is False.",
  ).optional(),
  attachments: z.array(z.object({
    fileId: z.string().describe(
      "ID of the attached file. Read-only. For Google Drive files, this is the ID of the corresponding Files resource entry in the Drive API.",
    ).optional(),
    fileUrl: z.string().describe(
      "URL link to the attachment. For adding Google Drive file attachments use the same format as in alternateLink property of the Files resource in the Drive API. Required when adding an attachment.",
    ).optional(),
    iconLink: z.string().describe(
      "URL link to the attachment's icon. This field can only be modified for custom third-party attachments.",
    ).optional(),
    mimeType: z.string().describe(
      "Internet media type (MIME type) of the attachment.",
    ).optional(),
    title: z.string().describe("Attachment title.").optional(),
  })).describe(
    "File attachments for the event. In order to modify attachments the supportsAttachments request parameter should be set to true. There can be at most 25 attachments per event,",
  ).optional(),
  attendees: z.array(z.object({
    additionalGuests: z.number().int().describe(
      "Number of additional guests. Optional. The default is 0.",
    ).optional(),
    asyncOperation: z.string().describe(
      'If present, indicates the status of an asynchronous operation ongoing for this attendee (e.g. listing of members of large attendee groups). Read-only. The default is to not be present. Possible values are: - "inProgress" - The asynchronous operation is in progress. - (not present) - Otherwise.',
    ).optional(),
    comment: z.string().describe("The attendee's response comment. Optional.")
      .optional(),
    displayName: z.string().describe(
      "The attendee's name, if available. Optional.",
    ).optional(),
    email: z.string().describe(
      "The attendee's email address, if available. This field must be present when adding an attendee. It must be a valid email address as per RFC5322. Required when adding an attendee.",
    ).optional(),
    id: z.string().describe("The attendee's Profile ID, if available.")
      .optional(),
    optional: z.boolean().describe(
      "Whether this is an optional attendee. Optional. The default is False.",
    ).optional(),
    organizer: z.boolean().describe(
      "Whether the attendee is the organizer of the event. Read-only. The default is False.",
    ).optional(),
    resource: z.boolean().describe(
      "Whether the attendee is a resource. Can only be set when the attendee is added to the event for the first time. Subsequent modifications are ignored. Optional. The default is False.",
    ).optional(),
    responseStatus: z.string().describe(
      'The attendee\'s response status. Possible values are: - "needsAction" - The attendee has not responded to the invitation (recommended for new events). - "declined" - The attendee has declined the invitation. - "tentative" - The attendee has tentatively accepted the invitation. - "accepted" - The attendee has accepted the invitation. Warning: If you add an event using the values declined, tentative, or accepted, attendees with the "Add invitations to my calendar" setting set to "When I respond to invitation in email" or "Only if the sender is known" might have their response reset to needsAction and won\'t see an event in their calendar unless they change their response in the event invitation email. Furthermore, if more than 200 guests are invited to the event, response status is not propagated to the guests.',
    ).optional(),
    self: z.boolean().describe(
      "Whether this entry represents the calendar on which this copy of the event appears. Read-only. The default is False.",
    ).optional(),
  })).describe(
    "The attendees of the event. See the Events with attendees guide for more information on scheduling events with other calendar users. Service accounts need to use domain-wide delegation of authority to populate the attendee list.",
  ).optional(),
  attendeesOmitted: z.boolean().describe(
    "Whether attendees may have been omitted from the event's representation. When retrieving an event, this may be due to a restriction specified by the maxAttendee query parameter. When updating an event, this can be used to only update the participant's response. Optional. The default is False.",
  ).optional(),
  birthdayProperties: z.object({
    contact: z.string().describe(
      'Resource name of the contact this birthday event is linked to. This can be used to fetch contact details from People API. Format: "people/c12345". Read-only.',
    ).optional(),
    customTypeName: z.string().describe(
      'Custom type label specified for this event. This is populated if birthdayProperties.type is set to "custom". Read-only.',
    ).optional(),
    type: z.string().describe(
      'Type of birthday or special event. Possible values are: - "anniversary" - An anniversary other than birthday. Always has a contact. - "birthday" - A birthday event. This is the default value. - "custom" - A special date whose label is further specified in the customTypeName field. Always has a contact. - "other" - A special date which does not fall into the other categories, and does not have a custom label. Always has a contact. - "self" - Calendar owner\'s own birthday. Cannot have a contact. The Calendar API only supports creating events with the type "birthday". The type cannot be changed after the event is created.',
    ).optional(),
  }).optional(),
  colorId: z.string().describe(
    "The color of the event. This is an ID referring to an entry in the event section of the colors definition (see the colors endpoint). Optional.",
  ).optional(),
  conferenceData: z.object({
    conferenceId: z.string().describe(
      "The ID of the conference. Can be used by developers to keep track of conferences, should not be displayed to users. The ID value is formed differently for each conference solution type: - eventHangout: ID is not set. (This conference type is deprecated.) - eventNamedHangout: ID is the name of the Hangout. (This conference type is deprecated.) - hangoutsMeet: ID is the 10-letter meeting code, for example aaa-bbbb-ccc. - addOn: ID is defined by the third-party provider. Optional.",
    ).optional(),
    conferenceSolution: z.object({
      iconUri: z.string().describe("The user-visible icon for this solution.")
        .optional(),
      key: z.object({
        type: z.string().describe(
          'The conference solution type. If a client encounters an unfamiliar or empty type, it should still be able to display the entry points. However, it should disallow modifications. The possible values are: - "eventHangout" for Hangouts for consumers (deprecated; existing events may show this conference solution type but new conferences cannot be created) - "eventNamedHangout" for classic Hangouts for Google Workspace users (deprecated; existing events may show this conference solution type but new conferences cannot be created) - "hangoutsMeet" for Google Meet (http://meet.google.com) - "addOn" for 3P conference providers',
        ).optional(),
      }).optional(),
      name: z.string().describe(
        "The user-visible name of this solution. Not localized.",
      ).optional(),
    }).optional(),
    createRequest: z.object({
      conferenceSolutionKey: z.object({
        type: z.string().describe(
          'The conference solution type. If a client encounters an unfamiliar or empty type, it should still be able to display the entry points. However, it should disallow modifications. The possible values are: - "eventHangout" for Hangouts for consumers (deprecated; existing events may show this conference solution type but new conferences cannot be created) - "eventNamedHangout" for classic Hangouts for Google Workspace users (deprecated; existing events may show this conference solution type but new conferences cannot be created) - "hangoutsMeet" for Google Meet (http://meet.google.com) - "addOn" for 3P conference providers',
        ).optional(),
      }).optional(),
      requestId: z.string().describe(
        "The client-generated unique ID for this request. Clients should regenerate this ID for every new request. If an ID provided is the same as for the previous request, the request is ignored.",
      ).optional(),
      status: z.object({
        statusCode: z.string().describe(
          'The current status of the conference create request. Read-only. The possible values are: - "pending": the conference create request is still being processed. - "success": the conference create request succeeded, the entry points are populated. - "failure": the conference create request failed, there are no entry points.',
        ).optional(),
      }).optional(),
    }).optional(),
    entryPoints: z.array(z.object({
      accessCode: z.string().describe(
        "The access code to access the conference. The maximum length is 128 characters. When creating new conference data, populate only the subset of {meetingCode, accessCode, passcode, password, pin} fields that match the terminology that the conference provider uses. Only the populated fields should be displayed. Optional.",
      ).optional(),
      entryPointFeatures: z.array(z.string()).describe(
        "Features of the entry point, such as being toll or toll-free. One entry point can have multiple features. However, toll and toll-free cannot be both set on the same entry point.",
      ).optional(),
      entryPointType: z.string().describe(
        'The type of the conference entry point. Possible values are: - "video" - joining a conference over HTTP. A conference can have zero or one video entry point. - "phone" - joining a conference by dialing a phone number. A conference can have zero or more phone entry points. - "sip" - joining a conference over SIP. A conference can have zero or one sip entry point. - "more" - further conference joining instructions, for example additional phone numbers. A conference can have zero or one more entry point. A conference with only a more entry point is not a valid conference.',
      ).optional(),
      label: z.string().describe(
        "The label for the URI. Visible to end users. Not localized. The maximum length is 512 characters. Examples: - for video: meet.google.com/aaa-bbbb-ccc - for phone: +1 123 268 2601 - for sip: 12345678@altostrat.com - for more: should not be filled Optional.",
      ).optional(),
      meetingCode: z.string().describe(
        "The meeting code to access the conference. The maximum length is 128 characters. When creating new conference data, populate only the subset of {meetingCode, accessCode, passcode, password, pin} fields that match the terminology that the conference provider uses. Only the populated fields should be displayed. Optional.",
      ).optional(),
      passcode: z.string().describe(
        "The passcode to access the conference. The maximum length is 128 characters. When creating new conference data, populate only the subset of {meetingCode, accessCode, passcode, password, pin} fields that match the terminology that the conference provider uses. Only the populated fields should be displayed.",
      ).optional(),
      password: z.string().describe(
        "The password to access the conference. The maximum length is 128 characters. When creating new conference data, populate only the subset of {meetingCode, accessCode, passcode, password, pin} fields that match the terminology that the conference provider uses. Only the populated fields should be displayed. Optional.",
      ).optional(),
      pin: z.string().describe(
        "The PIN to access the conference. The maximum length is 128 characters. When creating new conference data, populate only the subset of {meetingCode, accessCode, passcode, password, pin} fields that match the terminology that the conference provider uses. Only the populated fields should be displayed. Optional.",
      ).optional(),
      regionCode: z.string().describe(
        'The CLDR/ISO 3166 region code for the country associated with this phone access. Example: "SE" for Sweden. Calendar backend will populate this field only for EntryPointType.PHONE.',
      ).optional(),
      uri: z.string().describe(
        "The URI of the entry point. The maximum length is 1300 characters. Format: - for video, http: or https: schema is required. - for phone, tel: schema is required. The URI should include the entire dial sequence (e.g., tel:+12345678900,,,123456789;1234). - for sip, sip: schema is required, e.g., sip:12345678@myprovider.com. - for more, http: or https: schema is required.",
      ).optional(),
    })).describe(
      "Information about individual conference entry points, such as URLs or phone numbers. All of them must belong to the same conference. Either conferenceSolution and at least one entryPoint, or createRequest is required.",
    ).optional(),
    notes: z.string().describe(
      "Additional notes (such as instructions from the domain administrator, legal notices) to display to the user. Can contain HTML. The maximum length is 2048 characters. Optional.",
    ).optional(),
    parameters: z.object({
      addOnParameters: z.object({
        parameters: z.record(z.string(), z.string()).optional(),
      }).optional(),
    }).optional(),
    signature: z.string().describe(
      "The signature of the conference data. Generated on server side. Unset for a conference with a failed create request. Optional for a conference with a pending create request.",
    ).optional(),
  }).optional(),
  created: z.string().describe(
    "Creation time of the event (as a RFC3339 timestamp). Read-only.",
  ).optional(),
  creator: z.object({
    displayName: z.string().describe("The creator's name, if available.")
      .optional(),
    email: z.string().describe("The creator's email address, if available.")
      .optional(),
    id: z.string().describe("The creator's Profile ID, if available.")
      .optional(),
    self: z.boolean().describe(
      "Whether the creator corresponds to the calendar on which this copy of the event appears. Read-only. The default is False.",
    ).optional(),
  }).describe("The creator of the event. Read-only.").optional(),
  description: z.string().describe(
    "Description of the event. Can contain HTML. Optional.",
  ).optional(),
  end: z.object({
    date: z.string().describe(
      'The date, in the format "yyyy-mm-dd", if this is an all-day event.',
    ).optional(),
    dateTime: z.string().describe(
      "The time, as a combined date-time value (formatted according to RFC3339). A time zone offset is required unless a time zone is explicitly specified in timeZone.",
    ).optional(),
    timeZone: z.string().describe(
      'The time zone in which the time is specified. (Formatted as an IANA Time Zone Database name, e.g. "Europe/Zurich".) For recurring events this field is required and specifies the time zone in which the recurrence is expanded. For single events this field is optional and indicates a custom time zone for the event start/end.',
    ).optional(),
  }).optional(),
  endTimeUnspecified: z.boolean().describe(
    "Whether the end time is actually unspecified. An end time is still provided for compatibility reasons, even if this attribute is set to True. The default is False.",
  ).optional(),
  eventType: z.string().describe(
    'Specific type of the event. This cannot be modified after the event is created. Possible values are: - "birthday" - A special all-day event with an annual recurrence. - "default" - A regular event or not further specified. - "focusTime" - A focus-time event. - "fromGmail" - An event from Gmail. This type of event cannot be created. - "outOfOffice" - An out-of-office event. - "workingLocation" - A working location event.',
  ).optional(),
  extendedProperties: z.object({
    private: z.record(z.string(), z.string()).describe(
      "Properties that are private to the copy of the event that appears on this calendar.",
    ).optional(),
    shared: z.record(z.string(), z.string()).describe(
      "Properties that are shared between copies of the event on other attendees' calendars.",
    ).optional(),
  }).describe("Extended properties of the event.").optional(),
  focusTimeProperties: z.object({
    autoDeclineMode: z.string().describe(
      "Whether to decline meeting invitations which overlap Focus Time events. Valid values are declineNone, meaning that no meeting invitations are declined; declineAllConflictingInvitations, meaning that all conflicting meeting invitations that conflict with the event are declined; and declineOnlyNewConflictingInvitations, meaning that only new conflicting meeting invitations which arrive while the Focus Time event is present are to be declined.",
    ).optional(),
    chatStatus: z.string().describe(
      "The status to mark the user in Chat and related products. This can be available or doNotDisturb.",
    ).optional(),
    declineMessage: z.string().describe(
      "Response message to set if an existing event or new invitation is automatically declined by Calendar.",
    ).optional(),
  }).optional(),
  gadget: z.object({
    display: z.string().describe(
      'The gadget\'s display mode. Deprecated. Possible values are: - "icon" - The gadget displays next to the event\'s title in the calendar view. - "chip" - The gadget displays when the event is clicked.',
    ).optional(),
    height: z.number().int().describe(
      "The gadget's height in pixels. The height must be an integer greater than 0. Optional. Deprecated.",
    ).optional(),
    iconLink: z.string().describe(
      "The gadget's icon URL. The URL scheme must be HTTPS. Deprecated.",
    ).optional(),
    link: z.string().describe(
      "The gadget's URL. The URL scheme must be HTTPS. Deprecated.",
    ).optional(),
    preferences: z.record(z.string(), z.string()).describe("Preferences.")
      .optional(),
    title: z.string().describe("The gadget's title. Deprecated.").optional(),
    type: z.string().describe("The gadget's type. Deprecated.").optional(),
    width: z.number().int().describe(
      "The gadget's width in pixels. The width must be an integer greater than 0. Optional. Deprecated.",
    ).optional(),
  }).describe(
    "A gadget that extends this event. Gadgets are deprecated; this structure is instead only used for returning birthday calendar metadata.",
  ).optional(),
  guestsCanInviteOthers: z.boolean().describe(
    "Whether attendees other than the organizer can invite others to the event. Optional. The default is True.",
  ).optional(),
  guestsCanModify: z.boolean().describe(
    "Whether attendees other than the organizer can modify the event. Optional. The default is False.",
  ).optional(),
  guestsCanSeeOtherGuests: z.boolean().describe(
    "Whether attendees other than the organizer can see who the event's attendees are. Optional. The default is True.",
  ).optional(),
  hangoutLink: z.string().describe(
    "An absolute link to the Google Hangout associated with this event. Read-only.",
  ).optional(),
  htmlLink: z.string().describe(
    "An absolute link to this event in the Google Calendar Web UI. Read-only.",
  ).optional(),
  iCalUID: z.string().describe(
    "Event unique identifier as defined in RFC5545. It is used to uniquely identify events accross calendaring systems and must be supplied when importing events via the import method. Note that the iCalUID and the id are not identical and only one of them should be supplied at event creation time. One difference in their semantics is that in recurring events, all occurrences of one event have different ids while they all share the same iCalUIDs. To retrieve an event using its iCalUID, call the events.list method using the iCalUID parameter. To retrieve an event using its id, call the events.get method.",
  ).optional(),
  id: z.string().describe(
    "Opaque identifier of the event. When creating new single or recurring events, you can specify their IDs. Provided IDs must follow these rules: - characters allowed in the ID are those used in base32hex encoding, i.e. lowercase letters a-v and digits 0-9, see section 3.1.2 in RFC2938 - the length of the ID must be between 5 and 1024 characters - the ID must be unique per calendar Due to the globally distributed nature of the system, we cannot guarantee that ID collisions will be detected at event creation time. To minimize the risk of collisions we recommend using an established UUID algorithm such as one described in RFC4122. If you do not specify an ID, it will be automatically generated by the server. Note that the icalUID and the id are not identical and only one of them should be supplied at event creation time. One difference in their semantics is that in recurring events, all occurrences of one event have different ids while they all share the same icalUIDs.",
  ).optional(),
  location: z.string().describe(
    "Geographic location of the event as free-form text. Optional.",
  ).optional(),
  locked: z.boolean().describe(
    'Whether this is a locked event copy where no changes can be made to the main event fields "summary", "description", "location", "start", "end" or "recurrence". The default is False. Read-Only.',
  ).optional(),
  organizer: z.object({
    displayName: z.string().describe("The organizer's name, if available.")
      .optional(),
    email: z.string().describe(
      "The organizer's email address, if available. It must be a valid email address as per RFC5322.",
    ).optional(),
    id: z.string().describe("The organizer's Profile ID, if available.")
      .optional(),
    self: z.boolean().describe(
      "Whether the organizer corresponds to the calendar on which this copy of the event appears. Read-only. The default is False.",
    ).optional(),
  }).describe(
    "The organizer of the event. If the organizer is also an attendee, this is indicated with a separate entry in attendees with the organizer field set to True. To change the organizer, use the move operation. Read-only, except when importing an event.",
  ).optional(),
  originalStartTime: z.object({
    date: z.string().describe(
      'The date, in the format "yyyy-mm-dd", if this is an all-day event.',
    ).optional(),
    dateTime: z.string().describe(
      "The time, as a combined date-time value (formatted according to RFC3339). A time zone offset is required unless a time zone is explicitly specified in timeZone.",
    ).optional(),
    timeZone: z.string().describe(
      'The time zone in which the time is specified. (Formatted as an IANA Time Zone Database name, e.g. "Europe/Zurich".) For recurring events this field is required and specifies the time zone in which the recurrence is expanded. For single events this field is optional and indicates a custom time zone for the event start/end.',
    ).optional(),
  }).optional(),
  outOfOfficeProperties: z.object({
    autoDeclineMode: z.string().describe(
      "Whether to decline meeting invitations which overlap Out of office events. Valid values are declineNone, meaning that no meeting invitations are declined; declineAllConflictingInvitations, meaning that all conflicting meeting invitations that conflict with the event are declined; and declineOnlyNewConflictingInvitations, meaning that only new conflicting meeting invitations which arrive while the Out of office event is present are to be declined.",
    ).optional(),
    declineMessage: z.string().describe(
      "Response message to set if an existing event or new invitation is automatically declined by Calendar.",
    ).optional(),
  }).optional(),
  privateCopy: z.boolean().describe(
    "If set to True, Event propagation is disabled. Note that it is not the same thing as Private event properties. Optional. Immutable. The default is False.",
  ).optional(),
  recurrence: z.array(z.string()).describe(
    "List of RRULE, EXRULE, RDATE and EXDATE lines for a recurring event, as specified in RFC5545. Note that DTSTART and DTEND lines are not allowed in this field; event start and end times are specified in the start and end fields. This field is omitted for single events or instances of recurring events.",
  ).optional(),
  recurringEventId: z.string().describe(
    "For an instance of a recurring event, this is the id of the recurring event to which this instance belongs. Immutable.",
  ).optional(),
  reminders: z.object({
    overrides: z.array(z.object({
      method: z.string().describe(
        'The method used by this reminder. Possible values are: - "email" - Reminders are sent via email. - "popup" - Reminders are sent via a UI popup. Required when adding a reminder.',
      ).optional(),
      minutes: z.number().int().describe(
        "Number of minutes before the start of the event when the reminder should trigger. Valid values are between 0 and 40320 (4 weeks in minutes). Required when adding a reminder.",
      ).optional(),
    })).describe(
      "If the event doesn't use the default reminders, this lists the reminders specific to the event, or, if not set, indicates that no reminders are set for this event. The maximum number of override reminders is 5.",
    ).optional(),
    useDefault: z.boolean().describe(
      "Whether the default reminders of the calendar apply to the event.",
    ).optional(),
  }).describe(
    "Information about the event's reminders for the authenticated user. Note that changing reminders does not also change the updated property of the enclosing event.",
  ).optional(),
  sequence: z.number().int().describe("Sequence number as per iCalendar.")
    .optional(),
  source: z.object({
    title: z.string().describe(
      "Title of the source; for example a title of a web page or an email subject.",
    ).optional(),
    url: z.string().describe(
      "URL of the source pointing to a resource. The URL scheme must be HTTP or HTTPS.",
    ).optional(),
  }).describe(
    "Source from which the event was created. For example, a web page, an email message or any document identifiable by an URL with HTTP or HTTPS scheme. Can only be seen or modified by the creator of the event.",
  ).optional(),
  start: z.object({
    date: z.string().describe(
      'The date, in the format "yyyy-mm-dd", if this is an all-day event.',
    ).optional(),
    dateTime: z.string().describe(
      "The time, as a combined date-time value (formatted according to RFC3339). A time zone offset is required unless a time zone is explicitly specified in timeZone.",
    ).optional(),
    timeZone: z.string().describe(
      'The time zone in which the time is specified. (Formatted as an IANA Time Zone Database name, e.g. "Europe/Zurich".) For recurring events this field is required and specifies the time zone in which the recurrence is expanded. For single events this field is optional and indicates a custom time zone for the event start/end.',
    ).optional(),
  }).optional(),
  status: z.string().describe(
    'Status of the event. Optional. Possible values are: - "confirmed" - The event is confirmed. This is the default status. - "tentative" - The event is tentatively confirmed. - "cancelled" - The event is cancelled (deleted). The list method returns cancelled events only on incremental sync (when syncToken or updatedMin are specified) or if the showDeleted flag is set to true. The get method always returns them. A cancelled status represents two different states depending on the event type: - Cancelled exceptions of an uncancelled recurring event indicate that this instance should no longer be presented to the user. Clients should store these events for the lifetime of the parent recurring event. Cancelled exceptions are only guaranteed to have values for the id, recurringEventId and originalStartTime fields populated. The other fields might be empty. - All other cancelled events represent deleted events. Clients should remove their locally synced copies. Such cancelled events will eventually disappear, so do not rely on them being available indefinitely. Deleted events are only guaranteed to have the id field populated. On the organizer\'s calendar, cancelled events continue to expose event details (summary, location, etc.) so that they can be restored (undeleted). Similarly, the events to which the user was invited and that they manually removed continue to provide details. However, incremental sync requests with showDeleted set to false will not return these details. If an event changes its organizer (for example via the move operation) and the original organizer is not on the attendee list, it will leave behind a cancelled event where only the id field is guaranteed to be populated.',
  ).optional(),
  summary: z.string().describe("Title of the event.").optional(),
  transparency: z.string().describe(
    'Whether the event blocks time on the calendar. Optional. Possible values are: - "opaque" - Default value. The event does block time on the calendar. This is equivalent to setting Show me as to Busy in the Calendar UI. - "transparent" - The event does not block time on the calendar. This is equivalent to setting Show me as to Available in the Calendar UI.',
  ).optional(),
  updated: z.string().describe(
    "Last modification time of the main event data (as a RFC3339 timestamp). Updating event reminders will not cause this to change. Read-only.",
  ).optional(),
  visibility: z.string().describe(
    'Visibility of the event. Optional. Possible values are: - "default" - Uses the default visibility for events on the calendar. This is the default value. - "public" - The event is public and event details are visible to all readers of the calendar. - "private" - The event is private and only event attendees may view event details. - "confidential" - The event is private. This value is provided for compatibility reasons.',
  ).optional(),
  workingLocationProperties: z.object({
    customLocation: z.object({
      label: z.string().describe(
        "An optional extra label for additional information.",
      ).optional(),
    }).describe(
      "If present, specifies that the user is working from a custom location.",
    ).optional(),
    homeOffice: z.string().describe(
      "If present, specifies that the user is working at home.",
    ).optional(),
    officeLocation: z.object({
      buildingId: z.string().describe(
        "An optional building identifier. This should reference a building ID in the organization's Resources database.",
      ).optional(),
      deskId: z.string().describe("An optional desk identifier.").optional(),
      floorId: z.string().describe("An optional floor identifier.").optional(),
      floorSectionId: z.string().describe(
        "An optional floor section identifier.",
      ).optional(),
      label: z.string().describe(
        "The office name that's displayed in Calendar Web and Mobile clients. We recommend you reference a building name in the organization's Resources database.",
      ).optional(),
    }).describe(
      "If present, specifies that the user is working from an office.",
    ).optional(),
    type: z.string().describe(
      'Type of the working location. Possible values are: - "homeOffice" - The user is working at home. - "officeLocation" - The user is working from an office. - "customLocation" - The user is working from a custom location. Any details are specified in a sub-field of the specified name, but this field may be missing if empty. Any other fields are ignored. Required when adding working location properties.',
    ).optional(),
  }).optional(),
  calendarId: z.string().describe(
    'Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.',
  ),
  conferenceDataVersion: z.string().describe(
    "Version number of conference data supported by the API client. Version 0 assumes no conference data support and ignores conference data in the event's body. Version 1 enables support for copying of ConferenceData as well as for creating new conferences using the createRequest field of conferenceData. The default is 0.",
  ).optional(),
  maxAttendees: z.string().describe(
    "The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional.",
  ).optional(),
  sendNotifications: z.string().describe(
    "Deprecated. Please use sendUpdates instead. Whether to send notifications about the creation of the new event. Note that some emails might still be sent even if you set the value to false. The default is false.",
  ).optional(),
  sendUpdates: z.string().describe(
    "Whether to send notifications about the creation of the new event. Note that some emails might still be sent. The default is false.",
  ).optional(),
  supportsAttachments: z.string().describe(
    "Whether API client performing operation supports event attachments. Optional. The default is False.",
  ).optional(),
});

const StateSchema = z.object({
  anyoneCanAddSelf: z.boolean().optional(),
  attachments: z.array(z.object({
    fileId: z.string(),
    fileUrl: z.string(),
    iconLink: z.string(),
    mimeType: z.string(),
    title: z.string(),
  })).optional(),
  attendees: z.array(z.object({
    additionalGuests: z.number(),
    asyncOperation: z.string(),
    comment: z.string(),
    displayName: z.string(),
    email: z.string(),
    id: z.string(),
    optional: z.boolean(),
    organizer: z.boolean(),
    resource: z.boolean(),
    responseStatus: z.string(),
    self: z.boolean(),
  })).optional(),
  attendeesOmitted: z.boolean().optional(),
  birthdayProperties: z.object({
    contact: z.string(),
    customTypeName: z.string(),
    type: z.string(),
  }).optional(),
  colorId: z.string().optional(),
  conferenceData: z.object({
    conferenceId: z.string(),
    conferenceSolution: z.object({
      iconUri: z.string(),
      key: z.object({
        type: z.string(),
      }),
      name: z.string(),
    }),
    createRequest: z.object({
      conferenceSolutionKey: z.object({
        type: z.string(),
      }),
      requestId: z.string(),
      status: z.object({
        statusCode: z.string(),
      }),
    }),
    entryPoints: z.array(z.object({
      accessCode: z.string(),
      entryPointFeatures: z.array(z.string()),
      entryPointType: z.string(),
      label: z.string(),
      meetingCode: z.string(),
      passcode: z.string(),
      password: z.string(),
      pin: z.string(),
      regionCode: z.string(),
      uri: z.string(),
    })),
    notes: z.string(),
    parameters: z.object({
      addOnParameters: z.object({
        parameters: z.record(z.string(), z.unknown()),
      }),
    }),
    signature: z.string(),
  }).optional(),
  created: z.string().optional(),
  creator: z.object({
    displayName: z.string(),
    email: z.string(),
    id: z.string(),
    self: z.boolean(),
  }).optional(),
  description: z.string().optional(),
  end: z.object({
    date: z.string(),
    dateTime: z.string(),
    timeZone: z.string(),
  }).optional(),
  endTimeUnspecified: z.boolean().optional(),
  etag: z.string().optional(),
  eventType: z.string().optional(),
  extendedProperties: z.object({
    private: z.record(z.string(), z.unknown()),
    shared: z.record(z.string(), z.unknown()),
  }).optional(),
  focusTimeProperties: z.object({
    autoDeclineMode: z.string(),
    chatStatus: z.string(),
    declineMessage: z.string(),
  }).optional(),
  gadget: z.object({
    display: z.string(),
    height: z.number(),
    iconLink: z.string(),
    link: z.string(),
    preferences: z.record(z.string(), z.unknown()),
    title: z.string(),
    type: z.string(),
    width: z.number(),
  }).optional(),
  guestsCanInviteOthers: z.boolean().optional(),
  guestsCanModify: z.boolean().optional(),
  guestsCanSeeOtherGuests: z.boolean().optional(),
  hangoutLink: z.string().optional(),
  htmlLink: z.string().optional(),
  iCalUID: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  location: z.string().optional(),
  locked: z.boolean().optional(),
  organizer: z.object({
    displayName: z.string(),
    email: z.string(),
    id: z.string(),
    self: z.boolean(),
  }).optional(),
  originalStartTime: z.object({
    date: z.string(),
    dateTime: z.string(),
    timeZone: z.string(),
  }).optional(),
  outOfOfficeProperties: z.object({
    autoDeclineMode: z.string(),
    declineMessage: z.string(),
  }).optional(),
  privateCopy: z.boolean().optional(),
  recurrence: z.array(z.string()).optional(),
  recurringEventId: z.string().optional(),
  reminders: z.object({
    overrides: z.array(z.object({
      method: z.string(),
      minutes: z.number(),
    })),
    useDefault: z.boolean(),
  }).optional(),
  sequence: z.number().optional(),
  source: z.object({
    title: z.string(),
    url: z.string(),
  }).optional(),
  start: z.object({
    date: z.string(),
    dateTime: z.string(),
    timeZone: z.string(),
  }).optional(),
  status: z.string().optional(),
  summary: z.string().optional(),
  transparency: z.string().optional(),
  updated: z.string().optional(),
  visibility: z.string().optional(),
  workingLocationProperties: z.object({
    customLocation: z.object({
      label: z.string(),
    }),
    homeOffice: z.string(),
    officeLocation: z.object({
      buildingId: z.string(),
      deskId: z.string(),
      floorId: z.string(),
      floorSectionId: z.string(),
      label: z.string(),
    }),
    type: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  anyoneCanAddSelf: z.boolean().describe(
    "Whether anyone can invite themselves to the event (deprecated). Optional. The default is False.",
  ).optional(),
  attachments: z.array(z.object({
    fileId: z.string().describe(
      "ID of the attached file. Read-only. For Google Drive files, this is the ID of the corresponding Files resource entry in the Drive API.",
    ).optional(),
    fileUrl: z.string().describe(
      "URL link to the attachment. For adding Google Drive file attachments use the same format as in alternateLink property of the Files resource in the Drive API. Required when adding an attachment.",
    ).optional(),
    iconLink: z.string().describe(
      "URL link to the attachment's icon. This field can only be modified for custom third-party attachments.",
    ).optional(),
    mimeType: z.string().describe(
      "Internet media type (MIME type) of the attachment.",
    ).optional(),
    title: z.string().describe("Attachment title.").optional(),
  })).describe(
    "File attachments for the event. In order to modify attachments the supportsAttachments request parameter should be set to true. There can be at most 25 attachments per event,",
  ).optional(),
  attendees: z.array(z.object({
    additionalGuests: z.number().int().describe(
      "Number of additional guests. Optional. The default is 0.",
    ).optional(),
    asyncOperation: z.string().describe(
      'If present, indicates the status of an asynchronous operation ongoing for this attendee (e.g. listing of members of large attendee groups). Read-only. The default is to not be present. Possible values are: - "inProgress" - The asynchronous operation is in progress. - (not present) - Otherwise.',
    ).optional(),
    comment: z.string().describe("The attendee's response comment. Optional.")
      .optional(),
    displayName: z.string().describe(
      "The attendee's name, if available. Optional.",
    ).optional(),
    email: z.string().describe(
      "The attendee's email address, if available. This field must be present when adding an attendee. It must be a valid email address as per RFC5322. Required when adding an attendee.",
    ).optional(),
    id: z.string().describe("The attendee's Profile ID, if available.")
      .optional(),
    optional: z.boolean().describe(
      "Whether this is an optional attendee. Optional. The default is False.",
    ).optional(),
    organizer: z.boolean().describe(
      "Whether the attendee is the organizer of the event. Read-only. The default is False.",
    ).optional(),
    resource: z.boolean().describe(
      "Whether the attendee is a resource. Can only be set when the attendee is added to the event for the first time. Subsequent modifications are ignored. Optional. The default is False.",
    ).optional(),
    responseStatus: z.string().describe(
      'The attendee\'s response status. Possible values are: - "needsAction" - The attendee has not responded to the invitation (recommended for new events). - "declined" - The attendee has declined the invitation. - "tentative" - The attendee has tentatively accepted the invitation. - "accepted" - The attendee has accepted the invitation. Warning: If you add an event using the values declined, tentative, or accepted, attendees with the "Add invitations to my calendar" setting set to "When I respond to invitation in email" or "Only if the sender is known" might have their response reset to needsAction and won\'t see an event in their calendar unless they change their response in the event invitation email. Furthermore, if more than 200 guests are invited to the event, response status is not propagated to the guests.',
    ).optional(),
    self: z.boolean().describe(
      "Whether this entry represents the calendar on which this copy of the event appears. Read-only. The default is False.",
    ).optional(),
  })).describe(
    "The attendees of the event. See the Events with attendees guide for more information on scheduling events with other calendar users. Service accounts need to use domain-wide delegation of authority to populate the attendee list.",
  ).optional(),
  attendeesOmitted: z.boolean().describe(
    "Whether attendees may have been omitted from the event's representation. When retrieving an event, this may be due to a restriction specified by the maxAttendee query parameter. When updating an event, this can be used to only update the participant's response. Optional. The default is False.",
  ).optional(),
  birthdayProperties: z.object({
    contact: z.string().describe(
      'Resource name of the contact this birthday event is linked to. This can be used to fetch contact details from People API. Format: "people/c12345". Read-only.',
    ).optional(),
    customTypeName: z.string().describe(
      'Custom type label specified for this event. This is populated if birthdayProperties.type is set to "custom". Read-only.',
    ).optional(),
    type: z.string().describe(
      'Type of birthday or special event. Possible values are: - "anniversary" - An anniversary other than birthday. Always has a contact. - "birthday" - A birthday event. This is the default value. - "custom" - A special date whose label is further specified in the customTypeName field. Always has a contact. - "other" - A special date which does not fall into the other categories, and does not have a custom label. Always has a contact. - "self" - Calendar owner\'s own birthday. Cannot have a contact. The Calendar API only supports creating events with the type "birthday". The type cannot be changed after the event is created.',
    ).optional(),
  }).optional(),
  colorId: z.string().describe(
    "The color of the event. This is an ID referring to an entry in the event section of the colors definition (see the colors endpoint). Optional.",
  ).optional(),
  conferenceData: z.object({
    conferenceId: z.string().describe(
      "The ID of the conference. Can be used by developers to keep track of conferences, should not be displayed to users. The ID value is formed differently for each conference solution type: - eventHangout: ID is not set. (This conference type is deprecated.) - eventNamedHangout: ID is the name of the Hangout. (This conference type is deprecated.) - hangoutsMeet: ID is the 10-letter meeting code, for example aaa-bbbb-ccc. - addOn: ID is defined by the third-party provider. Optional.",
    ).optional(),
    conferenceSolution: z.object({
      iconUri: z.string().describe("The user-visible icon for this solution.")
        .optional(),
      key: z.object({
        type: z.string().describe(
          'The conference solution type. If a client encounters an unfamiliar or empty type, it should still be able to display the entry points. However, it should disallow modifications. The possible values are: - "eventHangout" for Hangouts for consumers (deprecated; existing events may show this conference solution type but new conferences cannot be created) - "eventNamedHangout" for classic Hangouts for Google Workspace users (deprecated; existing events may show this conference solution type but new conferences cannot be created) - "hangoutsMeet" for Google Meet (http://meet.google.com) - "addOn" for 3P conference providers',
        ).optional(),
      }).optional(),
      name: z.string().describe(
        "The user-visible name of this solution. Not localized.",
      ).optional(),
    }).optional(),
    createRequest: z.object({
      conferenceSolutionKey: z.object({
        type: z.string().describe(
          'The conference solution type. If a client encounters an unfamiliar or empty type, it should still be able to display the entry points. However, it should disallow modifications. The possible values are: - "eventHangout" for Hangouts for consumers (deprecated; existing events may show this conference solution type but new conferences cannot be created) - "eventNamedHangout" for classic Hangouts for Google Workspace users (deprecated; existing events may show this conference solution type but new conferences cannot be created) - "hangoutsMeet" for Google Meet (http://meet.google.com) - "addOn" for 3P conference providers',
        ).optional(),
      }).optional(),
      requestId: z.string().describe(
        "The client-generated unique ID for this request. Clients should regenerate this ID for every new request. If an ID provided is the same as for the previous request, the request is ignored.",
      ).optional(),
      status: z.object({
        statusCode: z.string().describe(
          'The current status of the conference create request. Read-only. The possible values are: - "pending": the conference create request is still being processed. - "success": the conference create request succeeded, the entry points are populated. - "failure": the conference create request failed, there are no entry points.',
        ).optional(),
      }).optional(),
    }).optional(),
    entryPoints: z.array(z.object({
      accessCode: z.string().describe(
        "The access code to access the conference. The maximum length is 128 characters. When creating new conference data, populate only the subset of {meetingCode, accessCode, passcode, password, pin} fields that match the terminology that the conference provider uses. Only the populated fields should be displayed. Optional.",
      ).optional(),
      entryPointFeatures: z.array(z.string()).describe(
        "Features of the entry point, such as being toll or toll-free. One entry point can have multiple features. However, toll and toll-free cannot be both set on the same entry point.",
      ).optional(),
      entryPointType: z.string().describe(
        'The type of the conference entry point. Possible values are: - "video" - joining a conference over HTTP. A conference can have zero or one video entry point. - "phone" - joining a conference by dialing a phone number. A conference can have zero or more phone entry points. - "sip" - joining a conference over SIP. A conference can have zero or one sip entry point. - "more" - further conference joining instructions, for example additional phone numbers. A conference can have zero or one more entry point. A conference with only a more entry point is not a valid conference.',
      ).optional(),
      label: z.string().describe(
        "The label for the URI. Visible to end users. Not localized. The maximum length is 512 characters. Examples: - for video: meet.google.com/aaa-bbbb-ccc - for phone: +1 123 268 2601 - for sip: 12345678@altostrat.com - for more: should not be filled Optional.",
      ).optional(),
      meetingCode: z.string().describe(
        "The meeting code to access the conference. The maximum length is 128 characters. When creating new conference data, populate only the subset of {meetingCode, accessCode, passcode, password, pin} fields that match the terminology that the conference provider uses. Only the populated fields should be displayed. Optional.",
      ).optional(),
      passcode: z.string().describe(
        "The passcode to access the conference. The maximum length is 128 characters. When creating new conference data, populate only the subset of {meetingCode, accessCode, passcode, password, pin} fields that match the terminology that the conference provider uses. Only the populated fields should be displayed.",
      ).optional(),
      password: z.string().describe(
        "The password to access the conference. The maximum length is 128 characters. When creating new conference data, populate only the subset of {meetingCode, accessCode, passcode, password, pin} fields that match the terminology that the conference provider uses. Only the populated fields should be displayed. Optional.",
      ).optional(),
      pin: z.string().describe(
        "The PIN to access the conference. The maximum length is 128 characters. When creating new conference data, populate only the subset of {meetingCode, accessCode, passcode, password, pin} fields that match the terminology that the conference provider uses. Only the populated fields should be displayed. Optional.",
      ).optional(),
      regionCode: z.string().describe(
        'The CLDR/ISO 3166 region code for the country associated with this phone access. Example: "SE" for Sweden. Calendar backend will populate this field only for EntryPointType.PHONE.',
      ).optional(),
      uri: z.string().describe(
        "The URI of the entry point. The maximum length is 1300 characters. Format: - for video, http: or https: schema is required. - for phone, tel: schema is required. The URI should include the entire dial sequence (e.g., tel:+12345678900,,,123456789;1234). - for sip, sip: schema is required, e.g., sip:12345678@myprovider.com. - for more, http: or https: schema is required.",
      ).optional(),
    })).describe(
      "Information about individual conference entry points, such as URLs or phone numbers. All of them must belong to the same conference. Either conferenceSolution and at least one entryPoint, or createRequest is required.",
    ).optional(),
    notes: z.string().describe(
      "Additional notes (such as instructions from the domain administrator, legal notices) to display to the user. Can contain HTML. The maximum length is 2048 characters. Optional.",
    ).optional(),
    parameters: z.object({
      addOnParameters: z.object({
        parameters: z.record(z.string(), z.string()).optional(),
      }).optional(),
    }).optional(),
    signature: z.string().describe(
      "The signature of the conference data. Generated on server side. Unset for a conference with a failed create request. Optional for a conference with a pending create request.",
    ).optional(),
  }).optional(),
  created: z.string().describe(
    "Creation time of the event (as a RFC3339 timestamp). Read-only.",
  ).optional(),
  creator: z.object({
    displayName: z.string().describe("The creator's name, if available.")
      .optional(),
    email: z.string().describe("The creator's email address, if available.")
      .optional(),
    id: z.string().describe("The creator's Profile ID, if available.")
      .optional(),
    self: z.boolean().describe(
      "Whether the creator corresponds to the calendar on which this copy of the event appears. Read-only. The default is False.",
    ).optional(),
  }).describe("The creator of the event. Read-only.").optional(),
  description: z.string().describe(
    "Description of the event. Can contain HTML. Optional.",
  ).optional(),
  end: z.object({
    date: z.string().describe(
      'The date, in the format "yyyy-mm-dd", if this is an all-day event.',
    ).optional(),
    dateTime: z.string().describe(
      "The time, as a combined date-time value (formatted according to RFC3339). A time zone offset is required unless a time zone is explicitly specified in timeZone.",
    ).optional(),
    timeZone: z.string().describe(
      'The time zone in which the time is specified. (Formatted as an IANA Time Zone Database name, e.g. "Europe/Zurich".) For recurring events this field is required and specifies the time zone in which the recurrence is expanded. For single events this field is optional and indicates a custom time zone for the event start/end.',
    ).optional(),
  }).optional(),
  endTimeUnspecified: z.boolean().describe(
    "Whether the end time is actually unspecified. An end time is still provided for compatibility reasons, even if this attribute is set to True. The default is False.",
  ).optional(),
  eventType: z.string().describe(
    'Specific type of the event. This cannot be modified after the event is created. Possible values are: - "birthday" - A special all-day event with an annual recurrence. - "default" - A regular event or not further specified. - "focusTime" - A focus-time event. - "fromGmail" - An event from Gmail. This type of event cannot be created. - "outOfOffice" - An out-of-office event. - "workingLocation" - A working location event.',
  ).optional(),
  extendedProperties: z.object({
    private: z.record(z.string(), z.string()).describe(
      "Properties that are private to the copy of the event that appears on this calendar.",
    ).optional(),
    shared: z.record(z.string(), z.string()).describe(
      "Properties that are shared between copies of the event on other attendees' calendars.",
    ).optional(),
  }).describe("Extended properties of the event.").optional(),
  focusTimeProperties: z.object({
    autoDeclineMode: z.string().describe(
      "Whether to decline meeting invitations which overlap Focus Time events. Valid values are declineNone, meaning that no meeting invitations are declined; declineAllConflictingInvitations, meaning that all conflicting meeting invitations that conflict with the event are declined; and declineOnlyNewConflictingInvitations, meaning that only new conflicting meeting invitations which arrive while the Focus Time event is present are to be declined.",
    ).optional(),
    chatStatus: z.string().describe(
      "The status to mark the user in Chat and related products. This can be available or doNotDisturb.",
    ).optional(),
    declineMessage: z.string().describe(
      "Response message to set if an existing event or new invitation is automatically declined by Calendar.",
    ).optional(),
  }).optional(),
  gadget: z.object({
    display: z.string().describe(
      'The gadget\'s display mode. Deprecated. Possible values are: - "icon" - The gadget displays next to the event\'s title in the calendar view. - "chip" - The gadget displays when the event is clicked.',
    ).optional(),
    height: z.number().int().describe(
      "The gadget's height in pixels. The height must be an integer greater than 0. Optional. Deprecated.",
    ).optional(),
    iconLink: z.string().describe(
      "The gadget's icon URL. The URL scheme must be HTTPS. Deprecated.",
    ).optional(),
    link: z.string().describe(
      "The gadget's URL. The URL scheme must be HTTPS. Deprecated.",
    ).optional(),
    preferences: z.record(z.string(), z.string()).describe("Preferences.")
      .optional(),
    title: z.string().describe("The gadget's title. Deprecated.").optional(),
    type: z.string().describe("The gadget's type. Deprecated.").optional(),
    width: z.number().int().describe(
      "The gadget's width in pixels. The width must be an integer greater than 0. Optional. Deprecated.",
    ).optional(),
  }).describe(
    "A gadget that extends this event. Gadgets are deprecated; this structure is instead only used for returning birthday calendar metadata.",
  ).optional(),
  guestsCanInviteOthers: z.boolean().describe(
    "Whether attendees other than the organizer can invite others to the event. Optional. The default is True.",
  ).optional(),
  guestsCanModify: z.boolean().describe(
    "Whether attendees other than the organizer can modify the event. Optional. The default is False.",
  ).optional(),
  guestsCanSeeOtherGuests: z.boolean().describe(
    "Whether attendees other than the organizer can see who the event's attendees are. Optional. The default is True.",
  ).optional(),
  hangoutLink: z.string().describe(
    "An absolute link to the Google Hangout associated with this event. Read-only.",
  ).optional(),
  htmlLink: z.string().describe(
    "An absolute link to this event in the Google Calendar Web UI. Read-only.",
  ).optional(),
  iCalUID: z.string().describe(
    "Event unique identifier as defined in RFC5545. It is used to uniquely identify events accross calendaring systems and must be supplied when importing events via the import method. Note that the iCalUID and the id are not identical and only one of them should be supplied at event creation time. One difference in their semantics is that in recurring events, all occurrences of one event have different ids while they all share the same iCalUIDs. To retrieve an event using its iCalUID, call the events.list method using the iCalUID parameter. To retrieve an event using its id, call the events.get method.",
  ).optional(),
  id: z.string().describe(
    "Opaque identifier of the event. When creating new single or recurring events, you can specify their IDs. Provided IDs must follow these rules: - characters allowed in the ID are those used in base32hex encoding, i.e. lowercase letters a-v and digits 0-9, see section 3.1.2 in RFC2938 - the length of the ID must be between 5 and 1024 characters - the ID must be unique per calendar Due to the globally distributed nature of the system, we cannot guarantee that ID collisions will be detected at event creation time. To minimize the risk of collisions we recommend using an established UUID algorithm such as one described in RFC4122. If you do not specify an ID, it will be automatically generated by the server. Note that the icalUID and the id are not identical and only one of them should be supplied at event creation time. One difference in their semantics is that in recurring events, all occurrences of one event have different ids while they all share the same icalUIDs.",
  ).optional(),
  location: z.string().describe(
    "Geographic location of the event as free-form text. Optional.",
  ).optional(),
  locked: z.boolean().describe(
    'Whether this is a locked event copy where no changes can be made to the main event fields "summary", "description", "location", "start", "end" or "recurrence". The default is False. Read-Only.',
  ).optional(),
  organizer: z.object({
    displayName: z.string().describe("The organizer's name, if available.")
      .optional(),
    email: z.string().describe(
      "The organizer's email address, if available. It must be a valid email address as per RFC5322.",
    ).optional(),
    id: z.string().describe("The organizer's Profile ID, if available.")
      .optional(),
    self: z.boolean().describe(
      "Whether the organizer corresponds to the calendar on which this copy of the event appears. Read-only. The default is False.",
    ).optional(),
  }).describe(
    "The organizer of the event. If the organizer is also an attendee, this is indicated with a separate entry in attendees with the organizer field set to True. To change the organizer, use the move operation. Read-only, except when importing an event.",
  ).optional(),
  originalStartTime: z.object({
    date: z.string().describe(
      'The date, in the format "yyyy-mm-dd", if this is an all-day event.',
    ).optional(),
    dateTime: z.string().describe(
      "The time, as a combined date-time value (formatted according to RFC3339). A time zone offset is required unless a time zone is explicitly specified in timeZone.",
    ).optional(),
    timeZone: z.string().describe(
      'The time zone in which the time is specified. (Formatted as an IANA Time Zone Database name, e.g. "Europe/Zurich".) For recurring events this field is required and specifies the time zone in which the recurrence is expanded. For single events this field is optional and indicates a custom time zone for the event start/end.',
    ).optional(),
  }).optional(),
  outOfOfficeProperties: z.object({
    autoDeclineMode: z.string().describe(
      "Whether to decline meeting invitations which overlap Out of office events. Valid values are declineNone, meaning that no meeting invitations are declined; declineAllConflictingInvitations, meaning that all conflicting meeting invitations that conflict with the event are declined; and declineOnlyNewConflictingInvitations, meaning that only new conflicting meeting invitations which arrive while the Out of office event is present are to be declined.",
    ).optional(),
    declineMessage: z.string().describe(
      "Response message to set if an existing event or new invitation is automatically declined by Calendar.",
    ).optional(),
  }).optional(),
  privateCopy: z.boolean().describe(
    "If set to True, Event propagation is disabled. Note that it is not the same thing as Private event properties. Optional. Immutable. The default is False.",
  ).optional(),
  recurrence: z.array(z.string()).describe(
    "List of RRULE, EXRULE, RDATE and EXDATE lines for a recurring event, as specified in RFC5545. Note that DTSTART and DTEND lines are not allowed in this field; event start and end times are specified in the start and end fields. This field is omitted for single events or instances of recurring events.",
  ).optional(),
  recurringEventId: z.string().describe(
    "For an instance of a recurring event, this is the id of the recurring event to which this instance belongs. Immutable.",
  ).optional(),
  reminders: z.object({
    overrides: z.array(z.object({
      method: z.string().describe(
        'The method used by this reminder. Possible values are: - "email" - Reminders are sent via email. - "popup" - Reminders are sent via a UI popup. Required when adding a reminder.',
      ).optional(),
      minutes: z.number().int().describe(
        "Number of minutes before the start of the event when the reminder should trigger. Valid values are between 0 and 40320 (4 weeks in minutes). Required when adding a reminder.",
      ).optional(),
    })).describe(
      "If the event doesn't use the default reminders, this lists the reminders specific to the event, or, if not set, indicates that no reminders are set for this event. The maximum number of override reminders is 5.",
    ).optional(),
    useDefault: z.boolean().describe(
      "Whether the default reminders of the calendar apply to the event.",
    ).optional(),
  }).describe(
    "Information about the event's reminders for the authenticated user. Note that changing reminders does not also change the updated property of the enclosing event.",
  ).optional(),
  sequence: z.number().int().describe("Sequence number as per iCalendar.")
    .optional(),
  source: z.object({
    title: z.string().describe(
      "Title of the source; for example a title of a web page or an email subject.",
    ).optional(),
    url: z.string().describe(
      "URL of the source pointing to a resource. The URL scheme must be HTTP or HTTPS.",
    ).optional(),
  }).describe(
    "Source from which the event was created. For example, a web page, an email message or any document identifiable by an URL with HTTP or HTTPS scheme. Can only be seen or modified by the creator of the event.",
  ).optional(),
  start: z.object({
    date: z.string().describe(
      'The date, in the format "yyyy-mm-dd", if this is an all-day event.',
    ).optional(),
    dateTime: z.string().describe(
      "The time, as a combined date-time value (formatted according to RFC3339). A time zone offset is required unless a time zone is explicitly specified in timeZone.",
    ).optional(),
    timeZone: z.string().describe(
      'The time zone in which the time is specified. (Formatted as an IANA Time Zone Database name, e.g. "Europe/Zurich".) For recurring events this field is required and specifies the time zone in which the recurrence is expanded. For single events this field is optional and indicates a custom time zone for the event start/end.',
    ).optional(),
  }).optional(),
  status: z.string().describe(
    'Status of the event. Optional. Possible values are: - "confirmed" - The event is confirmed. This is the default status. - "tentative" - The event is tentatively confirmed. - "cancelled" - The event is cancelled (deleted). The list method returns cancelled events only on incremental sync (when syncToken or updatedMin are specified) or if the showDeleted flag is set to true. The get method always returns them. A cancelled status represents two different states depending on the event type: - Cancelled exceptions of an uncancelled recurring event indicate that this instance should no longer be presented to the user. Clients should store these events for the lifetime of the parent recurring event. Cancelled exceptions are only guaranteed to have values for the id, recurringEventId and originalStartTime fields populated. The other fields might be empty. - All other cancelled events represent deleted events. Clients should remove their locally synced copies. Such cancelled events will eventually disappear, so do not rely on them being available indefinitely. Deleted events are only guaranteed to have the id field populated. On the organizer\'s calendar, cancelled events continue to expose event details (summary, location, etc.) so that they can be restored (undeleted). Similarly, the events to which the user was invited and that they manually removed continue to provide details. However, incremental sync requests with showDeleted set to false will not return these details. If an event changes its organizer (for example via the move operation) and the original organizer is not on the attendee list, it will leave behind a cancelled event where only the id field is guaranteed to be populated.',
  ).optional(),
  summary: z.string().describe("Title of the event.").optional(),
  transparency: z.string().describe(
    'Whether the event blocks time on the calendar. Optional. Possible values are: - "opaque" - Default value. The event does block time on the calendar. This is equivalent to setting Show me as to Busy in the Calendar UI. - "transparent" - The event does not block time on the calendar. This is equivalent to setting Show me as to Available in the Calendar UI.',
  ).optional(),
  updated: z.string().describe(
    "Last modification time of the main event data (as a RFC3339 timestamp). Updating event reminders will not cause this to change. Read-only.",
  ).optional(),
  visibility: z.string().describe(
    'Visibility of the event. Optional. Possible values are: - "default" - Uses the default visibility for events on the calendar. This is the default value. - "public" - The event is public and event details are visible to all readers of the calendar. - "private" - The event is private and only event attendees may view event details. - "confidential" - The event is private. This value is provided for compatibility reasons.',
  ).optional(),
  workingLocationProperties: z.object({
    customLocation: z.object({
      label: z.string().describe(
        "An optional extra label for additional information.",
      ).optional(),
    }).describe(
      "If present, specifies that the user is working from a custom location.",
    ).optional(),
    homeOffice: z.string().describe(
      "If present, specifies that the user is working at home.",
    ).optional(),
    officeLocation: z.object({
      buildingId: z.string().describe(
        "An optional building identifier. This should reference a building ID in the organization's Resources database.",
      ).optional(),
      deskId: z.string().describe("An optional desk identifier.").optional(),
      floorId: z.string().describe("An optional floor identifier.").optional(),
      floorSectionId: z.string().describe(
        "An optional floor section identifier.",
      ).optional(),
      label: z.string().describe(
        "The office name that's displayed in Calendar Web and Mobile clients. We recommend you reference a building name in the organization's Resources database.",
      ).optional(),
    }).describe(
      "If present, specifies that the user is working from an office.",
    ).optional(),
    type: z.string().describe(
      'Type of the working location. Possible values are: - "homeOffice" - The user is working at home. - "officeLocation" - The user is working from an office. - "customLocation" - The user is working from a custom location. Any details are specified in a sub-field of the specified name, but this field may be missing if empty. Any other fields are ignored. Required when adding working location properties.',
    ).optional(),
  }).optional(),
  calendarId: z.string().describe(
    'Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.',
  ).optional(),
  conferenceDataVersion: z.string().describe(
    "Version number of conference data supported by the API client. Version 0 assumes no conference data support and ignores conference data in the event's body. Version 1 enables support for copying of ConferenceData as well as for creating new conferences using the createRequest field of conferenceData. The default is 0.",
  ).optional(),
  maxAttendees: z.string().describe(
    "The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional.",
  ).optional(),
  sendNotifications: z.string().describe(
    "Deprecated. Please use sendUpdates instead. Whether to send notifications about the creation of the new event. Note that some emails might still be sent even if you set the value to false. The default is false.",
  ).optional(),
  sendUpdates: z.string().describe(
    "Whether to send notifications about the creation of the new event. Note that some emails might still be sent. The default is false.",
  ).optional(),
  supportsAttachments: z.string().describe(
    "Whether API client performing operation supports event attachments. Optional. The default is False.",
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

/** Swamp extension model for Google Cloud Calendar Events. Registered at `@swamp/gcp/calendar/events`. */
export const model = {
  type: "@swamp/gcp/calendar/events",
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
      toVersion: "2026.05.26.1",
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
        "Returns an event based on its Google Calendar ID. To retrieve an event using ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a events",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["calendarId"] !== undefined) {
          params["calendarId"] = String(g["calendarId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["anyoneCanAddSelf"] !== undefined) {
          body["anyoneCanAddSelf"] = g["anyoneCanAddSelf"];
        }
        if (g["attachments"] !== undefined) {
          body["attachments"] = g["attachments"];
        }
        if (g["attendees"] !== undefined) body["attendees"] = g["attendees"];
        if (g["attendeesOmitted"] !== undefined) {
          body["attendeesOmitted"] = g["attendeesOmitted"];
        }
        if (g["birthdayProperties"] !== undefined) {
          body["birthdayProperties"] = g["birthdayProperties"];
        }
        if (g["colorId"] !== undefined) body["colorId"] = g["colorId"];
        if (g["conferenceData"] !== undefined) {
          body["conferenceData"] = g["conferenceData"];
        }
        if (g["created"] !== undefined) body["created"] = g["created"];
        if (g["creator"] !== undefined) body["creator"] = g["creator"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["end"] !== undefined) body["end"] = g["end"];
        if (g["endTimeUnspecified"] !== undefined) {
          body["endTimeUnspecified"] = g["endTimeUnspecified"];
        }
        if (g["eventType"] !== undefined) body["eventType"] = g["eventType"];
        if (g["extendedProperties"] !== undefined) {
          body["extendedProperties"] = g["extendedProperties"];
        }
        if (g["focusTimeProperties"] !== undefined) {
          body["focusTimeProperties"] = g["focusTimeProperties"];
        }
        if (g["gadget"] !== undefined) body["gadget"] = g["gadget"];
        if (g["guestsCanInviteOthers"] !== undefined) {
          body["guestsCanInviteOthers"] = g["guestsCanInviteOthers"];
        }
        if (g["guestsCanModify"] !== undefined) {
          body["guestsCanModify"] = g["guestsCanModify"];
        }
        if (g["guestsCanSeeOtherGuests"] !== undefined) {
          body["guestsCanSeeOtherGuests"] = g["guestsCanSeeOtherGuests"];
        }
        if (g["hangoutLink"] !== undefined) {
          body["hangoutLink"] = g["hangoutLink"];
        }
        if (g["htmlLink"] !== undefined) body["htmlLink"] = g["htmlLink"];
        if (g["iCalUID"] !== undefined) body["iCalUID"] = g["iCalUID"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["location"] !== undefined) body["location"] = g["location"];
        if (g["locked"] !== undefined) body["locked"] = g["locked"];
        if (g["organizer"] !== undefined) body["organizer"] = g["organizer"];
        if (g["originalStartTime"] !== undefined) {
          body["originalStartTime"] = g["originalStartTime"];
        }
        if (g["outOfOfficeProperties"] !== undefined) {
          body["outOfOfficeProperties"] = g["outOfOfficeProperties"];
        }
        if (g["privateCopy"] !== undefined) {
          body["privateCopy"] = g["privateCopy"];
        }
        if (g["recurrence"] !== undefined) body["recurrence"] = g["recurrence"];
        if (g["recurringEventId"] !== undefined) {
          body["recurringEventId"] = g["recurringEventId"];
        }
        if (g["reminders"] !== undefined) body["reminders"] = g["reminders"];
        if (g["sequence"] !== undefined) body["sequence"] = g["sequence"];
        if (g["source"] !== undefined) body["source"] = g["source"];
        if (g["start"] !== undefined) body["start"] = g["start"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["summary"] !== undefined) body["summary"] = g["summary"];
        if (g["transparency"] !== undefined) {
          body["transparency"] = g["transparency"];
        }
        if (g["updated"] !== undefined) body["updated"] = g["updated"];
        if (g["visibility"] !== undefined) body["visibility"] = g["visibility"];
        if (g["workingLocationProperties"] !== undefined) {
          body["workingLocationProperties"] = g["workingLocationProperties"];
        }
        if (g["conferenceDataVersion"] !== undefined) {
          body["conferenceDataVersion"] = g["conferenceDataVersion"];
        }
        if (g["maxAttendees"] !== undefined) {
          body["maxAttendees"] = g["maxAttendees"];
        }
        if (g["sendNotifications"] !== undefined) {
          body["sendNotifications"] = g["sendNotifications"];
        }
        if (g["sendUpdates"] !== undefined) {
          body["sendUpdates"] = g["sendUpdates"];
        }
        if (g["supportsAttachments"] !== undefined) {
          body["supportsAttachments"] = g["supportsAttachments"];
        }
        if (g["name"] !== undefined) params["eventId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "calendarId": String(g["calendarId"] ?? "") },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
          credentials,
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
      description: "Get a events",
      arguments: z.object({
        identifier: z.string().describe("The name of the events"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["calendarId"] !== undefined) {
          params["calendarId"] = String(g["calendarId"]);
        }
        params["eventId"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
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
    update: {
      description: "Update events attributes",
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
        const params: Record<string, string> = { project: projectId };
        if (g["calendarId"] !== undefined) {
          params["calendarId"] = String(g["calendarId"]);
        } else if (existing["calendarId"]) {
          params["calendarId"] = String(existing["calendarId"]);
        }
        params["eventId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["anyoneCanAddSelf"] !== undefined) {
          body["anyoneCanAddSelf"] = g["anyoneCanAddSelf"];
        }
        if (g["attachments"] !== undefined) {
          body["attachments"] = g["attachments"];
        }
        if (g["attendees"] !== undefined) body["attendees"] = g["attendees"];
        if (g["attendeesOmitted"] !== undefined) {
          body["attendeesOmitted"] = g["attendeesOmitted"];
        }
        if (g["birthdayProperties"] !== undefined) {
          body["birthdayProperties"] = g["birthdayProperties"];
        }
        if (g["colorId"] !== undefined) body["colorId"] = g["colorId"];
        if (g["conferenceData"] !== undefined) {
          body["conferenceData"] = g["conferenceData"];
        }
        if (g["created"] !== undefined) body["created"] = g["created"];
        if (g["creator"] !== undefined) body["creator"] = g["creator"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["end"] !== undefined) body["end"] = g["end"];
        if (g["endTimeUnspecified"] !== undefined) {
          body["endTimeUnspecified"] = g["endTimeUnspecified"];
        }
        if (g["extendedProperties"] !== undefined) {
          body["extendedProperties"] = g["extendedProperties"];
        }
        if (g["focusTimeProperties"] !== undefined) {
          body["focusTimeProperties"] = g["focusTimeProperties"];
        }
        if (g["gadget"] !== undefined) body["gadget"] = g["gadget"];
        if (g["guestsCanInviteOthers"] !== undefined) {
          body["guestsCanInviteOthers"] = g["guestsCanInviteOthers"];
        }
        if (g["guestsCanModify"] !== undefined) {
          body["guestsCanModify"] = g["guestsCanModify"];
        }
        if (g["guestsCanSeeOtherGuests"] !== undefined) {
          body["guestsCanSeeOtherGuests"] = g["guestsCanSeeOtherGuests"];
        }
        if (g["hangoutLink"] !== undefined) {
          body["hangoutLink"] = g["hangoutLink"];
        }
        if (g["htmlLink"] !== undefined) body["htmlLink"] = g["htmlLink"];
        if (g["iCalUID"] !== undefined) body["iCalUID"] = g["iCalUID"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["location"] !== undefined) body["location"] = g["location"];
        if (g["locked"] !== undefined) body["locked"] = g["locked"];
        if (g["organizer"] !== undefined) body["organizer"] = g["organizer"];
        if (g["originalStartTime"] !== undefined) {
          body["originalStartTime"] = g["originalStartTime"];
        }
        if (g["outOfOfficeProperties"] !== undefined) {
          body["outOfOfficeProperties"] = g["outOfOfficeProperties"];
        }
        if (g["recurrence"] !== undefined) body["recurrence"] = g["recurrence"];
        if (g["reminders"] !== undefined) body["reminders"] = g["reminders"];
        if (g["sequence"] !== undefined) body["sequence"] = g["sequence"];
        if (g["source"] !== undefined) body["source"] = g["source"];
        if (g["start"] !== undefined) body["start"] = g["start"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["summary"] !== undefined) body["summary"] = g["summary"];
        if (g["transparency"] !== undefined) {
          body["transparency"] = g["transparency"];
        }
        if (g["updated"] !== undefined) body["updated"] = g["updated"];
        if (g["visibility"] !== undefined) body["visibility"] = g["visibility"];
        if (g["workingLocationProperties"] !== undefined) {
          body["workingLocationProperties"] = g["workingLocationProperties"];
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
    delete: {
      description: "Delete the events",
      arguments: z.object({
        identifier: z.string().describe("The name of the events"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["calendarId"] !== undefined) {
          params["calendarId"] = String(g["calendarId"]);
        }
        params["eventId"] = args.identifier;
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
      description: "Sync events state from GCP",
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
          if (g["calendarId"] !== undefined) {
            params["calendarId"] = String(g["calendarId"]);
          } else if (existing["calendarId"]) {
            params["calendarId"] = String(existing["calendarId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["eventId"] = identifier;
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
      description: "List events resources",
      arguments: z.object({
        alwaysIncludeEmail: z.boolean().describe("Deprecated and ignored.")
          .optional(),
        eventTypes: z.string().describe(
          "Event types to return. Optional. This parameter can be repeated multiple times to return events of different types. If unset, returns all event types.",
        ).optional(),
        iCalUID: z.string().describe(
          "Specifies an event ID in the iCalendar format to be provided in the response. Optional. Use this if you want to search for an event by its iCalendar ID.",
        ).optional(),
        maxAttendees: z.number().describe(
          "The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional.",
        ).optional(),
        maxResults: z.number().describe(
          "Maximum number of events returned on one result page. The number of events in the resulting page may be less than this value, or none at all, even if there are more events matching the query. Incomplete pages can be detected by a non-empty nextPageToken field in the response. By default the value is 250 events. The page size can never be larger than 2500 events. Optional.",
        ).optional(),
        orderBy: z.string().describe(
          "The order of the events returned in the result. Optional. The default is an unspecified, stable order.",
        ).optional(),
        privateExtendedProperty: z.string().describe(
          "Extended properties constraint specified as propertyName=value. Matches only private properties. This parameter might be repeated multiple times to return events that match all given constraints.",
        ).optional(),
        q: z.string().describe(
          "Free text search terms to find events that match these terms in the following fields:",
        ).optional(),
        sharedExtendedProperty: z.string().describe(
          "Extended properties constraint specified as propertyName=value. Matches only shared properties. This parameter might be repeated multiple times to return events that match all given constraints.",
        ).optional(),
        showDeleted: z.boolean().describe(
          'Whether to include deleted events (with status equals "cancelled") in the result. Cancelled instances of recurring events (but not the underlying recurring event) will still be included if showDeleted and singleEvents are both False. If showDeleted and singleEvents are both True, only single instances of deleted events (but not the underlying recurring events) are returned. Optional. The default is False.',
        ).optional(),
        showHiddenInvitations: z.boolean().describe(
          "Whether to include hidden invitations in the result. Optional. The default is False.",
        ).optional(),
        singleEvents: z.boolean().describe(
          "Whether to expand recurring events into instances and only return single one-off events and instances of recurring events, but not the underlying recurring events themselves. Optional. The default is False.",
        ).optional(),
        syncToken: z.string().describe(
          "Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. All events deleted since the previous list request will always be in the result set and it is not allowed to set showDeleted to False.",
        ).optional(),
        timeMax: z.string().describe(
          "Upper bound (exclusive) for an event's start time to filter by. Optional. The default is not to filter by start time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z. Milliseconds may be provided but are ignored. If timeMin is set, timeMax must be greater than timeMin.",
        ).optional(),
        timeMin: z.string().describe(
          "Lower bound (exclusive) for an event's end time to filter by. Optional. The default is not to filter by end time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z. Milliseconds may be provided but are ignored. If timeMax is set, timeMin must be smaller than timeMax.",
        ).optional(),
        timeZone: z.string().describe(
          "Time zone used in the response. Optional. The default is the time zone of the calendar.",
        ).optional(),
        updatedMin: z.string().describe(
          "Lower bound for an event's last modification time (as a RFC3339 timestamp) to filter by. When specified, entries deleted since this time will always be included regardless of showDeleted. Optional. The default is not to filter by last modification time.",
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
        if (g["calendarId"] !== undefined) {
          params["calendarId"] = String(g["calendarId"]);
        }
        if (args["alwaysIncludeEmail"] !== undefined) {
          params["alwaysIncludeEmail"] = String(args["alwaysIncludeEmail"]);
        }
        if (args["eventTypes"] !== undefined) {
          params["eventTypes"] = String(args["eventTypes"]);
        }
        if (args["iCalUID"] !== undefined) {
          params["iCalUID"] = String(args["iCalUID"]);
        }
        if (args["maxAttendees"] !== undefined) {
          params["maxAttendees"] = String(args["maxAttendees"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["privateExtendedProperty"] !== undefined) {
          params["privateExtendedProperty"] = String(
            args["privateExtendedProperty"],
          );
        }
        if (args["q"] !== undefined) params["q"] = String(args["q"]);
        if (args["sharedExtendedProperty"] !== undefined) {
          params["sharedExtendedProperty"] = String(
            args["sharedExtendedProperty"],
          );
        }
        if (args["showDeleted"] !== undefined) {
          params["showDeleted"] = String(args["showDeleted"]);
        }
        if (args["showHiddenInvitations"] !== undefined) {
          params["showHiddenInvitations"] = String(
            args["showHiddenInvitations"],
          );
        }
        if (args["singleEvents"] !== undefined) {
          params["singleEvents"] = String(args["singleEvents"]);
        }
        if (args["syncToken"] !== undefined) {
          params["syncToken"] = String(args["syncToken"]);
        }
        if (args["timeMax"] !== undefined) {
          params["timeMax"] = String(args["timeMax"]);
        }
        if (args["timeMin"] !== undefined) {
          params["timeMin"] = String(args["timeMin"]);
        }
        if (args["timeZone"] !== undefined) {
          params["timeZone"] = String(args["timeZone"]);
        }
        if (args["updatedMin"] !== undefined) {
          params["updatedMin"] = String(args["updatedMin"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "defaultReminders",
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
    import: {
      description: "import",
      arguments: z.object({
        anyoneCanAddSelf: z.any().optional(),
        attachments: z.any().optional(),
        attendees: z.any().optional(),
        attendeesOmitted: z.any().optional(),
        birthdayProperties: z.any().optional(),
        colorId: z.any().optional(),
        conferenceData: z.any().optional(),
        created: z.any().optional(),
        creator: z.any().optional(),
        description: z.any().optional(),
        end: z.any().optional(),
        endTimeUnspecified: z.any().optional(),
        etag: z.any().optional(),
        eventType: z.any().optional(),
        extendedProperties: z.any().optional(),
        focusTimeProperties: z.any().optional(),
        gadget: z.any().optional(),
        guestsCanInviteOthers: z.any().optional(),
        guestsCanModify: z.any().optional(),
        guestsCanSeeOtherGuests: z.any().optional(),
        hangoutLink: z.any().optional(),
        htmlLink: z.any().optional(),
        iCalUID: z.any().optional(),
        id: z.any().optional(),
        kind: z.any().optional(),
        location: z.any().optional(),
        locked: z.any().optional(),
        organizer: z.any().optional(),
        originalStartTime: z.any().optional(),
        outOfOfficeProperties: z.any().optional(),
        privateCopy: z.any().optional(),
        recurrence: z.any().optional(),
        recurringEventId: z.any().optional(),
        reminders: z.any().optional(),
        sequence: z.any().optional(),
        source: z.any().optional(),
        start: z.any().optional(),
        status: z.any().optional(),
        summary: z.any().optional(),
        transparency: z.any().optional(),
        updated: z.any().optional(),
        visibility: z.any().optional(),
        workingLocationProperties: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["calendarId"] !== undefined) {
          params["calendarId"] = String(g["calendarId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["anyoneCanAddSelf"] !== undefined) {
          body["anyoneCanAddSelf"] = args["anyoneCanAddSelf"];
        }
        if (args["attachments"] !== undefined) {
          body["attachments"] = args["attachments"];
        }
        if (args["attendees"] !== undefined) {
          body["attendees"] = args["attendees"];
        }
        if (args["attendeesOmitted"] !== undefined) {
          body["attendeesOmitted"] = args["attendeesOmitted"];
        }
        if (args["birthdayProperties"] !== undefined) {
          body["birthdayProperties"] = args["birthdayProperties"];
        }
        if (args["colorId"] !== undefined) body["colorId"] = args["colorId"];
        if (args["conferenceData"] !== undefined) {
          body["conferenceData"] = args["conferenceData"];
        }
        if (args["created"] !== undefined) body["created"] = args["created"];
        if (args["creator"] !== undefined) body["creator"] = args["creator"];
        if (args["description"] !== undefined) {
          body["description"] = args["description"];
        }
        if (args["end"] !== undefined) body["end"] = args["end"];
        if (args["endTimeUnspecified"] !== undefined) {
          body["endTimeUnspecified"] = args["endTimeUnspecified"];
        }
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["eventType"] !== undefined) {
          body["eventType"] = args["eventType"];
        }
        if (args["extendedProperties"] !== undefined) {
          body["extendedProperties"] = args["extendedProperties"];
        }
        if (args["focusTimeProperties"] !== undefined) {
          body["focusTimeProperties"] = args["focusTimeProperties"];
        }
        if (args["gadget"] !== undefined) body["gadget"] = args["gadget"];
        if (args["guestsCanInviteOthers"] !== undefined) {
          body["guestsCanInviteOthers"] = args["guestsCanInviteOthers"];
        }
        if (args["guestsCanModify"] !== undefined) {
          body["guestsCanModify"] = args["guestsCanModify"];
        }
        if (args["guestsCanSeeOtherGuests"] !== undefined) {
          body["guestsCanSeeOtherGuests"] = args["guestsCanSeeOtherGuests"];
        }
        if (args["hangoutLink"] !== undefined) {
          body["hangoutLink"] = args["hangoutLink"];
        }
        if (args["htmlLink"] !== undefined) body["htmlLink"] = args["htmlLink"];
        if (args["iCalUID"] !== undefined) body["iCalUID"] = args["iCalUID"];
        if (args["id"] !== undefined) body["id"] = args["id"];
        if (args["kind"] !== undefined) body["kind"] = args["kind"];
        if (args["location"] !== undefined) body["location"] = args["location"];
        if (args["locked"] !== undefined) body["locked"] = args["locked"];
        if (args["organizer"] !== undefined) {
          body["organizer"] = args["organizer"];
        }
        if (args["originalStartTime"] !== undefined) {
          body["originalStartTime"] = args["originalStartTime"];
        }
        if (args["outOfOfficeProperties"] !== undefined) {
          body["outOfOfficeProperties"] = args["outOfOfficeProperties"];
        }
        if (args["privateCopy"] !== undefined) {
          body["privateCopy"] = args["privateCopy"];
        }
        if (args["recurrence"] !== undefined) {
          body["recurrence"] = args["recurrence"];
        }
        if (args["recurringEventId"] !== undefined) {
          body["recurringEventId"] = args["recurringEventId"];
        }
        if (args["reminders"] !== undefined) {
          body["reminders"] = args["reminders"];
        }
        if (args["sequence"] !== undefined) body["sequence"] = args["sequence"];
        if (args["source"] !== undefined) body["source"] = args["source"];
        if (args["start"] !== undefined) body["start"] = args["start"];
        if (args["status"] !== undefined) body["status"] = args["status"];
        if (args["summary"] !== undefined) body["summary"] = args["summary"];
        if (args["transparency"] !== undefined) {
          body["transparency"] = args["transparency"];
        }
        if (args["updated"] !== undefined) body["updated"] = args["updated"];
        if (args["visibility"] !== undefined) {
          body["visibility"] = args["visibility"];
        }
        if (args["workingLocationProperties"] !== undefined) {
          body["workingLocationProperties"] = args["workingLocationProperties"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "calendar.events.import",
            "path": "calendars/{calendarId}/events/import",
            "httpMethod": "POST",
            "parameterOrder": ["calendarId"],
            "parameters": {
              "calendarId": { "location": "path", "required": true },
              "conferenceDataVersion": { "location": "query" },
              "supportsAttachments": { "location": "query" },
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
    instances: {
      description: "instances",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["calendarId"] !== undefined) {
          params["calendarId"] = String(g["calendarId"]);
        }
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
        params["eventId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "calendar.events.instances",
            "path": "calendars/{calendarId}/events/{eventId}/instances",
            "httpMethod": "GET",
            "parameterOrder": ["calendarId", "eventId"],
            "parameters": {
              "alwaysIncludeEmail": { "location": "query" },
              "calendarId": { "location": "path", "required": true },
              "eventId": { "location": "path", "required": true },
              "maxAttendees": { "location": "query" },
              "maxResults": { "location": "query" },
              "originalStart": { "location": "query" },
              "pageToken": { "location": "query" },
              "showDeleted": { "location": "query" },
              "timeMax": { "location": "query" },
              "timeMin": { "location": "query" },
              "timeZone": { "location": "query" },
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
    move: {
      description: "move",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["calendarId"] !== undefined) {
          params["calendarId"] = String(g["calendarId"]);
        }
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
        params["eventId"] = existing["eventId"]?.toString() ??
          g["eventId"]?.toString() ?? "";
        params["destination"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "calendar.events.move",
            "path": "calendars/{calendarId}/events/{eventId}/move",
            "httpMethod": "POST",
            "parameterOrder": ["calendarId", "eventId", "destination"],
            "parameters": {
              "calendarId": { "location": "path", "required": true },
              "destination": { "location": "query", "required": true },
              "eventId": { "location": "path", "required": true },
              "sendNotifications": { "location": "query" },
              "sendUpdates": { "location": "query" },
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
    quick_add: {
      description: "quick add",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["calendarId"] !== undefined) {
          params["calendarId"] = String(g["calendarId"]);
        }
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
        params["text"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "calendar.events.quickAdd",
            "path": "calendars/{calendarId}/events/quickAdd",
            "httpMethod": "POST",
            "parameterOrder": ["calendarId", "text"],
            "parameters": {
              "calendarId": { "location": "path", "required": true },
              "sendNotifications": { "location": "query" },
              "sendUpdates": { "location": "query" },
              "text": { "location": "query", "required": true },
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
        if (g["calendarId"] !== undefined) {
          params["calendarId"] = String(g["calendarId"]);
        }
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
            "id": "calendar.events.watch",
            "path": "calendars/{calendarId}/events/watch",
            "httpMethod": "POST",
            "parameterOrder": ["calendarId"],
            "parameters": {
              "alwaysIncludeEmail": { "location": "query" },
              "calendarId": { "location": "path", "required": true },
              "eventTypes": { "location": "query" },
              "iCalUID": { "location": "query" },
              "maxAttendees": { "location": "query" },
              "maxResults": { "location": "query" },
              "orderBy": { "location": "query" },
              "pageToken": { "location": "query" },
              "privateExtendedProperty": { "location": "query" },
              "q": { "location": "query" },
              "sharedExtendedProperty": { "location": "query" },
              "showDeleted": { "location": "query" },
              "showHiddenInvitations": { "location": "query" },
              "singleEvents": { "location": "query" },
              "syncToken": { "location": "query" },
              "timeMax": { "location": "query" },
              "timeMin": { "location": "query" },
              "timeZone": { "location": "query" },
              "updatedMin": { "location": "query" },
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
