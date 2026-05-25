// Auto-generated extension model for @swamp/gcp/analyticshub/dataexchanges-listings
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Analytics Hub DataExchanges.Listings.
 *
 * A listing is what gets published into a data exchange that a subscriber can subscribe to. It contains a reference to the data source along with descriptive information that will help subscribers find and subscribe the data.
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
  return `${parent}/listings/${shortName}`;
}

const BASE_URL = "https://analyticshub.googleapis.com/";

const GET_CONFIG = {
  "id": "analyticshub.projects.locations.dataExchanges.listings.get",
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
  "id": "analyticshub.projects.locations.dataExchanges.listings.create",
  "path": "v1/{+parent}/listings",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "listingId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "analyticshub.projects.locations.dataExchanges.listings.patch",
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
  "id": "analyticshub.projects.locations.dataExchanges.listings.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "deleteCommercial": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "analyticshub.projects.locations.dataExchanges.listings.list",
  "path": "v1/{+parent}/listings",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  allowOnlyMetadataSharing: z.boolean().describe(
    "Optional. If true, the listing is only available to get the resource metadata. Listing is non subscribable.",
  ).optional(),
  bigqueryDataset: z.object({
    dataset: z.string().describe(
      "Optional. Resource name of the dataset source for this listing. e.g. `projects/myproject/datasets/123`",
    ).optional(),
    effectiveReplicas: z.array(z.object({
      location: z.string().describe(
        'Output only. The geographic location where the replica resides. See [BigQuery locations](https://cloud.google.com/bigquery/docs/locations) for supported locations. Eg. "us-central1".',
      ).optional(),
      primaryState: z.enum(["PRIMARY_STATE_UNSPECIFIED", "PRIMARY_REPLICA"])
        .describe(
          "Output only. Indicates that this replica is the primary replica.",
        ).optional(),
      replicaState: z.enum([
        "REPLICA_STATE_UNSPECIFIED",
        "READY_TO_USE",
        "UNAVAILABLE",
      ]).describe(
        "Output only. Assigned by Analytics Hub based on real BigQuery replication state.",
      ).optional(),
    })).describe(
      "Output only. Server-owned effective state of replicas. Contains both primary and secondary replicas. Each replica includes a system-computed (output-only) state and primary designation.",
    ).optional(),
    replicaLocations: z.array(z.string()).describe(
      "Optional. A list of regions where the publisher has created shared dataset replicas.",
    ).optional(),
    restrictedExportPolicy: z.object({
      enabled: z.boolean().describe(
        "Optional. If true, enable restricted export.",
      ).optional(),
      restrictDirectTableAccess: z.boolean().describe(
        "Optional. If true, restrict direct table access (read api/tabledata.list) on linked table.",
      ).optional(),
      restrictQueryResult: z.boolean().describe(
        "Optional. If true, restrict export of query result derived from restricted linked dataset table.",
      ).optional(),
    }).describe(
      "Restricted export policy used to configure restricted export on linked dataset.",
    ).optional(),
    selectedResources: z.array(z.object({
      routine: z.string().describe(
        'Optional. Format: For routine: `projects/{projectId}/datasets/{datasetId}/routines/{routineId}` Example:"projects/test_project/datasets/test_dataset/routines/test_routine"',
      ).optional(),
      table: z.string().describe(
        'Optional. Format: For table: `projects/{projectId}/datasets/{datasetId}/tables/{tableId}` Example:"projects/test_project/datasets/test_dataset/tables/test_table"',
      ).optional(),
    })).describe(
      "Optional. Resource in this dataset that is selectively shared. This field is required for data clean room exchanges.",
    ).optional(),
  }).describe(
    "A reference to a shared dataset. It is an existing BigQuery dataset with a collection of objects such as tables and views that you want to share with subscribers. When subscriber's subscribe to a listing, Analytics Hub creates a linked dataset in the subscriber's project. A Linked dataset is an opaque, read-only BigQuery dataset that serves as a _symbolic link_ to a shared dataset.",
  ).optional(),
  categories: z.array(
    z.enum([
      "CATEGORY_UNSPECIFIED",
      "CATEGORY_OTHERS",
      "CATEGORY_ADVERTISING_AND_MARKETING",
      "CATEGORY_COMMERCE",
      "CATEGORY_CLIMATE_AND_ENVIRONMENT",
      "CATEGORY_DEMOGRAPHICS",
      "CATEGORY_ECONOMICS",
      "CATEGORY_EDUCATION",
      "CATEGORY_ENERGY",
      "CATEGORY_FINANCIAL",
      "CATEGORY_GAMING",
      "CATEGORY_GEOSPATIAL",
      "CATEGORY_HEALTHCARE_AND_LIFE_SCIENCE",
      "CATEGORY_MEDIA",
      "CATEGORY_PUBLIC_SECTOR",
      "CATEGORY_RETAIL",
      "CATEGORY_SPORTS",
      "CATEGORY_SCIENCE_AND_RESEARCH",
      "CATEGORY_TRANSPORTATION_AND_LOGISTICS",
      "CATEGORY_TRAVEL_AND_TOURISM",
      "CATEGORY_GOOGLE_EARTH_ENGINE",
    ]),
  ).describe(
    "Optional. Categories of the listing. Up to five categories are allowed.",
  ).optional(),
  commercialInfo: z.object({
    cloudMarketplace: z.object({
      commercialState: z.enum([
        "COMMERCIAL_STATE_UNSPECIFIED",
        "ONBOARDING",
        "ACTIVE",
      ]).describe(
        "Output only. Commercial state of the Marketplace Data Product.",
      ).optional(),
      service: z.string().describe(
        "Output only. Resource name of the commercial service associated with the Marketplace Data Product. e.g. example.com",
      ).optional(),
    }).describe(
      "Specifies the details of the Marketplace Data Product associated with the Listing.",
    ).optional(),
  }).describe(
    "Commercial info contains the information about the commercial data products associated with the listing.",
  ).optional(),
  dataProvider: z.object({
    name: z.string().describe("Optional. Name of the data provider.")
      .optional(),
    primaryContact: z.string().describe(
      "Optional. Email or URL of the data provider. Max Length: 1000 bytes.",
    ).optional(),
  }).describe("Contains details of the data provider.").optional(),
  description: z.string().describe(
    "Optional. Short description of the listing. The description must not contain Unicode non-characters and C0 and C1 control codes except tabs (HT), new lines (LF), carriage returns (CR), and page breaks (FF). Default value is an empty string. Max length: 2000 bytes.",
  ).optional(),
  discoveryType: z.enum([
    "DISCOVERY_TYPE_UNSPECIFIED",
    "DISCOVERY_TYPE_PRIVATE",
    "DISCOVERY_TYPE_PUBLIC",
  ]).describe(
    "Optional. Type of discovery of the listing on the discovery page.",
  ).optional(),
  displayName: z.string().describe(
    "Required. Human-readable display name of the listing. The display name must contain only Unicode letters, numbers (0-9), underscores (_), dashes (-), spaces (), ampersands (&) and can't start or end with spaces. Default value is an empty string. Max length: 63 bytes.",
  ).optional(),
  documentation: z.string().describe(
    "Optional. Documentation describing the listing.",
  ).optional(),
  icon: z.string().describe(
    "Optional. Base64 encoded image representing the listing. Max Size: 3.0MiB Expected image dimensions are 512x512 pixels, however the API only performs validation on size of the encoded data. Note: For byte fields, the contents of the field are base64-encoded (which increases the size of the data by 33-36%) when using JSON on the wire.",
  ).optional(),
  logLinkedDatasetQueryUserEmail: z.boolean().describe(
    "Optional. By default, false. If true, the Listing has an email sharing mandate enabled.",
  ).optional(),
  primaryContact: z.string().describe(
    "Optional. Email or URL of the primary point of contact of the listing. Max Length: 1000 bytes.",
  ).optional(),
  publisher: z.object({
    name: z.string().describe("Optional. Name of the listing publisher.")
      .optional(),
    primaryContact: z.string().describe(
      "Optional. Email or URL of the listing publisher. Max Length: 1000 bytes.",
    ).optional(),
  }).describe("Contains details of the listing publisher.").optional(),
  pubsubTopic: z.object({
    dataAffinityRegions: z.array(z.string()).describe(
      "Optional. Region hint on where the data might be published. Data affinity regions are modifiable. See https://cloud.google.com/about/locations for full listing of possible Cloud regions.",
    ).optional(),
    topic: z.string().describe(
      "Required. Resource name of the Pub/Sub topic source for this listing. e.g. projects/myproject/topics/topicId",
    ).optional(),
  }).describe("Pub/Sub topic source.").optional(),
  requestAccess: z.string().describe(
    "Optional. Email or URL of the request access of the listing. Subscribers can use this reference to request access. Max Length: 1000 bytes.",
  ).optional(),
  restrictedExportConfig: z.object({
    enabled: z.boolean().describe(
      "Optional. If true, enable restricted export.",
    ).optional(),
    restrictDirectTableAccess: z.boolean().describe(
      "Output only. If true, restrict direct table access(read api/tabledata.list) on linked table.",
    ).optional(),
    restrictQueryResult: z.boolean().describe(
      "Optional. If true, restrict export of query result derived from restricted linked dataset table.",
    ).optional(),
  }).describe(
    "Restricted export config, used to configure restricted export on linked dataset.",
  ).optional(),
  storedProcedureConfig: z.object({
    allowedStoredProcedureTypes: z.array(
      z.enum(["STORED_PROCEDURE_TYPE_UNSPECIFIED", "SQL_PROCEDURE"]),
    ).describe("Output only. Types of stored procedure supported to share.")
      .optional(),
    enabled: z.boolean().describe(
      "Optional. If true, enable sharing of stored procedure.",
    ).optional(),
  }).describe(
    "Stored procedure configuration, used to configure stored procedure sharing on linked dataset.",
  ).optional(),
  listingId: z.string().describe(
    "Required. The ID of the listing to create. Must contain only Unicode letters, numbers (0-9), underscores (_). Max length: 100 bytes.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  allowOnlyMetadataSharing: z.boolean().optional(),
  bigqueryDataset: z.object({
    dataset: z.string(),
    effectiveReplicas: z.array(z.object({
      location: z.string(),
      primaryState: z.string(),
      replicaState: z.string(),
    })),
    replicaLocations: z.array(z.string()),
    restrictedExportPolicy: z.object({
      enabled: z.boolean(),
      restrictDirectTableAccess: z.boolean(),
      restrictQueryResult: z.boolean(),
    }),
    selectedResources: z.array(z.object({
      routine: z.string(),
      table: z.string(),
    })),
  }).optional(),
  categories: z.array(z.string()).optional(),
  commercialInfo: z.object({
    cloudMarketplace: z.object({
      commercialState: z.string(),
      service: z.string(),
    }),
  }).optional(),
  dataProvider: z.object({
    name: z.string(),
    primaryContact: z.string(),
  }).optional(),
  description: z.string().optional(),
  discoveryType: z.string().optional(),
  displayName: z.string().optional(),
  documentation: z.string().optional(),
  icon: z.string().optional(),
  logLinkedDatasetQueryUserEmail: z.boolean().optional(),
  name: z.string(),
  primaryContact: z.string().optional(),
  publisher: z.object({
    name: z.string(),
    primaryContact: z.string(),
  }).optional(),
  pubsubTopic: z.object({
    dataAffinityRegions: z.array(z.string()),
    topic: z.string(),
  }).optional(),
  requestAccess: z.string().optional(),
  resourceType: z.string().optional(),
  restrictedExportConfig: z.object({
    enabled: z.boolean(),
    restrictDirectTableAccess: z.boolean(),
    restrictQueryResult: z.boolean(),
  }).optional(),
  state: z.string().optional(),
  storedProcedureConfig: z.object({
    allowedStoredProcedureTypes: z.array(z.string()),
    enabled: z.boolean(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  allowOnlyMetadataSharing: z.boolean().describe(
    "Optional. If true, the listing is only available to get the resource metadata. Listing is non subscribable.",
  ).optional(),
  bigqueryDataset: z.object({
    dataset: z.string().describe(
      "Optional. Resource name of the dataset source for this listing. e.g. `projects/myproject/datasets/123`",
    ).optional(),
    effectiveReplicas: z.array(z.object({
      location: z.string().describe(
        'Output only. The geographic location where the replica resides. See [BigQuery locations](https://cloud.google.com/bigquery/docs/locations) for supported locations. Eg. "us-central1".',
      ).optional(),
      primaryState: z.enum(["PRIMARY_STATE_UNSPECIFIED", "PRIMARY_REPLICA"])
        .describe(
          "Output only. Indicates that this replica is the primary replica.",
        ).optional(),
      replicaState: z.enum([
        "REPLICA_STATE_UNSPECIFIED",
        "READY_TO_USE",
        "UNAVAILABLE",
      ]).describe(
        "Output only. Assigned by Analytics Hub based on real BigQuery replication state.",
      ).optional(),
    })).describe(
      "Output only. Server-owned effective state of replicas. Contains both primary and secondary replicas. Each replica includes a system-computed (output-only) state and primary designation.",
    ).optional(),
    replicaLocations: z.array(z.string()).describe(
      "Optional. A list of regions where the publisher has created shared dataset replicas.",
    ).optional(),
    restrictedExportPolicy: z.object({
      enabled: z.boolean().describe(
        "Optional. If true, enable restricted export.",
      ).optional(),
      restrictDirectTableAccess: z.boolean().describe(
        "Optional. If true, restrict direct table access (read api/tabledata.list) on linked table.",
      ).optional(),
      restrictQueryResult: z.boolean().describe(
        "Optional. If true, restrict export of query result derived from restricted linked dataset table.",
      ).optional(),
    }).describe(
      "Restricted export policy used to configure restricted export on linked dataset.",
    ).optional(),
    selectedResources: z.array(z.object({
      routine: z.string().describe(
        'Optional. Format: For routine: `projects/{projectId}/datasets/{datasetId}/routines/{routineId}` Example:"projects/test_project/datasets/test_dataset/routines/test_routine"',
      ).optional(),
      table: z.string().describe(
        'Optional. Format: For table: `projects/{projectId}/datasets/{datasetId}/tables/{tableId}` Example:"projects/test_project/datasets/test_dataset/tables/test_table"',
      ).optional(),
    })).describe(
      "Optional. Resource in this dataset that is selectively shared. This field is required for data clean room exchanges.",
    ).optional(),
  }).describe(
    "A reference to a shared dataset. It is an existing BigQuery dataset with a collection of objects such as tables and views that you want to share with subscribers. When subscriber's subscribe to a listing, Analytics Hub creates a linked dataset in the subscriber's project. A Linked dataset is an opaque, read-only BigQuery dataset that serves as a _symbolic link_ to a shared dataset.",
  ).optional(),
  categories: z.array(
    z.enum([
      "CATEGORY_UNSPECIFIED",
      "CATEGORY_OTHERS",
      "CATEGORY_ADVERTISING_AND_MARKETING",
      "CATEGORY_COMMERCE",
      "CATEGORY_CLIMATE_AND_ENVIRONMENT",
      "CATEGORY_DEMOGRAPHICS",
      "CATEGORY_ECONOMICS",
      "CATEGORY_EDUCATION",
      "CATEGORY_ENERGY",
      "CATEGORY_FINANCIAL",
      "CATEGORY_GAMING",
      "CATEGORY_GEOSPATIAL",
      "CATEGORY_HEALTHCARE_AND_LIFE_SCIENCE",
      "CATEGORY_MEDIA",
      "CATEGORY_PUBLIC_SECTOR",
      "CATEGORY_RETAIL",
      "CATEGORY_SPORTS",
      "CATEGORY_SCIENCE_AND_RESEARCH",
      "CATEGORY_TRANSPORTATION_AND_LOGISTICS",
      "CATEGORY_TRAVEL_AND_TOURISM",
      "CATEGORY_GOOGLE_EARTH_ENGINE",
    ]),
  ).describe(
    "Optional. Categories of the listing. Up to five categories are allowed.",
  ).optional(),
  commercialInfo: z.object({
    cloudMarketplace: z.object({
      commercialState: z.enum([
        "COMMERCIAL_STATE_UNSPECIFIED",
        "ONBOARDING",
        "ACTIVE",
      ]).describe(
        "Output only. Commercial state of the Marketplace Data Product.",
      ).optional(),
      service: z.string().describe(
        "Output only. Resource name of the commercial service associated with the Marketplace Data Product. e.g. example.com",
      ).optional(),
    }).describe(
      "Specifies the details of the Marketplace Data Product associated with the Listing.",
    ).optional(),
  }).describe(
    "Commercial info contains the information about the commercial data products associated with the listing.",
  ).optional(),
  dataProvider: z.object({
    name: z.string().describe("Optional. Name of the data provider.")
      .optional(),
    primaryContact: z.string().describe(
      "Optional. Email or URL of the data provider. Max Length: 1000 bytes.",
    ).optional(),
  }).describe("Contains details of the data provider.").optional(),
  description: z.string().describe(
    "Optional. Short description of the listing. The description must not contain Unicode non-characters and C0 and C1 control codes except tabs (HT), new lines (LF), carriage returns (CR), and page breaks (FF). Default value is an empty string. Max length: 2000 bytes.",
  ).optional(),
  discoveryType: z.enum([
    "DISCOVERY_TYPE_UNSPECIFIED",
    "DISCOVERY_TYPE_PRIVATE",
    "DISCOVERY_TYPE_PUBLIC",
  ]).describe(
    "Optional. Type of discovery of the listing on the discovery page.",
  ).optional(),
  displayName: z.string().describe(
    "Required. Human-readable display name of the listing. The display name must contain only Unicode letters, numbers (0-9), underscores (_), dashes (-), spaces (), ampersands (&) and can't start or end with spaces. Default value is an empty string. Max length: 63 bytes.",
  ).optional(),
  documentation: z.string().describe(
    "Optional. Documentation describing the listing.",
  ).optional(),
  icon: z.string().describe(
    "Optional. Base64 encoded image representing the listing. Max Size: 3.0MiB Expected image dimensions are 512x512 pixels, however the API only performs validation on size of the encoded data. Note: For byte fields, the contents of the field are base64-encoded (which increases the size of the data by 33-36%) when using JSON on the wire.",
  ).optional(),
  logLinkedDatasetQueryUserEmail: z.boolean().describe(
    "Optional. By default, false. If true, the Listing has an email sharing mandate enabled.",
  ).optional(),
  primaryContact: z.string().describe(
    "Optional. Email or URL of the primary point of contact of the listing. Max Length: 1000 bytes.",
  ).optional(),
  publisher: z.object({
    name: z.string().describe("Optional. Name of the listing publisher.")
      .optional(),
    primaryContact: z.string().describe(
      "Optional. Email or URL of the listing publisher. Max Length: 1000 bytes.",
    ).optional(),
  }).describe("Contains details of the listing publisher.").optional(),
  pubsubTopic: z.object({
    dataAffinityRegions: z.array(z.string()).describe(
      "Optional. Region hint on where the data might be published. Data affinity regions are modifiable. See https://cloud.google.com/about/locations for full listing of possible Cloud regions.",
    ).optional(),
    topic: z.string().describe(
      "Required. Resource name of the Pub/Sub topic source for this listing. e.g. projects/myproject/topics/topicId",
    ).optional(),
  }).describe("Pub/Sub topic source.").optional(),
  requestAccess: z.string().describe(
    "Optional. Email or URL of the request access of the listing. Subscribers can use this reference to request access. Max Length: 1000 bytes.",
  ).optional(),
  restrictedExportConfig: z.object({
    enabled: z.boolean().describe(
      "Optional. If true, enable restricted export.",
    ).optional(),
    restrictDirectTableAccess: z.boolean().describe(
      "Output only. If true, restrict direct table access(read api/tabledata.list) on linked table.",
    ).optional(),
    restrictQueryResult: z.boolean().describe(
      "Optional. If true, restrict export of query result derived from restricted linked dataset table.",
    ).optional(),
  }).describe(
    "Restricted export config, used to configure restricted export on linked dataset.",
  ).optional(),
  storedProcedureConfig: z.object({
    allowedStoredProcedureTypes: z.array(
      z.enum(["STORED_PROCEDURE_TYPE_UNSPECIFIED", "SQL_PROCEDURE"]),
    ).describe("Output only. Types of stored procedure supported to share.")
      .optional(),
    enabled: z.boolean().describe(
      "Optional. If true, enable sharing of stored procedure.",
    ).optional(),
  }).describe(
    "Stored procedure configuration, used to configure stored procedure sharing on linked dataset.",
  ).optional(),
  listingId: z.string().describe(
    "Required. The ID of the listing to create. Must contain only Unicode letters, numbers (0-9), underscores (_). Max length: 100 bytes.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Analytics Hub DataExchanges.Listings. Registered at `@swamp/gcp/analyticshub/dataexchanges-listings`. */
export const model = {
  type: "@swamp/gcp/analyticshub/dataexchanges-listings",
  version: "2026.05.25.1",
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
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A listing is what gets published into a data exchange that a subscriber can s...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a listings",
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
        if (g["allowOnlyMetadataSharing"] !== undefined) {
          body["allowOnlyMetadataSharing"] = g["allowOnlyMetadataSharing"];
        }
        if (g["bigqueryDataset"] !== undefined) {
          body["bigqueryDataset"] = g["bigqueryDataset"];
        }
        if (g["categories"] !== undefined) body["categories"] = g["categories"];
        if (g["commercialInfo"] !== undefined) {
          body["commercialInfo"] = g["commercialInfo"];
        }
        if (g["dataProvider"] !== undefined) {
          body["dataProvider"] = g["dataProvider"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["discoveryType"] !== undefined) {
          body["discoveryType"] = g["discoveryType"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["documentation"] !== undefined) {
          body["documentation"] = g["documentation"];
        }
        if (g["icon"] !== undefined) body["icon"] = g["icon"];
        if (g["logLinkedDatasetQueryUserEmail"] !== undefined) {
          body["logLinkedDatasetQueryUserEmail"] =
            g["logLinkedDatasetQueryUserEmail"];
        }
        if (g["primaryContact"] !== undefined) {
          body["primaryContact"] = g["primaryContact"];
        }
        if (g["publisher"] !== undefined) body["publisher"] = g["publisher"];
        if (g["pubsubTopic"] !== undefined) {
          body["pubsubTopic"] = g["pubsubTopic"];
        }
        if (g["requestAccess"] !== undefined) {
          body["requestAccess"] = g["requestAccess"];
        }
        if (g["restrictedExportConfig"] !== undefined) {
          body["restrictedExportConfig"] = g["restrictedExportConfig"];
        }
        if (g["storedProcedureConfig"] !== undefined) {
          body["storedProcedureConfig"] = g["storedProcedureConfig"];
        }
        if (g["listingId"] !== undefined) body["listingId"] = g["listingId"];
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
              "readyValues": ["ACTIVE"],
              "failedValues": [],
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
      description: "Get a listings",
      arguments: z.object({
        identifier: z.string().describe("The name of the listings"),
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
      description: "Update listings attributes",
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
        if (g["allowOnlyMetadataSharing"] !== undefined) {
          body["allowOnlyMetadataSharing"] = g["allowOnlyMetadataSharing"];
        }
        if (g["bigqueryDataset"] !== undefined) {
          body["bigqueryDataset"] = g["bigqueryDataset"];
        }
        if (g["categories"] !== undefined) body["categories"] = g["categories"];
        if (g["commercialInfo"] !== undefined) {
          body["commercialInfo"] = g["commercialInfo"];
        }
        if (g["dataProvider"] !== undefined) {
          body["dataProvider"] = g["dataProvider"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["discoveryType"] !== undefined) {
          body["discoveryType"] = g["discoveryType"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["documentation"] !== undefined) {
          body["documentation"] = g["documentation"];
        }
        if (g["icon"] !== undefined) body["icon"] = g["icon"];
        if (g["logLinkedDatasetQueryUserEmail"] !== undefined) {
          body["logLinkedDatasetQueryUserEmail"] =
            g["logLinkedDatasetQueryUserEmail"];
        }
        if (g["primaryContact"] !== undefined) {
          body["primaryContact"] = g["primaryContact"];
        }
        if (g["publisher"] !== undefined) body["publisher"] = g["publisher"];
        if (g["pubsubTopic"] !== undefined) {
          body["pubsubTopic"] = g["pubsubTopic"];
        }
        if (g["requestAccess"] !== undefined) {
          body["requestAccess"] = g["requestAccess"];
        }
        if (g["restrictedExportConfig"] !== undefined) {
          body["restrictedExportConfig"] = g["restrictedExportConfig"];
        }
        if (g["storedProcedureConfig"] !== undefined) {
          body["storedProcedureConfig"] = g["storedProcedureConfig"];
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
              "readyValues": ["ACTIVE"],
              "failedValues": [],
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
      description: "Delete the listings",
      arguments: z.object({
        identifier: z.string().describe("The name of the listings"),
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
      description: "Sync listings state from GCP",
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
      description: "List listings resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The maximum number of results to return in a single response page. Leverage the page tokens to iterate through the entire collection.",
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "listings",
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
            "id":
              "analyticshub.projects.locations.dataExchanges.listings.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
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
    list_subscriptions: {
      description: "list subscriptions",
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
              "analyticshub.projects.locations.dataExchanges.listings.listSubscriptions",
            "path": "v1/{+resource}:listSubscriptions",
            "httpMethod": "GET",
            "parameterOrder": ["resource"],
            "parameters": {
              "includeDeletedSubscriptions": { "location": "query" },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "resource": { "location": "path", "required": true },
            },
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
              "analyticshub.projects.locations.dataExchanges.listings.setIamPolicy",
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
    subscribe: {
      description: "subscribe",
      arguments: z.object({
        destinationDataset: z.any().optional(),
        destinationPubsubSubscription: z.any().optional(),
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
        if (args["destinationDataset"] !== undefined) {
          body["destinationDataset"] = args["destinationDataset"];
        }
        if (args["destinationPubsubSubscription"] !== undefined) {
          body["destinationPubsubSubscription"] =
            args["destinationPubsubSubscription"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "analyticshub.projects.locations.dataExchanges.listings.subscribe",
            "path": "v1/{+name}:subscribe",
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
              "analyticshub.projects.locations.dataExchanges.listings.testIamPermissions",
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
