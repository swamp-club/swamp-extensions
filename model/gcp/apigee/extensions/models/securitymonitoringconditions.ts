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

// Auto-generated extension model for @swamp/gcp/apigee/securitymonitoringconditions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Apigee SecurityMonitoringConditions.
 *
 * Security monitoring condition for risk assessment version 2.
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
  return `${parent}/securityMonitoringConditions/${shortName}`;
}

const BASE_URL = "https://apigee.googleapis.com/";

const GET_CONFIG = {
  "id": "apigee.organizations.securityMonitoringConditions.get",
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
    "riskAssessmentType": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "apigee.organizations.securityMonitoringConditions.create",
  "path": "v1/{+parent}/securityMonitoringConditions",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "securityMonitoringConditionId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "apigee.organizations.securityMonitoringConditions.patch",
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
  "id": "apigee.organizations.securityMonitoringConditions.delete",
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
    "riskAssessmentType": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "apigee.organizations.securityMonitoringConditions.list",
  "path": "v1/{+parent}/securityMonitoringConditions",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
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
    "riskAssessmentType": {
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
  apiHubGateway: z.string().describe(
    "Optional. The API Hub gateway monitored by the security monitoring condition. This should only be set if risk_assessment_type is API_HUB. Format: `projects/{project}/locations/{location}/plugins/{plugin}/instances/{instance}`",
  ).optional(),
  include: z.object({
    resources: z.array(z.object({
      name: z.string().describe(
        "Required. Name of this resource. For an Apigee API Proxy, this should be the id of the API proxy. For an API Hub Deployment, this should be the id of the deployment.",
      ).optional(),
      type: z.enum([
        "RESOURCE_TYPE_UNSPECIFIED",
        "API_PROXY",
        "API_HUB_DEPLOYMENT",
      ]).describe("Required. Type of this resource.").optional(),
    })).describe(
      "Required. The array of resources. For Apigee, the proxies are resources.",
    ).optional(),
  }).describe(
    "Message for the array of resources. For Apigee, the proxies are resources.",
  ).optional(),
  includeAllResources: z.object({}).describe(
    "Message for include_all_resources option.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the security monitoring condition resource. Format: organizations/{org}/securityMonitoringConditions/{security_monitoring_condition}",
  ).optional(),
  profile: z.string().describe(
    "Required. ID of security profile of the security monitoring condition.",
  ).optional(),
  riskAssessmentType: z.enum([
    "RISK_ASSESSMENT_TYPE_UNSPECIFIED",
    "APIGEE",
    "API_HUB",
  ]).describe(
    "Optional. The risk assessment type of the security monitoring condition. Defaults to ADVANCED_API_SECURITY.",
  ).optional(),
  scope: z.string().describe(
    "Optional. Scope of the security monitoring condition. When RiskAssessmentType is APIGEE, the scope should be set to the environment of the resources. When RiskAssessmentType is API_HUB, the scope should not be set.",
  ).optional(),
  securityMonitoringConditionId: z.string().describe(
    "Optional. Optional: The security monitoring condition id. If not specified, a monitoring condition uuid will be generated by the backend. This value should be 4-63 characters, and valid characters are /a-z-/.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  apiHubGateway: z.string().optional(),
  createTime: z.string().optional(),
  include: z.object({
    resources: z.array(z.object({
      name: z.string(),
      type: z.string(),
    })),
  }).optional(),
  includeAllResources: z.object({}).optional(),
  name: z.string(),
  profile: z.string().optional(),
  riskAssessmentType: z.string().optional(),
  scope: z.string().optional(),
  totalDeployedResources: z.number().optional(),
  totalMonitoredResources: z.number().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  apiHubGateway: z.string().describe(
    "Optional. The API Hub gateway monitored by the security monitoring condition. This should only be set if risk_assessment_type is API_HUB. Format: `projects/{project}/locations/{location}/plugins/{plugin}/instances/{instance}`",
  ).optional(),
  include: z.object({
    resources: z.array(z.object({
      name: z.string().describe(
        "Required. Name of this resource. For an Apigee API Proxy, this should be the id of the API proxy. For an API Hub Deployment, this should be the id of the deployment.",
      ).optional(),
      type: z.enum([
        "RESOURCE_TYPE_UNSPECIFIED",
        "API_PROXY",
        "API_HUB_DEPLOYMENT",
      ]).describe("Required. Type of this resource.").optional(),
    })).describe(
      "Required. The array of resources. For Apigee, the proxies are resources.",
    ).optional(),
  }).describe(
    "Message for the array of resources. For Apigee, the proxies are resources.",
  ).optional(),
  includeAllResources: z.object({}).describe(
    "Message for include_all_resources option.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the security monitoring condition resource. Format: organizations/{org}/securityMonitoringConditions/{security_monitoring_condition}",
  ).optional(),
  profile: z.string().describe(
    "Required. ID of security profile of the security monitoring condition.",
  ).optional(),
  riskAssessmentType: z.enum([
    "RISK_ASSESSMENT_TYPE_UNSPECIFIED",
    "APIGEE",
    "API_HUB",
  ]).describe(
    "Optional. The risk assessment type of the security monitoring condition. Defaults to ADVANCED_API_SECURITY.",
  ).optional(),
  scope: z.string().describe(
    "Optional. Scope of the security monitoring condition. When RiskAssessmentType is APIGEE, the scope should be set to the environment of the resources. When RiskAssessmentType is API_HUB, the scope should not be set.",
  ).optional(),
  securityMonitoringConditionId: z.string().describe(
    "Optional. Optional: The security monitoring condition id. If not specified, a monitoring condition uuid will be generated by the backend. This value should be 4-63 characters, and valid characters are /a-z-/.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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

/** Swamp extension model for Google Cloud Apigee SecurityMonitoringConditions. Registered at `@swamp/gcp/apigee/securitymonitoringconditions`. */
export const model = {
  type: "@swamp/gcp/apigee/securitymonitoringconditions",
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
        "Security monitoring condition for risk assessment version 2.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a securityMonitoringConditions",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["apiHubGateway"] !== undefined) {
          body["apiHubGateway"] = g["apiHubGateway"];
        }
        if (g["include"] !== undefined) body["include"] = g["include"];
        if (g["includeAllResources"] !== undefined) {
          body["includeAllResources"] = g["includeAllResources"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["profile"] !== undefined) body["profile"] = g["profile"];
        if (g["riskAssessmentType"] !== undefined) {
          body["riskAssessmentType"] = g["riskAssessmentType"];
        }
        if (g["scope"] !== undefined) body["scope"] = g["scope"];
        if (g["securityMonitoringConditionId"] !== undefined) {
          body["securityMonitoringConditionId"] =
            g["securityMonitoringConditionId"];
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
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
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
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
      description: "Get a securityMonitoringConditions",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the securityMonitoringConditions",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Update securityMonitoringConditions attributes",
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
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["apiHubGateway"] !== undefined) {
          body["apiHubGateway"] = g["apiHubGateway"];
        }
        if (g["include"] !== undefined) body["include"] = g["include"];
        if (g["includeAllResources"] !== undefined) {
          body["includeAllResources"] = g["includeAllResources"];
        }
        if (g["profile"] !== undefined) body["profile"] = g["profile"];
        if (g["riskAssessmentType"] !== undefined) {
          body["riskAssessmentType"] = g["riskAssessmentType"];
        }
        if (g["scope"] !== undefined) body["scope"] = g["scope"];
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
      description: "Delete the securityMonitoringConditions",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the securityMonitoringConditions",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Sync securityMonitoringConditions state from GCP",
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
            String(g["parent"] ?? ""),
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
      description: "List securityMonitoringConditions resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Filter for the monitoring conditions. When RiskAssessmentType is APIGEE, monitoring conditions can be filtered by profile and scope. For example: `profile=profile1 AND scope=env1` When RiskAssessmentType is API_HUB, monitoring conditions can be filtered by profile and api_hub_gateway. For example: `profile=profile1 AND api_hub_gateway=gateway1`",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of monitoring conditions to return.",
        ).optional(),
        riskAssessmentType: z.string().describe(
          "Optional. The risk assessment type of the security monitoring condition. Defaults to ADVANCED_API_SECURITY.",
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["riskAssessmentType"] !== undefined) {
          params["riskAssessmentType"] = String(args["riskAssessmentType"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "securityMonitoringConditions",
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
