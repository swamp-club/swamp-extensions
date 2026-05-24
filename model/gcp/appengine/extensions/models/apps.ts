// Auto-generated extension model for @swamp/gcp/appengine/apps
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud App Engine Admin Apps.
 *
 * An Application resource contains the top-level configuration of an App Engine application.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://appengine.googleapis.com/";

const GET_CONFIG = {
  "id": "appengine.apps.get",
  "path": "v1/apps/{appsId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "appsId",
  ],
  "parameters": {
    "appsId": {
      "location": "path",
      "required": true,
    },
    "includeExtraData": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "appengine.apps.create",
  "path": "v1/apps",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const PATCH_CONFIG = {
  "id": "appengine.apps.patch",
  "path": "v1/apps/{appsId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "appsId",
  ],
  "parameters": {
    "appsId": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  authDomain: z.string().describe(
    "Google Apps authentication domain that controls which users can access this application.Defaults to open access for any Google Account.",
  ).optional(),
  databaseType: z.enum([
    "DATABASE_TYPE_UNSPECIFIED",
    "CLOUD_DATASTORE",
    "CLOUD_FIRESTORE",
    "CLOUD_DATASTORE_COMPATIBILITY",
  ]).describe(
    "The type of the Cloud Firestore or Cloud Datastore database associated with this application.",
  ).optional(),
  defaultCookieExpiration: z.string().describe(
    "Cookie expiration policy for this application.",
  ).optional(),
  dispatchRules: z.array(z.object({
    domain: z.string().describe(
      'Domain name to match against. The wildcard "*" is supported if specified before a period: "*.".Defaults to matching all domains: "*".',
    ).optional(),
    path: z.string().describe(
      'Pathname within the host. Must start with a "/". A single "*" can be included at the end of the path.The sum of the lengths of the domain and path may not exceed 100 characters.',
    ).optional(),
    service: z.string().describe(
      "Resource ID of a service in this application that should serve the matched request. The service must already exist. Example: default.",
    ).optional(),
  })).describe(
    "HTTP path dispatch rules for requests to the application that do not explicitly target a service or version. Rules are order-dependent. Up to 20 dispatch rules can be supported.",
  ).optional(),
  featureSettings: z.object({
    splitHealthChecks: z.boolean().describe(
      "Boolean value indicating if split health checks should be used instead of the legacy health checks. At an app.yaml level, this means defaulting to 'readiness_check' and 'liveness_check' values instead of 'health_check' ones. Once the legacy 'health_check' behavior is deprecated, and this value is always true, this setting can be removed.",
    ).optional(),
    useContainerOptimizedOs: z.boolean().describe(
      "If true, use Container-Optimized OS (https://cloud.google.com/container-optimized-os/) base image for VMs, rather than a base Debian image.",
    ).optional(),
  }).describe(
    "The feature specific settings to be used in the application. These define behaviors that are user configurable.",
  ).optional(),
  generatedCustomerMetadata: z.record(z.string(), z.string()).describe(
    "Additional Google Generated Customer Metadata, this field won't be provided by default and can be requested by setting the IncludeExtraData field in GetApplicationRequest",
  ).optional(),
  iap: z.object({
    enabled: z.boolean().describe(
      "Whether the serving infrastructure will authenticate and authorize all incoming requests.If true, the oauth2_client_id and oauth2_client_secret fields must be non-empty.",
    ).optional(),
    oauth2ClientId: z.string().describe(
      "OAuth2 client ID to use for the authentication flow.",
    ).optional(),
    oauth2ClientSecret: z.string().describe(
      "OAuth2 client secret to use for the authentication flow.For security reasons, this value cannot be retrieved via the API. Instead, the SHA-256 hash of the value is returned in the oauth2_client_secret_sha256 field.@InputOnly",
    ).optional(),
    oauth2ClientSecretSha256: z.string().describe(
      "Output only. Hex-encoded SHA-256 hash of the client secret.@OutputOnly",
    ).optional(),
  }).describe("Identity-Aware Proxy").optional(),
  id: z.string().describe(
    "Identifier of the Application resource. This identifier is equivalent to the project ID of the Google Cloud Platform project where you want to deploy your application. Example: myapp.",
  ).optional(),
  locationId: z.string().describe(
    "Location from which this application runs. Application instances run out of the data centers in the specified location, which is also where all of the application's end user content is stored.Defaults to us-central.View the list of supported locations (https://cloud.google.com/appengine/docs/locations).",
  ).optional(),
  name: z.string().optional(),
  serviceAccount: z.string().describe(
    "The service account associated with the application. This is the app-level default identity. If no identity provided during create version, Admin API will fallback to this one.",
  ).optional(),
  servingStatus: z.enum([
    "UNSPECIFIED",
    "SERVING",
    "USER_DISABLED",
    "SYSTEM_DISABLED",
  ]).describe("Serving status of this application.").optional(),
  sslPolicy: z.enum(["SSL_POLICY_UNSPECIFIED", "DEFAULT", "MODERN"]).describe(
    "The SSL policy that will be applied to the application. If set to Modern it will restrict traffic with TLS < 1.2 and allow only Modern Ciphers suite",
  ).optional(),
});

const StateSchema = z.object({
  authDomain: z.string().optional(),
  codeBucket: z.string().optional(),
  databaseType: z.string().optional(),
  defaultBucket: z.string().optional(),
  defaultCookieExpiration: z.string().optional(),
  defaultHostname: z.string().optional(),
  dispatchRules: z.array(z.object({
    domain: z.string(),
    path: z.string(),
    service: z.string(),
  })).optional(),
  featureSettings: z.object({
    splitHealthChecks: z.boolean(),
    useContainerOptimizedOs: z.boolean(),
  }).optional(),
  gcrDomain: z.string().optional(),
  generatedCustomerMetadata: z.record(z.string(), z.unknown()).optional(),
  iap: z.object({
    enabled: z.boolean(),
    oauth2ClientId: z.string(),
    oauth2ClientSecret: z.string(),
    oauth2ClientSecretSha256: z.string(),
  }).optional(),
  id: z.string().optional(),
  locationId: z.string().optional(),
  name: z.string(),
  serviceAccount: z.string().optional(),
  servingStatus: z.string().optional(),
  sslPolicy: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  authDomain: z.string().describe(
    "Google Apps authentication domain that controls which users can access this application.Defaults to open access for any Google Account.",
  ).optional(),
  databaseType: z.enum([
    "DATABASE_TYPE_UNSPECIFIED",
    "CLOUD_DATASTORE",
    "CLOUD_FIRESTORE",
    "CLOUD_DATASTORE_COMPATIBILITY",
  ]).describe(
    "The type of the Cloud Firestore or Cloud Datastore database associated with this application.",
  ).optional(),
  defaultCookieExpiration: z.string().describe(
    "Cookie expiration policy for this application.",
  ).optional(),
  dispatchRules: z.array(z.object({
    domain: z.string().describe(
      'Domain name to match against. The wildcard "*" is supported if specified before a period: "*.".Defaults to matching all domains: "*".',
    ).optional(),
    path: z.string().describe(
      'Pathname within the host. Must start with a "/". A single "*" can be included at the end of the path.The sum of the lengths of the domain and path may not exceed 100 characters.',
    ).optional(),
    service: z.string().describe(
      "Resource ID of a service in this application that should serve the matched request. The service must already exist. Example: default.",
    ).optional(),
  })).describe(
    "HTTP path dispatch rules for requests to the application that do not explicitly target a service or version. Rules are order-dependent. Up to 20 dispatch rules can be supported.",
  ).optional(),
  featureSettings: z.object({
    splitHealthChecks: z.boolean().describe(
      "Boolean value indicating if split health checks should be used instead of the legacy health checks. At an app.yaml level, this means defaulting to 'readiness_check' and 'liveness_check' values instead of 'health_check' ones. Once the legacy 'health_check' behavior is deprecated, and this value is always true, this setting can be removed.",
    ).optional(),
    useContainerOptimizedOs: z.boolean().describe(
      "If true, use Container-Optimized OS (https://cloud.google.com/container-optimized-os/) base image for VMs, rather than a base Debian image.",
    ).optional(),
  }).describe(
    "The feature specific settings to be used in the application. These define behaviors that are user configurable.",
  ).optional(),
  generatedCustomerMetadata: z.record(z.string(), z.string()).describe(
    "Additional Google Generated Customer Metadata, this field won't be provided by default and can be requested by setting the IncludeExtraData field in GetApplicationRequest",
  ).optional(),
  iap: z.object({
    enabled: z.boolean().describe(
      "Whether the serving infrastructure will authenticate and authorize all incoming requests.If true, the oauth2_client_id and oauth2_client_secret fields must be non-empty.",
    ).optional(),
    oauth2ClientId: z.string().describe(
      "OAuth2 client ID to use for the authentication flow.",
    ).optional(),
    oauth2ClientSecret: z.string().describe(
      "OAuth2 client secret to use for the authentication flow.For security reasons, this value cannot be retrieved via the API. Instead, the SHA-256 hash of the value is returned in the oauth2_client_secret_sha256 field.@InputOnly",
    ).optional(),
    oauth2ClientSecretSha256: z.string().describe(
      "Output only. Hex-encoded SHA-256 hash of the client secret.@OutputOnly",
    ).optional(),
  }).describe("Identity-Aware Proxy").optional(),
  id: z.string().describe(
    "Identifier of the Application resource. This identifier is equivalent to the project ID of the Google Cloud Platform project where you want to deploy your application. Example: myapp.",
  ).optional(),
  locationId: z.string().describe(
    "Location from which this application runs. Application instances run out of the data centers in the specified location, which is also where all of the application's end user content is stored.Defaults to us-central.View the list of supported locations (https://cloud.google.com/appengine/docs/locations).",
  ).optional(),
  name: z.string().optional(),
  serviceAccount: z.string().describe(
    "The service account associated with the application. This is the app-level default identity. If no identity provided during create version, Admin API will fallback to this one.",
  ).optional(),
  servingStatus: z.enum([
    "UNSPECIFIED",
    "SERVING",
    "USER_DISABLED",
    "SYSTEM_DISABLED",
  ]).describe("Serving status of this application.").optional(),
  sslPolicy: z.enum(["SSL_POLICY_UNSPECIFIED", "DEFAULT", "MODERN"]).describe(
    "The SSL policy that will be applied to the application. If set to Modern it will restrict traffic with TLS < 1.2 and allow only Modern Ciphers suite",
  ).optional(),
});

/** Swamp extension model for Google Cloud App Engine Admin Apps. Registered at `@swamp/gcp/appengine/apps`. */
export const model = {
  type: "@swamp/gcp/appengine/apps",
  version: "2026.05.24.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An Application resource contains the top-level configuration of an App Engine...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a apps",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["authDomain"] !== undefined) body["authDomain"] = g["authDomain"];
        if (g["databaseType"] !== undefined) {
          body["databaseType"] = g["databaseType"];
        }
        if (g["defaultCookieExpiration"] !== undefined) {
          body["defaultCookieExpiration"] = g["defaultCookieExpiration"];
        }
        if (g["dispatchRules"] !== undefined) {
          body["dispatchRules"] = g["dispatchRules"];
        }
        if (g["featureSettings"] !== undefined) {
          body["featureSettings"] = g["featureSettings"];
        }
        if (g["generatedCustomerMetadata"] !== undefined) {
          body["generatedCustomerMetadata"] = g["generatedCustomerMetadata"];
        }
        if (g["iap"] !== undefined) body["iap"] = g["iap"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["locationId"] !== undefined) body["locationId"] = g["locationId"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["servingStatus"] !== undefined) {
          body["servingStatus"] = g["servingStatus"];
        }
        if (g["sslPolicy"] !== undefined) body["sslPolicy"] = g["sslPolicy"];
        if (g["name"] !== undefined) params["appsId"] = String(g["name"]);
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
      description: "Get a apps",
      arguments: z.object({
        identifier: z.string().describe("The name of the apps"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["appsId"] = args.identifier;
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
      description: "Update apps attributes",
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
        params["appsId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["authDomain"] !== undefined) body["authDomain"] = g["authDomain"];
        if (g["databaseType"] !== undefined) {
          body["databaseType"] = g["databaseType"];
        }
        if (g["defaultCookieExpiration"] !== undefined) {
          body["defaultCookieExpiration"] = g["defaultCookieExpiration"];
        }
        if (g["dispatchRules"] !== undefined) {
          body["dispatchRules"] = g["dispatchRules"];
        }
        if (g["featureSettings"] !== undefined) {
          body["featureSettings"] = g["featureSettings"];
        }
        if (g["generatedCustomerMetadata"] !== undefined) {
          body["generatedCustomerMetadata"] = g["generatedCustomerMetadata"];
        }
        if (g["iap"] !== undefined) body["iap"] = g["iap"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["locationId"] !== undefined) body["locationId"] = g["locationId"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["servingStatus"] !== undefined) {
          body["servingStatus"] = g["servingStatus"];
        }
        if (g["sslPolicy"] !== undefined) body["sslPolicy"] = g["sslPolicy"];
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
    sync: {
      description: "Sync apps state from GCP",
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
          params["appsId"] = identifier;
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
    list_runtimes: {
      description: "list runtimes",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["appsId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "appengine.apps.listRuntimes",
            "path": "v1/apps/{appsId}:listRuntimes",
            "httpMethod": "GET",
            "parameterOrder": ["appsId"],
            "parameters": {
              "appsId": { "location": "path", "required": true },
              "environment": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    repair: {
      description: "repair",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["appsId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "appengine.apps.repair",
            "path": "v1/apps/{appsId}:repair",
            "httpMethod": "POST",
            "parameterOrder": ["appsId"],
            "parameters": {
              "appsId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
