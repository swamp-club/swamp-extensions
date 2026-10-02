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

// Auto-generated extension model for @swamp/tailscale/policy-file
// Do not edit manually. Re-generate with: deno task generate:tailscale

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Tailscale policy file.
 *
 * The tailnet policy file (ACL), managed as HuJSON text. create refuses to
 * replace a policy file that has been edited since the tailnet was created
 * unless overwriteExistingContent is set; update refuses if the policy changed
 * since the last get or sync. Deleting the model leaves the policy as it is
 * unless resetOnDelete is set.
 *
 * Methods: `create`, `get`, `update`, `delete`, `sync`, `preview`, `validate`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  apiRequest,
  expandPath,
  instanceName,
  requireArgs,
  requireStored,
} from "./_lib/tailscale.ts";

const GlobalArgsSchema = z.object({
  policy: z.string().describe(
    "The policy file as HuJSON (JSON with comments and trailing commas)",
  ).optional(),
  overwriteExistingContent: z.boolean().describe(
    "Let create replace a policy file that has been edited since the tailnet was created",
  ).optional(),
  resetOnDelete: z.boolean().describe(
    "Reset the policy file to the default when the model is deleted",
  ).optional(),
  apiKey: z.string().meta({ sensitive: true }).describe(
    "Tailscale API access token. Overrides the TAILSCALE_API_KEY environment variable. Wire with a vault.get(...) expression.",
  ).optional(),
  oauthClientId: z.string().describe(
    "OAuth client ID, used with oauthClientSecret instead of an API key. Overrides TAILSCALE_OAUTH_CLIENT_ID.",
  ).optional(),
  oauthClientSecret: z.string().meta({ sensitive: true }).describe(
    "OAuth client secret. Overrides TAILSCALE_OAUTH_CLIENT_SECRET. Wire with a vault.get(...) expression.",
  ).optional(),
  oauthScopes: z.array(z.string()).describe(
    "Scopes to request when exchanging the OAuth client credentials; defaults to all of the client's scopes.",
  ).optional(),
  tailnet: z.string().describe(
    "Tailnet ID. Defaults to TAILSCALE_TAILNET, then '-' (the tailnet of the credential in use).",
  ).optional(),
  baseUrl: z.string().describe(
    "Tailscale API base URL. Defaults to TAILSCALE_BASE_URL, then https://api.tailscale.com.",
  ).optional(),
});

const ResourceSchema = z.object({
  policy: z.string().optional(),
  etag: z.string().optional(),
}).passthrough();

const InputsSchema = z.object({
  policy: z.string().optional(),
  overwriteExistingContent: z.boolean().optional(),
  resetOnDelete: z.boolean().optional(),
});

/** Swamp extension model for a Tailscale policy file. Registered at `@swamp/tailscale/policy-file`. */
export const model = {
  type: "@swamp/tailscale/policy-file",
  version: "2026.10.02.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Policy file state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    result: {
      description:
        "The response of the most recent run of each action that returns data",
      schema: z.record(z.string(), z.unknown()),
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description:
        "Replace the policy file; refuses to overwrite an edited policy unless overwriteExistingContent is set",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["policy"], "create");
        // "ts-default" only matches a policy file nobody has edited yet.
        const resp = await apiRequest(
          g,
          "POST",
          expandPath("/tailnet/{tailnet}/acl", g),
          {
            rawBody: g.policy,
            contentType: "application/hujson",
            headers: g.overwriteExistingContent
              ? {}
              : { "If-Match": '"ts-default"' },
            allowStatus: [412],
          },
        );
        if (resp.status === 412) {
          throw new Error(
            "The tailnet's policy file has been edited, so create will not replace it. Run get to adopt the current policy and then update, or set overwriteExistingContent to replace it.",
          );
        }
        // Ask for HuJSON so comments and formatting survive.
        const read = await apiRequest(
          g,
          "GET",
          expandPath("/tailnet/{tailnet}/acl", g),
          { accept: "application/hujson", raw: true },
        );
        const result = {
          policy: String(read.data ?? ""),
          etag: read.headers.get("ETag") ?? undefined,
        };
        const handle = await context.writeResource("state", "current", result);
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Read the current policy file into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        // Ask for HuJSON so comments and formatting survive.
        const read = await apiRequest(
          g,
          "GET",
          expandPath("/tailnet/{tailnet}/acl", g),
          { accept: "application/hujson", raw: true },
        );
        const result = {
          policy: String(read.data ?? ""),
          etag: read.headers.get("ETag") ?? undefined,
        };
        const handle = await context.writeResource("state", "current", result);
        return { dataHandles: [handle] };
      },
    },
    update: {
      description:
        "Replace the policy file; refuses if it changed since the last get or sync",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["policy"], "update");
        const stored = await requireStored(
          context,
          "current",
          "run create or get first",
        );
        if (!stored.etag) {
          throw new Error(
            "No ETag is stored for the policy file, so update cannot check it has not changed. Run get or sync first.",
          );
        }
        const resp = await apiRequest(
          g,
          "POST",
          expandPath("/tailnet/{tailnet}/acl", g),
          {
            rawBody: g.policy,
            contentType: "application/hujson",
            headers: { "If-Match": String(stored.etag) },
            allowStatus: [412],
          },
        );
        if (resp.status === 412) {
          throw new Error(
            "The policy file changed since the last get or sync. Run sync, reconcile the changes into the policy argument, then update again.",
          );
        }
        // Ask for HuJSON so comments and formatting survive.
        const read = await apiRequest(
          g,
          "GET",
          expandPath("/tailnet/{tailnet}/acl", g),
          { accept: "application/hujson", raw: true },
        );
        const result = {
          policy: String(read.data ?? ""),
          etag: read.headers.get("ETag") ?? undefined,
        };
        const handle = await context.writeResource("state", "current", result);
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description:
        "Stop managing the policy file; resets it to the default only when resetOnDelete is set",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        if (!g.resetOnDelete) {
          context.logger.warning(
            "The policy file was left unchanged: deleting policy_file only removes it from swamp. Set resetOnDelete to reset the policy to the default instead.",
          );
          const handle = await context.writeResource("state", "current", {
            status: "unmanaged",
            deletedAt: new Date().toISOString(),
          });
          return { dataHandles: [handle] };
        }
        // An empty policy file resets the tailnet to the default policy.
        await apiRequest(g, "POST", expandPath("/tailnet/{tailnet}/acl", g), {
          rawBody: "",
          contentType: "application/hujson",
        });
        const handle = await context.writeResource("state", "current", {
          status: "reset",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Refresh the policy file from Tailscale",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        // Ask for HuJSON so comments and formatting survive.
        const read = await apiRequest(
          g,
          "GET",
          expandPath("/tailnet/{tailnet}/acl", g),
          { accept: "application/hujson", raw: true },
        );
        const result = {
          policy: String(read.data ?? ""),
          etag: read.headers.get("ETag") ?? undefined,
        };
        const handle = await context.writeResource("state", "current", result);
        return { dataHandles: [handle] };
      },
    },
    preview: {
      description:
        "Preview which rules in the policy match a user or an IP:port",
      arguments: z.object({
        type: z.enum(["user", "ipport"]).describe(
          "Specify for which type of resource (user or IP port) matching rules are to be fetched.\nRead about [previewing changes in the admin console](https://tailscale.com/docs/features/tailnet-policy-file/manage-tailnet-policies#preview-changes).\n\nOAuth Scope: `policy_file:read`.",
        ).optional(),
        previewFor: z.string().describe(
          "- If `type` is `user`, provide the email of a valid user with registered machines.\n- If `type` is `ipport`, provide an IP address + port: `10.0.0.1:80`.\n\nThe supplied policy file is queried with this parameter to determine which rules match.",
        ).optional(),
      }),
      execute: async (
        args: { type?: string; previewFor?: string },
        context: any,
      ) => {
        const g = context.globalArgs;
        requireArgs(g, ["policy"], "preview");
        const resp = await apiRequest(
          g,
          "POST",
          expandPath("/tailnet/{tailnet}/acl/preview", g),
          {
            rawBody: g.policy,
            contentType: "application/hujson",
            query: { type: args.type, previewFor: args.previewFor },
          },
        );
        const data = resp.data && typeof resp.data === "object" &&
            !Array.isArray(resp.data)
          ? resp.data as Record<string, unknown>
          : { value: resp.data ?? null };
        const handle = await context.writeResource(
          "result",
          instanceName(`result-preview`),
          data,
        );
        return { dataHandles: [handle] };
      },
    },
    validate: {
      description: "Validate the policy and run its tests without saving it",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["policy"], "validate");
        const resp = await apiRequest(
          g,
          "POST",
          expandPath("/tailnet/{tailnet}/acl/validate", g),
          { rawBody: g.policy, contentType: "application/hujson" },
        );
        const data = resp.data && typeof resp.data === "object" &&
            !Array.isArray(resp.data)
          ? resp.data as Record<string, unknown>
          : { value: resp.data ?? null };
        const handle = await context.writeResource(
          "result",
          instanceName(`result-validate`),
          data,
        );
        return { dataHandles: [handle] };
      },
    },
  },
};
