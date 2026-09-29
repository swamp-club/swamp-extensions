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

// Auto-generated extension model for @swamp/hetzner-cloud/images
// Do not edit manually. Re-generate with: deno task generate:hetzner

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Hetzner Cloud image.
 *
 * Wraps the `/images` API as a swamp model so get, update, delete, list, adopt, change_protection
 * can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  listAll,
  postAction,
  read,
  remove,
  tryRead,
  update,
} from "./_lib/hetzner.ts";

const GlobalArgsSchema = z.object({
  description: z.string().describe("New description of Image.").optional(),
  type: z.enum(["snapshot"]).describe("Destination Image type to convert to.")
    .optional(),
  labels: z.record(z.string(), z.unknown()).describe(
    'User-defined labels (`key/value` pairs) for the Resource.\n\nNote that the set of [Labels](#description/labels) provided in the request will overwrite the\nexisting one.\n\nFor more information, see "[Labels](#description/labels)".\n',
  ).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "Hetzner API token; overrides the HETZNER_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.number(),
  type: z.string().optional(),
  status: z.string().optional(),
  name: z.unknown().optional(),
  description: z.string().optional(),
  image_size: z.unknown().optional(),
  disk_size: z.number().optional(),
  created: z.string().optional(),
  created_from: z.unknown().optional(),
  bound_to: z.unknown().optional(),
  os_flavor: z.string().optional(),
  os_version: z.unknown().optional(),
  rapid_deploy: z.boolean().optional(),
  protection: z.object({
    delete: z.boolean().optional(),
  }).optional(),
  deprecated: z.unknown().optional(),
  deprecation: z.unknown().optional(),
  deleted: z.unknown().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  architecture: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  description: z.string().optional(),
  type: z.enum(["snapshot"]).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Hetzner Cloud image. Registered at `@swamp/hetzner-cloud/images`. */
export const model = {
  type: "@swamp/hetzner-cloud/images",
  version: "2026.09.29.1",
  upgrades: [
    {
      toVersion: "2026.06.10.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.09.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Image resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a image",
      arguments: z.object({
        id: z.number().int().describe("The ID of the image"),
      }),
      execute: async (args: { id: number }, context: any) => {
        const result = await read(
          "/images",
          args.id,
          context.globalArgs.token,
        ) as ResourceData;
        const instanceName =
          (result.name == null
            ? args.id.toString()
            : `${result.name}-${args.id.toString()}`).replace(/[\/\\]/g, "_")
            .replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update image attributes",
      arguments: z.object({
        id: z.number().int().describe("The ID of the image"),
      }),
      execute: async (args: { id: number }, context: any) => {
        const g = context.globalArgs;
        const body: Record<string, unknown> = {};
        if (g.description !== undefined) body.description = g.description;
        if (g.type !== undefined) body.type = g.type;
        if (g.labels !== undefined) body.labels = g.labels;
        const result = await update(
          "/images",
          args.id,
          body,
          g.token,
        ) as ResourceData;
        const instanceName =
          (result.name == null
            ? args.id.toString()
            : `${result.name}-${args.id.toString()}`).replace(/[\/\\]/g, "_")
            .replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the image",
      arguments: z.object({
        id: z.number().int().describe("The ID of the image"),
      }),
      execute: async (args: { id: number }, context: any) => {
        const current = await tryRead(
          "/images",
          args.id,
          context.globalArgs.token,
        ) as ResourceData | null;
        const { existed } = await remove(
          "/images",
          args.id,
          context.globalArgs.token,
        );
        const instanceName =
          (current?.name == null
            ? args.id.toString()
            : `${current?.name}-${args.id.toString()}`).replace(/[\/\\]/g, "_")
            .replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          id: args.id,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    list: {
      description:
        "List images, optionally filtered by a Hetzner label selector or architecture, bound_to, include_deprecated, name, status, type",
      arguments: z.object({
        label_selector: z.string().describe(
          "Hetzner label selector to filter results, e.g. env=production,role!=db",
        ).optional(),
        architecture: z.enum(["x86", "arm"]).describe(
          "Filter resources by cpu architecture.",
        ).optional(),
        bound_to: z.array(z.string()).describe(
          "Filter Images by their linked Server ID. May be used multiple times.",
        ).optional(),
        include_deprecated: z.boolean().describe("Include deprecated Images.")
          .optional(),
        name: z.string().describe("Filter resources by their name.").optional(),
        status: z.array(z.enum(["available", "creating", "unavailable"]))
          .describe("Filter resources by status. May be used multiple times.")
          .optional(),
        type: z.array(z.enum(["system", "app", "snapshot", "backup"])).describe(
          "Filter resources by type. May be used multiple times.",
        ).optional(),
      }),
      execute: async (
        args: {
          label_selector?: string;
          architecture?: string;
          bound_to?: string[];
          include_deprecated?: boolean;
          name?: string;
          status?: string[];
          type?: string[];
        },
        context: any,
      ) => {
        const g = context.globalArgs;
        const queryParams: Record<string, string | string[]> = {};
        if (args.label_selector !== undefined) {
          queryParams.label_selector = args.label_selector;
        }
        if (args.architecture !== undefined) {
          queryParams.architecture = args.architecture;
        }
        if (args.bound_to !== undefined) queryParams.bound_to = args.bound_to;
        if (args.include_deprecated !== undefined) {
          queryParams.include_deprecated = String(args.include_deprecated);
        }
        if (args.name !== undefined) queryParams.name = args.name;
        if (args.status !== undefined) queryParams.status = args.status;
        if (args.type !== undefined) queryParams.type = args.type;
        const items = await listAll(
          "/images",
          queryParams,
          g.token,
        ) as ResourceData[];
        const dataHandles: any[] = [];
        for (const item of items) {
          const instanceName = (item.name == null
            ? item.id?.toString() ?? "unknown"
            : `${item.name}-${item.id?.toString() ?? "unknown"}`).replace(
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
        return { dataHandles, result: { count: items.length } };
      },
    },
    adopt: {
      description: "Adopt an existing image by ID into managed state",
      arguments: z.object({
        id: z.number().int().describe("The ID of the image to adopt"),
        expected_name: z.string().describe(
          "Expected name for identity validation",
        ).optional(),
      }),
      execute: async (
        args: { id: number; expected_name?: string },
        context: any,
      ) => {
        const result = await read(
          "/images",
          args.id,
          context.globalArgs.token,
        ) as ResourceData;
        if (
          args.expected_name !== undefined && result.name !== args.expected_name
        ) {
          throw new Error(
            `Identity mismatch: expected name=${args.expected_name} but got ${result.name}`,
          );
        }
        const instanceName =
          (result.name == null
            ? args.id.toString()
            : `${result.name}-${args.id.toString()}`).replace(/[\/\\]/g, "_")
            .replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    change_protection: {
      description: "Change delete/rebuild protection for the image",
      arguments: z.object({
        id: z.number().int().describe("The ID of the image"),
        delete: z.boolean().describe("Prevent the image from being deleted"),
      }),
      execute: async (args: { id: number; delete: boolean }, context: any) => {
        const g = context.globalArgs;
        const existing = { id: args.id };
        const body: Record<string, unknown> = {};
        if (args.delete !== undefined) body.delete = args.delete;
        await postAction(
          "/images",
          existing.id,
          "change_protection",
          body,
          g.token,
        );
        const result = await read(
          "/images",
          existing.id,
          g.token,
        ) as ResourceData;
        const instanceName =
          (result.name == null
            ? args.id.toString()
            : `${result.name}-${args.id.toString()}`).replace(/[\/\\]/g, "_")
            .replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
  },
};
