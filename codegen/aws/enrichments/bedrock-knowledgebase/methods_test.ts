import { assertEquals, assertRejects } from "@std/assert";
import { retrieve, RetrieveOutputSchema } from "./methods.ts";
import type { AwsCredentials } from "../../../../model/aws/bedrock/extensions/models/_lib/aws.ts";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function createMockServer(
  handler: (req: Request) => Response | Promise<Response>,
): { server: Deno.HttpServer; url: string; port: number } {
  const server = Deno.serve({ port: 0, onListen: () => {} }, handler);
  const addr = server.addr as Deno.NetAddr;
  return {
    server,
    url: `http://127.0.0.1:${addr.port}`,
    port: addr.port,
  };
}

const TEST_CREDENTIALS: AwsCredentials = {
  accessKeyId: "AKIAIOSFODNN7EXAMPLE",
  secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  region: "us-east-1",
};

// @aws-sdk/client-bedrock-agent-runtime leaks connection pool resources
Deno.test({
  name: "retrieve returns retrieval results with content and score",
  sanitizeResources: false,
  fn: async () => {
    const { server, url } = createMockServer((_req) => {
      return jsonResponse({
        retrievalResults: [
          {
            content: {
              text: "Amazon Bedrock is a managed service",
              type: "TEXT",
            },
            score: 0.92,
            location: {
              type: "S3",
              s3Location: { uri: "s3://my-bucket/docs/bedrock.pdf" },
            },
            metadata: { source: "documentation" },
          },
          {
            content: { text: "Knowledge bases index your data", type: "TEXT" },
            score: 0.85,
            location: {
              type: "WEB",
              webLocation: { url: "https://docs.example.com/kb" },
            },
          },
        ],
      });
    });

    const savedEndpoint = Deno.env.get("AWS_ENDPOINT_URL");
    try {
      Deno.env.set("AWS_ENDPOINT_URL", url);
      const output = await retrieve(
        { knowledgeBaseId: "KB123", query: "What is Bedrock?" },
        TEST_CREDENTIALS,
      );

      assertEquals(output.resultCount, 2);
      const results = output.results as Record<string, unknown>[];
      assertEquals(results.length, 2);
      assertEquals(
        results[0].contentText,
        "Amazon Bedrock is a managed service",
      );
      assertEquals(results[0].contentType, "TEXT");
      assertEquals(results[0].score, 0.92);
      assertEquals(results[0].locationType, "S3");
      assertEquals(results[0].locationUri, "s3://my-bucket/docs/bedrock.pdf");
      assertEquals(results[0].metadata, { source: "documentation" });

      assertEquals(results[1].contentText, "Knowledge bases index your data");
      assertEquals(results[1].score, 0.85);
      assertEquals(results[1].locationType, "WEB");
      assertEquals(results[1].locationUrl, "https://docs.example.com/kb");
      assertEquals(output.nextToken, undefined);

      // The query is carried in the persisted data, not the instance name
      assertEquals(output.knowledgeBaseId, "KB123");
      assertEquals(output.query, "What is Bedrock?");
      // Second result has no metadata — optional fields must stay optional
      RetrieveOutputSchema.parse(output);
    } finally {
      if (savedEndpoint !== undefined) {
        Deno.env.set("AWS_ENDPOINT_URL", savedEndpoint);
      } else {
        Deno.env.delete("AWS_ENDPOINT_URL");
      }
      await server.shutdown();
    }
  },
});

// @aws-sdk/client-bedrock-agent-runtime leaks connection pool resources
Deno.test({
  name: "retrieve includes nextToken when response is paginated",
  sanitizeResources: false,
  fn: async () => {
    const { server, url } = createMockServer((_req) => {
      return jsonResponse({
        retrievalResults: [
          {
            content: { text: "Page one result", type: "TEXT" },
            score: 0.9,
          },
        ],
        nextToken: "page2token",
      });
    });

    const savedEndpoint = Deno.env.get("AWS_ENDPOINT_URL");
    try {
      Deno.env.set("AWS_ENDPOINT_URL", url);
      const output = await retrieve(
        { knowledgeBaseId: "KB123", query: "test query" },
        TEST_CREDENTIALS,
      );

      assertEquals(output.resultCount, 1);
      const results = output.results as Record<string, unknown>[];
      assertEquals(results.length, 1);
      assertEquals(results[0].contentText, "Page one result");
      assertEquals(output.nextToken, "page2token");
    } finally {
      if (savedEndpoint !== undefined) {
        Deno.env.set("AWS_ENDPOINT_URL", savedEndpoint);
      } else {
        Deno.env.delete("AWS_ENDPOINT_URL");
      }
      await server.shutdown();
    }
  },
});

// @aws-sdk/client-bedrock-agent-runtime leaks connection pool resources
Deno.test({
  name: "retrieve maps AccessDeniedException to actionable error",
  sanitizeResources: false,
  fn: async () => {
    const { server, url } = createMockServer((_req) => {
      return jsonResponse(
        {
          __type: "AccessDeniedException",
          message: "User is not authorized",
        },
        403,
      );
    });

    const savedEndpoint = Deno.env.get("AWS_ENDPOINT_URL");
    try {
      Deno.env.set("AWS_ENDPOINT_URL", url);
      await assertRejects(
        () =>
          retrieve(
            { knowledgeBaseId: "KB-DENIED", query: "test" },
            TEST_CREDENTIALS,
          ),
        Error,
        "Access denied",
      );
    } finally {
      if (savedEndpoint !== undefined) {
        Deno.env.set("AWS_ENDPOINT_URL", savedEndpoint);
      } else {
        Deno.env.delete("AWS_ENDPOINT_URL");
      }
      await server.shutdown();
    }
  },
});

// @aws-sdk/client-bedrock-agent-runtime leaks connection pool resources
Deno.test({
  name: "retrieve maps ResourceNotFoundException to actionable error",
  sanitizeResources: false,
  fn: async () => {
    const { server, url } = createMockServer((_req) => {
      return jsonResponse(
        {
          __type: "ResourceNotFoundException",
          message: "Knowledge base not found",
        },
        404,
      );
    });

    const savedEndpoint = Deno.env.get("AWS_ENDPOINT_URL");
    try {
      Deno.env.set("AWS_ENDPOINT_URL", url);
      await assertRejects(
        () =>
          retrieve(
            { knowledgeBaseId: "KB-MISSING", query: "test" },
            TEST_CREDENTIALS,
          ),
        Error,
        "Knowledge base not found: KB-MISSING",
      );
    } finally {
      if (savedEndpoint !== undefined) {
        Deno.env.set("AWS_ENDPOINT_URL", savedEndpoint);
      } else {
        Deno.env.delete("AWS_ENDPOINT_URL");
      }
      await server.shutdown();
    }
  },
});

// @aws-sdk/client-bedrock-agent-runtime leaks connection pool resources
Deno.test({
  name: "retrieve maps ValidationException to actionable error",
  sanitizeResources: false,
  fn: async () => {
    const { server, url } = createMockServer((_req) => {
      return jsonResponse(
        {
          __type: "ValidationException",
          message: "Invalid number of results",
        },
        400,
      );
    });

    const savedEndpoint = Deno.env.get("AWS_ENDPOINT_URL");
    try {
      Deno.env.set("AWS_ENDPOINT_URL", url);
      await assertRejects(
        () =>
          retrieve(
            { knowledgeBaseId: "KB123", query: "test" },
            TEST_CREDENTIALS,
          ),
        Error,
        "Invalid request",
      );
    } finally {
      if (savedEndpoint !== undefined) {
        Deno.env.set("AWS_ENDPOINT_URL", savedEndpoint);
      } else {
        Deno.env.delete("AWS_ENDPOINT_URL");
      }
      await server.shutdown();
    }
  },
});
