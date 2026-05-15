// Auto-generated extension model for @swamp/digitalocean/reserved-ipv6
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean reserved ipv6.
 *
 * Wraps the `/v2/reserved_ipv6` API as a swamp model so create, get, update,
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
  tryRead,
} from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  region_slug: z.string().describe(
    "The slug identifier for the region the reserved IPv6 will be reserved to.",
  ),
});

const ResourceSchema = z.object({
  ip: z.string().optional(),
  reserved_at: z.string().optional(),
  region_slug: z.string().optional(),
  droplet: z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    memory: z.number().optional(),
    vcpus: z.number().optional(),
    disk: z.number().optional(),
    disk_info: z.array(z.object({
      type: z.string().optional(),
      size: z.object({
        amount: z.number().optional(),
        unit: z.string().optional(),
      }).optional(),
    })).optional(),
    locked: z.boolean().optional(),
    status: z.string().optional(),
    kernel: z.object({
      id: z.number().optional(),
      name: z.string().optional(),
      version: z.string().optional(),
    }).optional(),
    created_at: z.string().optional(),
    features: z.array(z.string()).optional(),
    backup_ids: z.array(z.number()).optional(),
    next_backup_window: z.object({
      start: z.string().optional(),
      end: z.string().optional(),
    }).optional(),
    snapshot_ids: z.array(z.number()).optional(),
    image: z.object({
      id: z.number().optional(),
      name: z.string().optional(),
      type: z.string().optional(),
      distribution: z.string().optional(),
      slug: z.string().optional(),
      public: z.boolean().optional(),
      regions: z.array(z.string()).optional(),
      created_at: z.string().optional(),
      min_disk_size: z.number().optional(),
      size_gigabytes: z.number().optional(),
      description: z.string().optional(),
      tags: z.array(z.string()).optional(),
      status: z.string().optional(),
      error_message: z.string().optional(),
    }).optional(),
    volume_ids: z.array(z.string()).optional(),
    size: z.object({
      slug: z.string().optional(),
      memory: z.number().optional(),
      vcpus: z.number().optional(),
      disk: z.number().optional(),
      transfer: z.number().optional(),
      price_monthly: z.number().optional(),
      price_hourly: z.number().optional(),
      regions: z.array(z.string()).optional(),
      available: z.boolean().optional(),
      description: z.string().optional(),
      disk_info: z.array(z.object({
        type: z.string().optional(),
        size: z.object({
          amount: z.number().optional(),
          unit: z.string().optional(),
        }).optional(),
      })).optional(),
      gpu_info: z.object({
        count: z.number().optional(),
        model: z.string().optional(),
        vram: z.object({
          amount: z.number().optional(),
          unit: z.string().optional(),
        }).optional(),
      }).optional(),
    }).optional(),
    size_slug: z.string().optional(),
    networks: z.object({
      v4: z.array(z.object({
        ip_address: z.string().optional(),
        netmask: z.string().optional(),
        gateway: z.string().optional(),
        type: z.string().optional(),
      })).optional(),
      v6: z.array(z.object({
        ip_address: z.string().optional(),
        netmask: z.number().optional(),
        gateway: z.string().optional(),
        type: z.string().optional(),
      })).optional(),
    }).optional(),
    region: z.object({
      name: z.string().optional(),
      slug: z.string().optional(),
      features: z.array(z.string()).optional(),
      available: z.boolean().optional(),
      sizes: z.array(z.string()).optional(),
    }).optional(),
    tags: z.array(z.string()).optional(),
    vpc_uuid: z.string().optional(),
    gpu_info: z.object({
      count: z.number().optional(),
      model: z.string().optional(),
      vram: z.object({
        amount: z.number().optional(),
        unit: z.string().optional(),
      }).optional(),
    }).optional(),
  }).nullable().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  region_slug: z.string().optional(),
});

/** Swamp extension model for DigitalOcean reserved ipv6. Registered at `@swamp/digitalocean/reserved-ipv6`. */
export const model = {
  type: "@swamp/digitalocean/reserved-ipv6",
  version: "2026.04.23.2",
  upgrades: [
    {
      toVersion: "2026.03.27.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Reserved IPV6 resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    reserved_ipv6_action: {
      description: "Reserved IPV6 action result",
      schema: z.object({}).passthrough(),
      lifetime: "ephemeral",
      garbageCollection: 5,
    },
  },
  methods: {
    create: {
      description: "Create a reserved ipv6",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const body: Record<string, unknown> = {};
        if (g.region_slug !== undefined) body.region_slug = g.region_slug;
        const result = await create("/v2/reserved_ipv6", body) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a reserved ipv6",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the reserved ipv6",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const result = await read("/v2/reserved_ipv6", args.id) as ResourceData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.id.toString()).replace(
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
      description: "Delete the reserved ipv6",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the reserved ipv6",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const { existed } = await remove("/v2/reserved_ipv6", args.id);
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
      description: "Sync reserved ipv6 state from DigitalOcean",
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
          "/v2/reserved_ipv6",
          existing.reservedipv6 ?? existing.id,
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
          reservedipv6: existing.reservedipv6 ?? existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    assign: {
      description: "assign the reserved ipv6",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the reserved ipv6",
        ),
        droplet_id: z.number().int().describe(
          "The ID of the Droplet that the reserved IPv6 will be assigned to.",
        ),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: {
          id: string | number;
          droplet_id: number;
          waitForCompletion?: boolean;
        },
        context: any,
      ) => {
        const body: Record<string, unknown> = { type: "assign" };
        if (args.droplet_id !== undefined) body.droplet_id = args.droplet_id;
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/reserved_ipv6",
            args.id,
            body,
            args.waitForCompletion ?? true,
          );
        const actionInstanceName = `${args.id}-assign`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "reserved_ipv6_action",
          actionInstanceName,
          actionResult,
        );
        handles.push(actionHandle);
        if (updatedResource) {
          const resourceInstanceName = context.globalArgs.name?.toString() ??
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
    unassign: {
      description: "unassign the reserved ipv6",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the reserved ipv6",
        ),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { id: string | number; waitForCompletion?: boolean },
        context: any,
      ) => {
        const body: Record<string, unknown> = { type: "unassign" };
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/reserved_ipv6",
            args.id,
            body,
            args.waitForCompletion ?? true,
          );
        const actionInstanceName = `${args.id}-unassign`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "reserved_ipv6_action",
          actionInstanceName,
          actionResult,
        );
        handles.push(actionHandle);
        if (updatedResource) {
          const resourceInstanceName = context.globalArgs.name?.toString() ??
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
