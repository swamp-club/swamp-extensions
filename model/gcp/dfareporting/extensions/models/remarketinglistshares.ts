// Auto-generated extension model for @swamp/gcp/dfareporting/remarketinglistshares
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Campaign Manager 360 RemarketingListShares.
 *
 * Contains properties of a remarketing list's sharing information. Sharing allows other accounts or advertisers to target to your remarketing lists. This resource can be used to manage remarketing list sharing to other accounts and advertisers.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://dfareporting.googleapis.com/dfareporting/v5/";

const GET_CONFIG = {
  "id": "dfareporting.remarketingListShares.get",
  "path":
    "userprofiles/{+profileId}/remarketingListShares/{+remarketingListId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "profileId",
    "remarketingListId",
  ],
  "parameters": {
    "profileId": {
      "location": "path",
      "required": true,
    },
    "remarketingListId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "dfareporting.remarketingListShares.update",
  "path": "userprofiles/{+profileId}/remarketingListShares",
  "httpMethod": "PUT",
  "parameterOrder": [
    "profileId",
  ],
  "parameters": {
    "profileId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  kind: z.string().describe(
    'Identifies what kind of resource this is. Value: the fixed string "dfareporting#remarketingListShare".',
  ).optional(),
  remarketingListId: z.string().describe(
    "Remarketing list ID. This is a read-only, auto-generated field.",
  ).optional(),
  sharedAccountIds: z.array(z.string()).describe(
    "Accounts that the remarketing list is shared with.",
  ).optional(),
  sharedAdvertiserIds: z.array(z.string()).describe(
    "Advertisers that the remarketing list is shared with.",
  ).optional(),
});

const StateSchema = z.object({
  kind: z.string().optional(),
  remarketingListId: z.string().optional(),
  sharedAccountIds: z.array(z.string()).optional(),
  sharedAdvertiserIds: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  kind: z.string().describe(
    'Identifies what kind of resource this is. Value: the fixed string "dfareporting#remarketingListShare".',
  ).optional(),
  remarketingListId: z.string().describe(
    "Remarketing list ID. This is a read-only, auto-generated field.",
  ).optional(),
  sharedAccountIds: z.array(z.string()).describe(
    "Accounts that the remarketing list is shared with.",
  ).optional(),
  sharedAdvertiserIds: z.array(z.string()).describe(
    "Advertisers that the remarketing list is shared with.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Campaign Manager 360 RemarketingListShares. Registered at `@swamp/gcp/dfareporting/remarketinglistshares`. */
export const model = {
  type: "@swamp/gcp/dfareporting/remarketinglistshares",
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
        "Contains properties of a remarketing list's sharing information. Sharing allo...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a remarketingListShares",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the remarketingListShares",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        params["remarketingListId"] = args.identifier;
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
    update: {
      description: "Update remarketingListShares attributes",
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
        params["profileId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["kind"] !== undefined) body["kind"] = g["kind"];
        if (g["remarketingListId"] !== undefined) {
          body["remarketingListId"] = g["remarketingListId"];
        }
        if (g["sharedAccountIds"] !== undefined) {
          body["sharedAccountIds"] = g["sharedAccountIds"];
        }
        if (g["sharedAdvertiserIds"] !== undefined) {
          body["sharedAdvertiserIds"] = g["sharedAdvertiserIds"];
        }
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
          UPDATE_CONFIG,
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
      description: "Sync remarketingListShares state from GCP",
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
          if (g["profileId"] !== undefined) {
            params["profileId"] = String(g["profileId"]);
          } else if (existing["profileId"]) {
            params["profileId"] = String(existing["profileId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["remarketingListId"] = identifier;
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
