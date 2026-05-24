// Auto-generated extension model for @swamp/gcp/checks/accounts-apps-reports
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Checks Accounts.Apps.Reports.
 *
 * Privacy report.
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/reports/${shortName}`;
}

const BASE_URL = "https://checks.googleapis.com/";

const GET_CONFIG = {
  "id": "checks.accounts.apps.reports.get",
  "path": "v1alpha/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "checksFilter": {
      "location": "query",
    },
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
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  appBundle: z.object({
    bundleId: z.string(),
    codeReferenceId: z.string(),
    releaseType: z.string(),
    version: z.string(),
    versionId: z.string(),
  }).optional(),
  checks: z.array(z.object({
    citations: z.array(z.object({
      type: z.string(),
    })),
    evidence: z.object({
      dataSecurity: z.object({
        dataInTransitInfo: z.array(z.unknown()),
      }),
      dataTypes: z.array(z.object({
        dataType: z.unknown(),
        dataTypeEvidence: z.unknown(),
      })),
      endpointRestrictionViolations: z.array(z.object({
        endpointDetails: z.unknown(),
      })),
      endpoints: z.array(z.object({
        endpoint: z.unknown(),
      })),
      permissionRestrictionViolations: z.array(z.object({
        permissionDetails: z.unknown(),
      })),
      permissions: z.array(z.object({
        permission: z.unknown(),
      })),
      privacyPolicyTexts: z.array(z.object({
        policyFragment: z.unknown(),
      })),
      sdkIssues: z.array(z.object({
        sdk: z.unknown(),
        sdkVersion: z.unknown(),
      })),
      sdkRestrictionViolations: z.array(z.object({
        sdkDetails: z.unknown(),
      })),
      sdks: z.array(z.object({
        sdk: z.unknown(),
      })),
    }),
    regionCodes: z.array(z.string()),
    severity: z.string(),
    state: z.string(),
    stateMetadata: z.object({
      badges: z.array(z.string()),
      firstFailingTime: z.string(),
      lastFailingTime: z.string(),
    }),
    type: z.string(),
  })).optional(),
  dataMonitoring: z.object({
    dataTypes: z.array(z.object({
      dataType: z.string(),
      dataTypeEvidence: z.object({
        endpoints: z.array(z.unknown()),
        permissions: z.array(z.unknown()),
        privacyPolicyTexts: z.array(z.unknown()),
      }),
      metadata: z.object({
        badges: z.array(z.unknown()),
        firstDetectedTime: z.string(),
        lastDetectedAppVersion: z.string(),
        lastDetectedTime: z.string(),
      }),
    })),
    endpoints: z.array(z.object({
      endpoint: z.object({
        domain: z.string(),
      }),
      hitCount: z.number(),
      metadata: z.object({
        badges: z.array(z.unknown()),
        firstDetectedTime: z.string(),
        lastDetectedAppVersion: z.string(),
        lastDetectedTime: z.string(),
      }),
    })),
    permissions: z.array(z.object({
      metadata: z.object({
        badges: z.array(z.unknown()),
        firstDetectedTime: z.string(),
        lastDetectedAppVersion: z.string(),
        lastDetectedTime: z.string(),
      }),
      permission: z.object({
        id: z.string(),
      }),
    })),
    sdks: z.array(z.object({
      metadata: z.object({
        badges: z.array(z.unknown()),
        firstDetectedTime: z.string(),
        lastDetectedAppVersion: z.string(),
        lastDetectedTime: z.string(),
      }),
      sdk: z.object({
        id: z.string(),
      }),
    })),
  }).optional(),
  name: z.string(),
  resultsUri: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Checks Accounts.Apps.Reports. Registered at `@swamp/gcp/checks/accounts-apps-reports`. */
export const model = {
  type: "@swamp/gcp/checks/accounts-apps-reports",
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
      toVersion: "2026.04.04.1",
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
      description: "Privacy report.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a reports",
      arguments: z.object({
        identifier: z.string().describe("The name of the reports"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
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
      description: "Sync reports state from GCP",
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
