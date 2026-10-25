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

// Auto-generated extension model for @swamp/aws/glue/classifier
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Glue Classifier (AWS::Glue::Classifier).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessKeyId: z.string().meta({ sensitive: true }).describe(
    "AWS access key ID; overrides AWS_ACCESS_KEY_ID environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).describe(
    "AWS secret access key; overrides AWS_SECRET_ACCESS_KEY environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  sessionToken: z.string().meta({ sensitive: true }).describe(
    "AWS session token for temporary credentials; overrides AWS_SESSION_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  region: z.string().describe(
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  XMLClassifier: z.object({
    RowTag: z.string().describe(
      "The XML tag designating the element that contains each record in an XML document being parsed. This can't identify a self-closing element (closed by />). An empty row element that contains only attributes can be parsed as long as it ends with a closing tag (for example,  is okay, but  is not).",
    ),
    Classification: z.string().describe(
      "An identifier of the data format that the classifier matches.",
    ),
    Name: z.string().describe("The name of the classifier.").optional(),
  }).describe("A classifier for XML content.").optional(),
  CsvClassifier: z.object({
    ContainsCustomDatatype: z.array(z.string()).describe(
      "Indicates whether the CSV file contains custom data types.",
    ).optional(),
    QuoteSymbol: z.string().describe(
      "A custom symbol to denote what combines content into a single column value. It must be different from the column delimiter.",
    ).optional(),
    ContainsHeader: z.string().describe(
      "Indicates whether the CSV file contains a header. A value of UNKNOWN specifies that the classifier will detect whether the CSV file contains headings. A value of PRESENT specifies that the CSV file contains headings. A value of ABSENT specifies that the CSV file does not contain headings.",
    ).optional(),
    Delimiter: z.string().describe(
      "A custom symbol to denote what separates each column entry in the row.",
    ).optional(),
    Header: z.array(z.string()).describe(
      "A list of strings representing column names.",
    ).optional(),
    AllowSingleColumn: z.boolean().describe(
      "Enables the processing of files that contain only one column.",
    ).optional(),
    CustomDatatypeConfigured: z.boolean().describe(
      "Enables the configuration of custom data types.",
    ).optional(),
    DisableValueTrimming: z.boolean().describe(
      "Specifies not to trim values before identifying the type of column values. The default value is true.",
    ).optional(),
    Name: z.string().describe("The name of the classifier.").optional(),
  }).describe("A classifier for comma-separated values (CSV).").optional(),
  GrokClassifier: z.object({
    CustomPatterns: z.string().describe(
      "Optional custom grok patterns defined by this classifier.",
    ).optional(),
    GrokPattern: z.string().describe(
      "The grok pattern applied to a data store by this classifier.",
    ),
    Classification: z.string().describe(
      "An identifier of the data format that the classifier matches, such as Twitter, JSON, Omniture logs, and so on.",
    ),
    Name: z.string().describe("The name of the classifier.").optional(),
  }).describe("A classifier that uses grok.").optional(),
  JsonClassifier: z.object({
    JsonPath: z.string().describe(
      "A JsonPath string defining the JSON data for the classifier to classify. AWS Glue supports a subset of JsonPath, as described in Writing JsonPath Custom Classifiers.",
    ),
    Name: z.string().describe("The name of the classifier.").optional(),
  }).describe("A classifier for JSON content.").optional(),
});

const StateSchema = z.object({
  XMLClassifier: z.object({
    RowTag: z.string(),
    Classification: z.string(),
    Name: z.string(),
  }).optional(),
  CsvClassifier: z.object({
    ContainsCustomDatatype: z.array(z.string()),
    QuoteSymbol: z.string(),
    ContainsHeader: z.string(),
    Delimiter: z.string(),
    Header: z.array(z.string()),
    AllowSingleColumn: z.boolean(),
    CustomDatatypeConfigured: z.boolean(),
    DisableValueTrimming: z.boolean(),
    Name: z.string(),
  }).optional(),
  Name: z.string(),
  GrokClassifier: z.object({
    CustomPatterns: z.string(),
    GrokPattern: z.string(),
    Classification: z.string(),
    Name: z.string(),
  }).optional(),
  JsonClassifier: z.object({
    JsonPath: z.string(),
    Name: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  XMLClassifier: z.object({
    RowTag: z.string().describe(
      "The XML tag designating the element that contains each record in an XML document being parsed. This can't identify a self-closing element (closed by />). An empty row element that contains only attributes can be parsed as long as it ends with a closing tag (for example,  is okay, but  is not).",
    ).optional(),
    Classification: z.string().describe(
      "An identifier of the data format that the classifier matches.",
    ).optional(),
    Name: z.string().describe("The name of the classifier.").optional(),
  }).describe("A classifier for XML content.").optional(),
  CsvClassifier: z.object({
    ContainsCustomDatatype: z.array(z.string()).describe(
      "Indicates whether the CSV file contains custom data types.",
    ).optional(),
    QuoteSymbol: z.string().describe(
      "A custom symbol to denote what combines content into a single column value. It must be different from the column delimiter.",
    ).optional(),
    ContainsHeader: z.string().describe(
      "Indicates whether the CSV file contains a header. A value of UNKNOWN specifies that the classifier will detect whether the CSV file contains headings. A value of PRESENT specifies that the CSV file contains headings. A value of ABSENT specifies that the CSV file does not contain headings.",
    ).optional(),
    Delimiter: z.string().describe(
      "A custom symbol to denote what separates each column entry in the row.",
    ).optional(),
    Header: z.array(z.string()).describe(
      "A list of strings representing column names.",
    ).optional(),
    AllowSingleColumn: z.boolean().describe(
      "Enables the processing of files that contain only one column.",
    ).optional(),
    CustomDatatypeConfigured: z.boolean().describe(
      "Enables the configuration of custom data types.",
    ).optional(),
    DisableValueTrimming: z.boolean().describe(
      "Specifies not to trim values before identifying the type of column values. The default value is true.",
    ).optional(),
    Name: z.string().describe("The name of the classifier.").optional(),
  }).describe("A classifier for comma-separated values (CSV).").optional(),
  GrokClassifier: z.object({
    CustomPatterns: z.string().describe(
      "Optional custom grok patterns defined by this classifier.",
    ).optional(),
    GrokPattern: z.string().describe(
      "The grok pattern applied to a data store by this classifier.",
    ).optional(),
    Classification: z.string().describe(
      "An identifier of the data format that the classifier matches, such as Twitter, JSON, Omniture logs, and so on.",
    ).optional(),
    Name: z.string().describe("The name of the classifier.").optional(),
  }).describe("A classifier that uses grok.").optional(),
  JsonClassifier: z.object({
    JsonPath: z.string().describe(
      "A JsonPath string defining the JSON data for the classifier to classify. AWS Glue supports a subset of JsonPath, as described in Writing JsonPath Custom Classifiers.",
    ).optional(),
    Name: z.string().describe("The name of the classifier.").optional(),
  }).describe("A classifier for JSON content.").optional(),
});

const _credentialKeys = new Set([
  "accessKeyId",
  "secretAccessKey",
  "sessionToken",
  "region",
]);

function _buildCredentials(g: Record<string, unknown>): AwsCredentials {
  return {
    accessKeyId: g.accessKeyId as string | undefined,
    secretAccessKey: g.secretAccessKey as string | undefined,
    sessionToken: g.sessionToken as string | undefined,
    region: g.region as string | undefined,
  };
}

/** Swamp extension model for Glue Classifier. Registered at `@swamp/aws/glue/classifier`. */
export const model = {
  type: "@swamp/aws/glue/classifier",
  version: "2026.10.25.1",
  upgrades: [
    {
      toVersion: "2026.08.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.14.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Glue Classifier resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Glue Classifier",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Glue::Classifier",
          desiredState,
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
      description: "Get a Glue Classifier",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue Classifier",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Glue::Classifier",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
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
      description: "Update a Glue Classifier",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Glue::Classifier",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Glue::Classifier",
          identifier,
          currentState,
          desiredState,
          [
            "XMLClassifier/Name",
            "CsvClassifier/Name",
            "JsonClassifier/Name",
            "GrokClassifier/Name",
          ],
          credentials,
        );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a Glue Classifier",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue Classifier",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Glue::Classifier",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
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
      description: "Sync Glue Classifier state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Glue::Classifier",
            identifier,
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
              identifier,
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
      description: "List Glue Classifier resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
        resourceModel: z.string().describe(
          "JSON resource model for parent-scoped listing (e.g. parent identifier)",
        ).optional(),
      }),
      execute: async (
        args: { maxPages?: number; resourceModel?: string },
        context: any,
      ) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { items, nextToken } = await listResources(
          "AWS::Glue::Classifier",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName =
            (item.properties?.Name?.toString() ?? item.identifier).replace(
              /[\/\\]/g,
              "_",
            ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource("state", instanceName, {
            ...item.properties,
            _identifier: item.identifier,
          });
          dataHandles.push(handle);
        }
        return {
          dataHandles,
          result: { count: items.length, nextPageToken: nextToken },
        };
      },
    },
  },
};
