// Auto-generated extension model for @swamp/gcp/dns/policies
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud DNS Policies.
 *
 * A policy is a collection of DNS rules applied to one or more Virtual Private Cloud resources.
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

const BASE_URL = "https://dns.googleapis.com/";

const GET_CONFIG = {
  "id": "dns.policies.get",
  "path": "dns/v1/projects/{project}/policies/{policy}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "policy",
  ],
  "parameters": {
    "clientOperationId": {
      "location": "query",
    },
    "policy": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "dns.policies.create",
  "path": "dns/v1/projects/{project}/policies",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
  ],
  "parameters": {
    "clientOperationId": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "dns.policies.update",
  "path": "dns/v1/projects/{project}/policies/{policy}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "project",
    "policy",
  ],
  "parameters": {
    "clientOperationId": {
      "location": "query",
    },
    "policy": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "dns.policies.delete",
  "path": "dns/v1/projects/{project}/policies/{policy}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "policy",
  ],
  "parameters": {
    "clientOperationId": {
      "location": "query",
    },
    "policy": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "dns.policies.list",
  "path": "dns/v1/projects/{project}/policies",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
  ],
  "parameters": {
    "maxResults": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  alternativeNameServerConfig: z.object({
    kind: z.string().optional(),
    targetNameServers: z.array(z.object({
      forwardingPath: z.enum(["default", "private"]).describe(
        "Forwarding path for this TargetNameServer. If unset or set to DEFAULT, Cloud DNS makes forwarding decisions based on address ranges; that is, RFC1918 addresses go to the VPC network, non-RFC1918 addresses go to the internet. When set to PRIVATE, Cloud DNS always sends queries through the VPC network for this target.",
      ).optional(),
      ipv4Address: z.string().describe("IPv4 address to forward queries to.")
        .optional(),
      ipv6Address: z.string().describe(
        "IPv6 address to forward to. Does not accept both fields (ipv4 & ipv6) being populated. Public preview as of November 2022.",
      ).optional(),
      kind: z.string().optional(),
    })).describe(
      "Sets an alternative name server for the associated networks. When specified, all DNS queries are forwarded to a name server that you choose. Names such as.internal are not available when an alternative name server is specified.",
    ).optional(),
  }).optional(),
  description: z.string().describe(
    "A mutable string of at most 1024 characters associated with this resource for the user's convenience. Has no effect on the policy's function.",
  ).optional(),
  dns64Config: z.object({
    kind: z.string().optional(),
    scope: z.object({
      allQueries: z.boolean().describe(
        "Controls whether DNS64 is enabled globally for all networks bound to the policy.",
      ).optional(),
      kind: z.string().optional(),
    }).optional(),
  }).describe("DNS64 policies").optional(),
  enableInboundForwarding: z.boolean().describe(
    "Allows networks bound to this policy to receive DNS queries sent by VMs or applications over VPN connections. When enabled, a virtual IP address is allocated from each of the subnetworks that are bound to this policy.",
  ).optional(),
  enableLogging: z.boolean().describe(
    "Controls whether logging is enabled for the networks bound to this policy. Defaults to no logging if not set.",
  ).optional(),
  name: z.string().describe("User-assigned name for this policy.").optional(),
  networks: z.array(z.object({
    kind: z.string().optional(),
    networkUrl: z.string().describe(
      "The fully qualified URL of the VPC network to bind to. This should be formatted like https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}",
    ).optional(),
  })).describe(
    "List of network names specifying networks to which this policy is applied.",
  ).optional(),
  clientOperationId: z.string().describe(
    "For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.",
  ).optional(),
});

const StateSchema = z.object({
  alternativeNameServerConfig: z.object({
    kind: z.string(),
    targetNameServers: z.array(z.object({
      forwardingPath: z.string(),
      ipv4Address: z.string(),
      ipv6Address: z.string(),
      kind: z.string(),
    })),
  }).optional(),
  description: z.string().optional(),
  dns64Config: z.object({
    kind: z.string(),
    scope: z.object({
      allQueries: z.boolean(),
      kind: z.string(),
    }),
  }).optional(),
  enableInboundForwarding: z.boolean().optional(),
  enableLogging: z.boolean().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  name: z.string(),
  networks: z.array(z.object({
    kind: z.string(),
    networkUrl: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  alternativeNameServerConfig: z.object({
    kind: z.string().optional(),
    targetNameServers: z.array(z.object({
      forwardingPath: z.enum(["default", "private"]).describe(
        "Forwarding path for this TargetNameServer. If unset or set to DEFAULT, Cloud DNS makes forwarding decisions based on address ranges; that is, RFC1918 addresses go to the VPC network, non-RFC1918 addresses go to the internet. When set to PRIVATE, Cloud DNS always sends queries through the VPC network for this target.",
      ).optional(),
      ipv4Address: z.string().describe("IPv4 address to forward queries to.")
        .optional(),
      ipv6Address: z.string().describe(
        "IPv6 address to forward to. Does not accept both fields (ipv4 & ipv6) being populated. Public preview as of November 2022.",
      ).optional(),
      kind: z.string().optional(),
    })).describe(
      "Sets an alternative name server for the associated networks. When specified, all DNS queries are forwarded to a name server that you choose. Names such as.internal are not available when an alternative name server is specified.",
    ).optional(),
  }).optional(),
  description: z.string().describe(
    "A mutable string of at most 1024 characters associated with this resource for the user's convenience. Has no effect on the policy's function.",
  ).optional(),
  dns64Config: z.object({
    kind: z.string().optional(),
    scope: z.object({
      allQueries: z.boolean().describe(
        "Controls whether DNS64 is enabled globally for all networks bound to the policy.",
      ).optional(),
      kind: z.string().optional(),
    }).optional(),
  }).describe("DNS64 policies").optional(),
  enableInboundForwarding: z.boolean().describe(
    "Allows networks bound to this policy to receive DNS queries sent by VMs or applications over VPN connections. When enabled, a virtual IP address is allocated from each of the subnetworks that are bound to this policy.",
  ).optional(),
  enableLogging: z.boolean().describe(
    "Controls whether logging is enabled for the networks bound to this policy. Defaults to no logging if not set.",
  ).optional(),
  name: z.string().describe("User-assigned name for this policy.").optional(),
  networks: z.array(z.object({
    kind: z.string().optional(),
    networkUrl: z.string().describe(
      "The fully qualified URL of the VPC network to bind to. This should be formatted like https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}",
    ).optional(),
  })).describe(
    "List of network names specifying networks to which this policy is applied.",
  ).optional(),
  clientOperationId: z.string().describe(
    "For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.",
  ).optional(),
});

/** Swamp extension model for Google Cloud DNS Policies. Registered at `@swamp/gcp/dns/policies`. */
export const model = {
  type: "@swamp/gcp/dns/policies",
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
      description:
        "A policy is a collection of DNS rules applied to one or more Virtual Private ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a policies",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["alternativeNameServerConfig"] !== undefined) {
          body["alternativeNameServerConfig"] =
            g["alternativeNameServerConfig"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["dns64Config"] !== undefined) {
          body["dns64Config"] = g["dns64Config"];
        }
        if (g["enableInboundForwarding"] !== undefined) {
          body["enableInboundForwarding"] = g["enableInboundForwarding"];
        }
        if (g["enableLogging"] !== undefined) {
          body["enableLogging"] = g["enableLogging"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["networks"] !== undefined) body["networks"] = g["networks"];
        if (g["clientOperationId"] !== undefined) {
          body["clientOperationId"] = g["clientOperationId"];
        }
        if (g["name"] !== undefined) params["policy"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "project": projectId },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
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
      description: "Get a policies",
      arguments: z.object({
        identifier: z.string().describe("The name of the policies"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["policy"] = args.identifier;
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
      description: "Update policies attributes",
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
        params["policy"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["alternativeNameServerConfig"] !== undefined) {
          body["alternativeNameServerConfig"] =
            g["alternativeNameServerConfig"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["dns64Config"] !== undefined) {
          body["dns64Config"] = g["dns64Config"];
        }
        if (g["enableInboundForwarding"] !== undefined) {
          body["enableInboundForwarding"] = g["enableInboundForwarding"];
        }
        if (g["enableLogging"] !== undefined) {
          body["enableLogging"] = g["enableLogging"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["networks"] !== undefined) body["networks"] = g["networks"];
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
          UPDATE_CONFIG,
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
      description: "Delete the policies",
      arguments: z.object({
        identifier: z.string().describe("The name of the policies"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["policy"] = args.identifier;
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
      description: "Sync policies state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["policy"] = identifier;
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
  },
};
