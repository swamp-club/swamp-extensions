// Swamp, an Automation Framework Copyright (C) 2026 System Initiative, Inc.
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

import { assert, assertEquals } from "@std/assert";
import { dirname, join } from "@std/path";
import { parse as parseYaml, stringify as stringifyYaml } from "@std/yaml";
import { type SwampRepo, VERIFY_WORKFLOW, withRepo } from "../harness.ts";

// ---------------------------------------------------------------------------
// The swamp-extensions verify stage on the real engine: the real wrapper,
// verification/workflow-verify.yaml, over two stubs named verify-build and
// verify-reviews, so the parallelism it relies on is the engine's and not an
// assumption. See DESIGN.md, "Parallel work inside one stage".
// ---------------------------------------------------------------------------

const SHA = "c5aaad329c9ceb4edc0504a98ff5d6e5528ac8fd";
const BRANCH = "cue/verify";

/** How long each stub works: long enough that sequential runs cannot overlap. */
const STUB_SECONDS = 2;

interface HistoryRun {
  id: string;
  workflowName: string;
  status: string;
  inputs?: Record<string, unknown>;
  startedAt: string;
  completedAt: string;
  path: string;
}

interface WrapperRecord {
  jobs: Array<{
    jobName: string;
    status: string;
    steps: Array<{ output?: { runId?: string } }>;
  }>;
}

/** A child with the verify workflows' inputs that works, then passes or fails. */
function stub(name: string, fails: boolean): Record<string, unknown> {
  return {
    id: crypto.randomUUID(),
    name,
    version: 1,
    inputs: {
      properties: { commit: { type: "string" }, branch: { type: "string" } },
      required: ["commit", "branch"],
    },
    jobs: [{
      name: "work",
      steps: [{
        name: "work",
        task: {
          type: "model_method",
          modelType: "command/shell",
          modelName: `${name}-\${{ run.id }}`,
          methodName: "execute",
          inputs: { run: `sleep ${STUB_SECONDS}\nexit ${fails ? 1 : 0}\n` },
        },
      }],
    }],
  };
}

/** Install the real wrapper and the two stubs in the repo's workflows dir. */
async function install(
  repo: SwampRepo,
  fails: { build: boolean; reviews: boolean },
): Promise<void> {
  const dir = join(repo.dir, "workflows");
  await Deno.mkdir(dir, { recursive: true });
  await Deno.copyFile(VERIFY_WORKFLOW, join(dir, "workflow-verify.yaml"));
  for (
    const [name, fail] of [
      ["verify-build", fails.build],
      ["verify-reviews", fails.reviews],
    ] as const
  ) {
    await Deno.writeTextFile(
      join(dir, `workflow-${name}.yaml`),
      stringifyYaml(stub(name, fail)),
    );
  }
}

async function runVerify(
  repo: SwampRepo,
): Promise<{ code: number; run: HistoryRun }> {
  const { code, stdout } = await repo.swamp([
    "workflow",
    "run",
    "verify",
    "--input",
    `commit=${SHA}`,
    "--input",
    `branch=${BRANCH}`,
    "--json",
  ], { allowFailure: true });
  return { code, run: JSON.parse(stdout) as HistoryRun };
}

async function history(repo: SwampRepo, id: string): Promise<HistoryRun> {
  const { stdout } = await repo.swamp([
    "workflow",
    "history",
    "get",
    id,
    "--json",
  ]);
  return JSON.parse(stdout) as HistoryRun;
}

/** The child run ids the wrapper's own record holds, by job. */
async function childRunIds(run: HistoryRun): Promise<Map<string, string>> {
  const record = parseYaml(await Deno.readTextFile(run.path)) as WrapperRecord;
  const ids = new Map<string, string>();
  for (const job of record.jobs) {
    const id = job.steps[0]?.output?.runId;
    if (id !== undefined) ids.set(job.jobName, id);
  }
  return ids;
}

/**
 * A child as build-attestation reads it: its own record under its own name,
 * the commit in its inputs, and its evaluated workflow where the record's path
 * locates it.
 */
async function assertAttestable(
  child: HistoryRun,
  workflowName: string,
): Promise<void> {
  assertEquals(child.workflowName, workflowName);
  assertEquals(child.inputs?.commit, SHA);
  const evaluated = join(
    dirname(dirname(dirname(child.path))),
    "workflows-evaluated",
    "runs",
    child.id,
    "evaluated-workflow.yaml",
  );
  assert((await Deno.stat(evaluated)).isFile, `${evaluated} is missing`);
}

function overlap(a: HistoryRun, b: HistoryRun): boolean {
  const start = (r: HistoryRun) => new Date(r.startedAt).getTime();
  const end = (r: HistoryRun) => new Date(r.completedAt).getTime();
  return start(a) < end(b) && start(b) < end(a);
}

Deno.test("verify: both children run at once as their own runs, and the wrapper passes when both do", async () => {
  await withRepo(async (repo) => {
    await install(repo, { build: false, reviews: false });
    const { code, run } = await runVerify(repo);
    assertEquals(code, 0);
    assertEquals(run.status, "succeeded");

    const ids = await childRunIds(run);
    const build = await history(repo, ids.get("build") ?? "");
    const reviews = await history(repo, ids.get("reviews") ?? "");
    await assertAttestable(build, "verify-build");
    await assertAttestable(reviews, "verify-reviews");
    assertEquals([build.status, reviews.status], ["succeeded", "succeeded"]);
    assert(
      overlap(build, reviews),
      `the children ran one after the other: ${
        JSON.stringify(
          [build, reviews].map((r) => [r.startedAt, r.completedAt]),
        )
      }`,
    );
  });
});

Deno.test("verify: the wrapper waits for both children and fails when either fails", async () => {
  await withRepo(async (repo) => {
    await install(repo, { build: false, reviews: true });
    const { code, run } = await runVerify(repo);
    assert(code !== 0, "a failed verification exited 0");
    assertEquals(run.status, "failed");

    // The build child still ran to the end: a failed sibling stops nothing.
    const ids = await childRunIds(run);
    const build = await history(repo, ids.get("build") ?? "");
    assertEquals(build.status, "succeeded");
    await assertAttestable(build, "verify-build");

    // A failed child's run id is not on the wrapper's record; the agent finds
    // it in history, as the verify stage's command says.
    assertEquals(ids.has("reviews"), false);
    const { stdout } = await repo.swamp([
      "workflow",
      "history",
      "search",
      "verify-reviews",
      "--json",
    ]);
    const found = (JSON.parse(stdout) as {
      results: Array<{ runId: string; workflowName: string; status: string }>;
    }).results.filter((r) => r.workflowName === "verify-reviews");
    assertEquals(found.map((r) => r.status), ["failed"]);
    const reviews = await history(repo, found[0].runId);
    await assertAttestable(reviews, "verify-reviews");
    assert(overlap(build, reviews), "the children ran one after the other");
  });
});
