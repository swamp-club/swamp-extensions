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

import { jsonSafe } from "./canonical.ts";

// ---------------------------------------------------------------------------
// Templates: `{{name}}` placeholders in a stage's text fields (systemPrompt,
// command, and a call's target: workflow.name, method.modelIdOrName), filled
// from the stage's resolved let values when it is dispatched. A placeholder
// holds a let name, never an expression: expressions live only in
// `work.let`, where they are checked when the factory definition is saved
// and their resolved values are recorded. A target is filled by renderTarget,
// which takes only non-empty strings.
//
// - `{{name}}` (spaces inside allowed) is a placeholder. `name` must be a
//   declared let value; anything else is an error when the factory definition is
//   saved.
// - `{{` followed by anything that is not a bare name (`{{ .Values.x }}`,
//   `{{#each}}`) is literal text, so most template snippets pass through.
// - `{{` directly after `{` is literal, so Handlebars `{{{raw}}}` passes
//   through.
// - `\{{` is a literal `{{`, for text that looks like a placeholder, such as
//   bare-word template tags (`{{end}}`, `{{else}}`), which are otherwise
//   rejected as undeclared let values. There is no way to write a literal `\`
//   directly before a live placeholder.
// - `${{` cannot appear at all: swamp evaluates it before each method runs.
// ---------------------------------------------------------------------------

/** A let name, and so a placeholder name. */
export const IDENTIFIER_PATTERN = /^[A-Za-z_][A-Za-z0-9_]*$/;

const TOKEN_PATTERN = /\\\{\{|(?<!\{)\{\{\s*([A-Za-z_][A-Za-z0-9_]*)\s*\}\}/g;

export type TemplatePart =
  | { kind: "text"; text: string }
  | { kind: "placeholder"; name: string };

/** Split a template into literal text and placeholders. */
export function parseTemplate(template: string): TemplatePart[] {
  const parts: TemplatePart[] = [];
  let text = "";
  let last = 0;
  for (const match of template.matchAll(TOKEN_PATTERN)) {
    text += template.slice(last, match.index);
    last = match.index + match[0].length;
    if (match[1] === undefined) {
      text += "{{";
      continue;
    }
    if (text !== "") parts.push({ kind: "text", text });
    text = "";
    parts.push({ kind: "placeholder", name: match[1] });
  }
  text += template.slice(last);
  if (text !== "") parts.push({ kind: "text", text });
  return parts;
}

/** Placeholder names that are not declared let values. */
export function undeclaredPlaceholders(
  template: string,
  declaredNames: Iterable<string>,
): string[] {
  const declared = new Set(declaredNames);
  const missing = parseTemplate(template)
    .flatMap((p) => p.kind === "placeholder" ? [p.name] : [])
    .filter((name) => !declared.has(name));
  return [...new Set(missing)];
}

export type RenderResult =
  | { ok: true; text: string }
  | { ok: false; missing: string[] };

/**
 * Fill a template from resolved let values. Strings are inserted as
 * they are, numbers and booleans as text, objects and arrays as JSON. A
 * placeholder whose value is null or absent fails the render rather than
 * leaving a blank in the prompt.
 */
export function renderTemplate(
  template: string,
  values: Record<string, unknown>,
): RenderResult {
  const missing: string[] = [];
  let text = "";
  for (const part of parseTemplate(template)) {
    if (part.kind === "text") {
      text += part.text;
      continue;
    }
    const value = Object.hasOwn(values, part.name)
      ? values[part.name]
      : undefined;
    if (value === null || value === undefined) {
      if (!missing.includes(part.name)) missing.push(part.name);
    } else if (typeof value === "string") {
      text += value;
    } else if (typeof value === "object") {
      // jsonSafe: a CEL integer inside a map or list is a BigInt, which
      // JSON.stringify refuses.
      text += JSON.stringify(jsonSafe(value), null, 2);
    } else {
      text += String(value);
    }
  }
  return missing.length > 0 ? { ok: false, missing } : { ok: true, text };
}

/** Why a call's target could not be filled: a placeholder whose value is
 * not a non-empty string. */
export interface TargetProblem {
  name: string;
  value: unknown;
}

export type TargetRenderResult =
  | { ok: true; text: string }
  | { ok: false; problems: TargetProblem[] };

/**
 * Fill a call's target (a workflow name, a model id or name) from resolved
 * values. Stricter than renderTemplate: every placeholder's value must be a
 * non-empty string, so a null, a missing value, a number or an object fails
 * rather than calling a target made from a stringified or blank value.
 */
export function renderTarget(
  template: string,
  values: Record<string, unknown>,
): TargetRenderResult {
  const problems: TargetProblem[] = [];
  let text = "";
  for (const part of parseTemplate(template)) {
    if (part.kind === "text") {
      text += part.text;
      continue;
    }
    const value = Object.hasOwn(values, part.name)
      ? values[part.name]
      : undefined;
    if (typeof value === "string" && value !== "") {
      text += value;
    } else if (!problems.some((p) => p.name === part.name)) {
      problems.push({ name: part.name, value });
    }
  }
  return problems.length > 0 ? { ok: false, problems } : { ok: true, text };
}

/** Whether a template has any placeholder. */
export function hasPlaceholders(template: string): boolean {
  return parseTemplate(template).some((p) => p.kind === "placeholder");
}

/** What a template treats as markup: a `\{{` escape, or the `{{` of a live
 * placeholder (as TOKEN_PATTERN reads them). */
const MARKUP_PATTERN =
  /\\\{\{|(?<!\{)\{\{(?=\s*[A-Za-z_][A-Za-z0-9_]*\s*\}\})/g;

/**
 * Text that renders as `text` exactly: every `\{{` and every live
 * placeholder's `{{` gets a `\` in front, so nothing in it is a placeholder.
 * For upgrading a field that held plain text to one that holds a template.
 */
export function escapeTemplate(text: string): string {
  return text.replace(MARKUP_PATTERN, (markup) => `\\${markup}`);
}
