// Auto-generated extension model for @swamp/gcp/slides/presentations-pages
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Slides Presentations.Pages.
 *
 * A page in a presentation.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://slides.googleapis.com/";

const GET_CONFIG = {
  "id": "slides.presentations.pages.get",
  "path": "v1/presentations/{presentationId}/pages/{pageObjectId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "presentationId",
    "pageObjectId",
  ],
  "parameters": {
    "pageObjectId": {
      "location": "path",
      "required": true,
    },
    "presentationId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  layoutProperties: z.object({
    displayName: z.string(),
    masterObjectId: z.string(),
    name: z.string(),
  }).optional(),
  masterProperties: z.object({
    displayName: z.string(),
  }).optional(),
  notesProperties: z.object({
    speakerNotesObjectId: z.string(),
  }).optional(),
  objectId: z.string().optional(),
  pageElements: z.array(z.object({
    description: z.string(),
    elementGroup: z.object({
      children: z.array(z.string()),
    }),
    image: z.object({
      contentUrl: z.string(),
      imageProperties: z.object({
        brightness: z.number(),
        contrast: z.number(),
        cropProperties: z.object({
          angle: z.unknown(),
          bottomOffset: z.unknown(),
          leftOffset: z.unknown(),
          rightOffset: z.unknown(),
          topOffset: z.unknown(),
        }),
        link: z.object({
          pageObjectId: z.unknown(),
          relativeLink: z.unknown(),
          slideIndex: z.unknown(),
          url: z.unknown(),
        }),
        outline: z.object({
          dashStyle: z.unknown(),
          outlineFill: z.unknown(),
          propertyState: z.unknown(),
          weight: z.unknown(),
        }),
        recolor: z.object({
          name: z.unknown(),
          recolorStops: z.unknown(),
        }),
        shadow: z.object({
          alignment: z.unknown(),
          alpha: z.unknown(),
          blurRadius: z.unknown(),
          color: z.unknown(),
          propertyState: z.unknown(),
          rotateWithShape: z.unknown(),
          transform: z.unknown(),
          type: z.unknown(),
        }),
        transparency: z.number(),
      }),
      placeholder: z.object({
        index: z.number(),
        parentObjectId: z.string(),
        type: z.string(),
      }),
      sourceUrl: z.string(),
    }),
    line: z.object({
      lineCategory: z.string(),
      lineProperties: z.object({
        dashStyle: z.string(),
        endArrow: z.string(),
        endConnection: z.object({
          connectedObjectId: z.unknown(),
          connectionSiteIndex: z.unknown(),
        }),
        lineFill: z.object({
          solidFill: z.unknown(),
        }),
        link: z.object({
          pageObjectId: z.unknown(),
          relativeLink: z.unknown(),
          slideIndex: z.unknown(),
          url: z.unknown(),
        }),
        startArrow: z.string(),
        startConnection: z.object({
          connectedObjectId: z.unknown(),
          connectionSiteIndex: z.unknown(),
        }),
        weight: z.object({
          magnitude: z.unknown(),
          unit: z.unknown(),
        }),
      }),
      lineType: z.string(),
    }),
    objectId: z.string(),
    shape: z.object({
      placeholder: z.object({
        index: z.number(),
        parentObjectId: z.string(),
        type: z.string(),
      }),
      shapeProperties: z.object({
        autofit: z.object({
          autofitType: z.unknown(),
          fontScale: z.unknown(),
          lineSpacingReduction: z.unknown(),
        }),
        contentAlignment: z.string(),
        link: z.object({
          pageObjectId: z.unknown(),
          relativeLink: z.unknown(),
          slideIndex: z.unknown(),
          url: z.unknown(),
        }),
        outline: z.object({
          dashStyle: z.unknown(),
          outlineFill: z.unknown(),
          propertyState: z.unknown(),
          weight: z.unknown(),
        }),
        shadow: z.object({
          alignment: z.unknown(),
          alpha: z.unknown(),
          blurRadius: z.unknown(),
          color: z.unknown(),
          propertyState: z.unknown(),
          rotateWithShape: z.unknown(),
          transform: z.unknown(),
          type: z.unknown(),
        }),
        shapeBackgroundFill: z.object({
          propertyState: z.unknown(),
          solidFill: z.unknown(),
        }),
      }),
      shapeType: z.string(),
      text: z.object({
        lists: z.record(z.string(), z.unknown()),
        textElements: z.array(z.unknown()),
      }),
    }),
    sheetsChart: z.object({
      chartId: z.number(),
      contentUrl: z.string(),
      sheetsChartProperties: z.object({
        chartImageProperties: z.object({
          brightness: z.unknown(),
          contrast: z.unknown(),
          cropProperties: z.unknown(),
          link: z.unknown(),
          outline: z.unknown(),
          recolor: z.unknown(),
          shadow: z.unknown(),
          transparency: z.unknown(),
        }),
      }),
      spreadsheetId: z.string(),
    }),
    size: z.object({
      height: z.object({
        magnitude: z.number(),
        unit: z.string(),
      }),
      width: z.object({
        magnitude: z.number(),
        unit: z.string(),
      }),
    }),
    speakerSpotlight: z.object({
      speakerSpotlightProperties: z.object({
        outline: z.object({
          dashStyle: z.unknown(),
          outlineFill: z.unknown(),
          propertyState: z.unknown(),
          weight: z.unknown(),
        }),
        shadow: z.object({
          alignment: z.unknown(),
          alpha: z.unknown(),
          blurRadius: z.unknown(),
          color: z.unknown(),
          propertyState: z.unknown(),
          rotateWithShape: z.unknown(),
          transform: z.unknown(),
          type: z.unknown(),
        }),
      }),
    }),
    table: z.object({
      columns: z.number(),
      horizontalBorderRows: z.array(z.object({
        tableBorderCells: z.unknown(),
      })),
      rows: z.number(),
      tableColumns: z.array(z.object({
        columnWidth: z.unknown(),
      })),
      tableRows: z.array(z.object({
        rowHeight: z.unknown(),
        tableCells: z.unknown(),
        tableRowProperties: z.unknown(),
      })),
      verticalBorderRows: z.array(z.object({
        tableBorderCells: z.unknown(),
      })),
    }),
    title: z.string(),
    transform: z.object({
      scaleX: z.number(),
      scaleY: z.number(),
      shearX: z.number(),
      shearY: z.number(),
      translateX: z.number(),
      translateY: z.number(),
      unit: z.string(),
    }),
    video: z.object({
      id: z.string(),
      source: z.string(),
      url: z.string(),
      videoProperties: z.object({
        autoPlay: z.boolean(),
        end: z.number(),
        mute: z.boolean(),
        outline: z.object({
          dashStyle: z.unknown(),
          outlineFill: z.unknown(),
          propertyState: z.unknown(),
          weight: z.unknown(),
        }),
        start: z.number(),
      }),
    }),
    wordArt: z.object({
      renderedText: z.string(),
    }),
  })).optional(),
  pageProperties: z.object({
    colorScheme: z.object({
      colors: z.array(z.object({
        color: z.object({
          blue: z.unknown(),
          green: z.unknown(),
          red: z.unknown(),
        }),
        type: z.string(),
      })),
    }),
    pageBackgroundFill: z.object({
      propertyState: z.string(),
      solidFill: z.object({
        alpha: z.number(),
        color: z.object({
          rgbColor: z.object({
            blue: z.unknown(),
            green: z.unknown(),
            red: z.unknown(),
          }),
          themeColor: z.string(),
        }),
      }),
      stretchedPictureFill: z.object({
        contentUrl: z.string(),
        size: z.object({
          height: z.object({
            magnitude: z.unknown(),
            unit: z.unknown(),
          }),
          width: z.object({
            magnitude: z.unknown(),
            unit: z.unknown(),
          }),
        }),
      }),
    }),
  }).optional(),
  pageType: z.string().optional(),
  revisionId: z.string().optional(),
  slideProperties: z.object({
    isSkipped: z.boolean(),
    layoutObjectId: z.string(),
    masterObjectId: z.string(),
    notesPage: z.object({
      layoutProperties: z.object({
        displayName: z.string(),
        masterObjectId: z.string(),
        name: z.string(),
      }),
      masterProperties: z.object({
        displayName: z.string(),
      }),
      notesProperties: z.object({
        speakerNotesObjectId: z.string(),
      }),
      objectId: z.string(),
      pageElements: z.array(z.object({
        description: z.string(),
        elementGroup: z.object({
          children: z.unknown(),
        }),
        image: z.object({
          contentUrl: z.unknown(),
          imageProperties: z.unknown(),
          placeholder: z.unknown(),
          sourceUrl: z.unknown(),
        }),
        line: z.object({
          lineCategory: z.unknown(),
          lineProperties: z.unknown(),
          lineType: z.unknown(),
        }),
        objectId: z.string(),
        shape: z.object({
          placeholder: z.unknown(),
          shapeProperties: z.unknown(),
          shapeType: z.unknown(),
          text: z.unknown(),
        }),
        sheetsChart: z.object({
          chartId: z.unknown(),
          contentUrl: z.unknown(),
          sheetsChartProperties: z.unknown(),
          spreadsheetId: z.unknown(),
        }),
        size: z.object({
          height: z.unknown(),
          width: z.unknown(),
        }),
        speakerSpotlight: z.object({
          speakerSpotlightProperties: z.unknown(),
        }),
        table: z.object({
          columns: z.unknown(),
          horizontalBorderRows: z.unknown(),
          rows: z.unknown(),
          tableColumns: z.unknown(),
          tableRows: z.unknown(),
          verticalBorderRows: z.unknown(),
        }),
        title: z.string(),
        transform: z.object({
          scaleX: z.unknown(),
          scaleY: z.unknown(),
          shearX: z.unknown(),
          shearY: z.unknown(),
          translateX: z.unknown(),
          translateY: z.unknown(),
          unit: z.unknown(),
        }),
        video: z.object({
          id: z.unknown(),
          source: z.unknown(),
          url: z.unknown(),
          videoProperties: z.unknown(),
        }),
        wordArt: z.object({
          renderedText: z.unknown(),
        }),
      })),
      pageProperties: z.object({
        colorScheme: z.object({
          colors: z.array(z.unknown()),
        }),
        pageBackgroundFill: z.object({
          propertyState: z.string(),
          solidFill: z.object({
            alpha: z.unknown(),
            color: z.unknown(),
          }),
          stretchedPictureFill: z.object({
            contentUrl: z.unknown(),
            size: z.unknown(),
          }),
        }),
      }),
      pageType: z.string(),
      revisionId: z.string(),
      slideProperties: z.string(),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Google Slides Presentations.Pages. Registered at `@swamp/gcp/slides/presentations-pages`. */
export const model = {
  type: "@swamp/gcp/slides/presentations-pages",
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
      description: "A page in a presentation.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a pages",
      arguments: z.object({
        identifier: z.string().describe("The name of the pages"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["presentationId"] !== undefined) {
          params["presentationId"] = String(g["presentationId"]);
        }
        params["pageObjectId"] = args.identifier;
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
    sync: {
      description: "Sync pages state from GCP",
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
          if (g["presentationId"] !== undefined) {
            params["presentationId"] = String(g["presentationId"]);
          } else if (existing["presentationId"]) {
            params["presentationId"] = String(existing["presentationId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["pageObjectId"] = identifier;
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
    get_thumbnail: {
      description: "get thumbnail",
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
        params["presentationId"] = existing["presentationId"]?.toString() ??
          g["presentationId"]?.toString() ?? "";
        params["pageObjectId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "slides.presentations.pages.getThumbnail",
            "path":
              "v1/presentations/{presentationId}/pages/{pageObjectId}/thumbnail",
            "httpMethod": "GET",
            "parameterOrder": ["presentationId", "pageObjectId"],
            "parameters": {
              "pageObjectId": { "location": "path", "required": true },
              "presentationId": { "location": "path", "required": true },
              "thumbnailProperties.mimeType": { "location": "query" },
              "thumbnailProperties.thumbnailSize": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
