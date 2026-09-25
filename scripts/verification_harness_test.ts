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
 * Fitness rules for this repository's pre-PR verification harness. Pull-request
 * CI builds nothing, so each rule guards a way the harness could stop checking
 * something without anything failing at the time: an extension no check
 * covers, a group verify-build never runs, a review whose verdict bypasses the
 * checker, a pinned file CI's integrity audit never looks at, a workflow step
 * that depends on the host's extension state.
 */

import { assert, assertEquals } from "@std/assert";
import { parse } from "@std/yaml";
import { parseAttestationConfig, pinnedFiles } from "./build_attestation.ts";
import { fsProbes, loadChecksConfig, planChecks } from "./run_checks.ts";

interface Step {
  name: string;
  task?: { modelType?: string; inputs?: { run?: string } };
}
interface Workflow {
  jobs: Array<{ name: string; steps: Step[] }>;
}

const root = new URL("../", import.meta.url).pathname;

async function readYaml<T>(path: string): Promise<T> {
  return parse(await Deno.readTextFile(`${root}${path}`)) as T;
}

const checks = await loadChecksConfig(`${root}verification/checks.yaml`);
const attestation = parseAttestationConfig(
  await Deno.readTextFile(`${root}verification/attestation.yaml`),
);
const pinned = pinnedFiles(attestation);

/** Directories holding an extension manifest, outside generated model/. */
async function extensionDirs(): Promise<string[]> {
  const found: string[] = [];
  async function walk(rel: string, depth: number) {
    for await (const entry of Deno.readDir(`${root}${rel || "."}`)) {
      if (!entry.isDirectory || entry.name.startsWith(".")) continue;
      const dir = rel ? `${rel}/${entry.name}` : entry.name;
      if (dir === "model" || entry.name === "node_modules") continue;
      try {
        await Deno.stat(`${root}${dir}/manifest.yaml`);
        found.push(dir);
      } catch {
        if (depth < 1) await walk(dir, depth + 1);
      }
    }
  }
  await walk("", 0);
  return found.sort();
}

Deno.test("harness: every extension has a check target", async () => {
  const checked = ["extensions", "vaults", "datastores"].flatMap((group) =>
    planChecks(checks, group, [], { all: true, ...fsProbes(root) }).map((t) =>
      t.dir
    )
  ).sort();
  assertEquals(checked, await extensionDirs());
});

Deno.test("harness: verify-build runs every check group once", async () => {
  const build = await readYaml<Workflow>(
    "verification/workflow-verify-build.yaml",
  );
  const job = build.jobs.find((j) => j.name === "checks");
  assert(job, "verify-build has no checks job");
  const groups = job.steps.map((step) => {
    const run = step.task?.inputs?.run ?? "";
    assert(
      run.includes("scripts/run_checks.ts"),
      `${step.name} does not use run_checks.ts`,
    );
    return run.match(/--group\s+(\S+)/)?.[1];
  });
  assertEquals(groups.sort(), Object.keys(checks.groups).sort());
});

Deno.test("harness: verify workflows depend on no registry extension", async () => {
  // A registry model type is resolved from the host checkout's extension
  // state, so a broken install there fails verification before anything is
  // checked. Every step uses the built-in shell model.
  for (const workflow of attestation.workflows) {
    const def = await readYaml<Workflow>(workflow.path);
    for (const job of def.jobs) {
      for (const step of job.steps) {
        assertEquals(
          step.task?.modelType,
          "command/shell",
          `${workflow.name} ${job.name}/${step.name} uses ${step.task?.modelType}`,
        );
      }
    }
  }
});

Deno.test("harness: every review is decided by check_review_verdict.ts", async () => {
  const workflow = attestation.workflows.find((w) =>
    w.name === "verify-reviews"
  );
  assert(workflow, "attestation.yaml names no verify-reviews workflow");
  const reviews = await readYaml<Workflow>(workflow.path);
  const job = reviews.jobs.find((j) => j.name === attestation.reviewJob);
  assert(job, `verify-reviews has no ${attestation.reviewJob} job`);
  const pinnedPaths = new Set(pinned.map((f) => f.path));
  for (const step of job.steps) {
    const run = step.task?.inputs?.run ?? "";
    assert(
      run.includes("scripts/check_review_verdict.ts"),
      `${step.name} does not decide its verdict with check_review_verdict.ts`,
    );
    const prompt = run.match(/verification\/review-prompts\/[\w-]+\.md/)?.[0];
    assert(prompt, `${step.name} names no review prompt`);
    assert(pinnedPaths.has(prompt), `${prompt} is not pinned`);
  }
});

Deno.test("harness: the harness checks cover every pinned script", () => {
  const [harness] = planChecks(checks, "harness", [], {
    all: true,
    ...fsProbes(root),
  });
  assert(harness, "checks.yaml has no harness target");
  const commands = harness.commands.map((c) => c.run).join("\n");
  for (const file of pinned) {
    if (!file.path.startsWith("scripts/")) continue;
    assert(commands.includes(file.path), `harness checks skip ${file.path}`);
    const test = file.path.replace(/\.ts$/, "_test.ts");
    assert(commands.includes(test), `harness checks skip ${test}`);
  }
});

Deno.test("harness: CI's integrity audit covers every pinned file", async () => {
  // A pinned file outside the trust root could be changed without the
  // integrity review ever reading the change.
  const ci = await Deno.readTextFile(`${root}.forgejo/workflows/ci.yml`);
  const pattern = ci.match(/grep -z?E '([^']+)'/)?.[1];
  assert(pattern, "ci.yml has no trust-root pattern");
  const trustRoot = new RegExp(pattern);
  for (const file of pinned) {
    assert(trustRoot.test(file.path), `${file.path} is outside the trust root`);
  }
});
