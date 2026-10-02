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

// Auto-generated extension model for @swamp/tailscale/user
// Do not edit manually. Re-generate with: deno task generate:tailscale

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Tailscale user.
 *
 * A user in the tailnet. Users join by signing in, so they cannot be created
 * here (invite them with user_invite): find them with list and adopt them by
 * ID.
 *
 * Methods: `get`, `delete`, `list`, `adopt`, `set_role`, `approve`, `suspend`, `restore`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  apiRequest,
  expandPath,
  instanceName,
  pickDefined,
  readOptional,
  readRequired,
  unwrapList,
} from "./_lib/tailscale.ts";

const GlobalArgsSchema = z.object({
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
  id: z.string().optional(),
  displayName: z.string().optional(),
  loginName: z.string().optional(),
  profilePicUrl: z.string().optional(),
  tailnetId: z.string().optional(),
  created: z.string().optional(),
  type: z.string().optional(),
  role: z.string().optional(),
  status: z.string().optional(),
  deviceCount: z.number().optional(),
  lastSeen: z.string().optional(),
  currentlyConnected: z.boolean().optional(),
}).passthrough();

const InputsSchema = z.object({});

/** Swamp extension model for a Tailscale user. Registered at `@swamp/tailscale/user`. */
export const model = {
  type: "@swamp/tailscale/user",
  version: "2026.10.02.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "User state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get an user by ID",
      arguments: z.object({ id: z.string().describe("The user's ID") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const result = await readRequired(
          g,
          expandPath("/users/{userId}", g, { userId: args.id }),
        );
        const handle = await context.writeResource(
          "state",
          instanceName(result.id ?? args.id, "unknown"),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the user from the tailnet",
      arguments: z.object({ id: z.string().describe("The user's ID") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        // Read first so the record lands on the instance get, adopt and list wrote.
        const current = await readOptional(
          g,
          expandPath("/users/{userId}", g, { userId: args.id }),
        );
        const resp = await apiRequest(
          g,
          "POST",
          expandPath("/users/{userId}/delete", g, { userId: args.id }),
          { allowStatus: [404] },
        );
        const existed = resp.status !== 404;
        const handle = await context.writeResource(
          "state",
          instanceName(current?.id ?? args.id),
          {
            id: args.id,
            existed,
            status: existed ? "deleted" : "not_found",
            deletedAt: new Date().toISOString(),
          },
        );
        return { dataHandles: [handle] };
      },
    },
    list: {
      description: "List users in the tailnet and write each to state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const resp = await apiRequest(
          g,
          "GET",
          expandPath("/tailnet/{tailnet}/users", g),
        );
        const items = unwrapList(resp.data, "users");
        const dataHandles: any[] = [];
        for (const item of items) {
          dataHandles.push(
            await context.writeResource(
              "state",
              instanceName(item.id ?? item.id ?? "unknown", "unknown"),
              item,
            ),
          );
        }
        return { dataHandles };
      },
    },
    adopt: {
      description: "Adopt an existing user by ID into managed state",
      arguments: z.object({
        id: z.string().describe("The ID of the user to adopt"),
        expected_name: z.string().describe(
          "Expected loginName, checked before adopting",
        ).optional(),
      }),
      execute: async (
        args: { id: string; expected_name?: string },
        context: any,
      ) => {
        const g = context.globalArgs;
        const result = await readRequired(
          g,
          expandPath("/users/{userId}", g, { userId: args.id }),
        );
        if (
          args.expected_name !== undefined &&
          result.loginName !== args.expected_name
        ) {
          throw new Error(
            `Identity mismatch: expected loginName=${args.expected_name} but got ${result.loginName}`,
          );
        }
        const handle = await context.writeResource(
          "state",
          instanceName(result.id ?? args.id, "unknown"),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    set_role: {
      description: "Change the user's role",
      arguments: z.object({
        id: z.string().describe("The user's ID"),
        role: z.enum([
          "owner",
          "member",
          "admin",
          "it-admin",
          "network-admin",
          "billing-admin",
          "auditor",
        ]).describe(
          "The role of the user. Learn more about [user roles](/docs/reference/user-roles).",
        ).optional(),
      }),
      execute: async (args: { id?: string; role?: string }, context: any) => {
        const g = context.globalArgs;
        const resp = await apiRequest(
          g,
          "POST",
          expandPath("/users/{userId}/role", g, { userId: args.id }),
          { body: pickDefined(args, ["role"]) },
        );
        void resp;
        const result = await readRequired(
          g,
          expandPath("/users/{userId}", g, { userId: args.id }),
        );
        const handle = await context.writeResource(
          "state",
          instanceName(result.id ?? args.id, "unknown"),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    approve: {
      description: "Approve a user waiting for approval",
      arguments: z.object({ id: z.string().describe("The user's ID") }),
      execute: async (args: { id?: string }, context: any) => {
        const g = context.globalArgs;
        const resp = await apiRequest(
          g,
          "POST",
          expandPath("/users/{userId}/approve", g, { userId: args.id }),
        );
        void resp;
        const result = await readRequired(
          g,
          expandPath("/users/{userId}", g, { userId: args.id }),
        );
        const handle = await context.writeResource(
          "state",
          instanceName(result.id ?? args.id, "unknown"),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    suspend: {
      description: "Suspend the user",
      arguments: z.object({ id: z.string().describe("The user's ID") }),
      execute: async (args: { id?: string }, context: any) => {
        const g = context.globalArgs;
        const resp = await apiRequest(
          g,
          "POST",
          expandPath("/users/{userId}/suspend", g, { userId: args.id }),
        );
        void resp;
        const result = await readRequired(
          g,
          expandPath("/users/{userId}", g, { userId: args.id }),
        );
        const handle = await context.writeResource(
          "state",
          instanceName(result.id ?? args.id, "unknown"),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    restore: {
      description: "Restore a suspended user",
      arguments: z.object({ id: z.string().describe("The user's ID") }),
      execute: async (args: { id?: string }, context: any) => {
        const g = context.globalArgs;
        const resp = await apiRequest(
          g,
          "POST",
          expandPath("/users/{userId}/restore", g, { userId: args.id }),
        );
        void resp;
        const result = await readRequired(
          g,
          expandPath("/users/{userId}", g, { userId: args.id }),
        );
        const handle = await context.writeResource(
          "state",
          instanceName(result.id ?? args.id, "unknown"),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
  },
};
