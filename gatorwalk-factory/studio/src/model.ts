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

// The page's model of one factory's model definition file: the engine's own
// schema check, graph analysis and design view, run in the browser on the
// definition under globalArguments.definition, plus where each document path
// sits in the file's text, and the saved scenarios under
// globalArguments.scenarios. Document paths are the definition's own
// (stages.2); DEFINITION_PATH is the prefix that places them in the file.
// Pure and DOM-free, so the tests run it on the real examples.

import "./jitless.ts";
import { parse as parseYaml } from "@std/yaml";
import { type Document, isCollection, isNode, parseDocument } from "yaml";
import {
  DefinitionSchema,
  type FactoryDefinition,
} from "../../extensions/models/_lib/engine/definition_schema.ts";
import { analyzeDefinition } from "../../extensions/models/_lib/engine/graph.ts";
import {
  type DesignView,
  designView,
  type FindingView,
} from "../../extensions/models/_lib/engine/design_page.ts";
import { digestOf } from "../../extensions/models/_lib/engine/canonical.ts";

/** Where a factory's definition sits in its model definition file. */
export const DEFINITION_PATH = "globalArguments.definition";
/** Where a factory's saved scenarios sit in its model definition file. */
export const SCENARIOS_PATH = "globalArguments.scenarios";

/** Where a document path sits in the text: its first line, as offsets. */
export interface SourceRange {
  /** 0-based line. */
  line: number;
  /** Offsets into the text, on that line. */
  from: number;
  to: number;
  /** Where the whole node ends, for scoping the source view to it. */
  end: number;
}

/** A schema or YAML problem, which stops the analysis. */
export interface Problem {
  /** A document path (`stages.2.work`), or `(root)`. */
  path: string;
  message: string;
  range: SourceRange | null;
}

export interface Located extends FindingView {
  range: SourceRange | null;
}

/** A saved scenario as the file holds it, for reading. */
export interface SavedScenario {
  /** Its scenario name, or #<index> when it has none. */
  name: string;
  /** Its path in the file: globalArguments.scenarios.<index>. */
  path: string;
  /** Its text in the file, whole lines, as written. */
  text: string;
  /** The entry as @std/yaml reads it, as validate does; unchecked. */
  value: unknown;
}

interface Base {
  /** The model definition file, repo-relative when it is in the repo. */
  file: string;
  text: string;
  /** Where any of the definition's document paths sits in the text. */
  rangeOf(path: string): SourceRange | null;
  /** The saved scenarios, in file order; empty when there are none. */
  scenarios: SavedScenario[];
}

export type Loaded =
  | Base & { ok: false; problems: Problem[] }
  | Base & {
    ok: true;
    definition: FactoryDefinition;
    view: DesignView;
    findings: Located[];
  };

/** A path's segments; numeric ones are sequence indexes. */
export function pathSegments(path: string): (string | number)[] {
  if (path === "" || path === "(root)") return [];
  return path.split(".").map((s) => /^\d+$/.test(s) ? Number(s) : s);
}

function lineStarts(text: string): number[] {
  const starts = [0];
  for (let i = 0; i < text.length; i++) {
    if (text[i] === "\n") starts.push(i + 1);
  }
  return starts;
}

function lineOf(starts: number[], offset: number): number {
  let lo = 0, hi = starts.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (starts[mid] <= offset) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}

/**
 * A range for the node at `path`, else for its nearest parent that exists.
 * Only the node's first line is marked: a whole stage underlined says less
 * than its first line does.
 */
export function makeRangeOf(
  doc: Document,
  text: string,
  prefix = "",
): (path: string) => SourceRange | null {
  const starts = lineStarts(text);
  const base = pathSegments(prefix);
  return (path) => {
    const segments = [...base, ...pathSegments(path)];
    for (let n = segments.length; n >= 0; n--) {
      const node = n === 0
        ? doc.contents
        : doc.getIn(segments.slice(0, n), true);
      if (!isNode(node) || node.range === undefined || node.range === null) {
        continue;
      }
      const [from, valueEnd, end] = node.range;
      const line = lineOf(starts, from);
      const lineEnd = (starts[line + 1] ?? text.length + 1) - 1;
      const stop = isCollection(node)
        ? lineEnd
        : Math.min(Math.max(valueEnd, from + 1), lineEnd);
      return {
        line,
        from,
        to: Math.max(stop, from + 1),
        end: Math.max(end, stop),
      };
    }
    return null;
  };
}

function message(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

/** The saved scenarios in a model definition file, each with its text. */
function savedScenarios(
  doc: Document,
  raw: unknown,
  text: string,
): SavedScenario[] {
  const list = (raw as { globalArguments?: { scenarios?: unknown } } | null)
    ?.globalArguments?.scenarios;
  if (!Array.isArray(list)) return [];
  const starts = lineStarts(text);
  return list.map((item, i) => {
    const named = (item as { scenario?: unknown } | null)?.scenario;
    const path = `${SCENARIOS_PATH}.${i}`;
    const node = doc.getIn(pathSegments(path), true);
    let slice = "";
    if (isNode(node) && node.range) {
      // From the start of its first line, so the text keeps its indentation.
      const from = starts[lineOf(starts, node.range[0])];
      slice = text.slice(from, node.range[2]).trimEnd();
    }
    return {
      name: typeof named === "string" ? named : `#${i}`,
      path,
      text: slice,
      value: item,
    };
  });
}

/**
 * Check, analyse and view the definition in a factory's model definition
 * file. The value is read with @std/yaml, as swamp reads the file, so the page
 * shows what validate would; the yaml package is used only for positions.
 */
export async function loadDefinition(
  file: string,
  text: string,
): Promise<Loaded> {
  const doc = parseDocument(text);
  const rangeOf = makeRangeOf(doc, text, DEFINITION_PATH);
  const base: Base = { file, text, rangeOf, scenarios: [] };
  const fail = (problems: Problem[]): Loaded => ({
    ...base,
    ok: false,
    problems,
  });

  let raw: unknown;
  try {
    raw = parseYaml(text);
  } catch (e) {
    const pos = doc.errors[0]?.pos;
    const starts = lineStarts(text);
    const at = pos?.[0] ?? 0;
    const line = lineOf(starts, at);
    return fail([{
      path: "(root)",
      message: `not valid YAML: ${message(e).split("\n")[0]}`,
      range: pos === undefined
        ? null
        : { line, from: at, to: Math.max(pos[1], at + 1), end: pos[1] },
    }]);
  }
  if (raw === null || raw === undefined) {
    return fail([{
      path: "(root)",
      message: "the file is empty",
      range: null,
    }]);
  }
  base.scenarios = savedScenarios(doc, raw, text);
  const held = (raw as { globalArguments?: { definition?: unknown } })
    .globalArguments?.definition;
  if (held === undefined || held === null) {
    return fail([{
      path: "(root)",
      message: `no definition yet: write one under ${DEFINITION_PATH}`,
      range: null,
    }]);
  }

  const parsed = DefinitionSchema.safeParse(held);
  if (!parsed.success) {
    return fail(parsed.error.issues.map((issue) => {
      const path = issue.path.length > 0
        ? issue.path.map(String).join(".")
        : "(root)";
      return { path, message: issue.message, range: rangeOf(path) };
    }));
  }

  const definition = parsed.data;
  const report = analyzeDefinition(definition);
  // The factory's name is its model's: the definition has none of its own.
  const factory = (raw as { name?: unknown }).name;
  const view = designView(
    typeof factory === "string" ? factory : "",
    definition,
    report,
    await digestOf(definition),
  );
  return {
    ...base,
    ok: true,
    definition,
    view,
    findings: view.findings.map((f) => ({ ...f, range: rangeOf(f.path) })),
  };
}
