// Auto-generated extension model for @swamp/digitalocean/droplet
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean droplet.
 *
 * Wraps the `/v2/droplets` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  create,
  createAndPollAction,
  pollResourceReady,
  read,
  remove,
  tryFindByField,
  tryRead,
} from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  name: z.string().max(255).regex(
    new RegExp("^[a-zA-Z0-9]?[a-z0-9A-Z.\\-]*[a-z0-9A-Z]$"),
  ).describe(
    "The human-readable string you wish to use when displaying the Droplet name. The name, if set to a domain name managed in the DigitalOcean DNS management system, will configure a PTR record for the Droplet. The name set during creation will also determine the hostname for the Droplet in its internal configuration.",
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
    "The slug identifier for the region that you wish to deploy the Droplet in. If the specific datacenter is not not important, a slug prefix (e.g. `nyc`) can be used to deploy the Droplet in any of the that region's locations (`nyc1`, `nyc2`, or `nyc3`). If the region is omitted from the create request completely, the Droplet may deploy in any region.",
  ).optional(),
  size: z.string().describe(
    "The slug identifier for the size that you wish to select for this Droplet.",
  ),
  image: z.string().describe(
    "The image ID of a public or private image or the slug identifier for a public image. This image will be the base image for your Droplet.<br>Requires `image:read` scope.",
  ),
  ssh_keys: z.array(z.string()).describe(
    "An array containing the IDs or fingerprints of the SSH keys that you wish to embed in the Droplet's root account upon creation. You must add the keys to your team before they can be embedded on a Droplet.<br>Requires `ssh_key:read` scope.",
  ).optional(),
  backups: z.boolean().describe(
    "A boolean indicating whether automated backups should be enabled for the Droplet.",
  ).optional(),
  backup_policy: z.object({
    plan: z.enum(["daily", "weekly"]).optional(),
    weekday: z.enum(["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"])
      .optional(),
    hour: z.union([
      z.literal(0),
      z.literal(4),
      z.literal(8),
      z.literal(12),
      z.literal(16),
      z.literal(20),
    ]).optional(),
    window_length_hours: z.number().int().optional(),
    retention_period_days: z.number().int().optional(),
  }).describe(
    "An object specifying the backup policy for the Droplet. If omitted and `backups` is `true`, the backup plan will default to daily.",
  ).optional(),
  ipv6: z.boolean().describe(
    "A boolean indicating whether to enable IPv6 on the Droplet.",
  ).optional(),
  monitoring: z.boolean().describe(
    "A boolean indicating whether to install the DigitalOcean agent for monitoring.",
  ).optional(),
  tags: z.array(z.string()).describe(
    "A flat array of tag names as strings to apply to the Droplet after it is created. Tag names can either be existing or new tags.<br>Requires `tag:create` scope.",
  ).optional(),
  user_data: z.string().describe(
    "A string containing 'user data' which may be used to configure the Droplet on first boot, often a 'cloud-config' file or Bash script. It must be plain text and may not exceed 64 KiB in size.",
  ).optional(),
  private_networking: z.boolean().describe(
    "This parameter has been deprecated. Use `vpc_uuid` instead to specify a VPC network for the Droplet. If no `vpc_uuid` is provided, the Droplet will be placed in your account's default VPC for the region.",
  ).optional(),
  volumes: z.array(z.string()).describe(
    "An array of IDs for block storage volumes that will be attached to the Droplet once created. The volumes must not already be attached to an existing Droplet.<br>Requires `block_storage:read` scpoe.",
  ).optional(),
  vpc_uuid: z.string().describe(
    "A string specifying the UUID of the VPC to which the Droplet will be assigned. If excluded, the Droplet will be assigned to your account's default VPC for the region.<br>Requires `vpc:read` scope.",
  ).optional(),
  with_droplet_agent: z.boolean().describe(
    "A boolean indicating whether to install the DigitalOcean agent used for providing access to the Droplet web console in the control panel. By default, the agent is installed on new Droplets but installation errors (i.e. OS not supported) are ignored. To prevent it from being installed, set to `false`. To make installation errors fatal, explicitly set it to `true`.",
  ).optional(),
  public_networking: z.boolean().describe(
    "An optional boolean indicating whether this Droplet should be created with public networking or not. By default, all Droplets are created with public networking available. If explicitly set to `false`, only private networking will be enabled, and public networking will be disabled; currently this means that it will not have any public static or Reserved IPv4 or IPv6 address, nor can one be assigned later. If explicitly set to `false`, `ipv6` must also be `false`.",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.number(),
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
  }).nullable().optional(),
  created_at: z.string().optional(),
  features: z.array(z.string()).optional(),
  backup_ids: z.array(z.number()).optional(),
  next_backup_window: z.object({
    start: z.string().optional(),
    end: z.string().optional(),
  }).nullable().optional(),
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
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().max(255).regex(
    new RegExp("^[a-zA-Z0-9]?[a-z0-9A-Z.\\-]*[a-z0-9A-Z]$"),
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
  ]).optional(),
  size: z.string().optional(),
  image: z.string().optional(),
  ssh_keys: z.array(z.string()).optional(),
  backups: z.boolean().optional(),
  backup_policy: z.object({
    plan: z.enum(["daily", "weekly"]).optional(),
    weekday: z.enum(["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"])
      .optional(),
    hour: z.union([
      z.literal(0),
      z.literal(4),
      z.literal(8),
      z.literal(12),
      z.literal(16),
      z.literal(20),
    ]).optional(),
    window_length_hours: z.number().int().optional(),
    retention_period_days: z.number().int().optional(),
  }).optional(),
  ipv6: z.boolean().optional(),
  monitoring: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  user_data: z.string().optional(),
  private_networking: z.boolean().optional(),
  volumes: z.array(z.string()).optional(),
  vpc_uuid: z.string().optional(),
  with_droplet_agent: z.boolean().optional(),
  public_networking: z.boolean().optional(),
});

/** Swamp extension model for DigitalOcean droplet. Registered at `@swamp/digitalocean/droplet`. */
export const model = {
  type: "@swamp/digitalocean/droplet",
  version: "2026.05.15.1",
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
      toVersion: "2026.03.31.1",
      description: "Added: public_networking",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Droplet resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    droplet_action: {
      description: "Droplet action result",
      schema: z.object({}).passthrough(),
      lifetime: "ephemeral",
      garbageCollection: 5,
    },
  },
  methods: {
    create: {
      description: "Create a droplet",
      arguments: z.object({
        checkExists: z.boolean().describe(
          "If true, check whether a resource with this name already exists before creating and fail if it does (default: false)",
        ).optional(),
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { checkExists?: boolean; waitForReady?: boolean },
        context: any,
      ) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        if (args.checkExists) {
          const existing = await tryFindByField(
            "/v2/droplets",
            "name",
            g.name?.toString() ?? "",
          );
          if (existing) {
            throw new Error(`Resource already exists with name: ${g.name}`);
          }
        }
        const body: Record<string, unknown> = {};
        if (g.name !== undefined) body.name = g.name;
        if (g.region !== undefined) body.region = g.region;
        if (g.size !== undefined) body.size = g.size;
        if (g.image !== undefined) body.image = g.image;
        if (g.ssh_keys !== undefined) body.ssh_keys = g.ssh_keys;
        if (g.backups !== undefined) body.backups = g.backups;
        if (g.backup_policy !== undefined) body.backup_policy = g.backup_policy;
        if (g.ipv6 !== undefined) body.ipv6 = g.ipv6;
        if (g.monitoring !== undefined) body.monitoring = g.monitoring;
        if (g.tags !== undefined) body.tags = g.tags;
        if (g.user_data !== undefined) body.user_data = g.user_data;
        if (g.private_networking !== undefined) {
          body.private_networking = g.private_networking;
        }
        if (g.volumes !== undefined) body.volumes = g.volumes;
        if (g.vpc_uuid !== undefined) body.vpc_uuid = g.vpc_uuid;
        if (g.with_droplet_agent !== undefined) {
          body.with_droplet_agent = g.with_droplet_agent;
        }
        if (g.public_networking !== undefined) {
          body.public_networking = g.public_networking;
        }
        let result = await create("/v2/droplets", body) as ResourceData;
        if (args.waitForReady !== false) {
          const resourceId = result.id ?? result.id;
          if (resourceId) {
            result = await pollResourceReady(
              "/v2/droplets",
              resourceId as string | number,
              {
                "statusField": "status",
                "readyValues": ["active"],
                "failedValues": ["errored"],
              },
            ) as ResourceData;
          }
        }
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a droplet",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the droplet"),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const result = await read("/v2/droplets", args.id) as ResourceData;
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
      description: "Delete the droplet",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the droplet"),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const { existed } = await remove("/v2/droplets", args.id);
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
      description: "Sync droplet state from DigitalOcean",
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
          "/v2/droplets",
          existing.id ?? existing.id,
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
    change_backup_policy: {
      description: "change backup policy the droplet",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the droplet"),
        backup_policy: z.record(z.string(), z.unknown()).describe(
          "An object specifying the backup policy for the Droplet.",
        ),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: {
          id: string | number;
          backup_policy: Record<string, unknown>;
          waitForCompletion?: boolean;
        },
        context: any,
      ) => {
        const body: Record<string, unknown> = { type: "change_backup_policy" };
        if (args.backup_policy !== undefined) {
          body.backup_policy = args.backup_policy;
        }
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/droplets",
            args.id,
            body,
            args.waitForCompletion ?? true,
          );
        const actionInstanceName = `${args.id}-change_backup_policy`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "droplet_action",
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
    change_kernel: {
      description: "change kernel the droplet",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the droplet"),
        kernel: z.number().int().describe(
          "A unique number used to identify and reference a specific kernel.",
        ).optional(),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: {
          id: string | number;
          kernel?: number;
          waitForCompletion?: boolean;
        },
        context: any,
      ) => {
        const body: Record<string, unknown> = { type: "change_kernel" };
        if (args.kernel !== undefined) body.kernel = args.kernel;
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/droplets",
            args.id,
            body,
            args.waitForCompletion ?? true,
          );
        const actionInstanceName = `${args.id}-change_kernel`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "droplet_action",
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
    disable_backups: {
      description: "disable backups the droplet",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the droplet"),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { id: string | number; waitForCompletion?: boolean },
        context: any,
      ) => {
        const body: Record<string, unknown> = { type: "disable_backups" };
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/droplets",
            args.id,
            body,
            args.waitForCompletion ?? true,
          );
        const actionInstanceName = `${args.id}-disable_backups`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "droplet_action",
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
    enable_backups: {
      description: "enable backups the droplet",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the droplet"),
        backup_policy: z.record(z.string(), z.unknown()).describe(
          "An object specifying the backup policy for the Droplet. If omitted, the backup plan will default to daily.",
        ).optional(),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: {
          id: string | number;
          backup_policy?: Record<string, unknown>;
          waitForCompletion?: boolean;
        },
        context: any,
      ) => {
        const body: Record<string, unknown> = { type: "enable_backups" };
        if (args.backup_policy !== undefined) {
          body.backup_policy = args.backup_policy;
        }
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/droplets",
            args.id,
            body,
            args.waitForCompletion ?? true,
          );
        const actionInstanceName = `${args.id}-enable_backups`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "droplet_action",
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
    enable_ipv6: {
      description: "enable ipv6 the droplet",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the droplet"),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { id: string | number; waitForCompletion?: boolean },
        context: any,
      ) => {
        const body: Record<string, unknown> = { type: "enable_ipv6" };
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/droplets",
            args.id,
            body,
            args.waitForCompletion ?? true,
          );
        const actionInstanceName = `${args.id}-enable_ipv6`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "droplet_action",
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
    password_reset: {
      description: "password reset the droplet",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the droplet"),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { id: string | number; waitForCompletion?: boolean },
        context: any,
      ) => {
        const body: Record<string, unknown> = { type: "password_reset" };
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/droplets",
            args.id,
            body,
            args.waitForCompletion ?? true,
          );
        const actionInstanceName = `${args.id}-password_reset`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "droplet_action",
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
    power_cycle: {
      description: "power cycle the droplet",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the droplet"),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { id: string | number; waitForCompletion?: boolean },
        context: any,
      ) => {
        const body: Record<string, unknown> = { type: "power_cycle" };
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/droplets",
            args.id,
            body,
            args.waitForCompletion ?? true,
          );
        const actionInstanceName = `${args.id}-power_cycle`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "droplet_action",
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
    power_off: {
      description: "power off the droplet",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the droplet"),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { id: string | number; waitForCompletion?: boolean },
        context: any,
      ) => {
        const body: Record<string, unknown> = { type: "power_off" };
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/droplets",
            args.id,
            body,
            args.waitForCompletion ?? true,
          );
        const actionInstanceName = `${args.id}-power_off`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "droplet_action",
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
    power_on: {
      description: "power on the droplet",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the droplet"),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { id: string | number; waitForCompletion?: boolean },
        context: any,
      ) => {
        const body: Record<string, unknown> = { type: "power_on" };
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/droplets",
            args.id,
            body,
            args.waitForCompletion ?? true,
          );
        const actionInstanceName = `${args.id}-power_on`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "droplet_action",
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
    reboot: {
      description: "reboot the droplet",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the droplet"),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { id: string | number; waitForCompletion?: boolean },
        context: any,
      ) => {
        const body: Record<string, unknown> = { type: "reboot" };
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/droplets",
            args.id,
            body,
            args.waitForCompletion ?? true,
          );
        const actionInstanceName = `${args.id}-reboot`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "droplet_action",
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
    rebuild: {
      description: "rebuild the droplet",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the droplet"),
        image: z.string().describe(
          "The image ID of a public or private image or the slug identifier for a public image. The Droplet will be rebuilt using this image as its base.",
        ).optional(),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: {
          id: string | number;
          image?: string;
          waitForCompletion?: boolean;
        },
        context: any,
      ) => {
        const body: Record<string, unknown> = { type: "rebuild" };
        if (args.image !== undefined) body.image = args.image;
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/droplets",
            args.id,
            body,
            args.waitForCompletion ?? true,
          );
        const actionInstanceName = `${args.id}-rebuild`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "droplet_action",
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
    rename: {
      description: "rename the droplet",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the droplet"),
        name: z.string().describe("The new name for the Droplet.").optional(),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: {
          id: string | number;
          name?: string;
          waitForCompletion?: boolean;
        },
        context: any,
      ) => {
        const body: Record<string, unknown> = { type: "rename" };
        if (args.name !== undefined) body.name = args.name;
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/droplets",
            args.id,
            body,
            args.waitForCompletion ?? true,
          );
        const actionInstanceName = `${args.id}-rename`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "droplet_action",
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
      description: "resize the droplet",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the droplet"),
        disk: z.boolean().describe(
          "When `true`, the Droplet's disk will be resized in addition to its RAM and CPU. This is a permanent change and cannot be reversed as a Droplet's disk size cannot be decreased.",
        ).optional(),
        size: z.string().describe(
          "The slug identifier for the size to which you wish to resize the Droplet.",
        ).optional(),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: {
          id: string | number;
          disk?: boolean;
          size?: string;
          waitForCompletion?: boolean;
        },
        context: any,
      ) => {
        const body: Record<string, unknown> = { type: "resize" };
        if (args.disk !== undefined) body.disk = args.disk;
        if (args.size !== undefined) body.size = args.size;
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/droplets",
            args.id,
            body,
            args.waitForCompletion ?? true,
          );
        const actionInstanceName = `${args.id}-resize`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "droplet_action",
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
    restore: {
      description: "restore the droplet",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the droplet"),
        image: z.number().int().describe(
          "The ID of a backup of the current Droplet instance to restore from.",
        ).optional(),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: {
          id: string | number;
          image?: number;
          waitForCompletion?: boolean;
        },
        context: any,
      ) => {
        const body: Record<string, unknown> = { type: "restore" };
        if (args.image !== undefined) body.image = args.image;
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/droplets",
            args.id,
            body,
            args.waitForCompletion ?? true,
          );
        const actionInstanceName = `${args.id}-restore`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "droplet_action",
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
    shutdown: {
      description: "shutdown the droplet",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the droplet"),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { id: string | number; waitForCompletion?: boolean },
        context: any,
      ) => {
        const body: Record<string, unknown> = { type: "shutdown" };
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/droplets",
            args.id,
            body,
            args.waitForCompletion ?? true,
          );
        const actionInstanceName = `${args.id}-shutdown`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "droplet_action",
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
    snapshot: {
      description: "snapshot the droplet",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the droplet"),
        name: z.string().describe(
          "The name to give the new snapshot of the Droplet.",
        ).optional(),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: {
          id: string | number;
          name?: string;
          waitForCompletion?: boolean;
        },
        context: any,
      ) => {
        const body: Record<string, unknown> = { type: "snapshot" };
        if (args.name !== undefined) body.name = args.name;
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/droplets",
            args.id,
            body,
            args.waitForCompletion ?? true,
          );
        const actionInstanceName = `${args.id}-snapshot`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "droplet_action",
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
