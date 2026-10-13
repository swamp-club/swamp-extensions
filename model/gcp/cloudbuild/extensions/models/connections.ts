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

// Auto-generated extension model for @swamp/gcp/cloudbuild/connections
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Build Connections.
 *
 * A connection to a SCM like GitHub, GitHub Enterprise, Bitbucket Data Center, Bitbucket Cloud or GitLab.
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

const BASE_URL = "https://cloudbuild.googleapis.com/";

const GET_CONFIG = {
  "id": "cloudbuild.projects.locations.connections.get",
  "path": "v2/{+name}",
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
  "id": "cloudbuild.projects.locations.connections.create",
  "path": "v2/{+parent}/connections",
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
  "id": "cloudbuild.projects.locations.connections.patch",
  "path": "v2/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
    "etag": {
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
  "id": "cloudbuild.projects.locations.connections.delete",
  "path": "v2/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "cloudbuild.projects.locations.connections.list",
  "path": "v2/{+parent}/connections",
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
    "returnPartialSuccess": {
      "location": "query",
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
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Allows clients to store small amounts of arbitrary data.",
  ).optional(),
  bitbucketCloudConfig: z.object({
    authorizerCredential: z.object({
      userTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the user token that authorizes the Cloud Build connection. Format: `projects/*/secrets/*/versions/*`.",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated to this token.",
      ).optional(),
    }).describe(
      "Required. An access token with the `webhook`, `repository`, `repository:admin` and `pullrequest` scope access. It can be either a workspace, project or repository access token. It's recommended to use a system account to generate these credentials.",
    ).optional(),
    readAuthorizerCredential: z.object({
      userTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the user token that authorizes the Cloud Build connection. Format: `projects/*/secrets/*/versions/*`.",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated to this token.",
      ).optional(),
    }).describe(
      "Required. An access token with the `repository` access. It can be either a workspace, project or repository access token. It's recommended to use a system account to generate the credentials.",
    ).optional(),
    webhookSecretSecretVersion: z.string().describe(
      "Required. SecretManager resource containing the webhook secret used to verify webhook events, formatted as `projects/*/secrets/*/versions/*`.",
    ).optional(),
    workspace: z.string().describe(
      "Required. The Bitbucket Cloud Workspace ID to be connected to Google Cloud Platform.",
    ).optional(),
  }).describe("Configuration for connections to Bitbucket Cloud.").optional(),
  bitbucketDataCenterConfig: z.object({
    authorizerCredential: z.object({
      userTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the user token that authorizes the Cloud Build connection. Format: `projects/*/secrets/*/versions/*`.",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated to this token.",
      ).optional(),
    }).describe(
      "Required. A http access token with the `REPO_ADMIN` scope access.",
    ).optional(),
    hostUri: z.string().describe(
      "Required. The URI of the Bitbucket Data Center instance or cluster this connection is for.",
    ).optional(),
    readAuthorizerCredential: z.object({
      userTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the user token that authorizes the Cloud Build connection. Format: `projects/*/secrets/*/versions/*`.",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated to this token.",
      ).optional(),
    }).describe("Required. A http access token with the `REPO_READ` access.")
      .optional(),
    serverVersion: z.string().describe(
      "Output only. Version of the Bitbucket Data Center running on the `host_uri`.",
    ).optional(),
    serviceDirectoryConfig: z.object({
      service: z.string().describe(
        "Required. The Service Directory service name. Format: projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}.",
      ).optional(),
    }).describe(
      "Optional. Configuration for using Service Directory to privately connect to a Bitbucket Data Center. This should only be set if the Bitbucket Data Center is hosted on-premises and not reachable by public internet. If this field is left empty, calls to the Bitbucket Data Center will be made over the public internet.",
    ).optional(),
    sslCa: z.string().describe(
      "Optional. SSL certificate to use for requests to the Bitbucket Data Center.",
    ).optional(),
    webhookSecretSecretVersion: z.string().describe(
      "Required. Immutable. SecretManager resource containing the webhook secret used to verify webhook events, formatted as `projects/*/secrets/*/versions/*`.",
    ).optional(),
  }).describe("Configuration for connections to Bitbucket Data Center.")
    .optional(),
  disabled: z.boolean().describe(
    "Optional. If disabled is set to true, functionality is disabled for this connection. Repository based API methods and webhooks processing for repositories in this connection will be disabled.",
  ).optional(),
  githubConfig: z.object({
    appInstallationId: z.string().describe(
      "Optional. GitHub App installation id.",
    ).optional(),
    authorizerCredential: z.object({
      oauthTokenSecretVersion: z.string().describe(
        "Optional. A SecretManager resource containing the OAuth token that authorizes the Cloud Build connection. Format: `projects/*/secrets/*/versions/*`.",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated to this token.",
      ).optional(),
    }).describe(
      "Optional. OAuth credential of the account that authorized the Cloud Build GitHub App. It is recommended to use a robot account instead of a human user account. The OAuth token must be tied to the Cloud Build GitHub App.",
    ).optional(),
  }).describe("Configuration for connections to github.com.").optional(),
  githubEnterpriseConfig: z.object({
    apiKey: z.string().describe(
      "Required. API Key used for authentication of webhook events.",
    ).optional(),
    appId: z.string().describe(
      "Optional. Id of the GitHub App created from the manifest.",
    ).optional(),
    appInstallationId: z.string().describe(
      "Optional. ID of the installation of the GitHub App.",
    ).optional(),
    appSlug: z.string().describe(
      "Optional. The URL-friendly name of the GitHub App.",
    ).optional(),
    hostUri: z.string().describe(
      "Required. The URI of the GitHub Enterprise host this connection is for.",
    ).optional(),
    privateKeySecretVersion: z.string().describe(
      "Optional. SecretManager resource containing the private key of the GitHub App, formatted as `projects/*/secrets/*/versions/*`.",
    ).optional(),
    serverVersion: z.string().describe(
      "Output only. GitHub Enterprise version installed at the host_uri.",
    ).optional(),
    serviceDirectoryConfig: z.object({
      service: z.string().describe(
        "Required. The Service Directory service name. Format: projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}.",
      ).optional(),
    }).describe(
      "Optional. Configuration for using Service Directory to privately connect to a GitHub Enterprise server. This should only be set if the GitHub Enterprise server is hosted on-premises and not reachable by public internet. If this field is left empty, calls to the GitHub Enterprise server will be made over the public internet.",
    ).optional(),
    sslCa: z.string().describe(
      "Optional. SSL certificate to use for requests to GitHub Enterprise.",
    ).optional(),
    webhookSecretSecretVersion: z.string().describe(
      "Optional. SecretManager resource containing the webhook secret of the GitHub App, formatted as `projects/*/secrets/*/versions/*`.",
    ).optional(),
  }).describe(
    "Configuration for connections to an instance of GitHub Enterprise.",
  ).optional(),
  gitlabConfig: z.object({
    authorizerCredential: z.object({
      userTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the user token that authorizes the Cloud Build connection. Format: `projects/*/secrets/*/versions/*`.",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated to this token.",
      ).optional(),
    }).describe(
      "Required. A GitLab personal access token with the `api` scope access.",
    ).optional(),
    hostUri: z.string().describe(
      "Optional. The URI of the GitLab Enterprise host this connection is for. If not specified, the default value is https://gitlab.com.",
    ).optional(),
    readAuthorizerCredential: z.object({
      userTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the user token that authorizes the Cloud Build connection. Format: `projects/*/secrets/*/versions/*`.",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated to this token.",
      ).optional(),
    }).describe(
      "Required. A GitLab personal access token with the minimum `read_api` scope access.",
    ).optional(),
    serverVersion: z.string().describe(
      "Output only. Version of the GitLab Enterprise server running on the `host_uri`.",
    ).optional(),
    serviceDirectoryConfig: z.object({
      service: z.string().describe(
        "Required. The Service Directory service name. Format: projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}.",
      ).optional(),
    }).describe(
      "Optional. Configuration for using Service Directory to privately connect to a GitLab Enterprise server. This should only be set if the GitLab Enterprise server is hosted on-premises and not reachable by public internet. If this field is left empty, calls to the GitLab Enterprise server will be made over the public internet.",
    ).optional(),
    sslCa: z.string().describe(
      "Optional. SSL certificate to use for requests to GitLab Enterprise.",
    ).optional(),
    webhookSecretSecretVersion: z.string().describe(
      "Required. Immutable. SecretManager resource containing the webhook secret of a GitLab Enterprise project, formatted as `projects/*/secrets/*/versions/*`.",
    ).optional(),
  }).describe(
    "Configuration for connections to gitlab.com or an instance of GitLab Enterprise.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The resource name of the connection, in the format `projects/{project}/locations/{location}/connections/{connection_id}`.",
  ).optional(),
  connectionId: z.string().describe(
    "Required. The ID to use for the Connection, which will become the final component of the Connection's resource name. Names must be unique per-project per-location. Allows alphanumeric characters and any of -._~%!$&'()*+,;=@.",
  ).optional(),
  allowMissing: z.string().describe(
    "If set to true, and the connection is not found a new connection will be created. In this situation `update_mask` is ignored. The creation will succeed only if the input connection has all the necessary information (e.g a github_config with both user_oauth_token and installation_id properties).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  bitbucketCloudConfig: z.object({
    authorizerCredential: z.object({
      userTokenSecretVersion: z.string(),
      username: z.string(),
    }),
    readAuthorizerCredential: z.object({
      userTokenSecretVersion: z.string(),
      username: z.string(),
    }),
    webhookSecretSecretVersion: z.string(),
    workspace: z.string(),
  }).optional(),
  bitbucketDataCenterConfig: z.object({
    authorizerCredential: z.object({
      userTokenSecretVersion: z.string(),
      username: z.string(),
    }),
    hostUri: z.string(),
    readAuthorizerCredential: z.object({
      userTokenSecretVersion: z.string(),
      username: z.string(),
    }),
    serverVersion: z.string(),
    serviceDirectoryConfig: z.object({
      service: z.string(),
    }),
    sslCa: z.string(),
    webhookSecretSecretVersion: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  disabled: z.boolean().optional(),
  etag: z.string().optional(),
  githubConfig: z.object({
    appInstallationId: z.string(),
    authorizerCredential: z.object({
      oauthTokenSecretVersion: z.string(),
      username: z.string(),
    }),
  }).optional(),
  githubEnterpriseConfig: z.object({
    apiKey: z.string(),
    appId: z.string(),
    appInstallationId: z.string(),
    appSlug: z.string(),
    hostUri: z.string(),
    privateKeySecretVersion: z.string(),
    serverVersion: z.string(),
    serviceDirectoryConfig: z.object({
      service: z.string(),
    }),
    sslCa: z.string(),
    webhookSecretSecretVersion: z.string(),
  }).optional(),
  gitlabConfig: z.object({
    authorizerCredential: z.object({
      userTokenSecretVersion: z.string(),
      username: z.string(),
    }),
    hostUri: z.string(),
    readAuthorizerCredential: z.object({
      userTokenSecretVersion: z.string(),
      username: z.string(),
    }),
    serverVersion: z.string(),
    serviceDirectoryConfig: z.object({
      service: z.string(),
    }),
    sslCa: z.string(),
    webhookSecretSecretVersion: z.string(),
  }).optional(),
  installationState: z.object({
    actionUri: z.string(),
    message: z.string(),
    stage: z.string(),
  }).optional(),
  name: z.string(),
  reconciling: z.boolean().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Allows clients to store small amounts of arbitrary data.",
  ).optional(),
  bitbucketCloudConfig: z.object({
    authorizerCredential: z.object({
      userTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the user token that authorizes the Cloud Build connection. Format: `projects/*/secrets/*/versions/*`.",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated to this token.",
      ).optional(),
    }).describe(
      "Required. An access token with the `webhook`, `repository`, `repository:admin` and `pullrequest` scope access. It can be either a workspace, project or repository access token. It's recommended to use a system account to generate these credentials.",
    ).optional(),
    readAuthorizerCredential: z.object({
      userTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the user token that authorizes the Cloud Build connection. Format: `projects/*/secrets/*/versions/*`.",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated to this token.",
      ).optional(),
    }).describe(
      "Required. An access token with the `repository` access. It can be either a workspace, project or repository access token. It's recommended to use a system account to generate the credentials.",
    ).optional(),
    webhookSecretSecretVersion: z.string().describe(
      "Required. SecretManager resource containing the webhook secret used to verify webhook events, formatted as `projects/*/secrets/*/versions/*`.",
    ).optional(),
    workspace: z.string().describe(
      "Required. The Bitbucket Cloud Workspace ID to be connected to Google Cloud Platform.",
    ).optional(),
  }).describe("Configuration for connections to Bitbucket Cloud.").optional(),
  bitbucketDataCenterConfig: z.object({
    authorizerCredential: z.object({
      userTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the user token that authorizes the Cloud Build connection. Format: `projects/*/secrets/*/versions/*`.",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated to this token.",
      ).optional(),
    }).describe(
      "Required. A http access token with the `REPO_ADMIN` scope access.",
    ).optional(),
    hostUri: z.string().describe(
      "Required. The URI of the Bitbucket Data Center instance or cluster this connection is for.",
    ).optional(),
    readAuthorizerCredential: z.object({
      userTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the user token that authorizes the Cloud Build connection. Format: `projects/*/secrets/*/versions/*`.",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated to this token.",
      ).optional(),
    }).describe("Required. A http access token with the `REPO_READ` access.")
      .optional(),
    serverVersion: z.string().describe(
      "Output only. Version of the Bitbucket Data Center running on the `host_uri`.",
    ).optional(),
    serviceDirectoryConfig: z.object({
      service: z.string().describe(
        "Required. The Service Directory service name. Format: projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}.",
      ).optional(),
    }).describe(
      "Optional. Configuration for using Service Directory to privately connect to a Bitbucket Data Center. This should only be set if the Bitbucket Data Center is hosted on-premises and not reachable by public internet. If this field is left empty, calls to the Bitbucket Data Center will be made over the public internet.",
    ).optional(),
    sslCa: z.string().describe(
      "Optional. SSL certificate to use for requests to the Bitbucket Data Center.",
    ).optional(),
    webhookSecretSecretVersion: z.string().describe(
      "Required. Immutable. SecretManager resource containing the webhook secret used to verify webhook events, formatted as `projects/*/secrets/*/versions/*`.",
    ).optional(),
  }).describe("Configuration for connections to Bitbucket Data Center.")
    .optional(),
  disabled: z.boolean().describe(
    "Optional. If disabled is set to true, functionality is disabled for this connection. Repository based API methods and webhooks processing for repositories in this connection will be disabled.",
  ).optional(),
  githubConfig: z.object({
    appInstallationId: z.string().describe(
      "Optional. GitHub App installation id.",
    ).optional(),
    authorizerCredential: z.object({
      oauthTokenSecretVersion: z.string().describe(
        "Optional. A SecretManager resource containing the OAuth token that authorizes the Cloud Build connection. Format: `projects/*/secrets/*/versions/*`.",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated to this token.",
      ).optional(),
    }).describe(
      "Optional. OAuth credential of the account that authorized the Cloud Build GitHub App. It is recommended to use a robot account instead of a human user account. The OAuth token must be tied to the Cloud Build GitHub App.",
    ).optional(),
  }).describe("Configuration for connections to github.com.").optional(),
  githubEnterpriseConfig: z.object({
    apiKey: z.string().describe(
      "Required. API Key used for authentication of webhook events.",
    ).optional(),
    appId: z.string().describe(
      "Optional. Id of the GitHub App created from the manifest.",
    ).optional(),
    appInstallationId: z.string().describe(
      "Optional. ID of the installation of the GitHub App.",
    ).optional(),
    appSlug: z.string().describe(
      "Optional. The URL-friendly name of the GitHub App.",
    ).optional(),
    hostUri: z.string().describe(
      "Required. The URI of the GitHub Enterprise host this connection is for.",
    ).optional(),
    privateKeySecretVersion: z.string().describe(
      "Optional. SecretManager resource containing the private key of the GitHub App, formatted as `projects/*/secrets/*/versions/*`.",
    ).optional(),
    serverVersion: z.string().describe(
      "Output only. GitHub Enterprise version installed at the host_uri.",
    ).optional(),
    serviceDirectoryConfig: z.object({
      service: z.string().describe(
        "Required. The Service Directory service name. Format: projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}.",
      ).optional(),
    }).describe(
      "Optional. Configuration for using Service Directory to privately connect to a GitHub Enterprise server. This should only be set if the GitHub Enterprise server is hosted on-premises and not reachable by public internet. If this field is left empty, calls to the GitHub Enterprise server will be made over the public internet.",
    ).optional(),
    sslCa: z.string().describe(
      "Optional. SSL certificate to use for requests to GitHub Enterprise.",
    ).optional(),
    webhookSecretSecretVersion: z.string().describe(
      "Optional. SecretManager resource containing the webhook secret of the GitHub App, formatted as `projects/*/secrets/*/versions/*`.",
    ).optional(),
  }).describe(
    "Configuration for connections to an instance of GitHub Enterprise.",
  ).optional(),
  gitlabConfig: z.object({
    authorizerCredential: z.object({
      userTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the user token that authorizes the Cloud Build connection. Format: `projects/*/secrets/*/versions/*`.",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated to this token.",
      ).optional(),
    }).describe(
      "Required. A GitLab personal access token with the `api` scope access.",
    ).optional(),
    hostUri: z.string().describe(
      "Optional. The URI of the GitLab Enterprise host this connection is for. If not specified, the default value is https://gitlab.com.",
    ).optional(),
    readAuthorizerCredential: z.object({
      userTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the user token that authorizes the Cloud Build connection. Format: `projects/*/secrets/*/versions/*`.",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated to this token.",
      ).optional(),
    }).describe(
      "Required. A GitLab personal access token with the minimum `read_api` scope access.",
    ).optional(),
    serverVersion: z.string().describe(
      "Output only. Version of the GitLab Enterprise server running on the `host_uri`.",
    ).optional(),
    serviceDirectoryConfig: z.object({
      service: z.string().describe(
        "Required. The Service Directory service name. Format: projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}.",
      ).optional(),
    }).describe(
      "Optional. Configuration for using Service Directory to privately connect to a GitLab Enterprise server. This should only be set if the GitLab Enterprise server is hosted on-premises and not reachable by public internet. If this field is left empty, calls to the GitLab Enterprise server will be made over the public internet.",
    ).optional(),
    sslCa: z.string().describe(
      "Optional. SSL certificate to use for requests to GitLab Enterprise.",
    ).optional(),
    webhookSecretSecretVersion: z.string().describe(
      "Required. Immutable. SecretManager resource containing the webhook secret of a GitLab Enterprise project, formatted as `projects/*/secrets/*/versions/*`.",
    ).optional(),
  }).describe(
    "Configuration for connections to gitlab.com or an instance of GitLab Enterprise.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The resource name of the connection, in the format `projects/{project}/locations/{location}/connections/{connection_id}`.",
  ).optional(),
  connectionId: z.string().describe(
    "Required. The ID to use for the Connection, which will become the final component of the Connection's resource name. Names must be unique per-project per-location. Allows alphanumeric characters and any of -._~%!$&'()*+,;=@.",
  ).optional(),
  allowMissing: z.string().describe(
    "If set to true, and the connection is not found a new connection will be created. In this situation `update_mask` is ignored. The creation will succeed only if the input connection has all the necessary information (e.g a github_config with both user_oauth_token and installation_id properties).",
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

/** Swamp extension model for Google Cloud Build Connections. Registered at `@swamp/gcp/cloudbuild/connections`. */
export const model = {
  type: "@swamp/gcp/cloudbuild/connections",
  version: "2026.10.13.1",
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
      toVersion: "2026.07.17.2",
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
      description: "Removed: installationState",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { installationState: _installationState, ...rest } = old;
        return rest;
      },
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
      toVersion: "2026.09.07.1",
      description: "Added: allowMissing",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.2",
      description:
        "Removed: authorizerCredential, userTokenSecretVersion, username, readAuthorizerCredential, userTokenSecretVersion, username, webhookSecretSecretVersion, workspace, authorizerCredential, userTokenSecretVersion, username, hostUri, readAuthorizerCredential, userTokenSecretVersion, username, serverVersion, serviceDirectoryConfig, service, sslCa, webhookSecretSecretVersion, appInstallationId, authorizerCredential, oauthTokenSecretVersion, username, apiKey, appId, appInstallationId, appSlug, hostUri, privateKeySecretVersion, serverVersion, serviceDirectoryConfig, service, sslCa, webhookSecretSecretVersion, authorizerCredential, userTokenSecretVersion, username, hostUri, readAuthorizerCredential, userTokenSecretVersion, username, serverVersion, serviceDirectoryConfig, service, sslCa, webhookSecretSecretVersion",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          authorizerCredential: _authorizerCredential,
          userTokenSecretVersion: _userTokenSecretVersion,
          username: _username,
          readAuthorizerCredential: _readAuthorizerCredential,
          webhookSecretSecretVersion: _webhookSecretSecretVersion,
          workspace: _workspace,
          hostUri: _hostUri,
          serverVersion: _serverVersion,
          serviceDirectoryConfig: _serviceDirectoryConfig,
          service: _service,
          sslCa: _sslCa,
          appInstallationId: _appInstallationId,
          oauthTokenSecretVersion: _oauthTokenSecretVersion,
          apiKey: _apiKey,
          appId: _appId,
          appSlug: _appSlug,
          privateKeySecretVersion: _privateKeySecretVersion,
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
      description:
        "A connection to a SCM like GitHub, GitHub Enterprise, Bitbucket Data Center, ...",
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
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["bitbucketCloudConfig"] !== undefined) {
          body["bitbucketCloudConfig"] = g["bitbucketCloudConfig"];
        }
        if (g["bitbucketDataCenterConfig"] !== undefined) {
          body["bitbucketDataCenterConfig"] = g["bitbucketDataCenterConfig"];
        }
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["githubConfig"] !== undefined) {
          body["githubConfig"] = g["githubConfig"];
        }
        if (g["githubEnterpriseConfig"] !== undefined) {
          body["githubEnterpriseConfig"] = g["githubEnterpriseConfig"];
        }
        if (g["gitlabConfig"] !== undefined) {
          body["gitlabConfig"] = g["gitlabConfig"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
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
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["bitbucketCloudConfig"] !== undefined) {
          body["bitbucketCloudConfig"] = g["bitbucketCloudConfig"];
        }
        if (g["bitbucketDataCenterConfig"] !== undefined) {
          body["bitbucketDataCenterConfig"] = g["bitbucketDataCenterConfig"];
        }
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["githubConfig"] !== undefined) {
          body["githubConfig"] = g["githubConfig"];
        }
        if (g["githubEnterpriseConfig"] !== undefined) {
          body["githubEnterpriseConfig"] = g["githubEnterpriseConfig"];
        }
        if (g["gitlabConfig"] !== undefined) {
          body["gitlabConfig"] = g["gitlabConfig"];
        }
        if (g["allowMissing"] !== undefined) {
          params["allowMissing"] = String(g["allowMissing"]);
        } else if (existing["allowMissing"] !== undefined) {
          params["allowMissing"] = String(existing["allowMissing"]);
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
        pageSize: z.number().describe(
          "Number of results to return in the list.",
        ).optional(),
        returnPartialSuccess: z.boolean().describe(
          "Optional. If set to true, the response will return partial results when some regions are unreachable. If set to false, the response will fail if any region is unreachable.",
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["returnPartialSuccess"] !== undefined) {
          params["returnPartialSuccess"] = String(args["returnPartialSuccess"]);
        }
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
    fetch_linkable_repositories: {
      description: "fetch linkable repositories",
      arguments: z.object({
        pageSize: z.any().optional(),
        pageToken: z.any().optional(),
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
        params["connection"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["pageToken"] !== undefined) {
          params["pageToken"] = String(args["pageToken"]);
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "cloudbuild.projects.locations.connections.fetchLinkableRepositories",
            "path": "v2/{+connection}:fetchLinkableRepositories",
            "httpMethod": "GET",
            "parameterOrder": ["connection"],
            "parameters": {
              "connection": { "location": "path", "required": true },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
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
            "id": "cloudbuild.projects.locations.connections.getIamPolicy",
            "path": "v2/{+resource}:getIamPolicy",
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
    process_webhook: {
      description: "process webhook",
      arguments: z.object({
        contentType: z.any().optional(),
        data: z.any().optional(),
        extensions: z.any().optional(),
        webhookKey: z.any().optional(),
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
        if (args["webhookKey"] !== undefined) {
          params["webhookKey"] = String(args["webhookKey"]);
        }
        const body: Record<string, unknown> = {};
        if (args["contentType"] !== undefined) {
          body["contentType"] = args["contentType"];
        }
        if (args["data"] !== undefined) body["data"] = args["data"];
        if (args["extensions"] !== undefined) {
          body["extensions"] = args["extensions"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "cloudbuild.projects.locations.connections.processWebhook",
            "path": "v2/{+parent}/connections:processWebhook",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
              "webhookKey": { "location": "query" },
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
            "id": "cloudbuild.projects.locations.connections.setIamPolicy",
            "path": "v2/{+resource}:setIamPolicy",
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
              "cloudbuild.projects.locations.connections.testIamPermissions",
            "path": "v2/{+resource}:testIamPermissions",
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
