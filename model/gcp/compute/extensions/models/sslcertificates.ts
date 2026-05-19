// Auto-generated extension model for @swamp/gcp/compute/sslcertificates
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine SslCertificates.
 *
 * Represents an SSL certificate resource. Google Compute Engine has two SSL certificate resources: * [Global](/compute/docs/reference/rest/v1/sslCertificates) * [Regional](/compute/docs/reference/rest/v1/regionSslCertificates) The global SSL certificates (sslCertificates) are used by: - Global external Application Load Balancers - Classic Application Load Balancers - Proxy Network Load Balancers (with target SSL proxies) The regional SSL certificates (regionSslCertificates) are used by: - Regional external Application Load Balancers - Regional internal Application Load Balancers Optionally, certificate file contents that you upload can contain a set of up to five PEM-encoded certificates. The API call creates an object (sslCertificate) that holds this data. You can use SSL keys and certificates to secure connections to a load balancer. For more information, read Creating and using SSL certificates,SSL certificates quotas and limits, and Troubleshooting SSL certificates.
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
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.sslCertificates.get",
  "path": "projects/{project}/global/sslCertificates/{sslCertificate}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "sslCertificate",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "sslCertificate": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.sslCertificates.insert",
  "path": "projects/{project}/global/sslCertificates",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.sslCertificates.delete",
  "path": "projects/{project}/global/sslCertificates/{sslCertificate}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "sslCertificate",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "sslCertificate": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  certificate: z.string().describe(
    "A value read into memory from a certificate file. The certificate file must be in PEM format. The certificate chain must be no greater than 5 certs long. The chain must include at least one intermediate cert.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  managed: z.object({
    domainStatus: z.record(
      z.string(),
      z.enum([
        "ACTIVE",
        "DOMAIN_STATUS_UNSPECIFIED",
        "FAILED_CAA_CHECKING",
        "FAILED_CAA_FORBIDDEN",
        "FAILED_NOT_VISIBLE",
        "FAILED_RATE_LIMITED",
        "PROVISIONING",
      ]),
    ).describe(
      "Output only. [Output only] Detailed statuses of the domains specified for managed certificate resource.",
    ).optional(),
    domains: z.array(z.string()).describe(
      "The domains for which a managed SSL certificate will be generated. Each Google-managed SSL certificate supports up to the [maximum number of domains per Google-managed SSL certificate](/load-balancing/docs/quotas#ssl_certificates).",
    ).optional(),
    status: z.enum([
      "ACTIVE",
      "MANAGED_CERTIFICATE_STATUS_UNSPECIFIED",
      "PROVISIONING",
      "PROVISIONING_FAILED",
      "PROVISIONING_FAILED_PERMANENTLY",
      "RENEWAL_FAILED",
    ]).describe(
      "Output only. [Output only] Status of the managed certificate resource.",
    ).optional(),
  }).describe("Configuration and status of a managed SSL certificate.")
    .optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  privateKey: z.string().describe(
    "A value read into memory from a write-only private key file. The private key file must be in PEM format. For security, only insert requests include this field.",
  ).optional(),
  selfManaged: z.object({
    certificate: z.string().describe(
      "A local certificate file. The certificate must be in PEM format. The certificate chain must be no greater than 5 certs long. The chain must include at least one intermediate cert.",
    ).optional(),
    privateKey: z.string().describe(
      "A write-only private key in PEM format. Only insert requests will include this field.",
    ).optional(),
  }).describe("Configuration and status of a self-managed SSL certificate.")
    .optional(),
  type: z.enum(["MANAGED", "SELF_MANAGED", "TYPE_UNSPECIFIED"]).describe(
    '(Optional) Specifies the type of SSL certificate, either "SELF_MANAGED" or "MANAGED". If not specified, the certificate is self-managed and the fieldscertificate and private_key are used.',
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  certificate: z.string().optional(),
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  expireTime: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  managed: z.object({
    domainStatus: z.record(z.string(), z.unknown()),
    domains: z.array(z.string()),
    status: z.string(),
  }).optional(),
  name: z.string(),
  privateKey: z.string().optional(),
  region: z.string().optional(),
  selfLink: z.string().optional(),
  selfManaged: z.object({
    certificate: z.string(),
    privateKey: z.string(),
  }).optional(),
  subjectAlternativeNames: z.array(z.string()).optional(),
  type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  certificate: z.string().describe(
    "A value read into memory from a certificate file. The certificate file must be in PEM format. The certificate chain must be no greater than 5 certs long. The chain must include at least one intermediate cert.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  managed: z.object({
    domainStatus: z.record(
      z.string(),
      z.enum([
        "ACTIVE",
        "DOMAIN_STATUS_UNSPECIFIED",
        "FAILED_CAA_CHECKING",
        "FAILED_CAA_FORBIDDEN",
        "FAILED_NOT_VISIBLE",
        "FAILED_RATE_LIMITED",
        "PROVISIONING",
      ]),
    ).describe(
      "Output only. [Output only] Detailed statuses of the domains specified for managed certificate resource.",
    ).optional(),
    domains: z.array(z.string()).describe(
      "The domains for which a managed SSL certificate will be generated. Each Google-managed SSL certificate supports up to the [maximum number of domains per Google-managed SSL certificate](/load-balancing/docs/quotas#ssl_certificates).",
    ).optional(),
    status: z.enum([
      "ACTIVE",
      "MANAGED_CERTIFICATE_STATUS_UNSPECIFIED",
      "PROVISIONING",
      "PROVISIONING_FAILED",
      "PROVISIONING_FAILED_PERMANENTLY",
      "RENEWAL_FAILED",
    ]).describe(
      "Output only. [Output only] Status of the managed certificate resource.",
    ).optional(),
  }).describe("Configuration and status of a managed SSL certificate.")
    .optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  privateKey: z.string().describe(
    "A value read into memory from a write-only private key file. The private key file must be in PEM format. For security, only insert requests include this field.",
  ).optional(),
  selfManaged: z.object({
    certificate: z.string().describe(
      "A local certificate file. The certificate must be in PEM format. The certificate chain must be no greater than 5 certs long. The chain must include at least one intermediate cert.",
    ).optional(),
    privateKey: z.string().describe(
      "A write-only private key in PEM format. Only insert requests will include this field.",
    ).optional(),
  }).describe("Configuration and status of a self-managed SSL certificate.")
    .optional(),
  type: z.enum(["MANAGED", "SELF_MANAGED", "TYPE_UNSPECIFIED"]).describe(
    '(Optional) Specifies the type of SSL certificate, either "SELF_MANAGED" or "MANAGED". If not specified, the certificate is self-managed and the fieldscertificate and private_key are used.',
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine SslCertificates. Registered at `@swamp/gcp/compute/sslcertificates`. */
export const model = {
  type: "@swamp/gcp/compute/sslcertificates",
  version: "2026.05.19.2",
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
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents an SSL certificate resource. Google Compute Engine has two SSL cer...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a sslCertificates",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["certificate"] !== undefined) {
          body["certificate"] = g["certificate"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["managed"] !== undefined) body["managed"] = g["managed"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["privateKey"] !== undefined) body["privateKey"] = g["privateKey"];
        if (g["selfManaged"] !== undefined) {
          body["selfManaged"] = g["selfManaged"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) {
          params["sslCertificate"] = String(g["name"]);
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
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
      description: "Get a sslCertificates",
      arguments: z.object({
        identifier: z.string().describe("The name of the sslCertificates"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["sslCertificate"] = args.identifier;
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
    delete: {
      description: "Delete the sslCertificates",
      arguments: z.object({
        identifier: z.string().describe("The name of the sslCertificates"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["sslCertificate"] = args.identifier;
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
      description: "Sync sslCertificates state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["sslCertificate"] = identifier;
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
  },
};
