import { assertEquals, assertStringIncludes } from "@std/assert";
import { enrichState } from "./enrich.ts";
import type { AwsCredentials } from "../../../../model/aws/rds/extensions/models/_lib/aws.ts";

const TEST_CREDENTIALS: AwsCredentials = {
  accessKeyId: "AKIAIOSFODNN7EXAMPLE",
  secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  region: "eu-west-1",
};

const ENV_KEYS = [
  "AWS_ENDPOINT_URL",
  "AWS_PROFILE",
  "AWS_REGION",
  "AWS_DEFAULT_REGION",
  "AWS_EC2_METADATA_DISABLED",
];

// Runs fn against a local RDS endpoint, recording each request's
// Authorization header. AWS env vars are pinned for the duration and restored
// afterwards so the SDK never reads the developer's profile or IMDS.
async function withRdsServer(
  respond: (body: string) => Response,
  fn: (authorizations: string[]) => Promise<void>,
  env: Record<string, string> = {},
): Promise<void> {
  const authorizations: string[] = [];
  const server = Deno.serve({ port: 0, onListen: () => {} }, async (req) => {
    authorizations.push(req.headers.get("authorization") ?? "");
    return respond(await req.text());
  });
  const addr = server.addr as Deno.NetAddr;
  const saved = new Map(ENV_KEYS.map((k) => [k, Deno.env.get(k)]));
  try {
    for (const k of ENV_KEYS) Deno.env.delete(k);
    Deno.env.set("AWS_ENDPOINT_URL", `http://127.0.0.1:${addr.port}`);
    Deno.env.set("AWS_EC2_METADATA_DISABLED", "true");
    for (const [k, v] of Object.entries(env)) Deno.env.set(k, v);
    await fn(authorizations);
  } finally {
    for (const [k, v] of saved) {
      if (v !== undefined) Deno.env.set(k, v);
      else Deno.env.delete(k);
    }
    await server.shutdown();
  }
}

function xmlResponse(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: { "content-type": "text/xml" },
  });
}

const CLUSTERS_XML = `<DescribeDBClustersResponse>
  <DescribeDBClustersResult>
    <DBClusters>
      <DBCluster>
        <DBClusterIdentifier>orders</DBClusterIdentifier>
        <DBClusterMembers>
          <DBClusterMember>
            <DBInstanceIdentifier>orders-1</DBInstanceIdentifier>
            <IsClusterWriter>true</IsClusterWriter>
            <PromotionTier>1</PromotionTier>
          </DBClusterMember>
        </DBClusterMembers>
      </DBCluster>
    </DBClusters>
  </DescribeDBClustersResult>
</DescribeDBClustersResponse>`;

const INSTANCES_XML = `<DescribeDBInstancesResponse>
  <DescribeDBInstancesResult>
    <DBInstances>
      <DBInstance>
        <DBInstanceIdentifier>orders-1</DBInstanceIdentifier>
        <DBInstanceClass>db.r6g.large</DBInstanceClass>
        <AvailabilityZone>us-east-1a</AvailabilityZone>
      </DBInstance>
    </DBInstances>
  </DescribeDBInstancesResult>
</DescribeDBInstancesResponse>`;

Deno.test({
  name: "enrichState signs for the credentials region, not AWS_REGION",
  // @aws-sdk/client-rds leaks connection pool resources
  sanitizeResources: false,
  sanitizeOps: false,
  fn: async () => {
    await withRdsServer(
      (body) =>
        xmlResponse(
          body.includes("Action=DescribeDBInstances")
            ? INSTANCES_XML
            : CLUSTERS_XML,
        ),
      async (authorizations) => {
        const result = await enrichState({ DBClusterIdentifier: "orders" }, {
          ...TEST_CREDENTIALS,
          region: "us-east-1",
        });

        assertEquals(authorizations.length, 2);
        for (const auth of authorizations) {
          assertStringIncludes(auth, "/us-east-1/rds/aws4_request");
        }
        assertEquals(result.DBClusterMembers, [{
          DBInstanceIdentifier: "orders-1",
          IsClusterWriter: true,
          DBClusterParameterGroupStatus: undefined,
          PromotionTier: 1,
          DBInstanceClass: "db.r6g.large",
          AvailabilityZone: "us-east-1a",
        }]);
      },
      { AWS_REGION: "ap-southeast-2" },
    );
  },
});

Deno.test({
  name: "enrichState signs for the cluster ARN's region",
  // @aws-sdk/client-rds leaks connection pool resources
  sanitizeResources: false,
  sanitizeOps: false,
  fn: async () => {
    await withRdsServer(
      (body) =>
        xmlResponse(
          body.includes("Action=DescribeDBInstances")
            ? INSTANCES_XML
            : CLUSTERS_XML,
        ),
      async (authorizations) => {
        await enrichState({
          DBClusterIdentifier: "orders",
          DBClusterArn: "arn:aws:rds:eu-central-1:123456789012:cluster:orders",
        }, { ...TEST_CREDENTIALS, region: "us-east-1" });

        assertEquals(authorizations.length, 2);
        for (const auth of authorizations) {
          assertStringIncludes(auth, "/eu-central-1/rds/aws4_request");
        }
      },
      { AWS_REGION: "ap-southeast-2" },
    );
  },
});

Deno.test({
  name: "enrichState returns state unchanged when DescribeDBClusters fails",
  // @aws-sdk/client-rds leaks connection pool resources
  sanitizeResources: false,
  sanitizeOps: false,
  fn: async () => {
    await withRdsServer(
      () =>
        xmlResponse(
          `<ErrorResponse><Error><Code>AccessDenied</Code><Message>denied</Message></Error></ErrorResponse>`,
          403,
        ),
      async (authorizations) => {
        const state = { DBClusterIdentifier: "orders" };
        const result = await enrichState(state, TEST_CREDENTIALS);

        assertEquals(authorizations.length >= 1, true);
        assertEquals(result, state);
      },
    );
  },
});
