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

// Auto-generated extension model for @swamp/gcp/iam/workloadidentitypools-providers
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Identity and Access Management (IAM) WorkloadIdentityPools.Providers.
 *
 * A configuration for an external identity provider.
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
  return `${parent}/providers/${shortName}`;
}

const BASE_URL = "https://iam.googleapis.com/";

const GET_CONFIG = {
  "id": "iam.projects.locations.workloadIdentityPools.providers.get",
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
  "id": "iam.projects.locations.workloadIdentityPools.providers.create",
  "path": "v1/{+parent}/providers",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "workloadIdentityPoolProviderId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "iam.projects.locations.workloadIdentityPools.providers.patch",
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
  "id": "iam.projects.locations.workloadIdentityPools.providers.delete",
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
  "id": "iam.projects.locations.workloadIdentityPools.providers.list",
  "path": "v1/{+parent}/providers",
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
    "showDeleted": {
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
  attributeCondition: z.string().describe(
    "Optional. [A Common Expression Language](https://opensource.google/projects/cel) expression, in plain text, to restrict what otherwise valid authentication credentials issued by the provider should not be accepted. The expression must output a boolean representing whether to allow the federation. The following keywords may be referenced in the expressions: * `assertion`: JSON representing the authentication credential issued by the provider. * `google`: The Google attributes mapped from the assertion in the `attribute_mappings`. * `attribute`: The custom attributes mapped from the assertion in the `attribute_mappings`. The maximum length of the attribute condition expression is 4096 characters. If unspecified, all valid authentication credential are accepted. The following example shows how to only allow credentials with a mapped `google.groups` value of `admins`: ` \"'admins' in google.groups\" `",
  ).optional(),
  attributeMapping: z.record(z.string(), z.string()).describe(
    'Optional. Maps attributes from authentication credentials issued by an external identity provider to Google Cloud attributes, such as `subject` and `segment`. Each key must be a string specifying the Google Cloud IAM attribute to map to. The following keys are supported: * `google.subject`: The principal IAM is authenticating. You can reference this value in IAM bindings. This is also the subject that appears in Cloud Logging logs. Cannot exceed 127 bytes. * `google.groups`: Groups the external identity belongs to. You can grant groups access to resources using an IAM `principalSet` binding; access applies to all members of the group. You can also provide custom attributes by specifying `attribute.{custom_attribute}`, where `{custom_attribute}` is the name of the custom attribute to be mapped. You can define a maximum of 50 custom attributes. The maximum length of a mapped attribute key is 100 characters, and the key may only contain the characters [a-z0-9_]. You can reference these attributes in IAM policies to define fine-grained access for a workload to Google Cloud resources. For example: * `google.subject`: `principal://iam.googleapis.com/projects/{project}/locations/{location}/workloadIdentityPools/{pool}/subject/{value}` * `google.groups`: `principalSet://iam.googleapis.com/projects/{project}/locations/{location}/workloadIdentityPools/{pool}/group/{value}` * `attribute.{custom_attribute}`: `principalSet://iam.googleapis.com/projects/{project}/locations/{location}/workloadIdentityPools/{pool}/attribute.{custom_attribute}/{value}` Each value must be a [Common Expression Language] (https://opensource.google/projects/cel) function that maps an identity provider credential to the normalized attribute specified by the corresponding map key. You can use the `assertion` keyword in the expression to access a JSON representation of the authentication credential issued by the provider. The maximum length of an attribute mapping expression is 2048 characters. When evaluated, the total size of all mapped attributes must not exceed 8KB. For AWS providers, if no attribute mapping is defined, the following default mapping applies: ` { "google.subject":"assertion.arn", "attribute.aws_role": "assertion.arn.contains(\'assumed-role\')" "? assertion.arn.extract(\'{account_arn}assumed-role/\')" " + \'assumed-role/\'" " + assertion.arn.extract(\'assumed-role/{role_name}/\')" ": assertion.arn", } ` If any custom attribute mappings are defined, they must include a mapping to the `google.subject` attribute. For OIDC providers, you must supply a custom mapping, which must include the `google.subject` attribute. For example, the following maps the `sub` claim of the incoming credential to the `subject` attribute on a Google token: ` {"google.subject": "assertion.sub"} `',
  ).optional(),
  aws: z.object({
    accountId: z.string().describe("Required. The AWS account ID.").optional(),
  }).describe("Represents an Amazon Web Services identity provider.")
    .optional(),
  description: z.string().describe(
    "Optional. A description for the provider. Cannot exceed 256 characters.",
  ).optional(),
  disabled: z.boolean().describe(
    "Optional. Whether the provider is disabled. You cannot use a disabled provider to exchange tokens. However, existing tokens still grant access.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. A display name for the provider. Cannot exceed 32 characters.",
  ).optional(),
  name: z.string().describe("Identifier. The resource name of the provider.")
    .optional(),
  oidc: z.object({
    allowedAudiences: z.array(z.string()).describe(
      "Optional. Acceptable values for the `aud` field (audience) in the OIDC token. Token exchange requests are rejected if the token audience does not match one of the configured values. Each audience may be at most 256 characters. A maximum of 10 audiences may be configured. If this list is empty, the OIDC token audience must be equal to the full canonical resource name of the WorkloadIdentityPoolProvider, with or without the HTTPS prefix. For example: ` //iam.googleapis.com/projects//locations//workloadIdentityPools//providers/ https://iam.googleapis.com/projects//locations//workloadIdentityPools//providers/ `",
    ).optional(),
    issuerUri: z.string().describe(
      "Required. The OIDC issuer URL. Must be an HTTPS endpoint. Per OpenID Connect Discovery 1.0 spec, the OIDC issuer URL is used to locate the provider's public keys (via `jwks_uri`) for verifying tokens like the OIDC ID token. These public key types must be 'EC' or 'RSA'.",
    ).optional(),
    jwksJson: z.string().describe(
      'Optional. OIDC JWKs in JSON String format. For details on the definition of a JWK, see https://tools.ietf.org/html/rfc7517. If not set, the `jwks_uri` from the discovery document(fetched from the.well-known path of the `issuer_uri`) will be used. Currently, RSA and EC asymmetric keys are supported. The JWK must use following format and include only the following fields: { "keys": [ { "kty": "RSA/EC", "alg": "", "use": "sig", "kid": "", "n": "", "e": "", "x": "", "y": "", "crv": "" } ] }',
    ).optional(),
  }).describe("Represents an OpenId Connect 1.0 identity provider.").optional(),
  saml: z.object({
    idpMetadataXml: z.string().describe(
      "Required. SAML identity provider (IdP) configuration metadata XML doc. The XML document must comply with the [SAML 2.0 specification](https://docs.oasis-open.org/security/saml/v2.0/saml-metadata-2.0-os.pdf). The maximum size of an acceptable XML document is 128K characters. The SAML metadata XML document must satisfy the following constraints: * Must contain an IdP Entity ID. * Must contain at least one non-expired signing certificate. * For each signing certificate, the expiration must be: * From no more than 7 days in the future. * To no more than 25 years in the future. * Up to three IdP signing keys are allowed. When updating the provider's metadata XML, at least one non-expired signing key must overlap with the existing metadata. This requirement is skipped if there are no non-expired signing keys present in the existing metadata.",
    ).optional(),
  }).describe("Represents an SAML 2.0 identity provider.").optional(),
  x509: z.object({
    trustStore: z.object({
      intermediateCas: z.array(z.object({
        pemCertificate: z.string().describe(
          "PEM certificate of the PKI used for validation. Must only contain one ca certificate.",
        ).optional(),
      })).describe(
        "Optional. Set of intermediate CA certificates used for building the trust chain to the trust anchor. Important: Intermediate CAs are only supported for X.509 federation.",
      ).optional(),
      trustAnchors: z.array(z.object({
        pemCertificate: z.string().describe(
          "PEM certificate of the PKI used for validation. Must only contain one ca certificate (either root or intermediate cert).",
        ).optional(),
      })).describe(
        "Required. List of trust anchors to be used while performing validation against a given TrustStore. The incoming end entity's certificate must be in the trust chain of one of the trust anchors here.",
      ).optional(),
      trustDefaultSharedCa: z.boolean().describe(
        "Optional. If set to True, the trust bundle will include the private ca managed identity regional root public certificates. Important: `trust_default_shared_ca` is only supported for managed identity trust domain resource.",
      ).optional(),
    }).describe(
      "Trust store that contains trust anchors and optional intermediate CAs used in PKI to build a trust chain(trust hierarchy) and verify a client's identity.",
    ).optional(),
  }).describe(
    "An X.509-type identity provider represents a CA. It is trusted to assert a client identity if the client has a certificate that chains up to this CA.",
  ).optional(),
  workloadIdentityPoolProviderId: z.string().describe(
    "Required. The ID for the provider, which becomes the final component of the resource name. This value must be 4-32 characters, and may contain the characters [a-z0-9-]. The prefix `gcp-` is reserved for use by Google, and may not be specified.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  attributeCondition: z.string().optional(),
  attributeMapping: z.record(z.string(), z.unknown()).optional(),
  aws: z.object({
    accountId: z.string(),
  }).optional(),
  description: z.string().optional(),
  disabled: z.boolean().optional(),
  displayName: z.string().optional(),
  expireTime: z.string().optional(),
  name: z.string(),
  oidc: z.object({
    allowedAudiences: z.array(z.string()),
    issuerUri: z.string(),
    jwksJson: z.string(),
  }).optional(),
  saml: z.object({
    idpMetadataXml: z.string(),
  }).optional(),
  state: z.string().optional(),
  x509: z.object({
    trustStore: z.object({
      intermediateCas: z.array(z.object({
        pemCertificate: z.string(),
      })),
      trustAnchors: z.array(z.object({
        pemCertificate: z.string(),
      })),
      trustDefaultSharedCa: z.boolean(),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  attributeCondition: z.string().describe(
    "Optional. [A Common Expression Language](https://opensource.google/projects/cel) expression, in plain text, to restrict what otherwise valid authentication credentials issued by the provider should not be accepted. The expression must output a boolean representing whether to allow the federation. The following keywords may be referenced in the expressions: * `assertion`: JSON representing the authentication credential issued by the provider. * `google`: The Google attributes mapped from the assertion in the `attribute_mappings`. * `attribute`: The custom attributes mapped from the assertion in the `attribute_mappings`. The maximum length of the attribute condition expression is 4096 characters. If unspecified, all valid authentication credential are accepted. The following example shows how to only allow credentials with a mapped `google.groups` value of `admins`: ` \"'admins' in google.groups\" `",
  ).optional(),
  attributeMapping: z.record(z.string(), z.string()).describe(
    'Optional. Maps attributes from authentication credentials issued by an external identity provider to Google Cloud attributes, such as `subject` and `segment`. Each key must be a string specifying the Google Cloud IAM attribute to map to. The following keys are supported: * `google.subject`: The principal IAM is authenticating. You can reference this value in IAM bindings. This is also the subject that appears in Cloud Logging logs. Cannot exceed 127 bytes. * `google.groups`: Groups the external identity belongs to. You can grant groups access to resources using an IAM `principalSet` binding; access applies to all members of the group. You can also provide custom attributes by specifying `attribute.{custom_attribute}`, where `{custom_attribute}` is the name of the custom attribute to be mapped. You can define a maximum of 50 custom attributes. The maximum length of a mapped attribute key is 100 characters, and the key may only contain the characters [a-z0-9_]. You can reference these attributes in IAM policies to define fine-grained access for a workload to Google Cloud resources. For example: * `google.subject`: `principal://iam.googleapis.com/projects/{project}/locations/{location}/workloadIdentityPools/{pool}/subject/{value}` * `google.groups`: `principalSet://iam.googleapis.com/projects/{project}/locations/{location}/workloadIdentityPools/{pool}/group/{value}` * `attribute.{custom_attribute}`: `principalSet://iam.googleapis.com/projects/{project}/locations/{location}/workloadIdentityPools/{pool}/attribute.{custom_attribute}/{value}` Each value must be a [Common Expression Language] (https://opensource.google/projects/cel) function that maps an identity provider credential to the normalized attribute specified by the corresponding map key. You can use the `assertion` keyword in the expression to access a JSON representation of the authentication credential issued by the provider. The maximum length of an attribute mapping expression is 2048 characters. When evaluated, the total size of all mapped attributes must not exceed 8KB. For AWS providers, if no attribute mapping is defined, the following default mapping applies: ` { "google.subject":"assertion.arn", "attribute.aws_role": "assertion.arn.contains(\'assumed-role\')" "? assertion.arn.extract(\'{account_arn}assumed-role/\')" " + \'assumed-role/\'" " + assertion.arn.extract(\'assumed-role/{role_name}/\')" ": assertion.arn", } ` If any custom attribute mappings are defined, they must include a mapping to the `google.subject` attribute. For OIDC providers, you must supply a custom mapping, which must include the `google.subject` attribute. For example, the following maps the `sub` claim of the incoming credential to the `subject` attribute on a Google token: ` {"google.subject": "assertion.sub"} `',
  ).optional(),
  aws: z.object({
    accountId: z.string().describe("Required. The AWS account ID.").optional(),
  }).describe("Represents an Amazon Web Services identity provider.")
    .optional(),
  description: z.string().describe(
    "Optional. A description for the provider. Cannot exceed 256 characters.",
  ).optional(),
  disabled: z.boolean().describe(
    "Optional. Whether the provider is disabled. You cannot use a disabled provider to exchange tokens. However, existing tokens still grant access.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. A display name for the provider. Cannot exceed 32 characters.",
  ).optional(),
  name: z.string().describe("Identifier. The resource name of the provider.")
    .optional(),
  oidc: z.object({
    allowedAudiences: z.array(z.string()).describe(
      "Optional. Acceptable values for the `aud` field (audience) in the OIDC token. Token exchange requests are rejected if the token audience does not match one of the configured values. Each audience may be at most 256 characters. A maximum of 10 audiences may be configured. If this list is empty, the OIDC token audience must be equal to the full canonical resource name of the WorkloadIdentityPoolProvider, with or without the HTTPS prefix. For example: ` //iam.googleapis.com/projects//locations//workloadIdentityPools//providers/ https://iam.googleapis.com/projects//locations//workloadIdentityPools//providers/ `",
    ).optional(),
    issuerUri: z.string().describe(
      "Required. The OIDC issuer URL. Must be an HTTPS endpoint. Per OpenID Connect Discovery 1.0 spec, the OIDC issuer URL is used to locate the provider's public keys (via `jwks_uri`) for verifying tokens like the OIDC ID token. These public key types must be 'EC' or 'RSA'.",
    ).optional(),
    jwksJson: z.string().describe(
      'Optional. OIDC JWKs in JSON String format. For details on the definition of a JWK, see https://tools.ietf.org/html/rfc7517. If not set, the `jwks_uri` from the discovery document(fetched from the.well-known path of the `issuer_uri`) will be used. Currently, RSA and EC asymmetric keys are supported. The JWK must use following format and include only the following fields: { "keys": [ { "kty": "RSA/EC", "alg": "", "use": "sig", "kid": "", "n": "", "e": "", "x": "", "y": "", "crv": "" } ] }',
    ).optional(),
  }).describe("Represents an OpenId Connect 1.0 identity provider.").optional(),
  saml: z.object({
    idpMetadataXml: z.string().describe(
      "Required. SAML identity provider (IdP) configuration metadata XML doc. The XML document must comply with the [SAML 2.0 specification](https://docs.oasis-open.org/security/saml/v2.0/saml-metadata-2.0-os.pdf). The maximum size of an acceptable XML document is 128K characters. The SAML metadata XML document must satisfy the following constraints: * Must contain an IdP Entity ID. * Must contain at least one non-expired signing certificate. * For each signing certificate, the expiration must be: * From no more than 7 days in the future. * To no more than 25 years in the future. * Up to three IdP signing keys are allowed. When updating the provider's metadata XML, at least one non-expired signing key must overlap with the existing metadata. This requirement is skipped if there are no non-expired signing keys present in the existing metadata.",
    ).optional(),
  }).describe("Represents an SAML 2.0 identity provider.").optional(),
  x509: z.object({
    trustStore: z.object({
      intermediateCas: z.array(z.object({
        pemCertificate: z.string().describe(
          "PEM certificate of the PKI used for validation. Must only contain one ca certificate.",
        ).optional(),
      })).describe(
        "Optional. Set of intermediate CA certificates used for building the trust chain to the trust anchor. Important: Intermediate CAs are only supported for X.509 federation.",
      ).optional(),
      trustAnchors: z.array(z.object({
        pemCertificate: z.string().describe(
          "PEM certificate of the PKI used for validation. Must only contain one ca certificate (either root or intermediate cert).",
        ).optional(),
      })).describe(
        "Required. List of trust anchors to be used while performing validation against a given TrustStore. The incoming end entity's certificate must be in the trust chain of one of the trust anchors here.",
      ).optional(),
      trustDefaultSharedCa: z.boolean().describe(
        "Optional. If set to True, the trust bundle will include the private ca managed identity regional root public certificates. Important: `trust_default_shared_ca` is only supported for managed identity trust domain resource.",
      ).optional(),
    }).describe(
      "Trust store that contains trust anchors and optional intermediate CAs used in PKI to build a trust chain(trust hierarchy) and verify a client's identity.",
    ).optional(),
  }).describe(
    "An X.509-type identity provider represents a CA. It is trusted to assert a client identity if the client has a certificate that chains up to this CA.",
  ).optional(),
  workloadIdentityPoolProviderId: z.string().describe(
    "Required. The ID for the provider, which becomes the final component of the resource name. This value must be 4-32 characters, and may contain the characters [a-z0-9-]. The prefix `gcp-` is reserved for use by Google, and may not be specified.",
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

/** Swamp extension model for Google Cloud Identity and Access Management (IAM) WorkloadIdentityPools.Providers. Registered at `@swamp/gcp/iam/workloadidentitypools-providers`. */
export const model = {
  type: "@swamp/gcp/iam/workloadidentitypools-providers",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.06.06.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A configuration for an external identity provider.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a providers",
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
        if (g["attributeCondition"] !== undefined) {
          body["attributeCondition"] = g["attributeCondition"];
        }
        if (g["attributeMapping"] !== undefined) {
          body["attributeMapping"] = g["attributeMapping"];
        }
        if (g["aws"] !== undefined) body["aws"] = g["aws"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["oidc"] !== undefined) body["oidc"] = g["oidc"];
        if (g["saml"] !== undefined) body["saml"] = g["saml"];
        if (g["x509"] !== undefined) body["x509"] = g["x509"];
        if (g["workloadIdentityPoolProviderId"] !== undefined) {
          body["workloadIdentityPoolProviderId"] =
            g["workloadIdentityPoolProviderId"];
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
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
          credentials,
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
      description: "Get a providers",
      arguments: z.object({
        identifier: z.string().describe("The name of the providers"),
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
      description: "Update providers attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["attributeCondition"] !== undefined) {
          body["attributeCondition"] = g["attributeCondition"];
        }
        if (g["attributeMapping"] !== undefined) {
          body["attributeMapping"] = g["attributeMapping"];
        }
        if (g["aws"] !== undefined) body["aws"] = g["aws"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["oidc"] !== undefined) body["oidc"] = g["oidc"];
        if (g["saml"] !== undefined) body["saml"] = g["saml"];
        if (g["x509"] !== undefined) body["x509"] = g["x509"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Delete the providers",
      arguments: z.object({
        identifier: z.string().describe("The name of the providers"),
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
        const { existed } = await deleteResource(
          BASE_URL,
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
      description: "Sync providers state from GCP",
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
      description: "List providers resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The maximum number of providers to return. If unspecified, at most 50 providers are returned. The maximum value is 100; values above 100 are truncated to 100.",
        ).optional(),
        showDeleted: z.boolean().describe(
          "Whether to return soft-deleted providers.",
        ).optional(),
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
        if (args["showDeleted"] !== undefined) {
          params["showDeleted"] = String(args["showDeleted"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "workloadIdentityPoolProviders",
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
    undelete: {
      description: "undelete",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
          BASE_URL,
          {
            "id":
              "iam.projects.locations.workloadIdentityPools.providers.undelete",
            "path": "v1/{+name}:undelete",
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
  },
};
