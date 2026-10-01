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

import { assert, assertEquals, assertFalse } from "@std/assert";
import { parse as parseYaml } from "@std/yaml";
import { digestOf } from "./canonical.ts";
import {
  ANY_STAGE_NODE,
  describeGate,
  type DesignView,
  designView,
  DIAGRAM_LAYERS,
  MERMAID_INTEGRITY,
  MERMAID_URL,
  renderDesignPage,
} from "./design_page.ts";
import { parseExample } from "./fake_swamp.ts";
import { analyzeDefinition } from "./graph.ts";
import {
  type FactoryDefinition,
  parseDefinition,
} from "./definition_schema.ts";

async function render(
  definition: FactoryDefinition,
): Promise<{ view: DesignView; html: string }> {
  const view = designView(
    "team",
    definition,
    analyzeDefinition(definition),
    await digestOf(definition),
  );
  return { view, html: renderDesignPage(view) };
}

function fromRaw(raw: unknown): FactoryDefinition {
  const result = parseDefinition(raw);
  if (!result.ok) throw new Error(result.errors.join("\n"));
  return result.value;
}

function definition(yaml: string): FactoryDefinition {
  return fromRaw(parseYaml(yaml));
}

/** A skill example's definition block. */
function example(text: string): FactoryDefinition {
  return fromRaw(parseExample(text).definition);
}

/** The view the page embeds, read back the way its script reads it. */
function embedded(html: string): DesignView {
  const match = html.match(
    /<script type="application\/json" id="design-data">(.*?)<\/script>/s,
  );
  assert(match !== null, "the page embeds its view");
  return JSON.parse(match[1]) as DesignView;
}

/** The node ids the Mermaid source declares. */
function declaredNodes(mermaid: string): Set<string> {
  return new Set(
    [...mermaid.matchAll(/^ {2}([a-z0-9]+)(?:\(|\[|\{)/gm)].map((m) => m[1]),
  );
}

/** The edges the Mermaid source draws, as `from to` pairs. */
function drawnEdges(mermaid: string): Set<string> {
  return new Set(
    [...mermaid.matchAll(/^ {2}([a-z0-9]+) \S+\|"[^"]*"\| ([a-z0-9]+)$/gm)]
      .map((m) => `${m[1]} ${m[2]}`),
  );
}

/**
 * The trace the page walks names stages the diagram draws, and every step has
 * an edge in the view that the full diagram draws, so the highlighter has
 * something to find once the layer it needs is on.
 */
function assertTracesDrawn(view: DesignView, read: DesignView): void {
  const nodes = declaredNodes(view.diagrams.all);
  const edges = drawnEdges(view.diagrams.all);
  for (const f of read.findings) {
    const trace = (f.trace ?? []).map((id) =>
      view.stages.find((s) => s.id === id)?.node
    );
    for (const [i, node] of trace.entries()) {
      assert(node !== undefined && nodes.has(node), `${f.code}: ${node}`);
      if (i === 0) continue;
      const steps = view.edges.filter((x) =>
        x.to === node && (x.from === trace[i - 1] || x.global)
      );
      assert(steps.length > 0, `${f.code}: a step into ${node}`);
      for (const x of steps) assert(edges.has(`${x.from} ${x.to}`), f.code);
    }
  }
}

const SHIPPED = [
  new URL(
    "../../../../.claude/skills/gatorwalk-factory/references/examples/",
    import.meta.url,
  ),
  new URL("../../../../testdata/factories/", import.meta.url),
];

async function shippedDefinitions(): Promise<[string, FactoryDefinition][]> {
  const found: [string, FactoryDefinition][] = [];
  for (const dir of SHIPPED) {
    for await (const entry of Deno.readDir(dir)) {
      if (!entry.name.endsWith(".yaml")) continue;
      const text = await Deno.readTextFile(new URL(entry.name, dir));
      found.push([
        entry.name,
        dir === SHIPPED[0] ? example(text) : definition(text),
      ]);
    }
  }
  return found.sort(([a], [b]) => a.localeCompare(b));
}

Deno.test("design page: every shipped definition renders its stages, transitions, gates and human stops", async () => {
  const definitions = await shippedDefinitions();
  assert(definitions.length >= 7, `found ${definitions.length}`);
  for (const [file, lc] of definitions) {
    const { view, html } = await render(lc);
    const nodes = declaredNodes(view.diagrams.all);
    const edges = drawnEdges(view.diagrams.all);
    assert(html.includes(`<script src="${MERMAID_URL}"`), file);
    assert(html.includes(`integrity="${MERMAID_INTEGRITY}"`), file);
    assertEquals(embedded(html), view, file);
    for (const stage of view.stages) {
      assert(nodes.has(stage.node), `${file}: node for ${stage.id}`);
      assert(html.includes(`id="stage-${stage.id}"`), `${file}: ${stage.id}`);
      for (const t of stage.transitions) {
        const to = view.stages.find((s) => s.id === t.to);
        assert(to !== undefined, `${file}: ${t.path} targets a stage`);
        assert(edges.has(`${stage.node} ${to.node}`), `${file}: ${t.path}`);
        assert(html.includes(`data-path="${t.path}"`), `${file}: ${t.path}`);
        for (const gate of t.gates) {
          assert(html.includes(`<code>${gate.type}</code>`), file);
        }
      }
    }
    for (const t of view.globalTransitions) {
      const to = view.stages.find((s) => s.id === t.to);
      assert(edges.has(`${ANY_STAGE_NODE} ${to?.node}`), `${file}: ${t.path}`);
    }
    // Every manual transition and human-approval gate is a human stop.
    lc.stages.forEach((s, i) =>
      (s.transitions ?? []).forEach((t, k) => {
        const shown = view.stages[i].transitions[k];
        const humans = (t.gates ?? []).filter((g) =>
          g.type === "human-approval"
        );
        if (t.manual === true) {
          assert(shown.humanStop, `${file}: ${shown.path} manual`);
        }
        for (const g of humans) {
          assert(
            g.config.when === undefined
              ? shown.humanStop
              : shown.conditionalHumanStop,
            `${file}: ${shown.path} human-approval`,
          );
        }
        if (t.manual !== true && humans.length === 0) {
          assertFalse(shown.humanStop || shown.conditionalHumanStop, file);
        }
      })
    );
  }
});

Deno.test("design page: findings-clear and findings-open read as opposites", () => {
  const config = {
    artifact: "plan-review",
    blocking: ["critical", "high"] as ("critical" | "high")[],
  };
  assertEquals(
    describeGate({ type: "findings-clear", config }).text,
    "artifact 'plan-review' has no critical/high findings",
  );
  assertEquals(
    describeGate({ type: "findings-open", config }).text,
    "artifact 'plan-review' has an open critical/high finding",
  );
});

Deno.test("design page: the swamp-club-swamp-extensions definition shows its handoffs", async () => {
  const text = await Deno.readTextFile(
    new URL("swamp-club-swamp-extensions.yaml", SHIPPED[0]),
  );
  const lc = example(text);
  const { view, html } = await render(lc);
  const worked = lc.stages.filter((s) => s.work !== undefined);
  assert(worked.length > 0);
  for (const s of worked) {
    const shown = view.stages.find((v) => v.id === s.id)?.work;
    assertEquals(shown?.mode, s.work?.mode);
    assertEquals(shown?.inject, s.work?.context?.inject ?? []);
    assertEquals(shown?.bindings, Object.keys(s.work?.bindings ?? {}));
  }
  assert(html.includes("<h4>Handoff</h4>"));
});

Deno.test("design page: gate and work descriptions are shown", async () => {
  const { view, html } = await render(definition(`
schemaVersion: 1
stages:
  - id: plan
    initial: true
    work:
      mode: interactive
      description: The plan names every file it touches.
    transitions:
      - name: approved
        to: done
        gates:
          - type: human-approval
            description: A person reads the plan before any code is written.
            config: { id: plan-approval }
          - type: cel
            config: { expr: "true" }
  - id: done
    terminal: true
`));
  assertEquals(
    view.stages[0].work?.description,
    "The plan names every file it touches.",
  );
  const [approval, cel] = view.stages[0].transitions[0].gates;
  assertEquals(
    approval.description,
    "A person reads the plan before any code is written.",
  );
  assertFalse("description" in cel);
  assert(html.includes(
    `<p class="desc">The plan names every file it touches.</p><table class="kv">`,
  ));
  assert(html.includes(
    `<div class="desc">A person reads the plan before any code is written.</div></li>`,
  ));
  assertEquals(embedded(html), view);
});

Deno.test("design page: evidence a person records is marked so", async () => {
  const { view, html } = await render(definition(`
schemaVersion: 1
stages:
  - id: review
    initial: true
    evidence:
      - name: feedback
        recordedBy: person
        schema: { type: object }
      - name: checks
        schema: { type: object }
    transitions: [{ name: done, to: done }]
  - id: done
    terminal: true
`));
  assertEquals(view.stages[0].products, [
    { kind: "evidence", name: "feedback", recordedBy: "person" },
    { kind: "evidence", name: "checks" },
  ]);
  assert(html.includes(
    `<code>feedback</code> <span class="tag">recorded by a person</span>`,
  ));
  assertFalse(
    html.includes(
      `<code>checks</code> <span class="tag">recorded by a person</span>`,
    ),
  );
});

const FLAWED = `
schemaVersion: 1
description: A definition with design errors.
stages:
  - id: plan
    initial: true
    transitions:
      - name: go
        to: build
      - name: skip
        to: stuck
  - id: build
    transitions:
      - name: ship
        to: done
        manual: true
      - name: ask
        to: done
        gates:
          - type: human-approval
            config: { id: risky, when: "item.risk == 'high'" }
  - id: stuck
    transitions:
      - name: retry
        to: stuck
        description: goes back
  - id: orphan
    transitions:
      - name: finish
        to: done
  - id: done
    terminal: true
`;

Deno.test("design page: a definition with graph findings shows each one with its trace", async () => {
  const { view, html } = await render(definition(FLAWED));
  assertEquals(
    view.findings.map((f) => `${f.severity} ${f.code} ${f.path}`),
    [
      "error dead-end stages.2",
      "error unreachable-stage stages.3",
      "warning ambiguous-exit stages.0.transitions.0",
      "warning default-cycle-bound stages.2",
    ],
  );
  const deadEnd = view.findings[0];
  assertEquals(deadEnd.trace, ["plan", "stuck"]);
  assert(
    html.includes("trace: <code>plan</code> → <code>stuck</code>"),
    "the trace is listed",
  );
  assert(html.includes("2 error(s), 2 warning(s)"));
  assertTracesDrawn(view, embedded(html));
  // Stages with findings are marked on the diagram; an error outranks a
  // warning on the same stage.
  assert(view.diagrams.all.includes("  class s2,s3 error"), view.diagrams.all);
  assert(view.diagrams.all.includes("  class s0 warning"), view.diagrams.all);
  // A manual transition is a human stop; a human approval under `when` is a
  // conditional one, drawn as an ordinary arrow.
  // stuck's retry closes a cycle, so it waits for the loops layer.
  assert(view.stages[2].transitions[0].loop);
  assertFalse(view.diagrams.forward.includes("s2 -.->"));
  assert(view.diagrams.loops.includes(`s2 -.->|"retry"| s2`));
  const [ship, ask] = view.stages[1].transitions;
  assert(ship.humanStop && !ship.conditionalHumanStop);
  assert(!ask.humanStop && ask.conditionalHumanStop);
  assert(view.diagrams.all.includes(`s1 ==>|"ship (human)"| s4`));
  assert(view.diagrams.all.includes(`s1 -->|"ask (human?, 1 gate(s))"| s4`));
  assert(html.includes("only when <code>item.risk == &#39;high&#39;</code>"));
});

Deno.test("design page: a truncated analysis says so", async () => {
  const lc = definition(FLAWED);
  const view = designView(
    "team",
    lc,
    analyzeDefinition(lc, { maxStates: 1 }),
    await digestOf(lc),
  );
  assert(view.truncated);
  assert(renderDesignPage(view).includes("stopped at its state cap"));
});

Deno.test("design page: loops back and global transitions are layers, both off at first", async () => {
  for (const [file, lc] of await shippedDefinitions()) {
    const { view, html } = await render(lc);
    const forward = drawnEdges(view.diagrams.forward);
    const loops = drawnEdges(view.diagrams.loops);
    const global = drawnEdges(view.diagrams.global);
    const all = drawnEdges(view.diagrams.all);
    for (const x of view.edges) {
      const pair = `${x.from} ${x.to}`;
      assert(all.has(pair), `${file}: ${x.path} in all`);
      if (!x.loop && !x.global) assert(forward.has(pair), `${file}: ${x.path}`);
      if (x.loop) assert(loops.has(pair), `${file}: ${x.path} in loops`);
      if (x.global) assert(global.has(pair), `${file}: ${x.path} in global`);
    }
    // Hiding a layer never strands a stage: every stage the forward flow
    // reaches keeps an edge into it.
    const forwardNodes = declaredNodes(view.diagrams.forward);
    assertFalse(forwardNodes.has(ANY_STAGE_NODE), file);
    const entered = new Set([...forward].map((pair) => pair.split(" ")[1]));
    for (const s of view.stages) {
      const reached = view.edges.some((x) => x.to === s.node && !x.global);
      if (!s.initial && reached) {
        assert(entered.has(s.node), `${file}: ${s.id}`);
      }
    }
    for (const x of view.edges.filter((x) => x.loop || x.global)) {
      assertFalse(
        forward.has(`${x.from} ${x.to}`) &&
          !view.edges.some((y) =>
            y.from === x.from && y.to === x.to && !y.loop && !y.global
          ),
        `${file}: ${x.path} is not in the forward diagram`,
      );
    }
    assert(html.includes('<input type="checkbox" id="show-loops"'), file);
    assertFalse(/id="show-(loops|global)"[^>]* checked/.test(html), file);
    assertTracesDrawn(view, embedded(html));
  }
});

Deno.test("design page: swamp-club-swamp-extensions draws its forward flow first", async () => {
  const lc = example(
    await Deno.readTextFile(
      new URL("swamp-club-swamp-extensions.yaml", SHIPPED[0]),
    ),
  );
  const { view } = await render(lc);
  const loopNames = view.stages.flatMap((s) =>
    s.transitions.filter((t) => t.loop).map((t) => `${s.id}.${t.name}`)
  );
  assertEquals(loopNames, [
    "reproduce.reclassify",
    "plan-review.rework",
    "plan-review.revise",
    "conformance-review.rework",
    "verify.failed",
    "verify.revise",
    "attest.revise",
    "merge.new-pr",
    "merge.rework",
  ]);
  // recheck skips conformance review; it goes forward, not back.
  const implement = view.stages.find((s) => s.id === "implement");
  assertFalse(implement?.transitions.find((t) => t.name === "recheck")?.loop);
  // abandoned is entered only by the global abandon, so it waits for that
  // layer.
  const abandoned = view.stages.find((s) => s.id === "abandoned")?.node;
  assertFalse(declaredNodes(view.diagrams.forward).has(abandoned ?? ""));
  assert(declaredNodes(view.diagrams.global).has(abandoned ?? ""));
});

const HOSTILE = `
schemaVersion: 1
description: "</script><script>alert(1)</script> & \\"quotes\\" 'single'"
stages:
  - id: plan
    initial: true
    description: "a]\\"|b[#x] --> c((d)) <b>bold</b>"
    work:
      mode: dispatch
      description: "<iframe src=x></iframe>"
      systemPrompt: "Close with </script><!-- and \\u2028 here"
      command: "echo \\"$HOME\\" | tee <out>"
    artifacts:
      - name: plan
        description: "<img src=x onerror=alert(1)>"
        schema: { type: object }
    transitions:
      - name: done
        to: done
        description: "</td></table><script>alert(2)</script>"
        gates:
          - type: cel
            description: "<svg onload=alert(3)>"
            config:
              expr: "item.title != '<script>'"
              message: "</script>"
  - id: done
    terminal: true
`;

Deno.test("design page: definition text is escaped in the HTML, the diagram and the embedded view", async () => {
  const { view, html } = await render(definition(HOSTILE));
  // Exactly the page's own three script elements and no injected tags.
  assertEquals(html.match(/<script\b/g)?.length, 3);
  assertEquals(html.match(/<\/script>/g)?.length, 3);
  assertFalse(html.includes("<img"));
  assertFalse(html.includes("<b>bold"));
  assertFalse(html.includes("</td></table>"));
  assertFalse(html.includes("<!--"));
  assertFalse(html.includes("<iframe"));
  assertFalse(html.includes("<svg onload"));
  assert(html.includes("&lt;/script&gt;&lt;script&gt;alert(1)"));
  // The embedded view reads back whole, text included.
  const read = embedded(html);
  assertEquals(read, view);
  assertEquals(read.description, view.description);
  assertEquals(
    read.stages[0].work?.systemPrompt,
    "Close with </script><!-- and   here",
  );
  // Descriptions never reach the diagram; its labels are names, so only the
  // fixed label syntax appears.
  for (const layer of DIAGRAM_LAYERS) {
    assertFalse(view.diagrams[layer].includes("script"));
    assertFalse(view.diagrams[layer].includes("bold"));
    assertFalse(view.diagrams[layer].includes("iframe"));
    assertFalse(view.diagrams[layer].includes("onload"));
  }
});

Deno.test("design page: the same definition renders the same bytes", async () => {
  const lc = definition(FLAWED);
  const first = await render(lc);
  const second = await render(structuredClone(lc));
  assertEquals(first.html, second.html);
});
