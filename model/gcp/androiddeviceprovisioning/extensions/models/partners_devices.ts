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

// Auto-generated extension model for @swamp/gcp/androiddeviceprovisioning/partners-devices
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Android Device Provisioning Partner Partners.Devices.
 *
 * An Android or Chrome OS device registered for zero-touch enrollment.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://androiddeviceprovisioning.googleapis.com/";

const GET_CONFIG = {
  "id": "androiddeviceprovisioning.partners.devices.get",
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
});

const StateSchema = z.object({
  claims: z.array(z.object({
    additionalService: z.string(),
    googleWorkspaceCustomerId: z.string(),
    ownerCompanyId: z.string(),
    resellerId: z.string(),
    sectionType: z.string(),
    vacationModeExpireTime: z.string(),
    vacationModeStartTime: z.string(),
  })).optional(),
  configuration: z.string().optional(),
  deviceId: z.string().optional(),
  deviceIdentifier: z.object({
    chromeOsAttestedDeviceId: z.string(),
    deviceType: z.string(),
    imei: z.string(),
    imei2: z.string(),
    manufacturer: z.string(),
    meid: z.string(),
    meid2: z.string(),
    model: z.string(),
    serialNumber: z.string(),
  }).optional(),
  deviceMetadata: z.object({
    entries: z.record(z.string(), z.unknown()),
  }).optional(),
  name: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
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

/** Swamp extension model for Google Cloud Android Device Provisioning Partner Partners.Devices. Registered at `@swamp/gcp/androiddeviceprovisioning/partners-devices`. */
export const model = {
  type: "@swamp/gcp/androiddeviceprovisioning/partners-devices",
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
      description:
        "An Android or Chrome OS device registered for zero-touch enrollment.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a devices",
      arguments: z.object({
        identifier: z.string().describe("The name of the devices"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
        const result = await readResource(
          BASE_URL,
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
    sync: {
      description: "Sync devices state from GCP",
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
    claim: {
      description: "claim",
      arguments: z.object({
        configurationId: z.any().optional(),
        customerId: z.any().optional(),
        deviceIdentifier: z.any().optional(),
        deviceMetadata: z.any().optional(),
        googleWorkspaceCustomerId: z.any().optional(),
        preProvisioningToken: z.any().optional(),
        sectionType: z.any().optional(),
        simlockProfileId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        params["partnerId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["configurationId"] !== undefined) {
          body["configurationId"] = args["configurationId"];
        }
        if (args["customerId"] !== undefined) {
          body["customerId"] = args["customerId"];
        }
        if (args["deviceIdentifier"] !== undefined) {
          body["deviceIdentifier"] = args["deviceIdentifier"];
        }
        if (args["deviceMetadata"] !== undefined) {
          body["deviceMetadata"] = args["deviceMetadata"];
        }
        if (args["googleWorkspaceCustomerId"] !== undefined) {
          body["googleWorkspaceCustomerId"] = args["googleWorkspaceCustomerId"];
        }
        if (args["preProvisioningToken"] !== undefined) {
          body["preProvisioningToken"] = args["preProvisioningToken"];
        }
        if (args["sectionType"] !== undefined) {
          body["sectionType"] = args["sectionType"];
        }
        if (args["simlockProfileId"] !== undefined) {
          body["simlockProfileId"] = args["simlockProfileId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "androiddeviceprovisioning.partners.devices.claim",
            "path": "v1/partners/{+partnerId}/devices:claim",
            "httpMethod": "POST",
            "parameterOrder": ["partnerId"],
            "parameters": {
              "partnerId": { "location": "path", "required": true },
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
    claim_async: {
      description: "claim async",
      arguments: z.object({
        claims: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        params["partnerId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["claims"] !== undefined) body["claims"] = args["claims"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "androiddeviceprovisioning.partners.devices.claimAsync",
            "path": "v1/partners/{+partnerId}/devices:claimAsync",
            "httpMethod": "POST",
            "parameterOrder": ["partnerId"],
            "parameters": {
              "partnerId": { "location": "path", "required": true },
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
    find_by_identifier: {
      description: "find by identifier",
      arguments: z.object({
        deviceIdentifier: z.any().optional(),
        limit: z.any().optional(),
        pageToken: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        params["partnerId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["deviceIdentifier"] !== undefined) {
          body["deviceIdentifier"] = args["deviceIdentifier"];
        }
        if (args["limit"] !== undefined) body["limit"] = args["limit"];
        if (args["pageToken"] !== undefined) {
          body["pageToken"] = args["pageToken"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "androiddeviceprovisioning.partners.devices.findByIdentifier",
            "path": "v1/partners/{+partnerId}/devices:findByIdentifier",
            "httpMethod": "POST",
            "parameterOrder": ["partnerId"],
            "parameters": {
              "partnerId": { "location": "path", "required": true },
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
    find_by_owner: {
      description: "find by owner",
      arguments: z.object({
        customerId: z.any().optional(),
        googleWorkspaceCustomerId: z.any().optional(),
        limit: z.any().optional(),
        pageToken: z.any().optional(),
        sectionType: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        params["partnerId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["customerId"] !== undefined) {
          body["customerId"] = args["customerId"];
        }
        if (args["googleWorkspaceCustomerId"] !== undefined) {
          body["googleWorkspaceCustomerId"] = args["googleWorkspaceCustomerId"];
        }
        if (args["limit"] !== undefined) body["limit"] = args["limit"];
        if (args["pageToken"] !== undefined) {
          body["pageToken"] = args["pageToken"];
        }
        if (args["sectionType"] !== undefined) {
          body["sectionType"] = args["sectionType"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "androiddeviceprovisioning.partners.devices.findByOwner",
            "path": "v1/partners/{+partnerId}/devices:findByOwner",
            "httpMethod": "POST",
            "parameterOrder": ["partnerId"],
            "parameters": {
              "partnerId": { "location": "path", "required": true },
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
    get_sim_lock_state: {
      description: "get sim lock state",
      arguments: z.object({
        deviceIdentifier: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        params["partnerId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["deviceIdentifier"] !== undefined) {
          body["deviceIdentifier"] = args["deviceIdentifier"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "androiddeviceprovisioning.partners.devices.getSimLockState",
            "path": "v1/partners/{+partnerId}/devices:getSimLockState",
            "httpMethod": "POST",
            "parameterOrder": ["partnerId"],
            "parameters": {
              "partnerId": { "location": "path", "required": true },
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
    metadata: {
      description: "metadata",
      arguments: z.object({
        deviceMetadata: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        params["metadataOwnerId"] = existing["metadataOwnerId"]?.toString() ??
          g["metadataOwnerId"]?.toString() ?? "";
        params["deviceId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["deviceMetadata"] !== undefined) {
          body["deviceMetadata"] = args["deviceMetadata"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "androiddeviceprovisioning.partners.devices.metadata",
            "path":
              "v1/partners/{+metadataOwnerId}/devices/{+deviceId}/metadata",
            "httpMethod": "POST",
            "parameterOrder": ["metadataOwnerId", "deviceId"],
            "parameters": {
              "deviceId": { "location": "path", "required": true },
              "metadataOwnerId": { "location": "path", "required": true },
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
    unclaim: {
      description: "unclaim",
      arguments: z.object({
        deviceId: z.any().optional(),
        deviceIdentifier: z.any().optional(),
        sectionType: z.any().optional(),
        vacationModeDays: z.any().optional(),
        vacationModeExpireTime: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        params["partnerId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["deviceId"] !== undefined) body["deviceId"] = args["deviceId"];
        if (args["deviceIdentifier"] !== undefined) {
          body["deviceIdentifier"] = args["deviceIdentifier"];
        }
        if (args["sectionType"] !== undefined) {
          body["sectionType"] = args["sectionType"];
        }
        if (args["vacationModeDays"] !== undefined) {
          body["vacationModeDays"] = args["vacationModeDays"];
        }
        if (args["vacationModeExpireTime"] !== undefined) {
          body["vacationModeExpireTime"] = args["vacationModeExpireTime"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "androiddeviceprovisioning.partners.devices.unclaim",
            "path": "v1/partners/{+partnerId}/devices:unclaim",
            "httpMethod": "POST",
            "parameterOrder": ["partnerId"],
            "parameters": {
              "partnerId": { "location": "path", "required": true },
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
    unclaim_async: {
      description: "unclaim async",
      arguments: z.object({
        unclaims: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        params["partnerId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["unclaims"] !== undefined) body["unclaims"] = args["unclaims"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "androiddeviceprovisioning.partners.devices.unclaimAsync",
            "path": "v1/partners/{+partnerId}/devices:unclaimAsync",
            "httpMethod": "POST",
            "parameterOrder": ["partnerId"],
            "parameters": {
              "partnerId": { "location": "path", "required": true },
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
    update_metadata_async: {
      description: "update metadata async",
      arguments: z.object({
        updates: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        params["partnerId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["updates"] !== undefined) body["updates"] = args["updates"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "androiddeviceprovisioning.partners.devices.updateMetadataAsync",
            "path": "v1/partners/{+partnerId}/devices:updateMetadataAsync",
            "httpMethod": "POST",
            "parameterOrder": ["partnerId"],
            "parameters": {
              "partnerId": { "location": "path", "required": true },
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
