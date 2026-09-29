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

import {
  assert,
  assertEquals,
  assertMatch,
  assertNotEquals,
} from "@std/assert";
import { parse as parseYaml } from "@std/yaml";
import { digestOf } from "../extensions/models/_lib/canonical.ts";
import { parseLifecycle } from "../extensions/models/_lib/lifecycle_schema.ts";
import {
  BUILD_LIFECYCLE,
  HOLDER_TYPE,
  LINEAR_TYPE,
  SWAMP_EXTENSIONS_LIFECYCLE,
  type SwampRepo,
  withRepo,
  WORK_ITEM_TYPE,
} from "./harness.ts";

// ---------------------------------------------------------------------------
// The GW-6 smoke run, automated: gatorwalk-factory through the installed
// swamp CLI, reading results back from swamp's own storage. Each test gets a
// fresh repo. Needs swamp on PATH; see harness.ts.
// ---------------------------------------------------------------------------

const SHA = "c5aaad329c9ceb4edc0504a98ff5d6e5528ac8fd";

async function buildLifecycle(): Promise<Record<string, unknown>> {
  return parseYaml(await Deno.readTextFile(BUILD_LIFECYCLE)) as Record<
    string,
    unknown
  >;
}

/** A holder named team on build-swamp-extension, and a work item started on it. */
async function started(repo: SwampRepo): Promise<string> {
  await repo.holder("team", await buildLifecycle());
  const key = await repo.newKey("team");
  await repo.workItem(key, "start", { lifecycle: "team" });
  return key;
}

function driver(repo: SwampRepo, key: string) {
  return {
    record: async (
      kind: "artifact" | "evidence",
      name: string,
      payload: Record<string, unknown>,
    ) =>
      repo.workItem(key, `record_${kind}`, {
        name,
        payload: JSON.stringify(payload),
        ...await repo.expected(key),
      }),
    go: async (transition: string) =>
      repo.workItem(key, "advance", {
        transition,
        ...await repo.expected(key),
      }),
    approve: async (gateId: string) =>
      repo.workItem(key, "approve", { gateId, ...await repo.expected(key) }),
  };
}

const PLAN = {
  summary: "Add list",
  steps: [{ description: "Add list", files: ["x.ts"] }],
  testingStrategy: "Unit tests",
  versionBump: { needed: true, reason: "New method" },
};

Deno.test("cli: every model type registers from the extension source", async () => {
  await withRepo(async (repo) => {
    const { stdout } = await repo.swamp([
      "model",
      "type",
      "search",
      "gatorwalk",
      "--json",
    ]);
    const types = (JSON.parse(stdout) as { results: { raw: string }[] })
      .results.map((r) => r.raw).sort();
    assertEquals(types, [HOLDER_TYPE, LINEAR_TYPE, WORK_ITEM_TYPE].sort());
  });
});

Deno.test("cli: holder validate reports a valid lifecycle, every schema error and graph errors, and new_key makes a key", async () => {
  await withRepo(async (repo) => {
    await repo.holder("team", await buildLifecycle());
    const ok = await repo.holderMethod("team", "validate");
    assert(
      ok.output.includes(
        "lifecycle 'build-swamp-extension' in 'team' is valid",
      ),
      ok.output,
    );
    assertMatch(
      await repo.newKey("team"),
      /^build-swamp-extension-[a-z2-7]{8}$/,
    );

    const broken = await buildLifecycle();
    const stages = broken.stages as {
      work: Record<string, unknown>;
      transitions: unknown[];
    }[];
    // A platform expression: swamp must leave it to the lifecycle schema.
    stages[0].work.systemPrompt = "Plan ${{ model.x }}";
    stages[1].transitions.push({ name: "nowhere", to: "missing" });
    await repo.holder("broken", broken);
    const bad = await repo.holderMethod("broken", "validate", {
      allowFailure: true,
    });
    assertNotEquals(bad.code, 0);
    assert(
      bad.output.includes("stages.0.work.systemPrompt: contains ${{ }}"),
      bad.output,
    );
    assert(bad.output.includes("targets unknown stage 'missing'"), bad.output);

    // A design error the schema accepts: plan can never see the check
    // stage's evidence, so graph analysis fails validate.
    const unsound = await buildLifecycle();
    (unsound.stages as { transitions: unknown[] }[])[0].transitions.push({
      name: "shortcut",
      to: "code-review",
      gates: [{ type: "evidence-recorded", config: { name: "checks" } }],
    });
    await repo.holder("unsound", unsound);
    const design = await repo.holderMethod("unsound", "validate", {
      allowFailure: true,
    });
    assertNotEquals(design.code, 0);
    assert(
      design.output.includes(
        "stages.0.transitions.1 (from stage 'plan'): transition 'shortcut'",
      ),
      design.output,
    );
  });
});

Deno.test("cli: swamp-extensions validates on the real engine, and a work item starts on it", async () => {
  await withRepo(async (repo) => {
    const lifecycle = parseYaml(
      await Deno.readTextFile(SWAMP_EXTENSIONS_LIFECYCLE),
    ) as Record<string, unknown>;
    await repo.holder("process", lifecycle);
    const ok = await repo.holderMethod("process", "validate");
    assert(
      ok.output.includes("lifecycle 'swamp-extensions' in 'process' is valid"),
      ok.output,
    );
    const key = await repo.newKey("process");
    await repo.workItem(key, "start", { lifecycle: "process" });
    assertEquals((await repo.expected(key)).expectedStage, "triage");
  });
});

Deno.test("cli: start, status, a rejected payload and a stale write", async () => {
  await withRepo(async (repo) => {
    const key = await started(repo);
    const run = await repo.run(key);
    assertEquals(run.key, key);
    assertEquals(run.stage, "plan");
    assertEquals(run.lifecycle.version, 1);

    const status = await repo.workItem(key, "status");
    assert(status.output.includes("stage 'plan'"), status.output);

    const rejected = await repo.workItem(key, "record_artifact", {
      name: "plan",
      payload: JSON.stringify({ summary: "s" }),
      ...await repo.expected(key),
    }, { allowFailure: true });
    assertNotEquals(rejected.code, 0);
    assert(
      rejected.output.includes("rejected and kept as retry feedback"),
      rejected.output,
    );
    const feedback = (await repo.run(key)).validations.artifacts.plan;
    assertEquals(feedback.rejected, { summary: "s" });
    assert(feedback.errors.length > 0);

    const before = await repo.versions(key);
    const stale = await repo.workItem(key, "record_artifact", {
      name: "plan",
      payload: JSON.stringify(PLAN),
      ...await repo.expected(key),
      expectedCycle: "2",
    }, { allowFailure: true });
    assertNotEquals(stale.code, 0);
    assert(stale.output.includes("stale:"), stale.output);
    assertEquals(
      await repo.versions(key),
      before,
      "a refused write writes nothing",
    );
  });
});

Deno.test("cli: start takes externalRefs as a JSON string through --input (#2640)", async () => {
  await withRepo(async (repo) => {
    await repo.holder("team", await buildLifecycle());
    const key = await repo.newKey("team");
    const refs = {
      linear: "5b0e7a52-3f0c-4d8e-9a51-2c7d4a1e9b10",
      "linear.display": "GW-16",
    };
    await repo.workItem(key, "start", {
      lifecycle: "team",
      externalRefs: JSON.stringify(refs),
    });
    assertEquals((await repo.run(key)).externalRefs, refs);
  });
});

Deno.test("cli: record, advance and approve; reset keeps the pin, reset with repin adopts an edited holder", async () => {
  await withRepo(async (repo) => {
    const key = await started(repo);
    const { record, go, approve } = driver(repo, key);
    await record("artifact", "plan", PLAN);
    await go("submit");
    await record("artifact", "plan-review", { findings: [] });
    await approve("plan-approval");
    await go("approve");
    const moved = await repo.run(key);
    assertEquals(moved.stage, "implement");
    assertEquals(moved.approvals.length, 1);

    const pinned = moved.lifecycle.digest;
    const edited = await buildLifecycle();
    edited.description = "edited after start";
    await repo.editHolder("team", edited);

    await repo.workItem(key, "reset", {
      confirm: "reset",
      ...await repo.expected(key),
    });
    const kept = await repo.run(key);
    assertEquals(kept.stage, "plan");
    assertEquals(
      kept.lifecycle.digest,
      pinned,
      "reset keeps the pinned lifecycle",
    );

    await repo.workItem(key, "reset", {
      confirm: "reset",
      repin: "true",
      ...await repo.expected(key),
    });
    const repinned = await repo.run(key);
    assertNotEquals(repinned.lifecycle.digest, pinned);
    assertEquals(repinned.lifecycle.version, 2);
    const copy = await repo.data(key, "lifecycle", 2);
    assertEquals(
      (copy.lifecycle as Record<string, unknown>).description,
      "edited after start",
    );
  });
});

Deno.test("cli: build-swamp-extension from start to release, with every stored version matching its digest", async () => {
  await withRepo(async (repo) => {
    const key = await started(repo);
    const { record, go, approve } = driver(repo, key);
    await record("artifact", "plan", PLAN);
    await go("submit");
    await record("artifact", "plan-review", { findings: [] });
    await approve("plan-approval");
    await go("approve");
    await record("artifact", "change-summary", {
      summary: "Added list",
      commit: SHA,
      files: ["x.ts"],
      manifestVersion: "2026.09.28.1",
    });
    await go("submit");
    await record("evidence", "checks", {
      commit: SHA,
      status: "passed",
      results: [{ name: "test", status: "passed" }],
    });
    // The largest safe integer and a fraction, through swamp's storage.
    await record("evidence", "quality", {
      commit: SHA,
      status: "passed",
      allPassed: true,
      rubricVersion: 3,
      earnedPoints: Number.MAX_SAFE_INTEGER,
      percentage: 87.5,
    });
    await go("passed");
    await record("artifact", "code-review", { findings: [] });
    await approve("release-approval");
    await go("accept");
    await record("evidence", "release", {
      via: "registry-push",
      commit: SHA,
      url: "https://swamp-club.com/extensions/@me/thing",
      version: "2026.09.28.1",
    });
    await go("released");

    const run = await repo.run(key);
    assertEquals(run.stage, "done");
    assertEquals(run.status, "terminal");
    const status = await repo.workItem(key, "status");
    assert(status.output.includes("terminal at stage 'done'"), status.output);

    // Each payload version the run indexes, read back from storage, still
    // has the digest taken before it was written.
    const indexed = [
      ...Object.entries(run.products.artifacts).map(([n, r]) =>
        [`artifact-${n}`, r] as const
      ),
      ...Object.entries(run.products.evidence).map(([n, r]) =>
        [`evidence-${n}`, r] as const
      ),
    ];
    assertEquals(indexed.length, 7);
    for (const [name, ref] of indexed) {
      const stored = await repo.data(key, name, ref.version);
      assertEquals(await digestOf(stored), ref.digest, name);
    }
    const quality = await repo.data(
      key,
      "evidence-quality",
      run.products.evidence.quality.version,
    );
    assertEquals(quality.earnedPoints, Number.MAX_SAFE_INTEGER);
    assertEquals(quality.percentage, 87.5);

    // And so does the pinned lifecycle.
    assert(run.lifecycle.version !== undefined);
    const pin = await repo.data(key, "lifecycle", run.lifecycle.version);
    assertEquals(pin.digest, run.lifecycle.digest);
    const parsed = parseLifecycle(pin.lifecycle);
    assert(parsed.ok);
    assertEquals(await digestOf(parsed.value), run.lifecycle.digest);
  });
});
