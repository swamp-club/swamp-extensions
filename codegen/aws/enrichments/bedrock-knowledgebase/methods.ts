// deno-lint-ignore-file no-import-prefix

import { z } from "npm:zod@4.3.6";
import {
  BedrockAgentRuntimeClient,
  type KnowledgeBaseRetrievalResult,
  type RetrievalFilter,
  RetrieveCommand,
} from "npm:@aws-sdk/client-bedrock-agent-runtime@3.1147.0";
import { NodeHttpHandler } from "npm:@smithy/node-http-handler@4.9.7";
import type { AwsCredentials } from "../../../../model/aws/bedrock/extensions/models/_lib/aws.ts";

export const RetrieveOutputSchema = z.object({
  knowledgeBaseId: z.string(),
  query: z.string(),
  results: z.array(z.object({
    contentText: z.string().optional(),
    contentType: z.string().optional(),
    score: z.number().optional(),
    locationType: z.string().optional(),
    locationUri: z.string().optional(),
    locationUrl: z.string().optional(),
    locationQuery: z.string().optional(),
    locationId: z.string().optional(),
    metadata: z.record(z.string(), z.unknown()).optional(),
  })),
  resultCount: z.number(),
  nextToken: z.string().optional(),
});

// Deno's node:http2 compat layer is incomplete — force HTTP/1.1
function createClient(
  credentials: AwsCredentials,
): BedrockAgentRuntimeClient {
  // disableImdsIfOffEc2 inlined — enrichments run at codegen time, not extension runtime
  if (
    !Deno.env.get("AWS_EC2_METADATA_DISABLED") &&
    !Deno.env.get("AWS_CONTAINER_CREDENTIALS_RELATIVE_URI") &&
    !Deno.env.get("AWS_CONTAINER_CREDENTIALS_FULL_URI")
  ) {
    Deno.env.set("AWS_EC2_METADATA_DISABLED", "true");
  }

  const region = credentials.region ??
    Deno.env.get("AWS_REGION") ??
    Deno.env.get("AWS_DEFAULT_REGION") ??
    "us-east-1";

  const config: Record<string, unknown> = {
    region,
    requestHandler: new NodeHttpHandler(),
  };

  if (credentials.accessKeyId && credentials.secretAccessKey) {
    config.credentials = {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      ...(credentials.sessionToken
        ? { sessionToken: credentials.sessionToken }
        : {}),
    };
  }

  return new BedrockAgentRuntimeClient(config);
}

function formatResult(
  r: KnowledgeBaseRetrievalResult,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  if (r.content) {
    result.contentText = r.content.text;
    result.contentType = r.content.type;
  }

  if (r.score !== undefined) {
    result.score = r.score;
  }

  if (r.location) {
    result.locationType = r.location.type;
    switch (r.location.type) {
      case "S3":
        result.locationUri = r.location.s3Location?.uri;
        break;
      case "WEB":
        result.locationUrl = r.location.webLocation?.url;
        break;
      case "CONFLUENCE":
        result.locationUrl = r.location.confluenceLocation?.url;
        break;
      case "SALESFORCE":
        result.locationUrl = r.location.salesforceLocation?.url;
        break;
      case "SHAREPOINT":
        result.locationUrl = r.location.sharePointLocation?.url;
        break;
      case "ONEDRIVE":
        result.locationUrl = r.location.oneDriveLocation?.url;
        break;
      case "GOOGLEDRIVE":
        result.locationUrl = r.location.googleDriveLocation?.url;
        break;
      case "SQL":
        result.locationQuery = r.location.sqlLocation?.query;
        break;
      case "CUSTOM":
        result.locationId = r.location.customDocumentLocation?.id;
        break;
    }
  }

  if (r.metadata) {
    result.metadata = r.metadata;
  }

  return result;
}

export async function retrieve(
  args: Record<string, unknown>,
  credentials: AwsCredentials,
): Promise<Record<string, unknown>> {
  const client = createClient(credentials);
  const knowledgeBaseId = args.knowledgeBaseId as string;
  const query = args.query as string;
  const numberOfResults = args.numberOfResults as number | undefined;
  const searchType = args.searchType as "SEMANTIC" | "HYBRID" | undefined;
  const filter = args.filter as Record<string, unknown> | undefined;
  const nextToken = args.nextToken as string | undefined;

  const command = new RetrieveCommand({
    knowledgeBaseId,
    retrievalQuery: { text: query },
    ...(numberOfResults || searchType || filter
      ? {
        retrievalConfiguration: {
          vectorSearchConfiguration: {
            ...(numberOfResults ? { numberOfResults } : {}),
            ...(searchType ? { overrideSearchType: searchType } : {}),
            ...(filter ? { filter: filter as unknown as RetrievalFilter } : {}),
          },
        },
      }
      : {}),
    ...(nextToken ? { nextToken } : {}),
  });

  try {
    const response = await client.send(command);
    const results: Record<string, unknown>[] = [];

    for (const r of response.retrievalResults ?? []) {
      results.push(formatResult(r));
    }

    const output: Record<string, unknown> = {
      knowledgeBaseId,
      query,
      results,
      resultCount: results.length,
    };

    if (response.nextToken) {
      output.nextToken = response.nextToken;
    }

    return output;
  } catch (err: unknown) {
    const error = err as Error & { name: string };
    switch (error.name) {
      case "AccessDeniedException":
        throw new Error(
          `Access denied: ensure the caller has bedrock:Retrieve permission on knowledge base ${knowledgeBaseId}. ${error.message}`,
        );
      case "ResourceNotFoundException":
        throw new Error(
          `Knowledge base not found: ${knowledgeBaseId}. Verify the ID and region are correct. ${error.message}`,
        );
      case "ValidationException":
        throw new Error(
          `Invalid request: ${error.message}`,
        );
      default:
        throw error;
    }
  }
}
