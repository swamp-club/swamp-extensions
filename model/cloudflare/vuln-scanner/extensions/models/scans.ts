// Auto-generated extension model for @swamp/cloudflare/vuln-scanner/scans
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Scans.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead } from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  account_id: z.string().describe("Cloudflare account ID"),
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  credential_sets: z.object({
    attacker: z.string(),
    owner: z.string(),
  }).describe(
    "Credential set references for a BOLA scan. The scanner uses the\n`owner` credentials for legitimate requests and the `attacker`\ncredentials to attempt unauthorized access.\n",
  ),
  open_api: z.string().describe(
    "OpenAPI schema definition for the API under test. The scanner\nuses this to discover endpoints and construct requests.\n",
  ),
  scan_type: z.enum(["bola"]),
  target_environment_id: z.string().describe("The target environment to scan."),
});

const ResourceSchema = z.object({
  id: z.string(),
  report: z.object({
    report: z.object({
      summary: z.object({
        verdict: z.string().optional(),
      }).optional(),
      tests: z.array(z.object({
        preflight_errors: z.array(z.object({
          description: z.string().optional(),
          error_code: z.number().optional(),
        })).optional(),
        steps: z.array(z.object({
          assertions: z.array(z.object({
            description: z.string().optional(),
            kind: z.string().optional(),
            observed: z.number().optional(),
            outcome: z.string().optional(),
          })).optional(),
          errors: z.array(z.object({
            description: z.string().optional(),
            error_code: z.number().optional(),
          })).optional(),
          request: z.object({
            body: z.record(z.string(), z.unknown()).optional(),
            credential_set: z.object({
              id: z.string().optional(),
              role: z.string().optional(),
            }).optional(),
            header_names: z.array(z.string()).optional(),
            method: z.string().optional(),
            url: z.string().optional(),
            variable_captures: z.array(z.object({
              json_path: z.string().optional(),
              name: z.string().optional(),
            })).optional(),
          }).optional(),
          response: z.object({
            body: z.string().optional(),
            header_names: z.array(z.string()).optional(),
            status: z.number().optional(),
            status_text: z.string().optional(),
          }).optional(),
        })).optional(),
        verdict: z.string().optional(),
      })).optional(),
    }).optional(),
    report_schema_version: z.string().optional(),
  }).optional(),
  scan_type: z.string().optional(),
  status: z.string().optional(),
  target_environment_id: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().optional(),
  credential_sets: z.object({
    attacker: z.string(),
    owner: z.string(),
  }).optional(),
  open_api: z.string().optional(),
  scan_type: z.enum(["bola"]).optional(),
  target_environment_id: z.string().optional(),
});

/** Swamp extension model for Cloudflare Scans. Registered at `@swamp/cloudflare/vuln-scanner/scans`. */
export const model = {
  type: "@swamp/cloudflare/vuln-scanner/scans",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Scans resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Scans",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/vuln_scanner/scans";
        const body: Record<string, unknown> = {};
        if (g.credential_sets !== undefined) {
          body.credential_sets = g.credential_sets;
        }
        if (g.open_api !== undefined) body.open_api = g.open_api;
        if (g.scan_type !== undefined) body.scan_type = g.scan_type;
        if (g.target_environment_id !== undefined) {
          body.target_environment_id = g.target_environment_id;
        }
        const result = await create(endpoint, body) as ResourceData;
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
      description: "Get a Scans",
      arguments: z.object({ id: z.string().describe("The ID of the Scans") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/vuln_scanner/scans";
        const result = await read(endpoint, args.id) as ResourceData;
        const instanceName = (g.name?.toString() ?? args.id).replace(
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
    delete: {
      description: "Delete the Scans",
      arguments: z.object({ id: z.string().describe("The ID of the Scans") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/vuln_scanner/scans";
        const { existed } = await remove(endpoint, args.id);
        const instanceName = (context.globalArgs.name?.toString() ?? args.id)
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          id: args.id,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync Scans state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/vuln_scanner/scans";
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
          throw new Error("No data found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        if (!existing.id) {
          throw new Error("Stored state has no id - cannot sync");
        }
        const result = await tryRead(endpoint, existing.id) as
          | ResourceData
          | null;
        if (result) {
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        }
        const handle = await context.writeResource("state", instanceName, {
          id: existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
