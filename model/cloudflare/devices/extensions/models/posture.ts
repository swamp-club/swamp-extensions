// Auto-generated extension model for @swamp/cloudflare/devices/posture
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Posture.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead, update } from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  account_id: z.string().describe("Cloudflare account ID"),
  description: z.string().describe(
    "The description of the device posture rule.",
  ).optional(),
  expiration: z.string().describe(
    "Sets the expiration time for a posture check result. If empty, the result remains valid until it is overwritten by new data from the WARP client.",
  ).optional(),
  input: z.object({
    exists: z.boolean().optional(),
    operating_system: z.enum(["windows", "linux", "mac"]),
    path: z.string(),
    sha256: z.string().optional(),
    thumbprint: z.string().optional(),
  }).optional(),
  match: z.array(z.object({
    platform: z.enum(["windows", "mac", "linux", "android", "ios", "chromeos"])
      .optional(),
  })).describe("The conditions that the client must match to run the rule.")
    .optional(),
  name: z.string().describe("The name of the device posture rule."),
  schedule: z.string().describe(
    "Polling frequency for the WARP client posture check. Default: `5m` (poll every five minutes). Minimum: `1m`.",
  ).optional(),
  type: z.enum([
    "file",
    "application",
    "tanium",
    "gateway",
    "warp",
    "disk_encryption",
    "serial_number",
    "sentinelone",
    "carbonblack",
    "firewall",
    "os_version",
    "domain_joined",
    "client_certificate",
    "client_certificate_v2",
    "antivirus",
    "unique_client_id",
    "kolide",
    "tanium_s2s",
    "crowdstrike_s2s",
    "intune",
    "workspace_one",
    "sentinelone_s2s",
    "custom_s2s",
  ]).describe("The type of device posture rule."),
});

const ResourceSchema = z.object({
  description: z.string().optional(),
  expiration: z.string().optional(),
  id: z.string(),
  input: z.object({
    exists: z.boolean().optional(),
    operating_system: z.string().optional(),
    path: z.string().optional(),
    sha256: z.string().optional(),
    thumbprint: z.string().optional(),
  }).optional(),
  match: z.array(z.object({
    platform: z.string().optional(),
  })).optional(),
  name: z.string().optional(),
  schedule: z.string().optional(),
  type: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  description: z.string().optional(),
  expiration: z.string().optional(),
  input: z.object({
    exists: z.boolean().optional(),
    operating_system: z.enum(["windows", "linux", "mac"]),
    path: z.string(),
    sha256: z.string().optional(),
    thumbprint: z.string().optional(),
  }).optional(),
  match: z.array(z.object({
    platform: z.enum(["windows", "mac", "linux", "android", "ios", "chromeos"])
      .optional(),
  })).optional(),
  name: z.string().optional(),
  schedule: z.string().optional(),
  type: z.enum([
    "file",
    "application",
    "tanium",
    "gateway",
    "warp",
    "disk_encryption",
    "serial_number",
    "sentinelone",
    "carbonblack",
    "firewall",
    "os_version",
    "domain_joined",
    "client_certificate",
    "client_certificate_v2",
    "antivirus",
    "unique_client_id",
    "kolide",
    "tanium_s2s",
    "crowdstrike_s2s",
    "intune",
    "workspace_one",
    "sentinelone_s2s",
    "custom_s2s",
  ]).optional(),
});

/** Swamp extension model for Cloudflare Posture. Registered at `@swamp/cloudflare/devices/posture`. */
export const model = {
  type: "@swamp/cloudflare/devices/posture",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Posture resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Posture",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/devices/posture";
        const body: Record<string, unknown> = {};
        if (g.description !== undefined) body.description = g.description;
        if (g.expiration !== undefined) body.expiration = g.expiration;
        if (g.input !== undefined) body.input = g.input;
        if (g.match !== undefined) body.match = g.match;
        if (g.name !== undefined) body.name = g.name;
        if (g.schedule !== undefined) body.schedule = g.schedule;
        if (g.type !== undefined) body.type = g.type;
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
      description: "Get a Posture",
      arguments: z.object({ id: z.string().describe("The ID of the Posture") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/devices/posture";
        const result = await read(endpoint, args.id) as ResourceData;
        const instanceName = (result.name?.toString() ?? args.id).replace(
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
      description: "Update Posture attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/devices/posture";
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) throw new Error("No data found - run create first");
        const existing = JSON.parse(new TextDecoder().decode(content));
        const body: Record<string, unknown> = {};
        if (g.description !== undefined) body.description = g.description;
        if (g.expiration !== undefined) body.expiration = g.expiration;
        if (g.input !== undefined) body.input = g.input;
        if (g.match !== undefined) body.match = g.match;
        if (g.name !== undefined) body.name = g.name;
        if (g.schedule !== undefined) body.schedule = g.schedule;
        if (g.type !== undefined) body.type = g.type;
        const result = await update(
          endpoint,
          existing.id,
          body,
          "PUT",
        ) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the Posture",
      arguments: z.object({ id: z.string().describe("The ID of the Posture") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/devices/posture";
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
      description: "Sync Posture state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/devices/posture";
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
