// Auto-generated extension model for @swamp/gcp/androidenterprise/enterprises
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play EMM Enterprises.
 *
 * An Enterprises resource represents the binding between an EMM and a specific organization. That binding can be instantiated in one of two different ways using this API as follows: - For Google managed domain customers, the process involves using Enterprises.enroll and Enterprises.setAccount (in conjunction with artifacts obtained from the Admin console and the Google API Console) and submitted to the EMM through a more-or-less manual process. - For managed Google Play Accounts customers, the process involves using Enterprises.generateSignupUrl and Enterprises.completeSignup in conjunction with the managed Google Play sign-up UI (Google-provided mechanism) to create the binding without manual steps. As an EMM, you can support either or both approaches in your EMM console. See Create an Enterprise for details.
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

const BASE_URL = "https://androidenterprise.googleapis.com/";

const GET_CONFIG = {
  "id": "androidenterprise.enterprises.get",
  "path": "androidenterprise/v1/enterprises/{enterpriseId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "enterpriseId",
  ],
  "parameters": {
    "enterpriseId": {
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
  administrator: z.array(z.object({
    email: z.string(),
  })).optional(),
  enterpriseType: z.string().optional(),
  googleAuthenticationSettings: z.object({
    dedicatedDevicesAllowed: z.string(),
    googleAuthenticationRequired: z.string(),
  }).optional(),
  id: z.string().optional(),
  managedGoogleDomainType: z.string().optional(),
  name: z.string(),
  primaryDomain: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Google Play EMM Enterprises. Registered at `@swamp/gcp/androidenterprise/enterprises`. */
export const model = {
  type: "@swamp/gcp/androidenterprise/enterprises",
  version: "2026.05.21.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An Enterprises resource represents the binding between an EMM and a specific ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a enterprises",
      arguments: z.object({
        identifier: z.string().describe("The name of the enterprises"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["enterpriseId"] = args.identifier;
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
      description: "Sync enterprises state from GCP",
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
          params["enterpriseId"] = identifier;
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
    acknowledge_notification_set: {
      description: "acknowledge notification set",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidenterprise.enterprises.acknowledgeNotificationSet",
            "path":
              "androidenterprise/v1/enterprises/acknowledgeNotificationSet",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": { "notificationSetId": { "location": "query" } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    complete_signup: {
      description: "complete signup",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidenterprise.enterprises.completeSignup",
            "path": "androidenterprise/v1/enterprises/completeSignup",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {
              "completionToken": { "location": "query" },
              "enterpriseToken": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    create_web_token: {
      description: "create web token",
      arguments: z.object({
        managedConfigurations: z.any().optional(),
        parent: z.any().optional(),
        permission: z.any().optional(),
        playSearch: z.any().optional(),
        privateApps: z.any().optional(),
        storeBuilder: z.any().optional(),
        webApps: z.any().optional(),
        zeroTouch: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        params["enterpriseId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["managedConfigurations"] !== undefined) {
          body["managedConfigurations"] = args["managedConfigurations"];
        }
        if (args["parent"] !== undefined) body["parent"] = args["parent"];
        if (args["permission"] !== undefined) {
          body["permission"] = args["permission"];
        }
        if (args["playSearch"] !== undefined) {
          body["playSearch"] = args["playSearch"];
        }
        if (args["privateApps"] !== undefined) {
          body["privateApps"] = args["privateApps"];
        }
        if (args["storeBuilder"] !== undefined) {
          body["storeBuilder"] = args["storeBuilder"];
        }
        if (args["webApps"] !== undefined) body["webApps"] = args["webApps"];
        if (args["zeroTouch"] !== undefined) {
          body["zeroTouch"] = args["zeroTouch"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidenterprise.enterprises.createWebToken",
            "path":
              "androidenterprise/v1/enterprises/{enterpriseId}/createWebToken",
            "httpMethod": "POST",
            "parameterOrder": ["enterpriseId"],
            "parameters": {
              "enterpriseId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    enroll: {
      description: "enroll",
      arguments: z.object({
        administrator: z.any().optional(),
        enterpriseType: z.any().optional(),
        googleAuthenticationSettings: z.any().optional(),
        id: z.any().optional(),
        managedGoogleDomainType: z.any().optional(),
        name: z.any().optional(),
        primaryDomain: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        params["token"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["administrator"] !== undefined) {
          body["administrator"] = args["administrator"];
        }
        if (args["enterpriseType"] !== undefined) {
          body["enterpriseType"] = args["enterpriseType"];
        }
        if (args["googleAuthenticationSettings"] !== undefined) {
          body["googleAuthenticationSettings"] =
            args["googleAuthenticationSettings"];
        }
        if (args["id"] !== undefined) body["id"] = args["id"];
        if (args["managedGoogleDomainType"] !== undefined) {
          body["managedGoogleDomainType"] = args["managedGoogleDomainType"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["primaryDomain"] !== undefined) {
          body["primaryDomain"] = args["primaryDomain"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidenterprise.enterprises.enroll",
            "path": "androidenterprise/v1/enterprises/enroll",
            "httpMethod": "POST",
            "parameterOrder": ["token"],
            "parameters": {
              "token": { "location": "query", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    generate_enterprise_upgrade_url: {
      description: "generate enterprise upgrade url",
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
        params["enterpriseId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidenterprise.enterprises.generateEnterpriseUpgradeUrl",
            "path":
              "androidenterprise/v1/enterprises/{enterpriseId}/generateEnterpriseUpgradeUrl",
            "httpMethod": "POST",
            "parameterOrder": ["enterpriseId"],
            "parameters": {
              "adminEmail": { "location": "query" },
              "allowedDomains": { "location": "query" },
              "enterpriseId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    generate_signup_url: {
      description: "generate signup url",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidenterprise.enterprises.generateSignupUrl",
            "path": "androidenterprise/v1/enterprises/signupUrl",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {
              "adminEmail": { "location": "query" },
              "allowedDomains": { "location": "query" },
              "callbackUrl": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_service_account: {
      description: "get service account",
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
        params["enterpriseId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidenterprise.enterprises.getServiceAccount",
            "path":
              "androidenterprise/v1/enterprises/{enterpriseId}/serviceAccount",
            "httpMethod": "GET",
            "parameterOrder": ["enterpriseId"],
            "parameters": {
              "enterpriseId": { "location": "path", "required": true },
              "keyType": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_store_layout: {
      description: "get store layout",
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
        params["enterpriseId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidenterprise.enterprises.getStoreLayout",
            "path":
              "androidenterprise/v1/enterprises/{enterpriseId}/storeLayout",
            "httpMethod": "GET",
            "parameterOrder": ["enterpriseId"],
            "parameters": {
              "enterpriseId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    pull_notification_set: {
      description: "pull notification set",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidenterprise.enterprises.pullNotificationSet",
            "path": "androidenterprise/v1/enterprises/pullNotificationSet",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": { "requestMode": { "location": "query" } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    send_test_push_notification: {
      description: "send test push notification",
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
        params["enterpriseId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidenterprise.enterprises.sendTestPushNotification",
            "path":
              "androidenterprise/v1/enterprises/{enterpriseId}/sendTestPushNotification",
            "httpMethod": "POST",
            "parameterOrder": ["enterpriseId"],
            "parameters": {
              "enterpriseId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    set_account: {
      description: "set account",
      arguments: z.object({
        accountEmail: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        params["enterpriseId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["accountEmail"] !== undefined) {
          body["accountEmail"] = args["accountEmail"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidenterprise.enterprises.setAccount",
            "path": "androidenterprise/v1/enterprises/{enterpriseId}/account",
            "httpMethod": "PUT",
            "parameterOrder": ["enterpriseId"],
            "parameters": {
              "enterpriseId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_store_layout: {
      description: "set store layout",
      arguments: z.object({
        homepageId: z.any().optional(),
        storeLayoutType: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        params["enterpriseId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["homepageId"] !== undefined) {
          body["homepageId"] = args["homepageId"];
        }
        if (args["storeLayoutType"] !== undefined) {
          body["storeLayoutType"] = args["storeLayoutType"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidenterprise.enterprises.setStoreLayout",
            "path":
              "androidenterprise/v1/enterprises/{enterpriseId}/storeLayout",
            "httpMethod": "PUT",
            "parameterOrder": ["enterpriseId"],
            "parameters": {
              "enterpriseId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    unenroll: {
      description: "unenroll",
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
        params["enterpriseId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidenterprise.enterprises.unenroll",
            "path": "androidenterprise/v1/enterprises/{enterpriseId}/unenroll",
            "httpMethod": "POST",
            "parameterOrder": ["enterpriseId"],
            "parameters": {
              "enterpriseId": { "location": "path", "required": true },
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
