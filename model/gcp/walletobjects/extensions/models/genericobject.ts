// Auto-generated extension model for @swamp/gcp/walletobjects/genericobject
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Wallet Genericobject.
 *
 * Generic Object
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
  "id": "walletobjects.genericobject.get",
  "path": "walletobjects/v1/genericObject/{resourceId}",
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
  "id": "walletobjects.genericobject.insert",
  "path": "walletobjects/v1/genericObject",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const UPDATE_CONFIG = {
  "id": "walletobjects.genericobject.update",
  "path": "walletobjects/v1/genericObject/{resourceId}",
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
  cardTitle: z.object({
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
  classId: z.string().describe(
    "Required. The class associated with this object. The class must be of the same type as this object, must already exist, and must be approved. Class IDs should follow the format `issuerID.identifier` where `issuerID` is issued by Google and `identifier` is chosen by you.",
  ).optional(),
  genericType: z.enum([
    "GENERIC_TYPE_UNSPECIFIED",
    "GENERIC_SEASON_PASS",
    "GENERIC_UTILITY_BILLS",
    "GENERIC_PARKING_PASS",
    "GENERIC_VOUCHER",
    "GENERIC_GYM_MEMBERSHIP",
    "GENERIC_LIBRARY_MEMBERSHIP",
    "GENERIC_RESERVATIONS",
    "GENERIC_AUTO_INSURANCE",
    "GENERIC_HOME_INSURANCE",
    "GENERIC_ENTRY_TICKET",
    "GENERIC_RECEIPT",
    "GENERIC_LOYALTY_CARD",
    "GENERIC_BUSINESS_CARD",
    "GENERIC_BARCODE_PASS",
    "GENERIC_MEMBERSHIP_CARD",
    "GENERIC_STUDENT_CARD",
    "GENERIC_TRANSIT_PASS",
    "GENERIC_VEHICLE_REGISTRATION",
    "GENERIC_OTHER",
  ]).describe("Specify which `GenericType` the card belongs to.").optional(),
  groupingInfo: z.object({
    groupingId: z.string().describe(
      "Optional grouping ID for grouping the passes with the same ID visually together. Grouping with different types of passes is allowed.",
    ).optional(),
    sortIndex: z.number().int().describe(
      "Optional index for sorting the passes when they are grouped with other passes. Passes with lower sort index are shown before passes with higher sort index. If unspecified, the value is assumed to be INT_MAX. For two passes with the same sort index, the sorting behavior is undefined.",
    ).optional(),
  }).optional(),
  hasUsers: z.boolean().describe(
    "Indicates if the object has users. This field is set by the platform.",
  ).optional(),
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
  hexBackgroundColor: z.string().describe(
    "The background color for the card. If not set, the dominant color of the hero image is used, and if no hero image is set, the dominant color of the logo is used and if logo is not set, a color would be chosen by Google.",
  ).optional(),
  id: z.string().describe(
    "Required. The unique identifier for an object. This ID must be unique across all objects from an issuer. This value needs to follow the format `issuerID.identifier` where `issuerID` is issued by Google and `identifier` is chosen by you. The unique identifier can only include alphanumeric characters, `.`, `_`, or `-`.",
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
    "Image module data. Only one of the image from class and one from object level will be rendered when both set.",
  ).optional(),
  linkedObjectIds: z.array(z.string()).describe(
    "linked_object_ids are a list of other objects such as event ticket, loyalty, offer, generic, giftcard, transit and boarding pass that should be automatically attached to this generic object. If a user had saved this generic card, then these linked_object_ids would be automatically pushed to the user's wallet (unless they turned off the setting to receive such linked passes). Make sure that objects present in linked_object_ids are already inserted - if not, calls would fail. Once linked, the linked objects cannot be unlinked. You cannot link objects belonging to another issuer. There is a limit to the number of objects that can be linked to a single object. After the limit is reached, new linked objects in the call will be ignored silently. Object IDs should follow the format issuer ID. identifier where the former is issued by Google and the latter is chosen by you.",
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
  logo: z.object({
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
  notifications: z.object({
    expiryNotification: z.object({
      enableNotification: z.boolean().describe(
        "Indicates if the object needs to have expiry notification enabled.",
      ).optional(),
    }).describe(
      "Indicates that the issuer would like Google Wallet to send expiry notifications 2 days prior to the card expiration.",
    ).optional(),
    upcomingNotification: z.object({
      enableNotification: z.boolean().describe(
        "Indicates if the object needs to have upcoming notification enabled.",
      ).optional(),
    }).describe(
      "Indicates that the issuer would like Google Wallet to send an upcoming card validity notification 1 day before card becomes valid/usable.",
    ).optional(),
  }).describe(
    "Indicates if the object needs to have notification enabled. We support only one of ExpiryNotification/UpcomingNotification. `expiryNotification` takes precedence over `upcomingNotification`. In other words if `expiryNotification` is set, we ignore the `upcomingNotification` field.",
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
    'The state of the object. This field is used to determine how an object is displayed in the app. For example, an `inactive` object is moved to the "Expired passes" section. If this is not provided, the object would be considered `ACTIVE`.',
  ).optional(),
  subheader: z.object({
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
    "Text module data. If `textModulesData` is also defined on the class, both will be displayed. The maximum number of these fields displayed is 10 from class and 10 from object.",
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
  wideLogo: z.object({
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
  cardTitle: z.object({
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
  }).optional(),
  classId: z.string().optional(),
  genericType: z.string().optional(),
  groupingInfo: z.object({
    groupingId: z.string(),
    sortIndex: z.number(),
  }).optional(),
  hasUsers: z.boolean().optional(),
  header: z.object({
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
  }).optional(),
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
  hexBackgroundColor: z.string().optional(),
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
  logo: z.object({
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
  notifications: z.object({
    expiryNotification: z.object({
      enableNotification: z.boolean(),
    }),
    upcomingNotification: z.object({
      enableNotification: z.boolean(),
    }),
  }).optional(),
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
  subheader: z.object({
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
  }).optional(),
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
  wideLogo: z.object({
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
  cardTitle: z.object({
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
  classId: z.string().describe(
    "Required. The class associated with this object. The class must be of the same type as this object, must already exist, and must be approved. Class IDs should follow the format `issuerID.identifier` where `issuerID` is issued by Google and `identifier` is chosen by you.",
  ).optional(),
  genericType: z.enum([
    "GENERIC_TYPE_UNSPECIFIED",
    "GENERIC_SEASON_PASS",
    "GENERIC_UTILITY_BILLS",
    "GENERIC_PARKING_PASS",
    "GENERIC_VOUCHER",
    "GENERIC_GYM_MEMBERSHIP",
    "GENERIC_LIBRARY_MEMBERSHIP",
    "GENERIC_RESERVATIONS",
    "GENERIC_AUTO_INSURANCE",
    "GENERIC_HOME_INSURANCE",
    "GENERIC_ENTRY_TICKET",
    "GENERIC_RECEIPT",
    "GENERIC_LOYALTY_CARD",
    "GENERIC_BUSINESS_CARD",
    "GENERIC_BARCODE_PASS",
    "GENERIC_MEMBERSHIP_CARD",
    "GENERIC_STUDENT_CARD",
    "GENERIC_TRANSIT_PASS",
    "GENERIC_VEHICLE_REGISTRATION",
    "GENERIC_OTHER",
  ]).describe("Specify which `GenericType` the card belongs to.").optional(),
  groupingInfo: z.object({
    groupingId: z.string().describe(
      "Optional grouping ID for grouping the passes with the same ID visually together. Grouping with different types of passes is allowed.",
    ).optional(),
    sortIndex: z.number().int().describe(
      "Optional index for sorting the passes when they are grouped with other passes. Passes with lower sort index are shown before passes with higher sort index. If unspecified, the value is assumed to be INT_MAX. For two passes with the same sort index, the sorting behavior is undefined.",
    ).optional(),
  }).optional(),
  hasUsers: z.boolean().describe(
    "Indicates if the object has users. This field is set by the platform.",
  ).optional(),
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
  hexBackgroundColor: z.string().describe(
    "The background color for the card. If not set, the dominant color of the hero image is used, and if no hero image is set, the dominant color of the logo is used and if logo is not set, a color would be chosen by Google.",
  ).optional(),
  id: z.string().describe(
    "Required. The unique identifier for an object. This ID must be unique across all objects from an issuer. This value needs to follow the format `issuerID.identifier` where `issuerID` is issued by Google and `identifier` is chosen by you. The unique identifier can only include alphanumeric characters, `.`, `_`, or `-`.",
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
    "Image module data. Only one of the image from class and one from object level will be rendered when both set.",
  ).optional(),
  linkedObjectIds: z.array(z.string()).describe(
    "linked_object_ids are a list of other objects such as event ticket, loyalty, offer, generic, giftcard, transit and boarding pass that should be automatically attached to this generic object. If a user had saved this generic card, then these linked_object_ids would be automatically pushed to the user's wallet (unless they turned off the setting to receive such linked passes). Make sure that objects present in linked_object_ids are already inserted - if not, calls would fail. Once linked, the linked objects cannot be unlinked. You cannot link objects belonging to another issuer. There is a limit to the number of objects that can be linked to a single object. After the limit is reached, new linked objects in the call will be ignored silently. Object IDs should follow the format issuer ID. identifier where the former is issued by Google and the latter is chosen by you.",
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
  logo: z.object({
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
  notifications: z.object({
    expiryNotification: z.object({
      enableNotification: z.boolean().describe(
        "Indicates if the object needs to have expiry notification enabled.",
      ).optional(),
    }).describe(
      "Indicates that the issuer would like Google Wallet to send expiry notifications 2 days prior to the card expiration.",
    ).optional(),
    upcomingNotification: z.object({
      enableNotification: z.boolean().describe(
        "Indicates if the object needs to have upcoming notification enabled.",
      ).optional(),
    }).describe(
      "Indicates that the issuer would like Google Wallet to send an upcoming card validity notification 1 day before card becomes valid/usable.",
    ).optional(),
  }).describe(
    "Indicates if the object needs to have notification enabled. We support only one of ExpiryNotification/UpcomingNotification. `expiryNotification` takes precedence over `upcomingNotification`. In other words if `expiryNotification` is set, we ignore the `upcomingNotification` field.",
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
    'The state of the object. This field is used to determine how an object is displayed in the app. For example, an `inactive` object is moved to the "Expired passes" section. If this is not provided, the object would be considered `ACTIVE`.',
  ).optional(),
  subheader: z.object({
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
    "Text module data. If `textModulesData` is also defined on the class, both will be displayed. The maximum number of these fields displayed is 10 from class and 10 from object.",
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
  wideLogo: z.object({
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
});

/** Swamp extension model for Google Cloud Google Wallet Genericobject. Registered at `@swamp/gcp/walletobjects/genericobject`. */
export const model = {
  type: "@swamp/gcp/walletobjects/genericobject",
  version: "2026.05.19.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Generic Object",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a genericobject",
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
        if (g["cardTitle"] !== undefined) body["cardTitle"] = g["cardTitle"];
        if (g["classId"] !== undefined) body["classId"] = g["classId"];
        if (g["genericType"] !== undefined) {
          body["genericType"] = g["genericType"];
        }
        if (g["groupingInfo"] !== undefined) {
          body["groupingInfo"] = g["groupingInfo"];
        }
        if (g["hasUsers"] !== undefined) body["hasUsers"] = g["hasUsers"];
        if (g["header"] !== undefined) body["header"] = g["header"];
        if (g["heroImage"] !== undefined) body["heroImage"] = g["heroImage"];
        if (g["hexBackgroundColor"] !== undefined) {
          body["hexBackgroundColor"] = g["hexBackgroundColor"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["imageModulesData"] !== undefined) {
          body["imageModulesData"] = g["imageModulesData"];
        }
        if (g["linkedObjectIds"] !== undefined) {
          body["linkedObjectIds"] = g["linkedObjectIds"];
        }
        if (g["linksModuleData"] !== undefined) {
          body["linksModuleData"] = g["linksModuleData"];
        }
        if (g["logo"] !== undefined) body["logo"] = g["logo"];
        if (g["merchantLocations"] !== undefined) {
          body["merchantLocations"] = g["merchantLocations"];
        }
        if (g["messages"] !== undefined) body["messages"] = g["messages"];
        if (g["notifications"] !== undefined) {
          body["notifications"] = g["notifications"];
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
        if (g["subheader"] !== undefined) body["subheader"] = g["subheader"];
        if (g["textModulesData"] !== undefined) {
          body["textModulesData"] = g["textModulesData"];
        }
        if (g["validTimeInterval"] !== undefined) {
          body["validTimeInterval"] = g["validTimeInterval"];
        }
        if (g["valueAddedModuleData"] !== undefined) {
          body["valueAddedModuleData"] = g["valueAddedModuleData"];
        }
        if (g["wideLogo"] !== undefined) body["wideLogo"] = g["wideLogo"];
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
      description: "Get a genericobject",
      arguments: z.object({
        identifier: z.string().describe("The id of the genericobject"),
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
      description: "Update genericobject attributes",
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
        if (g["cardTitle"] !== undefined) body["cardTitle"] = g["cardTitle"];
        if (g["classId"] !== undefined) body["classId"] = g["classId"];
        if (g["genericType"] !== undefined) {
          body["genericType"] = g["genericType"];
        }
        if (g["groupingInfo"] !== undefined) {
          body["groupingInfo"] = g["groupingInfo"];
        }
        if (g["hasUsers"] !== undefined) body["hasUsers"] = g["hasUsers"];
        if (g["header"] !== undefined) body["header"] = g["header"];
        if (g["heroImage"] !== undefined) body["heroImage"] = g["heroImage"];
        if (g["hexBackgroundColor"] !== undefined) {
          body["hexBackgroundColor"] = g["hexBackgroundColor"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["imageModulesData"] !== undefined) {
          body["imageModulesData"] = g["imageModulesData"];
        }
        if (g["linkedObjectIds"] !== undefined) {
          body["linkedObjectIds"] = g["linkedObjectIds"];
        }
        if (g["linksModuleData"] !== undefined) {
          body["linksModuleData"] = g["linksModuleData"];
        }
        if (g["logo"] !== undefined) body["logo"] = g["logo"];
        if (g["merchantLocations"] !== undefined) {
          body["merchantLocations"] = g["merchantLocations"];
        }
        if (g["messages"] !== undefined) body["messages"] = g["messages"];
        if (g["notifications"] !== undefined) {
          body["notifications"] = g["notifications"];
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
        if (g["subheader"] !== undefined) body["subheader"] = g["subheader"];
        if (g["textModulesData"] !== undefined) {
          body["textModulesData"] = g["textModulesData"];
        }
        if (g["validTimeInterval"] !== undefined) {
          body["validTimeInterval"] = g["validTimeInterval"];
        }
        if (g["valueAddedModuleData"] !== undefined) {
          body["valueAddedModuleData"] = g["valueAddedModuleData"];
        }
        if (g["wideLogo"] !== undefined) body["wideLogo"] = g["wideLogo"];
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
      description: "Sync genericobject state from GCP",
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
            "id": "walletobjects.genericobject.addmessage",
            "path": "walletobjects/v1/genericObject/{resourceId}/addMessage",
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
