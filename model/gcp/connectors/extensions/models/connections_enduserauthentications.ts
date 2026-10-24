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

// Auto-generated extension model for @swamp/gcp/connectors/connections-enduserauthentications
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Connectors Connections.EndUserAuthentications.
 *
 * AuthConfig defines details of a authentication type.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
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
  return `${parent}/endUserAuthentications/${shortName}`;
}

const BASE_URL = "https://connectors.googleapis.com/";

const GET_CONFIG = {
  "id": "connectors.projects.locations.connections.endUserAuthentications.get",
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
  "id":
    "connectors.projects.locations.connections.endUserAuthentications.create",
  "path": "v1/{+parent}/endUserAuthentications",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "endUserAuthenticationId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id":
    "connectors.projects.locations.connections.endUserAuthentications.patch",
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
  "id":
    "connectors.projects.locations.connections.endUserAuthentications.delete",
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
  "id": "connectors.projects.locations.connections.endUserAuthentications.list",
  "path": "v1/{+parent}/endUserAuthentications",
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
  },
} as const;

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
  configVariables: z.array(z.object({
    boolValue: z.boolean().describe("Value is a bool.").optional(),
    intValue: z.string().describe("Value is an integer").optional(),
    key: z.string().describe("Required. Key of the config variable.")
      .optional(),
    secretValue: z.object({
      secretValue: z.string().describe(
        "Optional. The plain string value of the secret.",
      ).optional(),
      secretVersion: z.string().describe(
        "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
      ).optional(),
    }).describe("Value is a secret").optional(),
    stringValue: z.string().describe("Value is a string.").optional(),
  })).describe("Optional. Config variables for the EndUserAuthentication.")
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
  })).describe("Optional. Destination configs for the EndUserAuthentication.")
    .optional(),
  endUserAuthenticationConfig: z.object({
    additionalVariables: z.array(z.object({
      boolValue: z.boolean().describe("Value is a bool.").optional(),
      intValue: z.string().describe("Value is an integer").optional(),
      key: z.string().describe("Required. Key of the config variable.")
        .optional(),
      secretValue: z.object({
        secretValue: z.string().describe(
          "Optional. The plain string value of the secret.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Value is a secret").optional(),
      stringValue: z.string().describe("Value is a string.").optional(),
    })).describe("Optional. List containing additional auth configs.")
      .optional(),
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
        secretValue: z.string().describe(
          "Optional. The plain string value of the secret.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Optional. Client secret for user-provided OAuth app.")
        .optional(),
      enablePkce: z.boolean().describe(
        "Optional. Whether to enable PKCE when the user performs the auth code flow.",
      ).optional(),
      oauthTokenData: z.object({
        accessToken: z.object({
          secretValue: z.string().describe(
            "Optional. The plain string value of the secret.",
          ).optional(),
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe("Optional. Access token for the connection.").optional(),
        createTime: z.string().describe(
          "Optional. Timestamp when the access token was created.",
        ).optional(),
        expiry: z.string().describe(
          "Optional. Time in seconds when the access token expires.",
        ).optional(),
        refreshToken: z.object({
          secretValue: z.string().describe(
            "Optional. The plain string value of the secret.",
          ).optional(),
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe("Optional. Refresh token for the connection.").optional(),
      }).describe("Optional. Auth Code Data").optional(),
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
      oauthTokenData: z.object({
        accessToken: z.object({
          secretValue: z.string().describe(
            "Optional. The plain string value of the secret.",
          ).optional(),
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe("Optional. Access token for the connection.").optional(),
        createTime: z.string().describe(
          "Optional. Timestamp when the access token was created.",
        ).optional(),
        expiry: z.string().describe(
          "Optional. Time in seconds when the access token expires.",
        ).optional(),
        refreshToken: z.object({
          secretValue: z.string().describe(
            "Optional. The plain string value of the secret.",
          ).optional(),
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe("Optional. Refresh token for the connection.").optional(),
      }).describe("Auth Code Data").optional(),
      redirectUri: z.string().describe(
        "Optional. Redirect URI to be provided during the auth code exchange.",
      ).optional(),
      scopes: z.array(z.string()).describe(
        "Required. Scopes the connection will request when the user performs the auth code flow.",
      ).optional(),
    }).describe("Oauth2AuthCodeFlowGoogleManaged.").optional(),
    oauth2ClientCredentials: z.object({
      clientId: z.string().describe("The client identifier.").optional(),
      clientSecret: z.object({
        secretValue: z.string().describe(
          "Optional. The plain string value of the secret.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Required. string value or secret version containing the client secret.",
      ).optional(),
    }).describe("Oauth2ClientCredentials.").optional(),
    oauth2JwtBearer: z.object({
      clientKey: z.object({
        secretValue: z.string().describe(
          "Optional. The plain string value of the secret.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Required. secret version/value reference containing a PKCS#8 PEM-encoded private key associated with the Client Certificate. This private key will be used to sign JWTs used for the jwt-bearer authorization grant. Specified in the form as: `projects/*/strings/*/versions/*`.",
      ).optional(),
      jwtClaims: z.object({
        audience: z.string().describe('Value for the "aud" claim.').optional(),
        issuer: z.string().describe('Value for the "iss" claim.').optional(),
        subject: z.string().describe('Value for the "sub" claim.').optional(),
      }).describe("JwtClaims providers fields to generate the token.")
        .optional(),
    }).describe("Oauth2JwtBearer.").optional(),
    sshPublicKey: z.object({
      certType: z.string().describe("Format of SSH Client cert.").optional(),
      sshClientCert: z.object({
        secretValue: z.string().describe(
          "Optional. The plain string value of the secret.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Required. SSH Client Cert. It should contain both public and private key.",
      ).optional(),
      sshClientCertPass: z.object({
        secretValue: z.string().describe(
          "Optional. The plain string value of the secret.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Required. Password (passphrase) for ssh client certificate if it has one.",
      ).optional(),
      username: z.string().describe("The user account used to authenticate.")
        .optional(),
    }).describe("SSH Public Key.").optional(),
    userPassword: z.object({
      password: z.object({
        secretValue: z.string().describe(
          "Optional. The plain string value of the secret.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Required. string value or secret version reference containing the password.",
      ).optional(),
      username: z.string().describe("Username.").optional(),
    }).describe("UserPassword.").optional(),
  }).describe(
    "Optional. The EndUserAuthenticationConfig for the EndUserAuthentication.",
  ).optional(),
  labels: z.array(z.string()).describe(
    "Optional. Labels for the EndUserAuthentication.",
  ).optional(),
  name: z.string().describe(
    "Required. Identifier. Resource name of the EndUserAuthentication. Format: projects/{project}/locations/{location}/connections/{connection}/endUserAuthentications/{end_user_authentication}",
  ).optional(),
  notifyEndpointDestination: z.object({
    endpoint: z.object({
      endpointUri: z.string().describe("Required. The URI of the Endpoint.")
        .optional(),
      headers: z.array(z.object({
        key: z.string().describe("Required. Key of Header.").optional(),
        value: z.string().describe("Required. Value of Header.").optional(),
      })).describe("Optional. List of Header to be added to the Endpoint.")
        .optional(),
    }).describe(
      "Optional. OPTION 1: Hit an endpoint when the refresh token is expired.",
    ).optional(),
    serviceAccount: z.string().describe(
      "Required. Service account needed for runtime plane to notify the backend.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "ENDPOINT"]).describe(
      "Required. type of the destination",
    ).optional(),
  }).describe("Optional. The destination to hit when we receive an event")
    .optional(),
  roles: z.array(
    z.enum(["ROLE_UNSPECIFIED", "READER", "READER_DOMAIN_WIDE_ACCESSIBLE"]),
  ).describe("Optional. Roles for the EndUserAuthentication.").optional(),
  status: z.object({
    description: z.string().describe("Output only. Description of the state.")
      .optional(),
    state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "ERROR"]).describe(
      "Output only. State of Event Subscription resource.",
    ).optional(),
  }).describe("Optional. Status of the EndUserAuthentication.").optional(),
  userId: z.string().describe("Optional. The user id of the user.").optional(),
  endUserAuthenticationId: z.string().describe(
    "Required. Identifier to assign to the EndUserAuthentication. Must be unique within scope of the parent resource.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  configVariables: z.array(z.object({
    boolValue: z.boolean(),
    intValue: z.string(),
    key: z.string(),
    secretValue: z.object({
      secretValue: z.string(),
      secretVersion: z.string(),
    }),
    stringValue: z.string(),
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
  endUserAuthenticationConfig: z.object({
    additionalVariables: z.array(z.object({
      boolValue: z.boolean(),
      intValue: z.string(),
      key: z.string(),
      secretValue: z.object({
        secretValue: z.string(),
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
        secretValue: z.string(),
        secretVersion: z.string(),
      }),
      enablePkce: z.boolean(),
      oauthTokenData: z.object({
        accessToken: z.object({
          secretValue: z.string(),
          secretVersion: z.string(),
        }),
        createTime: z.string(),
        expiry: z.string(),
        refreshToken: z.object({
          secretValue: z.string(),
          secretVersion: z.string(),
        }),
      }),
      pkceVerifier: z.string(),
      redirectUri: z.string(),
      scopes: z.array(z.string()),
    }),
    oauth2AuthCodeFlowGoogleManaged: z.object({
      authCode: z.string(),
      oauthTokenData: z.object({
        accessToken: z.object({
          secretValue: z.string(),
          secretVersion: z.string(),
        }),
        createTime: z.string(),
        expiry: z.string(),
        refreshToken: z.object({
          secretValue: z.string(),
          secretVersion: z.string(),
        }),
      }),
      redirectUri: z.string(),
      scopes: z.array(z.string()),
    }),
    oauth2ClientCredentials: z.object({
      clientId: z.string(),
      clientSecret: z.object({
        secretValue: z.string(),
        secretVersion: z.string(),
      }),
    }),
    oauth2JwtBearer: z.object({
      clientKey: z.object({
        secretValue: z.string(),
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
        secretValue: z.string(),
        secretVersion: z.string(),
      }),
      sshClientCertPass: z.object({
        secretValue: z.string(),
        secretVersion: z.string(),
      }),
      username: z.string(),
    }),
    userPassword: z.object({
      password: z.object({
        secretValue: z.string(),
        secretVersion: z.string(),
      }),
      username: z.string(),
    }),
  }).optional(),
  labels: z.array(z.string()).optional(),
  name: z.string(),
  notifyEndpointDestination: z.object({
    endpoint: z.object({
      endpointUri: z.string(),
      headers: z.array(z.object({
        key: z.string(),
        value: z.string(),
      })),
    }),
    serviceAccount: z.string(),
    type: z.string(),
  }).optional(),
  roles: z.array(z.string()).optional(),
  status: z.object({
    description: z.string(),
    state: z.string(),
  }).optional(),
  updateTime: z.string().optional(),
  userId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  configVariables: z.array(z.object({
    boolValue: z.boolean().describe("Value is a bool.").optional(),
    intValue: z.string().describe("Value is an integer").optional(),
    key: z.string().describe("Required. Key of the config variable.")
      .optional(),
    secretValue: z.object({
      secretValue: z.string().describe(
        "Optional. The plain string value of the secret.",
      ).optional(),
      secretVersion: z.string().describe(
        "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
      ).optional(),
    }).describe("Value is a secret").optional(),
    stringValue: z.string().describe("Value is a string.").optional(),
  })).describe("Optional. Config variables for the EndUserAuthentication.")
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
  })).describe("Optional. Destination configs for the EndUserAuthentication.")
    .optional(),
  endUserAuthenticationConfig: z.object({
    additionalVariables: z.array(z.object({
      boolValue: z.boolean().describe("Value is a bool.").optional(),
      intValue: z.string().describe("Value is an integer").optional(),
      key: z.string().describe("Required. Key of the config variable.")
        .optional(),
      secretValue: z.object({
        secretValue: z.string().describe(
          "Optional. The plain string value of the secret.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Value is a secret").optional(),
      stringValue: z.string().describe("Value is a string.").optional(),
    })).describe("Optional. List containing additional auth configs.")
      .optional(),
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
        secretValue: z.string().describe(
          "Optional. The plain string value of the secret.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe("Optional. Client secret for user-provided OAuth app.")
        .optional(),
      enablePkce: z.boolean().describe(
        "Optional. Whether to enable PKCE when the user performs the auth code flow.",
      ).optional(),
      oauthTokenData: z.object({
        accessToken: z.object({
          secretValue: z.string().describe(
            "Optional. The plain string value of the secret.",
          ).optional(),
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe("Optional. Access token for the connection.").optional(),
        createTime: z.string().describe(
          "Optional. Timestamp when the access token was created.",
        ).optional(),
        expiry: z.string().describe(
          "Optional. Time in seconds when the access token expires.",
        ).optional(),
        refreshToken: z.object({
          secretValue: z.string().describe(
            "Optional. The plain string value of the secret.",
          ).optional(),
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe("Optional. Refresh token for the connection.").optional(),
      }).describe("Optional. Auth Code Data").optional(),
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
      oauthTokenData: z.object({
        accessToken: z.object({
          secretValue: z.string().describe(
            "Optional. The plain string value of the secret.",
          ).optional(),
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe("Optional. Access token for the connection.").optional(),
        createTime: z.string().describe(
          "Optional. Timestamp when the access token was created.",
        ).optional(),
        expiry: z.string().describe(
          "Optional. Time in seconds when the access token expires.",
        ).optional(),
        refreshToken: z.object({
          secretValue: z.string().describe(
            "Optional. The plain string value of the secret.",
          ).optional(),
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe("Optional. Refresh token for the connection.").optional(),
      }).describe("Auth Code Data").optional(),
      redirectUri: z.string().describe(
        "Optional. Redirect URI to be provided during the auth code exchange.",
      ).optional(),
      scopes: z.array(z.string()).describe(
        "Required. Scopes the connection will request when the user performs the auth code flow.",
      ).optional(),
    }).describe("Oauth2AuthCodeFlowGoogleManaged.").optional(),
    oauth2ClientCredentials: z.object({
      clientId: z.string().describe("The client identifier.").optional(),
      clientSecret: z.object({
        secretValue: z.string().describe(
          "Optional. The plain string value of the secret.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Required. string value or secret version containing the client secret.",
      ).optional(),
    }).describe("Oauth2ClientCredentials.").optional(),
    oauth2JwtBearer: z.object({
      clientKey: z.object({
        secretValue: z.string().describe(
          "Optional. The plain string value of the secret.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Required. secret version/value reference containing a PKCS#8 PEM-encoded private key associated with the Client Certificate. This private key will be used to sign JWTs used for the jwt-bearer authorization grant. Specified in the form as: `projects/*/strings/*/versions/*`.",
      ).optional(),
      jwtClaims: z.object({
        audience: z.string().describe('Value for the "aud" claim.').optional(),
        issuer: z.string().describe('Value for the "iss" claim.').optional(),
        subject: z.string().describe('Value for the "sub" claim.').optional(),
      }).describe("JwtClaims providers fields to generate the token.")
        .optional(),
    }).describe("Oauth2JwtBearer.").optional(),
    sshPublicKey: z.object({
      certType: z.string().describe("Format of SSH Client cert.").optional(),
      sshClientCert: z.object({
        secretValue: z.string().describe(
          "Optional. The plain string value of the secret.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Required. SSH Client Cert. It should contain both public and private key.",
      ).optional(),
      sshClientCertPass: z.object({
        secretValue: z.string().describe(
          "Optional. The plain string value of the secret.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Required. Password (passphrase) for ssh client certificate if it has one.",
      ).optional(),
      username: z.string().describe("The user account used to authenticate.")
        .optional(),
    }).describe("SSH Public Key.").optional(),
    userPassword: z.object({
      password: z.object({
        secretValue: z.string().describe(
          "Optional. The plain string value of the secret.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "Required. string value or secret version reference containing the password.",
      ).optional(),
      username: z.string().describe("Username.").optional(),
    }).describe("UserPassword.").optional(),
  }).describe(
    "Optional. The EndUserAuthenticationConfig for the EndUserAuthentication.",
  ).optional(),
  labels: z.array(z.string()).describe(
    "Optional. Labels for the EndUserAuthentication.",
  ).optional(),
  name: z.string().describe(
    "Required. Identifier. Resource name of the EndUserAuthentication. Format: projects/{project}/locations/{location}/connections/{connection}/endUserAuthentications/{end_user_authentication}",
  ).optional(),
  notifyEndpointDestination: z.object({
    endpoint: z.object({
      endpointUri: z.string().describe("Required. The URI of the Endpoint.")
        .optional(),
      headers: z.array(z.object({
        key: z.string().describe("Required. Key of Header.").optional(),
        value: z.string().describe("Required. Value of Header.").optional(),
      })).describe("Optional. List of Header to be added to the Endpoint.")
        .optional(),
    }).describe(
      "Optional. OPTION 1: Hit an endpoint when the refresh token is expired.",
    ).optional(),
    serviceAccount: z.string().describe(
      "Required. Service account needed for runtime plane to notify the backend.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "ENDPOINT"]).describe(
      "Required. type of the destination",
    ).optional(),
  }).describe("Optional. The destination to hit when we receive an event")
    .optional(),
  roles: z.array(
    z.enum(["ROLE_UNSPECIFIED", "READER", "READER_DOMAIN_WIDE_ACCESSIBLE"]),
  ).describe("Optional. Roles for the EndUserAuthentication.").optional(),
  status: z.object({
    description: z.string().describe("Output only. Description of the state.")
      .optional(),
    state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "ERROR"]).describe(
      "Output only. State of Event Subscription resource.",
    ).optional(),
  }).describe("Optional. Status of the EndUserAuthentication.").optional(),
  userId: z.string().describe("Optional. The user id of the user.").optional(),
  endUserAuthenticationId: z.string().describe(
    "Required. Identifier to assign to the EndUserAuthentication. Must be unique within scope of the parent resource.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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

/** Swamp extension model for Google Cloud Connectors Connections.EndUserAuthentications. Registered at `@swamp/gcp/connectors/connections-enduserauthentications`. */
export const model = {
  type: "@swamp/gcp/connectors/connections-enduserauthentications",
  version: "2026.10.23.1",
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
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "AuthConfig defines details of a authentication type.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a endUserAuthentications",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["configVariables"] !== undefined) {
          body["configVariables"] = g["configVariables"];
        }
        if (g["destinationConfigs"] !== undefined) {
          body["destinationConfigs"] = g["destinationConfigs"];
        }
        if (g["endUserAuthenticationConfig"] !== undefined) {
          body["endUserAuthenticationConfig"] =
            g["endUserAuthenticationConfig"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["notifyEndpointDestination"] !== undefined) {
          body["notifyEndpointDestination"] = g["notifyEndpointDestination"];
        }
        if (g["roles"] !== undefined) body["roles"] = g["roles"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["userId"] !== undefined) body["userId"] = g["userId"];
        if (g["endUserAuthenticationId"] !== undefined) {
          params["endUserAuthenticationId"] = String(
            g["endUserAuthenticationId"],
          );
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
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
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
          credentials,
        ) as StateData;
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
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
      description: "Get a endUserAuthentications",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the endUserAuthentications",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((g.name ?? result.name)?.toString() ?? args.identifier).replace(
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
      description: "Update endUserAuthentications attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific endUserAuthentications by name (e.g. one discovered by list)",
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
            String(g["parent"] ?? ""),
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["configVariables"] !== undefined) {
          body["configVariables"] = g["configVariables"];
        }
        if (g["destinationConfigs"] !== undefined) {
          body["destinationConfigs"] = g["destinationConfigs"];
        }
        if (g["endUserAuthenticationConfig"] !== undefined) {
          body["endUserAuthenticationConfig"] =
            g["endUserAuthenticationConfig"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["notifyEndpointDestination"] !== undefined) {
          body["notifyEndpointDestination"] = g["notifyEndpointDestination"];
        }
        if (g["roles"] !== undefined) body["roles"] = g["roles"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["userId"] !== undefined) body["userId"] = g["userId"];
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
      description: "Delete the endUserAuthentications",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the endUserAuthentications",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Sync endUserAuthentications state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific endUserAuthentications by name (e.g. one discovered by list)",
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
              String(g["parent"] ?? ""),
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
      description: "List endUserAuthentications resources",
      arguments: z.object({
        filter: z.string().describe("Filter.").optional(),
        orderBy: z.string().describe("Order by parameters.").optional(),
        pageSize: z.number().describe("Page size.").optional(),
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "endUserAuthentications",
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
