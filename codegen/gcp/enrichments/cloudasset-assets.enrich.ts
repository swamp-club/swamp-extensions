// deno-lint-ignore-file no-import-prefix

import { z } from "npm:zod@4.3.6";

// Identity, type, location and state metadata only. Requested server-side via
// readMask and re-applied client-side, so resource payloads
// (additionalAttributes, description, labels, versionedResources, ...) are
// never persisted even if the server or an emulator ignores the mask.
export const ASSET_METADATA_FIELDS = [
  "name",
  "assetType",
  "project",
  "folders",
  "organization",
  "displayName",
  "location",
  "state",
  "createTime",
  "updateTime",
  "parentFullResourceName",
  "parentAssetType",
] as const;

export function pickAssetMetadata(
  result: Record<string, unknown>,
): Record<string, unknown> {
  const picked: Record<string, unknown> = {};
  for (const field of ASSET_METADATA_FIELDS) {
    if (result[field] !== undefined) picked[field] = result[field];
  }
  return picked;
}

export const assetInventoryMethods = {
  inventory_project_metadata: {
    description:
      "persist a complete paginated searchAllResources metadata snapshot for one project — fails on maxAssets breach rather than silently truncating; coverage is caller-visible search-index results, not proof of backup or retention completeness",
    arguments: z.object({
      project: z.string().describe(
        "Project to search, as a project ID or projects/{project}. Overrides the project global argument and GCP_PROJECT, which are used otherwise. Folder and organization scopes are rejected.",
      ).optional(),
      query: z.string().describe(
        "Cloud Asset search query, passed through verbatim (default: all resources in the project)",
      ).optional(),
      assetTypes: z.string().describe(
        "Comma-separated asset types (regular expressions supported), passed through verbatim (default: all search-supported types)",
      ).optional(),
      maxAssets: z.number().int().positive().describe(
        "Maximum number of resources to collect before failing with an explicit truncation error (default 10000)",
      ).optional(),
    }),
    execute: async (
      args: Record<string, unknown>,
      context: {
        globalArgs: Record<string, unknown>;
        writeResource: (
          type: string,
          name: string,
          data: unknown,
        ) => Promise<unknown>;
      },
    ) => {
      const g = context.globalArgs;
      const baseUrl = g["apiEndpoint"]?.toString() ??
        Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
      const credentials = _buildGcpCredentials(g);
      const requested = (args.project as string | undefined) ??
        await getProjectId(credentials);
      const projectId = requested.startsWith("projects/")
        ? requested.slice("projects/".length)
        : requested;
      if (!projectId || projectId.includes("/")) {
        throw new Error(
          `inventory_project_metadata only snapshots a single project; got "${requested}". ` +
            "Pass a project ID or projects/{project} — folder and organization scopes are not supported.",
        );
      }
      const scope = `projects/${projectId}`;
      const maxAssets = (args.maxAssets as number | undefined) ?? 10000;
      const query = args.query as string | undefined;
      const assetTypes = args.assetTypes as string | undefined;
      const readMask = ASSET_METADATA_FIELDS.join(",");

      const resources: Record<string, unknown>[] = [];
      let pageToken: string | undefined;
      let pageCount = 0;
      const seenTokens = new Set<string>();

      do {
        const params = new URLSearchParams({
          pageSize: "500",
          readMask,
        });
        if (query !== undefined) params.set("query", query);
        if (assetTypes !== undefined) params.set("assetTypes", assetTypes);
        if (pageToken) params.set("pageToken", pageToken);
        const url = `${baseUrl}v1/${scope}:searchAllResources?${params}`;

        const resp = await request("GET", url, undefined, credentials);
        pageCount++;
        const body = await resp.text();
        if (!resp.ok) {
          throw new Error(
            `Failed to search resources in ${scope} (${resp.status}) on page ${pageCount}: ${body}`,
          );
        }

        let data: {
          results?: Record<string, unknown>[];
          nextPageToken?: string;
        };
        try {
          data = JSON.parse(body);
        } catch {
          throw new Error(
            `searchAllResources returned a non-JSON body for ${scope} on page ${pageCount}. The snapshot was NOT persisted.`,
          );
        }

        for (const result of data.results ?? []) {
          resources.push(pickAssetMetadata(result));
        }

        if (resources.length > maxAssets) {
          throw new Error(
            `Resource count (${resources.length}) exceeds maxAssets limit (${maxAssets}) for ${scope}. ` +
              "Increase maxAssets or narrow query/assetTypes. The snapshot was NOT persisted.",
          );
        }

        pageToken = data.nextPageToken || undefined;
        if (pageToken) {
          if (seenTokens.has(pageToken)) {
            throw new Error(
              `Repeated pagination token searching resources in ${scope}. ` +
                "This indicates an API pagination loop — aborting. The snapshot was NOT persisted.",
            );
          }
          seenTokens.add(pageToken);
        }
      } while (pageToken);

      // The API does not guarantee result order; sort so snapshots of an
      // unchanged project compare equal.
      resources.sort((a, b) => {
        const an = String(a.name ?? "");
        const bn = String(b.name ?? "");
        return an < bn ? -1 : an > bn ? 1 : 0;
      });

      const instanceName = `project_metadata_snapshot_${
        scope.replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "")
      }`;
      const snapshot = {
        name: instanceName,
        scope,
        query: query ?? null,
        assetTypes: assetTypes ?? null,
        readMask,
        maxAssets,
        count: resources.length,
        pageCount,
        resources,
        coverage: "caller-visible",
        source: "search-index",
        note:
          "Results come from the Cloud Asset search index, which can lag resource changes and only covers search-supported asset types. This snapshot is not proof of backup or retention completeness.",
        fetchedAt: new Date().toISOString(),
      };

      const handle = await context.writeResource(
        "state",
        instanceName,
        snapshot,
      );
      return { dataHandles: [handle] };
    },
  },
};
