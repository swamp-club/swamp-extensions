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

// Auto-generated extension model for @swamp/gcp/firebaseappcheck/apps-playintegrityconfig
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Firebase App Check Apps.PlayIntegrityConfig.
 *
 * An app's Play Integrity configuration object. This configuration controls certain properties of the `AppCheckToken` returned by ExchangePlayIntegrityToken, such as its ttl. Note that your registered SHA-256 certificate fingerprints are used to validate tokens issued by the Play Integrity API; please register them via the Firebase Console or programmatically via the [Firebase Management Service](https://firebase.google.com/docs/projects/api/reference/rest/v1beta1/projects.androidApps.sha/create).
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
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://firebaseappcheck.googleapis.com/";

const GET_CONFIG = {
  "id": "firebaseappcheck.projects.apps.playIntegrityConfig.get",
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
  "id": "firebaseappcheck.projects.apps.playIntegrityConfig.patch",
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  accountDetails: z.object({
    requireLicensed: z.boolean().describe(
      "Specifies whether the caller must have received the [`LICENSED` verdict](https://developer.android.com/google/play/integrity/verdicts#account-details-field). For additional details about scenarios where your users will receive this `LICENSED` label, see [the default responses table](https://developer.android.com/google/play/integrity/setup#default). If set to `true`, apps without the `LICENSED` app licensing verdict will be rejected. If set to `false`, any app licensing verdict is allowed. The default value is `false`.",
    ).optional(),
  }).describe(
    "A settings object specifying account requirements for Android devices running your app. These settings correspond to requirements on the [**account details** field](https://developer.android.com/google/play/integrity/verdicts#account-details-field) obtained from the Play Integrity API. See the [default responses table](https://developer.android.com/google/play/integrity/setup#default) for a quick summary. The default values for these settings work for most apps, and are recommended.",
  ).optional(),
  appIntegrity: z.object({
    allowUnrecognizedVersion: z.boolean().describe(
      "Specifies whether your running app is allowed to have the `UNRECOGNIZED_VERSION` [app recognition verdict](https://developer.android.com/google/play/integrity/verdicts#application-integrity-field). Note that the app recognition verdict `PLAY_RECOGNIZED` is a strong, comprehensive integrity signal that takes into account various other signals, including conditional and optional device integrity responses that you have opted into. If your app is published off-Play, this field should be set to `true` to allow instances of your app installed from off-Play sources to function. If set to `false`, only `PLAY_RECOGNIZED` verdicts are allowed, and both `UNRECOGNIZED_VERSION` and `UNEVALUATED` will be rejected. If set to `true`, any app recognition verdict is allowed. The default value is `false`.",
    ).optional(),
  }).describe(
    "A settings object specifying application integrity requirements for Android devices running your app. These settings correspond to requirements on the [**application integrity** field](https://developer.android.com/google/play/integrity/verdicts#application-integrity-field) obtained from the Play Integrity API. See the [default responses table](https://developer.android.com/google/play/integrity/setup#default) for a quick summary. The default values for these settings work for most apps, and are recommended.",
  ).optional(),
  deviceIntegrity: z.object({
    minDeviceRecognitionLevel: z.enum([
      "DEVICE_RECOGNITION_LEVEL_UNSPECIFIED",
      "NO_INTEGRITY",
      "MEETS_BASIC_INTEGRITY",
      "MEETS_DEVICE_INTEGRITY",
      "MEETS_STRONG_INTEGRITY",
    ]).describe(
      "Specifies the minimum device integrity level in order for the device to be considered valid. Any device with a device recognition verdict lower than this level will be rejected. If this is unspecified, the default level is `NO_INTEGRITY`.",
    ).optional(),
  }).describe(
    "A settings object specifying device integrity requirements for Android devices running your app. These settings correspond to requirements on the [**device integrity** field](https://developer.android.com/google/play/integrity/verdicts#device-integrity-field) obtained from the Play Integrity API. See the [default responses table](https://developer.android.com/google/play/integrity/setup#default) for a quick summary. Warning: There are also [conditional](https://developer.android.com/google/play/integrity/setup#conditional) as well as [optional](https://developer.android.com/google/play/integrity/setup#optional_device_information) responses that you can receive, but requires additional explicit opt-in from you. The App Check API is **not** responsible for any such opt-ins. The default values for these settings work for most apps, and are recommended.",
  ).optional(),
  name: z.string().describe(
    "Required. The relative resource name of the Play Integrity configuration object, in the format: ` projects/{project_number}/apps/{app_id}/playIntegrityConfig `",
  ).optional(),
  tokenTtl: z.string().describe(
    "Specifies the duration for which App Check tokens exchanged from Play Integrity tokens will be valid. If unset, a default value of 1 hour is assumed. Must be between 30 minutes and 7 days, inclusive.",
  ).optional(),
});

const StateSchema = z.object({
  accountDetails: z.object({
    requireLicensed: z.boolean(),
  }).optional(),
  appIntegrity: z.object({
    allowUnrecognizedVersion: z.boolean(),
  }).optional(),
  deviceIntegrity: z.object({
    minDeviceRecognitionLevel: z.string(),
  }).optional(),
  name: z.string(),
  tokenTtl: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  accountDetails: z.object({
    requireLicensed: z.boolean().describe(
      "Specifies whether the caller must have received the [`LICENSED` verdict](https://developer.android.com/google/play/integrity/verdicts#account-details-field). For additional details about scenarios where your users will receive this `LICENSED` label, see [the default responses table](https://developer.android.com/google/play/integrity/setup#default). If set to `true`, apps without the `LICENSED` app licensing verdict will be rejected. If set to `false`, any app licensing verdict is allowed. The default value is `false`.",
    ).optional(),
  }).describe(
    "A settings object specifying account requirements for Android devices running your app. These settings correspond to requirements on the [**account details** field](https://developer.android.com/google/play/integrity/verdicts#account-details-field) obtained from the Play Integrity API. See the [default responses table](https://developer.android.com/google/play/integrity/setup#default) for a quick summary. The default values for these settings work for most apps, and are recommended.",
  ).optional(),
  appIntegrity: z.object({
    allowUnrecognizedVersion: z.boolean().describe(
      "Specifies whether your running app is allowed to have the `UNRECOGNIZED_VERSION` [app recognition verdict](https://developer.android.com/google/play/integrity/verdicts#application-integrity-field). Note that the app recognition verdict `PLAY_RECOGNIZED` is a strong, comprehensive integrity signal that takes into account various other signals, including conditional and optional device integrity responses that you have opted into. If your app is published off-Play, this field should be set to `true` to allow instances of your app installed from off-Play sources to function. If set to `false`, only `PLAY_RECOGNIZED` verdicts are allowed, and both `UNRECOGNIZED_VERSION` and `UNEVALUATED` will be rejected. If set to `true`, any app recognition verdict is allowed. The default value is `false`.",
    ).optional(),
  }).describe(
    "A settings object specifying application integrity requirements for Android devices running your app. These settings correspond to requirements on the [**application integrity** field](https://developer.android.com/google/play/integrity/verdicts#application-integrity-field) obtained from the Play Integrity API. See the [default responses table](https://developer.android.com/google/play/integrity/setup#default) for a quick summary. The default values for these settings work for most apps, and are recommended.",
  ).optional(),
  deviceIntegrity: z.object({
    minDeviceRecognitionLevel: z.enum([
      "DEVICE_RECOGNITION_LEVEL_UNSPECIFIED",
      "NO_INTEGRITY",
      "MEETS_BASIC_INTEGRITY",
      "MEETS_DEVICE_INTEGRITY",
      "MEETS_STRONG_INTEGRITY",
    ]).describe(
      "Specifies the minimum device integrity level in order for the device to be considered valid. Any device with a device recognition verdict lower than this level will be rejected. If this is unspecified, the default level is `NO_INTEGRITY`.",
    ).optional(),
  }).describe(
    "A settings object specifying device integrity requirements for Android devices running your app. These settings correspond to requirements on the [**device integrity** field](https://developer.android.com/google/play/integrity/verdicts#device-integrity-field) obtained from the Play Integrity API. See the [default responses table](https://developer.android.com/google/play/integrity/setup#default) for a quick summary. Warning: There are also [conditional](https://developer.android.com/google/play/integrity/setup#conditional) as well as [optional](https://developer.android.com/google/play/integrity/setup#optional_device_information) responses that you can receive, but requires additional explicit opt-in from you. The App Check API is **not** responsible for any such opt-ins. The default values for these settings work for most apps, and are recommended.",
  ).optional(),
  name: z.string().describe(
    "Required. The relative resource name of the Play Integrity configuration object, in the format: ` projects/{project_number}/apps/{app_id}/playIntegrityConfig `",
  ).optional(),
  tokenTtl: z.string().describe(
    "Specifies the duration for which App Check tokens exchanged from Play Integrity tokens will be valid. If unset, a default value of 1 hour is assumed. Must be between 30 minutes and 7 days, inclusive.",
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

/** Swamp extension model for Google Cloud Firebase App Check Apps.PlayIntegrityConfig. Registered at `@swamp/gcp/firebaseappcheck/apps-playintegrityconfig`. */
export const model = {
  type: "@swamp/gcp/firebaseappcheck/apps-playintegrityconfig",
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
      description:
        "An app's Play Integrity configuration object. This configuration controls cer...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a playIntegrityConfig",
      arguments: z.object({
        identifier: z.string().describe("The name of the playIntegrityConfig"),
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
      description: "Update playIntegrityConfig attributes",
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
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["accountDetails"] !== undefined) {
          body["accountDetails"] = g["accountDetails"];
        }
        if (g["appIntegrity"] !== undefined) {
          body["appIntegrity"] = g["appIntegrity"];
        }
        if (g["deviceIntegrity"] !== undefined) {
          body["deviceIntegrity"] = g["deviceIntegrity"];
        }
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
    sync: {
      description: "Sync playIntegrityConfig state from GCP",
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
    batch_get: {
      description: "batch get",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const result = await createResource(
          BASE_URL,
          {
            "id": "firebaseappcheck.projects.apps.playIntegrityConfig.batchGet",
            "path": "v1/{+parent}/apps/-/playIntegrityConfig:batchGet",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "names": { "location": "query" },
              "parent": { "location": "path", "required": true },
            },
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
