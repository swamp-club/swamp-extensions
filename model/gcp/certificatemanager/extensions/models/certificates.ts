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

// Auto-generated extension model for @swamp/gcp/certificatemanager/certificates
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Certificate Manager Certificates.
 *
 * Defines TLS certificate.
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
  return `${parent}/certificates/${shortName}`;
}

const BASE_URL = "https://certificatemanager.googleapis.com/";

const GET_CONFIG = {
  "id": "certificatemanager.projects.locations.certificates.get",
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
  "id": "certificatemanager.projects.locations.certificates.create",
  "path": "v1/{+parent}/certificates",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "certificateId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "certificatemanager.projects.locations.certificates.patch",
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
  "id": "certificatemanager.projects.locations.certificates.delete",
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
  "id": "certificatemanager.projects.locations.certificates.list",
  "path": "v1/{+parent}/certificates",
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
  description: z.string().describe(
    "Optional. One or more paragraphs of text description of a certificate.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of labels associated with a Certificate.",
  ).optional(),
  managed: z.object({
    authorizationAttemptInfo: z.array(z.object({
      attemptTime: z.string().describe(
        "Output only. The timestamp, when the authorization attempt was made.",
      ).optional(),
      details: z.string().describe(
        "Output only. Human readable explanation for reaching the state. Provided to help address the configuration issues. Not guaranteed to be stable. For programmatic access use FailureReason enum.",
      ).optional(),
      domain: z.string().describe(
        "Output only. Domain name of the authorization attempt.",
      ).optional(),
      failureReason: z.enum([
        "FAILURE_REASON_UNSPECIFIED",
        "CONFIG",
        "CAA",
        "RATE_LIMITED",
      ]).describe(
        "Output only. Reason for failure of the authorization attempt for the domain.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "AUTHORIZING",
        "AUTHORIZED",
        "FAILED",
      ]).describe(
        "Output only. State of the domain for managed certificate issuance.",
      ).optional(),
      troubleshooting: z.object({
        cname: z.object({
          expectedData: z.unknown().describe(
            "Output only. The expected value of the CNAME record for the domain, equals to `dns_resource_record.data` in the corresponding `DnsAuthorization`.",
          ).optional(),
          name: z.unknown().describe(
            "Output only. The name of the CNAME record for the domain, equals to `dns_resource_record.name` in the corresponding `DnsAuthorization`.",
          ).optional(),
          resolvedData: z.unknown().describe(
            "Output only. The resolved CNAME chain. Empty list if the CNAME record for `CNAME.name` is not found. Otherwise the first item is the value of the CNAME record for `CNAME.name`. If the CNAME chain is longer, the second item is the value of the CNAME record for the first item, and so on.",
          ).optional(),
        }).describe("CNAME troubleshooting information.").optional(),
        ips: z.object({
          resolved: z.unknown().describe(
            "Output only. The list of IP addresses resolved from the domain's A/AAAA records. Can contain both ipv4 and ipv6 addresses.",
          ).optional(),
          serving: z.unknown().describe(
            "Output only. The list of IP addresses, where the certificate is attached and port 443 is open.",
          ).optional(),
          servingOnAltPorts: z.unknown().describe(
            "Output only. The list of IP addresses, where the certificate is attached, but port 443 is not open.",
          ).optional(),
        }).describe("IPs troubleshooting information.").optional(),
        issues: z.array(z.unknown()).describe(
          "Output only. The list of issues discovered during the authorization attempt.",
        ).optional(),
      }).describe("Troubleshooting information for the authorization attempt.")
        .optional(),
    })).describe(
      "Output only. Detailed state of the latest authorization attempt for each domain specified for managed certificate resource.",
    ).optional(),
    dnsAuthorizations: z.array(z.string()).describe(
      "Optional. Immutable. Authorizations that will be used for performing domain authorization.",
    ).optional(),
    domains: z.array(z.string()).describe(
      "Optional. Immutable. The domains for which a managed SSL certificate will be generated. Wildcard domains are only supported with DNS challenge resolution.",
    ).optional(),
    issuanceConfig: z.string().describe(
      "Optional. Immutable. The resource name for a CertificateIssuanceConfig used to configure private PKI certificates in the format `projects/*/locations/*/certificateIssuanceConfigs/*`. If this field is not set, the certificates will instead be publicly signed as documented at https://cloud.google.com/load-balancing/docs/ssl-certificates/google-managed-certs#caa.",
    ).optional(),
    provisioningIssue: z.object({
      details: z.string().describe(
        "Output only. Human readable explanation about the issue. Provided to help address the configuration issues. Not guaranteed to be stable. For programmatic access use Reason enum.",
      ).optional(),
      reason: z.enum([
        "REASON_UNSPECIFIED",
        "AUTHORIZATION_ISSUE",
        "RATE_LIMITED",
      ]).describe("Output only. Reason for provisioning failures.").optional(),
    }).describe(
      "Information about issues with provisioning a Managed Certificate.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "PROVISIONING", "FAILED", "ACTIVE"])
      .describe("Output only. State of the managed certificate resource.")
      .optional(),
  }).describe(
    "Configuration and state of a Managed Certificate. Certificate Manager provisions and renews Managed Certificates automatically, for as long as it's authorized to do so.",
  ).optional(),
  managedIdentity: z.object({
    identity: z.string().describe(
      "Required. Immutable. SPIFFE ID of the Managed Identity used for this certificate.",
    ).optional(),
    provisioningIssue: z.object({
      details: z.string().describe(
        "Output only. Human readable explanation about the issue. Provided to help address the configuration issues. Not guaranteed to be stable. For programmatic access use Reason enum.",
      ).optional(),
      reason: z.enum([
        "REASON_UNSPECIFIED",
        "AUTHORIZATION_ISSUE",
        "RATE_LIMITED",
      ]).describe("Output only. Reason for provisioning failures.").optional(),
    }).describe(
      "Information about issues with provisioning a Managed Certificate.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "PROVISIONING", "FAILED", "ACTIVE"])
      .describe("Output only. State of the managed certificate resource.")
      .optional(),
  }).describe(
    "Configuration and state of a Managed Identity Certificate. Certificate Manager provisions and renews Managed Identity Certificates automatically, for as long as it's authorized to do so.",
  ).optional(),
  name: z.string().describe(
    "Identifier. A user-defined name of the certificate. Certificate names must be unique globally and match pattern `projects/*/locations/*/certificates/*`.",
  ).optional(),
  scope: z.enum(["DEFAULT", "EDGE_CACHE", "ALL_REGIONS", "CLIENT_AUTH"])
    .describe("Optional. Immutable. The scope of the certificate.").optional(),
  selfManaged: z.object({
    pemCertificate: z.string().describe(
      "Optional. Input only. The PEM-encoded certificate chain. Leaf certificate comes first, followed by intermediate ones if any.",
    ).optional(),
    pemPrivateKey: z.string().describe(
      "Optional. Input only. The PEM-encoded private key of the leaf certificate.",
    ).optional(),
  }).describe(
    "Certificate data for a SelfManaged Certificate. SelfManaged Certificates are uploaded by the user. Updating such certificates before they expire remains the user's responsibility.",
  ).optional(),
  certificateId: z.string().describe(
    "Required. A user-provided name of the certificate.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  description: z.string().optional(),
  expireTime: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  managed: z.object({
    authorizationAttemptInfo: z.array(z.object({
      attemptTime: z.string(),
      details: z.string(),
      domain: z.string(),
      failureReason: z.string(),
      state: z.string(),
      troubleshooting: z.object({
        cname: z.object({
          expectedData: z.unknown(),
          name: z.unknown(),
          resolvedData: z.unknown(),
        }),
        ips: z.object({
          resolved: z.unknown(),
          serving: z.unknown(),
          servingOnAltPorts: z.unknown(),
        }),
        issues: z.array(z.unknown()),
      }),
    })),
    dnsAuthorizations: z.array(z.string()),
    domains: z.array(z.string()),
    issuanceConfig: z.string(),
    provisioningIssue: z.object({
      details: z.string(),
      reason: z.string(),
    }),
    state: z.string(),
  }).optional(),
  managedIdentity: z.object({
    identity: z.string(),
    provisioningIssue: z.object({
      details: z.string(),
      reason: z.string(),
    }),
    state: z.string(),
  }).optional(),
  name: z.string(),
  pemCertificate: z.string().optional(),
  sanDnsnames: z.array(z.string()).optional(),
  scope: z.string().optional(),
  selfManaged: z.object({
    pemCertificate: z.string(),
    pemPrivateKey: z.string(),
  }).optional(),
  updateTime: z.string().optional(),
  usedBy: z.array(z.object({
    name: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  description: z.string().describe(
    "Optional. One or more paragraphs of text description of a certificate.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of labels associated with a Certificate.",
  ).optional(),
  managed: z.object({
    authorizationAttemptInfo: z.array(z.object({
      attemptTime: z.string().describe(
        "Output only. The timestamp, when the authorization attempt was made.",
      ).optional(),
      details: z.string().describe(
        "Output only. Human readable explanation for reaching the state. Provided to help address the configuration issues. Not guaranteed to be stable. For programmatic access use FailureReason enum.",
      ).optional(),
      domain: z.string().describe(
        "Output only. Domain name of the authorization attempt.",
      ).optional(),
      failureReason: z.enum([
        "FAILURE_REASON_UNSPECIFIED",
        "CONFIG",
        "CAA",
        "RATE_LIMITED",
      ]).describe(
        "Output only. Reason for failure of the authorization attempt for the domain.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "AUTHORIZING",
        "AUTHORIZED",
        "FAILED",
      ]).describe(
        "Output only. State of the domain for managed certificate issuance.",
      ).optional(),
      troubleshooting: z.object({
        cname: z.object({
          expectedData: z.unknown().describe(
            "Output only. The expected value of the CNAME record for the domain, equals to `dns_resource_record.data` in the corresponding `DnsAuthorization`.",
          ).optional(),
          name: z.unknown().describe(
            "Output only. The name of the CNAME record for the domain, equals to `dns_resource_record.name` in the corresponding `DnsAuthorization`.",
          ).optional(),
          resolvedData: z.unknown().describe(
            "Output only. The resolved CNAME chain. Empty list if the CNAME record for `CNAME.name` is not found. Otherwise the first item is the value of the CNAME record for `CNAME.name`. If the CNAME chain is longer, the second item is the value of the CNAME record for the first item, and so on.",
          ).optional(),
        }).describe("CNAME troubleshooting information.").optional(),
        ips: z.object({
          resolved: z.unknown().describe(
            "Output only. The list of IP addresses resolved from the domain's A/AAAA records. Can contain both ipv4 and ipv6 addresses.",
          ).optional(),
          serving: z.unknown().describe(
            "Output only. The list of IP addresses, where the certificate is attached and port 443 is open.",
          ).optional(),
          servingOnAltPorts: z.unknown().describe(
            "Output only. The list of IP addresses, where the certificate is attached, but port 443 is not open.",
          ).optional(),
        }).describe("IPs troubleshooting information.").optional(),
        issues: z.array(z.unknown()).describe(
          "Output only. The list of issues discovered during the authorization attempt.",
        ).optional(),
      }).describe("Troubleshooting information for the authorization attempt.")
        .optional(),
    })).describe(
      "Output only. Detailed state of the latest authorization attempt for each domain specified for managed certificate resource.",
    ).optional(),
    dnsAuthorizations: z.array(z.string()).describe(
      "Optional. Immutable. Authorizations that will be used for performing domain authorization.",
    ).optional(),
    domains: z.array(z.string()).describe(
      "Optional. Immutable. The domains for which a managed SSL certificate will be generated. Wildcard domains are only supported with DNS challenge resolution.",
    ).optional(),
    issuanceConfig: z.string().describe(
      "Optional. Immutable. The resource name for a CertificateIssuanceConfig used to configure private PKI certificates in the format `projects/*/locations/*/certificateIssuanceConfigs/*`. If this field is not set, the certificates will instead be publicly signed as documented at https://cloud.google.com/load-balancing/docs/ssl-certificates/google-managed-certs#caa.",
    ).optional(),
    provisioningIssue: z.object({
      details: z.string().describe(
        "Output only. Human readable explanation about the issue. Provided to help address the configuration issues. Not guaranteed to be stable. For programmatic access use Reason enum.",
      ).optional(),
      reason: z.enum([
        "REASON_UNSPECIFIED",
        "AUTHORIZATION_ISSUE",
        "RATE_LIMITED",
      ]).describe("Output only. Reason for provisioning failures.").optional(),
    }).describe(
      "Information about issues with provisioning a Managed Certificate.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "PROVISIONING", "FAILED", "ACTIVE"])
      .describe("Output only. State of the managed certificate resource.")
      .optional(),
  }).describe(
    "Configuration and state of a Managed Certificate. Certificate Manager provisions and renews Managed Certificates automatically, for as long as it's authorized to do so.",
  ).optional(),
  managedIdentity: z.object({
    identity: z.string().describe(
      "Required. Immutable. SPIFFE ID of the Managed Identity used for this certificate.",
    ).optional(),
    provisioningIssue: z.object({
      details: z.string().describe(
        "Output only. Human readable explanation about the issue. Provided to help address the configuration issues. Not guaranteed to be stable. For programmatic access use Reason enum.",
      ).optional(),
      reason: z.enum([
        "REASON_UNSPECIFIED",
        "AUTHORIZATION_ISSUE",
        "RATE_LIMITED",
      ]).describe("Output only. Reason for provisioning failures.").optional(),
    }).describe(
      "Information about issues with provisioning a Managed Certificate.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "PROVISIONING", "FAILED", "ACTIVE"])
      .describe("Output only. State of the managed certificate resource.")
      .optional(),
  }).describe(
    "Configuration and state of a Managed Identity Certificate. Certificate Manager provisions and renews Managed Identity Certificates automatically, for as long as it's authorized to do so.",
  ).optional(),
  name: z.string().describe(
    "Identifier. A user-defined name of the certificate. Certificate names must be unique globally and match pattern `projects/*/locations/*/certificates/*`.",
  ).optional(),
  scope: z.enum(["DEFAULT", "EDGE_CACHE", "ALL_REGIONS", "CLIENT_AUTH"])
    .describe("Optional. Immutable. The scope of the certificate.").optional(),
  selfManaged: z.object({
    pemCertificate: z.string().describe(
      "Optional. Input only. The PEM-encoded certificate chain. Leaf certificate comes first, followed by intermediate ones if any.",
    ).optional(),
    pemPrivateKey: z.string().describe(
      "Optional. Input only. The PEM-encoded private key of the leaf certificate.",
    ).optional(),
  }).describe(
    "Certificate data for a SelfManaged Certificate. SelfManaged Certificates are uploaded by the user. Updating such certificates before they expire remains the user's responsibility.",
  ).optional(),
  certificateId: z.string().describe(
    "Required. A user-provided name of the certificate.",
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

/** Swamp extension model for Google Cloud Certificate Manager Certificates. Registered at `@swamp/gcp/certificatemanager/certificates`. */
export const model = {
  type: "@swamp/gcp/certificatemanager/certificates",
  version: "2026.06.08.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Defines TLS certificate.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a certificates",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["managed"] !== undefined) body["managed"] = g["managed"];
        if (g["managedIdentity"] !== undefined) {
          body["managedIdentity"] = g["managedIdentity"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["scope"] !== undefined) body["scope"] = g["scope"];
        if (g["selfManaged"] !== undefined) {
          body["selfManaged"] = g["selfManaged"];
        }
        if (g["certificateId"] !== undefined) {
          body["certificateId"] = g["certificateId"];
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
      description: "Get a certificates",
      arguments: z.object({
        identifier: z.string().describe("The name of the certificates"),
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
      description: "Update certificates attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["managed"] !== undefined) body["managed"] = g["managed"];
        if (g["managedIdentity"] !== undefined) {
          body["managedIdentity"] = g["managedIdentity"];
        }
        if (g["selfManaged"] !== undefined) {
          body["selfManaged"] = g["selfManaged"];
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
      description: "Delete the certificates",
      arguments: z.object({
        identifier: z.string().describe("The name of the certificates"),
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
      description: "Sync certificates state from GCP",
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
      description: "List certificates resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Filter expression to restrict the Certificates returned.",
        ).optional(),
        orderBy: z.string().describe(
          'Optional. A list of Certificate field names used to specify the order of the returned results. The default sorting order is ascending. To specify descending order for a field, add a suffix `" desc"`.',
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Maximum number of certificates to return per call.",
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
          "certificates",
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
