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
  ObjectPayloadSchemaSchema,
  parsePlugin,
  type Plugin,
} from "./lifecycle_schema.ts";
import { type PayloadSchema, validatePayload } from "./payload_schema.ts";

// ---------------------------------------------------------------------------
// Parameters of a stage plugin. A plugin document may hold a placeholder,
// `{ $param: <name> }`, wherever a value goes; instantiating the plugin
// replaces each with the parameter's value, whole. There is no substitution
// inside strings. The values are checked against the contract's `parameters`
// schema, and a parameter left out takes its schema `default` (top-level
// properties only: the validator does not apply defaults). An object that
// looks like a placeholder but is not one is an error, never kept silently.
// The result must then be a valid plugin. See DESIGN.md, "Stage plugins:
// eject only".
// ---------------------------------------------------------------------------

/** The key of a parameter placeholder, the only key of its object. */
export const PARAM_KEY = "$param";

type Path = (string | number)[];

export interface Placeholder {
  name: string;
  path: Path;
}

function formatPath(path: Path): string {
  return path.length > 0 ? path.join(".") : "(root)";
}

function placeholderName(node: unknown): string | undefined {
  if (node === null || typeof node !== "object" || Array.isArray(node)) {
    return undefined;
  }
  const keys = Object.keys(node);
  if (keys.length !== 1 || keys[0] !== PARAM_KEY) return undefined;
  const name = (node as Record<string, unknown>)[PARAM_KEY];
  return typeof name === "string" ? name : undefined;
}

/** Every placeholder in a document, with its path. */
export function findPlaceholders(
  node: unknown,
  path: Path = [],
): Placeholder[] {
  const name = placeholderName(node);
  if (name !== undefined) return [{ name, path }];
  if (Array.isArray(node)) {
    return node.flatMap((child, i) => findPlaceholders(child, [...path, i]));
  }
  if (node !== null && typeof node === "object") {
    return Object.entries(node).flatMap(([key, child]) =>
      findPlaceholders(child, [...path, key])
    );
  }
  return [];
}

/**
 * Objects that look like a placeholder but are not one: a `$param` key whose
 * value is not a name, or a name beside other keys. A `$param` key holding an
 * object is left alone, so a payload schema may have a property of that name.
 */
function malformedPlaceholders(node: unknown, path: Path = []): Path[] {
  if (Array.isArray(node)) {
    return node.flatMap((child, i) =>
      malformedPlaceholders(child, [...path, i])
    );
  }
  if (node === null || typeof node !== "object") return [];
  const record = node as Record<string, unknown>;
  const own: Path[] = [];
  if (Object.hasOwn(record, PARAM_KEY) && placeholderName(node) === undefined) {
    const value = record[PARAM_KEY];
    if (value === null || typeof value !== "object") own.push(path);
  }
  return [
    ...own,
    ...Object.entries(record).flatMap(([key, child]) =>
      malformedPlaceholders(child, [...path, key])
    ),
  ];
}

function substitute(node: unknown, values: Record<string, unknown>): unknown {
  const name = placeholderName(node);
  if (name !== undefined) return structuredClone(values[name]);
  if (Array.isArray(node)) {
    return node.map((child) => substitute(child, values));
  }
  if (node !== null && typeof node === "object") {
    return Object.fromEntries(
      Object.entries(node).map(([key, child]) => [
        key,
        substitute(child, values),
      ]),
    );
  }
  return node;
}

export type InstanceResult =
  | { ok: true; plugin: Plugin; params: Record<string, unknown> }
  | { ok: false; errors: string[] };

/**
 * A plugin with its parameters filled in: the given values, then schema
 * defaults. Returns every error, each with its document path.
 */
export function instantiatePlugin(
  raw: unknown,
  params: Record<string, unknown> = {},
): InstanceResult {
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) {
    return { ok: false, errors: ["(root): a plugin is an object"] };
  }
  const doc = raw as Record<string, unknown>;
  const errors: string[] = [];
  const contract = doc.contract;
  const rawSchema = contract !== null && typeof contract === "object"
    ? (contract as Record<string, unknown>).parameters
    : undefined;

  let schema: PayloadSchema | undefined;
  if (rawSchema !== undefined) {
    const parsed = ObjectPayloadSchemaSchema.safeParse(rawSchema);
    if (!parsed.success) {
      // parsePlugin reports these with their paths.
      return parsePluginErrors(doc);
    }
    schema = parsed.data;
  }
  const properties = (schema?.properties ?? {}) as Record<
    string,
    { default?: unknown }
  >;

  for (const path of malformedPlaceholders(doc)) {
    errors.push(
      `${
        formatPath(path)
      }: a parameter placeholder is { ${PARAM_KEY}: <name> }, ` +
        "with a parameter name and no other keys",
    );
  }
  const placeholders = findPlaceholders(doc);
  for (const p of placeholders) {
    if (p.path[0] === "contract") {
      errors.push(
        `${formatPath(p.path)}: a parameter cannot be used in the contract, ` +
          "which declares the parameters",
      );
    } else if (!Object.hasOwn(properties, p.name)) {
      errors.push(
        `${formatPath(p.path)}: ${PARAM_KEY} '${p.name}' is not a parameter ` +
          `the contract declares (${
            Object.keys(properties).join(", ") || "none"
          })`,
      );
    }
  }

  if (schema === undefined && Object.keys(params).length > 0) {
    errors.push("params: the plugin declares no parameters");
  }
  const values: Record<string, unknown> = {};
  for (const [name, property] of Object.entries(properties)) {
    if (Object.hasOwn(params, name)) values[name] = params[name];
    else if (
      property !== null && typeof property === "object" &&
      Object.hasOwn(property, "default")
    ) {
      values[name] = structuredClone(property.default);
    }
  }
  if (schema !== undefined) {
    // Unknown parameter names are the schema's to judge (additionalProperties).
    const given = { ...params, ...values };
    for (const reason of validatePayload(schema, given) ?? []) {
      errors.push(
        reason.startsWith("(root)")
          ? `params${reason.slice("(root)".length)}`
          : `params.${reason}`,
      );
    }
  }
  for (const p of placeholders) {
    if (
      Object.hasOwn(properties, p.name) && p.path[0] !== "contract" &&
      !Object.hasOwn(values, p.name)
    ) {
      errors.push(
        `${
          formatPath(p.path)
        }: parameter '${p.name}' has no value and no default`,
      );
    }
  }
  if (errors.length > 0) return { ok: false, errors };

  const parsed = parsePlugin(substitute(doc, values));
  return parsed.ok
    ? { ok: true, plugin: parsed.value, params: values }
    : { ok: false, errors: parsed.errors };
}

function parsePluginErrors(doc: Record<string, unknown>): InstanceResult {
  // Only the parameters schema's own errors: placeholders elsewhere would
  // add noise until it is fixed.
  const parsed = parsePlugin(doc);
  const errors = parsed.ok
    ? []
    : parsed.errors.filter((e) => e.startsWith("contract.parameters"));
  return {
    ok: false,
    errors: errors.length > 0
      ? errors
      : ["contract.parameters: not a valid parameters schema"],
  };
}
