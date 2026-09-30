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

import type { GraphFinding, GraphReport } from "./graph.ts";
import {
  DEFAULT_MAX_CYCLES,
  DEFAULT_MAX_DISPATCHES,
  type GateSpec,
  type Lifecycle,
  type TransitionSpec,
} from "./lifecycle_schema.ts";

// ---------------------------------------------------------------------------
// The design page: a lifecycle as one static HTML page, for its author to
// read before a work item runs on it. designView derives what the page shows
// from the lifecycle and its graph report; renderDesignPage turns that into
// HTML. Both are pure and read no clock, so the same lifecycle always gives
// the same bytes.
//
// The stage graph is drawn by Mermaid, loaded from a CDN at one pinned
// version with a Subresource Integrity hash. Loops back and global
// transitions are layers the reader turns on; the page carries one diagram
// per combination, so Mermaid lays each one out afresh. The view is embedded as JSON, so
// the page's own script (and any later view of it) reads the graph rather
// than re-deriving it. Without the script, the Mermaid source shows as text
// and every table still renders. See DESIGN.md, "The design page".
// ---------------------------------------------------------------------------

/** The pinned Mermaid build. Bump the version and the hash together. */
export const MERMAID_VERSION = "11.17.2";
export const MERMAID_URL =
  `https://cdn.jsdelivr.net/npm/mermaid@${MERMAID_VERSION}/dist/mermaid.min.js`;
export const MERMAID_INTEGRITY =
  "sha384-EOXBFmc3gx5mb+vn0vPvvGqACToJD24hhacX5Yx+8NUUQrHIle/Qi5Bg9o3zKwW2";

/** The diagram node standing for every non-terminal stage. */
export const ANY_STAGE_NODE = "any";

export interface GateView {
  type: GateSpec["type"];
  /** The gate in words. */
  text: string;
  /** A person decides it. */
  human: boolean;
  /** For a human-approval gate with `when`: the condition it applies under. */
  when?: string;
  description?: string;
}

export interface TransitionView {
  name: string;
  /** Document path, as graph findings give it. */
  path: string;
  to: string;
  description?: string;
  manual: boolean;
  gates: GateView[];
  /** Taking it needs a person: manual, or an unconditional human approval. */
  humanStop: boolean;
  /** A human approval that applies only under a condition. */
  conditionalHumanStop: boolean;
  /** It closes a cycle (see loopPaths). Never a global transition. */
  loop: boolean;
}

export interface WorkView {
  mode: string;
  description?: string;
  skills: string[];
  /** The workflow, or model.method, a workflow or method stage calls. */
  call?: string;
  bindings: string[];
  inject: string[];
  resultEvidence?: string;
  systemPrompt?: string;
  command?: string;
  constraints?: string;
}

export interface ProductView {
  kind: "artifact" | "evidence";
  name: string;
  description?: string;
  /** For an artifact: kind findings, and what it reviews. */
  findings?: boolean;
  reviews?: string;
}

export interface StageView {
  id: string;
  /** The stage's node id in the Mermaid source. */
  node: string;
  description?: string;
  initial: boolean;
  terminal: boolean;
  maxCycles: number;
  maxDispatchesPerCycle: number;
  projectionStatus?: string;
  work?: WorkView;
  products: ProductView[];
  transitions: TransitionView[];
}

/** A drawn edge, by diagram node ids. */
export interface EdgeView {
  from: string;
  to: string;
  /** The transition's document path. */
  path: string;
  loop: boolean;
  global: boolean;
}

/** The diagrams: the forward flow, plus loops back, global transitions, or both. */
export const DIAGRAM_LAYERS = ["forward", "loops", "global", "all"] as const;
export type DiagramLayer = typeof DIAGRAM_LAYERS[number];

export interface FindingView extends GraphFinding {
  severity: "error" | "warning";
}

export interface DesignView {
  name: string;
  description?: string;
  digest: string;
  stages: StageView[];
  /** Transitions available from every non-terminal stage. */
  globalTransitions: TransitionView[];
  findings: FindingView[];
  truncated: boolean;
  edges: EdgeView[];
  /** The flowchart source for each combination of layers. */
  diagrams: Record<DiagramLayer, string>;
}

// --- the view ----------------------------------------------------------------

function quoted(names: string[]): string {
  return names.map((n) => `'${n}'`).join(", ");
}

export function describeGate(gate: GateSpec): GateView {
  const view = (text: string, human = false): GateView => {
    const result: GateView = { type: gate.type, text, human };
    if (gate.description !== undefined) result.description = gate.description;
    return result;
  };
  switch (gate.type) {
    case "artifact-exists":
      return view(`artifact '${gate.config.artifact}' is recorded`);
    case "artifact-fresh":
      return view(
        `artifact '${gate.config.artifact}' reviews the current version of ` +
          "its subject" +
          (gate.config.recordedThisCycle === true
            ? ", and was recorded this cycle"
            : ""),
      );
    case "findings-clear":
      return view(
        `artifact '${gate.config.artifact}' has no ${
          gate.config.blocking.join("/")
        } findings`,
      );
    case "findings-open":
      return view(
        `artifact '${gate.config.artifact}' has an open ${
          gate.config.blocking.join("/")
        } finding`,
      );
    case "human-approval": {
      const n = gate.config.minApprovals ?? 1;
      const result = view(
        `${n} human approval${n === 1 ? "" : "s"} ('${gate.config.id}')`,
        true,
      );
      if (gate.config.when !== undefined) result.when = gate.config.when;
      return result;
    }
    case "evidence-recorded": {
      const parts = [`evidence '${gate.config.name}' is recorded`];
      const fields = Object.keys(gate.config.requireField ?? {});
      if (fields.length > 0) parts.push(`with ${quoted(fields)} set`);
      const matched = Object.keys(gate.config.match ?? {});
      if (matched.length > 0) {
        parts.push(`with ${quoted(matched)} matching a schema`);
      }
      return view(parts.join(" "));
    }
    case "cooldown": {
      const after = gate.config.afterEvidence !== undefined
        ? `evidence '${gate.config.afterEvidence}'`
        : `artifact '${gate.config.afterArtifact}'`;
      return view(`${gate.config.seconds}s have passed since ${after}`);
    }
    case "max-cycles":
      return view(
        `stage '${gate.config.stage}' entered ${
          gate.config.invert === true ? "at least" : "fewer than"
        } ${gate.config.limit} time(s)`,
      );
    case "cel":
      return view(
        `cel: ${gate.config.expr}` +
          (gate.config.message !== undefined
            ? ` (${gate.config.message})`
            : ""),
      );
  }
}

function transitionView(t: TransitionSpec, path: string): TransitionView {
  const gates = (t.gates ?? []).map(describeGate);
  const manual = t.manual === true;
  const view: TransitionView = {
    name: t.name,
    path,
    to: t.to,
    manual,
    gates,
    humanStop: manual || gates.some((g) => g.human && g.when === undefined),
    conditionalHumanStop: gates.some((g) => g.human && g.when !== undefined),
    loop: false,
  };
  if (t.description !== undefined) view.description = t.description;
  return view;
}

/**
 * The document paths of transitions that close a cycle: a depth-first walk
 * along stage transitions (not global ones), from the initial stage and then
 * from any stage it never reached, in document order, meets their target on
 * its current path. Leaving them out leaves a graph with no cycles in which
 * every stage keeps the edge the walk entered it by.
 */
function loopPaths(lifecycle: Lifecycle): Set<string> {
  const index = new Map(lifecycle.stages.map((s, i) => [s.id, i]));
  const loops = new Set<string>();
  const done = new Set<number>();
  const onPath = new Set<number>();
  const walk = (i: number) => {
    onPath.add(i);
    (lifecycle.stages[i].transitions ?? []).forEach((t, k) => {
      const to = index.get(t.to);
      if (to === undefined) return;
      if (onPath.has(to)) loops.add(`stages.${i}.transitions.${k}`);
      else if (!done.has(to)) walk(to);
    });
    onPath.delete(i);
    done.add(i);
  };
  const initial = lifecycle.stages.findIndex((s) => s.initial === true);
  if (initial >= 0) walk(initial);
  lifecycle.stages.forEach((_, i) => {
    if (!done.has(i)) walk(i);
  });
  return loops;
}

/** Everything the page shows, derived from the lifecycle and its report. */
export function designView(
  lifecycle: Lifecycle,
  report: GraphReport,
  digest: string,
): DesignView {
  const nodes = new Map(lifecycle.stages.map((s, i) => [s.id, `s${i}`]));
  const loops = loopPaths(lifecycle);
  const stages = lifecycle.stages.map((s, i): StageView => {
    const view: StageView = {
      id: s.id,
      node: `s${i}`,
      initial: s.initial === true,
      terminal: s.terminal === true,
      maxCycles: s.maxCycles ?? DEFAULT_MAX_CYCLES,
      maxDispatchesPerCycle: s.maxDispatchesPerCycle ??
        DEFAULT_MAX_DISPATCHES,
      products: [
        ...(s.artifacts ?? []).map((a): ProductView => {
          const p: ProductView = { kind: "artifact", name: a.name };
          if (a.description !== undefined) p.description = a.description;
          if (a.kind === "findings") p.findings = true;
          if (a.reviews !== undefined) p.reviews = a.reviews;
          return p;
        }),
        ...(s.evidence ?? []).map((e): ProductView => {
          const p: ProductView = { kind: "evidence", name: e.name };
          if (e.description !== undefined) p.description = e.description;
          return p;
        }),
      ],
      transitions: (s.transitions ?? []).map((t, k) => {
        const view = transitionView(t, `stages.${i}.transitions.${k}`);
        view.loop = loops.has(view.path);
        return view;
      }),
    };
    if (s.description !== undefined) view.description = s.description;
    if (s.projection?.status !== undefined) {
      view.projectionStatus = s.projection.status;
    }
    if (s.work !== undefined) {
      const w = s.work;
      const work: WorkView = {
        mode: w.mode,
        skills: w.skills ?? [],
        bindings: Object.keys(w.bindings ?? {}),
        inject: w.context?.inject ?? [],
      };
      if (w.workflow !== undefined) work.call = w.workflow.name;
      if (w.method !== undefined) {
        work.call = `${w.method.modelIdOrName}.${w.method.methodName}`;
      }
      if (w.resultEvidence !== undefined) {
        work.resultEvidence = w.resultEvidence;
      }
      if (w.description !== undefined) work.description = w.description;
      if (w.systemPrompt !== undefined) work.systemPrompt = w.systemPrompt;
      if (w.command !== undefined) work.command = w.command;
      if (w.constraints !== undefined) work.constraints = w.constraints;
      view.work = work;
    }
    return view;
  });
  const globalTransitions = (lifecycle.globalTransitions ?? []).map((t, k) =>
    transitionView(t, `globalTransitions.${k}`)
  );
  const findings: FindingView[] = [
    ...report.errors.map((f): FindingView => ({ ...f, severity: "error" })),
    ...report.warnings.map((f): FindingView => ({ ...f, severity: "warning" })),
  ];
  const edges: EdgeView[] = [];
  const edge = (from: string, t: TransitionView, global: boolean) => {
    const to = nodes.get(t.to);
    if (to !== undefined) {
      edges.push({ from, to, path: t.path, loop: t.loop, global });
    }
  };
  for (const s of stages) for (const t of s.transitions) edge(s.node, t, false);
  for (const t of globalTransitions) edge(ANY_STAGE_NODE, t, true);
  const diagram = (loops: boolean, global: boolean) =>
    mermaidSource(stages, globalTransitions, findings, nodes, {
      loops,
      global,
    });
  const view: DesignView = {
    name: lifecycle.name,
    digest,
    stages,
    globalTransitions,
    findings,
    truncated: report.truncated,
    edges,
    diagrams: {
      forward: diagram(false, false),
      loops: diagram(true, false),
      global: diagram(false, true),
      all: diagram(true, true),
    },
  };
  if (lifecycle.description !== undefined) {
    view.description = lifecycle.description;
  }
  return view;
}

// --- the diagram ---------------------------------------------------------------

/**
 * Text inside a quoted Mermaid label. Stage ids and transition names are
 * already [a-z0-9_-], so this only guards the label syntax.
 */
export function mermaidLabel(text: string): string {
  return text.replaceAll("#", "#35;").replaceAll('"', "#quot;")
    .replaceAll("<", "#lt;").replaceAll(">", "#gt;");
}

function edgeLabel(t: TransitionView): string {
  const marks = [
    t.humanStop ? "human" : t.conditionalHumanStop ? "human?" : "",
    t.gates.length > 0 ? `${t.gates.length} gate(s)` : "",
  ].filter((m) => m !== "");
  return mermaidLabel(
    marks.length > 0 ? `${t.name} (${marks.join(", ")})` : t.name,
  );
}

function mermaidSource(
  stages: StageView[],
  allGlobals: TransitionView[],
  findings: FindingView[],
  nodes: Map<string, string>,
  show: { loops: boolean; global: boolean },
): string {
  const globals = show.global ? allGlobals : [];
  // A stage only a global transition enters is left out with the global
  // layer, rather than drawn with nothing joining it.
  const entered = new Set(
    stages.flatMap((s) => s.transitions.map((t) => t.to)),
  );
  const onlyGlobal = new Set(
    show.global
      ? []
      : allGlobals.map((t) => t.to).filter((to) => !entered.has(to)),
  );
  stages = stages.filter((s) => s.initial || !onlyGlobal.has(s.id));
  const lines = ["flowchart TD"];
  for (const s of stages) {
    const label = mermaidLabel(s.id);
    // Stadium for the entry, double circle for terminals, box otherwise.
    lines.push(
      s.initial
        ? `  ${s.node}(["${label}"])`
        : s.terminal
        ? `  ${s.node}((("${label}")))`
        : `  ${s.node}["${label}"]`,
    );
  }
  if (globals.length > 0) {
    lines.push(`  ${ANY_STAGE_NODE}{{"any non-terminal stage"}}`);
  }
  const edge = (from: string, arrow: string, t: TransitionView) => {
    const to = nodes.get(t.to);
    if (to !== undefined) {
      lines.push(`  ${from} ${arrow}|"${edgeLabel(t)}"| ${to}`);
    }
  };
  // A loop back is drawn thin and dotted, human stop or not, so the forward
  // flow stands out.
  for (const s of stages) {
    for (const t of s.transitions) {
      if (t.loop && !show.loops) continue;
      edge(s.node, t.loop ? "-.->" : t.humanStop ? "==>" : "-->", t);
    }
  }
  for (const t of globals) edge(ANY_STAGE_NODE, "-.->", t);
  lines.push(
    "  classDef initial stroke-width:3px",
    "  classDef terminal stroke-width:3px",
    "  classDef error stroke:#d33,stroke-width:3px",
    "  classDef warning stroke:#c80,stroke-dasharray:4 3",
  );
  const drawn = new Set(stages.map((s) => s.node));
  const initial = stages.filter((s) => s.initial).map((s) => s.node);
  const terminal = stages.filter((s) => s.terminal).map((s) => s.node);
  const flagged = (severity: FindingView["severity"]) => [
    ...new Set(
      findings.filter((f) => f.severity === severity && f.stage !== undefined)
        .map((f) => nodes.get(f.stage as string))
        .filter((n): n is string => n !== undefined && drawn.has(n)),
    ),
  ];
  const errors = flagged("error");
  const warnings = flagged("warning").filter((n) => !errors.includes(n));
  for (
    const [cls, list] of [
      ["initial", initial],
      ["terminal", terminal],
      ["warning", warnings],
      ["error", errors],
    ] as const
  ) {
    if (list.length > 0) lines.push(`  class ${list.join(",")} ${cls}`);
  }
  return lines.join("\n");
}

// --- the page ------------------------------------------------------------------

export function escapeHtml(text: string): string {
  return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll(
      "'",
      "&#39;",
    );
}

/** JSON that is safe inside a script element: no `<`, so no `</script>`. */
export function scriptJson(value: unknown): string {
  return JSON.stringify(value).replaceAll("<", "\\u003c")
    .replaceAll("\u2028", "\\u2028").replaceAll("\u2029", "\\u2029");
}

const e = escapeHtml;

function gatesHtml(t: TransitionView): string {
  if (t.gates.length === 0) return `<span class="muted">no gates</span>`;
  return `<ul class="gates">${
    t.gates.map((g) =>
      `<li class="gate${g.human ? " human" : ""}"><code>${e(g.type)}</code> ${
        e(g.text)
      }${
        g.when !== undefined
          ? ` <span class="when">only when <code>${e(g.when)}</code></span>`
          : ""
      }${
        g.description !== undefined
          ? `<div class="desc">${e(g.description)}</div>`
          : ""
      }</li>`
    ).join("")
  }</ul>`;
}

function transitionsHtml(list: TransitionView[], stageIds: Set<string>) {
  if (list.length === 0) return `<p class="muted">No transitions.</p>`;
  return `<table class="transitions"><thead><tr><th>Transition</th><th>To</th><th>Gates</th></tr></thead><tbody>${
    list.map((t) => {
      const stops = [
        t.manual ? `<span class="tag human">manual</span>` : "",
        t.humanStop && !t.manual
          ? `<span class="tag human">human stop</span>`
          : "",
        t.conditionalHumanStop
          ? `<span class="tag human-maybe">conditional human stop</span>`
          : "",
      ].join("");
      const to = stageIds.has(t.to)
        ? `<a href="#stage-${e(t.to)}">${e(t.to)}</a>`
        : e(t.to);
      return `<tr data-path="${e(t.path)}"><td><strong>${
        e(t.name)
      }</strong> ${stops}${
        t.description !== undefined
          ? `<div class="desc">${e(t.description)}</div>`
          : ""
      }</td><td>${to}</td><td>${gatesHtml(t)}</td></tr>`;
    }).join("")
  }</tbody></table>`;
}

function workHtml(w: WorkView): string {
  const rows: [string, string][] = [["Mode", `<code>${e(w.mode)}</code>`]];
  if (w.call !== undefined) rows.push(["Calls", `<code>${e(w.call)}</code>`]);
  if (w.skills.length > 0) {
    rows.push([
      "Skills",
      w.skills.map((s) => `<code>${e(s)}</code>`).join(" "),
    ]);
  }
  if (w.inject.length > 0) {
    rows.push([
      "Receives",
      w.inject.map((s) => `<code>${e(s)}</code>`).join(" "),
    ]);
  }
  if (w.bindings.length > 0) {
    rows.push([
      "Bindings",
      w.bindings.map((s) => `<code>${e(s)}</code>`).join(" "),
    ]);
  }
  if (w.resultEvidence !== undefined) {
    rows.push(["Result evidence", `<code>${e(w.resultEvidence)}</code>`]);
  }
  const texts = (
    [
      ["System prompt", w.systemPrompt],
      ["Command", w.command],
      ["Constraints", w.constraints],
    ] as const
  ).filter(([, v]) => v !== undefined).map(([k, v]) =>
    `<details><summary>${k}</summary><pre>${e(v as string)}</pre></details>`
  ).join("");
  const description = w.description !== undefined
    ? `<p class="desc">${e(w.description)}</p>`
    : "";
  return `${description}<table class="kv"><tbody>${
    rows.map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join("")
  }</tbody></table>${texts}`;
}

function productsHtml(products: ProductView[]): string {
  if (products.length === 0) return "";
  return `<ul class="products">${
    products.map((p) =>
      `<li><span class="tag">${p.kind}</span> <code>${e(p.name)}</code>${
        p.findings === true ? ` <span class="tag">findings</span>` : ""
      }${
        p.reviews !== undefined ? ` reviews <code>${e(p.reviews)}</code>` : ""
      }${
        p.description !== undefined
          ? ` <span class="desc">${e(p.description)}</span>`
          : ""
      }</li>`
    ).join("")
  }</ul>`;
}

function findingHtml(f: FindingView, index: number): string {
  const trace = f.trace !== undefined && f.trace.length > 0
    ? `<div class="trace">trace: ${
      f.trace.map((s) => `<code>${e(s)}</code>`).join(" → ")
    }</div>`
    : "";
  return `<li class="finding ${f.severity}" data-finding="${index}"${
    f.trace !== undefined && f.trace.length > 0 ? ` tabindex="0"` : ""
  }><span class="tag ${f.severity}">${f.severity}</span> <code>${
    e(f.code)
  }</code> <code class="path">${e(f.path)}</code>${
    f.stage !== undefined ? ` from <code>${e(f.stage)}</code>` : ""
  }<div>${e(f.message)}</div>${trace}</li>`;
}

function findingsHtml(view: DesignView): string {
  const errors = view.findings.filter((f) => f.severity === "error").length;
  const warnings = view.findings.length - errors;
  const truncated = view.truncated
    ? `<p class="finding error">The graph analysis stopped at its state cap, so these findings rest on a partial exploration and <code>validate</code> fails.</p>`
    : "";
  if (view.findings.length === 0) {
    return `${truncated}<p class="muted">The graph analysis found nothing.</p>`;
  }
  return `${truncated}<p>${errors} error(s), ${warnings} warning(s). ${
    errors > 0 ? "Errors fail <code>validate</code>. " : ""
  }Select a finding with a trace to follow it on the graph.</p><ol class="findings">${
    view.findings.map(findingHtml).join("")
  }</ol>`;
}

function stageHtml(s: StageView, view: DesignView, ids: Set<string>): string {
  const tags = [
    s.initial ? `<span class="tag">initial</span>` : "",
    s.terminal ? `<span class="tag">terminal</span>` : "",
    s.projectionStatus !== undefined
      ? `<span class="tag">status ${e(s.projectionStatus)}</span>`
      : "",
  ].join(" ");
  const own = view.findings.map((f, i) => [f, i] as const)
    .filter(([f]) => f.stage === s.id);
  return `<section class="stage" id="stage-${e(s.id)}"><h3>${
    e(s.id)
  } ${tags}</h3>${
    s.description !== undefined ? `<p>${e(s.description)}</p>` : ""
  }${
    s.terminal
      ? ""
      : `<p class="muted">At most ${s.maxCycles} entries and ${s.maxDispatchesPerCycle} dispatches per entry.</p>`
  }${
    s.work !== undefined
      ? `<h4>Handoff</h4>${workHtml(s.work)}`
      : s.terminal
      ? ""
      : `<p class="muted">No work declared.</p>`
  }${
    s.products.length > 0 ? `<h4>Produces</h4>${productsHtml(s.products)}` : ""
  }${
    s.terminal
      ? ""
      : `<h4>Transitions</h4>${transitionsHtml(s.transitions, ids)}`
  }${
    own.length > 0
      ? `<h4>Findings</h4><ol class="findings">${
        own.map(([f, i]) => findingHtml(f, i)).join("")
      }</ol>`
      : ""
  }</section>`;
}

const STYLE = `
:root{--bg:#fbfbfa;--fg:#1d1d1b;--muted:#6b6b66;--line:#dedcd6;--panel:#fff;--accent:#2563eb;--human:#7c3aed;--err:#c62828;--warn:#b26a00;color-scheme:light}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#161615;--fg:#ececea;--muted:#a3a39d;--line:#3a3a36;--panel:#1f1f1d;--accent:#7aa2ff;--human:#b69cff;--err:#ff6b6b;--warn:#f0b35a;color-scheme:dark}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif}
main{max-width:1100px;margin:0 auto;padding:24px 16px 64px}
h1{margin:0 0 4px;font-size:1.6rem}h2{margin-top:2.2rem;border-bottom:1px solid var(--line);padding-bottom:4px}
h3{margin:0 0 6px}h4{margin:14px 0 6px;font-size:.95rem;color:var(--muted)}
code{font:13px ui-monospace,SFMono-Regular,Menlo,monospace}
pre{white-space:pre-wrap;overflow-wrap:anywhere;background:var(--panel);border:1px solid var(--line);padding:8px;border-radius:6px}
.muted,.desc{color:var(--muted)}.meta{color:var(--muted);font-size:.9rem}
.tag{display:inline-block;font-size:.75rem;padding:0 6px;border:1px solid var(--line);border-radius:10px;color:var(--muted)}
.tag.human{border-color:var(--human);color:var(--human)}.tag.human-maybe{border-style:dashed;border-color:var(--human);color:var(--human)}
.tag.error{border-color:var(--err);color:var(--err)}.tag.warning{border-color:var(--warn);color:var(--warn)}
.summary{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.summary span{background:var(--panel);border:1px solid var(--line);border-radius:6px;padding:4px 10px}
#graph{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:12px;overflow-x:auto}
#graph svg{max-width:100%;height:auto}
#graph .node{cursor:pointer}
#graph .hl rect,#graph .hl polygon,#graph .hl circle,#graph .hl path{stroke:var(--accent)!important;stroke-width:4px!important}
#graph path.hl{stroke:var(--accent)!important;stroke-width:4px!important}
.layers{display:flex;flex-wrap:wrap;gap:16px;margin:0 0 8px}.layers[hidden]{display:none}.layers label{cursor:pointer}
.stage{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:12px 14px;margin:12px 0;scroll-margin-top:12px}
.stage:target{outline:2px solid var(--accent)}
table{border-collapse:collapse;width:100%}th,td{text-align:left;vertical-align:top;padding:6px 8px;border-top:1px solid var(--line)}
table.kv th{width:9rem;color:var(--muted);font-weight:500}
.transitions{display:block;overflow-x:auto}
ul.gates,ul.products{margin:0;padding-left:18px}li.gate.human{color:var(--human)}.when{color:var(--muted)}
ol.findings{padding-left:22px}li.finding{margin:8px 0}li.finding[tabindex]{cursor:pointer}li.finding.active{outline:2px solid var(--accent);outline-offset:4px;border-radius:4px}
.trace{color:var(--muted);font-size:.9rem}.path{color:var(--muted)}
p.finding.error{color:var(--err)}
`;

// The page's script: draw the diagram for the layers shown, send a click on a
// stage to its section, and walk a finding's trace across the graph one stage
// at a time, first turning on any layer the trace needs.
const SCRIPT = `
(() => {
  const view = JSON.parse(document.getElementById("design-data").textContent);
  const graph = document.getElementById("graph");
  const loops = document.getElementById("show-loops");
  const global = document.getElementById("show-global");
  if (typeof mermaid === "undefined") return;
  const dark = matchMedia("(prefers-color-scheme: dark)").matches;
  mermaid.initialize({ startOnLoad: false, securityLevel: "strict", theme: dark ? "dark" : "default" });
  const byNode = new Map(view.stages.map((s) => [s.node, s]));
  const byId = new Map(view.stages.map((s) => [s.id, s]));
  const nodeEls = (node) => [...graph.querySelectorAll("g.node")].filter((g) => new RegExp("(^|-)flowchart-" + node + "-\\\\d+$").test(g.id));
  const edgeEls = (a, b) => [...graph.querySelectorAll("path")].filter((p) => new RegExp("(^|-)L_" + a + "_" + b + "_\\\\d+$").test(p.id));
  let timers = [];
  let renders = 0;
  const clear = () => { timers.forEach(clearTimeout); timers = []; graph.querySelectorAll(".hl").forEach((el) => el.classList.remove("hl")); document.querySelectorAll("li.finding.active").forEach((el) => el.classList.remove("active")); };
  const draw = () => {
    clear();
    const layer = loops.checked ? (global.checked ? "all" : "loops") : (global.checked ? "global" : "forward");
    renders += 1;
    return mermaid.render("lifecycle-graph-" + renders, view.diagrams[layer]).then(({ svg }) => {
      graph.innerHTML = svg;
      graph.querySelectorAll("g.node").forEach((g) => {
        const m = /(?:^|-)flowchart-(s\\d+)-\\d+$/.exec(g.id);
        const stage = m && byNode.get(m[1]);
        if (stage) g.addEventListener("click", () => { location.hash = "stage-" + stage.id; });
      });
    }).catch((err) => {
      const note = document.createElement("p");
      note.className = "muted";
      note.textContent = "The diagram could not be drawn: " + err;
      graph.prepend(note);
    });
  };
  // The edges a step of a trace can take: a stage's own transitions, or a
  // global one from the any node.
  const stepEdges = (a, b) => view.edges.filter((e) => e.to === b && (e.from === a || e.global));
  const follow = async (li) => {
    const f = view.findings[Number(li.dataset.finding)];
    if (!f || !f.trace || f.trace.length === 0) return;
    const nodes = f.trace.map((id) => byId.get(id)).filter(Boolean).map((s) => s.node);
    const steps = nodes.slice(1).map((node, i) => stepEdges(nodes[i], node));
    // A step with no edge the current layers draw turns on a layer that has one.
    let redraw = false;
    for (const edges of steps) {
      const shown = edges.some((e) => (!e.loop || loops.checked) && (!e.global || global.checked));
      if (shown || edges.length === 0) continue;
      const turnOn = edges.find((e) => !e.global) ? loops : global;
      if (!turnOn.checked) { turnOn.checked = true; redraw = true; }
    }
    if (redraw) await draw();
    clear();
    li.classList.add("active");
    graph.scrollIntoView({ behavior: "smooth", block: "nearest" });
    nodes.forEach((node, i) => timers.push(setTimeout(() => {
      nodeEls(node).forEach((el) => el.classList.add("hl"));
      if (i > 0) steps[i - 1].forEach((e) => edgeEls(e.from, e.to).forEach((el) => el.classList.add("hl")));
    }, i * 350)));
  };
  document.querySelectorAll("li.finding[tabindex]").forEach((li) => {
    li.addEventListener("click", () => follow(li));
    li.addEventListener("keydown", (ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); follow(li); } });
  });
  loops.addEventListener("change", draw);
  global.addEventListener("change", draw);
  document.getElementById("layers").hidden = false;
  draw();
})();
`;

/** A layer's checkbox, off by first view; disabled when it has no edges. */
function layerToggle(id: string, label: string, count: number): string {
  return `<label><input type="checkbox" id="${id}"${
    count === 0 ? " disabled" : ""
  }> ${label} (${count})</label>`;
}

/** The design page for a view, as one HTML document. */
export function renderDesignPage(view: DesignView): string {
  const ids = new Set(view.stages.map((s) => s.id));
  const errors = view.findings.filter((f) => f.severity === "error").length;
  const humanStops = [
    ...view.stages.flatMap((s) => s.transitions),
    ...view.globalTransitions,
  ].filter((t) => t.humanStop || t.conditionalHumanStop).length;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="generator" content="@swamp/gatorwalk-factory design_page">
<title>${e(view.name)} lifecycle</title>
<style>${STYLE}</style>
</head>
<body>
<main>
<header>
<h1>${e(view.name)}</h1>
${view.description !== undefined ? `<p>${e(view.description)}</p>` : ""}
<p class="meta">lifecycle digest <code>${e(view.digest)}</code></p>
<div class="summary"><span>${view.stages.length} stages</span><span>${
    view.stages.reduce((n, s) => n + s.transitions.length, 0) +
    view.globalTransitions.length
  } transitions</span><span>${humanStops} human stop(s)</span><span>${errors} error(s)</span><span>${
    view.findings.length - errors
  } warning(s)</span></div>
</header>
<h2>Stage graph</h2>
<p class="muted">Thick arrows need a person. Dotted arrows lead back (a loop) or, from the "any non-terminal stage" node, are global transitions. Select a stage to jump to it.</p>
<div id="layers" class="layers" hidden>${
    layerToggle(
      "show-loops",
      "Loops back",
      view.edges.filter((x) => x.loop).length,
    )
  }${
    layerToggle(
      "show-global",
      "Global transitions",
      view.edges.filter((x) => x.global).length,
    )
  }</div>
<div id="graph"><pre class="mermaid-source">${e(view.diagrams.all)}</pre></div>
<h2>Graph findings</h2>
${findingsHtml(view)}
${
    view.globalTransitions.length > 0
      ? `<h2>Global transitions</h2><p class="muted">Available from every non-terminal stage.</p>${
        transitionsHtml(view.globalTransitions, ids)
      }`
      : ""
  }
<h2>Stages</h2>
${view.stages.map((s) => stageHtml(s, view, ids)).join("\n")}
</main>
<script type="application/json" id="design-data">${scriptJson(view)}</script>
<script src="${MERMAID_URL}" integrity="${MERMAID_INTEGRITY}" crossorigin="anonymous"></script>
<script>${SCRIPT}</script>
</body>
</html>
`;
}
