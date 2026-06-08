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

// Auto-generated extension model for @swamp/digitalocean/custom-image
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean custom image.
 *
 * Wraps the `/v2/images` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  create,
  createAndPollAction,
  read,
  remove,
  tryFindByField,
  tryRead,
  update,
} from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "The display name that has been given to an image.  This is what is shown in the control panel and is generally a descriptive title for the image in question.",
  ),
  distribution: z.enum([
    "Arch Linux",
    "CentOS",
    "CoreOS",
    "Debian",
    "Fedora",
    "Fedora Atomic",
    "FreeBSD",
    "Gentoo",
    "openSUSE",
    "RancherOS",
    "Rocky Linux",
    "Ubuntu",
    "Unknown",
  ]).describe(
    "The name of a custom image's distribution. Currently, the valid values are  `Arch Linux`, `CentOS`, `CoreOS`, `Debian`, `Fedora`, `Fedora Atomic`,  `FreeBSD`, `Gentoo`, `openSUSE`, `RancherOS`, `Rocky Linux`, `Ubuntu`, and `Unknown`.  Any other value will be accepted but ignored, and `Unknown` will be used in its place.",
  ).optional(),
  description: z.string().describe(
    "An optional free-form text field to describe an image.",
  ).optional(),
  url: z.string().describe(
    "A URL from which the custom Linux virtual machine image may be retrieved.  The image it points to must be in the raw, qcow2, vhdx, vdi, or vmdk format.  It may be compressed using gzip or bzip2 and must be smaller than 100 GB after being decompressed.",
  ),
  region: z.enum([
    "nyc1",
    "sfo1",
    "nyc2",
    "ams2",
    "sgp1",
    "lon1",
    "nyc3",
    "ams3",
    "fra1",
    "tor1",
    "sfo2",
    "blr1",
    "sfo3",
    "syd1",
    "atl1",
  ]).describe(
    "The slug identifier for the region where the resource will initially be  available.",
  ),
  tags: z.array(z.string()).describe(
    "A flat array of tag names as strings to be applied to the resource. Tag names may be for either existing or new tags. <br><br>Requires `tag:create` scope.",
  ).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  type: z.string().optional(),
  distribution: z.string().optional(),
  slug: z.string().nullable().optional(),
  public: z.boolean().optional(),
  regions: z.array(z.string()).optional(),
  created_at: z.string().optional(),
  min_disk_size: z.number().nullable().optional(),
  size_gigabytes: z.number().nullable().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).nullable().optional(),
  status: z.string().optional(),
  error_message: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  distribution: z.enum([
    "Arch Linux",
    "CentOS",
    "CoreOS",
    "Debian",
    "Fedora",
    "Fedora Atomic",
    "FreeBSD",
    "Gentoo",
    "openSUSE",
    "RancherOS",
    "Rocky Linux",
    "Ubuntu",
    "Unknown",
  ]).optional(),
  description: z.string().optional(),
  url: z.string().optional(),
  region: z.enum([
    "nyc1",
    "sfo1",
    "nyc2",
    "ams2",
    "sgp1",
    "lon1",
    "nyc3",
    "ams3",
    "fra1",
    "tor1",
    "sfo2",
    "blr1",
    "sfo3",
    "syd1",
    "atl1",
  ]).optional(),
  tags: z.array(z.string()).optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean custom image. Registered at `@swamp/digitalocean/custom-image`. */
export const model = {
  type: "@swamp/digitalocean/custom-image",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.03.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.03.27.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.03.30.1",
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
      toVersion: "2026.04.22.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.29.1",
      description: "Added: token",
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
      description: "Custom Image resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    custom_image_action: {
      description: "Custom Image action result",
      schema: z.object({}).passthrough(),
      lifetime: "ephemeral",
      garbageCollection: 5,
    },
  },
  methods: {
    create: {
      description: "Create a custom image",
      arguments: z.object({
        checkExists: z.boolean().describe(
          "If true, check whether a resource with this name already exists before creating and fail if it does (default: false)",
        ).optional(),
      }),
      execute: async (args: { checkExists?: boolean }, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        if (args.checkExists) {
          const existing = await tryFindByField(
            "/v2/images",
            "name",
            g.name?.toString() ?? "",
            g.token,
          );
          if (existing) {
            throw new Error(`Resource already exists with name: ${g.name}`);
          }
        }
        const body: Record<string, unknown> = {};
        if (g.name !== undefined) body.name = g.name;
        if (g.distribution !== undefined) body.distribution = g.distribution;
        if (g.description !== undefined) body.description = g.description;
        if (g.url !== undefined) body.url = g.url;
        if (g.region !== undefined) body.region = g.region;
        if (g.tags !== undefined) body.tags = g.tags;
        const result = await create(
          "/v2/images",
          body,
          undefined,
          g.token,
        ) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a custom image",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the custom image",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const result = await read(
          "/v2/images",
          args.id,
          undefined,
          context.globalArgs.token,
        ) as ResourceData;
        const instanceName = (result.name?.toString() ?? args.id.toString())
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update custom image attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        if (g.name !== undefined) body.name = g.name;
        if (g.distribution !== undefined) body.distribution = g.distribution;
        if (g.description !== undefined) body.description = g.description;
        const result = await update(
          "/v2/images",
          existing.id ?? existing.id,
          body,
          "PUT",
          undefined,
          g.token,
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
      description: "Delete the custom image",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the custom image",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const { existed } = await remove(
          "/v2/images",
          args.id,
          undefined,
          context.globalArgs.token,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.id.toString()).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync custom image state from DigitalOcean",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const result = await tryRead(
          "/v2/images",
          existing.id ?? existing.id,
          undefined,
          g.token,
        ) as ResourceData | null;
        if (result) {
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        }
        const handle = await context.writeResource("state", instanceName, {
          id: existing.id ?? existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    convert: {
      description: "convert the custom image",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the custom image",
        ),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { id: string | number; waitForCompletion?: boolean },
        context: any,
      ) => {
        const body: Record<string, unknown> = { type: "convert" };
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/images",
            args.id,
            body,
            args.waitForCompletion ?? true,
            context.globalArgs.token,
          );
        const actionInstanceName = `${args.id}-convert`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "custom_image_action",
          actionInstanceName,
          actionResult,
        );
        handles.push(actionHandle);
        if (updatedResource) {
          const resourceInstanceName =
            (updatedResource as Record<string, unknown>).name?.toString() ??
              args.id.toString();
          const stateHandle = await context.writeResource(
            "state",
            resourceInstanceName,
            updatedResource,
          );
          handles.push(stateHandle);
        }
        return { dataHandles: handles };
      },
    },
    transfer: {
      description: "transfer the custom image",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the custom image",
        ),
        region: z.enum([
          "ams1",
          "ams2",
          "ams3",
          "blr1",
          "fra1",
          "lon1",
          "nyc1",
          "nyc2",
          "nyc3",
          "sfo1",
          "sfo2",
          "sfo3",
          "sgp1",
          "tor1",
          "syd1",
        ]).describe(
          "The slug identifier for the region where the resource will initially be  available.",
        ),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: {
          id: string | number;
          region: string;
          waitForCompletion?: boolean;
        },
        context: any,
      ) => {
        const body: Record<string, unknown> = { type: "transfer" };
        if (args.region !== undefined) body.region = args.region;
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/images",
            args.id,
            body,
            args.waitForCompletion ?? true,
            context.globalArgs.token,
          );
        const actionInstanceName = `${args.id}-transfer`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "custom_image_action",
          actionInstanceName,
          actionResult,
        );
        handles.push(actionHandle);
        if (updatedResource) {
          const resourceInstanceName =
            (updatedResource as Record<string, unknown>).name?.toString() ??
              args.id.toString();
          const stateHandle = await context.writeResource(
            "state",
            resourceInstanceName,
            updatedResource,
          );
          handles.push(stateHandle);
        }
        return { dataHandles: handles };
      },
    },
  },
};
