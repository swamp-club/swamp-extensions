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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  cloudAiDocumentOption: z.object({
    customizedEntitiesPropertiesConversions: z.record(z.string(), z.string())
      .describe(
        "If set, only selected entities will be converted to properties.",
      ).optional(),
    enableEntitiesConversions: z.boolean().describe(
      "Whether to convert all the entities to properties.",
    ).optional(),
  }).describe(
    "Request Option for processing Cloud AI Document in Document Warehouse. This field offers limited support for mapping entities from Cloud AI Document to Warehouse Document. Please consult with product team before using this field and other available options.",
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
          pageSpan: z.unknown().describe("Page span of the chunk.").optional(),
          sourceBlockIds: z.unknown().describe("Unused.").optional(),
        })).describe("List of chunks.").optional(),
      }).describe("Document chunked based on chunking config.").optional(),
      content: z.string().describe(
        "Optional. Inline document content, represented as a stream of bytes. Note: As with all `bytes` fields, protobuffers use a pure binary representation, whereas JSON representations use base64.",
      ).optional(),
      documentLayout: z.object({
        blocks: z.array(z.object({
          blockId: z.unknown().describe("ID of the block.").optional(),
          listBlock: z.unknown().describe(
            "Block consisting of list content/structure.",
          ).optional(),
          pageSpan: z.unknown().describe("Page span of the block.").optional(),
          tableBlock: z.unknown().describe(
            "Block consisting of table content/structure.",
          ).optional(),
          textBlock: z.unknown().describe("Block consisting of text content.")
            .optional(),
        })).describe("List of blocks in the document.").optional(),
      }).describe("Parsed layout of the document.").optional(),
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
            "Postal address. See also: https://github.com/googleapis/googleapis/blob/master/google/type/postal_address.proto",
          ).optional(),
          booleanValue: z.unknown().describe(
            "Boolean value. Can be used for entities with binary values, or for checkboxes.",
          ).optional(),
          dateValue: z.unknown().describe(
            "Date value. Includes year, month, day. See also: https://github.com/googleapis/googleapis/blob/master/google/type/date.proto",
          ).optional(),
          datetimeValue: z.unknown().describe(
            "DateTime value. Includes date, time, and timezone. See also: https://github.com/googleapis/googleapis/blob/master/google/type/datetime.proto",
          ).optional(),
          floatValue: z.unknown().describe("Float value.").optional(),
          integerValue: z.unknown().describe("Integer value.").optional(),
          moneyValue: z.unknown().describe(
            "Money value. See also: https://github.com/googleapis/googleapis/blob/master/google/type/money.proto",
          ).optional(),
          text: z.unknown().describe(
            "Optional. An optional field to store a normalized string. For some entity types, one of respective `structured_value` fields may also be populated. Also not all the types of `structured_value` will be normalized. For example, some processors may not generate `float` or `integer` normalized text by default. Below are sample formats mapped to structured values. - Money/Currency type (`money_value`) is in the ISO 4217 text format. - Date type (`date_value`) is in the ISO 8601 text format. - Datetime type (`datetime_value`) is in the ISO 8601 text format.",
          ).optional(),
        }).describe(
          "Optional. Normalized entity value. Absent if the extracted value could not be converted or the type (e.g. address) is not supported for certain parsers. This field is also only populated for certain supported document types.",
        ).optional(),
        pageAnchor: z.object({
          pageRefs: z.unknown().describe(
            "One or more references to visual page elements",
          ).optional(),
        }).describe(
          "Optional. Represents the provenance of this entity wrt. the location on the page where it was found.",
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
        }).describe("Optional. The history of this annotation.").optional(),
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
        }).describe(
          "Optional. Provenance of the entity. Text anchor indexing into the Document.text.",
        ).optional(),
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
      }).describe("Any error that occurred while processing this document.")
        .optional(),
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
        }).describe("Physical dimension of the page.").optional(),
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
        }).describe(
          "Rendered image for this page. This image is preprocessed to remove any skew, rotation, and distortions such that the annotation bounding boxes can be upright and axis-aligned.",
        ).optional(),
        imageQualityScores: z.object({
          detectedDefects: z.unknown().describe("A list of detected defects.")
            .optional(),
          qualityScore: z.unknown().describe(
            "The overall quality score. Range `[0, 1]` where `1` is perfect quality.",
          ).optional(),
        }).describe("Image quality scores.").optional(),
        layout: z.object({
          boundingPoly: z.unknown().describe(
            "The bounding polygon for the Layout.",
          ).optional(),
          confidence: z.unknown().describe(
            "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
          ).optional(),
          orientation: z.unknown().describe(
            "Detected orientation for the Layout.",
          ).optional(),
          textAnchor: z.unknown().describe(
            "Text anchor indexing into the Document.text.",
          ).optional(),
        }).describe("Layout for the page.").optional(),
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
        }).describe("The history of this page.").optional(),
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
        }).describe("Human Review information of this revision.").optional(),
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
        "Information about the sharding if this document is sharded part of a larger document. If the document is not sharded, this message is not specified.",
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
        }).describe(
          "Provenance of the correction. Text anchor indexing into the Document.text. There can only be a single `TextAnchor.text_segments` element. If the start and end index of the text segment are the same, the text change is inserted before that index.",
        ).optional(),
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
        }).describe("Text background color.").optional(),
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
        }).describe("Text color.").optional(),
        fontFamily: z.string().describe(
          "Font family such as `Arial`, `Times New Roman`. https://www.w3schools.com/cssref/pr_font_font-family.asp",
        ).optional(),
        fontSize: z.object({
          size: z.unknown().describe("Font size for the text.").optional(),
          unit: z.unknown().describe(
            "Unit for the font size. Follows CSS naming (such as `in`, `px`, and `pt`).",
          ).optional(),
        }).describe("Font size.").optional(),
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
        }).describe("Text anchor indexing into the Document.text.").optional(),
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
      "Document AI format to save the structured content, including OCR.",
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
      }).describe(
        "Date time property values. It is not supported by CMEK compliant deployment.",
      ).optional(),
      enumValues: z.object({
        values: z.array(z.unknown()).describe("List of enum values.")
          .optional(),
      }).describe("Enum property values.").optional(),
      floatValues: z.object({
        values: z.array(z.unknown()).describe("List of float values.")
          .optional(),
      }).describe("Float property values.").optional(),
      integerValues: z.object({
        values: z.array(z.unknown()).describe("List of integer values.")
          .optional(),
      }).describe("Integer property values.").optional(),
      mapProperty: z.object({
        fields: z.record(z.string(), z.unknown()).describe(
          "Unordered map of dynamically typed values.",
        ).optional(),
      }).describe("Map property values.").optional(),
      name: z.string().describe(
        "Required. Must match the name of a PropertyDefinition in the DocumentSchema.",
      ).optional(),
      propertyValues: z.object({
        properties: z.array(z.unknown()).describe("List of property values.")
          .optional(),
      }).describe("Nested structured data property values.").optional(),
      textValues: z.object({
        values: z.array(z.unknown()).describe("List of text values.")
          .optional(),
      }).describe("String/text property values.").optional(),
      timestampValues: z.object({
        values: z.array(z.unknown()).describe("List of timestamp values.")
          .optional(),
      }).describe(
        "Timestamp property values. It is not supported by CMEK compliant deployment.",
      ).optional(),
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
  }).describe("Required. The document to update.").optional(),
  requestMetadata: z.object({
    userInfo: z.object({
      groupIds: z.array(z.string()).describe(
        'The unique group identifications which the user is belong to. The format is "group:yyyy@example.com";',
      ).optional(),
      id: z.string().describe(
        'A unique user identification string, as determined by the client. The maximum number of allowed characters is 255. Allowed characters include numbers 0 to 9, uppercase and lowercase letters, and restricted special symbols (:, @, +, -, _, ~) The format is "user:xxxx@example.com";',
      ).optional(),
    }).describe("Provides user unique identification and groups information.")
      .optional(),
  }).describe(
    "The meta information collected about the end user, used to enforce access control for the service.",
  ).optional(),
  updateOptions: z.object({
    mergeFieldsOptions: z.object({
      replaceMessageFields: z.boolean().describe(
        "When merging message fields, the default behavior is to merge the content of two message fields together. If you instead want to use the field from the source message to replace the corresponding field in the destination message, set this flag to true. When this flag is set, specified submessage fields that are missing in source will be cleared in destination.",
      ).optional(),
      replaceRepeatedFields: z.boolean().describe(
        "When merging repeated fields, the default behavior is to append entries from the source repeated field to the destination repeated field. If you instead want to keep only the entries from the source repeated field, set this flag to true. If you want to replace a repeated field within a message field on the destination message, you must set both replace_repeated_fields and replace_message_fields to true, otherwise the repeated fields will be appended.",
      ).optional(),
    }).describe("Options for merging.").optional(),
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
  }).describe("Options for the update operation.").optional(),
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
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  cloudAiDocumentOption: z.object({
    customizedEntitiesPropertiesConversions: z.record(z.string(), z.string())
      .describe(
        "If set, only selected entities will be converted to properties.",
      ).optional(),
    enableEntitiesConversions: z.boolean().describe(
      "Whether to convert all the entities to properties.",
    ).optional(),
  }).describe(
    "Request Option for processing Cloud AI Document in Document Warehouse. This field offers limited support for mapping entities from Cloud AI Document to Warehouse Document. Please consult with product team before using this field and other available options.",
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
          pageSpan: z.unknown().describe("Page span of the chunk.").optional(),
          sourceBlockIds: z.unknown().describe("Unused.").optional(),
        })).describe("List of chunks.").optional(),
      }).describe("Document chunked based on chunking config.").optional(),
      content: z.string().describe(
        "Optional. Inline document content, represented as a stream of bytes. Note: As with all `bytes` fields, protobuffers use a pure binary representation, whereas JSON representations use base64.",
      ).optional(),
      documentLayout: z.object({
        blocks: z.array(z.object({
          blockId: z.unknown().describe("ID of the block.").optional(),
          listBlock: z.unknown().describe(
            "Block consisting of list content/structure.",
          ).optional(),
          pageSpan: z.unknown().describe("Page span of the block.").optional(),
          tableBlock: z.unknown().describe(
            "Block consisting of table content/structure.",
          ).optional(),
          textBlock: z.unknown().describe("Block consisting of text content.")
            .optional(),
        })).describe("List of blocks in the document.").optional(),
      }).describe("Parsed layout of the document.").optional(),
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
            "Postal address. See also: https://github.com/googleapis/googleapis/blob/master/google/type/postal_address.proto",
          ).optional(),
          booleanValue: z.unknown().describe(
            "Boolean value. Can be used for entities with binary values, or for checkboxes.",
          ).optional(),
          dateValue: z.unknown().describe(
            "Date value. Includes year, month, day. See also: https://github.com/googleapis/googleapis/blob/master/google/type/date.proto",
          ).optional(),
          datetimeValue: z.unknown().describe(
            "DateTime value. Includes date, time, and timezone. See also: https://github.com/googleapis/googleapis/blob/master/google/type/datetime.proto",
          ).optional(),
          floatValue: z.unknown().describe("Float value.").optional(),
          integerValue: z.unknown().describe("Integer value.").optional(),
          moneyValue: z.unknown().describe(
            "Money value. See also: https://github.com/googleapis/googleapis/blob/master/google/type/money.proto",
          ).optional(),
          text: z.unknown().describe(
            "Optional. An optional field to store a normalized string. For some entity types, one of respective `structured_value` fields may also be populated. Also not all the types of `structured_value` will be normalized. For example, some processors may not generate `float` or `integer` normalized text by default. Below are sample formats mapped to structured values. - Money/Currency type (`money_value`) is in the ISO 4217 text format. - Date type (`date_value`) is in the ISO 8601 text format. - Datetime type (`datetime_value`) is in the ISO 8601 text format.",
          ).optional(),
        }).describe(
          "Optional. Normalized entity value. Absent if the extracted value could not be converted or the type (e.g. address) is not supported for certain parsers. This field is also only populated for certain supported document types.",
        ).optional(),
        pageAnchor: z.object({
          pageRefs: z.unknown().describe(
            "One or more references to visual page elements",
          ).optional(),
        }).describe(
          "Optional. Represents the provenance of this entity wrt. the location on the page where it was found.",
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
        }).describe("Optional. The history of this annotation.").optional(),
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
        }).describe(
          "Optional. Provenance of the entity. Text anchor indexing into the Document.text.",
        ).optional(),
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
      }).describe("Any error that occurred while processing this document.")
        .optional(),
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
        }).describe("Physical dimension of the page.").optional(),
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
        }).describe(
          "Rendered image for this page. This image is preprocessed to remove any skew, rotation, and distortions such that the annotation bounding boxes can be upright and axis-aligned.",
        ).optional(),
        imageQualityScores: z.object({
          detectedDefects: z.unknown().describe("A list of detected defects.")
            .optional(),
          qualityScore: z.unknown().describe(
            "The overall quality score. Range `[0, 1]` where `1` is perfect quality.",
          ).optional(),
        }).describe("Image quality scores.").optional(),
        layout: z.object({
          boundingPoly: z.unknown().describe(
            "The bounding polygon for the Layout.",
          ).optional(),
          confidence: z.unknown().describe(
            "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
          ).optional(),
          orientation: z.unknown().describe(
            "Detected orientation for the Layout.",
          ).optional(),
          textAnchor: z.unknown().describe(
            "Text anchor indexing into the Document.text.",
          ).optional(),
        }).describe("Layout for the page.").optional(),
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
        }).describe("The history of this page.").optional(),
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
        }).describe("Human Review information of this revision.").optional(),
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
        "Information about the sharding if this document is sharded part of a larger document. If the document is not sharded, this message is not specified.",
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
        }).describe(
          "Provenance of the correction. Text anchor indexing into the Document.text. There can only be a single `TextAnchor.text_segments` element. If the start and end index of the text segment are the same, the text change is inserted before that index.",
        ).optional(),
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
        }).describe("Text background color.").optional(),
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
        }).describe("Text color.").optional(),
        fontFamily: z.string().describe(
          "Font family such as `Arial`, `Times New Roman`. https://www.w3schools.com/cssref/pr_font_font-family.asp",
        ).optional(),
        fontSize: z.object({
          size: z.unknown().describe("Font size for the text.").optional(),
          unit: z.unknown().describe(
            "Unit for the font size. Follows CSS naming (such as `in`, `px`, and `pt`).",
          ).optional(),
        }).describe("Font size.").optional(),
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
        }).describe("Text anchor indexing into the Document.text.").optional(),
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
      "Document AI format to save the structured content, including OCR.",
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
      }).describe(
        "Date time property values. It is not supported by CMEK compliant deployment.",
      ).optional(),
      enumValues: z.object({
        values: z.array(z.unknown()).describe("List of enum values.")
          .optional(),
      }).describe("Enum property values.").optional(),
      floatValues: z.object({
        values: z.array(z.unknown()).describe("List of float values.")
          .optional(),
      }).describe("Float property values.").optional(),
      integerValues: z.object({
        values: z.array(z.unknown()).describe("List of integer values.")
          .optional(),
      }).describe("Integer property values.").optional(),
      mapProperty: z.object({
        fields: z.record(z.string(), z.unknown()).describe(
          "Unordered map of dynamically typed values.",
        ).optional(),
      }).describe("Map property values.").optional(),
      name: z.string().describe(
        "Required. Must match the name of a PropertyDefinition in the DocumentSchema.",
      ).optional(),
      propertyValues: z.object({
        properties: z.array(z.unknown()).describe("List of property values.")
          .optional(),
      }).describe("Nested structured data property values.").optional(),
      textValues: z.object({
        values: z.array(z.unknown()).describe("List of text values.")
          .optional(),
      }).describe("String/text property values.").optional(),
      timestampValues: z.object({
        values: z.array(z.unknown()).describe("List of timestamp values.")
          .optional(),
      }).describe(
        "Timestamp property values. It is not supported by CMEK compliant deployment.",
      ).optional(),
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
  }).describe("Required. The document to update.").optional(),
  requestMetadata: z.object({
    userInfo: z.object({
      groupIds: z.array(z.string()).describe(
        'The unique group identifications which the user is belong to. The format is "group:yyyy@example.com";',
      ).optional(),
      id: z.string().describe(
        'A unique user identification string, as determined by the client. The maximum number of allowed characters is 255. Allowed characters include numbers 0 to 9, uppercase and lowercase letters, and restricted special symbols (:, @, +, -, _, ~) The format is "user:xxxx@example.com";',
      ).optional(),
    }).describe("Provides user unique identification and groups information.")
      .optional(),
  }).describe(
    "The meta information collected about the end user, used to enforce access control for the service.",
  ).optional(),
  updateOptions: z.object({
    mergeFieldsOptions: z.object({
      replaceMessageFields: z.boolean().describe(
        "When merging message fields, the default behavior is to merge the content of two message fields together. If you instead want to use the field from the source message to replace the corresponding field in the destination message, set this flag to true. When this flag is set, specified submessage fields that are missing in source will be cleared in destination.",
      ).optional(),
      replaceRepeatedFields: z.boolean().describe(
        "When merging repeated fields, the default behavior is to append entries from the source repeated field to the destination repeated field. If you instead want to keep only the entries from the source repeated field, set this flag to true. If you want to replace a repeated field within a message field on the destination message, you must set both replace_repeated_fields and replace_message_fields to true, otherwise the repeated fields will be appended.",
      ).optional(),
    }).describe("Options for merging.").optional(),
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
  }).describe("Options for the update operation.").optional(),
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
      : undefined,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Document AI Warehouse Documents.ReferenceId. Registered at `@swamp/gcp/contentwarehouse/documents-referenceid`. */
export const model = {
  type: "@swamp/gcp/contentwarehouse/documents-referenceid",
  version: "2026.10.06.1",
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
      toVersion: "2026.07.18.2",
      description: "No schema changes",
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
      toVersion: "2026.10.06.1",
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
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
    update: {
      description: "Update referenceId attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific referenceId by name (e.g. one discovered by list)",
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
        const params: Record<string, string> = { project: projectId };
        const resourceId = existing["name"]?.toString() ??
          g["name"]?.toString();
        if (!resourceId) {
          throw new Error(
            "No identifier found in existing state or globalArgs",
          );
        }
        params["name"] = resourceId;
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
          baseUrl,
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
        const { existed } = await deleteResource(
          baseUrl,
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
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific referenceId by name (e.g. one discovered by list)",
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
          params["name"] = identifier;
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
  },
};
