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

import { assert, assertEquals } from "@std/assert";
import {
  artifactContract,
  evidenceContract,
  FINDINGS_SCHEMA,
  lintFieldSchema,
  lintPayloadSchema,
  OUTCOME_SCHEMA,
  type PayloadSchema,
  validateArtifactPayload,
  validateField,
  validatePayload,
  withoutNotes,
} from "./payload_schema.ts";

function lintMessages(schema: unknown): string[] {
  return lintPayloadSchema(schema).map((i) =>
    `${i.path.join(".") || "(root)"}: ${i.message}`
  );
}

function assertMentions(lines: string[] | null, ...needles: string[]) {
  assert(lines !== null, "expected errors, got none");
  for (const needle of needles) {
    assert(
      lines.some((l) => l.includes(needle)),
      `expected an error mentioning ${JSON.stringify(needle)}; got:\n${
        lines.join("\n")
      }`,
    );
  }
}

// --- authoring lint --------------------------------------------------------

Deno.test("lint: standard keywords, formats and boolean enums are accepted (#1976, #1262)", () => {
  assertEquals(
    lintMessages({
      $schema: "https://json-schema.org/draft/2020-12/schema",
      type: "object",
      required: ["at", "flag"],
      properties: {
        at: { type: "string", format: "date-time" },
        flag: { enum: [true, false] },
        maybe: { type: ["string", "null"] },
        tags: {
          type: "array",
          items: { $ref: "#/$defs/tag" },
          uniqueItems: true,
        },
      },
      $defs: { tag: { type: "string", pattern: "^[a-z]+$" } },
      "x-owner": "platform",
    }),
    [],
  );
});

Deno.test("lint: a misspelt keyword is an error with its path", () => {
  assertEquals(
    lintMessages({
      type: "object",
      properties: { steps: { type: "array", minItem: 1 } },
    }),
    [
      "properties.steps.minItem: unknown JSON Schema keyword 'minItem' (draft 2020-12; prefix custom keywords with 'x-')",
    ],
  );
});

Deno.test("lint: Object.prototype names are unknown keywords", () => {
  assertMentions(
    lintMessages({ type: "object", constructor: {}, toString: 1 }),
    "constructor: unknown JSON Schema keyword",
    "toString: unknown JSON Schema keyword",
  );
});

Deno.test("lint: property names are not mistaken for keywords", () => {
  assertEquals(
    lintMessages({
      type: "object",
      properties: { requried: { type: "string" }, items: { type: "string" } },
    }),
    [],
  );
});

Deno.test("lint: unknown formats, bad patterns, types and values are errors", () => {
  assertMentions(
    lintMessages({
      type: "object",
      properties: {
        a: { type: "string", format: "datetime" },
        b: { type: "string", pattern: "(" },
        c: { type: "strng" },
        d: { type: "string", minLength: -1 },
        e: { type: "string", required: "yes" },
      },
    }),
    "properties.a.format: unknown format 'datetime'",
    "properties.b.pattern: is not a valid regular expression",
    "properties.c.type: must be one of",
    "properties.d.minLength: must be a non-negative integer",
    "properties.e.required: must be an array of strings",
  );
});

Deno.test("lint: only draft 2020-12", () => {
  assertMentions(
    lintMessages({
      $schema: "http://json-schema.org/draft-07/schema#",
      type: "object",
    }),
    "$schema: only draft 2020-12 is supported",
  );
});

Deno.test("lint: an unresolvable $ref is an error, and nothing is fetched", () => {
  assertMentions(
    lintMessages({
      type: "object",
      properties: { a: { $ref: "#/$defs/none" } },
    }),
    "properties.a.$ref: '#/$defs/none' does not resolve",
  );
  assertMentions(
    lintMessages({ $ref: "https://example.com/schema.json" }),
    "$ref: 'https://example.com/schema.json' is not a local reference",
  );
  assertMentions(
    lintMessages({ type: "object", properties: { a: { $ref: "#/%E0" } } }),
    "properties.a.$ref: '#/%E0' does not resolve",
  );
  assertMentions(
    lintMessages({ type: "object", items: { $ref: "#tag" } }),
    "items.$ref: no anchor named 'tag'",
  );
  assertMentions(
    lintMessages({ $defs: { a: { $id: "https://x/a", type: "string" } } }),
    "$defs.a.$id: $id is only supported on the root schema",
  );
  assertEquals(
    lintMessages({
      type: "array",
      items: { $ref: "#tag" },
      $defs: { t: { $anchor: "tag", type: "string" } },
    }),
    [],
  );
});

Deno.test("lint: a schema is an object or a boolean", () => {
  assertEquals(lintMessages({ type: "object", properties: { a: true } }), []);
  assertMentions(lintMessages("object"), "(root): a schema must be an object");
  assertMentions(
    lintMessages({ allOf: [] }),
    "allOf: must be a non-empty array of schemas",
  );
});

// --- payload validation ----------------------------------------------------

const PLAN: PayloadSchema = {
  type: "object",
  required: ["summary", "steps"],
  additionalProperties: false,
  properties: {
    summary: { type: "string", minLength: 1 },
    steps: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        required: ["description"],
        properties: { description: { type: "string" } },
      },
    },
    due: { type: "string", format: "date" },
  },
};

Deno.test("validate: a matching payload is valid", () => {
  assertEquals(
    validatePayload(PLAN, {
      summary: "s",
      steps: [{ description: "d" }],
      due: "2026-10-14",
    }),
    null,
  );
});

Deno.test("validate: errors are the actionable leaves, with dotted paths", () => {
  assertEquals(
    validatePayload(PLAN, { summary: "s", steps: [{ description: 3 }] }),
    ['steps.0.description: Instance type "number" is invalid. Expected "string".'],
  );
});

Deno.test("validate: an undeclared key gives one line, not a cascade", () => {
  const errors = validatePayload(PLAN, {
    summary: "s",
    steps: [{ description: "d" }],
    extra: 1,
  });
  assertEquals(errors?.length, 1);
  assertMentions(
    errors,
    '(root): Property "extra" does not match additional properties schema',
  );
});

Deno.test("validate: formats are asserted, not just annotated", () => {
  assertMentions(
    validatePayload(PLAN, {
      summary: "s",
      steps: [{ description: "d" }],
      due: "soon",
    }),
    'due: String does not match format "date"',
  );
});

Deno.test("validate: anyOf reports the summary, not every branch", () => {
  const errors = validatePayload(
    { anyOf: [{ type: "string" }, { type: "integer" }] },
    1.5,
  );
  assertEquals(errors?.length, 1);
  assertMentions(errors, "(root):");
});

Deno.test("validate: the findings contract rejects drift", () => {
  assertEquals(
    validatePayload(FINDINGS_SCHEMA, {
      findings: [{ id: "f1", severity: "high", description: "d" }],
    }),
    null,
  );
  assertMentions(
    validatePayload(FINDINGS_SCHEMA, {
      findings: [{
        id: "f1",
        severity: "severe",
        description: "d",
        sevrity: "x",
      }],
    }),
    "findings.0.severity:",
    'Property "sevrity" does not match additional properties schema',
  );
});

Deno.test("validate: the outcome contract requires status and runId", () => {
  assertEquals(
    validatePayload(OUTCOME_SCHEMA, {
      status: "succeeded",
      runId: "r1",
      extra: 1,
    }),
    null,
  );
  assertMentions(
    validatePayload(OUTCOME_SCHEMA, { status: "succeeded" }),
    'Instance does not have required property "runId"',
  );
});

Deno.test("validateArtifactPayload: findings contract and declared schema both apply", () => {
  const spec = {
    kind: "findings" as const,
    schema: {
      type: "object",
      required: ["reviewer"],
      properties: { reviewer: { type: "string" } },
    },
  };
  assertEquals(
    validateArtifactPayload(spec, { reviewer: "r", findings: [] }),
    null,
  );
  assertMentions(
    validateArtifactPayload(spec, { findings: [] }),
    'required property "reviewer"',
  );
  assertMentions(
    validateArtifactPayload(spec, { reviewer: "r" }),
    'required property "findings"',
  );
});

// --- field schemas (an evidence-recorded gate's match) -----------------------

Deno.test("field schema: a well-formed fragment or boolean is accepted", () => {
  assertEquals(lintFieldSchema({ not: { enum: ["a", "b"] } }), []);
  assertEquals(lintFieldSchema(false), []);
  assertEquals(lintFieldSchema({ type: "object", required: ["ok"] }), []);
});

Deno.test("field schema: references and definitions are refused, with their path", () => {
  const messages = [
    { $ref: "#" },
    { not: { $dynamicRef: "#x" } },
    { $defs: { a: true } },
    { properties: { a: { $anchor: "a" } } },
    { $dynamicAnchor: "a" },
    { $id: "https://example.com/x" },
  ].flatMap((schema) =>
    lintFieldSchema(schema).map((i) => `${i.path.join(".")}: ${i.message}`)
  );
  assertEquals(messages, [
    "$ref: $ref is not supported in a field schema; write the schema in place",
    "not.$dynamicRef: $dynamicRef is not supported in a field schema; write the schema in place",
    "$defs: $defs is not supported in a field schema; write the schema in place",
    "properties.a.$anchor: $anchor is not supported in a field schema; write the schema in place",
    "$dynamicAnchor: $dynamicAnchor is not supported in a field schema; write the schema in place",
    "$id: $id is not supported in a field schema; write the schema in place",
  ]);
});

Deno.test("payload schema: lint and validation leave the schema unmarked (#2704)", () => {
  const run = { type: "object", properties: { ok: { type: "boolean" } } };
  const schema = { type: "object", properties: { run } };
  assertEquals(lintPayloadSchema(schema), []);
  assertEquals(validatePayload(schema, { run: { ok: true } }), null);
  assertEquals(Reflect.ownKeys(schema), ["type", "properties"]);
  assertEquals(Reflect.ownKeys(run), ["type", "properties"]);
});

Deno.test("field schema: lint and validation leave the fragment unmarked", () => {
  const schema = { enum: ["a"] };
  lintFieldSchema(schema);
  validateField(schema, "f", "b");
  assertEquals(Reflect.ownKeys(schema), ["enum"]);
});

Deno.test("field schema: reasons are named from the field", () => {
  assertEquals(validateField({ const: 1 }, "a.b", 1), null);
  assertEquals(validateField(false, "a", 1), ["a: does not match the schema"]);
  const nested = validateField(
    { type: "object", properties: { ok: { type: "boolean" } } },
    "run",
    { ok: "yes" },
  );
  assert(nested?.every((r) => r.startsWith("run.ok: ")), nested?.join());
});

Deno.test("contracts: the shown schema accepts and rejects what recording does", () => {
  const declared: PayloadSchema = {
    type: "object",
    required: ["findings", "round"],
    properties: { findings: {}, round: { type: "integer" } },
  };
  const specs = [
    { kind: "findings" as const },
    { kind: "findings" as const, schema: declared },
    { schema: declared },
  ];
  const samples: unknown[] = [
    { findings: [] },
    { findings: [], round: 2 },
    { findings: [{ id: "F1", severity: "low", description: "d" }], round: 1 },
    { findings: [{ id: "F1", severity: "bad", description: "d" }], round: 1 },
    { findings: [{ id: "F1", severity: "low", description: "d", x: 1 }] },
    { round: 1 },
    {},
  ];
  for (const spec of specs) {
    for (const sample of samples) {
      assertEquals(
        validatePayload(artifactContract(spec), sample) === null,
        validateArtifactPayload(spec, sample) === null,
        `${JSON.stringify(spec)} on ${JSON.stringify(sample)}`,
      );
    }
  }
  assertEquals(artifactContract({ kind: "findings" }), FINDINGS_SCHEMA);
  assertEquals(artifactContract({ schema: declared }), declared);
});

Deno.test("contracts: evidence shows its schema, or the outcome contract for result evidence", () => {
  const declared: PayloadSchema = { type: "object", required: ["url"] };
  assertEquals(evidenceContract({ schema: declared }, true), declared);
  assertEquals(evidenceContract({}, true), OUTCOME_SCHEMA);
  assertEquals(evidenceContract(undefined, true), OUTCOME_SCHEMA);
});

Deno.test("notes: descriptions and comments go at every depth, a property named description stays", () => {
  assertEquals(
    withoutNotes({
      type: "object",
      description: "note",
      $comment: "note",
      properties: {
        description: { type: "string", description: "note" },
        list: { type: "array", items: { $comment: "note", type: "string" } },
      },
      allOf: [{ description: "note", required: ["description"] }],
      "x-owner": "team",
    }),
    {
      type: "object",
      properties: {
        description: { type: "string" },
        list: { type: "array", items: { type: "string" } },
      },
      allOf: [{ required: ["description"] }],
      "x-owner": "team",
    },
  );
});
