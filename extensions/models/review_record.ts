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

/**
 * The verdict record for the pre-PR agent reviews.
 *
 * A reviewer records its result with `submit`, whose arguments are the
 * contract: swamp rejects a malformed submission before the method runs, and
 * the method rejects a verdict that contradicts the findings. The error goes
 * back to the reviewer, which fixes its input and submits again. `decide`
 * reads the stored record after the reviewer exits, and its exit status is the
 * review step's verdict — nothing is parsed out of the reviewer's prose.
 *
 * Each review in `verification/workflow-verify-reviews.yaml` uses its own
 * definition (code-review, adversarial-review, ci-security-review) in the
 * verify worktree's swamp repo, so the model that runs is the one at the
 * verified commit.
 */

import { z } from "zod";

/** Critical and high findings block the merge; medium and low do not. */
export const Severity = z.enum(["critical", "high", "medium", "low"]);

export const FindingSchema = z.object({
  severity: Severity.describe(
    "critical or high blocks the merge; medium or low does not.",
  ),
  title: z.string().trim().min(1).describe("One-line statement of the issue."),
  file: z.string().trim().min(1).optional().describe(
    "Repo-relative path the finding is in.",
  ),
  line: z.number().int().positive().optional().describe(
    "1-indexed line the finding anchors to.",
  ),
  detail: z.string().trim().min(1).describe(
    "What is wrong, why it matters, and the suggested fix.",
  ),
});

export const ReviewSubmissionSchema = z.object({
  verdict: z.enum(["pass", "fail"]).describe(
    "fail exactly when at least one finding is critical or high.",
  ),
  findings: z.array(FindingSchema).describe(
    "Every finding, blocking or not. Empty for a clean review.",
  ),
  review: z.string().trim().min(1).describe(
    "The full review as markdown, in the format the review prompt asks for.",
  ),
});

export const ReviewRecordSchema = ReviewSubmissionSchema.extend({
  submittedAt: z.string(),
});

export type Finding = z.infer<typeof FindingSchema>;
export type ReviewSubmission = z.infer<typeof ReviewSubmissionSchema>;
export type ReviewRecord = z.infer<typeof ReviewRecordSchema>;

/** The gate's decision about one review. */
export type ReviewDecision =
  | { readonly kind: "pass" }
  | { readonly kind: "fail"; readonly blocking: number }
  | { readonly kind: "missing"; readonly reason: string };

export function isBlocking(finding: Pick<Finding, "severity">): boolean {
  return finding.severity === "critical" || finding.severity === "high";
}

/**
 * Why a submission's verdict contradicts its findings, or null when it is
 * consistent. The verdict stays an explicit field rather than being derived,
 * so a reviewer confused about its own findings is told so instead of scored.
 */
export function consistencyProblem(
  submission: Pick<ReviewSubmission, "verdict" | "findings">,
): string | null {
  const blocking = submission.findings.filter(isBlocking).length;
  if (submission.verdict === "pass" && blocking > 0) {
    return `verdict is pass, but ${blocking} finding(s) are critical or ` +
      "high. Either submit verdict fail, or lower the severity of findings " +
      "that do not block the merge.";
  }
  if (submission.verdict === "fail" && blocking === 0) {
    return "verdict is fail, but no finding is critical or high. Either " +
      "submit verdict pass, or record the blocking problem as a critical or " +
      "high finding.";
  }
  return null;
}

/**
 * Decide one review from its stored record. The record is re-validated, never
 * trusted: anything but a well-formed, consistent record is missing.
 */
export function decideReview(stored: unknown): ReviewDecision {
  if (stored === null || stored === undefined) {
    return { kind: "missing", reason: "the reviewer submitted no review" };
  }
  const parsed = ReviewRecordSchema.safeParse(stored);
  if (!parsed.success) {
    return {
      kind: "missing",
      reason: `the stored record is malformed: ${
        z.prettifyError(parsed.error)
      }`,
    };
  }
  const problem = consistencyProblem(parsed.data);
  if (problem) {
    return {
      kind: "missing",
      reason: `the stored record is inconsistent: ${problem}`,
    };
  }
  if (parsed.data.verdict === "pass") return { kind: "pass" };
  return {
    kind: "fail",
    blocking: parsed.data.findings.filter(isBlocking).length,
  };
}

/** The decision as it is written to the log. */
export function formatGateVerdict(decision: ReviewDecision): string {
  return `GATE_VERDICT: ${decision.kind}`;
}

/**
 * The record as log lines. Every reviewer-written line is prefixed: the text
 * is shaped by the change under review, and a bare line must not pass for the
 * gate's own output.
 */
export function formatRecord(record: ReviewRecord): string[] {
  const lines = [`verdict: ${record.verdict}`];
  for (const severity of Severity.options) {
    const findings = record.findings.filter((f) => f.severity === severity);
    if (findings.length === 0) continue;
    lines.push(`${severity} (${findings.length}):`);
    for (const f of findings) {
      const where = f.file ? ` [${f.file}${f.line ? `:${f.line}` : ""}]` : "";
      lines.push(`| - ${f.title}${where}`);
      for (const d of f.detail.split("\n")) lines.push(`|   ${d}`);
    }
  }
  lines.push("----- review -----");
  for (const line of record.review.split("\n")) lines.push(`| ${line}`);
  lines.push("----- end of review -----");
  return lines;
}

type Logger = {
  info: (msg: string, props: Record<string, unknown>) => void;
};

// ---------------------------------------------------------------------------
// Model Definition
// ---------------------------------------------------------------------------

export const model = {
  type: "@swamp/review-record",
  version: "2026.09.28.1",
  globalArguments: z.object({}),

  resources: {
    "record": {
      description: "The reviewer's submitted verdict, findings and review",
      schema: ReviewRecordSchema,
      lifetime: "infinite" as const,
      garbageCollection: 5,
    },
  },

  methods: {
    submit: {
      description:
        "Record this review's result. The only way a review is recorded; " +
        "submitting again replaces the earlier record.",
      arguments: ReviewSubmissionSchema,
      execute: async (
        args: ReviewSubmission,
        context: {
          logger: Logger;
          writeResource: (
            specName: string,
            instanceName: string,
            data: Record<string, unknown>,
          ) => Promise<{ name: string }>;
        },
      ) => {
        // Everything is checked before the write, so a rejected submission
        // never leaves a record behind.
        const problem = consistencyProblem(args);
        if (problem) {
          throw new Error(
            `Review not recorded: ${problem} Fix the input and submit again.`,
          );
        }
        const handle = await context.writeResource("record", "record-main", {
          ...args,
          submittedAt: new Date().toISOString(),
        });
        context.logger.info(
          "Review recorded: verdict {verdict}, {count} finding(s)",
          { verdict: args.verdict, count: args.findings.length },
        );
        return { dataHandles: [handle] };
      },
    },

    decide: {
      description: "Decide the review from its stored record. Fails unless a " +
        "well-formed record with verdict pass was submitted.",
      arguments: z.object({}),
      execute: async (
        _args: Record<string, never>,
        context: {
          logger: Logger;
          readResource: (
            instanceName: string,
            version?: number,
          ) => Promise<Record<string, unknown> | null>;
        },
      ) => {
        const stored = await context.readResource("record-main");
        const decision = decideReview(stored);
        // The decision is logged before anything can throw, so the log
        // always says which outcome failed the step.
        context.logger.info("{line}", { line: formatGateVerdict(decision) });
        if (decision.kind !== "missing") {
          const record = ReviewRecordSchema.parse(stored);
          for (const line of formatRecord(record)) {
            context.logger.info("{line}", { line });
          }
        }
        if (decision.kind === "pass") return { dataHandles: [] };
        if (decision.kind === "fail") {
          throw new Error(
            `Review did not pass (verdict: fail) with ${decision.blocking} ` +
              "blocking finding(s).",
          );
        }
        throw new Error(
          `Review did not pass (verdict: missing): ${decision.reason}. ` +
            "A review that was not recorded needs a human to look.",
        );
      },
    },
  },
};
