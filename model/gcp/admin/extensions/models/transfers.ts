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

// Auto-generated extension model for @swamp/gcp/admin/transfers
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Admin SDK Transfers.
 *
 * A Transfer resource represents the transfer of the ownership of user data between users.
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
  listResources,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://admin.googleapis.com/";

const GET_CONFIG = {
  "id": "datatransfer.transfers.get",
  "path": "admin/datatransfer/v1/transfers/{dataTransferId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "dataTransferId",
  ],
  "parameters": {
    "dataTransferId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "datatransfer.transfers.insert",
  "path": "admin/datatransfer/v1/transfers",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const LIST_CONFIG = {
  "id": "datatransfer.transfers.list",
  "path": "admin/datatransfer/v1/transfers",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "customerId": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "newOwnerUserId": {
      "location": "query",
    },
    "oldOwnerUserId": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "status": {
      "location": "query",
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
  applicationDataTransfers: z.array(z.object({
    applicationId: z.string().describe("The application's ID.").optional(),
    applicationTransferParams: z.array(z.object({
      key: z.string().describe(
        "The type of the transfer parameter, such as `PRIVACY_LEVEL`.",
      ).optional(),
      value: z.array(z.unknown()).describe(
        "The value of the transfer parameter, such as `PRIVATE` or `SHARED`.",
      ).optional(),
    })).describe(
      "The transfer parameters for the application. These parameters are used to select the data which will get transferred in context of this application. For more information about the specific values available for each application, see the [Transfer parameters](https://developers.google.com/workspace/admin/data-transfer/v1/parameters) reference.",
    ).optional(),
    applicationTransferStatus: z.string().describe(
      "Read-only. Current status of transfer for this application.",
    ).optional(),
  })).describe(
    "The list of per-application data transfer resources. It contains details of the applications associated with this transfer resource, and also specifies the applications for which data transfer has to be done at the time of the transfer resource creation.",
  ).optional(),
  id: z.string().describe("Read-only. The transfer's ID.").optional(),
  newOwnerUserId: z.string().describe(
    "ID of the user to whom the data is being transferred.",
  ).optional(),
  oldOwnerUserId: z.string().describe(
    "ID of the user whose data is being transferred.",
  ).optional(),
  overallTransferStatusCode: z.string().describe(
    "Read-only. Overall transfer status.",
  ).optional(),
  requestTime: z.string().describe(
    "Read-only. The time at which the data transfer was requested.",
  ).optional(),
});

const StateSchema = z.object({
  applicationDataTransfers: z.array(z.object({
    applicationId: z.string(),
    applicationTransferParams: z.array(z.object({
      key: z.string(),
      value: z.array(z.unknown()),
    })),
    applicationTransferStatus: z.string(),
  })).optional(),
  etag: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  newOwnerUserId: z.string().optional(),
  oldOwnerUserId: z.string().optional(),
  overallTransferStatusCode: z.string().optional(),
  requestTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  applicationDataTransfers: z.array(z.object({
    applicationId: z.string().describe("The application's ID.").optional(),
    applicationTransferParams: z.array(z.object({
      key: z.string().describe(
        "The type of the transfer parameter, such as `PRIVACY_LEVEL`.",
      ).optional(),
      value: z.array(z.unknown()).describe(
        "The value of the transfer parameter, such as `PRIVATE` or `SHARED`.",
      ).optional(),
    })).describe(
      "The transfer parameters for the application. These parameters are used to select the data which will get transferred in context of this application. For more information about the specific values available for each application, see the [Transfer parameters](https://developers.google.com/workspace/admin/data-transfer/v1/parameters) reference.",
    ).optional(),
    applicationTransferStatus: z.string().describe(
      "Read-only. Current status of transfer for this application.",
    ).optional(),
  })).describe(
    "The list of per-application data transfer resources. It contains details of the applications associated with this transfer resource, and also specifies the applications for which data transfer has to be done at the time of the transfer resource creation.",
  ).optional(),
  id: z.string().describe("Read-only. The transfer's ID.").optional(),
  newOwnerUserId: z.string().describe(
    "ID of the user to whom the data is being transferred.",
  ).optional(),
  oldOwnerUserId: z.string().describe(
    "ID of the user whose data is being transferred.",
  ).optional(),
  overallTransferStatusCode: z.string().describe(
    "Read-only. Overall transfer status.",
  ).optional(),
  requestTime: z.string().describe(
    "Read-only. The time at which the data transfer was requested.",
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

/** Swamp extension model for Google Cloud Admin SDK Transfers. Registered at `@swamp/gcp/admin/transfers`. */
export const model = {
  type: "@swamp/gcp/admin/transfers",
  version: "2026.06.08.1",
  upgrades: [
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
        "A Transfer resource represents the transfer of the ownership of user data bet...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a transfers",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["applicationDataTransfers"] !== undefined) {
          body["applicationDataTransfers"] = g["applicationDataTransfers"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["newOwnerUserId"] !== undefined) {
          body["newOwnerUserId"] = g["newOwnerUserId"];
        }
        if (g["oldOwnerUserId"] !== undefined) {
          body["oldOwnerUserId"] = g["oldOwnerUserId"];
        }
        if (g["overallTransferStatusCode"] !== undefined) {
          body["overallTransferStatusCode"] = g["overallTransferStatusCode"];
        }
        if (g["requestTime"] !== undefined) {
          body["requestTime"] = g["requestTime"];
        }
        if (g["name"] !== undefined) {
          params["dataTransferId"] = String(g["name"]);
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
            listParams: {},
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
          credentials,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
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
    get: {
      description: "Get a transfers",
      arguments: z.object({
        identifier: z.string().describe("The name of the transfers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["dataTransferId"] = args.identifier;
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
      description: "Sync transfers state from GCP",
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
          params["dataTransferId"] = identifier;
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
      description: "List transfers resources",
      arguments: z.object({
        customerId: z.string().describe(
          "Immutable ID of the Google Workspace account.",
        ).optional(),
        maxResults: z.number().describe(
          "Maximum number of results to return. Default is 100.",
        ).optional(),
        newOwnerUserId: z.string().describe("Destination user's profile ID.")
          .optional(),
        oldOwnerUserId: z.string().describe("Source user's profile ID.")
          .optional(),
        status: z.string().describe("Status of the transfer.").optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (args["customerId"] !== undefined) {
          params["customerId"] = String(args["customerId"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["newOwnerUserId"] !== undefined) {
          params["newOwnerUserId"] = String(args["newOwnerUserId"]);
        }
        if (args["oldOwnerUserId"] !== undefined) {
          params["oldOwnerUserId"] = String(args["oldOwnerUserId"]);
        }
        if (args["status"] !== undefined) {
          params["status"] = String(args["status"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "dataTransfers",
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
