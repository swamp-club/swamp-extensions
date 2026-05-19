// Auto-generated extension model for @swamp/gcp/recaptchaenterprise/firewallpolicies
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud reCAPTCHA Enterprise Firewallpolicies.
 *
 * A FirewallPolicy represents a single matching pattern and resulting actions to take.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/firewallpolicies/${shortName}`;
}

const BASE_URL = "https://recaptchaenterprise.googleapis.com/";

const GET_CONFIG = {
  "id": "recaptchaenterprise.projects.firewallpolicies.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "recaptchaenterprise.projects.firewallpolicies.create",
  "path": "v1/{+parent}/firewallpolicies",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "recaptchaenterprise.projects.firewallpolicies.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "recaptchaenterprise.projects.firewallpolicies.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  actions: z.array(z.object({
    allow: z.object({}).describe(
      "An allow action continues processing a request unimpeded.",
    ).optional(),
    block: z.object({}).describe(
      "A block action serves an HTTP error code a prevents the request from hitting the backend.",
    ).optional(),
    includeRecaptchaScript: z.object({}).describe(
      "An include reCAPTCHA script action involves injecting reCAPTCHA JavaScript code into the HTML returned by the site backend. This reCAPTCHA script is tasked with collecting user signals on the requested web page, issuing tokens as a cookie within the site domain, and enabling their utilization in subsequent page requests.",
    ).optional(),
    redirect: z.object({}).describe(
      "A redirect action returns a 307 (temporary redirect) response, pointing the user to a reCAPTCHA interstitial page to attach a token.",
    ).optional(),
    setHeader: z.object({
      key: z.string().describe(
        "Optional. The header key to set in the request to the backend server.",
      ).optional(),
      value: z.string().describe(
        "Optional. The header value to set in the request to the backend server.",
      ).optional(),
    }).describe(
      "A set header action sets a header and forwards the request to the backend. This can be used to trigger custom protection implemented on the backend.",
    ).optional(),
    substitute: z.object({
      path: z.string().describe(
        'Optional. The address to redirect to. The target is a relative path in the current host. Example: "/blog/404.html".',
      ).optional(),
    }).describe(
      "A substitute action transparently serves a different page than the one requested.",
    ).optional(),
  })).describe(
    "Optional. The actions that the caller should take regarding user access. There should be at most one terminal action. A terminal action is any action that forces a response, such as `AllowAction`, `BlockAction` or `SubstituteAction`. Zero or more non-terminal actions such as `SetHeader` might be specified. A single policy can contain up to 16 actions.",
  ).optional(),
  condition: z.string().describe(
    "Optional. A CEL (Common Expression Language) conditional expression that specifies if this policy applies to an incoming user request. If this condition evaluates to true and the requested path matched the path pattern, the associated actions should be executed by the caller. The condition string is checked for CEL syntax correctness on creation. For more information, see the [CEL spec](https://github.com/google/cel-spec) and its [language definition](https://github.com/google/cel-spec/blob/master/doc/langdef.md). A condition has a max length of 500 characters.",
  ).optional(),
  description: z.string().describe(
    "Optional. A description of what this policy aims to achieve, for convenience purposes. The description can at most include 256 UTF-8 characters.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name for the FirewallPolicy in the format `projects/{project}/firewallpolicies/{firewallpolicy}`.",
  ).optional(),
  path: z.string().describe(
    "Optional. The path for which this policy applies, specified as a glob pattern. For more information on glob, see the [manual page](https://man7.org/linux/man-pages/man7/glob.7.html). A path has a max length of 200 characters.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  actions: z.array(z.object({
    allow: z.object({}),
    block: z.object({}),
    includeRecaptchaScript: z.object({}),
    redirect: z.object({}),
    setHeader: z.object({
      key: z.string(),
      value: z.string(),
    }),
    substitute: z.object({
      path: z.string(),
    }),
  })).optional(),
  condition: z.string().optional(),
  description: z.string().optional(),
  name: z.string(),
  path: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  actions: z.array(z.object({
    allow: z.object({}).describe(
      "An allow action continues processing a request unimpeded.",
    ).optional(),
    block: z.object({}).describe(
      "A block action serves an HTTP error code a prevents the request from hitting the backend.",
    ).optional(),
    includeRecaptchaScript: z.object({}).describe(
      "An include reCAPTCHA script action involves injecting reCAPTCHA JavaScript code into the HTML returned by the site backend. This reCAPTCHA script is tasked with collecting user signals on the requested web page, issuing tokens as a cookie within the site domain, and enabling their utilization in subsequent page requests.",
    ).optional(),
    redirect: z.object({}).describe(
      "A redirect action returns a 307 (temporary redirect) response, pointing the user to a reCAPTCHA interstitial page to attach a token.",
    ).optional(),
    setHeader: z.object({
      key: z.string().describe(
        "Optional. The header key to set in the request to the backend server.",
      ).optional(),
      value: z.string().describe(
        "Optional. The header value to set in the request to the backend server.",
      ).optional(),
    }).describe(
      "A set header action sets a header and forwards the request to the backend. This can be used to trigger custom protection implemented on the backend.",
    ).optional(),
    substitute: z.object({
      path: z.string().describe(
        'Optional. The address to redirect to. The target is a relative path in the current host. Example: "/blog/404.html".',
      ).optional(),
    }).describe(
      "A substitute action transparently serves a different page than the one requested.",
    ).optional(),
  })).describe(
    "Optional. The actions that the caller should take regarding user access. There should be at most one terminal action. A terminal action is any action that forces a response, such as `AllowAction`, `BlockAction` or `SubstituteAction`. Zero or more non-terminal actions such as `SetHeader` might be specified. A single policy can contain up to 16 actions.",
  ).optional(),
  condition: z.string().describe(
    "Optional. A CEL (Common Expression Language) conditional expression that specifies if this policy applies to an incoming user request. If this condition evaluates to true and the requested path matched the path pattern, the associated actions should be executed by the caller. The condition string is checked for CEL syntax correctness on creation. For more information, see the [CEL spec](https://github.com/google/cel-spec) and its [language definition](https://github.com/google/cel-spec/blob/master/doc/langdef.md). A condition has a max length of 500 characters.",
  ).optional(),
  description: z.string().describe(
    "Optional. A description of what this policy aims to achieve, for convenience purposes. The description can at most include 256 UTF-8 characters.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name for the FirewallPolicy in the format `projects/{project}/firewallpolicies/{firewallpolicy}`.",
  ).optional(),
  path: z.string().describe(
    "Optional. The path for which this policy applies, specified as a glob pattern. For more information on glob, see the [manual page](https://man7.org/linux/man-pages/man7/glob.7.html). A path has a max length of 200 characters.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud reCAPTCHA Enterprise Firewallpolicies. Registered at `@swamp/gcp/recaptchaenterprise/firewallpolicies`. */
export const model = {
  type: "@swamp/gcp/recaptchaenterprise/firewallpolicies",
  version: "2026.05.19.1",
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
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A FirewallPolicy represents a single matching pattern and resulting actions t...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a firewallpolicies",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["actions"] !== undefined) body["actions"] = g["actions"];
        if (g["condition"] !== undefined) body["condition"] = g["condition"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["path"] !== undefined) body["path"] = g["path"];
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a firewallpolicies",
      arguments: z.object({
        identifier: z.string().describe("The name of the firewallpolicies"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
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
      description: "Update firewallpolicies attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["actions"] !== undefined) body["actions"] = g["actions"];
        if (g["condition"] !== undefined) body["condition"] = g["condition"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["path"] !== undefined) body["path"] = g["path"];
        for (const key of Object.keys(existing)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = existing[key];
          }
        }
        const result = await updateResource(
          BASE_URL,
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the firewallpolicies",
      arguments: z.object({
        identifier: z.string().describe("The name of the firewallpolicies"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
        );
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          identifier: args.identifier,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync firewallpolicies state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            shortName,
          );
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
    reorder: {
      description: "reorder",
      arguments: z.object({
        names: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["names"] !== undefined) body["names"] = args["names"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "recaptchaenterprise.projects.firewallpolicies.reorder",
            "path": "v1/{+parent}/firewallpolicies:reorder",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
