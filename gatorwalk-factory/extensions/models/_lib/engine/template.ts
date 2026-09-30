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
// Prompt templates: `{{name}}` placeholders in a stage's prose fields
// (systemPrompt, command), filled from the stage's resolved bindings when it
// is dispatched. A placeholder holds a binding name, never an expression:
// expressions live only in `work.bindings`, where they are checked when the
// lifecycle is saved and their resolved values are recorded.
//
// - `{{name}}` (spaces inside allowed) is a placeholder. `name` must be a
//   declared binding; anything else is an error when the lifecycle is saved.
// - `{{` followed by anything that is not a bare name (`{{ .Values.x }}`,
//   `{{#each}}`) is literal text, so most template snippets pass through.
// - `{{` directly after `{` is literal, so Handlebars `{{{raw}}}` passes
//   through.
// - `\{{` is a literal `{{`, for text that looks like a placeholder, such as
//   bare-word template tags (`{{end}}`, `{{else}}`), which are otherwise
//   rejected as undeclared bindings. There is no way to write a literal `\`
//   directly before a live placeholder.
// - `${{` cannot appear at all: the platform evaluates it on save.
// ---------------------------------------------------------------------------

/** A binding name, and so a placeholder name. */
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

/** Placeholder names that are not declared bindings. */
export function undeclaredPlaceholders(
  template: string,
  bindings: Iterable<string>,
): string[] {
  const declared = new Set(bindings);
  const missing = parseTemplate(template)
    .flatMap((p) => p.kind === "placeholder" ? [p.name] : [])
    .filter((name) => !declared.has(name));
  return [...new Set(missing)];
}

export type RenderResult =
  | { ok: true; text: string }
  | { ok: false; missing: string[] };

/**
 * Fill a template from resolved binding values. Strings are inserted as
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
