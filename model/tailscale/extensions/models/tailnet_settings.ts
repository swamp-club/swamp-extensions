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

// Auto-generated extension model for @swamp/tailscale/tailnet-settings
// Do not edit manually. Re-generate with: deno task generate:tailscale

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Tailscale tailnet settings.
 *
 * Tailnet-wide settings such as device approval, key expiry and HTTPS
 * certificates. Deleting the model leaves the settings as they are.
 *
 * Methods: `create`, `get`, `update`, `delete`, `sync`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  apiRequest,
  expandPath,
  pickDefined,
  readRequired,
} from "./_lib/tailscale.ts";

const GlobalArgsSchema = z.object({
  aclsExternallyManagedOn: z.boolean().nullable().describe(
    "Prevents users from editing policies in the admin console to avoid conflicts with external management workflows like GitOps or Terraform.",
  ).optional(),
  aclsExternalLink: z.string().describe(
    "Link to the external tailnet policy definition or management solution for this tailnet.",
  ).optional(),
  devicesApprovalOn: z.boolean().nullable().describe(
    "Whether [device approval](/docs/features/access-control/device-management/device-approval) is enabled for the tailnet.",
  ).optional(),
  devicesAutoUpdatesOn: z.boolean().nullable().describe(
    "Whether [auto updates](/docs/features/client/update#auto-updates) are enabled for devices that belong to this tailnet.",
  ).optional(),
  devicesKeyDurationDays: z.number().int().describe(
    "The [key expiry](/docs/features/access-control/key-expiry) duration for devices on this tailnet.",
  ).optional(),
  usersApprovalOn: z.boolean().nullable().describe(
    "Whether [user approval](/docs/features/access-control/user-approval) is enabled for this tailnet.",
  ).optional(),
  usersRoleAllowedToJoinExternalTailnets: z.enum(["none", "admin", "member"])
    .describe(
      "Which user roles are allowed to [join external tailnets](/docs/features/sharing/how-to/invite-any-user).",
    ).optional(),
  networkFlowLoggingOn: z.boolean().nullable().describe(
    "Whether [network flog logs](/docs/features/logging/network-flow-logs) are enabled for the tailnet.",
  ).optional(),
  routeSelection: z.enum([
    "active-passive-failover",
    "regional-routing",
    "regional-routing-failover",
  ]).describe(
    'The [route selection](/docs/how-to/set-up-high-availability) algorithm used by the tailnet:\n* `active-passive-failover` - Active-passive failover (formerly known as "Failover")\n* `regional-routing` - Regional routing\n* `regional-routing-failover` - Regional routing with in-region failover\n\nA PATCH request must not specify both the `regionalRoutingOn` and `routeSelection` fields.',
  ).optional(),
  postureIdentityCollectionOn: z.boolean().nullable().describe(
    "Whether [identity collection](/docs/features/access-control/device-management/how-to/manage-identity) is enabled for [device posture](/docs/features/device-posture) integrations for the tailnet.",
  ).optional(),
  httpsEnabled: z.boolean().nullable().describe(
    "Whether provisioning of [HTTPS certificates](/docs/how-to/set-up-https-certificates) is enabled for this tailnet.",
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
  aclsExternallyManagedOn: z.boolean().nullable().optional(),
  aclsExternalLink: z.string().optional(),
  devicesApprovalOn: z.boolean().nullable().optional(),
  devicesAutoUpdatesOn: z.boolean().nullable().optional(),
  devicesKeyDurationDays: z.number().optional(),
  usersApprovalOn: z.boolean().nullable().optional(),
  usersRoleAllowedToJoinExternalTailnets: z.string().optional(),
  networkFlowLoggingOn: z.boolean().nullable().optional(),
  regionalRoutingOn: z.boolean().nullable().optional(),
  routeSelection: z.string().optional(),
  postureIdentityCollectionOn: z.boolean().nullable().optional(),
  httpsEnabled: z.boolean().nullable().optional(),
}).passthrough();

const InputsSchema = z.object({
  aclsExternallyManagedOn: z.boolean().nullable().optional(),
  aclsExternalLink: z.string().optional(),
  devicesApprovalOn: z.boolean().nullable().optional(),
  devicesAutoUpdatesOn: z.boolean().nullable().optional(),
  devicesKeyDurationDays: z.number().int().optional(),
  usersApprovalOn: z.boolean().nullable().optional(),
  usersRoleAllowedToJoinExternalTailnets: z.enum(["none", "admin", "member"])
    .optional(),
  networkFlowLoggingOn: z.boolean().nullable().optional(),
  routeSelection: z.enum([
    "active-passive-failover",
    "regional-routing",
    "regional-routing-failover",
  ]).optional(),
  postureIdentityCollectionOn: z.boolean().nullable().optional(),
  httpsEnabled: z.boolean().nullable().optional(),
});

/** Swamp extension model for a Tailscale tailnet settings. Registered at `@swamp/tailscale/tailnet-settings`. */
export const model = {
  type: "@swamp/tailscale/tailnet-settings",
  version: "2026.10.09.1",
  upgrades: [
    {
      toVersion: "2026.10.08.1",
      description: "Added: routeSelection. Removed: regionalRoutingOn",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { regionalRoutingOn: _regionalRoutingOn, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.10.09.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Tailnet settings state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Apply the tailnet settings from the global arguments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const body: Record<string, unknown> = pickDefined(g, [
          "aclsExternallyManagedOn",
          "aclsExternalLink",
          "devicesApprovalOn",
          "devicesAutoUpdatesOn",
          "devicesKeyDurationDays",
          "usersApprovalOn",
          "usersRoleAllowedToJoinExternalTailnets",
          "networkFlowLoggingOn",
          "routeSelection",
          "postureIdentityCollectionOn",
          "httpsEnabled",
        ]);
        await apiRequest(
          g,
          "PATCH",
          expandPath("/tailnet/{tailnet}/settings", g),
          { body },
        );
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/settings", g),
        );
        const handle = await context.writeResource("state", "current", result);
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Read the current tailnet settings into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/settings", g),
        );
        const handle = await context.writeResource("state", "current", result);
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Apply the tailnet settings from the global arguments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const body: Record<string, unknown> = pickDefined(g, [
          "aclsExternallyManagedOn",
          "aclsExternalLink",
          "devicesApprovalOn",
          "devicesAutoUpdatesOn",
          "devicesKeyDurationDays",
          "usersApprovalOn",
          "usersRoleAllowedToJoinExternalTailnets",
          "networkFlowLoggingOn",
          "routeSelection",
          "postureIdentityCollectionOn",
          "httpsEnabled",
        ]);
        await apiRequest(
          g,
          "PATCH",
          expandPath("/tailnet/{tailnet}/settings", g),
          { body },
        );
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/settings", g),
        );
        const handle = await context.writeResource("state", "current", result);
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description:
        "Stop managing the tailnet settings; Tailscale keeps the current values",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        context.logger.warning(
          "Tailnet settings were left unchanged: deleting tailnet_settings only removes it from swamp. Change any setting you want reverted with update, or in the admin console.",
        );
        const handle = await context.writeResource("state", "current", {
          status: "unmanaged",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Refresh the tailnet settings from Tailscale",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/settings", g),
        );
        const handle = await context.writeResource("state", "current", result);
        return { dataHandles: [handle] };
      },
    },
  },
};
