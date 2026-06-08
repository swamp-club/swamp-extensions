// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/osconfig/patchdeployments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud OS Config PatchDeployments.
 *
 * Patch deployments are configurations that individual patch jobs use to complete a patch. These configurations include instance filter, package repository settings, and a schedule. For more information about creating and managing patch deployments, see [Scheduling patch jobs](https://cloud.google.com/compute/docs/os-patch-management/schedule-patch-jobs).
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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/patchDeployments/${shortName}`;
}

const BASE_URL = "https://osconfig.googleapis.com/";

const GET_CONFIG = {
  "id": "osconfig.projects.patchDeployments.get",
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
  "id": "osconfig.projects.patchDeployments.create",
  "path": "v1/{+parent}/patchDeployments",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "patchDeploymentId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "osconfig.projects.patchDeployments.patch",
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
  "id": "osconfig.projects.patchDeployments.delete",
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
  "id": "osconfig.projects.patchDeployments.list",
  "path": "v1/{+parent}/patchDeployments",
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  description: z.string().describe(
    "Optional. Description of the patch deployment. Length of the description is limited to 1024 characters.",
  ).optional(),
  duration: z.string().describe(
    "Optional. Duration of the patch. After the duration ends, the patch times out.",
  ).optional(),
  instanceFilter: z.object({
    all: z.boolean().describe(
      "Target all VM instances in the project. If true, no other criteria is permitted.",
    ).optional(),
    groupLabels: z.array(z.object({
      labels: z.record(z.string(), z.string()).describe(
        "Compute Engine instance labels that must be present for a VM instance to be targeted by this filter.",
      ).optional(),
    })).describe(
      "Targets VM instances matching ANY of these GroupLabels. This allows targeting of disparate groups of VM instances.",
    ).optional(),
    instanceNamePrefixes: z.array(z.string()).describe(
      'Targets VMs whose name starts with one of these prefixes. Similar to labels, this is another way to group VMs when targeting configs, for example prefix="prod-".',
    ).optional(),
    instances: z.array(z.string()).describe(
      "Targets any of the VM instances specified. Instances are specified by their URI in the form `zones/[ZONE]/instances/[INSTANCE_NAME]`, `projects/[PROJECT_ID]/zones/[ZONE]/instances/[INSTANCE_NAME]`, or `https://www.googleapis.com/compute/v1/projects/[PROJECT_ID]/zones/[ZONE]/instances/[INSTANCE_NAME]`",
    ).optional(),
    zones: z.array(z.string()).describe(
      "Targets VM instances in ANY of these zones. Leave empty to target VM instances in any zone.",
    ).optional(),
  }).describe(
    "A filter to target VM instances for patching. The targeted VMs must meet all criteria specified. So if both labels and zones are specified, the patch job targets only VMs with those labels and in those zones.",
  ).optional(),
  name: z.string().describe(
    "Unique name for the patch deployment resource in a project. The patch deployment name is in the form: `projects/{project_id}/patchDeployments/{patch_deployment_id}`. This field is ignored when you create a new patch deployment.",
  ).optional(),
  oneTimeSchedule: z.object({
    executeTime: z.string().describe(
      "Required. The desired patch job execution time.",
    ).optional(),
  }).describe(
    "Sets the time for a one time patch deployment. Timestamp is in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format.",
  ).optional(),
  patchConfig: z.object({
    apt: z.object({
      excludes: z.array(z.string()).describe(
        "List of packages to exclude from update. These packages will be excluded",
      ).optional(),
      exclusivePackages: z.array(z.string()).describe(
        "An exclusive list of packages to be updated. These are the only packages that will be updated. If these packages are not installed, they will be ignored. This field cannot be specified with any other patch configuration fields.",
      ).optional(),
      type: z.enum(["TYPE_UNSPECIFIED", "DIST", "UPGRADE"]).describe(
        "By changing the type to DIST, the patching is performed using `apt-get dist-upgrade` instead.",
      ).optional(),
    }).describe(
      "Apt patching is completed by executing `apt-get update && apt-get upgrade`. Additional options can be set to control how this is executed.",
    ).optional(),
    goo: z.object({}).describe(
      "Googet patching is performed by running `googet update`.",
    ).optional(),
    migInstancesAllowed: z.boolean().describe(
      "Allows the patch job to run on Managed instance groups (MIGs).",
    ).optional(),
    postStep: z.object({
      linuxExecStepConfig: z.object({
        allowedSuccessCodes: z.array(z.number().int()).describe(
          "Defaults to [0]. A list of possible return values that the execution can return to indicate a success.",
        ).optional(),
        gcsObject: z.object({
          bucket: z.string().describe(
            "Required. Bucket of the Cloud Storage object.",
          ).optional(),
          generationNumber: z.string().describe(
            "Required. Generation number of the Cloud Storage object. This is used to ensure that the ExecStep specified by this PatchJob does not change.",
          ).optional(),
          object: z.string().describe(
            "Required. Name of the Cloud Storage object.",
          ).optional(),
        }).describe("Cloud Storage object representation.").optional(),
        interpreter: z.enum([
          "INTERPRETER_UNSPECIFIED",
          "NONE",
          "SHELL",
          "POWERSHELL",
        ]).describe(
          "The script interpreter to use to run the script. If no interpreter is specified the script will be executed directly, which will likely only succeed for scripts with [shebang lines] (https://en.wikipedia.org/wiki/Shebang_\\(Unix\\)).",
        ).optional(),
        localPath: z.string().describe(
          "An absolute path to the executable on the VM.",
        ).optional(),
      }).describe("Common configurations for an ExecStep.").optional(),
      windowsExecStepConfig: z.object({
        allowedSuccessCodes: z.array(z.number().int()).describe(
          "Defaults to [0]. A list of possible return values that the execution can return to indicate a success.",
        ).optional(),
        gcsObject: z.object({
          bucket: z.string().describe(
            "Required. Bucket of the Cloud Storage object.",
          ).optional(),
          generationNumber: z.string().describe(
            "Required. Generation number of the Cloud Storage object. This is used to ensure that the ExecStep specified by this PatchJob does not change.",
          ).optional(),
          object: z.string().describe(
            "Required. Name of the Cloud Storage object.",
          ).optional(),
        }).describe("Cloud Storage object representation.").optional(),
        interpreter: z.enum([
          "INTERPRETER_UNSPECIFIED",
          "NONE",
          "SHELL",
          "POWERSHELL",
        ]).describe(
          "The script interpreter to use to run the script. If no interpreter is specified the script will be executed directly, which will likely only succeed for scripts with [shebang lines] (https://en.wikipedia.org/wiki/Shebang_\\(Unix\\)).",
        ).optional(),
        localPath: z.string().describe(
          "An absolute path to the executable on the VM.",
        ).optional(),
      }).describe("Common configurations for an ExecStep.").optional(),
    }).describe("A step that runs an executable for a PatchJob.").optional(),
    preStep: z.object({
      linuxExecStepConfig: z.object({
        allowedSuccessCodes: z.array(z.number().int()).describe(
          "Defaults to [0]. A list of possible return values that the execution can return to indicate a success.",
        ).optional(),
        gcsObject: z.object({
          bucket: z.string().describe(
            "Required. Bucket of the Cloud Storage object.",
          ).optional(),
          generationNumber: z.string().describe(
            "Required. Generation number of the Cloud Storage object. This is used to ensure that the ExecStep specified by this PatchJob does not change.",
          ).optional(),
          object: z.string().describe(
            "Required. Name of the Cloud Storage object.",
          ).optional(),
        }).describe("Cloud Storage object representation.").optional(),
        interpreter: z.enum([
          "INTERPRETER_UNSPECIFIED",
          "NONE",
          "SHELL",
          "POWERSHELL",
        ]).describe(
          "The script interpreter to use to run the script. If no interpreter is specified the script will be executed directly, which will likely only succeed for scripts with [shebang lines] (https://en.wikipedia.org/wiki/Shebang_\\(Unix\\)).",
        ).optional(),
        localPath: z.string().describe(
          "An absolute path to the executable on the VM.",
        ).optional(),
      }).describe("Common configurations for an ExecStep.").optional(),
      windowsExecStepConfig: z.object({
        allowedSuccessCodes: z.array(z.number().int()).describe(
          "Defaults to [0]. A list of possible return values that the execution can return to indicate a success.",
        ).optional(),
        gcsObject: z.object({
          bucket: z.string().describe(
            "Required. Bucket of the Cloud Storage object.",
          ).optional(),
          generationNumber: z.string().describe(
            "Required. Generation number of the Cloud Storage object. This is used to ensure that the ExecStep specified by this PatchJob does not change.",
          ).optional(),
          object: z.string().describe(
            "Required. Name of the Cloud Storage object.",
          ).optional(),
        }).describe("Cloud Storage object representation.").optional(),
        interpreter: z.enum([
          "INTERPRETER_UNSPECIFIED",
          "NONE",
          "SHELL",
          "POWERSHELL",
        ]).describe(
          "The script interpreter to use to run the script. If no interpreter is specified the script will be executed directly, which will likely only succeed for scripts with [shebang lines] (https://en.wikipedia.org/wiki/Shebang_\\(Unix\\)).",
        ).optional(),
        localPath: z.string().describe(
          "An absolute path to the executable on the VM.",
        ).optional(),
      }).describe("Common configurations for an ExecStep.").optional(),
    }).describe("A step that runs an executable for a PatchJob.").optional(),
    rebootConfig: z.enum([
      "REBOOT_CONFIG_UNSPECIFIED",
      "DEFAULT",
      "ALWAYS",
      "NEVER",
    ]).describe("Post-patch reboot settings.").optional(),
    skipUnpatchableVms: z.boolean().describe(
      "Optional. Enables enhanced reporting for the patch job: 1. The patch job skips instances that cannot be patched and reports them as `SKIPPED`. An instance cannot be patched for two reasons: 1. The instance runs Container-Optimized OS (COS), which cannot be patched. 2. The instance is part of a managed instance group (MIG), and patching MIG instances is disabled in the patch job's configuration (PatchConfig.migInstancesAllowed is `false`). 2. The patch job is reported as `SUCCEEDED` if it completes without errors, even if some instances are `SKIPPED`. 3. The patch job is reported as `COMPLETED_WITH_INACTIVE_VMS` if it completes without errors, but does not patch instances that are `INACTIVE`.",
    ).optional(),
    windowsUpdate: z.object({
      classifications: z.array(
        z.enum([
          "CLASSIFICATION_UNSPECIFIED",
          "CRITICAL",
          "SECURITY",
          "DEFINITION",
          "DRIVER",
          "FEATURE_PACK",
          "SERVICE_PACK",
          "TOOL",
          "UPDATE_ROLLUP",
          "UPDATE",
        ]),
      ).describe(
        "Only apply updates of these windows update classifications. If empty, all updates are applied.",
      ).optional(),
      excludes: z.array(z.string()).describe(
        "List of KBs to exclude from update.",
      ).optional(),
      exclusivePatches: z.array(z.string()).describe(
        "An exclusive list of kbs to be updated. These are the only patches that will be updated. This field must not be used with other patch configurations.",
      ).optional(),
    }).describe("Windows patching is performed using the Windows Update Agent.")
      .optional(),
    yum: z.object({
      excludes: z.array(z.string()).describe(
        "List of packages to exclude from update. These packages are excluded by using the yum `--exclude` flag.",
      ).optional(),
      exclusivePackages: z.array(z.string()).describe(
        "An exclusive list of packages to be updated. These are the only packages that will be updated. If these packages are not installed, they will be ignored. This field must not be specified with any other patch configuration fields.",
      ).optional(),
      minimal: z.boolean().describe(
        "Will cause patch to run `yum update-minimal` instead.",
      ).optional(),
      security: z.boolean().describe(
        "Adds the `--security` flag to `yum update`. Not supported on all platforms.",
      ).optional(),
    }).describe(
      "Yum patching is performed by executing `yum update`. Additional options can be set to control how this is executed. Note that not all settings are supported on all platforms.",
    ).optional(),
    zypper: z.object({
      categories: z.array(z.string()).describe(
        "Install only patches with these categories. Common categories include security, recommended, and feature.",
      ).optional(),
      excludes: z.array(z.string()).describe(
        "List of patches to exclude from update.",
      ).optional(),
      exclusivePatches: z.array(z.string()).describe(
        "An exclusive list of patches to be updated. These are the only patches that will be installed using 'zypper patch patch:' command. This field must not be used with any other patch configuration fields.",
      ).optional(),
      severities: z.array(z.string()).describe(
        "Install only patches with these severities. Common severities include critical, important, moderate, and low.",
      ).optional(),
      withOptional: z.boolean().describe(
        "Adds the `--with-optional` flag to `zypper patch`.",
      ).optional(),
      withUpdate: z.boolean().describe(
        "Adds the `--with-update` flag, to `zypper patch`.",
      ).optional(),
    }).describe(
      "Zypper patching is performed by running `zypper patch`. See also https://en.opensuse.org/SDB:Zypper_manual.",
    ).optional(),
  }).describe(
    "Patch configuration specifications. Contains details on how to apply the patch(es) to a VM instance.",
  ).optional(),
  recurringSchedule: z.object({
    endTime: z.string().describe(
      "Optional. The end time at which a recurring patch deployment schedule is no longer active.",
    ).optional(),
    frequency: z.enum(["FREQUENCY_UNSPECIFIED", "WEEKLY", "MONTHLY", "DAILY"])
      .describe("Required. The frequency unit of this recurring schedule.")
      .optional(),
    lastExecuteTime: z.string().describe(
      "Output only. The time the last patch job ran successfully.",
    ).optional(),
    monthly: z.object({
      monthDay: z.number().int().describe(
        'Required. One day of the month. 1-31 indicates the 1st to the 31st day. -1 indicates the last day of the month. Months without the target day will be skipped. For example, a schedule to run "every month on the 31st" will not run in February, April, June, etc.',
      ).optional(),
      weekDayOfMonth: z.object({
        dayOfWeek: z.enum([
          "DAY_OF_WEEK_UNSPECIFIED",
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
          "SUNDAY",
        ]).describe("Required. A day of the week.").optional(),
        dayOffset: z.number().int().describe(
          "Optional. Represents the number of days before or after the given week day of month that the patch deployment is scheduled for. For example if `week_ordinal` and `day_of_week` values point to the second Tuesday of the month and the `day_offset` value is set to `3`, patch deployment takes place three days after the second Tuesday of the month. If this value is negative, for example -5, patches are deployed five days before the second Tuesday of the month. Allowed values are in range [-30, 30].",
        ).optional(),
        weekOrdinal: z.number().int().describe(
          "Required. Week number in a month. 1-4 indicates the 1st to 4th week of the month. -1 indicates the last week of the month.",
        ).optional(),
      }).describe(
        'Represents one week day in a month. An example is "the 4th Sunday".',
      ).optional(),
    }).describe(
      'Represents a monthly schedule. An example of a valid monthly schedule is "on the third Tuesday of the month" or "on the 15th of the month".',
    ).optional(),
    nextExecuteTime: z.string().describe(
      "Output only. The time the next patch job is scheduled to run.",
    ).optional(),
    startTime: z.string().describe(
      "Optional. The time that the recurring schedule becomes effective. Defaults to `create_time` of the patch deployment.",
    ).optional(),
    timeOfDay: z.object({
      hours: z.number().int().describe(
        'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
      ).optional(),
      minutes: z.number().int().describe(
        "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
      ).optional(),
      nanos: z.number().int().describe(
        "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
      ).optional(),
      seconds: z.number().int().describe(
        "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
      ).optional(),
    }).describe(
      "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
    ).optional(),
    timeZone: z.object({
      id: z.string().describe(
        'IANA Time Zone Database time zone. For example "America/New_York".',
      ).optional(),
      version: z.string().describe(
        'Optional. IANA Time Zone Database version number. For example "2019a".',
      ).optional(),
    }).describe(
      "Represents a time zone from the [IANA Time Zone Database](https://www.iana.org/time-zones).",
    ).optional(),
    weekly: z.object({
      dayOfWeek: z.enum([
        "DAY_OF_WEEK_UNSPECIFIED",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ]).describe("Required. Day of the week.").optional(),
    }).describe("Represents a weekly schedule.").optional(),
  }).describe("Sets the time for recurring patch deployments.").optional(),
  rollout: z.object({
    disruptionBudget: z.object({
      fixed: z.number().int().describe("Specifies a fixed value.").optional(),
      percent: z.number().int().describe(
        "Specifies the relative value defined as a percentage, which will be multiplied by a reference value.",
      ).optional(),
    }).describe(
      'Message encapsulating a value that can be either absolute ("fixed") or relative ("percent") to a value.',
    ).optional(),
    mode: z.enum(["MODE_UNSPECIFIED", "ZONE_BY_ZONE", "CONCURRENT_ZONES"])
      .describe("Mode of the patch rollout.").optional(),
  }).describe(
    "Patch rollout configuration specifications. Contains details on the concurrency control when applying patch(es) to all targeted VMs.",
  ).optional(),
  patchDeploymentId: z.string().describe(
    "Required. A name for the patch deployment in the project. When creating a name the following rules apply: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the project.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  description: z.string().optional(),
  duration: z.string().optional(),
  instanceFilter: z.object({
    all: z.boolean(),
    groupLabels: z.array(z.object({
      labels: z.record(z.string(), z.unknown()),
    })),
    instanceNamePrefixes: z.array(z.string()),
    instances: z.array(z.string()),
    zones: z.array(z.string()),
  }).optional(),
  lastExecuteTime: z.string().optional(),
  name: z.string(),
  oneTimeSchedule: z.object({
    executeTime: z.string(),
  }).optional(),
  patchConfig: z.object({
    apt: z.object({
      excludes: z.array(z.string()),
      exclusivePackages: z.array(z.string()),
      type: z.string(),
    }),
    goo: z.object({}),
    migInstancesAllowed: z.boolean(),
    postStep: z.object({
      linuxExecStepConfig: z.object({
        allowedSuccessCodes: z.array(z.number()),
        gcsObject: z.object({
          bucket: z.string(),
          generationNumber: z.string(),
          object: z.string(),
        }),
        interpreter: z.string(),
        localPath: z.string(),
      }),
      windowsExecStepConfig: z.object({
        allowedSuccessCodes: z.array(z.number()),
        gcsObject: z.object({
          bucket: z.string(),
          generationNumber: z.string(),
          object: z.string(),
        }),
        interpreter: z.string(),
        localPath: z.string(),
      }),
    }),
    preStep: z.object({
      linuxExecStepConfig: z.object({
        allowedSuccessCodes: z.array(z.number()),
        gcsObject: z.object({
          bucket: z.string(),
          generationNumber: z.string(),
          object: z.string(),
        }),
        interpreter: z.string(),
        localPath: z.string(),
      }),
      windowsExecStepConfig: z.object({
        allowedSuccessCodes: z.array(z.number()),
        gcsObject: z.object({
          bucket: z.string(),
          generationNumber: z.string(),
          object: z.string(),
        }),
        interpreter: z.string(),
        localPath: z.string(),
      }),
    }),
    rebootConfig: z.string(),
    skipUnpatchableVms: z.boolean(),
    windowsUpdate: z.object({
      classifications: z.array(z.string()),
      excludes: z.array(z.string()),
      exclusivePatches: z.array(z.string()),
    }),
    yum: z.object({
      excludes: z.array(z.string()),
      exclusivePackages: z.array(z.string()),
      minimal: z.boolean(),
      security: z.boolean(),
    }),
    zypper: z.object({
      categories: z.array(z.string()),
      excludes: z.array(z.string()),
      exclusivePatches: z.array(z.string()),
      severities: z.array(z.string()),
      withOptional: z.boolean(),
      withUpdate: z.boolean(),
    }),
  }).optional(),
  recurringSchedule: z.object({
    endTime: z.string(),
    frequency: z.string(),
    lastExecuteTime: z.string(),
    monthly: z.object({
      monthDay: z.number(),
      weekDayOfMonth: z.object({
        dayOfWeek: z.string(),
        dayOffset: z.number(),
        weekOrdinal: z.number(),
      }),
    }),
    nextExecuteTime: z.string(),
    startTime: z.string(),
    timeOfDay: z.object({
      hours: z.number(),
      minutes: z.number(),
      nanos: z.number(),
      seconds: z.number(),
    }),
    timeZone: z.object({
      id: z.string(),
      version: z.string(),
    }),
    weekly: z.object({
      dayOfWeek: z.string(),
    }),
  }).optional(),
  rollout: z.object({
    disruptionBudget: z.object({
      fixed: z.number(),
      percent: z.number(),
    }),
    mode: z.string(),
  }).optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  description: z.string().describe(
    "Optional. Description of the patch deployment. Length of the description is limited to 1024 characters.",
  ).optional(),
  duration: z.string().describe(
    "Optional. Duration of the patch. After the duration ends, the patch times out.",
  ).optional(),
  instanceFilter: z.object({
    all: z.boolean().describe(
      "Target all VM instances in the project. If true, no other criteria is permitted.",
    ).optional(),
    groupLabels: z.array(z.object({
      labels: z.record(z.string(), z.string()).describe(
        "Compute Engine instance labels that must be present for a VM instance to be targeted by this filter.",
      ).optional(),
    })).describe(
      "Targets VM instances matching ANY of these GroupLabels. This allows targeting of disparate groups of VM instances.",
    ).optional(),
    instanceNamePrefixes: z.array(z.string()).describe(
      'Targets VMs whose name starts with one of these prefixes. Similar to labels, this is another way to group VMs when targeting configs, for example prefix="prod-".',
    ).optional(),
    instances: z.array(z.string()).describe(
      "Targets any of the VM instances specified. Instances are specified by their URI in the form `zones/[ZONE]/instances/[INSTANCE_NAME]`, `projects/[PROJECT_ID]/zones/[ZONE]/instances/[INSTANCE_NAME]`, or `https://www.googleapis.com/compute/v1/projects/[PROJECT_ID]/zones/[ZONE]/instances/[INSTANCE_NAME]`",
    ).optional(),
    zones: z.array(z.string()).describe(
      "Targets VM instances in ANY of these zones. Leave empty to target VM instances in any zone.",
    ).optional(),
  }).describe(
    "A filter to target VM instances for patching. The targeted VMs must meet all criteria specified. So if both labels and zones are specified, the patch job targets only VMs with those labels and in those zones.",
  ).optional(),
  name: z.string().describe(
    "Unique name for the patch deployment resource in a project. The patch deployment name is in the form: `projects/{project_id}/patchDeployments/{patch_deployment_id}`. This field is ignored when you create a new patch deployment.",
  ).optional(),
  oneTimeSchedule: z.object({
    executeTime: z.string().describe(
      "Required. The desired patch job execution time.",
    ).optional(),
  }).describe(
    "Sets the time for a one time patch deployment. Timestamp is in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format.",
  ).optional(),
  patchConfig: z.object({
    apt: z.object({
      excludes: z.array(z.string()).describe(
        "List of packages to exclude from update. These packages will be excluded",
      ).optional(),
      exclusivePackages: z.array(z.string()).describe(
        "An exclusive list of packages to be updated. These are the only packages that will be updated. If these packages are not installed, they will be ignored. This field cannot be specified with any other patch configuration fields.",
      ).optional(),
      type: z.enum(["TYPE_UNSPECIFIED", "DIST", "UPGRADE"]).describe(
        "By changing the type to DIST, the patching is performed using `apt-get dist-upgrade` instead.",
      ).optional(),
    }).describe(
      "Apt patching is completed by executing `apt-get update && apt-get upgrade`. Additional options can be set to control how this is executed.",
    ).optional(),
    goo: z.object({}).describe(
      "Googet patching is performed by running `googet update`.",
    ).optional(),
    migInstancesAllowed: z.boolean().describe(
      "Allows the patch job to run on Managed instance groups (MIGs).",
    ).optional(),
    postStep: z.object({
      linuxExecStepConfig: z.object({
        allowedSuccessCodes: z.array(z.number().int()).describe(
          "Defaults to [0]. A list of possible return values that the execution can return to indicate a success.",
        ).optional(),
        gcsObject: z.object({
          bucket: z.string().describe(
            "Required. Bucket of the Cloud Storage object.",
          ).optional(),
          generationNumber: z.string().describe(
            "Required. Generation number of the Cloud Storage object. This is used to ensure that the ExecStep specified by this PatchJob does not change.",
          ).optional(),
          object: z.string().describe(
            "Required. Name of the Cloud Storage object.",
          ).optional(),
        }).describe("Cloud Storage object representation.").optional(),
        interpreter: z.enum([
          "INTERPRETER_UNSPECIFIED",
          "NONE",
          "SHELL",
          "POWERSHELL",
        ]).describe(
          "The script interpreter to use to run the script. If no interpreter is specified the script will be executed directly, which will likely only succeed for scripts with [shebang lines] (https://en.wikipedia.org/wiki/Shebang_\\(Unix\\)).",
        ).optional(),
        localPath: z.string().describe(
          "An absolute path to the executable on the VM.",
        ).optional(),
      }).describe("Common configurations for an ExecStep.").optional(),
      windowsExecStepConfig: z.object({
        allowedSuccessCodes: z.array(z.number().int()).describe(
          "Defaults to [0]. A list of possible return values that the execution can return to indicate a success.",
        ).optional(),
        gcsObject: z.object({
          bucket: z.string().describe(
            "Required. Bucket of the Cloud Storage object.",
          ).optional(),
          generationNumber: z.string().describe(
            "Required. Generation number of the Cloud Storage object. This is used to ensure that the ExecStep specified by this PatchJob does not change.",
          ).optional(),
          object: z.string().describe(
            "Required. Name of the Cloud Storage object.",
          ).optional(),
        }).describe("Cloud Storage object representation.").optional(),
        interpreter: z.enum([
          "INTERPRETER_UNSPECIFIED",
          "NONE",
          "SHELL",
          "POWERSHELL",
        ]).describe(
          "The script interpreter to use to run the script. If no interpreter is specified the script will be executed directly, which will likely only succeed for scripts with [shebang lines] (https://en.wikipedia.org/wiki/Shebang_\\(Unix\\)).",
        ).optional(),
        localPath: z.string().describe(
          "An absolute path to the executable on the VM.",
        ).optional(),
      }).describe("Common configurations for an ExecStep.").optional(),
    }).describe("A step that runs an executable for a PatchJob.").optional(),
    preStep: z.object({
      linuxExecStepConfig: z.object({
        allowedSuccessCodes: z.array(z.number().int()).describe(
          "Defaults to [0]. A list of possible return values that the execution can return to indicate a success.",
        ).optional(),
        gcsObject: z.object({
          bucket: z.string().describe(
            "Required. Bucket of the Cloud Storage object.",
          ).optional(),
          generationNumber: z.string().describe(
            "Required. Generation number of the Cloud Storage object. This is used to ensure that the ExecStep specified by this PatchJob does not change.",
          ).optional(),
          object: z.string().describe(
            "Required. Name of the Cloud Storage object.",
          ).optional(),
        }).describe("Cloud Storage object representation.").optional(),
        interpreter: z.enum([
          "INTERPRETER_UNSPECIFIED",
          "NONE",
          "SHELL",
          "POWERSHELL",
        ]).describe(
          "The script interpreter to use to run the script. If no interpreter is specified the script will be executed directly, which will likely only succeed for scripts with [shebang lines] (https://en.wikipedia.org/wiki/Shebang_\\(Unix\\)).",
        ).optional(),
        localPath: z.string().describe(
          "An absolute path to the executable on the VM.",
        ).optional(),
      }).describe("Common configurations for an ExecStep.").optional(),
      windowsExecStepConfig: z.object({
        allowedSuccessCodes: z.array(z.number().int()).describe(
          "Defaults to [0]. A list of possible return values that the execution can return to indicate a success.",
        ).optional(),
        gcsObject: z.object({
          bucket: z.string().describe(
            "Required. Bucket of the Cloud Storage object.",
          ).optional(),
          generationNumber: z.string().describe(
            "Required. Generation number of the Cloud Storage object. This is used to ensure that the ExecStep specified by this PatchJob does not change.",
          ).optional(),
          object: z.string().describe(
            "Required. Name of the Cloud Storage object.",
          ).optional(),
        }).describe("Cloud Storage object representation.").optional(),
        interpreter: z.enum([
          "INTERPRETER_UNSPECIFIED",
          "NONE",
          "SHELL",
          "POWERSHELL",
        ]).describe(
          "The script interpreter to use to run the script. If no interpreter is specified the script will be executed directly, which will likely only succeed for scripts with [shebang lines] (https://en.wikipedia.org/wiki/Shebang_\\(Unix\\)).",
        ).optional(),
        localPath: z.string().describe(
          "An absolute path to the executable on the VM.",
        ).optional(),
      }).describe("Common configurations for an ExecStep.").optional(),
    }).describe("A step that runs an executable for a PatchJob.").optional(),
    rebootConfig: z.enum([
      "REBOOT_CONFIG_UNSPECIFIED",
      "DEFAULT",
      "ALWAYS",
      "NEVER",
    ]).describe("Post-patch reboot settings.").optional(),
    skipUnpatchableVms: z.boolean().describe(
      "Optional. Enables enhanced reporting for the patch job: 1. The patch job skips instances that cannot be patched and reports them as `SKIPPED`. An instance cannot be patched for two reasons: 1. The instance runs Container-Optimized OS (COS), which cannot be patched. 2. The instance is part of a managed instance group (MIG), and patching MIG instances is disabled in the patch job's configuration (PatchConfig.migInstancesAllowed is `false`). 2. The patch job is reported as `SUCCEEDED` if it completes without errors, even if some instances are `SKIPPED`. 3. The patch job is reported as `COMPLETED_WITH_INACTIVE_VMS` if it completes without errors, but does not patch instances that are `INACTIVE`.",
    ).optional(),
    windowsUpdate: z.object({
      classifications: z.array(
        z.enum([
          "CLASSIFICATION_UNSPECIFIED",
          "CRITICAL",
          "SECURITY",
          "DEFINITION",
          "DRIVER",
          "FEATURE_PACK",
          "SERVICE_PACK",
          "TOOL",
          "UPDATE_ROLLUP",
          "UPDATE",
        ]),
      ).describe(
        "Only apply updates of these windows update classifications. If empty, all updates are applied.",
      ).optional(),
      excludes: z.array(z.string()).describe(
        "List of KBs to exclude from update.",
      ).optional(),
      exclusivePatches: z.array(z.string()).describe(
        "An exclusive list of kbs to be updated. These are the only patches that will be updated. This field must not be used with other patch configurations.",
      ).optional(),
    }).describe("Windows patching is performed using the Windows Update Agent.")
      .optional(),
    yum: z.object({
      excludes: z.array(z.string()).describe(
        "List of packages to exclude from update. These packages are excluded by using the yum `--exclude` flag.",
      ).optional(),
      exclusivePackages: z.array(z.string()).describe(
        "An exclusive list of packages to be updated. These are the only packages that will be updated. If these packages are not installed, they will be ignored. This field must not be specified with any other patch configuration fields.",
      ).optional(),
      minimal: z.boolean().describe(
        "Will cause patch to run `yum update-minimal` instead.",
      ).optional(),
      security: z.boolean().describe(
        "Adds the `--security` flag to `yum update`. Not supported on all platforms.",
      ).optional(),
    }).describe(
      "Yum patching is performed by executing `yum update`. Additional options can be set to control how this is executed. Note that not all settings are supported on all platforms.",
    ).optional(),
    zypper: z.object({
      categories: z.array(z.string()).describe(
        "Install only patches with these categories. Common categories include security, recommended, and feature.",
      ).optional(),
      excludes: z.array(z.string()).describe(
        "List of patches to exclude from update.",
      ).optional(),
      exclusivePatches: z.array(z.string()).describe(
        "An exclusive list of patches to be updated. These are the only patches that will be installed using 'zypper patch patch:' command. This field must not be used with any other patch configuration fields.",
      ).optional(),
      severities: z.array(z.string()).describe(
        "Install only patches with these severities. Common severities include critical, important, moderate, and low.",
      ).optional(),
      withOptional: z.boolean().describe(
        "Adds the `--with-optional` flag to `zypper patch`.",
      ).optional(),
      withUpdate: z.boolean().describe(
        "Adds the `--with-update` flag, to `zypper patch`.",
      ).optional(),
    }).describe(
      "Zypper patching is performed by running `zypper patch`. See also https://en.opensuse.org/SDB:Zypper_manual.",
    ).optional(),
  }).describe(
    "Patch configuration specifications. Contains details on how to apply the patch(es) to a VM instance.",
  ).optional(),
  recurringSchedule: z.object({
    endTime: z.string().describe(
      "Optional. The end time at which a recurring patch deployment schedule is no longer active.",
    ).optional(),
    frequency: z.enum(["FREQUENCY_UNSPECIFIED", "WEEKLY", "MONTHLY", "DAILY"])
      .describe("Required. The frequency unit of this recurring schedule.")
      .optional(),
    lastExecuteTime: z.string().describe(
      "Output only. The time the last patch job ran successfully.",
    ).optional(),
    monthly: z.object({
      monthDay: z.number().int().describe(
        'Required. One day of the month. 1-31 indicates the 1st to the 31st day. -1 indicates the last day of the month. Months without the target day will be skipped. For example, a schedule to run "every month on the 31st" will not run in February, April, June, etc.',
      ).optional(),
      weekDayOfMonth: z.object({
        dayOfWeek: z.enum([
          "DAY_OF_WEEK_UNSPECIFIED",
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
          "SUNDAY",
        ]).describe("Required. A day of the week.").optional(),
        dayOffset: z.number().int().describe(
          "Optional. Represents the number of days before or after the given week day of month that the patch deployment is scheduled for. For example if `week_ordinal` and `day_of_week` values point to the second Tuesday of the month and the `day_offset` value is set to `3`, patch deployment takes place three days after the second Tuesday of the month. If this value is negative, for example -5, patches are deployed five days before the second Tuesday of the month. Allowed values are in range [-30, 30].",
        ).optional(),
        weekOrdinal: z.number().int().describe(
          "Required. Week number in a month. 1-4 indicates the 1st to 4th week of the month. -1 indicates the last week of the month.",
        ).optional(),
      }).describe(
        'Represents one week day in a month. An example is "the 4th Sunday".',
      ).optional(),
    }).describe(
      'Represents a monthly schedule. An example of a valid monthly schedule is "on the third Tuesday of the month" or "on the 15th of the month".',
    ).optional(),
    nextExecuteTime: z.string().describe(
      "Output only. The time the next patch job is scheduled to run.",
    ).optional(),
    startTime: z.string().describe(
      "Optional. The time that the recurring schedule becomes effective. Defaults to `create_time` of the patch deployment.",
    ).optional(),
    timeOfDay: z.object({
      hours: z.number().int().describe(
        'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
      ).optional(),
      minutes: z.number().int().describe(
        "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
      ).optional(),
      nanos: z.number().int().describe(
        "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
      ).optional(),
      seconds: z.number().int().describe(
        "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
      ).optional(),
    }).describe(
      "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
    ).optional(),
    timeZone: z.object({
      id: z.string().describe(
        'IANA Time Zone Database time zone. For example "America/New_York".',
      ).optional(),
      version: z.string().describe(
        'Optional. IANA Time Zone Database version number. For example "2019a".',
      ).optional(),
    }).describe(
      "Represents a time zone from the [IANA Time Zone Database](https://www.iana.org/time-zones).",
    ).optional(),
    weekly: z.object({
      dayOfWeek: z.enum([
        "DAY_OF_WEEK_UNSPECIFIED",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ]).describe("Required. Day of the week.").optional(),
    }).describe("Represents a weekly schedule.").optional(),
  }).describe("Sets the time for recurring patch deployments.").optional(),
  rollout: z.object({
    disruptionBudget: z.object({
      fixed: z.number().int().describe("Specifies a fixed value.").optional(),
      percent: z.number().int().describe(
        "Specifies the relative value defined as a percentage, which will be multiplied by a reference value.",
      ).optional(),
    }).describe(
      'Message encapsulating a value that can be either absolute ("fixed") or relative ("percent") to a value.',
    ).optional(),
    mode: z.enum(["MODE_UNSPECIFIED", "ZONE_BY_ZONE", "CONCURRENT_ZONES"])
      .describe("Mode of the patch rollout.").optional(),
  }).describe(
    "Patch rollout configuration specifications. Contains details on the concurrency control when applying patch(es) to all targeted VMs.",
  ).optional(),
  patchDeploymentId: z.string().describe(
    "Required. A name for the patch deployment in the project. When creating a name the following rules apply: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the project.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud OS Config PatchDeployments. Registered at `@swamp/gcp/osconfig/patchdeployments`. */
export const model = {
  type: "@swamp/gcp/osconfig/patchdeployments",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Patch deployments are configurations that individual patch jobs use to comple...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a patchDeployments",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["duration"] !== undefined) body["duration"] = g["duration"];
        if (g["instanceFilter"] !== undefined) {
          body["instanceFilter"] = g["instanceFilter"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["oneTimeSchedule"] !== undefined) {
          body["oneTimeSchedule"] = g["oneTimeSchedule"];
        }
        if (g["patchConfig"] !== undefined) {
          body["patchConfig"] = g["patchConfig"];
        }
        if (g["recurringSchedule"] !== undefined) {
          body["recurringSchedule"] = g["recurringSchedule"];
        }
        if (g["rollout"] !== undefined) body["rollout"] = g["rollout"];
        if (g["patchDeploymentId"] !== undefined) {
          body["patchDeploymentId"] = g["patchDeploymentId"];
        }
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
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
          credentials,
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
      description: "Get a patchDeployments",
      arguments: z.object({
        identifier: z.string().describe("The name of the patchDeployments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Update patchDeployments attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["duration"] !== undefined) body["duration"] = g["duration"];
        if (g["instanceFilter"] !== undefined) {
          body["instanceFilter"] = g["instanceFilter"];
        }
        if (g["oneTimeSchedule"] !== undefined) {
          body["oneTimeSchedule"] = g["oneTimeSchedule"];
        }
        if (g["patchConfig"] !== undefined) {
          body["patchConfig"] = g["patchConfig"];
        }
        if (g["recurringSchedule"] !== undefined) {
          body["recurringSchedule"] = g["recurringSchedule"];
        }
        if (g["rollout"] !== undefined) body["rollout"] = g["rollout"];
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
          credentials,
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
      description: "Delete the patchDeployments",
      arguments: z.object({
        identifier: z.string().describe("The name of the patchDeployments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
          credentials,
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
      description: "Sync patchDeployments state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            credentials,
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
      description: "List patchDeployments resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Optional. The maximum number of patch deployments to return. Default is 100.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          "patchDeployments",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
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
    pause: {
      description: "pause",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            "id": "osconfig.projects.patchDeployments.pause",
            "path": "v1/{+name}:pause",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    resume: {
      description: "resume",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            "id": "osconfig.projects.patchDeployments.resume",
            "path": "v1/{+name}:resume",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
