// Auto-generated extension model for @swamp/gcp/firebaseappcheck/apps-recaptchaenterpriseconfig
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Firebase App Check Apps.RecaptchaEnterpriseConfig.
 *
 * An app's reCAPTCHA Enterprise configuration object. This configuration is used by ExchangeRecaptchaEnterpriseToken to validate reCAPTCHA tokens issued to apps by reCAPTCHA Enterprise. It also controls certain properties of the returned `AppCheckToken`, such as its ttl.
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

const BASE_URL = "https://firebaseappcheck.googleapis.com/";

const GET_CONFIG = {
  "id": "firebaseappcheck.projects.apps.recaptchaEnterpriseConfig.get",
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

const PATCH_CONFIG = {
  "id": "firebaseappcheck.projects.apps.recaptchaEnterpriseConfig.patch",
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Required. The relative resource name of the reCAPTCHA Enterprise configuration object, in the format: ` projects/{project_number}/apps/{app_id}/recaptchaEnterpriseConfig `",
  ).optional(),
  riskAnalysis: z.object({
    minValidScore: z.number().describe(
      "Specifies a minimum score required for a reCAPTCHA token to be considered valid. If its score is greater than or equal to this value, it will be accepted; otherwise, it will be rejected. The value must be between 0.0 and 1.0. The default value is 0.5.",
    ).optional(),
  }).describe(
    "A settings object specifying risk tolerance and requirements for your application. These settings correspond to requirements on the [**`riskAnalysis`**](https://cloud.google.com/recaptcha/docs/interpret-assessment-website#interpret_assessment) tuple in the assessment obtained from reCAPTCHA Enterprise. The default values for these settings work for most apps, and are recommended.",
  ).optional(),
  siteKey: z.string().describe(
    "The score-based site key [created in reCAPTCHA Enterprise](https://cloud.google.com/recaptcha-enterprise/docs/create-key#creating_a_site_key) used to [invoke reCAPTCHA and generate the reCAPTCHA tokens](https://cloud.google.com/recaptcha-enterprise/docs/instrument-web-pages) for your application. Important: This is *not* the `site_secret` (as it is in reCAPTCHA v3), but rather your score-based reCAPTCHA Enterprise site key.",
  ).optional(),
  tokenTtl: z.string().describe(
    "Specifies the duration for which App Check tokens exchanged from reCAPTCHA Enterprise tokens will be valid. If unset, a default value of 1 hour is assumed. Must be between 30 minutes and 7 days, inclusive.",
  ).optional(),
});

const StateSchema = z.object({
  name: z.string(),
  riskAnalysis: z.object({
    minValidScore: z.number(),
  }).optional(),
  siteKey: z.string().optional(),
  tokenTtl: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().describe(
    "Required. The relative resource name of the reCAPTCHA Enterprise configuration object, in the format: ` projects/{project_number}/apps/{app_id}/recaptchaEnterpriseConfig `",
  ).optional(),
  riskAnalysis: z.object({
    minValidScore: z.number().describe(
      "Specifies a minimum score required for a reCAPTCHA token to be considered valid. If its score is greater than or equal to this value, it will be accepted; otherwise, it will be rejected. The value must be between 0.0 and 1.0. The default value is 0.5.",
    ).optional(),
  }).describe(
    "A settings object specifying risk tolerance and requirements for your application. These settings correspond to requirements on the [**`riskAnalysis`**](https://cloud.google.com/recaptcha/docs/interpret-assessment-website#interpret_assessment) tuple in the assessment obtained from reCAPTCHA Enterprise. The default values for these settings work for most apps, and are recommended.",
  ).optional(),
  siteKey: z.string().describe(
    "The score-based site key [created in reCAPTCHA Enterprise](https://cloud.google.com/recaptcha-enterprise/docs/create-key#creating_a_site_key) used to [invoke reCAPTCHA and generate the reCAPTCHA tokens](https://cloud.google.com/recaptcha-enterprise/docs/instrument-web-pages) for your application. Important: This is *not* the `site_secret` (as it is in reCAPTCHA v3), but rather your score-based reCAPTCHA Enterprise site key.",
  ).optional(),
  tokenTtl: z.string().describe(
    "Specifies the duration for which App Check tokens exchanged from reCAPTCHA Enterprise tokens will be valid. If unset, a default value of 1 hour is assumed. Must be between 30 minutes and 7 days, inclusive.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Firebase App Check Apps.RecaptchaEnterpriseConfig. Registered at `@swamp/gcp/firebaseappcheck/apps-recaptchaenterpriseconfig`. */
export const model = {
  type: "@swamp/gcp/firebaseappcheck/apps-recaptchaenterpriseconfig",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An app's reCAPTCHA Enterprise configuration object. This configuration is use...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a recaptchaEnterpriseConfig",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the recaptchaEnterpriseConfig",
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
      description: "Update recaptchaEnterpriseConfig attributes",
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
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["riskAnalysis"] !== undefined) {
          body["riskAnalysis"] = g["riskAnalysis"];
        }
        if (g["siteKey"] !== undefined) body["siteKey"] = g["siteKey"];
        if (g["tokenTtl"] !== undefined) body["tokenTtl"] = g["tokenTtl"];
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
      description: "Sync recaptchaEnterpriseConfig state from GCP",
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
    batch_get: {
      description: "batch get",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "firebaseappcheck.projects.apps.recaptchaEnterpriseConfig.batchGet",
            "path": "v1/{+parent}/apps/-/recaptchaEnterpriseConfig:batchGet",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "names": { "location": "query" },
              "parent": { "location": "path", "required": true },
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
