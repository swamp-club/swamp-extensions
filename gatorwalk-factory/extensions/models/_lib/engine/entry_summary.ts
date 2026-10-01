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

import { IDENTIFIER_PATTERN } from "./template.ts";

// ---------------------------------------------------------------------------
// Tracker entry summaries (DESIGN.md, "The publisher"): prompt templates
// (template.ts) plus what issue-lifecycle computes for its entries, from the
// event rather than the payload. A fixed set, not CEL: a summary is one line
// of history, and every name in it is checked when the factory definition is
// saved.
//
// - `{{field}}`: a top-level field of the recorded product's payload.
// - `{{$cycle}}`: the stage cycle the event happened in; on a stage that is
//   re-entered for each try, the attempt.
// - `{{$version}}`: the recorded product's version.
// - `{{$version.<product>}}`: a product's version as of the event; for an
//   approval, the version the person approved.
// - `{{$input.<name>}}`: a resolved binding or input of the dispatch.
// - `{{count <field>}}`, `{{count <field> <key>=<value>}}`: how many items an
//   array field of the payload holds, or how many of them have `key` equal to
//   the value (`true`, `false` and numbers are read as such, anything else as
//   text).
//
// Any other `{{$...}}` or `{{count ...}}` is an error rather than literal
// text; `\{{` still writes a literal `{{`. Everything else template.ts treats
// as literal (`{{ .Values.x }}`, `{{{raw}}}`) is literal here too.
// ---------------------------------------------------------------------------

/** A value a count compares against. */
export type CountValue = string | number | boolean;

export type SummaryPart =
  | { kind: "text"; text: string }
  | { kind: "field"; name: string }
  | { kind: "cycle" }
  | { kind: "version"; product?: string }
  | { kind: "input"; name: string }
  | {
    kind: "count";
    field: string;
    where?: { key: string; value: CountValue };
  };

export interface ParsedSummary {
  parts: SummaryPart[];
  /** What could not be read, one message per placeholder. */
  errors: string[];
}

const TOKEN_PATTERN = /\\\{\{|(?<!\{)\{\{\s*([^{}]*?)\s*\}\}/g;
const PRODUCT_PATTERN = /^[a-z][a-z0-9_-]*$/;
const COUNT_PATTERN = /^count\s+(\S+)(?:\s+([^=\s]+)=(\S+))?$/;

/** Split an entry summary into text and placeholders. */
export function parseSummary(summary: string): ParsedSummary {
  const parts: SummaryPart[] = [];
  const errors: string[] = [];
  let text = "";
  let last = 0;
  const flush = () => {
    if (text !== "") parts.push({ kind: "text", text });
    text = "";
  };
  for (const match of summary.matchAll(TOKEN_PATTERN)) {
    text += summary.slice(last, match.index);
    last = match.index + match[0].length;
    const inner = match[1];
    if (inner === undefined) {
      text += "{{";
      continue;
    }
    const part = readPlaceholder(inner);
    if (part === null) {
      text += match[0];
    } else if (typeof part === "string") {
      errors.push(part);
      text += match[0];
    } else {
      flush();
      parts.push(part);
    }
  }
  text += summary.slice(last);
  flush();
  return { parts, errors };
}

/** A placeholder, an error message, or null for literal text. */
function readPlaceholder(inner: string): SummaryPart | string | null {
  if (IDENTIFIER_PATTERN.test(inner)) return { kind: "field", name: inner };
  if (inner.startsWith("$")) {
    if (inner === "$cycle") return { kind: "cycle" };
    if (inner === "$version") return { kind: "version" };
    if (inner.startsWith("$version.")) {
      const product = inner.slice("$version.".length);
      return PRODUCT_PATTERN.test(product)
        ? { kind: "version", product }
        : `{{${inner}}}: '${product}' is not a product name`;
    }
    if (inner.startsWith("$input.")) {
      const name = inner.slice("$input.".length);
      return IDENTIFIER_PATTERN.test(name)
        ? { kind: "input", name }
        : `{{${inner}}}: '${name}' is not a binding or input name`;
    }
    return `{{${inner}}} is not a summary value; there is $cycle, ` +
      "$version, $version.<product> and $input.<name> " +
      "(write \\{{ for a literal {{)";
  }
  if (/^count\s/.test(inner)) {
    const m = COUNT_PATTERN.exec(inner);
    if (
      m === null || !IDENTIFIER_PATTERN.test(m[1]) ||
      (m[2] !== undefined && !IDENTIFIER_PATTERN.test(m[2]))
    ) {
      return `{{${inner}}}: a count is {{count <field>}} or ` +
        "{{count <field> <key>=<value>}}, with field and key identifiers " +
        "(write \\{{ for a literal {{)";
    }
    return {
      kind: "count",
      field: m[1],
      ...(m[2] === undefined
        ? {}
        : { where: { key: m[2], value: countValue(m[3]) } }),
    };
  }
  return null;
}

function countValue(raw: string): CountValue {
  if (raw === "true") return true;
  if (raw === "false") return false;
  if (/^-?\d+(\.\d+)?$/.test(raw)) return Number(raw);
  return raw;
}

/** What an event knows besides its payload; absent where it does not apply. */
export interface SummaryMeta {
  cycle: number;
  /** The recorded product's version. */
  version?: number;
  /** Each product's version as of the event. */
  versions: Record<string, number>;
  /** The dispatch's resolved inputs and bindings. */
  inputs?: Record<string, unknown>;
}

/**
 * Fill a summary. Anything absent (a payload field, a product not yet
 * recorded, an input the dispatch did not resolve) reads as empty text, so
 * an optional value never blocks the history. A count of a field that is
 * not an array is 0.
 */
export function renderSummary(
  parts: SummaryPart[],
  payload: Record<string, unknown>,
  meta: SummaryMeta,
): string {
  return parts.map((part) => {
    switch (part.kind) {
      case "text":
        return part.text;
      case "field":
        return scalar(
          Object.hasOwn(payload, part.name) ? payload[part.name] : undefined,
        );
      case "cycle":
        return String(meta.cycle);
      case "version":
        return scalar(
          part.product === undefined
            ? meta.version
            : Object.hasOwn(meta.versions, part.product)
            ? meta.versions[part.product]
            : undefined,
        );
      case "input":
        return scalar(
          meta.inputs !== undefined && Object.hasOwn(meta.inputs, part.name)
            ? meta.inputs[part.name]
            : undefined,
        );
      case "count": {
        const items = Object.hasOwn(payload, part.field)
          ? payload[part.field]
          : undefined;
        if (!Array.isArray(items)) return "0";
        const where = part.where;
        if (where === undefined) return String(items.length);
        return String(
          items.filter((item) =>
            typeof item === "object" && item !== null &&
            Object.hasOwn(item, where.key) &&
            (item as Record<string, unknown>)[where.key] === where.value
          ).length,
        );
      }
    }
  }).join("");
}

/** Text for one value: strings as they are, scalars as text, objects as
 * JSON, and null or absent as empty text. */
function scalar(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}
