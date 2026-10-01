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

// The page's model of one factory definition file: the engine's own schema
// check, graph analysis and design view, run in the browser on the file's
// text, plus where each document path sits in that text. Pure and DOM-free,
// so the tests run it on the real examples.

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

interface Base {
  /** The repo-relative path of the file. */
  file: string;
  text: string;
  /** Where any document path sits in the text. */
  rangeOf(path: string): SourceRange | null;
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
): (path: string) => SourceRange | null {
  const starts = lineStarts(text);
  return (path) => {
    const segments = pathSegments(path);
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

/**
 * Check, analyse and view a factory definition's text. The value is read
 * with @std/yaml, as the factory's own methods read the file, so the page
 * shows what validate would; the yaml package is used only for positions.
 */
export async function loadDefinition(
  file: string,
  text: string,
): Promise<Loaded> {
  const doc = parseDocument(text);
  const rangeOf = makeRangeOf(doc, text);
  const base: Base = { file, text, rangeOf };
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

  const parsed = DefinitionSchema.safeParse(raw);
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
  const view = designView(definition, report, await digestOf(definition));
  return {
    ...base,
    ok: true,
    definition,
    view,
    findings: view.findings.map((f) => ({ ...f, range: rangeOf(f.path) })),
  };
}
