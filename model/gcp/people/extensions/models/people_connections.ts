// Auto-generated extension model for @swamp/gcp/people/people-connections
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud People People.Connections.
 *
 * Information about a person merged from various data sources such as the authenticated user's contacts and profile data. Most fields can have multiple items. The items in a field have no guaranteed order, but each non-empty field is guaranteed to have exactly one field with `metadata.primary` set to true.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://people.googleapis.com/";

const LIST_CONFIG = {
  "id": "people.people.connections.list",
  "path": "v1/{+resourceName}/connections",
  "httpMethod": "GET",
  "parameterOrder": [
    "resourceName",
  ],
  "parameters": {
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "personFields": {
      "location": "query",
    },
    "requestMask.includeField": {
      "location": "query",
    },
    "requestSyncToken": {
      "location": "query",
    },
    "resourceName": {
      "location": "path",
      "required": true,
    },
    "sortOrder": {
      "location": "query",
    },
    "sources": {
      "location": "query",
    },
    "syncToken": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  addresses: z.array(z.object({
    city: z.string(),
    country: z.string(),
    countryCode: z.string(),
    extendedAddress: z.string(),
    formattedType: z.string(),
    formattedValue: z.string(),
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    poBox: z.string(),
    postalCode: z.string(),
    region: z.string(),
    streetAddress: z.string(),
    type: z.string(),
  })).optional(),
  ageRange: z.string().optional(),
  ageRanges: z.array(z.object({
    ageRange: z.string(),
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
  })).optional(),
  biographies: z.array(z.object({
    contentType: z.string(),
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    value: z.string(),
  })).optional(),
  birthdays: z.array(z.object({
    date: z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    text: z.string(),
  })).optional(),
  braggingRights: z.array(z.object({
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    value: z.string(),
  })).optional(),
  calendarUrls: z.array(z.object({
    formattedType: z.string(),
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    type: z.string(),
    url: z.string(),
  })).optional(),
  clientData: z.array(z.object({
    key: z.string(),
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    value: z.string(),
  })).optional(),
  coverPhotos: z.array(z.object({
    default: z.boolean(),
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    url: z.string(),
  })).optional(),
  emailAddresses: z.array(z.object({
    displayName: z.string(),
    formattedType: z.string(),
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    type: z.string(),
    value: z.string(),
  })).optional(),
  etag: z.string().optional(),
  events: z.array(z.object({
    date: z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
    formattedType: z.string(),
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    type: z.string(),
  })).optional(),
  externalIds: z.array(z.object({
    formattedType: z.string(),
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    type: z.string(),
    value: z.string(),
  })).optional(),
  fileAses: z.array(z.object({
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    value: z.string(),
  })).optional(),
  genders: z.array(z.object({
    addressMeAs: z.string(),
    formattedValue: z.string(),
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    value: z.string(),
  })).optional(),
  imClients: z.array(z.object({
    formattedProtocol: z.string(),
    formattedType: z.string(),
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    protocol: z.string(),
    type: z.string(),
    username: z.string(),
  })).optional(),
  interests: z.array(z.object({
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    value: z.string(),
  })).optional(),
  locales: z.array(z.object({
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    value: z.string(),
  })).optional(),
  locations: z.array(z.object({
    buildingId: z.string(),
    current: z.boolean(),
    deskCode: z.string(),
    floor: z.string(),
    floorSection: z.string(),
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    type: z.string(),
    value: z.string(),
  })).optional(),
  memberships: z.array(z.object({
    contactGroupMembership: z.object({
      contactGroupId: z.string(),
      contactGroupResourceName: z.string(),
    }),
    domainMembership: z.object({
      inViewerDomain: z.boolean(),
    }),
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
  })).optional(),
  metadata: z.object({
    deleted: z.boolean(),
    linkedPeopleResourceNames: z.array(z.string()),
    objectType: z.string(),
    previousResourceNames: z.array(z.string()),
    sources: z.array(z.object({
      etag: z.string(),
      id: z.string(),
      profileMetadata: z.object({
        objectType: z.string(),
        userTypes: z.array(z.unknown()),
      }),
      type: z.string(),
      updateTime: z.string(),
    })),
  }).optional(),
  miscKeywords: z.array(z.object({
    formattedType: z.string(),
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    type: z.string(),
    value: z.string(),
  })).optional(),
  names: z.array(z.object({
    displayName: z.string(),
    displayNameLastFirst: z.string(),
    familyName: z.string(),
    givenName: z.string(),
    honorificPrefix: z.string(),
    honorificSuffix: z.string(),
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    middleName: z.string(),
    phoneticFamilyName: z.string(),
    phoneticFullName: z.string(),
    phoneticGivenName: z.string(),
    phoneticHonorificPrefix: z.string(),
    phoneticHonorificSuffix: z.string(),
    phoneticMiddleName: z.string(),
    unstructuredName: z.string(),
  })).optional(),
  nicknames: z.array(z.object({
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    type: z.string(),
    value: z.string(),
  })).optional(),
  occupations: z.array(z.object({
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    value: z.string(),
  })).optional(),
  organizations: z.array(z.object({
    costCenter: z.string(),
    current: z.boolean(),
    department: z.string(),
    domain: z.string(),
    endDate: z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
    formattedType: z.string(),
    fullTimeEquivalentMillipercent: z.number(),
    jobDescription: z.string(),
    location: z.string(),
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    name: z.string(),
    phoneticName: z.string(),
    startDate: z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
    symbol: z.string(),
    title: z.string(),
    type: z.string(),
  })).optional(),
  phoneNumbers: z.array(z.object({
    canonicalForm: z.string(),
    formattedType: z.string(),
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    type: z.string(),
    value: z.string(),
  })).optional(),
  photos: z.array(z.object({
    default: z.boolean(),
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    url: z.string(),
  })).optional(),
  relations: z.array(z.object({
    formattedType: z.string(),
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    person: z.string(),
    type: z.string(),
  })).optional(),
  relationshipInterests: z.array(z.object({
    formattedValue: z.string(),
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    value: z.string(),
  })).optional(),
  relationshipStatuses: z.array(z.object({
    formattedValue: z.string(),
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    value: z.string(),
  })).optional(),
  residences: z.array(z.object({
    current: z.boolean(),
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    value: z.string(),
  })).optional(),
  resourceName: z.string().optional(),
  sipAddresses: z.array(z.object({
    formattedType: z.string(),
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    type: z.string(),
    value: z.string(),
  })).optional(),
  skills: z.array(z.object({
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    value: z.string(),
  })).optional(),
  taglines: z.array(z.object({
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    value: z.string(),
  })).optional(),
  urls: z.array(z.object({
    formattedType: z.string(),
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    type: z.string(),
    value: z.string(),
  })).optional(),
  userDefined: z.array(z.object({
    key: z.string(),
    metadata: z.object({
      primary: z.boolean(),
      source: z.object({
        etag: z.string(),
        id: z.string(),
        profileMetadata: z.object({
          objectType: z.unknown(),
          userTypes: z.unknown(),
        }),
        type: z.string(),
        updateTime: z.string(),
      }),
      sourcePrimary: z.boolean(),
      verified: z.boolean(),
    }),
    value: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud People People.Connections. Registered at `@swamp/gcp/people/people-connections`. */
export const model = {
  type: "@swamp/gcp/people/people-connections",
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
        "Information about a person merged from various data sources such as the authe...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a connections",
      arguments: z.object({
        identifier: z.string().describe("The name of the connections"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["resourceName"] !== undefined) {
          params["resourceName"] = String(g["resourceName"]);
        }
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
    sync: {
      description: "Sync connections state from GCP",
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
          if (g["resourceName"] !== undefined) {
            params["resourceName"] = String(g["resourceName"]);
          } else if (existing["resourceName"]) {
            params["resourceName"] = String(existing["resourceName"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          const result = await readViaList(
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
            identifier,
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
      description: "List connections resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Optional. The number of connections to include in the response. Valid values are between 1 and 1000, inclusive. Defaults to 100 if not set or set to 0.",
        ).optional(),
        personFields: z.string().describe(
          "Required. A field mask to restrict which fields on each person are returned. Multiple fields can be specified by separating them with commas. Valid values are: * addresses * ageRanges * biographies * birthdays * calendarUrls * clientData * coverPhotos * emailAddresses * events * externalIds * genders * imClients * interests * locales * locations * memberships * metadata * miscKeywords * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * sipAddresses * skills * urls * userDefined",
        ).optional(),
        requestMask_includeField: z.string().describe(
          "Required. Comma-separated list of person fields to be included in the response. Each path should start with `person.`: for example, `person.names` or `person.photos`.",
        ).optional(),
        requestSyncToken: z.boolean().describe(
          "Optional. Whether the response should return `next_sync_token` on the last page of results. It can be used to get incremental changes since the last request by setting it on the request `sync_token`. More details about sync behavior at `people.connections.list`.",
        ).optional(),
        sortOrder: z.string().describe(
          "Optional. The order in which the connections should be sorted. Defaults to `LAST_MODIFIED_ASCENDING`.",
        ).optional(),
        sources: z.string().describe(
          "Optional. A mask of what source types to return. Defaults to READ_SOURCE_TYPE_CONTACT and READ_SOURCE_TYPE_PROFILE if not set.",
        ).optional(),
        syncToken: z.string().describe(
          "Optional. A sync token, received from a previous response `next_sync_token` Provide this to retrieve only the resources changed since the last request. When syncing, all other parameters provided to `people.connections.list` must match the first call that provided the sync token. More details about sync behavior at `people.connections.list`.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["resourceName"] !== undefined) {
          params["resourceName"] = String(g["resourceName"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["personFields"] !== undefined) {
          params["personFields"] = String(args["personFields"]);
        }
        if (args["requestMask_includeField"] !== undefined) {
          params["requestMask.includeField"] = String(
            args["requestMask_includeField"],
          );
        }
        if (args["requestSyncToken"] !== undefined) {
          params["requestSyncToken"] = String(args["requestSyncToken"]);
        }
        if (args["sortOrder"] !== undefined) {
          params["sortOrder"] = String(args["sortOrder"]);
        }
        if (args["sources"] !== undefined) {
          params["sources"] = String(args["sources"]);
        }
        if (args["syncToken"] !== undefined) {
          params["syncToken"] = String(args["syncToken"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "connections",
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
