// Auto-generated extension model for @swamp/gcp/dlp/deidentifytemplates
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Sensitive Data Protection (DLP) DeidentifyTemplates.
 *
 * DeidentifyTemplates contains instructions on how to de-identify content. See https://cloud.google.com/sensitive-data-protection/docs/concepts-templates to learn more.
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
  deidentifyTemplate: z.object({
    createTime: z.string().describe(
      "Output only. The creation timestamp of an inspectTemplate.",
    ).optional(),
    deidentifyConfig: z.object({
      imageTransformations: z.object({
        transforms: z.array(z.object({
          allInfoTypes: z.unknown().describe(
            "Apply transformation to all findings.",
          ).optional(),
          allText: z.unknown().describe("Apply to all text.").optional(),
          redactionColor: z.unknown().describe(
            "Represents a color in the RGB color space.",
          ).optional(),
          selectedInfoTypes: z.unknown().describe(
            "Apply transformation to the selected info_types.",
          ).optional(),
        })).describe("List of transforms to make.").optional(),
      }).describe("A type of transformation that is applied over images.")
        .optional(),
      infoTypeTransformations: z.object({
        transformations: z.array(z.object({
          infoTypes: z.unknown().describe(
            "InfoTypes to apply the transformation to. An empty list will cause this transformation to apply to all findings that correspond to infoTypes that were requested in `InspectConfig`.",
          ).optional(),
          primitiveTransformation: z.unknown().describe(
            "A rule for transforming a value.",
          ).optional(),
        })).describe(
          "Required. Transformation for each infoType. Cannot specify more than one for a given infoType.",
        ).optional(),
      }).describe(
        "A type of transformation that will scan unstructured text and apply various `PrimitiveTransformation`s to each finding, where the transformation is applied to only values that were identified as a specific info_type.",
      ).optional(),
      recordTransformations: z.object({
        fieldTransformations: z.array(z.object({
          condition: z.unknown().describe(
            "A condition for determining whether a transformation should be applied to a field.",
          ).optional(),
          fields: z.unknown().describe(
            'Required. Input field(s) to apply the transformation to. When you have columns that reference their position within a list, omit the index from the FieldId. FieldId name matching ignores the index. For example, instead of "contact.nums[0].type", use "contact.nums.type".',
          ).optional(),
          infoTypeTransformations: z.unknown().describe(
            "A type of transformation that will scan unstructured text and apply various `PrimitiveTransformation`s to each finding, where the transformation is applied to only values that were identified as a specific info_type.",
          ).optional(),
          primitiveTransformation: z.unknown().describe(
            "A rule for transforming a value.",
          ).optional(),
        })).describe(
          "Transform the record by applying various field transformations.",
        ).optional(),
        recordSuppressions: z.array(z.object({
          condition: z.unknown().describe(
            "A condition for determining whether a transformation should be applied to a field.",
          ).optional(),
        })).describe(
          "Configuration defining which records get suppressed entirely. Records that match any suppression rule are omitted from the output.",
        ).optional(),
      }).describe(
        "A type of transformation that is applied over structured data such as a table.",
      ).optional(),
      transformationErrorHandling: z.object({
        leaveUntransformed: z.object({}).describe(
          "Skips the data without modifying it if the requested transformation would cause an error. For example, if a `DateShift` transformation were applied an an IP address, this mode would leave the IP address unchanged in the response.",
        ).optional(),
        throwError: z.object({}).describe(
          "Throw an error and fail the request when a transformation error occurs.",
        ).optional(),
      }).describe(
        "How to handle transformation errors during de-identification. A transformation error occurs when the requested transformation is incompatible with the data. For example, trying to de-identify an IP address using a `DateShift` transformation would result in a transformation error, since date info cannot be extracted from an IP address. Information about any incompatible transformations, and how they were handled, is returned in the response as part of the `TransformationOverviews`.",
      ).optional(),
    }).describe("The configuration that controls how the data will change.")
      .optional(),
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
  }).describe(
    "DeidentifyTemplates contains instructions on how to de-identify content. See https://cloud.google.com/sensitive-data-protection/docs/concepts-templates to learn more.",
  ).optional(),
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
  deidentifyTemplate: z.object({
    createTime: z.string().describe(
      "Output only. The creation timestamp of an inspectTemplate.",
    ).optional(),
    deidentifyConfig: z.object({
      imageTransformations: z.object({
        transforms: z.array(z.object({
          allInfoTypes: z.unknown().describe(
            "Apply transformation to all findings.",
          ).optional(),
          allText: z.unknown().describe("Apply to all text.").optional(),
          redactionColor: z.unknown().describe(
            "Represents a color in the RGB color space.",
          ).optional(),
          selectedInfoTypes: z.unknown().describe(
            "Apply transformation to the selected info_types.",
          ).optional(),
        })).describe("List of transforms to make.").optional(),
      }).describe("A type of transformation that is applied over images.")
        .optional(),
      infoTypeTransformations: z.object({
        transformations: z.array(z.object({
          infoTypes: z.unknown().describe(
            "InfoTypes to apply the transformation to. An empty list will cause this transformation to apply to all findings that correspond to infoTypes that were requested in `InspectConfig`.",
          ).optional(),
          primitiveTransformation: z.unknown().describe(
            "A rule for transforming a value.",
          ).optional(),
        })).describe(
          "Required. Transformation for each infoType. Cannot specify more than one for a given infoType.",
        ).optional(),
      }).describe(
        "A type of transformation that will scan unstructured text and apply various `PrimitiveTransformation`s to each finding, where the transformation is applied to only values that were identified as a specific info_type.",
      ).optional(),
      recordTransformations: z.object({
        fieldTransformations: z.array(z.object({
          condition: z.unknown().describe(
            "A condition for determining whether a transformation should be applied to a field.",
          ).optional(),
          fields: z.unknown().describe(
            'Required. Input field(s) to apply the transformation to. When you have columns that reference their position within a list, omit the index from the FieldId. FieldId name matching ignores the index. For example, instead of "contact.nums[0].type", use "contact.nums.type".',
          ).optional(),
          infoTypeTransformations: z.unknown().describe(
            "A type of transformation that will scan unstructured text and apply various `PrimitiveTransformation`s to each finding, where the transformation is applied to only values that were identified as a specific info_type.",
          ).optional(),
          primitiveTransformation: z.unknown().describe(
            "A rule for transforming a value.",
          ).optional(),
        })).describe(
          "Transform the record by applying various field transformations.",
        ).optional(),
        recordSuppressions: z.array(z.object({
          condition: z.unknown().describe(
            "A condition for determining whether a transformation should be applied to a field.",
          ).optional(),
        })).describe(
          "Configuration defining which records get suppressed entirely. Records that match any suppression rule are omitted from the output.",
        ).optional(),
      }).describe(
        "A type of transformation that is applied over structured data such as a table.",
      ).optional(),
      transformationErrorHandling: z.object({
        leaveUntransformed: z.object({}).describe(
          "Skips the data without modifying it if the requested transformation would cause an error. For example, if a `DateShift` transformation were applied an an IP address, this mode would leave the IP address unchanged in the response.",
        ).optional(),
        throwError: z.object({}).describe(
          "Throw an error and fail the request when a transformation error occurs.",
        ).optional(),
      }).describe(
        "How to handle transformation errors during de-identification. A transformation error occurs when the requested transformation is incompatible with the data. For example, trying to de-identify an IP address using a `DateShift` transformation would result in a transformation error, since date info cannot be extracted from an IP address. Information about any incompatible transformations, and how they were handled, is returned in the response as part of the `TransformationOverviews`.",
      ).optional(),
    }).describe("The configuration that controls how the data will change.")
      .optional(),
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
  }).describe(
    "DeidentifyTemplates contains instructions on how to de-identify content. See https://cloud.google.com/sensitive-data-protection/docs/concepts-templates to learn more.",
  ).optional(),
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

/** Swamp extension model for Google Cloud Sensitive Data Protection (DLP) DeidentifyTemplates. Registered at `@swamp/gcp/dlp/deidentifytemplates`. */
export const model = {
  type: "@swamp/gcp/dlp/deidentifytemplates",
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
        const projectId = await getProjectId();
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
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
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
      description: "Get a deidentifyTemplates",
      arguments: z.object({
        identifier: z.string().describe("The name of the deidentifyTemplates"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Update deidentifyTemplates attributes",
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
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
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
      description: "Delete the deidentifyTemplates",
      arguments: z.object({
        identifier: z.string().describe("The name of the deidentifyTemplates"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Sync deidentifyTemplates state from GCP",
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
            String(g["parent"] ?? ""),
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
