// Auto-generated extension model for @swamp/digitalocean/volume
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean volume.
 *
 * Wraps the `/v2/volumes` API as a swamp model so create, get, update,
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
} from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    'A human-readable name for the block storage volume. Must be lowercase and be composed only of numbers, letters and "-", up to a limit of 64 characters. The name must begin with a letter.',
  ),
  description: z.string().describe(
    "An optional free-form text field to describe a block storage volume.",
  ).optional(),
  size_gigabytes: z.number().int().describe(
    "The size of the block storage volume in GiB (1024^3). This field does not apply  when creating a volume from a snapshot.",
  ),
  tags: z.array(z.string()).describe(
    "A flat array of tag names as strings to be applied to the resource. Tag names may be for either existing or new tags. <br><br>Requires `tag:create` scope.",
  ).optional(),
  snapshot_id: z.string().describe(
    "The unique identifier for the volume snapshot from which to create the volume.",
  ).optional(),
  filesystem_type: z.string().describe(
    "The name of the filesystem type to be used on the volume. When provided, the volume will automatically be formatted to the specified filesystem type. Currently, the available options are `ext4` and `xfs`. Pre-formatted volumes are automatically mounted when attached to Ubuntu, Debian, Fedora, Fedora Atomic, and CentOS Droplets created on or after April 26, 2018. Attaching pre-formatted volumes to other Droplets is not recommended.",
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
    "The slug identifier for the region where the resource will initially be  available.",
  ),
  filesystem_label: z.string().describe(
    "The label applied to the filesystem. Labels for ext4 type filesystems may contain 16 characters while labels for xfs type filesystems are limited to 12 characters. May only be used in conjunction with filesystem_type.",
  ).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.string(),
  droplet_ids: z.array(z.number()).nullable().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  size_gigabytes: z.number().optional(),
  created_at: z.string().optional(),
  tags: z.array(z.string()).nullable().optional(),
  region: z.object({
    name: z.string().optional(),
    slug: z.string().optional(),
    features: z.array(z.string()).optional(),
    available: z.boolean().optional(),
    sizes: z.array(z.string()).optional(),
  }).optional(),
  filesystem_type: z.string().optional(),
  filesystem_label: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  size_gigabytes: z.number().int().optional(),
  tags: z.array(z.string()).optional(),
  snapshot_id: z.string().optional(),
  filesystem_type: z.string().optional(),
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
  filesystem_label: z.string().optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean volume. Registered at `@swamp/digitalocean/volume`. */
export const model = {
  type: "@swamp/digitalocean/volume",
  version: "2026.05.29.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Volume resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    volume_action: {
      description: "Volume action result",
      schema: z.object({}).passthrough(),
      lifetime: "ephemeral",
      garbageCollection: 5,
    },
  },
  methods: {
    create: {
      description: "Create a volume",
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
            "/v2/volumes",
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
        if (g.description !== undefined) body.description = g.description;
        if (g.size_gigabytes !== undefined) {
          body.size_gigabytes = g.size_gigabytes;
        }
        if (g.tags !== undefined) body.tags = g.tags;
        if (g.snapshot_id !== undefined) body.snapshot_id = g.snapshot_id;
        if (g.filesystem_type !== undefined) {
          body.filesystem_type = g.filesystem_type;
        }
        if (g.region !== undefined) body.region = g.region;
        if (g.filesystem_label !== undefined) {
          body.filesystem_label = g.filesystem_label;
        }
        const result = await create(
          "/v2/volumes",
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
      description: "Get a volume",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the volume"),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const result = await read(
          "/v2/volumes",
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
      description: "Delete the volume",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the volume"),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const { existed } = await remove(
          "/v2/volumes",
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
      description: "Sync volume state from DigitalOcean",
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
          "/v2/volumes",
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
    attach: {
      description: "attach the volume",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the volume"),
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
        ).optional(),
        droplet_id: z.number().int().describe(
          "The unique identifier for the Droplet the volume will be attached or detached from.",
        ),
        tags: z.array(z.string()).describe(
          "A flat array of tag names as strings to be applied to the resource. Tag names may be for either existing or new tags. <br><br>Requires `tag:create` scope.",
        ).optional(),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: {
          id: string | number;
          region?: string;
          droplet_id: number;
          tags?: unknown[];
          waitForCompletion?: boolean;
        },
        context: any,
      ) => {
        const body: Record<string, unknown> = { type: "attach" };
        if (args.region !== undefined) body.region = args.region;
        if (args.droplet_id !== undefined) body.droplet_id = args.droplet_id;
        if (args.tags !== undefined) body.tags = args.tags;
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/volumes",
            args.id,
            body,
            args.waitForCompletion ?? true,
            context.globalArgs.token,
          );
        const actionInstanceName = `${args.id}-attach`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "volume_action",
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
    detach: {
      description: "detach the volume",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the volume"),
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
        ).optional(),
        droplet_id: z.number().int().describe(
          "The unique identifier for the Droplet the volume will be attached or detached from.",
        ),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: {
          id: string | number;
          region?: string;
          droplet_id: number;
          waitForCompletion?: boolean;
        },
        context: any,
      ) => {
        const body: Record<string, unknown> = { type: "detach" };
        if (args.region !== undefined) body.region = args.region;
        if (args.droplet_id !== undefined) body.droplet_id = args.droplet_id;
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/volumes",
            args.id,
            body,
            args.waitForCompletion ?? true,
            context.globalArgs.token,
          );
        const actionInstanceName = `${args.id}-detach`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "volume_action",
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
    resize: {
      description: "resize the volume",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the volume"),
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
        ).optional(),
        size_gigabytes: z.number().int().describe(
          "The new size of the block storage volume in GiB (1024^3).",
        ),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: {
          id: string | number;
          region?: string;
          size_gigabytes: number;
          waitForCompletion?: boolean;
        },
        context: any,
      ) => {
        const body: Record<string, unknown> = { type: "resize" };
        if (args.region !== undefined) body.region = args.region;
        if (args.size_gigabytes !== undefined) {
          body.size_gigabytes = args.size_gigabytes;
        }
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/volumes",
            args.id,
            body,
            args.waitForCompletion ?? true,
            context.globalArgs.token,
          );
        const actionInstanceName = `${args.id}-resize`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "volume_action",
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
