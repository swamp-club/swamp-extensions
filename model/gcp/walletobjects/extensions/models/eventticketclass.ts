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

// Auto-generated extension model for @swamp/gcp/walletobjects/eventticketclass
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Wallet Eventticketclass.
 *
 * Returns the event ticket class with the given class ID.
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
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://walletobjects.googleapis.com/";

const GET_CONFIG = {
  "id": "walletobjects.eventticketclass.get",
  "path": "walletobjects/v1/eventTicketClass/{resourceId}",
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
  "id": "walletobjects.eventticketclass.insert",
  "path": "walletobjects/v1/eventTicketClass",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const UPDATE_CONFIG = {
  "id": "walletobjects.eventticketclass.update",
  "path": "walletobjects/v1/eventTicketClass/{resourceId}",
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
  "id": "walletobjects.eventticketclass.list",
  "path": "walletobjects/v1/eventTicketClass",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "issuerId": {
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

const _defaultOAuthScopes: string[] = [
  "https://www.googleapis.com/auth/wallet_object.issuer",
];

const GlobalArgsSchema = z.object({
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
          }).describe(
            "Contains the string to be displayed if no appropriate translation is available.",
          ).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).describe("Description of the image used for accessibility.")
          .optional(),
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
            defaultValue: z.unknown().describe(
              "Contains the string to be displayed if no appropriate translation is available.",
            ).optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).describe(
            "Translated strings for the description, which are unused and retained only for backward compatibility.",
          ).optional(),
          uri: z.string().describe(
            "The location of the image. URIs must have a scheme.",
          ).optional(),
        }).describe(
          "A URI for the image. Either this or private_image_id should be set. Requests setting both or neither will be rejected.",
        ).optional(),
      }).describe("Deprecated. Image isn't supported in the app link module.")
        .optional(),
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
            defaultValue: z.unknown().describe(
              "Contains the string to be displayed if no appropriate translation is available.",
            ).optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).describe(
            "Translated strings for the description. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens.",
          ).optional(),
          uri: z.string().describe(
            "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
          ).optional(),
        }).describe(
          "URI for AppTarget. The description on the URI must be set. Prefer setting package field instead, if this target is defined for your application.",
        ).optional(),
      }).describe(
        "Target to follow when opening the app link on clients. It will be used by partners to open their app or webpage.",
      ).optional(),
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
        }).describe(
          "Contains the string to be displayed if no appropriate translation is available.",
        ).optional(),
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
      }).describe(
        "Deprecated. Description isn't supported in the app link module.",
      ).optional(),
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
        }).describe(
          "Contains the string to be displayed if no appropriate translation is available.",
        ).optional(),
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
      }).describe("Deprecated. Title isn't supported in the app link module.")
        .optional(),
    }).describe("Optional information about the partner app link.").optional(),
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
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe(
      "Optional display text for the app link button. Character limit is 30.",
    ).optional(),
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
          }).describe(
            "Contains the string to be displayed if no appropriate translation is available.",
          ).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).describe("Description of the image used for accessibility.")
          .optional(),
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
            defaultValue: z.unknown().describe(
              "Contains the string to be displayed if no appropriate translation is available.",
            ).optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).describe(
            "Translated strings for the description, which are unused and retained only for backward compatibility.",
          ).optional(),
          uri: z.string().describe(
            "The location of the image. URIs must have a scheme.",
          ).optional(),
        }).describe(
          "A URI for the image. Either this or private_image_id should be set. Requests setting both or neither will be rejected.",
        ).optional(),
      }).describe("Deprecated. Image isn't supported in the app link module.")
        .optional(),
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
            defaultValue: z.unknown().describe(
              "Contains the string to be displayed if no appropriate translation is available.",
            ).optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).describe(
            "Translated strings for the description. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens.",
          ).optional(),
          uri: z.string().describe(
            "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
          ).optional(),
        }).describe(
          "URI for AppTarget. The description on the URI must be set. Prefer setting package field instead, if this target is defined for your application.",
        ).optional(),
      }).describe(
        "Target to follow when opening the app link on clients. It will be used by partners to open their app or webpage.",
      ).optional(),
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
        }).describe(
          "Contains the string to be displayed if no appropriate translation is available.",
        ).optional(),
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
      }).describe(
        "Deprecated. Description isn't supported in the app link module.",
      ).optional(),
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
        }).describe(
          "Contains the string to be displayed if no appropriate translation is available.",
        ).optional(),
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
      }).describe("Deprecated. Title isn't supported in the app link module.")
        .optional(),
    }).describe("Deprecated. Links to open iOS apps are not supported.")
      .optional(),
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
          }).describe(
            "Contains the string to be displayed if no appropriate translation is available.",
          ).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).describe("Description of the image used for accessibility.")
          .optional(),
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
            defaultValue: z.unknown().describe(
              "Contains the string to be displayed if no appropriate translation is available.",
            ).optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).describe(
            "Translated strings for the description, which are unused and retained only for backward compatibility.",
          ).optional(),
          uri: z.string().describe(
            "The location of the image. URIs must have a scheme.",
          ).optional(),
        }).describe(
          "A URI for the image. Either this or private_image_id should be set. Requests setting both or neither will be rejected.",
        ).optional(),
      }).describe("Deprecated. Image isn't supported in the app link module.")
        .optional(),
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
            defaultValue: z.unknown().describe(
              "Contains the string to be displayed if no appropriate translation is available.",
            ).optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).describe(
            "Translated strings for the description. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens.",
          ).optional(),
          uri: z.string().describe(
            "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
          ).optional(),
        }).describe(
          "URI for AppTarget. The description on the URI must be set. Prefer setting package field instead, if this target is defined for your application.",
        ).optional(),
      }).describe(
        "Target to follow when opening the app link on clients. It will be used by partners to open their app or webpage.",
      ).optional(),
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
        }).describe(
          "Contains the string to be displayed if no appropriate translation is available.",
        ).optional(),
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
      }).describe(
        "Deprecated. Description isn't supported in the app link module.",
      ).optional(),
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
        }).describe(
          "Contains the string to be displayed if no appropriate translation is available.",
        ).optional(),
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
      }).describe("Deprecated. Title isn't supported in the app link module.")
        .optional(),
    }).describe("Optional information about the partner web link.").optional(),
  }).describe(
    "Optional app or website link that will be displayed as a button on the front of the pass. If AppLinkData is provided for the corresponding object that will be used instead.",
  ).optional(),
  callbackOptions: z.object({
    updateRequestUrl: z.string().describe(
      "URL for the merchant endpoint that would be called to request updates. The URL should be hosted on HTTPS and robots.txt should allow the URL path to be accessible by UserAgent:Googlebot. Deprecated.",
    ).optional(),
    url: z.string().describe(
      "The HTTPS url configured by the merchant. The URL should be hosted on HTTPS and robots.txt should allow the URL path to be accessible by UserAgent:Googlebot.",
    ).optional(),
  }).describe(
    "Callback options to be used to call the issuer back for every save/delete of an object for this class by the end-user. All objects of this class are eligible for the callback.",
  ).optional(),
  classTemplateInfo: z.object({
    cardBarcodeSectionDetails: z.object({
      firstBottomDetail: z.object({
        fieldSelector: z.object({
          fields: z.array(z.unknown()).describe(
            "If more than one reference is supplied, then the first one that references a non-empty field will be displayed.",
          ).optional(),
        }).describe(
          "A reference to an existing text-based or image field to display.",
        ).optional(),
      }).describe("Optional information to display below the barcode.")
        .optional(),
      firstTopDetail: z.object({
        fieldSelector: z.object({
          fields: z.array(z.unknown()).describe(
            "If more than one reference is supplied, then the first one that references a non-empty field will be displayed.",
          ).optional(),
        }).describe(
          "A reference to an existing text-based or image field to display.",
        ).optional(),
      }).describe(
        "Optional information to display above the barcode. If `secondTopDetail` is defined, this will be displayed to the start side of this detail section.",
      ).optional(),
      secondTopDetail: z.object({
        fieldSelector: z.object({
          fields: z.array(z.unknown()).describe(
            "If more than one reference is supplied, then the first one that references a non-empty field will be displayed.",
          ).optional(),
        }).describe(
          "A reference to an existing text-based or image field to display.",
        ).optional(),
      }).describe(
        "Optional second piece of information to display above the barcode. If `firstTopDetail` is defined, this will be displayed to the end side of this detail section.",
      ).optional(),
    }).describe(
      "Specifies extra information to be displayed above and below the barcode.",
    ).optional(),
    cardTemplateOverride: z.object({
      cardRowTemplateInfos: z.array(z.object({
        oneItem: z.object({
          item: z.unknown().describe(
            "The item to be displayed in the row. This item will be automatically centered.",
          ).optional(),
        }).describe(
          'Template for a row containing one item. Exactly one of "one_item", "two_items", "three_items" must be set.',
        ).optional(),
        threeItems: z.object({
          endItem: z.unknown().describe(
            "The item to be displayed at the end of the row. This item will be aligned to the right.",
          ).optional(),
          middleItem: z.unknown().describe(
            "The item to be displayed in the middle of the row. This item will be centered between the start and end items.",
          ).optional(),
          startItem: z.unknown().describe(
            "The item to be displayed at the start of the row. This item will be aligned to the left.",
          ).optional(),
        }).describe(
          'Template for a row containing three items. Exactly one of "one_item", "two_items", "three_items" must be set.',
        ).optional(),
        twoItems: z.object({
          endItem: z.unknown().describe(
            "The item to be displayed at the end of the row. This item will be aligned to the right.",
          ).optional(),
          startItem: z.unknown().describe(
            "The item to be displayed at the start of the row. This item will be aligned to the left.",
          ).optional(),
        }).describe(
          'Template for a row containing two items. Exactly one of "one_item", "two_items", "three_items" must be set.',
        ).optional(),
      })).describe(
        "Template information for rows in the card view. At most three rows are allowed to be specified.",
      ).optional(),
    }).describe("Override for the card view.").optional(),
    detailsTemplateOverride: z.object({
      detailsItemInfos: z.array(z.object({
        item: z.object({
          firstValue: z.unknown().describe(
            'A reference to a field to display. If both `firstValue` and `secondValue` are populated, they will both appear as one item with a slash between them. For example, values A and B would be shown as "A / B".',
          ).optional(),
          predefinedItem: z.unknown().describe(
            "A predefined item to display. Only one of `firstValue` or `predefinedItem` may be set.",
          ).optional(),
          secondValue: z.unknown().describe(
            "A reference to a field to display. This may only be populated if the `firstValue` field is populated.",
          ).optional(),
        }).describe("The item to be displayed in the details list.").optional(),
      })).describe(
        'Information for the "nth" item displayed in the details list.',
      ).optional(),
    }).describe("Override for the details view (beneath the card view).")
      .optional(),
    listTemplateOverride: z.object({
      firstRowOption: z.object({
        fieldOption: z.object({
          fields: z.array(z.unknown()).describe(
            "If more than one reference is supplied, then the first one that references a non-empty field will be displayed.",
          ).optional(),
        }).describe(
          "A reference to the field to be displayed in the first row.",
        ).optional(),
        transitOption: z.enum([
          "TRANSIT_OPTION_UNSPECIFIED",
          "ORIGIN_AND_DESTINATION_NAMES",
          "originAndDestinationNames",
          "ORIGIN_AND_DESTINATION_CODES",
          "originAndDestinationCodes",
          "ORIGIN_NAME",
          "originName",
        ]).optional(),
      }).describe(
        "Specifies from a predefined set of options or from a reference to the field what will be displayed in the first row. To set this override, set the FirstRowOption.fieldOption to the FieldSelector of your choice.",
      ).optional(),
      secondRowOption: z.object({
        fields: z.array(z.object({
          dateFormat: z.unknown().describe(
            "Only valid if the `fieldPath` references a date field. Chooses how the date field will be formatted and displayed in the UI.",
          ).optional(),
          fieldPath: z.unknown().describe(
            'Path to the field being referenced, prefixed with "object" or "class" and separated with dots. For example, it may be the string "object.purchaseDetails.purchasePrice".',
          ).optional(),
        })).describe(
          "If more than one reference is supplied, then the first one that references a non-empty field will be displayed.",
        ).optional(),
      }).describe(
        "A reference to the field to be displayed in the second row. This option is only displayed if there are not multiple user objects in a group. If there is a group, the second row will always display a field shared by all objects. To set this override, please set secondRowOption to the FieldSelector of you choice.",
      ).optional(),
      thirdRowOption: z.object({
        fields: z.array(z.object({
          dateFormat: z.unknown().describe(
            "Only valid if the `fieldPath` references a date field. Chooses how the date field will be formatted and displayed in the UI.",
          ).optional(),
          fieldPath: z.unknown().describe(
            'Path to the field being referenced, prefixed with "object" or "class" and separated with dots. For example, it may be the string "object.purchaseDetails.purchasePrice".',
          ).optional(),
        })).describe(
          "If more than one reference is supplied, then the first one that references a non-empty field will be displayed.",
        ).optional(),
      }).describe(
        "An unused/deprecated field. Setting it will have no effect on what the user sees.",
      ).optional(),
    }).describe("Override for the passes list view.").optional(),
  }).describe(
    "Template information about how the class should be displayed. If unset, Google will fallback to a default set of fields to display.",
  ).optional(),
  confirmationCodeLabel: z.enum([
    "CONFIRMATION_CODE_LABEL_UNSPECIFIED",
    "CONFIRMATION_CODE",
    "confirmationCode",
    "CONFIRMATION_NUMBER",
    "confirmationNumber",
    "ORDER_NUMBER",
    "orderNumber",
    "RESERVATION_NUMBER",
    "reservationNumber",
  ]).describe(
    'The label to use for the confirmation code value (`eventTicketObject.reservationInfo.confirmationCode`) on the card detail view. Each available option maps to a set of localized strings, so that translations are shown to the user based on their locale. Both `confirmationCodeLabel` and `customConfirmationCodeLabel` may not be set. If neither is set, the label will default to "Confirmation Code", localized. If the confirmation code field is unset, this label will not be used.',
  ).optional(),
  countryCode: z.string().describe(
    "Country code used to display the card's country (when the user is not in that country), as well as to display localized content when content is not available in the user's locale.",
  ).optional(),
  customConfirmationCodeLabel: z.object({
    defaultValue: z.object({
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
      ).optional(),
      language: z.string().describe(
        'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
      ).optional(),
      value: z.string().describe("The UTF-8 encoded translated string.")
        .optional(),
    }).describe(
      "Contains the string to be displayed if no appropriate translation is available.",
    ).optional(),
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
  }).describe(
    'A custom label to use for the confirmation code value (`eventTicketObject.reservationInfo.confirmationCode`) on the card detail view. This should only be used if the default "Confirmation Code" label or one of the `confirmationCodeLabel` options is not sufficient. Both `confirmationCodeLabel` and `customConfirmationCodeLabel` may not be set. If neither is set, the label will default to "Confirmation Code", localized. If the confirmation code field is unset, this label will not be used.',
  ).optional(),
  customGateLabel: z.object({
    defaultValue: z.object({
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
      ).optional(),
      language: z.string().describe(
        'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
      ).optional(),
      value: z.string().describe("The UTF-8 encoded translated string.")
        .optional(),
    }).describe(
      "Contains the string to be displayed if no appropriate translation is available.",
    ).optional(),
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
  }).describe(
    'A custom label to use for the gate value (`eventTicketObject.seatInfo.gate`) on the card detail view. This should only be used if the default "Gate" label or one of the `gateLabel` options is not sufficient. Both `gateLabel` and `customGateLabel` may not be set. If neither is set, the label will default to "Gate", localized. If the gate field is unset, this label will not be used.',
  ).optional(),
  customRowLabel: z.object({
    defaultValue: z.object({
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
      ).optional(),
      language: z.string().describe(
        'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
      ).optional(),
      value: z.string().describe("The UTF-8 encoded translated string.")
        .optional(),
    }).describe(
      "Contains the string to be displayed if no appropriate translation is available.",
    ).optional(),
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
  }).describe(
    'A custom label to use for the row value (`eventTicketObject.seatInfo.row`) on the card detail view. This should only be used if the default "Row" label or one of the `rowLabel` options is not sufficient. Both `rowLabel` and `customRowLabel` may not be set. If neither is set, the label will default to "Row", localized. If the row field is unset, this label will not be used.',
  ).optional(),
  customSeatLabel: z.object({
    defaultValue: z.object({
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
      ).optional(),
      language: z.string().describe(
        'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
      ).optional(),
      value: z.string().describe("The UTF-8 encoded translated string.")
        .optional(),
    }).describe(
      "Contains the string to be displayed if no appropriate translation is available.",
    ).optional(),
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
  }).describe(
    'A custom label to use for the seat value (`eventTicketObject.seatInfo.seat`) on the card detail view. This should only be used if the default "Seat" label or one of the `seatLabel` options is not sufficient. Both `seatLabel` and `customSeatLabel` may not be set. If neither is set, the label will default to "Seat", localized. If the seat field is unset, this label will not be used.',
  ).optional(),
  customSectionLabel: z.object({
    defaultValue: z.object({
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
      ).optional(),
      language: z.string().describe(
        'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
      ).optional(),
      value: z.string().describe("The UTF-8 encoded translated string.")
        .optional(),
    }).describe(
      "Contains the string to be displayed if no appropriate translation is available.",
    ).optional(),
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
  }).describe(
    'A custom label to use for the section value (`eventTicketObject.seatInfo.section`) on the card detail view. This should only be used if the default "Section" label or one of the `sectionLabel` options is not sufficient. Both `sectionLabel` and `customSectionLabel` may not be set. If neither is set, the label will default to "Section", localized. If the section field is unset, this label will not be used.',
  ).optional(),
  dateTime: z.object({
    customDoorsOpenLabel: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe(
      'A custom label to use for the doors open value (`doorsOpen`) on the card detail view. This should only be used if the default "Doors Open" label or one of the `doorsOpenLabel` options is not sufficient. Both `doorsOpenLabel` and `customDoorsOpenLabel` may not be set. If neither is set, the label will default to "Doors Open", localized. If the doors open field is unset, this label will not be used.',
    ).optional(),
    doorsOpen: z.string().describe(
      'The date/time when the doors open at the venue. This is an ISO 8601 extended format date/time, with or without an offset. Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the event were in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. The portion of the date/time without the offset is considered the "local date/time". This should be the local date/time at the venue. For example, if the event occurs at the 20th hour of June 5th, 2018 at the venue, the local date/time portion should be `2018-06-05T20:00:00`. If the local date/time at the venue is 4 hours before UTC, an offset of `-04:00` may be appended. Without offset information, some rich features may not be available.',
    ).optional(),
    doorsOpenLabel: z.enum([
      "DOORS_OPEN_LABEL_UNSPECIFIED",
      "DOORS_OPEN",
      "doorsOpen",
      "GATES_OPEN",
      "gatesOpen",
    ]).describe(
      'The label to use for the doors open value (`doorsOpen`) on the card detail view. Each available option maps to a set of localized strings, so that translations are shown to the user based on their locale. Both `doorsOpenLabel` and `customDoorsOpenLabel` may not be set. If neither is set, the label will default to "Doors Open", localized. If the doors open field is unset, this label will not be used.',
    ).optional(),
    end: z.string().describe(
      'The date/time when the event ends. If the event spans multiple days, it should be the end date/time on the last day. This is an ISO 8601 extended format date/time, with or without an offset. Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the event were in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. The portion of the date/time without the offset is considered the "local date/time". This should be the local date/time at the venue. For example, if the event occurs at the 20th hour of June 5th, 2018 at the venue, the local date/time portion should be `2018-06-05T20:00:00`. If the local date/time at the venue is 4 hours before UTC, an offset of `-04:00` may be appended. Without offset information, some rich features may not be available.',
    ).optional(),
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#eventDateTime"`.',
    ).optional(),
    start: z.string().describe(
      'The date/time when the event starts. If the event spans multiple days, it should be the start date/time on the first day. This is an ISO 8601 extended format date/time, with or without an offset. Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the event were in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. The portion of the date/time without the offset is considered the "local date/time". This should be the local date/time at the venue. For example, if the event occurs at the 20th hour of June 5th, 2018 at the venue, the local date/time portion should be `2018-06-05T20:00:00`. If the local date/time at the venue is 4 hours before UTC, an offset of `-04:00` may be appended. Without offset information, some rich features may not be available.',
    ).optional(),
  }).describe("The date & time information of the event.").optional(),
  enableSmartTap: z.boolean().describe(
    "Identifies whether this class supports Smart Tap. The `redemptionIssuers` and object level `smartTapRedemptionLevel` fields must also be set up correctly in order for a pass to support Smart Tap.",
  ).optional(),
  eventId: z.string().describe(
    "The ID of the event. This ID should be unique for every event in an account. It is used to group tickets together if the user has saved multiple tickets for the same event. It can be at most 64 characters. If provided, the grouping will be stable. Be wary of unintentional collision to avoid grouping tickets that should not be grouped. If you use only one class per event, you can simply set this to the `classId` (with or without the issuer ID portion). If not provided, the platform will attempt to use other data to group tickets (potentially unstable).",
  ).optional(),
  eventName: z.object({
    defaultValue: z.object({
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
      ).optional(),
      language: z.string().describe(
        'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
      ).optional(),
      value: z.string().describe("The UTF-8 encoded translated string.")
        .optional(),
    }).describe(
      "Contains the string to be displayed if no appropriate translation is available.",
    ).optional(),
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
  }).describe(
    'Required. The name of the event, such as "LA Dodgers at SF Giants".',
  ).optional(),
  finePrint: z.object({
    defaultValue: z.object({
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
      ).optional(),
      language: z.string().describe(
        'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
      ).optional(),
      value: z.string().describe("The UTF-8 encoded translated string.")
        .optional(),
    }).describe(
      "Contains the string to be displayed if no appropriate translation is available.",
    ).optional(),
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
  }).describe("The fine print, terms, or conditions of the ticket.").optional(),
  gateLabel: z.enum([
    "GATE_LABEL_UNSPECIFIED",
    "GATE",
    "gate",
    "DOOR",
    "door",
    "ENTRANCE",
    "entrance",
  ]).describe(
    'The label to use for the gate value (`eventTicketObject.seatInfo.gate`) on the card detail view. Each available option maps to a set of localized strings, so that translations are shown to the user based on their locale. Both `gateLabel` and `customGateLabel` may not be set. If neither is set, the label will default to "Gate", localized. If the gate field is unset, this label will not be used.',
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
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe("Description of the image used for accessibility.").optional(),
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
        }).describe(
          "Contains the string to be displayed if no appropriate translation is available.",
        ).optional(),
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
      }).describe(
        "Translated strings for the description, which are unused and retained only for backward compatibility.",
      ).optional(),
      uri: z.string().describe(
        "The location of the image. URIs must have a scheme.",
      ).optional(),
    }).describe(
      "A URI for the image. Either this or private_image_id should be set. Requests setting both or neither will be rejected.",
    ).optional(),
  }).describe(
    "Optional banner image displayed on the front of the card. If none is present, nothing will be displayed. The image will display at 100% width.",
  ).optional(),
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
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe(
      "Translated strings for the description. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens.",
    ).optional(),
    uri: z.string().describe(
      "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
    ).optional(),
  }).describe(
    "The URI of your application's home page. Populating the URI in this field results in the exact same behavior as populating an URI in linksModuleData (when an object is rendered, a link to the homepage is shown in what would usually be thought of as the linksModuleData section of the object).",
  ).optional(),
  id: z.string().describe(
    "Required. The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'.",
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
        }).describe(
          "Contains the string to be displayed if no appropriate translation is available.",
        ).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.unknown()).describe(
          "Contains the translations for the string.",
        ).optional(),
      }).describe("Description of the image used for accessibility.")
        .optional(),
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
          defaultValue: z.unknown().describe(
            "Contains the string to be displayed if no appropriate translation is available.",
          ).optional(),
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.unknown().describe(
            "Contains the translations for the string.",
          ).optional(),
        }).describe(
          "Translated strings for the description, which are unused and retained only for backward compatibility.",
        ).optional(),
        uri: z.string().describe(
          "The location of the image. URIs must have a scheme.",
        ).optional(),
      }).describe(
        "A URI for the image. Either this or private_image_id should be set. Requests setting both or neither will be rejected.",
      ).optional(),
    }).describe("A 100% width image.").optional(),
  })).describe(
    "Image module data. The maximum number of these fields displayed is 1 from object level and 1 for class object level.",
  ).optional(),
  infoModuleData: z.object({
    labelValueRows: z.array(z.object({
      columns: z.array(z.object({
        label: z.unknown().describe(
          "The label for a specific row and column. Recommended maximum is 15 characters for a two-column layout and 30 characters for a one-column layout.",
        ).optional(),
        localizedLabel: z.unknown().describe(
          "Translated strings for the label. Recommended maximum is 15 characters for a two-column layout and 30 characters for a one-column layout.",
        ).optional(),
        localizedValue: z.unknown().describe(
          "Translated strings for the value. Recommended maximum is 15 characters for a two-column layout and 30 characters for a one-column layout.",
        ).optional(),
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
  }).describe("Deprecated. Use textModulesData instead.").optional(),
  issuerName: z.string().describe(
    "Required. The issuer name. Recommended maximum length is 20 characters to ensure full string is displayed on smaller screens.",
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
        }).describe(
          "Contains the string to be displayed if no appropriate translation is available.",
        ).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.unknown()).describe(
          "Contains the translations for the string.",
        ).optional(),
      }).describe(
        "Translated strings for the description. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens.",
      ).optional(),
      uri: z.string().describe(
        "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
      ).optional(),
    })).describe("The list of URIs.").optional(),
  }).describe(
    "Links module data. If links module data is also defined on the object, both will be displayed.",
  ).optional(),
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
    }).describe(
      "Contains the string to be displayed if no appropriate translation is available.",
    ).optional(),
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
  }).describe(
    "Translated strings for the issuer_name. Recommended maximum length is 20 characters to ensure full string is displayed on smaller screens.",
  ).optional(),
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
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe("Description of the image used for accessibility.").optional(),
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
        }).describe(
          "Contains the string to be displayed if no appropriate translation is available.",
        ).optional(),
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
      }).describe(
        "Translated strings for the description, which are unused and retained only for backward compatibility.",
      ).optional(),
      uri: z.string().describe(
        "The location of the image. URIs must have a scheme.",
      ).optional(),
    }).describe(
      "A URI for the image. Either this or private_image_id should be set. Requests setting both or neither will be rejected.",
    ).optional(),
  }).describe(
    "The logo image of the ticket. This image is displayed in the card detail view of the app.",
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
        date: z.string().describe(
          "An ISO 8601 extended format date/time. Offset may or may not be required (refer to the parent field's documentation). Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the date/time is intended for a physical location in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. Providing an offset makes this an absolute instant in time around the world. The date/time will be adjusted based on the user's time zone. For example, a time of `2018-06-19T18:30:00-04:00` will be 18:30:00 for a user in New York and 15:30:00 for a user in Los Angeles. Omitting the offset makes this a local date/time, representing several instants in time around the world. The date/time will always be in the user's current time zone. For example, a time of `2018-06-19T18:30:00` will be 18:30:00 for a user in New York and also 18:30:00 for a user in Los Angeles. This is useful when the same local date/time should apply to many physical locations across several time zones.",
        ).optional(),
      }).describe(
        "End time of the interval. Offset is not required. If an offset is provided and `start` time is set, `start` must also include an offset.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#timeInterval"`.',
      ).optional(),
      start: z.object({
        date: z.string().describe(
          "An ISO 8601 extended format date/time. Offset may or may not be required (refer to the parent field's documentation). Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the date/time is intended for a physical location in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. Providing an offset makes this an absolute instant in time around the world. The date/time will be adjusted based on the user's time zone. For example, a time of `2018-06-19T18:30:00-04:00` will be 18:30:00 for a user in New York and 15:30:00 for a user in Los Angeles. Omitting the offset makes this a local date/time, representing several instants in time around the world. The date/time will always be in the user's current time zone. For example, a time of `2018-06-19T18:30:00` will be 18:30:00 for a user in New York and also 18:30:00 for a user in Los Angeles. This is useful when the same local date/time should apply to many physical locations across several time zones.",
        ).optional(),
      }).describe(
        "Start time of the interval. Offset is not required. If an offset is provided and `end` time is set, `end` must also include an offset.",
      ).optional(),
    }).describe(
      "The period of time that the message will be displayed to users. You can define both a `startTime` and `endTime` for each message. A message is displayed immediately after a Wallet Object is inserted unless a `startTime` is set. The message will appear in a list of messages indefinitely if `endTime` is not provided.",
    ).optional(),
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
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe("Translated strings for the message body.").optional(),
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
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe("Translated strings for the message header.").optional(),
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
  redemptionIssuers: z.array(z.string()).describe(
    "Identifies which redemption issuers can redeem the pass over Smart Tap. Redemption issuers are identified by their issuer ID. Redemption issuers must have at least one Smart Tap key configured. The `enableSmartTap` and object level `smartTapRedemptionLevel` fields must also be set up correctly in order for a pass to support Smart Tap.",
  ).optional(),
  review: z.object({
    comments: z.string().optional(),
  }).describe(
    "The review comments set by the platform when a class is marked `approved` or `rejected`.",
  ).optional(),
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
    "Required. The status of the class. This field can be set to `draft` or `underReview` using the insert, patch, or update API calls. Once the review state is changed from `draft` it may not be changed back to `draft`. You should keep this field to `draft` when the class is under development. A `draft` class cannot be used to create any object. You should set this field to `underReview` when you believe the class is ready for use. The platform will automatically set this field to `approved` and it can be immediately used to create or migrate objects. When updating an already `approved` class you should keep setting this field to `underReview`.",
  ).optional(),
  rowLabel: z.enum(["ROW_LABEL_UNSPECIFIED", "ROW", "row"]).describe(
    'The label to use for the row value (`eventTicketObject.seatInfo.row`) on the card detail view. Each available option maps to a set of localized strings, so that translations are shown to the user based on their locale. Both `rowLabel` and `customRowLabel` may not be set. If neither is set, the label will default to "Row", localized. If the row field is unset, this label will not be used.',
  ).optional(),
  seatLabel: z.enum(["SEAT_LABEL_UNSPECIFIED", "SEAT", "seat"]).describe(
    'The label to use for the seat value (`eventTicketObject.seatInfo.seat`) on the card detail view. Each available option maps to a set of localized strings, so that translations are shown to the user based on their locale. Both `seatLabel` and `customSeatLabel` may not be set. If neither is set, the label will default to "Seat", localized. If the seat field is unset, this label will not be used.',
  ).optional(),
  sectionLabel: z.enum([
    "SECTION_LABEL_UNSPECIFIED",
    "SECTION",
    "section",
    "THEATER",
    "theater",
  ]).describe(
    'The label to use for the section value (`eventTicketObject.seatInfo.section`) on the card detail view. Each available option maps to a set of localized strings, so that translations are shown to the user based on their locale. Both `sectionLabel` and `customSectionLabel` may not be set. If neither is set, the label will default to "Section", localized. If the section field is unset, this label will not be used.',
  ).optional(),
  securityAnimation: z.object({
    animationType: z.enum([
      "ANIMATION_UNSPECIFIED",
      "FOIL_SHIMMER",
      "foilShimmer",
    ]).describe("Type of animation.").optional(),
  }).describe(
    "Optional information about the security animation. If this is set a security animation will be rendered on pass details.",
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
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe(
      "Translated strings for the body. Recommended maximum length is 500 characters to ensure full string is displayed on smaller screens.",
    ).optional(),
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
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe(
      "Translated strings for the header. Recommended maximum length is 35 characters to ensure full string is displayed on smaller screens.",
    ).optional(),
  })).describe(
    "Text module data. If text module data is also defined on the class, both will be displayed. The maximum number of these fields displayed is 10 from the object and 10 from the class.",
  ).optional(),
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
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe(
      "Body to be displayed on the module. Character limit is 50 and longer strings will be truncated.",
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
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe(
      "Header to be displayed on the module. Character limit is 60 and longer strings will be truncated.",
    ).optional(),
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
        }).describe(
          "Contains the string to be displayed if no appropriate translation is available.",
        ).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.unknown()).describe(
          "Contains the translations for the string.",
        ).optional(),
      }).describe("Description of the image used for accessibility.")
        .optional(),
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
          defaultValue: z.unknown().describe(
            "Contains the string to be displayed if no appropriate translation is available.",
          ).optional(),
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.unknown().describe(
            "Contains the translations for the string.",
          ).optional(),
        }).describe(
          "Translated strings for the description, which are unused and retained only for backward compatibility.",
        ).optional(),
        uri: z.string().describe(
          "The location of the image. URIs must have a scheme.",
        ).optional(),
      }).describe(
        "A URI for the image. Either this or private_image_id should be set. Requests setting both or neither will be rejected.",
      ).optional(),
    }).describe(
      "Image to be displayed on the module. Recommended image ratio is 1:1. Images will be resized to fit this ratio.",
    ).optional(),
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
        }).describe(
          "End time of the interval. Offset is not required. If an offset is provided and `start` time is set, `start` must also include an offset.",
        ).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#timeInterval"`.',
        ).optional(),
        start: z.object({
          date: z.unknown().describe(
            "An ISO 8601 extended format date/time. Offset may or may not be required (refer to the parent field's documentation). Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the date/time is intended for a physical location in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. Providing an offset makes this an absolute instant in time around the world. The date/time will be adjusted based on the user's time zone. For example, a time of `2018-06-19T18:30:00-04:00` will be 18:30:00 for a user in New York and 15:30:00 for a user in Los Angeles. Omitting the offset makes this a local date/time, representing several instants in time around the world. The date/time will always be in the user's current time zone. For example, a time of `2018-06-19T18:30:00` will be 18:30:00 for a user in New York and also 18:30:00 for a user in Los Angeles. This is useful when the same local date/time should apply to many physical locations across several time zones.",
          ).optional(),
        }).describe(
          "Start time of the interval. Offset is not required. If an offset is provided and `end` time is set, `end` must also include an offset.",
        ).optional(),
      }).describe(
        "The period of time that the module will be displayed to users. Can define both a `startTime` and `endTime`. The module is displayed immediately after insertion unless a `startTime` is set. The module is displayed indefinitely if `endTime` is not set.",
      ).optional(),
    }).describe("Constraints that all must be met for the module to be shown.")
      .optional(),
  })).describe(
    "Optional value added module data. Maximum of fifteen on the class. For a pass only fifteen will be displayed, prioritizing those from the object.",
  ).optional(),
  venue: z.object({
    address: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe(
      'The address of the venue, such as "24 Willie Mays Plaza\\nSan Francisco, CA 94107". Address lines are separated by line feed (`\\n`) characters. This is required.',
    ).optional(),
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#eventVenue"`.',
    ).optional(),
    name: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe('The name of the venue, such as "AT&T Park". This is required.')
      .optional(),
  }).describe("Event venue details.").optional(),
  viewUnlockRequirement: z.enum([
    "VIEW_UNLOCK_REQUIREMENT_UNSPECIFIED",
    "UNLOCK_NOT_REQUIRED",
    "UNLOCK_REQUIRED_TO_VIEW",
  ]).describe("View Unlock Requirement options for the event ticket.")
    .optional(),
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
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe("Description of the image used for accessibility.").optional(),
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
        }).describe(
          "Contains the string to be displayed if no appropriate translation is available.",
        ).optional(),
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
      }).describe(
        "Translated strings for the description, which are unused and retained only for backward compatibility.",
      ).optional(),
      uri: z.string().describe(
        "The location of the image. URIs must have a scheme.",
      ).optional(),
    }).describe(
      "A URI for the image. Either this or private_image_id should be set. Requests setting both or neither will be rejected.",
    ).optional(),
  }).describe(
    "The wide logo of the ticket. When provided, this will be used in place of the logo in the top left of the card view.",
  ).optional(),
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
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe("Description of the image used for accessibility.").optional(),
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
        }).describe(
          "Contains the string to be displayed if no appropriate translation is available.",
        ).optional(),
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
      }).describe(
        "Translated strings for the description, which are unused and retained only for backward compatibility.",
      ).optional(),
      uri: z.string().describe(
        "The location of the image. URIs must have a scheme.",
      ).optional(),
    }).describe(
      "A URI for the image. Either this or private_image_id should be set. Requests setting both or neither will be rejected.",
    ).optional(),
  }).describe("Deprecated.").optional(),
});

const StateSchema = z.object({
  allowMultipleUsersPerObject: z.boolean().optional(),
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
  callbackOptions: z.object({
    updateRequestUrl: z.string(),
    url: z.string(),
  }).optional(),
  classTemplateInfo: z.object({
    cardBarcodeSectionDetails: z.object({
      firstBottomDetail: z.object({
        fieldSelector: z.object({
          fields: z.array(z.unknown()),
        }),
      }),
      firstTopDetail: z.object({
        fieldSelector: z.object({
          fields: z.array(z.unknown()),
        }),
      }),
      secondTopDetail: z.object({
        fieldSelector: z.object({
          fields: z.array(z.unknown()),
        }),
      }),
    }),
    cardTemplateOverride: z.object({
      cardRowTemplateInfos: z.array(z.object({
        oneItem: z.object({
          item: z.unknown(),
        }),
        threeItems: z.object({
          endItem: z.unknown(),
          middleItem: z.unknown(),
          startItem: z.unknown(),
        }),
        twoItems: z.object({
          endItem: z.unknown(),
          startItem: z.unknown(),
        }),
      })),
    }),
    detailsTemplateOverride: z.object({
      detailsItemInfos: z.array(z.object({
        item: z.object({
          firstValue: z.unknown(),
          predefinedItem: z.unknown(),
          secondValue: z.unknown(),
        }),
      })),
    }),
    listTemplateOverride: z.object({
      firstRowOption: z.object({
        fieldOption: z.object({
          fields: z.array(z.unknown()),
        }),
        transitOption: z.string(),
      }),
      secondRowOption: z.object({
        fields: z.array(z.object({
          dateFormat: z.unknown(),
          fieldPath: z.unknown(),
        })),
      }),
      thirdRowOption: z.object({
        fields: z.array(z.object({
          dateFormat: z.unknown(),
          fieldPath: z.unknown(),
        })),
      }),
    }),
  }).optional(),
  confirmationCodeLabel: z.string().optional(),
  countryCode: z.string().optional(),
  customConfirmationCodeLabel: z.object({
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
  customGateLabel: z.object({
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
  customRowLabel: z.object({
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
  customSeatLabel: z.object({
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
  customSectionLabel: z.object({
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
  dateTime: z.object({
    customDoorsOpenLabel: z.object({
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
    doorsOpen: z.string(),
    doorsOpenLabel: z.string(),
    end: z.string(),
    kind: z.string(),
    start: z.string(),
  }).optional(),
  enableSmartTap: z.boolean().optional(),
  eventId: z.string().optional(),
  eventName: z.object({
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
  finePrint: z.object({
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
  gateLabel: z.string().optional(),
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
        kind: z.string(),
        language: z.string(),
        value: z.string(),
      })),
    }),
    uri: z.string(),
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
  issuerName: z.string().optional(),
  kind: z.string().optional(),
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
  }).optional(),
  locations: z.array(z.object({
    kind: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  })).optional(),
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
  multipleDevicesAndHoldersAllowedStatus: z.string().optional(),
  notifyPreference: z.string().optional(),
  redemptionIssuers: z.array(z.string()).optional(),
  review: z.object({
    comments: z.string(),
  }).optional(),
  reviewStatus: z.string().optional(),
  rowLabel: z.string().optional(),
  seatLabel: z.string().optional(),
  sectionLabel: z.string().optional(),
  securityAnimation: z.object({
    animationType: z.string(),
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
  venue: z.object({
    address: z.object({
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
    name: z.object({
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
  }).optional(),
  version: z.string().optional(),
  viewUnlockRequirement: z.string().optional(),
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
  wordMark: z.object({
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
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
          }).describe(
            "Contains the string to be displayed if no appropriate translation is available.",
          ).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).describe("Description of the image used for accessibility.")
          .optional(),
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
            defaultValue: z.unknown().describe(
              "Contains the string to be displayed if no appropriate translation is available.",
            ).optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).describe(
            "Translated strings for the description, which are unused and retained only for backward compatibility.",
          ).optional(),
          uri: z.string().describe(
            "The location of the image. URIs must have a scheme.",
          ).optional(),
        }).describe(
          "A URI for the image. Either this or private_image_id should be set. Requests setting both or neither will be rejected.",
        ).optional(),
      }).describe("Deprecated. Image isn't supported in the app link module.")
        .optional(),
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
            defaultValue: z.unknown().describe(
              "Contains the string to be displayed if no appropriate translation is available.",
            ).optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).describe(
            "Translated strings for the description. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens.",
          ).optional(),
          uri: z.string().describe(
            "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
          ).optional(),
        }).describe(
          "URI for AppTarget. The description on the URI must be set. Prefer setting package field instead, if this target is defined for your application.",
        ).optional(),
      }).describe(
        "Target to follow when opening the app link on clients. It will be used by partners to open their app or webpage.",
      ).optional(),
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
        }).describe(
          "Contains the string to be displayed if no appropriate translation is available.",
        ).optional(),
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
      }).describe(
        "Deprecated. Description isn't supported in the app link module.",
      ).optional(),
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
        }).describe(
          "Contains the string to be displayed if no appropriate translation is available.",
        ).optional(),
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
      }).describe("Deprecated. Title isn't supported in the app link module.")
        .optional(),
    }).describe("Optional information about the partner app link.").optional(),
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
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe(
      "Optional display text for the app link button. Character limit is 30.",
    ).optional(),
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
          }).describe(
            "Contains the string to be displayed if no appropriate translation is available.",
          ).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).describe("Description of the image used for accessibility.")
          .optional(),
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
            defaultValue: z.unknown().describe(
              "Contains the string to be displayed if no appropriate translation is available.",
            ).optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).describe(
            "Translated strings for the description, which are unused and retained only for backward compatibility.",
          ).optional(),
          uri: z.string().describe(
            "The location of the image. URIs must have a scheme.",
          ).optional(),
        }).describe(
          "A URI for the image. Either this or private_image_id should be set. Requests setting both or neither will be rejected.",
        ).optional(),
      }).describe("Deprecated. Image isn't supported in the app link module.")
        .optional(),
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
            defaultValue: z.unknown().describe(
              "Contains the string to be displayed if no appropriate translation is available.",
            ).optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).describe(
            "Translated strings for the description. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens.",
          ).optional(),
          uri: z.string().describe(
            "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
          ).optional(),
        }).describe(
          "URI for AppTarget. The description on the URI must be set. Prefer setting package field instead, if this target is defined for your application.",
        ).optional(),
      }).describe(
        "Target to follow when opening the app link on clients. It will be used by partners to open their app or webpage.",
      ).optional(),
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
        }).describe(
          "Contains the string to be displayed if no appropriate translation is available.",
        ).optional(),
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
      }).describe(
        "Deprecated. Description isn't supported in the app link module.",
      ).optional(),
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
        }).describe(
          "Contains the string to be displayed if no appropriate translation is available.",
        ).optional(),
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
      }).describe("Deprecated. Title isn't supported in the app link module.")
        .optional(),
    }).describe("Deprecated. Links to open iOS apps are not supported.")
      .optional(),
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
          }).describe(
            "Contains the string to be displayed if no appropriate translation is available.",
          ).optional(),
          kind: z.string().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.array(z.unknown()).describe(
            "Contains the translations for the string.",
          ).optional(),
        }).describe("Description of the image used for accessibility.")
          .optional(),
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
            defaultValue: z.unknown().describe(
              "Contains the string to be displayed if no appropriate translation is available.",
            ).optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).describe(
            "Translated strings for the description, which are unused and retained only for backward compatibility.",
          ).optional(),
          uri: z.string().describe(
            "The location of the image. URIs must have a scheme.",
          ).optional(),
        }).describe(
          "A URI for the image. Either this or private_image_id should be set. Requests setting both or neither will be rejected.",
        ).optional(),
      }).describe("Deprecated. Image isn't supported in the app link module.")
        .optional(),
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
            defaultValue: z.unknown().describe(
              "Contains the string to be displayed if no appropriate translation is available.",
            ).optional(),
            kind: z.unknown().describe(
              'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
            ).optional(),
            translatedValues: z.unknown().describe(
              "Contains the translations for the string.",
            ).optional(),
          }).describe(
            "Translated strings for the description. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens.",
          ).optional(),
          uri: z.string().describe(
            "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
          ).optional(),
        }).describe(
          "URI for AppTarget. The description on the URI must be set. Prefer setting package field instead, if this target is defined for your application.",
        ).optional(),
      }).describe(
        "Target to follow when opening the app link on clients. It will be used by partners to open their app or webpage.",
      ).optional(),
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
        }).describe(
          "Contains the string to be displayed if no appropriate translation is available.",
        ).optional(),
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
      }).describe(
        "Deprecated. Description isn't supported in the app link module.",
      ).optional(),
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
        }).describe(
          "Contains the string to be displayed if no appropriate translation is available.",
        ).optional(),
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
      }).describe("Deprecated. Title isn't supported in the app link module.")
        .optional(),
    }).describe("Optional information about the partner web link.").optional(),
  }).describe(
    "Optional app or website link that will be displayed as a button on the front of the pass. If AppLinkData is provided for the corresponding object that will be used instead.",
  ).optional(),
  callbackOptions: z.object({
    updateRequestUrl: z.string().describe(
      "URL for the merchant endpoint that would be called to request updates. The URL should be hosted on HTTPS and robots.txt should allow the URL path to be accessible by UserAgent:Googlebot. Deprecated.",
    ).optional(),
    url: z.string().describe(
      "The HTTPS url configured by the merchant. The URL should be hosted on HTTPS and robots.txt should allow the URL path to be accessible by UserAgent:Googlebot.",
    ).optional(),
  }).describe(
    "Callback options to be used to call the issuer back for every save/delete of an object for this class by the end-user. All objects of this class are eligible for the callback.",
  ).optional(),
  classTemplateInfo: z.object({
    cardBarcodeSectionDetails: z.object({
      firstBottomDetail: z.object({
        fieldSelector: z.object({
          fields: z.array(z.unknown()).describe(
            "If more than one reference is supplied, then the first one that references a non-empty field will be displayed.",
          ).optional(),
        }).describe(
          "A reference to an existing text-based or image field to display.",
        ).optional(),
      }).describe("Optional information to display below the barcode.")
        .optional(),
      firstTopDetail: z.object({
        fieldSelector: z.object({
          fields: z.array(z.unknown()).describe(
            "If more than one reference is supplied, then the first one that references a non-empty field will be displayed.",
          ).optional(),
        }).describe(
          "A reference to an existing text-based or image field to display.",
        ).optional(),
      }).describe(
        "Optional information to display above the barcode. If `secondTopDetail` is defined, this will be displayed to the start side of this detail section.",
      ).optional(),
      secondTopDetail: z.object({
        fieldSelector: z.object({
          fields: z.array(z.unknown()).describe(
            "If more than one reference is supplied, then the first one that references a non-empty field will be displayed.",
          ).optional(),
        }).describe(
          "A reference to an existing text-based or image field to display.",
        ).optional(),
      }).describe(
        "Optional second piece of information to display above the barcode. If `firstTopDetail` is defined, this will be displayed to the end side of this detail section.",
      ).optional(),
    }).describe(
      "Specifies extra information to be displayed above and below the barcode.",
    ).optional(),
    cardTemplateOverride: z.object({
      cardRowTemplateInfos: z.array(z.object({
        oneItem: z.object({
          item: z.unknown().describe(
            "The item to be displayed in the row. This item will be automatically centered.",
          ).optional(),
        }).describe(
          'Template for a row containing one item. Exactly one of "one_item", "two_items", "three_items" must be set.',
        ).optional(),
        threeItems: z.object({
          endItem: z.unknown().describe(
            "The item to be displayed at the end of the row. This item will be aligned to the right.",
          ).optional(),
          middleItem: z.unknown().describe(
            "The item to be displayed in the middle of the row. This item will be centered between the start and end items.",
          ).optional(),
          startItem: z.unknown().describe(
            "The item to be displayed at the start of the row. This item will be aligned to the left.",
          ).optional(),
        }).describe(
          'Template for a row containing three items. Exactly one of "one_item", "two_items", "three_items" must be set.',
        ).optional(),
        twoItems: z.object({
          endItem: z.unknown().describe(
            "The item to be displayed at the end of the row. This item will be aligned to the right.",
          ).optional(),
          startItem: z.unknown().describe(
            "The item to be displayed at the start of the row. This item will be aligned to the left.",
          ).optional(),
        }).describe(
          'Template for a row containing two items. Exactly one of "one_item", "two_items", "three_items" must be set.',
        ).optional(),
      })).describe(
        "Template information for rows in the card view. At most three rows are allowed to be specified.",
      ).optional(),
    }).describe("Override for the card view.").optional(),
    detailsTemplateOverride: z.object({
      detailsItemInfos: z.array(z.object({
        item: z.object({
          firstValue: z.unknown().describe(
            'A reference to a field to display. If both `firstValue` and `secondValue` are populated, they will both appear as one item with a slash between them. For example, values A and B would be shown as "A / B".',
          ).optional(),
          predefinedItem: z.unknown().describe(
            "A predefined item to display. Only one of `firstValue` or `predefinedItem` may be set.",
          ).optional(),
          secondValue: z.unknown().describe(
            "A reference to a field to display. This may only be populated if the `firstValue` field is populated.",
          ).optional(),
        }).describe("The item to be displayed in the details list.").optional(),
      })).describe(
        'Information for the "nth" item displayed in the details list.',
      ).optional(),
    }).describe("Override for the details view (beneath the card view).")
      .optional(),
    listTemplateOverride: z.object({
      firstRowOption: z.object({
        fieldOption: z.object({
          fields: z.array(z.unknown()).describe(
            "If more than one reference is supplied, then the first one that references a non-empty field will be displayed.",
          ).optional(),
        }).describe(
          "A reference to the field to be displayed in the first row.",
        ).optional(),
        transitOption: z.enum([
          "TRANSIT_OPTION_UNSPECIFIED",
          "ORIGIN_AND_DESTINATION_NAMES",
          "originAndDestinationNames",
          "ORIGIN_AND_DESTINATION_CODES",
          "originAndDestinationCodes",
          "ORIGIN_NAME",
          "originName",
        ]).optional(),
      }).describe(
        "Specifies from a predefined set of options or from a reference to the field what will be displayed in the first row. To set this override, set the FirstRowOption.fieldOption to the FieldSelector of your choice.",
      ).optional(),
      secondRowOption: z.object({
        fields: z.array(z.object({
          dateFormat: z.unknown().describe(
            "Only valid if the `fieldPath` references a date field. Chooses how the date field will be formatted and displayed in the UI.",
          ).optional(),
          fieldPath: z.unknown().describe(
            'Path to the field being referenced, prefixed with "object" or "class" and separated with dots. For example, it may be the string "object.purchaseDetails.purchasePrice".',
          ).optional(),
        })).describe(
          "If more than one reference is supplied, then the first one that references a non-empty field will be displayed.",
        ).optional(),
      }).describe(
        "A reference to the field to be displayed in the second row. This option is only displayed if there are not multiple user objects in a group. If there is a group, the second row will always display a field shared by all objects. To set this override, please set secondRowOption to the FieldSelector of you choice.",
      ).optional(),
      thirdRowOption: z.object({
        fields: z.array(z.object({
          dateFormat: z.unknown().describe(
            "Only valid if the `fieldPath` references a date field. Chooses how the date field will be formatted and displayed in the UI.",
          ).optional(),
          fieldPath: z.unknown().describe(
            'Path to the field being referenced, prefixed with "object" or "class" and separated with dots. For example, it may be the string "object.purchaseDetails.purchasePrice".',
          ).optional(),
        })).describe(
          "If more than one reference is supplied, then the first one that references a non-empty field will be displayed.",
        ).optional(),
      }).describe(
        "An unused/deprecated field. Setting it will have no effect on what the user sees.",
      ).optional(),
    }).describe("Override for the passes list view.").optional(),
  }).describe(
    "Template information about how the class should be displayed. If unset, Google will fallback to a default set of fields to display.",
  ).optional(),
  confirmationCodeLabel: z.enum([
    "CONFIRMATION_CODE_LABEL_UNSPECIFIED",
    "CONFIRMATION_CODE",
    "confirmationCode",
    "CONFIRMATION_NUMBER",
    "confirmationNumber",
    "ORDER_NUMBER",
    "orderNumber",
    "RESERVATION_NUMBER",
    "reservationNumber",
  ]).describe(
    'The label to use for the confirmation code value (`eventTicketObject.reservationInfo.confirmationCode`) on the card detail view. Each available option maps to a set of localized strings, so that translations are shown to the user based on their locale. Both `confirmationCodeLabel` and `customConfirmationCodeLabel` may not be set. If neither is set, the label will default to "Confirmation Code", localized. If the confirmation code field is unset, this label will not be used.',
  ).optional(),
  countryCode: z.string().describe(
    "Country code used to display the card's country (when the user is not in that country), as well as to display localized content when content is not available in the user's locale.",
  ).optional(),
  customConfirmationCodeLabel: z.object({
    defaultValue: z.object({
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
      ).optional(),
      language: z.string().describe(
        'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
      ).optional(),
      value: z.string().describe("The UTF-8 encoded translated string.")
        .optional(),
    }).describe(
      "Contains the string to be displayed if no appropriate translation is available.",
    ).optional(),
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
  }).describe(
    'A custom label to use for the confirmation code value (`eventTicketObject.reservationInfo.confirmationCode`) on the card detail view. This should only be used if the default "Confirmation Code" label or one of the `confirmationCodeLabel` options is not sufficient. Both `confirmationCodeLabel` and `customConfirmationCodeLabel` may not be set. If neither is set, the label will default to "Confirmation Code", localized. If the confirmation code field is unset, this label will not be used.',
  ).optional(),
  customGateLabel: z.object({
    defaultValue: z.object({
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
      ).optional(),
      language: z.string().describe(
        'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
      ).optional(),
      value: z.string().describe("The UTF-8 encoded translated string.")
        .optional(),
    }).describe(
      "Contains the string to be displayed if no appropriate translation is available.",
    ).optional(),
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
  }).describe(
    'A custom label to use for the gate value (`eventTicketObject.seatInfo.gate`) on the card detail view. This should only be used if the default "Gate" label or one of the `gateLabel` options is not sufficient. Both `gateLabel` and `customGateLabel` may not be set. If neither is set, the label will default to "Gate", localized. If the gate field is unset, this label will not be used.',
  ).optional(),
  customRowLabel: z.object({
    defaultValue: z.object({
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
      ).optional(),
      language: z.string().describe(
        'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
      ).optional(),
      value: z.string().describe("The UTF-8 encoded translated string.")
        .optional(),
    }).describe(
      "Contains the string to be displayed if no appropriate translation is available.",
    ).optional(),
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
  }).describe(
    'A custom label to use for the row value (`eventTicketObject.seatInfo.row`) on the card detail view. This should only be used if the default "Row" label or one of the `rowLabel` options is not sufficient. Both `rowLabel` and `customRowLabel` may not be set. If neither is set, the label will default to "Row", localized. If the row field is unset, this label will not be used.',
  ).optional(),
  customSeatLabel: z.object({
    defaultValue: z.object({
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
      ).optional(),
      language: z.string().describe(
        'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
      ).optional(),
      value: z.string().describe("The UTF-8 encoded translated string.")
        .optional(),
    }).describe(
      "Contains the string to be displayed if no appropriate translation is available.",
    ).optional(),
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
  }).describe(
    'A custom label to use for the seat value (`eventTicketObject.seatInfo.seat`) on the card detail view. This should only be used if the default "Seat" label or one of the `seatLabel` options is not sufficient. Both `seatLabel` and `customSeatLabel` may not be set. If neither is set, the label will default to "Seat", localized. If the seat field is unset, this label will not be used.',
  ).optional(),
  customSectionLabel: z.object({
    defaultValue: z.object({
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
      ).optional(),
      language: z.string().describe(
        'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
      ).optional(),
      value: z.string().describe("The UTF-8 encoded translated string.")
        .optional(),
    }).describe(
      "Contains the string to be displayed if no appropriate translation is available.",
    ).optional(),
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
  }).describe(
    'A custom label to use for the section value (`eventTicketObject.seatInfo.section`) on the card detail view. This should only be used if the default "Section" label or one of the `sectionLabel` options is not sufficient. Both `sectionLabel` and `customSectionLabel` may not be set. If neither is set, the label will default to "Section", localized. If the section field is unset, this label will not be used.',
  ).optional(),
  dateTime: z.object({
    customDoorsOpenLabel: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe(
      'A custom label to use for the doors open value (`doorsOpen`) on the card detail view. This should only be used if the default "Doors Open" label or one of the `doorsOpenLabel` options is not sufficient. Both `doorsOpenLabel` and `customDoorsOpenLabel` may not be set. If neither is set, the label will default to "Doors Open", localized. If the doors open field is unset, this label will not be used.',
    ).optional(),
    doorsOpen: z.string().describe(
      'The date/time when the doors open at the venue. This is an ISO 8601 extended format date/time, with or without an offset. Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the event were in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. The portion of the date/time without the offset is considered the "local date/time". This should be the local date/time at the venue. For example, if the event occurs at the 20th hour of June 5th, 2018 at the venue, the local date/time portion should be `2018-06-05T20:00:00`. If the local date/time at the venue is 4 hours before UTC, an offset of `-04:00` may be appended. Without offset information, some rich features may not be available.',
    ).optional(),
    doorsOpenLabel: z.enum([
      "DOORS_OPEN_LABEL_UNSPECIFIED",
      "DOORS_OPEN",
      "doorsOpen",
      "GATES_OPEN",
      "gatesOpen",
    ]).describe(
      'The label to use for the doors open value (`doorsOpen`) on the card detail view. Each available option maps to a set of localized strings, so that translations are shown to the user based on their locale. Both `doorsOpenLabel` and `customDoorsOpenLabel` may not be set. If neither is set, the label will default to "Doors Open", localized. If the doors open field is unset, this label will not be used.',
    ).optional(),
    end: z.string().describe(
      'The date/time when the event ends. If the event spans multiple days, it should be the end date/time on the last day. This is an ISO 8601 extended format date/time, with or without an offset. Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the event were in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. The portion of the date/time without the offset is considered the "local date/time". This should be the local date/time at the venue. For example, if the event occurs at the 20th hour of June 5th, 2018 at the venue, the local date/time portion should be `2018-06-05T20:00:00`. If the local date/time at the venue is 4 hours before UTC, an offset of `-04:00` may be appended. Without offset information, some rich features may not be available.',
    ).optional(),
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#eventDateTime"`.',
    ).optional(),
    start: z.string().describe(
      'The date/time when the event starts. If the event spans multiple days, it should be the start date/time on the first day. This is an ISO 8601 extended format date/time, with or without an offset. Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the event were in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. The portion of the date/time without the offset is considered the "local date/time". This should be the local date/time at the venue. For example, if the event occurs at the 20th hour of June 5th, 2018 at the venue, the local date/time portion should be `2018-06-05T20:00:00`. If the local date/time at the venue is 4 hours before UTC, an offset of `-04:00` may be appended. Without offset information, some rich features may not be available.',
    ).optional(),
  }).describe("The date & time information of the event.").optional(),
  enableSmartTap: z.boolean().describe(
    "Identifies whether this class supports Smart Tap. The `redemptionIssuers` and object level `smartTapRedemptionLevel` fields must also be set up correctly in order for a pass to support Smart Tap.",
  ).optional(),
  eventId: z.string().describe(
    "The ID of the event. This ID should be unique for every event in an account. It is used to group tickets together if the user has saved multiple tickets for the same event. It can be at most 64 characters. If provided, the grouping will be stable. Be wary of unintentional collision to avoid grouping tickets that should not be grouped. If you use only one class per event, you can simply set this to the `classId` (with or without the issuer ID portion). If not provided, the platform will attempt to use other data to group tickets (potentially unstable).",
  ).optional(),
  eventName: z.object({
    defaultValue: z.object({
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
      ).optional(),
      language: z.string().describe(
        'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
      ).optional(),
      value: z.string().describe("The UTF-8 encoded translated string.")
        .optional(),
    }).describe(
      "Contains the string to be displayed if no appropriate translation is available.",
    ).optional(),
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
  }).describe(
    'Required. The name of the event, such as "LA Dodgers at SF Giants".',
  ).optional(),
  finePrint: z.object({
    defaultValue: z.object({
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
      ).optional(),
      language: z.string().describe(
        'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
      ).optional(),
      value: z.string().describe("The UTF-8 encoded translated string.")
        .optional(),
    }).describe(
      "Contains the string to be displayed if no appropriate translation is available.",
    ).optional(),
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
  }).describe("The fine print, terms, or conditions of the ticket.").optional(),
  gateLabel: z.enum([
    "GATE_LABEL_UNSPECIFIED",
    "GATE",
    "gate",
    "DOOR",
    "door",
    "ENTRANCE",
    "entrance",
  ]).describe(
    'The label to use for the gate value (`eventTicketObject.seatInfo.gate`) on the card detail view. Each available option maps to a set of localized strings, so that translations are shown to the user based on their locale. Both `gateLabel` and `customGateLabel` may not be set. If neither is set, the label will default to "Gate", localized. If the gate field is unset, this label will not be used.',
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
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe("Description of the image used for accessibility.").optional(),
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
        }).describe(
          "Contains the string to be displayed if no appropriate translation is available.",
        ).optional(),
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
      }).describe(
        "Translated strings for the description, which are unused and retained only for backward compatibility.",
      ).optional(),
      uri: z.string().describe(
        "The location of the image. URIs must have a scheme.",
      ).optional(),
    }).describe(
      "A URI for the image. Either this or private_image_id should be set. Requests setting both or neither will be rejected.",
    ).optional(),
  }).describe(
    "Optional banner image displayed on the front of the card. If none is present, nothing will be displayed. The image will display at 100% width.",
  ).optional(),
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
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe(
      "Translated strings for the description. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens.",
    ).optional(),
    uri: z.string().describe(
      "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
    ).optional(),
  }).describe(
    "The URI of your application's home page. Populating the URI in this field results in the exact same behavior as populating an URI in linksModuleData (when an object is rendered, a link to the homepage is shown in what would usually be thought of as the linksModuleData section of the object).",
  ).optional(),
  id: z.string().describe(
    "Required. The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'.",
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
        }).describe(
          "Contains the string to be displayed if no appropriate translation is available.",
        ).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.unknown()).describe(
          "Contains the translations for the string.",
        ).optional(),
      }).describe("Description of the image used for accessibility.")
        .optional(),
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
          defaultValue: z.unknown().describe(
            "Contains the string to be displayed if no appropriate translation is available.",
          ).optional(),
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.unknown().describe(
            "Contains the translations for the string.",
          ).optional(),
        }).describe(
          "Translated strings for the description, which are unused and retained only for backward compatibility.",
        ).optional(),
        uri: z.string().describe(
          "The location of the image. URIs must have a scheme.",
        ).optional(),
      }).describe(
        "A URI for the image. Either this or private_image_id should be set. Requests setting both or neither will be rejected.",
      ).optional(),
    }).describe("A 100% width image.").optional(),
  })).describe(
    "Image module data. The maximum number of these fields displayed is 1 from object level and 1 for class object level.",
  ).optional(),
  infoModuleData: z.object({
    labelValueRows: z.array(z.object({
      columns: z.array(z.object({
        label: z.unknown().describe(
          "The label for a specific row and column. Recommended maximum is 15 characters for a two-column layout and 30 characters for a one-column layout.",
        ).optional(),
        localizedLabel: z.unknown().describe(
          "Translated strings for the label. Recommended maximum is 15 characters for a two-column layout and 30 characters for a one-column layout.",
        ).optional(),
        localizedValue: z.unknown().describe(
          "Translated strings for the value. Recommended maximum is 15 characters for a two-column layout and 30 characters for a one-column layout.",
        ).optional(),
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
  }).describe("Deprecated. Use textModulesData instead.").optional(),
  issuerName: z.string().describe(
    "Required. The issuer name. Recommended maximum length is 20 characters to ensure full string is displayed on smaller screens.",
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
        }).describe(
          "Contains the string to be displayed if no appropriate translation is available.",
        ).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.unknown()).describe(
          "Contains the translations for the string.",
        ).optional(),
      }).describe(
        "Translated strings for the description. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens.",
      ).optional(),
      uri: z.string().describe(
        "The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.",
      ).optional(),
    })).describe("The list of URIs.").optional(),
  }).describe(
    "Links module data. If links module data is also defined on the object, both will be displayed.",
  ).optional(),
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
    }).describe(
      "Contains the string to be displayed if no appropriate translation is available.",
    ).optional(),
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
  }).describe(
    "Translated strings for the issuer_name. Recommended maximum length is 20 characters to ensure full string is displayed on smaller screens.",
  ).optional(),
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
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe("Description of the image used for accessibility.").optional(),
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
        }).describe(
          "Contains the string to be displayed if no appropriate translation is available.",
        ).optional(),
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
      }).describe(
        "Translated strings for the description, which are unused and retained only for backward compatibility.",
      ).optional(),
      uri: z.string().describe(
        "The location of the image. URIs must have a scheme.",
      ).optional(),
    }).describe(
      "A URI for the image. Either this or private_image_id should be set. Requests setting both or neither will be rejected.",
    ).optional(),
  }).describe(
    "The logo image of the ticket. This image is displayed in the card detail view of the app.",
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
        date: z.string().describe(
          "An ISO 8601 extended format date/time. Offset may or may not be required (refer to the parent field's documentation). Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the date/time is intended for a physical location in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. Providing an offset makes this an absolute instant in time around the world. The date/time will be adjusted based on the user's time zone. For example, a time of `2018-06-19T18:30:00-04:00` will be 18:30:00 for a user in New York and 15:30:00 for a user in Los Angeles. Omitting the offset makes this a local date/time, representing several instants in time around the world. The date/time will always be in the user's current time zone. For example, a time of `2018-06-19T18:30:00` will be 18:30:00 for a user in New York and also 18:30:00 for a user in Los Angeles. This is useful when the same local date/time should apply to many physical locations across several time zones.",
        ).optional(),
      }).describe(
        "End time of the interval. Offset is not required. If an offset is provided and `start` time is set, `start` must also include an offset.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#timeInterval"`.',
      ).optional(),
      start: z.object({
        date: z.string().describe(
          "An ISO 8601 extended format date/time. Offset may or may not be required (refer to the parent field's documentation). Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the date/time is intended for a physical location in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. Providing an offset makes this an absolute instant in time around the world. The date/time will be adjusted based on the user's time zone. For example, a time of `2018-06-19T18:30:00-04:00` will be 18:30:00 for a user in New York and 15:30:00 for a user in Los Angeles. Omitting the offset makes this a local date/time, representing several instants in time around the world. The date/time will always be in the user's current time zone. For example, a time of `2018-06-19T18:30:00` will be 18:30:00 for a user in New York and also 18:30:00 for a user in Los Angeles. This is useful when the same local date/time should apply to many physical locations across several time zones.",
        ).optional(),
      }).describe(
        "Start time of the interval. Offset is not required. If an offset is provided and `end` time is set, `end` must also include an offset.",
      ).optional(),
    }).describe(
      "The period of time that the message will be displayed to users. You can define both a `startTime` and `endTime` for each message. A message is displayed immediately after a Wallet Object is inserted unless a `startTime` is set. The message will appear in a list of messages indefinitely if `endTime` is not provided.",
    ).optional(),
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
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe("Translated strings for the message body.").optional(),
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
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe("Translated strings for the message header.").optional(),
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
  redemptionIssuers: z.array(z.string()).describe(
    "Identifies which redemption issuers can redeem the pass over Smart Tap. Redemption issuers are identified by their issuer ID. Redemption issuers must have at least one Smart Tap key configured. The `enableSmartTap` and object level `smartTapRedemptionLevel` fields must also be set up correctly in order for a pass to support Smart Tap.",
  ).optional(),
  review: z.object({
    comments: z.string().optional(),
  }).describe(
    "The review comments set by the platform when a class is marked `approved` or `rejected`.",
  ).optional(),
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
    "Required. The status of the class. This field can be set to `draft` or `underReview` using the insert, patch, or update API calls. Once the review state is changed from `draft` it may not be changed back to `draft`. You should keep this field to `draft` when the class is under development. A `draft` class cannot be used to create any object. You should set this field to `underReview` when you believe the class is ready for use. The platform will automatically set this field to `approved` and it can be immediately used to create or migrate objects. When updating an already `approved` class you should keep setting this field to `underReview`.",
  ).optional(),
  rowLabel: z.enum(["ROW_LABEL_UNSPECIFIED", "ROW", "row"]).describe(
    'The label to use for the row value (`eventTicketObject.seatInfo.row`) on the card detail view. Each available option maps to a set of localized strings, so that translations are shown to the user based on their locale. Both `rowLabel` and `customRowLabel` may not be set. If neither is set, the label will default to "Row", localized. If the row field is unset, this label will not be used.',
  ).optional(),
  seatLabel: z.enum(["SEAT_LABEL_UNSPECIFIED", "SEAT", "seat"]).describe(
    'The label to use for the seat value (`eventTicketObject.seatInfo.seat`) on the card detail view. Each available option maps to a set of localized strings, so that translations are shown to the user based on their locale. Both `seatLabel` and `customSeatLabel` may not be set. If neither is set, the label will default to "Seat", localized. If the seat field is unset, this label will not be used.',
  ).optional(),
  sectionLabel: z.enum([
    "SECTION_LABEL_UNSPECIFIED",
    "SECTION",
    "section",
    "THEATER",
    "theater",
  ]).describe(
    'The label to use for the section value (`eventTicketObject.seatInfo.section`) on the card detail view. Each available option maps to a set of localized strings, so that translations are shown to the user based on their locale. Both `sectionLabel` and `customSectionLabel` may not be set. If neither is set, the label will default to "Section", localized. If the section field is unset, this label will not be used.',
  ).optional(),
  securityAnimation: z.object({
    animationType: z.enum([
      "ANIMATION_UNSPECIFIED",
      "FOIL_SHIMMER",
      "foilShimmer",
    ]).describe("Type of animation.").optional(),
  }).describe(
    "Optional information about the security animation. If this is set a security animation will be rendered on pass details.",
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
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe(
      "Translated strings for the body. Recommended maximum length is 500 characters to ensure full string is displayed on smaller screens.",
    ).optional(),
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
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe(
      "Translated strings for the header. Recommended maximum length is 35 characters to ensure full string is displayed on smaller screens.",
    ).optional(),
  })).describe(
    "Text module data. If text module data is also defined on the class, both will be displayed. The maximum number of these fields displayed is 10 from the object and 10 from the class.",
  ).optional(),
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
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe(
      "Body to be displayed on the module. Character limit is 50 and longer strings will be truncated.",
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
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe(
      "Header to be displayed on the module. Character limit is 60 and longer strings will be truncated.",
    ).optional(),
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
        }).describe(
          "Contains the string to be displayed if no appropriate translation is available.",
        ).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
        ).optional(),
        translatedValues: z.array(z.unknown()).describe(
          "Contains the translations for the string.",
        ).optional(),
      }).describe("Description of the image used for accessibility.")
        .optional(),
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
          defaultValue: z.unknown().describe(
            "Contains the string to be displayed if no appropriate translation is available.",
          ).optional(),
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`.',
          ).optional(),
          translatedValues: z.unknown().describe(
            "Contains the translations for the string.",
          ).optional(),
        }).describe(
          "Translated strings for the description, which are unused and retained only for backward compatibility.",
        ).optional(),
        uri: z.string().describe(
          "The location of the image. URIs must have a scheme.",
        ).optional(),
      }).describe(
        "A URI for the image. Either this or private_image_id should be set. Requests setting both or neither will be rejected.",
      ).optional(),
    }).describe(
      "Image to be displayed on the module. Recommended image ratio is 1:1. Images will be resized to fit this ratio.",
    ).optional(),
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
        }).describe(
          "End time of the interval. Offset is not required. If an offset is provided and `start` time is set, `start` must also include an offset.",
        ).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#timeInterval"`.',
        ).optional(),
        start: z.object({
          date: z.unknown().describe(
            "An ISO 8601 extended format date/time. Offset may or may not be required (refer to the parent field's documentation). Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the date/time is intended for a physical location in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. Providing an offset makes this an absolute instant in time around the world. The date/time will be adjusted based on the user's time zone. For example, a time of `2018-06-19T18:30:00-04:00` will be 18:30:00 for a user in New York and 15:30:00 for a user in Los Angeles. Omitting the offset makes this a local date/time, representing several instants in time around the world. The date/time will always be in the user's current time zone. For example, a time of `2018-06-19T18:30:00` will be 18:30:00 for a user in New York and also 18:30:00 for a user in Los Angeles. This is useful when the same local date/time should apply to many physical locations across several time zones.",
          ).optional(),
        }).describe(
          "Start time of the interval. Offset is not required. If an offset is provided and `end` time is set, `end` must also include an offset.",
        ).optional(),
      }).describe(
        "The period of time that the module will be displayed to users. Can define both a `startTime` and `endTime`. The module is displayed immediately after insertion unless a `startTime` is set. The module is displayed indefinitely if `endTime` is not set.",
      ).optional(),
    }).describe("Constraints that all must be met for the module to be shown.")
      .optional(),
  })).describe(
    "Optional value added module data. Maximum of fifteen on the class. For a pass only fifteen will be displayed, prioritizing those from the object.",
  ).optional(),
  venue: z.object({
    address: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe(
      'The address of the venue, such as "24 Willie Mays Plaza\\nSan Francisco, CA 94107". Address lines are separated by line feed (`\\n`) characters. This is required.',
    ).optional(),
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#eventVenue"`.',
    ).optional(),
    name: z.object({
      defaultValue: z.object({
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`.',
        ).optional(),
        language: z.string().describe(
          'Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".',
        ).optional(),
        value: z.string().describe("The UTF-8 encoded translated string.")
          .optional(),
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe('The name of the venue, such as "AT&T Park". This is required.')
      .optional(),
  }).describe("Event venue details.").optional(),
  viewUnlockRequirement: z.enum([
    "VIEW_UNLOCK_REQUIREMENT_UNSPECIFIED",
    "UNLOCK_NOT_REQUIRED",
    "UNLOCK_REQUIRED_TO_VIEW",
  ]).describe("View Unlock Requirement options for the event ticket.")
    .optional(),
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
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe("Description of the image used for accessibility.").optional(),
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
        }).describe(
          "Contains the string to be displayed if no appropriate translation is available.",
        ).optional(),
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
      }).describe(
        "Translated strings for the description, which are unused and retained only for backward compatibility.",
      ).optional(),
      uri: z.string().describe(
        "The location of the image. URIs must have a scheme.",
      ).optional(),
    }).describe(
      "A URI for the image. Either this or private_image_id should be set. Requests setting both or neither will be rejected.",
    ).optional(),
  }).describe(
    "The wide logo of the ticket. When provided, this will be used in place of the logo in the top left of the card view.",
  ).optional(),
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
      }).describe(
        "Contains the string to be displayed if no appropriate translation is available.",
      ).optional(),
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
    }).describe("Description of the image used for accessibility.").optional(),
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
        }).describe(
          "Contains the string to be displayed if no appropriate translation is available.",
        ).optional(),
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
      }).describe(
        "Translated strings for the description, which are unused and retained only for backward compatibility.",
      ).optional(),
      uri: z.string().describe(
        "The location of the image. URIs must have a scheme.",
      ).optional(),
    }).describe(
      "A URI for the image. Either this or private_image_id should be set. Requests setting both or neither will be rejected.",
    ).optional(),
  }).describe("Deprecated.").optional(),
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

/** Swamp extension model for Google Cloud Google Wallet Eventticketclass. Registered at `@swamp/gcp/walletobjects/eventticketclass`. */
export const model = {
  type: "@swamp/gcp/walletobjects/eventticketclass",
  version: "2026.09.29.1",
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
    {
      toVersion: "2026.07.17.1",
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
      toVersion: "2026.09.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Returns the event ticket class with the given class ID.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a eventticketclass",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["appLinkData"] !== undefined) {
          body["appLinkData"] = g["appLinkData"];
        }
        if (g["callbackOptions"] !== undefined) {
          body["callbackOptions"] = g["callbackOptions"];
        }
        if (g["classTemplateInfo"] !== undefined) {
          body["classTemplateInfo"] = g["classTemplateInfo"];
        }
        if (g["confirmationCodeLabel"] !== undefined) {
          body["confirmationCodeLabel"] = g["confirmationCodeLabel"];
        }
        if (g["countryCode"] !== undefined) {
          body["countryCode"] = g["countryCode"];
        }
        if (g["customConfirmationCodeLabel"] !== undefined) {
          body["customConfirmationCodeLabel"] =
            g["customConfirmationCodeLabel"];
        }
        if (g["customGateLabel"] !== undefined) {
          body["customGateLabel"] = g["customGateLabel"];
        }
        if (g["customRowLabel"] !== undefined) {
          body["customRowLabel"] = g["customRowLabel"];
        }
        if (g["customSeatLabel"] !== undefined) {
          body["customSeatLabel"] = g["customSeatLabel"];
        }
        if (g["customSectionLabel"] !== undefined) {
          body["customSectionLabel"] = g["customSectionLabel"];
        }
        if (g["dateTime"] !== undefined) body["dateTime"] = g["dateTime"];
        if (g["enableSmartTap"] !== undefined) {
          body["enableSmartTap"] = g["enableSmartTap"];
        }
        if (g["eventId"] !== undefined) body["eventId"] = g["eventId"];
        if (g["eventName"] !== undefined) body["eventName"] = g["eventName"];
        if (g["finePrint"] !== undefined) body["finePrint"] = g["finePrint"];
        if (g["gateLabel"] !== undefined) body["gateLabel"] = g["gateLabel"];
        if (g["heroImage"] !== undefined) body["heroImage"] = g["heroImage"];
        if (g["hexBackgroundColor"] !== undefined) {
          body["hexBackgroundColor"] = g["hexBackgroundColor"];
        }
        if (g["homepageUri"] !== undefined) {
          body["homepageUri"] = g["homepageUri"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["imageModulesData"] !== undefined) {
          body["imageModulesData"] = g["imageModulesData"];
        }
        if (g["infoModuleData"] !== undefined) {
          body["infoModuleData"] = g["infoModuleData"];
        }
        if (g["issuerName"] !== undefined) body["issuerName"] = g["issuerName"];
        if (g["linksModuleData"] !== undefined) {
          body["linksModuleData"] = g["linksModuleData"];
        }
        if (g["localizedIssuerName"] !== undefined) {
          body["localizedIssuerName"] = g["localizedIssuerName"];
        }
        if (g["logo"] !== undefined) body["logo"] = g["logo"];
        if (g["merchantLocations"] !== undefined) {
          body["merchantLocations"] = g["merchantLocations"];
        }
        if (g["messages"] !== undefined) body["messages"] = g["messages"];
        if (g["multipleDevicesAndHoldersAllowedStatus"] !== undefined) {
          body["multipleDevicesAndHoldersAllowedStatus"] =
            g["multipleDevicesAndHoldersAllowedStatus"];
        }
        if (g["notifyPreference"] !== undefined) {
          body["notifyPreference"] = g["notifyPreference"];
        }
        if (g["redemptionIssuers"] !== undefined) {
          body["redemptionIssuers"] = g["redemptionIssuers"];
        }
        if (g["review"] !== undefined) body["review"] = g["review"];
        if (g["reviewStatus"] !== undefined) {
          body["reviewStatus"] = g["reviewStatus"];
        }
        if (g["rowLabel"] !== undefined) body["rowLabel"] = g["rowLabel"];
        if (g["seatLabel"] !== undefined) body["seatLabel"] = g["seatLabel"];
        if (g["sectionLabel"] !== undefined) {
          body["sectionLabel"] = g["sectionLabel"];
        }
        if (g["securityAnimation"] !== undefined) {
          body["securityAnimation"] = g["securityAnimation"];
        }
        if (g["textModulesData"] !== undefined) {
          body["textModulesData"] = g["textModulesData"];
        }
        if (g["valueAddedModuleData"] !== undefined) {
          body["valueAddedModuleData"] = g["valueAddedModuleData"];
        }
        if (g["venue"] !== undefined) body["venue"] = g["venue"];
        if (g["viewUnlockRequirement"] !== undefined) {
          body["viewUnlockRequirement"] = g["viewUnlockRequirement"];
        }
        if (g["wideLogo"] !== undefined) body["wideLogo"] = g["wideLogo"];
        if (g["wordMark"] !== undefined) body["wordMark"] = g["wordMark"];
        if (g["id"] !== undefined) params["resourceId"] = String(g["id"]);
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {},
            matchField: "id",
            matchValue: String(g["id"] ?? ""),
          },
          credentials,
        ) as StateData;
        const instanceName = ((g.id ?? result.id)?.toString() ?? "current")
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
      description: "Get a eventticketclass",
      arguments: z.object({
        identifier: z.string().describe("The id of the eventticketclass"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["resourceId"] = args.identifier;
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((g.id ?? result.id)?.toString() ?? args.identifier).replace(
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
      description: "Update eventticketclass attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific eventticketclass by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName = (g.id?.toString() ?? args.identifier ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
        params["resourceId"] = existing["id"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["appLinkData"] !== undefined) {
          body["appLinkData"] = g["appLinkData"];
        }
        if (g["callbackOptions"] !== undefined) {
          body["callbackOptions"] = g["callbackOptions"];
        }
        if (g["classTemplateInfo"] !== undefined) {
          body["classTemplateInfo"] = g["classTemplateInfo"];
        }
        if (g["confirmationCodeLabel"] !== undefined) {
          body["confirmationCodeLabel"] = g["confirmationCodeLabel"];
        }
        if (g["countryCode"] !== undefined) {
          body["countryCode"] = g["countryCode"];
        }
        if (g["customConfirmationCodeLabel"] !== undefined) {
          body["customConfirmationCodeLabel"] =
            g["customConfirmationCodeLabel"];
        }
        if (g["customGateLabel"] !== undefined) {
          body["customGateLabel"] = g["customGateLabel"];
        }
        if (g["customRowLabel"] !== undefined) {
          body["customRowLabel"] = g["customRowLabel"];
        }
        if (g["customSeatLabel"] !== undefined) {
          body["customSeatLabel"] = g["customSeatLabel"];
        }
        if (g["customSectionLabel"] !== undefined) {
          body["customSectionLabel"] = g["customSectionLabel"];
        }
        if (g["dateTime"] !== undefined) body["dateTime"] = g["dateTime"];
        if (g["enableSmartTap"] !== undefined) {
          body["enableSmartTap"] = g["enableSmartTap"];
        }
        if (g["eventId"] !== undefined) body["eventId"] = g["eventId"];
        if (g["eventName"] !== undefined) body["eventName"] = g["eventName"];
        if (g["finePrint"] !== undefined) body["finePrint"] = g["finePrint"];
        if (g["gateLabel"] !== undefined) body["gateLabel"] = g["gateLabel"];
        if (g["heroImage"] !== undefined) body["heroImage"] = g["heroImage"];
        if (g["hexBackgroundColor"] !== undefined) {
          body["hexBackgroundColor"] = g["hexBackgroundColor"];
        }
        if (g["homepageUri"] !== undefined) {
          body["homepageUri"] = g["homepageUri"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["imageModulesData"] !== undefined) {
          body["imageModulesData"] = g["imageModulesData"];
        }
        if (g["infoModuleData"] !== undefined) {
          body["infoModuleData"] = g["infoModuleData"];
        }
        if (g["issuerName"] !== undefined) body["issuerName"] = g["issuerName"];
        if (g["linksModuleData"] !== undefined) {
          body["linksModuleData"] = g["linksModuleData"];
        }
        if (g["localizedIssuerName"] !== undefined) {
          body["localizedIssuerName"] = g["localizedIssuerName"];
        }
        if (g["logo"] !== undefined) body["logo"] = g["logo"];
        if (g["merchantLocations"] !== undefined) {
          body["merchantLocations"] = g["merchantLocations"];
        }
        if (g["messages"] !== undefined) body["messages"] = g["messages"];
        if (g["multipleDevicesAndHoldersAllowedStatus"] !== undefined) {
          body["multipleDevicesAndHoldersAllowedStatus"] =
            g["multipleDevicesAndHoldersAllowedStatus"];
        }
        if (g["notifyPreference"] !== undefined) {
          body["notifyPreference"] = g["notifyPreference"];
        }
        if (g["redemptionIssuers"] !== undefined) {
          body["redemptionIssuers"] = g["redemptionIssuers"];
        }
        if (g["review"] !== undefined) body["review"] = g["review"];
        if (g["reviewStatus"] !== undefined) {
          body["reviewStatus"] = g["reviewStatus"];
        }
        if (g["rowLabel"] !== undefined) body["rowLabel"] = g["rowLabel"];
        if (g["seatLabel"] !== undefined) body["seatLabel"] = g["seatLabel"];
        if (g["sectionLabel"] !== undefined) {
          body["sectionLabel"] = g["sectionLabel"];
        }
        if (g["securityAnimation"] !== undefined) {
          body["securityAnimation"] = g["securityAnimation"];
        }
        if (g["textModulesData"] !== undefined) {
          body["textModulesData"] = g["textModulesData"];
        }
        if (g["valueAddedModuleData"] !== undefined) {
          body["valueAddedModuleData"] = g["valueAddedModuleData"];
        }
        if (g["venue"] !== undefined) body["venue"] = g["venue"];
        if (g["viewUnlockRequirement"] !== undefined) {
          body["viewUnlockRequirement"] = g["viewUnlockRequirement"];
        }
        if (g["wideLogo"] !== undefined) body["wideLogo"] = g["wideLogo"];
        if (g["wordMark"] !== undefined) body["wordMark"] = g["wordMark"];
        let live: Record<string, unknown> | undefined;
        const unset = [
          "appLinkData",
          "callbackOptions",
          "classTemplateInfo",
          "confirmationCodeLabel",
          "countryCode",
          "customConfirmationCodeLabel",
          "customGateLabel",
          "customRowLabel",
          "customSeatLabel",
          "customSectionLabel",
          "dateTime",
          "enableSmartTap",
          "eventId",
          "eventName",
          "finePrint",
          "gateLabel",
          "heroImage",
          "hexBackgroundColor",
          "homepageUri",
          "id",
          "imageModulesData",
          "infoModuleData",
          "issuerName",
          "linksModuleData",
          "localizedIssuerName",
          "logo",
          "merchantLocations",
          "messages",
          "multipleDevicesAndHoldersAllowedStatus",
          "notifyPreference",
          "redemptionIssuers",
          "review",
          "reviewStatus",
          "rowLabel",
          "seatLabel",
          "sectionLabel",
          "securityAnimation",
          "textModulesData",
          "valueAddedModuleData",
          "venue",
          "viewUnlockRequirement",
          "wideLogo",
          "wordMark",
        ].filter((k) => body[k] === undefined);
        if (unset.length > 0) {
          live = await readResource(
            baseUrl,
            GET_CONFIG,
            params,
            credentials,
          ) as Record<string, unknown>;
          for (const k of unset) {
            if (live[k] !== undefined && live[k] !== null) body[k] = live[k];
          }
        }
        const concurrency: Record<string, unknown> = live ?? existing;
        for (const key of Object.keys(concurrency)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = concurrency[key];
          }
        }
        const result = await updateResource(
          baseUrl,
          UPDATE_CONFIG,
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
    sync: {
      description: "Sync eventticketclass state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific eventticketclass by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName = (g.id?.toString() ?? args.identifier ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
          const identifier = existing.id?.toString() ?? g["id"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["resourceId"] = identifier;
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
    list: {
      description: "List eventticketclass resources",
      arguments: z.object({
        issuerId: z.string().describe(
          "The ID of the issuer authorized to list classes.",
        ).optional(),
        maxResults: z.number().describe(
          "Identifies the max number of results returned by a list. All results are returned if `maxResults` isn't defined.",
        ).optional(),
        token: z.string().describe(
          "Used to get the next set of results if `maxResults` is specified, but more than `maxResults` classes are available in a list. For example, if you have a list of 200 classes and you call list with `maxResults` set to 20, list will return the first 20 classes and a token. Call list again with `maxResults` set to 20 and the token to get the next 20 classes.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (args["issuerId"] !== undefined) {
          params["issuerId"] = String(args["issuerId"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["token"] !== undefined) {
          params["token"] = String(args["token"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "resources",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.id?.toString() ?? String(i)).replace(
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
    addmessage: {
      description: "addmessage",
      arguments: z.object({
        message: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          baseUrl,
          {
            "id": "walletobjects.eventticketclass.addmessage",
            "path": "walletobjects/v1/eventTicketClass/{resourceId}/addMessage",
            "httpMethod": "POST",
            "parameterOrder": ["resourceId"],
            "parameters": {
              "resourceId": { "location": "path", "required": true },
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
