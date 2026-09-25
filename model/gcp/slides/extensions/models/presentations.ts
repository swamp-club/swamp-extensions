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

// Auto-generated extension model for @swamp/gcp/slides/presentations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Slides Presentations.
 *
 * A Google Slides presentation.
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

const BASE_URL = "https://slides.googleapis.com/";

const GET_CONFIG = {
  "id": "slides.presentations.get",
  "path": "v1/presentations/{+presentationId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "presentationId",
  ],
  "parameters": {
    "commentsViewMode": {
      "location": "query",
    },
    "presentationId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "slides.presentations.create",
  "path": "v1/presentations",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const _defaultOAuthScopes: string[] = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/presentations",
  "https://www.googleapis.com/auth/presentations.readonly",
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
  layouts: z.array(z.object({
    commentAnchors: z.array(z.object({
      anchorId: z.string().describe(
        "Output only. The unique ID of the comment anchor.",
      ).optional(),
      objectAnchors: z.array(z.unknown()).describe(
        "Output only. All object ID-based locations within a page that refer to the anchor ID.",
      ).optional(),
    })).describe(
      "Output only. The comment anchors present on the page. [Developer Preview](https://developers.google.com/workspace/preview).",
    ).optional(),
    comments: z.array(z.object({
      anchorId: z.string().describe(
        "The ID of the CommentAnchor in the presentation that this thread is tied to.",
      ).optional(),
      commentId: z.string().describe("The unique ID of the comment thread.")
        .optional(),
      headPost: z.object({
        assigneeEmail: z.unknown().describe(
          "Optional. The email of the user who is being newly assigned to the thread as part of this post. Returns a 400 bad request error if: - The parent thread is a CommentThread whose headPost does not have an assignee. - commentAction is specified as `RESOLVE` or `REOPEN`. - `assignee_email` exceeds 2048 UTF-8 code units.",
        ).optional(),
        author: z.unknown().describe(
          "Output only. The user who created the post.",
        ).optional(),
        commentAction: z.unknown().describe(
          "Action taken as part of creating the post.",
        ).optional(),
        content: z.unknown().describe(
          "The content of the post. Required to be non-empty if comment_action is not `RESOLVE` or `REOPEN`. This text content will be handled similarly to comments created in the Slides editor. It will have similar behaviors for formatting, notifications, etc. May not exceed 2048 UTF-8 code units.",
        ).optional(),
        contentHtml: z.unknown().describe(
          "Output only. The content of the post as HTML.",
        ).optional(),
        createTime: z.unknown().describe(
          "Output only. The time the post was created.",
        ).optional(),
        deleted: z.unknown().describe(
          "Output only. Whether the post is deleted. If `true`, content and author fields will be empty.",
        ).optional(),
        fromCopiedPresentation: z.unknown().describe(
          "Output only. Whether the post is from a copied presentation. This field cannot be set directly by callers.",
        ).optional(),
        fromImportedPresentation: z.unknown().describe(
          "Output only. Whether the post is from an imported presentation. This field cannot be set directly by callers.",
        ).optional(),
        postId: z.unknown().describe("Output only. The unique ID of the post.")
          .optional(),
        updateTime: z.unknown().describe(
          "Output only. The time the post was last updated.",
        ).optional(),
      }).describe("The first post in the thread.").optional(),
      plainTextQuote: z.string().describe(
        "The quoted text from the page element when the comment was created, formatted as plain-text.",
      ).optional(),
      replies: z.array(z.unknown()).describe("Replies to the head post.")
        .optional(),
      status: z.enum(["STATUS_UNSPECIFIED", "OPEN", "RESOLVED"]).describe(
        "Whether the thread is open or resolved.",
      ).optional(),
    })).describe(
      "Output only. The comment threads associated with the page. Only populated if the page was fetched via a GetPageRequest with a populated comments_view_mode. Otherwise, comments are returned in the Presentation via the GetPresentationRequest. [Developer Preview](https://developers.google.com/workspace/preview).",
    ).optional(),
    commentsViewMode: z.enum([
      "COMMENTS_VIEW_MODE_UNSPECIFIED",
      "COMMENTS_VIEW_MODE_DEFAULT_FOR_CURRENT_ACCESS",
      "COMMENTS_VIEW_MODE_OMITTED",
      "COMMENTS_VIEW_MODE_INCLUDED",
    ]).describe(
      "Output only. The comments view mode applied to the page. Only populated if the page was fetched via a GetPageRequest with a populated comments_view_mode. [Developer Preview](https://developers.google.com/workspace/preview).",
    ).optional(),
    layoutProperties: z.object({
      displayName: z.string().describe("The human-readable name of the layout.")
        .optional(),
      masterObjectId: z.string().describe(
        "The object ID of the master that this layout is based on.",
      ).optional(),
      name: z.string().describe("The name of the layout.").optional(),
    }).describe("Layout specific properties. Only set if page_type = LAYOUT.")
      .optional(),
    masterProperties: z.object({
      displayName: z.string().describe("The human-readable name of the master.")
        .optional(),
    }).describe("Master specific properties. Only set if page_type = MASTER.")
      .optional(),
    notesProperties: z.object({
      speakerNotesObjectId: z.string().describe(
        "The object ID of the shape on this notes page that contains the speaker notes for the corresponding slide. The actual shape may not always exist on the notes page. Inserting text using this object ID will automatically create the shape. In this case, the actual shape may have different object ID. The `GetPresentation` or `GetPage` action will always return the latest object ID.",
      ).optional(),
    }).describe("Notes specific properties. Only set if page_type = NOTES.")
      .optional(),
    objectId: z.string().describe(
      "The object ID for this page. Object IDs used by Page and PageElement share the same namespace.",
    ).optional(),
    pageElements: z.array(z.object({
      description: z.string().describe(
        "The description of the page element. Combined with title to display alt text. The field is not supported for Group elements.",
      ).optional(),
      elementGroup: z.object({
        children: z.unknown().describe(
          "The collection of elements in the group. The minimum size of a group is 2.",
        ).optional(),
      }).describe("A collection of page elements joined as a single unit.")
        .optional(),
      image: z.object({
        contentUrl: z.unknown().describe(
          "An URL to an image with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        imageProperties: z.unknown().describe("The properties of the image.")
          .optional(),
        placeholder: z.unknown().describe(
          "Placeholders are page elements that inherit from corresponding placeholders on layouts and masters. If set, the image is a placeholder image and any inherited properties can be resolved by looking at the parent placeholder identified by the Placeholder.parent_object_id field.",
        ).optional(),
        sourceUrl: z.unknown().describe(
          "The source URL is the URL used to insert the image. The source URL can be empty.",
        ).optional(),
      }).describe("An image page element.").optional(),
      line: z.object({
        lineCategory: z.unknown().describe(
          "The category of the line. It matches the `category` specified in CreateLineRequest, and can be updated with UpdateLineCategoryRequest.",
        ).optional(),
        lineProperties: z.unknown().describe("The properties of the line.")
          .optional(),
        lineType: z.unknown().describe("The type of the line.").optional(),
      }).describe("A line page element.").optional(),
      objectId: z.string().describe(
        "The object ID for this page element. Object IDs used by google.apps.slides.v1.Page and google.apps.slides.v1.PageElement share the same namespace.",
      ).optional(),
      shape: z.object({
        placeholder: z.unknown().describe(
          "Placeholders are page elements that inherit from corresponding placeholders on layouts and masters. If set, the shape is a placeholder shape and any inherited properties can be resolved by looking at the parent placeholder identified by the Placeholder.parent_object_id field.",
        ).optional(),
        shapeProperties: z.unknown().describe("The properties of the shape.")
          .optional(),
        shapeType: z.unknown().describe("The type of the shape.").optional(),
        text: z.unknown().describe("The text content of the shape.").optional(),
      }).describe("A generic shape.").optional(),
      sheetsChart: z.object({
        chartId: z.unknown().describe(
          "The ID of the specific chart in the Google Sheets spreadsheet that is embedded.",
        ).optional(),
        contentUrl: z.unknown().describe(
          "The URL of an image of the embedded chart, with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        sheetsChartProperties: z.unknown().describe(
          "The properties of the Sheets chart.",
        ).optional(),
        spreadsheetId: z.unknown().describe(
          "The ID of the Google Sheets spreadsheet that contains the source chart.",
        ).optional(),
      }).describe(
        "A linked chart embedded from Google Sheets. Unlinked charts are represented as images.",
      ).optional(),
      size: z.object({
        height: z.unknown().describe("The height of the object.").optional(),
        width: z.unknown().describe("The width of the object.").optional(),
      }).describe("The size of the page element.").optional(),
      speakerSpotlight: z.object({
        speakerSpotlightProperties: z.unknown().describe(
          "The properties of the Speaker Spotlight.",
        ).optional(),
      }).describe("A Speaker Spotlight.").optional(),
      table: z.object({
        columns: z.unknown().describe("Number of columns in the table.")
          .optional(),
        horizontalBorderRows: z.unknown().describe(
          "Properties of horizontal cell borders. A table's horizontal cell borders are represented as a grid. The grid has one more row than the number of rows in the table and the same number of columns as the table. For example, if the table is 3 x 3, its horizontal borders will be represented as a grid with 4 rows and 3 columns.",
        ).optional(),
        rows: z.unknown().describe("Number of rows in the table.").optional(),
        tableColumns: z.unknown().describe("Properties of each column.")
          .optional(),
        tableRows: z.unknown().describe(
          "Properties and contents of each row. Cells that span multiple rows are contained in only one of these rows and have a row_span greater than 1.",
        ).optional(),
        verticalBorderRows: z.unknown().describe(
          "Properties of vertical cell borders. A table's vertical cell borders are represented as a grid. The grid has the same number of rows as the table and one more column than the number of columns in the table. For example, if the table is 3 x 3, its vertical borders will be represented as a grid with 3 rows and 4 columns.",
        ).optional(),
      }).describe("A table page element.").optional(),
      title: z.string().describe(
        "The title of the page element. Combined with description to display alt text. The field is not supported for Group elements.",
      ).optional(),
      transform: z.object({
        scaleX: z.unknown().describe("The X coordinate scaling element.")
          .optional(),
        scaleY: z.unknown().describe("The Y coordinate scaling element.")
          .optional(),
        shearX: z.unknown().describe("The X coordinate shearing element.")
          .optional(),
        shearY: z.unknown().describe("The Y coordinate shearing element.")
          .optional(),
        translateX: z.unknown().describe(
          "The X coordinate translation element.",
        ).optional(),
        translateY: z.unknown().describe(
          "The Y coordinate translation element.",
        ).optional(),
        unit: z.unknown().describe("The units for translate elements.")
          .optional(),
      }).describe(
        "The transform of the page element. The visual appearance of the page element is determined by its absolute transform. To compute the absolute transform, preconcatenate a page element's transform with the transforms of all of its parent groups. If the page element is not in a group, its absolute transform is the same as the value in this field. The initial transform for the newly created Group is always the identity transform.",
      ).optional(),
      video: z.object({
        id: z.unknown().describe(
          "The video source's unique identifier for this video.",
        ).optional(),
        source: z.unknown().describe("The video source.").optional(),
        url: z.unknown().describe(
          "An URL to a video. The URL is valid as long as the source video exists and sharing settings do not change.",
        ).optional(),
        videoProperties: z.unknown().describe("The properties of the video.")
          .optional(),
      }).describe("A video page element.").optional(),
      wordArt: z.object({
        renderedText: z.unknown().describe("The text rendered as word art.")
          .optional(),
      }).describe("A word art page element.").optional(),
    })).describe("The page elements rendered on the page.").optional(),
    pageProperties: z.object({
      colorScheme: z.object({
        colors: z.array(z.unknown()).describe(
          "The ThemeColorType and corresponding concrete color pairs.",
        ).optional(),
      }).describe(
        "The color scheme of the page. If unset, the color scheme is inherited from a parent page. If the page has no parent, the color scheme uses a default Slides color scheme, matching the defaults in the Slides editor. Only the concrete colors of the first 12 ThemeColorTypes are editable. In addition, only the color scheme on `Master` pages can be updated. To update the field, a color scheme containing mappings from all the first 12 ThemeColorTypes to their concrete colors must be provided. Colors for the remaining ThemeColorTypes will be ignored.",
      ).optional(),
      pageBackgroundFill: z.object({
        propertyState: z.enum(["RENDERED", "NOT_RENDERED", "INHERIT"]).describe(
          "The background fill property state. Updating the fill on a page will implicitly update this field to `RENDERED`, unless another value is specified in the same request. To have no fill on a page, set this field to `NOT_RENDERED`. In this case, any other fill fields set in the same request will be ignored.",
        ).optional(),
        solidFill: z.object({
          alpha: z.unknown().describe(
            "The fraction of this `color` that should be applied to the pixel. That is, the final pixel color is defined by the equation: pixel color = alpha * (color) + (1.0 - alpha) * (background color) This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color.",
          ).optional(),
          color: z.unknown().describe("The color value of the solid fill.")
            .optional(),
        }).describe("Solid color fill.").optional(),
        stretchedPictureFill: z.object({
          contentUrl: z.unknown().describe(
            "Reading the content_url: An URL to a picture with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the picture as the original requester. Access to the picture may be lost if the presentation's sharing settings change. Writing the content_url: The picture is fetched once at insertion time and a copy is stored for display inside the presentation. Pictures must be less than 50MB in size, cannot exceed 25 megapixels, and must be in one of PNG, JPEG, or GIF format. The provided URL can be at most 2 kB in length.",
          ).optional(),
          size: z.unknown().describe(
            "The original size of the picture fill. This field is read-only.",
          ).optional(),
        }).describe("Stretched picture fill.").optional(),
      }).describe(
        "The background fill of the page. If unset, the background fill is inherited from a parent page if it exists. If the page has no parent, then the background fill defaults to the corresponding fill in the Slides editor.",
      ).optional(),
    }).describe("The properties of the page.").optional(),
    pageType: z.enum(["SLIDE", "MASTER", "LAYOUT", "NOTES", "NOTES_MASTER"])
      .describe("The type of the page.").optional(),
    revisionId: z.string().describe(
      "Output only. The revision ID of the presentation. Can be used in update requests to assert the presentation revision hasn't changed since the last read operation. Only populated if the user has edit access to the presentation. The revision ID is not a sequential number but an opaque string. The format of the revision ID might change over time. A returned revision ID is only guaranteed to be valid for 24 hours after it has been returned and cannot be shared across users. If the revision ID is unchanged between calls, then the presentation has not changed. Conversely, a changed ID (for the same presentation and user) usually means the presentation has been updated. However, a changed ID can also be due to internal factors such as ID format changes.",
    ).optional(),
    slideProperties: z.object({
      isSkipped: z.boolean().describe(
        "Whether the slide is skipped in the presentation mode. Defaults to false.",
      ).optional(),
      layoutObjectId: z.string().describe(
        "The object ID of the layout that this slide is based on. This property is read-only.",
      ).optional(),
      masterObjectId: z.string().describe(
        "The object ID of the master that this slide is based on. This property is read-only.",
      ).optional(),
      notesPage: z.record(z.string(), z.unknown()).describe(
        "Circular reference to Page",
      ).optional(),
    }).describe("Slide specific properties. Only set if page_type = SLIDE.")
      .optional(),
  })).describe(
    "The layouts in the presentation. A layout is a template that determines how content is arranged and styled on the slides that inherit from that layout.",
  ).optional(),
  locale: z.string().describe(
    "The locale of the presentation, as an IETF BCP 47 language tag.",
  ).optional(),
  masters: z.array(z.object({
    commentAnchors: z.array(z.object({
      anchorId: z.string().describe(
        "Output only. The unique ID of the comment anchor.",
      ).optional(),
      objectAnchors: z.array(z.unknown()).describe(
        "Output only. All object ID-based locations within a page that refer to the anchor ID.",
      ).optional(),
    })).describe(
      "Output only. The comment anchors present on the page. [Developer Preview](https://developers.google.com/workspace/preview).",
    ).optional(),
    comments: z.array(z.object({
      anchorId: z.string().describe(
        "The ID of the CommentAnchor in the presentation that this thread is tied to.",
      ).optional(),
      commentId: z.string().describe("The unique ID of the comment thread.")
        .optional(),
      headPost: z.object({
        assigneeEmail: z.unknown().describe(
          "Optional. The email of the user who is being newly assigned to the thread as part of this post. Returns a 400 bad request error if: - The parent thread is a CommentThread whose headPost does not have an assignee. - commentAction is specified as `RESOLVE` or `REOPEN`. - `assignee_email` exceeds 2048 UTF-8 code units.",
        ).optional(),
        author: z.unknown().describe(
          "Output only. The user who created the post.",
        ).optional(),
        commentAction: z.unknown().describe(
          "Action taken as part of creating the post.",
        ).optional(),
        content: z.unknown().describe(
          "The content of the post. Required to be non-empty if comment_action is not `RESOLVE` or `REOPEN`. This text content will be handled similarly to comments created in the Slides editor. It will have similar behaviors for formatting, notifications, etc. May not exceed 2048 UTF-8 code units.",
        ).optional(),
        contentHtml: z.unknown().describe(
          "Output only. The content of the post as HTML.",
        ).optional(),
        createTime: z.unknown().describe(
          "Output only. The time the post was created.",
        ).optional(),
        deleted: z.unknown().describe(
          "Output only. Whether the post is deleted. If `true`, content and author fields will be empty.",
        ).optional(),
        fromCopiedPresentation: z.unknown().describe(
          "Output only. Whether the post is from a copied presentation. This field cannot be set directly by callers.",
        ).optional(),
        fromImportedPresentation: z.unknown().describe(
          "Output only. Whether the post is from an imported presentation. This field cannot be set directly by callers.",
        ).optional(),
        postId: z.unknown().describe("Output only. The unique ID of the post.")
          .optional(),
        updateTime: z.unknown().describe(
          "Output only. The time the post was last updated.",
        ).optional(),
      }).describe("The first post in the thread.").optional(),
      plainTextQuote: z.string().describe(
        "The quoted text from the page element when the comment was created, formatted as plain-text.",
      ).optional(),
      replies: z.array(z.unknown()).describe("Replies to the head post.")
        .optional(),
      status: z.enum(["STATUS_UNSPECIFIED", "OPEN", "RESOLVED"]).describe(
        "Whether the thread is open or resolved.",
      ).optional(),
    })).describe(
      "Output only. The comment threads associated with the page. Only populated if the page was fetched via a GetPageRequest with a populated comments_view_mode. Otherwise, comments are returned in the Presentation via the GetPresentationRequest. [Developer Preview](https://developers.google.com/workspace/preview).",
    ).optional(),
    commentsViewMode: z.enum([
      "COMMENTS_VIEW_MODE_UNSPECIFIED",
      "COMMENTS_VIEW_MODE_DEFAULT_FOR_CURRENT_ACCESS",
      "COMMENTS_VIEW_MODE_OMITTED",
      "COMMENTS_VIEW_MODE_INCLUDED",
    ]).describe(
      "Output only. The comments view mode applied to the page. Only populated if the page was fetched via a GetPageRequest with a populated comments_view_mode. [Developer Preview](https://developers.google.com/workspace/preview).",
    ).optional(),
    layoutProperties: z.object({
      displayName: z.string().describe("The human-readable name of the layout.")
        .optional(),
      masterObjectId: z.string().describe(
        "The object ID of the master that this layout is based on.",
      ).optional(),
      name: z.string().describe("The name of the layout.").optional(),
    }).describe("Layout specific properties. Only set if page_type = LAYOUT.")
      .optional(),
    masterProperties: z.object({
      displayName: z.string().describe("The human-readable name of the master.")
        .optional(),
    }).describe("Master specific properties. Only set if page_type = MASTER.")
      .optional(),
    notesProperties: z.object({
      speakerNotesObjectId: z.string().describe(
        "The object ID of the shape on this notes page that contains the speaker notes for the corresponding slide. The actual shape may not always exist on the notes page. Inserting text using this object ID will automatically create the shape. In this case, the actual shape may have different object ID. The `GetPresentation` or `GetPage` action will always return the latest object ID.",
      ).optional(),
    }).describe("Notes specific properties. Only set if page_type = NOTES.")
      .optional(),
    objectId: z.string().describe(
      "The object ID for this page. Object IDs used by Page and PageElement share the same namespace.",
    ).optional(),
    pageElements: z.array(z.object({
      description: z.string().describe(
        "The description of the page element. Combined with title to display alt text. The field is not supported for Group elements.",
      ).optional(),
      elementGroup: z.object({
        children: z.unknown().describe(
          "The collection of elements in the group. The minimum size of a group is 2.",
        ).optional(),
      }).describe("A collection of page elements joined as a single unit.")
        .optional(),
      image: z.object({
        contentUrl: z.unknown().describe(
          "An URL to an image with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        imageProperties: z.unknown().describe("The properties of the image.")
          .optional(),
        placeholder: z.unknown().describe(
          "Placeholders are page elements that inherit from corresponding placeholders on layouts and masters. If set, the image is a placeholder image and any inherited properties can be resolved by looking at the parent placeholder identified by the Placeholder.parent_object_id field.",
        ).optional(),
        sourceUrl: z.unknown().describe(
          "The source URL is the URL used to insert the image. The source URL can be empty.",
        ).optional(),
      }).describe("An image page element.").optional(),
      line: z.object({
        lineCategory: z.unknown().describe(
          "The category of the line. It matches the `category` specified in CreateLineRequest, and can be updated with UpdateLineCategoryRequest.",
        ).optional(),
        lineProperties: z.unknown().describe("The properties of the line.")
          .optional(),
        lineType: z.unknown().describe("The type of the line.").optional(),
      }).describe("A line page element.").optional(),
      objectId: z.string().describe(
        "The object ID for this page element. Object IDs used by google.apps.slides.v1.Page and google.apps.slides.v1.PageElement share the same namespace.",
      ).optional(),
      shape: z.object({
        placeholder: z.unknown().describe(
          "Placeholders are page elements that inherit from corresponding placeholders on layouts and masters. If set, the shape is a placeholder shape and any inherited properties can be resolved by looking at the parent placeholder identified by the Placeholder.parent_object_id field.",
        ).optional(),
        shapeProperties: z.unknown().describe("The properties of the shape.")
          .optional(),
        shapeType: z.unknown().describe("The type of the shape.").optional(),
        text: z.unknown().describe("The text content of the shape.").optional(),
      }).describe("A generic shape.").optional(),
      sheetsChart: z.object({
        chartId: z.unknown().describe(
          "The ID of the specific chart in the Google Sheets spreadsheet that is embedded.",
        ).optional(),
        contentUrl: z.unknown().describe(
          "The URL of an image of the embedded chart, with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        sheetsChartProperties: z.unknown().describe(
          "The properties of the Sheets chart.",
        ).optional(),
        spreadsheetId: z.unknown().describe(
          "The ID of the Google Sheets spreadsheet that contains the source chart.",
        ).optional(),
      }).describe(
        "A linked chart embedded from Google Sheets. Unlinked charts are represented as images.",
      ).optional(),
      size: z.object({
        height: z.unknown().describe("The height of the object.").optional(),
        width: z.unknown().describe("The width of the object.").optional(),
      }).describe("The size of the page element.").optional(),
      speakerSpotlight: z.object({
        speakerSpotlightProperties: z.unknown().describe(
          "The properties of the Speaker Spotlight.",
        ).optional(),
      }).describe("A Speaker Spotlight.").optional(),
      table: z.object({
        columns: z.unknown().describe("Number of columns in the table.")
          .optional(),
        horizontalBorderRows: z.unknown().describe(
          "Properties of horizontal cell borders. A table's horizontal cell borders are represented as a grid. The grid has one more row than the number of rows in the table and the same number of columns as the table. For example, if the table is 3 x 3, its horizontal borders will be represented as a grid with 4 rows and 3 columns.",
        ).optional(),
        rows: z.unknown().describe("Number of rows in the table.").optional(),
        tableColumns: z.unknown().describe("Properties of each column.")
          .optional(),
        tableRows: z.unknown().describe(
          "Properties and contents of each row. Cells that span multiple rows are contained in only one of these rows and have a row_span greater than 1.",
        ).optional(),
        verticalBorderRows: z.unknown().describe(
          "Properties of vertical cell borders. A table's vertical cell borders are represented as a grid. The grid has the same number of rows as the table and one more column than the number of columns in the table. For example, if the table is 3 x 3, its vertical borders will be represented as a grid with 3 rows and 4 columns.",
        ).optional(),
      }).describe("A table page element.").optional(),
      title: z.string().describe(
        "The title of the page element. Combined with description to display alt text. The field is not supported for Group elements.",
      ).optional(),
      transform: z.object({
        scaleX: z.unknown().describe("The X coordinate scaling element.")
          .optional(),
        scaleY: z.unknown().describe("The Y coordinate scaling element.")
          .optional(),
        shearX: z.unknown().describe("The X coordinate shearing element.")
          .optional(),
        shearY: z.unknown().describe("The Y coordinate shearing element.")
          .optional(),
        translateX: z.unknown().describe(
          "The X coordinate translation element.",
        ).optional(),
        translateY: z.unknown().describe(
          "The Y coordinate translation element.",
        ).optional(),
        unit: z.unknown().describe("The units for translate elements.")
          .optional(),
      }).describe(
        "The transform of the page element. The visual appearance of the page element is determined by its absolute transform. To compute the absolute transform, preconcatenate a page element's transform with the transforms of all of its parent groups. If the page element is not in a group, its absolute transform is the same as the value in this field. The initial transform for the newly created Group is always the identity transform.",
      ).optional(),
      video: z.object({
        id: z.unknown().describe(
          "The video source's unique identifier for this video.",
        ).optional(),
        source: z.unknown().describe("The video source.").optional(),
        url: z.unknown().describe(
          "An URL to a video. The URL is valid as long as the source video exists and sharing settings do not change.",
        ).optional(),
        videoProperties: z.unknown().describe("The properties of the video.")
          .optional(),
      }).describe("A video page element.").optional(),
      wordArt: z.object({
        renderedText: z.unknown().describe("The text rendered as word art.")
          .optional(),
      }).describe("A word art page element.").optional(),
    })).describe("The page elements rendered on the page.").optional(),
    pageProperties: z.object({
      colorScheme: z.object({
        colors: z.array(z.unknown()).describe(
          "The ThemeColorType and corresponding concrete color pairs.",
        ).optional(),
      }).describe(
        "The color scheme of the page. If unset, the color scheme is inherited from a parent page. If the page has no parent, the color scheme uses a default Slides color scheme, matching the defaults in the Slides editor. Only the concrete colors of the first 12 ThemeColorTypes are editable. In addition, only the color scheme on `Master` pages can be updated. To update the field, a color scheme containing mappings from all the first 12 ThemeColorTypes to their concrete colors must be provided. Colors for the remaining ThemeColorTypes will be ignored.",
      ).optional(),
      pageBackgroundFill: z.object({
        propertyState: z.enum(["RENDERED", "NOT_RENDERED", "INHERIT"]).describe(
          "The background fill property state. Updating the fill on a page will implicitly update this field to `RENDERED`, unless another value is specified in the same request. To have no fill on a page, set this field to `NOT_RENDERED`. In this case, any other fill fields set in the same request will be ignored.",
        ).optional(),
        solidFill: z.object({
          alpha: z.unknown().describe(
            "The fraction of this `color` that should be applied to the pixel. That is, the final pixel color is defined by the equation: pixel color = alpha * (color) + (1.0 - alpha) * (background color) This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color.",
          ).optional(),
          color: z.unknown().describe("The color value of the solid fill.")
            .optional(),
        }).describe("Solid color fill.").optional(),
        stretchedPictureFill: z.object({
          contentUrl: z.unknown().describe(
            "Reading the content_url: An URL to a picture with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the picture as the original requester. Access to the picture may be lost if the presentation's sharing settings change. Writing the content_url: The picture is fetched once at insertion time and a copy is stored for display inside the presentation. Pictures must be less than 50MB in size, cannot exceed 25 megapixels, and must be in one of PNG, JPEG, or GIF format. The provided URL can be at most 2 kB in length.",
          ).optional(),
          size: z.unknown().describe(
            "The original size of the picture fill. This field is read-only.",
          ).optional(),
        }).describe("Stretched picture fill.").optional(),
      }).describe(
        "The background fill of the page. If unset, the background fill is inherited from a parent page if it exists. If the page has no parent, then the background fill defaults to the corresponding fill in the Slides editor.",
      ).optional(),
    }).describe("The properties of the page.").optional(),
    pageType: z.enum(["SLIDE", "MASTER", "LAYOUT", "NOTES", "NOTES_MASTER"])
      .describe("The type of the page.").optional(),
    revisionId: z.string().describe(
      "Output only. The revision ID of the presentation. Can be used in update requests to assert the presentation revision hasn't changed since the last read operation. Only populated if the user has edit access to the presentation. The revision ID is not a sequential number but an opaque string. The format of the revision ID might change over time. A returned revision ID is only guaranteed to be valid for 24 hours after it has been returned and cannot be shared across users. If the revision ID is unchanged between calls, then the presentation has not changed. Conversely, a changed ID (for the same presentation and user) usually means the presentation has been updated. However, a changed ID can also be due to internal factors such as ID format changes.",
    ).optional(),
    slideProperties: z.object({
      isSkipped: z.boolean().describe(
        "Whether the slide is skipped in the presentation mode. Defaults to false.",
      ).optional(),
      layoutObjectId: z.string().describe(
        "The object ID of the layout that this slide is based on. This property is read-only.",
      ).optional(),
      masterObjectId: z.string().describe(
        "The object ID of the master that this slide is based on. This property is read-only.",
      ).optional(),
      notesPage: z.record(z.string(), z.unknown()).describe(
        "Circular reference to Page",
      ).optional(),
    }).describe("Slide specific properties. Only set if page_type = SLIDE.")
      .optional(),
  })).describe(
    "The slide masters in the presentation. A slide master contains all common page elements and the common properties for a set of layouts. They serve three purposes: - Placeholder shapes on a master contain the default text styles and shape properties of all placeholder shapes on pages that use that master. - The master page properties define the common page properties inherited by its layouts. - Any other shapes on the master slide appear on all slides using that master, regardless of their layout.",
  ).optional(),
  notesMaster: z.object({
    commentAnchors: z.array(z.object({
      anchorId: z.string().describe(
        "Output only. The unique ID of the comment anchor.",
      ).optional(),
      objectAnchors: z.array(z.object({
        objectId: z.unknown().describe(
          "Output only. The page or page element that the comment thread is anchored to.",
        ).optional(),
        shapeTextAnchors: z.unknown().describe(
          "Populated for Shapes that have comments anchored to ranges of text in the shape's text.",
        ).optional(),
        tableCellAnchors: z.unknown().describe(
          "Populated for Tables that have comments anchored to ranges of text in one or more of the table's cells.",
        ).optional(),
      })).describe(
        "Output only. All object ID-based locations within a page that refer to the anchor ID.",
      ).optional(),
    })).describe(
      "Output only. The comment anchors present on the page. [Developer Preview](https://developers.google.com/workspace/preview).",
    ).optional(),
    comments: z.array(z.object({
      anchorId: z.string().describe(
        "The ID of the CommentAnchor in the presentation that this thread is tied to.",
      ).optional(),
      commentId: z.string().describe("The unique ID of the comment thread.")
        .optional(),
      headPost: z.object({
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
            "The resource name of the post author user, which can also be used to identify the user in the [Google People API](https://developers.google.com/people/api/rest/v1/people). Format: `users/{user}`. Will not be populated if the anonymous field is `true` or if the post is from an imported presentation.",
          ).optional(),
        }).describe("Output only. The user who created the post.").optional(),
        commentAction: z.enum([
          "COMMENT_ACTION_TYPE_UNSPECIFIED",
          "NO_COMMENT_ACTION_CHANGE",
          "RESOLVE",
          "REOPEN",
        ]).describe("Action taken as part of creating the post.").optional(),
        content: z.string().describe(
          "The content of the post. Required to be non-empty if comment_action is not `RESOLVE` or `REOPEN`. This text content will be handled similarly to comments created in the Slides editor. It will have similar behaviors for formatting, notifications, etc. May not exceed 2048 UTF-8 code units.",
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
        fromCopiedPresentation: z.boolean().describe(
          "Output only. Whether the post is from a copied presentation. This field cannot be set directly by callers.",
        ).optional(),
        fromImportedPresentation: z.boolean().describe(
          "Output only. Whether the post is from an imported presentation. This field cannot be set directly by callers.",
        ).optional(),
        postId: z.string().describe("Output only. The unique ID of the post.")
          .optional(),
        updateTime: z.string().describe(
          "Output only. The time the post was last updated.",
        ).optional(),
      }).describe("The first post in the thread.").optional(),
      plainTextQuote: z.string().describe(
        "The quoted text from the page element when the comment was created, formatted as plain-text.",
      ).optional(),
      replies: z.array(z.object({
        assigneeEmail: z.unknown().describe(
          "Optional. The email of the user who is being newly assigned to the thread as part of this post. Returns a 400 bad request error if: - The parent thread is a CommentThread whose headPost does not have an assignee. - commentAction is specified as `RESOLVE` or `REOPEN`. - `assignee_email` exceeds 2048 UTF-8 code units.",
        ).optional(),
        author: z.unknown().describe(
          "Output only. The user who created the post.",
        ).optional(),
        commentAction: z.unknown().describe(
          "Action taken as part of creating the post.",
        ).optional(),
        content: z.unknown().describe(
          "The content of the post. Required to be non-empty if comment_action is not `RESOLVE` or `REOPEN`. This text content will be handled similarly to comments created in the Slides editor. It will have similar behaviors for formatting, notifications, etc. May not exceed 2048 UTF-8 code units.",
        ).optional(),
        contentHtml: z.unknown().describe(
          "Output only. The content of the post as HTML.",
        ).optional(),
        createTime: z.unknown().describe(
          "Output only. The time the post was created.",
        ).optional(),
        deleted: z.unknown().describe(
          "Output only. Whether the post is deleted. If `true`, content and author fields will be empty.",
        ).optional(),
        fromCopiedPresentation: z.unknown().describe(
          "Output only. Whether the post is from a copied presentation. This field cannot be set directly by callers.",
        ).optional(),
        fromImportedPresentation: z.unknown().describe(
          "Output only. Whether the post is from an imported presentation. This field cannot be set directly by callers.",
        ).optional(),
        postId: z.unknown().describe("Output only. The unique ID of the post.")
          .optional(),
        updateTime: z.unknown().describe(
          "Output only. The time the post was last updated.",
        ).optional(),
      })).describe("Replies to the head post.").optional(),
      status: z.enum(["STATUS_UNSPECIFIED", "OPEN", "RESOLVED"]).describe(
        "Whether the thread is open or resolved.",
      ).optional(),
    })).describe(
      "Output only. The comment threads associated with the page. Only populated if the page was fetched via a GetPageRequest with a populated comments_view_mode. Otherwise, comments are returned in the Presentation via the GetPresentationRequest. [Developer Preview](https://developers.google.com/workspace/preview).",
    ).optional(),
    commentsViewMode: z.enum([
      "COMMENTS_VIEW_MODE_UNSPECIFIED",
      "COMMENTS_VIEW_MODE_DEFAULT_FOR_CURRENT_ACCESS",
      "COMMENTS_VIEW_MODE_OMITTED",
      "COMMENTS_VIEW_MODE_INCLUDED",
    ]).describe(
      "Output only. The comments view mode applied to the page. Only populated if the page was fetched via a GetPageRequest with a populated comments_view_mode. [Developer Preview](https://developers.google.com/workspace/preview).",
    ).optional(),
    layoutProperties: z.object({
      displayName: z.string().describe("The human-readable name of the layout.")
        .optional(),
      masterObjectId: z.string().describe(
        "The object ID of the master that this layout is based on.",
      ).optional(),
      name: z.string().describe("The name of the layout.").optional(),
    }).describe("Layout specific properties. Only set if page_type = LAYOUT.")
      .optional(),
    masterProperties: z.object({
      displayName: z.string().describe("The human-readable name of the master.")
        .optional(),
    }).describe("Master specific properties. Only set if page_type = MASTER.")
      .optional(),
    notesProperties: z.object({
      speakerNotesObjectId: z.string().describe(
        "The object ID of the shape on this notes page that contains the speaker notes for the corresponding slide. The actual shape may not always exist on the notes page. Inserting text using this object ID will automatically create the shape. In this case, the actual shape may have different object ID. The `GetPresentation` or `GetPage` action will always return the latest object ID.",
      ).optional(),
    }).describe("Notes specific properties. Only set if page_type = NOTES.")
      .optional(),
    objectId: z.string().describe(
      "The object ID for this page. Object IDs used by Page and PageElement share the same namespace.",
    ).optional(),
    pageElements: z.array(z.object({
      description: z.string().describe(
        "The description of the page element. Combined with title to display alt text. The field is not supported for Group elements.",
      ).optional(),
      elementGroup: z.object({
        children: z.array(z.unknown()).describe(
          "The collection of elements in the group. The minimum size of a group is 2.",
        ).optional(),
      }).describe("A collection of page elements joined as a single unit.")
        .optional(),
      image: z.object({
        contentUrl: z.string().describe(
          "An URL to an image with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        imageProperties: z.object({
          brightness: z.unknown().describe(
            "The brightness effect of the image. The value should be in the interval [-1.0, 1.0], where 0 means no effect. This property is read-only.",
          ).optional(),
          contrast: z.unknown().describe(
            "The contrast effect of the image. The value should be in the interval [-1.0, 1.0], where 0 means no effect. This property is read-only.",
          ).optional(),
          cropProperties: z.unknown().describe(
            "The crop properties of the image. If not set, the image is not cropped. This property is read-only.",
          ).optional(),
          link: z.unknown().describe(
            "The hyperlink destination of the image. If unset, there is no link.",
          ).optional(),
          outline: z.unknown().describe(
            "The outline of the image. If not set, the image has no outline.",
          ).optional(),
          recolor: z.unknown().describe(
            "The recolor effect of the image. If not set, the image is not recolored. This property is read-only.",
          ).optional(),
          shadow: z.unknown().describe(
            "The shadow of the image. If not set, the image has no shadow. This property is read-only.",
          ).optional(),
          transparency: z.unknown().describe(
            "The transparency effect of the image. The value should be in the interval [0.0, 1.0], where 0 means no effect and 1 means completely transparent. This property is read-only.",
          ).optional(),
        }).describe("The properties of the image.").optional(),
        placeholder: z.object({
          index: z.unknown().describe(
            "The index of the placeholder. If the same placeholder types are present in the same page, they would have different index values.",
          ).optional(),
          parentObjectId: z.unknown().describe(
            "The object ID of this shape's parent placeholder. If unset, the parent placeholder shape does not exist, so the shape does not inherit properties from any other shape.",
          ).optional(),
          type: z.unknown().describe("The type of the placeholder.").optional(),
        }).describe(
          "Placeholders are page elements that inherit from corresponding placeholders on layouts and masters. If set, the image is a placeholder image and any inherited properties can be resolved by looking at the parent placeholder identified by the Placeholder.parent_object_id field.",
        ).optional(),
        sourceUrl: z.string().describe(
          "The source URL is the URL used to insert the image. The source URL can be empty.",
        ).optional(),
      }).describe("An image page element.").optional(),
      line: z.object({
        lineCategory: z.enum([
          "LINE_CATEGORY_UNSPECIFIED",
          "STRAIGHT",
          "BENT",
          "CURVED",
        ]).describe(
          "The category of the line. It matches the `category` specified in CreateLineRequest, and can be updated with UpdateLineCategoryRequest.",
        ).optional(),
        lineProperties: z.object({
          dashStyle: z.unknown().describe("The dash style of the line.")
            .optional(),
          endArrow: z.unknown().describe(
            "The style of the arrow at the end of the line.",
          ).optional(),
          endConnection: z.unknown().describe(
            'The connection at the end of the line. If unset, there is no connection. Only lines with a Type indicating it is a "connector" can have an `end_connection`.',
          ).optional(),
          lineFill: z.unknown().describe(
            "The fill of the line. The default line fill matches the defaults for new lines created in the Slides editor.",
          ).optional(),
          link: z.unknown().describe(
            "The hyperlink destination of the line. If unset, there is no link.",
          ).optional(),
          startArrow: z.unknown().describe(
            "The style of the arrow at the beginning of the line.",
          ).optional(),
          startConnection: z.unknown().describe(
            'The connection at the beginning of the line. If unset, there is no connection. Only lines with a Type indicating it is a "connector" can have a `start_connection`.',
          ).optional(),
          weight: z.unknown().describe("The thickness of the line.").optional(),
        }).describe("The properties of the line.").optional(),
        lineType: z.enum([
          "TYPE_UNSPECIFIED",
          "STRAIGHT_CONNECTOR_1",
          "BENT_CONNECTOR_2",
          "BENT_CONNECTOR_3",
          "BENT_CONNECTOR_4",
          "BENT_CONNECTOR_5",
          "CURVED_CONNECTOR_2",
          "CURVED_CONNECTOR_3",
          "CURVED_CONNECTOR_4",
          "CURVED_CONNECTOR_5",
          "STRAIGHT_LINE",
        ]).describe("The type of the line.").optional(),
      }).describe("A line page element.").optional(),
      objectId: z.string().describe(
        "The object ID for this page element. Object IDs used by google.apps.slides.v1.Page and google.apps.slides.v1.PageElement share the same namespace.",
      ).optional(),
      shape: z.object({
        placeholder: z.object({
          index: z.unknown().describe(
            "The index of the placeholder. If the same placeholder types are present in the same page, they would have different index values.",
          ).optional(),
          parentObjectId: z.unknown().describe(
            "The object ID of this shape's parent placeholder. If unset, the parent placeholder shape does not exist, so the shape does not inherit properties from any other shape.",
          ).optional(),
          type: z.unknown().describe("The type of the placeholder.").optional(),
        }).describe(
          "Placeholders are page elements that inherit from corresponding placeholders on layouts and masters. If set, the shape is a placeholder shape and any inherited properties can be resolved by looking at the parent placeholder identified by the Placeholder.parent_object_id field.",
        ).optional(),
        shapeProperties: z.object({
          autofit: z.unknown().describe(
            "The autofit properties of the shape. This property is only set for shapes that allow text.",
          ).optional(),
          contentAlignment: z.unknown().describe(
            "The alignment of the content in the shape. If unspecified, the alignment is inherited from a parent placeholder if it exists. If the shape has no parent, the default alignment matches the alignment for new shapes created in the Slides editor.",
          ).optional(),
          link: z.unknown().describe(
            "The hyperlink destination of the shape. If unset, there is no link. Links are not inherited from parent placeholders.",
          ).optional(),
          outline: z.unknown().describe(
            "The outline of the shape. If unset, the outline is inherited from a parent placeholder if it exists. If the shape has no parent, then the default outline depends on the shape type, matching the defaults for new shapes created in the Slides editor.",
          ).optional(),
          shadow: z.unknown().describe(
            "The shadow properties of the shape. If unset, the shadow is inherited from a parent placeholder if it exists. If the shape has no parent, then the default shadow matches the defaults for new shapes created in the Slides editor. This property is read-only.",
          ).optional(),
          shapeBackgroundFill: z.unknown().describe(
            "The background fill of the shape. If unset, the background fill is inherited from a parent placeholder if it exists. If the shape has no parent, then the default background fill depends on the shape type, matching the defaults for new shapes created in the Slides editor.",
          ).optional(),
        }).describe("The properties of the shape.").optional(),
        shapeType: z.enum([
          "TYPE_UNSPECIFIED",
          "TEXT_BOX",
          "RECTANGLE",
          "ROUND_RECTANGLE",
          "ELLIPSE",
          "ARC",
          "BENT_ARROW",
          "BENT_UP_ARROW",
          "BEVEL",
          "BLOCK_ARC",
          "BRACE_PAIR",
          "BRACKET_PAIR",
          "CAN",
          "CHEVRON",
          "CHORD",
          "CLOUD",
          "CORNER",
          "CUBE",
          "CURVED_DOWN_ARROW",
          "CURVED_LEFT_ARROW",
          "CURVED_RIGHT_ARROW",
          "CURVED_UP_ARROW",
          "DECAGON",
          "DIAGONAL_STRIPE",
          "DIAMOND",
          "DODECAGON",
          "DONUT",
          "DOUBLE_WAVE",
          "DOWN_ARROW",
          "DOWN_ARROW_CALLOUT",
          "FOLDED_CORNER",
          "FRAME",
          "HALF_FRAME",
          "HEART",
          "HEPTAGON",
          "HEXAGON",
          "HOME_PLATE",
          "HORIZONTAL_SCROLL",
          "IRREGULAR_SEAL_1",
          "IRREGULAR_SEAL_2",
          "LEFT_ARROW",
          "LEFT_ARROW_CALLOUT",
          "LEFT_BRACE",
          "LEFT_BRACKET",
          "LEFT_RIGHT_ARROW",
          "LEFT_RIGHT_ARROW_CALLOUT",
          "LEFT_RIGHT_UP_ARROW",
          "LEFT_UP_ARROW",
          "LIGHTNING_BOLT",
          "MATH_DIVIDE",
          "MATH_EQUAL",
          "MATH_MINUS",
          "MATH_MULTIPLY",
          "MATH_NOT_EQUAL",
          "MATH_PLUS",
          "MOON",
          "NO_SMOKING",
          "NOTCHED_RIGHT_ARROW",
          "OCTAGON",
          "PARALLELOGRAM",
          "PENTAGON",
          "PIE",
          "PLAQUE",
          "PLUS",
          "QUAD_ARROW",
          "QUAD_ARROW_CALLOUT",
          "RIBBON",
          "RIBBON_2",
          "RIGHT_ARROW",
          "RIGHT_ARROW_CALLOUT",
          "RIGHT_BRACE",
          "RIGHT_BRACKET",
          "ROUND_1_RECTANGLE",
          "ROUND_2_DIAGONAL_RECTANGLE",
          "ROUND_2_SAME_RECTANGLE",
          "RIGHT_TRIANGLE",
          "SMILEY_FACE",
          "SNIP_1_RECTANGLE",
          "SNIP_2_DIAGONAL_RECTANGLE",
          "SNIP_2_SAME_RECTANGLE",
          "SNIP_ROUND_RECTANGLE",
          "STAR_10",
          "STAR_12",
          "STAR_16",
          "STAR_24",
          "STAR_32",
          "STAR_4",
          "STAR_5",
          "STAR_6",
          "STAR_7",
          "STAR_8",
          "STRIPED_RIGHT_ARROW",
          "SUN",
          "TRAPEZOID",
          "TRIANGLE",
          "UP_ARROW",
          "UP_ARROW_CALLOUT",
          "UP_DOWN_ARROW",
          "UTURN_ARROW",
          "VERTICAL_SCROLL",
          "WAVE",
          "WEDGE_ELLIPSE_CALLOUT",
          "WEDGE_RECTANGLE_CALLOUT",
          "WEDGE_ROUND_RECTANGLE_CALLOUT",
          "FLOW_CHART_ALTERNATE_PROCESS",
          "FLOW_CHART_COLLATE",
          "FLOW_CHART_CONNECTOR",
          "FLOW_CHART_DECISION",
          "FLOW_CHART_DELAY",
          "FLOW_CHART_DISPLAY",
          "FLOW_CHART_DOCUMENT",
          "FLOW_CHART_EXTRACT",
          "FLOW_CHART_INPUT_OUTPUT",
          "FLOW_CHART_INTERNAL_STORAGE",
          "FLOW_CHART_MAGNETIC_DISK",
          "FLOW_CHART_MAGNETIC_DRUM",
          "FLOW_CHART_MAGNETIC_TAPE",
          "FLOW_CHART_MANUAL_INPUT",
          "FLOW_CHART_MANUAL_OPERATION",
          "FLOW_CHART_MERGE",
          "FLOW_CHART_MULTIDOCUMENT",
          "FLOW_CHART_OFFLINE_STORAGE",
          "FLOW_CHART_OFFPAGE_CONNECTOR",
          "FLOW_CHART_ONLINE_STORAGE",
          "FLOW_CHART_OR",
          "FLOW_CHART_PREDEFINED_PROCESS",
          "FLOW_CHART_PREPARATION",
          "FLOW_CHART_PROCESS",
          "FLOW_CHART_PUNCHED_CARD",
          "FLOW_CHART_PUNCHED_TAPE",
          "FLOW_CHART_SORT",
          "FLOW_CHART_SUMMING_JUNCTION",
          "FLOW_CHART_TERMINATOR",
          "ARROW_EAST",
          "ARROW_NORTH_EAST",
          "ARROW_NORTH",
          "SPEECH",
          "STARBURST",
          "TEARDROP",
          "ELLIPSE_RIBBON",
          "ELLIPSE_RIBBON_2",
          "CLOUD_CALLOUT",
          "CUSTOM",
        ]).describe("The type of the shape.").optional(),
        text: z.object({
          lists: z.unknown().describe(
            "The bulleted lists contained in this text, keyed by list ID.",
          ).optional(),
          textElements: z.unknown().describe(
            "The text contents broken down into its component parts, including styling information. This property is read-only.",
          ).optional(),
        }).describe("The text content of the shape.").optional(),
      }).describe("A generic shape.").optional(),
      sheetsChart: z.object({
        chartId: z.number().int().describe(
          "The ID of the specific chart in the Google Sheets spreadsheet that is embedded.",
        ).optional(),
        contentUrl: z.string().describe(
          "The URL of an image of the embedded chart, with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        sheetsChartProperties: z.object({
          chartImageProperties: z.unknown().describe(
            "The properties of the embedded chart image.",
          ).optional(),
        }).describe("The properties of the Sheets chart.").optional(),
        spreadsheetId: z.string().describe(
          "The ID of the Google Sheets spreadsheet that contains the source chart.",
        ).optional(),
      }).describe(
        "A linked chart embedded from Google Sheets. Unlinked charts are represented as images.",
      ).optional(),
      size: z.object({
        height: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("The height of the object.").optional(),
        width: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("The width of the object.").optional(),
      }).describe("The size of the page element.").optional(),
      speakerSpotlight: z.object({
        speakerSpotlightProperties: z.object({
          outline: z.unknown().describe(
            "The outline of the Speaker Spotlight. If not set, it has no outline.",
          ).optional(),
          shadow: z.unknown().describe(
            "The shadow of the Speaker Spotlight. If not set, it has no shadow.",
          ).optional(),
        }).describe("The properties of the Speaker Spotlight.").optional(),
      }).describe("A Speaker Spotlight.").optional(),
      table: z.object({
        columns: z.number().int().describe("Number of columns in the table.")
          .optional(),
        horizontalBorderRows: z.array(z.unknown()).describe(
          "Properties of horizontal cell borders. A table's horizontal cell borders are represented as a grid. The grid has one more row than the number of rows in the table and the same number of columns as the table. For example, if the table is 3 x 3, its horizontal borders will be represented as a grid with 4 rows and 3 columns.",
        ).optional(),
        rows: z.number().int().describe("Number of rows in the table.")
          .optional(),
        tableColumns: z.array(z.unknown()).describe(
          "Properties of each column.",
        ).optional(),
        tableRows: z.array(z.unknown()).describe(
          "Properties and contents of each row. Cells that span multiple rows are contained in only one of these rows and have a row_span greater than 1.",
        ).optional(),
        verticalBorderRows: z.array(z.unknown()).describe(
          "Properties of vertical cell borders. A table's vertical cell borders are represented as a grid. The grid has the same number of rows as the table and one more column than the number of columns in the table. For example, if the table is 3 x 3, its vertical borders will be represented as a grid with 3 rows and 4 columns.",
        ).optional(),
      }).describe("A table page element.").optional(),
      title: z.string().describe(
        "The title of the page element. Combined with description to display alt text. The field is not supported for Group elements.",
      ).optional(),
      transform: z.object({
        scaleX: z.number().describe("The X coordinate scaling element.")
          .optional(),
        scaleY: z.number().describe("The Y coordinate scaling element.")
          .optional(),
        shearX: z.number().describe("The X coordinate shearing element.")
          .optional(),
        shearY: z.number().describe("The Y coordinate shearing element.")
          .optional(),
        translateX: z.number().describe("The X coordinate translation element.")
          .optional(),
        translateY: z.number().describe("The Y coordinate translation element.")
          .optional(),
        unit: z.enum(["UNIT_UNSPECIFIED", "EMU", "PT"]).describe(
          "The units for translate elements.",
        ).optional(),
      }).describe(
        "The transform of the page element. The visual appearance of the page element is determined by its absolute transform. To compute the absolute transform, preconcatenate a page element's transform with the transforms of all of its parent groups. If the page element is not in a group, its absolute transform is the same as the value in this field. The initial transform for the newly created Group is always the identity transform.",
      ).optional(),
      video: z.object({
        id: z.string().describe(
          "The video source's unique identifier for this video.",
        ).optional(),
        source: z.enum(["SOURCE_UNSPECIFIED", "YOUTUBE", "DRIVE"]).describe(
          "The video source.",
        ).optional(),
        url: z.string().describe(
          "An URL to a video. The URL is valid as long as the source video exists and sharing settings do not change.",
        ).optional(),
        videoProperties: z.object({
          autoPlay: z.unknown().describe(
            "Whether to enable video autoplay when the page is displayed in present mode. Defaults to false.",
          ).optional(),
          end: z.unknown().describe(
            "The time at which to end playback, measured in seconds from the beginning of the video. If set, the end time should be after the start time. If not set or if you set this to a value that exceeds the video's length, the video will be played until its end.",
          ).optional(),
          mute: z.unknown().describe(
            "Whether to mute the audio during video playback. Defaults to false.",
          ).optional(),
          outline: z.unknown().describe(
            "The outline of the video. The default outline matches the defaults for new videos created in the Slides editor.",
          ).optional(),
          start: z.unknown().describe(
            "The time at which to start playback, measured in seconds from the beginning of the video. If set, the start time should be before the end time. If you set this to a value that exceeds the video's length in seconds, the video will be played from the last second. If not set, the video will be played from the beginning.",
          ).optional(),
        }).describe("The properties of the video.").optional(),
      }).describe("A video page element.").optional(),
      wordArt: z.object({
        renderedText: z.string().describe("The text rendered as word art.")
          .optional(),
      }).describe("A word art page element.").optional(),
    })).describe("The page elements rendered on the page.").optional(),
    pageProperties: z.object({
      colorScheme: z.object({
        colors: z.array(z.object({
          color: z.unknown().describe(
            "The concrete color corresponding to the theme color type above.",
          ).optional(),
          type: z.unknown().describe("The type of the theme color.").optional(),
        })).describe(
          "The ThemeColorType and corresponding concrete color pairs.",
        ).optional(),
      }).describe(
        "The color scheme of the page. If unset, the color scheme is inherited from a parent page. If the page has no parent, the color scheme uses a default Slides color scheme, matching the defaults in the Slides editor. Only the concrete colors of the first 12 ThemeColorTypes are editable. In addition, only the color scheme on `Master` pages can be updated. To update the field, a color scheme containing mappings from all the first 12 ThemeColorTypes to their concrete colors must be provided. Colors for the remaining ThemeColorTypes will be ignored.",
      ).optional(),
      pageBackgroundFill: z.object({
        propertyState: z.enum(["RENDERED", "NOT_RENDERED", "INHERIT"]).describe(
          "The background fill property state. Updating the fill on a page will implicitly update this field to `RENDERED`, unless another value is specified in the same request. To have no fill on a page, set this field to `NOT_RENDERED`. In this case, any other fill fields set in the same request will be ignored.",
        ).optional(),
        solidFill: z.object({
          alpha: z.number().describe(
            "The fraction of this `color` that should be applied to the pixel. That is, the final pixel color is defined by the equation: pixel color = alpha * (color) + (1.0 - alpha) * (background color) This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color.",
          ).optional(),
          color: z.object({
            rgbColor: z.unknown().describe("An opaque RGB color.").optional(),
            themeColor: z.unknown().describe("An opaque theme color.")
              .optional(),
          }).describe("The color value of the solid fill.").optional(),
        }).describe("Solid color fill.").optional(),
        stretchedPictureFill: z.object({
          contentUrl: z.string().describe(
            "Reading the content_url: An URL to a picture with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the picture as the original requester. Access to the picture may be lost if the presentation's sharing settings change. Writing the content_url: The picture is fetched once at insertion time and a copy is stored for display inside the presentation. Pictures must be less than 50MB in size, cannot exceed 25 megapixels, and must be in one of PNG, JPEG, or GIF format. The provided URL can be at most 2 kB in length.",
          ).optional(),
          size: z.object({
            height: z.unknown().describe("The height of the object.")
              .optional(),
            width: z.unknown().describe("The width of the object.").optional(),
          }).describe(
            "The original size of the picture fill. This field is read-only.",
          ).optional(),
        }).describe("Stretched picture fill.").optional(),
      }).describe(
        "The background fill of the page. If unset, the background fill is inherited from a parent page if it exists. If the page has no parent, then the background fill defaults to the corresponding fill in the Slides editor.",
      ).optional(),
    }).describe("The properties of the page.").optional(),
    pageType: z.enum(["SLIDE", "MASTER", "LAYOUT", "NOTES", "NOTES_MASTER"])
      .describe("The type of the page.").optional(),
    revisionId: z.string().describe(
      "Output only. The revision ID of the presentation. Can be used in update requests to assert the presentation revision hasn't changed since the last read operation. Only populated if the user has edit access to the presentation. The revision ID is not a sequential number but an opaque string. The format of the revision ID might change over time. A returned revision ID is only guaranteed to be valid for 24 hours after it has been returned and cannot be shared across users. If the revision ID is unchanged between calls, then the presentation has not changed. Conversely, a changed ID (for the same presentation and user) usually means the presentation has been updated. However, a changed ID can also be due to internal factors such as ID format changes.",
    ).optional(),
    slideProperties: z.object({
      isSkipped: z.boolean().describe(
        "Whether the slide is skipped in the presentation mode. Defaults to false.",
      ).optional(),
      layoutObjectId: z.string().describe(
        "The object ID of the layout that this slide is based on. This property is read-only.",
      ).optional(),
      masterObjectId: z.string().describe(
        "The object ID of the master that this slide is based on. This property is read-only.",
      ).optional(),
      notesPage: z.record(z.string(), z.unknown()).describe(
        "Circular reference to Page",
      ).optional(),
    }).describe("Slide specific properties. Only set if page_type = SLIDE.")
      .optional(),
  }).describe(
    "The notes master in the presentation. It serves three purposes: - Placeholder shapes on a notes master contain the default text styles and shape properties of all placeholder shapes on notes pages. Specifically, a `SLIDE_IMAGE` placeholder shape contains the slide thumbnail, and a `BODY` placeholder shape contains the speaker notes. - The notes master page properties define the common page properties inherited by all notes pages. - Any other shapes on the notes master appear on all notes pages. The notes master is read-only.",
  ).optional(),
  pageSize: z.object({
    height: z.object({
      magnitude: z.number().describe("The magnitude.").optional(),
      unit: z.enum(["UNIT_UNSPECIFIED", "EMU", "PT"]).describe(
        "The units for magnitude.",
      ).optional(),
    }).describe("The height of the object.").optional(),
    width: z.object({
      magnitude: z.number().describe("The magnitude.").optional(),
      unit: z.enum(["UNIT_UNSPECIFIED", "EMU", "PT"]).describe(
        "The units for magnitude.",
      ).optional(),
    }).describe("The width of the object.").optional(),
  }).describe("The size of pages in the presentation.").optional(),
  presentationId: z.string().describe("The ID of the presentation.").optional(),
  slides: z.array(z.object({
    commentAnchors: z.array(z.object({
      anchorId: z.string().describe(
        "Output only. The unique ID of the comment anchor.",
      ).optional(),
      objectAnchors: z.array(z.unknown()).describe(
        "Output only. All object ID-based locations within a page that refer to the anchor ID.",
      ).optional(),
    })).describe(
      "Output only. The comment anchors present on the page. [Developer Preview](https://developers.google.com/workspace/preview).",
    ).optional(),
    comments: z.array(z.object({
      anchorId: z.string().describe(
        "The ID of the CommentAnchor in the presentation that this thread is tied to.",
      ).optional(),
      commentId: z.string().describe("The unique ID of the comment thread.")
        .optional(),
      headPost: z.object({
        assigneeEmail: z.unknown().describe(
          "Optional. The email of the user who is being newly assigned to the thread as part of this post. Returns a 400 bad request error if: - The parent thread is a CommentThread whose headPost does not have an assignee. - commentAction is specified as `RESOLVE` or `REOPEN`. - `assignee_email` exceeds 2048 UTF-8 code units.",
        ).optional(),
        author: z.unknown().describe(
          "Output only. The user who created the post.",
        ).optional(),
        commentAction: z.unknown().describe(
          "Action taken as part of creating the post.",
        ).optional(),
        content: z.unknown().describe(
          "The content of the post. Required to be non-empty if comment_action is not `RESOLVE` or `REOPEN`. This text content will be handled similarly to comments created in the Slides editor. It will have similar behaviors for formatting, notifications, etc. May not exceed 2048 UTF-8 code units.",
        ).optional(),
        contentHtml: z.unknown().describe(
          "Output only. The content of the post as HTML.",
        ).optional(),
        createTime: z.unknown().describe(
          "Output only. The time the post was created.",
        ).optional(),
        deleted: z.unknown().describe(
          "Output only. Whether the post is deleted. If `true`, content and author fields will be empty.",
        ).optional(),
        fromCopiedPresentation: z.unknown().describe(
          "Output only. Whether the post is from a copied presentation. This field cannot be set directly by callers.",
        ).optional(),
        fromImportedPresentation: z.unknown().describe(
          "Output only. Whether the post is from an imported presentation. This field cannot be set directly by callers.",
        ).optional(),
        postId: z.unknown().describe("Output only. The unique ID of the post.")
          .optional(),
        updateTime: z.unknown().describe(
          "Output only. The time the post was last updated.",
        ).optional(),
      }).describe("The first post in the thread.").optional(),
      plainTextQuote: z.string().describe(
        "The quoted text from the page element when the comment was created, formatted as plain-text.",
      ).optional(),
      replies: z.array(z.unknown()).describe("Replies to the head post.")
        .optional(),
      status: z.enum(["STATUS_UNSPECIFIED", "OPEN", "RESOLVED"]).describe(
        "Whether the thread is open or resolved.",
      ).optional(),
    })).describe(
      "Output only. The comment threads associated with the page. Only populated if the page was fetched via a GetPageRequest with a populated comments_view_mode. Otherwise, comments are returned in the Presentation via the GetPresentationRequest. [Developer Preview](https://developers.google.com/workspace/preview).",
    ).optional(),
    commentsViewMode: z.enum([
      "COMMENTS_VIEW_MODE_UNSPECIFIED",
      "COMMENTS_VIEW_MODE_DEFAULT_FOR_CURRENT_ACCESS",
      "COMMENTS_VIEW_MODE_OMITTED",
      "COMMENTS_VIEW_MODE_INCLUDED",
    ]).describe(
      "Output only. The comments view mode applied to the page. Only populated if the page was fetched via a GetPageRequest with a populated comments_view_mode. [Developer Preview](https://developers.google.com/workspace/preview).",
    ).optional(),
    layoutProperties: z.object({
      displayName: z.string().describe("The human-readable name of the layout.")
        .optional(),
      masterObjectId: z.string().describe(
        "The object ID of the master that this layout is based on.",
      ).optional(),
      name: z.string().describe("The name of the layout.").optional(),
    }).describe("Layout specific properties. Only set if page_type = LAYOUT.")
      .optional(),
    masterProperties: z.object({
      displayName: z.string().describe("The human-readable name of the master.")
        .optional(),
    }).describe("Master specific properties. Only set if page_type = MASTER.")
      .optional(),
    notesProperties: z.object({
      speakerNotesObjectId: z.string().describe(
        "The object ID of the shape on this notes page that contains the speaker notes for the corresponding slide. The actual shape may not always exist on the notes page. Inserting text using this object ID will automatically create the shape. In this case, the actual shape may have different object ID. The `GetPresentation` or `GetPage` action will always return the latest object ID.",
      ).optional(),
    }).describe("Notes specific properties. Only set if page_type = NOTES.")
      .optional(),
    objectId: z.string().describe(
      "The object ID for this page. Object IDs used by Page and PageElement share the same namespace.",
    ).optional(),
    pageElements: z.array(z.object({
      description: z.string().describe(
        "The description of the page element. Combined with title to display alt text. The field is not supported for Group elements.",
      ).optional(),
      elementGroup: z.object({
        children: z.unknown().describe(
          "The collection of elements in the group. The minimum size of a group is 2.",
        ).optional(),
      }).describe("A collection of page elements joined as a single unit.")
        .optional(),
      image: z.object({
        contentUrl: z.unknown().describe(
          "An URL to an image with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        imageProperties: z.unknown().describe("The properties of the image.")
          .optional(),
        placeholder: z.unknown().describe(
          "Placeholders are page elements that inherit from corresponding placeholders on layouts and masters. If set, the image is a placeholder image and any inherited properties can be resolved by looking at the parent placeholder identified by the Placeholder.parent_object_id field.",
        ).optional(),
        sourceUrl: z.unknown().describe(
          "The source URL is the URL used to insert the image. The source URL can be empty.",
        ).optional(),
      }).describe("An image page element.").optional(),
      line: z.object({
        lineCategory: z.unknown().describe(
          "The category of the line. It matches the `category` specified in CreateLineRequest, and can be updated with UpdateLineCategoryRequest.",
        ).optional(),
        lineProperties: z.unknown().describe("The properties of the line.")
          .optional(),
        lineType: z.unknown().describe("The type of the line.").optional(),
      }).describe("A line page element.").optional(),
      objectId: z.string().describe(
        "The object ID for this page element. Object IDs used by google.apps.slides.v1.Page and google.apps.slides.v1.PageElement share the same namespace.",
      ).optional(),
      shape: z.object({
        placeholder: z.unknown().describe(
          "Placeholders are page elements that inherit from corresponding placeholders on layouts and masters. If set, the shape is a placeholder shape and any inherited properties can be resolved by looking at the parent placeholder identified by the Placeholder.parent_object_id field.",
        ).optional(),
        shapeProperties: z.unknown().describe("The properties of the shape.")
          .optional(),
        shapeType: z.unknown().describe("The type of the shape.").optional(),
        text: z.unknown().describe("The text content of the shape.").optional(),
      }).describe("A generic shape.").optional(),
      sheetsChart: z.object({
        chartId: z.unknown().describe(
          "The ID of the specific chart in the Google Sheets spreadsheet that is embedded.",
        ).optional(),
        contentUrl: z.unknown().describe(
          "The URL of an image of the embedded chart, with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        sheetsChartProperties: z.unknown().describe(
          "The properties of the Sheets chart.",
        ).optional(),
        spreadsheetId: z.unknown().describe(
          "The ID of the Google Sheets spreadsheet that contains the source chart.",
        ).optional(),
      }).describe(
        "A linked chart embedded from Google Sheets. Unlinked charts are represented as images.",
      ).optional(),
      size: z.object({
        height: z.unknown().describe("The height of the object.").optional(),
        width: z.unknown().describe("The width of the object.").optional(),
      }).describe("The size of the page element.").optional(),
      speakerSpotlight: z.object({
        speakerSpotlightProperties: z.unknown().describe(
          "The properties of the Speaker Spotlight.",
        ).optional(),
      }).describe("A Speaker Spotlight.").optional(),
      table: z.object({
        columns: z.unknown().describe("Number of columns in the table.")
          .optional(),
        horizontalBorderRows: z.unknown().describe(
          "Properties of horizontal cell borders. A table's horizontal cell borders are represented as a grid. The grid has one more row than the number of rows in the table and the same number of columns as the table. For example, if the table is 3 x 3, its horizontal borders will be represented as a grid with 4 rows and 3 columns.",
        ).optional(),
        rows: z.unknown().describe("Number of rows in the table.").optional(),
        tableColumns: z.unknown().describe("Properties of each column.")
          .optional(),
        tableRows: z.unknown().describe(
          "Properties and contents of each row. Cells that span multiple rows are contained in only one of these rows and have a row_span greater than 1.",
        ).optional(),
        verticalBorderRows: z.unknown().describe(
          "Properties of vertical cell borders. A table's vertical cell borders are represented as a grid. The grid has the same number of rows as the table and one more column than the number of columns in the table. For example, if the table is 3 x 3, its vertical borders will be represented as a grid with 3 rows and 4 columns.",
        ).optional(),
      }).describe("A table page element.").optional(),
      title: z.string().describe(
        "The title of the page element. Combined with description to display alt text. The field is not supported for Group elements.",
      ).optional(),
      transform: z.object({
        scaleX: z.unknown().describe("The X coordinate scaling element.")
          .optional(),
        scaleY: z.unknown().describe("The Y coordinate scaling element.")
          .optional(),
        shearX: z.unknown().describe("The X coordinate shearing element.")
          .optional(),
        shearY: z.unknown().describe("The Y coordinate shearing element.")
          .optional(),
        translateX: z.unknown().describe(
          "The X coordinate translation element.",
        ).optional(),
        translateY: z.unknown().describe(
          "The Y coordinate translation element.",
        ).optional(),
        unit: z.unknown().describe("The units for translate elements.")
          .optional(),
      }).describe(
        "The transform of the page element. The visual appearance of the page element is determined by its absolute transform. To compute the absolute transform, preconcatenate a page element's transform with the transforms of all of its parent groups. If the page element is not in a group, its absolute transform is the same as the value in this field. The initial transform for the newly created Group is always the identity transform.",
      ).optional(),
      video: z.object({
        id: z.unknown().describe(
          "The video source's unique identifier for this video.",
        ).optional(),
        source: z.unknown().describe("The video source.").optional(),
        url: z.unknown().describe(
          "An URL to a video. The URL is valid as long as the source video exists and sharing settings do not change.",
        ).optional(),
        videoProperties: z.unknown().describe("The properties of the video.")
          .optional(),
      }).describe("A video page element.").optional(),
      wordArt: z.object({
        renderedText: z.unknown().describe("The text rendered as word art.")
          .optional(),
      }).describe("A word art page element.").optional(),
    })).describe("The page elements rendered on the page.").optional(),
    pageProperties: z.object({
      colorScheme: z.object({
        colors: z.array(z.unknown()).describe(
          "The ThemeColorType and corresponding concrete color pairs.",
        ).optional(),
      }).describe(
        "The color scheme of the page. If unset, the color scheme is inherited from a parent page. If the page has no parent, the color scheme uses a default Slides color scheme, matching the defaults in the Slides editor. Only the concrete colors of the first 12 ThemeColorTypes are editable. In addition, only the color scheme on `Master` pages can be updated. To update the field, a color scheme containing mappings from all the first 12 ThemeColorTypes to their concrete colors must be provided. Colors for the remaining ThemeColorTypes will be ignored.",
      ).optional(),
      pageBackgroundFill: z.object({
        propertyState: z.enum(["RENDERED", "NOT_RENDERED", "INHERIT"]).describe(
          "The background fill property state. Updating the fill on a page will implicitly update this field to `RENDERED`, unless another value is specified in the same request. To have no fill on a page, set this field to `NOT_RENDERED`. In this case, any other fill fields set in the same request will be ignored.",
        ).optional(),
        solidFill: z.object({
          alpha: z.unknown().describe(
            "The fraction of this `color` that should be applied to the pixel. That is, the final pixel color is defined by the equation: pixel color = alpha * (color) + (1.0 - alpha) * (background color) This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color.",
          ).optional(),
          color: z.unknown().describe("The color value of the solid fill.")
            .optional(),
        }).describe("Solid color fill.").optional(),
        stretchedPictureFill: z.object({
          contentUrl: z.unknown().describe(
            "Reading the content_url: An URL to a picture with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the picture as the original requester. Access to the picture may be lost if the presentation's sharing settings change. Writing the content_url: The picture is fetched once at insertion time and a copy is stored for display inside the presentation. Pictures must be less than 50MB in size, cannot exceed 25 megapixels, and must be in one of PNG, JPEG, or GIF format. The provided URL can be at most 2 kB in length.",
          ).optional(),
          size: z.unknown().describe(
            "The original size of the picture fill. This field is read-only.",
          ).optional(),
        }).describe("Stretched picture fill.").optional(),
      }).describe(
        "The background fill of the page. If unset, the background fill is inherited from a parent page if it exists. If the page has no parent, then the background fill defaults to the corresponding fill in the Slides editor.",
      ).optional(),
    }).describe("The properties of the page.").optional(),
    pageType: z.enum(["SLIDE", "MASTER", "LAYOUT", "NOTES", "NOTES_MASTER"])
      .describe("The type of the page.").optional(),
    revisionId: z.string().describe(
      "Output only. The revision ID of the presentation. Can be used in update requests to assert the presentation revision hasn't changed since the last read operation. Only populated if the user has edit access to the presentation. The revision ID is not a sequential number but an opaque string. The format of the revision ID might change over time. A returned revision ID is only guaranteed to be valid for 24 hours after it has been returned and cannot be shared across users. If the revision ID is unchanged between calls, then the presentation has not changed. Conversely, a changed ID (for the same presentation and user) usually means the presentation has been updated. However, a changed ID can also be due to internal factors such as ID format changes.",
    ).optional(),
    slideProperties: z.object({
      isSkipped: z.boolean().describe(
        "Whether the slide is skipped in the presentation mode. Defaults to false.",
      ).optional(),
      layoutObjectId: z.string().describe(
        "The object ID of the layout that this slide is based on. This property is read-only.",
      ).optional(),
      masterObjectId: z.string().describe(
        "The object ID of the master that this slide is based on. This property is read-only.",
      ).optional(),
      notesPage: z.record(z.string(), z.unknown()).describe(
        "Circular reference to Page",
      ).optional(),
    }).describe("Slide specific properties. Only set if page_type = SLIDE.")
      .optional(),
  })).describe(
    "The slides in the presentation. A slide inherits properties from a slide layout.",
  ).optional(),
  title: z.string().describe("The title of the presentation.").optional(),
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
      fromCopiedPresentation: z.boolean(),
      fromImportedPresentation: z.boolean(),
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
      fromCopiedPresentation: z.boolean(),
      fromImportedPresentation: z.boolean(),
      postId: z.string(),
      updateTime: z.string(),
    })),
    status: z.string(),
  })).optional(),
  commentsViewMode: z.string().optional(),
  layouts: z.array(z.object({
    commentAnchors: z.array(z.object({
      anchorId: z.string(),
      objectAnchors: z.array(z.unknown()),
    })),
    comments: z.array(z.object({
      anchorId: z.string(),
      commentId: z.string(),
      headPost: z.object({
        assigneeEmail: z.unknown(),
        author: z.unknown(),
        commentAction: z.unknown(),
        content: z.unknown(),
        contentHtml: z.unknown(),
        createTime: z.unknown(),
        deleted: z.unknown(),
        fromCopiedPresentation: z.unknown(),
        fromImportedPresentation: z.unknown(),
        postId: z.unknown(),
        updateTime: z.unknown(),
      }),
      plainTextQuote: z.string(),
      replies: z.array(z.unknown()),
      status: z.string(),
    })),
    commentsViewMode: z.string(),
    layoutProperties: z.object({
      displayName: z.string(),
      masterObjectId: z.string(),
      name: z.string(),
    }),
    masterProperties: z.object({
      displayName: z.string(),
    }),
    notesProperties: z.object({
      speakerNotesObjectId: z.string(),
    }),
    objectId: z.string(),
    pageElements: z.array(z.object({
      description: z.string(),
      elementGroup: z.object({
        children: z.unknown(),
      }),
      image: z.object({
        contentUrl: z.unknown(),
        imageProperties: z.unknown(),
        placeholder: z.unknown(),
        sourceUrl: z.unknown(),
      }),
      line: z.object({
        lineCategory: z.unknown(),
        lineProperties: z.unknown(),
        lineType: z.unknown(),
      }),
      objectId: z.string(),
      shape: z.object({
        placeholder: z.unknown(),
        shapeProperties: z.unknown(),
        shapeType: z.unknown(),
        text: z.unknown(),
      }),
      sheetsChart: z.object({
        chartId: z.unknown(),
        contentUrl: z.unknown(),
        sheetsChartProperties: z.unknown(),
        spreadsheetId: z.unknown(),
      }),
      size: z.object({
        height: z.unknown(),
        width: z.unknown(),
      }),
      speakerSpotlight: z.object({
        speakerSpotlightProperties: z.unknown(),
      }),
      table: z.object({
        columns: z.unknown(),
        horizontalBorderRows: z.unknown(),
        rows: z.unknown(),
        tableColumns: z.unknown(),
        tableRows: z.unknown(),
        verticalBorderRows: z.unknown(),
      }),
      title: z.string(),
      transform: z.object({
        scaleX: z.unknown(),
        scaleY: z.unknown(),
        shearX: z.unknown(),
        shearY: z.unknown(),
        translateX: z.unknown(),
        translateY: z.unknown(),
        unit: z.unknown(),
      }),
      video: z.object({
        id: z.unknown(),
        source: z.unknown(),
        url: z.unknown(),
        videoProperties: z.unknown(),
      }),
      wordArt: z.object({
        renderedText: z.unknown(),
      }),
    })),
    pageProperties: z.object({
      colorScheme: z.object({
        colors: z.array(z.unknown()),
      }),
      pageBackgroundFill: z.object({
        propertyState: z.string(),
        solidFill: z.object({
          alpha: z.unknown(),
          color: z.unknown(),
        }),
        stretchedPictureFill: z.object({
          contentUrl: z.unknown(),
          size: z.unknown(),
        }),
      }),
    }),
    pageType: z.string(),
    revisionId: z.string(),
    slideProperties: z.object({
      isSkipped: z.boolean(),
      layoutObjectId: z.string(),
      masterObjectId: z.string(),
      notesPage: z.record(z.string(), z.unknown()),
    }),
  })).optional(),
  locale: z.string().optional(),
  masters: z.array(z.object({
    commentAnchors: z.array(z.object({
      anchorId: z.string(),
      objectAnchors: z.array(z.unknown()),
    })),
    comments: z.array(z.object({
      anchorId: z.string(),
      commentId: z.string(),
      headPost: z.object({
        assigneeEmail: z.unknown(),
        author: z.unknown(),
        commentAction: z.unknown(),
        content: z.unknown(),
        contentHtml: z.unknown(),
        createTime: z.unknown(),
        deleted: z.unknown(),
        fromCopiedPresentation: z.unknown(),
        fromImportedPresentation: z.unknown(),
        postId: z.unknown(),
        updateTime: z.unknown(),
      }),
      plainTextQuote: z.string(),
      replies: z.array(z.unknown()),
      status: z.string(),
    })),
    commentsViewMode: z.string(),
    layoutProperties: z.object({
      displayName: z.string(),
      masterObjectId: z.string(),
      name: z.string(),
    }),
    masterProperties: z.object({
      displayName: z.string(),
    }),
    notesProperties: z.object({
      speakerNotesObjectId: z.string(),
    }),
    objectId: z.string(),
    pageElements: z.array(z.object({
      description: z.string(),
      elementGroup: z.object({
        children: z.unknown(),
      }),
      image: z.object({
        contentUrl: z.unknown(),
        imageProperties: z.unknown(),
        placeholder: z.unknown(),
        sourceUrl: z.unknown(),
      }),
      line: z.object({
        lineCategory: z.unknown(),
        lineProperties: z.unknown(),
        lineType: z.unknown(),
      }),
      objectId: z.string(),
      shape: z.object({
        placeholder: z.unknown(),
        shapeProperties: z.unknown(),
        shapeType: z.unknown(),
        text: z.unknown(),
      }),
      sheetsChart: z.object({
        chartId: z.unknown(),
        contentUrl: z.unknown(),
        sheetsChartProperties: z.unknown(),
        spreadsheetId: z.unknown(),
      }),
      size: z.object({
        height: z.unknown(),
        width: z.unknown(),
      }),
      speakerSpotlight: z.object({
        speakerSpotlightProperties: z.unknown(),
      }),
      table: z.object({
        columns: z.unknown(),
        horizontalBorderRows: z.unknown(),
        rows: z.unknown(),
        tableColumns: z.unknown(),
        tableRows: z.unknown(),
        verticalBorderRows: z.unknown(),
      }),
      title: z.string(),
      transform: z.object({
        scaleX: z.unknown(),
        scaleY: z.unknown(),
        shearX: z.unknown(),
        shearY: z.unknown(),
        translateX: z.unknown(),
        translateY: z.unknown(),
        unit: z.unknown(),
      }),
      video: z.object({
        id: z.unknown(),
        source: z.unknown(),
        url: z.unknown(),
        videoProperties: z.unknown(),
      }),
      wordArt: z.object({
        renderedText: z.unknown(),
      }),
    })),
    pageProperties: z.object({
      colorScheme: z.object({
        colors: z.array(z.unknown()),
      }),
      pageBackgroundFill: z.object({
        propertyState: z.string(),
        solidFill: z.object({
          alpha: z.unknown(),
          color: z.unknown(),
        }),
        stretchedPictureFill: z.object({
          contentUrl: z.unknown(),
          size: z.unknown(),
        }),
      }),
    }),
    pageType: z.string(),
    revisionId: z.string(),
    slideProperties: z.object({
      isSkipped: z.boolean(),
      layoutObjectId: z.string(),
      masterObjectId: z.string(),
      notesPage: z.record(z.string(), z.unknown()),
    }),
  })).optional(),
  notesMaster: z.object({
    commentAnchors: z.array(z.object({
      anchorId: z.string(),
      objectAnchors: z.array(z.object({
        objectId: z.unknown(),
        shapeTextAnchors: z.unknown(),
        tableCellAnchors: z.unknown(),
      })),
    })),
    comments: z.array(z.object({
      anchorId: z.string(),
      commentId: z.string(),
      headPost: z.object({
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
        fromCopiedPresentation: z.boolean(),
        fromImportedPresentation: z.boolean(),
        postId: z.string(),
        updateTime: z.string(),
      }),
      plainTextQuote: z.string(),
      replies: z.array(z.object({
        assigneeEmail: z.unknown(),
        author: z.unknown(),
        commentAction: z.unknown(),
        content: z.unknown(),
        contentHtml: z.unknown(),
        createTime: z.unknown(),
        deleted: z.unknown(),
        fromCopiedPresentation: z.unknown(),
        fromImportedPresentation: z.unknown(),
        postId: z.unknown(),
        updateTime: z.unknown(),
      })),
      status: z.string(),
    })),
    commentsViewMode: z.string(),
    layoutProperties: z.object({
      displayName: z.string(),
      masterObjectId: z.string(),
      name: z.string(),
    }),
    masterProperties: z.object({
      displayName: z.string(),
    }),
    notesProperties: z.object({
      speakerNotesObjectId: z.string(),
    }),
    objectId: z.string(),
    pageElements: z.array(z.object({
      description: z.string(),
      elementGroup: z.object({
        children: z.array(z.unknown()),
      }),
      image: z.object({
        contentUrl: z.string(),
        imageProperties: z.object({
          brightness: z.unknown(),
          contrast: z.unknown(),
          cropProperties: z.unknown(),
          link: z.unknown(),
          outline: z.unknown(),
          recolor: z.unknown(),
          shadow: z.unknown(),
          transparency: z.unknown(),
        }),
        placeholder: z.object({
          index: z.unknown(),
          parentObjectId: z.unknown(),
          type: z.unknown(),
        }),
        sourceUrl: z.string(),
      }),
      line: z.object({
        lineCategory: z.string(),
        lineProperties: z.object({
          dashStyle: z.unknown(),
          endArrow: z.unknown(),
          endConnection: z.unknown(),
          lineFill: z.unknown(),
          link: z.unknown(),
          startArrow: z.unknown(),
          startConnection: z.unknown(),
          weight: z.unknown(),
        }),
        lineType: z.string(),
      }),
      objectId: z.string(),
      shape: z.object({
        placeholder: z.object({
          index: z.unknown(),
          parentObjectId: z.unknown(),
          type: z.unknown(),
        }),
        shapeProperties: z.object({
          autofit: z.unknown(),
          contentAlignment: z.unknown(),
          link: z.unknown(),
          outline: z.unknown(),
          shadow: z.unknown(),
          shapeBackgroundFill: z.unknown(),
        }),
        shapeType: z.string(),
        text: z.object({
          lists: z.unknown(),
          textElements: z.unknown(),
        }),
      }),
      sheetsChart: z.object({
        chartId: z.number(),
        contentUrl: z.string(),
        sheetsChartProperties: z.object({
          chartImageProperties: z.unknown(),
        }),
        spreadsheetId: z.string(),
      }),
      size: z.object({
        height: z.object({
          magnitude: z.unknown(),
          unit: z.unknown(),
        }),
        width: z.object({
          magnitude: z.unknown(),
          unit: z.unknown(),
        }),
      }),
      speakerSpotlight: z.object({
        speakerSpotlightProperties: z.object({
          outline: z.unknown(),
          shadow: z.unknown(),
        }),
      }),
      table: z.object({
        columns: z.number(),
        horizontalBorderRows: z.array(z.unknown()),
        rows: z.number(),
        tableColumns: z.array(z.unknown()),
        tableRows: z.array(z.unknown()),
        verticalBorderRows: z.array(z.unknown()),
      }),
      title: z.string(),
      transform: z.object({
        scaleX: z.number(),
        scaleY: z.number(),
        shearX: z.number(),
        shearY: z.number(),
        translateX: z.number(),
        translateY: z.number(),
        unit: z.string(),
      }),
      video: z.object({
        id: z.string(),
        source: z.string(),
        url: z.string(),
        videoProperties: z.object({
          autoPlay: z.unknown(),
          end: z.unknown(),
          mute: z.unknown(),
          outline: z.unknown(),
          start: z.unknown(),
        }),
      }),
      wordArt: z.object({
        renderedText: z.string(),
      }),
    })),
    pageProperties: z.object({
      colorScheme: z.object({
        colors: z.array(z.object({
          color: z.unknown(),
          type: z.unknown(),
        })),
      }),
      pageBackgroundFill: z.object({
        propertyState: z.string(),
        solidFill: z.object({
          alpha: z.number(),
          color: z.object({
            rgbColor: z.unknown(),
            themeColor: z.unknown(),
          }),
        }),
        stretchedPictureFill: z.object({
          contentUrl: z.string(),
          size: z.object({
            height: z.unknown(),
            width: z.unknown(),
          }),
        }),
      }),
    }),
    pageType: z.string(),
    revisionId: z.string(),
    slideProperties: z.object({
      isSkipped: z.boolean(),
      layoutObjectId: z.string(),
      masterObjectId: z.string(),
      notesPage: z.record(z.string(), z.unknown()),
    }),
  }).optional(),
  pageSize: z.object({
    height: z.object({
      magnitude: z.number(),
      unit: z.string(),
    }),
    width: z.object({
      magnitude: z.number(),
      unit: z.string(),
    }),
  }).optional(),
  presentationId: z.string().optional(),
  revisionId: z.string().optional(),
  slides: z.array(z.object({
    commentAnchors: z.array(z.object({
      anchorId: z.string(),
      objectAnchors: z.array(z.unknown()),
    })),
    comments: z.array(z.object({
      anchorId: z.string(),
      commentId: z.string(),
      headPost: z.object({
        assigneeEmail: z.unknown(),
        author: z.unknown(),
        commentAction: z.unknown(),
        content: z.unknown(),
        contentHtml: z.unknown(),
        createTime: z.unknown(),
        deleted: z.unknown(),
        fromCopiedPresentation: z.unknown(),
        fromImportedPresentation: z.unknown(),
        postId: z.unknown(),
        updateTime: z.unknown(),
      }),
      plainTextQuote: z.string(),
      replies: z.array(z.unknown()),
      status: z.string(),
    })),
    commentsViewMode: z.string(),
    layoutProperties: z.object({
      displayName: z.string(),
      masterObjectId: z.string(),
      name: z.string(),
    }),
    masterProperties: z.object({
      displayName: z.string(),
    }),
    notesProperties: z.object({
      speakerNotesObjectId: z.string(),
    }),
    objectId: z.string(),
    pageElements: z.array(z.object({
      description: z.string(),
      elementGroup: z.object({
        children: z.unknown(),
      }),
      image: z.object({
        contentUrl: z.unknown(),
        imageProperties: z.unknown(),
        placeholder: z.unknown(),
        sourceUrl: z.unknown(),
      }),
      line: z.object({
        lineCategory: z.unknown(),
        lineProperties: z.unknown(),
        lineType: z.unknown(),
      }),
      objectId: z.string(),
      shape: z.object({
        placeholder: z.unknown(),
        shapeProperties: z.unknown(),
        shapeType: z.unknown(),
        text: z.unknown(),
      }),
      sheetsChart: z.object({
        chartId: z.unknown(),
        contentUrl: z.unknown(),
        sheetsChartProperties: z.unknown(),
        spreadsheetId: z.unknown(),
      }),
      size: z.object({
        height: z.unknown(),
        width: z.unknown(),
      }),
      speakerSpotlight: z.object({
        speakerSpotlightProperties: z.unknown(),
      }),
      table: z.object({
        columns: z.unknown(),
        horizontalBorderRows: z.unknown(),
        rows: z.unknown(),
        tableColumns: z.unknown(),
        tableRows: z.unknown(),
        verticalBorderRows: z.unknown(),
      }),
      title: z.string(),
      transform: z.object({
        scaleX: z.unknown(),
        scaleY: z.unknown(),
        shearX: z.unknown(),
        shearY: z.unknown(),
        translateX: z.unknown(),
        translateY: z.unknown(),
        unit: z.unknown(),
      }),
      video: z.object({
        id: z.unknown(),
        source: z.unknown(),
        url: z.unknown(),
        videoProperties: z.unknown(),
      }),
      wordArt: z.object({
        renderedText: z.unknown(),
      }),
    })),
    pageProperties: z.object({
      colorScheme: z.object({
        colors: z.array(z.unknown()),
      }),
      pageBackgroundFill: z.object({
        propertyState: z.string(),
        solidFill: z.object({
          alpha: z.unknown(),
          color: z.unknown(),
        }),
        stretchedPictureFill: z.object({
          contentUrl: z.unknown(),
          size: z.unknown(),
        }),
      }),
    }),
    pageType: z.string(),
    revisionId: z.string(),
    slideProperties: z.object({
      isSkipped: z.boolean(),
      layoutObjectId: z.string(),
      masterObjectId: z.string(),
      notesPage: z.record(z.string(), z.unknown()),
    }),
  })).optional(),
  title: z.string().optional(),
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
  layouts: z.array(z.object({
    commentAnchors: z.array(z.object({
      anchorId: z.string().describe(
        "Output only. The unique ID of the comment anchor.",
      ).optional(),
      objectAnchors: z.array(z.unknown()).describe(
        "Output only. All object ID-based locations within a page that refer to the anchor ID.",
      ).optional(),
    })).describe(
      "Output only. The comment anchors present on the page. [Developer Preview](https://developers.google.com/workspace/preview).",
    ).optional(),
    comments: z.array(z.object({
      anchorId: z.string().describe(
        "The ID of the CommentAnchor in the presentation that this thread is tied to.",
      ).optional(),
      commentId: z.string().describe("The unique ID of the comment thread.")
        .optional(),
      headPost: z.object({
        assigneeEmail: z.unknown().describe(
          "Optional. The email of the user who is being newly assigned to the thread as part of this post. Returns a 400 bad request error if: - The parent thread is a CommentThread whose headPost does not have an assignee. - commentAction is specified as `RESOLVE` or `REOPEN`. - `assignee_email` exceeds 2048 UTF-8 code units.",
        ).optional(),
        author: z.unknown().describe(
          "Output only. The user who created the post.",
        ).optional(),
        commentAction: z.unknown().describe(
          "Action taken as part of creating the post.",
        ).optional(),
        content: z.unknown().describe(
          "The content of the post. Required to be non-empty if comment_action is not `RESOLVE` or `REOPEN`. This text content will be handled similarly to comments created in the Slides editor. It will have similar behaviors for formatting, notifications, etc. May not exceed 2048 UTF-8 code units.",
        ).optional(),
        contentHtml: z.unknown().describe(
          "Output only. The content of the post as HTML.",
        ).optional(),
        createTime: z.unknown().describe(
          "Output only. The time the post was created.",
        ).optional(),
        deleted: z.unknown().describe(
          "Output only. Whether the post is deleted. If `true`, content and author fields will be empty.",
        ).optional(),
        fromCopiedPresentation: z.unknown().describe(
          "Output only. Whether the post is from a copied presentation. This field cannot be set directly by callers.",
        ).optional(),
        fromImportedPresentation: z.unknown().describe(
          "Output only. Whether the post is from an imported presentation. This field cannot be set directly by callers.",
        ).optional(),
        postId: z.unknown().describe("Output only. The unique ID of the post.")
          .optional(),
        updateTime: z.unknown().describe(
          "Output only. The time the post was last updated.",
        ).optional(),
      }).describe("The first post in the thread.").optional(),
      plainTextQuote: z.string().describe(
        "The quoted text from the page element when the comment was created, formatted as plain-text.",
      ).optional(),
      replies: z.array(z.unknown()).describe("Replies to the head post.")
        .optional(),
      status: z.enum(["STATUS_UNSPECIFIED", "OPEN", "RESOLVED"]).describe(
        "Whether the thread is open or resolved.",
      ).optional(),
    })).describe(
      "Output only. The comment threads associated with the page. Only populated if the page was fetched via a GetPageRequest with a populated comments_view_mode. Otherwise, comments are returned in the Presentation via the GetPresentationRequest. [Developer Preview](https://developers.google.com/workspace/preview).",
    ).optional(),
    commentsViewMode: z.enum([
      "COMMENTS_VIEW_MODE_UNSPECIFIED",
      "COMMENTS_VIEW_MODE_DEFAULT_FOR_CURRENT_ACCESS",
      "COMMENTS_VIEW_MODE_OMITTED",
      "COMMENTS_VIEW_MODE_INCLUDED",
    ]).describe(
      "Output only. The comments view mode applied to the page. Only populated if the page was fetched via a GetPageRequest with a populated comments_view_mode. [Developer Preview](https://developers.google.com/workspace/preview).",
    ).optional(),
    layoutProperties: z.object({
      displayName: z.string().describe("The human-readable name of the layout.")
        .optional(),
      masterObjectId: z.string().describe(
        "The object ID of the master that this layout is based on.",
      ).optional(),
      name: z.string().describe("The name of the layout.").optional(),
    }).describe("Layout specific properties. Only set if page_type = LAYOUT.")
      .optional(),
    masterProperties: z.object({
      displayName: z.string().describe("The human-readable name of the master.")
        .optional(),
    }).describe("Master specific properties. Only set if page_type = MASTER.")
      .optional(),
    notesProperties: z.object({
      speakerNotesObjectId: z.string().describe(
        "The object ID of the shape on this notes page that contains the speaker notes for the corresponding slide. The actual shape may not always exist on the notes page. Inserting text using this object ID will automatically create the shape. In this case, the actual shape may have different object ID. The `GetPresentation` or `GetPage` action will always return the latest object ID.",
      ).optional(),
    }).describe("Notes specific properties. Only set if page_type = NOTES.")
      .optional(),
    objectId: z.string().describe(
      "The object ID for this page. Object IDs used by Page and PageElement share the same namespace.",
    ).optional(),
    pageElements: z.array(z.object({
      description: z.string().describe(
        "The description of the page element. Combined with title to display alt text. The field is not supported for Group elements.",
      ).optional(),
      elementGroup: z.object({
        children: z.unknown().describe(
          "The collection of elements in the group. The minimum size of a group is 2.",
        ).optional(),
      }).describe("A collection of page elements joined as a single unit.")
        .optional(),
      image: z.object({
        contentUrl: z.unknown().describe(
          "An URL to an image with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        imageProperties: z.unknown().describe("The properties of the image.")
          .optional(),
        placeholder: z.unknown().describe(
          "Placeholders are page elements that inherit from corresponding placeholders on layouts and masters. If set, the image is a placeholder image and any inherited properties can be resolved by looking at the parent placeholder identified by the Placeholder.parent_object_id field.",
        ).optional(),
        sourceUrl: z.unknown().describe(
          "The source URL is the URL used to insert the image. The source URL can be empty.",
        ).optional(),
      }).describe("An image page element.").optional(),
      line: z.object({
        lineCategory: z.unknown().describe(
          "The category of the line. It matches the `category` specified in CreateLineRequest, and can be updated with UpdateLineCategoryRequest.",
        ).optional(),
        lineProperties: z.unknown().describe("The properties of the line.")
          .optional(),
        lineType: z.unknown().describe("The type of the line.").optional(),
      }).describe("A line page element.").optional(),
      objectId: z.string().describe(
        "The object ID for this page element. Object IDs used by google.apps.slides.v1.Page and google.apps.slides.v1.PageElement share the same namespace.",
      ).optional(),
      shape: z.object({
        placeholder: z.unknown().describe(
          "Placeholders are page elements that inherit from corresponding placeholders on layouts and masters. If set, the shape is a placeholder shape and any inherited properties can be resolved by looking at the parent placeholder identified by the Placeholder.parent_object_id field.",
        ).optional(),
        shapeProperties: z.unknown().describe("The properties of the shape.")
          .optional(),
        shapeType: z.unknown().describe("The type of the shape.").optional(),
        text: z.unknown().describe("The text content of the shape.").optional(),
      }).describe("A generic shape.").optional(),
      sheetsChart: z.object({
        chartId: z.unknown().describe(
          "The ID of the specific chart in the Google Sheets spreadsheet that is embedded.",
        ).optional(),
        contentUrl: z.unknown().describe(
          "The URL of an image of the embedded chart, with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        sheetsChartProperties: z.unknown().describe(
          "The properties of the Sheets chart.",
        ).optional(),
        spreadsheetId: z.unknown().describe(
          "The ID of the Google Sheets spreadsheet that contains the source chart.",
        ).optional(),
      }).describe(
        "A linked chart embedded from Google Sheets. Unlinked charts are represented as images.",
      ).optional(),
      size: z.object({
        height: z.unknown().describe("The height of the object.").optional(),
        width: z.unknown().describe("The width of the object.").optional(),
      }).describe("The size of the page element.").optional(),
      speakerSpotlight: z.object({
        speakerSpotlightProperties: z.unknown().describe(
          "The properties of the Speaker Spotlight.",
        ).optional(),
      }).describe("A Speaker Spotlight.").optional(),
      table: z.object({
        columns: z.unknown().describe("Number of columns in the table.")
          .optional(),
        horizontalBorderRows: z.unknown().describe(
          "Properties of horizontal cell borders. A table's horizontal cell borders are represented as a grid. The grid has one more row than the number of rows in the table and the same number of columns as the table. For example, if the table is 3 x 3, its horizontal borders will be represented as a grid with 4 rows and 3 columns.",
        ).optional(),
        rows: z.unknown().describe("Number of rows in the table.").optional(),
        tableColumns: z.unknown().describe("Properties of each column.")
          .optional(),
        tableRows: z.unknown().describe(
          "Properties and contents of each row. Cells that span multiple rows are contained in only one of these rows and have a row_span greater than 1.",
        ).optional(),
        verticalBorderRows: z.unknown().describe(
          "Properties of vertical cell borders. A table's vertical cell borders are represented as a grid. The grid has the same number of rows as the table and one more column than the number of columns in the table. For example, if the table is 3 x 3, its vertical borders will be represented as a grid with 3 rows and 4 columns.",
        ).optional(),
      }).describe("A table page element.").optional(),
      title: z.string().describe(
        "The title of the page element. Combined with description to display alt text. The field is not supported for Group elements.",
      ).optional(),
      transform: z.object({
        scaleX: z.unknown().describe("The X coordinate scaling element.")
          .optional(),
        scaleY: z.unknown().describe("The Y coordinate scaling element.")
          .optional(),
        shearX: z.unknown().describe("The X coordinate shearing element.")
          .optional(),
        shearY: z.unknown().describe("The Y coordinate shearing element.")
          .optional(),
        translateX: z.unknown().describe(
          "The X coordinate translation element.",
        ).optional(),
        translateY: z.unknown().describe(
          "The Y coordinate translation element.",
        ).optional(),
        unit: z.unknown().describe("The units for translate elements.")
          .optional(),
      }).describe(
        "The transform of the page element. The visual appearance of the page element is determined by its absolute transform. To compute the absolute transform, preconcatenate a page element's transform with the transforms of all of its parent groups. If the page element is not in a group, its absolute transform is the same as the value in this field. The initial transform for the newly created Group is always the identity transform.",
      ).optional(),
      video: z.object({
        id: z.unknown().describe(
          "The video source's unique identifier for this video.",
        ).optional(),
        source: z.unknown().describe("The video source.").optional(),
        url: z.unknown().describe(
          "An URL to a video. The URL is valid as long as the source video exists and sharing settings do not change.",
        ).optional(),
        videoProperties: z.unknown().describe("The properties of the video.")
          .optional(),
      }).describe("A video page element.").optional(),
      wordArt: z.object({
        renderedText: z.unknown().describe("The text rendered as word art.")
          .optional(),
      }).describe("A word art page element.").optional(),
    })).describe("The page elements rendered on the page.").optional(),
    pageProperties: z.object({
      colorScheme: z.object({
        colors: z.array(z.unknown()).describe(
          "The ThemeColorType and corresponding concrete color pairs.",
        ).optional(),
      }).describe(
        "The color scheme of the page. If unset, the color scheme is inherited from a parent page. If the page has no parent, the color scheme uses a default Slides color scheme, matching the defaults in the Slides editor. Only the concrete colors of the first 12 ThemeColorTypes are editable. In addition, only the color scheme on `Master` pages can be updated. To update the field, a color scheme containing mappings from all the first 12 ThemeColorTypes to their concrete colors must be provided. Colors for the remaining ThemeColorTypes will be ignored.",
      ).optional(),
      pageBackgroundFill: z.object({
        propertyState: z.enum(["RENDERED", "NOT_RENDERED", "INHERIT"]).describe(
          "The background fill property state. Updating the fill on a page will implicitly update this field to `RENDERED`, unless another value is specified in the same request. To have no fill on a page, set this field to `NOT_RENDERED`. In this case, any other fill fields set in the same request will be ignored.",
        ).optional(),
        solidFill: z.object({
          alpha: z.unknown().describe(
            "The fraction of this `color` that should be applied to the pixel. That is, the final pixel color is defined by the equation: pixel color = alpha * (color) + (1.0 - alpha) * (background color) This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color.",
          ).optional(),
          color: z.unknown().describe("The color value of the solid fill.")
            .optional(),
        }).describe("Solid color fill.").optional(),
        stretchedPictureFill: z.object({
          contentUrl: z.unknown().describe(
            "Reading the content_url: An URL to a picture with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the picture as the original requester. Access to the picture may be lost if the presentation's sharing settings change. Writing the content_url: The picture is fetched once at insertion time and a copy is stored for display inside the presentation. Pictures must be less than 50MB in size, cannot exceed 25 megapixels, and must be in one of PNG, JPEG, or GIF format. The provided URL can be at most 2 kB in length.",
          ).optional(),
          size: z.unknown().describe(
            "The original size of the picture fill. This field is read-only.",
          ).optional(),
        }).describe("Stretched picture fill.").optional(),
      }).describe(
        "The background fill of the page. If unset, the background fill is inherited from a parent page if it exists. If the page has no parent, then the background fill defaults to the corresponding fill in the Slides editor.",
      ).optional(),
    }).describe("The properties of the page.").optional(),
    pageType: z.enum(["SLIDE", "MASTER", "LAYOUT", "NOTES", "NOTES_MASTER"])
      .describe("The type of the page.").optional(),
    revisionId: z.string().describe(
      "Output only. The revision ID of the presentation. Can be used in update requests to assert the presentation revision hasn't changed since the last read operation. Only populated if the user has edit access to the presentation. The revision ID is not a sequential number but an opaque string. The format of the revision ID might change over time. A returned revision ID is only guaranteed to be valid for 24 hours after it has been returned and cannot be shared across users. If the revision ID is unchanged between calls, then the presentation has not changed. Conversely, a changed ID (for the same presentation and user) usually means the presentation has been updated. However, a changed ID can also be due to internal factors such as ID format changes.",
    ).optional(),
    slideProperties: z.object({
      isSkipped: z.boolean().describe(
        "Whether the slide is skipped in the presentation mode. Defaults to false.",
      ).optional(),
      layoutObjectId: z.string().describe(
        "The object ID of the layout that this slide is based on. This property is read-only.",
      ).optional(),
      masterObjectId: z.string().describe(
        "The object ID of the master that this slide is based on. This property is read-only.",
      ).optional(),
      notesPage: z.record(z.string(), z.unknown()).describe(
        "Circular reference to Page",
      ).optional(),
    }).describe("Slide specific properties. Only set if page_type = SLIDE.")
      .optional(),
  })).describe(
    "The layouts in the presentation. A layout is a template that determines how content is arranged and styled on the slides that inherit from that layout.",
  ).optional(),
  locale: z.string().describe(
    "The locale of the presentation, as an IETF BCP 47 language tag.",
  ).optional(),
  masters: z.array(z.object({
    commentAnchors: z.array(z.object({
      anchorId: z.string().describe(
        "Output only. The unique ID of the comment anchor.",
      ).optional(),
      objectAnchors: z.array(z.unknown()).describe(
        "Output only. All object ID-based locations within a page that refer to the anchor ID.",
      ).optional(),
    })).describe(
      "Output only. The comment anchors present on the page. [Developer Preview](https://developers.google.com/workspace/preview).",
    ).optional(),
    comments: z.array(z.object({
      anchorId: z.string().describe(
        "The ID of the CommentAnchor in the presentation that this thread is tied to.",
      ).optional(),
      commentId: z.string().describe("The unique ID of the comment thread.")
        .optional(),
      headPost: z.object({
        assigneeEmail: z.unknown().describe(
          "Optional. The email of the user who is being newly assigned to the thread as part of this post. Returns a 400 bad request error if: - The parent thread is a CommentThread whose headPost does not have an assignee. - commentAction is specified as `RESOLVE` or `REOPEN`. - `assignee_email` exceeds 2048 UTF-8 code units.",
        ).optional(),
        author: z.unknown().describe(
          "Output only. The user who created the post.",
        ).optional(),
        commentAction: z.unknown().describe(
          "Action taken as part of creating the post.",
        ).optional(),
        content: z.unknown().describe(
          "The content of the post. Required to be non-empty if comment_action is not `RESOLVE` or `REOPEN`. This text content will be handled similarly to comments created in the Slides editor. It will have similar behaviors for formatting, notifications, etc. May not exceed 2048 UTF-8 code units.",
        ).optional(),
        contentHtml: z.unknown().describe(
          "Output only. The content of the post as HTML.",
        ).optional(),
        createTime: z.unknown().describe(
          "Output only. The time the post was created.",
        ).optional(),
        deleted: z.unknown().describe(
          "Output only. Whether the post is deleted. If `true`, content and author fields will be empty.",
        ).optional(),
        fromCopiedPresentation: z.unknown().describe(
          "Output only. Whether the post is from a copied presentation. This field cannot be set directly by callers.",
        ).optional(),
        fromImportedPresentation: z.unknown().describe(
          "Output only. Whether the post is from an imported presentation. This field cannot be set directly by callers.",
        ).optional(),
        postId: z.unknown().describe("Output only. The unique ID of the post.")
          .optional(),
        updateTime: z.unknown().describe(
          "Output only. The time the post was last updated.",
        ).optional(),
      }).describe("The first post in the thread.").optional(),
      plainTextQuote: z.string().describe(
        "The quoted text from the page element when the comment was created, formatted as plain-text.",
      ).optional(),
      replies: z.array(z.unknown()).describe("Replies to the head post.")
        .optional(),
      status: z.enum(["STATUS_UNSPECIFIED", "OPEN", "RESOLVED"]).describe(
        "Whether the thread is open or resolved.",
      ).optional(),
    })).describe(
      "Output only. The comment threads associated with the page. Only populated if the page was fetched via a GetPageRequest with a populated comments_view_mode. Otherwise, comments are returned in the Presentation via the GetPresentationRequest. [Developer Preview](https://developers.google.com/workspace/preview).",
    ).optional(),
    commentsViewMode: z.enum([
      "COMMENTS_VIEW_MODE_UNSPECIFIED",
      "COMMENTS_VIEW_MODE_DEFAULT_FOR_CURRENT_ACCESS",
      "COMMENTS_VIEW_MODE_OMITTED",
      "COMMENTS_VIEW_MODE_INCLUDED",
    ]).describe(
      "Output only. The comments view mode applied to the page. Only populated if the page was fetched via a GetPageRequest with a populated comments_view_mode. [Developer Preview](https://developers.google.com/workspace/preview).",
    ).optional(),
    layoutProperties: z.object({
      displayName: z.string().describe("The human-readable name of the layout.")
        .optional(),
      masterObjectId: z.string().describe(
        "The object ID of the master that this layout is based on.",
      ).optional(),
      name: z.string().describe("The name of the layout.").optional(),
    }).describe("Layout specific properties. Only set if page_type = LAYOUT.")
      .optional(),
    masterProperties: z.object({
      displayName: z.string().describe("The human-readable name of the master.")
        .optional(),
    }).describe("Master specific properties. Only set if page_type = MASTER.")
      .optional(),
    notesProperties: z.object({
      speakerNotesObjectId: z.string().describe(
        "The object ID of the shape on this notes page that contains the speaker notes for the corresponding slide. The actual shape may not always exist on the notes page. Inserting text using this object ID will automatically create the shape. In this case, the actual shape may have different object ID. The `GetPresentation` or `GetPage` action will always return the latest object ID.",
      ).optional(),
    }).describe("Notes specific properties. Only set if page_type = NOTES.")
      .optional(),
    objectId: z.string().describe(
      "The object ID for this page. Object IDs used by Page and PageElement share the same namespace.",
    ).optional(),
    pageElements: z.array(z.object({
      description: z.string().describe(
        "The description of the page element. Combined with title to display alt text. The field is not supported for Group elements.",
      ).optional(),
      elementGroup: z.object({
        children: z.unknown().describe(
          "The collection of elements in the group. The minimum size of a group is 2.",
        ).optional(),
      }).describe("A collection of page elements joined as a single unit.")
        .optional(),
      image: z.object({
        contentUrl: z.unknown().describe(
          "An URL to an image with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        imageProperties: z.unknown().describe("The properties of the image.")
          .optional(),
        placeholder: z.unknown().describe(
          "Placeholders are page elements that inherit from corresponding placeholders on layouts and masters. If set, the image is a placeholder image and any inherited properties can be resolved by looking at the parent placeholder identified by the Placeholder.parent_object_id field.",
        ).optional(),
        sourceUrl: z.unknown().describe(
          "The source URL is the URL used to insert the image. The source URL can be empty.",
        ).optional(),
      }).describe("An image page element.").optional(),
      line: z.object({
        lineCategory: z.unknown().describe(
          "The category of the line. It matches the `category` specified in CreateLineRequest, and can be updated with UpdateLineCategoryRequest.",
        ).optional(),
        lineProperties: z.unknown().describe("The properties of the line.")
          .optional(),
        lineType: z.unknown().describe("The type of the line.").optional(),
      }).describe("A line page element.").optional(),
      objectId: z.string().describe(
        "The object ID for this page element. Object IDs used by google.apps.slides.v1.Page and google.apps.slides.v1.PageElement share the same namespace.",
      ).optional(),
      shape: z.object({
        placeholder: z.unknown().describe(
          "Placeholders are page elements that inherit from corresponding placeholders on layouts and masters. If set, the shape is a placeholder shape and any inherited properties can be resolved by looking at the parent placeholder identified by the Placeholder.parent_object_id field.",
        ).optional(),
        shapeProperties: z.unknown().describe("The properties of the shape.")
          .optional(),
        shapeType: z.unknown().describe("The type of the shape.").optional(),
        text: z.unknown().describe("The text content of the shape.").optional(),
      }).describe("A generic shape.").optional(),
      sheetsChart: z.object({
        chartId: z.unknown().describe(
          "The ID of the specific chart in the Google Sheets spreadsheet that is embedded.",
        ).optional(),
        contentUrl: z.unknown().describe(
          "The URL of an image of the embedded chart, with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        sheetsChartProperties: z.unknown().describe(
          "The properties of the Sheets chart.",
        ).optional(),
        spreadsheetId: z.unknown().describe(
          "The ID of the Google Sheets spreadsheet that contains the source chart.",
        ).optional(),
      }).describe(
        "A linked chart embedded from Google Sheets. Unlinked charts are represented as images.",
      ).optional(),
      size: z.object({
        height: z.unknown().describe("The height of the object.").optional(),
        width: z.unknown().describe("The width of the object.").optional(),
      }).describe("The size of the page element.").optional(),
      speakerSpotlight: z.object({
        speakerSpotlightProperties: z.unknown().describe(
          "The properties of the Speaker Spotlight.",
        ).optional(),
      }).describe("A Speaker Spotlight.").optional(),
      table: z.object({
        columns: z.unknown().describe("Number of columns in the table.")
          .optional(),
        horizontalBorderRows: z.unknown().describe(
          "Properties of horizontal cell borders. A table's horizontal cell borders are represented as a grid. The grid has one more row than the number of rows in the table and the same number of columns as the table. For example, if the table is 3 x 3, its horizontal borders will be represented as a grid with 4 rows and 3 columns.",
        ).optional(),
        rows: z.unknown().describe("Number of rows in the table.").optional(),
        tableColumns: z.unknown().describe("Properties of each column.")
          .optional(),
        tableRows: z.unknown().describe(
          "Properties and contents of each row. Cells that span multiple rows are contained in only one of these rows and have a row_span greater than 1.",
        ).optional(),
        verticalBorderRows: z.unknown().describe(
          "Properties of vertical cell borders. A table's vertical cell borders are represented as a grid. The grid has the same number of rows as the table and one more column than the number of columns in the table. For example, if the table is 3 x 3, its vertical borders will be represented as a grid with 3 rows and 4 columns.",
        ).optional(),
      }).describe("A table page element.").optional(),
      title: z.string().describe(
        "The title of the page element. Combined with description to display alt text. The field is not supported for Group elements.",
      ).optional(),
      transform: z.object({
        scaleX: z.unknown().describe("The X coordinate scaling element.")
          .optional(),
        scaleY: z.unknown().describe("The Y coordinate scaling element.")
          .optional(),
        shearX: z.unknown().describe("The X coordinate shearing element.")
          .optional(),
        shearY: z.unknown().describe("The Y coordinate shearing element.")
          .optional(),
        translateX: z.unknown().describe(
          "The X coordinate translation element.",
        ).optional(),
        translateY: z.unknown().describe(
          "The Y coordinate translation element.",
        ).optional(),
        unit: z.unknown().describe("The units for translate elements.")
          .optional(),
      }).describe(
        "The transform of the page element. The visual appearance of the page element is determined by its absolute transform. To compute the absolute transform, preconcatenate a page element's transform with the transforms of all of its parent groups. If the page element is not in a group, its absolute transform is the same as the value in this field. The initial transform for the newly created Group is always the identity transform.",
      ).optional(),
      video: z.object({
        id: z.unknown().describe(
          "The video source's unique identifier for this video.",
        ).optional(),
        source: z.unknown().describe("The video source.").optional(),
        url: z.unknown().describe(
          "An URL to a video. The URL is valid as long as the source video exists and sharing settings do not change.",
        ).optional(),
        videoProperties: z.unknown().describe("The properties of the video.")
          .optional(),
      }).describe("A video page element.").optional(),
      wordArt: z.object({
        renderedText: z.unknown().describe("The text rendered as word art.")
          .optional(),
      }).describe("A word art page element.").optional(),
    })).describe("The page elements rendered on the page.").optional(),
    pageProperties: z.object({
      colorScheme: z.object({
        colors: z.array(z.unknown()).describe(
          "The ThemeColorType and corresponding concrete color pairs.",
        ).optional(),
      }).describe(
        "The color scheme of the page. If unset, the color scheme is inherited from a parent page. If the page has no parent, the color scheme uses a default Slides color scheme, matching the defaults in the Slides editor. Only the concrete colors of the first 12 ThemeColorTypes are editable. In addition, only the color scheme on `Master` pages can be updated. To update the field, a color scheme containing mappings from all the first 12 ThemeColorTypes to their concrete colors must be provided. Colors for the remaining ThemeColorTypes will be ignored.",
      ).optional(),
      pageBackgroundFill: z.object({
        propertyState: z.enum(["RENDERED", "NOT_RENDERED", "INHERIT"]).describe(
          "The background fill property state. Updating the fill on a page will implicitly update this field to `RENDERED`, unless another value is specified in the same request. To have no fill on a page, set this field to `NOT_RENDERED`. In this case, any other fill fields set in the same request will be ignored.",
        ).optional(),
        solidFill: z.object({
          alpha: z.unknown().describe(
            "The fraction of this `color` that should be applied to the pixel. That is, the final pixel color is defined by the equation: pixel color = alpha * (color) + (1.0 - alpha) * (background color) This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color.",
          ).optional(),
          color: z.unknown().describe("The color value of the solid fill.")
            .optional(),
        }).describe("Solid color fill.").optional(),
        stretchedPictureFill: z.object({
          contentUrl: z.unknown().describe(
            "Reading the content_url: An URL to a picture with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the picture as the original requester. Access to the picture may be lost if the presentation's sharing settings change. Writing the content_url: The picture is fetched once at insertion time and a copy is stored for display inside the presentation. Pictures must be less than 50MB in size, cannot exceed 25 megapixels, and must be in one of PNG, JPEG, or GIF format. The provided URL can be at most 2 kB in length.",
          ).optional(),
          size: z.unknown().describe(
            "The original size of the picture fill. This field is read-only.",
          ).optional(),
        }).describe("Stretched picture fill.").optional(),
      }).describe(
        "The background fill of the page. If unset, the background fill is inherited from a parent page if it exists. If the page has no parent, then the background fill defaults to the corresponding fill in the Slides editor.",
      ).optional(),
    }).describe("The properties of the page.").optional(),
    pageType: z.enum(["SLIDE", "MASTER", "LAYOUT", "NOTES", "NOTES_MASTER"])
      .describe("The type of the page.").optional(),
    revisionId: z.string().describe(
      "Output only. The revision ID of the presentation. Can be used in update requests to assert the presentation revision hasn't changed since the last read operation. Only populated if the user has edit access to the presentation. The revision ID is not a sequential number but an opaque string. The format of the revision ID might change over time. A returned revision ID is only guaranteed to be valid for 24 hours after it has been returned and cannot be shared across users. If the revision ID is unchanged between calls, then the presentation has not changed. Conversely, a changed ID (for the same presentation and user) usually means the presentation has been updated. However, a changed ID can also be due to internal factors such as ID format changes.",
    ).optional(),
    slideProperties: z.object({
      isSkipped: z.boolean().describe(
        "Whether the slide is skipped in the presentation mode. Defaults to false.",
      ).optional(),
      layoutObjectId: z.string().describe(
        "The object ID of the layout that this slide is based on. This property is read-only.",
      ).optional(),
      masterObjectId: z.string().describe(
        "The object ID of the master that this slide is based on. This property is read-only.",
      ).optional(),
      notesPage: z.record(z.string(), z.unknown()).describe(
        "Circular reference to Page",
      ).optional(),
    }).describe("Slide specific properties. Only set if page_type = SLIDE.")
      .optional(),
  })).describe(
    "The slide masters in the presentation. A slide master contains all common page elements and the common properties for a set of layouts. They serve three purposes: - Placeholder shapes on a master contain the default text styles and shape properties of all placeholder shapes on pages that use that master. - The master page properties define the common page properties inherited by its layouts. - Any other shapes on the master slide appear on all slides using that master, regardless of their layout.",
  ).optional(),
  notesMaster: z.object({
    commentAnchors: z.array(z.object({
      anchorId: z.string().describe(
        "Output only. The unique ID of the comment anchor.",
      ).optional(),
      objectAnchors: z.array(z.object({
        objectId: z.unknown().describe(
          "Output only. The page or page element that the comment thread is anchored to.",
        ).optional(),
        shapeTextAnchors: z.unknown().describe(
          "Populated for Shapes that have comments anchored to ranges of text in the shape's text.",
        ).optional(),
        tableCellAnchors: z.unknown().describe(
          "Populated for Tables that have comments anchored to ranges of text in one or more of the table's cells.",
        ).optional(),
      })).describe(
        "Output only. All object ID-based locations within a page that refer to the anchor ID.",
      ).optional(),
    })).describe(
      "Output only. The comment anchors present on the page. [Developer Preview](https://developers.google.com/workspace/preview).",
    ).optional(),
    comments: z.array(z.object({
      anchorId: z.string().describe(
        "The ID of the CommentAnchor in the presentation that this thread is tied to.",
      ).optional(),
      commentId: z.string().describe("The unique ID of the comment thread.")
        .optional(),
      headPost: z.object({
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
            "The resource name of the post author user, which can also be used to identify the user in the [Google People API](https://developers.google.com/people/api/rest/v1/people). Format: `users/{user}`. Will not be populated if the anonymous field is `true` or if the post is from an imported presentation.",
          ).optional(),
        }).describe("Output only. The user who created the post.").optional(),
        commentAction: z.enum([
          "COMMENT_ACTION_TYPE_UNSPECIFIED",
          "NO_COMMENT_ACTION_CHANGE",
          "RESOLVE",
          "REOPEN",
        ]).describe("Action taken as part of creating the post.").optional(),
        content: z.string().describe(
          "The content of the post. Required to be non-empty if comment_action is not `RESOLVE` or `REOPEN`. This text content will be handled similarly to comments created in the Slides editor. It will have similar behaviors for formatting, notifications, etc. May not exceed 2048 UTF-8 code units.",
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
        fromCopiedPresentation: z.boolean().describe(
          "Output only. Whether the post is from a copied presentation. This field cannot be set directly by callers.",
        ).optional(),
        fromImportedPresentation: z.boolean().describe(
          "Output only. Whether the post is from an imported presentation. This field cannot be set directly by callers.",
        ).optional(),
        postId: z.string().describe("Output only. The unique ID of the post.")
          .optional(),
        updateTime: z.string().describe(
          "Output only. The time the post was last updated.",
        ).optional(),
      }).describe("The first post in the thread.").optional(),
      plainTextQuote: z.string().describe(
        "The quoted text from the page element when the comment was created, formatted as plain-text.",
      ).optional(),
      replies: z.array(z.object({
        assigneeEmail: z.unknown().describe(
          "Optional. The email of the user who is being newly assigned to the thread as part of this post. Returns a 400 bad request error if: - The parent thread is a CommentThread whose headPost does not have an assignee. - commentAction is specified as `RESOLVE` or `REOPEN`. - `assignee_email` exceeds 2048 UTF-8 code units.",
        ).optional(),
        author: z.unknown().describe(
          "Output only. The user who created the post.",
        ).optional(),
        commentAction: z.unknown().describe(
          "Action taken as part of creating the post.",
        ).optional(),
        content: z.unknown().describe(
          "The content of the post. Required to be non-empty if comment_action is not `RESOLVE` or `REOPEN`. This text content will be handled similarly to comments created in the Slides editor. It will have similar behaviors for formatting, notifications, etc. May not exceed 2048 UTF-8 code units.",
        ).optional(),
        contentHtml: z.unknown().describe(
          "Output only. The content of the post as HTML.",
        ).optional(),
        createTime: z.unknown().describe(
          "Output only. The time the post was created.",
        ).optional(),
        deleted: z.unknown().describe(
          "Output only. Whether the post is deleted. If `true`, content and author fields will be empty.",
        ).optional(),
        fromCopiedPresentation: z.unknown().describe(
          "Output only. Whether the post is from a copied presentation. This field cannot be set directly by callers.",
        ).optional(),
        fromImportedPresentation: z.unknown().describe(
          "Output only. Whether the post is from an imported presentation. This field cannot be set directly by callers.",
        ).optional(),
        postId: z.unknown().describe("Output only. The unique ID of the post.")
          .optional(),
        updateTime: z.unknown().describe(
          "Output only. The time the post was last updated.",
        ).optional(),
      })).describe("Replies to the head post.").optional(),
      status: z.enum(["STATUS_UNSPECIFIED", "OPEN", "RESOLVED"]).describe(
        "Whether the thread is open or resolved.",
      ).optional(),
    })).describe(
      "Output only. The comment threads associated with the page. Only populated if the page was fetched via a GetPageRequest with a populated comments_view_mode. Otherwise, comments are returned in the Presentation via the GetPresentationRequest. [Developer Preview](https://developers.google.com/workspace/preview).",
    ).optional(),
    commentsViewMode: z.enum([
      "COMMENTS_VIEW_MODE_UNSPECIFIED",
      "COMMENTS_VIEW_MODE_DEFAULT_FOR_CURRENT_ACCESS",
      "COMMENTS_VIEW_MODE_OMITTED",
      "COMMENTS_VIEW_MODE_INCLUDED",
    ]).describe(
      "Output only. The comments view mode applied to the page. Only populated if the page was fetched via a GetPageRequest with a populated comments_view_mode. [Developer Preview](https://developers.google.com/workspace/preview).",
    ).optional(),
    layoutProperties: z.object({
      displayName: z.string().describe("The human-readable name of the layout.")
        .optional(),
      masterObjectId: z.string().describe(
        "The object ID of the master that this layout is based on.",
      ).optional(),
      name: z.string().describe("The name of the layout.").optional(),
    }).describe("Layout specific properties. Only set if page_type = LAYOUT.")
      .optional(),
    masterProperties: z.object({
      displayName: z.string().describe("The human-readable name of the master.")
        .optional(),
    }).describe("Master specific properties. Only set if page_type = MASTER.")
      .optional(),
    notesProperties: z.object({
      speakerNotesObjectId: z.string().describe(
        "The object ID of the shape on this notes page that contains the speaker notes for the corresponding slide. The actual shape may not always exist on the notes page. Inserting text using this object ID will automatically create the shape. In this case, the actual shape may have different object ID. The `GetPresentation` or `GetPage` action will always return the latest object ID.",
      ).optional(),
    }).describe("Notes specific properties. Only set if page_type = NOTES.")
      .optional(),
    objectId: z.string().describe(
      "The object ID for this page. Object IDs used by Page and PageElement share the same namespace.",
    ).optional(),
    pageElements: z.array(z.object({
      description: z.string().describe(
        "The description of the page element. Combined with title to display alt text. The field is not supported for Group elements.",
      ).optional(),
      elementGroup: z.object({
        children: z.array(z.unknown()).describe(
          "The collection of elements in the group. The minimum size of a group is 2.",
        ).optional(),
      }).describe("A collection of page elements joined as a single unit.")
        .optional(),
      image: z.object({
        contentUrl: z.string().describe(
          "An URL to an image with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        imageProperties: z.object({
          brightness: z.unknown().describe(
            "The brightness effect of the image. The value should be in the interval [-1.0, 1.0], where 0 means no effect. This property is read-only.",
          ).optional(),
          contrast: z.unknown().describe(
            "The contrast effect of the image. The value should be in the interval [-1.0, 1.0], where 0 means no effect. This property is read-only.",
          ).optional(),
          cropProperties: z.unknown().describe(
            "The crop properties of the image. If not set, the image is not cropped. This property is read-only.",
          ).optional(),
          link: z.unknown().describe(
            "The hyperlink destination of the image. If unset, there is no link.",
          ).optional(),
          outline: z.unknown().describe(
            "The outline of the image. If not set, the image has no outline.",
          ).optional(),
          recolor: z.unknown().describe(
            "The recolor effect of the image. If not set, the image is not recolored. This property is read-only.",
          ).optional(),
          shadow: z.unknown().describe(
            "The shadow of the image. If not set, the image has no shadow. This property is read-only.",
          ).optional(),
          transparency: z.unknown().describe(
            "The transparency effect of the image. The value should be in the interval [0.0, 1.0], where 0 means no effect and 1 means completely transparent. This property is read-only.",
          ).optional(),
        }).describe("The properties of the image.").optional(),
        placeholder: z.object({
          index: z.unknown().describe(
            "The index of the placeholder. If the same placeholder types are present in the same page, they would have different index values.",
          ).optional(),
          parentObjectId: z.unknown().describe(
            "The object ID of this shape's parent placeholder. If unset, the parent placeholder shape does not exist, so the shape does not inherit properties from any other shape.",
          ).optional(),
          type: z.unknown().describe("The type of the placeholder.").optional(),
        }).describe(
          "Placeholders are page elements that inherit from corresponding placeholders on layouts and masters. If set, the image is a placeholder image and any inherited properties can be resolved by looking at the parent placeholder identified by the Placeholder.parent_object_id field.",
        ).optional(),
        sourceUrl: z.string().describe(
          "The source URL is the URL used to insert the image. The source URL can be empty.",
        ).optional(),
      }).describe("An image page element.").optional(),
      line: z.object({
        lineCategory: z.enum([
          "LINE_CATEGORY_UNSPECIFIED",
          "STRAIGHT",
          "BENT",
          "CURVED",
        ]).describe(
          "The category of the line. It matches the `category` specified in CreateLineRequest, and can be updated with UpdateLineCategoryRequest.",
        ).optional(),
        lineProperties: z.object({
          dashStyle: z.unknown().describe("The dash style of the line.")
            .optional(),
          endArrow: z.unknown().describe(
            "The style of the arrow at the end of the line.",
          ).optional(),
          endConnection: z.unknown().describe(
            'The connection at the end of the line. If unset, there is no connection. Only lines with a Type indicating it is a "connector" can have an `end_connection`.',
          ).optional(),
          lineFill: z.unknown().describe(
            "The fill of the line. The default line fill matches the defaults for new lines created in the Slides editor.",
          ).optional(),
          link: z.unknown().describe(
            "The hyperlink destination of the line. If unset, there is no link.",
          ).optional(),
          startArrow: z.unknown().describe(
            "The style of the arrow at the beginning of the line.",
          ).optional(),
          startConnection: z.unknown().describe(
            'The connection at the beginning of the line. If unset, there is no connection. Only lines with a Type indicating it is a "connector" can have a `start_connection`.',
          ).optional(),
          weight: z.unknown().describe("The thickness of the line.").optional(),
        }).describe("The properties of the line.").optional(),
        lineType: z.enum([
          "TYPE_UNSPECIFIED",
          "STRAIGHT_CONNECTOR_1",
          "BENT_CONNECTOR_2",
          "BENT_CONNECTOR_3",
          "BENT_CONNECTOR_4",
          "BENT_CONNECTOR_5",
          "CURVED_CONNECTOR_2",
          "CURVED_CONNECTOR_3",
          "CURVED_CONNECTOR_4",
          "CURVED_CONNECTOR_5",
          "STRAIGHT_LINE",
        ]).describe("The type of the line.").optional(),
      }).describe("A line page element.").optional(),
      objectId: z.string().describe(
        "The object ID for this page element. Object IDs used by google.apps.slides.v1.Page and google.apps.slides.v1.PageElement share the same namespace.",
      ).optional(),
      shape: z.object({
        placeholder: z.object({
          index: z.unknown().describe(
            "The index of the placeholder. If the same placeholder types are present in the same page, they would have different index values.",
          ).optional(),
          parentObjectId: z.unknown().describe(
            "The object ID of this shape's parent placeholder. If unset, the parent placeholder shape does not exist, so the shape does not inherit properties from any other shape.",
          ).optional(),
          type: z.unknown().describe("The type of the placeholder.").optional(),
        }).describe(
          "Placeholders are page elements that inherit from corresponding placeholders on layouts and masters. If set, the shape is a placeholder shape and any inherited properties can be resolved by looking at the parent placeholder identified by the Placeholder.parent_object_id field.",
        ).optional(),
        shapeProperties: z.object({
          autofit: z.unknown().describe(
            "The autofit properties of the shape. This property is only set for shapes that allow text.",
          ).optional(),
          contentAlignment: z.unknown().describe(
            "The alignment of the content in the shape. If unspecified, the alignment is inherited from a parent placeholder if it exists. If the shape has no parent, the default alignment matches the alignment for new shapes created in the Slides editor.",
          ).optional(),
          link: z.unknown().describe(
            "The hyperlink destination of the shape. If unset, there is no link. Links are not inherited from parent placeholders.",
          ).optional(),
          outline: z.unknown().describe(
            "The outline of the shape. If unset, the outline is inherited from a parent placeholder if it exists. If the shape has no parent, then the default outline depends on the shape type, matching the defaults for new shapes created in the Slides editor.",
          ).optional(),
          shadow: z.unknown().describe(
            "The shadow properties of the shape. If unset, the shadow is inherited from a parent placeholder if it exists. If the shape has no parent, then the default shadow matches the defaults for new shapes created in the Slides editor. This property is read-only.",
          ).optional(),
          shapeBackgroundFill: z.unknown().describe(
            "The background fill of the shape. If unset, the background fill is inherited from a parent placeholder if it exists. If the shape has no parent, then the default background fill depends on the shape type, matching the defaults for new shapes created in the Slides editor.",
          ).optional(),
        }).describe("The properties of the shape.").optional(),
        shapeType: z.enum([
          "TYPE_UNSPECIFIED",
          "TEXT_BOX",
          "RECTANGLE",
          "ROUND_RECTANGLE",
          "ELLIPSE",
          "ARC",
          "BENT_ARROW",
          "BENT_UP_ARROW",
          "BEVEL",
          "BLOCK_ARC",
          "BRACE_PAIR",
          "BRACKET_PAIR",
          "CAN",
          "CHEVRON",
          "CHORD",
          "CLOUD",
          "CORNER",
          "CUBE",
          "CURVED_DOWN_ARROW",
          "CURVED_LEFT_ARROW",
          "CURVED_RIGHT_ARROW",
          "CURVED_UP_ARROW",
          "DECAGON",
          "DIAGONAL_STRIPE",
          "DIAMOND",
          "DODECAGON",
          "DONUT",
          "DOUBLE_WAVE",
          "DOWN_ARROW",
          "DOWN_ARROW_CALLOUT",
          "FOLDED_CORNER",
          "FRAME",
          "HALF_FRAME",
          "HEART",
          "HEPTAGON",
          "HEXAGON",
          "HOME_PLATE",
          "HORIZONTAL_SCROLL",
          "IRREGULAR_SEAL_1",
          "IRREGULAR_SEAL_2",
          "LEFT_ARROW",
          "LEFT_ARROW_CALLOUT",
          "LEFT_BRACE",
          "LEFT_BRACKET",
          "LEFT_RIGHT_ARROW",
          "LEFT_RIGHT_ARROW_CALLOUT",
          "LEFT_RIGHT_UP_ARROW",
          "LEFT_UP_ARROW",
          "LIGHTNING_BOLT",
          "MATH_DIVIDE",
          "MATH_EQUAL",
          "MATH_MINUS",
          "MATH_MULTIPLY",
          "MATH_NOT_EQUAL",
          "MATH_PLUS",
          "MOON",
          "NO_SMOKING",
          "NOTCHED_RIGHT_ARROW",
          "OCTAGON",
          "PARALLELOGRAM",
          "PENTAGON",
          "PIE",
          "PLAQUE",
          "PLUS",
          "QUAD_ARROW",
          "QUAD_ARROW_CALLOUT",
          "RIBBON",
          "RIBBON_2",
          "RIGHT_ARROW",
          "RIGHT_ARROW_CALLOUT",
          "RIGHT_BRACE",
          "RIGHT_BRACKET",
          "ROUND_1_RECTANGLE",
          "ROUND_2_DIAGONAL_RECTANGLE",
          "ROUND_2_SAME_RECTANGLE",
          "RIGHT_TRIANGLE",
          "SMILEY_FACE",
          "SNIP_1_RECTANGLE",
          "SNIP_2_DIAGONAL_RECTANGLE",
          "SNIP_2_SAME_RECTANGLE",
          "SNIP_ROUND_RECTANGLE",
          "STAR_10",
          "STAR_12",
          "STAR_16",
          "STAR_24",
          "STAR_32",
          "STAR_4",
          "STAR_5",
          "STAR_6",
          "STAR_7",
          "STAR_8",
          "STRIPED_RIGHT_ARROW",
          "SUN",
          "TRAPEZOID",
          "TRIANGLE",
          "UP_ARROW",
          "UP_ARROW_CALLOUT",
          "UP_DOWN_ARROW",
          "UTURN_ARROW",
          "VERTICAL_SCROLL",
          "WAVE",
          "WEDGE_ELLIPSE_CALLOUT",
          "WEDGE_RECTANGLE_CALLOUT",
          "WEDGE_ROUND_RECTANGLE_CALLOUT",
          "FLOW_CHART_ALTERNATE_PROCESS",
          "FLOW_CHART_COLLATE",
          "FLOW_CHART_CONNECTOR",
          "FLOW_CHART_DECISION",
          "FLOW_CHART_DELAY",
          "FLOW_CHART_DISPLAY",
          "FLOW_CHART_DOCUMENT",
          "FLOW_CHART_EXTRACT",
          "FLOW_CHART_INPUT_OUTPUT",
          "FLOW_CHART_INTERNAL_STORAGE",
          "FLOW_CHART_MAGNETIC_DISK",
          "FLOW_CHART_MAGNETIC_DRUM",
          "FLOW_CHART_MAGNETIC_TAPE",
          "FLOW_CHART_MANUAL_INPUT",
          "FLOW_CHART_MANUAL_OPERATION",
          "FLOW_CHART_MERGE",
          "FLOW_CHART_MULTIDOCUMENT",
          "FLOW_CHART_OFFLINE_STORAGE",
          "FLOW_CHART_OFFPAGE_CONNECTOR",
          "FLOW_CHART_ONLINE_STORAGE",
          "FLOW_CHART_OR",
          "FLOW_CHART_PREDEFINED_PROCESS",
          "FLOW_CHART_PREPARATION",
          "FLOW_CHART_PROCESS",
          "FLOW_CHART_PUNCHED_CARD",
          "FLOW_CHART_PUNCHED_TAPE",
          "FLOW_CHART_SORT",
          "FLOW_CHART_SUMMING_JUNCTION",
          "FLOW_CHART_TERMINATOR",
          "ARROW_EAST",
          "ARROW_NORTH_EAST",
          "ARROW_NORTH",
          "SPEECH",
          "STARBURST",
          "TEARDROP",
          "ELLIPSE_RIBBON",
          "ELLIPSE_RIBBON_2",
          "CLOUD_CALLOUT",
          "CUSTOM",
        ]).describe("The type of the shape.").optional(),
        text: z.object({
          lists: z.unknown().describe(
            "The bulleted lists contained in this text, keyed by list ID.",
          ).optional(),
          textElements: z.unknown().describe(
            "The text contents broken down into its component parts, including styling information. This property is read-only.",
          ).optional(),
        }).describe("The text content of the shape.").optional(),
      }).describe("A generic shape.").optional(),
      sheetsChart: z.object({
        chartId: z.number().int().describe(
          "The ID of the specific chart in the Google Sheets spreadsheet that is embedded.",
        ).optional(),
        contentUrl: z.string().describe(
          "The URL of an image of the embedded chart, with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        sheetsChartProperties: z.object({
          chartImageProperties: z.unknown().describe(
            "The properties of the embedded chart image.",
          ).optional(),
        }).describe("The properties of the Sheets chart.").optional(),
        spreadsheetId: z.string().describe(
          "The ID of the Google Sheets spreadsheet that contains the source chart.",
        ).optional(),
      }).describe(
        "A linked chart embedded from Google Sheets. Unlinked charts are represented as images.",
      ).optional(),
      size: z.object({
        height: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("The height of the object.").optional(),
        width: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("The width of the object.").optional(),
      }).describe("The size of the page element.").optional(),
      speakerSpotlight: z.object({
        speakerSpotlightProperties: z.object({
          outline: z.unknown().describe(
            "The outline of the Speaker Spotlight. If not set, it has no outline.",
          ).optional(),
          shadow: z.unknown().describe(
            "The shadow of the Speaker Spotlight. If not set, it has no shadow.",
          ).optional(),
        }).describe("The properties of the Speaker Spotlight.").optional(),
      }).describe("A Speaker Spotlight.").optional(),
      table: z.object({
        columns: z.number().int().describe("Number of columns in the table.")
          .optional(),
        horizontalBorderRows: z.array(z.unknown()).describe(
          "Properties of horizontal cell borders. A table's horizontal cell borders are represented as a grid. The grid has one more row than the number of rows in the table and the same number of columns as the table. For example, if the table is 3 x 3, its horizontal borders will be represented as a grid with 4 rows and 3 columns.",
        ).optional(),
        rows: z.number().int().describe("Number of rows in the table.")
          .optional(),
        tableColumns: z.array(z.unknown()).describe(
          "Properties of each column.",
        ).optional(),
        tableRows: z.array(z.unknown()).describe(
          "Properties and contents of each row. Cells that span multiple rows are contained in only one of these rows and have a row_span greater than 1.",
        ).optional(),
        verticalBorderRows: z.array(z.unknown()).describe(
          "Properties of vertical cell borders. A table's vertical cell borders are represented as a grid. The grid has the same number of rows as the table and one more column than the number of columns in the table. For example, if the table is 3 x 3, its vertical borders will be represented as a grid with 3 rows and 4 columns.",
        ).optional(),
      }).describe("A table page element.").optional(),
      title: z.string().describe(
        "The title of the page element. Combined with description to display alt text. The field is not supported for Group elements.",
      ).optional(),
      transform: z.object({
        scaleX: z.number().describe("The X coordinate scaling element.")
          .optional(),
        scaleY: z.number().describe("The Y coordinate scaling element.")
          .optional(),
        shearX: z.number().describe("The X coordinate shearing element.")
          .optional(),
        shearY: z.number().describe("The Y coordinate shearing element.")
          .optional(),
        translateX: z.number().describe("The X coordinate translation element.")
          .optional(),
        translateY: z.number().describe("The Y coordinate translation element.")
          .optional(),
        unit: z.enum(["UNIT_UNSPECIFIED", "EMU", "PT"]).describe(
          "The units for translate elements.",
        ).optional(),
      }).describe(
        "The transform of the page element. The visual appearance of the page element is determined by its absolute transform. To compute the absolute transform, preconcatenate a page element's transform with the transforms of all of its parent groups. If the page element is not in a group, its absolute transform is the same as the value in this field. The initial transform for the newly created Group is always the identity transform.",
      ).optional(),
      video: z.object({
        id: z.string().describe(
          "The video source's unique identifier for this video.",
        ).optional(),
        source: z.enum(["SOURCE_UNSPECIFIED", "YOUTUBE", "DRIVE"]).describe(
          "The video source.",
        ).optional(),
        url: z.string().describe(
          "An URL to a video. The URL is valid as long as the source video exists and sharing settings do not change.",
        ).optional(),
        videoProperties: z.object({
          autoPlay: z.unknown().describe(
            "Whether to enable video autoplay when the page is displayed in present mode. Defaults to false.",
          ).optional(),
          end: z.unknown().describe(
            "The time at which to end playback, measured in seconds from the beginning of the video. If set, the end time should be after the start time. If not set or if you set this to a value that exceeds the video's length, the video will be played until its end.",
          ).optional(),
          mute: z.unknown().describe(
            "Whether to mute the audio during video playback. Defaults to false.",
          ).optional(),
          outline: z.unknown().describe(
            "The outline of the video. The default outline matches the defaults for new videos created in the Slides editor.",
          ).optional(),
          start: z.unknown().describe(
            "The time at which to start playback, measured in seconds from the beginning of the video. If set, the start time should be before the end time. If you set this to a value that exceeds the video's length in seconds, the video will be played from the last second. If not set, the video will be played from the beginning.",
          ).optional(),
        }).describe("The properties of the video.").optional(),
      }).describe("A video page element.").optional(),
      wordArt: z.object({
        renderedText: z.string().describe("The text rendered as word art.")
          .optional(),
      }).describe("A word art page element.").optional(),
    })).describe("The page elements rendered on the page.").optional(),
    pageProperties: z.object({
      colorScheme: z.object({
        colors: z.array(z.object({
          color: z.unknown().describe(
            "The concrete color corresponding to the theme color type above.",
          ).optional(),
          type: z.unknown().describe("The type of the theme color.").optional(),
        })).describe(
          "The ThemeColorType and corresponding concrete color pairs.",
        ).optional(),
      }).describe(
        "The color scheme of the page. If unset, the color scheme is inherited from a parent page. If the page has no parent, the color scheme uses a default Slides color scheme, matching the defaults in the Slides editor. Only the concrete colors of the first 12 ThemeColorTypes are editable. In addition, only the color scheme on `Master` pages can be updated. To update the field, a color scheme containing mappings from all the first 12 ThemeColorTypes to their concrete colors must be provided. Colors for the remaining ThemeColorTypes will be ignored.",
      ).optional(),
      pageBackgroundFill: z.object({
        propertyState: z.enum(["RENDERED", "NOT_RENDERED", "INHERIT"]).describe(
          "The background fill property state. Updating the fill on a page will implicitly update this field to `RENDERED`, unless another value is specified in the same request. To have no fill on a page, set this field to `NOT_RENDERED`. In this case, any other fill fields set in the same request will be ignored.",
        ).optional(),
        solidFill: z.object({
          alpha: z.number().describe(
            "The fraction of this `color` that should be applied to the pixel. That is, the final pixel color is defined by the equation: pixel color = alpha * (color) + (1.0 - alpha) * (background color) This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color.",
          ).optional(),
          color: z.object({
            rgbColor: z.unknown().describe("An opaque RGB color.").optional(),
            themeColor: z.unknown().describe("An opaque theme color.")
              .optional(),
          }).describe("The color value of the solid fill.").optional(),
        }).describe("Solid color fill.").optional(),
        stretchedPictureFill: z.object({
          contentUrl: z.string().describe(
            "Reading the content_url: An URL to a picture with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the picture as the original requester. Access to the picture may be lost if the presentation's sharing settings change. Writing the content_url: The picture is fetched once at insertion time and a copy is stored for display inside the presentation. Pictures must be less than 50MB in size, cannot exceed 25 megapixels, and must be in one of PNG, JPEG, or GIF format. The provided URL can be at most 2 kB in length.",
          ).optional(),
          size: z.object({
            height: z.unknown().describe("The height of the object.")
              .optional(),
            width: z.unknown().describe("The width of the object.").optional(),
          }).describe(
            "The original size of the picture fill. This field is read-only.",
          ).optional(),
        }).describe("Stretched picture fill.").optional(),
      }).describe(
        "The background fill of the page. If unset, the background fill is inherited from a parent page if it exists. If the page has no parent, then the background fill defaults to the corresponding fill in the Slides editor.",
      ).optional(),
    }).describe("The properties of the page.").optional(),
    pageType: z.enum(["SLIDE", "MASTER", "LAYOUT", "NOTES", "NOTES_MASTER"])
      .describe("The type of the page.").optional(),
    revisionId: z.string().describe(
      "Output only. The revision ID of the presentation. Can be used in update requests to assert the presentation revision hasn't changed since the last read operation. Only populated if the user has edit access to the presentation. The revision ID is not a sequential number but an opaque string. The format of the revision ID might change over time. A returned revision ID is only guaranteed to be valid for 24 hours after it has been returned and cannot be shared across users. If the revision ID is unchanged between calls, then the presentation has not changed. Conversely, a changed ID (for the same presentation and user) usually means the presentation has been updated. However, a changed ID can also be due to internal factors such as ID format changes.",
    ).optional(),
    slideProperties: z.object({
      isSkipped: z.boolean().describe(
        "Whether the slide is skipped in the presentation mode. Defaults to false.",
      ).optional(),
      layoutObjectId: z.string().describe(
        "The object ID of the layout that this slide is based on. This property is read-only.",
      ).optional(),
      masterObjectId: z.string().describe(
        "The object ID of the master that this slide is based on. This property is read-only.",
      ).optional(),
      notesPage: z.record(z.string(), z.unknown()).describe(
        "Circular reference to Page",
      ).optional(),
    }).describe("Slide specific properties. Only set if page_type = SLIDE.")
      .optional(),
  }).describe(
    "The notes master in the presentation. It serves three purposes: - Placeholder shapes on a notes master contain the default text styles and shape properties of all placeholder shapes on notes pages. Specifically, a `SLIDE_IMAGE` placeholder shape contains the slide thumbnail, and a `BODY` placeholder shape contains the speaker notes. - The notes master page properties define the common page properties inherited by all notes pages. - Any other shapes on the notes master appear on all notes pages. The notes master is read-only.",
  ).optional(),
  pageSize: z.object({
    height: z.object({
      magnitude: z.number().describe("The magnitude.").optional(),
      unit: z.enum(["UNIT_UNSPECIFIED", "EMU", "PT"]).describe(
        "The units for magnitude.",
      ).optional(),
    }).describe("The height of the object.").optional(),
    width: z.object({
      magnitude: z.number().describe("The magnitude.").optional(),
      unit: z.enum(["UNIT_UNSPECIFIED", "EMU", "PT"]).describe(
        "The units for magnitude.",
      ).optional(),
    }).describe("The width of the object.").optional(),
  }).describe("The size of pages in the presentation.").optional(),
  presentationId: z.string().describe("The ID of the presentation.").optional(),
  slides: z.array(z.object({
    commentAnchors: z.array(z.object({
      anchorId: z.string().describe(
        "Output only. The unique ID of the comment anchor.",
      ).optional(),
      objectAnchors: z.array(z.unknown()).describe(
        "Output only. All object ID-based locations within a page that refer to the anchor ID.",
      ).optional(),
    })).describe(
      "Output only. The comment anchors present on the page. [Developer Preview](https://developers.google.com/workspace/preview).",
    ).optional(),
    comments: z.array(z.object({
      anchorId: z.string().describe(
        "The ID of the CommentAnchor in the presentation that this thread is tied to.",
      ).optional(),
      commentId: z.string().describe("The unique ID of the comment thread.")
        .optional(),
      headPost: z.object({
        assigneeEmail: z.unknown().describe(
          "Optional. The email of the user who is being newly assigned to the thread as part of this post. Returns a 400 bad request error if: - The parent thread is a CommentThread whose headPost does not have an assignee. - commentAction is specified as `RESOLVE` or `REOPEN`. - `assignee_email` exceeds 2048 UTF-8 code units.",
        ).optional(),
        author: z.unknown().describe(
          "Output only. The user who created the post.",
        ).optional(),
        commentAction: z.unknown().describe(
          "Action taken as part of creating the post.",
        ).optional(),
        content: z.unknown().describe(
          "The content of the post. Required to be non-empty if comment_action is not `RESOLVE` or `REOPEN`. This text content will be handled similarly to comments created in the Slides editor. It will have similar behaviors for formatting, notifications, etc. May not exceed 2048 UTF-8 code units.",
        ).optional(),
        contentHtml: z.unknown().describe(
          "Output only. The content of the post as HTML.",
        ).optional(),
        createTime: z.unknown().describe(
          "Output only. The time the post was created.",
        ).optional(),
        deleted: z.unknown().describe(
          "Output only. Whether the post is deleted. If `true`, content and author fields will be empty.",
        ).optional(),
        fromCopiedPresentation: z.unknown().describe(
          "Output only. Whether the post is from a copied presentation. This field cannot be set directly by callers.",
        ).optional(),
        fromImportedPresentation: z.unknown().describe(
          "Output only. Whether the post is from an imported presentation. This field cannot be set directly by callers.",
        ).optional(),
        postId: z.unknown().describe("Output only. The unique ID of the post.")
          .optional(),
        updateTime: z.unknown().describe(
          "Output only. The time the post was last updated.",
        ).optional(),
      }).describe("The first post in the thread.").optional(),
      plainTextQuote: z.string().describe(
        "The quoted text from the page element when the comment was created, formatted as plain-text.",
      ).optional(),
      replies: z.array(z.unknown()).describe("Replies to the head post.")
        .optional(),
      status: z.enum(["STATUS_UNSPECIFIED", "OPEN", "RESOLVED"]).describe(
        "Whether the thread is open or resolved.",
      ).optional(),
    })).describe(
      "Output only. The comment threads associated with the page. Only populated if the page was fetched via a GetPageRequest with a populated comments_view_mode. Otherwise, comments are returned in the Presentation via the GetPresentationRequest. [Developer Preview](https://developers.google.com/workspace/preview).",
    ).optional(),
    commentsViewMode: z.enum([
      "COMMENTS_VIEW_MODE_UNSPECIFIED",
      "COMMENTS_VIEW_MODE_DEFAULT_FOR_CURRENT_ACCESS",
      "COMMENTS_VIEW_MODE_OMITTED",
      "COMMENTS_VIEW_MODE_INCLUDED",
    ]).describe(
      "Output only. The comments view mode applied to the page. Only populated if the page was fetched via a GetPageRequest with a populated comments_view_mode. [Developer Preview](https://developers.google.com/workspace/preview).",
    ).optional(),
    layoutProperties: z.object({
      displayName: z.string().describe("The human-readable name of the layout.")
        .optional(),
      masterObjectId: z.string().describe(
        "The object ID of the master that this layout is based on.",
      ).optional(),
      name: z.string().describe("The name of the layout.").optional(),
    }).describe("Layout specific properties. Only set if page_type = LAYOUT.")
      .optional(),
    masterProperties: z.object({
      displayName: z.string().describe("The human-readable name of the master.")
        .optional(),
    }).describe("Master specific properties. Only set if page_type = MASTER.")
      .optional(),
    notesProperties: z.object({
      speakerNotesObjectId: z.string().describe(
        "The object ID of the shape on this notes page that contains the speaker notes for the corresponding slide. The actual shape may not always exist on the notes page. Inserting text using this object ID will automatically create the shape. In this case, the actual shape may have different object ID. The `GetPresentation` or `GetPage` action will always return the latest object ID.",
      ).optional(),
    }).describe("Notes specific properties. Only set if page_type = NOTES.")
      .optional(),
    objectId: z.string().describe(
      "The object ID for this page. Object IDs used by Page and PageElement share the same namespace.",
    ).optional(),
    pageElements: z.array(z.object({
      description: z.string().describe(
        "The description of the page element. Combined with title to display alt text. The field is not supported for Group elements.",
      ).optional(),
      elementGroup: z.object({
        children: z.unknown().describe(
          "The collection of elements in the group. The minimum size of a group is 2.",
        ).optional(),
      }).describe("A collection of page elements joined as a single unit.")
        .optional(),
      image: z.object({
        contentUrl: z.unknown().describe(
          "An URL to an image with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        imageProperties: z.unknown().describe("The properties of the image.")
          .optional(),
        placeholder: z.unknown().describe(
          "Placeholders are page elements that inherit from corresponding placeholders on layouts and masters. If set, the image is a placeholder image and any inherited properties can be resolved by looking at the parent placeholder identified by the Placeholder.parent_object_id field.",
        ).optional(),
        sourceUrl: z.unknown().describe(
          "The source URL is the URL used to insert the image. The source URL can be empty.",
        ).optional(),
      }).describe("An image page element.").optional(),
      line: z.object({
        lineCategory: z.unknown().describe(
          "The category of the line. It matches the `category` specified in CreateLineRequest, and can be updated with UpdateLineCategoryRequest.",
        ).optional(),
        lineProperties: z.unknown().describe("The properties of the line.")
          .optional(),
        lineType: z.unknown().describe("The type of the line.").optional(),
      }).describe("A line page element.").optional(),
      objectId: z.string().describe(
        "The object ID for this page element. Object IDs used by google.apps.slides.v1.Page and google.apps.slides.v1.PageElement share the same namespace.",
      ).optional(),
      shape: z.object({
        placeholder: z.unknown().describe(
          "Placeholders are page elements that inherit from corresponding placeholders on layouts and masters. If set, the shape is a placeholder shape and any inherited properties can be resolved by looking at the parent placeholder identified by the Placeholder.parent_object_id field.",
        ).optional(),
        shapeProperties: z.unknown().describe("The properties of the shape.")
          .optional(),
        shapeType: z.unknown().describe("The type of the shape.").optional(),
        text: z.unknown().describe("The text content of the shape.").optional(),
      }).describe("A generic shape.").optional(),
      sheetsChart: z.object({
        chartId: z.unknown().describe(
          "The ID of the specific chart in the Google Sheets spreadsheet that is embedded.",
        ).optional(),
        contentUrl: z.unknown().describe(
          "The URL of an image of the embedded chart, with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        sheetsChartProperties: z.unknown().describe(
          "The properties of the Sheets chart.",
        ).optional(),
        spreadsheetId: z.unknown().describe(
          "The ID of the Google Sheets spreadsheet that contains the source chart.",
        ).optional(),
      }).describe(
        "A linked chart embedded from Google Sheets. Unlinked charts are represented as images.",
      ).optional(),
      size: z.object({
        height: z.unknown().describe("The height of the object.").optional(),
        width: z.unknown().describe("The width of the object.").optional(),
      }).describe("The size of the page element.").optional(),
      speakerSpotlight: z.object({
        speakerSpotlightProperties: z.unknown().describe(
          "The properties of the Speaker Spotlight.",
        ).optional(),
      }).describe("A Speaker Spotlight.").optional(),
      table: z.object({
        columns: z.unknown().describe("Number of columns in the table.")
          .optional(),
        horizontalBorderRows: z.unknown().describe(
          "Properties of horizontal cell borders. A table's horizontal cell borders are represented as a grid. The grid has one more row than the number of rows in the table and the same number of columns as the table. For example, if the table is 3 x 3, its horizontal borders will be represented as a grid with 4 rows and 3 columns.",
        ).optional(),
        rows: z.unknown().describe("Number of rows in the table.").optional(),
        tableColumns: z.unknown().describe("Properties of each column.")
          .optional(),
        tableRows: z.unknown().describe(
          "Properties and contents of each row. Cells that span multiple rows are contained in only one of these rows and have a row_span greater than 1.",
        ).optional(),
        verticalBorderRows: z.unknown().describe(
          "Properties of vertical cell borders. A table's vertical cell borders are represented as a grid. The grid has the same number of rows as the table and one more column than the number of columns in the table. For example, if the table is 3 x 3, its vertical borders will be represented as a grid with 3 rows and 4 columns.",
        ).optional(),
      }).describe("A table page element.").optional(),
      title: z.string().describe(
        "The title of the page element. Combined with description to display alt text. The field is not supported for Group elements.",
      ).optional(),
      transform: z.object({
        scaleX: z.unknown().describe("The X coordinate scaling element.")
          .optional(),
        scaleY: z.unknown().describe("The Y coordinate scaling element.")
          .optional(),
        shearX: z.unknown().describe("The X coordinate shearing element.")
          .optional(),
        shearY: z.unknown().describe("The Y coordinate shearing element.")
          .optional(),
        translateX: z.unknown().describe(
          "The X coordinate translation element.",
        ).optional(),
        translateY: z.unknown().describe(
          "The Y coordinate translation element.",
        ).optional(),
        unit: z.unknown().describe("The units for translate elements.")
          .optional(),
      }).describe(
        "The transform of the page element. The visual appearance of the page element is determined by its absolute transform. To compute the absolute transform, preconcatenate a page element's transform with the transforms of all of its parent groups. If the page element is not in a group, its absolute transform is the same as the value in this field. The initial transform for the newly created Group is always the identity transform.",
      ).optional(),
      video: z.object({
        id: z.unknown().describe(
          "The video source's unique identifier for this video.",
        ).optional(),
        source: z.unknown().describe("The video source.").optional(),
        url: z.unknown().describe(
          "An URL to a video. The URL is valid as long as the source video exists and sharing settings do not change.",
        ).optional(),
        videoProperties: z.unknown().describe("The properties of the video.")
          .optional(),
      }).describe("A video page element.").optional(),
      wordArt: z.object({
        renderedText: z.unknown().describe("The text rendered as word art.")
          .optional(),
      }).describe("A word art page element.").optional(),
    })).describe("The page elements rendered on the page.").optional(),
    pageProperties: z.object({
      colorScheme: z.object({
        colors: z.array(z.unknown()).describe(
          "The ThemeColorType and corresponding concrete color pairs.",
        ).optional(),
      }).describe(
        "The color scheme of the page. If unset, the color scheme is inherited from a parent page. If the page has no parent, the color scheme uses a default Slides color scheme, matching the defaults in the Slides editor. Only the concrete colors of the first 12 ThemeColorTypes are editable. In addition, only the color scheme on `Master` pages can be updated. To update the field, a color scheme containing mappings from all the first 12 ThemeColorTypes to their concrete colors must be provided. Colors for the remaining ThemeColorTypes will be ignored.",
      ).optional(),
      pageBackgroundFill: z.object({
        propertyState: z.enum(["RENDERED", "NOT_RENDERED", "INHERIT"]).describe(
          "The background fill property state. Updating the fill on a page will implicitly update this field to `RENDERED`, unless another value is specified in the same request. To have no fill on a page, set this field to `NOT_RENDERED`. In this case, any other fill fields set in the same request will be ignored.",
        ).optional(),
        solidFill: z.object({
          alpha: z.unknown().describe(
            "The fraction of this `color` that should be applied to the pixel. That is, the final pixel color is defined by the equation: pixel color = alpha * (color) + (1.0 - alpha) * (background color) This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color.",
          ).optional(),
          color: z.unknown().describe("The color value of the solid fill.")
            .optional(),
        }).describe("Solid color fill.").optional(),
        stretchedPictureFill: z.object({
          contentUrl: z.unknown().describe(
            "Reading the content_url: An URL to a picture with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the picture as the original requester. Access to the picture may be lost if the presentation's sharing settings change. Writing the content_url: The picture is fetched once at insertion time and a copy is stored for display inside the presentation. Pictures must be less than 50MB in size, cannot exceed 25 megapixels, and must be in one of PNG, JPEG, or GIF format. The provided URL can be at most 2 kB in length.",
          ).optional(),
          size: z.unknown().describe(
            "The original size of the picture fill. This field is read-only.",
          ).optional(),
        }).describe("Stretched picture fill.").optional(),
      }).describe(
        "The background fill of the page. If unset, the background fill is inherited from a parent page if it exists. If the page has no parent, then the background fill defaults to the corresponding fill in the Slides editor.",
      ).optional(),
    }).describe("The properties of the page.").optional(),
    pageType: z.enum(["SLIDE", "MASTER", "LAYOUT", "NOTES", "NOTES_MASTER"])
      .describe("The type of the page.").optional(),
    revisionId: z.string().describe(
      "Output only. The revision ID of the presentation. Can be used in update requests to assert the presentation revision hasn't changed since the last read operation. Only populated if the user has edit access to the presentation. The revision ID is not a sequential number but an opaque string. The format of the revision ID might change over time. A returned revision ID is only guaranteed to be valid for 24 hours after it has been returned and cannot be shared across users. If the revision ID is unchanged between calls, then the presentation has not changed. Conversely, a changed ID (for the same presentation and user) usually means the presentation has been updated. However, a changed ID can also be due to internal factors such as ID format changes.",
    ).optional(),
    slideProperties: z.object({
      isSkipped: z.boolean().describe(
        "Whether the slide is skipped in the presentation mode. Defaults to false.",
      ).optional(),
      layoutObjectId: z.string().describe(
        "The object ID of the layout that this slide is based on. This property is read-only.",
      ).optional(),
      masterObjectId: z.string().describe(
        "The object ID of the master that this slide is based on. This property is read-only.",
      ).optional(),
      notesPage: z.record(z.string(), z.unknown()).describe(
        "Circular reference to Page",
      ).optional(),
    }).describe("Slide specific properties. Only set if page_type = SLIDE.")
      .optional(),
  })).describe(
    "The slides in the presentation. A slide inherits properties from a slide layout.",
  ).optional(),
  title: z.string().describe("The title of the presentation.").optional(),
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

/** Swamp extension model for Google Cloud Google Slides Presentations. Registered at `@swamp/gcp/slides/presentations`. */
export const model = {
  type: "@swamp/gcp/slides/presentations",
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
      toVersion: "2026.05.27.1",
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
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A Google Slides presentation.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a presentations",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["layouts"] !== undefined) body["layouts"] = g["layouts"];
        if (g["locale"] !== undefined) body["locale"] = g["locale"];
        if (g["masters"] !== undefined) body["masters"] = g["masters"];
        if (g["notesMaster"] !== undefined) {
          body["notesMaster"] = g["notesMaster"];
        }
        if (g["pageSize"] !== undefined) body["pageSize"] = g["pageSize"];
        if (g["presentationId"] !== undefined) {
          body["presentationId"] = g["presentationId"];
        }
        if (g["slides"] !== undefined) body["slides"] = g["slides"];
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["name"] !== undefined) {
          params["presentationId"] = String(g["name"]);
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
      description: "Get a presentations",
      arguments: z.object({
        identifier: z.string().describe("The name of the presentations"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["presentationId"] = args.identifier;
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
      description: "Sync presentations state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific presentations by name (e.g. one discovered by list)",
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
          params["presentationId"] = identifier;
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
        requests: z.any().optional(),
        writeControl: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["presentationId"] !== undefined) {
          params["presentationId"] = String(g["presentationId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["requests"] !== undefined) body["requests"] = args["requests"];
        if (args["writeControl"] !== undefined) {
          body["writeControl"] = args["writeControl"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "slides.presentations.batchUpdate",
            "path": "v1/presentations/{presentationId}:batchUpdate",
            "httpMethod": "POST",
            "parameterOrder": ["presentationId"],
            "parameters": {
              "presentationId": { "location": "path", "required": true },
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
