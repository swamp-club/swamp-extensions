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

// Auto-generated extension model for @swamp/digitalocean/insight-notification-channel
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean insight notification channel.
 *
 * Wraps the `/v2/insights/notification-channels` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  create,
  read,
  remove,
  tryFindByField,
  tryRead,
  update,
} from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "A human-readable name for the notification channel.",
  ),
  email: z.object({
    to: z.string(),
  }).describe(
    "Email notification channel configuration. Recipients must be verified team\nmember email addresses.\n",
  ).optional(),
  slack: z.object({
    webhook_url: z.string().optional(),
    channel: z.string(),
  }).describe(
    "Slack notification channel configuration. `webhook_url` is write-only: send\nthe full value on create/update; reads return a masked value (`********`).\nOmit `webhook_url` on update to keep the existing secret.\n",
  ).optional(),
  webhook: z.object({
    url: z.string(),
    basic_auth: z.object({
      username: z.string(),
      password: z.string().optional(),
    }).optional(),
    bearer_token: z.object({
      token: z.string().optional(),
    }).optional(),
    headers: z.record(z.string(), z.unknown()).optional(),
    signature: z.object({
      secret: z.string().optional(),
    }).optional(),
  }).describe(
    "Generic HTTPS webhook notification channel configuration. The URL must use\nHTTPS and must not include userinfo. Optionally configure either\n`basic_auth` or `bearer_token` (not both), custom headers, and a signing\nsecret.\n\n`url` is not a secret and is returned in full on read. Credential fields\n(`basic_auth.password`, `bearer_token.token`, `signature.secret`) are\nwrite-only: full value on create/update; masked as `********` on read. Omit\na secret field on update to keep the existing value.\n",
  ).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  channel_type: z.string().optional(),
  email: z.object({
    to: z.string().optional(),
  }).optional(),
  slack: z.object({
    webhook_url: z.string().optional(),
    channel: z.string().optional(),
  }).optional(),
  webhook: z.object({
    url: z.string().optional(),
    basic_auth: z.object({
      username: z.string().optional(),
      password: z.string().optional(),
    }).optional(),
    bearer_token: z.object({
      token: z.string().optional(),
    }).optional(),
    headers: z.record(z.string(), z.unknown()).optional(),
    signature: z.object({
      secret: z.string().optional(),
    }).optional(),
  }).optional(),
  usage: z.object({
    rule_count: z.number().optional(),
  }).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  email: z.object({
    to: z.string(),
  }).optional(),
  slack: z.object({
    webhook_url: z.string().optional(),
    channel: z.string(),
  }).optional(),
  webhook: z.object({
    url: z.string(),
    basic_auth: z.object({
      username: z.string(),
      password: z.string().optional(),
    }).optional(),
    bearer_token: z.object({
      token: z.string().optional(),
    }).optional(),
    headers: z.record(z.string(), z.unknown()).optional(),
    signature: z.object({
      secret: z.string().optional(),
    }).optional(),
  }).optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean insight notification channel. Registered at `@swamp/digitalocean/insight-notification-channel`. */
export const model = {
  type: "@swamp/digitalocean/insight-notification-channel",
  version: "2026.10.02.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Insight Notification Channel resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a insight notification channel",
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
            "/v2/insights/notification-channels",
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
        if (g.email !== undefined) body.email = g.email;
        if (g.slack !== undefined) body.slack = g.slack;
        if (g.webhook !== undefined) body.webhook = g.webhook;
        const result = await create(
          "/v2/insights/notification-channels",
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
      description: "Get a insight notification channel",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the insight notification channel",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const result = await read(
          "/v2/insights/notification-channels",
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
      description: "Update insight notification channel attributes",
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
        if (g.email !== undefined) body.email = g.email;
        if (g.slack !== undefined) body.slack = g.slack;
        if (g.webhook !== undefined) body.webhook = g.webhook;
        const unset = ["email", "name", "slack", "webhook"].filter((k) =>
          body[k] === undefined
        );
        if (unset.length > 0) {
          const live = await read(
            "/v2/insights/notification-channels",
            existing.id ?? existing.id,
            undefined,
            g.token,
          );
          for (const k of unset) {
            if (live[k] !== undefined && live[k] !== null) body[k] = live[k];
          }
        }
        const result = await update(
          "/v2/insights/notification-channels",
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
      description: "Delete the insight notification channel",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the insight notification channel",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const { existed } = await remove(
          "/v2/insights/notification-channels",
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
      description: "Sync insight notification channel state from DigitalOcean",
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
          "/v2/insights/notification-channels",
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
  },
};
