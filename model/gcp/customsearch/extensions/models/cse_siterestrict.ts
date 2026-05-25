// Auto-generated extension model for @swamp/gcp/customsearch/cse-siterestrict
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Custom Search Cse.Siterestrict.
 *
 * A custom search result.
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

const BASE_URL = "https://customsearch.googleapis.com/";

const LIST_CONFIG = {
  "id": "search.cse.siterestrict.list",
  "path": "customsearch/v1/siterestrict",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "c2coff": {
      "location": "query",
    },
    "cr": {
      "location": "query",
    },
    "cx": {
      "location": "query",
    },
    "dateRestrict": {
      "location": "query",
    },
    "enableAlternateSearchHandler": {
      "location": "query",
    },
    "exactTerms": {
      "location": "query",
    },
    "excludeTerms": {
      "location": "query",
    },
    "fileType": {
      "location": "query",
    },
    "filter": {
      "location": "query",
    },
    "gl": {
      "location": "query",
    },
    "googlehost": {
      "location": "query",
    },
    "highRange": {
      "location": "query",
    },
    "hl": {
      "location": "query",
    },
    "hq": {
      "location": "query",
    },
    "imgColorType": {
      "location": "query",
    },
    "imgDominantColor": {
      "location": "query",
    },
    "imgSize": {
      "location": "query",
    },
    "imgType": {
      "location": "query",
    },
    "linkSite": {
      "location": "query",
    },
    "lowRange": {
      "location": "query",
    },
    "lr": {
      "location": "query",
    },
    "num": {
      "location": "query",
    },
    "orTerms": {
      "location": "query",
    },
    "q": {
      "location": "query",
    },
    "relatedSite": {
      "location": "query",
    },
    "rights": {
      "location": "query",
    },
    "safe": {
      "location": "query",
    },
    "searchType": {
      "location": "query",
    },
    "siteSearch": {
      "location": "query",
    },
    "siteSearchFilter": {
      "location": "query",
    },
    "snippetLength": {
      "location": "query",
    },
    "sort": {
      "location": "query",
    },
    "start": {
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
  cacheId: z.string().optional(),
  displayLink: z.string().optional(),
  fileFormat: z.string().optional(),
  formattedUrl: z.string().optional(),
  htmlFormattedUrl: z.string().optional(),
  htmlSnippet: z.string().optional(),
  htmlTitle: z.string().optional(),
  image: z.object({
    byteSize: z.number(),
    contextLink: z.string(),
    height: z.number(),
    thumbnailHeight: z.number(),
    thumbnailLink: z.string(),
    thumbnailWidth: z.number(),
    width: z.number(),
  }).optional(),
  kind: z.string().optional(),
  labels: z.array(z.object({
    displayName: z.string(),
    label_with_op: z.string(),
    name: z.string(),
  })).optional(),
  link: z.string().optional(),
  mime: z.string().optional(),
  pagemap: z.record(z.string(), z.unknown()).optional(),
  snippet: z.string().optional(),
  title: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Custom Search Cse.Siterestrict. Registered at `@swamp/gcp/customsearch/cse-siterestrict`. */
export const model = {
  type: "@swamp/gcp/customsearch/cse-siterestrict",
  version: "2026.05.25.2",
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
      toVersion: "2026.05.25.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A custom search result.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a siterestrict",
      arguments: z.object({
        identifier: z.string().describe("The name of the siterestrict"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
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
      description: "Sync siterestrict state from GCP",
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
      description: "List siterestrict resources",
      arguments: z.object({
        c2coff: z.string().describe(
          "Enables or disables [Simplified and Traditional Chinese Search](https://developers.google.com/custom-search/docs/json_api_reference#chineseSearch). The default value for this parameter is 0 (zero), meaning that the feature is enabled. Supported values are: * `1`: Disabled * `0`: Enabled (default)",
        ).optional(),
        cr: z.string().describe(
          "Restricts search results to documents originating in a particular country. You may use [Boolean operators](https://developers.google.com/custom-search/docs/json_api_reference#booleanOperators) in the cr parameter's value. Google Search determines the country of a document by analyzing: * the top-level domain (TLD) of the document's URL * the geographic location of the Web server's IP address See the [Country Parameter Values](https://developers.google.com/custom-search/docs/json_api_reference#countryCollections) page for a list of valid values for this parameter.",
        ).optional(),
        cx: z.string().describe(
          "The Programmable Search Engine ID to use for this request.",
        ).optional(),
        dateRestrict: z.string().describe(
          "Restricts results to URLs based on date. Supported values include: * `d[number]`: requests results from the specified number of past days. * `w[number]`: requests results from the specified number of past weeks. * `m[number]`: requests results from the specified number of past months. * `y[number]`: requests results from the specified number of past years.",
        ).optional(),
        enableAlternateSearchHandler: z.boolean().describe(
          "Optional. Enables routing of Programmable Search Engine requests to an alternate search handler.",
        ).optional(),
        exactTerms: z.string().describe(
          "Identifies a phrase that all documents in the search results must contain.",
        ).optional(),
        excludeTerms: z.string().describe(
          "Identifies a word or phrase that should not appear in any documents in the search results.",
        ).optional(),
        fileType: z.string().describe(
          "Restricts results to files of a specified extension. A list of file types indexable by Google can be found in Search Console [Help Center](https://support.google.com/webmasters/answer/35287).",
        ).optional(),
        filter: z.string().describe(
          "Controls turning on or off the duplicate content filter. * See [Automatic Filtering](https://developers.google.com/custom-search/docs/json_api_reference#automaticFiltering) for more information about Google's search results filters. Note that host crowding filtering applies only to multi-site searches. * By default, Google applies filtering to all search results to improve the quality of those results. Acceptable values are: * `0`: Turns off duplicate content filter. * `1`: Turns on duplicate content filter.",
        ).optional(),
        gl: z.string().describe(
          "Geolocation of end user. * The `gl` parameter value is a two-letter country code. The `gl` parameter boosts search results whose country of origin matches the parameter value. See the [Country Codes](https://developers.google.com/custom-search/docs/json_api_reference#countryCodes) page for a list of valid values. * Specifying a `gl` parameter value should lead to more relevant results. This is particularly true for international customers and, even more specifically, for customers in English- speaking countries other than the United States.",
        ).optional(),
        googlehost: z.string().describe(
          "**Deprecated**. Use the `gl` parameter for a similar effect. The local Google domain (for example, google.com, google.de, or google.fr) to use to perform the search.",
        ).optional(),
        highRange: z.string().describe(
          "Specifies the ending value for a search range. * Use `lowRange` and `highRange` to append an inclusive search range of `lowRange...highRange` to the query.",
        ).optional(),
        hl: z.string().describe(
          "Sets the user interface language. * Explicitly setting this parameter improves the performance and the quality of your search results. * See the [Interface Languages](https://developers.google.com/custom-search/docs/json_api_reference#wsInterfaceLanguages) section of [Internationalizing Queries and Results Presentation](https://developers.google.com/custom-search/docs/json_api_reference#wsInternationalizing) for more information, and [Supported Interface Languages](https://developers.google.com/custom-search/docs/json_api_reference#interfaceLanguages) for a list of supported languages.",
        ).optional(),
        hq: z.string().describe(
          "Appends the specified query terms to the query, as if they were combined with a logical AND operator.",
        ).optional(),
        imgColorType: z.string().describe(
          'Returns black and white, grayscale, transparent, or color images. Acceptable values are: * `"color"` * `"gray"` * `"mono"`: black and white * `"trans"`: transparent background',
        ).optional(),
        imgDominantColor: z.string().describe(
          'Returns images of a specific dominant color. Acceptable values are: * `"black"` * `"blue"` * `"brown"` * `"gray"` * `"green"` * `"orange"` * `"pink"` * `"purple"` * `"red"` * `"teal"` * `"white"` * `"yellow"`',
        ).optional(),
        imgSize: z.string().describe(
          'Returns images of a specified size. Acceptable values are: * `"huge"` * `"icon"` * `"large"` * `"medium"` * `"small"` * `"xlarge"` * `"xxlarge"`',
        ).optional(),
        imgType: z.string().describe(
          'Returns images of a type. Acceptable values are: * `"clipart"` * `"face"` * `"lineart"` * `"stock"` * `"photo"` * `"animated"`',
        ).optional(),
        linkSite: z.string().describe(
          "Specifies that all search results should contain a link to a particular URL.",
        ).optional(),
        lowRange: z.string().describe(
          "Specifies the starting value for a search range. Use `lowRange` and `highRange` to append an inclusive search range of `lowRange...highRange` to the query.",
        ).optional(),
        lr: z.string().describe(
          'Restricts the search to documents written in a particular language (e.g., `lr=lang_ja`). Acceptable values are: * `"lang_ar"`: Arabic * `"lang_bg"`: Bulgarian * `"lang_ca"`: Catalan * `"lang_cs"`: Czech * `"lang_da"`: Danish * `"lang_de"`: German * `"lang_el"`: Greek * `"lang_en"`: English * `"lang_es"`: Spanish * `"lang_et"`: Estonian * `"lang_fi"`: Finnish * `"lang_fr"`: French * `"lang_hr"`: Croatian * `"lang_hu"`: Hungarian * `"lang_id"`: Indonesian * `"lang_is"`: Icelandic * `"lang_it"`: Italian * `"lang_iw"`: Hebrew * `"lang_ja"`: Japanese * `"lang_ko"`: Korean * `"lang_lt"`: Lithuanian * `"lang_lv"`: Latvian * `"lang_nl"`: Dutch * `"lang_no"`: Norwegian * `"lang_pl"`: Polish * `"lang_pt"`: Portuguese * `"lang_ro"`: Romanian * `"lang_ru"`: Russian * `"lang_sk"`: Slovak * `"lang_sl"`: Slovenian * `"lang_sr"`: Serbian * `"lang_sv"`: Swedish * `"lang_tr"`: Turkish * `"lang_zh-CN"`: Chinese (Simplified) * `"lang_zh-TW"`: Chinese (Traditional)',
        ).optional(),
        num: z.number().describe(
          "Number of search results to return. * Valid values are integers between 1 and 10, inclusive.",
        ).optional(),
        orTerms: z.string().describe(
          "Provides additional search terms to check for in a document, where each document in the search results must contain at least one of the additional search terms.",
        ).optional(),
        q: z.string().describe("Query").optional(),
        rights: z.string().describe(
          "Filters based on licensing. Supported values include: `cc_publicdomain`, `cc_attribute`, `cc_sharealike`, `cc_noncommercial`, `cc_nonderived` and combinations of these. See [typical combinations](https://wiki.creativecommons.org/wiki/CC_Search_integration).",
        ).optional(),
        safe: z.string().describe(
          'Search safety level. Acceptable values are: * `"active"`: Enables SafeSearch filtering. * `"off"`: Disables SafeSearch filtering. (default)',
        ).optional(),
        searchType: z.string().describe(
          'Specifies the search type: `image`. If unspecified, results are limited to webpages. Acceptable values are: * `"image"`: custom image search.',
        ).optional(),
        siteSearch: z.string().describe(
          "Specifies a given site which should always be included or excluded from results (see `siteSearchFilter` parameter, below).",
        ).optional(),
        siteSearchFilter: z.string().describe(
          'Controls whether to include or exclude results from the site named in the `siteSearch` parameter. Acceptable values are: * `"e"`: exclude * `"i"`: include',
        ).optional(),
        snippetLength: z.number().describe(
          "Optional. Maximum length of snippet text, in characters, to be returned with results. Note: this feature is limited to specific engines. * Valid values are integers between 161 and 1000, inclusive.",
        ).optional(),
        sort: z.string().describe(
          "The sort expression to apply to the results. The sort parameter specifies that the results be sorted according to the specified expression i.e. sort by date. [Example: sort=date](https://developers.google.com/custom-search/docs/structured_search#sort-by-attribute).",
        ).optional(),
        start: z.number().describe(
          "The index of the first result to return. The default number of results per page is 10, so `&start=11` would start at the top of the second page of results. **Note**: The JSON API will never return more than 100 results, even if more than 100 documents match the query, so setting the sum of `start + num` to a number greater than 100 will produce an error. Also note that the maximum value for `num` is 10.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (args["c2coff"] !== undefined) {
          params["c2coff"] = String(args["c2coff"]);
        }
        if (args["cr"] !== undefined) params["cr"] = String(args["cr"]);
        if (args["cx"] !== undefined) params["cx"] = String(args["cx"]);
        if (args["dateRestrict"] !== undefined) {
          params["dateRestrict"] = String(args["dateRestrict"]);
        }
        if (args["enableAlternateSearchHandler"] !== undefined) {
          params["enableAlternateSearchHandler"] = String(
            args["enableAlternateSearchHandler"],
          );
        }
        if (args["exactTerms"] !== undefined) {
          params["exactTerms"] = String(args["exactTerms"]);
        }
        if (args["excludeTerms"] !== undefined) {
          params["excludeTerms"] = String(args["excludeTerms"]);
        }
        if (args["fileType"] !== undefined) {
          params["fileType"] = String(args["fileType"]);
        }
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["gl"] !== undefined) params["gl"] = String(args["gl"]);
        if (args["googlehost"] !== undefined) {
          params["googlehost"] = String(args["googlehost"]);
        }
        if (args["highRange"] !== undefined) {
          params["highRange"] = String(args["highRange"]);
        }
        if (args["hl"] !== undefined) params["hl"] = String(args["hl"]);
        if (args["hq"] !== undefined) params["hq"] = String(args["hq"]);
        if (args["imgColorType"] !== undefined) {
          params["imgColorType"] = String(args["imgColorType"]);
        }
        if (args["imgDominantColor"] !== undefined) {
          params["imgDominantColor"] = String(args["imgDominantColor"]);
        }
        if (args["imgSize"] !== undefined) {
          params["imgSize"] = String(args["imgSize"]);
        }
        if (args["imgType"] !== undefined) {
          params["imgType"] = String(args["imgType"]);
        }
        if (args["linkSite"] !== undefined) {
          params["linkSite"] = String(args["linkSite"]);
        }
        if (args["lowRange"] !== undefined) {
          params["lowRange"] = String(args["lowRange"]);
        }
        if (args["lr"] !== undefined) params["lr"] = String(args["lr"]);
        if (args["num"] !== undefined) params["num"] = String(args["num"]);
        if (args["orTerms"] !== undefined) {
          params["orTerms"] = String(args["orTerms"]);
        }
        if (args["q"] !== undefined) params["q"] = String(args["q"]);
        if (args["rights"] !== undefined) {
          params["rights"] = String(args["rights"]);
        }
        if (args["safe"] !== undefined) params["safe"] = String(args["safe"]);
        if (args["searchType"] !== undefined) {
          params["searchType"] = String(args["searchType"]);
        }
        if (args["siteSearch"] !== undefined) {
          params["siteSearch"] = String(args["siteSearch"]);
        }
        if (args["siteSearchFilter"] !== undefined) {
          params["siteSearchFilter"] = String(args["siteSearchFilter"]);
        }
        if (args["snippetLength"] !== undefined) {
          params["snippetLength"] = String(args["snippetLength"]);
        }
        if (args["sort"] !== undefined) params["sort"] = String(args["sort"]);
        if (args["start"] !== undefined) {
          params["start"] = String(args["start"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "items",
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
