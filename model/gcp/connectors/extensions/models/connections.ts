// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/connectors/connections
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Connectors Connections.
 *
 * Connection represents an instance of connector.
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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/connections/${shortName}`;
}

const BASE_URL = "https://connectors.googleapis.com/";

const GET_CONFIG = {
  "id": "connectors.projects.locations.connections.get",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "connectors.projects.locations.connections.create",
  "path": "v1/{+parent}/connections",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "connectionId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "connectors.projects.locations.connections.patch",
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
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "connectors.projects.locations.connections.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "force": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "connectors.projects.locations.connections.list",
  "path": "v1/{+parent}/connections",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
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
    "view": {
      "location": "query",
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
  adminFilters: z.array(z.object({
    filterKey: z.string().describe(
      'Required. Unique name for the filter, e.g., "SharePointSiteURL", "DocumentType", "ChatSpaceName".',
    ).optional(),
    filterType: z.enum(["FILTER_TYPE_UNSPECIFIED", "INCLUSION", "EXCLUSION"])
      .describe("Required. Type of the filter.").optional(),
    intValue: z.string().describe("Optional. A single integer value.")
      .optional(),
    stringListValues: z.object({
      listValues: z.array(z.string()).describe(
        "Required. The list of string values.",
      ).optional(),
    }).describe("Optional. List of string values.").optional(),
    stringValue: z.string().describe("Optional. A single string value.")
      .optional(),
  })).describe(
    "Optional. Admin filters for the connection. These are used by Gemini Enterprise.",
  ).optional(),
  asyncOperationsEnabled: z.boolean().describe(
    "Optional. Async operations enabled for the connection. If Async Operations is enabled, Connection allows the customers to initiate async long running operations using the actions API.",
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
      }).describe("Optional. Value is a Encryption Key.").optional(),
      intValue: z.string().describe("Optional. Value is an integer").optional(),
      key: z.string().describe("Optional. Key of the config variable.")
        .optional(),
      secretValue: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Optional. Value is a secret.").optional(),
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
      }).describe("Optional. Client secret for user-provided OAuth app.")
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
    }).describe("Oauth2AuthCodeFlow.").optional(),
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
    }).describe("Oauth2AuthCodeFlowGoogleManaged.").optional(),
    oauth2ClientCredentials: z.object({
      clientId: z.string().describe("Optional. The client identifier.")
        .optional(),
      clientSecret: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Optional. Secret version reference containing the client secret.",
      ).optional(),
    }).describe("Oauth2ClientCredentials.").optional(),
    oauth2JwtBearer: z.object({
      clientKey: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Optional. Secret version reference containing a PKCS#8 PEM-encoded private key associated with the Client Certificate. This private key will be used to sign JWTs used for the jwt-bearer authorization grant. Specified in the form as: `projects/*/secrets/*/versions/*`.",
      ).optional(),
      jwtClaims: z.object({
        audience: z.string().describe('Optional. Value for the "aud" claim.')
          .optional(),
        issuer: z.string().describe('Optional. Value for the "iss" claim.')
          .optional(),
        subject: z.string().describe('Optional. Value for the "sub" claim.')
          .optional(),
      }).describe("Optional. JwtClaims providers fields to generate the token.")
        .optional(),
    }).describe("Oauth2JwtBearer.").optional(),
    sshPublicKey: z.object({
      certType: z.string().describe("Optional. Format of SSH Client cert.")
        .optional(),
      sshClientCert: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Optional. SSH Client Cert. It should contain both public and private key.",
      ).optional(),
      sshClientCertPass: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Optional. Password (passphrase) for ssh client certificate if it has one.",
      ).optional(),
      username: z.string().describe(
        "Optional. The user account used to authenticate.",
      ).optional(),
    }).describe("SSH Public Key.").optional(),
    userPassword: z.object({
      password: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Optional. Secret version reference containing the password.")
        .optional(),
      username: z.string().describe("Optional. Username.").optional(),
    }).describe("UserPassword.").optional(),
  }).describe(
    "Optional. Configuration for establishing the connection's authentication with an external system.",
  ).optional(),
  authOverrideEnabled: z.boolean().describe(
    "Optional. Auth override enabled for the connection. If Auth Override is enabled, Connection allows the backend service auth to be overridden in the entities/actions API.",
  ).optional(),
  configVariables: z.array(z.object({
    boolValue: z.boolean().describe("Optional. Value is a bool.").optional(),
    encryptionKeyValue: z.object({
      kmsKeyName: z.string().describe(
        "Optional. The [KMS key name] with which the content of the Operation is encrypted. The expected format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`. Will be empty string if google managed.",
      ).optional(),
      type: z.enum(["TYPE_UNSPECIFIED", "GOOGLE_MANAGED", "CUSTOMER_MANAGED"])
        .describe("Optional. Specifies the type of the encryption key.")
        .optional(),
    }).describe("Optional. Value is a Encryption Key.").optional(),
    intValue: z.string().describe("Optional. Value is an integer").optional(),
    key: z.string().describe("Optional. Key of the config variable.")
      .optional(),
    secretValue: z.object({
      secretVersion: z.string().describe(
        "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
      ).optional(),
    }).describe("Optional. Value is a secret.").optional(),
    stringValue: z.string().describe("Optional. Value is a string.").optional(),
  })).describe(
    "Optional. Configuration for configuring the connection with an external system.",
  ).optional(),
  connectorVersion: z.string().describe(
    "Required. Connector version on which the connection is created. The format is: projects/*/locations/*/providers/*/connectors/*/versions/* Only global location is supported for ConnectorVersion resource.",
  ).optional(),
  description: z.string().describe("Optional. Description of the resource.")
    .optional(),
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
    "Optional. Configuration of the Connector's destination. Only accepted for Connectors that accepts user defined destination(s).",
  ).optional(),
  euaOauthAuthConfig: z.object({
    additionalVariables: z.array(z.object({
      boolValue: z.boolean().describe("Optional. Value is a bool.").optional(),
      encryptionKeyValue: z.object({
        kmsKeyName: z.string().describe(
          "Optional. The [KMS key name] with which the content of the Operation is encrypted. The expected format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`. Will be empty string if google managed.",
        ).optional(),
        type: z.enum(["TYPE_UNSPECIFIED", "GOOGLE_MANAGED", "CUSTOMER_MANAGED"])
          .describe("Optional. Specifies the type of the encryption key.")
          .optional(),
      }).describe("Optional. Value is a Encryption Key.").optional(),
      intValue: z.string().describe("Optional. Value is an integer").optional(),
      key: z.string().describe("Optional. Key of the config variable.")
        .optional(),
      secretValue: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Optional. Value is a secret.").optional(),
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
      }).describe("Optional. Client secret for user-provided OAuth app.")
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
    }).describe("Oauth2AuthCodeFlow.").optional(),
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
    }).describe("Oauth2AuthCodeFlowGoogleManaged.").optional(),
    oauth2ClientCredentials: z.object({
      clientId: z.string().describe("Optional. The client identifier.")
        .optional(),
      clientSecret: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Optional. Secret version reference containing the client secret.",
      ).optional(),
    }).describe("Oauth2ClientCredentials.").optional(),
    oauth2JwtBearer: z.object({
      clientKey: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Optional. Secret version reference containing a PKCS#8 PEM-encoded private key associated with the Client Certificate. This private key will be used to sign JWTs used for the jwt-bearer authorization grant. Specified in the form as: `projects/*/secrets/*/versions/*`.",
      ).optional(),
      jwtClaims: z.object({
        audience: z.string().describe('Optional. Value for the "aud" claim.')
          .optional(),
        issuer: z.string().describe('Optional. Value for the "iss" claim.')
          .optional(),
        subject: z.string().describe('Optional. Value for the "sub" claim.')
          .optional(),
      }).describe("Optional. JwtClaims providers fields to generate the token.")
        .optional(),
    }).describe("Oauth2JwtBearer.").optional(),
    sshPublicKey: z.object({
      certType: z.string().describe("Optional. Format of SSH Client cert.")
        .optional(),
      sshClientCert: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Optional. SSH Client Cert. It should contain both public and private key.",
      ).optional(),
      sshClientCertPass: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Optional. Password (passphrase) for ssh client certificate if it has one.",
      ).optional(),
      username: z.string().describe(
        "Optional. The user account used to authenticate.",
      ).optional(),
    }).describe("SSH Public Key.").optional(),
    userPassword: z.object({
      password: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Optional. Secret version reference containing the password.")
        .optional(),
      username: z.string().describe("Optional. Username.").optional(),
    }).describe("UserPassword.").optional(),
  }).describe(
    "Optional. Additional Oauth2.0 Auth config for EUA. If the connection is configured using non-OAuth authentication but OAuth needs to be used for EUA, this field can be populated with the OAuth config. This should be a OAuth2AuthCodeFlow Auth type only.",
  ).optional(),
  eventingConfig: z.object({
    additionalVariables: z.array(z.object({
      boolValue: z.boolean().describe("Optional. Value is a bool.").optional(),
      encryptionKeyValue: z.object({
        kmsKeyName: z.string().describe(
          "Optional. The [KMS key name] with which the content of the Operation is encrypted. The expected format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`. Will be empty string if google managed.",
        ).optional(),
        type: z.enum(["TYPE_UNSPECIFIED", "GOOGLE_MANAGED", "CUSTOMER_MANAGED"])
          .describe("Optional. Specifies the type of the encryption key.")
          .optional(),
      }).describe("Optional. Value is a Encryption Key.").optional(),
      intValue: z.string().describe("Optional. Value is an integer").optional(),
      key: z.string().describe("Optional. Key of the config variable.")
        .optional(),
      secretValue: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Optional. Value is a secret.").optional(),
      stringValue: z.string().describe("Optional. Value is a string.")
        .optional(),
    })).describe("Optional. Additional eventing related field values")
      .optional(),
    allowedEventTypes: z.array(z.string()).describe(
      "Optional. List of allowed event types for the connection.",
    ).optional(),
    authConfig: z.object({
      additionalVariables: z.array(z.object({
        boolValue: z.boolean().describe("Optional. Value is a bool.")
          .optional(),
        encryptionKeyValue: z.object({
          kmsKeyName: z.unknown().describe(
            "Optional. The [KMS key name] with which the content of the Operation is encrypted. The expected format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`. Will be empty string if google managed.",
          ).optional(),
          type: z.unknown().describe(
            "Optional. Specifies the type of the encryption key.",
          ).optional(),
        }).describe("Optional. Value is a Encryption Key.").optional(),
        intValue: z.string().describe("Optional. Value is an integer")
          .optional(),
        key: z.string().describe("Optional. Key of the config variable.")
          .optional(),
        secretValue: z.object({
          secretVersion: z.unknown().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe("Optional. Value is a secret.").optional(),
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
      ]).describe("Optional. The type of authentication configured.")
        .optional(),
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
        }).describe("Optional. Client secret for user-provided OAuth app.")
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
      }).describe("Oauth2AuthCodeFlow.").optional(),
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
      }).describe("Oauth2AuthCodeFlowGoogleManaged.").optional(),
      oauth2ClientCredentials: z.object({
        clientId: z.string().describe("Optional. The client identifier.")
          .optional(),
        clientSecret: z.object({
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe(
          "Optional. Secret version reference containing the client secret.",
        ).optional(),
      }).describe("Oauth2ClientCredentials.").optional(),
      oauth2JwtBearer: z.object({
        clientKey: z.object({
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe(
          "Optional. Secret version reference containing a PKCS#8 PEM-encoded private key associated with the Client Certificate. This private key will be used to sign JWTs used for the jwt-bearer authorization grant. Specified in the form as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
        jwtClaims: z.object({
          audience: z.string().describe('Optional. Value for the "aud" claim.')
            .optional(),
          issuer: z.string().describe('Optional. Value for the "iss" claim.')
            .optional(),
          subject: z.string().describe('Optional. Value for the "sub" claim.')
            .optional(),
        }).describe(
          "Optional. JwtClaims providers fields to generate the token.",
        ).optional(),
      }).describe("Oauth2JwtBearer.").optional(),
      sshPublicKey: z.object({
        certType: z.string().describe("Optional. Format of SSH Client cert.")
          .optional(),
        sshClientCert: z.object({
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe(
          "Optional. SSH Client Cert. It should contain both public and private key.",
        ).optional(),
        sshClientCertPass: z.object({
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe(
          "Optional. Password (passphrase) for ssh client certificate if it has one.",
        ).optional(),
        username: z.string().describe(
          "Optional. The user account used to authenticate.",
        ).optional(),
      }).describe("SSH Public Key.").optional(),
      userPassword: z.object({
        password: z.object({
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe(
          "Optional. Secret version reference containing the password.",
        ).optional(),
        username: z.string().describe("Optional. Username.").optional(),
      }).describe("UserPassword.").optional(),
    }).describe("Optional. Auth details for the webhook adapter.").optional(),
    deadLetterConfig: z.object({
      projectId: z.string().describe(
        "Optional. Project which has the topic given.",
      ).optional(),
      topic: z.string().describe(
        "Optional. Topic to push events which couldn't be processed.",
      ).optional(),
    }).describe(
      "Optional. Dead letter configuration for eventing of a connection.",
    ).optional(),
    enrichmentConfig: z.object({
      appendAcl: z.boolean().describe("Optional. Append ACL to the event.")
        .optional(),
    }).describe("Optional. Data enrichment configuration.").optional(),
    enrichmentEnabled: z.boolean().describe("Optional. Enrichment Enabled.")
      .optional(),
    eventsListenerIngressEndpoint: z.string().describe(
      "Output only. Ingress endpoint of the event listener. This is used only when private connectivity is enabled.",
    ).optional(),
    globalEventFilter: z.string().describe(
      "Optional. Filter to be applied on the events to be received by the connection.",
    ).optional(),
    listenerAuthConfig: z.object({
      additionalVariables: z.array(z.object({
        boolValue: z.boolean().describe("Optional. Value is a bool.")
          .optional(),
        encryptionKeyValue: z.object({
          kmsKeyName: z.unknown().describe(
            "Optional. The [KMS key name] with which the content of the Operation is encrypted. The expected format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`. Will be empty string if google managed.",
          ).optional(),
          type: z.unknown().describe(
            "Optional. Specifies the type of the encryption key.",
          ).optional(),
        }).describe("Optional. Value is a Encryption Key.").optional(),
        intValue: z.string().describe("Optional. Value is an integer")
          .optional(),
        key: z.string().describe("Optional. Key of the config variable.")
          .optional(),
        secretValue: z.object({
          secretVersion: z.unknown().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe("Optional. Value is a secret.").optional(),
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
      ]).describe("Optional. The type of authentication configured.")
        .optional(),
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
        }).describe("Optional. Client secret for user-provided OAuth app.")
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
      }).describe("Oauth2AuthCodeFlow.").optional(),
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
      }).describe("Oauth2AuthCodeFlowGoogleManaged.").optional(),
      oauth2ClientCredentials: z.object({
        clientId: z.string().describe("Optional. The client identifier.")
          .optional(),
        clientSecret: z.object({
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe(
          "Optional. Secret version reference containing the client secret.",
        ).optional(),
      }).describe("Oauth2ClientCredentials.").optional(),
      oauth2JwtBearer: z.object({
        clientKey: z.object({
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe(
          "Optional. Secret version reference containing a PKCS#8 PEM-encoded private key associated with the Client Certificate. This private key will be used to sign JWTs used for the jwt-bearer authorization grant. Specified in the form as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
        jwtClaims: z.object({
          audience: z.string().describe('Optional. Value for the "aud" claim.')
            .optional(),
          issuer: z.string().describe('Optional. Value for the "iss" claim.')
            .optional(),
          subject: z.string().describe('Optional. Value for the "sub" claim.')
            .optional(),
        }).describe(
          "Optional. JwtClaims providers fields to generate the token.",
        ).optional(),
      }).describe("Oauth2JwtBearer.").optional(),
      sshPublicKey: z.object({
        certType: z.string().describe("Optional. Format of SSH Client cert.")
          .optional(),
        sshClientCert: z.object({
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe(
          "Optional. SSH Client Cert. It should contain both public and private key.",
        ).optional(),
        sshClientCertPass: z.object({
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe(
          "Optional. Password (passphrase) for ssh client certificate if it has one.",
        ).optional(),
        username: z.string().describe(
          "Optional. The user account used to authenticate.",
        ).optional(),
      }).describe("SSH Public Key.").optional(),
      userPassword: z.object({
        password: z.object({
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe(
          "Optional. Secret version reference containing the password.",
        ).optional(),
        username: z.string().describe("Optional. Username.").optional(),
      }).describe("UserPassword.").optional(),
    }).describe("Optional. Auth details for the event listener.").optional(),
    privateConnectivityAllowlistedProjects: z.array(z.string()).describe(
      "Optional. List of projects to be allowlisted for the service attachment created in the tenant project for eventing ingress.",
    ).optional(),
    privateConnectivityEnabled: z.boolean().describe(
      "Optional. Private Connectivity Enabled.",
    ).optional(),
    proxyDestinationConfig: z.object({
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
    }).describe("Optional. Proxy for Eventing auto-registration.").optional(),
    registrationDestinationConfig: z.object({
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
    }).describe("Optional. Registration endpoint for auto registration.")
      .optional(),
    sslConfig: z.object({
      additionalVariables: z.array(z.object({
        boolValue: z.boolean().describe("Optional. Value is a bool.")
          .optional(),
        encryptionKeyValue: z.object({
          kmsKeyName: z.unknown().describe(
            "Optional. The [KMS key name] with which the content of the Operation is encrypted. The expected format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`. Will be empty string if google managed.",
          ).optional(),
          type: z.unknown().describe(
            "Optional. Specifies the type of the encryption key.",
          ).optional(),
        }).describe("Optional. Value is a Encryption Key.").optional(),
        intValue: z.string().describe("Optional. Value is an integer")
          .optional(),
        key: z.string().describe("Optional. Key of the config variable.")
          .optional(),
        secretValue: z.object({
          secretVersion: z.unknown().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe("Optional. Value is a secret.").optional(),
        stringValue: z.string().describe("Optional. Value is a string.")
          .optional(),
      })).describe("Optional. Additional SSL related field values").optional(),
      clientCertType: z.enum(["CERT_TYPE_UNSPECIFIED", "PEM"]).describe(
        "Optional. Type of Client Cert (PEM/JKS/.. etc.)",
      ).optional(),
      clientCertificate: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Optional. Client Certificate").optional(),
      clientPrivateKey: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Optional. Client Private Key").optional(),
      clientPrivateKeyPass: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Optional. Secret containing the passphrase protecting the Client Private Key",
      ).optional(),
      privateServerCertificate: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Optional. Private Server Certificate. Needs to be specified if trust model is `PRIVATE`.",
      ).optional(),
      serverCertType: z.enum(["CERT_TYPE_UNSPECIFIED", "PEM"]).describe(
        "Optional. Type of Server Cert (PEM/JKS/.. etc.)",
      ).optional(),
      trustModel: z.enum(["PUBLIC", "PRIVATE", "INSECURE"]).describe(
        "Optional. Trust Model of the SSL connection",
      ).optional(),
      type: z.enum(["SSL_TYPE_UNSPECIFIED", "TLS", "MTLS"]).describe(
        "Optional. Controls the ssl type for the given connector version.",
      ).optional(),
      useSsl: z.boolean().describe("Optional. Bool for enabling SSL")
        .optional(),
    }).describe("Optional. Ssl config of a connection").optional(),
  }).describe("Optional. Eventing config of a connection").optional(),
  eventingEnablementType: z.enum([
    "EVENTING_ENABLEMENT_TYPE_UNSPECIFIED",
    "EVENTING_AND_CONNECTION",
    "ONLY_EVENTING",
  ]).describe(
    "Optional. Eventing enablement type. Will be nil if eventing is not enabled.",
  ).optional(),
  fallbackOnAdminCredentials: z.boolean().describe(
    "Optional. Fallback on admin credentials for the connection. If this both auth_override_enabled and fallback_on_admin_credentials are set to true, the connection will use the admin credentials if the dynamic auth header is not present during auth override.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Resource labels to represent user-provided metadata. Refer to cloud documentation on labels for more details. https://cloud.google.com/compute/docs/labeling-resources",
  ).optional(),
  lockConfig: z.object({
    locked: z.boolean().describe(
      "Optional. Indicates whether or not the connection is locked.",
    ).optional(),
    reason: z.string().describe(
      "Optional. Describes why a connection is locked.",
    ).optional(),
  }).describe(
    "Optional. Configuration that indicates whether or not the Connection can be edited.",
  ).optional(),
  logConfig: z.object({
    enabled: z.boolean().describe(
      "Optional. Enabled represents whether logging is enabled or not for a connection.",
    ).optional(),
    level: z.enum(["LOG_LEVEL_UNSPECIFIED", "ERROR", "INFO", "DEBUG"]).describe(
      "Optional. Log configuration level.",
    ).optional(),
  }).describe("Optional. Log configuration for the connection.").optional(),
  nodeConfig: z.object({
    maxNodeCount: z.number().int().describe(
      "Optional. Maximum number of nodes in the runtime nodes.",
    ).optional(),
    minNodeCount: z.number().int().describe(
      "Optional. Minimum number of nodes in the runtime nodes.",
    ).optional(),
  }).describe("Optional. Node configuration for the connection.").optional(),
  serviceAccount: z.string().describe(
    "Optional. Service account needed for runtime plane to access Google Cloud resources.",
  ).optional(),
  sslConfig: z.object({
    additionalVariables: z.array(z.object({
      boolValue: z.boolean().describe("Optional. Value is a bool.").optional(),
      encryptionKeyValue: z.object({
        kmsKeyName: z.string().describe(
          "Optional. The [KMS key name] with which the content of the Operation is encrypted. The expected format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`. Will be empty string if google managed.",
        ).optional(),
        type: z.enum(["TYPE_UNSPECIFIED", "GOOGLE_MANAGED", "CUSTOMER_MANAGED"])
          .describe("Optional. Specifies the type of the encryption key.")
          .optional(),
      }).describe("Optional. Value is a Encryption Key.").optional(),
      intValue: z.string().describe("Optional. Value is an integer").optional(),
      key: z.string().describe("Optional. Key of the config variable.")
        .optional(),
      secretValue: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Optional. Value is a secret.").optional(),
      stringValue: z.string().describe("Optional. Value is a string.")
        .optional(),
    })).describe("Optional. Additional SSL related field values").optional(),
    clientCertType: z.enum(["CERT_TYPE_UNSPECIFIED", "PEM"]).describe(
      "Optional. Type of Client Cert (PEM/JKS/.. etc.)",
    ).optional(),
    clientCertificate: z.object({
      secretVersion: z.string().describe(
        "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
      ).optional(),
    }).describe("Optional. Client Certificate").optional(),
    clientPrivateKey: z.object({
      secretVersion: z.string().describe(
        "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
      ).optional(),
    }).describe("Optional. Client Private Key").optional(),
    clientPrivateKeyPass: z.object({
      secretVersion: z.string().describe(
        "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
      ).optional(),
    }).describe(
      "Optional. Secret containing the passphrase protecting the Client Private Key",
    ).optional(),
    privateServerCertificate: z.object({
      secretVersion: z.string().describe(
        "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
      ).optional(),
    }).describe(
      "Optional. Private Server Certificate. Needs to be specified if trust model is `PRIVATE`.",
    ).optional(),
    serverCertType: z.enum(["CERT_TYPE_UNSPECIFIED", "PEM"]).describe(
      "Optional. Type of Server Cert (PEM/JKS/.. etc.)",
    ).optional(),
    trustModel: z.enum(["PUBLIC", "PRIVATE", "INSECURE"]).describe(
      "Optional. Trust Model of the SSL connection",
    ).optional(),
    type: z.enum(["SSL_TYPE_UNSPECIFIED", "TLS", "MTLS"]).describe(
      "Optional. Controls the ssl type for the given connector version.",
    ).optional(),
    useSsl: z.boolean().describe("Optional. Bool for enabling SSL").optional(),
  }).describe("Optional. Ssl config of a connection").optional(),
  suspended: z.boolean().describe(
    "Optional. Suspended indicates if a user has suspended a connection or not.",
  ).optional(),
  trafficShapingConfigs: z.array(z.object({
    duration: z.string().describe(
      "Required. Specifies the duration over which the API call quota limits are calculated. This duration is used to define the time window for evaluating if the number of API calls made by a user is within the allowed quota limits. For example: - To define a quota sampled over 16 seconds, set `seconds` to 16 - To define a quota sampled over 5 minutes, set `seconds` to 300 (5 * 60) - To define a quota sampled over 1 day, set `seconds` to 86400 (24 * 60 * 60) and so on. It is important to note that this duration is not the time the quota is valid for, but rather the time window over which the quota is evaluated. For example, if the quota is 100 calls per 10 seconds, then this duration field would be set to 10 seconds.",
    ).optional(),
    quotaLimit: z.string().describe(
      "Required. Maximum number of api calls allowed.",
    ).optional(),
  })).describe("Optional. Traffic shaping configuration for the connection.")
    .optional(),
  connectionId: z.string().describe(
    "Required. Identifier to assign to the Connection. Must be unique within scope of the parent resource.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  adminFilters: z.array(z.object({
    filterKey: z.string(),
    filterType: z.string(),
    intValue: z.string(),
    stringListValues: z.object({
      listValues: z.array(z.string()),
    }),
    stringValue: z.string(),
  })).optional(),
  asyncOperationsEnabled: z.boolean().optional(),
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
  authOverrideEnabled: z.boolean().optional(),
  billingConfig: z.object({
    billingCategory: z.string(),
  }).optional(),
  configVariables: z.array(z.object({
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
  })).optional(),
  connectionRevision: z.string().optional(),
  connectorVersion: z.string().optional(),
  connectorVersionInfraConfig: z.object({
    connectionRatelimitWindowSeconds: z.string(),
    deploymentModel: z.string(),
    deploymentModelMigrationState: z.string(),
    hpaConfig: z.object({
      cpuUtilizationThreshold: z.string(),
      memoryUtilizationThreshold: z.string(),
    }),
    internalclientRatelimitThreshold: z.string(),
    maxInstanceRequestConcurrency: z.number(),
    ratelimitThreshold: z.string(),
    resourceLimits: z.object({
      cpu: z.string(),
      memory: z.string(),
    }),
    resourceRequests: z.object({
      cpu: z.string(),
      memory: z.string(),
    }),
    sharedDeployment: z.string(),
    tlsMigrationState: z.string(),
  }).optional(),
  connectorVersionLaunchStage: z.string().optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  destinationConfigs: z.array(z.object({
    destinations: z.array(z.object({
      host: z.string(),
      port: z.number(),
      serviceAttachment: z.string(),
    })),
    key: z.string(),
  })).optional(),
  envoyImageLocation: z.string().optional(),
  euaOauthAuthConfig: z.object({
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
  eventingConfig: z.object({
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
    allowedEventTypes: z.array(z.string()),
    authConfig: z.object({
      additionalVariables: z.array(z.object({
        boolValue: z.boolean(),
        encryptionKeyValue: z.object({
          kmsKeyName: z.unknown(),
          type: z.unknown(),
        }),
        intValue: z.string(),
        key: z.string(),
        secretValue: z.object({
          secretVersion: z.unknown(),
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
    }),
    deadLetterConfig: z.object({
      projectId: z.string(),
      topic: z.string(),
    }),
    enrichmentConfig: z.object({
      appendAcl: z.boolean(),
    }),
    enrichmentEnabled: z.boolean(),
    eventsListenerIngressEndpoint: z.string(),
    globalEventFilter: z.string(),
    listenerAuthConfig: z.object({
      additionalVariables: z.array(z.object({
        boolValue: z.boolean(),
        encryptionKeyValue: z.object({
          kmsKeyName: z.unknown(),
          type: z.unknown(),
        }),
        intValue: z.string(),
        key: z.string(),
        secretValue: z.object({
          secretVersion: z.unknown(),
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
    }),
    privateConnectivityAllowlistedProjects: z.array(z.string()),
    privateConnectivityEnabled: z.boolean(),
    proxyDestinationConfig: z.object({
      destinations: z.array(z.object({
        host: z.string(),
        port: z.number(),
        serviceAttachment: z.string(),
      })),
      key: z.string(),
    }),
    registrationDestinationConfig: z.object({
      destinations: z.array(z.object({
        host: z.string(),
        port: z.number(),
        serviceAttachment: z.string(),
      })),
      key: z.string(),
    }),
    sslConfig: z.object({
      additionalVariables: z.array(z.object({
        boolValue: z.boolean(),
        encryptionKeyValue: z.object({
          kmsKeyName: z.unknown(),
          type: z.unknown(),
        }),
        intValue: z.string(),
        key: z.string(),
        secretValue: z.object({
          secretVersion: z.unknown(),
        }),
        stringValue: z.string(),
      })),
      clientCertType: z.string(),
      clientCertificate: z.object({
        secretVersion: z.string(),
      }),
      clientPrivateKey: z.object({
        secretVersion: z.string(),
      }),
      clientPrivateKeyPass: z.object({
        secretVersion: z.string(),
      }),
      privateServerCertificate: z.object({
        secretVersion: z.string(),
      }),
      serverCertType: z.string(),
      trustModel: z.string(),
      type: z.string(),
      useSsl: z.boolean(),
    }),
  }).optional(),
  eventingEnablementType: z.string().optional(),
  eventingRuntimeData: z.object({
    eventsListenerEndpoint: z.string(),
    eventsListenerPscSa: z.string(),
    status: z.object({
      description: z.string(),
      state: z.string(),
    }),
    webhookData: z.object({
      additionalVariables: z.array(z.object({
        boolValue: z.boolean(),
        encryptionKeyValue: z.object({
          kmsKeyName: z.unknown(),
          type: z.unknown(),
        }),
        intValue: z.string(),
        key: z.string(),
        secretValue: z.object({
          secretVersion: z.unknown(),
        }),
        stringValue: z.string(),
      })),
      createTime: z.string(),
      eventSubscriptions: z.array(z.string()),
      eventTypes: z.array(z.string()),
      id: z.string(),
      name: z.string(),
      nextRefreshTime: z.string(),
      updateTime: z.string(),
    }),
    webhookSubscriptions: z.object({
      webhookData: z.array(z.object({
        additionalVariables: z.array(z.unknown()),
        createTime: z.string(),
        eventSubscriptions: z.array(z.unknown()),
        eventTypes: z.array(z.unknown()),
        id: z.string(),
        name: z.string(),
        nextRefreshTime: z.string(),
        updateTime: z.string(),
      })),
    }),
  }).optional(),
  fallbackOnAdminCredentials: z.boolean().optional(),
  host: z.string().optional(),
  imageLocation: z.string().optional(),
  isTrustedTester: z.boolean().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  lockConfig: z.object({
    locked: z.boolean(),
    reason: z.string(),
  }).optional(),
  logConfig: z.object({
    enabled: z.boolean(),
    level: z.string(),
  }).optional(),
  name: z.string(),
  nodeConfig: z.object({
    maxNodeCount: z.number(),
    minNodeCount: z.number(),
  }).optional(),
  serviceAccount: z.string().optional(),
  serviceDirectory: z.string().optional(),
  sslConfig: z.object({
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
    clientCertType: z.string(),
    clientCertificate: z.object({
      secretVersion: z.string(),
    }),
    clientPrivateKey: z.object({
      secretVersion: z.string(),
    }),
    clientPrivateKeyPass: z.object({
      secretVersion: z.string(),
    }),
    privateServerCertificate: z.object({
      secretVersion: z.string(),
    }),
    serverCertType: z.string(),
    trustModel: z.string(),
    type: z.string(),
    useSsl: z.boolean(),
  }).optional(),
  status: z.object({
    description: z.string(),
    state: z.string(),
    status: z.string(),
  }).optional(),
  subscriptionType: z.string().optional(),
  suspended: z.boolean().optional(),
  tlsServiceDirectory: z.string().optional(),
  trafficShapingConfigs: z.array(z.object({
    duration: z.string(),
    quotaLimit: z.string(),
  })).optional(),
  updateTime: z.string().optional(),
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
  adminFilters: z.array(z.object({
    filterKey: z.string().describe(
      'Required. Unique name for the filter, e.g., "SharePointSiteURL", "DocumentType", "ChatSpaceName".',
    ).optional(),
    filterType: z.enum(["FILTER_TYPE_UNSPECIFIED", "INCLUSION", "EXCLUSION"])
      .describe("Required. Type of the filter.").optional(),
    intValue: z.string().describe("Optional. A single integer value.")
      .optional(),
    stringListValues: z.object({
      listValues: z.array(z.string()).describe(
        "Required. The list of string values.",
      ).optional(),
    }).describe("Optional. List of string values.").optional(),
    stringValue: z.string().describe("Optional. A single string value.")
      .optional(),
  })).describe(
    "Optional. Admin filters for the connection. These are used by Gemini Enterprise.",
  ).optional(),
  asyncOperationsEnabled: z.boolean().describe(
    "Optional. Async operations enabled for the connection. If Async Operations is enabled, Connection allows the customers to initiate async long running operations using the actions API.",
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
      }).describe("Optional. Value is a Encryption Key.").optional(),
      intValue: z.string().describe("Optional. Value is an integer").optional(),
      key: z.string().describe("Optional. Key of the config variable.")
        .optional(),
      secretValue: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Optional. Value is a secret.").optional(),
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
      }).describe("Optional. Client secret for user-provided OAuth app.")
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
    }).describe("Oauth2AuthCodeFlow.").optional(),
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
    }).describe("Oauth2AuthCodeFlowGoogleManaged.").optional(),
    oauth2ClientCredentials: z.object({
      clientId: z.string().describe("Optional. The client identifier.")
        .optional(),
      clientSecret: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Optional. Secret version reference containing the client secret.",
      ).optional(),
    }).describe("Oauth2ClientCredentials.").optional(),
    oauth2JwtBearer: z.object({
      clientKey: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Optional. Secret version reference containing a PKCS#8 PEM-encoded private key associated with the Client Certificate. This private key will be used to sign JWTs used for the jwt-bearer authorization grant. Specified in the form as: `projects/*/secrets/*/versions/*`.",
      ).optional(),
      jwtClaims: z.object({
        audience: z.string().describe('Optional. Value for the "aud" claim.')
          .optional(),
        issuer: z.string().describe('Optional. Value for the "iss" claim.')
          .optional(),
        subject: z.string().describe('Optional. Value for the "sub" claim.')
          .optional(),
      }).describe("Optional. JwtClaims providers fields to generate the token.")
        .optional(),
    }).describe("Oauth2JwtBearer.").optional(),
    sshPublicKey: z.object({
      certType: z.string().describe("Optional. Format of SSH Client cert.")
        .optional(),
      sshClientCert: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Optional. SSH Client Cert. It should contain both public and private key.",
      ).optional(),
      sshClientCertPass: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Optional. Password (passphrase) for ssh client certificate if it has one.",
      ).optional(),
      username: z.string().describe(
        "Optional. The user account used to authenticate.",
      ).optional(),
    }).describe("SSH Public Key.").optional(),
    userPassword: z.object({
      password: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Optional. Secret version reference containing the password.")
        .optional(),
      username: z.string().describe("Optional. Username.").optional(),
    }).describe("UserPassword.").optional(),
  }).describe(
    "Optional. Configuration for establishing the connection's authentication with an external system.",
  ).optional(),
  authOverrideEnabled: z.boolean().describe(
    "Optional. Auth override enabled for the connection. If Auth Override is enabled, Connection allows the backend service auth to be overridden in the entities/actions API.",
  ).optional(),
  configVariables: z.array(z.object({
    boolValue: z.boolean().describe("Optional. Value is a bool.").optional(),
    encryptionKeyValue: z.object({
      kmsKeyName: z.string().describe(
        "Optional. The [KMS key name] with which the content of the Operation is encrypted. The expected format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`. Will be empty string if google managed.",
      ).optional(),
      type: z.enum(["TYPE_UNSPECIFIED", "GOOGLE_MANAGED", "CUSTOMER_MANAGED"])
        .describe("Optional. Specifies the type of the encryption key.")
        .optional(),
    }).describe("Optional. Value is a Encryption Key.").optional(),
    intValue: z.string().describe("Optional. Value is an integer").optional(),
    key: z.string().describe("Optional. Key of the config variable.")
      .optional(),
    secretValue: z.object({
      secretVersion: z.string().describe(
        "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
      ).optional(),
    }).describe("Optional. Value is a secret.").optional(),
    stringValue: z.string().describe("Optional. Value is a string.").optional(),
  })).describe(
    "Optional. Configuration for configuring the connection with an external system.",
  ).optional(),
  connectorVersion: z.string().describe(
    "Required. Connector version on which the connection is created. The format is: projects/*/locations/*/providers/*/connectors/*/versions/* Only global location is supported for ConnectorVersion resource.",
  ).optional(),
  description: z.string().describe("Optional. Description of the resource.")
    .optional(),
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
    "Optional. Configuration of the Connector's destination. Only accepted for Connectors that accepts user defined destination(s).",
  ).optional(),
  euaOauthAuthConfig: z.object({
    additionalVariables: z.array(z.object({
      boolValue: z.boolean().describe("Optional. Value is a bool.").optional(),
      encryptionKeyValue: z.object({
        kmsKeyName: z.string().describe(
          "Optional. The [KMS key name] with which the content of the Operation is encrypted. The expected format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`. Will be empty string if google managed.",
        ).optional(),
        type: z.enum(["TYPE_UNSPECIFIED", "GOOGLE_MANAGED", "CUSTOMER_MANAGED"])
          .describe("Optional. Specifies the type of the encryption key.")
          .optional(),
      }).describe("Optional. Value is a Encryption Key.").optional(),
      intValue: z.string().describe("Optional. Value is an integer").optional(),
      key: z.string().describe("Optional. Key of the config variable.")
        .optional(),
      secretValue: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Optional. Value is a secret.").optional(),
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
      }).describe("Optional. Client secret for user-provided OAuth app.")
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
    }).describe("Oauth2AuthCodeFlow.").optional(),
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
    }).describe("Oauth2AuthCodeFlowGoogleManaged.").optional(),
    oauth2ClientCredentials: z.object({
      clientId: z.string().describe("Optional. The client identifier.")
        .optional(),
      clientSecret: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Optional. Secret version reference containing the client secret.",
      ).optional(),
    }).describe("Oauth2ClientCredentials.").optional(),
    oauth2JwtBearer: z.object({
      clientKey: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Optional. Secret version reference containing a PKCS#8 PEM-encoded private key associated with the Client Certificate. This private key will be used to sign JWTs used for the jwt-bearer authorization grant. Specified in the form as: `projects/*/secrets/*/versions/*`.",
      ).optional(),
      jwtClaims: z.object({
        audience: z.string().describe('Optional. Value for the "aud" claim.')
          .optional(),
        issuer: z.string().describe('Optional. Value for the "iss" claim.')
          .optional(),
        subject: z.string().describe('Optional. Value for the "sub" claim.')
          .optional(),
      }).describe("Optional. JwtClaims providers fields to generate the token.")
        .optional(),
    }).describe("Oauth2JwtBearer.").optional(),
    sshPublicKey: z.object({
      certType: z.string().describe("Optional. Format of SSH Client cert.")
        .optional(),
      sshClientCert: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Optional. SSH Client Cert. It should contain both public and private key.",
      ).optional(),
      sshClientCertPass: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Optional. Password (passphrase) for ssh client certificate if it has one.",
      ).optional(),
      username: z.string().describe(
        "Optional. The user account used to authenticate.",
      ).optional(),
    }).describe("SSH Public Key.").optional(),
    userPassword: z.object({
      password: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Optional. Secret version reference containing the password.")
        .optional(),
      username: z.string().describe("Optional. Username.").optional(),
    }).describe("UserPassword.").optional(),
  }).describe(
    "Optional. Additional Oauth2.0 Auth config for EUA. If the connection is configured using non-OAuth authentication but OAuth needs to be used for EUA, this field can be populated with the OAuth config. This should be a OAuth2AuthCodeFlow Auth type only.",
  ).optional(),
  eventingConfig: z.object({
    additionalVariables: z.array(z.object({
      boolValue: z.boolean().describe("Optional. Value is a bool.").optional(),
      encryptionKeyValue: z.object({
        kmsKeyName: z.string().describe(
          "Optional. The [KMS key name] with which the content of the Operation is encrypted. The expected format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`. Will be empty string if google managed.",
        ).optional(),
        type: z.enum(["TYPE_UNSPECIFIED", "GOOGLE_MANAGED", "CUSTOMER_MANAGED"])
          .describe("Optional. Specifies the type of the encryption key.")
          .optional(),
      }).describe("Optional. Value is a Encryption Key.").optional(),
      intValue: z.string().describe("Optional. Value is an integer").optional(),
      key: z.string().describe("Optional. Key of the config variable.")
        .optional(),
      secretValue: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Optional. Value is a secret.").optional(),
      stringValue: z.string().describe("Optional. Value is a string.")
        .optional(),
    })).describe("Optional. Additional eventing related field values")
      .optional(),
    allowedEventTypes: z.array(z.string()).describe(
      "Optional. List of allowed event types for the connection.",
    ).optional(),
    authConfig: z.object({
      additionalVariables: z.array(z.object({
        boolValue: z.boolean().describe("Optional. Value is a bool.")
          .optional(),
        encryptionKeyValue: z.object({
          kmsKeyName: z.unknown().describe(
            "Optional. The [KMS key name] with which the content of the Operation is encrypted. The expected format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`. Will be empty string if google managed.",
          ).optional(),
          type: z.unknown().describe(
            "Optional. Specifies the type of the encryption key.",
          ).optional(),
        }).describe("Optional. Value is a Encryption Key.").optional(),
        intValue: z.string().describe("Optional. Value is an integer")
          .optional(),
        key: z.string().describe("Optional. Key of the config variable.")
          .optional(),
        secretValue: z.object({
          secretVersion: z.unknown().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe("Optional. Value is a secret.").optional(),
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
      ]).describe("Optional. The type of authentication configured.")
        .optional(),
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
        }).describe("Optional. Client secret for user-provided OAuth app.")
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
      }).describe("Oauth2AuthCodeFlow.").optional(),
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
      }).describe("Oauth2AuthCodeFlowGoogleManaged.").optional(),
      oauth2ClientCredentials: z.object({
        clientId: z.string().describe("Optional. The client identifier.")
          .optional(),
        clientSecret: z.object({
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe(
          "Optional. Secret version reference containing the client secret.",
        ).optional(),
      }).describe("Oauth2ClientCredentials.").optional(),
      oauth2JwtBearer: z.object({
        clientKey: z.object({
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe(
          "Optional. Secret version reference containing a PKCS#8 PEM-encoded private key associated with the Client Certificate. This private key will be used to sign JWTs used for the jwt-bearer authorization grant. Specified in the form as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
        jwtClaims: z.object({
          audience: z.string().describe('Optional. Value for the "aud" claim.')
            .optional(),
          issuer: z.string().describe('Optional. Value for the "iss" claim.')
            .optional(),
          subject: z.string().describe('Optional. Value for the "sub" claim.')
            .optional(),
        }).describe(
          "Optional. JwtClaims providers fields to generate the token.",
        ).optional(),
      }).describe("Oauth2JwtBearer.").optional(),
      sshPublicKey: z.object({
        certType: z.string().describe("Optional. Format of SSH Client cert.")
          .optional(),
        sshClientCert: z.object({
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe(
          "Optional. SSH Client Cert. It should contain both public and private key.",
        ).optional(),
        sshClientCertPass: z.object({
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe(
          "Optional. Password (passphrase) for ssh client certificate if it has one.",
        ).optional(),
        username: z.string().describe(
          "Optional. The user account used to authenticate.",
        ).optional(),
      }).describe("SSH Public Key.").optional(),
      userPassword: z.object({
        password: z.object({
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe(
          "Optional. Secret version reference containing the password.",
        ).optional(),
        username: z.string().describe("Optional. Username.").optional(),
      }).describe("UserPassword.").optional(),
    }).describe("Optional. Auth details for the webhook adapter.").optional(),
    deadLetterConfig: z.object({
      projectId: z.string().describe(
        "Optional. Project which has the topic given.",
      ).optional(),
      topic: z.string().describe(
        "Optional. Topic to push events which couldn't be processed.",
      ).optional(),
    }).describe(
      "Optional. Dead letter configuration for eventing of a connection.",
    ).optional(),
    enrichmentConfig: z.object({
      appendAcl: z.boolean().describe("Optional. Append ACL to the event.")
        .optional(),
    }).describe("Optional. Data enrichment configuration.").optional(),
    enrichmentEnabled: z.boolean().describe("Optional. Enrichment Enabled.")
      .optional(),
    eventsListenerIngressEndpoint: z.string().describe(
      "Output only. Ingress endpoint of the event listener. This is used only when private connectivity is enabled.",
    ).optional(),
    globalEventFilter: z.string().describe(
      "Optional. Filter to be applied on the events to be received by the connection.",
    ).optional(),
    listenerAuthConfig: z.object({
      additionalVariables: z.array(z.object({
        boolValue: z.boolean().describe("Optional. Value is a bool.")
          .optional(),
        encryptionKeyValue: z.object({
          kmsKeyName: z.unknown().describe(
            "Optional. The [KMS key name] with which the content of the Operation is encrypted. The expected format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`. Will be empty string if google managed.",
          ).optional(),
          type: z.unknown().describe(
            "Optional. Specifies the type of the encryption key.",
          ).optional(),
        }).describe("Optional. Value is a Encryption Key.").optional(),
        intValue: z.string().describe("Optional. Value is an integer")
          .optional(),
        key: z.string().describe("Optional. Key of the config variable.")
          .optional(),
        secretValue: z.object({
          secretVersion: z.unknown().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe("Optional. Value is a secret.").optional(),
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
      ]).describe("Optional. The type of authentication configured.")
        .optional(),
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
        }).describe("Optional. Client secret for user-provided OAuth app.")
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
      }).describe("Oauth2AuthCodeFlow.").optional(),
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
      }).describe("Oauth2AuthCodeFlowGoogleManaged.").optional(),
      oauth2ClientCredentials: z.object({
        clientId: z.string().describe("Optional. The client identifier.")
          .optional(),
        clientSecret: z.object({
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe(
          "Optional. Secret version reference containing the client secret.",
        ).optional(),
      }).describe("Oauth2ClientCredentials.").optional(),
      oauth2JwtBearer: z.object({
        clientKey: z.object({
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe(
          "Optional. Secret version reference containing a PKCS#8 PEM-encoded private key associated with the Client Certificate. This private key will be used to sign JWTs used for the jwt-bearer authorization grant. Specified in the form as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
        jwtClaims: z.object({
          audience: z.string().describe('Optional. Value for the "aud" claim.')
            .optional(),
          issuer: z.string().describe('Optional. Value for the "iss" claim.')
            .optional(),
          subject: z.string().describe('Optional. Value for the "sub" claim.')
            .optional(),
        }).describe(
          "Optional. JwtClaims providers fields to generate the token.",
        ).optional(),
      }).describe("Oauth2JwtBearer.").optional(),
      sshPublicKey: z.object({
        certType: z.string().describe("Optional. Format of SSH Client cert.")
          .optional(),
        sshClientCert: z.object({
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe(
          "Optional. SSH Client Cert. It should contain both public and private key.",
        ).optional(),
        sshClientCertPass: z.object({
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe(
          "Optional. Password (passphrase) for ssh client certificate if it has one.",
        ).optional(),
        username: z.string().describe(
          "Optional. The user account used to authenticate.",
        ).optional(),
      }).describe("SSH Public Key.").optional(),
      userPassword: z.object({
        password: z.object({
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe(
          "Optional. Secret version reference containing the password.",
        ).optional(),
        username: z.string().describe("Optional. Username.").optional(),
      }).describe("UserPassword.").optional(),
    }).describe("Optional. Auth details for the event listener.").optional(),
    privateConnectivityAllowlistedProjects: z.array(z.string()).describe(
      "Optional. List of projects to be allowlisted for the service attachment created in the tenant project for eventing ingress.",
    ).optional(),
    privateConnectivityEnabled: z.boolean().describe(
      "Optional. Private Connectivity Enabled.",
    ).optional(),
    proxyDestinationConfig: z.object({
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
    }).describe("Optional. Proxy for Eventing auto-registration.").optional(),
    registrationDestinationConfig: z.object({
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
    }).describe("Optional. Registration endpoint for auto registration.")
      .optional(),
    sslConfig: z.object({
      additionalVariables: z.array(z.object({
        boolValue: z.boolean().describe("Optional. Value is a bool.")
          .optional(),
        encryptionKeyValue: z.object({
          kmsKeyName: z.unknown().describe(
            "Optional. The [KMS key name] with which the content of the Operation is encrypted. The expected format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`. Will be empty string if google managed.",
          ).optional(),
          type: z.unknown().describe(
            "Optional. Specifies the type of the encryption key.",
          ).optional(),
        }).describe("Optional. Value is a Encryption Key.").optional(),
        intValue: z.string().describe("Optional. Value is an integer")
          .optional(),
        key: z.string().describe("Optional. Key of the config variable.")
          .optional(),
        secretValue: z.object({
          secretVersion: z.unknown().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe("Optional. Value is a secret.").optional(),
        stringValue: z.string().describe("Optional. Value is a string.")
          .optional(),
      })).describe("Optional. Additional SSL related field values").optional(),
      clientCertType: z.enum(["CERT_TYPE_UNSPECIFIED", "PEM"]).describe(
        "Optional. Type of Client Cert (PEM/JKS/.. etc.)",
      ).optional(),
      clientCertificate: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Optional. Client Certificate").optional(),
      clientPrivateKey: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Optional. Client Private Key").optional(),
      clientPrivateKeyPass: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Optional. Secret containing the passphrase protecting the Client Private Key",
      ).optional(),
      privateServerCertificate: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Optional. Private Server Certificate. Needs to be specified if trust model is `PRIVATE`.",
      ).optional(),
      serverCertType: z.enum(["CERT_TYPE_UNSPECIFIED", "PEM"]).describe(
        "Optional. Type of Server Cert (PEM/JKS/.. etc.)",
      ).optional(),
      trustModel: z.enum(["PUBLIC", "PRIVATE", "INSECURE"]).describe(
        "Optional. Trust Model of the SSL connection",
      ).optional(),
      type: z.enum(["SSL_TYPE_UNSPECIFIED", "TLS", "MTLS"]).describe(
        "Optional. Controls the ssl type for the given connector version.",
      ).optional(),
      useSsl: z.boolean().describe("Optional. Bool for enabling SSL")
        .optional(),
    }).describe("Optional. Ssl config of a connection").optional(),
  }).describe("Optional. Eventing config of a connection").optional(),
  eventingEnablementType: z.enum([
    "EVENTING_ENABLEMENT_TYPE_UNSPECIFIED",
    "EVENTING_AND_CONNECTION",
    "ONLY_EVENTING",
  ]).describe(
    "Optional. Eventing enablement type. Will be nil if eventing is not enabled.",
  ).optional(),
  fallbackOnAdminCredentials: z.boolean().describe(
    "Optional. Fallback on admin credentials for the connection. If this both auth_override_enabled and fallback_on_admin_credentials are set to true, the connection will use the admin credentials if the dynamic auth header is not present during auth override.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Resource labels to represent user-provided metadata. Refer to cloud documentation on labels for more details. https://cloud.google.com/compute/docs/labeling-resources",
  ).optional(),
  lockConfig: z.object({
    locked: z.boolean().describe(
      "Optional. Indicates whether or not the connection is locked.",
    ).optional(),
    reason: z.string().describe(
      "Optional. Describes why a connection is locked.",
    ).optional(),
  }).describe(
    "Optional. Configuration that indicates whether or not the Connection can be edited.",
  ).optional(),
  logConfig: z.object({
    enabled: z.boolean().describe(
      "Optional. Enabled represents whether logging is enabled or not for a connection.",
    ).optional(),
    level: z.enum(["LOG_LEVEL_UNSPECIFIED", "ERROR", "INFO", "DEBUG"]).describe(
      "Optional. Log configuration level.",
    ).optional(),
  }).describe("Optional. Log configuration for the connection.").optional(),
  nodeConfig: z.object({
    maxNodeCount: z.number().int().describe(
      "Optional. Maximum number of nodes in the runtime nodes.",
    ).optional(),
    minNodeCount: z.number().int().describe(
      "Optional. Minimum number of nodes in the runtime nodes.",
    ).optional(),
  }).describe("Optional. Node configuration for the connection.").optional(),
  serviceAccount: z.string().describe(
    "Optional. Service account needed for runtime plane to access Google Cloud resources.",
  ).optional(),
  sslConfig: z.object({
    additionalVariables: z.array(z.object({
      boolValue: z.boolean().describe("Optional. Value is a bool.").optional(),
      encryptionKeyValue: z.object({
        kmsKeyName: z.string().describe(
          "Optional. The [KMS key name] with which the content of the Operation is encrypted. The expected format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`. Will be empty string if google managed.",
        ).optional(),
        type: z.enum(["TYPE_UNSPECIFIED", "GOOGLE_MANAGED", "CUSTOMER_MANAGED"])
          .describe("Optional. Specifies the type of the encryption key.")
          .optional(),
      }).describe("Optional. Value is a Encryption Key.").optional(),
      intValue: z.string().describe("Optional. Value is an integer").optional(),
      key: z.string().describe("Optional. Key of the config variable.")
        .optional(),
      secretValue: z.object({
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Optional. Value is a secret.").optional(),
      stringValue: z.string().describe("Optional. Value is a string.")
        .optional(),
    })).describe("Optional. Additional SSL related field values").optional(),
    clientCertType: z.enum(["CERT_TYPE_UNSPECIFIED", "PEM"]).describe(
      "Optional. Type of Client Cert (PEM/JKS/.. etc.)",
    ).optional(),
    clientCertificate: z.object({
      secretVersion: z.string().describe(
        "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
      ).optional(),
    }).describe("Optional. Client Certificate").optional(),
    clientPrivateKey: z.object({
      secretVersion: z.string().describe(
        "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
      ).optional(),
    }).describe("Optional. Client Private Key").optional(),
    clientPrivateKeyPass: z.object({
      secretVersion: z.string().describe(
        "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
      ).optional(),
    }).describe(
      "Optional. Secret containing the passphrase protecting the Client Private Key",
    ).optional(),
    privateServerCertificate: z.object({
      secretVersion: z.string().describe(
        "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
      ).optional(),
    }).describe(
      "Optional. Private Server Certificate. Needs to be specified if trust model is `PRIVATE`.",
    ).optional(),
    serverCertType: z.enum(["CERT_TYPE_UNSPECIFIED", "PEM"]).describe(
      "Optional. Type of Server Cert (PEM/JKS/.. etc.)",
    ).optional(),
    trustModel: z.enum(["PUBLIC", "PRIVATE", "INSECURE"]).describe(
      "Optional. Trust Model of the SSL connection",
    ).optional(),
    type: z.enum(["SSL_TYPE_UNSPECIFIED", "TLS", "MTLS"]).describe(
      "Optional. Controls the ssl type for the given connector version.",
    ).optional(),
    useSsl: z.boolean().describe("Optional. Bool for enabling SSL").optional(),
  }).describe("Optional. Ssl config of a connection").optional(),
  suspended: z.boolean().describe(
    "Optional. Suspended indicates if a user has suspended a connection or not.",
  ).optional(),
  trafficShapingConfigs: z.array(z.object({
    duration: z.string().describe(
      "Required. Specifies the duration over which the API call quota limits are calculated. This duration is used to define the time window for evaluating if the number of API calls made by a user is within the allowed quota limits. For example: - To define a quota sampled over 16 seconds, set `seconds` to 16 - To define a quota sampled over 5 minutes, set `seconds` to 300 (5 * 60) - To define a quota sampled over 1 day, set `seconds` to 86400 (24 * 60 * 60) and so on. It is important to note that this duration is not the time the quota is valid for, but rather the time window over which the quota is evaluated. For example, if the quota is 100 calls per 10 seconds, then this duration field would be set to 10 seconds.",
    ).optional(),
    quotaLimit: z.string().describe(
      "Required. Maximum number of api calls allowed.",
    ).optional(),
  })).describe("Optional. Traffic shaping configuration for the connection.")
    .optional(),
  connectionId: z.string().describe(
    "Required. Identifier to assign to the Connection. Must be unique within scope of the parent resource.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
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

/** Swamp extension model for Google Cloud Connectors Connections. Registered at `@swamp/gcp/connectors/connections`. */
export const model = {
  type: "@swamp/gcp/connectors/connections",
  version: "2026.10.13.1",
  upgrades: [
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
      toVersion: "2026.09.07.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.2",
      description:
        "Removed: filterKey, filterType, intValue, stringListValues, listValues, stringValue, additionalVariables, boolValue, encryptionKeyValue, kmsKeyName, type, intValue, key, secretValue, secretVersion, stringValue, authKey, authType, oauth2AuthCodeFlow, authCode, authUri, clientId, clientSecret, secretVersion, enablePkce, pkceVerifier, redirectUri, oauth2AuthCodeFlowGoogleManaged, authCode, redirectUri, oauth2ClientCredentials, clientId, clientSecret, secretVersion, oauth2JwtBearer, clientKey, secretVersion, jwtClaims, audience, issuer, subject, sshPublicKey, certType, sshClientCert, secretVersion, sshClientCertPass, secretVersion, username, userPassword, password, secretVersion, username, boolValue, encryptionKeyValue, kmsKeyName, type, intValue, key, secretValue, secretVersion, stringValue, destinations, host, port, serviceAttachment, key, additionalVariables, boolValue, encryptionKeyValue, kmsKeyName, type, intValue, key, secretValue, secretVersion, stringValue, authKey, authType, oauth2AuthCodeFlow, authCode, authUri, clientId, clientSecret, secretVersion, enablePkce, pkceVerifier, redirectUri, oauth2AuthCodeFlowGoogleManaged, authCode, redirectUri, oauth2ClientCredentials, clientId, clientSecret, secretVersion, oauth2JwtBearer, clientKey, secretVersion, jwtClaims, audience, issuer, subject, sshPublicKey, certType, sshClientCert, secretVersion, sshClientCertPass, secretVersion, username, userPassword, password, secretVersion, username, additionalVariables, boolValue, encryptionKeyValue, kmsKeyName, type, intValue, key, secretValue, secretVersion, stringValue, allowedEventTypes, additionalVariables, boolValue, encryptionKeyValue, kmsKeyName, type, intValue, key, secretValue, secretVersion, stringValue, authKey, authType, oauth2AuthCodeFlow, authCode, authUri, clientId, clientSecret, secretVersion, enablePkce, pkceVerifier, redirectUri, oauth2AuthCodeFlowGoogleManaged, authCode, redirectUri, oauth2ClientCredentials, clientId, clientSecret, secretVersion, oauth2JwtBearer, clientKey, secretVersion, jwtClaims, audience, issuer, subject, sshPublicKey, certType, sshClientCert, secretVersion, sshClientCertPass, secretVersion, username, userPassword, password, secretVersion, username, deadLetterConfig, projectId, topic, enrichmentConfig, appendAcl, enrichmentEnabled, eventsListenerIngressEndpoint, globalEventFilter, listenerAuthConfig, additionalVariables, boolValue, encryptionKeyValue, kmsKeyName, type, intValue, key, secretValue, secretVersion, stringValue, authKey, authType, oauth2AuthCodeFlow, authCode, authUri, clientId, clientSecret, secretVersion, enablePkce, pkceVerifier, redirectUri, oauth2AuthCodeFlowGoogleManaged, authCode, redirectUri, oauth2ClientCredentials, clientId, clientSecret, secretVersion, oauth2JwtBearer, clientKey, secretVersion, jwtClaims, audience, issuer, subject, sshPublicKey, certType, sshClientCert, secretVersion, sshClientCertPass, secretVersion, username, userPassword, password, secretVersion, username, privateConnectivityAllowlistedProjects, privateConnectivityEnabled, proxyDestinationConfig, destinations, host, port, serviceAttachment, key, registrationDestinationConfig, destinations, host, port, serviceAttachment, key, additionalVariables, boolValue, encryptionKeyValue, kmsKeyName, type, intValue, key, secretValue, secretVersion, stringValue, clientCertType, clientCertificate, secretVersion, clientPrivateKey, secretVersion, clientPrivateKeyPass, secretVersion, privateServerCertificate, secretVersion, serverCertType, trustModel, type, useSsl, locked, reason, enabled, level, maxNodeCount, minNodeCount, additionalVariables, boolValue, encryptionKeyValue, kmsKeyName, type, intValue, key, secretValue, secretVersion, stringValue, clientCertType, clientCertificate, secretVersion, clientPrivateKey, secretVersion, clientPrivateKeyPass, secretVersion, privateServerCertificate, secretVersion, serverCertType, trustModel, type, useSsl, duration, quotaLimit",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          filterKey: _filterKey,
          filterType: _filterType,
          intValue: _intValue,
          stringListValues: _stringListValues,
          listValues: _listValues,
          stringValue: _stringValue,
          additionalVariables: _additionalVariables,
          boolValue: _boolValue,
          encryptionKeyValue: _encryptionKeyValue,
          kmsKeyName: _kmsKeyName,
          type: _type,
          key: _key,
          secretValue: _secretValue,
          secretVersion: _secretVersion,
          authKey: _authKey,
          authType: _authType,
          oauth2AuthCodeFlow: _oauth2AuthCodeFlow,
          authCode: _authCode,
          authUri: _authUri,
          clientId: _clientId,
          clientSecret: _clientSecret,
          enablePkce: _enablePkce,
          pkceVerifier: _pkceVerifier,
          redirectUri: _redirectUri,
          oauth2AuthCodeFlowGoogleManaged: _oauth2AuthCodeFlowGoogleManaged,
          oauth2ClientCredentials: _oauth2ClientCredentials,
          oauth2JwtBearer: _oauth2JwtBearer,
          clientKey: _clientKey,
          jwtClaims: _jwtClaims,
          audience: _audience,
          issuer: _issuer,
          subject: _subject,
          sshPublicKey: _sshPublicKey,
          certType: _certType,
          sshClientCert: _sshClientCert,
          sshClientCertPass: _sshClientCertPass,
          username: _username,
          userPassword: _userPassword,
          password: _password,
          destinations: _destinations,
          host: _host,
          port: _port,
          serviceAttachment: _serviceAttachment,
          allowedEventTypes: _allowedEventTypes,
          deadLetterConfig: _deadLetterConfig,
          projectId: _projectId,
          topic: _topic,
          enrichmentConfig: _enrichmentConfig,
          appendAcl: _appendAcl,
          enrichmentEnabled: _enrichmentEnabled,
          eventsListenerIngressEndpoint: _eventsListenerIngressEndpoint,
          globalEventFilter: _globalEventFilter,
          listenerAuthConfig: _listenerAuthConfig,
          privateConnectivityAllowlistedProjects:
            _privateConnectivityAllowlistedProjects,
          privateConnectivityEnabled: _privateConnectivityEnabled,
          proxyDestinationConfig: _proxyDestinationConfig,
          registrationDestinationConfig: _registrationDestinationConfig,
          clientCertType: _clientCertType,
          clientCertificate: _clientCertificate,
          clientPrivateKey: _clientPrivateKey,
          clientPrivateKeyPass: _clientPrivateKeyPass,
          privateServerCertificate: _privateServerCertificate,
          serverCertType: _serverCertType,
          trustModel: _trustModel,
          useSsl: _useSsl,
          locked: _locked,
          reason: _reason,
          enabled: _enabled,
          level: _level,
          maxNodeCount: _maxNodeCount,
          minNodeCount: _minNodeCount,
          duration: _duration,
          quotaLimit: _quotaLimit,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Connection represents an instance of connector.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a connections",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["adminFilters"] !== undefined) {
          body["adminFilters"] = g["adminFilters"];
        }
        if (g["asyncOperationsEnabled"] !== undefined) {
          body["asyncOperationsEnabled"] = g["asyncOperationsEnabled"];
        }
        if (g["authConfig"] !== undefined) body["authConfig"] = g["authConfig"];
        if (g["authOverrideEnabled"] !== undefined) {
          body["authOverrideEnabled"] = g["authOverrideEnabled"];
        }
        if (g["configVariables"] !== undefined) {
          body["configVariables"] = g["configVariables"];
        }
        if (g["connectorVersion"] !== undefined) {
          body["connectorVersion"] = g["connectorVersion"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["destinationConfigs"] !== undefined) {
          body["destinationConfigs"] = g["destinationConfigs"];
        }
        if (g["euaOauthAuthConfig"] !== undefined) {
          body["euaOauthAuthConfig"] = g["euaOauthAuthConfig"];
        }
        if (g["eventingConfig"] !== undefined) {
          body["eventingConfig"] = g["eventingConfig"];
        }
        if (g["eventingEnablementType"] !== undefined) {
          body["eventingEnablementType"] = g["eventingEnablementType"];
        }
        if (g["fallbackOnAdminCredentials"] !== undefined) {
          body["fallbackOnAdminCredentials"] = g["fallbackOnAdminCredentials"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["lockConfig"] !== undefined) body["lockConfig"] = g["lockConfig"];
        if (g["logConfig"] !== undefined) body["logConfig"] = g["logConfig"];
        if (g["nodeConfig"] !== undefined) body["nodeConfig"] = g["nodeConfig"];
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["sslConfig"] !== undefined) body["sslConfig"] = g["sslConfig"];
        if (g["suspended"] !== undefined) body["suspended"] = g["suspended"];
        if (g["trafficShapingConfigs"] !== undefined) {
          body["trafficShapingConfigs"] = g["trafficShapingConfigs"];
        }
        if (g["connectionId"] !== undefined) {
          params["connectionId"] = String(g["connectionId"]);
        }
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
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
      description: "Get a connections",
      arguments: z.object({
        identifier: z.string().describe("The name of the connections"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
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
      description: "Update connections attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific connections by name (e.g. one discovered by list)",
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
        const existingName = existing["name"]?.toString();
        if (existingName && existingName.includes("/")) {
          params["name"] = existingName;
        } else {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["adminFilters"] !== undefined) {
          body["adminFilters"] = g["adminFilters"];
        }
        if (g["asyncOperationsEnabled"] !== undefined) {
          body["asyncOperationsEnabled"] = g["asyncOperationsEnabled"];
        }
        if (g["authConfig"] !== undefined) body["authConfig"] = g["authConfig"];
        if (g["authOverrideEnabled"] !== undefined) {
          body["authOverrideEnabled"] = g["authOverrideEnabled"];
        }
        if (g["configVariables"] !== undefined) {
          body["configVariables"] = g["configVariables"];
        }
        if (g["connectorVersion"] !== undefined) {
          body["connectorVersion"] = g["connectorVersion"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["destinationConfigs"] !== undefined) {
          body["destinationConfigs"] = g["destinationConfigs"];
        }
        if (g["euaOauthAuthConfig"] !== undefined) {
          body["euaOauthAuthConfig"] = g["euaOauthAuthConfig"];
        }
        if (g["eventingConfig"] !== undefined) {
          body["eventingConfig"] = g["eventingConfig"];
        }
        if (g["eventingEnablementType"] !== undefined) {
          body["eventingEnablementType"] = g["eventingEnablementType"];
        }
        if (g["fallbackOnAdminCredentials"] !== undefined) {
          body["fallbackOnAdminCredentials"] = g["fallbackOnAdminCredentials"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["lockConfig"] !== undefined) body["lockConfig"] = g["lockConfig"];
        if (g["logConfig"] !== undefined) body["logConfig"] = g["logConfig"];
        if (g["nodeConfig"] !== undefined) body["nodeConfig"] = g["nodeConfig"];
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["sslConfig"] !== undefined) body["sslConfig"] = g["sslConfig"];
        if (g["suspended"] !== undefined) body["suspended"] = g["suspended"];
        if (g["trafficShapingConfigs"] !== undefined) {
          body["trafficShapingConfigs"] = g["trafficShapingConfigs"];
        }
        const updateMaskKeys = Object.keys(body);
        if (updateMaskKeys.length > 0) {
          params["updateMask"] = updateMaskKeys.join(",");
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
      description: "Delete the connections",
      arguments: z.object({
        identifier: z.string().describe("The name of the connections"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
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
      description: "Sync connections state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific connections by name (e.g. one discovered by list)",
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
          const existingName = existing.name?.toString();
          if (existingName && existingName.includes("/")) {
            params["name"] = existingName;
          } else {
            const shortName = existingName ?? g["name"]?.toString();
            if (!shortName) throw new Error("No identifier found");
            params["name"] = buildResourceName(
              `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
              shortName,
            );
          }
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
      description: "List connections resources",
      arguments: z.object({
        filter: z.string().describe("Filter.").optional(),
        orderBy: z.string().describe("Order by parameters.").optional(),
        pageSize: z.number().describe("Page size.").optional(),
        view: z.string().describe(
          "Specifies which fields of the Connection are returned in the response. Defaults to `BASIC` view.",
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
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "connections",
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
    fetch_toolspec_override: {
      description: "fetch toolspec override",
      arguments: z.object({
        toolNames: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["toolNames"] !== undefined) {
          body["toolNames"] = args["toolNames"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "connectors.projects.locations.connections.fetchToolspecOverride",
            "path": "v1/{+name}:fetchToolspecOverride",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    generate_toolspec_override: {
      description: "generate toolspec override",
      arguments: z.object({
        toolNames: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["toolNames"] !== undefined) {
          body["toolNames"] = args["toolNames"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "connectors.projects.locations.connections.generateToolspecOverride",
            "path": "v1/{+name}:generateToolspecOverride",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    get_connection_schema_metadata: {
      description: "get connection schema metadata",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "connectors.projects.locations.connections.getConnectionSchemaMetadata",
            "path": "v1/{+name}",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({
        options_requestedPolicyVersion: z.any().optional(),
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
        if (args["options_requestedPolicyVersion"] !== undefined) {
          params["options.requestedPolicyVersion"] = String(
            args["options_requestedPolicyVersion"],
          );
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "connectors.projects.locations.connections.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["resource"],
            "parameters": {
              "options.requestedPolicyVersion": { "location": "query" },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    listen_event: {
      description: "listen event",
      arguments: z.object({
        payload: z.any().optional(),
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
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resourcePath"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["payload"] !== undefined) body["payload"] = args["payload"];
        const result = await createResource(
          baseUrl,
          {
            "id": "connectors.projects.locations.connections.listenEvent",
            "path": "v1/{+resourcePath}:listenEvent",
            "httpMethod": "POST",
            "parameterOrder": ["resourcePath"],
            "parameters": {
              "resourcePath": { "location": "path", "required": true },
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
    modify_toolspec_override: {
      description: "modify toolspec override",
      arguments: z.object({
        toolspecOverride: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["toolspecOverride"] !== undefined) {
          body["toolspecOverride"] = args["toolspecOverride"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "connectors.projects.locations.connections.modifyToolspecOverride",
            "path": "v1/{+name}:modifyToolspecOverride",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    repair_eventing: {
      description: "repair eventing",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "connectors.projects.locations.connections.repairEventing",
            "path": "v1/{+name}:repairEventing",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    search: {
      description: "search",
      arguments: z.object({
        pageSize: z.any().optional(),
        pageToken: z.any().optional(),
        query: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["pageToken"] !== undefined) {
          params["pageToken"] = String(args["pageToken"]);
        }
        if (args["query"] !== undefined) {
          params["query"] = String(args["query"]);
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "connectors.projects.locations.connections.search",
            "path": "v1/{+name}:search",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "query": { "location": "query" },
            },
          },
          params,
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
        updateMask: z.any().optional(),
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
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "connectors.projects.locations.connections.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
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
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        permissions: z.any().optional(),
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
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "connectors.projects.locations.connections.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
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
