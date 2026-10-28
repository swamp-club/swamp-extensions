import { assert, assertEquals, assertRejects } from "@std/assert";
import {
  DomainAssociationOutputSchema,
  getDomainAssociation,
} from "./methods.ts";
import type { AwsCredentials } from "../../../../model/aws/amplify/extensions/models/_lib/aws.ts";

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

async function withEndpoint(
  url: string,
  server: Deno.HttpServer,
  fn: () => Promise<void>,
  release?: () => void,
): Promise<void> {
  const saved = Deno.env.get("AWS_ENDPOINT_URL");
  try {
    Deno.env.set("AWS_ENDPOINT_URL", url);
    await fn();
  } finally {
    if (saved !== undefined) Deno.env.set("AWS_ENDPOINT_URL", saved);
    else Deno.env.delete("AWS_ENDPOINT_URL");
    release?.();
    await server.shutdown();
  }
}

const TEST_CREDENTIALS: AwsCredentials = {
  accessKeyId: "AKIAIOSFODNN7EXAMPLE",
  secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  region: "us-east-1",
};

const ARGS = { AppId: "d1abc2def3", DomainName: "example.com" };

// @aws-sdk/client-amplify (NodeHttpHandler) leaks connection pool resources
Deno.test({
  name: "getDomainAssociation maps subdomains to branch bindings",
  sanitizeResources: false,
  fn: async () => {
    let path = "";
    const { server, url } = createMockServer((req) => {
      path = new URL(req.url).pathname;
      return jsonResponse({
        domainAssociation: {
          domainAssociationArn:
            "arn:aws:amplify:us-east-1:111111111111:apps/d1abc2def3/domains/example.com",
          domainName: "example.com",
          enableAutoSubDomain: false,
          domainStatus: "AVAILABLE",
          updateStatus: "UPDATE_COMPLETE",
          statusReason: "",
          certificateVerificationDNSRecord: "_abc.example.com. CNAME _x.acm",
          subDomains: [
            {
              subDomainSetting: { prefix: "", branchName: "main" },
              verified: true,
              dnsRecord: " CNAME d1abc2def3.cloudfront.net",
            },
            {
              subDomainSetting: { prefix: "www", branchName: "main" },
              verified: false,
              dnsRecord: "www CNAME d1abc2def3.cloudfront.net",
            },
          ],
          certificate: { type: "AMPLIFY_MANAGED" },
        },
      });
    });

    await withEndpoint(url, server, async () => {
      const result = DomainAssociationOutputSchema.parse(
        await getDomainAssociation(ARGS, TEST_CREDENTIALS),
      );
      assertEquals(path, "/apps/d1abc2def3/domains/example.com");
      assertEquals(result.domainStatus, "AVAILABLE");
      assertEquals(result.updateStatus, "UPDATE_COMPLETE");
      assertEquals(result.certificateType, "AMPLIFY_MANAGED");
      assertEquals(result.branchBindings, [
        { prefix: "", branchName: "main", verified: true },
        { prefix: "www", branchName: "main", verified: false },
      ]);
    });
  },
});

Deno.test({
  name: "getDomainAssociation rejects a malformed 403",
  sanitizeResources: false,
  fn: async () => {
    const { server, url } = createMockServer(() =>
      new Response("Forbidden", {
        status: 403,
        headers: { "content-type": "text/plain" },
      })
    );

    await withEndpoint(url, server, async () => {
      await assertRejects(() => getDomainAssociation(ARGS, TEST_CREDENTIALS));
    });
  },
});

Deno.test({
  name: "getDomainAssociation rejects when the deadline passes",
  sanitizeResources: false,
  fn: async () => {
    let release = () => {};
    const hung = new Promise<void>((resolve) => release = resolve);
    const { server, url } = createMockServer(async () => {
      await hung;
      return jsonResponse({});
    });

    await withEndpoint(url, server, async () => {
      const started = Date.now();
      await assertRejects(
        () =>
          getDomainAssociation({ ...ARGS, timeoutMs: 300 }, TEST_CREDENTIALS),
        Error,
        "did not complete within 300ms",
      );
      assert(Date.now() - started < 5000, "deadline was not enforced");
    }, release);
  },
});
