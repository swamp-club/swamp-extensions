// Auto-generated extension model for @swamp/gcp/clouddeploy/deliverypipelines-automations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Deploy DeliveryPipelines.Automations.
 *
 * An `Automation` resource in the Cloud Deploy API. An `Automation` enables the automation of manually driven actions for a Delivery Pipeline, which includes Release promotion among Targets, Rollout repair and Rollout deployment strategy advancement. The intention of Automation is to reduce manual intervention in the continuous delivery process.
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
  return `${parent}/automations/${shortName}`;
}

const BASE_URL = "https://clouddeploy.googleapis.com/";

const GET_CONFIG = {
  "id": "clouddeploy.projects.locations.deliveryPipelines.automations.get",
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
  "id": "clouddeploy.projects.locations.deliveryPipelines.automations.create",
  "path": "v1/{+parent}/automations",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "automationId": {
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
  "id": "clouddeploy.projects.locations.deliveryPipelines.automations.patch",
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
  "id": "clouddeploy.projects.locations.deliveryPipelines.automations.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. User annotations. These attributes can only be set and used by the user, and not by Cloud Deploy. Annotations must meet the following constraints: * Annotations are key/value pairs. * Valid annotation keys have two segments: an optional prefix and name, separated by a slash (`/`). * The name segment is required and must be 63 characters or less, beginning and ending with an alphanumeric character (`[a-z0-9A-Z]`) with dashes (`-`), underscores (`_`), dots (`.`), and alphanumerics between. * The prefix is optional. If specified, the prefix must be a DNS subdomain: a series of DNS labels separated by dots(`.`), not longer than 253 characters in total, followed by a slash (`/`). See https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/#syntax-and-character-set for more details.",
  ).optional(),
  description: z.string().describe(
    "Optional. Description of the `Automation`. Max length is 255 characters.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels are attributes that can be set and used by both the user and by Cloud Deploy. Labels must meet the following constraints: * Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. * All characters must use UTF-8 encoding, and international characters are allowed. * Keys must start with a lowercase letter or international character. * Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 63 characters.",
  ).optional(),
  rules: z.array(z.object({
    advanceRolloutRule: z.object({
      condition: z.object({
        targetsPresentCondition: z.object({
          missingTargets: z.unknown().describe(
            "The list of Target names that do not exist. For example, `projects/{project_id}/locations/{location_name}/targets/{target_name}`.",
          ).optional(),
          status: z.unknown().describe(
            "True if there aren't any missing Targets.",
          ).optional(),
          updateTime: z.unknown().describe(
            "Last time the condition was updated.",
          ).optional(),
        }).describe(
          "`TargetsPresentCondition` contains information on any Targets referenced in the Delivery Pipeline that do not actually exist.",
        ).optional(),
        timedPromoteReleaseCondition: z.object({
          nextPromotionTime: z.unknown().describe(
            "Output only. When the next scheduled promotion(s) will occur.",
          ).optional(),
          targetsList: z.unknown().describe(
            "Output only. A list of targets involved in the upcoming timed promotion(s).",
          ).optional(),
        }).describe(
          "`TimedPromoteReleaseCondition` contains conditions specific to an Automation with a Timed Promote Release rule defined.",
        ).optional(),
      }).describe(
        "`AutomationRuleCondition` contains conditions relevant to an `Automation` rule.",
      ).optional(),
      id: z.string().describe(
        "Required. ID of the rule. This id must be unique in the `Automation` resource to which this rule belongs. The format is `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`.",
      ).optional(),
      sourcePhases: z.array(z.string()).describe(
        "Optional. Proceeds only after phase name matched any one in the list. This value must consist of lower-case letters, numbers, and hyphens, start with a letter and end with a letter or a number, and have a max length of 63 characters. In other words, it must match the following regex: `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`.",
      ).optional(),
      wait: z.string().describe(
        "Optional. How long to wait after a rollout is finished.",
      ).optional(),
    }).describe(
      "The `AdvanceRollout` automation rule will automatically advance a successful Rollout to the next phase.",
    ).optional(),
    promoteReleaseRule: z.object({
      condition: z.object({
        targetsPresentCondition: z.object({
          missingTargets: z.unknown().describe(
            "The list of Target names that do not exist. For example, `projects/{project_id}/locations/{location_name}/targets/{target_name}`.",
          ).optional(),
          status: z.unknown().describe(
            "True if there aren't any missing Targets.",
          ).optional(),
          updateTime: z.unknown().describe(
            "Last time the condition was updated.",
          ).optional(),
        }).describe(
          "`TargetsPresentCondition` contains information on any Targets referenced in the Delivery Pipeline that do not actually exist.",
        ).optional(),
        timedPromoteReleaseCondition: z.object({
          nextPromotionTime: z.unknown().describe(
            "Output only. When the next scheduled promotion(s) will occur.",
          ).optional(),
          targetsList: z.unknown().describe(
            "Output only. A list of targets involved in the upcoming timed promotion(s).",
          ).optional(),
        }).describe(
          "`TimedPromoteReleaseCondition` contains conditions specific to an Automation with a Timed Promote Release rule defined.",
        ).optional(),
      }).describe(
        "`AutomationRuleCondition` contains conditions relevant to an `Automation` rule.",
      ).optional(),
      destinationPhase: z.string().describe(
        "Optional. The starting phase of the rollout created by this operation. Default to the first phase.",
      ).optional(),
      destinationTargetId: z.string().describe(
        'Optional. The ID of the stage in the pipeline to which this `Release` is deploying. If unspecified, default it to the next stage in the promotion flow. The value of this field could be one of the following: * The last segment of a target name * "@next", the next target in the promotion sequence',
      ).optional(),
      id: z.string().describe(
        "Required. ID of the rule. This id must be unique in the `Automation` resource to which this rule belongs. The format is `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`.",
      ).optional(),
      wait: z.string().describe(
        "Optional. How long the release need to be paused until being promoted to the next target.",
      ).optional(),
    }).describe(
      "The `PromoteRelease` rule will automatically promote a release from the current target to a specified target.",
    ).optional(),
    repairRolloutRule: z.object({
      condition: z.object({
        targetsPresentCondition: z.object({
          missingTargets: z.unknown().describe(
            "The list of Target names that do not exist. For example, `projects/{project_id}/locations/{location_name}/targets/{target_name}`.",
          ).optional(),
          status: z.unknown().describe(
            "True if there aren't any missing Targets.",
          ).optional(),
          updateTime: z.unknown().describe(
            "Last time the condition was updated.",
          ).optional(),
        }).describe(
          "`TargetsPresentCondition` contains information on any Targets referenced in the Delivery Pipeline that do not actually exist.",
        ).optional(),
        timedPromoteReleaseCondition: z.object({
          nextPromotionTime: z.unknown().describe(
            "Output only. When the next scheduled promotion(s) will occur.",
          ).optional(),
          targetsList: z.unknown().describe(
            "Output only. A list of targets involved in the upcoming timed promotion(s).",
          ).optional(),
        }).describe(
          "`TimedPromoteReleaseCondition` contains conditions specific to an Automation with a Timed Promote Release rule defined.",
        ).optional(),
      }).describe(
        "`AutomationRuleCondition` contains conditions relevant to an `Automation` rule.",
      ).optional(),
      id: z.string().describe(
        "Required. ID of the rule. This id must be unique in the `Automation` resource to which this rule belongs. The format is `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`.",
      ).optional(),
      jobs: z.array(z.string()).describe(
        "Optional. Jobs to repair. Proceeds only after job name matched any one in the list, or for all jobs if unspecified or empty. The phase that includes the job must match the phase ID specified in `source_phase`. This value must consist of lower-case letters, numbers, and hyphens, start with a letter and end with a letter or a number, and have a max length of 63 characters. In other words, it must match the following regex: `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`.",
      ).optional(),
      phases: z.array(z.string()).describe(
        "Optional. Phases within which jobs are subject to automatic repair actions on failure. Proceeds only after phase name matched any one in the list, or for all phases if unspecified. This value must consist of lower-case letters, numbers, and hyphens, start with a letter and end with a letter or a number, and have a max length of 63 characters. In other words, it must match the following regex: `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`.",
      ).optional(),
      repairPhases: z.array(z.object({
        retry: z.unknown().describe("Retries the failed job.").optional(),
        rollback: z.unknown().describe("Rolls back a `Rollout`.").optional(),
      })).describe(
        "Required. Defines the types of automatic repair phases for failed jobs.",
      ).optional(),
    }).describe(
      "The `RepairRolloutRule` automation rule will automatically repair a failed `Rollout`.",
    ).optional(),
    timedPromoteReleaseRule: z.object({
      condition: z.object({
        targetsPresentCondition: z.object({
          missingTargets: z.unknown().describe(
            "The list of Target names that do not exist. For example, `projects/{project_id}/locations/{location_name}/targets/{target_name}`.",
          ).optional(),
          status: z.unknown().describe(
            "True if there aren't any missing Targets.",
          ).optional(),
          updateTime: z.unknown().describe(
            "Last time the condition was updated.",
          ).optional(),
        }).describe(
          "`TargetsPresentCondition` contains information on any Targets referenced in the Delivery Pipeline that do not actually exist.",
        ).optional(),
        timedPromoteReleaseCondition: z.object({
          nextPromotionTime: z.unknown().describe(
            "Output only. When the next scheduled promotion(s) will occur.",
          ).optional(),
          targetsList: z.unknown().describe(
            "Output only. A list of targets involved in the upcoming timed promotion(s).",
          ).optional(),
        }).describe(
          "`TimedPromoteReleaseCondition` contains conditions specific to an Automation with a Timed Promote Release rule defined.",
        ).optional(),
      }).describe(
        "`AutomationRuleCondition` contains conditions relevant to an `Automation` rule.",
      ).optional(),
      destinationPhase: z.string().describe(
        "Optional. The starting phase of the rollout created by this rule. Default to the first phase.",
      ).optional(),
      destinationTargetId: z.string().describe(
        'Optional. The ID of the stage in the pipeline to which this `Release` is deploying. If unspecified, default it to the next stage in the promotion flow. The value of this field could be one of the following: * The last segment of a target name * "@next", the next target in the promotion sequence',
      ).optional(),
      id: z.string().describe(
        "Required. ID of the rule. This ID must be unique in the `Automation` resource to which this rule belongs. The format is `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`.",
      ).optional(),
      schedule: z.string().describe(
        'Required. Schedule in crontab format. e.g. "0 9 * * 1" for every Monday at 9am.',
      ).optional(),
      timeZone: z.string().describe(
        "Required. The time zone in IANA format [IANA Time Zone Database](https://www.iana.org/time-zones) (e.g. America/New_York).",
      ).optional(),
    }).describe(
      "The `TimedPromoteReleaseRule` will automatically promote a release from the current target(s) to the specified target(s) on a configured schedule.",
    ).optional(),
  })).describe(
    "Required. List of Automation rules associated with the Automation resource. Must have at least one rule and limited to 250 rules per Delivery Pipeline. Note: the order of the rules here is not the same as the order of execution.",
  ).optional(),
  selector: z.object({
    targets: z.array(z.object({
      id: z.string().describe(
        'Optional. ID of the `Target`. The value of this field could be one of the following: * The last segment of a target name * "*", all targets in a location',
      ).optional(),
      labels: z.record(z.string(), z.string()).describe("Target labels.")
        .optional(),
    })).describe("Optional. Contains attributes about a target.").optional(),
  }).describe(
    "AutomationResourceSelector contains the information to select the resources to which an Automation is going to be applied.",
  ).optional(),
  serviceAccount: z.string().describe(
    "Required. Email address of the user-managed IAM service account that creates Cloud Deploy release and rollout resources.",
  ).optional(),
  suspended: z.boolean().describe(
    "Optional. When Suspended, automation is deactivated from execution.",
  ).optional(),
  automationId: z.string().describe("Required. ID of the `Automation`.")
    .optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  etag: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  rules: z.array(z.object({
    advanceRolloutRule: z.object({
      condition: z.object({
        targetsPresentCondition: z.object({
          missingTargets: z.unknown(),
          status: z.unknown(),
          updateTime: z.unknown(),
        }),
        timedPromoteReleaseCondition: z.object({
          nextPromotionTime: z.unknown(),
          targetsList: z.unknown(),
        }),
      }),
      id: z.string(),
      sourcePhases: z.array(z.string()),
      wait: z.string(),
    }),
    promoteReleaseRule: z.object({
      condition: z.object({
        targetsPresentCondition: z.object({
          missingTargets: z.unknown(),
          status: z.unknown(),
          updateTime: z.unknown(),
        }),
        timedPromoteReleaseCondition: z.object({
          nextPromotionTime: z.unknown(),
          targetsList: z.unknown(),
        }),
      }),
      destinationPhase: z.string(),
      destinationTargetId: z.string(),
      id: z.string(),
      wait: z.string(),
    }),
    repairRolloutRule: z.object({
      condition: z.object({
        targetsPresentCondition: z.object({
          missingTargets: z.unknown(),
          status: z.unknown(),
          updateTime: z.unknown(),
        }),
        timedPromoteReleaseCondition: z.object({
          nextPromotionTime: z.unknown(),
          targetsList: z.unknown(),
        }),
      }),
      id: z.string(),
      jobs: z.array(z.string()),
      phases: z.array(z.string()),
      repairPhases: z.array(z.object({
        retry: z.unknown(),
        rollback: z.unknown(),
      })),
    }),
    timedPromoteReleaseRule: z.object({
      condition: z.object({
        targetsPresentCondition: z.object({
          missingTargets: z.unknown(),
          status: z.unknown(),
          updateTime: z.unknown(),
        }),
        timedPromoteReleaseCondition: z.object({
          nextPromotionTime: z.unknown(),
          targetsList: z.unknown(),
        }),
      }),
      destinationPhase: z.string(),
      destinationTargetId: z.string(),
      id: z.string(),
      schedule: z.string(),
      timeZone: z.string(),
    }),
  })).optional(),
  selector: z.object({
    targets: z.array(z.object({
      id: z.string(),
      labels: z.record(z.string(), z.unknown()),
    })),
  }).optional(),
  serviceAccount: z.string().optional(),
  suspended: z.boolean().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. User annotations. These attributes can only be set and used by the user, and not by Cloud Deploy. Annotations must meet the following constraints: * Annotations are key/value pairs. * Valid annotation keys have two segments: an optional prefix and name, separated by a slash (`/`). * The name segment is required and must be 63 characters or less, beginning and ending with an alphanumeric character (`[a-z0-9A-Z]`) with dashes (`-`), underscores (`_`), dots (`.`), and alphanumerics between. * The prefix is optional. If specified, the prefix must be a DNS subdomain: a series of DNS labels separated by dots(`.`), not longer than 253 characters in total, followed by a slash (`/`). See https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/#syntax-and-character-set for more details.",
  ).optional(),
  description: z.string().describe(
    "Optional. Description of the `Automation`. Max length is 255 characters.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels are attributes that can be set and used by both the user and by Cloud Deploy. Labels must meet the following constraints: * Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. * All characters must use UTF-8 encoding, and international characters are allowed. * Keys must start with a lowercase letter or international character. * Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 63 characters.",
  ).optional(),
  rules: z.array(z.object({
    advanceRolloutRule: z.object({
      condition: z.object({
        targetsPresentCondition: z.object({
          missingTargets: z.unknown().describe(
            "The list of Target names that do not exist. For example, `projects/{project_id}/locations/{location_name}/targets/{target_name}`.",
          ).optional(),
          status: z.unknown().describe(
            "True if there aren't any missing Targets.",
          ).optional(),
          updateTime: z.unknown().describe(
            "Last time the condition was updated.",
          ).optional(),
        }).describe(
          "`TargetsPresentCondition` contains information on any Targets referenced in the Delivery Pipeline that do not actually exist.",
        ).optional(),
        timedPromoteReleaseCondition: z.object({
          nextPromotionTime: z.unknown().describe(
            "Output only. When the next scheduled promotion(s) will occur.",
          ).optional(),
          targetsList: z.unknown().describe(
            "Output only. A list of targets involved in the upcoming timed promotion(s).",
          ).optional(),
        }).describe(
          "`TimedPromoteReleaseCondition` contains conditions specific to an Automation with a Timed Promote Release rule defined.",
        ).optional(),
      }).describe(
        "`AutomationRuleCondition` contains conditions relevant to an `Automation` rule.",
      ).optional(),
      id: z.string().describe(
        "Required. ID of the rule. This id must be unique in the `Automation` resource to which this rule belongs. The format is `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`.",
      ).optional(),
      sourcePhases: z.array(z.string()).describe(
        "Optional. Proceeds only after phase name matched any one in the list. This value must consist of lower-case letters, numbers, and hyphens, start with a letter and end with a letter or a number, and have a max length of 63 characters. In other words, it must match the following regex: `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`.",
      ).optional(),
      wait: z.string().describe(
        "Optional. How long to wait after a rollout is finished.",
      ).optional(),
    }).describe(
      "The `AdvanceRollout` automation rule will automatically advance a successful Rollout to the next phase.",
    ).optional(),
    promoteReleaseRule: z.object({
      condition: z.object({
        targetsPresentCondition: z.object({
          missingTargets: z.unknown().describe(
            "The list of Target names that do not exist. For example, `projects/{project_id}/locations/{location_name}/targets/{target_name}`.",
          ).optional(),
          status: z.unknown().describe(
            "True if there aren't any missing Targets.",
          ).optional(),
          updateTime: z.unknown().describe(
            "Last time the condition was updated.",
          ).optional(),
        }).describe(
          "`TargetsPresentCondition` contains information on any Targets referenced in the Delivery Pipeline that do not actually exist.",
        ).optional(),
        timedPromoteReleaseCondition: z.object({
          nextPromotionTime: z.unknown().describe(
            "Output only. When the next scheduled promotion(s) will occur.",
          ).optional(),
          targetsList: z.unknown().describe(
            "Output only. A list of targets involved in the upcoming timed promotion(s).",
          ).optional(),
        }).describe(
          "`TimedPromoteReleaseCondition` contains conditions specific to an Automation with a Timed Promote Release rule defined.",
        ).optional(),
      }).describe(
        "`AutomationRuleCondition` contains conditions relevant to an `Automation` rule.",
      ).optional(),
      destinationPhase: z.string().describe(
        "Optional. The starting phase of the rollout created by this operation. Default to the first phase.",
      ).optional(),
      destinationTargetId: z.string().describe(
        'Optional. The ID of the stage in the pipeline to which this `Release` is deploying. If unspecified, default it to the next stage in the promotion flow. The value of this field could be one of the following: * The last segment of a target name * "@next", the next target in the promotion sequence',
      ).optional(),
      id: z.string().describe(
        "Required. ID of the rule. This id must be unique in the `Automation` resource to which this rule belongs. The format is `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`.",
      ).optional(),
      wait: z.string().describe(
        "Optional. How long the release need to be paused until being promoted to the next target.",
      ).optional(),
    }).describe(
      "The `PromoteRelease` rule will automatically promote a release from the current target to a specified target.",
    ).optional(),
    repairRolloutRule: z.object({
      condition: z.object({
        targetsPresentCondition: z.object({
          missingTargets: z.unknown().describe(
            "The list of Target names that do not exist. For example, `projects/{project_id}/locations/{location_name}/targets/{target_name}`.",
          ).optional(),
          status: z.unknown().describe(
            "True if there aren't any missing Targets.",
          ).optional(),
          updateTime: z.unknown().describe(
            "Last time the condition was updated.",
          ).optional(),
        }).describe(
          "`TargetsPresentCondition` contains information on any Targets referenced in the Delivery Pipeline that do not actually exist.",
        ).optional(),
        timedPromoteReleaseCondition: z.object({
          nextPromotionTime: z.unknown().describe(
            "Output only. When the next scheduled promotion(s) will occur.",
          ).optional(),
          targetsList: z.unknown().describe(
            "Output only. A list of targets involved in the upcoming timed promotion(s).",
          ).optional(),
        }).describe(
          "`TimedPromoteReleaseCondition` contains conditions specific to an Automation with a Timed Promote Release rule defined.",
        ).optional(),
      }).describe(
        "`AutomationRuleCondition` contains conditions relevant to an `Automation` rule.",
      ).optional(),
      id: z.string().describe(
        "Required. ID of the rule. This id must be unique in the `Automation` resource to which this rule belongs. The format is `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`.",
      ).optional(),
      jobs: z.array(z.string()).describe(
        "Optional. Jobs to repair. Proceeds only after job name matched any one in the list, or for all jobs if unspecified or empty. The phase that includes the job must match the phase ID specified in `source_phase`. This value must consist of lower-case letters, numbers, and hyphens, start with a letter and end with a letter or a number, and have a max length of 63 characters. In other words, it must match the following regex: `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`.",
      ).optional(),
      phases: z.array(z.string()).describe(
        "Optional. Phases within which jobs are subject to automatic repair actions on failure. Proceeds only after phase name matched any one in the list, or for all phases if unspecified. This value must consist of lower-case letters, numbers, and hyphens, start with a letter and end with a letter or a number, and have a max length of 63 characters. In other words, it must match the following regex: `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`.",
      ).optional(),
      repairPhases: z.array(z.object({
        retry: z.unknown().describe("Retries the failed job.").optional(),
        rollback: z.unknown().describe("Rolls back a `Rollout`.").optional(),
      })).describe(
        "Required. Defines the types of automatic repair phases for failed jobs.",
      ).optional(),
    }).describe(
      "The `RepairRolloutRule` automation rule will automatically repair a failed `Rollout`.",
    ).optional(),
    timedPromoteReleaseRule: z.object({
      condition: z.object({
        targetsPresentCondition: z.object({
          missingTargets: z.unknown().describe(
            "The list of Target names that do not exist. For example, `projects/{project_id}/locations/{location_name}/targets/{target_name}`.",
          ).optional(),
          status: z.unknown().describe(
            "True if there aren't any missing Targets.",
          ).optional(),
          updateTime: z.unknown().describe(
            "Last time the condition was updated.",
          ).optional(),
        }).describe(
          "`TargetsPresentCondition` contains information on any Targets referenced in the Delivery Pipeline that do not actually exist.",
        ).optional(),
        timedPromoteReleaseCondition: z.object({
          nextPromotionTime: z.unknown().describe(
            "Output only. When the next scheduled promotion(s) will occur.",
          ).optional(),
          targetsList: z.unknown().describe(
            "Output only. A list of targets involved in the upcoming timed promotion(s).",
          ).optional(),
        }).describe(
          "`TimedPromoteReleaseCondition` contains conditions specific to an Automation with a Timed Promote Release rule defined.",
        ).optional(),
      }).describe(
        "`AutomationRuleCondition` contains conditions relevant to an `Automation` rule.",
      ).optional(),
      destinationPhase: z.string().describe(
        "Optional. The starting phase of the rollout created by this rule. Default to the first phase.",
      ).optional(),
      destinationTargetId: z.string().describe(
        'Optional. The ID of the stage in the pipeline to which this `Release` is deploying. If unspecified, default it to the next stage in the promotion flow. The value of this field could be one of the following: * The last segment of a target name * "@next", the next target in the promotion sequence',
      ).optional(),
      id: z.string().describe(
        "Required. ID of the rule. This ID must be unique in the `Automation` resource to which this rule belongs. The format is `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`.",
      ).optional(),
      schedule: z.string().describe(
        'Required. Schedule in crontab format. e.g. "0 9 * * 1" for every Monday at 9am.',
      ).optional(),
      timeZone: z.string().describe(
        "Required. The time zone in IANA format [IANA Time Zone Database](https://www.iana.org/time-zones) (e.g. America/New_York).",
      ).optional(),
    }).describe(
      "The `TimedPromoteReleaseRule` will automatically promote a release from the current target(s) to the specified target(s) on a configured schedule.",
    ).optional(),
  })).describe(
    "Required. List of Automation rules associated with the Automation resource. Must have at least one rule and limited to 250 rules per Delivery Pipeline. Note: the order of the rules here is not the same as the order of execution.",
  ).optional(),
  selector: z.object({
    targets: z.array(z.object({
      id: z.string().describe(
        'Optional. ID of the `Target`. The value of this field could be one of the following: * The last segment of a target name * "*", all targets in a location',
      ).optional(),
      labels: z.record(z.string(), z.string()).describe("Target labels.")
        .optional(),
    })).describe("Optional. Contains attributes about a target.").optional(),
  }).describe(
    "AutomationResourceSelector contains the information to select the resources to which an Automation is going to be applied.",
  ).optional(),
  serviceAccount: z.string().describe(
    "Required. Email address of the user-managed IAM service account that creates Cloud Deploy release and rollout resources.",
  ).optional(),
  suspended: z.boolean().describe(
    "Optional. When Suspended, automation is deactivated from execution.",
  ).optional(),
  automationId: z.string().describe("Required. ID of the `Automation`.")
    .optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Deploy DeliveryPipelines.Automations. Registered at `@swamp/gcp/clouddeploy/deliverypipelines-automations`. */
export const model = {
  type: "@swamp/gcp/clouddeploy/deliverypipelines-automations",
  version: "2026.05.19.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An `Automation` resource in the Cloud Deploy API. An `Automation` enables the...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a automations",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["rules"] !== undefined) body["rules"] = g["rules"];
        if (g["selector"] !== undefined) body["selector"] = g["selector"];
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["suspended"] !== undefined) body["suspended"] = g["suspended"];
        if (g["automationId"] !== undefined) {
          body["automationId"] = g["automationId"];
        }
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
      description: "Get a automations",
      arguments: z.object({
        identifier: z.string().describe("The name of the automations"),
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
      description: "Update automations attributes",
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
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["rules"] !== undefined) body["rules"] = g["rules"];
        if (g["selector"] !== undefined) body["selector"] = g["selector"];
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["suspended"] !== undefined) body["suspended"] = g["suspended"];
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
      description: "Delete the automations",
      arguments: z.object({
        identifier: z.string().describe("The name of the automations"),
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
      description: "Sync automations state from GCP",
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
  },
};
