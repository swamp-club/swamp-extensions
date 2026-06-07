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
  layouts: z.array(z.object({
    layoutProperties: z.object({
      displayName: z.string().describe("The human-readable name of the layout.")
        .optional(),
      masterObjectId: z.string().describe(
        "The object ID of the master that this layout is based on.",
      ).optional(),
      name: z.string().describe("The name of the layout.").optional(),
    }).describe(
      "The properties of Page are only relevant for pages with page_type LAYOUT.",
    ).optional(),
    masterProperties: z.object({
      displayName: z.string().describe("The human-readable name of the master.")
        .optional(),
    }).describe(
      "The properties of Page that are only relevant for pages with page_type MASTER.",
    ).optional(),
    notesProperties: z.object({
      speakerNotesObjectId: z.string().describe(
        "The object ID of the shape on this notes page that contains the speaker notes for the corresponding slide. The actual shape may not always exist on the notes page. Inserting text using this object ID will automatically create the shape. In this case, the actual shape may have different object ID. The `GetPresentation` or `GetPage` action will always return the latest object ID.",
      ).optional(),
    }).describe(
      "The properties of Page that are only relevant for pages with page_type NOTES.",
    ).optional(),
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
      }).describe(
        "A PageElement kind representing a joined collection of PageElements.",
      ).optional(),
      image: z.object({
        contentUrl: z.unknown().describe(
          "An URL to an image with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        imageProperties: z.unknown().describe("The properties of the Image.")
          .optional(),
        placeholder: z.unknown().describe(
          "The placeholder information that uniquely identifies a placeholder shape.",
        ).optional(),
        sourceUrl: z.unknown().describe(
          "The source URL is the URL used to insert the image. The source URL can be empty.",
        ).optional(),
      }).describe("A PageElement kind representing an image.").optional(),
      line: z.object({
        lineCategory: z.unknown().describe(
          "The category of the line. It matches the `category` specified in CreateLineRequest, and can be updated with UpdateLineCategoryRequest.",
        ).optional(),
        lineProperties: z.unknown().describe(
          "The properties of the Line. When unset, these fields default to values that match the appearance of new lines created in the Slides editor.",
        ).optional(),
        lineType: z.unknown().describe("The type of the line.").optional(),
      }).describe(
        "A PageElement kind representing a non-connector line, straight connector, curved connector, or bent connector.",
      ).optional(),
      objectId: z.string().describe(
        "The object ID for this page element. Object IDs used by google.apps.slides.v1.Page and google.apps.slides.v1.PageElement share the same namespace.",
      ).optional(),
      shape: z.object({
        placeholder: z.unknown().describe(
          "The placeholder information that uniquely identifies a placeholder shape.",
        ).optional(),
        shapeProperties: z.unknown().describe(
          "The properties of a Shape. If the shape is a placeholder shape as determined by the placeholder field, then these properties may be inherited from a parent placeholder shape. Determining the rendered value of the property depends on the corresponding property_state field value. Any text autofit settings on the shape are automatically deactivated by requests that can impact how text fits in the shape.",
        ).optional(),
        shapeType: z.unknown().describe("The type of the shape.").optional(),
        text: z.unknown().describe(
          "The general text content. The text must reside in a compatible shape (e.g. text box or rectangle) or a table cell in a page.",
        ).optional(),
      }).describe(
        "A PageElement kind representing a generic shape that doesn't have a more specific classification. For more information, see [Size and position page elements](https://developers.google.com/workspace/slides/api/guides/transform).",
      ).optional(),
      sheetsChart: z.object({
        chartId: z.unknown().describe(
          "The ID of the specific chart in the Google Sheets spreadsheet that is embedded.",
        ).optional(),
        contentUrl: z.unknown().describe(
          "The URL of an image of the embedded chart, with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        sheetsChartProperties: z.unknown().describe(
          "The properties of the SheetsChart.",
        ).optional(),
        spreadsheetId: z.unknown().describe(
          "The ID of the Google Sheets spreadsheet that contains the source chart.",
        ).optional(),
      }).describe(
        "A PageElement kind representing a linked chart embedded from Google Sheets.",
      ).optional(),
      size: z.object({
        height: z.unknown().describe(
          "A magnitude in a single direction in the specified units.",
        ).optional(),
        width: z.unknown().describe(
          "A magnitude in a single direction in the specified units.",
        ).optional(),
      }).describe("A width and height.").optional(),
      speakerSpotlight: z.object({
        speakerSpotlightProperties: z.unknown().describe(
          "The properties of the SpeakerSpotlight.",
        ).optional(),
      }).describe("A PageElement kind representing a Speaker Spotlight.")
        .optional(),
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
      }).describe("A PageElement kind representing a table.").optional(),
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
        "AffineTransform uses a 3x3 matrix with an implied last row of [ 0 0 1 ] to transform source coordinates (x,y) into destination coordinates (x', y') according to: x' x = shear_y scale_y translate_y 1 [ 1 ] After transformation, x' = scale_x * x + shear_x * y + translate_x; y' = scale_y * y + shear_y * x + translate_y; This message is therefore composed of these six matrix elements.",
      ).optional(),
      video: z.object({
        id: z.unknown().describe(
          "The video source's unique identifier for this video.",
        ).optional(),
        source: z.unknown().describe("The video source.").optional(),
        url: z.unknown().describe(
          "An URL to a video. The URL is valid as long as the source video exists and sharing settings do not change.",
        ).optional(),
        videoProperties: z.unknown().describe("The properties of the Video.")
          .optional(),
      }).describe("A PageElement kind representing a video.").optional(),
      wordArt: z.object({
        renderedText: z.unknown().describe("The text rendered as word art.")
          .optional(),
      }).describe("A PageElement kind representing word art.").optional(),
    })).describe("The page elements rendered on the page.").optional(),
    pageProperties: z.object({
      colorScheme: z.object({
        colors: z.array(z.unknown()).describe(
          "The ThemeColorType and corresponding concrete color pairs.",
        ).optional(),
      }).describe("The palette of predefined colors for a page.").optional(),
      pageBackgroundFill: z.object({
        propertyState: z.enum(["RENDERED", "NOT_RENDERED", "INHERIT"]).describe(
          "The background fill property state. Updating the fill on a page will implicitly update this field to `RENDERED`, unless another value is specified in the same request. To have no fill on a page, set this field to `NOT_RENDERED`. In this case, any other fill fields set in the same request will be ignored.",
        ).optional(),
        solidFill: z.object({
          alpha: z.unknown().describe(
            "The fraction of this `color` that should be applied to the pixel. That is, the final pixel color is defined by the equation: pixel color = alpha * (color) + (1.0 - alpha) * (background color) This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color.",
          ).optional(),
          color: z.unknown().describe("A themeable solid color value.")
            .optional(),
        }).describe(
          "A solid color fill. The page or page element is filled entirely with the specified color value. If any field is unset, its value may be inherited from a parent placeholder if it exists.",
        ).optional(),
        stretchedPictureFill: z.object({
          contentUrl: z.unknown().describe(
            "Reading the content_url: An URL to a picture with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the picture as the original requester. Access to the picture may be lost if the presentation's sharing settings change. Writing the content_url: The picture is fetched once at insertion time and a copy is stored for display inside the presentation. Pictures must be less than 50MB in size, cannot exceed 25 megapixels, and must be in one of PNG, JPEG, or GIF format. The provided URL can be at most 2 kB in length.",
          ).optional(),
          size: z.unknown().describe("A width and height.").optional(),
        }).describe(
          "The stretched picture fill. The page or page element is filled entirely with the specified picture. The picture is stretched to fit its container.",
        ).optional(),
      }).describe("The page background fill.").optional(),
    }).describe(
      "The properties of the Page. The page will inherit properties from the parent page. Depending on the page type the hierarchy is defined in either SlideProperties or LayoutProperties.",
    ).optional(),
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
    }).describe(
      "The properties of Page that are only relevant for pages with page_type SLIDE.",
    ).optional(),
  })).describe(
    "The layouts in the presentation. A layout is a template that determines how content is arranged and styled on the slides that inherit from that layout.",
  ).optional(),
  locale: z.string().describe(
    "The locale of the presentation, as an IETF BCP 47 language tag.",
  ).optional(),
  masters: z.array(z.object({
    layoutProperties: z.object({
      displayName: z.string().describe("The human-readable name of the layout.")
        .optional(),
      masterObjectId: z.string().describe(
        "The object ID of the master that this layout is based on.",
      ).optional(),
      name: z.string().describe("The name of the layout.").optional(),
    }).describe(
      "The properties of Page are only relevant for pages with page_type LAYOUT.",
    ).optional(),
    masterProperties: z.object({
      displayName: z.string().describe("The human-readable name of the master.")
        .optional(),
    }).describe(
      "The properties of Page that are only relevant for pages with page_type MASTER.",
    ).optional(),
    notesProperties: z.object({
      speakerNotesObjectId: z.string().describe(
        "The object ID of the shape on this notes page that contains the speaker notes for the corresponding slide. The actual shape may not always exist on the notes page. Inserting text using this object ID will automatically create the shape. In this case, the actual shape may have different object ID. The `GetPresentation` or `GetPage` action will always return the latest object ID.",
      ).optional(),
    }).describe(
      "The properties of Page that are only relevant for pages with page_type NOTES.",
    ).optional(),
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
      }).describe(
        "A PageElement kind representing a joined collection of PageElements.",
      ).optional(),
      image: z.object({
        contentUrl: z.unknown().describe(
          "An URL to an image with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        imageProperties: z.unknown().describe("The properties of the Image.")
          .optional(),
        placeholder: z.unknown().describe(
          "The placeholder information that uniquely identifies a placeholder shape.",
        ).optional(),
        sourceUrl: z.unknown().describe(
          "The source URL is the URL used to insert the image. The source URL can be empty.",
        ).optional(),
      }).describe("A PageElement kind representing an image.").optional(),
      line: z.object({
        lineCategory: z.unknown().describe(
          "The category of the line. It matches the `category` specified in CreateLineRequest, and can be updated with UpdateLineCategoryRequest.",
        ).optional(),
        lineProperties: z.unknown().describe(
          "The properties of the Line. When unset, these fields default to values that match the appearance of new lines created in the Slides editor.",
        ).optional(),
        lineType: z.unknown().describe("The type of the line.").optional(),
      }).describe(
        "A PageElement kind representing a non-connector line, straight connector, curved connector, or bent connector.",
      ).optional(),
      objectId: z.string().describe(
        "The object ID for this page element. Object IDs used by google.apps.slides.v1.Page and google.apps.slides.v1.PageElement share the same namespace.",
      ).optional(),
      shape: z.object({
        placeholder: z.unknown().describe(
          "The placeholder information that uniquely identifies a placeholder shape.",
        ).optional(),
        shapeProperties: z.unknown().describe(
          "The properties of a Shape. If the shape is a placeholder shape as determined by the placeholder field, then these properties may be inherited from a parent placeholder shape. Determining the rendered value of the property depends on the corresponding property_state field value. Any text autofit settings on the shape are automatically deactivated by requests that can impact how text fits in the shape.",
        ).optional(),
        shapeType: z.unknown().describe("The type of the shape.").optional(),
        text: z.unknown().describe(
          "The general text content. The text must reside in a compatible shape (e.g. text box or rectangle) or a table cell in a page.",
        ).optional(),
      }).describe(
        "A PageElement kind representing a generic shape that doesn't have a more specific classification. For more information, see [Size and position page elements](https://developers.google.com/workspace/slides/api/guides/transform).",
      ).optional(),
      sheetsChart: z.object({
        chartId: z.unknown().describe(
          "The ID of the specific chart in the Google Sheets spreadsheet that is embedded.",
        ).optional(),
        contentUrl: z.unknown().describe(
          "The URL of an image of the embedded chart, with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        sheetsChartProperties: z.unknown().describe(
          "The properties of the SheetsChart.",
        ).optional(),
        spreadsheetId: z.unknown().describe(
          "The ID of the Google Sheets spreadsheet that contains the source chart.",
        ).optional(),
      }).describe(
        "A PageElement kind representing a linked chart embedded from Google Sheets.",
      ).optional(),
      size: z.object({
        height: z.unknown().describe(
          "A magnitude in a single direction in the specified units.",
        ).optional(),
        width: z.unknown().describe(
          "A magnitude in a single direction in the specified units.",
        ).optional(),
      }).describe("A width and height.").optional(),
      speakerSpotlight: z.object({
        speakerSpotlightProperties: z.unknown().describe(
          "The properties of the SpeakerSpotlight.",
        ).optional(),
      }).describe("A PageElement kind representing a Speaker Spotlight.")
        .optional(),
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
      }).describe("A PageElement kind representing a table.").optional(),
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
        "AffineTransform uses a 3x3 matrix with an implied last row of [ 0 0 1 ] to transform source coordinates (x,y) into destination coordinates (x', y') according to: x' x = shear_y scale_y translate_y 1 [ 1 ] After transformation, x' = scale_x * x + shear_x * y + translate_x; y' = scale_y * y + shear_y * x + translate_y; This message is therefore composed of these six matrix elements.",
      ).optional(),
      video: z.object({
        id: z.unknown().describe(
          "The video source's unique identifier for this video.",
        ).optional(),
        source: z.unknown().describe("The video source.").optional(),
        url: z.unknown().describe(
          "An URL to a video. The URL is valid as long as the source video exists and sharing settings do not change.",
        ).optional(),
        videoProperties: z.unknown().describe("The properties of the Video.")
          .optional(),
      }).describe("A PageElement kind representing a video.").optional(),
      wordArt: z.object({
        renderedText: z.unknown().describe("The text rendered as word art.")
          .optional(),
      }).describe("A PageElement kind representing word art.").optional(),
    })).describe("The page elements rendered on the page.").optional(),
    pageProperties: z.object({
      colorScheme: z.object({
        colors: z.array(z.unknown()).describe(
          "The ThemeColorType and corresponding concrete color pairs.",
        ).optional(),
      }).describe("The palette of predefined colors for a page.").optional(),
      pageBackgroundFill: z.object({
        propertyState: z.enum(["RENDERED", "NOT_RENDERED", "INHERIT"]).describe(
          "The background fill property state. Updating the fill on a page will implicitly update this field to `RENDERED`, unless another value is specified in the same request. To have no fill on a page, set this field to `NOT_RENDERED`. In this case, any other fill fields set in the same request will be ignored.",
        ).optional(),
        solidFill: z.object({
          alpha: z.unknown().describe(
            "The fraction of this `color` that should be applied to the pixel. That is, the final pixel color is defined by the equation: pixel color = alpha * (color) + (1.0 - alpha) * (background color) This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color.",
          ).optional(),
          color: z.unknown().describe("A themeable solid color value.")
            .optional(),
        }).describe(
          "A solid color fill. The page or page element is filled entirely with the specified color value. If any field is unset, its value may be inherited from a parent placeholder if it exists.",
        ).optional(),
        stretchedPictureFill: z.object({
          contentUrl: z.unknown().describe(
            "Reading the content_url: An URL to a picture with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the picture as the original requester. Access to the picture may be lost if the presentation's sharing settings change. Writing the content_url: The picture is fetched once at insertion time and a copy is stored for display inside the presentation. Pictures must be less than 50MB in size, cannot exceed 25 megapixels, and must be in one of PNG, JPEG, or GIF format. The provided URL can be at most 2 kB in length.",
          ).optional(),
          size: z.unknown().describe("A width and height.").optional(),
        }).describe(
          "The stretched picture fill. The page or page element is filled entirely with the specified picture. The picture is stretched to fit its container.",
        ).optional(),
      }).describe("The page background fill.").optional(),
    }).describe(
      "The properties of the Page. The page will inherit properties from the parent page. Depending on the page type the hierarchy is defined in either SlideProperties or LayoutProperties.",
    ).optional(),
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
    }).describe(
      "The properties of Page that are only relevant for pages with page_type SLIDE.",
    ).optional(),
  })).describe(
    "The slide masters in the presentation. A slide master contains all common page elements and the common properties for a set of layouts. They serve three purposes: - Placeholder shapes on a master contain the default text styles and shape properties of all placeholder shapes on pages that use that master. - The master page properties define the common page properties inherited by its layouts. - Any other shapes on the master slide appear on all slides using that master, regardless of their layout.",
  ).optional(),
  notesMaster: z.object({
    layoutProperties: z.object({
      displayName: z.string().describe("The human-readable name of the layout.")
        .optional(),
      masterObjectId: z.string().describe(
        "The object ID of the master that this layout is based on.",
      ).optional(),
      name: z.string().describe("The name of the layout.").optional(),
    }).describe(
      "The properties of Page are only relevant for pages with page_type LAYOUT.",
    ).optional(),
    masterProperties: z.object({
      displayName: z.string().describe("The human-readable name of the master.")
        .optional(),
    }).describe(
      "The properties of Page that are only relevant for pages with page_type MASTER.",
    ).optional(),
    notesProperties: z.object({
      speakerNotesObjectId: z.string().describe(
        "The object ID of the shape on this notes page that contains the speaker notes for the corresponding slide. The actual shape may not always exist on the notes page. Inserting text using this object ID will automatically create the shape. In this case, the actual shape may have different object ID. The `GetPresentation` or `GetPage` action will always return the latest object ID.",
      ).optional(),
    }).describe(
      "The properties of Page that are only relevant for pages with page_type NOTES.",
    ).optional(),
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
      }).describe(
        "A PageElement kind representing a joined collection of PageElements.",
      ).optional(),
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
            "The crop properties of an object enclosed in a container. For example, an Image. The crop properties is represented by the offsets of four edges which define a crop rectangle. The offsets are measured in percentage from the corresponding edges of the object's original bounding rectangle towards inside, relative to the object's original dimensions. - If the offset is in the interval (0, 1), the corresponding edge of crop rectangle is positioned inside of the object's original bounding rectangle. - If the offset is negative or greater than 1, the corresponding edge of crop rectangle is positioned outside of the object's original bounding rectangle. - If the left edge of the crop rectangle is on the right side of its right edge, the object will be flipped horizontally. - If the top edge of the crop rectangle is below its bottom edge, the object will be flipped vertically. - If all offsets and rotation angle is 0, the object is not cropped. After cropping, the content in the crop rectangle will be stretched to fit its container.",
          ).optional(),
          link: z.unknown().describe("A hypertext link.").optional(),
          outline: z.unknown().describe(
            "The outline of a PageElement. If these fields are unset, they may be inherited from a parent placeholder if it exists. If there is no parent, the fields will default to the value used for new page elements created in the Slides editor, which may depend on the page element kind.",
          ).optional(),
          recolor: z.unknown().describe("A recolor effect applied on an image.")
            .optional(),
          shadow: z.unknown().describe(
            "The shadow properties of a page element. If these fields are unset, they may be inherited from a parent placeholder if it exists. If there is no parent, the fields will default to the value used for new page elements created in the Slides editor, which may depend on the page element kind.",
          ).optional(),
          transparency: z.unknown().describe(
            "The transparency effect of the image. The value should be in the interval [0.0, 1.0], where 0 means no effect and 1 means completely transparent. This property is read-only.",
          ).optional(),
        }).describe("The properties of the Image.").optional(),
        placeholder: z.object({
          index: z.unknown().describe(
            "The index of the placeholder. If the same placeholder types are present in the same page, they would have different index values.",
          ).optional(),
          parentObjectId: z.unknown().describe(
            "The object ID of this shape's parent placeholder. If unset, the parent placeholder shape does not exist, so the shape does not inherit properties from any other shape.",
          ).optional(),
          type: z.unknown().describe("The type of the placeholder.").optional(),
        }).describe(
          "The placeholder information that uniquely identifies a placeholder shape.",
        ).optional(),
        sourceUrl: z.string().describe(
          "The source URL is the URL used to insert the image. The source URL can be empty.",
        ).optional(),
      }).describe("A PageElement kind representing an image.").optional(),
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
            "The properties for one end of a Line connection.",
          ).optional(),
          lineFill: z.unknown().describe("The fill of the line.").optional(),
          link: z.unknown().describe("A hypertext link.").optional(),
          startArrow: z.unknown().describe(
            "The style of the arrow at the beginning of the line.",
          ).optional(),
          startConnection: z.unknown().describe(
            "The properties for one end of a Line connection.",
          ).optional(),
          weight: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
        }).describe(
          "The properties of the Line. When unset, these fields default to values that match the appearance of new lines created in the Slides editor.",
        ).optional(),
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
      }).describe(
        "A PageElement kind representing a non-connector line, straight connector, curved connector, or bent connector.",
      ).optional(),
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
          "The placeholder information that uniquely identifies a placeholder shape.",
        ).optional(),
        shapeProperties: z.object({
          autofit: z.unknown().describe(
            "The autofit properties of a Shape. This property is only set for shapes that allow text.",
          ).optional(),
          contentAlignment: z.unknown().describe(
            "The alignment of the content in the shape. If unspecified, the alignment is inherited from a parent placeholder if it exists. If the shape has no parent, the default alignment matches the alignment for new shapes created in the Slides editor.",
          ).optional(),
          link: z.unknown().describe("A hypertext link.").optional(),
          outline: z.unknown().describe(
            "The outline of a PageElement. If these fields are unset, they may be inherited from a parent placeholder if it exists. If there is no parent, the fields will default to the value used for new page elements created in the Slides editor, which may depend on the page element kind.",
          ).optional(),
          shadow: z.unknown().describe(
            "The shadow properties of a page element. If these fields are unset, they may be inherited from a parent placeholder if it exists. If there is no parent, the fields will default to the value used for new page elements created in the Slides editor, which may depend on the page element kind.",
          ).optional(),
          shapeBackgroundFill: z.unknown().describe(
            "The shape background fill.",
          ).optional(),
        }).describe(
          "The properties of a Shape. If the shape is a placeholder shape as determined by the placeholder field, then these properties may be inherited from a parent placeholder shape. Determining the rendered value of the property depends on the corresponding property_state field value. Any text autofit settings on the shape are automatically deactivated by requests that can impact how text fits in the shape.",
        ).optional(),
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
        }).describe(
          "The general text content. The text must reside in a compatible shape (e.g. text box or rectangle) or a table cell in a page.",
        ).optional(),
      }).describe(
        "A PageElement kind representing a generic shape that doesn't have a more specific classification. For more information, see [Size and position page elements](https://developers.google.com/workspace/slides/api/guides/transform).",
      ).optional(),
      sheetsChart: z.object({
        chartId: z.number().int().describe(
          "The ID of the specific chart in the Google Sheets spreadsheet that is embedded.",
        ).optional(),
        contentUrl: z.string().describe(
          "The URL of an image of the embedded chart, with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        sheetsChartProperties: z.object({
          chartImageProperties: z.unknown().describe(
            "The properties of the Image.",
          ).optional(),
        }).describe("The properties of the SheetsChart.").optional(),
        spreadsheetId: z.string().describe(
          "The ID of the Google Sheets spreadsheet that contains the source chart.",
        ).optional(),
      }).describe(
        "A PageElement kind representing a linked chart embedded from Google Sheets.",
      ).optional(),
      size: z.object({
        height: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("A magnitude in a single direction in the specified units.")
          .optional(),
        width: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("A magnitude in a single direction in the specified units.")
          .optional(),
      }).describe("A width and height.").optional(),
      speakerSpotlight: z.object({
        speakerSpotlightProperties: z.object({
          outline: z.unknown().describe(
            "The outline of a PageElement. If these fields are unset, they may be inherited from a parent placeholder if it exists. If there is no parent, the fields will default to the value used for new page elements created in the Slides editor, which may depend on the page element kind.",
          ).optional(),
          shadow: z.unknown().describe(
            "The shadow properties of a page element. If these fields are unset, they may be inherited from a parent placeholder if it exists. If there is no parent, the fields will default to the value used for new page elements created in the Slides editor, which may depend on the page element kind.",
          ).optional(),
        }).describe("The properties of the SpeakerSpotlight.").optional(),
      }).describe("A PageElement kind representing a Speaker Spotlight.")
        .optional(),
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
      }).describe("A PageElement kind representing a table.").optional(),
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
        "AffineTransform uses a 3x3 matrix with an implied last row of [ 0 0 1 ] to transform source coordinates (x,y) into destination coordinates (x', y') according to: x' x = shear_y scale_y translate_y 1 [ 1 ] After transformation, x' = scale_x * x + shear_x * y + translate_x; y' = scale_y * y + shear_y * x + translate_y; This message is therefore composed of these six matrix elements.",
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
            "The outline of a PageElement. If these fields are unset, they may be inherited from a parent placeholder if it exists. If there is no parent, the fields will default to the value used for new page elements created in the Slides editor, which may depend on the page element kind.",
          ).optional(),
          start: z.unknown().describe(
            "The time at which to start playback, measured in seconds from the beginning of the video. If set, the start time should be before the end time. If you set this to a value that exceeds the video's length in seconds, the video will be played from the last second. If not set, the video will be played from the beginning.",
          ).optional(),
        }).describe("The properties of the Video.").optional(),
      }).describe("A PageElement kind representing a video.").optional(),
      wordArt: z.object({
        renderedText: z.string().describe("The text rendered as word art.")
          .optional(),
      }).describe("A PageElement kind representing word art.").optional(),
    })).describe("The page elements rendered on the page.").optional(),
    pageProperties: z.object({
      colorScheme: z.object({
        colors: z.array(z.object({
          color: z.unknown().describe("An RGB color.").optional(),
          type: z.unknown().describe("The type of the theme color.").optional(),
        })).describe(
          "The ThemeColorType and corresponding concrete color pairs.",
        ).optional(),
      }).describe("The palette of predefined colors for a page.").optional(),
      pageBackgroundFill: z.object({
        propertyState: z.enum(["RENDERED", "NOT_RENDERED", "INHERIT"]).describe(
          "The background fill property state. Updating the fill on a page will implicitly update this field to `RENDERED`, unless another value is specified in the same request. To have no fill on a page, set this field to `NOT_RENDERED`. In this case, any other fill fields set in the same request will be ignored.",
        ).optional(),
        solidFill: z.object({
          alpha: z.number().describe(
            "The fraction of this `color` that should be applied to the pixel. That is, the final pixel color is defined by the equation: pixel color = alpha * (color) + (1.0 - alpha) * (background color) This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color.",
          ).optional(),
          color: z.object({
            rgbColor: z.unknown().describe("An RGB color.").optional(),
            themeColor: z.unknown().describe("An opaque theme color.")
              .optional(),
          }).describe("A themeable solid color value.").optional(),
        }).describe(
          "A solid color fill. The page or page element is filled entirely with the specified color value. If any field is unset, its value may be inherited from a parent placeholder if it exists.",
        ).optional(),
        stretchedPictureFill: z.object({
          contentUrl: z.string().describe(
            "Reading the content_url: An URL to a picture with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the picture as the original requester. Access to the picture may be lost if the presentation's sharing settings change. Writing the content_url: The picture is fetched once at insertion time and a copy is stored for display inside the presentation. Pictures must be less than 50MB in size, cannot exceed 25 megapixels, and must be in one of PNG, JPEG, or GIF format. The provided URL can be at most 2 kB in length.",
          ).optional(),
          size: z.object({
            height: z.unknown().describe(
              "A magnitude in a single direction in the specified units.",
            ).optional(),
            width: z.unknown().describe(
              "A magnitude in a single direction in the specified units.",
            ).optional(),
          }).describe("A width and height.").optional(),
        }).describe(
          "The stretched picture fill. The page or page element is filled entirely with the specified picture. The picture is stretched to fit its container.",
        ).optional(),
      }).describe("The page background fill.").optional(),
    }).describe(
      "The properties of the Page. The page will inherit properties from the parent page. Depending on the page type the hierarchy is defined in either SlideProperties or LayoutProperties.",
    ).optional(),
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
    }).describe(
      "The properties of Page that are only relevant for pages with page_type SLIDE.",
    ).optional(),
  }).describe("A page in a presentation.").optional(),
  pageSize: z.object({
    height: z.object({
      magnitude: z.number().describe("The magnitude.").optional(),
      unit: z.enum(["UNIT_UNSPECIFIED", "EMU", "PT"]).describe(
        "The units for magnitude.",
      ).optional(),
    }).describe("A magnitude in a single direction in the specified units.")
      .optional(),
    width: z.object({
      magnitude: z.number().describe("The magnitude.").optional(),
      unit: z.enum(["UNIT_UNSPECIFIED", "EMU", "PT"]).describe(
        "The units for magnitude.",
      ).optional(),
    }).describe("A magnitude in a single direction in the specified units.")
      .optional(),
  }).describe("A width and height.").optional(),
  presentationId: z.string().describe("The ID of the presentation.").optional(),
  slides: z.array(z.object({
    layoutProperties: z.object({
      displayName: z.string().describe("The human-readable name of the layout.")
        .optional(),
      masterObjectId: z.string().describe(
        "The object ID of the master that this layout is based on.",
      ).optional(),
      name: z.string().describe("The name of the layout.").optional(),
    }).describe(
      "The properties of Page are only relevant for pages with page_type LAYOUT.",
    ).optional(),
    masterProperties: z.object({
      displayName: z.string().describe("The human-readable name of the master.")
        .optional(),
    }).describe(
      "The properties of Page that are only relevant for pages with page_type MASTER.",
    ).optional(),
    notesProperties: z.object({
      speakerNotesObjectId: z.string().describe(
        "The object ID of the shape on this notes page that contains the speaker notes for the corresponding slide. The actual shape may not always exist on the notes page. Inserting text using this object ID will automatically create the shape. In this case, the actual shape may have different object ID. The `GetPresentation` or `GetPage` action will always return the latest object ID.",
      ).optional(),
    }).describe(
      "The properties of Page that are only relevant for pages with page_type NOTES.",
    ).optional(),
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
      }).describe(
        "A PageElement kind representing a joined collection of PageElements.",
      ).optional(),
      image: z.object({
        contentUrl: z.unknown().describe(
          "An URL to an image with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        imageProperties: z.unknown().describe("The properties of the Image.")
          .optional(),
        placeholder: z.unknown().describe(
          "The placeholder information that uniquely identifies a placeholder shape.",
        ).optional(),
        sourceUrl: z.unknown().describe(
          "The source URL is the URL used to insert the image. The source URL can be empty.",
        ).optional(),
      }).describe("A PageElement kind representing an image.").optional(),
      line: z.object({
        lineCategory: z.unknown().describe(
          "The category of the line. It matches the `category` specified in CreateLineRequest, and can be updated with UpdateLineCategoryRequest.",
        ).optional(),
        lineProperties: z.unknown().describe(
          "The properties of the Line. When unset, these fields default to values that match the appearance of new lines created in the Slides editor.",
        ).optional(),
        lineType: z.unknown().describe("The type of the line.").optional(),
      }).describe(
        "A PageElement kind representing a non-connector line, straight connector, curved connector, or bent connector.",
      ).optional(),
      objectId: z.string().describe(
        "The object ID for this page element. Object IDs used by google.apps.slides.v1.Page and google.apps.slides.v1.PageElement share the same namespace.",
      ).optional(),
      shape: z.object({
        placeholder: z.unknown().describe(
          "The placeholder information that uniquely identifies a placeholder shape.",
        ).optional(),
        shapeProperties: z.unknown().describe(
          "The properties of a Shape. If the shape is a placeholder shape as determined by the placeholder field, then these properties may be inherited from a parent placeholder shape. Determining the rendered value of the property depends on the corresponding property_state field value. Any text autofit settings on the shape are automatically deactivated by requests that can impact how text fits in the shape.",
        ).optional(),
        shapeType: z.unknown().describe("The type of the shape.").optional(),
        text: z.unknown().describe(
          "The general text content. The text must reside in a compatible shape (e.g. text box or rectangle) or a table cell in a page.",
        ).optional(),
      }).describe(
        "A PageElement kind representing a generic shape that doesn't have a more specific classification. For more information, see [Size and position page elements](https://developers.google.com/workspace/slides/api/guides/transform).",
      ).optional(),
      sheetsChart: z.object({
        chartId: z.unknown().describe(
          "The ID of the specific chart in the Google Sheets spreadsheet that is embedded.",
        ).optional(),
        contentUrl: z.unknown().describe(
          "The URL of an image of the embedded chart, with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        sheetsChartProperties: z.unknown().describe(
          "The properties of the SheetsChart.",
        ).optional(),
        spreadsheetId: z.unknown().describe(
          "The ID of the Google Sheets spreadsheet that contains the source chart.",
        ).optional(),
      }).describe(
        "A PageElement kind representing a linked chart embedded from Google Sheets.",
      ).optional(),
      size: z.object({
        height: z.unknown().describe(
          "A magnitude in a single direction in the specified units.",
        ).optional(),
        width: z.unknown().describe(
          "A magnitude in a single direction in the specified units.",
        ).optional(),
      }).describe("A width and height.").optional(),
      speakerSpotlight: z.object({
        speakerSpotlightProperties: z.unknown().describe(
          "The properties of the SpeakerSpotlight.",
        ).optional(),
      }).describe("A PageElement kind representing a Speaker Spotlight.")
        .optional(),
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
      }).describe("A PageElement kind representing a table.").optional(),
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
        "AffineTransform uses a 3x3 matrix with an implied last row of [ 0 0 1 ] to transform source coordinates (x,y) into destination coordinates (x', y') according to: x' x = shear_y scale_y translate_y 1 [ 1 ] After transformation, x' = scale_x * x + shear_x * y + translate_x; y' = scale_y * y + shear_y * x + translate_y; This message is therefore composed of these six matrix elements.",
      ).optional(),
      video: z.object({
        id: z.unknown().describe(
          "The video source's unique identifier for this video.",
        ).optional(),
        source: z.unknown().describe("The video source.").optional(),
        url: z.unknown().describe(
          "An URL to a video. The URL is valid as long as the source video exists and sharing settings do not change.",
        ).optional(),
        videoProperties: z.unknown().describe("The properties of the Video.")
          .optional(),
      }).describe("A PageElement kind representing a video.").optional(),
      wordArt: z.object({
        renderedText: z.unknown().describe("The text rendered as word art.")
          .optional(),
      }).describe("A PageElement kind representing word art.").optional(),
    })).describe("The page elements rendered on the page.").optional(),
    pageProperties: z.object({
      colorScheme: z.object({
        colors: z.array(z.unknown()).describe(
          "The ThemeColorType and corresponding concrete color pairs.",
        ).optional(),
      }).describe("The palette of predefined colors for a page.").optional(),
      pageBackgroundFill: z.object({
        propertyState: z.enum(["RENDERED", "NOT_RENDERED", "INHERIT"]).describe(
          "The background fill property state. Updating the fill on a page will implicitly update this field to `RENDERED`, unless another value is specified in the same request. To have no fill on a page, set this field to `NOT_RENDERED`. In this case, any other fill fields set in the same request will be ignored.",
        ).optional(),
        solidFill: z.object({
          alpha: z.unknown().describe(
            "The fraction of this `color` that should be applied to the pixel. That is, the final pixel color is defined by the equation: pixel color = alpha * (color) + (1.0 - alpha) * (background color) This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color.",
          ).optional(),
          color: z.unknown().describe("A themeable solid color value.")
            .optional(),
        }).describe(
          "A solid color fill. The page or page element is filled entirely with the specified color value. If any field is unset, its value may be inherited from a parent placeholder if it exists.",
        ).optional(),
        stretchedPictureFill: z.object({
          contentUrl: z.unknown().describe(
            "Reading the content_url: An URL to a picture with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the picture as the original requester. Access to the picture may be lost if the presentation's sharing settings change. Writing the content_url: The picture is fetched once at insertion time and a copy is stored for display inside the presentation. Pictures must be less than 50MB in size, cannot exceed 25 megapixels, and must be in one of PNG, JPEG, or GIF format. The provided URL can be at most 2 kB in length.",
          ).optional(),
          size: z.unknown().describe("A width and height.").optional(),
        }).describe(
          "The stretched picture fill. The page or page element is filled entirely with the specified picture. The picture is stretched to fit its container.",
        ).optional(),
      }).describe("The page background fill.").optional(),
    }).describe(
      "The properties of the Page. The page will inherit properties from the parent page. Depending on the page type the hierarchy is defined in either SlideProperties or LayoutProperties.",
    ).optional(),
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
    }).describe(
      "The properties of Page that are only relevant for pages with page_type SLIDE.",
    ).optional(),
  })).describe(
    "The slides in the presentation. A slide inherits properties from a slide layout.",
  ).optional(),
  title: z.string().describe("The title of the presentation.").optional(),
});

const StateSchema = z.object({
  layouts: z.array(z.object({
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
  layouts: z.array(z.object({
    layoutProperties: z.object({
      displayName: z.string().describe("The human-readable name of the layout.")
        .optional(),
      masterObjectId: z.string().describe(
        "The object ID of the master that this layout is based on.",
      ).optional(),
      name: z.string().describe("The name of the layout.").optional(),
    }).describe(
      "The properties of Page are only relevant for pages with page_type LAYOUT.",
    ).optional(),
    masterProperties: z.object({
      displayName: z.string().describe("The human-readable name of the master.")
        .optional(),
    }).describe(
      "The properties of Page that are only relevant for pages with page_type MASTER.",
    ).optional(),
    notesProperties: z.object({
      speakerNotesObjectId: z.string().describe(
        "The object ID of the shape on this notes page that contains the speaker notes for the corresponding slide. The actual shape may not always exist on the notes page. Inserting text using this object ID will automatically create the shape. In this case, the actual shape may have different object ID. The `GetPresentation` or `GetPage` action will always return the latest object ID.",
      ).optional(),
    }).describe(
      "The properties of Page that are only relevant for pages with page_type NOTES.",
    ).optional(),
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
      }).describe(
        "A PageElement kind representing a joined collection of PageElements.",
      ).optional(),
      image: z.object({
        contentUrl: z.unknown().describe(
          "An URL to an image with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        imageProperties: z.unknown().describe("The properties of the Image.")
          .optional(),
        placeholder: z.unknown().describe(
          "The placeholder information that uniquely identifies a placeholder shape.",
        ).optional(),
        sourceUrl: z.unknown().describe(
          "The source URL is the URL used to insert the image. The source URL can be empty.",
        ).optional(),
      }).describe("A PageElement kind representing an image.").optional(),
      line: z.object({
        lineCategory: z.unknown().describe(
          "The category of the line. It matches the `category` specified in CreateLineRequest, and can be updated with UpdateLineCategoryRequest.",
        ).optional(),
        lineProperties: z.unknown().describe(
          "The properties of the Line. When unset, these fields default to values that match the appearance of new lines created in the Slides editor.",
        ).optional(),
        lineType: z.unknown().describe("The type of the line.").optional(),
      }).describe(
        "A PageElement kind representing a non-connector line, straight connector, curved connector, or bent connector.",
      ).optional(),
      objectId: z.string().describe(
        "The object ID for this page element. Object IDs used by google.apps.slides.v1.Page and google.apps.slides.v1.PageElement share the same namespace.",
      ).optional(),
      shape: z.object({
        placeholder: z.unknown().describe(
          "The placeholder information that uniquely identifies a placeholder shape.",
        ).optional(),
        shapeProperties: z.unknown().describe(
          "The properties of a Shape. If the shape is a placeholder shape as determined by the placeholder field, then these properties may be inherited from a parent placeholder shape. Determining the rendered value of the property depends on the corresponding property_state field value. Any text autofit settings on the shape are automatically deactivated by requests that can impact how text fits in the shape.",
        ).optional(),
        shapeType: z.unknown().describe("The type of the shape.").optional(),
        text: z.unknown().describe(
          "The general text content. The text must reside in a compatible shape (e.g. text box or rectangle) or a table cell in a page.",
        ).optional(),
      }).describe(
        "A PageElement kind representing a generic shape that doesn't have a more specific classification. For more information, see [Size and position page elements](https://developers.google.com/workspace/slides/api/guides/transform).",
      ).optional(),
      sheetsChart: z.object({
        chartId: z.unknown().describe(
          "The ID of the specific chart in the Google Sheets spreadsheet that is embedded.",
        ).optional(),
        contentUrl: z.unknown().describe(
          "The URL of an image of the embedded chart, with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        sheetsChartProperties: z.unknown().describe(
          "The properties of the SheetsChart.",
        ).optional(),
        spreadsheetId: z.unknown().describe(
          "The ID of the Google Sheets spreadsheet that contains the source chart.",
        ).optional(),
      }).describe(
        "A PageElement kind representing a linked chart embedded from Google Sheets.",
      ).optional(),
      size: z.object({
        height: z.unknown().describe(
          "A magnitude in a single direction in the specified units.",
        ).optional(),
        width: z.unknown().describe(
          "A magnitude in a single direction in the specified units.",
        ).optional(),
      }).describe("A width and height.").optional(),
      speakerSpotlight: z.object({
        speakerSpotlightProperties: z.unknown().describe(
          "The properties of the SpeakerSpotlight.",
        ).optional(),
      }).describe("A PageElement kind representing a Speaker Spotlight.")
        .optional(),
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
      }).describe("A PageElement kind representing a table.").optional(),
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
        "AffineTransform uses a 3x3 matrix with an implied last row of [ 0 0 1 ] to transform source coordinates (x,y) into destination coordinates (x', y') according to: x' x = shear_y scale_y translate_y 1 [ 1 ] After transformation, x' = scale_x * x + shear_x * y + translate_x; y' = scale_y * y + shear_y * x + translate_y; This message is therefore composed of these six matrix elements.",
      ).optional(),
      video: z.object({
        id: z.unknown().describe(
          "The video source's unique identifier for this video.",
        ).optional(),
        source: z.unknown().describe("The video source.").optional(),
        url: z.unknown().describe(
          "An URL to a video. The URL is valid as long as the source video exists and sharing settings do not change.",
        ).optional(),
        videoProperties: z.unknown().describe("The properties of the Video.")
          .optional(),
      }).describe("A PageElement kind representing a video.").optional(),
      wordArt: z.object({
        renderedText: z.unknown().describe("The text rendered as word art.")
          .optional(),
      }).describe("A PageElement kind representing word art.").optional(),
    })).describe("The page elements rendered on the page.").optional(),
    pageProperties: z.object({
      colorScheme: z.object({
        colors: z.array(z.unknown()).describe(
          "The ThemeColorType and corresponding concrete color pairs.",
        ).optional(),
      }).describe("The palette of predefined colors for a page.").optional(),
      pageBackgroundFill: z.object({
        propertyState: z.enum(["RENDERED", "NOT_RENDERED", "INHERIT"]).describe(
          "The background fill property state. Updating the fill on a page will implicitly update this field to `RENDERED`, unless another value is specified in the same request. To have no fill on a page, set this field to `NOT_RENDERED`. In this case, any other fill fields set in the same request will be ignored.",
        ).optional(),
        solidFill: z.object({
          alpha: z.unknown().describe(
            "The fraction of this `color` that should be applied to the pixel. That is, the final pixel color is defined by the equation: pixel color = alpha * (color) + (1.0 - alpha) * (background color) This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color.",
          ).optional(),
          color: z.unknown().describe("A themeable solid color value.")
            .optional(),
        }).describe(
          "A solid color fill. The page or page element is filled entirely with the specified color value. If any field is unset, its value may be inherited from a parent placeholder if it exists.",
        ).optional(),
        stretchedPictureFill: z.object({
          contentUrl: z.unknown().describe(
            "Reading the content_url: An URL to a picture with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the picture as the original requester. Access to the picture may be lost if the presentation's sharing settings change. Writing the content_url: The picture is fetched once at insertion time and a copy is stored for display inside the presentation. Pictures must be less than 50MB in size, cannot exceed 25 megapixels, and must be in one of PNG, JPEG, or GIF format. The provided URL can be at most 2 kB in length.",
          ).optional(),
          size: z.unknown().describe("A width and height.").optional(),
        }).describe(
          "The stretched picture fill. The page or page element is filled entirely with the specified picture. The picture is stretched to fit its container.",
        ).optional(),
      }).describe("The page background fill.").optional(),
    }).describe(
      "The properties of the Page. The page will inherit properties from the parent page. Depending on the page type the hierarchy is defined in either SlideProperties or LayoutProperties.",
    ).optional(),
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
    }).describe(
      "The properties of Page that are only relevant for pages with page_type SLIDE.",
    ).optional(),
  })).describe(
    "The layouts in the presentation. A layout is a template that determines how content is arranged and styled on the slides that inherit from that layout.",
  ).optional(),
  locale: z.string().describe(
    "The locale of the presentation, as an IETF BCP 47 language tag.",
  ).optional(),
  masters: z.array(z.object({
    layoutProperties: z.object({
      displayName: z.string().describe("The human-readable name of the layout.")
        .optional(),
      masterObjectId: z.string().describe(
        "The object ID of the master that this layout is based on.",
      ).optional(),
      name: z.string().describe("The name of the layout.").optional(),
    }).describe(
      "The properties of Page are only relevant for pages with page_type LAYOUT.",
    ).optional(),
    masterProperties: z.object({
      displayName: z.string().describe("The human-readable name of the master.")
        .optional(),
    }).describe(
      "The properties of Page that are only relevant for pages with page_type MASTER.",
    ).optional(),
    notesProperties: z.object({
      speakerNotesObjectId: z.string().describe(
        "The object ID of the shape on this notes page that contains the speaker notes for the corresponding slide. The actual shape may not always exist on the notes page. Inserting text using this object ID will automatically create the shape. In this case, the actual shape may have different object ID. The `GetPresentation` or `GetPage` action will always return the latest object ID.",
      ).optional(),
    }).describe(
      "The properties of Page that are only relevant for pages with page_type NOTES.",
    ).optional(),
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
      }).describe(
        "A PageElement kind representing a joined collection of PageElements.",
      ).optional(),
      image: z.object({
        contentUrl: z.unknown().describe(
          "An URL to an image with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        imageProperties: z.unknown().describe("The properties of the Image.")
          .optional(),
        placeholder: z.unknown().describe(
          "The placeholder information that uniquely identifies a placeholder shape.",
        ).optional(),
        sourceUrl: z.unknown().describe(
          "The source URL is the URL used to insert the image. The source URL can be empty.",
        ).optional(),
      }).describe("A PageElement kind representing an image.").optional(),
      line: z.object({
        lineCategory: z.unknown().describe(
          "The category of the line. It matches the `category` specified in CreateLineRequest, and can be updated with UpdateLineCategoryRequest.",
        ).optional(),
        lineProperties: z.unknown().describe(
          "The properties of the Line. When unset, these fields default to values that match the appearance of new lines created in the Slides editor.",
        ).optional(),
        lineType: z.unknown().describe("The type of the line.").optional(),
      }).describe(
        "A PageElement kind representing a non-connector line, straight connector, curved connector, or bent connector.",
      ).optional(),
      objectId: z.string().describe(
        "The object ID for this page element. Object IDs used by google.apps.slides.v1.Page and google.apps.slides.v1.PageElement share the same namespace.",
      ).optional(),
      shape: z.object({
        placeholder: z.unknown().describe(
          "The placeholder information that uniquely identifies a placeholder shape.",
        ).optional(),
        shapeProperties: z.unknown().describe(
          "The properties of a Shape. If the shape is a placeholder shape as determined by the placeholder field, then these properties may be inherited from a parent placeholder shape. Determining the rendered value of the property depends on the corresponding property_state field value. Any text autofit settings on the shape are automatically deactivated by requests that can impact how text fits in the shape.",
        ).optional(),
        shapeType: z.unknown().describe("The type of the shape.").optional(),
        text: z.unknown().describe(
          "The general text content. The text must reside in a compatible shape (e.g. text box or rectangle) or a table cell in a page.",
        ).optional(),
      }).describe(
        "A PageElement kind representing a generic shape that doesn't have a more specific classification. For more information, see [Size and position page elements](https://developers.google.com/workspace/slides/api/guides/transform).",
      ).optional(),
      sheetsChart: z.object({
        chartId: z.unknown().describe(
          "The ID of the specific chart in the Google Sheets spreadsheet that is embedded.",
        ).optional(),
        contentUrl: z.unknown().describe(
          "The URL of an image of the embedded chart, with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        sheetsChartProperties: z.unknown().describe(
          "The properties of the SheetsChart.",
        ).optional(),
        spreadsheetId: z.unknown().describe(
          "The ID of the Google Sheets spreadsheet that contains the source chart.",
        ).optional(),
      }).describe(
        "A PageElement kind representing a linked chart embedded from Google Sheets.",
      ).optional(),
      size: z.object({
        height: z.unknown().describe(
          "A magnitude in a single direction in the specified units.",
        ).optional(),
        width: z.unknown().describe(
          "A magnitude in a single direction in the specified units.",
        ).optional(),
      }).describe("A width and height.").optional(),
      speakerSpotlight: z.object({
        speakerSpotlightProperties: z.unknown().describe(
          "The properties of the SpeakerSpotlight.",
        ).optional(),
      }).describe("A PageElement kind representing a Speaker Spotlight.")
        .optional(),
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
      }).describe("A PageElement kind representing a table.").optional(),
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
        "AffineTransform uses a 3x3 matrix with an implied last row of [ 0 0 1 ] to transform source coordinates (x,y) into destination coordinates (x', y') according to: x' x = shear_y scale_y translate_y 1 [ 1 ] After transformation, x' = scale_x * x + shear_x * y + translate_x; y' = scale_y * y + shear_y * x + translate_y; This message is therefore composed of these six matrix elements.",
      ).optional(),
      video: z.object({
        id: z.unknown().describe(
          "The video source's unique identifier for this video.",
        ).optional(),
        source: z.unknown().describe("The video source.").optional(),
        url: z.unknown().describe(
          "An URL to a video. The URL is valid as long as the source video exists and sharing settings do not change.",
        ).optional(),
        videoProperties: z.unknown().describe("The properties of the Video.")
          .optional(),
      }).describe("A PageElement kind representing a video.").optional(),
      wordArt: z.object({
        renderedText: z.unknown().describe("The text rendered as word art.")
          .optional(),
      }).describe("A PageElement kind representing word art.").optional(),
    })).describe("The page elements rendered on the page.").optional(),
    pageProperties: z.object({
      colorScheme: z.object({
        colors: z.array(z.unknown()).describe(
          "The ThemeColorType and corresponding concrete color pairs.",
        ).optional(),
      }).describe("The palette of predefined colors for a page.").optional(),
      pageBackgroundFill: z.object({
        propertyState: z.enum(["RENDERED", "NOT_RENDERED", "INHERIT"]).describe(
          "The background fill property state. Updating the fill on a page will implicitly update this field to `RENDERED`, unless another value is specified in the same request. To have no fill on a page, set this field to `NOT_RENDERED`. In this case, any other fill fields set in the same request will be ignored.",
        ).optional(),
        solidFill: z.object({
          alpha: z.unknown().describe(
            "The fraction of this `color` that should be applied to the pixel. That is, the final pixel color is defined by the equation: pixel color = alpha * (color) + (1.0 - alpha) * (background color) This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color.",
          ).optional(),
          color: z.unknown().describe("A themeable solid color value.")
            .optional(),
        }).describe(
          "A solid color fill. The page or page element is filled entirely with the specified color value. If any field is unset, its value may be inherited from a parent placeholder if it exists.",
        ).optional(),
        stretchedPictureFill: z.object({
          contentUrl: z.unknown().describe(
            "Reading the content_url: An URL to a picture with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the picture as the original requester. Access to the picture may be lost if the presentation's sharing settings change. Writing the content_url: The picture is fetched once at insertion time and a copy is stored for display inside the presentation. Pictures must be less than 50MB in size, cannot exceed 25 megapixels, and must be in one of PNG, JPEG, or GIF format. The provided URL can be at most 2 kB in length.",
          ).optional(),
          size: z.unknown().describe("A width and height.").optional(),
        }).describe(
          "The stretched picture fill. The page or page element is filled entirely with the specified picture. The picture is stretched to fit its container.",
        ).optional(),
      }).describe("The page background fill.").optional(),
    }).describe(
      "The properties of the Page. The page will inherit properties from the parent page. Depending on the page type the hierarchy is defined in either SlideProperties or LayoutProperties.",
    ).optional(),
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
    }).describe(
      "The properties of Page that are only relevant for pages with page_type SLIDE.",
    ).optional(),
  })).describe(
    "The slide masters in the presentation. A slide master contains all common page elements and the common properties for a set of layouts. They serve three purposes: - Placeholder shapes on a master contain the default text styles and shape properties of all placeholder shapes on pages that use that master. - The master page properties define the common page properties inherited by its layouts. - Any other shapes on the master slide appear on all slides using that master, regardless of their layout.",
  ).optional(),
  notesMaster: z.object({
    layoutProperties: z.object({
      displayName: z.string().describe("The human-readable name of the layout.")
        .optional(),
      masterObjectId: z.string().describe(
        "The object ID of the master that this layout is based on.",
      ).optional(),
      name: z.string().describe("The name of the layout.").optional(),
    }).describe(
      "The properties of Page are only relevant for pages with page_type LAYOUT.",
    ).optional(),
    masterProperties: z.object({
      displayName: z.string().describe("The human-readable name of the master.")
        .optional(),
    }).describe(
      "The properties of Page that are only relevant for pages with page_type MASTER.",
    ).optional(),
    notesProperties: z.object({
      speakerNotesObjectId: z.string().describe(
        "The object ID of the shape on this notes page that contains the speaker notes for the corresponding slide. The actual shape may not always exist on the notes page. Inserting text using this object ID will automatically create the shape. In this case, the actual shape may have different object ID. The `GetPresentation` or `GetPage` action will always return the latest object ID.",
      ).optional(),
    }).describe(
      "The properties of Page that are only relevant for pages with page_type NOTES.",
    ).optional(),
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
      }).describe(
        "A PageElement kind representing a joined collection of PageElements.",
      ).optional(),
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
            "The crop properties of an object enclosed in a container. For example, an Image. The crop properties is represented by the offsets of four edges which define a crop rectangle. The offsets are measured in percentage from the corresponding edges of the object's original bounding rectangle towards inside, relative to the object's original dimensions. - If the offset is in the interval (0, 1), the corresponding edge of crop rectangle is positioned inside of the object's original bounding rectangle. - If the offset is negative or greater than 1, the corresponding edge of crop rectangle is positioned outside of the object's original bounding rectangle. - If the left edge of the crop rectangle is on the right side of its right edge, the object will be flipped horizontally. - If the top edge of the crop rectangle is below its bottom edge, the object will be flipped vertically. - If all offsets and rotation angle is 0, the object is not cropped. After cropping, the content in the crop rectangle will be stretched to fit its container.",
          ).optional(),
          link: z.unknown().describe("A hypertext link.").optional(),
          outline: z.unknown().describe(
            "The outline of a PageElement. If these fields are unset, they may be inherited from a parent placeholder if it exists. If there is no parent, the fields will default to the value used for new page elements created in the Slides editor, which may depend on the page element kind.",
          ).optional(),
          recolor: z.unknown().describe("A recolor effect applied on an image.")
            .optional(),
          shadow: z.unknown().describe(
            "The shadow properties of a page element. If these fields are unset, they may be inherited from a parent placeholder if it exists. If there is no parent, the fields will default to the value used for new page elements created in the Slides editor, which may depend on the page element kind.",
          ).optional(),
          transparency: z.unknown().describe(
            "The transparency effect of the image. The value should be in the interval [0.0, 1.0], where 0 means no effect and 1 means completely transparent. This property is read-only.",
          ).optional(),
        }).describe("The properties of the Image.").optional(),
        placeholder: z.object({
          index: z.unknown().describe(
            "The index of the placeholder. If the same placeholder types are present in the same page, they would have different index values.",
          ).optional(),
          parentObjectId: z.unknown().describe(
            "The object ID of this shape's parent placeholder. If unset, the parent placeholder shape does not exist, so the shape does not inherit properties from any other shape.",
          ).optional(),
          type: z.unknown().describe("The type of the placeholder.").optional(),
        }).describe(
          "The placeholder information that uniquely identifies a placeholder shape.",
        ).optional(),
        sourceUrl: z.string().describe(
          "The source URL is the URL used to insert the image. The source URL can be empty.",
        ).optional(),
      }).describe("A PageElement kind representing an image.").optional(),
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
            "The properties for one end of a Line connection.",
          ).optional(),
          lineFill: z.unknown().describe("The fill of the line.").optional(),
          link: z.unknown().describe("A hypertext link.").optional(),
          startArrow: z.unknown().describe(
            "The style of the arrow at the beginning of the line.",
          ).optional(),
          startConnection: z.unknown().describe(
            "The properties for one end of a Line connection.",
          ).optional(),
          weight: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
        }).describe(
          "The properties of the Line. When unset, these fields default to values that match the appearance of new lines created in the Slides editor.",
        ).optional(),
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
      }).describe(
        "A PageElement kind representing a non-connector line, straight connector, curved connector, or bent connector.",
      ).optional(),
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
          "The placeholder information that uniquely identifies a placeholder shape.",
        ).optional(),
        shapeProperties: z.object({
          autofit: z.unknown().describe(
            "The autofit properties of a Shape. This property is only set for shapes that allow text.",
          ).optional(),
          contentAlignment: z.unknown().describe(
            "The alignment of the content in the shape. If unspecified, the alignment is inherited from a parent placeholder if it exists. If the shape has no parent, the default alignment matches the alignment for new shapes created in the Slides editor.",
          ).optional(),
          link: z.unknown().describe("A hypertext link.").optional(),
          outline: z.unknown().describe(
            "The outline of a PageElement. If these fields are unset, they may be inherited from a parent placeholder if it exists. If there is no parent, the fields will default to the value used for new page elements created in the Slides editor, which may depend on the page element kind.",
          ).optional(),
          shadow: z.unknown().describe(
            "The shadow properties of a page element. If these fields are unset, they may be inherited from a parent placeholder if it exists. If there is no parent, the fields will default to the value used for new page elements created in the Slides editor, which may depend on the page element kind.",
          ).optional(),
          shapeBackgroundFill: z.unknown().describe(
            "The shape background fill.",
          ).optional(),
        }).describe(
          "The properties of a Shape. If the shape is a placeholder shape as determined by the placeholder field, then these properties may be inherited from a parent placeholder shape. Determining the rendered value of the property depends on the corresponding property_state field value. Any text autofit settings on the shape are automatically deactivated by requests that can impact how text fits in the shape.",
        ).optional(),
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
        }).describe(
          "The general text content. The text must reside in a compatible shape (e.g. text box or rectangle) or a table cell in a page.",
        ).optional(),
      }).describe(
        "A PageElement kind representing a generic shape that doesn't have a more specific classification. For more information, see [Size and position page elements](https://developers.google.com/workspace/slides/api/guides/transform).",
      ).optional(),
      sheetsChart: z.object({
        chartId: z.number().int().describe(
          "The ID of the specific chart in the Google Sheets spreadsheet that is embedded.",
        ).optional(),
        contentUrl: z.string().describe(
          "The URL of an image of the embedded chart, with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        sheetsChartProperties: z.object({
          chartImageProperties: z.unknown().describe(
            "The properties of the Image.",
          ).optional(),
        }).describe("The properties of the SheetsChart.").optional(),
        spreadsheetId: z.string().describe(
          "The ID of the Google Sheets spreadsheet that contains the source chart.",
        ).optional(),
      }).describe(
        "A PageElement kind representing a linked chart embedded from Google Sheets.",
      ).optional(),
      size: z.object({
        height: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("A magnitude in a single direction in the specified units.")
          .optional(),
        width: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("A magnitude in a single direction in the specified units.")
          .optional(),
      }).describe("A width and height.").optional(),
      speakerSpotlight: z.object({
        speakerSpotlightProperties: z.object({
          outline: z.unknown().describe(
            "The outline of a PageElement. If these fields are unset, they may be inherited from a parent placeholder if it exists. If there is no parent, the fields will default to the value used for new page elements created in the Slides editor, which may depend on the page element kind.",
          ).optional(),
          shadow: z.unknown().describe(
            "The shadow properties of a page element. If these fields are unset, they may be inherited from a parent placeholder if it exists. If there is no parent, the fields will default to the value used for new page elements created in the Slides editor, which may depend on the page element kind.",
          ).optional(),
        }).describe("The properties of the SpeakerSpotlight.").optional(),
      }).describe("A PageElement kind representing a Speaker Spotlight.")
        .optional(),
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
      }).describe("A PageElement kind representing a table.").optional(),
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
        "AffineTransform uses a 3x3 matrix with an implied last row of [ 0 0 1 ] to transform source coordinates (x,y) into destination coordinates (x', y') according to: x' x = shear_y scale_y translate_y 1 [ 1 ] After transformation, x' = scale_x * x + shear_x * y + translate_x; y' = scale_y * y + shear_y * x + translate_y; This message is therefore composed of these six matrix elements.",
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
            "The outline of a PageElement. If these fields are unset, they may be inherited from a parent placeholder if it exists. If there is no parent, the fields will default to the value used for new page elements created in the Slides editor, which may depend on the page element kind.",
          ).optional(),
          start: z.unknown().describe(
            "The time at which to start playback, measured in seconds from the beginning of the video. If set, the start time should be before the end time. If you set this to a value that exceeds the video's length in seconds, the video will be played from the last second. If not set, the video will be played from the beginning.",
          ).optional(),
        }).describe("The properties of the Video.").optional(),
      }).describe("A PageElement kind representing a video.").optional(),
      wordArt: z.object({
        renderedText: z.string().describe("The text rendered as word art.")
          .optional(),
      }).describe("A PageElement kind representing word art.").optional(),
    })).describe("The page elements rendered on the page.").optional(),
    pageProperties: z.object({
      colorScheme: z.object({
        colors: z.array(z.object({
          color: z.unknown().describe("An RGB color.").optional(),
          type: z.unknown().describe("The type of the theme color.").optional(),
        })).describe(
          "The ThemeColorType and corresponding concrete color pairs.",
        ).optional(),
      }).describe("The palette of predefined colors for a page.").optional(),
      pageBackgroundFill: z.object({
        propertyState: z.enum(["RENDERED", "NOT_RENDERED", "INHERIT"]).describe(
          "The background fill property state. Updating the fill on a page will implicitly update this field to `RENDERED`, unless another value is specified in the same request. To have no fill on a page, set this field to `NOT_RENDERED`. In this case, any other fill fields set in the same request will be ignored.",
        ).optional(),
        solidFill: z.object({
          alpha: z.number().describe(
            "The fraction of this `color` that should be applied to the pixel. That is, the final pixel color is defined by the equation: pixel color = alpha * (color) + (1.0 - alpha) * (background color) This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color.",
          ).optional(),
          color: z.object({
            rgbColor: z.unknown().describe("An RGB color.").optional(),
            themeColor: z.unknown().describe("An opaque theme color.")
              .optional(),
          }).describe("A themeable solid color value.").optional(),
        }).describe(
          "A solid color fill. The page or page element is filled entirely with the specified color value. If any field is unset, its value may be inherited from a parent placeholder if it exists.",
        ).optional(),
        stretchedPictureFill: z.object({
          contentUrl: z.string().describe(
            "Reading the content_url: An URL to a picture with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the picture as the original requester. Access to the picture may be lost if the presentation's sharing settings change. Writing the content_url: The picture is fetched once at insertion time and a copy is stored for display inside the presentation. Pictures must be less than 50MB in size, cannot exceed 25 megapixels, and must be in one of PNG, JPEG, or GIF format. The provided URL can be at most 2 kB in length.",
          ).optional(),
          size: z.object({
            height: z.unknown().describe(
              "A magnitude in a single direction in the specified units.",
            ).optional(),
            width: z.unknown().describe(
              "A magnitude in a single direction in the specified units.",
            ).optional(),
          }).describe("A width and height.").optional(),
        }).describe(
          "The stretched picture fill. The page or page element is filled entirely with the specified picture. The picture is stretched to fit its container.",
        ).optional(),
      }).describe("The page background fill.").optional(),
    }).describe(
      "The properties of the Page. The page will inherit properties from the parent page. Depending on the page type the hierarchy is defined in either SlideProperties or LayoutProperties.",
    ).optional(),
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
    }).describe(
      "The properties of Page that are only relevant for pages with page_type SLIDE.",
    ).optional(),
  }).describe("A page in a presentation.").optional(),
  pageSize: z.object({
    height: z.object({
      magnitude: z.number().describe("The magnitude.").optional(),
      unit: z.enum(["UNIT_UNSPECIFIED", "EMU", "PT"]).describe(
        "The units for magnitude.",
      ).optional(),
    }).describe("A magnitude in a single direction in the specified units.")
      .optional(),
    width: z.object({
      magnitude: z.number().describe("The magnitude.").optional(),
      unit: z.enum(["UNIT_UNSPECIFIED", "EMU", "PT"]).describe(
        "The units for magnitude.",
      ).optional(),
    }).describe("A magnitude in a single direction in the specified units.")
      .optional(),
  }).describe("A width and height.").optional(),
  presentationId: z.string().describe("The ID of the presentation.").optional(),
  slides: z.array(z.object({
    layoutProperties: z.object({
      displayName: z.string().describe("The human-readable name of the layout.")
        .optional(),
      masterObjectId: z.string().describe(
        "The object ID of the master that this layout is based on.",
      ).optional(),
      name: z.string().describe("The name of the layout.").optional(),
    }).describe(
      "The properties of Page are only relevant for pages with page_type LAYOUT.",
    ).optional(),
    masterProperties: z.object({
      displayName: z.string().describe("The human-readable name of the master.")
        .optional(),
    }).describe(
      "The properties of Page that are only relevant for pages with page_type MASTER.",
    ).optional(),
    notesProperties: z.object({
      speakerNotesObjectId: z.string().describe(
        "The object ID of the shape on this notes page that contains the speaker notes for the corresponding slide. The actual shape may not always exist on the notes page. Inserting text using this object ID will automatically create the shape. In this case, the actual shape may have different object ID. The `GetPresentation` or `GetPage` action will always return the latest object ID.",
      ).optional(),
    }).describe(
      "The properties of Page that are only relevant for pages with page_type NOTES.",
    ).optional(),
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
      }).describe(
        "A PageElement kind representing a joined collection of PageElements.",
      ).optional(),
      image: z.object({
        contentUrl: z.unknown().describe(
          "An URL to an image with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        imageProperties: z.unknown().describe("The properties of the Image.")
          .optional(),
        placeholder: z.unknown().describe(
          "The placeholder information that uniquely identifies a placeholder shape.",
        ).optional(),
        sourceUrl: z.unknown().describe(
          "The source URL is the URL used to insert the image. The source URL can be empty.",
        ).optional(),
      }).describe("A PageElement kind representing an image.").optional(),
      line: z.object({
        lineCategory: z.unknown().describe(
          "The category of the line. It matches the `category` specified in CreateLineRequest, and can be updated with UpdateLineCategoryRequest.",
        ).optional(),
        lineProperties: z.unknown().describe(
          "The properties of the Line. When unset, these fields default to values that match the appearance of new lines created in the Slides editor.",
        ).optional(),
        lineType: z.unknown().describe("The type of the line.").optional(),
      }).describe(
        "A PageElement kind representing a non-connector line, straight connector, curved connector, or bent connector.",
      ).optional(),
      objectId: z.string().describe(
        "The object ID for this page element. Object IDs used by google.apps.slides.v1.Page and google.apps.slides.v1.PageElement share the same namespace.",
      ).optional(),
      shape: z.object({
        placeholder: z.unknown().describe(
          "The placeholder information that uniquely identifies a placeholder shape.",
        ).optional(),
        shapeProperties: z.unknown().describe(
          "The properties of a Shape. If the shape is a placeholder shape as determined by the placeholder field, then these properties may be inherited from a parent placeholder shape. Determining the rendered value of the property depends on the corresponding property_state field value. Any text autofit settings on the shape are automatically deactivated by requests that can impact how text fits in the shape.",
        ).optional(),
        shapeType: z.unknown().describe("The type of the shape.").optional(),
        text: z.unknown().describe(
          "The general text content. The text must reside in a compatible shape (e.g. text box or rectangle) or a table cell in a page.",
        ).optional(),
      }).describe(
        "A PageElement kind representing a generic shape that doesn't have a more specific classification. For more information, see [Size and position page elements](https://developers.google.com/workspace/slides/api/guides/transform).",
      ).optional(),
      sheetsChart: z.object({
        chartId: z.unknown().describe(
          "The ID of the specific chart in the Google Sheets spreadsheet that is embedded.",
        ).optional(),
        contentUrl: z.unknown().describe(
          "The URL of an image of the embedded chart, with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change.",
        ).optional(),
        sheetsChartProperties: z.unknown().describe(
          "The properties of the SheetsChart.",
        ).optional(),
        spreadsheetId: z.unknown().describe(
          "The ID of the Google Sheets spreadsheet that contains the source chart.",
        ).optional(),
      }).describe(
        "A PageElement kind representing a linked chart embedded from Google Sheets.",
      ).optional(),
      size: z.object({
        height: z.unknown().describe(
          "A magnitude in a single direction in the specified units.",
        ).optional(),
        width: z.unknown().describe(
          "A magnitude in a single direction in the specified units.",
        ).optional(),
      }).describe("A width and height.").optional(),
      speakerSpotlight: z.object({
        speakerSpotlightProperties: z.unknown().describe(
          "The properties of the SpeakerSpotlight.",
        ).optional(),
      }).describe("A PageElement kind representing a Speaker Spotlight.")
        .optional(),
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
      }).describe("A PageElement kind representing a table.").optional(),
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
        "AffineTransform uses a 3x3 matrix with an implied last row of [ 0 0 1 ] to transform source coordinates (x,y) into destination coordinates (x', y') according to: x' x = shear_y scale_y translate_y 1 [ 1 ] After transformation, x' = scale_x * x + shear_x * y + translate_x; y' = scale_y * y + shear_y * x + translate_y; This message is therefore composed of these six matrix elements.",
      ).optional(),
      video: z.object({
        id: z.unknown().describe(
          "The video source's unique identifier for this video.",
        ).optional(),
        source: z.unknown().describe("The video source.").optional(),
        url: z.unknown().describe(
          "An URL to a video. The URL is valid as long as the source video exists and sharing settings do not change.",
        ).optional(),
        videoProperties: z.unknown().describe("The properties of the Video.")
          .optional(),
      }).describe("A PageElement kind representing a video.").optional(),
      wordArt: z.object({
        renderedText: z.unknown().describe("The text rendered as word art.")
          .optional(),
      }).describe("A PageElement kind representing word art.").optional(),
    })).describe("The page elements rendered on the page.").optional(),
    pageProperties: z.object({
      colorScheme: z.object({
        colors: z.array(z.unknown()).describe(
          "The ThemeColorType and corresponding concrete color pairs.",
        ).optional(),
      }).describe("The palette of predefined colors for a page.").optional(),
      pageBackgroundFill: z.object({
        propertyState: z.enum(["RENDERED", "NOT_RENDERED", "INHERIT"]).describe(
          "The background fill property state. Updating the fill on a page will implicitly update this field to `RENDERED`, unless another value is specified in the same request. To have no fill on a page, set this field to `NOT_RENDERED`. In this case, any other fill fields set in the same request will be ignored.",
        ).optional(),
        solidFill: z.object({
          alpha: z.unknown().describe(
            "The fraction of this `color` that should be applied to the pixel. That is, the final pixel color is defined by the equation: pixel color = alpha * (color) + (1.0 - alpha) * (background color) This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color.",
          ).optional(),
          color: z.unknown().describe("A themeable solid color value.")
            .optional(),
        }).describe(
          "A solid color fill. The page or page element is filled entirely with the specified color value. If any field is unset, its value may be inherited from a parent placeholder if it exists.",
        ).optional(),
        stretchedPictureFill: z.object({
          contentUrl: z.unknown().describe(
            "Reading the content_url: An URL to a picture with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the picture as the original requester. Access to the picture may be lost if the presentation's sharing settings change. Writing the content_url: The picture is fetched once at insertion time and a copy is stored for display inside the presentation. Pictures must be less than 50MB in size, cannot exceed 25 megapixels, and must be in one of PNG, JPEG, or GIF format. The provided URL can be at most 2 kB in length.",
          ).optional(),
          size: z.unknown().describe("A width and height.").optional(),
        }).describe(
          "The stretched picture fill. The page or page element is filled entirely with the specified picture. The picture is stretched to fit its container.",
        ).optional(),
      }).describe("The page background fill.").optional(),
    }).describe(
      "The properties of the Page. The page will inherit properties from the parent page. Depending on the page type the hierarchy is defined in either SlideProperties or LayoutProperties.",
    ).optional(),
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
    }).describe(
      "The properties of Page that are only relevant for pages with page_type SLIDE.",
    ).optional(),
  })).describe(
    "The slides in the presentation. A slide inherits properties from a slide layout.",
  ).optional(),
  title: z.string().describe("The title of the presentation.").optional(),
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

/** Swamp extension model for Google Cloud Google Slides Presentations. Registered at `@swamp/gcp/slides/presentations`. */
export const model = {
  type: "@swamp/gcp/slides/presentations",
  version: "2026.06.07.1",
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
          BASE_URL,
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["presentationId"] = args.identifier;
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
    sync: {
      description: "Sync presentations state from GCP",
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
          params["presentationId"] = identifier;
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
    batch_update: {
      description: "batch update",
      arguments: z.object({
        requests: z.any().optional(),
        writeControl: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
          BASE_URL,
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
