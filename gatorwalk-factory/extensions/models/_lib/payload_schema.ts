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
  format as KNOWN_FORMATS,
  type OutputUnit,
  type Schema,
  Validator,
} from "npm:@cfworker/json-schema@4.1.1";

// ---------------------------------------------------------------------------
// Payload schemas are standard JSON Schema, draft 2020-12, with standard
// semantics, validated by @cfworker/json-schema. Nothing here is a
// home-grown dialect: a schema that works in any 2020-12 validator means
// the same thing here.
//
// Two things are stricter than the standard, both at authoring time only and
// both about catching mistakes rather than changing meaning:
//
// - Unknown keywords are rejected (the standard ignores them), so a typo like
//   `requried` fails when the lifecycle is saved instead of silently
//   validating nothing. Extension keywords prefixed `x-` are allowed.
// - Unknown `format` names are rejected. Known formats are asserted when a
//   payload is recorded, not just annotated.
//
// One restriction, reported as an error rather than silently ignored:
// references are local only (`#/...` pointers and `#anchor`s within the
// schema, with `$id` allowed only at the root). Nothing is ever fetched.
// ---------------------------------------------------------------------------

export const JSON_SCHEMA_DIALECT =
  "https://json-schema.org/draft/2020-12/schema";

/** A JSON Schema document (object form). */
export type PayloadSchema = Record<string, unknown>;

/** An authoring problem at a path inside a schema. */
export interface SchemaIssue {
  path: (string | number)[];
  message: string;
}

type KeywordKind =
  | "schema"
  | "schema-map"
  | "schema-array"
  | "string"
  | "string-array"
  | "string-array-map"
  | "non-negative-integer"
  | "positive-number"
  | "number"
  | "boolean"
  | "type"
  | "pattern"
  | "format"
  | "dialect"
  | "array"
  | "any";

/** Every keyword in the 2020-12 core, applicator, unevaluated, validation,
 * meta-data, format-annotation and content vocabularies. */
const KEYWORDS: Record<string, KeywordKind> = {
  // core
  $schema: "dialect",
  $id: "string",
  $ref: "string",
  $anchor: "string",
  $dynamicRef: "string",
  $dynamicAnchor: "string",
  $vocabulary: "any",
  $comment: "string",
  $defs: "schema-map",
  // applicator
  prefixItems: "schema-array",
  items: "schema",
  contains: "schema",
  additionalProperties: "schema",
  properties: "schema-map",
  patternProperties: "schema-map",
  dependentSchemas: "schema-map",
  propertyNames: "schema",
  if: "schema",
  then: "schema",
  else: "schema",
  allOf: "schema-array",
  anyOf: "schema-array",
  oneOf: "schema-array",
  not: "schema",
  // unevaluated
  unevaluatedItems: "schema",
  unevaluatedProperties: "schema",
  // validation
  type: "type",
  const: "any",
  enum: "array",
  multipleOf: "positive-number",
  maximum: "number",
  exclusiveMaximum: "number",
  minimum: "number",
  exclusiveMinimum: "number",
  maxLength: "non-negative-integer",
  minLength: "non-negative-integer",
  pattern: "pattern",
  maxItems: "non-negative-integer",
  minItems: "non-negative-integer",
  uniqueItems: "boolean",
  maxContains: "non-negative-integer",
  minContains: "non-negative-integer",
  maxProperties: "non-negative-integer",
  minProperties: "non-negative-integer",
  required: "string-array",
  dependentRequired: "string-array-map",
  // meta-data
  title: "string",
  description: "string",
  default: "any",
  deprecated: "boolean",
  readOnly: "boolean",
  writeOnly: "boolean",
  examples: "array",
  // format-annotation
  format: "format",
  // content
  contentEncoding: "string",
  contentMediaType: "string",
  contentSchema: "schema",
};

const TYPE_NAMES = new Set([
  "null",
  "boolean",
  "object",
  "array",
  "number",
  "integer",
  "string",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

/**
 * Check that a value is a well-formed 2020-12 schema this engine will
 * enforce as written. Returns every problem found, each with its path inside
 * the schema; an empty list means the schema is usable.
 */
export function lintPayloadSchema(schema: unknown): SchemaIssue[] {
  const issues: SchemaIssue[] = [];
  lintSubschema(schema, [], issues);
  if (issues.length === 0) checkReferences(schema, issues);
  if (issues.length === 0 && isRecord(schema)) {
    const compileError = compileProblem(schema);
    if (compileError !== null) {
      issues.push({ path: [], message: compileError });
    }
  }
  return issues;
}

/** Keywords that name or point at a place in a schema. */
const REFERENCE_KEYWORDS = [
  "$id",
  "$ref",
  "$dynamicRef",
  "$anchor",
  "$dynamicAnchor",
  "$defs",
];

/**
 * Check a schema for one field of a payload, as a gate's `match` holds one:
 * a well-formed 2020-12 schema (an object or a boolean) with no references.
 * A fragment for one field has no document around it to point into.
 */
export function lintFieldSchema(schema: unknown): SchemaIssue[] {
  // Shape first, then references, before anything is compiled: a reference
  // is refused outright rather than resolved.
  const issues: SchemaIssue[] = [];
  lintSubschema(schema, [], issues);
  if (issues.length > 0) return issues;
  for (const { schema: sub, path } of subschemas(schema)) {
    for (const keyword of REFERENCE_KEYWORDS) {
      if (Object.hasOwn(sub, keyword)) {
        issues.push({
          path: [...path, keyword],
          message: `${keyword} is not supported in a field schema; ` +
            "write the schema in place",
        });
      }
    }
  }
  if (issues.length > 0) return issues;
  // A copy: compiling marks the schema object it is given, and a fragment is
  // copied again when the gate config is parsed, which would keep the marks.
  return lintPayloadSchema(structuredClone(schema));
}

function lintSubschema(
  schema: unknown,
  path: (string | number)[],
  issues: SchemaIssue[],
): void {
  if (typeof schema === "boolean") return;
  if (!isRecord(schema)) {
    issues.push({ path, message: "a schema must be an object or a boolean" });
    return;
  }
  for (const [keyword, value] of Object.entries(schema)) {
    const at = [...path, keyword];
    // hasOwn: `constructor` and friends are not keywords.
    const kind = Object.hasOwn(KEYWORDS, keyword)
      ? KEYWORDS[keyword]
      : undefined;
    if (kind === undefined) {
      if (!keyword.startsWith("x-")) {
        issues.push({
          path: at,
          message: `unknown JSON Schema keyword '${keyword}' ` +
            `(draft 2020-12; prefix custom keywords with 'x-')`,
        });
      }
      continue;
    }
    lintKeyword(kind, value, at, issues);
  }
}

function lintKeyword(
  kind: KeywordKind,
  value: unknown,
  at: (string | number)[],
  issues: SchemaIssue[],
): void {
  const fail = (message: string): void => {
    issues.push({ path: at, message });
  };
  switch (kind) {
    case "schema":
      lintSubschema(value, at, issues);
      return;
    case "schema-map":
      if (!isRecord(value)) return fail("must be an object of schemas");
      for (const [key, child] of Object.entries(value)) {
        lintSubschema(child, [...at, key], issues);
      }
      return;
    case "schema-array":
      if (!Array.isArray(value) || value.length === 0) {
        return fail("must be a non-empty array of schemas");
      }
      value.forEach((child, i) => lintSubschema(child, [...at, i], issues));
      return;
    case "string":
      if (typeof value !== "string") fail("must be a string");
      return;
    case "string-array":
      if (!isStringArray(value)) fail("must be an array of strings");
      return;
    case "string-array-map":
      if (!isRecord(value) || !Object.values(value).every(isStringArray)) {
        fail("must be an object whose values are arrays of strings");
      }
      return;
    case "non-negative-integer":
      if (!Number.isInteger(value) || (value as number) < 0) {
        fail("must be a non-negative integer");
      }
      return;
    case "positive-number":
      if (typeof value !== "number" || value <= 0) {
        fail("must be a number greater than 0");
      }
      return;
    case "number":
      if (typeof value !== "number") fail("must be a number");
      return;
    case "boolean":
      if (typeof value !== "boolean") fail("must be a boolean");
      return;
    case "array":
      if (!Array.isArray(value)) fail("must be an array");
      return;
    case "type": {
      const names = typeof value === "string" ? [value] : value;
      if (
        !isStringArray(names) || names.length === 0 ||
        !names.every((n) => TYPE_NAMES.has(n))
      ) {
        fail(
          `must be one of ${[...TYPE_NAMES].join(", ")}, or an array of them`,
        );
      }
      return;
    }
    case "pattern":
      if (typeof value !== "string") return fail("must be a string");
      try {
        new RegExp(value, "u");
      } catch (error) {
        fail(`is not a valid regular expression: ${messageOf(error)}`);
      }
      return;
    case "format":
      if (typeof value !== "string") return fail("must be a string");
      if (!Object.hasOwn(KNOWN_FORMATS, value)) {
        fail(
          `unknown format '${value}' (known: ${
            Object.keys(KNOWN_FORMATS).join(", ")
          })`,
        );
      }
      return;
    case "dialect":
      if (value !== JSON_SCHEMA_DIALECT) {
        fail(`only draft 2020-12 is supported ('${JSON_SCHEMA_DIALECT}')`);
      }
      return;
    case "any":
      return;
  }
}

/** Every subschema with its path, in document order. Only for a schema that
 * lintSubschema passed: the casts below rely on its shape checks. */
function subschemas(
  schema: unknown,
  path: (string | number)[] = [],
): { schema: Record<string, unknown>; path: (string | number)[] }[] {
  if (!isRecord(schema)) return [];
  const out = [{ schema, path }];
  for (const [keyword, value] of Object.entries(schema)) {
    const at = [...path, keyword];
    if (!Object.hasOwn(KEYWORDS, keyword)) continue;
    switch (KEYWORDS[keyword]) {
      case "schema":
        out.push(...subschemas(value, at));
        break;
      case "schema-map":
        for (const [key, child] of Object.entries(value as object)) {
          out.push(...subschemas(child, [...at, key]));
        }
        break;
      case "schema-array":
        (value as unknown[]).forEach((child, i) =>
          out.push(...subschemas(child, [...at, i]))
        );
        break;
    }
  }
  return out;
}

/** Resolve a JSON pointer fragment (`#/a/b`) within the root schema. */
function resolvePointer(root: unknown, ref: string): boolean {
  let node = root;
  let pointer: string;
  try {
    pointer = decodeURIComponent(ref.slice(1));
  } catch {
    return false;
  }
  if (pointer === "") return true;
  for (const raw of pointer.slice(1).split("/")) {
    const token = raw.replaceAll("~1", "/").replaceAll("~0", "~");
    if (Array.isArray(node) && /^\d+$/.test(token)) node = node[Number(token)];
    else if (isRecord(node) && Object.hasOwn(node, token)) node = node[token];
    else return false;
  }
  return node !== undefined;
}

/** References must be local and must resolve. */
function checkReferences(root: unknown, issues: SchemaIssue[]): void {
  const all = subschemas(root);
  const anchors = new Set<string>();
  for (const { schema, path } of all) {
    if (path.length > 0 && schema.$id !== undefined) {
      issues.push({
        path: [...path, "$id"],
        message: "$id is only supported on the root schema",
      });
    }
    for (const key of ["$anchor", "$dynamicAnchor"]) {
      if (typeof schema[key] === "string") anchors.add(schema[key] as string);
    }
  }
  for (const { schema, path } of all) {
    for (const key of ["$ref", "$dynamicRef"]) {
      const ref = schema[key];
      if (typeof ref !== "string") continue;
      const at = [...path, key];
      if (!ref.startsWith("#")) {
        issues.push({
          path: at,
          message: `'${ref}' is not a local reference; only '#/...' ` +
            "pointers and '#anchor's within the schema are supported, and " +
            "nothing is fetched",
        });
      } else if (ref === "#" || ref.startsWith("#/")) {
        if (!resolvePointer(root, ref)) {
          issues.push({ path: at, message: `'${ref}' does not resolve` });
        }
      } else if (!anchors.has(ref.slice(1))) {
        issues.push({ path: at, message: `no anchor named '${ref.slice(1)}'` });
      }
    }
  }
}

/** Returns why the schema cannot be used (e.g. an unresolvable $ref), or
 * null. Remote references are never fetched. */
function compileProblem(schema: PayloadSchema): string | null {
  try {
    validatorFor(schema).validate(null);
    return null;
  } catch (error) {
    return `schema cannot be used: ${messageOf(error).split("\n")[0]}`;
  }
}

function validatorFor(schema: PayloadSchema | boolean): Validator {
  return new Validator(schema as Schema | boolean, "2020-12", false);
}

// ---------------------------------------------------------------------------
// Payload validation
// ---------------------------------------------------------------------------

/** Keywords whose failure only summarises failures reported underneath. */
const SUMMARY_KEYWORDS = new Set([
  "properties",
  "patternProperties",
  "items",
  "prefixItems",
  "allOf",
  "$ref",
  "$dynamicRef",
  "dependentSchemas",
  "propertyNames",
  "if",
  "then",
  "else",
  "false",
]);

/** Keywords that report a property as not allowed. */
const ADDITIONAL_KEYWORDS = new Set([
  "additionalProperties",
  "unevaluatedProperties",
]);

/** Keywords whose sub-failures are alternatives, not the problem itself. */
const ALTERNATIVE_KEYWORDS = new Set(["anyOf", "oneOf", "not"]);

/**
 * Turn the validator's full error tree into the failures a person can act
 * on: leaf errors, with the summaries above them and the per-branch noise
 * under anyOf/oneOf/not removed.
 */
function actionableErrors(errors: OutputUnit[], base?: string): string[] {
  const alternativeRoots = errors
    .filter((e) => ALTERNATIVE_KEYWORDS.has(e.keyword))
    .map((e) => `${e.keywordLocation}/`);
  const kept = errors.filter((e) =>
    !SUMMARY_KEYWORDS.has(e.keyword) &&
    !alternativeRoots.some((root) => e.keywordLocation.startsWith(root))
  );
  // The validator also reports a declared property as "additional" when its
  // own subschema fails; that property's own failure is the real one.
  const failing = (location: string) =>
    kept.some((e) =>
      e.instanceLocation === location ||
      e.instanceLocation.startsWith(`${location}/`)
    );
  const actionable = kept.filter((e) => {
    if (!ADDITIONAL_KEYWORDS.has(e.keyword)) return true;
    const property = /^Property "(.*)" does not match/.exec(e.error)?.[1];
    if (property === undefined) return true;
    const escaped = property.replaceAll("~", "~0").replaceAll("/", "~1");
    return !failing(`${e.instanceLocation}/${escaped}`);
  });
  const lines = actionable.map((e) =>
    `${instancePath(e.instanceLocation, base)}: ${e.error}`
  );
  return [...new Set(lines)];
}

/** A dotted path, below `base` when given (a field path), else from the
 * payload's root. */
function instancePath(location: string, base?: string): string {
  const pointer = location.replace(/^#/, "");
  if (pointer === "" || pointer === "/") return base ?? "(root)";
  const path = pointer.slice(1).split("/").map((s) =>
    s.replaceAll("~1", "/").replaceAll("~0", "~")
  ).join(".");
  return base === undefined ? path : `${base}.${path}`;
}

/**
 * Validate a payload against a schema that passed lintPayloadSchema.
 * Returns null when valid, else path-bearing reasons.
 */
export function validatePayload(
  schema: PayloadSchema,
  payload: unknown,
): string[] | null {
  const result = validatorFor(schema).validate(payload);
  if (result.valid) return null;
  const errors = actionableErrors(result.errors);
  return errors.length > 0 ? errors : ["(root): does not match the schema"];
}

/**
 * Validate the value of one payload field against a schema that passed
 * lintFieldSchema. Returns null when valid, else reasons whose paths start
 * at the field.
 */
export function validateField(
  schema: PayloadSchema | boolean,
  field: string,
  value: unknown,
): string[] | null {
  // A copy, so the lifecycle's own gate config is never marked by compiling.
  const result = validatorFor(structuredClone(schema)).validate(value);
  if (result.valid) return null;
  const errors = actionableErrors(result.errors, field);
  return errors.length > 0 ? errors : [`${field}: does not match the schema`];
}

// ---------------------------------------------------------------------------
// Built-in contracts
// ---------------------------------------------------------------------------

export const SEVERITIES = ["critical", "high", "medium", "low"] as const;
export type Severity = typeof SEVERITIES[number];

/** Payload contract of every `kind: findings` artifact. A finding carries
 * exactly the contract fields; drift such as a misspelt key is rejected. */
export const FINDINGS_SCHEMA: PayloadSchema = {
  type: "object",
  required: ["findings"],
  properties: {
    findings: {
      type: "array",
      items: {
        type: "object",
        required: ["id", "severity", "description"],
        additionalProperties: false,
        properties: {
          id: { type: "string", minLength: 1 },
          severity: { enum: [...SEVERITIES] },
          description: { type: "string", minLength: 1 },
          category: { type: "string" },
          resolved: { type: "boolean" },
          resolutionNote: { type: "string" },
        },
      },
    },
  },
};

/**
 * Default payload contract of a stage's `resultEvidence`: the attested
 * outcome of a workflow or method stage. `status` and `runId` are required,
 * so "succeeded but recorded nothing" fails at the write rather than leaving
 * a gate quietly unsatisfied. Extra keys are allowed. An evidence entry of
 * the same name on the same stage replaces this contract.
 */
export const OUTCOME_SCHEMA: PayloadSchema = {
  type: "object",
  required: ["status", "runId"],
  properties: {
    status: { enum: ["succeeded", "failed"] },
    runId: { type: "string", minLength: 1 },
    outputs: { type: "object" },
  },
};

/**
 * Validate an artifact payload: the findings contract when the artifact is
 * `kind: findings`, and its declared schema when it has one. Both apply.
 */
export function validateArtifactPayload(
  spec: { kind?: "findings"; schema?: PayloadSchema },
  payload: unknown,
): string[] | null {
  const errors: string[] = [];
  if (spec.kind === "findings") {
    errors.push(...validatePayload(FINDINGS_SCHEMA, payload) ?? []);
  }
  if (spec.schema !== undefined) {
    errors.push(...validatePayload(spec.schema, payload) ?? []);
  }
  return errors.length > 0 ? [...new Set(errors)] : null;
}

function messageOf(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
