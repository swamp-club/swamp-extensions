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

// Auto-generated extension model for @swamp/gcp/contentwarehouse/documents-referenceid
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Document AI Warehouse Documents.ReferenceId.
 *
 * Defines the structure for content warehouse document proto.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  deleteResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://contentwarehouse.googleapis.com/";

const GET_CONFIG = {
  "id": "contentwarehouse.projects.locations.documents.referenceId.get",
  "path": "v1/{+name}:get",
  "httpMethod": "POST",
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

const PATCH_CONFIG = {
  "id": "contentwarehouse.projects.locations.documents.referenceId.patch",
  "path": "v1/{+name}",
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

const DELETE_CONFIG = {
  "id": "contentwarehouse.projects.locations.documents.referenceId.delete",
  "path": "v1/{+name}:delete",
  "httpMethod": "POST",
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
  cloudAiDocumentOption: z.object({
    customizedEntitiesPropertiesConversions: z.record(z.string(), z.string())
      .describe(
        "If set, only selected entities will be converted to properties.",
      ).optional(),
    enableEntitiesConversions: z.boolean().describe(
      "Whether to convert all the entities to properties.",
    ).optional(),
  }).describe("Request Option for processing Cloud AI Document in CW Document.")
    .optional(),
  document: z.object({
    cloudAiDocument: z.object({
      chunkedDocument: z.object({
        chunks: z.array(z.object({
          chunkId: z.unknown().describe("ID of the chunk.").optional(),
          content: z.unknown().describe("Text content of the chunk.")
            .optional(),
          pageFooters: z.unknown().describe(
            "Page footers associated with the chunk.",
          ).optional(),
          pageHeaders: z.unknown().describe(
            "Page headers associated with the chunk.",
          ).optional(),
          pageSpan: z.unknown().describe(
            "Represents where the chunk starts and ends in the document.",
          ).optional(),
          sourceBlockIds: z.unknown().describe("Unused.").optional(),
        })).describe("List of chunks.").optional(),
      }).describe("Represents the chunks that the document is divided into.")
        .optional(),
      content: z.string().describe(
        "Optional. Inline document content, represented as a stream of bytes. Note: As with all `bytes` fields, protobuffers use a pure binary representation, whereas JSON representations use base64.",
      ).optional(),
      documentLayout: z.object({
        blocks: z.array(z.object({
          blockId: z.unknown().describe("ID of the block.").optional(),
          listBlock: z.unknown().describe("Represents a list type block.")
            .optional(),
          pageSpan: z.unknown().describe(
            "Represents where the block starts and ends in the document.",
          ).optional(),
          tableBlock: z.unknown().describe("Represents a table type block.")
            .optional(),
          textBlock: z.unknown().describe("Represents a text type block.")
            .optional(),
        })).describe("List of blocks in the document.").optional(),
      }).describe(
        "Represents the parsed layout of a document as a collection of blocks that the document is divided into.",
      ).optional(),
      entities: z.array(z.object({
        confidence: z.number().describe(
          "Optional. Confidence of detected Schema entity. Range `[0, 1]`.",
        ).optional(),
        id: z.string().describe(
          "Optional. Canonical id. This will be a unique value in the entity list for this document.",
        ).optional(),
        mentionId: z.string().describe(
          "Optional. Deprecated. Use `id` field instead.",
        ).optional(),
        mentionText: z.string().describe(
          "Optional. Text value of the entity e.g. `1600 Amphitheatre Pkwy`.",
        ).optional(),
        normalizedValue: z.object({
          addressValue: z.unknown().describe(
            "Represents a postal address. For example for postal delivery or payments addresses. Given a postal address, a postal service can deliver items to a premise, P.O. Box or similar. It is not intended to model geographical locations (roads, towns, mountains). In typical usage an address would be created by user input or from importing existing data, depending on the type of process. Advice on address input / editing: - Use an internationalization-ready address widget such as https://github.com/google/libaddressinput) - Users should not be presented with UI elements for input or editing of fields outside countries where that field is used. For more guidance on how to use this schema, see: https://support.google.com/business/answer/6397478",
          ).optional(),
          booleanValue: z.unknown().describe(
            "Boolean value. Can be used for entities with binary values, or for checkboxes.",
          ).optional(),
          dateValue: z.unknown().describe(
            "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
          ).optional(),
          datetimeValue: z.unknown().describe(
            "Represents civil time (or occasionally physical time). This type can represent a civil time in one of a few possible ways: * When utc_offset is set and time_zone is unset: a civil time on a calendar day with a particular offset from UTC. * When time_zone is set and utc_offset is unset: a civil time on a calendar day in a particular time zone. * When neither time_zone nor utc_offset is set: a civil time on a calendar day in local time. The date is relative to the Proleptic Gregorian Calendar. If year, month, or day are 0, the DateTime is considered not to have a specific year, month, or day respectively. This type may also be used to represent a physical time if all the date and time fields are set and either case of the `time_offset` oneof is set. Consider using `Timestamp` message for physical time instead. If your use case also would like to store the user's timezone, that can be done in another field. This type is more flexible than some applications may want. Make sure to document and validate your application's limitations.",
          ).optional(),
          floatValue: z.unknown().describe("Float value.").optional(),
          integerValue: z.unknown().describe("Integer value.").optional(),
          moneyValue: z.unknown().describe(
            "Represents an amount of money with its currency type.",
          ).optional(),
          text: z.unknown().describe(
            "Optional. An optional field to store a normalized string. For some entity types, one of respective `structured_value` fields may also be populated. Also not all the types of `structured_value` will be normalized. For example, some processors may not generate `float` or `integer` normalized text by default. Below are sample formats mapped to structured values. - Money/Currency type (`money_value`) is in the ISO 4217 text format. - Date type (`date_value`) is in the ISO 8601 text format. - Datetime type (`datetime_value`) is in the ISO 8601 text format.",
          ).optional(),
        }).describe("Parsed and normalized entity value.").optional(),
        pageAnchor: z.object({
          pageRefs: z.unknown().describe(
            "One or more references to visual page elements",
          ).optional(),
        }).describe(
          "Referencing the visual context of the entity in the Document.pages. Page anchors can be cross-page, consist of multiple bounding polygons and optionally reference specific layout element types.",
        ).optional(),
        properties: z.array(z.unknown()).describe(
          "Optional. Entities can be nested to form a hierarchical data structure representing the content in the document.",
        ).optional(),
        provenance: z.object({
          id: z.unknown().describe(
            "The Id of this operation. Needs to be unique within the scope of the revision.",
          ).optional(),
          parents: z.unknown().describe(
            "References to the original elements that are replaced.",
          ).optional(),
          revision: z.unknown().describe(
            "The index of the revision that produced this element.",
          ).optional(),
          type: z.unknown().describe("The type of provenance operation.")
            .optional(),
        }).describe(
          "Structure to identify provenance relationships between annotations in different revisions.",
        ).optional(),
        redacted: z.boolean().describe(
          "Optional. Whether the entity will be redacted for de-identification purposes.",
        ).optional(),
        textAnchor: z.object({
          content: z.unknown().describe(
            "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
          ).optional(),
          textSegments: z.unknown().describe(
            "The text segments from the Document.text.",
          ).optional(),
        }).describe("Text reference indexing into the Document.text.")
          .optional(),
        type: z.string().describe(
          "Required. Entity type from a schema e.g. `Address`.",
        ).optional(),
      })).describe(
        "A list of entities detected on Document.text. For document shards, entities in this list may cross shard boundaries.",
      ).optional(),
      entityRelations: z.array(z.object({
        objectId: z.string().describe("Object entity id.").optional(),
        relation: z.string().describe("Relationship description.").optional(),
        subjectId: z.string().describe("Subject entity id.").optional(),
      })).describe("Placeholder. Relationship among Document.entities.")
        .optional(),
      error: z.object({
        code: z.number().int().describe(
          "The status code, which should be an enum value of google.rpc.Code.",
        ).optional(),
        details: z.array(z.record(z.string(), z.unknown())).describe(
          "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
        ).optional(),
        message: z.string().describe(
          "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
        ).optional(),
      }).describe(
        "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
      ).optional(),
      mimeType: z.string().describe(
        "An IANA published [media type (MIME type)](https://www.iana.org/assignments/media-types/media-types.xhtml).",
      ).optional(),
      pages: z.array(z.object({
        blocks: z.array(z.unknown()).describe(
          "A list of visually detected text blocks on the page. A block has a set of lines (collected into paragraphs) that have a common line-spacing and orientation.",
        ).optional(),
        detectedBarcodes: z.array(z.unknown()).describe(
          "A list of detected barcodes.",
        ).optional(),
        detectedLanguages: z.array(z.unknown()).describe(
          "A list of detected languages together with confidence.",
        ).optional(),
        dimension: z.object({
          height: z.unknown().describe("Page height.").optional(),
          unit: z.unknown().describe("Dimension unit.").optional(),
          width: z.unknown().describe("Page width.").optional(),
        }).describe("Dimension for the page.").optional(),
        formFields: z.array(z.unknown()).describe(
          "A list of visually detected form fields on the page.",
        ).optional(),
        image: z.object({
          content: z.unknown().describe("Raw byte content of the image.")
            .optional(),
          height: z.unknown().describe("Height of the image in pixels.")
            .optional(),
          mimeType: z.unknown().describe(
            "Encoding [media type (MIME type)](https://www.iana.org/assignments/media-types/media-types.xhtml) for the image.",
          ).optional(),
          width: z.unknown().describe("Width of the image in pixels.")
            .optional(),
        }).describe("Rendered image contents for this page.").optional(),
        imageQualityScores: z.object({
          detectedDefects: z.unknown().describe("A list of detected defects.")
            .optional(),
          qualityScore: z.unknown().describe(
            "The overall quality score. Range `[0, 1]` where `1` is perfect quality.",
          ).optional(),
        }).describe("Image quality scores for the page image.").optional(),
        layout: z.object({
          boundingPoly: z.unknown().describe(
            "A bounding polygon for the detected image annotation.",
          ).optional(),
          confidence: z.unknown().describe(
            "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
          ).optional(),
          orientation: z.unknown().describe(
            "Detected orientation for the Layout.",
          ).optional(),
          textAnchor: z.unknown().describe(
            "Text reference indexing into the Document.text.",
          ).optional(),
        }).describe("Visual element describing a layout unit on a page.")
          .optional(),
        lines: z.array(z.unknown()).describe(
          "A list of visually detected text lines on the page. A collection of tokens that a human would perceive as a line.",
        ).optional(),
        pageNumber: z.number().int().describe(
          "1-based index for current Page in a parent Document. Useful when a page is taken out of a Document for individual processing.",
        ).optional(),
        paragraphs: z.array(z.unknown()).describe(
          "A list of visually detected text paragraphs on the page. A collection of lines that a human would perceive as a paragraph.",
        ).optional(),
        provenance: z.object({
          id: z.unknown().describe(
            "The Id of this operation. Needs to be unique within the scope of the revision.",
          ).optional(),
          parents: z.unknown().describe(
            "References to the original elements that are replaced.",
          ).optional(),
          revision: z.unknown().describe(
            "The index of the revision that produced this element.",
          ).optional(),
          type: z.unknown().describe("The type of provenance operation.")
            .optional(),
        }).describe(
          "Structure to identify provenance relationships between annotations in different revisions.",
        ).optional(),
        symbols: z.array(z.unknown()).describe(
          "A list of visually detected symbols on the page.",
        ).optional(),
        tables: z.array(z.unknown()).describe(
          "A list of visually detected tables on the page.",
        ).optional(),
        tokens: z.array(z.unknown()).describe(
          "A list of visually detected tokens on the page.",
        ).optional(),
        transforms: z.array(z.unknown()).describe(
          "Transformation matrices that were applied to the original document image to produce Page.image.",
        ).optional(),
        visualElements: z.array(z.unknown()).describe(
          "A list of detected non-text visual elements e.g. checkbox, signature etc. on the page.",
        ).optional(),
      })).describe("Visual page layout for the Document.").optional(),
      revisions: z.array(z.object({
        agent: z.string().describe(
          "If the change was made by a person specify the name or id of that person.",
        ).optional(),
        createTime: z.string().describe(
          "The time that the revision was created, internally generated by doc proto storage at the time of create.",
        ).optional(),
        humanReview: z.object({
          state: z.unknown().describe(
            "Human review state. e.g. `requested`, `succeeded`, `rejected`.",
          ).optional(),
          stateMessage: z.unknown().describe(
            "A message providing more details about the current state of processing. For example, the rejection reason when the state is `rejected`.",
          ).optional(),
        }).describe("Human Review information of the document.").optional(),
        id: z.string().describe(
          "Id of the revision, internally generated by doc proto storage. Unique within the context of the document.",
        ).optional(),
        parent: z.array(z.unknown()).describe(
          "The revisions that this revision is based on. This can include one or more parent (when documents are merged.) This field represents the index into the `revisions` field.",
        ).optional(),
        parentIds: z.array(z.unknown()).describe(
          "The revisions that this revision is based on. Must include all the ids that have anything to do with this revision - eg. there are `provenance.parent.revision` fields that index into this field.",
        ).optional(),
        processor: z.string().describe(
          "If the annotation was made by processor identify the processor by its resource name.",
        ).optional(),
      })).describe("Placeholder. Revision history of this document.")
        .optional(),
      shardInfo: z.object({
        shardCount: z.string().describe("Total number of shards.").optional(),
        shardIndex: z.string().describe("The 0-based index of this shard.")
          .optional(),
        textOffset: z.string().describe(
          "The index of the first character in Document.text in the overall document global text.",
        ).optional(),
      }).describe(
        "For a large document, sharding may be performed to produce several document shards. Each document shard contains this field to detail which shard it is.",
      ).optional(),
      text: z.string().describe(
        "Optional. UTF-8 encoded text in reading order from the document.",
      ).optional(),
      textChanges: z.array(z.object({
        changedText: z.string().describe(
          "The text that replaces the text identified in the `text_anchor`.",
        ).optional(),
        provenance: z.array(z.unknown()).describe(
          "The history of this annotation.",
        ).optional(),
        textAnchor: z.object({
          content: z.unknown().describe(
            "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
          ).optional(),
          textSegments: z.unknown().describe(
            "The text segments from the Document.text.",
          ).optional(),
        }).describe("Text reference indexing into the Document.text.")
          .optional(),
      })).describe(
        "Placeholder. A list of text corrections made to Document.text. This is usually used for annotating corrections to OCR mistakes. Text changes for a given revision may not overlap with each other.",
      ).optional(),
      textStyles: z.array(z.object({
        backgroundColor: z.object({
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
          "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
        ).optional(),
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
        }).describe(
          "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
        ).optional(),
        fontFamily: z.string().describe(
          "Font family such as `Arial`, `Times New Roman`. https://www.w3schools.com/cssref/pr_font_font-family.asp",
        ).optional(),
        fontSize: z.object({
          size: z.unknown().describe("Font size for the text.").optional(),
          unit: z.unknown().describe(
            "Unit for the font size. Follows CSS naming (such as `in`, `px`, and `pt`).",
          ).optional(),
        }).describe("Font size with unit.").optional(),
        fontWeight: z.string().describe(
          "[Font weight](https://www.w3schools.com/cssref/pr_font_weight.asp). Possible values are `normal`, `bold`, `bolder`, and `lighter`.",
        ).optional(),
        textAnchor: z.object({
          content: z.unknown().describe(
            "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
          ).optional(),
          textSegments: z.unknown().describe(
            "The text segments from the Document.text.",
          ).optional(),
        }).describe("Text reference indexing into the Document.text.")
          .optional(),
        textDecoration: z.string().describe(
          "[Text decoration](https://www.w3schools.com/cssref/pr_text_text-decoration.asp). Follows CSS standard.",
        ).optional(),
        textStyle: z.string().describe(
          "[Text style](https://www.w3schools.com/cssref/pr_font_font-style.asp). Possible values are `normal`, `italic`, and `oblique`.",
        ).optional(),
      })).describe("Styles for the Document.text.").optional(),
      uri: z.string().describe(
        "Optional. Currently supports Google Cloud Storage URI of the form `gs://bucket_name/object_name`. Object versioning is not supported. For more information, refer to [Google Cloud Storage Request URIs](https://cloud.google.com/storage/docs/reference-uris).",
      ).optional(),
    }).describe(
      "Document represents the canonical document resource in Document AI. It is an interchange format that provides insights into documents and allows for collaboration between users and Document AI to iterate and optimize for quality.",
    ).optional(),
    contentCategory: z.enum([
      "CONTENT_CATEGORY_UNSPECIFIED",
      "CONTENT_CATEGORY_IMAGE",
      "CONTENT_CATEGORY_AUDIO",
      "CONTENT_CATEGORY_VIDEO",
    ]).describe(
      "Indicates the category (image, audio, video etc.) of the original content.",
    ).optional(),
    createTime: z.string().describe(
      "Output only. The time when the document is created.",
    ).optional(),
    creator: z.string().describe("The user who creates the document.")
      .optional(),
    displayName: z.string().describe(
      "Required. Display name of the document given by the user. This name will be displayed in the UI. Customer can populate this field with the name of the document. This differs from the 'title' field as 'title' is optional and stores the top heading in the document.",
    ).optional(),
    displayUri: z.string().describe(
      "Uri to display the document, for example, in the UI.",
    ).optional(),
    dispositionTime: z.string().describe(
      "Output only. If linked to a Collection with RetentionPolicy, the date when the document becomes mutable.",
    ).optional(),
    documentSchemaName: z.string().describe(
      "The Document schema name. Format: projects/{project_number}/locations/{location}/documentSchemas/{document_schema_id}.",
    ).optional(),
    inlineRawDocument: z.string().describe("Raw document content.").optional(),
    legalHold: z.boolean().describe(
      "Output only. Indicates if the document has a legal hold on it.",
    ).optional(),
    name: z.string().describe(
      "The resource name of the document. Format: projects/{project_number}/locations/{location}/documents/{document_id}. The name is ignored when creating a document.",
    ).optional(),
    plainText: z.string().describe("Other document format, such as PPTX, XLXS")
      .optional(),
    properties: z.array(z.object({
      dateTimeValues: z.object({
        values: z.array(z.unknown()).describe(
          "List of datetime values. Both OffsetDateTime and ZonedDateTime are supported.",
        ).optional(),
      }).describe("DateTime values.").optional(),
      enumValues: z.object({
        values: z.array(z.unknown()).describe("List of enum values.")
          .optional(),
      }).describe("Enum values.").optional(),
      floatValues: z.object({
        values: z.array(z.unknown()).describe("List of float values.")
          .optional(),
      }).describe("Float values.").optional(),
      integerValues: z.object({
        values: z.array(z.unknown()).describe("List of integer values.")
          .optional(),
      }).describe("Integer values.").optional(),
      mapProperty: z.object({
        fields: z.record(z.string(), z.unknown()).describe(
          "Unordered map of dynamically typed values.",
        ).optional(),
      }).describe(
        "Map property value. Represents a structured entries of key value pairs, consisting of field names which map to dynamically typed values.",
      ).optional(),
      name: z.string().describe(
        "Required. Must match the name of a PropertyDefinition in the DocumentSchema.",
      ).optional(),
      propertyValues: z.object({
        properties: z.array(z.unknown()).describe("List of property values.")
          .optional(),
      }).describe("Property values.").optional(),
      textValues: z.object({
        values: z.array(z.unknown()).describe("List of text values.")
          .optional(),
      }).describe("String/text values.").optional(),
      timestampValues: z.object({
        values: z.array(z.unknown()).describe("List of timestamp values.")
          .optional(),
      }).describe("Timestamp values.").optional(),
    })).describe("List of values that are user supplied metadata.").optional(),
    rawDocumentFileType: z.enum([
      "RAW_DOCUMENT_FILE_TYPE_UNSPECIFIED",
      "RAW_DOCUMENT_FILE_TYPE_PDF",
      "RAW_DOCUMENT_FILE_TYPE_DOCX",
      "RAW_DOCUMENT_FILE_TYPE_XLSX",
      "RAW_DOCUMENT_FILE_TYPE_PPTX",
      "RAW_DOCUMENT_FILE_TYPE_TEXT",
      "RAW_DOCUMENT_FILE_TYPE_TIFF",
    ]).describe(
      "This is used when DocAI was not used to load the document and parsing/ extracting is needed for the inline_raw_document. For example, if inline_raw_document is the byte representation of a PDF file, then this should be set to: RAW_DOCUMENT_FILE_TYPE_PDF.",
    ).optional(),
    rawDocumentPath: z.string().describe(
      "Raw document file in Cloud Storage path.",
    ).optional(),
    referenceId: z.string().describe(
      "The reference ID set by customers. Must be unique per project and location.",
    ).optional(),
    textExtractionDisabled: z.boolean().describe(
      "If true, text extraction will not be performed.",
    ).optional(),
    textExtractionEnabled: z.boolean().describe(
      "If true, text extraction will be performed.",
    ).optional(),
    title: z.string().describe(
      "Title that describes the document. This can be the top heading or text that describes the document.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The time when the document is last updated.",
    ).optional(),
    updater: z.string().describe("The user who lastly updates the document.")
      .optional(),
  }).describe("Defines the structure for content warehouse document proto.")
    .optional(),
  requestMetadata: z.object({
    userInfo: z.object({
      groupIds: z.array(z.string()).describe(
        'The unique group identifications which the user is belong to. The format is "group:yyyy@example.com";',
      ).optional(),
      id: z.string().describe(
        'A unique user identification string, as determined by the client. The maximum number of allowed characters is 255. Allowed characters include numbers 0 to 9, uppercase and lowercase letters, and restricted special symbols (:, @, +, -, _, ~) The format is "user:xxxx@example.com";',
      ).optional(),
    }).describe("The user information.").optional(),
  }).describe(
    "Meta information is used to improve the performance of the service.",
  ).optional(),
  updateOptions: z.object({
    mergeFieldsOptions: z.object({
      replaceMessageFields: z.boolean().describe(
        "When merging message fields, the default behavior is to merge the content of two message fields together. If you instead want to use the field from the source message to replace the corresponding field in the destination message, set this flag to true. When this flag is set, specified submessage fields that are missing in source will be cleared in destination.",
      ).optional(),
      replaceRepeatedFields: z.boolean().describe(
        "When merging repeated fields, the default behavior is to append entries from the source repeated field to the destination repeated field. If you instead want to keep only the entries from the source repeated field, set this flag to true. If you want to replace a repeated field within a message field on the destination message, you must set both replace_repeated_fields and replace_message_fields to true, otherwise the repeated fields will be appended.",
      ).optional(),
    }).describe("Options for merging updated fields.").optional(),
    updateMask: z.string().describe(
      "Field mask for merging Document fields. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask",
    ).optional(),
    updateType: z.enum([
      "UPDATE_TYPE_UNSPECIFIED",
      "UPDATE_TYPE_REPLACE",
      "UPDATE_TYPE_MERGE",
      "UPDATE_TYPE_INSERT_PROPERTIES_BY_NAMES",
      "UPDATE_TYPE_REPLACE_PROPERTIES_BY_NAMES",
      "UPDATE_TYPE_DELETE_PROPERTIES_BY_NAMES",
      "UPDATE_TYPE_MERGE_AND_REPLACE_OR_INSERT_PROPERTIES_BY_NAMES",
    ]).describe("Type for update.").optional(),
  }).describe("Options for Update operations.").optional(),
});

const StateSchema = z.object({
  cloudAiDocument: z.object({
    chunkedDocument: z.object({
      chunks: z.array(z.object({
        chunkId: z.string(),
        content: z.string(),
        pageFooters: z.array(z.unknown()),
        pageHeaders: z.array(z.unknown()),
        pageSpan: z.object({
          pageEnd: z.unknown(),
          pageStart: z.unknown(),
        }),
        sourceBlockIds: z.array(z.unknown()),
      })),
    }),
    content: z.string(),
    documentLayout: z.object({
      blocks: z.array(z.object({
        blockId: z.string(),
        listBlock: z.object({
          listEntries: z.unknown(),
          type: z.unknown(),
        }),
        pageSpan: z.object({
          pageEnd: z.unknown(),
          pageStart: z.unknown(),
        }),
        tableBlock: z.object({
          bodyRows: z.unknown(),
          caption: z.unknown(),
          headerRows: z.unknown(),
        }),
        textBlock: z.object({
          blocks: z.unknown(),
          text: z.unknown(),
          type: z.unknown(),
        }),
      })),
    }),
    entities: z.array(z.object({
      confidence: z.number(),
      id: z.string(),
      mentionId: z.string(),
      mentionText: z.string(),
      normalizedValue: z.object({
        addressValue: z.object({
          addressLines: z.unknown(),
          administrativeArea: z.unknown(),
          languageCode: z.unknown(),
          locality: z.unknown(),
          organization: z.unknown(),
          postalCode: z.unknown(),
          recipients: z.unknown(),
          regionCode: z.unknown(),
          revision: z.unknown(),
          sortingCode: z.unknown(),
          sublocality: z.unknown(),
        }),
        booleanValue: z.boolean(),
        dateValue: z.object({
          day: z.unknown(),
          month: z.unknown(),
          year: z.unknown(),
        }),
        datetimeValue: z.object({
          day: z.unknown(),
          hours: z.unknown(),
          minutes: z.unknown(),
          month: z.unknown(),
          nanos: z.unknown(),
          seconds: z.unknown(),
          timeZone: z.unknown(),
          utcOffset: z.unknown(),
          year: z.unknown(),
        }),
        floatValue: z.number(),
        integerValue: z.number(),
        moneyValue: z.object({
          currencyCode: z.unknown(),
          nanos: z.unknown(),
          units: z.unknown(),
        }),
        text: z.string(),
      }),
      pageAnchor: z.object({
        pageRefs: z.array(z.unknown()),
      }),
      properties: z.array(z.record(z.string(), z.unknown())),
      provenance: z.object({
        id: z.number(),
        parents: z.array(z.unknown()),
        revision: z.number(),
        type: z.string(),
      }),
      redacted: z.boolean(),
      textAnchor: z.object({
        content: z.string(),
        textSegments: z.array(z.unknown()),
      }),
      type: z.string(),
    })),
    entityRelations: z.array(z.object({
      objectId: z.string(),
      relation: z.string(),
      subjectId: z.string(),
    })),
    error: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    mimeType: z.string(),
    pages: z.array(z.object({
      blocks: z.array(z.object({
        detectedLanguages: z.unknown(),
        layout: z.unknown(),
        provenance: z.unknown(),
      })),
      detectedBarcodes: z.array(z.object({
        barcode: z.unknown(),
        layout: z.unknown(),
      })),
      detectedLanguages: z.array(z.object({
        confidence: z.unknown(),
        languageCode: z.unknown(),
      })),
      dimension: z.object({
        height: z.number(),
        unit: z.string(),
        width: z.number(),
      }),
      formFields: z.array(z.object({
        correctedKeyText: z.unknown(),
        correctedValueText: z.unknown(),
        fieldName: z.unknown(),
        fieldValue: z.unknown(),
        nameDetectedLanguages: z.unknown(),
        provenance: z.unknown(),
        valueDetectedLanguages: z.unknown(),
        valueType: z.unknown(),
      })),
      image: z.object({
        content: z.string(),
        height: z.number(),
        mimeType: z.string(),
        width: z.number(),
      }),
      imageQualityScores: z.object({
        detectedDefects: z.array(z.unknown()),
        qualityScore: z.number(),
      }),
      layout: z.object({
        boundingPoly: z.object({
          normalizedVertices: z.unknown(),
          vertices: z.unknown(),
        }),
        confidence: z.number(),
        orientation: z.string(),
        textAnchor: z.object({
          content: z.unknown(),
          textSegments: z.unknown(),
        }),
      }),
      lines: z.array(z.object({
        detectedLanguages: z.unknown(),
        layout: z.unknown(),
        provenance: z.unknown(),
      })),
      pageNumber: z.number(),
      paragraphs: z.array(z.object({
        detectedLanguages: z.unknown(),
        layout: z.unknown(),
        provenance: z.unknown(),
      })),
      provenance: z.object({
        id: z.number(),
        parents: z.array(z.unknown()),
        revision: z.number(),
        type: z.string(),
      }),
      symbols: z.array(z.object({
        detectedLanguages: z.unknown(),
        layout: z.unknown(),
      })),
      tables: z.array(z.object({
        bodyRows: z.unknown(),
        detectedLanguages: z.unknown(),
        headerRows: z.unknown(),
        layout: z.unknown(),
        provenance: z.unknown(),
      })),
      tokens: z.array(z.object({
        detectedBreak: z.unknown(),
        detectedLanguages: z.unknown(),
        layout: z.unknown(),
        provenance: z.unknown(),
        styleInfo: z.unknown(),
      })),
      transforms: z.array(z.object({
        cols: z.unknown(),
        data: z.unknown(),
        rows: z.unknown(),
        type: z.unknown(),
      })),
      visualElements: z.array(z.object({
        detectedLanguages: z.unknown(),
        layout: z.unknown(),
        type: z.unknown(),
      })),
    })),
    revisions: z.array(z.object({
      agent: z.string(),
      createTime: z.string(),
      humanReview: z.object({
        state: z.string(),
        stateMessage: z.string(),
      }),
      id: z.string(),
      parent: z.array(z.number()),
      parentIds: z.array(z.string()),
      processor: z.string(),
    })),
    shardInfo: z.object({
      shardCount: z.string(),
      shardIndex: z.string(),
      textOffset: z.string(),
    }),
    text: z.string(),
    textChanges: z.array(z.object({
      changedText: z.string(),
      provenance: z.array(z.object({
        id: z.unknown(),
        parents: z.unknown(),
        revision: z.unknown(),
        type: z.unknown(),
      })),
      textAnchor: z.object({
        content: z.string(),
        textSegments: z.array(z.unknown()),
      }),
    })),
    textStyles: z.array(z.object({
      backgroundColor: z.object({
        alpha: z.number(),
        blue: z.number(),
        green: z.number(),
        red: z.number(),
      }),
      color: z.object({
        alpha: z.number(),
        blue: z.number(),
        green: z.number(),
        red: z.number(),
      }),
      fontFamily: z.string(),
      fontSize: z.object({
        size: z.number(),
        unit: z.string(),
      }),
      fontWeight: z.string(),
      textAnchor: z.object({
        content: z.string(),
        textSegments: z.array(z.unknown()),
      }),
      textDecoration: z.string(),
      textStyle: z.string(),
    })),
    uri: z.string(),
  }).optional(),
  contentCategory: z.string().optional(),
  createTime: z.string().optional(),
  creator: z.string().optional(),
  displayName: z.string().optional(),
  displayUri: z.string().optional(),
  dispositionTime: z.string().optional(),
  documentSchemaName: z.string().optional(),
  inlineRawDocument: z.string().optional(),
  legalHold: z.boolean().optional(),
  name: z.string(),
  plainText: z.string().optional(),
  properties: z.array(z.object({
    dateTimeValues: z.object({
      values: z.array(z.object({
        day: z.unknown(),
        hours: z.unknown(),
        minutes: z.unknown(),
        month: z.unknown(),
        nanos: z.unknown(),
        seconds: z.unknown(),
        timeZone: z.unknown(),
        utcOffset: z.unknown(),
        year: z.unknown(),
      })),
    }),
    enumValues: z.object({
      values: z.array(z.string()),
    }),
    floatValues: z.object({
      values: z.array(z.number()),
    }),
    integerValues: z.object({
      values: z.array(z.number()),
    }),
    mapProperty: z.object({
      fields: z.record(z.string(), z.unknown()),
    }),
    name: z.string(),
    propertyValues: z.object({
      properties: z.array(z.record(z.string(), z.unknown())),
    }),
    textValues: z.object({
      values: z.array(z.string()),
    }),
    timestampValues: z.object({
      values: z.array(z.object({
        textValue: z.unknown(),
        timestampValue: z.unknown(),
      })),
    }),
  })).optional(),
  rawDocumentFileType: z.string().optional(),
  rawDocumentPath: z.string().optional(),
  referenceId: z.string().optional(),
  textExtractionDisabled: z.boolean().optional(),
  textExtractionEnabled: z.boolean().optional(),
  title: z.string().optional(),
  updateTime: z.string().optional(),
  updater: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  cloudAiDocumentOption: z.object({
    customizedEntitiesPropertiesConversions: z.record(z.string(), z.string())
      .describe(
        "If set, only selected entities will be converted to properties.",
      ).optional(),
    enableEntitiesConversions: z.boolean().describe(
      "Whether to convert all the entities to properties.",
    ).optional(),
  }).describe("Request Option for processing Cloud AI Document in CW Document.")
    .optional(),
  document: z.object({
    cloudAiDocument: z.object({
      chunkedDocument: z.object({
        chunks: z.array(z.object({
          chunkId: z.unknown().describe("ID of the chunk.").optional(),
          content: z.unknown().describe("Text content of the chunk.")
            .optional(),
          pageFooters: z.unknown().describe(
            "Page footers associated with the chunk.",
          ).optional(),
          pageHeaders: z.unknown().describe(
            "Page headers associated with the chunk.",
          ).optional(),
          pageSpan: z.unknown().describe(
            "Represents where the chunk starts and ends in the document.",
          ).optional(),
          sourceBlockIds: z.unknown().describe("Unused.").optional(),
        })).describe("List of chunks.").optional(),
      }).describe("Represents the chunks that the document is divided into.")
        .optional(),
      content: z.string().describe(
        "Optional. Inline document content, represented as a stream of bytes. Note: As with all `bytes` fields, protobuffers use a pure binary representation, whereas JSON representations use base64.",
      ).optional(),
      documentLayout: z.object({
        blocks: z.array(z.object({
          blockId: z.unknown().describe("ID of the block.").optional(),
          listBlock: z.unknown().describe("Represents a list type block.")
            .optional(),
          pageSpan: z.unknown().describe(
            "Represents where the block starts and ends in the document.",
          ).optional(),
          tableBlock: z.unknown().describe("Represents a table type block.")
            .optional(),
          textBlock: z.unknown().describe("Represents a text type block.")
            .optional(),
        })).describe("List of blocks in the document.").optional(),
      }).describe(
        "Represents the parsed layout of a document as a collection of blocks that the document is divided into.",
      ).optional(),
      entities: z.array(z.object({
        confidence: z.number().describe(
          "Optional. Confidence of detected Schema entity. Range `[0, 1]`.",
        ).optional(),
        id: z.string().describe(
          "Optional. Canonical id. This will be a unique value in the entity list for this document.",
        ).optional(),
        mentionId: z.string().describe(
          "Optional. Deprecated. Use `id` field instead.",
        ).optional(),
        mentionText: z.string().describe(
          "Optional. Text value of the entity e.g. `1600 Amphitheatre Pkwy`.",
        ).optional(),
        normalizedValue: z.object({
          addressValue: z.unknown().describe(
            "Represents a postal address. For example for postal delivery or payments addresses. Given a postal address, a postal service can deliver items to a premise, P.O. Box or similar. It is not intended to model geographical locations (roads, towns, mountains). In typical usage an address would be created by user input or from importing existing data, depending on the type of process. Advice on address input / editing: - Use an internationalization-ready address widget such as https://github.com/google/libaddressinput) - Users should not be presented with UI elements for input or editing of fields outside countries where that field is used. For more guidance on how to use this schema, see: https://support.google.com/business/answer/6397478",
          ).optional(),
          booleanValue: z.unknown().describe(
            "Boolean value. Can be used for entities with binary values, or for checkboxes.",
          ).optional(),
          dateValue: z.unknown().describe(
            "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
          ).optional(),
          datetimeValue: z.unknown().describe(
            "Represents civil time (or occasionally physical time). This type can represent a civil time in one of a few possible ways: * When utc_offset is set and time_zone is unset: a civil time on a calendar day with a particular offset from UTC. * When time_zone is set and utc_offset is unset: a civil time on a calendar day in a particular time zone. * When neither time_zone nor utc_offset is set: a civil time on a calendar day in local time. The date is relative to the Proleptic Gregorian Calendar. If year, month, or day are 0, the DateTime is considered not to have a specific year, month, or day respectively. This type may also be used to represent a physical time if all the date and time fields are set and either case of the `time_offset` oneof is set. Consider using `Timestamp` message for physical time instead. If your use case also would like to store the user's timezone, that can be done in another field. This type is more flexible than some applications may want. Make sure to document and validate your application's limitations.",
          ).optional(),
          floatValue: z.unknown().describe("Float value.").optional(),
          integerValue: z.unknown().describe("Integer value.").optional(),
          moneyValue: z.unknown().describe(
            "Represents an amount of money with its currency type.",
          ).optional(),
          text: z.unknown().describe(
            "Optional. An optional field to store a normalized string. For some entity types, one of respective `structured_value` fields may also be populated. Also not all the types of `structured_value` will be normalized. For example, some processors may not generate `float` or `integer` normalized text by default. Below are sample formats mapped to structured values. - Money/Currency type (`money_value`) is in the ISO 4217 text format. - Date type (`date_value`) is in the ISO 8601 text format. - Datetime type (`datetime_value`) is in the ISO 8601 text format.",
          ).optional(),
        }).describe("Parsed and normalized entity value.").optional(),
        pageAnchor: z.object({
          pageRefs: z.unknown().describe(
            "One or more references to visual page elements",
          ).optional(),
        }).describe(
          "Referencing the visual context of the entity in the Document.pages. Page anchors can be cross-page, consist of multiple bounding polygons and optionally reference specific layout element types.",
        ).optional(),
        properties: z.array(z.unknown()).describe(
          "Optional. Entities can be nested to form a hierarchical data structure representing the content in the document.",
        ).optional(),
        provenance: z.object({
          id: z.unknown().describe(
            "The Id of this operation. Needs to be unique within the scope of the revision.",
          ).optional(),
          parents: z.unknown().describe(
            "References to the original elements that are replaced.",
          ).optional(),
          revision: z.unknown().describe(
            "The index of the revision that produced this element.",
          ).optional(),
          type: z.unknown().describe("The type of provenance operation.")
            .optional(),
        }).describe(
          "Structure to identify provenance relationships between annotations in different revisions.",
        ).optional(),
        redacted: z.boolean().describe(
          "Optional. Whether the entity will be redacted for de-identification purposes.",
        ).optional(),
        textAnchor: z.object({
          content: z.unknown().describe(
            "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
          ).optional(),
          textSegments: z.unknown().describe(
            "The text segments from the Document.text.",
          ).optional(),
        }).describe("Text reference indexing into the Document.text.")
          .optional(),
        type: z.string().describe(
          "Required. Entity type from a schema e.g. `Address`.",
        ).optional(),
      })).describe(
        "A list of entities detected on Document.text. For document shards, entities in this list may cross shard boundaries.",
      ).optional(),
      entityRelations: z.array(z.object({
        objectId: z.string().describe("Object entity id.").optional(),
        relation: z.string().describe("Relationship description.").optional(),
        subjectId: z.string().describe("Subject entity id.").optional(),
      })).describe("Placeholder. Relationship among Document.entities.")
        .optional(),
      error: z.object({
        code: z.number().int().describe(
          "The status code, which should be an enum value of google.rpc.Code.",
        ).optional(),
        details: z.array(z.record(z.string(), z.unknown())).describe(
          "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
        ).optional(),
        message: z.string().describe(
          "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
        ).optional(),
      }).describe(
        "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
      ).optional(),
      mimeType: z.string().describe(
        "An IANA published [media type (MIME type)](https://www.iana.org/assignments/media-types/media-types.xhtml).",
      ).optional(),
      pages: z.array(z.object({
        blocks: z.array(z.unknown()).describe(
          "A list of visually detected text blocks on the page. A block has a set of lines (collected into paragraphs) that have a common line-spacing and orientation.",
        ).optional(),
        detectedBarcodes: z.array(z.unknown()).describe(
          "A list of detected barcodes.",
        ).optional(),
        detectedLanguages: z.array(z.unknown()).describe(
          "A list of detected languages together with confidence.",
        ).optional(),
        dimension: z.object({
          height: z.unknown().describe("Page height.").optional(),
          unit: z.unknown().describe("Dimension unit.").optional(),
          width: z.unknown().describe("Page width.").optional(),
        }).describe("Dimension for the page.").optional(),
        formFields: z.array(z.unknown()).describe(
          "A list of visually detected form fields on the page.",
        ).optional(),
        image: z.object({
          content: z.unknown().describe("Raw byte content of the image.")
            .optional(),
          height: z.unknown().describe("Height of the image in pixels.")
            .optional(),
          mimeType: z.unknown().describe(
            "Encoding [media type (MIME type)](https://www.iana.org/assignments/media-types/media-types.xhtml) for the image.",
          ).optional(),
          width: z.unknown().describe("Width of the image in pixels.")
            .optional(),
        }).describe("Rendered image contents for this page.").optional(),
        imageQualityScores: z.object({
          detectedDefects: z.unknown().describe("A list of detected defects.")
            .optional(),
          qualityScore: z.unknown().describe(
            "The overall quality score. Range `[0, 1]` where `1` is perfect quality.",
          ).optional(),
        }).describe("Image quality scores for the page image.").optional(),
        layout: z.object({
          boundingPoly: z.unknown().describe(
            "A bounding polygon for the detected image annotation.",
          ).optional(),
          confidence: z.unknown().describe(
            "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
          ).optional(),
          orientation: z.unknown().describe(
            "Detected orientation for the Layout.",
          ).optional(),
          textAnchor: z.unknown().describe(
            "Text reference indexing into the Document.text.",
          ).optional(),
        }).describe("Visual element describing a layout unit on a page.")
          .optional(),
        lines: z.array(z.unknown()).describe(
          "A list of visually detected text lines on the page. A collection of tokens that a human would perceive as a line.",
        ).optional(),
        pageNumber: z.number().int().describe(
          "1-based index for current Page in a parent Document. Useful when a page is taken out of a Document for individual processing.",
        ).optional(),
        paragraphs: z.array(z.unknown()).describe(
          "A list of visually detected text paragraphs on the page. A collection of lines that a human would perceive as a paragraph.",
        ).optional(),
        provenance: z.object({
          id: z.unknown().describe(
            "The Id of this operation. Needs to be unique within the scope of the revision.",
          ).optional(),
          parents: z.unknown().describe(
            "References to the original elements that are replaced.",
          ).optional(),
          revision: z.unknown().describe(
            "The index of the revision that produced this element.",
          ).optional(),
          type: z.unknown().describe("The type of provenance operation.")
            .optional(),
        }).describe(
          "Structure to identify provenance relationships between annotations in different revisions.",
        ).optional(),
        symbols: z.array(z.unknown()).describe(
          "A list of visually detected symbols on the page.",
        ).optional(),
        tables: z.array(z.unknown()).describe(
          "A list of visually detected tables on the page.",
        ).optional(),
        tokens: z.array(z.unknown()).describe(
          "A list of visually detected tokens on the page.",
        ).optional(),
        transforms: z.array(z.unknown()).describe(
          "Transformation matrices that were applied to the original document image to produce Page.image.",
        ).optional(),
        visualElements: z.array(z.unknown()).describe(
          "A list of detected non-text visual elements e.g. checkbox, signature etc. on the page.",
        ).optional(),
      })).describe("Visual page layout for the Document.").optional(),
      revisions: z.array(z.object({
        agent: z.string().describe(
          "If the change was made by a person specify the name or id of that person.",
        ).optional(),
        createTime: z.string().describe(
          "The time that the revision was created, internally generated by doc proto storage at the time of create.",
        ).optional(),
        humanReview: z.object({
          state: z.unknown().describe(
            "Human review state. e.g. `requested`, `succeeded`, `rejected`.",
          ).optional(),
          stateMessage: z.unknown().describe(
            "A message providing more details about the current state of processing. For example, the rejection reason when the state is `rejected`.",
          ).optional(),
        }).describe("Human Review information of the document.").optional(),
        id: z.string().describe(
          "Id of the revision, internally generated by doc proto storage. Unique within the context of the document.",
        ).optional(),
        parent: z.array(z.unknown()).describe(
          "The revisions that this revision is based on. This can include one or more parent (when documents are merged.) This field represents the index into the `revisions` field.",
        ).optional(),
        parentIds: z.array(z.unknown()).describe(
          "The revisions that this revision is based on. Must include all the ids that have anything to do with this revision - eg. there are `provenance.parent.revision` fields that index into this field.",
        ).optional(),
        processor: z.string().describe(
          "If the annotation was made by processor identify the processor by its resource name.",
        ).optional(),
      })).describe("Placeholder. Revision history of this document.")
        .optional(),
      shardInfo: z.object({
        shardCount: z.string().describe("Total number of shards.").optional(),
        shardIndex: z.string().describe("The 0-based index of this shard.")
          .optional(),
        textOffset: z.string().describe(
          "The index of the first character in Document.text in the overall document global text.",
        ).optional(),
      }).describe(
        "For a large document, sharding may be performed to produce several document shards. Each document shard contains this field to detail which shard it is.",
      ).optional(),
      text: z.string().describe(
        "Optional. UTF-8 encoded text in reading order from the document.",
      ).optional(),
      textChanges: z.array(z.object({
        changedText: z.string().describe(
          "The text that replaces the text identified in the `text_anchor`.",
        ).optional(),
        provenance: z.array(z.unknown()).describe(
          "The history of this annotation.",
        ).optional(),
        textAnchor: z.object({
          content: z.unknown().describe(
            "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
          ).optional(),
          textSegments: z.unknown().describe(
            "The text segments from the Document.text.",
          ).optional(),
        }).describe("Text reference indexing into the Document.text.")
          .optional(),
      })).describe(
        "Placeholder. A list of text corrections made to Document.text. This is usually used for annotating corrections to OCR mistakes. Text changes for a given revision may not overlap with each other.",
      ).optional(),
      textStyles: z.array(z.object({
        backgroundColor: z.object({
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
          "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
        ).optional(),
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
        }).describe(
          "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
        ).optional(),
        fontFamily: z.string().describe(
          "Font family such as `Arial`, `Times New Roman`. https://www.w3schools.com/cssref/pr_font_font-family.asp",
        ).optional(),
        fontSize: z.object({
          size: z.unknown().describe("Font size for the text.").optional(),
          unit: z.unknown().describe(
            "Unit for the font size. Follows CSS naming (such as `in`, `px`, and `pt`).",
          ).optional(),
        }).describe("Font size with unit.").optional(),
        fontWeight: z.string().describe(
          "[Font weight](https://www.w3schools.com/cssref/pr_font_weight.asp). Possible values are `normal`, `bold`, `bolder`, and `lighter`.",
        ).optional(),
        textAnchor: z.object({
          content: z.unknown().describe(
            "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
          ).optional(),
          textSegments: z.unknown().describe(
            "The text segments from the Document.text.",
          ).optional(),
        }).describe("Text reference indexing into the Document.text.")
          .optional(),
        textDecoration: z.string().describe(
          "[Text decoration](https://www.w3schools.com/cssref/pr_text_text-decoration.asp). Follows CSS standard.",
        ).optional(),
        textStyle: z.string().describe(
          "[Text style](https://www.w3schools.com/cssref/pr_font_font-style.asp). Possible values are `normal`, `italic`, and `oblique`.",
        ).optional(),
      })).describe("Styles for the Document.text.").optional(),
      uri: z.string().describe(
        "Optional. Currently supports Google Cloud Storage URI of the form `gs://bucket_name/object_name`. Object versioning is not supported. For more information, refer to [Google Cloud Storage Request URIs](https://cloud.google.com/storage/docs/reference-uris).",
      ).optional(),
    }).describe(
      "Document represents the canonical document resource in Document AI. It is an interchange format that provides insights into documents and allows for collaboration between users and Document AI to iterate and optimize for quality.",
    ).optional(),
    contentCategory: z.enum([
      "CONTENT_CATEGORY_UNSPECIFIED",
      "CONTENT_CATEGORY_IMAGE",
      "CONTENT_CATEGORY_AUDIO",
      "CONTENT_CATEGORY_VIDEO",
    ]).describe(
      "Indicates the category (image, audio, video etc.) of the original content.",
    ).optional(),
    createTime: z.string().describe(
      "Output only. The time when the document is created.",
    ).optional(),
    creator: z.string().describe("The user who creates the document.")
      .optional(),
    displayName: z.string().describe(
      "Required. Display name of the document given by the user. This name will be displayed in the UI. Customer can populate this field with the name of the document. This differs from the 'title' field as 'title' is optional and stores the top heading in the document.",
    ).optional(),
    displayUri: z.string().describe(
      "Uri to display the document, for example, in the UI.",
    ).optional(),
    dispositionTime: z.string().describe(
      "Output only. If linked to a Collection with RetentionPolicy, the date when the document becomes mutable.",
    ).optional(),
    documentSchemaName: z.string().describe(
      "The Document schema name. Format: projects/{project_number}/locations/{location}/documentSchemas/{document_schema_id}.",
    ).optional(),
    inlineRawDocument: z.string().describe("Raw document content.").optional(),
    legalHold: z.boolean().describe(
      "Output only. Indicates if the document has a legal hold on it.",
    ).optional(),
    name: z.string().describe(
      "The resource name of the document. Format: projects/{project_number}/locations/{location}/documents/{document_id}. The name is ignored when creating a document.",
    ).optional(),
    plainText: z.string().describe("Other document format, such as PPTX, XLXS")
      .optional(),
    properties: z.array(z.object({
      dateTimeValues: z.object({
        values: z.array(z.unknown()).describe(
          "List of datetime values. Both OffsetDateTime and ZonedDateTime are supported.",
        ).optional(),
      }).describe("DateTime values.").optional(),
      enumValues: z.object({
        values: z.array(z.unknown()).describe("List of enum values.")
          .optional(),
      }).describe("Enum values.").optional(),
      floatValues: z.object({
        values: z.array(z.unknown()).describe("List of float values.")
          .optional(),
      }).describe("Float values.").optional(),
      integerValues: z.object({
        values: z.array(z.unknown()).describe("List of integer values.")
          .optional(),
      }).describe("Integer values.").optional(),
      mapProperty: z.object({
        fields: z.record(z.string(), z.unknown()).describe(
          "Unordered map of dynamically typed values.",
        ).optional(),
      }).describe(
        "Map property value. Represents a structured entries of key value pairs, consisting of field names which map to dynamically typed values.",
      ).optional(),
      name: z.string().describe(
        "Required. Must match the name of a PropertyDefinition in the DocumentSchema.",
      ).optional(),
      propertyValues: z.object({
        properties: z.array(z.unknown()).describe("List of property values.")
          .optional(),
      }).describe("Property values.").optional(),
      textValues: z.object({
        values: z.array(z.unknown()).describe("List of text values.")
          .optional(),
      }).describe("String/text values.").optional(),
      timestampValues: z.object({
        values: z.array(z.unknown()).describe("List of timestamp values.")
          .optional(),
      }).describe("Timestamp values.").optional(),
    })).describe("List of values that are user supplied metadata.").optional(),
    rawDocumentFileType: z.enum([
      "RAW_DOCUMENT_FILE_TYPE_UNSPECIFIED",
      "RAW_DOCUMENT_FILE_TYPE_PDF",
      "RAW_DOCUMENT_FILE_TYPE_DOCX",
      "RAW_DOCUMENT_FILE_TYPE_XLSX",
      "RAW_DOCUMENT_FILE_TYPE_PPTX",
      "RAW_DOCUMENT_FILE_TYPE_TEXT",
      "RAW_DOCUMENT_FILE_TYPE_TIFF",
    ]).describe(
      "This is used when DocAI was not used to load the document and parsing/ extracting is needed for the inline_raw_document. For example, if inline_raw_document is the byte representation of a PDF file, then this should be set to: RAW_DOCUMENT_FILE_TYPE_PDF.",
    ).optional(),
    rawDocumentPath: z.string().describe(
      "Raw document file in Cloud Storage path.",
    ).optional(),
    referenceId: z.string().describe(
      "The reference ID set by customers. Must be unique per project and location.",
    ).optional(),
    textExtractionDisabled: z.boolean().describe(
      "If true, text extraction will not be performed.",
    ).optional(),
    textExtractionEnabled: z.boolean().describe(
      "If true, text extraction will be performed.",
    ).optional(),
    title: z.string().describe(
      "Title that describes the document. This can be the top heading or text that describes the document.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The time when the document is last updated.",
    ).optional(),
    updater: z.string().describe("The user who lastly updates the document.")
      .optional(),
  }).describe("Defines the structure for content warehouse document proto.")
    .optional(),
  requestMetadata: z.object({
    userInfo: z.object({
      groupIds: z.array(z.string()).describe(
        'The unique group identifications which the user is belong to. The format is "group:yyyy@example.com";',
      ).optional(),
      id: z.string().describe(
        'A unique user identification string, as determined by the client. The maximum number of allowed characters is 255. Allowed characters include numbers 0 to 9, uppercase and lowercase letters, and restricted special symbols (:, @, +, -, _, ~) The format is "user:xxxx@example.com";',
      ).optional(),
    }).describe("The user information.").optional(),
  }).describe(
    "Meta information is used to improve the performance of the service.",
  ).optional(),
  updateOptions: z.object({
    mergeFieldsOptions: z.object({
      replaceMessageFields: z.boolean().describe(
        "When merging message fields, the default behavior is to merge the content of two message fields together. If you instead want to use the field from the source message to replace the corresponding field in the destination message, set this flag to true. When this flag is set, specified submessage fields that are missing in source will be cleared in destination.",
      ).optional(),
      replaceRepeatedFields: z.boolean().describe(
        "When merging repeated fields, the default behavior is to append entries from the source repeated field to the destination repeated field. If you instead want to keep only the entries from the source repeated field, set this flag to true. If you want to replace a repeated field within a message field on the destination message, you must set both replace_repeated_fields and replace_message_fields to true, otherwise the repeated fields will be appended.",
      ).optional(),
    }).describe("Options for merging updated fields.").optional(),
    updateMask: z.string().describe(
      "Field mask for merging Document fields. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask",
    ).optional(),
    updateType: z.enum([
      "UPDATE_TYPE_UNSPECIFIED",
      "UPDATE_TYPE_REPLACE",
      "UPDATE_TYPE_MERGE",
      "UPDATE_TYPE_INSERT_PROPERTIES_BY_NAMES",
      "UPDATE_TYPE_REPLACE_PROPERTIES_BY_NAMES",
      "UPDATE_TYPE_DELETE_PROPERTIES_BY_NAMES",
      "UPDATE_TYPE_MERGE_AND_REPLACE_OR_INSERT_PROPERTIES_BY_NAMES",
    ]).describe("Type for update.").optional(),
  }).describe("Options for Update operations.").optional(),
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

/** Swamp extension model for Google Cloud Document AI Warehouse Documents.ReferenceId. Registered at `@swamp/gcp/contentwarehouse/documents-referenceid`. */
export const model = {
  type: "@swamp/gcp/contentwarehouse/documents-referenceid",
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
      description:
        "Defines the structure for content warehouse document proto.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a referenceId",
      arguments: z.object({
        identifier: z.string().describe("The name of the referenceId"),
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
    update: {
      description: "Update referenceId attributes",
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
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["cloudAiDocumentOption"] !== undefined) {
          body["cloudAiDocumentOption"] = g["cloudAiDocumentOption"];
        }
        if (g["document"] !== undefined) body["document"] = g["document"];
        if (g["requestMetadata"] !== undefined) {
          body["requestMetadata"] = g["requestMetadata"];
        }
        if (g["updateOptions"] !== undefined) {
          body["updateOptions"] = g["updateOptions"];
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
    delete: {
      description: "Delete the referenceId",
      arguments: z.object({
        identifier: z.string().describe("The name of the referenceId"),
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
      description: "Sync referenceId state from GCP",
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
  },
};
