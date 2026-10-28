import { assert, assertEquals, assertRejects } from "@std/assert";
import {
  getJob,
  JobHistoryOutputSchema,
  JobOutputSchema,
  listJobs,
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

const ARGS = { AppId: "d1abc2def3", BranchName: "main" };
const FULL_SHA = "0123456789abcdef0123456789abcdef01234567";
const SIGNED =
  "https://example-bucket.s3.amazonaws.com/x?X-Amz-Signature=deadbeef&X-Amz-Credential=AKIA";

function summary(jobId: string, overrides: Record<string, unknown> = {}) {
  return {
    jobArn:
      `arn:aws:amplify:us-east-1:111111111111:apps/d1abc2def3/branches/main/jobs/${jobId}`,
    jobId,
    commitId: FULL_SHA,
    commitMessage: "secret commit message",
    commitTime: 1761600000,
    startTime: 1761600060,
    endTime: 1761600360,
    status: "SUCCEED",
    jobType: "RELEASE",
    sourceUrl: SIGNED,
    sourceUrlType: "ZIP",
    ...overrides,
  };
}

function assertNoSensitiveContent(result: unknown): void {
  const text = JSON.stringify(result);
  for (
    const forbidden of [
      "X-Amz-Signature",
      "logUrl",
      "artifactsUrl",
      "testArtifactsUrl",
      "testConfigUrl",
      "screenshots",
      "sourceUrl",
      "secret commit message",
    ]
  ) {
    assert(!text.includes(forbidden), `output contains ${forbidden}`);
  }
}

// @aws-sdk/client-amplify (NodeHttpHandler) leaks connection pool resources
Deno.test({
  name: "listJobs follows every page and reports complete coverage",
  sanitizeResources: false,
  fn: async () => {
    const tokens: (string | null)[] = [];
    const { server, url } = createMockServer((req) => {
      const token = new URL(req.url).searchParams.get("nextToken");
      tokens.push(token);
      if (!token) {
        return jsonResponse({
          jobSummaries: [summary("12"), summary("11")],
          nextToken: "page2",
        });
      }
      return jsonResponse({ jobSummaries: [summary("10")] });
    });

    await withEndpoint(url, server, async () => {
      const result = await listJobs(ARGS, TEST_CREDENTIALS);
      const parsed = JobHistoryOutputSchema.parse(result);
      assertEquals(tokens, [null, "page2"]);
      assertEquals(parsed.jobs.map((j) => j.jobId), ["12", "11", "10"]);
      assertEquals(parsed.coverage.pagesFetched, 2);
      assertEquals(parsed.coverage.jobsReturned, 3);
      assertEquals(parsed.coverage.complete, true);
      assertEquals(parsed.coverage.stopReason, "exhausted");
      assertEquals(parsed.jobs[0].startTime, "2025-10-27T21:21:00.000Z");
      assertEquals(parsed.jobs[0].endTime, "2025-10-27T21:26:00.000Z");
      assertEquals(parsed.jobs[0].terminal, true);
      assertNoSensitiveContent(result);
    });
  },
});

Deno.test({
  name: "listJobs stops at maxPages and reports incomplete coverage",
  sanitizeResources: false,
  fn: async () => {
    let calls = 0;
    const { server, url } = createMockServer(() => {
      calls++;
      return jsonResponse({
        jobSummaries: [summary(String(100 - calls))],
        nextToken: `page${calls + 1}`,
      });
    });

    await withEndpoint(url, server, async () => {
      const result = JobHistoryOutputSchema.parse(
        await listJobs({ ...ARGS, maxPages: 2, pageSize: 1 }, TEST_CREDENTIALS),
      );
      assertEquals(calls, 2);
      assertEquals(result.coverage.pagesFetched, 2);
      assertEquals(result.coverage.complete, false);
      assertEquals(result.coverage.stopReason, "maxPages");
    });
  },
});

Deno.test({
  name: "listJobs reports exhausted when the last permitted page has no token",
  sanitizeResources: false,
  fn: async () => {
    let calls = 0;
    const { server, url } = createMockServer(() => {
      calls++;
      return calls === 1
        ? jsonResponse({ jobSummaries: [summary("2")], nextToken: "page2" })
        : jsonResponse({ jobSummaries: [summary("1")] });
    });

    await withEndpoint(url, server, async () => {
      const result = JobHistoryOutputSchema.parse(
        await listJobs({ ...ARGS, maxPages: 2 }, TEST_CREDENTIALS),
      );
      assertEquals(calls, 2);
      assertEquals(result.coverage.complete, true);
      assertEquals(result.coverage.stopReason, "exhausted");
    });
  },
});

Deno.test({
  name: "listJobs rejects when a later page is denied",
  sanitizeResources: false,
  fn: async () => {
    let calls = 0;
    const { server, url } = createMockServer(() => {
      calls++;
      if (calls === 1) {
        return jsonResponse({ jobSummaries: [summary("2")], nextToken: "p2" });
      }
      return new Response(
        JSON.stringify({ message: "not authorized" }),
        {
          status: 403,
          headers: {
            "content-type": "application/json",
            "x-amzn-errortype": "AccessDeniedException",
          },
        },
      );
    });

    await withEndpoint(url, server, async () => {
      await assertRejects(() => listJobs(ARGS, TEST_CREDENTIALS));
    });
  },
});

Deno.test({
  name: "listJobs rejects when a later page returns a non-JSON 500",
  sanitizeResources: false,
  fn: async () => {
    let calls = 0;
    const { server, url } = createMockServer(() => {
      calls++;
      if (calls === 1) {
        return jsonResponse({ jobSummaries: [summary("2")], nextToken: "p2" });
      }
      return new Response("<html>Internal Server Error</html>", {
        status: 500,
        headers: { "content-type": "text/html" },
      });
    });

    await withEndpoint(url, server, async () => {
      await assertRejects(() => listJobs(ARGS, TEST_CREDENTIALS));
    });
  },
});

Deno.test({
  name: "listJobs rejects a malformed 403 on the first call",
  sanitizeResources: false,
  fn: async () => {
    const { server, url } = createMockServer(() =>
      new Response("Forbidden", {
        status: 403,
        headers: { "content-type": "text/plain" },
      })
    );

    await withEndpoint(url, server, async () => {
      await assertRejects(() => listJobs(ARGS, TEST_CREDENTIALS));
    });
  },
});

Deno.test({
  name: "listJobs returns fetched jobs when the deadline passes mid-listing",
  sanitizeResources: false,
  fn: async () => {
    let release = () => {};
    const hung = new Promise<void>((resolve) => release = resolve);
    let calls = 0;
    const { server, url } = createMockServer(async () => {
      calls++;
      if (calls === 1) {
        return jsonResponse({ jobSummaries: [summary("2")], nextToken: "p2" });
      }
      await hung;
      return jsonResponse({ jobSummaries: [] });
    });

    await withEndpoint(url, server, async () => {
      const started = Date.now();
      const result = JobHistoryOutputSchema.parse(
        await listJobs({ ...ARGS, timeoutMs: 300 }, TEST_CREDENTIALS),
      );
      assert(Date.now() - started < 5000, "deadline was not enforced");
      assertEquals(result.jobs.map((j) => j.jobId), ["2"]);
      assertEquals(result.coverage.pagesFetched, 1);
      assertEquals(result.coverage.complete, false);
      assertEquals(result.coverage.stopReason, "deadline");
    }, release);
  },
});

Deno.test({
  name: "listJobs rejects when the deadline passes before any page arrives",
  sanitizeResources: false,
  fn: async () => {
    let calls = 0;
    const { server, url } = createMockServer(() => {
      calls++;
      return new Response(JSON.stringify({ message: "Rate exceeded" }), {
        status: 429,
        headers: {
          "content-type": "application/json",
          "x-amzn-errortype": "LimitExceededException",
        },
      });
    });

    await withEndpoint(url, server, async () => {
      const started = Date.now();
      await assertRejects(
        () => listJobs({ ...ARGS, timeoutMs: 300 }, TEST_CREDENTIALS),
        Error,
        "did not return a page within 300ms",
      );
      assert(Date.now() - started < 5000, "deadline was not enforced");
      assert(calls >= 1);
    });
  },
});

Deno.test({
  name: "listJobs reports sourceResolution unknown for HEAD and full SHAs",
  sanitizeResources: false,
  fn: async () => {
    const { server, url } = createMockServer(() =>
      jsonResponse({
        jobSummaries: [
          summary("2", { commitId: "HEAD", jobType: "MANUAL" }),
          summary("1"),
        ],
      })
    );

    await withEndpoint(url, server, async () => {
      const result = JobHistoryOutputSchema.parse(
        await listJobs(ARGS, TEST_CREDENTIALS),
      );
      assertEquals(result.jobs[0].reportedCommitId, "HEAD");
      assertEquals(result.jobs[0].sourceResolution, "unknown");
      assertEquals(result.jobs[1].reportedCommitId, FULL_SHA);
      assertEquals(result.jobs[1].sourceResolution, "unknown");
    });
  },
});

Deno.test({
  name: "listJobs addresses branch names containing a slash",
  sanitizeResources: false,
  fn: async () => {
    let path = "";
    const { server, url } = createMockServer((req) => {
      path = new URL(req.url).pathname;
      return jsonResponse({ jobSummaries: [] });
    });

    await withEndpoint(url, server, async () => {
      const result = JobHistoryOutputSchema.parse(
        await listJobs({ ...ARGS, BranchName: "feature/x" }, TEST_CREDENTIALS),
      );
      assertEquals(path, "/apps/d1abc2def3/branches/feature%2Fx/jobs");
      assertEquals(result.branchName, "feature/x");
    });
  },
});

Deno.test({
  name: "getJob reports step outcomes without log or artifact URLs",
  sanitizeResources: false,
  fn: async () => {
    let path = "";
    const step = (stepName: string) => ({
      stepName,
      status: "SUCCEED",
      startTime: 1761600060,
      endTime: 1761600120,
      logUrl: SIGNED,
      artifactsUrl: SIGNED,
      testArtifactsUrl: SIGNED,
      testConfigUrl: SIGNED,
      screenshots: { home: SIGNED },
      context: "ctx",
    });
    const { server, url } = createMockServer((req) => {
      path = new URL(req.url).pathname;
      return jsonResponse({
        job: {
          summary: summary("12"),
          steps: [step("BUILD"), step("DEPLOY"), step("VERIFY")],
        },
      });
    });

    await withEndpoint(url, server, async () => {
      const result = await getJob({ ...ARGS, jobId: "12" }, TEST_CREDENTIALS);
      const parsed = JobOutputSchema.parse(result);
      assertEquals(path, "/apps/d1abc2def3/branches/main/jobs/12");
      assertEquals(parsed.jobId, "12");
      assertEquals(parsed.terminal, true);
      assertEquals(parsed.stepOutcomes, [
        { stepName: "BUILD", status: "SUCCEED" },
        { stepName: "DEPLOY", status: "SUCCEED" },
        { stepName: "VERIFY", status: "SUCCEED" },
      ]);
      assertEquals(parsed.steps[0].startTime, "2025-10-27T21:21:00.000Z");
      assertEquals(parsed.steps[0].endTime, "2025-10-27T21:22:00.000Z");
      assertNoSensitiveContent(result);
    });
  },
});

Deno.test({
  name: "getJob marks a running job non-terminal and an absent step MISSING",
  sanitizeResources: false,
  fn: async () => {
    const { server, url } = createMockServer(() =>
      jsonResponse({
        job: {
          summary: summary("13", { status: "RUNNING", endTime: undefined }),
          steps: [
            { stepName: "BUILD", status: "SUCCEED", startTime: 1761600060 },
            { stepName: "DEPLOY", status: "RUNNING", startTime: 1761600120 },
          ],
        },
      })
    );

    await withEndpoint(url, server, async () => {
      const result = JobOutputSchema.parse(
        await getJob({ ...ARGS, jobId: "13" }, TEST_CREDENTIALS),
      );
      assertEquals(result.terminal, false);
      assertEquals(result.endTime, undefined);
      assertEquals(result.stepOutcomes, [
        { stepName: "BUILD", status: "SUCCEED" },
        { stepName: "DEPLOY", status: "RUNNING" },
        { stepName: "VERIFY", status: "MISSING" },
      ]);
    });
  },
});

Deno.test({
  name: "getJob rejects when the deadline passes",
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
          getJob({ ...ARGS, jobId: "12", timeoutMs: 300 }, TEST_CREDENTIALS),
        Error,
        "did not complete within 300ms",
      );
      assert(Date.now() - started < 5000, "deadline was not enforced");
    }, release);
  },
});
