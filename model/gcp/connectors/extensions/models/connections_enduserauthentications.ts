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
    }).describe("EUASecret provides a reference to entries in Secret Manager.")
      .optional(),
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
      }).describe(
        "EUASecret provides a reference to entries in Secret Manager.",
      ).optional(),
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
      }).describe(
        "EUASecret provides a reference to entries in Secret Manager.",
      ).optional(),
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
        }).describe(
          "EUASecret provides a reference to entries in Secret Manager.",
        ).optional(),
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
        }).describe(
          "EUASecret provides a reference to entries in Secret Manager.",
        ).optional(),
      }).describe(
        "pass only at create and not update using updateMask Auth Code Data",
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
      oauthTokenData: z.object({
        accessToken: z.object({
          secretValue: z.string().describe(
            "Optional. The plain string value of the secret.",
          ).optional(),
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe(
          "EUASecret provides a reference to entries in Secret Manager.",
        ).optional(),
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
        }).describe(
          "EUASecret provides a reference to entries in Secret Manager.",
        ).optional(),
      }).describe(
        "pass only at create and not update using updateMask Auth Code Data",
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
      clientId: z.string().describe("The client identifier.").optional(),
      clientSecret: z.object({
        secretValue: z.string().describe(
          "Optional. The plain string value of the secret.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "EUASecret provides a reference to entries in Secret Manager.",
      ).optional(),
    }).describe(
      "Parameters to support Oauth 2.0 Client Credentials Grant Authentication. See https://tools.ietf.org/html/rfc6749#section-1.3.4 for more details.",
    ).optional(),
    oauth2JwtBearer: z.object({
      clientKey: z.object({
        secretValue: z.string().describe(
          "Optional. The plain string value of the secret.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "EUASecret provides a reference to entries in Secret Manager.",
      ).optional(),
      jwtClaims: z.object({
        audience: z.string().describe('Value for the "aud" claim.').optional(),
        issuer: z.string().describe('Value for the "iss" claim.').optional(),
        subject: z.string().describe('Value for the "sub" claim.').optional(),
      }).describe("JWT claims used for the jwt-bearer authorization grant.")
        .optional(),
    }).describe(
      "Parameters to support JSON Web Token (JWT) Profile for Oauth 2.0 Authorization Grant based authentication. See https://tools.ietf.org/html/rfc7523 for more details.",
    ).optional(),
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
        "EUASecret provides a reference to entries in Secret Manager.",
      ).optional(),
      sshClientCertPass: z.object({
        secretValue: z.string().describe(
          "Optional. The plain string value of the secret.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "EUASecret provides a reference to entries in Secret Manager.",
      ).optional(),
      username: z.string().describe("The user account used to authenticate.")
        .optional(),
    }).describe("Parameters to support Ssh public key Authentication.")
      .optional(),
    userPassword: z.object({
      password: z.object({
        secretValue: z.string().describe(
          "Optional. The plain string value of the secret.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "EUASecret provides a reference to entries in Secret Manager.",
      ).optional(),
      username: z.string().describe("Username.").optional(),
    }).describe("Parameters to support Username and Password Authentication.")
      .optional(),
  }).describe(
    "EndUserAuthenticationConfig defines details of a authentication configuration for EUC",
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
      "Endpoint message includes details of the Destination endpoint.",
    ).optional(),
    serviceAccount: z.string().describe(
      "Required. Service account needed for runtime plane to notify the backend.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "ENDPOINT"]).describe(
      "Required. type of the destination",
    ).optional(),
  }).describe(
    "Message for NotifyEndpointDestination Destination to hit when the refresh token is expired.",
  ).optional(),
  roles: z.array(
    z.enum(["ROLE_UNSPECIFIED", "READER", "READER_DOMAIN_WIDE_ACCESSIBLE"]),
  ).describe("Optional. Roles for the EndUserAuthentication.").optional(),
  status: z.object({
    description: z.string().describe("Output only. Description of the state.")
      .optional(),
    state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "ERROR"]).describe(
      "Output only. State of Event Subscription resource.",
    ).optional(),
  }).describe(
    "EndUserAuthentication Status denotes the status of the EndUserAuthentication resource.",
  ).optional(),
  userId: z.string().describe("Optional. The user id of the user.").optional(),
  endUserAuthenticationId: z.string().describe(
    "Required. Identifier to assign to the EndUserAuthentication. Must be unique within scope of the parent resource.",
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
    }).describe("EUASecret provides a reference to entries in Secret Manager.")
      .optional(),
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
      }).describe(
        "EUASecret provides a reference to entries in Secret Manager.",
      ).optional(),
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
      }).describe(
        "EUASecret provides a reference to entries in Secret Manager.",
      ).optional(),
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
        }).describe(
          "EUASecret provides a reference to entries in Secret Manager.",
        ).optional(),
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
        }).describe(
          "EUASecret provides a reference to entries in Secret Manager.",
        ).optional(),
      }).describe(
        "pass only at create and not update using updateMask Auth Code Data",
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
      oauthTokenData: z.object({
        accessToken: z.object({
          secretValue: z.string().describe(
            "Optional. The plain string value of the secret.",
          ).optional(),
          secretVersion: z.string().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe(
          "EUASecret provides a reference to entries in Secret Manager.",
        ).optional(),
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
        }).describe(
          "EUASecret provides a reference to entries in Secret Manager.",
        ).optional(),
      }).describe(
        "pass only at create and not update using updateMask Auth Code Data",
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
      clientId: z.string().describe("The client identifier.").optional(),
      clientSecret: z.object({
        secretValue: z.string().describe(
          "Optional. The plain string value of the secret.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "EUASecret provides a reference to entries in Secret Manager.",
      ).optional(),
    }).describe(
      "Parameters to support Oauth 2.0 Client Credentials Grant Authentication. See https://tools.ietf.org/html/rfc6749#section-1.3.4 for more details.",
    ).optional(),
    oauth2JwtBearer: z.object({
      clientKey: z.object({
        secretValue: z.string().describe(
          "Optional. The plain string value of the secret.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "EUASecret provides a reference to entries in Secret Manager.",
      ).optional(),
      jwtClaims: z.object({
        audience: z.string().describe('Value for the "aud" claim.').optional(),
        issuer: z.string().describe('Value for the "iss" claim.').optional(),
        subject: z.string().describe('Value for the "sub" claim.').optional(),
      }).describe("JWT claims used for the jwt-bearer authorization grant.")
        .optional(),
    }).describe(
      "Parameters to support JSON Web Token (JWT) Profile for Oauth 2.0 Authorization Grant based authentication. See https://tools.ietf.org/html/rfc7523 for more details.",
    ).optional(),
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
        "EUASecret provides a reference to entries in Secret Manager.",
      ).optional(),
      sshClientCertPass: z.object({
        secretValue: z.string().describe(
          "Optional. The plain string value of the secret.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "EUASecret provides a reference to entries in Secret Manager.",
      ).optional(),
      username: z.string().describe("The user account used to authenticate.")
        .optional(),
    }).describe("Parameters to support Ssh public key Authentication.")
      .optional(),
    userPassword: z.object({
      password: z.object({
        secretValue: z.string().describe(
          "Optional. The plain string value of the secret.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
        ).optional(),
      }).describe(
        "EUASecret provides a reference to entries in Secret Manager.",
      ).optional(),
      username: z.string().describe("Username.").optional(),
    }).describe("Parameters to support Username and Password Authentication.")
      .optional(),
  }).describe(
    "EndUserAuthenticationConfig defines details of a authentication configuration for EUC",
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
      "Endpoint message includes details of the Destination endpoint.",
    ).optional(),
    serviceAccount: z.string().describe(
      "Required. Service account needed for runtime plane to notify the backend.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "ENDPOINT"]).describe(
      "Required. type of the destination",
    ).optional(),
  }).describe(
    "Message for NotifyEndpointDestination Destination to hit when the refresh token is expired.",
  ).optional(),
  roles: z.array(
    z.enum(["ROLE_UNSPECIFIED", "READER", "READER_DOMAIN_WIDE_ACCESSIBLE"]),
  ).describe("Optional. Roles for the EndUserAuthentication.").optional(),
  status: z.object({
    description: z.string().describe("Output only. Description of the state.")
      .optional(),
    state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "ERROR"]).describe(
      "Output only. State of Event Subscription resource.",
    ).optional(),
  }).describe(
    "EndUserAuthentication Status denotes the status of the EndUserAuthentication resource.",
  ).optional(),
  userId: z.string().describe("Optional. The user id of the user.").optional(),
  endUserAuthenticationId: z.string().describe(
    "Required. Identifier to assign to the EndUserAuthentication. Must be unique within scope of the parent resource.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Connectors Connections.EndUserAuthentications. Registered at `@swamp/gcp/connectors/connections-enduserauthentications`. */
export const model = {
  type: "@swamp/gcp/connectors/connections-enduserauthentications",
  version: "2026.06.05.1",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
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
          body["endUserAuthenticationId"] = g["endUserAuthenticationId"];
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
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a endUserAuthentications",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the endUserAuthentications",
        ),
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
      description: "Update endUserAuthentications attributes",
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
      description: "Delete the endUserAuthentications",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the endUserAuthentications",
        ),
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
      description: "Sync endUserAuthentications state from GCP",
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
        const projectId = await getProjectId();
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
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "endUserAuthentications",
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
