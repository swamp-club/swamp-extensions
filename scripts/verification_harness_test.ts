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
 * covers, a group verify-build never runs, a review whose verdict bypasses its
 * submitted record, a pinned file CI's integrity audit never looks at, a workflow step
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
  const missing = (await extensionDirs()).filter((d) => !checked.includes(d));
  assertEquals(missing, [], "extensions with no check target");
  // A target without a manifest is an extension not yet published (it has
  // none until go-live); a target without a deno.json is stale.
  const stale = checked.filter((d) =>
    !fsProbes(root).hasFile(`${d}/deno.json`)
  );
  assertEquals(stale, [], "check targets with no deno.json");
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

Deno.test("harness: the verify wrapper runs every verification workflow concurrently", async () => {
  // The attestation is built from the wrapper's child runs, so it must nest
  // each verification workflow exactly once, at the commit it was given, and
  // with no job waiting on another.
  interface WrapperJob {
    name: string;
    dependsOn?: unknown[];
    steps: Array<{
      name: string;
      task?: {
        type?: string;
        workflowIdOrName?: string;
        inputs?: Record<string, unknown>;
      };
    }>;
  }
  const wrapper = await readYaml<{ jobs: WrapperJob[] }>(
    "verification/workflow-verify.yaml",
  );
  const nested = wrapper.jobs.flatMap((job) => {
    assertEquals(job.dependsOn ?? [], [], `${job.name} waits on another job`);
    assertEquals(job.steps.length, 1, `${job.name} is not one nested run`);
    const task = job.steps[0].task;
    assertEquals(task?.type, "workflow", `${job.name} does not nest a run`);
    assertEquals(task?.inputs, {
      commit: "${{ inputs.commit }}",
      branch: "${{ inputs.branch }}",
    });
    return [task?.workflowIdOrName];
  });
  assertEquals(
    nested.sort(),
    attestation.workflows.map((w) => w.name).sort(),
  );
});

Deno.test("harness: every review is decided by its submitted record", async () => {
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
    // The reviewer records its result with submit, and decide's exit status
    // is the step's verdict. The reviewer's prose is never read.
    const submit =
      `swamp model @swamp/review-record method run submit ${step.name} ` +
      "--input-file $RECORD_FILE --no-telemetry";
    assert(
      run.includes(`SUBMIT="${submit}"`),
      `${step.name} does not submit through its own review-record definition`,
    );
    assert(
      run.includes(
        `swamp model @swamp/review-record method run decide ${step.name} ` +
          "--no-telemetry ||",
      ),
      `${step.name} is not decided by its review-record definition`,
    );
    // The reviewer may write one file and run one command: anything broader
    // would let a manipulated reviewer act outside the review.
    const allowed = run.match(/--allowedTools "([^"]*)"/g) ?? [];
    assertEquals(
      allowed,
      ['--allowedTools "Read,Glob,Grep,Edit(/$RECORD_FILE),Bash($SUBMIT)"'],
      `${step.name} grants the reviewer more than its record and submit`,
    );
    const prompt = run.match(/verification\/review-prompts\/[\w-]+\.md/)?.[0];
    assert(prompt, `${step.name} names no review prompt`);
    assert(pinnedPaths.has(prompt), `${prompt} is not pinned`);
  }
});

Deno.test("harness: the adversarial guard is derived from checks.yaml", async () => {
  // A hand-kept directory list misses new extensions, and the review then
  // skips with nothing to tell it from a legitimate skip (swamp-club #2583).
  // The guard lists the targets of every build group but the harness, whose
  // verification/ and scripts/ triggers are the CI security review's, and
  // matches changes under their top-level directories.
  const reviews = await readYaml<Workflow>(
    "verification/workflow-verify-reviews.yaml",
  );
  const step = reviews.jobs.find((j) => j.name === "detect-changes")?.steps
    .find((s) => s.name === "changed-files");
  assert(step, "verify-reviews has no detect-changes/changed-files step");
  // Line continuations and indentation are layout, not behavior.
  const run = (step.task?.inputs?.run ?? "").replace(/\\\n/g, " ")
    .replace(/\s+/g, " ");
  const groups = run.match(/for GROUP in ([\w ]+); do/)?.[1].split(" ");
  assert(groups, "changed-files lists no checks.yaml groups");
  assertEquals(
    groups.sort(),
    Object.keys(checks.groups).filter((g) => g !== "harness").sort(),
  );
  assert(
    run.includes(
      'scripts/run_checks.ts --group "$GROUP" --all --dry-run || exit 1 done',
    ),
    "changed-files does not list each group's targets with run_checks.ts",
  );
  assert(
    run.includes(
      `TOPS=$(echo "$PLANNED" | sed -n 's#^CHECK: \\([^/ ]*\\).*#\\1#p'`,
    ) &&
      run.includes(
        'grep -qE "^(${TOPS}extensions)/"; then echo "REVIEW_ADVERSARIAL: true"',
      ),
    "REVIEW_ADVERSARIAL does not follow the listed targets",
  );
  for (const group of groups) {
    for (const target of checks.groups[group].targets) {
      const top = target.dir.split("/")[0];
      assert(!run.includes(`${top}/`), `changed-files names ${top}/ by hand`);
    }
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

/** The steps of verify-reviews' review job, each a reviewer and its decide. */
async function reviewSteps(): Promise<Step[]> {
  const reviews = await readYaml<Workflow>(
    "verification/workflow-verify-reviews.yaml",
  );
  const job = reviews.jobs.find((j) => j.name === attestation.reviewJob);
  assert(job, `verify-reviews has no ${attestation.reviewJob} job`);
  return job.steps;
}

Deno.test("harness: every reviewer runs on its own pipe", async () => {
  // claude marks the stdout and stderr it inherits non-blocking, and the flag
  // stays on the step's pipe after it exits. decide then fails with EAGAIN
  // when its log outruns the reader, though the review passed
  // (swamp-club#4354). Piping claude through cat keeps the flag off the
  // step's pipe.
  for (const step of await reviewSteps()) {
    const run = (step.task?.inputs?.run ?? "").replace(/\\\n\s*/g, " ");
    const claude = run.match(/^\s*claude -p .*$/m)?.[0];
    assert(claude, `${step.name} runs no claude -p`);
    assert(
      claude.trimEnd().endsWith('< "$PROMPT_FILE" 2>&1 | cat'),
      `${step.name} hands claude the step's own stdout or stderr`,
    );
    const decide = run.indexOf("method run decide");
    assert(
      decide > run.indexOf(claude),
      `${step.name} does not decide after claude`,
    );
  }
});

Deno.test("harness: decide gets blocking pipes after the reviewer exits", async () => {
  // Each review step's own script runs as swamp's command/shell runs it, with
  // sh -c, against stubs: claude marks every fd it is handed non-blocking, as
  // the real one does, and decide fails when it inherits such a pipe. Each
  // stub's exit status is set per case.
  const tmp = await Deno.makeTempDir();
  try {
    const bin = `${tmp}/bin`;
    const repo = `${tmp}/repo`;
    await Deno.mkdir(bin);
    await Deno.mkdir(`${repo}/verification/review-prompts`, {
      recursive: true,
    });
    await Deno.writeTextFile(
      `${bin}/claude`,
      [
        "#!/usr/bin/env python3",
        "import os, sys",
        "sys.stdin.read()",
        "os.set_blocking(1, False)",
        "os.set_blocking(2, False)",
        'sys.exit(int(os.environ["STUB_CLAUDE_EXIT"]))',
        "",
      ].join("\n"),
      { mode: 0o755 },
    );
    await Deno.writeTextFile(
      `${bin}/swamp`,
      [
        "#!/usr/bin/env python3",
        "import os, sys",
        'if "decide" in sys.argv:',
        "    if not (os.get_blocking(1) and os.get_blocking(2)):",
        '        sys.exit("decide was handed a non-blocking pipe")',
        '    sys.exit(int(os.environ["STUB_DECIDE_EXIT"]))',
        "",
      ].join("\n"),
      { mode: 0o755 },
    );
    for await (
      const entry of Deno.readDir(`${root}verification/review-prompts`)
    ) {
      await Deno.copyFile(
        `${root}verification/review-prompts/${entry.name}`,
        `${repo}/verification/review-prompts/${entry.name}`,
      );
    }
    const env = {
      GIT_CONFIG_GLOBAL: "/dev/null",
      GIT_CONFIG_NOSYSTEM: "1",
      PATH: `${bin}:${Deno.env.get("PATH") ?? ""}`,
    };
    for (
      const args of [
        ["init", "-q"],
        ["add", "."],
        ["-c", "user.name=t", "-c", "user.email=t@t", "commit", "-qm", "base"],
        ["update-ref", "refs/remotes/origin/main", "HEAD"],
      ]
    ) {
      const { code } = await new Deno.Command("git", { args, cwd: repo, env })
        .output();
      assertEquals(code, 0, `git ${args.join(" ")} failed`);
    }
    for (const step of await reviewSteps()) {
      const run = step.task?.inputs?.run ?? "";
      assert(!run.includes("${{"), `${step.name} needs workflow expressions`);
      // A passing review passes; a failing review, and a reviewer that
      // fails, still fail the step through the pipe to cat.
      const cases = [
        { claudeExit: "0", decideExit: "0", error: null },
        { claudeExit: "0", decideExit: "1", error: / did not pass/ },
        { claudeExit: "3", decideExit: "0", error: / exited with status 3/ },
      ];
      for (const { claudeExit, decideExit, error } of cases) {
        const { code, stdout, stderr } = await new Deno.Command("sh", {
          args: ["-c", run],
          cwd: repo,
          env: {
            ...env,
            STUB_CLAUDE_EXIT: claudeExit,
            STUB_DECIDE_EXIT: decideExit,
          },
        }).output();
        const out = new TextDecoder().decode(stdout) +
          new TextDecoder().decode(stderr);
        const label =
          `${step.name} (claude ${claudeExit}, decide ${decideExit})`;
        if (!error) {
          assertEquals(code, 0, `${label} failed a passing review:\n${out}`);
        } else {
          assert(code !== 0, `${label} passed`);
          assert(
            new RegExp(`::error::.*${error.source}`).test(out),
            `${label} failed without saying why:\n${out}`,
          );
        }
      }
    }
  } finally {
    await Deno.remove(tmp, { recursive: true });
  }
});
