// Auto-generated extension model for @swamp/gcp/gkebackup/restoreplans-restores
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Backup for GKE RestorePlans.Restores.
 *
 * Represents both a request to Restore some portion of a Backup into a target GKE cluster and a record of the restore operation itself.
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
  return `${parent}/restores/${shortName}`;
}

const BASE_URL = "https://gkebackup.googleapis.com/";

const GET_CONFIG = {
  "id": "gkebackup.projects.locations.restorePlans.restores.get",
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
  "id": "gkebackup.projects.locations.restorePlans.restores.create",
  "path": "v1/{+parent}/restores",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "restoreId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "gkebackup.projects.locations.restorePlans.restores.patch",
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
  "id": "gkebackup.projects.locations.restorePlans.restores.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
    "force": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "gkebackup.projects.locations.restorePlans.restores.list",
  "path": "v1/{+parent}/restores",
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
  backup: z.string().describe(
    "Required. Immutable. A reference to the Backup used as the source from which this Restore will restore. Note that this Backup must be a sub-resource of the RestorePlan's backup_plan. Format: `projects/*/locations/*/backupPlans/*/backups/*`.",
  ).optional(),
  description: z.string().describe(
    "Optional. User specified descriptive string for this Restore.",
  ).optional(),
  filter: z.object({
    exclusionFilters: z.array(z.object({
      groupKind: z.object({
        resourceGroup: z.string().describe(
          'Optional. API group string of a Kubernetes resource, e.g. "apiextensions.k8s.io", "storage.k8s.io", etc. Note: use empty string for core API group.',
        ).optional(),
        resourceKind: z.string().describe(
          'Optional. Kind of a Kubernetes resource, must be in UpperCamelCase (PascalCase) and singular form. E.g. "CustomResourceDefinition", "StorageClass", etc.',
        ).optional(),
      }).describe(
        'This is a direct map to the Kubernetes GroupKind type [GroupKind](https://godoc.org/k8s.io/apimachinery/pkg/runtime/schema#GroupKind) and is used for identifying specific "types" of resources to restore.',
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Optional. Selects resources using Kubernetes [labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/). If specified, a resource will be selected if and only if the resource has all of the provided labels and all the label values match.",
      ).optional(),
      name: z.string().describe(
        "Optional. Selects resources using their resource names. If specified, only resources with the provided name will be selected.",
      ).optional(),
      namespace: z.string().describe(
        "Optional. Selects resources using their namespaces. This only applies to namespace scoped resources and cannot be used for selecting cluster scoped resources. If specified, only resources in the provided namespace will be selected. If not specified, the filter will apply to both cluster scoped and namespace scoped resources (e.g. name or label). The [Namespace](https://pkg.go.dev/k8s.io/api/core/v1#Namespace) resource itself will be restored if and only if any resources within the namespace are restored.",
      ).optional(),
    })).describe(
      "Optional. Excludes resources from restoration. If specified, a resource will not be restored if it matches any `ResourceSelector` of the `exclusion_filters`.",
    ).optional(),
    inclusionFilters: z.array(z.object({
      groupKind: z.object({
        resourceGroup: z.string().describe(
          'Optional. API group string of a Kubernetes resource, e.g. "apiextensions.k8s.io", "storage.k8s.io", etc. Note: use empty string for core API group.',
        ).optional(),
        resourceKind: z.string().describe(
          'Optional. Kind of a Kubernetes resource, must be in UpperCamelCase (PascalCase) and singular form. E.g. "CustomResourceDefinition", "StorageClass", etc.',
        ).optional(),
      }).describe(
        'This is a direct map to the Kubernetes GroupKind type [GroupKind](https://godoc.org/k8s.io/apimachinery/pkg/runtime/schema#GroupKind) and is used for identifying specific "types" of resources to restore.',
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Optional. Selects resources using Kubernetes [labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/). If specified, a resource will be selected if and only if the resource has all of the provided labels and all the label values match.",
      ).optional(),
      name: z.string().describe(
        "Optional. Selects resources using their resource names. If specified, only resources with the provided name will be selected.",
      ).optional(),
      namespace: z.string().describe(
        "Optional. Selects resources using their namespaces. This only applies to namespace scoped resources and cannot be used for selecting cluster scoped resources. If specified, only resources in the provided namespace will be selected. If not specified, the filter will apply to both cluster scoped and namespace scoped resources (e.g. name or label). The [Namespace](https://pkg.go.dev/k8s.io/api/core/v1#Namespace) resource itself will be restored if and only if any resources within the namespace are restored.",
      ).optional(),
    })).describe(
      "Optional. Selects resources for restoration. If specified, only resources which match `inclusion_filters` will be selected for restoration. A resource will be selected if it matches any `ResourceSelector` of the `inclusion_filters`.",
    ).optional(),
  }).describe(
    "Defines the filter for `Restore`. This filter can be used to further refine the resource selection of the `Restore` beyond the coarse-grained scope defined in the `RestorePlan`. `exclusion_filters` take precedence over `inclusion_filters`. If a resource matches both `inclusion_filters` and `exclusion_filters`, it will not be restored.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "A set of custom labels supplied by user.",
  ).optional(),
  restoreConfig: z.object({
    allNamespaces: z.boolean().describe(
      'Restore all namespaced resources in the Backup if set to "True". Specifying this field to "False" is an error.',
    ).optional(),
    clusterResourceConflictPolicy: z.enum([
      "CLUSTER_RESOURCE_CONFLICT_POLICY_UNSPECIFIED",
      "USE_EXISTING_VERSION",
      "USE_BACKUP_VERSION",
    ]).describe(
      "Optional. Defines the behavior for handling the situation where cluster-scoped resources being restored already exist in the target cluster. This MUST be set to a value other than CLUSTER_RESOURCE_CONFLICT_POLICY_UNSPECIFIED if cluster_resource_restore_scope is not empty.",
    ).optional(),
    clusterResourceRestoreScope: z.object({
      allGroupKinds: z.boolean().describe(
        "Optional. If True, all valid cluster-scoped resources will be restored. Mutually exclusive to any other field in the message.",
      ).optional(),
      excludedGroupKinds: z.array(z.object({
        resourceGroup: z.string().describe(
          'Optional. API group string of a Kubernetes resource, e.g. "apiextensions.k8s.io", "storage.k8s.io", etc. Note: use empty string for core API group.',
        ).optional(),
        resourceKind: z.string().describe(
          'Optional. Kind of a Kubernetes resource, must be in UpperCamelCase (PascalCase) and singular form. E.g. "CustomResourceDefinition", "StorageClass", etc.',
        ).optional(),
      })).describe(
        "Optional. A list of cluster-scoped resource group kinds to NOT restore from the backup. If specified, all valid cluster-scoped resources will be restored except for those specified in the list. Mutually exclusive to any other field in the message.",
      ).optional(),
      noGroupKinds: z.boolean().describe(
        "Optional. If True, no cluster-scoped resources will be restored. This has the same restore scope as if the message is not defined. Mutually exclusive to any other field in the message.",
      ).optional(),
      selectedGroupKinds: z.array(z.object({
        resourceGroup: z.string().describe(
          'Optional. API group string of a Kubernetes resource, e.g. "apiextensions.k8s.io", "storage.k8s.io", etc. Note: use empty string for core API group.',
        ).optional(),
        resourceKind: z.string().describe(
          'Optional. Kind of a Kubernetes resource, must be in UpperCamelCase (PascalCase) and singular form. E.g. "CustomResourceDefinition", "StorageClass", etc.',
        ).optional(),
      })).describe(
        "Optional. A list of cluster-scoped resource group kinds to restore from the backup. If specified, only the selected resources will be restored. Mutually exclusive to any other field in the message.",
      ).optional(),
    }).describe(
      'Defines the scope of cluster-scoped resources to restore. Some group kinds are not reasonable choices for a restore, and will cause an error if selected here. Any scope selection that would restore "all valid" resources automatically excludes these group kinds. - Node - ComponentStatus - gkebackup.gke.io/BackupJob - gkebackup.gke.io/RestoreJob - metrics.k8s.io/NodeMetrics - migration.k8s.io/StorageState - migration.k8s.io/StorageVersionMigration - snapshot.storage.k8s.io/VolumeSnapshotContent - storage.k8s.io/CSINode - storage.k8s.io/VolumeAttachment Some group kinds are driven by restore configuration elsewhere, and will cause an error if selected here. - Namespace - PersistentVolume',
    ).optional(),
    excludedNamespaces: z.object({
      namespaces: z.array(z.string()).describe(
        "Optional. A list of Kubernetes Namespaces.",
      ).optional(),
    }).describe("A list of Kubernetes Namespaces.").optional(),
    namespacedResourceRestoreMode: z.enum([
      "NAMESPACED_RESOURCE_RESTORE_MODE_UNSPECIFIED",
      "DELETE_AND_RESTORE",
      "FAIL_ON_CONFLICT",
      "MERGE_SKIP_ON_CONFLICT",
      "MERGE_REPLACE_VOLUME_ON_CONFLICT",
      "MERGE_REPLACE_ON_CONFLICT",
    ]).describe(
      "Optional. Defines the behavior for handling the situation where sets of namespaced resources being restored already exist in the target cluster. This MUST be set to a value other than NAMESPACED_RESOURCE_RESTORE_MODE_UNSPECIFIED.",
    ).optional(),
    noNamespaces: z.boolean().describe(
      'Do not restore any namespaced resources if set to "True". Specifying this field to "False" is not allowed.',
    ).optional(),
    restoreOrder: z.object({
      groupKindDependencies: z.array(z.object({
        requiring: z.object({
          resourceGroup: z.unknown().describe(
            'Optional. API group string of a Kubernetes resource, e.g. "apiextensions.k8s.io", "storage.k8s.io", etc. Note: use empty string for core API group.',
          ).optional(),
          resourceKind: z.unknown().describe(
            'Optional. Kind of a Kubernetes resource, must be in UpperCamelCase (PascalCase) and singular form. E.g. "CustomResourceDefinition", "StorageClass", etc.',
          ).optional(),
        }).describe(
          'This is a direct map to the Kubernetes GroupKind type [GroupKind](https://godoc.org/k8s.io/apimachinery/pkg/runtime/schema#GroupKind) and is used for identifying specific "types" of resources to restore.',
        ).optional(),
        satisfying: z.object({
          resourceGroup: z.unknown().describe(
            'Optional. API group string of a Kubernetes resource, e.g. "apiextensions.k8s.io", "storage.k8s.io", etc. Note: use empty string for core API group.',
          ).optional(),
          resourceKind: z.unknown().describe(
            'Optional. Kind of a Kubernetes resource, must be in UpperCamelCase (PascalCase) and singular form. E.g. "CustomResourceDefinition", "StorageClass", etc.',
          ).optional(),
        }).describe(
          'This is a direct map to the Kubernetes GroupKind type [GroupKind](https://godoc.org/k8s.io/apimachinery/pkg/runtime/schema#GroupKind) and is used for identifying specific "types" of resources to restore.',
        ).optional(),
      })).describe(
        "Optional. Contains a list of group kind dependency pairs provided by the customer, that is used by Backup for GKE to generate a group kind restore order.",
      ).optional(),
    }).describe(
      "Allows customers to specify dependencies between resources that Backup for GKE can use to compute a resasonable restore order.",
    ).optional(),
    selectedApplications: z.object({
      namespacedNames: z.array(z.object({
        name: z.string().describe(
          "Optional. The name of the Kubernetes resource.",
        ).optional(),
        namespace: z.string().describe(
          "Optional. The Namespace of the Kubernetes resource.",
        ).optional(),
      })).describe("Optional. A list of namespaced Kubernetes resources.")
        .optional(),
    }).describe("A list of namespaced Kubernetes resources.").optional(),
    selectedNamespaces: z.object({
      namespaces: z.array(z.string()).describe(
        "Optional. A list of Kubernetes Namespaces.",
      ).optional(),
    }).describe("A list of Kubernetes Namespaces.").optional(),
    substitutionRules: z.array(z.object({
      newValue: z.string().describe(
        'Optional. This is the new value to set for any fields that pass the filtering and selection criteria. To remove a value from a Kubernetes resource, either leave this field unspecified, or set it to the empty string ("").',
      ).optional(),
      originalValuePattern: z.string().describe(
        'Optional. (Filtering parameter) This is a [regular expression] (https://en.wikipedia.org/wiki/Regular_expression) that is compared against the fields matched by the target_json_path expression (and must also have passed the previous filters). Substitution will not be performed against fields whose value does not match this expression. If this field is NOT specified, then ALL fields matched by the target_json_path expression will undergo substitution. Note that an empty (e.g., "", rather than unspecified) value for this field will only match empty fields.',
      ).optional(),
      targetGroupKinds: z.array(z.object({
        resourceGroup: z.unknown().describe(
          'Optional. API group string of a Kubernetes resource, e.g. "apiextensions.k8s.io", "storage.k8s.io", etc. Note: use empty string for core API group.',
        ).optional(),
        resourceKind: z.unknown().describe(
          'Optional. Kind of a Kubernetes resource, must be in UpperCamelCase (PascalCase) and singular form. E.g. "CustomResourceDefinition", "StorageClass", etc.',
        ).optional(),
      })).describe(
        'Optional. (Filtering parameter) Any resource subject to substitution must belong to one of the listed "types". If this field is not provided, no type filtering will be performed (all resources of all types matching previous filtering parameters will be candidates for substitution).',
      ).optional(),
      targetJsonPath: z.string().describe(
        "Required. This is a [JSONPath] (https://kubernetes.io/docs/reference/kubectl/jsonpath/) expression that matches specific fields of candidate resources and it operates as both a filtering parameter (resources that are not matched with this expression will not be candidates for substitution) as well as a field identifier (identifies exactly which fields out of the candidate resources will be modified).",
      ).optional(),
      targetNamespaces: z.array(z.string()).describe(
        'Optional. (Filtering parameter) Any resource subject to substitution must be contained within one of the listed Kubernetes Namespace in the Backup. If this field is not provided, no namespace filtering will be performed (all resources in all Namespaces, including all cluster-scoped resources, will be candidates for substitution). To mix cluster-scoped and namespaced resources in the same rule, use an empty string ("") as one of the target namespaces.',
      ).optional(),
    })).describe(
      "Optional. A list of transformation rules to be applied against Kubernetes resources as they are selected for restoration from a Backup. Rules are executed in order defined - this order matters, as changes made by a rule may impact the filtering logic of subsequent rules. An empty list means no substitution will occur.",
    ).optional(),
    transformationRules: z.array(z.object({
      description: z.string().describe(
        "Optional. The description is a user specified string description of the transformation rule.",
      ).optional(),
      fieldActions: z.array(z.object({
        fromPath: z.unknown().describe(
          "Optional. A string containing a JSON Pointer value that references the location in the target document to move the value from.",
        ).optional(),
        op: z.unknown().describe(
          "Required. op specifies the operation to perform.",
        ).optional(),
        path: z.unknown().describe(
          "Optional. A string containing a JSON-Pointer value that references a location within the target document where the operation is performed.",
        ).optional(),
        value: z.unknown().describe(
          "Optional. A string that specifies the desired value in string format to use for transformation.",
        ).optional(),
      })).describe(
        "Required. A list of transformation rule actions to take against candidate resources. Actions are executed in order defined - this order matters, as they could potentially interfere with each other and the first operation could affect the outcome of the second operation.",
      ).optional(),
      resourceFilter: z.object({
        groupKinds: z.array(z.unknown()).describe(
          'Optional. (Filtering parameter) Any resource subject to transformation must belong to one of the listed "types". If this field is not provided, no type filtering will be performed (all resources of all types matching previous filtering parameters will be candidates for transformation).',
        ).optional(),
        jsonPath: z.string().describe(
          "Optional. This is a [JSONPath] (https://github.com/json-path/JsonPath/blob/master/README.md) expression that matches specific fields of candidate resources and it operates as a filtering parameter (resources that are not matched with this expression will not be candidates for transformation).",
        ).optional(),
        namespaces: z.array(z.unknown()).describe(
          "Optional. (Filtering parameter) Any resource subject to transformation must be contained within one of the listed Kubernetes Namespace in the Backup. If this field is not provided, no namespace filtering will be performed (all resources in all Namespaces, including all cluster-scoped resources, will be candidates for transformation).",
        ).optional(),
      }).describe(
        "ResourceFilter specifies matching criteria to limit the scope of a change to a specific set of kubernetes resources that are selected for restoration from a backup.",
      ).optional(),
    })).describe(
      "Optional. A list of transformation rules to be applied against Kubernetes resources as they are selected for restoration from a Backup. Rules are executed in order defined - this order matters, as changes made by a rule may impact the filtering logic of subsequent rules. An empty list means no transformation will occur.",
    ).optional(),
    volumeDataRestorePolicy: z.enum([
      "VOLUME_DATA_RESTORE_POLICY_UNSPECIFIED",
      "RESTORE_VOLUME_DATA_FROM_BACKUP",
      "REUSE_VOLUME_HANDLE_FROM_BACKUP",
      "NO_VOLUME_DATA_RESTORATION",
    ]).describe(
      "Optional. Specifies the mechanism to be used to restore volume data. Default: VOLUME_DATA_RESTORE_POLICY_UNSPECIFIED (will be treated as NO_VOLUME_DATA_RESTORATION).",
    ).optional(),
    volumeDataRestorePolicyBindings: z.array(z.object({
      policy: z.enum([
        "VOLUME_DATA_RESTORE_POLICY_UNSPECIFIED",
        "RESTORE_VOLUME_DATA_FROM_BACKUP",
        "REUSE_VOLUME_HANDLE_FROM_BACKUP",
        "NO_VOLUME_DATA_RESTORATION",
      ]).describe(
        "Required. The VolumeDataRestorePolicy to apply when restoring volumes in scope.",
      ).optional(),
      volumeType: z.enum(["VOLUME_TYPE_UNSPECIFIED", "GCE_PERSISTENT_DISK"])
        .describe(
          "The volume type, as determined by the PVC's bound PV, to apply the policy to.",
        ).optional(),
    })).describe(
      "Optional. A table that binds volumes by their scope to a restore policy. Bindings must have a unique scope. Any volumes not scoped in the bindings are subject to the policy defined in volume_data_restore_policy.",
    ).optional(),
  }).describe("Configuration of a restore.").optional(),
  troubleshootingInfo: z.object({
    stateReasonCode: z.string().describe(
      "Output only. Unique code for each backup/restore operation failure message which helps user identify the failure.",
    ).optional(),
    stateReasonUri: z.string().describe(
      "Output only. URL for the troubleshooting doc which will help the user fix the failing backup/restore operation.",
    ).optional(),
  }).describe(
    "Stores information about troubleshooting doc for debugging a particular state of an operation (eg - backup/restore). This will be used by the end user to debug their operation failure scenario easily.",
  ).optional(),
  volumeDataRestorePolicyOverrides: z.array(z.object({
    policy: z.enum([
      "VOLUME_DATA_RESTORE_POLICY_UNSPECIFIED",
      "RESTORE_VOLUME_DATA_FROM_BACKUP",
      "REUSE_VOLUME_HANDLE_FROM_BACKUP",
      "NO_VOLUME_DATA_RESTORATION",
    ]).describe(
      "Required. The VolumeDataRestorePolicy to apply when restoring volumes in scope.",
    ).optional(),
    selectedPvcs: z.object({
      namespacedNames: z.array(z.object({
        name: z.unknown().describe(
          "Optional. The name of the Kubernetes resource.",
        ).optional(),
        namespace: z.unknown().describe(
          "Optional. The Namespace of the Kubernetes resource.",
        ).optional(),
      })).describe("Optional. A list of namespaced Kubernetes resources.")
        .optional(),
    }).describe("A list of namespaced Kubernetes resources.").optional(),
  })).describe(
    "Optional. Immutable. Overrides the volume data restore policies selected in the Restore Config for override-scoped resources.",
  ).optional(),
  restoreId: z.string().describe(
    "Required. The client-provided short name for the Restore resource. This name must: - be between 1 and 63 characters long (inclusive) - consist of only lower-case ASCII letters, numbers, and dashes - start with a lower-case letter - end with a lower-case letter or number - be unique within the set of Restores in this RestorePlan.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  backup: z.string().optional(),
  cluster: z.string().optional(),
  completeTime: z.string().optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  etag: z.string().optional(),
  filter: z.object({
    exclusionFilters: z.array(z.object({
      groupKind: z.object({
        resourceGroup: z.string(),
        resourceKind: z.string(),
      }),
      labels: z.record(z.string(), z.unknown()),
      name: z.string(),
      namespace: z.string(),
    })),
    inclusionFilters: z.array(z.object({
      groupKind: z.object({
        resourceGroup: z.string(),
        resourceKind: z.string(),
      }),
      labels: z.record(z.string(), z.unknown()),
      name: z.string(),
      namespace: z.string(),
    })),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  resourcesExcludedCount: z.number().optional(),
  resourcesFailedCount: z.number().optional(),
  resourcesRestoredCount: z.number().optional(),
  restoreConfig: z.object({
    allNamespaces: z.boolean(),
    clusterResourceConflictPolicy: z.string(),
    clusterResourceRestoreScope: z.object({
      allGroupKinds: z.boolean(),
      excludedGroupKinds: z.array(z.object({
        resourceGroup: z.string(),
        resourceKind: z.string(),
      })),
      noGroupKinds: z.boolean(),
      selectedGroupKinds: z.array(z.object({
        resourceGroup: z.string(),
        resourceKind: z.string(),
      })),
    }),
    excludedNamespaces: z.object({
      namespaces: z.array(z.string()),
    }),
    namespacedResourceRestoreMode: z.string(),
    noNamespaces: z.boolean(),
    restoreOrder: z.object({
      groupKindDependencies: z.array(z.object({
        requiring: z.object({
          resourceGroup: z.unknown(),
          resourceKind: z.unknown(),
        }),
        satisfying: z.object({
          resourceGroup: z.unknown(),
          resourceKind: z.unknown(),
        }),
      })),
    }),
    selectedApplications: z.object({
      namespacedNames: z.array(z.object({
        name: z.string(),
        namespace: z.string(),
      })),
    }),
    selectedNamespaces: z.object({
      namespaces: z.array(z.string()),
    }),
    substitutionRules: z.array(z.object({
      newValue: z.string(),
      originalValuePattern: z.string(),
      targetGroupKinds: z.array(z.object({
        resourceGroup: z.unknown(),
        resourceKind: z.unknown(),
      })),
      targetJsonPath: z.string(),
      targetNamespaces: z.array(z.string()),
    })),
    transformationRules: z.array(z.object({
      description: z.string(),
      fieldActions: z.array(z.object({
        fromPath: z.unknown(),
        op: z.unknown(),
        path: z.unknown(),
        value: z.unknown(),
      })),
      resourceFilter: z.object({
        groupKinds: z.array(z.unknown()),
        jsonPath: z.string(),
        namespaces: z.array(z.unknown()),
      }),
    })),
    volumeDataRestorePolicy: z.string(),
    volumeDataRestorePolicyBindings: z.array(z.object({
      policy: z.string(),
      volumeType: z.string(),
    })),
  }).optional(),
  state: z.string().optional(),
  stateReason: z.string().optional(),
  troubleshootingInfo: z.object({
    stateReasonCode: z.string(),
    stateReasonUri: z.string(),
  }).optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
  volumeDataRestorePolicyOverrides: z.array(z.object({
    policy: z.string(),
    selectedPvcs: z.object({
      namespacedNames: z.array(z.object({
        name: z.unknown(),
        namespace: z.unknown(),
      })),
    }),
  })).optional(),
  volumesRestoredCount: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  backup: z.string().describe(
    "Required. Immutable. A reference to the Backup used as the source from which this Restore will restore. Note that this Backup must be a sub-resource of the RestorePlan's backup_plan. Format: `projects/*/locations/*/backupPlans/*/backups/*`.",
  ).optional(),
  description: z.string().describe(
    "Optional. User specified descriptive string for this Restore.",
  ).optional(),
  filter: z.object({
    exclusionFilters: z.array(z.object({
      groupKind: z.object({
        resourceGroup: z.string().describe(
          'Optional. API group string of a Kubernetes resource, e.g. "apiextensions.k8s.io", "storage.k8s.io", etc. Note: use empty string for core API group.',
        ).optional(),
        resourceKind: z.string().describe(
          'Optional. Kind of a Kubernetes resource, must be in UpperCamelCase (PascalCase) and singular form. E.g. "CustomResourceDefinition", "StorageClass", etc.',
        ).optional(),
      }).describe(
        'This is a direct map to the Kubernetes GroupKind type [GroupKind](https://godoc.org/k8s.io/apimachinery/pkg/runtime/schema#GroupKind) and is used for identifying specific "types" of resources to restore.',
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Optional. Selects resources using Kubernetes [labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/). If specified, a resource will be selected if and only if the resource has all of the provided labels and all the label values match.",
      ).optional(),
      name: z.string().describe(
        "Optional. Selects resources using their resource names. If specified, only resources with the provided name will be selected.",
      ).optional(),
      namespace: z.string().describe(
        "Optional. Selects resources using their namespaces. This only applies to namespace scoped resources and cannot be used for selecting cluster scoped resources. If specified, only resources in the provided namespace will be selected. If not specified, the filter will apply to both cluster scoped and namespace scoped resources (e.g. name or label). The [Namespace](https://pkg.go.dev/k8s.io/api/core/v1#Namespace) resource itself will be restored if and only if any resources within the namespace are restored.",
      ).optional(),
    })).describe(
      "Optional. Excludes resources from restoration. If specified, a resource will not be restored if it matches any `ResourceSelector` of the `exclusion_filters`.",
    ).optional(),
    inclusionFilters: z.array(z.object({
      groupKind: z.object({
        resourceGroup: z.string().describe(
          'Optional. API group string of a Kubernetes resource, e.g. "apiextensions.k8s.io", "storage.k8s.io", etc. Note: use empty string for core API group.',
        ).optional(),
        resourceKind: z.string().describe(
          'Optional. Kind of a Kubernetes resource, must be in UpperCamelCase (PascalCase) and singular form. E.g. "CustomResourceDefinition", "StorageClass", etc.',
        ).optional(),
      }).describe(
        'This is a direct map to the Kubernetes GroupKind type [GroupKind](https://godoc.org/k8s.io/apimachinery/pkg/runtime/schema#GroupKind) and is used for identifying specific "types" of resources to restore.',
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Optional. Selects resources using Kubernetes [labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/). If specified, a resource will be selected if and only if the resource has all of the provided labels and all the label values match.",
      ).optional(),
      name: z.string().describe(
        "Optional. Selects resources using their resource names. If specified, only resources with the provided name will be selected.",
      ).optional(),
      namespace: z.string().describe(
        "Optional. Selects resources using their namespaces. This only applies to namespace scoped resources and cannot be used for selecting cluster scoped resources. If specified, only resources in the provided namespace will be selected. If not specified, the filter will apply to both cluster scoped and namespace scoped resources (e.g. name or label). The [Namespace](https://pkg.go.dev/k8s.io/api/core/v1#Namespace) resource itself will be restored if and only if any resources within the namespace are restored.",
      ).optional(),
    })).describe(
      "Optional. Selects resources for restoration. If specified, only resources which match `inclusion_filters` will be selected for restoration. A resource will be selected if it matches any `ResourceSelector` of the `inclusion_filters`.",
    ).optional(),
  }).describe(
    "Defines the filter for `Restore`. This filter can be used to further refine the resource selection of the `Restore` beyond the coarse-grained scope defined in the `RestorePlan`. `exclusion_filters` take precedence over `inclusion_filters`. If a resource matches both `inclusion_filters` and `exclusion_filters`, it will not be restored.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "A set of custom labels supplied by user.",
  ).optional(),
  restoreConfig: z.object({
    allNamespaces: z.boolean().describe(
      'Restore all namespaced resources in the Backup if set to "True". Specifying this field to "False" is an error.',
    ).optional(),
    clusterResourceConflictPolicy: z.enum([
      "CLUSTER_RESOURCE_CONFLICT_POLICY_UNSPECIFIED",
      "USE_EXISTING_VERSION",
      "USE_BACKUP_VERSION",
    ]).describe(
      "Optional. Defines the behavior for handling the situation where cluster-scoped resources being restored already exist in the target cluster. This MUST be set to a value other than CLUSTER_RESOURCE_CONFLICT_POLICY_UNSPECIFIED if cluster_resource_restore_scope is not empty.",
    ).optional(),
    clusterResourceRestoreScope: z.object({
      allGroupKinds: z.boolean().describe(
        "Optional. If True, all valid cluster-scoped resources will be restored. Mutually exclusive to any other field in the message.",
      ).optional(),
      excludedGroupKinds: z.array(z.object({
        resourceGroup: z.string().describe(
          'Optional. API group string of a Kubernetes resource, e.g. "apiextensions.k8s.io", "storage.k8s.io", etc. Note: use empty string for core API group.',
        ).optional(),
        resourceKind: z.string().describe(
          'Optional. Kind of a Kubernetes resource, must be in UpperCamelCase (PascalCase) and singular form. E.g. "CustomResourceDefinition", "StorageClass", etc.',
        ).optional(),
      })).describe(
        "Optional. A list of cluster-scoped resource group kinds to NOT restore from the backup. If specified, all valid cluster-scoped resources will be restored except for those specified in the list. Mutually exclusive to any other field in the message.",
      ).optional(),
      noGroupKinds: z.boolean().describe(
        "Optional. If True, no cluster-scoped resources will be restored. This has the same restore scope as if the message is not defined. Mutually exclusive to any other field in the message.",
      ).optional(),
      selectedGroupKinds: z.array(z.object({
        resourceGroup: z.string().describe(
          'Optional. API group string of a Kubernetes resource, e.g. "apiextensions.k8s.io", "storage.k8s.io", etc. Note: use empty string for core API group.',
        ).optional(),
        resourceKind: z.string().describe(
          'Optional. Kind of a Kubernetes resource, must be in UpperCamelCase (PascalCase) and singular form. E.g. "CustomResourceDefinition", "StorageClass", etc.',
        ).optional(),
      })).describe(
        "Optional. A list of cluster-scoped resource group kinds to restore from the backup. If specified, only the selected resources will be restored. Mutually exclusive to any other field in the message.",
      ).optional(),
    }).describe(
      'Defines the scope of cluster-scoped resources to restore. Some group kinds are not reasonable choices for a restore, and will cause an error if selected here. Any scope selection that would restore "all valid" resources automatically excludes these group kinds. - Node - ComponentStatus - gkebackup.gke.io/BackupJob - gkebackup.gke.io/RestoreJob - metrics.k8s.io/NodeMetrics - migration.k8s.io/StorageState - migration.k8s.io/StorageVersionMigration - snapshot.storage.k8s.io/VolumeSnapshotContent - storage.k8s.io/CSINode - storage.k8s.io/VolumeAttachment Some group kinds are driven by restore configuration elsewhere, and will cause an error if selected here. - Namespace - PersistentVolume',
    ).optional(),
    excludedNamespaces: z.object({
      namespaces: z.array(z.string()).describe(
        "Optional. A list of Kubernetes Namespaces.",
      ).optional(),
    }).describe("A list of Kubernetes Namespaces.").optional(),
    namespacedResourceRestoreMode: z.enum([
      "NAMESPACED_RESOURCE_RESTORE_MODE_UNSPECIFIED",
      "DELETE_AND_RESTORE",
      "FAIL_ON_CONFLICT",
      "MERGE_SKIP_ON_CONFLICT",
      "MERGE_REPLACE_VOLUME_ON_CONFLICT",
      "MERGE_REPLACE_ON_CONFLICT",
    ]).describe(
      "Optional. Defines the behavior for handling the situation where sets of namespaced resources being restored already exist in the target cluster. This MUST be set to a value other than NAMESPACED_RESOURCE_RESTORE_MODE_UNSPECIFIED.",
    ).optional(),
    noNamespaces: z.boolean().describe(
      'Do not restore any namespaced resources if set to "True". Specifying this field to "False" is not allowed.',
    ).optional(),
    restoreOrder: z.object({
      groupKindDependencies: z.array(z.object({
        requiring: z.object({
          resourceGroup: z.unknown().describe(
            'Optional. API group string of a Kubernetes resource, e.g. "apiextensions.k8s.io", "storage.k8s.io", etc. Note: use empty string for core API group.',
          ).optional(),
          resourceKind: z.unknown().describe(
            'Optional. Kind of a Kubernetes resource, must be in UpperCamelCase (PascalCase) and singular form. E.g. "CustomResourceDefinition", "StorageClass", etc.',
          ).optional(),
        }).describe(
          'This is a direct map to the Kubernetes GroupKind type [GroupKind](https://godoc.org/k8s.io/apimachinery/pkg/runtime/schema#GroupKind) and is used for identifying specific "types" of resources to restore.',
        ).optional(),
        satisfying: z.object({
          resourceGroup: z.unknown().describe(
            'Optional. API group string of a Kubernetes resource, e.g. "apiextensions.k8s.io", "storage.k8s.io", etc. Note: use empty string for core API group.',
          ).optional(),
          resourceKind: z.unknown().describe(
            'Optional. Kind of a Kubernetes resource, must be in UpperCamelCase (PascalCase) and singular form. E.g. "CustomResourceDefinition", "StorageClass", etc.',
          ).optional(),
        }).describe(
          'This is a direct map to the Kubernetes GroupKind type [GroupKind](https://godoc.org/k8s.io/apimachinery/pkg/runtime/schema#GroupKind) and is used for identifying specific "types" of resources to restore.',
        ).optional(),
      })).describe(
        "Optional. Contains a list of group kind dependency pairs provided by the customer, that is used by Backup for GKE to generate a group kind restore order.",
      ).optional(),
    }).describe(
      "Allows customers to specify dependencies between resources that Backup for GKE can use to compute a resasonable restore order.",
    ).optional(),
    selectedApplications: z.object({
      namespacedNames: z.array(z.object({
        name: z.string().describe(
          "Optional. The name of the Kubernetes resource.",
        ).optional(),
        namespace: z.string().describe(
          "Optional. The Namespace of the Kubernetes resource.",
        ).optional(),
      })).describe("Optional. A list of namespaced Kubernetes resources.")
        .optional(),
    }).describe("A list of namespaced Kubernetes resources.").optional(),
    selectedNamespaces: z.object({
      namespaces: z.array(z.string()).describe(
        "Optional. A list of Kubernetes Namespaces.",
      ).optional(),
    }).describe("A list of Kubernetes Namespaces.").optional(),
    substitutionRules: z.array(z.object({
      newValue: z.string().describe(
        'Optional. This is the new value to set for any fields that pass the filtering and selection criteria. To remove a value from a Kubernetes resource, either leave this field unspecified, or set it to the empty string ("").',
      ).optional(),
      originalValuePattern: z.string().describe(
        'Optional. (Filtering parameter) This is a [regular expression] (https://en.wikipedia.org/wiki/Regular_expression) that is compared against the fields matched by the target_json_path expression (and must also have passed the previous filters). Substitution will not be performed against fields whose value does not match this expression. If this field is NOT specified, then ALL fields matched by the target_json_path expression will undergo substitution. Note that an empty (e.g., "", rather than unspecified) value for this field will only match empty fields.',
      ).optional(),
      targetGroupKinds: z.array(z.object({
        resourceGroup: z.unknown().describe(
          'Optional. API group string of a Kubernetes resource, e.g. "apiextensions.k8s.io", "storage.k8s.io", etc. Note: use empty string for core API group.',
        ).optional(),
        resourceKind: z.unknown().describe(
          'Optional. Kind of a Kubernetes resource, must be in UpperCamelCase (PascalCase) and singular form. E.g. "CustomResourceDefinition", "StorageClass", etc.',
        ).optional(),
      })).describe(
        'Optional. (Filtering parameter) Any resource subject to substitution must belong to one of the listed "types". If this field is not provided, no type filtering will be performed (all resources of all types matching previous filtering parameters will be candidates for substitution).',
      ).optional(),
      targetJsonPath: z.string().describe(
        "Required. This is a [JSONPath] (https://kubernetes.io/docs/reference/kubectl/jsonpath/) expression that matches specific fields of candidate resources and it operates as both a filtering parameter (resources that are not matched with this expression will not be candidates for substitution) as well as a field identifier (identifies exactly which fields out of the candidate resources will be modified).",
      ).optional(),
      targetNamespaces: z.array(z.string()).describe(
        'Optional. (Filtering parameter) Any resource subject to substitution must be contained within one of the listed Kubernetes Namespace in the Backup. If this field is not provided, no namespace filtering will be performed (all resources in all Namespaces, including all cluster-scoped resources, will be candidates for substitution). To mix cluster-scoped and namespaced resources in the same rule, use an empty string ("") as one of the target namespaces.',
      ).optional(),
    })).describe(
      "Optional. A list of transformation rules to be applied against Kubernetes resources as they are selected for restoration from a Backup. Rules are executed in order defined - this order matters, as changes made by a rule may impact the filtering logic of subsequent rules. An empty list means no substitution will occur.",
    ).optional(),
    transformationRules: z.array(z.object({
      description: z.string().describe(
        "Optional. The description is a user specified string description of the transformation rule.",
      ).optional(),
      fieldActions: z.array(z.object({
        fromPath: z.unknown().describe(
          "Optional. A string containing a JSON Pointer value that references the location in the target document to move the value from.",
        ).optional(),
        op: z.unknown().describe(
          "Required. op specifies the operation to perform.",
        ).optional(),
        path: z.unknown().describe(
          "Optional. A string containing a JSON-Pointer value that references a location within the target document where the operation is performed.",
        ).optional(),
        value: z.unknown().describe(
          "Optional. A string that specifies the desired value in string format to use for transformation.",
        ).optional(),
      })).describe(
        "Required. A list of transformation rule actions to take against candidate resources. Actions are executed in order defined - this order matters, as they could potentially interfere with each other and the first operation could affect the outcome of the second operation.",
      ).optional(),
      resourceFilter: z.object({
        groupKinds: z.array(z.unknown()).describe(
          'Optional. (Filtering parameter) Any resource subject to transformation must belong to one of the listed "types". If this field is not provided, no type filtering will be performed (all resources of all types matching previous filtering parameters will be candidates for transformation).',
        ).optional(),
        jsonPath: z.string().describe(
          "Optional. This is a [JSONPath] (https://github.com/json-path/JsonPath/blob/master/README.md) expression that matches specific fields of candidate resources and it operates as a filtering parameter (resources that are not matched with this expression will not be candidates for transformation).",
        ).optional(),
        namespaces: z.array(z.unknown()).describe(
          "Optional. (Filtering parameter) Any resource subject to transformation must be contained within one of the listed Kubernetes Namespace in the Backup. If this field is not provided, no namespace filtering will be performed (all resources in all Namespaces, including all cluster-scoped resources, will be candidates for transformation).",
        ).optional(),
      }).describe(
        "ResourceFilter specifies matching criteria to limit the scope of a change to a specific set of kubernetes resources that are selected for restoration from a backup.",
      ).optional(),
    })).describe(
      "Optional. A list of transformation rules to be applied against Kubernetes resources as they are selected for restoration from a Backup. Rules are executed in order defined - this order matters, as changes made by a rule may impact the filtering logic of subsequent rules. An empty list means no transformation will occur.",
    ).optional(),
    volumeDataRestorePolicy: z.enum([
      "VOLUME_DATA_RESTORE_POLICY_UNSPECIFIED",
      "RESTORE_VOLUME_DATA_FROM_BACKUP",
      "REUSE_VOLUME_HANDLE_FROM_BACKUP",
      "NO_VOLUME_DATA_RESTORATION",
    ]).describe(
      "Optional. Specifies the mechanism to be used to restore volume data. Default: VOLUME_DATA_RESTORE_POLICY_UNSPECIFIED (will be treated as NO_VOLUME_DATA_RESTORATION).",
    ).optional(),
    volumeDataRestorePolicyBindings: z.array(z.object({
      policy: z.enum([
        "VOLUME_DATA_RESTORE_POLICY_UNSPECIFIED",
        "RESTORE_VOLUME_DATA_FROM_BACKUP",
        "REUSE_VOLUME_HANDLE_FROM_BACKUP",
        "NO_VOLUME_DATA_RESTORATION",
      ]).describe(
        "Required. The VolumeDataRestorePolicy to apply when restoring volumes in scope.",
      ).optional(),
      volumeType: z.enum(["VOLUME_TYPE_UNSPECIFIED", "GCE_PERSISTENT_DISK"])
        .describe(
          "The volume type, as determined by the PVC's bound PV, to apply the policy to.",
        ).optional(),
    })).describe(
      "Optional. A table that binds volumes by their scope to a restore policy. Bindings must have a unique scope. Any volumes not scoped in the bindings are subject to the policy defined in volume_data_restore_policy.",
    ).optional(),
  }).describe("Configuration of a restore.").optional(),
  troubleshootingInfo: z.object({
    stateReasonCode: z.string().describe(
      "Output only. Unique code for each backup/restore operation failure message which helps user identify the failure.",
    ).optional(),
    stateReasonUri: z.string().describe(
      "Output only. URL for the troubleshooting doc which will help the user fix the failing backup/restore operation.",
    ).optional(),
  }).describe(
    "Stores information about troubleshooting doc for debugging a particular state of an operation (eg - backup/restore). This will be used by the end user to debug their operation failure scenario easily.",
  ).optional(),
  volumeDataRestorePolicyOverrides: z.array(z.object({
    policy: z.enum([
      "VOLUME_DATA_RESTORE_POLICY_UNSPECIFIED",
      "RESTORE_VOLUME_DATA_FROM_BACKUP",
      "REUSE_VOLUME_HANDLE_FROM_BACKUP",
      "NO_VOLUME_DATA_RESTORATION",
    ]).describe(
      "Required. The VolumeDataRestorePolicy to apply when restoring volumes in scope.",
    ).optional(),
    selectedPvcs: z.object({
      namespacedNames: z.array(z.object({
        name: z.unknown().describe(
          "Optional. The name of the Kubernetes resource.",
        ).optional(),
        namespace: z.unknown().describe(
          "Optional. The Namespace of the Kubernetes resource.",
        ).optional(),
      })).describe("Optional. A list of namespaced Kubernetes resources.")
        .optional(),
    }).describe("A list of namespaced Kubernetes resources.").optional(),
  })).describe(
    "Optional. Immutable. Overrides the volume data restore policies selected in the Restore Config for override-scoped resources.",
  ).optional(),
  restoreId: z.string().describe(
    "Required. The client-provided short name for the Restore resource. This name must: - be between 1 and 63 characters long (inclusive) - consist of only lower-case ASCII letters, numbers, and dashes - start with a lower-case letter - end with a lower-case letter or number - be unique within the set of Restores in this RestorePlan.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Backup for GKE RestorePlans.Restores. Registered at `@swamp/gcp/gkebackup/restoreplans-restores`. */
export const model = {
  type: "@swamp/gcp/gkebackup/restoreplans-restores",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents both a request to Restore some portion of a Backup into a target G...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a restores",
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
        if (g["backup"] !== undefined) body["backup"] = g["backup"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["filter"] !== undefined) body["filter"] = g["filter"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["restoreConfig"] !== undefined) {
          body["restoreConfig"] = g["restoreConfig"];
        }
        if (g["troubleshootingInfo"] !== undefined) {
          body["troubleshootingInfo"] = g["troubleshootingInfo"];
        }
        if (g["volumeDataRestorePolicyOverrides"] !== undefined) {
          body["volumeDataRestorePolicyOverrides"] =
            g["volumeDataRestorePolicyOverrides"];
        }
        if (g["restoreId"] !== undefined) body["restoreId"] = g["restoreId"];
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
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a restores",
      arguments: z.object({
        identifier: z.string().describe("The name of the restores"),
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
      description: "Update restores attributes",
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
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["filter"] !== undefined) body["filter"] = g["filter"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["restoreConfig"] !== undefined) {
          body["restoreConfig"] = g["restoreConfig"];
        }
        if (g["troubleshootingInfo"] !== undefined) {
          body["troubleshootingInfo"] = g["troubleshootingInfo"];
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
              "readyValues": ["SUCCEEDED"],
              "failedValues": ["FAILED"],
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
      description: "Delete the restores",
      arguments: z.object({
        identifier: z.string().describe("The name of the restores"),
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
      description: "Sync restores state from GCP",
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
              "gkebackup.projects.locations.restorePlans.restores.getIamPolicy",
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
              "gkebackup.projects.locations.restorePlans.restores.setIamPolicy",
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
              "gkebackup.projects.locations.restorePlans.restores.testIamPermissions",
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
