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

// Auto-generated extension model for @swamp/digitalocean/microvm
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean microvm.
 *
 * Wraps the `/v2/microvms` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  create,
  discover,
  read,
  remove,
  tryFindByField,
  tryRead,
} from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  name: z.string().regex(new RegExp("^[a-z0-9-]{1,63}$")).describe(
    "The name of the MicroVM. Must be unique in the region and contain 1 to 63 lowercase letters, digits, and hyphens.",
  ),
  source: z.object({
    oci_ref: z.string().optional(),
    checkpoint_id: z.string().optional(),
  }).describe(
    "What the MicroVM runs. Set exactly one of `oci_ref` or `checkpoint_id`.",
  ).optional(),
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
    "The slug of the region to create the MicroVM in. Required with `source.oci_ref`.",
  ).optional(),
  size: z.object({
    cpu: z.number().int(),
    memory: z.number().int(),
    disk: z.number().int().optional(),
  }).describe(
    "The MicroVM's size. `cpu` and `memory` must be one of the pairs `1`/`2048`, `2`/`4096`, `8`/`16384`, or `16`/`32768`. The size sets the disk, which is returned in responses.",
  ).optional(),
  networking: z.enum(["public", "vpc"]).describe(
    "`public` sends outbound traffic through a shared NAT gateway. `vpc` places the MicroVM in the VPC network set by `vpc_uuid`.",
  ).optional(),
  vpc_uuid: z.string().describe(
    "The ID of a VPC network in the same region that belongs to your team. Required when `networking` is `vpc`.",
  ).optional(),
  auto_pause: z.object({
    enabled: z.boolean().optional(),
    idle_timeout: z.string().optional(),
  }).describe(
    "Automatic pause settings. A MicroVM always pauses after it is idle for `idle_timeout`. Sending `enabled` set to `false` is rejected.",
  ).optional(),
  auto_resume: z.boolean().describe(
    "Whether an HTTP request, command, or console session resumes the MicroVM when it is paused. Set to `false` to require a manual resume.",
  ).optional(),
  http_port: z.number().int().describe(
    "The guest port the workload serves HTTP on. Defaults to `8080`. Not returned in responses. When creating from a checkpoint without `ports`, must be one of the checkpoint's ports.",
  ).optional(),
  http_protocol: z.enum(["http", "http2"]).describe(
    "The protocol the HTTP port serves.",
  ).optional(),
  ports: z.array(z.number().int()).describe(
    "The guest ports to declare, up to five. Must include `http_port`. Defaults to only the HTTP port. During the public preview, only the HTTP port is reachable through the MicroVM's endpoint.",
  ).optional(),
  environment: z.record(z.string(), z.unknown()).describe(
    "Environment variables passed into the MicroVM at boot, as key and value pairs. Not returned in responses.",
  ).optional(),
  tags: z.array(z.string()).describe("Tags to apply to the MicroVM.")
    .optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  region: z.string().optional(),
  size: z.object({
    cpu: z.number().optional(),
    memory: z.number().optional(),
    disk: z.number().optional(),
  }).optional(),
  source: z.object({
    oci_ref: z.string().optional(),
    checkpoint_id: z.string().optional(),
  }).optional(),
  state: z.string().optional(),
  failure_reason: z.string().optional(),
  networking: z.string().optional(),
  vpc_uuid: z.string().optional(),
  auto_pause: z.object({
    enabled: z.boolean().optional(),
    idle_timeout: z.string().optional(),
  }).optional(),
  auto_resume: z.boolean().optional(),
  http_protocol: z.string().nullable().optional(),
  ports: z.array(z.number()).optional(),
  tags: z.array(z.string()).optional(),
  urls: z.array(z.object({
    hostname: z.string().optional(),
    port: z.number().optional(),
    default: z.boolean().optional(),
    status: z.string().optional(),
  })).optional(),
  created_at: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().regex(new RegExp("^[a-z0-9-]{1,63}$")).optional(),
  source: z.object({
    oci_ref: z.string().optional(),
    checkpoint_id: z.string().optional(),
  }).optional(),
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
  size: z.object({
    cpu: z.number().int(),
    memory: z.number().int(),
    disk: z.number().int().optional(),
  }).optional(),
  networking: z.enum(["public", "vpc"]).optional(),
  vpc_uuid: z.string().optional(),
  auto_pause: z.object({
    enabled: z.boolean().optional(),
    idle_timeout: z.string().optional(),
  }).optional(),
  auto_resume: z.boolean().optional(),
  http_port: z.number().int().optional(),
  http_protocol: z.enum(["http", "http2"]).optional(),
  ports: z.array(z.number().int()).optional(),
  environment: z.record(z.string(), z.unknown()).optional(),
  tags: z.array(z.string()).optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean microvm. Registered at `@swamp/digitalocean/microvm`. */
export const model = {
  type: "@swamp/digitalocean/microvm",
  version: "2026.10.11.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Microvm resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a microvm",
      arguments: z.object({
        checkExists: z.boolean().describe(
          "If true, check whether a resource with this name already exists before creating and fail if it does (default: false)",
        ).optional(),
      }),
      execute: async (args: { checkExists?: boolean }, context: any) => {
        const g = context.globalArgs;
        const missing = ["name", "source"].filter((k) => g[k] === undefined);
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        if (args.checkExists) {
          const existing = await tryFindByField(
            "/v2/microvms",
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
        if (g.source !== undefined) body.source = g.source;
        if (g.region !== undefined) body.region = g.region;
        if (g.size !== undefined) body.size = g.size;
        if (g.networking !== undefined) body.networking = g.networking;
        if (g.vpc_uuid !== undefined) body.vpc_uuid = g.vpc_uuid;
        if (g.auto_pause !== undefined) body.auto_pause = g.auto_pause;
        if (g.auto_resume !== undefined) body.auto_resume = g.auto_resume;
        if (g.http_port !== undefined) body.http_port = g.http_port;
        if (g.http_protocol !== undefined) body.http_protocol = g.http_protocol;
        if (g.ports !== undefined) body.ports = g.ports;
        if (g.environment !== undefined) body.environment = g.environment;
        if (g.tags !== undefined) body.tags = g.tags;
        const result = await create(
          "/v2/microvms",
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
      description: "Get a microvm",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the microvm"),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const result = await read(
          "/v2/microvms",
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
    delete: {
      description: "Delete the microvm",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the microvm"),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const { existed } = await remove(
          "/v2/microvms",
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
      description: "Sync microvm state from DigitalOcean",
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
        const storedId = existing.id;
        if (storedId === undefined || storedId === null) {
          throw new Error(
            "Stored state for " + instanceName +
              " has no id; run get with the resource ID first",
          );
        }
        const result = await tryRead(
          "/v2/microvms",
          storedId,
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
          id: storedId,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    list_options: {
      description:
        "List available options for microvm (versions, sizes, regions)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const result = await discover(
          "/v2/microvms/options",
          context.globalArgs.token,
        );
        const handle = await context.writeResource("state", "options", result);
        return { dataHandles: [handle] };
      },
    },
  },
};
