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

// Auto-generated extension model for @swamp/gcp/drivelabels/labels
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Drive Labels Labels.
 *
 * A label defines a taxonomy that can be applied to Drive items in order to organize and search across items. Labels can be simple strings, or can contain fields that describe additional metadata that can be further used to organize and search Drive items.
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
} from "./_lib/gcp.ts";

const BASE_URL = "https://drivelabels.googleapis.com/";

const GET_CONFIG = {
  "id": "drivelabels.labels.get",
  "path": "v2/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "languageCode": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "useAdminAccess": {
      "location": "query",
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "drivelabels.labels.create",
  "path": "v2/labels",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {
    "languageCode": {
      "location": "query",
    },
    "useAdminAccess": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "drivelabels.labels.delete",
  "path": "v2/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "useAdminAccess": {
      "location": "query",
    },
    "writeControl.requiredRevisionId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "drivelabels.labels.list",
  "path": "v2/labels",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "customer": {
      "location": "query",
    },
    "languageCode": {
      "location": "query",
    },
    "minimumRole": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "publishedOnly": {
      "location": "query",
    },
    "useAdminAccess": {
      "location": "query",
    },
    "view": {
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
  appliedCapabilities: z.object({
    canApply: z.boolean().describe(
      "Whether the user can apply this label to items.",
    ).optional(),
    canRead: z.boolean().describe(
      "Whether the user can read applied metadata related to this label.",
    ).optional(),
    canRemove: z.boolean().describe(
      "Whether the user can remove this label from items.",
    ).optional(),
  }).describe("The capabilities a user has on this label's applied metadata.")
    .optional(),
  appliedLabelPolicy: z.object({
    copyMode: z.enum([
      "COPY_MODE_UNSPECIFIED",
      "DO_NOT_COPY",
      "ALWAYS_COPY",
      "COPY_APPLIABLE",
    ]).describe(
      "Indicates how the applied label and field values should be copied when a Drive item is copied.",
    ).optional(),
  }).describe("Behavior of this label when it's applied to Drive items.")
    .optional(),
  creator: z.object({
    person: z.string().describe(
      "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
    ).optional(),
  }).describe("Information about a user.").optional(),
  disabler: z.object({
    person: z.string().describe(
      "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
    ).optional(),
  }).describe("Information about a user.").optional(),
  displayHints: z.object({
    disabled: z.boolean().describe(
      "Whether the label should be shown in the UI as disabled.",
    ).optional(),
    hiddenInSearch: z.boolean().describe(
      "This label should be hidden in the search menu when searching for Drive items.",
    ).optional(),
    priority: z.string().describe("The order to display labels in a list.")
      .optional(),
    shownInApply: z.boolean().describe(
      "This label should be shown in the apply menu when applying values to a Drive item.",
    ).optional(),
  }).describe("The UI display hints for rendering the label.").optional(),
  enabledAppSettings: z.object({
    enabledApps: z.array(z.object({
      app: z.enum(["APP_UNSPECIFIED", "DRIVE", "GMAIL"]).describe(
        "Optional. The name of the app.",
      ).optional(),
    })).describe("Optional. The list of apps where the label can be used.")
      .optional(),
  }).describe(
    "Describes the Google Workspace apps in which the label can be used.",
  ).optional(),
  fields: z.array(z.object({
    appliedCapabilities: z.object({
      canRead: z.boolean().describe(
        "Whether the user can read related applied metadata on items.",
      ).optional(),
      canSearch: z.boolean().describe(
        "Whether the user can search for Drive items referencing this field.",
      ).optional(),
      canWrite: z.boolean().describe(
        "Whether the user can set this field on Drive items.",
      ).optional(),
    }).describe("The capabilities related to this field on applied metadata.")
      .optional(),
    createTime: z.string().describe(
      "Output only. The time this field was created.",
    ).optional(),
    creator: z.object({
      person: z.string().describe(
        "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
      ).optional(),
    }).describe("Information about a user.").optional(),
    dateOptions: z.object({
      dateFormat: z.string().describe("Output only. ICU date format.")
        .optional(),
      dateFormatType: z.enum([
        "DATE_FORMAT_UNSPECIFIED",
        "LONG_DATE",
        "SHORT_DATE",
      ]).describe(
        "Localized date formatting option. Field values are rendered in this format according to their locale.",
      ).optional(),
      maxValue: z.object({
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
      minValue: z.object({
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
    }).describe("Options for the date field type.").optional(),
    disableTime: z.string().describe(
      "Output only. The time this field was disabled. This value has no meaning when the field is not disabled.",
    ).optional(),
    disabler: z.object({
      person: z.string().describe(
        "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
      ).optional(),
    }).describe("Information about a user.").optional(),
    displayHints: z.object({
      disabled: z.boolean().describe(
        "Whether the field should be shown in the UI as disabled.",
      ).optional(),
      hiddenInSearch: z.boolean().describe(
        "This field should be hidden in the search menu when searching for Drive items.",
      ).optional(),
      required: z.boolean().describe(
        "Whether the field should be shown as required in the UI.",
      ).optional(),
      shownInApply: z.boolean().describe(
        "This field should be shown in the apply menu when applying values to a Drive item.",
      ).optional(),
    }).describe("UI display hints for rendering a field.").optional(),
    id: z.string().describe(
      "Output only. The key of a field, unique within a label or library. This value is autogenerated. Matches the regex: `([a-zA-Z0-9])+`.",
    ).optional(),
    integerOptions: z.object({
      maxValue: z.string().describe(
        "Output only. The maximum valid value for the integer field.",
      ).optional(),
      minValue: z.string().describe(
        "Output only. The minimum valid value for the integer field.",
      ).optional(),
    }).describe("Options for the Integer field type.").optional(),
    lifecycle: z.object({
      disabledPolicy: z.object({
        hideInSearch: z.boolean().describe(
          "Whether to hide this disabled object in the search menu for Drive items. * When `false`, the object is generally shown in the UI as disabled but it appears in the search results when searching for Drive items. * When `true`, the object is generally hidden in the UI when searching for Drive items.",
        ).optional(),
        showInApply: z.boolean().describe(
          "Whether to show this disabled object in the apply menu on Drive items. * When `true`, the object is generally shown in the UI as disabled and is unselectable. * When `false`, the object is generally hidden in the UI.",
        ).optional(),
      }).describe(
        "The policy that governs how to treat a disabled label, field, or selection choice in different contexts.",
      ).optional(),
      hasUnpublishedChanges: z.boolean().describe(
        "Output only. Whether the object associated with this lifecycle has unpublished changes.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "UNPUBLISHED_DRAFT",
        "PUBLISHED",
        "DISABLED",
        "DELETED",
      ]).describe(
        "Output only. The state of the object associated with this lifecycle.",
      ).optional(),
    }).describe(
      "The lifecycle state of an object, such as label, field, or choice. For more information, see [Label lifecycle](https://developers.google.com/workspace/drive/labels/guides/label-lifecycle). The lifecycle enforces the following transitions: * `UNPUBLISHED_DRAFT` (starting state) * `UNPUBLISHED_DRAFT` -> `PUBLISHED` * `UNPUBLISHED_DRAFT` -> (Deleted) * `PUBLISHED` -> `DISABLED` * `DISABLED` -> `PUBLISHED` * `DISABLED` -> (Deleted) The published and disabled states have some distinct characteristics: * `Published`: Some kinds of changes might be made to an object in this state, in which case `has_unpublished_changes` will be true. Also, some kinds of changes aren't permitted. Generally, any change that would invalidate or cause new restrictions on existing metadata related to the label are rejected. * `Disabled`: When disabled, the configured `DisabledPolicy` takes effect.",
    ).optional(),
    lockStatus: z.object({
      locked: z.boolean().describe(
        "Output only. Indicates whether this label component is the (direct) target of a label lock. A label component can be implicitly locked even if it's not the direct target of a label lock, in which case this field is set to false.",
      ).optional(),
    }).describe(
      "Contains information about whether a label component should be considered locked.",
    ).optional(),
    properties: z.object({
      displayName: z.string().describe(
        "Required. The display text to show in the UI identifying this field.",
      ).optional(),
      insertBeforeField: z.string().describe(
        "Input only. Insert or move this field before the indicated field. If empty, the field is placed at the end of the list.",
      ).optional(),
      required: z.boolean().describe(
        "Whether the field should be marked as required.",
      ).optional(),
    }).describe("The basic properties of the field.").optional(),
    publisher: z.object({
      person: z.string().describe(
        "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
      ).optional(),
    }).describe("Information about a user.").optional(),
    queryKey: z.string().describe(
      'Output only. The key to use when constructing Drive search queries to find files based on values defined for this field on files. For example, "`{query_key}` > 2001-01-01".',
    ).optional(),
    schemaCapabilities: z.object({
      canDelete: z.boolean().describe(
        "Whether the user can delete this field. The user must have permission and the field must be deprecated.",
      ).optional(),
      canDisable: z.boolean().describe(
        "Whether the user can disable this field. The user must have permission and this field must not already be disabled.",
      ).optional(),
      canEnable: z.boolean().describe(
        "Whether the user can enable this field. The user must have permission and this field must be disabled.",
      ).optional(),
      canUpdate: z.boolean().describe("Whether the user can change this field.")
        .optional(),
    }).describe(
      "The capabilities related to this field when editing the field.",
    ).optional(),
    selectionOptions: z.object({
      choices: z.array(z.object({
        appliedCapabilities: z.unknown().describe(
          "The capabilities related to this choice on applied metadata.",
        ).optional(),
        createTime: z.unknown().describe(
          "Output only. The time this choice was created.",
        ).optional(),
        creator: z.unknown().describe("Information about a user.").optional(),
        disableTime: z.unknown().describe(
          "Output only. The time this choice was disabled. This value has no meaning when the choice is not disabled.",
        ).optional(),
        disabler: z.unknown().describe("Information about a user.").optional(),
        displayHints: z.unknown().describe(
          "UI display hints for rendering an option.",
        ).optional(),
        id: z.unknown().describe(
          "The unique value of the choice. This ID is autogenerated. Matches the regex: `([a-zA-Z0-9_])+`.",
        ).optional(),
        lifecycle: z.unknown().describe(
          "The lifecycle state of an object, such as label, field, or choice. For more information, see [Label lifecycle](https://developers.google.com/workspace/drive/labels/guides/label-lifecycle). The lifecycle enforces the following transitions: * `UNPUBLISHED_DRAFT` (starting state) * `UNPUBLISHED_DRAFT` -> `PUBLISHED` * `UNPUBLISHED_DRAFT` -> (Deleted) * `PUBLISHED` -> `DISABLED` * `DISABLED` -> `PUBLISHED` * `DISABLED` -> (Deleted) The published and disabled states have some distinct characteristics: * `Published`: Some kinds of changes might be made to an object in this state, in which case `has_unpublished_changes` will be true. Also, some kinds of changes aren't permitted. Generally, any change that would invalidate or cause new restrictions on existing metadata related to the label are rejected. * `Disabled`: When disabled, the configured `DisabledPolicy` takes effect.",
        ).optional(),
        lockStatus: z.unknown().describe(
          "Contains information about whether a label component should be considered locked.",
        ).optional(),
        properties: z.unknown().describe("Basic properties of the choice.")
          .optional(),
        publishTime: z.unknown().describe(
          "Output only. The time this choice was published. This value has no meaning when the choice is not published.",
        ).optional(),
        publisher: z.unknown().describe("Information about a user.").optional(),
        schemaCapabilities: z.unknown().describe(
          "The capabilities related to this choice when editing the choice.",
        ).optional(),
        updateTime: z.unknown().describe(
          "Output only. The time this choice was updated last.",
        ).optional(),
        updater: z.unknown().describe("Information about a user.").optional(),
      })).describe(
        "The options available for this selection field. The list order is consistent, and modified with `insert_before_choice`.",
      ).optional(),
      listOptions: z.object({
        maxEntries: z.number().int().describe(
          "Maximum number of entries permitted.",
        ).optional(),
      }).describe(
        "Options for a multi-valued variant of an associated field type.",
      ).optional(),
    }).describe("Options for the selection field type.").optional(),
    textOptions: z.object({
      maxLength: z.number().int().describe(
        "Output only. The maximum valid length of values for the text field.",
      ).optional(),
      minLength: z.number().int().describe(
        "Output only. The minimum valid length of values for the text field.",
      ).optional(),
    }).describe("Options for the Text field type.").optional(),
    updateTime: z.string().describe(
      "Output only. The time this field was updated.",
    ).optional(),
    updater: z.object({
      person: z.string().describe(
        "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
      ).optional(),
    }).describe("Information about a user.").optional(),
    userOptions: z.object({
      listOptions: z.object({
        maxEntries: z.number().int().describe(
          "Maximum number of entries permitted.",
        ).optional(),
      }).describe(
        "Options for a multi-valued variant of an associated field type.",
      ).optional(),
    }).describe("Options for the user field type.").optional(),
  })).describe("List of fields in descending priority order.").optional(),
  labelType: z.enum(["LABEL_TYPE_UNSPECIFIED", "SHARED", "ADMIN", "GOOGLE_APP"])
    .describe("Required. The type of label.").optional(),
  learnMoreUri: z.string().describe(
    "Custom URL to present to users to allow them to learn more about this label and how it should be used.",
  ).optional(),
  lifecycle: z.object({
    disabledPolicy: z.object({
      hideInSearch: z.boolean().describe(
        "Whether to hide this disabled object in the search menu for Drive items. * When `false`, the object is generally shown in the UI as disabled but it appears in the search results when searching for Drive items. * When `true`, the object is generally hidden in the UI when searching for Drive items.",
      ).optional(),
      showInApply: z.boolean().describe(
        "Whether to show this disabled object in the apply menu on Drive items. * When `true`, the object is generally shown in the UI as disabled and is unselectable. * When `false`, the object is generally hidden in the UI.",
      ).optional(),
    }).describe(
      "The policy that governs how to treat a disabled label, field, or selection choice in different contexts.",
    ).optional(),
    hasUnpublishedChanges: z.boolean().describe(
      "Output only. Whether the object associated with this lifecycle has unpublished changes.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "UNPUBLISHED_DRAFT",
      "PUBLISHED",
      "DISABLED",
      "DELETED",
    ]).describe(
      "Output only. The state of the object associated with this lifecycle.",
    ).optional(),
  }).describe(
    "The lifecycle state of an object, such as label, field, or choice. For more information, see [Label lifecycle](https://developers.google.com/workspace/drive/labels/guides/label-lifecycle). The lifecycle enforces the following transitions: * `UNPUBLISHED_DRAFT` (starting state) * `UNPUBLISHED_DRAFT` -> `PUBLISHED` * `UNPUBLISHED_DRAFT` -> (Deleted) * `PUBLISHED` -> `DISABLED` * `DISABLED` -> `PUBLISHED` * `DISABLED` -> (Deleted) The published and disabled states have some distinct characteristics: * `Published`: Some kinds of changes might be made to an object in this state, in which case `has_unpublished_changes` will be true. Also, some kinds of changes aren't permitted. Generally, any change that would invalidate or cause new restrictions on existing metadata related to the label are rejected. * `Disabled`: When disabled, the configured `DisabledPolicy` takes effect.",
  ).optional(),
  lockStatus: z.object({
    locked: z.boolean().describe(
      "Output only. Indicates whether this label component is the (direct) target of a label lock. A label component can be implicitly locked even if it's not the direct target of a label lock, in which case this field is set to false.",
    ).optional(),
  }).describe(
    "Contains information about whether a label component should be considered locked.",
  ).optional(),
  properties: z.object({
    description: z.string().describe("The description of the label.")
      .optional(),
    title: z.string().describe("Required. Title of the label.").optional(),
  }).describe("Basic properties of the label.").optional(),
  publisher: z.object({
    person: z.string().describe(
      "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
    ).optional(),
  }).describe("Information about a user.").optional(),
  revisionCreator: z.object({
    person: z.string().describe(
      "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
    ).optional(),
  }).describe("Information about a user.").optional(),
  schemaCapabilities: z.object({
    canDelete: z.boolean().describe(
      "Whether the user can delete this label. The user must have permission and the label must be disabled.",
    ).optional(),
    canDisable: z.boolean().describe(
      "Whether the user can disable this label. The user must have permission and this label must not already be disabled.",
    ).optional(),
    canEnable: z.boolean().describe(
      "Whether the user can enable this label. The user must have permission and this label must be disabled.",
    ).optional(),
    canUpdate: z.boolean().describe("Whether the user can change this label.")
      .optional(),
  }).describe("The capabilities related to this label when editing the label.")
    .optional(),
  languageCode: z.string().describe(
    "The BCP-47 language code to use for evaluating localized field labels in response. When not specified, values in the default configured language will be used.",
  ).optional(),
  useAdminAccess: z.string().describe(
    "Set to `true` in order to use the user's admin privileges. The server will verify the user is an admin before allowing access.",
  ).optional(),
});

const StateSchema = z.object({
  appliedCapabilities: z.object({
    canApply: z.boolean(),
    canRead: z.boolean(),
    canRemove: z.boolean(),
  }).optional(),
  appliedLabelPolicy: z.object({
    copyMode: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  creator: z.object({
    person: z.string(),
  }).optional(),
  customer: z.string().optional(),
  disableTime: z.string().optional(),
  disabler: z.object({
    person: z.string(),
  }).optional(),
  displayHints: z.object({
    disabled: z.boolean(),
    hiddenInSearch: z.boolean(),
    priority: z.string(),
    shownInApply: z.boolean(),
  }).optional(),
  enabledAppSettings: z.object({
    enabledApps: z.array(z.object({
      app: z.string(),
    })),
  }).optional(),
  fields: z.array(z.object({
    appliedCapabilities: z.object({
      canRead: z.boolean(),
      canSearch: z.boolean(),
      canWrite: z.boolean(),
    }),
    createTime: z.string(),
    creator: z.object({
      person: z.string(),
    }),
    dateOptions: z.object({
      dateFormat: z.string(),
      dateFormatType: z.string(),
      maxValue: z.object({
        day: z.number(),
        month: z.number(),
        year: z.number(),
      }),
      minValue: z.object({
        day: z.number(),
        month: z.number(),
        year: z.number(),
      }),
    }),
    disableTime: z.string(),
    disabler: z.object({
      person: z.string(),
    }),
    displayHints: z.object({
      disabled: z.boolean(),
      hiddenInSearch: z.boolean(),
      required: z.boolean(),
      shownInApply: z.boolean(),
    }),
    id: z.string(),
    integerOptions: z.object({
      maxValue: z.string(),
      minValue: z.string(),
    }),
    lifecycle: z.object({
      disabledPolicy: z.object({
        hideInSearch: z.boolean(),
        showInApply: z.boolean(),
      }),
      hasUnpublishedChanges: z.boolean(),
      state: z.string(),
    }),
    lockStatus: z.object({
      locked: z.boolean(),
    }),
    properties: z.object({
      displayName: z.string(),
      insertBeforeField: z.string(),
      required: z.boolean(),
    }),
    publisher: z.object({
      person: z.string(),
    }),
    queryKey: z.string(),
    schemaCapabilities: z.object({
      canDelete: z.boolean(),
      canDisable: z.boolean(),
      canEnable: z.boolean(),
      canUpdate: z.boolean(),
    }),
    selectionOptions: z.object({
      choices: z.array(z.object({
        appliedCapabilities: z.unknown(),
        createTime: z.unknown(),
        creator: z.unknown(),
        disableTime: z.unknown(),
        disabler: z.unknown(),
        displayHints: z.unknown(),
        id: z.unknown(),
        lifecycle: z.unknown(),
        lockStatus: z.unknown(),
        properties: z.unknown(),
        publishTime: z.unknown(),
        publisher: z.unknown(),
        schemaCapabilities: z.unknown(),
        updateTime: z.unknown(),
        updater: z.unknown(),
      })),
      listOptions: z.object({
        maxEntries: z.number(),
      }),
    }),
    textOptions: z.object({
      maxLength: z.number(),
      minLength: z.number(),
    }),
    updateTime: z.string(),
    updater: z.object({
      person: z.string(),
    }),
    userOptions: z.object({
      listOptions: z.object({
        maxEntries: z.number(),
      }),
    }),
  })).optional(),
  id: z.string().optional(),
  labelType: z.string().optional(),
  learnMoreUri: z.string().optional(),
  lifecycle: z.object({
    disabledPolicy: z.object({
      hideInSearch: z.boolean(),
      showInApply: z.boolean(),
    }),
    hasUnpublishedChanges: z.boolean(),
    state: z.string(),
  }).optional(),
  lockStatus: z.object({
    locked: z.boolean(),
  }).optional(),
  name: z.string(),
  properties: z.object({
    description: z.string(),
    title: z.string(),
  }).optional(),
  publishTime: z.string().optional(),
  publisher: z.object({
    person: z.string(),
  }).optional(),
  revisionCreateTime: z.string().optional(),
  revisionCreator: z.object({
    person: z.string(),
  }).optional(),
  revisionId: z.string().optional(),
  schemaCapabilities: z.object({
    canDelete: z.boolean(),
    canDisable: z.boolean(),
    canEnable: z.boolean(),
    canUpdate: z.boolean(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  appliedCapabilities: z.object({
    canApply: z.boolean().describe(
      "Whether the user can apply this label to items.",
    ).optional(),
    canRead: z.boolean().describe(
      "Whether the user can read applied metadata related to this label.",
    ).optional(),
    canRemove: z.boolean().describe(
      "Whether the user can remove this label from items.",
    ).optional(),
  }).describe("The capabilities a user has on this label's applied metadata.")
    .optional(),
  appliedLabelPolicy: z.object({
    copyMode: z.enum([
      "COPY_MODE_UNSPECIFIED",
      "DO_NOT_COPY",
      "ALWAYS_COPY",
      "COPY_APPLIABLE",
    ]).describe(
      "Indicates how the applied label and field values should be copied when a Drive item is copied.",
    ).optional(),
  }).describe("Behavior of this label when it's applied to Drive items.")
    .optional(),
  creator: z.object({
    person: z.string().describe(
      "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
    ).optional(),
  }).describe("Information about a user.").optional(),
  disabler: z.object({
    person: z.string().describe(
      "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
    ).optional(),
  }).describe("Information about a user.").optional(),
  displayHints: z.object({
    disabled: z.boolean().describe(
      "Whether the label should be shown in the UI as disabled.",
    ).optional(),
    hiddenInSearch: z.boolean().describe(
      "This label should be hidden in the search menu when searching for Drive items.",
    ).optional(),
    priority: z.string().describe("The order to display labels in a list.")
      .optional(),
    shownInApply: z.boolean().describe(
      "This label should be shown in the apply menu when applying values to a Drive item.",
    ).optional(),
  }).describe("The UI display hints for rendering the label.").optional(),
  enabledAppSettings: z.object({
    enabledApps: z.array(z.object({
      app: z.enum(["APP_UNSPECIFIED", "DRIVE", "GMAIL"]).describe(
        "Optional. The name of the app.",
      ).optional(),
    })).describe("Optional. The list of apps where the label can be used.")
      .optional(),
  }).describe(
    "Describes the Google Workspace apps in which the label can be used.",
  ).optional(),
  fields: z.array(z.object({
    appliedCapabilities: z.object({
      canRead: z.boolean().describe(
        "Whether the user can read related applied metadata on items.",
      ).optional(),
      canSearch: z.boolean().describe(
        "Whether the user can search for Drive items referencing this field.",
      ).optional(),
      canWrite: z.boolean().describe(
        "Whether the user can set this field on Drive items.",
      ).optional(),
    }).describe("The capabilities related to this field on applied metadata.")
      .optional(),
    createTime: z.string().describe(
      "Output only. The time this field was created.",
    ).optional(),
    creator: z.object({
      person: z.string().describe(
        "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
      ).optional(),
    }).describe("Information about a user.").optional(),
    dateOptions: z.object({
      dateFormat: z.string().describe("Output only. ICU date format.")
        .optional(),
      dateFormatType: z.enum([
        "DATE_FORMAT_UNSPECIFIED",
        "LONG_DATE",
        "SHORT_DATE",
      ]).describe(
        "Localized date formatting option. Field values are rendered in this format according to their locale.",
      ).optional(),
      maxValue: z.object({
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
      minValue: z.object({
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
    }).describe("Options for the date field type.").optional(),
    disableTime: z.string().describe(
      "Output only. The time this field was disabled. This value has no meaning when the field is not disabled.",
    ).optional(),
    disabler: z.object({
      person: z.string().describe(
        "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
      ).optional(),
    }).describe("Information about a user.").optional(),
    displayHints: z.object({
      disabled: z.boolean().describe(
        "Whether the field should be shown in the UI as disabled.",
      ).optional(),
      hiddenInSearch: z.boolean().describe(
        "This field should be hidden in the search menu when searching for Drive items.",
      ).optional(),
      required: z.boolean().describe(
        "Whether the field should be shown as required in the UI.",
      ).optional(),
      shownInApply: z.boolean().describe(
        "This field should be shown in the apply menu when applying values to a Drive item.",
      ).optional(),
    }).describe("UI display hints for rendering a field.").optional(),
    id: z.string().describe(
      "Output only. The key of a field, unique within a label or library. This value is autogenerated. Matches the regex: `([a-zA-Z0-9])+`.",
    ).optional(),
    integerOptions: z.object({
      maxValue: z.string().describe(
        "Output only. The maximum valid value for the integer field.",
      ).optional(),
      minValue: z.string().describe(
        "Output only. The minimum valid value for the integer field.",
      ).optional(),
    }).describe("Options for the Integer field type.").optional(),
    lifecycle: z.object({
      disabledPolicy: z.object({
        hideInSearch: z.boolean().describe(
          "Whether to hide this disabled object in the search menu for Drive items. * When `false`, the object is generally shown in the UI as disabled but it appears in the search results when searching for Drive items. * When `true`, the object is generally hidden in the UI when searching for Drive items.",
        ).optional(),
        showInApply: z.boolean().describe(
          "Whether to show this disabled object in the apply menu on Drive items. * When `true`, the object is generally shown in the UI as disabled and is unselectable. * When `false`, the object is generally hidden in the UI.",
        ).optional(),
      }).describe(
        "The policy that governs how to treat a disabled label, field, or selection choice in different contexts.",
      ).optional(),
      hasUnpublishedChanges: z.boolean().describe(
        "Output only. Whether the object associated with this lifecycle has unpublished changes.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "UNPUBLISHED_DRAFT",
        "PUBLISHED",
        "DISABLED",
        "DELETED",
      ]).describe(
        "Output only. The state of the object associated with this lifecycle.",
      ).optional(),
    }).describe(
      "The lifecycle state of an object, such as label, field, or choice. For more information, see [Label lifecycle](https://developers.google.com/workspace/drive/labels/guides/label-lifecycle). The lifecycle enforces the following transitions: * `UNPUBLISHED_DRAFT` (starting state) * `UNPUBLISHED_DRAFT` -> `PUBLISHED` * `UNPUBLISHED_DRAFT` -> (Deleted) * `PUBLISHED` -> `DISABLED` * `DISABLED` -> `PUBLISHED` * `DISABLED` -> (Deleted) The published and disabled states have some distinct characteristics: * `Published`: Some kinds of changes might be made to an object in this state, in which case `has_unpublished_changes` will be true. Also, some kinds of changes aren't permitted. Generally, any change that would invalidate or cause new restrictions on existing metadata related to the label are rejected. * `Disabled`: When disabled, the configured `DisabledPolicy` takes effect.",
    ).optional(),
    lockStatus: z.object({
      locked: z.boolean().describe(
        "Output only. Indicates whether this label component is the (direct) target of a label lock. A label component can be implicitly locked even if it's not the direct target of a label lock, in which case this field is set to false.",
      ).optional(),
    }).describe(
      "Contains information about whether a label component should be considered locked.",
    ).optional(),
    properties: z.object({
      displayName: z.string().describe(
        "Required. The display text to show in the UI identifying this field.",
      ).optional(),
      insertBeforeField: z.string().describe(
        "Input only. Insert or move this field before the indicated field. If empty, the field is placed at the end of the list.",
      ).optional(),
      required: z.boolean().describe(
        "Whether the field should be marked as required.",
      ).optional(),
    }).describe("The basic properties of the field.").optional(),
    publisher: z.object({
      person: z.string().describe(
        "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
      ).optional(),
    }).describe("Information about a user.").optional(),
    queryKey: z.string().describe(
      'Output only. The key to use when constructing Drive search queries to find files based on values defined for this field on files. For example, "`{query_key}` > 2001-01-01".',
    ).optional(),
    schemaCapabilities: z.object({
      canDelete: z.boolean().describe(
        "Whether the user can delete this field. The user must have permission and the field must be deprecated.",
      ).optional(),
      canDisable: z.boolean().describe(
        "Whether the user can disable this field. The user must have permission and this field must not already be disabled.",
      ).optional(),
      canEnable: z.boolean().describe(
        "Whether the user can enable this field. The user must have permission and this field must be disabled.",
      ).optional(),
      canUpdate: z.boolean().describe("Whether the user can change this field.")
        .optional(),
    }).describe(
      "The capabilities related to this field when editing the field.",
    ).optional(),
    selectionOptions: z.object({
      choices: z.array(z.object({
        appliedCapabilities: z.unknown().describe(
          "The capabilities related to this choice on applied metadata.",
        ).optional(),
        createTime: z.unknown().describe(
          "Output only. The time this choice was created.",
        ).optional(),
        creator: z.unknown().describe("Information about a user.").optional(),
        disableTime: z.unknown().describe(
          "Output only. The time this choice was disabled. This value has no meaning when the choice is not disabled.",
        ).optional(),
        disabler: z.unknown().describe("Information about a user.").optional(),
        displayHints: z.unknown().describe(
          "UI display hints for rendering an option.",
        ).optional(),
        id: z.unknown().describe(
          "The unique value of the choice. This ID is autogenerated. Matches the regex: `([a-zA-Z0-9_])+`.",
        ).optional(),
        lifecycle: z.unknown().describe(
          "The lifecycle state of an object, such as label, field, or choice. For more information, see [Label lifecycle](https://developers.google.com/workspace/drive/labels/guides/label-lifecycle). The lifecycle enforces the following transitions: * `UNPUBLISHED_DRAFT` (starting state) * `UNPUBLISHED_DRAFT` -> `PUBLISHED` * `UNPUBLISHED_DRAFT` -> (Deleted) * `PUBLISHED` -> `DISABLED` * `DISABLED` -> `PUBLISHED` * `DISABLED` -> (Deleted) The published and disabled states have some distinct characteristics: * `Published`: Some kinds of changes might be made to an object in this state, in which case `has_unpublished_changes` will be true. Also, some kinds of changes aren't permitted. Generally, any change that would invalidate or cause new restrictions on existing metadata related to the label are rejected. * `Disabled`: When disabled, the configured `DisabledPolicy` takes effect.",
        ).optional(),
        lockStatus: z.unknown().describe(
          "Contains information about whether a label component should be considered locked.",
        ).optional(),
        properties: z.unknown().describe("Basic properties of the choice.")
          .optional(),
        publishTime: z.unknown().describe(
          "Output only. The time this choice was published. This value has no meaning when the choice is not published.",
        ).optional(),
        publisher: z.unknown().describe("Information about a user.").optional(),
        schemaCapabilities: z.unknown().describe(
          "The capabilities related to this choice when editing the choice.",
        ).optional(),
        updateTime: z.unknown().describe(
          "Output only. The time this choice was updated last.",
        ).optional(),
        updater: z.unknown().describe("Information about a user.").optional(),
      })).describe(
        "The options available for this selection field. The list order is consistent, and modified with `insert_before_choice`.",
      ).optional(),
      listOptions: z.object({
        maxEntries: z.number().int().describe(
          "Maximum number of entries permitted.",
        ).optional(),
      }).describe(
        "Options for a multi-valued variant of an associated field type.",
      ).optional(),
    }).describe("Options for the selection field type.").optional(),
    textOptions: z.object({
      maxLength: z.number().int().describe(
        "Output only. The maximum valid length of values for the text field.",
      ).optional(),
      minLength: z.number().int().describe(
        "Output only. The minimum valid length of values for the text field.",
      ).optional(),
    }).describe("Options for the Text field type.").optional(),
    updateTime: z.string().describe(
      "Output only. The time this field was updated.",
    ).optional(),
    updater: z.object({
      person: z.string().describe(
        "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
      ).optional(),
    }).describe("Information about a user.").optional(),
    userOptions: z.object({
      listOptions: z.object({
        maxEntries: z.number().int().describe(
          "Maximum number of entries permitted.",
        ).optional(),
      }).describe(
        "Options for a multi-valued variant of an associated field type.",
      ).optional(),
    }).describe("Options for the user field type.").optional(),
  })).describe("List of fields in descending priority order.").optional(),
  labelType: z.enum(["LABEL_TYPE_UNSPECIFIED", "SHARED", "ADMIN", "GOOGLE_APP"])
    .describe("Required. The type of label.").optional(),
  learnMoreUri: z.string().describe(
    "Custom URL to present to users to allow them to learn more about this label and how it should be used.",
  ).optional(),
  lifecycle: z.object({
    disabledPolicy: z.object({
      hideInSearch: z.boolean().describe(
        "Whether to hide this disabled object in the search menu for Drive items. * When `false`, the object is generally shown in the UI as disabled but it appears in the search results when searching for Drive items. * When `true`, the object is generally hidden in the UI when searching for Drive items.",
      ).optional(),
      showInApply: z.boolean().describe(
        "Whether to show this disabled object in the apply menu on Drive items. * When `true`, the object is generally shown in the UI as disabled and is unselectable. * When `false`, the object is generally hidden in the UI.",
      ).optional(),
    }).describe(
      "The policy that governs how to treat a disabled label, field, or selection choice in different contexts.",
    ).optional(),
    hasUnpublishedChanges: z.boolean().describe(
      "Output only. Whether the object associated with this lifecycle has unpublished changes.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "UNPUBLISHED_DRAFT",
      "PUBLISHED",
      "DISABLED",
      "DELETED",
    ]).describe(
      "Output only. The state of the object associated with this lifecycle.",
    ).optional(),
  }).describe(
    "The lifecycle state of an object, such as label, field, or choice. For more information, see [Label lifecycle](https://developers.google.com/workspace/drive/labels/guides/label-lifecycle). The lifecycle enforces the following transitions: * `UNPUBLISHED_DRAFT` (starting state) * `UNPUBLISHED_DRAFT` -> `PUBLISHED` * `UNPUBLISHED_DRAFT` -> (Deleted) * `PUBLISHED` -> `DISABLED` * `DISABLED` -> `PUBLISHED` * `DISABLED` -> (Deleted) The published and disabled states have some distinct characteristics: * `Published`: Some kinds of changes might be made to an object in this state, in which case `has_unpublished_changes` will be true. Also, some kinds of changes aren't permitted. Generally, any change that would invalidate or cause new restrictions on existing metadata related to the label are rejected. * `Disabled`: When disabled, the configured `DisabledPolicy` takes effect.",
  ).optional(),
  lockStatus: z.object({
    locked: z.boolean().describe(
      "Output only. Indicates whether this label component is the (direct) target of a label lock. A label component can be implicitly locked even if it's not the direct target of a label lock, in which case this field is set to false.",
    ).optional(),
  }).describe(
    "Contains information about whether a label component should be considered locked.",
  ).optional(),
  properties: z.object({
    description: z.string().describe("The description of the label.")
      .optional(),
    title: z.string().describe("Required. Title of the label.").optional(),
  }).describe("Basic properties of the label.").optional(),
  publisher: z.object({
    person: z.string().describe(
      "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
    ).optional(),
  }).describe("Information about a user.").optional(),
  revisionCreator: z.object({
    person: z.string().describe(
      "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
    ).optional(),
  }).describe("Information about a user.").optional(),
  schemaCapabilities: z.object({
    canDelete: z.boolean().describe(
      "Whether the user can delete this label. The user must have permission and the label must be disabled.",
    ).optional(),
    canDisable: z.boolean().describe(
      "Whether the user can disable this label. The user must have permission and this label must not already be disabled.",
    ).optional(),
    canEnable: z.boolean().describe(
      "Whether the user can enable this label. The user must have permission and this label must be disabled.",
    ).optional(),
    canUpdate: z.boolean().describe("Whether the user can change this label.")
      .optional(),
  }).describe("The capabilities related to this label when editing the label.")
    .optional(),
  languageCode: z.string().describe(
    "The BCP-47 language code to use for evaluating localized field labels in response. When not specified, values in the default configured language will be used.",
  ).optional(),
  useAdminAccess: z.string().describe(
    "Set to `true` in order to use the user's admin privileges. The server will verify the user is an admin before allowing access.",
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

/** Swamp extension model for Google Cloud Drive Labels Labels. Registered at `@swamp/gcp/drivelabels/labels`. */
export const model = {
  type: "@swamp/gcp/drivelabels/labels",
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
      toVersion: "2026.05.25.2",
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
        "A label defines a taxonomy that can be applied to Drive items in order to org...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a labels",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["appliedCapabilities"] !== undefined) {
          body["appliedCapabilities"] = g["appliedCapabilities"];
        }
        if (g["appliedLabelPolicy"] !== undefined) {
          body["appliedLabelPolicy"] = g["appliedLabelPolicy"];
        }
        if (g["creator"] !== undefined) body["creator"] = g["creator"];
        if (g["disabler"] !== undefined) body["disabler"] = g["disabler"];
        if (g["displayHints"] !== undefined) {
          body["displayHints"] = g["displayHints"];
        }
        if (g["enabledAppSettings"] !== undefined) {
          body["enabledAppSettings"] = g["enabledAppSettings"];
        }
        if (g["fields"] !== undefined) body["fields"] = g["fields"];
        if (g["labelType"] !== undefined) body["labelType"] = g["labelType"];
        if (g["learnMoreUri"] !== undefined) {
          body["learnMoreUri"] = g["learnMoreUri"];
        }
        if (g["lifecycle"] !== undefined) body["lifecycle"] = g["lifecycle"];
        if (g["lockStatus"] !== undefined) body["lockStatus"] = g["lockStatus"];
        if (g["properties"] !== undefined) body["properties"] = g["properties"];
        if (g["publisher"] !== undefined) body["publisher"] = g["publisher"];
        if (g["revisionCreator"] !== undefined) {
          body["revisionCreator"] = g["revisionCreator"];
        }
        if (g["schemaCapabilities"] !== undefined) {
          body["schemaCapabilities"] = g["schemaCapabilities"];
        }
        if (g["languageCode"] !== undefined) {
          body["languageCode"] = g["languageCode"];
        }
        if (g["useAdminAccess"] !== undefined) {
          body["useAdminAccess"] = g["useAdminAccess"];
        }
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
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
      description: "Get a labels",
      arguments: z.object({
        identifier: z.string().describe("The name of the labels"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
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
    delete: {
      description: "Delete the labels",
      arguments: z.object({
        identifier: z.string().describe("The name of the labels"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
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
      description: "Sync labels state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["name"] = identifier;
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
      description: "List labels resources",
      arguments: z.object({
        customer: z.string().describe(
          "The customer to scope this list request to. For example: `customers/abcd1234`. If unset, will return all labels within the current customer.",
        ).optional(),
        languageCode: z.string().describe(
          "The BCP-47 language code to use for evaluating localized field labels. When not specified, values in the default configured language are used.",
        ).optional(),
        minimumRole: z.string().describe(
          "Specifies the level of access the user must have on the returned labels. The minimum role a user must have on a label. Defaults to `READER`.",
        ).optional(),
        pageSize: z.number().describe(
          "Maximum number of labels to return per page. Default: 50. Max: 200.",
        ).optional(),
        publishedOnly: z.boolean().describe(
          "Whether to include only published labels in the results. * When `true`, only the current published label revisions are returned. Disabled labels are included. Returned label resource names reference the published revision (`labels/{id}/{revision_id}`). * When `false`, the current label revisions are returned, which might not be published. Returned label resource names don't reference a specific revision (`labels/{id}`).",
        ).optional(),
        useAdminAccess: z.boolean().describe(
          "Set to `true` in order to use the user's admin credentials. This will return all labels within the customer.",
        ).optional(),
        view: z.string().describe(
          "When specified, only certain fields belonging to the indicated view are returned.",
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
        if (args["customer"] !== undefined) {
          params["customer"] = String(args["customer"]);
        }
        if (args["languageCode"] !== undefined) {
          params["languageCode"] = String(args["languageCode"]);
        }
        if (args["minimumRole"] !== undefined) {
          params["minimumRole"] = String(args["minimumRole"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["publishedOnly"] !== undefined) {
          params["publishedOnly"] = String(args["publishedOnly"]);
        }
        if (args["useAdminAccess"] !== undefined) {
          params["useAdminAccess"] = String(args["useAdminAccess"]);
        }
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "labels",
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
    delta: {
      description: "delta",
      arguments: z.object({
        languageCode: z.any().optional(),
        requests: z.any().optional(),
        useAdminAccess: z.any().optional(),
        view: z.any().optional(),
        writeControl: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["languageCode"] !== undefined) {
          body["languageCode"] = args["languageCode"];
        }
        if (args["requests"] !== undefined) body["requests"] = args["requests"];
        if (args["useAdminAccess"] !== undefined) {
          body["useAdminAccess"] = args["useAdminAccess"];
        }
        if (args["view"] !== undefined) body["view"] = args["view"];
        if (args["writeControl"] !== undefined) {
          body["writeControl"] = args["writeControl"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "drivelabels.labels.delta",
            "path": "v2/{+name}:delta",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    disable: {
      description: "disable",
      arguments: z.object({
        disabledPolicy: z.any().optional(),
        languageCode: z.any().optional(),
        updateMask: z.any().optional(),
        useAdminAccess: z.any().optional(),
        writeControl: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["disabledPolicy"] !== undefined) {
          body["disabledPolicy"] = args["disabledPolicy"];
        }
        if (args["languageCode"] !== undefined) {
          body["languageCode"] = args["languageCode"];
        }
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        if (args["useAdminAccess"] !== undefined) {
          body["useAdminAccess"] = args["useAdminAccess"];
        }
        if (args["writeControl"] !== undefined) {
          body["writeControl"] = args["writeControl"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "drivelabels.labels.disable",
            "path": "v2/{+name}:disable",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    enable: {
      description: "enable",
      arguments: z.object({
        languageCode: z.any().optional(),
        useAdminAccess: z.any().optional(),
        writeControl: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["languageCode"] !== undefined) {
          body["languageCode"] = args["languageCode"];
        }
        if (args["useAdminAccess"] !== undefined) {
          body["useAdminAccess"] = args["useAdminAccess"];
        }
        if (args["writeControl"] !== undefined) {
          body["writeControl"] = args["writeControl"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "drivelabels.labels.enable",
            "path": "v2/{+name}:enable",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    publish: {
      description: "publish",
      arguments: z.object({
        languageCode: z.any().optional(),
        useAdminAccess: z.any().optional(),
        writeControl: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["languageCode"] !== undefined) {
          body["languageCode"] = args["languageCode"];
        }
        if (args["useAdminAccess"] !== undefined) {
          body["useAdminAccess"] = args["useAdminAccess"];
        }
        if (args["writeControl"] !== undefined) {
          body["writeControl"] = args["writeControl"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "drivelabels.labels.publish",
            "path": "v2/{+name}:publish",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    update_label_copy_mode: {
      description: "update label copy mode",
      arguments: z.object({
        copyMode: z.any().optional(),
        languageCode: z.any().optional(),
        useAdminAccess: z.any().optional(),
        view: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["copyMode"] !== undefined) body["copyMode"] = args["copyMode"];
        if (args["languageCode"] !== undefined) {
          body["languageCode"] = args["languageCode"];
        }
        if (args["useAdminAccess"] !== undefined) {
          body["useAdminAccess"] = args["useAdminAccess"];
        }
        if (args["view"] !== undefined) body["view"] = args["view"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "drivelabels.labels.updateLabelCopyMode",
            "path": "v2/{+name}:updateLabelCopyMode",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    update_label_enabled_app_settings: {
      description: "update label enabled app settings",
      arguments: z.object({
        enabledAppSettings: z.any().optional(),
        languageCode: z.any().optional(),
        useAdminAccess: z.any().optional(),
        view: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["enabledAppSettings"] !== undefined) {
          body["enabledAppSettings"] = args["enabledAppSettings"];
        }
        if (args["languageCode"] !== undefined) {
          body["languageCode"] = args["languageCode"];
        }
        if (args["useAdminAccess"] !== undefined) {
          body["useAdminAccess"] = args["useAdminAccess"];
        }
        if (args["view"] !== undefined) body["view"] = args["view"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "drivelabels.labels.updateLabelEnabledAppSettings",
            "path": "v2/{+name}:updateLabelEnabledAppSettings",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    update_permissions: {
      description: "update permissions",
      arguments: z.object({
        audience: z.any().optional(),
        email: z.any().optional(),
        group: z.any().optional(),
        name: z.any().optional(),
        person: z.any().optional(),
        role: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["audience"] !== undefined) body["audience"] = args["audience"];
        if (args["email"] !== undefined) body["email"] = args["email"];
        if (args["group"] !== undefined) body["group"] = args["group"];
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["person"] !== undefined) body["person"] = args["person"];
        if (args["role"] !== undefined) body["role"] = args["role"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "drivelabels.labels.updatePermissions",
            "path": "v2/{+parent}/permissions",
            "httpMethod": "PATCH",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
              "useAdminAccess": { "location": "query" },
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
