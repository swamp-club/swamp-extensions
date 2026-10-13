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

// Auto-generated extension model for @swamp/gcp/dlp/deidentifytemplates
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Sensitive Data Protection (DLP) DeidentifyTemplates.
 *
 * DeidentifyTemplates contains instructions on how to de-identify content. See https://docs.cloud.google.com/sensitive-data-protection/docs/concepts-templates to learn more.
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
  return `${parent}/deidentifyTemplates/${shortName}`;
}

const BASE_URL = "https://dlp.googleapis.com/";

const GET_CONFIG = {
  "id": "dlp.organizations.deidentifyTemplates.get",
  "path": "v2/{+name}",
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
  "id": "dlp.organizations.deidentifyTemplates.create",
  "path": "v2/{+parent}/deidentifyTemplates",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "dlp.organizations.deidentifyTemplates.patch",
  "path": "v2/{+name}",
  "httpMethod": "PATCH",
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

const DELETE_CONFIG = {
  "id": "dlp.organizations.deidentifyTemplates.delete",
  "path": "v2/{+name}",
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
  "id": "dlp.organizations.deidentifyTemplates.list",
  "path": "v2/{+parent}/deidentifyTemplates",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "locationId": {
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
  deidentifyTemplate: z.object({
    createTime: z.string().describe(
      "Output only. The creation timestamp of an inspectTemplate.",
    ).optional(),
    deidentifyConfig: z.object({
      imageTransformations: z.object({
        transforms: z.array(z.object({
          allInfoTypes: z.unknown().describe(
            "Apply transformation to all findings not specified in other ImageTransformation's selected_info_types. Only one instance is allowed within the ImageTransformations message.",
          ).optional(),
          allText: z.unknown().describe(
            "Apply transformation to all text that doesn't match an infoType. Only one instance is allowed within the ImageTransformations message.",
          ).optional(),
          redactionColor: z.unknown().describe(
            "The color to use when redacting content from an image. If not specified, the default is black.",
          ).optional(),
          selectedInfoTypes: z.unknown().describe(
            "Apply transformation to the selected info_types.",
          ).optional(),
        })).describe("List of transforms to make.").optional(),
      }).describe("Treat the dataset as an image and redact.").optional(),
      infoTypeTransformations: z.object({
        transformations: z.array(z.object({
          infoTypes: z.unknown().describe(
            "InfoTypes to apply the transformation to. An empty list will cause this transformation to apply to all findings that correspond to infoTypes that were requested in `InspectConfig`.",
          ).optional(),
          primitiveTransformation: z.unknown().describe(
            "Required. Primitive transformation to apply to the infoType.",
          ).optional(),
        })).describe(
          "Required. Transformation for each infoType. Cannot specify more than one for a given infoType.",
        ).optional(),
      }).describe(
        "Treat the dataset as free-form text and apply the same free text transformation everywhere.",
      ).optional(),
      recordTransformations: z.object({
        fieldTransformations: z.array(z.object({
          condition: z.unknown().describe(
            "Only apply the transformation if the condition evaluates to true for the given `RecordCondition`. The conditions are allowed to reference fields that are not used in the actual transformation. Example Use Cases: - Apply a different bucket transformation to an age column if the zip code column for the same record is within a specific range. - Redact a field if the date of birth field is greater than 85.",
          ).optional(),
          fields: z.unknown().describe(
            'Required. Input field(s) to apply the transformation to. When you have columns that reference their position within a list, omit the index from the FieldId. FieldId name matching ignores the index. For example, instead of "contact.nums[0].type", use "contact.nums.type".',
          ).optional(),
          infoTypeTransformations: z.unknown().describe(
            "Treat the contents of the field as free text, and selectively transform content that matches an `InfoType`.",
          ).optional(),
          primitiveTransformation: z.unknown().describe(
            "Apply the transformation to the entire field.",
          ).optional(),
        })).describe(
          "Transform the record by applying various field transformations.",
        ).optional(),
        recordSuppressions: z.array(z.object({
          condition: z.unknown().describe(
            "A condition that when it evaluates to true will result in the record being evaluated to be suppressed from the transformed content.",
          ).optional(),
        })).describe(
          "Configuration defining which records get suppressed entirely. Records that match any suppression rule are omitted from the output.",
        ).optional(),
      }).describe(
        "Treat the dataset as structured. Transformations can be applied to specific locations within structured datasets, such as transforming a column within a table.",
      ).optional(),
      transformationErrorHandling: z.object({
        leaveUntransformed: z.object({}).describe("Ignore errors").optional(),
        throwError: z.object({}).describe("Throw an error").optional(),
      }).describe(
        "Mode for handling transformation errors. If left unspecified, the default mode is `TransformationErrorHandling.ThrowError`.",
      ).optional(),
    }).describe("The core content of the template.").optional(),
    description: z.string().describe("Short description (max 256 chars).")
      .optional(),
    displayName: z.string().describe("Display name (max 256 chars).")
      .optional(),
    name: z.string().describe(
      "Output only. The template name. The template will have one of the following formats: `projects/PROJECT_ID/deidentifyTemplates/TEMPLATE_ID` OR `organizations/ORGANIZATION_ID/deidentifyTemplates/TEMPLATE_ID`",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The last update timestamp of an inspectTemplate.",
    ).optional(),
  }).describe("New DeidentifyTemplate value.").optional(),
  locationId: z.string().describe("Deprecated. This field has no effect.")
    .optional(),
  templateId: z.string().describe(
    "The template id can contain uppercase and lowercase letters, numbers, and hyphens; that is, it must match the regular expression: `[a-zA-Z\\d-_]+`. The maximum length is 100 characters. Can be empty to allow the system to generate one.",
  ).optional(),
  updateMask: z.string().describe("Mask to control which fields get updated.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  deidentifyConfig: z.object({
    imageTransformations: z.object({
      transforms: z.array(z.object({
        allInfoTypes: z.object({}),
        allText: z.object({}),
        redactionColor: z.object({
          blue: z.unknown(),
          green: z.unknown(),
          red: z.unknown(),
        }),
        selectedInfoTypes: z.object({
          infoTypes: z.unknown(),
        }),
      })),
    }),
    infoTypeTransformations: z.object({
      transformations: z.array(z.object({
        infoTypes: z.array(z.unknown()),
        primitiveTransformation: z.object({
          bucketingConfig: z.unknown(),
          characterMaskConfig: z.unknown(),
          cryptoDeterministicConfig: z.unknown(),
          cryptoHashConfig: z.unknown(),
          cryptoReplaceFfxFpeConfig: z.unknown(),
          dateShiftConfig: z.unknown(),
          fixedSizeBucketingConfig: z.unknown(),
          redactConfig: z.unknown(),
          replaceConfig: z.unknown(),
          replaceDictionaryConfig: z.unknown(),
          replaceWithInfoTypeConfig: z.unknown(),
          timePartConfig: z.unknown(),
        }),
      })),
    }),
    recordTransformations: z.object({
      fieldTransformations: z.array(z.object({
        condition: z.object({
          expressions: z.unknown(),
        }),
        fields: z.array(z.unknown()),
        infoTypeTransformations: z.object({
          transformations: z.unknown(),
        }),
        primitiveTransformation: z.object({
          bucketingConfig: z.unknown(),
          characterMaskConfig: z.unknown(),
          cryptoDeterministicConfig: z.unknown(),
          cryptoHashConfig: z.unknown(),
          cryptoReplaceFfxFpeConfig: z.unknown(),
          dateShiftConfig: z.unknown(),
          fixedSizeBucketingConfig: z.unknown(),
          redactConfig: z.unknown(),
          replaceConfig: z.unknown(),
          replaceDictionaryConfig: z.unknown(),
          replaceWithInfoTypeConfig: z.unknown(),
          timePartConfig: z.unknown(),
        }),
      })),
      recordSuppressions: z.array(z.object({
        condition: z.object({
          expressions: z.unknown(),
        }),
      })),
    }),
    transformationErrorHandling: z.object({
      leaveUntransformed: z.object({}),
      throwError: z.object({}),
    }),
  }).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  name: z.string(),
  updateTime: z.string().optional(),
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
  deidentifyTemplate: z.object({
    createTime: z.string().describe(
      "Output only. The creation timestamp of an inspectTemplate.",
    ).optional(),
    deidentifyConfig: z.object({
      imageTransformations: z.object({
        transforms: z.array(z.object({
          allInfoTypes: z.unknown().describe(
            "Apply transformation to all findings not specified in other ImageTransformation's selected_info_types. Only one instance is allowed within the ImageTransformations message.",
          ).optional(),
          allText: z.unknown().describe(
            "Apply transformation to all text that doesn't match an infoType. Only one instance is allowed within the ImageTransformations message.",
          ).optional(),
          redactionColor: z.unknown().describe(
            "The color to use when redacting content from an image. If not specified, the default is black.",
          ).optional(),
          selectedInfoTypes: z.unknown().describe(
            "Apply transformation to the selected info_types.",
          ).optional(),
        })).describe("List of transforms to make.").optional(),
      }).describe("Treat the dataset as an image and redact.").optional(),
      infoTypeTransformations: z.object({
        transformations: z.array(z.object({
          infoTypes: z.unknown().describe(
            "InfoTypes to apply the transformation to. An empty list will cause this transformation to apply to all findings that correspond to infoTypes that were requested in `InspectConfig`.",
          ).optional(),
          primitiveTransformation: z.unknown().describe(
            "Required. Primitive transformation to apply to the infoType.",
          ).optional(),
        })).describe(
          "Required. Transformation for each infoType. Cannot specify more than one for a given infoType.",
        ).optional(),
      }).describe(
        "Treat the dataset as free-form text and apply the same free text transformation everywhere.",
      ).optional(),
      recordTransformations: z.object({
        fieldTransformations: z.array(z.object({
          condition: z.unknown().describe(
            "Only apply the transformation if the condition evaluates to true for the given `RecordCondition`. The conditions are allowed to reference fields that are not used in the actual transformation. Example Use Cases: - Apply a different bucket transformation to an age column if the zip code column for the same record is within a specific range. - Redact a field if the date of birth field is greater than 85.",
          ).optional(),
          fields: z.unknown().describe(
            'Required. Input field(s) to apply the transformation to. When you have columns that reference their position within a list, omit the index from the FieldId. FieldId name matching ignores the index. For example, instead of "contact.nums[0].type", use "contact.nums.type".',
          ).optional(),
          infoTypeTransformations: z.unknown().describe(
            "Treat the contents of the field as free text, and selectively transform content that matches an `InfoType`.",
          ).optional(),
          primitiveTransformation: z.unknown().describe(
            "Apply the transformation to the entire field.",
          ).optional(),
        })).describe(
          "Transform the record by applying various field transformations.",
        ).optional(),
        recordSuppressions: z.array(z.object({
          condition: z.unknown().describe(
            "A condition that when it evaluates to true will result in the record being evaluated to be suppressed from the transformed content.",
          ).optional(),
        })).describe(
          "Configuration defining which records get suppressed entirely. Records that match any suppression rule are omitted from the output.",
        ).optional(),
      }).describe(
        "Treat the dataset as structured. Transformations can be applied to specific locations within structured datasets, such as transforming a column within a table.",
      ).optional(),
      transformationErrorHandling: z.object({
        leaveUntransformed: z.object({}).describe("Ignore errors").optional(),
        throwError: z.object({}).describe("Throw an error").optional(),
      }).describe(
        "Mode for handling transformation errors. If left unspecified, the default mode is `TransformationErrorHandling.ThrowError`.",
      ).optional(),
    }).describe("The core content of the template.").optional(),
    description: z.string().describe("Short description (max 256 chars).")
      .optional(),
    displayName: z.string().describe("Display name (max 256 chars).")
      .optional(),
    name: z.string().describe(
      "Output only. The template name. The template will have one of the following formats: `projects/PROJECT_ID/deidentifyTemplates/TEMPLATE_ID` OR `organizations/ORGANIZATION_ID/deidentifyTemplates/TEMPLATE_ID`",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The last update timestamp of an inspectTemplate.",
    ).optional(),
  }).describe("New DeidentifyTemplate value.").optional(),
  locationId: z.string().describe("Deprecated. This field has no effect.")
    .optional(),
  templateId: z.string().describe(
    "The template id can contain uppercase and lowercase letters, numbers, and hyphens; that is, it must match the regular expression: `[a-zA-Z\\d-_]+`. The maximum length is 100 characters. Can be empty to allow the system to generate one.",
  ).optional(),
  updateMask: z.string().describe("Mask to control which fields get updated.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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

/** Swamp extension model for Google Cloud Sensitive Data Protection (DLP) DeidentifyTemplates. Registered at `@swamp/gcp/dlp/deidentifytemplates`. */
export const model = {
  type: "@swamp/gcp/dlp/deidentifytemplates",
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
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
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
        "DeidentifyTemplates contains instructions on how to de-identify content. See ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a deidentifyTemplates",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["deidentifyTemplate"] !== undefined) {
          body["deidentifyTemplate"] = g["deidentifyTemplate"];
        }
        if (g["locationId"] !== undefined) body["locationId"] = g["locationId"];
        if (g["templateId"] !== undefined) body["templateId"] = g["templateId"];
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
          undefined,
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
      description: "Get a deidentifyTemplates",
      arguments: z.object({
        identifier: z.string().describe("The name of the deidentifyTemplates"),
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
      description: "Update deidentifyTemplates attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific deidentifyTemplates by name (e.g. one discovered by list)",
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
        if (g["deidentifyTemplate"] !== undefined) {
          body["deidentifyTemplate"] = g["deidentifyTemplate"];
        }
        if (g["updateMask"] !== undefined) body["updateMask"] = g["updateMask"];
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
          undefined,
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
      description: "Delete the deidentifyTemplates",
      arguments: z.object({
        identifier: z.string().describe("The name of the deidentifyTemplates"),
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
      description: "Sync deidentifyTemplates state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific deidentifyTemplates by name (e.g. one discovered by list)",
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
      description: "List deidentifyTemplates resources",
      arguments: z.object({
        locationId: z.string().describe("Deprecated. This field has no effect.")
          .optional(),
        orderBy: z.string().describe(
          "Comma-separated list of fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Example: `name asc,update_time, create_time desc` Supported fields are: - `create_time`: corresponds to the time the template was created. - `update_time`: corresponds to the time the template was last updated. - `name`: corresponds to the template's name. - `display_name`: corresponds to the template's display name.",
        ).optional(),
        pageSize: z.number().describe(
          "Size of the page. This value can be limited by the server. If zero server returns a page of max size 100.",
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
        if (args["locationId"] !== undefined) {
          params["locationId"] = String(args["locationId"]);
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
          "deidentifyTemplates",
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
  },
};
