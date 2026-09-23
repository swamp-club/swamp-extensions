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

// Auto-generated extension model for @swamp/cloudflare/magic/connectors
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Connectors.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, lookup,
 * adopt, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  create,
  listAll,
  read,
  remove,
  tryRead,
  update,
} from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  account_id: z.string().describe("Cloudflare account ID"),
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  activated: z.boolean().optional(),
  interrupt_window_days_of_week: z.array(
    z.enum([
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]),
  ).describe("Allowed days of the week for upgrades. Default is all days.")
    .optional(),
  interrupt_window_duration_hours: z.number().min(1).max(24).optional(),
  interrupt_window_embargo_dates: z.array(
    z.string().regex(new RegExp("^\\d{4}-\\d{2}-\\d{2}$")),
  ).describe("List of dates (YYYY-MM-DD) when upgrades are blocked.")
    .optional(),
  interrupt_window_hour_of_day: z.number().optional(),
  notes: z.string().optional(),
  timezone: z.string().optional(),
  provision_license: z.boolean().describe(
    "When true, regenerate license key for the connector.",
  ).optional(),
  device: z.object({
    id: z.string().optional(),
    provision_license: z.boolean().optional(),
    serial_number: z.string().optional(),
  }).describe(
    "Exactly one of id, serial_number, or provision_license must be provided.",
  ),
  apiToken: z.string().meta({ sensitive: true }).describe(
    "Cloudflare API token; overrides the CLOUDFLARE_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  apiKey: z.string().meta({ sensitive: true }).describe(
    "Cloudflare API key for the legacy key+email auth path; overrides the CLOUDFLARE_API_KEY environment variable. Wire with a vault.get(...) expression. Requires email.",
  ).optional(),
  email: z.string().meta({ sensitive: true }).describe(
    "Cloudflare account email for the legacy key+email auth path; overrides the CLOUDFLARE_EMAIL environment variable. Requires apiKey.",
  ).optional(),
});

const ResourceSchema = z.object({
  activated: z.boolean().optional(),
  device: z.object({
    id: z.string().optional(),
    serial_number: z.string().optional(),
    type: z.string().optional(),
  }).optional(),
  id: z.string(),
  interrupt_window_days_of_week: z.array(z.string()).optional(),
  interrupt_window_duration_hours: z.number().optional(),
  interrupt_window_embargo_dates: z.array(z.string()).optional(),
  interrupt_window_hour_of_day: z.number().optional(),
  last_heartbeat: z.string().optional(),
  last_seen_version: z.string().optional(),
  last_updated: z.string().optional(),
  license_key: z.string().optional(),
  notes: z.string().optional(),
  timezone: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().optional(),
  activated: z.boolean().optional(),
  interrupt_window_days_of_week: z.array(
    z.enum([
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]),
  ).optional(),
  interrupt_window_duration_hours: z.number().min(1).max(24).optional(),
  interrupt_window_embargo_dates: z.array(
    z.string().regex(new RegExp("^\\d{4}-\\d{2}-\\d{2}$")),
  ).optional(),
  interrupt_window_hour_of_day: z.number().optional(),
  notes: z.string().optional(),
  timezone: z.string().optional(),
  provision_license: z.boolean().optional(),
  device: z.object({
    id: z.string().optional(),
    provision_license: z.boolean().optional(),
    serial_number: z.string().optional(),
  }).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Connectors. Registered at `@swamp/cloudflare/magic/connectors`. */
export const model = {
  type: "@swamp/cloudflare/magic/connectors",
  version: "2026.09.23.1",
  upgrades: [
    {
      toVersion: "2026.05.29.1",
      description: "Added: apiToken, apiKey, email",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.24.1",
      description: "Added: primary, site_id",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.25.2",
      description: "Added: primary, site_id",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.23.1",
      description: "Removed: primary, site_id",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { primary: _primary, site_id: _site_id, ...rest } = old;
        return rest;
      },
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Connectors resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Connectors",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/connectors";
        const body: Record<string, unknown> = {};
        if (g.device !== undefined) body.device = g.device;
        if (g.activated !== undefined) body.activated = g.activated;
        if (g.interrupt_window_days_of_week !== undefined) {
          body.interrupt_window_days_of_week = g.interrupt_window_days_of_week;
        }
        if (g.interrupt_window_duration_hours !== undefined) {
          body.interrupt_window_duration_hours =
            g.interrupt_window_duration_hours;
        }
        if (g.interrupt_window_embargo_dates !== undefined) {
          body.interrupt_window_embargo_dates =
            g.interrupt_window_embargo_dates;
        }
        if (g.interrupt_window_hour_of_day !== undefined) {
          body.interrupt_window_hour_of_day = g.interrupt_window_hour_of_day;
        }
        if (g.notes !== undefined) body.notes = g.notes;
        if (g.timezone !== undefined) body.timezone = g.timezone;
        const result = await create(endpoint, body, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
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
      description: "Get a Connectors",
      arguments: z.object({
        id: z.string().describe("The ID of the Connectors"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/connectors";
        const result = await read(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
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
    lookup: {
      description:
        "Look up an existing Connectors by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/connectors";
        const filters: [string, string][] = [];
        if (g.activated !== undefined) {
          filters.push(["activated", String(g.activated)]);
        }
        if (g.interrupt_window_duration_hours !== undefined) {
          filters.push([
            "interrupt_window_duration_hours",
            String(g.interrupt_window_duration_hours),
          ]);
        }
        if (g.interrupt_window_hour_of_day !== undefined) {
          filters.push([
            "interrupt_window_hour_of_day",
            String(g.interrupt_window_hour_of_day),
          ]);
        }
        if (g.notes !== undefined) filters.push(["notes", String(g.notes)]);
        if (g.timezone !== undefined) {
          filters.push(["timezone", String(g.timezone)]);
        }
        if (g.provision_license !== undefined) {
          filters.push(["provision_license", String(g.provision_license)]);
        }
        if (filters.length === 0) {
          throw new Error(
            "At least one global argument must be set to filter by",
          );
        }
        const items = await listAll(endpoint, "none", undefined, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        });
        const matches = items.filter((item) => {
          for (const [key, val] of filters) {
            if (String((item as Record<string, unknown>)[key]) !== val) {
              return false;
            }
          }
          return true;
        });
        if (matches.length === 0) {
          const filterDesc = filters.map(([k, v]) =>
            `${k}=${JSON.stringify(v)}`
          ).join(", ");
          throw new Error(
            `No connectors found matching filters: ${filterDesc}`,
          );
        }
        if (matches.length > 1) {
          const filterDesc = filters.map(([k, v]) =>
            `${k}=${JSON.stringify(v)}`
          ).join(", ");
          throw new Error(
            `Expected exactly 1 match, found ${matches.length} for filters: ${filterDesc}`,
          );
        }
        const result = matches[0] as ResourceData;
        const instanceName =
          (g.name?.toString() ?? result.id?.toString() ?? "current").replace(
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
    adopt: {
      description:
        "Import an existing Connectors by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Connectors to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/connectors";
        const result = await read(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const instanceName =
          (result.name?.toString() ?? g.name?.toString() ?? args.id).replace(
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
      description: "Update Connectors attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Connectors by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/connectors";
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No data found - run create, get, or list first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const body: Record<string, unknown> = {};
        if (g.activated !== undefined) body.activated = g.activated;
        if (g.interrupt_window_days_of_week !== undefined) {
          body.interrupt_window_days_of_week = g.interrupt_window_days_of_week;
        }
        if (g.interrupt_window_duration_hours !== undefined) {
          body.interrupt_window_duration_hours =
            g.interrupt_window_duration_hours;
        }
        if (g.interrupt_window_embargo_dates !== undefined) {
          body.interrupt_window_embargo_dates =
            g.interrupt_window_embargo_dates;
        }
        if (g.interrupt_window_hour_of_day !== undefined) {
          body.interrupt_window_hour_of_day = g.interrupt_window_hour_of_day;
        }
        if (g.notes !== undefined) body.notes = g.notes;
        if (g.timezone !== undefined) body.timezone = g.timezone;
        if (g.provision_license !== undefined) {
          body.provision_license = g.provision_license;
        }
        const result = await update(endpoint, existing.id, body, "PATCH", {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the Connectors",
      arguments: z.object({
        id: z.string().describe("The ID of the Connectors"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/connectors";
        const { existed } = await remove(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        });
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
      description: "Sync Connectors state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Connectors by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/connectors";
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No data found - run create, get, or list first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        if (!existing.id) {
          throw new Error("Stored state has no id - cannot sync");
        }
        const result = await tryRead(endpoint, existing.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData | null;
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
