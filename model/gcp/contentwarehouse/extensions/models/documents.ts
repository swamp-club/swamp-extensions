// Auto-generated extension model for @swamp/gcp/contentwarehouse/documents
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Document AI Warehouse Documents.
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
  createResource,
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/documents/${shortName}`;
}

const BASE_URL = "https://contentwarehouse.googleapis.com/";

const GET_CONFIG = {
  "id": "contentwarehouse.projects.locations.documents.get",
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

const INSERT_CONFIG = {
  "id": "contentwarehouse.projects.locations.documents.create",
  "path": "v1/{+parent}/documents",
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
  "id": "contentwarehouse.projects.locations.documents.patch",
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
  "id": "contentwarehouse.projects.locations.documents.delete",
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
  createMask: z.string().describe(
    "Field mask for creating Document fields. If mask path is empty, it means all fields are masked. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask.",
  ).optional(),
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
  policy: z.object({
    auditConfigs: z.array(z.object({
      auditLogConfigs: z.array(z.object({
        exemptedMembers: z.unknown().describe(
          "Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members.",
        ).optional(),
        logType: z.unknown().describe("The log type that this config enables.")
          .optional(),
      })).describe("The configuration for logging of each type of permission.")
        .optional(),
      service: z.string().describe(
        "Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services.",
      ).optional(),
    })).describe("Specifies cloud audit logging configuration for this policy.")
      .optional(),
    bindings: z.array(z.object({
      condition: z.object({
        description: z.string().describe(
          "Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.",
        ).optional(),
        expression: z.string().describe(
          "Textual representation of an expression in Common Expression Language syntax.",
        ).optional(),
        location: z.string().describe(
          "Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.",
        ).optional(),
        title: z.string().describe(
          "Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.",
        ).optional(),
      }).describe(
        'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
      ).optional(),
      members: z.array(z.string()).describe(
        "Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com`. * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`.",
      ).optional(),
      role: z.string().describe(
        "Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles).",
      ).optional(),
    })).describe(
      "Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`.",
    ).optional(),
    etag: z.string().describe(
      "`etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost.",
    ).optional(),
    version: z.number().int().describe(
      "Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).",
    ).optional(),
  }).describe(
    'An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). **JSON example:** ` { "bindings": [ { "role": "roles/resourcemanager.organizationAdmin", "members": [ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" ] }, { "role": "roles/resourcemanager.organizationViewer", "members": [ "user:eve@example.com" ], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp(\'2020-10-01T00:00:00.000Z\')", } } ], "etag": "BwWWja0YfJA=", "version": 3 } ` **YAML example:** ` bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp(\'2020-10-01T00:00:00.000Z\') etag: BwWWja0YfJA= version: 3 ` For a description of IAM and its features, see the [IAM documentation](https://cloud.google.com/iam/docs/).',
  ).optional(),
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
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
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
      properties: z.array(z.string()),
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
      properties: z.array(z.string()),
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
  createMask: z.string().describe(
    "Field mask for creating Document fields. If mask path is empty, it means all fields are masked. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask.",
  ).optional(),
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
  policy: z.object({
    auditConfigs: z.array(z.object({
      auditLogConfigs: z.array(z.object({
        exemptedMembers: z.unknown().describe(
          "Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members.",
        ).optional(),
        logType: z.unknown().describe("The log type that this config enables.")
          .optional(),
      })).describe("The configuration for logging of each type of permission.")
        .optional(),
      service: z.string().describe(
        "Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services.",
      ).optional(),
    })).describe("Specifies cloud audit logging configuration for this policy.")
      .optional(),
    bindings: z.array(z.object({
      condition: z.object({
        description: z.string().describe(
          "Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.",
        ).optional(),
        expression: z.string().describe(
          "Textual representation of an expression in Common Expression Language syntax.",
        ).optional(),
        location: z.string().describe(
          "Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.",
        ).optional(),
        title: z.string().describe(
          "Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.",
        ).optional(),
      }).describe(
        'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
      ).optional(),
      members: z.array(z.string()).describe(
        "Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com`. * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`.",
      ).optional(),
      role: z.string().describe(
        "Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles).",
      ).optional(),
    })).describe(
      "Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`.",
    ).optional(),
    etag: z.string().describe(
      "`etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost.",
    ).optional(),
    version: z.number().int().describe(
      "Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).",
    ).optional(),
  }).describe(
    'An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). **JSON example:** ` { "bindings": [ { "role": "roles/resourcemanager.organizationAdmin", "members": [ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" ] }, { "role": "roles/resourcemanager.organizationViewer", "members": [ "user:eve@example.com" ], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp(\'2020-10-01T00:00:00.000Z\')", } } ], "etag": "BwWWja0YfJA=", "version": 3 } ` **YAML example:** ` bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp(\'2020-10-01T00:00:00.000Z\') etag: BwWWja0YfJA= version: 3 ` For a description of IAM and its features, see the [IAM documentation](https://cloud.google.com/iam/docs/).',
  ).optional(),
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
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Document AI Warehouse Documents. Registered at `@swamp/gcp/contentwarehouse/documents`. */
export const model = {
  type: "@swamp/gcp/contentwarehouse/documents",
  version: "2026.05.18.1",
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
      toVersion: "2026.05.18.1",
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
    create: {
      description: "Create a documents",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["cloudAiDocumentOption"] !== undefined) {
          body["cloudAiDocumentOption"] = g["cloudAiDocumentOption"];
        }
        if (g["createMask"] !== undefined) body["createMask"] = g["createMask"];
        if (g["document"] !== undefined) body["document"] = g["document"];
        if (g["policy"] !== undefined) body["policy"] = g["policy"];
        if (g["requestMetadata"] !== undefined) {
          body["requestMetadata"] = g["requestMetadata"];
        }
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
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
      description: "Update documents attributes",
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
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
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
      description: "Delete the documents",
      arguments: z.object({
        identifier: z.string().describe("The name of the documents"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
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
      description: "Sync documents state from GCP",
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
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
    fetch_acl: {
      description: "fetch acl",
      arguments: z.object({
        projectOwner: z.any().optional(),
        requestMetadata: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["projectOwner"] !== undefined) {
          body["projectOwner"] = args["projectOwner"];
        }
        if (args["requestMetadata"] !== undefined) {
          body["requestMetadata"] = args["requestMetadata"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "contentwarehouse.projects.locations.documents.fetchAcl",
            "path": "v1/{+resource}:fetchAcl",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    linked_sources: {
      description: "linked sources",
      arguments: z.object({
        pageSize: z.any().optional(),
        pageToken: z.any().optional(),
        requestMetadata: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["pageSize"] !== undefined) body["pageSize"] = args["pageSize"];
        if (args["pageToken"] !== undefined) {
          body["pageToken"] = args["pageToken"];
        }
        if (args["requestMetadata"] !== undefined) {
          body["requestMetadata"] = args["requestMetadata"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "contentwarehouse.projects.locations.documents.linkedSources",
            "path": "v1/{+parent}/linkedSources",
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
    linked_targets: {
      description: "linked targets",
      arguments: z.object({
        requestMetadata: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["requestMetadata"] !== undefined) {
          body["requestMetadata"] = args["requestMetadata"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "contentwarehouse.projects.locations.documents.linkedTargets",
            "path": "v1/{+parent}/linkedTargets",
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
    lock: {
      description: "lock",
      arguments: z.object({
        collectionId: z.any().optional(),
        lockingUser: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["collectionId"] !== undefined) {
          body["collectionId"] = args["collectionId"];
        }
        if (args["lockingUser"] !== undefined) {
          body["lockingUser"] = args["lockingUser"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "contentwarehouse.projects.locations.documents.lock",
            "path": "v1/{+name}:lock",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    search: {
      description: "search",
      arguments: z.object({
        documentQuery: z.any().optional(),
        histogramQueries: z.any().optional(),
        offset: z.any().optional(),
        orderBy: z.any().optional(),
        pageSize: z.any().optional(),
        pageToken: z.any().optional(),
        qaSizeLimit: z.any().optional(),
        requestMetadata: z.any().optional(),
        requireTotalSize: z.any().optional(),
        totalResultSize: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["documentQuery"] !== undefined) {
          body["documentQuery"] = args["documentQuery"];
        }
        if (args["histogramQueries"] !== undefined) {
          body["histogramQueries"] = args["histogramQueries"];
        }
        if (args["offset"] !== undefined) body["offset"] = args["offset"];
        if (args["orderBy"] !== undefined) body["orderBy"] = args["orderBy"];
        if (args["pageSize"] !== undefined) body["pageSize"] = args["pageSize"];
        if (args["pageToken"] !== undefined) {
          body["pageToken"] = args["pageToken"];
        }
        if (args["qaSizeLimit"] !== undefined) {
          body["qaSizeLimit"] = args["qaSizeLimit"];
        }
        if (args["requestMetadata"] !== undefined) {
          body["requestMetadata"] = args["requestMetadata"];
        }
        if (args["requireTotalSize"] !== undefined) {
          body["requireTotalSize"] = args["requireTotalSize"];
        }
        if (args["totalResultSize"] !== undefined) {
          body["totalResultSize"] = args["totalResultSize"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "contentwarehouse.projects.locations.documents.search",
            "path": "v1/{+parent}/documents:search",
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
    set_acl: {
      description: "set acl",
      arguments: z.object({
        policy: z.any().optional(),
        projectOwner: z.any().optional(),
        requestMetadata: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        if (args["projectOwner"] !== undefined) {
          body["projectOwner"] = args["projectOwner"];
        }
        if (args["requestMetadata"] !== undefined) {
          body["requestMetadata"] = args["requestMetadata"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "contentwarehouse.projects.locations.documents.setAcl",
            "path": "v1/{+resource}:setAcl",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
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
