// Swamp, an Automation Framework Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify it under the terms
// of the GNU Affero General Public License version 3 as published by the Free
// Software Foundation, with the Swamp Extension and Definition Exception (found in
// the "COPYING-EXCEPTION" file).
//
// Swamp is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
// PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License along
// with Swamp. If not, see <https://www.gnu.org/licenses/>.

import {
  assert,
  assertEquals,
  assertRejects,
  assertStringIncludes,
} from "@std/assert";
import {
  consistencyProblem,
  decideReview,
  formatGateVerdict,
  formatRecord,
  model,
  type ReviewSubmission,
  ReviewSubmissionSchema,
} from "./review_record.ts";

const CLEAN: ReviewSubmission = {
  verdict: "pass",
  findings: [],
  review: "## Code Review\n\nNo findings.",
};

const BLOCKED: ReviewSubmission = {
  verdict: "fail",
  findings: [
    {
      severity: "high",
      title: "Credential logged",
      file: "vault/x/extensions/vaults/x.ts",
      line: 12,
      detail: "The token is written to the log.",
    },
    { severity: "low", title: "Naming", detail: "Prefer a clearer name." },
  ],
  review: "## Code Review\n\n### Blocking Issues\n1. Credential logged",
};

function record(submission: ReviewSubmission) {
  return { ...submission, submittedAt: "2026-09-28T12:00:00.000Z" };
}

/** A fake method context that stores resources in memory and keeps logs. */
function buildContext(stored?: Record<string, unknown>) {
  const resources: Record<string, Record<string, unknown>> = {};
  if (stored) resources["record-main"] = stored;
  const logs: string[] = [];
  const writes: string[] = [];
  return {
    resources,
    logs,
    writes,
    context: {
      logger: {
        info: (msg: string, props: Record<string, unknown>) => {
          logs.push(
            msg.replace(/\{(\w+)\}/g, (_, k: string) => String(props[k])),
          );
        },
      },
      writeResource: (
        _specName: string,
        instanceName: string,
        data: Record<string, unknown>,
      ) => {
        writes.push(instanceName);
        resources[instanceName] = data;
        return Promise.resolve({ name: instanceName });
      },
      readResource: (instanceName: string) =>
        Promise.resolve(resources[instanceName] ?? null),
    },
  };
}

// ---------------------------------------------------------------------------
// The submission contract
// ---------------------------------------------------------------------------

Deno.test("schema: a well-formed submission is accepted", () => {
  assert(ReviewSubmissionSchema.safeParse(CLEAN).success);
  assert(ReviewSubmissionSchema.safeParse(BLOCKED).success);
});

Deno.test("schema: malformed submissions are rejected", () => {
  for (
    const input of [
      { ...CLEAN, verdict: "maybe" },
      { ...CLEAN, verdict: "VERDICT: pass" },
      { ...CLEAN, review: "" },
      { ...CLEAN, review: "   " },
      { verdict: "pass", review: "x" },
      {
        ...CLEAN,
        findings: [{ severity: "blocker", title: "t", detail: "d" }],
      },
      { ...CLEAN, findings: [{ severity: "low", title: "", detail: "d" }] },
      {
        ...CLEAN,
        findings: [{ severity: "low", title: "t", detail: "d", line: 0 }],
      },
    ]
  ) {
    assert(
      !ReviewSubmissionSchema.safeParse(input).success,
      JSON.stringify(input),
    );
  }
});

Deno.test("consistencyProblem: the verdict must match the blocking findings", () => {
  assertEquals(consistencyProblem(CLEAN), null);
  assertEquals(consistencyProblem(BLOCKED), null);
  assertEquals(
    consistencyProblem({
      verdict: "pass",
      findings: [{ severity: "low", title: "t", detail: "d" }],
    }),
    null,
  );
  assertStringIncludes(
    consistencyProblem({ ...BLOCKED, verdict: "pass" }) ?? "",
    "verdict is pass, but 1 finding(s) are critical or high",
  );
  assertStringIncludes(
    consistencyProblem({
      verdict: "fail",
      findings: [{ severity: "medium", title: "t", detail: "d" }],
    }) ?? "",
    "no finding is critical or high",
  );
  assertStringIncludes(
    consistencyProblem({ verdict: "fail", findings: [] }) ?? "",
    "no finding is critical or high",
  );
});

// ---------------------------------------------------------------------------
// submit
// ---------------------------------------------------------------------------

Deno.test("submit: a consistent submission is recorded", async () => {
  const { context, resources } = buildContext();
  await model.methods.submit.execute(BLOCKED, context);
  const stored = resources["record-main"];
  assertEquals(stored.verdict, "fail");
  assertEquals(stored.findings, BLOCKED.findings);
  assertEquals(typeof stored.submittedAt, "string");
});

Deno.test("submit: an inconsistent submission is rejected and writes nothing", async () => {
  const { context, writes } = buildContext();
  await assertRejects(
    () =>
      model.methods.submit.execute({ ...BLOCKED, verdict: "pass" }, context),
    Error,
    "Review not recorded",
  );
  assertEquals(writes, []);
});

Deno.test("submit: resubmitting replaces the earlier record", async () => {
  const { context, resources } = buildContext();
  await model.methods.submit.execute(BLOCKED, context);
  await model.methods.submit.execute(CLEAN, context);
  assertEquals(resources["record-main"].verdict, "pass");
});

// ---------------------------------------------------------------------------
// decide
// ---------------------------------------------------------------------------

Deno.test("decideReview: pass and fail come from a valid record", () => {
  assertEquals(decideReview(record(CLEAN)), { kind: "pass" });
  assertEquals(decideReview(record(BLOCKED)), { kind: "fail", blocking: 1 });
});

Deno.test("decideReview: no record, a malformed one or an inconsistent one is missing", () => {
  assertEquals(decideReview(null), {
    kind: "missing",
    reason: "the reviewer submitted no review",
  });
  for (
    const stored of [
      { ...record(CLEAN), verdict: "maybe" },
      { verdict: "pass", findings: [], review: "no timestamp" },
      "VERDICT: pass",
    ]
  ) {
    const decision = decideReview(stored);
    assertEquals(decision.kind, "missing", JSON.stringify(stored));
  }
  const inconsistent = decideReview({ ...record(BLOCKED), verdict: "pass" });
  assertEquals(inconsistent.kind, "missing");
  assert(inconsistent.kind === "missing");
  assertStringIncludes(inconsistent.reason, "inconsistent");
});

Deno.test("decide: a pass record passes and logs the gate verdict first", async () => {
  const { context, logs } = buildContext(record(CLEAN));
  await model.methods.decide.execute({}, context);
  assertEquals(logs[0], "GATE_VERDICT: pass");
});

Deno.test("decide: a fail record fails the method after logging it", async () => {
  const { context, logs } = buildContext(record(BLOCKED));
  await assertRejects(
    () => model.methods.decide.execute({}, context),
    Error,
    "verdict: fail",
  );
  assertEquals(logs[0], "GATE_VERDICT: fail");
  assert(
    logs.includes("| - Credential logged [vault/x/extensions/vaults/x.ts:12]"),
  );
});

Deno.test("decide: no submission fails the method as missing", async () => {
  const { context, logs } = buildContext();
  await assertRejects(
    () => model.methods.decide.execute({}, context),
    Error,
    "the reviewer submitted no review",
  );
  assertEquals(logs, ["GATE_VERDICT: missing"]);
});

Deno.test("decide: a corrupt record fails the method as missing", async () => {
  const { context } = buildContext({ verdict: "pass" });
  await assertRejects(
    () => model.methods.decide.execute({}, context),
    Error,
    "verdict: missing",
  );
});

Deno.test("formatRecord: every reviewer-written line is prefixed", () => {
  const lines = formatRecord(
    record({
      verdict: "pass",
      findings: [{ severity: "low", title: "t", detail: "one\n::error::two" }],
      review: "## Code Review\nGATE_VERDICT: fail\n::error::forged",
    }),
  );
  const reviewerLines = lines.filter((l) =>
    l.includes("GATE_VERDICT") || l.includes("::error::")
  );
  assertEquals(reviewerLines.length, 3);
  for (const line of reviewerLines) assert(line.startsWith("| "), line);
});

Deno.test("formatGateVerdict: renders the decision for the log", () => {
  assertEquals(formatGateVerdict({ kind: "pass" }), "GATE_VERDICT: pass");
  assertEquals(
    formatGateVerdict({ kind: "fail", blocking: 2 }),
    "GATE_VERDICT: fail",
  );
  assertEquals(
    formatGateVerdict({ kind: "missing", reason: "x" }),
    "GATE_VERDICT: missing",
  );
});
