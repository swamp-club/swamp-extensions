// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/digitalocean/agent-trigger
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean agent trigger.
 *
 * Wraps the `/v2/agents/triggers` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createEnveloped,
  read,
  remove,
  tryFindByField,
  tryRead,
  update,
} from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  name: z.string().min(1).max(64).regex(
    new RegExp("^[A-Za-z0-9]([A-Za-z0-9._-]{0,62}[A-Za-z0-9])?$"),
  ).describe(
    "Team-unique (among non-deleted triggers) trigger name. Same rules as session names; not UUID-form.",
  ),
  status: z.enum(["active", "paused"]).describe(
    "Trigger lifecycle state. Soft-deleted triggers are never returned (404).",
  ).optional(),
  prompt_template: z.string().describe(
    "The prompt sent on each fire. For cron it must not contain payload-interpolation placeholders.",
  ).optional(),
  output: z.object({
    mode: z.enum(["none", "email", "slack"]),
    email: z.string().optional(),
    slack: z.object({
      webhook_url: z.string(),
    }).optional(),
  }).describe(
    "Output-delivery configuration on create/update. Exactly one of email / slack is required for the matching mode and forbidden otherwise; destinations are stored encrypted and never returned.",
  ).optional(),
  session_template: z.string().describe(
    "fresh only. Full agents.yaml Agent manifest (YAML or JSON). Any embedded env values are split out and encrypted server-side.",
  ).optional(),
  bound_session_id: z.string().describe(
    "reuse only. UUID of an existing session owned by the team.",
  ).optional(),
  cron: z.object({
    cron_expr: z.string(),
    timezone: z.string(),
  }).describe("cron block on create.").optional(),
  kind: z.enum(["webhook", "cron"]).describe(
    "How the trigger fires - on an event (webhook) or on a schedule (cron). Immutable after create.",
  ).optional(),
  session_mode: z.enum(["fresh", "reuse"]).describe(
    "fresh = a new session is created from the trigger's spec on every firing and destroyed after. reuse = the trigger binds an existing PAUSED session, resumed on each firing and paused after; multiple triggers may bind one session.",
  ).optional(),
  webhook: z.object({
    provider: z.enum(["github", "gitlab", "custom"]).optional(),
  }).describe("webhook block on create. Omitting provider defaults to custom.")
    .optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  trigger_id: z.string(),
  kind: z.string().optional(),
  name: z.string().optional(),
  status: z.string().optional(),
  session_mode: z.string().optional(),
  agent_kind: z.string().optional(),
  prompt_template: z.string().optional(),
  output: z.object({
    mode: z.string().optional(),
    email_configured: z.boolean().optional(),
    slack_configured: z.boolean().optional(),
  }).optional(),
  session_template: z.string().optional(),
  bound_session_id: z.string().optional(),
  webhook: z.object({
    provider: z.string().optional(),
    webhook_url: z.string().optional(),
  }).optional(),
  cron: z.object({
    cron_expr: z.string().optional(),
    timezone: z.string().optional(),
    next_run_at: z.string().optional(),
  }).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  webhook_secret: z.string().meta({ sensitive: true }).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().min(1).max(64).regex(
    new RegExp("^[A-Za-z0-9]([A-Za-z0-9._-]{0,62}[A-Za-z0-9])?$"),
  ).optional(),
  status: z.enum(["active", "paused"]).optional(),
  prompt_template: z.string().optional(),
  output: z.object({
    mode: z.enum(["none", "email", "slack"]),
    email: z.string().optional(),
    slack: z.object({
      webhook_url: z.string(),
    }).optional(),
  }).optional(),
  session_template: z.string().optional(),
  bound_session_id: z.string().optional(),
  cron: z.object({
    cron_expr: z.string(),
    timezone: z.string(),
  }).optional(),
  kind: z.enum(["webhook", "cron"]).optional(),
  session_mode: z.enum(["fresh", "reuse"]).optional(),
  webhook: z.object({
    provider: z.enum(["github", "gitlab", "custom"]).optional(),
  }).optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean agent trigger. Registered at `@swamp/digitalocean/agent-trigger`. */
export const model = {
  type: "@swamp/digitalocean/agent-trigger",
  version: "2026.10.13.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Agent Trigger resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a agent trigger",
      arguments: z.object({
        checkExists: z.boolean().describe(
          "If true, check whether a resource with this name already exists before creating and fail if it does (default: false)",
        ).optional(),
      }),
      execute: async (args: { checkExists?: boolean }, context: any) => {
        const g = context.globalArgs;
        const missing = [
          "kind",
          "name",
          "output",
          "prompt_template",
          "session_mode",
        ].filter((k) => g[k] === undefined);
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
            "/v2/agents/triggers",
            "name",
            g.name?.toString() ?? "",
            g.token,
          );
          if (existing) {
            throw new Error(`Resource already exists with name: ${g.name}`);
          }
        }
        const body: Record<string, unknown> = {};
        if (g.kind !== undefined) body.kind = g.kind;
        if (g.name !== undefined) body.name = g.name;
        if (g.session_mode !== undefined) body.session_mode = g.session_mode;
        if (g.prompt_template !== undefined) {
          body.prompt_template = g.prompt_template;
        }
        if (g.output !== undefined) body.output = g.output;
        if (g.session_template !== undefined) {
          body.session_template = g.session_template;
        }
        if (g.bound_session_id !== undefined) {
          body.bound_session_id = g.bound_session_id;
        }
        if (g.webhook !== undefined) body.webhook = g.webhook;
        if (g.cron !== undefined) body.cron = g.cron;
        const result = await createEnveloped(
          "/v2/agents/triggers",
          body,
          "trigger",
          ["webhook_secret"],
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
      description: "Get a agent trigger",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the agent trigger",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const result = await read(
          "/v2/agents/triggers",
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
      description: "Update agent trigger attributes",
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
        const storedId = existing.trigger_id ?? existing.id;
        if (storedId === undefined || storedId === null) {
          throw new Error(
            "Stored state for " + instanceName +
              " has no trigger_id; run get with the resource ID first",
          );
        }
        const body: Record<string, unknown> = {};
        if (g.name !== undefined) body.name = g.name;
        if (g.status !== undefined) body.status = g.status;
        if (g.prompt_template !== undefined) {
          body.prompt_template = g.prompt_template;
        }
        if (g.output !== undefined) body.output = g.output;
        if (g.session_template !== undefined) {
          body.session_template = g.session_template;
        }
        if (g.bound_session_id !== undefined) {
          body.bound_session_id = g.bound_session_id;
        }
        if (g.cron !== undefined) body.cron = g.cron;
        const result = await update(
          "/v2/agents/triggers",
          storedId,
          body,
          "PATCH",
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
      description: "Delete the agent trigger",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the agent trigger",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const { existed } = await remove(
          "/v2/agents/triggers",
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
          trigger_id: args.id,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync agent trigger state from DigitalOcean",
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
        const storedId = existing.trigger_id ?? existing.id;
        if (storedId === undefined || storedId === null) {
          throw new Error(
            "Stored state for " + instanceName +
              " has no trigger_id; run get with the resource ID first",
          );
        }
        const result = await tryRead(
          "/v2/agents/triggers",
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
          trigger_id: storedId,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
