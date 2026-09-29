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

import { parse as parseCel } from "npm:@marcbachmann/cel-js@7.6.1";
import { jsonSafe } from "./canonical.ts";
import {
  analyzeLifecycle,
  formatFinding,
  productsMissingOnEntry,
} from "./graph.ts";
import {
  type GateSpec,
  type Lifecycle,
  NameSchema,
  parseLifecycle,
  type StageSpec,
  type StageTemplate,
  type TransitionSpec,
} from "./lifecycle_schema.ts";

// ---------------------------------------------------------------------------
// Apply: copy a stage template's stages into a lifecycle as ordinary stages,
// which the author then saves and edits freely. Nothing refers back to the
// stage template afterwards, so the runtime and the pinned lifecycle need
// nothing new.
//
// The author sketches the lifecycle with a bare placeholder stage where the
// stage template goes. Apply replaces it: transitions into the placeholder
// enter the stage template's initial stage, and each contract exit leaves to
// the stage the placeholder's transition of the same name targets (or `exits`
// names).
//
// Names are chosen at the use site, never derived by prefixing: `names` renames
// the stage template's stages, artifacts and evidence, and `inputs` maps each
// contract input to a product of the lifecycle. A clash is an error naming the
// entry to add, so two uses of one stage template are separate by the names the
// author gave them. Renames follow identity through every reference, including
// CEL, which is edited in place by source range. Approval gate ids need no
// rename: approvals are counted per stage (gates.ts). An approval's `when` is
// CEL, so it is renamed like a cel gate's expression.
//
// The composed lifecycle must pass the lifecycle schema and the graph
// analysis, and every contract input must be produced on every path into the
// stage template. See DESIGN.md, "Stage templates: apply only".
// ---------------------------------------------------------------------------

export interface ApplyNames {
  stages?: Record<string, string>;
  artifacts?: Record<string, string>;
  evidence?: Record<string, string>;
}

export interface ApplyOptions {
  /** The lifecycle's placeholder stage that the stage template replaces. */
  replace: string;
  /** Contract exit -> lifecycle stage; defaults to the placeholder's wiring. */
  exits?: Record<string, string>;
  /** Contract input -> the lifecycle's product; defaults to the same name. */
  inputs?: Record<string, string>;
  /** Renames of the stage template's own stages and products. */
  names?: ApplyNames;
}

export type ApplyResult =
  | { ok: true; lifecycle: Lifecycle; warnings: string[] }
  | { ok: false; errors: string[]; warnings: string[] };

/** What a placeholder stage may declare. */
const BARE_KEYS = new Set(["id", "description", "initial", "transitions"]);

const IDENTIFIER = /^[A-Za-z_][A-Za-z0-9_]*$/;

type Kind = "artifact" | "evidence";

export function applyStageTemplate(
  base: Lifecycle,
  template: StageTemplate,
  options: ApplyOptions,
): ApplyResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const fail = (): ApplyResult => ({ ok: false, errors, warnings });
  const from = `stage template '${template.name}'`;
  const into = `lifecycle '${base.name}'`;
  const replace = options.replace;

  const placeholderIndex = base.stages.findIndex((s) => s.id === replace);
  if (placeholderIndex === -1) {
    errors.push(`replace: ${into} has no stage '${replace}'`);
    return fail();
  }
  const placeholder = base.stages[placeholderIndex];

  // --- what the stage template declares --------------------------------------
  const contract = template.contract;
  const exitNames = contract.exits.map((e) => e.name);
  const inputPorts = contract.inputs ?? [];
  const inputArtifacts = new Set(
    inputPorts.filter((p) => p.kind === "artifact").map((p) => p.name),
  );
  const inputEvidence = new Set(
    inputPorts.filter((p) => p.kind === "evidence").map((p) => p.name),
  );
  const templateStageIds = template.stages.map((s) => s.id);
  const templateArtifacts = template.stages.flatMap((s) =>
    (s.artifacts ?? []).map((a) => a.name)
  );
  const templateEvidence = [
    ...new Set(template.stages.flatMap(evidenceDeclaredBy)),
  ];

  // --- the placeholder is bare, and its transitions sketch the exits --------
  const declared = Object.keys(placeholder).filter((k) => !BARE_KEYS.has(k));
  if (declared.length > 0) {
    errors.push(
      `replace: stage '${replace}' is not a bare placeholder (it declares ${
        declared.join(", ")
      }); a placeholder has only id, description, initial and transitions`,
    );
  }
  for (const t of placeholder.transitions ?? []) {
    if (!exitNames.includes(t.name)) {
      errors.push(
        `replace: transition '${t.name}' of placeholder stage '${replace}' ` +
          `matches no exit of ${from} (${exitNames.join(", ")})`,
      );
    }
    if ((t.gates ?? []).length > 0 || t.manual !== undefined) {
      errors.push(
        `replace: transition '${t.name}' of placeholder stage '${replace}' ` +
          "has gates or manual; a placeholder only names where each exit " +
          "goes, and the stage template's own transitions carry the gates",
      );
    }
  }

  // --- the options name only what the stage template has ---------------------
  const names = options.names ?? {};
  checkKeys(errors, "exits", options.exits, exitNames, `an exit of ${from}`);
  checkKeys(
    errors,
    "inputs",
    options.inputs,
    inputPorts.map((p) => p.name),
    `a contract input of ${from}`,
  );
  checkKeys(
    errors,
    "names.stages",
    names.stages,
    templateStageIds,
    `a stage of ${from}`,
  );
  checkKeys(
    errors,
    "names.artifacts",
    names.artifacts,
    templateArtifacts,
    `an artifact ${from} declares`,
  );
  checkKeys(
    errors,
    "names.evidence",
    names.evidence,
    templateEvidence,
    `evidence ${from} declares`,
  );

  const stageName = (id: string) => lookup(names.stages, id) ?? id;
  const artifactName = (name: string) =>
    inputArtifacts.has(name)
      ? lookup(options.inputs, name) ?? name
      : lookup(names.artifacts, name) ?? name;
  const evidenceName = (name: string) =>
    inputEvidence.has(name)
      ? lookup(options.inputs, name) ?? name
      : lookup(names.evidence, name) ?? name;
  const productName = (kind: Kind, name: string) =>
    kind === "artifact" ? artifactName(name) : evidenceName(name);
  const templateInitial = template.stages.find((s) => s.initial === true);
  if (templateInitial === undefined) {
    throw new Error(
      "the stage template has no initial stage (it was not parsed)",
    );
  }
  const entry = stageName(templateInitial.id);

  // --- clashes with the lifecycle's names ----------------------------------
  const baseStages = base.stages.filter((s) => s.id !== replace);
  const baseStageIds = new Set(baseStages.map((s) => s.id));
  const baseArtifacts = new Set(
    baseStages.flatMap((s) => (s.artifacts ?? []).map((a) => a.name)),
  );
  const baseEvidence = new Set(baseStages.flatMap(evidenceDeclaredBy));
  const clashes = (
    kind: string,
    key: string,
    own: string[],
    rename: (name: string) => string,
    taken: Set<string>,
    // A product also may not take a name the other kind has: a name is one
    // kind in a lifecycle.
    otherKind?: { kind: string; taken: Set<string> },
  ) => {
    const seen = new Map<string, string>();
    for (const name of own) {
      const as = rename(name);
      const called = as === name ? "" : ` (named '${as}')`;
      const hit = taken.has(as)
        ? kind
        : otherKind?.taken.has(as)
        ? otherKind.kind
        : undefined;
      if (hit !== undefined) {
        errors.push(
          `${kind} '${name}' of ${from}${called} clashes with ${hit} '${as}' ` +
            `of ${into}; name it with ${key}.${name}`,
        );
      }
      const other = seen.get(as);
      if (other !== undefined) {
        errors.push(
          `${kind}s '${other}' and '${name}' of ${from} are both named '${as}'`,
        );
      }
      seen.set(as, name);
    }
  };
  clashes("stage", "names.stages", templateStageIds, stageName, baseStageIds);
  clashes(
    "artifact",
    "names.artifacts",
    templateArtifacts,
    artifactName,
    baseArtifacts,
    { kind: "evidence", taken: baseEvidence },
  );
  clashes(
    "evidence",
    "names.evidence",
    templateEvidence,
    evidenceName,
    baseEvidence,
    { kind: "artifact", taken: baseArtifacts },
  );
  const templateEvidenceNames = new Set(templateEvidence.map(evidenceName));
  for (const name of templateArtifacts) {
    const as = artifactName(name);
    if (templateEvidenceNames.has(as)) {
      errors.push(
        `artifact '${name}' and evidence of ${from} are both named '${as}'; ` +
          `name one of them with names.artifacts.${name} or names.evidence`,
      );
    }
  }
  for (const port of inputPorts) {
    const as = productName(port.kind, port.name);
    const have = port.kind === "artifact" ? baseArtifacts : baseEvidence;
    if (!have.has(as)) {
      errors.push(
        `input ${port.kind} '${port.name}' of ${from} is '${as}' in ${into}, ` +
          `which no stage of it declares; map it with inputs.${port.name}`,
      );
    }
  }
  const globalNames = new Set(
    (base.globalTransitions ?? []).map((t) => t.name),
  );
  for (const stage of template.stages) {
    for (const t of stage.transitions ?? []) {
      if (globalNames.has(t.name)) {
        errors.push(
          `transition '${t.name}' of stage '${stage.id}' of ${from} has the ` +
            `same name as a global transition of ${into}`,
        );
      }
    }
  }

  // --- where each exit goes -------------------------------------------------
  const wiring = new Map<string, string>();
  for (const exit of exitNames) {
    const target = lookup(options.exits, exit) ??
      placeholder.transitions?.find((t) => t.name === exit)?.to;
    if (target === undefined) {
      errors.push(
        `exit '${exit}' of ${from} is not wired: add exits.${exit}, or a ` +
          `transition named '${exit}' on placeholder stage '${replace}'`,
      );
    } else if (target === replace) {
      // Back through the placeholder is back into the stage template.
      wiring.set(exit, entry);
    } else if (!baseStageIds.has(target)) {
      errors.push(
        `exit '${exit}' of ${from} goes to '${target}', which is not a stage of ${into}`,
      );
    } else {
      wiring.set(exit, target);
    }
  }

  // --- references to the placeholder that apply cannot carry over ------------
  const retarget = (t: TransitionSpec): TransitionSpec =>
    t.to === replace ? { ...t, to: entry } : t;
  const checkBase = (transitions: TransitionSpec[], where: string) =>
    transitions.forEach((t) =>
      (t.gates ?? []).forEach((gate) => {
        if (gate.type === "max-cycles" && gate.config.stage === replace) {
          errors.push(
            `${where}, transition '${t.name}': a max-cycles gate names ` +
              `placeholder stage '${replace}', which apply replaces; point it ` +
              "at one of the stage template's stages",
          );
        }
      })
    );
  for (const stage of baseStages) {
    checkBase(stage.transitions ?? [], `stage '${stage.id}' of ${into}`);
  }
  checkBase(base.globalTransitions ?? [], `global transitions of ${into}`);

  if (errors.length > 0) return fail();

  // --- the stage template's stages, renamed ----------------------------------
  const kindOf = (name: string): Kind =>
    templateArtifacts.includes(name) || inputArtifacts.has(name)
      ? "artifact"
      : "evidence";
  const renamedStages = new Map<string, string>(
    templateStageIds.filter((id) => stageName(id) !== id).map((id) => [
      id,
      stageName(id),
    ]),
  );
  // Products whose name changes, as a CEL string could still spell them in a
  // lookup apply cannot see (artifacts[k] with k compared to "name").
  const renamedProducts = new Map<string, string>();
  for (const name of [...templateArtifacts, ...inputArtifacts]) {
    if (artifactName(name) !== name) {
      renamedProducts.set(name, `artifact '${artifactName(name)}'`);
    }
  }
  for (const name of [...templateEvidence, ...inputEvidence]) {
    if (evidenceName(name) !== name) {
      renamedProducts.set(name, `evidence '${evidenceName(name)}'`);
    }
  }
  const cel = (expr: string, where: string) => {
    const rewritten = rewriteCel(expr, artifactName, evidenceName);
    for (const literal of new Set(rewritten.literals)) {
      const stageNow = renamedStages.get(literal);
      if (stageNow !== undefined) {
        warnings.push(
          `${where}: the CEL string "${literal}" matches a stage of ${from} ` +
            `that is now '${stageNow}'; apply cannot tell whether it names ` +
            "that stage, so it was left as it is",
        );
      }
      const productNow = renamedProducts.get(literal);
      if (productNow !== undefined) {
        warnings.push(
          `${where}: the CEL string "${literal}" matches a product of ${from} ` +
            `that is now ${productNow}; apply renames only fixed references ` +
            '(artifacts.x, artifacts["x"]), so it was left as it is',
        );
      }
    }
    return rewritten.expr;
  };
  const renameGate = (gate: GateSpec, where: string): GateSpec => {
    switch (gate.type) {
      case "artifact-exists":
      case "artifact-fresh":
      case "findings-clear":
        return {
          ...gate,
          config: {
            ...gate.config,
            artifact: artifactName(gate.config.artifact),
          },
        } as GateSpec;
      case "evidence-recorded":
        return {
          ...gate,
          config: { ...gate.config, name: evidenceName(gate.config.name) },
        };
      case "cooldown": {
        const config = { ...gate.config };
        if (config.afterEvidence !== undefined) {
          config.afterEvidence = evidenceName(config.afterEvidence);
        }
        if (config.afterArtifact !== undefined) {
          config.afterArtifact = artifactName(config.afterArtifact);
        }
        return { ...gate, config };
      }
      case "max-cycles":
        return {
          ...gate,
          config: { ...gate.config, stage: stageName(gate.config.stage) },
        };
      case "cel":
        return {
          ...gate,
          config: { ...gate.config, expr: cel(gate.config.expr, where) },
        };
      case "human-approval":
        return gate.config.when === undefined ? gate : {
          ...gate,
          config: { ...gate.config, when: cel(gate.config.when, where) },
        };
    }
  };
  const applied: StageSpec[] = template.stages.map((stage) => {
    const where = `stage '${stage.id}' of ${from}`;
    const out: StageSpec = structuredClone(stage);
    out.id = stageName(stage.id);
    if (stage.initial === true) {
      if (placeholder.initial === true) out.initial = true;
      else delete out.initial;
    }
    if (stage.artifacts !== undefined) {
      out.artifacts = stage.artifacts.map((a) => ({
        ...a,
        name: artifactName(a.name),
        ...(a.reviews !== undefined
          ? { reviews: artifactName(a.reviews) }
          : {}),
      }));
    }
    if (stage.evidence !== undefined) {
      out.evidence = stage.evidence.map((e) => ({
        ...e,
        name: evidenceName(e.name),
      }));
    }
    if (out.work !== undefined && stage.work !== undefined) {
      const work = stage.work;
      if (work.resultEvidence !== undefined) {
        out.work.resultEvidence = evidenceName(work.resultEvidence);
      }
      if (work.context?.inject !== undefined) {
        out.work.context = {
          ...work.context,
          inject: work.context.inject.map((n) => productName(kindOf(n), n)),
        };
      }
      if (work.bindings !== undefined) {
        out.work.bindings = Object.fromEntries(
          Object.entries(work.bindings).map(([name, expr]) => [
            name,
            cel(expr, `${where}, binding '${name}'`),
          ]),
        );
      }
    }
    if (stage.transitions !== undefined) {
      out.transitions = stage.transitions.map((t) => {
        const { exit, ...rest } = t;
        const renamed: TransitionSpec = {
          ...rest,
          to: exit !== undefined
            ? wiring.get(exit) as string
            : stageName(t.to as string),
        };
        if (t.gates !== undefined) {
          renamed.gates = t.gates.map((g) =>
            renameGate(g, `${where}, transition '${t.name}'`)
          );
        }
        return renamed;
      });
    }
    return out;
  });

  // --- the lifecycle around them --------------------------------------------
  const baseCel = (expr: string, where: string) => {
    if (rewriteCel(expr, (n) => n, (n) => n).literals.includes(replace)) {
      warnings.push(
        `${where}: the CEL string "${replace}" matches the placeholder stage, ` +
          `which is now the stage template's stages from '${entry}'`,
      );
    }
  };
  const around = (stage: StageSpec): StageSpec => {
    for (const [name, expr] of Object.entries(stage.work?.bindings ?? {})) {
      baseCel(expr, `stage '${stage.id}' of ${into}, binding '${name}'`);
    }
    const transitions = stage.transitions?.map(retarget);
    for (const t of stage.transitions ?? []) {
      for (const expr of gateCel(t.gates)) {
        baseCel(expr, `stage '${stage.id}' of ${into}, transition '${t.name}'`);
      }
    }
    return transitions === undefined ? stage : { ...stage, transitions };
  };
  for (const t of base.globalTransitions ?? []) {
    for (const expr of gateCel(t.gates)) {
      baseCel(expr, `global transition '${t.name}' of ${into}`);
    }
  }
  const composed: Lifecycle = {
    ...base,
    stages: [
      ...base.stages.slice(0, placeholderIndex).map(around),
      ...applied,
      ...base.stages.slice(placeholderIndex + 1).map(around),
    ],
    ...(base.globalTransitions !== undefined
      ? { globalTransitions: base.globalTransitions.map(retarget) }
      : {}),
  };

  // --- the composed lifecycle, checked --------------------------------------
  const origin = new Map<string, string>(
    composed.stages.map((s) => [
      s.id,
      applied.includes(s) ? `from ${from}` : `from ${into}`,
    ]),
  );
  const label = (line: string) => {
    const match = line.match(/^(stages\.(\d+)[^\s:]*)([\s\S]*)$/);
    const stage = match === null
      ? undefined
      : composed.stages[Number(match[2])]?.id;
    if (match === null || stage === undefined) return line;
    return `${match[1]} [stage '${stage}', ${origin.get(stage)}]${match[3]}`;
  };
  // Through JSON: the payload validator marks schemas it has compiled with a
  // non-enumerable key, which zod would copy into the result as a keyword.
  const parsed = parseLifecycle(jsonSafe(composed));
  if (!parsed.ok) {
    errors.push(...parsed.errors.map(label));
    return fail();
  }
  const graph = analyzeLifecycle(parsed.value);
  errors.push(...graph.errors.map((f) => label(formatFinding(f))));
  warnings.push(...graph.warnings.map((f) => label(formatFinding(f))));
  const missing = productsMissingOnEntry(
    parsed.value,
    entry,
    inputPorts.map((p) => ({
      kind: p.kind,
      name: productName(p.kind, p.name),
    })),
  );
  for (const m of missing.missing) {
    const port = inputPorts.find((p) =>
      p.kind === m.kind && productName(p.kind, p.name) === m.name
    );
    const as = port !== undefined && port.name !== m.name
      ? ` (as '${m.name}')`
      : "";
    errors.push(
      `input ${m.kind} '${port?.name ?? m.name}' of ${from}${as} is not ` +
        `produced on every path into stage '${entry}': ${m.trace.join(" -> ")}`,
    );
  }
  if (missing.truncated) {
    warnings.push(
      `the contract input check stopped early, so an input may be missing on a path into stage '${entry}'`,
    );
  }
  return errors.length > 0
    ? fail()
    : { ok: true, lifecycle: parsed.value, warnings };
}

/** A map's own entry: never an inherited property, so a name such as
 * `constructor` reads as absent. */
function lookup(
  map: Record<string, string> | undefined,
  key: string,
): string | undefined {
  return map !== undefined && Object.hasOwn(map, key) ? map[key] : undefined;
}

/** The CEL in a transition's gates: cel expressions and approvals' `when`. */
function gateCel(gates: GateSpec[] | undefined): string[] {
  return (gates ?? []).flatMap((gate) =>
    gate.type === "cel"
      ? [gate.config.expr]
      : gate.type === "human-approval" && gate.config.when !== undefined
      ? [gate.config.when]
      : []
  );
}

function evidenceDeclaredBy(stage: StageSpec): string[] {
  const own = (stage.evidence ?? []).map((e) => e.name);
  const result = stage.work?.resultEvidence;
  return result !== undefined && !own.includes(result) ? [...own, result] : own;
}

function checkKeys(
  errors: string[],
  option: string,
  map: Record<string, string> | undefined,
  allowed: string[],
  what: string,
): void {
  for (const [key, value] of Object.entries(map ?? {})) {
    if (!allowed.includes(key)) {
      errors.push(
        `${option}.${key}: '${key}' is not ${what} (${
          allowed.join(", ") || "none"
        })`,
      );
    }
    if (!NameSchema.safeParse(value).success) {
      errors.push(
        `${option}.${key}: '${value}' is not a valid name (lowercase ` +
          "alphanumeric with '-'/'_' separators, starting with a letter)",
      );
    }
  }
}

// --- CEL ----------------------------------------------------------------------

interface CelNode {
  op: string;
  args: unknown;
  range: { start: number; end: number };
}

function isCelNode(value: unknown): value is CelNode {
  return value !== null && typeof value === "object" && "op" in value &&
    "range" in value;
}

function kindNamed(key: unknown): Kind | undefined {
  return key === "artifacts"
    ? "artifact"
    : key === "evidence"
    ? "evidence"
    : undefined;
}

/**
 * Which product map a node is: `artifacts`, `evidence`, or the same under
 * `validations` (`.artifacts` or `["artifacts"]`). These names always mean
 * the context's: the lifecycle schema refuses a macro or cel.bind variable
 * that reuses one (CEL_VOCABULARY).
 */
function collectionOf(node: CelNode): Kind | undefined {
  if (node.op === "id") return kindNamed(node.args);
  if (node.op === "." || node.op === "[]") {
    const [inner, key] = node.args as [CelNode, unknown];
    if (inner.op !== "id" || inner.args !== "validations") return undefined;
    if (node.op === ".") return kindNamed(key);
    const index = key as CelNode;
    return index.op === "value" ? kindNamed(index.args) : undefined;
  }
  return undefined;
}

/**
 * Rename product references (`artifacts.x`, `artifacts["x"]`, `evidence.x`,
 * `validations.artifacts.x`, ...) by editing the source text at each node's
 * range, so everything else keeps its spelling. `has(artifacts.x)` renamed to
 * a name that is not an identifier becomes `("x-y" in artifacts)`. Also
 * returns every string literal, for the caller to judge.
 */
export function rewriteCel(
  expr: string,
  artifactName: (name: string) => string,
  evidenceName: (name: string) => string,
): { expr: string; literals: string[] } {
  const edits: { start: number; end: number; text: string }[] = [];
  const literals: string[] = [];
  const rename = (kind: Kind, name: string) =>
    kind === "artifact" ? artifactName(name) : evidenceName(name);
  const walk = (node: unknown): void => {
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (!isCelNode(node)) return;
    // has() takes only a field selection, so has(artifacts.x) cannot become
    // has(artifacts["x-y"]): CEL accepts that when it is checked and refuses
    // it when it runs. On a map, has(m.x) means "x" in m, which takes any
    // name.
    if (node.op === "call") {
      const [name, callArgs] = node.args as [string, unknown[]];
      const arg = callArgs[0];
      if (
        name === "has" && callArgs.length === 1 && isCelNode(arg) &&
        arg.op === "."
      ) {
        const [inner, key] = arg.args as [CelNode, string];
        const kind = collectionOf(inner);
        if (kind !== undefined) {
          const to = rename(kind, key);
          if (to !== key && !IDENTIFIER.test(to)) {
            edits.push({
              ...node.range,
              text: `(${JSON.stringify(to)} in ${
                expr.slice(inner.range.start, inner.range.end)
              })`,
            });
            return;
          }
        }
      }
    }
    if (node.op === "." || node.op === ".?") {
      const [inner, key] = node.args as [CelNode, string];
      const kind = collectionOf(inner);
      if (kind !== undefined) {
        const to = rename(kind, key);
        if (to !== key) {
          const optional = node.op === ".?";
          const access = IDENTIFIER.test(to)
            ? `${optional ? ".?" : "."}${to}`
            : `${optional ? "[?" : "["}${JSON.stringify(to)}]`;
          edits.push({
            ...node.range,
            text: expr.slice(inner.range.start, inner.range.end) + access,
          });
        }
        return;
      }
    }
    if (node.op === "[]" || node.op === "[?]") {
      const [inner, index] = node.args as [CelNode, CelNode];
      const kind = collectionOf(inner);
      if (
        kind !== undefined && index.op === "value" &&
        typeof index.args === "string"
      ) {
        const to = rename(kind, index.args);
        if (to !== index.args) {
          edits.push({ ...index.range, text: JSON.stringify(to) });
        }
        return;
      }
    }
    if (node.op === "value") {
      if (typeof node.args === "string") literals.push(node.args);
      return;
    }
    if (node.op === "id") return;
    walk(node.args);
  };
  walk(parseCel(expr).ast);
  let out = expr;
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    out = out.slice(0, edit.start) + edit.text + out.slice(edit.end);
  }
  return { expr: out, literals };
}
