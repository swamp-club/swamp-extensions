// Auto-generated extension model for @swamp/gcp/integrations/products-authconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Application Integration Products.AuthConfigs.
 *
 * The AuthConfig resource use to hold channels and connection config data.
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
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/authConfigs/${shortName}`;
}

const BASE_URL = "https://integrations.googleapis.com/";

const GET_CONFIG = {
  "id": "integrations.projects.locations.products.authConfigs.get",
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
  "id": "integrations.projects.locations.products.authConfigs.create",
  "path": "v1/{+parent}/authConfigs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "clientCertificate.encryptedPrivateKey": {
      "location": "query",
    },
    "clientCertificate.passphrase": {
      "location": "query",
    },
    "clientCertificate.sslCertificate": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "integrations.projects.locations.products.authConfigs.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "clientCertificate.encryptedPrivateKey": {
      "location": "query",
    },
    "clientCertificate.passphrase": {
      "location": "query",
    },
    "clientCertificate.sslCertificate": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "integrations.projects.locations.products.authConfigs.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
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

const LIST_CONFIG = {
  "id": "integrations.projects.locations.products.authConfigs.list",
  "path": "v1/{+parent}/authConfigs",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
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
    "readMask": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  certificateId: z.string().describe("Certificate id for client certificate")
    .optional(),
  creatorEmail: z.string().describe(
    "The creator's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
  ).optional(),
  credentialType: z.enum([
    "CREDENTIAL_TYPE_UNSPECIFIED",
    "USERNAME_AND_PASSWORD",
    "API_KEY",
    "OAUTH2_AUTHORIZATION_CODE",
    "OAUTH2_IMPLICIT",
    "OAUTH2_CLIENT_CREDENTIALS",
    "OAUTH2_RESOURCE_OWNER_CREDENTIALS",
    "JWT",
    "AUTH_TOKEN",
    "SERVICE_ACCOUNT",
    "CLIENT_CERTIFICATE_ONLY",
    "OIDC_TOKEN",
  ]).describe("Required. Credential type of the encrypted credential.")
    .optional(),
  decryptedCredential: z.object({
    authToken: z.object({
      token: z.string().describe("The token for the auth type.").optional(),
      type: z.string().describe(
        'Authentication type, e.g. "Basic", "Bearer", etc.',
      ).optional(),
    }).describe(
      "The credentials to authenticate a user agent with a server that is put in HTTP Authorization request header.",
    ).optional(),
    credentialType: z.enum([
      "CREDENTIAL_TYPE_UNSPECIFIED",
      "USERNAME_AND_PASSWORD",
      "API_KEY",
      "OAUTH2_AUTHORIZATION_CODE",
      "OAUTH2_IMPLICIT",
      "OAUTH2_CLIENT_CREDENTIALS",
      "OAUTH2_RESOURCE_OWNER_CREDENTIALS",
      "JWT",
      "AUTH_TOKEN",
      "SERVICE_ACCOUNT",
      "CLIENT_CERTIFICATE_ONLY",
      "OIDC_TOKEN",
    ]).describe("Credential type associated with auth config.").optional(),
    jwt: z.object({
      jwt: z.string().describe(
        "The token calculated by the header, payload and signature.",
      ).optional(),
      jwtHeader: z.string().describe(
        "Identifies which algorithm is used to generate the signature.",
      ).optional(),
      jwtPayload: z.string().describe(
        "Contains a set of claims. The JWT specification defines seven Registered Claim Names which are the standard fields commonly included in tokens. Custom claims are usually also included, depending on the purpose of the token.",
      ).optional(),
      secret: z.string().describe("User's pre-shared secret to sign the token.")
        .optional(),
    }).describe(
      "Represents JSON web token(JWT), which is a compact, URL-safe means of representing claims to be transferred between two parties, enabling the claims to be digitally signed or integrity protected.",
    ).optional(),
    oauth2AuthorizationCode: z.object({
      accessToken: z.object({
        accessToken: z.string().describe(
          "The access token encapsulating the security identity of a process or thread.",
        ).optional(),
        accessTokenExpireTime: z.string().describe(
          "Required. The approximate time until the access token retrieved is valid.",
        ).optional(),
        refreshToken: z.string().describe(
          "If the access token will expire, use the refresh token to obtain another access token.",
        ).optional(),
        refreshTokenExpireTime: z.string().describe(
          "The approximate time until the refresh token retrieved is valid.",
        ).optional(),
        tokenType: z.string().describe(
          'Only support "bearer" token in v1 as bearer token is the predominant type used with OAuth 2.0.',
        ).optional(),
      }).describe(
        "The access token represents the authorization of a specific application to access specific parts of a user’s data.",
      ).optional(),
      applyReauthPolicy: z.boolean().describe(
        "Indicates if the user has opted in Google Reauth Policy. If opted in, the refresh token will be valid for 20 hours, after which time users must re-authenticate in order to obtain a new one.",
      ).optional(),
      authCode: z.string().describe(
        "The Auth Code that is used to initially retrieve the access token.",
      ).optional(),
      authEndpoint: z.string().describe(
        "The auth url endpoint to send the auth code request to.",
      ).optional(),
      authParams: z.object({
        entries: z.array(z.object({
          key: z.unknown().describe(
            "Field represents either the key or value in an entry.",
          ).optional(),
          value: z.unknown().describe(
            "Field represents either the key or value in an entry.",
          ).optional(),
        })).describe("A list of parameter map entries.").optional(),
        keyType: z.enum([
          "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED",
          "STRING_VALUE",
          "INT_VALUE",
          "DOUBLE_VALUE",
          "BOOLEAN_VALUE",
          "STRING_ARRAY",
          "INT_ARRAY",
          "DOUBLE_ARRAY",
          "BOOLEAN_ARRAY",
          "JSON_VALUE",
          "PROTO_VALUE",
          "PROTO_ARRAY",
          "NON_SERIALIZABLE_OBJECT",
          "PROTO_ENUM",
          "SERIALIZED_OBJECT_VALUE",
          "PROTO_ENUM_ARRAY",
          "BYTES",
          "BYTES_ARRAY",
        ]).describe(
          "Option to specify key type for all entries of the map. If provided then field types for all entries must conform to this.",
        ).optional(),
        valueType: z.enum([
          "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED",
          "STRING_VALUE",
          "INT_VALUE",
          "DOUBLE_VALUE",
          "BOOLEAN_VALUE",
          "STRING_ARRAY",
          "INT_ARRAY",
          "DOUBLE_ARRAY",
          "BOOLEAN_ARRAY",
          "JSON_VALUE",
          "PROTO_VALUE",
          "PROTO_ARRAY",
          "NON_SERIALIZABLE_OBJECT",
          "PROTO_ENUM",
          "SERIALIZED_OBJECT_VALUE",
          "PROTO_ENUM_ARRAY",
          "BYTES",
          "BYTES_ARRAY",
        ]).describe(
          "Option to specify value type for all entries of the map. If provided then field types for all entries must conform to this.",
        ).optional(),
      }).describe(
        "A generic multi-map that holds key value pairs. They keys and values can be of any type, unless specified.",
      ).optional(),
      clientId: z.string().describe("The client's id.").optional(),
      clientSecret: z.string().describe("The client's secret.").optional(),
      requestType: z.enum([
        "REQUEST_TYPE_UNSPECIFIED",
        "REQUEST_BODY",
        "QUERY_PARAMETERS",
        "ENCODED_HEADER",
      ]).describe("Represent how to pass parameters to fetch access token")
        .optional(),
      scope: z.string().describe(
        "A space-delimited list of requested scope permissions.",
      ).optional(),
      tokenEndpoint: z.string().describe(
        "The token url endpoint to send the token request to.",
      ).optional(),
      tokenParams: z.object({
        entries: z.array(z.object({
          key: z.unknown().describe(
            "Field represents either the key or value in an entry.",
          ).optional(),
          value: z.unknown().describe(
            "Field represents either the key or value in an entry.",
          ).optional(),
        })).describe("A list of parameter map entries.").optional(),
        keyType: z.enum([
          "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED",
          "STRING_VALUE",
          "INT_VALUE",
          "DOUBLE_VALUE",
          "BOOLEAN_VALUE",
          "STRING_ARRAY",
          "INT_ARRAY",
          "DOUBLE_ARRAY",
          "BOOLEAN_ARRAY",
          "JSON_VALUE",
          "PROTO_VALUE",
          "PROTO_ARRAY",
          "NON_SERIALIZABLE_OBJECT",
          "PROTO_ENUM",
          "SERIALIZED_OBJECT_VALUE",
          "PROTO_ENUM_ARRAY",
          "BYTES",
          "BYTES_ARRAY",
        ]).describe(
          "Option to specify key type for all entries of the map. If provided then field types for all entries must conform to this.",
        ).optional(),
        valueType: z.enum([
          "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED",
          "STRING_VALUE",
          "INT_VALUE",
          "DOUBLE_VALUE",
          "BOOLEAN_VALUE",
          "STRING_ARRAY",
          "INT_ARRAY",
          "DOUBLE_ARRAY",
          "BOOLEAN_ARRAY",
          "JSON_VALUE",
          "PROTO_VALUE",
          "PROTO_ARRAY",
          "NON_SERIALIZABLE_OBJECT",
          "PROTO_ENUM",
          "SERIALIZED_OBJECT_VALUE",
          "PROTO_ENUM_ARRAY",
          "BYTES",
          "BYTES_ARRAY",
        ]).describe(
          "Option to specify value type for all entries of the map. If provided then field types for all entries must conform to this.",
        ).optional(),
      }).describe(
        "A generic multi-map that holds key value pairs. They keys and values can be of any type, unless specified.",
      ).optional(),
    }).describe(
      "The OAuth Type where the client sends request with the client id and requested scopes to auth endpoint. User sees a consent screen and auth code is received at specified redirect url afterwards. The auth code is then combined with the client id and secret and sent to the token endpoint in exchange for the access and refresh token. The refresh token can be used to fetch new access tokens.",
    ).optional(),
    oauth2ClientCredentials: z.object({
      accessToken: z.object({
        accessToken: z.string().describe(
          "The access token encapsulating the security identity of a process or thread.",
        ).optional(),
        accessTokenExpireTime: z.string().describe(
          "Required. The approximate time until the access token retrieved is valid.",
        ).optional(),
        refreshToken: z.string().describe(
          "If the access token will expire, use the refresh token to obtain another access token.",
        ).optional(),
        refreshTokenExpireTime: z.string().describe(
          "The approximate time until the refresh token retrieved is valid.",
        ).optional(),
        tokenType: z.string().describe(
          'Only support "bearer" token in v1 as bearer token is the predominant type used with OAuth 2.0.',
        ).optional(),
      }).describe(
        "The access token represents the authorization of a specific application to access specific parts of a user’s data.",
      ).optional(),
      clientId: z.string().describe("The client's ID.").optional(),
      clientSecret: z.string().describe("The client's secret.").optional(),
      requestType: z.enum([
        "REQUEST_TYPE_UNSPECIFIED",
        "REQUEST_BODY",
        "QUERY_PARAMETERS",
        "ENCODED_HEADER",
      ]).describe("Represent how to pass parameters to fetch access token")
        .optional(),
      scope: z.string().describe(
        "A space-delimited list of requested scope permissions.",
      ).optional(),
      tokenEndpoint: z.string().describe(
        "The token endpoint is used by the client to obtain an access token by presenting its authorization grant or refresh token.",
      ).optional(),
      tokenParams: z.object({
        entries: z.array(z.object({
          key: z.unknown().describe(
            "Field represents either the key or value in an entry.",
          ).optional(),
          value: z.unknown().describe(
            "Field represents either the key or value in an entry.",
          ).optional(),
        })).describe("A list of parameter map entries.").optional(),
        keyType: z.enum([
          "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED",
          "STRING_VALUE",
          "INT_VALUE",
          "DOUBLE_VALUE",
          "BOOLEAN_VALUE",
          "STRING_ARRAY",
          "INT_ARRAY",
          "DOUBLE_ARRAY",
          "BOOLEAN_ARRAY",
          "JSON_VALUE",
          "PROTO_VALUE",
          "PROTO_ARRAY",
          "NON_SERIALIZABLE_OBJECT",
          "PROTO_ENUM",
          "SERIALIZED_OBJECT_VALUE",
          "PROTO_ENUM_ARRAY",
          "BYTES",
          "BYTES_ARRAY",
        ]).describe(
          "Option to specify key type for all entries of the map. If provided then field types for all entries must conform to this.",
        ).optional(),
        valueType: z.enum([
          "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED",
          "STRING_VALUE",
          "INT_VALUE",
          "DOUBLE_VALUE",
          "BOOLEAN_VALUE",
          "STRING_ARRAY",
          "INT_ARRAY",
          "DOUBLE_ARRAY",
          "BOOLEAN_ARRAY",
          "JSON_VALUE",
          "PROTO_VALUE",
          "PROTO_ARRAY",
          "NON_SERIALIZABLE_OBJECT",
          "PROTO_ENUM",
          "SERIALIZED_OBJECT_VALUE",
          "PROTO_ENUM_ARRAY",
          "BYTES",
          "BYTES_ARRAY",
        ]).describe(
          "Option to specify value type for all entries of the map. If provided then field types for all entries must conform to this.",
        ).optional(),
      }).describe(
        "A generic multi-map that holds key value pairs. They keys and values can be of any type, unless specified.",
      ).optional(),
    }).describe(
      "For client credentials grant, the client sends a POST request with grant_type as 'client_credentials' to the authorization server. The authorization server will respond with a JSON object containing the access token.",
    ).optional(),
    oauth2ResourceOwnerCredentials: z.object({
      accessToken: z.object({
        accessToken: z.string().describe(
          "The access token encapsulating the security identity of a process or thread.",
        ).optional(),
        accessTokenExpireTime: z.string().describe(
          "Required. The approximate time until the access token retrieved is valid.",
        ).optional(),
        refreshToken: z.string().describe(
          "If the access token will expire, use the refresh token to obtain another access token.",
        ).optional(),
        refreshTokenExpireTime: z.string().describe(
          "The approximate time until the refresh token retrieved is valid.",
        ).optional(),
        tokenType: z.string().describe(
          'Only support "bearer" token in v1 as bearer token is the predominant type used with OAuth 2.0.',
        ).optional(),
      }).describe(
        "The access token represents the authorization of a specific application to access specific parts of a user’s data.",
      ).optional(),
      clientId: z.string().describe("The client's ID.").optional(),
      clientSecret: z.string().describe("The client's secret.").optional(),
      password: z.string().describe("The user's password.").optional(),
      requestType: z.enum([
        "REQUEST_TYPE_UNSPECIFIED",
        "REQUEST_BODY",
        "QUERY_PARAMETERS",
        "ENCODED_HEADER",
      ]).describe("Represent how to pass parameters to fetch access token")
        .optional(),
      scope: z.string().describe(
        "A space-delimited list of requested scope permissions.",
      ).optional(),
      tokenEndpoint: z.string().describe(
        "The token endpoint is used by the client to obtain an access token by presenting its authorization grant or refresh token.",
      ).optional(),
      tokenParams: z.object({
        entries: z.array(z.object({
          key: z.unknown().describe(
            "Field represents either the key or value in an entry.",
          ).optional(),
          value: z.unknown().describe(
            "Field represents either the key or value in an entry.",
          ).optional(),
        })).describe("A list of parameter map entries.").optional(),
        keyType: z.enum([
          "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED",
          "STRING_VALUE",
          "INT_VALUE",
          "DOUBLE_VALUE",
          "BOOLEAN_VALUE",
          "STRING_ARRAY",
          "INT_ARRAY",
          "DOUBLE_ARRAY",
          "BOOLEAN_ARRAY",
          "JSON_VALUE",
          "PROTO_VALUE",
          "PROTO_ARRAY",
          "NON_SERIALIZABLE_OBJECT",
          "PROTO_ENUM",
          "SERIALIZED_OBJECT_VALUE",
          "PROTO_ENUM_ARRAY",
          "BYTES",
          "BYTES_ARRAY",
        ]).describe(
          "Option to specify key type for all entries of the map. If provided then field types for all entries must conform to this.",
        ).optional(),
        valueType: z.enum([
          "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED",
          "STRING_VALUE",
          "INT_VALUE",
          "DOUBLE_VALUE",
          "BOOLEAN_VALUE",
          "STRING_ARRAY",
          "INT_ARRAY",
          "DOUBLE_ARRAY",
          "BOOLEAN_ARRAY",
          "JSON_VALUE",
          "PROTO_VALUE",
          "PROTO_ARRAY",
          "NON_SERIALIZABLE_OBJECT",
          "PROTO_ENUM",
          "SERIALIZED_OBJECT_VALUE",
          "PROTO_ENUM_ARRAY",
          "BYTES",
          "BYTES_ARRAY",
        ]).describe(
          "Option to specify value type for all entries of the map. If provided then field types for all entries must conform to this.",
        ).optional(),
      }).describe(
        "A generic multi-map that holds key value pairs. They keys and values can be of any type, unless specified.",
      ).optional(),
      username: z.string().describe("The user's username.").optional(),
    }).describe(
      "For resource owner credentials grant, the client will ask the user for their authorization credentials (ususally a username and password) and send a POST request to the authorization server. The authorization server will respond with a JSON object containing the access token.",
    ).optional(),
    oidcToken: z.object({
      audience: z.string().describe(
        "Audience to be used when generating OIDC token. The audience claim identifies the recipients that the JWT is intended for.",
      ).optional(),
      serviceAccountEmail: z.string().describe(
        "The service account email to be used as the identity for the token.",
      ).optional(),
      token: z.string().describe("ID token obtained for the service account")
        .optional(),
      tokenExpireTime: z.string().describe(
        "The approximate time until the token retrieved is valid.",
      ).optional(),
    }).describe("OIDC Token").optional(),
    serviceAccountCredentials: z.object({
      scope: z.string().describe(
        "A space-delimited list of requested scope permissions.",
      ).optional(),
      serviceAccount: z.string().describe(
        "Name of the service account that has the permission to make the request.",
      ).optional(),
    }).describe(
      "Represents the service account which can be used to generate access token for authenticating the service call.",
    ).optional(),
    usernameAndPassword: z.object({
      password: z.string().describe("Password to be used").optional(),
      username: z.string().describe("Username to be used").optional(),
    }).describe("Username and password pair.").optional(),
  }).describe("Defines parameters for a single, canonical credential.")
    .optional(),
  description: z.string().describe(
    "Optional. A description of the auth config.",
  ).optional(),
  displayName: z.string().describe("Required. The name of the auth config.")
    .optional(),
  encryptedCredential: z.string().describe(
    "Auth credential encrypted by Cloud KMS. Can be decrypted as Credential with proper KMS key.",
  ).optional(),
  expiryNotificationDuration: z.array(z.string()).describe(
    "Optional. User can define the time to receive notification after which the auth config becomes invalid. Support up to 30 days. Support granularity in hours.",
  ).optional(),
  lastModifierEmail: z.string().describe(
    "The last modifier's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
  ).optional(),
  name: z.string().describe(
    "Resource name of the auth config. For more information, see Manage authentication profiles. projects/{project}/locations/{location}/authConfigs/{authConfig}.",
  ).optional(),
  overrideValidTime: z.string().describe(
    "Optional. User provided expiry time to override. For the example of Salesforce, username/password credentials can be valid for 6 months depending on the instance settings.",
  ).optional(),
  validTime: z.string().describe(
    "Optional. The time until the auth config is valid. Empty or max value is considered the auth config won't expire.",
  ).optional(),
  visibility: z.enum([
    "AUTH_CONFIG_VISIBILITY_UNSPECIFIED",
    "PRIVATE",
    "CLIENT_VISIBLE",
  ]).describe("Optional. The visibility of the auth config.").optional(),
  clientCertificate_encryptedPrivateKey: z.string().describe(
    "The ssl certificate encoded in PEM format. This string must include the begin header and end footer lines. For example, -----BEGIN CERTIFICATE----- MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1 JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE-----",
  ).optional(),
  clientCertificate_passphrase: z.string().describe(
    "'passphrase' should be left unset if private key is not encrypted. Note that 'passphrase' is not the password for web server, but an extra layer of security to protected private key.",
  ).optional(),
  clientCertificate_sslCertificate: z.string().describe(
    "The ssl certificate encoded in PEM format. This string must include the begin header and end footer lines. For example, -----BEGIN CERTIFICATE----- MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1 JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE-----",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  certificateId: z.string().optional(),
  createTime: z.string().optional(),
  creatorEmail: z.string().optional(),
  credentialType: z.string().optional(),
  decryptedCredential: z.object({
    authToken: z.object({
      token: z.string(),
      type: z.string(),
    }),
    credentialType: z.string(),
    jwt: z.object({
      jwt: z.string(),
      jwtHeader: z.string(),
      jwtPayload: z.string(),
      secret: z.string(),
    }),
    oauth2AuthorizationCode: z.object({
      accessToken: z.object({
        accessToken: z.string(),
        accessTokenExpireTime: z.string(),
        refreshToken: z.string(),
        refreshTokenExpireTime: z.string(),
        tokenType: z.string(),
      }),
      applyReauthPolicy: z.boolean(),
      authCode: z.string(),
      authEndpoint: z.string(),
      authParams: z.object({
        entries: z.array(z.object({
          key: z.unknown(),
          value: z.unknown(),
        })),
        keyType: z.string(),
        valueType: z.string(),
      }),
      clientId: z.string(),
      clientSecret: z.string(),
      requestType: z.string(),
      scope: z.string(),
      tokenEndpoint: z.string(),
      tokenParams: z.object({
        entries: z.array(z.object({
          key: z.unknown(),
          value: z.unknown(),
        })),
        keyType: z.string(),
        valueType: z.string(),
      }),
    }),
    oauth2ClientCredentials: z.object({
      accessToken: z.object({
        accessToken: z.string(),
        accessTokenExpireTime: z.string(),
        refreshToken: z.string(),
        refreshTokenExpireTime: z.string(),
        tokenType: z.string(),
      }),
      clientId: z.string(),
      clientSecret: z.string(),
      requestType: z.string(),
      scope: z.string(),
      tokenEndpoint: z.string(),
      tokenParams: z.object({
        entries: z.array(z.object({
          key: z.unknown(),
          value: z.unknown(),
        })),
        keyType: z.string(),
        valueType: z.string(),
      }),
    }),
    oauth2ResourceOwnerCredentials: z.object({
      accessToken: z.object({
        accessToken: z.string(),
        accessTokenExpireTime: z.string(),
        refreshToken: z.string(),
        refreshTokenExpireTime: z.string(),
        tokenType: z.string(),
      }),
      clientId: z.string(),
      clientSecret: z.string(),
      password: z.string(),
      requestType: z.string(),
      scope: z.string(),
      tokenEndpoint: z.string(),
      tokenParams: z.object({
        entries: z.array(z.object({
          key: z.unknown(),
          value: z.unknown(),
        })),
        keyType: z.string(),
        valueType: z.string(),
      }),
      username: z.string(),
    }),
    oidcToken: z.object({
      audience: z.string(),
      serviceAccountEmail: z.string(),
      token: z.string(),
      tokenExpireTime: z.string(),
    }),
    serviceAccountCredentials: z.object({
      scope: z.string(),
      serviceAccount: z.string(),
    }),
    usernameAndPassword: z.object({
      password: z.string(),
      username: z.string(),
    }),
  }).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  encryptedCredential: z.string().optional(),
  expiryNotificationDuration: z.array(z.string()).optional(),
  lastModifierEmail: z.string().optional(),
  name: z.string(),
  overrideValidTime: z.string().optional(),
  reason: z.string().optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
  validTime: z.string().optional(),
  visibility: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  certificateId: z.string().describe("Certificate id for client certificate")
    .optional(),
  creatorEmail: z.string().describe(
    "The creator's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
  ).optional(),
  credentialType: z.enum([
    "CREDENTIAL_TYPE_UNSPECIFIED",
    "USERNAME_AND_PASSWORD",
    "API_KEY",
    "OAUTH2_AUTHORIZATION_CODE",
    "OAUTH2_IMPLICIT",
    "OAUTH2_CLIENT_CREDENTIALS",
    "OAUTH2_RESOURCE_OWNER_CREDENTIALS",
    "JWT",
    "AUTH_TOKEN",
    "SERVICE_ACCOUNT",
    "CLIENT_CERTIFICATE_ONLY",
    "OIDC_TOKEN",
  ]).describe("Required. Credential type of the encrypted credential.")
    .optional(),
  decryptedCredential: z.object({
    authToken: z.object({
      token: z.string().describe("The token for the auth type.").optional(),
      type: z.string().describe(
        'Authentication type, e.g. "Basic", "Bearer", etc.',
      ).optional(),
    }).describe(
      "The credentials to authenticate a user agent with a server that is put in HTTP Authorization request header.",
    ).optional(),
    credentialType: z.enum([
      "CREDENTIAL_TYPE_UNSPECIFIED",
      "USERNAME_AND_PASSWORD",
      "API_KEY",
      "OAUTH2_AUTHORIZATION_CODE",
      "OAUTH2_IMPLICIT",
      "OAUTH2_CLIENT_CREDENTIALS",
      "OAUTH2_RESOURCE_OWNER_CREDENTIALS",
      "JWT",
      "AUTH_TOKEN",
      "SERVICE_ACCOUNT",
      "CLIENT_CERTIFICATE_ONLY",
      "OIDC_TOKEN",
    ]).describe("Credential type associated with auth config.").optional(),
    jwt: z.object({
      jwt: z.string().describe(
        "The token calculated by the header, payload and signature.",
      ).optional(),
      jwtHeader: z.string().describe(
        "Identifies which algorithm is used to generate the signature.",
      ).optional(),
      jwtPayload: z.string().describe(
        "Contains a set of claims. The JWT specification defines seven Registered Claim Names which are the standard fields commonly included in tokens. Custom claims are usually also included, depending on the purpose of the token.",
      ).optional(),
      secret: z.string().describe("User's pre-shared secret to sign the token.")
        .optional(),
    }).describe(
      "Represents JSON web token(JWT), which is a compact, URL-safe means of representing claims to be transferred between two parties, enabling the claims to be digitally signed or integrity protected.",
    ).optional(),
    oauth2AuthorizationCode: z.object({
      accessToken: z.object({
        accessToken: z.string().describe(
          "The access token encapsulating the security identity of a process or thread.",
        ).optional(),
        accessTokenExpireTime: z.string().describe(
          "Required. The approximate time until the access token retrieved is valid.",
        ).optional(),
        refreshToken: z.string().describe(
          "If the access token will expire, use the refresh token to obtain another access token.",
        ).optional(),
        refreshTokenExpireTime: z.string().describe(
          "The approximate time until the refresh token retrieved is valid.",
        ).optional(),
        tokenType: z.string().describe(
          'Only support "bearer" token in v1 as bearer token is the predominant type used with OAuth 2.0.',
        ).optional(),
      }).describe(
        "The access token represents the authorization of a specific application to access specific parts of a user’s data.",
      ).optional(),
      applyReauthPolicy: z.boolean().describe(
        "Indicates if the user has opted in Google Reauth Policy. If opted in, the refresh token will be valid for 20 hours, after which time users must re-authenticate in order to obtain a new one.",
      ).optional(),
      authCode: z.string().describe(
        "The Auth Code that is used to initially retrieve the access token.",
      ).optional(),
      authEndpoint: z.string().describe(
        "The auth url endpoint to send the auth code request to.",
      ).optional(),
      authParams: z.object({
        entries: z.array(z.object({
          key: z.unknown().describe(
            "Field represents either the key or value in an entry.",
          ).optional(),
          value: z.unknown().describe(
            "Field represents either the key or value in an entry.",
          ).optional(),
        })).describe("A list of parameter map entries.").optional(),
        keyType: z.enum([
          "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED",
          "STRING_VALUE",
          "INT_VALUE",
          "DOUBLE_VALUE",
          "BOOLEAN_VALUE",
          "STRING_ARRAY",
          "INT_ARRAY",
          "DOUBLE_ARRAY",
          "BOOLEAN_ARRAY",
          "JSON_VALUE",
          "PROTO_VALUE",
          "PROTO_ARRAY",
          "NON_SERIALIZABLE_OBJECT",
          "PROTO_ENUM",
          "SERIALIZED_OBJECT_VALUE",
          "PROTO_ENUM_ARRAY",
          "BYTES",
          "BYTES_ARRAY",
        ]).describe(
          "Option to specify key type for all entries of the map. If provided then field types for all entries must conform to this.",
        ).optional(),
        valueType: z.enum([
          "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED",
          "STRING_VALUE",
          "INT_VALUE",
          "DOUBLE_VALUE",
          "BOOLEAN_VALUE",
          "STRING_ARRAY",
          "INT_ARRAY",
          "DOUBLE_ARRAY",
          "BOOLEAN_ARRAY",
          "JSON_VALUE",
          "PROTO_VALUE",
          "PROTO_ARRAY",
          "NON_SERIALIZABLE_OBJECT",
          "PROTO_ENUM",
          "SERIALIZED_OBJECT_VALUE",
          "PROTO_ENUM_ARRAY",
          "BYTES",
          "BYTES_ARRAY",
        ]).describe(
          "Option to specify value type for all entries of the map. If provided then field types for all entries must conform to this.",
        ).optional(),
      }).describe(
        "A generic multi-map that holds key value pairs. They keys and values can be of any type, unless specified.",
      ).optional(),
      clientId: z.string().describe("The client's id.").optional(),
      clientSecret: z.string().describe("The client's secret.").optional(),
      requestType: z.enum([
        "REQUEST_TYPE_UNSPECIFIED",
        "REQUEST_BODY",
        "QUERY_PARAMETERS",
        "ENCODED_HEADER",
      ]).describe("Represent how to pass parameters to fetch access token")
        .optional(),
      scope: z.string().describe(
        "A space-delimited list of requested scope permissions.",
      ).optional(),
      tokenEndpoint: z.string().describe(
        "The token url endpoint to send the token request to.",
      ).optional(),
      tokenParams: z.object({
        entries: z.array(z.object({
          key: z.unknown().describe(
            "Field represents either the key or value in an entry.",
          ).optional(),
          value: z.unknown().describe(
            "Field represents either the key or value in an entry.",
          ).optional(),
        })).describe("A list of parameter map entries.").optional(),
        keyType: z.enum([
          "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED",
          "STRING_VALUE",
          "INT_VALUE",
          "DOUBLE_VALUE",
          "BOOLEAN_VALUE",
          "STRING_ARRAY",
          "INT_ARRAY",
          "DOUBLE_ARRAY",
          "BOOLEAN_ARRAY",
          "JSON_VALUE",
          "PROTO_VALUE",
          "PROTO_ARRAY",
          "NON_SERIALIZABLE_OBJECT",
          "PROTO_ENUM",
          "SERIALIZED_OBJECT_VALUE",
          "PROTO_ENUM_ARRAY",
          "BYTES",
          "BYTES_ARRAY",
        ]).describe(
          "Option to specify key type for all entries of the map. If provided then field types for all entries must conform to this.",
        ).optional(),
        valueType: z.enum([
          "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED",
          "STRING_VALUE",
          "INT_VALUE",
          "DOUBLE_VALUE",
          "BOOLEAN_VALUE",
          "STRING_ARRAY",
          "INT_ARRAY",
          "DOUBLE_ARRAY",
          "BOOLEAN_ARRAY",
          "JSON_VALUE",
          "PROTO_VALUE",
          "PROTO_ARRAY",
          "NON_SERIALIZABLE_OBJECT",
          "PROTO_ENUM",
          "SERIALIZED_OBJECT_VALUE",
          "PROTO_ENUM_ARRAY",
          "BYTES",
          "BYTES_ARRAY",
        ]).describe(
          "Option to specify value type for all entries of the map. If provided then field types for all entries must conform to this.",
        ).optional(),
      }).describe(
        "A generic multi-map that holds key value pairs. They keys and values can be of any type, unless specified.",
      ).optional(),
    }).describe(
      "The OAuth Type where the client sends request with the client id and requested scopes to auth endpoint. User sees a consent screen and auth code is received at specified redirect url afterwards. The auth code is then combined with the client id and secret and sent to the token endpoint in exchange for the access and refresh token. The refresh token can be used to fetch new access tokens.",
    ).optional(),
    oauth2ClientCredentials: z.object({
      accessToken: z.object({
        accessToken: z.string().describe(
          "The access token encapsulating the security identity of a process or thread.",
        ).optional(),
        accessTokenExpireTime: z.string().describe(
          "Required. The approximate time until the access token retrieved is valid.",
        ).optional(),
        refreshToken: z.string().describe(
          "If the access token will expire, use the refresh token to obtain another access token.",
        ).optional(),
        refreshTokenExpireTime: z.string().describe(
          "The approximate time until the refresh token retrieved is valid.",
        ).optional(),
        tokenType: z.string().describe(
          'Only support "bearer" token in v1 as bearer token is the predominant type used with OAuth 2.0.',
        ).optional(),
      }).describe(
        "The access token represents the authorization of a specific application to access specific parts of a user’s data.",
      ).optional(),
      clientId: z.string().describe("The client's ID.").optional(),
      clientSecret: z.string().describe("The client's secret.").optional(),
      requestType: z.enum([
        "REQUEST_TYPE_UNSPECIFIED",
        "REQUEST_BODY",
        "QUERY_PARAMETERS",
        "ENCODED_HEADER",
      ]).describe("Represent how to pass parameters to fetch access token")
        .optional(),
      scope: z.string().describe(
        "A space-delimited list of requested scope permissions.",
      ).optional(),
      tokenEndpoint: z.string().describe(
        "The token endpoint is used by the client to obtain an access token by presenting its authorization grant or refresh token.",
      ).optional(),
      tokenParams: z.object({
        entries: z.array(z.object({
          key: z.unknown().describe(
            "Field represents either the key or value in an entry.",
          ).optional(),
          value: z.unknown().describe(
            "Field represents either the key or value in an entry.",
          ).optional(),
        })).describe("A list of parameter map entries.").optional(),
        keyType: z.enum([
          "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED",
          "STRING_VALUE",
          "INT_VALUE",
          "DOUBLE_VALUE",
          "BOOLEAN_VALUE",
          "STRING_ARRAY",
          "INT_ARRAY",
          "DOUBLE_ARRAY",
          "BOOLEAN_ARRAY",
          "JSON_VALUE",
          "PROTO_VALUE",
          "PROTO_ARRAY",
          "NON_SERIALIZABLE_OBJECT",
          "PROTO_ENUM",
          "SERIALIZED_OBJECT_VALUE",
          "PROTO_ENUM_ARRAY",
          "BYTES",
          "BYTES_ARRAY",
        ]).describe(
          "Option to specify key type for all entries of the map. If provided then field types for all entries must conform to this.",
        ).optional(),
        valueType: z.enum([
          "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED",
          "STRING_VALUE",
          "INT_VALUE",
          "DOUBLE_VALUE",
          "BOOLEAN_VALUE",
          "STRING_ARRAY",
          "INT_ARRAY",
          "DOUBLE_ARRAY",
          "BOOLEAN_ARRAY",
          "JSON_VALUE",
          "PROTO_VALUE",
          "PROTO_ARRAY",
          "NON_SERIALIZABLE_OBJECT",
          "PROTO_ENUM",
          "SERIALIZED_OBJECT_VALUE",
          "PROTO_ENUM_ARRAY",
          "BYTES",
          "BYTES_ARRAY",
        ]).describe(
          "Option to specify value type for all entries of the map. If provided then field types for all entries must conform to this.",
        ).optional(),
      }).describe(
        "A generic multi-map that holds key value pairs. They keys and values can be of any type, unless specified.",
      ).optional(),
    }).describe(
      "For client credentials grant, the client sends a POST request with grant_type as 'client_credentials' to the authorization server. The authorization server will respond with a JSON object containing the access token.",
    ).optional(),
    oauth2ResourceOwnerCredentials: z.object({
      accessToken: z.object({
        accessToken: z.string().describe(
          "The access token encapsulating the security identity of a process or thread.",
        ).optional(),
        accessTokenExpireTime: z.string().describe(
          "Required. The approximate time until the access token retrieved is valid.",
        ).optional(),
        refreshToken: z.string().describe(
          "If the access token will expire, use the refresh token to obtain another access token.",
        ).optional(),
        refreshTokenExpireTime: z.string().describe(
          "The approximate time until the refresh token retrieved is valid.",
        ).optional(),
        tokenType: z.string().describe(
          'Only support "bearer" token in v1 as bearer token is the predominant type used with OAuth 2.0.',
        ).optional(),
      }).describe(
        "The access token represents the authorization of a specific application to access specific parts of a user’s data.",
      ).optional(),
      clientId: z.string().describe("The client's ID.").optional(),
      clientSecret: z.string().describe("The client's secret.").optional(),
      password: z.string().describe("The user's password.").optional(),
      requestType: z.enum([
        "REQUEST_TYPE_UNSPECIFIED",
        "REQUEST_BODY",
        "QUERY_PARAMETERS",
        "ENCODED_HEADER",
      ]).describe("Represent how to pass parameters to fetch access token")
        .optional(),
      scope: z.string().describe(
        "A space-delimited list of requested scope permissions.",
      ).optional(),
      tokenEndpoint: z.string().describe(
        "The token endpoint is used by the client to obtain an access token by presenting its authorization grant or refresh token.",
      ).optional(),
      tokenParams: z.object({
        entries: z.array(z.object({
          key: z.unknown().describe(
            "Field represents either the key or value in an entry.",
          ).optional(),
          value: z.unknown().describe(
            "Field represents either the key or value in an entry.",
          ).optional(),
        })).describe("A list of parameter map entries.").optional(),
        keyType: z.enum([
          "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED",
          "STRING_VALUE",
          "INT_VALUE",
          "DOUBLE_VALUE",
          "BOOLEAN_VALUE",
          "STRING_ARRAY",
          "INT_ARRAY",
          "DOUBLE_ARRAY",
          "BOOLEAN_ARRAY",
          "JSON_VALUE",
          "PROTO_VALUE",
          "PROTO_ARRAY",
          "NON_SERIALIZABLE_OBJECT",
          "PROTO_ENUM",
          "SERIALIZED_OBJECT_VALUE",
          "PROTO_ENUM_ARRAY",
          "BYTES",
          "BYTES_ARRAY",
        ]).describe(
          "Option to specify key type for all entries of the map. If provided then field types for all entries must conform to this.",
        ).optional(),
        valueType: z.enum([
          "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED",
          "STRING_VALUE",
          "INT_VALUE",
          "DOUBLE_VALUE",
          "BOOLEAN_VALUE",
          "STRING_ARRAY",
          "INT_ARRAY",
          "DOUBLE_ARRAY",
          "BOOLEAN_ARRAY",
          "JSON_VALUE",
          "PROTO_VALUE",
          "PROTO_ARRAY",
          "NON_SERIALIZABLE_OBJECT",
          "PROTO_ENUM",
          "SERIALIZED_OBJECT_VALUE",
          "PROTO_ENUM_ARRAY",
          "BYTES",
          "BYTES_ARRAY",
        ]).describe(
          "Option to specify value type for all entries of the map. If provided then field types for all entries must conform to this.",
        ).optional(),
      }).describe(
        "A generic multi-map that holds key value pairs. They keys and values can be of any type, unless specified.",
      ).optional(),
      username: z.string().describe("The user's username.").optional(),
    }).describe(
      "For resource owner credentials grant, the client will ask the user for their authorization credentials (ususally a username and password) and send a POST request to the authorization server. The authorization server will respond with a JSON object containing the access token.",
    ).optional(),
    oidcToken: z.object({
      audience: z.string().describe(
        "Audience to be used when generating OIDC token. The audience claim identifies the recipients that the JWT is intended for.",
      ).optional(),
      serviceAccountEmail: z.string().describe(
        "The service account email to be used as the identity for the token.",
      ).optional(),
      token: z.string().describe("ID token obtained for the service account")
        .optional(),
      tokenExpireTime: z.string().describe(
        "The approximate time until the token retrieved is valid.",
      ).optional(),
    }).describe("OIDC Token").optional(),
    serviceAccountCredentials: z.object({
      scope: z.string().describe(
        "A space-delimited list of requested scope permissions.",
      ).optional(),
      serviceAccount: z.string().describe(
        "Name of the service account that has the permission to make the request.",
      ).optional(),
    }).describe(
      "Represents the service account which can be used to generate access token for authenticating the service call.",
    ).optional(),
    usernameAndPassword: z.object({
      password: z.string().describe("Password to be used").optional(),
      username: z.string().describe("Username to be used").optional(),
    }).describe("Username and password pair.").optional(),
  }).describe("Defines parameters for a single, canonical credential.")
    .optional(),
  description: z.string().describe(
    "Optional. A description of the auth config.",
  ).optional(),
  displayName: z.string().describe("Required. The name of the auth config.")
    .optional(),
  encryptedCredential: z.string().describe(
    "Auth credential encrypted by Cloud KMS. Can be decrypted as Credential with proper KMS key.",
  ).optional(),
  expiryNotificationDuration: z.array(z.string()).describe(
    "Optional. User can define the time to receive notification after which the auth config becomes invalid. Support up to 30 days. Support granularity in hours.",
  ).optional(),
  lastModifierEmail: z.string().describe(
    "The last modifier's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
  ).optional(),
  name: z.string().describe(
    "Resource name of the auth config. For more information, see Manage authentication profiles. projects/{project}/locations/{location}/authConfigs/{authConfig}.",
  ).optional(),
  overrideValidTime: z.string().describe(
    "Optional. User provided expiry time to override. For the example of Salesforce, username/password credentials can be valid for 6 months depending on the instance settings.",
  ).optional(),
  validTime: z.string().describe(
    "Optional. The time until the auth config is valid. Empty or max value is considered the auth config won't expire.",
  ).optional(),
  visibility: z.enum([
    "AUTH_CONFIG_VISIBILITY_UNSPECIFIED",
    "PRIVATE",
    "CLIENT_VISIBLE",
  ]).describe("Optional. The visibility of the auth config.").optional(),
  clientCertificate_encryptedPrivateKey: z.string().describe(
    "The ssl certificate encoded in PEM format. This string must include the begin header and end footer lines. For example, -----BEGIN CERTIFICATE----- MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1 JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE-----",
  ).optional(),
  clientCertificate_passphrase: z.string().describe(
    "'passphrase' should be left unset if private key is not encrypted. Note that 'passphrase' is not the password for web server, but an extra layer of security to protected private key.",
  ).optional(),
  clientCertificate_sslCertificate: z.string().describe(
    "The ssl certificate encoded in PEM format. This string must include the begin header and end footer lines. For example, -----BEGIN CERTIFICATE----- MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1 JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE-----",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Application Integration Products.AuthConfigs. Registered at `@swamp/gcp/integrations/products-authconfigs`. */
export const model = {
  type: "@swamp/gcp/integrations/products-authconfigs",
  version: "2026.05.25.1",
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
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "The AuthConfig resource use to hold channels and connection config data.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a authConfigs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["certificateId"] !== undefined) {
          body["certificateId"] = g["certificateId"];
        }
        if (g["creatorEmail"] !== undefined) {
          body["creatorEmail"] = g["creatorEmail"];
        }
        if (g["credentialType"] !== undefined) {
          body["credentialType"] = g["credentialType"];
        }
        if (g["decryptedCredential"] !== undefined) {
          body["decryptedCredential"] = g["decryptedCredential"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["encryptedCredential"] !== undefined) {
          body["encryptedCredential"] = g["encryptedCredential"];
        }
        if (g["expiryNotificationDuration"] !== undefined) {
          body["expiryNotificationDuration"] = g["expiryNotificationDuration"];
        }
        if (g["lastModifierEmail"] !== undefined) {
          body["lastModifierEmail"] = g["lastModifierEmail"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["overrideValidTime"] !== undefined) {
          body["overrideValidTime"] = g["overrideValidTime"];
        }
        if (g["validTime"] !== undefined) body["validTime"] = g["validTime"];
        if (g["visibility"] !== undefined) body["visibility"] = g["visibility"];
        if (g["clientCertificate_encryptedPrivateKey"] !== undefined) {
          body["clientCertificate_encryptedPrivateKey"] =
            g["clientCertificate_encryptedPrivateKey"];
        }
        if (g["clientCertificate_passphrase"] !== undefined) {
          body["clientCertificate_passphrase"] =
            g["clientCertificate_passphrase"];
        }
        if (g["clientCertificate_sslCertificate"] !== undefined) {
          body["clientCertificate_sslCertificate"] =
            g["clientCertificate_sslCertificate"];
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
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
        ) as StateData;
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
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
      description: "Get a authConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the authConfigs"),
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
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
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
      description: "Update authConfigs attributes",
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
        if (g["certificateId"] !== undefined) {
          body["certificateId"] = g["certificateId"];
        }
        if (g["creatorEmail"] !== undefined) {
          body["creatorEmail"] = g["creatorEmail"];
        }
        if (g["credentialType"] !== undefined) {
          body["credentialType"] = g["credentialType"];
        }
        if (g["decryptedCredential"] !== undefined) {
          body["decryptedCredential"] = g["decryptedCredential"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["encryptedCredential"] !== undefined) {
          body["encryptedCredential"] = g["encryptedCredential"];
        }
        if (g["expiryNotificationDuration"] !== undefined) {
          body["expiryNotificationDuration"] = g["expiryNotificationDuration"];
        }
        if (g["lastModifierEmail"] !== undefined) {
          body["lastModifierEmail"] = g["lastModifierEmail"];
        }
        if (g["overrideValidTime"] !== undefined) {
          body["overrideValidTime"] = g["overrideValidTime"];
        }
        if (g["validTime"] !== undefined) body["validTime"] = g["validTime"];
        if (g["visibility"] !== undefined) body["visibility"] = g["visibility"];
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
      description: "Delete the authConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the authConfigs"),
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
      description: "Sync authConfigs state from GCP",
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
    list: {
      description: "List authConfigs resources",
      arguments: z.object({
        filter: z.string().describe(
          "Filtering as supported in https://developers.google.com/authorized-buyers/apis/guides/list-filters.",
        ).optional(),
        pageSize: z.number().describe(
          "The size of entries in the response. If unspecified, defaults to 100.",
        ).optional(),
        readMask: z.string().describe(
          "The mask which specifies fields that need to be returned in the AuthConfig's response.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["readMask"] !== undefined) {
          params["readMask"] = String(args["readMask"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "authConfigs",
          (args.maxPages as number | undefined) ?? 10,
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
