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

// Auto-generated extension model for @swamp/gcp/sheets/spreadsheets
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Sheets Spreadsheets.
 *
 * Resource that represents a spreadsheet.
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
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://sheets.googleapis.com/";

const GET_CONFIG = {
  "id": "sheets.spreadsheets.get",
  "path": "v4/spreadsheets/{spreadsheetId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "spreadsheetId",
  ],
  "parameters": {
    "commentsViewMode": {
      "location": "query",
    },
    "excludeTablesInBandedRanges": {
      "location": "query",
    },
    "includeGridData": {
      "location": "query",
    },
    "ranges": {
      "location": "query",
    },
    "spreadsheetId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "sheets.spreadsheets.create",
  "path": "v4/spreadsheets",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const _defaultOAuthScopes: string[] = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/spreadsheets.readonly",
];

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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  comments: z.array(z.object({
    anchorId: z.string().describe(
      "The ID of the CommentAnchor in the sheet that this thread is tied to.",
    ).optional(),
    commentId: z.string().describe("The unique ID of the comment thread.")
      .optional(),
    headPost: z.object({
      assigneeEmail: z.string().describe(
        "Optional. The email of the user who is being newly assigned to the thread as part of this post. Returns a 400 bad request error if: - The parent thread is a CommentThread whose headPost does not have an assignee. - commentAction is specified as `RESOLVE` or `REOPEN`. - `assignee_email` exceeds 2048 UTF-8 code units.",
      ).optional(),
      author: z.object({
        anonymous: z.boolean().describe("Whether the user is anonymous.")
          .optional(),
        displayName: z.string().describe(
          "The display name of the user. May be absent if the author is anonymous.",
        ).optional(),
        me: z.boolean().describe(
          "Whether the user is the authenticated user making the request.",
        ).optional(),
        user: z.string().describe(
          "The resource name of the post author user, which can also be used to identify the user in the [Google People API](https://developers.google.com/people/api/rest/v1/people). Format: `users/{user}`. Will not be populated if the anonymous field is `true` or if the post is from an imported spreadsheet.",
        ).optional(),
      }).describe("Output only. The user who created the post.").optional(),
      commentAction: z.enum([
        "COMMENT_ACTION_TYPE_UNSPECIFIED",
        "NO_COMMENT_ACTION_CHANGE",
        "RESOLVE",
        "REOPEN",
      ]).describe("Action taken as part of creating the post.").optional(),
      content: z.string().describe(
        "The content of the post. Required to be non-empty if comment_action is not `RESOLVE` or `REOPEN`. This text content will be handled similarly to comments created in the Sheets editor. It will have similar behaviors for formatting, notifications, etc. May not exceed 2048 UTF-8 code units.",
      ).optional(),
      contentHtml: z.string().describe(
        "Output only. The content of the post as HTML.",
      ).optional(),
      createTime: z.string().describe(
        "Output only. The time the post was created.",
      ).optional(),
      deleted: z.boolean().describe(
        "Output only. Whether the post is deleted. If `true`, content and author fields will be empty.",
      ).optional(),
      fromCopiedSpreadsheet: z.boolean().describe(
        "Output only. Whether the post is from a copied spreadsheet. This field cannot be set directly by callers.",
      ).optional(),
      fromImportedSpreadsheet: z.boolean().describe(
        "Output only. Whether the post is from an imported spreadsheet. This field cannot be set directly by callers.",
      ).optional(),
      postId: z.string().describe("Output only. The unique ID of the post.")
        .optional(),
      updateTime: z.string().describe(
        "Output only. The time the post was last updated.",
      ).optional(),
    }).describe("The first post in the thread.").optional(),
    plainTextQuote: z.string().describe(
      "The quoted text from the spreadsheet when the comment was created, formatted as plain-text.",
    ).optional(),
    replies: z.array(z.object({
      assigneeEmail: z.string().describe(
        "Optional. The email of the user who is being newly assigned to the thread as part of this post. Returns a 400 bad request error if: - The parent thread is a CommentThread whose headPost does not have an assignee. - commentAction is specified as `RESOLVE` or `REOPEN`. - `assignee_email` exceeds 2048 UTF-8 code units.",
      ).optional(),
      author: z.object({
        anonymous: z.unknown().describe("Whether the user is anonymous.")
          .optional(),
        displayName: z.unknown().describe(
          "The display name of the user. May be absent if the author is anonymous.",
        ).optional(),
        me: z.unknown().describe(
          "Whether the user is the authenticated user making the request.",
        ).optional(),
        user: z.unknown().describe(
          "The resource name of the post author user, which can also be used to identify the user in the [Google People API](https://developers.google.com/people/api/rest/v1/people). Format: `users/{user}`. Will not be populated if the anonymous field is `true` or if the post is from an imported spreadsheet.",
        ).optional(),
      }).describe("Output only. The user who created the post.").optional(),
      commentAction: z.enum([
        "COMMENT_ACTION_TYPE_UNSPECIFIED",
        "NO_COMMENT_ACTION_CHANGE",
        "RESOLVE",
        "REOPEN",
      ]).describe("Action taken as part of creating the post.").optional(),
      content: z.string().describe(
        "The content of the post. Required to be non-empty if comment_action is not `RESOLVE` or `REOPEN`. This text content will be handled similarly to comments created in the Sheets editor. It will have similar behaviors for formatting, notifications, etc. May not exceed 2048 UTF-8 code units.",
      ).optional(),
      contentHtml: z.string().describe(
        "Output only. The content of the post as HTML.",
      ).optional(),
      createTime: z.string().describe(
        "Output only. The time the post was created.",
      ).optional(),
      deleted: z.boolean().describe(
        "Output only. Whether the post is deleted. If `true`, content and author fields will be empty.",
      ).optional(),
      fromCopiedSpreadsheet: z.boolean().describe(
        "Output only. Whether the post is from a copied spreadsheet. This field cannot be set directly by callers.",
      ).optional(),
      fromImportedSpreadsheet: z.boolean().describe(
        "Output only. Whether the post is from an imported spreadsheet. This field cannot be set directly by callers.",
      ).optional(),
      postId: z.string().describe("Output only. The unique ID of the post.")
        .optional(),
      updateTime: z.string().describe(
        "Output only. The time the post was last updated.",
      ).optional(),
    })).describe("Replies to the head post.").optional(),
    status: z.enum(["STATUS_UNSPECIFIED", "OPEN", "RESOLVED"]).describe(
      "Whether the thread is open or resolved.",
    ).optional(),
  })).describe(
    "The comment threads associated with the spreadsheet. [Developer Preview](https://developers.google.com/workspace/preview).",
  ).optional(),
  dataSources: z.array(z.object({
    calculatedColumns: z.array(z.object({
      formula: z.string().describe("The formula of the calculated column.")
        .optional(),
      reference: z.object({
        name: z.unknown().describe(
          "The display name of the column. It should be unique within a data source.",
        ).optional(),
      }).describe("The column reference.").optional(),
    })).describe("All calculated columns in the data source.").optional(),
    dataSourceId: z.string().describe(
      "The spreadsheet-scoped unique ID that identifies the data source. Example: 1080547365.",
    ).optional(),
    sheetId: z.number().int().describe(
      "The ID of the Sheet connected with the data source. The field cannot be changed once set. When creating a data source, an associated DATA_SOURCE sheet is also created, if the field is not specified, the ID of the created sheet will be randomly generated.",
    ).optional(),
    spec: z.object({
      bigQuery: z.object({
        projectId: z.string().describe(
          "The ID of a BigQuery enabled Google Cloud project with a billing account attached. For any queries executed against the data source, the project is charged.",
        ).optional(),
        querySpec: z.object({
          rawQuery: z.unknown().describe("The raw query string.").optional(),
        }).describe("A BigQueryQuerySpec.").optional(),
        tableSpec: z.object({
          datasetId: z.unknown().describe("The BigQuery dataset id.")
            .optional(),
          tableId: z.unknown().describe("The BigQuery table id.").optional(),
          tableProjectId: z.unknown().describe(
            "The ID of a BigQuery project the table belongs to. If not specified, the project_id is assumed.",
          ).optional(),
        }).describe("A BigQueryTableSpec.").optional(),
      }).describe("A BigQueryDataSourceSpec.").optional(),
      looker: z.object({
        explore: z.string().describe("Name of a Looker model explore.")
          .optional(),
        instanceUri: z.string().describe("A Looker instance URL.").optional(),
        model: z.string().describe("Name of a Looker model.").optional(),
      }).describe("A LookerDatasourceSpec.").optional(),
      parameters: z.array(z.object({
        name: z.unknown().describe(
          "Named parameter. Must be a legitimate identifier for the DataSource that supports it. For example, [BigQuery identifier](https://cloud.google.com/bigquery/docs/reference/standard-sql/lexical#identifiers).",
        ).optional(),
        namedRangeId: z.unknown().describe(
          "ID of a NamedRange. Its size must be 1x1.",
        ).optional(),
        range: z.unknown().describe(
          "A range that contains the value of the parameter. Its size must be 1x1.",
        ).optional(),
      })).describe(
        "The parameters of the data source, used when querying the data source.",
      ).optional(),
    }).describe(
      "The DataSourceSpec for the data source connected with this spreadsheet.",
    ).optional(),
  })).describe(
    "A list of external data sources connected with the spreadsheet.",
  ).optional(),
  developerMetadata: z.array(z.object({
    location: z.object({
      dimensionRange: z.object({
        dimension: z.enum(["DIMENSION_UNSPECIFIED", "ROWS", "COLUMNS"])
          .describe("The dimension of the span.").optional(),
        endIndex: z.number().int().describe(
          "The end (exclusive) of the span, or not set if unbounded.",
        ).optional(),
        sheetId: z.number().int().describe("The sheet this span is on.")
          .optional(),
        startIndex: z.number().int().describe(
          "The start (inclusive) of the span, or not set if unbounded.",
        ).optional(),
      }).describe(
        "Represents the row or column when metadata is associated with a dimension. The specified DimensionRange must represent a single row or column. It cannot be unbounded or span multiple rows or columns.",
      ).optional(),
      locationType: z.enum([
        "DEVELOPER_METADATA_LOCATION_TYPE_UNSPECIFIED",
        "ROW",
        "COLUMN",
        "SHEET",
        "SPREADSHEET",
      ]).describe(
        "The type of location this object represents. This field is read-only.",
      ).optional(),
      sheetId: z.number().int().describe(
        "The ID of the sheet when metadata is associated with an entire sheet.",
      ).optional(),
      spreadsheet: z.boolean().describe(
        "True when metadata is associated with an entire spreadsheet.",
      ).optional(),
    }).describe("The location where the metadata is associated.").optional(),
    metadataId: z.number().int().describe(
      "The spreadsheet-scoped unique ID that identifies the metadata. IDs may be specified when metadata is created, otherwise one will be randomly generated and assigned. Must be positive.",
    ).optional(),
    metadataKey: z.string().describe(
      "The metadata key. There may be multiple metadata in a spreadsheet with the same key. Developer metadata must always have a key specified.",
    ).optional(),
    metadataValue: z.string().describe(
      "Data associated with the metadata's key.",
    ).optional(),
    visibility: z.enum([
      "DEVELOPER_METADATA_VISIBILITY_UNSPECIFIED",
      "DOCUMENT",
      "PROJECT",
    ]).describe(
      "The metadata visibility. Developer metadata must always have visibility specified.",
    ).optional(),
  })).describe("The developer metadata associated with a spreadsheet.")
    .optional(),
  namedRanges: z.array(z.object({
    name: z.string().describe("The name of the named range.").optional(),
    namedRangeId: z.string().describe("The ID of the named range.").optional(),
    range: z.object({
      endColumnIndex: z.number().int().describe(
        "The end column (exclusive) of the range, or not set if unbounded.",
      ).optional(),
      endRowIndex: z.number().int().describe(
        "The end row (exclusive) of the range, or not set if unbounded.",
      ).optional(),
      sheetId: z.number().int().describe("The sheet this range is on.")
        .optional(),
      startColumnIndex: z.number().int().describe(
        "The start column (inclusive) of the range, or not set if unbounded.",
      ).optional(),
      startRowIndex: z.number().int().describe(
        "The start row (inclusive) of the range, or not set if unbounded.",
      ).optional(),
    }).describe("The range this represents.").optional(),
  })).describe("The named ranges defined in a spreadsheet.").optional(),
  properties: z.object({
    autoRecalc: z.enum([
      "RECALCULATION_INTERVAL_UNSPECIFIED",
      "ON_CHANGE",
      "MINUTE",
      "HOUR",
    ]).describe(
      "The amount of time to wait before volatile functions are recalculated.",
    ).optional(),
    defaultFormat: z.object({
      backgroundColor: z.object({
        alpha: z.number().describe(
          "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
        ).optional(),
        blue: z.number().describe(
          "The amount of blue in the color as a value in the interval [0, 1].",
        ).optional(),
        green: z.number().describe(
          "The amount of green in the color as a value in the interval [0, 1].",
        ).optional(),
        red: z.number().describe(
          "The amount of red in the color as a value in the interval [0, 1].",
        ).optional(),
      }).describe(
        "The background color of the cell. Deprecated: Use background_color_style.",
      ).optional(),
      backgroundColorStyle: z.object({
        rgbColor: z.object({
          alpha: z.number().describe(
            "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
          ).optional(),
          blue: z.number().describe(
            "The amount of blue in the color as a value in the interval [0, 1].",
          ).optional(),
          green: z.number().describe(
            "The amount of green in the color as a value in the interval [0, 1].",
          ).optional(),
          red: z.number().describe(
            "The amount of red in the color as a value in the interval [0, 1].",
          ).optional(),
        }).describe(
          "RGB color. The [`alpha`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#Color.FIELDS.alpha) value in the [`Color`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#color) object isn't generally supported.",
        ).optional(),
        themeColor: z.enum([
          "THEME_COLOR_TYPE_UNSPECIFIED",
          "TEXT",
          "BACKGROUND",
          "ACCENT1",
          "ACCENT2",
          "ACCENT3",
          "ACCENT4",
          "ACCENT5",
          "ACCENT6",
          "LINK",
        ]).describe("Theme color.").optional(),
      }).describe(
        "The background color of the cell. If background_color is also set, this field takes precedence.",
      ).optional(),
      borders: z.object({
        bottom: z.object({
          color: z.object({
            alpha: z.unknown().describe(
              "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
            ).optional(),
            blue: z.unknown().describe(
              "The amount of blue in the color as a value in the interval [0, 1].",
            ).optional(),
            green: z.unknown().describe(
              "The amount of green in the color as a value in the interval [0, 1].",
            ).optional(),
            red: z.unknown().describe(
              "The amount of red in the color as a value in the interval [0, 1].",
            ).optional(),
          }).describe("The color of the border. Deprecated: Use color_style.")
            .optional(),
          colorStyle: z.object({
            rgbColor: z.unknown().describe(
              "RGB color. The [`alpha`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#Color.FIELDS.alpha) value in the [`Color`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#color) object isn't generally supported.",
            ).optional(),
            themeColor: z.unknown().describe("Theme color.").optional(),
          }).describe(
            "The color of the border. If color is also set, this field takes precedence.",
          ).optional(),
          style: z.enum([
            "STYLE_UNSPECIFIED",
            "DOTTED",
            "DASHED",
            "SOLID",
            "SOLID_MEDIUM",
            "SOLID_THICK",
            "NONE",
            "DOUBLE",
          ]).describe("The style of the border.").optional(),
          width: z.number().int().describe(
            'The width of the border, in pixels. Deprecated; the width is determined by the "style" field.',
          ).optional(),
        }).describe("The bottom border of the cell.").optional(),
        left: z.object({
          color: z.object({
            alpha: z.unknown().describe(
              "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
            ).optional(),
            blue: z.unknown().describe(
              "The amount of blue in the color as a value in the interval [0, 1].",
            ).optional(),
            green: z.unknown().describe(
              "The amount of green in the color as a value in the interval [0, 1].",
            ).optional(),
            red: z.unknown().describe(
              "The amount of red in the color as a value in the interval [0, 1].",
            ).optional(),
          }).describe("The color of the border. Deprecated: Use color_style.")
            .optional(),
          colorStyle: z.object({
            rgbColor: z.unknown().describe(
              "RGB color. The [`alpha`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#Color.FIELDS.alpha) value in the [`Color`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#color) object isn't generally supported.",
            ).optional(),
            themeColor: z.unknown().describe("Theme color.").optional(),
          }).describe(
            "The color of the border. If color is also set, this field takes precedence.",
          ).optional(),
          style: z.enum([
            "STYLE_UNSPECIFIED",
            "DOTTED",
            "DASHED",
            "SOLID",
            "SOLID_MEDIUM",
            "SOLID_THICK",
            "NONE",
            "DOUBLE",
          ]).describe("The style of the border.").optional(),
          width: z.number().int().describe(
            'The width of the border, in pixels. Deprecated; the width is determined by the "style" field.',
          ).optional(),
        }).describe("The left border of the cell.").optional(),
        right: z.object({
          color: z.object({
            alpha: z.unknown().describe(
              "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
            ).optional(),
            blue: z.unknown().describe(
              "The amount of blue in the color as a value in the interval [0, 1].",
            ).optional(),
            green: z.unknown().describe(
              "The amount of green in the color as a value in the interval [0, 1].",
            ).optional(),
            red: z.unknown().describe(
              "The amount of red in the color as a value in the interval [0, 1].",
            ).optional(),
          }).describe("The color of the border. Deprecated: Use color_style.")
            .optional(),
          colorStyle: z.object({
            rgbColor: z.unknown().describe(
              "RGB color. The [`alpha`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#Color.FIELDS.alpha) value in the [`Color`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#color) object isn't generally supported.",
            ).optional(),
            themeColor: z.unknown().describe("Theme color.").optional(),
          }).describe(
            "The color of the border. If color is also set, this field takes precedence.",
          ).optional(),
          style: z.enum([
            "STYLE_UNSPECIFIED",
            "DOTTED",
            "DASHED",
            "SOLID",
            "SOLID_MEDIUM",
            "SOLID_THICK",
            "NONE",
            "DOUBLE",
          ]).describe("The style of the border.").optional(),
          width: z.number().int().describe(
            'The width of the border, in pixels. Deprecated; the width is determined by the "style" field.',
          ).optional(),
        }).describe("The right border of the cell.").optional(),
        top: z.object({
          color: z.object({
            alpha: z.unknown().describe(
              "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
            ).optional(),
            blue: z.unknown().describe(
              "The amount of blue in the color as a value in the interval [0, 1].",
            ).optional(),
            green: z.unknown().describe(
              "The amount of green in the color as a value in the interval [0, 1].",
            ).optional(),
            red: z.unknown().describe(
              "The amount of red in the color as a value in the interval [0, 1].",
            ).optional(),
          }).describe("The color of the border. Deprecated: Use color_style.")
            .optional(),
          colorStyle: z.object({
            rgbColor: z.unknown().describe(
              "RGB color. The [`alpha`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#Color.FIELDS.alpha) value in the [`Color`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#color) object isn't generally supported.",
            ).optional(),
            themeColor: z.unknown().describe("Theme color.").optional(),
          }).describe(
            "The color of the border. If color is also set, this field takes precedence.",
          ).optional(),
          style: z.enum([
            "STYLE_UNSPECIFIED",
            "DOTTED",
            "DASHED",
            "SOLID",
            "SOLID_MEDIUM",
            "SOLID_THICK",
            "NONE",
            "DOUBLE",
          ]).describe("The style of the border.").optional(),
          width: z.number().int().describe(
            'The width of the border, in pixels. Deprecated; the width is determined by the "style" field.',
          ).optional(),
        }).describe("The top border of the cell.").optional(),
      }).describe("The borders of the cell.").optional(),
      horizontalAlignment: z.enum([
        "HORIZONTAL_ALIGN_UNSPECIFIED",
        "LEFT",
        "CENTER",
        "RIGHT",
      ]).describe("The horizontal alignment of the value in the cell.")
        .optional(),
      hyperlinkDisplayType: z.enum([
        "HYPERLINK_DISPLAY_TYPE_UNSPECIFIED",
        "LINKED",
        "PLAIN_TEXT",
      ]).describe(
        "If one exists, how a hyperlink should be displayed in the cell.",
      ).optional(),
      numberFormat: z.object({
        pattern: z.string().describe(
          "Pattern string used for formatting. If not set, a default pattern based on the spreadsheet's locale will be used if necessary for the given type. See the [Date and Number Formats guide](https://developers.google.com/workspace/sheets/api/guides/formats) for more information about the supported patterns.",
        ).optional(),
        type: z.enum([
          "NUMBER_FORMAT_TYPE_UNSPECIFIED",
          "TEXT",
          "NUMBER",
          "PERCENT",
          "CURRENCY",
          "DATE",
          "TIME",
          "DATE_TIME",
          "SCIENTIFIC",
        ]).describe(
          "The type of the number format. When writing, this field must be set.",
        ).optional(),
      }).describe(
        "A format describing how number values should be represented to the user.",
      ).optional(),
      padding: z.object({
        bottom: z.number().int().describe("The bottom padding of the cell.")
          .optional(),
        left: z.number().int().describe("The left padding of the cell.")
          .optional(),
        right: z.number().int().describe("The right padding of the cell.")
          .optional(),
        top: z.number().int().describe("The top padding of the cell.")
          .optional(),
      }).describe("The padding of the cell.").optional(),
      textDirection: z.enum([
        "TEXT_DIRECTION_UNSPECIFIED",
        "LEFT_TO_RIGHT",
        "RIGHT_TO_LEFT",
      ]).describe("The direction of the text in the cell.").optional(),
      textFormat: z.object({
        bold: z.boolean().describe("True if the text is bold.").optional(),
        fontFamily: z.string().describe("The font family.").optional(),
        fontSize: z.number().int().describe("The size of the font.").optional(),
        foregroundColor: z.object({
          alpha: z.number().describe(
            "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
          ).optional(),
          blue: z.number().describe(
            "The amount of blue in the color as a value in the interval [0, 1].",
          ).optional(),
          green: z.number().describe(
            "The amount of green in the color as a value in the interval [0, 1].",
          ).optional(),
          red: z.number().describe(
            "The amount of red in the color as a value in the interval [0, 1].",
          ).optional(),
        }).describe(
          "The foreground color of the text. Deprecated: Use foreground_color_style.",
        ).optional(),
        foregroundColorStyle: z.object({
          rgbColor: z.object({
            alpha: z.unknown().describe(
              "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
            ).optional(),
            blue: z.unknown().describe(
              "The amount of blue in the color as a value in the interval [0, 1].",
            ).optional(),
            green: z.unknown().describe(
              "The amount of green in the color as a value in the interval [0, 1].",
            ).optional(),
            red: z.unknown().describe(
              "The amount of red in the color as a value in the interval [0, 1].",
            ).optional(),
          }).describe(
            "RGB color. The [`alpha`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#Color.FIELDS.alpha) value in the [`Color`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#color) object isn't generally supported.",
          ).optional(),
          themeColor: z.enum([
            "THEME_COLOR_TYPE_UNSPECIFIED",
            "TEXT",
            "BACKGROUND",
            "ACCENT1",
            "ACCENT2",
            "ACCENT3",
            "ACCENT4",
            "ACCENT5",
            "ACCENT6",
            "LINK",
          ]).describe("Theme color.").optional(),
        }).describe(
          "The foreground color of the text. If foreground_color is also set, this field takes precedence.",
        ).optional(),
        italic: z.boolean().describe("True if the text is italicized.")
          .optional(),
        link: z.object({
          uri: z.string().describe("The link identifier.").optional(),
        }).describe(
          "The link destination of the text, if any. Setting the link field in a TextFormatRun will clear the cell's existing links or a cell-level link set in the same request. When a link is set, the text foreground color will be set to the default link color and the text will be underlined. If these fields are modified in the same request, those values will be used instead of the link defaults.",
        ).optional(),
        strikethrough: z.boolean().describe(
          "True if the text has a strikethrough.",
        ).optional(),
        underline: z.boolean().describe("True if the text is underlined.")
          .optional(),
      }).describe(
        "The format of the text in the cell (unless overridden by a format run). Setting a cell-level link here clears the cell's existing links. Setting the link field in a TextFormatRun takes precedence over the cell-level link.",
      ).optional(),
      textRotation: z.object({
        angle: z.number().int().describe(
          "The angle between the standard orientation and the desired orientation. Measured in degrees. Valid values are between -90 and 90. Positive angles are angled upwards, negative are angled downwards. Note: For LTR text direction positive angles are in the counterclockwise direction, whereas for RTL they are in the clockwise direction",
        ).optional(),
        vertical: z.boolean().describe(
          "If true, text reads top to bottom, but the orientation of individual characters is unchanged. For example: | V | | e | | r | | t | | i | | c | | a | | l |",
        ).optional(),
      }).describe("The rotation applied to text in the cell.").optional(),
      verticalAlignment: z.enum([
        "VERTICAL_ALIGN_UNSPECIFIED",
        "TOP",
        "MIDDLE",
        "BOTTOM",
      ]).describe("The vertical alignment of the value in the cell.")
        .optional(),
      wrapStrategy: z.enum([
        "WRAP_STRATEGY_UNSPECIFIED",
        "OVERFLOW_CELL",
        "LEGACY_WRAP",
        "CLIP",
        "WRAP",
      ]).describe("The wrap strategy for the value in the cell.").optional(),
    }).describe(
      "The default format of all cells in the spreadsheet. CellData.effectiveFormat will not be set if the cell's format is equal to this default format. This field is read-only.",
    ).optional(),
    importFunctionsExternalUrlAccessAllowed: z.boolean().describe(
      "Whether to allow external URL access for image and import functions. Read only when true. When false, you can set to true. This value will be bypassed and always return true if the admin has enabled the [allowlisting feature](https://support.google.com/a?p=url_allowlist).",
    ).optional(),
    iterativeCalculationSettings: z.object({
      convergenceThreshold: z.number().describe(
        "When iterative calculation is enabled and successive results differ by less than this threshold value, the calculation rounds stop.",
      ).optional(),
      maxIterations: z.number().int().describe(
        "When iterative calculation is enabled, the maximum number of calculation rounds to perform.",
      ).optional(),
    }).describe(
      "Determines whether and how circular references are resolved with iterative calculation. Absence of this field means that circular references result in calculation errors.",
    ).optional(),
    locale: z.string().describe(
      "The locale of the spreadsheet in one of the following formats: * an ISO 639-1 language code such as `en` * an ISO 639-2 language code such as `fil`, if no 639-1 code exists * a combination of the ISO language code and country code, such as `en_US` Note: when updating this field, not all locales/languages are supported.",
    ).optional(),
    spreadsheetTheme: z.object({
      primaryFontFamily: z.string().describe("Name of the primary font family.")
        .optional(),
      themeColors: z.array(z.object({
        color: z.object({
          rgbColor: z.unknown().describe(
            "RGB color. The [`alpha`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#Color.FIELDS.alpha) value in the [`Color`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#color) object isn't generally supported.",
          ).optional(),
          themeColor: z.unknown().describe("Theme color.").optional(),
        }).describe("The concrete color corresponding to the theme color type.")
          .optional(),
        colorType: z.enum([
          "THEME_COLOR_TYPE_UNSPECIFIED",
          "TEXT",
          "BACKGROUND",
          "ACCENT1",
          "ACCENT2",
          "ACCENT3",
          "ACCENT4",
          "ACCENT5",
          "ACCENT6",
          "LINK",
        ]).describe("The type of the spreadsheet theme color.").optional(),
      })).describe(
        "The spreadsheet theme color pairs. To update you must provide all theme color pairs.",
      ).optional(),
    }).describe("Theme applied to the spreadsheet.").optional(),
    timeZone: z.string().describe(
      "The time zone of the spreadsheet, in CLDR format such as `America/New_York`. If the time zone isn't recognized, this may be a custom time zone such as `GMT-07:00`.",
    ).optional(),
    title: z.string().describe("The title of the spreadsheet.").optional(),
  }).describe("Overall properties of a spreadsheet.").optional(),
  sheets: z.array(z.object({
    bandedRanges: z.array(z.object({
      bandedRangeId: z.number().int().describe(
        "The ID of the banded range. If unset, refer to banded_range_reference.",
      ).optional(),
      bandedRangeReference: z.string().describe(
        "Output only. The reference of the banded range, used to identify the ID that is not supported by the banded_range_id.",
      ).optional(),
      columnProperties: z.object({
        firstBandColor: z.unknown().describe(
          "The first color that is alternating. (Required) Deprecated: Use first_band_color_style.",
        ).optional(),
        firstBandColorStyle: z.unknown().describe(
          "The first color that is alternating. (Required) If first_band_color is also set, this field takes precedence.",
        ).optional(),
        footerColor: z.unknown().describe(
          "The color of the last row or column. If this field is not set, the last row or column is filled with either first_band_color or second_band_color, depending on the color of the previous row or column. Deprecated: Use footer_color_style.",
        ).optional(),
        footerColorStyle: z.unknown().describe(
          "The color of the last row or column. If this field is not set, the last row or column is filled with either first_band_color or second_band_color, depending on the color of the previous row or column. If footer_color is also set, this field takes precedence.",
        ).optional(),
        headerColor: z.unknown().describe(
          "The color of the first row or column. If this field is set, the first row or column is filled with this color and the colors alternate between first_band_color and second_band_color starting from the second row or column. Otherwise, the first row or column is filled with first_band_color and the colors proceed to alternate as they normally would. Deprecated: Use header_color_style.",
        ).optional(),
        headerColorStyle: z.unknown().describe(
          "The color of the first row or column. If this field is set, the first row or column is filled with this color and the colors alternate between first_band_color and second_band_color starting from the second row or column. Otherwise, the first row or column is filled with first_band_color and the colors proceed to alternate as they normally would. If header_color is also set, this field takes precedence.",
        ).optional(),
        secondBandColor: z.unknown().describe(
          "The second color that is alternating. (Required) Deprecated: Use second_band_color_style.",
        ).optional(),
        secondBandColorStyle: z.unknown().describe(
          "The second color that is alternating. (Required) If second_band_color is also set, this field takes precedence.",
        ).optional(),
      }).describe(
        "Properties for column bands. These properties are applied on a column- by-column basis throughout all the columns in the range. At least one of row_properties or column_properties must be specified.",
      ).optional(),
      range: z.object({
        endColumnIndex: z.unknown().describe(
          "The end column (exclusive) of the range, or not set if unbounded.",
        ).optional(),
        endRowIndex: z.unknown().describe(
          "The end row (exclusive) of the range, or not set if unbounded.",
        ).optional(),
        sheetId: z.unknown().describe("The sheet this range is on.").optional(),
        startColumnIndex: z.unknown().describe(
          "The start column (inclusive) of the range, or not set if unbounded.",
        ).optional(),
        startRowIndex: z.unknown().describe(
          "The start row (inclusive) of the range, or not set if unbounded.",
        ).optional(),
      }).describe("The range over which these properties are applied.")
        .optional(),
      rowProperties: z.object({
        firstBandColor: z.unknown().describe(
          "The first color that is alternating. (Required) Deprecated: Use first_band_color_style.",
        ).optional(),
        firstBandColorStyle: z.unknown().describe(
          "The first color that is alternating. (Required) If first_band_color is also set, this field takes precedence.",
        ).optional(),
        footerColor: z.unknown().describe(
          "The color of the last row or column. If this field is not set, the last row or column is filled with either first_band_color or second_band_color, depending on the color of the previous row or column. Deprecated: Use footer_color_style.",
        ).optional(),
        footerColorStyle: z.unknown().describe(
          "The color of the last row or column. If this field is not set, the last row or column is filled with either first_band_color or second_band_color, depending on the color of the previous row or column. If footer_color is also set, this field takes precedence.",
        ).optional(),
        headerColor: z.unknown().describe(
          "The color of the first row or column. If this field is set, the first row or column is filled with this color and the colors alternate between first_band_color and second_band_color starting from the second row or column. Otherwise, the first row or column is filled with first_band_color and the colors proceed to alternate as they normally would. Deprecated: Use header_color_style.",
        ).optional(),
        headerColorStyle: z.unknown().describe(
          "The color of the first row or column. If this field is set, the first row or column is filled with this color and the colors alternate between first_band_color and second_band_color starting from the second row or column. Otherwise, the first row or column is filled with first_band_color and the colors proceed to alternate as they normally would. If header_color is also set, this field takes precedence.",
        ).optional(),
        secondBandColor: z.unknown().describe(
          "The second color that is alternating. (Required) Deprecated: Use second_band_color_style.",
        ).optional(),
        secondBandColorStyle: z.unknown().describe(
          "The second color that is alternating. (Required) If second_band_color is also set, this field takes precedence.",
        ).optional(),
      }).describe(
        "Properties for row bands. These properties are applied on a row-by-row basis throughout all the rows in the range. At least one of row_properties or column_properties must be specified.",
      ).optional(),
    })).describe("The banded (alternating colors) ranges on this sheet.")
      .optional(),
    basicFilter: z.object({
      criteria: z.record(
        z.string(),
        z.object({
          condition: z.unknown().describe(
            "A condition that must be `true` for values to be shown. (This does not override hidden_values -- if a value is listed there, it will still be hidden.)",
          ).optional(),
          hiddenValues: z.unknown().describe("Values that should be hidden.")
            .optional(),
          visibleBackgroundColor: z.unknown().describe(
            "The background fill color to filter by; only cells with this fill color are shown. Mutually exclusive with visible_foreground_color. Deprecated: Use visible_background_color_style.",
          ).optional(),
          visibleBackgroundColorStyle: z.unknown().describe(
            "The background fill color to filter by; only cells with this fill color are shown. This field is mutually exclusive with visible_foreground_color, and must be set to an RGB-type color. If visible_background_color is also set, this field takes precedence.",
          ).optional(),
          visibleForegroundColor: z.unknown().describe(
            "The foreground color to filter by; only cells with this foreground color are shown. Mutually exclusive with visible_background_color. Deprecated: Use visible_foreground_color_style.",
          ).optional(),
          visibleForegroundColorStyle: z.unknown().describe(
            "The foreground color to filter by; only cells with this foreground color are shown. This field is mutually exclusive with visible_background_color, and must be set to an RGB-type color. If visible_foreground_color is also set, this field takes precedence.",
          ).optional(),
        }),
      ).describe(
        "The criteria for showing/hiding values per column. The map's key is the column index, and the value is the criteria for that column. This field is deprecated in favor of filter_specs.",
      ).optional(),
      filterSpecs: z.array(z.object({
        columnIndex: z.unknown().describe("The zero-based column index.")
          .optional(),
        dataSourceColumnReference: z.unknown().describe(
          "Reference to a data source column.",
        ).optional(),
        filterCriteria: z.unknown().describe("The criteria for the column.")
          .optional(),
      })).describe(
        "The filter criteria per column. Both criteria and filter_specs are populated in responses. If both fields are specified in an update request, this field takes precedence.",
      ).optional(),
      range: z.object({
        endColumnIndex: z.number().int().describe(
          "The end column (exclusive) of the range, or not set if unbounded.",
        ).optional(),
        endRowIndex: z.number().int().describe(
          "The end row (exclusive) of the range, or not set if unbounded.",
        ).optional(),
        sheetId: z.number().int().describe("The sheet this range is on.")
          .optional(),
        startColumnIndex: z.number().int().describe(
          "The start column (inclusive) of the range, or not set if unbounded.",
        ).optional(),
        startRowIndex: z.number().int().describe(
          "The start row (inclusive) of the range, or not set if unbounded.",
        ).optional(),
      }).describe("The range the filter covers.").optional(),
      sortSpecs: z.array(z.object({
        backgroundColor: z.unknown().describe(
          "The background fill color to sort by; cells with this fill color are sorted to the top. Mutually exclusive with foreground_color. Deprecated: Use background_color_style.",
        ).optional(),
        backgroundColorStyle: z.unknown().describe(
          "The background fill color to sort by; cells with this fill color are sorted to the top. Mutually exclusive with foreground_color, and must be an RGB-type color. If background_color is also set, this field takes precedence.",
        ).optional(),
        dataSourceColumnReference: z.unknown().describe(
          "Reference to a data source column.",
        ).optional(),
        dimensionIndex: z.unknown().describe(
          "The dimension the sort should be applied to.",
        ).optional(),
        foregroundColor: z.unknown().describe(
          "The foreground color to sort by; cells with this foreground color are sorted to the top. Mutually exclusive with background_color. Deprecated: Use foreground_color_style.",
        ).optional(),
        foregroundColorStyle: z.unknown().describe(
          "The foreground color to sort by; cells with this foreground color are sorted to the top. Mutually exclusive with background_color, and must be an RGB-type color. If foreground_color is also set, this field takes precedence.",
        ).optional(),
        sortOrder: z.unknown().describe("The order data should be sorted.")
          .optional(),
      })).describe(
        "The sort order per column. Later specifications are used when values are equal in the earlier specifications.",
      ).optional(),
      tableId: z.string().describe(
        "The table this filter is backed by, if any. When writing, only one of range or table_id may be set.",
      ).optional(),
    }).describe("The filter on this sheet, if any.").optional(),
    charts: z.array(z.object({
      border: z.object({
        color: z.unknown().describe(
          "The color of the border. Deprecated: Use color_style.",
        ).optional(),
        colorStyle: z.unknown().describe(
          "The color of the border. If color is also set, this field takes precedence.",
        ).optional(),
      }).describe("The border of the chart.").optional(),
      chartId: z.number().int().describe("The ID of the chart.").optional(),
      position: z.object({
        newSheet: z.unknown().describe(
          "If true, the embedded object is put on a new sheet whose ID is chosen for you. Used only when writing.",
        ).optional(),
        overlayPosition: z.unknown().describe(
          "The position at which the object is overlaid on top of a grid.",
        ).optional(),
        sheetId: z.unknown().describe(
          "The sheet this is on. Set only if the embedded object is on its own sheet. Must be non-negative.",
        ).optional(),
      }).describe("The position of the chart.").optional(),
      spec: z.object({
        altText: z.unknown().describe(
          "The alternative text that describes the chart. This is often used for accessibility.",
        ).optional(),
        backgroundColor: z.unknown().describe(
          "The background color of the entire chart. Not applicable to Org charts. Deprecated: Use background_color_style.",
        ).optional(),
        backgroundColorStyle: z.unknown().describe(
          "The background color of the entire chart. Not applicable to Org charts. If background_color is also set, this field takes precedence.",
        ).optional(),
        basicChart: z.unknown().describe(
          "A basic chart specification, can be one of many kinds of charts. See BasicChartType for the list of all charts this supports.",
        ).optional(),
        bubbleChart: z.unknown().describe("A bubble chart specification.")
          .optional(),
        candlestickChart: z.unknown().describe(
          "A candlestick chart specification.",
        ).optional(),
        dataSourceChartProperties: z.unknown().describe(
          "If present, the field contains data source chart specific properties.",
        ).optional(),
        filterSpecs: z.unknown().describe(
          "The filters applied to the source data of the chart. Only supported for data source charts.",
        ).optional(),
        fontName: z.unknown().describe(
          "The name of the font to use by default for all chart text (e.g. title, axis labels, legend). If a font is specified for a specific part of the chart it will override this font name.",
        ).optional(),
        hiddenDimensionStrategy: z.unknown().describe(
          "Determines how the charts will use hidden rows or columns.",
        ).optional(),
        histogramChart: z.unknown().describe("A histogram chart specification.")
          .optional(),
        maximized: z.unknown().describe(
          "True to make a chart fill the entire space in which it's rendered with minimum padding. False to use the default padding. (Not applicable to Geo and Org charts.)",
        ).optional(),
        orgChart: z.unknown().describe("An org chart specification.")
          .optional(),
        pieChart: z.unknown().describe("A pie chart specification.").optional(),
        scorecardChart: z.unknown().describe("A scorecard chart specification.")
          .optional(),
        sortSpecs: z.unknown().describe(
          "The order to sort the chart data by. Only a single sort spec is supported. Only supported for data source charts.",
        ).optional(),
        subtitle: z.unknown().describe("The subtitle of the chart.").optional(),
        subtitleTextFormat: z.unknown().describe(
          "The subtitle text format. Strikethrough, underline, and link are not supported.",
        ).optional(),
        subtitleTextPosition: z.unknown().describe(
          "The subtitle text position. This field is optional.",
        ).optional(),
        title: z.unknown().describe("The title of the chart.").optional(),
        titleTextFormat: z.unknown().describe(
          "The title text format. Strikethrough, underline, and link are not supported.",
        ).optional(),
        titleTextPosition: z.unknown().describe(
          "The title text position. This field is optional.",
        ).optional(),
        treemapChart: z.unknown().describe("A treemap chart specification.")
          .optional(),
        waterfallChart: z.unknown().describe("A waterfall chart specification.")
          .optional(),
      }).describe("The specification of the chart.").optional(),
    })).describe("The specifications of every chart on this sheet.").optional(),
    columnGroups: z.array(z.object({
      collapsed: z.boolean().describe(
        "This field is true if this group is collapsed. A collapsed group remains collapsed if an overlapping group at a shallower depth is expanded. A true value does not imply that all dimensions within the group are hidden, since a dimension's visibility can change independently from this group property. However, when this property is updated, all dimensions within it are set to hidden if this field is true, or set to visible if this field is false.",
      ).optional(),
      depth: z.number().int().describe(
        "The depth of the group, representing how many groups have a range that wholly contains the range of this group.",
      ).optional(),
      range: z.object({
        dimension: z.unknown().describe("The dimension of the span.")
          .optional(),
        endIndex: z.unknown().describe(
          "The end (exclusive) of the span, or not set if unbounded.",
        ).optional(),
        sheetId: z.unknown().describe("The sheet this span is on.").optional(),
        startIndex: z.unknown().describe(
          "The start (inclusive) of the span, or not set if unbounded.",
        ).optional(),
      }).describe("The range over which this group exists.").optional(),
    })).describe(
      "All column groups on this sheet, ordered by increasing range start index, then by group depth.",
    ).optional(),
    commentAnchors: z.array(z.object({
      anchorId: z.string().describe(
        "The unique ID of the comment anchor. Output only.",
      ).optional(),
      range: z.object({
        endColumnIndex: z.unknown().describe(
          "The end column (exclusive) of the range, or not set if unbounded.",
        ).optional(),
        endRowIndex: z.unknown().describe(
          "The end row (exclusive) of the range, or not set if unbounded.",
        ).optional(),
        sheetId: z.unknown().describe("The sheet this range is on.").optional(),
        startColumnIndex: z.unknown().describe(
          "The start column (inclusive) of the range, or not set if unbounded.",
        ).optional(),
        startRowIndex: z.unknown().describe(
          "The start row (inclusive) of the range, or not set if unbounded.",
        ).optional(),
      }).describe(
        "The coordinate range inside the sheet where this comment is anchored.",
      ).optional(),
    })).describe(
      "The comment anchors on this sheet. [Developer Preview](https://developers.google.com/workspace/preview).",
    ).optional(),
    conditionalFormats: z.array(z.object({
      booleanRule: z.object({
        condition: z.unknown().describe(
          "The condition of the rule. If the condition evaluates to true, the format is applied.",
        ).optional(),
        format: z.unknown().describe(
          "The format to apply. Conditional formatting can only apply a subset of formatting: bold, italic, strikethrough, foreground color and, background color.",
        ).optional(),
      }).describe(
        'The formatting is either "on" or "off" according to the rule.',
      ).optional(),
      gradientRule: z.object({
        maxpoint: z.unknown().describe("The final interpolation point.")
          .optional(),
        midpoint: z.unknown().describe(
          "An optional midway interpolation point.",
        ).optional(),
        minpoint: z.unknown().describe("The starting interpolation point.")
          .optional(),
      }).describe(
        "The formatting will vary based on the gradients in the rule.",
      ).optional(),
      ranges: z.array(z.unknown()).describe(
        "The ranges that are formatted if the condition is true. All the ranges must be on the same grid.",
      ).optional(),
    })).describe("The conditional format rules in this sheet.").optional(),
    data: z.array(z.object({
      columnMetadata: z.array(z.unknown()).describe(
        "Metadata about the requested columns in the grid, starting with the column in start_column.",
      ).optional(),
      rowData: z.array(z.unknown()).describe(
        "The data in the grid, one entry per row, starting with the row in startRow. The values in RowData will correspond to columns starting at start_column.",
      ).optional(),
      rowMetadata: z.array(z.unknown()).describe(
        "Metadata about the requested rows in the grid, starting with the row in start_row.",
      ).optional(),
      startColumn: z.number().int().describe(
        "The first column this GridData refers to, zero-based.",
      ).optional(),
      startRow: z.number().int().describe(
        "The first row this GridData refers to, zero-based.",
      ).optional(),
    })).describe(
      "Data in the grid, if this is a grid sheet. The number of GridData objects returned is dependent on the number of ranges requested on this sheet. For example, if this is representing `Sheet1`, and the spreadsheet was requested with ranges `Sheet1!A1:C10` and `Sheet1!D15:E20`, then the first GridData will have a startRow/startColumn of `0`, while the second one will have `startRow 14` (zero-based row 15), and `startColumn 3` (zero-based column D). For a DATA_SOURCE sheet, you can not request a specific range, the GridData contains all the values.",
    ).optional(),
    developerMetadata: z.array(z.object({
      location: z.object({
        dimensionRange: z.unknown().describe(
          "Represents the row or column when metadata is associated with a dimension. The specified DimensionRange must represent a single row or column. It cannot be unbounded or span multiple rows or columns.",
        ).optional(),
        locationType: z.unknown().describe(
          "The type of location this object represents. This field is read-only.",
        ).optional(),
        sheetId: z.unknown().describe(
          "The ID of the sheet when metadata is associated with an entire sheet.",
        ).optional(),
        spreadsheet: z.unknown().describe(
          "True when metadata is associated with an entire spreadsheet.",
        ).optional(),
      }).describe("The location where the metadata is associated.").optional(),
      metadataId: z.number().int().describe(
        "The spreadsheet-scoped unique ID that identifies the metadata. IDs may be specified when metadata is created, otherwise one will be randomly generated and assigned. Must be positive.",
      ).optional(),
      metadataKey: z.string().describe(
        "The metadata key. There may be multiple metadata in a spreadsheet with the same key. Developer metadata must always have a key specified.",
      ).optional(),
      metadataValue: z.string().describe(
        "Data associated with the metadata's key.",
      ).optional(),
      visibility: z.enum([
        "DEVELOPER_METADATA_VISIBILITY_UNSPECIFIED",
        "DOCUMENT",
        "PROJECT",
      ]).describe(
        "The metadata visibility. Developer metadata must always have visibility specified.",
      ).optional(),
    })).describe("The developer metadata associated with a sheet.").optional(),
    filterViews: z.array(z.object({
      criteria: z.record(z.string(), z.unknown()).describe(
        "The criteria for showing/hiding values per column. The map's key is the column index, and the value is the criteria for that column. This field is deprecated in favor of filter_specs.",
      ).optional(),
      filterSpecs: z.array(z.unknown()).describe(
        "The filter criteria for showing or hiding values per column. Both criteria and filter_specs are populated in responses. If both fields are specified in an update request, this field takes precedence.",
      ).optional(),
      filterViewId: z.number().int().describe("The ID of the filter view.")
        .optional(),
      namedRangeId: z.string().describe(
        "The named range this filter view is backed by, if any. When writing, only one of range, named_range_id, or table_id may be set.",
      ).optional(),
      range: z.object({
        endColumnIndex: z.unknown().describe(
          "The end column (exclusive) of the range, or not set if unbounded.",
        ).optional(),
        endRowIndex: z.unknown().describe(
          "The end row (exclusive) of the range, or not set if unbounded.",
        ).optional(),
        sheetId: z.unknown().describe("The sheet this range is on.").optional(),
        startColumnIndex: z.unknown().describe(
          "The start column (inclusive) of the range, or not set if unbounded.",
        ).optional(),
        startRowIndex: z.unknown().describe(
          "The start row (inclusive) of the range, or not set if unbounded.",
        ).optional(),
      }).describe(
        "The range this filter view covers. When writing, only one of range, named_range_id, or table_id may be set.",
      ).optional(),
      sortSpecs: z.array(z.unknown()).describe(
        "The sort order per column. Later specifications are used when values are equal in the earlier specifications.",
      ).optional(),
      tableId: z.string().describe(
        "The table this filter view is backed by, if any. When writing, only one of range, named_range_id, or table_id may be set.",
      ).optional(),
      title: z.string().describe("The name of the filter view.").optional(),
    })).describe("The filter views in this sheet.").optional(),
    merges: z.array(z.object({
      endColumnIndex: z.number().int().describe(
        "The end column (exclusive) of the range, or not set if unbounded.",
      ).optional(),
      endRowIndex: z.number().int().describe(
        "The end row (exclusive) of the range, or not set if unbounded.",
      ).optional(),
      sheetId: z.number().int().describe("The sheet this range is on.")
        .optional(),
      startColumnIndex: z.number().int().describe(
        "The start column (inclusive) of the range, or not set if unbounded.",
      ).optional(),
      startRowIndex: z.number().int().describe(
        "The start row (inclusive) of the range, or not set if unbounded.",
      ).optional(),
    })).describe("The ranges that are merged together.").optional(),
    properties: z.object({
      dataSourceSheetProperties: z.object({
        columns: z.array(z.unknown()).describe(
          "The columns displayed on the sheet, corresponding to the values in RowData.",
        ).optional(),
        dataExecutionStatus: z.object({
          errorCode: z.unknown().describe("The error code.").optional(),
          errorMessage: z.unknown().describe(
            "The error message, which may be empty.",
          ).optional(),
          lastRefreshTime: z.unknown().describe(
            "Gets the time the data last successfully refreshed.",
          ).optional(),
          state: z.unknown().describe("The state of the data execution.")
            .optional(),
        }).describe("The data execution status.").optional(),
        dataSourceId: z.string().describe(
          "ID of the DataSource the sheet is connected to.",
        ).optional(),
      }).describe(
        "Output only. If present, the field contains DATA_SOURCE sheet specific properties.",
      ).optional(),
      gridProperties: z.object({
        columnCount: z.number().int().describe(
          "The number of columns in the grid.",
        ).optional(),
        columnGroupControlAfter: z.boolean().describe(
          "True if the column grouping control toggle is shown after the group.",
        ).optional(),
        frozenColumnCount: z.number().int().describe(
          "The number of columns that are frozen in the grid.",
        ).optional(),
        frozenRowCount: z.number().int().describe(
          "The number of rows that are frozen in the grid.",
        ).optional(),
        hideGridlines: z.boolean().describe(
          "True if the grid isn't showing gridlines in the UI.",
        ).optional(),
        rowCount: z.number().int().describe("The number of rows in the grid.")
          .optional(),
        rowGroupControlAfter: z.boolean().describe(
          "True if the row grouping control toggle is shown after the group.",
        ).optional(),
      }).describe(
        "Additional properties of the sheet if this sheet is a grid. (If the sheet is an object sheet, containing a chart or image, then this field will be absent.) When writing it is an error to set any grid properties on non-grid sheets. If this sheet is a DATA_SOURCE sheet, this field is output only but contains the properties that reflect how a data source sheet is rendered in the UI, e.g. row_count.",
      ).optional(),
      hidden: z.boolean().describe(
        "True if the sheet is hidden in the UI, false if it's visible.",
      ).optional(),
      index: z.number().int().describe(
        'The index of the sheet within the spreadsheet. When adding or updating sheet properties, if this field is excluded then the sheet is added or moved to the end of the sheet list. When updating sheet indices or inserting sheets, movement is considered in "before the move" indexes. For example, if there were three sheets (S1, S2, S3) in order to move S1 ahead of S2 the index would have to be set to 2. A sheet index update request is ignored if the requested index is identical to the sheets current index or if the requested new index is equal to the current sheet index + 1.',
      ).optional(),
      rightToLeft: z.boolean().describe(
        "True if the sheet is an RTL sheet instead of an LTR sheet.",
      ).optional(),
      sheetId: z.number().int().describe(
        "The ID of the sheet. Must be non-negative. This field cannot be changed once set.",
      ).optional(),
      sheetType: z.enum([
        "SHEET_TYPE_UNSPECIFIED",
        "GRID",
        "OBJECT",
        "DATA_SOURCE",
      ]).describe(
        "The type of sheet. Defaults to GRID. This field cannot be changed once set.",
      ).optional(),
      tabColor: z.object({
        alpha: z.number().describe(
          "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
        ).optional(),
        blue: z.number().describe(
          "The amount of blue in the color as a value in the interval [0, 1].",
        ).optional(),
        green: z.number().describe(
          "The amount of green in the color as a value in the interval [0, 1].",
        ).optional(),
        red: z.number().describe(
          "The amount of red in the color as a value in the interval [0, 1].",
        ).optional(),
      }).describe(
        "The color of the tab in the UI. Deprecated: Use tab_color_style.",
      ).optional(),
      tabColorStyle: z.object({
        rgbColor: z.object({
          alpha: z.unknown().describe(
            "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
          ).optional(),
          blue: z.unknown().describe(
            "The amount of blue in the color as a value in the interval [0, 1].",
          ).optional(),
          green: z.unknown().describe(
            "The amount of green in the color as a value in the interval [0, 1].",
          ).optional(),
          red: z.unknown().describe(
            "The amount of red in the color as a value in the interval [0, 1].",
          ).optional(),
        }).describe(
          "RGB color. The [`alpha`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#Color.FIELDS.alpha) value in the [`Color`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#color) object isn't generally supported.",
        ).optional(),
        themeColor: z.enum([
          "THEME_COLOR_TYPE_UNSPECIFIED",
          "TEXT",
          "BACKGROUND",
          "ACCENT1",
          "ACCENT2",
          "ACCENT3",
          "ACCENT4",
          "ACCENT5",
          "ACCENT6",
          "LINK",
        ]).describe("Theme color.").optional(),
      }).describe(
        "The color of the tab in the UI. If tab_color is also set, this field takes precedence.",
      ).optional(),
      title: z.string().describe("The name of the sheet.").optional(),
    }).describe("The properties of the sheet.").optional(),
    protectedRanges: z.array(z.object({
      description: z.string().describe(
        "The description of this protected range.",
      ).optional(),
      editors: z.object({
        domainUsersCanEdit: z.unknown().describe(
          "True if anyone in the document's domain has edit access to the protected range. Domain protection is only supported on documents within a domain.",
        ).optional(),
        groups: z.unknown().describe(
          "The email addresses of groups with edit access to the protected range.",
        ).optional(),
        users: z.unknown().describe(
          "The email addresses of users with edit access to the protected range.",
        ).optional(),
      }).describe(
        "The users and groups with edit access to the protected range. This field is only visible to users with edit access to the protected range and the document. Editors are not supported with warning_only protection.",
      ).optional(),
      namedRangeId: z.string().describe(
        "The named range this protected range is backed by, if any. When writing, only one of range or named_range_id or table_id may be set.",
      ).optional(),
      protectedRangeId: z.number().int().describe(
        "The ID of the protected range. This field is read-only.",
      ).optional(),
      range: z.object({
        endColumnIndex: z.unknown().describe(
          "The end column (exclusive) of the range, or not set if unbounded.",
        ).optional(),
        endRowIndex: z.unknown().describe(
          "The end row (exclusive) of the range, or not set if unbounded.",
        ).optional(),
        sheetId: z.unknown().describe("The sheet this range is on.").optional(),
        startColumnIndex: z.unknown().describe(
          "The start column (inclusive) of the range, or not set if unbounded.",
        ).optional(),
        startRowIndex: z.unknown().describe(
          "The start row (inclusive) of the range, or not set if unbounded.",
        ).optional(),
      }).describe(
        "The range that is being protected. The range may be fully unbounded, in which case this is considered a protected sheet. When writing, only one of range or named_range_id or table_id may be set.",
      ).optional(),
      requestingUserCanEdit: z.boolean().describe(
        "True if the user who requested this protected range can edit the protected area. This field is read-only.",
      ).optional(),
      tableId: z.string().describe(
        "The table this protected range is backed by, if any. When writing, only one of range or named_range_id or table_id may be set.",
      ).optional(),
      unprotectedRanges: z.array(z.unknown()).describe(
        "The list of unprotected ranges within a protected sheet. Unprotected ranges are only supported on protected sheets.",
      ).optional(),
      warningOnly: z.boolean().describe(
        "True if this protected range will show a warning when editing. Warning-based protection means that every user can edit data in the protected range, except editing will prompt a warning asking the user to confirm the edit. When writing: if this field is true, then editors are ignored. Additionally, if this field is changed from true to false and the `editors` field is not set (nor included in the field mask), then the editors will be set to all the editors in the document.",
      ).optional(),
    })).describe("The protected ranges in this sheet.").optional(),
    rowGroups: z.array(z.object({
      collapsed: z.boolean().describe(
        "This field is true if this group is collapsed. A collapsed group remains collapsed if an overlapping group at a shallower depth is expanded. A true value does not imply that all dimensions within the group are hidden, since a dimension's visibility can change independently from this group property. However, when this property is updated, all dimensions within it are set to hidden if this field is true, or set to visible if this field is false.",
      ).optional(),
      depth: z.number().int().describe(
        "The depth of the group, representing how many groups have a range that wholly contains the range of this group.",
      ).optional(),
      range: z.object({
        dimension: z.unknown().describe("The dimension of the span.")
          .optional(),
        endIndex: z.unknown().describe(
          "The end (exclusive) of the span, or not set if unbounded.",
        ).optional(),
        sheetId: z.unknown().describe("The sheet this span is on.").optional(),
        startIndex: z.unknown().describe(
          "The start (inclusive) of the span, or not set if unbounded.",
        ).optional(),
      }).describe("The range over which this group exists.").optional(),
    })).describe(
      "All row groups on this sheet, ordered by increasing range start index, then by group depth.",
    ).optional(),
    slicers: z.array(z.object({
      position: z.object({
        newSheet: z.unknown().describe(
          "If true, the embedded object is put on a new sheet whose ID is chosen for you. Used only when writing.",
        ).optional(),
        overlayPosition: z.unknown().describe(
          "The position at which the object is overlaid on top of a grid.",
        ).optional(),
        sheetId: z.unknown().describe(
          "The sheet this is on. Set only if the embedded object is on its own sheet. Must be non-negative.",
        ).optional(),
      }).describe(
        "The position of the slicer. Note that slicer can be positioned only on existing sheet. Also, width and height of slicer can be automatically adjusted to keep it within permitted limits.",
      ).optional(),
      slicerId: z.number().int().describe("The ID of the slicer.").optional(),
      spec: z.object({
        applyToPivotTables: z.unknown().describe(
          "True if the filter should apply to pivot tables. If not set, default to `True`.",
        ).optional(),
        backgroundColor: z.unknown().describe(
          "The background color of the slicer. Deprecated: Use background_color_style.",
        ).optional(),
        backgroundColorStyle: z.unknown().describe(
          "The background color of the slicer. If background_color is also set, this field takes precedence.",
        ).optional(),
        columnIndex: z.unknown().describe(
          "The zero-based column index in the data table on which the filter is applied to.",
        ).optional(),
        dataRange: z.unknown().describe("The data range of the slicer.")
          .optional(),
        filterCriteria: z.unknown().describe(
          "The filtering criteria of the slicer.",
        ).optional(),
        horizontalAlignment: z.unknown().describe(
          "The horizontal alignment of title in the slicer. If unspecified, defaults to `LEFT`",
        ).optional(),
        textFormat: z.unknown().describe(
          "The text format of title in the slicer. The link field is not supported.",
        ).optional(),
        title: z.unknown().describe("The title of the slicer.").optional(),
      }).describe("The specification of the slicer.").optional(),
    })).describe("The slicers on this sheet.").optional(),
    tables: z.array(z.object({
      columnProperties: z.array(z.unknown()).describe(
        "The table column properties.",
      ).optional(),
      name: z.string().describe(
        "The table name. This is unique to all tables in the same spreadsheet.",
      ).optional(),
      range: z.object({
        endColumnIndex: z.unknown().describe(
          "The end column (exclusive) of the range, or not set if unbounded.",
        ).optional(),
        endRowIndex: z.unknown().describe(
          "The end row (exclusive) of the range, or not set if unbounded.",
        ).optional(),
        sheetId: z.unknown().describe("The sheet this range is on.").optional(),
        startColumnIndex: z.unknown().describe(
          "The start column (inclusive) of the range, or not set if unbounded.",
        ).optional(),
        startRowIndex: z.unknown().describe(
          "The start row (inclusive) of the range, or not set if unbounded.",
        ).optional(),
      }).describe("The table range.").optional(),
      rowsProperties: z.object({
        firstBandColorStyle: z.unknown().describe(
          "The first color that is alternating. If this field is set, the first banded row is filled with the specified color. Otherwise, the first banded row is filled with a default color.",
        ).optional(),
        footerColorStyle: z.unknown().describe(
          "The color of the last row. If this field is not set a footer is not added, the last row is filled with either first_band_color_style or second_band_color_style, depending on the color of the previous row. If updating an existing table without a footer to have a footer, the range will be expanded by 1 row. If updating an existing table with a footer and removing a footer, the range will be shrunk by 1 row.",
        ).optional(),
        headerColorStyle: z.unknown().describe(
          "The color of the header row. If this field is set, the header row is filled with the specified color. Otherwise, the header row is filled with a default color.",
        ).optional(),
        secondBandColorStyle: z.unknown().describe(
          "The second color that is alternating. If this field is set, the second banded row is filled with the specified color. Otherwise, the second banded row is filled with a default color.",
        ).optional(),
      }).describe("The table rows properties.").optional(),
      tableId: z.string().describe("The id of the table.").optional(),
    })).describe("The tables on this sheet.").optional(),
  })).describe("The sheets that are part of a spreadsheet.").optional(),
  spreadsheetId: z.string().describe(
    "The ID of the spreadsheet. This field is read-only.",
  ).optional(),
  spreadsheetUrl: z.string().describe(
    "The url of the spreadsheet. This field is read-only.",
  ).optional(),
});

const StateSchema = z.object({
  comments: z.array(z.object({
    anchorId: z.string(),
    commentId: z.string(),
    headPost: z.object({
      assigneeEmail: z.string(),
      author: z.object({
        anonymous: z.boolean(),
        displayName: z.string(),
        me: z.boolean(),
        user: z.string(),
      }),
      commentAction: z.string(),
      content: z.string(),
      contentHtml: z.string(),
      createTime: z.string(),
      deleted: z.boolean(),
      fromCopiedSpreadsheet: z.boolean(),
      fromImportedSpreadsheet: z.boolean(),
      postId: z.string(),
      updateTime: z.string(),
    }),
    plainTextQuote: z.string(),
    replies: z.array(z.object({
      assigneeEmail: z.string(),
      author: z.object({
        anonymous: z.unknown(),
        displayName: z.unknown(),
        me: z.unknown(),
        user: z.unknown(),
      }),
      commentAction: z.string(),
      content: z.string(),
      contentHtml: z.string(),
      createTime: z.string(),
      deleted: z.boolean(),
      fromCopiedSpreadsheet: z.boolean(),
      fromImportedSpreadsheet: z.boolean(),
      postId: z.string(),
      updateTime: z.string(),
    })),
    status: z.string(),
  })).optional(),
  commentsViewMode: z.string().optional(),
  dataSourceSchedules: z.array(z.object({
    dailySchedule: z.object({
      startTime: z.object({
        hours: z.number(),
        minutes: z.number(),
        nanos: z.number(),
        seconds: z.number(),
      }),
    }),
    enabled: z.boolean(),
    monthlySchedule: z.object({
      daysOfMonth: z.array(z.number()),
      startTime: z.object({
        hours: z.number(),
        minutes: z.number(),
        nanos: z.number(),
        seconds: z.number(),
      }),
    }),
    nextRun: z.object({
      endTime: z.string(),
      startTime: z.string(),
    }),
    refreshScope: z.string(),
    weeklySchedule: z.object({
      daysOfWeek: z.array(z.string()),
      startTime: z.object({
        hours: z.number(),
        minutes: z.number(),
        nanos: z.number(),
        seconds: z.number(),
      }),
    }),
  })).optional(),
  dataSources: z.array(z.object({
    calculatedColumns: z.array(z.object({
      formula: z.string(),
      reference: z.object({
        name: z.unknown(),
      }),
    })),
    dataSourceId: z.string(),
    sheetId: z.number(),
    spec: z.object({
      bigQuery: z.object({
        projectId: z.string(),
        querySpec: z.object({
          rawQuery: z.unknown(),
        }),
        tableSpec: z.object({
          datasetId: z.unknown(),
          tableId: z.unknown(),
          tableProjectId: z.unknown(),
        }),
      }),
      looker: z.object({
        explore: z.string(),
        instanceUri: z.string(),
        model: z.string(),
      }),
      parameters: z.array(z.object({
        name: z.unknown(),
        namedRangeId: z.unknown(),
        range: z.unknown(),
      })),
    }),
  })).optional(),
  developerMetadata: z.array(z.object({
    location: z.object({
      dimensionRange: z.object({
        dimension: z.string(),
        endIndex: z.number(),
        sheetId: z.number(),
        startIndex: z.number(),
      }),
      locationType: z.string(),
      sheetId: z.number(),
      spreadsheet: z.boolean(),
    }),
    metadataId: z.number(),
    metadataKey: z.string(),
    metadataValue: z.string(),
    visibility: z.string(),
  })).optional(),
  namedRanges: z.array(z.object({
    name: z.string(),
    namedRangeId: z.string(),
    range: z.object({
      endColumnIndex: z.number(),
      endRowIndex: z.number(),
      sheetId: z.number(),
      startColumnIndex: z.number(),
      startRowIndex: z.number(),
    }),
  })).optional(),
  properties: z.object({
    autoRecalc: z.string(),
    defaultFormat: z.object({
      backgroundColor: z.object({
        alpha: z.number(),
        blue: z.number(),
        green: z.number(),
        red: z.number(),
      }),
      backgroundColorStyle: z.object({
        rgbColor: z.object({
          alpha: z.number(),
          blue: z.number(),
          green: z.number(),
          red: z.number(),
        }),
        themeColor: z.string(),
      }),
      borders: z.object({
        bottom: z.object({
          color: z.object({
            alpha: z.unknown(),
            blue: z.unknown(),
            green: z.unknown(),
            red: z.unknown(),
          }),
          colorStyle: z.object({
            rgbColor: z.unknown(),
            themeColor: z.unknown(),
          }),
          style: z.string(),
          width: z.number(),
        }),
        left: z.object({
          color: z.object({
            alpha: z.unknown(),
            blue: z.unknown(),
            green: z.unknown(),
            red: z.unknown(),
          }),
          colorStyle: z.object({
            rgbColor: z.unknown(),
            themeColor: z.unknown(),
          }),
          style: z.string(),
          width: z.number(),
        }),
        right: z.object({
          color: z.object({
            alpha: z.unknown(),
            blue: z.unknown(),
            green: z.unknown(),
            red: z.unknown(),
          }),
          colorStyle: z.object({
            rgbColor: z.unknown(),
            themeColor: z.unknown(),
          }),
          style: z.string(),
          width: z.number(),
        }),
        top: z.object({
          color: z.object({
            alpha: z.unknown(),
            blue: z.unknown(),
            green: z.unknown(),
            red: z.unknown(),
          }),
          colorStyle: z.object({
            rgbColor: z.unknown(),
            themeColor: z.unknown(),
          }),
          style: z.string(),
          width: z.number(),
        }),
      }),
      horizontalAlignment: z.string(),
      hyperlinkDisplayType: z.string(),
      numberFormat: z.object({
        pattern: z.string(),
        type: z.string(),
      }),
      padding: z.object({
        bottom: z.number(),
        left: z.number(),
        right: z.number(),
        top: z.number(),
      }),
      textDirection: z.string(),
      textFormat: z.object({
        bold: z.boolean(),
        fontFamily: z.string(),
        fontSize: z.number(),
        foregroundColor: z.object({
          alpha: z.number(),
          blue: z.number(),
          green: z.number(),
          red: z.number(),
        }),
        foregroundColorStyle: z.object({
          rgbColor: z.object({
            alpha: z.unknown(),
            blue: z.unknown(),
            green: z.unknown(),
            red: z.unknown(),
          }),
          themeColor: z.string(),
        }),
        italic: z.boolean(),
        link: z.object({
          uri: z.string(),
        }),
        strikethrough: z.boolean(),
        underline: z.boolean(),
      }),
      textRotation: z.object({
        angle: z.number(),
        vertical: z.boolean(),
      }),
      verticalAlignment: z.string(),
      wrapStrategy: z.string(),
    }),
    importFunctionsExternalUrlAccessAllowed: z.boolean(),
    iterativeCalculationSettings: z.object({
      convergenceThreshold: z.number(),
      maxIterations: z.number(),
    }),
    locale: z.string(),
    spreadsheetTheme: z.object({
      primaryFontFamily: z.string(),
      themeColors: z.array(z.object({
        color: z.object({
          rgbColor: z.unknown(),
          themeColor: z.unknown(),
        }),
        colorType: z.string(),
      })),
    }),
    timeZone: z.string(),
    title: z.string(),
  }).optional(),
  sheets: z.array(z.object({
    bandedRanges: z.array(z.object({
      bandedRangeId: z.number(),
      bandedRangeReference: z.string(),
      columnProperties: z.object({
        firstBandColor: z.unknown(),
        firstBandColorStyle: z.unknown(),
        footerColor: z.unknown(),
        footerColorStyle: z.unknown(),
        headerColor: z.unknown(),
        headerColorStyle: z.unknown(),
        secondBandColor: z.unknown(),
        secondBandColorStyle: z.unknown(),
      }),
      range: z.object({
        endColumnIndex: z.unknown(),
        endRowIndex: z.unknown(),
        sheetId: z.unknown(),
        startColumnIndex: z.unknown(),
        startRowIndex: z.unknown(),
      }),
      rowProperties: z.object({
        firstBandColor: z.unknown(),
        firstBandColorStyle: z.unknown(),
        footerColor: z.unknown(),
        footerColorStyle: z.unknown(),
        headerColor: z.unknown(),
        headerColorStyle: z.unknown(),
        secondBandColor: z.unknown(),
        secondBandColorStyle: z.unknown(),
      }),
    })),
    basicFilter: z.object({
      criteria: z.record(z.string(), z.unknown()),
      filterSpecs: z.array(z.object({
        columnIndex: z.unknown(),
        dataSourceColumnReference: z.unknown(),
        filterCriteria: z.unknown(),
      })),
      range: z.object({
        endColumnIndex: z.number(),
        endRowIndex: z.number(),
        sheetId: z.number(),
        startColumnIndex: z.number(),
        startRowIndex: z.number(),
      }),
      sortSpecs: z.array(z.object({
        backgroundColor: z.unknown(),
        backgroundColorStyle: z.unknown(),
        dataSourceColumnReference: z.unknown(),
        dimensionIndex: z.unknown(),
        foregroundColor: z.unknown(),
        foregroundColorStyle: z.unknown(),
        sortOrder: z.unknown(),
      })),
      tableId: z.string(),
    }),
    charts: z.array(z.object({
      border: z.object({
        color: z.unknown(),
        colorStyle: z.unknown(),
      }),
      chartId: z.number(),
      position: z.object({
        newSheet: z.unknown(),
        overlayPosition: z.unknown(),
        sheetId: z.unknown(),
      }),
      spec: z.object({
        altText: z.unknown(),
        backgroundColor: z.unknown(),
        backgroundColorStyle: z.unknown(),
        basicChart: z.unknown(),
        bubbleChart: z.unknown(),
        candlestickChart: z.unknown(),
        dataSourceChartProperties: z.unknown(),
        filterSpecs: z.unknown(),
        fontName: z.unknown(),
        hiddenDimensionStrategy: z.unknown(),
        histogramChart: z.unknown(),
        maximized: z.unknown(),
        orgChart: z.unknown(),
        pieChart: z.unknown(),
        scorecardChart: z.unknown(),
        sortSpecs: z.unknown(),
        subtitle: z.unknown(),
        subtitleTextFormat: z.unknown(),
        subtitleTextPosition: z.unknown(),
        title: z.unknown(),
        titleTextFormat: z.unknown(),
        titleTextPosition: z.unknown(),
        treemapChart: z.unknown(),
        waterfallChart: z.unknown(),
      }),
    })),
    columnGroups: z.array(z.object({
      collapsed: z.boolean(),
      depth: z.number(),
      range: z.object({
        dimension: z.unknown(),
        endIndex: z.unknown(),
        sheetId: z.unknown(),
        startIndex: z.unknown(),
      }),
    })),
    commentAnchors: z.array(z.object({
      anchorId: z.string(),
      range: z.object({
        endColumnIndex: z.unknown(),
        endRowIndex: z.unknown(),
        sheetId: z.unknown(),
        startColumnIndex: z.unknown(),
        startRowIndex: z.unknown(),
      }),
    })),
    conditionalFormats: z.array(z.object({
      booleanRule: z.object({
        condition: z.unknown(),
        format: z.unknown(),
      }),
      gradientRule: z.object({
        maxpoint: z.unknown(),
        midpoint: z.unknown(),
        minpoint: z.unknown(),
      }),
      ranges: z.array(z.unknown()),
    })),
    data: z.array(z.object({
      columnMetadata: z.array(z.unknown()),
      rowData: z.array(z.unknown()),
      rowMetadata: z.array(z.unknown()),
      startColumn: z.number(),
      startRow: z.number(),
    })),
    developerMetadata: z.array(z.object({
      location: z.object({
        dimensionRange: z.unknown(),
        locationType: z.unknown(),
        sheetId: z.unknown(),
        spreadsheet: z.unknown(),
      }),
      metadataId: z.number(),
      metadataKey: z.string(),
      metadataValue: z.string(),
      visibility: z.string(),
    })),
    filterViews: z.array(z.object({
      criteria: z.record(z.string(), z.unknown()),
      filterSpecs: z.array(z.unknown()),
      filterViewId: z.number(),
      namedRangeId: z.string(),
      range: z.object({
        endColumnIndex: z.unknown(),
        endRowIndex: z.unknown(),
        sheetId: z.unknown(),
        startColumnIndex: z.unknown(),
        startRowIndex: z.unknown(),
      }),
      sortSpecs: z.array(z.unknown()),
      tableId: z.string(),
      title: z.string(),
    })),
    merges: z.array(z.object({
      endColumnIndex: z.number(),
      endRowIndex: z.number(),
      sheetId: z.number(),
      startColumnIndex: z.number(),
      startRowIndex: z.number(),
    })),
    properties: z.object({
      dataSourceSheetProperties: z.object({
        columns: z.array(z.unknown()),
        dataExecutionStatus: z.object({
          errorCode: z.unknown(),
          errorMessage: z.unknown(),
          lastRefreshTime: z.unknown(),
          state: z.unknown(),
        }),
        dataSourceId: z.string(),
      }),
      gridProperties: z.object({
        columnCount: z.number(),
        columnGroupControlAfter: z.boolean(),
        frozenColumnCount: z.number(),
        frozenRowCount: z.number(),
        hideGridlines: z.boolean(),
        rowCount: z.number(),
        rowGroupControlAfter: z.boolean(),
      }),
      hidden: z.boolean(),
      index: z.number(),
      rightToLeft: z.boolean(),
      sheetId: z.number(),
      sheetType: z.string(),
      tabColor: z.object({
        alpha: z.number(),
        blue: z.number(),
        green: z.number(),
        red: z.number(),
      }),
      tabColorStyle: z.object({
        rgbColor: z.object({
          alpha: z.unknown(),
          blue: z.unknown(),
          green: z.unknown(),
          red: z.unknown(),
        }),
        themeColor: z.string(),
      }),
      title: z.string(),
    }),
    protectedRanges: z.array(z.object({
      description: z.string(),
      editors: z.object({
        domainUsersCanEdit: z.unknown(),
        groups: z.unknown(),
        users: z.unknown(),
      }),
      namedRangeId: z.string(),
      protectedRangeId: z.number(),
      range: z.object({
        endColumnIndex: z.unknown(),
        endRowIndex: z.unknown(),
        sheetId: z.unknown(),
        startColumnIndex: z.unknown(),
        startRowIndex: z.unknown(),
      }),
      requestingUserCanEdit: z.boolean(),
      tableId: z.string(),
      unprotectedRanges: z.array(z.unknown()),
      warningOnly: z.boolean(),
    })),
    rowGroups: z.array(z.object({
      collapsed: z.boolean(),
      depth: z.number(),
      range: z.object({
        dimension: z.unknown(),
        endIndex: z.unknown(),
        sheetId: z.unknown(),
        startIndex: z.unknown(),
      }),
    })),
    slicers: z.array(z.object({
      position: z.object({
        newSheet: z.unknown(),
        overlayPosition: z.unknown(),
        sheetId: z.unknown(),
      }),
      slicerId: z.number(),
      spec: z.object({
        applyToPivotTables: z.unknown(),
        backgroundColor: z.unknown(),
        backgroundColorStyle: z.unknown(),
        columnIndex: z.unknown(),
        dataRange: z.unknown(),
        filterCriteria: z.unknown(),
        horizontalAlignment: z.unknown(),
        textFormat: z.unknown(),
        title: z.unknown(),
      }),
    })),
    tables: z.array(z.object({
      columnProperties: z.array(z.unknown()),
      name: z.string(),
      range: z.object({
        endColumnIndex: z.unknown(),
        endRowIndex: z.unknown(),
        sheetId: z.unknown(),
        startColumnIndex: z.unknown(),
        startRowIndex: z.unknown(),
      }),
      rowsProperties: z.object({
        firstBandColorStyle: z.unknown(),
        footerColorStyle: z.unknown(),
        headerColorStyle: z.unknown(),
        secondBandColorStyle: z.unknown(),
      }),
      tableId: z.string(),
    })),
  })).optional(),
  spreadsheetId: z.string().optional(),
  spreadsheetUrl: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  comments: z.array(z.object({
    anchorId: z.string().describe(
      "The ID of the CommentAnchor in the sheet that this thread is tied to.",
    ).optional(),
    commentId: z.string().describe("The unique ID of the comment thread.")
      .optional(),
    headPost: z.object({
      assigneeEmail: z.string().describe(
        "Optional. The email of the user who is being newly assigned to the thread as part of this post. Returns a 400 bad request error if: - The parent thread is a CommentThread whose headPost does not have an assignee. - commentAction is specified as `RESOLVE` or `REOPEN`. - `assignee_email` exceeds 2048 UTF-8 code units.",
      ).optional(),
      author: z.object({
        anonymous: z.boolean().describe("Whether the user is anonymous.")
          .optional(),
        displayName: z.string().describe(
          "The display name of the user. May be absent if the author is anonymous.",
        ).optional(),
        me: z.boolean().describe(
          "Whether the user is the authenticated user making the request.",
        ).optional(),
        user: z.string().describe(
          "The resource name of the post author user, which can also be used to identify the user in the [Google People API](https://developers.google.com/people/api/rest/v1/people). Format: `users/{user}`. Will not be populated if the anonymous field is `true` or if the post is from an imported spreadsheet.",
        ).optional(),
      }).describe("Output only. The user who created the post.").optional(),
      commentAction: z.enum([
        "COMMENT_ACTION_TYPE_UNSPECIFIED",
        "NO_COMMENT_ACTION_CHANGE",
        "RESOLVE",
        "REOPEN",
      ]).describe("Action taken as part of creating the post.").optional(),
      content: z.string().describe(
        "The content of the post. Required to be non-empty if comment_action is not `RESOLVE` or `REOPEN`. This text content will be handled similarly to comments created in the Sheets editor. It will have similar behaviors for formatting, notifications, etc. May not exceed 2048 UTF-8 code units.",
      ).optional(),
      contentHtml: z.string().describe(
        "Output only. The content of the post as HTML.",
      ).optional(),
      createTime: z.string().describe(
        "Output only. The time the post was created.",
      ).optional(),
      deleted: z.boolean().describe(
        "Output only. Whether the post is deleted. If `true`, content and author fields will be empty.",
      ).optional(),
      fromCopiedSpreadsheet: z.boolean().describe(
        "Output only. Whether the post is from a copied spreadsheet. This field cannot be set directly by callers.",
      ).optional(),
      fromImportedSpreadsheet: z.boolean().describe(
        "Output only. Whether the post is from an imported spreadsheet. This field cannot be set directly by callers.",
      ).optional(),
      postId: z.string().describe("Output only. The unique ID of the post.")
        .optional(),
      updateTime: z.string().describe(
        "Output only. The time the post was last updated.",
      ).optional(),
    }).describe("The first post in the thread.").optional(),
    plainTextQuote: z.string().describe(
      "The quoted text from the spreadsheet when the comment was created, formatted as plain-text.",
    ).optional(),
    replies: z.array(z.object({
      assigneeEmail: z.string().describe(
        "Optional. The email of the user who is being newly assigned to the thread as part of this post. Returns a 400 bad request error if: - The parent thread is a CommentThread whose headPost does not have an assignee. - commentAction is specified as `RESOLVE` or `REOPEN`. - `assignee_email` exceeds 2048 UTF-8 code units.",
      ).optional(),
      author: z.object({
        anonymous: z.unknown().describe("Whether the user is anonymous.")
          .optional(),
        displayName: z.unknown().describe(
          "The display name of the user. May be absent if the author is anonymous.",
        ).optional(),
        me: z.unknown().describe(
          "Whether the user is the authenticated user making the request.",
        ).optional(),
        user: z.unknown().describe(
          "The resource name of the post author user, which can also be used to identify the user in the [Google People API](https://developers.google.com/people/api/rest/v1/people). Format: `users/{user}`. Will not be populated if the anonymous field is `true` or if the post is from an imported spreadsheet.",
        ).optional(),
      }).describe("Output only. The user who created the post.").optional(),
      commentAction: z.enum([
        "COMMENT_ACTION_TYPE_UNSPECIFIED",
        "NO_COMMENT_ACTION_CHANGE",
        "RESOLVE",
        "REOPEN",
      ]).describe("Action taken as part of creating the post.").optional(),
      content: z.string().describe(
        "The content of the post. Required to be non-empty if comment_action is not `RESOLVE` or `REOPEN`. This text content will be handled similarly to comments created in the Sheets editor. It will have similar behaviors for formatting, notifications, etc. May not exceed 2048 UTF-8 code units.",
      ).optional(),
      contentHtml: z.string().describe(
        "Output only. The content of the post as HTML.",
      ).optional(),
      createTime: z.string().describe(
        "Output only. The time the post was created.",
      ).optional(),
      deleted: z.boolean().describe(
        "Output only. Whether the post is deleted. If `true`, content and author fields will be empty.",
      ).optional(),
      fromCopiedSpreadsheet: z.boolean().describe(
        "Output only. Whether the post is from a copied spreadsheet. This field cannot be set directly by callers.",
      ).optional(),
      fromImportedSpreadsheet: z.boolean().describe(
        "Output only. Whether the post is from an imported spreadsheet. This field cannot be set directly by callers.",
      ).optional(),
      postId: z.string().describe("Output only. The unique ID of the post.")
        .optional(),
      updateTime: z.string().describe(
        "Output only. The time the post was last updated.",
      ).optional(),
    })).describe("Replies to the head post.").optional(),
    status: z.enum(["STATUS_UNSPECIFIED", "OPEN", "RESOLVED"]).describe(
      "Whether the thread is open or resolved.",
    ).optional(),
  })).describe(
    "The comment threads associated with the spreadsheet. [Developer Preview](https://developers.google.com/workspace/preview).",
  ).optional(),
  dataSources: z.array(z.object({
    calculatedColumns: z.array(z.object({
      formula: z.string().describe("The formula of the calculated column.")
        .optional(),
      reference: z.object({
        name: z.unknown().describe(
          "The display name of the column. It should be unique within a data source.",
        ).optional(),
      }).describe("The column reference.").optional(),
    })).describe("All calculated columns in the data source.").optional(),
    dataSourceId: z.string().describe(
      "The spreadsheet-scoped unique ID that identifies the data source. Example: 1080547365.",
    ).optional(),
    sheetId: z.number().int().describe(
      "The ID of the Sheet connected with the data source. The field cannot be changed once set. When creating a data source, an associated DATA_SOURCE sheet is also created, if the field is not specified, the ID of the created sheet will be randomly generated.",
    ).optional(),
    spec: z.object({
      bigQuery: z.object({
        projectId: z.string().describe(
          "The ID of a BigQuery enabled Google Cloud project with a billing account attached. For any queries executed against the data source, the project is charged.",
        ).optional(),
        querySpec: z.object({
          rawQuery: z.unknown().describe("The raw query string.").optional(),
        }).describe("A BigQueryQuerySpec.").optional(),
        tableSpec: z.object({
          datasetId: z.unknown().describe("The BigQuery dataset id.")
            .optional(),
          tableId: z.unknown().describe("The BigQuery table id.").optional(),
          tableProjectId: z.unknown().describe(
            "The ID of a BigQuery project the table belongs to. If not specified, the project_id is assumed.",
          ).optional(),
        }).describe("A BigQueryTableSpec.").optional(),
      }).describe("A BigQueryDataSourceSpec.").optional(),
      looker: z.object({
        explore: z.string().describe("Name of a Looker model explore.")
          .optional(),
        instanceUri: z.string().describe("A Looker instance URL.").optional(),
        model: z.string().describe("Name of a Looker model.").optional(),
      }).describe("A LookerDatasourceSpec.").optional(),
      parameters: z.array(z.object({
        name: z.unknown().describe(
          "Named parameter. Must be a legitimate identifier for the DataSource that supports it. For example, [BigQuery identifier](https://cloud.google.com/bigquery/docs/reference/standard-sql/lexical#identifiers).",
        ).optional(),
        namedRangeId: z.unknown().describe(
          "ID of a NamedRange. Its size must be 1x1.",
        ).optional(),
        range: z.unknown().describe(
          "A range that contains the value of the parameter. Its size must be 1x1.",
        ).optional(),
      })).describe(
        "The parameters of the data source, used when querying the data source.",
      ).optional(),
    }).describe(
      "The DataSourceSpec for the data source connected with this spreadsheet.",
    ).optional(),
  })).describe(
    "A list of external data sources connected with the spreadsheet.",
  ).optional(),
  developerMetadata: z.array(z.object({
    location: z.object({
      dimensionRange: z.object({
        dimension: z.enum(["DIMENSION_UNSPECIFIED", "ROWS", "COLUMNS"])
          .describe("The dimension of the span.").optional(),
        endIndex: z.number().int().describe(
          "The end (exclusive) of the span, or not set if unbounded.",
        ).optional(),
        sheetId: z.number().int().describe("The sheet this span is on.")
          .optional(),
        startIndex: z.number().int().describe(
          "The start (inclusive) of the span, or not set if unbounded.",
        ).optional(),
      }).describe(
        "Represents the row or column when metadata is associated with a dimension. The specified DimensionRange must represent a single row or column. It cannot be unbounded or span multiple rows or columns.",
      ).optional(),
      locationType: z.enum([
        "DEVELOPER_METADATA_LOCATION_TYPE_UNSPECIFIED",
        "ROW",
        "COLUMN",
        "SHEET",
        "SPREADSHEET",
      ]).describe(
        "The type of location this object represents. This field is read-only.",
      ).optional(),
      sheetId: z.number().int().describe(
        "The ID of the sheet when metadata is associated with an entire sheet.",
      ).optional(),
      spreadsheet: z.boolean().describe(
        "True when metadata is associated with an entire spreadsheet.",
      ).optional(),
    }).describe("The location where the metadata is associated.").optional(),
    metadataId: z.number().int().describe(
      "The spreadsheet-scoped unique ID that identifies the metadata. IDs may be specified when metadata is created, otherwise one will be randomly generated and assigned. Must be positive.",
    ).optional(),
    metadataKey: z.string().describe(
      "The metadata key. There may be multiple metadata in a spreadsheet with the same key. Developer metadata must always have a key specified.",
    ).optional(),
    metadataValue: z.string().describe(
      "Data associated with the metadata's key.",
    ).optional(),
    visibility: z.enum([
      "DEVELOPER_METADATA_VISIBILITY_UNSPECIFIED",
      "DOCUMENT",
      "PROJECT",
    ]).describe(
      "The metadata visibility. Developer metadata must always have visibility specified.",
    ).optional(),
  })).describe("The developer metadata associated with a spreadsheet.")
    .optional(),
  namedRanges: z.array(z.object({
    name: z.string().describe("The name of the named range.").optional(),
    namedRangeId: z.string().describe("The ID of the named range.").optional(),
    range: z.object({
      endColumnIndex: z.number().int().describe(
        "The end column (exclusive) of the range, or not set if unbounded.",
      ).optional(),
      endRowIndex: z.number().int().describe(
        "The end row (exclusive) of the range, or not set if unbounded.",
      ).optional(),
      sheetId: z.number().int().describe("The sheet this range is on.")
        .optional(),
      startColumnIndex: z.number().int().describe(
        "The start column (inclusive) of the range, or not set if unbounded.",
      ).optional(),
      startRowIndex: z.number().int().describe(
        "The start row (inclusive) of the range, or not set if unbounded.",
      ).optional(),
    }).describe("The range this represents.").optional(),
  })).describe("The named ranges defined in a spreadsheet.").optional(),
  properties: z.object({
    autoRecalc: z.enum([
      "RECALCULATION_INTERVAL_UNSPECIFIED",
      "ON_CHANGE",
      "MINUTE",
      "HOUR",
    ]).describe(
      "The amount of time to wait before volatile functions are recalculated.",
    ).optional(),
    defaultFormat: z.object({
      backgroundColor: z.object({
        alpha: z.number().describe(
          "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
        ).optional(),
        blue: z.number().describe(
          "The amount of blue in the color as a value in the interval [0, 1].",
        ).optional(),
        green: z.number().describe(
          "The amount of green in the color as a value in the interval [0, 1].",
        ).optional(),
        red: z.number().describe(
          "The amount of red in the color as a value in the interval [0, 1].",
        ).optional(),
      }).describe(
        "The background color of the cell. Deprecated: Use background_color_style.",
      ).optional(),
      backgroundColorStyle: z.object({
        rgbColor: z.object({
          alpha: z.number().describe(
            "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
          ).optional(),
          blue: z.number().describe(
            "The amount of blue in the color as a value in the interval [0, 1].",
          ).optional(),
          green: z.number().describe(
            "The amount of green in the color as a value in the interval [0, 1].",
          ).optional(),
          red: z.number().describe(
            "The amount of red in the color as a value in the interval [0, 1].",
          ).optional(),
        }).describe(
          "RGB color. The [`alpha`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#Color.FIELDS.alpha) value in the [`Color`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#color) object isn't generally supported.",
        ).optional(),
        themeColor: z.enum([
          "THEME_COLOR_TYPE_UNSPECIFIED",
          "TEXT",
          "BACKGROUND",
          "ACCENT1",
          "ACCENT2",
          "ACCENT3",
          "ACCENT4",
          "ACCENT5",
          "ACCENT6",
          "LINK",
        ]).describe("Theme color.").optional(),
      }).describe(
        "The background color of the cell. If background_color is also set, this field takes precedence.",
      ).optional(),
      borders: z.object({
        bottom: z.object({
          color: z.object({
            alpha: z.unknown().describe(
              "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
            ).optional(),
            blue: z.unknown().describe(
              "The amount of blue in the color as a value in the interval [0, 1].",
            ).optional(),
            green: z.unknown().describe(
              "The amount of green in the color as a value in the interval [0, 1].",
            ).optional(),
            red: z.unknown().describe(
              "The amount of red in the color as a value in the interval [0, 1].",
            ).optional(),
          }).describe("The color of the border. Deprecated: Use color_style.")
            .optional(),
          colorStyle: z.object({
            rgbColor: z.unknown().describe(
              "RGB color. The [`alpha`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#Color.FIELDS.alpha) value in the [`Color`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#color) object isn't generally supported.",
            ).optional(),
            themeColor: z.unknown().describe("Theme color.").optional(),
          }).describe(
            "The color of the border. If color is also set, this field takes precedence.",
          ).optional(),
          style: z.enum([
            "STYLE_UNSPECIFIED",
            "DOTTED",
            "DASHED",
            "SOLID",
            "SOLID_MEDIUM",
            "SOLID_THICK",
            "NONE",
            "DOUBLE",
          ]).describe("The style of the border.").optional(),
          width: z.number().int().describe(
            'The width of the border, in pixels. Deprecated; the width is determined by the "style" field.',
          ).optional(),
        }).describe("The bottom border of the cell.").optional(),
        left: z.object({
          color: z.object({
            alpha: z.unknown().describe(
              "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
            ).optional(),
            blue: z.unknown().describe(
              "The amount of blue in the color as a value in the interval [0, 1].",
            ).optional(),
            green: z.unknown().describe(
              "The amount of green in the color as a value in the interval [0, 1].",
            ).optional(),
            red: z.unknown().describe(
              "The amount of red in the color as a value in the interval [0, 1].",
            ).optional(),
          }).describe("The color of the border. Deprecated: Use color_style.")
            .optional(),
          colorStyle: z.object({
            rgbColor: z.unknown().describe(
              "RGB color. The [`alpha`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#Color.FIELDS.alpha) value in the [`Color`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#color) object isn't generally supported.",
            ).optional(),
            themeColor: z.unknown().describe("Theme color.").optional(),
          }).describe(
            "The color of the border. If color is also set, this field takes precedence.",
          ).optional(),
          style: z.enum([
            "STYLE_UNSPECIFIED",
            "DOTTED",
            "DASHED",
            "SOLID",
            "SOLID_MEDIUM",
            "SOLID_THICK",
            "NONE",
            "DOUBLE",
          ]).describe("The style of the border.").optional(),
          width: z.number().int().describe(
            'The width of the border, in pixels. Deprecated; the width is determined by the "style" field.',
          ).optional(),
        }).describe("The left border of the cell.").optional(),
        right: z.object({
          color: z.object({
            alpha: z.unknown().describe(
              "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
            ).optional(),
            blue: z.unknown().describe(
              "The amount of blue in the color as a value in the interval [0, 1].",
            ).optional(),
            green: z.unknown().describe(
              "The amount of green in the color as a value in the interval [0, 1].",
            ).optional(),
            red: z.unknown().describe(
              "The amount of red in the color as a value in the interval [0, 1].",
            ).optional(),
          }).describe("The color of the border. Deprecated: Use color_style.")
            .optional(),
          colorStyle: z.object({
            rgbColor: z.unknown().describe(
              "RGB color. The [`alpha`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#Color.FIELDS.alpha) value in the [`Color`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#color) object isn't generally supported.",
            ).optional(),
            themeColor: z.unknown().describe("Theme color.").optional(),
          }).describe(
            "The color of the border. If color is also set, this field takes precedence.",
          ).optional(),
          style: z.enum([
            "STYLE_UNSPECIFIED",
            "DOTTED",
            "DASHED",
            "SOLID",
            "SOLID_MEDIUM",
            "SOLID_THICK",
            "NONE",
            "DOUBLE",
          ]).describe("The style of the border.").optional(),
          width: z.number().int().describe(
            'The width of the border, in pixels. Deprecated; the width is determined by the "style" field.',
          ).optional(),
        }).describe("The right border of the cell.").optional(),
        top: z.object({
          color: z.object({
            alpha: z.unknown().describe(
              "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
            ).optional(),
            blue: z.unknown().describe(
              "The amount of blue in the color as a value in the interval [0, 1].",
            ).optional(),
            green: z.unknown().describe(
              "The amount of green in the color as a value in the interval [0, 1].",
            ).optional(),
            red: z.unknown().describe(
              "The amount of red in the color as a value in the interval [0, 1].",
            ).optional(),
          }).describe("The color of the border. Deprecated: Use color_style.")
            .optional(),
          colorStyle: z.object({
            rgbColor: z.unknown().describe(
              "RGB color. The [`alpha`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#Color.FIELDS.alpha) value in the [`Color`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#color) object isn't generally supported.",
            ).optional(),
            themeColor: z.unknown().describe("Theme color.").optional(),
          }).describe(
            "The color of the border. If color is also set, this field takes precedence.",
          ).optional(),
          style: z.enum([
            "STYLE_UNSPECIFIED",
            "DOTTED",
            "DASHED",
            "SOLID",
            "SOLID_MEDIUM",
            "SOLID_THICK",
            "NONE",
            "DOUBLE",
          ]).describe("The style of the border.").optional(),
          width: z.number().int().describe(
            'The width of the border, in pixels. Deprecated; the width is determined by the "style" field.',
          ).optional(),
        }).describe("The top border of the cell.").optional(),
      }).describe("The borders of the cell.").optional(),
      horizontalAlignment: z.enum([
        "HORIZONTAL_ALIGN_UNSPECIFIED",
        "LEFT",
        "CENTER",
        "RIGHT",
      ]).describe("The horizontal alignment of the value in the cell.")
        .optional(),
      hyperlinkDisplayType: z.enum([
        "HYPERLINK_DISPLAY_TYPE_UNSPECIFIED",
        "LINKED",
        "PLAIN_TEXT",
      ]).describe(
        "If one exists, how a hyperlink should be displayed in the cell.",
      ).optional(),
      numberFormat: z.object({
        pattern: z.string().describe(
          "Pattern string used for formatting. If not set, a default pattern based on the spreadsheet's locale will be used if necessary for the given type. See the [Date and Number Formats guide](https://developers.google.com/workspace/sheets/api/guides/formats) for more information about the supported patterns.",
        ).optional(),
        type: z.enum([
          "NUMBER_FORMAT_TYPE_UNSPECIFIED",
          "TEXT",
          "NUMBER",
          "PERCENT",
          "CURRENCY",
          "DATE",
          "TIME",
          "DATE_TIME",
          "SCIENTIFIC",
        ]).describe(
          "The type of the number format. When writing, this field must be set.",
        ).optional(),
      }).describe(
        "A format describing how number values should be represented to the user.",
      ).optional(),
      padding: z.object({
        bottom: z.number().int().describe("The bottom padding of the cell.")
          .optional(),
        left: z.number().int().describe("The left padding of the cell.")
          .optional(),
        right: z.number().int().describe("The right padding of the cell.")
          .optional(),
        top: z.number().int().describe("The top padding of the cell.")
          .optional(),
      }).describe("The padding of the cell.").optional(),
      textDirection: z.enum([
        "TEXT_DIRECTION_UNSPECIFIED",
        "LEFT_TO_RIGHT",
        "RIGHT_TO_LEFT",
      ]).describe("The direction of the text in the cell.").optional(),
      textFormat: z.object({
        bold: z.boolean().describe("True if the text is bold.").optional(),
        fontFamily: z.string().describe("The font family.").optional(),
        fontSize: z.number().int().describe("The size of the font.").optional(),
        foregroundColor: z.object({
          alpha: z.number().describe(
            "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
          ).optional(),
          blue: z.number().describe(
            "The amount of blue in the color as a value in the interval [0, 1].",
          ).optional(),
          green: z.number().describe(
            "The amount of green in the color as a value in the interval [0, 1].",
          ).optional(),
          red: z.number().describe(
            "The amount of red in the color as a value in the interval [0, 1].",
          ).optional(),
        }).describe(
          "The foreground color of the text. Deprecated: Use foreground_color_style.",
        ).optional(),
        foregroundColorStyle: z.object({
          rgbColor: z.object({
            alpha: z.unknown().describe(
              "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
            ).optional(),
            blue: z.unknown().describe(
              "The amount of blue in the color as a value in the interval [0, 1].",
            ).optional(),
            green: z.unknown().describe(
              "The amount of green in the color as a value in the interval [0, 1].",
            ).optional(),
            red: z.unknown().describe(
              "The amount of red in the color as a value in the interval [0, 1].",
            ).optional(),
          }).describe(
            "RGB color. The [`alpha`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#Color.FIELDS.alpha) value in the [`Color`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#color) object isn't generally supported.",
          ).optional(),
          themeColor: z.enum([
            "THEME_COLOR_TYPE_UNSPECIFIED",
            "TEXT",
            "BACKGROUND",
            "ACCENT1",
            "ACCENT2",
            "ACCENT3",
            "ACCENT4",
            "ACCENT5",
            "ACCENT6",
            "LINK",
          ]).describe("Theme color.").optional(),
        }).describe(
          "The foreground color of the text. If foreground_color is also set, this field takes precedence.",
        ).optional(),
        italic: z.boolean().describe("True if the text is italicized.")
          .optional(),
        link: z.object({
          uri: z.string().describe("The link identifier.").optional(),
        }).describe(
          "The link destination of the text, if any. Setting the link field in a TextFormatRun will clear the cell's existing links or a cell-level link set in the same request. When a link is set, the text foreground color will be set to the default link color and the text will be underlined. If these fields are modified in the same request, those values will be used instead of the link defaults.",
        ).optional(),
        strikethrough: z.boolean().describe(
          "True if the text has a strikethrough.",
        ).optional(),
        underline: z.boolean().describe("True if the text is underlined.")
          .optional(),
      }).describe(
        "The format of the text in the cell (unless overridden by a format run). Setting a cell-level link here clears the cell's existing links. Setting the link field in a TextFormatRun takes precedence over the cell-level link.",
      ).optional(),
      textRotation: z.object({
        angle: z.number().int().describe(
          "The angle between the standard orientation and the desired orientation. Measured in degrees. Valid values are between -90 and 90. Positive angles are angled upwards, negative are angled downwards. Note: For LTR text direction positive angles are in the counterclockwise direction, whereas for RTL they are in the clockwise direction",
        ).optional(),
        vertical: z.boolean().describe(
          "If true, text reads top to bottom, but the orientation of individual characters is unchanged. For example: | V | | e | | r | | t | | i | | c | | a | | l |",
        ).optional(),
      }).describe("The rotation applied to text in the cell.").optional(),
      verticalAlignment: z.enum([
        "VERTICAL_ALIGN_UNSPECIFIED",
        "TOP",
        "MIDDLE",
        "BOTTOM",
      ]).describe("The vertical alignment of the value in the cell.")
        .optional(),
      wrapStrategy: z.enum([
        "WRAP_STRATEGY_UNSPECIFIED",
        "OVERFLOW_CELL",
        "LEGACY_WRAP",
        "CLIP",
        "WRAP",
      ]).describe("The wrap strategy for the value in the cell.").optional(),
    }).describe(
      "The default format of all cells in the spreadsheet. CellData.effectiveFormat will not be set if the cell's format is equal to this default format. This field is read-only.",
    ).optional(),
    importFunctionsExternalUrlAccessAllowed: z.boolean().describe(
      "Whether to allow external URL access for image and import functions. Read only when true. When false, you can set to true. This value will be bypassed and always return true if the admin has enabled the [allowlisting feature](https://support.google.com/a?p=url_allowlist).",
    ).optional(),
    iterativeCalculationSettings: z.object({
      convergenceThreshold: z.number().describe(
        "When iterative calculation is enabled and successive results differ by less than this threshold value, the calculation rounds stop.",
      ).optional(),
      maxIterations: z.number().int().describe(
        "When iterative calculation is enabled, the maximum number of calculation rounds to perform.",
      ).optional(),
    }).describe(
      "Determines whether and how circular references are resolved with iterative calculation. Absence of this field means that circular references result in calculation errors.",
    ).optional(),
    locale: z.string().describe(
      "The locale of the spreadsheet in one of the following formats: * an ISO 639-1 language code such as `en` * an ISO 639-2 language code such as `fil`, if no 639-1 code exists * a combination of the ISO language code and country code, such as `en_US` Note: when updating this field, not all locales/languages are supported.",
    ).optional(),
    spreadsheetTheme: z.object({
      primaryFontFamily: z.string().describe("Name of the primary font family.")
        .optional(),
      themeColors: z.array(z.object({
        color: z.object({
          rgbColor: z.unknown().describe(
            "RGB color. The [`alpha`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#Color.FIELDS.alpha) value in the [`Color`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#color) object isn't generally supported.",
          ).optional(),
          themeColor: z.unknown().describe("Theme color.").optional(),
        }).describe("The concrete color corresponding to the theme color type.")
          .optional(),
        colorType: z.enum([
          "THEME_COLOR_TYPE_UNSPECIFIED",
          "TEXT",
          "BACKGROUND",
          "ACCENT1",
          "ACCENT2",
          "ACCENT3",
          "ACCENT4",
          "ACCENT5",
          "ACCENT6",
          "LINK",
        ]).describe("The type of the spreadsheet theme color.").optional(),
      })).describe(
        "The spreadsheet theme color pairs. To update you must provide all theme color pairs.",
      ).optional(),
    }).describe("Theme applied to the spreadsheet.").optional(),
    timeZone: z.string().describe(
      "The time zone of the spreadsheet, in CLDR format such as `America/New_York`. If the time zone isn't recognized, this may be a custom time zone such as `GMT-07:00`.",
    ).optional(),
    title: z.string().describe("The title of the spreadsheet.").optional(),
  }).describe("Overall properties of a spreadsheet.").optional(),
  sheets: z.array(z.object({
    bandedRanges: z.array(z.object({
      bandedRangeId: z.number().int().describe(
        "The ID of the banded range. If unset, refer to banded_range_reference.",
      ).optional(),
      bandedRangeReference: z.string().describe(
        "Output only. The reference of the banded range, used to identify the ID that is not supported by the banded_range_id.",
      ).optional(),
      columnProperties: z.object({
        firstBandColor: z.unknown().describe(
          "The first color that is alternating. (Required) Deprecated: Use first_band_color_style.",
        ).optional(),
        firstBandColorStyle: z.unknown().describe(
          "The first color that is alternating. (Required) If first_band_color is also set, this field takes precedence.",
        ).optional(),
        footerColor: z.unknown().describe(
          "The color of the last row or column. If this field is not set, the last row or column is filled with either first_band_color or second_band_color, depending on the color of the previous row or column. Deprecated: Use footer_color_style.",
        ).optional(),
        footerColorStyle: z.unknown().describe(
          "The color of the last row or column. If this field is not set, the last row or column is filled with either first_band_color or second_band_color, depending on the color of the previous row or column. If footer_color is also set, this field takes precedence.",
        ).optional(),
        headerColor: z.unknown().describe(
          "The color of the first row or column. If this field is set, the first row or column is filled with this color and the colors alternate between first_band_color and second_band_color starting from the second row or column. Otherwise, the first row or column is filled with first_band_color and the colors proceed to alternate as they normally would. Deprecated: Use header_color_style.",
        ).optional(),
        headerColorStyle: z.unknown().describe(
          "The color of the first row or column. If this field is set, the first row or column is filled with this color and the colors alternate between first_band_color and second_band_color starting from the second row or column. Otherwise, the first row or column is filled with first_band_color and the colors proceed to alternate as they normally would. If header_color is also set, this field takes precedence.",
        ).optional(),
        secondBandColor: z.unknown().describe(
          "The second color that is alternating. (Required) Deprecated: Use second_band_color_style.",
        ).optional(),
        secondBandColorStyle: z.unknown().describe(
          "The second color that is alternating. (Required) If second_band_color is also set, this field takes precedence.",
        ).optional(),
      }).describe(
        "Properties for column bands. These properties are applied on a column- by-column basis throughout all the columns in the range. At least one of row_properties or column_properties must be specified.",
      ).optional(),
      range: z.object({
        endColumnIndex: z.unknown().describe(
          "The end column (exclusive) of the range, or not set if unbounded.",
        ).optional(),
        endRowIndex: z.unknown().describe(
          "The end row (exclusive) of the range, or not set if unbounded.",
        ).optional(),
        sheetId: z.unknown().describe("The sheet this range is on.").optional(),
        startColumnIndex: z.unknown().describe(
          "The start column (inclusive) of the range, or not set if unbounded.",
        ).optional(),
        startRowIndex: z.unknown().describe(
          "The start row (inclusive) of the range, or not set if unbounded.",
        ).optional(),
      }).describe("The range over which these properties are applied.")
        .optional(),
      rowProperties: z.object({
        firstBandColor: z.unknown().describe(
          "The first color that is alternating. (Required) Deprecated: Use first_band_color_style.",
        ).optional(),
        firstBandColorStyle: z.unknown().describe(
          "The first color that is alternating. (Required) If first_band_color is also set, this field takes precedence.",
        ).optional(),
        footerColor: z.unknown().describe(
          "The color of the last row or column. If this field is not set, the last row or column is filled with either first_band_color or second_band_color, depending on the color of the previous row or column. Deprecated: Use footer_color_style.",
        ).optional(),
        footerColorStyle: z.unknown().describe(
          "The color of the last row or column. If this field is not set, the last row or column is filled with either first_band_color or second_band_color, depending on the color of the previous row or column. If footer_color is also set, this field takes precedence.",
        ).optional(),
        headerColor: z.unknown().describe(
          "The color of the first row or column. If this field is set, the first row or column is filled with this color and the colors alternate between first_band_color and second_band_color starting from the second row or column. Otherwise, the first row or column is filled with first_band_color and the colors proceed to alternate as they normally would. Deprecated: Use header_color_style.",
        ).optional(),
        headerColorStyle: z.unknown().describe(
          "The color of the first row or column. If this field is set, the first row or column is filled with this color and the colors alternate between first_band_color and second_band_color starting from the second row or column. Otherwise, the first row or column is filled with first_band_color and the colors proceed to alternate as they normally would. If header_color is also set, this field takes precedence.",
        ).optional(),
        secondBandColor: z.unknown().describe(
          "The second color that is alternating. (Required) Deprecated: Use second_band_color_style.",
        ).optional(),
        secondBandColorStyle: z.unknown().describe(
          "The second color that is alternating. (Required) If second_band_color is also set, this field takes precedence.",
        ).optional(),
      }).describe(
        "Properties for row bands. These properties are applied on a row-by-row basis throughout all the rows in the range. At least one of row_properties or column_properties must be specified.",
      ).optional(),
    })).describe("The banded (alternating colors) ranges on this sheet.")
      .optional(),
    basicFilter: z.object({
      criteria: z.record(
        z.string(),
        z.object({
          condition: z.unknown().describe(
            "A condition that must be `true` for values to be shown. (This does not override hidden_values -- if a value is listed there, it will still be hidden.)",
          ).optional(),
          hiddenValues: z.unknown().describe("Values that should be hidden.")
            .optional(),
          visibleBackgroundColor: z.unknown().describe(
            "The background fill color to filter by; only cells with this fill color are shown. Mutually exclusive with visible_foreground_color. Deprecated: Use visible_background_color_style.",
          ).optional(),
          visibleBackgroundColorStyle: z.unknown().describe(
            "The background fill color to filter by; only cells with this fill color are shown. This field is mutually exclusive with visible_foreground_color, and must be set to an RGB-type color. If visible_background_color is also set, this field takes precedence.",
          ).optional(),
          visibleForegroundColor: z.unknown().describe(
            "The foreground color to filter by; only cells with this foreground color are shown. Mutually exclusive with visible_background_color. Deprecated: Use visible_foreground_color_style.",
          ).optional(),
          visibleForegroundColorStyle: z.unknown().describe(
            "The foreground color to filter by; only cells with this foreground color are shown. This field is mutually exclusive with visible_background_color, and must be set to an RGB-type color. If visible_foreground_color is also set, this field takes precedence.",
          ).optional(),
        }),
      ).describe(
        "The criteria for showing/hiding values per column. The map's key is the column index, and the value is the criteria for that column. This field is deprecated in favor of filter_specs.",
      ).optional(),
      filterSpecs: z.array(z.object({
        columnIndex: z.unknown().describe("The zero-based column index.")
          .optional(),
        dataSourceColumnReference: z.unknown().describe(
          "Reference to a data source column.",
        ).optional(),
        filterCriteria: z.unknown().describe("The criteria for the column.")
          .optional(),
      })).describe(
        "The filter criteria per column. Both criteria and filter_specs are populated in responses. If both fields are specified in an update request, this field takes precedence.",
      ).optional(),
      range: z.object({
        endColumnIndex: z.number().int().describe(
          "The end column (exclusive) of the range, or not set if unbounded.",
        ).optional(),
        endRowIndex: z.number().int().describe(
          "The end row (exclusive) of the range, or not set if unbounded.",
        ).optional(),
        sheetId: z.number().int().describe("The sheet this range is on.")
          .optional(),
        startColumnIndex: z.number().int().describe(
          "The start column (inclusive) of the range, or not set if unbounded.",
        ).optional(),
        startRowIndex: z.number().int().describe(
          "The start row (inclusive) of the range, or not set if unbounded.",
        ).optional(),
      }).describe("The range the filter covers.").optional(),
      sortSpecs: z.array(z.object({
        backgroundColor: z.unknown().describe(
          "The background fill color to sort by; cells with this fill color are sorted to the top. Mutually exclusive with foreground_color. Deprecated: Use background_color_style.",
        ).optional(),
        backgroundColorStyle: z.unknown().describe(
          "The background fill color to sort by; cells with this fill color are sorted to the top. Mutually exclusive with foreground_color, and must be an RGB-type color. If background_color is also set, this field takes precedence.",
        ).optional(),
        dataSourceColumnReference: z.unknown().describe(
          "Reference to a data source column.",
        ).optional(),
        dimensionIndex: z.unknown().describe(
          "The dimension the sort should be applied to.",
        ).optional(),
        foregroundColor: z.unknown().describe(
          "The foreground color to sort by; cells with this foreground color are sorted to the top. Mutually exclusive with background_color. Deprecated: Use foreground_color_style.",
        ).optional(),
        foregroundColorStyle: z.unknown().describe(
          "The foreground color to sort by; cells with this foreground color are sorted to the top. Mutually exclusive with background_color, and must be an RGB-type color. If foreground_color is also set, this field takes precedence.",
        ).optional(),
        sortOrder: z.unknown().describe("The order data should be sorted.")
          .optional(),
      })).describe(
        "The sort order per column. Later specifications are used when values are equal in the earlier specifications.",
      ).optional(),
      tableId: z.string().describe(
        "The table this filter is backed by, if any. When writing, only one of range or table_id may be set.",
      ).optional(),
    }).describe("The filter on this sheet, if any.").optional(),
    charts: z.array(z.object({
      border: z.object({
        color: z.unknown().describe(
          "The color of the border. Deprecated: Use color_style.",
        ).optional(),
        colorStyle: z.unknown().describe(
          "The color of the border. If color is also set, this field takes precedence.",
        ).optional(),
      }).describe("The border of the chart.").optional(),
      chartId: z.number().int().describe("The ID of the chart.").optional(),
      position: z.object({
        newSheet: z.unknown().describe(
          "If true, the embedded object is put on a new sheet whose ID is chosen for you. Used only when writing.",
        ).optional(),
        overlayPosition: z.unknown().describe(
          "The position at which the object is overlaid on top of a grid.",
        ).optional(),
        sheetId: z.unknown().describe(
          "The sheet this is on. Set only if the embedded object is on its own sheet. Must be non-negative.",
        ).optional(),
      }).describe("The position of the chart.").optional(),
      spec: z.object({
        altText: z.unknown().describe(
          "The alternative text that describes the chart. This is often used for accessibility.",
        ).optional(),
        backgroundColor: z.unknown().describe(
          "The background color of the entire chart. Not applicable to Org charts. Deprecated: Use background_color_style.",
        ).optional(),
        backgroundColorStyle: z.unknown().describe(
          "The background color of the entire chart. Not applicable to Org charts. If background_color is also set, this field takes precedence.",
        ).optional(),
        basicChart: z.unknown().describe(
          "A basic chart specification, can be one of many kinds of charts. See BasicChartType for the list of all charts this supports.",
        ).optional(),
        bubbleChart: z.unknown().describe("A bubble chart specification.")
          .optional(),
        candlestickChart: z.unknown().describe(
          "A candlestick chart specification.",
        ).optional(),
        dataSourceChartProperties: z.unknown().describe(
          "If present, the field contains data source chart specific properties.",
        ).optional(),
        filterSpecs: z.unknown().describe(
          "The filters applied to the source data of the chart. Only supported for data source charts.",
        ).optional(),
        fontName: z.unknown().describe(
          "The name of the font to use by default for all chart text (e.g. title, axis labels, legend). If a font is specified for a specific part of the chart it will override this font name.",
        ).optional(),
        hiddenDimensionStrategy: z.unknown().describe(
          "Determines how the charts will use hidden rows or columns.",
        ).optional(),
        histogramChart: z.unknown().describe("A histogram chart specification.")
          .optional(),
        maximized: z.unknown().describe(
          "True to make a chart fill the entire space in which it's rendered with minimum padding. False to use the default padding. (Not applicable to Geo and Org charts.)",
        ).optional(),
        orgChart: z.unknown().describe("An org chart specification.")
          .optional(),
        pieChart: z.unknown().describe("A pie chart specification.").optional(),
        scorecardChart: z.unknown().describe("A scorecard chart specification.")
          .optional(),
        sortSpecs: z.unknown().describe(
          "The order to sort the chart data by. Only a single sort spec is supported. Only supported for data source charts.",
        ).optional(),
        subtitle: z.unknown().describe("The subtitle of the chart.").optional(),
        subtitleTextFormat: z.unknown().describe(
          "The subtitle text format. Strikethrough, underline, and link are not supported.",
        ).optional(),
        subtitleTextPosition: z.unknown().describe(
          "The subtitle text position. This field is optional.",
        ).optional(),
        title: z.unknown().describe("The title of the chart.").optional(),
        titleTextFormat: z.unknown().describe(
          "The title text format. Strikethrough, underline, and link are not supported.",
        ).optional(),
        titleTextPosition: z.unknown().describe(
          "The title text position. This field is optional.",
        ).optional(),
        treemapChart: z.unknown().describe("A treemap chart specification.")
          .optional(),
        waterfallChart: z.unknown().describe("A waterfall chart specification.")
          .optional(),
      }).describe("The specification of the chart.").optional(),
    })).describe("The specifications of every chart on this sheet.").optional(),
    columnGroups: z.array(z.object({
      collapsed: z.boolean().describe(
        "This field is true if this group is collapsed. A collapsed group remains collapsed if an overlapping group at a shallower depth is expanded. A true value does not imply that all dimensions within the group are hidden, since a dimension's visibility can change independently from this group property. However, when this property is updated, all dimensions within it are set to hidden if this field is true, or set to visible if this field is false.",
      ).optional(),
      depth: z.number().int().describe(
        "The depth of the group, representing how many groups have a range that wholly contains the range of this group.",
      ).optional(),
      range: z.object({
        dimension: z.unknown().describe("The dimension of the span.")
          .optional(),
        endIndex: z.unknown().describe(
          "The end (exclusive) of the span, or not set if unbounded.",
        ).optional(),
        sheetId: z.unknown().describe("The sheet this span is on.").optional(),
        startIndex: z.unknown().describe(
          "The start (inclusive) of the span, or not set if unbounded.",
        ).optional(),
      }).describe("The range over which this group exists.").optional(),
    })).describe(
      "All column groups on this sheet, ordered by increasing range start index, then by group depth.",
    ).optional(),
    commentAnchors: z.array(z.object({
      anchorId: z.string().describe(
        "The unique ID of the comment anchor. Output only.",
      ).optional(),
      range: z.object({
        endColumnIndex: z.unknown().describe(
          "The end column (exclusive) of the range, or not set if unbounded.",
        ).optional(),
        endRowIndex: z.unknown().describe(
          "The end row (exclusive) of the range, or not set if unbounded.",
        ).optional(),
        sheetId: z.unknown().describe("The sheet this range is on.").optional(),
        startColumnIndex: z.unknown().describe(
          "The start column (inclusive) of the range, or not set if unbounded.",
        ).optional(),
        startRowIndex: z.unknown().describe(
          "The start row (inclusive) of the range, or not set if unbounded.",
        ).optional(),
      }).describe(
        "The coordinate range inside the sheet where this comment is anchored.",
      ).optional(),
    })).describe(
      "The comment anchors on this sheet. [Developer Preview](https://developers.google.com/workspace/preview).",
    ).optional(),
    conditionalFormats: z.array(z.object({
      booleanRule: z.object({
        condition: z.unknown().describe(
          "The condition of the rule. If the condition evaluates to true, the format is applied.",
        ).optional(),
        format: z.unknown().describe(
          "The format to apply. Conditional formatting can only apply a subset of formatting: bold, italic, strikethrough, foreground color and, background color.",
        ).optional(),
      }).describe(
        'The formatting is either "on" or "off" according to the rule.',
      ).optional(),
      gradientRule: z.object({
        maxpoint: z.unknown().describe("The final interpolation point.")
          .optional(),
        midpoint: z.unknown().describe(
          "An optional midway interpolation point.",
        ).optional(),
        minpoint: z.unknown().describe("The starting interpolation point.")
          .optional(),
      }).describe(
        "The formatting will vary based on the gradients in the rule.",
      ).optional(),
      ranges: z.array(z.unknown()).describe(
        "The ranges that are formatted if the condition is true. All the ranges must be on the same grid.",
      ).optional(),
    })).describe("The conditional format rules in this sheet.").optional(),
    data: z.array(z.object({
      columnMetadata: z.array(z.unknown()).describe(
        "Metadata about the requested columns in the grid, starting with the column in start_column.",
      ).optional(),
      rowData: z.array(z.unknown()).describe(
        "The data in the grid, one entry per row, starting with the row in startRow. The values in RowData will correspond to columns starting at start_column.",
      ).optional(),
      rowMetadata: z.array(z.unknown()).describe(
        "Metadata about the requested rows in the grid, starting with the row in start_row.",
      ).optional(),
      startColumn: z.number().int().describe(
        "The first column this GridData refers to, zero-based.",
      ).optional(),
      startRow: z.number().int().describe(
        "The first row this GridData refers to, zero-based.",
      ).optional(),
    })).describe(
      "Data in the grid, if this is a grid sheet. The number of GridData objects returned is dependent on the number of ranges requested on this sheet. For example, if this is representing `Sheet1`, and the spreadsheet was requested with ranges `Sheet1!A1:C10` and `Sheet1!D15:E20`, then the first GridData will have a startRow/startColumn of `0`, while the second one will have `startRow 14` (zero-based row 15), and `startColumn 3` (zero-based column D). For a DATA_SOURCE sheet, you can not request a specific range, the GridData contains all the values.",
    ).optional(),
    developerMetadata: z.array(z.object({
      location: z.object({
        dimensionRange: z.unknown().describe(
          "Represents the row or column when metadata is associated with a dimension. The specified DimensionRange must represent a single row or column. It cannot be unbounded or span multiple rows or columns.",
        ).optional(),
        locationType: z.unknown().describe(
          "The type of location this object represents. This field is read-only.",
        ).optional(),
        sheetId: z.unknown().describe(
          "The ID of the sheet when metadata is associated with an entire sheet.",
        ).optional(),
        spreadsheet: z.unknown().describe(
          "True when metadata is associated with an entire spreadsheet.",
        ).optional(),
      }).describe("The location where the metadata is associated.").optional(),
      metadataId: z.number().int().describe(
        "The spreadsheet-scoped unique ID that identifies the metadata. IDs may be specified when metadata is created, otherwise one will be randomly generated and assigned. Must be positive.",
      ).optional(),
      metadataKey: z.string().describe(
        "The metadata key. There may be multiple metadata in a spreadsheet with the same key. Developer metadata must always have a key specified.",
      ).optional(),
      metadataValue: z.string().describe(
        "Data associated with the metadata's key.",
      ).optional(),
      visibility: z.enum([
        "DEVELOPER_METADATA_VISIBILITY_UNSPECIFIED",
        "DOCUMENT",
        "PROJECT",
      ]).describe(
        "The metadata visibility. Developer metadata must always have visibility specified.",
      ).optional(),
    })).describe("The developer metadata associated with a sheet.").optional(),
    filterViews: z.array(z.object({
      criteria: z.record(z.string(), z.unknown()).describe(
        "The criteria for showing/hiding values per column. The map's key is the column index, and the value is the criteria for that column. This field is deprecated in favor of filter_specs.",
      ).optional(),
      filterSpecs: z.array(z.unknown()).describe(
        "The filter criteria for showing or hiding values per column. Both criteria and filter_specs are populated in responses. If both fields are specified in an update request, this field takes precedence.",
      ).optional(),
      filterViewId: z.number().int().describe("The ID of the filter view.")
        .optional(),
      namedRangeId: z.string().describe(
        "The named range this filter view is backed by, if any. When writing, only one of range, named_range_id, or table_id may be set.",
      ).optional(),
      range: z.object({
        endColumnIndex: z.unknown().describe(
          "The end column (exclusive) of the range, or not set if unbounded.",
        ).optional(),
        endRowIndex: z.unknown().describe(
          "The end row (exclusive) of the range, or not set if unbounded.",
        ).optional(),
        sheetId: z.unknown().describe("The sheet this range is on.").optional(),
        startColumnIndex: z.unknown().describe(
          "The start column (inclusive) of the range, or not set if unbounded.",
        ).optional(),
        startRowIndex: z.unknown().describe(
          "The start row (inclusive) of the range, or not set if unbounded.",
        ).optional(),
      }).describe(
        "The range this filter view covers. When writing, only one of range, named_range_id, or table_id may be set.",
      ).optional(),
      sortSpecs: z.array(z.unknown()).describe(
        "The sort order per column. Later specifications are used when values are equal in the earlier specifications.",
      ).optional(),
      tableId: z.string().describe(
        "The table this filter view is backed by, if any. When writing, only one of range, named_range_id, or table_id may be set.",
      ).optional(),
      title: z.string().describe("The name of the filter view.").optional(),
    })).describe("The filter views in this sheet.").optional(),
    merges: z.array(z.object({
      endColumnIndex: z.number().int().describe(
        "The end column (exclusive) of the range, or not set if unbounded.",
      ).optional(),
      endRowIndex: z.number().int().describe(
        "The end row (exclusive) of the range, or not set if unbounded.",
      ).optional(),
      sheetId: z.number().int().describe("The sheet this range is on.")
        .optional(),
      startColumnIndex: z.number().int().describe(
        "The start column (inclusive) of the range, or not set if unbounded.",
      ).optional(),
      startRowIndex: z.number().int().describe(
        "The start row (inclusive) of the range, or not set if unbounded.",
      ).optional(),
    })).describe("The ranges that are merged together.").optional(),
    properties: z.object({
      dataSourceSheetProperties: z.object({
        columns: z.array(z.unknown()).describe(
          "The columns displayed on the sheet, corresponding to the values in RowData.",
        ).optional(),
        dataExecutionStatus: z.object({
          errorCode: z.unknown().describe("The error code.").optional(),
          errorMessage: z.unknown().describe(
            "The error message, which may be empty.",
          ).optional(),
          lastRefreshTime: z.unknown().describe(
            "Gets the time the data last successfully refreshed.",
          ).optional(),
          state: z.unknown().describe("The state of the data execution.")
            .optional(),
        }).describe("The data execution status.").optional(),
        dataSourceId: z.string().describe(
          "ID of the DataSource the sheet is connected to.",
        ).optional(),
      }).describe(
        "Output only. If present, the field contains DATA_SOURCE sheet specific properties.",
      ).optional(),
      gridProperties: z.object({
        columnCount: z.number().int().describe(
          "The number of columns in the grid.",
        ).optional(),
        columnGroupControlAfter: z.boolean().describe(
          "True if the column grouping control toggle is shown after the group.",
        ).optional(),
        frozenColumnCount: z.number().int().describe(
          "The number of columns that are frozen in the grid.",
        ).optional(),
        frozenRowCount: z.number().int().describe(
          "The number of rows that are frozen in the grid.",
        ).optional(),
        hideGridlines: z.boolean().describe(
          "True if the grid isn't showing gridlines in the UI.",
        ).optional(),
        rowCount: z.number().int().describe("The number of rows in the grid.")
          .optional(),
        rowGroupControlAfter: z.boolean().describe(
          "True if the row grouping control toggle is shown after the group.",
        ).optional(),
      }).describe(
        "Additional properties of the sheet if this sheet is a grid. (If the sheet is an object sheet, containing a chart or image, then this field will be absent.) When writing it is an error to set any grid properties on non-grid sheets. If this sheet is a DATA_SOURCE sheet, this field is output only but contains the properties that reflect how a data source sheet is rendered in the UI, e.g. row_count.",
      ).optional(),
      hidden: z.boolean().describe(
        "True if the sheet is hidden in the UI, false if it's visible.",
      ).optional(),
      index: z.number().int().describe(
        'The index of the sheet within the spreadsheet. When adding or updating sheet properties, if this field is excluded then the sheet is added or moved to the end of the sheet list. When updating sheet indices or inserting sheets, movement is considered in "before the move" indexes. For example, if there were three sheets (S1, S2, S3) in order to move S1 ahead of S2 the index would have to be set to 2. A sheet index update request is ignored if the requested index is identical to the sheets current index or if the requested new index is equal to the current sheet index + 1.',
      ).optional(),
      rightToLeft: z.boolean().describe(
        "True if the sheet is an RTL sheet instead of an LTR sheet.",
      ).optional(),
      sheetId: z.number().int().describe(
        "The ID of the sheet. Must be non-negative. This field cannot be changed once set.",
      ).optional(),
      sheetType: z.enum([
        "SHEET_TYPE_UNSPECIFIED",
        "GRID",
        "OBJECT",
        "DATA_SOURCE",
      ]).describe(
        "The type of sheet. Defaults to GRID. This field cannot be changed once set.",
      ).optional(),
      tabColor: z.object({
        alpha: z.number().describe(
          "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
        ).optional(),
        blue: z.number().describe(
          "The amount of blue in the color as a value in the interval [0, 1].",
        ).optional(),
        green: z.number().describe(
          "The amount of green in the color as a value in the interval [0, 1].",
        ).optional(),
        red: z.number().describe(
          "The amount of red in the color as a value in the interval [0, 1].",
        ).optional(),
      }).describe(
        "The color of the tab in the UI. Deprecated: Use tab_color_style.",
      ).optional(),
      tabColorStyle: z.object({
        rgbColor: z.object({
          alpha: z.unknown().describe(
            "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
          ).optional(),
          blue: z.unknown().describe(
            "The amount of blue in the color as a value in the interval [0, 1].",
          ).optional(),
          green: z.unknown().describe(
            "The amount of green in the color as a value in the interval [0, 1].",
          ).optional(),
          red: z.unknown().describe(
            "The amount of red in the color as a value in the interval [0, 1].",
          ).optional(),
        }).describe(
          "RGB color. The [`alpha`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#Color.FIELDS.alpha) value in the [`Color`](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/other#color) object isn't generally supported.",
        ).optional(),
        themeColor: z.enum([
          "THEME_COLOR_TYPE_UNSPECIFIED",
          "TEXT",
          "BACKGROUND",
          "ACCENT1",
          "ACCENT2",
          "ACCENT3",
          "ACCENT4",
          "ACCENT5",
          "ACCENT6",
          "LINK",
        ]).describe("Theme color.").optional(),
      }).describe(
        "The color of the tab in the UI. If tab_color is also set, this field takes precedence.",
      ).optional(),
      title: z.string().describe("The name of the sheet.").optional(),
    }).describe("The properties of the sheet.").optional(),
    protectedRanges: z.array(z.object({
      description: z.string().describe(
        "The description of this protected range.",
      ).optional(),
      editors: z.object({
        domainUsersCanEdit: z.unknown().describe(
          "True if anyone in the document's domain has edit access to the protected range. Domain protection is only supported on documents within a domain.",
        ).optional(),
        groups: z.unknown().describe(
          "The email addresses of groups with edit access to the protected range.",
        ).optional(),
        users: z.unknown().describe(
          "The email addresses of users with edit access to the protected range.",
        ).optional(),
      }).describe(
        "The users and groups with edit access to the protected range. This field is only visible to users with edit access to the protected range and the document. Editors are not supported with warning_only protection.",
      ).optional(),
      namedRangeId: z.string().describe(
        "The named range this protected range is backed by, if any. When writing, only one of range or named_range_id or table_id may be set.",
      ).optional(),
      protectedRangeId: z.number().int().describe(
        "The ID of the protected range. This field is read-only.",
      ).optional(),
      range: z.object({
        endColumnIndex: z.unknown().describe(
          "The end column (exclusive) of the range, or not set if unbounded.",
        ).optional(),
        endRowIndex: z.unknown().describe(
          "The end row (exclusive) of the range, or not set if unbounded.",
        ).optional(),
        sheetId: z.unknown().describe("The sheet this range is on.").optional(),
        startColumnIndex: z.unknown().describe(
          "The start column (inclusive) of the range, or not set if unbounded.",
        ).optional(),
        startRowIndex: z.unknown().describe(
          "The start row (inclusive) of the range, or not set if unbounded.",
        ).optional(),
      }).describe(
        "The range that is being protected. The range may be fully unbounded, in which case this is considered a protected sheet. When writing, only one of range or named_range_id or table_id may be set.",
      ).optional(),
      requestingUserCanEdit: z.boolean().describe(
        "True if the user who requested this protected range can edit the protected area. This field is read-only.",
      ).optional(),
      tableId: z.string().describe(
        "The table this protected range is backed by, if any. When writing, only one of range or named_range_id or table_id may be set.",
      ).optional(),
      unprotectedRanges: z.array(z.unknown()).describe(
        "The list of unprotected ranges within a protected sheet. Unprotected ranges are only supported on protected sheets.",
      ).optional(),
      warningOnly: z.boolean().describe(
        "True if this protected range will show a warning when editing. Warning-based protection means that every user can edit data in the protected range, except editing will prompt a warning asking the user to confirm the edit. When writing: if this field is true, then editors are ignored. Additionally, if this field is changed from true to false and the `editors` field is not set (nor included in the field mask), then the editors will be set to all the editors in the document.",
      ).optional(),
    })).describe("The protected ranges in this sheet.").optional(),
    rowGroups: z.array(z.object({
      collapsed: z.boolean().describe(
        "This field is true if this group is collapsed. A collapsed group remains collapsed if an overlapping group at a shallower depth is expanded. A true value does not imply that all dimensions within the group are hidden, since a dimension's visibility can change independently from this group property. However, when this property is updated, all dimensions within it are set to hidden if this field is true, or set to visible if this field is false.",
      ).optional(),
      depth: z.number().int().describe(
        "The depth of the group, representing how many groups have a range that wholly contains the range of this group.",
      ).optional(),
      range: z.object({
        dimension: z.unknown().describe("The dimension of the span.")
          .optional(),
        endIndex: z.unknown().describe(
          "The end (exclusive) of the span, or not set if unbounded.",
        ).optional(),
        sheetId: z.unknown().describe("The sheet this span is on.").optional(),
        startIndex: z.unknown().describe(
          "The start (inclusive) of the span, or not set if unbounded.",
        ).optional(),
      }).describe("The range over which this group exists.").optional(),
    })).describe(
      "All row groups on this sheet, ordered by increasing range start index, then by group depth.",
    ).optional(),
    slicers: z.array(z.object({
      position: z.object({
        newSheet: z.unknown().describe(
          "If true, the embedded object is put on a new sheet whose ID is chosen for you. Used only when writing.",
        ).optional(),
        overlayPosition: z.unknown().describe(
          "The position at which the object is overlaid on top of a grid.",
        ).optional(),
        sheetId: z.unknown().describe(
          "The sheet this is on. Set only if the embedded object is on its own sheet. Must be non-negative.",
        ).optional(),
      }).describe(
        "The position of the slicer. Note that slicer can be positioned only on existing sheet. Also, width and height of slicer can be automatically adjusted to keep it within permitted limits.",
      ).optional(),
      slicerId: z.number().int().describe("The ID of the slicer.").optional(),
      spec: z.object({
        applyToPivotTables: z.unknown().describe(
          "True if the filter should apply to pivot tables. If not set, default to `True`.",
        ).optional(),
        backgroundColor: z.unknown().describe(
          "The background color of the slicer. Deprecated: Use background_color_style.",
        ).optional(),
        backgroundColorStyle: z.unknown().describe(
          "The background color of the slicer. If background_color is also set, this field takes precedence.",
        ).optional(),
        columnIndex: z.unknown().describe(
          "The zero-based column index in the data table on which the filter is applied to.",
        ).optional(),
        dataRange: z.unknown().describe("The data range of the slicer.")
          .optional(),
        filterCriteria: z.unknown().describe(
          "The filtering criteria of the slicer.",
        ).optional(),
        horizontalAlignment: z.unknown().describe(
          "The horizontal alignment of title in the slicer. If unspecified, defaults to `LEFT`",
        ).optional(),
        textFormat: z.unknown().describe(
          "The text format of title in the slicer. The link field is not supported.",
        ).optional(),
        title: z.unknown().describe("The title of the slicer.").optional(),
      }).describe("The specification of the slicer.").optional(),
    })).describe("The slicers on this sheet.").optional(),
    tables: z.array(z.object({
      columnProperties: z.array(z.unknown()).describe(
        "The table column properties.",
      ).optional(),
      name: z.string().describe(
        "The table name. This is unique to all tables in the same spreadsheet.",
      ).optional(),
      range: z.object({
        endColumnIndex: z.unknown().describe(
          "The end column (exclusive) of the range, or not set if unbounded.",
        ).optional(),
        endRowIndex: z.unknown().describe(
          "The end row (exclusive) of the range, or not set if unbounded.",
        ).optional(),
        sheetId: z.unknown().describe("The sheet this range is on.").optional(),
        startColumnIndex: z.unknown().describe(
          "The start column (inclusive) of the range, or not set if unbounded.",
        ).optional(),
        startRowIndex: z.unknown().describe(
          "The start row (inclusive) of the range, or not set if unbounded.",
        ).optional(),
      }).describe("The table range.").optional(),
      rowsProperties: z.object({
        firstBandColorStyle: z.unknown().describe(
          "The first color that is alternating. If this field is set, the first banded row is filled with the specified color. Otherwise, the first banded row is filled with a default color.",
        ).optional(),
        footerColorStyle: z.unknown().describe(
          "The color of the last row. If this field is not set a footer is not added, the last row is filled with either first_band_color_style or second_band_color_style, depending on the color of the previous row. If updating an existing table without a footer to have a footer, the range will be expanded by 1 row. If updating an existing table with a footer and removing a footer, the range will be shrunk by 1 row.",
        ).optional(),
        headerColorStyle: z.unknown().describe(
          "The color of the header row. If this field is set, the header row is filled with the specified color. Otherwise, the header row is filled with a default color.",
        ).optional(),
        secondBandColorStyle: z.unknown().describe(
          "The second color that is alternating. If this field is set, the second banded row is filled with the specified color. Otherwise, the second banded row is filled with a default color.",
        ).optional(),
      }).describe("The table rows properties.").optional(),
      tableId: z.string().describe("The id of the table.").optional(),
    })).describe("The tables on this sheet.").optional(),
  })).describe("The sheets that are part of a spreadsheet.").optional(),
  spreadsheetId: z.string().describe(
    "The ID of the spreadsheet. This field is read-only.",
  ).optional(),
  spreadsheetUrl: z.string().describe(
    "The url of the spreadsheet. This field is read-only.",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessToken",
  "credentialsJson",
  "project",
  "scopes",
  "quotaProject",
  "apiEndpoint",
]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
    scopes: typeof g.scopes === "string"
      ? g.scopes.split(",").map((s: string) => s.trim())
      : _defaultOAuthScopes,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Google Sheets Spreadsheets. Registered at `@swamp/gcp/sheets/spreadsheets`. */
export const model = {
  type: "@swamp/gcp/sheets/spreadsheets",
  version: "2026.09.25.1",
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
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.12.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.25.1",
      description: "Added: comments",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Resource that represents a spreadsheet.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a spreadsheets",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["comments"] !== undefined) body["comments"] = g["comments"];
        if (g["dataSources"] !== undefined) {
          body["dataSources"] = g["dataSources"];
        }
        if (g["developerMetadata"] !== undefined) {
          body["developerMetadata"] = g["developerMetadata"];
        }
        if (g["namedRanges"] !== undefined) {
          body["namedRanges"] = g["namedRanges"];
        }
        if (g["properties"] !== undefined) body["properties"] = g["properties"];
        if (g["sheets"] !== undefined) body["sheets"] = g["sheets"];
        if (g["spreadsheetId"] !== undefined) {
          body["spreadsheetId"] = g["spreadsheetId"];
        }
        if (g["spreadsheetUrl"] !== undefined) {
          body["spreadsheetUrl"] = g["spreadsheetUrl"];
        }
        if (g["name"] !== undefined) {
          params["spreadsheetId"] = String(g["name"]);
        }
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          undefined,
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
      description: "Get a spreadsheets",
      arguments: z.object({
        identifier: z.string().describe("The name of the spreadsheets"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["spreadsheetId"] = args.identifier;
        const result = await readResource(
          baseUrl,
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
    sync: {
      description: "Sync spreadsheets state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific spreadsheets by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
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
          params["spreadsheetId"] = identifier;
          const result = await readResource(
            baseUrl,
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
    batch_update: {
      description: "batch update",
      arguments: z.object({
        commentsViewMode: z.any().optional(),
        includeSpreadsheetInResponse: z.any().optional(),
        requests: z.any().optional(),
        responseIncludeGridData: z.any().optional(),
        responseRanges: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["spreadsheetId"] !== undefined) {
          params["spreadsheetId"] = String(g["spreadsheetId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["commentsViewMode"] !== undefined) {
          body["commentsViewMode"] = args["commentsViewMode"];
        }
        if (args["includeSpreadsheetInResponse"] !== undefined) {
          body["includeSpreadsheetInResponse"] =
            args["includeSpreadsheetInResponse"];
        }
        if (args["requests"] !== undefined) body["requests"] = args["requests"];
        if (args["responseIncludeGridData"] !== undefined) {
          body["responseIncludeGridData"] = args["responseIncludeGridData"];
        }
        if (args["responseRanges"] !== undefined) {
          body["responseRanges"] = args["responseRanges"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "sheets.spreadsheets.batchUpdate",
            "path": "v4/spreadsheets/{spreadsheetId}:batchUpdate",
            "httpMethod": "POST",
            "parameterOrder": ["spreadsheetId"],
            "parameters": {
              "spreadsheetId": { "location": "path", "required": true },
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
    get_by_data_filter: {
      description: "get by data filter",
      arguments: z.object({
        commentsViewMode: z.any().optional(),
        dataFilters: z.any().optional(),
        excludeTablesInBandedRanges: z.any().optional(),
        includeGridData: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["spreadsheetId"] !== undefined) {
          params["spreadsheetId"] = String(g["spreadsheetId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["commentsViewMode"] !== undefined) {
          body["commentsViewMode"] = args["commentsViewMode"];
        }
        if (args["dataFilters"] !== undefined) {
          body["dataFilters"] = args["dataFilters"];
        }
        if (args["excludeTablesInBandedRanges"] !== undefined) {
          body["excludeTablesInBandedRanges"] =
            args["excludeTablesInBandedRanges"];
        }
        if (args["includeGridData"] !== undefined) {
          body["includeGridData"] = args["includeGridData"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "sheets.spreadsheets.getByDataFilter",
            "path": "v4/spreadsheets/{spreadsheetId}:getByDataFilter",
            "httpMethod": "POST",
            "parameterOrder": ["spreadsheetId"],
            "parameters": {
              "spreadsheetId": { "location": "path", "required": true },
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
