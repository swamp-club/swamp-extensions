// Auto-generated extension model for @swamp/gcp/migrationcenter/reportconfigs-reports
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Migration Center ReportConfigs.Reports.
 *
 * Report represents a point-in-time rendering of the ReportConfig results.
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/reports/${shortName}`;
}

const BASE_URL = "https://migrationcenter.googleapis.com/";

const GET_CONFIG = {
  "id": "migrationcenter.projects.locations.reportConfigs.reports.get",
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
  "id": "migrationcenter.projects.locations.reportConfigs.reports.create",
  "path": "v1/{+parent}/reports",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "reportId": {
      "location": "query",
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "migrationcenter.projects.locations.reportConfigs.reports.delete",
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
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "migrationcenter.projects.locations.reportConfigs.reports.list",
  "path": "v1/{+parent}/reports",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  description: z.string().describe("Free-text description.").optional(),
  displayName: z.string().describe(
    "User-friendly display name. Maximum length is 63 characters.",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "PENDING", "SUCCEEDED", "FAILED"])
    .describe("Report creation state.").optional(),
  summary: z.object({
    allAssetsStats: z.object({
      coreCountHistogram: z.object({
        buckets: z.array(z.object({
          count: z.unknown().describe("Count of items in the bucket.")
            .optional(),
          lowerBound: z.unknown().describe("Lower bound - inclusive.")
            .optional(),
          upperBound: z.unknown().describe("Upper bound - exclusive.")
            .optional(),
        })).describe(
          "Buckets in the histogram. There will be `n+1` buckets matching `n` lower bounds in the request. The first bucket will be from -infinity to the first bound. Subsequent buckets will be between one bound and the next. The final bucket will be from the final bound to infinity.",
        ).optional(),
      }).describe(
        "A Histogram Chart shows a distribution of values into buckets, showing a count of values which fall into a bucket.",
      ).optional(),
      memoryBytesHistogram: z.object({
        buckets: z.array(z.object({
          count: z.unknown().describe("Count of items in the bucket.")
            .optional(),
          lowerBound: z.unknown().describe("Lower bound - inclusive.")
            .optional(),
          upperBound: z.unknown().describe("Upper bound - exclusive.")
            .optional(),
        })).describe(
          "Buckets in the histogram. There will be `n+1` buckets matching `n` lower bounds in the request. The first bucket will be from -infinity to the first bound. Subsequent buckets will be between one bound and the next. The final bucket will be from the final bound to infinity.",
        ).optional(),
      }).describe(
        "A Histogram Chart shows a distribution of values into buckets, showing a count of values which fall into a bucket.",
      ).optional(),
      memoryUtilizationChart: z.object({
        free: z.string().describe(
          'Aggregate value which falls into the "Free" bucket.',
        ).optional(),
        used: z.string().describe(
          'Aggregate value which falls into the "Used" bucket.',
        ).optional(),
      }).describe(
        'Utilization Chart is a specific type of visualization which displays a metric classified into "Used" and "Free" buckets.',
      ).optional(),
      operatingSystem: z.object({
        dataPoints: z.array(z.object({
          label: z.unknown().describe("The X-axis label for this data point.")
            .optional(),
          value: z.unknown().describe("The Y-axis value for this data point.")
            .optional(),
        })).describe(
          "Each data point in the chart is represented as a name-value pair with the name being the x-axis label, and the value being the y-axis value.",
        ).optional(),
      }).describe("Describes a collection of data points rendered as a Chart.")
        .optional(),
      softwareInstances: z.object({
        dataPoints: z.array(z.object({
          label: z.unknown().describe("The X-axis label for this data point.")
            .optional(),
          value: z.unknown().describe("The Y-axis value for this data point.")
            .optional(),
        })).describe(
          "Each data point in the chart is represented as a name-value pair with the name being the x-axis label, and the value being the y-axis value.",
        ).optional(),
      }).describe("Describes a collection of data points rendered as a Chart.")
        .optional(),
      storageBytesHistogram: z.object({
        buckets: z.array(z.object({
          count: z.unknown().describe("Count of items in the bucket.")
            .optional(),
          lowerBound: z.unknown().describe("Lower bound - inclusive.")
            .optional(),
          upperBound: z.unknown().describe("Upper bound - exclusive.")
            .optional(),
        })).describe(
          "Buckets in the histogram. There will be `n+1` buckets matching `n` lower bounds in the request. The first bucket will be from -infinity to the first bound. Subsequent buckets will be between one bound and the next. The final bucket will be from the final bound to infinity.",
        ).optional(),
      }).describe(
        "A Histogram Chart shows a distribution of values into buckets, showing a count of values which fall into a bucket.",
      ).optional(),
      storageUtilizationChart: z.object({
        free: z.string().describe(
          'Aggregate value which falls into the "Free" bucket.',
        ).optional(),
        used: z.string().describe(
          'Aggregate value which falls into the "Used" bucket.',
        ).optional(),
      }).describe(
        'Utilization Chart is a specific type of visualization which displays a metric classified into "Used" and "Free" buckets.',
      ).optional(),
      totalAssets: z.string().describe(
        "Count of the number of unique assets in this collection.",
      ).optional(),
      totalCores: z.string().describe(
        "Sum of the CPU core count of all the assets in this collection.",
      ).optional(),
      totalMemoryBytes: z.string().describe(
        "Sum of the memory in bytes of all the assets in this collection.",
      ).optional(),
      totalStorageBytes: z.string().describe(
        "Sum of persistent storage in bytes of all the assets in this collection.",
      ).optional(),
    }).describe("Aggregate statistics for a collection of assets.").optional(),
    groupFindings: z.array(z.object({
      assetAggregateStats: z.object({
        coreCountHistogram: z.object({
          buckets: z.unknown().describe(
            "Buckets in the histogram. There will be `n+1` buckets matching `n` lower bounds in the request. The first bucket will be from -infinity to the first bound. Subsequent buckets will be between one bound and the next. The final bucket will be from the final bound to infinity.",
          ).optional(),
        }).describe(
          "A Histogram Chart shows a distribution of values into buckets, showing a count of values which fall into a bucket.",
        ).optional(),
        memoryBytesHistogram: z.object({
          buckets: z.unknown().describe(
            "Buckets in the histogram. There will be `n+1` buckets matching `n` lower bounds in the request. The first bucket will be from -infinity to the first bound. Subsequent buckets will be between one bound and the next. The final bucket will be from the final bound to infinity.",
          ).optional(),
        }).describe(
          "A Histogram Chart shows a distribution of values into buckets, showing a count of values which fall into a bucket.",
        ).optional(),
        memoryUtilizationChart: z.object({
          free: z.unknown().describe(
            'Aggregate value which falls into the "Free" bucket.',
          ).optional(),
          used: z.unknown().describe(
            'Aggregate value which falls into the "Used" bucket.',
          ).optional(),
        }).describe(
          'Utilization Chart is a specific type of visualization which displays a metric classified into "Used" and "Free" buckets.',
        ).optional(),
        operatingSystem: z.object({
          dataPoints: z.unknown().describe(
            "Each data point in the chart is represented as a name-value pair with the name being the x-axis label, and the value being the y-axis value.",
          ).optional(),
        }).describe(
          "Describes a collection of data points rendered as a Chart.",
        ).optional(),
        softwareInstances: z.object({
          dataPoints: z.unknown().describe(
            "Each data point in the chart is represented as a name-value pair with the name being the x-axis label, and the value being the y-axis value.",
          ).optional(),
        }).describe(
          "Describes a collection of data points rendered as a Chart.",
        ).optional(),
        storageBytesHistogram: z.object({
          buckets: z.unknown().describe(
            "Buckets in the histogram. There will be `n+1` buckets matching `n` lower bounds in the request. The first bucket will be from -infinity to the first bound. Subsequent buckets will be between one bound and the next. The final bucket will be from the final bound to infinity.",
          ).optional(),
        }).describe(
          "A Histogram Chart shows a distribution of values into buckets, showing a count of values which fall into a bucket.",
        ).optional(),
        storageUtilizationChart: z.object({
          free: z.unknown().describe(
            'Aggregate value which falls into the "Free" bucket.',
          ).optional(),
          used: z.unknown().describe(
            'Aggregate value which falls into the "Used" bucket.',
          ).optional(),
        }).describe(
          'Utilization Chart is a specific type of visualization which displays a metric classified into "Used" and "Free" buckets.',
        ).optional(),
        totalAssets: z.string().describe(
          "Count of the number of unique assets in this collection.",
        ).optional(),
        totalCores: z.string().describe(
          "Sum of the CPU core count of all the assets in this collection.",
        ).optional(),
        totalMemoryBytes: z.string().describe(
          "Sum of the memory in bytes of all the assets in this collection.",
        ).optional(),
        totalStorageBytes: z.string().describe(
          "Sum of persistent storage in bytes of all the assets in this collection.",
        ).optional(),
      }).describe("Aggregate statistics for a collection of assets.")
        .optional(),
      description: z.string().describe("Description for the Group.").optional(),
      displayName: z.string().describe("Display Name for the Group.")
        .optional(),
      overlappingAssetCount: z.string().describe(
        "This field is deprecated, do not rely on it having a value.",
      ).optional(),
      preferenceSetFindings: z.array(z.object({
        computeEngineFinding: z.unknown().describe(
          "A set of findings that applies to assets destined for Compute Engine.",
        ).optional(),
        description: z.unknown().describe("Description for the Preference Set.")
          .optional(),
        displayName: z.unknown().describe("Display Name of the Preference Set")
          .optional(),
        machinePreferences: z.unknown().describe(
          "VirtualMachinePreferences enables you to create sets of assumptions, for example, a geographical location and pricing track, for your migrated virtual machines. The set of preferences influence recommendations for migrating virtual machine assets.",
        ).optional(),
        monthlyCostCompute: z.unknown().describe(
          "Represents an amount of money with its currency type.",
        ).optional(),
        monthlyCostNetworkEgress: z.unknown().describe(
          "Represents an amount of money with its currency type.",
        ).optional(),
        monthlyCostOsLicense: z.unknown().describe(
          "Represents an amount of money with its currency type.",
        ).optional(),
        monthlyCostOther: z.unknown().describe(
          "Represents an amount of money with its currency type.",
        ).optional(),
        monthlyCostStorage: z.unknown().describe(
          "Represents an amount of money with its currency type.",
        ).optional(),
        monthlyCostTotal: z.unknown().describe(
          "Represents an amount of money with its currency type.",
        ).optional(),
        soleTenantFinding: z.unknown().describe(
          "A set of findings that applies to assets destined for Sole-Tenant nodes.",
        ).optional(),
        vmwareEngineFinding: z.unknown().describe(
          "A set of findings that applies to assets destined for VMWare Engine.",
        ).optional(),
      })).describe("Findings for each of the PreferenceSets for this group.")
        .optional(),
    })).describe("Findings for each Group included in this report.").optional(),
  }).describe(
    "Describes the Summary view of a Report, which contains aggregated values for all the groups and preference sets included in this Report.",
  ).optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "TOTAL_COST_OF_OWNERSHIP"]).describe(
    "Report type.",
  ).optional(),
  reportId: z.string().describe(
    "Required. User specified id for the report. It will become the last component of the report name. The id must be unique within the project, must conform with RFC-1034, is restricted to lower-cased letters, and has a maximum length of 63 characters. The id must match the regular expression: [a-z]([a-z0-9-]{0,61}[a-z0-9])?.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  name: z.string(),
  state: z.string().optional(),
  summary: z.object({
    allAssetsStats: z.object({
      coreCountHistogram: z.object({
        buckets: z.array(z.object({
          count: z.unknown(),
          lowerBound: z.unknown(),
          upperBound: z.unknown(),
        })),
      }),
      memoryBytesHistogram: z.object({
        buckets: z.array(z.object({
          count: z.unknown(),
          lowerBound: z.unknown(),
          upperBound: z.unknown(),
        })),
      }),
      memoryUtilizationChart: z.object({
        free: z.string(),
        used: z.string(),
      }),
      operatingSystem: z.object({
        dataPoints: z.array(z.object({
          label: z.unknown(),
          value: z.unknown(),
        })),
      }),
      softwareInstances: z.object({
        dataPoints: z.array(z.object({
          label: z.unknown(),
          value: z.unknown(),
        })),
      }),
      storageBytesHistogram: z.object({
        buckets: z.array(z.object({
          count: z.unknown(),
          lowerBound: z.unknown(),
          upperBound: z.unknown(),
        })),
      }),
      storageUtilizationChart: z.object({
        free: z.string(),
        used: z.string(),
      }),
      totalAssets: z.string(),
      totalCores: z.string(),
      totalMemoryBytes: z.string(),
      totalStorageBytes: z.string(),
    }),
    groupFindings: z.array(z.object({
      assetAggregateStats: z.object({
        coreCountHistogram: z.object({
          buckets: z.unknown(),
        }),
        memoryBytesHistogram: z.object({
          buckets: z.unknown(),
        }),
        memoryUtilizationChart: z.object({
          free: z.unknown(),
          used: z.unknown(),
        }),
        operatingSystem: z.object({
          dataPoints: z.unknown(),
        }),
        softwareInstances: z.object({
          dataPoints: z.unknown(),
        }),
        storageBytesHistogram: z.object({
          buckets: z.unknown(),
        }),
        storageUtilizationChart: z.object({
          free: z.unknown(),
          used: z.unknown(),
        }),
        totalAssets: z.string(),
        totalCores: z.string(),
        totalMemoryBytes: z.string(),
        totalStorageBytes: z.string(),
      }),
      description: z.string(),
      displayName: z.string(),
      overlappingAssetCount: z.string(),
      preferenceSetFindings: z.array(z.object({
        computeEngineFinding: z.unknown(),
        description: z.unknown(),
        displayName: z.unknown(),
        machinePreferences: z.unknown(),
        monthlyCostCompute: z.unknown(),
        monthlyCostNetworkEgress: z.unknown(),
        monthlyCostOsLicense: z.unknown(),
        monthlyCostOther: z.unknown(),
        monthlyCostStorage: z.unknown(),
        monthlyCostTotal: z.unknown(),
        soleTenantFinding: z.unknown(),
        vmwareEngineFinding: z.unknown(),
      })),
    })),
  }).optional(),
  type: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  description: z.string().describe("Free-text description.").optional(),
  displayName: z.string().describe(
    "User-friendly display name. Maximum length is 63 characters.",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "PENDING", "SUCCEEDED", "FAILED"])
    .describe("Report creation state.").optional(),
  summary: z.object({
    allAssetsStats: z.object({
      coreCountHistogram: z.object({
        buckets: z.array(z.object({
          count: z.unknown().describe("Count of items in the bucket.")
            .optional(),
          lowerBound: z.unknown().describe("Lower bound - inclusive.")
            .optional(),
          upperBound: z.unknown().describe("Upper bound - exclusive.")
            .optional(),
        })).describe(
          "Buckets in the histogram. There will be `n+1` buckets matching `n` lower bounds in the request. The first bucket will be from -infinity to the first bound. Subsequent buckets will be between one bound and the next. The final bucket will be from the final bound to infinity.",
        ).optional(),
      }).describe(
        "A Histogram Chart shows a distribution of values into buckets, showing a count of values which fall into a bucket.",
      ).optional(),
      memoryBytesHistogram: z.object({
        buckets: z.array(z.object({
          count: z.unknown().describe("Count of items in the bucket.")
            .optional(),
          lowerBound: z.unknown().describe("Lower bound - inclusive.")
            .optional(),
          upperBound: z.unknown().describe("Upper bound - exclusive.")
            .optional(),
        })).describe(
          "Buckets in the histogram. There will be `n+1` buckets matching `n` lower bounds in the request. The first bucket will be from -infinity to the first bound. Subsequent buckets will be between one bound and the next. The final bucket will be from the final bound to infinity.",
        ).optional(),
      }).describe(
        "A Histogram Chart shows a distribution of values into buckets, showing a count of values which fall into a bucket.",
      ).optional(),
      memoryUtilizationChart: z.object({
        free: z.string().describe(
          'Aggregate value which falls into the "Free" bucket.',
        ).optional(),
        used: z.string().describe(
          'Aggregate value which falls into the "Used" bucket.',
        ).optional(),
      }).describe(
        'Utilization Chart is a specific type of visualization which displays a metric classified into "Used" and "Free" buckets.',
      ).optional(),
      operatingSystem: z.object({
        dataPoints: z.array(z.object({
          label: z.unknown().describe("The X-axis label for this data point.")
            .optional(),
          value: z.unknown().describe("The Y-axis value for this data point.")
            .optional(),
        })).describe(
          "Each data point in the chart is represented as a name-value pair with the name being the x-axis label, and the value being the y-axis value.",
        ).optional(),
      }).describe("Describes a collection of data points rendered as a Chart.")
        .optional(),
      softwareInstances: z.object({
        dataPoints: z.array(z.object({
          label: z.unknown().describe("The X-axis label for this data point.")
            .optional(),
          value: z.unknown().describe("The Y-axis value for this data point.")
            .optional(),
        })).describe(
          "Each data point in the chart is represented as a name-value pair with the name being the x-axis label, and the value being the y-axis value.",
        ).optional(),
      }).describe("Describes a collection of data points rendered as a Chart.")
        .optional(),
      storageBytesHistogram: z.object({
        buckets: z.array(z.object({
          count: z.unknown().describe("Count of items in the bucket.")
            .optional(),
          lowerBound: z.unknown().describe("Lower bound - inclusive.")
            .optional(),
          upperBound: z.unknown().describe("Upper bound - exclusive.")
            .optional(),
        })).describe(
          "Buckets in the histogram. There will be `n+1` buckets matching `n` lower bounds in the request. The first bucket will be from -infinity to the first bound. Subsequent buckets will be between one bound and the next. The final bucket will be from the final bound to infinity.",
        ).optional(),
      }).describe(
        "A Histogram Chart shows a distribution of values into buckets, showing a count of values which fall into a bucket.",
      ).optional(),
      storageUtilizationChart: z.object({
        free: z.string().describe(
          'Aggregate value which falls into the "Free" bucket.',
        ).optional(),
        used: z.string().describe(
          'Aggregate value which falls into the "Used" bucket.',
        ).optional(),
      }).describe(
        'Utilization Chart is a specific type of visualization which displays a metric classified into "Used" and "Free" buckets.',
      ).optional(),
      totalAssets: z.string().describe(
        "Count of the number of unique assets in this collection.",
      ).optional(),
      totalCores: z.string().describe(
        "Sum of the CPU core count of all the assets in this collection.",
      ).optional(),
      totalMemoryBytes: z.string().describe(
        "Sum of the memory in bytes of all the assets in this collection.",
      ).optional(),
      totalStorageBytes: z.string().describe(
        "Sum of persistent storage in bytes of all the assets in this collection.",
      ).optional(),
    }).describe("Aggregate statistics for a collection of assets.").optional(),
    groupFindings: z.array(z.object({
      assetAggregateStats: z.object({
        coreCountHistogram: z.object({
          buckets: z.unknown().describe(
            "Buckets in the histogram. There will be `n+1` buckets matching `n` lower bounds in the request. The first bucket will be from -infinity to the first bound. Subsequent buckets will be between one bound and the next. The final bucket will be from the final bound to infinity.",
          ).optional(),
        }).describe(
          "A Histogram Chart shows a distribution of values into buckets, showing a count of values which fall into a bucket.",
        ).optional(),
        memoryBytesHistogram: z.object({
          buckets: z.unknown().describe(
            "Buckets in the histogram. There will be `n+1` buckets matching `n` lower bounds in the request. The first bucket will be from -infinity to the first bound. Subsequent buckets will be between one bound and the next. The final bucket will be from the final bound to infinity.",
          ).optional(),
        }).describe(
          "A Histogram Chart shows a distribution of values into buckets, showing a count of values which fall into a bucket.",
        ).optional(),
        memoryUtilizationChart: z.object({
          free: z.unknown().describe(
            'Aggregate value which falls into the "Free" bucket.',
          ).optional(),
          used: z.unknown().describe(
            'Aggregate value which falls into the "Used" bucket.',
          ).optional(),
        }).describe(
          'Utilization Chart is a specific type of visualization which displays a metric classified into "Used" and "Free" buckets.',
        ).optional(),
        operatingSystem: z.object({
          dataPoints: z.unknown().describe(
            "Each data point in the chart is represented as a name-value pair with the name being the x-axis label, and the value being the y-axis value.",
          ).optional(),
        }).describe(
          "Describes a collection of data points rendered as a Chart.",
        ).optional(),
        softwareInstances: z.object({
          dataPoints: z.unknown().describe(
            "Each data point in the chart is represented as a name-value pair with the name being the x-axis label, and the value being the y-axis value.",
          ).optional(),
        }).describe(
          "Describes a collection of data points rendered as a Chart.",
        ).optional(),
        storageBytesHistogram: z.object({
          buckets: z.unknown().describe(
            "Buckets in the histogram. There will be `n+1` buckets matching `n` lower bounds in the request. The first bucket will be from -infinity to the first bound. Subsequent buckets will be between one bound and the next. The final bucket will be from the final bound to infinity.",
          ).optional(),
        }).describe(
          "A Histogram Chart shows a distribution of values into buckets, showing a count of values which fall into a bucket.",
        ).optional(),
        storageUtilizationChart: z.object({
          free: z.unknown().describe(
            'Aggregate value which falls into the "Free" bucket.',
          ).optional(),
          used: z.unknown().describe(
            'Aggregate value which falls into the "Used" bucket.',
          ).optional(),
        }).describe(
          'Utilization Chart is a specific type of visualization which displays a metric classified into "Used" and "Free" buckets.',
        ).optional(),
        totalAssets: z.string().describe(
          "Count of the number of unique assets in this collection.",
        ).optional(),
        totalCores: z.string().describe(
          "Sum of the CPU core count of all the assets in this collection.",
        ).optional(),
        totalMemoryBytes: z.string().describe(
          "Sum of the memory in bytes of all the assets in this collection.",
        ).optional(),
        totalStorageBytes: z.string().describe(
          "Sum of persistent storage in bytes of all the assets in this collection.",
        ).optional(),
      }).describe("Aggregate statistics for a collection of assets.")
        .optional(),
      description: z.string().describe("Description for the Group.").optional(),
      displayName: z.string().describe("Display Name for the Group.")
        .optional(),
      overlappingAssetCount: z.string().describe(
        "This field is deprecated, do not rely on it having a value.",
      ).optional(),
      preferenceSetFindings: z.array(z.object({
        computeEngineFinding: z.unknown().describe(
          "A set of findings that applies to assets destined for Compute Engine.",
        ).optional(),
        description: z.unknown().describe("Description for the Preference Set.")
          .optional(),
        displayName: z.unknown().describe("Display Name of the Preference Set")
          .optional(),
        machinePreferences: z.unknown().describe(
          "VirtualMachinePreferences enables you to create sets of assumptions, for example, a geographical location and pricing track, for your migrated virtual machines. The set of preferences influence recommendations for migrating virtual machine assets.",
        ).optional(),
        monthlyCostCompute: z.unknown().describe(
          "Represents an amount of money with its currency type.",
        ).optional(),
        monthlyCostNetworkEgress: z.unknown().describe(
          "Represents an amount of money with its currency type.",
        ).optional(),
        monthlyCostOsLicense: z.unknown().describe(
          "Represents an amount of money with its currency type.",
        ).optional(),
        monthlyCostOther: z.unknown().describe(
          "Represents an amount of money with its currency type.",
        ).optional(),
        monthlyCostStorage: z.unknown().describe(
          "Represents an amount of money with its currency type.",
        ).optional(),
        monthlyCostTotal: z.unknown().describe(
          "Represents an amount of money with its currency type.",
        ).optional(),
        soleTenantFinding: z.unknown().describe(
          "A set of findings that applies to assets destined for Sole-Tenant nodes.",
        ).optional(),
        vmwareEngineFinding: z.unknown().describe(
          "A set of findings that applies to assets destined for VMWare Engine.",
        ).optional(),
      })).describe("Findings for each of the PreferenceSets for this group.")
        .optional(),
    })).describe("Findings for each Group included in this report.").optional(),
  }).describe(
    "Describes the Summary view of a Report, which contains aggregated values for all the groups and preference sets included in this Report.",
  ).optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "TOTAL_COST_OF_OWNERSHIP"]).describe(
    "Report type.",
  ).optional(),
  reportId: z.string().describe(
    "Required. User specified id for the report. It will become the last component of the report name. The id must be unique within the project, must conform with RFC-1034, is restricted to lower-cased letters, and has a maximum length of 63 characters. The id must match the regular expression: [a-z]([a-z0-9-]{0,61}[a-z0-9])?.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Migration Center ReportConfigs.Reports. Registered at `@swamp/gcp/migrationcenter/reportconfigs-reports`. */
export const model = {
  type: "@swamp/gcp/migrationcenter/reportconfigs-reports",
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
        "Report represents a point-in-time rendering of the ReportConfig results.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a reports",
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
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["summary"] !== undefined) body["summary"] = g["summary"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["reportId"] !== undefined) body["reportId"] = g["reportId"];
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
              "readyValues": ["SUCCEEDED"],
              "failedValues": ["FAILED"],
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
      description: "Get a reports",
      arguments: z.object({
        identifier: z.string().describe("The name of the reports"),
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
    delete: {
      description: "Delete the reports",
      arguments: z.object({
        identifier: z.string().describe("The name of the reports"),
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
      description: "Sync reports state from GCP",
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
      description: "List reports resources",
      arguments: z.object({
        filter: z.string().describe("Filtering results.").optional(),
        orderBy: z.string().describe(
          "Field to sort by. See https://google.aip.dev/132#ordering for more details.",
        ).optional(),
        pageSize: z.number().describe(
          "Requested page size. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default value.",
        ).optional(),
        view: z.string().describe(
          "Determines what information to retrieve for each Report.",
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
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "reports",
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
  },
};
