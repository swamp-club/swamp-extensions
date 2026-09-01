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

// Auto-generated extension model for @swamp/cloudflare/email-security/allow-policies
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Allow Policies.
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
  comments: z.string().max(1024).optional(),
  created_at: z.string(),
  id: z.string().describe("Allow policy identifier."),
  is_acceptable_sender: z.boolean().describe(
    "Exempts messages from this sender from Spam, Spoof and Bulk dispositions only; Malicious and Suspicious dispositions still apply.",
  ).optional(),
  is_exempt_recipient: z.boolean().describe(
    "Bypasses all detections for messages to this recipient.",
  ).optional(),
  is_recipient: z.boolean().describe(
    "Deprecated as of July 1, 2025. Use `is_exempt_recipient` instead. End of life: July 1, 2026.",
  ).optional(),
  is_regex: z.boolean().optional(),
  is_sender: z.boolean().describe(
    "Deprecated as of July 1, 2025. Use `is_trusted_sender` instead. End of life: July 1, 2026.",
  ).optional(),
  is_spoof: z.boolean().describe(
    "Deprecated as of July 1, 2025. Use `is_acceptable_sender` instead. End of life: July 1, 2026.",
  ).optional(),
  is_trusted_sender: z.boolean().describe(
    "Bypasses all detections and link following for messages from this sender.",
  ).optional(),
  last_modified: z.string(),
  modified_at: z.string().optional(),
  pattern: z.string().min(1).max(1024).describe(
    "The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain name for DOMAIN (e.g. `example.com`), or a plain IPv4 or IPv6 address or CIDR block for IP (e.g. `1.2.3.4`, `1.2.3.0/24`, `2606:4700:4700::1111`, or `2606:4700:4700::/48`); the API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.",
  ).optional(),
  pattern_type: z.enum(["EMAIL", "DOMAIN", "IP", "UNKNOWN"]).describe(
    "Type of pattern matching.\n- EMAIL: matches a full email address (e.g. `user@example.com`)\n- DOMAIN: matches a domain name (e.g. `example.com`)\n- IP: matches a plain IPv4 or IPv6 address (e.g. `1.2.3.4` or `2606:4700:4700::1111`) or CIDR block (e.g. `1.2.3.0/24` or `2606:4700:4700::/48`). The API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.\n- UNKNOWN: deprecated; you cannot use this when creating or updating policies, but it may appear on existing entries.\n",
  ).optional(),
  verify_sender: z.boolean().describe(
    "Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.",
  ).optional(),
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
  comments: z.string().optional(),
  created_at: z.string().optional(),
  id: z.string(),
  is_acceptable_sender: z.boolean().optional(),
  is_exempt_recipient: z.boolean().optional(),
  is_recipient: z.boolean().optional(),
  is_regex: z.boolean().optional(),
  is_sender: z.boolean().optional(),
  is_spoof: z.boolean().optional(),
  is_trusted_sender: z.boolean().optional(),
  last_modified: z.string().optional(),
  modified_at: z.string().optional(),
  pattern: z.string().optional(),
  pattern_type: z.string().optional(),
  verify_sender: z.boolean().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().optional(),
  comments: z.string().max(1024).optional(),
  created_at: z.string().optional(),
  id: z.string().optional(),
  is_acceptable_sender: z.boolean().optional(),
  is_exempt_recipient: z.boolean().optional(),
  is_recipient: z.boolean().optional(),
  is_regex: z.boolean().optional(),
  is_sender: z.boolean().optional(),
  is_spoof: z.boolean().optional(),
  is_trusted_sender: z.boolean().optional(),
  last_modified: z.string().optional(),
  modified_at: z.string().optional(),
  pattern: z.string().min(1).max(1024).optional(),
  pattern_type: z.enum(["EMAIL", "DOMAIN", "IP", "UNKNOWN"]).optional(),
  verify_sender: z.boolean().optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Allow Policies. Registered at `@swamp/cloudflare/email-security/allow-policies`. */
export const model = {
  type: "@swamp/cloudflare/email-security/allow-policies",
  version: "2026.09.01.1",
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
      toVersion: "2026.07.14.1",
      description: "No schema changes",
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
      toVersion: "2026.07.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.25.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Allow Policies resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Allow Policies",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/email-security/settings/allow_policies";
        const body: Record<string, unknown> = {};
        if (g.comments !== undefined) body.comments = g.comments;
        if (g.created_at !== undefined) body.created_at = g.created_at;
        if (g.id !== undefined) body.id = g.id;
        if (g.is_acceptable_sender !== undefined) {
          body.is_acceptable_sender = g.is_acceptable_sender;
        }
        if (g.is_exempt_recipient !== undefined) {
          body.is_exempt_recipient = g.is_exempt_recipient;
        }
        if (g.is_recipient !== undefined) body.is_recipient = g.is_recipient;
        if (g.is_regex !== undefined) body.is_regex = g.is_regex;
        if (g.is_sender !== undefined) body.is_sender = g.is_sender;
        if (g.is_spoof !== undefined) body.is_spoof = g.is_spoof;
        if (g.is_trusted_sender !== undefined) {
          body.is_trusted_sender = g.is_trusted_sender;
        }
        if (g.last_modified !== undefined) body.last_modified = g.last_modified;
        if (g.modified_at !== undefined) body.modified_at = g.modified_at;
        if (g.pattern !== undefined) body.pattern = g.pattern;
        if (g.pattern_type !== undefined) body.pattern_type = g.pattern_type;
        if (g.verify_sender !== undefined) body.verify_sender = g.verify_sender;
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
      description: "Get a Allow Policies",
      arguments: z.object({
        id: z.string().describe("The ID of the Allow Policies"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/email-security/settings/allow_policies";
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
        "Look up an existing Allow Policies by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/email-security/settings/allow_policies";
        const filters: [string, string][] = [];
        if (g.comments !== undefined) {
          filters.push(["comments", String(g.comments)]);
        }
        if (g.created_at !== undefined) {
          filters.push(["created_at", String(g.created_at)]);
        }
        if (g.id !== undefined) filters.push(["id", String(g.id)]);
        if (g.is_acceptable_sender !== undefined) {
          filters.push([
            "is_acceptable_sender",
            String(g.is_acceptable_sender),
          ]);
        }
        if (g.is_exempt_recipient !== undefined) {
          filters.push(["is_exempt_recipient", String(g.is_exempt_recipient)]);
        }
        if (g.is_recipient !== undefined) {
          filters.push(["is_recipient", String(g.is_recipient)]);
        }
        if (g.is_regex !== undefined) {
          filters.push(["is_regex", String(g.is_regex)]);
        }
        if (g.is_sender !== undefined) {
          filters.push(["is_sender", String(g.is_sender)]);
        }
        if (g.is_spoof !== undefined) {
          filters.push(["is_spoof", String(g.is_spoof)]);
        }
        if (g.is_trusted_sender !== undefined) {
          filters.push(["is_trusted_sender", String(g.is_trusted_sender)]);
        }
        if (g.last_modified !== undefined) {
          filters.push(["last_modified", String(g.last_modified)]);
        }
        if (g.modified_at !== undefined) {
          filters.push(["modified_at", String(g.modified_at)]);
        }
        if (g.pattern !== undefined) {
          filters.push(["pattern", String(g.pattern)]);
        }
        if (g.pattern_type !== undefined) {
          filters.push(["pattern_type", String(g.pattern_type)]);
        }
        if (g.verify_sender !== undefined) {
          filters.push(["verify_sender", String(g.verify_sender)]);
        }
        if (filters.length === 0) {
          throw new Error(
            "At least one global argument must be set to filter by",
          );
        }
        const items = await listAll(endpoint, "page", undefined, {
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
            `No allow policies found matching filters: ${filterDesc}`,
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
        "Import an existing Allow Policies by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Allow Policies to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/email-security/settings/allow_policies";
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
      description: "Update Allow Policies attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Allow Policies by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/email-security/settings/allow_policies";
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
        if (g.comments !== undefined) body.comments = g.comments;
        if (g.created_at !== undefined) body.created_at = g.created_at;
        if (g.id !== undefined) body.id = g.id;
        if (g.is_acceptable_sender !== undefined) {
          body.is_acceptable_sender = g.is_acceptable_sender;
        }
        if (g.is_exempt_recipient !== undefined) {
          body.is_exempt_recipient = g.is_exempt_recipient;
        }
        if (g.is_recipient !== undefined) body.is_recipient = g.is_recipient;
        if (g.is_regex !== undefined) body.is_regex = g.is_regex;
        if (g.is_sender !== undefined) body.is_sender = g.is_sender;
        if (g.is_spoof !== undefined) body.is_spoof = g.is_spoof;
        if (g.is_trusted_sender !== undefined) {
          body.is_trusted_sender = g.is_trusted_sender;
        }
        if (g.last_modified !== undefined) body.last_modified = g.last_modified;
        if (g.modified_at !== undefined) body.modified_at = g.modified_at;
        if (g.pattern !== undefined) body.pattern = g.pattern;
        if (g.pattern_type !== undefined) body.pattern_type = g.pattern_type;
        if (g.verify_sender !== undefined) body.verify_sender = g.verify_sender;
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
      description: "Delete the Allow Policies",
      arguments: z.object({
        id: z.string().describe("The ID of the Allow Policies"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/email-security/settings/allow_policies";
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
      description: "Sync Allow Policies state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Allow Policies by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/email-security/settings/allow_policies";
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
