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

// Auto-generated extension model for @swamp/gcp/books/personalizedstream
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Books Personalizedstream.
 *
 * Returns a stream of personalized book clusters
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://books.googleapis.com/";

const GET_CONFIG = {
  "id": "books.personalizedstream.get",
  "path": "books/v1/personalizedstream/get",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "locale": {
      "location": "query",
    },
    "maxAllowedMaturityRating": {
      "location": "query",
    },
    "source": {
      "location": "query",
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
  clusters: z.array(z.object({
    banner_with_content_container: z.object({
      fillColorArgb: z.string(),
      imageUrl: z.string(),
      maskColorArgb: z.string(),
      moreButtonText: z.string(),
      moreButtonUrl: z.string(),
      textColorArgb: z.string(),
    }),
    subTitle: z.string(),
    title: z.string(),
    totalVolumes: z.number(),
    uid: z.string(),
    volumes: z.array(z.object({
      accessInfo: z.object({
        accessViewStatus: z.unknown(),
        country: z.unknown(),
        downloadAccess: z.unknown(),
        driveImportedContentLink: z.unknown(),
        embeddable: z.unknown(),
        epub: z.unknown(),
        explicitOfflineLicenseManagement: z.unknown(),
        pdf: z.unknown(),
        publicDomain: z.unknown(),
        quoteSharingAllowed: z.unknown(),
        textToSpeechPermission: z.unknown(),
        viewOrderUrl: z.unknown(),
        viewability: z.unknown(),
        webReaderLink: z.unknown(),
      }),
      etag: z.string(),
      id: z.string(),
      kind: z.string(),
      layerInfo: z.object({
        layers: z.unknown(),
      }),
      recommendedInfo: z.object({
        explanation: z.unknown(),
      }),
      saleInfo: z.object({
        buyLink: z.unknown(),
        country: z.unknown(),
        isEbook: z.unknown(),
        listPrice: z.unknown(),
        offers: z.unknown(),
        onSaleDate: z.unknown(),
        retailPrice: z.unknown(),
        saleability: z.unknown(),
      }),
      searchInfo: z.object({
        textSnippet: z.unknown(),
      }),
      selfLink: z.string(),
      userInfo: z.object({
        acquiredTime: z.unknown(),
        acquisitionType: z.unknown(),
        copy: z.unknown(),
        entitlementType: z.unknown(),
        familySharing: z.unknown(),
        isFamilySharedFromUser: z.unknown(),
        isFamilySharedToUser: z.unknown(),
        isFamilySharingAllowed: z.unknown(),
        isFamilySharingDisabledByFop: z.unknown(),
        isInMyBooks: z.unknown(),
        isPreordered: z.unknown(),
        isPurchased: z.unknown(),
        isUploaded: z.unknown(),
        readingPosition: z.unknown(),
        rentalPeriod: z.unknown(),
        rentalState: z.unknown(),
        review: z.unknown(),
        updated: z.unknown(),
        userUploadedVolumeInfo: z.unknown(),
      }),
      volumeInfo: z.object({
        allowAnonLogging: z.unknown(),
        authors: z.unknown(),
        averageRating: z.unknown(),
        canonicalVolumeLink: z.unknown(),
        categories: z.unknown(),
        comicsContent: z.unknown(),
        contentVersion: z.unknown(),
        description: z.unknown(),
        dimensions: z.unknown(),
        imageLinks: z.unknown(),
        industryIdentifiers: z.unknown(),
        infoLink: z.unknown(),
        language: z.unknown(),
        mainCategory: z.unknown(),
        maturityRating: z.unknown(),
        pageCount: z.unknown(),
        panelizationSummary: z.unknown(),
        previewLink: z.unknown(),
        printType: z.unknown(),
        printedPageCount: z.unknown(),
        publishedDate: z.unknown(),
        publisher: z.unknown(),
        ratingsCount: z.unknown(),
        readingModes: z.unknown(),
        samplePageCount: z.unknown(),
        seriesInfo: z.unknown(),
        subtitle: z.unknown(),
        title: z.unknown(),
      }),
    })),
  })).optional(),
  kind: z.string().optional(),
  totalClusters: z.number().optional(),
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

/** Swamp extension model for Google Cloud Books Personalizedstream. Registered at `@swamp/gcp/books/personalizedstream`. */
export const model = {
  type: "@swamp/gcp/books/personalizedstream",
  version: "2026.06.08.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Returns a stream of personalized book clusters",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a personalizedstream",
      arguments: z.object({
        identifier: z.string().describe("The name of the personalizedstream"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
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
    sync: {
      description: "Sync personalizedstream state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        try {
          const params: Record<string, string> = { project: projectId };
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
  },
};
