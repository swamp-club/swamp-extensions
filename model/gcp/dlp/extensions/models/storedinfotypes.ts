// Auto-generated extension model for @swamp/gcp/dlp/storedinfotypes
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Sensitive Data Protection (DLP) StoredInfoTypes.
 *
 * StoredInfoType resource message that contains information about the current version and any pending updates.
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
  return `${parent}/storedInfoTypes/${shortName}`;
}

const BASE_URL = "https://dlp.googleapis.com/";

const GET_CONFIG = {
  "id": "dlp.organizations.locations.storedInfoTypes.get",
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
  "id": "dlp.organizations.locations.storedInfoTypes.create",
  "path": "v2/{+parent}/storedInfoTypes",
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
  "id": "dlp.organizations.locations.storedInfoTypes.patch",
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
  "id": "dlp.organizations.locations.storedInfoTypes.delete",
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  config: z.object({
    description: z.string().describe(
      "Description of the StoredInfoType (max 256 characters).",
    ).optional(),
    dictionary: z.object({
      cloudStoragePath: z.object({
        path: z.string().describe(
          "A URL representing a file or path (no wildcards) in Cloud Storage. Example: `gs://[BUCKET_NAME]/dictionary.txt`",
        ).optional(),
      }).describe(
        "Message representing a single file or path in Cloud Storage.",
      ).optional(),
      wordList: z.object({
        words: z.array(z.string()).describe(
          "Words or phrases defining the dictionary. The dictionary must contain at least one phrase and every phrase must contain at least 2 characters that are letters or digits. [required]",
        ).optional(),
      }).describe(
        "Message defining a list of words or phrases to search for in the data.",
      ).optional(),
    }).describe(
      'Custom information type based on a dictionary of words or phrases. This can be used to match sensitive information specific to the data, such as a list of employee IDs or job titles. Dictionary words are case-insensitive and all characters other than letters and digits in the unicode [Basic Multilingual Plane](https://en.wikipedia.org/wiki/Plane_%28Unicode%29#Basic_Multilingual_Plane) will be replaced with whitespace when scanning for matches, so the dictionary phrase "Sam Johnson" will match all three phrases "sam johnson", "Sam, Johnson", and "Sam (Johnson)". Additionally, the characters surrounding any match must be of a different type than the adjacent characters within the word, so letters must be next to non-letters and digits next to non-digits. For example, the dictionary word "jen" will match the first three letters of the text "jen123" but will return no matches for "jennifer". Dictionary words containing a large number of characters that are not letters or digits may result in unexpected findings because such characters are treated as whitespace. The [limits](https://cloud.google.com/sensitive-data-protection/limits) page contains details about the size limits of dictionaries. For dictionaries that do not fit within these constraints, consider using `LargeCustomDictionaryConfig` in the `StoredInfoType` API.',
    ).optional(),
    displayName: z.string().describe(
      "Display name of the StoredInfoType (max 256 characters).",
    ).optional(),
    largeCustomDictionary: z.object({
      bigQueryField: z.object({
        field: z.object({
          name: z.string().describe("Name describing the field.").optional(),
        }).describe("General identifier of a data field in a storage service.")
          .optional(),
        table: z.object({
          datasetId: z.string().describe("Dataset ID of the table.").optional(),
          projectId: z.string().describe(
            "The Google Cloud project ID of the project containing the table. If omitted, project ID is inferred from the API call.",
          ).optional(),
          tableId: z.string().describe("Name of the table.").optional(),
        }).describe(
          "Message defining the location of a BigQuery table. A table is uniquely identified by its project_id, dataset_id, and table_name. Within a query a table is often referenced with a string in the format of: `:.` or `..`.",
        ).optional(),
      }).describe("Message defining a field of a BigQuery table.").optional(),
      cloudStorageFileSet: z.object({
        url: z.string().describe(
          "The url, in the format `gs:///`. Trailing wildcard in the path is allowed.",
        ).optional(),
      }).describe("Message representing a set of files in Cloud Storage.")
        .optional(),
      outputPath: z.object({
        path: z.string().describe(
          "A URL representing a file or path (no wildcards) in Cloud Storage. Example: `gs://[BUCKET_NAME]/dictionary.txt`",
        ).optional(),
      }).describe(
        "Message representing a single file or path in Cloud Storage.",
      ).optional(),
    }).describe(
      "Configuration for a custom dictionary created from a data source of any size up to the maximum size defined in the [limits](https://cloud.google.com/sensitive-data-protection/limits) page. The artifacts of dictionary creation are stored in the specified Cloud Storage location. Consider using `CustomInfoType.Dictionary` for smaller dictionaries that satisfy the size requirements.",
    ).optional(),
    regex: z.object({
      groupIndexes: z.array(z.number().int()).describe(
        "The index of the submatch to extract as findings. When not specified, the entire match is returned. No more than 3 may be included.",
      ).optional(),
      pattern: z.string().describe(
        "Pattern defining the regular expression. Its syntax (https://github.com/google/re2/wiki/Syntax) can be found under the google/re2 repository on GitHub.",
      ).optional(),
    }).describe("Message defining a custom regular expression.").optional(),
  }).describe(
    "Configuration for stored infoTypes. All fields and subfield are provided by the user. For more information, see https://cloud.google.com/sensitive-data-protection/docs/creating-custom-infotypes.",
  ).optional(),
  locationId: z.string().describe("Deprecated. This field has no effect.")
    .optional(),
  storedInfoTypeId: z.string().describe(
    "The storedInfoType ID can contain uppercase and lowercase letters, numbers, and hyphens; that is, it must match the regular expression: `[a-zA-Z\\d-_]+`. The maximum length is 100 characters. Can be empty to allow the system to generate one.",
  ).optional(),
  updateMask: z.string().describe("Mask to control which fields get updated.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  currentVersion: z.object({
    config: z.object({
      description: z.string(),
      dictionary: z.object({
        cloudStoragePath: z.object({
          path: z.string(),
        }),
        wordList: z.object({
          words: z.array(z.unknown()),
        }),
      }),
      displayName: z.string(),
      largeCustomDictionary: z.object({
        bigQueryField: z.object({
          field: z.object({
            name: z.unknown(),
          }),
          table: z.object({
            datasetId: z.unknown(),
            projectId: z.unknown(),
            tableId: z.unknown(),
          }),
        }),
        cloudStorageFileSet: z.object({
          url: z.string(),
        }),
        outputPath: z.object({
          path: z.string(),
        }),
      }),
      regex: z.object({
        groupIndexes: z.array(z.number()),
        pattern: z.string(),
      }),
    }),
    createTime: z.string(),
    errors: z.array(z.object({
      details: z.object({
        code: z.number(),
        details: z.array(z.unknown()),
        message: z.string(),
      }),
      extraInfo: z.string(),
      timestamps: z.array(z.string()),
    })),
    state: z.string(),
    stats: z.object({
      largeCustomDictionary: z.object({
        approxNumPhrases: z.string(),
      }),
    }),
  }).optional(),
  name: z.string(),
  pendingVersions: z.array(z.object({
    config: z.object({
      description: z.string(),
      dictionary: z.object({
        cloudStoragePath: z.object({
          path: z.unknown(),
        }),
        wordList: z.object({
          words: z.unknown(),
        }),
      }),
      displayName: z.string(),
      largeCustomDictionary: z.object({
        bigQueryField: z.object({
          field: z.unknown(),
          table: z.unknown(),
        }),
        cloudStorageFileSet: z.object({
          url: z.unknown(),
        }),
        outputPath: z.object({
          path: z.unknown(),
        }),
      }),
      regex: z.object({
        groupIndexes: z.array(z.unknown()),
        pattern: z.string(),
      }),
    }),
    createTime: z.string(),
    errors: z.array(z.object({
      details: z.object({
        code: z.unknown(),
        details: z.unknown(),
        message: z.unknown(),
      }),
      extraInfo: z.string(),
      timestamps: z.array(z.unknown()),
    })),
    state: z.string(),
    stats: z.object({
      largeCustomDictionary: z.object({
        approxNumPhrases: z.string(),
      }),
    }),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  config: z.object({
    description: z.string().describe(
      "Description of the StoredInfoType (max 256 characters).",
    ).optional(),
    dictionary: z.object({
      cloudStoragePath: z.object({
        path: z.string().describe(
          "A URL representing a file or path (no wildcards) in Cloud Storage. Example: `gs://[BUCKET_NAME]/dictionary.txt`",
        ).optional(),
      }).describe(
        "Message representing a single file or path in Cloud Storage.",
      ).optional(),
      wordList: z.object({
        words: z.array(z.string()).describe(
          "Words or phrases defining the dictionary. The dictionary must contain at least one phrase and every phrase must contain at least 2 characters that are letters or digits. [required]",
        ).optional(),
      }).describe(
        "Message defining a list of words or phrases to search for in the data.",
      ).optional(),
    }).describe(
      'Custom information type based on a dictionary of words or phrases. This can be used to match sensitive information specific to the data, such as a list of employee IDs or job titles. Dictionary words are case-insensitive and all characters other than letters and digits in the unicode [Basic Multilingual Plane](https://en.wikipedia.org/wiki/Plane_%28Unicode%29#Basic_Multilingual_Plane) will be replaced with whitespace when scanning for matches, so the dictionary phrase "Sam Johnson" will match all three phrases "sam johnson", "Sam, Johnson", and "Sam (Johnson)". Additionally, the characters surrounding any match must be of a different type than the adjacent characters within the word, so letters must be next to non-letters and digits next to non-digits. For example, the dictionary word "jen" will match the first three letters of the text "jen123" but will return no matches for "jennifer". Dictionary words containing a large number of characters that are not letters or digits may result in unexpected findings because such characters are treated as whitespace. The [limits](https://cloud.google.com/sensitive-data-protection/limits) page contains details about the size limits of dictionaries. For dictionaries that do not fit within these constraints, consider using `LargeCustomDictionaryConfig` in the `StoredInfoType` API.',
    ).optional(),
    displayName: z.string().describe(
      "Display name of the StoredInfoType (max 256 characters).",
    ).optional(),
    largeCustomDictionary: z.object({
      bigQueryField: z.object({
        field: z.object({
          name: z.string().describe("Name describing the field.").optional(),
        }).describe("General identifier of a data field in a storage service.")
          .optional(),
        table: z.object({
          datasetId: z.string().describe("Dataset ID of the table.").optional(),
          projectId: z.string().describe(
            "The Google Cloud project ID of the project containing the table. If omitted, project ID is inferred from the API call.",
          ).optional(),
          tableId: z.string().describe("Name of the table.").optional(),
        }).describe(
          "Message defining the location of a BigQuery table. A table is uniquely identified by its project_id, dataset_id, and table_name. Within a query a table is often referenced with a string in the format of: `:.` or `..`.",
        ).optional(),
      }).describe("Message defining a field of a BigQuery table.").optional(),
      cloudStorageFileSet: z.object({
        url: z.string().describe(
          "The url, in the format `gs:///`. Trailing wildcard in the path is allowed.",
        ).optional(),
      }).describe("Message representing a set of files in Cloud Storage.")
        .optional(),
      outputPath: z.object({
        path: z.string().describe(
          "A URL representing a file or path (no wildcards) in Cloud Storage. Example: `gs://[BUCKET_NAME]/dictionary.txt`",
        ).optional(),
      }).describe(
        "Message representing a single file or path in Cloud Storage.",
      ).optional(),
    }).describe(
      "Configuration for a custom dictionary created from a data source of any size up to the maximum size defined in the [limits](https://cloud.google.com/sensitive-data-protection/limits) page. The artifacts of dictionary creation are stored in the specified Cloud Storage location. Consider using `CustomInfoType.Dictionary` for smaller dictionaries that satisfy the size requirements.",
    ).optional(),
    regex: z.object({
      groupIndexes: z.array(z.number().int()).describe(
        "The index of the submatch to extract as findings. When not specified, the entire match is returned. No more than 3 may be included.",
      ).optional(),
      pattern: z.string().describe(
        "Pattern defining the regular expression. Its syntax (https://github.com/google/re2/wiki/Syntax) can be found under the google/re2 repository on GitHub.",
      ).optional(),
    }).describe("Message defining a custom regular expression.").optional(),
  }).describe(
    "Configuration for stored infoTypes. All fields and subfield are provided by the user. For more information, see https://cloud.google.com/sensitive-data-protection/docs/creating-custom-infotypes.",
  ).optional(),
  locationId: z.string().describe("Deprecated. This field has no effect.")
    .optional(),
  storedInfoTypeId: z.string().describe(
    "The storedInfoType ID can contain uppercase and lowercase letters, numbers, and hyphens; that is, it must match the regular expression: `[a-zA-Z\\d-_]+`. The maximum length is 100 characters. Can be empty to allow the system to generate one.",
  ).optional(),
  updateMask: z.string().describe("Mask to control which fields get updated.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Sensitive Data Protection (DLP) StoredInfoTypes. Registered at `@swamp/gcp/dlp/storedinfotypes`. */
export const model = {
  type: "@swamp/gcp/dlp/storedinfotypes",
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
        "StoredInfoType resource message that contains information about the current v...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a storedInfoTypes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["config"] !== undefined) body["config"] = g["config"];
        if (g["locationId"] !== undefined) body["locationId"] = g["locationId"];
        if (g["storedInfoTypeId"] !== undefined) {
          body["storedInfoTypeId"] = g["storedInfoTypeId"];
        }
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
      description: "Get a storedInfoTypes",
      arguments: z.object({
        identifier: z.string().describe("The name of the storedInfoTypes"),
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
      description: "Update storedInfoTypes attributes",
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
        if (g["config"] !== undefined) body["config"] = g["config"];
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
      description: "Delete the storedInfoTypes",
      arguments: z.object({
        identifier: z.string().describe("The name of the storedInfoTypes"),
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
      description: "Sync storedInfoTypes state from GCP",
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
