// Auto-generated extension model for @swamp/gcp/migrationcenter/assets
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Migration Center Assets.
 *
 * An asset represents a resource in your environment. Asset types include virtual machines and databases.
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
  return `${parent}/assets/${shortName}`;
}

const BASE_URL = "https://migrationcenter.googleapis.com/";

const GET_CONFIG = {
  "id": "migrationcenter.projects.locations.assets.get",
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

const PATCH_CONFIG = {
  "id": "migrationcenter.projects.locations.assets.patch",
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
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "migrationcenter.projects.locations.assets.delete",
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

const GlobalArgsSchema = z.object({
  assignedGroups: z.array(z.string()).describe(
    "Output only. The list of groups that the asset is assigned to.",
  ).optional(),
  attributes: z.record(z.string(), z.string()).describe(
    "Generic asset attributes.",
  ).optional(),
  createTime: z.string().describe(
    "Output only. The timestamp when the asset was created.",
  ).optional(),
  databaseDeploymentDetails: z.object({
    aggregatedStats: z.object({
      databaseCount: z.number().int().describe(
        "Output only. The number of databases in the deployment.",
      ).optional(),
    }).describe("Aggregated stats for the database deployment.").optional(),
    awsRds: z.object({}).describe(
      "Specific details for an AWS RDS database deployment.",
    ).optional(),
    edition: z.string().describe("Optional. The database deployment edition.")
      .optional(),
    generatedId: z.string().describe(
      "Optional. The database deployment generated ID.",
    ).optional(),
    manualUniqueId: z.string().describe(
      "Optional. A manual unique ID set by the user.",
    ).optional(),
    mysql: z.object({
      plugins: z.array(z.object({
        enabled: z.boolean().describe("Required. The plugin is active.")
          .optional(),
        plugin: z.string().describe("Required. The plugin name.").optional(),
        version: z.string().describe("Required. The plugin version.")
          .optional(),
      })).describe("Optional. List of MySql plugins.").optional(),
      properties: z.array(z.object({
        enabled: z.boolean().describe("Required. The property is enabled.")
          .optional(),
        numericValue: z.string().describe(
          "Required. The property numeric value.",
        ).optional(),
        property: z.string().describe("Required. The property name.")
          .optional(),
      })).describe("Optional. List of MySql properties.").optional(),
      resourceGroupsCount: z.number().int().describe(
        "Optional. Number of resource groups.",
      ).optional(),
      variables: z.array(z.object({
        category: z.string().describe("Required. The variable category.")
          .optional(),
        value: z.string().describe("Required. The variable value.").optional(),
        variable: z.string().describe("Required. The variable name.")
          .optional(),
      })).describe("Optional. List of MySql variables.").optional(),
    }).describe("Specific details for a Mysql database deployment.").optional(),
    postgresql: z.object({
      properties: z.array(z.object({
        enabled: z.boolean().describe("Required. The property is enabled.")
          .optional(),
        numericValue: z.string().describe(
          "Required. The property numeric value.",
        ).optional(),
        property: z.string().describe("Required. The property name.")
          .optional(),
      })).describe("Optional. List of PostgreSql properties.").optional(),
      settings: z.array(z.object({
        boolValue: z.boolean().describe("Required. The setting boolean value.")
          .optional(),
        intValue: z.string().describe("Required. The setting int value.")
          .optional(),
        realValue: z.number().describe("Required. The setting real value.")
          .optional(),
        setting: z.string().describe("Required. The setting name.").optional(),
        source: z.string().describe("Required. The setting source.").optional(),
        stringValue: z.string().describe(
          "Required. The setting string value. Notice that enum values are stored as strings.",
        ).optional(),
        unit: z.string().describe("Optional. The setting unit.").optional(),
      })).describe("Optional. List of PostgreSql settings.").optional(),
    }).describe("Specific details for a PostgreSQL database deployment.")
      .optional(),
    sqlServer: z.object({
      features: z.array(z.object({
        enabled: z.boolean().describe(
          "Required. Field enabled is set when a feature is used on the source deployment.",
        ).optional(),
        featureName: z.string().describe("Required. The feature name.")
          .optional(),
      })).describe("Optional. List of SQL Server features.").optional(),
      serverFlags: z.array(z.object({
        serverFlagName: z.string().describe("Required. The server flag name.")
          .optional(),
        value: z.string().describe(
          "Required. The server flag value set by the user.",
        ).optional(),
        valueInUse: z.string().describe(
          "Required. The server flag actual value. If `value_in_use` is different from `value` it means that either the configuration change was not applied or it is an expected behavior. See SQL Server documentation for more details.",
        ).optional(),
      })).describe("Optional. List of SQL Server server flags.").optional(),
      traceFlags: z.array(z.object({
        scope: z.enum(["SCOPE_UNSPECIFIED", "OFF", "GLOBAL", "SESSION"])
          .describe("Required. The trace flag scope.").optional(),
        traceFlagName: z.string().describe("Required. The trace flag name.")
          .optional(),
      })).describe("Optional. List of SQL Server trace flags.").optional(),
    }).describe(
      "Specific details for a Microsoft SQL Server database deployment.",
    ).optional(),
    topology: z.object({
      coreCount: z.number().int().describe(
        "Optional. Number of total logical cores.",
      ).optional(),
      coreLimit: z.number().int().describe(
        "Optional. Number of total logical cores limited by db deployment.",
      ).optional(),
      diskAllocatedBytes: z.string().describe(
        "Optional. Disk allocated in bytes.",
      ).optional(),
      diskUsedBytes: z.string().describe("Optional. Disk used in bytes.")
        .optional(),
      instances: z.array(z.object({
        instanceName: z.string().describe("Optional. The instance's name.")
          .optional(),
        network: z.object({
          hostNames: z.unknown().describe(
            "Optional. The instance's host names.",
          ).optional(),
          ipAddresses: z.unknown().describe(
            "Optional. The instance's IP addresses.",
          ).optional(),
          primaryMacAddress: z.unknown().describe(
            "Optional. The instance's primary MAC address.",
          ).optional(),
        }).describe("Network details of a database instance.").optional(),
        role: z.enum(["ROLE_UNSPECIFIED", "PRIMARY", "SECONDARY", "ARBITER"])
          .describe("Optional. The instance role in the database engine.")
          .optional(),
      })).describe("Optional. List of database instances.").optional(),
      memoryBytes: z.string().describe("Optional. Total memory in bytes.")
        .optional(),
      memoryLimitBytes: z.string().describe(
        "Optional. Total memory in bytes limited by db deployment.",
      ).optional(),
      physicalCoreCount: z.number().int().describe(
        "Optional. Number of total physical cores.",
      ).optional(),
      physicalCoreLimit: z.number().int().describe(
        "Optional. Number of total physical cores limited by db deployment.",
      ).optional(),
    }).describe("Details of database deployment's topology.").optional(),
    version: z.string().describe("Optional. The database deployment version.")
      .optional(),
  }).describe("The details of a database deployment asset.").optional(),
  databaseDetails: z.object({
    allocatedStorageBytes: z.string().describe(
      "Optional. The allocated storage for the database in bytes.",
    ).optional(),
    databaseName: z.string().describe("Required. The name of the database.")
      .optional(),
    parentDatabaseDeployment: z.object({
      generatedId: z.string().describe(
        "Optional. The parent database deployment generated ID.",
      ).optional(),
      manualUniqueId: z.string().describe(
        "Optional. The parent database deployment optional manual unique ID set by the user.",
      ).optional(),
    }).describe("The identifiers of the parent database deployment.")
      .optional(),
    schemas: z.array(z.object({
      mysql: z.object({
        storageEngines: z.array(z.unknown()).describe(
          "Optional. Mysql storage engine tables.",
        ).optional(),
      }).describe("Specific details for a Mysql database.").optional(),
      objects: z.array(z.object({
        category: z.unknown().describe("Optional. The category of the objects.")
          .optional(),
        count: z.unknown().describe("Optional. The number of objects.")
          .optional(),
      })).describe("Optional. List of details of objects by category.")
        .optional(),
      postgresql: z.object({
        foreignTablesCount: z.number().int().describe(
          "Optional. PostgreSql foreign tables.",
        ).optional(),
        postgresqlExtensions: z.array(z.unknown()).describe(
          "Optional. PostgreSql extensions.",
        ).optional(),
      }).describe("Specific details for a PostgreSql schema.").optional(),
      schemaName: z.string().describe("Required. The name of the schema.")
        .optional(),
      sqlServer: z.object({
        clrObjectCount: z.number().int().describe(
          "Optional. SqlServer number of CLR objects.",
        ).optional(),
      }).describe("Specific details for a SqlServer database.").optional(),
      tablesSizeBytes: z.string().describe(
        "Optional. The total size of tables in bytes.",
      ).optional(),
    })).describe("Optional. The database schemas.").optional(),
  }).describe("Details of a logical database.").optional(),
  hidden: z.boolean().describe("Optional. Indicates if the asset is hidden.")
    .optional(),
  hideReason: z.string().describe(
    "Optional. An optional reason for marking this asset as hidden.",
  ).optional(),
  hideTime: z.string().describe(
    "Output only. The timestamp when the asset was marked as hidden.",
  ).optional(),
  insightList: z.object({
    insights: z.array(z.object({
      genericInsight: z.object({
        additionalInformation: z.array(z.unknown()).describe(
          "Output only. Additional information about the insight, each entry can be a logical entry and must make sense if it is displayed with line breaks between each entry. Text can contain md style links.",
        ).optional(),
        defaultMessage: z.string().describe(
          "Output only. In case message_code is not yet known by the client default_message will be the message to be used instead.",
        ).optional(),
        messageId: z.string().describe(
          "Output only. Represents a globally unique message id for this insight, can be used for localization purposes, in case message_code is not yet known by the client use default_message instead.",
        ).optional(),
      }).describe("A generic insight about an asset.").optional(),
      migrationInsight: z.object({
        computeEngineTarget: z.object({
          shape: z.unknown().describe("Compute Engine target shape descriptor.")
            .optional(),
        }).describe("Compute engine migration target.").optional(),
        fit: z.object({
          fitLevel: z.unknown().describe("Output only. Fit level.").optional(),
        }).describe(
          "Describes the fit level of an asset for migration to a specific target.",
        ).optional(),
      }).describe("An insight about potential migrations for an asset.")
        .optional(),
    })).describe("Output only. Insights of the list.").optional(),
    updateTime: z.string().describe("Output only. Update timestamp.")
      .optional(),
  }).describe("Message containing insights list.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels as key value pairs.",
  ).optional(),
  machineDetails: z.object({
    architecture: z.object({
      bios: z.object({
        biosName: z.string().describe(
          "BIOS name. This fields is deprecated. Please use the `id` field instead.",
        ).optional(),
        id: z.string().describe("BIOS ID.").optional(),
        manufacturer: z.string().describe("BIOS manufacturer.").optional(),
        releaseDate: z.object({
          day: z.number().int().describe(
            "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
          ).optional(),
          month: z.number().int().describe(
            "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
          ).optional(),
          year: z.number().int().describe(
            "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
          ).optional(),
        }).describe(
          "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
        ).optional(),
        smbiosUuid: z.string().describe("SMBIOS UUID.").optional(),
        version: z.string().describe("BIOS version.").optional(),
      }).describe("Details about the BIOS.").optional(),
      cpuArchitecture: z.string().describe(
        'CPU architecture, e.g., "x64-based PC", "x86_64", "i686" etc.',
      ).optional(),
      cpuManufacturer: z.string().describe(
        'Optional. CPU manufacturer, e.g., "Intel", "AMD".',
      ).optional(),
      cpuName: z.string().describe(
        'CPU name, e.g., "Intel Xeon E5-2690", "AMD EPYC 7571" etc.',
      ).optional(),
      cpuSocketCount: z.number().int().describe(
        "Number of processor sockets allocated to the machine.",
      ).optional(),
      cpuThreadCount: z.number().int().describe(
        "Deprecated: use MachineDetails.core_count instead. Number of CPU threads allocated to the machine.",
      ).optional(),
      firmwareType: z.enum(["FIRMWARE_TYPE_UNSPECIFIED", "BIOS", "EFI"])
        .describe("Firmware type.").optional(),
      hyperthreading: z.enum([
        "CPU_HYPER_THREADING_UNSPECIFIED",
        "DISABLED",
        "ENABLED",
      ]).describe("CPU hyper-threading support.").optional(),
      vendor: z.string().describe("Hardware vendor.").optional(),
    }).describe("Details of the machine architecture.").optional(),
    coreCount: z.number().int().describe(
      "Number of logical CPU cores in the machine. Must be non-negative.",
    ).optional(),
    createTime: z.string().describe("Machine creation time.").optional(),
    diskPartitions: z.object({
      freeSpaceBytes: z.string().describe(
        "Output only. Total free space of all partitions.",
      ).optional(),
      partitions: z.object({
        entries: z.array(z.object({
          capacityBytes: z.unknown().describe("Partition capacity.").optional(),
          fileSystem: z.unknown().describe("Partition file system.").optional(),
          freeBytes: z.unknown().describe("Partition free space.").optional(),
          mountPoint: z.unknown().describe(
            "Mount point (Linux/Windows) or drive letter (Windows).",
          ).optional(),
          subPartitions: z.unknown().describe(
            "Circular reference to DiskPartitionList",
          ).optional(),
          type: z.unknown().describe("Partition type.").optional(),
          uuid: z.unknown().describe("Partition UUID.").optional(),
        })).describe("Partition entries.").optional(),
      }).describe("Disk partition list.").optional(),
      totalCapacityBytes: z.string().describe(
        "Output only. Total capacity of all partitions.",
      ).optional(),
    }).describe("Disk partition details.").optional(),
    disks: z.object({
      disks: z.object({
        entries: z.array(z.object({
          capacityBytes: z.unknown().describe("Disk capacity.").optional(),
          diskLabel: z.unknown().describe("Disk label.").optional(),
          diskLabelType: z.unknown().describe("Disk label type (e.g. BIOS/GPT)")
            .optional(),
          freeBytes: z.unknown().describe("Disk free space.").optional(),
          hwAddress: z.unknown().describe(
            "Disk hardware address (e.g. 0:1 for SCSI).",
          ).optional(),
          interfaceType: z.unknown().describe("Disks interface type.")
            .optional(),
          partitions: z.unknown().describe("Disk partition list.").optional(),
          vmware: z.unknown().describe("VMware disk config details.")
            .optional(),
        })).describe("Disk entries.").optional(),
      }).describe("VM disks.").optional(),
      totalCapacityBytes: z.string().describe("Disk total Capacity.")
        .optional(),
      totalFreeBytes: z.string().describe("Total disk free space.").optional(),
    }).describe("Details of machine disks.").optional(),
    guestOs: z.object({
      config: z.object({
        fstab: z.object({
          entries: z.array(z.unknown()).describe("Fstab entries.").optional(),
        }).describe("Fstab content.").optional(),
        hosts: z.object({
          entries: z.array(z.unknown()).describe("Hosts entries.").optional(),
        }).describe("Hosts content.").optional(),
        issue: z.string().describe("OS issue (typically /etc/issue in Linux).")
          .optional(),
        nfsExports: z.object({
          entries: z.array(z.unknown()).describe("NFS export entries.")
            .optional(),
        }).describe("NFS exports.").optional(),
        selinuxMode: z.enum([
          "SE_LINUX_MODE_UNSPECIFIED",
          "SE_LINUX_MODE_DISABLED",
          "SE_LINUX_MODE_PERMISSIVE",
          "SE_LINUX_MODE_ENFORCING",
        ]).describe("Security-Enhanced Linux (SELinux) mode.").optional(),
      }).describe("Guest OS config information.").optional(),
      family: z.enum([
        "OS_FAMILY_UNKNOWN",
        "OS_FAMILY_WINDOWS",
        "OS_FAMILY_LINUX",
        "OS_FAMILY_UNIX",
      ]).describe("What family the OS belong to, if known.").optional(),
      osName: z.string().describe("The name of the operating system.")
        .optional(),
      runtime: z.object({
        domain: z.string().describe(
          "Domain, e.g. c.stratozone-development.internal.",
        ).optional(),
        installedApps: z.object({
          entries: z.array(z.unknown()).describe("Application entries.")
            .optional(),
        }).describe("Guest installed application list.").optional(),
        lastBootTime: z.string().describe("Last time the OS was booted.")
          .optional(),
        machineName: z.string().describe("Machine name.").optional(),
        network: z.object({
          connections: z.object({
            entries: z.unknown().describe("Network connection entries.")
              .optional(),
          }).describe("Network connection list.").optional(),
          scanTime: z.string().describe("Time of the last network scan.")
            .optional(),
        }).describe("Runtime networking information.").optional(),
        openFileList: z.object({
          entries: z.array(z.unknown()).describe("Open file details entries.")
            .optional(),
        }).describe("Open file list.").optional(),
        processes: z.object({
          entries: z.array(z.unknown()).describe("Running process entries.")
            .optional(),
        }).describe("List of running guest OS processes.").optional(),
        services: z.object({
          entries: z.array(z.unknown()).describe("Running service entries.")
            .optional(),
        }).describe("List of running guest OS services.").optional(),
      }).describe("Guest OS runtime information.").optional(),
      version: z.string().describe("The version of the operating system.")
        .optional(),
    }).describe("Information from Guest-level collections.").optional(),
    machineName: z.string().describe("Machine name.").optional(),
    memoryMb: z.number().int().describe(
      "The amount of memory in the machine. Must be non-negative.",
    ).optional(),
    network: z.object({
      adapters: z.object({
        entries: z.array(z.object({
          adapterType: z.unknown().describe(
            "Network adapter type (e.g. VMXNET3).",
          ).optional(),
          addresses: z.unknown().describe(
            "List of allocated/assigned network addresses.",
          ).optional(),
          macAddress: z.unknown().describe("MAC address.").optional(),
        })).describe("Network adapter entries.").optional(),
      }).describe("List of network adapters.").optional(),
      defaultGateway: z.string().describe("Optional. Default gateway address.")
        .optional(),
      primaryIpAddress: z.string().describe(
        "The primary IP address of the machine.",
      ).optional(),
      primaryMacAddress: z.string().describe(
        "MAC address of the machine. This property is used to uniqly identify the machine.",
      ).optional(),
      publicIpAddress: z.string().describe(
        "The public IP address of the machine.",
      ).optional(),
    }).describe("Details of network adapters and settings.").optional(),
    platform: z.object({
      awsEc2Details: z.object({
        hyperthreading: z.enum([
          "HYPERTHREADING_STATUS_UNSPECIFIED",
          "HYPERTHREADING_STATUS_DISABLED",
          "HYPERTHREADING_STATUS_ENABLED",
        ]).describe("Optional. Whether the machine is hyperthreaded.")
          .optional(),
        location: z.string().describe(
          "The location of the machine in the AWS format.",
        ).optional(),
        machineTypeLabel: z.string().describe(
          "AWS platform's machine type label.",
        ).optional(),
      }).describe("AWS EC2 specific details.").optional(),
      azureVmDetails: z.object({
        hyperthreading: z.enum([
          "HYPERTHREADING_STATUS_UNSPECIFIED",
          "HYPERTHREADING_STATUS_DISABLED",
          "HYPERTHREADING_STATUS_ENABLED",
        ]).describe("Whether the machine is hyperthreaded.").optional(),
        location: z.string().describe(
          "The location of the machine in the Azure format.",
        ).optional(),
        machineTypeLabel: z.string().describe(
          "Azure platform's machine type label.",
        ).optional(),
        provisioningState: z.string().describe(
          "Azure platform's provisioning state.",
        ).optional(),
      }).describe("Azure VM specific details.").optional(),
      genericDetails: z.object({
        hyperthreading: z.enum([
          "HYPERTHREADING_STATUS_UNSPECIFIED",
          "HYPERTHREADING_STATUS_DISABLED",
          "HYPERTHREADING_STATUS_ENABLED",
        ]).describe("Whether the machine is hyperthreaded.").optional(),
        location: z.string().describe(
          "Free text representation of the machine location. The format of this field should not be relied on. Different VMs in the same location may have different string values for this field.",
        ).optional(),
      }).describe("Generic platform details.").optional(),
      physicalDetails: z.object({
        hyperthreading: z.enum([
          "HYPERTHREADING_STATUS_UNSPECIFIED",
          "HYPERTHREADING_STATUS_DISABLED",
          "HYPERTHREADING_STATUS_ENABLED",
        ]).describe("Whether the machine is hyperthreaded.").optional(),
        location: z.string().describe(
          "Free text representation of the machine location. The format of this field should not be relied on. Different machines in the same location may have different string values for this field.",
        ).optional(),
      }).describe("Platform specific details for Physical Machines.")
        .optional(),
      vmwareDetails: z.object({
        esxHyperthreading: z.enum([
          "HYPERTHREADING_STATUS_UNSPECIFIED",
          "HYPERTHREADING_STATUS_DISABLED",
          "HYPERTHREADING_STATUS_ENABLED",
        ]).describe("Whether the ESX is hyperthreaded.").optional(),
        esxVersion: z.string().describe("ESX version.").optional(),
        osid: z.string().describe(
          "VMware os enum - https://vdc-repo.vmware.com/vmwb-repository/dcr-public/da47f910-60ac-438b-8b9b-6122f4d14524/16b7274a-bf8b-4b4c-a05e-746f2aa93c8c/doc/vim.vm.GuestOsDescriptor.GuestOsIdentifier.html.",
        ).optional(),
        vcenterFolder: z.string().describe(
          "Folder name in vCenter where asset resides.",
        ).optional(),
        vcenterUri: z.string().describe("vCenter URI used in collection.")
          .optional(),
        vcenterVersion: z.string().describe("vCenter version.").optional(),
        vcenterVmId: z.string().describe("vCenter VM ID.").optional(),
      }).describe("VMware specific details.").optional(),
    }).describe("Information about the platform.").optional(),
    powerState: z.enum([
      "POWER_STATE_UNSPECIFIED",
      "PENDING",
      "ACTIVE",
      "SUSPENDING",
      "SUSPENDED",
      "DELETING",
      "DELETED",
    ]).describe("Power state of the machine.").optional(),
    uuid: z.string().describe("Machine unique identifier.").optional(),
  }).describe("Details of a machine.").optional(),
  name: z.string().describe("Output only. The full name of the asset.")
    .optional(),
  performanceData: z.object({
    dailyResourceUsageAggregations: z.array(z.object({
      cpu: z.object({
        utilizationPercentage: z.object({
          average: z.unknown().describe("Average usage value.").optional(),
          median: z.unknown().describe("Median usage value.").optional(),
          ninteyFifthPercentile: z.unknown().describe(
            "95th percentile usage value.",
          ).optional(),
          peak: z.unknown().describe("Peak usage value.").optional(),
        }).describe(
          "Statistical aggregation of samples for a single resource usage.",
        ).optional(),
      }).describe("Statistical aggregation of CPU usage.").optional(),
      date: z.object({
        day: z.number().int().describe(
          "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
        ).optional(),
        month: z.number().int().describe(
          "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
        ).optional(),
        year: z.number().int().describe(
          "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
        ).optional(),
      }).describe(
        "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
      ).optional(),
      disk: z.object({
        iops: z.object({
          average: z.unknown().describe("Average usage value.").optional(),
          median: z.unknown().describe("Median usage value.").optional(),
          ninteyFifthPercentile: z.unknown().describe(
            "95th percentile usage value.",
          ).optional(),
          peak: z.unknown().describe("Peak usage value.").optional(),
        }).describe(
          "Statistical aggregation of samples for a single resource usage.",
        ).optional(),
        readIops: z.object({
          average: z.unknown().describe("Average usage value.").optional(),
          median: z.unknown().describe("Median usage value.").optional(),
          ninteyFifthPercentile: z.unknown().describe(
            "95th percentile usage value.",
          ).optional(),
          peak: z.unknown().describe("Peak usage value.").optional(),
        }).describe(
          "Statistical aggregation of samples for a single resource usage.",
        ).optional(),
        writeIops: z.object({
          average: z.unknown().describe("Average usage value.").optional(),
          median: z.unknown().describe("Median usage value.").optional(),
          ninteyFifthPercentile: z.unknown().describe(
            "95th percentile usage value.",
          ).optional(),
          peak: z.unknown().describe("Peak usage value.").optional(),
        }).describe(
          "Statistical aggregation of samples for a single resource usage.",
        ).optional(),
      }).describe("Statistical aggregation of disk usage.").optional(),
      memory: z.object({
        utilizationPercentage: z.object({
          average: z.unknown().describe("Average usage value.").optional(),
          median: z.unknown().describe("Median usage value.").optional(),
          ninteyFifthPercentile: z.unknown().describe(
            "95th percentile usage value.",
          ).optional(),
          peak: z.unknown().describe("Peak usage value.").optional(),
        }).describe(
          "Statistical aggregation of samples for a single resource usage.",
        ).optional(),
      }).describe("Statistical aggregation of memory usage.").optional(),
      network: z.object({
        egressBps: z.object({
          average: z.unknown().describe("Average usage value.").optional(),
          median: z.unknown().describe("Median usage value.").optional(),
          ninteyFifthPercentile: z.unknown().describe(
            "95th percentile usage value.",
          ).optional(),
          peak: z.unknown().describe("Peak usage value.").optional(),
        }).describe(
          "Statistical aggregation of samples for a single resource usage.",
        ).optional(),
        ingressBps: z.object({
          average: z.unknown().describe("Average usage value.").optional(),
          median: z.unknown().describe("Median usage value.").optional(),
          ninteyFifthPercentile: z.unknown().describe(
            "95th percentile usage value.",
          ).optional(),
          peak: z.unknown().describe("Peak usage value.").optional(),
        }).describe(
          "Statistical aggregation of samples for a single resource usage.",
        ).optional(),
      }).describe("Statistical aggregation of network usage.").optional(),
    })).describe(
      "Daily resource usage aggregations. Contains all of the data available for an asset, up to the last 420 days. Aggregations are sorted from oldest to most recent.",
    ).optional(),
  }).describe("Performance data for an asset.").optional(),
  sources: z.array(z.string()).describe(
    "Output only. The list of sources contributing to the asset.",
  ).optional(),
  title: z.string().describe(
    "Output only. Server generated human readable name of the asset.",
  ).optional(),
  updateTime: z.string().describe(
    "Output only. The timestamp when the asset was last updated.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  assignedGroups: z.array(z.string()).optional(),
  attributes: z.record(z.string(), z.unknown()).optional(),
  createTime: z.string().optional(),
  databaseDeploymentDetails: z.object({
    aggregatedStats: z.object({
      databaseCount: z.number(),
    }),
    awsRds: z.object({}),
    edition: z.string(),
    generatedId: z.string(),
    manualUniqueId: z.string(),
    mysql: z.object({
      plugins: z.array(z.object({
        enabled: z.boolean(),
        plugin: z.string(),
        version: z.string(),
      })),
      properties: z.array(z.object({
        enabled: z.boolean(),
        numericValue: z.string(),
        property: z.string(),
      })),
      resourceGroupsCount: z.number(),
      variables: z.array(z.object({
        category: z.string(),
        value: z.string(),
        variable: z.string(),
      })),
    }),
    postgresql: z.object({
      properties: z.array(z.object({
        enabled: z.boolean(),
        numericValue: z.string(),
        property: z.string(),
      })),
      settings: z.array(z.object({
        boolValue: z.boolean(),
        intValue: z.string(),
        realValue: z.number(),
        setting: z.string(),
        source: z.string(),
        stringValue: z.string(),
        unit: z.string(),
      })),
    }),
    sqlServer: z.object({
      features: z.array(z.object({
        enabled: z.boolean(),
        featureName: z.string(),
      })),
      serverFlags: z.array(z.object({
        serverFlagName: z.string(),
        value: z.string(),
        valueInUse: z.string(),
      })),
      traceFlags: z.array(z.object({
        scope: z.string(),
        traceFlagName: z.string(),
      })),
    }),
    topology: z.object({
      coreCount: z.number(),
      coreLimit: z.number(),
      diskAllocatedBytes: z.string(),
      diskUsedBytes: z.string(),
      instances: z.array(z.object({
        instanceName: z.string(),
        network: z.object({
          hostNames: z.unknown(),
          ipAddresses: z.unknown(),
          primaryMacAddress: z.unknown(),
        }),
        role: z.string(),
      })),
      memoryBytes: z.string(),
      memoryLimitBytes: z.string(),
      physicalCoreCount: z.number(),
      physicalCoreLimit: z.number(),
    }),
    version: z.string(),
  }).optional(),
  databaseDetails: z.object({
    allocatedStorageBytes: z.string(),
    databaseName: z.string(),
    parentDatabaseDeployment: z.object({
      generatedId: z.string(),
      manualUniqueId: z.string(),
    }),
    schemas: z.array(z.object({
      mysql: z.object({
        storageEngines: z.array(z.unknown()),
      }),
      objects: z.array(z.object({
        category: z.unknown(),
        count: z.unknown(),
      })),
      postgresql: z.object({
        foreignTablesCount: z.number(),
        postgresqlExtensions: z.array(z.unknown()),
      }),
      schemaName: z.string(),
      sqlServer: z.object({
        clrObjectCount: z.number(),
      }),
      tablesSizeBytes: z.string(),
    })),
  }).optional(),
  hidden: z.boolean().optional(),
  hideReason: z.string().optional(),
  hideTime: z.string().optional(),
  insightList: z.object({
    insights: z.array(z.object({
      genericInsight: z.object({
        additionalInformation: z.array(z.unknown()),
        defaultMessage: z.string(),
        messageId: z.string(),
      }),
      migrationInsight: z.object({
        computeEngineTarget: z.object({
          shape: z.unknown(),
        }),
        fit: z.object({
          fitLevel: z.unknown(),
        }),
      }),
    })),
    updateTime: z.string(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  machineDetails: z.object({
    architecture: z.object({
      bios: z.object({
        biosName: z.string(),
        id: z.string(),
        manufacturer: z.string(),
        releaseDate: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        smbiosUuid: z.string(),
        version: z.string(),
      }),
      cpuArchitecture: z.string(),
      cpuManufacturer: z.string(),
      cpuName: z.string(),
      cpuSocketCount: z.number(),
      cpuThreadCount: z.number(),
      firmwareType: z.string(),
      hyperthreading: z.string(),
      vendor: z.string(),
    }),
    coreCount: z.number(),
    createTime: z.string(),
    diskPartitions: z.object({
      freeSpaceBytes: z.string(),
      partitions: z.object({
        entries: z.array(z.object({
          capacityBytes: z.unknown(),
          fileSystem: z.unknown(),
          freeBytes: z.unknown(),
          mountPoint: z.unknown(),
          subPartitions: z.unknown(),
          type: z.unknown(),
          uuid: z.unknown(),
        })),
      }),
      totalCapacityBytes: z.string(),
    }),
    disks: z.object({
      disks: z.object({
        entries: z.array(z.object({
          capacityBytes: z.unknown(),
          diskLabel: z.unknown(),
          diskLabelType: z.unknown(),
          freeBytes: z.unknown(),
          hwAddress: z.unknown(),
          interfaceType: z.unknown(),
          partitions: z.unknown(),
          vmware: z.unknown(),
        })),
      }),
      totalCapacityBytes: z.string(),
      totalFreeBytes: z.string(),
    }),
    guestOs: z.object({
      config: z.object({
        fstab: z.object({
          entries: z.array(z.unknown()),
        }),
        hosts: z.object({
          entries: z.array(z.unknown()),
        }),
        issue: z.string(),
        nfsExports: z.object({
          entries: z.array(z.unknown()),
        }),
        selinuxMode: z.string(),
      }),
      family: z.string(),
      osName: z.string(),
      runtime: z.object({
        domain: z.string(),
        installedApps: z.object({
          entries: z.array(z.unknown()),
        }),
        lastBootTime: z.string(),
        machineName: z.string(),
        network: z.object({
          connections: z.object({
            entries: z.unknown(),
          }),
          scanTime: z.string(),
        }),
        openFileList: z.object({
          entries: z.array(z.unknown()),
        }),
        processes: z.object({
          entries: z.array(z.unknown()),
        }),
        services: z.object({
          entries: z.array(z.unknown()),
        }),
      }),
      version: z.string(),
    }),
    machineName: z.string(),
    memoryMb: z.number(),
    network: z.object({
      adapters: z.object({
        entries: z.array(z.object({
          adapterType: z.unknown(),
          addresses: z.unknown(),
          macAddress: z.unknown(),
        })),
      }),
      defaultGateway: z.string(),
      primaryIpAddress: z.string(),
      primaryMacAddress: z.string(),
      publicIpAddress: z.string(),
    }),
    platform: z.object({
      awsEc2Details: z.object({
        hyperthreading: z.string(),
        location: z.string(),
        machineTypeLabel: z.string(),
      }),
      azureVmDetails: z.object({
        hyperthreading: z.string(),
        location: z.string(),
        machineTypeLabel: z.string(),
        provisioningState: z.string(),
      }),
      genericDetails: z.object({
        hyperthreading: z.string(),
        location: z.string(),
      }),
      physicalDetails: z.object({
        hyperthreading: z.string(),
        location: z.string(),
      }),
      vmwareDetails: z.object({
        esxHyperthreading: z.string(),
        esxVersion: z.string(),
        osid: z.string(),
        vcenterFolder: z.string(),
        vcenterUri: z.string(),
        vcenterVersion: z.string(),
        vcenterVmId: z.string(),
      }),
    }),
    powerState: z.string(),
    uuid: z.string(),
  }).optional(),
  name: z.string(),
  performanceData: z.object({
    dailyResourceUsageAggregations: z.array(z.object({
      cpu: z.object({
        utilizationPercentage: z.object({
          average: z.unknown(),
          median: z.unknown(),
          ninteyFifthPercentile: z.unknown(),
          peak: z.unknown(),
        }),
      }),
      date: z.object({
        day: z.number(),
        month: z.number(),
        year: z.number(),
      }),
      disk: z.object({
        iops: z.object({
          average: z.unknown(),
          median: z.unknown(),
          ninteyFifthPercentile: z.unknown(),
          peak: z.unknown(),
        }),
        readIops: z.object({
          average: z.unknown(),
          median: z.unknown(),
          ninteyFifthPercentile: z.unknown(),
          peak: z.unknown(),
        }),
        writeIops: z.object({
          average: z.unknown(),
          median: z.unknown(),
          ninteyFifthPercentile: z.unknown(),
          peak: z.unknown(),
        }),
      }),
      memory: z.object({
        utilizationPercentage: z.object({
          average: z.unknown(),
          median: z.unknown(),
          ninteyFifthPercentile: z.unknown(),
          peak: z.unknown(),
        }),
      }),
      network: z.object({
        egressBps: z.object({
          average: z.unknown(),
          median: z.unknown(),
          ninteyFifthPercentile: z.unknown(),
          peak: z.unknown(),
        }),
        ingressBps: z.object({
          average: z.unknown(),
          median: z.unknown(),
          ninteyFifthPercentile: z.unknown(),
          peak: z.unknown(),
        }),
      }),
    })),
  }).optional(),
  sources: z.array(z.string()).optional(),
  title: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  assignedGroups: z.array(z.string()).describe(
    "Output only. The list of groups that the asset is assigned to.",
  ).optional(),
  attributes: z.record(z.string(), z.string()).describe(
    "Generic asset attributes.",
  ).optional(),
  createTime: z.string().describe(
    "Output only. The timestamp when the asset was created.",
  ).optional(),
  databaseDeploymentDetails: z.object({
    aggregatedStats: z.object({
      databaseCount: z.number().int().describe(
        "Output only. The number of databases in the deployment.",
      ).optional(),
    }).describe("Aggregated stats for the database deployment.").optional(),
    awsRds: z.object({}).describe(
      "Specific details for an AWS RDS database deployment.",
    ).optional(),
    edition: z.string().describe("Optional. The database deployment edition.")
      .optional(),
    generatedId: z.string().describe(
      "Optional. The database deployment generated ID.",
    ).optional(),
    manualUniqueId: z.string().describe(
      "Optional. A manual unique ID set by the user.",
    ).optional(),
    mysql: z.object({
      plugins: z.array(z.object({
        enabled: z.boolean().describe("Required. The plugin is active.")
          .optional(),
        plugin: z.string().describe("Required. The plugin name.").optional(),
        version: z.string().describe("Required. The plugin version.")
          .optional(),
      })).describe("Optional. List of MySql plugins.").optional(),
      properties: z.array(z.object({
        enabled: z.boolean().describe("Required. The property is enabled.")
          .optional(),
        numericValue: z.string().describe(
          "Required. The property numeric value.",
        ).optional(),
        property: z.string().describe("Required. The property name.")
          .optional(),
      })).describe("Optional. List of MySql properties.").optional(),
      resourceGroupsCount: z.number().int().describe(
        "Optional. Number of resource groups.",
      ).optional(),
      variables: z.array(z.object({
        category: z.string().describe("Required. The variable category.")
          .optional(),
        value: z.string().describe("Required. The variable value.").optional(),
        variable: z.string().describe("Required. The variable name.")
          .optional(),
      })).describe("Optional. List of MySql variables.").optional(),
    }).describe("Specific details for a Mysql database deployment.").optional(),
    postgresql: z.object({
      properties: z.array(z.object({
        enabled: z.boolean().describe("Required. The property is enabled.")
          .optional(),
        numericValue: z.string().describe(
          "Required. The property numeric value.",
        ).optional(),
        property: z.string().describe("Required. The property name.")
          .optional(),
      })).describe("Optional. List of PostgreSql properties.").optional(),
      settings: z.array(z.object({
        boolValue: z.boolean().describe("Required. The setting boolean value.")
          .optional(),
        intValue: z.string().describe("Required. The setting int value.")
          .optional(),
        realValue: z.number().describe("Required. The setting real value.")
          .optional(),
        setting: z.string().describe("Required. The setting name.").optional(),
        source: z.string().describe("Required. The setting source.").optional(),
        stringValue: z.string().describe(
          "Required. The setting string value. Notice that enum values are stored as strings.",
        ).optional(),
        unit: z.string().describe("Optional. The setting unit.").optional(),
      })).describe("Optional. List of PostgreSql settings.").optional(),
    }).describe("Specific details for a PostgreSQL database deployment.")
      .optional(),
    sqlServer: z.object({
      features: z.array(z.object({
        enabled: z.boolean().describe(
          "Required. Field enabled is set when a feature is used on the source deployment.",
        ).optional(),
        featureName: z.string().describe("Required. The feature name.")
          .optional(),
      })).describe("Optional. List of SQL Server features.").optional(),
      serverFlags: z.array(z.object({
        serverFlagName: z.string().describe("Required. The server flag name.")
          .optional(),
        value: z.string().describe(
          "Required. The server flag value set by the user.",
        ).optional(),
        valueInUse: z.string().describe(
          "Required. The server flag actual value. If `value_in_use` is different from `value` it means that either the configuration change was not applied or it is an expected behavior. See SQL Server documentation for more details.",
        ).optional(),
      })).describe("Optional. List of SQL Server server flags.").optional(),
      traceFlags: z.array(z.object({
        scope: z.enum(["SCOPE_UNSPECIFIED", "OFF", "GLOBAL", "SESSION"])
          .describe("Required. The trace flag scope.").optional(),
        traceFlagName: z.string().describe("Required. The trace flag name.")
          .optional(),
      })).describe("Optional. List of SQL Server trace flags.").optional(),
    }).describe(
      "Specific details for a Microsoft SQL Server database deployment.",
    ).optional(),
    topology: z.object({
      coreCount: z.number().int().describe(
        "Optional. Number of total logical cores.",
      ).optional(),
      coreLimit: z.number().int().describe(
        "Optional. Number of total logical cores limited by db deployment.",
      ).optional(),
      diskAllocatedBytes: z.string().describe(
        "Optional. Disk allocated in bytes.",
      ).optional(),
      diskUsedBytes: z.string().describe("Optional. Disk used in bytes.")
        .optional(),
      instances: z.array(z.object({
        instanceName: z.string().describe("Optional. The instance's name.")
          .optional(),
        network: z.object({
          hostNames: z.unknown().describe(
            "Optional. The instance's host names.",
          ).optional(),
          ipAddresses: z.unknown().describe(
            "Optional. The instance's IP addresses.",
          ).optional(),
          primaryMacAddress: z.unknown().describe(
            "Optional. The instance's primary MAC address.",
          ).optional(),
        }).describe("Network details of a database instance.").optional(),
        role: z.enum(["ROLE_UNSPECIFIED", "PRIMARY", "SECONDARY", "ARBITER"])
          .describe("Optional. The instance role in the database engine.")
          .optional(),
      })).describe("Optional. List of database instances.").optional(),
      memoryBytes: z.string().describe("Optional. Total memory in bytes.")
        .optional(),
      memoryLimitBytes: z.string().describe(
        "Optional. Total memory in bytes limited by db deployment.",
      ).optional(),
      physicalCoreCount: z.number().int().describe(
        "Optional. Number of total physical cores.",
      ).optional(),
      physicalCoreLimit: z.number().int().describe(
        "Optional. Number of total physical cores limited by db deployment.",
      ).optional(),
    }).describe("Details of database deployment's topology.").optional(),
    version: z.string().describe("Optional. The database deployment version.")
      .optional(),
  }).describe("The details of a database deployment asset.").optional(),
  databaseDetails: z.object({
    allocatedStorageBytes: z.string().describe(
      "Optional. The allocated storage for the database in bytes.",
    ).optional(),
    databaseName: z.string().describe("Required. The name of the database.")
      .optional(),
    parentDatabaseDeployment: z.object({
      generatedId: z.string().describe(
        "Optional. The parent database deployment generated ID.",
      ).optional(),
      manualUniqueId: z.string().describe(
        "Optional. The parent database deployment optional manual unique ID set by the user.",
      ).optional(),
    }).describe("The identifiers of the parent database deployment.")
      .optional(),
    schemas: z.array(z.object({
      mysql: z.object({
        storageEngines: z.array(z.unknown()).describe(
          "Optional. Mysql storage engine tables.",
        ).optional(),
      }).describe("Specific details for a Mysql database.").optional(),
      objects: z.array(z.object({
        category: z.unknown().describe("Optional. The category of the objects.")
          .optional(),
        count: z.unknown().describe("Optional. The number of objects.")
          .optional(),
      })).describe("Optional. List of details of objects by category.")
        .optional(),
      postgresql: z.object({
        foreignTablesCount: z.number().int().describe(
          "Optional. PostgreSql foreign tables.",
        ).optional(),
        postgresqlExtensions: z.array(z.unknown()).describe(
          "Optional. PostgreSql extensions.",
        ).optional(),
      }).describe("Specific details for a PostgreSql schema.").optional(),
      schemaName: z.string().describe("Required. The name of the schema.")
        .optional(),
      sqlServer: z.object({
        clrObjectCount: z.number().int().describe(
          "Optional. SqlServer number of CLR objects.",
        ).optional(),
      }).describe("Specific details for a SqlServer database.").optional(),
      tablesSizeBytes: z.string().describe(
        "Optional. The total size of tables in bytes.",
      ).optional(),
    })).describe("Optional. The database schemas.").optional(),
  }).describe("Details of a logical database.").optional(),
  hidden: z.boolean().describe("Optional. Indicates if the asset is hidden.")
    .optional(),
  hideReason: z.string().describe(
    "Optional. An optional reason for marking this asset as hidden.",
  ).optional(),
  hideTime: z.string().describe(
    "Output only. The timestamp when the asset was marked as hidden.",
  ).optional(),
  insightList: z.object({
    insights: z.array(z.object({
      genericInsight: z.object({
        additionalInformation: z.array(z.unknown()).describe(
          "Output only. Additional information about the insight, each entry can be a logical entry and must make sense if it is displayed with line breaks between each entry. Text can contain md style links.",
        ).optional(),
        defaultMessage: z.string().describe(
          "Output only. In case message_code is not yet known by the client default_message will be the message to be used instead.",
        ).optional(),
        messageId: z.string().describe(
          "Output only. Represents a globally unique message id for this insight, can be used for localization purposes, in case message_code is not yet known by the client use default_message instead.",
        ).optional(),
      }).describe("A generic insight about an asset.").optional(),
      migrationInsight: z.object({
        computeEngineTarget: z.object({
          shape: z.unknown().describe("Compute Engine target shape descriptor.")
            .optional(),
        }).describe("Compute engine migration target.").optional(),
        fit: z.object({
          fitLevel: z.unknown().describe("Output only. Fit level.").optional(),
        }).describe(
          "Describes the fit level of an asset for migration to a specific target.",
        ).optional(),
      }).describe("An insight about potential migrations for an asset.")
        .optional(),
    })).describe("Output only. Insights of the list.").optional(),
    updateTime: z.string().describe("Output only. Update timestamp.")
      .optional(),
  }).describe("Message containing insights list.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels as key value pairs.",
  ).optional(),
  machineDetails: z.object({
    architecture: z.object({
      bios: z.object({
        biosName: z.string().describe(
          "BIOS name. This fields is deprecated. Please use the `id` field instead.",
        ).optional(),
        id: z.string().describe("BIOS ID.").optional(),
        manufacturer: z.string().describe("BIOS manufacturer.").optional(),
        releaseDate: z.object({
          day: z.number().int().describe(
            "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
          ).optional(),
          month: z.number().int().describe(
            "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
          ).optional(),
          year: z.number().int().describe(
            "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
          ).optional(),
        }).describe(
          "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
        ).optional(),
        smbiosUuid: z.string().describe("SMBIOS UUID.").optional(),
        version: z.string().describe("BIOS version.").optional(),
      }).describe("Details about the BIOS.").optional(),
      cpuArchitecture: z.string().describe(
        'CPU architecture, e.g., "x64-based PC", "x86_64", "i686" etc.',
      ).optional(),
      cpuManufacturer: z.string().describe(
        'Optional. CPU manufacturer, e.g., "Intel", "AMD".',
      ).optional(),
      cpuName: z.string().describe(
        'CPU name, e.g., "Intel Xeon E5-2690", "AMD EPYC 7571" etc.',
      ).optional(),
      cpuSocketCount: z.number().int().describe(
        "Number of processor sockets allocated to the machine.",
      ).optional(),
      cpuThreadCount: z.number().int().describe(
        "Deprecated: use MachineDetails.core_count instead. Number of CPU threads allocated to the machine.",
      ).optional(),
      firmwareType: z.enum(["FIRMWARE_TYPE_UNSPECIFIED", "BIOS", "EFI"])
        .describe("Firmware type.").optional(),
      hyperthreading: z.enum([
        "CPU_HYPER_THREADING_UNSPECIFIED",
        "DISABLED",
        "ENABLED",
      ]).describe("CPU hyper-threading support.").optional(),
      vendor: z.string().describe("Hardware vendor.").optional(),
    }).describe("Details of the machine architecture.").optional(),
    coreCount: z.number().int().describe(
      "Number of logical CPU cores in the machine. Must be non-negative.",
    ).optional(),
    createTime: z.string().describe("Machine creation time.").optional(),
    diskPartitions: z.object({
      freeSpaceBytes: z.string().describe(
        "Output only. Total free space of all partitions.",
      ).optional(),
      partitions: z.object({
        entries: z.array(z.object({
          capacityBytes: z.unknown().describe("Partition capacity.").optional(),
          fileSystem: z.unknown().describe("Partition file system.").optional(),
          freeBytes: z.unknown().describe("Partition free space.").optional(),
          mountPoint: z.unknown().describe(
            "Mount point (Linux/Windows) or drive letter (Windows).",
          ).optional(),
          subPartitions: z.unknown().describe(
            "Circular reference to DiskPartitionList",
          ).optional(),
          type: z.unknown().describe("Partition type.").optional(),
          uuid: z.unknown().describe("Partition UUID.").optional(),
        })).describe("Partition entries.").optional(),
      }).describe("Disk partition list.").optional(),
      totalCapacityBytes: z.string().describe(
        "Output only. Total capacity of all partitions.",
      ).optional(),
    }).describe("Disk partition details.").optional(),
    disks: z.object({
      disks: z.object({
        entries: z.array(z.object({
          capacityBytes: z.unknown().describe("Disk capacity.").optional(),
          diskLabel: z.unknown().describe("Disk label.").optional(),
          diskLabelType: z.unknown().describe("Disk label type (e.g. BIOS/GPT)")
            .optional(),
          freeBytes: z.unknown().describe("Disk free space.").optional(),
          hwAddress: z.unknown().describe(
            "Disk hardware address (e.g. 0:1 for SCSI).",
          ).optional(),
          interfaceType: z.unknown().describe("Disks interface type.")
            .optional(),
          partitions: z.unknown().describe("Disk partition list.").optional(),
          vmware: z.unknown().describe("VMware disk config details.")
            .optional(),
        })).describe("Disk entries.").optional(),
      }).describe("VM disks.").optional(),
      totalCapacityBytes: z.string().describe("Disk total Capacity.")
        .optional(),
      totalFreeBytes: z.string().describe("Total disk free space.").optional(),
    }).describe("Details of machine disks.").optional(),
    guestOs: z.object({
      config: z.object({
        fstab: z.object({
          entries: z.array(z.unknown()).describe("Fstab entries.").optional(),
        }).describe("Fstab content.").optional(),
        hosts: z.object({
          entries: z.array(z.unknown()).describe("Hosts entries.").optional(),
        }).describe("Hosts content.").optional(),
        issue: z.string().describe("OS issue (typically /etc/issue in Linux).")
          .optional(),
        nfsExports: z.object({
          entries: z.array(z.unknown()).describe("NFS export entries.")
            .optional(),
        }).describe("NFS exports.").optional(),
        selinuxMode: z.enum([
          "SE_LINUX_MODE_UNSPECIFIED",
          "SE_LINUX_MODE_DISABLED",
          "SE_LINUX_MODE_PERMISSIVE",
          "SE_LINUX_MODE_ENFORCING",
        ]).describe("Security-Enhanced Linux (SELinux) mode.").optional(),
      }).describe("Guest OS config information.").optional(),
      family: z.enum([
        "OS_FAMILY_UNKNOWN",
        "OS_FAMILY_WINDOWS",
        "OS_FAMILY_LINUX",
        "OS_FAMILY_UNIX",
      ]).describe("What family the OS belong to, if known.").optional(),
      osName: z.string().describe("The name of the operating system.")
        .optional(),
      runtime: z.object({
        domain: z.string().describe(
          "Domain, e.g. c.stratozone-development.internal.",
        ).optional(),
        installedApps: z.object({
          entries: z.array(z.unknown()).describe("Application entries.")
            .optional(),
        }).describe("Guest installed application list.").optional(),
        lastBootTime: z.string().describe("Last time the OS was booted.")
          .optional(),
        machineName: z.string().describe("Machine name.").optional(),
        network: z.object({
          connections: z.object({
            entries: z.unknown().describe("Network connection entries.")
              .optional(),
          }).describe("Network connection list.").optional(),
          scanTime: z.string().describe("Time of the last network scan.")
            .optional(),
        }).describe("Runtime networking information.").optional(),
        openFileList: z.object({
          entries: z.array(z.unknown()).describe("Open file details entries.")
            .optional(),
        }).describe("Open file list.").optional(),
        processes: z.object({
          entries: z.array(z.unknown()).describe("Running process entries.")
            .optional(),
        }).describe("List of running guest OS processes.").optional(),
        services: z.object({
          entries: z.array(z.unknown()).describe("Running service entries.")
            .optional(),
        }).describe("List of running guest OS services.").optional(),
      }).describe("Guest OS runtime information.").optional(),
      version: z.string().describe("The version of the operating system.")
        .optional(),
    }).describe("Information from Guest-level collections.").optional(),
    machineName: z.string().describe("Machine name.").optional(),
    memoryMb: z.number().int().describe(
      "The amount of memory in the machine. Must be non-negative.",
    ).optional(),
    network: z.object({
      adapters: z.object({
        entries: z.array(z.object({
          adapterType: z.unknown().describe(
            "Network adapter type (e.g. VMXNET3).",
          ).optional(),
          addresses: z.unknown().describe(
            "List of allocated/assigned network addresses.",
          ).optional(),
          macAddress: z.unknown().describe("MAC address.").optional(),
        })).describe("Network adapter entries.").optional(),
      }).describe("List of network adapters.").optional(),
      defaultGateway: z.string().describe("Optional. Default gateway address.")
        .optional(),
      primaryIpAddress: z.string().describe(
        "The primary IP address of the machine.",
      ).optional(),
      primaryMacAddress: z.string().describe(
        "MAC address of the machine. This property is used to uniqly identify the machine.",
      ).optional(),
      publicIpAddress: z.string().describe(
        "The public IP address of the machine.",
      ).optional(),
    }).describe("Details of network adapters and settings.").optional(),
    platform: z.object({
      awsEc2Details: z.object({
        hyperthreading: z.enum([
          "HYPERTHREADING_STATUS_UNSPECIFIED",
          "HYPERTHREADING_STATUS_DISABLED",
          "HYPERTHREADING_STATUS_ENABLED",
        ]).describe("Optional. Whether the machine is hyperthreaded.")
          .optional(),
        location: z.string().describe(
          "The location of the machine in the AWS format.",
        ).optional(),
        machineTypeLabel: z.string().describe(
          "AWS platform's machine type label.",
        ).optional(),
      }).describe("AWS EC2 specific details.").optional(),
      azureVmDetails: z.object({
        hyperthreading: z.enum([
          "HYPERTHREADING_STATUS_UNSPECIFIED",
          "HYPERTHREADING_STATUS_DISABLED",
          "HYPERTHREADING_STATUS_ENABLED",
        ]).describe("Whether the machine is hyperthreaded.").optional(),
        location: z.string().describe(
          "The location of the machine in the Azure format.",
        ).optional(),
        machineTypeLabel: z.string().describe(
          "Azure platform's machine type label.",
        ).optional(),
        provisioningState: z.string().describe(
          "Azure platform's provisioning state.",
        ).optional(),
      }).describe("Azure VM specific details.").optional(),
      genericDetails: z.object({
        hyperthreading: z.enum([
          "HYPERTHREADING_STATUS_UNSPECIFIED",
          "HYPERTHREADING_STATUS_DISABLED",
          "HYPERTHREADING_STATUS_ENABLED",
        ]).describe("Whether the machine is hyperthreaded.").optional(),
        location: z.string().describe(
          "Free text representation of the machine location. The format of this field should not be relied on. Different VMs in the same location may have different string values for this field.",
        ).optional(),
      }).describe("Generic platform details.").optional(),
      physicalDetails: z.object({
        hyperthreading: z.enum([
          "HYPERTHREADING_STATUS_UNSPECIFIED",
          "HYPERTHREADING_STATUS_DISABLED",
          "HYPERTHREADING_STATUS_ENABLED",
        ]).describe("Whether the machine is hyperthreaded.").optional(),
        location: z.string().describe(
          "Free text representation of the machine location. The format of this field should not be relied on. Different machines in the same location may have different string values for this field.",
        ).optional(),
      }).describe("Platform specific details for Physical Machines.")
        .optional(),
      vmwareDetails: z.object({
        esxHyperthreading: z.enum([
          "HYPERTHREADING_STATUS_UNSPECIFIED",
          "HYPERTHREADING_STATUS_DISABLED",
          "HYPERTHREADING_STATUS_ENABLED",
        ]).describe("Whether the ESX is hyperthreaded.").optional(),
        esxVersion: z.string().describe("ESX version.").optional(),
        osid: z.string().describe(
          "VMware os enum - https://vdc-repo.vmware.com/vmwb-repository/dcr-public/da47f910-60ac-438b-8b9b-6122f4d14524/16b7274a-bf8b-4b4c-a05e-746f2aa93c8c/doc/vim.vm.GuestOsDescriptor.GuestOsIdentifier.html.",
        ).optional(),
        vcenterFolder: z.string().describe(
          "Folder name in vCenter where asset resides.",
        ).optional(),
        vcenterUri: z.string().describe("vCenter URI used in collection.")
          .optional(),
        vcenterVersion: z.string().describe("vCenter version.").optional(),
        vcenterVmId: z.string().describe("vCenter VM ID.").optional(),
      }).describe("VMware specific details.").optional(),
    }).describe("Information about the platform.").optional(),
    powerState: z.enum([
      "POWER_STATE_UNSPECIFIED",
      "PENDING",
      "ACTIVE",
      "SUSPENDING",
      "SUSPENDED",
      "DELETING",
      "DELETED",
    ]).describe("Power state of the machine.").optional(),
    uuid: z.string().describe("Machine unique identifier.").optional(),
  }).describe("Details of a machine.").optional(),
  name: z.string().describe("Output only. The full name of the asset.")
    .optional(),
  performanceData: z.object({
    dailyResourceUsageAggregations: z.array(z.object({
      cpu: z.object({
        utilizationPercentage: z.object({
          average: z.unknown().describe("Average usage value.").optional(),
          median: z.unknown().describe("Median usage value.").optional(),
          ninteyFifthPercentile: z.unknown().describe(
            "95th percentile usage value.",
          ).optional(),
          peak: z.unknown().describe("Peak usage value.").optional(),
        }).describe(
          "Statistical aggregation of samples for a single resource usage.",
        ).optional(),
      }).describe("Statistical aggregation of CPU usage.").optional(),
      date: z.object({
        day: z.number().int().describe(
          "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
        ).optional(),
        month: z.number().int().describe(
          "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
        ).optional(),
        year: z.number().int().describe(
          "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
        ).optional(),
      }).describe(
        "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
      ).optional(),
      disk: z.object({
        iops: z.object({
          average: z.unknown().describe("Average usage value.").optional(),
          median: z.unknown().describe("Median usage value.").optional(),
          ninteyFifthPercentile: z.unknown().describe(
            "95th percentile usage value.",
          ).optional(),
          peak: z.unknown().describe("Peak usage value.").optional(),
        }).describe(
          "Statistical aggregation of samples for a single resource usage.",
        ).optional(),
        readIops: z.object({
          average: z.unknown().describe("Average usage value.").optional(),
          median: z.unknown().describe("Median usage value.").optional(),
          ninteyFifthPercentile: z.unknown().describe(
            "95th percentile usage value.",
          ).optional(),
          peak: z.unknown().describe("Peak usage value.").optional(),
        }).describe(
          "Statistical aggregation of samples for a single resource usage.",
        ).optional(),
        writeIops: z.object({
          average: z.unknown().describe("Average usage value.").optional(),
          median: z.unknown().describe("Median usage value.").optional(),
          ninteyFifthPercentile: z.unknown().describe(
            "95th percentile usage value.",
          ).optional(),
          peak: z.unknown().describe("Peak usage value.").optional(),
        }).describe(
          "Statistical aggregation of samples for a single resource usage.",
        ).optional(),
      }).describe("Statistical aggregation of disk usage.").optional(),
      memory: z.object({
        utilizationPercentage: z.object({
          average: z.unknown().describe("Average usage value.").optional(),
          median: z.unknown().describe("Median usage value.").optional(),
          ninteyFifthPercentile: z.unknown().describe(
            "95th percentile usage value.",
          ).optional(),
          peak: z.unknown().describe("Peak usage value.").optional(),
        }).describe(
          "Statistical aggregation of samples for a single resource usage.",
        ).optional(),
      }).describe("Statistical aggregation of memory usage.").optional(),
      network: z.object({
        egressBps: z.object({
          average: z.unknown().describe("Average usage value.").optional(),
          median: z.unknown().describe("Median usage value.").optional(),
          ninteyFifthPercentile: z.unknown().describe(
            "95th percentile usage value.",
          ).optional(),
          peak: z.unknown().describe("Peak usage value.").optional(),
        }).describe(
          "Statistical aggregation of samples for a single resource usage.",
        ).optional(),
        ingressBps: z.object({
          average: z.unknown().describe("Average usage value.").optional(),
          median: z.unknown().describe("Median usage value.").optional(),
          ninteyFifthPercentile: z.unknown().describe(
            "95th percentile usage value.",
          ).optional(),
          peak: z.unknown().describe("Peak usage value.").optional(),
        }).describe(
          "Statistical aggregation of samples for a single resource usage.",
        ).optional(),
      }).describe("Statistical aggregation of network usage.").optional(),
    })).describe(
      "Daily resource usage aggregations. Contains all of the data available for an asset, up to the last 420 days. Aggregations are sorted from oldest to most recent.",
    ).optional(),
  }).describe("Performance data for an asset.").optional(),
  sources: z.array(z.string()).describe(
    "Output only. The list of sources contributing to the asset.",
  ).optional(),
  title: z.string().describe(
    "Output only. Server generated human readable name of the asset.",
  ).optional(),
  updateTime: z.string().describe(
    "Output only. The timestamp when the asset was last updated.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Migration Center Assets. Registered at `@swamp/gcp/migrationcenter/assets`. */
export const model = {
  type: "@swamp/gcp/migrationcenter/assets",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An asset represents a resource in your environment. Asset types include virtu...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a assets",
      arguments: z.object({
        identifier: z.string().describe("The name of the assets"),
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
      description: "Update assets attributes",
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
        if (g["assignedGroups"] !== undefined) {
          body["assignedGroups"] = g["assignedGroups"];
        }
        if (g["attributes"] !== undefined) body["attributes"] = g["attributes"];
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["databaseDeploymentDetails"] !== undefined) {
          body["databaseDeploymentDetails"] = g["databaseDeploymentDetails"];
        }
        if (g["databaseDetails"] !== undefined) {
          body["databaseDetails"] = g["databaseDetails"];
        }
        if (g["hidden"] !== undefined) body["hidden"] = g["hidden"];
        if (g["hideReason"] !== undefined) body["hideReason"] = g["hideReason"];
        if (g["hideTime"] !== undefined) body["hideTime"] = g["hideTime"];
        if (g["insightList"] !== undefined) {
          body["insightList"] = g["insightList"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["machineDetails"] !== undefined) {
          body["machineDetails"] = g["machineDetails"];
        }
        if (g["performanceData"] !== undefined) {
          body["performanceData"] = g["performanceData"];
        }
        if (g["sources"] !== undefined) body["sources"] = g["sources"];
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
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
      description: "Delete the assets",
      arguments: z.object({
        identifier: z.string().describe("The name of the assets"),
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
      description: "Sync assets state from GCP",
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
    aggregate_values: {
      description: "aggregate values",
      arguments: z.object({
        aggregations: z.any().optional(),
        filter: z.any().optional(),
        showHidden: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["aggregations"] !== undefined) {
          body["aggregations"] = args["aggregations"];
        }
        if (args["filter"] !== undefined) body["filter"] = args["filter"];
        if (args["showHidden"] !== undefined) {
          body["showHidden"] = args["showHidden"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "migrationcenter.projects.locations.assets.aggregateValues",
            "path": "v1/{+parent}/assets:aggregateValues",
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
    batch_delete: {
      description: "batch delete",
      arguments: z.object({
        allowMissing: z.any().optional(),
        cascadingRules: z.any().optional(),
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
        if (args["allowMissing"] !== undefined) {
          body["allowMissing"] = args["allowMissing"];
        }
        if (args["cascadingRules"] !== undefined) {
          body["cascadingRules"] = args["cascadingRules"];
        }
        if (args["names"] !== undefined) body["names"] = args["names"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "migrationcenter.projects.locations.assets.batchDelete",
            "path": "v1/{+parent}/assets:batchDelete",
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
    batch_update: {
      description: "batch update",
      arguments: z.object({
        requests: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["requests"] !== undefined) body["requests"] = args["requests"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "migrationcenter.projects.locations.assets.batchUpdate",
            "path": "v1/{+parent}/assets:batchUpdate",
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
    report_asset_frames: {
      description: "report asset frames",
      arguments: z.object({
        framesData: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["framesData"] !== undefined) {
          body["framesData"] = args["framesData"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "migrationcenter.projects.locations.assets.reportAssetFrames",
            "path": "v1/{+parent}/assets:reportAssetFrames",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
              "source": { "location": "query" },
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
