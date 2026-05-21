// Auto-generated extension model for @swamp/gcp/walletobjects/offerobject
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Wallet Offerobject.
 *
 * Returns the offer object with the given object ID.
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

const BASE_URL = "https://walletobjects.googleapis.com/";

const GET_CONFIG = {
  "id": "walletobjects.offerobject.get",
  "path": "walletobjects/v1/offerObject/{resourceId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "resourceId",
  ],
  "parameters": {
    "resourceId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "walletobjects.offerobject.insert",
  "path": "walletobjects/v1/offerObject",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const UPDATE_CONFIG = {
  "id": "walletobjects.offerobject.update",
  "path": "walletobjects/v1/offerObject/{resourceId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "resourceId",
  ],
  "parameters": {
    "resourceId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "walletobjects.offerobject.list",
  "path": "walletobjects/v1/offerObject",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "classId": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "token": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  appLinkData: z.object({
    androidAppLinkInfo: z.object({
      appLogoImage: z.object({
        contentDescription: z.object({
          defaultValue: z.object({
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
            ).optional(),
            language: z.unknown().describe(
              'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
            ).optional(),
            value: z.unknown().describe("The UTF-8 encoded translated string.")
              .optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
        ).optional(),
        privateImageId: z.string().describe(
          "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
        ).optional(),
        sourceUri: z.object({
          description: z.string().describe(
            "Additional information about the image, which is unused and retained only for backward compatibility.",
          ).optional(),
          localizedDescription: z.object({
            defaultValue: z.unknown().optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).optional(),
          uri: z.string().describe(
            "The location of the image. URIs must have a scheme.",
          ).optional(),
        }).optional(),
      }).describe("Wrapping type for Google hosted images.").optional(),
      appTarget: z.object({
        packageName: z.string().describe(
          "Package name for AppTarget. For example: com.google.android.gm",
        ).optional(),
        targetUri: z.object({
          description: z.string().describe(
            "The URI's title appearing in the app as text. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens. Note that in some contexts this text is not used, such as when `description` is part of an image.",
          ).optional(),
          id: z.string().describe(
            "The ID associated with a uri. This field is here to enable ease of management of uris.",
          ).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#uri"`.',
          ).optional(),
          localizedDescription: z.object({
            defaultValue: z.unknown().optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).optional(),
          uri: z.string().describe(
            "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
          ).optional(),
        }).optional(),
      }).optional(),
      description: z.object({
        defaultValue: z.object({
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.string().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.string().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        })).describe("Contains the translations for the string.").optional(),
      }).optional(),
      title: z.object({
        defaultValue: z.object({
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.string().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.string().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        })).describe("Contains the translations for the string.").optional(),
      }).optional(),
    }).optional(),
    displayText: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    iosAppLinkInfo: z.object({
      appLogoImage: z.object({
        contentDescription: z.object({
          defaultValue: z.object({
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
            ).optional(),
            language: z.unknown().describe(
              'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
            ).optional(),
            value: z.unknown().describe("The UTF-8 encoded translated string.")
              .optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
        ).optional(),
        privateImageId: z.string().describe(
          "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
        ).optional(),
        sourceUri: z.object({
          description: z.string().describe(
            "Additional information about the image, which is unused and retained only for backward compatibility.",
          ).optional(),
          localizedDescription: z.object({
            defaultValue: z.unknown().optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).optional(),
          uri: z.string().describe(
            "The location of the image. URIs must have a scheme.",
          ).optional(),
        }).optional(),
      }).describe("Wrapping type for Google hosted images.").optional(),
      appTarget: z.object({
        packageName: z.string().describe(
          "Package name for AppTarget. For example: com.google.android.gm",
        ).optional(),
        targetUri: z.object({
          description: z.string().describe(
            "The URI's title appearing in the app as text. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens. Note that in some contexts this text is not used, such as when `description` is part of an image.",
          ).optional(),
          id: z.string().describe(
            "The ID associated with a uri. This field is here to enable ease of management of uris.",
          ).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#uri"`.',
          ).optional(),
          localizedDescription: z.object({
            defaultValue: z.unknown().optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).optional(),
          uri: z.string().describe(
            "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
          ).optional(),
        }).optional(),
      }).optional(),
      description: z.object({
        defaultValue: z.object({
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.string().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.string().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        })).describe("Contains the translations for the string.").optional(),
      }).optional(),
      title: z.object({
        defaultValue: z.object({
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.string().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.string().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        })).describe("Contains the translations for the string.").optional(),
      }).optional(),
    }).optional(),
    webAppLinkInfo: z.object({
      appLogoImage: z.object({
        contentDescription: z.object({
          defaultValue: z.object({
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
            ).optional(),
            language: z.unknown().describe(
              'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
            ).optional(),
            value: z.unknown().describe("The UTF-8 encoded translated string.")
              .optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
        ).optional(),
        privateImageId: z.string().describe(
          "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
        ).optional(),
        sourceUri: z.object({
          description: z.string().describe(
            "Additional information about the image, which is unused and retained only for backward compatibility.",
          ).optional(),
          localizedDescription: z.object({
            defaultValue: z.unknown().optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).optional(),
          uri: z.string().describe(
            "The location of the image. URIs must have a scheme.",
          ).optional(),
        }).optional(),
      }).describe("Wrapping type for Google hosted images.").optional(),
      appTarget: z.object({
        packageName: z.string().describe(
          "Package name for AppTarget. For example: com.google.android.gm",
        ).optional(),
        targetUri: z.object({
          description: z.string().describe(
            "The URI's title appearing in the app as text. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens. Note that in some contexts this text is not used, such as when `description` is part of an image.",
          ).optional(),
          id: z.string().describe(
            "The ID associated with a uri. This field is here to enable ease of management of uris.",
          ).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#uri"`.',
          ).optional(),
          localizedDescription: z.object({
            defaultValue: z.unknown().optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).optional(),
          uri: z.string().describe(
            "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
          ).optional(),
        }).optional(),
      }).optional(),
      description: z.object({
        defaultValue: z.object({
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.string().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.string().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        })).describe("Contains the translations for the string.").optional(),
      }).optional(),
      title: z.object({
        defaultValue: z.object({
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.string().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.string().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        })).describe("Contains the translations for the string.").optional(),
      }).optional(),
    }).optional(),
  }).optional(),
  barcode: z.object({
    alternateText: z.string().describe(
      "An optional text that will override the default text that shows under the barcode. This field is intended for a human readable equivalent of the barcode value, used when the barcode cannot be scanned.",
    ).optional(),
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#barcode"`.',
    ).optional(),
    renderEncoding: z.enum(["RENDER_ENCODING_UNSPECIFIED", "UTF_8"]).describe(
      "The render encoding for the barcode. When specified, barcode is rendered in the given encoding. Otherwise best known encoding is chosen by Google.",
    ).optional(),
    showCodeText: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    type: z.enum([
      "BARCODE_TYPE_UNSPECIFIED",
      "AZTEC",
      "aztec",
      "CODE_39",
      "code39",
      "CODE_128",
      "code128",
      "CODABAR",
      "codabar",
      "DATA_MATRIX",
      "dataMatrix",
      "EAN_8",
      "ean8",
      "EAN_13",
      "ean13",
      "EAN13",
      "ITF_14",
      "itf14",
      "PDF_417",
      "pdf417",
      "PDF417",
      "QR_CODE",
      "qrCode",
      "qrcode",
      "UPC_A",
      "upcA",
      "TEXT_ONLY",
      "textOnly",
    ]).describe("The type of barcode.").optional(),
    value: z.string().describe("The value encoded in the barcode.").optional(),
  }).optional(),
  classId: z.string().describe(
    "Required. The class associated with this object. The class must be of the same type as this object, must already exist, and must be approved. Class IDs should follow the format issuer ID.identifier where the former is issued by Google and latter is chosen by you.",
  ).optional(),
  classReference: z.object({
    allowMultipleUsersPerObject: z.boolean().describe(
      "Deprecated. Use `multipleDevicesAndHoldersAllowedStatus` instead.",
    ).optional(),
    appLinkData: z.object({
      androidAppLinkInfo: z.object({
        appLogoImage: z.object({
          contentDescription: z.object({
            defaultValue: z.unknown().optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
          ).optional(),
          privateImageId: z.string().describe(
            "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
          ).optional(),
          sourceUri: z.object({
            description: z.unknown().describe(
              "Additional information about the image, which is unused and retained only for backward compatibility.",
            ).optional(),
            localizedDescription: z.unknown().optional(),
            uri: z.unknown().describe(
              "The location of the image. URIs must have a scheme.",
            ).optional(),
          }).optional(),
        }).describe("Wrapping type for Google hosted images.").optional(),
        appTarget: z.object({
          packageName: z.string().describe(
            "Package name for AppTarget. For example: com.google.android.gm",
          ).optional(),
          targetUri: z.object({
            description: z.unknown().describe(
              "The URI's title appearing in the app as text. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens. Note that in some contexts this text is not used, such as when `description` is part of an image.",
            ).optional(),
            id: z.unknown().describe(
              "The ID associated with a uri. This field is here to enable ease of management of uris.",
            ).optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#uri"`.',
            ).optional(),
            localizedDescription: z.unknown().optional(),
            uri: z.unknown().describe(
              "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
            ).optional(),
          }).optional(),
        }).optional(),
        description: z.object({
          defaultValue: z.object({
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
            ).optional(),
            language: z.unknown().describe(
              'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
            ).optional(),
            value: z.unknown().describe("The UTF-8 encoded translated string.")
              .optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        title: z.object({
          defaultValue: z.object({
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
            ).optional(),
            language: z.unknown().describe(
              'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
            ).optional(),
            value: z.unknown().describe("The UTF-8 encoded translated string.")
              .optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
      }).optional(),
      displayText: z.object({
        defaultValue: z.object({
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.string().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.string().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        })).describe("Contains the translations for the string.").optional(),
      }).optional(),
      iosAppLinkInfo: z.object({
        appLogoImage: z.object({
          contentDescription: z.object({
            defaultValue: z.unknown().optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
          ).optional(),
          privateImageId: z.string().describe(
            "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
          ).optional(),
          sourceUri: z.object({
            description: z.unknown().describe(
              "Additional information about the image, which is unused and retained only for backward compatibility.",
            ).optional(),
            localizedDescription: z.unknown().optional(),
            uri: z.unknown().describe(
              "The location of the image. URIs must have a scheme.",
            ).optional(),
          }).optional(),
        }).describe("Wrapping type for Google hosted images.").optional(),
        appTarget: z.object({
          packageName: z.string().describe(
            "Package name for AppTarget. For example: com.google.android.gm",
          ).optional(),
          targetUri: z.object({
            description: z.unknown().describe(
              "The URI's title appearing in the app as text. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens. Note that in some contexts this text is not used, such as when `description` is part of an image.",
            ).optional(),
            id: z.unknown().describe(
              "The ID associated with a uri. This field is here to enable ease of management of uris.",
            ).optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#uri"`.',
            ).optional(),
            localizedDescription: z.unknown().optional(),
            uri: z.unknown().describe(
              "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
            ).optional(),
          }).optional(),
        }).optional(),
        description: z.object({
          defaultValue: z.object({
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
            ).optional(),
            language: z.unknown().describe(
              'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
            ).optional(),
            value: z.unknown().describe("The UTF-8 encoded translated string.")
              .optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        title: z.object({
          defaultValue: z.object({
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
            ).optional(),
            language: z.unknown().describe(
              'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
            ).optional(),
            value: z.unknown().describe("The UTF-8 encoded translated string.")
              .optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
      }).optional(),
      webAppLinkInfo: z.object({
        appLogoImage: z.object({
          contentDescription: z.object({
            defaultValue: z.unknown().optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
          ).optional(),
          privateImageId: z.string().describe(
            "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
          ).optional(),
          sourceUri: z.object({
            description: z.unknown().describe(
              "Additional information about the image, which is unused and retained only for backward compatibility.",
            ).optional(),
            localizedDescription: z.unknown().optional(),
            uri: z.unknown().describe(
              "The location of the image. URIs must have a scheme.",
            ).optional(),
          }).optional(),
        }).describe("Wrapping type for Google hosted images.").optional(),
        appTarget: z.object({
          packageName: z.string().describe(
            "Package name for AppTarget. For example: com.google.android.gm",
          ).optional(),
          targetUri: z.object({
            description: z.unknown().describe(
              "The URI's title appearing in the app as text. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens. Note that in some contexts this text is not used, such as when `description` is part of an image.",
            ).optional(),
            id: z.unknown().describe(
              "The ID associated with a uri. This field is here to enable ease of management of uris.",
            ).optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#uri"`.',
            ).optional(),
            localizedDescription: z.unknown().optional(),
            uri: z.unknown().describe(
              "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
            ).optional(),
          }).optional(),
        }).optional(),
        description: z.object({
          defaultValue: z.object({
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
            ).optional(),
            language: z.unknown().describe(
              'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
            ).optional(),
            value: z.unknown().describe("The UTF-8 encoded translated string.")
              .optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        title: z.object({
          defaultValue: z.object({
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
            ).optional(),
            language: z.unknown().describe(
              'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
            ).optional(),
            value: z.unknown().describe("The UTF-8 encoded translated string.")
              .optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
      }).optional(),
    }).optional(),
    callbackOptions: z.object({
      updateRequestUrl: z.string().describe(
        "URL for the merchant endpoint that would be called to request updates. The URL should be hosted on HTTPS and robots.txt should allow the URL path to be accessible by UserAgent:Googlebot. Deprecated.",
      ).optional(),
      url: z.string().describe(
        "The HTTPS url configured by the merchant. The URL should be hosted on HTTPS and robots.txt should allow the URL path to be accessible by UserAgent:Googlebot.",
      ).optional(),
    }).optional(),
    classTemplateInfo: z.object({
      cardBarcodeSectionDetails: z.object({
        firstBottomDetail: z.object({
          fieldSelector: z.object({
            fields: z.unknown().describe(
              "If more than one reference is supplied, then the first one that references a non-empty field will be displayed.",
            ).optional(),
          }).describe("Custom field selector to use with field overrides.")
            .optional(),
        }).optional(),
        firstTopDetail: z.object({
          fieldSelector: z.object({
            fields: z.unknown().describe(
              "If more than one reference is supplied, then the first one that references a non-empty field will be displayed.",
            ).optional(),
          }).describe("Custom field selector to use with field overrides.")
            .optional(),
        }).optional(),
        secondTopDetail: z.object({
          fieldSelector: z.object({
            fields: z.unknown().describe(
              "If more than one reference is supplied, then the first one that references a non-empty field will be displayed.",
            ).optional(),
          }).describe("Custom field selector to use with field overrides.")
            .optional(),
        }).optional(),
      }).optional(),
      cardTemplateOverride: z.object({
        cardRowTemplateInfos: z.array(z.object({
          oneItem: z.unknown().optional(),
          threeItems: z.unknown().optional(),
          twoItems: z.unknown().optional(),
        })).describe(
          "Template information for rows in the card view. At most three rows are allowed to be specified.",
        ).optional(),
      }).optional(),
      detailsTemplateOverride: z.object({
        detailsItemInfos: z.array(z.object({
          item: z.unknown().optional(),
        })).describe(
          'Information for the "nth" item displayed in the details list.',
        ).optional(),
      }).optional(),
      listTemplateOverride: z.object({
        firstRowOption: z.object({
          fieldOption: z.object({
            fields: z.unknown().describe(
              "If more than one reference is supplied, then the first one that references a non-empty field will be displayed.",
            ).optional(),
          }).describe("Custom field selector to use with field overrides.")
            .optional(),
          transitOption: z.enum([
            "TRANSIT_OPTION_UNSPECIFIED",
            "ORIGIN_AND_DESTINATION_NAMES",
            "originAndDestinationNames",
            "ORIGIN_AND_DESTINATION_CODES",
            "originAndDestinationCodes",
            "ORIGIN_NAME",
            "originName",
          ]).optional(),
        }).optional(),
        secondRowOption: z.object({
          fields: z.array(z.unknown()).describe(
            "If more than one reference is supplied, then the first one that references a non-empty field will be displayed.",
          ).optional(),
        }).describe("Custom field selector to use with field overrides.")
          .optional(),
        thirdRowOption: z.object({
          fields: z.array(z.unknown()).describe(
            "If more than one reference is supplied, then the first one that references a non-empty field will be displayed.",
          ).optional(),
        }).describe("Custom field selector to use with field overrides.")
          .optional(),
      }).optional(),
    }).optional(),
    countryCode: z.string().describe(
      "Country code used to display the card's country (when the user is not in that country), as well as to display localized content when content is not available in the user's locale.",
    ).optional(),
    details: z.string().describe("The details of the offer.").optional(),
    enableSmartTap: z.boolean().describe(
      "Identifies whether this class supports Smart Tap. The `redemptionIssuers` and object level `smartTapRedemptionLevel` fields must also be set up correctly in order for a pass to support Smart Tap.",
    ).optional(),
    finePrint: z.string().describe(
      'The fine print or terms of the offer, such as "20% off any t-shirt at Adam\'s Apparel."',
    ).optional(),
    helpUri: z.object({
      description: z.string().describe(
        "The URI's title appearing in the app as text. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens. Note that in some contexts this text is not used, such as when `description` is part of an image.",
      ).optional(),
      id: z.string().describe(
        "The ID associated with a uri. This field is here to enable ease of management of uris.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#uri"`.',
      ).optional(),
      localizedDescription: z.object({
        defaultValue: z.object({
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.string().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.string().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        })).describe("Contains the translations for the string.").optional(),
      }).optional(),
      uri: z.string().describe(
        "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
      ).optional(),
    }).optional(),
    heroImage: z.object({
      contentDescription: z.object({
        defaultValue: z.object({
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.string().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.string().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        })).describe("Contains the translations for the string.").optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
      ).optional(),
      privateImageId: z.string().describe(
        "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
      ).optional(),
      sourceUri: z.object({
        description: z.string().describe(
          "Additional information about the image, which is unused and retained only for backward compatibility.",
        ).optional(),
        localizedDescription: z.object({
          defaultValue: z.object({
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
            ).optional(),
            language: z.unknown().describe(
              'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
            ).optional(),
            value: z.unknown().describe("The UTF-8 encoded translated string.")
              .optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        uri: z.string().describe(
          "The location of the image. URIs must have a scheme.",
        ).optional(),
      }).optional(),
    }).describe("Wrapping type for Google hosted images.").optional(),
    hexBackgroundColor: z.string().describe(
      "The background color for the card. If not set the dominant color of the hero image is used, and if no hero image is set, the dominant color of the logo is used. The format is #rrggbb where rrggbb is a hex RGB triplet, such as `#ffcc00`. You can also use the shorthand version of the RGB triplet which is #rgb, such as `#fc0`.",
    ).optional(),
    homepageUri: z.object({
      description: z.string().describe(
        "The URI's title appearing in the app as text. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens. Note that in some contexts this text is not used, such as when `description` is part of an image.",
      ).optional(),
      id: z.string().describe(
        "The ID associated with a uri. This field is here to enable ease of management of uris.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#uri"`.',
      ).optional(),
      localizedDescription: z.object({
        defaultValue: z.object({
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.string().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.string().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        })).describe("Contains the translations for the string.").optional(),
      }).optional(),
      uri: z.string().describe(
        "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
      ).optional(),
    }).optional(),
    id: z.string().describe(
      "Required. The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'.",
    ).optional(),
    imageModulesData: z.array(z.object({
      id: z.string().describe(
        "The ID associated with an image module. This field is here to enable ease of management of image modules.",
      ).optional(),
      mainImage: z.object({
        contentDescription: z.object({
          defaultValue: z.unknown().optional(),
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.unknown().describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
        ).optional(),
        privateImageId: z.string().describe(
          "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
        ).optional(),
        sourceUri: z.object({
          description: z.unknown().describe(
            "Additional information about the image, which is unused and retained only for backward compatibility.",
          ).optional(),
          localizedDescription: z.unknown().optional(),
          uri: z.unknown().describe(
            "The location of the image. URIs must have a scheme.",
          ).optional(),
        }).optional(),
      }).describe("Wrapping type for Google hosted images.").optional(),
    })).describe(
      "Image module data. The maximum number of these fields displayed is 1 from object level and 1 for class object level.",
    ).optional(),
    infoModuleData: z.object({
      labelValueRows: z.array(z.object({
        columns: z.array(z.unknown()).describe(
          "A list of labels and values. These will be displayed in a singular column, one after the other, not in multiple columns, despite the field name.",
        ).optional(),
      })).describe(
        "A list of collections of labels and values. These will be displayed one after the other in a singular column.",
      ).optional(),
      showLastUpdateTime: z.boolean().optional(),
    }).optional(),
    issuerName: z.string().describe(
      "Required. The issuer name. Recommended maximum length is 20 characters to ensure full string is displayed on smaller screens.",
    ).optional(),
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#offerClass"`.',
    ).optional(),
    linksModuleData: z.object({
      uris: z.array(z.object({
        description: z.string().describe(
          "The URI's title appearing in the app as text. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens. Note that in some contexts this text is not used, such as when `description` is part of an image.",
        ).optional(),
        id: z.string().describe(
          "The ID associated with a uri. This field is here to enable ease of management of uris.",
        ).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#uri"`.',
        ).optional(),
        localizedDescription: z.object({
          defaultValue: z.unknown().optional(),
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.unknown().describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        uri: z.string().describe(
          "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
        ).optional(),
      })).describe("The list of URIs.").optional(),
    }).optional(),
    localizedDetails: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    localizedFinePrint: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    localizedIssuerName: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    localizedProvider: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    localizedShortTitle: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    localizedTitle: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    locations: z.array(z.object({
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#latLongPoint"`.',
      ).optional(),
      latitude: z.number().describe(
        "The latitude specified as any value in the range of -90.0 through +90.0, both inclusive. Values outside these bounds will be rejected.",
      ).optional(),
      longitude: z.number().describe(
        "The longitude specified in the range -180.0 through +180.0, both inclusive. Values outside these bounds will be rejected.",
      ).optional(),
    })).describe(
      "Note: This field is currently not supported to trigger geo notifications.",
    ).optional(),
    merchantLocations: z.array(z.object({
      latitude: z.number().describe(
        "The latitude specified as any value in the range of -90.0 through +90.0, both inclusive. Values outside these bounds will be rejected.",
      ).optional(),
      longitude: z.number().describe(
        "The longitude specified in the range -180.0 through +180.0, both inclusive. Values outside these bounds will be rejected.",
      ).optional(),
    })).describe(
      "Merchant locations. There is a maximum of ten on the class. Any additional MerchantLocations added beyond the 10 will be rejected. These locations will trigger a notification when a user enters within a Google-set radius of the point. This field replaces the deprecated LatLongPoints.",
    ).optional(),
    messages: z.array(z.object({
      body: z.string().describe("The message body.").optional(),
      displayInterval: z.object({
        end: z.object({
          date: z.unknown().describe(
            "An ISO 8601 extended format date/time. Offset may or may not be required (refer to the parent field's documentation). Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the date/time is intended for a physical location in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. Providing an offset makes this an absolute instant in time around the world. The date/time will be adjusted based on the user's time zone. For example, a time of `2018-06-19T18:30:00-04:00` will be 18:30:00 for a user in New York and 15:30:00 for a user in Los Angeles. Omitting the offset makes this a local date/time, representing several instants in time around the world. The date/time will always be in the user's current time zone. For example, a time of `2018-06-19T18:30:00` will be 18:30:00 for a user in New York and also 18:30:00 for a user in Los Angeles. This is useful when the same local date/time should apply to many physical locations across several time zones.",
          ).optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#timeInterval"`.',
        ).optional(),
        start: z.object({
          date: z.unknown().describe(
            "An ISO 8601 extended format date/time. Offset may or may not be required (refer to the parent field's documentation). Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the date/time is intended for a physical location in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. Providing an offset makes this an absolute instant in time around the world. The date/time will be adjusted based on the user's time zone. For example, a time of `2018-06-19T18:30:00-04:00` will be 18:30:00 for a user in New York and 15:30:00 for a user in Los Angeles. Omitting the offset makes this a local date/time, representing several instants in time around the world. The date/time will always be in the user's current time zone. For example, a time of `2018-06-19T18:30:00` will be 18:30:00 for a user in New York and also 18:30:00 for a user in Los Angeles. This is useful when the same local date/time should apply to many physical locations across several time zones.",
          ).optional(),
        }).optional(),
      }).optional(),
      header: z.string().describe("The message header.").optional(),
      id: z.string().describe(
        "The ID associated with a message. This field is here to enable ease of management of messages. Notice ID values could possibly duplicate across multiple messages in the same class/instance, and care must be taken to select a reasonable ID for each message.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#walletObjectMessage"`.',
      ).optional(),
      localizedBody: z.object({
        defaultValue: z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.unknown()).describe(
          "Contains the translations for the string.",
        ).optional(),
      }).optional(),
      localizedHeader: z.object({
        defaultValue: z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.unknown()).describe(
          "Contains the translations for the string.",
        ).optional(),
      }).optional(),
      messageType: z.enum([
        "MESSAGE_TYPE_UNSPECIFIED",
        "TEXT",
        "text",
        "EXPIRATION_NOTIFICATION",
        "expirationNotification",
        "TEXT_AND_NOTIFY",
      ]).describe("The message type.").optional(),
    })).describe(
      "An array of messages displayed in the app. All users of this object will receive its associated messages. The maximum number of these fields is 10.",
    ).optional(),
    multipleDevicesAndHoldersAllowedStatus: z.enum([
      "STATUS_UNSPECIFIED",
      "MULTIPLE_HOLDERS",
      "ONE_USER_ALL_DEVICES",
      "ONE_USER_ONE_DEVICE",
      "multipleHolders",
      "oneUserAllDevices",
      "oneUserOneDevice",
    ]).describe(
      "Identifies whether multiple users and devices will save the same object referencing this class.",
    ).optional(),
    notifyPreference: z.enum([
      "NOTIFICATION_SETTINGS_FOR_UPDATES_UNSPECIFIED",
      "NOTIFY_ON_UPDATE",
    ]).describe(
      "Whether or not field updates to this class should trigger notifications. When set to NOTIFY, we will attempt to trigger a field update notification to users. These notifications will only be sent to users if the field is part of an allowlist. If not specified, no notification will be triggered. This setting is ephemeral and needs to be set with each PATCH or UPDATE request, otherwise a notification will not be triggered.",
    ).optional(),
    provider: z.string().describe(
      "Required. The offer provider (either the aggregator name or merchant name). Recommended maximum length is 12 characters to ensure full string is displayed on smaller screens.",
    ).optional(),
    redemptionChannel: z.enum([
      "REDEMPTION_CHANNEL_UNSPECIFIED",
      "INSTORE",
      "instore",
      "ONLINE",
      "online",
      "BOTH",
      "both",
      "TEMPORARY_PRICE_REDUCTION",
      "temporaryPriceReduction",
    ]).describe("Required. The redemption channels applicable to this offer.")
      .optional(),
    redemptionIssuers: z.array(z.string()).describe(
      "Identifies which redemption issuers can redeem the pass over Smart Tap. Redemption issuers are identified by their issuer ID. Redemption issuers must have at least one Smart Tap key configured. The `enableSmartTap` and object level `smartTapRedemptionLevel` fields must also be set up correctly in order for a pass to support Smart Tap.",
    ).optional(),
    review: z.object({
      comments: z.string().optional(),
    }).optional(),
    reviewStatus: z.enum([
      "REVIEW_STATUS_UNSPECIFIED",
      "UNDER_REVIEW",
      "underReview",
      "APPROVED",
      "approved",
      "REJECTED",
      "rejected",
      "DRAFT",
      "draft",
    ]).describe(
      "Required. The status of the class. This field can be set to `draft` or The status of the class. This field can be set to `draft` or `underReview` using the insert, patch, or update API calls. Once the review state is changed from `draft` it may not be changed back to `draft`. You should keep this field to `draft` when the class is under development. A `draft` class cannot be used to create any object. You should set this field to `underReview` when you believe the class is ready for use. The platform will automatically set this field to `approved` and it can be immediately used to create or migrate objects. When updating an already `approved` class you should keep setting this field to `underReview`.",
    ).optional(),
    securityAnimation: z.object({
      animationType: z.enum([
        "ANIMATION_UNSPECIFIED",
        "FOIL_SHIMMER",
        "foilShimmer",
      ]).describe("Type of animation.").optional(),
    }).optional(),
    shortTitle: z.string().describe(
      'A shortened version of the title of the offer, such as "20% off," shown to users as a quick reference to the offer contents. Recommended maximum length is 20 characters.',
    ).optional(),
    textModulesData: z.array(z.object({
      body: z.string().describe(
        "The body of the Text Module, which is defined as an uninterrupted string. Recommended maximum length is 500 characters to ensure full string is displayed on smaller screens.",
      ).optional(),
      header: z.string().describe(
        "The header of the Text Module. Recommended maximum length is 35 characters to ensure full string is displayed on smaller screens.",
      ).optional(),
      id: z.string().describe(
        "The ID associated with a text module. This field is here to enable ease of management of text modules and referencing them in template overrides. The ID should only include alphanumeric characters, '_', or '-'. It can not include dots, as dots are used to separate fields within FieldReference.fieldPaths in template overrides.",
      ).optional(),
      localizedBody: z.object({
        defaultValue: z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.unknown()).describe(
          "Contains the translations for the string.",
        ).optional(),
      }).optional(),
      localizedHeader: z.object({
        defaultValue: z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.unknown()).describe(
          "Contains the translations for the string.",
        ).optional(),
      }).optional(),
    })).describe(
      "Text module data. If text module data is also defined on the class, both will be displayed. The maximum number of these fields displayed is 10 from the object and 10 from the class.",
    ).optional(),
    title: z.string().describe(
      'Required. The title of the offer, such as "20% off any t-shirt." Recommended maximum length is 60 characters to ensure full string is displayed on smaller screens.',
    ).optional(),
    titleImage: z.object({
      contentDescription: z.object({
        defaultValue: z.object({
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.string().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.string().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        })).describe("Contains the translations for the string.").optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
      ).optional(),
      privateImageId: z.string().describe(
        "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
      ).optional(),
      sourceUri: z.object({
        description: z.string().describe(
          "Additional information about the image, which is unused and retained only for backward compatibility.",
        ).optional(),
        localizedDescription: z.object({
          defaultValue: z.object({
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
            ).optional(),
            language: z.unknown().describe(
              'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
            ).optional(),
            value: z.unknown().describe("The UTF-8 encoded translated string.")
              .optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        uri: z.string().describe(
          "The location of the image. URIs must have a scheme.",
        ).optional(),
      }).optional(),
    }).describe("Wrapping type for Google hosted images.").optional(),
    valueAddedModuleData: z.array(z.object({
      body: z.object({
        defaultValue: z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.unknown()).describe(
          "Contains the translations for the string.",
        ).optional(),
      }).optional(),
      header: z.object({
        defaultValue: z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.unknown()).describe(
          "Contains the translations for the string.",
        ).optional(),
      }).optional(),
      image: z.object({
        contentDescription: z.object({
          defaultValue: z.unknown().optional(),
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.unknown().describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
        ).optional(),
        privateImageId: z.string().describe(
          "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
        ).optional(),
        sourceUri: z.object({
          description: z.unknown().describe(
            "Additional information about the image, which is unused and retained only for backward compatibility.",
          ).optional(),
          localizedDescription: z.unknown().optional(),
          uri: z.unknown().describe(
            "The location of the image. URIs must have a scheme.",
          ).optional(),
        }).optional(),
      }).describe("Wrapping type for Google hosted images.").optional(),
      sortIndex: z.number().int().describe(
        "The index for sorting the modules. Modules with a lower sort index are shown before modules with a higher sort index. If unspecified, the sort index is assumed to be INT_MAX. For two modules with the same index, the sorting behavior is undefined.",
      ).optional(),
      uri: z.string().describe(
        "URI that the module leads to on click. This can be a web link or a deep link as mentioned in https://developer.android.com/training/app-links/deep-linking.",
      ).optional(),
      viewConstraints: z.object({
        displayInterval: z.object({
          end: z.unknown().optional(),
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#timeInterval"`.',
          ).optional(),
          start: z.unknown().optional(),
        }).optional(),
      }).describe(
        "Constraints that all must be met for the module to be shown.",
      ).optional(),
    })).describe(
      "Optional value added module data. Maximum of fifteen on the class. For a pass only fifteen will be displayed, prioritizing those from the object.",
    ).optional(),
    version: z.string().describe("Deprecated").optional(),
    viewUnlockRequirement: z.enum([
      "VIEW_UNLOCK_REQUIREMENT_UNSPECIFIED",
      "UNLOCK_NOT_REQUIRED",
      "UNLOCK_REQUIRED_TO_VIEW",
    ]).describe("View Unlock Requirement options for the offer.").optional(),
    wideTitleImage: z.object({
      contentDescription: z.object({
        defaultValue: z.object({
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.string().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.string().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        })).describe("Contains the translations for the string.").optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
      ).optional(),
      privateImageId: z.string().describe(
        "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
      ).optional(),
      sourceUri: z.object({
        description: z.string().describe(
          "Additional information about the image, which is unused and retained only for backward compatibility.",
        ).optional(),
        localizedDescription: z.object({
          defaultValue: z.object({
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
            ).optional(),
            language: z.unknown().describe(
              'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
            ).optional(),
            value: z.unknown().describe("The UTF-8 encoded translated string.")
              .optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        uri: z.string().describe(
          "The location of the image. URIs must have a scheme.",
        ).optional(),
      }).optional(),
    }).describe("Wrapping type for Google hosted images.").optional(),
    wordMark: z.object({
      contentDescription: z.object({
        defaultValue: z.object({
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.string().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.string().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        })).describe("Contains the translations for the string.").optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
      ).optional(),
      privateImageId: z.string().describe(
        "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
      ).optional(),
      sourceUri: z.object({
        description: z.string().describe(
          "Additional information about the image, which is unused and retained only for backward compatibility.",
        ).optional(),
        localizedDescription: z.object({
          defaultValue: z.object({
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
            ).optional(),
            language: z.unknown().describe(
              'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
            ).optional(),
            value: z.unknown().describe("The UTF-8 encoded translated string.")
              .optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        uri: z.string().describe(
          "The location of the image. URIs must have a scheme.",
        ).optional(),
      }).optional(),
    }).describe("Wrapping type for Google hosted images.").optional(),
  }).optional(),
  disableExpirationNotification: z.boolean().describe(
    "Indicates if notifications should explicitly be suppressed. If this field is set to true, regardless of the `messages` field, expiration notifications to the user will be suppressed. By default, this field is set to false. Currently, this can only be set for offers.",
  ).optional(),
  groupingInfo: z.object({
    groupingId: z.string().describe(
      "Optional grouping ID for grouping the passes with the same ID visually together. Grouping with different types of passes is allowed.",
    ).optional(),
    sortIndex: z.number().int().describe(
      "Optional index for sorting the passes when they are grouped with other passes. Passes with lower sort index are shown before passes with higher sort index. If unspecified, the value is assumed to be INT_MAX. For two passes with the same sort index, the sorting behavior is undefined.",
    ).optional(),
  }).optional(),
  hasLinkedDevice: z.boolean().describe(
    "Whether this object is currently linked to a single device. This field is set by the platform when a user saves the object, linking it to their device. Intended for use by select partners. Contact support for additional information.",
  ).optional(),
  hasUsers: z.boolean().describe(
    "Indicates if the object has users. This field is set by the platform.",
  ).optional(),
  heroImage: z.object({
    contentDescription: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
    ).optional(),
    privateImageId: z.string().describe(
      "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
    ).optional(),
    sourceUri: z.object({
      description: z.string().describe(
        "Additional information about the image, which is unused and retained only for backward compatibility.",
      ).optional(),
      localizedDescription: z.object({
        defaultValue: z.object({
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.string().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.string().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        })).describe("Contains the translations for the string.").optional(),
      }).optional(),
      uri: z.string().describe(
        "The location of the image. URIs must have a scheme.",
      ).optional(),
    }).optional(),
  }).describe("Wrapping type for Google hosted images.").optional(),
  id: z.string().describe(
    "Required. The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID.identifier where the former is issued by Google and latter is chosen by you. The unique identifier should only include alphanumeric characters, '.', '_', or '-'.",
  ).optional(),
  imageModulesData: z.array(z.object({
    id: z.string().describe(
      "The ID associated with an image module. This field is here to enable ease of management of image modules.",
    ).optional(),
    mainImage: z.object({
      contentDescription: z.object({
        defaultValue: z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.unknown()).describe(
          "Contains the translations for the string.",
        ).optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
      ).optional(),
      privateImageId: z.string().describe(
        "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
      ).optional(),
      sourceUri: z.object({
        description: z.string().describe(
          "Additional information about the image, which is unused and retained only for backward compatibility.",
        ).optional(),
        localizedDescription: z.object({
          defaultValue: z.unknown().optional(),
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.unknown().describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        uri: z.string().describe(
          "The location of the image. URIs must have a scheme.",
        ).optional(),
      }).optional(),
    }).describe("Wrapping type for Google hosted images.").optional(),
  })).describe(
    "Image module data. The maximum number of these fields displayed is 1 from object level and 1 for class object level.",
  ).optional(),
  infoModuleData: z.object({
    labelValueRows: z.array(z.object({
      columns: z.array(z.object({
        label: z.unknown().describe(
          "The label for a specific row and column. Recommended maximum is 15 characters for a two-column layout and 30 characters for a one-column layout.",
        ).optional(),
        localizedLabel: z.unknown().optional(),
        localizedValue: z.unknown().optional(),
        value: z.unknown().describe(
          "The value for a specific row and column. Recommended maximum is 15 characters for a two-column layout and 30 characters for a one-column layout.",
        ).optional(),
      })).describe(
        "A list of labels and values. These will be displayed in a singular column, one after the other, not in multiple columns, despite the field name.",
      ).optional(),
    })).describe(
      "A list of collections of labels and values. These will be displayed one after the other in a singular column.",
    ).optional(),
    showLastUpdateTime: z.boolean().optional(),
  }).optional(),
  linkedObjectIds: z.array(z.string()).describe(
    "linked_object_ids are a list of other objects such as event ticket, loyalty, offer, generic, giftcard, transit and boarding pass that should be automatically attached to this offer object. If a user had saved this offer, then these linked_object_ids would be automatically pushed to the user's wallet (unless they turned off the setting to receive such linked passes). Make sure that objects present in linked_object_ids are already inserted - if not, calls would fail. Once linked, the linked objects cannot be unlinked. You cannot link objects belonging to another issuer. There is a limit to the number of objects that can be linked to a single object. After the limit is reached, new linked objects in the call will be ignored silently. Object IDs should follow the format issuer ID.identifier where the former is issued by Google and the latter is chosen by you.",
  ).optional(),
  linksModuleData: z.object({
    uris: z.array(z.object({
      description: z.string().describe(
        "The URI's title appearing in the app as text. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens. Note that in some contexts this text is not used, such as when `description` is part of an image.",
      ).optional(),
      id: z.string().describe(
        "The ID associated with a uri. This field is here to enable ease of management of uris.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#uri"`.',
      ).optional(),
      localizedDescription: z.object({
        defaultValue: z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.unknown()).describe(
          "Contains the translations for the string.",
        ).optional(),
      }).optional(),
      uri: z.string().describe(
        "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
      ).optional(),
    })).describe("The list of URIs.").optional(),
  }).optional(),
  locations: z.array(z.object({
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#latLongPoint"`.',
    ).optional(),
    latitude: z.number().describe(
      "The latitude specified as any value in the range of -90.0 through +90.0, both inclusive. Values outside these bounds will be rejected.",
    ).optional(),
    longitude: z.number().describe(
      "The longitude specified in the range -180.0 through +180.0, both inclusive. Values outside these bounds will be rejected.",
    ).optional(),
  })).describe(
    "Note: This field is currently not supported to trigger geo notifications.",
  ).optional(),
  merchantLocations: z.array(z.object({
    latitude: z.number().describe(
      "The latitude specified as any value in the range of -90.0 through +90.0, both inclusive. Values outside these bounds will be rejected.",
    ).optional(),
    longitude: z.number().describe(
      "The longitude specified in the range -180.0 through +180.0, both inclusive. Values outside these bounds will be rejected.",
    ).optional(),
  })).describe(
    "Merchant locations. There is a maximum of ten on the object. Any additional MerchantLocations added beyond the 10 will be rejected. These locations will trigger a notification when a user enters within a Google-set radius of the point. This field replaces the deprecated LatLongPoints.",
  ).optional(),
  messages: z.array(z.object({
    body: z.string().describe("The message body.").optional(),
    displayInterval: z.object({
      end: z.object({
        date: z.string().describe(
          "An ISO 8601 extended format date/time. Offset may or may not be required (refer to the parent field's documentation). Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the date/time is intended for a physical location in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. Providing an offset makes this an absolute instant in time around the world. The date/time will be adjusted based on the user's time zone. For example, a time of `2018-06-19T18:30:00-04:00` will be 18:30:00 for a user in New York and 15:30:00 for a user in Los Angeles. Omitting the offset makes this a local date/time, representing several instants in time around the world. The date/time will always be in the user's current time zone. For example, a time of `2018-06-19T18:30:00` will be 18:30:00 for a user in New York and also 18:30:00 for a user in Los Angeles. This is useful when the same local date/time should apply to many physical locations across several time zones.",
        ).optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#timeInterval"`.',
      ).optional(),
      start: z.object({
        date: z.string().describe(
          "An ISO 8601 extended format date/time. Offset may or may not be required (refer to the parent field's documentation). Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the date/time is intended for a physical location in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. Providing an offset makes this an absolute instant in time around the world. The date/time will be adjusted based on the user's time zone. For example, a time of `2018-06-19T18:30:00-04:00` will be 18:30:00 for a user in New York and 15:30:00 for a user in Los Angeles. Omitting the offset makes this a local date/time, representing several instants in time around the world. The date/time will always be in the user's current time zone. For example, a time of `2018-06-19T18:30:00` will be 18:30:00 for a user in New York and also 18:30:00 for a user in Los Angeles. This is useful when the same local date/time should apply to many physical locations across several time zones.",
        ).optional(),
      }).optional(),
    }).optional(),
    header: z.string().describe("The message header.").optional(),
    id: z.string().describe(
      "The ID associated with a message. This field is here to enable ease of management of messages. Notice ID values could possibly duplicate across multiple messages in the same class/instance, and care must be taken to select a reasonable ID for each message.",
    ).optional(),
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#walletObjectMessage"`.',
    ).optional(),
    localizedBody: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.unknown().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.unknown().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.unknown().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    localizedHeader: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.unknown().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.unknown().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.unknown().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    messageType: z.enum([
      "MESSAGE_TYPE_UNSPECIFIED",
      "TEXT",
      "text",
      "EXPIRATION_NOTIFICATION",
      "expirationNotification",
      "TEXT_AND_NOTIFY",
    ]).describe("The message type.").optional(),
  })).describe(
    "An array of messages displayed in the app. All users of this object will receive its associated messages. The maximum number of these fields is 10.",
  ).optional(),
  notifyPreference: z.enum([
    "NOTIFICATION_SETTINGS_FOR_UPDATES_UNSPECIFIED",
    "NOTIFY_ON_UPDATE",
  ]).describe(
    "Whether or not field updates to this object should trigger notifications. When set to NOTIFY, we will attempt to trigger a field update notification to users. These notifications will only be sent to users if the field is part of an allowlist. If set to DO_NOT_NOTIFY or NOTIFICATION_SETTINGS_UNSPECIFIED, no notification will be triggered. This setting is ephemeral and needs to be set with each PATCH or UPDATE request, otherwise a notification will not be triggered.",
  ).optional(),
  passConstraints: z.object({
    nfcConstraint: z.array(
      z.enum([
        "NFC_CONSTRAINT_UNSPECIFIED",
        "BLOCK_PAYMENT",
        "BLOCK_CLOSED_LOOP_TRANSIT",
      ]),
    ).describe("The NFC constraints for the pass.").optional(),
    screenshotEligibility: z.enum([
      "SCREENSHOT_ELIGIBILITY_UNSPECIFIED",
      "ELIGIBLE",
      "INELIGIBLE",
    ]).describe("The screenshot eligibility for the pass.").optional(),
  }).describe("Container for any constraints that may be placed on passes.")
    .optional(),
  rotatingBarcode: z.object({
    alternateText: z.string().describe(
      "An optional text that will override the default text that shows under the barcode. This field is intended for a human readable equivalent of the barcode value, used when the barcode cannot be scanned.",
    ).optional(),
    initialRotatingBarcodeValues: z.object({
      periodMillis: z.string().describe(
        "Required. The amount of time each barcode is valid for.",
      ).optional(),
      startDateTime: z.string().describe(
        "Required. The date/time the first barcode is valid from. Barcodes will be rotated through using period_millis defined on the object's RotatingBarcodeValueInfo. This is an ISO 8601 extended format date/time, with an offset. Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the event were in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year.",
      ).optional(),
      values: z.array(z.string()).describe(
        "Required. The values to encode in the barcode. At least one value is required.",
      ).optional(),
    }).describe("A payload containing many barcode values and start date/time.")
      .optional(),
    renderEncoding: z.enum(["RENDER_ENCODING_UNSPECIFIED", "UTF_8"]).describe(
      "The render encoding for the barcode. When specified, barcode is rendered in the given encoding. Otherwise best known encoding is chosen by Google.",
    ).optional(),
    showCodeText: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    totpDetails: z.object({
      algorithm: z.enum(["TOTP_ALGORITHM_UNSPECIFIED", "TOTP_SHA1"]).describe(
        "The TOTP algorithm used to generate the OTP.",
      ).optional(),
      parameters: z.array(z.object({
        key: z.string().describe(
          "The secret key used for the TOTP value generation, encoded as a Base16 string.",
        ).optional(),
        valueLength: z.number().int().describe(
          "The length of the TOTP value in decimal digits.",
        ).optional(),
      })).describe(
        "The TOTP parameters for each of the {totp_value_*} substitutions. The TotpParameters at index n is used for the {totp_value_n} substitution.",
      ).optional(),
      periodMillis: z.string().describe(
        "The time interval used for the TOTP value generation, in milliseconds.",
      ).optional(),
    }).describe(
      "Configuration for the time-based OTP substitutions. See https://tools.ietf.org/html/rfc6238",
    ).optional(),
    type: z.enum([
      "BARCODE_TYPE_UNSPECIFIED",
      "AZTEC",
      "aztec",
      "CODE_39",
      "code39",
      "CODE_128",
      "code128",
      "CODABAR",
      "codabar",
      "DATA_MATRIX",
      "dataMatrix",
      "EAN_8",
      "ean8",
      "EAN_13",
      "ean13",
      "EAN13",
      "ITF_14",
      "itf14",
      "PDF_417",
      "pdf417",
      "PDF417",
      "QR_CODE",
      "qrCode",
      "qrcode",
      "UPC_A",
      "upcA",
      "TEXT_ONLY",
      "textOnly",
    ]).describe("The type of this barcode.").optional(),
    valuePattern: z.string().describe(
      "String encoded barcode value. This string supports the following substitutions: * {totp_value_n}: Replaced with the TOTP value (see TotpDetails.parameters). * {totp_timestamp_millis}: Replaced with the timestamp (millis since epoch) at which the barcode was generated. * {totp_timestamp_seconds}: Replaced with the timestamp (seconds since epoch) at which the barcode was generated.",
    ).optional(),
  }).optional(),
  saveRestrictions: z.object({
    restrictToEmailSha256: z.string().describe(
      'Restrict the save of the referencing object to the given email address only. This is the hex output of SHA256 sum of the email address, all lowercase and without any notations like "." or "+", except "@". For example, for example@example.com, this value will be 31c5543c1734d25c7206f5fd591525d0295bec6fe84ff82f946a34fe970a1e66 and for Example@example.com, this value will be bc34f262c93ad7122763684ccea6f07fb7f5d8a2d11e60ce15a6f43fe70ce632 If email address of the logged-in user who tries to save this pass does not match with the defined value here, users won\'t be allowed to save this pass. They will instead be prompted with an error to contact the issuer. This information should be gathered from the user with an explicit consent via Sign in with Google integration https://developers.google.com/identity/authentication. Please contact with support before using Save Restrictions.',
    ).optional(),
  }).describe(
    "Defines restrictions on the object that will be verified during save. Note: this is an advanced feature, please contact Google for implementation support.",
  ).optional(),
  smartTapRedemptionValue: z.string().describe(
    "The value that will be transmitted to a Smart Tap certified terminal over NFC for this object. The class level fields `enableSmartTap` and `redemptionIssuers` must also be set up correctly in order for the pass to support Smart Tap. Only ASCII characters are supported.",
  ).optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "ACTIVE",
    "active",
    "COMPLETED",
    "completed",
    "EXPIRED",
    "expired",
    "INACTIVE",
    "inactive",
  ]).describe(
    'Required. The state of the object. This field is used to determine how an object is displayed in the app. For example, an `inactive` object is moved to the "Expired passes" section.',
  ).optional(),
  textModulesData: z.array(z.object({
    body: z.string().describe(
      "The body of the Text Module, which is defined as an uninterrupted string. Recommended maximum length is 500 characters to ensure full string is displayed on smaller screens.",
    ).optional(),
    header: z.string().describe(
      "The header of the Text Module. Recommended maximum length is 35 characters to ensure full string is displayed on smaller screens.",
    ).optional(),
    id: z.string().describe(
      "The ID associated with a text module. This field is here to enable ease of management of text modules and referencing them in template overrides. The ID should only include alphanumeric characters, '_', or '-'. It can not include dots, as dots are used to separate fields within FieldReference.fieldPaths in template overrides.",
    ).optional(),
    localizedBody: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.unknown().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.unknown().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.unknown().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    localizedHeader: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.unknown().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.unknown().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.unknown().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
  })).describe(
    "Text module data. If text module data is also defined on the class, both will be displayed. The maximum number of these fields displayed is 10 from the object and 10 from the class.",
  ).optional(),
  validTimeInterval: z.object({
    end: z.object({
      date: z.string().describe(
        "An ISO 8601 extended format date/time. Offset may or may not be required (refer to the parent field's documentation). Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the date/time is intended for a physical location in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. Providing an offset makes this an absolute instant in time around the world. The date/time will be adjusted based on the user's time zone. For example, a time of `2018-06-19T18:30:00-04:00` will be 18:30:00 for a user in New York and 15:30:00 for a user in Los Angeles. Omitting the offset makes this a local date/time, representing several instants in time around the world. The date/time will always be in the user's current time zone. For example, a time of `2018-06-19T18:30:00` will be 18:30:00 for a user in New York and also 18:30:00 for a user in Los Angeles. This is useful when the same local date/time should apply to many physical locations across several time zones.",
      ).optional(),
    }).optional(),
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#timeInterval"`.',
    ).optional(),
    start: z.object({
      date: z.string().describe(
        "An ISO 8601 extended format date/time. Offset may or may not be required (refer to the parent field's documentation). Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the date/time is intended for a physical location in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. Providing an offset makes this an absolute instant in time around the world. The date/time will be adjusted based on the user's time zone. For example, a time of `2018-06-19T18:30:00-04:00` will be 18:30:00 for a user in New York and 15:30:00 for a user in Los Angeles. Omitting the offset makes this a local date/time, representing several instants in time around the world. The date/time will always be in the user's current time zone. For example, a time of `2018-06-19T18:30:00` will be 18:30:00 for a user in New York and also 18:30:00 for a user in Los Angeles. This is useful when the same local date/time should apply to many physical locations across several time zones.",
      ).optional(),
    }).optional(),
  }).optional(),
  valueAddedModuleData: z.array(z.object({
    body: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.unknown().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.unknown().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.unknown().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    header: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.unknown().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.unknown().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.unknown().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    image: z.object({
      contentDescription: z.object({
        defaultValue: z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.unknown()).describe(
          "Contains the translations for the string.",
        ).optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
      ).optional(),
      privateImageId: z.string().describe(
        "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
      ).optional(),
      sourceUri: z.object({
        description: z.string().describe(
          "Additional information about the image, which is unused and retained only for backward compatibility.",
        ).optional(),
        localizedDescription: z.object({
          defaultValue: z.unknown().optional(),
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.unknown().describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        uri: z.string().describe(
          "The location of the image. URIs must have a scheme.",
        ).optional(),
      }).optional(),
    }).describe("Wrapping type for Google hosted images.").optional(),
    sortIndex: z.number().int().describe(
      "The index for sorting the modules. Modules with a lower sort index are shown before modules with a higher sort index. If unspecified, the sort index is assumed to be INT_MAX. For two modules with the same index, the sorting behavior is undefined.",
    ).optional(),
    uri: z.string().describe(
      "URI that the module leads to on click. This can be a web link or a deep link as mentioned in https://developer.android.com/training/app-links/deep-linking.",
    ).optional(),
    viewConstraints: z.object({
      displayInterval: z.object({
        end: z.object({
          date: z.unknown().describe(
            "An ISO 8601 extended format date/time. Offset may or may not be required (refer to the parent field's documentation). Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the date/time is intended for a physical location in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. Providing an offset makes this an absolute instant in time around the world. The date/time will be adjusted based on the user's time zone. For example, a time of `2018-06-19T18:30:00-04:00` will be 18:30:00 for a user in New York and 15:30:00 for a user in Los Angeles. Omitting the offset makes this a local date/time, representing several instants in time around the world. The date/time will always be in the user's current time zone. For example, a time of `2018-06-19T18:30:00` will be 18:30:00 for a user in New York and also 18:30:00 for a user in Los Angeles. This is useful when the same local date/time should apply to many physical locations across several time zones.",
          ).optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#timeInterval"`.',
        ).optional(),
        start: z.object({
          date: z.unknown().describe(
            "An ISO 8601 extended format date/time. Offset may or may not be required (refer to the parent field's documentation). Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the date/time is intended for a physical location in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. Providing an offset makes this an absolute instant in time around the world. The date/time will be adjusted based on the user's time zone. For example, a time of `2018-06-19T18:30:00-04:00` will be 18:30:00 for a user in New York and 15:30:00 for a user in Los Angeles. Omitting the offset makes this a local date/time, representing several instants in time around the world. The date/time will always be in the user's current time zone. For example, a time of `2018-06-19T18:30:00` will be 18:30:00 for a user in New York and also 18:30:00 for a user in Los Angeles. This is useful when the same local date/time should apply to many physical locations across several time zones.",
          ).optional(),
        }).optional(),
      }).optional(),
    }).describe("Constraints that all must be met for the module to be shown.")
      .optional(),
  })).describe(
    "Optional value added module data. Maximum of fifteen on the object. For a pass only fifteen will be displayed.",
  ).optional(),
});

const StateSchema = z.object({
  appLinkData: z.object({
    androidAppLinkInfo: z.object({
      appLogoImage: z.object({
        contentDescription: z.object({
          defaultValue: z.object({
            kind: z.unknown(),
            language: z.unknown(),
            value: z.unknown(),
          }),
          kind: z.string(),
          translatedValues: z.array(z.unknown()),
        }),
        kind: z.string(),
        privateImageId: z.string(),
        sourceUri: z.object({
          description: z.string(),
          localizedDescription: z.object({
            defaultValue: z.unknown(),
            kind: z.unknown(),
            translatedValues: z.unknown(),
          }),
          uri: z.string(),
        }),
      }),
      appTarget: z.object({
        packageName: z.string(),
        targetUri: z.object({
          description: z.string(),
          id: z.string(),
          kind: z.string(),
          localizedDescription: z.object({
            defaultValue: z.unknown(),
            kind: z.unknown(),
            translatedValues: z.unknown(),
          }),
          uri: z.string(),
        }),
      }),
      description: z.object({
        defaultValue: z.object({
          kind: z.string(),
          language: z.string(),
          value: z.string(),
        }),
        kind: z.string(),
        translatedValues: z.array(z.object({
          kind: z.unknown(),
          language: z.unknown(),
          value: z.unknown(),
        })),
      }),
      title: z.object({
        defaultValue: z.object({
          kind: z.string(),
          language: z.string(),
          value: z.string(),
        }),
        kind: z.string(),
        translatedValues: z.array(z.object({
          kind: z.unknown(),
          language: z.unknown(),
          value: z.unknown(),
        })),
      }),
    }),
    displayText: z.object({
      defaultValue: z.object({
        kind: z.string(),
        language: z.string(),
        value: z.string(),
      }),
      kind: z.string(),
      translatedValues: z.array(z.object({
        kind: z.string(),
        language: z.string(),
        value: z.string(),
      })),
    }),
    iosAppLinkInfo: z.object({
      appLogoImage: z.object({
        contentDescription: z.object({
          defaultValue: z.object({
            kind: z.unknown(),
            language: z.unknown(),
            value: z.unknown(),
          }),
          kind: z.string(),
          translatedValues: z.array(z.unknown()),
        }),
        kind: z.string(),
        privateImageId: z.string(),
        sourceUri: z.object({
          description: z.string(),
          localizedDescription: z.object({
            defaultValue: z.unknown(),
            kind: z.unknown(),
            translatedValues: z.unknown(),
          }),
          uri: z.string(),
        }),
      }),
      appTarget: z.object({
        packageName: z.string(),
        targetUri: z.object({
          description: z.string(),
          id: z.string(),
          kind: z.string(),
          localizedDescription: z.object({
            defaultValue: z.unknown(),
            kind: z.unknown(),
            translatedValues: z.unknown(),
          }),
          uri: z.string(),
        }),
      }),
      description: z.object({
        defaultValue: z.object({
          kind: z.string(),
          language: z.string(),
          value: z.string(),
        }),
        kind: z.string(),
        translatedValues: z.array(z.object({
          kind: z.unknown(),
          language: z.unknown(),
          value: z.unknown(),
        })),
      }),
      title: z.object({
        defaultValue: z.object({
          kind: z.string(),
          language: z.string(),
          value: z.string(),
        }),
        kind: z.string(),
        translatedValues: z.array(z.object({
          kind: z.unknown(),
          language: z.unknown(),
          value: z.unknown(),
        })),
      }),
    }),
    webAppLinkInfo: z.object({
      appLogoImage: z.object({
        contentDescription: z.object({
          defaultValue: z.object({
            kind: z.unknown(),
            language: z.unknown(),
            value: z.unknown(),
          }),
          kind: z.string(),
          translatedValues: z.array(z.unknown()),
        }),
        kind: z.string(),
        privateImageId: z.string(),
        sourceUri: z.object({
          description: z.string(),
          localizedDescription: z.object({
            defaultValue: z.unknown(),
            kind: z.unknown(),
            translatedValues: z.unknown(),
          }),
          uri: z.string(),
        }),
      }),
      appTarget: z.object({
        packageName: z.string(),
        targetUri: z.object({
          description: z.string(),
          id: z.string(),
          kind: z.string(),
          localizedDescription: z.object({
            defaultValue: z.unknown(),
            kind: z.unknown(),
            translatedValues: z.unknown(),
          }),
          uri: z.string(),
        }),
      }),
      description: z.object({
        defaultValue: z.object({
          kind: z.string(),
          language: z.string(),
          value: z.string(),
        }),
        kind: z.string(),
        translatedValues: z.array(z.object({
          kind: z.unknown(),
          language: z.unknown(),
          value: z.unknown(),
        })),
      }),
      title: z.object({
        defaultValue: z.object({
          kind: z.string(),
          language: z.string(),
          value: z.string(),
        }),
        kind: z.string(),
        translatedValues: z.array(z.object({
          kind: z.unknown(),
          language: z.unknown(),
          value: z.unknown(),
        })),
      }),
    }),
  }).optional(),
  barcode: z.object({
    alternateText: z.string(),
    kind: z.string(),
    renderEncoding: z.string(),
    showCodeText: z.object({
      defaultValue: z.object({
        kind: z.string(),
        language: z.string(),
        value: z.string(),
      }),
      kind: z.string(),
      translatedValues: z.array(z.object({
        kind: z.string(),
        language: z.string(),
        value: z.string(),
      })),
    }),
    type: z.string(),
    value: z.string(),
  }).optional(),
  classId: z.string().optional(),
  classReference: z.object({
    allowMultipleUsersPerObject: z.boolean(),
    appLinkData: z.object({
      androidAppLinkInfo: z.object({
        appLogoImage: z.object({
          contentDescription: z.object({
            defaultValue: z.unknown(),
            kind: z.unknown(),
            translatedValues: z.unknown(),
          }),
          kind: z.string(),
          privateImageId: z.string(),
          sourceUri: z.object({
            description: z.unknown(),
            localizedDescription: z.unknown(),
            uri: z.unknown(),
          }),
        }),
        appTarget: z.object({
          packageName: z.string(),
          targetUri: z.object({
            description: z.unknown(),
            id: z.unknown(),
            kind: z.unknown(),
            localizedDescription: z.unknown(),
            uri: z.unknown(),
          }),
        }),
        description: z.object({
          defaultValue: z.object({
            kind: z.unknown(),
            language: z.unknown(),
            value: z.unknown(),
          }),
          kind: z.string(),
          translatedValues: z.array(z.unknown()),
        }),
        title: z.object({
          defaultValue: z.object({
            kind: z.unknown(),
            language: z.unknown(),
            value: z.unknown(),
          }),
          kind: z.string(),
          translatedValues: z.array(z.unknown()),
        }),
      }),
      displayText: z.object({
        defaultValue: z.object({
          kind: z.string(),
          language: z.string(),
          value: z.string(),
        }),
        kind: z.string(),
        translatedValues: z.array(z.object({
          kind: z.unknown(),
          language: z.unknown(),
          value: z.unknown(),
        })),
      }),
      iosAppLinkInfo: z.object({
        appLogoImage: z.object({
          contentDescription: z.object({
            defaultValue: z.unknown(),
            kind: z.unknown(),
            translatedValues: z.unknown(),
          }),
          kind: z.string(),
          privateImageId: z.string(),
          sourceUri: z.object({
            description: z.unknown(),
            localizedDescription: z.unknown(),
            uri: z.unknown(),
          }),
        }),
        appTarget: z.object({
          packageName: z.string(),
          targetUri: z.object({
            description: z.unknown(),
            id: z.unknown(),
            kind: z.unknown(),
            localizedDescription: z.unknown(),
            uri: z.unknown(),
          }),
        }),
        description: z.object({
          defaultValue: z.object({
            kind: z.unknown(),
            language: z.unknown(),
            value: z.unknown(),
          }),
          kind: z.string(),
          translatedValues: z.array(z.unknown()),
        }),
        title: z.object({
          defaultValue: z.object({
            kind: z.unknown(),
            language: z.unknown(),
            value: z.unknown(),
          }),
          kind: z.string(),
          translatedValues: z.array(z.unknown()),
        }),
      }),
      webAppLinkInfo: z.object({
        appLogoImage: z.object({
          contentDescription: z.object({
            defaultValue: z.unknown(),
            kind: z.unknown(),
            translatedValues: z.unknown(),
          }),
          kind: z.string(),
          privateImageId: z.string(),
          sourceUri: z.object({
            description: z.unknown(),
            localizedDescription: z.unknown(),
            uri: z.unknown(),
          }),
        }),
        appTarget: z.object({
          packageName: z.string(),
          targetUri: z.object({
            description: z.unknown(),
            id: z.unknown(),
            kind: z.unknown(),
            localizedDescription: z.unknown(),
            uri: z.unknown(),
          }),
        }),
        description: z.object({
          defaultValue: z.object({
            kind: z.unknown(),
            language: z.unknown(),
            value: z.unknown(),
          }),
          kind: z.string(),
          translatedValues: z.array(z.unknown()),
        }),
        title: z.object({
          defaultValue: z.object({
            kind: z.unknown(),
            language: z.unknown(),
            value: z.unknown(),
          }),
          kind: z.string(),
          translatedValues: z.array(z.unknown()),
        }),
      }),
    }),
    callbackOptions: z.object({
      updateRequestUrl: z.string(),
      url: z.string(),
    }),
    classTemplateInfo: z.object({
      cardBarcodeSectionDetails: z.object({
        firstBottomDetail: z.object({
          fieldSelector: z.object({
            fields: z.unknown(),
          }),
        }),
        firstTopDetail: z.object({
          fieldSelector: z.object({
            fields: z.unknown(),
          }),
        }),
        secondTopDetail: z.object({
          fieldSelector: z.object({
            fields: z.unknown(),
          }),
        }),
      }),
      cardTemplateOverride: z.object({
        cardRowTemplateInfos: z.array(z.object({
          oneItem: z.unknown(),
          threeItems: z.unknown(),
          twoItems: z.unknown(),
        })),
      }),
      detailsTemplateOverride: z.object({
        detailsItemInfos: z.array(z.object({
          item: z.unknown(),
        })),
      }),
      listTemplateOverride: z.object({
        firstRowOption: z.object({
          fieldOption: z.object({
            fields: z.unknown(),
          }),
          transitOption: z.string(),
        }),
        secondRowOption: z.object({
          fields: z.array(z.unknown()),
        }),
        thirdRowOption: z.object({
          fields: z.array(z.unknown()),
        }),
      }),
    }),
    countryCode: z.string(),
    details: z.string(),
    enableSmartTap: z.boolean(),
    finePrint: z.string(),
    helpUri: z.object({
      description: z.string(),
      id: z.string(),
      kind: z.string(),
      localizedDescription: z.object({
        defaultValue: z.object({
          kind: z.string(),
          language: z.string(),
          value: z.string(),
        }),
        kind: z.string(),
        translatedValues: z.array(z.object({
          kind: z.unknown(),
          language: z.unknown(),
          value: z.unknown(),
        })),
      }),
      uri: z.string(),
    }),
    heroImage: z.object({
      contentDescription: z.object({
        defaultValue: z.object({
          kind: z.string(),
          language: z.string(),
          value: z.string(),
        }),
        kind: z.string(),
        translatedValues: z.array(z.object({
          kind: z.unknown(),
          language: z.unknown(),
          value: z.unknown(),
        })),
      }),
      kind: z.string(),
      privateImageId: z.string(),
      sourceUri: z.object({
        description: z.string(),
        localizedDescription: z.object({
          defaultValue: z.object({
            kind: z.unknown(),
            language: z.unknown(),
            value: z.unknown(),
          }),
          kind: z.string(),
          translatedValues: z.array(z.unknown()),
        }),
        uri: z.string(),
      }),
    }),
    hexBackgroundColor: z.string(),
    homepageUri: z.object({
      description: z.string(),
      id: z.string(),
      kind: z.string(),
      localizedDescription: z.object({
        defaultValue: z.object({
          kind: z.string(),
          language: z.string(),
          value: z.string(),
        }),
        kind: z.string(),
        translatedValues: z.array(z.object({
          kind: z.unknown(),
          language: z.unknown(),
          value: z.unknown(),
        })),
      }),
      uri: z.string(),
    }),
    id: z.string(),
    imageModulesData: z.array(z.object({
      id: z.string(),
      mainImage: z.object({
        contentDescription: z.object({
          defaultValue: z.unknown(),
          kind: z.unknown(),
          translatedValues: z.unknown(),
        }),
        kind: z.string(),
        privateImageId: z.string(),
        sourceUri: z.object({
          description: z.unknown(),
          localizedDescription: z.unknown(),
          uri: z.unknown(),
        }),
      }),
    })),
    infoModuleData: z.object({
      labelValueRows: z.array(z.object({
        columns: z.array(z.unknown()),
      })),
      showLastUpdateTime: z.boolean(),
    }),
    issuerName: z.string(),
    kind: z.string(),
    linksModuleData: z.object({
      uris: z.array(z.object({
        description: z.string(),
        id: z.string(),
        kind: z.string(),
        localizedDescription: z.object({
          defaultValue: z.unknown(),
          kind: z.unknown(),
          translatedValues: z.unknown(),
        }),
        uri: z.string(),
      })),
    }),
    localizedDetails: z.object({
      defaultValue: z.object({
        kind: z.string(),
        language: z.string(),
        value: z.string(),
      }),
      kind: z.string(),
      translatedValues: z.array(z.object({
        kind: z.string(),
        language: z.string(),
        value: z.string(),
      })),
    }),
    localizedFinePrint: z.object({
      defaultValue: z.object({
        kind: z.string(),
        language: z.string(),
        value: z.string(),
      }),
      kind: z.string(),
      translatedValues: z.array(z.object({
        kind: z.string(),
        language: z.string(),
        value: z.string(),
      })),
    }),
    localizedIssuerName: z.object({
      defaultValue: z.object({
        kind: z.string(),
        language: z.string(),
        value: z.string(),
      }),
      kind: z.string(),
      translatedValues: z.array(z.object({
        kind: z.string(),
        language: z.string(),
        value: z.string(),
      })),
    }),
    localizedProvider: z.object({
      defaultValue: z.object({
        kind: z.string(),
        language: z.string(),
        value: z.string(),
      }),
      kind: z.string(),
      translatedValues: z.array(z.object({
        kind: z.string(),
        language: z.string(),
        value: z.string(),
      })),
    }),
    localizedShortTitle: z.object({
      defaultValue: z.object({
        kind: z.string(),
        language: z.string(),
        value: z.string(),
      }),
      kind: z.string(),
      translatedValues: z.array(z.object({
        kind: z.string(),
        language: z.string(),
        value: z.string(),
      })),
    }),
    localizedTitle: z.object({
      defaultValue: z.object({
        kind: z.string(),
        language: z.string(),
        value: z.string(),
      }),
      kind: z.string(),
      translatedValues: z.array(z.object({
        kind: z.string(),
        language: z.string(),
        value: z.string(),
      })),
    }),
    locations: z.array(z.object({
      kind: z.string(),
      latitude: z.number(),
      longitude: z.number(),
    })),
    merchantLocations: z.array(z.object({
      latitude: z.number(),
      longitude: z.number(),
    })),
    messages: z.array(z.object({
      body: z.string(),
      displayInterval: z.object({
        end: z.object({
          date: z.unknown(),
        }),
        kind: z.string(),
        start: z.object({
          date: z.unknown(),
        }),
      }),
      header: z.string(),
      id: z.string(),
      kind: z.string(),
      localizedBody: z.object({
        defaultValue: z.object({
          kind: z.unknown(),
          language: z.unknown(),
          value: z.unknown(),
        }),
        kind: z.string(),
        translatedValues: z.array(z.unknown()),
      }),
      localizedHeader: z.object({
        defaultValue: z.object({
          kind: z.unknown(),
          language: z.unknown(),
          value: z.unknown(),
        }),
        kind: z.string(),
        translatedValues: z.array(z.unknown()),
      }),
      messageType: z.string(),
    })),
    multipleDevicesAndHoldersAllowedStatus: z.string(),
    notifyPreference: z.string(),
    provider: z.string(),
    redemptionChannel: z.string(),
    redemptionIssuers: z.array(z.string()),
    review: z.object({
      comments: z.string(),
    }),
    reviewStatus: z.string(),
    securityAnimation: z.object({
      animationType: z.string(),
    }),
    shortTitle: z.string(),
    textModulesData: z.array(z.object({
      body: z.string(),
      header: z.string(),
      id: z.string(),
      localizedBody: z.object({
        defaultValue: z.object({
          kind: z.unknown(),
          language: z.unknown(),
          value: z.unknown(),
        }),
        kind: z.string(),
        translatedValues: z.array(z.unknown()),
      }),
      localizedHeader: z.object({
        defaultValue: z.object({
          kind: z.unknown(),
          language: z.unknown(),
          value: z.unknown(),
        }),
        kind: z.string(),
        translatedValues: z.array(z.unknown()),
      }),
    })),
    title: z.string(),
    titleImage: z.object({
      contentDescription: z.object({
        defaultValue: z.object({
          kind: z.string(),
          language: z.string(),
          value: z.string(),
        }),
        kind: z.string(),
        translatedValues: z.array(z.object({
          kind: z.unknown(),
          language: z.unknown(),
          value: z.unknown(),
        })),
      }),
      kind: z.string(),
      privateImageId: z.string(),
      sourceUri: z.object({
        description: z.string(),
        localizedDescription: z.object({
          defaultValue: z.object({
            kind: z.unknown(),
            language: z.unknown(),
            value: z.unknown(),
          }),
          kind: z.string(),
          translatedValues: z.array(z.unknown()),
        }),
        uri: z.string(),
      }),
    }),
    valueAddedModuleData: z.array(z.object({
      body: z.object({
        defaultValue: z.object({
          kind: z.unknown(),
          language: z.unknown(),
          value: z.unknown(),
        }),
        kind: z.string(),
        translatedValues: z.array(z.unknown()),
      }),
      header: z.object({
        defaultValue: z.object({
          kind: z.unknown(),
          language: z.unknown(),
          value: z.unknown(),
        }),
        kind: z.string(),
        translatedValues: z.array(z.unknown()),
      }),
      image: z.object({
        contentDescription: z.object({
          defaultValue: z.unknown(),
          kind: z.unknown(),
          translatedValues: z.unknown(),
        }),
        kind: z.string(),
        privateImageId: z.string(),
        sourceUri: z.object({
          description: z.unknown(),
          localizedDescription: z.unknown(),
          uri: z.unknown(),
        }),
      }),
      sortIndex: z.number(),
      uri: z.string(),
      viewConstraints: z.object({
        displayInterval: z.object({
          end: z.unknown(),
          kind: z.unknown(),
          start: z.unknown(),
        }),
      }),
    })),
    version: z.string(),
    viewUnlockRequirement: z.string(),
    wideTitleImage: z.object({
      contentDescription: z.object({
        defaultValue: z.object({
          kind: z.string(),
          language: z.string(),
          value: z.string(),
        }),
        kind: z.string(),
        translatedValues: z.array(z.object({
          kind: z.unknown(),
          language: z.unknown(),
          value: z.unknown(),
        })),
      }),
      kind: z.string(),
      privateImageId: z.string(),
      sourceUri: z.object({
        description: z.string(),
        localizedDescription: z.object({
          defaultValue: z.object({
            kind: z.unknown(),
            language: z.unknown(),
            value: z.unknown(),
          }),
          kind: z.string(),
          translatedValues: z.array(z.unknown()),
        }),
        uri: z.string(),
      }),
    }),
    wordMark: z.object({
      contentDescription: z.object({
        defaultValue: z.object({
          kind: z.string(),
          language: z.string(),
          value: z.string(),
        }),
        kind: z.string(),
        translatedValues: z.array(z.object({
          kind: z.unknown(),
          language: z.unknown(),
          value: z.unknown(),
        })),
      }),
      kind: z.string(),
      privateImageId: z.string(),
      sourceUri: z.object({
        description: z.string(),
        localizedDescription: z.object({
          defaultValue: z.object({
            kind: z.unknown(),
            language: z.unknown(),
            value: z.unknown(),
          }),
          kind: z.string(),
          translatedValues: z.array(z.unknown()),
        }),
        uri: z.string(),
      }),
    }),
  }).optional(),
  disableExpirationNotification: z.boolean().optional(),
  groupingInfo: z.object({
    groupingId: z.string(),
    sortIndex: z.number(),
  }).optional(),
  hasLinkedDevice: z.boolean().optional(),
  hasUsers: z.boolean().optional(),
  heroImage: z.object({
    contentDescription: z.object({
      defaultValue: z.object({
        kind: z.string(),
        language: z.string(),
        value: z.string(),
      }),
      kind: z.string(),
      translatedValues: z.array(z.object({
        kind: z.string(),
        language: z.string(),
        value: z.string(),
      })),
    }),
    kind: z.string(),
    privateImageId: z.string(),
    sourceUri: z.object({
      description: z.string(),
      localizedDescription: z.object({
        defaultValue: z.object({
          kind: z.string(),
          language: z.string(),
          value: z.string(),
        }),
        kind: z.string(),
        translatedValues: z.array(z.object({
          kind: z.unknown(),
          language: z.unknown(),
          value: z.unknown(),
        })),
      }),
      uri: z.string(),
    }),
  }).optional(),
  id: z.string(),
  imageModulesData: z.array(z.object({
    id: z.string(),
    mainImage: z.object({
      contentDescription: z.object({
        defaultValue: z.object({
          kind: z.unknown(),
          language: z.unknown(),
          value: z.unknown(),
        }),
        kind: z.string(),
        translatedValues: z.array(z.unknown()),
      }),
      kind: z.string(),
      privateImageId: z.string(),
      sourceUri: z.object({
        description: z.string(),
        localizedDescription: z.object({
          defaultValue: z.unknown(),
          kind: z.unknown(),
          translatedValues: z.unknown(),
        }),
        uri: z.string(),
      }),
    }),
  })).optional(),
  infoModuleData: z.object({
    labelValueRows: z.array(z.object({
      columns: z.array(z.object({
        label: z.unknown(),
        localizedLabel: z.unknown(),
        localizedValue: z.unknown(),
        value: z.unknown(),
      })),
    })),
    showLastUpdateTime: z.boolean(),
  }).optional(),
  kind: z.string().optional(),
  linkedObjectIds: z.array(z.string()).optional(),
  linksModuleData: z.object({
    uris: z.array(z.object({
      description: z.string(),
      id: z.string(),
      kind: z.string(),
      localizedDescription: z.object({
        defaultValue: z.object({
          kind: z.unknown(),
          language: z.unknown(),
          value: z.unknown(),
        }),
        kind: z.string(),
        translatedValues: z.array(z.unknown()),
      }),
      uri: z.string(),
    })),
  }).optional(),
  locations: z.array(z.object({
    kind: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  })).optional(),
  merchantLocations: z.array(z.object({
    latitude: z.number(),
    longitude: z.number(),
  })).optional(),
  messages: z.array(z.object({
    body: z.string(),
    displayInterval: z.object({
      end: z.object({
        date: z.string(),
      }),
      kind: z.string(),
      start: z.object({
        date: z.string(),
      }),
    }),
    header: z.string(),
    id: z.string(),
    kind: z.string(),
    localizedBody: z.object({
      defaultValue: z.object({
        kind: z.string(),
        language: z.string(),
        value: z.string(),
      }),
      kind: z.string(),
      translatedValues: z.array(z.object({
        kind: z.unknown(),
        language: z.unknown(),
        value: z.unknown(),
      })),
    }),
    localizedHeader: z.object({
      defaultValue: z.object({
        kind: z.string(),
        language: z.string(),
        value: z.string(),
      }),
      kind: z.string(),
      translatedValues: z.array(z.object({
        kind: z.unknown(),
        language: z.unknown(),
        value: z.unknown(),
      })),
    }),
    messageType: z.string(),
  })).optional(),
  notifyPreference: z.string().optional(),
  passConstraints: z.object({
    nfcConstraint: z.array(z.string()),
    screenshotEligibility: z.string(),
  }).optional(),
  rotatingBarcode: z.object({
    alternateText: z.string(),
    initialRotatingBarcodeValues: z.object({
      periodMillis: z.string(),
      startDateTime: z.string(),
      values: z.array(z.string()),
    }),
    renderEncoding: z.string(),
    showCodeText: z.object({
      defaultValue: z.object({
        kind: z.string(),
        language: z.string(),
        value: z.string(),
      }),
      kind: z.string(),
      translatedValues: z.array(z.object({
        kind: z.string(),
        language: z.string(),
        value: z.string(),
      })),
    }),
    totpDetails: z.object({
      algorithm: z.string(),
      parameters: z.array(z.object({
        key: z.string(),
        valueLength: z.number(),
      })),
      periodMillis: z.string(),
    }),
    type: z.string(),
    valuePattern: z.string(),
  }).optional(),
  saveRestrictions: z.object({
    restrictToEmailSha256: z.string(),
  }).optional(),
  smartTapRedemptionValue: z.string().optional(),
  state: z.string().optional(),
  textModulesData: z.array(z.object({
    body: z.string(),
    header: z.string(),
    id: z.string(),
    localizedBody: z.object({
      defaultValue: z.object({
        kind: z.string(),
        language: z.string(),
        value: z.string(),
      }),
      kind: z.string(),
      translatedValues: z.array(z.object({
        kind: z.unknown(),
        language: z.unknown(),
        value: z.unknown(),
      })),
    }),
    localizedHeader: z.object({
      defaultValue: z.object({
        kind: z.string(),
        language: z.string(),
        value: z.string(),
      }),
      kind: z.string(),
      translatedValues: z.array(z.object({
        kind: z.unknown(),
        language: z.unknown(),
        value: z.unknown(),
      })),
    }),
  })).optional(),
  validTimeInterval: z.object({
    end: z.object({
      date: z.string(),
    }),
    kind: z.string(),
    start: z.object({
      date: z.string(),
    }),
  }).optional(),
  valueAddedModuleData: z.array(z.object({
    body: z.object({
      defaultValue: z.object({
        kind: z.string(),
        language: z.string(),
        value: z.string(),
      }),
      kind: z.string(),
      translatedValues: z.array(z.object({
        kind: z.unknown(),
        language: z.unknown(),
        value: z.unknown(),
      })),
    }),
    header: z.object({
      defaultValue: z.object({
        kind: z.string(),
        language: z.string(),
        value: z.string(),
      }),
      kind: z.string(),
      translatedValues: z.array(z.object({
        kind: z.unknown(),
        language: z.unknown(),
        value: z.unknown(),
      })),
    }),
    image: z.object({
      contentDescription: z.object({
        defaultValue: z.object({
          kind: z.unknown(),
          language: z.unknown(),
          value: z.unknown(),
        }),
        kind: z.string(),
        translatedValues: z.array(z.unknown()),
      }),
      kind: z.string(),
      privateImageId: z.string(),
      sourceUri: z.object({
        description: z.string(),
        localizedDescription: z.object({
          defaultValue: z.unknown(),
          kind: z.unknown(),
          translatedValues: z.unknown(),
        }),
        uri: z.string(),
      }),
    }),
    sortIndex: z.number(),
    uri: z.string(),
    viewConstraints: z.object({
      displayInterval: z.object({
        end: z.object({
          date: z.unknown(),
        }),
        kind: z.string(),
        start: z.object({
          date: z.unknown(),
        }),
      }),
    }),
  })).optional(),
  version: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  appLinkData: z.object({
    androidAppLinkInfo: z.object({
      appLogoImage: z.object({
        contentDescription: z.object({
          defaultValue: z.object({
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
            ).optional(),
            language: z.unknown().describe(
              'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
            ).optional(),
            value: z.unknown().describe("The UTF-8 encoded translated string.")
              .optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
        ).optional(),
        privateImageId: z.string().describe(
          "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
        ).optional(),
        sourceUri: z.object({
          description: z.string().describe(
            "Additional information about the image, which is unused and retained only for backward compatibility.",
          ).optional(),
          localizedDescription: z.object({
            defaultValue: z.unknown().optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).optional(),
          uri: z.string().describe(
            "The location of the image. URIs must have a scheme.",
          ).optional(),
        }).optional(),
      }).describe("Wrapping type for Google hosted images.").optional(),
      appTarget: z.object({
        packageName: z.string().describe(
          "Package name for AppTarget. For example: com.google.android.gm",
        ).optional(),
        targetUri: z.object({
          description: z.string().describe(
            "The URI's title appearing in the app as text. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens. Note that in some contexts this text is not used, such as when `description` is part of an image.",
          ).optional(),
          id: z.string().describe(
            "The ID associated with a uri. This field is here to enable ease of management of uris.",
          ).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#uri"`.',
          ).optional(),
          localizedDescription: z.object({
            defaultValue: z.unknown().optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).optional(),
          uri: z.string().describe(
            "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
          ).optional(),
        }).optional(),
      }).optional(),
      description: z.object({
        defaultValue: z.object({
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.string().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.string().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        })).describe("Contains the translations for the string.").optional(),
      }).optional(),
      title: z.object({
        defaultValue: z.object({
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.string().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.string().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        })).describe("Contains the translations for the string.").optional(),
      }).optional(),
    }).optional(),
    displayText: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    iosAppLinkInfo: z.object({
      appLogoImage: z.object({
        contentDescription: z.object({
          defaultValue: z.object({
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
            ).optional(),
            language: z.unknown().describe(
              'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
            ).optional(),
            value: z.unknown().describe("The UTF-8 encoded translated string.")
              .optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
        ).optional(),
        privateImageId: z.string().describe(
          "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
        ).optional(),
        sourceUri: z.object({
          description: z.string().describe(
            "Additional information about the image, which is unused and retained only for backward compatibility.",
          ).optional(),
          localizedDescription: z.object({
            defaultValue: z.unknown().optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).optional(),
          uri: z.string().describe(
            "The location of the image. URIs must have a scheme.",
          ).optional(),
        }).optional(),
      }).describe("Wrapping type for Google hosted images.").optional(),
      appTarget: z.object({
        packageName: z.string().describe(
          "Package name for AppTarget. For example: com.google.android.gm",
        ).optional(),
        targetUri: z.object({
          description: z.string().describe(
            "The URI's title appearing in the app as text. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens. Note that in some contexts this text is not used, such as when `description` is part of an image.",
          ).optional(),
          id: z.string().describe(
            "The ID associated with a uri. This field is here to enable ease of management of uris.",
          ).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#uri"`.',
          ).optional(),
          localizedDescription: z.object({
            defaultValue: z.unknown().optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).optional(),
          uri: z.string().describe(
            "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
          ).optional(),
        }).optional(),
      }).optional(),
      description: z.object({
        defaultValue: z.object({
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.string().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.string().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        })).describe("Contains the translations for the string.").optional(),
      }).optional(),
      title: z.object({
        defaultValue: z.object({
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.string().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.string().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        })).describe("Contains the translations for the string.").optional(),
      }).optional(),
    }).optional(),
    webAppLinkInfo: z.object({
      appLogoImage: z.object({
        contentDescription: z.object({
          defaultValue: z.object({
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
            ).optional(),
            language: z.unknown().describe(
              'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
            ).optional(),
            value: z.unknown().describe("The UTF-8 encoded translated string.")
              .optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
        ).optional(),
        privateImageId: z.string().describe(
          "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
        ).optional(),
        sourceUri: z.object({
          description: z.string().describe(
            "Additional information about the image, which is unused and retained only for backward compatibility.",
          ).optional(),
          localizedDescription: z.object({
            defaultValue: z.unknown().optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).optional(),
          uri: z.string().describe(
            "The location of the image. URIs must have a scheme.",
          ).optional(),
        }).optional(),
      }).describe("Wrapping type for Google hosted images.").optional(),
      appTarget: z.object({
        packageName: z.string().describe(
          "Package name for AppTarget. For example: com.google.android.gm",
        ).optional(),
        targetUri: z.object({
          description: z.string().describe(
            "The URI's title appearing in the app as text. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens. Note that in some contexts this text is not used, such as when `description` is part of an image.",
          ).optional(),
          id: z.string().describe(
            "The ID associated with a uri. This field is here to enable ease of management of uris.",
          ).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#uri"`.',
          ).optional(),
          localizedDescription: z.object({
            defaultValue: z.unknown().optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).optional(),
          uri: z.string().describe(
            "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
          ).optional(),
        }).optional(),
      }).optional(),
      description: z.object({
        defaultValue: z.object({
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.string().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.string().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        })).describe("Contains the translations for the string.").optional(),
      }).optional(),
      title: z.object({
        defaultValue: z.object({
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.string().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.string().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        })).describe("Contains the translations for the string.").optional(),
      }).optional(),
    }).optional(),
  }).optional(),
  barcode: z.object({
    alternateText: z.string().describe(
      "An optional text that will override the default text that shows under the barcode. This field is intended for a human readable equivalent of the barcode value, used when the barcode cannot be scanned.",
    ).optional(),
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#barcode"`.',
    ).optional(),
    renderEncoding: z.enum(["RENDER_ENCODING_UNSPECIFIED", "UTF_8"]).describe(
      "The render encoding for the barcode. When specified, barcode is rendered in the given encoding. Otherwise best known encoding is chosen by Google.",
    ).optional(),
    showCodeText: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    type: z.enum([
      "BARCODE_TYPE_UNSPECIFIED",
      "AZTEC",
      "aztec",
      "CODE_39",
      "code39",
      "CODE_128",
      "code128",
      "CODABAR",
      "codabar",
      "DATA_MATRIX",
      "dataMatrix",
      "EAN_8",
      "ean8",
      "EAN_13",
      "ean13",
      "EAN13",
      "ITF_14",
      "itf14",
      "PDF_417",
      "pdf417",
      "PDF417",
      "QR_CODE",
      "qrCode",
      "qrcode",
      "UPC_A",
      "upcA",
      "TEXT_ONLY",
      "textOnly",
    ]).describe("The type of barcode.").optional(),
    value: z.string().describe("The value encoded in the barcode.").optional(),
  }).optional(),
  classId: z.string().describe(
    "Required. The class associated with this object. The class must be of the same type as this object, must already exist, and must be approved. Class IDs should follow the format issuer ID.identifier where the former is issued by Google and latter is chosen by you.",
  ).optional(),
  classReference: z.object({
    allowMultipleUsersPerObject: z.boolean().describe(
      "Deprecated. Use `multipleDevicesAndHoldersAllowedStatus` instead.",
    ).optional(),
    appLinkData: z.object({
      androidAppLinkInfo: z.object({
        appLogoImage: z.object({
          contentDescription: z.object({
            defaultValue: z.unknown().optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
          ).optional(),
          privateImageId: z.string().describe(
            "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
          ).optional(),
          sourceUri: z.object({
            description: z.unknown().describe(
              "Additional information about the image, which is unused and retained only for backward compatibility.",
            ).optional(),
            localizedDescription: z.unknown().optional(),
            uri: z.unknown().describe(
              "The location of the image. URIs must have a scheme.",
            ).optional(),
          }).optional(),
        }).describe("Wrapping type for Google hosted images.").optional(),
        appTarget: z.object({
          packageName: z.string().describe(
            "Package name for AppTarget. For example: com.google.android.gm",
          ).optional(),
          targetUri: z.object({
            description: z.unknown().describe(
              "The URI's title appearing in the app as text. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens. Note that in some contexts this text is not used, such as when `description` is part of an image.",
            ).optional(),
            id: z.unknown().describe(
              "The ID associated with a uri. This field is here to enable ease of management of uris.",
            ).optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#uri"`.',
            ).optional(),
            localizedDescription: z.unknown().optional(),
            uri: z.unknown().describe(
              "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
            ).optional(),
          }).optional(),
        }).optional(),
        description: z.object({
          defaultValue: z.object({
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
            ).optional(),
            language: z.unknown().describe(
              'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
            ).optional(),
            value: z.unknown().describe("The UTF-8 encoded translated string.")
              .optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        title: z.object({
          defaultValue: z.object({
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
            ).optional(),
            language: z.unknown().describe(
              'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
            ).optional(),
            value: z.unknown().describe("The UTF-8 encoded translated string.")
              .optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
      }).optional(),
      displayText: z.object({
        defaultValue: z.object({
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.string().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.string().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        })).describe("Contains the translations for the string.").optional(),
      }).optional(),
      iosAppLinkInfo: z.object({
        appLogoImage: z.object({
          contentDescription: z.object({
            defaultValue: z.unknown().optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
          ).optional(),
          privateImageId: z.string().describe(
            "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
          ).optional(),
          sourceUri: z.object({
            description: z.unknown().describe(
              "Additional information about the image, which is unused and retained only for backward compatibility.",
            ).optional(),
            localizedDescription: z.unknown().optional(),
            uri: z.unknown().describe(
              "The location of the image. URIs must have a scheme.",
            ).optional(),
          }).optional(),
        }).describe("Wrapping type for Google hosted images.").optional(),
        appTarget: z.object({
          packageName: z.string().describe(
            "Package name for AppTarget. For example: com.google.android.gm",
          ).optional(),
          targetUri: z.object({
            description: z.unknown().describe(
              "The URI's title appearing in the app as text. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens. Note that in some contexts this text is not used, such as when `description` is part of an image.",
            ).optional(),
            id: z.unknown().describe(
              "The ID associated with a uri. This field is here to enable ease of management of uris.",
            ).optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#uri"`.',
            ).optional(),
            localizedDescription: z.unknown().optional(),
            uri: z.unknown().describe(
              "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
            ).optional(),
          }).optional(),
        }).optional(),
        description: z.object({
          defaultValue: z.object({
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
            ).optional(),
            language: z.unknown().describe(
              'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
            ).optional(),
            value: z.unknown().describe("The UTF-8 encoded translated string.")
              .optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        title: z.object({
          defaultValue: z.object({
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
            ).optional(),
            language: z.unknown().describe(
              'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
            ).optional(),
            value: z.unknown().describe("The UTF-8 encoded translated string.")
              .optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
      }).optional(),
      webAppLinkInfo: z.object({
        appLogoImage: z.object({
          contentDescription: z.object({
            defaultValue: z.unknown().optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
          ).optional(),
          privateImageId: z.string().describe(
            "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
          ).optional(),
          sourceUri: z.object({
            description: z.unknown().describe(
              "Additional information about the image, which is unused and retained only for backward compatibility.",
            ).optional(),
            localizedDescription: z.unknown().optional(),
            uri: z.unknown().describe(
              "The location of the image. URIs must have a scheme.",
            ).optional(),
          }).optional(),
        }).describe("Wrapping type for Google hosted images.").optional(),
        appTarget: z.object({
          packageName: z.string().describe(
            "Package name for AppTarget. For example: com.google.android.gm",
          ).optional(),
          targetUri: z.object({
            description: z.unknown().describe(
              "The URI's title appearing in the app as text. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens. Note that in some contexts this text is not used, such as when `description` is part of an image.",
            ).optional(),
            id: z.unknown().describe(
              "The ID associated with a uri. This field is here to enable ease of management of uris.",
            ).optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#uri"`.',
            ).optional(),
            localizedDescription: z.unknown().optional(),
            uri: z.unknown().describe(
              "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
            ).optional(),
          }).optional(),
        }).optional(),
        description: z.object({
          defaultValue: z.object({
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
            ).optional(),
            language: z.unknown().describe(
              'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
            ).optional(),
            value: z.unknown().describe("The UTF-8 encoded translated string.")
              .optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        title: z.object({
          defaultValue: z.object({
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
            ).optional(),
            language: z.unknown().describe(
              'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
            ).optional(),
            value: z.unknown().describe("The UTF-8 encoded translated string.")
              .optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
      }).optional(),
    }).optional(),
    callbackOptions: z.object({
      updateRequestUrl: z.string().describe(
        "URL for the merchant endpoint that would be called to request updates. The URL should be hosted on HTTPS and robots.txt should allow the URL path to be accessible by UserAgent:Googlebot. Deprecated.",
      ).optional(),
      url: z.string().describe(
        "The HTTPS url configured by the merchant. The URL should be hosted on HTTPS and robots.txt should allow the URL path to be accessible by UserAgent:Googlebot.",
      ).optional(),
    }).optional(),
    classTemplateInfo: z.object({
      cardBarcodeSectionDetails: z.object({
        firstBottomDetail: z.object({
          fieldSelector: z.object({
            fields: z.unknown().describe(
              "If more than one reference is supplied, then the first one that references a non-empty field will be displayed.",
            ).optional(),
          }).describe("Custom field selector to use with field overrides.")
            .optional(),
        }).optional(),
        firstTopDetail: z.object({
          fieldSelector: z.object({
            fields: z.unknown().describe(
              "If more than one reference is supplied, then the first one that references a non-empty field will be displayed.",
            ).optional(),
          }).describe("Custom field selector to use with field overrides.")
            .optional(),
        }).optional(),
        secondTopDetail: z.object({
          fieldSelector: z.object({
            fields: z.unknown().describe(
              "If more than one reference is supplied, then the first one that references a non-empty field will be displayed.",
            ).optional(),
          }).describe("Custom field selector to use with field overrides.")
            .optional(),
        }).optional(),
      }).optional(),
      cardTemplateOverride: z.object({
        cardRowTemplateInfos: z.array(z.object({
          oneItem: z.unknown().optional(),
          threeItems: z.unknown().optional(),
          twoItems: z.unknown().optional(),
        })).describe(
          "Template information for rows in the card view. At most three rows are allowed to be specified.",
        ).optional(),
      }).optional(),
      detailsTemplateOverride: z.object({
        detailsItemInfos: z.array(z.object({
          item: z.unknown().optional(),
        })).describe(
          'Information for the "nth" item displayed in the details list.',
        ).optional(),
      }).optional(),
      listTemplateOverride: z.object({
        firstRowOption: z.object({
          fieldOption: z.object({
            fields: z.unknown().describe(
              "If more than one reference is supplied, then the first one that references a non-empty field will be displayed.",
            ).optional(),
          }).describe("Custom field selector to use with field overrides.")
            .optional(),
          transitOption: z.enum([
            "TRANSIT_OPTION_UNSPECIFIED",
            "ORIGIN_AND_DESTINATION_NAMES",
            "originAndDestinationNames",
            "ORIGIN_AND_DESTINATION_CODES",
            "originAndDestinationCodes",
            "ORIGIN_NAME",
            "originName",
          ]).optional(),
        }).optional(),
        secondRowOption: z.object({
          fields: z.array(z.unknown()).describe(
            "If more than one reference is supplied, then the first one that references a non-empty field will be displayed.",
          ).optional(),
        }).describe("Custom field selector to use with field overrides.")
          .optional(),
        thirdRowOption: z.object({
          fields: z.array(z.unknown()).describe(
            "If more than one reference is supplied, then the first one that references a non-empty field will be displayed.",
          ).optional(),
        }).describe("Custom field selector to use with field overrides.")
          .optional(),
      }).optional(),
    }).optional(),
    countryCode: z.string().describe(
      "Country code used to display the card's country (when the user is not in that country), as well as to display localized content when content is not available in the user's locale.",
    ).optional(),
    details: z.string().describe("The details of the offer.").optional(),
    enableSmartTap: z.boolean().describe(
      "Identifies whether this class supports Smart Tap. The `redemptionIssuers` and object level `smartTapRedemptionLevel` fields must also be set up correctly in order for a pass to support Smart Tap.",
    ).optional(),
    finePrint: z.string().describe(
      'The fine print or terms of the offer, such as "20% off any t-shirt at Adam\'s Apparel."',
    ).optional(),
    helpUri: z.object({
      description: z.string().describe(
        "The URI's title appearing in the app as text. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens. Note that in some contexts this text is not used, such as when `description` is part of an image.",
      ).optional(),
      id: z.string().describe(
        "The ID associated with a uri. This field is here to enable ease of management of uris.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#uri"`.',
      ).optional(),
      localizedDescription: z.object({
        defaultValue: z.object({
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.string().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.string().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        })).describe("Contains the translations for the string.").optional(),
      }).optional(),
      uri: z.string().describe(
        "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
      ).optional(),
    }).optional(),
    heroImage: z.object({
      contentDescription: z.object({
        defaultValue: z.object({
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.string().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.string().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        })).describe("Contains the translations for the string.").optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
      ).optional(),
      privateImageId: z.string().describe(
        "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
      ).optional(),
      sourceUri: z.object({
        description: z.string().describe(
          "Additional information about the image, which is unused and retained only for backward compatibility.",
        ).optional(),
        localizedDescription: z.object({
          defaultValue: z.object({
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
            ).optional(),
            language: z.unknown().describe(
              'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
            ).optional(),
            value: z.unknown().describe("The UTF-8 encoded translated string.")
              .optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        uri: z.string().describe(
          "The location of the image. URIs must have a scheme.",
        ).optional(),
      }).optional(),
    }).describe("Wrapping type for Google hosted images.").optional(),
    hexBackgroundColor: z.string().describe(
      "The background color for the card. If not set the dominant color of the hero image is used, and if no hero image is set, the dominant color of the logo is used. The format is #rrggbb where rrggbb is a hex RGB triplet, such as `#ffcc00`. You can also use the shorthand version of the RGB triplet which is #rgb, such as `#fc0`.",
    ).optional(),
    homepageUri: z.object({
      description: z.string().describe(
        "The URI's title appearing in the app as text. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens. Note that in some contexts this text is not used, such as when `description` is part of an image.",
      ).optional(),
      id: z.string().describe(
        "The ID associated with a uri. This field is here to enable ease of management of uris.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#uri"`.',
      ).optional(),
      localizedDescription: z.object({
        defaultValue: z.object({
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.string().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.string().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        })).describe("Contains the translations for the string.").optional(),
      }).optional(),
      uri: z.string().describe(
        "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
      ).optional(),
    }).optional(),
    id: z.string().describe(
      "Required. The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'.",
    ).optional(),
    imageModulesData: z.array(z.object({
      id: z.string().describe(
        "The ID associated with an image module. This field is here to enable ease of management of image modules.",
      ).optional(),
      mainImage: z.object({
        contentDescription: z.object({
          defaultValue: z.unknown().optional(),
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.unknown().describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
        ).optional(),
        privateImageId: z.string().describe(
          "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
        ).optional(),
        sourceUri: z.object({
          description: z.unknown().describe(
            "Additional information about the image, which is unused and retained only for backward compatibility.",
          ).optional(),
          localizedDescription: z.unknown().optional(),
          uri: z.unknown().describe(
            "The location of the image. URIs must have a scheme.",
          ).optional(),
        }).optional(),
      }).describe("Wrapping type for Google hosted images.").optional(),
    })).describe(
      "Image module data. The maximum number of these fields displayed is 1 from object level and 1 for class object level.",
    ).optional(),
    infoModuleData: z.object({
      labelValueRows: z.array(z.object({
        columns: z.array(z.unknown()).describe(
          "A list of labels and values. These will be displayed in a singular column, one after the other, not in multiple columns, despite the field name.",
        ).optional(),
      })).describe(
        "A list of collections of labels and values. These will be displayed one after the other in a singular column.",
      ).optional(),
      showLastUpdateTime: z.boolean().optional(),
    }).optional(),
    issuerName: z.string().describe(
      "Required. The issuer name. Recommended maximum length is 20 characters to ensure full string is displayed on smaller screens.",
    ).optional(),
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#offerClass"`.',
    ).optional(),
    linksModuleData: z.object({
      uris: z.array(z.object({
        description: z.string().describe(
          "The URI's title appearing in the app as text. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens. Note that in some contexts this text is not used, such as when `description` is part of an image.",
        ).optional(),
        id: z.string().describe(
          "The ID associated with a uri. This field is here to enable ease of management of uris.",
        ).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#uri"`.',
        ).optional(),
        localizedDescription: z.object({
          defaultValue: z.unknown().optional(),
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.unknown().describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        uri: z.string().describe(
          "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
        ).optional(),
      })).describe("The list of URIs.").optional(),
    }).optional(),
    localizedDetails: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    localizedFinePrint: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    localizedIssuerName: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    localizedProvider: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    localizedShortTitle: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    localizedTitle: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    locations: z.array(z.object({
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#latLongPoint"`.',
      ).optional(),
      latitude: z.number().describe(
        "The latitude specified as any value in the range of -90.0 through +90.0, both inclusive. Values outside these bounds will be rejected.",
      ).optional(),
      longitude: z.number().describe(
        "The longitude specified in the range -180.0 through +180.0, both inclusive. Values outside these bounds will be rejected.",
      ).optional(),
    })).describe(
      "Note: This field is currently not supported to trigger geo notifications.",
    ).optional(),
    merchantLocations: z.array(z.object({
      latitude: z.number().describe(
        "The latitude specified as any value in the range of -90.0 through +90.0, both inclusive. Values outside these bounds will be rejected.",
      ).optional(),
      longitude: z.number().describe(
        "The longitude specified in the range -180.0 through +180.0, both inclusive. Values outside these bounds will be rejected.",
      ).optional(),
    })).describe(
      "Merchant locations. There is a maximum of ten on the class. Any additional MerchantLocations added beyond the 10 will be rejected. These locations will trigger a notification when a user enters within a Google-set radius of the point. This field replaces the deprecated LatLongPoints.",
    ).optional(),
    messages: z.array(z.object({
      body: z.string().describe("The message body.").optional(),
      displayInterval: z.object({
        end: z.object({
          date: z.unknown().describe(
            "An ISO 8601 extended format date/time. Offset may or may not be required (refer to the parent field's documentation). Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the date/time is intended for a physical location in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. Providing an offset makes this an absolute instant in time around the world. The date/time will be adjusted based on the user's time zone. For example, a time of `2018-06-19T18:30:00-04:00` will be 18:30:00 for a user in New York and 15:30:00 for a user in Los Angeles. Omitting the offset makes this a local date/time, representing several instants in time around the world. The date/time will always be in the user's current time zone. For example, a time of `2018-06-19T18:30:00` will be 18:30:00 for a user in New York and also 18:30:00 for a user in Los Angeles. This is useful when the same local date/time should apply to many physical locations across several time zones.",
          ).optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#timeInterval"`.',
        ).optional(),
        start: z.object({
          date: z.unknown().describe(
            "An ISO 8601 extended format date/time. Offset may or may not be required (refer to the parent field's documentation). Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the date/time is intended for a physical location in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. Providing an offset makes this an absolute instant in time around the world. The date/time will be adjusted based on the user's time zone. For example, a time of `2018-06-19T18:30:00-04:00` will be 18:30:00 for a user in New York and 15:30:00 for a user in Los Angeles. Omitting the offset makes this a local date/time, representing several instants in time around the world. The date/time will always be in the user's current time zone. For example, a time of `2018-06-19T18:30:00` will be 18:30:00 for a user in New York and also 18:30:00 for a user in Los Angeles. This is useful when the same local date/time should apply to many physical locations across several time zones.",
          ).optional(),
        }).optional(),
      }).optional(),
      header: z.string().describe("The message header.").optional(),
      id: z.string().describe(
        "The ID associated with a message. This field is here to enable ease of management of messages. Notice ID values could possibly duplicate across multiple messages in the same class/instance, and care must be taken to select a reasonable ID for each message.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#walletObjectMessage"`.',
      ).optional(),
      localizedBody: z.object({
        defaultValue: z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.unknown()).describe(
          "Contains the translations for the string.",
        ).optional(),
      }).optional(),
      localizedHeader: z.object({
        defaultValue: z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.unknown()).describe(
          "Contains the translations for the string.",
        ).optional(),
      }).optional(),
      messageType: z.enum([
        "MESSAGE_TYPE_UNSPECIFIED",
        "TEXT",
        "text",
        "EXPIRATION_NOTIFICATION",
        "expirationNotification",
        "TEXT_AND_NOTIFY",
      ]).describe("The message type.").optional(),
    })).describe(
      "An array of messages displayed in the app. All users of this object will receive its associated messages. The maximum number of these fields is 10.",
    ).optional(),
    multipleDevicesAndHoldersAllowedStatus: z.enum([
      "STATUS_UNSPECIFIED",
      "MULTIPLE_HOLDERS",
      "ONE_USER_ALL_DEVICES",
      "ONE_USER_ONE_DEVICE",
      "multipleHolders",
      "oneUserAllDevices",
      "oneUserOneDevice",
    ]).describe(
      "Identifies whether multiple users and devices will save the same object referencing this class.",
    ).optional(),
    notifyPreference: z.enum([
      "NOTIFICATION_SETTINGS_FOR_UPDATES_UNSPECIFIED",
      "NOTIFY_ON_UPDATE",
    ]).describe(
      "Whether or not field updates to this class should trigger notifications. When set to NOTIFY, we will attempt to trigger a field update notification to users. These notifications will only be sent to users if the field is part of an allowlist. If not specified, no notification will be triggered. This setting is ephemeral and needs to be set with each PATCH or UPDATE request, otherwise a notification will not be triggered.",
    ).optional(),
    provider: z.string().describe(
      "Required. The offer provider (either the aggregator name or merchant name). Recommended maximum length is 12 characters to ensure full string is displayed on smaller screens.",
    ).optional(),
    redemptionChannel: z.enum([
      "REDEMPTION_CHANNEL_UNSPECIFIED",
      "INSTORE",
      "instore",
      "ONLINE",
      "online",
      "BOTH",
      "both",
      "TEMPORARY_PRICE_REDUCTION",
      "temporaryPriceReduction",
    ]).describe("Required. The redemption channels applicable to this offer.")
      .optional(),
    redemptionIssuers: z.array(z.string()).describe(
      "Identifies which redemption issuers can redeem the pass over Smart Tap. Redemption issuers are identified by their issuer ID. Redemption issuers must have at least one Smart Tap key configured. The `enableSmartTap` and object level `smartTapRedemptionLevel` fields must also be set up correctly in order for a pass to support Smart Tap.",
    ).optional(),
    review: z.object({
      comments: z.string().optional(),
    }).optional(),
    reviewStatus: z.enum([
      "REVIEW_STATUS_UNSPECIFIED",
      "UNDER_REVIEW",
      "underReview",
      "APPROVED",
      "approved",
      "REJECTED",
      "rejected",
      "DRAFT",
      "draft",
    ]).describe(
      "Required. The status of the class. This field can be set to `draft` or The status of the class. This field can be set to `draft` or `underReview` using the insert, patch, or update API calls. Once the review state is changed from `draft` it may not be changed back to `draft`. You should keep this field to `draft` when the class is under development. A `draft` class cannot be used to create any object. You should set this field to `underReview` when you believe the class is ready for use. The platform will automatically set this field to `approved` and it can be immediately used to create or migrate objects. When updating an already `approved` class you should keep setting this field to `underReview`.",
    ).optional(),
    securityAnimation: z.object({
      animationType: z.enum([
        "ANIMATION_UNSPECIFIED",
        "FOIL_SHIMMER",
        "foilShimmer",
      ]).describe("Type of animation.").optional(),
    }).optional(),
    shortTitle: z.string().describe(
      'A shortened version of the title of the offer, such as "20% off," shown to users as a quick reference to the offer contents. Recommended maximum length is 20 characters.',
    ).optional(),
    textModulesData: z.array(z.object({
      body: z.string().describe(
        "The body of the Text Module, which is defined as an uninterrupted string. Recommended maximum length is 500 characters to ensure full string is displayed on smaller screens.",
      ).optional(),
      header: z.string().describe(
        "The header of the Text Module. Recommended maximum length is 35 characters to ensure full string is displayed on smaller screens.",
      ).optional(),
      id: z.string().describe(
        "The ID associated with a text module. This field is here to enable ease of management of text modules and referencing them in template overrides. The ID should only include alphanumeric characters, '_', or '-'. It can not include dots, as dots are used to separate fields within FieldReference.fieldPaths in template overrides.",
      ).optional(),
      localizedBody: z.object({
        defaultValue: z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.unknown()).describe(
          "Contains the translations for the string.",
        ).optional(),
      }).optional(),
      localizedHeader: z.object({
        defaultValue: z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.unknown()).describe(
          "Contains the translations for the string.",
        ).optional(),
      }).optional(),
    })).describe(
      "Text module data. If text module data is also defined on the class, both will be displayed. The maximum number of these fields displayed is 10 from the object and 10 from the class.",
    ).optional(),
    title: z.string().describe(
      'Required. The title of the offer, such as "20% off any t-shirt." Recommended maximum length is 60 characters to ensure full string is displayed on smaller screens.',
    ).optional(),
    titleImage: z.object({
      contentDescription: z.object({
        defaultValue: z.object({
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.string().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.string().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        })).describe("Contains the translations for the string.").optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
      ).optional(),
      privateImageId: z.string().describe(
        "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
      ).optional(),
      sourceUri: z.object({
        description: z.string().describe(
          "Additional information about the image, which is unused and retained only for backward compatibility.",
        ).optional(),
        localizedDescription: z.object({
          defaultValue: z.object({
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
            ).optional(),
            language: z.unknown().describe(
              'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
            ).optional(),
            value: z.unknown().describe("The UTF-8 encoded translated string.")
              .optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        uri: z.string().describe(
          "The location of the image. URIs must have a scheme.",
        ).optional(),
      }).optional(),
    }).describe("Wrapping type for Google hosted images.").optional(),
    valueAddedModuleData: z.array(z.object({
      body: z.object({
        defaultValue: z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.unknown()).describe(
          "Contains the translations for the string.",
        ).optional(),
      }).optional(),
      header: z.object({
        defaultValue: z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.unknown()).describe(
          "Contains the translations for the string.",
        ).optional(),
      }).optional(),
      image: z.object({
        contentDescription: z.object({
          defaultValue: z.unknown().optional(),
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.unknown().describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
        ).optional(),
        privateImageId: z.string().describe(
          "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
        ).optional(),
        sourceUri: z.object({
          description: z.unknown().describe(
            "Additional information about the image, which is unused and retained only for backward compatibility.",
          ).optional(),
          localizedDescription: z.unknown().optional(),
          uri: z.unknown().describe(
            "The location of the image. URIs must have a scheme.",
          ).optional(),
        }).optional(),
      }).describe("Wrapping type for Google hosted images.").optional(),
      sortIndex: z.number().int().describe(
        "The index for sorting the modules. Modules with a lower sort index are shown before modules with a higher sort index. If unspecified, the sort index is assumed to be INT_MAX. For two modules with the same index, the sorting behavior is undefined.",
      ).optional(),
      uri: z.string().describe(
        "URI that the module leads to on click. This can be a web link or a deep link as mentioned in https://developer.android.com/training/app-links/deep-linking.",
      ).optional(),
      viewConstraints: z.object({
        displayInterval: z.object({
          end: z.unknown().optional(),
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#timeInterval"`.',
          ).optional(),
          start: z.unknown().optional(),
        }).optional(),
      }).describe(
        "Constraints that all must be met for the module to be shown.",
      ).optional(),
    })).describe(
      "Optional value added module data. Maximum of fifteen on the class. For a pass only fifteen will be displayed, prioritizing those from the object.",
    ).optional(),
    version: z.string().describe("Deprecated").optional(),
    viewUnlockRequirement: z.enum([
      "VIEW_UNLOCK_REQUIREMENT_UNSPECIFIED",
      "UNLOCK_NOT_REQUIRED",
      "UNLOCK_REQUIRED_TO_VIEW",
    ]).describe("View Unlock Requirement options for the offer.").optional(),
    wideTitleImage: z.object({
      contentDescription: z.object({
        defaultValue: z.object({
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.string().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.string().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        })).describe("Contains the translations for the string.").optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
      ).optional(),
      privateImageId: z.string().describe(
        "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
      ).optional(),
      sourceUri: z.object({
        description: z.string().describe(
          "Additional information about the image, which is unused and retained only for backward compatibility.",
        ).optional(),
        localizedDescription: z.object({
          defaultValue: z.object({
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
            ).optional(),
            language: z.unknown().describe(
              'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
            ).optional(),
            value: z.unknown().describe("The UTF-8 encoded translated string.")
              .optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        uri: z.string().describe(
          "The location of the image. URIs must have a scheme.",
        ).optional(),
      }).optional(),
    }).describe("Wrapping type for Google hosted images.").optional(),
    wordMark: z.object({
      contentDescription: z.object({
        defaultValue: z.object({
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.string().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.string().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        })).describe("Contains the translations for the string.").optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
      ).optional(),
      privateImageId: z.string().describe(
        "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
      ).optional(),
      sourceUri: z.object({
        description: z.string().describe(
          "Additional information about the image, which is unused and retained only for backward compatibility.",
        ).optional(),
        localizedDescription: z.object({
          defaultValue: z.object({
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
            ).optional(),
            language: z.unknown().describe(
              'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
            ).optional(),
            value: z.unknown().describe("The UTF-8 encoded translated string.")
              .optional(),
          }).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        uri: z.string().describe(
          "The location of the image. URIs must have a scheme.",
        ).optional(),
      }).optional(),
    }).describe("Wrapping type for Google hosted images.").optional(),
  }).optional(),
  disableExpirationNotification: z.boolean().describe(
    "Indicates if notifications should explicitly be suppressed. If this field is set to true, regardless of the `messages` field, expiration notifications to the user will be suppressed. By default, this field is set to false. Currently, this can only be set for offers.",
  ).optional(),
  groupingInfo: z.object({
    groupingId: z.string().describe(
      "Optional grouping ID for grouping the passes with the same ID visually together. Grouping with different types of passes is allowed.",
    ).optional(),
    sortIndex: z.number().int().describe(
      "Optional index for sorting the passes when they are grouped with other passes. Passes with lower sort index are shown before passes with higher sort index. If unspecified, the value is assumed to be INT_MAX. For two passes with the same sort index, the sorting behavior is undefined.",
    ).optional(),
  }).optional(),
  hasLinkedDevice: z.boolean().describe(
    "Whether this object is currently linked to a single device. This field is set by the platform when a user saves the object, linking it to their device. Intended for use by select partners. Contact support for additional information.",
  ).optional(),
  hasUsers: z.boolean().describe(
    "Indicates if the object has users. This field is set by the platform.",
  ).optional(),
  heroImage: z.object({
    contentDescription: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
    ).optional(),
    privateImageId: z.string().describe(
      "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
    ).optional(),
    sourceUri: z.object({
      description: z.string().describe(
        "Additional information about the image, which is unused and retained only for backward compatibility.",
      ).optional(),
      localizedDescription: z.object({
        defaultValue: z.object({
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.string().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.string().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        })).describe("Contains the translations for the string.").optional(),
      }).optional(),
      uri: z.string().describe(
        "The location of the image. URIs must have a scheme.",
      ).optional(),
    }).optional(),
  }).describe("Wrapping type for Google hosted images.").optional(),
  id: z.string().describe(
    "Required. The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID.identifier where the former is issued by Google and latter is chosen by you. The unique identifier should only include alphanumeric characters, '.', '_', or '-'.",
  ).optional(),
  imageModulesData: z.array(z.object({
    id: z.string().describe(
      "The ID associated with an image module. This field is here to enable ease of management of image modules.",
    ).optional(),
    mainImage: z.object({
      contentDescription: z.object({
        defaultValue: z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.unknown()).describe(
          "Contains the translations for the string.",
        ).optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
      ).optional(),
      privateImageId: z.string().describe(
        "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
      ).optional(),
      sourceUri: z.object({
        description: z.string().describe(
          "Additional information about the image, which is unused and retained only for backward compatibility.",
        ).optional(),
        localizedDescription: z.object({
          defaultValue: z.unknown().optional(),
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.unknown().describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        uri: z.string().describe(
          "The location of the image. URIs must have a scheme.",
        ).optional(),
      }).optional(),
    }).describe("Wrapping type for Google hosted images.").optional(),
  })).describe(
    "Image module data. The maximum number of these fields displayed is 1 from object level and 1 for class object level.",
  ).optional(),
  infoModuleData: z.object({
    labelValueRows: z.array(z.object({
      columns: z.array(z.object({
        label: z.unknown().describe(
          "The label for a specific row and column. Recommended maximum is 15 characters for a two-column layout and 30 characters for a one-column layout.",
        ).optional(),
        localizedLabel: z.unknown().optional(),
        localizedValue: z.unknown().optional(),
        value: z.unknown().describe(
          "The value for a specific row and column. Recommended maximum is 15 characters for a two-column layout and 30 characters for a one-column layout.",
        ).optional(),
      })).describe(
        "A list of labels and values. These will be displayed in a singular column, one after the other, not in multiple columns, despite the field name.",
      ).optional(),
    })).describe(
      "A list of collections of labels and values. These will be displayed one after the other in a singular column.",
    ).optional(),
    showLastUpdateTime: z.boolean().optional(),
  }).optional(),
  linkedObjectIds: z.array(z.string()).describe(
    "linked_object_ids are a list of other objects such as event ticket, loyalty, offer, generic, giftcard, transit and boarding pass that should be automatically attached to this offer object. If a user had saved this offer, then these linked_object_ids would be automatically pushed to the user's wallet (unless they turned off the setting to receive such linked passes). Make sure that objects present in linked_object_ids are already inserted - if not, calls would fail. Once linked, the linked objects cannot be unlinked. You cannot link objects belonging to another issuer. There is a limit to the number of objects that can be linked to a single object. After the limit is reached, new linked objects in the call will be ignored silently. Object IDs should follow the format issuer ID.identifier where the former is issued by Google and the latter is chosen by you.",
  ).optional(),
  linksModuleData: z.object({
    uris: z.array(z.object({
      description: z.string().describe(
        "The URI's title appearing in the app as text. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens. Note that in some contexts this text is not used, such as when `description` is part of an image.",
      ).optional(),
      id: z.string().describe(
        "The ID associated with a uri. This field is here to enable ease of management of uris.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#uri"`.',
      ).optional(),
      localizedDescription: z.object({
        defaultValue: z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.unknown()).describe(
          "Contains the translations for the string.",
        ).optional(),
      }).optional(),
      uri: z.string().describe(
        "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
      ).optional(),
    })).describe("The list of URIs.").optional(),
  }).optional(),
  locations: z.array(z.object({
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#latLongPoint"`.',
    ).optional(),
    latitude: z.number().describe(
      "The latitude specified as any value in the range of -90.0 through +90.0, both inclusive. Values outside these bounds will be rejected.",
    ).optional(),
    longitude: z.number().describe(
      "The longitude specified in the range -180.0 through +180.0, both inclusive. Values outside these bounds will be rejected.",
    ).optional(),
  })).describe(
    "Note: This field is currently not supported to trigger geo notifications.",
  ).optional(),
  merchantLocations: z.array(z.object({
    latitude: z.number().describe(
      "The latitude specified as any value in the range of -90.0 through +90.0, both inclusive. Values outside these bounds will be rejected.",
    ).optional(),
    longitude: z.number().describe(
      "The longitude specified in the range -180.0 through +180.0, both inclusive. Values outside these bounds will be rejected.",
    ).optional(),
  })).describe(
    "Merchant locations. There is a maximum of ten on the object. Any additional MerchantLocations added beyond the 10 will be rejected. These locations will trigger a notification when a user enters within a Google-set radius of the point. This field replaces the deprecated LatLongPoints.",
  ).optional(),
  messages: z.array(z.object({
    body: z.string().describe("The message body.").optional(),
    displayInterval: z.object({
      end: z.object({
        date: z.string().describe(
          "An ISO 8601 extended format date/time. Offset may or may not be required (refer to the parent field's documentation). Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the date/time is intended for a physical location in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. Providing an offset makes this an absolute instant in time around the world. The date/time will be adjusted based on the user's time zone. For example, a time of `2018-06-19T18:30:00-04:00` will be 18:30:00 for a user in New York and 15:30:00 for a user in Los Angeles. Omitting the offset makes this a local date/time, representing several instants in time around the world. The date/time will always be in the user's current time zone. For example, a time of `2018-06-19T18:30:00` will be 18:30:00 for a user in New York and also 18:30:00 for a user in Los Angeles. This is useful when the same local date/time should apply to many physical locations across several time zones.",
        ).optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#timeInterval"`.',
      ).optional(),
      start: z.object({
        date: z.string().describe(
          "An ISO 8601 extended format date/time. Offset may or may not be required (refer to the parent field's documentation). Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the date/time is intended for a physical location in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. Providing an offset makes this an absolute instant in time around the world. The date/time will be adjusted based on the user's time zone. For example, a time of `2018-06-19T18:30:00-04:00` will be 18:30:00 for a user in New York and 15:30:00 for a user in Los Angeles. Omitting the offset makes this a local date/time, representing several instants in time around the world. The date/time will always be in the user's current time zone. For example, a time of `2018-06-19T18:30:00` will be 18:30:00 for a user in New York and also 18:30:00 for a user in Los Angeles. This is useful when the same local date/time should apply to many physical locations across several time zones.",
        ).optional(),
      }).optional(),
    }).optional(),
    header: z.string().describe("The message header.").optional(),
    id: z.string().describe(
      "The ID associated with a message. This field is here to enable ease of management of messages. Notice ID values could possibly duplicate across multiple messages in the same class/instance, and care must be taken to select a reasonable ID for each message.",
    ).optional(),
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#walletObjectMessage"`.',
    ).optional(),
    localizedBody: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.unknown().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.unknown().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.unknown().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    localizedHeader: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.unknown().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.unknown().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.unknown().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    messageType: z.enum([
      "MESSAGE_TYPE_UNSPECIFIED",
      "TEXT",
      "text",
      "EXPIRATION_NOTIFICATION",
      "expirationNotification",
      "TEXT_AND_NOTIFY",
    ]).describe("The message type.").optional(),
  })).describe(
    "An array of messages displayed in the app. All users of this object will receive its associated messages. The maximum number of these fields is 10.",
  ).optional(),
  notifyPreference: z.enum([
    "NOTIFICATION_SETTINGS_FOR_UPDATES_UNSPECIFIED",
    "NOTIFY_ON_UPDATE",
  ]).describe(
    "Whether or not field updates to this object should trigger notifications. When set to NOTIFY, we will attempt to trigger a field update notification to users. These notifications will only be sent to users if the field is part of an allowlist. If set to DO_NOT_NOTIFY or NOTIFICATION_SETTINGS_UNSPECIFIED, no notification will be triggered. This setting is ephemeral and needs to be set with each PATCH or UPDATE request, otherwise a notification will not be triggered.",
  ).optional(),
  passConstraints: z.object({
    nfcConstraint: z.array(
      z.enum([
        "NFC_CONSTRAINT_UNSPECIFIED",
        "BLOCK_PAYMENT",
        "BLOCK_CLOSED_LOOP_TRANSIT",
      ]),
    ).describe("The NFC constraints for the pass.").optional(),
    screenshotEligibility: z.enum([
      "SCREENSHOT_ELIGIBILITY_UNSPECIFIED",
      "ELIGIBLE",
      "INELIGIBLE",
    ]).describe("The screenshot eligibility for the pass.").optional(),
  }).describe("Container for any constraints that may be placed on passes.")
    .optional(),
  rotatingBarcode: z.object({
    alternateText: z.string().describe(
      "An optional text that will override the default text that shows under the barcode. This field is intended for a human readable equivalent of the barcode value, used when the barcode cannot be scanned.",
    ).optional(),
    initialRotatingBarcodeValues: z.object({
      periodMillis: z.string().describe(
        "Required. The amount of time each barcode is valid for.",
      ).optional(),
      startDateTime: z.string().describe(
        "Required. The date/time the first barcode is valid from. Barcodes will be rotated through using period_millis defined on the object's RotatingBarcodeValueInfo. This is an ISO 8601 extended format date/time, with an offset. Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the event were in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year.",
      ).optional(),
      values: z.array(z.string()).describe(
        "Required. The values to encode in the barcode. At least one value is required.",
      ).optional(),
    }).describe("A payload containing many barcode values and start date/time.")
      .optional(),
    renderEncoding: z.enum(["RENDER_ENCODING_UNSPECIFIED", "UTF_8"]).describe(
      "The render encoding for the barcode. When specified, barcode is rendered in the given encoding. Otherwise best known encoding is chosen by Google.",
    ).optional(),
    showCodeText: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    totpDetails: z.object({
      algorithm: z.enum(["TOTP_ALGORITHM_UNSPECIFIED", "TOTP_SHA1"]).describe(
        "The TOTP algorithm used to generate the OTP.",
      ).optional(),
      parameters: z.array(z.object({
        key: z.string().describe(
          "The secret key used for the TOTP value generation, encoded as a Base16 string.",
        ).optional(),
        valueLength: z.number().int().describe(
          "The length of the TOTP value in decimal digits.",
        ).optional(),
      })).describe(
        "The TOTP parameters for each of the {totp_value_*} substitutions. The TotpParameters at index n is used for the {totp_value_n} substitution.",
      ).optional(),
      periodMillis: z.string().describe(
        "The time interval used for the TOTP value generation, in milliseconds.",
      ).optional(),
    }).describe(
      "Configuration for the time-based OTP substitutions. See https://tools.ietf.org/html/rfc6238",
    ).optional(),
    type: z.enum([
      "BARCODE_TYPE_UNSPECIFIED",
      "AZTEC",
      "aztec",
      "CODE_39",
      "code39",
      "CODE_128",
      "code128",
      "CODABAR",
      "codabar",
      "DATA_MATRIX",
      "dataMatrix",
      "EAN_8",
      "ean8",
      "EAN_13",
      "ean13",
      "EAN13",
      "ITF_14",
      "itf14",
      "PDF_417",
      "pdf417",
      "PDF417",
      "QR_CODE",
      "qrCode",
      "qrcode",
      "UPC_A",
      "upcA",
      "TEXT_ONLY",
      "textOnly",
    ]).describe("The type of this barcode.").optional(),
    valuePattern: z.string().describe(
      "String encoded barcode value. This string supports the following substitutions: * {totp_value_n}: Replaced with the TOTP value (see TotpDetails.parameters). * {totp_timestamp_millis}: Replaced with the timestamp (millis since epoch) at which the barcode was generated. * {totp_timestamp_seconds}: Replaced with the timestamp (seconds since epoch) at which the barcode was generated.",
    ).optional(),
  }).optional(),
  saveRestrictions: z.object({
    restrictToEmailSha256: z.string().describe(
      'Restrict the save of the referencing object to the given email address only. This is the hex output of SHA256 sum of the email address, all lowercase and without any notations like "." or "+", except "@". For example, for example@example.com, this value will be 31c5543c1734d25c7206f5fd591525d0295bec6fe84ff82f946a34fe970a1e66 and for Example@example.com, this value will be bc34f262c93ad7122763684ccea6f07fb7f5d8a2d11e60ce15a6f43fe70ce632 If email address of the logged-in user who tries to save this pass does not match with the defined value here, users won\'t be allowed to save this pass. They will instead be prompted with an error to contact the issuer. This information should be gathered from the user with an explicit consent via Sign in with Google integration https://developers.google.com/identity/authentication. Please contact with support before using Save Restrictions.',
    ).optional(),
  }).describe(
    "Defines restrictions on the object that will be verified during save. Note: this is an advanced feature, please contact Google for implementation support.",
  ).optional(),
  smartTapRedemptionValue: z.string().describe(
    "The value that will be transmitted to a Smart Tap certified terminal over NFC for this object. The class level fields `enableSmartTap` and `redemptionIssuers` must also be set up correctly in order for the pass to support Smart Tap. Only ASCII characters are supported.",
  ).optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "ACTIVE",
    "active",
    "COMPLETED",
    "completed",
    "EXPIRED",
    "expired",
    "INACTIVE",
    "inactive",
  ]).describe(
    'Required. The state of the object. This field is used to determine how an object is displayed in the app. For example, an `inactive` object is moved to the "Expired passes" section.',
  ).optional(),
  textModulesData: z.array(z.object({
    body: z.string().describe(
      "The body of the Text Module, which is defined as an uninterrupted string. Recommended maximum length is 500 characters to ensure full string is displayed on smaller screens.",
    ).optional(),
    header: z.string().describe(
      "The header of the Text Module. Recommended maximum length is 35 characters to ensure full string is displayed on smaller screens.",
    ).optional(),
    id: z.string().describe(
      "The ID associated with a text module. This field is here to enable ease of management of text modules and referencing them in template overrides. The ID should only include alphanumeric characters, '_', or '-'. It can not include dots, as dots are used to separate fields within FieldReference.fieldPaths in template overrides.",
    ).optional(),
    localizedBody: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.unknown().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.unknown().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.unknown().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    localizedHeader: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.unknown().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.unknown().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.unknown().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
  })).describe(
    "Text module data. If text module data is also defined on the class, both will be displayed. The maximum number of these fields displayed is 10 from the object and 10 from the class.",
  ).optional(),
  validTimeInterval: z.object({
    end: z.object({
      date: z.string().describe(
        "An ISO 8601 extended format date/time. Offset may or may not be required (refer to the parent field's documentation). Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the date/time is intended for a physical location in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. Providing an offset makes this an absolute instant in time around the world. The date/time will be adjusted based on the user's time zone. For example, a time of `2018-06-19T18:30:00-04:00` will be 18:30:00 for a user in New York and 15:30:00 for a user in Los Angeles. Omitting the offset makes this a local date/time, representing several instants in time around the world. The date/time will always be in the user's current time zone. For example, a time of `2018-06-19T18:30:00` will be 18:30:00 for a user in New York and also 18:30:00 for a user in Los Angeles. This is useful when the same local date/time should apply to many physical locations across several time zones.",
      ).optional(),
    }).optional(),
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#timeInterval"`.',
    ).optional(),
    start: z.object({
      date: z.string().describe(
        "An ISO 8601 extended format date/time. Offset may or may not be required (refer to the parent field's documentation). Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the date/time is intended for a physical location in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. Providing an offset makes this an absolute instant in time around the world. The date/time will be adjusted based on the user's time zone. For example, a time of `2018-06-19T18:30:00-04:00` will be 18:30:00 for a user in New York and 15:30:00 for a user in Los Angeles. Omitting the offset makes this a local date/time, representing several instants in time around the world. The date/time will always be in the user's current time zone. For example, a time of `2018-06-19T18:30:00` will be 18:30:00 for a user in New York and also 18:30:00 for a user in Los Angeles. This is useful when the same local date/time should apply to many physical locations across several time zones.",
      ).optional(),
    }).optional(),
  }).optional(),
  valueAddedModuleData: z.array(z.object({
    body: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.unknown().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.unknown().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.unknown().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    header: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
      ).optional(),
      translatedValues: z.array(z.object({
        kind: z.unknown().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.unknown().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.unknown().describe("The UTF-8 encoded translated string.")
          .optional(),
      })).describe("Contains the translations for the string.").optional(),
    }).optional(),
    image: z.object({
      contentDescription: z.object({
        defaultValue: z.object({
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
          ).optional(),
          language: z.unknown().describe(
            'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
          ).optional(),
          value: z.unknown().describe("The UTF-8 encoded translated string.")
            .optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.unknown()).describe(
          "Contains the translations for the string.",
        ).optional(),
      }).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`.',
      ).optional(),
      privateImageId: z.string().describe(
        "An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images.",
      ).optional(),
      sourceUri: z.object({
        description: z.string().describe(
          "Additional information about the image, which is unused and retained only for backward compatibility.",
        ).optional(),
        localizedDescription: z.object({
          defaultValue: z.unknown().optional(),
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.unknown().describe(
            "Contains the translations for the string.",
          ).optional(),
        }).optional(),
        uri: z.string().describe(
          "The location of the image. URIs must have a scheme.",
        ).optional(),
      }).optional(),
    }).describe("Wrapping type for Google hosted images.").optional(),
    sortIndex: z.number().int().describe(
      "The index for sorting the modules. Modules with a lower sort index are shown before modules with a higher sort index. If unspecified, the sort index is assumed to be INT_MAX. For two modules with the same index, the sorting behavior is undefined.",
    ).optional(),
    uri: z.string().describe(
      "URI that the module leads to on click. This can be a web link or a deep link as mentioned in https://developer.android.com/training/app-links/deep-linking.",
    ).optional(),
    viewConstraints: z.object({
      displayInterval: z.object({
        end: z.object({
          date: z.unknown().describe(
            "An ISO 8601 extended format date/time. Offset may or may not be required (refer to the parent field's documentation). Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the date/time is intended for a physical location in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. Providing an offset makes this an absolute instant in time around the world. The date/time will be adjusted based on the user's time zone. For example, a time of `2018-06-19T18:30:00-04:00` will be 18:30:00 for a user in New York and 15:30:00 for a user in Los Angeles. Omitting the offset makes this a local date/time, representing several instants in time around the world. The date/time will always be in the user's current time zone. For example, a time of `2018-06-19T18:30:00` will be 18:30:00 for a user in New York and also 18:30:00 for a user in Los Angeles. This is useful when the same local date/time should apply to many physical locations across several time zones.",
          ).optional(),
        }).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#timeInterval"`.',
        ).optional(),
        start: z.object({
          date: z.unknown().describe(
            "An ISO 8601 extended format date/time. Offset may or may not be required (refer to the parent field's documentation). Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the date/time is intended for a physical location in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. Providing an offset makes this an absolute instant in time around the world. The date/time will be adjusted based on the user's time zone. For example, a time of `2018-06-19T18:30:00-04:00` will be 18:30:00 for a user in New York and 15:30:00 for a user in Los Angeles. Omitting the offset makes this a local date/time, representing several instants in time around the world. The date/time will always be in the user's current time zone. For example, a time of `2018-06-19T18:30:00` will be 18:30:00 for a user in New York and also 18:30:00 for a user in Los Angeles. This is useful when the same local date/time should apply to many physical locations across several time zones.",
          ).optional(),
        }).optional(),
      }).optional(),
    }).describe("Constraints that all must be met for the module to be shown.")
      .optional(),
  })).describe(
    "Optional value added module data. Maximum of fifteen on the object. For a pass only fifteen will be displayed.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Wallet Offerobject. Registered at `@swamp/gcp/walletobjects/offerobject`. */
export const model = {
  type: "@swamp/gcp/walletobjects/offerobject",
  version: "2026.05.21.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Returns the offer object with the given object ID.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a offerobject",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["appLinkData"] !== undefined) {
          body["appLinkData"] = g["appLinkData"];
        }
        if (g["barcode"] !== undefined) body["barcode"] = g["barcode"];
        if (g["classId"] !== undefined) body["classId"] = g["classId"];
        if (g["classReference"] !== undefined) {
          body["classReference"] = g["classReference"];
        }
        if (g["disableExpirationNotification"] !== undefined) {
          body["disableExpirationNotification"] =
            g["disableExpirationNotification"];
        }
        if (g["groupingInfo"] !== undefined) {
          body["groupingInfo"] = g["groupingInfo"];
        }
        if (g["hasLinkedDevice"] !== undefined) {
          body["hasLinkedDevice"] = g["hasLinkedDevice"];
        }
        if (g["hasUsers"] !== undefined) body["hasUsers"] = g["hasUsers"];
        if (g["heroImage"] !== undefined) body["heroImage"] = g["heroImage"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["imageModulesData"] !== undefined) {
          body["imageModulesData"] = g["imageModulesData"];
        }
        if (g["infoModuleData"] !== undefined) {
          body["infoModuleData"] = g["infoModuleData"];
        }
        if (g["linkedObjectIds"] !== undefined) {
          body["linkedObjectIds"] = g["linkedObjectIds"];
        }
        if (g["linksModuleData"] !== undefined) {
          body["linksModuleData"] = g["linksModuleData"];
        }
        if (g["locations"] !== undefined) body["locations"] = g["locations"];
        if (g["merchantLocations"] !== undefined) {
          body["merchantLocations"] = g["merchantLocations"];
        }
        if (g["messages"] !== undefined) body["messages"] = g["messages"];
        if (g["notifyPreference"] !== undefined) {
          body["notifyPreference"] = g["notifyPreference"];
        }
        if (g["passConstraints"] !== undefined) {
          body["passConstraints"] = g["passConstraints"];
        }
        if (g["rotatingBarcode"] !== undefined) {
          body["rotatingBarcode"] = g["rotatingBarcode"];
        }
        if (g["saveRestrictions"] !== undefined) {
          body["saveRestrictions"] = g["saveRestrictions"];
        }
        if (g["smartTapRedemptionValue"] !== undefined) {
          body["smartTapRedemptionValue"] = g["smartTapRedemptionValue"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["textModulesData"] !== undefined) {
          body["textModulesData"] = g["textModulesData"];
        }
        if (g["validTimeInterval"] !== undefined) {
          body["validTimeInterval"] = g["validTimeInterval"];
        }
        if (g["valueAddedModuleData"] !== undefined) {
          body["valueAddedModuleData"] = g["valueAddedModuleData"];
        }
        if (g["id"] !== undefined) params["resourceId"] = String(g["id"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE", "COMPLETED"],
              "failedValues": [],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {},
            matchField: "id",
            matchValue: String(g["id"] ?? ""),
          },
        ) as StateData;
        const instanceName = ((result.id ?? g.id)?.toString() ?? "current")
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
      description: "Get a offerobject",
      arguments: z.object({
        identifier: z.string().describe("The id of the offerobject"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["resourceId"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName =
          ((result.id ?? g.id)?.toString() ?? args.identifier).replace(
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
      description: "Update offerobject attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.id?.toString() ?? "current").replace(
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
        params["resourceId"] = existing["id"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["appLinkData"] !== undefined) {
          body["appLinkData"] = g["appLinkData"];
        }
        if (g["barcode"] !== undefined) body["barcode"] = g["barcode"];
        if (g["classId"] !== undefined) body["classId"] = g["classId"];
        if (g["classReference"] !== undefined) {
          body["classReference"] = g["classReference"];
        }
        if (g["disableExpirationNotification"] !== undefined) {
          body["disableExpirationNotification"] =
            g["disableExpirationNotification"];
        }
        if (g["groupingInfo"] !== undefined) {
          body["groupingInfo"] = g["groupingInfo"];
        }
        if (g["hasLinkedDevice"] !== undefined) {
          body["hasLinkedDevice"] = g["hasLinkedDevice"];
        }
        if (g["hasUsers"] !== undefined) body["hasUsers"] = g["hasUsers"];
        if (g["heroImage"] !== undefined) body["heroImage"] = g["heroImage"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["imageModulesData"] !== undefined) {
          body["imageModulesData"] = g["imageModulesData"];
        }
        if (g["infoModuleData"] !== undefined) {
          body["infoModuleData"] = g["infoModuleData"];
        }
        if (g["linkedObjectIds"] !== undefined) {
          body["linkedObjectIds"] = g["linkedObjectIds"];
        }
        if (g["linksModuleData"] !== undefined) {
          body["linksModuleData"] = g["linksModuleData"];
        }
        if (g["locations"] !== undefined) body["locations"] = g["locations"];
        if (g["merchantLocations"] !== undefined) {
          body["merchantLocations"] = g["merchantLocations"];
        }
        if (g["messages"] !== undefined) body["messages"] = g["messages"];
        if (g["notifyPreference"] !== undefined) {
          body["notifyPreference"] = g["notifyPreference"];
        }
        if (g["passConstraints"] !== undefined) {
          body["passConstraints"] = g["passConstraints"];
        }
        if (g["rotatingBarcode"] !== undefined) {
          body["rotatingBarcode"] = g["rotatingBarcode"];
        }
        if (g["saveRestrictions"] !== undefined) {
          body["saveRestrictions"] = g["saveRestrictions"];
        }
        if (g["smartTapRedemptionValue"] !== undefined) {
          body["smartTapRedemptionValue"] = g["smartTapRedemptionValue"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["textModulesData"] !== undefined) {
          body["textModulesData"] = g["textModulesData"];
        }
        if (g["validTimeInterval"] !== undefined) {
          body["validTimeInterval"] = g["validTimeInterval"];
        }
        if (g["valueAddedModuleData"] !== undefined) {
          body["valueAddedModuleData"] = g["valueAddedModuleData"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE", "COMPLETED"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Sync offerobject state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.id?.toString() ?? "current").replace(
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
          const identifier = existing.id?.toString() ?? g["id"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["resourceId"] = identifier;
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
    addmessage: {
      description: "addmessage",
      arguments: z.object({
        message: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.id?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resourceId"] = existing["id"]?.toString() ??
          g["id"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["message"] !== undefined) body["message"] = args["message"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "walletobjects.offerobject.addmessage",
            "path": "walletobjects/v1/offerObject/{resourceId}/addMessage",
            "httpMethod": "POST",
            "parameterOrder": ["resourceId"],
            "parameters": {
              "resourceId": { "location": "path", "required": true },
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
