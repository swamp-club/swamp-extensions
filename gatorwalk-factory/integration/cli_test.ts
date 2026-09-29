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
import type { Metrics } from "../extensions/models/_lib/metrics.ts";
import { stopsDefinition } from "../extensions/models/_lib/test_support.ts";
import {
  BUILD_LIFECYCLE,
  HOLDER_TYPE,
  LINEAR_TYPE,
  STAGE_TEMPLATE_TYPE,
  SWAMP_CLUB_TYPE,
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

const TESTDATA = new URL("../testdata/", import.meta.url);

async function testdata(path: string): Promise<Record<string, unknown>> {
  return parseYaml(await Deno.readTextFile(new URL(path, TESTDATA))) as Record<
    string,
    unknown
  >;
}

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
    assertEquals(
      types,
      [
        HOLDER_TYPE,
        LINEAR_TYPE,
        STAGE_TEMPLATE_TYPE,
        SWAMP_CLUB_TYPE,
        WORK_ITEM_TYPE,
      ]
        .sort(),
    );
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

Deno.test("cli: design_page stores the swamp-extensions lifecycle as an HTML file", async () => {
  await withRepo(async (repo) => {
    const lifecycle = parseYaml(
      await Deno.readTextFile(SWAMP_EXTENSIONS_LIFECYCLE),
    ) as Record<string, unknown>;
    await repo.holder("process", lifecycle);
    const run = await repo.holderMethod("process", "design_page");
    assert(
      run.output.includes(
        "design page for lifecycle 'swamp-extensions' in 'process'",
      ),
      run.output,
    );
    // The command the log gives for saving the page, less the jq.
    const { stdout } = await repo.swamp([
      "data",
      "get",
      "process",
      "design-page",
      "--json",
    ]);
    const page = JSON.parse(stdout) as {
      contentType: string;
      content: string;
      tags: Record<string, string>;
    };
    assertEquals(page.contentType, "text/html");
    assertEquals(page.tags.specName, "design-page");
    assert(page.content.startsWith("<!doctype html>"));
    assert(page.content.includes("<h1>swamp-extensions</h1>"));
    assert(page.content.includes('id="stage-triage"'));
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

Deno.test("cli: apply a stage template to a lifecycle, save it, and run a work item through the applied stages", async () => {
  await withRepo(async (repo) => {
    // The stage template's $param placeholders come back from swamp's storage
    // as written, or validate could not fill them in.
    await repo.templateHolder(
      "review-plan",
      await testdata("../templates/review-plan.yaml"),
    );
    const valid = await repo.holderMethod("review-plan", "validate", {
      inputs: { params: JSON.stringify({ blocking: ["critical"] }) },
    });
    assert(
      valid.output.includes(
        "stage template 'review-plan' in 'review-plan' is valid",
      ),
      valid.output,
    );

    await repo.holder("team", await testdata("lifecycles/apply-target.yaml"));
    const applied = await repo.holderMethod("team", "apply", {
      inputs: {
        template: "review-plan",
        replace: "review",
        names: JSON.stringify({ stages: { "plan-review": "critique" } }),
      },
    });
    assert(
      applied.output.includes(
        "applied stage template 'review-plan' from 'review-plan' to lifecycle 'plan-then-build'",
      ),
      applied.output,
    );
    const record = await repo.data("team", "applied-lifecycle");
    const parsed = parseLifecycle(record.lifecycle);
    assert(parsed.ok, parsed.ok ? "" : parsed.errors.join("\n"));
    assertEquals(await digestOf(parsed.value), record.digest);

    // The author saves it as the holder's lifecycle; nothing else changes.
    await repo.editHolder("team", record.lifecycle);
    const saved = await repo.holderMethod("team", "validate");
    assert(
      saved.output.includes("lifecycle 'plan-then-build' in 'team' is valid"),
      saved.output,
    );

    const key = await repo.newKey("team");
    await repo.workItem(key, "start", { lifecycle: "team" });
    const { record: put, go, approve } = driver(repo, key);
    await put("artifact", "plan", { summary: "Add list" });
    await go("submit");
    assertEquals((await repo.run(key)).stage, "critique");
    await put("artifact", "plan-review", { findings: [] });
    await approve("plan-approval");
    await go("approve");
    await put("evidence", "change", { url: "https://example.com/pr/1" });
    await go("finish");
    const run = await repo.run(key);
    assertEquals(run.stage, "done");
    assertEquals(run.status, "terminal");
  });
});

Deno.test("cli: the starter stage templates, applied in flow order through the holders, give a lifecycle a work item runs to done", async () => {
  await withRepo(async (repo) => {
    const starters: [template: string, placeholder: string][] = [
      ["plan", "plan"],
      ["review-plan", "plan-review"],
      ["implement", "implement"],
      ["verify", "verify"],
      ["review", "code-review"],
    ];
    for (const [template] of starters) {
      await repo.templateHolder(
        template,
        await testdata(`../templates/${template}.yaml`),
      );
      const valid = await repo.holderMethod(template, "validate");
      assert(
        valid.output.includes(
          `stage template '${template}' in '${template}' is valid`,
        ),
        valid.output,
      );
    }

    // Each apply reads the holder's lifecycle, so each result is saved
    // before the next, as an author would.
    await repo.holder("team", await testdata("lifecycles/starter-sketch.yaml"));
    for (const [template, placeholder] of starters) {
      await repo.holderMethod("team", "apply", {
        inputs: { template, replace: placeholder },
      });
      const record = await repo.data("team", "applied-lifecycle");
      await repo.editHolder("team", record.lifecycle);
    }
    const saved = await repo.holderMethod("team", "validate");
    assert(
      saved.output.includes("lifecycle 'starter' in 'team' is valid"),
      saved.output,
    );
    const core = parseLifecycle(
      await testdata("lifecycles/starter-core.yaml"),
    );
    assert(core.ok);
    const record = await repo.data("team", "applied-lifecycle");
    assertEquals(record.digest, await digestOf(core.value));

    const key = await repo.newKey("team");
    await repo.workItem(key, "start", { lifecycle: "team" });
    const { record: put, go, approve } = driver(repo, key);
    const stage = async () => (await repo.run(key)).stage;
    await put("artifact", "plan", {
      summary: "Add list",
      steps: [{ description: "Add list", files: ["x.ts"] }],
      testingStrategy: "Unit tests",
    });
    await go("submit");
    assertEquals(await stage(), "plan-review");
    await put("artifact", "plan-review", { findings: [] });
    await approve("plan-approval");
    await go("approve");
    assertEquals(await stage(), "implement");
    await put("artifact", "change-summary", {
      summary: "Added list",
      commit: SHA,
      files: ["x.ts"],
    });
    await go("submit");
    assertEquals(await stage(), "verify");
    await put("evidence", "checks", {
      commit: SHA,
      status: "passed",
      results: [{ name: "test", status: "passed" }],
    });
    await go("passed");
    assertEquals(await stage(), "code-review");
    await put("artifact", "code-review", {
      findings: [{ id: "C1", severity: "critical", description: "Leak" }],
    });
    await go("rework");
    assertEquals(await stage(), "implement");
    await go("submit");
    await put("evidence", "checks", {
      commit: SHA,
      status: "passed",
      results: [{ name: "test", status: "passed" }],
    });
    await go("passed");
    await put("artifact", "code-review", { findings: [] });
    await approve("release-approval");
    await go("accept");
    assertEquals(await stage(), "release");
    await put("evidence", "release", {
      commit: SHA,
      url: "https://example.com/pr/1",
    });
    await go("released");
    const run = await repo.run(key);
    assertEquals(run.stage, "done");
    assertEquals(run.status, "terminal");
  });
});

Deno.test("cli: dispatch, usage, a decline and approvals, then summary: the report, the metrics record and a query across items", async () => {
  await withRepo(async (repo) => {
    // The stops lifecycle, with its cooldown cut to a second.
    const lifecycle = stopsDefinition();
    const ship = (lifecycle.stages as { id: string; transitions?: unknown[] }[])
      .find((s) => s.id === "ship");
    const release = ship?.transitions?.[0] as {
      gates: { type: string; config: Record<string, unknown> }[];
    };
    release.gates[0].config.seconds = 1;
    await repo.holder("team", lifecycle);
    const key = await repo.newKey("team");
    await repo.workItem(key, "start", { lifecycle: "team" });
    const wi = driver(repo, key);

    await repo.workItem(key, "dispatch", await repo.expected(key));
    await repo.workItem(key, "record_usage", {
      dispatchId: "1",
      inputTokens: "120",
      outputTokens: "30",
      model: "m1",
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
    assertEquals(metrics.summary.dispatches, { count: 1, retries: 0 });
    assertEquals(metrics.summary.usage.inputTokens, 120);
    assertEquals(metrics.summary.usage.outputTokens, 30);

    // Level with the run, so a rebuild writes nothing.
    const rebuilt = await repo.workItem(key, "rebuild_metrics");
    assert(rebuilt.output.includes("metrics are up to date"), rebuilt.output);

    // The dashboard case: every work item's metrics in one query.
    const other = await repo.newKey("team");
    await repo.workItem(other, "start", { lifecycle: "team" });
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
