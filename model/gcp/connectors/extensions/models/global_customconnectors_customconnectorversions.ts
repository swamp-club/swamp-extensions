// Auto-generated extension model for @swamp/gcp/connectors/global-customconnectors-customconnectorversions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Connectors Global.CustomConnectors.CustomConnectorVersions.
 *
 * CustomConnectorVersion indicates a specific version of a connector.
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/customConnectorVersions/${shortName}`;
}

const BASE_URL = "https://connectors.googleapis.com/";

const GET_CONFIG = {
  "id":
    "connectors.projects.locations.global.customConnectors.customConnectorVersions.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
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
  "id":
    "connectors.projects.locations.global.customConnectors.customConnectorVersions.create",
  "path": "v1/{+parent}/customConnectorVersions",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "customConnectorVersionId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id":
    "connectors.projects.locations.global.customConnectors.customConnectorVersions.list",
  "path": "v1/{+parent}/customConnectorVersions",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
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
  asyncOperationsSupport: z.boolean().describe(
    "Optional. Indicates if Async Operations/Connector Job is supported. This is only available for SDK based custom connectors.",
  ).optional(),
  authConfig: z.object({
    additionalVariables: z.array(z.object({
      boolValue: z.boolean().describe("Optional. Value is a bool.").optional(),
      encryptionKeyValue: z.object({
        kmsKeyName: z.string().describe(
          "Optional. The [KMS key name] with which the content of the Operation is encrypted. The expected format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`. Will be empty string if google managed.",
        ).optional(),
        type: z.enum(["TYPE_UNSPECIFIED", "GOOGLE_MANAGED", "CUSTOMER_MANAGED"])
          .describe("Optional. Specifies the type of the encryption key.")
          .optional(),
      }).describe("Encryption Key value.").optional(),
      intValue: z.string().describe("Optional. Value is an integer").optional(),
      key: z.string().describe("Optional. Key of the config variable.")
        .optional(),
      secretValue: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Secret provides a reference to entries in Secret Manager.")
        .optional(),
      stringValue: z.string().describe("Optional. Value is a string.")
        .optional(),
    })).describe("Optional. List containing additional auth configs.")
      .optional(),
    authKey: z.string().describe("Optional. Identifier key for auth config")
      .optional(),
    authType: z.enum([
      "AUTH_TYPE_UNSPECIFIED",
      "USER_PASSWORD",
      "OAUTH2_JWT_BEARER",
      "OAUTH2_CLIENT_CREDENTIALS",
      "SSH_PUBLIC_KEY",
      "OAUTH2_AUTH_CODE_FLOW",
      "GOOGLE_AUTHENTICATION",
      "OAUTH2_AUTH_CODE_FLOW_GOOGLE_MANAGED",
    ]).describe("Optional. The type of authentication configured.").optional(),
    oauth2AuthCodeFlow: z.object({
      authCode: z.string().describe(
        "Optional. Authorization code to be exchanged for access and refresh tokens.",
      ).optional(),
      authUri: z.string().describe(
        "Optional. Auth URL for Authorization Code Flow",
      ).optional(),
      clientId: z.string().describe(
        "Optional. Client ID for user-provided OAuth app.",
      ).optional(),
      clientSecret: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Secret provides a reference to entries in Secret Manager.")
        .optional(),
      enablePkce: z.boolean().describe(
        "Optional. Whether to enable PKCE when the user performs the auth code flow.",
      ).optional(),
      pkceVerifier: z.string().describe(
        "Optional. PKCE verifier to be used during the auth code exchange.",
      ).optional(),
      redirectUri: z.string().describe(
        "Optional. Redirect URI to be provided during the auth code exchange.",
      ).optional(),
      scopes: z.array(z.string()).describe(
        "Optional. Scopes the connection will request when the user performs the auth code flow.",
      ).optional(),
    }).describe(
      "Parameters to support Oauth 2.0 Auth Code Grant Authentication. See https://www.rfc-editor.org/rfc/rfc6749#section-1.3.1 for more details.",
    ).optional(),
    oauth2AuthCodeFlowGoogleManaged: z.object({
      authCode: z.string().describe(
        "Optional. Authorization code to be exchanged for access and refresh tokens.",
      ).optional(),
      redirectUri: z.string().describe(
        "Optional. Redirect URI to be provided during the auth code exchange.",
      ).optional(),
      scopes: z.array(z.string()).describe(
        "Required. Scopes the connection will request when the user performs the auth code flow.",
      ).optional(),
    }).describe(
      "Parameters to support Oauth 2.0 Auth Code Grant Authentication using Google Provided OAuth Client. See https://tools.ietf.org/html/rfc6749#section-1.3.1 for more details.",
    ).optional(),
    oauth2ClientCredentials: z.object({
      clientId: z.string().describe("Optional. The client identifier.")
        .optional(),
      clientSecret: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Secret provides a reference to entries in Secret Manager.")
        .optional(),
    }).describe(
      "Parameters to support Oauth 2.0 Client Credentials Grant Authentication. See https://tools.ietf.org/html/rfc6749#section-1.3.4 for more details.",
    ).optional(),
    oauth2JwtBearer: z.object({
      clientKey: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Secret provides a reference to entries in Secret Manager.")
        .optional(),
      jwtClaims: z.object({
        audience: z.string().describe('Optional. Value for the "aud" claim.')
          .optional(),
        issuer: z.string().describe('Optional. Value for the "iss" claim.')
          .optional(),
        subject: z.string().describe('Optional. Value for the "sub" claim.')
          .optional(),
      }).describe("JWT claims used for the jwt-bearer authorization grant.")
        .optional(),
    }).describe(
      "Parameters to support JSON Web Token (JWT) Profile for Oauth 2.0 Authorization Grant based authentication. See https://tools.ietf.org/html/rfc7523 for more details.",
    ).optional(),
    sshPublicKey: z.object({
      certType: z.string().describe("Optional. Format of SSH Client cert.")
        .optional(),
      sshClientCert: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Secret provides a reference to entries in Secret Manager.")
        .optional(),
      sshClientCertPass: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Secret provides a reference to entries in Secret Manager.")
        .optional(),
      username: z.string().describe(
        "Optional. The user account used to authenticate.",
      ).optional(),
    }).describe("Parameters to support Ssh public key Authentication.")
      .optional(),
    userPassword: z.object({
      password: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Secret provides a reference to entries in Secret Manager.")
        .optional(),
      username: z.string().describe("Optional. Username.").optional(),
    }).describe("Parameters to support Username and Password Authentication.")
      .optional(),
  }).describe("AuthConfig defines details of a authentication type.")
    .optional(),
  authConfigTemplates: z.array(z.object({
    authKey: z.string().describe("Identifier key for auth config").optional(),
    authType: z.enum([
      "AUTH_TYPE_UNSPECIFIED",
      "USER_PASSWORD",
      "OAUTH2_JWT_BEARER",
      "OAUTH2_CLIENT_CREDENTIALS",
      "SSH_PUBLIC_KEY",
      "OAUTH2_AUTH_CODE_FLOW",
      "GOOGLE_AUTHENTICATION",
      "OAUTH2_AUTH_CODE_FLOW_GOOGLE_MANAGED",
    ]).describe("The type of authentication configured.").optional(),
    configVariableTemplates: z.array(z.object({
      authorizationCodeLink: z.object({
        clientId: z.unknown().describe(
          "Optional. The client ID assigned to the Google Cloud Connectors OAuth app for the connector data source.",
        ).optional(),
        clientSecret: z.unknown().describe(
          "Secret provides a reference to entries in Secret Manager.",
        ).optional(),
        enablePkce: z.unknown().describe(
          "Optional. Whether to enable PKCE for the auth code flow.",
        ).optional(),
        omitQueryParams: z.unknown().describe(
          "Optional. Omit query params from the redirect URI.",
        ).optional(),
        scopes: z.unknown().describe(
          "Optional. The scopes for which the user will authorize Google Cloud Connectors on the connector data source.",
        ).optional(),
        uri: z.unknown().describe(
          "Optional. The base URI the user must click to trigger the authorization code login flow.",
        ).optional(),
      }).describe(
        "This configuration captures the details required to render an authorization link for the OAuth Authorization Code Flow.",
      ).optional(),
      description: z.string().describe("Optional. Description.").optional(),
      displayName: z.string().describe(
        "Optional. Display name of the parameter.",
      ).optional(),
      enumOptions: z.array(z.unknown()).describe(
        "Optional. Enum options. To be populated if `ValueType` is `ENUM`",
      ).optional(),
      enumSource: z.enum(["ENUM_SOURCE_UNSPECIFIED", "EVENT_TYPES_API"])
        .describe(
          "Optional. enum source denotes the source of api to fill the enum options",
        ).optional(),
      isAdvanced: z.boolean().describe(
        "Optional. Indicates if current template is part of advanced settings",
      ).optional(),
      key: z.string().describe("Optional. Key of the config variable.")
        .optional(),
      locationType: z.enum([
        "LOCATION_TYPE_UNSPECIFIED",
        "HEADER",
        "PAYLOAD",
        "QUERY_PARAM",
        "PATH_PARAM",
      ]).describe(
        "Optional. Location Type denotes where this value should be sent in BYOC connections.",
      ).optional(),
      multipleSelectConfig: z.object({
        allowCustomValues: z.unknown().describe(
          "Optional. Allow custom values.",
        ).optional(),
        multipleSelectOptions: z.unknown().describe(
          "Required. Multiple select options.",
        ).optional(),
        valueSeparator: z.unknown().describe(
          'Required. Value separator. Only "," can be used for OAuth auth code flow scope field.',
        ).optional(),
      }).describe(
        "MultipleSelectConfig represents the multiple options for a config variable.",
      ).optional(),
      required: z.boolean().describe(
        "Optional. Flag represents that this `ConfigVariable` must be provided for a connection.",
      ).optional(),
      requiredCondition: z.object({
        fieldComparisons: z.unknown().describe(
          "Optional. A list of fields to be compared.",
        ).optional(),
        logicalExpressions: z.unknown().describe(
          "Optional. A list of nested conditions to be compared.",
        ).optional(),
        logicalOperator: z.unknown().describe(
          "Optional. The logical operator to use between the fields and conditions.",
        ).optional(),
      }).describe("Struct for representing boolean expressions.").optional(),
      roleGrant: z.object({
        helperTextTemplate: z.unknown().describe(
          "Optional. Template that UI can use to provide helper text to customers.",
        ).optional(),
        principal: z.unknown().describe(
          "Optional. Principal/Identity for whom the role need to assigned.",
        ).optional(),
        resource: z.unknown().describe("Resource definition").optional(),
        roles: z.unknown().describe(
          "Optional. List of roles that need to be granted.",
        ).optional(),
      }).describe(
        "This configuration defines all the Cloud IAM roles that needs to be granted to a particular Google Cloud resource for the selected principal like service account. These configurations will let UI display to customers what IAM roles need to be granted by them. Or these configurations can be used by the UI to render a 'grant' button to do the same on behalf of the user.",
      ).optional(),
      state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "DEPRECATED"]).describe(
        "Output only. State of the config variable.",
      ).optional(),
      validationRegex: z.string().describe(
        "Optional. Regular expression in RE2 syntax used for validating the `value` of a `ConfigVariable`.",
      ).optional(),
      valueType: z.enum([
        "VALUE_TYPE_UNSPECIFIED",
        "STRING",
        "INT",
        "BOOL",
        "SECRET",
        "ENUM",
        "AUTHORIZATION_CODE",
        "ENCRYPTION_KEY",
        "MULTIPLE_SELECT",
      ]).describe(
        "Optional. Type of the parameter: string, int, bool etc. consider custom type for the benefit for the validation.",
      ).optional(),
    })).describe(
      "Config variables to describe an `AuthConfig` for a `Connection`.",
    ).optional(),
    description: z.string().describe(
      "Connector specific description for an authentication template.",
    ).optional(),
    displayName: z.string().describe(
      "Display name for authentication template.",
    ).optional(),
    isDefault: z.boolean().describe(
      "Whether the auth config is the default one.",
    ).optional(),
  })).describe(
    "Optional. Auth Config Templates is only used when connector backend is enabled. This is used to specify the auth configs supported by the connector backend service to talk to the actual application backend.",
  ).optional(),
  authOverrideSupport: z.boolean().describe("Optional. Auth override support.")
    .optional(),
  backendVariableTemplates: z.array(z.object({
    authorizationCodeLink: z.object({
      clientId: z.string().describe(
        "Optional. The client ID assigned to the Google Cloud Connectors OAuth app for the connector data source.",
      ).optional(),
      clientSecret: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Secret provides a reference to entries in Secret Manager.")
        .optional(),
      enablePkce: z.boolean().describe(
        "Optional. Whether to enable PKCE for the auth code flow.",
      ).optional(),
      omitQueryParams: z.boolean().describe(
        "Optional. Omit query params from the redirect URI.",
      ).optional(),
      scopes: z.array(z.string()).describe(
        "Optional. The scopes for which the user will authorize Google Cloud Connectors on the connector data source.",
      ).optional(),
      uri: z.string().describe(
        "Optional. The base URI the user must click to trigger the authorization code login flow.",
      ).optional(),
    }).describe(
      "This configuration captures the details required to render an authorization link for the OAuth Authorization Code Flow.",
    ).optional(),
    description: z.string().describe("Optional. Description.").optional(),
    displayName: z.string().describe("Optional. Display name of the parameter.")
      .optional(),
    enumOptions: z.array(z.object({
      displayName: z.string().describe("Optional. Display name of the option.")
        .optional(),
      id: z.string().describe("Optional. Id of the option.").optional(),
    })).describe(
      "Optional. Enum options. To be populated if `ValueType` is `ENUM`",
    ).optional(),
    enumSource: z.enum(["ENUM_SOURCE_UNSPECIFIED", "EVENT_TYPES_API"]).describe(
      "Optional. enum source denotes the source of api to fill the enum options",
    ).optional(),
    isAdvanced: z.boolean().describe(
      "Optional. Indicates if current template is part of advanced settings",
    ).optional(),
    key: z.string().describe("Optional. Key of the config variable.")
      .optional(),
    locationType: z.enum([
      "LOCATION_TYPE_UNSPECIFIED",
      "HEADER",
      "PAYLOAD",
      "QUERY_PARAM",
      "PATH_PARAM",
    ]).describe(
      "Optional. Location Type denotes where this value should be sent in BYOC connections.",
    ).optional(),
    multipleSelectConfig: z.object({
      allowCustomValues: z.boolean().describe("Optional. Allow custom values.")
        .optional(),
      multipleSelectOptions: z.array(z.object({
        description: z.unknown().describe("Optional. Value of the option.")
          .optional(),
        displayName: z.unknown().describe(
          "Required. Display name of the option.",
        ).optional(),
        key: z.unknown().describe("Required. Key of the option.").optional(),
        preselected: z.unknown().describe(
          "Optional. Indicates if the option is preselected.",
        ).optional(),
      })).describe("Required. Multiple select options.").optional(),
      valueSeparator: z.string().describe(
        'Required. Value separator. Only "," can be used for OAuth auth code flow scope field.',
      ).optional(),
    }).describe(
      "MultipleSelectConfig represents the multiple options for a config variable.",
    ).optional(),
    required: z.boolean().describe(
      "Optional. Flag represents that this `ConfigVariable` must be provided for a connection.",
    ).optional(),
    requiredCondition: z.object({
      fieldComparisons: z.array(z.object({
        boolValue: z.unknown().describe("Boolean value").optional(),
        comparator: z.unknown().describe(
          "Optional. Comparator to use for comparing the field value.",
        ).optional(),
        intValue: z.unknown().describe("Integer value").optional(),
        key: z.unknown().describe("Optional. Key of the field.").optional(),
        stringValue: z.unknown().describe("String value").optional(),
      })).describe("Optional. A list of fields to be compared.").optional(),
      logicalExpressions: z.array(z.record(z.string(), z.unknown())).describe(
        "Optional. A list of nested conditions to be compared.",
      ).optional(),
      logicalOperator: z.enum(["OPERATOR_UNSPECIFIED", "AND", "OR"]).describe(
        "Optional. The logical operator to use between the fields and conditions.",
      ).optional(),
    }).describe("Struct for representing boolean expressions.").optional(),
    roleGrant: z.object({
      helperTextTemplate: z.string().describe(
        "Optional. Template that UI can use to provide helper text to customers.",
      ).optional(),
      principal: z.enum(["PRINCIPAL_UNSPECIFIED", "CONNECTOR_SA"]).describe(
        "Optional. Principal/Identity for whom the role need to assigned.",
      ).optional(),
      resource: z.object({
        pathTemplate: z.string().describe(
          "Optional. Template to uniquely represent a Google Cloud resource in a format IAM expects This is a template that can have references to other values provided in the config variable template.",
        ).optional(),
        type: z.enum([
          "TYPE_UNSPECIFIED",
          "GCP_PROJECT",
          "GCP_RESOURCE",
          "GCP_SECRETMANAGER_SECRET",
          "GCP_SECRETMANAGER_SECRET_VERSION",
        ]).describe("Optional. Different types of resource supported.")
          .optional(),
      }).describe("Resource definition").optional(),
      roles: z.array(z.string()).describe(
        "Optional. List of roles that need to be granted.",
      ).optional(),
    }).describe(
      "This configuration defines all the Cloud IAM roles that needs to be granted to a particular Google Cloud resource for the selected principal like service account. These configurations will let UI display to customers what IAM roles need to be granted by them. Or these configurations can be used by the UI to render a 'grant' button to do the same on behalf of the user.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "DEPRECATED"]).describe(
      "Output only. State of the config variable.",
    ).optional(),
    validationRegex: z.string().describe(
      "Optional. Regular expression in RE2 syntax used for validating the `value` of a `ConfigVariable`.",
    ).optional(),
    valueType: z.enum([
      "VALUE_TYPE_UNSPECIFIED",
      "STRING",
      "INT",
      "BOOL",
      "SECRET",
      "ENUM",
      "AUTHORIZATION_CODE",
      "ENCRYPTION_KEY",
      "MULTIPLE_SELECT",
    ]).describe(
      "Optional. Type of the parameter: string, int, bool etc. consider custom type for the benefit for the validation.",
    ).optional(),
  })).describe(
    "Optional. Backend variable templates is only used when connector backend is enabled. This is used to specify the variables required by the connector backend service to talk to the actual application backend. This translates to additional variable templates in the connection config.",
  ).optional(),
  destinationConfigs: z.array(z.object({
    destinations: z.array(z.object({
      host: z.string().describe("For publicly routable host.").optional(),
      port: z.number().int().describe(
        "Optional. The port is the target port number that is accepted by the destination.",
      ).optional(),
      serviceAttachment: z.string().describe(
        "PSC service attachments. Format: projects/*/regions/*/serviceAttachments/*",
      ).optional(),
    })).describe("Optional. The destinations for the key.").optional(),
    key: z.string().describe(
      "Optional. The key is the destination identifier that is supported by the Connector.",
    ).optional(),
  })).describe(
    "Optional. Destination config(s) for accessing connector service (facade). This is used only when enable_backend_destination_config is true.",
  ).optional(),
  enableBackendDestinationConfig: z.boolean().describe(
    "Optional. Indicates if an intermediatory connectorservice is used as backend. When this is enabled, the connector destination and connector auth config are required. For SDK based connectors, this is always enabled.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Resource labels to represent user-provided metadata. Refer to cloud documentation on labels for more details. https://cloud.google.com/compute/docs/labeling-resources",
  ).optional(),
  partnerMetadata: z.object({
    acceptGcpTos: z.boolean().describe(
      "Required. Whether the user has accepted the Google Cloud Platform Terms of Service (https://cloud.google.com/terms/) and the Google Cloud Marketplace Terms of Service (https://cloud.google.com/terms/marketplace/launcher?hl=en).",
    ).optional(),
    additionalComments: z.string().describe(
      "Optional. Additional comments for the submission.",
    ).optional(),
    confirmPartnerRequirements: z.boolean().describe(
      "Required. Confirmation that connector meets all applicable requirements mentioned in the Partner Connector Publishing requirements list and Partner onboardiong requirements list (https://cloud.google.com/marketplace/docs/partners/get-started#requirements).",
    ).optional(),
    demoUri: z.string().describe("Required. Public URL for the demo video.")
      .optional(),
    hasDynamicSpecUri: z.boolean().describe(
      "Output only. Has dynamic open api spec uri.",
    ).optional(),
    integrationTemplates: z.string().describe(
      "Required. Integration example templates for the custom connector.",
    ).optional(),
    localSpecPath: z.string().describe(
      "Output only. Local spec path. Required if has_dynamic_spec_uri is true.",
    ).optional(),
    marketplaceProduct: z.string().describe(
      "Optional. Marketplace product name.",
    ).optional(),
    marketplaceProductId: z.string().describe(
      "Required. Marketplace product ID.",
    ).optional(),
    marketplaceProductProjectId: z.string().describe(
      "Optional. Marketplace product project ID.",
    ).optional(),
    marketplaceProductUri: z.string().describe(
      "Optional. Marketplace product URL.",
    ).optional(),
    partner: z.string().describe("Required. Partner name.").optional(),
    partnerConnectorDisplayName: z.string().describe(
      "Required. Partner connector display name.",
    ).optional(),
    publishRequestTime: z.string().describe(
      "Output only. Publish request time.",
    ).optional(),
    targetApplication: z.string().describe(
      "Required. Target application for which partner connector is built.",
    ).optional(),
    targetCustomerSegment: z.string().describe(
      "Required. Target customer segment for the partner connector.",
    ).optional(),
    useCases: z.string().describe(
      "Required. Details about partner connector use cases.",
    ).optional(),
  }).describe(
    "Partner metadata details. This will be populated when publishing the custom connector as a partner connector version. On publishing, parntner connector version will be created using the fields in PartnerMetadata.",
  ).optional(),
  publishStatus: z.object({
    publishState: z.enum([
      "PUBLISH_STATE_UNSPECIFIED",
      "PUBLISHED",
      "PUBLISH_IN_PROGRESS",
      "UNPUBLISHED",
    ]).describe("Output only. Publish state of the custom connector.")
      .optional(),
    publishTime: z.string().describe("Output only. Publish time.").optional(),
    publishedAs: z.string().describe(
      "Output only. Partner connector name. Will be set on the custom connector. Format: providers/partner/connectors//versions/",
    ).optional(),
    publishedSource: z.string().describe(
      "Output only. Custom connector name. Will be set on the partner connector. Format: providers/customconnectors/connectors//versions/",
    ).optional(),
  }).describe("Publish status of a custom connector.").optional(),
  serviceAccount: z.string().describe(
    "Optional. Service account used by runtime plane to access auth config secrets.",
  ).optional(),
  specLocation: z.string().describe(
    "Optional. Location of the custom connector spec. This is only used for Open API based custom connectors. The location can be either a public url like `https://public-url.com/spec` Or a Google Cloud Storage location like `gs:///`.",
  ).optional(),
  customConnectorVersionId: z.string().describe(
    "Required. Identifier to assign to the CreateCustomConnectorVersion. Must be unique within scope of the parent resource.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  asyncOperationsSupport: z.boolean().optional(),
  authConfig: z.object({
    additionalVariables: z.array(z.object({
      boolValue: z.boolean(),
      encryptionKeyValue: z.object({
        kmsKeyName: z.string(),
        type: z.string(),
      }),
      intValue: z.string(),
      key: z.string(),
      secretValue: z.object({
        secretVersion: z.string(),
      }),
      stringValue: z.string(),
    })),
    authKey: z.string(),
    authType: z.string(),
    oauth2AuthCodeFlow: z.object({
      authCode: z.string(),
      authUri: z.string(),
      clientId: z.string(),
      clientSecret: z.object({
        secretVersion: z.string(),
      }),
      enablePkce: z.boolean(),
      pkceVerifier: z.string(),
      redirectUri: z.string(),
      scopes: z.array(z.string()),
    }),
    oauth2AuthCodeFlowGoogleManaged: z.object({
      authCode: z.string(),
      redirectUri: z.string(),
      scopes: z.array(z.string()),
    }),
    oauth2ClientCredentials: z.object({
      clientId: z.string(),
      clientSecret: z.object({
        secretVersion: z.string(),
      }),
    }),
    oauth2JwtBearer: z.object({
      clientKey: z.object({
        secretVersion: z.string(),
      }),
      jwtClaims: z.object({
        audience: z.string(),
        issuer: z.string(),
        subject: z.string(),
      }),
    }),
    sshPublicKey: z.object({
      certType: z.string(),
      sshClientCert: z.object({
        secretVersion: z.string(),
      }),
      sshClientCertPass: z.object({
        secretVersion: z.string(),
      }),
      username: z.string(),
    }),
    userPassword: z.object({
      password: z.object({
        secretVersion: z.string(),
      }),
      username: z.string(),
    }),
  }).optional(),
  authConfigTemplates: z.array(z.object({
    authKey: z.string(),
    authType: z.string(),
    configVariableTemplates: z.array(z.object({
      authorizationCodeLink: z.object({
        clientId: z.unknown(),
        clientSecret: z.unknown(),
        enablePkce: z.unknown(),
        omitQueryParams: z.unknown(),
        scopes: z.unknown(),
        uri: z.unknown(),
      }),
      description: z.string(),
      displayName: z.string(),
      enumOptions: z.array(z.unknown()),
      enumSource: z.string(),
      isAdvanced: z.boolean(),
      key: z.string(),
      locationType: z.string(),
      multipleSelectConfig: z.object({
        allowCustomValues: z.unknown(),
        multipleSelectOptions: z.unknown(),
        valueSeparator: z.unknown(),
      }),
      required: z.boolean(),
      requiredCondition: z.object({
        fieldComparisons: z.unknown(),
        logicalExpressions: z.unknown(),
        logicalOperator: z.unknown(),
      }),
      roleGrant: z.object({
        helperTextTemplate: z.unknown(),
        principal: z.unknown(),
        resource: z.unknown(),
        roles: z.unknown(),
      }),
      state: z.string(),
      validationRegex: z.string(),
      valueType: z.string(),
    })),
    description: z.string(),
    displayName: z.string(),
    isDefault: z.boolean(),
  })).optional(),
  authOverrideSupport: z.boolean().optional(),
  backendVariableTemplates: z.array(z.object({
    authorizationCodeLink: z.object({
      clientId: z.string(),
      clientSecret: z.object({
        secretVersion: z.string(),
      }),
      enablePkce: z.boolean(),
      omitQueryParams: z.boolean(),
      scopes: z.array(z.string()),
      uri: z.string(),
    }),
    description: z.string(),
    displayName: z.string(),
    enumOptions: z.array(z.object({
      displayName: z.string(),
      id: z.string(),
    })),
    enumSource: z.string(),
    isAdvanced: z.boolean(),
    key: z.string(),
    locationType: z.string(),
    multipleSelectConfig: z.object({
      allowCustomValues: z.boolean(),
      multipleSelectOptions: z.array(z.object({
        description: z.unknown(),
        displayName: z.unknown(),
        key: z.unknown(),
        preselected: z.unknown(),
      })),
      valueSeparator: z.string(),
    }),
    required: z.boolean(),
    requiredCondition: z.object({
      fieldComparisons: z.array(z.object({
        boolValue: z.unknown(),
        comparator: z.unknown(),
        intValue: z.unknown(),
        key: z.unknown(),
        stringValue: z.unknown(),
      })),
      logicalExpressions: z.array(z.record(z.string(), z.unknown())),
      logicalOperator: z.string(),
    }),
    roleGrant: z.object({
      helperTextTemplate: z.string(),
      principal: z.string(),
      resource: z.object({
        pathTemplate: z.string(),
        type: z.string(),
      }),
      roles: z.array(z.string()),
    }),
    state: z.string(),
    validationRegex: z.string(),
    valueType: z.string(),
  })).optional(),
  createTime: z.string().optional(),
  destinationConfigs: z.array(z.object({
    destinations: z.array(z.object({
      host: z.string(),
      port: z.number(),
      serviceAttachment: z.string(),
    })),
    key: z.string(),
  })).optional(),
  enableBackendDestinationConfig: z.boolean().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  partnerMetadata: z.object({
    acceptGcpTos: z.boolean(),
    additionalComments: z.string(),
    confirmPartnerRequirements: z.boolean(),
    demoUri: z.string(),
    hasDynamicSpecUri: z.boolean(),
    integrationTemplates: z.string(),
    localSpecPath: z.string(),
    marketplaceProduct: z.string(),
    marketplaceProductId: z.string(),
    marketplaceProductProjectId: z.string(),
    marketplaceProductUri: z.string(),
    partner: z.string(),
    partnerConnectorDisplayName: z.string(),
    publishRequestTime: z.string(),
    targetApplication: z.string(),
    targetCustomerSegment: z.string(),
    useCases: z.string(),
  }).optional(),
  publishStatus: z.object({
    publishState: z.string(),
    publishTime: z.string(),
    publishedAs: z.string(),
    publishedSource: z.string(),
  }).optional(),
  serviceAccount: z.string().optional(),
  specLocation: z.string().optional(),
  specServerUrls: z.array(z.string()).optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  asyncOperationsSupport: z.boolean().describe(
    "Optional. Indicates if Async Operations/Connector Job is supported. This is only available for SDK based custom connectors.",
  ).optional(),
  authConfig: z.object({
    additionalVariables: z.array(z.object({
      boolValue: z.boolean().describe("Optional. Value is a bool.").optional(),
      encryptionKeyValue: z.object({
        kmsKeyName: z.string().describe(
          "Optional. The [KMS key name] with which the content of the Operation is encrypted. The expected format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`. Will be empty string if google managed.",
        ).optional(),
        type: z.enum(["TYPE_UNSPECIFIED", "GOOGLE_MANAGED", "CUSTOMER_MANAGED"])
          .describe("Optional. Specifies the type of the encryption key.")
          .optional(),
      }).describe("Encryption Key value.").optional(),
      intValue: z.string().describe("Optional. Value is an integer").optional(),
      key: z.string().describe("Optional. Key of the config variable.")
        .optional(),
      secretValue: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Secret provides a reference to entries in Secret Manager.")
        .optional(),
      stringValue: z.string().describe("Optional. Value is a string.")
        .optional(),
    })).describe("Optional. List containing additional auth configs.")
      .optional(),
    authKey: z.string().describe("Optional. Identifier key for auth config")
      .optional(),
    authType: z.enum([
      "AUTH_TYPE_UNSPECIFIED",
      "USER_PASSWORD",
      "OAUTH2_JWT_BEARER",
      "OAUTH2_CLIENT_CREDENTIALS",
      "SSH_PUBLIC_KEY",
      "OAUTH2_AUTH_CODE_FLOW",
      "GOOGLE_AUTHENTICATION",
      "OAUTH2_AUTH_CODE_FLOW_GOOGLE_MANAGED",
    ]).describe("Optional. The type of authentication configured.").optional(),
    oauth2AuthCodeFlow: z.object({
      authCode: z.string().describe(
        "Optional. Authorization code to be exchanged for access and refresh tokens.",
      ).optional(),
      authUri: z.string().describe(
        "Optional. Auth URL for Authorization Code Flow",
      ).optional(),
      clientId: z.string().describe(
        "Optional. Client ID for user-provided OAuth app.",
      ).optional(),
      clientSecret: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Secret provides a reference to entries in Secret Manager.")
        .optional(),
      enablePkce: z.boolean().describe(
        "Optional. Whether to enable PKCE when the user performs the auth code flow.",
      ).optional(),
      pkceVerifier: z.string().describe(
        "Optional. PKCE verifier to be used during the auth code exchange.",
      ).optional(),
      redirectUri: z.string().describe(
        "Optional. Redirect URI to be provided during the auth code exchange.",
      ).optional(),
      scopes: z.array(z.string()).describe(
        "Optional. Scopes the connection will request when the user performs the auth code flow.",
      ).optional(),
    }).describe(
      "Parameters to support Oauth 2.0 Auth Code Grant Authentication. See https://www.rfc-editor.org/rfc/rfc6749#section-1.3.1 for more details.",
    ).optional(),
    oauth2AuthCodeFlowGoogleManaged: z.object({
      authCode: z.string().describe(
        "Optional. Authorization code to be exchanged for access and refresh tokens.",
      ).optional(),
      redirectUri: z.string().describe(
        "Optional. Redirect URI to be provided during the auth code exchange.",
      ).optional(),
      scopes: z.array(z.string()).describe(
        "Required. Scopes the connection will request when the user performs the auth code flow.",
      ).optional(),
    }).describe(
      "Parameters to support Oauth 2.0 Auth Code Grant Authentication using Google Provided OAuth Client. See https://tools.ietf.org/html/rfc6749#section-1.3.1 for more details.",
    ).optional(),
    oauth2ClientCredentials: z.object({
      clientId: z.string().describe("Optional. The client identifier.")
        .optional(),
      clientSecret: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Secret provides a reference to entries in Secret Manager.")
        .optional(),
    }).describe(
      "Parameters to support Oauth 2.0 Client Credentials Grant Authentication. See https://tools.ietf.org/html/rfc6749#section-1.3.4 for more details.",
    ).optional(),
    oauth2JwtBearer: z.object({
      clientKey: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Secret provides a reference to entries in Secret Manager.")
        .optional(),
      jwtClaims: z.object({
        audience: z.string().describe('Optional. Value for the "aud" claim.')
          .optional(),
        issuer: z.string().describe('Optional. Value for the "iss" claim.')
          .optional(),
        subject: z.string().describe('Optional. Value for the "sub" claim.')
          .optional(),
      }).describe("JWT claims used for the jwt-bearer authorization grant.")
        .optional(),
    }).describe(
      "Parameters to support JSON Web Token (JWT) Profile for Oauth 2.0 Authorization Grant based authentication. See https://tools.ietf.org/html/rfc7523 for more details.",
    ).optional(),
    sshPublicKey: z.object({
      certType: z.string().describe("Optional. Format of SSH Client cert.")
        .optional(),
      sshClientCert: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Secret provides a reference to entries in Secret Manager.")
        .optional(),
      sshClientCertPass: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Secret provides a reference to entries in Secret Manager.")
        .optional(),
      username: z.string().describe(
        "Optional. The user account used to authenticate.",
      ).optional(),
    }).describe("Parameters to support Ssh public key Authentication.")
      .optional(),
    userPassword: z.object({
      password: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Secret provides a reference to entries in Secret Manager.")
        .optional(),
      username: z.string().describe("Optional. Username.").optional(),
    }).describe("Parameters to support Username and Password Authentication.")
      .optional(),
  }).describe("AuthConfig defines details of a authentication type.")
    .optional(),
  authConfigTemplates: z.array(z.object({
    authKey: z.string().describe("Identifier key for auth config").optional(),
    authType: z.enum([
      "AUTH_TYPE_UNSPECIFIED",
      "USER_PASSWORD",
      "OAUTH2_JWT_BEARER",
      "OAUTH2_CLIENT_CREDENTIALS",
      "SSH_PUBLIC_KEY",
      "OAUTH2_AUTH_CODE_FLOW",
      "GOOGLE_AUTHENTICATION",
      "OAUTH2_AUTH_CODE_FLOW_GOOGLE_MANAGED",
    ]).describe("The type of authentication configured.").optional(),
    configVariableTemplates: z.array(z.object({
      authorizationCodeLink: z.object({
        clientId: z.unknown().describe(
          "Optional. The client ID assigned to the Google Cloud Connectors OAuth app for the connector data source.",
        ).optional(),
        clientSecret: z.unknown().describe(
          "Secret provides a reference to entries in Secret Manager.",
        ).optional(),
        enablePkce: z.unknown().describe(
          "Optional. Whether to enable PKCE for the auth code flow.",
        ).optional(),
        omitQueryParams: z.unknown().describe(
          "Optional. Omit query params from the redirect URI.",
        ).optional(),
        scopes: z.unknown().describe(
          "Optional. The scopes for which the user will authorize Google Cloud Connectors on the connector data source.",
        ).optional(),
        uri: z.unknown().describe(
          "Optional. The base URI the user must click to trigger the authorization code login flow.",
        ).optional(),
      }).describe(
        "This configuration captures the details required to render an authorization link for the OAuth Authorization Code Flow.",
      ).optional(),
      description: z.string().describe("Optional. Description.").optional(),
      displayName: z.string().describe(
        "Optional. Display name of the parameter.",
      ).optional(),
      enumOptions: z.array(z.unknown()).describe(
        "Optional. Enum options. To be populated if `ValueType` is `ENUM`",
      ).optional(),
      enumSource: z.enum(["ENUM_SOURCE_UNSPECIFIED", "EVENT_TYPES_API"])
        .describe(
          "Optional. enum source denotes the source of api to fill the enum options",
        ).optional(),
      isAdvanced: z.boolean().describe(
        "Optional. Indicates if current template is part of advanced settings",
      ).optional(),
      key: z.string().describe("Optional. Key of the config variable.")
        .optional(),
      locationType: z.enum([
        "LOCATION_TYPE_UNSPECIFIED",
        "HEADER",
        "PAYLOAD",
        "QUERY_PARAM",
        "PATH_PARAM",
      ]).describe(
        "Optional. Location Type denotes where this value should be sent in BYOC connections.",
      ).optional(),
      multipleSelectConfig: z.object({
        allowCustomValues: z.unknown().describe(
          "Optional. Allow custom values.",
        ).optional(),
        multipleSelectOptions: z.unknown().describe(
          "Required. Multiple select options.",
        ).optional(),
        valueSeparator: z.unknown().describe(
          'Required. Value separator. Only "," can be used for OAuth auth code flow scope field.',
        ).optional(),
      }).describe(
        "MultipleSelectConfig represents the multiple options for a config variable.",
      ).optional(),
      required: z.boolean().describe(
        "Optional. Flag represents that this `ConfigVariable` must be provided for a connection.",
      ).optional(),
      requiredCondition: z.object({
        fieldComparisons: z.unknown().describe(
          "Optional. A list of fields to be compared.",
        ).optional(),
        logicalExpressions: z.unknown().describe(
          "Optional. A list of nested conditions to be compared.",
        ).optional(),
        logicalOperator: z.unknown().describe(
          "Optional. The logical operator to use between the fields and conditions.",
        ).optional(),
      }).describe("Struct for representing boolean expressions.").optional(),
      roleGrant: z.object({
        helperTextTemplate: z.unknown().describe(
          "Optional. Template that UI can use to provide helper text to customers.",
        ).optional(),
        principal: z.unknown().describe(
          "Optional. Principal/Identity for whom the role need to assigned.",
        ).optional(),
        resource: z.unknown().describe("Resource definition").optional(),
        roles: z.unknown().describe(
          "Optional. List of roles that need to be granted.",
        ).optional(),
      }).describe(
        "This configuration defines all the Cloud IAM roles that needs to be granted to a particular Google Cloud resource for the selected principal like service account. These configurations will let UI display to customers what IAM roles need to be granted by them. Or these configurations can be used by the UI to render a 'grant' button to do the same on behalf of the user.",
      ).optional(),
      state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "DEPRECATED"]).describe(
        "Output only. State of the config variable.",
      ).optional(),
      validationRegex: z.string().describe(
        "Optional. Regular expression in RE2 syntax used for validating the `value` of a `ConfigVariable`.",
      ).optional(),
      valueType: z.enum([
        "VALUE_TYPE_UNSPECIFIED",
        "STRING",
        "INT",
        "BOOL",
        "SECRET",
        "ENUM",
        "AUTHORIZATION_CODE",
        "ENCRYPTION_KEY",
        "MULTIPLE_SELECT",
      ]).describe(
        "Optional. Type of the parameter: string, int, bool etc. consider custom type for the benefit for the validation.",
      ).optional(),
    })).describe(
      "Config variables to describe an `AuthConfig` for a `Connection`.",
    ).optional(),
    description: z.string().describe(
      "Connector specific description for an authentication template.",
    ).optional(),
    displayName: z.string().describe(
      "Display name for authentication template.",
    ).optional(),
    isDefault: z.boolean().describe(
      "Whether the auth config is the default one.",
    ).optional(),
  })).describe(
    "Optional. Auth Config Templates is only used when connector backend is enabled. This is used to specify the auth configs supported by the connector backend service to talk to the actual application backend.",
  ).optional(),
  authOverrideSupport: z.boolean().describe("Optional. Auth override support.")
    .optional(),
  backendVariableTemplates: z.array(z.object({
    authorizationCodeLink: z.object({
      clientId: z.string().describe(
        "Optional. The client ID assigned to the Google Cloud Connectors OAuth app for the connector data source.",
      ).optional(),
      clientSecret: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Secret provides a reference to entries in Secret Manager.")
        .optional(),
      enablePkce: z.boolean().describe(
        "Optional. Whether to enable PKCE for the auth code flow.",
      ).optional(),
      omitQueryParams: z.boolean().describe(
        "Optional. Omit query params from the redirect URI.",
      ).optional(),
      scopes: z.array(z.string()).describe(
        "Optional. The scopes for which the user will authorize Google Cloud Connectors on the connector data source.",
      ).optional(),
      uri: z.string().describe(
        "Optional. The base URI the user must click to trigger the authorization code login flow.",
      ).optional(),
    }).describe(
      "This configuration captures the details required to render an authorization link for the OAuth Authorization Code Flow.",
    ).optional(),
    description: z.string().describe("Optional. Description.").optional(),
    displayName: z.string().describe("Optional. Display name of the parameter.")
      .optional(),
    enumOptions: z.array(z.object({
      displayName: z.string().describe("Optional. Display name of the option.")
        .optional(),
      id: z.string().describe("Optional. Id of the option.").optional(),
    })).describe(
      "Optional. Enum options. To be populated if `ValueType` is `ENUM`",
    ).optional(),
    enumSource: z.enum(["ENUM_SOURCE_UNSPECIFIED", "EVENT_TYPES_API"]).describe(
      "Optional. enum source denotes the source of api to fill the enum options",
    ).optional(),
    isAdvanced: z.boolean().describe(
      "Optional. Indicates if current template is part of advanced settings",
    ).optional(),
    key: z.string().describe("Optional. Key of the config variable.")
      .optional(),
    locationType: z.enum([
      "LOCATION_TYPE_UNSPECIFIED",
      "HEADER",
      "PAYLOAD",
      "QUERY_PARAM",
      "PATH_PARAM",
    ]).describe(
      "Optional. Location Type denotes where this value should be sent in BYOC connections.",
    ).optional(),
    multipleSelectConfig: z.object({
      allowCustomValues: z.boolean().describe("Optional. Allow custom values.")
        .optional(),
      multipleSelectOptions: z.array(z.object({
        description: z.unknown().describe("Optional. Value of the option.")
          .optional(),
        displayName: z.unknown().describe(
          "Required. Display name of the option.",
        ).optional(),
        key: z.unknown().describe("Required. Key of the option.").optional(),
        preselected: z.unknown().describe(
          "Optional. Indicates if the option is preselected.",
        ).optional(),
      })).describe("Required. Multiple select options.").optional(),
      valueSeparator: z.string().describe(
        'Required. Value separator. Only "," can be used for OAuth auth code flow scope field.',
      ).optional(),
    }).describe(
      "MultipleSelectConfig represents the multiple options for a config variable.",
    ).optional(),
    required: z.boolean().describe(
      "Optional. Flag represents that this `ConfigVariable` must be provided for a connection.",
    ).optional(),
    requiredCondition: z.object({
      fieldComparisons: z.array(z.object({
        boolValue: z.unknown().describe("Boolean value").optional(),
        comparator: z.unknown().describe(
          "Optional. Comparator to use for comparing the field value.",
        ).optional(),
        intValue: z.unknown().describe("Integer value").optional(),
        key: z.unknown().describe("Optional. Key of the field.").optional(),
        stringValue: z.unknown().describe("String value").optional(),
      })).describe("Optional. A list of fields to be compared.").optional(),
      logicalExpressions: z.array(z.record(z.string(), z.unknown())).describe(
        "Optional. A list of nested conditions to be compared.",
      ).optional(),
      logicalOperator: z.enum(["OPERATOR_UNSPECIFIED", "AND", "OR"]).describe(
        "Optional. The logical operator to use between the fields and conditions.",
      ).optional(),
    }).describe("Struct for representing boolean expressions.").optional(),
    roleGrant: z.object({
      helperTextTemplate: z.string().describe(
        "Optional. Template that UI can use to provide helper text to customers.",
      ).optional(),
      principal: z.enum(["PRINCIPAL_UNSPECIFIED", "CONNECTOR_SA"]).describe(
        "Optional. Principal/Identity for whom the role need to assigned.",
      ).optional(),
      resource: z.object({
        pathTemplate: z.string().describe(
          "Optional. Template to uniquely represent a Google Cloud resource in a format IAM expects This is a template that can have references to other values provided in the config variable template.",
        ).optional(),
        type: z.enum([
          "TYPE_UNSPECIFIED",
          "GCP_PROJECT",
          "GCP_RESOURCE",
          "GCP_SECRETMANAGER_SECRET",
          "GCP_SECRETMANAGER_SECRET_VERSION",
        ]).describe("Optional. Different types of resource supported.")
          .optional(),
      }).describe("Resource definition").optional(),
      roles: z.array(z.string()).describe(
        "Optional. List of roles that need to be granted.",
      ).optional(),
    }).describe(
      "This configuration defines all the Cloud IAM roles that needs to be granted to a particular Google Cloud resource for the selected principal like service account. These configurations will let UI display to customers what IAM roles need to be granted by them. Or these configurations can be used by the UI to render a 'grant' button to do the same on behalf of the user.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "DEPRECATED"]).describe(
      "Output only. State of the config variable.",
    ).optional(),
    validationRegex: z.string().describe(
      "Optional. Regular expression in RE2 syntax used for validating the `value` of a `ConfigVariable`.",
    ).optional(),
    valueType: z.enum([
      "VALUE_TYPE_UNSPECIFIED",
      "STRING",
      "INT",
      "BOOL",
      "SECRET",
      "ENUM",
      "AUTHORIZATION_CODE",
      "ENCRYPTION_KEY",
      "MULTIPLE_SELECT",
    ]).describe(
      "Optional. Type of the parameter: string, int, bool etc. consider custom type for the benefit for the validation.",
    ).optional(),
  })).describe(
    "Optional. Backend variable templates is only used when connector backend is enabled. This is used to specify the variables required by the connector backend service to talk to the actual application backend. This translates to additional variable templates in the connection config.",
  ).optional(),
  destinationConfigs: z.array(z.object({
    destinations: z.array(z.object({
      host: z.string().describe("For publicly routable host.").optional(),
      port: z.number().int().describe(
        "Optional. The port is the target port number that is accepted by the destination.",
      ).optional(),
      serviceAttachment: z.string().describe(
        "PSC service attachments. Format: projects/*/regions/*/serviceAttachments/*",
      ).optional(),
    })).describe("Optional. The destinations for the key.").optional(),
    key: z.string().describe(
      "Optional. The key is the destination identifier that is supported by the Connector.",
    ).optional(),
  })).describe(
    "Optional. Destination config(s) for accessing connector service (facade). This is used only when enable_backend_destination_config is true.",
  ).optional(),
  enableBackendDestinationConfig: z.boolean().describe(
    "Optional. Indicates if an intermediatory connectorservice is used as backend. When this is enabled, the connector destination and connector auth config are required. For SDK based connectors, this is always enabled.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Resource labels to represent user-provided metadata. Refer to cloud documentation on labels for more details. https://cloud.google.com/compute/docs/labeling-resources",
  ).optional(),
  partnerMetadata: z.object({
    acceptGcpTos: z.boolean().describe(
      "Required. Whether the user has accepted the Google Cloud Platform Terms of Service (https://cloud.google.com/terms/) and the Google Cloud Marketplace Terms of Service (https://cloud.google.com/terms/marketplace/launcher?hl=en).",
    ).optional(),
    additionalComments: z.string().describe(
      "Optional. Additional comments for the submission.",
    ).optional(),
    confirmPartnerRequirements: z.boolean().describe(
      "Required. Confirmation that connector meets all applicable requirements mentioned in the Partner Connector Publishing requirements list and Partner onboardiong requirements list (https://cloud.google.com/marketplace/docs/partners/get-started#requirements).",
    ).optional(),
    demoUri: z.string().describe("Required. Public URL for the demo video.")
      .optional(),
    hasDynamicSpecUri: z.boolean().describe(
      "Output only. Has dynamic open api spec uri.",
    ).optional(),
    integrationTemplates: z.string().describe(
      "Required. Integration example templates for the custom connector.",
    ).optional(),
    localSpecPath: z.string().describe(
      "Output only. Local spec path. Required if has_dynamic_spec_uri is true.",
    ).optional(),
    marketplaceProduct: z.string().describe(
      "Optional. Marketplace product name.",
    ).optional(),
    marketplaceProductId: z.string().describe(
      "Required. Marketplace product ID.",
    ).optional(),
    marketplaceProductProjectId: z.string().describe(
      "Optional. Marketplace product project ID.",
    ).optional(),
    marketplaceProductUri: z.string().describe(
      "Optional. Marketplace product URL.",
    ).optional(),
    partner: z.string().describe("Required. Partner name.").optional(),
    partnerConnectorDisplayName: z.string().describe(
      "Required. Partner connector display name.",
    ).optional(),
    publishRequestTime: z.string().describe(
      "Output only. Publish request time.",
    ).optional(),
    targetApplication: z.string().describe(
      "Required. Target application for which partner connector is built.",
    ).optional(),
    targetCustomerSegment: z.string().describe(
      "Required. Target customer segment for the partner connector.",
    ).optional(),
    useCases: z.string().describe(
      "Required. Details about partner connector use cases.",
    ).optional(),
  }).describe(
    "Partner metadata details. This will be populated when publishing the custom connector as a partner connector version. On publishing, parntner connector version will be created using the fields in PartnerMetadata.",
  ).optional(),
  publishStatus: z.object({
    publishState: z.enum([
      "PUBLISH_STATE_UNSPECIFIED",
      "PUBLISHED",
      "PUBLISH_IN_PROGRESS",
      "UNPUBLISHED",
    ]).describe("Output only. Publish state of the custom connector.")
      .optional(),
    publishTime: z.string().describe("Output only. Publish time.").optional(),
    publishedAs: z.string().describe(
      "Output only. Partner connector name. Will be set on the custom connector. Format: providers/partner/connectors//versions/",
    ).optional(),
    publishedSource: z.string().describe(
      "Output only. Custom connector name. Will be set on the partner connector. Format: providers/customconnectors/connectors//versions/",
    ).optional(),
  }).describe("Publish status of a custom connector.").optional(),
  serviceAccount: z.string().describe(
    "Optional. Service account used by runtime plane to access auth config secrets.",
  ).optional(),
  specLocation: z.string().describe(
    "Optional. Location of the custom connector spec. This is only used for Open API based custom connectors. The location can be either a public url like `https://public-url.com/spec` Or a Google Cloud Storage location like `gs:///`.",
  ).optional(),
  customConnectorVersionId: z.string().describe(
    "Required. Identifier to assign to the CreateCustomConnectorVersion. Must be unique within scope of the parent resource.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
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

/** Swamp extension model for Google Cloud Connectors Global.CustomConnectors.CustomConnectorVersions. Registered at `@swamp/gcp/connectors/global-customconnectors-customconnectorversions`. */
export const model = {
  type: "@swamp/gcp/connectors/global-customconnectors-customconnectorversions",
  version: "2026.06.07.1",
  upgrades: [
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
      description:
        "CustomConnectorVersion indicates a specific version of a connector.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a customConnectorVersions",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["asyncOperationsSupport"] !== undefined) {
          body["asyncOperationsSupport"] = g["asyncOperationsSupport"];
        }
        if (g["authConfig"] !== undefined) body["authConfig"] = g["authConfig"];
        if (g["authConfigTemplates"] !== undefined) {
          body["authConfigTemplates"] = g["authConfigTemplates"];
        }
        if (g["authOverrideSupport"] !== undefined) {
          body["authOverrideSupport"] = g["authOverrideSupport"];
        }
        if (g["backendVariableTemplates"] !== undefined) {
          body["backendVariableTemplates"] = g["backendVariableTemplates"];
        }
        if (g["destinationConfigs"] !== undefined) {
          body["destinationConfigs"] = g["destinationConfigs"];
        }
        if (g["enableBackendDestinationConfig"] !== undefined) {
          body["enableBackendDestinationConfig"] =
            g["enableBackendDestinationConfig"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["partnerMetadata"] !== undefined) {
          body["partnerMetadata"] = g["partnerMetadata"];
        }
        if (g["publishStatus"] !== undefined) {
          body["publishStatus"] = g["publishStatus"];
        }
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["specLocation"] !== undefined) {
          body["specLocation"] = g["specLocation"];
        }
        if (g["customConnectorVersionId"] !== undefined) {
          body["customConnectorVersionId"] = g["customConnectorVersionId"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
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
      description: "Get a customConnectorVersions",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the customConnectorVersions",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
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
      description: "Sync customConnectorVersions state from GCP",
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
      description: "List customConnectorVersions resources",
      arguments: z.object({
        pageSize: z.number().describe("Page size.").optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "customConnectorVersions",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.name?.toString() ?? String(i)).replace(
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
  },
};
