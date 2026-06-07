// Auto-generated extension model for @swamp/gcp/people/people
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud People People.
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
  createResource,
  deleteResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://people.googleapis.com/";

const GET_CONFIG = {
  "id": "people.people.get",
  "path": "v1/{+resourceName}",
  "httpMethod": "GET",
  "parameterOrder": [
    "resourceName",
  ],
  "parameters": {
    "personFields": {
      "location": "query",
    },
    "requestMask.includeField": {
      "location": "query",
    },
    "resourceName": {
      "location": "path",
      "required": true,
    },
    "sources": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "people.people.deleteContact",
  "path": "v1/{+resourceName}:deleteContact",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "resourceName",
  ],
  "parameters": {
    "resourceName": {
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
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

/** Swamp extension model for Google Cloud People People. Registered at `@swamp/gcp/people/people`. */
export const model = {
  type: "@swamp/gcp/people/people",
  version: "2026.06.07.1",
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
      description: "Get a people",
      arguments: z.object({
        identifier: z.string().describe("The name of the people"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["resourceName"] = args.identifier;
        const result = await readResource(
          BASE_URL,
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
    delete: {
      description: "Delete the people",
      arguments: z.object({
        identifier: z.string().describe("The name of the people"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["resourceName"] = args.identifier;
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
      description: "Sync people state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["resourceName"] = identifier;
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
    batch_create_contacts: {
      description: "batch create contacts",
      arguments: z.object({
        contacts: z.any().optional(),
        readMask: z.any().optional(),
        sources: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["contacts"] !== undefined) body["contacts"] = args["contacts"];
        if (args["readMask"] !== undefined) body["readMask"] = args["readMask"];
        if (args["sources"] !== undefined) body["sources"] = args["sources"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "people.people.batchCreateContacts",
            "path": "v1/people:batchCreateContacts",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {},
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
    batch_delete_contacts: {
      description: "batch delete contacts",
      arguments: z.object({
        resourceNames: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["resourceNames"] !== undefined) {
          body["resourceNames"] = args["resourceNames"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "people.people.batchDeleteContacts",
            "path": "v1/people:batchDeleteContacts",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {},
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
    batch_update_contacts: {
      description: "batch update contacts",
      arguments: z.object({
        contacts: z.any().optional(),
        readMask: z.any().optional(),
        sources: z.any().optional(),
        updateMask: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["contacts"] !== undefined) body["contacts"] = args["contacts"];
        if (args["readMask"] !== undefined) body["readMask"] = args["readMask"];
        if (args["sources"] !== undefined) body["sources"] = args["sources"];
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "people.people.batchUpdateContacts",
            "path": "v1/people:batchUpdateContacts",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {},
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
    create_contact: {
      description: "create contact",
      arguments: z.object({
        addresses: z.any().optional(),
        ageRange: z.any().optional(),
        ageRanges: z.any().optional(),
        biographies: z.any().optional(),
        birthdays: z.any().optional(),
        braggingRights: z.any().optional(),
        calendarUrls: z.any().optional(),
        clientData: z.any().optional(),
        coverPhotos: z.any().optional(),
        emailAddresses: z.any().optional(),
        etag: z.any().optional(),
        events: z.any().optional(),
        externalIds: z.any().optional(),
        fileAses: z.any().optional(),
        genders: z.any().optional(),
        imClients: z.any().optional(),
        interests: z.any().optional(),
        locales: z.any().optional(),
        locations: z.any().optional(),
        memberships: z.any().optional(),
        metadata: z.any().optional(),
        miscKeywords: z.any().optional(),
        names: z.any().optional(),
        nicknames: z.any().optional(),
        occupations: z.any().optional(),
        organizations: z.any().optional(),
        phoneNumbers: z.any().optional(),
        photos: z.any().optional(),
        relations: z.any().optional(),
        relationshipInterests: z.any().optional(),
        relationshipStatuses: z.any().optional(),
        residences: z.any().optional(),
        resourceName: z.any().optional(),
        sipAddresses: z.any().optional(),
        skills: z.any().optional(),
        taglines: z.any().optional(),
        urls: z.any().optional(),
        userDefined: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["addresses"] !== undefined) {
          body["addresses"] = args["addresses"];
        }
        if (args["ageRange"] !== undefined) body["ageRange"] = args["ageRange"];
        if (args["ageRanges"] !== undefined) {
          body["ageRanges"] = args["ageRanges"];
        }
        if (args["biographies"] !== undefined) {
          body["biographies"] = args["biographies"];
        }
        if (args["birthdays"] !== undefined) {
          body["birthdays"] = args["birthdays"];
        }
        if (args["braggingRights"] !== undefined) {
          body["braggingRights"] = args["braggingRights"];
        }
        if (args["calendarUrls"] !== undefined) {
          body["calendarUrls"] = args["calendarUrls"];
        }
        if (args["clientData"] !== undefined) {
          body["clientData"] = args["clientData"];
        }
        if (args["coverPhotos"] !== undefined) {
          body["coverPhotos"] = args["coverPhotos"];
        }
        if (args["emailAddresses"] !== undefined) {
          body["emailAddresses"] = args["emailAddresses"];
        }
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["events"] !== undefined) body["events"] = args["events"];
        if (args["externalIds"] !== undefined) {
          body["externalIds"] = args["externalIds"];
        }
        if (args["fileAses"] !== undefined) body["fileAses"] = args["fileAses"];
        if (args["genders"] !== undefined) body["genders"] = args["genders"];
        if (args["imClients"] !== undefined) {
          body["imClients"] = args["imClients"];
        }
        if (args["interests"] !== undefined) {
          body["interests"] = args["interests"];
        }
        if (args["locales"] !== undefined) body["locales"] = args["locales"];
        if (args["locations"] !== undefined) {
          body["locations"] = args["locations"];
        }
        if (args["memberships"] !== undefined) {
          body["memberships"] = args["memberships"];
        }
        if (args["metadata"] !== undefined) body["metadata"] = args["metadata"];
        if (args["miscKeywords"] !== undefined) {
          body["miscKeywords"] = args["miscKeywords"];
        }
        if (args["names"] !== undefined) body["names"] = args["names"];
        if (args["nicknames"] !== undefined) {
          body["nicknames"] = args["nicknames"];
        }
        if (args["occupations"] !== undefined) {
          body["occupations"] = args["occupations"];
        }
        if (args["organizations"] !== undefined) {
          body["organizations"] = args["organizations"];
        }
        if (args["phoneNumbers"] !== undefined) {
          body["phoneNumbers"] = args["phoneNumbers"];
        }
        if (args["photos"] !== undefined) body["photos"] = args["photos"];
        if (args["relations"] !== undefined) {
          body["relations"] = args["relations"];
        }
        if (args["relationshipInterests"] !== undefined) {
          body["relationshipInterests"] = args["relationshipInterests"];
        }
        if (args["relationshipStatuses"] !== undefined) {
          body["relationshipStatuses"] = args["relationshipStatuses"];
        }
        if (args["residences"] !== undefined) {
          body["residences"] = args["residences"];
        }
        if (args["resourceName"] !== undefined) {
          body["resourceName"] = args["resourceName"];
        }
        if (args["sipAddresses"] !== undefined) {
          body["sipAddresses"] = args["sipAddresses"];
        }
        if (args["skills"] !== undefined) body["skills"] = args["skills"];
        if (args["taglines"] !== undefined) body["taglines"] = args["taglines"];
        if (args["urls"] !== undefined) body["urls"] = args["urls"];
        if (args["userDefined"] !== undefined) {
          body["userDefined"] = args["userDefined"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "people.people.createContact",
            "path": "v1/people:createContact",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {
              "personFields": { "location": "query" },
              "sources": { "location": "query" },
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
    get_batch_get: {
      description: "get batch get",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "people.people.getBatchGet",
            "path": "v1/people:batchGet",
            "httpMethod": "GET",
            "parameterOrder": [],
            "parameters": {
              "personFields": { "location": "query" },
              "requestMask.includeField": { "location": "query" },
              "resourceNames": { "location": "query" },
              "sources": { "location": "query" },
            },
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
    list_directory_people: {
      description: "list directory people",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "people.people.listDirectoryPeople",
            "path": "v1/people:listDirectoryPeople",
            "httpMethod": "GET",
            "parameterOrder": [],
            "parameters": {
              "mergeSources": { "location": "query" },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "readMask": { "location": "query" },
              "requestSyncToken": { "location": "query" },
              "sources": { "location": "query" },
              "syncToken": { "location": "query" },
            },
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
    search_contacts: {
      description: "search contacts",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "people.people.searchContacts",
            "path": "v1/people:searchContacts",
            "httpMethod": "GET",
            "parameterOrder": [],
            "parameters": {
              "pageSize": { "location": "query" },
              "query": { "location": "query" },
              "readMask": { "location": "query" },
              "sources": { "location": "query" },
            },
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
    search_directory_people: {
      description: "search directory people",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "people.people.searchDirectoryPeople",
            "path": "v1/people:searchDirectoryPeople",
            "httpMethod": "GET",
            "parameterOrder": [],
            "parameters": {
              "mergeSources": { "location": "query" },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "query": { "location": "query" },
              "readMask": { "location": "query" },
              "sources": { "location": "query" },
            },
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
    update_contact: {
      description: "update contact",
      arguments: z.object({
        addresses: z.any().optional(),
        ageRange: z.any().optional(),
        ageRanges: z.any().optional(),
        biographies: z.any().optional(),
        birthdays: z.any().optional(),
        braggingRights: z.any().optional(),
        calendarUrls: z.any().optional(),
        clientData: z.any().optional(),
        coverPhotos: z.any().optional(),
        emailAddresses: z.any().optional(),
        etag: z.any().optional(),
        events: z.any().optional(),
        externalIds: z.any().optional(),
        fileAses: z.any().optional(),
        genders: z.any().optional(),
        imClients: z.any().optional(),
        interests: z.any().optional(),
        locales: z.any().optional(),
        locations: z.any().optional(),
        memberships: z.any().optional(),
        metadata: z.any().optional(),
        miscKeywords: z.any().optional(),
        names: z.any().optional(),
        nicknames: z.any().optional(),
        occupations: z.any().optional(),
        organizations: z.any().optional(),
        phoneNumbers: z.any().optional(),
        photos: z.any().optional(),
        relations: z.any().optional(),
        relationshipInterests: z.any().optional(),
        relationshipStatuses: z.any().optional(),
        residences: z.any().optional(),
        resourceName: z.any().optional(),
        sipAddresses: z.any().optional(),
        skills: z.any().optional(),
        taglines: z.any().optional(),
        urls: z.any().optional(),
        userDefined: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        params["resourceName"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["addresses"] !== undefined) {
          body["addresses"] = args["addresses"];
        }
        if (args["ageRange"] !== undefined) body["ageRange"] = args["ageRange"];
        if (args["ageRanges"] !== undefined) {
          body["ageRanges"] = args["ageRanges"];
        }
        if (args["biographies"] !== undefined) {
          body["biographies"] = args["biographies"];
        }
        if (args["birthdays"] !== undefined) {
          body["birthdays"] = args["birthdays"];
        }
        if (args["braggingRights"] !== undefined) {
          body["braggingRights"] = args["braggingRights"];
        }
        if (args["calendarUrls"] !== undefined) {
          body["calendarUrls"] = args["calendarUrls"];
        }
        if (args["clientData"] !== undefined) {
          body["clientData"] = args["clientData"];
        }
        if (args["coverPhotos"] !== undefined) {
          body["coverPhotos"] = args["coverPhotos"];
        }
        if (args["emailAddresses"] !== undefined) {
          body["emailAddresses"] = args["emailAddresses"];
        }
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["events"] !== undefined) body["events"] = args["events"];
        if (args["externalIds"] !== undefined) {
          body["externalIds"] = args["externalIds"];
        }
        if (args["fileAses"] !== undefined) body["fileAses"] = args["fileAses"];
        if (args["genders"] !== undefined) body["genders"] = args["genders"];
        if (args["imClients"] !== undefined) {
          body["imClients"] = args["imClients"];
        }
        if (args["interests"] !== undefined) {
          body["interests"] = args["interests"];
        }
        if (args["locales"] !== undefined) body["locales"] = args["locales"];
        if (args["locations"] !== undefined) {
          body["locations"] = args["locations"];
        }
        if (args["memberships"] !== undefined) {
          body["memberships"] = args["memberships"];
        }
        if (args["metadata"] !== undefined) body["metadata"] = args["metadata"];
        if (args["miscKeywords"] !== undefined) {
          body["miscKeywords"] = args["miscKeywords"];
        }
        if (args["names"] !== undefined) body["names"] = args["names"];
        if (args["nicknames"] !== undefined) {
          body["nicknames"] = args["nicknames"];
        }
        if (args["occupations"] !== undefined) {
          body["occupations"] = args["occupations"];
        }
        if (args["organizations"] !== undefined) {
          body["organizations"] = args["organizations"];
        }
        if (args["phoneNumbers"] !== undefined) {
          body["phoneNumbers"] = args["phoneNumbers"];
        }
        if (args["photos"] !== undefined) body["photos"] = args["photos"];
        if (args["relations"] !== undefined) {
          body["relations"] = args["relations"];
        }
        if (args["relationshipInterests"] !== undefined) {
          body["relationshipInterests"] = args["relationshipInterests"];
        }
        if (args["relationshipStatuses"] !== undefined) {
          body["relationshipStatuses"] = args["relationshipStatuses"];
        }
        if (args["residences"] !== undefined) {
          body["residences"] = args["residences"];
        }
        if (args["resourceName"] !== undefined) {
          body["resourceName"] = args["resourceName"];
        }
        if (args["sipAddresses"] !== undefined) {
          body["sipAddresses"] = args["sipAddresses"];
        }
        if (args["skills"] !== undefined) body["skills"] = args["skills"];
        if (args["taglines"] !== undefined) body["taglines"] = args["taglines"];
        if (args["urls"] !== undefined) body["urls"] = args["urls"];
        if (args["userDefined"] !== undefined) {
          body["userDefined"] = args["userDefined"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "people.people.updateContact",
            "path": "v1/{+resourceName}:updateContact",
            "httpMethod": "PATCH",
            "parameterOrder": ["resourceName"],
            "parameters": {
              "personFields": { "location": "query" },
              "resourceName": { "location": "path", "required": true },
              "sources": { "location": "query" },
              "updatePersonFields": { "location": "query" },
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
    update_contact_photo: {
      description: "update contact photo",
      arguments: z.object({
        personFields: z.any().optional(),
        photoBytes: z.any().optional(),
        sources: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        params["resourceName"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["personFields"] !== undefined) {
          body["personFields"] = args["personFields"];
        }
        if (args["photoBytes"] !== undefined) {
          body["photoBytes"] = args["photoBytes"];
        }
        if (args["sources"] !== undefined) body["sources"] = args["sources"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "people.people.updateContactPhoto",
            "path": "v1/{+resourceName}:updateContactPhoto",
            "httpMethod": "PATCH",
            "parameterOrder": ["resourceName"],
            "parameters": {
              "resourceName": { "location": "path", "required": true },
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
