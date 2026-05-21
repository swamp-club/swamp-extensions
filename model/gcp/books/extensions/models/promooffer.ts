// Auto-generated extension model for @swamp/gcp/books/promooffer
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Books Promooffer.
 *
 * Returns a list of promo offers available to the user
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://books.googleapis.com/";

const GET_CONFIG = {
  "id": "books.promooffer.get",
  "path": "books/v1/promooffer/get",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "androidId": {
      "location": "query",
    },
    "device": {
      "location": "query",
    },
    "manufacturer": {
      "location": "query",
    },
    "model": {
      "location": "query",
    },
    "product": {
      "location": "query",
    },
    "serial": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  items: z.array(z.object({
    artUrl: z.string(),
    gservicesKey: z.string(),
    id: z.string(),
    items: z.array(z.object({
      author: z.string(),
      canonicalVolumeLink: z.string(),
      coverUrl: z.string(),
      description: z.string(),
      title: z.string(),
      volumeId: z.string(),
    })),
  })).optional(),
  kind: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Books Promooffer. Registered at `@swamp/gcp/books/promooffer`. */
export const model = {
  type: "@swamp/gcp/books/promooffer",
  version: "2026.05.21.2",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.2",
      description: "No schema changes",
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
      toVersion: "2026.04.03.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Returns a list of promo offers available to the user",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a promooffer",
      arguments: z.object({
        identifier: z.string().describe("The name of the promooffer"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
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
    sync: {
      description: "Sync promooffer state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        try {
          const params: Record<string, string> = { project: projectId };
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
          ) as StateData;
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        } catch (error: unknown) {
          if (isResourceNotFoundError(error)) {
            const handle = await context.writeResource("state", instanceName, {
              status: "not_found",
              syncedAt: new Date().toISOString(),
            });
            return { dataHandles: [handle] };
          }
          throw error;
        }
      },
    },
    accept: {
      description: "accept",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "books.promooffer.accept",
            "path": "books/v1/promooffer/accept",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {
              "androidId": { "location": "query" },
              "device": { "location": "query" },
              "manufacturer": { "location": "query" },
              "model": { "location": "query" },
              "offerId": { "location": "query" },
              "product": { "location": "query" },
              "serial": { "location": "query" },
              "volumeId": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    dismiss: {
      description: "dismiss",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "books.promooffer.dismiss",
            "path": "books/v1/promooffer/dismiss",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {
              "androidId": { "location": "query" },
              "device": { "location": "query" },
              "manufacturer": { "location": "query" },
              "model": { "location": "query" },
              "offerId": { "location": "query" },
              "product": { "location": "query" },
              "serial": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
