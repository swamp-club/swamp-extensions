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

import { assert, assertEquals, assertStringIncludes } from "@std/assert";
import {
  computeChecksum,
  parseAttestationConfig,
  pinnedFiles,
} from "./build_attestation.ts";
import {
  blobChecksum,
  code,
  failureSummary,
  validateAttestation,
  workflowCommand,
  writeSummary,
} from "./validate_attestation.ts";

const HEAD = "a".repeat(40);
const NOW = new Date("2026-09-25T12:00:00.000Z");

const PINNED = pinnedFiles(parseAttestationConfig(`
workflows:
  - { key: build, name: verify-build, path: verification/workflow-verify-build.yaml }
reviewJob: reviews
pinned:
  - { path: CLAUDE.md, at: [claudeMd] }
  - { path: scripts/build_attestation.ts, at: [scripts, build-attestation] }
`));

/** Every pinned file hashed to a value derived from its path. */
function hashes(): Map<string, string | null> {
  return new Map(PINNED.map((f) => [f.path, `hash-of-${f.path}`]));
}

function configIntegrity(): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const file of PINNED) {
    let node = out;
    for (const key of file.jsonPath.slice(0, -1)) {
      node[key] ??= {};
      node = node[key] as Record<string, unknown>;
    }
    node[file.jsonPath[file.jsonPath.length - 1]] = `hash-of-${file.path}`;
  }
  return out;
}

function attestation(overrides: Record<string, unknown> = {}) {
  return {
    version: "1",
    type: "verification-attestation",
    subject: { commit: HEAD, branch: "some-branch" },
    environment: {},
    configIntegrity: configIntegrity(),
    steps: [
      { job: "ci", step: "ci-extensions", status: "succeeded" },
      {
        job: "reviews",
        step: "code-review",
        status: "succeeded",
        verdict: "pass",
      },
    ],
    gate: {
      allPassed: true,
      stepsCompleted: 2,
      stepsTotal: 2,
      stepsSkipped: 0,
    },
    timing: { completedAt: "2026-09-25T11:00:00.000Z" },
    ...overrides,
  };
}

Deno.test("validateAttestation: a matching, passing, fresh attestation passes", () => {
  const result = validateAttestation(
    attestation(),
    HEAD,
    PINNED,
    hashes(),
    NOW,
  );
  assertEquals(result.errors, []);
  assertEquals(result.warnings, []);
});

Deno.test("validateAttestation: another commit's attestation is an error", () => {
  const result = validateAttestation(
    attestation({ subject: { commit: "b".repeat(40), branch: "x" } }),
    HEAD,
    PINNED,
    hashes(),
    NOW,
  );
  assertEquals(result.errors.length, 1);
  assertStringIncludes(result.errors[0], "commit mismatch");
});

Deno.test("validateAttestation: a failed gate is an error", () => {
  const result = validateAttestation(
    attestation({
      gate: {
        allPassed: false,
        stepsCompleted: 1,
        stepsTotal: 2,
        stepsSkipped: 0,
      },
    }),
    HEAD,
    PINNED,
    hashes(),
    NOW,
  );
  assertEquals(result.errors, ["gate failed: 1/2 completed, 0 skipped"]);
});

Deno.test("validateAttestation: an edited harness file is an error", () => {
  const actual = hashes();
  actual.set("scripts/build_attestation.ts", "edited");
  const result = validateAttestation(attestation(), HEAD, PINNED, actual, NOW);
  assertEquals(result.errors.length, 1);
  assertStringIncludes(result.errors[0], "scripts/build_attestation.ts");
});

Deno.test("validateAttestation: a stale attestation warns but passes", () => {
  const result = validateAttestation(
    attestation({ timing: { completedAt: "2026-09-23T11:00:00.000Z" } }),
    HEAD,
    PINNED,
    hashes(),
    NOW,
  );
  assertEquals(result.errors, []);
  assertEquals(result.warnings, [
    "freshness: attestation is 49h old (max 24h)",
  ]);
});

Deno.test("validateAttestation: a pinned file missing from the attestation is an error", () => {
  // The file exists at head, so a document without its hash was built by a
  // generator other than the one the trusted configuration describes.
  const integrity = configIntegrity();
  delete integrity.claudeMd;
  const result = validateAttestation(
    attestation({ configIntegrity: integrity }),
    HEAD,
    PINNED,
    hashes(),
    NOW,
  );
  assertEquals(result.errors, [
    "config integrity: CLAUDE.md is pinned but not in attestation",
  ]);
});

Deno.test("validateAttestation: a pinned file missing at head is an error", () => {
  // Deleted, or replaced by a symlink (which hashes as missing): either way
  // the change removed a file the trusted configuration pins.
  const integrity = configIntegrity();
  delete integrity.claudeMd;
  const actual = hashes();
  actual.set("CLAUDE.md", null);
  const result = validateAttestation(
    attestation({ configIntegrity: integrity }),
    HEAD,
    PINNED,
    actual,
    NOW,
  );
  assertEquals(result.errors, [
    "config integrity: CLAUDE.md is pinned but missing, or not a regular file, at the head commit",
  ]);
});

Deno.test("validateAttestation: every workflow the base config names must have run", () => {
  // A change that deletes the reviews workflow and drops it from its own
  // attestation.yaml still has to answer to the base's list.
  const result = validateAttestation(
    attestation({ runs: { build: "run-1" } }),
    HEAD,
    PINNED,
    hashes(),
    NOW,
    ["build", "reviews"],
  );
  assertEquals(result.errors, [
    "attestation has no reviews run; every verification workflow must run",
  ]);
  assertEquals(
    validateAttestation(
      attestation({ runs: { build: "run-1", reviews: "run-2" } }),
      HEAD,
      PINNED,
      hashes(),
      NOW,
      ["build", "reviews"],
    ).errors,
    [],
  );
});

Deno.test("blobChecksum: hashes regular files and refuses symlinks", async () => {
  const repo = await Deno.makeTempDir({ prefix: "blob_checksum_" });
  const git = (...args: string[]) =>
    new Deno.Command("git", {
      args: ["-C", repo, ...args],
      stdout: "null",
      stderr: "null",
    }).output();
  const cwd = Deno.cwd();
  try {
    await git("init", "-q");
    await Deno.writeTextFile(`${repo}/real.ts`, "export {};\n");
    await Deno.symlink("real.ts", `${repo}/link.ts`);
    await Deno.symlink("gone.ts", `${repo}/dangling.ts`);
    await git("add", "-A");
    await git(
      "-c",
      "user.name=t",
      "-c",
      "user.email=t@t",
      "commit",
      "-qm",
      "fixture",
    );
    Deno.chdir(repo);
    assertEquals(
      await blobChecksum("HEAD", "real.ts"),
      await computeChecksum(new TextEncoder().encode("export {};\n")),
    );
    assertEquals(await blobChecksum("HEAD", "link.ts"), null);
    assertEquals(await blobChecksum("HEAD", "dangling.ts"), null);
    assertEquals(await blobChecksum("HEAD", "absent.ts"), null);
  } finally {
    Deno.chdir(cwd);
    await Deno.remove(repo, { recursive: true });
  }
});

Deno.test("validateAttestation: a document that is not an attestation is an error", () => {
  const result = validateAttestation(
    { hello: "world" },
    HEAD,
    PINNED,
    hashes(),
    NOW,
  );
  assertEquals(result.errors.length > 0, true);
  assertStringIncludes(result.errors[0], "AttestationSchema");
});

Deno.test("validateAttestation: hostile step text stays inside one table row", () => {
  const hostile = "a | b \\| c\n<!-- validate-attestation --> " +
    "[x](https://e.test) ![i](https://e.test/i.png) @someone `tick` 🦆";
  const result = validateAttestation(
    attestation({
      steps: [
        { job: hostile, step: hostile, status: hostile, reason: hostile },
      ],
    }),
    HEAD,
    PINNED,
    hashes(),
    NOW,
  );
  const rows = result.summary.filter((l) => l.startsWith("| `"));
  assertEquals(rows.length, 1);
  // The only pipes are the row's two edges and three separators: none come
  // from the author's text, escaped or not.
  assertEquals(rows[0].split("|").length, 6);
  // Everything the author wrote sits inside code spans: outside them, the row
  // is only table structure and the status icon.
  const outside = rows[0].replace(/`[^`]*`/g, "");
  assertEquals(outside.replace(/[\s|]/g, ""), "❌");
  assert(!result.summary.join("\n").includes("\n<!--"));
});

Deno.test("validateAttestation: a schema mismatch lists what failed", () => {
  const result = validateAttestation(
    attestation({ gate: "not a gate" }),
    HEAD,
    PINNED,
    hashes(),
    NOW,
  );
  const summary = result.summary.join("\n");
  assertStringIncludes(summary, "- `gate`:");
  assertStringIncludes(summary, "### ❌ Validation Failed");
});

Deno.test("code: renders untrusted text as one inline code span", () => {
  assertEquals(code("plain"), "`plain`");
  assertEquals(code("a\r\nb`c"), "`a b'c`");
  assertEquals(code(""), "—");
  assertEquals(code("x".repeat(10), 5), "`xxxx…`");
  // Cut on characters, not UTF-16 units: the duck survives whole.
  assertEquals(code("🦆🦆🦆", 3), "`🦆🦆🦆`");
  assertEquals(code("🦆🦆🦆🦆", 3), "`🦆🦆…`");
});

Deno.test("failureSummary: names the commit and the reason, and fails", () => {
  const summary = failureSummary(HEAD, "no attestation found (HTTP 404)")
    .join("\n");
  assertStringIncludes(summary, `Commit \`${HEAD}\``);
  assertStringIncludes(summary, "no attestation found (HTTP 404)");
  assert(
    summary.endsWith("### ❌ Validation Failed — 1 error(s), 0 warning(s)"),
  );
});

Deno.test("writeSummary: writes the summary file and appends the step summary", async () => {
  const dir = await Deno.makeTempDir({ prefix: "write_summary_" });
  const file = `${dir}/summary.md`;
  const step = `${dir}/step.md`;
  try {
    await Deno.writeTextFile(file, "stale\n");
    await Deno.writeTextFile(step, "earlier\n");
    await writeSummary("result\n", { summaryFile: file, stepSummary: step });
    assertEquals(await Deno.readTextFile(file), "result\n");
    assertEquals(await Deno.readTextFile(step), "earlier\nresult\n");

    await writeSummary("only\n", { summaryFile: file });
    assertEquals(await Deno.readTextFile(file), "only\n");
    assertEquals(await Deno.readTextFile(step), "earlier\nresult\n");

    await writeSummary("again\n", { stepSummary: step });
    assertEquals(await Deno.readTextFile(file), "only\n");
    assertEquals(await Deno.readTextFile(step), "earlier\nresult\nagain\n");
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("writeSummary: prints the summary when there is nowhere to write it", async () => {
  const printed: unknown[] = [];
  const log = console.log;
  console.log = (...args: unknown[]) => printed.push(...args);
  try {
    await writeSummary("result\n", {});
  } finally {
    console.log = log;
  }
  assertEquals(printed, ["result\n"]);
});

Deno.test("workflowCommand: a message cannot start a new command", () => {
  assertEquals(
    workflowCommand("error", "names x\r\n::warning::injected 100%"),
    "::error::names x%0D%0A::warning::injected 100%25",
  );
});
