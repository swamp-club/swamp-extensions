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

// Auto-generated extension model for @swamp/gcp/docs/documents
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Docs Documents.
 *
 * A Google Docs document.
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

const BASE_URL = "https://docs.googleapis.com/";

const GET_CONFIG = {
  "id": "docs.documents.get",
  "path": "v1/documents/{documentId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "documentId",
  ],
  "parameters": {
    "documentId": {
      "location": "path",
      "required": true,
    },
    "includeTabsContent": {
      "location": "query",
    },
    "suggestionsViewMode": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "docs.documents.create",
  "path": "v1/documents",
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
  body: z.object({
    content: z.array(z.object({
      endIndex: z.number().int().describe(
        "The zero-based end index of this structural element, exclusive, in UTF-16 code units.",
      ).optional(),
      paragraph: z.object({
        bullet: z.object({
          listId: z.unknown().describe(
            "The ID of the list this paragraph belongs to.",
          ).optional(),
          nestingLevel: z.unknown().describe(
            "The nesting level of this paragraph in the list.",
          ).optional(),
          textStyle: z.unknown().describe(
            "Represents the styling that can be applied to text. Inherited text styles are represented as unset fields in this message. A text style's parent depends on where the text style is defined: * The TextStyle of text in a Paragraph inherits from the paragraph's corresponding named style type. * The TextStyle on a named style inherits from the normal text named style. * The TextStyle of the normal text named style inherits from the default text style in the Docs editor. * The TextStyle on a Paragraph element that's contained in a table may inherit its text style from the table style. If the text style does not inherit from a parent, unsetting fields will revert the style to a value matching the defaults in the Docs editor.",
          ).optional(),
        }).describe("Describes the bullet of a paragraph.").optional(),
        elements: z.array(z.unknown()).describe(
          "The content of the paragraph, broken down into its component parts.",
        ).optional(),
        paragraphStyle: z.object({
          alignment: z.unknown().describe(
            "The text alignment for this paragraph.",
          ).optional(),
          avoidWidowAndOrphan: z.unknown().describe(
            "Whether to avoid widows and orphans for the paragraph. If unset, the value is inherited from the parent.",
          ).optional(),
          borderBetween: z.unknown().describe("A border around a paragraph.")
            .optional(),
          borderBottom: z.unknown().describe("A border around a paragraph.")
            .optional(),
          borderLeft: z.unknown().describe("A border around a paragraph.")
            .optional(),
          borderRight: z.unknown().describe("A border around a paragraph.")
            .optional(),
          borderTop: z.unknown().describe("A border around a paragraph.")
            .optional(),
          direction: z.unknown().describe(
            "The text direction of this paragraph. If unset, the value defaults to LEFT_TO_RIGHT since paragraph direction is not inherited.",
          ).optional(),
          headingId: z.unknown().describe(
            "The heading ID of the paragraph. If empty, then this paragraph is not a heading. This property is read-only.",
          ).optional(),
          indentEnd: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          indentFirstLine: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          indentStart: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          keepLinesTogether: z.unknown().describe(
            "Whether all lines of the paragraph should be laid out on the same page or column if possible. If unset, the value is inherited from the parent.",
          ).optional(),
          keepWithNext: z.unknown().describe(
            "Whether at least a part of this paragraph should be laid out on the same page or column as the next paragraph if possible. If unset, the value is inherited from the parent.",
          ).optional(),
          lineSpacing: z.unknown().describe(
            "The amount of space between lines, as a percentage of normal, where normal is represented as 100.0. If unset, the value is inherited from the parent.",
          ).optional(),
          namedStyleType: z.unknown().describe(
            "The named style type of the paragraph. Since updating the named style type affects other properties within ParagraphStyle, the named style type is applied before the other properties are updated.",
          ).optional(),
          pageBreakBefore: z.unknown().describe(
            "Whether the current paragraph should always start at the beginning of a page. If unset, the value is inherited from the parent. Attempting to update page_break_before for paragraphs in unsupported regions, including Table, Header, Footer and Footnote, can result in an invalid document state that returns a 400 bad request error.",
          ).optional(),
          shading: z.unknown().describe("The shading of a paragraph.")
            .optional(),
          spaceAbove: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          spaceBelow: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          spacingMode: z.unknown().describe(
            "The spacing mode for the paragraph.",
          ).optional(),
          tabStops: z.unknown().describe(
            "A list of the tab stops for this paragraph. The list of tab stops is not inherited. This property is read-only.",
          ).optional(),
        }).describe(
          "Styles that apply to a whole paragraph. Inherited paragraph styles are represented as unset fields in this message. A paragraph style's parent depends on where the paragraph style is defined: * The ParagraphStyle on a Paragraph inherits from the paragraph's corresponding named style type. * The ParagraphStyle on a named style inherits from the normal text named style. * The ParagraphStyle of the normal text named style inherits from the default paragraph style in the Docs editor. * The ParagraphStyle on a Paragraph element that's contained in a table may inherit its paragraph style from the table style. If the paragraph style does not inherit from a parent, unsetting fields will revert the style to a value matching the defaults in the Docs editor.",
        ).optional(),
        positionedObjectIds: z.array(z.unknown()).describe(
          "The IDs of the positioned objects tethered to this paragraph.",
        ).optional(),
        suggestedBulletChanges: z.record(z.string(), z.unknown()).describe(
          "The suggested changes to this paragraph's bullet.",
        ).optional(),
        suggestedParagraphStyleChanges: z.record(z.string(), z.unknown())
          .describe(
            "The suggested paragraph style changes to this paragraph, keyed by suggestion ID.",
          ).optional(),
        suggestedPositionedObjectIds: z.record(z.string(), z.unknown())
          .describe(
            "The IDs of the positioned objects suggested to be attached to this paragraph, keyed by suggestion ID.",
          ).optional(),
      }).describe(
        "A StructuralElement representing a paragraph. A paragraph is a range of content that's terminated with a newline character.",
      ).optional(),
      sectionBreak: z.object({
        sectionStyle: z.object({
          columnProperties: z.unknown().describe(
            "The section's columns properties. If empty, the section contains one column with the default properties in the Docs editor. A section can be updated to have no more than 3 columns. When updating this property, setting a concrete value is required. Unsetting this property will result in a 400 bad request error.",
          ).optional(),
          columnSeparatorStyle: z.unknown().describe(
            "The style of column separators. This style can be set even when there's one column in the section. When updating this property, setting a concrete value is required. Unsetting this property results in a 400 bad request error.",
          ).optional(),
          contentDirection: z.unknown().describe(
            "The content direction of this section. If unset, the value defaults to LEFT_TO_RIGHT. When updating this property, setting a concrete value is required. Unsetting this property results in a 400 bad request error.",
          ).optional(),
          defaultFooterId: z.unknown().describe(
            "The ID of the default footer. If unset, the value inherits from the previous SectionBreak's SectionStyle. If the value is unset in the first SectionBreak, it inherits from DocumentStyle's default_footer_id. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
          ).optional(),
          defaultHeaderId: z.unknown().describe(
            "The ID of the default header. If unset, the value inherits from the previous SectionBreak's SectionStyle. If the value is unset in the first SectionBreak, it inherits from DocumentStyle's default_header_id. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
          ).optional(),
          evenPageFooterId: z.unknown().describe(
            "The ID of the footer used only for even pages. If the value of DocumentStyle's use_even_page_header_footer is true, this value is used for the footers on even pages in the section. If it is false, the footers on even pages use the default_footer_id. If unset, the value inherits from the previous SectionBreak's SectionStyle. If the value is unset in the first SectionBreak, it inherits from DocumentStyle's even_page_footer_id. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
          ).optional(),
          evenPageHeaderId: z.unknown().describe(
            "The ID of the header used only for even pages. If the value of DocumentStyle's use_even_page_header_footer is true, this value is used for the headers on even pages in the section. If it is false, the headers on even pages use the default_header_id. If unset, the value inherits from the previous SectionBreak's SectionStyle. If the value is unset in the first SectionBreak, it inherits from DocumentStyle's even_page_header_id. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
          ).optional(),
          firstPageFooterId: z.unknown().describe(
            "The ID of the footer used only for the first page of the section. If use_first_page_header_footer is true, this value is used for the footer on the first page of the section. If it's false, the footer on the first page of the section uses the default_footer_id. If unset, the value inherits from the previous SectionBreak's SectionStyle. If the value is unset in the first SectionBreak, it inherits from DocumentStyle's first_page_footer_id. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
          ).optional(),
          firstPageHeaderId: z.unknown().describe(
            "The ID of the header used only for the first page of the section. If use_first_page_header_footer is true, this value is used for the header on the first page of the section. If it's false, the header on the first page of the section uses the default_header_id. If unset, the value inherits from the previous SectionBreak's SectionStyle. If the value is unset in the first SectionBreak, it inherits from DocumentStyle's first_page_header_id. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
          ).optional(),
          flipPageOrientation: z.unknown().describe(
            "Optional. Indicates whether to flip the dimensions of DocumentStyle's page_size for this section, which allows changing the page orientation between portrait and landscape. If unset, the value inherits from DocumentStyle's flip_page_orientation. If DocumentMode is PAGELESS, this property will not be rendered. When updating this property, setting a concrete value is required. Unsetting this property results in a 400 bad request error.",
          ).optional(),
          marginBottom: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          marginFooter: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          marginHeader: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          marginLeft: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          marginRight: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          marginTop: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          pageNumberStart: z.unknown().describe(
            "The page number from which to start counting the number of pages for this section. If unset, page numbering continues from the previous section. If the value is unset in the first SectionBreak, refer to DocumentStyle's page_number_start. If DocumentMode is PAGELESS, this property will not be rendered. When updating this property, setting a concrete value is required. Unsetting this property results in a 400 bad request error.",
          ).optional(),
          sectionType: z.unknown().describe("Output only. The type of section.")
            .optional(),
          useFirstPageHeaderFooter: z.unknown().describe(
            "Indicates whether to use the first page header / footer IDs for the first page of the section. If unset, it inherits from DocumentStyle's use_first_page_header_footer for the first section. If the value is unset for subsequent sectors, it should be interpreted as false. If DocumentMode is PAGELESS, this property will not be rendered. When updating this property, setting a concrete value is required. Unsetting this property results in a 400 bad request error.",
          ).optional(),
        }).describe("The styling that applies to a section.").optional(),
        suggestedDeletionIds: z.array(z.unknown()).describe(
          "The suggested deletion IDs. If empty, then there are no suggested deletions of this content.",
        ).optional(),
        suggestedInsertionIds: z.array(z.unknown()).describe(
          "The suggested insertion IDs. A SectionBreak may have multiple insertion IDs if it's a nested suggested change. If empty, then this is not a suggested insertion.",
        ).optional(),
      }).describe(
        "A StructuralElement representing a section break. A section is a range of content that has the same SectionStyle. A section break represents the start of a new section, and the section style applies to the section after the section break. The document body always begins with a section break.",
      ).optional(),
      startIndex: z.number().int().describe(
        "The zero-based start index of this structural element, in UTF-16 code units.",
      ).optional(),
      table: z.object({
        columns: z.number().int().describe(
          "Number of columns in the table. It's possible for a table to be non-rectangular, so some rows may have a different number of cells.",
        ).optional(),
        rows: z.number().int().describe("Number of rows in the table.")
          .optional(),
        suggestedDeletionIds: z.array(z.unknown()).describe(
          "The suggested deletion IDs. If empty, then there are no suggested deletions of this content.",
        ).optional(),
        suggestedInsertionIds: z.array(z.unknown()).describe(
          "The suggested insertion IDs. A Table may have multiple insertion IDs if it's a nested suggested change. If empty, then this is not a suggested insertion.",
        ).optional(),
        tableRows: z.array(z.unknown()).describe(
          "The contents and style of each row.",
        ).optional(),
        tableStyle: z.object({
          tableColumnProperties: z.unknown().describe(
            "The properties of each column. Note that in Docs, tables contain rows and rows contain cells, similar to HTML. So the properties for a row can be found on the row's table_row_style.",
          ).optional(),
        }).describe("Styles that apply to a table.").optional(),
      }).describe("A StructuralElement representing a table.").optional(),
      tableOfContents: z.object({
        content: z.array(z.unknown()).describe(
          "The content of the table of contents.",
        ).optional(),
        suggestedDeletionIds: z.array(z.unknown()).describe(
          "The suggested deletion IDs. If empty, then there are no suggested deletions of this content.",
        ).optional(),
        suggestedInsertionIds: z.array(z.unknown()).describe(
          "The suggested insertion IDs. A TableOfContents may have multiple insertion IDs if it is a nested suggested change. If empty, then this is not a suggested insertion.",
        ).optional(),
      }).describe("A StructuralElement representing a table of contents.")
        .optional(),
    })).describe(
      "The contents of the body. The indexes for the body's content begin at zero.",
    ).optional(),
  }).describe(
    "The document body. The body typically contains the full document contents except for headers, footers, and footnotes.",
  ).optional(),
  documentStyle: z.object({
    background: z.object({
      color: z.object({
        color: z.object({
          rgbColor: z.object({
            blue: z.unknown().describe(
              "The blue component of the color, from 0.0 to 1.0.",
            ).optional(),
            green: z.unknown().describe(
              "The green component of the color, from 0.0 to 1.0.",
            ).optional(),
            red: z.unknown().describe(
              "The red component of the color, from 0.0 to 1.0.",
            ).optional(),
          }).describe("An RGB color.").optional(),
        }).describe("A solid color.").optional(),
      }).describe(
        "A color that can either be fully opaque or fully transparent.",
      ).optional(),
    }).describe("Represents the background of a document.").optional(),
    defaultFooterId: z.string().describe(
      "The ID of the default footer. If not set, there's no default footer. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
    ).optional(),
    defaultHeaderId: z.string().describe(
      "The ID of the default header. If not set, there's no default header. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
    ).optional(),
    documentFormat: z.object({
      documentMode: z.enum(["DOCUMENT_MODE_UNSPECIFIED", "PAGES", "PAGELESS"])
        .describe("Whether the document has pages or is pageless.").optional(),
    }).describe("Represents document-level format settings.").optional(),
    evenPageFooterId: z.string().describe(
      "The ID of the footer used only for even pages. The value of use_even_page_header_footer determines whether to use the default_footer_id or this value for the footer on even pages. If not set, there's no even page footer. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
    ).optional(),
    evenPageHeaderId: z.string().describe(
      "The ID of the header used only for even pages. The value of use_even_page_header_footer determines whether to use the default_header_id or this value for the header on even pages. If not set, there's no even page header. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
    ).optional(),
    firstPageFooterId: z.string().describe(
      "The ID of the footer used only for the first page. If not set then a unique footer for the first page does not exist. The value of use_first_page_header_footer determines whether to use the default_footer_id or this value for the footer on the first page. If not set, there's no first page footer. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
    ).optional(),
    firstPageHeaderId: z.string().describe(
      "The ID of the header used only for the first page. If not set then a unique header for the first page does not exist. The value of use_first_page_header_footer determines whether to use the default_header_id or this value for the header on the first page. If not set, there's no first page header. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
    ).optional(),
    flipPageOrientation: z.boolean().describe(
      "Optional. Indicates whether to flip the dimensions of the page_size, which allows changing the page orientation between portrait and landscape. If DocumentMode is PAGELESS, this property will not be rendered.",
    ).optional(),
    marginBottom: z.object({
      magnitude: z.number().describe("The magnitude.").optional(),
      unit: z.enum(["UNIT_UNSPECIFIED", "PT"]).describe(
        "The units for magnitude.",
      ).optional(),
    }).describe("A magnitude in a single direction in the specified units.")
      .optional(),
    marginFooter: z.object({
      magnitude: z.number().describe("The magnitude.").optional(),
      unit: z.enum(["UNIT_UNSPECIFIED", "PT"]).describe(
        "The units for magnitude.",
      ).optional(),
    }).describe("A magnitude in a single direction in the specified units.")
      .optional(),
    marginHeader: z.object({
      magnitude: z.number().describe("The magnitude.").optional(),
      unit: z.enum(["UNIT_UNSPECIFIED", "PT"]).describe(
        "The units for magnitude.",
      ).optional(),
    }).describe("A magnitude in a single direction in the specified units.")
      .optional(),
    marginLeft: z.object({
      magnitude: z.number().describe("The magnitude.").optional(),
      unit: z.enum(["UNIT_UNSPECIFIED", "PT"]).describe(
        "The units for magnitude.",
      ).optional(),
    }).describe("A magnitude in a single direction in the specified units.")
      .optional(),
    marginRight: z.object({
      magnitude: z.number().describe("The magnitude.").optional(),
      unit: z.enum(["UNIT_UNSPECIFIED", "PT"]).describe(
        "The units for magnitude.",
      ).optional(),
    }).describe("A magnitude in a single direction in the specified units.")
      .optional(),
    marginTop: z.object({
      magnitude: z.number().describe("The magnitude.").optional(),
      unit: z.enum(["UNIT_UNSPECIFIED", "PT"]).describe(
        "The units for magnitude.",
      ).optional(),
    }).describe("A magnitude in a single direction in the specified units.")
      .optional(),
    pageNumberStart: z.number().int().describe(
      "The page number from which to start counting the number of pages. If DocumentMode is PAGELESS, this property will not be rendered.",
    ).optional(),
    pageSize: z.object({
      height: z.object({
        magnitude: z.number().describe("The magnitude.").optional(),
        unit: z.enum(["UNIT_UNSPECIFIED", "PT"]).describe(
          "The units for magnitude.",
        ).optional(),
      }).describe("A magnitude in a single direction in the specified units.")
        .optional(),
      width: z.object({
        magnitude: z.number().describe("The magnitude.").optional(),
        unit: z.enum(["UNIT_UNSPECIFIED", "PT"]).describe(
          "The units for magnitude.",
        ).optional(),
      }).describe("A magnitude in a single direction in the specified units.")
        .optional(),
    }).describe("A width and height.").optional(),
    useCustomHeaderFooterMargins: z.boolean().describe(
      "Indicates whether DocumentStyle margin_header, SectionStyle margin_header and DocumentStyle margin_footer, SectionStyle margin_footer are respected. When false, the default values in the Docs editor for header and footer margin is used. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
    ).optional(),
    useEvenPageHeaderFooter: z.boolean().describe(
      "Indicates whether to use the even page header / footer IDs for the even pages. If DocumentMode is PAGELESS, this property will not be rendered.",
    ).optional(),
    useFirstPageHeaderFooter: z.boolean().describe(
      "Indicates whether to use the first page header / footer IDs for the first page. If DocumentMode is PAGELESS, this property will not be rendered.",
    ).optional(),
  }).describe("The style of the document.").optional(),
  namedStyles: z.object({
    styles: z.array(z.object({
      namedStyleType: z.enum([
        "NAMED_STYLE_TYPE_UNSPECIFIED",
        "NORMAL_TEXT",
        "TITLE",
        "SUBTITLE",
        "HEADING_1",
        "HEADING_2",
        "HEADING_3",
        "HEADING_4",
        "HEADING_5",
        "HEADING_6",
      ]).describe("The type of this named style.").optional(),
      paragraphStyle: z.object({
        alignment: z.enum([
          "ALIGNMENT_UNSPECIFIED",
          "START",
          "CENTER",
          "END",
          "JUSTIFIED",
        ]).describe("The text alignment for this paragraph.").optional(),
        avoidWidowAndOrphan: z.boolean().describe(
          "Whether to avoid widows and orphans for the paragraph. If unset, the value is inherited from the parent.",
        ).optional(),
        borderBetween: z.object({
          color: z.unknown().describe(
            "A color that can either be fully opaque or fully transparent.",
          ).optional(),
          dashStyle: z.unknown().describe("The dash style of the border.")
            .optional(),
          padding: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          width: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
        }).describe("A border around a paragraph.").optional(),
        borderBottom: z.object({
          color: z.unknown().describe(
            "A color that can either be fully opaque or fully transparent.",
          ).optional(),
          dashStyle: z.unknown().describe("The dash style of the border.")
            .optional(),
          padding: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          width: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
        }).describe("A border around a paragraph.").optional(),
        borderLeft: z.object({
          color: z.unknown().describe(
            "A color that can either be fully opaque or fully transparent.",
          ).optional(),
          dashStyle: z.unknown().describe("The dash style of the border.")
            .optional(),
          padding: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          width: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
        }).describe("A border around a paragraph.").optional(),
        borderRight: z.object({
          color: z.unknown().describe(
            "A color that can either be fully opaque or fully transparent.",
          ).optional(),
          dashStyle: z.unknown().describe("The dash style of the border.")
            .optional(),
          padding: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          width: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
        }).describe("A border around a paragraph.").optional(),
        borderTop: z.object({
          color: z.unknown().describe(
            "A color that can either be fully opaque or fully transparent.",
          ).optional(),
          dashStyle: z.unknown().describe("The dash style of the border.")
            .optional(),
          padding: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          width: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
        }).describe("A border around a paragraph.").optional(),
        direction: z.enum([
          "CONTENT_DIRECTION_UNSPECIFIED",
          "LEFT_TO_RIGHT",
          "RIGHT_TO_LEFT",
        ]).describe(
          "The text direction of this paragraph. If unset, the value defaults to LEFT_TO_RIGHT since paragraph direction is not inherited.",
        ).optional(),
        headingId: z.string().describe(
          "The heading ID of the paragraph. If empty, then this paragraph is not a heading. This property is read-only.",
        ).optional(),
        indentEnd: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("A magnitude in a single direction in the specified units.")
          .optional(),
        indentFirstLine: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("A magnitude in a single direction in the specified units.")
          .optional(),
        indentStart: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("A magnitude in a single direction in the specified units.")
          .optional(),
        keepLinesTogether: z.boolean().describe(
          "Whether all lines of the paragraph should be laid out on the same page or column if possible. If unset, the value is inherited from the parent.",
        ).optional(),
        keepWithNext: z.boolean().describe(
          "Whether at least a part of this paragraph should be laid out on the same page or column as the next paragraph if possible. If unset, the value is inherited from the parent.",
        ).optional(),
        lineSpacing: z.number().describe(
          "The amount of space between lines, as a percentage of normal, where normal is represented as 100.0. If unset, the value is inherited from the parent.",
        ).optional(),
        namedStyleType: z.enum([
          "NAMED_STYLE_TYPE_UNSPECIFIED",
          "NORMAL_TEXT",
          "TITLE",
          "SUBTITLE",
          "HEADING_1",
          "HEADING_2",
          "HEADING_3",
          "HEADING_4",
          "HEADING_5",
          "HEADING_6",
        ]).describe(
          "The named style type of the paragraph. Since updating the named style type affects other properties within ParagraphStyle, the named style type is applied before the other properties are updated.",
        ).optional(),
        pageBreakBefore: z.boolean().describe(
          "Whether the current paragraph should always start at the beginning of a page. If unset, the value is inherited from the parent. Attempting to update page_break_before for paragraphs in unsupported regions, including Table, Header, Footer and Footnote, can result in an invalid document state that returns a 400 bad request error.",
        ).optional(),
        shading: z.object({
          backgroundColor: z.unknown().describe(
            "A color that can either be fully opaque or fully transparent.",
          ).optional(),
        }).describe("The shading of a paragraph.").optional(),
        spaceAbove: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("A magnitude in a single direction in the specified units.")
          .optional(),
        spaceBelow: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("A magnitude in a single direction in the specified units.")
          .optional(),
        spacingMode: z.enum([
          "SPACING_MODE_UNSPECIFIED",
          "NEVER_COLLAPSE",
          "COLLAPSE_LISTS",
        ]).describe("The spacing mode for the paragraph.").optional(),
        tabStops: z.array(z.unknown()).describe(
          "A list of the tab stops for this paragraph. The list of tab stops is not inherited. This property is read-only.",
        ).optional(),
      }).describe(
        "Styles that apply to a whole paragraph. Inherited paragraph styles are represented as unset fields in this message. A paragraph style's parent depends on where the paragraph style is defined: * The ParagraphStyle on a Paragraph inherits from the paragraph's corresponding named style type. * The ParagraphStyle on a named style inherits from the normal text named style. * The ParagraphStyle of the normal text named style inherits from the default paragraph style in the Docs editor. * The ParagraphStyle on a Paragraph element that's contained in a table may inherit its paragraph style from the table style. If the paragraph style does not inherit from a parent, unsetting fields will revert the style to a value matching the defaults in the Docs editor.",
      ).optional(),
      textStyle: z.object({
        backgroundColor: z.object({
          color: z.unknown().describe("A solid color.").optional(),
        }).describe(
          "A color that can either be fully opaque or fully transparent.",
        ).optional(),
        baselineOffset: z.enum([
          "BASELINE_OFFSET_UNSPECIFIED",
          "NONE",
          "SUPERSCRIPT",
          "SUBSCRIPT",
        ]).describe(
          "The text's vertical offset from its normal position. Text with `SUPERSCRIPT` or `SUBSCRIPT` baseline offsets is automatically rendered in a smaller font size, computed based on the `font_size` field. Changes in this field don't affect the `font_size`.",
        ).optional(),
        bold: z.boolean().describe(
          "Whether or not the text is rendered as bold.",
        ).optional(),
        fontSize: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("A magnitude in a single direction in the specified units.")
          .optional(),
        foregroundColor: z.object({
          color: z.unknown().describe("A solid color.").optional(),
        }).describe(
          "A color that can either be fully opaque or fully transparent.",
        ).optional(),
        italic: z.boolean().describe("Whether or not the text is italicized.")
          .optional(),
        link: z.object({
          bookmark: z.unknown().describe(
            "A reference to a bookmark in this document.",
          ).optional(),
          bookmarkId: z.unknown().describe(
            "The ID of a bookmark in this document. Legacy field: Instead, set includeTabsContent to `true` and use Link.bookmark for read and write operations. This field is only returned when includeTabsContent is set to `false` in documents containing a single tab and links to a bookmark within the singular tab. Otherwise, Link.bookmark is returned. If this field is used in a write request, the bookmark is considered to be from the tab ID specified in the request. If a tab ID is not specified in the request, it is considered to be from the first tab in the document.",
          ).optional(),
          heading: z.unknown().describe(
            "A reference to a heading in this document.",
          ).optional(),
          headingId: z.unknown().describe(
            "The ID of a heading in this document. Legacy field: Instead, set includeTabsContent to `true` and use Link.heading for read and write operations. This field is only returned when includeTabsContent is set to `false` in documents containing a single tab and links to a heading within the singular tab. Otherwise, Link.heading is returned. If this field is used in a write request, the heading is considered to be from the tab ID specified in the request. If a tab ID is not specified in the request, it is considered to be from the first tab in the document.",
          ).optional(),
          tabId: z.unknown().describe("The ID of a tab in this document.")
            .optional(),
          url: z.unknown().describe("An external URL.").optional(),
        }).describe(
          "A reference to another portion of a document or an external URL resource.",
        ).optional(),
        smallCaps: z.boolean().describe(
          "Whether or not the text is in small capital letters.",
        ).optional(),
        strikethrough: z.boolean().describe(
          "Whether or not the text is struck through.",
        ).optional(),
        underline: z.boolean().describe(
          "Whether or not the text is underlined.",
        ).optional(),
        weightedFontFamily: z.object({
          fontFamily: z.unknown().describe(
            "The font family of the text. The font family can be any font from the Font menu in Docs or from [Google Fonts] (https://fonts.google.com/). If the font name is unrecognized, the text is rendered in `Arial`.",
          ).optional(),
          weight: z.unknown().describe(
            "The weight of the font. This field can have any value that's a multiple of `100` between `100` and `900`, inclusive. This range corresponds to the numerical values described in the CSS 2.1 Specification, [section 15.6](https://www.w3.org/TR/CSS21/fonts.html#font-boldness), with non-numerical values disallowed. The default value is `400` (\"normal\"). The font weight makes up just one component of the rendered font weight. A combination of the `weight` and the text style's resolved `bold` value determine the rendered weight, after accounting for inheritance: * If the text is bold and the weight is less than `400`, the rendered weight is 400. * If the text is bold and the weight is greater than or equal to `400` but is less than `700`, the rendered weight is `700`. * If the weight is greater than or equal to `700`, the rendered weight is equal to the weight. * If the text is not bold, the rendered weight is equal to the weight.",
          ).optional(),
        }).describe("Represents a font family and weight of text.").optional(),
      }).describe(
        "Represents the styling that can be applied to text. Inherited text styles are represented as unset fields in this message. A text style's parent depends on where the text style is defined: * The TextStyle of text in a Paragraph inherits from the paragraph's corresponding named style type. * The TextStyle on a named style inherits from the normal text named style. * The TextStyle of the normal text named style inherits from the default text style in the Docs editor. * The TextStyle on a Paragraph element that's contained in a table may inherit its text style from the table style. If the text style does not inherit from a parent, unsetting fields will revert the style to a value matching the defaults in the Docs editor.",
      ).optional(),
    })).describe(
      "The named styles. There's an entry for each of the possible named style types.",
    ).optional(),
  }).describe(
    "The named styles. Paragraphs in the document can inherit their TextStyle and ParagraphStyle from these named styles.",
  ).optional(),
  tabs: z.array(z.object({
    childTabs: z.array(z.record(z.string(), z.unknown())).describe(
      "The child tabs nested within this tab.",
    ).optional(),
    documentTab: z.object({
      body: z.object({
        content: z.array(z.unknown()).describe(
          "The contents of the body. The indexes for the body's content begin at zero.",
        ).optional(),
      }).describe(
        "The document body. The body typically contains the full document contents except for headers, footers, and footnotes.",
      ).optional(),
      documentStyle: z.object({
        background: z.object({
          color: z.unknown().describe(
            "A color that can either be fully opaque or fully transparent.",
          ).optional(),
        }).describe("Represents the background of a document.").optional(),
        defaultFooterId: z.string().describe(
          "The ID of the default footer. If not set, there's no default footer. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
        ).optional(),
        defaultHeaderId: z.string().describe(
          "The ID of the default header. If not set, there's no default header. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
        ).optional(),
        documentFormat: z.object({
          documentMode: z.unknown().describe(
            "Whether the document has pages or is pageless.",
          ).optional(),
        }).describe("Represents document-level format settings.").optional(),
        evenPageFooterId: z.string().describe(
          "The ID of the footer used only for even pages. The value of use_even_page_header_footer determines whether to use the default_footer_id or this value for the footer on even pages. If not set, there's no even page footer. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
        ).optional(),
        evenPageHeaderId: z.string().describe(
          "The ID of the header used only for even pages. The value of use_even_page_header_footer determines whether to use the default_header_id or this value for the header on even pages. If not set, there's no even page header. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
        ).optional(),
        firstPageFooterId: z.string().describe(
          "The ID of the footer used only for the first page. If not set then a unique footer for the first page does not exist. The value of use_first_page_header_footer determines whether to use the default_footer_id or this value for the footer on the first page. If not set, there's no first page footer. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
        ).optional(),
        firstPageHeaderId: z.string().describe(
          "The ID of the header used only for the first page. If not set then a unique header for the first page does not exist. The value of use_first_page_header_footer determines whether to use the default_header_id or this value for the header on the first page. If not set, there's no first page header. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
        ).optional(),
        flipPageOrientation: z.boolean().describe(
          "Optional. Indicates whether to flip the dimensions of the page_size, which allows changing the page orientation between portrait and landscape. If DocumentMode is PAGELESS, this property will not be rendered.",
        ).optional(),
        marginBottom: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("A magnitude in a single direction in the specified units.")
          .optional(),
        marginFooter: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("A magnitude in a single direction in the specified units.")
          .optional(),
        marginHeader: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("A magnitude in a single direction in the specified units.")
          .optional(),
        marginLeft: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("A magnitude in a single direction in the specified units.")
          .optional(),
        marginRight: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("A magnitude in a single direction in the specified units.")
          .optional(),
        marginTop: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("A magnitude in a single direction in the specified units.")
          .optional(),
        pageNumberStart: z.number().int().describe(
          "The page number from which to start counting the number of pages. If DocumentMode is PAGELESS, this property will not be rendered.",
        ).optional(),
        pageSize: z.object({
          height: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          width: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
        }).describe("A width and height.").optional(),
        useCustomHeaderFooterMargins: z.boolean().describe(
          "Indicates whether DocumentStyle margin_header, SectionStyle margin_header and DocumentStyle margin_footer, SectionStyle margin_footer are respected. When false, the default values in the Docs editor for header and footer margin is used. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
        ).optional(),
        useEvenPageHeaderFooter: z.boolean().describe(
          "Indicates whether to use the even page header / footer IDs for the even pages. If DocumentMode is PAGELESS, this property will not be rendered.",
        ).optional(),
        useFirstPageHeaderFooter: z.boolean().describe(
          "Indicates whether to use the first page header / footer IDs for the first page. If DocumentMode is PAGELESS, this property will not be rendered.",
        ).optional(),
      }).describe("The style of the document.").optional(),
      footers: z.record(
        z.string(),
        z.object({
          content: z.unknown().describe(
            "The contents of the footer. The indexes for a footer's content begin at zero.",
          ).optional(),
          footerId: z.unknown().describe("The ID of the footer.").optional(),
        }),
      ).describe("The footers in the document tab, keyed by footer ID.")
        .optional(),
      footnotes: z.record(
        z.string(),
        z.object({
          content: z.unknown().describe(
            "The contents of the footnote. The indexes for a footnote's content begin at zero.",
          ).optional(),
          footnoteId: z.unknown().describe("The ID of the footnote.")
            .optional(),
        }),
      ).describe("The footnotes in the document tab, keyed by footnote ID.")
        .optional(),
      headers: z.record(
        z.string(),
        z.object({
          content: z.unknown().describe(
            "The contents of the header. The indexes for a header's content begin at zero.",
          ).optional(),
          headerId: z.unknown().describe("The ID of the header.").optional(),
        }),
      ).describe("The headers in the document tab, keyed by header ID.")
        .optional(),
      inlineObjects: z.record(
        z.string(),
        z.object({
          inlineObjectProperties: z.unknown().describe(
            "Properties of an InlineObject.",
          ).optional(),
          objectId: z.unknown().describe(
            "The ID of this inline object. Can be used to update an object’s properties.",
          ).optional(),
          suggestedDeletionIds: z.unknown().describe(
            "The suggested deletion IDs. If empty, then there are no suggested deletions of this content.",
          ).optional(),
          suggestedInlineObjectPropertiesChanges: z.unknown().describe(
            "The suggested changes to the inline object properties, keyed by suggestion ID.",
          ).optional(),
          suggestedInsertionId: z.unknown().describe(
            "The suggested insertion ID. If empty, then this is not a suggested insertion.",
          ).optional(),
        }),
      ).describe("The inline objects in the document tab, keyed by object ID.")
        .optional(),
      lists: z.record(
        z.string(),
        z.object({
          listProperties: z.unknown().describe(
            "The properties of a list that describe the look and feel of bullets belonging to paragraphs associated with a list.",
          ).optional(),
          suggestedDeletionIds: z.unknown().describe(
            "The suggested deletion IDs. If empty, then there are no suggested deletions of this list.",
          ).optional(),
          suggestedInsertionId: z.unknown().describe(
            "The suggested insertion ID. If empty, then this is not a suggested insertion.",
          ).optional(),
          suggestedListPropertiesChanges: z.unknown().describe(
            "The suggested changes to the list properties, keyed by suggestion ID.",
          ).optional(),
        }),
      ).describe("The lists in the document tab, keyed by list ID.").optional(),
      namedRanges: z.record(
        z.string(),
        z.object({
          name: z.unknown().describe(
            "The name that all the named ranges share.",
          ).optional(),
          namedRanges: z.unknown().describe(
            "The NamedRanges that share the same name.",
          ).optional(),
        }),
      ).describe("The named ranges in the document tab, keyed by name.")
        .optional(),
      namedStyles: z.object({
        styles: z.array(z.unknown()).describe(
          "The named styles. There's an entry for each of the possible named style types.",
        ).optional(),
      }).describe(
        "The named styles. Paragraphs in the document can inherit their TextStyle and ParagraphStyle from these named styles.",
      ).optional(),
      positionedObjects: z.record(
        z.string(),
        z.object({
          objectId: z.unknown().describe("The ID of this positioned object.")
            .optional(),
          positionedObjectProperties: z.unknown().describe(
            "Properties of a PositionedObject.",
          ).optional(),
          suggestedDeletionIds: z.unknown().describe(
            "The suggested deletion IDs. If empty, then there are no suggested deletions of this content.",
          ).optional(),
          suggestedInsertionId: z.unknown().describe(
            "The suggested insertion ID. If empty, then this is not a suggested insertion.",
          ).optional(),
          suggestedPositionedObjectPropertiesChanges: z.unknown().describe(
            "The suggested changes to the positioned object properties, keyed by suggestion ID.",
          ).optional(),
        }),
      ).describe(
        "The positioned objects in the document tab, keyed by object ID.",
      ).optional(),
      suggestedDocumentStyleChanges: z.record(
        z.string(),
        z.object({
          documentStyle: z.unknown().describe("The style of the document.")
            .optional(),
          documentStyleSuggestionState: z.unknown().describe(
            "A mask that indicates which of the fields on the base DocumentStyle have been changed in this suggestion. For any field set to true, there's a new suggested value.",
          ).optional(),
        }),
      ).describe(
        "The suggested changes to the style of the document tab, keyed by suggestion ID.",
      ).optional(),
      suggestedNamedStylesChanges: z.record(
        z.string(),
        z.object({
          namedStyles: z.unknown().describe(
            "The named styles. Paragraphs in the document can inherit their TextStyle and ParagraphStyle from these named styles.",
          ).optional(),
          namedStylesSuggestionState: z.unknown().describe(
            "The suggestion state of a NamedStyles message.",
          ).optional(),
        }),
      ).describe(
        "The suggested changes to the named styles of the document tab, keyed by suggestion ID.",
      ).optional(),
    }).describe("A tab with document contents.").optional(),
    tabProperties: z.object({
      iconEmoji: z.string().describe(
        "Optional. The emoji icon displayed with the tab. A valid emoji icon is represented by a non-empty Unicode string. Any set of characters that don't represent a single emoji is invalid. If an emoji is invalid, a 400 bad request error is returned. If this value is unset or empty, the tab will display the default tab icon.",
      ).optional(),
      index: z.number().int().describe(
        "The zero-based index of the tab within the parent.",
      ).optional(),
      nestingLevel: z.number().int().describe(
        "Output only. The depth of the tab within the document. Root-level tabs start at 0.",
      ).optional(),
      parentTabId: z.string().describe(
        "Optional. The ID of the parent tab. Empty when the current tab is a root-level tab, which means it doesn't have any parents.",
      ).optional(),
      tabId: z.string().describe("The immutable ID of the tab.").optional(),
      title: z.string().describe("The user-visible name of the tab.")
        .optional(),
    }).describe("Properties of a tab.").optional(),
  })).describe(
    "Tabs that are part of a document. Tabs can contain child tabs, a tab nested within another tab. Child tabs are represented by the Tab.childTabs field.",
  ).optional(),
  title: z.string().describe("The title of the document.").optional(),
});

const StateSchema = z.object({
  body: z.object({
    content: z.array(z.object({
      endIndex: z.number(),
      paragraph: z.object({
        bullet: z.object({
          listId: z.unknown(),
          nestingLevel: z.unknown(),
          textStyle: z.unknown(),
        }),
        elements: z.array(z.unknown()),
        paragraphStyle: z.object({
          alignment: z.unknown(),
          avoidWidowAndOrphan: z.unknown(),
          borderBetween: z.unknown(),
          borderBottom: z.unknown(),
          borderLeft: z.unknown(),
          borderRight: z.unknown(),
          borderTop: z.unknown(),
          direction: z.unknown(),
          headingId: z.unknown(),
          indentEnd: z.unknown(),
          indentFirstLine: z.unknown(),
          indentStart: z.unknown(),
          keepLinesTogether: z.unknown(),
          keepWithNext: z.unknown(),
          lineSpacing: z.unknown(),
          namedStyleType: z.unknown(),
          pageBreakBefore: z.unknown(),
          shading: z.unknown(),
          spaceAbove: z.unknown(),
          spaceBelow: z.unknown(),
          spacingMode: z.unknown(),
          tabStops: z.unknown(),
        }),
        positionedObjectIds: z.array(z.unknown()),
        suggestedBulletChanges: z.record(z.string(), z.unknown()),
        suggestedParagraphStyleChanges: z.record(z.string(), z.unknown()),
        suggestedPositionedObjectIds: z.record(z.string(), z.unknown()),
      }),
      sectionBreak: z.object({
        sectionStyle: z.object({
          columnProperties: z.unknown(),
          columnSeparatorStyle: z.unknown(),
          contentDirection: z.unknown(),
          defaultFooterId: z.unknown(),
          defaultHeaderId: z.unknown(),
          evenPageFooterId: z.unknown(),
          evenPageHeaderId: z.unknown(),
          firstPageFooterId: z.unknown(),
          firstPageHeaderId: z.unknown(),
          flipPageOrientation: z.unknown(),
          marginBottom: z.unknown(),
          marginFooter: z.unknown(),
          marginHeader: z.unknown(),
          marginLeft: z.unknown(),
          marginRight: z.unknown(),
          marginTop: z.unknown(),
          pageNumberStart: z.unknown(),
          sectionType: z.unknown(),
          useFirstPageHeaderFooter: z.unknown(),
        }),
        suggestedDeletionIds: z.array(z.unknown()),
        suggestedInsertionIds: z.array(z.unknown()),
      }),
      startIndex: z.number(),
      table: z.object({
        columns: z.number(),
        rows: z.number(),
        suggestedDeletionIds: z.array(z.unknown()),
        suggestedInsertionIds: z.array(z.unknown()),
        tableRows: z.array(z.unknown()),
        tableStyle: z.object({
          tableColumnProperties: z.unknown(),
        }),
      }),
      tableOfContents: z.object({
        content: z.array(z.unknown()),
        suggestedDeletionIds: z.array(z.unknown()),
        suggestedInsertionIds: z.array(z.unknown()),
      }),
    })),
  }).optional(),
  documentId: z.string().optional(),
  documentStyle: z.object({
    background: z.object({
      color: z.object({
        color: z.object({
          rgbColor: z.object({
            blue: z.unknown(),
            green: z.unknown(),
            red: z.unknown(),
          }),
        }),
      }),
    }),
    defaultFooterId: z.string(),
    defaultHeaderId: z.string(),
    documentFormat: z.object({
      documentMode: z.string(),
    }),
    evenPageFooterId: z.string(),
    evenPageHeaderId: z.string(),
    firstPageFooterId: z.string(),
    firstPageHeaderId: z.string(),
    flipPageOrientation: z.boolean(),
    marginBottom: z.object({
      magnitude: z.number(),
      unit: z.string(),
    }),
    marginFooter: z.object({
      magnitude: z.number(),
      unit: z.string(),
    }),
    marginHeader: z.object({
      magnitude: z.number(),
      unit: z.string(),
    }),
    marginLeft: z.object({
      magnitude: z.number(),
      unit: z.string(),
    }),
    marginRight: z.object({
      magnitude: z.number(),
      unit: z.string(),
    }),
    marginTop: z.object({
      magnitude: z.number(),
      unit: z.string(),
    }),
    pageNumberStart: z.number(),
    pageSize: z.object({
      height: z.object({
        magnitude: z.number(),
        unit: z.string(),
      }),
      width: z.object({
        magnitude: z.number(),
        unit: z.string(),
      }),
    }),
    useCustomHeaderFooterMargins: z.boolean(),
    useEvenPageHeaderFooter: z.boolean(),
    useFirstPageHeaderFooter: z.boolean(),
  }).optional(),
  footers: z.record(z.string(), z.unknown()).optional(),
  footnotes: z.record(z.string(), z.unknown()).optional(),
  headers: z.record(z.string(), z.unknown()).optional(),
  inlineObjects: z.record(z.string(), z.unknown()).optional(),
  lists: z.record(z.string(), z.unknown()).optional(),
  namedRanges: z.record(z.string(), z.unknown()).optional(),
  namedStyles: z.object({
    styles: z.array(z.object({
      namedStyleType: z.string(),
      paragraphStyle: z.object({
        alignment: z.string(),
        avoidWidowAndOrphan: z.boolean(),
        borderBetween: z.object({
          color: z.unknown(),
          dashStyle: z.unknown(),
          padding: z.unknown(),
          width: z.unknown(),
        }),
        borderBottom: z.object({
          color: z.unknown(),
          dashStyle: z.unknown(),
          padding: z.unknown(),
          width: z.unknown(),
        }),
        borderLeft: z.object({
          color: z.unknown(),
          dashStyle: z.unknown(),
          padding: z.unknown(),
          width: z.unknown(),
        }),
        borderRight: z.object({
          color: z.unknown(),
          dashStyle: z.unknown(),
          padding: z.unknown(),
          width: z.unknown(),
        }),
        borderTop: z.object({
          color: z.unknown(),
          dashStyle: z.unknown(),
          padding: z.unknown(),
          width: z.unknown(),
        }),
        direction: z.string(),
        headingId: z.string(),
        indentEnd: z.object({
          magnitude: z.unknown(),
          unit: z.unknown(),
        }),
        indentFirstLine: z.object({
          magnitude: z.unknown(),
          unit: z.unknown(),
        }),
        indentStart: z.object({
          magnitude: z.unknown(),
          unit: z.unknown(),
        }),
        keepLinesTogether: z.boolean(),
        keepWithNext: z.boolean(),
        lineSpacing: z.number(),
        namedStyleType: z.string(),
        pageBreakBefore: z.boolean(),
        shading: z.object({
          backgroundColor: z.unknown(),
        }),
        spaceAbove: z.object({
          magnitude: z.unknown(),
          unit: z.unknown(),
        }),
        spaceBelow: z.object({
          magnitude: z.unknown(),
          unit: z.unknown(),
        }),
        spacingMode: z.string(),
        tabStops: z.array(z.unknown()),
      }),
      textStyle: z.object({
        backgroundColor: z.object({
          color: z.unknown(),
        }),
        baselineOffset: z.string(),
        bold: z.boolean(),
        fontSize: z.object({
          magnitude: z.unknown(),
          unit: z.unknown(),
        }),
        foregroundColor: z.object({
          color: z.unknown(),
        }),
        italic: z.boolean(),
        link: z.object({
          bookmark: z.unknown(),
          bookmarkId: z.unknown(),
          heading: z.unknown(),
          headingId: z.unknown(),
          tabId: z.unknown(),
          url: z.unknown(),
        }),
        smallCaps: z.boolean(),
        strikethrough: z.boolean(),
        underline: z.boolean(),
        weightedFontFamily: z.object({
          fontFamily: z.unknown(),
          weight: z.unknown(),
        }),
      }),
    })),
  }).optional(),
  positionedObjects: z.record(z.string(), z.unknown()).optional(),
  revisionId: z.string().optional(),
  suggestedDocumentStyleChanges: z.record(z.string(), z.unknown()).optional(),
  suggestedNamedStylesChanges: z.record(z.string(), z.unknown()).optional(),
  suggestionsViewMode: z.string().optional(),
  tabs: z.array(z.object({
    childTabs: z.array(z.record(z.string(), z.unknown())),
    documentTab: z.object({
      body: z.object({
        content: z.array(z.unknown()),
      }),
      documentStyle: z.object({
        background: z.object({
          color: z.unknown(),
        }),
        defaultFooterId: z.string(),
        defaultHeaderId: z.string(),
        documentFormat: z.object({
          documentMode: z.unknown(),
        }),
        evenPageFooterId: z.string(),
        evenPageHeaderId: z.string(),
        firstPageFooterId: z.string(),
        firstPageHeaderId: z.string(),
        flipPageOrientation: z.boolean(),
        marginBottom: z.object({
          magnitude: z.unknown(),
          unit: z.unknown(),
        }),
        marginFooter: z.object({
          magnitude: z.unknown(),
          unit: z.unknown(),
        }),
        marginHeader: z.object({
          magnitude: z.unknown(),
          unit: z.unknown(),
        }),
        marginLeft: z.object({
          magnitude: z.unknown(),
          unit: z.unknown(),
        }),
        marginRight: z.object({
          magnitude: z.unknown(),
          unit: z.unknown(),
        }),
        marginTop: z.object({
          magnitude: z.unknown(),
          unit: z.unknown(),
        }),
        pageNumberStart: z.number(),
        pageSize: z.object({
          height: z.unknown(),
          width: z.unknown(),
        }),
        useCustomHeaderFooterMargins: z.boolean(),
        useEvenPageHeaderFooter: z.boolean(),
        useFirstPageHeaderFooter: z.boolean(),
      }),
      footers: z.record(z.string(), z.unknown()),
      footnotes: z.record(z.string(), z.unknown()),
      headers: z.record(z.string(), z.unknown()),
      inlineObjects: z.record(z.string(), z.unknown()),
      lists: z.record(z.string(), z.unknown()),
      namedRanges: z.record(z.string(), z.unknown()),
      namedStyles: z.object({
        styles: z.array(z.unknown()),
      }),
      positionedObjects: z.record(z.string(), z.unknown()),
      suggestedDocumentStyleChanges: z.record(z.string(), z.unknown()),
      suggestedNamedStylesChanges: z.record(z.string(), z.unknown()),
    }),
    tabProperties: z.object({
      iconEmoji: z.string(),
      index: z.number(),
      nestingLevel: z.number(),
      parentTabId: z.string(),
      tabId: z.string(),
      title: z.string(),
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
  body: z.object({
    content: z.array(z.object({
      endIndex: z.number().int().describe(
        "The zero-based end index of this structural element, exclusive, in UTF-16 code units.",
      ).optional(),
      paragraph: z.object({
        bullet: z.object({
          listId: z.unknown().describe(
            "The ID of the list this paragraph belongs to.",
          ).optional(),
          nestingLevel: z.unknown().describe(
            "The nesting level of this paragraph in the list.",
          ).optional(),
          textStyle: z.unknown().describe(
            "Represents the styling that can be applied to text. Inherited text styles are represented as unset fields in this message. A text style's parent depends on where the text style is defined: * The TextStyle of text in a Paragraph inherits from the paragraph's corresponding named style type. * The TextStyle on a named style inherits from the normal text named style. * The TextStyle of the normal text named style inherits from the default text style in the Docs editor. * The TextStyle on a Paragraph element that's contained in a table may inherit its text style from the table style. If the text style does not inherit from a parent, unsetting fields will revert the style to a value matching the defaults in the Docs editor.",
          ).optional(),
        }).describe("Describes the bullet of a paragraph.").optional(),
        elements: z.array(z.unknown()).describe(
          "The content of the paragraph, broken down into its component parts.",
        ).optional(),
        paragraphStyle: z.object({
          alignment: z.unknown().describe(
            "The text alignment for this paragraph.",
          ).optional(),
          avoidWidowAndOrphan: z.unknown().describe(
            "Whether to avoid widows and orphans for the paragraph. If unset, the value is inherited from the parent.",
          ).optional(),
          borderBetween: z.unknown().describe("A border around a paragraph.")
            .optional(),
          borderBottom: z.unknown().describe("A border around a paragraph.")
            .optional(),
          borderLeft: z.unknown().describe("A border around a paragraph.")
            .optional(),
          borderRight: z.unknown().describe("A border around a paragraph.")
            .optional(),
          borderTop: z.unknown().describe("A border around a paragraph.")
            .optional(),
          direction: z.unknown().describe(
            "The text direction of this paragraph. If unset, the value defaults to LEFT_TO_RIGHT since paragraph direction is not inherited.",
          ).optional(),
          headingId: z.unknown().describe(
            "The heading ID of the paragraph. If empty, then this paragraph is not a heading. This property is read-only.",
          ).optional(),
          indentEnd: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          indentFirstLine: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          indentStart: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          keepLinesTogether: z.unknown().describe(
            "Whether all lines of the paragraph should be laid out on the same page or column if possible. If unset, the value is inherited from the parent.",
          ).optional(),
          keepWithNext: z.unknown().describe(
            "Whether at least a part of this paragraph should be laid out on the same page or column as the next paragraph if possible. If unset, the value is inherited from the parent.",
          ).optional(),
          lineSpacing: z.unknown().describe(
            "The amount of space between lines, as a percentage of normal, where normal is represented as 100.0. If unset, the value is inherited from the parent.",
          ).optional(),
          namedStyleType: z.unknown().describe(
            "The named style type of the paragraph. Since updating the named style type affects other properties within ParagraphStyle, the named style type is applied before the other properties are updated.",
          ).optional(),
          pageBreakBefore: z.unknown().describe(
            "Whether the current paragraph should always start at the beginning of a page. If unset, the value is inherited from the parent. Attempting to update page_break_before for paragraphs in unsupported regions, including Table, Header, Footer and Footnote, can result in an invalid document state that returns a 400 bad request error.",
          ).optional(),
          shading: z.unknown().describe("The shading of a paragraph.")
            .optional(),
          spaceAbove: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          spaceBelow: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          spacingMode: z.unknown().describe(
            "The spacing mode for the paragraph.",
          ).optional(),
          tabStops: z.unknown().describe(
            "A list of the tab stops for this paragraph. The list of tab stops is not inherited. This property is read-only.",
          ).optional(),
        }).describe(
          "Styles that apply to a whole paragraph. Inherited paragraph styles are represented as unset fields in this message. A paragraph style's parent depends on where the paragraph style is defined: * The ParagraphStyle on a Paragraph inherits from the paragraph's corresponding named style type. * The ParagraphStyle on a named style inherits from the normal text named style. * The ParagraphStyle of the normal text named style inherits from the default paragraph style in the Docs editor. * The ParagraphStyle on a Paragraph element that's contained in a table may inherit its paragraph style from the table style. If the paragraph style does not inherit from a parent, unsetting fields will revert the style to a value matching the defaults in the Docs editor.",
        ).optional(),
        positionedObjectIds: z.array(z.unknown()).describe(
          "The IDs of the positioned objects tethered to this paragraph.",
        ).optional(),
        suggestedBulletChanges: z.record(z.string(), z.unknown()).describe(
          "The suggested changes to this paragraph's bullet.",
        ).optional(),
        suggestedParagraphStyleChanges: z.record(z.string(), z.unknown())
          .describe(
            "The suggested paragraph style changes to this paragraph, keyed by suggestion ID.",
          ).optional(),
        suggestedPositionedObjectIds: z.record(z.string(), z.unknown())
          .describe(
            "The IDs of the positioned objects suggested to be attached to this paragraph, keyed by suggestion ID.",
          ).optional(),
      }).describe(
        "A StructuralElement representing a paragraph. A paragraph is a range of content that's terminated with a newline character.",
      ).optional(),
      sectionBreak: z.object({
        sectionStyle: z.object({
          columnProperties: z.unknown().describe(
            "The section's columns properties. If empty, the section contains one column with the default properties in the Docs editor. A section can be updated to have no more than 3 columns. When updating this property, setting a concrete value is required. Unsetting this property will result in a 400 bad request error.",
          ).optional(),
          columnSeparatorStyle: z.unknown().describe(
            "The style of column separators. This style can be set even when there's one column in the section. When updating this property, setting a concrete value is required. Unsetting this property results in a 400 bad request error.",
          ).optional(),
          contentDirection: z.unknown().describe(
            "The content direction of this section. If unset, the value defaults to LEFT_TO_RIGHT. When updating this property, setting a concrete value is required. Unsetting this property results in a 400 bad request error.",
          ).optional(),
          defaultFooterId: z.unknown().describe(
            "The ID of the default footer. If unset, the value inherits from the previous SectionBreak's SectionStyle. If the value is unset in the first SectionBreak, it inherits from DocumentStyle's default_footer_id. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
          ).optional(),
          defaultHeaderId: z.unknown().describe(
            "The ID of the default header. If unset, the value inherits from the previous SectionBreak's SectionStyle. If the value is unset in the first SectionBreak, it inherits from DocumentStyle's default_header_id. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
          ).optional(),
          evenPageFooterId: z.unknown().describe(
            "The ID of the footer used only for even pages. If the value of DocumentStyle's use_even_page_header_footer is true, this value is used for the footers on even pages in the section. If it is false, the footers on even pages use the default_footer_id. If unset, the value inherits from the previous SectionBreak's SectionStyle. If the value is unset in the first SectionBreak, it inherits from DocumentStyle's even_page_footer_id. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
          ).optional(),
          evenPageHeaderId: z.unknown().describe(
            "The ID of the header used only for even pages. If the value of DocumentStyle's use_even_page_header_footer is true, this value is used for the headers on even pages in the section. If it is false, the headers on even pages use the default_header_id. If unset, the value inherits from the previous SectionBreak's SectionStyle. If the value is unset in the first SectionBreak, it inherits from DocumentStyle's even_page_header_id. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
          ).optional(),
          firstPageFooterId: z.unknown().describe(
            "The ID of the footer used only for the first page of the section. If use_first_page_header_footer is true, this value is used for the footer on the first page of the section. If it's false, the footer on the first page of the section uses the default_footer_id. If unset, the value inherits from the previous SectionBreak's SectionStyle. If the value is unset in the first SectionBreak, it inherits from DocumentStyle's first_page_footer_id. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
          ).optional(),
          firstPageHeaderId: z.unknown().describe(
            "The ID of the header used only for the first page of the section. If use_first_page_header_footer is true, this value is used for the header on the first page of the section. If it's false, the header on the first page of the section uses the default_header_id. If unset, the value inherits from the previous SectionBreak's SectionStyle. If the value is unset in the first SectionBreak, it inherits from DocumentStyle's first_page_header_id. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
          ).optional(),
          flipPageOrientation: z.unknown().describe(
            "Optional. Indicates whether to flip the dimensions of DocumentStyle's page_size for this section, which allows changing the page orientation between portrait and landscape. If unset, the value inherits from DocumentStyle's flip_page_orientation. If DocumentMode is PAGELESS, this property will not be rendered. When updating this property, setting a concrete value is required. Unsetting this property results in a 400 bad request error.",
          ).optional(),
          marginBottom: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          marginFooter: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          marginHeader: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          marginLeft: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          marginRight: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          marginTop: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          pageNumberStart: z.unknown().describe(
            "The page number from which to start counting the number of pages for this section. If unset, page numbering continues from the previous section. If the value is unset in the first SectionBreak, refer to DocumentStyle's page_number_start. If DocumentMode is PAGELESS, this property will not be rendered. When updating this property, setting a concrete value is required. Unsetting this property results in a 400 bad request error.",
          ).optional(),
          sectionType: z.unknown().describe("Output only. The type of section.")
            .optional(),
          useFirstPageHeaderFooter: z.unknown().describe(
            "Indicates whether to use the first page header / footer IDs for the first page of the section. If unset, it inherits from DocumentStyle's use_first_page_header_footer for the first section. If the value is unset for subsequent sectors, it should be interpreted as false. If DocumentMode is PAGELESS, this property will not be rendered. When updating this property, setting a concrete value is required. Unsetting this property results in a 400 bad request error.",
          ).optional(),
        }).describe("The styling that applies to a section.").optional(),
        suggestedDeletionIds: z.array(z.unknown()).describe(
          "The suggested deletion IDs. If empty, then there are no suggested deletions of this content.",
        ).optional(),
        suggestedInsertionIds: z.array(z.unknown()).describe(
          "The suggested insertion IDs. A SectionBreak may have multiple insertion IDs if it's a nested suggested change. If empty, then this is not a suggested insertion.",
        ).optional(),
      }).describe(
        "A StructuralElement representing a section break. A section is a range of content that has the same SectionStyle. A section break represents the start of a new section, and the section style applies to the section after the section break. The document body always begins with a section break.",
      ).optional(),
      startIndex: z.number().int().describe(
        "The zero-based start index of this structural element, in UTF-16 code units.",
      ).optional(),
      table: z.object({
        columns: z.number().int().describe(
          "Number of columns in the table. It's possible for a table to be non-rectangular, so some rows may have a different number of cells.",
        ).optional(),
        rows: z.number().int().describe("Number of rows in the table.")
          .optional(),
        suggestedDeletionIds: z.array(z.unknown()).describe(
          "The suggested deletion IDs. If empty, then there are no suggested deletions of this content.",
        ).optional(),
        suggestedInsertionIds: z.array(z.unknown()).describe(
          "The suggested insertion IDs. A Table may have multiple insertion IDs if it's a nested suggested change. If empty, then this is not a suggested insertion.",
        ).optional(),
        tableRows: z.array(z.unknown()).describe(
          "The contents and style of each row.",
        ).optional(),
        tableStyle: z.object({
          tableColumnProperties: z.unknown().describe(
            "The properties of each column. Note that in Docs, tables contain rows and rows contain cells, similar to HTML. So the properties for a row can be found on the row's table_row_style.",
          ).optional(),
        }).describe("Styles that apply to a table.").optional(),
      }).describe("A StructuralElement representing a table.").optional(),
      tableOfContents: z.object({
        content: z.array(z.unknown()).describe(
          "The content of the table of contents.",
        ).optional(),
        suggestedDeletionIds: z.array(z.unknown()).describe(
          "The suggested deletion IDs. If empty, then there are no suggested deletions of this content.",
        ).optional(),
        suggestedInsertionIds: z.array(z.unknown()).describe(
          "The suggested insertion IDs. A TableOfContents may have multiple insertion IDs if it is a nested suggested change. If empty, then this is not a suggested insertion.",
        ).optional(),
      }).describe("A StructuralElement representing a table of contents.")
        .optional(),
    })).describe(
      "The contents of the body. The indexes for the body's content begin at zero.",
    ).optional(),
  }).describe(
    "The document body. The body typically contains the full document contents except for headers, footers, and footnotes.",
  ).optional(),
  documentStyle: z.object({
    background: z.object({
      color: z.object({
        color: z.object({
          rgbColor: z.object({
            blue: z.unknown().describe(
              "The blue component of the color, from 0.0 to 1.0.",
            ).optional(),
            green: z.unknown().describe(
              "The green component of the color, from 0.0 to 1.0.",
            ).optional(),
            red: z.unknown().describe(
              "The red component of the color, from 0.0 to 1.0.",
            ).optional(),
          }).describe("An RGB color.").optional(),
        }).describe("A solid color.").optional(),
      }).describe(
        "A color that can either be fully opaque or fully transparent.",
      ).optional(),
    }).describe("Represents the background of a document.").optional(),
    defaultFooterId: z.string().describe(
      "The ID of the default footer. If not set, there's no default footer. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
    ).optional(),
    defaultHeaderId: z.string().describe(
      "The ID of the default header. If not set, there's no default header. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
    ).optional(),
    documentFormat: z.object({
      documentMode: z.enum(["DOCUMENT_MODE_UNSPECIFIED", "PAGES", "PAGELESS"])
        .describe("Whether the document has pages or is pageless.").optional(),
    }).describe("Represents document-level format settings.").optional(),
    evenPageFooterId: z.string().describe(
      "The ID of the footer used only for even pages. The value of use_even_page_header_footer determines whether to use the default_footer_id or this value for the footer on even pages. If not set, there's no even page footer. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
    ).optional(),
    evenPageHeaderId: z.string().describe(
      "The ID of the header used only for even pages. The value of use_even_page_header_footer determines whether to use the default_header_id or this value for the header on even pages. If not set, there's no even page header. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
    ).optional(),
    firstPageFooterId: z.string().describe(
      "The ID of the footer used only for the first page. If not set then a unique footer for the first page does not exist. The value of use_first_page_header_footer determines whether to use the default_footer_id or this value for the footer on the first page. If not set, there's no first page footer. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
    ).optional(),
    firstPageHeaderId: z.string().describe(
      "The ID of the header used only for the first page. If not set then a unique header for the first page does not exist. The value of use_first_page_header_footer determines whether to use the default_header_id or this value for the header on the first page. If not set, there's no first page header. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
    ).optional(),
    flipPageOrientation: z.boolean().describe(
      "Optional. Indicates whether to flip the dimensions of the page_size, which allows changing the page orientation between portrait and landscape. If DocumentMode is PAGELESS, this property will not be rendered.",
    ).optional(),
    marginBottom: z.object({
      magnitude: z.number().describe("The magnitude.").optional(),
      unit: z.enum(["UNIT_UNSPECIFIED", "PT"]).describe(
        "The units for magnitude.",
      ).optional(),
    }).describe("A magnitude in a single direction in the specified units.")
      .optional(),
    marginFooter: z.object({
      magnitude: z.number().describe("The magnitude.").optional(),
      unit: z.enum(["UNIT_UNSPECIFIED", "PT"]).describe(
        "The units for magnitude.",
      ).optional(),
    }).describe("A magnitude in a single direction in the specified units.")
      .optional(),
    marginHeader: z.object({
      magnitude: z.number().describe("The magnitude.").optional(),
      unit: z.enum(["UNIT_UNSPECIFIED", "PT"]).describe(
        "The units for magnitude.",
      ).optional(),
    }).describe("A magnitude in a single direction in the specified units.")
      .optional(),
    marginLeft: z.object({
      magnitude: z.number().describe("The magnitude.").optional(),
      unit: z.enum(["UNIT_UNSPECIFIED", "PT"]).describe(
        "The units for magnitude.",
      ).optional(),
    }).describe("A magnitude in a single direction in the specified units.")
      .optional(),
    marginRight: z.object({
      magnitude: z.number().describe("The magnitude.").optional(),
      unit: z.enum(["UNIT_UNSPECIFIED", "PT"]).describe(
        "The units for magnitude.",
      ).optional(),
    }).describe("A magnitude in a single direction in the specified units.")
      .optional(),
    marginTop: z.object({
      magnitude: z.number().describe("The magnitude.").optional(),
      unit: z.enum(["UNIT_UNSPECIFIED", "PT"]).describe(
        "The units for magnitude.",
      ).optional(),
    }).describe("A magnitude in a single direction in the specified units.")
      .optional(),
    pageNumberStart: z.number().int().describe(
      "The page number from which to start counting the number of pages. If DocumentMode is PAGELESS, this property will not be rendered.",
    ).optional(),
    pageSize: z.object({
      height: z.object({
        magnitude: z.number().describe("The magnitude.").optional(),
        unit: z.enum(["UNIT_UNSPECIFIED", "PT"]).describe(
          "The units for magnitude.",
        ).optional(),
      }).describe("A magnitude in a single direction in the specified units.")
        .optional(),
      width: z.object({
        magnitude: z.number().describe("The magnitude.").optional(),
        unit: z.enum(["UNIT_UNSPECIFIED", "PT"]).describe(
          "The units for magnitude.",
        ).optional(),
      }).describe("A magnitude in a single direction in the specified units.")
        .optional(),
    }).describe("A width and height.").optional(),
    useCustomHeaderFooterMargins: z.boolean().describe(
      "Indicates whether DocumentStyle margin_header, SectionStyle margin_header and DocumentStyle margin_footer, SectionStyle margin_footer are respected. When false, the default values in the Docs editor for header and footer margin is used. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
    ).optional(),
    useEvenPageHeaderFooter: z.boolean().describe(
      "Indicates whether to use the even page header / footer IDs for the even pages. If DocumentMode is PAGELESS, this property will not be rendered.",
    ).optional(),
    useFirstPageHeaderFooter: z.boolean().describe(
      "Indicates whether to use the first page header / footer IDs for the first page. If DocumentMode is PAGELESS, this property will not be rendered.",
    ).optional(),
  }).describe("The style of the document.").optional(),
  namedStyles: z.object({
    styles: z.array(z.object({
      namedStyleType: z.enum([
        "NAMED_STYLE_TYPE_UNSPECIFIED",
        "NORMAL_TEXT",
        "TITLE",
        "SUBTITLE",
        "HEADING_1",
        "HEADING_2",
        "HEADING_3",
        "HEADING_4",
        "HEADING_5",
        "HEADING_6",
      ]).describe("The type of this named style.").optional(),
      paragraphStyle: z.object({
        alignment: z.enum([
          "ALIGNMENT_UNSPECIFIED",
          "START",
          "CENTER",
          "END",
          "JUSTIFIED",
        ]).describe("The text alignment for this paragraph.").optional(),
        avoidWidowAndOrphan: z.boolean().describe(
          "Whether to avoid widows and orphans for the paragraph. If unset, the value is inherited from the parent.",
        ).optional(),
        borderBetween: z.object({
          color: z.unknown().describe(
            "A color that can either be fully opaque or fully transparent.",
          ).optional(),
          dashStyle: z.unknown().describe("The dash style of the border.")
            .optional(),
          padding: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          width: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
        }).describe("A border around a paragraph.").optional(),
        borderBottom: z.object({
          color: z.unknown().describe(
            "A color that can either be fully opaque or fully transparent.",
          ).optional(),
          dashStyle: z.unknown().describe("The dash style of the border.")
            .optional(),
          padding: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          width: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
        }).describe("A border around a paragraph.").optional(),
        borderLeft: z.object({
          color: z.unknown().describe(
            "A color that can either be fully opaque or fully transparent.",
          ).optional(),
          dashStyle: z.unknown().describe("The dash style of the border.")
            .optional(),
          padding: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          width: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
        }).describe("A border around a paragraph.").optional(),
        borderRight: z.object({
          color: z.unknown().describe(
            "A color that can either be fully opaque or fully transparent.",
          ).optional(),
          dashStyle: z.unknown().describe("The dash style of the border.")
            .optional(),
          padding: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          width: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
        }).describe("A border around a paragraph.").optional(),
        borderTop: z.object({
          color: z.unknown().describe(
            "A color that can either be fully opaque or fully transparent.",
          ).optional(),
          dashStyle: z.unknown().describe("The dash style of the border.")
            .optional(),
          padding: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          width: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
        }).describe("A border around a paragraph.").optional(),
        direction: z.enum([
          "CONTENT_DIRECTION_UNSPECIFIED",
          "LEFT_TO_RIGHT",
          "RIGHT_TO_LEFT",
        ]).describe(
          "The text direction of this paragraph. If unset, the value defaults to LEFT_TO_RIGHT since paragraph direction is not inherited.",
        ).optional(),
        headingId: z.string().describe(
          "The heading ID of the paragraph. If empty, then this paragraph is not a heading. This property is read-only.",
        ).optional(),
        indentEnd: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("A magnitude in a single direction in the specified units.")
          .optional(),
        indentFirstLine: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("A magnitude in a single direction in the specified units.")
          .optional(),
        indentStart: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("A magnitude in a single direction in the specified units.")
          .optional(),
        keepLinesTogether: z.boolean().describe(
          "Whether all lines of the paragraph should be laid out on the same page or column if possible. If unset, the value is inherited from the parent.",
        ).optional(),
        keepWithNext: z.boolean().describe(
          "Whether at least a part of this paragraph should be laid out on the same page or column as the next paragraph if possible. If unset, the value is inherited from the parent.",
        ).optional(),
        lineSpacing: z.number().describe(
          "The amount of space between lines, as a percentage of normal, where normal is represented as 100.0. If unset, the value is inherited from the parent.",
        ).optional(),
        namedStyleType: z.enum([
          "NAMED_STYLE_TYPE_UNSPECIFIED",
          "NORMAL_TEXT",
          "TITLE",
          "SUBTITLE",
          "HEADING_1",
          "HEADING_2",
          "HEADING_3",
          "HEADING_4",
          "HEADING_5",
          "HEADING_6",
        ]).describe(
          "The named style type of the paragraph. Since updating the named style type affects other properties within ParagraphStyle, the named style type is applied before the other properties are updated.",
        ).optional(),
        pageBreakBefore: z.boolean().describe(
          "Whether the current paragraph should always start at the beginning of a page. If unset, the value is inherited from the parent. Attempting to update page_break_before for paragraphs in unsupported regions, including Table, Header, Footer and Footnote, can result in an invalid document state that returns a 400 bad request error.",
        ).optional(),
        shading: z.object({
          backgroundColor: z.unknown().describe(
            "A color that can either be fully opaque or fully transparent.",
          ).optional(),
        }).describe("The shading of a paragraph.").optional(),
        spaceAbove: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("A magnitude in a single direction in the specified units.")
          .optional(),
        spaceBelow: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("A magnitude in a single direction in the specified units.")
          .optional(),
        spacingMode: z.enum([
          "SPACING_MODE_UNSPECIFIED",
          "NEVER_COLLAPSE",
          "COLLAPSE_LISTS",
        ]).describe("The spacing mode for the paragraph.").optional(),
        tabStops: z.array(z.unknown()).describe(
          "A list of the tab stops for this paragraph. The list of tab stops is not inherited. This property is read-only.",
        ).optional(),
      }).describe(
        "Styles that apply to a whole paragraph. Inherited paragraph styles are represented as unset fields in this message. A paragraph style's parent depends on where the paragraph style is defined: * The ParagraphStyle on a Paragraph inherits from the paragraph's corresponding named style type. * The ParagraphStyle on a named style inherits from the normal text named style. * The ParagraphStyle of the normal text named style inherits from the default paragraph style in the Docs editor. * The ParagraphStyle on a Paragraph element that's contained in a table may inherit its paragraph style from the table style. If the paragraph style does not inherit from a parent, unsetting fields will revert the style to a value matching the defaults in the Docs editor.",
      ).optional(),
      textStyle: z.object({
        backgroundColor: z.object({
          color: z.unknown().describe("A solid color.").optional(),
        }).describe(
          "A color that can either be fully opaque or fully transparent.",
        ).optional(),
        baselineOffset: z.enum([
          "BASELINE_OFFSET_UNSPECIFIED",
          "NONE",
          "SUPERSCRIPT",
          "SUBSCRIPT",
        ]).describe(
          "The text's vertical offset from its normal position. Text with `SUPERSCRIPT` or `SUBSCRIPT` baseline offsets is automatically rendered in a smaller font size, computed based on the `font_size` field. Changes in this field don't affect the `font_size`.",
        ).optional(),
        bold: z.boolean().describe(
          "Whether or not the text is rendered as bold.",
        ).optional(),
        fontSize: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("A magnitude in a single direction in the specified units.")
          .optional(),
        foregroundColor: z.object({
          color: z.unknown().describe("A solid color.").optional(),
        }).describe(
          "A color that can either be fully opaque or fully transparent.",
        ).optional(),
        italic: z.boolean().describe("Whether or not the text is italicized.")
          .optional(),
        link: z.object({
          bookmark: z.unknown().describe(
            "A reference to a bookmark in this document.",
          ).optional(),
          bookmarkId: z.unknown().describe(
            "The ID of a bookmark in this document. Legacy field: Instead, set includeTabsContent to `true` and use Link.bookmark for read and write operations. This field is only returned when includeTabsContent is set to `false` in documents containing a single tab and links to a bookmark within the singular tab. Otherwise, Link.bookmark is returned. If this field is used in a write request, the bookmark is considered to be from the tab ID specified in the request. If a tab ID is not specified in the request, it is considered to be from the first tab in the document.",
          ).optional(),
          heading: z.unknown().describe(
            "A reference to a heading in this document.",
          ).optional(),
          headingId: z.unknown().describe(
            "The ID of a heading in this document. Legacy field: Instead, set includeTabsContent to `true` and use Link.heading for read and write operations. This field is only returned when includeTabsContent is set to `false` in documents containing a single tab and links to a heading within the singular tab. Otherwise, Link.heading is returned. If this field is used in a write request, the heading is considered to be from the tab ID specified in the request. If a tab ID is not specified in the request, it is considered to be from the first tab in the document.",
          ).optional(),
          tabId: z.unknown().describe("The ID of a tab in this document.")
            .optional(),
          url: z.unknown().describe("An external URL.").optional(),
        }).describe(
          "A reference to another portion of a document or an external URL resource.",
        ).optional(),
        smallCaps: z.boolean().describe(
          "Whether or not the text is in small capital letters.",
        ).optional(),
        strikethrough: z.boolean().describe(
          "Whether or not the text is struck through.",
        ).optional(),
        underline: z.boolean().describe(
          "Whether or not the text is underlined.",
        ).optional(),
        weightedFontFamily: z.object({
          fontFamily: z.unknown().describe(
            "The font family of the text. The font family can be any font from the Font menu in Docs or from [Google Fonts] (https://fonts.google.com/). If the font name is unrecognized, the text is rendered in `Arial`.",
          ).optional(),
          weight: z.unknown().describe(
            "The weight of the font. This field can have any value that's a multiple of `100` between `100` and `900`, inclusive. This range corresponds to the numerical values described in the CSS 2.1 Specification, [section 15.6](https://www.w3.org/TR/CSS21/fonts.html#font-boldness), with non-numerical values disallowed. The default value is `400` (\"normal\"). The font weight makes up just one component of the rendered font weight. A combination of the `weight` and the text style's resolved `bold` value determine the rendered weight, after accounting for inheritance: * If the text is bold and the weight is less than `400`, the rendered weight is 400. * If the text is bold and the weight is greater than or equal to `400` but is less than `700`, the rendered weight is `700`. * If the weight is greater than or equal to `700`, the rendered weight is equal to the weight. * If the text is not bold, the rendered weight is equal to the weight.",
          ).optional(),
        }).describe("Represents a font family and weight of text.").optional(),
      }).describe(
        "Represents the styling that can be applied to text. Inherited text styles are represented as unset fields in this message. A text style's parent depends on where the text style is defined: * The TextStyle of text in a Paragraph inherits from the paragraph's corresponding named style type. * The TextStyle on a named style inherits from the normal text named style. * The TextStyle of the normal text named style inherits from the default text style in the Docs editor. * The TextStyle on a Paragraph element that's contained in a table may inherit its text style from the table style. If the text style does not inherit from a parent, unsetting fields will revert the style to a value matching the defaults in the Docs editor.",
      ).optional(),
    })).describe(
      "The named styles. There's an entry for each of the possible named style types.",
    ).optional(),
  }).describe(
    "The named styles. Paragraphs in the document can inherit their TextStyle and ParagraphStyle from these named styles.",
  ).optional(),
  tabs: z.array(z.object({
    childTabs: z.array(z.record(z.string(), z.unknown())).describe(
      "The child tabs nested within this tab.",
    ).optional(),
    documentTab: z.object({
      body: z.object({
        content: z.array(z.unknown()).describe(
          "The contents of the body. The indexes for the body's content begin at zero.",
        ).optional(),
      }).describe(
        "The document body. The body typically contains the full document contents except for headers, footers, and footnotes.",
      ).optional(),
      documentStyle: z.object({
        background: z.object({
          color: z.unknown().describe(
            "A color that can either be fully opaque or fully transparent.",
          ).optional(),
        }).describe("Represents the background of a document.").optional(),
        defaultFooterId: z.string().describe(
          "The ID of the default footer. If not set, there's no default footer. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
        ).optional(),
        defaultHeaderId: z.string().describe(
          "The ID of the default header. If not set, there's no default header. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
        ).optional(),
        documentFormat: z.object({
          documentMode: z.unknown().describe(
            "Whether the document has pages or is pageless.",
          ).optional(),
        }).describe("Represents document-level format settings.").optional(),
        evenPageFooterId: z.string().describe(
          "The ID of the footer used only for even pages. The value of use_even_page_header_footer determines whether to use the default_footer_id or this value for the footer on even pages. If not set, there's no even page footer. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
        ).optional(),
        evenPageHeaderId: z.string().describe(
          "The ID of the header used only for even pages. The value of use_even_page_header_footer determines whether to use the default_header_id or this value for the header on even pages. If not set, there's no even page header. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
        ).optional(),
        firstPageFooterId: z.string().describe(
          "The ID of the footer used only for the first page. If not set then a unique footer for the first page does not exist. The value of use_first_page_header_footer determines whether to use the default_footer_id or this value for the footer on the first page. If not set, there's no first page footer. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
        ).optional(),
        firstPageHeaderId: z.string().describe(
          "The ID of the header used only for the first page. If not set then a unique header for the first page does not exist. The value of use_first_page_header_footer determines whether to use the default_header_id or this value for the header on the first page. If not set, there's no first page header. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
        ).optional(),
        flipPageOrientation: z.boolean().describe(
          "Optional. Indicates whether to flip the dimensions of the page_size, which allows changing the page orientation between portrait and landscape. If DocumentMode is PAGELESS, this property will not be rendered.",
        ).optional(),
        marginBottom: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("A magnitude in a single direction in the specified units.")
          .optional(),
        marginFooter: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("A magnitude in a single direction in the specified units.")
          .optional(),
        marginHeader: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("A magnitude in a single direction in the specified units.")
          .optional(),
        marginLeft: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("A magnitude in a single direction in the specified units.")
          .optional(),
        marginRight: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("A magnitude in a single direction in the specified units.")
          .optional(),
        marginTop: z.object({
          magnitude: z.unknown().describe("The magnitude.").optional(),
          unit: z.unknown().describe("The units for magnitude.").optional(),
        }).describe("A magnitude in a single direction in the specified units.")
          .optional(),
        pageNumberStart: z.number().int().describe(
          "The page number from which to start counting the number of pages. If DocumentMode is PAGELESS, this property will not be rendered.",
        ).optional(),
        pageSize: z.object({
          height: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
          width: z.unknown().describe(
            "A magnitude in a single direction in the specified units.",
          ).optional(),
        }).describe("A width and height.").optional(),
        useCustomHeaderFooterMargins: z.boolean().describe(
          "Indicates whether DocumentStyle margin_header, SectionStyle margin_header and DocumentStyle margin_footer, SectionStyle margin_footer are respected. When false, the default values in the Docs editor for header and footer margin is used. If DocumentMode is PAGELESS, this property will not be rendered. This property is read-only.",
        ).optional(),
        useEvenPageHeaderFooter: z.boolean().describe(
          "Indicates whether to use the even page header / footer IDs for the even pages. If DocumentMode is PAGELESS, this property will not be rendered.",
        ).optional(),
        useFirstPageHeaderFooter: z.boolean().describe(
          "Indicates whether to use the first page header / footer IDs for the first page. If DocumentMode is PAGELESS, this property will not be rendered.",
        ).optional(),
      }).describe("The style of the document.").optional(),
      footers: z.record(
        z.string(),
        z.object({
          content: z.unknown().describe(
            "The contents of the footer. The indexes for a footer's content begin at zero.",
          ).optional(),
          footerId: z.unknown().describe("The ID of the footer.").optional(),
        }),
      ).describe("The footers in the document tab, keyed by footer ID.")
        .optional(),
      footnotes: z.record(
        z.string(),
        z.object({
          content: z.unknown().describe(
            "The contents of the footnote. The indexes for a footnote's content begin at zero.",
          ).optional(),
          footnoteId: z.unknown().describe("The ID of the footnote.")
            .optional(),
        }),
      ).describe("The footnotes in the document tab, keyed by footnote ID.")
        .optional(),
      headers: z.record(
        z.string(),
        z.object({
          content: z.unknown().describe(
            "The contents of the header. The indexes for a header's content begin at zero.",
          ).optional(),
          headerId: z.unknown().describe("The ID of the header.").optional(),
        }),
      ).describe("The headers in the document tab, keyed by header ID.")
        .optional(),
      inlineObjects: z.record(
        z.string(),
        z.object({
          inlineObjectProperties: z.unknown().describe(
            "Properties of an InlineObject.",
          ).optional(),
          objectId: z.unknown().describe(
            "The ID of this inline object. Can be used to update an object’s properties.",
          ).optional(),
          suggestedDeletionIds: z.unknown().describe(
            "The suggested deletion IDs. If empty, then there are no suggested deletions of this content.",
          ).optional(),
          suggestedInlineObjectPropertiesChanges: z.unknown().describe(
            "The suggested changes to the inline object properties, keyed by suggestion ID.",
          ).optional(),
          suggestedInsertionId: z.unknown().describe(
            "The suggested insertion ID. If empty, then this is not a suggested insertion.",
          ).optional(),
        }),
      ).describe("The inline objects in the document tab, keyed by object ID.")
        .optional(),
      lists: z.record(
        z.string(),
        z.object({
          listProperties: z.unknown().describe(
            "The properties of a list that describe the look and feel of bullets belonging to paragraphs associated with a list.",
          ).optional(),
          suggestedDeletionIds: z.unknown().describe(
            "The suggested deletion IDs. If empty, then there are no suggested deletions of this list.",
          ).optional(),
          suggestedInsertionId: z.unknown().describe(
            "The suggested insertion ID. If empty, then this is not a suggested insertion.",
          ).optional(),
          suggestedListPropertiesChanges: z.unknown().describe(
            "The suggested changes to the list properties, keyed by suggestion ID.",
          ).optional(),
        }),
      ).describe("The lists in the document tab, keyed by list ID.").optional(),
      namedRanges: z.record(
        z.string(),
        z.object({
          name: z.unknown().describe(
            "The name that all the named ranges share.",
          ).optional(),
          namedRanges: z.unknown().describe(
            "The NamedRanges that share the same name.",
          ).optional(),
        }),
      ).describe("The named ranges in the document tab, keyed by name.")
        .optional(),
      namedStyles: z.object({
        styles: z.array(z.unknown()).describe(
          "The named styles. There's an entry for each of the possible named style types.",
        ).optional(),
      }).describe(
        "The named styles. Paragraphs in the document can inherit their TextStyle and ParagraphStyle from these named styles.",
      ).optional(),
      positionedObjects: z.record(
        z.string(),
        z.object({
          objectId: z.unknown().describe("The ID of this positioned object.")
            .optional(),
          positionedObjectProperties: z.unknown().describe(
            "Properties of a PositionedObject.",
          ).optional(),
          suggestedDeletionIds: z.unknown().describe(
            "The suggested deletion IDs. If empty, then there are no suggested deletions of this content.",
          ).optional(),
          suggestedInsertionId: z.unknown().describe(
            "The suggested insertion ID. If empty, then this is not a suggested insertion.",
          ).optional(),
          suggestedPositionedObjectPropertiesChanges: z.unknown().describe(
            "The suggested changes to the positioned object properties, keyed by suggestion ID.",
          ).optional(),
        }),
      ).describe(
        "The positioned objects in the document tab, keyed by object ID.",
      ).optional(),
      suggestedDocumentStyleChanges: z.record(
        z.string(),
        z.object({
          documentStyle: z.unknown().describe("The style of the document.")
            .optional(),
          documentStyleSuggestionState: z.unknown().describe(
            "A mask that indicates which of the fields on the base DocumentStyle have been changed in this suggestion. For any field set to true, there's a new suggested value.",
          ).optional(),
        }),
      ).describe(
        "The suggested changes to the style of the document tab, keyed by suggestion ID.",
      ).optional(),
      suggestedNamedStylesChanges: z.record(
        z.string(),
        z.object({
          namedStyles: z.unknown().describe(
            "The named styles. Paragraphs in the document can inherit their TextStyle and ParagraphStyle from these named styles.",
          ).optional(),
          namedStylesSuggestionState: z.unknown().describe(
            "The suggestion state of a NamedStyles message.",
          ).optional(),
        }),
      ).describe(
        "The suggested changes to the named styles of the document tab, keyed by suggestion ID.",
      ).optional(),
    }).describe("A tab with document contents.").optional(),
    tabProperties: z.object({
      iconEmoji: z.string().describe(
        "Optional. The emoji icon displayed with the tab. A valid emoji icon is represented by a non-empty Unicode string. Any set of characters that don't represent a single emoji is invalid. If an emoji is invalid, a 400 bad request error is returned. If this value is unset or empty, the tab will display the default tab icon.",
      ).optional(),
      index: z.number().int().describe(
        "The zero-based index of the tab within the parent.",
      ).optional(),
      nestingLevel: z.number().int().describe(
        "Output only. The depth of the tab within the document. Root-level tabs start at 0.",
      ).optional(),
      parentTabId: z.string().describe(
        "Optional. The ID of the parent tab. Empty when the current tab is a root-level tab, which means it doesn't have any parents.",
      ).optional(),
      tabId: z.string().describe("The immutable ID of the tab.").optional(),
      title: z.string().describe("The user-visible name of the tab.")
        .optional(),
    }).describe("Properties of a tab.").optional(),
  })).describe(
    "Tabs that are part of a document. Tabs can contain child tabs, a tab nested within another tab. Child tabs are represented by the Tab.childTabs field.",
  ).optional(),
  title: z.string().describe("The title of the document.").optional(),
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

/** Swamp extension model for Google Cloud Google Docs Documents. Registered at `@swamp/gcp/docs/documents`. */
export const model = {
  type: "@swamp/gcp/docs/documents",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A Google Docs document.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a documents",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["body"] !== undefined) body["body"] = g["body"];
        if (g["documentStyle"] !== undefined) {
          body["documentStyle"] = g["documentStyle"];
        }
        if (g["namedStyles"] !== undefined) {
          body["namedStyles"] = g["namedStyles"];
        }
        if (g["tabs"] !== undefined) body["tabs"] = g["tabs"];
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["name"] !== undefined) params["documentId"] = String(g["name"]);
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
      description: "Get a documents",
      arguments: z.object({
        identifier: z.string().describe("The name of the documents"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["documentId"] = args.identifier;
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
      description: "Sync documents state from GCP",
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
          params["documentId"] = identifier;
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
        params["documentId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["requests"] !== undefined) body["requests"] = args["requests"];
        if (args["writeControl"] !== undefined) {
          body["writeControl"] = args["writeControl"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "docs.documents.batchUpdate",
            "path": "v1/documents/{documentId}:batchUpdate",
            "httpMethod": "POST",
            "parameterOrder": ["documentId"],
            "parameters": {
              "documentId": { "location": "path", "required": true },
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
