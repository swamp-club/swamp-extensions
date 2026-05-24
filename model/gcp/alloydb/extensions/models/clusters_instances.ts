// Auto-generated extension model for @swamp/gcp/alloydb/clusters-instances
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud AlloyDB Clusters.Instances.
 *
 * An Instance is a computing unit that an end customer can connect to. It's the main unit of computing resources in AlloyDB.
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
  return `${parent}/instances/${shortName}`;
}

const BASE_URL = "https://alloydb.googleapis.com/";

const GET_CONFIG = {
  "id": "alloydb.projects.locations.clusters.instances.get",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "alloydb.projects.locations.clusters.instances.create",
  "path": "v1/{+parent}/instances",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "instanceId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "alloydb.projects.locations.clusters.instances.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "alloydb.projects.locations.clusters.instances.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "alloydb.projects.locations.clusters.instances.list",
  "path": "v1/{+parent}/instances",
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  activationPolicy: z.enum(["ACTIVATION_POLICY_UNSPECIFIED", "ALWAYS", "NEVER"])
    .describe(
      "Optional. Specifies whether an instance needs to spin up. Once the instance is active, the activation policy can be updated to the `NEVER` to stop the instance. Likewise, the activation policy can be updated to `ALWAYS` to start the instance. There are restrictions around when an instance can/cannot be activated (for example, a read pool instance should be stopped before stopping primary etc.). Please refer to the API documentation for more details.",
    ).optional(),
  annotations: z.record(z.string(), z.string()).describe(
    "Annotations to allow client tools to store small amount of arbitrary data. This is distinct from labels. https://google.aip.dev/128",
  ).optional(),
  availabilityType: z.enum([
    "AVAILABILITY_TYPE_UNSPECIFIED",
    "ZONAL",
    "REGIONAL",
  ]).describe(
    "Availability type of an Instance. If empty, defaults to REGIONAL for primary instances. For read pools, availability_type is always UNSPECIFIED. Instances in the read pools are evenly distributed across available zones within the region (i.e. read pools with more than one node will have a node in at least two zones).",
  ).optional(),
  clientConnectionConfig: z.object({
    requireConnectors: z.boolean().describe(
      "Optional. Configuration to enforce connectors only (ex: AuthProxy) connections to the database.",
    ).optional(),
    sslConfig: z.object({
      caSource: z.enum(["CA_SOURCE_UNSPECIFIED", "CA_SOURCE_MANAGED"]).describe(
        "Optional. Certificate Authority (CA) source. Only CA_SOURCE_MANAGED is supported currently, and is the default value.",
      ).optional(),
      sslMode: z.enum([
        "SSL_MODE_UNSPECIFIED",
        "SSL_MODE_ALLOW",
        "SSL_MODE_REQUIRE",
        "SSL_MODE_VERIFY_CA",
        "ALLOW_UNENCRYPTED_AND_ENCRYPTED",
        "ENCRYPTED_ONLY",
      ]).describe(
        "Optional. SSL mode. Specifies client-server SSL/TLS connection behavior.",
      ).optional(),
    }).describe("SSL configuration.").optional(),
  }).describe("Client connection configuration").optional(),
  connectionPoolConfig: z.object({
    authproxyPoolerCount: z.number().int().describe(
      "Output only. The number of running AuthProxy poolers per instance.",
    ).optional(),
    enabled: z.boolean().describe(
      "Optional. Whether to enable Managed Connection Pool (MCP).",
    ).optional(),
    flags: z.record(z.string(), z.string()).describe(
      'Optional. Connection Pool flags, as a list of "key": "value" pairs.',
    ).optional(),
    poolerCount: z.number().int().describe(
      "Output only. The number of running poolers per instance.",
    ).optional(),
  }).describe("Configuration for Managed Connection Pool (MCP).").optional(),
  dataApiAccess: z.enum([
    "DEFAULT_DATA_API_ENABLED_FOR_GOOGLE_CLOUD_SERVICES",
    "DISABLED",
    "ENABLED",
  ]).describe(
    "Optional. Controls whether the Data API is enabled for this instance. When enabled, this allows authorized users to connect to the instance from the public internet using the `executeSql` API, even for private IP instances. If this is not specified, the data API is enabled by default for Google internal services like AlloyDB Studio. Disable it explicitly to disallow Google internal services as well.",
  ).optional(),
  databaseFlags: z.record(z.string(), z.string()).describe(
    'Database flags. Set at the instance level. They are copied from the primary instance on secondary instance creation. Flags that have restrictions default to the value at primary instance on read instances during creation. Read instances can set new flags or override existing flags that are relevant for reads, for example, for enabling columnar cache on a read instance. Flags set on read instance might or might not be present on the primary instance. This is a list of "key": "value" pairs. "key": The name of the flag. These flags are passed at instance setup time, so include both server options and system variables for Postgres. Flags are specified with underscores, not hyphens. "value": The value of the flag. Booleans are set to **on** for true and **off** for false. This field must be omitted if the flag doesn\'t take a value.',
  ).optional(),
  displayName: z.string().describe(
    "User-settable and human-readable display name for the Instance.",
  ).optional(),
  gceZone: z.string().describe(
    "The Compute Engine zone that the instance should serve from, per https://cloud.google.com/compute/docs/regions-zones This can ONLY be specified for ZONAL instances. If present for a REGIONAL instance, an error will be thrown. If this is absent for a ZONAL instance, instance is created in a random zone with available capacity.",
  ).optional(),
  instanceType: z.enum([
    "INSTANCE_TYPE_UNSPECIFIED",
    "PRIMARY",
    "READ_POOL",
    "SECONDARY",
  ]).describe("Required. The type of the instance. Specified at creation time.")
    .optional(),
  labels: z.record(z.string(), z.string()).describe("Labels as key value pairs")
    .optional(),
  machineConfig: z.object({
    cpuCount: z.number().int().describe(
      "The number of CPU's in the VM instance.",
    ).optional(),
    machineType: z.string().describe(
      'Machine type of the VM instance. E.g. "n2-highmem-4", "n2-highmem-8", "c4a-highmem-4-lssd". cpu_count must match the number of vCPUs in the machine type.',
    ).optional(),
  }).describe("MachineConfig describes the configuration of a machine.")
    .optional(),
  networkConfig: z.object({
    allocatedIpRangeOverride: z.string().describe(
      'Optional. Name of the allocated IP range for the private IP AlloyDB instance, for example: "google-managed-services-default". If set, the instance IPs will be created from this allocated range and will override the IP range used by the parent cluster. The range name must comply with [RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035). Specifically, the name must be 1-63 characters long and match the regular expression [a-z]([-a-z0-9]*[a-z0-9])?.',
    ).optional(),
    authorizedExternalNetworks: z.array(z.object({
      cidrRange: z.string().describe(
        "CIDR range for one authorzied network of the instance.",
      ).optional(),
    })).describe(
      "Optional. A list of external network authorized to access this instance.",
    ).optional(),
    enableOutboundPublicIp: z.boolean().describe(
      "Optional. Enabling an outbound public IP address to support a database server sending requests out into the internet.",
    ).optional(),
    enablePublicIp: z.boolean().describe(
      "Optional. Enabling public ip for the instance.",
    ).optional(),
    network: z.string().describe(
      "Output only. The resource link for the VPC network in which instance resources are created and from which they are accessible via Private IP. This will be the same value as the parent cluster's network. It is specified in the form: // `projects/{project_number}/global/networks/{network_id}`.",
    ).optional(),
  }).describe("Metadata related to instance-level network configuration.")
    .optional(),
  observabilityConfig: z.object({
    enabled: z.boolean().describe(
      'Observability feature status for an instance. This flag is turned "off" by default.',
    ).optional(),
    maxQueryStringLength: z.number().int().describe(
      "Query string length. The default value is 10k.",
    ).optional(),
    preserveComments: z.boolean().describe(
      'Preserve comments in query string for an instance. This flag is turned "off" by default.',
    ).optional(),
    queryPlansPerMinute: z.number().int().describe(
      "Number of query execution plans captured by Insights per minute for all queries combined. The default value is 200. Any integer between 0 to 200 is considered valid.",
    ).optional(),
    recordApplicationTags: z.boolean().describe(
      'Record application tags for an instance. This flag is turned "off" by default.',
    ).optional(),
    trackActiveQueries: z.boolean().describe(
      'Track actively running queries on the instance. If not set, this flag is "off" by default.',
    ).optional(),
    trackWaitEventTypes: z.boolean().describe(
      'Output only. Track wait event types during query execution for an instance. This flag is turned "on" by default but tracking is enabled only after observability enabled flag is also turned on. This is read-only flag and only modifiable by internal API.',
    ).optional(),
    trackWaitEvents: z.boolean().describe(
      'Track wait events during query execution for an instance. This flag is turned "on" by default but tracking is enabled only after observability enabled flag is also turned on.',
    ).optional(),
  }).describe("Observability Instance specific configuration.").optional(),
  pscInstanceConfig: z.object({
    allowedConsumerProjects: z.array(z.string()).describe(
      "Optional. List of consumer projects that are allowed to create PSC endpoints to service-attachments to this instance.",
    ).optional(),
    pscAutoConnections: z.array(z.object({
      consumerNetwork: z.string().describe(
        'The consumer network for the PSC service automation, example: "projects/vpc-host-project/global/networks/default". The consumer network might be hosted a different project than the consumer project.',
      ).optional(),
      consumerNetworkStatus: z.string().describe(
        'Output only. The status of the service connection policy. Possible values: "STATE_UNSPECIFIED" - Default state, when Connection Map is created initially. "VALID" - Set when policy and map configuration is valid, and their matching can lead to allowing creation of PSC Connections subject to other constraints like connections limit. "CONNECTION_POLICY_MISSING" - No Service Connection Policy found for this network and Service Class "POLICY_LIMIT_REACHED" - Service Connection Policy limit reached for this network and Service Class "CONSUMER_INSTANCE_PROJECT_NOT_ALLOWLISTED" - The consumer instance project is not in AllowedGoogleProducersResourceHierarchyLevels of the matching ServiceConnectionPolicy.',
      ).optional(),
      consumerProject: z.string().describe(
        "The consumer project to which the PSC service automation endpoint will be created.",
      ).optional(),
      ipAddress: z.string().describe(
        "Output only. The IP address of the PSC service automation endpoint.",
      ).optional(),
      status: z.string().describe(
        'Output only. The status of the PSC service automation connection. Possible values: "STATE_UNSPECIFIED" - An invalid state as the default case. "ACTIVE" - The connection has been created successfully. "FAILED" - The connection is not functional since some resources on the connection fail to be created. "CREATING" - The connection is being created. "DELETING" - The connection is being deleted. "CREATE_REPAIRING" - The connection is being repaired to complete creation. "DELETE_REPAIRING" - The connection is being repaired to complete deletion.',
      ).optional(),
    })).describe(
      "Optional. Configurations for setting up PSC service automation.",
    ).optional(),
    pscDnsName: z.string().describe(
      "Output only. The DNS name of the instance for PSC connectivity. Name convention:...alloydb-psc.goog",
    ).optional(),
    pscInterfaceConfigs: z.array(z.object({
      networkAttachmentResource: z.string().describe(
        'The network attachment resource created in the consumer network to which the PSC interface will be linked. This is of the format: "projects/${CONSUMER_PROJECT}/regions/${REGION}/networkAttachments/${NETWORK_ATTACHMENT_NAME}". The network attachment must be in the same region as the instance.',
      ).optional(),
    })).describe(
      "Optional. Configurations for setting up PSC interfaces attached to the instance which are used for outbound connectivity. Only primary instances can have PSC interface attached. Currently we only support 0 or 1 PSC interface.",
    ).optional(),
    serviceAttachmentLink: z.string().describe(
      "Output only. The service attachment created when Private Service Connect (PSC) is enabled for the instance. The name of the resource will be in the format of `projects//regions//serviceAttachments/`",
    ).optional(),
  }).describe(
    "PscInstanceConfig contains PSC related configuration at an instance level.",
  ).optional(),
  queryInsightsConfig: z.object({
    queryPlansPerMinute: z.number().int().describe(
      "Number of query execution plans captured by Insights per minute for all queries combined. The default value is 5. Any integer between 0 and 20 is considered valid.",
    ).optional(),
    queryStringLength: z.number().int().describe(
      "Query string length. The default value is 1024. Any integer between 256 and 4500 is considered valid.",
    ).optional(),
    recordApplicationTags: z.boolean().describe(
      'Record application tags for an instance. This flag is turned "on" by default.',
    ).optional(),
    recordClientAddress: z.boolean().describe(
      'Record client address for an instance. Client address is PII information. This flag is turned "on" by default.',
    ).optional(),
  }).describe("QueryInsights Instance specific configuration.").optional(),
  readPoolConfig: z.object({
    nodeCount: z.number().int().describe(
      "Read capacity, i.e. number of nodes in a read pool instance.",
    ).optional(),
  }).describe("Configuration for a read pool instance.").optional(),
  writableNode: z.object({
    id: z.string().describe(
      'Output only. The identifier of the VM e.g. "test-read-0601-407e52be-ms3l".',
    ).optional(),
    ip: z.string().describe(
      'Output only. The private IP address of the VM e.g. "10.57.0.34".',
    ).optional(),
    isHotStandby: z.boolean().describe(
      "Output only. Indicates whether the node set up to be configured as a hot standby.",
    ).optional(),
    state: z.string().describe(
      "Output only. Determined by state of the compute VM and postgres-service health. Compute VM state can have values listed in https://cloud.google.com/compute/docs/instances/instance-life-cycle and postgres-service health can have values: HEALTHY and UNHEALTHY.",
    ).optional(),
    zoneId: z.string().describe(
      'Output only. The Compute Engine zone of the VM e.g. "us-central1-b".',
    ).optional(),
  }).describe(
    "Details of a single node in the instance. Nodes in an AlloyDB instance are ephemeral, they can change during update, failover, autohealing and resize operations.",
  ).optional(),
  instanceId: z.string().describe("Required. ID of the requesting object.")
    .optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  activationPolicy: z.string().optional(),
  annotations: z.record(z.string(), z.unknown()).optional(),
  availabilityType: z.string().optional(),
  clientConnectionConfig: z.object({
    requireConnectors: z.boolean(),
    sslConfig: z.object({
      caSource: z.string(),
      sslMode: z.string(),
    }),
  }).optional(),
  connectionPoolConfig: z.object({
    authproxyPoolerCount: z.number(),
    enabled: z.boolean(),
    flags: z.record(z.string(), z.unknown()),
    poolerCount: z.number(),
  }).optional(),
  createTime: z.string().optional(),
  dataApiAccess: z.string().optional(),
  databaseFlags: z.record(z.string(), z.unknown()).optional(),
  deleteTime: z.string().optional(),
  displayName: z.string().optional(),
  etag: z.string().optional(),
  gceZone: z.string().optional(),
  instanceType: z.string().optional(),
  ipAddress: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  machineConfig: z.object({
    cpuCount: z.number(),
    machineType: z.string(),
  }).optional(),
  maintenanceVersionName: z.string().optional(),
  name: z.string(),
  networkConfig: z.object({
    allocatedIpRangeOverride: z.string(),
    authorizedExternalNetworks: z.array(z.object({
      cidrRange: z.string(),
    })),
    enableOutboundPublicIp: z.boolean(),
    enablePublicIp: z.boolean(),
    network: z.string(),
  }).optional(),
  nodes: z.array(z.object({
    id: z.string(),
    ip: z.string(),
    isHotStandby: z.boolean(),
    state: z.string(),
    zoneId: z.string(),
  })).optional(),
  observabilityConfig: z.object({
    enabled: z.boolean(),
    maxQueryStringLength: z.number(),
    preserveComments: z.boolean(),
    queryPlansPerMinute: z.number(),
    recordApplicationTags: z.boolean(),
    trackActiveQueries: z.boolean(),
    trackWaitEventTypes: z.boolean(),
    trackWaitEvents: z.boolean(),
  }).optional(),
  outboundPublicIpAddresses: z.array(z.string()).optional(),
  pscInstanceConfig: z.object({
    allowedConsumerProjects: z.array(z.string()),
    pscAutoConnections: z.array(z.object({
      consumerNetwork: z.string(),
      consumerNetworkStatus: z.string(),
      consumerProject: z.string(),
      ipAddress: z.string(),
      status: z.string(),
    })),
    pscDnsName: z.string(),
    pscInterfaceConfigs: z.array(z.object({
      networkAttachmentResource: z.string(),
    })),
    serviceAttachmentLink: z.string(),
  }).optional(),
  publicIpAddress: z.string().optional(),
  queryInsightsConfig: z.object({
    queryPlansPerMinute: z.number(),
    queryStringLength: z.number(),
    recordApplicationTags: z.boolean(),
    recordClientAddress: z.boolean(),
  }).optional(),
  readPoolConfig: z.object({
    nodeCount: z.number(),
  }).optional(),
  reconciling: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  state: z.string().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
  writableNode: z.object({
    id: z.string(),
    ip: z.string(),
    isHotStandby: z.boolean(),
    state: z.string(),
    zoneId: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  activationPolicy: z.enum(["ACTIVATION_POLICY_UNSPECIFIED", "ALWAYS", "NEVER"])
    .describe(
      "Optional. Specifies whether an instance needs to spin up. Once the instance is active, the activation policy can be updated to the `NEVER` to stop the instance. Likewise, the activation policy can be updated to `ALWAYS` to start the instance. There are restrictions around when an instance can/cannot be activated (for example, a read pool instance should be stopped before stopping primary etc.). Please refer to the API documentation for more details.",
    ).optional(),
  annotations: z.record(z.string(), z.string()).describe(
    "Annotations to allow client tools to store small amount of arbitrary data. This is distinct from labels. https://google.aip.dev/128",
  ).optional(),
  availabilityType: z.enum([
    "AVAILABILITY_TYPE_UNSPECIFIED",
    "ZONAL",
    "REGIONAL",
  ]).describe(
    "Availability type of an Instance. If empty, defaults to REGIONAL for primary instances. For read pools, availability_type is always UNSPECIFIED. Instances in the read pools are evenly distributed across available zones within the region (i.e. read pools with more than one node will have a node in at least two zones).",
  ).optional(),
  clientConnectionConfig: z.object({
    requireConnectors: z.boolean().describe(
      "Optional. Configuration to enforce connectors only (ex: AuthProxy) connections to the database.",
    ).optional(),
    sslConfig: z.object({
      caSource: z.enum(["CA_SOURCE_UNSPECIFIED", "CA_SOURCE_MANAGED"]).describe(
        "Optional. Certificate Authority (CA) source. Only CA_SOURCE_MANAGED is supported currently, and is the default value.",
      ).optional(),
      sslMode: z.enum([
        "SSL_MODE_UNSPECIFIED",
        "SSL_MODE_ALLOW",
        "SSL_MODE_REQUIRE",
        "SSL_MODE_VERIFY_CA",
        "ALLOW_UNENCRYPTED_AND_ENCRYPTED",
        "ENCRYPTED_ONLY",
      ]).describe(
        "Optional. SSL mode. Specifies client-server SSL/TLS connection behavior.",
      ).optional(),
    }).describe("SSL configuration.").optional(),
  }).describe("Client connection configuration").optional(),
  connectionPoolConfig: z.object({
    authproxyPoolerCount: z.number().int().describe(
      "Output only. The number of running AuthProxy poolers per instance.",
    ).optional(),
    enabled: z.boolean().describe(
      "Optional. Whether to enable Managed Connection Pool (MCP).",
    ).optional(),
    flags: z.record(z.string(), z.string()).describe(
      'Optional. Connection Pool flags, as a list of "key": "value" pairs.',
    ).optional(),
    poolerCount: z.number().int().describe(
      "Output only. The number of running poolers per instance.",
    ).optional(),
  }).describe("Configuration for Managed Connection Pool (MCP).").optional(),
  dataApiAccess: z.enum([
    "DEFAULT_DATA_API_ENABLED_FOR_GOOGLE_CLOUD_SERVICES",
    "DISABLED",
    "ENABLED",
  ]).describe(
    "Optional. Controls whether the Data API is enabled for this instance. When enabled, this allows authorized users to connect to the instance from the public internet using the `executeSql` API, even for private IP instances. If this is not specified, the data API is enabled by default for Google internal services like AlloyDB Studio. Disable it explicitly to disallow Google internal services as well.",
  ).optional(),
  databaseFlags: z.record(z.string(), z.string()).describe(
    'Database flags. Set at the instance level. They are copied from the primary instance on secondary instance creation. Flags that have restrictions default to the value at primary instance on read instances during creation. Read instances can set new flags or override existing flags that are relevant for reads, for example, for enabling columnar cache on a read instance. Flags set on read instance might or might not be present on the primary instance. This is a list of "key": "value" pairs. "key": The name of the flag. These flags are passed at instance setup time, so include both server options and system variables for Postgres. Flags are specified with underscores, not hyphens. "value": The value of the flag. Booleans are set to **on** for true and **off** for false. This field must be omitted if the flag doesn\'t take a value.',
  ).optional(),
  displayName: z.string().describe(
    "User-settable and human-readable display name for the Instance.",
  ).optional(),
  gceZone: z.string().describe(
    "The Compute Engine zone that the instance should serve from, per https://cloud.google.com/compute/docs/regions-zones This can ONLY be specified for ZONAL instances. If present for a REGIONAL instance, an error will be thrown. If this is absent for a ZONAL instance, instance is created in a random zone with available capacity.",
  ).optional(),
  instanceType: z.enum([
    "INSTANCE_TYPE_UNSPECIFIED",
    "PRIMARY",
    "READ_POOL",
    "SECONDARY",
  ]).describe("Required. The type of the instance. Specified at creation time.")
    .optional(),
  labels: z.record(z.string(), z.string()).describe("Labels as key value pairs")
    .optional(),
  machineConfig: z.object({
    cpuCount: z.number().int().describe(
      "The number of CPU's in the VM instance.",
    ).optional(),
    machineType: z.string().describe(
      'Machine type of the VM instance. E.g. "n2-highmem-4", "n2-highmem-8", "c4a-highmem-4-lssd". cpu_count must match the number of vCPUs in the machine type.',
    ).optional(),
  }).describe("MachineConfig describes the configuration of a machine.")
    .optional(),
  networkConfig: z.object({
    allocatedIpRangeOverride: z.string().describe(
      'Optional. Name of the allocated IP range for the private IP AlloyDB instance, for example: "google-managed-services-default". If set, the instance IPs will be created from this allocated range and will override the IP range used by the parent cluster. The range name must comply with [RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035). Specifically, the name must be 1-63 characters long and match the regular expression [a-z]([-a-z0-9]*[a-z0-9])?.',
    ).optional(),
    authorizedExternalNetworks: z.array(z.object({
      cidrRange: z.string().describe(
        "CIDR range for one authorzied network of the instance.",
      ).optional(),
    })).describe(
      "Optional. A list of external network authorized to access this instance.",
    ).optional(),
    enableOutboundPublicIp: z.boolean().describe(
      "Optional. Enabling an outbound public IP address to support a database server sending requests out into the internet.",
    ).optional(),
    enablePublicIp: z.boolean().describe(
      "Optional. Enabling public ip for the instance.",
    ).optional(),
    network: z.string().describe(
      "Output only. The resource link for the VPC network in which instance resources are created and from which they are accessible via Private IP. This will be the same value as the parent cluster's network. It is specified in the form: // `projects/{project_number}/global/networks/{network_id}`.",
    ).optional(),
  }).describe("Metadata related to instance-level network configuration.")
    .optional(),
  observabilityConfig: z.object({
    enabled: z.boolean().describe(
      'Observability feature status for an instance. This flag is turned "off" by default.',
    ).optional(),
    maxQueryStringLength: z.number().int().describe(
      "Query string length. The default value is 10k.",
    ).optional(),
    preserveComments: z.boolean().describe(
      'Preserve comments in query string for an instance. This flag is turned "off" by default.',
    ).optional(),
    queryPlansPerMinute: z.number().int().describe(
      "Number of query execution plans captured by Insights per minute for all queries combined. The default value is 200. Any integer between 0 to 200 is considered valid.",
    ).optional(),
    recordApplicationTags: z.boolean().describe(
      'Record application tags for an instance. This flag is turned "off" by default.',
    ).optional(),
    trackActiveQueries: z.boolean().describe(
      'Track actively running queries on the instance. If not set, this flag is "off" by default.',
    ).optional(),
    trackWaitEventTypes: z.boolean().describe(
      'Output only. Track wait event types during query execution for an instance. This flag is turned "on" by default but tracking is enabled only after observability enabled flag is also turned on. This is read-only flag and only modifiable by internal API.',
    ).optional(),
    trackWaitEvents: z.boolean().describe(
      'Track wait events during query execution for an instance. This flag is turned "on" by default but tracking is enabled only after observability enabled flag is also turned on.',
    ).optional(),
  }).describe("Observability Instance specific configuration.").optional(),
  pscInstanceConfig: z.object({
    allowedConsumerProjects: z.array(z.string()).describe(
      "Optional. List of consumer projects that are allowed to create PSC endpoints to service-attachments to this instance.",
    ).optional(),
    pscAutoConnections: z.array(z.object({
      consumerNetwork: z.string().describe(
        'The consumer network for the PSC service automation, example: "projects/vpc-host-project/global/networks/default". The consumer network might be hosted a different project than the consumer project.',
      ).optional(),
      consumerNetworkStatus: z.string().describe(
        'Output only. The status of the service connection policy. Possible values: "STATE_UNSPECIFIED" - Default state, when Connection Map is created initially. "VALID" - Set when policy and map configuration is valid, and their matching can lead to allowing creation of PSC Connections subject to other constraints like connections limit. "CONNECTION_POLICY_MISSING" - No Service Connection Policy found for this network and Service Class "POLICY_LIMIT_REACHED" - Service Connection Policy limit reached for this network and Service Class "CONSUMER_INSTANCE_PROJECT_NOT_ALLOWLISTED" - The consumer instance project is not in AllowedGoogleProducersResourceHierarchyLevels of the matching ServiceConnectionPolicy.',
      ).optional(),
      consumerProject: z.string().describe(
        "The consumer project to which the PSC service automation endpoint will be created.",
      ).optional(),
      ipAddress: z.string().describe(
        "Output only. The IP address of the PSC service automation endpoint.",
      ).optional(),
      status: z.string().describe(
        'Output only. The status of the PSC service automation connection. Possible values: "STATE_UNSPECIFIED" - An invalid state as the default case. "ACTIVE" - The connection has been created successfully. "FAILED" - The connection is not functional since some resources on the connection fail to be created. "CREATING" - The connection is being created. "DELETING" - The connection is being deleted. "CREATE_REPAIRING" - The connection is being repaired to complete creation. "DELETE_REPAIRING" - The connection is being repaired to complete deletion.',
      ).optional(),
    })).describe(
      "Optional. Configurations for setting up PSC service automation.",
    ).optional(),
    pscDnsName: z.string().describe(
      "Output only. The DNS name of the instance for PSC connectivity. Name convention:...alloydb-psc.goog",
    ).optional(),
    pscInterfaceConfigs: z.array(z.object({
      networkAttachmentResource: z.string().describe(
        'The network attachment resource created in the consumer network to which the PSC interface will be linked. This is of the format: "projects/${CONSUMER_PROJECT}/regions/${REGION}/networkAttachments/${NETWORK_ATTACHMENT_NAME}". The network attachment must be in the same region as the instance.',
      ).optional(),
    })).describe(
      "Optional. Configurations for setting up PSC interfaces attached to the instance which are used for outbound connectivity. Only primary instances can have PSC interface attached. Currently we only support 0 or 1 PSC interface.",
    ).optional(),
    serviceAttachmentLink: z.string().describe(
      "Output only. The service attachment created when Private Service Connect (PSC) is enabled for the instance. The name of the resource will be in the format of `projects//regions//serviceAttachments/`",
    ).optional(),
  }).describe(
    "PscInstanceConfig contains PSC related configuration at an instance level.",
  ).optional(),
  queryInsightsConfig: z.object({
    queryPlansPerMinute: z.number().int().describe(
      "Number of query execution plans captured by Insights per minute for all queries combined. The default value is 5. Any integer between 0 and 20 is considered valid.",
    ).optional(),
    queryStringLength: z.number().int().describe(
      "Query string length. The default value is 1024. Any integer between 256 and 4500 is considered valid.",
    ).optional(),
    recordApplicationTags: z.boolean().describe(
      'Record application tags for an instance. This flag is turned "on" by default.',
    ).optional(),
    recordClientAddress: z.boolean().describe(
      'Record client address for an instance. Client address is PII information. This flag is turned "on" by default.',
    ).optional(),
  }).describe("QueryInsights Instance specific configuration.").optional(),
  readPoolConfig: z.object({
    nodeCount: z.number().int().describe(
      "Read capacity, i.e. number of nodes in a read pool instance.",
    ).optional(),
  }).describe("Configuration for a read pool instance.").optional(),
  writableNode: z.object({
    id: z.string().describe(
      'Output only. The identifier of the VM e.g. "test-read-0601-407e52be-ms3l".',
    ).optional(),
    ip: z.string().describe(
      'Output only. The private IP address of the VM e.g. "10.57.0.34".',
    ).optional(),
    isHotStandby: z.boolean().describe(
      "Output only. Indicates whether the node set up to be configured as a hot standby.",
    ).optional(),
    state: z.string().describe(
      "Output only. Determined by state of the compute VM and postgres-service health. Compute VM state can have values listed in https://cloud.google.com/compute/docs/instances/instance-life-cycle and postgres-service health can have values: HEALTHY and UNHEALTHY.",
    ).optional(),
    zoneId: z.string().describe(
      'Output only. The Compute Engine zone of the VM e.g. "us-central1-b".',
    ).optional(),
  }).describe(
    "Details of a single node in the instance. Nodes in an AlloyDB instance are ephemeral, they can change during update, failover, autohealing and resize operations.",
  ).optional(),
  instanceId: z.string().describe("Required. ID of the requesting object.")
    .optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud AlloyDB Clusters.Instances. Registered at `@swamp/gcp/alloydb/clusters-instances`. */
export const model = {
  type: "@swamp/gcp/alloydb/clusters-instances",
  version: "2026.05.24.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.1",
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
      toVersion: "2026.05.14.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An Instance is a computing unit that an end customer can connect to. It's the...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a instances",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["activationPolicy"] !== undefined) {
          body["activationPolicy"] = g["activationPolicy"];
        }
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["availabilityType"] !== undefined) {
          body["availabilityType"] = g["availabilityType"];
        }
        if (g["clientConnectionConfig"] !== undefined) {
          body["clientConnectionConfig"] = g["clientConnectionConfig"];
        }
        if (g["connectionPoolConfig"] !== undefined) {
          body["connectionPoolConfig"] = g["connectionPoolConfig"];
        }
        if (g["dataApiAccess"] !== undefined) {
          body["dataApiAccess"] = g["dataApiAccess"];
        }
        if (g["databaseFlags"] !== undefined) {
          body["databaseFlags"] = g["databaseFlags"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["gceZone"] !== undefined) body["gceZone"] = g["gceZone"];
        if (g["instanceType"] !== undefined) {
          body["instanceType"] = g["instanceType"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["machineConfig"] !== undefined) {
          body["machineConfig"] = g["machineConfig"];
        }
        if (g["networkConfig"] !== undefined) {
          body["networkConfig"] = g["networkConfig"];
        }
        if (g["observabilityConfig"] !== undefined) {
          body["observabilityConfig"] = g["observabilityConfig"];
        }
        if (g["pscInstanceConfig"] !== undefined) {
          body["pscInstanceConfig"] = g["pscInstanceConfig"];
        }
        if (g["queryInsightsConfig"] !== undefined) {
          body["queryInsightsConfig"] = g["queryInsightsConfig"];
        }
        if (g["readPoolConfig"] !== undefined) {
          body["readPoolConfig"] = g["readPoolConfig"];
        }
        if (g["writableNode"] !== undefined) {
          body["writableNode"] = g["writableNode"];
        }
        if (g["instanceId"] !== undefined) body["instanceId"] = g["instanceId"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["READY"],
              "failedValues": ["STOPPED", "FAILED"],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
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
    get: {
      description: "Get a instances",
      arguments: z.object({
        identifier: z.string().describe("The name of the instances"),
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
    update: {
      description: "Update instances attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g["activationPolicy"] !== undefined) {
          body["activationPolicy"] = g["activationPolicy"];
        }
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["availabilityType"] !== undefined) {
          body["availabilityType"] = g["availabilityType"];
        }
        if (g["clientConnectionConfig"] !== undefined) {
          body["clientConnectionConfig"] = g["clientConnectionConfig"];
        }
        if (g["connectionPoolConfig"] !== undefined) {
          body["connectionPoolConfig"] = g["connectionPoolConfig"];
        }
        if (g["dataApiAccess"] !== undefined) {
          body["dataApiAccess"] = g["dataApiAccess"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["gceZone"] !== undefined) body["gceZone"] = g["gceZone"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["machineConfig"] !== undefined) {
          body["machineConfig"] = g["machineConfig"];
        }
        if (g["networkConfig"] !== undefined) {
          body["networkConfig"] = g["networkConfig"];
        }
        if (g["observabilityConfig"] !== undefined) {
          body["observabilityConfig"] = g["observabilityConfig"];
        }
        if (g["pscInstanceConfig"] !== undefined) {
          body["pscInstanceConfig"] = g["pscInstanceConfig"];
        }
        if (g["queryInsightsConfig"] !== undefined) {
          body["queryInsightsConfig"] = g["queryInsightsConfig"];
        }
        if (g["readPoolConfig"] !== undefined) {
          body["readPoolConfig"] = g["readPoolConfig"];
        }
        if (g["writableNode"] !== undefined) {
          body["writableNode"] = g["writableNode"];
        }
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["READY"],
              "failedValues": ["STOPPED", "FAILED"],
            }
            : undefined,
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
      description: "Delete the instances",
      arguments: z.object({
        identifier: z.string().describe("The name of the instances"),
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
      description: "Sync instances state from GCP",
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
    createsecondary: {
      description: "createsecondary",
      arguments: z.object({
        activationPolicy: z.any().optional(),
        annotations: z.any().optional(),
        availabilityType: z.any().optional(),
        clientConnectionConfig: z.any().optional(),
        connectionPoolConfig: z.any().optional(),
        createTime: z.any().optional(),
        dataApiAccess: z.any().optional(),
        databaseFlags: z.any().optional(),
        deleteTime: z.any().optional(),
        displayName: z.any().optional(),
        etag: z.any().optional(),
        gceZone: z.any().optional(),
        instanceType: z.any().optional(),
        ipAddress: z.any().optional(),
        labels: z.any().optional(),
        machineConfig: z.any().optional(),
        maintenanceVersionName: z.any().optional(),
        name: z.any().optional(),
        networkConfig: z.any().optional(),
        nodes: z.any().optional(),
        observabilityConfig: z.any().optional(),
        outboundPublicIpAddresses: z.any().optional(),
        pscInstanceConfig: z.any().optional(),
        publicIpAddress: z.any().optional(),
        queryInsightsConfig: z.any().optional(),
        readPoolConfig: z.any().optional(),
        reconciling: z.any().optional(),
        satisfiesPzs: z.any().optional(),
        state: z.any().optional(),
        uid: z.any().optional(),
        updateTime: z.any().optional(),
        writableNode: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["activationPolicy"] !== undefined) {
          body["activationPolicy"] = args["activationPolicy"];
        }
        if (args["annotations"] !== undefined) {
          body["annotations"] = args["annotations"];
        }
        if (args["availabilityType"] !== undefined) {
          body["availabilityType"] = args["availabilityType"];
        }
        if (args["clientConnectionConfig"] !== undefined) {
          body["clientConnectionConfig"] = args["clientConnectionConfig"];
        }
        if (args["connectionPoolConfig"] !== undefined) {
          body["connectionPoolConfig"] = args["connectionPoolConfig"];
        }
        if (args["createTime"] !== undefined) {
          body["createTime"] = args["createTime"];
        }
        if (args["dataApiAccess"] !== undefined) {
          body["dataApiAccess"] = args["dataApiAccess"];
        }
        if (args["databaseFlags"] !== undefined) {
          body["databaseFlags"] = args["databaseFlags"];
        }
        if (args["deleteTime"] !== undefined) {
          body["deleteTime"] = args["deleteTime"];
        }
        if (args["displayName"] !== undefined) {
          body["displayName"] = args["displayName"];
        }
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["gceZone"] !== undefined) body["gceZone"] = args["gceZone"];
        if (args["instanceType"] !== undefined) {
          body["instanceType"] = args["instanceType"];
        }
        if (args["ipAddress"] !== undefined) {
          body["ipAddress"] = args["ipAddress"];
        }
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        if (args["machineConfig"] !== undefined) {
          body["machineConfig"] = args["machineConfig"];
        }
        if (args["maintenanceVersionName"] !== undefined) {
          body["maintenanceVersionName"] = args["maintenanceVersionName"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["networkConfig"] !== undefined) {
          body["networkConfig"] = args["networkConfig"];
        }
        if (args["nodes"] !== undefined) body["nodes"] = args["nodes"];
        if (args["observabilityConfig"] !== undefined) {
          body["observabilityConfig"] = args["observabilityConfig"];
        }
        if (args["outboundPublicIpAddresses"] !== undefined) {
          body["outboundPublicIpAddresses"] = args["outboundPublicIpAddresses"];
        }
        if (args["pscInstanceConfig"] !== undefined) {
          body["pscInstanceConfig"] = args["pscInstanceConfig"];
        }
        if (args["publicIpAddress"] !== undefined) {
          body["publicIpAddress"] = args["publicIpAddress"];
        }
        if (args["queryInsightsConfig"] !== undefined) {
          body["queryInsightsConfig"] = args["queryInsightsConfig"];
        }
        if (args["readPoolConfig"] !== undefined) {
          body["readPoolConfig"] = args["readPoolConfig"];
        }
        if (args["reconciling"] !== undefined) {
          body["reconciling"] = args["reconciling"];
        }
        if (args["satisfiesPzs"] !== undefined) {
          body["satisfiesPzs"] = args["satisfiesPzs"];
        }
        if (args["state"] !== undefined) body["state"] = args["state"];
        if (args["uid"] !== undefined) body["uid"] = args["uid"];
        if (args["updateTime"] !== undefined) {
          body["updateTime"] = args["updateTime"];
        }
        if (args["writableNode"] !== undefined) {
          body["writableNode"] = args["writableNode"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "alloydb.projects.locations.clusters.instances.createsecondary",
            "path": "v1/{+parent}/instances:createsecondary",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "instanceId": { "location": "query" },
              "parent": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "validateOnly": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    failover: {
      description: "failover",
      arguments: z.object({
        requestId: z.any().optional(),
        validateOnly: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "alloydb.projects.locations.clusters.instances.failover",
            "path": "v1/{+name}:failover",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    get_connection_info: {
      description: "get connection info",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "alloydb.projects.locations.clusters.instances.getConnectionInfo",
            "path": "v1/{+parent}/connectionInfo",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
              "requestId": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    inject_fault: {
      description: "inject fault",
      arguments: z.object({
        faultType: z.any().optional(),
        requestId: z.any().optional(),
        validateOnly: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["faultType"] !== undefined) {
          body["faultType"] = args["faultType"];
        }
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "alloydb.projects.locations.clusters.instances.injectFault",
            "path": "v1/{+name}:injectFault",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    restart: {
      description: "restart",
      arguments: z.object({
        nodeIds: z.any().optional(),
        requestId: z.any().optional(),
        validateOnly: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["nodeIds"] !== undefined) body["nodeIds"] = args["nodeIds"];
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "alloydb.projects.locations.clusters.instances.restart",
            "path": "v1/{+name}:restart",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
