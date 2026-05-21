// Auto-generated extension model for @swamp/gcp/chromemanagement/customers-certificateprovisioningprocesses
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Chrome Management Customers.CertificateProvisioningProcesses.
 *
 * A certificate provisioning process.
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
} from "./_lib/gcp.ts";

const BASE_URL = "https://chromemanagement.googleapis.com/";

const GET_CONFIG = {
  "id": "chromemanagement.customers.certificateProvisioningProcesses.get",
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  chromeOsDevice: z.object({
    deviceDirectoryApiId: z.string(),
    serialNumber: z.string(),
  }).optional(),
  chromeOsUserSession: z.object({
    chromeOsDevice: z.object({
      deviceDirectoryApiId: z.string(),
      serialNumber: z.string(),
    }),
    userDirectoryApiId: z.string(),
    userPrimaryEmail: z.string(),
  }).optional(),
  failureMessage: z.string().optional(),
  genericCaConnection: z.object({
    caConnectionAdapterConfigReference: z.string(),
  }).optional(),
  genericProfile: z.object({
    profileAdapterConfigReference: z.string(),
  }).optional(),
  issuedCertificate: z.string().optional(),
  name: z.string(),
  provisioningProfileId: z.string().optional(),
  scepCaConnection: z.object({
    caConnectionAdapterConfigReference: z.string(),
  }).optional(),
  scepProfile: z.object({
    certificateTemplateName: z.string(),
    country: z.string(),
    keyUsages: z.array(z.string()),
    locality: z.string(),
    organization: z.string(),
    organizationalUnits: z.array(z.string()),
    state: z.string(),
    subjectAltNames: z.array(z.object({
      type: z.string(),
      value: z.string(),
    })),
    subjectCommonName: z.string(),
  }).optional(),
  signData: z.string().optional(),
  signature: z.string().optional(),
  signatureAlgorithm: z.string().optional(),
  startTime: z.string().optional(),
  subjectPublicKeyInfo: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Chrome Management Customers.CertificateProvisioningProcesses. Registered at `@swamp/gcp/chromemanagement/customers-certificateprovisioningprocesses`. */
export const model = {
  type:
    "@swamp/gcp/chromemanagement/customers-certificateprovisioningprocesses",
  version: "2026.05.21.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A certificate provisioning process.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a certificateProvisioningProcesses",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the certificateProvisioningProcesses",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
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
      description: "Sync certificateProvisioningProcesses state from GCP",
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
          params["name"] = identifier;
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
    claim: {
      description: "claim",
      arguments: z.object({
        callerInstanceId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["callerInstanceId"] !== undefined) {
          body["callerInstanceId"] = args["callerInstanceId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "chromemanagement.customers.certificateProvisioningProcesses.claim",
            "path": "v1/{+name}:claim",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_failure: {
      description: "set failure",
      arguments: z.object({
        errorMessage: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["errorMessage"] !== undefined) {
          body["errorMessage"] = args["errorMessage"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "chromemanagement.customers.certificateProvisioningProcesses.setFailure",
            "path": "v1/{+name}:setFailure",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    sign_data: {
      description: "sign data",
      arguments: z.object({
        signData: z.any().optional(),
        signatureAlgorithm: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["signData"] !== undefined) body["signData"] = args["signData"];
        if (args["signatureAlgorithm"] !== undefined) {
          body["signatureAlgorithm"] = args["signatureAlgorithm"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "chromemanagement.customers.certificateProvisioningProcesses.signData",
            "path": "v1/{+name}:signData",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    upload_certificate: {
      description: "upload certificate",
      arguments: z.object({
        certificatePem: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["certificatePem"] !== undefined) {
          body["certificatePem"] = args["certificatePem"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "chromemanagement.customers.certificateProvisioningProcesses.uploadCertificate",
            "path": "v1/{+name}:uploadCertificate",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
