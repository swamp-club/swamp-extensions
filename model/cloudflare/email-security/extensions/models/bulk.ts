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

// Auto-generated extension model for @swamp/cloudflare/email-security/bulk
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Bulk.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead } from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  account_id: z.string().describe("Cloudflare account ID"),
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  action: z.enum(["MOVE", "RELEASE"]),
  comment: z.string().optional(),
  destination: z.enum([
    "Inbox",
    "JunkEmail",
    "DeletedItems",
    "RecoverableItemsDeletions",
    "RecoverableItemsPurges",
  ]).optional(),
  expected_disposition: z.enum([
    "MALICIOUS",
    "MALICIOUS-BEC",
    "SUSPICIOUS",
    "SPOOF",
    "SPAM",
    "BULK",
    "ENCRYPTED",
    "EXTERNAL",
    "UNKNOWN",
    "NONE",
  ]).optional(),
  search_params: z.object({
    action_log: z.boolean().optional(),
    alert_id: z.string().optional(),
    delivery_status: z.enum([
      "delivered",
      "moved",
      "quarantined",
      "rejected",
      "deferred",
      "bounced",
      "queued",
    ]).optional(),
    detections_only: z.boolean().optional(),
    domain: z.string().optional(),
    end: z.string().optional(),
    exact_subject: z.string().optional(),
    final_disposition: z.enum([
      "MALICIOUS",
      "MALICIOUS-BEC",
      "SUSPICIOUS",
      "SPOOF",
      "SPAM",
      "BULK",
      "ENCRYPTED",
      "EXTERNAL",
      "UNKNOWN",
      "NONE",
    ]).optional(),
    message_action: z.enum(["PREVIEW", "QUARANTINE_RELEASED", "MOVED"])
      .optional(),
    message_id: z.string().optional(),
    metric: z.string().optional(),
    query: z.string().optional(),
    recipient: z.string().optional(),
    sender: z.string().optional(),
    start: z.string().optional(),
    subject: z.string().optional(),
    submissions: z.boolean().optional(),
  }),
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
  action_params: z.object({
    destination: z.string().optional(),
    expected_disposition: z.string().optional(),
    type: z.string().optional(),
  }).optional(),
  action_type: z.string().optional(),
  comment: z.string().optional(),
  completed_at: z.string().optional(),
  created_at: z.string().optional(),
  job_id: z.string().optional(),
  messages_failed: z.number().optional(),
  messages_pending: z.number().optional(),
  messages_successful: z.number().optional(),
  search_params: z.object({
    action_log: z.boolean().optional(),
    alert_id: z.string().optional(),
    delivery_status: z.string().optional(),
    detections_only: z.boolean().optional(),
    domain: z.string().optional(),
    end: z.string().optional(),
    exact_subject: z.string().optional(),
    final_disposition: z.string().optional(),
    message_action: z.string().optional(),
    message_id: z.string().optional(),
    metric: z.string().optional(),
    query: z.string().optional(),
    recipient: z.string().optional(),
    sender: z.string().optional(),
    start: z.string().optional(),
    subject: z.string().optional(),
    submissions: z.boolean().optional(),
  }).optional(),
  started_at: z.string().optional(),
  status: z.string().optional(),
  status_message: z.string().optional(),
  total_messages_discovered: z.number().optional(),
  id: z.string(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().optional(),
  action: z.enum(["MOVE", "RELEASE"]).optional(),
  comment: z.string().optional(),
  destination: z.enum([
    "Inbox",
    "JunkEmail",
    "DeletedItems",
    "RecoverableItemsDeletions",
    "RecoverableItemsPurges",
  ]).optional(),
  expected_disposition: z.enum([
    "MALICIOUS",
    "MALICIOUS-BEC",
    "SUSPICIOUS",
    "SPOOF",
    "SPAM",
    "BULK",
    "ENCRYPTED",
    "EXTERNAL",
    "UNKNOWN",
    "NONE",
  ]).optional(),
  search_params: z.object({
    action_log: z.boolean().optional(),
    alert_id: z.string().optional(),
    delivery_status: z.enum([
      "delivered",
      "moved",
      "quarantined",
      "rejected",
      "deferred",
      "bounced",
      "queued",
    ]).optional(),
    detections_only: z.boolean().optional(),
    domain: z.string().optional(),
    end: z.string().optional(),
    exact_subject: z.string().optional(),
    final_disposition: z.enum([
      "MALICIOUS",
      "MALICIOUS-BEC",
      "SUSPICIOUS",
      "SPOOF",
      "SPAM",
      "BULK",
      "ENCRYPTED",
      "EXTERNAL",
      "UNKNOWN",
      "NONE",
    ]).optional(),
    message_action: z.enum(["PREVIEW", "QUARANTINE_RELEASED", "MOVED"])
      .optional(),
    message_id: z.string().optional(),
    metric: z.string().optional(),
    query: z.string().optional(),
    recipient: z.string().optional(),
    sender: z.string().optional(),
    start: z.string().optional(),
    subject: z.string().optional(),
    submissions: z.boolean().optional(),
  }).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Bulk. Registered at `@swamp/cloudflare/email-security/bulk`. */
export const model = {
  type: "@swamp/cloudflare/email-security/bulk",
  version: "2026.06.24.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Bulk resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Bulk",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/email-security/investigate/bulk";
        const body: Record<string, unknown> = {};
        if (g.action !== undefined) body.action = g.action;
        if (g.comment !== undefined) body.comment = g.comment;
        if (g.destination !== undefined) body.destination = g.destination;
        if (g.expected_disposition !== undefined) {
          body.expected_disposition = g.expected_disposition;
        }
        if (g.search_params !== undefined) body.search_params = g.search_params;
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
      description: "Get a Bulk",
      arguments: z.object({ id: z.string().describe("The ID of the Bulk") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/email-security/investigate/bulk";
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
    delete: {
      description: "Delete the Bulk",
      arguments: z.object({ id: z.string().describe("The ID of the Bulk") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/email-security/investigate/bulk";
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
      description: "Sync Bulk state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/email-security/investigate/bulk";
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
