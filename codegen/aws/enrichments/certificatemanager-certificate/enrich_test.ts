import { assertEquals, assertStringIncludes } from "@std/assert";
import { AcmRenewalSummarySchema, enrichState } from "./enrich.ts";
import type { AwsCredentials } from "../../../../model/aws/certificatemanager/extensions/models/_lib/aws.ts";

const ARN =
  "arn:aws:acm:eu-west-1:123456789012:certificate/11111111-2222-3333-4444-555555555555";

const TEST_CREDENTIALS: AwsCredentials = {
  accessKeyId: "AKIAIOSFODNN7EXAMPLE",
  secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  region: "eu-west-1",
};

const ENV_KEYS = [
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
  "AWS_SESSION_TOKEN",
  "AWS_ENDPOINT_URL",
  "AWS_PROFILE",
  "AWS_REGION",
  "AWS_DEFAULT_REGION",
  "AWS_EC2_METADATA_DISABLED",
];

interface Received {
  target: string | null;
  authorization: string | null;
  body: Record<string, unknown>;
}

// Runs fn against a local ACM endpoint, recording every request it receives.
// AWS env vars are pinned for the duration and restored afterwards so the SDK
// never reads the developer's profile, SSO cache, or IMDS.
async function withAcmServer(
  respond: () => Response,
  fn: (received: Received[]) => Promise<void>,
  env: Record<string, string> = {},
): Promise<void> {
  const received: Received[] = [];
  const server = Deno.serve({ port: 0, onListen: () => {} }, async (req) => {
    received.push({
      target: req.headers.get("x-amz-target"),
      authorization: req.headers.get("authorization"),
      body: await req.json(),
    });
    return respond();
  });
  const addr = server.addr as Deno.NetAddr;
  const saved = new Map(ENV_KEYS.map((k) => [k, Deno.env.get(k)]));
  try {
    for (const k of ENV_KEYS) Deno.env.delete(k);
    Deno.env.set("AWS_ENDPOINT_URL", `http://127.0.0.1:${addr.port}`);
    Deno.env.set("AWS_EC2_METADATA_DISABLED", "true");
    for (const [k, v] of Object.entries(env)) Deno.env.set(k, v);
    await fn(received);
  } finally {
    for (const [k, v] of saved) {
      if (v !== undefined) Deno.env.set(k, v);
      else Deno.env.delete(k);
    }
    await server.shutdown();
  }
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/x-amz-json-1.1" },
  });
}

// ACM's JSON protocol encodes timestamps as epoch seconds.
const NOT_BEFORE = Date.UTC(2026, 0, 1) / 1000;
const NOT_AFTER = Date.UTC(2026, 11, 20) / 1000;
const UPDATED_AT = Date.UTC(2026, 9, 1, 12) / 1000;

Deno.test({
  name: "enrichState merges an imported, ineligible certificate",
  // @aws-sdk/client-acm leaks connection pool resources
  sanitizeResources: false,
  sanitizeOps: false,
  fn: async () => {
    await withAcmServer(
      () =>
        jsonResponse({
          Certificate: {
            CertificateArn: ARN,
            DomainName: "acm-reported.example.com",
            NotBefore: NOT_BEFORE,
            NotAfter: NOT_AFTER,
            Type: "IMPORTED",
            Status: "ISSUED",
            RenewalEligibility: "INELIGIBLE",
            InUseBy: [
              "arn:aws:elasticloadbalancing:eu-west-1:123456789012:loadbalancer/app/web/abc",
            ],
          },
        }),
      async (received) => {
        const state = { CertificateArn: ARN, DomainName: "*.example.com" };
        const result = await enrichState(state, TEST_CREDENTIALS);

        assertEquals(received.length, 1);
        assertEquals(
          received[0].target,
          "CertificateManager.DescribeCertificate",
        );
        assertEquals(received[0].body, { CertificateArn: ARN });
        assertEquals(result.NotBefore, "2026-01-01T00:00:00.000Z");
        assertEquals(result.NotAfter, "2026-12-20T00:00:00.000Z");
        assertEquals(result.Type, "IMPORTED");
        assertEquals(result.Status, "ISSUED");
        assertEquals(result.RenewalEligibility, "INELIGIBLE");
        assertEquals(result.InUseBy, [
          "arn:aws:elasticloadbalancing:eu-west-1:123456789012:loadbalancer/app/web/abc",
        ]);
        assertEquals(result.RenewalSummary, undefined);
        // CloudFormation-modelled fields are left as CloudControl reported them
        assertEquals(result.DomainName, "*.example.com");
      },
    );
  },
});

Deno.test({
  name: "enrichState maps an Amazon-issued certificate's renewal summary",
  // @aws-sdk/client-acm leaks connection pool resources
  sanitizeResources: false,
  sanitizeOps: false,
  fn: async () => {
    await withAcmServer(
      () =>
        jsonResponse({
          Certificate: {
            CertificateArn: ARN,
            NotAfter: NOT_AFTER,
            Type: "AMAZON_ISSUED",
            Status: "ISSUED",
            RenewalEligibility: "ELIGIBLE",
            InUseBy: [],
            RenewalSummary: {
              RenewalStatus: "PENDING_AUTO_RENEWAL",
              UpdatedAt: UPDATED_AT,
              DomainValidationOptions: [{
                DomainName: "app.example.com",
                ValidationDomain: "app.example.com",
                ValidationStatus: "SUCCESS",
                ValidationMethod: "DNS",
                ResourceRecord: {
                  Name: "_x.app.example.com.",
                  Type: "CNAME",
                  Value: "_y.acm-validations.aws.",
                },
              }],
            },
          },
        }),
      async (received) => {
        const result = await enrichState(
          { CertificateArn: ARN },
          TEST_CREDENTIALS,
        );

        assertEquals(received.length, 1);
        assertEquals(result.Type, "AMAZON_ISSUED");
        assertEquals(result.RenewalEligibility, "ELIGIBLE");
        const summary = AcmRenewalSummarySchema.parse(result.RenewalSummary);
        assertEquals(summary.RenewalStatus, "PENDING_AUTO_RENEWAL");
        assertEquals(summary.UpdatedAt, "2026-10-01T12:00:00.000Z");
        assertEquals(summary.DomainValidationOptions?.[0].ResourceRecord, {
          Name: "_x.app.example.com.",
          Type: "CNAME",
          Value: "_y.acm-validations.aws.",
        });
      },
    );
  },
});

Deno.test({
  name: "enrichState signs for the certificate ARN's region",
  // @aws-sdk/client-acm leaks connection pool resources
  sanitizeResources: false,
  sanitizeOps: false,
  fn: async () => {
    await withAcmServer(
      () => jsonResponse({ Certificate: { CertificateArn: ARN } }),
      async (received) => {
        // Neither the credentials region nor AWS_REGION is where the
        // certificate lives; only the ARN is authoritative.
        await enrichState({ CertificateArn: ARN }, {
          ...TEST_CREDENTIALS,
          region: "us-east-1",
        });

        assertEquals(received.length, 1);
        assertStringIncludes(
          received[0].authorization ?? "",
          "/eu-west-1/acm/aws4_request",
        );
      },
      { AWS_REGION: "ap-southeast-2" },
    );
  },
});

Deno.test({
  name: "enrichState uses the default credential chain without static keys",
  // @aws-sdk/client-acm leaks connection pool resources
  sanitizeResources: false,
  sanitizeOps: false,
  fn: async () => {
    await withAcmServer(
      () => jsonResponse({ Certificate: { CertificateArn: ARN } }),
      async (received) => {
        await enrichState({ CertificateArn: ARN }, { region: "us-east-1" });

        assertEquals(received.length, 1);
        assertStringIncludes(
          received[0].authorization ?? "",
          "Credential=AKIDEXAMPLEFROMENV/",
        );
      },
      {
        AWS_ACCESS_KEY_ID: "AKIDEXAMPLEFROMENV",
        AWS_SECRET_ACCESS_KEY: "env-secret",
      },
    );
  },
});

Deno.test({
  name: "enrichState returns state unchanged on AccessDeniedException",
  // @aws-sdk/client-acm leaks connection pool resources
  sanitizeResources: false,
  sanitizeOps: false,
  fn: async () => {
    await withAcmServer(
      () =>
        jsonResponse({
          __type: "AccessDeniedException",
          message: "not authorized to perform acm:DescribeCertificate",
        }, 400),
      async (received) => {
        const state = { CertificateArn: ARN, DomainName: "*.example.com" };
        const result = await enrichState(state, TEST_CREDENTIALS);

        assertEquals(received.length, 1);
        assertEquals(result, state);
      },
    );
  },
});

Deno.test({
  name: "enrichState returns state unchanged on a malformed non-JSON body",
  // @aws-sdk/client-acm leaks connection pool resources
  sanitizeResources: false,
  sanitizeOps: false,
  fn: async () => {
    await withAcmServer(
      () =>
        new Response("<html>502 Bad Gateway</html>", {
          status: 500,
          headers: { "content-type": "text/html" },
        }),
      async (received) => {
        const state = { CertificateArn: ARN };
        const result = await enrichState(state, TEST_CREDENTIALS);

        assertEquals(received.length >= 1, true);
        assertEquals(result, state);
      },
    );
  },
});

Deno.test("enrichState makes no request without a CertificateArn", async () => {
  await withAcmServer(
    () => jsonResponse({}),
    async (received) => {
      const state = { DomainName: "*.example.com" };
      const result = await enrichState(state, TEST_CREDENTIALS);

      assertEquals(received.length, 0);
      assertEquals(result, state);
    },
  );
});
