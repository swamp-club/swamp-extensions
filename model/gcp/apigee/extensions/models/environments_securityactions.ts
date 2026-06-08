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

// Auto-generated extension model for @swamp/gcp/apigee/environments-securityactions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Apigee Environments.SecurityActions.
 *
 * A SecurityAction is rule that can be enforced at an environment level. The result is one of: - A denied API call - An explicitly allowed API call - A flagged API call (HTTP headers added before the target receives it) At least one condition is required to create a SecurityAction.
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
  return `${parent}/securityActions/${shortName}`;
}

const BASE_URL = "https://apigee.googleapis.com/";

const GET_CONFIG = {
  "id": "apigee.organizations.environments.securityActions.get",
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
  "id": "apigee.organizations.environments.securityActions.create",
  "path": "v1/{+parent}/securityActions",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "securityActionId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "apigee.organizations.environments.securityActions.patch",
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
  "id": "apigee.organizations.environments.securityActions.delete",
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
  "id": "apigee.organizations.environments.securityActions.list",
  "path": "v1/{+parent}/securityActions",
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
  allow: z.object({}).describe(
    "Message that should be set in case of an Allow Action. This does not have any fields.",
  ).optional(),
  apiProxies: z.array(z.string()).describe(
    "Optional. If unset, this would apply to all proxies in the environment. If set, this action is enforced only if at least one proxy in the repeated list is deployed at the time of enforcement. If set, several restrictions are enforced on SecurityActions. There can be at most 100 enabled actions with proxies set in an env. Several other restrictions apply on conditions and are detailed later.",
  ).optional(),
  conditionConfig: z.object({
    accessTokens: z.array(z.string()).describe(
      "Optional. A list of access_tokens. Limit 1000 per action.",
    ).optional(),
    apiKeys: z.array(z.string()).describe(
      "Optional. A list of API keys. Limit 1000 per action.",
    ).optional(),
    apiProducts: z.array(z.string()).describe(
      "Optional. A list of API Products. Limit 1000 per action.",
    ).optional(),
    asns: z.array(z.string()).describe(
      "Optional. A list of ASN numbers to act on, e.g. 23. https://en.wikipedia.org/wiki/Autonomous_system_(Internet) This uses int64 instead of uint32 because of https://linter.aip.dev/141/forbidden-types.",
    ).optional(),
    botReasons: z.array(z.string()).describe(
      "Optional. A list of Bot Reasons. Current options: Flooder, Brute Guessor, Static Content Scraper, OAuth Abuser, Robot Abuser, TorListRule, Advanced Anomaly Detection, Advanced API Scraper, Search Engine Crawlers, Public Clouds, Public Cloud AWS, Public Cloud Azure, and Public Cloud Google.",
    ).optional(),
    developerApps: z.array(z.string()).describe(
      "Optional. A list of developer apps. Limit 1000 per action.",
    ).optional(),
    developers: z.array(z.string()).describe(
      "Optional. A list of developers. Limit 1000 per action.",
    ).optional(),
    httpMethods: z.array(z.string()).describe(
      "Optional. Act only on particular HTTP methods. E.g. A read-only API can block POST/PUT/DELETE methods. Accepted values are: GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE and PATCH.",
    ).optional(),
    ipAddressRanges: z.array(z.string()).describe(
      "Optional. A list of IP addresses. This could be either IPv4 or IPv6. Limited to 100 per action.",
    ).optional(),
    regionCodes: z.array(z.string()).describe(
      "Optional. A list of countries/region codes to act on, e.g. US. This follows https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2.",
    ).optional(),
    userAgents: z.array(z.string()).describe(
      "Optional. A list of user agents to deny. We look for exact matches. Limit 50 per action.",
    ).optional(),
  }).describe(
    'The following are a list of conditions. A valid SecurityAction must contain at least one condition. Within a condition, each element is ORed. Across conditions elements are ANDed. For example if a SecurityAction has the following: ip_address_ranges: ["ip1", "ip2"] and bot_reasons: ["Flooder", "Robot Abuser"] then this is interpreted as: enforce the action if the incoming request has ((ip_address_ranges = "ip1" OR ip_address_ranges = "ip2") AND (bot_reasons="Flooder" OR bot_reasons="Robot Abuser")). Conditions other than ip_address_ranges and bot_reasons cannot be ANDed.',
  ).optional(),
  deny: z.object({
    responseCode: z.number().int().describe(
      "Optional. The HTTP response code if the Action = DENY.",
    ).optional(),
  }).describe("Message that should be set in case of a Deny Action.")
    .optional(),
  description: z.string().describe(
    "Optional. An optional user provided description of the SecurityAction.",
  ).optional(),
  expireTime: z.string().describe("The expiration for this SecurityAction.")
    .optional(),
  flag: z.object({
    headers: z.array(z.object({
      name: z.string().describe("The header name to be sent to the target.")
        .optional(),
      value: z.string().describe("The header value to be sent to the target.")
        .optional(),
    })).describe(
      "Optional. A list of HTTP headers to be sent to the target in case of a FLAG SecurityAction. Limit 5 headers per SecurityAction. At least one is mandatory.",
    ).optional(),
  }).describe("The message that should be set in the case of a Flag action.")
    .optional(),
  name: z.string().describe(
    "Immutable. This field is ignored during creation as per AIP-133. Please set the `security_action_id` field in the CreateSecurityActionRequest when creating a new SecurityAction. Format: organizations/{org}/environments/{env}/securityActions/{security_action}",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "ENABLED", "DISABLED"]).describe(
    "Required. Only an ENABLED SecurityAction is enforced. An ENABLED SecurityAction past its expiration time will not be enforced.",
  ).optional(),
  ttl: z.string().describe("Input only. The TTL for this SecurityAction.")
    .optional(),
  securityActionId: z.string().describe(
    "Required. The ID to use for the SecurityAction, which will become the final component of the action's resource name. This value should be 0-61 characters, and valid format is (^[a-z]([a-z0-9-]{​0,61}[a-z0-9])?$).",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  allow: z.object({}).optional(),
  apiProxies: z.array(z.string()).optional(),
  conditionConfig: z.object({
    accessTokens: z.array(z.string()),
    apiKeys: z.array(z.string()),
    apiProducts: z.array(z.string()),
    asns: z.array(z.string()),
    botReasons: z.array(z.string()),
    developerApps: z.array(z.string()),
    developers: z.array(z.string()),
    httpMethods: z.array(z.string()),
    ipAddressRanges: z.array(z.string()),
    regionCodes: z.array(z.string()),
    userAgents: z.array(z.string()),
  }).optional(),
  createTime: z.string().optional(),
  deny: z.object({
    responseCode: z.number(),
  }).optional(),
  description: z.string().optional(),
  expireTime: z.string().optional(),
  flag: z.object({
    headers: z.array(z.object({
      name: z.string(),
      value: z.string(),
    })),
  }).optional(),
  name: z.string(),
  state: z.string().optional(),
  ttl: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  allow: z.object({}).describe(
    "Message that should be set in case of an Allow Action. This does not have any fields.",
  ).optional(),
  apiProxies: z.array(z.string()).describe(
    "Optional. If unset, this would apply to all proxies in the environment. If set, this action is enforced only if at least one proxy in the repeated list is deployed at the time of enforcement. If set, several restrictions are enforced on SecurityActions. There can be at most 100 enabled actions with proxies set in an env. Several other restrictions apply on conditions and are detailed later.",
  ).optional(),
  conditionConfig: z.object({
    accessTokens: z.array(z.string()).describe(
      "Optional. A list of access_tokens. Limit 1000 per action.",
    ).optional(),
    apiKeys: z.array(z.string()).describe(
      "Optional. A list of API keys. Limit 1000 per action.",
    ).optional(),
    apiProducts: z.array(z.string()).describe(
      "Optional. A list of API Products. Limit 1000 per action.",
    ).optional(),
    asns: z.array(z.string()).describe(
      "Optional. A list of ASN numbers to act on, e.g. 23. https://en.wikipedia.org/wiki/Autonomous_system_(Internet) This uses int64 instead of uint32 because of https://linter.aip.dev/141/forbidden-types.",
    ).optional(),
    botReasons: z.array(z.string()).describe(
      "Optional. A list of Bot Reasons. Current options: Flooder, Brute Guessor, Static Content Scraper, OAuth Abuser, Robot Abuser, TorListRule, Advanced Anomaly Detection, Advanced API Scraper, Search Engine Crawlers, Public Clouds, Public Cloud AWS, Public Cloud Azure, and Public Cloud Google.",
    ).optional(),
    developerApps: z.array(z.string()).describe(
      "Optional. A list of developer apps. Limit 1000 per action.",
    ).optional(),
    developers: z.array(z.string()).describe(
      "Optional. A list of developers. Limit 1000 per action.",
    ).optional(),
    httpMethods: z.array(z.string()).describe(
      "Optional. Act only on particular HTTP methods. E.g. A read-only API can block POST/PUT/DELETE methods. Accepted values are: GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE and PATCH.",
    ).optional(),
    ipAddressRanges: z.array(z.string()).describe(
      "Optional. A list of IP addresses. This could be either IPv4 or IPv6. Limited to 100 per action.",
    ).optional(),
    regionCodes: z.array(z.string()).describe(
      "Optional. A list of countries/region codes to act on, e.g. US. This follows https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2.",
    ).optional(),
    userAgents: z.array(z.string()).describe(
      "Optional. A list of user agents to deny. We look for exact matches. Limit 50 per action.",
    ).optional(),
  }).describe(
    'The following are a list of conditions. A valid SecurityAction must contain at least one condition. Within a condition, each element is ORed. Across conditions elements are ANDed. For example if a SecurityAction has the following: ip_address_ranges: ["ip1", "ip2"] and bot_reasons: ["Flooder", "Robot Abuser"] then this is interpreted as: enforce the action if the incoming request has ((ip_address_ranges = "ip1" OR ip_address_ranges = "ip2") AND (bot_reasons="Flooder" OR bot_reasons="Robot Abuser")). Conditions other than ip_address_ranges and bot_reasons cannot be ANDed.',
  ).optional(),
  deny: z.object({
    responseCode: z.number().int().describe(
      "Optional. The HTTP response code if the Action = DENY.",
    ).optional(),
  }).describe("Message that should be set in case of a Deny Action.")
    .optional(),
  description: z.string().describe(
    "Optional. An optional user provided description of the SecurityAction.",
  ).optional(),
  expireTime: z.string().describe("The expiration for this SecurityAction.")
    .optional(),
  flag: z.object({
    headers: z.array(z.object({
      name: z.string().describe("The header name to be sent to the target.")
        .optional(),
      value: z.string().describe("The header value to be sent to the target.")
        .optional(),
    })).describe(
      "Optional. A list of HTTP headers to be sent to the target in case of a FLAG SecurityAction. Limit 5 headers per SecurityAction. At least one is mandatory.",
    ).optional(),
  }).describe("The message that should be set in the case of a Flag action.")
    .optional(),
  name: z.string().describe(
    "Immutable. This field is ignored during creation as per AIP-133. Please set the `security_action_id` field in the CreateSecurityActionRequest when creating a new SecurityAction. Format: organizations/{org}/environments/{env}/securityActions/{security_action}",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "ENABLED", "DISABLED"]).describe(
    "Required. Only an ENABLED SecurityAction is enforced. An ENABLED SecurityAction past its expiration time will not be enforced.",
  ).optional(),
  ttl: z.string().describe("Input only. The TTL for this SecurityAction.")
    .optional(),
  securityActionId: z.string().describe(
    "Required. The ID to use for the SecurityAction, which will become the final component of the action's resource name. This value should be 0-61 characters, and valid format is (^[a-z]([a-z0-9-]{​0,61}[a-z0-9])?$).",
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

/** Swamp extension model for Google Cloud Apigee Environments.SecurityActions. Registered at `@swamp/gcp/apigee/environments-securityactions`. */
export const model = {
  type: "@swamp/gcp/apigee/environments-securityactions",
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
        "A SecurityAction is rule that can be enforced at an environment level. The re...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a securityActions",
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["allow"] !== undefined) body["allow"] = g["allow"];
        if (g["apiProxies"] !== undefined) body["apiProxies"] = g["apiProxies"];
        if (g["conditionConfig"] !== undefined) {
          body["conditionConfig"] = g["conditionConfig"];
        }
        if (g["deny"] !== undefined) body["deny"] = g["deny"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["expireTime"] !== undefined) body["expireTime"] = g["expireTime"];
        if (g["flag"] !== undefined) body["flag"] = g["flag"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["ttl"] !== undefined) body["ttl"] = g["ttl"];
        if (g["securityActionId"] !== undefined) {
          body["securityActionId"] = g["securityActionId"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ENABLED"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Get a securityActions",
      arguments: z.object({
        identifier: z.string().describe("The name of the securityActions"),
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
      description: "Update securityActions attributes",
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
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["allow"] !== undefined) body["allow"] = g["allow"];
        if (g["apiProxies"] !== undefined) body["apiProxies"] = g["apiProxies"];
        if (g["conditionConfig"] !== undefined) {
          body["conditionConfig"] = g["conditionConfig"];
        }
        if (g["deny"] !== undefined) body["deny"] = g["deny"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["expireTime"] !== undefined) body["expireTime"] = g["expireTime"];
        if (g["flag"] !== undefined) body["flag"] = g["flag"];
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["ttl"] !== undefined) body["ttl"] = g["ttl"];
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
              "readyValues": ["ENABLED"],
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
      description: "Delete the securityActions",
      arguments: z.object({
        identifier: z.string().describe("The name of the securityActions"),
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
      description: "Sync securityActions state from GCP",
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
      description: "List securityActions resources",
      arguments: z.object({
        filter: z.string().describe(
          "The filter expression to filter List results. https://google.aip.dev/160. Allows for filtering over: state and api_proxies. E.g.: state = ACTIVE AND apiProxies:foo. Filtering by action is not supported https://github.com/aip-dev/google.aip.dev/issues/624",
        ).optional(),
        pageSize: z.number().describe(
          "The maximum number of SecurityActions to return. If unspecified, at most 50 SecurityActions will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
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
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "securityActions",
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
    disable: {
      description: "disable",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "apigee.organizations.environments.securityActions.disable",
            "path": "v1/{+name}:disable",
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
    enable: {
      description: "enable",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "apigee.organizations.environments.securityActions.enable",
            "path": "v1/{+name}:enable",
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
