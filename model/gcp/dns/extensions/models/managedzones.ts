// Auto-generated extension model for @swamp/gcp/dns/managedzones
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud DNS ManagedZones.
 *
 * A zone is a subtree of the DNS namespace under one administrative responsibility. A ManagedZone is a resource that represents a DNS zone hosted by the Cloud DNS service.
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
  "id": "dns.managedZones.get",
  "path": "dns/v1/projects/{project}/managedZones/{managedZone}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "managedZone",
  ],
  "parameters": {
    "clientOperationId": {
      "location": "query",
    },
    "managedZone": {
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
  "id": "dns.managedZones.create",
  "path": "dns/v1/projects/{project}/managedZones",
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
  "id": "dns.managedZones.update",
  "path": "dns/v1/projects/{project}/managedZones/{managedZone}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "project",
    "managedZone",
  ],
  "parameters": {
    "clientOperationId": {
      "location": "query",
    },
    "managedZone": {
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
  "id": "dns.managedZones.delete",
  "path": "dns/v1/projects/{project}/managedZones/{managedZone}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "managedZone",
  ],
  "parameters": {
    "clientOperationId": {
      "location": "query",
    },
    "managedZone": {
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
  "id": "dns.managedZones.list",
  "path": "dns/v1/projects/{project}/managedZones",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
  ],
  "parameters": {
    "dnsName": {
      "location": "query",
    },
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
  cloudLoggingConfig: z.object({
    enableLogging: z.boolean().describe(
      "If set, enable query logging for this ManagedZone. False by default, making logging opt-in.",
    ).optional(),
    kind: z.string().optional(),
  }).describe("Cloud Logging configurations for publicly visible zones.")
    .optional(),
  description: z.string().describe(
    "A mutable string of at most 1024 characters associated with this resource for the user's convenience. Has no effect on the managed zone's function.",
  ).optional(),
  dnsName: z.string().describe(
    'The DNS name of this managed zone, for instance "example.com.".',
  ).optional(),
  dnssecConfig: z.object({
    defaultKeySpecs: z.array(z.object({
      algorithm: z.enum([
        "rsasha1",
        "rsasha256",
        "rsasha512",
        "ecdsap256sha256",
        "ecdsap384sha384",
      ]).describe(
        "String mnemonic specifying the DNSSEC algorithm of this key.",
      ).optional(),
      keyLength: z.number().int().describe("Length of the keys in bits.")
        .optional(),
      keyType: z.enum(["keySigning", "zoneSigning"]).describe(
        "Specifies whether this is a key signing key (KSK) or a zone signing key (ZSK). Key signing keys have the Secure Entry Point flag set and, when active, are only used to sign resource record sets of type DNSKEY. Zone signing keys do not have the Secure Entry Point flag set and are used to sign all other types of resource record sets.",
      ).optional(),
      kind: z.string().optional(),
    })).describe(
      "Specifies parameters for generating initial DnsKeys for this ManagedZone. Can only be changed while the state is OFF.",
    ).optional(),
    kind: z.string().optional(),
    nonExistence: z.enum(["nsec", "nsec3"]).describe(
      "Specifies the mechanism for authenticated denial-of-existence responses. Can only be changed while the state is OFF.",
    ).optional(),
    state: z.enum(["off", "on", "transfer"]).describe(
      "Specifies whether DNSSEC is enabled, and what mode it is in.",
    ).optional(),
  }).optional(),
  forwardingConfig: z.object({
    kind: z.string().optional(),
    targetNameServers: z.array(z.object({
      domainName: z.string().describe(
        "Fully qualified domain name for the forwarding target.",
      ).optional(),
      forwardingPath: z.enum(["default", "private"]).describe(
        "Forwarding path for this NameServerTarget. If unset or set to DEFAULT, Cloud DNS makes forwarding decisions based on IP address ranges; that is, RFC1918 addresses go to the VPC network, non-RFC1918 addresses go to the internet. When set to PRIVATE, Cloud DNS always sends queries through the VPC network for this target.",
      ).optional(),
      ipv4Address: z.string().describe("IPv4 address of a target name server.")
        .optional(),
      ipv6Address: z.string().describe(
        "IPv6 address of a target name server. Does not accept both fields (ipv4 & ipv6) being populated. Public preview as of November 2022.",
      ).optional(),
      kind: z.string().optional(),
    })).describe(
      "List of target name servers to forward to. Cloud DNS selects the best available name server if more than one target is given.",
    ).optional(),
  }).optional(),
  labels: z.record(z.string(), z.string()).describe("User labels.").optional(),
  name: z.string().describe(
    "User assigned name for this resource. Must be unique within the project. The name must be 1-63 characters long, must begin with a letter, end with a letter or digit, and only contain lowercase letters, digits or dashes.",
  ).optional(),
  nameServerSet: z.string().describe(
    "Optionally specifies the NameServerSet for this ManagedZone. A NameServerSet is a set of DNS name servers that all host the same ManagedZones. Most users leave this field unset. If you need to use this field, contact your account team.",
  ).optional(),
  peeringConfig: z.object({
    kind: z.string().optional(),
    targetNetwork: z.object({
      deactivateTime: z.string().describe(
        "The time at which the zone was deactivated, in RFC 3339 date-time format. An empty string indicates that the peering connection is active. The producer network can deactivate a zone. The zone is automatically deactivated if the producer network that the zone targeted is deleted. Output only.",
      ).optional(),
      kind: z.string().optional(),
      networkUrl: z.string().describe(
        "The fully qualified URL of the VPC network to forward queries to. This should be formatted like `https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}`",
      ).optional(),
    }).optional(),
  }).optional(),
  privateVisibilityConfig: z.object({
    gkeClusters: z.array(z.object({
      gkeClusterName: z.string().describe(
        "The resource name of the cluster to bind this ManagedZone to. This should be specified in the format like: projects/*/locations/*/clusters/*. This is referenced from GKE projects.locations.clusters.get API: https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters/get",
      ).optional(),
      kind: z.string().optional(),
    })).describe(
      "The list of Google Kubernetes Engine clusters that can see this zone.",
    ).optional(),
    kind: z.string().optional(),
    networks: z.array(z.object({
      kind: z.string().optional(),
      networkUrl: z.string().describe(
        "The fully qualified URL of the VPC network to bind to. Format this URL like `https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}`",
      ).optional(),
    })).describe("The list of VPC networks that can see this zone.").optional(),
  }).optional(),
  reverseLookupConfig: z.object({
    kind: z.string().optional(),
  }).optional(),
  serviceDirectoryConfig: z.object({
    kind: z.string().optional(),
    namespace: z.object({
      deletionTime: z.string().describe(
        "The time that the namespace backing this zone was deleted; an empty string if it still exists. This is in RFC3339 text format. Output only.",
      ).optional(),
      kind: z.string().optional(),
      namespaceUrl: z.string().describe(
        "The fully qualified URL of the namespace associated with the zone. Format must be `https://servicedirectory.googleapis.com/v1/projects/{project}/locations/{location}/namespaces/{namespace}`",
      ).optional(),
    }).optional(),
  }).describe("Contains information about Service Directory-backed zones.")
    .optional(),
  visibility: z.enum(["public", "private"]).describe(
    "The zone's visibility: public zones are exposed to the Internet, while private zones are visible only to Virtual Private Cloud resources.",
  ).optional(),
  clientOperationId: z.string().describe(
    "For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.",
  ).optional(),
});

const StateSchema = z.object({
  cloudLoggingConfig: z.object({
    enableLogging: z.boolean(),
    kind: z.string(),
  }).optional(),
  creationTime: z.string().optional(),
  description: z.string().optional(),
  dnsName: z.string().optional(),
  dnssecConfig: z.object({
    defaultKeySpecs: z.array(z.object({
      algorithm: z.string(),
      keyLength: z.number(),
      keyType: z.string(),
      kind: z.string(),
    })),
    kind: z.string(),
    nonExistence: z.string(),
    state: z.string(),
  }).optional(),
  forwardingConfig: z.object({
    kind: z.string(),
    targetNameServers: z.array(z.object({
      domainName: z.string(),
      forwardingPath: z.string(),
      ipv4Address: z.string(),
      ipv6Address: z.string(),
      kind: z.string(),
    })),
  }).optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  nameServerSet: z.string().optional(),
  nameServers: z.array(z.string()).optional(),
  peeringConfig: z.object({
    kind: z.string(),
    targetNetwork: z.object({
      deactivateTime: z.string(),
      kind: z.string(),
      networkUrl: z.string(),
    }),
  }).optional(),
  privateVisibilityConfig: z.object({
    gkeClusters: z.array(z.object({
      gkeClusterName: z.string(),
      kind: z.string(),
    })),
    kind: z.string(),
    networks: z.array(z.object({
      kind: z.string(),
      networkUrl: z.string(),
    })),
  }).optional(),
  reverseLookupConfig: z.object({
    kind: z.string(),
  }).optional(),
  serviceDirectoryConfig: z.object({
    kind: z.string(),
    namespace: z.object({
      deletionTime: z.string(),
      kind: z.string(),
      namespaceUrl: z.string(),
    }),
  }).optional(),
  visibility: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  cloudLoggingConfig: z.object({
    enableLogging: z.boolean().describe(
      "If set, enable query logging for this ManagedZone. False by default, making logging opt-in.",
    ).optional(),
    kind: z.string().optional(),
  }).describe("Cloud Logging configurations for publicly visible zones.")
    .optional(),
  description: z.string().describe(
    "A mutable string of at most 1024 characters associated with this resource for the user's convenience. Has no effect on the managed zone's function.",
  ).optional(),
  dnsName: z.string().describe(
    'The DNS name of this managed zone, for instance "example.com.".',
  ).optional(),
  dnssecConfig: z.object({
    defaultKeySpecs: z.array(z.object({
      algorithm: z.enum([
        "rsasha1",
        "rsasha256",
        "rsasha512",
        "ecdsap256sha256",
        "ecdsap384sha384",
      ]).describe(
        "String mnemonic specifying the DNSSEC algorithm of this key.",
      ).optional(),
      keyLength: z.number().int().describe("Length of the keys in bits.")
        .optional(),
      keyType: z.enum(["keySigning", "zoneSigning"]).describe(
        "Specifies whether this is a key signing key (KSK) or a zone signing key (ZSK). Key signing keys have the Secure Entry Point flag set and, when active, are only used to sign resource record sets of type DNSKEY. Zone signing keys do not have the Secure Entry Point flag set and are used to sign all other types of resource record sets.",
      ).optional(),
      kind: z.string().optional(),
    })).describe(
      "Specifies parameters for generating initial DnsKeys for this ManagedZone. Can only be changed while the state is OFF.",
    ).optional(),
    kind: z.string().optional(),
    nonExistence: z.enum(["nsec", "nsec3"]).describe(
      "Specifies the mechanism for authenticated denial-of-existence responses. Can only be changed while the state is OFF.",
    ).optional(),
    state: z.enum(["off", "on", "transfer"]).describe(
      "Specifies whether DNSSEC is enabled, and what mode it is in.",
    ).optional(),
  }).optional(),
  forwardingConfig: z.object({
    kind: z.string().optional(),
    targetNameServers: z.array(z.object({
      domainName: z.string().describe(
        "Fully qualified domain name for the forwarding target.",
      ).optional(),
      forwardingPath: z.enum(["default", "private"]).describe(
        "Forwarding path for this NameServerTarget. If unset or set to DEFAULT, Cloud DNS makes forwarding decisions based on IP address ranges; that is, RFC1918 addresses go to the VPC network, non-RFC1918 addresses go to the internet. When set to PRIVATE, Cloud DNS always sends queries through the VPC network for this target.",
      ).optional(),
      ipv4Address: z.string().describe("IPv4 address of a target name server.")
        .optional(),
      ipv6Address: z.string().describe(
        "IPv6 address of a target name server. Does not accept both fields (ipv4 & ipv6) being populated. Public preview as of November 2022.",
      ).optional(),
      kind: z.string().optional(),
    })).describe(
      "List of target name servers to forward to. Cloud DNS selects the best available name server if more than one target is given.",
    ).optional(),
  }).optional(),
  labels: z.record(z.string(), z.string()).describe("User labels.").optional(),
  name: z.string().describe(
    "User assigned name for this resource. Must be unique within the project. The name must be 1-63 characters long, must begin with a letter, end with a letter or digit, and only contain lowercase letters, digits or dashes.",
  ).optional(),
  nameServerSet: z.string().describe(
    "Optionally specifies the NameServerSet for this ManagedZone. A NameServerSet is a set of DNS name servers that all host the same ManagedZones. Most users leave this field unset. If you need to use this field, contact your account team.",
  ).optional(),
  peeringConfig: z.object({
    kind: z.string().optional(),
    targetNetwork: z.object({
      deactivateTime: z.string().describe(
        "The time at which the zone was deactivated, in RFC 3339 date-time format. An empty string indicates that the peering connection is active. The producer network can deactivate a zone. The zone is automatically deactivated if the producer network that the zone targeted is deleted. Output only.",
      ).optional(),
      kind: z.string().optional(),
      networkUrl: z.string().describe(
        "The fully qualified URL of the VPC network to forward queries to. This should be formatted like `https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}`",
      ).optional(),
    }).optional(),
  }).optional(),
  privateVisibilityConfig: z.object({
    gkeClusters: z.array(z.object({
      gkeClusterName: z.string().describe(
        "The resource name of the cluster to bind this ManagedZone to. This should be specified in the format like: projects/*/locations/*/clusters/*. This is referenced from GKE projects.locations.clusters.get API: https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters/get",
      ).optional(),
      kind: z.string().optional(),
    })).describe(
      "The list of Google Kubernetes Engine clusters that can see this zone.",
    ).optional(),
    kind: z.string().optional(),
    networks: z.array(z.object({
      kind: z.string().optional(),
      networkUrl: z.string().describe(
        "The fully qualified URL of the VPC network to bind to. Format this URL like `https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}`",
      ).optional(),
    })).describe("The list of VPC networks that can see this zone.").optional(),
  }).optional(),
  reverseLookupConfig: z.object({
    kind: z.string().optional(),
  }).optional(),
  serviceDirectoryConfig: z.object({
    kind: z.string().optional(),
    namespace: z.object({
      deletionTime: z.string().describe(
        "The time that the namespace backing this zone was deleted; an empty string if it still exists. This is in RFC3339 text format. Output only.",
      ).optional(),
      kind: z.string().optional(),
      namespaceUrl: z.string().describe(
        "The fully qualified URL of the namespace associated with the zone. Format must be `https://servicedirectory.googleapis.com/v1/projects/{project}/locations/{location}/namespaces/{namespace}`",
      ).optional(),
    }).optional(),
  }).describe("Contains information about Service Directory-backed zones.")
    .optional(),
  visibility: z.enum(["public", "private"]).describe(
    "The zone's visibility: public zones are exposed to the Internet, while private zones are visible only to Virtual Private Cloud resources.",
  ).optional(),
  clientOperationId: z.string().describe(
    "For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.",
  ).optional(),
});

/** Swamp extension model for Google Cloud DNS ManagedZones. Registered at `@swamp/gcp/dns/managedzones`. */
export const model = {
  type: "@swamp/gcp/dns/managedzones",
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
        "A zone is a subtree of the DNS namespace under one administrative responsibil...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a managedZones",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["cloudLoggingConfig"] !== undefined) {
          body["cloudLoggingConfig"] = g["cloudLoggingConfig"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["dnsName"] !== undefined) body["dnsName"] = g["dnsName"];
        if (g["dnssecConfig"] !== undefined) {
          body["dnssecConfig"] = g["dnssecConfig"];
        }
        if (g["forwardingConfig"] !== undefined) {
          body["forwardingConfig"] = g["forwardingConfig"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["nameServerSet"] !== undefined) {
          body["nameServerSet"] = g["nameServerSet"];
        }
        if (g["peeringConfig"] !== undefined) {
          body["peeringConfig"] = g["peeringConfig"];
        }
        if (g["privateVisibilityConfig"] !== undefined) {
          body["privateVisibilityConfig"] = g["privateVisibilityConfig"];
        }
        if (g["reverseLookupConfig"] !== undefined) {
          body["reverseLookupConfig"] = g["reverseLookupConfig"];
        }
        if (g["serviceDirectoryConfig"] !== undefined) {
          body["serviceDirectoryConfig"] = g["serviceDirectoryConfig"];
        }
        if (g["visibility"] !== undefined) body["visibility"] = g["visibility"];
        if (g["clientOperationId"] !== undefined) {
          body["clientOperationId"] = g["clientOperationId"];
        }
        if (g["name"] !== undefined) params["managedZone"] = String(g["name"]);
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
      description: "Get a managedZones",
      arguments: z.object({
        identifier: z.string().describe("The name of the managedZones"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["managedZone"] = args.identifier;
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
      description: "Update managedZones attributes",
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
        params["managedZone"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["cloudLoggingConfig"] !== undefined) {
          body["cloudLoggingConfig"] = g["cloudLoggingConfig"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["dnsName"] !== undefined) body["dnsName"] = g["dnsName"];
        if (g["dnssecConfig"] !== undefined) {
          body["dnssecConfig"] = g["dnssecConfig"];
        }
        if (g["forwardingConfig"] !== undefined) {
          body["forwardingConfig"] = g["forwardingConfig"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["nameServerSet"] !== undefined) {
          body["nameServerSet"] = g["nameServerSet"];
        }
        if (g["peeringConfig"] !== undefined) {
          body["peeringConfig"] = g["peeringConfig"];
        }
        if (g["privateVisibilityConfig"] !== undefined) {
          body["privateVisibilityConfig"] = g["privateVisibilityConfig"];
        }
        if (g["reverseLookupConfig"] !== undefined) {
          body["reverseLookupConfig"] = g["reverseLookupConfig"];
        }
        if (g["serviceDirectoryConfig"] !== undefined) {
          body["serviceDirectoryConfig"] = g["serviceDirectoryConfig"];
        }
        if (g["visibility"] !== undefined) body["visibility"] = g["visibility"];
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
      description: "Delete the managedZones",
      arguments: z.object({
        identifier: z.string().describe("The name of the managedZones"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["managedZone"] = args.identifier;
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
      description: "Sync managedZones state from GCP",
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
          params["managedZone"] = identifier;
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
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({
        options: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["options"] !== undefined) body["options"] = args["options"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "dns.managedZones.getIamPolicy",
            "path": "dns/v1/{+resource}:getIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
        updateMask: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dns.managedZones.setIamPolicy",
            "path": "dns/v1/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        permissions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dns.managedZones.testIamPermissions",
            "path": "dns/v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
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
