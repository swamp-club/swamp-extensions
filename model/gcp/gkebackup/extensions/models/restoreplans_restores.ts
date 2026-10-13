// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
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
        "Optional. Selects resources using their Kubernetes GroupKinds. If specified, only resources of provided GroupKind will be selected.",
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
        "Optional. Selects resources using their Kubernetes GroupKinds. If specified, only resources of provided GroupKind will be selected.",
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
    "Optional. Immutable. Filters resources for `Restore`. If not specified, the scope of the restore will remain the same as defined in the `RestorePlan`. If this is specified and no resources are matched by the `inclusion_filters` or everything is excluded by the `exclusion_filters`, nothing will be restored. This filter can only be specified if the value of namespaced_resource_restore_mode is set to `MERGE_SKIP_ON_CONFLICT`, `MERGE_REPLACE_VOLUME_ON_CONFLICT` or `MERGE_REPLACE_ON_CONFLICT`.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "A set of custom labels supplied by user.",
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
    }).describe("A list of PVCs to apply the policy override to.").optional(),
  })).describe(
    "Optional. Immutable. Overrides the volume data restore policies selected in the Restore Config for override-scoped resources.",
  ).optional(),
  restoreId: z.string().describe(
    "Required. The client-provided short name for the Restore resource. This name must: - be between 1 and 63 characters long (inclusive) - consist of only lower-case ASCII letters, numbers, and dashes - start with a lower-case letter - end with a lower-case letter or number - be unique within the set of Restores in this RestorePlan.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
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
        "Optional. Selects resources using their Kubernetes GroupKinds. If specified, only resources of provided GroupKind will be selected.",
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
        "Optional. Selects resources using their Kubernetes GroupKinds. If specified, only resources of provided GroupKind will be selected.",
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
    "Optional. Immutable. Filters resources for `Restore`. If not specified, the scope of the restore will remain the same as defined in the `RestorePlan`. If this is specified and no resources are matched by the `inclusion_filters` or everything is excluded by the `exclusion_filters`, nothing will be restored. This filter can only be specified if the value of namespaced_resource_restore_mode is set to `MERGE_SKIP_ON_CONFLICT`, `MERGE_REPLACE_VOLUME_ON_CONFLICT` or `MERGE_REPLACE_ON_CONFLICT`.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "A set of custom labels supplied by user.",
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
    }).describe("A list of PVCs to apply the policy override to.").optional(),
  })).describe(
    "Optional. Immutable. Overrides the volume data restore policies selected in the Restore Config for override-scoped resources.",
  ).optional(),
  restoreId: z.string().describe(
    "Required. The client-provided short name for the Restore resource. This name must: - be between 1 and 63 characters long (inclusive) - consist of only lower-case ASCII letters, numbers, and dashes - start with a lower-case letter - end with a lower-case letter or number - be unique within the set of Restores in this RestorePlan.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessToken",
  "credentialsJson",
  "project",
  "scopes",
  "quotaProject",
  "apiEndpoint",
]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
    scopes: typeof g.scopes === "string"
      ? g.scopes.split(",").map((s: string) => s.trim())
      : undefined,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Backup for GKE RestorePlans.Restores. Registered at `@swamp/gcp/gkebackup/restoreplans-restores`. */
export const model = {
  type: "@swamp/gcp/gkebackup/restoreplans-restores",
  version: "2026.10.13.1",
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
    {
      toVersion: "2026.07.17.1",
      description: "Added: parent",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "Removed: restoreConfig, troubleshootingInfo",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          restoreConfig: _restoreConfig,
          troubleshootingInfo: _troubleshootingInfo,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.07.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.12.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.2",
      description:
        "Removed: exclusionFilters, groupKind, resourceGroup, resourceKind, namespace, inclusionFilters, groupKind, resourceGroup, resourceKind, namespace, policy, selectedPvcs, namespacedNames, namespace",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          exclusionFilters: _exclusionFilters,
          groupKind: _groupKind,
          resourceGroup: _resourceGroup,
          resourceKind: _resourceKind,
          namespace: _namespace,
          inclusionFilters: _inclusionFilters,
          policy: _policy,
          selectedPvcs: _selectedPvcs,
          namespacedNames: _namespacedNames,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.10.13.1",
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["backup"] !== undefined) body["backup"] = g["backup"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["filter"] !== undefined) body["filter"] = g["filter"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["volumeDataRestorePolicyOverrides"] !== undefined) {
          body["volumeDataRestorePolicyOverrides"] =
            g["volumeDataRestorePolicyOverrides"];
        }
        if (g["restoreId"] !== undefined) {
          params["restoreId"] = String(g["restoreId"]);
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
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
          undefined,
          credentials,
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
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
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
        identifier: z.string().describe(
          "Target a specific restores by name (e.g. one discovered by list)",
        ).optional(),
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { identifier?: string; waitForReady?: boolean },
        context: any,
      ) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const params: Record<string, string> = { project: projectId };
        const existingName = existing["name"]?.toString();
        if (existingName && existingName.includes("/")) {
          params["name"] = existingName;
        } else {
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        const updateMaskKeys = Object.keys(body);
        if (updateMaskKeys.length > 0) {
          params["updateMask"] = updateMaskKeys.join(",");
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
          baseUrl,
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
      description: "Delete the restores",
      arguments: z.object({
        identifier: z.string().describe("The name of the restores"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const { existed } = await deleteResource(
          baseUrl,
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
      description: "Sync restores state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific restores by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          const existingName = existing.name?.toString();
          if (existingName && existingName.includes("/")) {
            params["name"] = existingName;
          } else {
            const shortName = existingName ?? g["name"]?.toString();
            if (!shortName) throw new Error("No identifier found");
            params["name"] = buildResourceName(
              String(g["parent"] ?? ""),
              shortName,
            );
          }
          const result = await readResource(
            baseUrl,
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
      description: "List restores resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Field match expression used to filter the results.",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. Field by which to sort the results.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The target number of results to return in a single response. If not specified, a default value will be chosen by the service. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
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
          baseUrl,
          LIST_CONFIG,
          params,
          "restores",
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
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({
        options_requestedPolicyVersion: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (args["options_requestedPolicyVersion"] !== undefined) {
          params["options.requestedPolicyVersion"] = String(
            args["options_requestedPolicyVersion"],
          );
        }
        const result = await createResource(
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          credentials,
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          baseUrl,
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
