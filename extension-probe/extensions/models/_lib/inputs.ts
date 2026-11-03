/**
 * InputGenerator: turns a method's JSON Schema into rounds of blind inputs.
 *
 * `swamp behavior run @<type>` sorts one flat object of inputs into global and
 * method arguments by schema, so a round is one flat object over both.
 *
 * Rounds, in order:
 *   empty     — nothing at all
 *   required  — only the fields the schema requires
 *   all       — every field, with a plausible value
 *   no-paths  — all, minus fields filled with a file or directory path
 *   no-prose  — all, minus fields filled with prose
 *               (the last two split "text or path" alternatives a method
 *               refuses to take together)
 *   boundary  — every field at an edge: enum's last member, numeric minimum or
 *               maximum, minLength-sized strings, empty arrays
 *
 * Fields that look like a path to a program are always pointed at the logging
 * stub, in every round that fills them, so nothing real runs.
 *
 * @module
 */

/** The subset of JSON Schema `swamp behavior type describe` emits that we read. */
export interface JsonSchema {
  type?: string | string[];
  properties?: Record<string, JsonSchema>;
  required?: string[];
  enum?: unknown[];
  const?: unknown;
  default?: unknown;
  format?: string;
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
  minLength?: number;
  maxLength?: number;
  minItems?: number;
  items?: JsonSchema;
  anyOf?: JsonSchema[];
  oneOf?: JsonSchema[];
  description?: string;
  pattern?: string;
  /** swamp's marker for a field that must come from a vault. */
  sensitive?: boolean;
}

export const ROUNDS = [
  "empty",
  "required",
  "all",
  "no-paths",
  "no-prose",
  "boundary",
] as const;
export type RoundName = typeof ROUNDS[number];

/** One round's inputs for one method. */
export interface InputRound {
  readonly round: RoundName;
  readonly inputs: Readonly<Record<string, unknown>>;
  /** Fields pointed at the logging stub. */
  readonly stubbed: readonly string[];
}

/** Paths the generator needs inside the box. */
export interface InputContext {
  /** Absolute path of the logging stub. */
  readonly stubPath: string;
  /** An existing, readable file inside the box. */
  readonly samplePath: string;
  /** A writable directory inside the box. */
  readonly scratchDir: string;
}

/** True when a field name reads as a path to a program the method will spawn. */
export function isToolPathField(name: string): boolean {
  // Compare case- and separator-insensitively: claudePath, claude_path,
  // CLAUDE-PATH all read the same.
  const n = name.toLowerCase().replace(/[_-]/g, "");
  if (/^(command|cmd|binary|executable|bin)$/.test(n)) return true;
  if (!/(path|bin|binary|executable|exe|cli)$/.test(n)) return false;
  if (n === "path") return false;
  return !/(file|dir|directory|output|input|repo|root|config|data|cache|log|socket)path$/
    .test(n);
}

function mergeSchemas(a: JsonSchema, b: JsonSchema): JsonSchema {
  return {
    type: "object",
    properties: { ...(a.properties ?? {}), ...(b.properties ?? {}) },
    required: [...new Set([...(a.required ?? []), ...(b.required ?? [])])],
  };
}

/** The flat schema a `behavior run @<type>` call accepts for one method. */
export function runSchema(
  globalArgs: JsonSchema | undefined,
  methodArgs: JsonSchema | undefined,
): JsonSchema {
  return mergeSchemas(globalArgs ?? {}, methodArgs ?? {});
}

function primaryType(s: JsonSchema): string | undefined {
  if (Array.isArray(s.type)) return s.type.find((t) => t !== "null");
  if (s.type) return s.type;
  const alt = s.anyOf ?? s.oneOf;
  if (alt) {
    for (const a of alt) {
      const t = primaryType(a);
      if (t) return t;
    }
  }
  if (s.enum) return typeof s.enum[0];
  return undefined;
}

function plainBranch(s: JsonSchema): JsonSchema {
  const alt = s.anyOf ?? s.oneOf;
  if (!alt) return s;
  return alt.find((a) => primaryType(a) && primaryType(a) !== "null") ?? s;
}

const PROSE =
  "We will utilize the API, e.g. to leverage synergies; it's crucial.";

function stringFor(
  name: string,
  s: JsonSchema,
  ctx: InputContext,
  edge: boolean,
): string {
  const n = name.toLowerCase();
  if (edge && s.minLength !== undefined) {
    return "a".repeat(Math.max(1, s.minLength));
  }
  switch (s.format) {
    case "uri":
    case "url":
    case "iri":
      return "https://example.com/probe";
    case "email":
      return "probe@example.com";
    case "date":
      return "2026-01-01";
    case "date-time":
      return "2026-01-01T00:00:00Z";
    case "uuid":
      return "00000000-0000-4000-8000-000000000000";
    case "hostname":
      return "example.com";
    case "ipv4":
      return "192.0.2.1";
    case "ipv6":
      return "2001:db8::1";
  }
  if (/(url|uri|endpoint|webhook|href)$/.test(n)) {
    return "https://example.com/probe";
  }
  if (/(host|hostname|domain)$/.test(n)) return "example.com";
  if (/(dir|directory|root|folder|workdir|cwd)$/.test(n)) {
    return ctx.scratchDir;
  }
  if (/(path|file)$/.test(n)) return ctx.samplePath;
  if (/region$/.test(n)) return "us-east-1";
  if (/(email)$/.test(n)) return "probe@example.com";
  if (/(json|body|payload)$/.test(n)) return "{}";
  if (/(id|name|slug|key|session|project|bucket|repo|owner)$/.test(n)) {
    return "probe";
  }
  if (/(text|prompt|content|message|draft|query|description)$/.test(n)) {
    return PROSE;
  }
  return "probe";
}

/** Pads or trims a string into the schema's length bounds. */
function fitLength(v: string, s: JsonSchema): string {
  let out = v;
  if (s.minLength !== undefined && out.length < s.minLength) {
    out = out + "a".repeat(s.minLength - out.length);
  }
  if (s.maxLength !== undefined && out.length > s.maxLength) {
    out = out.slice(0, s.maxLength);
  }
  return out;
}

function numberFor(s: JsonSchema, integer: boolean, edge: boolean): number {
  const lo = s.minimum ??
    (s.exclusiveMinimum !== undefined
      ? s.exclusiveMinimum + (integer ? 1 : 0.5)
      : undefined);
  const hi = s.maximum ??
    (s.exclusiveMaximum !== undefined
      ? s.exclusiveMaximum - (integer ? 1 : 0.5)
      : undefined);
  if (edge) {
    // The large JS-safe maximum zod emits for .int() is not an interesting
    // edge; prefer the minimum then.
    if (lo !== undefined) return lo;
    if (hi !== undefined && hi < 1e9) return hi;
    return 0;
  }
  const base = lo !== undefined ? Math.max(lo, 1) : 1;
  return hi !== undefined ? Math.min(base, hi) : base;
}

/** A value for one field, or undefined when none can be made. */
export function valueFor(
  name: string,
  schema: JsonSchema,
  ctx: InputContext,
  edge = false,
): unknown {
  if (isToolPathField(name)) return ctx.stubPath;
  const s = plainBranch(schema);
  if (s.const !== undefined) return s.const;
  if (s.enum && s.enum.length > 0) {
    return edge ? s.enum[s.enum.length - 1] : s.enum[0];
  }
  if (!edge && s.default !== undefined) return s.default;
  switch (primaryType(s)) {
    case "string":
      return fitLength(stringFor(name, s, ctx, edge), s);
    case "integer":
      return numberFor(s, true, edge);
    case "number":
      return numberFor(s, false, edge);
    case "boolean":
      return edge;
    case "array": {
      if (edge && !s.minItems) return [];
      // Name items after the list, singular: `urls` holds URLs.
      const itemName = name.replace(/(?<=[a-z])s$/i, "");
      const item = s.items ? valueFor(itemName, s.items, ctx, edge) : "probe";
      return Array.from({ length: Math.max(1, s.minItems ?? 1) }, () => item);
    }
    case "object":
      return objectFor(s, ctx, edge, "all");
    default:
      return undefined;
  }
}

function objectFor(
  s: JsonSchema,
  ctx: InputContext,
  edge: boolean,
  which: "required" | "all",
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  const props = s.properties ?? {};
  const required = new Set(s.required ?? []);
  for (const [k, v] of Object.entries(props)) {
    // swamp refuses a literal for a sensitive field: it must come from a vault.
    if (v.sensitive) continue;
    if (which === "required" && !required.has(k)) continue;
    const val = valueFor(k, v, ctx, edge);
    if (val !== undefined) out[k] = val;
  }
  return out;
}

function stubbedFields(inputs: Record<string, unknown>, ctx: InputContext) {
  return Object.entries(inputs)
    .filter(([, v]) => v === ctx.stubPath)
    .map(([k]) => k);
}

/**
 * Every round for one method's run schema. Tool-path fields are always set to
 * the stub, even in the empty and required rounds: leaving them unset would
 * let a schema default (stef's `claudePath: "claude"`) run a real program.
 */
export function generateRounds(
  schema: JsonSchema,
  ctx: InputContext,
): InputRound[] {
  const toolFields: Record<string, unknown> = {};
  for (const k of Object.keys(schema.properties ?? {})) {
    if (isToolPathField(k)) toolFields[k] = ctx.stubPath;
  }
  const make = (round: RoundName, base: Record<string, unknown>) => {
    const inputs = { ...base, ...toolFields };
    return { round, inputs, stubbed: stubbedFields(inputs, ctx) };
  };
  const all = objectFor(schema, ctx, false, "all");
  const isPath = (v: unknown) => v === ctx.samplePath || v === ctx.scratchDir;
  const without = (o: Record<string, unknown>, drop: (v: unknown) => boolean) =>
    Object.fromEntries(Object.entries(o).filter(([, v]) => !drop(v)));
  return [
    make("empty", {}),
    make("required", objectFor(schema, ctx, false, "required")),
    make("all", all),
    make("no-paths", without(all, (v) => isPath(v))),
    make("no-prose", without(all, (v) => v === PROSE)),
    make("boundary", objectFor(schema, ctx, true, "all")),
  ];
}
