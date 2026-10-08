import type { AwsEnrichment } from "../types.ts";

export const enrichment: AwsEnrichment = {
  cfTypeName: "AWS::Bedrock::KnowledgeBase",
  npmImports: {
    "@aws-sdk/client-bedrock-agent-runtime":
      "npm:@aws-sdk/client-bedrock-agent-runtime@3.1147.0",
    "@smithy/node-http-handler": "npm:@smithy/node-http-handler@4.9.7",
  },
  customMethods: {
    sourceFile: new URL("./methods.ts", import.meta.url).pathname,
    methods: [
      {
        methodName: "retrieve",
        description:
          "Retrieve relevant chunks from a Bedrock Knowledge Base using semantic or hybrid search",
        argumentFields: [
          `    knowledgeBaseId: z.string().describe("The unique identifier of the Knowledge Base to query"),`,
          `    query: z.string().describe("The natural-language query to retrieve relevant chunks for"),`,
          `    numberOfResults: z.number().int().min(1).max(100).describe("Maximum number of retrieval results to return (default: 5)").optional(),`,
          `    searchType: z.enum(["SEMANTIC", "HYBRID"]).describe("Search type — SEMANTIC (vector similarity) or HYBRID (vector + keyword)").optional(),`,
          `    filter: z.record(z.string(), z.unknown()).describe("Retrieval filter configuration to narrow results by metadata attributes").optional(),`,
          `    nextToken: z.string().describe("Pagination token from a previous retrieve call").optional(),`,
        ],
        functionExport: "retrieve",
        returnsArray: false,
        output: {
          resourceName: "retrieval",
          description:
            "Chunks retrieved from the Knowledge Base for the most recent query",
          schemaExport: "RetrieveOutputSchema",
          lifetime: "7d",
          garbageCollection: 10,
          instanceKey: { arg: "knowledgeBaseId" },
        },
      },
    ],
  },
};
