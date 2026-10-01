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
import { join } from "@std/path";
import { digestOf } from "../../extensions/models/_lib/engine/canonical.ts";
import { parseDefinition } from "../../extensions/models/_lib/engine/definition_schema.ts";
import type { Metrics } from "../../extensions/models/_lib/engine/metrics.ts";
import { stopsDefinition } from "../../extensions/models/_lib/engine/test_support.ts";
import {
  BUILD_DEFINITION,
  FACTORY_TYPE,
  readExample,
  type SwampRepo,
  withRepo,
  WORK_ITEM_TYPE,
} from "../harness.ts";

// ---------------------------------------------------------------------------
// The GW-6 smoke run, automated: gatorwalk-factory through the installed
// swamp CLI, reading results back from swamp's own storage. Each test gets a
// fresh repo. Needs swamp on PATH; see harness.ts.
// ---------------------------------------------------------------------------

const SHA = "c5aaad329c9ceb4edc0504a98ff5d6e5528ac8fd";

/** The build-swamp-extension example's definition block. */
async function buildDefinition(): Promise<Record<string, unknown>> {
  return (await readExample(BUILD_DEFINITION)).definition;
}

/** A factory named team on build-swamp-extension, and a work item started on
 * it. */
async function started(repo: SwampRepo): Promise<string> {
  await repo.factory("team", await buildDefinition());
  const key = await repo.newKey("team", "Integration work");
  await repo.workItem(key, "start", { factory: "team" });
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

Deno.test("cli: factory validate reports a valid definition, every schema error and graph errors, and new_key makes a key", async () => {
  await withRepo(async (repo) => {
    await repo.factory("team", await buildDefinition());
    const ok = await repo.factoryMethod("team", "validate");
    assert(
      ok.output.includes(
        "factory 'team' is valid",
      ),
      ok.output,
    );
    assertMatch(
      await repo.newKey("team", "Add JSON output to status"),
      /^team-add-json-output-status-[a-z2-7]{4}$/,
    );
    // start takes any unused name, so a person can choose a key by hand.
    const chosen = await repo.workItem("my-chosen-key", "start", {
      factory: "team",
    });
    assert(chosen.output.includes("started 'my-chosen-key'"), chosen.output);

    const broken = await buildDefinition();
    const stages = broken.stages as {
      work: Record<string, unknown>;
      transitions: unknown[];
    }[];
    // A swamp expression: swamp skips its schema check of a key that holds
    // one, so gatorwalk's own check of the raw definition refuses it.
    stages[0].work.systemPrompt = "Plan ${{ model.x }}";
    stages[1].transitions.push({ name: "nowhere", to: "missing" });
    await repo.factory("broken", broken);
    const bad = await repo.factoryMethod("broken", "validate", {
      allowFailure: true,
    });
    assertNotEquals(bad.code, 0);
    assert(
      bad.output.includes("stages.0.work.systemPrompt: contains ${{ }}"),
      bad.output,
    );
    assert(bad.output.includes("targets unknown stage 'missing'"), bad.output);
    const refused = await repo.workItem("broken-item", "start", {
      factory: "broken",
    }, { allowFailure: true });
    assertNotEquals(refused.code, 0);
    assertEquals(await repo.versions("broken-item"), {}, "nothing pinned");

    // A design error the schema accepts: plan can never see the check
    // stage's evidence, so graph analysis fails validate.
    const unsound = await buildDefinition();
    (unsound.stages as { transitions: unknown[] }[])[0].transitions.push({
      name: "shortcut",
      to: "code-review",
      gates: [{ type: "evidence-recorded", config: { name: "checks" } }],
    });
    await repo.factory("unsound", unsound);
    const design = await repo.factoryMethod("unsound", "validate", {
      allowFailure: true,
    });
    assertNotEquals(design.code, 0);
    assert(
      design.output.includes(
        "stages.0.transitions.2 (from stage 'plan'): transition 'shortcut'",
      ),
      design.output,
    );
  });
});

Deno.test("cli: validate runs the factory's saved scenarios and names a failing step", async () => {
  await withRepo(async (repo) => {
    const { definition, scenarios } = await readExample(BUILD_DEFINITION);
    const saved = scenarios.find((s) =>
      (s as { scenario?: unknown }).scenario === "plan-churn"
    );
    assert(saved !== undefined);
    await repo.factory("process", definition, { scenarios: [saved] });
    const ok = await repo.factoryMethod("process", "validate");
    assert(
      ok.output.includes("1 saved scenario(s) passed"),
      ok.output,
    );

    const changed = JSON.parse(
      JSON.stringify(saved).replace(
        "cycle override for 'plan'",
        "needs a reason",
      ),
    );
    await repo.editFactory("process", definition, [changed]);
    const failed = await repo.factoryMethod("process", "validate", {
      allowFailure: true,
    });
    assertNotEquals(failed.code, 0);
    assert(
      failed.output.includes(
        "scenarios.0 (plan-churn) step 16 (move revise): " +
          'expected a refusal mentioning "needs a reason"',
      ),
      failed.output,
    );
  });
});

Deno.test("cli: start, status, a rejected payload and a stale write", async () => {
  await withRepo(async (repo) => {
    const key = await started(repo);
    const run = await repo.run(key);
    assertEquals(run.key, key);
    assertEquals(run.stage, "plan");
    assertEquals(run.definition.version, 1);

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

Deno.test("cli: status, dispatch and writes print their text once, and a write ends with the status that follows it", async () => {
  await withRepo(async (repo) => {
    const key = await started(repo);
    const go = driver(repo, key);
    // Run as the skill runs them, without --log, which prints it all twice.
    const once = (output: string, text: string) =>
      assertEquals(output.split(text).length, 2, `${text}\n---\n${output}`);

    const status = await repo.workItem(key, "status");
    once(status.output, `${key}: active at stage 'plan' cycle 1`);
    const dispatched = await repo.workItem(
      key,
      "dispatch",
      await repo.expected(key),
    );
    once(dispatched.output, "dispatch 1 for stage 'plan' cycle 1");
    once(dispatched.output, "Plan the change.");
    const recorded = await go.record("artifact", "plan", PLAN);
    once(recorded.output, "recorded artifact 'plan' version 1");
    once(recorded.output, "  exit submit -> plan-review: ready");
    const advanced = await go.go("submit");
    once(advanced.output, "took 'submit' to stage 'plan-review' cycle 1");
    once(
      advanced.output,
      "  expect: --input expectedStage=plan-review --input expectedCycle=1 " +
        `--input expectedEra=${(await repo.run(key)).era}`,
    );
    assert(
      advanced.output.includes("  exit approve -> implement"),
      advanced.output,
    );
  });
});

Deno.test("cli: start takes externalRefs as a JSON string through --input (#2640)", async () => {
  await withRepo(async (repo) => {
    await repo.factory("team", await buildDefinition());
    const key = await repo.newKey("team", "Integration work");
    const refs = {
      builtin: "board-integration-work-r2ne",
      "builtin.display": "board-integration-work-r2ne",
    };
    await repo.workItem(key, "start", {
      factory: "team",
      externalRefs: JSON.stringify(refs),
    });
    assertEquals((await repo.run(key)).externalRefs, refs);
  });
});

Deno.test("cli: retarget replaces externalRefs from a JSON string and journals the move", async () => {
  await withRepo(async (repo) => {
    await repo.factory("team", await buildDefinition());
    const key = await repo.newKey("team", "Integration work");
    await repo.workItem(key, "start", {
      factory: "team",
      externalRefs: JSON.stringify({ builtin: "board-work-2630" }),
    });
    const before = await repo.run(key);
    const refs = {
      builtin: "board-work-2631",
      "builtin.display": "board-work-2631",
    };
    await repo.workItem(key, "retarget", {
      externalRefs: JSON.stringify(refs),
      reason: "2630 duplicates 2631",
      ...await repo.expected(key),
    });
    const after = await repo.run(key);
    assertEquals(after.externalRefs, refs);
    assertEquals([after.stage, after.era], [before.stage, before.era]);
    const moved = after.journal.at(-1);
    assert(moved?.type === "retargeted");
    assertEquals(moved.from, { builtin: "board-work-2630" });
    assertEquals(moved.reason, "2630 duplicates 2631");
  });
});

Deno.test("cli: record, advance and approve; reset keeps the pin, reset with repin adopts an edited factory", async () => {
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

    const pinned = moved.definition.digest;
    const edited = await buildDefinition();
    edited.description = "edited after start";
    await repo.editFactory("team", edited);

    await repo.workItem(key, "reset", {
      confirm: "reset",
      ...await repo.expected(key),
    });
    const kept = await repo.run(key);
    assertEquals(kept.stage, "plan");
    assertEquals(
      kept.definition.digest,
      pinned,
      "reset keeps the pinned definition",
    );

    await repo.workItem(key, "reset", {
      confirm: "reset",
      repin: "true",
      ...await repo.expected(key),
    });
    const repinned = await repo.run(key);
    assertNotEquals(repinned.definition.digest, pinned);
    assertEquals(repinned.definition.version, 2);
    const copy = await repo.data(key, "definition", 2);
    assertEquals(
      (copy.definition as Record<string, unknown>).description,
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

    // And so does the pinned factory definition.
    assert(run.definition.version !== undefined);
    const pin = await repo.data(key, "definition", run.definition.version);
    assertEquals(pin.digest, run.definition.digest);
    const parsed = parseDefinition(pin.definition);
    assert(parsed.ok);
    assertEquals(await digestOf(parsed.value), run.definition.digest);
  });
});

Deno.test("cli: dispatch, usage, a decline and approvals, then summary: the report, the metrics record and a query across items", async () => {
  await withRepo(async (repo) => {
    // The stops factory definition, with its cooldown cut to a second.
    const definition = stopsDefinition();
    const ship =
      (definition.stages as { id: string; transitions?: unknown[] }[])
        .find((s) => s.id === "ship");
    const release = ship?.transitions?.[0] as {
      gates: { type: string; config: Record<string, unknown> }[];
    };
    release.gates[0].config.seconds = 1;
    await repo.factory("team", definition);
    const key = await repo.newKey("team", "Integration work");
    await repo.workItem(key, "start", { factory: "team" });
    const wi = driver(repo, key);

    await repo.workItem(key, "dispatch", await repo.expected(key));
    await repo.workItem(key, "record_usage", {
      dispatchId: "1",
      inputTokens: "120",
      outputTokens: "30",
      model: "m1",
    });
    // A harness reports one total for a subagent, with no split.
    await repo.workItem(key, "dispatch", await repo.expected(key));
    await repo.workItem(key, "record_usage", {
      dispatchId: "2",
      totalTokens: "65155",
      toolUses: "4",
      durationMs: "90000",
    });
    await wi.record("artifact", "plan", { text: "the plan" });
    await wi.go("submit");
    await repo.workItem(key, "decline", {
      gateId: "go",
      note: "needs tests",
      ...await repo.expected(key),
    });
    await wi.record("artifact", "review", { text: "tests added" });
    await wi.approve("go");
    await wi.go("approve");
    await wi.record("evidence", "pr", { status: "ok" });
    // Past the cooldown, so the person is what the exit waits on.
    await new Promise((resolve) => setTimeout(resolve, 1100));
    await wi.approve("release-ok");
    await wi.go("release");

    const run = await repo.run(key);
    assertEquals(run.status, "terminal");
    const awaited = run.journal.flatMap((e) =>
      e.type === "awaiting" ? [e.exits.map((x) => x.transition)] : []
    );
    assertEquals(awaited, [["approve"], [], ["approve"], [], ["release"], []]);

    const summary = await repo.workItem(key, "summary");
    assert(summary.output.includes(`# Work item ${key}`), summary.output);

    // The report ran after summary and was stored by swamp.
    const { stdout } = await repo.swamp([
      "report",
      "get",
      "@swamp/gatorwalk-factory/work-item-summary",
      "--model",
      key,
      "--json",
    ]);
    const stored = JSON.parse(stdout) as { markdown: string };
    assert(stored.markdown.startsWith(`# Work item ${key}\n`));
    assert(stored.markdown.includes("declined 'go': needs tests"));
    const twin = await repo.data(
      key,
      "report-swamp-gatorwalk-factory-work-item-summary-json",
    ) as { metrics: Metrics };

    // The metrics record, at the same journal version as the report.
    const metrics = await repo.data(key, "metrics") as unknown as Metrics;
    assertEquals(metrics.journalVersion, run.journal.length);
    assertEquals(twin.metrics, metrics);
    assertEquals(metrics.status, "terminal");
    assertEquals(
      metrics.eras[0].waits.map((w) => [w.transition, w.endedBy]),
      [["approve", "declined"], ["approve", "approved"], [
        "release",
        "approved",
      ]],
    );
    assertEquals(metrics.summary.rework.declines, 1);
    assertEquals(metrics.summary.dispatches, { count: 2, retries: 1 });
    const usage = metrics.summary.usage;
    assertEquals(usage.totalTokens, 120 + 30 + 65155);
    assertEquals([usage.inputTokens, usage.outputTokens], [120, 30]);
    assertEquals([usage.toolUses, usage.durationMs], [4, 90000]);
    assertEquals([usage.dispatchesWithUsage, usage.dispatchesWithoutUsage], [
      2,
      0,
    ]);

    // Level with the run, so a rebuild writes nothing.
    const rebuilt = await repo.workItem(key, "rebuild_metrics");
    assert(rebuilt.output.includes("metrics are up to date"), rebuilt.output);

    // The dashboard case: every work item's metrics in one query.
    const other = await repo.newKey("team", "Integration work");
    await repo.workItem(other, "start", { factory: "team" });
    const query = await repo.swamp([
      "data",
      "query",
      `modelType == "${WORK_ITEM_TYPE}" && name == "metrics"`,
      "--json",
    ]);
    const found = (JSON.parse(query.stdout) as {
      results: { content: Metrics }[];
    }).results.map((r) => [r.content.key, r.content.status]).sort();
    assertEquals(found, [[key, "terminal"], [other, "active"]].sort());
  });
});

/** Every path under `dir`, relative to it, skipping .swamp. */
async function pathsUnder(dir: string, rel = ""): Promise<string[]> {
  const out: string[] = [];
  for await (const entry of Deno.readDir(join(dir, rel))) {
    const path = rel === "" ? entry.name : `${rel}/${entry.name}`;
    if (path === ".swamp") continue;
    out.push(path);
    if (entry.isDirectory) out.push(...await pathsUnder(dir, path));
  }
  return out;
}

Deno.test("cli: a factory holds its definition: created with only its tracker, the definition written in, then validate and start read it", async () => {
  await withRepo(async (repo) => {
    await repo.swamp([
      "model",
      "create",
      "@swamp/gatorwalk-factory/tracker",
      "board",
      "--global-arg",
      "prefix=board",
      "--json",
    ]);
    // swamp model create checks the full schema when a --global-arg is
    // given; a factory with only its tracker passes it.
    await repo.swamp([
      "model",
      "create",
      FACTORY_TYPE,
      "team",
      "--global-arg",
      "tracker=board",
      "--json",
    ]);
    const empty = await repo.factoryMethod("team", "validate", {
      allowFailure: true,
    });
    assertNotEquals(empty.code, 0);
    assert(
      empty.output.includes("factory 'team' has no definition"),
      empty.output,
    );

    const { definition, scenarios } = await readExample(BUILD_DEFINITION);
    await repo.editFactory("team", definition, scenarios);
    const checked = await repo.swamp(["model", "validate", "team"]);
    assert(checked.output.includes("Result: PASSED"), checked.output);
    const valid = await repo.factoryMethod("team", "validate");
    assert(
      valid.output.includes(
        "factory 'team' is valid",
      ) &&
        valid.output.includes(
          `${scenarios.length} saved scenario(s) passed`,
        ),
      valid.output,
    );

    const key = await repo.newKey("team", "From the model");
    await repo.workItem(key, "start", { factory: "team" });
    assertEquals(
      (await repo.run(key)).definition.digest,
      await digestOf(definition),
    );
    // One copy, in the model definition: no factory file anywhere.
    const paths = await pathsUnder(repo.dir);
    assertEquals(
      paths.filter((p) => /(^|\/)(factories|scenarios)(\/|$)/.test(p)),
      [],
    );
  });
});

Deno.test("cli: swamp model validate reports a schema error in the definition, with its path, and every factory method stops on it", async () => {
  await withRepo(async (repo) => {
    const definition = await buildDefinition();
    (definition.stages as { transitions: unknown[] }[])[1].transitions.push({
      name: "nowhere",
      to: "missing",
    });
    await repo.factory("team", definition);
    const checked = await repo.swamp(["model", "validate", "team"], {
      allowFailure: true,
    });
    assertNotEquals(checked.code, 0);
    assertMatch(
      checked.output,
      /targets unknown stage 'missing' at "definition\.stages\.1\.transitions\.\d+\.to"/,
    );
    const run = await repo.factoryMethod("team", "new_key", {
      inputs: { title: "Anything" },
      allowFailure: true,
    });
    assertNotEquals(run.code, 0);
    assert(
      run.output.includes("Global arguments validation failed") &&
        run.output.includes("targets unknown stage 'missing'"),
      run.output,
    );
  });
});

Deno.test("cli: swamp model validate rejects a definition that names itself: the factory names it", async () => {
  await withRepo(async (repo) => {
    await repo.factory("team", { ...await buildDefinition(), name: "other" });
    const checked = await repo.swamp(["model", "validate", "team"], {
      allowFailure: true,
    });
    assertNotEquals(checked.code, 0);
    assert(checked.output.includes('"name"'), checked.output);
  });
});

Deno.test("cli: {{name}} placeholders, one named like a swamp namespace, and CEL gates survive a save-and-run round trip", async () => {
  await withRepo(async (repo) => {
    // planSummary renamed run: a swamp namespace, which swamp's template
    // scan would flag were the definition not marked as foreign templates.
    const text = JSON.stringify(await buildDefinition())
      .replaceAll("planSummary", "run");
    const definition = JSON.parse(text) as Record<string, unknown>;
    assert(text.includes("{{run}}") && text.includes('"type":"cel"'));
    await repo.factory("team", definition);
    const checked = await repo.swamp(["model", "validate", "team"]);
    assert(checked.output.includes("Result: PASSED"), checked.output);
    assert(!checked.output.includes("Expression paths ✗"), checked.output);
    const key = await repo.newKey("team", "Round trip");
    await repo.workItem(key, "start", { factory: "team" });
    const pinned = await repo.data(key, "definition");
    const parsed = parseDefinition(definition);
    assert(parsed.ok);
    assertEquals(pinned.definition, JSON.parse(JSON.stringify(parsed.value)));
  });
});
