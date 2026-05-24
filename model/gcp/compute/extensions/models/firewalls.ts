// Auto-generated extension model for @swamp/gcp/compute/firewalls
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine Firewalls.
 *
 * Represents a Firewall Rule resource. Firewall rules allow or deny ingress traffic to, and egress traffic from your instances. For more information, readFirewall rules.
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

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.firewalls.get",
  "path": "projects/{project}/global/firewalls/{firewall}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "firewall",
  ],
  "parameters": {
    "firewall": {
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
  "id": "compute.firewalls.insert",
  "path": "projects/{project}/global/firewalls",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "compute.firewalls.update",
  "path": "projects/{project}/global/firewalls/{firewall}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "project",
    "firewall",
  ],
  "parameters": {
    "firewall": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.firewalls.delete",
  "path": "projects/{project}/global/firewalls/{firewall}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "firewall",
  ],
  "parameters": {
    "firewall": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "compute.firewalls.list",
  "path": "projects/{project}/global/firewalls",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "returnPartialSuccess": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  allowed: z.array(z.object({
    IPProtocol: z.string().describe(
      "The IP protocol to which this rule applies. The protocol type is required when creating a firewall rule. This value can either be one of the following well known protocol strings (tcp, udp,icmp, esp, ah, ipip,sctp) or the IP protocol number.",
    ).optional(),
    ports: z.array(z.string()).describe(
      'An optional list of ports to which this rule applies. This field is only applicable for the UDP or TCP protocol. Each entry must be either an integer or a range. If not specified, this rule applies to connections through any port. Example inputs include: ["22"], ["80","443"], and ["12345-12349"].',
    ).optional(),
  })).describe(
    "The list of ALLOW rules specified by this firewall. Each rule specifies a protocol and port-range tuple that describes a permitted connection.",
  ).optional(),
  denied: z.array(z.object({
    IPProtocol: z.string().describe(
      "The IP protocol to which this rule applies. The protocol type is required when creating a firewall rule. This value can either be one of the following well known protocol strings (tcp, udp,icmp, esp, ah, ipip,sctp) or the IP protocol number.",
    ).optional(),
    ports: z.array(z.string()).describe(
      'An optional list of ports to which this rule applies. This field is only applicable for the UDP or TCP protocol. Each entry must be either an integer or a range. If not specified, this rule applies to connections through any port. Example inputs include: ["22"], ["80","443"], and ["12345-12349"].',
    ).optional(),
  })).describe(
    "The list of DENY rules specified by this firewall. Each rule specifies a protocol and port-range tuple that describes a denied connection.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this field when you create the resource.",
  ).optional(),
  destinationRanges: z.array(z.string()).describe(
    "If destination ranges are specified, the firewall rule applies only to traffic that has destination IP address in these ranges. These ranges must be expressed inCIDR format. Both IPv4 and IPv6 are supported.",
  ).optional(),
  direction: z.enum(["EGRESS", "INGRESS"]).describe(
    "Direction of traffic to which this firewall applies, either `INGRESS` or `EGRESS`. The default is `INGRESS`. For `EGRESS` traffic, you cannot specify the sourceTags fields.",
  ).optional(),
  disabled: z.boolean().describe(
    "Denotes whether the firewall rule is disabled. When set to true, the firewall rule is not enforced and the network behaves as if it did not exist. If this is unspecified, the firewall rule will be enabled.",
  ).optional(),
  logConfig: z.object({
    enable: z.boolean().describe(
      "This field denotes whether to enable logging for a particular firewall rule.",
    ).optional(),
    metadata: z.enum(["EXCLUDE_ALL_METADATA", "INCLUDE_ALL_METADATA"]).describe(
      "This field can only be specified for a particular firewall rule if logging is enabled for that rule. This field denotes whether to include or exclude metadata for firewall logs.",
    ).optional(),
  }).describe("The available logging options for a firewall rule.").optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`. The first character must be a lowercase letter, and all following characters (except for the last character) must be a dash, lowercase letter, or digit. The last character must be a lowercase letter or digit.",
    ),
  network: z.string().describe(
    "URL of the network resource for this firewall rule. If not specified when creating a firewall rule, the default network is used: global/networks/default If you choose to specify this field, you can specify the network as a full or partial URL. For example, the following are all valid URLs: - https://www.googleapis.com/compute/v1/projects/myproject/global/networks/my-network - projects/myproject/global/networks/my-network - global/networks/default",
  ).optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      'Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID {: } or Namespaced format {: }. For example the following are valid inputs: * {"tagKeys/333": "tagValues/444", "tagKeys/123": "tagValues/456"} * {"123/environment": "production", "345/abc": "xyz"} Note: * Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment": "tagValues/444"} is invalid.',
    ).optional(),
  }).describe("Additional firewall parameters.").optional(),
  priority: z.number().int().describe(
    "Priority for this rule. This is an integer between `0` and `65535`, both inclusive. The default value is `1000`. Relative priorities determine which rule takes effect if multiple rules apply. Lower values indicate higher priority. For example, a rule with priority `0` has higher precedence than a rule with priority `1`. DENY rules take precedence over ALLOW rules if they have equal priority. Note that VPC networks have implied rules with a priority of `65535`. To avoid conflicts with the implied rules, use a priority number less than `65535`.",
  ).optional(),
  sourceRanges: z.array(z.string()).describe(
    "If source ranges are specified, the firewall rule applies only to traffic that has a source IP address in these ranges. These ranges must be expressed inCIDR format. One or both of sourceRanges and sourceTags may be set. If both fields are set, the rule applies to traffic that has a source IP address within sourceRanges OR a source IP from a resource with a matching tag listed in thesourceTags field. The connection does not need to match both fields for the rule to apply. Both IPv4 and IPv6 are supported.",
  ).optional(),
  sourceServiceAccounts: z.array(z.string()).describe(
    "If source service accounts are specified, the firewall rules apply only to traffic originating from an instance with a service account in this list. Source service accounts cannot be used to control traffic to an instance's external IP address because service accounts are associated with an instance, not an IP address.sourceRanges can be set at the same time assourceServiceAccounts. If both are set, the firewall applies to traffic that has a source IP address within the sourceRanges OR a source IP that belongs to an instance with service account listed insourceServiceAccount. The connection does not need to match both fields for the firewall to apply.sourceServiceAccounts cannot be used at the same time assourceTags or targetTags.",
  ).optional(),
  sourceTags: z.array(z.string()).describe(
    "If source tags are specified, the firewall rule applies only to traffic with source IPs that match the primary network interfaces of VM instances that have the tag and are in the same VPC network. Source tags cannot be used to control traffic to an instance's external IP address, it only applies to traffic between instances in the same virtual network. Because tags are associated with instances, not IP addresses. One or both of sourceRanges and sourceTags may be set. If both fields are set, the firewall applies to traffic that has a source IP address within sourceRanges OR a source IP from a resource with a matching tag listed in the sourceTags field. The connection does not need to match both fields for the firewall to apply.",
  ).optional(),
  targetServiceAccounts: z.array(z.string()).describe(
    "A list of service accounts indicating sets of instances located in the network that may make network connections as specified inallowed[].targetServiceAccounts cannot be used at the same time astargetTags or sourceTags. If neither targetServiceAccounts nor targetTags are specified, the firewall rule applies to all instances on the specified network.",
  ).optional(),
  targetTags: z.array(z.string()).describe(
    "A list of tags that controls which instances the firewall rule applies to. If targetTags are specified, then the firewall rule applies only to instances in the VPC network that have one of those tags. If no targetTags are specified, the firewall rule applies to all instances on the specified network.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  allowed: z.array(z.object({
    IPProtocol: z.string(),
    ports: z.array(z.string()),
  })).optional(),
  creationTimestamp: z.string().optional(),
  denied: z.array(z.object({
    IPProtocol: z.string(),
    ports: z.array(z.string()),
  })).optional(),
  description: z.string().optional(),
  destinationRanges: z.array(z.string()).optional(),
  direction: z.string().optional(),
  disabled: z.boolean().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  logConfig: z.object({
    enable: z.boolean(),
    metadata: z.string(),
  }).optional(),
  name: z.string(),
  network: z.string().optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.unknown()),
  }).optional(),
  priority: z.number().optional(),
  selfLink: z.string().optional(),
  sourceRanges: z.array(z.string()).optional(),
  sourceServiceAccounts: z.array(z.string()).optional(),
  sourceTags: z.array(z.string()).optional(),
  targetServiceAccounts: z.array(z.string()).optional(),
  targetTags: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  allowed: z.array(z.object({
    IPProtocol: z.string().describe(
      "The IP protocol to which this rule applies. The protocol type is required when creating a firewall rule. This value can either be one of the following well known protocol strings (tcp, udp,icmp, esp, ah, ipip,sctp) or the IP protocol number.",
    ).optional(),
    ports: z.array(z.string()).describe(
      'An optional list of ports to which this rule applies. This field is only applicable for the UDP or TCP protocol. Each entry must be either an integer or a range. If not specified, this rule applies to connections through any port. Example inputs include: ["22"], ["80","443"], and ["12345-12349"].',
    ).optional(),
  })).describe(
    "The list of ALLOW rules specified by this firewall. Each rule specifies a protocol and port-range tuple that describes a permitted connection.",
  ).optional(),
  denied: z.array(z.object({
    IPProtocol: z.string().describe(
      "The IP protocol to which this rule applies. The protocol type is required when creating a firewall rule. This value can either be one of the following well known protocol strings (tcp, udp,icmp, esp, ah, ipip,sctp) or the IP protocol number.",
    ).optional(),
    ports: z.array(z.string()).describe(
      'An optional list of ports to which this rule applies. This field is only applicable for the UDP or TCP protocol. Each entry must be either an integer or a range. If not specified, this rule applies to connections through any port. Example inputs include: ["22"], ["80","443"], and ["12345-12349"].',
    ).optional(),
  })).describe(
    "The list of DENY rules specified by this firewall. Each rule specifies a protocol and port-range tuple that describes a denied connection.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this field when you create the resource.",
  ).optional(),
  destinationRanges: z.array(z.string()).describe(
    "If destination ranges are specified, the firewall rule applies only to traffic that has destination IP address in these ranges. These ranges must be expressed inCIDR format. Both IPv4 and IPv6 are supported.",
  ).optional(),
  direction: z.enum(["EGRESS", "INGRESS"]).describe(
    "Direction of traffic to which this firewall applies, either `INGRESS` or `EGRESS`. The default is `INGRESS`. For `EGRESS` traffic, you cannot specify the sourceTags fields.",
  ).optional(),
  disabled: z.boolean().describe(
    "Denotes whether the firewall rule is disabled. When set to true, the firewall rule is not enforced and the network behaves as if it did not exist. If this is unspecified, the firewall rule will be enabled.",
  ).optional(),
  logConfig: z.object({
    enable: z.boolean().describe(
      "This field denotes whether to enable logging for a particular firewall rule.",
    ).optional(),
    metadata: z.enum(["EXCLUDE_ALL_METADATA", "INCLUDE_ALL_METADATA"]).describe(
      "This field can only be specified for a particular firewall rule if logging is enabled for that rule. This field denotes whether to include or exclude metadata for firewall logs.",
    ).optional(),
  }).describe("The available logging options for a firewall rule.").optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`. The first character must be a lowercase letter, and all following characters (except for the last character) must be a dash, lowercase letter, or digit. The last character must be a lowercase letter or digit.",
    ).optional(),
  network: z.string().describe(
    "URL of the network resource for this firewall rule. If not specified when creating a firewall rule, the default network is used: global/networks/default If you choose to specify this field, you can specify the network as a full or partial URL. For example, the following are all valid URLs: - https://www.googleapis.com/compute/v1/projects/myproject/global/networks/my-network - projects/myproject/global/networks/my-network - global/networks/default",
  ).optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      'Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID {: } or Namespaced format {: }. For example the following are valid inputs: * {"tagKeys/333": "tagValues/444", "tagKeys/123": "tagValues/456"} * {"123/environment": "production", "345/abc": "xyz"} Note: * Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment": "tagValues/444"} is invalid.',
    ).optional(),
  }).describe("Additional firewall parameters.").optional(),
  priority: z.number().int().describe(
    "Priority for this rule. This is an integer between `0` and `65535`, both inclusive. The default value is `1000`. Relative priorities determine which rule takes effect if multiple rules apply. Lower values indicate higher priority. For example, a rule with priority `0` has higher precedence than a rule with priority `1`. DENY rules take precedence over ALLOW rules if they have equal priority. Note that VPC networks have implied rules with a priority of `65535`. To avoid conflicts with the implied rules, use a priority number less than `65535`.",
  ).optional(),
  sourceRanges: z.array(z.string()).describe(
    "If source ranges are specified, the firewall rule applies only to traffic that has a source IP address in these ranges. These ranges must be expressed inCIDR format. One or both of sourceRanges and sourceTags may be set. If both fields are set, the rule applies to traffic that has a source IP address within sourceRanges OR a source IP from a resource with a matching tag listed in thesourceTags field. The connection does not need to match both fields for the rule to apply. Both IPv4 and IPv6 are supported.",
  ).optional(),
  sourceServiceAccounts: z.array(z.string()).describe(
    "If source service accounts are specified, the firewall rules apply only to traffic originating from an instance with a service account in this list. Source service accounts cannot be used to control traffic to an instance's external IP address because service accounts are associated with an instance, not an IP address.sourceRanges can be set at the same time assourceServiceAccounts. If both are set, the firewall applies to traffic that has a source IP address within the sourceRanges OR a source IP that belongs to an instance with service account listed insourceServiceAccount. The connection does not need to match both fields for the firewall to apply.sourceServiceAccounts cannot be used at the same time assourceTags or targetTags.",
  ).optional(),
  sourceTags: z.array(z.string()).describe(
    "If source tags are specified, the firewall rule applies only to traffic with source IPs that match the primary network interfaces of VM instances that have the tag and are in the same VPC network. Source tags cannot be used to control traffic to an instance's external IP address, it only applies to traffic between instances in the same virtual network. Because tags are associated with instances, not IP addresses. One or both of sourceRanges and sourceTags may be set. If both fields are set, the firewall applies to traffic that has a source IP address within sourceRanges OR a source IP from a resource with a matching tag listed in the sourceTags field. The connection does not need to match both fields for the firewall to apply.",
  ).optional(),
  targetServiceAccounts: z.array(z.string()).describe(
    "A list of service accounts indicating sets of instances located in the network that may make network connections as specified inallowed[].targetServiceAccounts cannot be used at the same time astargetTags or sourceTags. If neither targetServiceAccounts nor targetTags are specified, the firewall rule applies to all instances on the specified network.",
  ).optional(),
  targetTags: z.array(z.string()).describe(
    "A list of tags that controls which instances the firewall rule applies to. If targetTags are specified, then the firewall rule applies only to instances in the VPC network that have one of those tags. If no targetTags are specified, the firewall rule applies to all instances on the specified network.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine Firewalls. Registered at `@swamp/gcp/compute/firewalls`. */
export const model = {
  type: "@swamp/gcp/compute/firewalls",
  version: "2026.05.24.1",
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
    {
      toVersion: "2026.05.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a Firewall Rule resource. Firewall rules allow or deny ingress tra...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a firewalls",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["allowed"] !== undefined) body["allowed"] = g["allowed"];
        if (g["denied"] !== undefined) body["denied"] = g["denied"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["destinationRanges"] !== undefined) {
          body["destinationRanges"] = g["destinationRanges"];
        }
        if (g["direction"] !== undefined) body["direction"] = g["direction"];
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["logConfig"] !== undefined) body["logConfig"] = g["logConfig"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["priority"] !== undefined) body["priority"] = g["priority"];
        if (g["sourceRanges"] !== undefined) {
          body["sourceRanges"] = g["sourceRanges"];
        }
        if (g["sourceServiceAccounts"] !== undefined) {
          body["sourceServiceAccounts"] = g["sourceServiceAccounts"];
        }
        if (g["sourceTags"] !== undefined) body["sourceTags"] = g["sourceTags"];
        if (g["targetServiceAccounts"] !== undefined) {
          body["targetServiceAccounts"] = g["targetServiceAccounts"];
        }
        if (g["targetTags"] !== undefined) body["targetTags"] = g["targetTags"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) params["firewall"] = String(g["name"]);
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
      description: "Get a firewalls",
      arguments: z.object({
        identifier: z.string().describe("The name of the firewalls"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["firewall"] = args.identifier;
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
      description: "Update firewalls attributes",
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
        params["firewall"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["allowed"] !== undefined) body["allowed"] = g["allowed"];
        if (g["denied"] !== undefined) body["denied"] = g["denied"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["destinationRanges"] !== undefined) {
          body["destinationRanges"] = g["destinationRanges"];
        }
        if (g["direction"] !== undefined) body["direction"] = g["direction"];
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["logConfig"] !== undefined) body["logConfig"] = g["logConfig"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["priority"] !== undefined) body["priority"] = g["priority"];
        if (g["sourceRanges"] !== undefined) {
          body["sourceRanges"] = g["sourceRanges"];
        }
        if (g["sourceServiceAccounts"] !== undefined) {
          body["sourceServiceAccounts"] = g["sourceServiceAccounts"];
        }
        if (g["sourceTags"] !== undefined) body["sourceTags"] = g["sourceTags"];
        if (g["targetServiceAccounts"] !== undefined) {
          body["targetServiceAccounts"] = g["targetServiceAccounts"];
        }
        if (g["targetTags"] !== undefined) body["targetTags"] = g["targetTags"];
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
      description: "Delete the firewalls",
      arguments: z.object({
        identifier: z.string().describe("The name of the firewalls"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["firewall"] = args.identifier;
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
      description: "Sync firewalls state from GCP",
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
          params["firewall"] = identifier;
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
            "id": "compute.firewalls.testIamPermissions",
            "path":
              "projects/{project}/global/firewalls/{resource}/testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["project", "resource"],
            "parameters": {
              "project": { "location": "path", "required": true },
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
