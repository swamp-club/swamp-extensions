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

// Auto-generated extension model for @swamp/gcp/docs/documents
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Docs Documents.
 *
 * A Google Docs document.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://docs.googleapis.com/";

const GET_CONFIG = {
  "id": "docs.documents.get",
  "path": "v1/documents/{documentId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "documentId",
  ],
  "parameters": {
    "commentsViewMode": {
      "location": "query",
    },
    "documentId": {
      "location": "path",
      "required": true,
    },
    "includeTabsContent": {
      "location": "query",
    },
    "suggestionsViewMode": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "docs.documents.create",
  "path": "v1/documents",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const _defaultOAuthScopes: string[] = [
  "https://www.googleapis.com/auth/documents",
  "https://www.googleapis.com/auth/documents.readonly",
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.readonly",
];

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
  title: z.string().describe("The title of the document.").optional(),
});

const StateSchema = z.object({
  body: z.object({
    content: z.array(z.object({
      endIndex: z.number(),
      paragraph: z.object({
        bullet: z.object({
          listId: z.unknown(),
          nestingLevel: z.unknown(),
          textStyle: z.unknown(),
        }),
        elements: z.array(z.unknown()),
        paragraphStyle: z.object({
          alignment: z.unknown(),
          avoidWidowAndOrphan: z.unknown(),
          borderBetween: z.unknown(),
          borderBottom: z.unknown(),
          borderLeft: z.unknown(),
          borderRight: z.unknown(),
          borderTop: z.unknown(),
          direction: z.unknown(),
          headingId: z.unknown(),
          indentEnd: z.unknown(),
          indentFirstLine: z.unknown(),
          indentStart: z.unknown(),
          keepLinesTogether: z.unknown(),
          keepWithNext: z.unknown(),
          lineSpacing: z.unknown(),
          namedStyleType: z.unknown(),
          pageBreakBefore: z.unknown(),
          shading: z.unknown(),
          spaceAbove: z.unknown(),
          spaceBelow: z.unknown(),
          spacingMode: z.unknown(),
          tabStops: z.unknown(),
        }),
        positionedObjectIds: z.array(z.unknown()),
        suggestedBulletChanges: z.record(z.string(), z.unknown()),
        suggestedParagraphStyleChanges: z.record(z.string(), z.unknown()),
        suggestedPositionedObjectIds: z.record(z.string(), z.unknown()),
      }),
      sectionBreak: z.object({
        sectionStyle: z.object({
          columnProperties: z.unknown(),
          columnSeparatorStyle: z.unknown(),
          contentDirection: z.unknown(),
          defaultFooterId: z.unknown(),
          defaultHeaderId: z.unknown(),
          evenPageFooterId: z.unknown(),
          evenPageHeaderId: z.unknown(),
          firstPageFooterId: z.unknown(),
          firstPageHeaderId: z.unknown(),
          flipPageOrientation: z.unknown(),
          marginBottom: z.unknown(),
          marginFooter: z.unknown(),
          marginHeader: z.unknown(),
          marginLeft: z.unknown(),
          marginRight: z.unknown(),
          marginTop: z.unknown(),
          pageNumberStart: z.unknown(),
          sectionType: z.unknown(),
          useFirstPageHeaderFooter: z.unknown(),
        }),
        suggestedDeletionIds: z.array(z.unknown()),
        suggestedInsertionIds: z.array(z.unknown()),
      }),
      startIndex: z.number(),
      table: z.object({
        columns: z.number(),
        rows: z.number(),
        suggestedDeletionIds: z.array(z.unknown()),
        suggestedInsertionIds: z.array(z.unknown()),
        tableRows: z.array(z.unknown()),
        tableStyle: z.object({
          tableColumnProperties: z.unknown(),
        }),
      }),
      tableOfContents: z.object({
        content: z.array(z.unknown()),
        suggestedDeletionIds: z.array(z.unknown()),
        suggestedInsertionIds: z.array(z.unknown()),
      }),
    })),
  }).optional(),
  comments: z.array(z.object({
    anchorId: z.string(),
    commentId: z.string(),
    headPost: z.object({
      assigneeEmail: z.string(),
      author: z.object({
        anonymous: z.boolean(),
        displayName: z.string(),
        me: z.boolean(),
        user: z.string(),
      }),
      commentAction: z.string(),
      content: z.string(),
      contentHtml: z.string(),
      createTime: z.string(),
      deleted: z.boolean(),
      fromCopiedDocument: z.boolean(),
      fromDocumentComparison: z.boolean(),
      fromImportedDocument: z.boolean(),
      postId: z.string(),
      suggestionAction: z.string(),
      updateTime: z.string(),
    }),
    plainTextQuote: z.string(),
    replies: z.array(z.object({
      assigneeEmail: z.string(),
      author: z.object({
        anonymous: z.unknown(),
        displayName: z.unknown(),
        me: z.unknown(),
        user: z.unknown(),
      }),
      commentAction: z.string(),
      content: z.string(),
      contentHtml: z.string(),
      createTime: z.string(),
      deleted: z.boolean(),
      fromCopiedDocument: z.boolean(),
      fromDocumentComparison: z.boolean(),
      fromImportedDocument: z.boolean(),
      postId: z.string(),
      suggestionAction: z.string(),
      updateTime: z.string(),
    })),
    status: z.string(),
  })).optional(),
  commentsViewMode: z.string().optional(),
  documentId: z.string().optional(),
  documentStyle: z.object({
    background: z.object({
      color: z.object({
        color: z.object({
          rgbColor: z.object({
            blue: z.unknown(),
            green: z.unknown(),
            red: z.unknown(),
          }),
        }),
      }),
    }),
    defaultFooterId: z.string(),
    defaultHeaderId: z.string(),
    documentFormat: z.object({
      documentMode: z.string(),
    }),
    evenPageFooterId: z.string(),
    evenPageHeaderId: z.string(),
    firstPageFooterId: z.string(),
    firstPageHeaderId: z.string(),
    flipPageOrientation: z.boolean(),
    marginBottom: z.object({
      magnitude: z.number(),
      unit: z.string(),
    }),
    marginFooter: z.object({
      magnitude: z.number(),
      unit: z.string(),
    }),
    marginHeader: z.object({
      magnitude: z.number(),
      unit: z.string(),
    }),
    marginLeft: z.object({
      magnitude: z.number(),
      unit: z.string(),
    }),
    marginRight: z.object({
      magnitude: z.number(),
      unit: z.string(),
    }),
    marginTop: z.object({
      magnitude: z.number(),
      unit: z.string(),
    }),
    pageNumberStart: z.number(),
    pageSize: z.object({
      height: z.object({
        magnitude: z.number(),
        unit: z.string(),
      }),
      width: z.object({
        magnitude: z.number(),
        unit: z.string(),
      }),
    }),
    useCustomHeaderFooterMargins: z.boolean(),
    useEvenPageHeaderFooter: z.boolean(),
    useFirstPageHeaderFooter: z.boolean(),
  }).optional(),
  footers: z.record(z.string(), z.unknown()).optional(),
  footnotes: z.record(z.string(), z.unknown()).optional(),
  headers: z.record(z.string(), z.unknown()).optional(),
  inlineObjects: z.record(z.string(), z.unknown()).optional(),
  lists: z.record(z.string(), z.unknown()).optional(),
  namedRanges: z.record(z.string(), z.unknown()).optional(),
  namedStyles: z.object({
    styles: z.array(z.object({
      namedStyleType: z.string(),
      paragraphStyle: z.object({
        alignment: z.string(),
        avoidWidowAndOrphan: z.boolean(),
        borderBetween: z.object({
          color: z.unknown(),
          dashStyle: z.unknown(),
          padding: z.unknown(),
          width: z.unknown(),
        }),
        borderBottom: z.object({
          color: z.unknown(),
          dashStyle: z.unknown(),
          padding: z.unknown(),
          width: z.unknown(),
        }),
        borderLeft: z.object({
          color: z.unknown(),
          dashStyle: z.unknown(),
          padding: z.unknown(),
          width: z.unknown(),
        }),
        borderRight: z.object({
          color: z.unknown(),
          dashStyle: z.unknown(),
          padding: z.unknown(),
          width: z.unknown(),
        }),
        borderTop: z.object({
          color: z.unknown(),
          dashStyle: z.unknown(),
          padding: z.unknown(),
          width: z.unknown(),
        }),
        direction: z.string(),
        headingId: z.string(),
        indentEnd: z.object({
          magnitude: z.unknown(),
          unit: z.unknown(),
        }),
        indentFirstLine: z.object({
          magnitude: z.unknown(),
          unit: z.unknown(),
        }),
        indentStart: z.object({
          magnitude: z.unknown(),
          unit: z.unknown(),
        }),
        keepLinesTogether: z.boolean(),
        keepWithNext: z.boolean(),
        lineSpacing: z.number(),
        namedStyleType: z.string(),
        pageBreakBefore: z.boolean(),
        shading: z.object({
          backgroundColor: z.unknown(),
        }),
        spaceAbove: z.object({
          magnitude: z.unknown(),
          unit: z.unknown(),
        }),
        spaceBelow: z.object({
          magnitude: z.unknown(),
          unit: z.unknown(),
        }),
        spacingMode: z.string(),
        tabStops: z.array(z.unknown()),
      }),
      textStyle: z.object({
        backgroundColor: z.object({
          color: z.unknown(),
        }),
        baselineOffset: z.string(),
        bold: z.boolean(),
        fontSize: z.object({
          magnitude: z.unknown(),
          unit: z.unknown(),
        }),
        foregroundColor: z.object({
          color: z.unknown(),
        }),
        italic: z.boolean(),
        link: z.object({
          bookmark: z.unknown(),
          bookmarkId: z.unknown(),
          heading: z.unknown(),
          headingId: z.unknown(),
          tabId: z.unknown(),
          url: z.unknown(),
        }),
        smallCaps: z.boolean(),
        strikethrough: z.boolean(),
        underline: z.boolean(),
        weightedFontFamily: z.object({
          fontFamily: z.unknown(),
          weight: z.unknown(),
        }),
      }),
    })),
  }).optional(),
  positionedObjects: z.record(z.string(), z.unknown()).optional(),
  revisionId: z.string().optional(),
  suggestedDocumentStyleChanges: z.record(z.string(), z.unknown()).optional(),
  suggestedNamedStylesChanges: z.record(z.string(), z.unknown()).optional(),
  suggestions: z.array(z.object({
    headPost: z.object({
      assigneeEmail: z.string(),
      author: z.object({
        anonymous: z.boolean(),
        displayName: z.string(),
        me: z.boolean(),
        user: z.string(),
      }),
      commentAction: z.string(),
      content: z.string(),
      contentHtml: z.string(),
      createTime: z.string(),
      deleted: z.boolean(),
      fromCopiedDocument: z.boolean(),
      fromDocumentComparison: z.boolean(),
      fromImportedDocument: z.boolean(),
      postId: z.string(),
      suggestionAction: z.string(),
      updateTime: z.string(),
    }),
    replies: z.array(z.object({
      assigneeEmail: z.string(),
      author: z.object({
        anonymous: z.unknown(),
        displayName: z.unknown(),
        me: z.unknown(),
        user: z.unknown(),
      }),
      commentAction: z.string(),
      content: z.string(),
      contentHtml: z.string(),
      createTime: z.string(),
      deleted: z.boolean(),
      fromCopiedDocument: z.boolean(),
      fromDocumentComparison: z.boolean(),
      fromImportedDocument: z.boolean(),
      postId: z.string(),
      suggestionAction: z.string(),
      updateTime: z.string(),
    })),
    status: z.string(),
    suggestionId: z.string(),
    summaryHtml: z.string(),
    summaryText: z.string(),
  })).optional(),
  suggestionsViewMode: z.string().optional(),
  tabs: z.array(z.object({
    childTabs: z.array(z.record(z.string(), z.unknown())),
    documentTab: z.object({
      body: z.object({
        content: z.array(z.unknown()),
      }),
      commentAnchors: z.record(z.string(), z.unknown()),
      documentStyle: z.object({
        background: z.object({
          color: z.unknown(),
        }),
        defaultFooterId: z.string(),
        defaultHeaderId: z.string(),
        documentFormat: z.object({
          documentMode: z.unknown(),
        }),
        evenPageFooterId: z.string(),
        evenPageHeaderId: z.string(),
        firstPageFooterId: z.string(),
        firstPageHeaderId: z.string(),
        flipPageOrientation: z.boolean(),
        marginBottom: z.object({
          magnitude: z.unknown(),
          unit: z.unknown(),
        }),
        marginFooter: z.object({
          magnitude: z.unknown(),
          unit: z.unknown(),
        }),
        marginHeader: z.object({
          magnitude: z.unknown(),
          unit: z.unknown(),
        }),
        marginLeft: z.object({
          magnitude: z.unknown(),
          unit: z.unknown(),
        }),
        marginRight: z.object({
          magnitude: z.unknown(),
          unit: z.unknown(),
        }),
        marginTop: z.object({
          magnitude: z.unknown(),
          unit: z.unknown(),
        }),
        pageNumberStart: z.number(),
        pageSize: z.object({
          height: z.unknown(),
          width: z.unknown(),
        }),
        useCustomHeaderFooterMargins: z.boolean(),
        useEvenPageHeaderFooter: z.boolean(),
        useFirstPageHeaderFooter: z.boolean(),
      }),
      dropdownDefinitions: z.record(z.string(), z.unknown()),
      footers: z.record(z.string(), z.unknown()),
      footnotes: z.record(z.string(), z.unknown()),
      headers: z.record(z.string(), z.unknown()),
      inlineObjects: z.record(z.string(), z.unknown()),
      lists: z.record(z.string(), z.unknown()),
      namedRanges: z.record(z.string(), z.unknown()),
      namedStyles: z.object({
        styles: z.array(z.unknown()),
      }),
      positionedObjects: z.record(z.string(), z.unknown()),
      suggestedDocumentStyleChanges: z.record(z.string(), z.unknown()),
      suggestedNamedStylesChanges: z.record(z.string(), z.unknown()),
    }),
    tabProperties: z.object({
      iconEmoji: z.string(),
      index: z.number(),
      nestingLevel: z.number(),
      parentTabId: z.string(),
      tabId: z.string(),
      title: z.string(),
    }),
  })).optional(),
  title: z.string().optional(),
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
  title: z.string().describe("The title of the document.").optional(),
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
      : _defaultOAuthScopes,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Google Docs Documents. Registered at `@swamp/gcp/docs/documents`. */
export const model = {
  type: "@swamp/gcp/docs/documents",
  version: "2026.10.02.1",
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
      toVersion: "2026.05.27.1",
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
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
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
      description: "Removed: body, documentStyle, namedStyles",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          body: _body,
          documentStyle: _documentStyle,
          namedStyles: _namedStyles,
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
      toVersion: "2026.09.09.1",
      description: "Removed: tabs",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { tabs: _tabs, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.09.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.02.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A Google Docs document.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a documents",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["name"] !== undefined) params["documentId"] = String(g["name"]);
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
      description: "Get a documents",
      arguments: z.object({
        identifier: z.string().describe("The name of the documents"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["documentId"] = args.identifier;
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
    sync: {
      description: "Sync documents state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific documents by name (e.g. one discovered by list)",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["documentId"] = identifier;
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
    batch_update: {
      description: "batch update",
      arguments: z.object({
        requests: z.any().optional(),
        writeControl: z.any().optional(),
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
        params["documentId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["requests"] !== undefined) body["requests"] = args["requests"];
        if (args["writeControl"] !== undefined) {
          body["writeControl"] = args["writeControl"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "docs.documents.batchUpdate",
            "path": "v1/documents/{documentId}:batchUpdate",
            "httpMethod": "POST",
            "parameterOrder": ["documentId"],
            "parameters": {
              "documentId": { "location": "path", "required": true },
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
