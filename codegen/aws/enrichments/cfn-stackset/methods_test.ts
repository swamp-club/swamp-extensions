import { assertEquals, assertRejects } from "@std/assert";
import {
  describeOperation,
  detectDrift,
  listInstances,
  listOperations,
} from "./methods.ts";
import type { AwsCredentials } from "../../../../model/aws/cloudformation/extensions/models/_lib/aws.ts";

function xmlResponse(body: string): Response {
  return new Response(body, {
    headers: { "content-type": "text/xml" },
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

// CloudFormation uses AWS Query protocol — responses are XML
Deno.test({
  name: "listInstances returns paginated instances",
  // @aws-sdk/client-cloudformation leaks connection pool resources
  sanitizeResources: false,
  fn: async () => {
    let callCount = 0;
    const { server, url } = createMockServer((_req) => {
      callCount++;
      if (callCount === 1) {
        return xmlResponse(`<ListStackInstancesResponse>
  <ListStackInstancesResult>
    <Summaries>
      <member>
        <Account>111111111111</Account>
        <Region>us-east-1</Region>
        <Status>CURRENT</Status>
        <StackInstanceStatus><DetailedStatus>SUCCEEDED</DetailedStatus></StackInstanceStatus>
        <DriftStatus>IN_SYNC</DriftStatus>
        <StackId>arn:aws:cloudformation:us-east-1:111111111111:stack/my-stack/guid</StackId>
      </member>
    </Summaries>
    <NextToken>page2</NextToken>
  </ListStackInstancesResult>
</ListStackInstancesResponse>`);
      }
      return xmlResponse(`<ListStackInstancesResponse>
  <ListStackInstancesResult>
    <Summaries>
      <member>
        <Account>222222222222</Account>
        <Region>eu-west-1</Region>
        <Status>OUTDATED</Status>
        <StatusReason>Update pending</StatusReason>
        <DriftStatus>DRIFTED</DriftStatus>
      </member>
    </Summaries>
  </ListStackInstancesResult>
</ListStackInstancesResponse>`);
    });

    const saved = Deno.env.get("AWS_ENDPOINT_URL");
    try {
      Deno.env.set("AWS_ENDPOINT_URL", url);
      const result = await listInstances(
        { StackSetName: "test-stackset" },
        TEST_CREDENTIALS,
      );

      assertEquals(result.length, 2);
      assertEquals(result[0].Account, "111111111111");
      assertEquals(result[0].Region, "us-east-1");
      assertEquals(result[0].Status, "CURRENT");
      assertEquals(result[0].DriftStatus, "IN_SYNC");
      assertEquals(result[1].Account, "222222222222");
      assertEquals(result[1].Status, "OUTDATED");
      assertEquals(result[1].StatusReason, "Update pending");
    } finally {
      if (saved !== undefined) Deno.env.set("AWS_ENDPOINT_URL", saved);
      else Deno.env.delete("AWS_ENDPOINT_URL");
      await server.shutdown();
    }
  },
});

Deno.test({
  name: "listInstances returns empty array when no instances",
  sanitizeResources: false,
  fn: async () => {
    const { server, url } = createMockServer((_req) => {
      return xmlResponse(`<ListStackInstancesResponse>
  <ListStackInstancesResult>
    <Summaries/>
  </ListStackInstancesResult>
</ListStackInstancesResponse>`);
    });

    const saved = Deno.env.get("AWS_ENDPOINT_URL");
    try {
      Deno.env.set("AWS_ENDPOINT_URL", url);
      const result = await listInstances(
        { StackSetName: "empty-stackset" },
        TEST_CREDENTIALS,
      );
      assertEquals(result.length, 0);
    } finally {
      if (saved !== undefined) Deno.env.set("AWS_ENDPOINT_URL", saved);
      else Deno.env.delete("AWS_ENDPOINT_URL");
      await server.shutdown();
    }
  },
});

Deno.test({
  name: "listOperations returns operation summaries",
  sanitizeResources: false,
  fn: async () => {
    const { server, url } = createMockServer((_req) => {
      return xmlResponse(`<ListStackSetOperationsResponse>
  <ListStackSetOperationsResult>
    <Summaries>
      <member>
        <OperationId>op-1234</OperationId>
        <Action>CREATE</Action>
        <Status>SUCCEEDED</Status>
        <CreationTimestamp>2026-06-15T10:00:00Z</CreationTimestamp>
        <EndTimestamp>2026-06-15T10:05:00Z</EndTimestamp>
      </member>
      <member>
        <OperationId>op-5678</OperationId>
        <Action>UPDATE</Action>
        <Status>FAILED</Status>
        <StatusReason>Deployment failure</StatusReason>
        <CreationTimestamp>2026-06-15T11:00:00Z</CreationTimestamp>
      </member>
    </Summaries>
  </ListStackSetOperationsResult>
</ListStackSetOperationsResponse>`);
    });

    const saved = Deno.env.get("AWS_ENDPOINT_URL");
    try {
      Deno.env.set("AWS_ENDPOINT_URL", url);
      const result = await listOperations(
        { StackSetName: "test-stackset" },
        TEST_CREDENTIALS,
      );

      assertEquals(result.length, 2);
      assertEquals(result[0].OperationId, "op-1234");
      assertEquals(result[0].Action, "CREATE");
      assertEquals(result[0].Status, "SUCCEEDED");
      assertEquals(result[1].OperationId, "op-5678");
      assertEquals(result[1].Status, "FAILED");
      assertEquals(result[1].StatusReason, "Deployment failure");
    } finally {
      if (saved !== undefined) Deno.env.set("AWS_ENDPOINT_URL", saved);
      else Deno.env.delete("AWS_ENDPOINT_URL");
      await server.shutdown();
    }
  },
});

Deno.test({
  name: "describeOperation returns operation detail",
  sanitizeResources: false,
  fn: async () => {
    const { server, url } = createMockServer((_req) => {
      return xmlResponse(`<DescribeStackSetOperationResponse>
  <DescribeStackSetOperationResult>
    <StackSetOperation>
      <OperationId>op-1234</OperationId>
      <StackSetId>stackset-id-1234</StackSetId>
      <Action>CREATE</Action>
      <Status>SUCCEEDED</Status>
      <CreationTimestamp>2026-06-15T10:00:00Z</CreationTimestamp>
      <EndTimestamp>2026-06-15T10:05:00Z</EndTimestamp>
      <AdministrationRoleARN>arn:aws:iam::123456789012:role/Admin</AdministrationRoleARN>
      <ExecutionRoleName>AWSCloudFormationStackSetExecutionRole</ExecutionRoleName>
    </StackSetOperation>
  </DescribeStackSetOperationResult>
</DescribeStackSetOperationResponse>`);
    });

    const saved = Deno.env.get("AWS_ENDPOINT_URL");
    try {
      Deno.env.set("AWS_ENDPOINT_URL", url);
      const result = await describeOperation(
        { StackSetName: "test-stackset", operationId: "op-1234" },
        TEST_CREDENTIALS,
      );

      assertEquals(result.OperationId, "op-1234");
      assertEquals(result.StackSetId, "stackset-id-1234");
      assertEquals(result.Action, "CREATE");
      assertEquals(result.Status, "SUCCEEDED");
      assertEquals(
        result.ExecutionRoleName,
        "AWSCloudFormationStackSetExecutionRole",
      );
    } finally {
      if (saved !== undefined) Deno.env.set("AWS_ENDPOINT_URL", saved);
      else Deno.env.delete("AWS_ENDPOINT_URL");
      await server.shutdown();
    }
  },
});

Deno.test({
  name: "detectDrift polls until COMPLETED",
  sanitizeResources: false,
  fn: async () => {
    let callCount = 0;
    const { server, url } = createMockServer(async (req) => {
      const body = await req.text();
      callCount++;

      if (body.includes("DetectStackSetDrift")) {
        return xmlResponse(`<DetectStackSetDriftResponse>
  <DetectStackSetDriftResult>
    <OperationId>drift-op-1234</OperationId>
  </DetectStackSetDriftResult>
</DetectStackSetDriftResponse>`);
      }

      if (body.includes("DescribeStackSetOperation")) {
        if (callCount <= 3) {
          return xmlResponse(`<DescribeStackSetOperationResponse>
  <DescribeStackSetOperationResult>
    <StackSetOperation>
      <OperationId>drift-op-1234</OperationId>
      <Action>DETECT_DRIFT</Action>
      <Status>RUNNING</Status>
    </StackSetOperation>
  </DescribeStackSetOperationResult>
</DescribeStackSetOperationResponse>`);
        }
        return xmlResponse(`<DescribeStackSetOperationResponse>
  <DescribeStackSetOperationResult>
    <StackSetOperation>
      <OperationId>drift-op-1234</OperationId>
      <Action>DETECT_DRIFT</Action>
      <Status>SUCCEEDED</Status>
      <StackSetDriftDetectionDetails>
        <DriftStatus>DRIFTED</DriftStatus>
        <DriftDetectionStatus>COMPLETED</DriftDetectionStatus>
        <DriftedStackInstancesCount>2</DriftedStackInstancesCount>
        <InSyncStackInstancesCount>3</InSyncStackInstancesCount>
        <InProgressStackInstancesCount>0</InProgressStackInstancesCount>
        <FailedStackInstancesCount>0</FailedStackInstancesCount>
        <TotalStackInstancesCount>5</TotalStackInstancesCount>
      </StackSetDriftDetectionDetails>
    </StackSetOperation>
  </DescribeStackSetOperationResult>
</DescribeStackSetOperationResponse>`);
      }

      return new Response("Unknown action", { status: 400 });
    });

    const saved = Deno.env.get("AWS_ENDPOINT_URL");
    try {
      Deno.env.set("AWS_ENDPOINT_URL", url);
      const result = await detectDrift(
        {
          StackSetName: "test-stackset",
          pollIntervalMs: 100,
          timeoutMs: 10000,
        },
        TEST_CREDENTIALS,
      );

      assertEquals(result.OperationId, "drift-op-1234");
      assertEquals(result.OperationStatus, "SUCCEEDED");
      assertEquals(result.DriftDetectionStatus, "COMPLETED");
      assertEquals(result.DriftStatus, "DRIFTED");
      assertEquals(result.DriftedStackInstancesCount, 2);
      assertEquals(result.InSyncStackInstancesCount, 3);
      assertEquals(result.TotalStackInstancesCount, 5);
    } finally {
      if (saved !== undefined) Deno.env.set("AWS_ENDPOINT_URL", saved);
      else Deno.env.delete("AWS_ENDPOINT_URL");
      await server.shutdown();
    }
  },
});

Deno.test({
  name: "detectDrift times out when status never completes",
  sanitizeResources: false,
  fn: async () => {
    const { server, url } = createMockServer(async (req) => {
      const body = await req.text();

      if (body.includes("DetectStackSetDrift")) {
        return xmlResponse(`<DetectStackSetDriftResponse>
  <DetectStackSetDriftResult>
    <OperationId>drift-op-timeout</OperationId>
  </DetectStackSetDriftResult>
</DetectStackSetDriftResponse>`);
      }

      return xmlResponse(`<DescribeStackSetOperationResponse>
  <DescribeStackSetOperationResult>
    <StackSetOperation>
      <OperationId>drift-op-timeout</OperationId>
      <Action>DETECT_DRIFT</Action>
      <Status>RUNNING</Status>
    </StackSetOperation>
  </DescribeStackSetOperationResult>
</DescribeStackSetOperationResponse>`);
    });

    const saved = Deno.env.get("AWS_ENDPOINT_URL");
    try {
      Deno.env.set("AWS_ENDPOINT_URL", url);
      await assertRejects(
        () =>
          detectDrift(
            {
              StackSetName: "test-stackset",
              pollIntervalMs: 50,
              timeoutMs: 200,
            },
            TEST_CREDENTIALS,
          ),
        Error,
        "timed out",
      );
    } finally {
      if (saved !== undefined) Deno.env.set("AWS_ENDPOINT_URL", saved);
      else Deno.env.delete("AWS_ENDPOINT_URL");
      await server.shutdown();
    }
  },
});
