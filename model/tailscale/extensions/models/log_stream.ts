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

// Auto-generated extension model for @swamp/tailscale/log-stream
// Do not edit manually. Re-generate with: deno task generate:tailscale

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Tailscale log stream.
 *
 * Log streaming of a tailnet's configuration or network flow logs to an
 * external destination. create refuses to overwrite a log stream that is
 * already configured for the log type; adopt it with get instead.
 *
 * Methods: `create`, `get`, `update`, `delete`, `sync`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  apiRequest,
  expandPath,
  fillUnset,
  instanceName,
  pickDefined,
  readOptional,
  readRequired,
  requireArgs,
} from "./_lib/tailscale.ts";

const GlobalArgsSchema = z.object({
  destinationType: z.enum([
    "splunk",
    "elastic",
    "panther",
    "cribl",
    "crowdstrike",
    "datadog",
    "axiom",
    "s3",
  ]).describe("The type of system to which logs are being streamed.")
    .optional(),
  url: z.string().describe(
    "The URL to which log streams are being posted. If the DestinationType is `s3`, the URL may be (and often is) empty to use the official Amazon S3 endpoint.",
  ).optional(),
  user: z.string().describe(
    "The username with which log streams to this endpoint are authenticated.",
  ).optional(),
  uploadPeriodMinutes: z.number().int().describe(
    "An optional number of minutes to wait in between uploading new logs. If the quantity of logs does not fit within a single upload, multiple uploads will be made.",
  ).optional(),
  compressionFormat: z.enum(["zstd", "gzip", "none"]).describe(
    "The compression algorithm with which to compress logs. `none` disables compression. Defaults to `none`.",
  ).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "The token/password with which log streams to this endpoint should be authenticated.",
  ).optional(),
  s3Bucket: z.string().describe(
    "The S3 bucket name. Required if the destinationType is `s3`.",
  ).optional(),
  s3Region: z.string().describe(
    "The region in which the S3 bucket is located. Required if the destinationType is `s3`.",
  ).optional(),
  s3KeyPrefix: z.string().describe(
    "An optional S3 key prefix to prepend to the auto-generated S3 key name.",
  ).optional(),
  s3AuthenticationType: z.enum(["accesskey", "rolearn"]).describe(
    "What type of authentication to use for S3. Required if the destinationType is `s3`. Tailscale recommends using `rolearn`. See [Amazon documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_third-party.html).",
  ).optional(),
  s3AccessKeyId: z.string().describe(
    "The S3 access key ID. Required if the destinationType is `s3` and `authenticationType` is `accesskey`.",
  ).optional(),
  s3SecretAccessKey: z.string().meta({ sensitive: true }).describe(
    "The S3 secret access key. Required if the destinationType is `s3` and `authenticationType` is `accesskey`.",
  ).optional(),
  s3RoleArn: z.string().describe(
    "The Role ARN that Tailscale should supply to AWS when authenticating using role-based authentication. Required if the destinationType is `s3` and `authenticationType` is `rolearn`.",
  ).optional(),
  gcsBucket: z.string().describe(
    "The GCS bucket name. Required if the destinationType is `gcs`.",
  ).optional(),
  gcsKeyPrefix: z.string().describe(
    "An optional GCS key prefix to append to the GCS bucket name.",
  ).optional(),
  gcsScopes: z.array(z.string()).describe(
    "The GCS scopes needed to be able to write to the GCS bucket.",
  ).optional(),
  gcsCredentials: z.string().meta({ sensitive: true }).describe(
    "The JSON workload identity credentials from GCS needed for accessing the GCS account.",
  ).optional(),
  logType: z.enum(["configuration", "network"]).describe("The type of log."),
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
  logType: z.string().optional(),
  destinationType: z.string().optional(),
  url: z.string().optional(),
  user: z.string().optional(),
  uploadPeriodMinutes: z.number().optional(),
  compressionFormat: z.string().optional(),
  s3Bucket: z.string().optional(),
  s3Region: z.string().optional(),
  s3KeyPrefix: z.string().optional(),
  s3AuthenticationType: z.string().optional(),
  s3AccessKeyId: z.string().optional(),
  s3RoleArn: z.string().optional(),
  s3ExternalId: z.string().optional(),
  gcsBucket: z.string().optional(),
  gcsKeyPrefix: z.string().optional(),
  gcsScopes: z.array(z.string()).optional(),
  gcsCredentials: z.string().optional(),
}).passthrough();

const InputsSchema = z.object({
  destinationType: z.enum([
    "splunk",
    "elastic",
    "panther",
    "cribl",
    "crowdstrike",
    "datadog",
    "axiom",
    "s3",
  ]).optional(),
  url: z.string().optional(),
  user: z.string().optional(),
  uploadPeriodMinutes: z.number().int().optional(),
  compressionFormat: z.enum(["zstd", "gzip", "none"]).optional(),
  token: z.string().meta({ sensitive: true }).optional(),
  s3Bucket: z.string().optional(),
  s3Region: z.string().optional(),
  s3KeyPrefix: z.string().optional(),
  s3AuthenticationType: z.enum(["accesskey", "rolearn"]).optional(),
  s3AccessKeyId: z.string().optional(),
  s3SecretAccessKey: z.string().meta({ sensitive: true }).optional(),
  s3RoleArn: z.string().optional(),
  gcsBucket: z.string().optional(),
  gcsKeyPrefix: z.string().optional(),
  gcsScopes: z.array(z.string()).optional(),
  gcsCredentials: z.string().meta({ sensitive: true }).optional(),
  logType: z.enum(["configuration", "network"]).optional(),
});

/** Swamp extension model for a Tailscale log stream. Registered at `@swamp/tailscale/log-stream`. */
export const model = {
  type: "@swamp/tailscale/log-stream",
  version: "2026.10.02.2",
  upgrades: [
    {
      toVersion: "2026.10.02.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Log stream state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description:
        "Create the log stream; fails if one already exists for logType",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["logType"], "create");
        // Advisory only: the PUT is an unconditional upsert, so two
        // concurrent creates can both pass this check and the later write wins.
        const existing = await readOptional(
          g,
          expandPath("/tailnet/{tailnet}/logging/{logType}/stream", g, {
            logType: g.logType,
          }),
        );
        if (
          existing && existing.destinationType !== undefined &&
          existing.destinationType !== null && existing.destinationType !== ""
        ) {
          throw new Error(
            `A log stream already exists for logType=${g.logType}. Run get to adopt it, then update.`,
          );
        }
        await apiRequest(
          g,
          "PUT",
          expandPath("/tailnet/{tailnet}/logging/{logType}/stream", g, {
            logType: g.logType,
          }),
          {
            body: pickDefined(g, [
              "destinationType",
              "url",
              "user",
              "uploadPeriodMinutes",
              "compressionFormat",
              "token",
              "s3Bucket",
              "s3Region",
              "s3KeyPrefix",
              "s3AuthenticationType",
              "s3AccessKeyId",
              "s3SecretAccessKey",
              "s3RoleArn",
              "gcsBucket",
              "gcsKeyPrefix",
              "gcsScopes",
              "gcsCredentials",
            ]),
          },
        );
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/logging/{logType}/stream", g, {
            logType: g.logType,
          }),
        );
        const handle = await context.writeResource(
          "state",
          instanceName(g.logType),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get the log stream for logType and write it to state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["logType"], "get");
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/logging/{logType}/stream", g, {
            logType: g.logType,
          }),
        );
        const handle = await context.writeResource(
          "state",
          instanceName(g.logType),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update the log stream from the global arguments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["logType"], "update");
        // PUT replaces the log stream: keep the live value of unset fields.
        const live = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/logging/{logType}/stream", g, {
            logType: g.logType,
          }),
        );
        const body = fillUnset(
          pickDefined(g, [
            "destinationType",
            "url",
            "user",
            "uploadPeriodMinutes",
            "compressionFormat",
            "token",
            "s3Bucket",
            "s3Region",
            "s3KeyPrefix",
            "s3AuthenticationType",
            "s3AccessKeyId",
            "s3SecretAccessKey",
            "s3RoleArn",
            "gcsBucket",
            "gcsKeyPrefix",
            "gcsScopes",
            "gcsCredentials",
          ]),
          live,
          [
            "destinationType",
            "url",
            "user",
            "uploadPeriodMinutes",
            "compressionFormat",
            "s3Bucket",
            "s3Region",
            "s3KeyPrefix",
            "s3AuthenticationType",
            "s3AccessKeyId",
            "s3RoleArn",
            "gcsBucket",
            "gcsKeyPrefix",
            "gcsScopes",
          ],
        );
        await apiRequest(
          g,
          "PUT",
          expandPath("/tailnet/{tailnet}/logging/{logType}/stream", g, {
            logType: g.logType,
          }),
          { body },
        );
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/logging/{logType}/stream", g, {
            logType: g.logType,
          }),
        );
        const handle = await context.writeResource(
          "state",
          instanceName(g.logType),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the log stream",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["logType"], "delete");
        const resp = await apiRequest(
          g,
          "DELETE",
          expandPath("/tailnet/{tailnet}/logging/{logType}/stream", g, {
            logType: g.logType,
          }),
          { allowStatus: [404] },
        );
        const existed = resp.status !== 404;
        const handle = await context.writeResource(
          "state",
          instanceName(g.logType),
          {
            logType: g.logType,
            existed,
            status: existed ? "deleted" : "not_found",
            deletedAt: new Date().toISOString(),
          },
        );
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Refresh the log stream from Tailscale",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["logType"], "sync");
        const result = await readOptional(
          g,
          expandPath("/tailnet/{tailnet}/logging/{logType}/stream", g, {
            logType: g.logType,
          }),
        );
        const handle = await context.writeResource(
          "state",
          instanceName(g.logType),
          result ??
            {
              logType: g.logType,
              status: "not_found",
              syncedAt: new Date().toISOString(),
            },
        );
        return { dataHandles: [handle] };
      },
    },
  },
};
