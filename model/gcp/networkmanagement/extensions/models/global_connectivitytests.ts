// Auto-generated extension model for @swamp/gcp/networkmanagement/global-connectivitytests
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Network Management Global.ConnectivityTests.
 *
 * A Connectivity Test for a network reachability analysis.
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
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/connectivityTests/${shortName}`;
}

const BASE_URL = "https://networkmanagement.googleapis.com/";

const GET_CONFIG = {
  "id": "networkmanagement.projects.locations.global.connectivityTests.get",
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
  "id": "networkmanagement.projects.locations.global.connectivityTests.create",
  "path": "v1/{+parent}/connectivityTests",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "testId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "networkmanagement.projects.locations.global.connectivityTests.patch",
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
  "id": "networkmanagement.projects.locations.global.connectivityTests.delete",
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

const LIST_CONFIG = {
  "id": "networkmanagement.projects.locations.global.connectivityTests.list",
  "path": "v1/{+parent}/connectivityTests",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  bypassFirewallChecks: z.boolean().describe(
    "Whether the analysis should skip firewall checking. Default value is false.",
  ).optional(),
  description: z.string().describe(
    "The user-supplied description of the Connectivity Test. Maximum of 512 characters.",
  ).optional(),
  destination: z.object({
    appEngineVersion: z.object({
      uri: z.string().describe(
        "An [App Engine](https://cloud.google.com/appengine) [service version](https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions) name.",
      ).optional(),
    }).describe("Wrapper for the App Engine service version attributes.")
      .optional(),
    cloudFunction: z.object({
      uri: z.string().describe(
        "A [Cloud Function](https://cloud.google.com/functions) name.",
      ).optional(),
    }).describe("Wrapper for Cloud Function attributes.").optional(),
    cloudRunRevision: z.object({
      serviceUri: z.string().describe(
        "Output only. The URI of the Cloud Run service that the revision belongs to. The format is: projects/{project}/locations/{location}/services/{service}",
      ).optional(),
      uri: z.string().describe(
        "A [Cloud Run](https://cloud.google.com/run) [revision](https://cloud.google.com/run/docs/reference/rest/v1/namespaces.revisions/get) URI. The format is: projects/{project}/locations/{location}/revisions/{revision}",
      ).optional(),
    }).describe("Wrapper for Cloud Run revision attributes.").optional(),
    cloudSqlInstance: z.string().describe(
      "A [Cloud SQL](https://cloud.google.com/sql) instance URI.",
    ).optional(),
    forwardingRule: z.string().describe(
      "A forwarding rule and its corresponding IP address represent the frontend configuration of a Google Cloud load balancer. Forwarding rules are also used for protocol forwarding, Private Service Connect and other network services to provide forwarding information in the control plane. Applicable only to destination endpoint. Format: `projects/{project}/global/forwardingRules/{id}` or `projects/{project}/regions/{region}/forwardingRules/{id}`",
    ).optional(),
    forwardingRuleTarget: z.enum([
      "FORWARDING_RULE_TARGET_UNSPECIFIED",
      "INSTANCE",
      "LOAD_BALANCER",
      "VPN_GATEWAY",
      "PSC",
    ]).describe(
      "Output only. Specifies the type of the target of the forwarding rule.",
    ).optional(),
    fqdn: z.string().describe(
      "DNS endpoint of [Google Kubernetes Engine cluster control plane](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture). Requires gke_master_cluster to be set, can't be used simultaneoulsly with ip_address or network. Applicable only to destination endpoint.",
    ).optional(),
    gkeMasterCluster: z.string().describe(
      "A cluster URI for [Google Kubernetes Engine cluster control plane](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture).",
    ).optional(),
    gkePod: z.string().describe(
      "A [GKE Pod](https://cloud.google.com/kubernetes-engine/docs/concepts/pod) URI.",
    ).optional(),
    instance: z.string().describe("A Compute Engine instance URI.").optional(),
    ipAddress: z.string().describe(
      "The IP address of the endpoint, which can be an external or internal IP.",
    ).optional(),
    loadBalancerId: z.string().describe(
      "Output only. ID of the load balancer the forwarding rule points to. Empty for forwarding rules not related to load balancers.",
    ).optional(),
    loadBalancerType: z.enum([
      "LOAD_BALANCER_TYPE_UNSPECIFIED",
      "HTTPS_ADVANCED_LOAD_BALANCER",
      "HTTPS_LOAD_BALANCER",
      "REGIONAL_HTTPS_LOAD_BALANCER",
      "INTERNAL_HTTPS_LOAD_BALANCER",
      "SSL_PROXY_LOAD_BALANCER",
      "TCP_PROXY_LOAD_BALANCER",
      "INTERNAL_TCP_PROXY_LOAD_BALANCER",
      "NETWORK_LOAD_BALANCER",
      "LEGACY_NETWORK_LOAD_BALANCER",
      "TCP_UDP_INTERNAL_LOAD_BALANCER",
    ]).describe(
      "Output only. Type of the load balancer the forwarding rule points to.",
    ).optional(),
    network: z.string().describe(
      "A VPC network URI. For source endpoints, used according to the `network_type`. For destination endpoints, used only when the source is an external IP address endpoint, and the destination is an internal IP address endpoint.",
    ).optional(),
    networkType: z.enum([
      "NETWORK_TYPE_UNSPECIFIED",
      "GCP_NETWORK",
      "NON_GCP_NETWORK",
      "INTERNET",
    ]).describe(
      "For source endpoints, type of the network where the endpoint is located. Not relevant for destination endpoints.",
    ).optional(),
    port: z.number().int().describe(
      "The IP protocol port of the endpoint. Only applicable when protocol is TCP or UDP.",
    ).optional(),
    projectId: z.string().describe(
      "For source endpoints, endpoint project ID. Used according to the `network_type`. Not relevant for destination endpoints.",
    ).optional(),
    redisCluster: z.string().describe(
      "A [Redis Cluster](https://cloud.google.com/memorystore/docs/cluster) URI. Applicable only to destination endpoint.",
    ).optional(),
    redisInstance: z.string().describe(
      "A [Redis Instance](https://cloud.google.com/memorystore/docs/redis) URI. Applicable only to destination endpoint.",
    ).optional(),
  }).describe("Source or destination of the Connectivity Test.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Resource labels to represent user-provided metadata.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Unique name of the resource using the form: `projects/{project_id}/locations/global/connectivityTests/{test_id}`",
  ).optional(),
  probingDetails: z.object({
    abortCause: z.enum([
      "PROBING_ABORT_CAUSE_UNSPECIFIED",
      "PERMISSION_DENIED",
      "NO_SOURCE_LOCATION",
    ]).describe("The reason probing was aborted.").optional(),
    destinationEgressLocation: z.object({
      metropolitanArea: z.string().describe("Name of the metropolitan area.")
        .optional(),
    }).describe(
      "Representation of a network edge location as per https://cloud.google.com/vpc/docs/edge-locations.",
    ).optional(),
    edgeResponses: z.array(z.object({
      destinationEgressLocation: z.object({
        metropolitanArea: z.string().describe("Name of the metropolitan area.")
          .optional(),
      }).describe(
        "Representation of a network edge location as per https://cloud.google.com/vpc/docs/edge-locations.",
      ).optional(),
      destinationRouter: z.string().describe(
        "Router name in the format '{router}.{metroshard}'. For example: pf01.aaa01, pr02.aaa01.",
      ).optional(),
      probingLatency: z.object({
        latencyPercentiles: z.array(z.unknown()).describe(
          "Representative latency percentiles.",
        ).optional(),
      }).describe("Describes measured latency distribution.").optional(),
      result: z.enum([
        "PROBING_RESULT_UNSPECIFIED",
        "REACHABLE",
        "UNREACHABLE",
        "REACHABILITY_INCONSISTENT",
        "UNDETERMINED",
      ]).describe(
        "The overall result of active probing for this egress device.",
      ).optional(),
      sentProbeCount: z.number().int().describe("Number of probes sent.")
        .optional(),
      successfulProbeCount: z.number().int().describe(
        "Number of probes that reached the destination.",
      ).optional(),
    })).describe("Probing results for all edge devices.").optional(),
    endpointInfo: z.object({
      destinationIp: z.string().describe("Destination IP address.").optional(),
      destinationNetworkUri: z.string().describe(
        "URI of the network where this packet is sent to.",
      ).optional(),
      destinationPort: z.number().int().describe(
        "Destination port. Only valid when protocol is TCP or UDP.",
      ).optional(),
      protocol: z.string().describe(
        'IP protocol in string format, for example: "TCP", "UDP", "ICMP".',
      ).optional(),
      sourceAgentUri: z.string().describe(
        "URI of the source telemetry agent this packet originates from.",
      ).optional(),
      sourceIp: z.string().describe("Source IP address.").optional(),
      sourceNetworkUri: z.string().describe(
        "URI of the network where this packet originates from.",
      ).optional(),
      sourcePort: z.number().int().describe(
        "Source port. Only valid when protocol is TCP or UDP.",
      ).optional(),
    }).describe(
      "For display only. The specification of the endpoints for the test. EndpointInfo is derived from source and destination Endpoint and validated by the backend data plane model.",
    ).optional(),
    error: z.object({
      code: z.number().int().describe(
        "The status code, which should be an enum value of google.rpc.Code.",
      ).optional(),
      details: z.array(z.record(z.string(), z.string())).describe(
        "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
      ).optional(),
      message: z.string().describe(
        "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
      ).optional(),
    }).describe(
      "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
    ).optional(),
    probedAllDevices: z.boolean().describe(
      "Whether all relevant edge devices were probed.",
    ).optional(),
    probingLatency: z.object({
      latencyPercentiles: z.array(z.object({
        latencyMicros: z.string().describe(
          "percent-th percentile of latency observed, in microseconds. Fraction of percent/100 of samples have latency lower or equal to the value of this field.",
        ).optional(),
        percent: z.number().int().describe(
          "Percentage of samples this data point applies to.",
        ).optional(),
      })).describe("Representative latency percentiles.").optional(),
    }).describe("Describes measured latency distribution.").optional(),
    result: z.enum([
      "PROBING_RESULT_UNSPECIFIED",
      "REACHABLE",
      "UNREACHABLE",
      "REACHABILITY_INCONSISTENT",
      "UNDETERMINED",
    ]).describe("The overall result of active probing.").optional(),
    sentProbeCount: z.number().int().describe("Number of probes sent.")
      .optional(),
    successfulProbeCount: z.number().int().describe(
      "Number of probes that reached the destination.",
    ).optional(),
    verifyTime: z.string().describe(
      "The time that reachability was assessed through active probing.",
    ).optional(),
  }).describe("Results of active probing from the last run of the test.")
    .optional(),
  protocol: z.string().describe(
    'IP Protocol of the test. When not provided, "TCP" is assumed.',
  ).optional(),
  reachabilityDetails: z.object({
    error: z.object({
      code: z.number().int().describe(
        "The status code, which should be an enum value of google.rpc.Code.",
      ).optional(),
      details: z.array(z.record(z.string(), z.string())).describe(
        "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
      ).optional(),
      message: z.string().describe(
        "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
      ).optional(),
    }).describe(
      "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
    ).optional(),
    result: z.enum([
      "RESULT_UNSPECIFIED",
      "REACHABLE",
      "UNREACHABLE",
      "AMBIGUOUS",
      "UNDETERMINED",
    ]).describe("The overall result of the test's configuration analysis.")
      .optional(),
    traces: z.array(z.object({
      endpointInfo: z.object({
        destinationIp: z.string().describe("Destination IP address.")
          .optional(),
        destinationNetworkUri: z.string().describe(
          "URI of the network where this packet is sent to.",
        ).optional(),
        destinationPort: z.number().int().describe(
          "Destination port. Only valid when protocol is TCP or UDP.",
        ).optional(),
        protocol: z.string().describe(
          'IP protocol in string format, for example: "TCP", "UDP", "ICMP".',
        ).optional(),
        sourceAgentUri: z.string().describe(
          "URI of the source telemetry agent this packet originates from.",
        ).optional(),
        sourceIp: z.string().describe("Source IP address.").optional(),
        sourceNetworkUri: z.string().describe(
          "URI of the network where this packet originates from.",
        ).optional(),
        sourcePort: z.number().int().describe(
          "Source port. Only valid when protocol is TCP or UDP.",
        ).optional(),
      }).describe(
        "For display only. The specification of the endpoints for the test. EndpointInfo is derived from source and destination Endpoint and validated by the backend data plane model.",
      ).optional(),
      forwardTraceId: z.number().int().describe(
        "ID of trace. For forward traces, this ID is unique for each trace. For return traces, it matches ID of associated forward trace. A single forward trace can be associated with none, one or more than one return trace.",
      ).optional(),
      steps: z.array(z.object({
        abort: z.unknown().describe(
          'Details of the final state "abort" and associated resource.',
        ).optional(),
        appEngineVersion: z.unknown().describe(
          "For display only. Metadata associated with an App Engine version.",
        ).optional(),
        causesDrop: z.unknown().describe(
          "This is a step that leads to the final state Drop.",
        ).optional(),
        cloudFunction: z.unknown().describe(
          "For display only. Metadata associated with a Cloud Function.",
        ).optional(),
        cloudRunRevision: z.unknown().describe(
          "For display only. Metadata associated with a Cloud Run revision.",
        ).optional(),
        cloudSqlInstance: z.unknown().describe(
          "For display only. Metadata associated with a Cloud SQL instance.",
        ).optional(),
        datastreamPrivateConnection: z.unknown().describe(
          "For display only. Metadata associated with a Private Connection.",
        ).optional(),
        deliver: z.unknown().describe(
          'Details of the final state "deliver" and associated resource.',
        ).optional(),
        description: z.unknown().describe(
          "A description of the step. Usually this is a summary of the state.",
        ).optional(),
        directVpcEgressConnection: z.unknown().describe(
          "For display only. Metadata associated with a serverless direct VPC egress connection.",
        ).optional(),
        dmsPrivateConnection: z.unknown().describe(
          "For display only. Metadata associated with a Private Connection.",
        ).optional(),
        drop: z.unknown().describe(
          'Details of the final state "drop" and associated resource.',
        ).optional(),
        endpoint: z.unknown().describe(
          "For display only. The specification of the endpoints for the test. EndpointInfo is derived from source and destination Endpoint and validated by the backend data plane model.",
        ).optional(),
        firewall: z.unknown().describe(
          "For display only. Metadata associated with a VPC firewall rule, an implied VPC firewall rule, or a firewall policy rule.",
        ).optional(),
        forward: z.unknown().describe(
          'Details of the final state "forward" and associated resource.',
        ).optional(),
        forwardingRule: z.unknown().describe(
          "For display only. Metadata associated with a Compute Engine forwarding rule.",
        ).optional(),
        gkeMaster: z.unknown().describe(
          "For display only. Metadata associated with a Google Kubernetes Engine (GKE) cluster master.",
        ).optional(),
        gkeNetworkPolicy: z.unknown().describe(
          "For display only. Metadata associated with a GKE Network Policy.",
        ).optional(),
        gkeNetworkPolicySkipped: z.unknown().describe(
          "For display only. Contains information about why GKE Network Policy evaluation was skipped.",
        ).optional(),
        gkePod: z.unknown().describe(
          "For display only. Metadata associated with a Google Kubernetes Engine (GKE) Pod.",
        ).optional(),
        googleService: z.unknown().describe(
          "For display only. Details of a Google Service sending packets to a VPC network. Although the source IP might be a publicly routable address, some Google Services use special routes within Google production infrastructure to reach Compute Engine Instances. https://cloud.google.com/vpc/docs/routes#special_return_paths",
        ).optional(),
        hybridSubnet: z.unknown().describe(
          "For display only. Metadata associated with a hybrid subnet.",
        ).optional(),
        instance: z.unknown().describe(
          "For display only. Metadata associated with a Compute Engine instance.",
        ).optional(),
        interconnectAttachment: z.unknown().describe(
          "For display only. Metadata associated with an Interconnect attachment.",
        ).optional(),
        ipMasqueradingSkipped: z.unknown().describe(
          "For display only. Contains information about why IP masquerading was skipped for the packet.",
        ).optional(),
        loadBalancer: z.unknown().describe(
          "For display only. Metadata associated with a load balancer.",
        ).optional(),
        loadBalancerBackendInfo: z.unknown().describe(
          "For display only. Metadata associated with the load balancer backend.",
        ).optional(),
        nat: z.unknown().describe(
          "For display only. Metadata associated with NAT.",
        ).optional(),
        network: z.unknown().describe(
          "For display only. Metadata associated with a Compute Engine network.",
        ).optional(),
        ngfwPacketInspection: z.unknown().describe(
          "For display only. Metadata associated with a layer 7 packet inspection by the firewall.",
        ).optional(),
        projectId: z.unknown().describe(
          "Project ID that contains the configuration this step is validating.",
        ).optional(),
        proxyConnection: z.unknown().describe(
          "For display only. Metadata associated with ProxyConnection.",
        ).optional(),
        redisCluster: z.unknown().describe(
          "For display only. Metadata associated with a Redis Cluster.",
        ).optional(),
        redisInstance: z.unknown().describe(
          "For display only. Metadata associated with a Cloud Redis Instance.",
        ).optional(),
        route: z.unknown().describe(
          "For display only. Metadata associated with a Compute Engine route.",
        ).optional(),
        serverlessExternalConnection: z.unknown().describe(
          "For display only. Metadata associated with a serverless public connection.",
        ).optional(),
        serverlessNeg: z.unknown().describe(
          "For display only. Metadata associated with the serverless network endpoint group backend.",
        ).optional(),
        state: z.unknown().describe(
          "Each step is in one of the pre-defined states.",
        ).optional(),
        storageBucket: z.unknown().describe(
          "For display only. Metadata associated with Storage Bucket.",
        ).optional(),
        vpcConnector: z.unknown().describe(
          "For display only. Metadata associated with a VPC connector.",
        ).optional(),
        vpnGateway: z.unknown().describe(
          "For display only. Metadata associated with a Compute Engine VPN gateway.",
        ).optional(),
        vpnTunnel: z.unknown().describe(
          "For display only. Metadata associated with a Compute Engine VPN tunnel.",
        ).optional(),
      })).describe(
        "A trace of a test contains multiple steps from the initial state to the final state (delivered, dropped, forwarded, or aborted). The steps are ordered by the processing sequence within the simulated network state machine. It is critical to preserve the order of the steps and avoid reordering or sorting them.",
      ).optional(),
    })).describe(
      "Result may contain a list of traces if a test has multiple possible paths in the network, such as when destination endpoint is a load balancer with multiple backends.",
    ).optional(),
    verifyTime: z.string().describe("The time of the configuration analysis.")
      .optional(),
  }).describe(
    "Results of the configuration analysis from the last run of the test.",
  ).optional(),
  relatedProjects: z.array(z.string()).describe(
    "Other projects that may be relevant for reachability analysis. This is applicable to scenarios where a test can cross project boundaries.",
  ).optional(),
  returnReachabilityDetails: z.object({
    error: z.object({
      code: z.number().int().describe(
        "The status code, which should be an enum value of google.rpc.Code.",
      ).optional(),
      details: z.array(z.record(z.string(), z.string())).describe(
        "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
      ).optional(),
      message: z.string().describe(
        "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
      ).optional(),
    }).describe(
      "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
    ).optional(),
    result: z.enum([
      "RESULT_UNSPECIFIED",
      "REACHABLE",
      "UNREACHABLE",
      "AMBIGUOUS",
      "UNDETERMINED",
    ]).describe("The overall result of the test's configuration analysis.")
      .optional(),
    traces: z.array(z.object({
      endpointInfo: z.object({
        destinationIp: z.string().describe("Destination IP address.")
          .optional(),
        destinationNetworkUri: z.string().describe(
          "URI of the network where this packet is sent to.",
        ).optional(),
        destinationPort: z.number().int().describe(
          "Destination port. Only valid when protocol is TCP or UDP.",
        ).optional(),
        protocol: z.string().describe(
          'IP protocol in string format, for example: "TCP", "UDP", "ICMP".',
        ).optional(),
        sourceAgentUri: z.string().describe(
          "URI of the source telemetry agent this packet originates from.",
        ).optional(),
        sourceIp: z.string().describe("Source IP address.").optional(),
        sourceNetworkUri: z.string().describe(
          "URI of the network where this packet originates from.",
        ).optional(),
        sourcePort: z.number().int().describe(
          "Source port. Only valid when protocol is TCP or UDP.",
        ).optional(),
      }).describe(
        "For display only. The specification of the endpoints for the test. EndpointInfo is derived from source and destination Endpoint and validated by the backend data plane model.",
      ).optional(),
      forwardTraceId: z.number().int().describe(
        "ID of trace. For forward traces, this ID is unique for each trace. For return traces, it matches ID of associated forward trace. A single forward trace can be associated with none, one or more than one return trace.",
      ).optional(),
      steps: z.array(z.object({
        abort: z.unknown().describe(
          'Details of the final state "abort" and associated resource.',
        ).optional(),
        appEngineVersion: z.unknown().describe(
          "For display only. Metadata associated with an App Engine version.",
        ).optional(),
        causesDrop: z.unknown().describe(
          "This is a step that leads to the final state Drop.",
        ).optional(),
        cloudFunction: z.unknown().describe(
          "For display only. Metadata associated with a Cloud Function.",
        ).optional(),
        cloudRunRevision: z.unknown().describe(
          "For display only. Metadata associated with a Cloud Run revision.",
        ).optional(),
        cloudSqlInstance: z.unknown().describe(
          "For display only. Metadata associated with a Cloud SQL instance.",
        ).optional(),
        datastreamPrivateConnection: z.unknown().describe(
          "For display only. Metadata associated with a Private Connection.",
        ).optional(),
        deliver: z.unknown().describe(
          'Details of the final state "deliver" and associated resource.',
        ).optional(),
        description: z.unknown().describe(
          "A description of the step. Usually this is a summary of the state.",
        ).optional(),
        directVpcEgressConnection: z.unknown().describe(
          "For display only. Metadata associated with a serverless direct VPC egress connection.",
        ).optional(),
        dmsPrivateConnection: z.unknown().describe(
          "For display only. Metadata associated with a Private Connection.",
        ).optional(),
        drop: z.unknown().describe(
          'Details of the final state "drop" and associated resource.',
        ).optional(),
        endpoint: z.unknown().describe(
          "For display only. The specification of the endpoints for the test. EndpointInfo is derived from source and destination Endpoint and validated by the backend data plane model.",
        ).optional(),
        firewall: z.unknown().describe(
          "For display only. Metadata associated with a VPC firewall rule, an implied VPC firewall rule, or a firewall policy rule.",
        ).optional(),
        forward: z.unknown().describe(
          'Details of the final state "forward" and associated resource.',
        ).optional(),
        forwardingRule: z.unknown().describe(
          "For display only. Metadata associated with a Compute Engine forwarding rule.",
        ).optional(),
        gkeMaster: z.unknown().describe(
          "For display only. Metadata associated with a Google Kubernetes Engine (GKE) cluster master.",
        ).optional(),
        gkeNetworkPolicy: z.unknown().describe(
          "For display only. Metadata associated with a GKE Network Policy.",
        ).optional(),
        gkeNetworkPolicySkipped: z.unknown().describe(
          "For display only. Contains information about why GKE Network Policy evaluation was skipped.",
        ).optional(),
        gkePod: z.unknown().describe(
          "For display only. Metadata associated with a Google Kubernetes Engine (GKE) Pod.",
        ).optional(),
        googleService: z.unknown().describe(
          "For display only. Details of a Google Service sending packets to a VPC network. Although the source IP might be a publicly routable address, some Google Services use special routes within Google production infrastructure to reach Compute Engine Instances. https://cloud.google.com/vpc/docs/routes#special_return_paths",
        ).optional(),
        hybridSubnet: z.unknown().describe(
          "For display only. Metadata associated with a hybrid subnet.",
        ).optional(),
        instance: z.unknown().describe(
          "For display only. Metadata associated with a Compute Engine instance.",
        ).optional(),
        interconnectAttachment: z.unknown().describe(
          "For display only. Metadata associated with an Interconnect attachment.",
        ).optional(),
        ipMasqueradingSkipped: z.unknown().describe(
          "For display only. Contains information about why IP masquerading was skipped for the packet.",
        ).optional(),
        loadBalancer: z.unknown().describe(
          "For display only. Metadata associated with a load balancer.",
        ).optional(),
        loadBalancerBackendInfo: z.unknown().describe(
          "For display only. Metadata associated with the load balancer backend.",
        ).optional(),
        nat: z.unknown().describe(
          "For display only. Metadata associated with NAT.",
        ).optional(),
        network: z.unknown().describe(
          "For display only. Metadata associated with a Compute Engine network.",
        ).optional(),
        ngfwPacketInspection: z.unknown().describe(
          "For display only. Metadata associated with a layer 7 packet inspection by the firewall.",
        ).optional(),
        projectId: z.unknown().describe(
          "Project ID that contains the configuration this step is validating.",
        ).optional(),
        proxyConnection: z.unknown().describe(
          "For display only. Metadata associated with ProxyConnection.",
        ).optional(),
        redisCluster: z.unknown().describe(
          "For display only. Metadata associated with a Redis Cluster.",
        ).optional(),
        redisInstance: z.unknown().describe(
          "For display only. Metadata associated with a Cloud Redis Instance.",
        ).optional(),
        route: z.unknown().describe(
          "For display only. Metadata associated with a Compute Engine route.",
        ).optional(),
        serverlessExternalConnection: z.unknown().describe(
          "For display only. Metadata associated with a serverless public connection.",
        ).optional(),
        serverlessNeg: z.unknown().describe(
          "For display only. Metadata associated with the serverless network endpoint group backend.",
        ).optional(),
        state: z.unknown().describe(
          "Each step is in one of the pre-defined states.",
        ).optional(),
        storageBucket: z.unknown().describe(
          "For display only. Metadata associated with Storage Bucket.",
        ).optional(),
        vpcConnector: z.unknown().describe(
          "For display only. Metadata associated with a VPC connector.",
        ).optional(),
        vpnGateway: z.unknown().describe(
          "For display only. Metadata associated with a Compute Engine VPN gateway.",
        ).optional(),
        vpnTunnel: z.unknown().describe(
          "For display only. Metadata associated with a Compute Engine VPN tunnel.",
        ).optional(),
      })).describe(
        "A trace of a test contains multiple steps from the initial state to the final state (delivered, dropped, forwarded, or aborted). The steps are ordered by the processing sequence within the simulated network state machine. It is critical to preserve the order of the steps and avoid reordering or sorting them.",
      ).optional(),
    })).describe(
      "Result may contain a list of traces if a test has multiple possible paths in the network, such as when destination endpoint is a load balancer with multiple backends.",
    ).optional(),
    verifyTime: z.string().describe("The time of the configuration analysis.")
      .optional(),
  }).describe(
    "Results of the configuration analysis from the last run of the test.",
  ).optional(),
  roundTrip: z.boolean().describe(
    "Whether run analysis for the return path from destination to source. Default value is false.",
  ).optional(),
  source: z.object({
    appEngineVersion: z.object({
      uri: z.string().describe(
        "An [App Engine](https://cloud.google.com/appengine) [service version](https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions) name.",
      ).optional(),
    }).describe("Wrapper for the App Engine service version attributes.")
      .optional(),
    cloudFunction: z.object({
      uri: z.string().describe(
        "A [Cloud Function](https://cloud.google.com/functions) name.",
      ).optional(),
    }).describe("Wrapper for Cloud Function attributes.").optional(),
    cloudRunRevision: z.object({
      serviceUri: z.string().describe(
        "Output only. The URI of the Cloud Run service that the revision belongs to. The format is: projects/{project}/locations/{location}/services/{service}",
      ).optional(),
      uri: z.string().describe(
        "A [Cloud Run](https://cloud.google.com/run) [revision](https://cloud.google.com/run/docs/reference/rest/v1/namespaces.revisions/get) URI. The format is: projects/{project}/locations/{location}/revisions/{revision}",
      ).optional(),
    }).describe("Wrapper for Cloud Run revision attributes.").optional(),
    cloudSqlInstance: z.string().describe(
      "A [Cloud SQL](https://cloud.google.com/sql) instance URI.",
    ).optional(),
    forwardingRule: z.string().describe(
      "A forwarding rule and its corresponding IP address represent the frontend configuration of a Google Cloud load balancer. Forwarding rules are also used for protocol forwarding, Private Service Connect and other network services to provide forwarding information in the control plane. Applicable only to destination endpoint. Format: `projects/{project}/global/forwardingRules/{id}` or `projects/{project}/regions/{region}/forwardingRules/{id}`",
    ).optional(),
    forwardingRuleTarget: z.enum([
      "FORWARDING_RULE_TARGET_UNSPECIFIED",
      "INSTANCE",
      "LOAD_BALANCER",
      "VPN_GATEWAY",
      "PSC",
    ]).describe(
      "Output only. Specifies the type of the target of the forwarding rule.",
    ).optional(),
    fqdn: z.string().describe(
      "DNS endpoint of [Google Kubernetes Engine cluster control plane](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture). Requires gke_master_cluster to be set, can't be used simultaneoulsly with ip_address or network. Applicable only to destination endpoint.",
    ).optional(),
    gkeMasterCluster: z.string().describe(
      "A cluster URI for [Google Kubernetes Engine cluster control plane](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture).",
    ).optional(),
    gkePod: z.string().describe(
      "A [GKE Pod](https://cloud.google.com/kubernetes-engine/docs/concepts/pod) URI.",
    ).optional(),
    instance: z.string().describe("A Compute Engine instance URI.").optional(),
    ipAddress: z.string().describe(
      "The IP address of the endpoint, which can be an external or internal IP.",
    ).optional(),
    loadBalancerId: z.string().describe(
      "Output only. ID of the load balancer the forwarding rule points to. Empty for forwarding rules not related to load balancers.",
    ).optional(),
    loadBalancerType: z.enum([
      "LOAD_BALANCER_TYPE_UNSPECIFIED",
      "HTTPS_ADVANCED_LOAD_BALANCER",
      "HTTPS_LOAD_BALANCER",
      "REGIONAL_HTTPS_LOAD_BALANCER",
      "INTERNAL_HTTPS_LOAD_BALANCER",
      "SSL_PROXY_LOAD_BALANCER",
      "TCP_PROXY_LOAD_BALANCER",
      "INTERNAL_TCP_PROXY_LOAD_BALANCER",
      "NETWORK_LOAD_BALANCER",
      "LEGACY_NETWORK_LOAD_BALANCER",
      "TCP_UDP_INTERNAL_LOAD_BALANCER",
    ]).describe(
      "Output only. Type of the load balancer the forwarding rule points to.",
    ).optional(),
    network: z.string().describe(
      "A VPC network URI. For source endpoints, used according to the `network_type`. For destination endpoints, used only when the source is an external IP address endpoint, and the destination is an internal IP address endpoint.",
    ).optional(),
    networkType: z.enum([
      "NETWORK_TYPE_UNSPECIFIED",
      "GCP_NETWORK",
      "NON_GCP_NETWORK",
      "INTERNET",
    ]).describe(
      "For source endpoints, type of the network where the endpoint is located. Not relevant for destination endpoints.",
    ).optional(),
    port: z.number().int().describe(
      "The IP protocol port of the endpoint. Only applicable when protocol is TCP or UDP.",
    ).optional(),
    projectId: z.string().describe(
      "For source endpoints, endpoint project ID. Used according to the `network_type`. Not relevant for destination endpoints.",
    ).optional(),
    redisCluster: z.string().describe(
      "A [Redis Cluster](https://cloud.google.com/memorystore/docs/cluster) URI. Applicable only to destination endpoint.",
    ).optional(),
    redisInstance: z.string().describe(
      "A [Redis Instance](https://cloud.google.com/memorystore/docs/redis) URI. Applicable only to destination endpoint.",
    ).optional(),
  }).describe("Source or destination of the Connectivity Test.").optional(),
  testId: z.string().describe(
    "Required. The logical name of the Connectivity Test in your project with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-40 characters. * Must end with a number or a letter. * Must be unique within the customer project",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  bypassFirewallChecks: z.boolean().optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  destination: z.object({
    appEngineVersion: z.object({
      uri: z.string(),
    }),
    cloudFunction: z.object({
      uri: z.string(),
    }),
    cloudRunRevision: z.object({
      serviceUri: z.string(),
      uri: z.string(),
    }),
    cloudSqlInstance: z.string(),
    forwardingRule: z.string(),
    forwardingRuleTarget: z.string(),
    fqdn: z.string(),
    gkeMasterCluster: z.string(),
    gkePod: z.string(),
    instance: z.string(),
    ipAddress: z.string(),
    loadBalancerId: z.string(),
    loadBalancerType: z.string(),
    network: z.string(),
    networkType: z.string(),
    port: z.number(),
    projectId: z.string(),
    redisCluster: z.string(),
    redisInstance: z.string(),
  }).optional(),
  displayName: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  probingDetails: z.object({
    abortCause: z.string(),
    destinationEgressLocation: z.object({
      metropolitanArea: z.string(),
    }),
    edgeResponses: z.array(z.object({
      destinationEgressLocation: z.object({
        metropolitanArea: z.string(),
      }),
      destinationRouter: z.string(),
      probingLatency: z.object({
        latencyPercentiles: z.array(z.unknown()),
      }),
      result: z.string(),
      sentProbeCount: z.number(),
      successfulProbeCount: z.number(),
    })),
    endpointInfo: z.object({
      destinationIp: z.string(),
      destinationNetworkUri: z.string(),
      destinationPort: z.number(),
      protocol: z.string(),
      sourceAgentUri: z.string(),
      sourceIp: z.string(),
      sourceNetworkUri: z.string(),
      sourcePort: z.number(),
    }),
    error: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    probedAllDevices: z.boolean(),
    probingLatency: z.object({
      latencyPercentiles: z.array(z.object({
        latencyMicros: z.string(),
        percent: z.number(),
      })),
    }),
    result: z.string(),
    sentProbeCount: z.number(),
    successfulProbeCount: z.number(),
    verifyTime: z.string(),
  }).optional(),
  protocol: z.string().optional(),
  reachabilityDetails: z.object({
    error: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    result: z.string(),
    traces: z.array(z.object({
      endpointInfo: z.object({
        destinationIp: z.string(),
        destinationNetworkUri: z.string(),
        destinationPort: z.number(),
        protocol: z.string(),
        sourceAgentUri: z.string(),
        sourceIp: z.string(),
        sourceNetworkUri: z.string(),
        sourcePort: z.number(),
      }),
      forwardTraceId: z.number(),
      steps: z.array(z.object({
        abort: z.unknown(),
        appEngineVersion: z.unknown(),
        causesDrop: z.unknown(),
        cloudFunction: z.unknown(),
        cloudRunRevision: z.unknown(),
        cloudSqlInstance: z.unknown(),
        datastreamPrivateConnection: z.unknown(),
        deliver: z.unknown(),
        description: z.unknown(),
        directVpcEgressConnection: z.unknown(),
        dmsPrivateConnection: z.unknown(),
        drop: z.unknown(),
        endpoint: z.unknown(),
        firewall: z.unknown(),
        forward: z.unknown(),
        forwardingRule: z.unknown(),
        gkeMaster: z.unknown(),
        gkeNetworkPolicy: z.unknown(),
        gkeNetworkPolicySkipped: z.unknown(),
        gkePod: z.unknown(),
        googleService: z.unknown(),
        hybridSubnet: z.unknown(),
        instance: z.unknown(),
        interconnectAttachment: z.unknown(),
        ipMasqueradingSkipped: z.unknown(),
        loadBalancer: z.unknown(),
        loadBalancerBackendInfo: z.unknown(),
        nat: z.unknown(),
        network: z.unknown(),
        ngfwPacketInspection: z.unknown(),
        projectId: z.unknown(),
        proxyConnection: z.unknown(),
        redisCluster: z.unknown(),
        redisInstance: z.unknown(),
        route: z.unknown(),
        serverlessExternalConnection: z.unknown(),
        serverlessNeg: z.unknown(),
        state: z.unknown(),
        storageBucket: z.unknown(),
        vpcConnector: z.unknown(),
        vpnGateway: z.unknown(),
        vpnTunnel: z.unknown(),
      })),
    })),
    verifyTime: z.string(),
  }).optional(),
  relatedProjects: z.array(z.string()).optional(),
  returnReachabilityDetails: z.object({
    error: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    result: z.string(),
    traces: z.array(z.object({
      endpointInfo: z.object({
        destinationIp: z.string(),
        destinationNetworkUri: z.string(),
        destinationPort: z.number(),
        protocol: z.string(),
        sourceAgentUri: z.string(),
        sourceIp: z.string(),
        sourceNetworkUri: z.string(),
        sourcePort: z.number(),
      }),
      forwardTraceId: z.number(),
      steps: z.array(z.object({
        abort: z.unknown(),
        appEngineVersion: z.unknown(),
        causesDrop: z.unknown(),
        cloudFunction: z.unknown(),
        cloudRunRevision: z.unknown(),
        cloudSqlInstance: z.unknown(),
        datastreamPrivateConnection: z.unknown(),
        deliver: z.unknown(),
        description: z.unknown(),
        directVpcEgressConnection: z.unknown(),
        dmsPrivateConnection: z.unknown(),
        drop: z.unknown(),
        endpoint: z.unknown(),
        firewall: z.unknown(),
        forward: z.unknown(),
        forwardingRule: z.unknown(),
        gkeMaster: z.unknown(),
        gkeNetworkPolicy: z.unknown(),
        gkeNetworkPolicySkipped: z.unknown(),
        gkePod: z.unknown(),
        googleService: z.unknown(),
        hybridSubnet: z.unknown(),
        instance: z.unknown(),
        interconnectAttachment: z.unknown(),
        ipMasqueradingSkipped: z.unknown(),
        loadBalancer: z.unknown(),
        loadBalancerBackendInfo: z.unknown(),
        nat: z.unknown(),
        network: z.unknown(),
        ngfwPacketInspection: z.unknown(),
        projectId: z.unknown(),
        proxyConnection: z.unknown(),
        redisCluster: z.unknown(),
        redisInstance: z.unknown(),
        route: z.unknown(),
        serverlessExternalConnection: z.unknown(),
        serverlessNeg: z.unknown(),
        state: z.unknown(),
        storageBucket: z.unknown(),
        vpcConnector: z.unknown(),
        vpnGateway: z.unknown(),
        vpnTunnel: z.unknown(),
      })),
    })),
    verifyTime: z.string(),
  }).optional(),
  roundTrip: z.boolean().optional(),
  source: z.object({
    appEngineVersion: z.object({
      uri: z.string(),
    }),
    cloudFunction: z.object({
      uri: z.string(),
    }),
    cloudRunRevision: z.object({
      serviceUri: z.string(),
      uri: z.string(),
    }),
    cloudSqlInstance: z.string(),
    forwardingRule: z.string(),
    forwardingRuleTarget: z.string(),
    fqdn: z.string(),
    gkeMasterCluster: z.string(),
    gkePod: z.string(),
    instance: z.string(),
    ipAddress: z.string(),
    loadBalancerId: z.string(),
    loadBalancerType: z.string(),
    network: z.string(),
    networkType: z.string(),
    port: z.number(),
    projectId: z.string(),
    redisCluster: z.string(),
    redisInstance: z.string(),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  bypassFirewallChecks: z.boolean().describe(
    "Whether the analysis should skip firewall checking. Default value is false.",
  ).optional(),
  description: z.string().describe(
    "The user-supplied description of the Connectivity Test. Maximum of 512 characters.",
  ).optional(),
  destination: z.object({
    appEngineVersion: z.object({
      uri: z.string().describe(
        "An [App Engine](https://cloud.google.com/appengine) [service version](https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions) name.",
      ).optional(),
    }).describe("Wrapper for the App Engine service version attributes.")
      .optional(),
    cloudFunction: z.object({
      uri: z.string().describe(
        "A [Cloud Function](https://cloud.google.com/functions) name.",
      ).optional(),
    }).describe("Wrapper for Cloud Function attributes.").optional(),
    cloudRunRevision: z.object({
      serviceUri: z.string().describe(
        "Output only. The URI of the Cloud Run service that the revision belongs to. The format is: projects/{project}/locations/{location}/services/{service}",
      ).optional(),
      uri: z.string().describe(
        "A [Cloud Run](https://cloud.google.com/run) [revision](https://cloud.google.com/run/docs/reference/rest/v1/namespaces.revisions/get) URI. The format is: projects/{project}/locations/{location}/revisions/{revision}",
      ).optional(),
    }).describe("Wrapper for Cloud Run revision attributes.").optional(),
    cloudSqlInstance: z.string().describe(
      "A [Cloud SQL](https://cloud.google.com/sql) instance URI.",
    ).optional(),
    forwardingRule: z.string().describe(
      "A forwarding rule and its corresponding IP address represent the frontend configuration of a Google Cloud load balancer. Forwarding rules are also used for protocol forwarding, Private Service Connect and other network services to provide forwarding information in the control plane. Applicable only to destination endpoint. Format: `projects/{project}/global/forwardingRules/{id}` or `projects/{project}/regions/{region}/forwardingRules/{id}`",
    ).optional(),
    forwardingRuleTarget: z.enum([
      "FORWARDING_RULE_TARGET_UNSPECIFIED",
      "INSTANCE",
      "LOAD_BALANCER",
      "VPN_GATEWAY",
      "PSC",
    ]).describe(
      "Output only. Specifies the type of the target of the forwarding rule.",
    ).optional(),
    fqdn: z.string().describe(
      "DNS endpoint of [Google Kubernetes Engine cluster control plane](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture). Requires gke_master_cluster to be set, can't be used simultaneoulsly with ip_address or network. Applicable only to destination endpoint.",
    ).optional(),
    gkeMasterCluster: z.string().describe(
      "A cluster URI for [Google Kubernetes Engine cluster control plane](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture).",
    ).optional(),
    gkePod: z.string().describe(
      "A [GKE Pod](https://cloud.google.com/kubernetes-engine/docs/concepts/pod) URI.",
    ).optional(),
    instance: z.string().describe("A Compute Engine instance URI.").optional(),
    ipAddress: z.string().describe(
      "The IP address of the endpoint, which can be an external or internal IP.",
    ).optional(),
    loadBalancerId: z.string().describe(
      "Output only. ID of the load balancer the forwarding rule points to. Empty for forwarding rules not related to load balancers.",
    ).optional(),
    loadBalancerType: z.enum([
      "LOAD_BALANCER_TYPE_UNSPECIFIED",
      "HTTPS_ADVANCED_LOAD_BALANCER",
      "HTTPS_LOAD_BALANCER",
      "REGIONAL_HTTPS_LOAD_BALANCER",
      "INTERNAL_HTTPS_LOAD_BALANCER",
      "SSL_PROXY_LOAD_BALANCER",
      "TCP_PROXY_LOAD_BALANCER",
      "INTERNAL_TCP_PROXY_LOAD_BALANCER",
      "NETWORK_LOAD_BALANCER",
      "LEGACY_NETWORK_LOAD_BALANCER",
      "TCP_UDP_INTERNAL_LOAD_BALANCER",
    ]).describe(
      "Output only. Type of the load balancer the forwarding rule points to.",
    ).optional(),
    network: z.string().describe(
      "A VPC network URI. For source endpoints, used according to the `network_type`. For destination endpoints, used only when the source is an external IP address endpoint, and the destination is an internal IP address endpoint.",
    ).optional(),
    networkType: z.enum([
      "NETWORK_TYPE_UNSPECIFIED",
      "GCP_NETWORK",
      "NON_GCP_NETWORK",
      "INTERNET",
    ]).describe(
      "For source endpoints, type of the network where the endpoint is located. Not relevant for destination endpoints.",
    ).optional(),
    port: z.number().int().describe(
      "The IP protocol port of the endpoint. Only applicable when protocol is TCP or UDP.",
    ).optional(),
    projectId: z.string().describe(
      "For source endpoints, endpoint project ID. Used according to the `network_type`. Not relevant for destination endpoints.",
    ).optional(),
    redisCluster: z.string().describe(
      "A [Redis Cluster](https://cloud.google.com/memorystore/docs/cluster) URI. Applicable only to destination endpoint.",
    ).optional(),
    redisInstance: z.string().describe(
      "A [Redis Instance](https://cloud.google.com/memorystore/docs/redis) URI. Applicable only to destination endpoint.",
    ).optional(),
  }).describe("Source or destination of the Connectivity Test.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Resource labels to represent user-provided metadata.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Unique name of the resource using the form: `projects/{project_id}/locations/global/connectivityTests/{test_id}`",
  ).optional(),
  probingDetails: z.object({
    abortCause: z.enum([
      "PROBING_ABORT_CAUSE_UNSPECIFIED",
      "PERMISSION_DENIED",
      "NO_SOURCE_LOCATION",
    ]).describe("The reason probing was aborted.").optional(),
    destinationEgressLocation: z.object({
      metropolitanArea: z.string().describe("Name of the metropolitan area.")
        .optional(),
    }).describe(
      "Representation of a network edge location as per https://cloud.google.com/vpc/docs/edge-locations.",
    ).optional(),
    edgeResponses: z.array(z.object({
      destinationEgressLocation: z.object({
        metropolitanArea: z.string().describe("Name of the metropolitan area.")
          .optional(),
      }).describe(
        "Representation of a network edge location as per https://cloud.google.com/vpc/docs/edge-locations.",
      ).optional(),
      destinationRouter: z.string().describe(
        "Router name in the format '{router}.{metroshard}'. For example: pf01.aaa01, pr02.aaa01.",
      ).optional(),
      probingLatency: z.object({
        latencyPercentiles: z.array(z.unknown()).describe(
          "Representative latency percentiles.",
        ).optional(),
      }).describe("Describes measured latency distribution.").optional(),
      result: z.enum([
        "PROBING_RESULT_UNSPECIFIED",
        "REACHABLE",
        "UNREACHABLE",
        "REACHABILITY_INCONSISTENT",
        "UNDETERMINED",
      ]).describe(
        "The overall result of active probing for this egress device.",
      ).optional(),
      sentProbeCount: z.number().int().describe("Number of probes sent.")
        .optional(),
      successfulProbeCount: z.number().int().describe(
        "Number of probes that reached the destination.",
      ).optional(),
    })).describe("Probing results for all edge devices.").optional(),
    endpointInfo: z.object({
      destinationIp: z.string().describe("Destination IP address.").optional(),
      destinationNetworkUri: z.string().describe(
        "URI of the network where this packet is sent to.",
      ).optional(),
      destinationPort: z.number().int().describe(
        "Destination port. Only valid when protocol is TCP or UDP.",
      ).optional(),
      protocol: z.string().describe(
        'IP protocol in string format, for example: "TCP", "UDP", "ICMP".',
      ).optional(),
      sourceAgentUri: z.string().describe(
        "URI of the source telemetry agent this packet originates from.",
      ).optional(),
      sourceIp: z.string().describe("Source IP address.").optional(),
      sourceNetworkUri: z.string().describe(
        "URI of the network where this packet originates from.",
      ).optional(),
      sourcePort: z.number().int().describe(
        "Source port. Only valid when protocol is TCP or UDP.",
      ).optional(),
    }).describe(
      "For display only. The specification of the endpoints for the test. EndpointInfo is derived from source and destination Endpoint and validated by the backend data plane model.",
    ).optional(),
    error: z.object({
      code: z.number().int().describe(
        "The status code, which should be an enum value of google.rpc.Code.",
      ).optional(),
      details: z.array(z.record(z.string(), z.string())).describe(
        "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
      ).optional(),
      message: z.string().describe(
        "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
      ).optional(),
    }).describe(
      "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
    ).optional(),
    probedAllDevices: z.boolean().describe(
      "Whether all relevant edge devices were probed.",
    ).optional(),
    probingLatency: z.object({
      latencyPercentiles: z.array(z.object({
        latencyMicros: z.string().describe(
          "percent-th percentile of latency observed, in microseconds. Fraction of percent/100 of samples have latency lower or equal to the value of this field.",
        ).optional(),
        percent: z.number().int().describe(
          "Percentage of samples this data point applies to.",
        ).optional(),
      })).describe("Representative latency percentiles.").optional(),
    }).describe("Describes measured latency distribution.").optional(),
    result: z.enum([
      "PROBING_RESULT_UNSPECIFIED",
      "REACHABLE",
      "UNREACHABLE",
      "REACHABILITY_INCONSISTENT",
      "UNDETERMINED",
    ]).describe("The overall result of active probing.").optional(),
    sentProbeCount: z.number().int().describe("Number of probes sent.")
      .optional(),
    successfulProbeCount: z.number().int().describe(
      "Number of probes that reached the destination.",
    ).optional(),
    verifyTime: z.string().describe(
      "The time that reachability was assessed through active probing.",
    ).optional(),
  }).describe("Results of active probing from the last run of the test.")
    .optional(),
  protocol: z.string().describe(
    'IP Protocol of the test. When not provided, "TCP" is assumed.',
  ).optional(),
  reachabilityDetails: z.object({
    error: z.object({
      code: z.number().int().describe(
        "The status code, which should be an enum value of google.rpc.Code.",
      ).optional(),
      details: z.array(z.record(z.string(), z.string())).describe(
        "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
      ).optional(),
      message: z.string().describe(
        "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
      ).optional(),
    }).describe(
      "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
    ).optional(),
    result: z.enum([
      "RESULT_UNSPECIFIED",
      "REACHABLE",
      "UNREACHABLE",
      "AMBIGUOUS",
      "UNDETERMINED",
    ]).describe("The overall result of the test's configuration analysis.")
      .optional(),
    traces: z.array(z.object({
      endpointInfo: z.object({
        destinationIp: z.string().describe("Destination IP address.")
          .optional(),
        destinationNetworkUri: z.string().describe(
          "URI of the network where this packet is sent to.",
        ).optional(),
        destinationPort: z.number().int().describe(
          "Destination port. Only valid when protocol is TCP or UDP.",
        ).optional(),
        protocol: z.string().describe(
          'IP protocol in string format, for example: "TCP", "UDP", "ICMP".',
        ).optional(),
        sourceAgentUri: z.string().describe(
          "URI of the source telemetry agent this packet originates from.",
        ).optional(),
        sourceIp: z.string().describe("Source IP address.").optional(),
        sourceNetworkUri: z.string().describe(
          "URI of the network where this packet originates from.",
        ).optional(),
        sourcePort: z.number().int().describe(
          "Source port. Only valid when protocol is TCP or UDP.",
        ).optional(),
      }).describe(
        "For display only. The specification of the endpoints for the test. EndpointInfo is derived from source and destination Endpoint and validated by the backend data plane model.",
      ).optional(),
      forwardTraceId: z.number().int().describe(
        "ID of trace. For forward traces, this ID is unique for each trace. For return traces, it matches ID of associated forward trace. A single forward trace can be associated with none, one or more than one return trace.",
      ).optional(),
      steps: z.array(z.object({
        abort: z.unknown().describe(
          'Details of the final state "abort" and associated resource.',
        ).optional(),
        appEngineVersion: z.unknown().describe(
          "For display only. Metadata associated with an App Engine version.",
        ).optional(),
        causesDrop: z.unknown().describe(
          "This is a step that leads to the final state Drop.",
        ).optional(),
        cloudFunction: z.unknown().describe(
          "For display only. Metadata associated with a Cloud Function.",
        ).optional(),
        cloudRunRevision: z.unknown().describe(
          "For display only. Metadata associated with a Cloud Run revision.",
        ).optional(),
        cloudSqlInstance: z.unknown().describe(
          "For display only. Metadata associated with a Cloud SQL instance.",
        ).optional(),
        datastreamPrivateConnection: z.unknown().describe(
          "For display only. Metadata associated with a Private Connection.",
        ).optional(),
        deliver: z.unknown().describe(
          'Details of the final state "deliver" and associated resource.',
        ).optional(),
        description: z.unknown().describe(
          "A description of the step. Usually this is a summary of the state.",
        ).optional(),
        directVpcEgressConnection: z.unknown().describe(
          "For display only. Metadata associated with a serverless direct VPC egress connection.",
        ).optional(),
        dmsPrivateConnection: z.unknown().describe(
          "For display only. Metadata associated with a Private Connection.",
        ).optional(),
        drop: z.unknown().describe(
          'Details of the final state "drop" and associated resource.',
        ).optional(),
        endpoint: z.unknown().describe(
          "For display only. The specification of the endpoints for the test. EndpointInfo is derived from source and destination Endpoint and validated by the backend data plane model.",
        ).optional(),
        firewall: z.unknown().describe(
          "For display only. Metadata associated with a VPC firewall rule, an implied VPC firewall rule, or a firewall policy rule.",
        ).optional(),
        forward: z.unknown().describe(
          'Details of the final state "forward" and associated resource.',
        ).optional(),
        forwardingRule: z.unknown().describe(
          "For display only. Metadata associated with a Compute Engine forwarding rule.",
        ).optional(),
        gkeMaster: z.unknown().describe(
          "For display only. Metadata associated with a Google Kubernetes Engine (GKE) cluster master.",
        ).optional(),
        gkeNetworkPolicy: z.unknown().describe(
          "For display only. Metadata associated with a GKE Network Policy.",
        ).optional(),
        gkeNetworkPolicySkipped: z.unknown().describe(
          "For display only. Contains information about why GKE Network Policy evaluation was skipped.",
        ).optional(),
        gkePod: z.unknown().describe(
          "For display only. Metadata associated with a Google Kubernetes Engine (GKE) Pod.",
        ).optional(),
        googleService: z.unknown().describe(
          "For display only. Details of a Google Service sending packets to a VPC network. Although the source IP might be a publicly routable address, some Google Services use special routes within Google production infrastructure to reach Compute Engine Instances. https://cloud.google.com/vpc/docs/routes#special_return_paths",
        ).optional(),
        hybridSubnet: z.unknown().describe(
          "For display only. Metadata associated with a hybrid subnet.",
        ).optional(),
        instance: z.unknown().describe(
          "For display only. Metadata associated with a Compute Engine instance.",
        ).optional(),
        interconnectAttachment: z.unknown().describe(
          "For display only. Metadata associated with an Interconnect attachment.",
        ).optional(),
        ipMasqueradingSkipped: z.unknown().describe(
          "For display only. Contains information about why IP masquerading was skipped for the packet.",
        ).optional(),
        loadBalancer: z.unknown().describe(
          "For display only. Metadata associated with a load balancer.",
        ).optional(),
        loadBalancerBackendInfo: z.unknown().describe(
          "For display only. Metadata associated with the load balancer backend.",
        ).optional(),
        nat: z.unknown().describe(
          "For display only. Metadata associated with NAT.",
        ).optional(),
        network: z.unknown().describe(
          "For display only. Metadata associated with a Compute Engine network.",
        ).optional(),
        ngfwPacketInspection: z.unknown().describe(
          "For display only. Metadata associated with a layer 7 packet inspection by the firewall.",
        ).optional(),
        projectId: z.unknown().describe(
          "Project ID that contains the configuration this step is validating.",
        ).optional(),
        proxyConnection: z.unknown().describe(
          "For display only. Metadata associated with ProxyConnection.",
        ).optional(),
        redisCluster: z.unknown().describe(
          "For display only. Metadata associated with a Redis Cluster.",
        ).optional(),
        redisInstance: z.unknown().describe(
          "For display only. Metadata associated with a Cloud Redis Instance.",
        ).optional(),
        route: z.unknown().describe(
          "For display only. Metadata associated with a Compute Engine route.",
        ).optional(),
        serverlessExternalConnection: z.unknown().describe(
          "For display only. Metadata associated with a serverless public connection.",
        ).optional(),
        serverlessNeg: z.unknown().describe(
          "For display only. Metadata associated with the serverless network endpoint group backend.",
        ).optional(),
        state: z.unknown().describe(
          "Each step is in one of the pre-defined states.",
        ).optional(),
        storageBucket: z.unknown().describe(
          "For display only. Metadata associated with Storage Bucket.",
        ).optional(),
        vpcConnector: z.unknown().describe(
          "For display only. Metadata associated with a VPC connector.",
        ).optional(),
        vpnGateway: z.unknown().describe(
          "For display only. Metadata associated with a Compute Engine VPN gateway.",
        ).optional(),
        vpnTunnel: z.unknown().describe(
          "For display only. Metadata associated with a Compute Engine VPN tunnel.",
        ).optional(),
      })).describe(
        "A trace of a test contains multiple steps from the initial state to the final state (delivered, dropped, forwarded, or aborted). The steps are ordered by the processing sequence within the simulated network state machine. It is critical to preserve the order of the steps and avoid reordering or sorting them.",
      ).optional(),
    })).describe(
      "Result may contain a list of traces if a test has multiple possible paths in the network, such as when destination endpoint is a load balancer with multiple backends.",
    ).optional(),
    verifyTime: z.string().describe("The time of the configuration analysis.")
      .optional(),
  }).describe(
    "Results of the configuration analysis from the last run of the test.",
  ).optional(),
  relatedProjects: z.array(z.string()).describe(
    "Other projects that may be relevant for reachability analysis. This is applicable to scenarios where a test can cross project boundaries.",
  ).optional(),
  returnReachabilityDetails: z.object({
    error: z.object({
      code: z.number().int().describe(
        "The status code, which should be an enum value of google.rpc.Code.",
      ).optional(),
      details: z.array(z.record(z.string(), z.string())).describe(
        "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
      ).optional(),
      message: z.string().describe(
        "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
      ).optional(),
    }).describe(
      "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
    ).optional(),
    result: z.enum([
      "RESULT_UNSPECIFIED",
      "REACHABLE",
      "UNREACHABLE",
      "AMBIGUOUS",
      "UNDETERMINED",
    ]).describe("The overall result of the test's configuration analysis.")
      .optional(),
    traces: z.array(z.object({
      endpointInfo: z.object({
        destinationIp: z.string().describe("Destination IP address.")
          .optional(),
        destinationNetworkUri: z.string().describe(
          "URI of the network where this packet is sent to.",
        ).optional(),
        destinationPort: z.number().int().describe(
          "Destination port. Only valid when protocol is TCP or UDP.",
        ).optional(),
        protocol: z.string().describe(
          'IP protocol in string format, for example: "TCP", "UDP", "ICMP".',
        ).optional(),
        sourceAgentUri: z.string().describe(
          "URI of the source telemetry agent this packet originates from.",
        ).optional(),
        sourceIp: z.string().describe("Source IP address.").optional(),
        sourceNetworkUri: z.string().describe(
          "URI of the network where this packet originates from.",
        ).optional(),
        sourcePort: z.number().int().describe(
          "Source port. Only valid when protocol is TCP or UDP.",
        ).optional(),
      }).describe(
        "For display only. The specification of the endpoints for the test. EndpointInfo is derived from source and destination Endpoint and validated by the backend data plane model.",
      ).optional(),
      forwardTraceId: z.number().int().describe(
        "ID of trace. For forward traces, this ID is unique for each trace. For return traces, it matches ID of associated forward trace. A single forward trace can be associated with none, one or more than one return trace.",
      ).optional(),
      steps: z.array(z.object({
        abort: z.unknown().describe(
          'Details of the final state "abort" and associated resource.',
        ).optional(),
        appEngineVersion: z.unknown().describe(
          "For display only. Metadata associated with an App Engine version.",
        ).optional(),
        causesDrop: z.unknown().describe(
          "This is a step that leads to the final state Drop.",
        ).optional(),
        cloudFunction: z.unknown().describe(
          "For display only. Metadata associated with a Cloud Function.",
        ).optional(),
        cloudRunRevision: z.unknown().describe(
          "For display only. Metadata associated with a Cloud Run revision.",
        ).optional(),
        cloudSqlInstance: z.unknown().describe(
          "For display only. Metadata associated with a Cloud SQL instance.",
        ).optional(),
        datastreamPrivateConnection: z.unknown().describe(
          "For display only. Metadata associated with a Private Connection.",
        ).optional(),
        deliver: z.unknown().describe(
          'Details of the final state "deliver" and associated resource.',
        ).optional(),
        description: z.unknown().describe(
          "A description of the step. Usually this is a summary of the state.",
        ).optional(),
        directVpcEgressConnection: z.unknown().describe(
          "For display only. Metadata associated with a serverless direct VPC egress connection.",
        ).optional(),
        dmsPrivateConnection: z.unknown().describe(
          "For display only. Metadata associated with a Private Connection.",
        ).optional(),
        drop: z.unknown().describe(
          'Details of the final state "drop" and associated resource.',
        ).optional(),
        endpoint: z.unknown().describe(
          "For display only. The specification of the endpoints for the test. EndpointInfo is derived from source and destination Endpoint and validated by the backend data plane model.",
        ).optional(),
        firewall: z.unknown().describe(
          "For display only. Metadata associated with a VPC firewall rule, an implied VPC firewall rule, or a firewall policy rule.",
        ).optional(),
        forward: z.unknown().describe(
          'Details of the final state "forward" and associated resource.',
        ).optional(),
        forwardingRule: z.unknown().describe(
          "For display only. Metadata associated with a Compute Engine forwarding rule.",
        ).optional(),
        gkeMaster: z.unknown().describe(
          "For display only. Metadata associated with a Google Kubernetes Engine (GKE) cluster master.",
        ).optional(),
        gkeNetworkPolicy: z.unknown().describe(
          "For display only. Metadata associated with a GKE Network Policy.",
        ).optional(),
        gkeNetworkPolicySkipped: z.unknown().describe(
          "For display only. Contains information about why GKE Network Policy evaluation was skipped.",
        ).optional(),
        gkePod: z.unknown().describe(
          "For display only. Metadata associated with a Google Kubernetes Engine (GKE) Pod.",
        ).optional(),
        googleService: z.unknown().describe(
          "For display only. Details of a Google Service sending packets to a VPC network. Although the source IP might be a publicly routable address, some Google Services use special routes within Google production infrastructure to reach Compute Engine Instances. https://cloud.google.com/vpc/docs/routes#special_return_paths",
        ).optional(),
        hybridSubnet: z.unknown().describe(
          "For display only. Metadata associated with a hybrid subnet.",
        ).optional(),
        instance: z.unknown().describe(
          "For display only. Metadata associated with a Compute Engine instance.",
        ).optional(),
        interconnectAttachment: z.unknown().describe(
          "For display only. Metadata associated with an Interconnect attachment.",
        ).optional(),
        ipMasqueradingSkipped: z.unknown().describe(
          "For display only. Contains information about why IP masquerading was skipped for the packet.",
        ).optional(),
        loadBalancer: z.unknown().describe(
          "For display only. Metadata associated with a load balancer.",
        ).optional(),
        loadBalancerBackendInfo: z.unknown().describe(
          "For display only. Metadata associated with the load balancer backend.",
        ).optional(),
        nat: z.unknown().describe(
          "For display only. Metadata associated with NAT.",
        ).optional(),
        network: z.unknown().describe(
          "For display only. Metadata associated with a Compute Engine network.",
        ).optional(),
        ngfwPacketInspection: z.unknown().describe(
          "For display only. Metadata associated with a layer 7 packet inspection by the firewall.",
        ).optional(),
        projectId: z.unknown().describe(
          "Project ID that contains the configuration this step is validating.",
        ).optional(),
        proxyConnection: z.unknown().describe(
          "For display only. Metadata associated with ProxyConnection.",
        ).optional(),
        redisCluster: z.unknown().describe(
          "For display only. Metadata associated with a Redis Cluster.",
        ).optional(),
        redisInstance: z.unknown().describe(
          "For display only. Metadata associated with a Cloud Redis Instance.",
        ).optional(),
        route: z.unknown().describe(
          "For display only. Metadata associated with a Compute Engine route.",
        ).optional(),
        serverlessExternalConnection: z.unknown().describe(
          "For display only. Metadata associated with a serverless public connection.",
        ).optional(),
        serverlessNeg: z.unknown().describe(
          "For display only. Metadata associated with the serverless network endpoint group backend.",
        ).optional(),
        state: z.unknown().describe(
          "Each step is in one of the pre-defined states.",
        ).optional(),
        storageBucket: z.unknown().describe(
          "For display only. Metadata associated with Storage Bucket.",
        ).optional(),
        vpcConnector: z.unknown().describe(
          "For display only. Metadata associated with a VPC connector.",
        ).optional(),
        vpnGateway: z.unknown().describe(
          "For display only. Metadata associated with a Compute Engine VPN gateway.",
        ).optional(),
        vpnTunnel: z.unknown().describe(
          "For display only. Metadata associated with a Compute Engine VPN tunnel.",
        ).optional(),
      })).describe(
        "A trace of a test contains multiple steps from the initial state to the final state (delivered, dropped, forwarded, or aborted). The steps are ordered by the processing sequence within the simulated network state machine. It is critical to preserve the order of the steps and avoid reordering or sorting them.",
      ).optional(),
    })).describe(
      "Result may contain a list of traces if a test has multiple possible paths in the network, such as when destination endpoint is a load balancer with multiple backends.",
    ).optional(),
    verifyTime: z.string().describe("The time of the configuration analysis.")
      .optional(),
  }).describe(
    "Results of the configuration analysis from the last run of the test.",
  ).optional(),
  roundTrip: z.boolean().describe(
    "Whether run analysis for the return path from destination to source. Default value is false.",
  ).optional(),
  source: z.object({
    appEngineVersion: z.object({
      uri: z.string().describe(
        "An [App Engine](https://cloud.google.com/appengine) [service version](https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions) name.",
      ).optional(),
    }).describe("Wrapper for the App Engine service version attributes.")
      .optional(),
    cloudFunction: z.object({
      uri: z.string().describe(
        "A [Cloud Function](https://cloud.google.com/functions) name.",
      ).optional(),
    }).describe("Wrapper for Cloud Function attributes.").optional(),
    cloudRunRevision: z.object({
      serviceUri: z.string().describe(
        "Output only. The URI of the Cloud Run service that the revision belongs to. The format is: projects/{project}/locations/{location}/services/{service}",
      ).optional(),
      uri: z.string().describe(
        "A [Cloud Run](https://cloud.google.com/run) [revision](https://cloud.google.com/run/docs/reference/rest/v1/namespaces.revisions/get) URI. The format is: projects/{project}/locations/{location}/revisions/{revision}",
      ).optional(),
    }).describe("Wrapper for Cloud Run revision attributes.").optional(),
    cloudSqlInstance: z.string().describe(
      "A [Cloud SQL](https://cloud.google.com/sql) instance URI.",
    ).optional(),
    forwardingRule: z.string().describe(
      "A forwarding rule and its corresponding IP address represent the frontend configuration of a Google Cloud load balancer. Forwarding rules are also used for protocol forwarding, Private Service Connect and other network services to provide forwarding information in the control plane. Applicable only to destination endpoint. Format: `projects/{project}/global/forwardingRules/{id}` or `projects/{project}/regions/{region}/forwardingRules/{id}`",
    ).optional(),
    forwardingRuleTarget: z.enum([
      "FORWARDING_RULE_TARGET_UNSPECIFIED",
      "INSTANCE",
      "LOAD_BALANCER",
      "VPN_GATEWAY",
      "PSC",
    ]).describe(
      "Output only. Specifies the type of the target of the forwarding rule.",
    ).optional(),
    fqdn: z.string().describe(
      "DNS endpoint of [Google Kubernetes Engine cluster control plane](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture). Requires gke_master_cluster to be set, can't be used simultaneoulsly with ip_address or network. Applicable only to destination endpoint.",
    ).optional(),
    gkeMasterCluster: z.string().describe(
      "A cluster URI for [Google Kubernetes Engine cluster control plane](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture).",
    ).optional(),
    gkePod: z.string().describe(
      "A [GKE Pod](https://cloud.google.com/kubernetes-engine/docs/concepts/pod) URI.",
    ).optional(),
    instance: z.string().describe("A Compute Engine instance URI.").optional(),
    ipAddress: z.string().describe(
      "The IP address of the endpoint, which can be an external or internal IP.",
    ).optional(),
    loadBalancerId: z.string().describe(
      "Output only. ID of the load balancer the forwarding rule points to. Empty for forwarding rules not related to load balancers.",
    ).optional(),
    loadBalancerType: z.enum([
      "LOAD_BALANCER_TYPE_UNSPECIFIED",
      "HTTPS_ADVANCED_LOAD_BALANCER",
      "HTTPS_LOAD_BALANCER",
      "REGIONAL_HTTPS_LOAD_BALANCER",
      "INTERNAL_HTTPS_LOAD_BALANCER",
      "SSL_PROXY_LOAD_BALANCER",
      "TCP_PROXY_LOAD_BALANCER",
      "INTERNAL_TCP_PROXY_LOAD_BALANCER",
      "NETWORK_LOAD_BALANCER",
      "LEGACY_NETWORK_LOAD_BALANCER",
      "TCP_UDP_INTERNAL_LOAD_BALANCER",
    ]).describe(
      "Output only. Type of the load balancer the forwarding rule points to.",
    ).optional(),
    network: z.string().describe(
      "A VPC network URI. For source endpoints, used according to the `network_type`. For destination endpoints, used only when the source is an external IP address endpoint, and the destination is an internal IP address endpoint.",
    ).optional(),
    networkType: z.enum([
      "NETWORK_TYPE_UNSPECIFIED",
      "GCP_NETWORK",
      "NON_GCP_NETWORK",
      "INTERNET",
    ]).describe(
      "For source endpoints, type of the network where the endpoint is located. Not relevant for destination endpoints.",
    ).optional(),
    port: z.number().int().describe(
      "The IP protocol port of the endpoint. Only applicable when protocol is TCP or UDP.",
    ).optional(),
    projectId: z.string().describe(
      "For source endpoints, endpoint project ID. Used according to the `network_type`. Not relevant for destination endpoints.",
    ).optional(),
    redisCluster: z.string().describe(
      "A [Redis Cluster](https://cloud.google.com/memorystore/docs/cluster) URI. Applicable only to destination endpoint.",
    ).optional(),
    redisInstance: z.string().describe(
      "A [Redis Instance](https://cloud.google.com/memorystore/docs/redis) URI. Applicable only to destination endpoint.",
    ).optional(),
  }).describe("Source or destination of the Connectivity Test.").optional(),
  testId: z.string().describe(
    "Required. The logical name of the Connectivity Test in your project with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-40 characters. * Must end with a number or a letter. * Must be unique within the customer project",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Network Management Global.ConnectivityTests. Registered at `@swamp/gcp/networkmanagement/global-connectivitytests`. */
export const model = {
  type: "@swamp/gcp/networkmanagement/global-connectivitytests",
  version: "2026.05.26.1",
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
      toVersion: "2026.04.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
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
      toVersion: "2026.05.20.1",
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
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A Connectivity Test for a network reachability analysis.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a connectivityTests",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["bypassFirewallChecks"] !== undefined) {
          body["bypassFirewallChecks"] = g["bypassFirewallChecks"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["destination"] !== undefined) {
          body["destination"] = g["destination"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["probingDetails"] !== undefined) {
          body["probingDetails"] = g["probingDetails"];
        }
        if (g["protocol"] !== undefined) body["protocol"] = g["protocol"];
        if (g["reachabilityDetails"] !== undefined) {
          body["reachabilityDetails"] = g["reachabilityDetails"];
        }
        if (g["relatedProjects"] !== undefined) {
          body["relatedProjects"] = g["relatedProjects"];
        }
        if (g["returnReachabilityDetails"] !== undefined) {
          body["returnReachabilityDetails"] = g["returnReachabilityDetails"];
        }
        if (g["roundTrip"] !== undefined) body["roundTrip"] = g["roundTrip"];
        if (g["source"] !== undefined) body["source"] = g["source"];
        if (g["testId"] !== undefined) body["testId"] = g["testId"];
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
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
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
      description: "Get a connectivityTests",
      arguments: z.object({
        identifier: z.string().describe("The name of the connectivityTests"),
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
      description: "Update connectivityTests attributes",
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
        if (g["bypassFirewallChecks"] !== undefined) {
          body["bypassFirewallChecks"] = g["bypassFirewallChecks"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["destination"] !== undefined) {
          body["destination"] = g["destination"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["probingDetails"] !== undefined) {
          body["probingDetails"] = g["probingDetails"];
        }
        if (g["protocol"] !== undefined) body["protocol"] = g["protocol"];
        if (g["reachabilityDetails"] !== undefined) {
          body["reachabilityDetails"] = g["reachabilityDetails"];
        }
        if (g["relatedProjects"] !== undefined) {
          body["relatedProjects"] = g["relatedProjects"];
        }
        if (g["returnReachabilityDetails"] !== undefined) {
          body["returnReachabilityDetails"] = g["returnReachabilityDetails"];
        }
        if (g["roundTrip"] !== undefined) body["roundTrip"] = g["roundTrip"];
        if (g["source"] !== undefined) body["source"] = g["source"];
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
      description: "Delete the connectivityTests",
      arguments: z.object({
        identifier: z.string().describe("The name of the connectivityTests"),
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
      description: "Sync connectivityTests state from GCP",
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
    list: {
      description: "List connectivityTests resources",
      arguments: z.object({
        filter: z.string().describe(
          'Lists the `ConnectivityTests` that match the filter expression. A filter expression filters the resources listed in the response. The expression must be of the form ` ` where operators: `<`, `>`, `<=`, `>=`, `!=`, `=`, `:` are supported (colon `:` represents a HAS operator which is roughly synonymous with equality). can refer to a proto or JSON field, or a synthetic field. Field names can be camelCase or snake_case. Examples: - Filter by name: name = "projects/proj-1/locations/global/connectivityTests/test-1 - Filter by labels: - Resources that have a key called `foo` labels.foo:* - Resources that have a key called `foo` whose value is `bar` labels.foo = bar',
        ).optional(),
        orderBy: z.string().describe("Field to use to sort the list.")
          .optional(),
        pageSize: z.number().describe(
          "Number of `ConnectivityTests` to return.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "resources",
          (args.maxPages as number | undefined) ?? 10,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.name?.toString() ?? String(i)).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource(
            "state",
            instanceName,
            item,
          );
          dataHandles.push(handle);
        }
        return { dataHandles, result: { count: items.length, nextPageToken } };
      },
    },
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "networkmanagement.projects.locations.global.connectivityTests.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["resource"],
            "parameters": {
              "options.requestedPolicyVersion": { "location": "query" },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    rerun: {
      description: "rerun",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "networkmanagement.projects.locations.global.connectivityTests.rerun",
            "path": "v1/{+name}:rerun",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
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
            "id":
              "networkmanagement.projects.locations.global.connectivityTests.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
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
            "id":
              "networkmanagement.projects.locations.global.connectivityTests.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
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
