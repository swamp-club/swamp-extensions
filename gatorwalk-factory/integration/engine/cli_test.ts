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
import { parse as parseYaml } from "@std/yaml";
import { digestOf } from "../../extensions/models/_lib/engine/canonical.ts";
import { parseDefinition } from "../../extensions/models/_lib/engine/definition_schema.ts";
import type { Metrics } from "../../extensions/models/_lib/engine/metrics.ts";
import { stopsDefinition } from "../../extensions/models/_lib/engine/test_support.ts";
import {
  BUILD_DEFINITION,
  FACTORY_TYPE,
  SWAMP_EXTENSIONS_DEFINITION,
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

async function buildDefinition(): Promise<Record<string, unknown>> {
  return parseYaml(await Deno.readTextFile(BUILD_DEFINITION)) as Record<
    string,
    unknown
  >;
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
        "definition 'build-swamp-extension' in factories/team.yaml is valid",
      ),
      ok.output,
    );
    assertMatch(
      await repo.newKey("team", "Add JSON output to status"),
      /^build-swamp-extension-add-json-output-status-[a-z2-7]{4}$/,
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
    // A platform expression: swamp must leave it to the factory definition
    // schema.
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
        "stages.0.transitions.1 (from stage 'plan'): transition 'shortcut'",
      ),
      design.output,
    );
  });
});

Deno.test("cli: swamp-club-swamp-extensions validates on the real engine, and a work item starts on it", async () => {
  await withRepo(async (repo) => {
    const definition = parseYaml(
      await Deno.readTextFile(SWAMP_EXTENSIONS_DEFINITION),
    ) as Record<string, unknown>;
    await repo.factory("process", definition);
    const ok = await repo.factoryMethod("process", "validate");
    assert(
      ok.output.includes(
        "definition 'swamp-club-swamp-extensions' in factories/process.yaml is valid",
      ),
      ok.output,
    );
    const key = await repo.newKey("process", "Integration work");
    await repo.workItem(key, "start", { factory: "process" });
    assertEquals((await repo.expected(key)).expectedStage, "triage");
  });
});

Deno.test("cli: design_page stores the swamp-club-swamp-extensions definition as an HTML file", async () => {
  await withRepo(async (repo) => {
    const definition = parseYaml(
      await Deno.readTextFile(SWAMP_EXTENSIONS_DEFINITION),
    ) as Record<string, unknown>;
    await repo.factory("process", definition);
    const run = await repo.factoryMethod("process", "design_page");
    assert(
      run.output.includes(
        "design page for definition 'swamp-club-swamp-extensions' in 'process'",
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
    assert(page.content.includes("<h1>swamp-club-swamp-extensions</h1>"));
    assert(page.content.includes('id="stage-triage"'));
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

Deno.test("cli: start takes externalRefs as a JSON string through --input (#2640)", async () => {
  await withRepo(async (repo) => {
    await repo.factory("team", await buildDefinition());
    const key = await repo.newKey("team", "Integration work");
    const refs = {
      linear: "5b0e7a52-3f0c-4d8e-9a51-2c7d4a1e9b10",
      "linear.display": "GW-16",
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
      externalRefs: JSON.stringify({ "swamp-club": "2630" }),
    });
    const before = await repo.run(key);
    const refs = { "swamp-club": "2631", "swamp-club.display": "#2631" };
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
    assertEquals(moved.from, { "swamp-club": "2630" });
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

Deno.test("cli: a factory names its definition file; init copies a starter, then validate, design_page and start read it", async () => {
  await withRepo(async (repo) => {
    await repo.swamp([
      "model",
      "create",
      FACTORY_TYPE,
      "team",
      "--global-arg",
      "definition=factories/team.yaml",
      "--json",
    ]);
    const init = await repo.factoryMethod("team", "init", {
      inputs: { from: "build-swamp-extension" },
    });
    assert(
      init.output.includes(
        "wrote the 'build-swamp-extension' starter to factories/team.yaml",
      ),
      init.output,
    );
    assertEquals(
      await Deno.readTextFile(join(repo.dir, "factories/team.yaml")),
      await Deno.readTextFile(BUILD_DEFINITION),
    );
    const again = await repo.factoryMethod("team", "init", {
      inputs: { from: "minimal" },
      allowFailure: true,
    });
    assertNotEquals(again.code, 0);
    assert(
      again.output.includes("'factories/team.yaml' already exists"),
      again.output,
    );

    const valid = await repo.factoryMethod("team", "validate");
    assert(
      valid.output.includes(
        "definition 'build-swamp-extension' in factories/team.yaml is valid",
      ),
      valid.output,
    );
    const page = await repo.factoryMethod("team", "design_page");
    assert(
      page.output.includes(
        "design page for definition 'build-swamp-extension' in 'team'",
      ),
      page.output,
    );

    const key = await repo.newKey("team", "From a file");
    const start = await repo.workItem(key, "start", { factory: "team" });
    assert(start.output.includes("factories/team.yaml"), start.output);
    assertEquals(
      (await repo.run(key)).definition.digest,
      await digestOf(await buildDefinition()),
    );
  });
});

Deno.test("cli: a definition path outside the repo, through a symlink out, missing, or not YAML is refused, naming the path", async () => {
  await withRepo(async (repo) => {
    const outside = await Deno.makeTempDir({ prefix: "gatorwalk-outside-" });
    try {
      const text = await Deno.readTextFile(BUILD_DEFINITION);
      await Deno.writeTextFile(join(outside, "out.yaml"), text);
      await Deno.mkdir(join(repo.dir, "factories"), { recursive: true });
      await Deno.symlink(
        join(outside, "out.yaml"),
        join(repo.dir, "factories/link.yaml"),
      );
      await Deno.writeTextFile(join(repo.dir, "factories/team.json"), "{}");
      const cases: [string, string, string][] = [
        ["up", "../out.yaml", "'../out.yaml' is outside the repo"],
        [
          "linked",
          "factories/link.yaml",
          "'factories/link.yaml' resolves outside the repo",
        ],
        [
          "missing",
          "factories/missing.yaml",
          "'factories/missing.yaml' does not exist",
        ],
        [
          "json",
          "factories/team.json",
          "'factories/team.json' is not a YAML file",
        ],
      ];
      for (const [name, path, message] of cases) {
        await repo.swamp([
          "model",
          "create",
          FACTORY_TYPE,
          name,
          "--global-arg",
          `definition=${path}`,
          "--json",
        ]);
        const result = await repo.factoryMethod(name, "validate", {
          allowFailure: true,
        });
        assertNotEquals(result.code, 0, `${name}: ${result.output}`);
        assert(result.output.includes(message), `${name}: ${result.output}`);
      }
      // A regular file where a directory should be: refused with the path,
      // not the OS's raw "Not a directory".
      await Deno.writeTextFile(join(repo.dir, "plain"), "");
      await repo.swamp([
        "model",
        "create",
        FACTORY_TYPE,
        "under-file",
        "--global-arg",
        "definition=plain/new.yaml",
        "--json",
      ]);
      const underFile = await repo.factoryMethod("under-file", "init", {
        inputs: { from: "minimal" },
        allowFailure: true,
      });
      assertNotEquals(underFile.code, 0);
      assert(
        underFile.output.includes(
          "'plain/new.yaml' cannot be created: " +
            `${join(repo.dir, "plain")} is not a directory`,
        ),
        underFile.output,
      );
      const start = await repo.workItem(
        "missing-file-item",
        "start",
        { factory: "missing" },
        { allowFailure: true },
      );
      assert(
        start.output.includes("'factories/missing.yaml' does not exist"),
        start.output,
      );
    } finally {
      await Deno.remove(outside, { recursive: true });
    }
  });
});
